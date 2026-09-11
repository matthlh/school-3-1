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
4. Stop after the last question or when he says stop. Grade only what was asked:
   `python3 "$S/quiz_grade.py" "1:O 2:X 3:~ 4:O"` — **always one quoted string**
   (an unquoted `~` becomes the shell's home directory).
5. The script lists **Needs more questions** (X/~ topics with < 6 questions, leech questions missed
   ≥ 2 of the last 3). Write them now into `02-questions.md` under the lecture's section, same
   `**Topic:**` tag, aimed at *what he got wrong* from a different angle — not a rephrase. Split a
   leech into two smaller questions and delete the original. Say how many you added, one line.
6. Report ≤ 10 lines: grades table (course · topic · grade), ledger delta (topic → next date),
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
| transit deck | `quiz_pick.py --transit` — 6 q; writes `routines/runs/<date>-transit.md` (questions, divider, answers) |
| a pasted reply like `1 O 2 ~ 3 X` or `O ~ X O O X` | `quiz_grade.py "<paste>"` — bare sequence = session order |

A new pick overwrites the pending session; ungraded questions are simply not recorded. If he
sends grades and no session file exists, say so — never invent one.

## What the scripts decide (don't second-guess them)
- **Topic priority** = due/overdue (+5 per day late, capped) + grade (`X` 60 · `~` 30 · unquizzed 40 ·
  `O` 0), ×2 within 7 d of that course's exam (term.py), ×1.5 within 14 d. Not-due topics only fill
  leftover slots, marked *(ahead)*.
- **Within a topic:** never-asked first, then last-missed, then stalest, plus a small bonus for the
  question types that course's exam rewards (CPSC 310 recall/critique · STAT 251 apply/derive ·
  PHIL 385 and ASIA 250 recall).
- **Interleave:** never the same course twice in a row when another is available, never the same
  topic twice in a row, cap per topic = max(3, n ÷ due topics).
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

## Tuning log
- 2026-09-11 built. Matt asked for one skill across all courses that decides focus, flags weak
  topics that need more questions, and keeps the SRS. Question IDs are a hash of course + text, so
  editing a question's wording resets its history (fine; the topic row keeps the schedule).
