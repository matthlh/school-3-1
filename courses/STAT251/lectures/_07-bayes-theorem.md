# STAT 251 — Lec 7 (Wed Sep 23) — Ch 3: Bayes' theorem, tree diagrams, applications — outline, pulled before class

Staged on Mon Sep 21 from the before-class deck `Lecture_07_Chapter_3_BL_CanvasPost.pdf` (7 slides, Canvas file 47723273). The class first finishes lecture 6's slides 8 and 9 (complements of independent events, and the D and E recap). The theorem on slide 3 is an image, so it is written here in the standard form. The lecture 7 page also carries `A1_Ch3 Bayes Activity solution.pdf` (file 47723622), the solution to a Chapter 3 Bayes activity, not yet read.

## Outline
- Bayes' theorem revises probabilities. Start with prior probabilities, take in new information from a sample or a report, and compute posterior probabilities. The slide's picture runs prior probabilities, then new information, then Bayes' theorem, then posterior probabilities.
- Setting: A₁, A₂, …, Aₙ are mutually exclusive events that together fill the sample space, and B is any event with P(B) > 0. Then P(Aᵢ | B) = P(B | Aᵢ) P(Aᵢ) divided by the sum over j of P(B | Aⱼ) P(Aⱼ). The denominator is P(B) by the law of total probability.
- Example on slide 4: three plants make 35%, 20% and 45% of the cars, with defect rates 1%, 1.8% and 2%. A car picked at random is defective; which plant is it from? P(defective) = 0.35 × 0.01 + 0.20 × 0.018 + 0.45 × 0.02 = 0.0035 + 0.0036 + 0.0090 = 0.0161, so P(plant 2 | defective) = 0.0036 / 0.0161 ≈ 0.224. The million cars are a distraction; the shares are what matter.
- Slide 5 does the same example as a tree diagram: branch first by plant with the shares, then by defective or not with that plant's rate, multiply along each path, and the posterior is one path over the sum of the paths that end in defective.
- Example on slide 6: two shipments in separate bins, 3% and 5% defective, equally likely to be picked from. P(defective) = 0.5 × 0.03 + 0.5 × 0.05 = 0.04, so P(shipment I | defective) = 0.015 / 0.04 = 0.375.
- Next class: Chapter 4, random variables and distributions.

## Pre-lecture questions
1. State Bayes' theorem for a partition A₁, …, Aₙ and an event B, and say where the law of total probability sits inside it.
2. Three plants make 35%, 20% and 45% of output with defect rates 1%, 1.8% and 2%. A defective car is picked. Set up the probability that it came from plant 2 once as a formula and once as a tree, and get the number.
3. Two equally likely bins hold parts that are 3% and 5% defective. Why is P(bin I | defective) below one half, and by how much?
