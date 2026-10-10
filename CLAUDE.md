# Operating rules for this workspace

Matt is a UBC CS student, Term 3-1 (Sep–Dec 2026). Goal: highest grades per hour spent.
Career work is a co-priority, so **time efficiency is a hard constraint, not a preference.** When a career item
and a school item collide, **career goes first** (Matt, 2026-10-09); an interview, assessment or offer is always
the first line of any brief and a push notification (morning-check SKILL §4b).

## At the start of any session
1. Read `ledger.md`. Tell him what is **overdue** for revision before anything else.
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
   **Formulas are LaTeX** (Matt, 2026-10-02: "proper latex formatting instead of inline, super hard to
   read"). Math goes between `$$` markers and nothing else: `$$P(A \mid B)$$` inside a sentence is inline;
   a `$$` line, the LaTeX, then a `$$` line (blank lines around it, not indented into a list) is a display
   equation. A single `$` is always a literal dollar sign. Definitions, derivations and any calculation with
   more than one step go in a display equation, written as `\begin{aligned}` with one step per line short
   enough for a phone (about 30 characters of rendered math; never two formulas side by side), and
   `\frac` rather than `\tfrac` inside display equations. Notation: `\operatorname{Var}`, `\operatorname{Cov}`,
   `\operatorname{SD}`, `\mid` for "given", `A^c`, `\bar{X}`, `\frac{a}{b}` (never "a/b"), `\le`, `\times`, and
   `\%` inside math. `### Q:` lines take inline math only; ledger topic labels and `**Topic:**` tags stay plain
   Unicode, because they are matched as text; his pasted notes stay verbatim. Check every file before
   publishing: `node notes-app/scripts/check-math.mjs <files>` prints parse errors and leftover Unicode
   math. Rewording a `### Q:` line changes that question's id, so its history in `routines/quiz-state.json`
   detaches unless the key is moved to the new id.
2. Extract every testable claim into `courses/<CODE>/02-questions.md` in the Q/A format.
   Aim for 6–12 questions per lecture. Prefer `apply` and `derive` over `recall` where the
   course allows it. For CPSC 310 that means `apply`/`critique` on a code or design fragment plus
   `recall` of the reader's exact terms; skip housekeeping slides entirely.
   A problem that needs paper (a table or tree to build, an integral, ten or more values, or three or more
   results that feed each other) goes under `## Long problems` at the end of the bank instead of the lecture's
   section, with the lecture's `**Lec:**` tag and a numbered Steps list opening its answer (Matt, 2026-10-05).
   For STAT 251 every worked example in the deck or the recording becomes a question, short or long, with the
   numbers changed.
3. Add any new topic to `ledger.md` with `Next = today + 1` and to `courses/<CODE>/01-topics.md` (no status
   columns: the ledger is the only status copy; the topic's text starts with the ledger topic's words, a STAT 251
   one with its outcome codes), plus a `## Look-alikes` row there when it is easily confused with an existing
   topic. Then run `quiz_pick.py --due` (quiz-me scripts), which checks the new rows, look-alikes and tags (fix what
   it stops on or flags with ⚠) and refreshes the Due now block, then `cd notes-app && npm run parity` when a
   `02-questions.md` changed, then `sh publish.sh "Log <CODE> lec N"` — the notes site redeploys itself.
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
   `Read PHIL385: …` and `Log PHIL385 reading: …` to-dos the planner created). Questions go into `02-questions.md` tagged
   to the topic the lecture will use, so the lecture log later lands in the same ledger row.
   PHIL 385 MC questions and ASIA 250 quizzes draw on lectures *and* readings, so a reading with no
   questions logged is a gap.

7. **Posted material is pulled before class** (Matt, 2026-09-11: "today for whatever lecture, here's the
   slide summary"). The morning check stages whatever is posted as `lectures/_NN-<slug>.md`, a plain-sentence
   outline (no pre-lecture questions since 2026-10-06, Matt: the evidence for them with real lectures is weak).
   CPSC 310 goes through `prelecture.py`: before the deck is posted (decks land about 10:40–12:00 on lecture day)
   the outline comes from the reader chapter whose title best matches the lecture's, staged with
   `prelecture.py --chapter N URL` and named, with the reason, in the outline's first line; the Tue/Thu 12:30
   scheduled task `cpsc310-midday` ("fetch pre-lecture CPSC310") then rebuilds it from the deck. STAT 251 and
   ASIA 250 decks and readings go `canvas_materials.js` → `canvas_materials_digest.py` → `canvadoc_text.js`, then
   `canvas_materials_digest.py --mark <keys>` once the outline is written, so an item whose pull failed comes
   back the next day (all in the morning-check scripts dir; the `.js` files run in the Chrome Canvas tab).
   PHIL 385 has nothing to pull. **Full lecture prep** (Matt, 2026-10-06: "go through the slides, the
   recordings, and everything … I'll submit my notes, and then you can add or adjust"): once a STAT 251,
   CPSC 310 or ASIA 250 lecture's deck is posted, its `_NN` file is the full study page built from the deck, the
   recording and the reading, and its questions are banked then (for CPSC 310 that is the 12:30 task). When he
   sends notes the file is renamed to `NN`, his words go under `## Your notes`, and the page and questions are
   adjusted only where his notes add or correct something (morning-check SKILL.md §7, Full lecture prep).
   Otherwise logging a lecture consumes its outline: deck-only claims become questions and clarifications, then
   the `_NN` file is deleted. If he logs a lecture and no outline
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
   question under `## WeBWorK N` in `02-questions.md` (under `## Long problems` when it needs paper), tagged `**Lec:** WWN` to the ledger row it
   exercises (a new row only for a skill no lecture row covers), with the numbers changed and any
   figure turned into a table of counts. The hardcopy and page text stay in `routines/webwork/`
   (git-ignored); no problem is copied verbatim into the public repo. It is graded homework: read and
   bank, never type into an answer box or press Submit. WeBWorK 1 was banked 2026-09-16 from the PDF
   he attached.

## When he says "quiz me" / "test me" / pastes grades back ("1 O 2 ~ 3 X")
Run the `/quiz-me` skill (`.claude/skills/quiz-me/SKILL.md`). `quiz_pick.py` chooses an interleaved
session weighted by `ledger.md` (most overdue for its interval → `X` → unquizzed → `~`, ×2 near the first exam
ahead that covers the topic; topics frozen after a non-cumulative exam are skipped, and the week before an exam sweeps in everything it
covers). Look-alike topics (the `## Look-alikes` table in each `01-topics.md`) come back to back, and the day after
a logged lecture the first session opens with 2 minutes of free recall. I ask one question at a time (Matt
approved all of this on 2026-10-06):
- He answers with a confidence of 1–3 ("B, 2"); a confident miss gets one line on why he was sure.
- A miss gets a one-letter cause (c concept, f forgot, m misread, k careless, s slow) and comes back 2–3
  questions later until he gets it right; only the first try is graded.
- An apply or derive question he last got right comes back as a variant with new numbers or code.
- A CPSC 310 or PHIL 385 question he has missed before comes as multiple choice built from his own wrong answers.

Then `quiz_grade.py "1:O3 2:X3/c 3:~2/m"` (grade, confidence, `/` and the cause; a live variant takes its question's
grade; `--said N "…"` keeps his wrong answer and `--why N "…"` why he was sure) moves the ledger rows by the ladder
below, logs per-question history in `routines/quiz-state.json`, prints calibration, misses by cause and confident
misses with his reasons, and names the topics
that need more questions — write those before the session ends. **Never update ledger rows by hand; the script
owns them.** `quiz_pick.py --transit` builds the 6-question deck the morning check sends to his phone: each answer
shows as a checklist of key points whose ticks set the grade, and "grade my deck" runs
`quiz_grade.py --transit <deck date>` on the taps. `--transit` stops while a deck from another day
waits ungraded and when today's deck already exists; `--replace` is the only way past either (morning-check §7 step 1
says when). `quiz_pick.py --sprint` is the STAT 251 "which method?" drill:
10 short questions in 3 minutes, method and first setup line only. **FSRS shadow trial** (from 2026-10-06):
`fsrs_shadow.py` replays the history through FSRS-6 beside the ladder and writes nothing; the Sunday weekly brief
carries its verdict until it decides, and FSRS replaces the ladder only if it predicts his misses better.
**Long problems** (Matt, 2026-10-05: short ones
"on the bus", longer ones "on the friday study sessions", or "I'll just say the steps") never go in that deck; a
normal quiz asks them as steps only, the method and the setup without the arithmetic; and the Friday revision
block opens with `quiz_pick.py --long`, four of them worked in full on paper against a clock. Last step of every graded session:
`sh publish.sh "Quiz <date>"` — the hosted site shows the new ledger rows and per-question history.

**Spacing ladder** (recompute `Next` from today):
| Grade | Streak | Next |
|---|---|---|
| `X` missed | reset to 0 | +1 day |
| `~` shaky | unchanged | +3 days |
| `O` solid | 1 | +7 days |
| `O` solid | 2 | +16 days |
| `O` solid | 3+ | +35 days |

Two adjustments follow the ladder. Next is never later than 4 days before the first exam at least 2 days away that
covers the topic (the day before that exam once that day has passed), and a gap of 3 days or more moves up to 15% either way, at
least a day, to the day with the fewest topics due. From 7 days before an exam, every topic it covers is due
unless it was reviewed that week. After a non-cumulative exam (PHIL 385) its topics freeze until a later exam of
the course covers them. Details: the quiz-me SKILL, "What the scripts decide". Each due-now block in `ledger.md`
opens with the date it was written, has a readiness line per exam within 21 days (the share of its questions he would
likely get right), and ends by naming each frozen topic.

## Course-specific rules
- **CPSC 310** — 65% of the grade is two closed-book exams (25% mid + 40% final); the project
  is only 20%. The 26W1 syllabus (read 2026-09-14) says memorising definitions is not sufficient:
  exams put code or a design he has not seen in front of him and ask what is wrong, what he would
  change, and why — "the same thing the lab assignments ask". So the bank is weighted to `apply` and
  `critique` on unseen code, with the reader's terminology (cohesion vs. connascence, LSP, test
  doubles, the pattern set, API change severity) as the vocabulary underneath; always make him
  justify. Unverified format reports: a classmate said (2026-10-02) the exams are all true/false; Matt heard
  (2026-10-05) they are all multiple choice. So from lecture 6 on bank questions as "True or false, and justify"
  or as a multiple-choice question over a fragment or a claim, answer with the verdict then the reason. Course housekeeping (learning objectives, roadmap weeks, slide diagrams about AI) is not
  exam material — do not bank it. No past papers exist for this version (exams are private; the
  CSSS bank stops at 2009), so labs and iClicker questions are the only format samples. Do **not** let him sink unbounded hours into the
  deliverables — the bucket grading means extra hours past "meets spec" return nothing.
  **Intel (2026-09-10):** 2025W sections (Chin, Bradley, Kerr) averaged ~82 with ~14% at 90+.
  The course reader (ubccpsc.github.io/310/textbook) is the reading list; exam terminology comes
  from it and the slides. Nothing on the site maps lectures to reader chapters since 2026-09-28, so a
  lecture's chapter is the one whose title best matches it; the pre-lecture outline names it and why.
  **Course site map (2026-10-06):** only **Schedule** has slides (the lecture title becomes a PDF link at
  `/310/26w1/lectures/NN-*.pdf` on lecture day, about 10:40–12:00); the Course Materials unit pages were
  removed on 2026-09-28; **Reader** is the textbook, and its sidebar is the chapter list `prelecture.py`
  prints; **Syllabus** is policies. Canvas is unused. `cpsc310_site.py` (morning-check scripts) does the
  fetching: no flags = diff + next lecture, `--lecture N` = that deck's text, `--all` = the whole term.
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
  deck *and* the reader chapter. A deck posted before class can be logged before class; anything from class
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
  Exams 2–4 are *not* cumulative: the quiz scheduler freezes each past exam's topics, so drills cover only
  the current exam's weeks until the cumulative final brings them back. There are **no
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
- **PHIL 321** — dropped for good on 2026-09-19 after sitting in on two lectures. Folder is in `archive/PHIL321-dropped/` (git-ignored, local only);
  do not mention it in briefs, quizzes or the site. He may add a fifth course (a science breadth such as EOS 112) in a later term.

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
UBC blocks student Canvas access tokens (tried 2026-09-10), so the Chrome path is the only path. A request
that fails keeps that section's previous snapshot and adds one Heads-up line, so a hiccup never floods the next
brief with fake NEW items. STAT 251 lab section: L1K.
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
day"): it creates the lecture close-out, PREP-ladder, weekly-novel, daily habit (bus deck, quiz before bed;
an open one from an earlier day is cancelled) and PHIL 385 reading Read/Log to-dos itself, fills the 6 h
by priority, schedules the winners Today and the losers Tomorrow (rollover count in
`routines/plan-state.json` so nothing starves), and prints the brief's **Plan today** block. That block gives
each P1 a start time from 09:00 (or from now, rounded up to the quarter hour, on a later run) that skips lecture, lab
and exam slots, puts a lecture's log after that lecture and never runs past 22:30 (an item that would end later
leaves today's plan), a Cushion line for each date within 14 days that has an exam, deliverable, paper or assignment
(all the work due before it, across courses, against the hours free, ⚠ when short), "First thing tomorrow", and one "Time check" question: his answer goes in with `things_plan.py --actual
"TITLE=45m"`, and after 5 answers for an estimate tag that tag's estimates scale to his real times. The day
before an exam gets half the budget unless he sets one. Rules:
anything added to Things3 gets both tags; never hand-schedule into Today — set when/deadline/tags
and let the planner decide (a *future* date set by hand holds unless the deadline is within a day; to
lighten a day, move items out and run `things_plan.py --budget H` — the trim is remembered for that
date and skips the Career reserve). Recurring work: dated series (WeBWorK, pre-lab quizzes, CPSC labs,
PHIL readings, ASIA watch+quiz per lecture) are real dated to-dos; open-ended weekly ones (novel pages,
Friday revision block, Saturday groceries) come from the planner's `WEEKLY` table a week ahead; an auto to-do he ticks or cancels by hand stays closed (ids kept in
`plan-state.json`); Sundays 15:00 (scheduled task `weekly-plan`, or "plan my week") `things_plan.py --week` places next week's dated and
undated-P1 work on days by deadline and rhythm — weekly owns when-dates, daily owns Today/Tomorrow, `pin`
tag = never move; a ⚠ OVER BUDGET line is the one decision to put to him. Knobs
(budget per weekday, 1 h Career reserve, 1.5 h P3 cap, the exam-eve factor, the 09:00–22:30 day, the cushion
window, the samples needed before estimates scale) sit at the top of the script. One-time
course reference info (office hours, links, policies, schedules) lives in
`courses/<CODE>/03-logistics.md` — except tool URLs (Canvas, WeBWorK, PrairieLearn, Piazza, readers), which live in
root `links.md`: the notes site shows them on Home and each course page, and `things_plan.py` appends the
matching rows to a to-do's notes (idempotent, every run; `--no-links` skips it). Add a URL there, nowhere else — the daily brief never repeats it; answer from there when he asks.
A scheduled task runs the skill daily at 06:35 while the app is open; outputs land in
`routines/runs/`. When he asks "what's new", run the skill. `scripts/term.py` prints unlogged
lectures and the countdowns: every row of the ledger's Term calendar that has a Kind (exam, deliverable,
paper, assignment, admin), with the PREP.md ladder steps (T-10 starts Phase 2). That table is the only copy
of the countdown dates, and term.py works out from its exam rows which lectures an exam replaces. term.py keeps the
weekly timetable, the holidays (`NO_CLASS`) and each course's own cancelled classes (`skip`); quizlib.py's
`EXAM_CUTOFF` keeps the CPSC 310 midterm's scope cutoff (Oct 22), a scope rather than a date the table holds. Every
brief chases unlogged lectures. Canvas grades are tracked per run; the table is in
`ledger.md`.

## Notes browser
`notes-app/` is a Vite + React + TypeScript app (Matt's choice, 2026-09-11) that renders
`ledger.md`, every course file and lecture, and the morning briefs as a two-pane site at
http://localhost:8765. Files come in through `import.meta.glob(..., '?raw')` in `src/files.ts`,
so edits and new lecture files hot-reload. Hash routes: `#/` home (Due now, Coming up, course cards, links),
`#/course/STAT251` (buttons for syllabus/logistics/topics/question bank + lecture cards),
`#/courses/STAT251/...md` file view. Course files render under a tab strip (Overview · Syllabus · Logistics · Topics · Question bank · Ask Kraal).
A question bank keeps its view in a query before any `#section` (`?section=lec-7&topic=…&lec=7&type=apply&only=weak&shuffle=4821&open=3,7-9`),
so Back, Forward and reloads restore it; filters, mode and shuffle are Back steps, opening answers is not. The browser
tab shows the page, then the course ("Syllabus · STAT 251"). The Topics tab shows each row's grade from the ledger
and its standing from the Due now block, and counts a row covered once it has been quizzed. A course Overview has a
**Grade what-if** panel (Matt, 2026-10-06): it reads the syllabus's `## Grading` table (keep the Component and
Weight columns, `×N` for a component of several items (`LAB ×10`), `+N%` for bonuses, `(running)` for a running
total that stays open) and the ledger's Grades so far; an item belongs to the component whose first word starts its
name, so graded items are named to match (`Mini-quiz 4 9/10`). Its target is stored per viewer under `target`
(default 96). A table that does not parse, or an item that fits no single component, shows the problem instead of
numbers, and dropped scores are not modelled.
A course may add `04-ask-kraal.md` (PHIL 385 has one, 2026-09-14): the running list of questions to put to
the instructor plus an Answered table; add the file to `MAIN` in `notes-app/src/files.ts` to give it a tab. Conventions the
site relies on (Matt, 2026-09-11): syllabus = grading, exam format, project, one schedule, then a `## To verify`
checklist that renders on the course Overview (hidden in the syllabus view); logistics = short bullets + one dates
table; anything kept only for Claude (office hours, Canvas IDs, site maps) goes under `## Reference (for Claude)`,
which the viewer folds shut. No provenance lines ("pulled from…") in either. Home's **Coming up** panel parses the ledger's `## Term calendar` table by the Date cell
(`Fri Sep 25, 18:00`, and an exam's time as a span, `Fri Oct 30, 14:00–14:50`; a `→` range keeps its end; `~` =
approximate) — keep that cell format when adding rows.
Its fifth column, Kind, marks the countdown rows `term.py` reads: such a row needs one weekday date, and a UBC row
can only be `admin`. A past exam row keeps its Kind and time, because the lecture count skips a lecture an exam
replaced and clearing the row shifts every later lecture number. A Kind row that does not parse, an exam with only
a start time included, stops every script that reads the dates (term.py, things_plan.py, quiz_pick.py,
quiz_grade.py, fetch_status.py), so run term.py after editing the table.
The ledger page (`#/ledger.md`) renders as a dashboard: a **Due now** panel showing the `## Due now` block that `quiz_pick.py` writes on every run (the site never decides what is due), titled `Due now · N topics · <date>` (`nothing due` when nothing is), the date coming from the block's hidden first line `<!-- due as of YYYY-MM-DD -->` and gaining `(N days old)` when stale; the panel shows the sweep count, readiness lines and frozen line, or an error panel when the block is out of format; All topics' Next column and a course page's Revision panel show the block's standing (overdue, `Midterm sweep`, frozen per its frozen bullets, or the next date), and a Calibration panel per course sits under All topics once grades carry a confidence. Then All topics, the hard-dates table and the Session log, each paged 10 rows at a time; every markdown table over 10 rows pages the same way. A link can target a section as `#/<file>.md#<heading-slug>`, where the slug is the heading lowercased with each run of non-alphanumerics turned into `-`. The sidebar has a Light / Auto / Dark switch stored in `localStorage` under the key `theme`; Auto follows the OS setting. A gear left of the search opens Settings: the same theme switch plus "Secret visuals", a Minecraft-style easter egg: an Off · Abstract · Blobs · Wireframe switch (Matt, 2026-10-09: one click each, no cycling) that puts abstract bars, blur or a wireframe look over the content (key `visual`; the popover stays readable and every link keeps working), a Colours row with five palettes of the same soft look (Mist is the default, then Sage, Lavender, Sand and Slate; key `palette`, applied as `data-palette` on the root), and a Version row showing the build time (no Check now button, Matt 2026-10-02). **The site keeps itself current** (Matt, 2026-09-21): the build writes `version.json` next to the bundle, and an open tab compares it with its own build stamp at load, every five minutes and whenever the tab comes back into view. A newer build reloads a hidden or just-opened tab on the spot and puts the page back at the same scroll position; a tab he is looking at gets a bottom-right toast with Reload now and Hide and reloads the next time he opens another page (a jump within the same page does not count). A tab reloads for a given build at most once every few minutes, so a lagging cache cannot loop. Each history entry keeps its scroll position, so Back, Forward and a reload land where he was, and React, the markdown pipeline, KaTeX and highlight.js build into their own chunks, so a deploy that changes only the app or notes leaves them cached on his phone. **Wide screens get a Notion-style section rail** (Matt, 2026-10-02): thin bars at the right edge of any page with three or more sections, no box around it, with the section names shown faintly beside the bars when there is room and brighter on hover; a click jumps to the section. Under 1000px the old chip row shows instead. On the ledger page, Grades so far renders as course chips plus one small chip per scored item (the Score cell stays free text in the file; `parseLedgerGrades` in `markdown.ts`, which the what-if panel shares, reads `Name N/M` fragments and drops "total hidden"), the Session log renders as day-grouped bullets with the first sentence as the title and the rest as sub-bullets behind a "more" link, the `### Recurring series` table under the term calendar is Series | Course | When | Note with a weekday rule (`Fridays, 23:59`) and one short note, never a list of dates, and ISO dates render as `Sep 29`. Question banks filter by section (the `## ` group titles) from the dropdown and by topic, lecture or type from the chips on a card, a card's topic being the ledger row its tag names (`matchTopic` in `stats.ts` mirrors quizlib's `match_topic`); topic names on Home, the course page and the ledger link to the bank filtered to that topic (body-coloured until hovered). Once its answer is shown, a question card links to the lecture or reading notes page it comes from (`notes-app/src/sources.ts`, the same rules as `attach_sources` in `quizlib.py`), and `quiz_grade.py` ends by listing the pages behind the `X` and `~` grades. `links.md` renders as link groups per course (`LinksView`); its table keeps the planner's fourth column, which the site never shows. Question banks render as cards with
answers hidden until
clicked; `## Your notes` / `## Raw` sections fold into a collapsible; search is in the top bar
(`/` focuses it): a query matches any `##` section holding all its words, each hit links to that section (a syllabus checklist hit,
such as To verify, links to the course Overview), and
results come 20 at a time with Show more; the sidebar is off-canvas — hover the left edge or pin with ☰.
The workspace is a **public** git repo, GitHub `matthlh/school-3-1` (2026-09-11). Every push to
`main` redeploys the app to https://matthlh.github.io/school-3-1/ via `.github/workflows/pages.yml`, after
`npm run parity` confirms that quizlib and the site read every question bank alike, topic, lec and type included (a
difference fails the deploy).
`routines/` is git-ignored on purpose — the briefs carry Gmail-derived personal detail — and Zoom
passcode links stay out of the repo (point at the Canvas Zoom tab instead).
`private/` is git-ignored as well and exists only on his Mac: `course-intel.md` (grade data and what past students
say about each instructor) and `habits.json` (personal daily habits `things_plan.py` adds to HABITS; the plan runs
without them where the file is missing). The repo is linked from his resume, so anything about his health or another
person goes there, never in a tracked file. A student's email address (a TA's included) stays out of tracked files;
instructors' and staff @ubc.ca addresses may stay.
`publish.sh` (repo root) runs only on main (on any other branch or a detached HEAD it stops before
committing, since its push sends main) and there commits whatever changed, fetches GitHub's main and rebases onto it if another
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
| why the system is shaped this way | `STUDY-SYSTEM.md`, `private/course-intel.md` (local only) |
| what past students say, prof reputation, exam style intel | `private/course-intel.md` (local only; refresh: RateMyProfessors, ratemycourses.io, old.reddit.com r/UBC through the Chrome tab — the fetch tools cannot reach Reddit) |
| what a posted deck or reading says, "pull the slides" | `courses/<CODE>/lectures/_NN-*.md` if staged, else the `canvadoc_text.js` recipe |
This file and `~/.claude/projects/…/memory/MEMORY.md` load automatically in every session started
in this folder; the skills listed above are always available. A session started in another folder
has none of this — tell him to open this folder.

## Things not to do
- Don't suggest rereading, highlighting, or recopying notes. Low-utility; costs time.
- Don't write summaries of his notes. Summarizing is his job and it's low-utility anyway.
- Don't pad. Short answers. He is optimizing for time.
