# STAT 251 — Lec 9 (Mon Sep 28) — Ch 4: continuous random variables, the pdf and cdf, uniform and exponential

No page from you for this one (missed class). This file is the posted after-class deck organised for study, `Lecture_09_Chapter_4_canvaspost_AL.pdf` (27 slides, Canvas file 48440138), plus the Panopto recording. The first fifteen minutes finished lecture 8's Example 5. Class ended after slide 15. He said he would post a short video the same night for slides 16 to 26 (mean and variance, uniform, exponential, Example 7), and lecture 10 starts Friday Oct 2. Integral signs come through the text layer as a bare "Z", so the formulas are written in their standard form. Two handwritten notes on the lecture page, `Lecture_09_Chapter_4_2_Mean_Var_Uniform_and_Exp_Dist.pdf` (file 47723630) and `Lecture_09_Chapter_4_3_Discrete&Continuous_rv_summary.pdf` (file 47723729), carry the uniform and exponential derivations and a discrete-versus-continuous summary; they are scans with no text layer.

## Learning goals
- Read a pdf as a density: probabilities are areas, and a single point has probability 0.
- Move between pdf and cdf in both directions, and use F for probabilities, the median and the quartiles.
- Compute the mean and variance of a continuous random variable by integration, and know the uniform and exponential results.

## Slides, organized
### Finishing lecture 8 (recording, first fifteen minutes)
- Example 5 worked: E(X) = 1.5 and Var(X) = 0.75 for the number of heads in three flips, by both methods. E(X) = 1.5 is the long-run average of the count over hypothetically many repetitions of the three flips, not a value X can take.
- Uppercase X versus lowercase x: E[(X − μ)²] is written with the random variable, the sum Σ (x − μ)² f(x) runs over its possible values, and μ is a number, not a random variable.

### Continuous random variables and the pdf (slides 5–7)
- Continuous variables model the lifetime of a component, a pH value, or the depth of a randomly chosen lake.
- The probability density function f(x) gives P(a ≤ X ≤ b) as the integral of f from a to b, the area under the curve over [a, b]. Density, because probability is area, not height.
- A legitimate pdf has f(x) ≥ 0 for all x and total integral 1 over the whole line. Check both to decide whether a function is a pdf, and integrate only over the support, where f is nonzero.
- P(a ≤ X ≤ b), P(a < X ≤ b), P(a ≤ X < b) and P(a < X < b) are all the same integral, because P(X = c) = 0 at any single point. The equal sign that mattered for discrete variables does not matter here.
- A random variable's mean is not the Chapter 1 sample mean. A sample mean averages data; a random variable is a function from S to the real line, and its mean comes from its distribution.

### The cdf (slides 8–10)
- F(x) = P(X ≤ x) is the integral of f(t) dt from −∞ to x, for every real x. The dummy variable t keeps the upper limit x free.
- Lowercase f is a pmf or a pdf depending on the support. Uppercase F is always the cdf, P(X ≤ x), discrete or continuous.
- P(X > a) = 1 − F(a) by the complement rule. P(a < X < b) = F(b) − F(a): everything below b minus everything below a.
- By the fundamental theorem of calculus, f(x) = F′(x). Integrate the pdf to get the cdf; differentiate the cdf to get the pdf.

### Example 6, uniform on [0, 100] (slides 11–15)
- f(x) = 1/k on 0 ≤ x ≤ 100 and 0 otherwise. Total area 1 gives (1/k)(100 − 0) = 1, so k = 100. With a constant density the area is a rectangle, 100 × 1/k, which gives k without integrating; that shortcut does not exist for a curved f.
- F(x) is the integral of 1/100 from 0 to x, which is x/100 for 0 ≤ x ≤ 100, with F(x) = 0 below 0 and F(x) = 1 above 100, since a cdf is defined for every real number. The graph rises from 0 to 1 and never decreases.
- P(40 ≤ X ≤ 70) = F(70) − F(40) = 0.7 − 0.4 = 0.3.
- Median: solve F(x) = 0.5. Q1: solve F(x) = 0.25. Q3: solve F(x) = 0.75. IQR = Q3 − Q1. For this X the median is 50, Q1 is 25 and Q3 is 75.

### Posted for the video (slides 16–26, not reached in class)
- Mean μ = E(X) = ∫ x f(x) dx, and E[g(X)] = ∫ g(x) f(x) dx. Variance σ² = E[(X − μ)²] = ∫ (x − μ)² f(x) dx, with the shortcut Var(X) = E(X²) − [E(X)]² used in practice; σ is the square root. Same definitions as the discrete case, with integrals in place of sums.
- Uniform: X ~ U(a, b) has f(x) = 1/(b − a) on [a, b] and 0 elsewhere, E(X) = (a + b)/2 and Var(X) = (b − a)²/12. He set deriving both as an exercise; the posted note has the solution.
- Exponential: X ~ Exp(λ), with λ > 0 the rate, models the time until an event. f(x) = λe^(−λx) for x ≥ 0 and 0 for x < 0. E(X) = 1/λ and Var(X) = 1/λ². The derivation needs integration by parts, which he called the hardest integration the course asks for.
- Example 7: f(x) = (3/8)x² on [0, 2]. F(x) = x³/8 on [0, 2], 0 below and 1 above. P(1 < X < 2) = F(2) − F(1) = 1 − 1/8 = 7/8. Median: m³/8 = 0.5 gives m = 4^(1/3) ≈ 1.587. E(X) = ∫ x (3/8)x² dx from 0 to 2 = (3/8)(16/4) = 3/2. E(X²) = (3/8)(32/5) = 12/5, so Var(X) = 12/5 − 9/4 = 3/20.

### Next class
- Friday Oct 2, since Wed Sep 30 is a holiday: properties of the mean and variance, covariance, sums of independent random variables, and the max and min of independent random variables.

## In class
- iClicker: X = the score on a fair die; find E(X). Identify it as discrete with pmf 1/6 at 1 to 6, so E(X) = (1 + 2 + … + 6)/6 = 21/6 = 3.5. Answer D. A sum, not an integral, and 3.5 is a long-run average, not a face.
- Announcements: no lab this week because of the Wed Sep 30 holiday. WeBWorK 2 is due Tue Sep 29 and WeBWorK 3 is visible. iClicker grades get synced to the Canvas gradebook every few weeks; the sync misses anyone whose iClicker email or name differs from Canvas, so set the iClicker name to the Canvas name and he enters those grades by hand at the end. Only 35 lecture days this term, so some material goes into posted videos.

## Clarifications
- "f(x) is a density" means f(x) itself is not a probability and can exceed 1. Only areas are probabilities.
- The cdf is the one object that behaves the same way for discrete and continuous variables: F(x) = P(X ≤ x). Only the way it is computed changes, a sum or an integral.

Questions: 11 in [02-questions.md](../02-questions.md) under "Lec 9". Ledger: 3 topics, due Sep 29.
