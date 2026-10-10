# STAT 251 — Lec 14 (Wed Oct 14) — Ch 5: Normal facts, linear combinations and the sample mean

Built before class from the posted before-class deck `Lecture_14_Chapter_5_BL_CanvasPost.pdf` (7 slides); the after-class deck and the recording are added once they are up. The lecture page says the class first finishes lecture 13's remaining slides (the standard Normal, Table A, forward and backward calculations, written up on the [lecture 13 page](13-ch5-normal-and-standard-normal.md)) and then covers the slides below. 8 questions banked under Lec 14 and one long problem.

## Slides, organized

### The Normal pdf and the standard Normal (slide 2)

- A Normal random variable is written $$X \sim N(\mu, \sigma^2)$$ and its pdf is

$$
f(x) = \frac{1}{\sqrt{2\pi\sigma^2}}\, e^{-\frac{(x - \mu)^2}{2\sigma^2}}, \quad -\infty < x < \infty
$$

- The parameters satisfy $$-\infty < \mu < \infty$$ and $$\sigma > 0$$.
- Any Normal variable is turned into a standard Normal one by $$Z = \frac{X - \mu}{\sigma}$$, and then $$Z \sim N(0, 1)$$.
- The deck introduces two reserved symbols. The standard Normal pdf is $$\phi$$ (lower-case phi) and the standard Normal cdf is $$\Phi$$ (upper-case Phi).

$$
\begin{aligned}
\phi(z) &= \frac{1}{\sqrt{2\pi}}\, e^{-\frac{z^2}{2}} \\[4pt]
\Phi(z) &= P(Z \le z) \\
&= \int_{-\infty}^{z} \frac{1}{\sqrt{2\pi}}\, e^{-\frac{t^2}{2}}\, dt
\end{aligned}
$$

- $$\Phi(z)$$ is what Table A tabulates. It has no closed form, so every Normal probability goes through the table or `pnorm`.

### Fact 1: a linear function of a Normal is Normal (slide 3)

- If $$X \sim N(\mu, \sigma^2)$$ and $$Y = aX + b$$ with constants $$a \ne 0$$ and $$b$$, then

$$
Y \sim N(a\mu + b,\; a^2\sigma^2)
$$

- The mean and variance follow the Chapter 4 rules for $$aX + b$$. The new claim is the shape: the result is still Normal. Standardising is the special case $$a = \frac{1}{\sigma}$$, $$b = -\frac{\mu}{\sigma}$$.

### Fact 2: a linear combination of independent Normals is Normal (slides 3 to 4)

- Suppose $$X_1, X_2, \ldots, X_n$$ are independent and $$X_i \sim N(\mu_i, \sigma_i^2)$$. For constants $$a_1, \ldots, a_n$$ the combination $$Y = a_1 X_1 + a_2 X_2 + \cdots + a_n X_n$$ is Normal with

$$
\begin{aligned}
E(Y) &= a_1\mu_1 + a_2\mu_2 + \cdots + a_n\mu_n \\
\operatorname{Var}(Y) &= a_1^2\sigma_1^2 + a_2^2\sigma_2^2 + \cdots + a_n^2\sigma_n^2
\end{aligned}
$$

- The variances add with squared coefficients because the variables are independent, so every covariance term is zero. A minus sign in the combination still adds variance, since $$(-1)^2 = 1$$.
- When the $$X_i$$ are also identically distributed, each with mean $$\mu$$ and variance $$\sigma^2$$, this collapses to

$$
Y \sim N\!\left((a_1 + \cdots + a_n)\mu,\; (a_1^2 + \cdots + a_n^2)\sigma^2\right)
$$

- The deck's slide 3 has a typo: it writes "$$a_1 (i = 1, 2, \ldots, a_n)$$" where it means $$a_i$$ for $$i = 1, \ldots, n$$.

### Fact 3: the sample mean of a Normal sample is Normal (slides 4 to 5)

- A Normal sample means $$X_1, \ldots, X_n$$ independent and identically distributed $$N(\mu, \sigma^2)$$. Then the sample mean $$\bar{X} = \frac{X_1 + \cdots + X_n}{n}$$ is Normal with

$$
\bar{X} \sim N\!\left(\mu,\; \frac{\sigma^2}{n}\right)
$$

- The deck derives the two parameters from the Chapter 4 rules, with $$\frac{1}{n}$$ pulled out of the sum.

$$
\begin{aligned}
E(\bar{X}) &= \frac{1}{n}\{E(X_1) + \cdots + E(X_n)\} \\
&= \frac{1}{n}\{n\mu\} = \mu \\[6pt]
\operatorname{Var}(\bar{X}) &= \frac{1}{n^2}\{\operatorname{Var}(X_1) + \cdots + \operatorname{Var}(X_n)\} \\
&= \frac{1}{n^2}\{n\sigma^2\} = \frac{\sigma^2}{n}
\end{aligned}
$$

- The variance step needs independence; the mean step does not. The shape, Normal, comes from Fact 2 because $$\bar{X}$$ is a linear combination with every $$a_i = \frac{1}{n}$$.
- The standard deviation of $$\bar{X}$$ is $$\frac{\sigma}{\sqrt{n}}$$, so averaging $$n$$ values shrinks the spread by $$\sqrt{n}$$, not by $$n$$.

### Example: airline passenger weights (slide 6)

- Adult passenger weight is about $$N(85, 15^2)$$ kg.
- Part (a), one passenger between 73 kg and 105 kg. Standardise both ends: $$z = \frac{73 - 85}{15} = -0.80$$ and $$z = \frac{105 - 85}{15} = 1.33$$. Then $$P(-0.80 < Z < 1.33) = \Phi(1.33) - \Phi(-0.80) = 0.9082 - 0.2119 = 0.6963$$.
- Part (b), a 50-seat commuter plane with total weight $$T = X_1 + \cdots + X_{50}$$ exceeding 4350 kg. By Fact 2 with every $$a_i = 1$$, $$T \sim N(50 \times 85, 50 \times 15^2) = N(4250, 11250)$$, so $$\operatorname{SD}(T) = \sqrt{11250} = 106.07$$. Then $$P(T > 4350) = P\!\left(Z > \frac{4350 - 4250}{106.07}\right) = P(Z > 0.94) = 1 - 0.8264 = 0.1736$$.
- The same question through $$\bar{X}$$: total above 4350 means the mean above 87, and $$\bar{X} \sim N(85, \frac{225}{50})$$ with $$\operatorname{SD} = 2.121$$, so $$z = \frac{87 - 85}{2.121} = 0.94$$ again. The two routes always agree.
- The deck gives the set-up only; the answers above are worked here and should be checked against the after-class deck.

### What is next (slide 7)

- Review lecture 14 and the matching textbook sections. The next class starts Chapter 6, Bernoulli and Binomial random variables.

## Clarifications

- The deck writes the pdf's constant as $$\frac{1}{\sqrt{2\pi\sigma^2}}$$ and lecture 13 wrote it as $$\frac{1}{\sigma\sqrt{2\pi}}$$. They are the same number.
- Fact 2 needs independence for the variance formula. Without it the covariance terms from lecture 10 come back, and the deck does not say whether the combination stays Normal when the variables are dependent (it does for jointly Normal variables, which is beyond this course).
