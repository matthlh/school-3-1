# STAT 251 — Lec 16 (Mon Oct 19) — Ch 6: Binomial examples

Prepared 2026-10-23 from the after-class deck `Lecture_16_Chapter_6_CanvasPost_AL.pdf` (11 slides with solutions). The lecture page says class first finished the second half of the lecture 15 slides ([lecture 15 page](_15-ch6-bernoulli-binomial.md)) and its Bernoulli and Binomial mean-and-variance file, which is scanned images with no text layer, so it is not on this page. The Panopto recording was not read. Questions: 4 in [the bank](../02-questions.md) under "Lec 16" (3 short, 1 long problem).

## Slides, organized

### Example 1: a biased coin (slides 3 to 5)

- A biased coin lands heads with probability 0.7 and is tossed 5 times; $$X$$ is the number of heads.
- The model is $$X \sim \text{Bin}(5, 0.7)$$.
- Exactly 4 heads:

$$
\begin{aligned}
P(X = 4) &= \binom{5}{4}(0.7)^4(0.3)^1 \\
&= 5(0.7)^4(0.3) \\
&= 0.36
\end{aligned}
$$

- The 5 in front counts the orders: HHHHT, HHHTH, HHTHH, HTHHH and THHHH.
- The mean and spread:

$$
\begin{aligned}
E(X) &= np = 5 \times 0.7 = 3.5 \\
\operatorname{Var}(X) &= np(1 - p) \\
&= 5 \times 0.7 \times 0.3 = 1.05 \\
\operatorname{SD}(X) &= \sqrt{1.05}
\end{aligned}
$$

### Example 2: drivers at a flashing red light (slides 6 to 10)

- 20% of drivers come to a complete stop; 10 drivers are chosen at random; $$X$$ is the number who stop, so $$X \sim \text{Bin}(10, 0.2)$$.
- Exactly 2 stop: $$P(X = 2) = \binom{10}{2}(0.2)^2(0.8)^8 = 45(0.2)^2(0.8)^8 = 0.302$$.
- Fewer than 2 stop means 0 or 1:

$$
\begin{aligned}
P(X < 2) &= P(X = 0) + P(X = 1) \\
&= (0.8)^{10} + 10(0.2)(0.8)^9 \\
&= 0.3758
\end{aligned}
$$

- At most 3 stop means 0, 1, 2 or 3, which adds four terms to $$P(X \le 3) = 0.8791$$.
- At least 2 stop is the complement of fewer than 2:

$$
\begin{aligned}
P(X \ge 2) &= 1 - P(X < 2) \\
&= 1 - 0.3758 = 0.6242
\end{aligned}
$$

- Expected number who stop: $$E(X) = np = 2$$.
- Spread: $$\operatorname{Var}(X) = 10 \times 0.2 \times 0.8 = 1.6$$, so $$\operatorname{SD}(X) = \sqrt{1.6} = 1.265$$.

### The wording rules the examples use

- "Exactly $$k$$" is one term, $$P(X = k)$$.
- "Less than $$k$$" stops at $$k - 1$$, while "at most $$k$$" includes $$k$$.
- "At least $$k$$" is quickest as one minus "less than $$k$$" when $$k$$ is small.

### Next class (slide 11)

- More Binomial examples and the Geometric distribution.
