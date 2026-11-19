# STAT 251 — Lec 26 (Wed Nov 18) — Ch 8: a t interval example, hypothesis tests about μ, and Type I and Type II errors

This page is built from the after-class deck `Lecture_27_Chapter_8_CanvasPost_AL.pdf` (16 slides) and the class recording. Canvas numbers this class Lecture 27. Slides 9 and 12 are pictures in the deck, so their content here is the standard picture they label. The three iClicker questions and the instructor's remarks are under In class. The [question bank](../02-questions.md) lists this lecture under "Lec 26".

## Your notes (photos of two pages headed "lecture 27", Canvas's number for this class, 2026-11-18)

### Page 1
- lecture 27
- How to do interval estimation for other parameters
- −
- ○ what is repeated sampling?
- population parameter? sample? sample data? Sigma?
- [drawing: an interval ( —|— ) above a line with a dot on it, labelled x̄ and "constant value"]
- [drawing: five intervals ( — ) stacked over a number line, crossed by one vertical line] ?
- 95% intervals capture true value
- t-model? v.s normal model
- (sample) random sample → any statistic → sd = s

### Page 2
- Hypothesis Testing
- Null hypothesis
- → The null hypothesis H0: assumption about a population parameter
- 3 forms
  - H0: μ ≥ μ0, Ha: μ < μ0 } lower tail test
  - H0 ≥, Ha > } upper tail test
  - H0 =, Ha ≠ } two tailed test

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

## In class

### iClicker 1: what "95% confident" means

- The question gave a 95% confidence interval for $$\mu$$ of $$(2000, 2100)$$ and asked what it means to be 95% confident.
- The four choices were these.
  - A. 95% of the observations in the entire population fall in the given interval.
  - B. In repeated sampling, the population parameter would fall in the given interval 95% of the time.
  - C. 95% of the observations in the sample fall in the given interval.
  - D. In repeated sampling, 95% of the intervals constructed would contain the population mean.
- The answer is D. Only 59% of the class chose it, and most of the rest chose B.
- A and C are wrong because a confidence interval is about the parameter, not about individual observations in the population or in the sample.
- B is wrong because $$\mu$$ is one fixed number. It is unknown, but it never moves; what changes from sample to sample is the interval. The 95% describes the method, not a probability for the one interval you have.

### iClicker 2: which model the interval uses

- A simple random sample of 100 chocolate bars had an average weight of 161, and the population standard deviation $$\sigma$$ was unknown. The question asked which model a 95% confidence interval for the mean weight is based on.
- The answer is the t model with 99 degrees of freedom. 72% of the class chose it, and some chose t with the wrong degrees of freedom.
- Because $$\sigma$$ is unknown, it is estimated by the sample standard deviation $$s$$, which can always be computed from a random sample. Using $$s$$ turns the standard Normal model into the t model with $$n - 1$$ degrees of freedom.
- The standard Normal choice works as an approximation, because $$n = 100$$ is large and the t distribution gets closer to the Normal as the degrees of freedom grow. When only one answer can be chosen, choose the exact model, t.
- The question asks only for the model, so no value of $$s$$ is needed.
- A student asked which model is more accurate. The instructor said t, the exact one. In a written answer you may use the Normal value instead only if you say it is an approximation justified by the large sample.

### iClicker 3: writing the hypotheses

- The question asked for the null and alternative hypotheses to determine whether the average number of tissues used during a cold is less than 60.
- The answer is $$H_0: \mu \ge 60$$ against $$H_a: \mu < 60$$.
- The two choices written with $$\bar{x}$$ are wrong at once. Hypotheses are always about a population parameter, and the sample mean is already known once the data are in.
- "Less than 60" is what the test tries to establish, so it goes in $$H_a$$, and the equality goes with $$H_0$$.

### Remarks on the material

- Chapter 8 builds intervals only for the population mean. A student asked about other parameters, such as a population proportion. The technique is the same, a point estimate plus or minus a margin of error, but the formula comes from that statistic's own sampling distribution. This is for later courses, not this one.
- The p-value approach is not in the textbook, but you need it. Software reports p-values, and an exam question may tell you which approach to use.
- "Assuming $$H_0$$ is true" means assuming the equality case, $$\mu = \mu_0$$. The sampling distribution of the test statistic is centred there.
- A p-value of 0.3 means data like these would turn up about 3 times in 10 if $$H_0$$ were true, which is not unusual. A p-value of 0.0005 means the sample would be extreme if $$H_0$$ were true, so $$H_0$$ is rejected.
- Different samples of the same size give different values of the test statistic. The rejection region is every value for which $$H_0$$ is rejected.
- The hypotheses and $$\alpha$$ are fixed before the data are collected. Choosing them after seeing the data is, in the instructor's word, cheating.
- The class ended on the Type I and Type II errors table, which is also the first slide of Lecture 28. Next class explains why the decision is worded "do not reject $$H_0$$" rather than "accept $$H_0$$", with an example of both errors.

### Announcements

- Written Assignment 2 is posted. Questions 5 and 6 are bonus, so the maximum is about 109%.
- Lab 6 is this week, its pre-lab quiz is due Friday, and WeBWorK 7 is due Thursday.
- The instructor now drops 6 clicker sessions instead of 4, and also the lowest lab, the lowest pre-lab quiz and the lowest WeBWorK. The final replaces the midterm when its percentage is higher. All of this is applied automatically when final grades are prepared.

## Clarifications

- **Repeated sampling** (your "what is repeated sampling?" and the "?" by your drawing). You only ever take one sample. Repeated sampling is a thought experiment: imagine taking many samples of the same size from the same population and building a 95% interval from each. Each sample has a different $$\bar{x}$$, so each interval lands in a different place. Your drawing is exactly this picture. The vertical line is the true $$\mu$$, which stays put, and each bar is the interval from one sample. About 95 of every 100 bars cross the line and about 5 miss it. That is what "95% confident" means: the method catches $$\mu$$ 95% of the time. For the one interval you actually have, you cannot tell whether it is a hit or a miss.
- **Parameter, sample, sample data and sigma** (your line of question marks). Take the rent example on this page.
  - The population is every studio apartment within 3 km of campus.
  - A population parameter is a fixed number that describes the whole population, such as the mean rent $$\mu$$ or the standard deviation of the rents $$\sigma$$. It is unknown because nobody has every rent.
  - The sample is the 16 apartments actually checked, and the sample data are their 16 rents.
  - A statistic is a number computed from the sample data, such as $$\bar{x} = 1000$$ or $$s = 150$$. It estimates the matching parameter and changes from sample to sample.
  - $$\sigma$$ is the population standard deviation; $$s$$ is the sample standard deviation, its estimate.
- **The constant value in your first drawing.** The constant value is $$\mu$$, the dot on the line. $$\bar{x}$$ is the centre of the interval. $$\mu$$ never changes, while $$\bar{x}$$ and the interval around it change with every sample. That is why choice B in iClicker 1 is wrong: it talks as if $$\mu$$ moves in and out of a fixed interval.
- **The t model and the Normal model** (your "t-model? v.s normal model"). Both are bell-shaped curves centred at 0, and each supplies the multiplier in $$\bar{x} \pm \text{multiplier} \times \text{standard error}$$. When $$\sigma$$ is known, the multiplier comes from the standard Normal, $$Z$$. When $$\sigma$$ is unknown you plug in $$s$$, and the extra uncertainty from estimating $$\sigma$$ gives the curve heavier tails. That curve is t with $$n - 1$$ degrees of freedom. Heavier tails mean a larger multiplier and so a wider interval: at 95% with $$n = 16$$ the multiplier is $$t_{0.025, 15} = 2.131$$ instead of $$1.96$$. As $$n$$ grows, $$s$$ gets close to $$\sigma$$ and t gets close to $$Z$$.
- **"Random sample → any statistic → sd = s".** The instructor's point was that from a random sample you can compute any statistic, the sample standard deviation $$s$$ included. So an unknown $$\sigma$$ can always be replaced by $$s$$, and that replacement is what brings in the t model.
- **The upper-tail test on your page 2.** You wrote $$H_0$$ with $$\ge$$. It should be $$H_0: \mu \le \mu_0$$ against $$H_a: \mu > \mu_0$$. $$H_a$$ takes the strict sign of what the test tries to show, and $$H_0$$ takes the opposite sign with the equality, so the two always cover every value between them. Your lower-tail pair, $$H_0: \mu \ge \mu_0$$ against $$H_a: \mu < \mu_0$$, is right.
- **Interval estimation for other parameters** (your first line). This was a student's question, answered under Remarks on the material. It is not course material.
