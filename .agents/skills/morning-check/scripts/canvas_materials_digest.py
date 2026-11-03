#!/usr/bin/env python3
"""canvas_materials_digest.py — list the module items painted by canvas_materials.js that are not marked yet.

Usage:
  canvas_materials_digest.py <file>                  list them, grouped by course
  canvas_materials_digest.py <file> --mark KEY ...   mark items done (KEY = COURSE:item, as the list prints it)
<file> is the get_page_text output (routines/snapshots/materials-<date>.txt). Its
"### title | type | item=ID | file=ID | page=slug" lines are compared with routines/snapshots/materials-seen.json.
The list shows each item's key, the file ids canvadoc_text.js needs and any FILE/VIDEO lines under it, and it
writes nothing: an item stays listed until --mark records it. The morning check marks an item once its outline
or reading file is written, or at once when there is nothing to pull, so a failed pull is listed again next run.
--mark takes only keys of items in <file>.
A request canvas_materials.js could not load is an ERR line: `ERR modules …` under a course, `  ERR page …` under
a page's item. The list still prints every new item, then names each failed course and request and exits 1. An
item whose page did not load shows its ERR line, and --mark refuses it, because its deck may be what failed.
The painted text ends with "END <n> items". Text without that line was cut off (get_page_text stops at about 50k
characters), and text holding a different number of items lost or repeated a chunk: either way it exits 1 before
listing or marking anything.
"""
import argparse, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("SCHOOL_ROOT") or os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
SEEN = os.path.join(ROOT, "routines", "snapshots", "materials-seen.json")
ITEM = re.compile(r"^### (.+?) \| (\w+) \| item=(\d+)(?: \| file=(\d+))?(?: \| page=(\S+))?")

def parse(text):
    """Every item in the painted text, in order, with the FILE/VIDEO/ERR lines printed under it, and one
    "COURSE request failed (error)" per request that did not load."""
    course, module, items, cur, failed = None, None, [], None, []
    for line in text.splitlines():
        sub = line.strip()   # FILE/VIDEO/ERR page lines are painted indented, and Chrome's innerText drops the indent
        if line.startswith("#### "):
            course, module, cur = line[5:].strip(), None, None
        elif line.startswith("ERR modules "):
            failed.append(f"{course} modules failed ({line[12:].strip()})")
        elif line.startswith("## MODULE: "):
            module, cur = line[11:].strip(), None
        elif line.startswith("### "):
            m = ITEM.match(line)
            cur = None
            if not m:
                continue
            title, typ, item, fid, page = m.groups()
            cur = {"key": f"{course}:{item}", "course": course, "module": module, "title": title, "type": typ, "item": item, "file": fid, "page": page, "extra": [], "page_failed": False}
            items.append(cur)
        elif cur is not None and sub.startswith("ERR page "):
            cur["extra"].append(sub)
            cur["page_failed"] = True
            failed.append(f"{course} page {cur['page']} failed ({sub[9:]})")
        elif cur is not None and sub.startswith(("FILE ", "VIDEO ")):
            cur["extra"].append(sub)
    return items, failed

def save(seen):
    """Write through a .tmp file and os.replace, so a killed run never leaves half a file."""
    os.makedirs(os.path.dirname(SEEN), exist_ok=True)
    tmp = SEEN + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(seen, f, indent=1, ensure_ascii=False)
    os.replace(tmp, SEEN)

def main():
    ap = argparse.ArgumentParser(description="List the Canvas lecture-material items not marked yet, or mark some.")
    ap.add_argument("file", help="the get_page_text output of canvas_materials.js")
    ap.add_argument("--mark", nargs="+", metavar="KEY", help="mark these items done, e.g. STAT251:9470012")
    a = ap.parse_args()
    text = open(a.file, encoding="utf-8").read()
    items, failed = parse(text)
    end = re.search(r"^END (\d+) items$", text, re.M)
    if not end:
        sys.exit(f"materials: {a.file} has no 'END <n> items' line, so the read-back was cut off. Read the page back in "
                 "chunks as SKILL.md §2 does for canvas_fetch.js (get_page_text, then window.__chunk(i) and get_page_text "
                 "for each next chunk) until the END line arrives, save all of them and run this again.")
    if int(end[1]) != len(items):
        sys.exit(f"materials: {a.file} holds {len(items)} items but its END line says {end[1]}, so a chunk is missing "
                 "or repeated. Read the chunks back again, save them in order and run this again.")
    seen = json.load(open(SEEN)) if os.path.exists(SEEN) else {}
    if a.mark:
        by_key = {n["key"]: n for n in items}
        unknown = [k for k in a.mark if k not in by_key]
        if unknown:
            sys.exit(f"not an item in {a.file}: {' '.join(unknown)}")
        unloaded = [k for k in a.mark if by_key[k]["page_failed"]]
        if unloaded:
            sys.exit(f"page did not load in {a.file}, so it stays unmarked for the next run: {' '.join(unloaded)}")
        for k in a.mark:
            n = by_key[k]
            seen[k] = {"title": n["title"], "module": n["module"], "file": n["file"]}
            print(f"marked {k} [{n['module']}] {n['title']}")
        save(seen)
        return
    new = [n for n in items if n["key"] not in seen]
    if not new and not failed:
        print("materials: nothing new")
        return
    by = {}
    for n in new:
        by.setdefault(n["course"], []).append(n)
    for c, group in by.items():
        print(f"== {c}: {len(group)} new")
        for n in group:
            fid = n["file"] or next((e.split("-> ")[-1] for e in n["extra"] if e.startswith("FILE")), None)
            print(f"   - {n['key']} [{n['module']}] {n['title']} ({n['type']})" + (f" · file {fid} → pull with canvadoc_text.js" if fid else ""))
            for e in n["extra"]:
                print(f"       {e}")
    if new:
        print("Mark each item with --mark once its outline or reading file is written, or straight away if it has nothing "
              "to pull. A failed pull stays unmarked.", flush=True)
    if failed:   # after the list, so one course's failure never hides another's new items
        sys.exit("\n".join(f"materials: {f}" for f in failed))

if __name__ == "__main__":
    main()
