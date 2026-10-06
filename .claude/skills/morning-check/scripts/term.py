#!/usr/bin/env python3
"""Term status for the morning check: unlogged lectures, exam/deliverable countdowns with the
PREP.md phase label, and UBC admin deadlines. Pure local computation — no network.

Usage: python3 term.py [YYYY-MM-DD]      (defaults to today, Pacific)

The countdown dates come from ledger.md's Term calendar table, the only copy of the term dates: every
row with a Kind (exam, deliverable, paper, assignment or admin) counts down, and a broken table stops
the import with a message saying what to fix. The lecture patterns live in COURSES below.
"""
import datetime as dt, glob, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("SCHOOL_ROOT") or os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))   # the workspace this script sits in
LEDGER = os.path.join(ROOT, "ledger.md")
D = dt.date
MON, TUE, WED, THU, FRI = 0, 1, 2, 3, 4

# UBC 2026W Term 1: classes Wed Sep 9 → Mon Dec 7; exams Dec 11–22.
FIRST_DAY, LAST_DAY = D(2026, 9, 9), D(2026, 12, 7)
NO_CLASS = {D(2026, 9, 30), D(2026, 10, 12), D(2026, 11, 9), D(2026, 11, 10), D(2026, 11, 11)}  # Truth and Reconciliation Day, Thanksgiving, midterm break

# Per-course lecture pattern. `time` is the lecture slot as ("HH:MM" start, minutes), None for an
# asynchronous course. Exam days and course-specific cancellations are removed so a
# missing file on those days isn't counted as an unlogged lecture.
COURSES = {
    "STAT251": dict(days={MON, WED, FRI}, time=("08:00", 50), start=FIRST_DAY, end=LAST_DAY,
                    skip={D(2026, 10, 30)}),                                   # midterm slot (unverified)
    "PHIL385": dict(days={MON, WED, FRI}, time=("14:00", 50), start=FIRST_DAY, end=LAST_DAY,
                    skip={D(2026, 9, 9),                                       # intro remarks only; Matt absent
                          D(2026, 9, 30), D(2026, 10, 2), D(2026, 10, 16), D(2026, 10, 30), D(2026, 11, 20)}),
    "CPSC310": dict(days={TUE, THU}, time=("15:30", 90), start=D(2026, 9, 10), end=D(2026, 12, 3),
                    skip={D(2026, 10, 29)}),                                   # midterm evening, no Thu lecture
    "ASIA250": dict(days={MON}, time=None, start=D(2026, 9, 14), end=D(2026, 11, 30), skip=set(),
                    extra={D(2026, 9, 8)}),                                    # week 1 posted Tue Sep 8
}

# Exams use the Phase-2 ladder from PREP.md; deliverables and written assignments use the ladders beside it.
EXAM_LADDER = {10: "T-10 gap check: syllabus topics vs. ledger", 9: "45 min mixed revision",
               8: "45 min mixed revision", 7: "45 min mixed revision",
               6: "45 min mixed revision", 5: "45 min mixed revision + name the prof's 2–3 themes",
               4: "T-4 gaps and X topics only", 3: "T-3 FULL TIMED MOCK", 2: "T-2 mark the mock, study only the misses",
               1: "T-1 light: verbal reconstruction, bed 10:30", 0: "EXAM DAY"}
DELIV_LADDER = {10: "T-10 environment check: clone, install, run tests, push a throwaway commit",
                8: "T-8 read the spec once, write the done-checklist", 2: "T-2 first autograder run (this is the buffer)",
                1: "T-1 write the design rationale", 0: "DUE — submit early, then stop"}
PAPER_LADDER = {4: "T-4 read the prompt, write a one-line thesis and a 3-point outline",
                2: "T-2 full draft", 1: "T-1 edit, then check Chicago author-date citations (no footnotes)",
                0: "DUE — submit early, then stop"}
ASSIGN_LADDER = {5: "T-5 read every question and solve the first ones", 2: "T-2 finish every question",
                 1: "T-1 check the answers, then submit early", 0: "DUE — submit early, then stop"}
LADDERS = {"exam": EXAM_LADDER, "deliverable": DELIV_LADDER, "paper": PAPER_LADDER, "assignment": ASSIGN_LADDER}
KINDS = set(LADDERS) | {"admin"}            # an admin date counts down with no ladder

CALENDAR_HEADING = "## Term calendar — hard dates"
CALENDAR_HEAD = ["Date", "Course", "What", "Weight", "Kind"]
MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
DATE_CELL = re.compile(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (" + "|".join(MONTHS) + r") (\d{1,2})(?:, (\d{2}:\d{2})(?:–\d{2}:\d{2})?)?")
BOLD_LEAD = re.compile(r"\*\*(.+?)\*\*")

def calendar_when(cell):
    """(date, time) for a Term calendar Date cell, time being its "HH:MM" or "", or None unless the cell reads
    like `Fri Oct 16, 18:05` (the time, or a 14:00–14:50 span whose start is the time, is optional) with the right
    weekday for this term. Bold is ignored, a leading `~` marks an approximate date, and a `start → end` range
    gives its end, as on the notes site."""
    m = DATE_CELL.fullmatch(cell.replace("*", "").split("→")[-1].strip().lstrip("~"))
    if not m:
        return None
    try:
        d = D(FIRST_DAY.year, MONTHS.index(m[2]) + 1, int(m[3]))
    except ValueError:                      # no such day, like Sep 31
        return None
    return (d, m[4] or "") if f"{d:%a}" == m[1] else None

def load_key_dates():
    """[(date, course code, label, kind)] for every row of ledger.md's Term calendar table that has a Kind, in
    table order. The label is short, like `Exam 2 14:00 (15%)`: the What cell's opening **bold** run (or, when it
    opens without one, its text before the first " — "), then the Date cell's time and the Weight in parentheses
    when they are there. Stops with a message naming the row when the heading or the table is missing, a Kind is
    unknown, or a Kind row's course, date or label cannot be read."""
    with open(LEDGER, encoding="utf-8") as f:
        lines = f.read().split("\n")
    start = next((i for i, l in enumerate(lines) if l.strip() == CALENDAR_HEADING), None)
    if start is None:
        raise SystemExit(f"ledger.md has no '{CALENDAR_HEADING}' heading; term.py reads the countdown dates from its table")
    table = []
    for line in lines[start + 1:]:
        if line.startswith("## ") or (table and not line.startswith("|")):
            break                           # the next section, or the end of the first table
        if line.startswith("|"):
            table.append([c.strip() for c in line.strip().strip("|").split("|")])
    if not table:
        raise SystemExit(f"ledger.md has no table under '{CALENDAR_HEADING}'; term.py reads the countdown dates from it")
    if table[0] != CALENDAR_HEAD:
        raise SystemExit(f"ledger.md's Term calendar header is {' | '.join(table[0])}, expected {' | '.join(CALENDAR_HEAD)}")
    out = []
    for cells in table[1:]:
        if set("".join(cells)) <= set("-: "):
            continue                        # the |---| rule
        row = " | ".join(cells)
        if len(cells) != len(CALENDAR_HEAD):
            raise SystemExit(f"ledger.md's Term calendar row has {len(cells)} cells, expected {len(CALENDAR_HEAD)}: {row}")
        date, course, what, weight, kind = cells
        if not kind:
            continue
        if kind not in KINDS:
            raise SystemExit(f"ledger.md's Term calendar row has Kind '{kind}', expected one of {', '.join(sorted(KINDS))}: {row}")
        code = course.replace(" ", "")
        if code not in COURSES and code != "UBC":
            raise SystemExit(f"ledger.md's Term calendar row has Kind {kind} but course '{course}' is not in term.COURSES or UBC: {row}")
        when = calendar_when(date)
        if when is None:
            raise SystemExit(f"ledger.md's Term calendar row has Kind {kind} but its Date cell '{date}' does not parse;"
                             f" write it like 'Fri Oct 16, 18:05' with the right weekday: {row}")
        d, time = when
        bold = BOLD_LEAD.match(what)
        lead = (bold[1] if bold else what.split(" — ")[0]).replace("*", "").strip()
        if not lead:
            raise SystemExit(f"ledger.md's Term calendar row has Kind {kind} but its What cell gives no label"
                             f" (it needs a **bold** name or text before ' — '): {row}")
        weight = weight.replace("*", "").strip()
        out.append((d, code, " ".join(x for x in (lead, time, f"({weight})" if weight else "") if x), kind))
    return out

KEY_DATES = load_key_dates()   # (date, course, label, kind)  kind: exam | deliverable | paper | assignment | admin

def lecture_dates(code, today):
    c = COURSES[code]
    d, out = c["start"], set(c.get("extra", set()))
    while d <= c["end"]:
        if d.weekday() in c["days"] and d not in NO_CLASS and d not in c["skip"]:
            out.add(d)
        d += dt.timedelta(days=1)
    return sorted(x for x in out if x <= today)

def lecture_logs(code):
    """{lecture number: log file name} for courses/<CODE>/lectures/. Lecture numbers are two digits;
    `01-02-<slug>.md` covers lectures 1 and 2 and `05-06-07-<slug>.md` covers 5 to 7 (Matt may log a
    week in one file). A run stops at the first number that does not increase, so a slug that starts
    with a number (`12-2-sample-tests.md`, `09-08-…`) still counts for its first lecture. A slug that
    starts with a larger two-digit number reads as a range (`09-10-rules-…` covers 9 and 10), so name
    such a lecture without the leading number. A leading underscore marks a pre-lecture outline, not
    a log. The one rule for "is lecture N logged"."""
    import re
    logs = {}
    for f in sorted(glob.glob(os.path.join(ROOT, "courses", code, "lectures", "*.md"))):
        base = os.path.basename(f)
        m = re.match(r"^(\d{2}(?:-\d{2})*)-", base)
        if not m:
            continue
        nums = [int(x) for x in m.group(1).split("-")]
        last = nums[0]
        for x in nums[1:]:
            if x <= last:
                break
            last = x
        logs.update(dict.fromkeys(range(nums[0], last + 1), base))
    return logs

def logged_numbers(code):
    """Lecture numbers covered by a log. Returns a set so a gap (lec 7 logged, lec 6 not)
    shows up as lec 6 unlogged instead of hiding behind a count."""
    return set(lecture_logs(code))

def main():
    today = D.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else dt.datetime.now().astimezone().date()
    print(f"== TERM STATUS for {today:%a %Y-%m-%d} (week {((today - FIRST_DAY).days // 7) + 1} of term)")

    print("-- Unlogged lectures (held so far vs. files in courses/<CODE>/lectures/)")
    for code in COURSES:
        held = lecture_dates(code, today)
        logged = logged_numbers(code)
        n_logged = len(logged)
        unlogged = [d for i, d in enumerate(held) if (i + 1) not in logged]
        missing = len(unlogged)
        if missing > 0:
            recent = ", ".join(f"{d:%b %-d}" for d in unlogged)
            print(f"  {code}: {len(held)} held, {n_logged} logged → {missing} UNLOGGED ({recent})")
        else:
            print(f"  {code}: {len(held)} held, {n_logged} logged — up to date")

    print("-- Countdown (next per course, plus anything ≤ 10 days)")
    seen = set()
    for d, course, label, kind in sorted(KEY_DATES):
        left = (d - today).days
        if left < 0:
            continue
        first_for_course = course not in seen
        if left <= 10 or first_for_course:
            seen.add(course)
            step = LADDERS.get(kind, {}).get(left, "")
            flag = "  ← " + step if step else ""
            print(f"  T-{left:<3} {d:%a %b %-d}  {course:8} {label}{flag}")

    crunch = D(2026, 10, 29)
    left = (crunch - today).days
    if 0 <= left <= 21:
        print(f"-- Oct 29–30 crunch in {left} days: CPSC midterm Thu 19:00, STAT midterm Fri 08:00, PHIL Exam 3 Fri 14:00. Prep finished by Oct 28.")

if __name__ == "__main__":
    main()
