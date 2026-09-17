# CPSC 310 — Lec 3 (Thu Sep 17) — Cohesion and refactoring

Deck: [02b-cohesion-refactoring.pdf](https://ubccpsc.github.io/310/26w1/lectures/02b-cohesion-refactoring.pdf). Reader: [Change Difficulty](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/change-difficulty/), [Refactoring](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/refactoring/). Questions: 12 in [the bank](../02-questions.md) under "Lec 3".

## Learning goals
- Analyse the cohesion of a unit of code in terms of the bindings between its statements: data, logic and order.
- Explain how low cohesion raises the risk of changing code.
- Describe the refactoring process and how it lowers that risk as code evolves.

## Slides, organized
### Where cohesion sits next to coupling (slides 3–4)
- Lecture 2's coupling and this lecture's cohesion are the two properties that make a change expensive, and the deck gives each one a difficulty and a risk.
  - High coupling makes a change difficult because the edit lands in more places, and risky because one of those places is easy to miss.
  - Low cohesion makes a change difficult because you have to work out what the unit actually does before you can touch it, and risky because an edit can disturb code that has nothing to do with the reason for the change.
- **Cohesion** is the relationship within one unit of code, such as a method or a class. The reader's phrasing is that it measures how focused a program element is on performing a single complete task.
- The deck's rule is that a unit should hold only functionality that belongs together, and that this gets harder to keep true as code evolves.
- Cohesion is measured between pairs of statements inside the unit. Two statements can share data, share logic, or share an ordering. The more of these a pair shares, the more strongly they belong in the same unit.
- Operationally: a pair that shares several bindings should stay together, and a statement that shares nothing with its neighbours is the first candidate to move out.

### The three pictures (slides 5–7)
- These three figure slides build one picture in stages. Boxes are units (classes) and the cells inside are pieces of Feature A, B and C.
- Slide 5's labels show a single `Util` box holding a mix of Feature A, B and C pieces, labelled low cohesion. Nothing inside shares data, logic or order with much else. This is the helper or utility class that collects whatever had no home.
- Slide 6's labels add an `AController` and a `CController`, each holding mostly one feature, labelled moderate cohesion. `Util` still holds leftovers.
- Slide 7 ends with `AController`, `BController` and `CController`, each holding mostly its own feature, labelled high cohesion. There are more boxes and each is smaller. The reader says this is the expected trade: more classes to find, but each one much easier to understand and change.
- What to look for in code: a class or file like the deck's `Util`, whose methods do not read the same fields or call each other, is the low-cohesion box.

### Three kinds of binding (slides 8–10)
- Two statements have a **data binding** when they read or write the same data. The deck's example is a summariser that computes the total, minimum and maximum of one `readings` array and returns all three. The first three lines all touch `readings`, and the return line is bound to them through `total`, `min` and `max`, so the whole body is one data-bound unit.
- Two statements have a **logic binding** when they sit in the same branch of a conditional (or a switch, or a dispatch on a type code) and run because that condition held. The deck's example is a `process(kind)` function with three branches. Inside the cleanup branch, deleting the cache file and sending a "cache cleared" email are logic-bound to each other. The email sent from a different branch is bound to neither.
- Two statements have an **order binding** when they must run in a fixed sequence. The deck's example is a boot routine: the logger initialises, then configuration loads, then the database connects (it needs the configuration), then the server starts (it needs the database). Swapping any two breaks it.
- The reader's prose names the same three kinds data, logic and **timing**, although its own table labels the third column Order. Expect either word on an exam.
- The reader's worked example is the function below. It shows that a pair of lines can hold one binding and not the others, so each pair has to be checked on all three.

```ts
function f(x: number) {
    let y = 0;                 // (1)
    if (x > 100) {             // (2)
        y += 5;                // (3)
        console.log("woohoo"); // (4)
    }
    return y;                  // (5)
}
```

- Lines 1 and 2 share no data (one touches `y`, the other `x`). They are logic-bound because both run whenever `f` runs. They have no order binding between just the two of them, although line 1 and line 3 do, because `y` must exist before it is incremented. The reader leaves the remaining pairs as an exercise.
- The reader's class-level tell: a cohesive class has a small set of private fields that most of its public methods use. A field used by only a few methods is a sign that those methods and that field belong somewhere else.

### Refactoring, by example (slides 11–14)
- Slide 11 is the section title. Slides 12 to 14 are code screenshots with no slide text, so what follows is read from the `02b-cohesion` folder of the [lecture_code](https://github.com/ubccpsc310/lecture_code) repo, which holds the Parkboard code they most likely show. Before the feature, a customer already became a "Frequent Customer" at three program categories. Feature FEAT-0002 adds a "Community Champion" tier at five and makes waitlist places count as interest. The repo holds both versions plus a diff of each.
  - `v1-direct` adds the feature straight in. The same promote-the-tier block is pasted at four sites in two files (both branches of `Offering.register` and both seeding loops in `catalogue.ts`), for 37 new lines of source and 32 of tests, plus a new requirement that programs load before customers are queried.
  - `v2-refactor` refactors first. The duplicated block is extracted into a `Customer.recordCategory()` method, status-setting moves into `Customer`, and the `status` field becomes a getter computed from how many interests the customer has. Each of the four sites becomes one method call; the diff removes 34 lines and adds 14.
  - The point of the pair: in v1 the feature is spread across four places, so the change carries the coupling difficulty (edit in many places) and the cohesion risk (loyalty logic sitting inside registration code). In v2 the concept has one home, so the next loyalty change is one edit.

### What refactoring is (slide 15)
- **Refactoring** is a predictable, meaning-preserving transformation of code, where meaning is behaviour. The deck's footnote says meaning, semantics and behaviour are the same thing here.
- The reader's definition: "the process of improving on the implementation of an existing design by restructuring the source code to alleviate existing shortcomings and ease future development."
- A refactoring adds no feature and fixes no defect. Most refactorings consolidate duplicate code, reduce coupling, raise cohesion, or make the system easier to understand and maintain.
- The reader frames refactoring as how a team handles **emergent design**: you learn which abstractions fit as the system grows, and refactoring folds them in.
- **Technical debt** is the metaphor teams use. A quick solution is often the right call, but it degrades or hides the design, and the cost comes back later. Three triggers usually mean the debt is due.
  - Adding a new feature is much harder than expected.
  - Fixing a bug that should be cohesive needs changes scattered across the system.
  - A code review of a simple feature or fix shows complex, hard-to-understand edits.
- The **rule of three** stops premature refactoring. The first time, do it the simplest way. The second time, do it again and note the duplicate. The third time, refactor. The reader calls this just-in-time abstraction, because a pre-emptive abstraction can make a system harder to understand even if it is easier to extend.

### How and when to refactor (slides 16–17)
- The deck's process has six steps: make sure all tests pass; examine coupling and cohesion; decide which refactoring to apply; apply it; run the tests again to confirm nothing broke; repeat until the change you want is localised. The slide draws these as a cycle whose nodes are labelled change is desired, examine coupling and cohesion, ensure all tests pass, determine a refactoring, refactor, and ensure all tests still pass.
- The reader's version has four steps: identify the property to improve and the transformations that will do it; run the suite so you know the system works before you start (saving the output can help); perform the refactoring; run the full suite again and confirm behaviour is identical.
- The tests run twice for a reason. The first run proves the green baseline is real, so a failure after the refactoring can only be the refactoring. Without the first run you cannot tell a pre-existing failure from one you introduced.
- Slide 16 says not to refactor when the tests are failing, when the code should simply be rewritten, or when a deadline is close.
- Slide 17 rejects refactoring on a schedule (two weeks every six months) and refactoring while fixing a bug. A bug fix changes behaviour on purpose, so mixing the two hides which change did what.
- Instead refactor opportunistically: when you recognise a warning sign, just before or after adding a feature, and when code is being reviewed.
- The reader's downsides: refactorings disturb other developers' mental model of the system and can add abstraction layers; they spend developer time that could have built features; and a small refactoring easily grows into a campaign far larger than intended.
- From the customer's side a refactoring is all risk and no visible reward, which is why the test suite is what makes it defensible.
- The reader's list of common refactorings, from Martin Fowler's catalogue: rename (class, field or method); move (class, field or method); extract class, interface or method; push down or pull up a field or method; replace a magic number or string with a constant; replace inheritance with delegation.
- The reader gives two examples worth recognising on sight.
  - Cohesion: `Invoice.printOwing()` printed a banner and also summed the amount owing. Banner and sum were bound by logic (same method body) and order (banner first) but shared no data, and the sum only belongs with printing the amount. **Extract Method** into a private `getOwing()` left `printOwing()` doing output only.
  - Coupling: `RoomsParser.parseRooms()` and `CourseProcessor.processCourses()` had matching shapes and complicated their clients. **Extract Interface** (`IParser` with one `parse(id, zip): boolean`), adding a return type, and **Rename** to `CourseParser` let clients depend on `IParser` alone. In lecture 2's terms the coupling drops to connascence of Type.

### Recap (slide 18)
- Cohesion identifies which code belongs together, measured by what pairs of statements share: data, logic, order.
- Cohesion and coupling together assess how difficult and how risky a change will be.
- Refactoring is applied when a change would be difficult or risky, which is when code is tightly coupled or has low cohesion. Structure changes and behaviour does not.

## Clarifications
- The PDF's own title slide reads "02b - Cost of Change: Cohesion", while the schedule and the file name say "Cohesion & Refactoring" (the schedule was renamed on Sep 17 when refactoring was folded into this slot). It is one lecture.
- As with lecture 2, the reader chapter that matches this deck is Change Difficulty, not Cost of Change; the refactoring half is the reader's Refactoring chapter.
- The deck names the third binding "order". The reader's prose says "timing" and its table says "Order". The meaning is identical.
- The deck gives six refactoring steps and the reader gives four. It is the same process: the deck splits out "examine coupling and cohesion" as its own step and adds "repeat until the change is localised".
- The reader treats cohesion mainly at class level (which fields the methods share); the deck treats it at statement level (pairs of lines inside a method). Both use the same three bindings.
