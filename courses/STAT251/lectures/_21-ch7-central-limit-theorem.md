# STAT 251 — Lec 21 (Mon Nov 2) — Ch 7: statistics, sampling distributions and the Central Limit Theorem

Prepared 2026-11-02 from the posted deck `Lecture_22_Chapter_7_CanvasPost.pdf` (13 slides). Canvas numbers this class Lecture 22 because the midterm took the Lecture 21 slot, and the deck's own footer says Lecture 20; this site counts it as lecture 21. The Panopto recording is posted but its captions were not ready yet, so this page comes from the deck alone. The applets and the `CLTvideoDemonstration` file are demonstrations with nothing to bank. Questions: 7 in [the bank](../02-questions.md) under "Lec 21".

## Slides, organized

### Chapter 7 learning outcomes (slide 2)

- Statistic and parameter.
- Sampling distribution.
- The Central Limit Theorem (CLT).
- The Normal approximation to the Binomial distribution.
- The Normal approximation to the Poisson distribution.
- This lecture covers the first three. The next class (Wed Nov 4) does CLT examples and the two Normal approximations.

### Population, sample, statistic and parameter (slides 3 and 4)

- A **population** is the entire collection of individuals we want to study.
- A **sample** is a subset of individuals selected from the population.
- Statistics uses the sample to draw conclusions about the population.
- A **statistic** is a numerical summary of a sample, such as the sample mean $$\bar{x}$$ or the sample standard deviation $$s$$.
- A **parameter** is a numerical summary of a population, such as the population mean $$\mu$$ or the population standard deviation $$\sigma$$.
- A parameter's value is unknown in practice.
- Because of sampling variability, a statistic takes different values from sample to sample.
- Statistics are used to estimate parameters.

### Sampling distributions (slide 5)

- The **sampling distribution** of a statistic is the probability distribution of the values the statistic can take.
- It describes how the statistic varies from study to study.
- It tells you how close a statistic is likely to fall to the parameter it estimates.

### The sample mean from a Normal population (slide 6)

- This result comes from Chapters 4 and 5 (linear combinations of Normal random variables).
- If $$X_1, \ldots, X_n$$ is a random sample from a Normal population with mean $$\mu$$ and variance $$\sigma^2$$, then the sample mean is exactly Normal:

$$
\begin{aligned}
\bar{X} &= \frac{X_1 + \cdots + X_n}{n} \\
\bar{X} &\sim N\left(\mu, \frac{\sigma^2}{n}\right)
\end{aligned}
$$

- Often the population is not Normal, which is what the CLT is for.

### Mean and standard error of the sample mean (slide 7)

- For a random sample of $$n$$ from any population with mean $$\mu$$ and variance $$\sigma^2$$:
  - The mean of the sampling distribution of $$\bar{X}$$ is $$\mu$$, the same as the population mean.
  - The standard deviation of the sampling distribution of $$\bar{X}$$ is $$\frac{\sigma}{\sqrt{n}}$$.
- The standard deviation of a sampling distribution is called the **standard error**, to tell it apart from the standard deviation of an ordinary distribution.
- These two facts hold for any population. Only the shape (Normal or not) needs the CLT.

### The Central Limit Theorem (slide 8)

- Let $$X_1, \ldots, X_n$$ be a random sample from any population with mean $$\mu$$ and variance $$\sigma^2$$.
- When $$n$$ is large (the book says $$n \ge 20$$), $$\bar{X}$$ is approximately Normal with mean $$\mu$$ and variance $$\frac{\sigma^2}{n}$$, whatever the shape of the population:

$$
\bar{X} \approx N\left(\mu, \frac{\sigma^2}{n}\right)
$$

- The difference from slide 6: there the population is Normal and the result is exact for any $$n$$; here the population can be anything and the result is approximate for large $$n$$.

### The CLT for a sum (slide 9)

- If a question asks about a total rather than an average, the CLT still applies.
- Let $$T = X_1 + \cdots + X_n$$. Then $$T = n\bar{X}$$, so:

$$
\begin{aligned}
E(T) &= E(n\bar{X}) \\
&= nE(\bar{X}) \\
&= n\mu
\end{aligned}
$$

$$
\begin{aligned}
\operatorname{Var}(T) &= \operatorname{Var}(n\bar{X}) \\
&= n^2 \operatorname{Var}(\bar{X}) \\
&= n^2 \times \frac{\sigma^2}{n} \\
&= n\sigma^2
\end{aligned}
$$

- So for large $$n$$, $$T \approx N(n\mu, n\sigma^2)$$, and its standard deviation is $$\sigma\sqrt{n}$$.
- The average's spread shrinks with $$n$$ (divide by $$\sqrt{n}$$); the total's spread grows with $$n$$ (multiply by $$\sqrt{n}$$).

### Applets and the video (slides 10 to 12)

- A UBC video on the sampling distribution of the mean, and two UBC StatSpace applets: sampling from a non-Normal population (the CLT) and sampling from a Normal population.
- The point the deck draws from the applets: as $$n$$ increases, the standard deviation of the sampling distribution of $$\bar{X}$$ decreases.

## Clarifications

- The standard error $$\frac{\sigma}{\sqrt{n}}$$ uses the population standard deviation $$\sigma$$. Dividing the variance by $$n$$ gives $$\frac{\sigma^2}{n}$$; dividing the standard deviation by $$n$$ instead of $$\sqrt{n}$$ is the usual slip.
- "Large $$n$$" in this course means $$n \ge 20$$, the textbook's threshold. A Normal population needs no threshold at all.
