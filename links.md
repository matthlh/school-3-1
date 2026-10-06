# Links

Every course tool in one place. A name opens the tool in a new tab, and the same links sit on each course page.

| Course | Link | URL | Attach to to-dos matching |
|---|---|---|---|
| ALL | Canvas | https://canvas.ubc.ca/ |  |
| ALL | Notes site | https://matthlh.github.io/school-3-1/ |  |
| STAT251 | Canvas | https://canvas.ubc.ca/courses/193293 | . |
| STAT251 | WeBWorK | https://webwork.elearning.ubc.ca/webwork2/2026W1_V_STAT_V_251_101_2026W1 | WeBWorK;\bWW ?\d |
| STAT251 | Pre-lab quizzes | https://canvas.ubc.ca/courses/193293/quizzes | Pre-lab;Prelab |
| STAT251 | Course notes (Canvas files) | https://canvas.ubc.ca/courses/193293/files |  |
| STAT251 | Gradescope | https://www.gradescope.com/ | Written Assignment;\bWA ?\d |
| STAT251 | Piazza | https://piazza.com/class/mtnhr8ecx7c3po | Piazza |
| CPSC310 | Course site | https://ubccpsc.github.io/310/26w1/ | . |
| CPSC310 | Schedule (slides live here) | https://ubccpsc.github.io/310/26w1/schedule | CPSC ?310 lec |
| CPSC310 | Reader (textbook) | https://ubccpsc.github.io/310/textbook/ | Pre-lecture;CPSC ?310 lec |
| CPSC310 | Syllabus | https://ubccpsc.github.io/310/26w1/syllabus |  |
| CPSC310 | Project overview (InsightUBC) | https://ubccpsc.github.io/310/26w1/project/ | \bD\d\b;Deliverable |
| CPSC310 | InsightUBC REST API spec (openapi) | https://ubccpsc.github.io/310/26w1/project/spec.html | \bD\d\b;Deliverable |
| CPSC310 | D1 spec | https://ubccpsc.github.io/310/26w1/project/d1-drop-in-a-feature | \bD1\b |
| CPSC310 | PrairieLearn | https://us.prairielearn.com/pl/course_instance/231184 | \bLAB ?\d;CPSC ?310 lab;\bD\d\b;Deliverable |
| CPSC310 | GitHub: my project repo (solo_mhe28) | https://github.students.cs.ubc.ca/CPSC310-2026W-T1/solo_mhe28 | \bD\d\b;Deliverable;project |
| CPSC310 | Piazza | https://piazza.com/class/mtkmphcadpx5k6 |  |
| CPSC310 | iClicker (sec 103) | https://join.iclicker.com/NBOE |  |
| PHIL385 | Canvas | https://canvas.ubc.ca/courses/192607 | . |
| PHIL385 | Readings (Canvas files) | https://canvas.ubc.ca/courses/192607/files | ^Read\b;reading |
| PHIL385 | Ask Kraal questions | https://matthlh.github.io/school-3-1/#/courses/PHIL385/04-ask-kraal.md | Kraal |
| ASIA250 | Canvas modules | https://canvas.ubc.ca/courses/193131/modules | . |
| ASIA250 | Harvey textbook PDF | https://canvas.ubc.ca/courses/193131/files/47240885 |  |
| ASIA250 | Gale eBooks (paper sources) | https://go.gale.com/ps/displayAllBooksForSubject?subject=Religion&userGroupName=ubcolumbia&inPS=true&prodId=GVRL | final paper;sources |

## Reference (for Claude)

- The notes site reads the first three columns. The fourth column is for `things_plan.py`.
- `things_plan.py` appends a row's link to a to-do's notes when the to-do's title matches the last column.
- The match is a case-insensitive regular expression.
- Alternatives are separated with `;`, because `|` is the table separator.
- A `.` in the last column means every to-do in that course's Things project.
- A blank last column means the link is never attached to a to-do.
- Rows with the course `ALL` show on the Links page under Everywhere, not on course pages.
- This file is the only place links live. Edit it and nothing else.
