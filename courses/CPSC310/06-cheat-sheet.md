# CPSC 310 — Midterm cheat sheet (Thu Oct 29, 19:00, HEBB 100)

One 8.5 by 11 sheet, handwritten, both sides, collected at the end. Kyle's rule: write what helps you apply the principles and the TypeScript syntax, not trivia. Copy Side 1 and Side 2 below by hand; writing it is the first study pass. REST (lecture 13) is not on the midterm, so it is left off. If you run out of room, drop sections in this order: the HTTP lines, the reader's API advice list, the coverage example numbers, the test-levels table.

## Side 1 · Module 1 and testing

### How to answer (top of the sheet)
- Critique question: name the term, then the cost it imposes on the next change (footprint, magnitude, risk), then the lever by its reader name, then what the fix costs.
- Never say "bad design" without naming the cost. Every question is "what does the next change cost, where does the cost come from, which lever lowers it".
- True or false: verdict first, then one sentence with the exact term, then the rule or counterexample it rests on.
- Lab stems to expect: degree, connascence type, how you would find out (compile error or runs wrong); data, logic or order binding; controllability, observability; precondition, postcondition.
- Cost of a change: magnitude is how big (lines); footprint is how widespread (methods, classes, files, modules, services). The risk is missing part of the footprint.

### Coupling
- Coupling is the relationship between components, formed by dependencies (imports, calls, shared data, assumptions). It produces footprint. Loosen it, never try to remove it.
- Explicit dependency: the compiler sees it, so a missed site is a build error. Implicit: only shows at run time (string keys, `switch (field)`, rows parsed by position, literals in tests). Tell: "if I change this, what tells me?" If nothing until it runs, implicit.

| Axis | Question | Lever |
|---|---|---|
| Degree | How many components share it? | Fewer shared interfaces |
| Locality | How far apart do they sit? | Pull shared code into one module |
| Strength (connascence) | How much effort to change it? | Move up the table toward Name |

| Connascence | Must agree on | Example | Missed site |
|---|---|---|---|
| Name | What it is called | rename `findUserById` | compile error |
| Type | Shape of the data | add required `age` field | compile error |
| Value | Meaning of a literal | `1.25` in two files, `"+25%"` in a third | runs, wrong |
| Position | An ordering | `createInvoice(total, tax)` swapped | compiles, silently wrong |
| Algorithm | Same computation same way | encoder here, decoder there | runs, wrong |

- Name and Type fail at compile time; Value, Position and Algorithm fail at run time, so you find the footprint by hand.
- On the exam: same literal in several files is Value; a long list of same-typed arguments is Position; two components implementing halves of one protocol is Algorithm. A `switch` per variant in each client is Algorithm; an interface drops it to Type; one interface instead of one per source drops Degree.

### Cohesion
- Cohesion is the relationship within one unit: how focused it is on one complete task. Low cohesion makes a change difficult (work out what the unit does first) and risky (an edit disturbs unrelated code). High cohesion means more, smaller classes, and that is the intended trade.

| Binding | Two statements that | Example |
|---|---|---|
| Data | read or write the same data | total, min, max from one `readings` array |
| Logic | sit in the same branch and run because it held | delete cache file and send "cache cleared" email |
| Order (reader: timing) | must run in a fixed sequence | logger, config, database, server |

- A pair with several bindings belongs together; a statement sharing nothing with its neighbours moves out first. Class tell: a field used by only two methods belongs with them, elsewhere.

### Refactoring and debt
- Refactoring is a predictable, meaning-preserving (behaviour-preserving) transformation. No feature, no fix.
- Process: tests pass, examine coupling and cohesion, pick one refactoring, apply, tests pass again, repeat. Tests run twice so a later failure can only be the refactoring.
- Do not refactor when tests fail, when a rewrite is right, near a deadline, or while fixing a bug (a fix changes behaviour on purpose; mixing hides which change did what). Never on a schedule: on a smell, around a feature, in review.
- Catalogue: rename, move, extract method, extract interface, extract class, pull up, push down, replace magic number or string with constant, replace inheritance with delegation.
- Reader examples: `Invoice.printOwing()` banner plus sum shared logic and order but no data, so Extract Method into `getOwing()`. `RoomsParser` and `CourseProcessor` had matching shapes, so Extract Interface `IParser`, coupling drops to Type.
- Three signs a change is hard, each with its abstraction: same change in several places (consolidate), collides with a teammate (split the tangle), too obscure (make it readable). Rule of three: do it, note the duplicate, refactor on the third. Early abstraction can hurt.
- Technical debt is the extra cost of changing later because of earlier shortcuts; it compounds like interest. Not all debt is bad; bad debt slows the team or raises risk.

| Smell | Coupling it creates | Fix |
|---|---|---|
| Feature envy (method wants another class's fields; Law of Demeter tell is a long chain `a.b.c.d()`) | to that class's internals | move the behaviour there: `fido.beChased()` |
| Magic values | connascence of Value | named constant |
| Almost-duplicate code | connascence of Algorithm | pull up the shared part; a sequence with one varying step becomes a template method |

### Testability
- Controllability: the degree to which a test can set the inputs and state the code depends on. Lowered by hidden inputs (clock, randomness), global or shared state, dependencies the code constructs itself (`new SmtpClient()`), hard preconditions. Raised by passing inputs and dependencies in as parameters.
- Observability: the degree to which a test can inspect results and effects. Lowered by output only printed, intermediate values never returned, private state, effects on external systems. Raised by returning values.
- Reader adds isolateability (locate a fault inside the unit; controllability plus observability give it) and automatability.
- Deck example: `printStatus()` writes to `console.log` (unobservable) and reads `Date.now()` itself (uncontrollable). Fix: pass the clock in, return the string.
- Contract: REQUIRES (preconditions), MODIFIES, EFFECTS (postconditions). Write the test from the contract first as Given, When, Then; it shows which state the class must expose (`Animal` needed `isHungry()` and `amountEaten()`). TDD: red, green, refactor.

### Doubles, DIP, LSP
- Double a dependency only when it is uncontrollable (bank, clock), unobservable (cannot see what was sent) or unsafe or slow (money, network). Fast, deterministic, side-effect free: use the real thing.
- DIP: depend on abstractions, not implementations. `buyCoffee` takes an `IReader`; the real reader and the test's reader both implement it. That is what makes a double possible.
- Stub controls what comes back (approving reader, declining reader): controllability. Spy records what was sent (recording reader): observability. One object can be both (`FakeLocator`). Reader's generic word: fake.
- Compiling is not enough: any object with `charge(): boolean` compiles as an `IReader`, but types check shape, not contract.
- LSP: a property provable about objects of type T holds for objects of any subtype S. A subclass must not break the superclass's promises. A double is a subtype of the interface, so LSP decides whether it is valid.
- LSP methods rule: for the same inputs a subtype must not strengthen preconditions (widening is fine) and must not weaken postconditions (narrowing is fine). Penguin needs height under 50 cm: stronger precondition. Setting width also changes height: weakened postcondition.
- Costs of doubles: another layer; doubles drift and must be updated when the interface changes; the real implementation still needs its own tests.

### Suites, partitions, coverage
- Strong suite: right inputs (every spec behaviour), precise checks (would notice a wrong answer), reliable results (deterministic, doubles for the rest), covers most behaviour.
- Build order: requirements; stubs with specifications; behavioural tests against the specs; implement until green; measure the suite (coverage, mutants); then structural tests. Spec tests test only the spec.
- Equivalence class partitioning is black-box, from the spec. Input domain: parameter type, narrowed by preconditions, split valid and invalid. Output range: return type plus documented errors, split by postconditions into normal and error. One value per class; one value can cover an input class and an output class. Then boundaries: one value each side of every edge (`>=` written as `>`).
- `getLetterGrade` 0 to 100: input 1 valid and 2 invalid, output 5 normal and 1 error, 9 classes; picks -10, 25, 52, 60, 72, 90, 110; boundaries -1 and 0, 49 and 50, 54 and 55, 67 and 68, 79 and 80, 100 and 101. `"80"` and `null` are outside the type, not tested.
- Partition both views because they diverge when an output depends on a combination of inputs.
- Coverage: line, statement (every statement on the line), branch (each outcome of each decision), path (every combination). Two independent ifs, one test: 67% line, 50% branch, 25% path; 100% takes 1, 2, 4 tests. Limits: no correctness check, fooled by assertion-free tests, ignores the input space, thresholds gamed. ECP says what to test; coverage says what ran.

| Level | Where | How many | Trade |
|---|---|---|---|
| Unit | within a boundary, doubles for dependencies | most | fast, localizes faults, only isolation |
| Integration | between boundaries, real adapter on a real resource (temp file) | several per boundary | bridges the two |
| End-to-end | across boundaries, as used | a few | real assurance, poor localization, many reasons to fail, expensive |

- Test at the narrowest level that can see the bug.

### HTTP (Lab 1)
- 2XX worked (200, 201 Created, 204), 4XX client's fault (400 malformed request, 404 missing, 422 well-formed but invalid), 5XX server failed. PUT is idempotent (resend, same state); POST is not. A missing `await` returns a pending Promise and the error escapes.

## Side 2 · Patterns, boundaries, APIs, TypeScript

### Pattern analysis
- A design pattern is a tried and true solution to a recurring design problem, what emerges when you keep a likely change local. Not a diagram to copy, not a library, not a rule. Structural (Adapter, Composite, Decorator), creational, behavioural (State).
- Four questions, all four every time: Change (which decision varies), Pain (does it scatter, a coupling problem, or tangle, a cohesion problem), Mechanism (abstraction that gives it one home; polymorphism so callers stay oblivious; the trigger that calls it), Cost (indirection added, worth it?).
- Help when change is likely, variability exists, coupling hurts. Hurt when requirements are stable, one concrete case, abstraction costs more than the benefit.

| Pattern | Intent | Mechanism | Cost |
|---|---|---|---|
| Adapter | convert an interface into the one clients expect | `MusicSource.getRecords()`, one adapter per platform, report loops over `MusicSource[]` | one class per platform; shared record carries only fields every platform has |
| Composite | compose objects into trees, treat one and many uniformly | Component interface; Leaf answers for itself; Composite holds components and asks each (`Manager.getTotalSalary()` sums reports) | one class per role; new operation touches the interface and every class |
| Decorator | attach behaviour to one object at run time | decorator is a Component and has a Component; call enters the outermost wrapper, each changes the inner answer: `new Large(new Whip(new Latte()))` | one class per add-on; order changes the result and cannot be enforced; wrappers cannot see each other; `instanceof` breaks |
| State | object changes behaviour with its state, an OO state machine | `PhoneState` interface; context holds one state and forwards every event; each state handles every event and calls `setState()` | one class per state; transitions spread out; new event touches every state; `setState()` public |

- Adapter changes the interface, keeps behaviour. Decorator keeps the interface, changes behaviour. Composite keeps the interface, holds many in a tree. Decorator order: 400 latte, large times 1.2 outside a 100 shot gives 600, inside gives 580.
- OCP: open for extension, closed for modification, by depending on an abstraction and adding a new implementation. Every pattern is open to new implementations, closed to new operations.

| Pattern | Cheap (one new class) | Expensive (every class) |
|---|---|---|
| Adapter | new music service | new query on `MusicSource` |
| Composite | new role | new operation (average salary) |
| Decorator | new add-on | new property (calories) |
| State | new state | new button |

- Before adding an extension point: what will vary, what must stay stable for dependants, is the variation really likely. Each one costs an interface, a dispatch, more classes.

### Boundaries
- Business logic: the rules that make the system worth having; changes when the business changes. Everything else moves data in and out (files, DB, UI, services, logging, caching, auth); changes when the world outside changes.
- Core holds business logic, imports nothing from outside, does no I/O. Edges hold I/O, parsing, validation, config such as paths, services.
- Port: an interface the core owns, in the core's terms (`BookingStore`). Adapter: implements the port with real resources (`JsonBookingStore`). `main.ts` picks the adapter. Every dependency points inward (DIP). Unlike lecture 8's Adapter, the port belongs to the core, so a storage change cannot leak in.
- Mixing costs: every change risks the others; no job testable alone; no job reusable alone. SRP: one reason to change. After the split a file rename touches the adapter, a new rule touches the core (plain-object unit tests), a new frontend is a new edge calling `book()`.
- Tests follow the parts: many unit with a fake store, a few integration with a temp file, one or two end-to-end through `main.ts`.

### API design and change severity
- An API is how programs communicate. APIs are forever: once published it is a dependency for many clients. Internals change freely; the surface rarely, never breaking.
- Start with the task: what should be easy, what sequence feels natural, what mistakes should it prevent.

| Principle | Ask of the fragment |
|---|---|
| Information hiding | internal state or structure exposed? |
| Obliviousness | must the caller know the implementation to use it right? |
| Easy to use, hard to misuse | can the types prevent wrong order or bad arguments? |
| Contract completeness | do signatures and JSDoc say what can go wrong and what callers can rely on? |

- Reader's advice: do one thing; stay small (hard to shrink later); short parameter lists; return descriptive objects, not primitives; errors in the API's own terms; immutable return values; design for the developer.

| Severity | Client must | Example |
|---|---|---|
| MAJOR | change code | remove a method, change a parameter type, throw where it returned |
| MINOR | nothing; new compatible functionality, structural | new method, optional parameter |
| PATCH | nothing; compatible behavioural improvement | bug fix, performance (deck) |
| NONE | nothing | refactoring |

- Semver Major.Minor.Patch: bump the most severe, reset below. 3.8.1 then fix 3.8.2, optional parameter 3.9.0, breaking 4.0.0.
- `checkout(book, duration: number)` to a `Duration` object breaks at compile time; reinterpreting the number as weeks keeps the signature and breaks at run time, worse. Non-breaking routes: union `number | Duration`, new method, new parameter with a default. A defect fix is breaking when clients rely on the defect. Performance: deck says PATCH, reader says minor; structural opt-in is minor, behavioural nothing-to-change is patch.

### TypeScript syntax
```ts
interface Drink { getDescription(): string; getPriceCents(): number; }
class Latte implements Drink {
  getDescription() { return "latte"; }
  getPriceCents() { return 400; }
}
class Whip implements Drink {                      // Decorator: is a Drink, has a Drink
  constructor(private inner: Drink) {}             // declares and assigns the field
  getDescription() { return this.inner.getDescription() + ", whip"; }
  getPriceCents()  { return this.inner.getPriceCents() + 75; }
}
abstract class Report {                            // Template method: parent owns the order
  public print(): void { console.log("==="); this.body(); console.log("==="); }
  protected abstract body(): void;
}
class Csv extends Report { protected body() { console.log("a,b"); } }
interface Employee { getTotalSalary(): number; }   // Composite
class Manager implements Employee {
  private reports: Employee[] = [];
  constructor(private salary: number) {}
  add(e: Employee): void { this.reports.push(e); }
  getTotalSalary() { return this.salary + this.reports.reduce((s, e) => s + e.getTotalSalary(), 0); }
}
interface PhoneState { press(p: Phone): void; call(p: Phone): void; }   // State
class Phone {
  private state: PhoneState = new Locked();
  setState(s: PhoneState) { this.state = s; }
  press() { this.state.press(this); }
}
class Locked implements PhoneState {
  press(p: Phone) { p.setState(new Unlocked()); }
  call(p: Phone) { throw new Error("locked"); }
}
interface BookingStore { load(): Promise<Booking[]>; save(b: Booking[]): Promise<void>; }  // port
class FakeStore implements BookingStore {           // stub and spy in one
  public saved: Booking[][] = [];                   // spy: records what was sent
  constructor(private data: Booking[]) {}           // stub: controls what comes back
  async load() { return this.data; }
  async save(b: Booking[]) { this.saved.push(b); }
}
class NotFound extends Error { constructor(id: string) { super(`no item ${id}`); } }
async function book(req: Request, store: BookingStore, now: () => Date): Promise<Booking> {
  const all = await store.load();
  if (all.some((b) => overlaps(b, req))) throw new DoubleBooked(req.room);
  return { ...req, at: now() };
}
```
- Types: `string number boolean void`, `T[]`, union `number | Duration`, optional `limit?: number`, default `limit = 10`, literal `"asc" | "desc"`, `type Row = { id: string; n: number }`, `Map<string, number>`, `Record<string, number>`, generic `function first<T>(xs: T[]): T | undefined`.
- Guards: `x instanceof Foo`, `typeof x === "string"`, `x === undefined`, `a?.b`, `a ?? fallback`.
- Arrays: `.map((x) => x * 2)`, `.filter`, `.reduce((acc, x) => acc + x, 0)`, `.find`, `.some`, `.every`, `.forEach`, spread `[...xs, y]`, `{ ...obj, k: v }`, destructure `const { id, name } = user;`.
- `async f(): Promise<T>` and `await`; `Promise.all([...])`; a forgotten `await` yields a pending Promise (always truthy) and the rejection escapes.
- Test shape (mocha, chai):
```ts
describe("book", () => {
  it("rejects a double booking", async () => {        // Given, When, Then
    const store = new FakeStore([existing]);
    try { await book(req, store, () => new Date(0)); expect.fail("should throw"); }
    catch (e) { expect(e).to.be.instanceOf(DoubleBooked); }
    expect(store.saved).to.have.length(0);
  });
});
```
- Terms the marker looks for: footprint, magnitude, connascence of Name, Type, Value, Position, Algorithm, degree, locality, strength, data, logic, order binding, controllability, observability, stub, spy, DIP, LSP, precondition, postcondition, equivalence class, boundary, branch coverage, scatter, tangle, abstraction, polymorphism, closed axis, port, adapter, SRP, information hiding, obliviousness, MAJOR, MINOR, PATCH.
