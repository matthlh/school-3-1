#!/bin/sh
# Commit whatever changed in the workspace, sync with GitHub, push. GitHub Pages rebuilds the notes
# site from main within about a minute. Safe to run any time: exits quietly when nothing changed.
# Usage: sh publish.sh ["commit message"]
#
# Why the fetch/rebase: two sessions (or a web edit on github.com) can move main between our commit
# and our push. Rebasing our commit onto GitHub's main makes the push succeed anyway. If the two
# touched the same lines, the rebase is aborted, the local commit is kept, and the files are named.
cd "$(dirname "$0")" || exit 1

gitdir=$(git rev-parse --git-dir) || exit 1
if [ -d "$gitdir/rebase-merge" ] || [ -d "$gitdir/rebase-apply" ]; then
  echo "publish: a rebase is already in progress — run git rebase --continue (after fixing) or git rebase --abort, then retry" >&2
  exit 1
fi
if [ -n "$(git diff --name-only --diff-filter=U)" ]; then
  echo "publish: unresolved conflict markers in: $(git diff --name-only --diff-filter=U | xargs)" >&2
  exit 1
fi

# 1. Commit local changes, if any.
committed=
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -q -m "${1:-Update notes $(date '+%Y-%m-%d %H:%M')}" || exit 1
  committed=1
fi

# 2. See what GitHub has.
if ! git fetch -q origin; then
  echo "publish: ${committed:+committed, but }couldn't reach GitHub (offline?). Retry later: sh publish.sh" >&2
  exit 1
fi
ahead=$(git rev-list --count origin/main..HEAD)
behind=$(git rev-list --count HEAD..origin/main)

# 3. Nothing of ours to push: fast-forward to GitHub if it moved, and stop.
if [ "$ahead" -eq 0 ]; then
  if [ "$behind" -gt 0 ]; then
    git merge -q --ff-only origin/main || exit 1
    echo "publish: nothing to push; pulled $behind new commit(s) from GitHub"
  else
    echo "publish: nothing to publish"
  fi
  exit 0
fi

# 4. GitHub moved since our last sync: replay our commit(s) on top of it.
if [ "$behind" -gt 0 ]; then
  if ! git rebase -q origin/main >/dev/null 2>&1; then
    conflicts=$(git diff --name-only --diff-filter=U | xargs)
    git rebase --abort
    echo "publish: committed locally, but GitHub has newer changes that conflict in: ${conflicts:-(unknown)}" >&2
    echo "publish: resolve by hand: git pull --rebase origin main, fix the files, git add -A, git rebase --continue, sh publish.sh" >&2
    exit 1
  fi
  echo "publish: rebased onto $behind new commit(s) from GitHub"
fi

# 5. Push.
if git push -q origin main; then
  echo "publish: pushed $(git rev-parse --short HEAD) — site redeploys in about a minute"
else
  echo "publish: committed but the push failed. Retry later: sh publish.sh" >&2
  exit 1
fi
