# CPSC 310 — Lec 11 (Thu Oct 15) — API design

Built from the reader chapter [APIs](https://ubccpsc.github.io/310/textbook/3-software-design/apis/) because the lecture title is "API design" and no deck is posted yet; the deck replaces this outline once it is posted (the 12:30 task rebuilds it). Reader chapter only, no deck and no questions yet.

## What an API is (chapter opening)
- An **API** (application programming interface) is the programmatic interface for interacting with a software system. It can sit at the level of a method, a class or an online service.
- The clients can be user-interface code, other backend services, or third parties.
- An API has two main purposes. It gives a predictable way to interact with the system, and it hides the implementation from the client.
- Hiding the implementation is what lets the API owner change the inside without breaking anyone who depends on it.
- Web services pushed API design to the front, usually as REST interfaces, because a service behind an API can be maintained, updated and billed without releasing its source code.
- Once clients use a public API it is hard or impossible to change, which is the saying "APIs are forever". That long life is why an API must be designed to be easy to understand, use, maintain, secure and extend.
- API design is iterative and needs several viewpoints, from inside the organisation and from the engineers who will use it. There are many design options and the right one balances those concerns.

## API design principles
- The two first questions are what the goal of the API is and who its intended consumer is. Their answers drive the technical choices: languages, protocols, data formats, versioning, licensing and authentication.
- The one design tenet: **an API should be easy to use and hard to misuse**.
- Do not design in a vacuum. Start with a one-page spec of the goals and users, loop in as many stakeholders as possible, and build several proof-of-concept clients, because client code shows where the API makes code duplicated, awkward or error-prone. Automated tests validate the API but are not enough on their own.
- High-level advice is about **cohesion**:
  - An API should do one thing and do it well.
  - Keep it as small and simple as possible, because once released it is hard to remove anything.
  - Never expose internal implementation details; they make the API harder to use and harder to change.
  - Usability to another engineer is set by the API's quality: names must be considered and consistent, and the constraints and the pre- and post-conditions documented. Consistency lets a developer move from one API to the next without surprise.
- Low-level advice is about reducing **coupling** (and connascence):
  - Avoid long parameter lists, because clients mix the parameters up.
  - Return descriptive objects rather than primitives, so documentation is simpler, fields can be added later, and the client does not have to parse primitives.
  - Avoid exceptional return values, so the client can use the return directly without extra checks.
  - Communicate exceptions in the API's own terms, so they make sense to the client and do not leak the implementation.
  - Return immutable values, so nothing changes unexpectedly between producer and client.
  - Limit the API's surface, so clients cannot depend on internal classes, fields or methods.

## Usability
- The user of an API is the developer who has to learn it. Good affordances (meaningful names, parameter types, data formats) and thinking through how the API will be used in practice ease adoption and stop clients using it wrongly.
- Usable API design mixes strong development practice with user-interface techniques such as prototyping and user studies, plus effective documentation.

## API platforms
- API platforms appeared in the early 2000s when companies realised they could build a core set of functionality and let customers and third parties extend it, instead of building every niche version themselves.
- For a company whose API is the product, an opaque or hard-to-understand API will not be adopted, so design quality decides the business.

## References the chapter points at
- Joshua Bloch's slides on how to design a good API (he designed the java.util package).
- Libraries with well-regarded APIs: the JDK, Android, Guava and Joda-Time.
