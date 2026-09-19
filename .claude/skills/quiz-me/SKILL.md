---
name: quiz-me
description: Interleaved spaced-retrieval quiz across every course from courses/<CODE>/02-questions.md, weighted by ledger.md (overdue → X → ~ → unquizzed) and exam proximity. Asks one question at a time, grades X/~/O, moves ledger rows by the spacing ladder, keeps per-question history in routines/quiz-state.json, flags weak topics that need more questions, and builds the morning transit deck. Use for "quiz me", "test me", "quiz me on STAT251", "what's due", "transit deck", grades pasted back like "1 O 2 ~ 3 X", or the T-9…T-5 exam-ladder retrieval days.
---

# Quiz me

Two scripts with one JSON hand-off. Both live in `.claude/skills/quiz-me/scripts/`
(`$S` below = that directory, absolute: `/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/quiz-me/scripts`).

- **Pick:** `quiz_pick.py` writes `routines/quiz-session.json` and prints the session *with answers*
  (for my eyes only). It also refreshes the **Due now** block in `ledger.md` every run.
- **Grade:** `quiz_grade.py "1:O 2:X 3:~"` records everything and deletes the session file.

Never edit the ledger's All-topics rows by hand. The scripts own them.

## Session — "quiz me"
1. Run `python3 "$S/quiz_pick.py"` (add `--course STAT251`, `--n 5`, `--all` as needed).
   Read the FOCUS block. If it prints **⚠ unmatched tags**, fix the `**Topic:**` tag in that
   `02-questions.md` to the ledger row's leading label *before* asking — otherwise the grade
   cannot land in the ledger.
2. Ask question 1 exactly as written. Nothing else. Wait.
3. Grade, then one line of correction (for `X`, the full bank answer). Move on. Never reveal the
   answer early; "skip" / "idk" = `X`. Never coach mid-session — the retrieval attempt is the point.
   - `O` = would score full marks on the exam · `~` = right idea, imprecise or missing a piece · `X` = wrong or blank.
   - **CPSC 310:** a correct answer with no reason is `~` until he gives the why. Ask "why?" once.
   - **STAT 251:** apply/derive needs the method, not the number. Right number, no method = `~`.
   - **PHIL 385:** exact names, pseudonyms, essay titles, dates. Close = `~`.
4. **Second pass (Matt, 2026-09-19):** after the last question, re-ask every `X` from this session
   once more, in order, one at a time, before grading. The retry is not graded and does not change
   the first-pass grade; it exists so a miss gets one retrieval attempt while the correction is fresh.
   Skip it if he says stop. Then grade the first pass only.
5. Stop after the second pass or when he says stop. Grade only what was asked:
   `python3 "$S/quiz_grade.py" "1:O 2:X 3:~ 4:O"` — **always one quoted string**
   (an unquoted `~` becomes the shell's home directory).
6. The script lists **Needs more questions** (X/~ topics with < 6 questions, leech questions missed
   ≥ 2 of the last 3). Write them now into `02-questions.md` under the lecture's section, same
   `**Topic:**` tag, aimed at *what he got wrong* from a different angle — not a rephrase. Split a
   leech into two smaller questions and delete the original. Say how many you added, one line.
7. Report ≤ 10 lines: grades table (course · topic · grade), ledger delta (topic → next date),
   questions added. No summaries, no pep talk.

## Variants
| He says | Run |
|---|---|
| quiz me on STAT251 | `--course STAT251` (repeat the flag for several) |
| quick quiz / 5 questions | `--n 5` (default 10, ~1 min each) |
| what's due | `quiz_pick.py --due` — no session written |
| how am I doing / weakest topics | `quiz_pick.py --report` |
| exam ladder T-9…T-5 (term.py) | `--course CODE --all --n 15` — every topic eligible, weighted by weakness |
| T-4 | `--course CODE --all`, then ask only the X/~ topics the focus block names |
| PHIL 385 before exam 2–4 | scope to the exam's ~3 weeks: `--course PHIL385 --all --n 15`, skip questions from lectures outside the window |
| transit deck | `quiz_pick.py --transit` — 6 q; writes `routines/runs/<date>-transit.md` (questions, divider, answers); rebuilds the Transit Deck artifact (morning-check skill §7) |
| a pasted reply like `1 O 2 ~ 3 X` or `O ~ X O O X` | `quiz_grade.py "<paste>"` — bare sequence = session order |
| "grade my deck" / "grade the transit deck" | Pull it from the artifact instead of asking him to type it: `Artifact` → `action: "read_db"`, `db_op: "get"`, `collection: "grades"`, `doc_id: "<today's date>"`, `url` = the Transit Deck artifact URL (morning-check SKILL.md §7). If every item in `items` has a grade and it isn't already `processed: true`, run `quiz_grade.py "<replyString>"`, then `action: "write_db"`, `db_op: "update"`, same `collection`/`doc_id`, `data: {"processed": true}`, `if_version` = the `version` the `get` just returned (required — the write rejects `version_mismatch` without it, even though the tool's schema doesn't list it). If some items are still `null`, tell him which question numbers are ungraded instead of grading a partial deck — the page overwrites the whole doc on every tap, so grading it mid-session strands the rest. If nothing's there yet, say so — don't invent a reply. |

A new pick overwrites the pending session; ungraded questions are simply not recorded. If he
sends grades and no session file exists, say so — never invent one.

## What the scripts decide (don't second-guess them)
- **Topic priority** = due/overdue (+5 per day late, capped) + grade (`X` 60 · `~` 30 · unquizzed 40 ·
  `O` 0), ×2 within 7 d of that course's exam (term.py), ×1.5 within 14 d, ×1.25 within 21 d. Not-due
  topics only fill leftover slots, marked *(ahead)*.
- **Course quotas:** every due course gets slots in proportion to the summed priority of its due topics,
  never fewer than one, and the courses are interleaved by weighted round-robin. So a course with an exam
  coming and six unquizzed topics gets most of the session, and a two-topic course cannot crowd it out.
- **Within a topic:** never-asked first, then last-missed, then stalest, plus a small bonus for the
  question types that course's exam rewards (CPSC 310 recall/critique · STAT 251 apply/derive ·
  PHIL 385 and ASIA 250 recall).
- **Interleave:** within the quotas, never the same topic twice in a row, cap per topic =
  max(3, n ÷ due topics); leftover slots go to the best remaining due questions, then *(ahead)* ones.
- **Topic session grade** = the worst grade among its questions. Ladder from CLAUDE.md:
  `X` streak 0, +1 d · `~` +3 d · `O` streak+1, +7 / +16 / +35 d.
- `ledger.md` is authoritative. `courses/<CODE>/01-topics.md` rows are mirrored best-effort (by LO
  code, e.g. `1b–c` → rows 1b and 1c, or by name); the script warns when it finds no row.
- Knobs at the top of `quizlib.py`: `MIN_QUESTIONS_PER_TOPIC` (6), `LEECH_X_IN_LAST` (2 of 3), `TYPE_PREF`.
- `SCHOOL_ROOT=<copy>` points the scripts at a copy of the workspace for testing.

## Files
- `routines/quiz-session.json` — pending session (deleted on grade)
- `routines/quiz-state.json` — per-question history and session records
- `routines/quiz/YYYY-MM-DD.md` — session log: grades, misses with the correct answer, ledger delta
- `routines/runs/YYYY-MM-DD-transit.md` — the deck the morning check sends to his phone

## Publish (end of every graded session)
Grading rewrites `ledger.md` (Due now, topic rows) and sometimes `02-questions.md`. Once the ledger
is written, run `sh "/Users/matthe/Documents/CodingProjects/School 3-1/publish.sh" "Quiz YYYY-MM-DD"`
so the hosted notes site shows the new schedule. Nothing to commit → it says so and exits. Plain
commit message, never an attribution trailer.

## Tuning log
- 2026-09-19: 8 X of 10, mostly PHIL 385 dates. Matt asked that a first-time miss be re-asked in the
  same session instead of only resurfacing the next day; added the ungraded second pass (step 4).
  Also: corrections are bullets, never a run-on line, and when he asks a comprehension question
  mid-session answer it in the plainest words possible, one idea per sentence, before moving on.
- 2026-09-14: five sessions in, PHIL 385 had never been asked (exam Oct 2, 22 questions banked) because
  the greedy interleave alternated the two highest-priority courses (PHIL 321 X topics, CPSC 310 lec 1)
  until the slots ran out. Picker now gives each due course a quota by summed priority and round-robins
  them; exam boost widened to ×1.25 at ≤21 d. Matt also called out the CPSC 310 lec 1 questions as
  course-framing, not exam material (week ranges, learning objectives, SE task list): cut. Rule from it:
  when he says a question is useless, drop it from the bank on the spot instead of grading it.
- 2026-09-13: transit deck grading moved onto the Transit Deck artifact (inline O/~/X, saved to its
  `db` capability). "Grade my deck" pulls `grades/<date>` from there instead of a pasted reply; the
  morning check also sweeps it for anything ungraded before building the next day's deck.
- 2026-09-11 built. Matt asked for one skill across all courses that decides focus, flags weak
  topics that need more questions, and keeps the SRS. Question IDs are a hash of course + text, so
  editing a question's wording resets its history (fine; the topic row keeps the schedule).
