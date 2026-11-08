# CPSC 310 — Lec 8 (Tue Oct 6) — Patterns I: Adapter and Composite

Matt was absent, so nothing on this page comes from class. The lecture notes follow the pre-class deck [05a-patterns-i.pdf](https://ubccpsc.github.io/310/26w1/lectures/05a-patterns-i.pdf). The [Design Patterns](https://ubccpsc.github.io/310/textbook/3-software-design/design-patterns/) reader covers Adapter and Composite as well as Factory, Strategy, State and Decorator. See "Lec 8" in the [question bank](../02-questions.md).

## Learning goals
- Spot a decision in existing code that is likely to change, and find where knowledge of it is spread out or mixed in with other things.
- Describe a pattern by its change, its pain, its mechanism and its cost.
- Move unfamiliar code to a pattern one behaviour-preserving step at a time. Today's targets are Adapter and Composite.
- Judge whether a pattern pays for itself in a given situation.

## How to analyse a design pattern
### Module 2 starts: designing for change (slides 2–5)
- Module 1 was design in the small: the cost of change, where it comes from (coupling, cohesion, testability) and how to reduce it (refactoring). Module 2 is design in the medium: improving a design, trade-offs between architectures, and what a design means for people outside it.
- Every system gets changed. The deck's three kinds of change: a new requirement (a QA role in the org chart), a new dependency (switching payment providers), and new scale (more users, developers, code).
- You cannot predict what the change will be, but you can often predict where it will land. The two questions to ask when it arrives: how many places do you have to edit, and how much unrelated code do you have to touch?

### What a design pattern is, and why the name matters (slides 6–7)
> **Definition.** A **design pattern** is a tried and true solution to a commonly encountered problem. It is a reusable way of thinking about a recurring design problem, what emerges when you keep a likely change local, and a vocabulary for discussing trade-offs.
- It is not a class diagram you copy, not a framework or library, and not a rule you must always follow.
- Four reasons the name is worth knowing.
  - Recognition: you spot the problem shape earlier, sometimes before writing code.
  - A destination: refactoring is how you get there, and the pattern says where you are heading.
  - Known costs: each pattern comes with known trade-offs, including when the indirection is not worth it.
  - Shared vocabulary: one word stands in for a paragraph in a design discussion or code review.

### Categories (slides 8–9)
- **Structural** patterns give a simple way to realise relationships between entities. **Creational** patterns deal with how objects are created. **Behavioural** patterns capture common ways objects communicate.
- There are many patterns. The categories are for organising them, not for deciding when to use one.

### The four-step analysis and the OO mechanism (slides 10–12)
- To understand any pattern, answer four questions in order.
  1. Change: which decision is likely to vary?
  2. Pain: where does that decision scatter (a coupling problem) or tangle (a cohesion problem) in the current code?
  3. Mechanism: how does the pattern give the decision one home?
  4. Cost: what indirection was added, and was it worth it?
- The patterns in this course are object-oriented, so the mechanism is built from two tools. **Abstraction** separates what varies from what stays the same, is captured as an interface or abstract class, and defines roles rather than concrete behaviour. **Polymorphism** lets different concrete objects be treated uniformly through that abstraction, with behaviour varying by overriding and dynamic dispatch, so calling code can be oblivious to concrete types.
- Finding the mechanism is three questions. Abstraction: what new interface or class gives the decision a single home? Polymorphism and obliviousness: what methods does it declare, who calls them without knowing the concrete type, and can someone add a new implementation and override them safely? Trigger: when are those methods called, and by whom?

### When a pattern helps and when it hurts (slide 13)
- It is easy to force a pattern into a context where it does not make sense.
- Patterns help when change is likely, when variability already exists, and when coupling is becoming painful.
- Patterns hurt when requirements are stable, when there is only one concrete case, and when the cost of the abstraction outweighs the future benefit.

## Two patterns

### Adapter (slides 14–17)
- Scenario: a year-end "wrapped" summary of the songs you played across several music platforms. Each platform has its own interface, its own methods and its own idea of what a play looks like, including CSV and JSON exports.
> **Definition.** **Adapter** converts the interface of a class into the interface clients expect, so classes with incompatible interfaces can work together. The intent: an off-the-shelf component offers functionality you want to reuse, but its view of the world does not fit the system you are building. Concretely, wrap the existing class in a new class that exposes the interface you want.
- The four-step analysis.
  1. Change: new platforms, each with its own interface.
  2. Pain: one loop per platform in every report (scattered), and report logic mixed with calls to each platform's interface and field translation (tangled).
  3. Mechanism: a `MusicSource` interface with `getRecords(): MusicRecord[]`. The report code only knows a `MusicSource[]`, and each adapter must return normalised records. The trigger is each report calling `getRecords()` on every adapter.
  4. Cost: one class per platform, and `MusicRecord` can only carry fields every platform can supply.

### Composite (slides 18–21)
- Scenario: org-chart software. An org contains managers who supervise managers, engineers, designers, technical leads and product managers, so the tree has nodes that are one person and nodes that head a team.
> **Definition.** **Composite** composes objects into tree structures for whole-part hierarchies and lets clients treat individual objects and compositions uniformly, through the same interface. The intent: the application manipulates a hierarchy of "primitive" and "composite" objects, and having to know which kind each object is before processing it is undesirable.

- The pattern has three roles. **Component** is the shared interface.
- **Leaf** represents one object.
- **Composite** holds components. A child component can itself be a composite.

```svg
<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, system-ui, sans-serif" font-size="13">
  <g text-anchor="middle">
    <rect x="215" y="14" width="170" height="36" rx="6" fill="var(--panel)" stroke="var(--link)"/>
    <text x="300" y="37" fill="var(--link)" font-weight="600">Employee (Component)</text>
    <rect x="215" y="98" width="170" height="36" rx="6" fill="var(--panel)" stroke="var(--border2)"/>
    <text x="300" y="121" fill="var(--fg)" font-weight="600">Manager (Composite)</text>
    <rect x="40" y="186" width="150" height="36" rx="6" fill="var(--panel)" stroke="var(--border2)"/>
    <text x="115" y="209" fill="var(--fg2)">Engineer (Leaf)</text>
    <rect x="225" y="186" width="150" height="36" rx="6" fill="var(--panel)" stroke="var(--border2)"/>
    <text x="300" y="209" fill="var(--fg2)">Designer (Leaf)</text>
    <rect x="410" y="186" width="150" height="36" rx="6" fill="var(--panel)" stroke="var(--border2)"/>
    <text x="485" y="209" fill="var(--fg2)">Manager (Composite)</text>
  </g>
  <g stroke="var(--border3)" stroke-width="1.5" fill="none">
    <path d="M300 98 V50" marker-end="url(#a8)"/>
    <path d="M115 186 V162 Q115 152 128 152 H300 V134" marker-end="url(#a8)"/>
    <path d="M300 186 V134" marker-end="url(#a8)"/>
    <path d="M485 186 V162 Q485 152 472 152 H300 V134" marker-end="url(#a8)"/>
  </g>
  <defs>
    <marker id="a8" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0 0 L6 3 L0 6 Z" fill="var(--border3)"/>
    </marker>
  </defs>
  <g text-anchor="middle" font-size="11" fill="var(--muted)">
    <text x="360" y="78">implements</text>
    <text x="300" y="172">holds Employee[]</text>
  </g>
</svg>
```
- The four-step analysis.
  1. Change: new roles in the org, any of which might be one person or head a team of their own.
  2. Pain: one array and one loop per role in every Manager operation (scattered), and each operation mixed with checking whether a report is a person or a team (tangled).
  3. Mechanism: an `Employee` interface with `getTotalSalary()`, `getHeadcount()` and `traverse()`. A Manager only knows an `Employee[]`, and each employee answers for itself and everyone under it. The trigger is a client calling a method on any node, and each Manager calling it on each of its reports.
  4. Cost: one class per role, and a new operation means a new method in the interface and in every class.

## Clarifications
- The reader's Design Patterns chapter states each pattern's effect in Module 1 terms. Without Adapter, every client of several sources has scattered changes with connascence of type or algorithm per source and tangles business logic with parsing. With it, a client has connascence of type with one interface, and the main gain is in degree: one dependency instead of one per source. The reader also says adapters do not have to share an interface; the deck's `MusicSource` does, because the report needs to loop over them.
- Without Composite, traversal logic is duplicated in every role that has reports, which is scattered change with connascence of algorithm. With it, the client is down to connascence of type. The reader's example is `Employee.getBudget()`: a leaf returns its salary, a Manager returns its salary plus `getBudget()` of each report, and the client cannot tell which it has.
- The deck's "scattered" and "tangled" are the reader's words for a coupling problem and a cohesion problem respectively. Pain is always one of those two.
- The deck says nothing about Factory, Strategy, State or Decorator; the reader chapter does, and the lecture 9 deck (05b) turned out to be Composite again plus Decorator.
