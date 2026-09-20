#!/usr/bin/env python3
"""Daily plan for Things3: fit today's to-dos into a fixed hour budget, roll the rest to tomorrow.

Usage:
  things_plan.py [--date YYYY-MM-DD] [--budget H] [--dry-run] [--no-lectures] [--no-ladder] [--seed]

`--week` is the weekly mode (Sundays, "plan my week"): it places next week's deadline-bound work and
undated P1 items on days — a hand-set day is kept if it fits, otherwise the project's rhythm day, else
the lightest day — and prints the brief's **Week ahead** block. Weekly owns when-dates; the daily run
owns Today/Tomorrow and never moves a future date. Tag `pin` = never move.

`--budget H` trims (or extends) that date and is remembered in plan-state.json, so a later run the
same day keeps the trim; the Career reserve is skipped on a trimmed day.

The model (Matt, 2026-09-11): every to-do carries an estimate tag (15m / 30m / 1h / 2h / 3h;
`event` = a fixed slot, 0 h) and a priority tag (P1 must / P2 should / P3 whenever). Each morning
the planner fills a fixed budget (6 h/day, outside class) with the highest-priority work and moves
everything else out of Today so the Today list IS the day's plan. Whatever he doesn't finish is
still open tomorrow, gets a rollover bump, and competes again.

Steps:
  1. Dump every open to-do (Today / Upcoming / Anytime / Inbox; Someday is ignored).
  2. Ensure the automatic to-dos exist: one "Log <CODE> lec N (<date>)" per unlogged lecture
     (term.py) with the LECTURE DATE as its deadline, so a missed close-out shows as overdue by
     the real date, not "due today"; for an async course (ASIA 250) it is "Watch + log … · quiz
     locks <date>" (2h) due at the mini-quiz hard lock — nothing is missed until then. Plus one
     per PREP ladder step that fires today (T-10 gap check, T-3 mock, …). Existing lecture to-dos
     are reconciled (title, deadline; tags only if untagged) and auto-completed once the lecture
     file exists. Open-ended weekly to-dos (WEEKLY: novel pages, Friday revision block, groceries)
     are created one week ahead; `--seed` pre-creates the term's ASIA 250 watch+quiz to-dos.
  3. Candidates: when ≤ today, OR undated in Anytime, OR deadline ≤ today+PULL_IN_DAYS (a future
     when-date he set by hand is respected otherwise).
  4. Score (deadline urgency → P-tag → was-planned → rollovers), then greedy fill by score:
     events dated today first, then a reserved CAREER_MIN_H of Career items, then everything else.
     P3 items are capped at P3_CAP_H so the day isn't padded with fluff.
  5. Apply: selected → scheduled Today. Was-in-Today-but-lost → scheduled Tomorrow (+1 rollover in
     routines/plan-state.json). Unpicked Anytime items stay put.
  6. Print the brief block: Plan today / Rolled to tomorrow / Needs an estimate / warnings.
"""
import argparse, datetime as dt, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = "/Users/matthe/Documents/CodingProjects/School 3-1"
STATE = os.path.join(ROOT, "routines", "plan-state.json")
LINKS_MD = os.path.join(ROOT, "links.md")   # course tool links; rows with a match column get attached to to-do notes
sys.path.insert(0, HERE)

# ---- knobs (edit here) -------------------------------------------------------------------------
BUDGET_H = {0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6}   # Mon..Sun, hours of work outside class
PULL_IN_DAYS = 1         # a when-date later than today is respected unless the deadline is within N days
CAREER_MIN_H = 1.0       # reserve this much for Career-area items whenever any exist
P3_CAP_H = 1.5           # at most this much P3 work per day
DEFAULT_EST_H = 0.5      # untagged items count as this and get flagged
EST = {"15m": 0.25, "30m": 0.5, "1h": 1.0, "2h": 2.0, "3h": 3.0, "event": 0.0}
PRIO_SCORE = {"P1": 300, "P2": 150, "P3": 0}
MON, TUE, WED, THU, FRI, SAT, SUN = range(7)
WEEKLY_AHEAD = 7         # a weekly to-do is created this many days before its date (Upcoming shows next week's)
WEEKLY = [               # open-ended weekly to-dos; tick one and it stays ticked (never re-created)
    dict(day=MON, title="Golden Pavilion: read 30–35 pages (week of {d:%b %-d})", project="ASIA 250", tags="2h, P2", due_days=6,
         first=dt.date(2026, 9, 14), last=dt.date(2026, 11, 16),
         notes="Mishima, The Temple of the Golden Pavilion (~260 pp; epub on Canvas, files/47240876). ~30–35 pp/week keeps the Dec 10 paper on schedule. Note page reached + one thing worth quoting."),
    dict(day=FRI, title="Revision block — quiz me ({d:%b %-d})", area="UBC", tags="2h, P1", due_days=0,
         first=dt.date(2026, 9, 18), last=dt.date(2026, 12, 4),
         notes="Fri 3–5 pm, not optional, not moveable (PREP.md). Say 'quiz me' — overdue ledger topics first."),
    dict(day=MON, title="Questions for Kraal (week of {d:%b %-d})", project="PHIL 385", tags="15m, P2", due_days=1,
         first=dt.date(2026, 9, 14), last=dt.date(2026, 11, 30),
         notes="The running list is courses/PHIL385/04-ask-kraal.md (Ask Kraal tab on the notes site). Office hours Wed 12:15-12:45 on Zoom, link on the Canvas front page; email anders.kraal@ubc.ca a day ahead for a slot. Say 'questions for Kraal' here to top the page up from the week's lectures and readings, and paste his answers back so the notes get corrected."),
    dict(day=SAT, title="Groceries ({d:%b %-d})", area="Personal", tags="1h, P2", due_days=1,
         first=dt.date(2026, 9, 19), last=dt.date(2026, 12, 19), notes="Before Sunday meal prep."),
]
PROJECT_OF = {"STAT251": "STAT 251", "PHIL385": "PHIL 385", "CPSC310": "CPSC 310", "ASIA250": "ASIA 250"}
LADDER_EST = [("MOCK", "2h"), ("gap check", "1h"), ("revision", "1h"), ("mark the mock", "1h"),
              ("environment check", "1h"), ("read the spec", "30m"), ("autograder", "30m"),
              ("design rationale", "1h"), ("verbal reconstruction", "30m")]
# Daily revision habits (Matt, 2026-09-11): created for today with the date in the title; an open
# one from an earlier day is cancelled — a missed habit is not a debt that rolls over.
HABITS = [("Deck: answer the 6 on the bus, reply grades", "15m, P1",
           "The morning brief attaches routines/runs/<date>-transit.md. Answer each in your head, check below "
           "the line, then reply in Claude with grades like `1 O 2 ~ 3 X 4 O 5 O 6 ~`. The ledger updates itself."),
          ("Quiz me: 10 min before bed", "15m, P1",
           "Say `quiz me` in Claude (School 3-1 folder). Ten questions, interleaved, whatever is due. Not a reread.")]
HABIT_RE = r"^(Deck: |Quiz me: )"
# PHIL 385 readings from the syllabus schedule: (slug, title, first class, last class). Two to-dos
# each: `Read PHIL385: …` (skipped if any open to-do already mentions the title — he makes his own)
# and `Log PHIL385 reading: …` (send the page; a file courses/PHIL385/readings/*<slug>*.md closes it).
_d = lambda m, d: dt.date(2026, m, d)
PHIL_READINGS = [
    ("preface", "Preface", _d(9, 11), _d(9, 11)),
    ("unhappiest-one", "The Unhappiest One", _d(9, 14), _d(9, 18)),
    ("crop-rotation", "Crop Rotation", _d(9, 21), _d(9, 23)),
    ("ancient-tragedy", "Ancient Tragedy's Reflection in the Modern", _d(9, 25), _d(9, 28)),
    ("musical-erotic", "The Musical Erotic", _d(10, 5), _d(10, 14)),
    ("seducers-diary", "Seducer's Diary", _d(10, 19), _d(10, 23)),
    ("diapsalmata", "Diapsalmata", _d(10, 19), _d(10, 28)),
    ("aesthetic-validity", "Aesthetic Validity of Marriage", _d(11, 2), _d(11, 6)),
    ("equilibrium", "Equilibrium", _d(11, 13), _d(11, 18)),
    ("sermon-later", "The Sermon and later writings", _d(11, 23), _d(11, 27)),
    ("jaspers-marcel", "Jaspers and Marcel", _d(11, 30), _d(11, 30)),
    ("heidegger", "Heidegger", _d(12, 2), _d(12, 2)),
    ("sartre-beauvoir", "Sartre and de Beauvoir", _d(12, 4), _d(12, 4)),
    ("camus", "Camus", _d(12, 7), _d(12, 7)),
]
READ_AHEAD_DAYS, LOG_WINDOW_DAYS = 7, 21     # create a reading's to-dos a week before its first class; keep chasing a log 3 weeks after
ASYNC_LOCK_DAYS = {"ASIA250": 7}   # async course → days from lecture publish to its mini-quiz hard lock
# weekly mode (--week): preferred days per project/area from PREP.md's weekly rhythm
RHYTHM = {"STAT 251": [MON, WED, FRI], "CPSC 310": [TUE, WED], "PHIL 385": [THU, MON], "ASIA 250": [WED, TUE],
          "Career": [TUE, THU], "Personal": [SAT, SUN]}
WEEKEND_PENALTY_H = 3.0  # a weekend day looks this much fuller when choosing a day, so weekdays fill first
WEEK_HORIZON = 3         # also place items due within N days after the week ends
# -----------------------------------------------------------------------------------------------

LEC_RE = r"^(?:Log|Watch \+ (?:log|quiz)) {code} lec (\d+)\b"

def lecture_todo(code, n, d):
    """Canonical (title, tags, when, deadline, notes) for lecture n of `code`, held/published on d."""
    if code in ASYNC_LOCK_DAYS:
        lock = d + dt.timedelta(days=ASYNC_LOCK_DAYS[code])
        return (f"Watch + quiz {code} lec {n} · locks {lock:%b %-d}", "2h, P1", d, lock,
                f"Nothing is missed until the mini-quiz locks {lock:%a %b %-d} 23:59.\n"
                f"- Watch the lecture.\n"
                f"- One page of notes, then `log {code} lec {n}` here.\n"
                f"- The week's readings: courses/{code}/03-logistics.md\n"
                f"- Open-book quiz — covers the lecture AND the readings.\n"
                f"- Tick this yourself after the quiz.")
    return (f"Log {code} lec {n} ({d:%b %-d})", "15m, P1", d, d,
            f"Send a photo of your page (or a rough dump) to Claude in the School 3-1 folder and say `log {code} lec {n}`.\n"
            f"Claude files the notes, writes the questions and adds the topics to the ledger. This to-do closes itself on the next morning check.")

DUMP = r'''
on iso(d)
	if d is missing value then return ""
	set y to year of d as integer
	set m to month of d as integer
	set dd to day of d as integer
	return (y as string) & "-" & text -2 thru -1 of ("0" & m) & "-" & text -2 thru -1 of ("0" & dd)
end iso
on row(t, ln)
	tell application "Things3"
		set pn to ""
		try
			set pn to name of project of t
		end try
		set an to ""
		try
			set an to name of area of t
		end try
		set tg to ""
		try
			set tg to tag names of t
		end try
		set wd to missing value
		try
			set wd to activation date of t
		end try
		set dd to missing value
		try
			set dd to due date of t
		end try
		return ln & tab & id of t & tab & name of t & tab & pn & tab & an & tab & my iso(wd) & tab & my iso(dd) & tab & tg & linefeed
	end tell
end row
tell application "Things3"
	set out to ""
	repeat with p in projects
		if status of p is open then
			set an to ""
			try
				set an to name of area of p
			end try
			set out to out & "PROJECT" & tab & name of p & tab & an & linefeed
		end if
	end repeat
	repeat with ln in {"Inbox", "Someday", "Upcoming", "Anytime"}
		repeat with t in to dos of list ln
			set out to out & my row(t, ln as string)
		end repeat
	end repeat
	return out
end tell
'''

class Todo:
    def __init__(self, id, name, project, area, when, due, tags, lst):
        self.id, self.name, self.project, self.area, self.lst = id, name, project, area, lst
        self.when = dt.date.fromisoformat(when) if when else None
        self.due = dt.date.fromisoformat(due) if due else None
        self.set_tags(tags)
        self.score = 0
    def set_tags(self, tags):
        self.tags = [x.strip() for x in tags.split(",") if x.strip()]
        ests = [t for t in self.tags if t in EST]
        self.est = EST[ests[0]] if ests else DEFAULT_EST_H
        self.has_est = bool(ests)
        self.is_event = "event" in self.tags
        prios = [t for t in self.tags if t in PRIO_SCORE]
        self.prio = prios[0] if prios else None
    def where(self):
        return self.project or self.area or "—"

def osa(script):
    r = subprocess.run(["osascript", "-e", script], capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip())
    return r.stdout

def dump():
    proj_area, todos, seen = {}, [], set()
    for line in osa(DUMP).split("\n"):
        if not line.strip():
            continue
        f = line.split("\t")
        if f[0] == "PROJECT":
            proj_area[f[1]] = f[2]
            continue
        lst, id_, name, project, area, when, due, tags = (f + [""] * 8)[:8]
        if id_ in seen:               # Today items also appear in Anytime; first list wins
            continue
        seen.add(id_)
        todos.append(Todo(id_, name, project, area or proj_area.get(project, ""), when, due, tags, lst))
    return todos

def load_links():
    """links.md rows that have a to-do match column → [(course, name, url, compiled regex)]."""
    rules = []
    try:
        for line in open(LINKS_MD, encoding="utf-8"):
            if not line.startswith("|"):
                continue
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if len(cells) < 4 or cells[0] in ("Course", "") or set(cells[0]) <= {"-"} or not cells[3]:
                continue
            course, name, url, match = cells[:4]
            alts = [a.strip() for a in match.split(";") if a.strip()]
            rules.append((course, name, url, re.compile("|".join(alts), re.I)))
    except FileNotFoundError:
        pass
    return rules

def _as_text(s):
    """Python str → AppleScript string expression (newlines via linefeed)."""
    parts = [p.replace("\\", "\\\\").replace('"', '\\"') for p in s.split("\n")]
    return " & linefeed & ".join(f'"{p}"' for p in parts)

def attach_links(todos, dry):
    """Append matching links.md URLs to the notes of open course to-dos that don't carry them yet.
    A course row only fires for to-dos in that course's project (or with the code in the title), so a
    broad pattern like 'project' can't leak onto Career items. Returns one log line per to-do touched."""
    rules = load_links()
    if not rules:
        return []
    lines = []
    for t in todos:
        if t.lst == "Someday":
            continue
        hits = []
        for course, name, url, rx in rules:
            pretty = re.sub(r"^([A-Z]+)(\d+)$", r"\1 \2", course)
            in_course = course == "ALL" or pretty in (t.project or "") or course in t.name.replace(" ", "")
            if in_course and rx.search(t.name) and (name, url) not in hits:
                hits.append((name, url))
        if not hits:
            continue
        notes = osa(f'tell application "Things3" to get notes of to do id "{t.id}"').rstrip("\n")
        new = [(n, u) for n, u in hits if u not in notes]
        if not new:
            continue
        add = "Links:\n" + "\n".join(f"- {n} — {u}" for n, u in new)
        body = _as_text((notes + "\n\n" if notes else "") + add)
        if not dry:
            osa(f'tell application "Things3" to set notes of to do id "{t.id}" to {body}')
        lines.append(f"{t.name[:48]} ← {', '.join(n for n, _ in new)}")
    return lines

def load_state():
    try:
        return json.load(open(STATE))
    except Exception:
        return {"rolled": {}, "last": {}}

def fmt_h(h):
    return f"{h:g} h" if h >= 1 or h == 0 else f"{int(h * 60)}m"

def est_tag(h):
    return next(k for k, v in EST.items() if v == h)

def ensure_auto_todos(today, todos, dry, state, seed=False):
    """Lecture close-outs, ladder steps and the WEEKLY to-dos become real to-dos. seed=True also
    pre-creates every async (ASIA 250) lecture to-do for the whole term so Upcoming shows them.
    Returns (log lines, titles to register). state["auto"] maps every title this function ever
    created to its Things id: a title whose id is no longer open was ticked or cancelled by hand
    and is never re-created."""
    import term, things_add
    lines, register = [], []
    by_title = {t.name: t for t in todos}
    open_ids = {t.id for t in todos}
    known = state.setdefault("auto", {})

    def add(title, **kw):
        if title in known and known[title] not in open_ids:      # closed by hand → leave it closed
            return False
        if not dry:
            things_add.add_todo(title, **kw)
        lines.append(f"added: {title}")
        register.append(title)
        return True
    for code, proj in PROJECT_OF.items():
        held = term.lecture_dates(code, today)
        total = term.lecture_dates(code, term.COURSES[code]["end"])    # whole term
        n_logged = term.logged_count(code)
        is_async = code in ASYNC_LOCK_DAYS         # async: the to-do is watch + quiz, he ticks it after the quiz
        existing = {}
        for t in list(todos):
            m = re.match(LEC_RE.format(code=code), t.name)
            if not m:
                continue
            n = int(m.group(1))
            if not is_async and n <= n_logged:     # lecture file exists → close the to-do
                if not dry:
                    osa(f'tell application "Things3" to set status of to do id "{t.id}" to completed')
                lines.append(f"completed: {t.name}")
                todos.remove(t)
            elif n > len(total):                   # lecture no longer in term.py (dropped/cancelled) → cancel
                if not dry:
                    osa(f'tell application "Things3" to set status of to do id "{t.id}" to canceled')
                lines.append(f"cancelled: {t.name} (no lecture {n} in term.py)")
                todos.remove(t)
            else:
                existing[n] = t
        for i in range(0 if is_async else n_logged, len(total)):
            n, d = i + 1, total[i]
            title, tags, when, due, notes = lecture_todo(code, n, d)
            t = existing.get(n)
            if t is None:
                if i >= len(held) and not (seed and is_async):     # future lecture: only seeded async ones
                    continue
                if add(title, project=proj, when=when.isoformat(), deadline=due.isoformat(), tags=tags, notes=notes):
                    todos.append(Todo("new-" + title, title, proj, "UBC", when.isoformat(), due.isoformat(), tags, "Anytime"))
                continue
            register.append(t.name)
            fixes = []                             # reconcile: real deadline + canonical title; tags only if untagged
            if t.due != due:
                k = (due - today).days
                fixes.append(f'set due date of to do id "{t.id}" to (theBase {"+" if k >= 0 else "-"} {abs(k)} * days)')
                t.due = due
            if t.name != title:
                fixes.append(f'set name of to do id "{t.id}" to "{title}"')
                t.name = title
            if not t.has_est or not t.prio:
                fixes.append(f'set tag names of to do id "{t.id}" to "{tags}"')
                t.set_tags(tags)
            if fixes:
                if not dry:
                    osa('tell application "Things3"\n  set theBase to current date\n  set time of theBase to 0\n  '
                        + "\n  ".join(fixes) + "\nend tell")
                lines.append(f"fixed: {title} → due {due:%b %-d}")
                register[-1] = title
    for d, course, label, kind in term.KEY_DATES:
        left = (d - today).days
        ladder = term.EXAM_LADDER if kind == "exam" else term.DELIV_LADDER if kind in ("deliverable", "paper") else {}
        step = ladder.get(left)
        if not step or left == 0:
            continue
        proj = PROJECT_OF.get(course)
        title = f"T-{left} {course if not proj else proj} · {step}"
        if title in by_title:
            continue
        est = next((e for k, e in LADDER_EST if k.lower() in step.lower()), "1h")
        if add(title, project=proj, area=None if proj else "UBC", when=today.isoformat(), deadline=today.isoformat(),
               tags=f"{est}, P1", notes=f"Ladder step for {label} on {d:%a %b %-d}. From PREP.md."):
            todos.append(Todo("new-" + title, title, proj or "", "UBC", today.isoformat(), today.isoformat(), f"{est}, P1", "Anytime"))
    # open-ended weekly to-dos (novel pages, Friday revision block, groceries), created a week ahead
    for w in WEEKLY:
        d = today + dt.timedelta(days=(w["day"] - today.weekday()) % 7)
        while d <= today + dt.timedelta(days=WEEKLY_AHEAD):
            if w["first"] <= d <= w["last"]:
                title = w["title"].format(d=d)
                if title not in by_title:
                    add(title, project=w.get("project"), area=w.get("area"), when=d.isoformat(),
                        deadline=(d + dt.timedelta(days=w["due_days"])).isoformat(), tags=w["tags"], notes=w["notes"])
            d += dt.timedelta(days=7)
    return lines, register

def plan(today, budget, todos, state):
    rolled = state.get("rolled", {})
    cands = []
    for t in todos:
        if t.lst in ("Inbox", "Someday"):
            continue
        if (t.when and t.when <= today) or (t.when is None) or (t.due and (t.due - today).days <= PULL_IN_DAYS):
            cands.append(t)                    # a hand-set future when-date holds unless the deadline is imminent
    for t in cands:
        s = 0
        if t.due:
            d = (t.due - today).days
            s += 1000 if d <= 0 else 900 if d == 1 else 700 if d <= 3 else 500 if d <= 7 else 300 if d <= 14 else 100
        s += PRIO_SCORE.get(t.prio, 100)
        if t.when and t.when <= today:
            s += 100
        s += min(40 * rolled.get(t.id, 0), 200)
        t.score = s
    order = sorted(cands, key=lambda t: (-t.score, t.due or dt.date.max, t.est, t.name))
    selected, remaining, career_h, p3_h, warn = [], budget, 0.0, 0.0, []
    career_min = CAREER_MIN_H if budget >= BUDGET_H[today.weekday()] else 0   # no reserve on a trimmed day

    def take(t):
        nonlocal remaining, career_h, p3_h
        selected.append(t)
        remaining -= t.est
        if t.area == "Career":
            career_h += t.est
        if t.prio == "P3":
            p3_h += t.est

    for t in order:                                    # events dated today
        if t.is_event and (t.when == today or t.due == today):
            take(t)
        elif t.is_event and t.when and t.when < today:
            warn.append(f"stale event still open: {t.name}")
    for t in order:                                    # career reserve
        if t in selected or t.is_event or t.area != "Career" or career_h >= career_min:
            continue
        if t.est <= remaining and (t.prio != "P3" or p3_h + t.est <= P3_CAP_H):
            take(t)
    for t in order:                                    # everything else
        if t in selected or t.is_event:
            continue
        if t.prio == "P3" and p3_h + t.est > P3_CAP_H:
            continue
        if t.est <= remaining:
            take(t)
        elif t.due and (t.due - today).days <= 1:
            warn.append(f"OVER BUDGET — due {t.due:%b %-d} but no room: {t.name} ({fmt_h(t.est)})")
    rollover = [t for t in cands if t not in selected and not t.is_event and t.when and t.when <= today]
    return selected, rollover, warn, cands

def apply(today, selected, rollover, state, todos):
    ids_today = [t.id for t in selected if not t.id.startswith("new-") and t.when != today]
    ids_tmrw = [t.id for t in rollover if not t.id.startswith("new-")]
    if ids_today or ids_tmrw:
        lines = ['tell application "Things3"', '  set theBase to current date', '  set time of theBase to 0']
        for i in ids_today:
            lines.append(f'  schedule (to do id "{i}") for theBase')
        for i in ids_tmrw:
            lines.append(f'  schedule (to do id "{i}") for (theBase + 1 * days)')
        lines.append('end tell')
        osa("\n".join(lines))
    rolled = state.get("rolled", {})
    open_ids = {t.id for t in todos}
    rolled = {k: v for k, v in rolled.items() if k in open_ids}
    for i in ids_tmrw:
        rolled[i] = rolled.get(i, 0) + 1
    state["rolled"] = rolled
    state["last"] = {"date": today.isoformat(), "selected": [t.name for t in selected],
                     "rolled": [t.name for t in rollover]}
    save_state(state)

def save_state(state):
    os.makedirs(os.path.dirname(STATE), exist_ok=True)
    json.dump(state, open(STATE, "w"), indent=1, ensure_ascii=False)

# ---- weekly mode ---------------------------------------------------------------------------------
def week_window(today, next_week=False):
    """Tomorrow through the coming Sunday (on a Sunday: the whole next week).
    next_week=True: the coming Monday through its Sunday, whatever day it is."""
    start = today + dt.timedelta(days=1)
    if next_week:
        start = today + dt.timedelta(days=(MON - today.weekday()) % 7 or 7)
    return start, start + dt.timedelta(days=6 - start.weekday())

def budget_for(d, state):
    return state.get("budget", {}).get(d.isoformat(), BUDGET_H[d.weekday()])

def plan_week(today, todos, state, next_week=False):
    """Place next week's work on days. Weekly owns when-dates, daily owns Today/Tomorrow:
    - items already dated inside the window are load; events, WEEKLY instances, ladder steps and
      anything tagged `pin` never move; today's list and anything dated outside the window are left alone;
    - undated items due in the window (+WEEK_HORIZON) and undated P1 items get a day, and a dated item
      that no longer fits its day is re-placed: keep a hand-set day if it fits, else the project's rhythm
      day, else the lightest day (weekdays first), all before the deadline (a day of buffer when possible);
    - a day that still overflows is reported, not silently overbooked.
    Returns (days, cap, load, on_day, changes[(todo, old_when, new_when)], warnings)."""
    start, end = week_window(today, next_week)
    days = [start + dt.timedelta(days=i) for i in range((end - start).days + 1)]
    cap = {d: budget_for(d, state) for d in days}
    load = {d: 0.0 for d in days}
    on_day = {d: [] for d in days}
    pinned_titles = {w["title"].format(d=d) for w in WEEKLY for d in days if d.weekday() == w["day"]}
    horizon_end = end + dt.timedelta(days=WEEK_HORIZON)
    movable = []
    for t in todos:
        if t.lst in ("Inbox", "Someday"):
            continue
        pinned = t.is_event or t.name in pinned_titles or "pin" in t.tags or re.match(r"^T-\d+ ", t.name)
        if t.when and t.when <= today:                       # today's plan (or rolled): the daily run's domain
            continue
        in_window = t.when is not None and start <= t.when <= end
        if pinned:
            if in_window:
                load[t.when] += t.est; on_day[t.when].append(t)
            continue
        due_in = t.due is not None and start <= t.due <= horizon_end
        undated_must = t.when is None and t.prio == "P1"
        if in_window or (t.when is None and (due_in or undated_must)):   # a date outside the window is left alone
            movable.append(t)
    movable.sort(key=lambda t: (t.due or dt.date.max, -PRIO_SCORE.get(t.prio, 100), -t.est, t.name))

    def weight(d):
        return load[d] + (WEEKEND_PENALTY_H if d.weekday() >= SAT else 0)

    changes, warn = [], []
    for t in movable:
        tiers = [[d for d in days if d < t.due], [d for d in days if d <= t.due]] if t.due else [days]
        tiers = [x for x in tiers if x]
        keep = t.when if (t.when in days) else None
        if not tiers:                                        # due before the window: daily's problem
            if keep:
                load[keep] += t.est; on_day[keep].append(t)
            continue
        fits = lambda d: load[d] + t.est <= cap[d]
        chosen = None
        if keep and fits(keep) and any(keep in x for x in tiers):
            chosen = keep
        else:
            for tier in tiers:
                for wd in RHYTHM.get(t.project or t.area, []):
                    chosen = next((d for d in tier if d.weekday() == wd and fits(d)), None)
                    if chosen:
                        break
                if not chosen:
                    ok = [d for d in tier if fits(d)]
                    chosen = min(ok, key=lambda d: (weight(d), d)) if ok else None
                if chosen:
                    break
        if chosen is None:                                   # nothing fits: least-loaded allowed day, flagged
            tier = tiers[0]
            chosen = keep if keep in tier else min(tier, key=lambda d: (weight(d), d))
            warn.append(f"OVER BUDGET {chosen:%a %b %-d}: {short(t.name, 40)} ({fmt_h(t.est)}) has no room before "
                        + (f"{t.due:%b %-d}" if t.due else "the weekend"))
        load[chosen] += t.est; on_day[chosen].append(t)
        if chosen != t.when:
            changes.append((t, t.when, chosen))
    return days, cap, load, on_day, changes, warn

def apply_week(today, changes, state):
    real_today = dt.datetime.now().astimezone().date()
    lines = ['tell application "Things3"', '  set theBase to current date', '  set time of theBase to 0']
    for t, _old, new in changes:
        k = (new - real_today).days
        lines.append(f'  schedule (to do id "{t.id}") for (theBase {"+" if k >= 0 else "-"} {abs(k)} * days)')
    lines.append('end tell')
    if changes:
        osa("\n".join(lines))
    state["week"] = {"date": today.isoformat(),
                     "moved": [f"{t.name} {o:%b %-d}→{n:%b %-d}" if o else f"{t.name} →{n:%b %-d}" for t, o, n in changes]}
    save_state(state)

def short(name, n=30):
    """Brief-friendly title: drop parentheticals and ' — …' / ' · locks …' tails, cut at a word."""
    x = re.sub(r"\s*\([^)]*\)", "", name)
    x = re.split(r" — | · locks ", x)[0].strip()
    if len(x) <= n:
        return x
    cut = x[:n].rsplit(" ", 1)[0]
    return (cut if len(cut) >= n // 2 else x[:n]) + "…"

def print_week(days, cap, load, on_day, changes, warn, dry):
    total_l, total_c = sum(load.values()), sum(cap.values())
    print(f"**Week ahead — {total_l:g} of {total_c:g} h** ({days[0]:%a %b %-d} → {days[-1]:%a %b %-d})"
          + ("  (DRY RUN)" if dry else ""))
    for d in days:
        items = sorted(on_day[d], key=lambda t: (-t.score, t.est), reverse=False)
        names = [short(t.name) for t in items if not t.is_event]
        ev = [short(t.name) for t in items if t.is_event]
        shown = " · ".join(names[:3]) + (f" (+{len(names) - 3})" if len(names) > 3 else "")
        flag = " ⚠" if load[d] > cap[d] else ""
        print(f"- {d:%a %-d} · {load[d]:g}/{cap[d]:g} h{flag}" + (f" · {shown}" if shown else " · —")
              + (f" · event: {'; '.join(ev)}" if ev else ""))
    moved = [(t, o, n) for t, o, n in changes if o]
    placed = [(t, n) for t, o, n in changes if not o]
    if moved:
        print(f"- moved {len(moved)}: " + "; ".join(f"{short(t.name, 26)} {o:%a}→{n:%a}" for t, o, n in moved[:4])
              + (" …" if len(moved) > 4 else ""))
    if placed:
        print(f"- placed {len(placed)} undated P1: " + "; ".join(f"{short(t.name, 26)} →{n:%a}" for t, n in placed[:4])
              + (" …" if len(placed) > 4 else ""))
    for w in warn:
        print(f"- ⚠ {w}")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--date")
    ap.add_argument("--budget", type=float)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--no-lectures", action="store_true", help="skip auto lecture/ladder to-dos")
    ap.add_argument("--no-ladder", action="store_true", help="alias of --no-lectures")
    ap.add_argument("--no-links", action="store_true", help="skip attaching links.md URLs to to-do notes")
    ap.add_argument("--seed", action="store_true", help="pre-create every ASIA 250 watch+quiz to-do for the term")
    ap.add_argument("--week", action="store_true", help="weekly mode: place next week's work on days (Sundays, 'plan my week')")
    ap.add_argument("--next-week", action="store_true", help="with --week: plan the coming Mon→Sun even if today isn't Sunday")
    a = ap.parse_args()
    today = dt.date.fromisoformat(a.date) if a.date else dt.datetime.now().astimezone().date()
    state = load_state()
    overrides = state.setdefault("budget", {})          # per-date budget set with --budget (sticks for that date)
    if a.budget is not None and not a.dry_run:
        overrides[today.isoformat()] = a.budget
    budget = a.budget if a.budget is not None else overrides.get(today.isoformat(), BUDGET_H[today.weekday()])
    todos = dump()
    auto, register = ([], []) if (a.no_lectures or a.no_ladder) else ensure_auto_todos(today, todos, a.dry_run, state, seed=a.seed)
    if auto and not a.dry_run:
        todos = dump()            # re-read so the new to-dos carry real ids
    if not a.dry_run:             # remember our to-dos by id so one he ticks by hand stays closed
        ids = {t.name: t.id for t in todos}
        state.setdefault("auto", {}).update({n: ids[n] for n in register if n in ids})
    linked = [] if a.no_links else attach_links(todos, a.dry_run)
    if linked:
        auto.append(f"links added to {len(linked)} to-do(s): " + "; ".join(linked[:6]) + (" …" if len(linked) > 6 else ""))
    if a.week:
        for t in todos:                                   # score for the day-line ordering only
            t.score = (1000 if t.due and (t.due - today).days <= 7 else 0) + PRIO_SCORE.get(t.prio, 100)
        days, cap, load, on_day, changes, wwarn = plan_week(today, todos, state, a.next_week)
        if not a.dry_run:
            apply_week(today, changes, state)
        print_week(days, cap, load, on_day, changes, wwarn, a.dry_run)
        for l in auto:
            print(f"- auto: {l}")
        return
    selected, rollover, warn, cands = plan(today, budget, todos, state)
    if not a.dry_run:
        apply(today, selected, rollover, state, todos)

    used = sum(t.est for t in selected)
    print(f"**Plan today — {used:g} of {budget:g} h**{'  (DRY RUN)' if a.dry_run else ''}")
    logs = [t for t in selected if re.match(r"^Log \w+ lec \d+", t.name)]
    if len(logs) > 1:
        late = [t for t in logs if t.due and t.due < today]
        print(f"- [{fmt_h(sum(t.est for t in logs))}] Log {len(logs)} lectures · " +
              " · ".join(re.sub(r"^Log (\w+) lec (\d+) \((.*?)\).*", r"\1 lec \2 (\3)", t.name) for t in logs) +
              (f" · {len(late)} overdue" if late else " · due today"))
    for t in sorted(selected, key=lambda t: (-t.score, t.due or dt.date.max)):
        if len(logs) > 1 and t in logs:
            continue
        due = ("" if not t.due else " · due today" if t.due == today else
               f" · OVERDUE since {t.due:%b %-d}" if t.due < today else f" · due {t.due:%b %-d}")
        tag = "event" if t.is_event else fmt_h(t.est)
        print(f"- [{tag}] {t.where()} · {t.name[:80]}{due}")
    if rollover:
        print("**Rolled to tomorrow**")
        for t in rollover:
            n = state.get("rolled", {}).get(t.id, 0)
            print(f"- {t.where()} · {t.name[:80]}" + (f" · rolled {n}×" if n else ""))
    need = [t for t in cands if not t.has_est or not t.prio]
    if need:
        print("**Needs an estimate/priority tag** (15m/30m/1h/2h/3h + P1/P2/P3)")
        for t in need:
            print(f"- {t.where()} · {t.name[:80]}")
    inbox = [t for t in todos if t.lst == "Inbox"]
    if inbox:
        print(f"**Inbox: {len(inbox)} to file** — " + "; ".join(t.name[:40] for t in inbox))
    for w in warn:
        print(f"- ⚠ {w}")
    for l in auto:
        print(f"- auto: {l}")

if __name__ == "__main__":
    main()
