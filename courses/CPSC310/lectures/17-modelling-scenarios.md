# CPSC 310 — Lec 17 (Thu Nov 12) — Modelling: Scenarios

Matt was absent, so nothing on this page comes from class. The lecture notes follow [10b-scenarios.pdf](https://ubccpsc.github.io/310/26w1/lectures/10b-scenarios.pdf) (10 slides). The reader has no chapter on scenarios, so the deck is the source. Its closest chapter is [Blackbox Testing](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/blackbox/), which covers an input space systematically the way this deck covers starting states. The deck continues the section waitlist example from [lecture 16](16-modelling-specification.md). See "Lec 17" in the [question bank](../02-questions.md).

## Learning goals
- Write requirement scenarios in terms of system state.
- Identify the operations that change system state.
- Reason about valid, invalid and unspecified system states.
- The next lecture returns to modelling state as data and relations.

## What a scenario is

### Where scenarios sit (slide 3)
- The chain from lecture 16 still applies: requirements, models, specifications, code.
- Moving down the chain makes the description more concrete, and moving up makes it more abstract.
- Each neighbouring pair is linked in both directions, so work on a lower level sends you back to fix the level above it.
- Scenarios are the tool for the first link, from requirements to a model.

### Given, when, then (slide 4)
> **Definition.**
> - A **scenario** is one concrete example of the requirements in action. It says what the system should do in one specific situation.
> - **Given** is the state of the system before the action.
> - **When** is one action that an actor, such as a user, performs.
> - **Then** is the state of the system after the action.
- Writing scenarios does two jobs. It reveals requirements that are ambiguous or missing, and it suggests the data the model will eventually need.

### The deck's first scenario: joining the waitlist (slides 5 and 6)
- The request is the section waitlist from lecture 16: a full section has a waitlist of at most 50, a student cannot join twice or join while enrolled, and a freed seat is offered to the first student in line for 24 hours.

| Part | Scenario #1: joining the waitlist |
|---|---|
| Given | The section is full. The waitlist is not full. The student is not enrolled. The student is not on the waitlist. |
| When | The student joins the waitlist. |
| Then | The student is added at the end of the waitlist. |

- Every Given line is a fact about state, and each one comes from a sentence of the request.
- Flipping any one Given line gives a different starting state, which needs its own scenario.

## Writing scenarios well

### Scenarios surface hidden assumptions (slide 7)
- Requirements never state every rule.
- Writing a scenario exposes the assumptions hidden in the text, because you have to write down a full before state and a full after state.
- Once an assumption is in the open, you make a decision about it and document the decision.
- Fill a gap with a reasonable decision where you can.
- Go back to the client to ask, or to verify the decision you made.

### Five tips (slide 8)
- **Stay in the problem domain.** Describe what happens in the client's terms, not how it is built.
- **Use words from the requirements.** Write "waitlist", "offer" and "enrolled", not your own synonyms.
- **Be consistent.** List the same state items in the same order in every scenario, so the differences between two scenarios stand out.
- **Cover the space.** For each action, work through every valid starting state. Being systematic is how edge cases get found.
- **Keep it short.** Declare what is true, not the steps that made it true.

## When scenarios disagree

### Conflicting requirements (slide 9)
> **Definition.** **Conflicting requirements** occur when more than one Then state is valid for the same Given and When.
- The deck's example starts with a seat that has freed up and is on offer to the first student on the waitlist, with the offer still pending.
- A different student then tries to enrol.
- One valid Then is that the new student is enrolled, because the section is not full.
- The other valid Then is that the new student cannot enrol, because the seat is being held for the student who has the offer.
- To resolve a conflict, decide which requirement takes priority, and confirm with the client if the choice matters to them.

## In class

### Scenario #8: accepting an offer (slide 10)
- The slide shows this scenario and then a sequence of events to test it against.

| Part | Scenario #8: the student accepts an offer |
|---|---|
| Given | 1. The student has an offer. 2. The offer is not expired. 3. The student is not enrolled. 4. The section is not full. |
| When | The student accepts the offer. |
| Then | The student is enrolled. |

- The sequence is: student A accepts the offer, then immediately unenrols. Student B receives the offer. Student A accepts the offer again.
- The deck does not show the answer, so the reading below is mine.
- The Then is incomplete. It says the student is enrolled and nothing else, so after accepting, student A still has an offer that has not expired.
- When A unenrols, all four Given lines are true for A again: A has an offer, it is not expired, A is not enrolled, and the section is not full.
- So the scenario as written lets A accept a second time and take the seat that is on offer to B.
- The fix is to state everything that changes: the student is enrolled, the student is off the waitlist, and the student no longer has an offer. The request says the first two directly: a student who accepts is enrolled and comes off the waitlist.

## Clarifications
- The deck numbers its scenarios #1 and #8, so six others were written in class and are not in the PDF.
- A scenario is the same given, when, then that lecture 16 used for a walkthrough step and for a unit test. The scenario comes first: it is written from the request alone, in the client's words, before there is a model to trace or code to test.
- The learning goals mention unspecified states, and the slides do not define the term. In lecture 16's vocabulary a starting state the request never speaks to has unspecified behaviour, and slide 7 says what to do with one: decide, document the decision, and verify it with the client.
