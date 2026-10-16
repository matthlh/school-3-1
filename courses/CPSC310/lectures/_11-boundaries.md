# CPSC 310 — Lec 11 (Thu Oct 15) — Boundaries: core, edges, ports and adapters

Deck: [06b-boundaries.pdf](https://ubccpsc.github.io/310/26w1/lectures/06b-boundaries.pdf), 11 slides, posted after class on Oct 15. The reader has no chapter called Boundaries; the terms come from [Design Principles](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/principles/) (single responsibility, dependency inversion) and [Testability & Test Doubles](https://ubccpsc.github.io/310/textbook/2-analytical-code-design/testability/), and the test-level slide previews [Testing Pyramid](https://ubccpsc.github.io/310/textbook/3-software-design/testing-pyramid/), which is lecture 12's chapter. Questions: 9 in [the bank](../02-questions.md) under "Lec 11". The schedule called this lecture "API design" before the deck went up, so the reader-chapter outline that stood here (the APIs chapter) was replaced by the deck. Slide 2 is the midterm notice; its details are in [03-logistics.md](../03-logistics.md). Built from the deck alone; Matt's notes go under Your notes when he sends them.

## Learning goals
- Explain how an interface shaped like its dependency lets a storage change leak into the business logic and its tests.
- Design a port in the core's terms, and an adapter that implements it.
- Separate the core (business logic) from the edge (I/O, parsing, wiring).
- Choose the test level (unit, integration or end-to-end) that should catch a given bug.

## Slides, organized
### Two kinds of code (slide 4)
- **Business logic** is the set of rules that make the system worth having, such as "a room cannot be double-booked". It changes when business concerns change.
- **Everything else** moves data in and out: files, databases, user interfaces and other services, plus logging, caching and authentication. It changes when the outside world changes.
- The goal is to keep the business logic separate from everything else, so that each changes for its own reasons.
- This builds on mechanisms from earlier lectures: interfaces and test doubles (lecture 6), Adapters (lecture 8) and choosing the axis of change (lecture 10).

### Core and edges (slides 5 and 6)
- The running example is a room-booking command-line tool. `main.ts` reads argv, picks a store and words the answer; `rooms.ts` holds `book()`; a `JsonBookingStore` reads and writes the file.
- The **core** is the business logic. It imports nothing from outside and does no I/O of its own.
- The **edges** hold the external concerns: I/O, parsing, validation, configuration such as file paths, and services such as auth, email and other APIs.
- A **port** is an interface owned by the core and defined in the core's own domain, such as `BookingStore`.
- An **adapter** is a class that implements a port using real resources, such as `JsonBookingStore` implementing `BookingStore` with the file system.
- The core uses the port, the adapter implements it, and the edge (`main.ts`) picks which adapter to hand the core. Every dependency points inward, toward the core.

### Where each responsibility went (slide 7)
- The deck compares the one-file version, 01-booking, with the split version, 02-booking.

| Responsibility | 01-booking | 02-booking |
|---|---|---|
| Read the command line | `main.ts` | `main.ts` (edge) |
| Check the booking rules | `book()` in `bookings.ts` | `refusalFor()` in the core |
| Keep a booking if valid | `book()` in `bookings.ts` | `book` in the core |
| Read and write the file | `book()` in `bookings.ts` | `JsonBookingStore` (adapter) |
| Know the file's field names | `book()`, the rules and the tests | `JsonBookingStore` (adapter) |
| Word the answer | `book()` in `bookings.ts` | `main.ts` (edge) |
| Pick where bookings are kept | `bookings.ts`, a hard-coded path | `main.ts` (edge) |

### Mixed responsibilities: the three costs (slide 8)
- In 01-booking one function had most of the jobs, so three things went wrong.
  - Every change risked the others. A field rename in the file was a storage change, and it edited the overlap rule.
  - No job could be tested alone. Testing the overlap rule needed JSON going in and a worded sentence coming out.
  - No job could be reused alone. A web frontend needs the rules, but not sentences worded for the command line.

### Each change lands in one place (slide 9)
- Isolating the business logic means it changes only when a rule changes, it is tested with plain values (no files, no wording), and any edge can use it: the command line, a web server, the tests.
- **Single responsibility principle**: each part of the system has one reason to change.

| Change | 01-booking | 02-booking |
|---|---|---|
| A tool renames a field in `booking.json` | `book()` and its tests | `JsonBookingStore` |
| A new rule, such as at most 2 bookings per day | `book()`, and tests full of JSON | the core, and plain-object unit tests |
| A new frontend, such as a web page | copy the rules out of `book()` | a new edge that calls the existing `book()` |

### How to test the system (slide 10)
- Each of the three parts gets its own test level.
- **Unit tests with a test double** cover the core (`rooms.ts`): many of them, each taking milliseconds, checking the business logic against a fake store.
- **Integration tests** cover the adapter (`JsonBookingStore` with a real file): a few fast ones with a temp file, checking the translation to and from the file.
- **End-to-end (E2E) tests** go through `main.ts`: one or two, checking the wiring. They are the slowest and the most realistic.

### Summary (slide 11)
- Business logic goes in the core; everything else is the edge. The core can call the edge only through interfaces it owns, so every dependency points inward.
- A port is owned by the core and written in its terms. An adapter does the translating.
- Test each thing at the narrowest level that can see it. That keeps tests from failing for the wrong reasons.

## Clarifications
- The deck's adapter is the lecture 8 Adapter pattern used at a storage boundary, with one difference in who owns the interface. In lecture 8 the interface sat on the client's side of a foreign library; here the port belongs to the core and is written in the core's words, which is what stops a storage change from leaking inward.
- "Every dependency points inward" is the reader's dependency inversion principle (Design Principles chapter): the core depends on an abstraction it owns, and the concrete store depends on that same abstraction rather than the other way round.
- The three test levels are lecture 12's testing pyramid in miniature. The deck only names them and matches each to a part of the system; the counts and the trade-offs come next lecture.
