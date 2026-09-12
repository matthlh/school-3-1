# CPSC 310 — Lecture 3 pre-read: Cohesion and connascence (Thu Sep 17)

Pulled 2026-09-11 from the reader chapter *Change Difficulty*
(https://ubccpsc.github.io/310/textbook/2-analytical-code-design/change-difficulty/). The deck was
not posted yet.

## What the chapter claims
- Two axes explain what makes a change costly: **cohesion** and **coupling**.

### Cohesion
- Cohesion is how focused a program element is on performing a single complete task. The reader discusses it at the class level: how well the elements within a class belong together.
- Low-cohesion classes do many things, so they carry competing concerns. A fix for one defect can break behaviour that another feature relied on by design. The larger the class, the more likely this is.
- A cohesive class has a small set of private fields that most of its public methods use. Fields used by only a few public methods are a sign that those methods and that field do not belong.
- Cohesive classes are smaller, so a system has more of them. That makes the right class harder to find but each class much easier to understand and change.
- Cohesion is measured by two properties.
  - **Reasons**: how many concepts are present in a grouping of code.
  - **Type**: how a pair of concepts is related. The three types are **data** (line 2 uses a value from line 1), **logic** (two calls grouped under the same branch, such as `denyAccess()` and `raiseAlarm()`), and **timing** (`clearCanvas()` must run before `redrawCharacters()`).

### Coupling
- Coupling is the strength of the connections between program elements. Strong coupling hurts evolvability and maintainability for four reasons.
  - Errors in one part propagate to unrelated parts.
  - A single bug fix or feature is scattered across the codebase.
  - Tightly coupled code is hard to reuse independently.
  - A coupled element cannot be understood in isolation.
- Coupling between two groups of code is measured on three attributes.
  - **Degree**: how many connections there are.
  - **Locality**: how far apart the groups are.
  - **Strength**, called **connascence**: how strong the bonds are.
- Connascence names what two pieces of code must agree on. The reader lists five kinds.
  - **Name**: what something is called (a `userId` field renamed in one place and not the others still compiles but lookups fail).
  - **Type**: the shape of the data (callers all assume a four-field tuple; one side adds a field).
  - **Value**: a specific literal (the string `"pending"` hard-coded in validation, reporting and the UI).
  - **Position**: argument order (`createInvoice(customerId, startDate, endDate, total, tax)` with total and tax swapped still compiles).
  - **Algorithm**: a computation that must be done the same way everywhere (four modules each computing a discount slightly differently).
- Coupling is **explicit** (a method call, a class import) or **implicit** (a magic value used across the codebase, a duplicated algorithm). Implicit coupling is more dangerous because it is harder to tell whether a change has covered the whole coupled scope.

### Addressing coupling
- Every non-trivial system needs some coupling. The goal is to make it as loose as possible, not to remove it. There are three moves, one per attribute.
  - Minimise the number of interfaces between elements (Degree).
  - Minimise the distance between interfaces (Locality). If coupling crosses entirely different systems, extract the shared code into a common library.
  - Minimise the complexity of interfaces (Connascence). Moving from connascence of Algorithm to connascence of Type means coupled code only has to adhere to a type instead of reimplementing an algorithm, which makes each change cheaper.
- The chapter ends with a heading *Design Symptoms* that had no content when pulled.

## Three pre-lecture questions
1. Define cohesion. Name the two properties the reader measures it by, and the three relationship types, with a one-line example of each.
2. Name the three attributes of coupling and the five kinds of connascence. For each kind, say what the two pieces of code must agree on.
3. Why is implicit coupling more dangerous than explicit coupling? Which of the three coupling-reduction moves turns connascence of Algorithm into connascence of Type, and why is that cheaper?
