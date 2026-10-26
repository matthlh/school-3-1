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

## Block 2 · Testing (lectures 5 to 7, plus the test levels from lecture 12)

### The two axes of testability
- Code is testable when a test can both drive it and check it.
- **Controllability** is the degree to which a test can determine the inputs and state the code under test depends on. Lowered by hidden inputs (the clock, randomness), global or shared state, hard-wired dependencies the code constructs for itself, and preconditions that are hard to set up. Raised by taking inputs and dependencies as parameters.
- **Observability** is the degree to which a test can inspect the results and effects the code produces. Lowered by results that are only printed, intermediate values never returned, private state never exposed, and effects on external systems. Raised by returning results as values.
- The reader adds two more properties: **isolateability**, the ability to locate a fault inside the code under test, and **automatability**. Controllability and observability together give isolateability.
- The deck's example: `printStatus()` only writes to `console.log` (unobservable) and reads `Date.now()` itself (uncontrollable). Fix both by passing the clock in and returning the string.
- A method **contract** is REQUIRES (preconditions), MODIFIES and EFFECTS (postconditions). Write the test from the contract first, in Given, When, Then form; it shows exactly which state the class must expose. The `Animal` example needed `isHungry()` and `amountEaten()` added before its EFFECTS clause could be checked.
- **Test-driven development**: write a failing test, make it pass, refactor. Writing the test first forces a testable structure from the start.

### Test doubles, DIP and LSP
- Tests are hard to write when the dependency is **uncontrollable** (a bank, a clock), **unobservable** (you cannot see what was sent), or **unsafe or slow** (real money, the network). If the dependency is fast, deterministic and has no side effects, do not double it.
- The **dependency inversion principle** (DIP): depend upon abstractions, not implementations. `buyCoffee` depends on an `IReader` interface; the real reader implements it, and so does the test's `testReader`. That is what makes a double possible.
- A **test double** stands in for a dependency. The reader's generic word is **fake**. Use these two on an exam:

| Double | Does | Serves |
|---|---|---|
| **Stub** | Controls what the dependency gives back (the approving reader, the declining reader) | Controllability |
| **Spy** | Records what the code under test sent to it (the recording reader) | Observability |

- One object can be both: the reader's `FakeLocator` returns fixed values and appends every call to an array.
- Compiling is not enough. Any object with a `charge()` returning boolean compiles as an `IReader`, but the type system checks the shape, not the contract.
- The **Liskov substitution principle** (LSP): if a property is provable about objects of type T, it should hold for objects of any subtype S. Plainly, a subclass must not break the expectations set by its superclass. A double is a subtype of the interface, so LSP is the test for whether it is a valid stand-in.
- The **LSP methods rule**: a subclass must not strengthen preconditions for the same inputs (widening is fine), and must not weaken postconditions for the same inputs (narrowing is fine).
- The Bird example: `Bird.flyFromHeight(h)` works for every height; `Penguin` only under 50 cm, a stronger precondition, so `freeBird(b)` calling `flyFromHeight(100)` breaks on a Penguin. "Penguin perishes" is an extra effect the superclass never promised. The Resize example: a subclass where setting the width also changes the height breaks the postcondition that the other dimension stays put.
- The cost of doubles: another layer in the design, doubles drift from the real thing and need updating when the interface changes, and the real implementation still needs tests of its own.

### What makes a suite strong, and how to build one
- Four properties: the right inputs (every behaviour in the spec has a test), precise checks (assertions that would notice a wrong answer), reliable results (deterministic code or doubles for what is not), and coverage of most of the behaviour.
- The build order: get the requirements; turn them into stubs with specifications; write behavioural tests against the specs; implement until they pass; check how good the suite is for this implementation (coverage, optionally mutants); then write structural tests. Spec tests only test what is in the spec. Tests that follow the code's shape come last.

### Equivalence class partitioning
- You cannot test every input, so split them into classes the spec treats the same way and test one value per class. It works from the spec, not the code, so it is **black-box**, and it avoids the confirmation bias of testing code you wrote.
- Derive classes from two directions. The **input domain** starts from the parameter types, is narrowed by preconditions, then split into valid and invalid. The **output range** starts from the return type plus documented errors, split by postconditions into normal and error classes. Errors count as promised outputs.
- `getLetterGrade`: A 80 to 100, B 68 to 79, C 55 to 67, D 50 to 54, F 0 to 49, `RangeError` outside 0 to 100. Input: 1 valid class, 2 invalid. Output: 5 normal, 1 error. Nine classes; the string "80" and `null` are not tested because they are outside the parameter type.
- One value can cover an input class and an output class at once: 72 is "valid" and "B". The deck's picks: -10, 25, 52, 60, 72, 90, 110.
- Then add the **boundaries**, one value on each side of every edge, because bugs cluster there (`>=` written as `>`): -1 and 0, 49 and 50, 54 and 55, 67 and 68, 79 and 80, 100 and 101.
- Why partition both views: they diverge when an output depends on a combination of inputs. Input partitioning finds values the code might mishandle (invalid, empty, extreme). Output partitioning finds behaviours no single input points to, such as "can the GPA go over the maximum?"

### Coverage
- Coverage answers one question: how much of the code did the tests execute. **Line**, **statement** (slightly stronger: every statement on the line), **branch** (each outcome of each decision) and the reader's **path** (every combination of outcomes).
- The reader's example: two independent conditionals and one test give 67% line, 50% branch, 25% path. Reaching 100% takes one test for line, two for branch, four for path.
- Four limits: it does not check correctness, it is fooled by tests without assertions, it ignores the input space, and thresholds can be gamed. Use it to find what the tests missed, then decide whether more tests are needed. ECP says what to test; coverage says what ran.

### Test levels (lecture 12, and lecture 11's booking tool)

| Level | Where it tests | Count | Costs and benefits |
|---|---|---|---|
| **Unit** | Within a boundary, one function, dependencies replaced by doubles | Most | Fast, easy to write, read as documentation, localize a fault directly; only check behaviour in isolation |
| **Integration** | Between boundaries, the core with the real adapter on a real resource such as a temp file | Several per boundary | Bridge the gap between the other two |
| **End-to-end** | Across boundaries, the way the system is used | A few | Real assurance; poor fault localization, many reasons for one failure, cumbersome to write, expensive to run |

- Test each thing at the narrowest level that can see the bug, so tests do not fail for the wrong reasons. The deck draws the composition as a pyramid.

### Block 2 questions, answer in chat
1. `sendReminder(userId)` looks up the user, builds an email and calls `new SmtpClient().send(email)`. Name the controllability and the observability problem, and write the signature you would change it to so a test can check what was sent without a mail server.
2. An interface `Store.get(id): Item` says "returns the item, or throws NotFound if no item has that id". Your test double returns `undefined` for unknown ids. Does it compile? Is it a valid double under LSP? Which rule does it break?
3. A function accepts a percentage 0 to 100 and returns "fail" below 50, "pass" from 50 to 84, "distinction" from 85, and throws outside the range. List the equivalence classes from both views and the boundary values you would test.

## Block 3 · Design patterns and the Open/Closed Principle (lectures 8 to 10)

### How to analyse any pattern
- A **design pattern** is a tried and true solution to a recurring design problem, what emerges when you keep a likely change local. It is not a class diagram to copy, not a library, and not a rule. Knowing the name buys recognition, a destination for refactoring, known costs, and shared vocabulary.
- Three categories: **structural** (relationships between entities: Adapter, Composite, Decorator), **creational** (how objects are made), **behavioural** (how objects communicate: State).
- Four questions, in order, and the exam expects all four:
  1. **Change**: which decision is likely to vary?
  2. **Pain**: where does it **scatter** (a coupling problem, one edit per place) or **tangle** (a cohesion problem, mixed with unrelated code)?
  3. **Mechanism**: what abstraction gives the decision one home, who calls it obliviously, and what triggers the call?
  4. **Cost**: what indirection was added, and was it worth it?
- The mechanism is always **abstraction** (an interface or abstract class separating what varies from what stays) plus **polymorphism** (concrete objects treated uniformly through it, so callers never know the concrete type).
- Patterns help when change is likely, variability already exists, or coupling is painful. They hurt when requirements are stable, there is only one concrete case, or the abstraction costs more than the future benefit.

### The four patterns

| Pattern | Intent | Mechanism | Cost |
|---|---|---|---|
| **Adapter** | Convert a class's interface into the one clients expect, so incompatible interfaces work together | A `MusicSource` interface with `getRecords()`; one adapter per platform returns normalised records; the report loops over `MusicSource[]` | One class per platform; the shared record can only carry fields every platform supplies |
| **Composite** | Compose objects into trees for whole-part hierarchies, so clients treat one object and a composition uniformly | **Component** interface, **Leaf** answers for itself, **Composite** holds components and answers by asking each; `Employee.getTotalSalary()` on a Manager sums its reports | One class per role; a new operation is a new method in the interface and every class |
| **Decorator** | Attach responsibilities to one object at run time, a flexible alternative to subclassing | A decorator **is a** Component and **has a** Component; the call enters the outermost wrapper and each wrapper changes the answer of what it wraps; `new Large(new Whip(new Latte()))` | One class per add-on; the order of wrappers changes the result and cannot be enforced; wrappers cannot see each other (a double wrap is allowed); many small classes; `instanceof` breaks |
| **State** | Let an object alter its behaviour when its internal state changes, an object-oriented state machine | A `PhoneState` interface; the context holds one state and forwards every event; each state handles every event and calls `setState()` to move on | One class per state; transitions spread across the classes; a new event touches every state; `setState()` must be public |

- Telling the three structural wrappers apart: Adapter changes the interface and keeps the behaviour. Decorator keeps the interface and changes the behaviour. Composite keeps the interface and holds many components in a tree rather than one in a chain.
- In Module 1 terms the client's coupling drops from connascence of algorithm (a switch per variant) to connascence of type (one interface), and for Adapter the main gain is degree: one dependency instead of one per source.
- The java.io chain is Decorator in the wild: `ObjectInputStream` around `GZIPInputStream` around `BufferedInputStream` around `FileInputStream`. Each is an input stream, holds an input stream, and changes what reading does.
- Decorator order example: a 400-cent latte with a large that multiplies by 1.2 outside a 100-cent shot gives 600; the other way round gives 580.

A Decorator you may be asked to write:

```ts
class Whip implements Drink {
  constructor(private inner: Drink) {}
  getDescription() { return this.inner.getDescription() + ", whip"; }
  getPriceCents()  { return this.inner.getPriceCents() + 75; }
}
```

### The Open/Closed Principle and the axis of change
- **OCP**: a unit of code should be open for extension (new behaviour can be added) and closed for modification (adding it does not change code that already works). Done by depending on an abstraction and extending with a new implementation. The four patterns are four ways of putting that abstraction in place.
- No design is open to every change. Every pattern is open to new implementations and closed to new operations.

| Pattern | Cheap (one new class) | Expensive (touches every implementation) |
|---|---|---|
| Adapter | A new music service | A new query on `MusicSource` |
| Composite | A new role | A new operation such as average salary |
| Decorator | A new add-on | A new property such as calories |
| State | A new state | A new button |

- Every extension point costs an interface, a dispatch and more classes. Before adding one ask: what will vary, what must stay stable for the code that depends on it, and is the variation really likely?

### Block 3 questions, answer in chat
1. A `Shape` interface has `area()`. `Circle` and `Square` implement it, and `Group` holds a `Shape[]` and returns the sum of its members' areas. Name the pattern, the three roles, and say which of these is cheap and which is expensive: adding `Triangle`, or adding `perimeter()`.
2. `Notifier.send(msg)` sends an email. The product wants some messages also logged, and some also sent by SMS, in any combination, chosen per message at run time. Subclassing gives four classes today and eight with the next channel. Which pattern fixes this, write the `LoggingNotifier` class in TypeScript, and name one cost.
3. True or false, and justify: applying the State pattern to a document with Draft, Review and Published states makes adding a new "Archived" state cheap and adding a new "export" action cheap.

## Block 4 · Boundaries, API design and REST (lectures 11 to 13)

### Core and edges
- **Business logic** is the rules that make the system worth having ("a room cannot be double-booked"); it changes when business concerns change. **Everything else** moves data in and out (files, databases, UI, other services, logging, caching, auth); it changes when the outside world changes.
- The **core** holds the business logic. It imports nothing from outside and does no I/O. The **edges** hold I/O, parsing, validation, configuration such as file paths, and services.
- A **port** is an interface owned by the core and written in the core's own terms (`BookingStore`). An **adapter** implements the port with real resources (`JsonBookingStore` on the file system). The edge (`main.ts`) picks which adapter to hand the core. Every dependency points inward, which is the dependency inversion principle again.
- The difference from lecture 8's Adapter: there the interface sat on the client's side of a foreign library; here the port belongs to the core, which is what stops a storage change leaking inward.
- Mixed responsibilities cost three things: every change risks the others (a file field rename edited the overlap rule), no job can be tested alone (testing the rule needed JSON in and a sentence out), and no job can be reused alone (a web frontend needs the rules, not command-line wording).
- **Single responsibility principle**: each part has one reason to change. After the split, a renamed file field touches only the adapter, a new rule touches only the core with plain-object unit tests, and a new frontend is a new edge calling the existing `book()`.
- Test levels follow the parts: many unit tests with a fake store on the core, a few integration tests with a temp file on the adapter, one or two end-to-end tests through `main.ts`.

### API design
- An **API** is how two or more programs communicate. **APIs are forever**: once published it is a dependency for many clients, so a change can break thousands of them. Internals should change freely; the API surface should change rarely and never break clients.
- Start with the task, not the implementation: what should a developer be able to do easily, what sequence should feel natural, what mistakes should the API prevent. The deck's bad `UserStore` made the client look in several places for one result, write extra code for a simple task, touch internal variables and infer ambiguous behaviour.
- The four design principles and the question to ask of a fragment:

| Principle | Ask |
|---|---|
| **Information hiding** | Is internal state or structure exposed that callers should not see or touch? |
| **Obliviousness** | Does the caller need to know something about the implementation to use it correctly? |
| **Easy to use, hard to misuse** | Can the type system prevent incorrect usage, such as a wrong call order or bad parameters? |
| **Contract completeness** | Do the signatures and JSDoc capture what can go wrong and what callers can rely on? |

- The reader's advice: an API does one thing, stays as small as possible because a released API is hard to shrink, avoids long parameter lists, returns descriptive objects not primitives, expresses errors in its own terms, returns immutable values, and is designed for its real user, a developer.

### Change severity
- Two questions size a change: when will the client experience it, and what must the client do to adopt it.

| Level | What the client must do | Examples |
|---|---|---|
| **MAJOR** | Update their code; an incompatible change | Removing a method, changing a parameter type |
| **MINOR** | Nothing; backwards-compatible functionality added, a structural change | A new method, an optional parameter |
| **PATCH** | Nothing; a backwards-compatible behavioural improvement | A small bug fix, a performance improvement |
| **NONE** | Nothing; no client effect | A refactoring |

- **Semantic versioning** writes Major.Minor.Patch, bumps the number for the most severe change and resets those below: from 3.8.1 a fix gives 3.8.2, a new optional parameter 3.9.0, a breaking change 4.0.0.
- The reader's `Library.checkout(book, duration)` example: replacing `duration: number` with a `Duration` object breaks at compile time; silently reinterpreting the number as weeks keeps the signature and breaks at run time, which is worse. Non-breaking routes: a union type `number | Duration`, a new method `checkoutSpecific`, or a new parameter with a default.
- A defect fix is normally a patch, but it is breaking when clients have come to rely on the defect.
- REST APIs change in backwards-compatible ways where possible; a necessary breaking change ships as `/v2/checkout` beside `/checkout`, the old route is deprecated and removed once every client has moved.
- One deck-versus-reader split: the deck puts performance improvements under PATCH, the reader under minor. Rule: a structural, opt-in addition is minor; a behavioural, nothing-to-change improvement is patch.

### REST
- A **request** has a method, a path, a query, headers and a body. A **response** has a status, headers and a body. **2XX** worked (200, 201 Created), **4XX** the client's request was the problem (400, 404), **5XX** the server failed (500).

| Method | Meaning | Body | Idempotent |
|---|---|---|---|
| **GET** | Give me what is at the URL | No | Yes, and never modifies |
| **PUT** | Store this at the URL, replacing what is there; creates when the client picks the URI | Yes | Yes |
| **POST** | Here is data, do something with it; creates when the server picks the URI, returns 201 | Yes | No |
| **DELETE** | Remove what is at the URL | No | Yes, though the second call may get 404 |

- **Model things, not actions.** URLs are resources and methods are the verbs, so "take a trip" becomes a trip resource. Design with a table: one row per resource URI (`bikes/`, `bikes/{id}`, `bikes/{id}/trips`, `bikes/{id}/trips/{id}`), one column per method, each cell what it does or why it is refused. PUT on a collection would replace the whole list and DELETE would delete it, so both are refused.
- The four constraints, each with its check:

| Constraint | Meaning | Check |
|---|---|---|
| **Uniform Interface** | Only the standard methods, meaning the same in every API; status codes report the outcome | Could a generic tool handle this request without knowing your API? |
| **Idempotency** | Sending a request twice leaves the same state as once; every method but POST | What happens if the client retries? |
| **Statelessness** | Each request carries everything needed; the server keeps resources, not what the client has done | Could a different server answer this request? |
| **Connectedness** | Responses link to related resources so clients follow links instead of building URLs | Does the client ever build a URL itself? |

- The bike share starts a trip with `PUT /bikes/b1/trips/t-4f2a` and a client-chosen id, not POST, so a dock retry gets 200 and does not start a second trip. Pagination is `GET /:query/:rowNum`, never `/stations/more`, which would make the server remember each client's position.
- Headers carry metadata only. The resource goes in the URI, the data in the body, and a body on a GET is discouraged. A URI (`/dataset`) names a resource; a URL says where it lives.
- REST fits things you store and change. It is awkward for pushing live updates to clients, commands to hardware ("unlock the dock"), computed answers like a price quote, and steps that must succeed together (reserve and pay).

### Block 4 questions, answer in chat
1. A booking core imports `fs` to read `bookings.json` directly inside `book()`. Name the principle it breaks, write the port interface you would give the core in TypeScript, and say which test level then covers the file code.
2. Version 2.4.3 of a library. Three changes land: the `search()` method gains an optional `limit` parameter; a sort that was unstable becomes stable; `delete(id)` now throws instead of returning false when the id is missing. Give the severity of each and the resulting version number.
3. A ride-share API has `POST /rides/{id}/cancel`, `GET /rides/next`, and responses that return only ids so the client builds `/rides/{id}` itself. Name the constraint each one breaks and rewrite each.
