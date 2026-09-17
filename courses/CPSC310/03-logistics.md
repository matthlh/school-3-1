# CPSC 310 — logistics

- **Lectures:** Tue/Thu 12:30–2:00, LSK. Section 103 (iClicker code NBOE). Canvas is not used;
  the course site has everything and announcements are on Piazza.
- **Labs:** his registered section is **L1N, Tue 09:00–11:00**, on Zoom. Section Zoom links are in
  Piazza @14 (the passcode links are deliberately not copied into this repo). Lab blocks run
  Fri→Thu from Fri Sep 11. Waitlisted → attend any lab. Work is due by the start of the next lab;
  the lowest lab is dropped. PrairieLearn's own credit window overrides the "start of the next
  lab" rule whenever the two disagree.
- **Submissions:** PrairieLearn (labs, project questions, reflections); code on GitHub Enterprise
  (needs VPN + CWL). Starter repos were provisioned Sep 11; autograding runs from the week of Sep 14.
- **Concessions:** only via the CPSC 310 Academic Concession Request Form, within one week of the
  deadline; weight usually shifts to the final. Canvas messages and emails are ignored. CfA exams
  must be booked ≥7 days ahead.
- **AI:** allowed on labs and the project if you can explain everything you submit; not on exams.

## AutoTest — how the project deliverables are graded (course site, 2026-09-16)
- Code is graded automatically on every push to `main`.
- Feedback on a specific commit is requested by posting a **commit comment** reading `@310-bot #d1` (the deliverable number changes per deliverable). A commit *message* does not work, and neither does a comment on a pull request.
- Feedback requests are capped at **3 per day**, resetting at midnight. A build, lint or Prettier failure burns one; a timeout does not.
- A response can take more than 12 hours at peak times, so the cap is not a substitute for running tests locally.
- The autograded mark is the **highest score from any push before the deadline**, timed by the push or merge event on `main` — commit timestamps are ignored because they can be forged.
- When merging a branch, use GitHub's default merge option. A squash or rebase merge does not trigger AutoTest.
- Unit tests belong in `/test/unit/`, and `yarn build` should pass before committing.
- Feedback is reported as bucket grades: Beginning, Acquiring, Developing, Proficient, Extending.

## Reader chapters by lecture (Unit 1)
| Lec | Reader chapter |
|---|---|
| L1 | What is SE · Analytical Code Design intro |
| L2 | Cost of Change |
| L3 | Change Difficulty |
| L4 | Refactoring |
| L5 | Design Principles |
| L6 | Testability |
| L7 | Testability + Design Principles |

Slide PDFs appear on the schedule page after each lecture. The UBC CSSS exam bank has 2009 papers
only — useful for style, not content.

## Reference (for Claude)
- Office hours from Mon Sep 14: Mon 1:30–2:30 ICCS 238 Nick Bradley · Tue 11:00–12:30 (room TBA)
  Dennis · Wed 2:00–3:00 ICCS 306 Kyle Chin · Thu 3:00–5:00 (TBA) Kevin · Fri 11:00–1:00 (TBA) Shu.
  Current list: Piazza @8.
- iClicker codes: 101 SSXL · 102 YSQU · 103 NBOE. Canvas course ID 192903 (empty).
- The lecture schedule was reshuffled on 2026-09-17. Refactoring stopped being its own lecture and
  was folded into lecture 3, so everything from the old lecture 4 onward moved one slot earlier.
  The order is now lecture 3 Cohesion & Refactoring (Sep 17), lecture 4 Polymorphism & LSP (Sep 22),
  lecture 5 Testability (Sep 24), lecture 6 Test Doubles & dependency inversion (Sep 29),
  lecture 7 Patterns: Adapter & Composite (Oct 1), lecture 8 Patterns: Strategy & State (Oct 6).
  Lab 2 was retitled "coupling & cohesion" and Lab 3 "refactoring & testability". No deadline moved.
- Course-site map (checked 2026-09-11): Schedule `/26w1/schedule` = week table, slide PDFs
  (`/26w1/lectures/NN-*.pdf`), lab weeks, due dates · Materials `/26w1/materials/unit-0N/` =
  per-lecture question + reader chapters · Reader `/textbook/` (Software Construction · Analytical
  Code Design · Software Design) · Syllabus `/26w1/syllabus` · Project `/26w1/project/` (specs
  linked as released; REST spec at `project/spec.html`, Redocly v2.0.3). `cpsc310_site.py` reads these.
- Project background: v1 = datasets + courses/sections + search; v2 = buildings/rooms (geocoded)
  + cross-search. Only the courses slice was refactored (routers → controllers → services →
  repositories); the rest is one very large file. v3 is the D3/D4 target. Lab 1 environment config
  must be done before D1 tests run.
