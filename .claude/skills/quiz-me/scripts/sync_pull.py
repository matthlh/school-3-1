#!/usr/bin/env python3
"""Import the reviews he saved on the website's Review page (phone or laptop) into the quiz records, each exactly once.

The Review page saves every grade as one event file, events/<day>/<id>.json, in the private GitHub repository
PROGRESS_REPO, and an undo as another event naming the grade it takes back (2026-11-06). This script reads those files
with `gh api` (his gh login on this Mac; no token is stored here) and, under quiz_grade.py's writer lock and recovery
journal:
  - files each review not yet in routines/quiz-state.json under the website's own event id, so the site, which
    already counts the event, never counts it twice, and a second run records nothing new;
  - removes a review an undo event names, with any note filed with it;
  - keeps what he wrote for an X or a ~ in the git-ignored routines/quiz-private.json only (never quiz-state.json);
  - re-derives each touched ledger row from its questions' current histories (quizlib.topic_summary, as quiz_grade.py
    does), refreshes the Due-now block, writes one Session-log line per website session, and rewrites
    routines/review-plan.json, the public plan the Review page reads;
  - lists the questions he flagged as wrong or unclear, for rewriting the same day.
Fetched files are cached in routines/quiz/web-events/ (git-ignored), so a run only downloads what is new.

Usage:
  sync_pull.py [--dry-run] [--repo OWNER/NAME] [--from DIR] [--date YYYY-MM-DD]
--from DIR reads the event files under DIR instead of GitHub (tests).
"""
import argparse, base64, datetime as dt, glob, json, os, subprocess, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import quizlib as L
import quiz_grade as G

PROGRESS_REPO = "matthlh/school-3-1-progress"
WEB = "web-"                                                # session ids of website sessions in quiz-state.json

def cache_dir():
    return os.path.join(L.QUIZ_DIR, "web-events")

def web_log():
    """web session id -> its Session-log line, so a later import replaces the line in place."""
    return os.path.join(L.QUIZ_DIR, "web-sessions.json")

def flags_seen():
    """The flag events already reported, so each wrong-or-unclear flag is listed once."""
    return os.path.join(L.QUIZ_DIR, "web-flags.json")

def gh(path):
    """One GitHub API call through the gh CLI. None on 404 or 409 (no such file, or a repository with no commits)."""
    p = subprocess.run(["gh", "api", "-H", "Accept: application/vnd.github+json", path],
                       capture_output=True, text=True)
    if p.returncode:
        err = (p.stderr or p.stdout).strip()
        if "HTTP 409" in err or "Git Repository is empty" in err:
            return None
        if "HTTP 404" in err:
            raise SystemExit(f"GitHub cannot find {PROGRESS_REPO} with this Mac's gh login ({err.splitlines()[-1]}). "
                             "Create the private repository first, or pass --repo.")
        raise SystemExit(f"gh api {path} failed: {err.splitlines()[-1] if err else p.returncode}. Nothing was imported.")
    return json.loads(p.stdout)

def fetch(repo):
    """Every event file in the repository, as (path, text), from the cache where it holds the file already. Stops unless
    the repository is private: what he types on the Review page must never sit in a public one."""
    if repo.lower() == "matthlh/school-3-1":
        raise SystemExit("matthlh/school-3-1 is the public notes repository; website reviews sync through a private one.")
    meta = gh(f"repos/{repo}")
    if not (meta or {}).get("private"):
        raise SystemExit(f"{repo} is not private; nothing was imported. Make it private on GitHub first.")
    tree = gh(f"repos/{repo}/git/trees/HEAD?recursive=1")
    out = []
    for t in (tree or {}).get("tree", []):
        path = t["path"]
        if t["type"] != "blob" or not path.startswith("events/") or not path.endswith(".json"):
            continue
        cached = os.path.join(cache_dir(), path)
        if os.path.exists(cached):
            with open(cached, encoding="utf-8") as f:
                out.append((path, f.read()))
            continue
        blob = gh(f"repos/{repo}/git/blobs/{t['sha']}")
        text = base64.b64decode(blob["content"]).decode("utf-8")
        os.makedirs(os.path.dirname(cached), exist_ok=True)
        with open(cached, "w", encoding="utf-8") as f:
            f.write(text)
        out.append((path, text))
    return out

def local(root):
    out = []
    for p in sorted(glob.glob(os.path.join(root, "events", "**", "*.json"), recursive=True)):
        with open(p, encoding="utf-8") as f:
            out.append((os.path.relpath(p, root), f.read()))
    return out

def is_event(e):
    """The site's isEvent (notes-app/src/review/events.ts)."""
    if not isinstance(e, dict) or e.get("v") != 1 or not all(isinstance(e.get(k), str) for k in ("id", "at", "day")):
        return False
    if L.parse_date(e["day"]) is None:
        return False
    if e.get("kind") == "undo":
        return isinstance(e.get("target"), str)
    return (e.get("kind") == "review" and isinstance(e.get("qid"), str) and isinstance(e.get("course"), str)
            and isinstance(e.get("ticks"), list) and e.get("grade") in (None, "O", "~", "X") and e.get("conf") in (1, 2, 3))

def parse(files):
    events, bad = {}, []
    for path, text in files:
        try:
            e = json.loads(text)
        except ValueError:
            bad.append(path)
            continue
        if not is_event(e) or os.path.basename(path) != f"{e['id']}.json":
            bad.append(path)
            continue
        events[e["id"]] = e
    return events, bad

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--repo", default=PROGRESS_REPO)
    ap.add_argument("--from", dest="src", metavar="DIR")
    ap.add_argument("--date")
    a = ap.parse_args()
    files = local(a.src) if a.src else fetch(a.repo)
    with G.grade_lock(a.dry_run):
        G.recover_transaction(None, a.dry_run)
        run(a, files)

def run(a, files):
    today = dt.date.fromisoformat(a.date) if a.date else L.today_local()
    events, bad = parse(files)
    text, rows = L.load_ledger()
    state = L.load_state()
    priv = L.load_private()
    questions = L.load_questions()
    by_id = {q["id"]: q for q in questions}
    cal = L.load_calendar()
    by_topic, _ = L.bank_by_topic(rows, questions)
    row_of = {q["id"]: r for r in rows for q in by_topic.get(r["idx"], [])}

    have = {}                                   # event id -> (qid, history entry) for every review already filed
    for qid, rec in state["questions"].items():
        for e in rec.get("history", []):
            if len(e) > 2 and e[2].get("event_id"):
                have[e[2]["event_id"]] = (qid, e)
    undone = {e["target"] for e in events.values() if e["kind"] == "undo"}
    reviews = sorted((e for e in events.values() if e["kind"] == "review"), key=lambda e: (e["at"], e["id"]))

    added, removed, flagged, unknown, touched = [], [], [], [], set()
    for e in reviews:
        if e["id"] in undone:
            if e["id"] in have:                 # filed on an earlier run, taken back since
                qid, entry = have.pop(e["id"])
                state["questions"][qid]["history"].remove(entry)
                notes = priv.get(qid, [])
                priv[qid] = [n for n in notes if n[1].get("event_id") != e["id"]]
                if not priv[qid]:
                    priv.pop(qid)
                removed.append(e)
                touched.add(qid)
            continue
        if e["grade"] is None:
            flagged.append(e)
            continue
        if e["id"] in have:
            continue
        q = by_id.get(e["qid"])
        if q is None or q["course"] != e["course"]:
            unknown.append(e)                   # not filed: it is retried on the next run, once the id is back in a bank
            continue
        rec = state["questions"].setdefault(q["id"], dict(course=q["course"], topic=q["topic"], history=[]))
        if rec.get("course") not in (None, q["course"]):
            raise SystemExit(f"Question {q['id']} belongs to {q['course']}, but its saved history belongs to "
                             f"{rec['course']}; nothing was imported.")
        extra = dict(conf=e["conf"], event_id=e["id"], session_id=WEB + e["session"])
        entry = [e["day"], e["grade"], extra]
        rec["history"].append(entry)
        rec["history"].sort(key=lambda x: x[0])     # stable: same-day order is kept
        have[e["id"]] = (q["id"], entry)
        if e.get("attempt") and e["grade"] != "O":
            priv.setdefault(q["id"], []).append([e["day"], dict(said=e["attempt"], event_id=e["id"])])
        added.append(e)
        touched.add(q["id"])

    # ---- one session record per website session, rebuilt from the histories, so undo and retries stay exact
    web = {}
    for qid, rec in state["questions"].items():
        for e in rec.get("history", []):
            sid = e[2].get("session_id", "") if len(e) > 2 else ""
            if sid.startswith(WEB):
                web.setdefault(sid, []).append((e[0], qid, rec["course"], e[1], e[2]["event_id"]))
    sessions = {s["id"]: s for s in state["sessions"] if s.get("id")}   # sessions before 2026-11-06 have no id
    changed = {WEB + e["session"] for e in added + removed}
    for sid in changed:
        res = sorted(web.get(sid, []), key=lambda x: (x[0], x[4]))
        if not res:
            state["sessions"] = [s for s in state["sessions"] if s.get("id") != sid]
            continue
        s = sessions.get(sid)
        if s is None:
            s = dict(id=sid, date=res[0][0], mode="web", n=0, note="", results=[])
            state["sessions"].append(s)
        s["results"] = [[k, qid, course, g] for k, (_, qid, course, g, _) in enumerate(res, 1)]
        s["n"] = len(s["results"])

    # ---- the touched ledger rows, from their questions' current histories
    baselines = state.setdefault("topic_baselines", {})
    delta, moved = [], set()
    for r in {id(row_of[q]): row_of[q] for q in touched if q in row_of}.values():
        key = f"{r['course']}|{r['topic']}"
        old = G.snapshot(r)
        baselines.setdefault(key, old)
        s = L.topic_summary(r, by_topic.get(r["idx"], []), state, cal, rows)
        if s is None:
            G.restore(r, baselines[key])
        else:
            L.apply_summary(r, s)
            moved.add(r["idx"])
        delta.append((r, old))

    # ---- the ledger: rows, the Due-now block, one Session-log line per website session touched
    logs = G.load_json(web_log()) if os.path.exists(web_log()) else {}
    block = L.due_block(rows, today, cal, L.readiness(rows, today, cal, state, questions))
    # Rows and the Due-now block once (ledger_text writes rows by line number, so it must not run on its own output),
    # then each website session's one Session-log line, replaced in place when an earlier import wrote it.
    lines = L.ledger_text(text, rows, block).split("\n")
    for sid in sorted(changed):
        res = next((s["results"] for s in state["sessions"] if s.get("id") == sid), [])
        line = None
        if res:
            counts = {g: sum(1 for x in res if x[3] == g) for g in L.GRADES}
            labels = sorted({L.COURSE_LABEL.get(x[2], x[2]) for x in res})
            day = min(e[0] for e in web[sid])
            line = (f"| {day} | Review on the website: {len(res)} q · {counts['O']} O / {counts['~']} ~ / "
                    f"{counts['X']} X · {', '.join(labels)} |")
        old = logs.get(sid)
        if old and old in lines:
            i = lines.index(old)
            if line:
                lines[i] = line
            else:
                del lines[i]
        elif line:
            lines.insert(L.session_log_end(lines), line)
        if line:
            logs[sid] = line
        else:
            logs.pop(sid, None)
    ledger = "\n".join(lines)

    # ---- the public plan the Review page reads
    import quiz_pick as P
    plan = P.plan_text(rows, questions, state, cal, max(today, L.today_local()))

    # ---- report
    print(f"== Website reviews: {len(added)} new, {len(removed)} taken back, {len(events)} event files"
          + (f", {len(bad)} unreadable" if bad else ""))
    for e in added:
        q = by_id[e["qid"]]
        print(f"   {e['day']} · {e['grade']}{e['conf']} · {L.COURSE_LABEL.get(q['course'], q['course'])} · {q['topic'][:60]}")
    for e in removed:
        print(f"   undone · {e['day']} · {e['qid']}")
    for r, old in delta:
        print(f"   ledger · {r['label']} · {r['topic'][:55]} · {old['grade'] or '—'}→{r['grade'] or '—'} · next {r['next']}")
    seen = set(G.load_json(flags_seen())) if os.path.exists(flags_seen()) else set()
    flagged = [e for e in flagged if e["id"] not in seen]
    if flagged:
        print("-- Flagged as wrong or unclear on the website (rewrite these today):")
        for e in flagged:
            q = by_id.get(e["qid"])
            print(f"   {e['day']} · {e['qid']} · " + (f"{q['file']}:{q['line']} · {q['q'][:70]}" if q else "no longer in a bank"))
    if unknown:
        print("-- Not imported, the question id is in no bank now (kept for the next run):")
        for e in unknown:
            print(f"   {e['day']} · {e['qid']} · {e['course']} · {e['grade']}")
    for p in bad:
        print(f"-- skipped {p}: not a review event")

    if a.dry_run:
        print("DRY RUN — nothing written")
        return
    if not (added or removed):
        outputs = {}
    else:
        enc = lambda v: json.dumps(v, indent=1, ensure_ascii=False)
        outputs = {L.STATE: enc(state), L.PRIVATE: enc(priv), L.LEDGER: ledger, web_log(): enc(logs)}
    outputs[L.REVIEW_PLAN] = plan
    if flagged:
        outputs[flags_seen()] = json.dumps(sorted(seen | {e["id"] for e in flagged}), indent=1)
    G.save_transaction(outputs, ["sync_pull"] + sys.argv[1:])

if __name__ == "__main__":
    main()
