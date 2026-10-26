# CPSC 310 — Midterm review (Thu Oct 29, 19:00–21:00, HEBB 100)

On paper: true/false, multiple choice, short and long answer, every question over code you have not seen, some handwritten TypeScript, one handwritten cheat sheet. Covers lectures 1 to 13. Four blocks below, about 20 minutes each. After each block answer its three questions in chat before moving on; the answers are what transfers, not the reading.

## Block 1 · The cost of change (lectures 1 to 4)

### The one idea the course hangs on
- The course's definition: software engineering is the discipline of managing what a change costs as a system keeps growing.
- Every exam question about a fragment is really asking what the next change would cost, where that cost comes from, and which lever lowers it.
- Never call a design bad without naming the cost it imposes.
- A change's cost is measured two ways. **Magnitude** is how big it is, roughly lines of code. **Footprint** is how widespread it is, counted in methods, classes, files, modules or services. The risk is missing part of the footprint, because nothing forces dependent code to update.

### Coupling
- **Coupling** is the relationship between components. It forms through dependencies: imports, method calls, shared data, assumptions. Coupling is what produces footprint.
- A dependency is **explicit** when the compiler can see it. Remove the field and the build fails, which hands you the footprint for free.
- A dependency is **implicit** when it only shows up at run time: string-keyed lookups such as `switch (field)`, data rows parsed by position, literals inside tests. Nothing type-checks them.
- The exam tell: ask "if I change this, what tells me?" If the answer is "nothing until it runs", the dependency is implicit.
- Some coupling is required, because components with no coupling cannot work together. The goal is loosening, never elimination.

Three axes describe a dependency, and together they are what "coupling" means in this course.

| Axis | The question | The lever (reader's wording) |
|---|---|---|
| **Degree** | How many components share the thing? | Reduce the number of shared interfaces |
| **Locality** | How far apart do they sit? Two lines in one function is cheap; the same agreement across two services is not | Pull shared code into one place, a common module or library |
| **Strength** | How much effort does changing the dependency take? The deck and the reader call this **connascence** | Move the dependency up the table toward Name |

### Connascence: five types in rising cost
Each type names what two pieces of code must agree on.

| Type | They must agree on | Example | If a site is missed |
|---|---|---|---|
| **Name** | What something is called | Rename `findUserById` | Compile error |
| **Type** | The shape of the data | Add a required `age` field; every caller supplies it | Compile error |
| **Value** | The meaning of a literal | `1.25` in two files and `"+25%"` in a third; magic numbers | Runs, wrong |
| **Position** | An ordering of values | `createInvoice(total, tax)`, both numbers, swapped at a call site | Compiles, silently wrong |
| **Algorithm** | Doing the same computation the same way | An encoder in one class and a decoder in another | Runs, wrong |

- Memory aid: a missed Name or Type site fails at compile time, a missed Value, Position or Algorithm site fails at run time. The further down the table, the more of the footprint you find by hand.
- On an exam look for the same literal in several files (Value), long argument lists of one type (Position), and two components that each implement half of one protocol (Algorithm). Name the type, name the lever, and say what a missed site would have cost.

### Cohesion
- **Cohesion** is the relationship within one unit, a method or a class: how focused it is on one complete task.
- Low cohesion makes a change difficult, because you must work out what the unit does before touching it, and risky, because an edit can disturb code unrelated to the change.
- High cohesion means more, smaller classes. That is the expected trade: more boxes to find, each much easier to change.
- Cohesion is measured between pairs of statements by three **bindings**.

| Binding | The two statements | Example |
|---|---|---|
| **Data** | Read or write the same data | Total, min and max all computed from one `readings` array |
| **Logic** | Sit in the same branch of a conditional and run because it held | Delete the cache file and send the "cache cleared" email, both inside the cleanup branch |
| **Order** (the reader also says timing) | Must run in a fixed sequence | Logger, then config, then database, then server |

- A pair sharing several bindings belongs together. A statement sharing nothing with its neighbours is the first candidate to move out.
- Class-level tell: a cohesive class has a few private fields that most of its public methods use. A field used by only two methods belongs somewhere else, with them.

### Refactoring
- **Refactoring** is a predictable, meaning-preserving transformation of code. Meaning, semantics and behaviour are the same word here. It adds no feature and fixes no defect.
- The process: tests pass, examine coupling and cohesion, pick a refactoring, apply it, tests pass again, repeat until the change you want is localised.
- The tests run twice on purpose. The first run proves the green baseline is real, so a failure after can only be the refactoring.
- When not to refactor: the tests are failing, the code should simply be rewritten, a deadline is close, and never while fixing a bug. A bug fix changes behaviour on purpose, and mixing the two hides which change did what.
- Never on a schedule. Refactor opportunistically: when you recognise a smell, just before or after adding a feature, and during code review.
- Fowler's catalogue names to recognise on sight: rename, move, extract method, extract interface, extract class, pull up, push down, replace magic number or string with a constant, replace inheritance with delegation.
- The reader's two examples. `Invoice.printOwing()` printed a banner and summed the amount owing; the two shared logic and order but no data, so **Extract Method** moved the sum into `getOwing()`. `RoomsParser.parseRooms()` and `CourseProcessor.processCourses()` had matching shapes, so **Extract Interface** gave clients one `IParser` to depend on, which drops the coupling to connascence of Type.

### Emergent design and technical debt
- Three signs a change will be hard: the same change must be made in more than one place; it will collide with a teammate's work; the code is too obscure to understand.
- Each sign gets an abstraction: consolidate the duplication, split the tangle, make it readable. Refactor before making the change.
- The **rule of three**: the first time do it simply, the second time note the duplicate, the third time refactor. A pre-emptive abstraction can make a system harder to understand even if it is easier to extend.
- **Technical debt** is the extra cost of changing the system later because of shortcuts taken earlier. It builds like interest. Not all debt is bad; the bad kind slows the team or raises risk. If a change hurts to make, you are paying interest.

### Smells and their fixes

| Smell | What it is | The coupling it creates | The fix |
|---|---|---|---|
| **Feature envy** | A method wants many fields of another class, so it belongs there. The **Law of Demeter** tell is a long chain of dereferences | Coupling to the other class's internals | Move the behaviour: `this.fido.run(); this.fido.tail.wag(); this.fido.mouth.smile()` becomes `this.fido.beChased()` |
| **Magic values** | Semantically important literals written into the code | Connascence of value; also hurt readability, and the same value can be encoded differently in different places | Replace magic number with a named constant |
| **Almost-duplicate code** | The same intent in several places, with small differences | Connascence of algorithm; hard to find every copy, hard to see where behaviour comes from | **Pull up** the shared part into the parent; when the shared part is a sequence with one varying step, a **template method** |

The template method, which the exam can ask you to write by hand:

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

- The rejected alternative gives the parent `printHeader()` and `printFooter()` helpers and leaves `printReport()` abstract, so each subclass calls header, body and footer itself. The duplicate lines are gone but the sequence is still copied, and nothing stops a new subclass forgetting the footer. The template method makes the parent own the order.

### Block 1 questions, answer in chat
1. `applyDiscount(price, pct)` is called in four files, always with numbers. In one file a developer wrote `applyDiscount(0.15, price)`. It compiles and the tests pass. Which connascence type is this, and why did nothing catch it?
2. `Invoice.printOwing()` prints a banner, loops over line items summing the amount, then prints the total. Which bindings hold between the banner line and the summing loop, which do not, and what refactoring applies? Use the reader's name for it.
3. True or false, and justify: a good time to refactor is while you are fixing a bug, since you already have the code open.
