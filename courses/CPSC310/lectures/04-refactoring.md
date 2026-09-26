# CPSC 310 — Lec 4 (Tue Sep 22) — Refactoring

Deck: [03a-refactoring.pdf](https://ubccpsc.github.io/310/26w1/lectures/03a-refactoring.pdf). Reader: [Refactoring](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/refactoring/). Questions: 9 in [the bank](../02-questions.md) under "Lec 4".

## Learning goals
- Spot the structural problems in code that get in the way of a new feature.
- Design a different structure that takes the change more easily.
- Carry out that restructuring safely, one behaviour-preserving step at a time, with the tests as the check.

## Slides, organized
### Design analysis questions (slide 2)
- This slide is about the project reflections, not exam content. Half of each deliverable's grade is the reflection, and the answers are graded on relevance and specificity.
- A vague answer ("I edited some files and it was confusing") scores lower than a concrete one that names what was edited, what broke, and where the missing edit site turned out to be.
- Length does not earn marks. A short specific answer beats a long vague one.

### Emergent design (slides 4–8)
- The deck names three signs that a change is going to be difficult, and each one raises the chance of introducing a bug.
  - The same change has to be made in more than one place.
  - You can already tell the change will collide with a teammate's work, either as a merge conflict or as edits to the same file.
  - The code is too obscure to understand clearly.
- The remedy is to refactor before making the change, by introducing an abstraction that removes whichever sign is present.
  - Duplication, clones or scattering that cause several edit sites are consolidated into one place.
  - Tangled pieces of functionality are split apart.
  - Hard-to-read code is made understandable.
- The three comic panels (slides 6 to 8) tell the same story. First the developer asks whether a change can be made and the code, covered in smells, says no. Then the developer refactors repeatedly, guided by design principles and design patterns. Finally the developer asks again and the code says yes.
- The reader calls this **emergent design**: as a system grows you learn which abstractions fit, and refactoring is how you fold them in.

### What refactoring is (slide 9)
- **Refactoring** is a predictable, meaning-preserving code transformation, where meaning, semantics and behaviour are the same thing. This repeats lecture 3's definition.
- The recap slide phrases it as changing how the code is represented without changing its external behaviour.

### Feature envy and the Law of Demeter (slides 10–11)
- **Feature envy** is behaviour in the wrong place. If a method you are writing wants access to many fields of another class, the method probably belongs in that other class.
- The **Law of Demeter** is the related tell: a long chain of dereferences through another object means the method is probably in the wrong spot.
- The deck's example is a `Cat` whose `chaseDog()` reaches into its `Dog` field and drives the dog's run, tail and mouth one by one. The question the slide asks is why the cat is telling the dog how to behave, since objects should define their own behaviour.
- The fix moves that behaviour into `Dog` as one method, so the cat makes a single call.

```ts
// before: Cat drives Dog's parts
this.fido.run(); this.fido.tail.wag(); this.fido.mouth.smile();
// after: Dog owns the behaviour
this.fido.beChased();
```

- In lecture 2's terms the "before" version couples `Cat` to the names and structure of `Dog`'s internals (`tail`, `mouth`), so a change inside `Dog` ripples into `Cat`. After the move, `Cat` depends on one method name.

### How to refactor (slide 12)
- This is the same six-step cycle as lecture 3: make sure all tests pass, examine coupling and cohesion, decide how to refactor, apply the refactoring, run the tests again, and repeat until the change you want is localised.
- The recap slide stresses the discipline: verify that the tests pass before touching the code and again after every single change.

### Magic values (slides 13–14)
- **Magic values** are semantically important values written directly into the program text.
- The deck lists the problems they cause.
  - They create coupling, specifically **connascence of value**. You have to find every place the value must agree and work out what changing it would do.
  - They hurt readability, because the reader cannot tell what the value means.
  - The same value can be encoded in different ways in different places, which makes the agreeing sites even harder to find.
- The example is a potential-energy function that multiplies by a bare `9.81`. The refactored version names it as a gravitational constant.
- The deck calls this "replace magic number with symbol" and says it is the typical refactoring but not the only one. The reader's catalogue calls it replace magic number or string with a constant.

### Almost-duplicate code, pull up and template method (slides 15–19)
- **Duplicate code** means the same intent or computation is expressed in several places. "Almost" duplicate means the copies differ slightly.
- The deck lists the problems.
  - It is coupling, especially **connascence of algorithm**: every copy has to stay in agreement.
  - If the copies are not identical, finding all of them can be very hard.
  - It becomes hard to locate where a behaviour actually comes from.
- The worked example is an abstract `CollectionsReport` with two subclasses, a verbose report and a concise report. Each subclass's `printReport()` prints the same start banner, its own unique body lines, and the same end banner.
- Step one is to separate what is duplicated (the two banners) from what is unique (the body).
- Step two is **pull up**: move the duplicated behaviour into the parent class.
- The deck's solution introduces a **template method**. The parent's `printReport()` becomes concrete: it prints the start banner, calls an abstract `printContents()`, and prints the end banner. Each subclass now implements only `printContents()` with its unique lines.

```ts
abstract class CollectionsReport {
  public printReport(): void {
    console.log("===Start===");
    this.printContents();        // the only step subclasses supply
    console.log("===End===");
  }
  public abstract printContents(): void;
}
```

- Slide 19 shows the tempting alternative and rejects it. The parent gains `printHeader()` and `printFooter()` helpers, but `printReport()` stays abstract and each subclass calls header, body and footer itself.
  - The duplicate lines are gone, but the sequence is still copied into every subclass.
  - Nothing forces the pattern to stay the same. A new subclass can forget the footer or call things in the wrong order, and nothing will stop it.
  - The template method fixes that: the parent owns the order and subclasses can only fill the one gap.

### Technical debt (slides 20–21)
- **Technical debt** is the extra cost of changing the system later because of shortcuts taken earlier.
- It builds up invisibly, like interest.
- Not all technical debt is bad. The bad kind slows the team down or raises risk.
- Code smells point to where the debt is.
- The deck's rule of thumb: if a change hurts to make, you are probably paying interest on technical debt.
- Slide 21's chart plots cost per feature over the years after launch. Without refactoring the cost climbs steadily. With refactoring it stays roughly flat, rising and falling in a small band.

### Refactoring timeline (slide 22)
- Do not refactor as a scheduled block (two weeks every six months), while tests are failing, when the code should simply be rewritten, or while fixing a bug.
- Instead refactor opportunistically: when you recognise a warning sign, just before or after adding a feature, and when you review code or your code is reviewed.

### Recap (slide 24)
- Refactoring changes how code is represented without altering its external behaviour.
- Different smells point to different structural fixes. This deck covered feature envy, magic values and duplicate code.
- Refactoring keeps the long-term cost of change under control by paying down technical debt continuously.
- Always follow the procedure: tests pass before you touch the code, and after every change.

## Clarifications
- Feature envy, the Law of Demeter and the template method are in the deck only. The reader's Refactoring chapter does not name them; its catalogue has "move method" and "pull up method", which are the underlying moves.
- The deck calls the magic-value fix "replace magic number with symbol" and the reader calls it "replace magic number/string with constant". It is the same refactoring.
- Lecture 3's slide 16 listed a close deadline as a reason not to refactor. This deck's timeline slide drops the deadline and adds "when the tests are failing" and "when you should just rewrite" to the same list as "when you fix a bug". Treat all five as the combined list.
- The deck says "not all technical debt is bad". The reader says the same thing in its own words: a quick solution is often the right call, as long as the future cost is judged worth it.
