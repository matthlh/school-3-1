#!/usr/bin/env python3
"""Reassemble the Canvas JSON produced by canvas_fetch.js (or canvas_fetch.py), save a dated
snapshot under routines/snapshots/, print a per-course digest, and diff against the previous
snapshot.

Usage:
  python3 canvas_digest.py <file>
    <file> = the tool-results file saved by browser_batch (JSON array of {type,text}),
             OR a plain JSON file with the reassembled object.
  python3 canvas_digest.py <file> --full      # print everything, not just ≤7-day + diff
"""
import json, sys, re, os, glob, datetime as dt
from zoneinfo import ZoneInfo

ROOT = "/Users/matthe/Documents/CodingProjects/School 3-1"
SNAP_DIR = os.path.join(ROOT, "routines", "snapshots")
PT = ZoneInfo("America/Vancouver")
COURSES = ["ASIA250", "CPSC310", "PHIL385", "STAT251"]
COURSE_IDS = {193131: "ASIA250", 192903: "CPSC310", 192607: "PHIL385", 193293: "STAT251"}

def load(path):
    raw = open(path).read()
    try:
        data = json.loads(raw)
    except Exception:
        sys.exit("not JSON: " + path)
    if isinstance(data, dict) and any(c in data for c in COURSES):
        return data
    # tool-results file: list of {type,text}; pull page_text bodies and concatenate
    chunks = []
    for item in data:
        t = item.get("text", "") if isinstance(item, dict) else ""
        if "Source element:" in t and "---" in t:
            body = t.split("---", 1)[1].split("\n\nTab Context:")[0]
            if body.startswith("\n"):
                body = body[1:]
            chunks.append(body)
    full = "".join(chunks)
    return json.loads(full)

def pt(iso):
    if not iso:
        return ""
    d = dt.datetime.fromisoformat(iso.replace("Z", "+00:00")).astimezone(PT)
    return d.strftime("%a %b %d %H:%M")

def days_until(iso):
    if not iso:
        return None
    d = dt.datetime.fromisoformat(iso.replace("Z", "+00:00"))
    return (d - dt.datetime.now(dt.timezone.utc)).total_seconds() / 86400

def prev_snapshot(today_path):
    files = sorted(glob.glob(os.path.join(SNAP_DIR, "canvas-*.json")))
    files = [f for f in files if os.path.abspath(f) != os.path.abspath(today_path)]
    return json.load(open(files[-1])) if files else None

def key(items, k="url"):
    return {i.get(k) or i.get("title") or i.get("name"): i for i in items if isinstance(i, dict)}

def diff_course(code, new, old):
    out = []
    if not old:
        return ["(no previous snapshot — everything is new)"]
    n_ann, o_ann = key(new.get("announcements", [])), key(old.get("announcements", []))
    for k, a in n_ann.items():
        if k not in o_ann:
            out.append(f"NEW ANNOUNCEMENT {pt(a.get('posted'))} — {a.get('title')} (by {a.get('by')})\n      {a.get('body','')[:600]}")
    n_as, o_as = key(new.get("assignments", [])), key(old.get("assignments", []))
    for k, a in n_as.items():
        o = o_as.get(k)
        if not o:
            out.append(f"NEW ASSIGNMENT {a.get('name')} due {pt(a.get('due'))} pts={a.get('pts')}")
        else:
            for f in ("due", "pts", "lock", "unlock", "pub"):
                if a.get(f) != o.get(f):
                    out.append(f"CHANGED {a.get('name')}: {f} {o.get(f)} → {a.get(f)}")
            if a.get("sub") != o.get("sub") or a.get("score") != o.get("score"):
                out.append(f"SUBMISSION {a.get('name')}: {o.get('sub')}/{o.get('score')} → {a.get('sub')}/{a.get('score')}")
    n_disc, o_disc = key(new.get("discussions", [])), key(old.get("discussions", []))
    for k, d in n_disc.items():
        o = o_disc.get(k)
        if not o:
            out.append(f"NEW DISCUSSION {d.get('title')}")
        elif (d.get("replies") or 0) > (o.get("replies") or 0):
            out.append(f"DISCUSSION ACTIVITY {d.get('title')}: {o.get('replies')} → {d.get('replies')} replies, last {pt(d.get('last_reply'))}")
    n_items = {(m.get("name"), i.get("t")) for m in new.get("modules", []) for i in m.get("items", [])}
    o_items = {(m.get("name"), i.get("t")) for m in old.get("modules", []) for i in m.get("items", [])}
    for m, t in sorted(n_items - o_items, key=str):
        out.append(f"NEW MODULE ITEM [{m}] {t}")
    n_pg, o_pg = key(new.get("pages", []), "title"), key(old.get("pages", []), "title")
    for k, p in n_pg.items():
        o = o_pg.get(k)
        if not o:
            out.append(f"NEW PAGE {k}")
        elif p.get("updated") != o.get("updated"):
            out.append(f"PAGE UPDATED {k} ({pt(p.get('updated'))})")
            body = new.get("page_bodies", {}).get(k)
            if body:
                out.append("      " + body[:600])
    n_files = {f.get("name") for f in new.get("files", [])}
    o_files = {f.get("name") for f in old.get("files", [])}
    for f in sorted(n_files - o_files):
        out.append(f"NEW FILE {f}")
    n_cal = {(e.get("title"), e.get("start")) for e in new.get("calendar", [])}
    o_cal = {(e.get("title"), e.get("start")) for e in old.get("calendar", [])}
    for t, s in sorted(n_cal - o_cal, key=str):
        out.append(f"NEW CALENDAR EVENT {pt(s)} — {t}")
    fp_n, fp_o = (new.get("front_page") or {}).get("updated"), (old.get("front_page") or {}).get("updated")
    if fp_n != fp_o:
        out.append(f"FRONT PAGE UPDATED ({pt(fp_n)})")
    return out or ["(no changes)"]

def upcoming(pc, horizon=7):
    rows = []
    for a in pc.get("assignments", []):
        d = days_until(a.get("due"))
        if d is not None and -1 <= d <= horizon:
            rows.append((a.get("due"), f"{pt(a.get('due'))} | {a.get('name')} | pts={a.get('pts')} | {a.get('sub')}"))
    for e in pc.get("calendar", []):
        d = days_until(e.get("start"))
        if d is not None and -1 <= d <= horizon:
            rows.append((e.get("start"), f"{pt(e.get('start'))} | {e.get('title')} (calendar)"))
    for a in pc.get("assignments", []):
        d_unlock = days_until(a.get("unlock"))
        d_due = days_until(a.get("due"))
        if d_unlock is not None and d_unlock <= 0 and d_due is not None and d_due > horizon and a.get("sub") == "unsubmitted":
            rows.append((a.get("due"), f"OPEN NOW, due {pt(a.get('due'))} | {a.get('name')} | pts={a.get('pts')}"))
    return [r for _, r in sorted(rows, key=lambda x: x[0] or "")]

def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    data = load(sys.argv[1])
    full = "--full" in sys.argv
    os.makedirs(SNAP_DIR, exist_ok=True)
    today = dt.datetime.now(PT).strftime("%Y-%m-%d")
    snap_path = os.path.join(SNAP_DIR, f"canvas-{today}.json")
    # Re-run on the same day: diff against the snapshot already taken today, then overwrite it.
    old = json.load(open(snap_path)) if os.path.exists(snap_path) else prev_snapshot(snap_path)
    json.dump(data, open(snap_path, "w"), indent=1)
    print(f"snapshot: {snap_path}   previous: {'yes' if old else 'none'}\n")

    print("== CANVAS TO-DO ==")
    for t in data.get("todo", []):
        print(f"  {pt(t.get('due'))} | {t.get('course')} | {t.get('title')} | pts={t.get('pts')}")
    print("\n== GRADES (Canvas current score) ==")
    new_g = {COURSE_IDS.get(g.get("course_id")): g for g in data.get("grades", []) if g.get("course_id") in COURSE_IDS}
    old_g = {COURSE_IDS.get(g.get("course_id")): g for g in (old or {}).get("grades", []) if g.get("course_id") in COURSE_IDS}
    for code in COURSES:
        g = new_g.get(code)
        if not g:
            continue
        o = old_g.get(code)
        changed = o is not None and (o.get("current") != g.get("current"))
        mark = f"   CHANGED from {o.get('current')}" if changed else ""
        print(f"  {code}: current={g.get('current')} final={g.get('final')} letter={g.get('letter')}{mark}")
    print("\n== INBOX (unread) ==")
    for c in data.get("conversations", []):
        if c.get("state") == "unread":
            print(f"  {pt(c.get('last'))} | {c.get('ctx')} | {c.get('subject')} — {c.get('from')}: {c.get('msg','')[:200]}")
    print("\n== ACTIVITY STREAM (unread) ==")
    for s in data.get("stream", []):
        if s.get("read") is False:
            print(f"  {pt(s.get('created'))} | [{s.get('type')}] course {s.get('course_id')} | {s.get('title')}")

    for code in COURSES:
        pc = data.get(code)
        if not pc:
            continue
        print(f"\n{'#'*20} {code} {'#'*20}")
        print("-- CHANGES since last snapshot")
        for line in diff_course(code, pc, (old or {}).get(code)):
            print("  " + line)
        print("-- DUE within 7 days / open now")
        for r in upcoming(pc) or ["(nothing)"]:
            print("  " + r)
        if full:
            print("-- ALL ASSIGNMENTS")
            for a in pc.get("assignments", []):
                print(f"  {pt(a.get('due'))} | {a.get('name')} | pts={a.get('pts')} | {a.get('sub')}")
            print("-- ALL CALENDAR")
            for e in pc.get("calendar", []):
                print(f"  {pt(e.get('start'))} | {e.get('title')}")
            print("-- MODULES")
            for m in pc.get("modules", []):
                print(f"  {m.get('name')}")
                for i in m.get("items", []):
                    print(f"     - [{i.get('type')}] {i.get('t')}")

if __name__ == "__main__":
    main()
