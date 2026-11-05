Built from the reader chapter [Assertions](https://ubccpsc.github.io/310/textbook/1-construction-basics/assertions/) because it is the only chapter about checking code against its specification; the deck replaces this outline once it is posted.

# CPSC 310 lecture 16 — Specifications & Modeling (outline)

## Assertions check behaviour against the specification

- A compiler checks syntax, but only a test suite checks that runtime behaviour matches the **specification**.
- **Assertions** are the main tool a unit test uses to decide whether the output is correct.

## Two models for structuring a test

- **Four-Phase Test** has four steps.
  - Set up the test environment.
  - Execute the **code under test** (CUT).
  - Evaluate the CUT's output.
  - Tear the environment down.
- **Given-When-Then** comes from behaviour-driven development (BDD), which treats tests as executable specifications.
  - Given is the known starting state.
  - When is the key action, usually named in plain language in the test title.
  - Then checks the output.

## Specific assertions beat generic ones

- Chai's expect style supports deep equality, type checks, length checks and set membership.
- `expect(arr).to.contain('c')` and `expect(arr.indexOf('c') >= 0).to.equal(true)` check the same thing.
- The first one fails with a message naming the array and the missing value; the second only says false is not true.
- So a specific assertion makes a failure faster to diagnose.

## What to test

- Test each behaviour as independently as possible, so one break fails one test and one change edits one test.
- Cover three kinds of condition.
  - Normal conditions are the expected use.
  - Unexpected conditions are misuse.
  - Boundary conditions are the edges of the input range.
- Make expected and actual explicit variables in the test so the comparison is easy to read.
