# CPSC 310 — Lec 12 (Tue Oct 20) — API Design & Versioning (outline)

Built from the reader chapter [Safe Versioning](https://ubccpsc.github.io/310/textbook/3-software-design/versioning/) because the lecture title names versioning, and Thursday's lecture (REST API Design) will take the [APIs](https://ubccpsc.github.io/310/textbook/3-software-design/apis/) chapter; the deck replaces this outline once it is posted.

## Why versioning matters

- Once an API is released, clients depend on what it promised, so the API's authors can no longer change it freely.
- An API that fits its clients' needs (high cohesion with those needs, low coupling in what it exposes) is easier to change later without breaking that agreement.
- The chapter's question is how severe a given change is for clients, and how to make a change with the least client impact.

## Change severity

- The running example is `Library.checkout(book, duration)`, where `duration` is a number of days, and the goal is to let clients give weeks, days and hours.
- A **major** (breaking) change forces clients to change their code.
  - Replacing `duration: number` with a `Duration` object breaks every caller at compile time.
  - Silently reinterpreting `duration` as weeks keeps the signature but breaks callers at run time, which is worse because clients only find out when their code misbehaves.
- A **minor** change adds functionality in a backwards-compatible way, and clients opt in or keep their old code.
  - A union type, `duration: number | Duration`, keeps old calls working.
  - A new method such as `checkoutSpecific(book, duration: Duration)` leaves `checkout` untouched.
  - A new parameter with a default, such as `durationType: string = "days"`, also keeps old calls working.
  - New methods and small performance improvements that need no client change also count as minor.
- A **patch** change is a backwards-compatible defect fix or small optimisation, such as no longer throwing an unexpected error for a negative duration.
- A defect fix can still be breaking when clients have come to rely on the defect, for example an off-by-one that clients were correcting for.
- A change that clients cannot observe, such as a refactoring, has no client impact.

## Semantic versioning

- A package version is written `Major.Minor.Patch`, for example 3.8.1.
- A release bumps the number for its most severe change and resets every number below it to zero.
- From 3.8.1, a release with only defect fixes is 3.8.2, and a release with a breaking change, a minor change and a defect fix is 4.0.0.
- The version number tells clients at a glance whether they can upgrade safely and how much work it will take.

## REST versioning

- REST APIs are usually changed only in backwards-compatible ways, because running several live versions in production is costly.
- A necessary breaking change ships as a new version beside the old one, and the old one is then retired.
  - First only `/checkout` exists.
  - Then `/checkout` and `/v2/checkout` both run.
  - `/checkout` is marked deprecated and clients are asked to move.
  - Once every client has moved, `/checkout` is removed.
- Experienced engineers start with a `/v1` prefix so that a later breaking version has an obvious place to go.
- Smaller safe changes work the same way as in code: an opt-in endpoint such as `/checkoutSpecific`, or optional parameters.
