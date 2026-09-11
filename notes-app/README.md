# School 3-1 notes

Vite + React + TypeScript viewer for the markdown in the parent folder (`../courses`, `../ledger.md`).
Hash routing, client-side search, question banks rendered as cards with hidden answers.

## Run locally
```bash
npm install
npm run dev        # http://localhost:8765
npm run typecheck
```

## Deploy
Live at https://matthlh.github.io/school-3-1/ — `.github/workflows/pages.yml` builds and deploys on every push to `main`.
The build bundles every markdown file into `dist/`, so any static host only needs the repo and a build step:

| Setting | Value |
|---|---|
| Root directory | `notes-app` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node | 20+ |

`base` is `./` in `vite.config.ts`, so the same build works at a domain root or under a sub-path
(GitHub Pages). Morning briefs (`routines/runs/`) are git-ignored and never reach the build.
