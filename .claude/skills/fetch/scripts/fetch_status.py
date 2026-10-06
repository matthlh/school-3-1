#!/usr/bin/env python3
"""fetch_status.py — on-demand status check for the `fetch` skill: does a course meet on the
given date, what lecture number is that, and does a pre-lecture/logged file already exist for it.

Pure local computation, no network. Built on top of morning-check/scripts/term.py so the weekly
meeting-pattern table (COURSES) has exactly one copy — this script never redefines it.

Usage: fetch_status.py [--course CODE] [--date YYYY-MM-DD]
Prints one line per course: whether it meets that date, the lecture number, and whether a file
exists for it (missing / staged `_NN-*.md` / logged `NN-*.md`, or a `MM-NN-*.md` range covering it).
"""
import argparse, datetime as dt, glob, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("SCHOOL_ROOT") or os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
sys.path.insert(0, os.path.join(HERE, "..", "..", "morning-check", "scripts"))   # term.py sits beside this skill, not under SCHOOL_ROOT
import term  # noqa: E402

def lecture_file(code, n):
    """Workspace-relative path of the log covering lecture n (term.lecture_logs, so `05-06-…`
    covers 6), else of its staged `_NN-…` outline, else None."""
    d = os.path.join("courses", code, "lectures")
    log = term.lecture_logs(code).get(n)
    if log:
        return os.path.join(d, log)
    staged = sorted(glob.glob(os.path.join(ROOT, d, f"_{n:02d}-*.md")))
    return os.path.relpath(staged[0], ROOT) if staged else None

def meets_on(code, d):
    c = term.COURSES[code]
    if d in c.get("extra", set()):
        return True
    if d < c["start"] or d > c["end"]:
        return False
    return d.weekday() in c["days"] and d not in term.NO_CLASS and d not in c.get("skip", set())

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--course")
    ap.add_argument("--date")
    a = ap.parse_args()
    today = dt.date.fromisoformat(a.date) if a.date else dt.datetime.now().astimezone().date()
    codes = [a.course] if a.course else list(term.COURSES)

    for code in codes:
        if code not in term.COURSES:
            print(f"{code}: not in term.py's COURSES table")
            continue
        held = term.lecture_dates(code, today)
        meets = meets_on(code, today)
        # lecture number = count of held meetings up to and including today (position, matches
        # the NN- file-naming convention elsewhere in this repo, not the calendar week number)
        n = len(held) if meets else len(held) + 1
        f = lecture_file(code, n)
        if f is None:
            status = "missing"
        elif os.path.basename(f).startswith("_"):
            status = "staged"
        else:
            status = "logged"
        when = "today" if meets else ("next class TBD — not this date" if not held else "not meeting today")
        print(f"{code}: meets_today={meets} lecture={n} ({when}) file={status}" + (f" → {f}" if f else ""))

if __name__ == "__main__":
    main()
