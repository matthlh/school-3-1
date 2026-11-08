# STAT 251 — Lec 17 (Wed Oct 21) — Ch 6: Binomial suitability, Activity 7 and the Geometric distribution

The after-class deck is `Lecture_17_Chapter_6_CanvasPost_AL.pdf` (18 slides) and the Activity 7 solutions are in `A7_ch6_binomial_solutions.pdf`. The Panopto recording was not read. The deck poses the two Binomial suitability questions but gives no answers, so the answers below apply the 10% condition from [lecture 15](15-ch6-bernoulli-binomial.md). The [question bank](../02-questions.md) lists this lesson under "Lec 17".

## When a Binomial count fits

### Recap: when the Binomial applies (slide 3)

- You must be able to decide whether $$\text{Bin}(n, p)$$ is a reasonable model by checking its assumptions.
  - There are $$n$$ trials, each a success or a failure.
  - The trials are independent.
  - Every trial has the same success probability $$p$$.
- $$X$$ is the number of successes in the $$n$$ trials, with pmf $$P(X = x) = \binom{n}{x}p^x(1 - p)^{n - x}$$ for $$x = 0, 1, \ldots, n$$.

### Example 2 again (slides 4 to 8)

- The drivers example from [lecture 16](16-ch6-binomial-examples.md) is repeated in full with the same answers.

### Can the Binomial model the count? (slides 9 and 10)

- In the first example, the pool has 10 civil engineering students and 6 computer science students. A team of 5 is picked at random.
- The team is 5 of 16 people, more than 10% of the pool. Picking without replacement changes $$p$$ for the next pick, so the Binomial model does not apply.
- In the second example, the pool has 250 civil and 150 computer science students. A committee of 10 is picked.
- The committee is 10 of 400, or 2.5% of the pool. The 10% condition holds, so a Binomial with $$p = \frac{150}{400}$$ is a reasonable model.

### Activity 7: guessing on a multiple-choice quiz (slide 11 and the worksheet)

- Each question has 4 options and the student guesses, so a single question is Bernoulli with $$p = 0.25$$; passing needs at least half the questions right.
- The score $$X$$ on a 3-question quiz is discrete, with values 0, 1, 2 and 3.
- Independence is reasonable for this made-up quiz, because one answer does not change the chance on another; a real class quiz often has linked parts, so its questions are not independent.
- The 8 outcomes 000 to 111 are not equally likely, because a right answer has probability 0.25 and a wrong one 0.75.
- The pmf on 3 questions is 0.422, 0.422, 0.141 and 0.016 for scores 0 to 3, and the expected score is $$3 \times 0.25 = 0.75$$.
- Passing the 3-question quiz needs 2 or more: $$0.141 + 0.016 = 0.157$$.
- A guesser is more likely to pass the short quiz than the 10-question one, because with more questions the score settles closer to its expected 25%.

## Waiting for the first success

### The Geometric distribution (slide 12)

> **Definition.** A **Geometric** random variable counts the independent trials needed until the first success, each trial succeeding with probability $$p$$.

- Written $$X \sim \text{Geo}(p)$$:

$$
\begin{aligned}
P(X = x) &= p(1 - p)^{x - 1}, \quad x = 1, 2, \ldots \\
E(X) &= \frac{1}{p} \\
\operatorname{Var}(X) &= \frac{1 - p}{p^2}
\end{aligned}
$$

> **Definition.** The expected number of trials until an event first happens is called its **return period**.

```svg
<svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, system-ui, sans-serif" font-size="13">
  <g text-anchor="middle">
    <rect x="40" y="30" width="250" height="90" rx="8" fill="var(--panel)" stroke="var(--link)"/>
    <text x="165" y="58" fill="var(--link)" font-weight="600">Binomial</text>
    <text x="165" y="82" fill="var(--fg2)" font-size="12">fixes the number of trials n</text>
    <text x="165" y="102" fill="var(--fg2)" font-size="12">counts the successes</text>
    <rect x="310" y="30" width="250" height="90" rx="8" fill="var(--panel)" stroke="var(--ok)"/>
    <text x="435" y="58" fill="var(--ok)" font-weight="600">Geometric</text>
    <text x="435" y="82" fill="var(--fg2)" font-size="12">fixes the successes at one</text>
    <text x="435" y="102" fill="var(--fg2)" font-size="12">counts the trials</text>
  </g>
</svg>
```


### The Geometric cdf (slide 13)

- The cdf is $$F(x) = 1 - (1 - p)^x$$ for $$x \ge 1$$.
- The proof uses the geometric series $$1 + r + r^2 + \cdots = \frac{1}{1 - r}$$ for $$0 < r < 1$$:

$$
\begin{aligned}
F(x) &= 1 - P(X > x) \\
&= 1 - \sum_{k = x + 1}^{\infty} p(1 - p)^{k - 1} \\
&= 1 - p(1 - p)^x \sum_{j = 0}^{\infty}(1 - p)^j \\
&= 1 - p(1 - p)^x \frac{1}{p} \\
&= 1 - (1 - p)^x
\end{aligned}
$$

- So $$P(X > x) = (1 - p)^x$$: the first $$x$$ trials all fail.

### Example 3: auditing accounts (slides 14 to 17)

- 2% of accounts are in error; $$X$$ is the number audited until the first error, so $$X \sim \text{Geo}(0.02)$$.
- The 10th account is the first error: $$P(X = 10) = (0.98)^9(0.02) = 0.0167$$.
- At least 50 audited before an error is found, which the deck takes as $$P(X > 50)$$:

$$
\begin{aligned}
P(X > 50) &= 1 - F(50) \\
&= (0.98)^{50} = 0.3642
\end{aligned}
$$

- Expected audits to the first error: $$E(X) = \frac{1}{0.02} = 50$$.
- Variance: $$\operatorname{Var}(X) = \frac{0.98}{0.02^2} = 2450$$.

### Next class (slide 18)

- More Geometric examples and the Poisson distribution.

## Clarifications

- The deck's part (b) says "at least 50 accounts are audited before an account in error is found" and computes $$P(X > 50)$$, which means the first 50 are all clean. Read literally, 50 clean accounts before the error is the same event, so the two agree; on an exam, write the event as "the first 50 are error-free" before using the cdf.
- The Geometric variable here counts trials including the successful one, so its values start at 1 and $$E(X) = \frac{1}{p}$$. Some textbooks count only the failures before the first success, which starts at 0 and has mean $$\frac{1 - p}{p}$$; the course uses the first version.
> **Key.** Binomial or Geometric is decided by one fact: the Binomial fixes the number of trials and counts successes, while the Geometric fixes the number of successes at one and counts trials.
