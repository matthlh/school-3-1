#!/usr/bin/env python3
"""Shared code for the quiz-me skill: question bank parsing, ledger read/write, per-question
history, topic matching, exam proximity, and the focus report.

Files it owns:
  ledger.md                     — "## Due now" block and the "## All topics" table rows (SRS state)
  courses/<CODE>/01-topics.md   — best-effort mirror of Last/Grade/Streak/Next per topic row
  routines/quiz-state.json      — per-question history {id: {course, topic, history: [[date, grade]]}}
  routines/quiz-session.json    — the pending session written by quiz_pick.py, consumed by quiz_grade.py
  routines/quiz/YYYY-MM-DD.md   — human-readable session log

Set SCHOOL_ROOT to point at a copy of the workspace when testing.
"""
import datetime as dt, glob, hashlib, json, os, random, re, sys

ROOT = os.environ.get("SCHOOL_ROOT", "/Users/matthe/Documents/CodingProjects/School 3-1")
LEDGER = os.path.join(ROOT, "ledger.md")
STATE = os.path.join(ROOT, "routines", "quiz-state.json")
SESSION = os.path.join(ROOT, "routines", "quiz-session.json")
QUIZ_DIR = os.path.join(ROOT, "routines", "quiz")
RUNS_DIR = os.path.join(ROOT, "routines", "runs")
MC_SCRIPTS = os.path.join(ROOT, ".claude", "skills", "morning-check", "scripts")

COURSE_LABEL = {"STAT251": "STAT 251", "CPSC310": "CPSC 310", "PHIL385": "PHIL 385", "ASIA250": "ASIA 250"}
LABEL_COURSE = {v: k for k, v in COURSE_LABEL.items()}
GRADES = ("X", "~", "O")
GRADE_RANK = {"X": 0, "~": 1, "O": 2}          # lower = worse; a topic's session grade is the worst
MIN_QUESTIONS_PER_TOPIC = 6                    # below this, an X/~ topic is flagged "needs more questions"
LEECH_X_IN_LAST = (2, 3)                       # ≥2 X in the last 3 asks → leech: rewrite or split
# Question types the exams reward, per course (first = strongest preference when picking).
TYPE_PREF = {"CPSC310": ["recall", "critique", "apply", "derive"],
             "PHIL385": ["recall", "apply", "critique", "derive"],
             "STAT251": ["apply", "derive", "critique", "recall"],
             "ASIA250": ["recall", "apply", "critique", "derive"]}

# ---- dates / text --------------------------------------------------------------------------

def today_local():
    return dt.datetime.now().astimezone().date()

def parse_date(s):
    s = (s or "").strip()
    try:
        return dt.date.fromisoformat(s)
    except ValueError:
        return None

def next_after(grade, streak):
    """CLAUDE.md spacing ladder. Returns (new_streak, days_until_next)."""
    if grade == "X":
        return 0, 1
    if grade == "~":
        return streak, 3
    s = streak + 1
    return s, (7 if s == 1 else 16 if s == 2 else 35)

def norm(s):
    s = (s or "").lower()
    s = re.sub(r"\*+|\(.*?\)", " ", s)             # drop bold markers and parentheticals
    s = re.sub(r"[–—\-/·:,;.!?\"'’“”]", " ", s)
    s = re.sub(r"[^a-z0-9+ ]", " ", s)
    return re.sub(r"\s+", " ", s).strip()

def codes_of(topic):
    """Leading LO-style code(s) of a topic name: '1b–c Displays' → ['1b', '1c']; '2k …' → ['2k']."""
    m = re.match(r"^\s*(\d+)([a-z]{1,2})(?:[–\-]([a-z]{1,2}))?\b", topic or "")
    if not m:
        return []
    num, a, b = m.group(1), m.group(2), m.group(3)
    if not b or len(a) != 1 or len(b) != 1:
        return [f"{num}{a}"] + ([f"{num}{b}"] if b else [])
    return [f"{num}{chr(c)}" for c in range(ord(a), ord(b) + 1)]

def qid(course, question):
    return hashlib.sha1(f"{course}|{norm(question)}".encode()).hexdigest()[:8]

# ---- question bank -------------------------------------------------------------------------

Q_RE = re.compile(r"^### Q:\s*(.*)$")
META_RE = re.compile(r"\*\*Topic:\*\*\s*(.+?)\s+\*\*Lec:\*\*\s*(.+?)\s+\*\*Type:\*\*\s*(\w+)")

def load_questions(courses=None):
    out = []
    for path in sorted(glob.glob(os.path.join(ROOT, "courses", "*", "02-questions.md"))):
        course = os.path.basename(os.path.dirname(path))
        if courses and course not in courses:
            continue
        out.extend(_parse_bank(path, course))
    return out

def _parse_bank(path, course):
    qs, cur, fence = [], None, False
    with open(path, encoding="utf-8") as f:
        lines = f.read().split("\n")

    def flush():
        if not cur:
            return
        q = " ".join(l.strip() for l in cur["q"] if l.strip())
        meta = cur["meta"] or ("(untagged)", "?", "recall")
        qs.append(dict(id=qid(course, q), course=course, topic=meta[0].strip(), lec=meta[1].strip(),
                       type=meta[2].strip().lower(), q=q, a="\n".join(cur["a"]).strip(),
                       file=os.path.relpath(path, ROOT), line=cur["line"]))

    for i, line in enumerate(lines, 1):
        if line.startswith("```"):
            fence = not fence
            continue
        if fence:
            continue
        m = Q_RE.match(line)
        if m:
            flush()
            cur = dict(line=i, q=[m.group(1)], meta=None, a=[], in_a=False)
            continue
        if cur is None:
            continue
        if re.match(r"^#{1,2} ", line) or line.strip() == "---":
            flush(); cur = None
            continue
        mm = META_RE.search(line)
        if mm and cur["meta"] is None:
            cur["meta"] = mm.groups()
            continue
        if line.startswith("**A:**"):
            cur["in_a"] = True
            cur["a"].append(line[len("**A:**"):].strip())
            continue
        (cur["a"] if cur["in_a"] else cur["q"]).append(line)
    flush()
    return qs

# ---- ledger.md -----------------------------------------------------------------------------

def load_ledger():
    """Returns (text, rows). Each row: course (code), label, topic, lec, last, grade, streak, next,
    next_date, idx (line index in text)."""
    with open(LEDGER, encoding="utf-8") as f:
        text = f.read()
    lines = text.split("\n")
    rows, in_table = [], False
    for i, line in enumerate(lines):
        if line.startswith("## "):
            in_table = line.strip() == "## All topics"
            continue
        if not in_table or not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) != 7 or cells[0] in ("Course", "") or set(cells[0]) <= set("-: "):
            continue
        label, topic, lec, last, grade, streak, nxt = cells
        rows.append(dict(course=LABEL_COURSE.get(label, label.replace(" ", "")), label=label, topic=topic,
                         lec=lec, last=last, grade=grade if grade in GRADES else "", streak=int(streak or 0),
                         next=nxt, next_date=parse_date(nxt), idx=i))
    return text, rows

def write_ledger(text, rows, today, due_rows=None, log_line=None):
    """Rewrite the All-topics rows from `rows` (by idx), regenerate the Due-now block, and
    optionally append a Session-log row. Everything else is left byte-identical."""
    lines = text.split("\n")
    for r in rows:
        lines[r["idx"]] = (f"| {r['label']} | {r['topic']} | {r['lec']} | {r['last'] or '—'} | "
                           f"{r['grade'] or '—'} | {r['streak']} | {r['next'] or '—'} |")
    # Due now block
    start = next((i for i, l in enumerate(lines) if l.strip() == "## Due now"), None)
    if start is not None:
        end = next((i for i in range(start + 1, len(lines)) if lines[i].startswith("## ")), len(lines))
        block = ["## Due now", ""] + due_block(rows, today) + [""]
        lines[start:end] = block
    if log_line:
        last_row = max((i for i, l in enumerate(lines) if l.startswith("|")), default=None)
        if last_row is not None:
            lines.insert(last_row + 1, log_line)
    with open(LEDGER, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

def due_block(rows, today):
    due = sorted((r for r in rows if r["next_date"] and r["next_date"] <= today),
                 key=lambda r: (r["next_date"], r["label"]))
    if due:
        out = [f"_{len(due)} topic{'s' if len(due) != 1 else ''} due as of {today:%a %b %-d}. "
               f"Say **quiz me**._", ""]
        for r in due:
            late = (today - r["next_date"]).days
            tag = r["grade"] or "unquizzed"
            when = "due today" if late == 0 else f"overdue {late} d"
            out.append(f"- {r['label']} · {r['topic']} · {when} · last {tag}")
        return out
    upcoming = sorted((r for r in rows if r["next_date"]), key=lambda r: r["next_date"])
    if not upcoming:
        return ["_Nothing scheduled yet — log a lecture to start the ledger._"]
    d = upcoming[0]["next_date"]
    n = [r for r in upcoming if r["next_date"] == d]
    labels = sorted({r["label"] for r in n})
    return [f"_Nothing due today. Next: {len(n)} topic{'s' if len(n) != 1 else ''} on "
            f"**{d:%a %b %-d}** ({', '.join(labels)})._"]

# ---- topic matching (question tag → ledger row) -------------------------------------------

def match_topic(course, qtopic, rows):
    cands = [r for r in rows if r["course"] == course]
    if not cands:
        return None
    n = norm(qtopic)
    for r in cands:
        if norm(r["topic"]) == n:
            return r
    for r in cands:
        rn = norm(r["topic"])
        if len(n) >= 6 and (rn.startswith(n) or n.startswith(rn)):
            return r
    qc = codes_of(qtopic)
    if qc:
        for r in cands:
            if set(qc) & set(codes_of(r["topic"])):
                return r
    best, score = None, 0.0
    for r in cands:
        a, b = set(n.split()), set(norm(r["topic"]).split())
        j = len(a & b) / max(1, len(a | b))
        if j > score:
            best, score = r, j
    return best if score >= 0.5 else None

# ---- per-question state --------------------------------------------------------------------

def load_state():
    if os.path.exists(STATE):
        with open(STATE, encoding="utf-8") as f:
            return json.load(f)
    return {"questions": {}, "sessions": []}

def save_state(state):
    os.makedirs(os.path.dirname(STATE), exist_ok=True)
    with open(STATE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=1, ensure_ascii=False)

def history(state, q):
    return [(parse_date(d), g) for d, g in state["questions"].get(q["id"], {}).get("history", [])]

def is_leech(hist):
    k, n = LEECH_X_IN_LAST
    return sum(1 for _, g in hist[-n:] if g == "X") >= k

# ---- exams ---------------------------------------------------------------------------------

def exams_by_course(today):
    """{course: (days_left, label)} for the nearest upcoming exam per course, from term.py."""
    sys.path.insert(0, MC_SCRIPTS)
    try:
        import term
    except Exception:
        return {}
    out = {}
    for d, course, label, kind in sorted(term.KEY_DATES):
        left = (d - today).days
        if kind == "exam" and left >= 0 and course not in out:
            out[course] = (left, label)
    return out

# ---- focus report --------------------------------------------------------------------------

def bank_by_topic(rows, questions):
    """{ledger row idx: [questions]} plus a list of questions whose tag matched no row."""
    by, unmatched = {}, []
    for q in questions:
        r = match_topic(q["course"], q["topic"], rows)
        if r is None:
            unmatched.append(q)
        else:
            by.setdefault(r["idx"], []).append(q)
    return by, unmatched

def focus(rows, questions, state, today, exams, courses=None):
    rows = [r for r in rows if not courses or r["course"] in courses]
    by, unmatched = bank_by_topic(rows, questions)
    due = [r for r in rows if r["next_date"] and r["next_date"] <= today]
    overdue = [r for r in due if r["next_date"] < today]
    weak = sorted((r for r in rows if r["grade"] in ("X", "~")), key=lambda r: (GRADE_RANK[r["grade"]], r["next"]))
    unquizzed = [r for r in rows if not r["grade"]]
    needs_more, empty = [], []
    for r in rows:
        k = len(by.get(r["idx"], []))
        if k == 0:
            empty.append(r)
        elif r["grade"] in ("X", "~") and k < MIN_QUESTIONS_PER_TOPIC:
            needs_more.append((r, k))
    leeches = [q for q in questions if is_leech(history(state, q))]
    counts = {}
    for q in questions:
        counts[q["course"]] = counts.get(q["course"], 0) + 1
    return dict(due=due, overdue=overdue, weak=weak, unquizzed=unquizzed, needs_more=needs_more,
                empty=empty, leeches=leeches, unmatched=unmatched, counts=counts, by_topic=by, rows=rows)

def print_focus(fx, today, exams):
    print(f"== QUIZ FOCUS for {today:%a %Y-%m-%d}")
    ex = [f"{COURSE_LABEL.get(c, c)} {lbl.split(' (')[0]} in {d} d" for c, (d, lbl) in sorted(exams.items(), key=lambda x: x[1][0]) if d <= 21]
    print("-- Exams ≤ 21 d: " + (" · ".join(ex) if ex else "none"))
    by_course = {}
    for r in fx["due"]:
        by_course[r["label"]] = by_course.get(r["label"], 0) + 1
    print(f"-- Due: {len(fx['due'])} topic{'s' if len(fx['due']) != 1 else ''} ({', '.join(f'{k} {v}' for k, v in sorted(by_course.items())) or '—'}) · "
          f"overdue {len(fx['overdue'])} · X {sum(1 for r in fx['weak'] if r['grade']=='X')} · "
          f"~ {sum(1 for r in fx['weak'] if r['grade']=='~')} · unquizzed {len(fx['unquizzed'])}")
    if fx["weak"]:
        print("-- Weakest: " + " · ".join(f"{r['label']} {r['topic'][:40]} [{r['grade']}]" for r in fx["weak"][:6]))
    if fx["needs_more"] or fx["empty"] or fx["leeches"]:
        print("-- Needs more questions:")
        for r, k in fx["needs_more"]:
            print(f"   {r['label']} · {r['topic'][:60]} · graded {r['grade']} with only {k} q (want ≥{MIN_QUESTIONS_PER_TOPIC})")
        for r in fx["empty"]:
            print(f"   {r['label']} · {r['topic'][:60]} · in the ledger but NO questions in the bank")
        for q in fx["leeches"]:
            print(f"   LEECH {COURSE_LABEL[q['course']]} · {q['q'][:70]}… · missed ≥{LEECH_X_IN_LAST[0]} of last {LEECH_X_IN_LAST[1]} — rewrite or split it")
    if fx["unmatched"]:
        print("-- ⚠ Question tags that match no ledger topic (fix the **Topic:** tag or add the ledger row):")
        for q in fx["unmatched"][:10]:
            print(f"   {q['file']}:{q['line']} · Topic '{q['topic']}'")
    print("-- Bank: " + " · ".join(f"{COURSE_LABEL[c]} {fx['counts'].get(c, 0)} q" for c in COURSE_LABEL))
