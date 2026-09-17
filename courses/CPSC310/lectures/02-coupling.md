# CPSC 310 — Lec 2 (Tue Sep 15) — Coupling

## Your notes
Might be easier to just look at the slides for coupling. Did some practice on the lec github practice repo.

## Clarifications (from the posted slides, `lectures/02a-coupling.pdf`, and the reader)
- **Reader for this lecture:** [Change Difficulty](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/change-difficulty/), not "Cost of Change" — the schedule's title for week 2 is "Coupling · Cohesion & Refactoring", and this deck's content (coupling axes, connascence) matches Change Difficulty's coupling section, not the magnitude/footprint material in Cost of Change.
- **Coupling is measured on three axes (slide 8):**
  - Degree: how many components a dependency touches.
  - Locality: how far apart the dependent components are.
  - Strength: how much effort it takes to change the dependency, also called connascence.
- **Dependencies are explicit or implicit (slide 4).** Explicit: the compiler can see it (an import, a type). Implicit: only visible at runtime, so you have to manually locate every instance. Implicit is the dangerous one because nothing catches a missed spot.
- **Connascence has five types, in increasing order of cost to change (slide 13, reader):**
  - Name: what something is called (`findUserById`). Renaming it means every call site must follow. Cheap in practice because a compiler or an IDE's rename tool catches every site.
  - Type: the shape of the data. Adding a required field to a type means every caller must supply it.
  - Value: a shared literal, like the string `"pending"` hardcoded in validation, reporting, and UI code. Nothing type-checks this — rename it to `"in-review"` in only two of three spots and the system runs, just wrong. Magic numbers are the numeric case of this.
  - Position: argument order, like `createInvoice(customerId, startDate, endDate, total, tax)`. A caller that swaps `total` and `tax` still compiles and may still pass tests, then computes the wrong number silently.
  - Algorithm: two components must do the same computation the same way, e.g. one class encodes data and another must decode it with the matching algorithm — no shared name, type, or literal ties them together at all.
  - The ordering is about how much the language tooling can catch for you. Name and Type get compiler/IDE help. Value, Position, and Algorithm don't, so they're where bugs hide.
- **Coupling can't be eliminated, only loosened (slide 11, reader "Addressing Coupling").** Any real system needs some. The three levers are the three axes: cut the number of interfaces (Degree), keep dependent pieces close (Locality), or weaken the connascence type a dependency relies on (Strength) — e.g. turning a Position dependency into a Type dependency by passing a named options object instead of five positional arguments.
- **This connects to lecture 1's "footprint."** The risk from coupling is the same risk as a large footprint: missing part of it. Implicit coupling is worse than explicit for the same reason an unclear footprint is worse than a clear one — nothing forces you to find every affected spot.
- Practice repo: [ubccpsc310/lecture_code](https://github.com/ubccpsc310/lecture_code), used for the FEAT-0000/FEAT-0001 exercises on slides 3 and 5. Not pulled into this repo; it's UBC's practice code, not something to archive here.

Questions: 8 in [02-questions.md](../02-questions.md) under "Lec 2". Ledger: 1 new topic, due Sep 17.
