#!/usr/bin/env python3
"""Complete a Things3 to-do by exact title or by id.  things_done.py --title "Log STAT251 lec 2 (Sep 11)" | --id <id>"""
import argparse, subprocess
ap = argparse.ArgumentParser()
ap.add_argument("--title"); ap.add_argument("--id"); ap.add_argument("--project")
a = ap.parse_args()
esc = lambda s: (s or "").replace("\\", "\\\\").replace('"', '\\"')
if a.id:
    body = f'set t to to do id "{esc(a.id)}"'
else:
    scope = f'to dos of project "{esc(a.project)}"' if a.project else "to dos"
    body = f'set t to item 1 of ({scope} whose name is "{esc(a.title)}" and status is open)'
r = subprocess.run(["osascript", "-e", f'tell application "Things3"\n{body}\nset status of t to completed\nreturn "completed: " & name of t\nend tell'], capture_output=True, text=True)
print(r.stdout.strip() or r.stderr.strip())
