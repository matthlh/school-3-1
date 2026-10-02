# CPSC 310 — Lec 6 (Tue Sep 29) — Test doubles, DIP and LSP

Deck: [04a-test-doubles.pdf](https://ubccpsc.github.io/310/26w1/lectures/04a-test-doubles.pdf). Reader: [Testability & Test Doubles](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/testability/) and the DIP and LSP entries in [Design Principles](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/principles/). Questions: 10 in [the bank](../02-questions.md) under "Lec 6". Matt was not in class; this is the deck only.

## Learning goals
- Apply the dependency inversion principle so tests can replace dependencies in the code under test.
- Design stubs and spies that stand in for real dependencies, to control what the code under test receives and to observe what it sends.
- Apply the Liskov substitution principle to decide whether a test double is a valid substitute.
- Decide when a test double is worth its cost, and when to use the real dependency instead.

## Slides, organized
### Recall: the two axes (slide 3)
- **Controllability** is the degree to which a test can determine the inputs and state that the code under test depends on.
- **Observability** is the degree to which a test can inspect the results and effects that the code under test produces.

### What makes this code hard to test (slides 4–7)
- The example is `printStatus(offeringId)`. It looks up the offering, logs "no offering" and returns if it is missing, otherwise computes `daysLeft` from `Date.parse(SEASON[offering.season]) - Date.now()`.
- Observability problem: the only output is `console.log`, so there is no way to assert on it.
- Controllability problem: the function reads `Date.now()` itself, so there is no way to set the date.
- The deck generalises to three cases where tests are hard to write. The code under test is **uncontrollable** (a bank, a clock), **unobservable** (you cannot see what was sent), or **unsafe or slow** (real money, the network).

### Dependency inversion (slides 8–10)
- The **dependency inversion principle** (DIP): "depend upon abstractions, do not depend upon implementations."
- The picture has three parts. The code under test, `buyCoffee`, depends on an interface, `IReader`. The real implementation, `reader`, implements that interface. Step 1 is the dependency on the interface; step 2 is the implementation of it.
- That is what makes testing possible. The test code supplies its own implementation of `IReader`, called `testReader`, and `buyCoffee` cannot tell the difference. `testReader` is a **test double**.

### Test doubles and when to use one (slides 11–12)
- A test double stands in for a dependency that the code under test uses.
- A **stub** controls what the dependency gives back. The approving reader and the declining reader are two stubs for the two outcomes `IReader` can produce.
- A **spy** records what the code under test sent to it. The recording reader is a spy: the test reads back what `buyCoffee` tried to charge.
- Use a double when the real dependency is uncontrollable, unobservable, or unsafe or slow. Otherwise use the real thing. If the dependency is fast, deterministic and has no side effects, do not double it.

### Is compiling good enough? (slide 13)
- Any object with a `charge` method that returns a boolean compiles as an `IReader`. The deck's `FakeWorkingReader` throws on a negative amount and returns true for everything else.
- Three questions the slide asks. What does `IReader` guarantee `buyCoffee`, and where is that written down? Does this double keep that guarantee? When the declined test fails against this double, who is wrong, `buyCoffee` or the double?
- The point: the type system checks the shape of the double. It cannot check the contract. That is what the next principle is for.

### Liskov substitution (slides 14–16)
- The **Liskov substitution principle** (LSP), in Liskov and Wing's 1994 wording: if a property is provable about objects of type T, it should be true of objects of type S where S is a subtype of T.
- The plain version on slide 15: a subclass should not break the expectations set by its superclass.
- The Bird example. `Bird.flyFromHeight(height)` works for all heights, and so does `Seagull`. `Penguin.flyFromHeight` only works for heights under 50 cm. `GoodPerson.freeBird(b)` calls `b.flyFromHeight(100)` on any `Bird`, so passing a Penguin breaks code that was correct for every Bird. Penguin is not a valid substitute.
- The **LSP methods rule** on slide 16.
  - Precondition rule: preconditions should not be strengthened for the same inputs. Widening them is fine.
  - Postcondition rule: postconditions should not be weakened for the same inputs. Narrowing them is fine.
  - Penguin's "under 50 cm only" strengthens the precondition. "Penguin perishes" is an additional effect the superclass never promised.
  - The Resize example: the superclass lets you set one dimension at a time. A subclass where changing the width also changes the height has broken the postcondition, because callers were promised the other dimension stays put.
- Applied to doubles: a test double is a subtype of the interface, so LSP is the test for whether it is a valid stand-in. It must keep the interface's contract, not just its shape.

### Recap (slide 18)
- To test code that calls something, depend on an interface and pass the dependency in (DIP).
- Test doubles stand in for it. Stubs control what comes back, spies record what goes out.
- A double has to keep the interface's contract, not just its shape (LSP).
- The cost: another layer in the design; doubles can drift from the real thing and need updating when the interface changes; and the real implementation still needs tests of its own.

## Clarifications
- The reader names the same two kinds, with the same purpose. A stub "allows us to more easily supply the test with values," which is controllability. A spy "records the arguments provided to the method calls," which is observability. The reader's generic word for any developer-written substitute is **fake**. Mock appears only in its links, not as a defined term, so use stub and spy on an exam.
- The reader's example, `FakeLocator`, is both at once: it returns fixed values and appends every call to a `myCalls` array. One object can be a stub and a spy.
- The reader's reasons for doubles match the deck's three cases and add two benefits: doubles greatly increase performance and make components less prone to non-determinism, because the result is fixed instead of computed by something external. They also let a test reach states that are hard to trigger for real, such as a remote service timing out.
- The reader's one-line DIP is "classes should depend on abstractions, not implementations," and it says the principle is often applied during refactoring by introducing a new interface that existing code then implements. Its LSP line is "any object can be interchanged with any other object that has the same parent type," and it defers the rest to a video. The methods rule on slide 16 is the deck's addition, so learn it from the deck.
- Slide 16 labels the Penguin case "Bad: widened postcondition" in the text layer. The lecture 7 recap of the same slide says "Bad: stronger precondition," which is the right reading: "under 50 cm only" restricts the inputs the method accepts. "Penguin perishes" is the postcondition side, an extra effect.
- The lecture 7 deck opened with slides 3 to 10 of this material as a recap, so the two lecture files overlap on purpose. The bank questions for this lecture are under "Lec 6"; the ones that combine doubles with partitioning and coverage are under "Lec 7".
