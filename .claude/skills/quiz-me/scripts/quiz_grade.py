#!/usr/bin/env python3
"""Record grades for the pending session and update every SRS store, one answer at a time if need be.

Usage:
  quiz_grade.py "3:O3"                     record question 3 the moment it is graded (the usual call, once per answer)
  quiz_grade.py "1:O3 2:X3/c 3:~2/m 4:-"   several at once: n:token pairs, always ONE quoted string (- = skipped)
  quiz_grade.py "O3 X1/m ~2"               a bare token sequence, in session order
  quiz_grade.py "1 O 2 ~ 3 X"              a phone reply or the deck page's replyString, pasted verbatim
  quiz_grade.py --transit 2026-10-05 "1 O 2 ~ 3 X"
                                           the transit deck of that date (routines/transit-session.json)
  quiz_grade.py --finish                   close the session early (he stopped) and print the full report
  quiz_grade.py --undo 3                   take back question 3's recorded grade (this session, or the last finished one)
  options: --date YYYY-MM-DD  --dry-run  --transit DECK_DATE | --session PATH  --note "free text for the log"
           --said N "text"   his wrong answer to question N, an X or ~ (repeatable)
           --why N "text"    why he was sure, for question N, an X at confidence 3 (repeatable)

A token is <grade><conf?></cause?>. The grade is O, ~ (p means the same) or X, or - for skipped. conf is 1, 2 or 3,
his confidence before he saw the answer, and optional: never ask for it. /cause goes on an X or ~ only, also optional:
c concept, f forgot, m misread, k careless, s slow. An O given at confidence 1 or 2 is a Good: right, but he was not
sure, so its topic's streak holds at its rung instead of climbing (Matt, 2026-11-01). An O at 3, or with no confidence,
is an Easy and climbs. A live variant takes its question's grade. A question number given twice, or anything else
malformed, stops the script before it writes.

Saving (2026-11-06). Each call records its answers at once: the history entry, the ledger row, the Session-log line
and the quiz log. The item is marked `done` in the session file, which stays until every item is done (or --finish),
so a quiz that stops halfway has lost nothing, and the rest can be graded later. Grading a done item again with the
same token is a no-op, so a retry or a re-sent reply never counts twice; a different token stops and points at --undo.
A topic's session grade is the WORST grade among its done questions this session, applied to the row as it stood
before the session (kept in the session file as `before`), so recording answers one at a time moves a row exactly as
recording them together would. The ladder (X → streak 0, +1 d · ~ → +3 d · O → streak+1, +7/+16/+35 d) is adjusted by
quizlib.next_review (never later than exam_cap; a gap of 3+ days goes to the lightest day within ±15%), then pulled
forward to the earliest Next of the topic's asked questions (quizlib.sync_card_dues: each question keeps its own
place on the ladder). His wrong answers (--said) and reasons (--why) go to the git-ignored routines/quiz-private.json,
never to the public quiz-state.json.

Each mode refuses the wrong session before writing anything. Plain grading takes routines/quiz-session.json only
when it was picked today (--date sets today), and when there is none it names a pending transit deck. --transit
takes routines/transit-session.json only when it holds the deck of DECK_DATE, the doc_id the deck page saves its
grades under, so taps never land on another deck's questions. --session PATH grades that file with no date check.
Each graded question counts for the ledger row of the topic stored in the session when it was picked
(quizlib.match_topic on the item's `topic`), so retagging the bank after the pick changes nothing. Everything is built
in memory first, every check included, so a stop writes nothing. Then it writes:
  routines/quiz-state.json              per-question history + one record per session (its id)
  routines/quiz-private.json            his wrong answers and reasons
  ledger.md                             All-topics rows, Due-now block, the session's one Session-log line
  routines/quiz/YYYY-MM-DD.md           the session log (a section per call)
  the session file                      done items; moved to routines/quiz/sessions/<id>.json once finished
A call that leaves items undone prints a short line per answer. A finished session prints the full report: the
ledger delta, what needs more questions, the Due-now block, calibration when confidences were given, misses by cause
when causes were given, confident misses, and last the notes pages behind the X and ~ grades.
Record grades for the pending session and update every SRS store, one answer at a time if need be.

Usage:
  quiz_grade.py "3:O3"                     record question 3 the moment it is graded (the usual call, once per answer)
  quiz_grade.py "1:O3 2:X3/c 3:~2/m 4:-"   several at once: n:token pairs, always ONE quoted string (- = skipped)
  quiz_grade.py "O3 X1/m ~2"               a bare token sequence, in session order
  quiz_grade.py "1 O 2 ~ 3 X"              a phone reply or the deck page's replyString, pasted verbatim
  quiz_grade.py --transit 2026-10-05 "1 O 2 ~ 3 X"
                                           the transit deck of that date (routines/transit-session.json)
  quiz_grade.py --finish                   close the session early (he stopped) and print the full report
  quiz_grade.py --undo 3                   take back question 3's recorded grade (this session, or the last finished one)
  options: --date YYYY-MM-DD  --dry-run  --transit DECK_DATE | --session PATH  --note "free text for the log"
           --said N "text"   his wrong answer to question N, an X or ~ (repeatable)
           --why N "text"    why he was sure, for question N, an X at confidence 3 (repeatable)

A token is <grade><conf?></cause?>. The grade is O, ~ (p means the same) or X, or - for skipped. conf is 1, 2 or 3,
his confidence before he saw the answer, and optional: never ask for it. /cause goes on an X or ~ only, also optional:
c concept, f forgot, m misread, k careless, s slow. An O given at confidence 1 or 2 is a Good: right, but he was not
sure, so its topic's streak holds at its rung instead of climbing (Matt, 2026-11-01). An O at 3, or with no confidence,
is an Easy and climbs. A live variant takes its question's grade. A question number given twice, or anything else
malformed, stops the script before it writes.

Saving (2026-11-06). Each call records its answers at once: the history entry, the ledger row, the Session-log line
and the quiz log. The item is marked `done` in the session file, which stays until every item is done (or --finish),
so a quiz that stops halfway has lost nothing, and the rest can be graded later. Grading a done item again with the
same token is a no-op, so a retry or a re-sent reply never counts twice; a different token stops and points at --undo.
A topic's session grade is the WORST grade among its done questions this session, applied to the row as it stood
before the session (kept in the session file as `before`), so recording answers one at a time moves a row exactly as
recording them together would. The ladder (X → streak 0, +1 d · ~ → +3 d · O → streak+1, +7/+16/+35 d) is adjusted by
quizlib.next_review (never later than exam_cap; a gap of 3+ days goes to the lightest day within ±15%), then pulled
forward to the earliest Next of the topic's asked questions (quizlib.sync_card_dues: each question keeps its own
place on the ladder). His wrong answers (--said) and reasons (--why) go to the git-ignored routines/quiz-private.json,
never to the public quiz-state.json.

Each mode refuses the wrong session before writing anything. Plain grading takes routines/quiz-session.json only
when it was picked today (--date sets today), and when there is none it names a pending transit deck. --transit
takes routines/transit-session.json only when it holds the deck of DECK_DATE, the doc_id the deck page saves its
grades under, so taps never land on another deck's questions. --session PATH grades that file with no date check.
Each graded question counts for the ledger row of the topic stored in the session when it was picked
(quizlib.match_topic on the item's `topic`), so retagging the bank after the pick changes nothing. Everything is built
in memory first, every check included, so a stop writes nothing. Then it writes:
  routines/quiz-state.json              per-question history + one record per session (its id)
  routines/quiz-private.json            his wrong answers and reasons
  ledger.md                             All-topics rows, Due-now block, the session's one Session-log line
  routines/quiz/YYYY-MM-DD.md           the session log (a section per call)
  the session file                      done items; moved to routines/quiz/sessions/<id>.json once finished
A call that leaves items undone prints a short line per answer. A finished session prints the full report: the
ledger delta, what needs more questions, the Due-now block, calibration when confidences were given, misses by cause
when causes were given, confident misses, and last the notes pages behind the X and ~ grades.
"""
import argparse, datetime as dt, glob, json, os, re, shlex, sys

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
    """One grade token, <grade><conf?></cause?> as in O3, X3/c or ~2/m → (grade or None for a skip, extra).
    extra holds only what the token gave: conf and cause (the full word)."""
    m = re.fullmatch(r"([ox~p-])(\d*)(?:/(.*))?", tok.lower())
    if not m:
        raise SystemExit(f"bad grade '{tok}' — a token is O, ~ (or p), X or - (skip), then a confidence 1–3 and /cause "
                         "on an X or ~, each optional and in that order: O3, X3/c, ~2/m")
    g, conf, cause = GRADE[m.group(1)], m.group(2), m.group(3)
    if g is None and (conf or cause is not None):
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
    return g, extra

def parse_grades(tokens, n_items):
    """n:token pairs (the colon may be a space, as in the deck page's "1 O 2 ~ 3 X"), or a bare token sequence in
    session order. Returns {n: (grade or None, extra)}; parse_token reads each token. Stops on a number given twice."""
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
            if k in out:
                raise SystemExit(f"question {k} is graded twice — give each question one grade")
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
        out.append(f"   {c} {CONF[c]} · {len(gs)} answer{'s' if len(gs) != 1 else ''} · {o} O ({L.pct(o, len(gs))}%)")
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

def confident_misses(items, graded, extra):
    """Each X given at confidence 3 with why he was sure (--why), the beliefs to correct first. [] when there is none."""
    ks = [k for k, g in sorted(graded.items()) if g == "X" and extra.get(k, {}).get("conf") == 3]
    if not ks:
        return []
    out = ["-- Confident misses (X at confidence 3) and why he was sure"]
    for k in ks:
        why = extra[k].get("why")
        out.append(f"   {k} · {items[k]['label']} · {items[k]['topic_tag'][:50]} · " + (f'"{why}"' if why else "no reason given"))
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

def ikey(it):
    """A session item's ledger key: its course and the ledger topic stored when it was picked. The session's `before`
    and `after` snapshots are keyed by it, so a row retitled since the pick keeps its baseline."""
    return f"{it['course']}|{it['topic']}"

def snapshot(r):
    return dict(last=r["last"], grade=r["grade"], streak=r["streak"], next=r["next"])

def restore(r, snap):
    r.update(last=snap["last"], grade=snap["grade"], streak=snap["streak"], next=snap["next"],
             next_date=L.parse_date(snap["next"]))

def load_json(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)

def same_file(p, q):
    return os.path.realpath(p) == os.path.realpath(q)

def pending_for(session):
    return L.TRANSIT_SESSION if session["mode"] == "transit" else L.SESSION

def filed(pred):
    """Sessions filed in routines/quiz/sessions/ that pred accepts, newest first, as (path, session)."""
    out = []
    for p in sorted(glob.glob(os.path.join(L.SESSIONS_DIR, "*.json")), key=os.path.getmtime, reverse=True):
        try:
            s = load_json(p)
        except (OSError, ValueError):
            continue
        if pred(s):
            out.append((p, s))
    return out

def normalise(session):
    session.setdefault("id", f"{session['date']}-{session['mode']}-{session.get('created', '')[11:16].replace(':', '')}")
    session.setdefault("before", {})
    session.setdefault("after", {})
    session.setdefault("base", {})
    session.setdefault("seq", max([it["done"].get("seq", 0) for it in session["items"] if it.get("done")], default=0))
    return session

def find_session(a, today):
    """(path, session, filed) for this call. filed: the session came from routines/quiz/sessions/ (closed).
      plain      routines/quiz-session.json, picked today (--date sets today). With --undo and none pending, the latest
                 filed session that is not a transit deck, which the undo reopens.
      --transit  routines/transit-session.json when it holds that date's deck, else the filed deck of that date (a deck
                 that --replace filed away can still take the taps it never got recorded).
      --session  that file, but the pending or filed copy of the same session id when one exists, since that copy
                 knows which answers are already recorded."""
    plain = not (a.transit or a.session)
    deck_hint = ""
    if plain and os.path.exists(L.TRANSIT_SESSION):
        deck = load_json(L.TRANSIT_SESSION)["date"]
        deck_hint = (f". The transit deck of {deck} is waiting in {os.path.relpath(L.TRANSIT_SESSION, L.ROOT)}; "
                     f"if these are its grades, run: quiz_grade.py --transit {deck} {shlex.join(sys.argv[1:])}")
    if a.transit:
        want = a.transit.isoformat()
        if os.path.exists(L.TRANSIT_SESSION):
            s = load_json(L.TRANSIT_SESSION)
            if s["date"] == want:
                return L.TRANSIT_SESSION, normalise(s), False
        old = filed(lambda s: s.get("mode") == "transit" and s.get("date") == want)
        if old:
            return old[0][0], normalise(old[0][1]), True
        if os.path.exists(L.TRANSIT_SESSION):
            raise SystemExit(f"{os.path.relpath(L.TRANSIT_SESSION, L.ROOT)} holds the deck of {load_json(L.TRANSIT_SESSION)['date']}, "
                             f"not {want}, and no deck of {want} is filed — grading would put these grades on the wrong questions")
        raise SystemExit(f"no deck of {want}, pending or filed — run quiz_pick.py --transit first")
    if a.session:
        s = normalise(load_json(a.session))
        for p in (pending_for(s), os.path.join(L.SESSIONS_DIR, f"{s['id']}.json")):
            if os.path.exists(p) and not same_file(p, a.session) and load_json(p).get("id") == s["id"]:
                print(f"-- using {os.path.relpath(p, L.ROOT)}, the copy of session {s['id']} that knows what is recorded")
                return p, normalise(load_json(p)), p.startswith(L.SESSIONS_DIR)
        return a.session, s, a.session.startswith(L.SESSIONS_DIR)
    if not os.path.exists(L.SESSION) and a.undo is not None:
        old = filed(lambda s: s.get("mode") != "transit")
        if old:
            return old[0][0], normalise(old[0][1]), True
    if not os.path.exists(L.SESSION):
        raise SystemExit(f"no pending session in {os.path.relpath(L.SESSION, L.ROOT)}" + (deck_hint or " — run quiz_pick.py first"))
    session = normalise(load_json(L.SESSION))
    if session["date"] != today.isoformat() and a.undo is None:
        raise SystemExit(f"{os.path.relpath(L.SESSION, L.ROOT)} is from {session['date']} and has questions not graded yet "
                         f"— grade them as that day with --date {session['date']}, or pick a new session" + deck_hint)
    return L.SESSION, session, False

def first_point(a):
    """The core of an answer for the session log: its key's first numbered point, else its first line."""
    for line in (a or "").splitlines():
        m = re.match(r"\s*\d+\.\s+(.*)", line)
        if m:
            return m.group(1)
    return (a or "(no answer recorded)").splitlines()[0]

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("grades", nargs="*")
    ap.add_argument("--date")
    ap.add_argument("--dry-run", action="store_true")
    which = ap.add_mutually_exclusive_group()
    which.add_argument("--transit", metavar="DECK_DATE", type=dt.date.fromisoformat,
                       help="grade the transit deck of this date: routines/transit-session.json, else the filed deck")
    which.add_argument("--session", help="grade this session file instead, with no date check")
    ap.add_argument("--note", default="")
    ap.add_argument("--finish", action="store_true", help="close the session now, undone items left ungraded")
    ap.add_argument("--undo", type=int, metavar="N", help="take back question N's recorded grade")
    ap.add_argument("--said", nargs=2, action="append", default=[], metavar=("N", "TEXT"),
                    help="his wrong answer to question N, an X or ~ (repeatable)")
    ap.add_argument("--why", nargs=2, action="append", default=[], metavar=("N", "TEXT"),
                    help="why he was sure, for question N, an X at confidence 3 (repeatable)")
    a = ap.parse_args()
    today = dt.date.fromisoformat(a.date) if a.date else L.today_local()
    path, session, was_filed = find_session(a, today)
    reopen = was_filed and a.undo is not None
    if reopen and os.path.exists(pending_for(session)) and load_json(pending_for(session)).get("id") != session["id"]:
        raise SystemExit(f"--undo would reopen session {session['id']}, but {os.path.relpath(pending_for(session), L.ROOT)} "
                         "holds another open session; finish that one first (quiz_grade.py --finish)")
    items = {it["n"]: it for it in session["items"]}
    marks = parse_grades(a.grades, len(items)) if a.grades else {}
    add_notes(marks, a.said, a.why)
    if a.undo is not None and marks:
        raise SystemExit("--undo takes no grades; undo first, then grade again")
    if a.undo is not None and not ((items.get(a.undo) or {}).get("done") or {}).get("grade"):
        raise SystemExit(f"question {a.undo} has no recorded grade in session {session['id']}")
    if not marks and a.undo is None and not a.finish:
        raise SystemExit("nothing graded")

    text, rows = L.load_ledger()
    state = L.load_state()
    priv = L.load_private()
    questions = L.load_questions()
    qsrc = {q["id"]: q for q in questions}
    cal = L.load_calendar()
    stamp = dt.datetime.now().astimezone().strftime("%H:%M")

    # Answers this session already recorded through another copy of its file (an artifact's session.json, say) count as
    # recorded too: quiz-state.json's record of the session id lists them.
    rec_s = next((s for s in state["sessions"] if s.get("id") == session["id"]), None)
    if rec_s:
        known = {r[0]: r[3] for r in rec_s.get("results", [])}
        for k, g in known.items():
            if k in items and not items[k].get("done"):
                raise SystemExit(f"session {session['id']} already has question {k} recorded as {g} in quiz-state.json, "
                                 f"but {os.path.relpath(path, L.ROOT)} does not know it. Grade from the copy that does "
                                 f"({os.path.relpath(pending_for(session), L.ROOT)} or routines/quiz/sessions/{session['id']}.json).")

    # Already-recorded items: the same token again is a no-op (a retry, a re-sent deck reply), and a --said or --why sent
    # with it is still kept; another token stops. On the deck page he can re-tick a card after the morning check recorded
    # it, or flag it: there the page's latest grade replaces the record. Anywhere else a changed grade stops, so a typo
    # cannot rewrite history. A skip (-) is recorded as done with no grade, so the session can close.
    fresh, repeat, redo, late_notes = {}, [], [], {}
    for k, (g, x) in marks.items():
        d = items[k].get("done")
        if d:
            same = d.get("grade") == g and (g is None or (d.get("extra", {}).get("conf") == x.get("conf")
                                                          and d.get("extra", {}).get("cause") == x.get("cause")))
            if same:
                repeat.append(k)
                note = {key: v for key, v in x.items() if key in ("said", "why")}
                if note and not d.get("private"):
                    late_notes[k] = note
                continue
            if not a.transit:
                raise SystemExit(f"question {k} is already recorded as {d.get('grade') or 'skipped'}"
                                 f"{d.get('extra', {}).get('conf', '')} ({d['at']}); to change it run quiz_grade.py "
                                 f"--undo {k} first, then grade it again")
            if d.get("grade"):
                redo.append(k)
        fresh[k] = (g, x)

    def row_of(it, k):
        return L.match_topic(it["course"], it["topic"], rows, f"{it['file']}:{it['line']}: question {k}'s ledger topic at pick time")
    lost = [items[k] for k, (g, _) in fresh.items() if g and row_of(items[k], k) is None]
    if lost:
        raise SystemExit("These questions' ledger topics, stored when the session was picked, name no ledger row now, so "
                         "their grades cannot move the ledger. Nothing was written. Make a ledger row match each one (fix "
                         "the row's topic or add the row), then run this again:\n"
                         + "\n".join(f"   question {it['n']} · {it['label']} · '{it['topic']}' · {it['file']}:{it['line']}"
                                     for it in lost))
    if rec_s is None:
        rec_s = dict(id=session["id"], date=today.isoformat(), mode=session["mode"], n=0, note=a.note, results=[])
        state["sessions"].append(rec_s)
    if a.note:
        rec_s["note"] = a.note
    touched, warnings = set(), []

    # ---- a row another session moved since this one last wrote it: its current state becomes the baseline, and only
    # the answers recorded from now on are applied to it (else rebuilding from `before` would erase that session's grade)
    def rebase_if_moved(k, r):
        if k in session["after"] and snapshot(r) != session["after"][k]:
            session["before"][k] = session["after"][k] = snapshot(r)
            session["base"][k] = session["seq"] + 1
            return True
        return False

    # ---- undo (asked for, or a deck card re-ticked or flagged): drop the entry, reopen the item
    for u in ([a.undo] if a.undo is not None else []) + redo:
        it = items[u]
        d = it.pop("done")
        hist = state["questions"].get(it["id"], {}).get("history", [])
        for i in range(len(hist) - 1, -1, -1):
            if hist[i] == d["entry"]:
                del hist[i]
                break
        if d.get("private"):
            notes = priv.get(it["id"], [])
            for i in range(len(notes) - 1, -1, -1):
                if notes[i] == d["private"]:
                    del notes[i]
                    break
        rec_s["results"] = [r for r in rec_s["results"] if r[0] != u]
        r = row_of(it, u)
        if r is not None:
            if rebase_if_moved(ikey(it), r):
                warnings.append(f"-- question {u}: its row was moved by another session since, so the undo took back the "
                                "answer's history entry but left the row as that session set it")
            else:
                touched.add(ikey(it))
        print(f"{'undone' if u == a.undo else 'changed on the deck page'} · question {u} · {it['label']} · "
              f"{it['topic_tag'][:50]} · was {d['grade']}" + (f", now {fresh[u][0] or 'not graded'}" if u in fresh else ""))

    # ---- the fresh answers: history entry, private notes, done mark
    for k, (g, x) in sorted(fresh.items()):
        it = items[k]
        if g is None:                                    # skipped or flagged: counts for closing, never for the ledger
            session["seq"] += 1
            it["done"] = dict(grade=None, at=f"{today.isoformat()} {stamp}", seq=session["seq"])
            continue
        r = row_of(it, k)
        key = ikey(it)
        rebase_if_moved(key, r)                          # before this answer's seq, so it counts after a rebase
        session["seq"] += 1
        session["before"].setdefault(key, snapshot(r))
        touched.add(key)
        rec = state["questions"].setdefault(it["id"], dict(course=it["course"], topic=it["topic_tag"], history=[]))
        rec["topic"] = it["topic_tag"]
        public = {key2: v for key2, v in x.items() if key2 in ("conf", "cause")}
        entry = [today.isoformat(), g] + ([public] if public else [])
        rec["history"].append(entry)
        done = dict(grade=g, extra=public, at=f"{today.isoformat()} {stamp}", entry=entry, seq=session["seq"])
        note = {key2: v for key2, v in x.items() if key2 in ("said", "why")}
        if note:
            done["private"] = [today.isoformat(), note]
            priv.setdefault(it["id"], []).append(done["private"])
        it["done"] = done
        rec_s["results"].append([k, it["id"], it["course"], g])
    for k, note in late_notes.items():                   # a note sent after its grade was recorded
        d, it = items[k]["done"], items[k]
        d["private"] = [d["at"][:10], note]
        priv.setdefault(it["id"], []).append(d["private"])
    rec_s["n"] = len(rec_s["results"])

    # ---- the touched rows, rebuilt from their baseline and the answers recorded since, as of the day of the latest one
    delta, moved = [], set()
    for key in sorted(touched):
        if key not in session["before"]:
            continue
        holder = next(it for it in items.values() if ikey(it) == key)
        r = row_of(holder, holder["n"])
        if r is None:
            warnings.append(f"-- {holder['label']} '{holder['topic'][:50]}' names no ledger row now; its row was not moved")
            continue
        snap = session["before"][key]
        restore(r, snap)
        dones = [it["done"] for it in items.values() if ikey(it) == key and (it.get("done") or {}).get("grade")
                 and it["done"].get("seq", 0) >= session["base"].get(key, 0)]
        if not dones:                         # every answer of this row was undone: the row is as it was
            delta.append((r, (snap["grade"] or "—", snap["streak"], snap["next"]), "restored"))
            session["after"][key] = snapshot(r)
            continue
        g = min((d["grade"] for d in dones), key=lambda v: L.GRADE_RANK[v])
        good = g == "O" and any(d["extra"].get("conf") in (1, 2) for d in dones)
        day = max(dt.date.fromisoformat(d["at"][:10]) for d in dones)
        streak, days = L.next_after(g, r["streak"], good=good)
        nxt, why = L.next_review(r, days, day, rows, cal)
        r.update(last=day.isoformat(), grade=g, streak=streak, next=nxt.isoformat(), next_date=nxt)
        moved.add(r["idx"])
        delta.append((r, (snap["grade"] or "—", snap["streak"], snap["next"]), f"+{(nxt - day).days} d" + (f"; {why}" if why else "")))
    for r in L.sync_card_dues(rows, questions, state, cal, only=moved):
        for i, (dr, old, when) in enumerate(delta):
            if dr is r:
                delta[i] = (dr, old, f"{when}; a question of it is due {r['next']}")
    for key in touched:
        holder = next(it for it in items.values() if ikey(it) == key)
        r = row_of(holder, holder["n"])
        if r is not None:
            session["after"][key] = snapshot(r)

    # ---- the session's totals so far, and its one Session-log line (replaced in place as answers come in)
    graded = {k: it["done"]["grade"] for k, it in items.items() if (it.get("done") or {}).get("grade")}
    extra = {k: {**it["done"]["extra"], **(it["done"].get("private", [None, {}])[1])} for k, it in items.items()
             if k in graded and (it["done"]["extra"] or it["done"].get("private"))}
    finished = a.finish or all(it.get("done") for it in items.values())
    counts = {g: sum(1 for x in graded.values() if x == g) for g in L.GRADES}
    labels = sorted({items[k]["label"] for k in graded})
    log_line = (f"| {today.isoformat()} | Quiz ({session['mode']}): "
                f"{len(graded)} q · {counts['O']} O / {counts['~']} ~ / {counts['X']} X · {', '.join(labels)} · "
                f"{len({ikey(items[k]) for k in graded})} ledger rows moved"
                f"{' · ' + rec_s['note'] if rec_s.get('note') else ''} |") if graded else None
    block = L.due_block(rows, today, cal, L.readiness(rows, today, cal, state, questions))
    ledger = L.ledger_text(text, rows, block, log_line, replace=session.get("log_line"))
    session["log_line"] = log_line
    if not graded:
        state["sessions"] = [s for s in state["sessions"] if s is not rec_s]

    # ---- this call's section of the session log
    log = []
    real = {k: g for k, (g, _) in fresh.items() if g}
    if real or a.undo is not None:
        log = [f"## {stamp} · {session['mode']} · session {session['id']} · " + (
            f"{len(real)} recorded" if real else f"question {a.undo} undone")
            + (f" · {a.note}" if a.note else ""), ""]
        if real:
            log += ["| # | Course | Topic | Type | Grade |", "|---|---|---|---|---|"]
            for k, g in sorted(real.items()):
                it = items[k]
                log.append(f"| {k} | {it['label']} | {it['topic_tag']} | {it['type']} | {g} |")
            misses = [(k, g) for k, g in sorted(real.items()) if g != "O"]
            if misses:
                log += ["", "**Misses**"]
                for k, g in misses:
                    it = items[k]
                    log.append(f"- [{g}] {it['q']}")
                    log.append(f"  - {first_point(it['a'])}")
        log += ["", "**Ledger**"] + [f"- {r['label']} · {r['topic']} · {old[0]}→{r['grade'] or '—'} · streak {old[1]}→{r['streak']} · "
                                     f"next {r['next']} ({when})" for r, old, when in delta] + [""]

    # ---- the report: short while the session is open, full when it finishes
    report = list(warnings)
    for k in repeat:
        d = items[k]["done"]
        report.append(f"-- question {k} was already recorded as {d.get('grade') or 'skipped'}; not counted again"
                      + ("; the note sent with it is now kept" if k in late_notes else ""))
    if was_filed and not reopen:
        report.append(f"-- session {session['id']} was already closed (filed); the answers above are recorded in it. "
                      "Its deck page doc can be marked processed.")
    if not finished:
        for k, (g, _) in sorted(fresh.items()):
            if g is None:
                report.append(f"recorded {k}: skipped (not graded)")
                continue
            r = row_of(items[k], k)
            report.append(f"recorded {k}: {g} · {items[k]['label']} · {items[k]['topic_tag'][:50]} · row next {r['next']}")
        report.append(f"-- session {session['id']}: {len(graded)} of {len(items)} recorded; nothing more to save. "
                      "Grade the next one the same way, or --finish to close it early.")
    else:
        report += [f"== GRADED {len(graded)} of {len(items)} · {counts['O']} O / {counts['~']} ~ / {counts['X']} X"
                   f" · session {session['id']} closed", "-- Ledger delta (this call)"]
        for r, old, when in delta:
            report.append(f"   {r['label']} · {r['topic'][:55]} · {old[0]}→{r['grade'] or '—'} · streak {r['streak']} · next {r['next']} ({when})")
        fx = L.focus(rows, questions, state, today, cal)
        report += L.unmatched_block(fx["unmatched"])
        if fx["needs_more"] or fx["leeches"] or fx["empty"]:
            report.append("-- Needs more questions (write them now, tagged with the same **Topic:**):")
            for r, k in fx["needs_more"]:
                report.append(f"   {r['label']} · {r['topic'][:60]} · {r['grade']} with {k} q → write {L.MIN_QUESTIONS_PER_TOPIC - k}+ aimed at the miss")
            for r in fx["empty"]:
                report.append(f"   {r['label']} · {r['topic'][:60]} · no questions at all")
            for q in fx["leeches"]:
                report.append(f"   LEECH {L.COURSE_LABEL[q['course']]} · {q['q'][:70]}… → rewrite or split into 2")
        else:
            report.append("-- Needs more questions: none")
        if graded:
            report += (block + calibration(graded, extra) + misses_by_cause(graded, extra)
                       + confident_misses(items, graded, extra) + miss_pages(items, graded, qsrc))

    # ---- the writes, all checks passed
    if a.dry_run:
        print("DRY RUN — nothing written\n")
    else:
        L.save_state(state)
        L.save_private(priv)
        L.write_ledger(ledger)
        os.makedirs(L.QUIZ_DIR, exist_ok=True)
        if log:
            lp = os.path.join(L.QUIZ_DIR, f"{today.isoformat()}.md")
            new = not os.path.exists(lp)
            with open(lp, "a", encoding="utf-8") as f:
                f.write(("" if not new else f"# Quiz log — {today:%a %Y-%m-%d}\n\n") + "\n".join(log) + "\n")
        archive = os.path.join(L.SESSIONS_DIR, f"{session['id']}.json")
        def write(p):
            os.makedirs(os.path.dirname(p), exist_ok=True)
            with open(p, "w", encoding="utf-8") as f:
                json.dump(session, f, indent=1, ensure_ascii=False)
        def drop_pending():                   # the pending copy of this same session, never another one
            for p in (L.SESSION, L.TRANSIT_SESSION):
                if os.path.exists(p) and not same_file(p, archive) and load_json(p).get("id") == session["id"]:
                    os.remove(p)
        if finished or (was_filed and not reopen):
            write(archive)
            drop_pending()
        elif reopen:                              # an undo reopened a finished session: it is pending again
            write(pending_for(session))
            if os.path.exists(archive):
                os.remove(archive)
        else:
            write(path)
    for line in report:
        print(line)

if __name__ == "__main__":
    main()
