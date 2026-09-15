# CPSC310 — Introduction to Software Engineering (2026W1)

**Meets:** Tue/Thu 12:30–2:00pm, LSK (section 103) · Lab Tue 9:00–11:00am on Zoom

## Grading
| Component | Weight | Notes |
|---|---|---|
| Participation (iClicker) | 5% | 4 lowest dropped |
| Labs | 10% | weekly; due by the start of the next lab; lowest dropped |
| Project D1–D4 | 20% | 5% each; D1–D2 individual, D3–D4 pairs |
| **Midterm** | **25%** | **Thu Oct 29, 19:00–21:00**, in person, on paper, covers weeks 1–6 |
| **Final** | **40%** | university-scheduled, 2.5 h, cumulative |

**65% is two closed-book exams.** The "project is everything" reputation comes from earlier
versions of the course and does not apply to 26W1.

## Exam format
- Closed book, on paper, no devices, no AI. Every question asks you to justify your answer, not merely to give it.
- The 26W1 syllabus says memorising definitions will not be sufficient. The exams put code or a design you have not seen in front of you and ask what is wrong with it, what you would change, and why.
- Question kinds mirror what you practised in lecture activities, iClicker questions, lab tutorials, lab assignments and the project. Format details come closer to the exam date.
- Midterm covers content through week 6 (Oct 15). Final is cumulative.
- There are no past papers for this version of the course. The reader's licence says exams and solutions are private. The CSSS exam bank only has a 2009 sample final: 20 marks MC, 20 marks true/false, then 11 short-answer and design questions worth 6 to 12 marks each, 120 marks in 150 minutes. Student Quizlet sets from 2025 cover the old syllabus (security, agile process, MVC), most of which is gone from 26W1.
- Earlier terms used true/false with negative marking. Not yet confirmed for this year.

## Project — InsightUBC
An inherited REST service for the Registrar (course and facilities data). D1 = two small features to
feel the cost of change · D2 = make the network-reaching part testable · D3/D4 (pairs) = vague
requirements → spec → build without breaking v1/v2.

- Every deliverable = code + **design rationale** + **process evidence** (PRs, commits, reviews).
- Graded **50% autograder** (every push to `main`; best commit before the deadline counts) +
  **50% written reflection** on PrairieLearn, TA-marked. Everyone passes the autograder; the
  reflection is where marks are won or lost.
- **Late = not graded.** Autograder runs per day are limited.
- Tests need the **UBC VPN** (geocoding service).

| Due | Deliverable |
|---|---|
| Fri Sep 25, 18:00 | **D1** Drop in a feature *(individual)* |
| Fri Oct 16, 18:00 | **D2** Make it testable *(individual)* |
| Fri Nov 6, 18:00 | **D3** Design v3 *(pairs)* |
| Fri Nov 27, 18:00 | **D4** Build it *(pairs)* |

### D1 — Drop in a feature (Fri Sep 25, 18:00)
**Request 1:** optional `campus` string on buildings — parsed from each building `.htm` header on
`POST /api/v2/datasets`, editable via `PUT /api/v2/buildings/:id` (422 `"expected a string"` when
wrong; clients that omit it must get identical responses), searchable via `POST /api/v2/search`,
present in list / single / delete responses. Update `openapi.yml`, run `yarn docs:build`, keep
`yarn test` green (fix assertions, not test setup). **Request 2:** finish aggregation in
`POST /api/v2/search` per `openapi.yml` (validation exists; one method to implement) + tests.
Feature branch → PR → merge to `main` before the deadline — **only merged code is graded**.

**Reflection (PrairieLearn):** PR description (what changed, why, what might break) · files
modified · every file and function touched **and how you found each one** · a request trace from
route registration to the disk write · how an absent campus is represented, justified · half a page
on what was harder than expected · one structural change that would make the next feature cheaper,
with trade-offs. Keep a running list while coding — the "how you found it" question is
unanswerable afterwards.

## Schedule
| Wk | Lectures | Lab (Fri→Thu) | Deadline |
|---|---|---|---|
| 1 Sep 10 | The cost of change | Lab 1 Onboarding, Sep 11–17 | |
| 2 Sep 15/17 | Measuring a change · Cohesion & connascence | Lab 2 Cohesion & coupling, Sep 18–24 | |
| 3 Sep 22/24 | Refactoring · Polymorphism & LSP | Lab 3 Refactoring & LSP, Sep 25–Oct 1 | **D1 Fri Sep 25** |
| 4 Sep 29/Oct 1 | Testability · Test doubles & DI | Lab 4 Testability & seams, Oct 2–8 | |
| 5 Oct 6/8 | Adapter & Composite · Factory & Decorator | Lab 5 Patterns, Oct 9–15 | |
| 6 Oct 13/15 | API change severity · API design | Lab 6 API design (pair formation), Oct 16–22 | **D2 Fri Oct 16** |
| 7 Oct 20/22 | Testing pyramid · Layered architecture | Lab 7 Layers & test strategy, Oct 23–29 | |
| 8 Oct 27 | Synthesis & midterm review (no Thu class) | project time | **Midterm Thu Oct 29** |
| 9 Nov 3/5 | Requirements · Ethics & IP | none (fall break Nov 9–11) | **D3 Fri Nov 6** |
| 10 Nov 12 | Information security (no Tue class) | Lab 8 Requirements, Nov 13–19 | |
| 11 Nov 17/19 | Specification & modeling | Lab 9 Specification, Nov 20–26 | |
| 12 Nov 24/26 | Continuous integration · Team coordination | Lab 10 Process & metrics, Nov 27–Dec 3 | **D4 Fri Nov 27** |
| 13 Dec 1/3 | Process metrics · GenAI | | Final: university-scheduled |

Cancelled labs: Wed Sep 30 and Mon Oct 12 — attend another section those weeks.

## To verify
- [ ] Is T/F negative marking still used on exams?
- [ ] Final exam date (published ≥3 weeks before the end of classes)
- [ ] Do deliverables ever get posted to Canvas? (Canvas has nothing for this course; deadlines come from the calendar.)
