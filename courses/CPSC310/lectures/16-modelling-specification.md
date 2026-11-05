# CPSC 310 — Lec 16 (Thu Nov 5) — Modelling & Specification

Deck: [09b-model-specs.pdf](https://ubccpsc.github.io/310/26w1/lectures/09b-model-specs.pdf), 16 slides, posted on lecture day. No reader chapter covers this material; the nearest are [Assertions](https://ubccpsc.github.io/310/textbook/1-construction-basics/assertions/) (tests check behaviour against the specification) and [Blackbox Testing](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/blackbox/) (preconditions narrow the input domain), so the deck is the source. Questions: 10 in [the bank](../02-questions.md) under "Lec 16". Built from the deck; Matt was at the dentist and takes no notes in this course.

## Learning goals
- Model components from a stakeholder's request.
- Check a model by walking through scenarios.
- Specify an operation's precondition, postcondition and exceptional cases.

## Slides, organized

### Four representations, and who checks each (slides 3 and 4)
- Software moves through four representations in order: **requirements**, **models**, **specifications**, **code**.
- **Requirements** are the stakeholder's needs in natural language. They describe goals, constraints and priorities, and the non-technical stakeholders are the ones who check them.
- **Models** are the classes, operations and rules the requirements imply. A model decides what there is to specify and finds what the requirements leave out. It is checked by a **walkthrough**.
- **Specifications** are the precise documentation and the tests. Developers write the code from them, and they check the code because the tests run against the implementation.

### What a model records (slide 5)
- A model records three things: **structure** (classes and their fields), **operations** (what can be done to each class) and **rules** (what is always true about the classes and operations).
- It says what exists and what is allowed, never how anything works.
- On paper a model is a sketch: one box per class holding its fields, operations and rules. You check it by tracing scenarios through it.

### The modelling procedure (slide 6)
- Modelling is iterative, in four steps.
  1. **Extract**: pick candidate classes, fields, operations and rules out of the text.
  2. **Shape**: decide ownership and encapsulation, and assign each rule to a class or an operation.
  3. **Evaluate**: trace the model through scenarios.
  4. **Revise or ask**: fix the model, or record each unspecified case as a decision you made or a question for the stakeholder.
- The model is complete when no scenario fails and every open question is one only the stakeholder can answer.

### Reading a request: the grammar hints (slides 7 and 8)
- A noun, or an adjective that classifies a noun, usually becomes a class or a field.
- A verb that someone does usually becomes an operation.
- A limit, a condition or a consequence usually becomes a rule.
- The running example is a section waitlist. Each section has a fixed number of seats. Once it is full, students can join its waitlist, which holds at most 50. A student cannot join the waitlist of a section they are enrolled in and cannot join the same waitlist twice. Students can leave whenever they like and can check their position at any time. When a seat frees up, the first student in line is offered it and has 24 hours to accept; accepting enrols them and removes them from the waitlist; declining or letting it expire removes them and the seat goes to the next in line. Student names and emails live in the Student Information System, not in this system, and one student is often waiting on several sections.

### Class, field or operation? (slide 9)
- For each noun, ask whether it is just a value of something else or has data and rules of its own.
- Just a value (a count, a name, a date) is a **field**.
- Something with its own data, or rules about how it changes, is a **class**.
- Something that can always be computed from other state is an **operation**.
- Seats in a lecture hall are interchangeable, so they are a count field. Seats at a concert each have a number, a price and an occupant, so there they are a class.

### Ownership and encapsulation (slide 10)
- When class A has a field of class B, two questions decide the structure.
- **Ownership**: does A control B's lifetime? If yes, A creates B itself, which is **composition**. If no, A accepts an instance of B created elsewhere, which is **association**.
- **Encapsulation**: does a rule about A depend on B? If yes, every operation that could break the rule must be defined on A, so that A can enforce it. If no, operations that change B can live on B directly.

### Four kinds of rule (slide 11)
- An **invariant** is what is always true about an object between operations.
- A **precondition** is what must be true before an operation is called. Meeting it is the caller's job.
- A **postcondition** is what the operation guarantees afterwards, including what does not change.
- An **exceptional case** is something the operation checks itself, together with the result it gives when it cannot proceed.
- One sentence of the request often yields both an invariant and the rules on the operation that maintains it. "The waitlist holds at most 50" is an invariant on the waitlist and an exceptional case ("full") on join.

### Walkthroughs: testing a model by hand (slides 12 and 13)
- Write scenarios from the request, such as "three students join a full section's waitlist, a seat frees up and the first student accepts".
- For each scenario, write the state after every call and check that the scenario works using only the fields and operations in the sketch.
- When you get stuck, either the model has a gap, so change it, or the requirement does not say, so decide the behaviour or ask.
- The deck's walkthrough is a table with one row per operation and a column per piece of state: adding Ada, Ben and Cy builds the line; a student dropping puts Ada in the Offer column with a 24-hour clock; Ada accepting after two hours leaves Ben and Cy in line and clears the offer.

### Documentation: stating the rules (slide 14)
- The specification is the doc comment on the class and on each operation, with each sentence playing one of the four roles. The deck's waitlist example, shortened:

```ts
/** Students in the order they joined.
 *  Always true: nobody is in line twice, and the line never exceeds its maximum. */   // invariant
interface Waitlist {
  /** Adds a student to the back of the line. Call only once the section is full.      // precondition
   *  @param id - a valid student id; not checked.                                      // precondition
   *  @returns { ok: true, position }: the student is last in line; nobody else moves.  // postcondition
   *  Otherwise { ok: false, reason }, unchanged, for the first that applies:
   *  "already-enrolled", "already-waiting" or "full". */                               // exceptional
  join(id: StudentId): JoinResult;
}
```

- "Not checked" marks a precondition: the operation assumes it. A reason code in the result marks an exceptional case: the operation checks it and says what happened. "Nobody else moves" is the part of the postcondition that says what does not change.

### Unit tests: checking the rules automatically (slide 15)
- Documentation states each rule in general; a unit test checks one instance of it.
- Every clause of the specification gets at least one test.
- Every walkthrough step becomes a test: an initial state (given), an operation (when), the expected resulting state (then).
- Preconditions are not tested, because behaviour when one is violated is unspecified.

### Summary (slide 16)
- Models determine what is specified; specifications determine what is tested.
- Modelling is iterative: extract, shape, evaluate, revise.
- Ownership and encapsulation decide the structure and where rules are enforced.
- Invariants constrain classes; preconditions, postconditions and exceptional cases constrain operations.
- Walkthroughs evaluate the model; unit tests make the specification executable.

## Clarifications
- The Blackbox Testing chapter (lecture 7, equivalence class partitioning) tests "invalid" input classes. In this deck's terms those are exceptional cases, which the operation checks and answers, not preconditions. A true precondition such as "a valid student id; not checked" is outside the input domain altogether and gets no test. The two are consistent once the words are lined up: partitioning's "invalid class" means "exceptional case" here.
- The deck's Student is never a class in this system. Names and emails live in the Student Information System, so the model keeps only a student id as a field, an association by id rather than an owned object.
