# STAT 251 — Lec 6 (Mon Sep 21) — Ch 3: conditional probability and independence

No page from you for this one (sick). This file is the posted after-class deck organised for study, `Lecture_06_Chapter_3_CanvasPost_AL.pdf` (10 slides, Canvas file 48280545), plus what the Panopto recording adds. The first fifteen minutes finished lecture 5, and slides 8 and 9 were not reached, so lecture 7 opens with them. Formulas that are images in the deck are written from the recording.

## Learning goals
- Define conditional probability and use it, with the multiplication rule, to find joint probabilities.
- Define independence in three equivalent ways and test it with an equation, never with a Venn diagram.
- Apply independence to "at least one" questions through the complement.

## Slides, organized
### Finishing lecture 5 (recording, first fifteen minutes)
- The general addition rule again, with the Venn picture: adding P(A) and P(B) counts the overlap twice, so the overlap is subtracted once. For disjoint events P(A ∩ B) = 0 and the rule is just the sum. If A ⊂ B then P(A ∩ B) = P(A) and P(A) ≤ P(B), because A cannot grow past B.
- The baseball and hockey example, done as a method. Define the events first (A = likes hockey, B = likes baseball). Turn every sentence into a probability statement: P(A) = 0.65, P(B) = 0.45, P(A ∪ B) = 0.85. Name the rule, then solve for P(A ∩ B) = 0.25. He said written answers are marked this way: define the events, state the rule, show the steps, even when practising WeBWorK or multiple choice.
- The three-event addition rule is left as practice with a hint: treat A ∪ B as one event D, apply the two-event rule to D ∪ C, then expand the pieces.
- Probability as a long-run relative frequency: P(heads) = 0.5 says nothing about ten flips, which can easily give two heads. Plot the proportion of heads, heads divided by n, against the number of flips n. It starts at 0 or 1, wanders, and settles near 0.5 as n gets large, close by 10,000 flips but not necessarily by 100. Probability is the long-run proportion; the short run is random.

### Conditional probability (slides 2–3)
- Conditional probability is the probability of one event given that a related event has already occurred. For P(B) > 0, P(A | B) = P(A ∩ B) / P(B), read "the probability of A given B". The given event is always the denominator, which is why it needs positive probability.
- On the Venn diagram P(A | B) is the proportion of B that is also in A: the overlap divided by the whole of B.
- Worked example: P(A) = 0.60, P(B) = 0.40 and P(B | A) = 0.6. P(B | A) and P(A | B) are different things. First P(A ∩ B) = P(B | A) P(A) = 0.36, then P(A | B) = 0.36 / 0.40 = 0.9.

### The multiplication rule (slide 4)
- Rearranging the definition gives P(A ∩ B) = P(A | B) P(B), and equally P(A ∩ B) = P(B | A) P(A). Multiply the conditional probability by the probability of its given event.

### Independence (slides 4–6)
- A and B are independent when knowing one occurred does not change the probability of the other: P(A | B) = P(A), or equivalently P(B | A) = P(B), or equivalently P(A ∩ B) = P(A) P(B). If one holds, all three hold.
- Independence is shown with one of the three equations, never from a Venn diagram. A Venn diagram shows disjointness, which is a different concept.
- Disjoint events with positive probability are never independent. Disjoint gives P(A ∩ B) = 0, and P(A) P(B) = 0 would force one of the events to be impossible. Independence needs something in common to test.
- Worked example: flip a fair coin and roll a fair die, 12 equally likely outcomes. A = tail (6 outcomes), B = even number (6 outcomes), A ∩ B = {(T,2), (T,4), (T,6)}. P(A ∩ B) = 3/12 = 1/4 and P(A) P(B) = (6/12)(6/12) = 1/4, so A and B are independent. Obvious here, but it shows the test.
- Rule for questions: unless independence is stated, or is physically certain like a coin and a die, do not assume it. Assuming it makes the question easier and the answer wrong.

### At least one switch fails (slide 7)
- Eight switches, each works with probability 0.99, independently. "At least one fails" splits into many cases (exactly one, exactly two, and so on, each in many arrangements), so take the complement: P(at least one fails) = 1 − P(all work) = 1 − P(A₁ ∩ … ∩ A₈) = 1 − 0.99⁸ = 0.0772, using independence to multiply. Define Aᵢ = switch i works properly before writing anything.

### Not reached (slides 8–9; lecture 7 opens with them)
- If A and B are independent, so are Aᶜ and B, A and Bᶜ, and Aᶜ and Bᶜ. The deck proves the first: P(Aᶜ ∩ B) = P(B) − P(A ∩ B) = P(B) − P(A) P(B) = (1 − P(A)) P(B) = P(Aᶜ) P(B).
- Recap example: P(D) = 0.5, P(E) = 0.6, P(D ∪ E) = 0.65. The addition rule gives P(D ∩ E) = 0.45, so P(E | D) = 0.45 / 0.5 = 0.9. Not independent: 0.45 is not 0.5 × 0.6 = 0.3, or equally P(E | D) = 0.9 is not P(E) = 0.6.

### Next class
- Wednesday Sep 23: Bayes' theorem and examples (lecture 7; its before-class deck is outlined in `_07-bayes-theorem.md`).

## In class
- iClicker: a question gave P(B) = 0.5 with A and B independent and asked for P(B | A). Answer D, which is 0.5 straight away, because independence means P(B | A) = P(B). Several people multiplied and divided their way to the same number; he wanted the ten-second route.

## Clarifications
- "Given" decides the denominator. P(B | A) divides by P(A); P(A | B) divides by P(B). The numerator P(A ∩ B) is the same in both, which is what links them and gives Bayes' theorem next class.
- Independent trials (each coin flip) and independent events (subsets of one sample space) are different objects; the equations define the second.

Questions: 13 in [02-questions.md](../02-questions.md) under "Lec 6". Ledger: 3 topics, due Sep 22.
