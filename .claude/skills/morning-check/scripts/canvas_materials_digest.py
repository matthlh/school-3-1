#!/usr/bin/env python3
"""canvas_materials_digest.py — diff the text painted by canvas_materials.js against what was seen before.

Usage: canvas_materials_digest.py <file-with-get_page_text-output>
Reads the "### title | type | item=ID | file=ID | page=slug" lines, compares item ids with
routines/snapshots/materials-seen.json, prints the NEW items grouped by course (with the file ids
canvadoc_text.js needs and any FILE/VIDEO lines under them), then records them as seen.
Pass --dry to print without recording. Exit code 0 always.
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("SCHOOL_ROOT") or os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
SEEN = os.path.join(ROOT, "routines", "snapshots", "materials-seen.json")
ITEM = re.compile(r"^### (.+?) \| (\w+) \| item=(\d+)(?: \| file=(\d+))?(?: \| page=(\S+))?")

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry = "--dry" in sys.argv
    if not args:
        print(__doc__); return
    text = open(args[0], encoding="utf-8").read()
    seen = json.load(open(SEEN)) if os.path.exists(SEEN) else {}
    course, module, new, cur = None, None, [], None
    for line in text.splitlines():
        if line.startswith("#### "):
            course, module, cur = line[5:].strip(), None, None
        elif line.startswith("## MODULE: "):
            module, cur = line[11:].strip(), None
        elif line.startswith("### "):
            m = ITEM.match(line)
            cur = None
            if not m:
                continue
            title, typ, item, fid, page = m.groups()
            key = f"{course}:{item}"
            if key in seen:
                continue
            cur = {"course": course, "module": module, "title": title, "type": typ, "item": item, "file": fid, "page": page, "extra": []}
            new.append(cur)
        elif cur is not None and (line.startswith("  FILE ") or line.startswith("  VIDEO ")):
            cur["extra"].append(line.strip())
    if not new:
        print("materials: nothing new since last run")
    else:
        by = {}
        for n in new:
            by.setdefault(n["course"], []).append(n)
        for c, items in by.items():
            print(f"== {c}: {len(items)} new")
            for n in items:
                fid = n["file"] or next((e.split("-> ")[-1] for e in n["extra"] if e.startswith("FILE")), None)
                print(f"   - [{n['module']}] {n['title']} ({n['type']})" + (f" · file {fid} → pull with canvadoc_text.js" if fid else ""))
                for e in n["extra"]:
                    print(f"       {e}")
    if not dry:
        for n in new:
            seen[f"{n['course']}:{n['item']}"] = {"title": n["title"], "module": n["module"], "file": n["file"]}
        os.makedirs(os.path.dirname(SEEN), exist_ok=True)
        json.dump(seen, open(SEEN, "w"), indent=1, ensure_ascii=False)

if __name__ == "__main__":
    main()
