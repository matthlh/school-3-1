# CPSC 310 — logistics

- Section 103 meets Tue and Thu from 3:30–5:00 in LSK 201. Its iClicker code is NBOE. The course site has the materials, and Piazza has announcements. The course does not use Canvas.
- Lab L1N meets Tue from 09:00–11:00 on Zoom. Find the section links in Piazza @14.
- Lab blocks run from Fri to Thu, starting Fri Sep 11. If you are waitlisted, attend any lab.
- Work is normally due by the start of the next lab. If the PrairieLearn credit window differs, use the PrairieLearn window. The course drops the lowest lab grade.
- Submit labs, project questions and reflections in PrairieLearn. Submit code on GitHub Enterprise using the VPN and CWL. Starter repositories were provisioned Sep 11. Autograding started the week of Sep 14.
- Request a concession through the CPSC 310 Academic Concession Request Form within one week of the deadline. The weight usually moves to the final. Canvas messages and emails are ignored. Book CfA exams at least 7 days ahead.
- You may use AI on labs and the project if you can explain everything you submit. Exams prohibit AI.

## Midterm format (Piazza @180, Kyle, Oct 15; settles the earlier @163 note)

- Thu Oct 29, 19:00 to 21:00, on paper. Arrive 15 minutes early with UBC ID, pencils and erasers; phones and watches off and in the bag.
- Room by last name: GWHB 1004 for ABB to GUR, HEBB 100 for HAN to SEK (Matt), SHRM B1001 for SEN to ZOU.
- The exam uses true/false, multiple choice, short answer and long answer. Every question involves reading code.
- Short and long answers require some handwritten TypeScript. The exam is designed to keep the amount of writing small.
- Each question type mirrors something from lecture, the PrairieLearn labs and practice problems, or the project. Content covers everything through the prior week. The Oct 27 review deck (slide 2) says REST is not on the midterm, so the scope is lectures 1 to 12 (Oct 20), which is quizlib's EXAM_CUTOFF.
- Cheat sheet: one 8.5 by 11 sheet, handwritten only (no tablet printouts), both sides, collected at the end. Kyle says to fill it with what helps apply principles and TypeScript syntax, not trivia.
- Practice exam: released the week of Oct 12 to 16; Lab 7 asks for evidence that it was printed, completed and marked on paper. Length and content may differ from the real exam.
- The practice exam is Piazza @192 (Kyle, pinned, Oct 16): two PDFs, the exam and a code booklet, plus `SAMPLE_SOL_UPDATED.pdf`. Kyle's instructions are to print it, do it by hand without the internet, and time each question and the whole thing; it is meant to run about as long as the real two hours. The solution was corrected on Oct 28 (5a, 5d and 6b), and question 3c's LSP answer is disputed in the followups and unanswered. LAB07.1 on PrairieLearn is only a reflection on having done it.
- Schedule: Lab 7 is released early and holds testable material, with the lab slot used to meet the D3 group. Tue Oct 27 is a review lecture (topic poll the week before). Thu Oct 29 lecture is cancelled. Office hours continue.
- The two earlier classmate reports, all true/false or all multiple choice, disagree with the mixed format confirmed in Piazza @180.

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
  (`/26w1/lectures/NN-*.pdf`), lab weeks, due dates · Reader `/textbook/` (Software Construction ·
  Analytical Code Design · Software Design) · Syllabus `/26w1/syllabus` · Project `/26w1/project/`
  (specs linked as released; REST spec at `project/spec.html`, Redocly v2.0.3). The Materials unit
  pages were removed from the site on 2026-09-28, so nothing there maps lectures to reader chapters
  any more. `cpsc310_site.py` reads the schedule and the project page.
- Project background: v1 = datasets + courses/sections + search; v2 = buildings/rooms (geocoded)
  + cross-search. Only the courses slice was refactored (routers → controllers → services →
  repositories); the rest is one very large file. v3 is the D3/D4 target. Lab 1 environment config
  must be done before D1 tests run.
