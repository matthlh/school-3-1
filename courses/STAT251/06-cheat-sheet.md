# STAT 251 — Midterm cheat sheet (Fri Oct 30, 08:00)

One letter-size sheet, one side, handwritten (tablet-written and printed is fine; typed or pasted slides are not; two matching sheets both get taken). Covers Ch 1, 3, 4, 5, 6. Write it in three columns in the order below; Ch 6 and Ch 5 are the newest and the least practised, so they go first if you run short of time. Write the two habits at the top: "by independence" beside every product of probabilities, and a cdf for all real $$x$$ including the 0 and 1 pieces.

## Column 1 · Ch 6 and Ch 5

### Which distribution (3cc)
- Fixed $$n$$ trials, count the successes: Binomial.
- Trials until the first success: Geometric.
- Events at a rate over an interval or region, no $$n$$: Poisson.
- Time until the next event: Exponential.
- A probability from one model can feed another model's trial.

### Bernoulli and Binomial (3q–s)
- Bernoulli: $$p(x) = p^{x}(1 - p)^{1 - x}$$, mean $$p$$, variance $$p(1 - p)$$.
- Binomial $$X \sim \text{Bin}(n, p)$$ needs a fixed $$n$$, independent trials, one $$p$$. Sampling without replacement is fine when $$n \le 0.10N$$ (the 10% condition).
- $$P(X = x) = \binom{n}{x} p^{x} (1 - p)^{n - x}$$ for $$x = 0, 1, \dots, n$$.
- $$E(X) = np$$, $$\operatorname{Var}(X) = np(1 - p)$$.
- At least one: $$1 - P(X = 0)$$. Fewer than $$k$$: $$P(X \le k - 1)$$. More than $$k$$: $$1 - P(X \le k)$$.

### Geometric (3t–v)
- $$X$$ = trials until the first success, $$x = 1, 2, \dots$$: $$P(X = x) = p(1 - p)^{x - 1}$$.
- $$E(X) = \frac{1}{p}$$ (the return period), $$\operatorname{Var}(X) = \frac{1 - p}{p^{2}}$$.
- $$F(x) = 1 - (1 - p)^{x}$$ and $$P(X > x) = (1 - p)^{x}$$ (the first $$x$$ trials all fail).

### Poisson (3w–bb)
- Process: counts on non-overlapping intervals are independent; expected count is proportional to length; the rate does not change between intervals; no two events at one instant.
- Rate $$\lambda$$ per unit, so a length $$t$$ has mean $$\lambda t$$. Convert $$t$$ to the rate's unit first.
- $$P(X = x) = \frac{\lambda^{x} e^{-\lambda}}{x!}$$ for $$x = 0, 1, 2, \dots$$; $$E(X) = \operatorname{Var}(X) = \lambda$$.
- Wait to the next event $$T \sim \text{Exp}(\lambda)$$: $$P(T > t) = P(X_t = 0) = e^{-\lambda t}$$, mean $$\frac{1}{\lambda}$$.
- The $$k$$th event comes after time $$t$$ exactly when at most $$k - 1$$ events fall in $$t$$: $$P(T_k > t) = \sum_{x = 0}^{k - 1} \frac{(\lambda t)^{x} e^{-\lambda t}}{x!}$$.
- Poisson approximation to the Binomial: allowed when $$n \ge 20$$ and $$np < 5$$; then use $$\lambda = np$$. Check both first.

### Normal (3o–p)
- $$X \sim N(\mu, \sigma^{2})$$ carries the variance. Symmetric; $$\mu$$ is the centre and the median; never integrate the pdf.
- $$Z = \frac{X - \mu}{\sigma} \sim N(0, 1)$$. Table A gives the area to the left of $$z$$.
- Upper tail: $$P(X > x) = 1 - \Phi(z)$$. Between: $$\Phi(z_2) - \Phi(z_1)$$. Symmetry: $$\Phi(-z) = 1 - \Phi(z)$$.
- Backward: find the body entry closest to the proportion (no interpolating: 0.90 is 0.8997, $$z = 1.28$$), then $$x = \mu + z\sigma$$. Two given probabilities give two equations in $$\mu$$ and $$\sigma$$.
- Useful $$z$$: 0.6745 (0.75), 1.28 (0.90), 1.645 (0.95), 1.96 (0.975), 2.326 (0.99), 2.576 (0.995).
- 68-95-99.7 rule at exactly 1, 2, 3 sd; Table A says 0.6827, 0.9545, 0.9973.
- $$aX + b \sim N(a\mu + b, a^{2}\sigma^{2})$$. Independent Normals: $$\sum a_i X_i \sim N\left(\sum a_i \mu_i, \sum a_i^{2} \sigma_i^{2}\right)$$; $$X - Y$$ still adds the variances.
- Sample of $$n$$ from $$N(\mu, \sigma^{2})$$: $$\bar{X} \sim N\left(\mu, \frac{\sigma^{2}}{n}\right)$$ and $$T = \sum X_i \sim N(n\mu, n\sigma^{2})$$; total and mean give the same $$z$$.

## Column 2 · Ch 4

### Discrete (3a–b, 3d, 3f)
- pmf: $$p(x) \ge 0$$, $$\sum p(x) = 1$$ (solve for the constant).
- cdf $$F(x) = P(X \le x) = \sum_{t \le x} p(t)$$: a step function, written for every real $$x$$. $$P(X > x) = 1 - F(x)$$, $$P(a < X \le b) = F(b) - F(a)$$.
- $$E(X) = \mu = \sum x\,p(x)$$, $$E[g(X)] = \sum g(x)\,p(x)$$.
- $$\operatorname{Var}(X) = E[(X - \mu)^{2}] = E(X^{2}) - \mu^{2}$$, $$\operatorname{SD} = \sqrt{\operatorname{Var}}$$.

### Continuous (3c, 3e–i)
- pdf: $$f(x) \ge 0$$ and $$\int_{-\infty}^{\infty} f(x)\,dx = 1$$ (solve for the constant). $$P(a \le X \le b) = \int_a^b f(x)\,dx$$; a single point has probability 0, so endpoints do not matter.
- $$F(x) = \int_{-\infty}^{x} f(t)\,dt$$ and $$f(x) = F'(x)$$. Write $$F$$ for all real $$x$$: 0 below the support, the integral on it, 1 above.
- Median: solve $$F(m) = 0.5$$. Quartiles: $$F = 0.25$$ and $$0.75$$.
- $$E(X) = \int x f(x)\,dx$$, $$E[g(X)] = \int g(x) f(x)\,dx$$, $$\operatorname{Var}(X) = E(X^{2}) - \mu^{2}$$.
- Uniform on $$[a, b]$$: $$f = \frac{1}{b - a}$$, $$F(x) = \frac{x - a}{b - a}$$, mean $$\frac{a + b}{2}$$, variance $$\frac{(b - a)^{2}}{12}$$.
- Exponential rate $$\lambda$$, $$x \ge 0$$: $$f = \lambda e^{-\lambda x}$$, $$F = 1 - e^{-\lambda x}$$, $$P(X > x) = e^{-\lambda x}$$, mean $$\frac{1}{\lambda}$$, variance $$\frac{1}{\lambda^{2}}$$, median $$\frac{\ln 2}{\lambda}$$. Integrate by parts for the mean.

### Rules for mean and variance (3j–k)
- $$E(aX + b) = aE(X) + b$$; $$\operatorname{Var}(aX + b) = a^{2}\operatorname{Var}(X)$$.
- $$E(X + Y) = E(X) + E(Y)$$ always. $$E(XY) = E(X)E(Y)$$ only under independence.
- $$\operatorname{Cov}(X, Y) = E(XY) - E(X)E(Y)$$; zero under independence.
- $$\operatorname{Var}(aX + bY) = a^{2}\operatorname{Var}(X) + b^{2}\operatorname{Var}(Y) + 2ab\operatorname{Cov}(X, Y)$$.
- Independent: $$\operatorname{Var}(X - Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$$, minus still adds.
- $$\operatorname{Var}(2X) = 4\operatorname{Var}(X)$$ but $$\operatorname{Var}(X_1 + X_2) = 2\operatorname{Var}(X)$$.
- Sample mean of $$n$$ iid: $$E(\bar{X}) = \mu$$, $$\operatorname{Var}(\bar{X}) = \frac{\sigma^{2}}{n}$$. Total: $$n\mu$$ and $$n\sigma^{2}$$.

### Max, min, functions of one variable (3l–n)
- Independent $$X_1, \dots, X_n$$: $$F_{\max}(y) = \prod F_i(y)$$ and $$F_{\min}(y) = 1 - \prod \left(1 - F_i(y)\right)$$. Differentiate for the pdf (chain rule). Say "by independence".
- Parallel system lifetime is the max; series system lifetime is the min. The min of $$n$$ independent $$\text{Exp}(\lambda)$$ is $$\text{Exp}(n\lambda)$$.
- cdf method for $$Y = g(X)$$: $$F_Y(y) = P(g(X) \le y)$$, rewrite as an event in $$X$$, use $$F_X$$, differentiate, state the new support. $$Y = X^{2}$$: $$P(-\sqrt{y} \le X \le \sqrt{y}) = F_X(\sqrt{y}) - F_X(-\sqrt{y})$$.

## Column 3 · Ch 3 and Ch 1

### Probability rules (2a, 2f–g)
- $$0 \le P(A) \le 1$$, $$P(S) = 1$$, $$A \subseteq B$$ gives $$P(A) \le P(B)$$. Equally likely: favourable over total.
- $$P(A^{c}) = 1 - P(A)$$. Disjoint: $$P(A \cup B) = P(A) + P(B)$$.
- $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$.
- Three events: $$P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$$.
- De Morgan: $$(A \cup B)^{c} = A^{c} \cap B^{c}$$ and $$(A \cap B)^{c} = A^{c} \cup B^{c}$$.

### Conditional probability and independence (2d–e, 2h)
- $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$: the given event is the denominator.
- $$P(A \cap B) = P(A \mid B)\,P(B) = P(B \mid A)\,P(A)$$.
- Independent, any one of: $$P(A \cap B) = P(A)P(B)$$, $$P(A \mid B) = P(A)$$, $$P(B \mid A) = P(B)$$.
- Disjoint events with positive probability are never independent. Complements of independent events are independent. Never assume independence unless it is stated.
- At least one of independent events: $$1 - \prod (1 - p_i)$$.

### Total probability, Bayes, reliability (2i–k)
- Partition $$B_1, \dots, B_k$$: $$P(A) = \sum_i P(A \mid B_i)\,P(B_i)$$.
- $$P(B_j \mid A) = \frac{P(A \mid B_j)\,P(B_j)}{\sum_i P(A \mid B_i)\,P(B_i)}$$. On a tree multiply along a branch and add the branches; the prior is $$P(B_j)$$, the posterior is $$P(B_j \mid A)$$.
- Series (all must work): $$R = \prod R_i$$. Parallel (fails only if all fail): $$R = 1 - \prod (1 - R_i)$$. Reduce blocks one at a time; independence must be given.

### Ch 1
- Categorical: nominal, ordinal. Numerical: discrete, continuous. Descriptive summarises the sample; inferential reaches the population.
- $$\bar{x} = \frac{1}{n}\sum x_i$$. Median: sort; odd $$n$$ the middle value, even $$n$$ the mean of the two middle values. Skew pulls the mean toward the tail; report median and IQR when skewed or with outliers, mean and $$s$$ when symmetric.
- $$s^{2} = \frac{1}{n - 1}\sum (x_i - \bar{x})^{2} = \frac{1}{n - 1}\left(\sum x_i^{2} - n\bar{x}^{2}\right)$$, $$s = \sqrt{s^{2}}$$ in the data's units, not resistant. Range is max minus min.
- $$y = a + bx$$: $$\bar{y} = a + b\bar{x}$$, $$s_y = |b|\,s_x$$, $$s_y^{2} = b^{2} s_x^{2}$$; the median shifts the same way and the IQR scales by $$|b|$$.
- Quantile $$Q(p)$$: sort, compute $$np + 0.5$$. Integer $$m$$: $$Q(p) = x_{(m)}$$. Otherwise the plain average of $$x_{(m)}$$ and $$x_{(m + 1)}$$, not a weighted one. $$Q_1$$ is $$p = 0.25$$, median $$0.5$$, $$Q_3$$ $$0.75$$.
- $$\text{IQR} = Q_3 - Q_1$$. Fences $$Q_1 - 1.5\,\text{IQR}$$ and $$Q_3 + 1.5\,\text{IQR}$$; outside is an outlier. Whiskers end at the last observation inside the fences.
- Box plot: min, $$Q_1$$, median, $$Q_3$$, max; the median's position in the box shows skew. Histogram: equal bins, empty bins count, describe shape (symmetric, right or left skewed, unimodal or bimodal), centre, spread, outliers.
