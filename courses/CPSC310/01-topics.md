# CPSC310 — Topic Ledger

Every topic gets a row. Claude updates `Last`, `Grade`, `Streak`, and `Next` after each quiz.

**Grade key:** `X` missed · `~` shaky · `O` solid
**Spacing ladder:** X → +1d · ~ → +3d · O(1) → +7d · O(2) → +16d · O(3+) → +35d

| # | Topic | Lec | Added | Last | Grade | Streak | Next | Notes |
|---|-------|-----|-------|------|-------|--------|------|-------|
| 1 | What SE is — "managing what a change costs" · changing requirements as the driver · code vs software · analytical code design | 1 | 2026-09-11 | 2026-09-19 | X | 0 | 2026-09-20 | reader: Intro + ACD intro |
| 2 | Three fluencies (decomposition · requirements · validation) | 1 | 2026-09-11 | 2026-09-19 | X | 0 | 2026-09-20 | reader intro; roadmap/objectives pruned 2026-09-14 |
| 3 | Lab 1 HTTP & PUT — status codes 200/201/204/400/404/422 · 400 vs 422 · PUT idempotence vs POST | Lab 1 | 2026-09-14 | 2026-09-19 | ~ | 0 | 2026-09-22 | PrairieLearn LAB01.1–3 |
| 4 | Lab 1 request path & async — route/handler/path param/middleware · req vs res · validator critique (repeated blocks, strings untied to the spec) · event loop, async propagation, missing await | Lab 1 | 2026-09-14 | 2026-09-19 | ~ | 0 | 2026-09-22 | PrairieLearn LAB01.3–6 |
| 5 | Coupling & connascence — coupling axes (degree · locality · strength) · five connascence types (name/type/value/position/algorithm), increasing cost of change · addressing coupling (cut interfaces, cut distance, weaken connascence) | 2 | 2026-09-16 | — | — | 0 | 2026-09-17 | reader: Change Difficulty |
| 6 | Cohesion & bindings — the deck's three bindings (data · logic · order; the reader's prose says timing) · low cohesion's difficulty (reading unrelated code) and risk (edits hit unrelated features) · Util box vs one controller per feature · a statement with no binding is the extraction candidate · reader's tell: a field used by few methods | 3 | 2026-09-17 | — | — | 0 | 2026-09-18 | reader: Change Difficulty (cohesion section) |
| 7 | Refactoring — predictable, meaning-preserving transformation · reader's four steps vs deck's six (tests before and after) · don't refactor when tests fail, when rewriting, near deadlines, while fixing a bug · opportunistic timeline · rule of three · technical debt triggers · Fowler's catalogue · Invoice getOwing and IParser examples · Parkboard FEAT-0002 v1 vs v2 | 3 | 2026-09-17 | — | — | 0 | 2026-09-18 | reader: Refactoring |
