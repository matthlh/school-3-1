# CPSC310 — Topic Ledger

Every topic gets a row. Claude updates `Last`, `Grade`, `Streak`, and `Next` after each quiz.

**Grade key:** `X` missed · `~` shaky · `O` solid
**Spacing ladder:** X → +1d · ~ → +3d · O(1) → +7d · O(2) → +16d · O(3+) → +35d

| # | Topic | Lec | Added | Last | Grade | Streak | Next | Notes |
|---|-------|-----|-------|------|-------|--------|------|-------|
| 1 | What SE is — "managing what a change costs" · changing requirements as the driver · code vs software · analytical code design | 1 | 2026-09-11 | 2026-09-16 | X | 0 | 2026-09-17 | reader: Intro + ACD intro |
| 2 | Three fluencies (decomposition · requirements · validation) | 1 | 2026-09-11 | 2026-09-17 | X | 0 | 2026-09-18 | reader intro; roadmap/objectives pruned 2026-09-14 |
| 3 | Lab 1 HTTP & PUT — status codes 200/201/204/400/404/422 · 400 vs 422 · PUT idempotence vs POST | Lab 1 | 2026-09-14 | — | — | 0 | 2026-09-15 | PrairieLearn LAB01.1–3 |
| 4 | Lab 1 request path & async — route/handler/path param/middleware · req vs res · validator critique (repeated blocks, strings untied to the spec) · event loop, async propagation, missing await | Lab 1 | 2026-09-14 | — | — | 0 | 2026-09-15 | PrairieLearn LAB01.3–6 |
| 5 | Coupling & connascence — coupling axes (degree · locality · strength) · five connascence types (name/type/value/position/algorithm), increasing cost of change · addressing coupling (cut interfaces, cut distance, weaken connascence) | 2 | 2026-09-16 | — | — | 0 | 2026-09-17 | reader: Change Difficulty |
