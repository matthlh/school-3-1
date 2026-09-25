# STAT 251 — Lec 8 (Fri Sep 25) — Ch 4: discrete random variables, pmf, cdf, mean and variance — outline, pulled before class

Staged on Fri Sep 25 from the before-class deck `Lecture_08_Chapter_4_BL_canvaspost.pdf` (17 slides, Canvas file 47723818). The after-class deck (file 47723817) will carry the worked solutions. Summation signs on the slides come through the text layer as a bare "P" or "X", so the formulas here are written in their standard form.

## Outline
- Chapter 4 covers notation, discrete and continuous random variables, the pmf and the pdf, the mean, variance and standard deviation, the cdf, and the max and min of independent random variables.
- A random variable X is a function on the sample space S that assigns a number x = X(w) to each outcome w. Uppercase letters name the variable and the lowercase letter names one of its possible values.
- Running example: flip a fair coin 3 times and let X be the number of heads. S has the 8 outcomes HHH through TTT.
- A discrete random variable takes a finite set or an infinite sequence of values. A continuous one takes values in an interval or a union of intervals, and P(X = c) = 0 for every value c. A variable whose only values are 0 and 1 is a Bernoulli random variable.
- The probability mass function is f(x) = P(X = x). It satisfies f(x) ≥ 0 for every x, and the sum of f(x) over all x is 1.
- For three coin flips the pmf is 1/8, 3/8, 3/8 and 1/8 at x = 0, 1, 2 and 3.
- Example 3 gives Y with values −3, 0, 1 and 5 and probabilities k, 0.4, 3k and 2k. It asks for k, P(Y = 5), P(Y ≥ 0), P(Y < 0) and P(Y > 0.5).
- The cumulative distribution function is F(x) = P(X ≤ x), the sum of f(k) over all k ≤ x, defined for every real x. The complement 1 − F(x) = P(X > x) is the probability that X exceeds x. The cdf of a discrete variable is a step function.
- The mean is μ = E(X) = sum of x f(x), read as the long-run average over repeated experiments. For a function g, E[g(X)] = sum of g(x) f(x).
- The variance is σ² = E[(X − μ)²] = sum of (x − μ)² f(x), and σ is its square root. The shortcut Var(X) = E(X²) − [E(X)]² is easier by hand; the proof comes later.
- Example 5, three flips: E(X) = 1.5, E(X²) = 24/8 = 3, so Var(X) = 3 − 1.5² = 0.75.
- Next class: continuous random variables.

## Pre-lecture questions
1. Why is P(X = c) = 0 for a continuous random variable but not for a discrete one, and what makes a variable Bernoulli?
2. Y takes −3, 0, 1 and 5 with probabilities k, 0.4, 3k and 2k. Find k, then P(Y > 0.5) and F(0).
3. For the number of heads in three fair flips, get Var(X) both from the definition and from E(X²) − [E(X)]². Which is faster, and why?
