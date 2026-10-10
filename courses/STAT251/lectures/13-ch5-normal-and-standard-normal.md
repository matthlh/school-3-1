# STAT 251 — Lec 13 (Fri Oct 9) — Ch 4 activity A2, and Ch 5: the Normal and standard Normal distributions

You were absent, so there is no page from you. This file is the posted decks organised for study, the before-class `Lecture_13_Chapter_5_BL_CanvasPost.pdf` (25 slides) and the after-class `Lecture_13_Chapter_5_CanvasPost_AL.pdf` (30 slides, the same slides plus worked answers), with the Chapter 4 activity sheet A2 and its solution, and the recording's remarks under In class. Class reached slide 11, the SAT and ACT comparison. Slides 12 to 25, the standard Normal, Table A and the forward and backward calculations, are written up below from the deck and are expected next class, Wed Oct 14.

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

## In class (from the recording)

### Announcements

- Lab 2 ends today, and Lab 3 runs next week.
- Monday Oct 12 is a holiday: no lectures, no labs and no office hours.
  - The Monday lab sections get their lab posted online next Friday and do it individually, with four days to submit.
  - Your section is Friday, so your lab does not change.
- The Lab 3 pre-reading goes up today.
- WeBWorK 3 closed yesterday. WeBWorK 4 is due next Thursday, Oct 15.
- He asked you to work through lecture 12's Examples 9 and 10 with their posted solutions, because WeBWorK 4 has questions of the same kind.

### Notation, because students asked after lecture 12

- Capital $$F_X(x)$$ is the cdf of the random variable $$X$$. Lowercase $$f_X(x)$$ is its pdf when $$X$$ is continuous and its pmf when $$X$$ is discrete.
- The subscript names the random variable, which matters once there are several, such as $$F_{X_1}$$ and $$F_{X_2}$$ for the maximum.
- $$F_W(w) = P(W \le w)$$ is the definition. Evaluating it at a number $$a$$ means plugging $$a$$ in, so $$F_W(a) = P(W \le a)$$.

### Chapter 4 activity A2: a shifted exponential (worksheet, before the Chapter 5 slides)

- The class opened with a worksheet on one continuous random variable before the Normal slides started. The pdf is $$f(x) = e^{-(x - 2)}$$ for $$x \ge 2$$ and 0 elsewhere, an exponential with rate 1 that starts at 2 instead of 0.
- Part (i)(a) asks you to verify that $$f$$ is a pdf. The two checks are that $$f(x) \ge 0$$ for every $$x$$ and that the total area is 1.

$$
\begin{aligned}
\int_{2}^{\infty} e^{-(x-2)}\,dx &= \left[-e^{-(x-2)}\right]_{2}^{\infty} \\
&= 0 - (-1) = 1
\end{aligned}
$$

- Part (i)(b) asks for the cdf. Integrate the pdf from the start of the support up to $$x$$, and state the cdf for every real $$x$$.

$$
F(x) =
\begin{cases}
0 & x < 2 \\
1 - e^{-(x-2)} & x \ge 2
\end{cases}
$$

- Part (i)(c) asks you to shade $$P(1 < X < 3)$$ on the sketch of the pdf. The region from 1 to 2 has no area because the pdf is 0 there, so only the strip from 2 to 3 is shaded.
- Part (i)(d) finds the same probability from the cdf. Because 1 is below the support, $$F(1) = 0$$.

$$
\begin{aligned}
P(1 < X < 3) &= F(3) - F(1) \\
&= \left(1 - e^{-1}\right) - 0 \\
&\approx 0.632
\end{aligned}
$$

- This part was the first clicker question. The answer was (b), $$1 - e^{-1}$$, and only 59% got it.
  - He said the cdf from part (b) gives it in under a minute by plugging in 3 and 1.
  - The students who integrated again were the ones who got it wrong. Once you have the cdf, use it.
- Part (i)(e) asks for a second method and a check. Integrate the pdf directly from 2 to 3, since it is 0 from 1 to 2, and the same $$1 - e^{-1}$$ comes out. Integrating the formula from 1 to 3 is wrong, because $$f$$ is 0 from 1 to 2, so the limits are 2 to 3.
- Part (ii) asks for the median, the value exceeded 50% of the time. Set $$F(m) = 0.5$$ and solve.

$$
\begin{aligned}
1 - e^{-(m-2)} &= 0.5 \\
e^{-(m-2)} &= 0.5 \\
m &= 2 + \ln 2 \approx 2.693
\end{aligned}
$$

- He went through the median as a multiple-choice item without polling it. Two statements were correct, $$P(X \ge m) = 0.5$$ and $$F(m) = 0.5$$, because the median splits the area into two halves of 0.5.
- On a written question graded by the TAs, the exact form $$m = 2 + \ln 2$$ gets full marks. Only a question that asks for a number of decimal places needs the calculator.
- The point of the sheet is the Chapter 4 routine on a support that does not start at 0: check the pdf, build the cdf with its two cases, read probabilities off the cdf, and get the median by inverting $$F$$.

### Chapter 5, slides 3 to 11

- The Normal distribution matters because most statistical models assume it. When data are not Normal, analysts often transform them until they are, and then the results have to be explained on the transformed scale.
- A theoretical Normal curve is exactly symmetric. Real data are never exactly Normal, and roughly Normal is enough to call them Normal.
- The mean $$\mu$$ can be any real number, and $$\sigma$$ is always positive.
- On slide 5 the narrower curve, $$\sigma = 15$$, has the higher peak than $$\sigma = 25$$. Both areas must be 1, so the narrower curve has to be taller.
- He showed the pdf formula and said never to use it to calculate probabilities. Integrating it is not practical, and the z-scores and Table A from the next slides are the method.
- Notation: $$Y \sim N(200, 25)$$ means a mean of 200 and a variance of 25, so $$\sigma = 5$$. Some textbooks, the STAT 200 one among them, write the standard deviation second. This course always writes the variance.
- To check whether data are Normal, draw a histogram, not a box plot, and look for a roughly symmetric single-peaked bell. Only then apply the 68-95-99.7 rule.
- For the Iowa example he sketched the curve first. Mark $$\mu$$ and three equally spaced standard deviations either side: 2.19, 3.74, 5.29, 6.84, 8.39, 9.94 and 11.49. Questions are much easier to answer from the sketch.
- The second clicker question was the percent of scores above 5.29. The answer was (c), 84%, which is the 0.5 above the mean plus the 0.34 between $$\mu - \sigma$$ and $$\mu$$. Some students still got it wrong.
- The rule only works at exactly one, two or three standard deviations from the mean. It cannot give $$P(X > 5)$$ or $$P(6.5 < X < 7.5)$$ for the Iowa scores exactly, only a range, and z-scores with Table A are how those are found.
- On the heights example he described $$z = 2.07$$ as on the large side, since about 95% of women are within two standard deviations of the mean. The ACT score is the better one because its z-score is further out to the right.
- The recording says $$\sigma = 2.9$$ for the heights and 4.2 for the ACT in passing, but both calculations use the deck's 2.8 and 4.7.

### Office hours

- He said the TAs report that almost no one comes to office hours, which he suspects is because students take finished solutions from AI tools.
- He asked for questions to come to his and the TAs' office hours instead, where they check the concept before explaining. Some WeBWorK questions are meant to be challenging, which is why each set is open for at least a week.

## Clarifications

- The deck writes the parameters as $$N(6.84, 1.55^2)$$ and $$N(500, 100^2)$$: the second argument is the variance written as a square, so the standard deviation is the number before the square. Reading $$N(500, 100^2)$$ as a standard deviation of 10,000 is the classic slip. R's `pnorm` takes `sd`, the standard deviation, and not the variance.
- Table A gives the area to the left. The deck's slide 21 picks the table entry closest to the target proportion rather than interpolating. If an exam question asks for 0.90, use 0.8997 and $$z = 1.28$$.
- Slide 6's formula came through the text layer broken. The pdf written above is the standard Normal density formula and matches the textbook.
- The 68-95-99.7 rule is an approximation. Table A gives 0.6827, 0.9545 and 0.9973, and a question that asks for a table answer wants those, not the rounded rule.

Questions: 13 in [02-questions.md](../02-questions.md) under "Lec 13", and 2 under "Long problems". Ledger: 2 topics, 3o and 3p, plus the existing 3f row.
