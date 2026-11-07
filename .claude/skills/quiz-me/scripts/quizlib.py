#!/usr/bin/env python3
"""Shared code for the quiz-me skill: question bank parsing, the notes page behind each question,
ledger read/write, per-question history, topic matching, the exam calendar and the schedule it sets
(frozen topics, the exam-week sweep, the Next date a grade sets), and the focus report.

Files it owns:
  ledger.md                     — "## Due now" block and the "## All topics" table rows (SRS state, its only copy)
  routines/quiz-state.json      — per-question history {id: {course, topic, history: [[date, grade], …]}}; an entry
                                  is [date, grade, extra] when quiz_grade.py had more to store, and extra holds only the
                                  keys given: conf (1–3) and cause (concept, forgot, misread, careless or slow). A record
                                  whose question left the bank keeps its history and gets `retired` (why). Tracked: the
                                  public site renders it, so nothing personal goes in it.
  routines/quiz-private.json    — what he said: {id: [[date, {said, why}], …]}, his wrong answers and why he was sure.
                                  Git-ignored, because the repo is public (2026-11-06).
  routines/quiz-session.json    — the pending session written by quiz_pick.py. quiz_grade.py records each answer the
                                  moment it is graded (the item gets `done`) and keeps the file until every item is done,
                                  so a stop loses nothing and a retry records nothing twice (quiz_grade.py's docstring).
  routines/transit-session.json — the same for the transit deck, which is graded from the deck page's taps (--transit),
                                  so a quiz picked in between can neither overwrite it nor take its grades
  routines/quiz/sessions/       — finished sessions, by session id, kept so --undo can reopen one
  routines/quiz/YYYY-MM-DD.md   — human-readable session log

Set SCHOOL_ROOT to point at a copy of the workspace when testing.
"""
import datetime as dt, glob, hashlib, json, os, re, sys
from urllib.parse import quote

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("SCHOOL_ROOT") or os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))   # the workspace this script sits in
LEDGER = os.path.join(ROOT, "ledger.md")
STATE = os.path.join(ROOT, "routines", "quiz-state.json")
PRIVATE = os.path.join(ROOT, "routines", "quiz-private.json")
REVIEW_PLAN = os.path.join(ROOT, "routines", "review-plan.json")   # public: the website Review page's queue (quiz_pick.review_plan)
SESSION = os.path.join(ROOT, "routines", "quiz-session.json")
TRANSIT_SESSION = os.path.join(ROOT, "routines", "transit-session.json")
QUIZ_DIR = os.path.join(ROOT, "routines", "quiz")
SESSIONS_DIR = os.path.join(QUIZ_DIR, "sessions")
RUNS_DIR = os.path.join(ROOT, "routines", "runs")
MC_SCRIPTS = os.path.join(ROOT, ".claude", "skills", "morning-check", "scripts")
SITE_URL = "https://matthlh.github.io/school-3-1/"   # the public notes site; a page is SITE_URL + "#/" + its path

sys.path.insert(0, MC_SCRIPTS)
import term                                    # the morning check's term.py: the Term calendar and lecture numbering

COURSE_LABEL = {"STAT251": "STAT 251", "CPSC310": "CPSC 310", "PHIL385": "PHIL 385", "ASIA250": "ASIA 250"}
LABEL_COURSE = {v: k for k, v in COURSE_LABEL.items()}
GRADES = ("X", "~", "O")
NOT_STUDIED = "not studied"   # a ledger Next cell: the lecture is in the bank but he has not studied it, so nothing is due
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
# Scheduling around exams (quiz-me SKILL.md, "What the scripts decide").
SWEEP_DAYS = 7                                 # from this many days before an exam, every topic it covers comes due once
CAP_DAYS = 4                                   # a grade never sets Next later than this many days before that exam
SPREAD = 0.15                                  # a gap of 3+ days may move this share of itself, at least a day, to a lighter day
# Exam scope, from the syllabi: an exam covers the lectures from the start of term up to its date, or up to its cutoff
# here; a non-cumulative exam starts after that course's previous exam. Keys match the Term calendar's exam labels,
# any case.
NON_CUMULATIVE = {"PHIL385": ("exam 2", "exam 3", "exam 4")}   # PHIL 385's final is cumulative
# CPSC 310's midterm covers lectures 1 to 12, through Tue Oct 20: the Oct 27 review deck (slide 2) says REST, lecture 13
# on Oct 22, is not on the midterm. The syllabus had said week 6 (Oct 15) and the schedule page Oct 22.
EXAM_CUTOFF = {("CPSC310", "midterm"): dt.date(2026, 10, 20)}

# ---- dates / text --------------------------------------------------------------------------

def today_local():
    return dt.datetime.now().astimezone().date()

def parse_date(s):
    s = (s or "").strip()
    try:
        return dt.date.fromisoformat(s)
    except ValueError:
        return None

def gap(grade, streak):
    """The ladder's interval in days for a row's grade and the streak it left: X 1 · ~ 3 · O 7, 16, then 35.
    An unquizzed row has 1, the day from logging to its first review."""
    if grade == "O":
        return 7 if streak <= 1 else 16 if streak == 2 else 35
    return 3 if grade == "~" else 1

def next_after(grade, streak, good=False):
    """CLAUDE.md spacing ladder. Returns (new_streak, days_until_next). good marks an O given at confidence 1 or 2
    (Matt, 2026-11-01; before that, an O the deck scored 80-99%): the streak holds at its rung (at least 1) instead of
    climbing, so only a sure O moves up."""
    if good and grade == "O":
        s = max(streak, 1)
        return s, gap("O", s)
    s = 0 if grade == "X" else streak + 1 if grade == "O" else streak
    return s, gap(grade, s)

def pct(part, whole):
    """part / whole as a whole percent, rounded half up (12.5 → 13), the one rounding readiness and calibration use."""
    return int(100 * part / whole + 0.5)

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
    """A new question's id: sha1(course|norm(stem))[:8]. Only for a question that has no **Id:** yet; once stamp_ids has
    written it into the meta line, the stamp is the id, so rewording the stem keeps the question's history."""
    return hashlib.sha1(f"{course}|{norm(question)}".encode()).hexdigest()[:8]

# ---- question bank -------------------------------------------------------------------------

Q_RE = re.compile(r"^### Q:\s*(.*)$")
META_RE = re.compile(r"\*\*Topic:\*\*\s*(.+?)\s+\*\*Lec:\*\*\s*(.+?)\s+\*\*Type:\*\*\s*(\w+)")
# A question's permanent id, at the end of its meta line (2026-11-06): `**Topic:** … **Lec:** … **Type:** apply  **Id:** 3f2a9c1b`.
# The site and quiz-state.json key history by it. stamp_ids writes it once; a split or copied question must not carry
# its source's id (a duplicate stops every run), so the new part's meta line goes in without one and gets its own.
ID_RE = re.compile(r"\s+\*\*Id:\*\*\s*([0-9a-f]{8})\s*$")

def parts(q):
    """How many answers a long problem asks for: its (a), (b), … labels, else its (i), (ii), … labels, else 3."""
    letters = set(re.findall(r"\(([a-h])\)", q["q"]))
    romans = set(re.findall(r"\((i{1,3}|iv|v|vi)\)", q["q"]))
    return len(letters) or len(romans) or 3

def load_questions(courses=None):
    out, seen = [], {}
    for path in sorted(glob.glob(os.path.join(ROOT, "courses", "*", "02-questions.md"))):
        course = os.path.basename(os.path.dirname(path))
        qs = _parse_bank(path, course)
        for q in qs:
            if q["id"] in seen:
                other = seen[q["id"]]
                raise SystemExit(f"Duplicate question id {q['id']}: {other['file']}:{other['line']} and "
                                 f"{q['file']}:{q['line']}. Ids must be unique across all courses.")
            seen[q["id"]] = q
        if not courses or course in courses:
            out.extend(attach_sources(qs, course))
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
        qs.append(dict(id=cur["stamp"] or qid(course, q), stamp=cur["stamp"], meta_line=cur["meta_line"],
                       course=course, topic=meta[0].strip(), lec=meta[1].strip(),
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
            cur = dict(line=i, q=[m.group(1)], show=[m.group(1)], meta=None, stamp=None, meta_line=None, a=[], in_a=False,
                       section=section)
            continue
        if cur is None:
            continue
        if re.match(r"^#{1,2} ", line) or line.strip() == "---":
            flush(); cur = None
            continue
        mm = META_RE.search(line)
        if mm and cur["meta"] is None:
            cur["meta"], cur["meta_line"] = mm.groups(), i
            st = ID_RE.search(line)
            cur["stamp"] = st.group(1) if st else None
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
    seen = {}
    for q in qs:
        if q["stamp"] and q["stamp"] in seen:
            raise SystemExit(f"{q['file']}:{q['meta_line']} and line {seen[q['stamp']]} both carry **Id:** {q['stamp']}. A "
                             "split or copied question must not keep its source's id: delete the **Id:** from the new one's "
                             "meta line (the next quiz_pick.py run gives it its own).")
        if q["stamp"]:
            seen[q["stamp"]] = q["meta_line"]
    return qs

def stamp_ids(state=None):
    """Write an **Id:** at the end of every bank question's meta line that has none, so its id outlives rewording. The id
    is qid() of the stem as it is now, the id its history has always been filed under, or, when another question of the
    course already has that id, the hash of the stem and a counter. Returns [(file, line, id)] for the stamps written.
    quiz_pick.py runs it first on every run, so a question logged today is stamped before it is ever asked."""
    out, banks, taken = [], [], set()
    # Validate every existing stamp before writing any bank. A copied id in another course must not share history.
    for path in sorted(glob.glob(os.path.join(ROOT, "courses", "*", "02-questions.md"))):
        course = os.path.basename(os.path.dirname(path))
        qs = _parse_bank(path, course)
        for q in qs:
            if q["stamp"]:
                if q["stamp"] in taken:
                    raise SystemExit(f"Duplicate question id {q['stamp']} across course banks; no stamps written.")
                taken.add(q["stamp"])
        banks.append((path, course, qs))
    for path, course, qs in banks:
        todo = [q for q in qs if not q["stamp"] and q["meta_line"]]
        if not todo:
            continue
        with open(path, encoding="utf-8") as f:
            lines = f.read().split("\n")
        for q in todo:
            new, k = qid(course, q["q"]), 1
            while new in taken:
                k += 1
                new = qid(course, f"{q['q']} #{k}")
            taken.add(new)
            i = q["meta_line"] - 1
            lines[i] = lines[i].rstrip() + f"  **Id:** {new}"
            out.append((os.path.relpath(path, ROOT), q["meta_line"], new))
        with open(path, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
    return out

def orphans(state, questions):
    """History records whose id no bank question carries and that are not marked retired: history that came loose when
    a question was reworded before it had a stamp, or deleted. [(id, record)]."""
    ids = {q["id"] for q in questions}
    return [(k, v) for k, v in state["questions"].items() if k not in ids and not v.get("retired") and v.get("history")]

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

def ledger_text(text, rows, due, log_line=None, replace=None):
    """ledger.md's new text, built in memory: the All-topics rows rewritten from `rows` (by idx), the Due-now block
    replaced by `due` (due_block's lines) and, given log_line, that row added to the end of the Session log table, or
    put in place of the line `replace` when the table still holds it (a session recorded one answer at a time keeps
    one line; log_line None with `replace` removes it). Everything else stays byte-identical. Writes nothing
    (write_ledger does), so a stop here leaves every file as it was."""
    lines = text.split("\n")
    for r in rows:
        lines[r["idx"]] = (f"| {r['label']} | {r['topic']} | {r['lec']} | {r['last'] or '—'} | "
                           f"{r['grade'] or '—'} | {r['streak']} | {r['next'] or '—'} |")
    start = next((i for i, l in enumerate(lines) if l.strip() == "## Due now"), None)
    if start is not None:
        end = next((i for i in range(start + 1, len(lines)) if lines[i].startswith("## ")), len(lines))
        lines[start:end] = ["## Due now", ""] + due + [""]
    if replace and replace in lines:
        i = lines.index(replace)
        if log_line:
            lines[i] = log_line
        else:
            del lines[i]
    elif log_line:
        lines.insert(session_log_end(lines), log_line)
    return "\n".join(lines)

def write_ledger(text):
    with open(LEDGER, "w", encoding="utf-8") as f:
        f.write(text)

def session_log_end(lines):
    """Index just past the last row of the `## Session log` table, where a session row goes. Exits when
    ledger.md has no such table."""
    start = next((i for i, l in enumerate(lines) if l.strip() == "## Session log"), len(lines))
    end = next((i for i in range(start + 1, len(lines)) if lines[i].startswith("## ")), len(lines))
    last_row = max((i for i in range(start + 1, end) if lines[i].startswith("|")), default=None)
    if last_row is None:
        raise SystemExit("no '## Session log' table in ledger.md — nowhere to append this session's row")
    return last_row + 1

def due_block(rows, today, cal, ready):
    """The Due-now lines, in this order, with a blank line between parts, after each summary line and between readiness
    lines. The notes site parses every line, so keep the wording.
      1. `<!-- due as of 2026-10-06 -->`, the day the block was written. It never renders; the site dates the block by
         it and flags it when stale.
      2. The summary, then a bullet per due topic, most overdue for its interval first (lateness), a sweep topic marked
         with its exam. With nothing due, one line instead: the day the next topics come due (next_due), or that no
         topic has a date yet.
      3. `ready`, readiness()'s lines.
      4. With frozen topics, their summary, then a bullet per frozen row in ledger order,
         `- PHIL 385 · <topic> · frozen after Exam 1`, the exam as exam_name() prints it."""
    st = {r["idx"]: standing(r, today, cal) for r in rows}
    due = sorted((r for r in rows if st[r["idx"]][0] in ("due", "sweep")),
                 key=lambda r: (-lateness(r, st[r["idx"]][1]), r["next_date"] or today, r["label"]))
    frozen = [r for r in rows if st[r["idx"]][0] == "frozen"]
    out = [f"<!-- due as of {today.isoformat()} -->", ""]
    if due:
        swept = sum(1 for r in due if st[r["idx"]][0] == "sweep")
        out += [f"_{len(due)} topic{'s' if len(due) != 1 else ''} due as of {today:%a %b %-d}"
                + (f", {swept} of them from an exam-week sweep" if swept else "") + ". Say **quiz me**._", ""]
        for r in due:
            s, late, e = st[r["idx"]]
            tag = r["grade"] or "unquizzed"
            when = (f"exam sweep before {exam_name(e)} on {e['date']:%a %b %-d}" if s == "sweep" else
                    "due today" if late == 0 else f"overdue {late} d")
            out.append(f"- {r['label']} · {r['topic']} · {when} · last {tag}")
    else:
        upcoming = {}
        for r in rows:
            d = next_due(r, today, cal) if st[r["idx"]][0] not in ("frozen", "unstudied") else None
            if d:
                upcoming.setdefault(d, []).append(r)
        if upcoming:
            d = min(upcoming)
            n, labels = len(upcoming[d]), sorted({r["label"] for r in upcoming[d]})
            out.append(f"_Nothing due today. Next: {n} topic{'s' if n != 1 else ''} on **{d:%a %b %-d}** "
                       f"({', '.join(labels)})._")
        else:
            out.append("_Nothing scheduled yet — log a lecture to start the ledger._")
    for line in ready:
        out += ["", line]
    if frozen:
        out += ["", f"_Frozen, not due: {frozen_summary(frozen, st)}. The exam that covered them is past and the "
                    f"course's next exam does not._", ""]
        out += [f"- {r['label']} · {r['topic']} · frozen after {exam_name(st[r['idx']][2])}" for r in frozen]
    return out

# ---- topic matching (question tag → ledger row) -------------------------------------------

def match_topic(course, text, rows, where):
    """The one ledger row of `course` that a topic text names: a question's **Topic:** tag, a Look-alikes cell, or the
    ledger topic a session stored at pick time. Four rules, in this order: the row's topic exactly, after strip; then,
    compared after norm(), the same text; one a prefix of the other (6+ characters); a shared LO code ('1b–c Displays'
    finds a 1b or 1c row). The first rule that hits any row decides, so a text copied exactly from a row's topic names
    that row even when another row differs from it only inside parentheses, which norm() drops. One hit is the row;
    several stop the script, naming `where` (the text's place, for the message) and the rows. None when no rule hits."""
    cands = [r for r in rows if r["course"] == course]
    n, codes = norm(text), set(codes_of(text))
    for rule in (lambda t: t.strip() == text.strip(),
                 lambda t: norm(t) == n,
                 lambda t: len(n) >= 6 and (norm(t).startswith(n) or n.startswith(norm(t))),
                 lambda t: bool(codes & set(codes_of(t)))):
        hits = [r for r in cands if rule(r["topic"])]
        if len(hits) > 1:
            raise SystemExit(f"{where} '{text}' names {len(hits)} {COURSE_LABEL.get(course, course)} ledger rows ("
                             + " · ".join(h["topic"][:40] for h in hits) + "). Write more of the intended row's topic "
                             "into it, or copy the row's topic exactly, so it names that row only.")
        if hits:
            return hits[0]
    return None

# ---- look-alikes (confusable topics, served back to back by quiz_pick.py) -------------------
# Two topics a student mixes up are learned better side by side than apart (Brunmair & Richter 2019). Each course's
# 01-topics.md ends with a `## Look-alikes` table of such pairs: | Topic | Look-alike | Why they get confused |.

LOOKALIKE_HEADING = "## Look-alikes"
LOOKALIKE_HEAD = ["Topic", "Look-alike", "Why they get confused"]

def load_lookalikes(rows):
    """{ledger row idx: {look-alike's row idx: why}}, each pair both ways round, from the Look-alikes table at the end of
    every course's 01-topics.md. A Topic or Look-alike cell names one ledger row of that course by the rules a
    **Topic:** tag follows (match_topic). Stops, naming the file and the cell, when a cell names no row or several, when
    a row lacks one of its three cells or names one row twice, and when the header is not those three columns. A course
    without the section has no pairs. quiz_pick.py loads it in every mode, so a bad cell stops every run."""
    pairs = {}
    for path in sorted(glob.glob(os.path.join(ROOT, "courses", "*", "01-topics.md"))):
        course, rel = os.path.basename(os.path.dirname(path)), os.path.relpath(path, ROOT)
        with open(path, encoding="utf-8") as f:
            lines = f.read().split("\n")
        start = next((i for i, l in enumerate(lines) if l.strip() == LOOKALIKE_HEADING), None)
        if start is None:
            continue
        end = next((i for i in range(start + 1, len(lines)) if lines[i].startswith("## ")), len(lines))
        table = [[c.strip() for c in l.strip().strip("|").split("|")] for l in lines[start + 1:end] if l.startswith("|")]
        if table and table[0] != LOOKALIKE_HEAD:
            raise SystemExit(f"{rel}: the Look-alikes header is | {' | '.join(table[0])} |, expected "
                             f"| {' | '.join(LOOKALIKE_HEAD)} |")
        def row_of(cell):
            r = match_topic(course, cell, rows, f"{rel}: the Look-alikes cell")
            if r is None:
                raise SystemExit(f"{rel}: the Look-alikes cell '{cell}' matches no {COURSE_LABEL.get(course, course)} "
                                 "ledger row. Write the ledger topic, or a prefix of it of 6+ characters.")
            return r
        for cells in table[1:]:
            if set("".join(cells)) <= set("-: "):
                continue                    # the |---| rule
            if len(cells) != 3 or not all(cells):
                raise SystemExit(f"{rel}: a Look-alikes row needs a topic, a look-alike and a why: | {' | '.join(cells)} |")
            a, b = row_of(cells[0]), row_of(cells[1])
            if a is b:
                raise SystemExit(f"{rel}: the Look-alikes row '{cells[0]}' names the same ledger row twice")
            pairs.setdefault(a["idx"], {})[b["idx"]] = cells[2]
            pairs.setdefault(b["idx"], {})[a["idx"]] = cells[2]
    return pairs

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

def load_private():
    if os.path.exists(PRIVATE):
        with open(PRIVATE, encoding="utf-8") as f:
            return json.load(f)
    return {}

def save_private(priv):
    os.makedirs(os.path.dirname(PRIVATE), exist_ok=True)
    with open(PRIVATE, "w", encoding="utf-8") as f:
        json.dump(priv, f, indent=1, ensure_ascii=False)

def history(state, q):
    """(date, grade) for each answer to q, oldest first. An entry's extra, if it has one, is left out."""
    rec = state["questions"].get(q["id"], {})
    if rec.get("course") not in (None, q["course"]):
        raise SystemExit(f"Question {q['id']} belongs to {q['course']}, but its saved history belongs to "
                         f"{rec['course']}; check the question id before recording another answer.")
    return [(parse_date(e[0]), e[1]) for e in rec.get("history", [])]

def is_leech(hist):
    k, n = LEECH_X_IN_LAST
    return sum(1 for _, g in hist[-n:] if g == "X") >= k

# ---- per-question schedule (2026-11-06) -----------------------------------------------------
# Each question keeps its own place on the ladder, from its own history, so an O on one question no longer pushes its
# unasked or missed siblings out with it, and an X on one no longer calls its mastered siblings back. The ledger row
# still groups a topic's questions: its Next is the earliest Next of its asked questions and, while any is unasked, the
# topic's own ladder date (row_due), and the picker asks due questions first, then new ones (a due topic's, then any
# studied topic's), and not-due ones only to fill a session.

def card_state(entries, row, cal):
    """(streak, gap, next date) by the ladder, with at most one promotion per calendar day. A day's worst attempt
    controls its grade; an O at confidence 1 or 2 holds its rung. Exam caps apply from the review date.
    All raw attempts remain in history. None when it was never asked."""
    if not entries:
        return None
    streak, days, nxt = 0, 1, None
    by_day = {}
    for e in entries:
        d, g = parse_date(e[0]), e[1]
        if d is None or g not in GRADES:
            continue
        by_day.setdefault(d, []).append(e)
    # Relearning on the same day is useful practice, not another successful spaced recall. Keep every attempt in
    # history, but let a date advance the ladder at most once. A miss that day still needs a next-day check.
    for d, attempts in sorted(by_day.items()):
        g = min((e[1] for e in attempts), key=GRADE_RANK.__getitem__)
        good = g == "O" and any(len(e) > 2 and e[2].get("conf") in (1, 2) for e in attempts)
        streak, days = next_after(g, streak, good=good)
        nxt = d + dt.timedelta(days=days)
        cap = exam_cap(row, d, cal) if row is not None else None
        if cap and nxt > cap[0]:
            nxt = cap[0]
    return (streak, days, nxt) if nxt else None

def card_next(state, q, row, cal):
    """The question's own Next date (card_state), or None when it was never asked."""
    cs = card_state(state["questions"].get(q["id"], {}).get("history", []), row, cal)
    return cs[2] if cs else None

def topic_entries(qs, state):
    """Every recorded answer to any of these questions."""
    return [e for q in qs for e in state["questions"].get(q["id"], {}).get("history", [])]

def topic_state(r, qs, state, cal):
    """(streak, gap, next date) of the topic as a whole: the ladder replayed over every answer to any of its questions,
    a day at a time (card_state on their pooled answers). None when none of them was ever answered."""
    return card_state(topic_entries(qs, state), r, cal)

def row_due(r, qs, state, cal):
    """The earliest date any of the row's questions needs him: an asked one's own Next, and, while any is unasked, the
    topic's own ladder date from its answers so far (its row's Next before the first one). So an unasked sibling waits
    at most the topic's ladder gap, however far a promoted sibling's own date has moved, and a graded topic is not held
    due just because it still has unasked questions. None for a not-studied row or one with no questions."""
    if r.get("next") == NOT_STUDIED:
        return None
    dates, unasked = [], False
    for q in qs:
        d = card_next(state, q, r, cal)
        if d:
            dates.append(d)
        else:
            unasked = True
    if unasked:
        ts = topic_state(r, qs, state, cal)
        dates.append(ts[2] if ts else r.get("next_date"))
    return min((d for d in dates if d), default=None)

def topic_summary(r, qs, state, cal, rows=None):
    """The ledger row of a topic from its questions' current histories, or None when none of them has a graded answer:
    Last is the latest day any was answered, Grade that day's worst grade, Streak the topic's own ladder (topic_state),
    and Next row_due. With `rows` (the whole ledger), a gap of 3 days or more may then come up to SPREAD earlier, to
    the lighter day next_review finds (never later: a question's own date is the latest the topic may wait). Returns
    dict(last, grade, streak, next, why), `why` saying how Next differs from the earliest question date, or ""."""
    valid = [e for e in topic_entries(qs, state) if parse_date(e[0]) and e[1] in GRADES]
    if not valid:
        return None
    day = max(parse_date(e[0]) for e in valid)
    grade = min((e[1] for e in valid if parse_date(e[0]) == day), key=GRADE_RANK.__getitem__)
    streak = topic_state(r, qs, state, cal)[0]
    earliest = nxt = row_due(r, qs, state, cal)
    why = ""
    if rows is not None and nxt and (nxt - day).days >= 3:
        cand, _ = next_review(r, (nxt - day).days, day, rows, cal)
        if cand < nxt:
            nxt, why = cand, f"earliest question date {earliest:%b %-d}, moved to a lighter day"
    return dict(last=day, grade=grade, streak=streak, next=nxt, why=why)

def apply_summary(r, s):
    """Write topic_summary's result into ledger row r. A `not studied` row keeps that Next: an answer recorded from a
    stale plan or a website session does not start a topic he has not studied (quiz_pick.py --studied does)."""
    r.update(last=s["last"].isoformat(), grade=s["grade"], streak=s["streak"])
    if s["next"] is not None and r.get("next") != NOT_STUDIED:
        r.update(next=s["next"].isoformat(), next_date=s["next"])

def sync_card_dues(rows, questions, state, cal, only=None):
    """Pull each row's Next forward to row_due, so a topic comes due when any one of its questions needs him. A
    not-studied row is left alone. `only`: row idxs to touch (quiz_grade.py passes the rows it just moved); None = every
    row. Returns the rows it changed. Never moves a Next later: only grading does that."""
    by, _ = bank_by_topic(rows, questions)
    changed = []
    for r in rows:
        if (only is not None and r["idx"] not in only) or r["next"] == NOT_STUDIED:
            continue
        d = row_due(r, by.get(r["idx"], []), state, cal)
        if d and (r["next_date"] is None or d < r["next_date"]):
            r.update(next=d.isoformat(), next_date=d)
            changed.append(r)
    return changed

# ---- exams and the schedule ----------------------------------------------------------------

def load_calendar():
    """{course: dict(lectures, exams)} for every course with an exam: the ledger's Term calendar rows with Kind `exam`,
    which term.py loads. lectures: its lecture dates in order, so lecture N is lectures[N - 1] (term.lecture_dates, the
    numbering term.py counts logs by). exams: dicts of date, label, after and through, in date order; an exam covers
    the lectures held after `after` (None: from the start of term) up to and including `through` (its cutoff, else its
    date). Stops when a NON_CUMULATIVE or EXAM_CUTOFF key does not name exactly one exam, so a renamed exam cannot
    quietly widen a scope."""
    cal = {}
    for d, course, label, kind, *_ in sorted(term.key_dates()):
        if kind != "exam":
            continue
        c = cal.setdefault(course, dict(lectures=term.lecture_dates(course, term.COURSES[course]["end"]), exams=[]))
        low = label.lower()
        noncum = c["exams"] and any(w in low for w in NON_CUMULATIVE.get(course, ()))
        cut = [v for (cc, w), v in EXAM_CUTOFF.items() if cc == course and w in low]
        c["exams"].append(dict(date=d, label=label, after=c["exams"][-1]["date"] if noncum else None,
                               through=cut[0] if cut else d))
    keys = [(course, w) for course, words in NON_CUMULATIVE.items() for w in words] + list(EXAM_CUTOFF)
    for course, w in keys:
        n = sum(w in e["label"].lower() for e in cal.get(course, {}).get("exams", []))
        if n != 1:
            raise SystemExit(f"quizlib.py: '{w}' names {n} {course} exams in ledger.md's Term calendar, not one. "
                             "Fix NON_CUMULATIVE or EXAM_CUTOFF to match the exam's label.")
    return cal

def exam_name(e):
    """An exam's label cut before its details: 'Exam 1 — the essay exam in …' → 'Exam 1', 'Exam 3 (7 MC)' → 'Exam 3'."""
    return re.split(r"\s+[—(]|[;,]", e["label"])[0].strip()

def held(r, cal):
    """The dates of a ledger row's lectures (its Lec span), or None when its Lec is not a lecture number (Lab 1, WW2,
    reading) or its course has no exam. Stops when the span runs past the lectures term.py knows."""
    span, c = lec_span(r["lec"]), cal.get(r["course"])
    if span is None or c is None:
        return None
    if span[1] > len(c["lectures"]):
        raise SystemExit(f"ledger.md: {r['label']} '{r['topic'][:50]}' has Lec {r['lec']}, but term.py has "
                         f"{len(c['lectures'])} lectures for {r['course']}")
    return c["lectures"][span[0] - 1:span[1]]

def covers(e, lecs):
    """Whether exam e's scope holds any of these lecture dates. None (a row with no lecture number) is in every scope."""
    return lecs is None or any((e["after"] is None or d > e["after"]) and d <= e["through"] for d in lecs)

def next_exam(cal, course, today):
    """The course's first exam on or after today, or None."""
    return next((e for e in cal.get(course, {}).get("exams", []) if e["date"] >= today), None)

def standing(r, today, cal):
    """Where a ledger row stands today: (state, days late, exam).
      frozen  an exam that covered it is past and the course's next exam does not cover it (a non-cumulative exam):
              never due. With no exam left in the Term calendar nothing is frozen, because every final is cumulative.
      due     its Next is today or earlier.
      sweep   the course's next exam covers it and is at most SWEEP_DAYS away, and it has not been reviewed since that
              window opened: due though its Next is later.
      unstudied  its Next cell is NOT_STUDIED: he has not studied that lecture yet, so it is never due or picked until
              `quiz_pick.py --studied` starts its schedule (Matt, 2026-11-01).
      later   none of these.
    Days late is today minus Next when due, else 0. exam is the exam behind frozen or sweep, else None."""
    lecs, nxt = held(r, cal), next_exam(cal, r["course"], today)
    past = [e for e in cal.get(r["course"], {}).get("exams", []) if e["date"] < today and covers(e, lecs)]
    if nxt and past and not covers(nxt, lecs):
        return "frozen", 0, past[-1]
    if r["next"] == NOT_STUDIED:
        return "unstudied", 0, None
    if r["next_date"] and r["next_date"] <= today:
        return "due", (today - r["next_date"]).days, None
    if nxt and covers(nxt, lecs):
        opens, last = nxt["date"] - dt.timedelta(days=SWEEP_DAYS), parse_date(r["last"])
        if opens <= today and not (last and last >= opens):
            return "sweep", 0, nxt
    return "later", 0, None

def lateness(r, late):
    """Days late in units of the row's ladder gap, the order due topics are worked in: an X a week late is seven
    intervals behind, an O on its 35-day gap a week late a fifth of one."""
    return late / gap(r["grade"], r["streak"])

def next_due(r, today, cal):
    """The first day after today on which a live row that is not due comes due: its Next date, or the day the exam-week
    sweep opens (SWEEP_DAYS before the course's next exam) when that exam covers the row and the sweep has not opened
    yet, whichever is earlier. None when it has neither. The "Nothing due today. Next: …" line counts both."""
    e = next_exam(cal, r["course"], today)
    opens = e["date"] - dt.timedelta(days=SWEEP_DAYS) if e and covers(e, held(r, cal)) else None
    return min((d for d in (r["next_date"], opens) if d and d > today), default=None)

def frozen_summary(frozen, st):
    """'PHIL 385 14 topics from Exam 1', one part per course and exam, for frozen rows (st: idx → standing)."""
    groups = {}
    for r in frozen:
        k = (r["label"], exam_name(st[r["idx"]][2]))
        groups[k] = groups.get(k, 0) + 1
    return " · ".join(f"{lab} {n} topic{'s' if n != 1 else ''} from {ex}" for (lab, ex), n in groups.items())

def near_exams(cal, today):
    """[(exam, course)] for each course whose next exam is at most 21 days away, soonest first: the focus block's
    "Exams ≤ 21 d" line and the readiness lines."""
    return sorted(((e, c) for c in cal for e in [next_exam(cal, c, today)] if e and (e["date"] - today).days <= 21),
                  key=lambda x: x[0]["date"])

RECALL = {"O": 1, "~": 0.5}                     # readiness: a question's last grade as a chance of recalling it then
RETAIN = 0.9                                    # ... which falls to this share of itself over one ladder gap, and on

def recall_now(entries, row, cal, today):
    """The chance he recalls a question today: its last grade (RECALL, X 0) decayed by RETAIN per ladder gap since that
    answer, so an O from five weeks ago no longer counts as certain. 0 when never asked."""
    cs = card_state(entries, row, cal)
    if not cs:
        return 0.0
    d, g = parse_date(entries[-1][0]), entries[-1][1]
    return RECALL.get(g, 0) * RETAIN ** (max(0, (today - d).days) / cs[1])

def readiness(rows, today, cal, state, questions):
    """One line per exam in near_exams, for the Due-now block and the focus block (the notes site parses it, so keep
    the wording). In scope are the bank questions whose ledger row the exam covers (covers(), the scope rule standing()
    uses, so a frozen row is never in it). The line gives three numbers, kept apart (2026-11-06): the mean chance of
    recalling each one today (recall_now: the last grade decayed by time, never asked 0), the share asked at least once
    (coverage), and the share of the asked ones whose last answer was an O (accuracy, ~ as half), then how many
    in-scope ledger topics no question matches, left out when none. An exam with no in-scope question yet (none of its
    lectures logged) gets no line. `questions` is the whole
    bank, whatever --course scopes, and `state` the per-question history: the caller passes the ones it already holds,
    so quiz_grade.py counts the session it is grading before it writes anything. [] with no exam within 21 days."""
    by, _ = bank_by_topic(rows, questions)
    out = []
    for e, course in near_exams(cal, today):
        scope = [r for r in rows if r["course"] == course and covers(e, held(r, cal))]
        qs = [(q, r) for r in scope for q in by.get(r["idx"], [])]
        if not qs:
            continue
        ents = [(state["questions"].get(q["id"], {}).get("history", []), r) for q, r in qs]
        recalled = sum(recall_now(h, r, cal, today) for h, r in ents)
        asked = [h for h, _ in ents if h]
        right = sum(RECALL.get(h[-1][1], 0) for h in asked)
        bare = sum(1 for r in scope if r["idx"] not in by)
        out.append(f"_Readiness · {COURSE_LABEL.get(course, course)} {exam_name(e)} · {e['date']:%a %b %-d} · "
                   f"{pct(recalled, len(qs))}% of {len(qs)} in-scope question{'s' if len(qs) != 1 else ''} likely recalled"
                   f" · {pct(len(asked), len(qs))}% asked · "
                   + (f"{pct(right, len(asked))}% right last time" if asked else "none asked yet")
                   + (f" · {bare} {'topics' if bare != 1 else 'topic'} in scope {'have' if bare != 1 else 'has'} no question"
                      if bare else "") + "._")
    return out

def exam_ahead(r, day, cal):
    """The first exam of the row's course on or after `day` whose scope covers the row (covers()), or None. It sets
    quiz_pick.py's exam boost (from today) and exam_cap (from the day after tomorrow)."""
    lecs = held(r, cal)
    return next((e for e in cal.get(r["course"], {}).get("exams", []) if e["date"] >= day and covers(e, lecs)), None)

def exam_cap(r, today, cal):
    """(latest Next a grade today may set, its exam), or None when no exam that far ahead covers the row. The exam is
    exam_ahead from the day after tomorrow: an exam today or tomorrow sets no cap, because this review is the last
    before it. The cap is CAP_DAYS before that exam, or the day before it when that day is today or past."""
    e = exam_ahead(r, today + dt.timedelta(days=2), cal)
    if e is None:
        return None
    d = e["date"] - dt.timedelta(days=CAP_DAYS)
    return (d if d > today else e["date"] - dt.timedelta(days=1)), e

def next_review(r, days, today, rows, cal):
    """(Next date, why it differs from the ladder's, or "") for row r graded today with a ladder gap of `days`. Never
    later than exam_cap. A gap of 3+ days may move by up to SPREAD of itself either way (at least a day) to the day
    with the fewest topics due in the ledger's Next column (`rows`; r itself and the rows frozen today left out, since a
    frozen row never comes due). Ties go to the ladder date, then the nearer day, then the earlier one."""
    ideal = today + dt.timedelta(days=days)
    w = max(1, int(days * SPREAD)) if days >= 3 else 0
    window = [ideal + dt.timedelta(days=k) for k in range(-w, w + 1)]
    cap = exam_cap(r, today, cal)
    if cap:
        window = [d for d in window if d <= cap[0]] or [cap[0]]
    load = {}
    for o in rows:
        if o is not r and o["next_date"] and standing(o, today, cal)[0] != "frozen":
            load[o["next_date"]] = load.get(o["next_date"], 0) + 1
    best = min(window, key=lambda d: (load.get(d, 0), abs((d - ideal).days), d))
    if cap and ideal > cap[0]:
        return best, f"ladder said {ideal:%b %-d}, held before {exam_name(cap[1])} on {cap[1]['date']:%a %b %-d}"
    return best, ("" if best == ideal else f"ladder said {ideal:%b %-d}, moved to a lighter day")

# ---- focus report --------------------------------------------------------------------------

def day_after(today, courses=None):
    """The focus block's day-after flags: for each lecture held yesterday that has a log (term.py's lecture_dates and
    lecture_logs, the numbering every script uses), a line saying to open the session with 2 minutes of free recall on
    it (Karpicke & Blunt 2011), then its notes page. Only the given courses, when any are given. [] when there is none."""
    yesterday, out = today - dt.timedelta(days=1), []
    for code in term.COURSES:
        dates, logs = term.lecture_dates(code, yesterday), term.lecture_logs(code)
        if (courses and code not in courses) or not dates or dates[-1] != yesterday or len(dates) not in logs:
            continue
        path = os.path.join("courses", code, "lectures", logs[len(dates)])
        out += [f"-- Day-after review: {COURSE_LABEL.get(code, code)} lec {len(dates)}. Open with 2 minutes of free recall.",
                f"   {page_title(path)} ({page_url(path)})"]
    return out

def bank_by_topic(rows, questions):
    """{ledger row idx: [questions]} plus a list of questions whose tag matched no row. Stops on a tag that names
    several rows (match_topic)."""
    by, unmatched = {}, []
    for q in questions:
        r = match_topic(q["course"], q["topic"], rows, f"{q['file']}:{q['line']}: the **Topic:** tag")
        if r is None:
            unmatched.append(q)
        else:
            by.setdefault(r["idx"], []).append(q)
    return by, unmatched

def unmatched_block(unmatched):
    """The one loud block for **Topic:** tags that match no ledger row: a line per tag in the bank (`unmatched`, from
    bank_by_topic) with its question count and where the first one sits. Such questions are never picked; quiz_grade.py
    goes by the ledger topic stored at pick time, not the tag. [] when there are none."""
    if not unmatched:
        return []
    out = ["-- ⚠ Topic tags that match no ledger row. Their questions are never picked and their grades cannot reach "
           "the ledger. Change each tag to the exact ledger topic, or add the row:"]
    by = {}
    for q in unmatched:
        by.setdefault((q["course"], q["topic"]), []).append(q)
    for (c, t), qs in sorted(by.items()):
        out.append(f"   {COURSE_LABEL.get(c, c)} · '{t}' · {len(qs)} q · {qs[0]['file']}:{qs[0]['line']}")
    return out

def focus(rows, questions, state, today, cal, courses=None):
    """What the focus report and the picker work from. A frozen row is in no list but `frozen`; standing maps every
    row's idx to its standing() today."""
    rows = [r for r in rows if not courses or r["course"] in courses]
    by, unmatched = bank_by_topic(rows, questions)
    st = {r["idx"]: standing(r, today, cal) for r in rows}
    frozen = [r for r in rows if st[r["idx"]][0] == "frozen"]
    unstudied = [r for r in rows if st[r["idx"]][0] == "unstudied"]
    live = [r for r in rows if st[r["idx"]][0] not in ("frozen", "unstudied")]
    due = [r for r in live if st[r["idx"]][0] in ("due", "sweep")]
    overdue = [r for r in due if st[r["idx"]][1] > 0]
    sweep = [r for r in due if st[r["idx"]][0] == "sweep"]
    weak = sorted((r for r in live if r["grade"] in ("X", "~")), key=lambda r: (GRADE_RANK[r["grade"]], r["next"]))
    unquizzed = [r for r in live if not r["grade"]]
    needs_more, empty = [], []
    for r in live:
        k = len(by.get(r["idx"], []))
        if k == 0:
            empty.append(r)
        elif r["grade"] in ("X", "~") and k < MIN_QUESTIONS_PER_TOPIC:
            needs_more.append((r, k))
    leeches = [q for q in questions if is_leech(history(state, q))]
    loose = orphans(state, questions) if not courses else []
    counts = {}
    for q in questions:
        counts[q["course"]] = counts.get(q["course"], 0) + 1
    return dict(due=due, overdue=overdue, sweep=sweep, frozen=frozen, unstudied=unstudied, standing=st, weak=weak, unquizzed=unquizzed,
                needs_more=needs_more, empty=empty, leeches=leeches, unmatched=unmatched, counts=counts, by_topic=by,
                rows=rows, orphans=loose)

def print_focus(fx, today, cal, ready):
    """The focus block. ready: readiness()'s lines for the whole ledger, printed under the exams line as the Due-now
    block has them; like that line they ignore --course, which scopes fx."""
    print(f"== QUIZ FOCUS for {today:%a %Y-%m-%d}")
    print("-- Exams ≤ 21 d: " + (" · ".join(f"{COURSE_LABEL.get(c, c)} {exam_name(e)} in {(e['date'] - today).days} d"
                                          for e, c in near_exams(cal, today)) or "none"))
    for line in ready:
        print("   " + line)
    by_course = {}
    for r in fx["due"]:
        by_course[r["label"]] = by_course.get(r["label"], 0) + 1
    sweep = f" · exam sweep {len(fx['sweep'])}" if fx["sweep"] else ""
    print(f"-- Due: {len(fx['due'])} topic{'s' if len(fx['due']) != 1 else ''} ({', '.join(f'{k} {v}' for k, v in sorted(by_course.items())) or '—'}) · "
          f"overdue {len(fx['overdue'])}{sweep} · X {sum(1 for r in fx['weak'] if r['grade']=='X')} · "
          f"~ {sum(1 for r in fx['weak'] if r['grade']=='~')} · unquizzed {len(fx['unquizzed'])}")
    if fx["frozen"]:
        print(f"-- Frozen, not due: {frozen_summary(fx['frozen'], fx['standing'])}. The exam that covered them is past and "
              "the course's next exam does not; --topic still picks one.")
        loose = [r for r in fx["rows"] if r["label"] in {f["label"] for f in fx["frozen"]} and lec_span(r["lec"]) is None]
        if loose:
            print("   Still live because Lec is not a lecture number: "
                  + " · ".join(f"{r['label']} {r['topic'].split(' (')[0]} (Lec {r['lec']})" for r in loose)
                  + ". Put their lecture numbers in ledger.md's Lec column so they can freeze.")
    if fx["unstudied"]:
        by = {}
        for r in fx["unstudied"]:
            by[r["label"]] = by.get(r["label"], 0) + 1
        print("-- Not studied yet, not due: " + " · ".join(f"{k} {v} topic{'s' if v != 1 else ''}" for k, v in sorted(by.items()))
              + ". When he has studied a lecture: quiz_pick.py --studied <COURSE> <lec>.")
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
    for line in unmatched_block(fx["unmatched"]):
        print(line)
    if fx["orphans"]:
        print(f"-- ⚠ {len(fx['orphans'])} history record{'s' if len(fx['orphans']) != 1 else ''} match no bank question "
              "(a question deleted, or reworded before it had an **Id:**). Put the id back on the question it belongs to, "
              "or run quiz_ids.py --retire ID \"why\" to keep the history as retired: "
              + " · ".join(f"{k} {v['course']} {v['topic'][:30]}" for k, v in fx["orphans"][:8]))
    print("-- Bank: " + " · ".join(f"{COURSE_LABEL[c]} {fx['counts'].get(c, 0)} q" for c in COURSE_LABEL))
