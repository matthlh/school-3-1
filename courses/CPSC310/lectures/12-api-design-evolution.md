# CPSC 310 — Lec 12 (Tue Oct 20) — API Design & Evolution

Deck: [07a-api-design-evolution.pdf](https://ubccpsc.github.io/310/26w1/lectures/07a-api-design-evolution.pdf), 20 slides, posted on lecture day (the title slide still says 06b). Reader: [APIs](https://ubccpsc.github.io/310/textbook/3-software-design/apis/) for the design half and [Safe Versioning](https://ubccpsc.github.io/310/textbook/3-software-design/versioning/) for change severity; the sidebar's Testing Pyramid chapter, which slides 4 to 8 preview, returned 404 on Oct 20, so those slides stand on the deck alone. Questions: 11 in [the bank](../02-questions.md) under "Lec 12". Slide 2 is housekeeping (D3 posted, due Nov 6, planning task before Lab 07; midterm Thu Oct 29 19:00, practice exam on Piazza) and is in [03-logistics.md](../03-logistics.md), not here. Built from the deck and the reader; Matt takes no notes in this course.

## Learning goals
- Analyze an API against four design criteria: information hiding, obliviousness, usability (easy to use, hard to misuse) and contract completeness.
- Describe the impact of an API change on its clients as a severity: major, minor or patch.
- Propose alternative API designs and alternative changes that reduce that impact.

## Slides, organized

### Recap: core and edges (slide 3)
- The booking tool from lecture 11 is the running picture: `main.ts` reads argv, picks a store and words the answer at the **edge**; `rooms.ts` holds `book()` in the **core**; `JsonBookingStore` implements the `BookingStore` interface.
- A **port** is an interface owned by the core and written in the core's own terms. An **adapter** is a class that implements a port using real resources such as the file system or the network.
- The core imports nothing from outside and does no I/O of its own. External concerns (I/O, parsing, validation, config such as file paths, services such as auth, email and other APIs) all sit at the edge.

### Testing at the boundary (slides 4 to 8)
- Boundaries give a test suite its structure. There are three places to test.
  - **Across boundaries**: does the whole application work, usually from the user's point of view.
  - **Within a boundary**: does this one unit of code behave as expected.
  - **Between boundaries**: do the adapters translate correctly between the domain and the system.
- **End-to-end (E2E) tests** test across boundaries, written the way the system is used (the project's own tests are this kind). They give real assurance but have four costs: poor fault localization, many possible reasons for one failure, they are cumbersome to write, and they are expensive to run.
- **Unit tests** test within a boundary, usually one function or method. They are easy to write and later read as documentation, very fast, and the most direct way to localize a fault, because test doubles stand in for dependencies and a breakpoint lands right at the code. Their limit is that they check behaviour in isolation only.
- **Integration tests** test between boundaries and bridge the gap between the other two. The approach is to run the core with the real adapter instead of a test double, and let the adapter use an actual resource, such as a file on disk.
- **Test suite composition**: the majority of tests are unit tests, several integration tests sit at each boundary, and a few end-to-end tests make sure the whole application works. The deck draws this as a pyramid numbered 3, 2, 1 from the base up.

### What an API is and why it is forever (slides 10 to 13)
- An **API** is a way for two or more programs to communicate. The deck's picture is a client on one side, a component on the other, and the API as the line between them.
- APIs provide **information hiding**: only the necessary functions are exposed, the abstraction emphasizes essential characteristics and suppresses detail, the caller assumes nothing about how the interface is implemented, and so the effects of internal changes stay local.
- **APIs are forever.** Once published, an API becomes a dependency for many teams, services and applications, and a change to a widely used API can break thousands of clients.
- A good API amplifies its value: it makes developers more productive, reduces errors, and its stability encourages reuse and long-term adoption.
- APIs must still evolve as requirements change. The rule is that internals should change freely and the API surface should change rarely, and when the API does change it must not break clients.

### Start with the task (slides 14 and 15)
- API design starts from the task, not the implementation. Ask what a developer should be able to do easily, what sequence of actions should feel natural and predictable, and what mistakes the API should help the developer avoid. The API should present an abstraction that matches how developers think about the task.
- The deck's counter-example is a `UserStore` whose client had to look in several places to get the result of one task, write extra code for a simple task, touch important internal variables, and infer ambiguous behaviour. Each of those is a usability flaw.

### The four design principles and their tests (slide 16)

| Principle | The question to ask of a fragment |
|---|---|
| **Information hiding** | Is internal state or structure exposed that callers should not see or touch? |
| **Obliviousness** | Does the caller need to know something about the implementation to use the API correctly? |
| **Easy to use, hard to misuse** | Can the type system prevent incorrect usage, such as a wrong call order or incorrect parameters? |
| **Contract completeness** | Do the signatures and JSDoc fully capture what can go wrong and what callers can rely on? |

### Change severity (slides 18 and 19)
- An API is an agreement with a client, so changing the API changes the agreement. The goal is to know how a code change will affect the client before making it.
- Two questions size a change: **when** will the client experience it, and **what** will the client need to do to adopt it.
- The levels, by what the client must do:
  - **MAJOR**: an incompatible change, one that requires clients to update their code.
  - **MINOR**: backwards-compatible functionality added, a structural change that needs no client update, such as a new method or an optional parameter.
  - **PATCH**: a backwards-compatible improvement, a behavioural change that clients need not adopt and that needs no code change, such as a minor bug fix or a performance improvement.
  - **NONE**: a change that does not affect clients at all, such as a refactoring.

### Summary (slide 20)
- APIs define stable boundaries and act as contracts that many clients depend on.
- Good API design minimizes change: clear tasks, small surfaces and hidden internals keep an API stable.
- Internals change freely; APIs should not, because a well-designed API protects clients from internal evolution.
- When an API must evolve, the question is whether the change will break clients.

## From the reader

### APIs chapter
- The reader's one design tenet is that APIs should be **easy to use and hard to misuse**.
- Design starts from two questions: what is the goal of the API, and who is its intended consumer. The reader suggests a one-page spec of goals and users, then proof-of-concept client code, because duplicated or awkward client code shows where the API is wrong.
- High-level advice is about **cohesion**: an API should do one thing and do it well, stay as small and simple as possible because a released API is hard to shrink, and never expose internal implementation details.
- Low-level advice is about **coupling**: avoid long parameter lists, return descriptive objects rather than primitives, avoid exceptional returns, express exceptions in the API's own terms, return immutable values, and limit the API's surface so clients cannot depend on internal classes, fields and methods.
- **Usability** is the overlooked attribute: the API's user is a developer, so meaningful names, parameter types and data formats are its affordances, and the techniques come from user-interface design (prototyping, user studies) plus documentation of constraints and pre- and post-conditions.

### Safe Versioning chapter
- The running example is `Library.checkout(book, duration)` with `duration` in days, and the wish to accept weeks, days and hours.
- Replacing `duration: number` with a `Duration` object is a breaking change at compile time. Silently reinterpreting the number as weeks keeps the signature and breaks callers at run time, which is worse because clients find out only when their code misbehaves.
- Non-breaking routes: a union type `number | Duration`, a new method such as `checkoutSpecific(book, duration: Duration)`, or a new parameter with a default such as `durationType = "days"`.
- A defect fix is normally a patch, but it is breaking when clients have come to rely on the defect, such as an off-by-one they were correcting for.
- **Semantic versioning** writes a version as Major.Minor.Patch. A release bumps the number for its most severe change and resets the numbers below it: from 3.8.1, fixes only give 3.8.2, and a breaking change gives 4.0.0.
- REST APIs are changed in backwards-compatible ways where possible, because running several live versions is costly. A necessary breaking change ships as `/v2/checkout` beside `/checkout`, the old route is deprecated, and it is removed once every client has moved. Starting with a `/v1` prefix leaves room for that.

## Clarifications
- The deck and the reader split minor and patch differently. The deck puts performance improvements under PATCH (behavioural, nothing to adopt); the reader's Safe Versioning chapter lists small performance improvements under minor. On an exam, follow the definitions as asked: a structural, opt-in addition is minor; a behavioural, nothing-to-change improvement is patch.
- The deck's NONE level (refactoring, no client effect) has no name in the reader, which only says such a change has no client impact.
- Slides 4 to 8 repeat the test-level material that lecture 11 previewed, with the E2E costs and the composition rule added. The Testing Pyramid chapter they point to is not published as of Oct 20.
