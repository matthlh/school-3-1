#!/usr/bin/env python3
"""Daily plan for Things3: fit today's to-dos into a fixed hour budget, roll the rest to tomorrow.

Usage:
  things_plan.py [--budget H] [--dry-run [--date YYYY-MM-DD]] [--no-lectures] [--no-ladder]
                 [--no-links] [--seed] [--week [--next-week]]
  things_plan.py --actual "TITLE=45m" [--actual …] [--dry-run]

`--date` plans as if it were that day and needs `--dry-run`, because Things3 schedules relative to the
real today. `--no-links` skips appending links.md URLs to the notes of matching to-dos.

`--actual "TITLE=45m"` records how long a completed to-do really took (found by its exact title, as
things_done.py finds one) in plan-state.json under "actuals", with its estimate tag and completion date,
and plans nothing. Every pair is checked before any is recorded, so one bad pair records nothing. Once a
tag has MIN_SAMPLES of them, the plan counts that tag as tag × the median of actual ÷ tag, and the Plan
today block names the factors in use.

`--week` is the weekly mode (Sundays, "plan my week"): it places next week's deadline-bound work and
undated P1 items on days — a hand-set day is kept if it fits, otherwise the project's rhythm day, else
the lightest day — and prints the brief's **Week ahead** block. On any other day it covers tomorrow
through Sunday; add `--next-week` for the coming Mon→Sun. Weekly owns when-dates; the daily run
owns Today/Tomorrow and never moves a future date. Tag `pin` = never move.

`--budget H` trims (or extends) that date and is remembered in plan-state.json, so a later run the
same day keeps the trim; the Career reserve is skipped on a trimmed day. Without one, the day before an
exam gets LIGHT_EVE of its budget.

The model (Matt, 2026-09-11): every to-do carries an estimate tag (15m / 30m / 1h / 2h / 3h;
`event` = a fixed slot, 0 h) and a priority tag (P1 must / P2 should / P3 whenever). Each morning
the planner fills a fixed budget (6 h/day, outside class) with the highest-priority work and moves
everything else out of Today so the Today list IS the day's plan. Whatever he doesn't finish is
still open tomorrow, gets a rollover bump, and competes again.

Steps:
  1. Dump every open to-do in Inbox, Someday, Upcoming and Anytime (Today's items come through
     Anytime). Inbox and Someday items are never planned, but they still count as existing, so an
     automatic to-do sitting there is not created again.
  2. Ensure the automatic to-dos exist: one "Log <CODE> lec N (<date>)" per unlogged lecture
     (term.py) with the LECTURE DATE as its deadline, so a missed close-out shows as overdue by
     the real date, not "due today"; for an async course (ASIA 250) it is "Watch + quiz <CODE> lec N
     · locks <date>" (2h) due at the mini-quiz hard lock — nothing is missed until then. Plus one
     per PREP ladder step that fires today, named for its item ("T-3 STAT 251 Midterm · FULL TIMED
     MOCK"); once the item's date has passed (for an exam, from its day), its open steps are cancelled. Existing lecture to-dos
     are reconciled (title, deadline; tags only if untagged) and auto-completed once the lecture
     file exists, except an async one, which he ticks himself after the quiz. Today's two revision
     habits (HABITS; an open one from an earlier day or under an old title is cancelled) and the PHIL 385 Read/Log pair of
     every reading in its window (PHIL_READINGS; the reading's file completes both). Open-ended weekly
     to-dos (WEEKLY: novel pages, Friday revision block, questions for Kraal, groceries) are created
     one week ahead; `--seed` pre-creates the term's ASIA 250 watch+quiz to-dos.
  3. Candidates: when ≤ today, OR undated in Anytime, OR deadline ≤ today+PULL_IN_DAYS (a future
     when-date he set by hand is respected otherwise).
  4. Score (deadline urgency → P-tag → was-planned → rollovers), then greedy fill by score:
     events dated today first, then today's habits (never rolled), then a reserved CAREER_MIN_H of
     Career items, then everything else.
     P3 items are capped at P3_CAP_H so the day isn't padded with fluff.
  5. Clock: in printed order each line starts at DAY_START (planning the real today after that: now,
     rounded up to the quarter hour) or where the line before it ended, after any lecture, lab or exam
     it would overlap. The log of a lecture held later today waits until that lecture ends, and the
     lines after it go first meanwhile, so the plan still reads in the order to do it. A line that
     would end after STUDY_END leaves today's plan: one already in Today rolls to tomorrow like any
     other item that did not fit, and one that was not (undated, or pulled in from a later date by its
     deadline) stays where it is.
  6. Apply: selected → scheduled Today. Was-in-Today-but-lost → scheduled Tomorrow (+1 rollover in
     routines/plan-state.json). Unpicked Anytime items stay put.
  7. Print the brief block: Plan today (a start time on each P1) / Rolled to tomorrow / Needs an
     estimate / warnings / a Cushion line per date within CUSHION_DAYS that has an exam, deliverable,
     paper or assignment, counting all the work due before it / First thing tomorrow. The Time check
     comes last: its query runs after the plan is applied, so a failure there leaves the plan in place.
"""
import argparse, datetime as dt, json, os, re, statistics, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("SCHOOL_ROOT") or os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))   # the workspace this script sits in
STATE = os.path.join(ROOT, "routines", "plan-state.json")
LINKS_MD = os.path.join(ROOT, "links.md")   # course tool links; rows with a match column get attached to to-do notes
sys.path.insert(0, HERE)
import term, things_add

# ---- knobs (edit here) -------------------------------------------------------------------------
BUDGET_H = {0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6}   # Mon..Sun, hours of work outside class
LIGHT_EVE = 0.5          # the day before an exam plans this share of its budget (a --budget for that date still wins)
PULL_IN_DAYS = 1         # a when-date later than today is respected unless the deadline is within N days
CAREER_MIN_H = 1.0       # reserve this much for Career-area items whenever any exist
P3_CAP_H = 1.5           # at most this much P3 work per day
DAY_START = "09:00"      # suggested start times run from here (a later run for today: from now), around lectures, labs and exams
STUDY_END = "22:30"      # sleep: nothing in the plan ends later; a line that would leaves today's plan (docstring step 5)
CUSHION_DAYS = 14        # a Cushion line for each date within N days that has an exam, deliverable, paper or assignment
MIN_SAMPLES = 5          # a tag plans as tag × median(actual ÷ tag) once --actual has timed this many of it
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
         notes="Fri 3–5 pm, not optional, not moveable (PREP.md). Start with 'friday set': four STAT 251 long problems on paper against a clock, about 30 minutes. Then say 'quiz me' for the overdue ledger topics."),
    dict(day=MON, title="Questions for Kraal (week of {d:%b %-d})", project="PHIL 385", tags="15m, P2", due_days=1,
         first=dt.date(2026, 9, 14), last=dt.date(2026, 11, 30),
         notes="The running list is courses/PHIL385/04-ask-kraal.md (Ask Kraal tab on the notes site). Office hours Wed 12:15-12:45 on Zoom, link on the Canvas front page; email anders.kraal@ubc.ca a day ahead for a slot. Say 'questions for Kraal' here to top the page up from the week's lectures and readings, and paste his answers back so the notes get corrected."),
    dict(day=SAT, title="Groceries ({d:%b %-d})", area="Personal", tags="1h, P2", due_days=1,
         first=dt.date(2026, 9, 19), last=dt.date(2026, 12, 19), notes="Before Sunday meal prep."),
]
PROJECT_OF = {"STAT251": "STAT 251", "PHIL385": "PHIL 385", "CPSC310": "CPSC 310", "ASIA250": "ASIA 250"}
# Daily revision habits (Matt, 2026-09-11): created for today with the date in the title; an open
# one from an earlier day is cancelled — a missed habit is not a debt that rolls over. Each counts
# against the budget but gets no start time: its slot is in its title (the bus, bed).
HABITS = [("Deck: answer the 6 on the bus, tick key points", "15m, P1",
           "Open the Transit Deck page linked in this morning's brief. Answer each question in your head, then open its "
           "answer and tick each key point your answer had. Once all 6 are done, say `grade my deck` in Claude and the "
           "ledger updates itself."),
          ("Quiz me: 10 min before bed", "15m, P1",
           "Say `quiz me` in Claude (School 3-1 folder). Ten questions, interleaved, whatever is due. Not a reread.")]
# Titles a habit had before, old → new. An open habit under an old title is cancelled like a missed one, and one he
# ticked today counts as today's new one ticked. Drop an entry once no open to-do carries its title.
RENAMED_HABITS = {"Deck: answer the 6 on the bus, reply grades": "Deck: answer the 6 on the bus, tick key points",
                  "Deck: answer the 6 on the bus, tap grades": "Deck: answer the 6 on the bus, tick key points"}
HABIT_RE = re.compile("^(?:" + "|".join(re.escape(h) for h in [title for title, _, _ in HABITS] + list(RENAMED_HABITS))
                      + r") \([A-Z][a-z]{2} \d{1,2}\)$")   # a habit's exact title plus its date, like (Oct 6)
# PHIL 385 readings from the syllabus schedule: (slug, title, first class, last class). Two to-dos
# each, created from READ_AHEAD_DAYS before the first class: `Read PHIL385: …` (due the first class,
# created until the last; skipped if any open to-do already mentions the title — he makes his own) and
# `Log PHIL385 reading: …` (due the last class, chased LOG_WINDOW_DAYS past it).
# courses/PHIL385/readings/<slug>.md completes both; when the window closes, an open one is cancelled.
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
READ_AHEAD_DAYS, LOG_WINDOW_DAYS = 7, 21     # create a reading's to-dos a week before its first class; keep chasing a log 3 weeks after its last
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

ISO = r'''
on iso(d)
	if d is missing value then return ""
	set y to year of d as integer
	set m to month of d as integer
	set dd to day of d as integer
	return (y as string) & "-" & text -2 thru -1 of ("0" & m) & "-" & text -2 thru -1 of ("0" & dd)
end iso
'''
DUMP = ISO + r'''
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
        self.est_tag = next((t for t in self.tags if t in EST), None)
        self.est = EST[self.est_tag] if self.est_tag else DEFAULT_EST_H
        self.is_event = "event" in self.tags
        prios = [t for t in self.tags if t in PRIO_SCORE]
        self.prio = prios[0] if prios else None
    @property
    def is_habit(self):
        return bool(HABIT_RE.match(self.name))
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

def completed(title=None, day=None):
    """[(Todo, completion date)] of the completed to-dos titled exactly `title` (found the way things_done.py finds an
    open one), or, without a title, of those completed on `day`. The time check and --actual both use it."""
    k = (day - dt.datetime.now().astimezone().date()).days if title is None else 0
    match = f"name is {_as_text(title)}" if title is not None else "completion date ≥ d0 and completion date < d1"
    out = osa(ISO + f'''tell application "Things3"
	set theBase to current date
	set time of theBase to 0
	set d0 to theBase + ({k}) * days
	set d1 to d0 + 1 * days
	set out to ""
	repeat with t in (to dos whose status is completed and {match})
		set tg to ""
		try
			set tg to tag names of t
		end try
		set out to out & name of t & tab & tg & tab & my iso(completion date of t) & linefeed
	end repeat
	return out
end tell''')
    rows = [line.split("\t") for line in out.split("\n") if line.strip()]
    return [(Todo("", name, "", "", "", "", tags, "Logbook"), dt.date.fromisoformat(done)) for name, tags, done in rows]

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
        # a dry run's new to-dos are placeholders (id "new-…") that Things3 has never seen, so they have no notes yet
        notes = "" if t.id.startswith("new-") else osa(f'tell application "Things3" to get notes of to do id "{t.id}"').rstrip("\n")
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
    """plan-state.json, or a fresh state on the first run. A file that exists but does not parse stops the run: starting
    over would forget every auto to-do he closed by hand and re-create them."""
    if not os.path.exists(STATE):
        return {"rolled": {}, "last": {}}
    try:
        with open(STATE, encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        raise SystemExit(f"{STATE} is not valid JSON ({e}). Fix or restore it before planning.")

def fmt_h(h):
    return f"{h:g} h" if h >= 1 or h == 0 else f"{int(h * 60)}m"

def est_factors(state):
    """{estimate tag: median of actual ÷ estimate} for every tag with MIN_SAMPLES or more recorded times."""
    ratios = {}
    for a in state.get("actuals", {}).values():
        ratios.setdefault(a["est"], []).append(a["min"] / 60 / EST[a["est"]])
    return {tag: statistics.median(r) for tag, r in ratios.items() if len(r) >= MIN_SAMPLES}

def planned_h(tag, factors):
    """Hours the plan counts for an estimate tag: the tag, or tag × its factor to the quarter hour (15m at least)."""
    return max(0.25, round(EST[tag] * factors[tag] * 4) / 4) if tag in factors else EST[tag]

def exams_on(d):
    """The term.key_dates() exams on date d."""
    return [k for k in term.key_dates() if k.kind == "exam" and k.date == d]

def reserve_h(d, budget):
    """Career hours held back on day d: CAREER_MIN_H, or none on a day trimmed below its weekday budget."""
    return CAREER_MIN_H if budget >= BUDGET_H[d.weekday()] else 0

def held_today(code, d):
    """Whether course `code` holds a lecture on d (term.lecture_dates, so not on a skip or exam day), and its number."""
    held = term.lecture_dates(code, d)
    return (bool(held) and held[-1] == d), len(held)

def class_slots(d):
    """[(start, end)] in minutes after midnight of every lecture, lab and exam on d: a course's lecture when it holds one
    that day, its labs on their weekdays within its term except NO_CLASS days, and every exam with a time."""
    slots = []
    for code, c in term.COURSES.items():
        if c["time"] and held_today(code, d)[0]:
            slots.append(term.span(*c["time"]))
        if c["start"] <= d <= c["end"] and d not in term.NO_CLASS:
            slots += [term.span(hhmm, minutes) for days, hhmm, minutes in c["labs"] if d.weekday() in days]
    slots += [(term.to_min(k.start), term.to_min(k.end)) for k in exams_on(d) if k.start]
    return sorted(slots)

class Auto:
    """The planner's own to-dos for one run: create, close and rename them, and log each change in `lines`.
    state["auto"] maps every title it ever created to its Things id, so a title whose id is no longer open was ticked
    or cancelled by hand and is never created again; `register` lists the titles to map after the run. A created
    to-do joins `todos` as a placeholder (id "new-…"), so a dry run plans it like a real run does."""
    def __init__(self, today, todos, dry, state):
        self.today, self.todos, self.dry, self.state = today, todos, dry, state
        self.known = state.setdefault("auto", {})
        self.open_ids = {t.id for t in todos}
        self.by_title = {t.name: t for t in todos}
        self.lines, self.register = [], []

    def closed_by_hand(self, title):
        return title in self.known and self.known[title] not in self.open_ids

    def create(self, title, tags, project=None, area=None, when=None, deadline=None, notes=None):
        """Add the to-do, unless one with this title is open or he closed it by hand."""
        if title in self.by_title or self.closed_by_hand(title):
            return
        iso = lambda d: d.isoformat() if d else ""
        if not self.dry:
            things_add.add_todo(title, project=project, area=area, when=iso(when) or None, deadline=iso(deadline) or None,
                                tags=tags, notes=notes)
        t = Todo("new-" + title, title, project or "", "UBC" if project else area, iso(when), iso(deadline), tags,
                 "Upcoming" if when and when > self.today else "Anytime")
        self.todos.append(t)
        self.by_title[title] = t
        self.lines.append(f"added: {title}")
        self.register.append(title)

    def close(self, t, status, why=None):
        """Set an open to-do's status to completed or canceled."""
        if not self.dry:
            osa(f'tell application "Things3" to set status of to do id "{t.id}" to {status}')
        self.lines.append(f"{'completed' if status == 'completed' else 'cancelled'}: {t.name}" + (f" ({why})" if why else ""))
        self.todos.remove(t)
        if self.by_title.get(t.name) is t:
            del self.by_title[t.name]

    def rename(self, t, title):
        """Retitle an open to-do, and move its state["auto"] entry to the new title."""
        if not self.dry:
            osa(f'tell application "Things3" to set name of to do id "{t.id}" to {_as_text(title)}')
        self.lines.append(f"renamed: {t.name} → {title}")
        if self.known.get(t.name) == t.id:
            del self.known[t.name]
        if self.by_title.get(t.name) is t:
            del self.by_title[t.name]
        t.name = title
        self.by_title[title] = t
        self.register.append(title)

def lecture_todos(auto, seed):
    """A close-out to-do per lecture held so far (lecture_todo); seed=True also creates every async (ASIA 250) lecture's
    for the whole term so Upcoming shows them. One whose log file exists is completed, except an async one, which he
    ticks himself after the quiz; one for a lecture term.py no longer has is cancelled; the rest are reconciled to the
    canonical title and deadline, and to its tags only when untagged."""
    today = auto.today
    for code, proj in PROJECT_OF.items():
        held = term.lecture_dates(code, today)
        total = term.lecture_dates(code, term.COURSES[code]["end"])    # whole term
        logged = term.logged_numbers(code)        # set of lecture numbers with a log file
        is_async = code in ASYNC_LOCK_DAYS         # async: the to-do is watch + quiz, he ticks it after the quiz
        existing = {}
        for t in list(auto.todos):
            m = re.match(LEC_RE.format(code=code), t.name)
            if not m:
                continue
            n = int(m.group(1))
            if not is_async and n in logged:       # lecture file exists → close the to-do
                auto.close(t, "completed")
            elif n > len(total):                   # lecture no longer in term.py (dropped/cancelled) → cancel
                auto.close(t, "canceled", f"no lecture {n} in term.py")
            else:
                existing[n] = t
        for i, d in enumerate(total):
            n = i + 1
            if not is_async and n in logged:
                continue
            title, tags, when, due, notes = lecture_todo(code, n, d)
            t = existing.get(n)
            if t is None:
                if i < len(held) or (seed and is_async):       # a future lecture only when seeding an async one
                    auto.create(title, tags, project=proj, when=when, deadline=due, notes=notes)
                continue
            auto.register.append(t.name)
            fixes = []                             # reconcile: real deadline + canonical title; tags only if untagged
            if t.due != due:
                k = (due - today).days
                fixes.append(f'set due date of to do id "{t.id}" to (theBase {"+" if k >= 0 else "-"} {abs(k)} * days)')
                t.due = due
            if t.name != title:
                fixes.append(f'set name of to do id "{t.id}" to "{title}"')
                t.name = title
            if not t.est_tag or not t.prio:
                fixes.append(f'set tag names of to do id "{t.id}" to "{tags}"')
                t.set_tags(tags)
            if fixes:
                if not auto.dry:
                    osa('tell application "Things3"\n  set theBase to current date\n  set time of theBase to 0\n  '
                        + "\n  ".join(fixes) + "\nend tell")
                auto.lines.append(f"fixed: {title} → due {due:%b %-d}")
                auto.register[-1] = title

def ladder_todos(auto):
    """Today's PREP ladder step for every key date, titled `T-<days left> <project> <name> · <step>`, P1, due today.
    Once a key date has passed, its open steps are cancelled and none is created. On the date itself they are left alone,
    except an exam's, which go that morning: PREP's exam day is "Nothing".
    Switch-over from the titles without the name (`T-<days left> <project> · <step>`): an open one is renamed, matched by
    its due date, the day its step fired, before the past check; one closed under that title is left closed, and if it
    was in today's earlier plan (state["last"]), today's renamed step counts as closed too."""
    today, last = auto.today, auto.state.get("last", {})
    planned = set(last.get("selected", []) + last.get("rolled", [])) if last.get("date") == today.isoformat() else set()
    for k in term.key_dates():
        if k.kind not in term.LADDERS:                       # an admin date has no ladder
            continue
        proj = PROJECT_OF[k.course]
        for left, (text, est) in term.LADDERS[k.kind].items():
            fired = k.date - dt.timedelta(days=left)
            if left == 0 or fired > today:
                continue
            title = f"T-{left} {proj} {k.name} · {re.sub(r'^T-\d+ ', '', text)}"
            old = f"T-{left} {proj} · {text}"
            t = auto.by_title.get(old)
            if t is not None and t.due == fired:
                auto.rename(t, title)
            elif fired == today and old in planned and auto.closed_by_hand(old):
                auto.known[title] = auto.known[old]
            if k.date < today or (k.kind == "exam" and k.date == today):    # past, or exam day (PREP: "Nothing")
                if title in auto.by_title:
                    auto.close(auto.by_title[title], "canceled",
                               f"{k.name} is today" if k.date == today else f"{k.name} on {k.date:%b %-d} is past")
            elif fired == today:
                auto.create(title, f"{est}, P1", project=proj, when=today, deadline=today,
                            notes=f"Ladder step for {k.label} on {k.date:%a %b %-d}. From PREP.md.")

def habit_todos(auto):
    """Today's revision habits, area UBC, due today. Any other open habit is cancelled: one from an earlier day, since a
    missed habit is not a debt that rolls over, and one under an old title (RENAMED_HABITS)."""
    today = auto.today
    on = lambda title: f"{title} ({today:%b %-d})"
    for old, new in RENAMED_HABITS.items():                 # ticked today under its old title: today's is done
        if auto.closed_by_hand(on(old)):
            auto.known[on(new)] = auto.known[on(old)]
    current = [on(title) for title, _, _ in HABITS]
    for t in [t for t in auto.todos if t.is_habit and t.name not in current]:
        auto.close(t, "canceled", "its title changed" if t.name.endswith(f"({today:%b %-d})") else "a missed habit does not roll over")
    for title, tags, notes in HABITS:
        auto.create(on(title), tags, area="UBC", when=today, deadline=today, notes=notes)

def reading_todos(auto):
    """The PHIL 385 Read/Log pair of every reading whose window is open. The reading's file completes both; when the
    window closes, an open one is cancelled. The Read is skipped when any open to-do already names the reading (he
    made his own) and is not created after its last class."""
    today = auto.today
    for slug, name, first, last in PHIL_READINGS:
        read, log = f"Read PHIL385: {name} (class {first:%b %-d})", f"Log PHIL385 reading: {name}"
        logged = os.path.exists(os.path.join(ROOT, "courses", "PHIL385", "readings", f"{slug}.md"))
        live = first - dt.timedelta(days=READ_AHEAD_DAYS) <= today <= last + dt.timedelta(days=LOG_WINDOW_DAYS)
        for t in [t for t in auto.todos if t.name in (read, log)]:
            if logged:
                auto.close(t, "completed")
            elif not live:
                auto.close(t, "canceled", f"{LOG_WINDOW_DAYS} days past its last class")
        if logged or not live:
            continue
        auto.create(log, "15m, P1", project="PHIL 385", deadline=last,
                    notes=f"Send Claude the 3 to 6 questions you wrote while reading, plus anything unclear (not photos "
                          f"of pages), and say `log PHIL385 reading {name}`. Claude saves courses/PHIL385/readings/{slug}.md, "
                          f"and this to-do closes itself on the next morning check.")
        his = any(name.lower() in t.name.lower() for t in auto.todos if t.name not in (read, log))
        span = f"on {first:%a %b %-d}" if last == first else f"from {first:%a %b %-d} to {last:%a %b %-d}"
        if today <= last and not his:
            auto.create(read, "1h, P1", project="PHIL 385", deadline=first,
                        notes=f"Discussed in class {span}. Write 3 to 6 questions while you read, "
                              f"plus anything unclear; the Log to-do sends them to Claude.")

def weekly_todos(auto):
    """The open-ended WEEKLY to-dos (novel pages, Friday revision block, questions for Kraal, groceries), each created
    WEEKLY_AHEAD days before its date."""
    today = auto.today
    for w in WEEKLY:
        d = today + dt.timedelta(days=(w["day"] - today.weekday()) % 7)
        while d <= today + dt.timedelta(days=WEEKLY_AHEAD):
            if w["first"] <= d <= w["last"]:
                auto.create(w["title"].format(d=d), w["tags"], project=w.get("project"), area=w.get("area"), when=d,
                            deadline=d + dt.timedelta(days=w["due_days"]), notes=w["notes"])
            d += dt.timedelta(days=7)

def ensure_auto_todos(today, todos, dry, state, seed=False):
    """Make the planner's own to-dos real: lecture close-outs, ladder steps, the daily habits, the PHIL 385 reading pairs
    and the WEEKLY to-dos. Returns (log lines, titles to register)."""
    auto = Auto(today, todos, dry, state)
    lecture_todos(auto, seed)
    ladder_todos(auto)
    habit_todos(auto)
    reading_todos(auto)
    weekly_todos(auto)
    return auto.lines, auto.register

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
    career_min = reserve_h(today, budget)

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
    for t in order:                                    # today's habits: a missed one is cancelled, never rolled
        if t.is_habit and t.est <= remaining:
            take(t)
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
    rollover = [t for t in cands if t not in selected and not t.is_event and not t.is_habit
                and t.when and t.when <= today]
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
    """Write to a temporary file and rename it over the old one, so a crash mid-write never leaves half a file."""
    os.makedirs(os.path.dirname(STATE), exist_ok=True)
    tmp = STATE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=1, ensure_ascii=False)
    os.replace(tmp, STATE)

def plan_rows(selected, today, start):
    """The plan in printed order, one list per line: two or more lecture logs that can start at `start` (not the log of a
    lecture still to come today, see ready_at) share the first line, the rest follow by score."""
    logs = [t for t in selected if re.match(r"^Log \w+ lec \d+", t.name) and ready_at(t, today) <= start]
    logs = logs if len(logs) > 1 else []
    rest = sorted((t for t in selected if t not in logs), key=lambda t: (-t.score, t.due or dt.date.max))
    return ([logs] if logs else []) + [[t] for t in rest]

def ready_at(t, today):
    """When to-do t can start, in minutes after midnight: the end of its lecture for the log of a lecture held today,
    else 0."""
    m = re.match(r"^Log (\w+) lec (\d+)\b", t.name)
    if not m or m[1] not in term.COURSES or not term.COURSES[m[1]]["time"]:
        return 0
    held, n = held_today(m[1], today)
    return term.span(*term.COURSES[m[1]]["time"])[1] if held and int(m[2]) == n else 0

def clock(today, rows, now):
    """Start times, in the order to do them. A line is ready at once, except a lecture's log, which is ready when that
    lecture ends (ready_at). A line starts where the line before it ended (the first at `now`, minutes after midnight)
    or when it is ready, whichever is later, moved past any lecture, lab or exam it would overlap. The next line is the
    first in `rows` order that is ready by the time the first ready one (or, when none is, the soonest ready) could
    start. Events and habits take no clock time (an event has its own slot, a habit's is in its title).
    Returns ([(line, start minute or None)], [lines that would end after STUDY_END])."""
    slots, end = class_slots(today), term.to_min(STUDY_END)

    def minutes(row):
        return round(sum(t.est for t in row) * 60)

    def start_of(row, ready):
        start = max(now, ready)
        for a, b in slots:
            if start < b and start + minutes(row) > a:
                start = b
        return start
    pending = [(row, max(ready_at(t, today) for t in row)) for row in rows]
    kept, dropped = [], []
    while pending:
        first = next((p for p in pending if p[1] <= now), None) or min(pending, key=lambda p: p[1])
        row, ready = pending.pop(next(i for i, p in enumerate(pending) if p[1] <= start_of(*first)))
        if all(t.is_event or t.is_habit for t in row):
            kept.append((row, None))
            continue
        start = start_of(row, ready)
        if start + minutes(row) > end:
            dropped.append(row)
            continue
        kept.append((row, start))
        now = start + minutes(row)
    return kept, dropped

def cushions(today, budget, todos, state, factors):
    """One line per date in 1..CUSHION_DAYS days that has an exam, deliverable, paper or assignment (an admin date has
    no ladder and gets none), in date order. Its need counts all the work due before it, so it includes the needs of
    the lines above it: the estimates of every open course to-do due on or before that date, plus every ladder step
    still to come before it, whichever item the step is for. Free: the budgets from today (today's is `budget`) to the
    day before it, less the Career reserve. When the need is more than the free hours, the line is a ⚠."""
    steps = [(k.date - dt.timedelta(days=left), planned_h(est, factors)) for k in term.key_dates()
             for left, (_, est) in term.LADDERS.get(k.kind, {}).items() if 0 < left < (k.date - today).days]
    items = {}
    for k in term.key_dates():
        if k.kind in term.LADDERS and 0 < (k.date - today).days <= CUSHION_DAYS:
            items.setdefault(k.date, []).append(f"{PROJECT_OF[k.course]} {k.name}")
    lines = []
    for d in sorted(items):
        need = sum(t.est for t in todos if t.project in PROJECT_OF.values() and t.due and t.due <= d)
        need = round(need + sum(h for day, h in steps if day < d), 2)
        free = 0.0
        for i in range((d - today).days):
            day = today + dt.timedelta(days=i)
            b = budget if i == 0 else budget_for(day, state)
            free += b - reserve_h(day, b)
        names, one = " and ".join(items[d]), len(items[d]) == 1
        if need > free:
            lines.append(f"⚠ {names} {'has' if one else 'have'} {need:g}h of work before {d:%a %b %-d} but only {free:g}h free")
        else:
            lines.append(f"Cushion: {names} {'has' if one else 'have'} {need:g}h of work before {'it' if one else 'them'}, {free:g}h free")
    return lines

def time_check(today, state, done):
    """The to-do completed yesterday to ask "how long did it take?" about, or None. done = completed(day=yesterday). Only
    to-dos with an estimate tag, no recorded time and no habit title count. The day's pick comes from the next
    estimate tag after the one asked last, so every tag collects samples; a re-run the same day asks the same."""
    timed, by_tag = state.get("actuals", {}), {}
    for t, _ in sorted(done, key=lambda r: r[0].name):
        if t.est_tag not in (None, "event") and t.name not in timed and not t.is_habit:
            by_tag.setdefault(t.est_tag, []).append(t.name)
    last = state.get("time_check", {})
    if last.get("date") == today.isoformat() and last["title"] in by_tag.get(last["tag"], []):
        return last["title"]
    sizes = [k for k in EST if k != "event"]
    i = sizes.index(last["tag"]) + 1 if last else 0
    tag = next((s for s in sizes[i:] + sizes[:i] if s in by_tag), None)
    if tag is None:
        return None
    state["time_check"] = {"date": today.isoformat(), "tag": tag, "title": by_tag[tag][0]}
    return by_tag[tag][0]

def record_actuals(pairs, state, dry):
    """--actual "TITLE=45m": store how long each completed to-do took, with its estimate tag and completion date (the
    latest, when several share the title), under state["actuals"] keyed by title. Every pair is checked first, so a
    bad one stops the run with nothing recorded."""
    checked = []
    for pair in pairs:
        title, _, took = pair.rpartition("=")
        title = title.strip()
        m = re.fullmatch(r"(?:(\d+(?:\.\d+)?)h)?(?:(\d+)m)?", took.strip())
        if not title or not m or not any(m.groups()):
            raise SystemExit(f'--actual takes "TITLE=45m" (or 2h, 1.5h, 1h30m), got {pair!r}')
        found = completed(title=title)
        if not found:
            raise SystemExit(f"no completed to-do is titled exactly {title!r}: tick it in Things3 first, or copy its title")
        t, day = max(found, key=lambda r: r[1])
        if t.est_tag in (None, "event"):
            raise SystemExit(f"{title!r} has no estimate tag (15m/30m/1h/2h/3h), so there is nothing to compare it with")
        checked.append((title, t.est_tag, round(float(m[1] or 0) * 60 + int(m[2] or 0)), day))
    actuals = state.setdefault("actuals", {})
    for title, tag, minutes, day in checked:
        actuals[title] = {"est": tag, "min": minutes, "date": day.isoformat()}
        print(f"recorded: {title} took {minutes}m against {tag}")
    factors, counts = est_factors(state), {}
    for a in actuals.values():
        counts[a["est"]] = counts.get(a["est"], 0) + 1
    for tag in (k for k in EST if k in counts):
        print(f"- {tag}: {counts[tag]} timed, " + (f"planned as {tag} ×{round(factors[tag], 2):g}" if tag in factors
                                                     else f"scaling starts at {MIN_SAMPLES}"))
    if not dry:
        save_state(state)

# ---- weekly mode ---------------------------------------------------------------------------------
def week_window(today, next_week=False):
    """Tomorrow through the coming Sunday (on a Sunday: the whole next week).
    next_week=True: the coming Monday through its Sunday, whatever day it is."""
    start = today + dt.timedelta(days=1)
    if next_week:
        start = today + dt.timedelta(days=(MON - today.weekday()) % 7 or 7)
    return start, start + dt.timedelta(days=6 - start.weekday())

def budget_for(d, state):
    """A date's hour budget: the --budget set for it, else its weekday's, times LIGHT_EVE the day before an exam."""
    return state.get("budget", {}).get(d.isoformat(), BUDGET_H[d.weekday()] * (LIGHT_EVE if exams_on(d + dt.timedelta(days=1)) else 1))

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
    lines = ['tell application "Things3"', '  set theBase to current date', '  set time of theBase to 0']
    for t, _old, new in changes:
        k = (new - today).days                       # today is the real today: a real run refuses --date
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

def print_day(today, budget, kept, rollover, warn, cands, todos, eve, factors, auto, state, dry):
    """The brief's Plan today block, down to First thing tomorrow; main prints the Time check line after it."""
    used = sum(t.est for row, _ in kept for t in row)
    print(f"**Plan today — {used:g} of {budget:g} h**{'  (DRY RUN)' if dry else ''}")
    if eve:
        print(f"- {' and '.join(f'{PROJECT_OF[k.course]} {k.name}' for k in eve)} {'is' if len(eve) == 1 else 'are'} "
              f"tomorrow, so today plans {fmt_h(budget)} instead of {fmt_h(BUDGET_H[today.weekday()])}.")
    if factors:
        print("- Scaled by your actual times: " + ", ".join(
            f"{tag} ×{round(f, 2):g}" for tag, f in sorted(factors.items(), key=lambda x: EST[x[0]])))
    for row, start in kept:
        at = f"{start // 60:02d}:{start % 60:02d} " if start is not None and any(t.prio == "P1" for t in row) else ""
        if len(row) > 1:                                  # several lecture logs, one line
            late = [t for t in row if t.due and t.due < today]
            print(f"- {at}[{fmt_h(sum(t.est for t in row))}] Log {len(row)} lectures · " +
                  " · ".join(re.sub(r"^Log (\w+) lec (\d+) \((.*?)\).*", r"\1 lec \2 (\3)", t.name) for t in row) +
                  (f" · {len(late)} overdue" if late else " · due today"))
            continue
        t = row[0]
        due = ("" if not t.due else " · due today" if t.due == today else
               f" · OVERDUE since {t.due:%b %-d}" if t.due < today else f" · due {t.due:%b %-d}")
        tag = "event" if t.is_event else fmt_h(t.est)
        print(f"- {at}[{tag}] {t.where()} · {t.name[:80]}{due}")
    if rollover:
        print("**Rolled to tomorrow**")
        for t in rollover:
            n = state.get("rolled", {}).get(t.id, 0)
            print(f"- {t.where()} · {t.name[:80]}" + (f" · rolled {n}×" if n else ""))
    need = [t for t in cands if not t.est_tag or not t.prio]
    if need:
        print("**Needs an estimate/priority tag** (15m/30m/1h/2h/3h + P1/P2/P3)")
        for t in need:
            print(f"- {t.where()} · {t.name[:80]}")
    inbox = [t for t in todos if t.lst == "Inbox"]
    if inbox:
        print(f"**Inbox: {len(inbox)} to file** — " + "; ".join(t.name[:40] for t in inbox))
    for w in warn:
        print(f"- ⚠ {w}")
    for c in cushions(today, budget, todos, state, factors):
        print(f"- {c}")
    for l in auto:
        print(f"- auto: {l}")
    if rollover:
        print(f"- First thing tomorrow: {rollover[0].where()} · {rollover[0].name[:80]}")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--date")
    ap.add_argument("--budget", type=float)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--no-lectures", action="store_true", help="skip the automatic to-dos (lectures, ladder steps, habits, readings, weekly)")
    ap.add_argument("--no-ladder", action="store_true", help="alias of --no-lectures")
    ap.add_argument("--no-links", action="store_true", help="skip attaching links.md URLs to to-do notes")
    ap.add_argument("--seed", action="store_true", help="pre-create every ASIA 250 watch+quiz to-do for the term")
    ap.add_argument("--week", action="store_true", help="weekly mode: place next week's work on days (Sundays, 'plan my week')")
    ap.add_argument("--next-week", action="store_true", help="with --week: plan the coming Mon→Sun even if today isn't Sunday")
    ap.add_argument("--actual", action="append", metavar='"TITLE=45m"', help="record how long a completed to-do really took (repeatable); plans nothing")
    a = ap.parse_args()
    if a.date and not a.dry_run:
        ap.error("--date needs --dry-run: Things3 schedules relative to the real today, so a real run for another date would misplace to-dos")
    now = dt.datetime.now().astimezone()
    today = dt.date.fromisoformat(a.date) if a.date else now.date()
    state = load_state()
    if a.actual:
        record_actuals(a.actual, state, a.dry_run)
        return
    overrides = state.setdefault("budget", {})          # per-date budget set with --budget (sticks for that date)
    if a.budget is not None and not a.dry_run:
        overrides[today.isoformat()] = a.budget
    budget = a.budget if a.budget is not None else budget_for(today, state)
    eve = [] if a.budget is not None or today.isoformat() in overrides else exams_on(today + dt.timedelta(days=1))
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
    factors = est_factors(state)
    for t in todos:                                       # a tag timed often enough plans as tag × its factor
        if t.est_tag in factors:
            t.est = planned_h(t.est_tag, factors)
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
    start = term.to_min(DAY_START)
    if not a.date:                                        # planning the real today: nothing starts before now
        start = max(start, -(-(now.hour * 60 + now.minute) // 15) * 15)
    kept, dropped = clock(today, plan_rows(selected, today, start), start)
    for row in dropped:                                   # no time left before STUDY_END: the line leaves today's plan
        moves = False
        for t in row:
            selected.remove(t)
            if t.when and t.when <= today:                # it was in Today: it rolls like any other item that did not fit
                rollover.append(t)
                moves = True
        warn.append(f"{'; '.join(short(t.name, 40) for t in row)} ({fmt_h(sum(t.est for t in row))}) would end after {STUDY_END}, "
                    + ("so it moves to tomorrow" if moves else "so it is not planned today"))
    rollover.sort(key=lambda t: (-t.score, t.due or dt.date.max))
    if not a.dry_run:
        apply(today, selected, rollover, state, todos)
    print_day(today, budget, kept, rollover, warn, cands, todos, eve, factors, auto, state, a.dry_run)
    check = time_check(today, state, completed(day=today - dt.timedelta(days=1)))   # after apply: a failure here leaves the plan in place
    if check:
        print(f"- Time check: how long did {check} take?")
    if not a.dry_run:
        save_state(state)

if __name__ == "__main__":
    main()
