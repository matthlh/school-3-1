#!/usr/bin/env python3
"""prelecture.py — stage pre-lecture material for the next CPSC 310 lectures.

Runs cpsc310_site.py --all, takes the next N lectures dated today or later that have no
courses/CPSC310/lectures/NN-*.md or _NN-*.md yet, fetches each reader chapter as plain text into
routines/prelecture/cpsc310/NN-<slug>.txt (git-ignored) and prints one block per lecture for the
brief: number, date, title, the question it answers, and the reader chapter headings. When the deck
is already posted it also runs cpsc310_site.py --lecture N so the deck text lands in
routines/slides/cpsc310/. The morning-check skill turns the staged text into
lectures/_NN-<slug>.md (plain-sentence outline + 3 pre-lecture questions).

Usage: prelecture.py [--n 2] [--force] [--print]   (--print dumps the chapter text too)
"""
import argparse, datetime as dt, html, os, re, subprocess, sys, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("SCHOOL_ROOT") or os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
SITE = os.path.join(HERE, "cpsc310_site.py")
LECT_DIR = os.path.join(ROOT, "courses", "CPSC310", "lectures")
OUT_DIR = os.path.join(ROOT, "routines", "prelecture", "cpsc310")
LINE = re.compile(r"^\s*(\d+)\s+(\d{4}-\d{2}-\d{2})\s+(.+?)\s{2,}(deck|----)\s+(.*)$")
READER = re.compile(r"([^<·]+?)\s*<(https?://[^>]+)>")

def fetch_text(url):
    raw = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read().decode("utf-8", "replace")
    m = re.search(r"<article.*?</article>", raw, re.S) or re.search(r"<main.*?</main>", raw, re.S)
    body = m.group(0) if m else raw
    body = re.sub(r"<(script|style|nav|footer)[^>]*>.*?</\1>", " ", body, flags=re.S)
    body = re.sub(r"<h1[^>]*>", "\n\n# ", body); body = re.sub(r"<h[2-4][^>]*>", "\n\n## ", body)
    body = re.sub(r"</h[1-4]>", "\n", body)
    body = re.sub(r"</?(p|li|div|tr|br|blockquote|pre)[^>]*>", "\n", body)
    body = re.sub(r"<[^>]+>", "", body)
    body = html.unescape(body).replace("​", "")
    body = re.sub(r"[ \t]+", " ", body)
    return re.sub(r"\n\s*\n\s*\n+", "\n\n", body).strip()

def logged(n):
    if not os.path.isdir(LECT_DIR):
        return False
    return any(re.match(rf"^_?{n:02d}-", f) for f in os.listdir(LECT_DIR))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--n", type=int, default=2)
    ap.add_argument("--force", action="store_true", help="stage even if a lecture file exists")
    ap.add_argument("--print", action="store_true", dest="dump")
    a = ap.parse_args()
    today = dt.date.today()
    out = subprocess.run([sys.executable, SITE, "--all", "--no-snapshot"], capture_output=True, text=True).stdout
    picked = []
    for line in out.splitlines():
        m = LINE.match(line)
        if not m:
            continue
        n, d, title, deck, rest = int(m.group(1)), dt.date.fromisoformat(m.group(2)), m.group(3).strip(), m.group(4), m.group(5)
        if d < today or (logged(n) and not a.force):
            continue
        picked.append((n, d, title, deck == "deck", READER.findall(rest)))
        if len(picked) >= a.n:
            break
    if not picked:
        print("prelecture: nothing to stage (next lectures already have files)")
        return
    os.makedirs(OUT_DIR, exist_ok=True)
    for n, d, title, has_deck, readers in picked:
        slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
        path = os.path.join(OUT_DIR, f"{n:02d}-{slug}.txt")
        chunks = []
        for name, url in readers:
            try:
                chunks.append(f"##### READER: {name.strip()} <{url}>\n\n" + fetch_text(url))
            except Exception as e:  # noqa
                chunks.append(f"##### READER: {name.strip()} <{url}>\n\nERROR {e}")
        text = "\n\n".join(chunks) if chunks else "(no reader chapter listed)"
        with open(path, "w", encoding="utf-8") as f:
            f.write(f"# CPSC 310 lecture {n} — {title} ({d.isoformat()})\n\n{text}\n")
        if has_deck:
            subprocess.run([sys.executable, SITE, "--lecture", str(n), "--no-snapshot"], capture_output=True, text=True)
        heads = [ln[3:].strip() for ln in text.splitlines() if ln.startswith("## ")]
        days = (d - today).days
        print(f"== CPSC 310 lecture {n} · {title} · {d.strftime('%a %b %-d')} ({'today' if days == 0 else f'in {days} d'}) · deck {'posted' if has_deck else 'not posted'}")
        for name, url in readers:
            print(f"   reader: {name.strip()} <{url}>")
        if heads:
            print("   headings: " + " · ".join(heads[:12]))
        print(f"   staged: {os.path.relpath(path, ROOT)} ({len(text)} chars)"
              + (" · write lectures/_%02d-%s.md" % (n, slug) if not logged(n) else ""))
        if a.dump:
            print(text)
    print("\nNext: write courses/CPSC310/lectures/_NN-<slug>.md from the staged text — plain-sentence outline of the chapter's claims + 3 pre-lecture questions. Do not add quiz-bank questions until the lecture is logged.")

if __name__ == "__main__":
    main()
