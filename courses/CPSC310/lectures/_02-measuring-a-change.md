# CPSC 310 — Lecture 2 pre-read: Measuring a change (Tue Sep 15)

Pulled 2026-09-11 from the reader chapter *Cost of Change*
(https://ubccpsc.github.io/310/textbook/2-analytical-code-design/cost-of-change/). The deck was not
posted yet. Lecture question from the schedule: "How big was that change, and which dimension
actually hurts?"

## What the chapter claims
- Change in software happens constantly, not yearly or monthly. Teams may deploy by the minute, so the code has to be amenable to evolution.
- The cost of a change is measured on two dimensions.
  - **Magnitude** is how large the change is, usually in lines of code.
  - **Footprint** is how widespread the change is: how many methods, classes, files, modules or services it touches.
- Footprint is the better indicator of hard-to-evolve software. A 500-line change in one new file is cheaper than the same 500 lines spread over eight files, because a ninth file was probably missed and the next similar request means remembering every place again.
- **Conceptual drift** is the reader's name for a concept that is spread out across the codebase. A high-footprint change is the symptom.
- These costs are paid every time the code is updated, not once.
- **Code smells** are names for the shapes of commonly encountered costly changes. The chapter gives three.
  - **Divergent change**: one class keeps being changed in different ways for different reasons. It means the class represents more than one concept. The change is isolated to one class but the developer must comprehend or edit many parts of it, so the method footprint is high.
  - **Scattered change**: the opposite. One simple, coherent change requires edits across the whole system, because a concept is unnecessarily spread out, so the full footprint is paid on every edit.
  - **Feature envy**: a method sits in the wrong class. Violations of the **Law of Demeter** commonly signal it. The Law of Demeter says a component should have limited information about other components. A chain like `db.getResults().sort().print()` knows about `db` and about the return types of two further calls. Feature envy costs a high comprehension footprint even when the magnitude is small, because the developer hunts for the right place to edit. It can mean code is owned by the wrong class or that there is unnecessary abstraction.

## Three pre-lecture questions
1. Define magnitude and footprint. Which one better predicts hard-to-evolve code, and what is the reader's argument for that?
2. Divergent change versus scattered change: which is "one class, many reasons" and which is "one reason, many places"? What does each one say about how concepts map to classes?
3. State the Law of Demeter. Why does a violation of it point to the feature-envy smell, and why can feature envy be expensive even when the change is only a few lines?
