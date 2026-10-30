# CPSC 310 midterm cheat sheet

How to use it: find the words from the question in the table, go to that block, do the steps in order, and write what the block says to write.

| If the question says | It's a | Block |
|---|---|---|
| "controllability", "observability", "Lower / Same / Higher" | testability compare | A |
| "marked line", "(A)", "limits your ability to test" | testability per line | B |
| "make it testable", "stub", "spy", "mock", "test double" | make it testable | C |
| "equivalence class", "partition", "boundary value" | partitions | D |
| "line / statement / branch / path coverage", "how many tests" | coverage | E |
| "which pattern", "identify the pattern", a story about adding new kinds | pick the pattern | F |
| "is it a good fit", "downside", "trade-off", "what is expensive" | pattern cost | G |
| two line numbers and "Data", "Logic", "Order" | cohesion bindings | H |
| "precondition", "postcondition", "violates LSP", `extends` | LSP | I |
| "Major", "Minor", "Patch", "None", a version number, "rewrite as Minor" | versioning | J |
| "information hiding", "obliviousness", "misuse", "contract completeness" | API principles | K |
| "Compare X and Y", "Degree", "Strength", "connascence" | coupling | L |

## A. Testability compare (Lower / Same / Higher)

1. Controllability: list where each method gets its inputs. `new Date()`, `Math.random()`, a global, a database, or `new Something()` inside the method means the test can't choose that input.
2. The method with more of those is **Lower**. Same list: **Same**.
3. Observability: look at what each method gives back. Returns the result: good. Only `console.log`, `void`, saves to a file, database or private field: bad.
4. The bad one is **Lower**. Both return: **Same**.
5. Demonstrate: one test per class, same inputs. Write the checks below.

```ts
expect(good.greet("Matt", 9)).to.equal("Good morning, Matt!");
expect(clock.greet("Matt")).to.be.oneOf(["Good morning, Matt!", "Good afternoon, Matt!", "Good evening, Matt!"]);  // hidden input
expect(printer.render(["a"], 2)).to.be.undefined;                                                                 // void
```

## B. Testability per marked line

For each marked line, answer two True/False:

1. Controllability limits it? Read every `if` above the line. Can you make each one true with arguments you pass in? If one needs a real database row, the clock or randomness: **True**. Otherwise **False**.
2. Observability limits it? Look at the line. `return something`: **False**. Writes to a file, a log, a database, a module-level variable or a private field: **True**.
3. "Write a test for the lines neither limits": call the method until you reach that line, then `expect` the return value.

## C. Make it testable / test doubles

Before: the test can't choose the hour, and a real email gets sent that the test can't see.

```ts
class Reminder {
  run(): void {
    const hour = new Date().getHours();                 // hidden input
    new SmtpMailer().send(`Reminder for ${hour}:00`);   // hidden output
  }
}
```

1. Hidden input (`new Date()`, `Math.random()`, a global): make it a constructor parameter.
2. Hidden output (`new X().send`, a print, a save): make an interface for it and pass it in through the constructor. Or just `return` the value.
3. Real code passes the real things: `new Reminder(new SmtpMailer(), () => new Date())`.

After:

```ts
interface Mailer { send(m: string): void; }

class Reminder {
  constructor(private mailer: Mailer, private now: () => Date) {}
  run(): void {
    const hour = this.now().getHours();
    this.mailer.send(`Reminder for ${hour}:00`);
  }
}
```

4. Test: pass a **stub** for the input, a fake that always gives the value you chose. Pass a **spy** for the output, a fake that writes down what it was given.
5. Check what the spy wrote down.

```ts
class SpyMailer implements Mailer {
  sent: string[] = [];
  send(m: string) { this.sent.push(m); }
}

const spy = new SpyMailer();
const stubClock = () => new Date(2026, 9, 29, 9);   // always 9:00
new Reminder(spy, stubClock).run();
expect(spy.sent[0]).to.equal("Reminder for 9:00");
```

## D. Partitions and boundary values

Equivalence partitions:

1. Input partitions: read the input line. Valid range, below it, above it.
2. Output partitions: one per different return value, plus one per throw.
3. Any value inside a partition is a correct test case for it.

Boundary values:

1. "On the input partitions": the edges are the ends of the input range only, like 0 and 100.
2. "On the output partitions": the edges are every cutoff in the returns, like 50, 55, 68, 80.
3. For each edge N, the boundary tests are N - 1, N and N + 1. Edge at 55: 54, 55, 56.
4. A value in the middle of a partition, like 72, is **not** a boundary test.

True/False facts:

- Boundary values work on strings and arrays too, by length: 0, 1, 2. "Only numbers" is **False**.
- Partitions plus boundaries give 100% path coverage: **False**. They come from the spec, not the code.
- Boundary analysis includes values just inside the boundary: **True**.

## E. Coverage

1. Look at how the `if`s are written. There are two shapes.

```ts
// Separate ifs: each one runs on its own, both can be true
if (a) x++;
if (b) y++;

// A chain: only one branch ever runs
if (a) x++;
else if (b) y++;
else z++;
```

2. Read the number of tests off the table.

| Code | Line or statement | Branch | Path |
|---|---|---|---|
| 2 separate `if`s, no `else` | 1 | 2 | 4 |
| 3 separate `if`s, no `else` | 1 | 2 | 8 |
| 1 chain with 3 branches | 3 | 3 | 3 |

- Separate `if`s: line needs 1 test with everything true. Branch needs everything true once and everything false once. Path is 2 times 2 for each `if`.
- A chain: every column is the number of branches, because one test can only go down one branch.

## F. Pick the pattern

From a story, match the words:

| Words in the story | Pattern |
|---|---|
| third-party library, old API, different method names, convert units | Adapter |
| tree, folders and files, groups inside groups, total of everything under it | Composite |
| add-ons, toppings, extras, wrap, stack features at run time | Decorator |
| mode, status, locked or unlocked, behaves differently depending on, `switch (this.state)` | State |

From code, look at what the field holds:

| The class implements the interface and holds | Pattern | Roles |
|---|---|---|
| a different class with the wrong methods | Adapter | interface, adapter, adaptee |
| an **array** of its own interface | Composite | Component, Leaf, Composite |
| **one** of its own interface | Decorator | Component, concrete component, decorator |
| a state object, plus a `setState` | State | Context, State, concrete states |

Then write the skeleton, swapping in their names:

```ts
class OldApiAdapter implements Weather {             // Adapter
  constructor(private api: OldWeatherApi) {}
  tempC(city: string) { return (this.api.getF(city) - 32) * 5 / 9; }
}
class Manager implements Employee {                  // Composite
  private reports: Employee[] = [];
  constructor(private salary: number) {}
  add(e: Employee) { this.reports.push(e); }
  getTotalSalary() { return this.salary + this.reports.reduce((s, e) => s + e.getTotalSalary(), 0); }
}
class Whip implements Drink {                        // Decorator
  constructor(private inner: Drink) {}
  getPriceCents() { return this.inner.getPriceCents() + 75; }
}
class Phone {                                        // State (context)
  private state: PhoneState = new Locked();
  setState(s: PhoneState) { this.state = s; }
  press() { this.state.press(this); }
}
class Locked implements PhoneState {                 // a concrete state
  press(p: Phone) { p.setState(new Unlocked()); }
}
```

## G. Pattern cost and fit

Write these four lines, filled in:

1. Cheap: adding a new **[kind]** is one new class.
2. Expensive: adding a new method to the interface means editing every class.
3. Cost: more classes and one more layer to read through.
4. If there's only one kind and it won't change: "the pattern is overkill".

Extra costs to name if asked:

- Decorator: the order of add-ons can't be enforced.
- State: `setState` is public, and the transitions are spread over many classes.

## H. Cohesion: Data, Logic, Order for two lines

1. **Data**: circle the variables in each line. Same variable, or same object even with a different field: **T**.
2. **Logic**: find the `if` or `else` each line is inside. Same block, or both inside no `if` at all: **T**. Different blocks: **F**.
3. **Order**: swap the two lines in your head. Does one now use a value before the other sets it, or does the output come out in a different order? **T**.

```ts
const total = price * qty;    // 1
const tax = total * 0.05;     // 2
log("done");                  // 3
```

- Lines 1 and 2: T, T, T.
- Lines 1 and 3: F, T, F.

## I. LSP

1. Put the parent method next to the child method. Find the lines only the child has.
2. Pre: does the child **throw or refuse** an input the parent accepted? **Strengthened**. Accepts something the parent refused? **Weakened**. Neither? **Unaffected**.
3. Post: is there any input where the parent's result or effect does **not** happen in the child (it throws, skips, or returns something else)? **Weakened**. Child promises extra on top? **Strengthened**. Neither? **Unaffected**.
4. Violates LSP: **True** if pre is Strengthened or post is Weakened. Otherwise **False**.
5. Test: the input the child refuses, then what the parent would give.

```ts
queue.enqueue("");                      // the input the child refuses
expect(queue.dequeue()).to.equal("");   // what the parent would give back
```

Fix if asked: don't extend, hold a parent object inside instead. Or put the rule into the interface's contract.

## J. Versioning

For each change, go down this list and stop at the first yes:

1. Would an old caller's code stop compiling or start breaking? Removed or renamed, new required parameter, changed type, throws where it used to return, returns null where it used to throw: **MAJOR**.
2. Is it something new that old callers don't have to use? New method, new optional parameter: **MINOR**.
3. Is it a bug fix so it matches the docs? **PATCH**.
4. Only private or internal stuff changed? **NONE**.

Next version: take the biggest one.

| Biggest | 2.4.3 becomes |
|---|---|
| MAJOR | 3.0.0 |
| MINOR | 2.5.0 |
| PATCH | 2.4.4 |

"Rewrite as Minor":

| The MAJOR change | The MINOR rewrite |
|---|---|
| new required parameter | make it optional with a default |
| renamed method | add the new name, keep the old one calling it |
| changed what it returns or throws | add a new method or an optional parameter for the new behaviour |

```ts
on(event: string, handler: () => void, priority: number = 0): void
```

## K. API principles

Check each one. A yes means it's **violated**.

1. **Information hiding**: is there a `public` field, or does a method hand back an internal array the caller can change?
2. **Obliviousness**: does the caller have to know what happens inside to use it right, like a call order, a cleanup call, or a hidden side effect?
3. **Hard to misuse**: can the caller pass something that compiles but is wrong, like a `string` where only "high" or "low" work, or call a method that looks read-only but changes state?
4. **Contract completeness**: does the doc comment skip a case: empty input, missing item, bad value, what it returns, what it throws?

Write: "Violates **[principle]** because **[the line]**. Fix: **[make it private / use a union type / document the case]**."

## L. Coupling

1. **Degree**: count the classes named in the "Compare" sentence. A named outside system, like a program that writes a file, counts as one.
2. **Strength**: go down this list and pick the **last** one that's true.

| Kind | True if |
|---|---|
| Name | one calls the other by name |
| Type | they pass an object or parameter of an agreed shape, even if it says `any` |
| Value | the same literal sits in both with the same meaning, like `3` for shipped |
| Position | they rely on an order: arguments, `csvRow[0]`, columns |
| Algorithm | the same formula or rule is written in both, like encode and decode |

3. **How you find out**:
   - Name or Type: the build fails.
   - Type hidden by `any`: silently wrong.
   - Value, Position or Algorithm: silently wrong.
   - A crash only when something is missing or undefined.
4. **Fix**: write the agreement once. A named constant, a parameter object, a shared type, or one shared function.

Worked:

- `computeTotal` and `exportSummaryTotal` with the same tax math: 2, Algorithm, silently wrong.
- `ShoppingCart` with `any[]` and `validateItem`: 2, Type, silently wrong.
