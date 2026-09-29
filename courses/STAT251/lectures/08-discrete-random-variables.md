# STAT 251 — Lec 8 (Fri Sep 25) — Ch 4: random variables, the pmf, the cdf, mean and variance

No page from you for this one (missed class). This file is the posted after-class deck organised for study, `Lecture_08_Chapter_4_canvaspost_AL.pdf` (20 slides, Canvas file 47723817), plus the Panopto recording. The first ten minutes finished lecture 7's reliability question. Example 5 (slides 17 to 19) was not reached and opened lecture 9. Summation signs come through the text layer as a bare "P", so the formulas are written in their standard form.

## Learning goals (slide 4, the Chapter 4 list)
- Notation for random variables; discrete versus continuous.
- The pmf now and the pdf next lecture.
- The mean, variance and standard deviation of a random variable.
- The cdf.
- The max and min of independent random variables, later in the chapter.

## Slides, organized
### Finishing lecture 7 (recording, first ten minutes)
- The reliability system splits into S₁ = A and B in parallel and S₂ = C and D in series. The system works only if both blocks work, so P(system works) = P(S₁) P(S₂) by independence.
- P(S₁) = P(A ∪ B) = P(A) + P(B) − P(A) P(B) = 0.6 + 0.5 − 0.3 = 0.8. "Or" here means A works, or B works, or both. The intersection factorises only because independence is given, and the answer has to say so.
- P(S₂) = P(C) P(D) = 0.81, so the reliability is 0.8 × 0.81 = 0.648. Textbook exercises use more complicated layouts; the method is the same: name the series and parallel blocks, then write probability statements.

### Random variables (slides 5–7)
- A random variable X is a function on the sample space S that assigns a number x = X(w) to each outcome w. Uppercase names the variable, lowercase names one of its possible values, and "rv" in the notes means random variable.
- Example 1: flip a fair coin three times, eight equally likely outcomes. With X = the number of heads, X(HHH) = 3 and X(HTT) = 1, and the possible values are x = 0, 1, 2, 3. Several outcomes map to the same value.
- Discrete: the possible values are a finite set or an infinite sequence, and there is probability at each point. Continuous: the values fill an interval or a union of intervals, probability lives on intervals, and P(X = c) = 0 for any single c, because one point is one out of infinitely many.
- A random variable whose only values are 0 and 1 is a Bernoulli random variable.

### The pmf (slides 8–11)
- The probability mass function of a discrete X is f(x) = P(X = x) for each possible value x. Two properties: f(x) ≥ 0 for every x, and the values f(x) add to 1 over all possible x. To decide whether a table is a pmf, check both.
- Lowercase f is the pmf. With several random variables in play, write f_X and f_Y to say which one.
- Example 2: for the number of heads in three flips the pmf is 1/8, 3/8, 3/8, 1/8 at x = 0, 1, 2, 3, given as a table or as a piecewise function. The 3/8 counts the three equally likely outcomes with exactly one head, or exactly two.
- Example 3: Y takes −3, 0, 1, 5 with probabilities k, 0.4, 3k, 2k. Since f is a pmf, k + 0.4 + 3k + 2k = 1, so k = 0.1. P(Y = 5) = 2k = 0.2. P(Y ≥ 0) = 0.4 + 3k + 2k = 0.9. P(Y < 0) = P(Y = −3) = 0.1. P(Y > 0.5) = P(Y = 1) + P(Y = 5) = 0.5: the possible values above 0.5 are 1 and 5, even though 0.5 itself is not a value.
- Showing work: write "f is a pmf, so the probabilities sum to 1", then the probability statements such as P(Y = 0) + P(Y = 1) + P(Y = 5), then the numbers.

### The cdf of a discrete random variable (slides 12–14)
- The cumulative distribution function is F(x) = P(X ≤ x), the sum of f(k) over all possible values k ≤ x. It is defined for every real x, not only the possible values. Uppercase F is the cdf.
- 1 − F(x) = P(X > x). The equal sign matters for a discrete variable: F(1) includes P(X = 1) and P(X > 1) does not.
- Example 4: for the three flips, F(x) = 0 for x < 0, 1/8 for 0 ≤ x < 1, 4/8 for 1 ≤ x < 2, 7/8 for 2 ≤ x < 3, and 1 for x ≥ 3. So F(0.8) = F(0.925) = 1/8, F(1.2) = F(1.6) = 1/2, and F(10) = 1. The graph is a staircase, flat between possible values and jumping by f(x) at each one.

### Mean and variance (slides 15–16)
- The mean or expected value is μ = E(X) = Σ x f(x), a weighted average of the possible values with the pmf as the weights. Interpretation: the long-run average of X over hypothetical repetitions of the experiment, not something one run shows. It is a random variable's mean, not the Chapter 1 sample mean, which belongs to data.
- For a function g, E[g(X)] = Σ g(x) f(x). The pmf stays; only the values change.
- Variance σ² = Var(X) = E[(X − μ)²] = Σ (x − μ)² f(x), with uppercase X inside the expectation and lowercase x in the sum. σ is the square root. The shortcut Var(X) = E(X²) − [E(X)]² is the one used by hand; the proof comes once the properties of expectation are done.

### Not reached (slides 17–19; lecture 9 opened with them)
- Example 5, the three flips: E(X) = 0(1/8) + 1(3/8) + 2(3/8) + 3(1/8) = 12/8 = 1.5, a long-run average over many sets of three flips, not a count you can see. By the definition, Var(X) = (2.25 + 0.75 + 0.75 + 2.25)/8 = 0.75. By the shortcut, E(X²) = (0 + 3 + 12 + 9)/8 = 3 and Var(X) = 3 − 1.5² = 0.75. The shortcut wins once there are more than a few values.

### Next class
- Continuous random variables (lecture 9). Integration and differentiation start there; he said to review the basics from a calculus book if needed.

## In class
- iClicker 1: Y = green die minus red die for two fair dice. The 36 ordered outcomes give differences from −5 to 5, so the possible values are −5, …, 5. Answer C, not −6 to 6.
- iClicker 2: find k in Example 3. Answer B, k = 0.1, from the probabilities summing to 1. Nine people picked C.
- iClicker 3: P(Y > 0.5) for the same pmf. Answer C, 0.5.
- Clicker marks are 1 for answering and 1 for the right answer. Students who miss class should not answer remotely.

## Clarifications
- P(Y > 0.5) and P(Y ≥ 1) are the same event for this Y, because no possible value sits between 0.5 and 1. Read every inequality against the list of possible values before adding.
- A random variable's mean comes from its distribution, not from data. Σ x f(x) replaces the Chapter 1 mean of a sample; they are different objects with different formulas, and they agree only when the values are equally likely.

Questions: 9 in [02-questions.md](../02-questions.md) under "Lec 8". Ledger: 3 topics, due Sep 29.
