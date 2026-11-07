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
Matt has ~6 h of work time a day outside class. Flexible work is ordered **School > Career > Personal > other**
(Matt, 2026-11-06), in both daily and weekly plans. There is no Career reserve. Preserve fixed external events
on the calendar; an urgent Career alert does not change this work order. Every to-do carries two tags: an **estimate**
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
fires today, or the latest applicable step after a missed run, named for its item (`T-3 STAT 251 Midterm · FULL TIMED MOCK`, the name being the bold name in
the item's Term calendar row; the ladders are `term.LADDERS`, one per kind: exam, deliverable, paper and
assignment, each step with its time tag; once the item's date has passed, or on an exam's own day, its open steps
are cancelled), the weekly `Golden Pavilion: read 30–35 pages (week of …)`
for ASIA 250 from Sep 14, the **daily habits** (`HABITS` in the script: `Deck: answer the 6 on the bus, tick key
points (<date>)` and `Quiz me: 10 min before bed (<date>)` in area UBC, plus any personal ones listed in the git-ignored
`private/habits.json` (none where the file is missing); 15m P1 each, due today; an open one from
an earlier day, or under an old title, is cancelled, never rolled; a title in `PAUSED_HABITS` is not created and an
open one is cancelled, which holds both UBC habits since 2026-11-04), and the **PHIL 385 reading pair** from the syllabus
schedule in `PHIL_READINGS`, from a week before the reading's first class (`Read PHIL385: <title> (class …)`
1h P1, due the first class, created until the last class, skipped if any open to-do already mentions
the title; `Log PHIL385 reading: <title>` 15m P1, due the last class; both are completed once
`courses/PHIL385/readings/<slug>.md` exists, and one still open 21 days after the last class is cancelled)
— then (2) scores every candidate within its area (deadline urgency → P-tag → was already planned → rollover count),
(3) keeps fixed events and fills the budget School, Career, Personal, then other, with a 1.5 h cap on P3 filler,
(4) gives the plan a clock
(below), and (5) applies it: picked items are scheduled Today, anything that was in Today and
lost is scheduled Tomorrow (counted as a rollover in `routines/plan-state.json`, which bumps it
next time so nothing starves), undated Anytime items stay in the pool. A to-do that loses again after 5 rollovers
(2026-11-06) stops competing blindly: a pinned or P1 one, or one due within 3 days or overdue, still rolls and is
flagged under **Stuck**; any other one moves out with a one-sentence note, a P3 with no deadline to Someday, the rest
to the day the weekly planner would pick, and to Someday on a second stick when it has no deadline (a dated one, or one
he brought back from Someday, is flagged instead). If no future day has room, flag the item instead of silently
overbooking. After a missed planner run, create only the latest applicable preparation step and list missing
prerequisites in its notes; do not create a pile of old daily blocks. `--dry-run` previews;
`--budget 3` trims a short day and is remembered for that date;
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
- **Needs an area** lists each open Things3 project with no area that is not a course project (2026-11-06): its
  to-dos rank as other, below Personal, until it is filed. Put the line in the brief under Heads-up with the area it
  looks like ("Khan Academy push: file under Career?"); filing a project is his call, so never move it yourself.
- **Stuck** follows Rolled to tomorrow. It lists up to 5 flagged to-dos, most rolled first, each with its roll count,
  priority, estimate and deadline state, then a `+N more` line and one `Moved out of the daily plan` count. Each move
  also has an auto line.
- A `Cushion:` line covers each date in the next 14 days that has an exam, deliverable, paper or assignment
  (an admin date gets none), in date order. Its hours count all the work due before that date, so each line
  includes the lines above it: every open course to-do due by then, plus every ladder step still to come before
  it. Free is the daily budgets from today to the day before; School has first claim on that capacity. When the work is
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
- A personal fixed-time event (badminton, gym, an appointment, a social plan) never goes into Things3. Put it on
  Google Calendar (primary calendar; search for it first so it is not doubled), and cancel any Things3 to-do that
  carries one (Matt, 2026-11-04).
- Every to-do you add this run (sync rule below) gets `--tags` too. Untagged = 30m and flagged.
- Never hand-schedule things into Today outside the planner ("shuffle to tomorrow" = move out +
  `--budget H`); set `--when`/`--deadline` and tags
  and let it decide. If a ⚠ OVER BUDGET line appears, that is the one decision for Matt in the brief.
- Turn the planner's picked items into the brief's numbered Plan today list (Report format below): task, estimate,
  when due, link. Its start times and most ⚠ lines stay in Details (Matt, 2026-11-05).

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
`things_plan.py --budget 8` (or the number he gives; the bigger budget is remembered for that date) and
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
   routines/snapshots/canvas-*.json date> — sign in at https://canvas.ubc.ca/ in Chrome, then say
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
**Item names match the syllabus's Grading table** (the Grade what-if panel places each item by its name, and an item it
cannot place blanks the panel): `Exam 2`, never `Exam2`; ASIA 250's responses as `Short Written Response 1`; one item
per part a component counts, so CPSC 310's `D1-Auto` and `D1-Manual` and no `D1-Total`; a missed item as `0/10` with
the remark after it (`Mini-Quiz 6 0/10; Mini-Quiz 6 was missed and locked at 0`), so the panel counts it.
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
  line, nothing more — "WeBWorK signed out; WeBWorK N status unknown, due <date>. Sign in:
  https://webwork.elearning.ubc.ca/webwork2/2026W1_V_STAT_V_251_101_2026W1". No push
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
Since 2026-10-10 a separate 06:05 scheduled task, `applications-inbox-sweep` (Career repo), has already
flipped application receipts to `applied`, noted rejections, logged replies to his cold emails in
`data/contacts.jsonl` and marked receipts read before this check runs; its run file is
`drafts/inbox-sweeps/<date>.md` in the Career repo. Read that file first and do not re-note what it
handled; this step still owns the brief's Career block and the interview-first line.
It never applies, never sends anything, and never opens SCOPE: SCOPE needs his CWL login, and
applying is a separate session he starts himself.
1. Run
   ```bash
   python3 "/Users/matthe/Documents/CodingProjects/Projects/Groundwork/scripts/run.py" applications
   ```
   It rewrites `data/APPLICATIONS.md` in the Career repo and prints the **Career** block between
   the `===` lines. That block goes in Details → Career only; the brief's Career block is built from email (steps
   2–4), because the ledger's counts and nudge lists go stale (Matt, 2026-11-05). If the command fails, one
   Details line and move on.
2. Run it again with `query=1` on the end. It prints one Gmail search covering every company he is
   still waiting on. Run that with `search_threads` (pageSize 25) and open each hit with `get_thread`.
3. For each thread where an employer is writing about one of his applications (not a job alert, not
   a newsletter, not LinkedIn):
   - One bullet under the Career block: `- <Company> · <date of the email> · <what they said or asked, 8 words or
     fewer>`. Every reply bullet carries the email's date (Matt, 2026-10-09: "make sure to have the date in replies").
   - **An interview invite, an assessment, or an offer is the first line of the whole brief**, above Plan today, in
     bold, with the company, the date it arrived and any date it asks for (Matt, 2026-10-09: "I just need to see that
     and I don't want to miss that"). It also goes out as a PushNotification (status proactive) in the same words.
     The Career block repeats it. Nothing else in the brief gets this treatment.
   - If it clearly belongs to exactly one row of `data/APPLICATIONS.md` (company and role both
     match), record that the email arrived:
     `python3 "/Users/matthe/Documents/CodingProjects/Projects/Groundwork/scripts/run.py" mark-app <job_id> note "<sender>: <subject>"`.
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
4b. **LinkedIn, through its emails only** (Matt, 2026-10-09: "start looking through my LinkedIn notifications").
   Run `in:inbox is:unread from:linkedin.com newer_than:2d (message OR InMail OR "sent you" OR "accepted your
   invitation" OR "replied" OR recruiter)` with `search_threads` and open the hits that are a person writing to him:
   a recruiter message or InMail, a reply to one of his outreach messages, an accepted connection from someone in
   the Career repo's contacts. Each becomes a Career-block bullet with its date (`- LinkedIn · <Name, Company> ·
   <date> · <what they said, 8 words or fewer>`); a recruiter message about a role he applied to is treated as an
   employer reply (step 3), and one that asks for a time or sends an assessment gets the first-line treatment and
   the Things3 date. An accepted connection or a reply to his outreach is also recorded in the Career repo with
   `run.py mark <email> replied` when the person is in `data/contacts.jsonl`. Job alerts, "someone you may know",
   newsletters and profile-view notices stay a one-line count in §4. **Never open linkedin.com itself**, in Chrome
   or otherwise: the Career repo's rule is that LinkedIn automation risks a restricted account, which would cost
   the alumni filter. If the emails are thin, the fix is his LinkedIn notification settings (messages and
   connections by email on), not browsing the site.
5. **School > Career > Personal > other** (Matt, 2026-11-06, replacing the Oct 9 order). Flexible Career work
   uses the capacity left after School work. A booked external event keeps its calendar slot; report a conflict
   instead of moving or cancelling it. Interviews, assessments and offers retain their first-line alert and push.
6. **Applying is allowed without asking, with one hold** (Matt, 2026-10-09). Companies worth applying to that turn
   up in the Substack newsletters, in email or in his LinkedIn notes are applied to straight away in a Career
   session, following the Career repo's applying recipe, and the brief reports what went out. The hold: big tech
   and medium-sized tech, or any company where he plausibly has a referral (the Career repo's referral list, a
   named contact there, or a company Bill or his mother knows), is **not** applied to; it is listed under the
   Career block as "held for a referral: <company> · <role> · closes <date>" and he decides. The morning check
   itself still does not apply at 06:35: it lists the candidates, and the applying happens in the session he is
   present for or the one this routine hands off to (see the Career repo's `CLAUDE.md`, Applying).

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
failed **3** consecutive attempts, and say so in one line under Heads-up. **Every signed-out or
blocked-source line carries the site's link** (Canvas, WeBWorK, Piazza, PrairieLearn, SCOPE), because
Matt signs in himself from the brief (2026-10-09: "just give me the link if it needs a login"); the
Piazza links are in §5 and the rest in root `links.md`. `piazza.com`,
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
  with the topics added to `01-topics.md` and `ledger.md` (Next = `not studied`: he has not studied it yet, so
  nothing is due until he sends notes or says he has studied it, and then `quiz_pick.py --studied <COURSE> <lec>`
  starts it; Matt, 2026-11-01), run `check-math.mjs` on every
  touched file, then `quiz_pick.py --due` and `npm run parity` as CLAUDE.md step 3 says. A STAT 251 or ASIA 250
  item is marked with `canvas_materials_digest.py --mark` once its page is written.
- **When he sends notes** (`log <COURSE> lec N`): rename `_NN` → `NN`, add `## Your notes` with his words
  verbatim, and adjust the page and its questions only where his notes add or correct something. Then
  `quiz_pick.py --studied <COURSE> N` starts that lecture's topics (due today). Report what changed, nothing else.
- **Brief:** the Today's classes line points at the page and names the question count. A lecture with no
  deck yet is "no deck posted", as before.

**Paused (Matt, 2026-11-04: "Remove the daily quizing for now, I haven't been doing it").** No deck had been tapped
since Oct 13. While `PAUSED_HABITS` in `things_plan.py` holds the deck habit, run step 0 only, so a deck he does tap
still gets graded, and skip steps 1 and 2: no new deck and no artifact rebuild. Run `quiz_pick.py --due` instead, so
the ledger's Due now block stays fresh. The brief's Review block becomes one line, "Review: daily deck paused since
Nov 4." The rest of this section is how it runs when he restarts it.

**Review = the transit deck, as a phone artifact (2026-09-13).** Two parts, in order:

0. **Pull yesterday's grades first, before generating anything new.** The deck lives at a fixed
   Artifact URL (below) with the `db` capability declared; the page writes each day's taps to
   `grades/<date>` there as he grades (or he says "grade my deck" ad hoc mid-day — same mechanism,
   see the quiz-me skill's Variants table). Query it: `ArtifactData` with `action: "query"`,
   `collection: "grades"` and `url` = the fixed URL below. For every returned doc that is not already
   `processed: true` and has at least one graded item: run `quiz_grade.py --transit <doc_id> "<replyString>"` (quiz-me
   skill; `--transit` grades the deck's own session file, which no quiz picked since can overwrite, and the doc_id,
   which is the deck's date, makes it refuse that file when it holds another day's deck), after rewriting any
   question the doc marks `flagged` (key rule 4 below). **A partial doc is graded too** (2026-11-06: "stop whenever;
   completed attempts remain recorded"): each card is recorded once, the cards already recorded are skipped when the
   same doc is graded again after more taps, and the session file stays open for the rest. Mark the doc
   `ArtifactData` `action: "update"`, the same `url`, `collection` and `doc_id`, `data: {"processed": true}` and
   `if_version` = the `version` the query returned, only once every item has a grade, so it is never graded twice.
   Report what got graded under **New since yesterday** the way a normal quiz session would (grades, ledger delta).
   Nothing graded and unprocessed just means nothing to report — not an error.
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
2. Rebuild the artifact for today with `build_transit_deck.mjs --date <today> --brief <brief html>`: one question per
   card, a confidence tap to reveal, the answer's key as a checklist whose ticks set the grade (The key below), a "Brief ↗" button top-right that
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
   **Brief overlay (Matt, 2026-10-13: "for the morning, deck include more info if needed"):** `--brief` is the whole
   brief, not a stub: first-line career alert, Plan today table, Rolled to tomorrow, Today's classes, New since
   yesterday, Heads-up and the Career block, as HTML, so the phone shows everything the chat brief does.
   **Notes link (2026-10-05):** give each item `src` and `srcTitle` from the session item's `src_url` and
   `src_title` (the transit md's `Source:` line under each answer); the page links that notes page under the
   revealed answer.
   **Questions as written (2026-10-06):** fill each item's `q` from the session item's `q_display`, not its `q`
   (`q` is only the flattened text the question id hashes). `q_display` keeps the question's own lines: bullet parts,
   a table, or a CPSC 310 code block, and an answer can hold a code block too. Step 2 of the Math order above
   renders both as markdown: a fenced block as an HTML-escaped `<pre><code>`, a pipe table as `<table>`, `- `
   lines as a list, and any other line break as `<br>`. That replaces turning every newline into `<br>`, so code
   keeps its indentation and tables their columns, and it runs only after the `$$` spans are out.
   **The key (Matt, 2026-11-01; replaces the 2026-10-06 sentence-split key points and the 2026-10-13 share scores):**
   people over-credit themselves when they grade their own answers (Dunlosky & Rawson 2012), so the page never asks
   for O/~/X. `build_transit_deck.mjs` does all of this; build the page with it, never by hand.
   1. Every bank answer opens with its rubric: `Key:` (a short question), `Steps:` (a long problem) or `Parts:`
      (independent parts of equal weight, 2026-11-06), numbered one-line points, then a blank line and the explanation
      (CLAUDE.md step 2). In a Key or Steps list point 1 is the core; a Parts list has none. The builder stops on a
      picked question without one: fix that bank answer and build again.
   2. Each card opens on the question and three confidence buttons, 1 Guess, 2 Think so, 3 Sure. The tap reveals the
      key as tick rows (point 1 marked Core on a Key or Steps card), the explanation folded under it, and the notes link.
   3. The ticks set the grade: the core not ticked is `X`, the core with any other point unticked is `~`, every point is
      `O`. A Parts card is graded by count: every part `O`, at least half `~`, fewer `X`. An `O` at confidence 3 climbs the ladder; at 1 or 2 it is a Good and holds its rung (quiz_grade.py reads
      the confidence from the token). A `~` or `X` offers the five cause chips, optional.
   4. **Bad question** takes a card out of grading: its token is `N:-` and the doc marks it `flagged: true`. Before
      grading a doc, rewrite every flagged question in the bank (the key, the explanation or the stem, whichever is
      wrong) and say which.
   5. Every tap saves `grades/<date>` with `.set()`: `date`, `items` of `{idx, course, grade, conf, cause, flagged,
      ticks}` (`grade` is null until revealed, `-` when flagged), `replyString` in quiz_grade.py tokens
      (`1:O3 2:X1/c 3:-`) and `updatedAt`. Reopening the page reads the doc back and resumes at the first unrevealed
      card. Step 0 and "grade my deck" pass `replyString` to `quiz_grade.py --transit <date>` unchanged; there is no
      `--score` any more.
   6. The finish screen lists every card with its grade (a tap goes back to it), the flagged cards, and a Reread card
      for each `~` and `X` with its notes page and the points he did not tick.

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

**🔔 <Company> · interview / assessment / offer · arrived <date> · <what it asks for and by when>**   ← only when §4b found one; first line, bold, nothing above it
**Format (Matt, 2026-11-05: "just do like numbered … much easier to read, also, too many logistics"):** every list
in the brief is a numbered or bulleted list, never a table and never a run of ⚠ lines. Plan today is numbered in the
order to do them, one line each: `N. Task (est) [when due] - link`. No start times, no project prefix unless the title
needs it, the link only when one exists (the to-do's own `links.md` row, a lecture page, a Canvas page). Logistics
(clock skew, which source was read, script output, planner bookkeeping) go in Details, never the brief.

**Plan today — 6 of 6 h**   ← the planner's picked items (§1b), numbered, same order
1. LAB07 API Design & Versioning (1 h) [closes today 23:59] - https://us.prairielearn.com/pl/course_instance/231184
2. Optional Assignment 2 (30m) [due Fri] - <link>
3. Dentist (event) [15:20]
- At most two warning bullets under the list: the biggest deadline that did not fit, and the 8 h offer when §1b's
  test passes. The rest of the planner's ⚠ lines (overdue backlog, cushion lines) go in Details as a count.

**Rolled to tomorrow**   ← omit if empty
- First thing tomorrow: <what>.
- Dated rolled items, one bullet each; then one bullet counting the undated tail.

**Stuck**   ← omit if empty
- <task> (rolled N×): split, defer or drop?   one bullet per listed to-do, then the +N more count. A to-do listed
  here is left out of the Rolled bullets; the moved-out count and auto lines go in Details.

**Today's classes**
- <course> · <time> · <topic> - <lecture page link if one exists>   labs first when they run earlier

**New since yesterday**
- <course> · <what>   one fact per bullet; "Nothing new." as one line if none

**Heads-up**
- Unlogged: <course> (<dates>), one bullet per course
- <blocked source with its sign-in link / date conflict / due in 2–7 days>

**Career**   ← from email only (Matt, 2026-11-05: "at least track emails, because most of what you're tracking are out
of date"). Build it from §4b steps 2–4 (employer replies, LinkedIn people messages, SCOPE), one bullet each with its
date. Do not paste run.py's counts, stale INTERVIEW lines, "quiet 14+ days" or "postings close later" lines; they
go in Details. An interview, assessment or offer still goes first in the whole brief. "No employer emails since
<last run date>." when there are none.
- <Company> · <email date> · <what they said, 8 words or fewer>

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
the timetable; today's lectures have their own block. Personal events live on Google Calendar only, never as a
Things3 to-do (Matt, 2026-11-04: "you don't need to add it to things3, just calendar is fine").

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
- **Plan today is a numbered list and every other list is bullets** (2026-11-05, replacing the 2026-09-20 table) — the ` · ` separators inside a bullet
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
- 2026-11-05 (Matt): the brief's Plan today is a numbered list, `N. Task (est) [when due] - link`, with no start
  times; every other block is bullets; logistics and most ⚠ lines move to Details; the Career block is built from
  email only, not run.py's stale counts.
- 2026-11-04 (Matt): personal fixed-time events go on Google Calendar, not Things3; the "Badminton (Wed night)"
  to-do was cancelled and the event put on the calendar. The daily bus deck and bed quiz are paused (`PAUSED_HABITS`
  in `things_plan.py`, twelve untapped decks since Oct 13), so §7 builds no deck until he restarts them; a Someday
  to-do "Restart daily quizzing (bus deck + bed quiz)" under UBC holds the idea.
- 2026-10-14 (Matt: "something's wrong with the priority"): `things_plan.py` scores work due today or tomorrow above work whose date has passed. Before, overdue scored 1000 and due-tomorrow 900, and the was-planned and rollover bonuses kept old revision steps above LAB04 and WeBWorK 4 closing the next day; overdue now takes the 2–3 day band's 700 and wins ties by date.
- 2026-10-09 (Matt): interviews, assessments and offers are the brief's first line and a push, every employer
  reply carries its date, and applying no longer waits for his say
  except big or medium tech where a referral is plausible (§4b steps 5–6). The keepalive task now also touches
  WeBWorK, and a signed-out line always carries the sign-in link; SCOPE is his to sign in to, no keepalive.
  LinkedIn is read through its notification emails (§4b step 4b), never the site.
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
  `private/course-intel.md` (local only since 2026-10-08).
- 2026-09-10 (evening, from Matt's 14 notes): drop booking reminders · drop Academic Integrity
  and Co-op Workshops courses · one-time info goes to `courses/<CODE>/03-logistics.md`, never
  repeated · no separate course-site section · Gmail format stays · Canvas per-course blocks are
  tables, not prose (STAT 251 was unreadable) · every dated item is synced into Things3 ·
  "Act on today" renamed "Do today" and means literally that · report = brief + details-only-if-new.
- 2026-09-10 (morning): first run deliberately unfiltered (`routines/runs/2026-09-10-morning.md`).
