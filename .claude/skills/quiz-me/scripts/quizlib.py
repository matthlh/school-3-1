#!/usr/bin/env python3
"""Shared code for the quiz-me skill: question bank parsing, the notes page behind each question,
ledger read/write, per-question history, topic matching, exam proximity, and the focus report.

Files it owns:
  ledger.md                     — "## Due now" block and the "## All topics" table rows (SRS state)
  courses/<CODE>/01-topics.md   — best-effort mirror of Last/Grade/Streak/Next per topic row
  routines/quiz-state.json      — per-question history {id: {course, topic, history: [[date, grade]]}}
  routines/quiz-session.json    — the pending session written by quiz_pick.py, consumed by quiz_grade.py
  routines/transit-session.json — the same for the transit deck, which is graded the next morning (--transit), so a
                                  quiz picked in between can neither overwrite it nor take its grades
  routines/quiz/YYYY-MM-DD.md   — human-readable session log

Set SCHOOL_ROOT to point at a copy of the workspace when testing.
"""
import datetime as dt, glob, hashlib, json, os, random, re, sys
from urllib.parse import quote

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("SCHOOL_ROOT") or os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))   # the workspace this script sits in
LEDGER = os.path.join(ROOT, "ledger.md")
STATE = os.path.join(ROOT, "routines", "quiz-state.json")
SESSION = os.path.join(ROOT, "routines", "quiz-session.json")
TRANSIT_SESSION = os.path.join(ROOT, "routines", "transit-session.json")
QUIZ_DIR = os.path.join(ROOT, "routines", "quiz")
RUNS_DIR = os.path.join(ROOT, "routines", "runs")
MC_SCRIPTS = os.path.join(ROOT, ".claude", "skills", "morning-check", "scripts")
SITE_URL = "https://matthlh.github.io/school-3-1/"   # the public notes site; a page is SITE_URL + "#/" + its path

COURSE_LABEL = {"STAT251": "STAT 251", "CPSC310": "CPSC 310", "PHIL385": "PHIL 385", "ASIA250": "ASIA 250"}
LABEL_COURSE = {v: k for k, v in COURSE_LABEL.items()}
GRADES = ("X", "~", "O")
GRADE_RANK = {"X": 0, "~": 1, "O": 2}          # lower = worse; a topic's session grade is the worst
MIN_QUESTIONS_PER_TOPIC = 6                    # below this, an X/~ topic is flagged "needs more questions"
LEECH_X_IN_LAST = (2, 3)                       # ≥2 X in the last 3 asks → leech: rewrite or split
# A question under a `## Long problems` heading needs paper (Matt, 2026-10-05): never in the bus deck,
# steps only in a normal session, worked in full against a clock in the Friday set (quiz_pick.py --long).
LONG_SECTION = "long problems"
MINUTES_PER_PART = 2                           # the Friday set's clock; a first guess at the midterm's pace
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

def parts(q):
    """How many answers a long problem asks for: its (a), (b), … labels, else its (i), (ii), … labels, else 3."""
    letters = set(re.findall(r"\(([a-h])\)", q["q"]))
    romans = set(re.findall(r"\((i{1,3}|iv|v|vi)\)", q["q"]))
    return len(letters) or len(romans) or 3

def load_questions(courses=None):
    out = []
    for path in sorted(glob.glob(os.path.join(ROOT, "courses", "*", "02-questions.md"))):
        course = os.path.basename(os.path.dirname(path))
        if courses and course not in courses:
            continue
        out.extend(attach_sources(_parse_bank(path, course), course))
    return out

def _parse_bank(path, course):
    """One bank file → its questions. The stem comes twice: `q`, its prose joined into one line without fenced code,
    which the id hashes, and `q_display`, the stem exactly as written (line breaks, bullets, tables and code blocks
    kept), which is what gets shown. So ids and the history keyed by them stay as they were before stems were shown
    as written, and editing only a stem's code keeps its history. The answer `a` keeps its code blocks. A fence
    outside any question (the format example in each bank's header) is skipped whole, so the `### Q:` inside it is
    not read as a question."""
    qs, cur, fence, section = [], None, False, None
    with open(path, encoding="utf-8") as f:
        lines = f.read().split("\n")

    def flush():
        if not cur:
            return
        q = " ".join(l.strip() for l in cur["q"] if l.strip())
        meta = cur["meta"] or ("(untagged)", "?", "recall")
        qs.append(dict(id=qid(course, q), course=course, topic=meta[0].strip(), lec=meta[1].strip(),
                       type=meta[2].strip().lower(), q=q, q_display="\n".join(cur["show"]).strip(),
                       a="\n".join(cur["a"]).strip(), file=os.path.relpath(path, ROOT), line=cur["line"],
                       section=cur["section"], long=(cur["section"] or "").lower().startswith(LONG_SECTION)))

    for i, line in enumerate(lines, 1):
        if line.startswith("```") or fence:
            if line.startswith("```"):
                fence = not fence
            if cur and cur["in_a"]:
                cur["a"].append(line)
            elif cur:
                cur["show"].append(line)
            continue
        if line.startswith("## "):
            section = line[3:].strip()          # the `## ` heading a question sits under (the site's group title)
        m = Q_RE.match(line)
        if m:
            flush()
            cur = dict(line=i, q=[m.group(1)], show=[m.group(1)], meta=None, a=[], in_a=False, section=section)
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
        if cur["in_a"]:
            cur["a"].append(line)
        else:
            cur["q"].append(line)
            cur["show"].append(line)
    flush()
    return qs

# ---- source pages (the lecture or reading notes each question comes from) -------------------
# Mirrored in notes-app/src/sources.ts, which links each question card to the same page: keep the rules in step.

LEC_FILE_RE = re.compile(r"^(\d+)(?:-(\d+))?-")             # 05-06-<slug>.md covers lectures 5–6 (as term.py reads it)
LEC_TAG_RE = re.compile(r"^(\d+)(?:\s*[–—-]\s*(\d+))?$")     # **Lec:** 6 or 5–6

def lec_span(tag):
    """'5–6' → (5, 6), '6' → (6, 6); a non-lecture tag ('WW2', 'reading', 'Lab 1') → None."""
    m = LEC_TAG_RE.match((tag or "").strip())
    return (int(m.group(1)), int(m.group(2) or m.group(1))) if m else None

def _words(s):
    """Lowercase words with apostrophes dropped: "Seducer's Diary" → ['seducers', 'diary']."""
    return re.sub(r"[^a-z0-9]+", " ", re.sub(r"['’]", "", (s or "").lower())).split()

def _pages(course):
    """Lecture files as (first, last, path) and reading files as (slug words, path), paths workspace-relative.
    Staged outlines (`_NN-…`) never count: the lecture pattern needs a leading digit."""
    base = os.path.join(ROOT, "courses", course)
    lecs = []
    for p in sorted(glob.glob(os.path.join(base, "lectures", "*.md"))):
        m = LEC_FILE_RE.match(os.path.basename(p))
        if m:
            lecs.append((int(m.group(1)), int(m.group(2) or m.group(1)), os.path.relpath(p, ROOT)))
    reads = [(_words(os.path.basename(p)[:-3]), os.path.relpath(p, ROOT))
             for p in sorted(glob.glob(os.path.join(base, "readings", "*.md"))) if not os.path.basename(p).startswith("_")]
    return lecs, reads

def _lecture_file(span, lecs):
    """The file whose NN or NN-MM prefix covers the whole span (narrowest first), else the one covering its start."""
    lo, hi = span
    for a, b in ((lo, hi), (lo, lo)):
        hits = [f for f in lecs if f[0] <= a and b <= f[1]]
        if hits:
            return min(hits, key=lambda f: (f[1] - f[0], f[2]))[2]
    return None

def _reading_file(heading, reads):
    """The reading whose slug words each start a word of the `## ` heading; the one named earliest wins.
    '## Reading: *Either/Or*, "Crop Rotation" (Sep 21–23)' → readings/crop-rotation.md."""
    hw, best = _words(heading), None
    for sw, path in reads:
        at = [next((i for i, w in enumerate(hw) if w.startswith(s)), None) for s in sw]
        if sw and None not in at and (best is None or min(at) < best[0]):
            best = (min(at), path)
    return best[1] if best else None

def _topic_lecture(i, tags, direct):
    """The lecture file most other questions with question i's Topic tag point at; ties go to the earliest lecture.
    Tags compare after norm(), as match_topic does: equal first, else one a prefix of the other (6+ characters)."""
    t = tags[i]
    if not t:
        return None
    for same in (lambda u: u == t, lambda u: min(len(u), len(t)) >= 6 and (u.startswith(t) or t.startswith(u))):
        counts = {}
        for j, u in enumerate(tags):
            if j != i and direct[j] and same(u):
                counts[direct[j]] = counts.get(direct[j], 0) + 1
        if counts:
            return min(counts, key=lambda p: (-counts[p], p))
    return None

def page_title(path):
    """Plain link text from the file's H1: 'Lecture 6 notes: Conditional probability and independence',
    'Lectures 1–2 notes: …', 'Reading notes: Either/Or, "Crop Rotation"'. Drops the course, the lecture number
    and date, a 'Ch 3:' prefix, a reading's dates and emphasis markers."""
    name = os.path.basename(path)[:-3]
    m = LEC_FILE_RE.match(name)
    reading = "/readings/" in path
    kind = ("Reading notes" if reading else
            f"Lectures {int(m.group(1))}–{int(m.group(2))} notes" if m and m.group(2) else
            f"Lecture {int(m.group(1))} notes" if m else "Notes")
    try:
        with open(os.path.join(ROOT, path), encoding="utf-8") as f:
            h1 = re.search(r"^# (.+)$", f.read(), re.M)
    except OSError:
        h1 = None
    s = re.sub(r"[*`]", "", h1.group(1)).strip() if h1 else ""
    s = re.sub(r"^[A-Z]{2,5} ?\d{3}[A-Z]?\s+—\s+", "", s)                                   # "STAT 251 — "
    s = re.sub(r"^Lec(?:ture)?s?\s+\d+(?:\s*[–-]\s*\d+)?\s*(?:\([^)]*\))?\s*(?:[—:]\s*|$)", "", s)  # "Lec 6 (Mon Sep 21) — "
    if reading:
        s = re.sub(r"\s+—\s+[^—]*$", "", re.sub(r"^Reading:\s*", "", s))                     # "Reading: " and its dates
    s = re.sub(r"^Ch(?:apter)?\s*\d+:\s*", "", s).strip()                                     # "Ch 3: "
    if not s:
        s = " ".join(name[m.end():].split("-") if m else name.split("-"))
    return f"{kind}: {s[:1].upper()}{s[1:]}" if s else kind

def page_url(path):
    return SITE_URL + "#/" + quote(path)

def attach_sources(qs, course):
    """Set src (the page's workspace path, or None), src_title and src_url on each question of one course's bank.
    A numeric or range Lec maps to the lecture file covering it. Any other tag (WW2, Lab 1, exam1, reading) falls
    back to the lecture that teaches its Topic (_topic_lecture). A `reading` question, or any question under a
    `## Reading: …` heading, first tries the readings file that heading names. Nothing on disk → no page, never a guess."""
    lecs, reads = _pages(course)
    spans = [lec_span(q["lec"]) for q in qs]
    direct = [_lecture_file(s, lecs) if s else None for s in spans]
    tags = [norm(q["topic"]) for q in qs]
    titles = {}
    for i, q in enumerate(qs):
        # A question written from a reading links to that reading's notes, whatever lecture its Lec names.
        section = q.get("section") or ""
        from_reading = q["lec"].strip().lower() == "reading" or section.lower().startswith("reading")
        src = (_reading_file(section, reads) if from_reading else None) or direct[i]
        if src is None and spans[i] is None:
            src = _topic_lecture(i, tags, direct)
        if src and src not in titles:
            titles[src] = page_title(src)
        q.update(src=src, src_title=titles.get(src), src_url=page_url(src) if src else None)
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
        lines.insert(session_log_end(lines), log_line)
    with open(LEDGER, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

def session_log_end(lines):
    """Index just past the last row of the `## Session log` table, where a session row goes. Exits when
    ledger.md has no such table, so quiz_grade.py can check before it writes anything."""
    start = next((i for i, l in enumerate(lines) if l.strip() == "## Session log"), len(lines))
    end = next((i for i in range(start + 1, len(lines)) if lines[i].startswith("## ")), len(lines))
    last_row = max((i for i in range(start + 1, end) if lines[i].startswith("|")), default=None)
    if last_row is None:
        raise SystemExit("no '## Session log' table in ledger.md — nowhere to append this session's row")
    return last_row + 1

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
