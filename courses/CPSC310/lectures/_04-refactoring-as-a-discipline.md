# CPSC 310 — Lecture 4 pre-read: Refactoring as a discipline (Tue Sep 22)

Pulled 2026-09-11 from the reader chapter *Refactoring*
(https://ubccpsc.github.io/310/textbook/2-analytical-code-design/refactoring/). The deck was not
posted yet.

## What the chapter claims
- Refactoring is improving the implementation of an existing design by restructuring the source code, so that existing shortcomings go away and future development gets easier.
- A refactoring does not change the program's semantics. It adds no feature and fixes no defect. Most refactorings consolidate duplicate code, reduce coupling, move elements so they are more cohesive, or make the system easier to understand and maintain.
- Refactoring is how a team handles **emergent design**: as the system evolves you learn which abstractions fit, and refactoring folds them in.
- **Technical debt** is the metaphor teams use. Quick solutions are often right, but they accrue debt in maintainability by degrading or hiding the original design. The metaphor says to think long-range about system health while still allowing the quick path when the future risk is worth it.
- Three situations usually trigger the thought "we should refactor".
  - Adding a new feature is much harder than expected.
  - Fixing a bug that should be cohesive needs changes scattered across the system.
  - A code review of a simple feature or fix shows complex changes that are hard to understand.
- The **rule of three** prevents premature refactoring. The first time, do it the simplest way. The second time, do it again and note the duplicate. The third time, refactor. The reader calls this just-in-time abstraction: pre-emptive refactoring can make a system harder to understand even if it is easier to extend.
- Refactoring is risky. From the customer's side it is all risk and no reward, because only the developers benefit directly. Effective testing is what makes it safe. The process has four steps.
  1. Identify the property of the code to improve and the transformations that will do it.
  2. Run the test suite so you know the system works before the change (saving the output can help).
  3. Perform the refactoring.
  4. Run the full test suite again and confirm the system behaves exactly as before.
- Downsides beyond customer risk: refactorings disrupt other developers' mental models of the system and can add abstraction layers; they cost developer time that could build features; and it is easy to get carried away into a refactoring campaign much larger than needed (the reader compares this to the second-system effect).
- The common refactorings, from Martin Fowler's catalogue: rename (class, field, method); move (class, field, method); extract class, interface or method; push down or pull up a field or method; replace a magic number or string with a constant; replace inheritance with delegation.
- Example 1, cohesion: `Invoice.printOwing()` both printed a banner and computed the amount owing. The two were linked by logic (they happen together) and timing (banner first), but the calculation only owes cohesion to printing the amount, not to the banner. Extracting a private `getOwing()` method improved cohesion.
- Example 2, coupling: `RoomsParser` and `CourseProcessor` had similar structure and complicated their clients. Three refactorings, extract interface `IParser`, add a return type, and rename to `CourseParser`, left clients bound to the `IParser` type only. That is a connascence of Type instead of a bond to each parser's code, so the coupling got looser.
- Every refactor is motivated by, and changes, cohesion, coupling, or both.

## Three pre-lecture questions
1. Define refactoring and say what it must never change. Name the three situations the technical-debt metaphor treats as triggers.
2. State the rule of three and what it protects against. List the four steps of the refactoring process and explain why the test suite runs twice.
3. In the Invoice example, which two cohesion types linked the banner code to the owing calculation, and why did extracting `getOwing()` improve cohesion? In the parser example, what kind of connascence do clients have afterwards, and why is that looser than before?
