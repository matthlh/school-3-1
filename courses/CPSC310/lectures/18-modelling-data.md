# CPSC 310 — Lec 18 (Tue Nov 17) — Modelling: Data

The lecture notes follow [11a-data-specs.pdf](https://ubccpsc.github.io/310/26w1/lectures/11a-data-specs.pdf) (15 slides) and the reader chapter [Data Modelling](https://ubccpsc.github.io/310/textbook/4-modelling/data-models). The deck builds on the scenarios from [lecture 17](17-modelling-scenarios.md). See "Lec 18" in the [question bank](../02-questions.md).

## Learning goals
- Create a data model from requirement scenarios.
- Identify entities, properties and relationships by classifying the phrases in a scenario's Givens and Thens.
- Decide when a relationship should become its own entity, based on whether it has state of its own.
- Express constraints as cardinalities or as derived, bound and condition rules, and tell stored facts from derived ones.
- Check a data model by making sure every scenario's Given and Then can be expressed with it.

## What a data model is

### From scenarios to a data model (slide 3)
> **Definition.** A **data model** combines the state from every scenario into one view.
- A data model stays in the problem domain. It describes what information exists, not how it is stored or represented.
- The reader calls this being **implementation agnostic**: no assumptions about storage, data structures or language features.
- One data model can be turned into several concrete representations:
    - class diagrams for a specific language,
    - REST resources,
    - database tables and serialized formats.
- The model can contain more than any one of those representations does.

### The four elements (slide 4)
> **Definition.**
> - An **entity** is a kind of thing the system keeps information about, such as a Section. Every instance of an entity has the same properties.
> - A **property** is a simple fact about each instance: a number, text, a yes or no value, or a time.
> - A **relationship** is a connection between entities. It is labelled with what it means, such as "enrolled in".
> - A **cardinality** sits at each end of a relationship and says how many instances can be connected.
> - A **rule** is a constraint the diagram cannot show.
- The course's diagram is a simplified Entity Relationship Diagram (the reader's term).

## Building a model: equipment rental

### The request and its scenarios (slides 5 and 6)
- The media lab lends cameras to students.
- A student can have at most 3 cameras out at a time.
- A camera can be lent to only one student at a time.
- Loans are due back 7 days after they are made.
- Cameras that are in for repair cannot be lent.

| Part | Borrow succeeds | Borrow refused |
|---|---|---|
| Given | The camera is not in for repair. The camera is not on loan. The student has fewer than 3 cameras out. | The camera is not in for repair. The camera is not on loan. The student has 3 cameras out. |
| When | The student borrows the camera. | The student borrows the camera. |
| Then | The camera is on loan to the student, due back 7 days from now. The student has one more camera out. | The camera is not lent. The student still has 3 cameras out. |

### Steps 1 to 3: entities, properties, relationships (slides 7 to 9)
- Step 1 draws a box for each entity: Student and Camera.
- Step 2 adds properties to each entity: Student has a student ID, and Camera has "in for repair".
- Step 3 adds the relationship "on loan" between Student and Camera.
- The relationship has a 1 at the Student end and 0..3 at the Camera end.
- Read it as a sentence: 1 student has 0 to 3 cameras on loan.
- Cardinalities come in three forms.

| Form | Written | Meaning |
|---|---|---|
| Exact | N | exactly N instances |
| Range | N..M | from N to M instances |
| Any | * | any number of instances |

### The sanity check (slide 10)
- A data model exists to support the scenarios, so check it against them.
- Go through the Given and Then sections: every phrase must appear as something in the model.
- If this cannot be done for every scenario, the data model is incomplete.
- The first model fails the check. The Then says the camera is "due back 7 days from now", and nothing in the model can hold when the loan was made.

### Step 4: promote a relationship that has state (slide 11)
- A relationship that has state of its own becomes an entity.
- "On loan" becomes the entity **Loan**, with the property "time lent".
- Two relationships replace the one.

| Relationship | Ends | Read as |
|---|---|---|
| has | Student 1, Loan 0..3 | A student has 0 to 3 loans, and a loan belongs to 1 student. |
| lends | Loan 0..1, Camera 1 | A loan lends 1 camera, and a camera is on 0 or 1 loan. |

- The due date is not stored. It follows from the time lent plus 7 days.

## Rules

### Three kinds of rule (slide 12)
- Anything important that the structure does not capture is documented as a rule.

| Type | Template | Example |
|---|---|---|
| Derived | A __ is __ when __. | A loan is overdue when more than 7 days have passed. |
| Bound | A __ has at most (or at least) __. | A student has at most 3 loans. |
| Condition | If __, then __. | If a camera is in for repair, then it is not on loan. |

### The rules of the second model (slide 13)
- Derived: a camera is available when it is not on loan and is not in for repair.
- Derived: a loan is overdue when more than 7 days have passed.
- Bound: a student has at most 3 loans.
- Condition: if a camera is in for repair, then it is not on loan.

## The procedure and the summary

### Seven steps (slide 14)
1. Collect every Given and Then line from the scenarios.
2. Highlight the recurring nouns. These become entities.
3. Sort the remaining phrases. A phrase about one thing is a property. A phrase that connects two things is a relationship. A phrase that follows from other facts is a derived rule.
4. Promote any relationship with state of its own to an entity.
5. Add a cardinality to each end of every relationship.
6. Write the remaining constraints as derived, bound or condition rules. Invalid states are a good place to look.
7. Check that every Given and Then can be expressed using the model.

### Summary (slide 15)
- **Scenarios are the source of the model.** Every element traces back to a Given or a Then, and every Given and Then can be expressed with the model.
- **Store facts, not conclusions.** "Full", "position" and "expired" are derived from other facts.
- **A relationship with state of its own becomes an entity**, as Loan and Place in line did.
- **Use structure first.** Entities, relationships and cardinalities come first, and rules cover only what the diagram cannot show.
- **More than one model can be correct.** Models differ in what the diagram enforces and what is left to the rules.

## In class

### The waitlist model
- The class built a data model for the section waitlist scenarios from lecture 17. The deck has no slide for it, so this section comes from your page and from slide 15.
- Your diagram has three entities: Student with a student ID and a name, Section with a number of seats, and Waitlist with a number of slots.
- "Enrolled" started as a property and was changed to a relationship between Student and Section. It connects two things, so step 3 of the procedure makes it a relationship.
- "Position" was crossed off Student. Slide 15 says position is derived from other facts, so it is not stored.
- Your page notes that the model was still missing the offer.
- Slide 15 names Place in line as a relationship that became an entity. The deck does not show what it stores. My reading is that it sits between Student and Waitlist and holds when the student joined, which is the fact that position is derived from.

## Clarifications
- **"Make this an entity? Is there a point?"** There is a point only when the relationship has state of its own. Here it does: the Then says "due back 7 days from now", so the model must hold when the loan was made. That time is a fact about the lending, so the lending needs to be an entity that can carry a property.
- **"Removing relationships is good or bad?"** Promoting does not remove the connection. One line between Student and Camera becomes a Loan box with two lines, "has" and "lends", and a student still reaches their cameras through their loans. It is neither good nor bad in general. Slide 15 says more than one model can be correct, and the test is whether every Given and Then can be expressed.
- **"Time relates to the loan, so that's why we can't put time on the student?"** Yes. A property is one simple fact per instance, and a student can have up to 3 loans, each made at a different time. One time on Student cannot hold three. The next sentence is my reasoning, not the deck's: a time on Camera would fit by count, because a camera is on at most one loan, but it would be empty whenever the camera is not lent, and it describes the lending and not the camera.
- The reader names the third rule kind "conditioned" and the deck names it "condition". Use the deck's templates on an exam.
- The reader's example of a bound rule is a cardinality. The deck shows "a student has at most 3 loans" both as the 0..3 on the diagram and as a bound rule, so writing a limit in both places is accepted.
- The reader lists a property's values as strings, numbers and booleans. The deck adds a time.

## Your notes

CPSC 310

[Diagram: a box "student" holding "student ID", and a box "camera" holding "in for repair". A line between them is labelled "on loan", with 1 at the student end and 0..3 at the camera end. Arrows label the box "entity", the line inside the box "property", and the line between the boxes "relationship".]

relationship: 1 student, 0–3 cameras

\* make this an entity? → is there a point?

→ removing relationships is good or bad?

? [Time relates to the loan, so that's why we can't put time to the student?]

Waitlist scenarios

[Diagram: a box "Student" holding "position" (crossed out), "StudentId" and "Name". An arrow labelled "enrolled" runs from Student to a box "Section" holding "seats #". A scribbled-out line runs from Student toward a box "waitlist" holding "slots #", which hangs below Section.]

missing: offer

enrolled: prop → relation
