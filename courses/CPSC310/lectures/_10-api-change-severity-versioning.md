Built from the reader chapter [Safe Versioning](https://ubccpsc.github.io/310/textbook/3-software-design/versioning/) because the lecture title names change severity and versioning; the deck replaces this outline once it is posted.

## Why versioning matters
- Once an API is released, clients depend on its promised behaviour, so the team cannot freely change it.
- A well-designed API (high cohesion with client needs, low coupling) makes later changes less likely to break the agreement.
- Every API still has to change eventually, so the question is how severe a change is for clients and how to release it with the least impact.

## Change severity
- A **major** (breaking) change forces clients to change their code. Changing a parameter from `number` to a `Duration` type is one, because existing calls no longer typecheck.
- Changing behaviour without changing the signature (treating `duration` as weeks instead of days) is also major, and worse, because clients only find out when they run the code.
- A **minor** change adds functionality in a backwards-compatible way, so clients may opt in or ignore it. Examples are accepting `number | Duration`, adding a new method such as `checkoutSpecific`, or adding a parameter with a default.
- Enabled-by-default additions such as small performance optimisations and new exposed methods are also minor, as long as clients need no code changes.
- A **patch** change is a backwards-compatible small fix, such as fixing a defect or an optimisation.
- A defect fix can still be breaking if clients came to rely on the buggy behaviour, for example by correcting for an off-by-one.
- A change with no client impact, such as a refactoring, is none of these.

## Semantic versioning
- A version is written Major.Minor.Patch, for example 3.8.1.
- The release increments the number for the most severe change it contains, and resets every lower number to zero.
- A release with a breaking change, a minor change and a defect fix is therefore 4.0.0.
- A release with only a defect fix goes from 3.8.1 to 3.8.2.
- Clients read the version to judge whether they can adopt an update and how much work it needs.

## REST versioning
- Running several live versions in production is hard, so REST APIs are usually changed in backwards-compatible ways.
- For a critical breaking change, the team deploys a new version (`/v2/checkout`) while the old `/checkout` keeps running.
- The old endpoint is then marked deprecated, clients are encouraged to move, and it is removed once all clients have switched.
- Seasoned engineers start every API under a `/v1` prefix so a later breaking version is easy to add.
- Smaller safe changes work as in a library: add an opt-in endpoint such as `/checkoutSpecific` or an optional parameter instead of editing the existing one.
