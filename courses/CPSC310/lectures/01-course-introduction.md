# CPSC 310 — Lec 1 (Thu Sep 10) — Course introduction

Deck: [01-course_introduction.pdf](https://ubccpsc.github.io/310/26w1/lectures/01-course_introduction.pdf). Reader: [What is Software Engineering](https://ubccpsc.github.io/310/textbook/0-introduction/), [Analytical Code Design (intro)](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/). Questions: 13 in [the bank](../02-questions.md) under "Lec 1".

## Learning goals
- Explain how the way a codebase is structured decides how much a change to it costs.
- Use abstraction to make change cheaper, first inside one codebase and then at larger and larger scales.
- Draw requirements out of people, break them down, refine them, and write specifications precise enough to be checked.
- Weigh the socio-technical trade-offs in how a team builds software together.

## Slides, organized
### What software engineering is (slides 1–8)
- Slide 1 lists four items for the day: what software engineering is, how to succeed in the course, the project design, and important notes. Only the first is content; the rest is housekeeping.
- Slides 3 and 5 both carry the textbook definition, attributed to Jean-Michel Hoc and Anh Nguyen-Xuan: "The process of transforming a mental plan of desired actions for a computer into a representation that can be understood by the computer."
- The deck reads that definition at two scales. The **210-centric view** (slides 3–4) is a straight pipe from requirements to code. The code is small, there is a single version, one person writes it, and there is one prompt.
- The **310-centric view** (slides 5–6) keeps the same pipe but changes everything around it. The codebase is large, it goes through many versions, many people work on it at once, and the requirements change while it is being built. The deck labels this view **socio-technical**.
- Slide 7 widens the picture one more step. Software engineering also covers getting from an idea to requirements, not only from requirements to code. Deciding what to build is part of the job.
- Slide 8 gives the course's own definition, which every later unit repeats at a larger radius: "Software engineering is the discipline of managing what a change costs as a system keeps growing." The load-bearing word is cost.
- What this means on an exam: when a design or a code fragment is put in front of you, the question is never whether it works today. It is what the next change would cost, where that cost comes from, and which lever would lower it.
- The reader's fuller definition (What is Software Engineering) says the field applies scientific, economic, social and practical knowledge to **specify, invent, design, build, validate, deploy, maintain, research, and improve** software. The aim is software that is **correct, reliable, and works efficiently on real machines**. Programming is only the **build** step, one of nine.
- The reader's Analytical Code Design introduction draws the line the course sits on. **Code** is short, isolated, and run once, like a script or an assignment. **Software** is large, highly connected to other software, and longstanding. Because software will be changed many times by many people, it has to be easy to evolve, easy to maintain, and easy to test, and a design choice is judged by what it does to those three properties.
- The word **analytical** means that two solutions to the same problem are compared by measurable **trade-offs**, not by taste. The reader previews four areas that do this: **cost of change** (why it matters and how to measure it), **change difficulty in code** (which parts of a codebase make change expensive), **refactoring** (how to improve code without changing what it does), and **testability** (writing code that is straightforward to test).

### How AI shifts what an engineer must know (slides 9–11)
- The three slides are one diagram drawn three times, each adding a layer. In every version users or customers and the technical team exchange needs and feedback; that loop never goes away.
- Slide 9 is **traditional development practice**, labelled previous practice. The technical team turns requirements into source code by hand. Under this practice the essential engineering skill is reading and writing source code.
- Slide 10 adds **vibe coding** at the far end of an axis labelled increasing abstraction. An AI agent takes natural-language requirements plus the existing system and hands back an executable feature. The whole of the source code is abstracted away. The diagram leaves two things as open questions: how the feature is validated (the arrow is marked "validation?"), and what engineers now need to know (marked with question marks).
- Slide 11 fills in the middle of the axis with **source code assistance**, labelled current practice. An AI agent takes natural-language requirements plus code and produces source code. Vibe coding sits one step further out, unlabelled, with its validation question still open.
- The punchline on slide 11: as abstraction rises, what engineers need to know moves from writing code to **requirements, design, and validation** of code.
- What this means on an exam: an answer that only describes what the code does is answering the cheap part. The marks are in judging whether the requirement is right, whether the decomposition is right, and what evidence shows it works.

### The three fluencies (slide 12)
- The slide credits the three fluencies to Reid Holmes, 2026.
  - **Decomposition fluency** is knowing how to break a problem into parts, and being able to judge critically how someone else broke theirs apart.
  - **Requirements fluency** is being able to trace a design or implementation decision back to the requirement behind it, and a requirement forward to where it lands in the code.
  - **Validation fluency** is confirming that the implementation matches its design today, and that it will keep affording change as needs move.
- How to use them on an unseen design: ask which pieces exist and why (decomposition), which requirement each piece serves (requirements), and how you would show it works and stays changeable (validation).

### Critical thinking and accountability (slide 13)
- Slide 13 is a quotation from Holmes (2026). Its point: if software engineering is the "accountable stewardship" of systems people rely on, then the core professional skill was never typing code. It is the judgment to tell whether a decision or implementation is right, and the ability to say why.
- GenAI can generate code. People have to keep agency over, and accountability for, the systems that shape society.
- What this means on an exam: the questions ask what is wrong, what you would change, and why. The "why" is the skill being tested. Never call a design bad without naming the cost it imposes.

### Semester roadmap (slide 15)
- The slide is headed Semester Roadmap, with the lead-in "cost of change at bigger radii". It is the slide 8 definition asked three times, each at a larger scale.

| Scale | Weeks | The question |
|---|---|---|
| Inside a codebase you own | 2–5 | Why does the same change cost a lot in one place and little in another? |
| At its boundaries | 6–7 | Where should a boundary go, and what happens once you have published it? |
| Across a system and a team | 8–13 | How can many people change one codebase without breaking each other's work? |

- The radius tells you which question is being asked. Weeks 2 to 5 are about the inside of one codebase, which is where the reader's Analytical Code Design chapters sit.

### Housekeeping (slides 16–23)
- How to succeed, the grade breakdown, the GenAI warning, the project, getting help, office hours and labs are housekeeping. They live in [03-logistics.md](../03-logistics.md) and [00-syllabus.md](../00-syllabus.md).
- One line from slides 18 and 19 is about format, not housekeeping: labs, deliverables, the midterm and the final all ask you to identify and articulate trade-offs, implement changes, and reflect on the process and the results.

## In class
- No notes were taken in class; Matt's recollection on 2026-09-11 is the only record. An in-class exercise had students build a "monster" that met several requirements, then take on new and changed requirements. It is not on the deck. It staged the course thesis: requirements move, so the cost of change is the thing being managed.

## Clarifications
- The deck has no lecture-level Learning Goals slide. The Learning goals section above carries the four course learning objectives from slide 14 instead.
- Titles differ. The PDF is named course_introduction and its slides are headed "Introduction to Software Engineering"; the syllabus schedule lists Sep 10 as "The cost of change". They are the same lecture.
- Three definitions of software engineering are in play and all are exam vocabulary: the Hoc and Nguyen-Xuan quotation (slides 3 and 5, also in the reader), the deck's cost-of-change one-liner (slide 8), and the reader's nine-activity definition.
- The deck credits the three fluencies to Reid Holmes, 2026 (slide 12). The reader's introduction chapter, as fetched, does not restate them, so cite slide 12 as the source.

## Your notes
Talked about housekeeping stuff: worked on making a monster that can do multiple requirements, that
needed to accommodate new reqs and change reqs. Synonymous to real SWE work where clients make
changes all the time. Don't think this is particularly helpful as my internship work was just this in
a nutshell.
