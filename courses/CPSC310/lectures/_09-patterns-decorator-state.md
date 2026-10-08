# CPSC 310 · Lecture 9 · Patterns: Decorator & State (Thu Oct 8, 2026)

Built from the reader chapter [Design Patterns](https://ubccpsc.github.io/310/textbook/3-software-design/design-patterns/) because the lecture title names two of its patterns, Decorator and State; the deck replaces this outline once it is posted (the midday task rebuilds it).

## The four-step pattern process

- A design pattern is a common way of using language tools to solve a structural problem in code. Its purpose is to give you richer ways to structure code, not to label code as a pattern or not.
- Every pattern is judged by the same four steps. **Change**: name the part of the code likely to vary. **Pain**: say what makes that change hard, either a scattered change (coupling) or tangled concepts (low cohesion). **Mechanism**: find what is shared and what differs, and the interface that unifies them, usually through abstraction or polymorphism. **Cost**: decide whether the fix costs less than the pain, now and in future.
- Each pattern is then analysed in the course's vocabulary: coupling and connascence, cohesion and tangling, and testability.

## State: behaviour that changes with internal state

- The State pattern is a composition-based way for an object to change its behaviour as its internal state changes. The object holds a reference to a state object, and that reference is swapped as conditions change.
- Transition decisions sit in the state objects, each of which only knows its own valid transitions. There is no single large `if` or `switch` block that knows every global transition.
- In the reader's example, `TCPState` objects use their reference back to `TCPConnection` to call `setState(TCPState)`. The connection always knows its current state without being responsible for keeping it correct. The client delegates transition management to the state hierarchy.
- Isolating state decisions makes transitions easier to reason about. Logging can be added once in `setState`, which would be opaque if state were read off field values scattered through the class.
- Without the pattern the code is a chain of conditions such as "if last is listen and the connection is open, handle open". The reader names two problems. First, low cohesion: the parent class manages every state and transition on top of its real responsibilities, so unrelated edits land in the same place (tangling). Second, a change that touches every transition, such as logging, is a scattered change, which shows an implicit connascence of algorithm between the state branches.
- The pattern fixes both. Delegating state logic to separate classes raises the parent's cohesion, and centralising the logic lets inheritance implement a shared change once.
- Testability improves through controllability. To test one conditional branch you would first have to force the parent into the right field values. With a `ListenState` class each test starts already in that state, so each transition is tested on its own and the whole system is covered by transitivity.

## Decorator: adding responsibilities to objects, not classes

- Decorator is a structural pattern that augments an object's responsibilities at runtime. The reader stresses the difference between an object and a class: a class is the template, an object is one instance of it. Decorators add behaviour to individual objects, so two objects of the same class can behave differently.
- Decorators work by wrapping an object in another object of the same component type and using composition so the wrapped pair is treated as one object.
- The reader's example is a `Car` with optional features such as navigation, adaptive cruise control and auto-brake. Subclassing every combination gives seven subclasses, and every new feature has to be mixed into each existing subclass. With a `CarDecorator` each feature is one extra class, and a car with navigation and auto-brake is built by wrapping: `new Nav(new AutoBrake(new BaseCar()))`.
- Features can be added at runtime by wrapping an existing object again, for example turning navigation on later with `car = new Nav(car)`.
- Downsides the reader lists. The pattern cannot control the order of wrappers, and wrappers cannot talk to each other, so wrapping a base car with `Nav` twice is allowed even though it makes no sense. Decorators are small, so the design ends up with many classes. Decorators break object identity, so code that checks `instanceof` behaves differently for wrapped and unwrapped objects.
- Analysis. Base classes stay focused on their core responsibilities, which raises cohesion and reduces tangling. New decorators are added without changing the base classes, so the classes are more loosely coupled. The reader calls it a textbook case of composition over inheritance.

## The patterns the deck may revisit

- The same chapter covers Adapter and Composite (lecture 8), Factory and Abstract Factory, and Strategy. The deck for lecture 9 may contrast Decorator with these.
- Factory moves object creation into a factory object so clients depend on the abstraction, which is what dependency inversion and the open/closed principle need. Without it, creation code is tightly coupled to concrete classes and test stubs are hard to make.
- Strategy encapsulates an algorithm behind an interface so the client depends on a type (connascence of type) instead of duplicating a chain of conditionals (connascence of algorithm). It also improves cohesion, because the choice of strategy is deferred to the caller, and testability, because each strategy is tested on its own and a `FakeStrategy` makes the client easy to control.
