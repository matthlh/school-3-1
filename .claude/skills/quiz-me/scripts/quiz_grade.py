#!/usr/bin/env python3
"""Record grades for the pending session and update every SRS store.

Usage:
  quiz_grade.py "1:O3 2:X3/c 3:~2v 4:-"    n:token pairs, always ONE quoted string (- = skipped)
  quiz_grade.py "O3 X1/m ~2"               a bare token sequence, in session order
  quiz_grade.py "1 O 2 ~ 3 X"              a phone reply or the deck page's replyString, pasted verbatim
  quiz_grade.py --transit 2026-10-05 "1 O 2 ~ 3 X"
                                           the transit deck of that date (routines/transit-session.json)
  options: --date YYYY-MM-DD  --dry-run  --transit DECK_DATE | --session PATH  --note "free text for the log"
           --said N "text"   his wrong answer to question N, an X or ~ (repeatable)
           --why N "text"    why he was sure, for question N, an X at confidence 3 (repeatable)

A token is <grade><conf?><v?></cause?>. The grade is O, ~ (p means the same) or X, or - for skipped. conf is 1, 2
or 3, his confidence before he saw the answer. v means it was asked as a live variant. /cause goes on an X or ~ only:
c concept, f forgot, m misread, k careless, s slow. Anything else stops the script before it writes. A history entry
is [date, grade], or [date, grade, extra] when there is more to store; extra holds only the keys given: conf, cause
(the full word), variant (true), said and why.

Each mode refuses the wrong session before writing anything. Plain grading takes routines/quiz-session.json only
when it was picked today (--date sets today), and when there is none it names a pending transit deck. --transit
takes routines/transit-session.json only when it holds the deck of DECK_DATE, the doc_id the deck page saves its
grades under, so taps never land on another deck's questions. --session PATH grades that file with no date check.

Questions not mentioned are left untouched (he stopped early). A topic's session grade is the
WORST grade among its questions this session; the ledger row then moves by the CLAUDE.md ladder
(X → streak 0, +1 d · ~ → +3 d · O → streak+1, +7/+16/+35 d), adjusted by quizlib.next_review:
never later than 4 days before the next exam that covers it, and a gap of 3+ days goes to the
lightest day within ±15% of it. Writes:
  routines/quiz-state.json              per-question history + session record
  ledger.md                             All-topics rows, Due-now block, one Session-log line
  routines/quiz/YYYY-MM-DD.md           the session log (appends on a second session that day)
Then prints the ledger delta, what needs more questions, the share graded O at each confidence (calibration), the
misses by cause with a fix for each (misses_by_cause), and last the notes pages behind the X and ~ grades, grouped by
page with the most misses first (miss_pages). A plain reply, with nothing past its grades, prints neither of the two
middle blocks.
"""
import argparse, datetime as dt, json, os, re, shlex, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import quizlib as L

GRADE = {"o": "O", "x": "X", "~": "~", "p": "~", "-": None}     # a token's first character, any case; - = skipped
# The cause after the slash: the word the history stores and the fix the report gives for it.
CAUSES = {"c": ("concept", "open the notes page listed below and add or rewrite a question on it"),
          "f": ("forgot", "nothing to do, spacing handles it"),
          "m": ("misread", "next time read the stem twice before answering"),
          "k": ("careless", "say each step out loud"),
          "s": ("slow", "a timed drill: quiz_pick.py --sprint for STAT 251, else a timed session")}
CONF = {1: "guess", 2: "think so", 3: "sure"}

def parse_token(tok):
    """One grade token, <grade><conf?><v?></cause?> as in O3, X3/c or ~2v → (grade or None for a skip, extra).
    extra holds only what the token gave: conf, cause (the full word), variant."""
    m = re.fullmatch(r"([ox~p-])(\d*)(v?)(?:/(.*))?", tok.lower())
    if not m:
        raise SystemExit(f"bad grade '{tok}' — a token is O, ~ (or p), X or - (skip), then a confidence 1–3, v for a "
                         "live variant and /cause on an X or ~, each optional and in that order: O3, X3/c, ~2v")
    g, conf, variant, cause = GRADE[m.group(1)], m.group(2), m.group(3), m.group(4)
    if g is None and (conf or variant or cause is not None):
        raise SystemExit(f"bad grade '{tok}' — a skip (-) takes nothing after it")
    if conf and conf not in ("1", "2", "3"):
        raise SystemExit(f"bad grade '{tok}' — confidence {conf}; use 1, 2 or 3")
    if cause is not None and g == "O":
        raise SystemExit(f"bad grade '{tok}' — a cause goes only on an X or ~")
    if cause is not None and cause not in CAUSES:
        raise SystemExit(f"bad grade '{tok}' — '{cause}' is not a cause; use c (concept), f (forgot), m (misread), "
                         "k (careless) or s (slow)")
    extra = {}
    if conf:
        extra["conf"] = int(conf)
    if cause:
        extra["cause"] = CAUSES[cause][0]
    if variant:
        extra["variant"] = True
    return g, extra

def parse_grades(tokens, n_items):
    """n:token pairs (the colon may be a space, as in the deck page's "1 O 2 ~ 3 X"), or a bare token sequence in
    session order. Returns {n: (grade or None, extra)}; parse_token reads each token."""
    flat = []
    for t in tokens:
        flat += re.split(r"[\s,]+", t.strip())
    flat = [x for x in flat if x]
    if any(x.startswith("/") for x in flat):
        raise SystemExit("a token starts with '/' — the shell expanded an unquoted ~ into a path. "
                         "Pass the grades as ONE quoted string, e.g. quiz_grade.py \"1 O 2 ~ 3 X\"")
    out = {}
    if not any(x[0].isdecimal() for x in flat):                        # bare sequence
        out = {k: parse_token(x) for k, x in enumerate(flat, 1)}
    else:
        i = 0
        while i < len(flat):
            m = re.fullmatch(r"(\d+)(?::(.*))?", flat[i])
            if not m:
                raise SystemExit(f"cannot parse '{flat[i]}' — expected n:grade pairs or a bare grade sequence")
            k, tok = int(m.group(1)), m.group(2)
            if tok:
                i += 1
            elif i + 1 < len(flat):
                tok, i = flat[i + 1], i + 2
            else:
                raise SystemExit(f"question {k} has no grade")
            out[k] = parse_token(tok)
    for k in out:
        if not 1 <= k <= n_items:
            raise SystemExit(f"question {k} is not in the session (1–{n_items})")
    return out

def add_notes(marks, said, why):
    """Put each --said and --why text into its question's extra (marks: parse_grades' result). --said goes only on an
    X or ~, --why only on an X at confidence 3, and each at most once per question."""
    for flag, key, pairs in (("--said", "said", said), ("--why", "why", why)):
        for n, text in pairs:
            g, extra = marks.get(int(n), (None, None)) if n.isdecimal() else (None, None)
            if g is None:
                raise SystemExit(f"{flag} {n}: question {n} has no grade in this call")
            if key == "said" and g == "O":
                raise SystemExit(f"{flag} {n}: question {n} is graded O; --said is only for an X or ~")
            if key == "why" and (g != "X" or extra.get("conf") != 3):
                raise SystemExit(f"{flag} {n}: question {n} is not an X at confidence 3; --why is only for a confident miss")
            if key in extra:
                raise SystemExit(f"{flag} {n}: given twice for question {n}")
            if not text.strip():
                raise SystemExit(f"{flag} {n}: the text is empty")
            extra[key] = text.strip()

def calibration(graded, extra):
    """Each confidence level given this session with its answers and the share graded O; [] when none was given."""
    by = {}
    for k, g in graded.items():
        if "conf" in extra.get(k, {}):
            by.setdefault(extra[k]["conf"], []).append(g)
    if not by:
        return []
    out = ["-- Calibration: confidence before the answer → share graded O"]
    for c, gs in sorted(by.items()):
        o = gs.count("O")
        out.append(f"   {c} {CONF[c]} · {len(gs)} answer{'s' if len(gs) != 1 else ''} · {o} O ({round(100 * o / len(gs))}%)")
    return out

def misses_by_cause(graded, extra):
    """The X and ~ grades by cause, each with its question numbers and its fix, then the misses with no cause given.
    [] when nothing was graded X or ~, or when the reply was plain (no token or flag gave more than a grade)."""
    misses = {k: extra.get(k, {}).get("cause") for k, g in sorted(graded.items()) if g != "O"}
    if not misses or not extra:
        return []
    out = ["-- Misses by cause"]
    for word, fix in CAUSES.values():
        ks = [str(k) for k, c in misses.items() if c == word]
        if ks:
            out.append(f"   {word} · {', '.join(ks)} · {fix}")
    bare = [str(k) for k, c in misses.items() if c is None]
    if bare:
        out.append(f"   no cause given · {', '.join(bare)}")
    return out

def miss_pages(items, graded, qsrc=None):
    """Lines naming the notes pages behind the X and ~ grades, grouped by page, most misses first (then most X).
    An item from a session picked before pages were recorded falls back to the bank's mapping (qsrc: id → question)."""
    pages, none = {}, []
    for k, g in sorted(graded.items()):
        if g == "O":
            continue
        it = items[k]
        url, title = it.get("src_url"), it.get("src_title")
        if not url and qsrc and it["id"] in qsrc:
            url, title = qsrc[it["id"]]["src_url"], qsrc[it["id"]]["src_title"]
        if not url:
            none.append(it)
            continue
        p = pages.setdefault(url, dict(label=it["label"], title=title, n=0, x=0))
        p["n"] += 1
        p["x"] += g == "X"
    if not pages and not none:
        return ["-- Pages behind the misses: none"]
    out = ["-- Pages behind the misses (X and ~), most first"]
    for url, p in sorted(pages.items(), key=lambda kv: (-kv[1]["n"], -kv[1]["x"], kv[1]["label"], kv[1]["title"])):
        out.append(f"   {p['label']} {p['title']} ({p['n']} missed): {url}")
    if none:
        tags = ", ".join(sorted({f"{it['label']} {it['lec']}" for it in none}))
        out.append(f"   {len(none)} {'miss has' if len(none) == 1 else 'misses have'} no notes page ({tags}).")
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("grades", nargs="*")
    ap.add_argument("--date")
    ap.add_argument("--dry-run", action="store_true")
    which = ap.add_mutually_exclusive_group()
    which.add_argument("--transit", metavar="DECK_DATE", type=dt.date.fromisoformat,
                       help="grade the transit deck's session, routines/transit-session.json, if it holds this date's deck")
    which.add_argument("--session", help="grade this session file instead, with no date check")
    ap.add_argument("--note", default="")
    ap.add_argument("--said", nargs=2, action="append", default=[], metavar=("N", "TEXT"),
                    help="his wrong answer to question N, an X or ~ (repeatable)")
    ap.add_argument("--why", nargs=2, action="append", default=[], metavar=("N", "TEXT"),
                    help="why he was sure, for question N, an X at confidence 3 (repeatable)")
    a = ap.parse_args()
    today = dt.date.fromisoformat(a.date) if a.date else L.today_local()
    plain = not (a.transit or a.session)          # neither flag: the quiz picked today
    a.session = a.session or (L.TRANSIT_SESSION if a.transit else L.SESSION)
    deck_hint = ""                                # a plain reply may have been meant for the waiting deck
    if plain and os.path.exists(L.TRANSIT_SESSION):
        with open(L.TRANSIT_SESSION, encoding="utf-8") as f:
            deck = json.load(f)["date"]
        deck_hint = (f". The transit deck of {deck} is waiting in {os.path.relpath(L.TRANSIT_SESSION, L.ROOT)}; "
                     f"if these are its grades, run: quiz_grade.py --transit {deck} {shlex.join(sys.argv[1:])}")
    if not os.path.exists(a.session):
        raise SystemExit(f"no pending session in {os.path.relpath(a.session, L.ROOT)}"
                         + (deck_hint or f" — run quiz_pick.py{' --transit' if a.transit else ''} first"))
    with open(a.session, encoding="utf-8") as f:
        session = json.load(f)
    if a.transit and session["date"] != a.transit.isoformat():
        raise SystemExit(f"{os.path.relpath(a.session, L.ROOT)} holds the deck of {session['date']}, not {a.transit} — "
                         "grading would put these grades on the wrong questions")
    if plain and session["date"] != today.isoformat():
        raise SystemExit(f"{os.path.relpath(a.session, L.ROOT)} is from {session['date']} and was never graded — "
                         f"grade it as that day with --date {session['date']}, or pick a new session" + deck_hint)
    items = {it["n"]: it for it in session["items"]}
    marks = parse_grades(a.grades, len(items))
    add_notes(marks, a.said, a.why)
    graded = {k: g for k, (g, _) in marks.items() if g}
    extra = {k: x for k, (g, x) in marks.items() if g and x}
    if not graded:
        raise SystemExit("nothing graded")

    text, rows = L.load_ledger()
    L.session_log_end(text.split("\n"))      # exits here if ledger.md has no Session log table, before anything is written
    state = L.load_state()
    questions = L.load_questions()
    qsrc = {q["id"]: q for q in questions}
    cal = L.load_calendar()

    # ---- per-question history
    for k, g in graded.items():
        it = items[k]
        rec = state["questions"].setdefault(it["id"], dict(course=it["course"], topic=it["topic_tag"], history=[]))
        rec["topic"] = it["topic_tag"]
        rec["history"].append([today.isoformat(), g] + ([extra[k]] if k in extra else []))
    state["sessions"].append(dict(date=today.isoformat(), mode=session["mode"], n=len(graded), note=a.note,
                                  results=[[k, items[k]["id"], items[k]["course"], g] for k, g in sorted(graded.items())]))

    # ---- topic grades = worst of the session
    per_topic, lost = {}, []
    for k, g in graded.items():
        it = items[k]
        r = L.match_topic(it["course"], it["topic_tag"], rows)
        if r is None:
            lost.append((it, g)); continue
        cur = per_topic.get(r["idx"])
        per_topic[r["idx"]] = g if cur is None or L.GRADE_RANK[g] < L.GRADE_RANK[cur] else cur
    delta = []
    for r in rows:
        if r["idx"] not in per_topic:
            continue
        g = per_topic[r["idx"]]
        streak, days = L.next_after(g, r["streak"])
        nxt, why = L.next_review(r, days, today, rows, cal)
        old = (r["grade"] or "—", r["streak"], r["next"])
        r.update(last=today.isoformat(), grade=g, streak=streak, next=nxt.isoformat(), next_date=nxt)
        delta.append((r, old, f"+{(nxt - today).days} d" + (f"; {why}" if why else "")))

    # ---- session log + ledger session-log line
    counts = {g: sum(1 for x in graded.values() if x == g) for g in L.GRADES}
    labels = sorted({items[k]["label"] for k in graded})
    log_line = (f"| {today.isoformat()} | Quiz ({session['mode']}): {len(graded)} q · "
                f"{counts['O']} O / {counts['~']} ~ / {counts['X']} X · {', '.join(labels)} · "
                f"{len(delta)} ledger rows moved{' · ' + a.note if a.note else ''} |")
    stamp = dt.datetime.now().astimezone().strftime("%H:%M")
    log = [f"## {stamp} · {session['mode']} · {len(graded)} q · {counts['O']} O / {counts['~']} ~ / {counts['X']} X"
           + (f" · {a.note}" if a.note else ""), "", "| # | Course | Topic | Type | Grade |", "|---|---|---|---|---|"]
    for k, g in sorted(graded.items()):
        it = items[k]
        log.append(f"| {k} | {it['label']} | {it['topic_tag']} | {it['type']} | {g} |")
    misses = [(k, g) for k, g in sorted(graded.items()) if g != "O"]
    if misses:
        log += ["", "**Misses**"]
        for k, g in misses:
            it = items[k]
            log.append(f"- [{g}] {it['q']}")
            log.append(f"  - {it['a'].splitlines()[0] if it['a'] else '(no answer recorded)'}")
    log += ["", "**Ledger**"]
    for r, old, when in delta:
        log.append(f"- {r['label']} · {r['topic']} · {old[0]}→{r['grade']} · streak {old[1]}→{r['streak']} · next {r['next']} ({when})")
    log.append("")

    if a.dry_run:
        print("DRY RUN — nothing written\n")
    else:
        L.save_state(state)
        L.write_ledger(text, rows, today, cal, log_line=log_line)
        os.makedirs(L.QUIZ_DIR, exist_ok=True)
        path = os.path.join(L.QUIZ_DIR, f"{today.isoformat()}.md")
        new = not os.path.exists(path)
        with open(path, "a", encoding="utf-8") as f:
            f.write(("" if not new else f"# Quiz log — {today:%a %Y-%m-%d}\n\n") + "\n".join(log) + "\n")
        os.remove(a.session)

    # ---- report
    print(f"== GRADED {len(graded)} of {len(items)} · {counts['O']} O / {counts['~']} ~ / {counts['X']} X")
    print("-- Ledger delta")
    for r, old, when in delta:
        print(f"   {r['label']} · {r['topic'][:55]} · {old[0]}→{r['grade']} · streak {r['streak']} · next {r['next']} ({when})")
    fx = L.focus(rows, questions, state, today, cal)
    for line in L.unmatched_block(fx["unmatched"], lost):
        print(line)
    if fx["needs_more"] or fx["leeches"] or fx["empty"]:
        print("-- Needs more questions (write them now, tagged with the same **Topic:**):")
        for r, k in fx["needs_more"]:
            print(f"   {r['label']} · {r['topic'][:60]} · {r['grade']} with {k} q → write {L.MIN_QUESTIONS_PER_TOPIC - k}+ aimed at the miss")
        for r in fx["empty"]:
            print(f"   {r['label']} · {r['topic'][:60]} · no questions at all")
        for q in fx["leeches"]:
            print(f"   LEECH {L.COURSE_LABEL[q['course']]} · {q['q'][:70]}… → rewrite or split into 2")
    else:
        print("-- Needs more questions: none")
    for line in L.due_block(rows, today, cal) + calibration(graded, extra) + misses_by_cause(graded, extra):
        print(line)
    for line in miss_pages(items, graded, qsrc):
        print(line)

if __name__ == "__main__":
    main()
