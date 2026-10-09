# CPSC 310 — Lec 9 (Thu Oct 8) — Patterns II: Composite and Decorator

Deck: [05b-patterns-ii.pdf](https://ubccpsc.github.io/310/26w1/lectures/05b-patterns-ii.pdf), 12 slides. Reader: [Design Patterns](https://ubccpsc.github.io/310/textbook/3-software-design/design-patterns/), the Decorator and Composite sections. Questions: 12 in [the bank](../02-questions.md) under "Lec 9". Matt was absent; the deck was posted before class, so there is no In class section. The course site called this lecture "Decorator & State" in the morning and "Composite & Decorator" once the deck went up, so State waits for a later deck. Slide 2 reminds that D2 is due Fri Oct 16 and that D3/D4 team formation opens Fri Oct 9 with instructions on Piazza; anyone without a partner should ask their TA in lab; team repos are provisioned from Oct 19, and the team is to be entered "by end of day", with no day named, so the date comes from the Piazza post.

## Learning goals
- Spot a decision in existing code that is likely to change, and find where knowledge of it is spread out or mixed in with other things.
- Describe a pattern by its change, its pain, its mechanism and its cost.
- Move unfamiliar code to a pattern one behaviour-preserving step at a time. Today's targets are Composite and Decorator.
- Judge whether a pattern pays for itself in a given situation.

## Slides, organized
### Composite again (slides 4–7)
- Slides 4 to 7 repeat lecture 8's slides 18 to 21 word for word: the Workday org chart, the intent, the refactoring.guru diagram and the four-step analysis. The full treatment is on the [lecture 8 page](08-patterns-adapter-composite.md) under Composite.
- The shape, one part per line.
  - A **Component** interface is what the client calls.
  - A **Leaf** is one object and answers for itself.
  - A **Composite** implements the same interface, holds a list of components, and answers by asking each of them. Any of those may itself be a composite.
- The exam can ask the cost from either side. A new kind of node costs one class and no client change. A new operation costs a new method in the interface and in every class.

### The Decorator scenario (slide 8)
- A cash-register app for a coffee cart sells Espresso, Latte, Cold Brew and Matcha Latte.
- Any drink can take add-ons: an extra shot, whip, or a large size.
- The same add-on can be applied more than once, so a latte with two extra shots is a valid order.
- The slide's picture is a latte inside a whip inside a large, which is the shape the pattern produces.

### Decorator: intent (slide 9)
- The problem it solves: one object, not its whole class, needs extra behaviour or state while the program is running. A subclass cannot give it that, because a class's behaviour is fixed when the code is written and is shared by every instance.
- The slide's intent line is the Gang of Four's. **Decorator** lets you "attach additional responsibilities to an object dynamically" as a "flexible alternative to subclassing".
- The deck's image is a gift that is wrapped, boxed and wrapped again. Every layer changes what the thing does, and whoever holds it still sees the same shape.

### Example in the wild: java.io (slide 10)
- Reading objects out of a compressed file is a chain of wrappers around one base object.

```java
new ObjectInputStream(
  new GZIPInputStream(
    new BufferedInputStream(
      new FileInputStream(new File("fname.gz")))));
```

- `FileInputStream` is the base object. The other three are decorators. Each is an input stream, each holds an input stream, and each changes what reading does.

### The canonical shape (slide 11)
- The slide is the refactoring.guru diagram with no text. Its parts, in words.
  - A Component interface is what the client calls.
  - A concrete component does the real work.
  - A base decorator implements Component and holds a reference to one Component.
  - Each concrete decorator extends the base decorator and changes the answer before or after passing the call on.
- The two relationships to remember: a decorator **is a** Component, so it can stand wherever the client expects one, and it **has a** Component, the object it wraps.

### Decorator: analysis (slide 12)
- The four steps for the coffee cart.
  1. Change: the list of add-ons keeps growing, and each one prices and names itself differently.
  2. Pain: every switch over add-ons grows a case per add-on, so a new add-on touches each operation, which is scattering. `CoffeeCart` carries the pricing and naming of every add-on on top of tracking the order, which is tangling.
  3. Mechanism. The abstraction is a `Drink` interface with `getDescription()` and `getPriceCents()`, plus an `AddOn` that holds exactly one `Drink`. The cart is oblivious: it holds a `Drink[]`, never learns which drink or wrapper it has, and each wrapper answers by adjusting what the drink inside it returns. The trigger is a price or description request, which enters at the outermost wrapper and is passed inward until the plain menu drink answers.
  4. Cost: each add-on is a class of its own, the total depends on which wrapper is outside which, and a deep stack of wrappers is slow to read and to debug.
- A concrete add-on, to make the mechanism visible. The fragment is mine, not the deck's.

```ts
class Whip implements Drink {
  constructor(private inner: Drink) {}
  getDescription() { return this.inner.getDescription() + ", whip"; }
  getPriceCents()  { return this.inner.getPriceCents() + 75; }
}
const order: Drink = new Large(new Whip(new Latte()));
```

- The cart calls `getPriceCents()` on the order. `Large` asks `Whip`, `Whip` asks `Latte`, and each adds its own change on the way back up. A second whip is one more wrapper. A new add-on is one new class, with no change to the cart or to any drink.
- The deck's `AddOn` base class would hold the `inner` field for every add-on. The fragment inlines it, which the pattern allows.

### The reader's version: the car with options
- The reader's example is a `Car` with optional navigation, adaptive cruise control and auto-brake.
- Subclassing every combination needs seven subclasses, and a new feature such as auto-lights has to be mixed into each of them.
- With a `CarDecorator`, each feature is one extra class. A car with navigation and auto-brake is built by wrapping: `new Nav(new AutoBrake(new BaseCar()))`.
- Features can be added at run time by wrapping an object that already exists. A car built as `new AutoBrake(new BaseCar())` gains navigation later with `car = new Nav(car)`.
- The reader separates object from class. A class is the template and an object is one instance of it. Decorator adds responsibilities to objects rather than to their class, so two objects of the same class can behave differently.
- The reader's downsides.
  - The pattern cannot control the order of the wrappers.
  - Wrappers cannot talk to each other, so a base car can be wrapped in `Nav` twice even though that makes no sense.
  - Decorators are small, so the design ends up with many classes.
  - Decorators break object identity, so code that checks `instanceof` behaves differently on wrapped and unwrapped objects.
- The reader's analysis in Module 1 terms.
  - Base classes stay focused on their core responsibilities, which raises cohesion and cuts the risk of tangling.
  - New decorators are added without changing the base classes, so the classes are more loosely coupled.
  - The reader calls it a textbook case of composition over inheritance.

## Clarifications
- The deck's cost line says the wrapping order changes the result, and the reader says the pattern cannot control the order of the wrappers. Both hold. The pattern gives no way to enforce an order, and the order matters when two wrappers' changes do not commute. With a 400-cent latte, a large that multiplies by 1.2 outside an extra shot that adds 100 cents gives $$(400 + 100) \times 1.2 = 600$$ cents, and the other way round gives $$400 \times 1.2 + 100 = 580$$ cents.
- The coffee cart's "more than one of the same add-on" is a feature of that domain. The reader lists the same ability as a downside, because wrappers cannot see each other. So the pattern allows a nonsense double wrap as readily as a wanted one. Whether a repeat is a bug is the domain's call, and the pattern offers no hook to enforce it.
- Adapter, Composite and Decorator are all structural patterns, and all three put a wrapper behind an interface, which is why they get confused. Adapter changes the interface and keeps the behaviour. Decorator keeps the interface and changes the behaviour. Composite keeps the interface and holds many components in a tree rather than one in a chain.
- The client's coupling moves the same way as in the other patterns. The reader states the move from connascence of algorithm to connascence of type for Composite and for Strategy. For Adapter it says type or algorithm before and type after, with the main gain in degree. The reader's Decorator section only says "more loosely coupled", so reading the cart's switch as connascence of algorithm and its `Drink` dependency as connascence of type is my application of the reader's analysis, not its words.
- The learning goal about refactoring to a pattern in small steps has no slides of its own; the deck goes from scenario to analysis. The steps are the lecture 4 discipline: tests first, one meaning-preserving move at a time, tests after each.
- Java's class is `GZIPInputStream`; the deck writes it as GzipInputStream.
