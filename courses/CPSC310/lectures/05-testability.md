# CPSC 310 — Lec 5 (Thu Sep 24) — Testability

Deck: [03b-testability.pdf](https://ubccpsc.github.io/310/26w1/lectures/03b-testability.pdf). Reader: [Testability](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/testability/), with the contract material from [Design Principles](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/principles/). Questions: 10 in [the bank](../02-questions.md) under "Lec 5".

## Learning goals
- Use the two testability axes, controllability and observability, to analyse a piece of code and to improve it.

## Slides, organized
### Controllability (slide 3)
- **Controllability** is how far a test can set the inputs and the state that the code under test depends on.
- The deck lists four things that lower it.
  - Hidden inputs, such as the clock or randomness.
  - Global or shared state.
  - Hard-wired dependencies, such as an object the code constructs for itself.
  - Preconditions that are hard to set up.
- The reader's version: tests run the code, so code that cannot be driven programmatically cannot have an automated test. The most common fix is to add parameters to methods or constructors, so dependencies can be swapped and fuller inputs passed in.
- The reader's cautionary case is logic fused to the user interface, which leaves only slow, fragile UI tests as a way to check it.

### Observability (slide 4)
- **Observability** is how far a test can inspect the results and effects that the code under test produces.
- The deck lists four things that lower it.
  - Results that are only printed or formatted.
  - Intermediate values that are never returned.
  - Private state that is never exposed.
  - Effects on external systems.
- The reader's example is a method that mutates some object the test cannot reach and returns nothing. The usual fix is to return the data to the caller instead of passing it further down a call chain.
- The reader adds a less obvious problem: deciding what the correct output is. Vague, incomplete or contradictory specifications are where "that's not a bug, it's a feature" comes from.

### Exposing state for a test (slides 5–6)
- The example is an `Animal` class with two private fields, `hungry` (starts true) and `eaten` (starts at 0), and an `eat()` method that sets `hungry` to false, increments `eaten` and returns it.
- The method has a CPSC 210-style specification. REQUIRES says the animal must be hungry. EFFECTS says that afterwards the animal has eaten more than before and is no longer hungry.
- Slide 6 writes the test as a black box first, in Given, When, Then form.
  - Given: a new animal, which is hungry and has eaten nothing.
  - When: it eats.
  - Then: it is not hungry and has eaten more than zero.
- The test cannot be written against the class as it stands, because `hungry` is private and nothing reports it. The deck adds `isHungry()` and `amountEaten()` to the public interface so the test can check both halves of the EFFECTS clause.
- The lesson: writing the test from the specification first shows exactly which parts of the state the class has to make observable.
- The EFFECTS clause is rewritten on slide 6 to begin "for a hungry animal only". That restates the precondition inside the effect, so the test starts by confirming the animal is hungry before calling `eat()`.

### Test-driven development (slide 7)
- **Test-driven development** (TDD) runs a three-step cycle: write a failing test, make the test pass, then refactor.
- The deck pairs the cycle with three ideas under the heading testability by design: know what you are building, let the details come from building it, and make the next change cheap.
- The reader's point is that writing the tests first forces the code into a testable structure from the start, so it never needs the restructuring that untestable code does later.

### Recap (slide 8)
- Code is testable when a test can both drive it and check it.
- Controllability asks whether a test can choose everything the behaviour depends on. It is lowered by inputs the code finds for itself instead of being given, and raised by taking inputs as parameters.
- Observability asks whether a test can see everything the behaviour produces. It is lowered by results the code sends somewhere instead of returning, and raised by returning results as values.

## Clarifications
- The deck uses two axes. The reader's Testability chapter uses four properties: controllability, observability, **isolateability** and **automatability**.
  - Isolateability is the ability to locate a fault inside the code under test. The reader says controllability and observability together give it, and that splitting large functions into small self-contained ones raises it.
  - Automatability is the least discussed, because it mostly follows from controllability.
  - The reader says observability and isolateability matter most, but that an isolated unit you cannot control is not useful, because you cannot trigger the behaviour you want to see.
  - Lecture 6 is also titled Testability, so isolateability and fakes may be the deck material there.
- The course site pairs this lecture with the Design Principles chapter and the question "when is it safe to substitute one thing for another?". Both are left over from before the Sep 23 reshuffle. That question is Liskov substitution, which is now lecture 7 (Test Doubles, DIP and LSP), and the chapter that matches this deck is Testability.
- The one part of Design Principles this deck does use is the method **contract**. The REQUIRES, MODIFIES and EFFECTS comment is a data abstraction that states **preconditions** (what the method expects), **postconditions** (what it provides) and **invariants** (what must always hold). The rest of that chapter (abstraction, decomposition, information hiding, SOLID) will be logged with lecture 7.
- The deck's own definitions say "the degree to which a test can determine" and "the degree to which a test can inspect". The reader phrases controllability as whether the code can be driven programmatically. Use the deck's wording on an exam and the reader's parameter fix as the remedy.
