# STAT 251 — Lec 6 (Mon Sep 21) — Ch 3: conditional probability, independence and applications — outline, pulled before class

Staged on Sat Sep 19 from the before-class deck `Lecture_06_Chapter_3_BL_CanvasPost.pdf` (10 slides, Canvas file 47723642). The class first finishes lecture 5's last two slides: the three-event addition rule and probability as a long-run relative frequency. The formulas on slides 2 and 4 are images, so they are written from the slide text.

## Outline
- Conditional probability says how two events are related: the probability of one event given that a related event has occurred. For P(B) > 0, P(A | B) is read "the probability of A given B" and equals P(A ∩ B) / P(B).
- Example on slide 3: P(A) = 0.60, P(B) = 0.40 and P(B | A) = 0.6. Find P(A | B). The route is P(A ∩ B) = 0.6 × 0.60 = 0.36, so P(A | B) = 0.36 / 0.40 = 0.9.
- Rearranging the definition gives the multiplication rule: P(A ∩ B) = P(A | B) P(B), and also P(A ∩ B) = P(B | A) P(A).
- Independence defined through conditional probability: A and B are independent when knowing one occurred does not change the probability of the other, that is P(A | B) = P(A), or equivalently P(B | A) = P(B).
- The equivalent test: A and B are independent if and only if P(A ∩ B) = P(A) P(B). For independent events the probability that both occur is the product of the two probabilities.
- The deck's warning in bold: do not confuse mutually exclusive (disjoint) events with independent events.
- Slide 6 is a figure with no text, most likely the picture behind the definitions.
- Example on slide 7: a machine has 8 switches, each working properly with probability 0.99, independently. The probability that at least one fails is 1 − 0.99⁸ ≈ 0.077.
- Example on slide 8: if A and B are independent, then Aᶜ and B, A and Bᶜ, and Aᶜ and Bᶜ are independent too.
- Example on slide 9: P(D) = 0.5, P(E) = 0.6 and P(D ∪ E) = 0.65. Find P(E | D) and decide whether D and E are independent. The addition rule gives P(D ∩ E) = 0.45, so P(E | D) = 0.9, and 0.5 × 0.6 = 0.3 is not 0.45, so they are not independent.
- Next: lecture 7, Bayes' theorem.

## Pre-lecture questions
1. Define P(A | B) and derive the multiplication rule from it. If P(A) = 0.6, P(B) = 0.4 and P(B | A) = 0.6, what is P(A | B)?
2. Give two equivalent definitions of independence, and explain why two disjoint events with positive probability can never be independent.
3. Eight switches each work with probability 0.99, independently. What is the probability that at least one fails, and which rule turns "at least one" into a one-line calculation?
