# CPSC 310 — Lec 6 (Tue Sep 29) — Test doubles and dependency inversion — outline, pulled before class

Staged on Fri Sep 25 from the reader chapters [Testability](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/testability/) and [Design Principles](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/principles/). The deck is not posted yet. The lecture asks how to test something you did not construct. Design Principles was already outlined in `_05-testability.md`, so this file covers the Testability chapter.

## What the chapter claims
- **Testability** is a quality attribute that does not change what the system does. It changes how easily the system can be tested.
- A test has to execute the code, trigger a defect, and carry the wrong result to a point where it can be checked. Four properties follow: **controllability**, **observability**, **isolateability** and **automatability**.
- Code usually needs restructuring for testability when a unit has more than one responsibility or a feature is scattered across the codebase. Test-driven development avoids this by writing the tests first.
- Controllability means a test can drive the code under test programmatically. The most common fix is to add parameters to methods or constructors, so dependencies can be swapped and fuller inputs passed in. Logic fused to the UI forces slow, fragile UI tests.
- Observability means the test can see the outcome. A method that mutates an inaccessible object and returns nothing is not observable; returning the data to the caller fixes it. Deciding what the correct output even is often fails because the specification is vague or contradictory.
- Isolateability is controllability plus observability: the ability to locate a fault inside the code under test. Splitting large functions into small self-contained ones helps.
- When a dependency is complex, it is replaced in the test by a developer-written fake that takes known inputs and returns known values. The reader's example is a MockLoginRejectController whose login always returns false. Fakes also make tests faster, remove non-determinism, and let a test reach states that are hard to trigger for real, such as a remote service timing out.
- The properties only work together. An isolated unit that cannot be controlled, usually because its dependencies cannot be passed in through dependency inversion, is useless for testing. Automatability is the least discussed, because it mostly follows from controllability.

## Three pre-lecture questions
1. Name the four testability properties and say which pair the reader calls most important, and why isolation alone is not enough.
2. A method writes its result into a private field of another object and returns void. Which property does it fail, and what is the reader's fix?
3. A class builds its own database connection inside its constructor. Which property does that break, how does dependency inversion repair it, and what would you pass in during a test?
