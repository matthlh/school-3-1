# CPSC 310 — Lec 7 (Thu Oct 1) — Test robustness

Deck: [04b-test-robustness.pdf](https://ubccpsc.github.io/310/26w1/lectures/04b-test-robustness.pdf). Reader: [Blackbox Testing](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/blackbox/) for partitioning and [Glassbox Testing](https://ubccpsc.github.io/310/textbook/8-unplaced/testing/glassbox/) for coverage; the opening recap comes from [Testability & Test Doubles](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/testability/) and [Design Principles](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/principles/). Questions: 10 in [the bank](../02-questions.md) under "Lec 7".

## Learning goals
- Design stubs and spies that stand in for real dependencies, to control what the code under test receives and to observe what it sends.
- Apply the Liskov substitution principle to decide whether a test double is a valid substitute.
- Build a comprehensive test suite systematically with equivalence class partitioning.
- Judge the strength of a test suite with coverage.

## Slides, organized
### Recap: test doubles, DIP and LSP (slides 3–10)
- Lecture 6 (Tue Sep 29, deck 04a) owns this material in full. The slides below are the recap this deck opened with.
- Tests are hard to write when the code under test is uncontrollable (a bank, a clock), unobservable (you cannot see what was sent), or unsafe or slow (real money, the network).
- A **test double** stands in for a dependency that the code under test uses. A **stub** controls what the dependency gives back, like the approving and declining card readers. A **spy** records what the code under test sent to it, like the recording reader.
- The **dependency inversion principle** (DIP) is what makes doubles possible: "depend upon abstractions, do not depend upon implementations." `buyCoffee` depends on an `IReader` interface. The real reader implements it, and so does the `testReader` in the test code.
- The **Liskov substitution principle** (LSP) is the rule for whether a double is a valid stand-in. Liskov and Wing's 1994 wording: if a property is provable about objects of type T, it should hold for objects of any subtype S of T. The plain version: a subclass must not break the expectations set by its superclass.
- The Bird example. `Bird.flyFromHeight(height)` works for all heights, and so does `Seagull`. `Penguin` only works for heights under 50 cm. `GoodPerson.freeBird(b)` calls `b.flyFromHeight(100)`, so handing it a Penguin breaks it. Penguin is not a valid substitute for Bird.
- The **LSP methods rule**. A subclass must not strengthen preconditions for the same inputs, although it may widen them. It must not weaken postconditions for the same inputs, although it may narrow them.
  - Penguin's "heights under 50 cm only" is a stronger precondition. "Penguin perishes" is an additional effect the superclass never promised.
  - The Resize example: the superclass lets you set one dimension. A subclass where changing the width also changes the height has widened the postcondition, which is the bad direction.
- The recap slide puts the four points together. Depend on an interface and pass the dependency in (DIP). Doubles stand in for it: stubs control what comes back, spies record what goes out. A double has to keep the interface's contract, not just its shape (LSP). The cost is another layer, doubles can drift from the real thing and need updating when the interface changes, and the real implementation still needs tests of its own.

### What makes a test suite strong (slides 11–13)
- A strong test suite is one that fails when the implementation is wrong. The deck lists four properties.
  - The right inputs: every behaviour in the spec has a test. Equivalence classes and boundary values get you there.
  - Precise checks: each test would notice a wrong answer. That means assertions that verify what the spec guarantees.
  - Reliable results: the same result every run. That means deterministic code, or test doubles for the parts that are not.
  - Coverage of most of the behaviour in the code.
- Slide 13 gives the build order as six steps.
  1. Get the requirements.
  2. Turn them into stubs with specifications.
  3. Write behavioural tests that check the specifications.
  4. Implement until all behavioural tests pass.
  5. Check how good the suite is for this specific implementation: check coverage, and optionally check mutants.
  6. Write structural tests to exercise the full codebase.
- The rule printed beside the steps: spec tests only test what is in the spec. Tests that follow the shape of the code come last, after the implementation exists.

### Equivalence class partitioning (slides 14–16)
- The problem: `getLetterGrade()` accepts any number, and you cannot test them all. Which values do you pick?
- **Equivalence class partitioning** (ECP) splits the inputs into classes that the spec treats the same way, then tests one value per class. If 72 gets "B", 71 probably does too.
- It works from the spec, not the code, so it is a **black-box** technique. The deck's claim for it: ECP finds the cases you missed, and shows which tests are repeats.
- An **equivalence class** is a set of values the spec treats the same way. The deck derives them from two directions.
  - The input domain starts from the parameter types in the signature. It is narrowed by the preconditions, because excluded values are not tested. It is then split into valid and invalid classes, where invalid means rejected by the spec.
  - The output range starts from the return type plus any documented errors. It is split by the postconditions, by what each input should produce, and then into normal and error classes. Errors count as promised outputs.

### The worked example, getLetterGrade (slides 17–25)
- The spec: A is 80 to 100, B is 68 to 79, C is 55 to 67, D is 50 to 54, F is 0 to 49. A valid grade is 0 to 100. The function throws `RangeError` below 0 or above 100.
- Input side. One valid class, 0 ≤ grade ≤ 100. Two invalid classes, grade < 0 and grade > 100. Values like the string "80", `undefined`, `null` and `[]` are not tested, because they are outside the parameter type `number`.
- Output side. Five normal classes, "A" to "F". One error class, `RangeError`.
- That is 9 classes in total: 1 valid input, 2 invalid input, 5 normal output, 1 error output.
- Choose values so every class from both views has at least one. A single value can cover an input class and an output class at the same time: 72 covers "valid" and "B". The deck's picks: −10, 25, 52, 60, 72, 90, 110.
- Then add the boundaries. Bugs cluster at the edges of partitions, such as `>=` written as `>`, or A starting at 81 instead of 80. Test the value on each side of every edge.

| Edge | Last value on one side | First value on the other |
|---|---|---|
| invalid / F | −1 throws RangeError | 0 is "F" |
| F / D | 49 is "F" | 50 is "D" |
| D / C | 54 is "D" | 55 is "C" |
| C / B | 67 is "C" | 68 is "B" |
| B / A | 79 is "B" | 80 is "A" |
| A / invalid | 100 is "A" | 101 throws RangeError |

### Why partition both inputs and outputs (slide 26)
- For `getLetterGrade` the two views agree, because each letter comes from one range of inputs. They diverge when an output depends on a combination of inputs.
- Input partitioning finds values the code might mishandle: invalid, empty, extreme. In `computeGPA`, a 1-credit course and a 4-credit course both give 3.0, so the input view is what makes you try both.
- Output partitioning finds behaviours that no single input points to. In `computeGPA`, asking "can the grade go over 100?" leads to points greater than maxPoints, which is the case that throws.

### Coverage (slides 27–30)
- **Coverage** answers one question: how much of the code did the tests execute?
  - **Line coverage**: did the tests hit each executable line?
  - **Statement coverage**: did they run each statement?
  - **Branch coverage**: did they take each outcome of each decision?
- The deck calls it an essential tool for discovering untested structural behaviour, then lists what it cannot do. Coverage measures where the tests went, not what they validated.
  - It does not check correctness.
  - It can be fooled by tests without assertions.
  - It does not consider the input space.
  - Artificial thresholds can be gamed.
- The rule for using it: use coverage to find what the tests missed, then decide whether more tests are needed.
- Closing recap. ECP tells you what to test to cover the specification. Coverage tells you what code the tests executed. Use both to build a strong suite.

## Clarifications
- The reader's Blackbox chapter names four approaches: **boundary value analysis** (inputs at the boundary of a domain are more likely to be problematic), **equivalence class partitioning**, **state transition testing** and **user acceptance testing**. The deck covers the first two and folds boundary analysis into the ECP walk-through. The reader also gives the main reason to work from the spec: it avoids the confirmation bias of writing tests for code you authored.
- The reader's caveat on ECP: if the specification is incomplete, or the implementation deviates from it, the inputs chosen by partitioning can miss important cases. The deck's "spec tests only test what is in the spec" is the same point from the other side.
- The reader's Glassbox chapter adds a fourth metric, **path coverage**: every combination of conditional outcomes. Its worked example is a function with two independent conditionals and one test, `eval(0, false, false)`. That test gives 67% line and statement coverage, 50% branch coverage and 25% path coverage. Reaching 100% takes one test for line, two for branch and four for path.
- The reader says statement coverage is slightly stronger than line coverage because every statement on a line must run, not just the line. The deck lists them as separate metrics without saying why.
- The reader's version of the deck's limits: coverage shows the suite executes the code, not that the code is correct, and "specifying and checking assertions of correctness on code is often harder than deriving the inputs required to cover it." That is why defects turn up in well-covered code. Coverage earns its place because it is cheap to compute and actionable.
- "Check mutants" on slide 13 is **mutation testing**: deliberately break the code in small ways and see whether the suite notices. The reader has a chapter on it; it was not taught here.
- The 9-class count on slide 23 is the sum across both views. Do not expect the number of test values to equal the number of classes, because one value can sit in one input class and one output class at once. The deck's seven values plus the twelve boundary values cover all nine.
