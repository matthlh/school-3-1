# CPSC 310 — Lecture 3 pre-read: Cohesion and Refactoring (Thu Sep 17)

Pulled 2026-09-11 from the reader chapter *Change Difficulty*
(https://ubccpsc.github.io/310/textbook/2-analytical-code-design/change-difficulty/). The deck was
not posted yet. The course site renamed this lecture to *Cohesion & Refactoring* on 2026-09-17,
so the *Refactoring* chapter (pulled 2026-09-11) is folded in below.

## What the chapter claims
- Two axes explain what makes a change costly: **cohesion** and **coupling**.

### Cohesion
- Cohesion is how focused a program element is on performing a single complete task. The reader discusses it at the class level: how well the elements within a class belong together.
- Low-cohesion classes do many things, so they carry competing concerns. A fix for one defect can break behaviour that another feature relied on by design. The larger the class, the more likely this is.
- A cohesive class has a small set of private fields that most of its public methods use. Fields used by only a few public methods are a sign that those methods and that field do not belong.
- Cohesive classes are smaller, so a system has more of them. That makes the right class harder to find but each class much easier to understand and change.
- Cohesion is measured by two properties.
  - **Reasons**: how many concepts are present in a grouping of code.
  - **Type**: how a pair of concepts is related. The three types are **data** (line 2 uses a value from line 1), **logic** (two calls grouped under the same branch, such as `denyAccess()` and `raiseAlarm()`), and **timing** (`clearCanvas()` must run before `redrawCharacters()`).

### Coupling
- Coupling is the strength of the connections between program elements. Strong coupling hurts evolvability and maintainability for four reasons.
  - Errors in one part propagate to unrelated parts.
  - A single bug fix or feature is scattered across the codebase.
  - Tightly coupled code is hard to reuse independently.
  - A coupled element cannot be understood in isolation.
- Coupling between two groups of code is measured on three attributes.
  - **Degree**: how many connections there are.
  - **Locality**: how far apart the groups are.
  - **Strength**, called **connascence**: how strong the bonds are.
- Connascence names what two pieces of code must agree on. The reader lists five kinds.
  - **Name**: what something is called (a `userId` field renamed in one place and not the others still compiles but lookups fail).
  - **Type**: the shape of the data (callers all assume a four-field tuple; one side adds a field).
  - **Value**: a specific literal (the string `"pending"` hard-coded in validation, reporting and the UI).
  - **Position**: argument order (`createInvoice(customerId, startDate, endDate, total, tax)` with total and tax swapped still compiles).
  - **Algorithm**: a computation that must be done the same way everywhere (four modules each computing a discount slightly differently).
- Coupling is **explicit** (a method call, a class import) or **implicit** (a magic value used across the codebase, a duplicated algorithm). Implicit coupling is more dangerous because it is harder to tell whether a change has covered the whole coupled scope.

### Addressing coupling
- Every non-trivial system needs some coupling. The goal is to make it as loose as possible, not to remove it. There are three moves, one per attribute.
  - Minimise the number of interfaces between elements (Degree).
  - Minimise the distance between interfaces (Locality). If coupling crosses entirely different systems, extract the shared code into a common library.
  - Minimise the complexity of interfaces (Connascence). Moving from connascence of Algorithm to connascence of Type means coupled code only has to adhere to a type instead of reimplementing an algorithm, which makes each change cheaper.
- The chapter ends with a heading *Design Symptoms* that had no content when pulled.

## What the Refactoring chapter claims
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
1. Name the three attributes of coupling and the five kinds of connascence, saying for each kind what the two pieces of code must agree on.
2. Define refactoring and say what it must never change. State the rule of three, and say what it protects against.
3. List the four steps of the refactoring process and explain why the test suite runs twice. In the `Invoice.printOwing()` example, which two cohesion types linked the banner code to the owing calculation, and why did extracting `getOwing()` improve cohesion?
