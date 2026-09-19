#!/usr/bin/env python3
"""Fetch the same Canvas data as canvas_fetch.js, but via a personal access token — no browser.

Setup (Matt does this once): Canvas → Account → Settings → Approved Integrations →
"+ New Access Token" → paste the token into ~/.config/canvas/token (chmod 600).

Usage: python3 canvas_fetch.py            # writes snapshot + prints digest via canvas_digest.py
       python3 canvas_fetch.py --json     # just print the JSON
"""
import json, os, re, sys, html, subprocess, datetime as dt
import urllib.request, urllib.parse

BASE = "https://canvas.ubc.ca/api/v1"
TOKEN_FILE = os.path.expanduser("~/.config/canvas/token")
COURSES = [(193131, "ASIA250"), (192903, "CPSC310"), (192607, "PHIL385"), (193293, "STAT251")]
HERE = os.path.dirname(os.path.abspath(__file__))

def token():
    if not os.path.exists(TOKEN_FILE):
        sys.exit(f"no token at {TOKEN_FILE} — use the Chrome path (canvas_fetch.js) instead")
    return open(TOKEN_FILE).read().strip()

def api(path, tok):
    url = BASE + path
    out = []
    while url:
        req = urllib.request.Request(url, headers={"Authorization": f"Bearer {tok}"})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                body = r.read().decode()
                links = r.headers.get("Link", "")
        except urllib.error.HTTPError as e:
            return {"_err": f"{e.code} {path}"}
        data = json.loads(body.replace("while(1);", "", 1))
        if isinstance(data, list):
            out.extend(data)
            m = re.search(r'<([^>]+)>; rel="next"', links)
            url = m.group(1) if m else None
        else:
            return data
    return out

def strip(h):
    if not h:
        return ""
    h = re.sub(r"<style[\s\S]*?</style>", "", h)
    h = re.sub(r"<[^>]+>", " ", h)
    h = html.unescape(h)
    h = re.sub(r"https?://\S+", "[link]", h)
    return re.sub(r"\s+", " ", h).strip()

def u(x):
    return (x or "").split("?")[0].replace("https://canvas.ubc.ca", "")

def arr(x):
    return x if isinstance(x, list) else []

def main():
    tok = token()
    out = {"fetched_at": dt.datetime.utcnow().isoformat() + "Z"}
    out["todo"] = [{"type": t.get("type"), "course": t.get("context_name"), "title": (t.get("assignment") or {}).get("name"), "due": (t.get("assignment") or {}).get("due_at"), "pts": (t.get("assignment") or {}).get("points_possible"), "url": u(t.get("html_url"))} for t in arr(api("/users/self/todo?per_page=50", tok))]
    out["stream"] = [{"type": s.get("type"), "title": s.get("title"), "course_id": s.get("course_id"), "created": s.get("created_at"), "read": s.get("read_state"), "url": u(s.get("html_url")), "msg": strip(s.get("message"))[:300]} for s in arr(api("/users/self/activity_stream?per_page=30", tok))]
    out["conversations"] = [{"subject": c.get("subject"), "last": c.get("last_message_at"), "state": c.get("workflow_state"), "from": ", ".join(p.get("name", "") for p in c.get("participants", [])), "ctx": c.get("context_name"), "msg": strip(c.get("last_message"))[:300]} for c in arr(api("/conversations?per_page=10", tok))]
    cutoff = dt.datetime.now(dt.timezone.utc) - dt.timedelta(days=3)
    for cid, code in COURSES:
        pc = {}
        pc["announcements"] = [{"title": a.get("title"), "posted": a.get("posted_at"), "by": (a.get("author") or {}).get("display_name"), "read": a.get("read_state"), "url": u(a.get("html_url")), "body": strip(a.get("message"))[:1500]} for a in arr(api(f"/announcements?context_codes[]=course_{cid}&start_date=2026-08-15&end_date=2026-12-31&per_page=50", tok))]
        pc["assignments"] = [{"name": a.get("name"), "due": a.get("due_at"), "unlock": a.get("unlock_at"), "lock": a.get("lock_at"), "pts": a.get("points_possible"), "types": ",".join(a.get("submission_types") or []), "pub": a.get("published"), "sub": (a.get("submission") or {}).get("workflow_state"), "score": (a.get("submission") or {}).get("score"), "url": u(a.get("html_url")), "desc": strip(a.get("description"))[:300]} for a in arr(api(f"/courses/{cid}/assignments?per_page=100&include[]=submission&order_by=due_at", tok))]
        qz = api(f"/courses/{cid}/quizzes?per_page=50", tok)
        pc["quizzes"] = [{"title": q.get("title"), "due": q.get("due_at"), "unlock": q.get("unlock_at"), "lock": q.get("lock_at"), "pts": q.get("points_possible"), "pub": q.get("published"), "url": u(q.get("html_url"))} for q in qz] if isinstance(qz, list) else qz
        pc["discussions"] = [{"title": d.get("title"), "posted": d.get("posted_at"), "last_reply": d.get("last_reply_at"), "unread": d.get("unread_count"), "replies": d.get("discussion_subentry_count"), "url": u(d.get("html_url")), "body": strip(d.get("message"))[:300]} for d in arr(api(f"/courses/{cid}/discussion_topics?per_page=50", tok))]
        pc["modules"] = [{"name": m.get("name"), "unlock": m.get("unlock_at"), "state": m.get("state"), "items": [{"t": i.get("title"), "type": i.get("type"), "due": (i.get("content_details") or {}).get("due_at"), "page_url": i.get("page_url"), "url": u(i.get("html_url") or i.get("external_url"))} for i in m.get("items", [])]} for m in arr(api(f"/courses/{cid}/modules?include[]=items&per_page=50", tok))]
        fp = api(f"/courses/{cid}/front_page", tok)
        pc["front_page"] = {"title": fp.get("title"), "updated": fp.get("updated_at"), "body": strip(fp.get("body"))[:2000]} if isinstance(fp, dict) and fp.get("title") else None
        pc["tabs"] = [t.get("label") for t in arr(api(f"/courses/{cid}/tabs", tok)) if not t.get("hidden")]
        pc["pages"] = [{"title": p.get("title"), "updated": p.get("updated_at"), "url": u(p.get("html_url")), "page_url": p.get("url")} for p in arr(api(f"/courses/{cid}/pages?per_page=50&sort=updated_at&order=desc", tok))]
        pc["files"] = [{"name": f.get("display_name"), "updated": f.get("updated_at"), "size": f.get("size")} for f in arr(api(f"/courses/{cid}/files?sort=updated_at&order=desc&per_page=25", tok))]
        pc["calendar"] = [{"title": e.get("title"), "start": e.get("start_at"), "end": e.get("end_at"), "loc": e.get("location_name"), "desc": strip(e.get("description"))[:200]} for e in arr(api(f"/calendar_events?context_codes[]=course_{cid}&start_date=2026-09-01&end_date=2026-12-31&per_page=100", tok))]
        pl = []
        for p in arr(api(f"/planner/items?context_codes[]=course_{cid}&start_date=2026-09-01T00:00:00Z&end_date=2026-12-31T00:00:00Z&per_page=100", tok)):
            s = p.get("submissions")
            sub = ("submitted" if s.get("submitted") else ("missing" if s.get("missing") else "not-submitted")) if isinstance(s, dict) else ""
            pl.append({"date": p.get("plannable_date"), "type": p.get("plannable_type"), "title": (p.get("plannable") or {}).get("title"), "pts": (p.get("plannable") or {}).get("points_possible"), "sub": sub, "url": u(p.get("html_url"))})
        pc["planner"] = pl
        pc["page_bodies"] = {}
        for p in pc["pages"]:
            if p.get("page_url") and p.get("updated") and dt.datetime.fromisoformat(p["updated"].replace("Z", "+00:00")) > cutoff:
                pg = api(f"/courses/{cid}/pages/{p['page_url']}", tok)
                pc["page_bodies"][p["title"]] = strip(pg.get("body") if isinstance(pg, dict) else "")[:2000]
        out[code] = pc
    if "--json" in sys.argv:
        print(json.dumps(out, indent=1))
        return
    tmp = "/tmp/canvas_fetch_latest.json"
    json.dump(out, open(tmp, "w"))
    subprocess.run([sys.executable, os.path.join(HERE, "canvas_digest.py"), tmp] + [a for a in sys.argv[1:] if a == "--full"])

if __name__ == "__main__":
    main()
