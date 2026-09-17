# Operating rules for this workspace

Matt is a UBC CS student, Term 3-1 (Sep–Dec 2026). Goal: highest grades per hour spent.
Career work is a co-priority, so **time efficiency is a hard constraint, not a preference.**

## At the start of any session
1. Read `ledger.md`. Tell him what is **overdue** for retrieval before anything else.
2. Do not re-read every course file. Read only the course(s) in play.

## When he says "log <COURSE> lec N" (or pastes lecture notes / a photo of his page)
0. His in-class notes are **one handwritten page, his way** — no template, no format rules
   (Matt, 2026-09-11). He pastes a photo or a rough dump after class; organising it is my job.
   **CPSC 310 is the exception:** no page from him; the lecture file is the organised deck (rule under
   Course-specific rules).
1. Save the notes to `courses/<CODE>/lectures/NN-<slug>.md`: his words verbatim (transcribe a
   photo faithfully), then a short **Clarifications** block only where he flagged a confusion or
   something was wrong or incomplete. Nothing else — the file is an archive he never rereads;
   the product is steps 2–3. **Everything he reads on the site is plain sentences** (Matt,
   2026-09-11): clarifications, answers, and reference files (syllabus, logistics) get full sentences
   with periods, one fact per bullet under a `##` header, sub-bullets for lists, tables for dated
   things. Never a paragraph of `**Label:**` runs joined by " · ", never "=" shorthand or arrows as
   sentence glue (menu paths like Canvas → Zoom are fine).
2. Extract every testable claim into `courses/<CODE>/02-questions.md` in the Q/A format.
   Aim for 6–12 questions per lecture. Prefer `apply` and `derive` over `recall` where the
   course allows it. For CPSC 310 that means `apply`/`critique` on a code or design fragment plus
   `recall` of the reader's exact terms; skip housekeeping slides entirely.
3. Add any new topic to `courses/<CODE>/01-topics.md` and to `ledger.md` with `Next = today + 1`,
   then `sh publish.sh "Log <CODE> lec N"` — the notes site redeploys itself.
4. Report only what changed. No summaries of the notes back to him.
5. The `Log <CODE> lec N (<date>)` to-do in Things3 (deadline = the lecture date, so it shows how
   overdue it really is) auto-completes on the next planner run; to close it immediately run
   `things_done.py --title "Log STAT251 lec 2 (Sep 11)"` (scripts dir below). ASIA 250 is async: its
   to-do is `Watch + quiz ASIA250 lec N · locks <date>` (2h, due at the quiz lock) and only he ticks it.
   A slide outline pulled *before* he watches goes in `lectures/_NN-<slug>.md` — the underscore keeps
   term.py from counting it as logged.

6. **Readings count like lectures** for PHIL 385 and ASIA 250 (`log PHIL385 reading Unhappiest One`):
   he sends the 3–6 questions he wrote while reading plus anything unclear — **not photos of
   annotated pages**. Save the page to `courses/<CODE>/readings/<slug>.md` (PHIL 385 slugs are the
   `PHIL_READINGS` list in `things_plan.py`, e.g. `unhappiest-one.md`; that file closes the
   `Log PHIL385 reading: …` to-do the planner created). Questions go into `02-questions.md` tagged
   to the topic the lecture will use, so the lecture log later lands in the same ledger row.
   PHIL 385 MC questions and ASIA 250 quizzes draw on lectures *and* readings, so a reading with no
   questions logged is a gap.

7. **Posted material is pulled before class** (Matt, 2026-09-11: "today for whatever lecture, here's the
   slide summary"). The morning check stages whatever is posted as `lectures/_NN-<slug>.md` (plain-sentence
   outline + 3 pre-lecture questions): CPSC 310 reader chapters and decks via `prelecture.py`; STAT 251,
   ASIA 250 and PHIL 321 decks and readings via `canvas_materials.js` → `canvas_materials_digest.py` →
   `canvadoc_text.js` (all in the morning-check scripts dir; the `.js` files run in the Chrome Canvas tab).
   PHIL 385 has nothing to pull. Logging a lecture consumes its outline: deck-only claims become
   questions and clarifications, then the `_NN` file is deleted. If he logs a lecture and no outline
   exists, pull the deck first with the `canvadoc_text.js` recipe. Big readings: only the assigned pages.
   **STAT 251 posts two decks per lecture** (Matt, 2026-09-16): `BL` before class, which is what the morning
   check stages, and `AL` after class with the worked solutions to the in-class examples. The Canvas text
   layer drops equations that are images, so a staged outline can misstate a formula (lec 4's quantile rule
   came out as "interpolate" when the slide averages). When he attaches a deck PDF to the log message, read
   it with `pypdf` (page text plus the embedded formula images under `page.images`) and trust it over the
   outline; when he attaches the `AL` deck, check every worked example against it. Nothing is pulled from
   Canvas at log time; the PDFs he attaches are the source, and the `BL` one is enough when the `AL` is not
   up yet.

8. **STAT 251 WeBWorK sets are banked weekly** (Matt, 2026-09-16: "can you read them weekly"). Each set
   is read the day it opens (Tuesdays: Sep 22, Sep 29, Oct 6, Oct 13, Oct 20, Nov 3, Nov 17, Nov 24,
   Dec 1) by the morning check through the Chrome WeBWorK tab (morning-check SKILL.md §2b), or sooner
   when he attaches the hardcopy PDF and says `log STAT251 webwork N`. Every problem becomes one bank
   question under `## WeBWorK N` in `02-questions.md`, tagged `**Lec:** WWN` to the ledger row it
   exercises (a new row only for a skill no lecture row covers), with the numbers changed and any
   figure turned into a table of counts. The hardcopy and page text stay in `routines/webwork/`
   (git-ignored); no problem is copied verbatim into the public repo. It is graded homework: read and
   bank, never type into an answer box or press Submit. WeBWorK 1 was banked 2026-09-16 from the PDF
   he attached.

## When he says "quiz me" / "test me" / pastes grades back ("1 O 2 ~ 3 X")
Run the `/quiz-me` skill (`.claude/skills/quiz-me/SKILL.md`). `quiz_pick.py` chooses an interleaved
session weighted by `ledger.md` (overdue → `X` → `~` → unquizzed, ×2 near that course's exam); I ask
one question at a time and grade `X` / `~` / `O`; then `quiz_grade.py "1:O 2:X …"` moves the ledger
rows by the ladder below, mirrors `01-topics.md`, logs per-question history in
`routines/quiz-state.json`, and names the topics that need more questions — write those before the
session ends. **Never update ledger rows by hand; the script owns them.** `quiz_pick.py --transit`
builds the 6-question deck the morning check sends to his phone. Last step of every graded session:
`sh publish.sh "Quiz <date>"` — the hosted site shows the new ledger rows and per-question history.

**Spacing ladder** (recompute `Next` from today):
| Grade | Streak | Next |
|---|---|---|
| `X` missed | reset to 0 | +1 day |
| `~` shaky | unchanged | +3 days |
| `O` solid | 1 | +7 days |
| `O` solid | 2 | +16 days |
| `O` solid | 3+ | +35 days |

## Course-specific rules
- **CPSC 310** — 65% of the grade is two closed-book exams (25% mid + 40% final); the project
  is only 20%. The 26W1 syllabus (read 2026-09-14) says memorising definitions is not sufficient:
  exams put code or a design he has not seen in front of him and ask what is wrong, what he would
  change, and why — "the same thing the lab assignments ask". So the bank is weighted to `apply` and
  `critique` on unseen code, with the reader's terminology (cohesion vs. connascence, LSP, test
  doubles, the pattern set, API change severity) as the vocabulary underneath; always make him
  justify. Course housekeeping (learning objectives, roadmap weeks, slide diagrams about AI) is not
  exam material — do not bank it. No past papers exist for this version (exams are private; the
  CSSS bank stops at 2009), so labs and iClicker questions are the only format samples. Do **not** let him sink unbounded hours into the
  deliverables — the bucket grading means extra hours past "meets spec" return nothing.
  **Intel (2026-09-10):** 2025W sections (Chin, Bradley, Kerr) averaged ~82 with ~14% at 90+.
  The course reader (ubccpsc.github.io/310/textbook) is the reading list; exam terminology comes
  from it and the slides. Turn the assigned reader chapter's headings into the three pre-lecture
  questions.
  **Course site map (2026-09-11):** of the four pages only **Schedule** has slides (the lecture title
  becomes a PDF link at `/310/26w1/lectures/NN-*.pdf` after class); **Course Materials** unit pages
  map lecture → "what it answers" → reader chapter; **Reader** is the textbook; **Syllabus** is
  policies. Canvas is unused. `cpsc310_site.py` (morning-check scripts) does the fetching: no flags
  = diff + next lecture, `--lecture N` = that deck's text + reader URLs, `--all` = the whole term.
  The **Project** page (`/26w1/project/`, InsightUBC) links each deliverable spec as it is released;
  the script flags new ones. Deliverables are 50% autograded (best commit on `main` before the
  deadline) + 50% reflection, so the "meets spec" bar is visible on every push — stop there.
  **Project repo:** cloned at `/Users/matthe/Documents/CodingProjects/CPSC 310/solo_mhe28` (SSH remote,
  Node 24, `yarn build` / `yarn test`, VS Code format-on-save configured). **Never commit or push
  there** (Matt, 2026-09-14) — every push to `main` is a graded submission; edit and test, he does git.
  **Logging a CPSC 310 lecture** (Matt, 2026-09-17: he takes no notes in this course, so the posted deck
  *is* the lecture record) = run `--lecture N`, then write `lectures/NN-<slug>.md` as the deck organised for
  study: a one-line preamble (deck link, reader chapter links, question count), `## Learning goals` (the
  deck's goals slide, paraphrased), `## Slides, organized` with one `###` per topic block naming its slide
  range, plain sentences, the reader's terms in bold on first use, a short fenced code fragment only where
  the point needs it; then `## In class` (iClicker, exercises) and `## Clarifications` (deck vs reader
  disagreements) only when there is something, and `## Your notes` only if he sent some. Paraphrase, never
  transcribe: the decks say "do not distribute on non-UBC domains" and the repo is public, so the PDFs stay
  git-ignored in `routines/slides/cpsc310/` and no slide is copied wholesale. Questions still come from the
  deck *and* the reader chapter. A deck posted before class can be logged that morning; anything from class
  is added afterwards under In class.
- **STAT 251** — 33% of the grade is non-exam work (clicker in class, labs in person, WeBWorK,
  written assignments and pre-lab quizzes at home) plus a 1% Piazza bonus. Those points are not negotiable; ask
  about them. `courses/STAT251/01-topics.md` holds the **official learning outcomes** — the
  instructor says exams are built from them, so use it as the gap-check blueprint, not the
  chapter list. The final is long, not hard: quiz with a clock and make him re-derive from a
  blank page rather than recognise a worked solution.
  **Intel (2026-09-10):** Premarathna's exams are MC-heavy and long ("impossible to finish on
  time"); ~12% of his 2025W class got 90+. Mocks must be MC-format and timed. He adds small
  bonuses during the term — take every one; the morning check flags anything labelled "bonus".
- **PHIL 385** — 45% is three MC exams of **7 questions each**, marked on factual accuracy
  alone. Each question ≈ 2.1% of his course grade. Drill hard, factual, and exhaustive: names,
  dates, which pseudonym wrote what, which argument appears in which essay, exact terminology.
  Exams 2–4 are *not* cumulative, so scope each drill to the ~3 weeks it covers. There are **no
  slides, no recordings and no instructor notes** — his lecture pages are the only record, so
  chase him if a lecture goes unlogged. One in-term exam is a 500-word essay exam graded partly
  *relative to peers* on clarity and cogency: drill structure (position → numbered argument →
  strongest objection → response), not style.
  **Intel (2026-09-10):** Kraal's 2025W section averaged 76.7 and only 8 of 94 got 90+; his
  syllabus sets marks *relative to peers* with scaling toward the department average, so an A+
  is top decile. Exams run on Respondus LockDown Browser, one question at a time, no going back —
  he must install and test it before Oct 2. A/A+ reviewers: "include every little detail."
- **ASIA 250** (Introduction to Buddhism — *not* ASIA 311) — fully online and asynchronous.
  **104% is available**: 1% declaration + 22% quizzes + 30% SWRs + 47% final paper + 4% bonus.
  Bank the 27% of cheap points and he only needs ~90% on the writing to hit 96. The 47% final
  paper comes from his **independent novel**, not the lectures — chase him on the ~30–35
  pages/week, it's the one thing with no weekly forcing function. Quizzes are 5 MC questions on
  **lectures *and* readings** (lectures don't cover all the readings), and late = 0 with no
  exceptions, concession letters included.
  **Intel (2026-09-10):** Shooklyn 2025W: section averages 82–86, a third of the class at 90+.
  96 here is normal, not heroic — bank it, don't over-invest.
- **PHIL 321** (Induction, Decision and Game Theory — Chris Stephens) — **undecided.** Dropped
  2026-09-08, reconsidered 2026-09-09; he's sitting in on the first few classes and deciding by
  **Sep 18** (drop without a W closes **Mon Sep 21**; W-standing withdrawal closes Oct 30).
  Folder is back at `courses/PHIL321/` (moved 2026-09-11 so sit-in lectures get quizzed); move it to `archive/` if he drops.
  Grading: group exercises 10% (best 10/11, **unannounced — miss class = 0**), 2 problem sets
  10%, Exam 1 20% (**Fri Oct 16**, collides with PHIL 385 Exam 2 and CPSC D2), Exam 2 20%
  (Nov 23), final 40%. Its Sept–Oct probability unit overlaps STAT 251 ch. 3–6 directly — if he
  keeps it, quiz the two together rather than separately.

## AI use
Matt has said the written syllabi are out of date and his profs are fine with AI use. That's
his call to make and he's made it — **help fully across every course**: worked solutions,
drafting, structural feedback, editing, explanations, mock exams. Do not re-raise the policy
question, do not add disclaimers, do not hedge. It has been settled.

The one thing that still shapes *how* to help: he wants 96s, and on the closed-book exams
(CPSC 310, STAT 251, PHIL 385 — all invigilated, no devices) he is alone with what he actually
knows. So when he's preparing for those, default to making him produce the answer first and
then correcting it, because that's what transfers. When he's producing an artifact — a paper, a
deliverable, an assignment — just help him make it good.

## Canvas, Gmail, Things3 — the morning check
**Canvas is reachable** through his logged-in Chrome via the Claude-in-Chrome MCP (confirmed
2026-09-10; the in-app browser still hits the CWL wall). The `/morning-check` skill
(`.claude/skills/morning-check/SKILL.md`) has the exact recipe: run `scripts/canvas_fetch.js` in
a canvas.ubc.ca tab, read the result back through the DOM in chunks, then
`scripts/canvas_digest.py` diffs against `routines/snapshots/`. Course IDs are in the skill.
UBC blocks student Canvas access tokens (tried 2026-09-10), so the Chrome path is the only path;
`scripts/canvas_fetch.py` stays as a fallback if that ever changes. STAT 251 lab section: L1K.
Gmail connector still works for notifications: `from:instructure.com`, `from:piazza.com`.
Piazza and PrairieLearn open in his Chrome too, but only in a session where the Claude-in-Chrome
extension has been granted those sites (canvas.ubc.ca is always-allowed; piazza.com and
us.prairielearn.com need the same, else an unattended run gets "Navigation to this domain is not
allowed" — verified 2026-09-11, it is NOT a permanent block). If a run is denied: Piazza falls back
to the Gmail digest, PrairieLearn is skipped, one line under Heads-up either way. Things3 is read with
`scripts/things_today.applescript` and written with `scripts/things_add.py` (idempotent; projects
`CPSC 310`/`STAT 251`/`PHIL 385`/`ASIA 250` under area `UBC`; areas `Career`, `Personal`). **Things3 is a plan, not a pile (2026-09-11):** ~6 h of work a day outside class. Every to-do carries
an estimate tag (`15m` `30m` `1h` `2h` `3h`, `event` = fixed slot) and a priority tag (`P1` must ·
`P2` this week · `P3` whenever). `scripts/things_plan.py` runs in every morning check (and on "plan my
day"): it creates the lecture close-out, PREP-ladder, and weekly-novel to-dos itself, fills the 6 h
by priority, schedules the winners Today and the losers Tomorrow (rollover count in
`routines/plan-state.json` so nothing starves), and prints the brief's **Plan today** block. Rules:
anything added to Things3 gets both tags; never hand-schedule into Today — set when/deadline/tags
and let the planner decide (a *future* date set by hand holds unless the deadline is within a day; to
lighten a day, move items out and run `things_plan.py --budget H` — the trim is remembered for that
date and skips the Career reserve). Recurring work: dated series (WeBWorK, pre-lab quizzes, CPSC labs,
PHIL readings, ASIA watch+quiz per lecture) are real dated to-dos; open-ended weekly ones (novel pages,
Friday retrieval block, Saturday groceries) come from the planner's `WEEKLY` table a week ahead; an auto to-do he ticks or cancels by hand stays closed (ids kept in
`plan-state.json`); Sundays 15:00 (scheduled task `weekly-plan`, or "plan my week") `things_plan.py --week` places next week's dated and
undated-P1 work on days by deadline and rhythm — weekly owns when-dates, daily owns Today/Tomorrow, `pin`
tag = never move; a ⚠ OVER BUDGET line is the one decision to put to him. Knobs
(budget per weekday, 1 h Career reserve, 1.5 h P3 cap) sit at the top of the script. One-time
course reference info (office hours, links, policies, schedules) lives in
`courses/<CODE>/03-logistics.md` — except tool URLs (Canvas, WeBWorK, PrairieLearn, Piazza, readers), which live in
root `links.md`: the notes site shows them on Home and each course page, and `things_plan.py` appends the
matching rows to a to-do's notes (idempotent, every run; `--no-links` skips it). Add a URL there, nowhere else — the daily brief never repeats it; answer from there when he asks.
A scheduled task runs the skill daily at 06:35 while the app is open; outputs land in
`routines/runs/`. When he asks "what's new", run the skill. `scripts/term.py` prints unlogged
lectures and exam/deliverable countdowns keyed to the PREP.md ladders (T-10 starts Phase 2) —
every brief chases unlogged lectures. Canvas grades are tracked per run; the table is in `ledger.md`.

## Notes browser
`notes-app/` is a Vite + React + TypeScript app (Matt's choice, 2026-09-11) that renders
`ledger.md`, every course file and lecture, and the morning briefs as a two-pane site at
http://localhost:8765. Files come in through `import.meta.glob(..., '?raw')` in `src/files.ts`,
so edits and new lecture files hot-reload. Hash routes: `#/` home (course cards + Due now),
`#/course/STAT251` (buttons for syllabus/logistics/topics/question bank + lecture cards),
`#/courses/STAT251/...md` file view. Course files render under a tab strip (Overview · Syllabus · Logistics · Topics · Question bank · Ask Kraal).
A course may add `04-ask-kraal.md` (PHIL 385 has one, 2026-09-14): the running list of questions to put to
the instructor plus an Answered table; add the file to `MAIN` in `notes-app/src/files.ts` to give it a tab. Conventions the
site relies on (Matt, 2026-09-11): syllabus = grading, exam format, project, one schedule, then a `## To verify`
checklist that renders on the course Overview (hidden in the syllabus view); logistics = short bullets + one dates
table; anything kept only for Claude (office hours, Canvas IDs, site maps) goes under `## Reference (for Claude)`,
which the viewer folds shut. No provenance lines ("pulled from…") in either. Home's **Coming up** panel parses the ledger's `## Term calendar` table by the Date cell
(`Fri Sep 25, 18:00`; a `→` range keeps its end; `~` = approximate) — keep that cell format when adding rows.
The ledger page (`#/ledger.md`) renders as a dashboard: a live **Due now** panel titled `Due now · N topics · <date>`, then All topics, the hard-dates table and the Session log, each paged 10 rows at a time; every markdown table over 10 rows pages the same way. A link can target a section as `#/<file>.md#<heading-slug>`, where the slug is the heading lowercased with each run of non-alphanumerics turned into `-`. The sidebar has a Light / Auto / Dark switch stored in `localStorage` under the key `theme`; Auto follows the OS setting. Question banks render as cards with
answers hidden until
clicked; `## Your notes` / `## Raw` sections fold into a collapsible; search is in the top bar
(`/` focuses it); the sidebar is off-canvas — hover the left edge or pin with ☰.
The workspace is a **public** git repo, GitHub `matthlh/school-3-1` (2026-09-11). Every push to
`main` redeploys the app to https://matthlh.github.io/school-3-1/ via `.github/workflows/pages.yml`.
`routines/` is git-ignored on purpose — the briefs carry Gmail-derived personal detail — and Zoom
passcode links stay out of the repo (point at the Canvas Zoom tab instead).
`publish.sh` (repo root) commits whatever changed, fetches GitHub's main and rebases onto it if another
session or a web edit moved it, then pushes; on a real conflict it aborts, keeps the local commit and names
the files (fix by hand, rerun). The morning check, quiz-me and lecture logging run it as their last step, so
the site updates itself. Outside those, commit/push only when asked. **Never add a `Co-Authored-By` /
AI-attribution trailer** to commits or PRs.
The preview runner can't read ~/Documents (macOS privacy block), so start it from Bash in the
background — `cd notes-app && npm run dev` — then `preview_start name=notes` attaches
(launch.json is URL-only). If port 8765 already answers, just attach. `npm run typecheck` before
committing changes to the app.

## Routing — which source answers what
He should never have to remember to tell me where to look. If a question falls in a row below, go
to that source first, silently, then answer. Never answer a deadline or grade question from memory.
| He asks about | Go to |
|---|---|
| a deadline, due date, grade, "is X posted", "did the prof say", announcements, bonus | Canvas / Piazza / PrairieLearn via `/morning-check` — if today's `routines/runs/` brief exists and it's the same day, read that first, else run the check and say so in one line |
| what's due for review, how he's doing, weakest topics | `ledger.md` + `quiz_pick.py --report` |
| office hours, links, tools, policies, section/lab details | `courses/<CODE>/03-logistics.md` |
| what a lecture covered, what a question's answer is | `courses/<CODE>/lectures/`, `02-questions.md` |
| what to ask the prof, what he already answered | `courses/<CODE>/04-ask-kraal.md` (PHIL 385) |
| what to do today / this week | Things3 via `things_plan.py`, `PREP.md` |
| why the system is shaped this way | `STUDY-SYSTEM.md`, `research/course-intel.md` |
| what past students say, prof reputation, exam style intel | `research/course-intel.md` (refresh: RateMyProfessors, ratemycourses.io, old.reddit.com r/UBC through the Chrome tab — the fetch tools cannot reach Reddit) |
| what a posted deck or reading says, "pull the slides" | `courses/<CODE>/lectures/_NN-*.md` if staged, else the `canvadoc_text.js` recipe |
This file and `~/.claude/projects/…/memory/MEMORY.md` load automatically in every session started
in this folder; the skills listed above are always available. A session started in another folder
has none of this — tell him to open this folder.

## Things not to do
- Don't suggest rereading, highlighting, or recopying notes. Low-utility; costs time.
- Don't write summaries of his notes. Summarizing is his job and it's low-utility anyway.
- Don't pad. Short answers. He is optimizing for time.
