#!/usr/bin/env python3
"""Question ids (2026-11-06). Every bank question carries a permanent id at the end of its meta line,
`**Topic:** … **Lec:** … **Type:** apply  **Id:** 3f2a9c1b`, and its history in routines/quiz-state.json is filed under
it, so rewording a stem keeps the history. quiz_pick.py stamps new questions on every run; this script is for the rest.

Usage:
  quiz_ids.py                   check: duplicate stamps stop, unstamped questions and loose history are listed
  quiz_ids.py --stamp           stamp every question that has no **Id:** yet (what quiz_pick.py does first)
  quiz_ids.py --retire ID "why" keep a loose history record as retired (its question was cut or replaced on purpose);
                                repeatable as --retire ID1 ID2 … "why"
  quiz_ids.py --link OLD NEW    move a loose record's history onto the question that now carries id NEW (a question
                                reworded before it had a stamp); NEW's own history, if any, keeps its place after it
"""
import argparse, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import quizlib as L


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--stamp", action="store_true")
    ap.add_argument("--retire", nargs="+", metavar="ID")
    ap.add_argument("--link", nargs=2, metavar=("OLD", "NEW"))
    a = ap.parse_args()
    if a.stamp:
        for f, line, i in L.stamp_ids():
            print(f"stamped {f}:{line} {i}")
    qs = L.load_questions()                      # stops on a duplicate stamp
    state = L.load_state()
    ids = {q["id"]: q for q in qs}
    if a.retire:
        if len(a.retire) < 2:
            ap.error('--retire takes one or more ids, then the reason: --retire 1a2b3c4d "cut: course framing"')
        *which, why = a.retire
        for k in which:
            rec = state["questions"].get(k)
            if rec is None:
                raise SystemExit(f"{k}: no history record has this id")
            if k in ids:
                raise SystemExit(f"{k}: a bank question still carries this id ({ids[k]['file']}:{ids[k]['line']}); "
                                 "delete the question first")
        for k in which:
            state["questions"][k]["retired"] = f"{L.today_local().isoformat()}: {why}"
            print(f"retired {k} · {state['questions'][k]['course']} · {state['questions'][k]['topic'][:50]}")
        L.save_state(state)
    if a.link:
        old, new = a.link
        rec = state["questions"].get(old)
        if rec is None or old in ids:
            raise SystemExit(f"{old}: not a loose history record (no record, or a question still carries it)")
        if new not in ids:
            raise SystemExit(f"{new}: no bank question carries this id")
        tgt = state["questions"].setdefault(new, dict(course=rec["course"], topic=rec["topic"], history=[]))
        tgt["history"] = sorted(rec["history"] + tgt["history"], key=lambda e: e[0])
        del state["questions"][old]
        for s in state["sessions"]:
            for res in s.get("results", []):
                if res[1] == old:
                    res[1] = new
        priv = L.load_private()                  # his wrong answers move with the history
        if old in priv:
            priv[new] = sorted(priv.pop(old) + priv.get(new, []), key=lambda e: e[0])
            L.save_private(priv)
        L.save_state(state)
        print(f"linked {old} → {new} ({len(tgt['history'])} answers)")
    bare = [q for q in qs if not q["stamp"]]
    loose = L.orphans(state, qs)
    print(f"{len(qs)} questions · {len(qs) - len(bare)} stamped · {len(bare)} not stamped yet"
          + (" (quiz_pick.py stamps them on its next run)" if bare else ""))
    for k, v in loose:
        print(f"loose history {k} · {v['course']} · {v['topic'][:50]} · {len(v['history'])} answers, last {v['history'][-1]}")
    if not loose:
        print("no loose history")


if __name__ == "__main__":
    main()
