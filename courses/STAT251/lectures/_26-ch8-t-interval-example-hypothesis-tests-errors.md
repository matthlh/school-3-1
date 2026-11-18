# STAT 251 — Lec 26 (Wed Nov 18) — Ch 8: a t interval example, hypothesis tests about μ, and Type I and Type II errors

This page is built from the after-class deck `Lecture_27_Chapter_8_CanvasPost_AL.pdf` (16 slides); the recording was not read for this page. Canvas numbers this class Lecture 27. Slides 9 and 12 are pictures in the deck, so their content here is the standard picture they label. The [question bank](../02-questions.md) lists this lecture under "Lec 26".

## Worked example: the t interval for mean rent (slides 3 and 4)

### The setup

- A sample of $$n = 16$$ studio apartments gives a sample mean rent of $$\bar{x} = 1000$$ dollars a month and a sample standard deviation of $$s = 150$$.
- The population of rents is assumed Normal, and $$\sigma$$ is not known, so the interval uses $$t$$.

### The 95% interval

- At 95%, $$\alpha = 0.05$$ and $$\frac{\alpha}{2} = 0.025$$.
- The degrees of freedom are $$n - 1 = 15$$, so the table value is $$t_{0.025, 15} = 2.131$$.

$$
\begin{aligned}
&\bar{x} \pm t_{\alpha/2, \, n-1} \frac{s}{\sqrt{n}} \\
&= 1000 \pm 2.131 \times \frac{150}{\sqrt{16}} \\
&= 1000 \pm 79.91 \\
&= (920.09, 1079.91)
\end{aligned}
$$

- The deck's interpretation: we are 95% confident that the true mean rent of studio apartments within 3 km of campus is between 920 and 1080 dollars a month.

## Hypotheses about μ (slides 5 and 6)

### What a test does

- A hypothesis test decides whether a statement about the value of a population parameter should or should not be rejected.

### The two hypotheses

- The **null hypothesis** $$H_0$$ is a tentative assumption about the population parameter.
- The **alternative hypothesis** $$H_a$$ (also written $$H_1$$) is the opposite of the null.
- The alternative is what the test is trying to establish.
- The equality part always goes in the null hypothesis.
- The hypotheses are written before the data are seen or analysed.

### The three forms

- Every test about $$\mu$$ takes one of three forms, where $$\mu_0$$ is the hypothesised value.
  - Lower-tail test: $$H_0: \mu \ge \mu_0$$ against $$H_a: \mu < \mu_0$$.
  - Upper-tail test: $$H_0: \mu \le \mu_0$$ against $$H_a: \mu > \mu_0$$.
  - Two-tailed test: $$H_0: \mu = \mu_0$$ against $$H_a: \mu \ne \mu_0$$.
- The first two are one-tailed tests.

## Test statistic, p-value and significance level (slides 7 to 11)

### The test procedure

- A **test statistic** is a function of the data on which the decision to reject $$H_0$$ or not is based.
- The **rejection region** is the set of test statistic values for which $$H_0$$ is rejected.
- $$H_0$$ is rejected if and only if the computed test statistic falls in the rejection region.
- The test statistic also gives the **p-value**, which measures the evidence against $$H_0$$.

### The p-value

- The p-value describes how unusual the data would be if $$H_0$$ were true.
- It is the probability, assuming $$H_0$$ is true, of a result as extreme as the one observed or more extreme in the direction of the alternative.
- The deck's picture uses $$H_0: \mu \ge 10$$ against $$H_a: \mu < 10$$, so the p-value is the area in the lower tail beyond the observed statistic.

### The test statistic for μ

- The statistic is built assuming $$H_0$$ is true, so it uses $$\mu_0$$.
- When $$\sigma$$ is known:

$$
Z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}} \sim N(0, 1)
$$

- When $$\sigma$$ is unknown:

$$
t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}} \sim t_{n-1}
$$

- When $$n$$ is large, the t statistic can be treated as $$N(0, 1)$$.

### The significance level

- The **significance level** $$\alpha$$ is fixed before the test; $$H_0$$ is rejected when the p-value is at most $$\alpha$$.
- The most common choice is $$\alpha = 0.05$$.
- Rejecting $$H_0$$ is reported as the result being **statistically significant**.
- If the p-value is at most $$\alpha$$, reject $$H_0$$; if it is greater than $$\alpha$$, do not reject $$H_0$$.

### Rejection regions and critical values (slide 12)

- For a two-tailed test at $$\alpha = 0.05$$, the rejection region is both tails with $$0.025$$ in each, so with a Z statistic the **critical values** are $$\pm 1.96$$.
- For a lower-tail test at $$\alpha = 0.05$$, the whole $$0.05$$ sits in the lower tail, so the critical value is $$-1.645$$ and $$H_0$$ is rejected when $$Z \le -1.645$$.
- For an upper-tail test the region is the upper tail, and $$H_0$$ is rejected when $$Z \ge 1.645$$.

## The steps of a test (slide 13)

- Steps 1 to 3 are shared.
  - Write $$H_0$$ and $$H_a$$.
  - Choose the significance level $$\alpha$$.
  - Collect the data and compute the test statistic.
- The p-value approach then has three steps.
  - Use the test statistic to compute the p-value.
  - Reject $$H_0$$ if the p-value is at most $$\alpha$$.
  - State the conclusion in context.
- The critical value approach then has three steps.
  - Use $$\alpha$$ to find the critical value and the rejection rule.
  - Compare the test statistic with the rule to decide whether to reject $$H_0$$.
  - State the conclusion in context.
- The deck says these are explained with examples next class.

## Type I and Type II errors (slides 14 and 15)

### The four outcomes

| Decision | $$H_0$$ true | $$H_0$$ false |
|---|---|---|
| Reject $$H_0$$ | Type I error | Correct decision |
| Do not reject $$H_0$$ | Correct decision | Type II error |

### Definitions

- A **Type I error** is rejecting $$H_0$$ when $$H_0$$ is true.
- A **Type II error** is not rejecting $$H_0$$ when $$H_0$$ is false.
- $$P(\text{Type I error}) = \alpha$$ and $$P(\text{Type II error}) = \beta$$.
- A good test rarely makes either error.

## Next class

- More on hypothesis tests about the mean and on Type I and Type II errors, with examples.
