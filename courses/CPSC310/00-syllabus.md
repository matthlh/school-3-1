# CPSC310 — Introduction to Software Engineering (2026W1)

- **Type:** Exam-dominated, with a four-part project
- **Meets:** Tue/Thu 12:30–2:00pm, LSK. Lab Tue 9:00–11:00am
- **Course site:** https://ubccpsc.github.io/310/26w1/

> Pulled from the official 26W1 syllabus on 2026-09-08. Verify against Canvas.

## Grading weights
| Component | Weight | Notes |
|---|---|---|
| Participation | 5% | |
| Labs | 10% | weekly, Tue |
| Project (D1–D4) | 20% | four equally-weighted deliverables |
| **Midterm** | **25%** | Thu Oct 29, 19:00–21:00, in person |
| **Final** | **40%** | university-scheduled, 2.5 h, cumulative |

**65% of this course is two closed-book exams.** This is the single most important fact about
your term. The course's reputation — "the project is everything, get a good partner" — comes
from earlier project-heavy versions and does not apply to 26W1.

## Exam format
- Both exams invigilated. **No external notes, no devices, no AI.**
- Questions require justification: you are "asked to justify your answer, not merely to give it."
- Midterm covers content through Week 6 (ending Oct 15). Final is cumulative.
- Past finals (student reports): heavy on precise recall of specific facts about individual
  concepts; trick questions; harder than the in-term quizzes. Earlier terms used T/F with
  **negative marking** — confirm whether that holds this year.

## Project rules
- **D1 and D2 are individual.** D3 and D4 are in pairs — your partner and no one else.
- Every deliverable ships three things: the code, the **design rationale**, and **process
  evidence** (pull requests, commits, reviews). Autograder alone forfeits the judgment marks.
- **Late assignments are not graded.** No partial credit.
- Autograder has limited runs per day — brute-forcing is not available. Start early.

## Deliverable dates
| Due | What |
|---|---|
| Fri Sep 25, 18:00 | **D1** — Drop in a feature *(individual)* |
| Fri Oct 16, 18:00 | **D2** — Make it testable *(individual)* |
| Thu Oct 29, 19:00 | **Midterm** |
| Fri Nov 6, 18:00 | **D3** — Design v3 *(pairs)* |
| Fri Nov 27, 18:00 | **D4** — Build it *(pairs)* |
| TBD | **Final** |

## Schedule — units and lecture topics
**Unit 1 · Design in the small (Wks 1–5)**
- W1 (Sep 8, 10): The cost of change *(no Tue class)*
- W2 (Sep 15, 17): Measuring a change · Cohesion & connascence
- W3 (Sep 22, 24): Refactoring as a discipline · Polymorphism & LSP
- W4 (Sep 29, Oct 1): What makes code testable · Test doubles & dependency inversion
- W5 (Oct 6, 8): Patterns — Adapter & Composite · Patterns — Factory & Decorator

**Unit 2 · Layers & interfaces (Wks 6–7)**
- W6 (Oct 13, 15): API change severity & versioning · API design
- W7 (Oct 20, 22): The testing pyramid · Layered architecture
- W8 (Oct 27, 29): Synthesis & midterm review · **Midterm**

**Unit 3 · Requirements & specification (Wks 9–11)**
- W9 (Nov 3, 5): Where requirements come from · Ethics & IP
- W10 (Nov 10, 12): Information security *(no Tue class)* · Fall break Nov 9–11
- W11 (Nov 17, 19): Specification & modeling · *Specification is Right*

**Unit 4 · Software process (Wks 12–13)**
- W12 (Nov 24, 26): Continuous integration · How teams coordinate
- W13 (Dec 1, 3): Process metrics · GenAI & where the cost moves

## Strategy
1. Treat the lecture vocabulary as an exam in a foreign language. Cohesion vs. connascence,
   LSP, test doubles, the pattern set, API change severity — these are recall questions worth
   65% of your grade.
2. Cap deliverable work. Bucket grading means hours past "meets spec" return nothing. Ship on
   time with rationale and process evidence attached; then stop.
3. D1 is due Sep 25 and lateness is a zero. Get the toolchain working this week.

## Where everything actually lives

| Thing | Link |
|---|---|
| Course site (the real one) | https://ubccpsc.github.io/310/26w1/ |
| Course reader | https://ubccpsc.github.io/310/textbook/ |
| **Piazza** | https://piazza.com/ubc.ca/winterterm12026/cpsc_v310101102103/home |
| **PrairieLearn** (deliverable submissions) | https://us.prairielearn.com/pl/course_instance/231184 |
| GitHub Enterprise | https://github.students.cs.ubc.ca/CPSC310-2026W-T1 |
| **iClicker — section 103** (yours) | https://join.iclicker.com/NBOE |

iClicker is how the 5% participation is measured. Join section **103** — that's your lecture
section (Tue/Thu 12:30–2:00). Piazza for this course is **not linked from Canvas**; it only
appears on the course site.

## D1 — Drop in a Feature (due Fri Sep 25, 18:00)

**The task:** add an optional `campus` string field to buildings, via
`PUT /api/v2/buildings/:buildingId`. Validate it like the existing fields — return 422 with
`"expected a string"` when it's wrong. Clients that don't send it must get identical responses to
today. The field has to show up in building lists, single-building responses, and delete
responses. Update `openapi.yml`, run `yarn docs:build`, keep `yarn test` green (fix assertions,
not test setup). Work on a feature branch, open a PR, merge to `main` before the deadline —
**only merged code is graded.**

**Grading is 50% autograder, 50% human judgment.** The judgment half is written work submitted
on PrairieLearn, and it is substantial:

- PR description, 3–4 sentences: what changed, why, what might break
- Number of files modified
- Every file and function you touched — **and how you found each one**
- A request trace: route registration all the way through to the disk write
- Your choice for representing an absent campus (omit the key? `null`? something else?) with a
  justification
- ~Half a page: what made this harder than expected, what needed a judgement call, what surprised you
- One paragraph: a structural change that would make the *next* feature cheaper, with tradeoffs

**This is where the marks are.** Everyone in the class will pass the autograder. Half of them
will write two sentences of reflection and lose 25 points. The written half costs maybe an hour
and is worth exactly as much as all the code.

**Two setup gotchas:**
- **You must be on the UBC VPN** — the tests hit a geocoding service and fail without it.
- Lab 1 environment config has to be done first.

The deliverable is *designed* to expose the fact that several code locations must stay in sync
with nothing checking that they do. That observation is the point, and it feeds D2–D4 and the
lectures. Note it while you're in there — it's exam material.

## ⚠️ Canvas is empty for this course

Checked 2026-09-08: **CPSC 310 has zero assignments configured on Canvas.** Every deadline lives
on the course site (ubccpsc.github.io/310/26w1) and in GitHub Classroom.

Practical consequence: **Canvas will never warn you about D1.** No due-date notification, no
"upcoming assignments" entry, nothing in your Canvas to-do list. The only thing standing between
you and a zero on a deliverable is the calendar. All four are already on it.

This is also why the other three courses' deadlines came through and this one's didn't — don't
read silence from Canvas as "nothing due."

## To verify
- [ ] Is the T/F negative-marking format still in use?
- [ ] Final exam date (published ≥3 weeks before end of classes)
- [ ] How participation (5%) is actually measured
- [ ] Whether deliverables get posted to Canvas later in the term
