# CPSC 310 — Lec 2 (Tue Sep 15) — Coupling

Deck: [02a-coupling.pdf](https://ubccpsc.github.io/310/26w1/lectures/02a-coupling.pdf). Reader: [Change Difficulty](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/change-difficulty/), [Cost of Change](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/cost-of-change/). Questions: 8 in [the bank](../02-questions.md) under "Lec 2".

## Learning goals
- Tell apart the two forms of dependency that can exist between pieces of code, explicit and implicit.
- Find the coupling in code you have not seen before and judge what a change would cost along three axes: degree, locality, and strength.

## Slides, organized

### FEAT-0000: a rename shows what depends on what (slides 3–4)
- The ticket: `Instructor` stores one `name` field, and the city wants separate first and last names. The code is the Parkboard practice repo, [ubccpsc310/lecture_code](https://github.com/ubccpsc310/lecture_code), folder `02a-coupling`.
- Slide 4's point: code depends on other code, so a change in one place can force changes elsewhere. The lecture's job is to name the kinds of dependency so you can predict that spread before you edit.
- A dependency is **explicit** when it is a static reference the compiler can see. In the repo, `brochure.ts` reads `offering.instructor.name`, `Offering.valueOf` returns `this.instructor.name` for the `"instructor"` search field, and `Instructor.label()` uses `this.name`. Remove `name` and every one of these fails to compile, which is the compiler handing you the footprint for free.
- A dependency is **implicit** when it only shows up at runtime, so you have to hunt for it by hand. In the repo, the catalogue stores each instructor as a single string like `"Virginia Woolf"` that has to be split apart; the search command takes the field as a string (`"instructor"` sits in `SEARCHABLE_FIELDS` and in a `switch`); and a test searches for the literal `"Toni Morrison"`, so it silently assumes names are joined first-then-last with a space. Nothing type-checks any of that.
- How the 12:30 section finished it: `Instructor` got `fname` and `lname` plus a `get name()` that joins them, and `loadInstructors` splits the stored string. Because the getter kept `name` alive, every explicit dependency compiled untouched and the change stayed in two files. Keeping the old interface stable is the cheapest way to shrink a footprint.
- What to look for on an exam: string-keyed lookups (`switch (field)`, `obj[key]`), data rows parsed by position, and literals inside tests are where implicit dependencies hide. Ask "if I change this, what tells me?" If the answer is "nothing until it runs", the dependency is implicit.

### FEAT-0001: one policy, five files (slides 5–7)
- The ticket: resident seniors (65 and over) get Aquatics and Fitness programs free, paid for by raising the non-resident surcharge from 25% to 30%.
- Slides 6 and 7 are screenshots of the diff. The repo ships it as `diffs/feat001.patch`, and it touches `invoice.ts`, `parkboard.ts`, `brochure.ts`, `main.ts`, and the test file.
- The surcharge lived as the literal `1.25` in two places (`invoice.priceFor` and `parkboard.search`) and as the display string `"+25%"` in a third. No constant tied them together, so each had to be found and edited on its own, and a missed one would not be a compile error.
- The senior rule needed the category list `["Aquatics", "Fitness"]` written out in three files, and the "resident and 65 or over" check written out in two of them (`invoice.ts` and `parkboard.ts`). The brochure has no customer to price for, so it prints an asterisk and a footnote instead, which is the same policy expressed a third way.
- The search command had no idea how old the searcher was, so `SearchOptions` grew an `age` field. That broke `main.ts` and six tests at compile time. The tests were fixed by adding `age: 40`; `main.ts` reads the age from the command line and defaults to 40. Tedious but safe, because the compiler listed every site.
- The CLI gained the age as a fifth positional argument (`argv[5]`), so the usage text, the parser, and anyone typing the command must all agree on the order.
- Tests changed too: Test 35's expected total moved from 144.38 to 150.15, Test 36 flipped from "concession" to "free", and a new Test 36b checks that seniors still pay in other categories. Tests are dependents as well.
- What to look for on an exam: the same number or the same list appearing in more than one file is a bill waiting to come due. Count the files a one-line policy change would touch; that count is the footprint.

### The three axes of coupling (slides 8–9)
- Slide 9 defines **coupling**: "Coupling is the relationship between components. It forms through dependencies—imports, method calls, shared data, and assumptions about other components."
- The question it answers: if I change this component, what happens to the others?
- Slide 8 names three ways to describe a dependency, and together they are what "coupling" means in this course.
  - **Degree** is how many components a dependency touches. In FEAT-0001, the surcharge value touched three.
  - **Locality** is how far apart the dependent components sit. Two lines in one function are cheap; the same agreement across two files, two modules, or two services is not.
  - **Strength** is how much effort it takes to change the dependency. The deck and the reader both call this **connascence**.
- The type of dependency changes both the risk and the difficulty of a change, so name the type before estimating the work.

### Tight, loose, and none (slides 10–12)
- Slides 10 to 12 are graph pictures. Slide 10 shows tight coupling, slide 11 sets loose next to tight, and slide 12 sets no coupling, loose and tight side by side.
- Tight coupling means many edges, so a change ripples through most of the system.
- Loose coupling means few edges, so the ripple stops early. Slide 11's title says it plainly: loose coupling is cheaper.
- No coupling means the components cannot work together at all. Slide 12's point is that some coupling is required, so the goal is loosening, never elimination.
- The reader's three levers map onto the three axes.
  - Cut degree by reducing the number of shared interfaces between components.
  - Fix locality by pulling shared code into one place (a common module or library) when the coupling spans systems.
  - Weaken strength by moving a dependency up the connascence table toward Name. The reader's example is moving from algorithm to type, so the coupled code only has to agree on a type instead of reimplementing a computation.

### Connascence: five strengths, in rising cost (slide 13)
- Connascence measures how strong one edge is. Each type names what two or more components must agree on. Slide 13 lists them in increasing cost of change.
  - **Name** means the components must agree on what something is called, like `findUserById`. Rename it and every call site must follow.
  - **Type** means they must agree on the shape of the data. Add a required field and every caller must supply it. FEAT-0001's `age` field is this; the compiler found all seven sites.
  - **Value** means they must agree on the meaning of a literal, like `"pending"` hard-coded in validation, reporting, and UI code. Change it in two of three spots and the system still runs, just wrong. Magic numbers are the numeric case, and FEAT-0001's `1.25` is exactly this.
  - **Position** means they must agree on an ordering of values, like `createInvoice(customerId, startDate, endDate, total, tax)`. Swap `total` and `tax` at a call site and it compiles, because both are numbers, may pass tests, and computes the wrong number silently.
  - **Algorithm** means they must perform the same computation the same way, like one class encoding data and another decoding it. The reader notes that the stronger kinds usually come with the weaker ones as well.
- A memory aid for the order, which is mine and not the deck's: a missed Name or Type site usually fails at compile time, while a missed Value, Position or Algorithm site usually fails at run time, and the Position example only compiles because the swapped arguments share a type. The further down the table, the more of the footprint you have to find by hand.
- Live example from the 12:30 section's finished code: `loadInstructors` passes the last name before the first name into a constructor declared first-then-last. Both are strings, so it compiles, and the getter would print "Woolf Virginia". That is the position trap, whether or not it was intentional.
- What to look for on an exam: the same literal in several files (Value), long argument lists of one type (Position), two components that each implement half of one protocol (Algorithm). Name the type, say which lever weakens it, and say what it would have cost if a site were missed.

### Recap (slides 14–16)
- Slide 14 repeats the learning goals.
- Slide 15 recaps lecture 1. Designs have shortcomings that set the cost of current and future changes. The reader measures that cost two ways: **magnitude** is how large a change is, usually in lines of code, and **footprint** is how widespread it is, counted in methods, classes, files, modules, or services. Both reading and writing pay these costs; understanding code spread across eight files is a footprint cost even when you edit nothing. The risk is missing part of the footprint, because nothing forces dependent code to update.
- Slide 16 recaps coupling as a way to quantify how dependencies affect the cost of change. Degree is how many things share a concept, locality is how far apart they are, and strength is how tightly they are bound, graded by the five connascence types. Coupling can be explicit or implicit.
- The link between the two recaps: coupling is what produces footprint. Implicit coupling is dangerous for the same reason an unclear footprint is: nothing forces you to find every affected spot.

## In class
- The repo keeps a `start` and `end` folder for each section (12:30, 14:00, 15:30), which suggests the FEAT-0000 change was worked through in class; FEAT-0001 is supplied as `diffs/feat001.patch`.
- To practice: open `02a-coupling/<section>/start`, run `yarn install`, try FEAT-0000 yourself before reading `end`, then FEAT-0001 before reading the patch. Count the files you touch and label each dependency explicit or implicit.

## Clarifications
- The reader chapter for this deck is Change Difficulty, not Cost of Change, even though the deck's own title is "02a - Cost of Change: Coupling". The schedule's week-2 title is "Coupling · Cohesion & Refactoring", and the deck's content (the three axes, connascence) is Change Difficulty's coupling section. The Course Materials page for unit 1 assigns the Cost of Change chapter to the "Measuring a change" lecture and Change Difficulty to "Cohesion & connascence"; slide 15 borrows footprint and magnitude from Cost of Change for the recap only.
- The reader phrases the second lever as "minimize locality" and describes it as extracting shared code into a common library when coupling spans systems. The deck names the axis but gives no lever, so use the reader's wording if asked.

## Your notes
Might be easier to just look at the slides for coupling. Did some practice on the lec github practice repo.
