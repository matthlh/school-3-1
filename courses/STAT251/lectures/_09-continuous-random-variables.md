# STAT 251 — Lec 9 (Mon Sep 28) — Ch 4: continuous random variables, pdf, cdf, mean and variance, uniform and exponential — outline

Staged on Mon Sep 28 from the after-class deck `Lecture_09_Chapter_4_canvaspost_AL.pdf` (27 slides, Canvas file 48440138). Integral signs come through the text layer as a bare "Z", so the formulas here are written in their standard form. Two extra notes posted with the lecture (files 47723630 and 47723729) cover the uniform and exponential derivations and a discrete-versus-continuous summary; they were not pulled.

## Outline
- Continuous random variables model outcomes such as the lifetime of a component, a pH value, or the depth of a randomly chosen lake.
- The probability density function f(x) gives P(a ≤ X ≤ b) as the integral of f from a to b, which is the area under the curve over [a, b].
- A legitimate pdf has f(x) ≥ 0 for every x, and its integral over the whole real line is 1.
- Unlike the discrete case, including or excluding the endpoints a and b does not change the probability.
- The cdf is F(x) = P(X ≤ x), the integral of f(t) from −∞ to x.
- From the cdf, P(X > a) = 1 − F(a) and P(a < X < b) = F(b) − F(a).
- By the fundamental theorem of calculus, f(x) = F′(x). You integrate the pdf to get the cdf and differentiate the cdf to get the pdf.
- Example 6 has f(x) = 1/k on [0, 100]. Setting the total area to 1 gives k = 100, so F(x) = x/100 on [0, 100], and P(40 ≤ X ≤ 70) = F(70) − F(40) = 0.3.
- The median solves F(x) = 0.5, Q1 solves F(x) = 0.25, and Q3 solves F(x) = 0.75. The IQR is Q3 − Q1.
- The mean is E(X), the integral of x f(x). For a function g, E[g(X)] is the integral of g(x) f(x).
- The variance is E[(X − μ)²], and the shortcut Var(X) = E(X²) − [E(X)]² is the one used in practice. The standard deviation is its square root.
- The uniform distribution U(a, b) has f(x) = 1/(b − a) on [a, b], mean (a + b)/2 and variance (b − a)²/12.
- The exponential distribution Exp(λ) models the time until an event. It has f(x) = λe^(−λx) for x ≥ 0, mean 1/λ and variance 1/λ².
- Example 7 has f(x) = (3/8)x² on [0, 2]. The cdf is x³/8, P(1 < X < 2) = 7/8, the median is 4^(1/3), the mean is 3/2, E(X²) = 12/5, and the variance is 3/20.
- Next class covers properties of the mean and variance, covariance, sums of independent random variables, and the max and min of independent random variables.

## Pre-lecture questions
1. Why does P(a ≤ X ≤ b) equal P(a < X < b) for a continuous variable but not for a discrete one?
2. f(x) = c·x on [0, 4]. Find c, the cdf, and the median.
3. For X ~ Exp(λ), write P(X > t) using the cdf. Then derive the mean without looking it up.
