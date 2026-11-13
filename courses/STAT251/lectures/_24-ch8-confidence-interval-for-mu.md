# STAT 251 — Lec 24 (Fri Nov 13) — Ch 8: the confidence interval for the mean when σ is known

This page is built from the deck `Lecture_25_Chapter_8_CanvasPost.pdf` (14 slides); the recording was not read for this page. Canvas numbers this class Lecture 25. Slides 3 to 7 (point estimates, interval estimates and unbiased estimators) repeat what the [lec 23 page](23-ch7-normal-approx-poisson-ch8-estimation.md) already covers, so this page starts at slide 8. The [question bank](../02-questions.md) lists this lecture under "Lec 24".

## Where the interval comes from

### The sampling distribution of the sample mean (slide 8)

- Take a random sample $$X_1, \dots, X_n$$ from a population with mean $$\mu$$ and variance $$\sigma^2$$.
- When $$n$$ is large, the Central Limit Theorem (Chapter 7) says $$\bar{X}$$ is approximately Normal with mean $$\mu$$ and variance $$\frac{\sigma^2}{n}$$.
- When the population itself is Normal (Chapter 5), $$\bar{X}$$ is exactly Normal with the same mean and variance, and $$n$$ does not need to be large.
- Either way, the standardised mean $$Z = \frac{\bar{X} - \mu}{\sigma / \sqrt{n}}$$ is standard Normal, which is the fact every step below uses.

### Building the 95% interval (slides 9 and 10)

- The middle 95% of the standard Normal lies between $$-1.96$$ and $$1.96$$.
- The deck rearranges that statement until $$\mu$$ stands alone in the middle:

$$
\begin{aligned}
0.95 &= P\left(-1.96 \le \frac{\bar{X} - \mu}{\sigma / \sqrt{n}} \le 1.96\right) \\
&= P\left(-1.96 \frac{\sigma}{\sqrt{n}} \le \bar{X} - \mu \le 1.96 \frac{\sigma}{\sqrt{n}}\right) \\
&= P\left(\bar{X} - 1.96 \frac{\sigma}{\sqrt{n}} \le \mu \le \bar{X} + 1.96 \frac{\sigma}{\sqrt{n}}\right)
\end{aligned}
$$

- So the 95% confidence interval for $$\mu$$ runs from $$\bar{X} - 1.96 \frac{\sigma}{\sqrt{n}}$$ to $$\bar{X} + 1.96 \frac{\sigma}{\sqrt{n}}$$.
- The deck also writes 1.96 as $$Z_{0.025}$$, the value with an area of 0.025 above it.

## The general interval

### Any confidence level (slides 11 and 12)

- The $$(1 - \alpha)100\%$$ confidence interval for $$\mu$$ is

$$
\bar{X} \pm Z_{\alpha/2} \frac{\sigma}{\sqrt{n}}
$$

- The number $$1 - \alpha$$ is called the confidence level.
- The three levels the deck uses:

| Level | $$\alpha$$ | $$Z_{\alpha/2}$$ |
|---|---|---|
| 90% | 0.10 | 1.645 |
| 95% | 0.05 | 1.96 |
| 99% | 0.01 | 2.575 |

### What changes the width (slide 12)

- A higher confidence level makes the interval wider, because $$Z_{\alpha/2}$$ grows.
- A larger sample makes the interval narrower, because $$\frac{\sigma}{\sqrt{n}}$$ shrinks.
- The width is $$2 Z_{\alpha/2} \frac{\sigma}{\sqrt{n}}$$, so four times the sample size halves the width.

### Point estimate plus or minus a margin of error (slide 13)

- Every confidence interval in the course has the form point estimate plus or minus margin of error.
- For the mean, the point estimate is $$\bar{x}$$ and the margin of error is $$Z_{\alpha/2} \frac{\sigma}{\sqrt{n}}$$.
- The interval exists to say how close the point estimate is likely to be to the parameter.

## Clarifications

- This interval needs $$\sigma$$ to be known. The next class (slide 14) brings in the t-distribution, which is what replaces $$Z_{\alpha/2}$$ when $$\sigma$$ is estimated by $$s$$.
- The deck's 99% value is 2.575. Some tables print 2.576; either is accepted as the same value rounded.
