# STAT 251 — Lec 7 (Wed Sep 23) — Ch 3: Bayes' theorem, tree diagrams, system reliability

No page from you for this one (missed class). This file is the posted after-class deck organised for study, `Lecture_07_Chapter_3_CanvasPost_AL.pdf` (9 slides, Canvas file 47723620), plus the Panopto recording. The first ten minutes finished lecture 6's slides 8 and 9. The theorem on slide 3 and the worked solution on slide 5 are images, so they are written from the recording.

## Learning goals
- Compute posterior probabilities with Bayes' theorem, by formula and by tree diagram.
- Recognise the law of total probability as the denominator of Bayes' theorem.
- Compute the reliability of a small system of independent components in series and in parallel.

## Slides, organized
### Finishing lecture 6 (recording, first ten minutes)
- Independence cannot be shown on a Venn diagram; disjointness and intersections can. Independence needs one of the three equations.
- Proof that $$A^c$$ and $$B$$ are independent when $$A$$ and $$B$$ are: on the Venn diagram $$A^c \cap B$$ is $$B$$ minus the overlap, so

$$
\begin{aligned}
P(A^c \cap B) &= P(B) - P(A \cap B) \\
&= P(B) - P(A)\,P(B) \\
&= P(B)\big(1 - P(A)\big) \\
&= P(B)\,P(A^c)
\end{aligned}
$$

- The pairs $$A$$ with $$B^c$$ and $$A^c$$ with $$B^c$$ are left as exercises. He has put one of these on a midterm before.
- The $$D$$ and $$E$$ recap: $$P(D \cap E) = 0.45$$ from the addition rule, $$P(E \mid D) = 0.9$$, and $$D$$ and $$E$$ are not independent because 0.45 is not $$0.5 \times 0.6$$, or equally because $$P(E \mid D)$$ is not $$P(E)$$. Use whichever equation the given numbers feed directly; do not compute $$P(D \mid E)$$ just to test with it.

### Bayes' theorem (slides 2–3)
- Start from prior probabilities, take in new information, and compute posterior probabilities. His example: knowing which age group a person is in changes the assessed probability of a severe COVID outcome. The age group is the prior knowledge; the assessment given it is the posterior.
- Setting: $$A_1, \dots, A_n$$ are mutually exclusive events that together form $$S$$, and $$B$$ is any event with $$P(B) > 0$$. Then:

$$
\begin{aligned}
P(A_i \mid B) &= \frac{P(A_i \cap B)}{P(B)} \\[4pt]
&= \frac{P(B \mid A_i)\,P(A_i)}{\sum_{k=1}^{n} P(B \mid A_k)\,P(A_k)}
\end{aligned}
$$

- Where the denominator comes from: $$B$$ is cut into the pieces $$A_1 \cap B, \dots, A_n \cap B$$, which are disjoint, so $$P(B)$$ is their sum. Some pieces are empty and contribute 0; the rest are positive, so the denominator is positive. Each piece is $$P(B \mid A_k)\,P(A_k)$$ by the multiplication rule, always multiplying by the given event.

### The three plants (slides 4–6)
- Define the events first: $$A_1, A_2, A_3$$ = the car came from plant 1, 2, 3, and $$D$$ = defective. The plant shares sum to 1, so the plants partition $$S$$.

$$
\begin{aligned}
P(A_1) &= 0.35 & P(D \mid A_1) &= 0.01 \\
P(A_2) &= 0.20 & P(D \mid A_2) &= 0.018 \\
P(A_3) &= 0.45 & P(D \mid A_3) &= 0.02
\end{aligned}
$$

- The question asks for $$P(A_2 \mid D)$$, the reverse of the given conditionals.

$$
\begin{aligned}
P(D) &= 0.35(0.01) + 0.20(0.018) + 0.45(0.02) \\
&= 0.0035 + 0.0036 + 0.0090 = 0.0161 \\[4pt]
P(A_2 \mid D) &= \frac{0.0036}{0.0161} \approx 0.224
\end{aligned}
$$

- Prior versus posterior: given the car is from plant 2, the defect probability is 0.018. Given the car is defective, the probability it is from plant 2 is about 0.22. Different questions, different numbers.
- Tree method (slide 6): the first branches split by plant with 0.35, 0.20, 0.45; the second split by defective or not with each plant's rate. Multiply along each path to get $$P(A_k \cap D)$$, add the three defective paths for $$P(D)$$, and the posterior is one path over that sum. It is the same arithmetic as the formula. Define the events before drawing.

### Exam rules he stated
- Midterm: one handwritten cheat sheet, letter size, one side. Final: two sides, which can be two one-sided sheets, so the midterm sheet is reusable. Handwritten only; written on a tablet and printed is fine. Typed or pasted slides are not allowed, and two students with matching sheets lose them for that exam. Questions and answers on the sheet are a waste, since he never repeats a question.
- He does not set theoretical proofs, but a short "show that" like the complement-independence identity has appeared on a midterm.

### Next class
- Chapter 4, random variables and distributions (lecture 8). He asked everyone to review the Bayes activity solution posted on the lecture 7 page (`A1_Ch3 Bayes Activity solution.pdf`, file 47723622).

## In class
- iClicker on the two shipments (slide 7): equally likely bins, so $$P(I) = P(II) = 0.5$$, with defect rates 0.03 and 0.05. Answer B; almost everyone had it.

$$
\begin{aligned}
P(D) &= 0.015 + 0.025 = 0.04 \\
P(I \mid D) &= \frac{0.015}{0.04} = 0.375
\end{aligned}
$$

- Question 2 (slide 8), discussed in groups until the recording ended: the reliability of a system with $$A$$ and $$B$$ in parallel, in series with $$C$$ and then $$D$$. $$A$$ works with probability 0.6, $$B$$ with 0.5, $$C$$ and $$D$$ with 0.9 each, independently. The parallel block works unless both $$A$$ and $$B$$ fail, and the whole system needs the block, $$C$$ and $$D$$ all working. Not a Bayes question; it is the multiplication and complement rules with independence.

$$
\begin{aligned}
P(\text{block works}) &= 1 - 0.4 \times 0.5 = 0.8 \\
P(\text{system works}) &= 0.8 \times 0.9 \times 0.9 = 0.648
\end{aligned}
$$

## Clarifications
- The law of total probability is Bayes' denominator. Compute $$P(B)$$ once as the sum over the partition, then every posterior $$P(A_i \mid B)$$ is one path divided by that same number.
- For reliability questions, label each block as series (all must work, so multiply reliabilities) or parallel (fails only if all fail, so one minus the product of the failure probabilities), then combine the blocks the same way.

Questions: 7 in [02-questions.md](../02-questions.md) under "Lec 7". Ledger: the WeBWorK 2 row for Bayes plus one new row for reliability, due Sep 29.
