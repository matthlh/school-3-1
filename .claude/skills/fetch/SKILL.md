---
name: fetch
description: On-demand pull of one specific resource instead of a full morning check — today's transit deck, a course's pre-lecture outline (staged fresh if missing), what's covered in class today, or what's due today. Use for "fetch transit deck", "fetch pre-lecture <course>", "fetch what's covered today", "fetch what's due today", or "fetch <course>" on its own.
---

# Fetch

Four narrow, fast lookups — each is a slice of what `/morning-check` already does, for when Matt
wants just that one thing without a full sweep. Piazza and PrairieLearn are never re-run here;
that's morning-check's job. The one sync this skill does is `fetch canvas` (last section), for a
morning when the check found Canvas signed out. Everything else only reads what's already synced,
or stages the one missing piece asked for.

`$S` = `.claude/skills/fetch/scripts` (absolute:
`/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/fetch/scripts`).

## "fetch transit deck"
1. Check whether `routines/runs/<today>-transit.md` exists and `routines/quiz-session.json` has
   `"date": "<today>"` and `"mode": "transit"`.
2. If yes — it's already built (maybe from this morning's check). Just re-send it:
   `SendUserFile` on that path, status `normal`.
3. If no (missing, stale date, or he already graded it and it's gone) — build a fresh one:
   `python3 "$S/../../quiz-me/scripts/quiz_pick.py" --transit`, then send the new file the same way.
4. One line back: "Deck's the one from this morning" or "Built a fresh one" — not the whole session dump.

## "fetch pre-lecture <COURSE>" (or "fetch <COURSE>" on its own)
1. `python3 "$S/fetch_status.py" --course <CODE>` — tells you whether the course meets today, what
   lecture number that is, and whether a file already exists (`missing` / `staged` `_NN-*.md` /
   `logged` `NN-*.md`).
2. **logged or staged:** it already exists — just show him the file (Read it, summarize the "3
   pre-lecture questions" section back in chat, don't re-fetch anything).
3. **missing** — stage it, per course:
   - **CPSC 310:** `python3 "$S/../../morning-check/scripts/prelecture.py" --n 1`, then write
     `courses/CPSC310/lectures/_NN-<slug>.md` from the staged reader-chapter text
     (`routines/prelecture/cpsc310/NN-*.txt`) — plain-sentence outline of the chapter's claims
     under `## What the chapter claims`, then `## Three pre-lecture questions`. If the deck is
     already posted, prefer its slide titles (`routines/slides/cpsc310/NN-*.txt`) over the reader.
   - **STAT 251 / ASIA 250 / PHIL 321:** needs a Chrome tab on canvas.ubc.ca (morning-check
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
1. `grep -E '^\| [^|]*Sep 22' ledger.md` (today's `Mon DD`) — a hard-dates row has today's date in its
   FIRST cell; ignore hits from the `### Recurring series` table below it, whose Dates column lists many days.
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
- Apart from `fetch canvas`, this skill never writes to `ledger.md`, Things3, or `publish.sh` — it only stages `_NN-*.md`
  pre-lecture files (git-ignored routine data stays git-ignored; the `_NN` files themselves are
  tracked, same as morning-check produces) and reads what already exists. Logging a lecture is
  still `log <CODE> lec N`; grading a deck is still replying to it with grades.
- If a Chrome step here needs a domain permission prompt and none appears (STAT 251/ASIA
  250/PHIL 321 path), retry up to 3 times before telling him it's blocked — see morning-check
  SKILL.md §5's note on transient permission hiccups.
