# CPSC 310 — Lec 14 (Tue Oct 27) — Midterm review

Deck: [08a-midterm-review.pdf](https://ubccpsc.github.io/310/26w1/lectures/08a-midterm-review.pdf) (21 slides, pulled 2026-10-28). No reader chapter; the deck recaps lectures 5, 6 and 8 to 10. No new questions: everything on it is already banked under those lectures, and the [midterm review page](../05-exam-review.md) and the [cheat sheet](../06-cheat-sheet.md) carry it.

## Announcements (slide 2)
- REST is not on the midterm. It is covered the week after.
- The review materials are the practice midterm, your cheat sheet, the PrairieLearn labs and the activities in the lecture_code repo.

## What the deck recaps (slides 3 to 21)
- Design patterns: what a pattern is and is not, when patterns help and hurt, the four questions (change, pain, mechanism, cost) and the three parts of a mechanism (abstraction, polymorphism and obliviousness, trigger).
- The summary table: each pattern puts an interface between the client and the thing that varies, so a new variant is a new class and the client does not change (Adapter and MusicSource, Composite and Employee, Decorator and Drink, State and PhoneState).
- The Open/Closed Principle, the three questions before adding an extension point, and the closed axis of every pattern (cheap new implementation, expensive new operation).
- Testability: controllability and observability, the `printStatus()` example with its two problems, test doubles (stub controls what comes back, spy records what was sent), when to double, DIP as what makes a double possible, and LSP as the test of whether a double is valid.
