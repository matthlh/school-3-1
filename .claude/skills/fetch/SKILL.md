---
name: fetch
description: On-demand pull of one specific resource instead of a full morning check — today's transit deck, a course's pre-lecture outline (staged fresh if missing), what's covered in class today, or what's due today. Use for "fetch transit deck", "fetch pre-lecture <course>", "fetch what's covered today", "fetch what's due today", or "fetch <course>" on its own.
---

# Fetch

Five narrow, fast recipes — each is a slice of what `/morning-check` already does, for when Matt
wants just that one thing without a full sweep. Piazza and PrairieLearn are never re-run here;
that's morning-check's job. The one sync this skill does is `fetch canvas` (last section), for a
morning when the check found Canvas signed out. Everything else only reads what's already synced,
or stages the one missing piece asked for.

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
2. **logged or staged:** it already exists — just show him the file (Read it, summarize the "3
   pre-lecture questions" section back in chat, don't re-fetch anything).
3. **missing** — stage it, per course:
   - **CPSC 310:** `python3 "$S/../../morning-check/scripts/prelecture.py" --n 1`. When the deck is
     posted, it downloads it and prints the deck text's path (`routines/slides/cpsc310/NN-*.txt`).
     Write `courses/CPSC310/lectures/_NN-<slug>.md` from that text: a plain-sentence outline of the
     deck's claims in slide order, then `## Three pre-lecture questions`. When the deck is not posted
     yet, there is nothing to stage, so tell him that in one line. No reader chapter is staged,
     because the course site removed its lecture → chapter pages on 2026-09-28. If the command exits
     non-zero, the schedule or the deck could not be fetched or no longer parses: report the error in
     one line.
   - **STAT 251 / ASIA 250:** needs a Chrome tab on canvas.ubc.ca (morning-check
     SKILL.md §2 for opening it). Run `scripts/canvas_materials.js` (in
     `.claude/skills/morning-check/scripts/`) via `javascript_tool`, read it back with
     `get_page_text`, save to `routines/snapshots/materials-<date>.txt`, then
     `python3 "$S/../../morning-check/scripts/canvas_materials_digest.py" routines/snapshots/materials-<date>.txt`.
     For the new deck/reading it names, pull the text with `canvadoc_text.js` (recipe in that
     file's header), then write `courses/<CODE>/lectures/_NN-<slug>.md` (or
     `courses/<CODE>/readings/_<slug>.md` for a reading) the same way morning-check §7 does —
     outline in slide order + 3 pre-lecture questions (ASIA 250 also gets a
     `## Likely quiz targets` line).
   - **PHIL 385:** no slides or recordings, ever — there's nothing to stage. Instead read the
     reading assigned for that date straight from `courses/PHIL385/00-syllabus.md`'s schedule and
     hand him the reading + 3 questions on names/pseudonyms/terms, same as morning-check §7.
4. Report just the outline + questions (or "already staged, here it is") — no course-content
   summary beyond what's needed to prime him before class.

## "fetch what's covered today" (or "fetch today")
1. `python3 "$S/fetch_status.py"` (no `--course`) — one line per course, which ones meet today.
2. Run the "fetch pre-lecture" recipe above for each course where `meets_today=True` and the file
   is `missing`; just read and show the ones already `staged`/`logged`.
3. Report one block per class meeting today, in the order they happen: course, lecture title if
   known, the 3 pre-questions. Weekends: say "no classes today" and stop — don't invent content.

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
1. Open the Canvas tab exactly as morning-check SKILL.md §2 Path B, steps 1–2. If
   `get_page_text` still shows the CWL login page, say "still signed out" and stop.
2. §2 steps 3–5: `canvas_fetch.js`, read the chunks back, `canvas_digest.py`. Then the §7
   materials pull (`canvas_materials.js` → `canvas_materials_digest.py` → stage any new deck or
   reading as `_NN-<slug>.md`), because the signed-out morning skipped that too.
3. Apply the morning-check rules to what the digest prints: a new hard date goes to `ledger.md`,
   Things3 (`things_add.py`, always with tags) and `term.py`; a changed grade updates the
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
  still `log <CODE> lec N`; grading a deck is tapping O, ~ or X on the deck page and saying "grade my deck",
  or pasting the grades (quiz-me skill).
- If a Chrome step here needs a domain permission prompt and none appears (STAT 251/ASIA
  250 path), retry up to 3 times before telling him it's blocked — see morning-check
  SKILL.md §5's note on transient permission hiccups.
