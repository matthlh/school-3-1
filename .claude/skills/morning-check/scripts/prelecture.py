#!/usr/bin/env python3
"""prelecture.py — stage pre-lecture material for the next CPSC 310 lectures.

Takes the next N lectures from cpsc310_site.load_lectures() dated today or later that have no log
(term.lecture_logs, so `05-06-…` covers 6) or _NN-*.md outline in courses/CPSC310/lectures/ yet,
downloads each posted deck with cpsc310_site.fetch_deck() (text extracted into
routines/slides/cpsc310/) and prints one block per lecture: number, title, date, and the deck
text's path, or that the deck is not posted yet and there is nothing to stage. The morning-check
skill writes lectures/_NN-<slug>.md (plain-sentence outline + 3 pre-lecture questions) from the
deck text. There are no reader chapters to stage: the course site removed its lecture → chapter
pages on 2026-09-28. A schedule or deck that cannot be fetched or no longer parses raises, and the
run exits non-zero before any block prints.

Usage: prelecture.py [--n 2] [--force]
"""
import argparse, datetime as dt, glob, os

import cpsc310_site, term

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("SCHOOL_ROOT") or os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
LECT_DIR = os.path.join(ROOT, "courses", "CPSC310", "lectures")

def has_file(n):
    """A log covers lecture n (ranges count) or its `_NN-…` outline is staged."""
    return n in term.lecture_logs("CPSC310") or bool(glob.glob(os.path.join(LECT_DIR, f"_{n:02d}-*.md")))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--n", type=int, default=2)
    ap.add_argument("--force", action="store_true", help="stage even if a lecture file exists")
    a = ap.parse_args()
    today = dt.date.today()
    picked = []
    for L in cpsc310_site.load_lectures():
        if not L["date"] or dt.date.fromisoformat(L["date"]) < today or (has_file(L["n"]) and not a.force):
            continue
        picked.append(L)
        if len(picked) >= a.n:
            break
    if not picked:
        print("prelecture: nothing to stage (next lectures already have files)")
        return
    decks = {L["n"]: cpsc310_site.fetch_deck(L)[1] for L in picked if L["pdf"]}   # every download before any block prints
    for L in picked:
        n, d, title, has_deck = L["n"], dt.date.fromisoformat(L["date"]), L["title"], bool(L["pdf"])
        days = (d - today).days
        print(f"== CPSC 310 lecture {n} · {title} · {d.strftime('%a %b %-d')} ({'today' if days == 0 else f'in {days} d'}) · deck {'posted' if has_deck else 'not posted'}")
        if has_deck:
            print(f"   deck text: {decks[n].relative_to(cpsc310_site.ROOT)}"
                  + (f" · write lectures/_{cpsc310_site.slug(L)}.md" if not has_file(n) else ""))
        else:
            print("   nothing to stage until the deck is posted")
    print("\nNext: write courses/CPSC310/lectures/_NN-<slug>.md from each posted deck's text — plain-sentence outline of the slides + 3 pre-lecture questions. A lecture whose deck is not posted yet has nothing to stage. Do not add quiz-bank questions until the lecture is logged.")

if __name__ == "__main__":
    main()
