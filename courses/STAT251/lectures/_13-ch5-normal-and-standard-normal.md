# STAT 251 · Lecture 13 · Ch 5: the Normal and standard Normal distributions (Fri Oct 9, 2026)

Prepared 2026-10-08 from the before-class deck `Lecture_13_Chapter_5_BL_CanvasPost.pdf` (25 slides). The Chapter 4 activity sheet (A2) and the after-class deck unlock on Fri Oct 9 at 07:30 and are folded in then. 9 questions banked under Lec 13, one of them under Long problems.

## Slides, organized

### The Normal family (slides 3 to 6)

- The Normal distribution is the most important distribution in statistics. Every Normal curve is symmetric, single-peaked and bell-shaped.
- A particular Normal distribution is fixed by two numbers, its mean $$\mu$$ and its standard deviation $$\sigma$$. The notation is $$X \sim N(\mu, \sigma^2)$$, so the second number inside the brackets is the variance, not the standard deviation.
- The mean sits at the centre of the symmetric curve and equals the median. Changing $$\mu$$ with $$\sigma$$ fixed slides the curve along the axis without changing its spread.
- The standard deviation controls the spread. A larger $$\sigma$$ makes the curve lower and wider, so the area is less concentrated around the mean. The deck shows $$\sigma = 15$$ against $$\sigma = 25$$.
- The pdf is

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}}\, e^{-\frac{(x - \mu)^2}{2\sigma^2}}, \quad -\infty < x < \infty
$$

### The 68-95-99.7 rule (slides 7 to 8)

- In any Normal distribution about 68% of observations fall within one $$\sigma$$ of $$\mu$$, about 95% within two, and about 99.7% within three. The deck calls it the empirical rule.
- Worked example: Iowa Test vocabulary scores for grade 7 students are close to $$N(6.84, 1.55^2)$$. The questions are to sketch the curve, to find the percent between 3.74 and 9.94, and the percent above 5.29. The answers come from the rule alone: 3.74 and 9.94 are $$\mu \pm 2\sigma$$, so 95%; 5.29 is $$\mu - \sigma$$, so half of the 68% plus the upper 50%, which is 84%.

### Z-scores (slides 9 to 11)

- The standardised value of an observation $$x$$ from a distribution with mean $$\mu$$ and standard deviation $$\sigma$$ is

$$
z = \frac{x - \mu}{\sigma}
$$

- The z-score is the number of standard deviations $$x$$ sits from the mean. Negative means below the mean, positive means above.
- Worked example: heights of US women aged 20 to 29 are about $$N(64.2, 2.8^2)$$ inches. A 70-inch woman has $$z = \frac{70 - 64.2}{2.8} = 2.07$$, and a 60-inch woman has $$z = \frac{60 - 64.2}{2.8} = -1.50$$.
- Z-scores compare observations from different Normal distributions. The deck's scenario: a student scored 650 on the SAT, which has $$\mu = 500$$ and $$\sigma = 100$$, and 30 on the ACT, which has $$\mu = 21$$ and $$\sigma = 4.7$$. The SAT z-score is 1.5 and the ACT z-score is about 1.91, so the ACT score is relatively higher.

### The standard Normal distribution and Table A (slides 12 to 16)

- The standard Normal distribution is the Normal distribution with mean 0 and standard deviation 1, written $$N(0, 1)$$.
- If $$X \sim N(\mu, \sigma^2)$$ then $$Z = \frac{X - \mu}{\sigma}$$ has the standard Normal distribution. Every Normal distribution looks the same once standardised, so one table gives areas under any Normal curve.
- The cumulative proportion for a value $$x$$ is the proportion of observations less than or equal to $$x$$. For the standard Normal this is $$P(Z \le z)$$.
- Table A lists, for each $$z$$, the area under the standard Normal curve to the left of $$z$$. The row gives $$z$$ to one decimal and the column gives the second decimal. The deck's example: the row 0.8 and column .01 give $$P(Z < 0.81) = 0.7910$$.
- The standard Normal is symmetric about zero, so one table of left-hand areas is enough for every probability. Right-hand tails come from one minus the left area, and a negative $$z$$ has the same tail area as its positive twin.

### Forward Normal calculations (slides 17 to 20)

- Between two values, subtract the two left areas. The deck's example is the proportion between $$-1.25$$ and $$0.81$$, which is $$0.7910 - 0.1056 = 0.6854$$.
- Worked example: SAT reading scores are $$N(500, 100^2)$$ and you scored 650. The proportion who did better is $$P(X > 650) = P(Z > 1.5) = 1 - 0.9332 = 0.0668$$.
- The deck's three-step method for a forward problem. Step 1, state the problem in terms of the observed variable $$x$$ and draw a picture of the area wanted as cumulative proportions. Step 2, standardise $$x$$ to restate the problem in terms of $$z$$. Step 3, use Table A and the fact that the total area is 1 to find the area.
- In R the left area is `pnorm(z)`, or `pnorm(x, mean = mu, sd = sigma)` without standardising. `pnorm(0.81)` is 0.7910, `pnorm(0.81) - pnorm(-1.25)` is 0.6854, and `pnorm(1.5, lower.tail = FALSE)` or `pnorm(650, mean = 500, sd = 100, lower.tail = FALSE)` is 0.0668. Note that `sd` takes the standard deviation, while the course notation $$N(\mu, \sigma^2)$$ carries the variance.

### Backward Normal calculations (slides 21 to 24)

- A backward problem gives a proportion and asks for the value. The deck's example: how high must a student score on the SAT, $$N(500, 100^2)$$, to be in the top 10%?
- Top 10% means a cumulative proportion of 0.90 below the score. In Table A the area closest to 0.90 is 0.8997, in row 1.2 and column .08, so $$z = 1.28$$.
- Unstandardise: $$x = \mu + z\sigma = 500 + 1.28 \times 100 = 628$$.
- The three-step method for a backward problem. Step 1, state the problem in terms of the given proportion and draw the picture with the unknown $$x$$ in relation to the cumulative proportion. Step 2, use Table A and the total area of 1 to find the $$z$$ with that area to its left. Step 3, unstandardise $$z$$ to get $$x$$.

### What is next (slide 25)

- The summary slide lists the Normal distribution, the 68-95-99.7 rule, z-scores, the standard Normal distribution and probability calculations. The next class continues Chapter 5.

## Clarifications

- The deck writes the parameters as $$N(6.84, 1.55^2)$$ and $$N(500, 100^2)$$: the second argument is the variance written as a square, so the standard deviation is the number before the square. Reading $$N(500, 100^2)$$ as a standard deviation of 10,000 is the classic slip. R's `pnorm` takes `sd`, the standard deviation, and not the variance.
- Table A gives the area to the left. The deck's slide 21 picks the table entry closest to the target proportion rather than interpolating. If an exam question asks for 0.90, use 0.8997 and $$z = 1.28$$.
- Slide 6's formula came through the text layer broken. The pdf written above is the standard Normal density formula and matches the textbook.
- The 68-95-99.7 rule is an approximation. Table A gives 0.6827, 0.9545 and 0.9973, and a question that asks for a table answer wants those, not the rounded rule.
