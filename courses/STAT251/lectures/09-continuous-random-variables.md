# STAT 251 — Lec 9 (Mon Sep 28) — Ch 4: continuous random variables, the pdf and cdf, uniform and exponential

No page from you for this one (missed class). This file is the posted after-class deck organised for study, `Lecture_09_Chapter_4_canvaspost_AL.pdf` (27 slides, Canvas file 48440138), plus the Panopto recording. The first fifteen minutes finished lecture 8's Example 5. Class ended after slide 15. He posted a short video for slides 16 to 26 (mean and variance, uniform, exponential, Example 7) on the lecture 9 page, and lecture 10 started Friday Oct 2. Integral signs come through the text layer as a bare "Z", so the formulas are written in their standard form. Two handwritten notes on the lecture page, `Lecture_09_Chapter_4_2_Mean_Var_Uniform_and_Exp_Dist.pdf` (file 47723630) and `Lecture_09_Chapter_4_3_Discrete&Continuous_rv_summary.pdf` (file 47723729), carry the uniform and exponential derivations and a discrete-versus-continuous summary; they are scans with no text layer.

## Learning goals
- Read a pdf as a density: probabilities are areas, and a single point has probability 0.
- Move between pdf and cdf in both directions, and use $$F$$ for probabilities, the median and the quartiles.
- Compute the mean and variance of a continuous random variable by integration, and know the uniform and exponential results.

## Slides, organized
### Finishing lecture 8 (recording, first fifteen minutes)
- Example 5 worked: $$E(X) = 1.5$$ and $$\operatorname{Var}(X) = 0.75$$ for the number of heads in three flips, by both methods. $$E(X) = 1.5$$ is the long-run average of the count over hypothetically many repetitions of the three flips, not a value $$X$$ can take.
- Uppercase $$X$$ versus lowercase $$x$$: $$E[(X - \mu)^2]$$ is written with the random variable, the sum $$\sum (x - \mu)^2 f(x)$$ runs over its possible values, and $$\mu$$ is a number, not a random variable.

### Continuous random variables and the pdf (slides 5–7)
- Continuous variables model the lifetime of a component, a pH value, or the depth of a randomly chosen lake.
- The probability density function $$f(x)$$ gives probabilities as areas under the curve. Density, because probability is area, not height.

$$
P(a \le X \le b) = \int_a^b f(x)\,dx
$$

- A legitimate pdf passes both checks below. Check both to decide whether a function is a pdf, and integrate only over the support, where $$f$$ is nonzero.

$$
f(x) \ge 0 \text{ for all } x, \qquad \int_{-\infty}^{\infty} f(x)\,dx = 1
$$

- $$P(a \le X \le b)$$, $$P(a < X \le b)$$, $$P(a \le X < b)$$ and $$P(a < X < b)$$ are all the same integral, because $$P(X = c) = 0$$ at any single point. The equal sign that mattered for discrete variables does not matter here.
- A random variable's mean is not the Chapter 1 sample mean. A sample mean averages data; a random variable is a function from $$S$$ to the real line, and its mean comes from its distribution.

### The cdf (slides 8–10)
- The cdf is defined for every real $$x$$. The dummy variable $$t$$ keeps the upper limit $$x$$ free.

$$
F(x) = P(X \le x) = \int_{-\infty}^{x} f(t)\,dt
$$

- Lowercase $$f$$ is a pmf or a pdf depending on the support. Uppercase $$F$$ is always the cdf, $$P(X \le x)$$, discrete or continuous.
- Probabilities from the cdf: the first is the complement rule; the second is everything below $$b$$ minus everything below $$a$$.

$$
\begin{aligned}
P(X > a) &= 1 - F(a) \\
P(a < X < b) &= F(b) - F(a)
\end{aligned}
$$

- By the fundamental theorem of calculus, $$f(x) = F'(x)$$. Integrate the pdf to get the cdf; differentiate the cdf to get the pdf.

### Example 6, uniform on $$[0, 100]$$ (slides 11–15)
- $$f(x) = \frac{1}{k}$$ on $$0 \le x \le 100$$ and 0 otherwise. Total area 1 gives $$\frac{1}{k}(100 - 0) = 1$$, so $$k = 100$$. With a constant density the area is a rectangle, $$100 \times \frac{1}{k}$$, which gives $$k$$ without integrating; that shortcut does not exist for a curved $$f$$.
- The cdf is the integral of $$\frac{1}{100}$$ from 0 to $$x$$, and it is defined for every real number. The graph rises from 0 to 1 and never decreases.

$$
F(x) = \begin{cases}
0 & x < 0 \\
\dfrac{x}{100} & 0 \le x \le 100 \\
1 & x > 100
\end{cases}
$$

- $$P(40 \le X \le 70) = F(70) - F(40) = 0.7 - 0.4 = 0.3$$.
- Median: solve $$F(x) = 0.5$$. $$Q_1$$: solve $$F(x) = 0.25$$. $$Q_3$$: solve $$F(x) = 0.75$$. $$\text{IQR} = Q_3 - Q_1$$. For this $$X$$ the median is 50, $$Q_1$$ is 25 and $$Q_3$$ is 75.

### Posted for the video (slides 16–26, not reached in class)
- Same definitions as the discrete case, with integrals in place of sums. The shortcut is the one used in practice; $$\sigma$$ is the square root.

$$
\begin{aligned}
\mu = E(X) &= \int_{-\infty}^{\infty} x\,f(x)\,dx \\
E[g(X)] &= \int_{-\infty}^{\infty} g(x)\,f(x)\,dx \\
\sigma^2 = E\big[(X - \mu)^2\big] &= \int_{-\infty}^{\infty} (x - \mu)^2 f(x)\,dx \\
\operatorname{Var}(X) &= E(X^2) - \big[E(X)\big]^2
\end{aligned}
$$

- Uniform: $$X \sim U(a, b)$$ has $$f(x) = \frac{1}{b - a}$$ on $$[a, b]$$ and 0 elsewhere. He set deriving the mean and variance as an exercise; the posted note has the solution.

$$
E(X) = \frac{a + b}{2} \qquad \operatorname{Var}(X) = \frac{(b - a)^2}{12}
$$

- Exponential: $$X \sim \text{Exp}(\lambda)$$, with $$\lambda > 0$$ the rate, models the time until an event. $$f(x) = \lambda e^{-\lambda x}$$ for $$x \ge 0$$ and 0 for $$x < 0$$. The derivation needs integration by parts, which he called the hardest integration the course asks for.

$$
E(X) = \frac{1}{\lambda} \qquad \operatorname{Var}(X) = \frac{1}{\lambda^2}
$$

- Example 7: $$f(x) = \frac{3}{8}x^2$$ on $$[0, 2]$$. The cdf is $$F(x) = \frac{x^3}{8}$$ on $$[0, 2]$$, 0 below and 1 above.

$$
\begin{aligned}
P(1 < X < 2) &= F(2) - F(1) = 1 - \frac{1}{8} = \frac{7}{8} \\[4pt]
\text{median: } \frac{m^3}{8} &= 0.5 \;\Rightarrow\; m = 4^{1/3} \approx 1.587 \\[4pt]
E(X) &= \int_0^2 x \cdot \frac{3}{8}x^2\,dx = \frac{3}{8} \cdot \frac{16}{4} = \frac{3}{2} \\[4pt]
E(X^2) &= \frac{3}{8} \cdot \frac{32}{5} = \frac{12}{5} \\
\operatorname{Var}(X) &= \frac{12}{5} - \frac{9}{4} = \frac{3}{20}
\end{aligned}
$$

### Next class
- Friday Oct 2, since Wed Sep 30 is a holiday: properties of the mean and variance, covariance, sums of independent random variables, and the max and min of independent random variables.

## In class
- iClicker: $$X$$ = the score on a fair die; find $$E(X)$$. Identify it as discrete with pmf $$\frac{1}{6}$$ at 1 to 6, so $$E(X) = \frac{1 + 2 + \dots + 6}{6} = \frac{21}{6} = 3.5$$. Answer D. A sum, not an integral, and 3.5 is a long-run average, not a face.
- Announcements: no lab this week because of the Wed Sep 30 holiday. WeBWorK 2 is due Tue Sep 29 and WeBWorK 3 is visible. iClicker grades get synced to the Canvas gradebook every few weeks; the sync misses anyone whose iClicker email or name differs from Canvas, so set the iClicker name to the Canvas name and he enters those grades by hand at the end. Only 35 lecture days this term, so some material goes into posted videos.

## Clarifications
- "$$f(x)$$ is a density" means $$f(x)$$ itself is not a probability and can exceed 1. Only areas are probabilities.
- The cdf is the one object that behaves the same way for discrete and continuous variables: $$F(x) = P(X \le x)$$. Only the way it is computed changes, a sum or an integral.

Questions: 11 in [02-questions.md](../02-questions.md) under "Lec 9". Ledger: 3 topics, due Sep 29.
