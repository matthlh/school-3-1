---
name: fetch
description: On-demand pull of one specific resource instead of a full morning check — today's transit deck, a course's pre-lecture outline (staged fresh if missing; CPSC 310's is rebuilt from the deck once it is posted, which the Tue/Thu 12:30 scheduled task runs), what's covered in class today, or what's due today. Use for "fetch transit deck", "fetch pre-lecture <course>", "fetch what's covered today", "fetch what's due today", or "fetch <course>" on its own.
---

# Fetch

Five narrow, fast recipes — each is a slice of what `/morning-check` already does, for when Matt
wants just that one thing without a full sweep. Piazza and PrairieLearn are never re-run here;
that's morning-check's job. The one sync this skill does is `fetch canvas` (last section), for a
morning when the check found Canvas signed out. Everything else only reads what's already synced,
or stages the one missing piece asked for (for CPSC 310, also an outline the deck now replaces).

`$S` = `.claude/skills/fetch/scripts` (absolute:
`/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/fetch/scripts`).

## "fetch transit deck"
1. Check whether `routines/runs/<today>-transit.md` exists and `routines/transit-session.json` has
   `"date": "<today>"`.
2. If yes — it's already built (maybe from this morning's check), and the Transit Deck artifact already shows
   it. Give him the artifact's fixed URL from morning-check SKILL.md §7; nothing is rebuilt or re-sent.
3. If no (missing, stale date, or he already graded it and it's gone) — build a fresh one by the transit-deck
   steps of morning-check SKILL.md §7 ("Review = the transit deck"), in order. Step 0 first grades any fully
   tapped older deck against its own session file, because once a new deck replaces that file its taps can
   no longer be graded. Step 1 is `python3 "$S/../../quiz-me/scripts/quiz_pick.py" --transit`. Step 2 rebuilds
   the page and republishes it at the fixed artifact URL. If step 0 graded anything, finish with
   `sh publish.sh "Quiz <date>"`, as after any graded session.
4. One line back: "Deck's the one from this morning" or "Built a fresh one" — not the whole session dump.

## "fetch pre-lecture <COURSE>" (or "fetch <COURSE>" on its own)
1. `python3 "$S/fetch_status.py" --course <CODE>` — tells you whether the course meets today, what
   lecture number that is, and whether a file already exists (`missing` / `staged` `_NN-*.md` /
   `logged` `NN-*.md`).
2. **logged**, or **staged** in any course but CPSC 310: it already exists, so show him the file
   (Read it, give the outline back in chat) and don't re-fetch anything.
3. **missing**, or **staged** in CPSC 310: stage it, per course:
   - **CPSC 310** (also the midday pass below): `python3 "$S/../../morning-check/scripts/prelecture.py" --n 1 --force`.
     `--force` picks the lecture even when its outline exists, so an outline staged from a reader
     chapter that morning comes back for the deck check.
     - **Deck posted:** the deck wins. When `courses/CPSC310/lectures/_NN-<slug>.md` is missing, or its
       first line says it was built from a reader chapter, write it from the deck text it printed
       (`routines/slides/cpsc310/NN-*.txt`): a plain-sentence outline of the deck's claims in slide
       order. It replaces the chapter outline whole; nothing of the chapter version is kept. An
       outline already built from the deck is shown as it is.
     - **No deck yet:** a staged outline stays, and you show it with one line saying the deck is not
       up yet. A missing one is staged from the reader chapter as morning-check SKILL.md §7 step 1
       does: pick the chapter in the printed reader contents whose title best matches the lecture
       title, run `prelecture.py --chapter N URL`, and write the outline with its one-sentence source
       line.
     If a command exits non-zero, a page could not be fetched or no longer parses: report its error
     in one line.
   - **STAT 251 / ASIA 250:** needs a Chrome tab on canvas.ubc.ca (morning-check
     SKILL.md §2 for opening it). Run `scripts/canvas_materials.js` (in
     `.claude/skills/morning-check/scripts/`) via `javascript_tool`, read it back with
     `get_page_text`, save to `routines/snapshots/materials-<date>.txt`, then
     `python3 "$S/../../morning-check/scripts/canvas_materials_digest.py" routines/snapshots/materials-<date>.txt`.
     For the new deck/reading it names, pull the text with `canvadoc_text.js` (recipe in that
     file's header), then write `courses/<CODE>/lectures/_NN-<slug>.md` (or
     `courses/<CODE>/readings/_<slug>.md` for a reading) the same way morning-check §7 does: a
     plain-sentence outline in slide order (ASIA 250 also gets a `## Likely quiz targets` line).
     Then record it as pulled: run the same digest command with `--mark <KEY>` added, using the key the list
     printed (`COURSE:item`). An item left unmarked is listed again on the next run.
   - **PHIL 385:** no slides or recordings, ever — there's nothing to stage. Instead read the
     reading assigned for that date straight from `courses/PHIL385/00-syllabus.md`'s schedule and
     name it for him, same as morning-check §7.
4. Report just the outline (or "already staged, here it is") — no course-content summary beyond
   what's needed to prime him before class.

### Midday pass: CPSC 310 (a scheduled task Matt creates once)
CPSC 310 decks go up on lecture day between about 10:40 and 12:00, after the 06:35 morning check
has built the outline from a reader chapter (morning-check SKILL.md §7). A scheduled task runs the
recipe above at 12:30, so the outline is rebuilt from the deck before the 15:30 lecture. Scheduled
tasks live in the Claude desktop app, not in this repo (the 06:35 morning check is one), so Matt
creates this one there, once:

| Field | Value |
|---|---|
| Name | `cpsc310-midday` |
| Prompt | `fetch pre-lecture CPSC310` |
| Schedule | Tuesdays and Thursdays at 12:30 (cron `30 12 * * 2,4`, local time) |
| Folder | `/Users/matthe/Documents/CodingProjects/School 3-1` |

- The folder matters: a task started anywhere else loads neither this skill nor CLAUDE.md.
- Like the morning check, it fires only while the Mac is awake and the app is open. A late run still
  helps until 15:30. A missed one leaves the reader-chapter outline in place, and logging the
  lecture works from the deck either way.
- If the first run stops on a permission prompt for `prelecture.py`, allow it permanently.
- The scheduled run replies in one line, such as "Lec 9 outline rebuilt from the deck" or "Lec 9
  deck not up yet, the reader-chapter outline stays". It writes only the `_NN` file: no ledger row
  and no publish, because the notes site does not show `_NN` outlines and the next morning check's
  publish commits the file.

## "fetch what's covered today" (or "fetch today")
1. `python3 "$S/fetch_status.py"` (no `--course`) — one line per course, which ones meet today.
2. Run the "fetch pre-lecture" recipe above for each course where `meets_today=True`. It shows what
   already exists and stages only what is missing, or for CPSC 310 what the deck now replaces.
3. Report one block per class meeting today, in the order they happen: course, lecture title if
   known, and its outline. Weekends: say "no classes today" and stop — don't invent content.

## "fetch what's due today" (or "fetch what was due today")
Local only, no fetch — this is a read, not a sync:
1. `grep -E '^\| [^|]*Oct 2([^0-9]|$)' ledger.md` (today's `Mon D`, with the day anchored so Oct 2 does not also match
   Oct 20 to Oct 29) — a hard-dates row has today's date in its FIRST cell. The `### Recurring series` table has no dates;
   a series whose When cell names today's weekday shows up through its Things3 to-do in step 2.
2. `osascript .claude/skills/morning-check/scripts/things_today.applescript` and pick out Today
   items whose `due=` is today's date.
3. Report both as one short list: what's actually due today (assignments, quizzes, exams), not
   the full Plan-today work list — if he wants that, point him at "morning check" instead.
   If Canvas hasn't been synced today, say so in one line rather than re-fetching it yourself.

## "fetch canvas" (after a brief said Canvas was signed out)
The morning check cannot sign in for him: passwords are never typed, and CWL's Duo step needs
his phone. Once he has signed in at canvas.ubc.ca in Chrome, this re-runs only the Canvas half:
1. Open the Canvas tab exactly as morning-check SKILL.md §2 (the logged-in Chrome session), steps 1–2. If
   `get_page_text` still shows the CWL login page, say "still signed out" and stop.
2. §2 steps 3–5: `canvas_fetch.js`, read the chunks back, `canvas_digest.py`. Then the §7
   materials pull (`canvas_materials.js` → `canvas_materials_digest.py` → stage any new deck or
   reading as `_NN-<slug>.md` → `--mark` it), because the signed-out morning skipped that too.
3. Apply the morning-check rules to what the digest prints: a new hard date goes to `ledger.md`'s Term
   calendar (with a Kind when it is a countdown date) and to Things3 (`things_add.py`, always with tags); a changed grade updates the
   ledger's Grades so far table; anything labelled bonus becomes a Plan-today to-do.
4. Append `## Re-run HH:MM — Canvas` to today's `routines/runs/<date>-morning.md` with the
   Canvas block in the normal format, add a Session-log row to `ledger.md` if anything durable
   changed, then `sh publish.sh "Canvas re-run <date>"`.
5. Close the tab. Report only what was new — "Nothing new on Canvas" is a fine full answer.

## Notes
- Apart from `fetch canvas` and a transit-deck rebuild (which follows morning-check §7, so it can grade the old
  deck and publish), this skill never writes to `ledger.md`, Things3, or `publish.sh` — it only stages `_NN-*.md`
  pre-lecture files (git-ignored routine data stays git-ignored; the `_NN` files themselves are
  tracked, same as morning-check produces) and reads what already exists. Logging a lecture is
  still `log <CODE> lec N`; grading a deck is ticking each answer's key points on the deck page and saying "grade my deck",
  or pasting the grades (quiz-me skill).
- If a Chrome step here needs a domain permission prompt and none appears (STAT 251/ASIA
  250 path), retry up to 3 times before telling him it's blocked — see morning-check
  SKILL.md §5's note on transient permission hiccups.
