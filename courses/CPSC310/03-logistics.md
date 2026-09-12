# CPSC 310 — logistics (one-time reference; pulled 2026-09-10)

## Where things live
- Canvas is not used at all (Kyle, Piazza welcome post Sep 11). The Canvas course (ID 192903) exists but is empty.
- Everything is on the course site: https://ubccpsc.github.io/310/26w1/ (syllabus, schedule, materials, project).
- Announcements happen on Piazza.

## Where and when
- Lectures: Tue/Thu. Sections 101, 102, 103.
- iClicker join codes are on the course landing page: 101 SSXL, 102 YSQU, 103 NBOE.
- Labs: on Zoom, links in Piazza post @14. Lab blocks run Fri to Thu, starting Fri Sep 11.
- Waitlisted: attend any lab.
- Lab work is due by the start of the next lab. The lowest lab is dropped.
- Cancelled labs: Wed Sep 30 and Mon Oct 12. Attend another section those weeks.

## Office hours (from Mon Sep 14)
- Mon 1:30–2:30, ICCS 238: Nick Bradley.
- Tue 11:00–12:30, room TBA: Dennis.
- Wed 2:00–3:00, ICCS 306: Kyle Chin.
- Thu 3:00–5:00, room TBA: Kevin.
- Fri 11:00–1:00, room TBA: Shu.

## Tools
- PrairieLearn: https://us.prairielearn.com/pl/course_instance/231184. Labs and project questions. All deliverables are submitted here.
- Piazza: class `mtkmphcadpx5k6`. Lab Zoom links in @14, office-hour times and links in @8.
- GitHub Enterprise: https://github.students.cs.ubc.ca/CPSC310-2026W-T1 (needs VPN and CWL).
- D1 spec: https://ubccpsc.github.io/310/26w1/project/d1-drop-in-a-feature. Starter repos were provisioned Sep 11. Autograding runs from the week of Sep 14.

## Grading and policies
- Participation 5% (iClicker, 4 lowest dropped). Labs 10%. Project 20%. Midterm 25%. Final 40%.
- Concessions only via the CPSC 310 Academic Concession Request Form, within one week of the deadline. If granted, weight usually shifts to the final. Canvas messages and emails are ignored.
- CfA exams must be booked 7 or more days ahead.
- AI (course site): allowed on labs and the project, but you must be able to explain everything you submit. Not allowed on exams.

## Schedule (course site)
| Wk | Lectures | Lab (Fri→Thu) | Deadline |
|---|---|---|---|
| 1 Sep 10 | Intro | Lab 1 Onboarding, Sep 11–17 | |
| 2 Sep 15/17 | Measuring a change; Cohesion & connascence | Lab 2 Cohesion & coupling, Sep 18–24 | |
| 3 Sep 22/24 | Refactoring; Polymorphism & LSP | Lab 3 Refactoring & LSP, Sep 25–Oct 1 | **D1 Fri Sep 25 18:00** |
| 4 Sep 29/Oct 1 | Testability; Test doubles & DI | Lab 4 Testability & seams, Oct 2–8 | |
| 5 Oct 6/8 | Adapter & Composite; Factory & Decorator | Lab 5 Patterns, Oct 9–15 | |
| 6 Oct 13/15 | API change severity; API design | Lab 6 API design, Oct 16–22 — pair formation | **D2 Fri Oct 16 18:00** |
| 7 Oct 20/22 | Testing pyramid; Layered architecture | Lab 7 Layers & test strategy, Oct 23–29 | |
| 8 Oct 27 | Synthesis & midterm review (no Thu) | project time | **Midterm Thu Oct 29 19:00–21:00**, paper, through Wk 6 |
| 9 Nov 3/5 | Requirements; Ethics & IP | none (fall break Nov 9–11) | **D3 Fri Nov 6 18:00** |
| 10 Nov 12 | Information security (no Tue) | Lab 8 Requirements, Nov 13–19 | |
| 11 Nov 17/19 | Specification & modeling | Lab 9 Specification, Nov 20–26 | |
| 12 Nov 24/26 | CI; team coordination | Lab 10 Process & metrics, Nov 27–Dec 3 | **D4 Fri Nov 27 18:00** |
| 13 Dec 1/3 | Process metrics; GenAI | | Final: university-scheduled, 2.5 h, cumulative |

## Where things live on the course site (checked 2026-09-11)
| Page | Has | Doesn't have |
|---|---|---|
| Schedule `/26w1/schedule` | week table; **slide PDFs** linked from the lecture title after each class (`/26w1/lectures/NN-*.pdf`); lab weeks; due dates | reader assignments |
| Course Materials `/26w1/materials/unit-0N/` | per lecture: the question it answers + **reader chapters** | slides, dates |
| Reader `/textbook/` | the textbook — exam terminology | anything course-admin |
| Syllabus `/26w1/syllabus` | policies, grading | content |
| Project `/26w1/project/` | InsightUBC overview; deliverable specs linked as released (`d1-drop-in-a-feature`, …); REST API spec at `project/spec.html` (Redocly, v2.0.3) | |
Canvas is not used. `cpsc310_site.py` in the morning-check scripts reads all of this.

## Project — InsightUBC (read 2026-09-11)
Inherited internal service for the Registrar's Decision Support team: course-offering data (PAIR) + facilities
data, exposed as a REST API. v1 = datasets + courses/sections + search; v2 = buildings/rooms (geocoded) +
cross-search. Previous "team" refactored only the courses slice (routers → controllers → services →
repositories); everything else is in one very large file. v3 is the D3/D4 target. Story arc: D1 = two small
features to feel the cost of change · D2 = make the network-reaching part testable, add the missing tests ·
D3/D4 (pairs) = vague stakeholder requirements → spec → build without breaking v1/v2.
**D1 (Fri Sep 25 18:00, individual, GitHub + PrairieLearn).** Request 1: optional `campus` on buildings —
parse from each building `.htm` header on `POST /api/v2/datasets`, editable via `PUT /api/v2/buildings/:id`,
searchable via `POST /api/v2/search`; tests for each; update `openapi.yml` Building schema + endpoints;
all existing tests must pass. Request 2: finish aggregation in `POST /api/v2/search` per `openapi.yml`
(validation is done; one method to implement) + tests. Reflection on PrairieLearn (4 Qs: how "no campus" is
represented incl. PUT-omits-campus behaviour · trace of one PUT from route to disk · every class/function
touched for PUT and *how you found each one* · what made PUT changes harder than expected vs request 2).
**Grading:** 50% autograded (every push to `main` is graded, best commit before the deadline counts) +
50% reflection, TA-marked. Needs UBC VPN to run tests (geocoding). Read the reflection Qs *before* coding
and keep a running list of every file/function touched and how it was found — Q3 is unanswerable after
the fact.

## Study resources (added 2026-09-10)
- Course reader: https://ubccpsc.github.io/310/textbook/. Three parts:
  - Software Construction: languages, async, assertions, REST.
  - Analytical Code Design: Cost of Change, Change Difficulty, Refactoring, Design Principles/SOLID, Testability.
  - Software Design: Design Patterns, Safe Versioning, APIs, Testing Pyramid.
- Reader chapter per Unit-1 lecture:
  - L1: What is SE, and the Analytical Code Design intro.
  - L2: Cost of Change.
  - L3: Change Difficulty.
  - L4: Refactoring.
  - L5: Design Principles.
  - L6: Testability.
  - L7: Testability and Design Principles.
- Slides are posted on the schedule page as each lecture happens.
- Materials by unit: https://ubccpsc.github.io/310/26w1/materials/unit-01/ (then unit-02, and so on).
- UBC CSSS exam bank: https://ubccsss.org/services/exams/cpsc310/. 2009 papers only. Useful for style, not content.
