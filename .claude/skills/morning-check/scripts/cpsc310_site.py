#!/usr/bin/env python3
"""CPSC 310 course site → what the routine needs, in one call.

The site (ubccpsc.github.io/310/26w1) is four pages and only one of them has slides:
  Schedule          week table; each lecture title becomes a link to its PDF once the deck is posted
  Course Materials  unit-NN pages: lecture → "what it answers" → reader chapter links
  Reader            the textbook — where exam terminology comes from
  Syllabus          policies only
  Project           InsightUBC overview; deliverable specs appear as links (d1-…, d2-…) when released;
                    the REST API spec is project/spec.html

Usage
  cpsc310_site.py              morning-check: new/changed schedule rows, newly posted decks
                               (downloaded to routines/slides/cpsc310/, text extracted), today's
                               / next lecture with its reader chapters. Diffs against
                               routines/snapshots/cpsc310-site.json and updates it.
  cpsc310_site.py --lecture N  print lecture N's deck text + reader chapter URLs (for "log CPSC310 lec N")
  cpsc310_site.py --all        the full lecture list with deck status and readings
  cpsc310_site.py --no-snapshot  don't touch the snapshot (dry run of the default mode)

Slides are course material, so they live under routines/ (git-ignored), never in the public repo.
"""
import argparse, datetime as dt, html, json, re, sys, urllib.request
from pathlib import Path

ROOT = Path("/Users/matthe/Documents/CodingProjects/School 3-1")
BASE = "https://ubccpsc.github.io"
SITE = BASE + "/310/26w1"
SNAP = ROOT / "routines/snapshots/cpsc310-site.json"
SLIDES = ROOT / "routines/slides/cpsc310"
UNITS = [f"{SITE}/materials/unit-0{i}/" for i in range(1, 5)]
YEAR = 2026


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "school-3-1 morning-check"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def text(s):
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def rows_of(tbl):
    return re.findall(r"<tr>(.*?)</tr>", tbl, flags=re.S)


def cells_of(row):
    return re.findall(r"<td[^>]*>(.*?)</td>", row, flags=re.S)


def abs_url(u):
    return u if u.startswith("http") else BASE + u if u.startswith("/") else SITE + "/" + u.lstrip("./")


def parse_schedule(doc):
    """→ list of lectures in order: {n, week, date, title, pdf, lab, due}."""
    i = doc.find("Week by week")
    tbl = re.search(r"<table[^>]*>(.*?)</table>", doc[i:], flags=re.S).group(1)
    lectures = []
    for row in rows_of(tbl):
        c = cells_of(row)
        if len(c) < 6:
            continue
        wk, dates, _unit, lec, lab, due = (c + [""] * 6)[:6]
        # "Sep 8, 10" / "Sep 29, Oct 1" → list of dates for the week's Tue/Thu slots
        ds, mon = [], None
        for tok in text(dates).split(","):
            m = re.match(r"\s*([A-Z][a-z]{2})?\s*(\d+)", tok)
            if not m:
                continue
            mon = m.group(1) or mon
            ds.append(dt.datetime.strptime(f"{mon} {m.group(2)} {YEAR}", "%b %d %Y").date())
        parts = [p for p in re.split(r"\s·\s", lec) if p.strip()]
        slot = 0
        for p in parts:
            t = text(p)
            if re.match(r"^\(no .*class\)$", t, flags=re.I) or t in ("—", "-", ""):
                slot += 1
                continue
            m = re.search(r'href="([^"]+\.pdf)"', p)
            lectures.append(dict(
                n=len(lectures) + 1, week=text(wk), date=ds[slot].isoformat() if slot < len(ds) else "",
                title=t, pdf=abs_url(m.group(1)) if m else "", lab=text(lab), due=text(due)))
            slot += 1
    return lectures


def parse_units():
    """→ ordered list of {title, answers, readings:[(name,url)]} across the unit pages."""
    out = []
    for u in UNITS:
        try:
            doc = get(u).decode()
        except Exception:
            continue
        m = re.search(r"<h2[^>]*>Lectures.*?<table[^>]*>(.*?)</table>", doc, flags=re.S)
        if not m:
            continue
        for row in rows_of(m.group(1)):
            c = cells_of(row)
            if len(c) < 3:
                continue
            readings = [(text(n), abs_url(h)) for h, n in re.findall(r'<a href="([^"]+)"[^>]*>(.*?)</a>', c[2])]
            out.append(dict(title=text(c[0]), answers=text(c[1]), readings=readings, unit=u))
    return out


def norm(s):
    return re.sub(r"[^a-z]", "", s.lower())


def join(lectures, units):
    """Attach reader chapters: exact title match first, else by position (the site names the
    Sep 10 deck 'Introduction' on the schedule but 'The cost of change' on the unit page)."""
    by_title = {norm(u["title"]): u for u in units}
    used = set()
    for L in lectures:
        u = by_title.get(norm(L["title"]))
        if u:
            used.add(id(u))
            L.update(answers=u["answers"], readings=u["readings"])
    pos = [u for u in units if id(u) not in used]
    for L in lectures:
        if "readings" not in L:
            if pos:
                u = pos.pop(0)
                L.update(answers=u["answers"], readings=u["readings"], guessed=True)
            else:
                L.update(answers="", readings=[])
    return lectures


def parse_project():
    """→ [(label, url)] of deliverable spec pages linked from the project overview."""
    doc = get(SITE + "/project/").decode()
    seen, out = set(), []
    for h, n in re.findall(r'<a[^>]*href="(/310/26w1/project/[^"#]+)"[^>]*>(.*?)</a>', doc, flags=re.S):
        if h.endswith("/project/") or h in seen:
            continue
        seen.add(h)
        label = text(n)
        if len(label) < 8:  # "here", "spec" → use the page name instead
            label = h.rstrip("/").rsplit("/", 1)[-1]
        out.append((label, abs_url(h)))
    return out


def slug(L):
    return f"{L['n']:02d}-" + re.sub(r"[^a-z0-9]+", "-", L["title"].lower()).strip("-")


def fetch_deck(L):
    """Download the PDF and extract text next to it. Returns (pdf_path, txt_path)."""
    SLIDES.mkdir(parents=True, exist_ok=True)
    pdf = SLIDES / (slug(L) + ".pdf")
    txt = pdf.with_suffix(".txt")
    if not pdf.exists():
        pdf.write_bytes(get(L["pdf"]))
    if not txt.exists():
        try:
            from pypdf import PdfReader
            r = PdfReader(str(pdf))
            txt.write_text("\n".join(f"--- slide {i} ---\n{(p.extract_text() or '').strip()}"
                                     for i, p in enumerate(r.pages, 1)))
        except ImportError:
            txt.write_text("(pypdf not installed: python3 -m pip install --user pypdf)")
    return pdf, txt


def readings_line(L):
    return " · ".join(f"{n} <{u}>" for n, u in L.get("readings", [])) or "(no reader chapter listed)"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lecture", type=int)
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--no-snapshot", action="store_true")
    a = ap.parse_args()

    lectures = join(parse_schedule(get(SITE + "/schedule").decode()), parse_units())
    today = dt.date.today()

    if a.lecture:
        L = next((x for x in lectures if x["n"] == a.lecture), None)
        if not L:
            sys.exit(f"no lecture {a.lecture} on the schedule")
        print(f"Lecture {L['n']} — {L['title']} ({L['date']}, week {L['week']})")
        print("Answers:", L.get("answers") or "?")
        print("Reader:", readings_line(L), "(positional guess)" if L.get("guessed") else "")
        if L["pdf"]:
            pdf, txt = fetch_deck(L)
            print(f"Deck: {L['pdf']}\nSaved: {pdf}\n")
            print(txt.read_text())
        else:
            print("Deck: not posted yet — log from his page + the reader chapter, re-run when the schedule links it.")
        return

    if a.all:
        for L in lectures:
            print(f"{L['n']:>2} {L['date']} {L['title']:<45} {'deck' if L['pdf'] else '----'}  {readings_line(L)}")
        return

    prev = json.loads(SNAP.read_text()) if SNAP.exists() else {}
    prev_rows = prev.get("rows", {})
    cur_rows = {str(L["n"]): f"{L['date']} · {L['title']} · lab: {L['lab']} · due: {L['due']} · {'deck' if L['pdf'] else 'no deck'}"
                for L in lectures}
    out = []
    for n, row in cur_rows.items():
        if prev_rows.get(n) != row:
            L = lectures[int(n) - 1]
            if L["pdf"] and "no deck" in prev_rows.get(n, "no deck"):
                pdf, txt = fetch_deck(L)
                logged = any(f.name.startswith(f"{L['n']:02d}-") for f in (ROOT / "courses/CPSC310/lectures").glob("*.md"))
                out.append(f"NEW DECK  lec {L['n']} {L['title']} ({L['date']}) → {txt.name}"
                           + ("" if logged else "  ← not logged yet: `cpsc310_site.py --lecture %d`" % L["n"]))
            elif n in prev_rows:
                out.append(f"CHANGED   lec {n}: {prev_rows[n]}  →  {row}")
            elif prev_rows:
                out.append(f"ADDED     lec {n}: {row}")
    for n in prev_rows:
        if n not in cur_rows:
            out.append(f"REMOVED   lec {n}: {prev_rows[n]}")
    try:
        project = parse_project()
    except Exception as e:
        project, out = [], out + [f"(project page unreachable: {e})"]
    prev_proj = set(prev.get("project", []))
    for label, url in project:
        if url not in prev_proj and prev_rows:
            out.append(f"PROJECT   new page linked: {label} <{url}>  ← a released spec = new deadline/to-do check")
    if not prev_rows:
        out.append(f"(first run: snapshot of {len(lectures)} lectures written)")

    nxt = next((L for L in lectures if L["date"] and dt.date.fromisoformat(L["date"]) >= today), None)
    print("CPSC 310 site:", "no changes" if not out else "")
    for line in out:
        print("  " + line)
    if nxt:
        when = "TODAY" if nxt["date"] == today.isoformat() else nxt["date"]
        print(f"  Next lecture ({when}): lec {nxt['n']} {nxt['title']} — {nxt.get('answers') or ''}")
        print(f"    reader: {readings_line(nxt)}{'  (positional guess)' if nxt.get('guessed') else ''}")
        print(f"    deck: {'posted' if nxt['pdf'] else 'not posted'}")
    if not a.no_snapshot:
        SNAP.parent.mkdir(parents=True, exist_ok=True)
        SNAP.write_text(json.dumps({"checked": today.isoformat(), "rows": cur_rows,
                                    "project": [u for _, u in project]}, indent=1))


if __name__ == "__main__":
    main()
