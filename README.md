# School 3-1 — UBC, Sep–Dec 2026

A retrieval-practice system for five (maybe four) courses, built so Claude can keep up with
each course and quiz you on it.

## Read these
- **`PREP.md`** — what to do in the next two days, weekly, and before an exam. Start here.
- **`STUDY-SYSTEM.md`** — the process and why it's shaped this way.
- **`research/course-intel.md`** — grade history and past-student intel per course.
- **`inbox/WHAT-TO-PASTE.md`** — what to send me.
- **`ledger.md`** — what's due for review, and every hard date this term.
- `CLAUDE.md` — my operating rules. You don't need to read it; I do.

## Courses
| Dir | Course | Shape |
|---|---|---|
| `courses/STAT251/` | Introductory Probability and Statistics | 33% free marks, 67% exams |
| `courses/CPSC310/` | Intro to Software Engineering | 65% exams, 20% project |
| `courses/ASIA250/` | Introduction to Buddhism (online, async) | 104% available; 47% final paper |
| `courses/PHIL385/` | Existentialism (Kierkegaard) | 100% exams; 45% is MC |

PHIL 321 was dropped on 2026-09-08; its folder is in `archive/PHIL321-dropped/`.

Each course holds `00-syllabus.md`, `01-topics.md` (retrieval ledger), `02-questions.md`
(the quiz bank), `03-logistics.md` (office hours, links, tools, dates — the one-time reference the
morning brief never repeats), and `lectures/`.

## Commands
| Say | I do |
|---|---|
| `log CPSC310 lec 7` | file your notes, extract questions, schedule them |
| `quiz me` | interleaved retrieval across everything due, weighted to what you've missed and to the nearest exam (`/quiz-me`) |
| `quiz me on STAT251` | scoped to one course; `quick quiz` = 5 questions |
| `1 O 2 ~ 3 X` | grades for the transit deck (or any session), pasted from your phone — the ledger updates |
| `what's due?` | read the ledger, list due/overdue topics |
| `how am I doing` | weakest topics, what needs more questions, exam countdown |
| `/morning-check` / `what's new` | sweep Things3, Canvas (+grades), PrairieLearn, Piazza, Gmail; rebuild today's Things3 plan; brief |
| `plan my day` | just the Things3 rebuild: fit today into 6 h by priority, roll the rest to tomorrow (`things_plan.py`) |
| `week ahead` | Sunday view: every hard date in the next 14 days, unlogged lectures, is the Saturday flex block needed |
| `plan my week` | place next week's work on days by deadline and rhythm, keep hand-set days that fit, flag over-budget days (`things_plan.py --week`; runs itself on Sundays) |
| `term status` | unlogged lectures + exam countdown (`scripts/term.py`) |
| `mock exam CPSC310` | full timed practice exam from your bank |
| `gap check PHIL385` | syllabus topics with no notes against them |
