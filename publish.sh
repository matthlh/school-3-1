#!/bin/sh
# Commit whatever changed in the workspace and push. GitHub Pages rebuilds the notes site from
# main within about a minute. Safe to run any time: exits quietly when there is nothing to commit.
# Usage: sh publish.sh ["commit message"]
cd "$(dirname "$0")" || exit 1
if [ -z "$(git status --porcelain)" ]; then
  echo "publish: nothing to commit"
  exit 0
fi
git add -A
git commit -q -m "${1:-Update notes $(date '+%Y-%m-%d %H:%M')}" || exit 1
if git push -q origin main; then
  echo "publish: pushed $(git rev-parse --short HEAD) — site redeploys in about a minute"
else
  echo "publish: committed but the push failed (offline?). Retry later with: git push origin main" >&2
  exit 1
fi
