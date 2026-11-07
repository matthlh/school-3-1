# CPSC 310 — Lec 14 (Tue Oct 27) — Midterm review

The lecture uses [08a-midterm-review.pdf](https://ubccpsc.github.io/310/26w1/lectures/08a-midterm-review.pdf) (21 slides). It reviews lectures 5, 6 and 8 to 10. The [midterm review page](../05-exam-review.md) and [cheat sheet](../06-cheat-sheet.md) cover the same material.

## Announcements (slide 2)
- REST is not on the midterm. It is covered the week after.
- The review materials are the practice midterm, your cheat sheet, the PrairieLearn labs and the activities in the lecture_code repo.

## Material to review (slides 3 to 21)
- Design patterns: what a pattern is and is not, when patterns help and hurt, the four questions (change, pain, mechanism, cost) and the three parts of a mechanism (abstraction, polymorphism and obliviousness, trigger).
- The summary table: each pattern puts an interface between the client and the thing that varies, so a new variant is a new class and the client does not change (Adapter and MusicSource, Composite and Employee, Decorator and Drink, State and PhoneState).
- The Open/Closed Principle, the three questions before adding an extension point, and the closed axis of every pattern (cheap new implementation, expensive new operation).
### Testability and substitutes

- Identify both problems in `printStatus()` using controllability and observability.
- Explain when to use a double. A stub controls what comes back. A spy records what was sent.
- DIP makes a double possible by putting an abstraction between the caller and the implementation. LSP checks whether the double keeps the contract.
