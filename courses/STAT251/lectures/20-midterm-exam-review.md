# STAT 251 — Lec 20 (Wed Oct 28) — Midterm exam review

The deck is `Midterm_Review_CanvasPost.pdf` (28 slides). The class itself, from the Panopto recording, was four iClicker questions and the instructor's advice on how written answers are marked. The deck is a formula review for Chapters 1 and 3 to 6, with no worked examples or new material. The [question bank](../02-questions.md) lists this lesson under "Lec 20".

## What to review for the exams

### What the midterm covered (slides 1 to 2)

- The midterm covered Chapters 1, 3, 4, 5 and 6. The final covers this material again.
- Inferential statistics was not on it, because it starts in Chapters 7 to 9.

### Chapter 1 checklist (slides 3 to 4)

- Classify variables by type and distinguish descriptive from inferential statistics.
- Tables and graphs:
  - frequency table, pie chart and bar graph;
  - dot plot and stem-and-leaf plot;
  - histogram and box plot.
- Measures of centre, the mean and the median, and what comparing them says about shape.
- Measures of spread: the range, the variance, the standard deviation and the IQR, $$Q_3 - Q_1$$.
- Percentiles, and identifying outliers.
- How outliers affect the mean, median, variance, standard deviation, $$Q_1$$, $$Q_3$$ and IQR.
- How changes of location and scale affect the mean and the variance.
- Taught in [lectures 1–2](01-02-ch1-data-types-displays.md), [3](03-ch1-histograms-center-spread.md) and [4](04-variability-quartiles-boxplots.md).

### Chapter 3 checklist (slides 5 to 6)

- Identify the random experiment, its sample space, events and equally likely outcomes.
- Venn diagrams for the complement, the intersection, the union and disjoint events.
- The addition rule and the complement rule.
- Conditional probability, the multiplication rule and independence defined through conditional probabilities.
- Bayes' theorem and tree diagrams.
- Taught in [lectures 5](05-sets-and-probability-addition-rule.md), [6](06-conditional-probability-independence.md) and [7](07-bayes-theorem-and-reliability.md).

## Formula review

### Chapter 4: discrete random variables (slides 7 to 10)

- A pmf $$f(x) = P(X = x)$$ must satisfy $$f(x) \ge 0$$ for every $$x$$ and $$\sum_x f(x) = 1$$.
- The cdf, the mean and the mean of a function of $$X$$:

$$
\begin{aligned}
F(x) &= \sum_{k \le x} f(k) \\
\mu = E(X) &= \sum_x x\,f(x) \\
E[g(X)] &= \sum_x g(x)\,f(x)
\end{aligned}
$$

- The variance, by the definition and by the shortcut the slides recommend:

$$
\begin{aligned}
\sigma^2 &= \sum_x (x - \mu)^2 f(x) \\
\sigma^2 &= E(X^2) - [E(X)]^2 \\
\sigma &= \sqrt{\operatorname{Var}(X)}
\end{aligned}
$$

- Taught in [lecture 8](08-discrete-random-variables.md).

### Chapter 4: continuous random variables (slides 11 to 15)

- A pdf gives probabilities as areas, $$P(a \le X \le b) = \int_a^b f(x)\,dx$$. It must satisfy $$f(x) \ge 0$$ for every $$x$$ and have total area 1.
- The cdf and the mean:

$$
\begin{aligned}
F(x) &= \int_{-\infty}^{x} f(t)\,dt \\
E(X) &= \int_{-\infty}^{\infty} x\,f(x)\,dx \\
E[g(X)] &= \int_{-\infty}^{\infty} g(x)\,f(x)\,dx
\end{aligned}
$$

- The variance shortcut is the same as in the discrete case, $$\operatorname{Var}(X) = E(X^2) - [E(X)]^2$$.
- The uniform distribution on $$[a, b]$$, written $$X \sim U(a, b)$$, has density $$\frac{1}{b - a}$$ on the interval and 0 outside it:

$$
\begin{aligned}
E(X) &= \frac{a + b}{2} \\
\operatorname{Var}(X) &= \frac{(b - a)^2}{12}
\end{aligned}
$$

- The exponential distribution with rate $$\lambda > 0$$, written $$X \sim \text{Exp}(\lambda)$$, models the time until an event:

$$
\begin{aligned}
f(x) &= \lambda e^{-\lambda x}, \quad x \ge 0 \\
E(X) &= \frac{1}{\lambda} \\
\operatorname{Var}(X) &= \frac{1}{\lambda^2}
\end{aligned}
$$

- Taught in [lecture 9](09-continuous-random-variables.md).

### Chapter 4: rules for the mean and variance, covariance (slides 16 to 18)

- For constants $$a$$ and $$b$$ and any $$X$$ and $$Y$$:

$$
\begin{aligned}
E(aX + b) &= aE(X) + b \\
E(X + Y) &= E(X) + E(Y) \\
\operatorname{Var}(aX + b) &= a^2 \operatorname{Var}(X)
\end{aligned}
$$

- $$E(XY) = E(X)E(Y)$$ needs $$X$$ and $$Y$$ independent.
- Covariance, and the variance of a sum:

$$
\begin{aligned}
\operatorname{Cov}(X, Y) &= E(XY) - E(X)E(Y) \\
\operatorname{Var}(X + Y) &= \operatorname{Var}(X) + \operatorname{Var}(Y) \\
&\quad + 2\operatorname{Cov}(X, Y)
\end{aligned}
$$

- The general form, for constants $$a$$, $$b$$ and $$c$$:

$$
\begin{aligned}
&\operatorname{Var}(aX + bY + c) \\
&= a^2 \operatorname{Var}(X) + b^2 \operatorname{Var}(Y) \\
&\quad + 2ab \operatorname{Cov}(X, Y)
\end{aligned}
$$

- Independent variables have $$\operatorname{Cov}(X, Y) = 0$$, so the covariance term drops.
- Slide 18 lists the topics with no formulas: linear combinations of independent random variables, the average of independent and identically distributed (iid) random variables, and the maximum and minimum of independent random variables.
- Taught in [lectures 10](10-properties-mean-variance-covariance.md), [11](11-activity-3-expectation-variance-discrete.md) and [12](12-max-min-more-examples.md).

### Chapter 5: the Normal distribution (slides 19 to 22)

- The topics: $$X \sim N(\mu, \sigma^2)$$, the 68-95-99.7 rule, z-scores, the standard Normal $$Z \sim N(0, 1)$$, probabilities from the standard Normal table, and linear combinations of Normals.
- Standardising: if $$X \sim N(\mu, \sigma^2)$$, then $$Z = \frac{X - \mu}{\sigma} \sim N(0, 1)$$.
- A linear function stays Normal: if $$Y = aX + b$$ with $$a \ne 0$$, then $$Y \sim N(a\mu + b, a^2 \sigma^2)$$.
- For independent $$X_i \sim N(\mu_i, \sigma_i^2)$$ and $$Y = a_1 X_1 + \dots + a_n X_n$$, $$Y$$ is Normal with:

$$
\begin{aligned}
E(Y) &= \sum_{i=1}^{n} a_i \mu_i \\
\operatorname{Var}(Y) &= \sum_{i=1}^{n} a_i^2 \sigma_i^2
\end{aligned}
$$

- When the $$X_i$$ are also identically distributed, $$N(\mu, \sigma^2)$$, this collapses to $$Y \sim N\left((a_1 + \dots + a_n)\mu,\ (a_1^2 + \dots + a_n^2)\sigma^2\right)$$.
- The mean of a Normal sample of size $$n$$ is Normal: $$\bar{X} \sim N\left(\mu, \frac{\sigma^2}{n}\right)$$.
- Taught in [lectures 13](13-ch5-normal-and-standard-normal.md) and [14](14-ch5-normal-linear-combinations-sample-mean.md).

### Chapter 6: probability models (slides 23 to 27)

- Bernoulli, $$X \sim \text{Bernoulli}(p)$$: $$P(X = x) = p^x (1 - p)^{1 - x}$$ for $$x = 0, 1$$, with mean $$p$$ and variance $$p(1 - p)$$.
- Binomial, $$X \sim \text{Bin}(n, p)$$, the number of successes in $$n$$ independent trials:

$$
\begin{aligned}
P(X = x) &= \binom{n}{x} p^x (1 - p)^{n - x} \\
E(X) &= np \\
\operatorname{Var}(X) &= np(1 - p)
\end{aligned}
$$

- Geometric, $$X \sim \text{Geo}(p)$$, the number of independent trials to the first success:

$$
\begin{aligned}
P(X = x) &= p(1 - p)^{x - 1} \\
E(X) &= \frac{1}{p} \\
\operatorname{Var}(X) &= \frac{1 - p}{p^2}
\end{aligned}
$$

- Poisson, $$X \sim \text{Poisson}(\lambda)$$, the number of occurrences in an interval or region at rate $$\lambda$$, good for rare events:

$$
\begin{aligned}
P(X = x) &= \frac{\lambda^x e^{-\lambda}}{x!} \\
E(X) &= \lambda \\
\operatorname{Var}(X) &= \lambda
\end{aligned}
$$

- In a Poisson process with rate $$\lambda$$, the time $$T$$ between events, which is also the wait for the first event, is $$\text{Exp}(\lambda)$$, with cdf $$F(t) = 1 - e^{-\lambda t}$$ for $$t \ge 0$$.
- Taught in [lectures 15](15-ch6-bernoulli-binomial.md), [16](16-ch6-binomial-examples.md), [17](17-ch6-binomial-suitability-geometric.md), [18](18-ch6-poisson-approximation.md) and [19](19-ch6-activity-6-poisson-exponential.md).

## In class (from the recording)

### Announcements

- There were no labs the week of Oct 26. Lab 5 runs the week of Nov 2, with a pre-lab quiz.
- WeBWorK 6 is due Nov 12. Everything except one part of one question can be done now; that part needs Chapter 7.
- Written Assignment 1 solutions opened at 9:30 on Oct 28, after the late submissions he allowed. Its grades come after the midterm grades, because midterm marking goes first.
- The midterm mixed multiple choice, short answers, short calculations like WeBWorK, and possibly true or false. It ran 48 minutes, not 50, to leave time to collect papers.
- Bring a calculator you already know how to use. The library lends calculators.
- Cheat sheets:
  - The midterm allowed one handwritten side. The final allows two sides, or two one-sided sheets, so keep the midterm sheet and add a second one.
  - Sheets are not collected.
  - A tablet is fine if the sheet is handwritten and printed.
  - Write formulas and concepts, not worked solutions, because he never reuses a question.
  - Do not give your sheet to anyone, even as a copy.
- Each exam has at least one hard question. The rest are doable and some are easy.
- The mid-term TA evaluation is due Fri Nov 6.

### Clicker questions

1. **Which summary is not sensitive to outliers?** The answer was B, the IQR.
   - A summary built from every value (the mean, the variance, the standard deviation) or from the extremes (the range) moves when an outlier appears.
   - The IQR uses only the middle 50% of the data, so very low or very high values do not change it.
2. **$$P(S) = 0.4$$ and $$P(T) = 0.5$$; find $$P(S \cup T)$$.** Only 68% got it right.
   - The options paired each value with a condition. If $$S$$ and $$T$$ are disjoint, $$P(S \cup T) = 0.4 + 0.5 = 0.9$$; if they are independent, $$P(S \cap T) = 0.4 \times 0.5 = 0.2$$, so $$P(S \cup T) = 0.4 + 0.5 - 0.2 = 0.7$$.
   - The right option was 0.7 with independence. The wrong ones included 0.9 with independence and 0.7 with disjointness.
   - Many students picked 0.9 without reading which condition it was paired with.
3. **$$T = 2W + 3X - Y$$, with $$W$$ independent of $$X$$ and of $$Y$$ and $$\operatorname{Cov}(X, Y) = 3$$; find $$\operatorname{Var}(T)$$.** The answer was D, 22, and only 50% got it right.
   - Independence makes $$\operatorname{Cov}(W, X)$$ and $$\operatorname{Cov}(W, Y)$$ zero, so only the $$X, Y$$ covariance term stays.
   - That term is $$2 \times 3 \times (-1) \times \operatorname{Cov}(X, Y) = -18$$: two, times both coefficients with their signs, times the covariance.
   - The recording does not say the three variances clearly, only the answer.
   - Looking at the results chart, he said it looked left-skewed but that a bar chart has no skewness, because its categories can be put in any order.
4. **$$P(Z > 5)$$ for a standard Normal $$Z$$.** It is about 0, and 85% got it right.
   - The table only runs from about $$-3.49$$ to $$3.49$$, because almost all the area lies within 3 standard deviations.
   - A z-score outside that range gives a probability of about 0 or about 1. One Written Assignment 1 answer reached a z-score above 6, so the probability below it was about 1.

### How written answers are marked

- Define the random variable in words, name its distribution and give both parameters. "$$X$$ follows a Normal distribution" with no mean and variance earns only part marks.
- Name the distribution and its parameters before you use a formula. Write "$$X \sim U(5, 15)$$, so $$E(X) = \frac{a + b}{2} = 10$$", not numbers dropped straight into the cheat-sheet formula.
- A tree diagram can replace Bayes' theorem. The events still have to be defined, every branch labelled and the formula written.
- Use a tree only when there are few outcomes: three coin flips (8 outcomes) are fine, but two dice rolls (36 outcomes) are not.
- Independence cannot be shown on a Venn diagram. Check it with an equation such as $$P(A \cap B) = P(A)\,P(B)$$. If one of the three equivalent tests holds, the other two hold as well.
- Never integrate the Normal pdf. Use the standard Normal table.
- The calculus needed is only what the class examples, WeBWorK and the written assignment used.
- Choose a graph from the type of variable:
  - pie chart or bar chart for categorical data;
  - dot plot or stem-and-leaf plot for a small discrete data set where values repeat (a dot plot of all-different values says nothing);
  - histogram and box plot for any numerical data, discrete or continuous, of any size.

## Clarifications

- Slide 21 has two typos. The mean of $$Y$$ is printed as "$$a_1\mu_1 + a_2\mu_2, \dots + a_n\mu_n$$" with a stray comma, and "$$a_1 (i = 1, 2, \dots, a_n)$$" should read "$$a_i$$ for $$i = 1, 2, \dots, n$$". The result itself is the one written above.
- Slide 16 lists $$\operatorname{Var}(X - Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$$ only for independent $$X$$ and $$Y$$. With a covariance it is $$\operatorname{Var}(X) + \operatorname{Var}(Y) - 2\operatorname{Cov}(X, Y)$$.
