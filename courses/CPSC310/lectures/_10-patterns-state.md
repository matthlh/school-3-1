# CPSC 310 — Lec 10 (Tue Oct 13) — Patterns III: State and the Open/Closed Principle

Deck: [06a-patterns-iii.pdf](https://ubccpsc.github.io/310/26w1/lectures/06a-patterns-iii.pdf), 12 slides, posted on lecture day. Reader: [Design Patterns](https://ubccpsc.github.io/310/textbook/3-software-design/design-patterns/), the State section. Questions: 10 in [the bank](../02-questions.md) under "Lec 10". The course schedule called this lecture "API change severity and versioning" before the deck went up, so the reader-chapter outline that stood here was replaced by the deck. Built from the deck alone; Matt's notes are added under Your notes when he sends them.

## Learning goals
- Spot a decision in existing code that is likely to change, and find where knowledge of it is spread out or mixed in with other things.
- Describe a pattern by its change, its pain, its mechanism and its cost.
- Move unfamiliar code to a pattern one behaviour-preserving step at a time. Today's target is State.
- Judge whether a pattern pays for itself in a given situation.

## Slides, organized
### The scenario: a phone with three states (slide 3)
- The code is the operating system of a new phone, which can be off, locked or ready.
- Three events reach it: pressing the power button, pressing the home button, and receiving a notification.
- Each event does something different depending on the state the phone is in, which is the shape every State example has.

### State: intent (slide 4)
- The problem it solves: an object behaves differently depending on the state it is in, and that state changes while the program runs.
- Without the pattern, every method ends up with a switch on the current state to decide what to do.
- The deck's intent line is the Gang of Four's. **State** lets an object "alter its behavior when its internal state changes", so that the object "will appear to change its class".
- The result is an **object-oriented state machine**: the states are objects and the transitions are method calls, instead of a table or a set of switches.

### The refactoring: encapsulate the states in objects (slide 5)
- Each state becomes its own class, so the phone's three states become `StateOff`, `StateLocked` and `StateReady`.
- Each transition becomes a method on a state object.
- A state object creates the state that follows it, which the deck draws as "creates" arrows. `StateOff` is created by `Phone` at start-up and again by `StateLocked` and `StateReady` when the phone powers down. `StateLocked` is created by `StateOff`. `StateReady` is created by `StateLocked`.
- Slide 6 is the canonical refactoring.guru diagram: a context holds a reference typed as the state interface, every concrete state implements that interface, and the context forwards each event to whichever state object it currently holds.

### State: the four-step analysis (slide 7)
- Change: new states the phone can be in, each with its own rules.
- Pain: every event's switch has one case per state, so a new state touches every event, which is **scattering**; and each event mixes every state's rules and transitions in one body, which is **tangling**.
- Mechanism, in the deck's three parts.
  - Abstraction: a `PhoneState` interface with `pressPower()`, `pressHome()` and `receiveNotification()`.
  - Oblivious caller: `Phone` knows only its current `PhoneState`. Each state handles every event and decides what comes next.
  - Trigger: each `Phone` event is handed to the current state, which calls `phone.setState()` to move on.
- Cost: one class per state; transitions spread across the state classes rather than sitting in one table; a new event touches every state class; and `setState()` has to be public so that the states can call it.

### Synthesis: what the four patterns share (slide 8)
- Every pattern so far puts an interface between the client and the thing that varies. A new variant is a new class, and the client does not change.
- The deck's table, one pattern per row.
  - Adapter: the interface is `MusicSource`, a new variant is YouTube Music, and Reports stay unchanged.
  - Composite: the interface is `Employee`, a new variant is `DataScientist`, and the Manager and org totals stay unchanged.
  - Decorator: the interfaces are `Drink` and `AddOn`, a new variant is a mocha add-on, and the menu drinks and the cart stay unchanged.
  - State: the interface is `PhoneState`, a new variant is a lockout state, and `Phone` stays unchanged.

### The Open/Closed Principle (slide 9)
- The **Open/Closed Principle**, OCP, says a unit of code, whether a function, a class or a module, should be open for extension and closed for modification.
- Open for extension means new behaviour can be added.
- Closed for modification means adding that behaviour does not change code that already works.
- How it is done: depend on an abstraction, then extend by writing a new implementation of it. The four patterns are four ways of putting that abstraction in place.

### The axis of change (slides 10 and 11)
- No design is open to every change. Each design is cheap along one axis and expensive along another.
- The phone before the pattern, with switches: a new state, such as Lockout, means editing every method; a new button, such as Volume, means adding two methods to `Phone`.
- The phone after the pattern, with State: a new state means adding one class; a new button means editing `PhoneState` and every state class.
- Every pattern has a closed axis. Each is open to new implementations and closed to new operations.
  - Adapter: a new music service is cheap; a new query on `MusicSource` is expensive, because it touches every adapter.
  - Composite: a new role is cheap; a new operation, such as average salary, is expensive.
  - Decorator: a new add-on is cheap; a new property, such as calories, is expensive.
  - State: a new state is cheap; a new button is expensive.

### Choosing the axis (slide 12)
- Every extension point costs indirection: an interface, a dispatch and more classes. Spend it only where variation will actually arrive.
- Before adding an extension point, ask three questions.
  - What will vary: new services, roles, add-ons or states?
  - What must stay stable for the code that depends on it?
  - Is that variation really likely?
