#!/usr/bin/env python3
"""prelecture.py — stage pre-lecture material for the next CPSC 310 lectures.

Takes the next N lectures from cpsc310_site.load_lectures() dated today or later that have no log
(term.lecture_logs, so `05-06-…` covers 6) or _NN-*.md outline in courses/CPSC310/lectures/ yet,
downloads each posted deck with cpsc310_site.fetch_deck() (text extracted into
routines/slides/cpsc310/) and prints one block per lecture: number, title, date, and the deck
text's path, or that the deck is not posted yet. Decks go up on lecture day between about 10:40 and
12:00, after the morning check. When a picked lecture has no deck, the run ends with the reader's
contents: the chapter titles and URLs of the reader index's sidebar, which VitePress renders from
the site's config.ts (nothing on the site maps lectures to chapters since 2026-09-28, so the skill
picks the chapter whose title best matches the lecture title).

--chapter N URL fetches that reader chapter into routines/prelecture/cpsc310/NN-<slug>.txt: the
page's article, one line per heading (`## …`), paragraph, list item or code line. The skills write
lectures/_NN-<slug>.md (a plain-sentence outline) from the chapter text, and again from the deck
text once the deck is posted; the deck wins. A schedule, deck, reader index or chapter that cannot
be fetched or no longer parses raises, naming the URL, and the run exits non-zero before any block
prints.

Usage: prelecture.py [--n 2] [--force]
       prelecture.py --chapter N URL
"""
import argparse, datetime as dt, glob, os, re, sys

import cpsc310_site, term

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("SCHOOL_ROOT") or os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
LECT_DIR = os.path.join(ROOT, "courses", "CPSC310", "lectures")
READER = cpsc310_site.BASE + "/310/textbook/"
CHAPTERS = cpsc310_site.ROOT / "routines/prelecture/cpsc310"
BLOCK = r"</?(?:h[1-6]|p|li|ul|ol|pre|div|table|tr|blockquote|details|summary)\b"   # each one starts a new line of chapter text

def has_file(n):
    """A log covers lecture n (ranges count) or its `_NN-…` outline is staged."""
    return n in term.lecture_logs("CPSC310") or bool(glob.glob(os.path.join(LECT_DIR, f"_{n:02d}-*.md")))

def reader_contents():
    """→ [(level, title, url)] of the reader pages in the reader index's sidebar, in nav order.
    VitePress renders config.ts's /textbook/ sidebar as nested `VPSidebarItem level-N` blocks: a part
    (Software Design) is level 0 and its chapters level 1, and the top-level links without children
    (Introduction) are gathered into an untitled level-0 group, so they are level 1 too. Links out of
    the reader (← Back to 26W1) and the index itself are skipped."""
    doc = cpsc310_site.get(READER).decode()
    nav = re.search(r'<nav\b[^>]*\bid="VPSidebarNav".*?</nav>', doc, flags=re.S)
    if not nav:
        raise RuntimeError(f"{READER} no longer parses: no sidebar (nav#VPSidebarNav)")
    out = []
    for item in nav.group(0).split('class="VPSidebarItem ')[1:]:   # one chunk per item, up to the next item
        m = re.match(r'level-(\d+)\b.*?<a\b[^>]*\bhref="(/310/textbook/[^"#]+)"[^>]*>(.*?)</a>', item, flags=re.S)
        if m:
            out.append((int(m.group(1)), cpsc310_site.text(m.group(3)), cpsc310_site.abs_url(m.group(2))))
    if not out:
        raise RuntimeError(f"{READER} no longer parses: the sidebar links no reader chapters")
    return out

def stage_chapter(L, url):
    """Fetch reader chapter `url` for lecture L into routines/prelecture/cpsc310/; returns its path.
    VitePress renders a page's markdown into div.vp-doc inside <main>. Each block element starts a new
    line (code lines already are), headings get `#` marks, and cpsc310_site.text() cleans each line."""
    doc = cpsc310_site.get(url).decode("utf-8", "replace")
    m = re.search(r'<div\b[^>]*\bclass="vp-doc\b[^"]*"[^>]*>(.*?)</main>', doc, flags=re.S)
    body = re.sub(r'<a\b[^>]*\bclass="header-anchor"[^>]*>.*?</a>', "", m.group(1) if m else "", flags=re.S)   # the permalink after each heading
    body = re.sub(f"(?={BLOCK})", "\n", body)
    body = re.sub(r"<h([1-6])\b[^>]*>", lambda h: "#" * int(h.group(1)) + " ", body)
    lines = [line for line in map(cpsc310_site.text, body.split("\n")) if line]
    if not lines:
        raise RuntimeError(f"{url} no longer parses: no article text (div.vp-doc inside <main>)")
    CHAPTERS.mkdir(parents=True, exist_ok=True)
    path = CHAPTERS / (cpsc310_site.slug(L) + ".txt")
    cpsc310_site.save(path, (f"# CPSC 310 lecture {L['n']} — {L['title']} ({L['date']})\nReader chapter: {url}\n\n"
                             + "\n".join(lines) + "\n").encode())
    return path

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--n", type=int, default=2)
    ap.add_argument("--force", action="store_true", help="stage even if a lecture file exists")
    ap.add_argument("--chapter", nargs=2, metavar=("N", "URL"), help="fetch reader chapter URL as lecture N's text")
    a = ap.parse_args()
    if a.chapter:
        n, url = a.chapter
        if not n.isdigit() or url == READER or not url.startswith(READER):
            ap.error(f"--chapter takes a lecture number and a chapter URL under {READER}, got {n} {url}")
        L = next((x for x in cpsc310_site.load_lectures() if x["n"] == int(n)), None)
        if not L:
            sys.exit(f"no lecture {n} on the schedule")
        path = stage_chapter(L, url)
        print(f"== CPSC 310 lecture {L['n']} · {L['title']} · reader chapter {url}")
        print(f"   chapter text: {path.relative_to(cpsc310_site.ROOT)} · write lectures/_{cpsc310_site.slug(L)}.md from it")
        return
    today = dt.date.today()
    picked = []
    for L in cpsc310_site.load_lectures():
        if not L["date"] or dt.date.fromisoformat(L["date"]) < today or (has_file(L["n"]) and not a.force):
            continue
        picked.append(L)
        if len(picked) >= a.n:
            break
    if not picked:
        print("prelecture: nothing to stage (next lectures already have files)")
        return
    decks = {L["n"]: cpsc310_site.fetch_deck(L)[1] for L in picked if L["pdf"]}   # every download before any block prints
    contents = reader_contents() if any(not L["pdf"] for L in picked) else []
    for L in picked:
        n, d, title, has_deck = L["n"], dt.date.fromisoformat(L["date"]), L["title"], bool(L["pdf"])
        days = (d - today).days
        print(f"== CPSC 310 lecture {n} · {title} · {d.strftime('%a %b %-d')} ({'today' if days == 0 else f'in {days} d'}) · deck {'posted' if has_deck else 'not posted'}")
        if has_deck:
            print(f"   deck text: {decks[n].relative_to(cpsc310_site.ROOT)}"
                  + (f" · write lectures/_{cpsc310_site.slug(L)}.md" if not has_file(n) else ""))
        else:
            print(f"   no deck yet: a reader chapter from the contents below is staged with --chapter {n} URL")
    if contents:
        print(f"\nReader contents ({READER}):")
        for level, title, url in contents:
            print(f"   {'  ' * level}{title}  {url}")
    print("\nNext: write courses/CPSC310/lectures/_NN-<slug>.md, a plain-sentence outline, from each posted deck's text, or from the reader chapter --chapter staged when there is no deck yet. The deck wins: an outline built from a reader chapter is rebuilt from the deck once it is posted. Do not add quiz-bank questions until the lecture is logged.")

if __name__ == "__main__":
    main()
