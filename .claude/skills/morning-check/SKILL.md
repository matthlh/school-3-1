---
name: morning-check
description: Morning sweep of Things3, Canvas (every course, grades, + the CPSC 310 course site), PrairieLearn, Piazza, and Gmail, plus term status (unlogged lectures, exam countdown) and the Career repo's applications ledger. Reports only what changed, syncs new deadlines into Things3 and ledger.md, writes routines/runs/<date>-morning.md, and builds the day's plan in Things3 (6 h budget, scripts/things_plan.py), and posts a brief of at most 30 lines plus the Career block. Use for "morning check", "what's new", "plan my day", "daily sweep", "week ahead", "term status", or when the scheduled morning task fires.
---

# Morning check

**Deliverable:** a chat brief of at most 30 lines plus the Career block (that IS the product), and the same brief
with details at `routines/runs/YYYY-MM-DD-morning.md`. The Things3 Today list is rebuilt every run so
it holds exactly the day's plan (§1b) — that rebuild is the other half of the product. Wall-clock budget ~5 minutes. If a Chrome source
(Canvas/Piazza/PrairieLearn) fails with "not allowed"/"permission denied" and no visible prompt,
retry up to 3 times first (see §5/§6 — this is usually transient, not a real block); if a source
fails 3 straight times, skip it and say so under Heads-up. Never enter passwords or codes
anywhere; if a login page appears, stop and ask.

**Chrome cleanup:** every tab you open with `tabs_create_mcp` or the auto-created tab from
`tabs_context_mcp{createIfEmpty:true}` gets `tabs_close_mcp`'d before you finish — closing the
last tab in the MCP group auto-removes the group. Don't leave it sitting open between runs.

**The one rule that matters (Matt, 2026-09-10): report only what is new or due. One-time reference
info (office hours, policies, schedules, links, course structure) is NOT repeated — it lives in
`courses/<CODE>/03-logistics.md`. If a source publishes new reference info, update that file and say
"logistics updated" in one line. He can ask for it when he needs it.**

**Before touching sources:**
0. Run term status — it is local and instant:
   ```bash
   python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/term.py"
   ```
   It prints (a) **unlogged lectures** per course — lectures held vs. files in
   `courses/<CODE>/lectures/` — and (b) the **countdown** to every exam/deliverable with the
   PREP.md ladder step for today (T-10 gap check, T-3 mock, T-1 rationale, …). Unlogged lectures go
   in Heads-up every day until logged (PHIL 385 has no slides or recordings — his page is the only
   record). A ladder step that fires today becomes a P1 to-do via `things_plan.py` (§1b) and
   shows up in **Plan today**. The countdown comes from the ledger's Term calendar table, the only
   copy of the countdown dates: a row counts down when its Kind cell is `exam`, `deliverable`, `paper`,
   `assignment` or `admin`, and its Date cell must then name one day like `Fri Oct 16, 18:05` (a `→`
   range ends in one), or `term.py` stops and names the row. An exam's Date cell needs its time as a span,
   like `Fri Oct 30, 14:00–14:50`, because the planner keeps that slot free, and a UBC row's Kind can only be
   `admin`.
1. Read the newest file in `routines/runs/` so you can report deltas, not the whole world again.
2. Read `ledger.md` — overdue revision topics go in Heads-up, and the term calendar is the thing you
   compare new dates against.
3. Skim `courses/<CODE>/03-logistics.md` only if you need to decide whether something is new.

All times in the report are Pacific. Canvas returns UTC; PDT = UTC−7 until Sun Nov 1 2026, then
PST = UTC−8. A Canvas due of `T06:59:59Z` is "23:59 the previous day, Pacific".

---

## Sources

### 1. Things3 (local app)
```bash
osascript "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/things_today.applescript"
```
Prints Today (with project/area/due/tags), Inbox count, Upcoming ≤14 days, open projects.

#### 1b. Daily plan — the Today list IS the plan (Matt, 2026-09-11)
Matt has ~6 h of work time a day outside class. Every to-do carries two tags: an **estimate**
(`15m` `30m` `1h` `2h` `3h`, or `event` for a fixed slot that costs no planning time) and a
**priority** (`P1` must — deadline- or grade-bound · `P2` should this week · `P3` whenever).
Run this **after** the Canvas/PrairieLearn/Gmail sync (so new deadlines are already in Things3):
```bash
python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/things_plan.py"
```
It (1) creates the automatic to-dos — one `Log <CODE> lec N (<date>)` per unlogged lecture from term.py
(15m, P1, **deadline = the lecture date**, so a missed close-out reads "OVERDUE since Sep 9", not "due
today"; auto-completed once the lecture file exists), for async ASIA 250 a `Watch + quiz ASIA250 lec N ·
locks <date>` (2h, P1, deadline = the mini-quiz hard lock, publish + 7 d; only Matt ticks it, after the
quiz), one per PREP ladder step that
fires today, named for its item (`T-3 STAT 251 Midterm · FULL TIMED MOCK`, the name being the bold name in
the item's Term calendar row; the ladders are `term.LADDERS`, one per kind: exam, deliverable, paper and
assignment, each step with its time tag; once the item's date has passed, or on an exam's own day, its open steps
are cancelled), the weekly `Golden Pavilion: read 30–35 pages (week of …)`
for ASIA 250 from Sep 14, the two **daily revision habits** (`Deck: answer the 6 on the bus, tick key
points (<date>)` and `Quiz me: 10 min before bed (<date>)`, 15m P1 each, area UBC, due today; an open one from
an earlier day, or under an old title, is cancelled, never rolled), and the **PHIL 385 reading pair** from the syllabus
schedule in `PHIL_READINGS`, from a week before the reading's first class (`Read PHIL385: <title> (class …)`
1h P1, due the first class, created until the last class, skipped if any open to-do already mentions
the title; `Log PHIL385 reading: <title>` 15m P1, due the last class; both are completed once
`courses/PHIL385/readings/<slug>.md` exists, and one still open 21 days after the last class is cancelled)
— then (2) scores every candidate (deadline urgency → P-tag → was already planned → rollover count),
(3) fills the budget by score: events dated today, then today's two habits (so they never roll), then
a 1 h Career reserve, then everything else, with a 1.5 h cap on P3 filler, (4) gives the plan a clock
(below), and (5) applies it: picked items are scheduled Today, anything that was in Today and
lost is scheduled Tomorrow (counted as a rollover in `routines/plan-state.json`, which bumps it
next time so nothing starves), undated Anytime items stay in the pool. `--dry-run` previews;
`--budget 3` trims a short day and is remembered for that date (no Career reserve on a trimmed day);
`--seed` pre-creates the term's ASIA 250 watch+quiz to-dos; knobs are
at the top of the script. A future when-date he set by hand holds unless the deadline is within a day.
Open-ended weekly to-dos (novel pages Mon, Questions for Kraal Mon, revision block Fri, groceries Sat) come from the `WEEKLY`
table one week ahead; tick one and it stays ticked.

The printed block, top to bottom (Matt, 2026-10-06):
- **Plan today — x of 6 h**, then one line per picked item in the order to do them.
- Each P1 line starts with a suggested start time. Times run from 09:00 (`DAY_START`) and jump past every
  lecture, lab and exam that day (`time` and `labs` in `term.COURSES`, and each Term calendar exam with a time).
  A run for today that starts after 09:00 counts from now, rounded up to the next quarter hour. A dry run with
  `--date` always counts from 09:00.
- A lecture's log starts after that lecture ends, and the items after it go first in the meantime, so the lines
  still read in the order to do them.
- Events and the two habits get no time and take none from the clock. An event has its own slot, and a habit's
  slot is in its title (the bus, bed).
- Nothing is planned to end after 22:30 (`STUDY_END`). An item that would end later leaves today's plan, and a
  ⚠ line names it. One that was already in Today moves to tomorrow like any other item that did not fit
  ("so it moves to tomorrow"). One that was not, such as an undated Anytime item, stays where it is ("so it is
  not planned today").
- The day before an exam (a Term calendar row with Kind `exam`) plans half its budget (`LIGHT_EVE`), and a line
  says which exam is tomorrow. A `--budget` set for that date wins.
- Once a time tag has 5 recorded times, the plan counts that tag as tag × the median of actual ÷ tag, to the
  quarter hour, and a line names the factors in use (`Scaled by your actual times: 1h ×1.5`). The start times,
  the cushion and the weekly mode use the same numbers.
- **Rolled to tomorrow**, **Needs an estimate/priority tag**, the Inbox count and the ⚠ lines follow as before.
- A `Cushion:` line covers each date in the next 14 days that has an exam, deliverable, paper or assignment
  (an admin date gets none), in date order. Its hours count all the work due before that date, so each line
  includes the lines above it: every open course to-do due by then, plus every ladder step still to come before
  it. Free is the daily budgets from today to the day before, minus the 1 h Career reserve. When the work is
  more than the free hours, the line is a ⚠ instead.
- `First thing tomorrow:` names the top item that rolled.
- The last line, `Time check: how long did <to-do> take?`, asks about one to-do completed yesterday that has a
  time tag, taking the tags in turn so each one collects samples. Habits are never asked about. Its query runs
  after the plan is applied, so if it fails, today's plan is already in Things3 and only that line is missing.
- When he answers, record it with `things_plan.py --actual "<exact title>=45m"` (also `2h`, `1.5h`, `1h30m`;
  repeatable). It finds the completed to-do by its exact title, stores the time with the to-do's tag and
  completion date under `actuals` in `routines/plan-state.json`, and plans nothing. Every pair is checked
  first, so one bad pair records nothing.

**Weekly mode — Sundays 15:00 (scheduled task `weekly-plan`) and "plan my week":** run
```bash
python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/things_plan.py" --week
```
It places next week's work on days: everything due Mon→Sun (+3 days) and any undated P1 item gets a
when-date — a hand-set day is kept if it fits, otherwise the project's rhythm day (`RHYTHM`: STAT Mon,
CPSC Tue/Wed, PHIL Thu, ASIA Wed, Career Tue/Thu, Personal Sat), otherwise the lightest day, weekdays
first, always before the deadline. Events, `WEEKLY` instances, ladder steps and anything tagged `pin`
never move. Weekly owns when-dates; the daily run owns Today/Tomorrow and never moves a future date.
The day before an exam counts half its budget here too.
It prints the brief's **Week ahead — x of 42 h** block (one line per day; `⚠` = over budget; `moved` /
`placed` lines; a `⚠ OVER BUDGET` line is the decision for Matt: push to the Saturday flex block or cut).
The weekly-plan task posts it as its own ≤12-line brief (block + hard dates in 14 days + unlogged) and
writes `routines/runs/<date>-week.md`; the daily run never calls `--week`. On any other day, "plan my week" =
`--week --next-week` (the coming Mon→Sun); add `--dry-run` to preview.
Until the FSRS shadow trial decides (it needs about 30 scored reviews and had 5 on 2026-10-06), the weekly-plan brief also carries the one-line
verdict that `python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/quiz-me/scripts/fsrs_shadow.py"` prints last.

After it runs:
- If it lists items under **Needs an estimate/priority tag**, tag them yourself from the title
  (`things_add.py --title "…" --project "…" --tags "1h, P2"` — same title = update, not
  duplicate) and run the planner again. Guide: quiz/pre-lab 30m · WeBWorK 2h · a reading 1h ·
  a lecture + its readings 2h · deliverable/paper *session* 2h (the item repeats daily until done)
  · SWR/WA 3h · exams and in-lab quizzes `event` · anything admin 15m. P1 = has a date or a
  grade; P2 = career or setup work that matters this week; P3 = everything else.
- Every to-do you add this run (sync rule below) gets `--tags` too. Untagged = 30m and flagged.
- Never hand-schedule things into Today outside the planner ("shuffle to tomorrow" = move out +
  `--budget H`); set `--when`/`--deadline` and tags
  and let it decide. If a ⚠ OVER BUDGET line appears, that is the one decision for Matt in the brief.
- Paste the planner output verbatim as the first block of the brief. It replaces the old
  "Do today" block — hard deadlines and ladder steps are to-dos now, so they are in the plan.

**Surge days — 8–10 h (Matt, 2026-09-20: "if something is really urgent, yeah I dont mind doing
8-10 hrs of works js lmk and remind me").** The 6 h budget is the default, not a ceiling. When a run
finds work that is *genuinely* urgent and does not fit, say so in the brief and offer the bigger day;
he decides, and the offer is a question, never a silent replan.

A day qualifies when **any** of these is true:
- A hard lock or a no-late deadline falls inside 24 h and its to-do did not fit in the 6 h.
- The ⚠ OVER BUDGET item is worth marks (a deliverable, a quiz, a graded set) rather than a habit.
- Two or more graded items collide on the same date inside the next 3 days.
- An exam is inside T-3 and the PREP ladder step did not fit.

It does **not** qualify on rollover count alone, on undated P2/P3 work, or on a career item with a
week left. Novel pages and the Friday revision block are habits: they justify a surge only when the
thing they feed is inside its own deadline window. Overusing this burns the signal — if a surge is
offered more than twice a week, the 6 h budget is being mis-set and that is the thing to say instead.

How to offer it: one line under the plan table naming **what the extra hours buy**, in marks or in a
lock that closes — not "you're behind". Then ask with `AskUserQuestion`. On a yes, re-run
`things_plan.py --budget 8` (or the number he gives; the bigger budget is remembered for that date,
and the 1 h Career reserve still applies, because only a day trimmed below its default skips it) and
post the new table. On a no, leave the plan alone and do not raise it again
that day. He asked to be **reminded**, so on a surge day that he accepted, the evening deck and the
next morning's run both carry one line on whether the surge item actually closed.

**Sync rule:** every new dated item found in Canvas / PrairieLearn / the CPSC 310 site / Piazza
instructor notes gets added to Things3 in the same run, via:
```bash
python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/things_add.py" \
  --title "WeBWorK 3" --project "STAT 251" --when 2026-09-29 --deadline 2026-10-06 --tags "2h, P1" --notes "Due Tue 23:59, no late"
```
Idempotent by title within the project (re-running updates instead of duplicating). Projects are
`CPSC 310`, `STAT 251`, `PHIL 385`, `ASIA 250` (all in area `UBC`); non-course school items go to
`--area UBC`; career items `--area Career`; everything else `--area Personal`. `--when` = the day it
becomes actionable (open date, or deadline − 7 days for big items); `--deadline` = the hard due date.
List what you added under "Things3" in the report.

Adding a to-do by hand: use AppleScript, not the URL scheme.
`make new to do with properties {name:…, notes:…}` then `schedule theToDo for <date>`,
`set due date of theToDo to <date>`, `set project of theToDo to project "X"` (NOT `move`, which
throws error 301). `activation date` is read-only, `sunday` is a reserved word, and the
`things:///add` URL scheme keeps `+` as literal characters unless you percent-encode. Never delete
inside a `whose` loop — snapshot ids first. (Lessons from 2026-09-10.)

### 2. Canvas — all active courses
Matt's STAT 251 lab section is **L1K** (Fri 11–12, ESB 1046, TA Zachary) — only track L1K lab quizzes.
Course IDs: ASIA 250 `193131` · CPSC 310 `192903` · PHIL 385 `192607` · STAT 251 `193293`.
**Ignore** `183899` Science Co-op Workshops and `136962`
Academic Integrity — Matt's call, 2026-09-10.

UBC blocks student Canvas access tokens (Matt tried 2026-09-10), so his logged-in Chrome session is the
only path; the token-based fetcher was deleted on 2026-10-06.

**The logged-in Chrome session.**
1. `ToolSearch` → `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__get_page_text,mcp__claude-in-chrome__tabs_close_mcp,mcp__claude-in-chrome__browser_batch`
2. `tabs_context_mcp {createIfEmpty:true}` → `navigate` that tab to `https://canvas.ubc.ca/`.
   Confirm the Dashboard loads (get_page_text shows course cards). If it's a CWL login page,
   stop this source: nothing is ever typed into it. Put one line under Heads-up —
   `Canvas signed out since <last signed-in line in routines/keepalive.log, else the newest
   routines/snapshots/canvas-*.json date> — sign in at canvas.ubc.ca in Chrome, then say
   "fetch canvas"` — and send the same words with
   `PushNotification` (status `proactive`) so he sees it the moment he is at the keyboard. The
   `fetch canvas` recipe (fetch skill) re-runs only the Canvas half once he has signed in.
3. `javascript_tool` with the full contents of `scripts/canvas_fetch.js`. It fetches every
   `/api/v1` endpoint (including **current grades** via `/users/self/enrollments`), stores JSON in
   `window.__co`, writes chunk 0 into the page body, and returns `total_len=… chunks=N`.
   A request that does not load goes into the JSON's `failed` list with its course, endpoint and
   error. That means a network error, a body that is not JSON, or any status other than 2xx, 404 and
   401 "unauthorized". Those two are Canvas saying a tab is turned off or hidden from students, so
   they count as an empty answer, not a failure.
4. Read chunks with one `browser_batch`: `get_page_text`, then for i in 1..N−1:
   `javascript_tool` text `window.__chunk(i)` followed by `get_page_text`.
   Large results get saved to a tool-results file — that's expected.
5. Reassemble + digest + diff:
   ```bash
   python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/canvas_digest.py" <path-to-tool-results-file-or-json>
   ```
   It accepts either the raw tool-results file or a plain JSON file, saves the snapshot, and
   prints: **grades** (current score per course, `CHANGED from …` when it moved), then a per-course
   digest plus a **diff vs the previous snapshot** (new announcements, new/changed assignments,
   submission scores, new module items, updated pages, new calendar events).
   A section in the `failed` list is never saved empty, because the next run would then announce all
   of it as new. The digest keeps the previous snapshot's copy of that section and prints one line,
   such as `Canvas: STAT 251 assignments failed (HTTP 500), kept the previous snapshot`. Everything
   that loaded still diffs and saves. Put the failed sections in one Heads-up line. Nothing needs a
   retry, because the next run fetches them again. The snapshot is written to a temporary file and
   renamed into place, so a killed run never leaves half a file. If the JSON has no `failed` list,
   the digest stops with an error, because an old copy of `canvas_fetch.js` made it.
6. Keep the tab open for the other Chrome sources (§2b, §5, §6) and §7 step 2, and `tabs_close_mcp` it after §7
   step 2. That step runs on Canvas, so it navigates the tab back to `https://canvas.ubc.ca/` first.

**Grades:** a changed current score or a newly scored submission is a "New since yesterday" line
(`CPSC 310 · D1 scored 92/100 · Canvas`) and updates the **Grades so far** table in `ledger.md`.
CPSC 310 also takes its lab scores from PrairieLearn (§6), because Canvas only carries the deliverables' autograde (Matt, 2026-10-02).
**Score cell format** (the notes site parses it): an optional total first (`100%`), then items as `Name got/of`, all separated
by `;`, then any plain remarks, each its own `;`-separated piece with no commas or parentheses inside it. Example: `100%; D1-Auto 100/100; LAB01 100/100; LAB02 74/100; the total is
Canvas only and the labs come from PrairieLearn`. A course whose Canvas total is hidden starts with `total hidden on Canvas;`.
**Bonus watch:** any announcement, Piazza note, or email containing "bonus" / "extra credit" becomes a
**Plan today** to-do (`things_add.py … --tags "30m, P1" --when today`) — Premarathna adds small bonuses through the term and Matt takes every one.

Gotchas (learned 2026-09-10):
- **Session lifetime (2026-09-13):** the Canvas/CWL session dies about 24 h after the last Canvas
  request. Sep 11 06:47 → Sep 12 06:36 (23.8 h) worked; Sep 12 06:36 → Sep 13 08:01 (25.4 h) hit
  the CWL page. The scheduled task only fires once the Mac is awake, so the run drifts to
  lid-open time and the gap can pass 24 h. Whether a request inside the window resets the timer
  (sliding) or it counts 24 h from sign-in (absolute — Matt's bet) is what `routines/keepalive.log`
  settles: the `canvas-keepalive` scheduled task touches canvas.ubc.ca at 13:00 and 21:00, logs
  `signed-in` / `signed-out`, and push-nudges him when it finds the CWL page. Sliding means he never
  signs in again; absolute means one 10 s sign-in a day at the nudge. Claude never signs in either
  way — a hard rule, asked and answered 2026-09-13.
- The extension blocks any `javascript_tool` *return value* containing query strings and any
  script containing the word "credentials". That's why the script strips `?…` from URLs and
  hands data back through the DOM instead of the return value.
- `get_page_text` truncates at ~50k chars, hence 40k chunks.
- Navigating straight to `/api/v1/...` URLs and reading page text also works, but
  `browser_batch` aborts on an empty `[]` response ("No text content"). Use it only for one-offs.

### 2b. WeBWorK — STAT 251 (Chrome; the extension was allowed on webwork.elearning.ubc.ca 2026-09-16)
Course: https://webwork.elearning.ubc.ca/webwork2/2026W1_V_STAT_V_251_101_2026W1 — Matt is logged in
through his Chrome session. If the page is a login form, treat it like a Canvas sign-out (one Heads-up
line; Claude never signs in). Read-only: never touch an answer box, Preview, Submit or Check Answers.
- **Every run:** `navigate` to the course URL and `get_page_text`. The Assignments list shows each open
  set's due date and each future set's open date. A changed date goes to Things3 (`WeBWorK N`), the
  ledger term calendar and `courses/STAT251/03-logistics.md` (drop the `~` once confirmed).
- **Read the status column too, and close what is finished.** The Assignments list marks a set
  completed or scored once every problem is answered. When it does, run
  `things_done.py --title "WeBWorK N" --project "STAT 251"` in the same run and say so under
  Things3. Without this the to-do keeps rolling and the plan shows work he has already done —
  WeBWorK 1 rolled four days that way and he had to say so himself (2026-09-19). When the tab is a
  login form the status is unknown, so the Heads-up line says the set may already be done rather
  than implying it is outstanding.
- **On a set's open day** (Tuesdays: Sep 22, Sep 29, Oct 6, Oct 13, Oct 20, Nov 3, Nov 17, Nov 24, Dec 1)
  or the first run after it: open `<course>/Assignment-0N/` (the problem list gives the count), then each
  `<course>/Assignment-0N/k/` with `get_page_text`. A problem whose text refers to a figure ("histogram
  shown below", a boxplot, a stemplot) gets a `computer` screenshot, and the counts are read off the
  image. Save the text to `routines/webwork/stat251-wwNN.txt`, then bank it per CLAUDE.md log step 8:
  one question per problem under `## WeBWorK N` in `courses/STAT251/02-questions.md`, numbers changed,
  `**Lec:** WWN`, tagged to existing ledger rows. Brief line under STAT 251:
  "WeBWorK N open · k problems banked · due <date>".
- **A CWL bounce here is transient far more often than it is real (2026-09-20).** The Sep 19 and the
  first Sep 20 attempt both landed on the CWL page and both runs gave up after ONE try and reported
  WeBWorK as signed out. Matt pushed back — "double check the webwork, because my link works" — and
  the very next navigation to the identical URL loaded the assignment list fine, same session, no
  sign-in. So the §5 three-attempt rule applies to webwork.elearning.ubc.ca exactly as it does to
  Canvas and Piazza: **navigate, and on a CWL page navigate again, up to three times, before
  reporting anything.** Reporting a set as unread when it is actually done is worse than a slow run —
  it kept a completed WeBWorK 1 in the plan for days.
- Fallback when the domain is denied or the tab is still signed out after three attempts: one Heads-up
  line, nothing more — "WeBWorK signed out; WeBWorK N status unknown, due <date>." No push
  notification and no chasing (Matt, 2026-10-02: "it's only stats and it's weekly assignments anyways,
  so just give the note"). He attaches the hardcopy PDF with `log STAT251 webwork N` when he wants it
  banked.
- Verified 2026-09-16: problem pages `Assignment-01/1/` and `/2/` read cleanly with `get_page_text`,
  and the histogram came through a screenshot; WeBWorK 1 itself was banked from the PDF he attached.

### 3. CPSC 310 course site (public; Canvas is not used at all)
The site is four pages and only one has slides: **Schedule** (week table; a lecture title turns into
a PDF link when its deck is posted, on lecture day between about 10:40 and 12:00, so after this
check), **Reader** (the textbook; exam terminology; its sidebar is the contents `prelecture.py`
prints in §7), **Syllabus** (policies), **Project** (deliverable specs, linked as they are
released). On 2026-09-28 the site removed its Course Materials unit pages, which were the only place
that matched lectures to reader chapters, so §7 now picks the chapter by its title. Run
```bash
python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/cpsc310_site.py"
```
It diffs the schedule against `routines/snapshots/cpsc310-site.json`, downloads any newly posted deck
to `routines/slides/cpsc310/` (git-ignored — course material stays out of the public repo) with the
text extracted beside it, and prints the next lecture and whether its deck is posted; it names no
reader chapter. Report its `NEW DECK` /
`CHANGED` / `ADDED` lines inside the CPSC 310 block — there is no separate "course site" section. A
`NEW DECK … not logged yet` line goes in Heads-up: it means the deck for an unlogged lecture is down
and `cpsc310_site.py --lecture N` gives the slide text to log from (Matt does not take notes in
CPSC 310 when the deck covers it — verified 2026-09-11, lec 1). A changed `due:` cell is a deadline
change: update `ledger.md`, `03-logistics.md`, Things3.
It exits non-zero when the schedule or a newly posted deck cannot be fetched or no longer parses, and
saves no snapshot; the brief then gets one Heads-up line naming the error instead of the site lines.

### 4. Gmail (connector `search_threads` / `get_thread`)
Matt doesn't delete mail, he archives it — so `in:inbox` is the live/unhandled set, not just
unread. Scope every query to `in:inbox is:unread` (Matt, 2026-09-12): a read-but-still-inboxed
message he's already triaged himself; an archived one is handled either way. Run these queries;
open with `get_thread` (PLAIN_TEXT) only the ones listed as "open":
| Query | Open? |
|---|---|
| `in:inbox is:unread newer_than:1d -in:draft` (pageSize 50) | scan subjects/snippets only |
| `in:inbox is:unread from:instructure.com newer_than:2d` | open all |
| `in:inbox is:unread from:piazza.com newer_than:2d` | open digests |
| `in:inbox is:unread (list:lists.ubc.ca OR from:sciencecoop.ubc.ca OR from:ubc.ca) newer_than:2d -from:instructure.com` | open anything from a human or with a date |
| `in:inbox is:unread (deadline OR "due" OR register OR bonus) newer_than:1d -from:linkedin.com` | scan |
Bucket everything into **School / Career / Admin+money** (Matt likes this format — keep it).
LinkedIn job alerts: one line listing company + role, no detail. Security alerts, receipts, boarding
passes: one line each. **Skip entirely:** Calendly / room-booking reminders and any calendar
reminder for something already on his calendar. Never suggest deleting mail — if something's spam
or a phishing attempt, say so and suggest archiving (or leaving it, since ignoring is enough); this
skill only ever reads mail, never archives/deletes it itself.

### 4b. Career: internship applications (local; Matt, 2026-10-02)
The Career repo keeps the record of every internship application: what went out, what he still has
to send on an employer's own site, and what closes soon. This step reads that record and his mail.
It never applies, never sends anything, and never opens SCOPE: SCOPE needs his CWL login, and
applying is a separate session he starts himself.
1. Run
   ```bash
   python3 "/Users/matthe/Documents/CodingProjects/Projects/Career/scripts/run.py" applications
   ```
   It rewrites `data/APPLICATIONS.md` in the Career repo and prints the **Career** block between
   the `===` lines. Paste the block into the brief verbatim, the same way the planner's block is
   pasted: it already keeps the rules below (dated rows as a table, four rows at most, one counted
   line for the rest). If the command fails, one Heads-up line and move on.
2. Run it again with `query=1` on the end. It prints one Gmail search covering every company he is
   still waiting on. Run that with `search_threads` (pageSize 25) and open each hit with `get_thread`.
3. For each thread where an employer is writing about one of his applications (not a job alert, not
   a newsletter, not LinkedIn):
   - One bullet under the Career block: `- <Company> · <what they said or asked, 8 words or fewer>`.
   - If it clearly belongs to exactly one row of `data/APPLICATIONS.md` (company and role both
     match), record that the email arrived:
     `python3 "/Users/matthe/Documents/CodingProjects/Projects/Career/scripts/run.py" mark-app <job_id> note "<sender>: <subject>"`.
     That logs the email without deciding what it means. **Never** run `mark-app` with interview,
     offer or rejected: the status is his call. Put the ready-to-paste command for the likely status
     under Details → Career instead. Some companies have more than one application (the ledger shows
     which), so a reply that does not name the role gets the bullet but no note.
   - A date in the email (an assessment due, an interview slot to pick) is a hard date: Heads-up,
     and Things3 via `things_add.py --title "Career · <Company> <what>" --deadline <date>
     --tags "1h, P1"`. Not `ledger.md`; that is for school.
   SCOPE mail (`from:sciencecoop.ubc.ca`) already comes in through §4's queries. An interview
   invite or posting update from there gets the same treatment here.
4. A reply to one of his applications goes in this block, not in §4's Career bucket, so the same
   email never appears twice. Job alerts and recruiter mail stay in §4.

### 5. Piazza (Chrome — needs the extension's site permission, see the note below)
Class feeds (new UI; `get_page_text` only returns the welcome note, so use `read_page`
filter=interactive to list the feed, then open posts by URL):
- CPSC 310: `https://piazza.com/class/mtkmphcadpx5k6` — posts at `/post/<n>`
- STAT 251: `https://piazza.com/class/mtnhr8ecx7c3po` — posts at `/post/<n>`
Feed links read `"<title>, <time>, <first 60 chars>"`. Open any instructor note (pinned/announcement
style: office hours, concessions, lab logistics) and any post newer than the last run with
`navigate` + `get_page_text`. Skip "Welcome to Piazza". Digest emails (§4) are the backup.
STAT 251 has a 1% bonus for 10+ endorsed answers: if a STAT post is unanswered and within his
reach, say so in one line (he answers two a week until it's banked).

**Site permission (revised again, 2026-09-11 morning manual run).** If `navigate` returns
`Navigation to this domain is not allowed`, or reads return `Permission denied for reading page
content on this domain`, **retry the same call up to 3 times before falling back** (Piazza →
Gmail digest; PrairieLearn → skip). Evidence: on 2026-09-11 at 08:09 both Canvas and PrairieLearn
failed twice in a row with this error and no permission prompt ever appeared to approve — then
both worked on the very next identical call, in the same session, still with no prompt. That rules
out the earlier "denial sticks for the session" theory (a stored allow/deny wouldn't flip on its
own); it looks instead like a transient extension/MCP connection hiccup, most likely right after a
fresh `tabs_context_mcp{createIfEmpty:true}` tab group spins up. So: **a bare "not allowed" with no
prompt shown is not evidence of a real block** — just retry. Only fall back once a domain has
failed **3** consecutive attempts, and say so in one line under Heads-up. `piazza.com`,
`us.prairielearn.com`, and `canvas.ubc.ca` are all on the extension's always-allow list, so a
genuine new-domain approval prompt shouldn't be needed for any of them any more — if one ever
actually appears (visible in a screenshot, not just this error text), that's the real "ask Matt to
approve it live" case, not the retry case.

### 6. PrairieLearn (Chrome — same site-permission note as §5)
`https://us.prairielearn.com/pl/course_instance/231184` → redirects to `/assessments`.
`get_page_text` gives the table: label, title, credit window ("100% starting from 08:00, Fri, Sep 11"),
score, and status (Not started / In progress / Complete). Report every row whose status isn't
Complete, with its window. Labs are due by the start of the next lab (course-site rule) *unless*
PrairieLearn's own credit window says otherwise — PrairieLearn is the authoritative deadline; the
"due by start of next lab" line is only a fallback guess when PrairieLearn hasn't been read. If a
row's window disagrees with ledger.md (like LAB01 Onboarding on 2026-09-11: ledger inferred
Sep 18 from the course-site rule, PrairieLearn's actual window was Sep 24 23:59), correct
ledger.md and Things3 to PrairieLearn's date and flag it as a correction, not just a diff. If the
session fails 3 consecutive attempts, skip it — the windows are already in ledger.md and Things3,
so only the status column is lost.
**Grades from PrairieLearn:** when an assessment's window has closed (LABnn and PRAQnn; a DELIVn row on PrairieLearn is the TA-marked design analysis, not the autograde,
which comes from Canvas as D1-Auto, so it goes in only once its mark is final and only as `D1 design analysis 25/100`),
its final score goes into the CPSC 310 row of **Grades so far** as `LAB02 74/100` (percent shown as out of 100), with the as-of
date set to today. An open assessment's running score is a status, not a grade, so it stays out of the row. A newly closed score
is also a "New since yesterday" line (`CPSC 310 · LAB02 closed at 74% · PrairieLearn`).

---

### 7. Today's classes + review (local; no browser needed beyond what §2/§3 already fetched)
Matt (2026-09-11) wants each brief to carry what today's lectures cover plus some review. Each
lecture today gets one line naming its topic and its staged outline. There are no pre-lecture
questions (Matt, 2026-10-06: the evidence for them with real lectures is weak). Topic
sources, per course:
- **STAT 251:** the newest page in the Canvas module *Lecture Materials* (page title or slide
  filename, e.g. "Ch 1 Exploratory Data Analysis"); if nothing new is posted, the week's chapter
  from the schedule in `courses/STAT251/00-syllabus.md`.
- **CPSC 310:** the `Next lecture` lines that `cpsc310_site.py` (§3) printed: the title and whether
  the deck is posted.
- **PHIL 385:** the reading assigned for today in `courses/PHIL385/00-syllabus.md`.
- **ASIA 250:** async — on Mondays only, this week's lecture + readings module on Canvas.
**Materials pull (2026-09-11, Matt: "today for whatever lecture, here's the slide summary").**
Slides and readings exist for three courses and are pulled every run; PHIL 385 has none (no slides,
recordings or notes), so nothing is staged for it. A staged `_NN` file is a plain-sentence outline
and nothing else.
1. **CPSC 310** (public site, no browser):
   ```bash
   python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/prelecture.py" --n 2
   ```
   It takes the next two lectures that have no log or outline yet. When a lecture's deck is posted,
   it downloads the deck (text in `routines/slides/cpsc310/NN-*.txt`) and names the
   `lectures/_NN-<slug>.md` to write: a plain-sentence outline of the deck's claims in slide order.
   Decks go up on lecture day between about 10:40 and 12:00, so at 06:35 today's lecture has none
   and the run ends with the reader's contents: the chapter titles and URLs in the reader index's
   sidebar. Nothing on the site maps lectures to chapters any more, so the routine picks one.
   - **Before the deck** (a lecture day, today's lecture only): pick the chapter whose title best
     matches the lecture title and stage it:
     ```bash
     python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/prelecture.py" --chapter N "<chapter URL>"
     ```
     It writes the chapter's text to `routines/prelecture/cpsc310/NN-<slug>.txt`. Write
     `lectures/_NN-<slug>.md` from it as a plain-sentence outline of the chapter's claims, only the
     sections the lecture title names when the chapter covers more (Design Patterns has six
     patterns; lecture 9 needs Factory and Decorator). The first
     line says in one sentence which chapter was used and why, for example: "Built from the reader
     chapter [Design Patterns](https://ubccpsc.github.io/310/textbook/3-software-design/design-patterns/)
     because the lecture title names two design patterns; the deck replaces this outline once it is
     posted." The run's other lecture waits for its own lecture day.
   - **After the deck:** the deck wins. The fetch skill's midday pass ("fetch pre-lecture CPSC310",
     a scheduled task at 12:30 on Tuesdays and Thursdays) rewrites the outline from the deck and
     keeps nothing of the chapter version.
   Quiz-bank questions wait for the lecture log. Both commands exit non-zero when the schedule, a
   deck, the reader index (read only when today's lecture has no deck) or the chapter cannot be
   fetched or no longer parses, and the error names the URL. The brief then gets one Heads-up line
   naming the error instead of staged material, and a lecture whose chapter failed waits for the
   midday pass to build its outline from the deck.
2. **STAT 251, ASIA 250** (Canvas, in the §2 Chrome tab, navigated back to `https://canvas.ubc.ca/`):
   run `scripts/canvas_materials.js` with `javascript_tool`. It replaces `canvas_fetch.js`'s `window.__chunk`, which
   is why §2 step 4 reads every chunk of that script first. Like `canvas_fetch.js`, it paints chunk 0
   and returns `total_len=… chunks=N`, and the last chunk ends with the line `END <n> items`. Read the
   chunks back as §2 step 4 does (`get_page_text`, then `window.__chunk(i)` and `get_page_text` for
   each next chunk) until the END line arrives, save them in order, each starting on a new line, to
   `routines/snapshots/materials-<date>.txt`, then
   ```bash
   python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/canvas_materials_digest.py" routines/snapshots/materials-<date>.txt
   ```
   It lists every item not marked yet, each with its key (`STAT251:<item id>`) and the Canvas file id
   of each deck, and it writes nothing. A request that does not load by `canvas_fetch.js`'s rule
   (anything but a 2xx, a 404 or a 401 "unauthorized") is painted as an `ERR` line. The digest still
   lists every new item, then names each failed course and request, such as
   `materials: ASIA250 modules failed (HTTP 500)`, and exits 1. Put them in one Heads-up line; the
   next run fetches them again. An item whose page did not load shows its `ERR page` line, and
   `--mark` refuses it. Text without the END line was cut off, and text holding a different number of
   items than that line names lost or repeated a chunk. Either way the digest lists and marks nothing,
   says so and exits 1, so read the chunks back again. For every listed deck or reading with a file id: pull its
   text with `scripts/canvadoc_text.js` (recipe in the file header:
   file page → canvadoc session → fetch `urls.pdf_download` → pdf.js; paint, `get_page_text`), then
   write `courses/<CODE>/lectures/_NN-<slug>.md` (STAT 251: lecture number from the page title;
   ASIA 250: week number) — plain-sentence outline of the deck (formulas in LaTeX between `$$` markers, per
   CLAUDE.md), main topics in slide order, and a
   `## Likely quiz targets` line for ASIA 250. A reading (not a deck) goes to
   `courses/<CODE>/readings/_<slug>.md` as an outline. Big books (Harvey, Luhrmann): extract only the
   assigned page range. Then mark what is done, in one call:
   ```bash
   python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/canvas_materials_digest.py" routines/snapshots/materials-<date>.txt --mark STAT251:<item id> ASIA250:<item id>
   ```
   - Mark a deck or reading once its outline or reading file is written. If the file is already there
     (an earlier run or the fetch skill wrote it without marking), mark it without pulling again.
   - Mark a recording, a quiz, a link, a page with nothing to pull, and any PHIL 385 item straight away.
   - Leave a deck unmarked when its pull failed, and leave a lecture page unmarked while it has no deck
     attached yet. The next run lists it again, so nothing is lost. A failed pull gets one Heads-up
     line instead of "no deck posted".
3. **Brief:** under **Today's classes**, one line per lecture today: course, lecture title, and
   `→ courses/<CODE>/lectures/_NN-<slug>.md` when the outline exists; a CPSC 310 outline built from a
   reader chapter adds "from the reader chapter". If the outline is missing because nothing is posted
   yet, say "no deck posted" — never summarise from memory.
   **Labs count as classes (Matt, 2026-09-15).** A lab is a fixed slot he has to show up to, so it
   gets its own bullet in the same block, before the lectures when it runs earlier in the day. His
   registered sections are **CPSC 310 L1N, Tue 09:00–11:00 on Zoom** (links in Piazza @14) and
   **STAT 251 L1K, Fri 11:00–12:00, ESB 1046** (in person, from Sep 21; Lab 0 the week of Sep 21 has
   no assignment). The bullet carries the section, the time, the room or "Zoom", and what is due —
   the PrairieLearn assessment for CPSC 310, the pre-lab quiz for STAT 251 — taken from the
   PrairieLearn read (§6) and the ledger, never from memory. Cancelled CPSC 310 labs: Wed Sep 30 and
   Mon Oct 12.
4. **Lecture log later** (CLAUDE.md rule): when he logs a lecture whose `_NN` file is still an outline, the
   outline is the clarification source and every deck-only claim becomes a question, then the `_NN` file is
   deleted (its content lives on in the questions and the notes file's Clarifications). A full study page
   (Full lecture prep, below) is renamed instead.

**Full lecture prep (Matt, 2026-10-06: "for the lectures today (for all my classes except philosophy), if
there are slides, maybe you can go through the slides, the recordings, and everything. Afterwards … I'll
submit my notes, and then you can add or adjust if needed").** Once a lecture's deck is posted, this replaces
the outline in steps 1–2 for STAT 251, CPSC 310 and ASIA 250. CPSC 310's deck goes up after the morning check
(about 10:40–12:00), so the Tue/Thu 12:30 `cpsc310-midday` task does its full prep and the chapter outline stands
until then. PHIL 385 is unchanged (nothing to pull).
- **Which lectures:** every lecture held today in those three courses whose deck is posted, plus ASIA 250's
  current week (async, video and slides up from Monday). For a lecture held earlier that is still unlogged,
  also fold in anything that has appeared since its page was written: the STAT `AL` deck, its Panopto
  recording, a CPSC deck that went up after class.
- **Sources:** the deck (STAT/ASIA via `canvadoc_text.js`, CPSC via `cpsc310_site.py --lecture N`), the
  recording where one exists (STAT: Panopto captions, recipe in `courses/STAT251/03-logistics.md` →
  Reference; ASIA: captions if the Canvas video has a track, otherwise deck only and say so; CPSC has
  none), and the assigned reader chapter or readings.
- **Write the page as the real study page, not an outline:** `courses/<CODE>/lectures/_NN-<slug>.md` in
  the course's lecture-file shape (CPSC 310: the deck-organised format in CLAUDE.md; STAT 251 and ASIA 250:
  `## Slides, organized`, `## In class` from the recording when there is one, `## Clarifications` where the
  deck and the recording or reader disagree), formulas in LaTeX. No pre-lecture questions (dropped on
  2026-10-06). Keep the underscore: term.py still counts the lecture unlogged and the `Log …` to-do stays
  open, which is his reminder to send notes after class.
- **Bank the questions now:** 6–12 per lecture into `02-questions.md` (long ones under `## Long problems`),
  with the topics added to `01-topics.md` and `ledger.md` (Next = tomorrow), run `check-math.mjs` on every
  touched file, then `quiz_pick.py --due` and `npm run parity` as CLAUDE.md step 3 says. A STAT 251 or ASIA 250
  item is marked with `canvas_materials_digest.py --mark` once its page is written.
- **When he sends notes** (`log <COURSE> lec N`): rename `_NN` → `NN`, add `## Your notes` with his words
  verbatim, and adjust the page and its questions only where his notes add or correct something. Report what
  changed, nothing else.
- **Brief:** the Today's classes line points at the page and names the question count. A lecture with no
  deck yet is "no deck posted", as before.

**Review = the transit deck, as a phone artifact (2026-09-13).** Two parts, in order:

0. **Pull yesterday's grades first, before generating anything new.** The deck lives at a fixed
   Artifact URL (below) with the `db` capability declared; the page writes each day's taps to
   `grades/<date>` there as he grades (or he says "grade my deck" ad hoc mid-day — same mechanism,
   see the quiz-me skill's Variants table). Query it: `ArtifactData` with `action: "query"`,
   `collection: "grades"` and `url` = the fixed URL below. For every returned doc
   that is **complete** (every item in `items` has a non-null `grade` — nobody left the deck
   half-graded) and not already `processed: true`: run `quiz_grade.py --transit <doc_id> "<replyString>"` (quiz-me
   skill; `--transit` grades the deck's own session file, which no quiz picked since can overwrite, and the doc_id,
   which is the deck's date, makes it refuse that file when it holds another day's deck), then mark that doc with
   `ArtifactData` `action: "update"`, the same `url`, `collection` and `doc_id`, `data: {"processed": true}` and
   `if_version` = the `version` the query returned for that doc, so it is never graded
   twice. **Leave a partial doc alone** — the page overwrites the whole document on every tap
   (a `.set()`, not a merge), so grading it mid-session would burn the pending
   `transit-session.json` before he's tapped the rest, and those later taps would have nowhere valid
   to land. Report what got graded under **New since yesterday** the way a normal quiz session
   would (grades, ledger delta). Nothing complete and unprocessed just means nothing to report —
   not an error.
1. Run
   ```bash
   python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/quiz-me/scripts/quiz_pick.py" --transit
   ```
   It picks 6 due/weak questions across courses (interleaved, exam-weighted, not-due topics fill the
   rest), writes `routines/runs/<date>-transit.md` (questions, a divider, then answers) plus the
   pending session `routines/transit-session.json`, and refreshes the ledger's **Due now** block.
   It stops in two cases, and `--replace` is the only way past either:
   - (A) `transit-session.json` holds an earlier day's deck that was never graded. Step 0 has already graded every
     complete deck (fix any error that stopped it first), so this one is unfinished or untapped: run step 1 again
     with `--replace` and add one Heads-up line naming that deck's date.
   - (B) Today's deck already exists (`routines/runs/<today>-transit.md`), graded or not, because a second deck
     under the same date would mix its taps with the first's. This is a second run today: skip steps 1 and 2 and
     keep this morning's deck.
2. Rebuild the artifact for today: same design (one question per card, tap to reveal, the answer as a
   checklist of key points whose ticks set the grade (Key points below), a "Brief ↗" button top-right that
   opens today's full Brief + Details as an overlay) with today's 6 questions and today's report
   substituted in. Republish with `Artifact`,
   passing `url:` (the fixed URL below — **never omit it**, or it forks a new artifact instead of
   updating this one) and `capabilities: {"db": {}}` still declared. `SendUserFile` is no longer
   used for this — the artifact is the deck now.
   **Math (2026-10-02):** STAT 251 questions and answers carry LaTeX between `$$` markers. The page must
   render it: start from `routines/transit-deck.html`, which loads `katex.min.js` from cdn.jsdelivr.net and
   passes every question and answer through its `mathify` function (MathML output, because an artifact page
   cannot load KaTeX's stylesheet; a few CSS rules line aligned rows up in Chrome). If you rebuild the page
   another way, carry over that script tag, `mathify`, the math CSS, and the `${mathify(item.q)}` and
   `${mathify(point)}` calls. Each question and each key point goes through three steps, in this order:
   1. Take every `$$` span out of the text first. The markdown step must never see LaTeX: marked turns
      `&= 0.65 \\` into `&amp;= 0.65 \`, and 243 lines of STAT 251's bank end in `\\`.
   2. Render the rest as markdown, as Questions as written below describes.
   3. Put each span back where it was and run the result through `mathify`. A display span goes back with
      its line breaks as `<br>`, because a `$$` span that contains a `<br>` is what `mathify` reads as a
      display equation.
   `notes-app/scripts/offline-pack.mjs` gets the same result inside marked: two marked extensions claim the
   `$$` spans as their own tokens before any markdown rule touches them (a `$$` line, the LaTeX and a `$$` line
   make a display equation; `$$…$$` inside a line is inline), and their renderer hands the untouched LaTeX to
   KaTeX.
   **Notes link (2026-10-05):** give each item `src` and `srcTitle` from the session item's `src_url` and
   `src_title` (the transit md's `Source:` line under each answer); the page links that notes page under the
   revealed answer.
   **Questions as written (2026-10-06):** fill each item's `q` from the session item's `q_display`, not its `q`
   (`q` is only the flattened text the question id hashes). `q_display` keeps the question's own lines: bullet parts,
   a table, or a CPSC 310 code block, and an answer can hold a code block too. Step 2 of the Math order above
   renders both as markdown: a fenced block as an HTML-escaped `<pre><code>`, a pipe table as `<table>`, `- `
   lines as a list, and any other line break as `<br>`. That replaces turning every newline into `<br>`, so code
   keeps its indentation and tables their columns, and it runs only after the `$$` spans are out.
   **Key points (2026-10-06, Matt approved):** people over-credit themselves when they grade their own answers
   (Dunlosky & Rawson 2012), so the revealed answer is a checklist of its key points and his ticks set the grade.
   There is no O/~/X tap.
   1. When you fill the items, split each session item's raw `a` with `keyPoints` below, copied exactly, before
      step 1 of the Math order. Each point then goes through the three steps on its own, as a whole answer did,
      and the page item carries the rendered points as `points` in place of `a`. An item with no points means an
      empty bank answer: stop and fix the bank, because a card with nothing to tick would grade `O`.
   2. The rules `keyPoints` applies:
      - A fenced code block, a display equation (a `$$` line through the next `$$` line) or a table (consecutive
        lines starting with `|`) is one unit and is never split. A blank line or a new `- `, `* ` or `1. ` line
        starts a new paragraph or list item.
      - A paragraph or list item splits into sentences after `.`, `?` or `!` and any closing quote, bracket, `*`
        or `_`, when a space follows and then a capital, a digit, an opening quote, `*`, `_`, a `$$` span, inline
        code or a part label such as `(b)`. It never splits inside a `$$` span or inline code, after `e.g.`,
        `i.e.`, `vs.`, `cf.`, `p.` or `pp.`, or after a lone capital letter, so "S. Kierkegaard" stays whole (and
        so does "a friend of B. It is called…", as one point).
      - Two kinds of fragment cannot stand alone, and they merge. A unit ending in `:` is a lead-in ("The rule:",
        "Then:") and joins the unit after it. A unit that starts with a lowercase letter outside a list item is
        the rest of a sentence a display equation interrupted, and joins the unit before it. A block joins with
        a blank line and a sentence with a space.
      - Nothing else merges. A one-word verdict ("False.", "(b).") stays its own point, so a right
        verdict without its reason grades `~`, as quiz-me grades it. A bare number opening an answer ("1831. His
        followers…") reads as a list number and stays with its sentence. There is no cap on the number of points.
      - A `- ` marker is dropped. A list number stays in front of its item, joined by a no-break space, so the
        markdown step shows it as text and not as a one-item list.
   3. On the page the points sit under the label "Key points: tick each one your answer had". Each point is a row
      with a check box that a tap toggles, and a line under the list counts them live ("2 of 3 ticked · ~").
      `gradeOf` below turns a card's ticks into its grade: `O` when every point is ticked, `~` when some are, `X`
      when none are. Nothing auto-advances and there is no Skip: once the answer is revealed, the primary button
      reads Next → (Finish → on the last card). Prev and Back to deck still work, and ticks can change.
   4. The page saves on every tap on a point and on Finish, as it saved on every O/~/X tap and on Finish
      before: the same `.set()` on `grades/<date>` with the same fields (`date`, `items` of `{idx, course,
      grade}`, `replyString`, `updatedAt`). A revealed card's `grade` is `gradeOf` its ticks, so `X` when he
      ticked nothing, and an unrevealed card's is null. `replyString` ("1 O 2 ~ 3 X") is built from those
      grades, so step 0 and quiz-me's "grade my deck", which read only `items[].grade`, `replyString` and
      `processed`, work unchanged.
   ```js
   // Key points of one answer: the session item's raw markdown `a` → its points in order (morning-check §7).
   function keyPoints(md) {
     const units = [];                                  // {text, block, item}
     let para = null;
     const flush = () => {
       if (para) sentences(para.text).forEach((s, k) =>
         units.push({ text: k ? s : para.num + s, block: false, item: para.item && !k }));
       para = null;
     };
     const lines = md.split('\n');
     for (let i = 0; i < lines.length; i++) {
       const t = lines[i].trim();
       const close = t.startsWith('```') ? '```' : t === '$$' ? '$$' : null;
       if (close || t.startsWith('|')) {                // code block, display equation, table: one unit, never split
         flush();
         let j = i;
         if (close) do j++; while (j < lines.length && lines[j].trim() !== close);
         else while (j + 1 < lines.length && lines[j + 1].trim().startsWith('|')) j++;
         units.push({ text: lines.slice(i, j + 1).join('\n'), block: true, item: false });
         i = j;
       } else if (!t) flush();
       else {
         const m = t.match(/^(?:[-*+]|(\d+)[.)])\s+(.*)/);
         if (m) { flush(); para = { text: m[2], num: m[1] ? m[1] + '. ' : '', item: true }; }
         else if (para) para.text += ' ' + t;
         else para = { text: t, num: '', item: false };
       }
     }
     flush();
     const out = [];
     for (const u of units) {
       const prev = out[out.length - 1];
       // a lead-in ending in ':' takes what follows; a lowercase start outside a list item finishes what precedes
       if (prev && (/:$/.test(prev.text) || (!u.block && !u.item && /^\p{Ll}/u.test(u.text)))) {
         prev.text += (prev.block || u.block ? '\n\n' : ' ') + u.text;
         prev.block = prev.block || u.block;
       } else out.push({ ...u });
     }
     return out.map((u) => u.text);
   }

   function sentences(text) {
     const held = [];                                   // $$ spans and inline code are never split
     const s = text.replace(/\$\$[\s\S]+?\$\$|`[^`]+`/g, (m) => `\u0000${held.push(m) - 1}\u0000`);
     const out = [];
     let from = 0;
     for (const m of s.matchAll(/[.!?]["”’')\]*_]*(?=\s+(?:[\p{Lu}\d"“‘*_\u0000]|\((?:[a-hA-H]|[ivx]+|\d)\)))/gu)) {
       const before = s.slice(0, m.index);
       if (/(?:^|[\s"“‘(])\p{Lu}$/u.test(before) || /(?:^|[\s(])(?:e\.g|i\.e|vs|cf|pp?)$/i.test(before)) continue;
       out.push(s.slice(from, m.index + m[0].length));
       from = m.index + m[0].length;
     }
     out.push(s.slice(from));
     return out.map((x) => x.trim().replace(/\u0000(\d+)\u0000/g, (_, n) => held[n])).filter(Boolean);
   }

   // O when every point is ticked, ~ when some are, X when none are.
   const gradeOf = (ticks) => (ticks.every(Boolean) ? 'O' : ticks.some(Boolean) ? '~' : 'X');
   ```

**Transit Deck artifact (fixed URL, update in place):**
https://claude.ai/code/artifact/c537efc7-50cf-4476-9aa5-b118cd0fa480

The brief's **Review** block lists the 6 questions (question only) and ends with a line pointing at
the artifact link instead of "reply with grades" — grading now happens on the page. The brief itself
never edits ledger rows. Build no deck only when the bank has no questions at all (the script exits 1
and says so) or step 1 found this morning's deck (case B), which the Review block then lists.

### 8. Ledger session log + publish (last step, every run)
If the run changed anything durable — a date in `ledger.md`, a grade row, a `03-logistics.md`
update, a Things3 sync — append one row to `ledger.md → ## Session log`:
`| YYYY-MM-DD | Morning check: <one line — what changed> |`. Nothing-new days get no row (the run
file is the record; the ledger stays signal). Then run
```bash
sh "/Users/matthe/Documents/CodingProjects/School 3-1/publish.sh" "Morning check YYYY-MM-DD"
```
It runs only on main: on any other branch, or a detached HEAD, it stops before committing anything and says
so. On main it commits whatever changed (ledger, logistics, questions) and pushes; GitHub Pages redeploys the
notes site at https://matthlh.github.io/school-3-1/ within a minute. `routines/` is git-ignored,
so briefs never leave the machine. Plain commit message — never an attribution trailer.

---

## Report format (`routines/runs/YYYY-MM-DD-morning.md`)

The file starts with the brief verbatim, then details only where a line needs more than a line.
If today's file already exists (a manual re-run), append a `## Re-run HH:MM` section instead of
overwriting it. The Canvas digest diffs against today's earlier snapshot in that case.

```
# Morning check — <Weekday YYYY-MM-DD>

## Brief

**Plan today — 5.75 of 6 h**   ← the planner's items (§1b) rendered as a TABLE, not its raw bullets
| Start | Est | What | When |         (Matt, 2026-09-20: the " · "-joined bullet list read as a wall)
|---|---|---|---|                      every item the planner picked gets a row, same order
| 09:00 | 2 h | <project> · <what> | <due, or "overdue since <d>"> |   Start = the planner's time, P1 rows only
|  | 15m | UBC · Deck: answer the 6 on the bus | due today |   habits, P2 and P3 rows leave Start blank
|  | event | <project> · <what> | <time> |   [event] = fixed slot, costs no budget
PHIL 385 Exam 2 is tomorrow, so today plans 3 h instead of 6 h.   ← the day before an exam only
Scaled by your actual times: 1h ×1.5.   ← only once a time tag has 5 recorded times
⚠ <item> is due <d> and there is no room for it today.   ← plain words, its own line
⚠ <item> would end after 22:30, so it moves to tomorrow.   ← the sleep cutoff, its own line ("so it is not planned today" when it was not in Today)
⚠ An 8 h day would fit <what, in marks>. Say the word.   ← the longer-day offer, rule below
Cushion: <course> <item> has 6 h of work before it, 40 h free.   ← one line per date with an exam, deliverable, paper or assignment within 14 days
⚠ <course> <item> has 14 h of work before <date> but only 12 h free.   ← replaces that date's Cushion line when it does not fit

**Rolled to tomorrow — N items**   ← also from the planner; omit the whole block if empty
- Dated ones only, one per bullet: <project> · <what> · rolled 4× · due <d>
- Then ONE closing bullet for the undated tail: "Twelve more, undated P2/P3. Rolling longest: …"
First thing tomorrow: <what>.   ← the planner's line, right under the rolled list
Time check: how long did <what> take?   ← the plan's last line; his answer goes to `--actual` (§1b)
**Week ahead — 25 of 42 h** (Mon Sep 14 → Sun Sep 20)   ← the Sunday 15:00 weekly-plan brief, verbatim from `--week`
- Mon 14 · 5.5/6 h · <what> · <what> (+2)
- ⚠ OVER BUDGET Thu Sep 17: … has no room before Sep 18   ← the one decision

**Today's classes**         one bullet per lecture AND per lab happening today (none on weekends):
- <course> · <section> <time> · lab   labs first when they run earlier · section, time, room or
    <what is due>                     Zoom, and what is due
- <course> · <time> · <topic>         time · topic from the slide/page title, course-site row
- ...                                 or reading schedule (§7) · the staged outline (§7 step 3)

**Review — 6 questions**    today's 6 phone-deck questions (§7). In the CHAT BRIEF give
- <course> · <short version>          only a short version — the topic and the ask, ~12 words, never the
- ...                                 full worked question (Matt, 2026-09-20: the long ones made the
- Transit Deck: <url>                 brief unreadable). The run file keeps them in full. Answers and
                                      grading live on the artifact. "- Bank empty" if the script exits 1.

**New since yesterday**
- <course> · <what> · <source>        new deadlines, announcements, Piazza instructor
- ...                                 notes, PrairieLearn items, grades. "- Nothing new" if none.

**Heads-up**
- Unlogged lectures: <course> (<date>) · <course> (<date>)
- <due in 2–7 days / date conflict / blocked source / overdue ledger topic>

**Career: <N> applied, <N> interviews, <N> offers**   ← §4b, printed by run.py, pasted verbatim
| Closes | Still to apply | Note |          up to 4 rows, one per company, next 3 days only
|---|---|---|
| <Day Mon D time> | <Company> · <role, or N roles> | <referral or blank> |
- <N> more companies close by <date>. Full list: data/APPLICATIONS.md
- <Company> · <what the employer said>     one bullet per reply found in §4b step 3

**Week ahead**              Sundays only (or when asked): one bullet per hard date in the
- ...                       next 14 days from ledger.md + Things3 + term.py, then
                            "- Saturday flex block: needed / delete"

**Self-improvement**        (Matt, 2026-09-20: "what I shd be doing better / shouldn't be")
                            Use his words: "revision" or "review", never "retrieval".
Keep doing                  Three blocks, at most 3 bullets each, omit a block with nothing real in it.
- <what worked, from evidence this run>
Start doing
- <the change, then the number that justifies it>
Stop doing
- <the habit that is costing him, then what to do instead>

**Where the evidence comes from — never invent these.** Roll counts and the ⚠ line from
`things_plan.py`; graded/ungraded decks from the artifact db (§7 step 0) and `routines/quiz-state.json`;
overdue topics and streaks from `ledger.md`; unlogged lectures from `term.py`; missed or unsubmitted
work from the Canvas digest and PrairieLearn. Every bullet names the number it rests on. A roll count
≥ 5 on a dated item, a deck that went ungraded twice running, or an unlogged lecture with marks
attached is always worth a bullet. Praise only what the run can actually show he did — no
encouragement filler, and no repeating the same three bullets every day: if nothing changed since
yesterday's run file, say "Same three as yesterday" and move on. This is the one block allowed to
give advice; everything else in the brief stays reporting.

## Details
### <Course>            only courses with something new; deadlines as a table:
                        | Due (Pacific) | Item | Pts | Status |
                        anything undated: bullets, one fact each
### Review answers      link to routines/runs/<date>-transit.md (answers are in the deck)
### Gmail               School / Career / Admin+money — dated items as a table, the rest bullets
### Career              per employer reply: sender, subject, date, and the mark-app command for
                        the likely status, ready to paste (§4b). "Nothing new" if no replies.
### Things3             bullets: title → project, when, deadline, tags (items added/updated this run)
### Ledger              bullets: dates added/changed · grade rows updated ·
                        "logistics updated: <file>" if any · "session-log row added" ·
                        "published <sha>" or "nothing to publish" (§8)
```
Calendar events (classes, gym, badminton) never appear in **Plan today** — Things3 holds tasks, not
the timetable; today's lectures have their own block.

**Formatting rule (Matt, 2026-09-10 evening):** never join items into a paragraph with " · ".
Header line, then bullets, one item per bullet, in the brief AND every details section. He
called the first paragraph-style brief "a large pile". Tables for dated rows, bullets for
everything else, prose never.

**Vocabulary rule (Matt, 2026-09-20, in two passes).** First he said "too much jargon and buzz
words… I can't understand what you're saying". Then he corrected the over-correction: "I'm ok with
stuff like hard lock and rolled 4x, just don't go over board and make formatting much much better if
you're gonna do a lot of abbrevs." So the rule is not "no shorthand" — it is **a small, stable
vocabulary, and layout that carries it**.

**Fine to use, no explaining.** Terms that recur in every brief and that he has learned by now:
`hard lock`, `rolled 4×`, `overdue since <date>`, `unlogged`, `P1/P2/P3`, the time tags, the quiz
grades `X / ~ / O`, and real course names — `D1`, `LAB02`, `WeBWorK 2`, `Mini-Quiz 2`, `Exam 1`.

**Not fine.** Terms coined for a single brief, which is what actually broke it. "Over budget line",
"what I pitched", "novel pages", "surge day", "stems", "banked", "massed practice", "the ladder",
"close-out", "staged" — he had to ask what three of those meant. Before using a compact phrase, ask:
has it appeared in a brief before, or am I inventing it right now? If inventing, write the plain
version instead.
- Say *The Golden Pavilion* — his ASIA 250 novel — not "novel pages".
- Say "it all fits now", not "the over budget line is gone".
- Say "what I suggested", not "what I pitched".
- Say "revision" or "review", never "retrieval" (Matt, 2026-09-20).

**The density trade-off — this is the part he emphasised.** Shorthand is only readable when the
layout does the work. The more abbreviations on a line, the more structure it needs around it.
- A line carrying two or more compact terms goes in a **table cell**, never in running prose.
- One idea per row or bullet. Never stack `rolled 4×` and `hard lock` and a date in one sentence.
- Put the consequence in its own column or its own bold fragment, so it reads without parsing the
  rest: **Late = 0**, **closes tomorrow**, **overdue since Sep 17**.
- If a block needs more than about four compact terms to say its piece, that block is too dense —
  split it or move the detail to the run file.

Script names, file paths and JSON keys are never brief material regardless; they belong in Details.

**Word list — his words, not mine.** He said 2026-09-20 "fuck it i'll just slowly correct what's
good and what isn't", so this table grows one row at a time as he corrects a word. Applying a
correction means changing it *everywhere he reads it* in the same session — the brief, `ledger.md`,
`PREP.md`, `README.md`, `STUDY-SYSTEM.md`, `CLAUDE.md`, both skills, the planner's to-do titles and
the notes site — not just in that day's reply. Renaming a generated to-do also means renaming the
open one in Things3 and its key in `routines/plan-state.json`, or the next run makes a duplicate.

| Don't say | Say | Added |
|---|---|---|
| retrieval | revision, or review | 2026-09-20 |
| over budget line | it all fits now / there's no room for X today | 2026-09-20 |
| what I pitched | what I suggested | 2026-09-20 |
| novel pages | The Golden Pavilion (his ASIA 250 novel) | 2026-09-20 |
| surge day | long day, 8 h day | 2026-09-20 |
| stems | short version of the question | 2026-09-20 |
| massed practice | all in one day | 2026-09-20 |

One term survives on purpose: `STUDY-SYSTEM.md` keeps "retrieval practice" once, in the sentence
citing Roediger & Karpicke, because that is the literature's name for the effect and the linked
sources use it. Everywhere else it is revision.

**Density rule (Matt, 2026-09-20: "can you format things better? It's really messy to read"):**
the brief is scanned in about twenty seconds, so length is the enemy, not missing detail — the run
file holds the detail.
- **One line, one fact, twelve words or fewer.** A bullet that needs a comma-spliced second clause
  belongs in Details.
- **Plan today and any dated list is a table**, not bullets — the ` · ` separators inside a bullet
  are what made it read as a wall.
- **Bold only the thing that changes his morning** — a hard lock, a collision, an ⚠. If three
  things are bold, nothing is.
- **Never say the same fact in two blocks.** A hard lock goes in Heads-up OR in the plan table's
  When cell, not both; "New since yesterday" carries the source, Heads-up carries the consequence.
- **Collapse tails.** More than four items of the same kind (rolled to-dos, LinkedIn alerts, Piazza
  setup posts) become one counted line.
- **Cut "Nothing new" blocks to a single line** rather than a header plus a bullet.

**Settled facts stay settled (Matt, 2026-09-20: "we alr went over this").** When he has decided
between two disagreeing sources, that decision is final and a later run must not reopen it just
because the losing source still says the old thing. PHIL 385 Exam 3 was settled at **Fri Oct 30** on
2026-09-14; the 2026-09-19 run saw Nov 20 on the Canvas quiz page and put it back on the Ask Kraal
list, which cost him a to-do and a second explanation.

- Before flagging any date conflict, grep `ledger.md`'s Session log and the course's
  `03-logistics.md` for the item. If a row already records his ruling, say nothing.
- Record a ruling so it is greppable: the course file gets the decision **and the reason it beats the
  other source**, plus "do not reopen this from <source>". A bare date is not enough — the next run
  needs to know why Canvas is wrong.
- A source that keeps contradicting a settled fact is reported at most once, as "Canvas still shows
  Nov 20 for Exam 3; that stays a setup slip", and only if something about it actually changed.
- This applies to any fact he has ruled on, not only dates: exam format, which lab section, whether a
  set is done. Reopening a closed question reads as not listening.

Rules: tables for anything dated · points/weight when known · mark `unsubmitted` · when two sources
disagree on a date, print both and flag it · a new hard date goes to **ledger.md AND Things3** in
the same run · no course-content summaries · no repeating yesterday's items unless
they're now due. A new Term calendar row gets a Kind when `term.py` should count it down (`exam`,
`deliverable`, `paper`, `assignment`, or `admin` for a deadline with no prep steps), and every other
row leaves Kind empty. A past exam row keeps its Kind and time: the lecture count skips a lecture an exam
replaced, so clearing the row shifts every later lecture number. The finals rows (`Dec 11–22`) have no Kind, so
the finals get no exam-aware scheduling yet: when the SSC posts the December schedule, give each final its one-day
Date with its time span and Kind `exam`. "Plan today" means exactly that: the list he should clear before the day
ends, inside the budget. Nothing informational goes there.

## Chat brief
The `## Brief` block, ≤30 lines (the plan table's header rows and the Self-improvement block bought
five, 2026-09-20 — they are not licence to write longer bullets), plus the Career block (§4b: at most
8 lines from the script, plus one per employer reply), plus a link to the run file. No
preamble. **Self-improvement** is the only block that may give advice; everywhere else, advice is
limited to a deadline collision or a ⚠ OVER BUDGET line that needs a decision.

---

## Tuning log (newest first)
- 2026-10-06 (Matt: "make all the changes above"):
  - The countdown dates live only in the ledger's Term calendar. A Kind column marks the countdown rows, `term.py`
    reads them, and the STAT 251 written assignments get their own ladder.
  - Canvas: a failed request keeps that section's previous snapshot and adds one Heads-up line. Materials stay
    listed until `--mark` runs after the pull.
  - CPSC 310: before the deck, the reader chapter whose title matches the lecture's is staged with
    `prelecture.py --chapter`, and the Tue/Thu 12:30 `cpsc310-midday` task rebuilds the outline from the deck.
    Pre-lecture questions are gone for every course.
  - The planner adds daily habits, PHIL 385 reading pairs, start times that skip lectures and labs, Cushion
    lines, First thing tomorrow, a Time check answered with `--actual`, and half a budget on exam eves.
  - The transit deck shows each answer as key points whose ticks set the grade. The weekly brief carries the
    FSRS shadow verdict until it decides.
- 2026-10-06 (Matt): §7 gains **Full lecture prep**. For STAT 251, CPSC 310 and ASIA 250 the morning
  check builds today's lecture page from the deck, the recording and the reading, and banks its questions;
  his after-class notes are merged in later. Also: `publish.sh` runs as the last step again (§8), after a
  stretch where runs skipped it.
- 2026-10-02 (Matt: "is there a way to combine this check with that? Like check for new emails,
  auto apply, check for updates and responses"): §4b added. The morning check now reads the Career
  repo's applications ledger, pastes its Career block (what closes in 3 days, interviews, quiet
  ones), and runs one Gmail search for replies from every company he is waiting on. It logs a reply
  as a note and leaves the status to him. **Auto-apply stays out of this routine**: SCOPE needs his
  CWL login and signs out after about an hour, employer sites need accounts, and a cover letter he
  has never seen should not go out under his name at 06:35. Applying is a session he starts.
- 2026-09-15 (Matt: "For today's classes also include labs (i have one today)"): **Today's
  classes** now covers labs as well as lectures — a lab is a fixed slot he has to attend, so it
  earns its own bullet with section, time, room or Zoom, and what is due. His sections are CPSC 310
  **L1N** (Tue 09:00–11:00, Zoom) and STAT 251 **L1K** (Fri 11:00–12:00, ESB 1046, from Sep 21);
  the CPSC 310 section id was missing from `03-logistics.md` until now. Lab lines carry no
  pre-questions.
- 2026-09-13 (Matt: "can you not just login for me?"): no — passwords are never typed and Duo
  needs his phone. The 09-13 CWL wall was a 25.4 h gap between Canvas requests (the run fires
  at lid-open, not 06:35; Sep 11→12 was 23.8 h and fine). So: `fetch canvas` (fetch skill) re-runs
  the Canvas half after he signs in, the wall now also sends a PushNotification, and the
  `canvas-keepalive` scheduled task (13:00 · 21:00, log in `routines/keepalive.log`) keeps the
  session touched inside 24 h or nudges him to sign in.
- 2026-09-13 (Matt: "make it an artifact" → "add to this routine"): the transit deck moved from a
  sent file to a persistent Artifact (fixed URL, rebuilt in place every run) with inline O/~/X
  grading and a Brief overlay. Because the artifact declares the `db` capability, taps get saved
  server-side — so the morning check now opens with a check of that database for anything graded
  since the last run (§7 step 0) and grades it automatically, instead of waiting for a pasted
  reply. `SendUserFile` retired for this purpose.
- 2026-09-11 (evening, Matt): §8 added — when a run changes something durable, append a one-line
  row to the ledger's Session log, then `publish.sh` (commit + push → Pages redeploy). Site is the
  public notes app; briefs stay local.
- 2026-09-11 (quiz-me skill built): the **Review** block is now the transit deck — 6 questions
  from `quiz_pick.py --transit`, sent to his phone as a file, graded from his reply with
  `quiz_grade.py`. Replaces the hand-picked ≤3 questions. The ledger's Due-now block is refreshed
  by that run.
- 2026-09-11 (Matt: "Things is super messy"): Things3 is now planned, not just read. Every to-do
  has an estimate tag (15m/30m/1h/2h/3h/event) and a priority tag (P1/P2/P3); `things_plan.py`
  rebuilds Today each run inside a 6 h/day budget, rolls the losers to Tomorrow, creates the
  lecture close-out / ladder-step / weekly-novel to-dos itself, and prints the brief's first block.
  "Do today" is gone — replaced by **Plan today** + **Rolled to tomorrow**; cap 20 → 25 lines to
  make room. One-off cleanup the same day: 26 stale Today items → 15 planned, the rest tagged and
  filed to Anytime or dated. Old-term tags (Math 221, CPSC 213, …) left alone.
- 2026-09-11 (evening, Matt): brief gains **Today's classes** (time · topic · "3 Qs below") and
  **Review** (≤3 due questions, answers in Details); details gain *Pre-lecture Qs* and *Review
  answers*; cap raised 15 → 20 lines. §7 lists the topic source per course. Pre-questions, not
  summaries. Also: lecture files are no longer templated — his notes verbatim + clarifications.
- 2026-09-11 (morning manual run): the "denial sticks for the session" theory below is wrong too —
  Canvas and PrairieLearn both failed twice with no prompt shown, then worked on the third
  identical call, same session. Rule is now **retry up to 3x, no prompt ≠ real block**, fall back
  only after 3 straight failures. Also: PrairieLearn is authoritative over the "due by start of
  next lab" course-site guess when the two disagree — caught LAB01 Onboarding actually running to
  Sep 24, not Sep 18, and corrected ledger.md/Things3.
- 2026-09-11 (evening, corrected): Piazza and PrairieLearn are **not** permanently blocked — the
  morning's "hard block" diagnosis was wrong. Both read fine from a session that holds the
  Claude-in-Chrome site permission; the two failures were sessions where the new-domain grant was
  never given (unattended scheduled run, then the same session continued by hand), and the denial
  stuck for the session. Fix: always-allow `piazza.com` and `us.prairielearn.com` in the extension.
  Rule stays: one attempt per run, then Gmail-digest fallback / skip. Tab-cleanup rule kept.
- 2026-09-10 (19:04 scheduled test-fire): brief and details must be **bullets under bold headers**,
  never " · "-joined paragraphs (Matt: "a large pile"). Template rewritten. Also learned: a
  scheduled run can't approve Chrome's new-domain prompt — piazza.com and prairielearn.com were
  blocked because nobody was at the keyboard. Approve them once in a manual run; canvas.ubc.ca
  was already allowed and worked.
- 2026-09-10 (review pass): added `term.py` (unlogged lectures + exam/deliverable countdown tied
  to the PREP ladders) as step 0 · Canvas grades fetched and diffed, table in ledger.md · bonus
  watch · Sunday "Week ahead" block · Piazza bonus nudge · scheduled task actually fires at
  **06:35** (cron `30 6` + jitter), docs aligned · per-instructor grade intel in
  `research/course-intel.md`.
- 2026-09-10 (evening, from Matt's 14 notes): drop booking reminders · drop Academic Integrity
  and Co-op Workshops courses · one-time info goes to `courses/<CODE>/03-logistics.md`, never
  repeated · no separate course-site section · Gmail format stays · Canvas per-course blocks are
  tables, not prose (STAT 251 was unreadable) · every dated item is synced into Things3 ·
  "Act on today" renamed "Do today" and means literally that · report = brief + details-only-if-new.
- 2026-09-10 (morning): first run deliberately unfiltered (`routines/runs/2026-09-10-morning.md`).
