#!/usr/bin/env python3
"""Record grades for the pending session and update every SRS store.

Usage:
  quiz_grade.py 1:O 2:X 3:~ 4:-            explicit (n:grade; - or s = skipped)
  quiz_grade.py O X ~ O                    positional, in session order
  quiz_grade.py "1 O 2 ~ 3 X"              a phone reply pasted verbatim
  options: --date YYYY-MM-DD  --dry-run  --session PATH  --note "free text for the log"

Questions not mentioned are left untouched (he stopped early). A topic's session grade is the
WORST grade among its questions this session; the ledger row then moves by the CLAUDE.md ladder
(X → streak 0, +1 d · ~ → +3 d · O → streak+1, +7/+16/+35 d). Writes:
  routines/quiz-state.json              per-question history + session record
  ledger.md                             All-topics rows, Due-now block, one Session-log line
  courses/<CODE>/01-topics.md           matching row(s), best effort — warns when no row matches
  routines/quiz/YYYY-MM-DD.md           the session log (appends on a second session that day)
Then prints the ledger delta and what needs more questions.
"""
import argparse, datetime as dt, json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import quizlib as L

def parse_grades(tokens, n_items):
    """Accepts 'n:g', 'n=g', 'n g' pairs, or a bare grade sequence. Returns {n: grade|None}."""
    flat = []
    for t in tokens:
        flat += re.split(r"[\s,]+", t.strip())
    flat = [x for x in flat if x]
    gmap = {"o": "O", "x": "X", "~": "~", "p": "~", "partial": "~", "shaky": "~",
            "-": None, "s": None, "skip": None, "": None}
    G = r"[XxOo~\-spP]|skip|partial|shaky"
    if any("/" in x for x in flat):
        raise SystemExit("a token contains '/' — the shell expanded an unquoted ~ into a path. "
                         "Pass the grades as ONE quoted string, e.g. quiz_grade.py \"1 O 2 ~ 3 X\"")
    def g_of(s):
        s = s.strip().lower()
        if s not in gmap:
            raise SystemExit(f"bad grade '{s}' — use X, ~ (or p), O, or - (skip)")
        return gmap[s]
    out, i = {}, 0
    if all(re.fullmatch(G, x) for x in flat):                            # bare sequence
        for k, x in enumerate(flat, 1):
            out[k] = g_of(x)
        return out
    while i < len(flat):
        m = re.fullmatch(rf"(\d+)[:=]?({G})?", flat[i])
        if not m:
            raise SystemExit(f"cannot parse '{flat[i]}' — expected n:grade pairs or a bare grade sequence")
        k = int(m.group(1))
        if m.group(2):
            out[k] = g_of(m.group(2)); i += 1
        else:
            if i + 1 >= len(flat):
                raise SystemExit(f"question {k} has no grade")
            out[k] = g_of(flat[i + 1]); i += 2
    for k in out:
        if not 1 <= k <= n_items:
            raise SystemExit(f"question {k} is not in the session (1–{n_items})")
    return out

def sync_topics_file(course, topic, last, grade, streak, nxt, dry):
    """Mirror the row into courses/<CODE>/01-topics.md. Header-driven so both table shapes work
    (STAT: # | Outcome | Status | Last | Streak | Next; others: # | Topic | Lec | Added | Last |
    Grade | Streak | Next | Notes). Returns True if a row was updated."""
    path = os.path.join(L.ROOT, "courses", course, "01-topics.md")
    if not os.path.exists(path):
        return False
    with open(path, encoding="utf-8") as f:
        lines = f.read().split("\n")
    codes, tn, hdr, hit = set(L.codes_of(topic)), L.norm(topic), None, False
    for i, line in enumerate(lines):
        if not line.startswith("|"):
            hdr = None
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if hdr is None:
            hdr = {c.lower(): k for k, c in enumerate(cells)}
            continue
        if set("".join(cells)) <= set("-: "):
            continue
        code_col = hdr.get("#")
        name_col = hdr.get("outcome", hdr.get("topic"))
        if name_col is None or name_col >= len(cells):
            continue
        rn = L.norm(cells[name_col])
        code_hit = code_col is not None and code_col < len(cells) and cells[code_col].lower() in codes
        name_hit = rn == tn or (len(tn) >= 8 and (rn.startswith(tn) or tn.startswith(rn)))
        if not (code_hit or name_hit):
            continue
        for key, val in (("status", grade), ("grade", grade), ("last", last), ("streak", str(streak)), ("next", nxt)):
            if key in hdr and hdr[key] < len(cells):
                cells[hdr[key]] = val
        lines[i] = "| " + " | ".join(cells) + " |"
        hit = True
    if hit and not dry:
        with open(path, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
    return hit

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("grades", nargs="*")
    ap.add_argument("--date")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--session", default=L.SESSION)
    ap.add_argument("--note", default="")
    a = ap.parse_args()
    today = dt.date.fromisoformat(a.date) if a.date else L.today_local()
    if not os.path.exists(a.session):
        raise SystemExit("no pending session — run quiz_pick.py first")
    with open(a.session, encoding="utf-8") as f:
        session = json.load(f)
    items = {it["n"]: it for it in session["items"]}
    grades = parse_grades(a.grades, len(items))
    graded = {k: g for k, g in grades.items() if g}
    if not graded:
        raise SystemExit("nothing graded")

    text, rows = L.load_ledger()
    state = L.load_state()
    questions = L.load_questions()
    qsrc = {q["id"]: q for q in questions}

    # ---- per-question history
    for k, g in graded.items():
        it = items[k]
        rec = state["questions"].setdefault(it["id"], dict(course=it["course"], topic=it["topic_tag"], history=[]))
        rec["topic"] = it["topic_tag"]
        rec["history"].append([today.isoformat(), g])
    state["sessions"].append(dict(date=today.isoformat(), mode=session["mode"], n=len(graded), note=a.note,
                                  results=[[k, items[k]["id"], items[k]["course"], g] for k, g in sorted(graded.items())]))

    # ---- topic grades = worst of the session
    per_topic, unmatched = {}, []
    for k, g in graded.items():
        it = items[k]
        r = L.match_topic(it["course"], it["topic_tag"], rows)
        if r is None:
            unmatched.append(it); continue
        cur = per_topic.get(r["idx"])
        per_topic[r["idx"]] = g if cur is None or L.GRADE_RANK[g] < L.GRADE_RANK[cur] else cur
    delta, mirror_miss = [], []
    for r in rows:
        if r["idx"] not in per_topic:
            continue
        g = per_topic[r["idx"]]
        streak, days = L.next_after(g, r["streak"])
        old = (r["grade"] or "—", r["streak"], r["next"])
        r.update(last=today.isoformat(), grade=g, streak=streak, next=(today + dt.timedelta(days=days)).isoformat(),
                 next_date=today + dt.timedelta(days=days))
        delta.append((r, old, days))
        if not sync_topics_file(r["course"], r["topic"], r["last"], g, streak, r["next"], a.dry_run):
            mirror_miss.append(r)

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
    for r, old, days in delta:
        log.append(f"- {r['label']} · {r['topic']} · {old[0]}→{r['grade']} · streak {old[1]}→{r['streak']} · next {r['next']} (+{days} d)")
    log.append("")

    if a.dry_run:
        print("DRY RUN — nothing written\n")
    else:
        L.save_state(state)
        L.write_ledger(text, rows, today, log_line=log_line)
        os.makedirs(L.QUIZ_DIR, exist_ok=True)
        path = os.path.join(L.QUIZ_DIR, f"{today.isoformat()}.md")
        new = not os.path.exists(path)
        with open(path, "a", encoding="utf-8") as f:
            f.write(("" if not new else f"# Quiz log — {today:%a %Y-%m-%d}\n\n") + "\n".join(log) + "\n")
        os.remove(a.session)

    # ---- report
    print(f"== GRADED {len(graded)} of {len(items)} · {counts['O']} O / {counts['~']} ~ / {counts['X']} X")
    print("-- Ledger delta")
    for r, old, days in delta:
        print(f"   {r['label']} · {r['topic'][:55]} · {old[0]}→{r['grade']} · streak {r['streak']} · next {r['next']} (+{days} d)")
    if unmatched:
        print("-- ⚠ Not recorded in the ledger (topic tag matches no row — add the row or fix the tag):")
        for it in unmatched:
            print(f"   {it['label']} · '{it['topic_tag']}' · {it['file']}:{it['line']}")
    if mirror_miss:
        print("-- ⚠ No matching row in 01-topics.md (ledger.md is authoritative; fix by hand if it matters):")
        for r in mirror_miss:
            print(f"   {r['course']} · {r['topic'][:60]}")
    fx = L.focus(rows, questions, state, today, L.exams_by_course(today))
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
    for line in L.due_block(rows, today):
        print(line)

if __name__ == "__main__":
    main()
