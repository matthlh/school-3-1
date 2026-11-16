# STAT 251 — Lec 25 (Mon Nov 16) — Ch 8: confidence interval examples, the t-distribution and the interval for μ when σ is unknown

This page is built from the after-class deck `Lecture_26_Chapter_8_CanvasPost_AL.pdf` (16 slides); the recording was not read for this page. Canvas numbers this class Lecture 26. Slide 3 recaps the interval from the [lec 24 page](_24-ch8-confidence-interval-for-mu.md). The [question bank](../02-questions.md) lists this lecture under "Lec 25".

## Worked example: zinc in a river (slides 4 to 8)

### The setup

- Measurements at $$n = 36$$ locations give a sample mean of $$\bar{x} = 2.6$$ grams per millilitre.
- The population standard deviation is assumed known, $$\sigma = 0.3$$.

### (a) The point estimate

- The point estimate for $$\mu$$ is the sample mean, $$\hat{\mu} = \bar{x} = 2.6$$ g/ml.

### (b) The 95% interval

- At 95%, $$\alpha = 0.05$$ and $$Z_{0.025} = 1.96$$.

$$
\begin{aligned}
&2.6 \pm 1.96 \times \frac{0.3}{\sqrt{36}} \\
&= 2.6 \pm 0.098 \\
&= (2.502, 2.698)
\end{aligned}
$$

- The deck's wording: "We are 95% confident that the true mean zinc concentration is between 2.502 g/ml and 2.698 g/ml."

### (c) The 99% interval

- At 99%, $$Z_{0.005} = 2.575$$, and the interval is $$(2.471, 2.729)$$, wider than the 95% one.

### (d) The sample size for a chosen margin of error

- The researchers want a margin of error of 0.05 at 95%.
- Set the margin of error equal to 0.05 and solve for $$n$$:

$$
\begin{aligned}
0.05 &= 1.96 \times \frac{0.3}{\sqrt{n}} \\
n &= \left(\frac{1.96 \times 0.3}{0.05}\right)^2 \\
&= 138.29
\end{aligned}
$$

- Always round $$n$$ up, so they need 139 measurements. Rounding down would leave the margin of error slightly above 0.05.
- In general, $$n = \left(\frac{Z_{\alpha/2} \, \sigma}{m}\right)^2$$ rounded up, where $$m$$ is the margin of error wanted.

## When σ is unknown: the t-distribution (slides 9 to 12)

### Why a new distribution

- The exact standard error of $$\bar{X}$$ is $$\frac{\sigma}{\sqrt{n}}$$, but in practice $$\sigma$$ is not known.
- It is estimated by the sample standard deviation $$s$$, giving the standard error $$\frac{s}{\sqrt{n}}$$.
- Using $$s$$ in place of $$\sigma$$ adds extra error, so the Z-score is replaced by a slightly larger value, the t-score.

### The t statistic

- With $$\sigma$$ known, $$Z = \frac{\bar{X} - \mu}{\sigma / \sqrt{n}}$$ is standard Normal.
- With $$s$$ in its place, the statistic follows the Student's t-distribution with $$n - 1$$ degrees of freedom:

$$
t = \frac{\bar{X} - \mu}{s / \sqrt{n}} \sim t_{n-1}
$$

### The interval

- The $$(1 - \alpha)100\%$$ confidence interval for $$\mu$$ when $$\sigma$$ is unknown is

$$
\bar{x} \pm t_{\alpha/2, \, n-1} \frac{s}{\sqrt{n}}
$$

- $$t_{\alpha/2, \, n-1}$$ is read from the t-table at $$df = n - 1$$, with an area of $$\frac{\alpha}{2}$$ above it.

### Shape of the t-distribution

- It is bell shaped and symmetric about 0, like the standard Normal.
- Its probabilities depend on the degrees of freedom, $$df = n - 1$$.
- It has longer, thicker tails and is more spread out than the standard Normal, which is why $$t_{\alpha/2, \, n-1}$$ is larger than $$Z_{\alpha/2}$$.
- As $$n \to \infty$$, $$t_{n-1}$$ approaches the standard Normal.
- The deck's rule: when $$n \ge 30$$, $$t_{n-1}$$ can be replaced with $$Z$$.

## Conditions and interpretation (slides 13 to 15)

### Conditions

- The data must be a random sample from the population.
- The t interval assumes the population is Normal.
- If the sample is large, the population does not need to be Normal, because of the CLT.

### What 95% confidence means

- If we repeatedly took samples of size $$n$$ and built the 95% interval from each, on average 95% of those intervals would contain $$\mu$$.
- The 95% describes the method over many samples. Any one interval either contains $$\mu$$ or does not.
- The class used the applet at https://www.zoology.ubc.ca/~whitlock/Kingfisher/CIMean.htm to simulate many intervals. Its two learning goals are the meaning of a confidence interval and the effect of the sample size: a larger $$n$$ gives narrower intervals.

## Clarifications

- The deck gives the t interval formula but no worked t example; the next class (Lecture 27 on Canvas, Wed Nov 18) has the confidence interval examples and starts hypothesis testing about the mean.
- The $$n \ge 30$$ rule for swapping $$t$$ for $$Z$$ is the deck's. The CLT threshold elsewhere in the course is $$n \ge 20$$; they answer different questions (whether $$\bar{X}$$ is Normal, and whether the t-table value is close enough to the Z value).
