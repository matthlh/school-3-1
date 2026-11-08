---
name: quiz-me
description: Interleaved spaced revision quiz across every course from courses/<CODE>/02-questions.md, weighted by ledger.md (overdue → X → unquizzed → ~) and exam proximity. Asks one question at a time, grades X/~/O, moves ledger rows by the spacing ladder, keeps per-question history in routines/quiz-state.json, flags weak topics that need more questions, and builds the morning transit deck. Use for "quiz me", "test me", "quiz me on STAT251", "what's due", "transit deck", "STAT sprint", grades pasted back like "1 O 2 ~ 3 X", or the T-9…T-5 exam-ladder revision days.
---

# Quiz me

Two scripts with one JSON hand-off. Both live in `.claude/skills/quiz-me/scripts/`
(`$S` below = that directory, absolute: `/Users/matthe/Documents/CodingProjects/School 3-1/.claude/skills/quiz-me/scripts`).

- **Pick:** `quiz_pick.py` writes `routines/quiz-session.json` (`--transit`: `routines/transit-session.json`) and prints the session *with answers*
  (for my eyes only). It also refreshes the **Due now** block in `ledger.md` every run.
- **Grade:** `quiz_grade.py "3:O"` records question 3 the moment it is graded: its history, its ledger row, the
  Session-log line (2026-11-06). The session file stays open until every question is recorded (a skip `-` counts),
  so a stop loses nothing; retrying the same session item records it once (a `--said` sent with it is still kept);
  `--undo N` takes one back, reopening the last finished quiz when none is open (`--transit DATE --undo N` for a
  deck); `--finish` closes a session early. `--session FILE` uses the pending or filed copy of the same session when
  one exists, so an artifact's `session.json` never records an answer twice. Topic rows are recomputed from current
  per-question histories across all sessions; an old session snapshot never erases another session's evidence.
  Each new review has its own `event_id` and `session_id`, so separate same-day attempts remain distinguishable.
  An interrupted grade is recovered from its transaction journal on the next normal command; `--dry-run` refuses
  pending recovery instead of writing files. Do not delete the journal or reconstruct its files by hand.
  `--transit <deck date>` grades the transit deck's file instead, and only if it holds that day's deck.
- **Ids:** `quiz_ids.py` (2026-11-06). Every question carries `**Id:** xxxxxxxx` at the end of its meta line, and
  its history is filed under it, so rewording a stem keeps its history. `quiz_pick.py` stamps new questions on
  every run. Never copy an Id: a split part's meta line goes in without one (a duplicate stops every run).

Never edit the ledger's All-topics rows by hand. The scripts own them.

## Session — "quiz me"
0. Run `python3 "$S/sync_pull.py"` first, so grades he saved on the website today count before the pick. If it stops
   with "GitHub cannot find", the private repository is not set up yet: say so in one line and go on.
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
     1 is a guess, 2 is think so, 3 is sure. If he leaves it out, never ask for it (Matt, 2026-11-02: the prompts
     broke the flow). Read it from his wording when the wording is clear ("I think" or "maybe" is 2, "guess" or
     "no idea, but" is 1), and otherwise grade without one.
   - **A question about the question is not an attempt.** When he asks what a word in the question means ("What
     is an aria?"), answer in one or two plain sentences that do not give away the answer, then wait for his
     attempt. Nothing is graded and no answer is shown until he attempts, says "idk" or skips. When the word is
     itself what the question tests, say so in one line and let him attempt or pass.
   - **More than five facts: ask in parts.** When a question asks for more than about five separate facts (three
     stages, each with its character, opera and year, is twelve), ask the core first (the items and what
     separates them), then the matching, then any dates. Grade the question once against its whole key, and split
     it in the bank at step 6.
   - **Live variants.** When the item's last grade was `O` and its type is apply or derive, ask a variant instead
     of the original. Change the numbers or the code, keep the method, and work out its answer before you ask.
     The printout flags such an item `(variant: last O)`. Its grade is the question's grade, with no mark for the
     variant.
   - **Multiple choice from his own wrong answers.** When the printout shows past wrong answers for a CPSC 310 or
     PHIL 385 item, ask it as multiple choice. Give up to 3 of them plus the right answer, the right one about as
     long as the others, shuffled and lettered. If a variant is due too, ask the variant instead.
3. Grade, say why it earns that grade, then move on. Never reveal the answer early; "skip" / "idk" = `X`. Never
   give a hint before his attempt; the attempt to recall it is the point.
   - Grade against the answer's key (its `Key:`, `Steps:` or `Parts:` list, CLAUDE.md step 2). In a `Key:` or
     `Steps:` list the core (point 1) missing or wrong is `X`, the core with another point missing is `~`, every point
     is `O`. A `Parts:` list has no core (2026-11-06): every part right is `O`, at least half is `~`, fewer is `X`, and
     the feedback names the parts he missed. Blank or "idk" is `X`. A right answer at confidence 1 or 2 is still `O`;
     quiz_grade.py makes it a Good, which holds its topic's rung.
   - **Only what the question asks.** A key point the stem never asks for (a reason, a date, a second fact) is not a
     requirement: grade without it and fix the question at step 6, by adding the ask to the stem or moving the point
     into the explanation.
   - **Say why (Matt, 2026-11-02).** The feedback names the key points he gave, restated from his own words, so he
     knows what earned the grade: "Correct: you gave the core, that each woman thinks he wants her as herself while
     he wants what she shares with every woman." For a `~`, name the key point he left out and give it. For an `X`,
     give the key, plus one sentence from the explanation when the core needs it to make sense. A detail from the
     explanation that is not in the key is labelled "Not needed for full marks:" or left out, never added as if it
     were required.
   - **Term or idea.** When his word differs from the key's term, find out whether the idea is right before you
     grade. If his wording fits both a right and a wrong reading (he said "pure desire" for desire desiring), ask
     one short question first: "What do you mean by pure desire?" Then:
     - The right idea under the wrong term counts as half the point, because the exams ask for the term: `~` when
       it is the core, cause `f`. The feedback says the idea is right and gives the term: "The idea is right; A's
       term is desire desiring."
     - A wrong idea is graded by the key as usual, cause `c`, and the feedback explains the idea, not only the word.
   - **One follow-up on a right answer.** After an `O` on a concept question (PHIL 385, ASIA 250, a CPSC 310
     principle), you may ask one short question that links it to another idea from the same lecture: after "he
     desires the feminine in every woman", ask "How does that explain why wealth or beauty do not matter to him?"
     At most one every five questions. It is not graded; a miss on it becomes a new bank question at step 6.
   - **Bad question.** When he says a question or its key is wrong or ambiguous, grade it `-` (not assessed), fix it
     in the bank before the session ends, and never count it as a miss (Matt, 2026-11-01).
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
   - **Cause.** Every `X` or `~` gets a one-letter cause: `c` concept (he did not understand it), `f` forgot (he
     knew it once), `m` misread the question, `k` careless slip, `s` slow. Set it yourself from his answer and say
     the letter in the feedback line, so he can correct it (Matt, 2026-11-02: asking every time broke the flow).
     A wrong idea is `c`; the right idea without the term or fact, or a blank on a topic he has studied, is `f`;
     an answer to a different question is `m`; a slip inside a method he got right is `k`. Ask him only when you
     cannot tell `c` from `f`, since they need different fixes. A confident miss (`X` at 3) also gets one line,
     "Why were you sure?", unless the term-or-idea question already showed it; his reason goes in with `--why`.
   - For a CPSC 310 or PHIL 385 miss, keep his wrong answer in a few words for `--said` (step 5), so later
     sessions can offer it as a distractor.
4. **Relearn until correct (Matt, 2026-10-06; delay and variant 2026-11-02).** A missed question (`X` or `~`)
   comes back after at least 4 other questions, or at the end when fewer are left, until he gets it right once.
   Ask it as a variant that needs the same idea, not the same words, so it tests the idea rather than the
   answer he just read: the reverse direction for a fact (which pseudonym wrote it, then what that pseudonym
   wrote), new numbers for a calculation, another fragment for a code critique, or a "why" about the point he
   missed. Repeat it as first written only when no honest variant exists. After the last new question, the
   misses still open come back in turn. Only the first attempt is graded, and the next session brings an `X`
   back anyway (the ladder makes it due the next day). A re-ask needs no confidence or cause; if he misses it
   again, give the correction again.
5. **Record each first attempt as soon as you grade it** (2026-11-06), in the same turn as the feedback:
   `python3 "$S/quiz_grade.py" "2:X3/c" --said 2 "his answer"` — **always one quoted string** (an unquoted `~`
   becomes the shell's home directory). The script records it at once and prints one line. Re-asks of a miss are
   never recorded. When every question is recorded, the same call prints the full report for step 7. When he stops
   early, `quiz_grade.py --finish` closes the session and prints it. A wrong grade is fixed with `--undo N`, then the
   right one. Sending a recorded question's grade again does nothing, so after an interruption just re-send.
   - A token is the grade (`O`, `~` or `X`; `p` means `~`, `-` means skipped), then his confidence, then `/`
     and the cause letter on an `X` or `~`. A live variant gets its question's grade.
   - `--said N "text"` records his wrong answer to an `X` or `~`. `--why N "text"` records why he was sure, on
     an `X` at 3. Both can repeat.
   - A malformed token, a question number given twice, a flag on the wrong item, or a graded question whose
     topic names no ledger row any more stops the script before it writes anything. Fix it and run it again.
6. The script lists **Needs more questions** (X/~ topics with < 6 questions, leech questions missed
   ≥ 2 of the last 3). Write them now into `02-questions.md` under the lecture's section, same
   `**Topic:**` tag, aimed at *what he got wrong* from a different angle — not a rephrase. Split a
   leech into two smaller questions and delete the original, then `quiz_ids.py --retire <its id> "leech split"` so
   its history is kept as retired. Split a question you asked in parts the same way, except that the part carrying
   the original's main ask keeps its meta line and **Id:**, and the other parts get a meta line without one. A
   reworded stem keeps its Id. Say how many you added, one line.
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
| "studied / watched <COURSE> lec N" | `quiz_pick.py --studied <COURSE> N` (several lectures or a range `5-7`): that lecture's `not studied` topics come due today. Nothing else starts them. |
| "I haven't studied <COURSE> lec N" | `quiz_pick.py --not-studied <COURSE> N` (or a range): those topics read `not studied` and leave the queue; add `--topic <text>` to take only some of a lecture's topics. Set 2026-11-01: CPSC 310 lectures 8–10 and 13, and lecture 12's API design topic (he studied everything else up to the midterm); STAT 251 is studied through lecture 19. |
| how am I doing / weakest topics | `quiz_pick.py --report` |
| exam ladder T-9…T-5 (term.py) | `--course CODE --all --n 15` — every topic but the frozen ones eligible, weighted by weakness |
| T-4 | `--course CODE --all`, then ask only the X/~ topics the focus block names |
| PHIL 385 before exam 2–4 | `--course PHIL385 --all --n 15`. The earlier exams' topics are frozen, so only this exam's weeks come up. |
| Friday set / "long problems" / the Friday revision block | `quiz_pick.py --long` — 4 long problems (`--n` to change). It prints a clock, 2 minutes a part (`MINUTES_PER_PART` in quizlib.py, a first guess at the midterm's pace). Give him all the questions at once; he works them on paper with no notes and sends every part's answer when the clock runs out. Grade on the numbers: `O` = every part right · `~` = right method throughout but an arithmetic slip · `X` = a wrong method or a part left blank. Correct part by part against the bank answer, then `quiz_grade.py` as usual. Then a normal `quiz me` for the rest of the block. |
| STAT sprint / which method | `quiz_pick.py --sprint` — 10 short STAT 251 apply or derive questions by the usual priority, never a long problem (`--n` to change). It prints a clock of 18 s a question, 3 minutes for 10 (`SPRINT_SECONDS` in quiz_pick.py). Give him all the questions at once. For each one he names the distribution or rule and writes the first setup line, with no arithmetic, and sends them all when the clock runs out. Grade `O` (right method and setup line) or `X` (anything else, blank included), never `~`. Correct each `X` with the method from the bank answer, then plain `quiz_grade.py` as usual; the session's mode is `sprint`. |
| transit deck | First grade any fully tapped deck ("grade my deck" below). Then `quiz_pick.py --transit` — 6 short q, never a long problem; writes `routines/runs/<date>-transit.md` (questions, divider, answers) and its own session file, `routines/transit-session.json`, which `quiz_grade.py --transit <deck date>` grades (the deck date is that file's `date`, the day it was picked, and the deck page saves its taps under the same date); rebuilds the Transit Deck artifact (morning-check skill §7). `--transit` stops in two cases: a deck from another day is waiting ungraded (a new deck would strand its taps), or today's deck already exists, graded or not (a second deck under the same date would mix its taps with the first's). `--replace` is the only way past either; morning-check §7 step 1 says when to use it. |
| a pasted reply like `1 O 2 ~ 3 X` or `O ~ X O O X` | Right after you quizzed him in this conversation, it grades that session: `quiz_grade.py "<paste>"`, a bare sequence in session order. A bare reply in a conversation where you did not just quiz him answers the transit deck: `quiz_grade.py --transit <deck date> "<paste>"`. The deck date is the `date` in `routines/transit-session.json`, and the deck's title shows the same day (`Transit deck — Tue Oct 6`). |
| "artifact quiz N items" / "make a quiz page" | `quiz_pick.py --n N`, then `node ../../morning-check/scripts/build_transit_deck.mjs --date <today> --session routines/quiz-session.json --title "<Mon D> Review Quiz" --out <scratchpad>/review-quiz.html`, and publish it as a new artifact with `capabilities: {"db": {}}` and the session file beside it as `session.json` (so a later session can grade it with `--session`). "Grade it" reads `grades/<date>` from that artifact as for the deck below and runs plain `quiz_grade.py "<replyString>"` (`--date` if picked on an earlier day, `--session` with the artifact's `session.json` if `routines/quiz-session.json` is gone). The first one was 2026-11-01. |
| "grade my deck" / "grade the transit deck" | Pull it from the artifact instead of asking him to type it: `ArtifactData` with `action: "get"`, `collection: "grades"`, `doc_id` = the `date` in `routines/transit-session.json` (the deck page's fixed DATE_ID) and `url` = the Transit Deck artifact URL (morning-check SKILL.md §7). Unless it is already `processed: true`, first rewrite each question the doc marks `flagged: true` (grade `-`), then run `quiz_grade.py --transit <doc_id> "<replyString>"` with the cards he has graded so far, partial or not (2026-11-06): cards already recorded are skipped, so the same doc can be graded again after more taps, and the session closes by itself once every card is in. A deck that `--replace` filed away still takes its unrecorded
taps (`--transit <its date>` finds it in `routines/quiz/sessions/`) and says it is closed. Mark the doc `processed: true` (`ArtifactData` `action: "update"`, the same `url`, `collection` and `doc_id`, `if_version` = the `version` the get returned) once every item has a grade or the script says the deck is closed. If nothing's there yet, say so — don't invent a reply. |
| "import my website reviews" / "sync my reviews" | `sync_pull.py` (also the morning check's first review step). It reads the grades he saved on the website's Review page, phone or laptop, from the private repository `matthlh/school-3-1-progress` through `gh api`, and files each one in quiz-state.json under the site's own event id, so a second run records nothing new; an undo event removes its grade. What he typed for an X or ~ goes to quiz-private.json only. It re-derives the touched rows, refreshes the Due-now block and review-plan.json, writes one Session-log line per website session, and lists the questions he flagged as wrong or unclear: rewrite those the same day. `--dry-run` shows it without writing. Until the repository exists it stops with "GitHub cannot find"; report that in one line. |
| is FSRS better yet / the FSRS shadow trial (from Oct 6, running until it decides) | `fsrs_shadow.py` — read-only: replays `routines/quiz-state.json` through FSRS-6 with its default parameters beside the ladder, prints log loss, RMSE and a 5-bin calibration table for FSRS and the ladder baseline, then one verdict line, always last (the Sunday weekly brief quotes it). `--since YYYY-MM-DD` scores only reviews from that day on. The ladder keeps scheduling; Matt adopts FSRS only if it beats the ladder baseline. |

A new quiz pick replaces an open `routines/quiz-session.json`: the answers recorded from it are already in the ledger,
the file goes to `routines/quiz/sessions/`, and its unanswered questions are simply not asked. A new transit deck never
replaces a waiting deck or today's deck unless `--replace` says so (the transit row above). If he sends grades and no
session file exists, say so — never invent one. Plain grading also refuses a quiz session picked on an earlier day;
when it really is that day's quiz, `--date <its date>` grades it as that day.

## What the scripts decide (don't second-guess them)
- **Due.** A topic is due when its Next date is today or past, or when the exam-week sweep below pulls it in.
  A frozen topic is never due.
- **Not studied** (Matt, 2026-11-01). A ledger row whose Next cell reads `not studied` is a lecture he has not studied
  yet: never due, never picked (not even by `--all` or the sweep; `--topic` still can), and not counted as weak or
  short of questions. The focus block counts them per course. `--studied <COURSE> <lec>` sets their Next to today.
  Rows get it when a lecture is banked before he studies it (CLAUDE.md step 3); ASIA 250's 17 rows were set on
  2026-11-01, when he said he had watched and read none of it.
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
- **Per-question schedule (2026-11-06).** Each question keeps its own place on the ladder, replayed from its own
  history (`card_state`), so an `O` on one question no longer pushes out a sibling he missed, and an `X` on one no
  longer calls back siblings he knows. Attempts on the same calendar day use that day's worst grade and can
  advance the ladder only once. An `X` followed by an `O` that day still needs a next-day check. When the day's grade
  is `O`, any low-confidence `O` that day holds the rung. Every recorded attempt stays in history.
  The topic row groups the cards (`row_due`): its Next is the earliest Next of its asked cards and, while any card is
  unasked, the topic's own ladder date (`topic_state`: the ladder replayed over every answer to any of its cards, a
  day at a time; before the first answer, its activation date). So an unasked card waits at most the topic's own gap,
  however far a promoted sibling has moved, and a graded topic is not held due just because it has unasked cards
  (2026-11-06; the first version pinned Next to Last, which kept 55 topics due every day). `not studied` stays
  excluded. `sync_card_dues`, on every pick and grade, can only pull the row's Next earlier; grading recomputes the
  summary. A row's Next can be earlier than its Last when an older card is still due.
- **Within a topic:** questions whose own Next has come first (missed ones before shaky ones), then never-asked
  ones, then asked ones that are not due yet, which only fill a session as *(ahead)* items. Never-asked questions of
  studied topics that are not due form a new pool, asked after every due question and before any *(ahead)* one, so a
  session with room makes first contact early. A topic due as a whole with none of its questions due on its own (the
  exam-week sweep, a Next moved to a lighter day) gets its best question into the due pool, but not in `--long`,
  `--transit` or `--sprint` when a question that mode leaves out is what made it due; plus a small bonus for
  the question types that course's exam rewards (CPSC 310 recall/critique · STAT 251 apply/derive · PHIL 385 and
  ASIA 250 recall).
- **Interleave:** within the quotas, breadth first: every topic gets one question before any topic gets a second
  (Matt, 2026-11-01: a 50-question session had asked 24 topics, three questions each for the X ones, and nothing from
  STAT 251 lectures 15–19). Never the same topic twice in a row, cap per topic = max(3, n ÷ due topics); leftover
  slots go to the best remaining due questions, then new ones, then *(ahead)* ones.
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
- **Topic summary** (`topic_summary`). Grading derives the row from all current histories, including overlapping
  transit and normal sessions, over the questions tagged to the row now plus the session's items filed under it at
  pick time (so a question retagged mid-session still moves the row it was picked for; the row its tag names now is
  derived too). Last is the latest review date; Grade is the worst answer on that day; Streak is the topic's own ladder
  (`topic_state`); Next is `row_due`, then load balancing below. A Grade worse than the answer just recorded says
  which day's other answer set it, and a Next already past says another question of it is still due.
  Undo removes the exact review event and recomputes this summary. A saved baseline is used only if no card history
  remains. A legacy review that cannot be identified uniquely is not undone. The per-card ladder is:
  `X` streak 0, +1 d · `~` +3 d · `O` streak+1, +7 / +16 / +35 d. The exam cap below can shorten that gap.
- **Exam scope.** The exams are the ledger's Term calendar rows with Kind `exam`, which term.py loads, and lecture
  N's date comes from term.py's lecture numbering. An exam covers the lectures from the start of term up to its date.
  An exam's name (`exam_name`) is its label up to the first dash, parenthesis, comma or semicolon. term.py writes the
  label as the bold name, the start time, then the weight, so the name keeps the start time (`Exam 2 14:00`,
  `Midterm 19:00`). PHIL 385's Exam 1 is plain `Exam 1`, because its bold name runs on past a dash.
  - A cutoff in `EXAM_CUTOFF` ends a scope earlier. The CPSC 310 midterm (Thu Oct 29) covers lectures 1–12,
    through Tue Oct 20: the Oct 27 review deck says REST (lecture 13, Oct 22) is not on it. The syllabus had said
    week 6 (Oct 15) and the schedule page Oct 22.
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
  `_Readiness · PHIL 385 Exam 4 13:00 · Fri Nov 20 · 31% of 120 in-scope questions likely recalled · 52% asked · 71% right last time · 2 topics in scope have no question._`
  The in-scope questions are the bank questions whose ledger topic that exam covers, by the scope rule above, so a
  frozen topic never counts. Three numbers, kept apart (2026-11-06): **likely recalled** is the mean chance of
  recalling each question today, its last grade (`O` 1, `~` 0.5, `X` or never asked 0) times 0.9 for each ladder gap
  since that answer (`RETAIN`), so an old `O` no longer counts as certain; **asked** is the share asked at least once
  (coverage); **right last time** is the share of the asked ones whose last answer was right, `~` as half (accuracy;
  `none asked yet` when none was). Percentages round half up. The last part counts the in-scope topics with no
  question in the bank, and it is left out when there are none. The lines cover every course whatever `--course` says.
  Grading counts the session it is grading, `--dry-run` included.
- **Exam cap.** The cap is the latest date a grade today may set as Next. It comes from the first exam that covers
  the topic and is at least 2 days away: 4 days before that exam (`CAP_DAYS`), or the day before it when that day is
  today or past. An exam today or tomorrow sets no cap, because this review is the last one before it, so the next
  covering exam after it sets the cap; with none, there is no cap. Each card's date is its ladder date or this cap,
  whichever is earlier, computed from the review date.
- **Load balancing** (Matt approved, 2026-10-06). When the gap from the review day to the topic's Next is 3 days or
  more, Next may come up to 15% earlier, at least a day (`SPREAD`), to the day with the fewest topics due in the
  ledger's Next column (`next_review`; frozen topics do not count). It never moves later: each card's own date is the
  latest its topic may wait, and `sync_card_dues` would pull a later date back. The delta says "moved to a lighter
  day".
- **Topic matching.** A question's `**Topic:**` tag and a Look-alikes cell find their ledger row by one rule
  (`match_topic`): the same text, else one a prefix of the other (6+ characters), else a shared LO code (`1b–c`),
  compared after dropping bold and parentheticals. The first of these that hits any row decides. When it hits
  several rows, the scripts stop and name the tag or cell, so a grade never lands on a guessed row. Nothing fuzzier.
  A tag that is an exact copy of a ledger row's topic always names that row, which is the way out when two rows
  differ only inside parentheses. `quiz_grade.py` files each graded question under the ledger topic stored when the
  session was picked, so retagging the bank does not change a session already picked.
- **Unmatched tags.** A tag that matches no ledger row prints one ⚠ block in every `quiz_pick.py` run (`--due`
  included) and in `quiz_grade.py`. It names each tag with its question count and first `file:line`. Such questions
  are never picked. When a graded question's topic names no row any more (its row was renamed after the pick),
  `quiz_grade.py` stops before writing anything and names it; make a ledger row match it and grade again.
- `ledger.md` holds the only copy of each topic's grade, streak and Next. Grading never writes
  `courses/<CODE>/01-topics.md`, which keeps the topic list, its notes and the Look-alikes table. The notes site's
  Topics page (from a course's Progress tab) shows each row's grade from the ledger and its standing from the Due now block.
- Knobs at the top of `quizlib.py`: `MIN_QUESTIONS_PER_TOPIC` (6), `LEECH_X_IN_LAST` (2 of 3), `TYPE_PREF`,
  `SWEEP_DAYS` (7), `CAP_DAYS` (4), `SPREAD` (0.15), `NON_CUMULATIVE` and `EXAM_CUTOFF`. Each
  `NON_CUMULATIVE` or `EXAM_CUTOFF` key must name exactly one exam in the ledger's Term calendar, or the scripts
  stop.
- `SCHOOL_ROOT=<copy>` points the scripts at a copy of the workspace for testing.

## Files
- `routines/quiz-session.json` — the open session. Each recorded item gets `done` with its review identity; `before`
  is a fallback for undo when no history remains, not a basis for overwriting newer reviews. Moved to
  `routines/quiz/sessions/<id>.json` once every item is recorded or on
  `--finish`; a new quiz pick files an open one there too.
- `routines/transit-session.json` — the transit deck's open session, written by `quiz_pick.py --transit` and graded with `quiz_grade.py --transit <deck date>` from the deck page's taps, partial or not (a new deck replaces a waiting one, or follows today's, only with `--replace`)
- `routines/quiz-state.json` — per-question history and session records, tracked because the site shows it. A
  new history entry is `[date, grade, extra]`, with `event_id`, `session_id`, and optional `conf` and `cause` (the full
  word). Legacy entries retain their previous shape. A record whose question left the bank keeps its history and
  gets `retired` (why).
- `routines/quiz-private.json` — git-ignored: his wrong answers (`said`) and why he was sure (`why`), by question id
  (moved out of the public quiz-state.json on 2026-11-06)
- `routines/quiz/YYYY-MM-DD.md` — session log: grades, misses with the correct answer, ledger delta
- `routines/quiz/grade-transaction.json` — temporary recovery journal for a grade's complete output files; the next
  normal command rolls an interrupted write forward once, under the shared writer lock.
- `routines/runs/YYYY-MM-DD-transit.md` — the deck the morning check sends to his phone
- `routines/review-plan.json` — tracked and public: the website Review page's queue (`quiz_pick.review_plan`), rewritten
  by every `quiz_pick.py` run, every grade and every `sync_pull.py`. It holds question ids, ledger row keys, exam dates
  and the count of due entries, nothing he wrote. The queue is every asked question whose date has come, then the
  never-asked ones of due topics, then those of the other studied topics; long problems are left out.
- `routines/quiz/web-events/` and `routines/quiz/web-sessions.json` — git-ignored: `sync_pull.py`'s cache of the
  private repository's event files, and each website session's Session-log line.

## Website Review page and sync (2026-11-06)
Matt asked for review on the website with progress that syncs between his phone and laptop by itself; storage in one
browser was not enough. The page is `#/review` (Review in the top bar's menu, Today's Start review, and a course's Study tab):
- It asks the plan's queue, due first, minus anything answered since on any device. The topic stays hidden until the
  key shows. He may type an answer, taps Guess, Think so or Sure (which reveals the key), ticks the key points his
  answer had, and saves; the grade follows the same rule as here (core, or Parts by count). Opening the notes before
  the key counts as help: an `O` becomes `~`. "Question is wrong or unclear" saves no grade and lists it for rewriting.
- Each save is an event saved on the device at once and pushed to the private repository as its own file
  (`events/<day>/<id>.json`), so retries and two devices at once never duplicate or overwrite anything. Undo is a new
  event. The chip says This device only, Saving, Saved and synced, Offline (N waiting) or Sync problem.
- Each device needs the repository and a fine-grained token (that repository only, Contents read and write) once, in
  the chip's settings; the token stays in that browser and is never part of the site or this repository.
- The site's schedule (`notes-app/src/review/schedule.ts`) is a port of `card_state`; `npm run test:review` replays
  every real history through both and fails on any difference, and tests the sync against an in-memory GitHub.
- `sync_pull.py` brings the events into the quiz records (Variants above).

## Publish (end of every graded session)
Grading rewrites `ledger.md` (Due now, topic rows) and sometimes `02-questions.md`. Once the ledger
is written, run `sh "/Users/matthe/Documents/CodingProjects/School 3-1/publish.sh" "Quiz YYYY-MM-DD"`
so the hosted notes site shows the new schedule. Nothing to commit → it says so and exits. Plain
commit message, never an attribution trailer.

## Tuning log
- 2026-11-06 (review of Codex's fixes): an adversarial review on copies of the real data found that unasked cards
  pinned every topic's Next to its Last (55 topics due every day after all-O sessions, against 18 by Nov 11 now), that
  a stale miss from September turned today's `O` into an `X` row, that an answer to a question retagged mid-session
  moved no row, and that load balancing had been dropped. Fixed with `row_due`, the topic's own ladder for Grade and
  Streak, pick-time items in the row's card set, and earlier-only balancing; plus a new-card pool in the picker,
  absolute journal paths, a recovery that refuses to overwrite a file edited since the interruption, the closing
  report kept in the journal, and an id-less pending deck removed when finished.
- 2026-11-06 (audit): Matt passed on a ChatGPT audit of the whole quiz system and asked for the changes. Done: every
  question has a permanent `**Id:**` (all 988 stamped with the ids they already had, so no history moved; 17 loose
  records from questions cut in September and October kept as retired), so rewording keeps history; each question
  is scheduled on its own ladder inside its topic, and a due topic asks its due and new questions before ones that
  are not due; each answer is recorded the moment it is graded, a re-sent grade counts once, `--undo` takes one
  back, and a partial deck is recorded instead of waiting for the last tap; `Parts:` keys for questions with
  independent parts, graded by count, and no key point the stem does not ask for (all four banks reviewed by an editor
and a checker each: about 530 keys became Parts, 40 questions were split into 84, about 180 unasked points left the
keys or got an ask in the stem, no fact or Id lost); readiness
  decays old answers and reports coverage and accuracy separately; his wrong answers moved to the git-ignored
  quiz-private.json; the Codex copies became links to these files. Not done: a review mode on the public notes site
  with its own database (Supabase). It needs an account only Matt can create and a multi-day build, and the deck
  page already saves every tap privately on claude.ai and syncs across devices, so the deck page is the review page.
- 2026-11-02 (feedback): Matt passed on ChatGPT's review of a PHIL 385 session and asked for the valid parts. The
  session had treated a vocabulary question ("What is an aria?") as an attempt, treated "pure desire" as a wrong
  answer without asking what he meant, asked twelve facts in one question, answered an `O` with extra facts of
  unclear weight, and asked "Confidence?" and "Cause?" after nearly every answer. Now: a question about the
  question is not an attempt; an unclear term gets one "what do you mean" before grading, and a right idea under
  the wrong term is `~` with cause `f`; questions of more than about five facts are asked in parts and split
  (three split in the banks: the three stages with character, opera and year; Kierkegaard's family deaths; the
  Pali Canon numbers); the feedback says which key points earned the grade and labels anything else as not
  needed; confidence is never prompted for and the cause is set by me; a miss returns after at least 4 other
  questions as a variant; one ungraded follow-up linking ideas is allowed every five questions. Kept: the
  confidence scale itself (it schedules a Good) and "why were you sure" on a confident miss, which is rare.
- 2026-11-01 (keys, not studied): after the 50-question session Matt had ChatGPT review the system and asked for the
  valid parts. Done: every answer now opens with an explicit key whose first point is the core, and the grade
  follows the core (X without it, ~ with a gap, O with everything) instead of the share of sentences ticked, which
  had counted commentary like iClicker results as points; an O at confidence 1–2 holds its rung (`--score` gone); a
  Bad question tap or "that question is wrong" grades `-` and gets the question rewritten (q37 was regraded that
  way); topics he has not studied read `not studied` and stay out of the queue until `--studied`. Not done, on
  purpose: a skill layer under topics (one-point-per-fact keys and per-question history give the same evidence),
  a five-state model (repair is the leech flag, paused is frozen, learning is the X rung), a time-budgeted
  review/repair/new mix (breadth-first plus not-studied covers it) and new exam rules (the cap and sweep already
  re-ask a miss before the exam). The FSRS shadow trial keeps running until it decides.
- 2026-11-01 (breadth): the first 50-question session (an artifact page, graded from its saved taps) asked 24 topics
  and none of STAT 251 lectures 15–19, because every X topic took its 3 slots before any unquizzed topic got one.
  The picker now goes breadth first; the same pick on a copy covered 42 topics. Matt's calls from the session: 24 of
  27 misses were material he had not studied yet (ASIA 250 unwatched, CPSC 310 never reviewed), and his confidence
  was well calibrated (1 → 7% O, 3 → 80% O). The FSRS shadow trial ended undecided (31 scored reviews of about 1077
  needed), so the ladder stays.
- 2026-10-06 (mirror): grading no longer copies Last, Grade, Streak and Next into `01-topics.md` (Matt approved).
  The copy was lossy and had started to match rows of the new Look-alikes tables. Those columns are gone from the
  topic tables, so `ledger.md` is the only place a topic's status lives, and the site's Topics page reads it there.
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
  topics that need more questions, and keeps the SRS. Question IDs were a hash of course + text, so
  editing a question's wording reset its history (replaced by stamped ids on 2026-11-06).
