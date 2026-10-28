# CPSC 310 — Midterm cheat sheet (Thu Oct 29, 19:00, HEBB 100)

One 8.5 by 11 sheet, handwritten, both sides. Every question is over code you have not seen and asks what is wrong, what you would change, and why. So the sheet is built for that: the recipe for each question type, a diagnosis table you scan for the tell in the code, one worked example per type, then compact reference tables and code skeletons. Lay it out in that order with a ruler line between zones. REST (lecture 13) is not on the midterm. If you run short of room, drop zone 6 first, then the HTTP lines, then the syntax list.

## Side 1

### Zone 1 · Recipes, one per question type

**True or false, and justify.**
1. Verdict.
2. The rule, in the reader's words.
3. The case that decides it: a counterexample if false, the mechanism if true.

**What is wrong here, what would you change, why.**
1. Find the tell in the diagnosis table.
2. Name it with the exact term.
3. Name the cost: what the next change costs (footprint across files, found by hand because the compiler cannot see it) or the risk it adds.
4. Name the fix by its catalogue name and write two or three lines of it.
5. One line on what the fix costs (an interface, more classes).

**Which pattern, is it a good fit.**
1. Change: which decision varies.
2. Pain: scatter (coupling, one edit per place) or tangle (cohesion, mixed with unrelated code).
3. Mechanism: the abstraction, who calls it without knowing the concrete type, what triggers the call.
4. Cost: the indirection added, and the closed axis (new implementation cheap, new operation expensive).
5. If requirements are stable or there is one concrete case, say the pattern hurts.

**Why is this hard to test, make it testable.**
1. Controllability: which input or dependency the code gets for itself (clock, random, `new`, a global).
2. Observability: which result only leaves as a print or a side effect.
3. Fix: parameters in, values out; an interface plus constructor injection (DIP).
4. Double: stub controls what comes back, spy records what was sent.
5. The double must keep the interface's contract, not just its shape (LSP).

**Partition this function.**
1. Input: parameter type, narrowed by preconditions, split valid and invalid.
2. Output: return type plus thrown errors, split normal and error.
3. One value per class; one value may cover an input class and an output class.
4. A boundary pair on each side of every edge.
5. Count the classes.

**Severity and next version.**
1. For each change ask what the client must do: change code is MAJOR; nothing, new feature is MINOR; nothing, behaviour improves is PATCH; nothing at all is NONE.
2. Bump the worst, reset the numbers below it.

### Zone 2 · Diagnosis table: you see, it is, it costs, do this

| You see in the code | It is | It costs | Do this |
|---|---|---|---|
| The same literal (`1.25`, `"+25%"`, a URL) in several files | connascence of Value, a magic value | runs wrong when one copy changes; found by hand | one named constant (replace magic number) |
| Several arguments of one type; a call site has them swapped | connascence of Position | compiles, silently wrong | a parameter object with named fields (drops to Type) |
| `switch (kind)` or `if (type === "x")` repeated in several clients | connascence of Algorithm, duplicated dispatch | every new kind edits every switch | an interface and one class per kind (Adapter, State, Decorator); clients drop to Type |
| An encoder here and a decoder there; two copies of one rule | connascence of Algorithm, almost-duplicate code | both must change together and nothing says so | pull up or extract method; a shared sequence with one varying step becomes a template method |
| String keys, rows parsed by position, literals inside tests | implicit dependency | nothing fails until it runs | make it explicit with types and named fields |
| Many components import the same thing | high degree | one change, many edits | fewer shared interfaces; one interface instead of one per source |
| The same agreement kept in two modules or services | poor locality | footprint crosses the boundary | pull the shared code into one module |
| `a.b.c.d()` chains; a method uses another class's fields | feature envy, Law of Demeter | coupled to that class's internals | move the method there: `fido.beChased()` |
| A method whose statements share no data, logic or order binding | low cohesion | change is hard to understand and risky | extract method or extract class; the statement with no binding moves out |
| A field used by two of ten methods | low class cohesion | unrelated code moves together | extract a class around that field and those methods |
| `new SmtpClient()`, `Date.now()`, `Math.random()`, a global, inside the method | uncontrollable | a test cannot set the input | pass it in as a parameter or through the constructor; interface plus stub |
| Only `console.log`, a file write, or `void` | unobservable | a test cannot assert | return the value; spy on the dependency |
| A subclass throws for inputs the parent accepts, or has extra effects | LSP violation: stronger precondition or weaker postcondition | callers written for the parent break | do not subclass, or make the subclass accept at least as much |
| A double returns `undefined` where the interface promises a throw | LSP violation: shape without contract | tests pass, code is wrong | make the double honour EFFECTS |
| The core imports `fs`, `express` or `axios`; parsing sits inside the rule | boundary leak, SRP broken | a storage change edits the rule; the rule cannot be unit tested | a port interface in the core, an adapter at the edge, `main.ts` wires them |
| An API exposes internal arrays or fields; the caller must call in an order | information hiding, easy to misuse | clients couple to internals, and APIs are forever | return immutable results; make the wrong order impossible with types |
| A public method removed or renamed; a parameter type changed | MAJOR change | every client edits code | add beside it and deprecate; a union type or a defaulted parameter instead |
| Refactoring while tests are red, or inside a bug fix | process error | cannot tell which change broke it | green first; fix, then refactor; tests before and after |

### Zone 3 · Worked examples, one per type

- True or false: "a good time to refactor is while fixing a bug". False. A refactoring preserves behaviour and a bug fix changes it on purpose, so a later failure cannot be attributed to either. Fix, get green, then refactor.
- Critique: `applyDiscount(0.15, price)` compiles and the tests pass. Connascence of Position: both arguments are numbers and their order is the agreement. The type checker sees number, number and cannot object. Fix: `applyDiscount({ price, pct })`, which drops it to Type, so a swap is a compile error.
- Pattern: `Group` holds a `Shape[]` and `area()` sums the members. Composite: Component is `Shape`, Leaf is `Circle`, Composite is `Group`. Adding `Triangle` is one class, cheap. Adding `perimeter()` touches the interface and every class, expensive.
- Test: `sendReminder(id)` builds an email and calls `new SmtpClient().send(e)`. Uncontrollable because it constructs its own client; unobservable because nothing is returned. Fix: `sendReminder(id, mailer: Mailer)` and a `SpyMailer` with `sent: Email[]`; assert on `sent[0]`.
- Partition: a percentage 0 to 100 returns fail below 50, pass from 50 to 84, distinction from 85, and throws outside. Input: 1 valid, 2 invalid. Output: 3 normal, 1 error. Boundaries: -1 and 0, 49 and 50, 84 and 85, 100 and 101.
- Severity: version 2.4.3. `search()` gains an optional `limit`: MINOR. An unstable sort becomes stable: PATCH. `delete(id)` throws instead of returning false: MAJOR. Result 3.0.0.

## Side 2

### Zone 4 · Reference tables

| Connascence | Agree on | Missed site |
|---|---|---|
| Name | what it is called | compile error |
| Type | shape of the data | compile error |
| Value | meaning of a literal | runs wrong |
| Position | an ordering | compiles, wrong |
| Algorithm | same computation | runs wrong |

- Coupling axes: degree (how many share it), locality (how far apart), strength (connascence, how hard to change). Loosen, never remove.
- Bindings: data (same data), logic (same branch), order (fixed sequence). Several bindings means keep together.

| Pattern | Intent | Shape | Cheap | Expensive |
|---|---|---|---|---|
| Adapter | foreign interface into the one clients expect | one adapter per source behind one interface | new source | new query on the interface |
| Composite | tree, one and many treated alike | Component, Leaf, Composite holds components | new role | new operation |
| Decorator | add behaviour to one object at run time | is a Component and has a Component | new add-on | new property |
| State | behaviour changes with state | context holds one state, forwards every event; states call `setState()` | new state | new event |

- Adapter changes the interface and keeps behaviour. Decorator keeps the interface and changes behaviour. Composite keeps the interface and holds many. Decorator order matters: large times 1.2 outside a 100 shot on a 400 latte is 600, inside it is 580.
- OCP: open for extension, closed for modification, by depending on an abstraction. Before adding an extension point: what will vary, what must stay stable, is the variation likely.
- Pattern costs to quote: one class per variant; Decorator order cannot be enforced and `instanceof` breaks; State transitions spread out and `setState()` is public; Composite and Adapter make a new operation expensive.

| Testing list | Items |
|---|---|
| Strong suite | right inputs, precise checks, reliable results, covers most behaviour |
| Build order | requirements, stubs with specs, behavioural tests, implement to green, measure (coverage, mutants), structural tests |
| Coverage | line, statement, branch, path; two independent ifs and one test give 67, 50, 25 percent; full needs 1, 2, 4 tests |
| Coverage limits | no correctness, fooled by assertion-free tests, ignores the input space, thresholds gamed |
| Levels | unit within a boundary with doubles (most); integration between boundaries on a real resource (several per boundary); end-to-end across (a few, poor fault localization) |
| Double when | uncontrollable, unobservable, unsafe or slow; otherwise use the real thing |
| Double costs | another layer, drift from the real thing, the real one still needs tests |

- LSP: a property provable of type T holds for any subtype S. Methods rule: no stronger preconditions, no weaker postconditions, for the same inputs.
- Contract: REQUIRES, MODIFIES, EFFECTS. Test from the contract first as Given, When, Then. TDD: red, green, refactor.
- Refactoring: meaning-preserving, no feature, no fix; tests twice. Not when tests fail, when rewriting, near a deadline, during a bug fix. Rule of three. Signs a change is hard: same edit in several places, collides with a teammate, too obscure. Debt is interest on a shortcut.

| Severity | Client must | Example |
|---|---|---|
| MAJOR | change code | remove a method, change a type, throw where it returned |
| MINOR | nothing, new feature | new method, optional parameter |
| PATCH | nothing, behaviour improves | bug fix, performance (deck) |
| NONE | nothing | refactoring |

- Semver: 3.8.1 then a fix 3.8.2, an optional parameter 3.9.0, a breaking change 4.0.0. A defect fix is breaking when clients rely on the defect. `checkout(book, duration: number)` to a `Duration` object breaks at compile time; reinterpreting the number as weeks breaks at run time, worse; non-breaking routes are a union `number | Duration`, a new method, or a defaulted parameter.
- API principles: information hiding, obliviousness, easy to use and hard to misuse, contract completeness. Reader: do one thing, stay small, short parameter lists, return objects not primitives, errors in the API's terms, immutable results, design for the developer.
- Boundaries: business logic is the rules that make the system worth having; the core holds it, imports nothing, does no I/O; edges do I/O, parsing, validation, config. A port is an interface the core owns in its own terms; an adapter implements it with real resources; dependencies point inward. Mixing costs: every change risks the others, nothing testable alone, nothing reusable alone. SRP: one reason to change.
- HTTP (Lab 1): 2XX worked (200, 201 Created, 204), 4XX client's fault (400 malformed, 404 missing, 422 well-formed but invalid), 5XX server failed. PUT is idempotent, POST is not. A missing `await` returns a pending Promise and the error escapes.

### Zone 5 · Code skeletons

```ts
interface Drink { getDescription(): string; getPriceCents(): number; }
class Whip implements Drink {                        // Decorator: is a Drink, has a Drink
  constructor(private inner: Drink) {}               // declares and assigns the field
  getDescription() { return this.inner.getDescription() + ", whip"; }
  getPriceCents()  { return this.inner.getPriceCents() + 75; }
}
abstract class Report {                              // Template method: parent owns the order
  print(): void { console.log("==="); this.body(); console.log("==="); }
  protected abstract body(): void;
}
class Manager implements Employee {                  // Composite node
  private reports: Employee[] = [];
  constructor(private salary: number) {}
  add(e: Employee): void { this.reports.push(e); }
  getTotalSalary() { return this.salary + this.reports.reduce((s, e) => s + e.getTotalSalary(), 0); }
}
interface PhoneState { press(p: Phone): void; }     // State
class Phone {
  private state: PhoneState = new Locked();
  setState(s: PhoneState) { this.state = s; }
  press() { this.state.press(this); }
}
class Locked implements PhoneState { press(p: Phone) { p.setState(new Unlocked()); } }
interface BookingStore { load(): Promise<Booking[]>; save(b: Booking[]): Promise<void>; }  // port
class FakeStore implements BookingStore {            // stub and spy in one
  public saved: Booking[][] = [];                    // spy: what was sent
  constructor(private data: Booking[]) {}            // stub: what comes back
  async load() { return this.data; }
  async save(b: Booking[]) { this.saved.push(b); }
}
class NotFound extends Error { constructor(id: string) { super(`no item ${id}`); } }
async function book(req: Request, store: BookingStore, now: () => Date): Promise<Booking> {
  const all = await store.load();
  if (all.some((b) => overlaps(b, req))) throw new DoubleBooked(req.room);
  return { ...req, at: now() };
}
describe("book", () => {
  it("rejects a double booking", async () => {       // Given, When, Then
    const store = new FakeStore([existing]);
    try { await book(req, store, () => new Date(0)); expect.fail("should throw"); }
    catch (e) { expect(e).to.be.instanceOf(DoubleBooked); }
    expect(store.saved).to.have.length(0);
  });
});
```

- Syntax: `T[]`, union `number | Duration`, optional `limit?: number`, default `limit = 10`, `type Row = { id: string; n: number }`, `Map<string, number>`, generic `function first<T>(xs: T[]): T | undefined`, `x instanceof Foo`, `typeof x === "string"`, `a?.b`, `a ?? fallback`, `.map`, `.filter`, `.reduce((acc, x) => acc + x, 0)`, `.find`, `.some`, spread `[...xs, y]` and `{ ...obj, k: v }`, `const { id } = user;`, `async f(): Promise<T>` with `await`, `Promise.all([...])`.

### Zone 6 · Terms in one line each

- Footprint: how many places a change touches. Magnitude: how big it is.
- Coupling: the relationship between components through dependencies; it produces footprint. Cohesion: how focused one unit is on one task.
- Connascence: what two pieces of code must agree on; the strength axis of coupling. Binding: what two statements share (data, logic, order).
- Refactoring: a predictable, meaning-preserving transformation. Technical debt: the extra cost of changing later because of an earlier shortcut.
- Controllability: can a test set the inputs and state. Observability: can a test inspect the results and effects. Isolateability: can a fault be located inside the unit.
- Test double: a stand-in for a dependency. Stub: controls what comes back. Spy: records what was sent. Fake: the reader's generic word.
- DIP: depend on abstractions, not implementations. LSP: a subtype must keep the supertype's promises.
- Precondition: what REQUIRES of the caller. Postcondition: what EFFECTS promises.
- Equivalence class: inputs the spec treats alike. Boundary: a value on each side of an edge. Coverage: how much code the tests ran.
- Design pattern: a tried and true solution to a recurring design problem. Scatter: coupling pain. Tangle: cohesion pain. Closed axis: the kind of change a pattern makes expensive.
- Port: an interface the core owns. Adapter: its implementation on real resources. SRP: one reason to change.
- Information hiding: callers cannot see internals. Obliviousness: callers need not know the implementation. Semver: Major.Minor.Patch.
