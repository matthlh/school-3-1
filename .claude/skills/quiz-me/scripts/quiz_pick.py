#!/usr/bin/env python3
"""Pick an interleaved retrieval session from the question banks, weighted by the ledger.

Usage:
  quiz_pick.py [--course CODE ...] [--n N] [--all] [--transit] [--due] [--report] [--date YYYY-MM-DD] [--seed S]

  default      write routines/quiz-session.json and print the focus block + the numbered session
               (questions WITH answers — for Claude's eyes; ask them one at a time)
  --transit    6 questions by default; also writes routines/runs/<date>-transit.md — questions
               first, answers after a divider — for reading on the bus; the session file is
               written too, so a reply like "1 O 2 ~ 3 X" can be graded with quiz_grade.py
  --all        ignore due dates (exam run-up): every topic is eligible, weighted by grade
  --due        print the due/overdue topic list only (no session file)
  --report     print the focus block only (no session file)

Selection: topic priority (overdue days, grade X > ~ > unquizzed > O, ×2 within 7 d of that
course's exam, ×1.5 within 14 d) + question score (never asked > missed > stale > solid, plus a
small bonus for the question types that course's exam rewards). Then greedy with interleaving:
never the same course twice in a row when another course is available, never the same topic
twice in a row, at most CAP questions per topic. Not-yet-due topics fill the remainder ("ahead").
Always refreshes the "## Due now" block in ledger.md (idempotent, nothing else touched).
"""
import argparse, datetime as dt, json, math, os, random, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import quizlib as L

def topic_priority(row, today, exam_days, force_due):
    nd = row["next_date"]
    late = (today - nd).days if nd else None
    due = force_due or (late is not None and late >= 0)
    p = 0.0
    if due:
        p = 100 + (min(late, 20) * 5 if (late and late > 0 and not force_due) else 0)
    p += {"X": 60, "~": 30, "O": 0}.get(row["grade"], 40)
    if exam_days is not None:
        p *= 2 if exam_days <= 7 else 1.5 if exam_days <= 14 else 1
    return p, due

def question_score(q, hist, today, rnd):
    if not hist:
        s = 100.0
    else:
        d, g = hist[-1]
        s = {"X": 80, "~": 50, "O": 20}[g] + min((today - d).days if d else 30, 30)
        s += 10 * sum(1 for _, gg in hist[-3:] if gg == "X")
    pref = L.TYPE_PREF.get(q["course"], [])
    if q["type"] in pref:
        s += (4 - pref.index(q["type"])) * 3
    return s + rnd.uniform(0, 3)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--course", action="append", help="scope to a course code (repeatable)")
    ap.add_argument("--n", type=int)
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--transit", action="store_true")
    ap.add_argument("--due", action="store_true")
    ap.add_argument("--report", action="store_true")
    ap.add_argument("--date")
    ap.add_argument("--seed")
    a = ap.parse_args()
    today = dt.date.fromisoformat(a.date) if a.date else L.today_local()
    courses = [c.upper().replace(" ", "") for c in a.course] if a.course else None
    n = a.n or (6 if a.transit else 10)
    rnd = random.Random(a.seed or today.isoformat())

    text, rows = L.load_ledger()
    questions = L.load_questions(courses)
    state = L.load_state()
    exams = L.exams_by_course(today)

    # Keep ledger.md's Due-now block truthful on every run.
    L.write_ledger(text, rows, today)

    if a.due:
        for line in L.due_block(rows, today):
            print(line)
        return

    fx = L.focus(rows, questions, state, today, exams, courses)
    L.print_focus(fx, today, exams)
    if a.report:
        return

    # ---- candidates
    cands = []
    for r in fx["rows"]:
        qs = fx["by_topic"].get(r["idx"], [])
        if not qs:
            continue
        pr, due = topic_priority(r, today, exams.get(r["course"], (None,))[0], a.all)
        for q in qs:
            cands.append(dict(q=q, row=r, due=due, score=pr + question_score(q, L.history(state, q), today, rnd)))
    if not cands:
        print("\n== No questions in the bank for that scope. Log a lecture first.")
        sys.exit(1)

    due_topics = {c["row"]["idx"] for c in cands if c["due"]}
    cap = max(3, math.ceil(n / max(1, len(due_topics) or len({c['row']['idx'] for c in cands}))))
    pool = sorted(cands, key=lambda c: -c["score"])
    due_pool = [c for c in pool if c["due"]]
    ahead_pool = sorted((c for c in pool if not c["due"]), key=lambda c: (c["row"]["next_date"] or dt.date.max, -c["score"]))

    chosen, per_topic, last_course, last_topic = [], {}, None, None
    def take(from_pool):
        nonlocal last_course, last_topic
        ok = [c for c in from_pool if per_topic.get(c["row"]["idx"], 0) < cap and c not in chosen]
        if not ok:
            return False
        pref = [c for c in ok if c["q"]["course"] != last_course] or ok
        pref = [c for c in pref if c["row"]["idx"] != last_topic] or pref
        c = pref[0]
        chosen.append(c)
        per_topic[c["row"]["idx"]] = per_topic.get(c["row"]["idx"], 0) + 1
        last_course, last_topic = c["q"]["course"], c["row"]["idx"]
        return True
    while len(chosen) < n and take(due_pool):
        pass
    while len(chosen) < n and take(ahead_pool):
        pass

    # ---- session file
    items = []
    for i, c in enumerate(chosen, 1):
        q, r = c["q"], c["row"]
        items.append(dict(n=i, id=q["id"], course=q["course"], label=L.COURSE_LABEL[q["course"]],
                          topic=r["topic"], topic_tag=q["topic"], lec=q["lec"], type=q["type"],
                          ahead=not c["due"], q=q["q"], a=q["a"], file=q["file"], line=q["line"]))
    session = dict(date=today.isoformat(), created=dt.datetime.now().astimezone().isoformat(timespec="minutes"),
                   mode="transit" if a.transit else "quiz", courses=courses, n=len(items), items=items)
    os.makedirs(os.path.dirname(L.SESSION), exist_ok=True)
    with open(L.SESSION, "w", encoding="utf-8") as f:
        json.dump(session, f, indent=1, ensure_ascii=False)

    n_due = sum(1 for c in chosen if c["due"])
    print(f"\n== SESSION · {len(items)} questions ({n_due} due, {len(items) - n_due} ahead) · "
          f"{'transit' if a.transit else 'quiz'} · cap {cap}/topic → {os.path.relpath(L.SESSION, L.ROOT)}")
    for it in items:
        flag = " (ahead)" if it["ahead"] else ""
        print(f"\n{it['n']}. [{it['label']} · {it['topic_tag']} · {it['type']}{flag}] {it['q']}")
        print(f"   A: {it['a']}")
    if not a.transit:
        print("\nGrade with:  quiz_grade.py 1:O 2:X 3:~ …   (skip = -, unasked = leave out)")
        return

    # ---- transit deck
    os.makedirs(L.RUNS_DIR, exist_ok=True)
    deck = os.path.join(L.RUNS_DIR, f"{today.isoformat()}-transit.md")
    out = [f"# Transit deck — {today:%a %b %-d}", "",
           "Answer each one in your head (out loud is better), then check below. Reply with grades, "
           "e.g. `1 O 2 ~ 3 X 4 O 5 O 6 ~`, and the ledger updates.", ""]
    for it in items:
        out.append(f"**{it['n']}. {it['label']}** — {it['q']}")
        out.append("")
    out += ["---", "", "## Answers", ""]
    for it in items:
        out.append(f"**{it['n']}.**")
        out.append("")
        out.append(it['a'])
        out.append("")
    with open(deck, "w", encoding="utf-8") as f:
        f.write("\n".join(out))
    print(f"\n== Transit deck → {os.path.relpath(deck, L.ROOT)}")

if __name__ == "__main__":
    main()
