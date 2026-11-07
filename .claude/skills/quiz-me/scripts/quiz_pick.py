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

def past_wrong(state, priv, qid):
    """His recorded wrong answers to one question, oldest first, each once: the git-ignored quiz-private.json, plus any
    `said` still in an old quiz-state.json entry."""
    hist = state["questions"].get(qid, {}).get("history", [])
    old = [e[2]["said"] for e in hist if len(e) > 2 and "said" in e[2]]
    return list(dict.fromkeys(old + [n[1]["said"] for n in priv.get(qid, []) if "said" in n[1]]))

def topic_priority(row, standing, late, exam_days, force_due):
    due = force_due or standing in ("due", "sweep")
    p = 0.0
    if due:
        p = 100 + (min(L.lateness(row, late), 20) * 5 if (late > 0 and not force_due) else 0)
    p += {"X": 60, "~": 30, "O": 0}.get(row["grade"], 40)
    if exam_days is not None:
        p *= 2 if exam_days <= 7 else 1.5 if exam_days <= 14 else 1.25 if exam_days <= 21 else 1
    return p, due

def question_score(q, hist, nxt, today, rnd):
    """A question's rank inside the pool. Its own Next (quizlib.card_next) decides first (2026-11-06): a question that is
    due outranks a new one, which outranks one asked and not due yet, so a due topic's mastered questions only fill."""
    if not hist:
        s = 100.0
    else:
        d, g = hist[-1]
        due = nxt is None or nxt <= today
        s = (120 if due else 0) + {"X": 40, "~": 20, "O": 0}[g] + min((today - (nxt if due and nxt else d)).days if d else 30, 30)
        s += 10 * sum(1 for _, gg in hist[-3:] if gg == "X")
    pref = L.TYPE_PREF.get(q["course"], [])
    if q["type"] in pref:
        s += (4 - pref.index(q["type"])) * 3
    return s + rnd.uniform(0, 3)

def candidates(fx, state, cal, today, rnd, *, topic_keys=None, everything=False, keep=lambda q: True):
    """([candidate], {row idx: (priority, due, course)}) for the questions `keep` allows. A question of a due topic is
    due while it is new or its own Next has come (2026-11-06): one asked and not due yet waits with the topics ahead, so
    a miss on a sibling never calls it back. A new question of a topic that is not due is `new`: the picker asks it after
    the due ones and before any asked one that is not due yet, so a sibling's success never holds back its first ask."""
    cands, prio = [], {}
    for r in fx["rows"]:
        if topic_keys and not any(k in r["topic"].lower() for k in topic_keys):
            continue
        st, late, _ = fx["standing"][r["idx"]]
        if st == "frozen" and not topic_keys:        # its exam is past and the next one does not cover it
            continue
        if st == "unstudied" and not topic_keys:     # nothing to recall yet: he has not studied that lecture
            continue
        every = fx["by_topic"].get(r["idx"], [])
        qs = [q for q in every if keep(q)]
        if not qs:
            continue
        exam = L.exam_ahead(r, today, cal)          # the boost comes from the first exam ahead that covers the topic
        pr, due = topic_priority(r, st, late, (exam["date"] - today).days if exam else None, everything)
        prio[r["idx"]] = (pr, due, r["course"])
        mine, own = [], False
        ts = L.topic_state(r, every, state, cal)
        first = ts[2] if ts else r["next_date"]     # when an unasked question of it is due (quizlib.row_due)
        for q in every:
            hist, nxt = L.history(state, q), L.card_next(state, q, r, cal)
            if ((nxt if hist else first) or dt.date.max) <= today:
                own = True
            if not keep(q):
                continue
            card_due = everything or not hist or nxt is None or nxt <= today
            mine.append(dict(q=q, row=r, due=due and card_due, new=not hist, topic_due=due, pair=None,
                             score=pr + question_score(q, hist, nxt, today, rnd)))
        # A topic that is due as a whole while none of its questions is due on its own (the exam-week sweep, a row date
        # moved to a lighter day) still gets its best one into the due pool, so the sweep reaches it. Not when another
        # of its questions, one this mode leaves out, is what made it due.
        if due and mine and not any(c["due"] for c in mine) and (st == "sweep" or everything or not own):
            max(mine, key=lambda c: c["score"])["due"] = True
        cands += mine
    return cands, prio

def interleave(cs):
    """Best first, never the same course twice running while another course still has one."""
    by = {}
    for c in sorted(cs, key=lambda c: -c["score"]):
        by.setdefault(c["q"]["course"], []).append(c)
    out, last = [], None
    while any(by.values()):
        live = [k for k, v in by.items() if v]
        pick = max([k for k in live if k != last] or live, key=lambda k: by[k][0]["score"])
        out.append(by[pick].pop(0))
        last = pick
    return out

def review_plan(rows, questions, state, cal, today):
    """routines/review-plan.json, the public plan the website's Review page reads (2026-11-06). It holds nothing that
    ledger.md and quiz-state.json do not already publish: no answer and nothing he wrote.
      rows   each live ledger row's key ("STAT251|<topic>") -> the dates of the exams that cover it, for the exam cap;
             live is studied and not frozen, so the page never brings back a topic the scripts have set aside
      cards  each question of a live row: its id -> its row's key
      queue  the short questions to ask, best first, courses taken in turn: every asked one whose date has come (and a
             sweep topic's best), then the never-asked ones of due topics, then those of the other studied topics. The
             page leaves out any answered since, on any device.
      due    how many of the queue's first entries are due; the rest are new."""
    fx = L.focus(rows, questions, state, today, cal)
    cands, _ = candidates(fx, state, cal, today, random.Random(today.isoformat()), keep=lambda q: not q.get("long"))
    by, _ = L.bank_by_topic(rows, questions)
    plan_rows, cards = {}, {}
    for r in rows:
        if fx["standing"][r["idx"]][0] in ("frozen", "unstudied"):
            continue
        key = f"{r['course']}|{r['topic']}"
        lecs = L.held(r, cal)
        plan_rows[key] = sorted({e["date"].isoformat() for e in cal.get(r["course"], {}).get("exams", [])
                                 if L.covers(e, lecs)})
        for q in by.get(r["idx"], []):
            cards[q["id"]] = key
    due = [c for c in cands if c["due"] and not c["new"]]               # asked before, and its date has come
    new = interleave([c for c in cands if c["new"] and c["topic_due"]]) + interleave(
        [c for c in cands if c["new"] and not c["topic_due"]])          # never asked: a due topic's first
    first = list(dict.fromkeys(c["q"]["id"] for c in interleave(due)))
    queue = list(dict.fromkeys(first + [c["q"]["id"] for c in new]))
    return dict(as_of=today.isoformat(), rows=plan_rows, cards=cards, queue=queue, due=len(first))

def plan_text(rows, questions, state, cal, today):
    return json.dumps(review_plan(rows, questions, state, cal, today), indent=1, ensure_ascii=False) + "\n"

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
    ap.add_argument("--studied", nargs="+", metavar="ARG",
                    help="COURSE LEC [LEC ...]: he has studied these lectures, so their not-studied topics come due today "
                         "(e.g. --studied ASIA250 5 6, or a range 5-7)")
    ap.add_argument("--not-studied", nargs="+", metavar="ARG",
                    help="COURSE LEC [LEC ...]: he has not studied these lectures yet, so their topics leave the queue "
                         "until --studied (narrow to some of a lecture's topics with --topic)")
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

    for f, line, i in L.stamp_ids():     # a question logged since the last run gets its permanent id before it is asked
        print(f"stamped {f}:{line} **Id:** {i}")
    text, rows = L.load_ledger()
    cal = L.load_calendar()
    looks = L.load_lookalikes(rows)      # every mode, so a bad Look-alikes cell stops --due and the 06:35 --transit alike
    deck_md = os.path.join(L.RUNS_DIR, f"{today.isoformat()}-transit.md")
    if a.transit and not a.replace:      # the deck page saves taps under the deck's date, so one deck per date
        if os.path.exists(L.TRANSIT_SESSION):
            with open(L.TRANSIT_SESSION, encoding="utf-8") as f:
                waiting = json.load(f)["date"]
            if waiting != today.isoformat():         # a new deck would strand its taps: nothing could grade them
                raise SystemExit(f"{os.path.relpath(L.TRANSIT_SESSION, L.ROOT)} holds the deck of {waiting}, which is not "
                                 f"closed. Record whatever he tapped first: quiz_grade.py --transit {waiting} "
                                 "\"<its replyString>\" (a partial reply is fine, and cards already recorded are skipped), "
                                 "then run this again with --replace, which files the rest of that deck away unanswered.")
        if os.path.exists(deck_md):                  # graded or not
            raise SystemExit(f"Today's deck ({today.isoformat()}) is already built ({os.path.relpath(deck_md, L.ROOT)}). "
                             "Keep it: a second deck under the same date would mix its taps with the first's. Pass "
                             "--replace only to discard it on purpose.")
    def lecture_rows(args, flag):
        """--studied / --not-studied COURSE LEC [LEC ...]: the course's ledger rows with a lecture in those numbers,
        narrowed by --topic when given."""
        if len(args) < 2:
            ap.error(f"{flag} takes a course and at least one lecture: {flag} ASIA250 5 6")
        code, lecs = args[0].upper().replace(" ", ""), set()
        for tok in args[1:]:
            lo, _, hi = tok.partition("-")
            if not (lo.isdigit() and (not hi or hi.isdigit())):
                ap.error(f"{flag}: '{tok}' is not a lecture number or a range like 5-7")
            lecs.update(range(int(lo), int(hi or lo) + 1))
        keys = [t.lower() for t in a.topic] if a.topic else None
        return code, lecs, [r for r in rows if r["course"] == code and L.lec_span(r["lec"])
                            and lecs & set(range(L.lec_span(r["lec"])[0], L.lec_span(r["lec"])[1] + 1))
                            and (not keys or any(k in r["topic"].lower() for k in keys))]
    if a.not_studied:                    # he has not studied these yet: out of the queue until --studied
        code, lecs, hit = lecture_rows(a.not_studied, "--not-studied")
        if not hit:
            raise SystemExit(f"--not-studied: no {code} topic has a lecture in {sorted(lecs)}; nothing changed")
        for r in hit:
            r["next"], r["next_date"] = L.NOT_STUDIED, None
            print(f"not studied · {r['label']} · Lec {r['lec']} · {r['topic'][:70]}")
    if a.studied:                        # start the schedule of the topics he has now studied: Next = today
        code, lecs, hit = lecture_rows(a.studied, "--studied")
        started = [r for r in hit if r["next"] == L.NOT_STUDIED]
        if not started:
            raise SystemExit(f"--studied: no not-studied {code} topic has a lecture in {sorted(lecs)}; nothing changed")
        for r in started:
            r["next"], r["next_date"] = today.isoformat(), today
            print(f"studied · {r['label']} · Lec {r['lec']} · {r['topic'][:70]} · due today")
    questions = L.load_questions()       # the whole bank, parsed once: readiness counts every course
    scoped = [q for q in questions if not courses or q["course"] in courses]
    state = L.load_state()
    priv = L.load_private()
    L.sync_card_dues(rows, questions, state, cal)   # a topic is due when any one of its asked questions is
    ready = L.readiness(rows, today, cal, state, questions)
    block = L.due_block(rows, today, cal, ready)
    L.write_ledger(L.ledger_text(text, rows, block))    # keep ledger.md's Due-now block truthful on every run
    with open(L.REVIEW_PLAN, "w", encoding="utf-8") as f:   # and the website's Review queue with it
        f.write(plan_text(rows, questions, state, cal, today))

    if a.due or a.studied or a.not_studied:
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
    if a.transit or a.long:              # the bus deck has no room for paper; the Friday set is nothing but
        keep = lambda q: q.get("long") == a.long
    elif a.sprint:                       # which method: short worked problems only, nothing that needs paper
        keep = lambda q: not q["long"] and q["type"] in WORKED_TYPES
    else:
        keep = lambda q: True
    cands, prio = candidates(fx, state, cal, today, rnd, topic_keys=[t.lower() for t in a.topic] if a.topic else None,
                             everything=a.all, keep=keep)
    if not cands:
        print("\n== No questions in the bank for that scope. Log a lecture first.")
        sys.exit(1)

    due_topics = {c["row"]["idx"] for c in cands if c["topic_due"]}
    cap = max(3, math.ceil(n / max(1, len(due_topics) or len({c['row']['idx'] for c in cands}))))
    pool = sorted(cands, key=lambda c: -c["score"])
    due_pool = [c for c in pool if c["due"]]
    new_pool = [c for c in pool if not c["due"] and c["new"]]       # first contact, after the due ones (2026-11-06)
    ahead_pool = sorted((c for c in pool if not c["due"] and not c["new"]),
                        key=lambda c: (c["row"]["next_date"] or dt.date.max, -c["score"]))

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
        # Breadth first (Matt, 2026-11-01): every topic gets one question before any gets a second. Ranking by score
        # alone let each X topic (180) take its 3 slots before any unquizzed topic (160) got one, so a 50-question
        # session asked lectures 15-19 nothing.
        fewest = min(per_topic.get(c["row"]["idx"], 0) for c in ok)
        ok = [c for c in ok if per_topic.get(c["row"]["idx"], 0) == fewest]
        pref = [c for c in ok if c["q"]["course"] != last_course] or ok
        pref = [c for c in pref if c["row"]["idx"] != last_topic] or pref
        c = pref[0]
        take(c)
        # Its look-alike goes right after it: confusable topics side by side beat the same topics apart (Brunmair &
        # Richter 2019). The best eligible question of a paired topic, from the due pool while any due question is
        # left, since not-due topics only fill leftover slots; it counts toward n and pulls no look-alike of its own.
        mates = looks.get(c["row"]["idx"], {})
        left = eligible(due_pool) or eligible(new_pool) or eligible(ahead_pool)
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
    while len(chosen) < n and eligible(new_pool):
        pick_from(eligible(new_pool))
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
    created = dt.datetime.now().astimezone()
    sid = f"{today.isoformat()}-{mode}-{created:%H%M%S}"
    session = dict(id=sid, date=today.isoformat(), created=created.isoformat(timespec="minutes"),
                   mode=mode, courses=courses, n=len(items), items=items, before={})
    session_path = L.TRANSIT_SESSION if a.transit else L.SESSION
    os.makedirs(os.path.dirname(session_path), exist_ok=True)
    if os.path.exists(session_path):     # the open session it replaces: its graded answers are recorded already
        with open(session_path, encoding="utf-8") as f:
            old = json.load(f)
        done = sum(1 for it in old.get("items", []) if it.get("done"))
        if done:
            os.makedirs(L.SESSIONS_DIR, exist_ok=True)
            oid = old.get("id") or f"{old['date']}-{old['mode']}-open"
            with open(os.path.join(L.SESSIONS_DIR, f"{oid}.json"), "w", encoding="utf-8") as f:
                json.dump(old, f, indent=1, ensure_ascii=False)
            print(f"-- The open session {oid} had {done} of {len(old['items'])} answers recorded; it is filed in "
                  f"{os.path.relpath(L.SESSIONS_DIR, L.ROOT)} and the rest stay unasked.")
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
        said = past_wrong(state, priv, it["id"])
        if said:
            print("   Past wrong answers: " + " · ".join(f'"{s}"' for s in said))
    if not a.transit:
        print("\nRecord each answer as soon as it is graded:  quiz_grade.py \"3:O\"   (optional confidence 1–3 and /c f m k s "
              "cause on an X or ~, as in 3:X3/c; a variant takes its question's grade; - skips; --undo N; --finish to stop early)")
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
    # A previous grade may have stopped between output files. Finish it before this writer loads any state.
    import quiz_grade as G
    with G.grade_lock():
        G.recover_transaction(None)
        main()
