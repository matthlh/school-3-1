---
name: quiz-me
description: Interleaved spaced revision quiz across every course from courses/<CODE>/02-questions.md, weighted by ledger.md (overdue → X → unquizzed → ~) and exam proximity. Asks one question at a time, grades X/~/O, moves ledger rows by the spacing ladder, keeps per-question history in routines/quiz-state.json, flags weak topics that need more questions, and builds the morning transit deck. Use for "quiz me", "test me", "quiz me on STAT251", "what's due", "transit deck", "STAT sprint", grades pasted back like "1 O 2 ~ 3 X", or the T-9…T-5 exam-ladder revision days.
---

# Quiz me

Two scripts with one JSON hand-off. Both live in `.claude/skills/quiz-me/scripts/`
(`$S` below = that directory, absolute: `/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/quiz-me/scripts`).

- **Pick:** `quiz_pick.py` writes `routines/quiz-session.json` (`--transit`: `routines/transit-session.json`) and prints the session *with answers*
  (for my eyes only). It also refreshes the **Due now** block in `ledger.md` every run.
- **Grade:** `quiz_grade.py "1:O 2:X 3:~"` grades the quiz picked today, records everything and deletes the session file.
  `--transit <deck date>` grades the transit deck's file instead, and only if it holds that day's deck.

Never edit the ledger's All-topics rows by hand. The scripts own them.

## Session — "quiz me"
1. Run `python3 "$S/quiz_pick.py"` (add `--course STAT251`, `--n 5`, `--all` as needed).
   **Inside an exam window, scope to the exam (Matt, 2026-09-29: "make sure it's related to the test and not
   random questions").** The scheduler does most of this (What the scripts decide, below). Topics from an
   earlier PHIL 385 exam are frozen, so `--course PHIL385` before Exam 2, 3 or 4 asks only that exam's weeks.
   From T-7 the exam-week sweep makes every topic the exam covers due. To narrow further, `--topic <text>` keeps
   the ledger rows whose topic contains that text, case-insensitive (pick a key that hits one row, e.g.
   `--topic "uses pseudonyms"` not `--topic pseudonyms`, which also catches the First-authorship row). It is
   also the one way to pick a frozen topic.
   Read the FOCUS block. If it prints the **⚠ Topic tags that match no ledger row** block, change each
   `**Topic:**` tag it names in that `02-questions.md` to the exact ledger topic *before* asking. Otherwise
   those questions are never picked and their grades cannot land in the ledger.
   **Day-after review (Karpicke & Blunt 2011).** When the FOCUS block prints `Day-after review: <course> lec N`,
   open the session with it, before question 1: ask him to write or say everything he remembers from that lecture
   for 2 minutes, one flagged lecture at a time. Nothing is graded for it. Do it once a day, at the first session.
2. Ask question 1 exactly as written. Nothing else. Wait.
   STAT 251 questions and answers are written in LaTeX between `$$` markers, which the site renders. In chat,
   write the same math in readable plain form (P(A | B), σ²/n, ∫₀² x dx) instead of pasting raw LaTeX; the
   wording stays exactly as written.
   - **Confidence first.** He answers with his confidence from 1 to 3, before he sees the answer: "B, 2".
     1 is a guess, 2 is think so, 3 is sure. If he leaves it out, ask for it in one word before you grade.
   - **Live variants.** When the item's last grade was `O` and its type is apply or derive, ask a variant instead
     of the original. Change the numbers or the code, keep the method, and work out its answer before you ask.
     The printout flags such an item `(variant: last O)`. Its grade is the question's grade, with no mark for the
     variant.
   - **Multiple choice from his own wrong answers.** When the printout shows past wrong answers for a CPSC 310 or
     PHIL 385 item, ask it as multiple choice. Give up to 3 of them plus the right answer, the right one about as
     long as the others, shuffled and lettered. If a variant is due too, ask the variant instead.
3. Grade, then one line of correction (for `X`, the full bank answer). Move on. Never reveal the
   answer early; "skip" / "idk" = `X`. Never coach mid-session — the attempt to recall it is the point.
   - `O` = would score full marks on the exam · `~` = right idea, imprecise or missing a piece · `X` = wrong or blank.
   - **CPSC 310:** a correct answer with no reason is `~` until he gives the why. Ask "why?" once.
   - **STAT 251:** apply/derive needs the method, not the number. Right number, no method = `~`.
   - **Long problems** (flagged `long: steps only`; they sit under `## Long problems` in the bank): ask for the
     steps, not the arithmetic. He names the method for each part and gives its setup line: which events or which
     distribution, the formula with the numbers in, the limits of any integral. Grade against the numbered Steps
     list that opens the bank answer: `O` = every step there, in order, with the right setup · `~` = right method,
     but a step or a setup detail is missing or wrong (the wrong given event, a wrong limit) · `X` = wrong method
     or blank. Then show the Steps list and the final answers, not the whole working.
   - **PHIL 385:** exact names, pseudonyms, essay titles, dates. Close = `~`.
   - **Look-alikes.** An item flagged `(look-alike of N)` comes right after question N on purpose, so keep that
     order. Add its `Why paired:` sentence to its correction, so he compares the two while both are fresh.
   - After an `X` or `~`, also give the link to the notes page it comes from (the item's `Page:` line in the
     pick output) and name the `##` section on that page that covers it when you can tell.
   - **Cause.** After an `X` or `~`, he names the cause in one letter: `c` concept (he did not understand it),
     `f` forgot (he knew it once), `m` misread the question, `k` careless slip, `s` slow. You may propose one,
     and he confirms it in one word. A confident miss (`X` at 3) also gets one line, "Why were you sure?", and
     his reason goes in with `--why`.
   - For a CPSC 310 or PHIL 385 miss, keep his wrong answer in a few words for `--said` (step 5), so later
     sessions can offer it as a distractor.
4. **Relearn until correct (Matt, 2026-10-06; replaces the second pass).** A missed question (`X` or `~`) comes
   back 2 or 3 questions later in the same session, as he first saw it, until he gets it right once. After the
   last new question, the misses still open come back in turn. Only the first attempt is graded. A re-ask needs
   no confidence or cause; if he misses it again, give the correction again.
5. Stop when every miss has been answered right once, or when he says stop. Grade the first attempts only:
   `python3 "$S/quiz_grade.py" "1:O3 2:X3/c 3:~2/m 4:O1" --said 2 "his answer" --why 2 "his reason"` —
   **always one quoted string** (an unquoted `~` becomes the shell's home directory).
   - A token is the grade (`O`, `~` or `X`; `p` means `~`, `-` means skipped), then his confidence, then `/`
     and the cause letter on an `X` or `~`. A live variant gets its question's grade.
   - `--said N "text"` records his wrong answer to an `X` or `~`. `--why N "text"` records why he was sure, on
     an `X` at 3. Both can repeat.
   - A malformed token, a question number given twice, a flag on the wrong item, or a graded question whose
     `**Topic:**` tag names no ledger row stops the script before it writes anything. Fix it and run it again.
6. The script lists **Needs more questions** (X/~ topics with < 6 questions, leech questions missed
   ≥ 2 of the last 3). Write them now into `02-questions.md` under the lecture's section, same
   `**Topic:**` tag, aimed at *what he got wrong* from a different angle — not a rephrase. Split a
   leech into two smaller questions and delete the original. Say how many you added, one line.
   The **Misses by cause** block gives a fix for each cause. Do the `concept` one now, the same way: add or
   rewrite a question on that notes page.
7. Report ≤ 10 lines: grades table (course · topic · grade), ledger delta (topic → next date),
   questions added, then the **Calibration** shares, the **Misses by cause** fixes and the **Confident misses**
   with his reasons, one line each. No summaries, no pep talk. Close the session with the **Pages behind the
   misses** list that `quiz_grade.py` prints last (each page as a link with its miss count), so he knows what to
   reread.

## Variants
| He says | Run |
|---|---|
| quiz me on STAT251 | `--course STAT251` (repeat the flag for several) |
| quick quiz / 5 questions | `--n 5` (default 10, ~1 min each) |
| what's due | `quiz_pick.py --due` — no session written |
| how am I doing / weakest topics | `quiz_pick.py --report` |
| exam ladder T-9…T-5 (term.py) | `--course CODE --all --n 15` — every topic but the frozen ones eligible, weighted by weakness |
| T-4 | `--course CODE --all`, then ask only the X/~ topics the focus block names |
| PHIL 385 before exam 2–4 | `--course PHIL385 --all --n 15`. The earlier exams' topics are frozen, so only this exam's weeks come up. |
| Friday set / "long problems" / the Friday revision block | `quiz_pick.py --long` — 4 long problems (`--n` to change). It prints a clock, 2 minutes a part (`MINUTES_PER_PART` in quizlib.py, a first guess at the midterm's pace). Give him all the stems at once; he works them on paper with no notes and sends every part's answer when the clock runs out. Grade on the numbers: `O` = every part right · `~` = right method throughout but an arithmetic slip · `X` = a wrong method or a part left blank. Correct part by part against the bank answer, then `quiz_grade.py` as usual. Then a normal `quiz me` for the rest of the block. |
| STAT sprint / which method | `quiz_pick.py --sprint` — 10 short STAT 251 apply or derive questions by the usual priority, never a long problem (`--n` to change). It prints a clock of 18 s a question, 3 minutes for 10 (`SPRINT_SECONDS` in quiz_pick.py). Give him all the stems at once. For each one he names the distribution or rule and writes the first setup line, with no arithmetic, and sends them all when the clock runs out. Grade `O` (right method and setup line) or `X` (anything else, blank included), never `~`. Correct each `X` with the method from the bank answer, then plain `quiz_grade.py` as usual; the session's mode is `sprint`. |
| transit deck | First grade any fully tapped deck ("grade my deck" below). Then `quiz_pick.py --transit` — 6 short q, never a long problem; writes `routines/runs/<date>-transit.md` (questions, divider, answers) and its own session file, `routines/transit-session.json`, which `quiz_grade.py --transit <deck date>` grades (the deck date is that file's `date`, the day it was picked, and the deck page saves its taps under the same date); rebuilds the Transit Deck artifact (morning-check skill §7). While a deck from another day is waiting ungraded, `--transit` stops and names its date, because a new deck would strand its taps. `--transit --replace` discards that deck, the one way to build over it. |
| a pasted reply like `1 O 2 ~ 3 X` or `O ~ X O O X` | Right after you quizzed him in this conversation, it grades that session: `quiz_grade.py "<paste>"`, a bare sequence in session order. A bare reply in a conversation where you did not just quiz him answers the transit deck: `quiz_grade.py --transit <deck date> "<paste>"`. The deck date is the `date` in `routines/transit-session.json`, and the deck's title shows the same day (`Transit deck — Tue Oct 6`). |
| "grade my deck" / "grade the transit deck" | Pull it from the artifact instead of asking him to type it: `ArtifactData` with `action: "get"`, `collection: "grades"`, `doc_id` = the `date` in `routines/transit-session.json` (the deck page's fixed DATE_ID) and `url` = the Transit Deck artifact URL (morning-check SKILL.md §7). If every item in `items` has a grade and it isn't already `processed: true`, run `quiz_grade.py --transit <doc_id> "<replyString>"` (the script refuses the session file if it holds another day's deck), then `ArtifactData` with `action: "update"`, the same `url`, `collection` and `doc_id`, `data: {"processed": true}` and `if_version` = the `version` the get returned. If some items are still `null`, tell him which question numbers are ungraded instead of grading a partial deck — the page overwrites the whole doc on every tap, so grading it mid-session strands the rest. If nothing's there yet, say so — don't invent a reply. |
| is FSRS better yet / the FSRS shadow trial (Oct 6 – Nov 1) | `fsrs_shadow.py` — read-only: replays `routines/quiz-state.json` through FSRS-6 with its default parameters beside the ladder, prints log loss, RMSE and a 5-bin calibration table for FSRS and the ladder baseline, then one verdict line, always last (the Sunday weekly brief quotes it). `--since YYYY-MM-DD` scores only reviews from that day on. The ladder keeps scheduling; Matt adopts FSRS only if it beats the ladder baseline. |

A new quiz pick overwrites `routines/quiz-session.json`; its ungraded questions are simply not recorded. A new
transit deck never overwrites a deck from another day unless `--replace` says so (the transit row above). If he
sends grades and no session file exists, say so — never invent one. Plain grading also refuses a quiz session
picked on an earlier day; when it really is that day's quiz, `--date <its date>` grades it as that day.

## What the scripts decide (don't second-guess them)
- **Due.** A topic is due when its Next date is today or past, or when the exam-week sweep below pulls it in.
  A frozen topic is never due.
- **Topic priority** = due (100, plus 5 for each ladder interval it is late, up to 20) + grade (`X` 60 ·
  unquizzed 40 · `~` 30 · `O` 0), ×2 within 7 d of the first exam ahead that covers the topic (Exam scope below),
  ×1.5 within 14 d, ×1.25 within 21 d. A topic no exam ahead covers gets no boost. Not-due topics only fill
  leftover slots, marked *(ahead)*.
- **Lateness counts in intervals** (2026-10-06): days late ÷ the gap the topic's grade and streak give. That gap is
  1 d for `X` and unquizzed, 3 d for `~`, and 7, 16 or 35 d for `O`. An `X` a week late is seven intervals behind,
  and an `O` on its 35-day gap a week late is a fifth of one. The Due-now block in `ledger.md` lists due topics in
  this order.
- **Course quotas:** every due course gets slots in proportion to the summed priority of its due topics,
  never fewer than one, and the courses are interleaved by weighted round-robin. So a course with an exam
  coming and six unquizzed topics gets most of the session, and a two-topic course cannot crowd it out.
- **Within a topic:** never-asked first, then last-missed, then stalest, plus a small bonus for the
  question types that course's exam rewards (CPSC 310 recall/critique · STAT 251 apply/derive ·
  PHIL 385 and ASIA 250 recall).
- **Interleave:** within the quotas, never the same topic twice in a row, cap per topic =
  max(3, n ÷ due topics); leftover slots go to the best remaining due questions, then *(ahead)* ones.
- **Look-alikes** (Brunmair & Richter 2019: confusable topics side by side beat the same topics apart). Each
  course's `01-topics.md` ends with a `## Look-alikes` table, `| Topic | Look-alike | Why they get confused |`.
  When a picked question's topic has a look-alike with an eligible question not yet chosen, the best such question
  goes right after it and counts toward n. While any due question is left, it comes from a due topic only, since
  not-due topics only fill leftover slots. A question pulled in this way pulls none of its own.
  - A cell names its ledger row by the same rules as a `**Topic:**` tag (Topic matching below), so the ledger topic,
    or 6+ characters from its start that start no other row, is the sure way. A cell that names no row or several,
    a row without its why, or a wrong header stops every `quiz_pick.py` command (`--due`, `--report` and the 06:35
    `--transit` too), naming the file and the cell. A ledger topic renamed later breaks its pairs the same way, so
    fix the cell then.
  - Add a pair only for two topics he really mixes up, from his notes, with the reason in one plain sentence.
    Confusions inside one ledger row (stub vs spy, 400 vs 422) cannot be paired; a contrast question covers them.
- **Printout flags.** `(variant: last O)` marks an apply or derive item whose last grade was `O`. A
  `Past wrong answers:` line lists the `said` texts in its history, oldest first, each once. The focus block ends
  with one `Day-after review` line for each lecture held yesterday (term.py's lecture dates) that has a log, with
  its notes page, scoped to `--course`.
- **Topic session grade** = the worst grade among its questions. Ladder from CLAUDE.md:
  `X` streak 0, +1 d · `~` +3 d · `O` streak+1, +7 / +16 / +35 d. The exam cap and load balancing below
  adjust the Next date it gives.
- **Exam scope.** The exams are the ledger's Term calendar rows with Kind `exam`, which term.py loads, and lecture
  N's date comes from term.py's lecture numbering. An exam covers the lectures from the start of term up to its date.
  An exam's name (`exam_name`) is its label up to the first dash, parenthesis, comma or semicolon. term.py writes the
  label as the bold name, the start time, then the weight, so the name keeps the start time (`Exam 2 14:00`,
  `Midterm 19:00`). PHIL 385's Exam 1 is plain `Exam 1`, because its bold name runs on past a dash.
  - A cutoff in `EXAM_CUTOFF` ends a scope earlier. The CPSC 310 midterm (Thu Oct 29) covers lectures 1–13,
    through Thu Oct 22. The syllabus says through week 6 (Oct 15) and the schedule page says Oct 22, and the
    wider date stands until that is confirmed.
  - A non-cumulative exam covers only the lectures after that course's previous exam. `NON_CUMULATIVE` lists
    PHIL 385 Exams 2, 3 and 4. Every final is cumulative.
  - A topic is in an exam's scope when any lecture in its ledger Lec cell is. A Lec that is not a lecture
    number (`Lab 1`, `WW2`, `reading`) counts as in every scope.
- **Frozen.** Once an exam is past, a topic it covered is frozen when the course's next exam does not cover it,
  which happens only before a non-cumulative exam. A frozen topic never comes due and is never picked, even with
  `--all`; `--topic` can still name one. The Due-now block lists frozen topics after their own summary line, one
  bullet each (Due-now block below), never as overdue; the focus block gives the summary line only. Nothing is
  frozen once a course has no exam left in the Term calendar, so PHIL 385's earlier topics come back after Exam 4
  (Nov 20) for the cumulative final. A PHIL 385 row whose Lec is not a lecture number stays live, and the focus
  block names it so its lecture number can go in the Lec cell.
- **Exam-week sweep.** From 7 days before an exam (`SWEEP_DAYS`), every topic it covers is due unless it was
  reviewed inside that window. The Due-now block marks such a topic `exam sweep before Exam 2 14:00 on Fri Oct 16`.
  When nothing is due, the day the Nothing-due line names is the earliest Next date or sweep start, whichever
  comes first.
- **Due-now block** (in `ledger.md`, rewritten by every `quiz_pick.py` run and every graded session). The notes
  site parses every line, so the wording stays fixed. Its parts come in this order. A blank line comes between
  parts, after each summary line and between readiness lines; the bullets of a list follow each other directly.
  1. `<!-- due as of 2026-10-06 -->`, the day it was written. It never renders; the site dates the block by it and
     flags it when stale.
  2. The summary, `_52 topics due as of Tue Oct 6, 6 of them from an exam-week sweep. Say **quiz me**._`, with
     the sweep part only when there is one. Then a bullet per due topic in lateness order:
     `- STAT 251 · <topic> · overdue 19 d · last unquizzed`. The third part is `overdue N d`, `due today` or
     `exam sweep before Exam 2 14:00 on Fri Oct 16`.
     With nothing due, one line instead: `_Nothing due today. Next: 2 topics on **Fri Oct 9** (PHIL 385)._`, or
     `_Nothing scheduled yet — log a lecture to start the ledger._` when no live topic has a date.
  3. The readiness lines (Readiness below).
  4. With frozen topics, the frozen summary,
     `_Frozen, not due: PHIL 385 16 topics from Exam 1. The exam that covered them is past and the course's next exam does not._`
     Then a bullet per frozen topic in ledger order: `- PHIL 385 · <topic> · frozen after Exam 1`, the exam as
     `exam_name` prints it.
- **Readiness.** For each course whose next exam is within 21 days, one line comes after the due topics (or the
  Nothing-due line) and before the frozen lines, and the focus block prints the same line under `Exams ≤ 21 d`.
  An exam with no in-scope question yet (none of its lectures logged) gets no line.
  `_Readiness · PHIL 385 Exam 2 14:00 · Fri Oct 16 · 40% of 12 in-scope questions likely recalled · 2 topics in scope have no question._`
  The in-scope questions are the bank questions whose ledger topic that exam covers, by the scope rule above, so a
  frozen topic never counts. Each counts 1 when its last grade was `O`, 0.5 when `~`, and 0 when `X` or never asked,
  and the percentage is their mean, rounded half up. The last part counts the in-scope topics with no question in
  the bank, and it is left out when there are none. The lines cover every course whatever `--course` says.
  Grading counts the session it is grading, `--dry-run` included.
- **Exam cap.** The cap is the latest date a grade today may set as Next. It comes from the first exam that covers
  the topic and is at least 2 days away: 4 days before that exam (`CAP_DAYS`), or the day before it when that day is
  today or past. An exam today or tomorrow sets no cap, because this review is the last one before it, so the next
  covering exam after it sets the cap; with none, there is no cap. Load balancing picks within the part of its
  window up to the cap, and when the whole window lies past the cap, Next is the cap.
- **Load balancing.** When the ladder gap is 3 days or more, Next may move up to 15% of the gap either way, at
  least one day (`SPREAD`), to the day with the fewest topics due in the ledger's Next column. Frozen topics do not
  count, since they never come due. Ties go to the ladder date. The exam cap still wins. The ledger delta says why
  a date moved: "ladder said Oct 13, held before Exam 2 14:00 on Fri Oct 16" or "ladder said Oct 13, moved to a
  lighter day".
- **Topic matching.** A question's `**Topic:**` tag and a Look-alikes cell find their ledger row by one rule
  (`match_topic`): the same text, else one a prefix of the other (6+ characters), else a shared LO code (`1b–c`).
  The first of these that hits any row decides. When it hits several rows, the scripts stop and name the tag or
  cell, so a grade never lands on a guessed row. Nothing fuzzier.
- **Unmatched tags.** A tag that matches no ledger row prints one ⚠ block in every `quiz_pick.py` run (`--due`
  included) and in `quiz_grade.py`. It names each tag with its question count and first `file:line`. Such questions
  are never picked. When a graded question's tag names no row (its row was renamed after the pick),
  `quiz_grade.py` stops before writing anything and names the tag; make a ledger row match it and grade again.
- `ledger.md` holds the only copy of each topic's grade, streak and Next. Grading never writes
  `courses/<CODE>/01-topics.md`, which keeps the topic list, its notes and the Look-alikes table. The notes site's
  Topics tab shows each row's grade and next date from the ledger.
- Knobs at the top of `quizlib.py`: `MIN_QUESTIONS_PER_TOPIC` (6), `LEECH_X_IN_LAST` (2 of 3), `TYPE_PREF`,
  `SWEEP_DAYS` (7), `CAP_DAYS` (4), `SPREAD` (0.15), `NON_CUMULATIVE` and `EXAM_CUTOFF`. Each
  `NON_CUMULATIVE` or `EXAM_CUTOFF` key must name exactly one exam in the ledger's Term calendar, or the scripts
  stop.
- `SCHOOL_ROOT=<copy>` points the scripts at a copy of the workspace for testing.

## Files
- `routines/quiz-session.json` — pending session (deleted on grade; a new quiz pick replaces it)
- `routines/transit-session.json` — the transit deck's pending session, written by `quiz_pick.py --transit` and graded with `quiz_grade.py --transit <deck date>`, usually the next morning (deleted on grade; a new deck replaces one from another day only with `--replace`)
- `routines/quiz-state.json` — per-question history and session records. A history entry is `[date, grade]`, or
  `[date, grade, extra]` where `extra` holds only what was given: `conf`, `cause` (the full word), `said`, `why`
- `routines/quiz/YYYY-MM-DD.md` — session log: grades, misses with the correct answer, ledger delta
- `routines/runs/YYYY-MM-DD-transit.md` — the deck the morning check sends to his phone

## Publish (end of every graded session)
Grading rewrites `ledger.md` (Due now, topic rows) and sometimes `02-questions.md`. Once the ledger
is written, run `sh "/Users/matthe/Documents/CodingProjects/School 3-1/publish.sh" "Quiz YYYY-MM-DD"`
so the hosted notes site shows the new schedule. Nothing to commit → it says so and exits. Plain
commit message, never an attribution trailer.

## Tuning log
- 2026-10-06 (mirror): grading no longer copies Last, Grade, Streak and Next into `01-topics.md` (Matt approved).
  The copy was lossy and had started to match rows of the new Look-alikes tables. Those columns are gone from the
  topic tables, so `ledger.md` is the only place a topic's status lives, and the site's Topics tab reads it there.
- 2026-10-06 (modes): four additions (Matt approved). Look-alike topics are served back to back: each
  `01-topics.md` gained a `## Look-alikes` table (STAT 251 9 pairs, CPSC 310 5, PHIL 385 7, ASIA 250 5), and a
  picked question pulls the best question of its look-alike right after it. `--sprint` drills STAT 251 method
  choice: 10 short apply or derive questions in 3 minutes, method only, graded `O` or `X`. The day after a logged
  lecture, the first session opens with 2 minutes of free recall on it (Karpicke & Blunt 2011). The printout shows
  his past wrong answers for multiple choice and flags live variants, and its grade hint shows the new token form.
- 2026-10-06 (grading): a grade now carries more than O, ~ or X (Matt approved). He gives a confidence of 1 to 3
  with each answer and a one-letter cause after each miss. A confident miss gets "why were you sure?", and a
  CPSC 310 or PHIL 385 miss keeps his wrong answer for later multiple-choice distractors. All of it goes into the
  history entry, and the report adds Calibration and Misses by cause. A miss comes back 2 or 3 questions later
  until he gets it right once, which replaces the end-of-session second pass. An apply or derive question he last
  got `O` is asked as a variant with new numbers or code. The transit deck's plain reply works as before.
  `DAILY_CAP` is gone, because picking the lightest day already preferred days under it.
- 2026-10-06: the scheduler became exam-aware and balanced (Matt approved). PHIL 385's Exam 1 topics froze, since
  Exams 2–4 are not cumulative. The week before an exam sweeps in every topic it covers, and a grade never sets
  Next later than 4 days before that exam. Due topics rank by days late ÷ their ladder gap instead of raw days
  late, and a gap of 3+ days moves to the lightest nearby day. Topic tags now match by text, prefix or LO code
  only: the word-overlap fallback is gone (no question relied on it), and an unmatched tag prints one loud block.
- 2026-10-05: Matt asked for the lecture examples as practice, split by length: "some of the shorter ones can be
  quick and on the bus, then some other ones can be on the friday study sessions", or else "I'll just say the
  steps". Both: STAT 251's bank gained a `## Long problems` section (24 problems that need paper, 14 moved from
  the lecture and WeBWorK sections, 10 new, each answer opening with a Steps list). The bus deck skips it, a
  normal quiz asks its problems as steps only, and `--long` builds the Friday set, worked in full against a clock.
- 2026-09-19 (later): multi-part questions are asked as bullets, one part per bullet, MC options on their
  own lines. STAT 251 and CPSC 310 new questions are worked problems (WeBWorK-style data, code or design to
  critique), not recall; swap recall questions for problems as topics come up for more questions.
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
