#!/usr/bin/env python3
"""CPSC 310 course site → what the routine needs, in one call.

The site (ubccpsc.github.io/310/26w1) is four pages and only one of them has slides:
  Schedule          week table; each lecture title becomes a link to its PDF once the deck is posted
  Reader            the textbook — where exam terminology comes from
  Syllabus          policies only
  Project           InsightUBC overview; deliverable specs appear as links (d1-…, d2-…) when released;
                    the REST API spec is project/spec.html
The Course Materials unit pages (lecture → reader chapters) were removed from the site on 2026-09-28,
and nothing on it maps lectures to reader chapters any more.

Usage
  cpsc310_site.py              morning-check: new/changed schedule rows, newly posted decks
                               (downloaded to routines/slides/cpsc310/, text extracted), today's
                               / next lecture. Diffs against routines/snapshots/cpsc310-site.json
                               and updates it.
  cpsc310_site.py --lecture N  print lecture N's deck text (for "log CPSC310 lec N")
  cpsc310_site.py --all        the full lecture list with deck status
  cpsc310_site.py --no-snapshot  don't touch the snapshot (dry run of the default mode)

Slides are course material, so they live under routines/ (git-ignored), never in the public repo.
"""
import argparse, datetime as dt, html, http.client, io, json, os, re, sys, urllib.request
from pathlib import Path

import term

ROOT = Path(os.environ.get("SCHOOL_ROOT") or Path(__file__).resolve().parents[4])   # the workspace this script sits in
BASE = "https://ubccpsc.github.io"
SITE = BASE + "/310/26w1"
SNAP = ROOT / "routines/snapshots/cpsc310-site.json"
SLIDES = ROOT / "routines/slides/cpsc310"
YEAR = 2026
COLUMNS = ["Wk", "Dates", "Unit", "Lectures", "Lab", "Due"]   # the schedule's week table, read by position


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "school-3-1 morning-check"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.read()
    except (OSError, http.client.HTTPException) as e:   # URLError, HTTPError, timeouts, IncompleteRead: none names the page
        raise RuntimeError(f"{url} could not be fetched: {e}") from e


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
    """→ list of lectures in order: {n, week, date, title, pdf, lab, due}. Cells are read by position, so a
    missing heading or table, a different header, a short row or no lectures at all raises."""
    page = SITE + "/schedule"
    i = doc.find("Week by week")
    m = re.search(r"<table[^>]*>(.*?)</table>", doc[i:], flags=re.S) if i >= 0 else None
    if not m:
        raise RuntimeError(f"{page} no longer parses: no 'Week by week' heading followed by a table")
    tbl = m.group(1)
    head = [text(h) for h in re.findall(r"<th(?:\s[^>]*)?>(.*?)</th>", tbl, flags=re.S)]
    if head != COLUMNS:
        raise RuntimeError(f"{page} no longer parses: the week table header is {' | '.join(head) or 'empty'},"
                           f" expected {' | '.join(COLUMNS)}")
    lectures = []
    for row in rows_of(tbl):
        c = cells_of(row)
        if not c:   # the header row: <th> cells only
            continue
        if len(c) != len(COLUMNS):
            raise RuntimeError(f"{page} no longer parses: a week row has {len(c)} cells, expected {len(COLUMNS)}: {text(row)}")
        wk, dates, _unit, lec, lab, due = c
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
    if not lectures:
        raise RuntimeError(f"{page} no longer parses: no lectures in the week table")
    return lectures


def load_lectures():
    """The schedule's lectures in order (prelecture.py imports this)."""
    return parse_schedule(get(SITE + "/schedule").decode())


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


def save(path, data):
    """Write bytes through a .part file and os.replace, so a killed run never leaves a partial file."""
    part = path.with_name(path.name + ".part")
    part.write_bytes(data)
    os.replace(part, path)


def fetch_deck(L):
    """Download lecture L's deck and extract its text beside it; returns (pdf_path, txt_path).
    The PDF is parsed and its text extracted before anything is written, and both files go through
    save(), so the cache only ever holds decks that parse. A PDF cached without its .txt (a run killed
    between the two writes) is extracted from the cache instead of downloaded again."""
    SLIDES.mkdir(parents=True, exist_ok=True)
    pdf = SLIDES / (slug(L) + ".pdf")
    txt = pdf.with_suffix(".txt")
    if pdf.exists() and txt.exists():
        return pdf, txt
    try:
        from pypdf import PdfReader
    except ImportError as e:
        raise ImportError("deck text needs pypdf: python3 -m pip install --user pypdf") from e
    cached = pdf.exists()
    data = pdf.read_bytes() if cached else get(L["pdf"])
    try:
        text = "\n".join(f"--- slide {i} ---\n{(p.extract_text() or '').strip()}"
                         for i, p in enumerate(PdfReader(io.BytesIO(data)).pages, 1))
    except Exception as e:   # an HTML page, a short body, a corrupt file: write nothing
        where = f"{pdf} (a bad cached copy: delete it and re-run)" if cached else L["pdf"]
        raise RuntimeError(f"{where} is not a readable PDF: {e}; it starts with {data[:40]!r}") from e
    save(pdf, data)
    save(txt, text.encode())
    return pdf, txt


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lecture", type=int)
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--no-snapshot", action="store_true")
    a = ap.parse_args()

    lectures = load_lectures()
    today = dt.date.today()

    if a.lecture:
        L = next((x for x in lectures if x["n"] == a.lecture), None)
        if not L:
            sys.exit(f"no lecture {a.lecture} on the schedule")
        print(f"Lecture {L['n']} — {L['title']} ({L['date']}, week {L['week']})")
        if L["pdf"]:
            pdf, txt = fetch_deck(L)
            print(f"Deck: {L['pdf']}\nSaved: {pdf}\n")
            print(txt.read_text())
        else:
            print("Deck: not posted yet — re-run when the schedule links it.")
        return

    if a.all:
        for L in lectures:
            print(f"{L['n']:>2} {L['date']} {L['title']:<45} {'deck' if L['pdf'] else '----'}")
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
                logged = L["n"] in term.lecture_logs("CPSC310")
                out.append(f"NEW DECK  lec {L['n']} {L['title']} ({L['date']}) → {txt.name}"
                           + ("" if logged else "  ← not logged yet: `cpsc310_site.py --lecture %d`" % L["n"]))
            elif n in prev_rows:
                out.append(f"CHANGED   lec {n}: {prev_rows[n]}  →  {row}")
            elif prev_rows:
                out.append(f"ADDED     lec {n}: {row}")
    for n in prev_rows:
        if n not in cur_rows:
            out.append(f"REMOVED   lec {n}: {prev_rows[n]}")
    prev_proj = prev.get("project", [])
    try:
        project = parse_project()
        proj_urls = [u for _, u in project]
    except Exception as e:
        project, proj_urls = [], prev_proj   # keep the last list, or the next run announces every spec as new
        out.append(f"(project page unreachable: {e})")
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
        print(f"  Next lecture ({when}): lec {nxt['n']} {nxt['title']}")
        print(f"    deck: {'posted' if nxt['pdf'] else 'not posted'}")
    if not a.no_snapshot:
        SNAP.parent.mkdir(parents=True, exist_ok=True)
        save(SNAP, json.dumps({"checked": today.isoformat(), "rows": cur_rows, "project": proj_urls}, indent=1).encode())


if __name__ == "__main__":
    main()
