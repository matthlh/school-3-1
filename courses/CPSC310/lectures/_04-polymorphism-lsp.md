# CPSC 310 — Lecture 4 pre-read: Polymorphism and LSP (Tue Sep 22)

Pulled 2026-09-11 from the reader chapter *Design Principles*
(https://ubccpsc.github.io/310/textbook/2-analytical-code-design/principles/). The deck was not
posted yet. The same chapter is listed again for lecture 7 (test doubles) and lecture 13 (layered
architecture).

## What the chapter claims
- Design principles are high-level guidelines that keep a design robust under defect fixes and feature additions. They are not absolute. You will violate them, and should do so deliberately.
- Designing for evolution means making intentional decisions about coupling and cohesion, because every successful system evolves.

### Tools the language gives you
- **Abstraction** is the fundamental technique for managing complexity: focus on the key information for a task and leave out the rest. The right abstraction differs by task. The two most common kinds are data abstraction and control abstraction.
- **Data abstraction** separates the abstract properties of a data type from its concrete implementation, so client code stays oblivious to the implementation and it can change underneath. Java's `Vector` is backed by an array and `HashMap` by an array of linked lists; either could change without touching clients.
  - The CPSC 210 comment block (requires, modifies, effects) is a data abstraction. It defines the method's **contract**: preconditions (what it expects), postconditions (what it provides) and invariants (what must always be true). Documenting these matters because state-based errors are hard to diagnose and type systems give little defence against them.
- **Control abstraction** hides how the machine will execute the code so the engineer can think about what to do rather than how. Fred Brooks (*No Silver Bullet*) counts it among the early productivity advances. The reader contrasts three lines of Java with the assembler they become. Dijkstra's **structured programming** named the constructs (sequential blocks, control statements, subroutines). JavaScript promises are a modern example: asynchronous sequences written as if synchronous, without nested callbacks.
- **Decomposition** splits a complex entity into manageable pieces. The goal is to make simple tasks simple while keeping exceptional tasks possible.
  - Top-down decomposition starts from the whole and works toward detail, leaving black boxes to fill in later. It gives global awareness but gets hard when a leaf box develops constraints that force earlier decisions to be revisited.
  - Bottom-up decomposition decides the leaves first and composes them. It suits a team with concrete implementation knowledge but often lacks the global overview, which leads to inconsistencies and too much early detail.
- **Information hiding** (David Parnas, 1972) separates the parts of a program most likely to change from the parts that stay static. It is the high-level motivation for APIs: describe the expected behaviour and hide the implementation behind it. It is a form of abstraction that identifies "that which varies" from "that which stays the same". Every abstraction has a cost, so unnecessary ones add difficulty and missing ones make evolution hard.
- **Encapsulation** is the object-oriented practice of separating the contractual interface from its implementation. The interface construct carries the public contract; the concrete class carries the implementation plus its private methods and fields.
- **Constant change**: Jeff Dean (WSDM 2009 keynote) says the parameters behind your abstractions change by orders of magnitude. Design for 10x load and expect a rewrite at 100x, because premature optimisation has real costs and you learn things between 10x and 100x you could not have known. Thinking concretely about what will change in the short and medium term produces better abstraction layers than assuming anything can change.

### SOLID
- Design principles are guidelines, not rules; they are often in tension with each other. SOLID is the most commonly used catalogue.
- **Single responsibility**: a software module should do one thing and do it well. Systems degrade because it feels easier to add code to an existing module than to create a new one. Patterns built to encourage it: Strategy (a module per algorithm), Command (an action separated from its implementation), State (the behaviour of one state in one module).
- **Open/closed**: modules should be open to extension but closed to modification. Decide explicitly which parts of the system should be extension points, because extension points add abstraction and some extensions should be inhibited for performance or security. Most design patterns describe explicit extension points. The code smell for a violation is an `instanceof` or `typeof` check, because a new feature then forces client code to change too.
- **Liskov substitution**: any object can be interchanged with any other object that has the same parent type. Covered in prior courses; the reader points to Elisa Baniassad's video.
- **Interface segregation**: clients should not be forced to depend on interfaces they do not use. It is the single responsibility principle applied to interfaces, pushing them to be small and focused instead of growing by accretion.
- **Dependency inversion**: classes should depend on abstractions, not implementations. Inject an interface between two concrete classes and make both depend on it, so reusing one class means reusing only the interface. Refactoring for extensibility usually works this way: introduce an interface and make the existing code implement it.

## Three pre-lecture questions
1. Define data abstraction and control abstraction with the reader's examples, and name the three parts of a method contract.
2. Give the strength and the weakness of top-down and of bottom-up decomposition. Define information hiding (Parnas, 1972) and say how encapsulation differs from it.
3. State all five SOLID principles in the reader's one-line form. Which code smell signals an open/closed violation, which three patterns support single responsibility, and what does dependency inversion say to inject between two classes?
