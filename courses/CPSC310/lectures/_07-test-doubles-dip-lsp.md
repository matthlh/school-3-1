# CPSC 310 — Lec 7 (Thu Oct 1) — Test doubles, DIP and LSP — outline, pulled before class

Staged on Sat Sep 26 from the reader chapters [Testability](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/testability/) and [Design Principles](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/principles/). The deck is not posted yet. The Testability chapter is outlined in `_06-testability.md` and the full SOLID set in `_05-testability.md`, so this file keeps to the three ideas in the title.

## What the chapter claims
- A **test double** is a developer-written stand-in for a complex dependency. It takes known inputs and returns known values, so the test controls exactly what the code under test sees.
- Test doubles make tests faster, remove non-determinism, and let a test reach states that are hard to produce for real, such as a remote service timing out.
- A double is only usable if the code under test lets you pass it in. That is a controllability question, and the usual fix is dependency inversion.
- The **dependency inversion principle** says classes should depend on abstractions, not implementations.
- In practice you put an interface between two concrete classes and make both depend on the interface. Reusing one class then means reusing only the interface, not the other class and all of its dependencies.
- Refactoring for extensibility usually goes the same way: introduce a new interface and make the existing code implement it.
- The **Liskov substitution principle** says any object can be swapped for any other object with the same parent type.
- A test double is itself a substitution. If the double does not honour the contract of the type it replaces, the test passes against behaviour the real object never has.
- The **interface segregation principle** says clients should not be forced to depend on interfaces they do not use. Small interfaces also make doubles smaller to write.

## Three pre-lecture questions
1. A `ReportService` constructs its own `HttpClient` inside its constructor. Rewrite its signature so a test can hand it a double, and name the principle you applied.
2. A fake `Clock` for tests always returns the same time, but the real `Clock` never goes backwards. Which principle does a fake that returns earlier times break, and what goes wrong in the test?
3. Why does the reader say an isolateable unit is useless for testing if it is not also controllable?
