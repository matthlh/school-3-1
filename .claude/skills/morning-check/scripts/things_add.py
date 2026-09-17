#!/usr/bin/env python3
"""Add or update a Things3 to-do safely (idempotent by title within the target list).

Usage:
  things_add.py --title "WeBWorK 1" --project "STAT 251" [--area UBC] [--when 2026-09-14] \
                [--deadline 2026-09-21] [--notes "..."] [--tags "School,URGENT"] [--dry-run]
  --when / --deadline take YYYY-MM-DD. --when today|tomorrow|evening also work.
If a to-do with the same title already exists in that project (or area, or anywhere if neither),
it is updated in place instead of duplicated. When a project or area is given and nothing matches
inside it, a loose to-do with that title anywhere is updated and filed, rather than copied. Prints the resulting to-do.
Also importable: add_todo(**kwargs) -> str.
"""
import argparse, datetime as dt, subprocess, sys

def _esc(s):
    return (s or "").replace("\\", "\\\\").replace('"', '\\"')

def _date_expr(s):
    """AppleScript expression for a local midnight date, built by arithmetic (locale-proof)."""
    if not s:
        return None
    today = dt.date.today()
    if s == "today":
        n = 0
    elif s == "tomorrow":
        n = 1
    else:
        n = (dt.date.fromisoformat(s) - today).days
    return f"(theBase + ({n}) * days)"

def add_todo(title, project=None, area=None, when=None, deadline=None, notes=None, tags=None, dry_run=False):
    when_expr = _date_expr(when)
    dl_expr = _date_expr(deadline)
    scope = "to dos"
    if project:
        scope = f'to dos of project "{_esc(project)}"'
    elif area:
        scope = f'to dos of area "{_esc(area)}"'
    lines = [
        'tell application "Things3"',
        '  set theBase to current date',
        '  set time of theBase to 0',
        f'  set existing to ({scope} whose name is "{_esc(title)}" and status is open)',
    ]
    if scope != "to dos":
        # The to-do may already exist loose (no project, no area) — updating it is what we want,
        # otherwise filing a loose item under a project/area just makes a tagged copy beside it
        # and the planner keeps flagging the untagged original (Matt, 2026-09-17).
        lines += [
            '  if (count of existing) = 0 then',
            f'    set existing to (to dos whose name is "{_esc(title)}" and status is open)',
            '  end if',
        ]
    lines += [
        '  if (count of existing) > 0 then',
        '    set t to item 1 of existing',
        '  else',
        f'    set t to make new to do with properties {{name:"{_esc(title)}"}}',
        '  end if',
    ]
    if notes is not None:
        lines.append(f'  set notes of t to "{_esc(notes)}"')
    if project:
        lines.append(f'  set project of t to project "{_esc(project)}"')
    elif area:
        lines.append(f'  move t to area "{_esc(area)}"')
    if tags:
        lines.append(f'  set tag names of t to "{_esc(tags)}"')
    if when_expr:
        lines.append(f'  schedule t for {when_expr}')
    if dl_expr:
        lines.append(f'  set due date of t to {dl_expr}')
    lines += [
        '  set pn to ""',
        '  try',
        '    set pn to name of project of t',
        '  end try',
        '  return name of t & " | project=" & pn & " | when=" & (activation date of t as string) & " | deadline=" & (due date of t as string)',
        'end tell',
    ]
    script = "\n".join(lines)
    if dry_run:
        return script
    r = subprocess.run(["osascript", "-e", script], capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip())
    return r.stdout.strip()

def ensure_project(name, area=None, dry_run=False):
    script = "\n".join([
        'tell application "Things3"',
        f'  if not (exists project "{_esc(name)}") then',
        f'    set p to make new project with properties {{name:"{_esc(name)}"}}',
        (f'    move p to area "{_esc(area)}"' if area else ''),
        '  end if',
        f'  return "project ok: {_esc(name)}"',
        'end tell',
    ])
    if dry_run:
        return script
    r = subprocess.run(["osascript", "-e", script], capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip())
    return r.stdout.strip()

def ensure_area(name, dry_run=False):
    script = "\n".join([
        'tell application "Things3"',
        f'  if not (exists area "{_esc(name)}") then make new area with properties {{name:"{_esc(name)}"}}',
        f'  return "area ok: {_esc(name)}"',
        'end tell',
    ])
    if dry_run:
        return script
    r = subprocess.run(["osascript", "-e", script], capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip())
    return r.stdout.strip()

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--title", required=True)
    ap.add_argument("--project")
    ap.add_argument("--area")
    ap.add_argument("--when")
    ap.add_argument("--deadline")
    ap.add_argument("--notes")
    ap.add_argument("--tags")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    print(add_todo(a.title, a.project, a.area, a.when, a.deadline, a.notes, a.tags, a.dry_run))
