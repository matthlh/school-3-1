# STAT 251 — Lec 23 (Fri Nov 6) — Ch 7: the Normal approximation to the Poisson; Ch 8: point estimation and unbiased estimators

The Nov 6 Panopto captions and the decks `Lecture_24_Chapter_7_CanvasPost_AL.pdf` (9 slides) and `Lecture_25_Chapter_8_CanvasPost.pdf` (first five slides) cover this lecture. Canvas numbers it Lecture 24, and the [question bank](../02-questions.md) lists it under "Lec 23" and "Long problems".

## Normal approximations for counts

### What the continuity correction changes (Nov 6 recording and lecture 22 deck)

The class opened by redoing the lecture 22 Example 3, $$X \sim \text{Binomial}(10, 0.5)$$ and $$P(X \le 2)$$, to explain why the 0.5 is there. The details are on the [lecture 22 page](22-ch7-clt-examples-normal-approx-binomial.md).

- The exact Binomial answer is 0.0547.
- The Normal approximation without the correction gives 0.0287, about half the true value.
- With the correction, $$P(X \le 2)$$ becomes $$P(Y \le 2.5)$$ and gives 0.0571, close to the exact value.
- The conditions $$np \ge 5$$ and $$n(1 - p) \ge 5$$ were only just met here (both equal 5), and the corrected approximation still worked.

#### Why the correction is 0.5

- A count only takes whole numbers, and two neighbouring values are 1 apart.
- When a count is drawn as bars, the fair way is to centre each bar on its value, so the bar for 2 runs from 1.5 to 2.5.
- The Normal curve is continuous, so "the count is 2" has to become "the Normal value is in the bar for 2", which is $$1.5 \le Y \le 2.5$$.
- So 0.5 is half the gap between neighbouring values.

#### How to choose the cutoff

1. Rewrite a strict inequality as a "with equals" one on whole numbers first: $$X > 4$$ is $$X \ge 5$$, and $$X < 4$$ is $$X \le 3$$.
2. Draw the bars and include every bar the event covers, all of it.
3. "At least $$k$$" starts at the left edge of the bar for $$k$$, which is $$k - 0.5$$.
4. "At most $$k$$" ends at the right edge of the bar for $$k$$, which is $$k + 0.5$$.

| Event for the count $$X$$ | Rewritten | With the correction |
|---|---|---|
| $$X > 4$$ | $$X \ge 5$$ | $$Y \ge 4.5$$ |
| $$X \ge 4$$ | $$X \ge 4$$ | $$Y \ge 3.5$$ |
| $$X < 4$$ | $$X \le 3$$ | $$Y \le 3.5$$ |
| $$X \le 4$$ | $$X \le 4$$ | $$Y \le 4.5$$ |
| $$X = 4$$ | $$X = 4$$ | $$3.5 \le Y \le 4.5$$ |

#### When to use the correction

- It applies whenever a discrete random variable (a count) is approximated by a continuous one (the Normal).
- It does not apply when a continuous variable is approximated by a Normal; a uniform variable is already continuous, so it needs no correction.
- The question will not say "use the continuity correction". The hint is the word "approximate" in the question: "find the approximate probability" means an approximation is expected.

### Why a single count is standardised with $$\sigma$$, not $$\frac{\sigma}{\sqrt{n}}$$ (recording)

A student asked why the Binomial approximation divides by $$\sigma$$ rather than by $$\frac{\sigma}{\sqrt{n}}$$ as the CLT examples did.

- In the Binomial and Poisson approximations the random variable is one count, $$X$$, not a sample mean $$\bar{X}$$.
- The standard deviation of that count is its own: $$\sqrt{np(1 - p)}$$ for a Binomial and $$\sqrt{\lambda}$$ for a Poisson.
- Dividing by $$\sqrt{n}$$ belongs only to $$\bar{X}$$, whose standard error is $$\frac{\sigma}{\sqrt{n}}$$.
- So first ask which random variable the question is about, then use that variable's mean and standard deviation.

### The Normal approximation to the Poisson (slides 2 and 3)

- If $$X \sim \text{Poisson}(\lambda)$$, then its mean and its variance are both $$\lambda$$. The Poisson is the only distribution in the course where the mean equals the variance. (The exponential has its mean equal to its standard deviation, both $$\frac{1}{\lambda}$$.)
- When $$\lambda \ge 20$$, the Poisson can be approximated by a Normal with the same mean and variance:

$$
X \approx N(\lambda, \lambda)
$$

- A Normal is always given by two numbers, its mean and its variance, and here both are $$\lambda$$.
- The standard deviation used to standardise is therefore $$\sqrt{\lambda}$$.
- The Poisson is a count, so the continuity correction is used exactly as for the Binomial (slide 4 repeats the table above).
- This completes Chapter 7: the CLT, the Normal approximation to the Binomial, the Normal approximation to the Poisson, and the continuity correction.

### Example 4: radioactive particles (slides 5 to 7)

A radioactive source emits particles at a mean of 55 per second, and the count follows a Poisson distribution.

#### Set up the distribution

The setup earns marks on its own.

1. Define the random variable: $$X$$ is the number of particles emitted in 1 second.
2. Name its distribution: $$X \sim \text{Poisson}(\lambda = 55)$$, so $$E(X) = 55$$ and $$\operatorname{Var}(X) = 55$$.
3. Check the condition: $$\lambda = 55 \ge 20$$.
4. So $$X \approx N(55, 55)$$, with standard deviation $$\sqrt{55} = 7.416$$.

#### (a) More than 60 particles in 1 second

$$
\begin{aligned}
P(X > 60) &= P(X \ge 61) \\
&\approx P(Y \ge 60.5) \\
&= P\left(Z \ge \frac{60.5 - 55}{\sqrt{55}}\right) \\
&= P(Z \ge 0.74) \\
&= 1 - 0.7704 \\
&= 0.2296
\end{aligned}
$$

#### (b) Between 50 and 65 particles inclusive

Include the whole bar for 50 and the whole bar for 65.

$$
\begin{aligned}
P(50 \le X \le 65) &\approx P(49.5 \le Y \le 65.5) \\
z_1 &= \frac{49.5 - 55}{\sqrt{55}} = -0.74 \\
z_2 &= \frac{65.5 - 55}{\sqrt{55}} = 1.42 \\
P &= \Phi(1.42) - \Phi(-0.74) \\
&= 0.9222 - 0.2296 \\
&= 0.6926
\end{aligned}
$$

The deck and the calculation disagree. The deck prints $$z_2 = 1.141$$ and gives 0.6911. The calculation gives 1.42 and 0.6926. See Clarifications for the source of the difference.

Once the probability statement is written in terms of $$Z$$, the rest is a Chapter 5 table lookup. The instructor stressed that the standard Normal table is used in every chapter from here on.

## Chapter 8. Inference and estimation

### Three distributions (Chapter 8 deck, slides 3 and 4)

Chapter 7 covered sampling distributions.

- The population distribution is the distribution of the whole collection of values the study is about. It is usually unknown.
- A sample distribution is the distribution of the values in one sample. The lecture 21 applets showed that a small sample can look quite different from the population. A large sample can look close to it.
- A sampling distribution is the distribution of a statistic, such as $$\bar{X}$$, $$\hat{p}$$ or $$S$$, over all possible samples.

### Using a sample to estimate a population parameter

**Statistical inference** means taking a sample from a population, analysing the sample, and making decisions or predictions about the population from it.

- Estimation finds an approximate value of an unknown population parameter from a sample statistic.
- The pairs used are $$\bar{x}$$ for $$\mu$$, $$s$$ for $$\sigma$$, and $$\hat{p}$$ for $$p$$.
- If the whole population's data were available, no inference would be needed: the parameters could simply be calculated.

### Point estimates and interval estimates

- A point estimate gives the parameter one value, for example "the mean is 100 dollars".
- An interval estimate gives a range with a lower and an upper bound, for example "the mean is between 90 and 110 dollars".
- A point estimate does not say how close it is likely to be to the parameter, so the interval estimate is more useful.
- An interval that is too wide is useless, even though it almost surely contains the parameter: "between 50 and 150 dollars" says little. That is why the variability of the sampling distribution matters.

### Estimators and estimates

- An estimator is the formula, for example $$\bar{X} = \frac{1}{n}\sum X_i$$.
- An estimate is the number the formula gives for one sample, for example $$\bar{x} = 78$$.

### Unbiased estimators (Chapter 8 deck, slides 5 to 7)

Write $$\theta$$ for a parameter and $$\hat{\theta}$$ for a point estimator of it.

- A good estimator has a sampling distribution centred at the parameter. This is called unbiasedness.
- $$\hat{\theta}$$ is unbiased when its expected value equals the parameter:

$$
E(\hat{\theta}) = \theta
$$

- The bias is the gap between the two, and an unbiased estimator has bias 0:

$$
\operatorname{bias}(\hat{\theta}) = E(\hat{\theta}) - \theta
$$

- A good estimator also has a small standard error. Between two unbiased estimators, the one with the smaller standard error is better.
- For a random sample from a population with mean $$\mu$$ and variance $$\sigma^2$$, $$\bar{X}$$ is unbiased for $$\mu$$ (shown in lecture 14: $$E(\bar{X}) = \mu$$) and $$S^2$$ is unbiased for $$\sigma^2$$. The proof is in a separate Canvas file, `Lecture_25_Chapter_8_UnbiasedEstimators_mu_sigma.pdf`, and the $$n - 1$$ in $$S^2$$ is what makes it unbiased.

The class stopped here. Confidence intervals for $$\mu$$ (slides 8 to 13) are the next class, Fri Nov 13.

## In class

### Questions about the material

- The slide and the instructor used different numbers for the same CLT activity. The slide calls it Activity 8 and the instructor called it Activity 7. The class did it in lecture 22 and had no worksheet in this lecture.
- A student asked whether a Poisson rate under 20 could be scaled up (for example 1 per second becomes 20 per 20 seconds) to use the approximation. The instructor said that changes the question: the rate has to match the interval the question asks about.
- The instructor pointed out the other 0.5 in the course: the quartile rule $$np + 0.5$$ from Chapter 1 is also a correction.
### Midterm grades and written work

- Midterm results appeared on Gradescope just before class. Version B was out of 36.
- About 20 students scored under 16 of 36 and pulled the mean down. Most did well, and one or two scored 36 of 36.
- **The final can replace the midterm.** If your final-exam percentage is higher than your midterm percentage, the midterm grade is replaced by the final's percentage.
  - In the instructor's first example, a 55% midterm becomes 85% if the final is 85%.
  - In his second example, a 35% midterm becomes 70% if the final is 70%.
- The course average is always kept between 75 and 80. If the final turns out hard, he scales the marks up.
- The TAs said students lost marks for giving the right answer without showing how they got it. For written answers, show these steps.
  - Define the random variable in words ("W is the time to serve one customer").
  - Name its distribution and parameter ("W follows an exponential distribution with $$\lambda = \ldots$$").
  - Say "continuity correction" when you add or subtract 0.5.
  - A multiple-choice question needs no work shown.
- Remarking: TAs do not double-check midterm marking. Compare your Gradescope paper with the posted solutions (Midterm Exam Information module), and if there is a genuine marking mistake, send the Change of Grade Request form (Course Information module) to the head TA within one week of the grades being released.
- Written assignments should be laid out clearly, like the posted solutions. Squeezing five answers onto two pages left out steps that carry marks.
### Schedule

- There are no labs the week of Nov 9 to 13. Fri Nov 13 is the only class that week because of the break on Monday and Wednesday.
- The mid-term TA evaluation closed on the day of this lecture.

## Clarifications

- Slide 7 has an arithmetic slip. $$\frac{65.5 - 55}{\sqrt{55}} = \frac{10.5}{7.416} = 1.42$$, not 1.141, so $$\Phi(1.42) = 0.9222$$ and the answer is $$0.9222 - 0.2296 = 0.6926$$. The deck's 0.6911 comes from reading $$\Phi(1.41)$$. The method on the slide is right.
- The deck title says Activity, but no activity was done in this class (see In class).
