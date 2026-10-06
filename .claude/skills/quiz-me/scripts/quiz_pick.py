#!/usr/bin/env python3
"""Pick a revision session from the question banks, weighted by ledger.md, and refresh its Due-now block every run.
What each mode does and how the scheduler decides is in the quiz-me SKILL ("Variants", "What the scripts decide").

Usage:
  quiz_pick.py [--course CODE ...] [--topic TEXT ...] [--n N] [--all] [--transit [--replace] | --long | --sprint]
               [--due] [--report] [--date YYYY-MM-DD] [--seed S]
"""
import argparse, datetime as dt, json, math, os, random, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import quizlib as L

WORKED_TYPES = ("apply", "derive")     # worked problems: all --sprint asks, and asked as a live variant when last graded O
SPRINT_SECONDS = 18                    # --sprint's clock per question: 3 minutes for the default 10

def past_wrong(state, qid):
    """His recorded wrong answers to one question (the `said` of its history entries' extra), oldest first, each once."""
    hist = state["questions"].get(qid, {}).get("history", [])
    return list(dict.fromkeys(e[2]["said"] for e in hist if len(e) > 2 and "said" in e[2]))

def topic_priority(row, standing, late, exam_days, force_due):
    due = force_due or standing in ("due", "sweep")
    p = 0.0
    if due:
        p = 100 + (min(L.lateness(row, late), 20) * 5 if (late > 0 and not force_due) else 0)
    p += {"X": 60, "~": 30, "O": 0}.get(row["grade"], 40)
    if exam_days is not None:
        p *= 2 if exam_days <= 7 else 1.5 if exam_days <= 14 else 1.25 if exam_days <= 21 else 1
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
    ap.add_argument("--topic", action="append", help="keep only ledger rows whose topic contains this text, case-insensitive (repeatable; e.g. the four texts on an exam)")
    ap.add_argument("--n", type=int)
    ap.add_argument("--all", action="store_true")
    modes = ap.add_mutually_exclusive_group()
    modes.add_argument("--transit", action="store_true")
    modes.add_argument("--long", action="store_true", help="the Friday set: long problems only, worked in full against a clock")
    modes.add_argument("--sprint", action="store_true", help="STAT 251's which-method drill: short apply and derive questions against a clock")
    ap.add_argument("--replace", action="store_true",
                    help="with --transit: discard an ungraded deck from another day, or today's deck, and build a new one")
    ap.add_argument("--due", action="store_true")
    ap.add_argument("--report", action="store_true")
    ap.add_argument("--date")
    ap.add_argument("--seed")
    a = ap.parse_args()
    if a.replace and not a.transit:
        ap.error("--replace goes with --transit")
    today = dt.date.fromisoformat(a.date) if a.date else L.today_local()
    courses = [c.upper().replace(" ", "") for c in a.course] if a.course else None
    if a.sprint:
        if courses not in (None, ["STAT251"]):
            ap.error("--sprint is STAT 251 only")
        courses = ["STAT251"]
    n = a.n or (6 if a.transit else 4 if a.long else 10)
    mode = "transit" if a.transit else "long" if a.long else "sprint" if a.sprint else "quiz"
    rnd = random.Random(a.seed or today.isoformat())

    text, rows = L.load_ledger()
    cal = L.load_calendar()
    looks = L.load_lookalikes(rows)      # every mode, so a bad Look-alikes cell stops --due and the 06:35 --transit alike
    deck_md = os.path.join(L.RUNS_DIR, f"{today.isoformat()}-transit.md")
    if a.transit and not a.replace:      # the deck page saves taps under the deck's date, so one deck per date
        if os.path.exists(L.TRANSIT_SESSION):
            with open(L.TRANSIT_SESSION, encoding="utf-8") as f:
                waiting = json.load(f)["date"]
            if waiting != today.isoformat():         # a new deck would strand its taps: nothing could grade them
                raise SystemExit(f"{os.path.relpath(L.TRANSIT_SESSION, L.ROOT)} holds the deck of {waiting}, which was never "
                                 f"graded. If he tapped every card, grade it with quiz_grade.py --transit {waiting} "
                                 "\"<its replyString>\"; otherwise run this again with --replace to discard it.")
        if os.path.exists(deck_md):                  # graded or not
            raise SystemExit(f"Today's deck ({today.isoformat()}) is already built ({os.path.relpath(deck_md, L.ROOT)}). "
                             "Keep it: a second deck under the same date would mix its taps with the first's. Pass "
                             "--replace only to discard it on purpose.")
    questions = L.load_questions()       # the whole bank, parsed once: readiness counts every course
    scoped = [q for q in questions if not courses or q["course"] in courses]
    state = L.load_state()
    ready = L.readiness(rows, today, cal, state, questions)
    block = L.due_block(rows, today, cal, ready)
    L.write_ledger(L.ledger_text(text, rows, block))    # keep ledger.md's Due-now block truthful on every run

    if a.due:
        for line in block + L.unmatched_block(L.bank_by_topic(rows, scoped)[1]):
            print(line)
        return

    fx = L.focus(rows, scoped, state, today, cal, courses)
    L.print_focus(fx, today, cal, ready)
    for line in L.day_after(today, courses):
        print(line)
    if a.report:
        return

    # ---- candidates
    cands, prio = [], {}
    topic_keys = [t.lower() for t in a.topic] if a.topic else None
    for r in fx["rows"]:
        if topic_keys and not any(k in r["topic"].lower() for k in topic_keys):
            continue
        st, late, _ = fx["standing"][r["idx"]]
        if st == "frozen" and not topic_keys:        # its exam is past and the next one does not cover it
            continue
        qs = fx["by_topic"].get(r["idx"], [])
        if a.transit or a.long:      # the bus deck has no room for paper; the Friday set is nothing but
            qs = [q for q in qs if q.get("long") == a.long]
        if a.sprint:                 # which method: short worked problems only, nothing that needs paper
            qs = [q for q in qs if not q["long"] and q["type"] in WORKED_TYPES]
        if not qs:
            continue
        exam = L.exam_ahead(r, today, cal)          # the boost comes from the first exam ahead that covers the topic
        pr, due = topic_priority(r, st, late, (exam["date"] - today).days if exam else None, a.all)
        prio[r["idx"]] = (pr, due, r["course"])
        for q in qs:
            cands.append(dict(q=q, row=r, due=due, pair=None,
                              score=pr + question_score(q, L.history(state, q), today, rnd)))
    if not cands:
        print("\n== No questions in the bank for that scope. Log a lecture first.")
        sys.exit(1)

    due_topics = {c["row"]["idx"] for c in cands if c["due"]}
    cap = max(3, math.ceil(n / max(1, len(due_topics) or len({c['row']['idx'] for c in cands}))))
    pool = sorted(cands, key=lambda c: -c["score"])
    due_pool = [c for c in pool if c["due"]]
    ahead_pool = sorted((c for c in pool if not c["due"]), key=lambda c: (c["row"]["next_date"] or dt.date.max, -c["score"]))

    # Course quotas. Each due course gets slots in proportion to the summed priority of its due
    # topics (more topics, more overdue, weaker, nearer exam → more), never fewer than one.
    # Plain greedy interleaving let two urgent courses alternate and starve a third: five sessions
    # up to 2026-09-14 never asked PHIL 385 once with its exam 18 d out.
    weight = {}
    for idx, (pr, due, course) in prio.items():
        if due:
            weight[course] = weight.get(course, 0.0) + pr
    total = sum(weight.values())
    quota = {c: max(1, round(n * w / total)) for c, w in weight.items()} if total else {}

    chosen, per_topic, per_course, last_course, last_topic = [], {}, {}, None, None
    def eligible(from_pool, course=None):
        return [c for c in from_pool if c not in chosen and per_topic.get(c["row"]["idx"], 0) < cap
                and (course is None or c["q"]["course"] == course)]
    def take(c):
        nonlocal last_course, last_topic
        chosen.append(c)
        per_topic[c["row"]["idx"]] = per_topic.get(c["row"]["idx"], 0) + 1
        per_course[c["q"]["course"]] = per_course.get(c["q"]["course"], 0) + 1
        last_course, last_topic = c["q"]["course"], c["row"]["idx"]
    def pick_from(ok):
        pref = [c for c in ok if c["q"]["course"] != last_course] or ok
        pref = [c for c in pref if c["row"]["idx"] != last_topic] or pref
        c = pref[0]
        take(c)
        # Its look-alike goes right after it: confusable topics side by side beat the same topics apart (Brunmair &
        # Richter 2019). The best eligible question of a paired topic, from the due pool while any due question is
        # left, since not-due topics only fill leftover slots; it counts toward n and pulls no look-alike of its own.
        mates = looks.get(c["row"]["idx"], {})
        left = eligible(due_pool) or eligible(ahead_pool)
        alike = [m for m in left if m["row"]["idx"] in mates]
        if alike and len(chosen) < n:
            alike[0]["pair"] = dict(of=len(chosen), why=mates[alike[0]["row"]["idx"]])
            take(alike[0])
    # 1) due topics, courses interleaved by smooth weighted round-robin on their quotas
    credit = {c: 0.0 for c in quota}
    while len(chosen) < n:
        live = [c for c in quota if per_course.get(c, 0) < quota[c] and eligible(due_pool, c)]
        if not live:
            break
        for c in live:
            credit[c] += quota[c]
        c = max(live, key=lambda k: credit[k])
        credit[c] -= sum(quota[k] for k in live)
        pick_from(eligible(due_pool, c))
    # 2) leftover slots: best remaining due questions (quota rounding, a course ran dry), then ahead
    while len(chosen) < n and eligible(due_pool):
        pick_from(eligible(due_pool))
    while len(chosen) < n and eligible(ahead_pool):
        pick_from(eligible(ahead_pool))

    # ---- session file
    items = []
    for i, c in enumerate(chosen, 1):
        q, r = c["q"], c["row"]
        items.append(dict(n=i, id=q["id"], course=q["course"], label=L.COURSE_LABEL[q["course"]],
                          topic=r["topic"], topic_tag=q["topic"], lec=q["lec"], type=q["type"],
                          ahead=not c["due"], long=q.get("long", False), parts=L.parts(q) if q.get("long") else 1,
                          q=q["q"], q_display=q["q_display"], a=q["a"], file=q["file"], line=q["line"],
                          src_title=q["src_title"], src_url=q["src_url"], lookalike=c["pair"]))
    session = dict(date=today.isoformat(), created=dt.datetime.now().astimezone().isoformat(timespec="minutes"),
                   mode=mode, courses=courses, n=len(items), items=items)
    session_path = L.TRANSIT_SESSION if a.transit else L.SESSION
    os.makedirs(os.path.dirname(session_path), exist_ok=True)
    with open(session_path, "w", encoding="utf-8") as f:
        json.dump(session, f, indent=1, ensure_ascii=False)

    n_due = sum(1 for c in chosen if c["due"])
    print(f"\n== SESSION · {len(items)} questions ({n_due} due, {len(items) - n_due} ahead) · "
          f"{mode} · cap {cap}/topic → {os.path.relpath(session_path, L.ROOT)}")
    if a.long:
        total = sum(it["parts"] for it in items)
        print(f"== Clock: {total} parts × {L.MINUTES_PER_PART} min = {total * L.MINUTES_PER_PART} minutes, on paper, "
              f"no notes; he reports every part's answer at the end")
    if a.sprint:
        m, s = divmod(len(items) * SPRINT_SECONDS, 60)
        print(f"== Clock: {len(items)} questions × {SPRINT_SECONDS} s = " + (f"{m} min {s} s" if s else f"{m} minutes")
              + ", every question at once; the answer is the method only: name the distribution or rule and write the first "
                "setup line, no arithmetic. Grade O or X, nothing in between")
    for it in items:
        flag = " (ahead)" if it["ahead"] else ""
        if it["long"] and not a.long:
            flag += " (long: steps only)"
        elif a.long:
            flag += f" ({it['parts']} parts)"
        if it["lookalike"]:
            flag += f" (look-alike of {it['lookalike']['of']})"
        hist = L.history(state, it)
        if hist and hist[-1][1] == "O" and it["type"] in WORKED_TYPES:
            flag += " (variant: last O)"
        print(f"\n{it['n']}. [{it['label']} · {it['topic_tag']} · {it['type']}{flag}] {it['q_display']}")
        print(f"   A: {it['a']}")
        if it["src_url"]:
            print(f"   Page: {it['src_title']} ({it['src_url']})")
        if it["lookalike"]:
            print(f"   Why paired: {it['lookalike']['why']}")
        said = past_wrong(state, it["id"])
        if said:
            print("   Past wrong answers: " + " · ".join(f'"{s}"' for s in said))
    if not a.transit:
        print("\nGrade with:  quiz_grade.py \"1:O3 2:X3/c 3:~2/m\"   "
              "(grade + confidence 1–3, then /c f m k s = cause on an X or ~; a variant takes its question's grade; - skips)")
        return

    # ---- transit deck
    os.makedirs(L.RUNS_DIR, exist_ok=True)
    out = [f"# Transit deck — {today:%a %b %-d}", "",
           "Answer each one in your head (out loud is better), then check below. Tick each answer's key points on the "
           "deck page, or reply with grades like `1 O 2 ~ 3 X 4 O 5 O 6 ~`; the ledger updates.", ""]
    for it in items:
        out.append(f"**{it['n']}. {it['label']}** — {it['q_display']}")
        out.append("")
    out += ["---", "", "## Answers", ""]
    for it in items:
        out.append(f"**{it['n']}.**")
        out.append("")
        out.append(it['a'])
        out.append("")
        if it["src_url"]:
            out.append(f"Source: [{it['src_title']}]({it['src_url']})")   # the deck shows it under the answer
            out.append("")
    with open(deck_md, "w", encoding="utf-8") as f:
        f.write("\n".join(out))
    print(f"\n== Transit deck → {os.path.relpath(deck_md, L.ROOT)}")

if __name__ == "__main__":
    main()
