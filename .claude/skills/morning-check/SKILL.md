---
name: morning-check
description: Morning sweep of Things3, Canvas (every course, grades, + the CPSC 310 course site), PrairieLearn, Piazza, and Gmail, plus term status (unlogged lectures, exam countdown). Reports only what changed, syncs new deadlines into Things3 and ledger.md, writes routines/runs/<date>-morning.md, and builds the day's plan in Things3 (6 h budget, scripts/things_plan.py), and posts a ≤25-line brief. Use for "morning check", "what's new", "plan my day", "daily sweep", "week ahead", "term status", or when the scheduled morning task fires.
---

# Morning check

**Deliverable:** a chat brief of at most 25 lines (that IS the product) plus the same brief with
details at `routines/runs/YYYY-MM-DD-morning.md`. The Things3 Today list is rebuilt every run so
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
   shows up in **Plan today**. `term.py` holds the
   machine-readable copy of the term dates: when a date changes in `ledger.md`, change it there too.
1. Read the newest file in `routines/runs/` so you can report deltas, not the whole world again.
2. Read `ledger.md` — overdue retrieval topics go in Heads-up, and the term calendar is the thing you
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
fires today (`T-3 STAT 251 · FULL TIMED MOCK`), the weekly `Novel: read 30–35 pages (week of …)`
for ASIA 250 from Sep 14, the two **daily retrieval habits** (`Deck: answer the 6 on the bus, reply
grades (<date>)` and `Quiz me: 10 min before bed (<date>)`, 15m P1 each, area UBC; an open one from
an earlier day is cancelled, never rolled), and the **PHIL 385 reading pair** from the syllabus
schedule in `PHIL_READINGS` (`Read PHIL385: <title> (class …)` 1h P1, skipped if any open to-do
already mentions the title; `Log PHIL385 reading: <title>` 15m P1, closed by a file in
`courses/PHIL385/readings/`) — then (2) scores every candidate (deadline urgency → P-tag → was already
planned → rollover count), (3) fills the budget by score with a 1 h Career reserve and a 1.5 h cap
on P3 filler, and (4) applies it: picked items are scheduled Today, anything that was in Today and
lost is scheduled Tomorrow (counted as a rollover in `routines/plan-state.json`, which bumps it
next time so nothing starves), undated Anytime items stay in the pool. It prints the brief block
(**Plan today — x of 6 h** / **Rolled to tomorrow** / **Needs an estimate/priority tag** / ⚠ over
budget). `--dry-run` previews; `--budget 3` trims a short day and is remembered for that date (no
Career reserve on a trimmed day); `--seed` pre-creates the term's ASIA 250 watch+quiz to-dos; knobs are
at the top of the script. A future when-date he set by hand holds unless the deadline is within a day.
Open-ended weekly to-dos (novel pages Mon, retrieval block Fri, groceries Sat) come from the `WEEKLY`
table one week ahead; tick one and it stays ticked.

**Weekly mode — Sundays 15:00 (scheduled task `weekly-plan`) and "plan my week":** run
```bash
python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/things_plan.py" --week
```
It places next week's work on days: everything due Mon→Sun (+3 days) and any undated P1 item gets a
when-date — a hand-set day is kept if it fits, otherwise the project's rhythm day (`RHYTHM`: STAT Mon,
CPSC Tue/Wed, PHIL Thu, ASIA Wed, Career Tue/Thu, Personal Sat), otherwise the lightest day, weekdays
first, always before the deadline. Events, `WEEKLY` instances, ladder steps and anything tagged `pin`
never move. Weekly owns when-dates; the daily run owns Today/Tomorrow and never moves a future date.
It prints the brief's **Week ahead — x of 42 h** block (one line per day; `⚠` = over budget; `moved` /
`placed` lines; a `⚠ OVER BUDGET` line is the decision for Matt: push to the Saturday flex block or cut).
The weekly-plan task posts it as its own ≤12-line brief (block + hard dates in 14 days + unlogged) and
writes `routines/runs/<date>-week.md`; the daily run never calls `--week`. On any other day, "plan my week" =
`--week --next-week` (the coming Mon→Sun); add `--dry-run` to preview.

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
Course IDs: ASIA 250 `193131` · CPSC 310 `192903` · PHIL 385 `192607` · STAT 251 `193293` ·
PHIL 321 `194666` (until he drops it). **Ignore** `183899` Science Co-op Workshops and `136962`
Academic Integrity — Matt's call, 2026-09-10.

**Path A — Canvas access token. NOT AVAILABLE: UBC blocks student token creation (Matt tried
2026-09-10). Kept only in case that changes.** If `~/.config/canvas/token` ever exists, run:
```bash
python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/canvas_fetch.py"
```
It writes `routines/snapshots/canvas-<date>.json` and prints the digest + diff vs the previous
snapshot. No browser needed. (Matt creates the token himself: Canvas → Account → Settings →
Approved Integrations → "+ New Access Token", then pastes it into that file. Never ask him to
paste it into chat.)

**Path B — logged-in Chrome session (works today).**
1. `ToolSearch` → `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__get_page_text,mcp__claude-in-chrome__tabs_close_mcp,mcp__claude-in-chrome__browser_batch`
2. `tabs_context_mcp {createIfEmpty:true}` → `navigate` that tab to `https://canvas.ubc.ca/`.
   Confirm the Dashboard loads (get_page_text shows course cards). If it's a CWL login page, stop.
3. `javascript_tool` with the full contents of `scripts/canvas_fetch.js`. It fetches every
   `/api/v1` endpoint (including **current grades** via `/users/self/enrollments`), stores JSON in
   `window.__co`, writes chunk 0 into the page body, and returns `total_len=… chunks=N`.
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
6. `tabs_close_mcp` the tab.

**Grades:** a changed current score or a newly scored submission is a "New since yesterday" line
(`CPSC 310 · D1 scored 92/100 · Canvas`) and updates the **Grades so far** table in `ledger.md`.
**Bonus watch:** any announcement, Piazza note, or email containing "bonus" / "extra credit" becomes a
**Plan today** to-do (`things_add.py … --tags "30m, P1" --when today`) — Premarathna adds small bonuses through the term and Matt takes every one.

Gotchas (learned 2026-09-10):
- The extension blocks any `javascript_tool` *return value* containing query strings and any
  script containing the word "credentials". That's why the script strips `?…` from URLs and
  hands data back through the DOM instead of the return value.
- `get_page_text` truncates at ~50k chars, hence 40k chunks.
- Navigating straight to `/api/v1/...` URLs and reading page text also works, but
  `browser_batch` aborts on an empty `[]` response ("No text content"). Use it only for one-offs.

### 3. CPSC 310 course site (public; Canvas is not used at all)
The site is four pages and only one has slides: **Schedule** (week table; a lecture title turns into
a PDF link when its deck is posted), **Course Materials** (unit pages: lecture → what it answers →
reader chapters), **Reader** (the textbook; exam terminology), **Syllabus** (policies). Run
```bash
python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/cpsc310_site.py"
```
It diffs the schedule against `routines/snapshots/cpsc310-site.json`, downloads any newly posted deck
to `routines/slides/cpsc310/` (git-ignored — course material stays out of the public repo) with the
text extracted beside it, and prints the next lecture with its reader chapters. Report its `NEW DECK` /
`CHANGED` / `ADDED` lines inside the CPSC 310 block — there is no separate "course site" section. A
`NEW DECK … not logged yet` line goes in Heads-up: it means the deck for an unlogged lecture is down
and `cpsc310_site.py --lecture N` gives the slide text to log from (Matt does not take notes in
CPSC 310 when the deck covers it — verified 2026-09-11, lec 1). A changed `due:` cell is a deadline
change: update `ledger.md`, `term.py`, `03-logistics.md`, Things3.

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

---

### 7. Today's classes + review (local; no browser needed beyond what §2/§3 already fetched)
Matt (2026-09-11) wants each brief to carry what today's lectures cover plus some review. Do it
as **pre-questions, not summaries** — a heading he can't yet answer primes attention better than
a paragraph he skims. Topic sources, per course:
- **STAT 251:** the newest page in the Canvas module *Lecture Materials* (page title or slide
  filename, e.g. "Ch 1 Exploratory Data Analysis"); if nothing new is posted, the week's chapter
  from the schedule in `courses/STAT251/00-syllabus.md`. Headings → 3 Qs; tie each to an LO code
  from `01-topics.md` when obvious.
- **CPSC 310:** the `Next lecture` block that `cpsc310_site.py` (§3) printed: title, the "what it
  answers" question, and the reader chapter URL(s). WebFetch the chapter and turn its headings into
  3 Qs (CLAUDE.md rule). Exam terminology lives there. If the deck is already posted, its slide
  titles (`routines/slides/cpsc310/NN-*.txt`) are the better source.
- **PHIL 385:** the reading assigned for today in `courses/PHIL385/00-syllabus.md`. 3 Qs on names,
  pseudonyms, terms, which essay — the MC exams test exactly that.
- **ASIA 250:** async — on Mondays only, this week's lecture + readings module on Canvas; 3 Qs.
**Materials pull (2026-09-11, Matt: "today for whatever lecture, here's the slide summary").**
Slides and readings exist for three courses and are pulled every run; PHIL 385 has none (no slides,
recordings or notes — the syllabus reading list is its only source, so it keeps the reading-based
pre-questions above).
1. **CPSC 310** (public site, no browser):
   ```bash
   python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/prelecture.py" --n 2
   ```
   It stages the next two lectures' reader chapters in `routines/prelecture/cpsc310/NN-*.txt` (and the
   deck text in `routines/slides/cpsc310/` once posted) and names which `lectures/_NN-<slug>.md` is
   missing. Write that file from the staged text: a plain-sentence outline of the chapter's claims
   under `## What the chapter claims`, then `## Three pre-lecture questions`. Quiz-bank questions wait
   for the lecture log.
2. **STAT 251, ASIA 250, PHIL 321** (Canvas, in the §2 Chrome tab, after `canvas_fetch.js`):
   run `scripts/canvas_materials.js` with `javascript_tool`, read it back with `get_page_text`, save
   the text to `routines/snapshots/materials-<date>.txt`, then
   ```bash
   python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/morning-check/scripts/canvas_materials_digest.py" routines/snapshots/materials-<date>.txt
   ```
   It prints only items not seen before, with the Canvas file id of each deck. For every new deck or
   reading with a file id: pull its text with `scripts/canvadoc_text.js` (recipe in the file header:
   file page → canvadoc session → fetch `urls.pdf_download` → pdf.js; paint, `get_page_text`), then
   write `courses/<CODE>/lectures/_NN-<slug>.md` (STAT 251: lecture number from the page title;
   ASIA 250: week number) — plain-sentence outline of the deck, main topics in slide order, a
   `## Likely quiz targets` line for ASIA 250, and 3 pre-lecture questions. A reading (not a deck)
   goes to `courses/<CODE>/readings/_<slug>.md` as an outline plus 3 questions tagged to the week's
   topic. Big books (Harvey, Luhrmann): extract only the assigned page range.
   PHIL 321 lives here only until the Sep 18 decision; its syllabus PDF is file 47994081.
3. **Brief:** under **Today's classes**, one line per lecture today: course, lecture title, and
   `→ courses/<CODE>/lectures/_NN-<slug>.md` when the outline exists, then the 3 pre-questions. If
   the outline is missing because nothing is posted yet, say "no deck posted" — never summarise from
   memory.
4. **Lecture log later** (CLAUDE.md rule): when he logs the lecture, the `_NN` outline is the
   clarification source and every deck-only claim becomes a question, then the `_NN` file is deleted
   (its content lives on in the questions and the notes file's Clarifications).

**Review = the transit deck, as a phone artifact (2026-09-13).** Two parts, in order:

0. **Pull yesterday's grades first, before generating anything new.** The deck lives at a fixed
   Artifact URL (below) with the `db` capability declared; the page writes each day's taps to
   `grades/<date>` there as he grades (or he says "grade my deck" ad hoc mid-day — same mechanism,
   see the quiz-me skill's variant table). Query it: `Artifact` → `action: "read_db"`,
   `db_op: "query"`, `collection: "grades"`, `url` = the fixed URL below. For every returned doc
   that is **complete** (every item in `items` has a non-null `grade` — nobody left the deck
   half-graded) and not already `processed: true`: run `quiz_grade.py "<replyString>"` (quiz-me
   skill, same as a pasted reply), then write back `processed: true` on that doc
   (`action: "write_db"`, `db_op: "update"`, same `collection`/`doc_id`) so it is never graded
   twice. **Leave a partial doc alone** — the page overwrites the whole document on every tap
   (a `.set()`, not a merge), so grading it mid-session would burn the pending
   `quiz-session.json` before he's tapped the rest, and those later taps would have nowhere valid
   to land. Report what got graded under **New since yesterday** the way a normal quiz session
   would (grades, ledger delta). Nothing complete and unprocessed just means nothing to report —
   not an error.
1. Run
   ```bash
   python3 "/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/quiz-me/scripts/quiz_pick.py" --transit
   ```
   It picks 6 due/weak questions across courses (interleaved, exam-weighted, not-due topics fill the
   rest), writes `routines/runs/<date>-transit.md` (questions, a divider, then answers) plus the
   pending session `routines/quiz-session.json`, and refreshes the ledger's **Due now** block.
2. Rebuild the artifact for today: same design (one question per card, tap to reveal, inline O/~/X
   that auto-advance, a "Brief ↗" button top-right that opens today's full Brief + Details as an
   overlay) with today's 6 questions and today's report substituted in. Republish with `Artifact`,
   passing `url:` (the fixed URL below — **never omit it**, or it forks a new artifact instead of
   updating this one) and `capabilities: {"db": {}}` still declared. `SendUserFile` is no longer
   used for this — the artifact is the deck now.

**Transit Deck artifact (fixed URL, update in place):**
https://claude.ai/code/artifact/c537efc7-50cf-4476-9aa5-b118cd0fa480

The brief's **Review** block lists the 6 questions (question only) and ends with a line pointing at
the artifact link instead of "reply with grades" — grading now happens on the page. The brief itself
never edits ledger rows. Skip the deck only if the bank has no questions at all (the script exits 1
and says so).

### 8. Ledger session log + publish (last step, every run)
If the run changed anything durable — a date in `ledger.md`, a grade row, a `03-logistics.md`
update, a Things3 sync — append one row to `ledger.md → ## Session log`:
`| YYYY-MM-DD | Morning check: <one line — what changed> |`. Nothing-new days get no row (the run
file is the record; the ledger stays signal). Then run
```bash
sh "/Users/matthe/Documents/CodingProjects/School 3-1/publish.sh" "Morning check YYYY-MM-DD"
```
It commits whatever changed (ledger, logistics, questions) and pushes; GitHub Pages redeploys the
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

**Plan today — 5.75 of 6 h**   ← verbatim from things_plan.py (§1b), ONE BULLET PER ITEM
- [30m] <project> · <what> · due <d>   ordered by priority; [event] = fixed slot, no time;
- ...                                 the lecture close-outs collapse into one line ("· 1 overdue")
**Rolled to tomorrow**          ← also from the planner; omit the header if empty
- <project> · <what> · rolled 2×
**Week ahead — 25 of 42 h** (Mon Sep 14 → Sun Sep 20)   ← the Sunday 15:00 weekly-plan brief, verbatim from `--week`
- Mon 14 · 5.5/6 h · <what> · <what> (+2)
- ⚠ OVER BUDGET Thu Sep 17: … has no room before Sep 18   ← the one decision

**Today's classes**         one bullet per lecture happening today (none on weekends):
- <course> · <time> · <topic>         time · topic from the slide/page title, course-site row
- ...                                 or reading schedule (§7) · end with "3 Qs below"

**Review**                  the 6 transit-deck questions (quiz_pick.py --transit, §7) —
- <course> · <question>               QUESTION ONLY; answers + grading live on the Transit Deck
- ...                                 artifact (§7, fixed URL), rebuilt each run with today's 6.
- Transit Deck: <url>                 "- Bank empty" if the script exits 1.

**New since yesterday**
- <course> · <what> · <source>        new deadlines, announcements, Piazza instructor
- ...                                 notes, PrairieLearn items, grades. "- Nothing new" if none.

**Heads-up**
- Unlogged lectures: <course> (<date>) · <course> (<date>)
- <due in 2–7 days / date conflict / blocked source / overdue ledger topic>

**Week ahead**              Sundays only (or when asked): one bullet per hard date in the
- ...                       next 14 days from ledger.md + Things3 + term.py, then
                            "- Saturday flex block: needed / delete"

## Details
### <Course>            only courses with something new; deadlines as a table:
                        | Due (Pacific) | Item | Pts | Status |
                        anything undated: bullets, one fact each
### Pre-lecture Qs      3 per class today, written from the slide/heading titles as
                        what / why / when-would-you-use-it — NOT a summary. He reads them on
                        the bus and tries to answer; the lecture then confirms or corrects.
### Review answers      link to routines/runs/<date>-transit.md (answers are in the deck)
### Gmail               School / Career / Admin+money — dated items as a table, the rest bullets
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

Rules: tables for anything dated · points/weight when known · mark `unsubmitted` · when two sources
disagree on a date, print both and flag it · a new hard date goes to **ledger.md AND Things3 AND
term.py** in the same run · no course-content summaries · no repeating yesterday's items unless
they're now due. "Plan today" means exactly that: the list he should clear before the day ends,
inside the budget. Nothing informational goes there.

## Chat brief
The `## Brief` block, ≤25 lines, plus a link to the run file. No headers, no preamble, no advice
unless a deadline collision or a ⚠ OVER BUDGET line needs a decision.

---

## Tuning log (newest first)
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
