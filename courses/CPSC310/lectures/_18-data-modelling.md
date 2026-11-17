Built from the reader chapter [Data Modelling](https://ubccpsc.github.io/310/textbook/4-modelling/data-models) because the lecture title is the chapter title; the deck replaces this outline once it is posted.

## Data requirements

- A data model comes after the scenarios, and its job is to support every one of them.
- The end goal is to represent and compute every state, relationship and rule that appears in any scenario.
- Before drawing anything, work out the minimal information each Given, When and Then needs.
- The reader's example is a student joining a course waitlist when the section is full.
    - Computing "waitlist is full" needs the waitlist's capacity and how many students are on it.
    - The Then "student is at the end of the waitlist" also needs the order of students on the waitlist, not just who is on it.
- Going through every scenario this way gives the full set of data requirements.

## What a data model is

- A data model represents the state from all scenarios in one unified view.
- It stays in the problem domain, in the client's language, so it is **implementation agnostic**.
    - It makes no assumptions about storage, data structures or language features.
    - Technology choices such as the database or the programming language come later.
- CPSC 310 uses a simplified **Entity Relationship Diagram (ERD)** with three parts.
    - **Entities** are abstractions for instances of a thing, holding the properties each instance has.
    - **Properties** are primitive values (strings, numbers, booleans) attached to an entity.
    - **Relationships** connect entities by reference and are annotated with their kind.
- Each side of a relationship has a **cardinality**, the number of things on that side; a bicycle relates to exactly 2 wheels.

## Rules

- A **rule** is a limit, condition or consequence from the scenarios that the entities, properties and relationships do not capture by themselves.
- The reader names three common kinds.
    - A **derived** rule is enforced separately from the data it depends on; a due date is a property, but enforcing it is a derived rule.
    - A **bound** rule limits one entity, property or relationship, such as a cardinality or a minimum value.
    - A **conditioned** rule restricts two or more things together, such as a student being exactly one of not enrolled, waitlisted or enrolled.
- Rules point ahead to implementation: they become methods, routes or validations.

## Testing a data model

- Apply the scenarios to the model to check it is sufficient.
- Every phrase in each scenario's Given and Then must map to something in the model.
- If any scenario cannot be expressed, the model is insufficient and needs revising.
