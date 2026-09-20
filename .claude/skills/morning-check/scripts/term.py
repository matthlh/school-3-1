#!/usr/bin/env python3
"""Term status for the morning check: unlogged lectures, exam/deliverable countdowns with the
PREP.md phase label, and UBC admin deadlines. Pure local computation — no network.

Usage: python3 term.py [YYYY-MM-DD]      (defaults to today, Pacific)

The term structure below is the single machine-readable copy of the dates in ledger.md.
When a date changes in ledger.md, change it here too (the morning check says so).
"""
import datetime as dt, glob, os, sys

ROOT = "/Users/matthe/Documents/CodingProjects/School 3-1"
D = dt.date
MON, TUE, WED, THU, FRI = 0, 1, 2, 3, 4

# UBC 2026W Term 1: classes Wed Sep 9 → Mon Dec 7; exams Dec 11–22.
FIRST_DAY, LAST_DAY = D(2026, 9, 9), D(2026, 12, 7)
NO_CLASS = {D(2026, 10, 12), D(2026, 11, 9), D(2026, 11, 10), D(2026, 11, 11)}  # Thanksgiving, midterm break

# Per-course lecture pattern. Exam days and course-specific cancellations are removed so a
# missing file on those days isn't counted as an unlogged lecture.
COURSES = {
    "STAT251": dict(days={MON, WED, FRI}, start=FIRST_DAY, end=LAST_DAY,
                    skip={D(2026, 10, 30)}),                                   # midterm slot (unverified)
    "PHIL385": dict(days={MON, WED, FRI}, start=FIRST_DAY, end=LAST_DAY,
                    skip={D(2026, 9, 9),                                       # intro remarks only; Matt absent
                          D(2026, 9, 30), D(2026, 10, 2), D(2026, 10, 16), D(2026, 10, 30), D(2026, 11, 20)}),
    "CPSC310": dict(days={TUE, THU}, start=D(2026, 9, 10), end=D(2026, 12, 3),
                    skip={D(2026, 10, 29)}),                                   # midterm evening, no Thu lecture
    "ASIA250": dict(days={MON}, start=D(2026, 9, 14), end=D(2026, 11, 30), skip=set(),
                    extra={D(2026, 9, 8)}),                                    # week 1 posted Tue Sep 8
}

# Exams use the Phase-2 ladder from PREP.md; deliverables use the deliverable ladder.
EXAM_LADDER = {10: "T-10 gap check: syllabus topics vs. ledger", 9: "45 min mixed revision",
               8: "45 min mixed revision", 7: "45 min mixed revision",
               6: "45 min mixed revision", 5: "45 min mixed revision + name the prof's 2–3 themes",
               4: "T-4 gaps and X topics only", 3: "T-3 FULL TIMED MOCK", 2: "T-2 mark the mock, study only the misses",
               1: "T-1 light: verbal reconstruction, bed 10:30", 0: "EXAM DAY"}
DELIV_LADDER = {10: "T-10 environment check: clone, install, run tests, push a throwaway commit",
                8: "T-8 read the spec once, write the done-checklist", 2: "T-2 first autograder run (this is the buffer)",
                1: "T-1 write the design rationale", 0: "DUE — submit early, then stop"}

KEY_DATES = [  # (date, course, label, kind)  kind: exam | deliverable | admin | paper
    (D(2026, 9, 21), "UBC", "Drop without W closes", "admin"),
    (D(2026, 9, 25), "CPSC310", "D1 due 18:00", "deliverable"),
    (D(2026, 10, 2), "PHIL385", "Exam 1 14:00 (15%, ESSAY: 2 × 500 words in 50 min)", "exam"),
    (D(2026, 10, 2), "ASIA250", "Optional Assignment 1 due 23:59 (+2% bonus)", "admin"),
    (D(2026, 10, 15), "ASIA250", "SWR1 due (15%) — date approximate", "paper"),
    (D(2026, 10, 16), "CPSC310", "D2 due 18:00", "deliverable"),
    (D(2026, 10, 16), "PHIL385", "Exam 2 14:00 (15%)", "exam"),
    (D(2026, 10, 24), "STAT251", "WA1 due (Gradescope)", "deliverable"),
    (D(2026, 10, 29), "CPSC310", "MIDTERM 19:00–21:00 (25%)", "exam"),
    (D(2026, 10, 30), "STAT251", "MIDTERM 08:00–08:50 (22%)", "exam"),
    (D(2026, 10, 30), "PHIL385", "Exam 3 14:00 (15%)", "exam"),
    (D(2026, 10, 30), "UBC", "Withdraw-with-W deadline (all courses)", "admin"),
    (D(2026, 11, 6), "CPSC310", "D3 due 18:00 (paired)", "deliverable"),
    (D(2026, 11, 12), "ASIA250", "SWR2 due (15%) — date approximate", "paper"),
    (D(2026, 11, 20), "PHIL385", "Exam 4 14:00 (15%)", "exam"),
    (D(2026, 11, 27), "CPSC310", "D4 due 18:00 (paired)", "deliverable"),
    (D(2026, 12, 2), "STAT251", "WA2 due", "deliverable"),
    (D(2026, 12, 10), "ASIA250", "FINAL PAPER due (47%)", "paper"),
    (D(2026, 12, 11), "UBC", "Exam period starts (Dec 11–22) — finals TBA, check SSC", "admin"),
]

def lecture_dates(code, today):
    c = COURSES[code]
    d, out = c["start"], set(c.get("extra", set()))
    while d <= c["end"]:
        if d.weekday() in c["days"] and d not in NO_CLASS and d not in c["skip"]:
            out.add(d)
        d += dt.timedelta(days=1)
    return sorted(x for x in out if x <= today)

def logged_count(code):
    """Count lectures covered by files in courses/<CODE>/lectures/. A file named
    `01-02-<slug>.md` covers two lectures (Matt may log a week in one file)."""
    import re
    total = 0
    for f in glob.glob(os.path.join(ROOT, "courses", code, "lectures", "*.md")):
        base = os.path.basename(f)
        if base.startswith("_"):
            continue
        m = re.match(r"^(\d+)(?:-(\d+))?-", base)
        total += (int(m.group(2)) - int(m.group(1)) + 1) if (m and m.group(2)) else 1
    return total

def main():
    today = D.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else dt.datetime.now().astimezone().date()
    print(f"== TERM STATUS for {today:%a %Y-%m-%d} (week {((today - FIRST_DAY).days // 7) + 1} of term)")

    print("-- Unlogged lectures (held so far vs. files in courses/<CODE>/lectures/)")
    for code in COURSES:
        held = lecture_dates(code, today)
        n_logged = logged_count(code)
        missing = len(held) - n_logged
        if missing > 0:
            recent = ", ".join(f"{d:%b %-d}" for d in held[-missing:])
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
            ladder = EXAM_LADDER if kind == "exam" else DELIV_LADDER if kind in ("deliverable", "paper") else {}
            step = ladder.get(left, "")
            flag = "  ← " + step if step else ""
            print(f"  T-{left:<3} {d:%a %b %-d}  {course:8} {label}{flag}")

    crunch = D(2026, 10, 29)
    left = (crunch - today).days
    if 0 <= left <= 21:
        print(f"-- Oct 29–30 crunch in {left} days: CPSC midterm Thu 19:00, STAT midterm Fri 08:00, PHIL Exam 3 Fri 14:00. Prep finished by Oct 28.")

if __name__ == "__main__":
    main()
