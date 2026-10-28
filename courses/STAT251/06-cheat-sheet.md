# STAT 251 — Midterm cheat sheet (Fri Oct 30, 08:00)

One letter-size sheet, one side, handwritten (tablet-written and printed is fine; typed or pasted slides are not; two matching sheets both get taken). Covers Ch 1, 3, 4, 5, 6. The exam is multiple choice and long, so the sheet is built for speed: a router that names the problem type from the question's wording, then one recipe per type with each formula written beside the step that uses it and the trap that loses the mark. Write the two habits and the router in a strip across the top, then three columns: Ch 1 and Ch 3 on the left, Ch 4 in the middle, Ch 5 and Ch 6 on the right. Writing it is the studying: write each recipe from memory first, then fix it against this page. If you run short of room, drop the Trap lines of recipes 1 and 2 first, then recipe 10, then the Ch 1 recall items in recipe 1.

The two habits: write "by independence" beside every product of probabilities, and write a cdf for every real $$x$$, the 0 piece and the 1 piece included.

## Top strip · Which problem is this?

The hardest outcome on the list is picking the model (3cc), and this table is that drill. Read the question, find the row, go to the recipe.

| The question has | It is | Recipe |
|---|---|---|
| A list of numbers; mean, median, quartiles, box plot, outliers | Ch 1 summary | 1 |
| Percentages of one group; "or", "and", "neither", "at least one of A and B" | Union and complement | 2 |
| "Given that"; a two-way table; "are they independent" | Conditional probability | 3 |
| Two stages; "came from which"; a test result; a rate per supplier | Total probability and Bayes | 4 |
| Components that work or fail; series and parallel | Reliability | 5 |
| A table of values and probabilities; "find $$k$$" | Discrete random variable | 6 |
| A formula $$f(x)$$ on an interval; "find $$c$$"; median of a density | Continuous random variable | 7 |
| Mean and variance of a sum, difference or average; $$2X$$ against $$X_1 + X_2$$ | Combination rules | 8 |
| The largest or smallest of several; a parallel or series lifetime; "the later of the two" | Max and min | 9 |
| $$Y = g(X)$$; the pdf of a function of $$X$$ | cdf method | 10 |
| A mean and sd; bell-shaped; Normal; "top 10%"; a total of $$n$$ items | Normal | 11 |
| A fixed number of trials; count the successes | Binomial | 12 |
| Trials until the first success; return period | Geometric | 13 |
| Events per unit of time or area, no $$n$$; "time until", "longer than" | Poisson count and wait | 14 |
| Large $$n$$, tiny $$p$$; "approximate" | Poisson approximation | 15 |
| A probability from one model is the $$p$$ of another | Combine models | 16 |

## Column 1 · Ch 1 and Ch 3

### 1 · Summarise a data set (1a to 1d)
1. Sort the data. Name the type: categorical (nominal, ordinal) or numerical (discrete, continuous).
2. Mean $$\bar{x} = \frac{1}{n}\sum x_i$$. Median: odd $$n$$ takes the middle value, even $$n$$ the mean of the two middle values.
3. Quantile $$Q(p)$$: compute $$np + 0.5$$. Integer $$m$$ gives $$Q(p) = x_{(m)}$$; otherwise the plain average of $$x_{(m)}$$ and $$x_{(m + 1)}$$. $$Q_1$$ is $$p = 0.25$$, $$Q_3$$ is $$p = 0.75$$.
4. $$\text{IQR} = Q_3 - Q_1$$. Fences $$Q_1 - 1.5\,\text{IQR}$$ and $$Q_3 + 1.5\,\text{IQR}$$; outside is an outlier. A whisker ends at the last observation inside its fence, not at the fence.
5. Variance $$s^{2} = \frac{1}{n - 1}\left(\sum x_i^{2} - n\bar{x}^{2}\right)$$, $$s = \sqrt{s^{2}}$$ in the data's units. Range is max minus min.
6. Shape: symmetric, right skewed (tail to the right, mean above the median), left skewed; unimodal or bimodal; outliers. Skewed or outliers: report the median and IQR. Symmetric: the mean and $$s$$.
7. $$y = a + bx$$: $$\bar{y} = a + b\bar{x}$$, the median shifts the same way, $$s_y = |b|\,s_x$$, the IQR scales by $$|b|$$, $$s_y^{2} = b^{2}s_x^{2}$$.

Trap: R interpolates quantiles and the course averages them, so the IQRs can differ. A histogram has equal bins and empty bins still count. Descriptive statistics summarise the sample; inferential statistics reach the population.

### 2 · Union, complement, at least one (2a, 2f, 2g)
1. Write every given number as a probability statement. Draw the Venn diagram when there are three events.
2. $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$. Disjoint events have no overlap, so the last term drops.
3. Three events: add the three singles, subtract the three pairs, add the triple, $$P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$$.
4. None: $$1 - P(\text{union})$$. Only $$A$$: $$P(A) - P(A \cap B) - P(A \cap C) + P(A \cap B \cap C)$$. Exactly one: the singles minus twice the pairs plus three times the triple.
5. De Morgan: $$(A \cup B)^{c} = A^{c} \cap B^{c}$$ and $$(A \cap B)^{c} = A^{c} \cup B^{c}$$.

Trap: "or" is the union, "both" is the intersection, "neither" is the complement of the union. Equally likely outcomes: favourable over total. $$A \subseteq B$$ gives $$P(A) \le P(B)$$.

### 3 · Conditional probability and independence (2d, 2e, 2h)
1. Counts given: build the two-way table with row and column totals. The given event picks the row or column, and the answer is the cell over that total.
2. $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$. Multiplication rule: $$P(A \cap B) = P(A \mid B)\,P(B) = P(B \mid A)\,P(A)$$.
3. Independence, any one test with the numbers on both sides: $$P(A \cap B) = P(A)P(B)$$, or $$P(A \mid B) = P(A)$$, or $$P(B \mid A) = P(B)$$.
4. Independent events multiply, "by independence". At least one of independent events: $$1 - \prod (1 - p_i)$$. Exactly one: add the ways, each way a product.

Trap: disjoint events with positive probability are never independent. Complements of independent events are independent. Never assume independence unless it is stated or physically certain. $$P(A \mid B)$$ is not $$P(B \mid A)$$.

### 4 · Two stages, total probability and Bayes (2i, 2j)
1. Name the partition $$B_1, \dots, B_k$$ (the stage you do not see) and the observed event $$A$$. Write the priors $$P(B_i)$$ and the branch rates $$P(A \mid B_i)$$, each with its complement.
2. Tree: multiply along a branch, $$P(A \cap B_i) = P(A \mid B_i)\,P(B_i)$$.
3. Total probability: add the branches that end in $$A$$, $$P(A) = \sum_i P(A \mid B_i)\,P(B_i)$$.
4. Reverse: $$P(B_j \mid A) = \frac{P(A \mid B_j)\,P(B_j)}{P(A)}$$. The posteriors over all $$j$$ add to 1; check it.

Trap: a positive test for a rare condition gives a small posterior because the false positives from the large healthy group swamp the true positives. "Most likely source" is the largest posterior, not the largest prior or the worst rate.

### 5 · Reliability of a circuit (2k)
1. Independence must be given; write "by independence".
2. Series (all must work): $$R = \prod R_i$$. Parallel (fails only if all fail): $$R = 1 - \prod (1 - R_i)$$.
3. Reduce one block at a time to a single number, then combine the blocks the same way.
4. System fails: $$1 - R$$. Given the system works: recipe 3, with the intersection worked through the block that holds the component.

Trap: the same circuits come back as lifetimes in recipe 9.

## Column 2 · Ch 4

### 6 · Discrete random variable from a pmf (3a, 3b, 3d, 3f)
1. pmf: $$p(x) \ge 0$$ and $$\sum p(x) = 1$$; solve for $$k$$.
2. cdf $$F(x) = P(X \le x) = \sum_{t \le x} p(t)$$: a step function written for every real $$x$$, 0 below the first value, 1 from the last value on, a jump at each value.
3. From $$F$$: $$P(X > a) = 1 - F(a)$$, $$P(a < X \le b) = F(b) - F(a)$$, $$P(X \ge a) = P(X > a) + p(a)$$. "At least $$a$$" includes $$a$$; "more than $$a$$" does not.
4. $$E(X) = \sum x\,p(x)$$ and $$E[g(X)] = \sum g(x)\,p(x)$$.
5. $$\operatorname{Var}(X) = E(X^{2}) - [E(X)]^{2}$$, $$\operatorname{SD} = \sqrt{\operatorname{Var}}$$.

Trap: $$E[g(X)]$$ is not $$g(E(X))$$. A random variable's mean weights each value by its probability; the Ch 1 mean divides by $$n$$. When the hit rate changes after a hit, the trials are dependent: build the pmf from a tree, not a Binomial.

### 7 · Continuous random variable from a pdf (3c, 3e to 3i)
1. pdf: $$f(x) \ge 0$$ and the integral over the support is 1; solve for $$c$$. A pdf value can exceed 1, it is a density, not a probability.
2. cdf: $$F(x) = \int_{-\infty}^{x} f(t)\,dt$$, written in three pieces: 0 below the support, the integral on it, 1 above. Back the other way: $$f(x) = F'(x)$$.
3. Probabilities: $$P(a < X < b) = F(b) - F(a)$$ and $$P(X > a) = 1 - F(a)$$. Endpoints do not matter; a single point has probability 0. If a survival function $$P(X > x)$$ is given, $$F = 1 - P(X > x)$$.
4. Median: solve $$F(m) = 0.5$$. Quartiles: $$F = 0.25$$ and $$F = 0.75$$. Percentile $$p$$: $$F(x_p) = p$$.
5. $$E(X) = \int x f(x)\,dx$$, $$E[g(X)] = \int g(x) f(x)\,dx$$, $$\operatorname{Var}(X) = E(X^{2}) - \mu^{2}$$.
6. Uniform on $$[a, b]$$: $$f = \frac{1}{b - a}$$, $$F(x) = \frac{x - a}{b - a}$$, mean $$\frac{a + b}{2}$$, variance $$\frac{(b - a)^{2}}{12}$$.
7. Exponential, rate $$\lambda$$, $$x \ge 0$$: $$f = \lambda e^{-\lambda x}$$, $$F = 1 - e^{-\lambda x}$$, $$P(X > x) = e^{-\lambda x}$$, mean $$\frac{1}{\lambda}$$, variance $$\frac{1}{\lambda^{2}}$$, median $$\frac{\ln 2}{\lambda}$$.

Trap: the exponential mean is by parts, $$\int x\,\lambda e^{-\lambda x}\,dx$$ with $$u = x$$. A stated mean of 4 minutes means $$\lambda = 0.25$$ per minute.

### 8 · Mean and variance of a combination (3j, 3k)
1. $$E(aX + bY + c) = aE(X) + bE(Y) + c$$, always.
2. $$\operatorname{Var}(aX + bY + c) = a^{2}\operatorname{Var}(X) + b^{2}\operatorname{Var}(Y) + 2ab\operatorname{Cov}(X, Y)$$. The constant drops. Independent: the covariance is 0.
3. $$\operatorname{Cov}(X, Y) = E(XY) - E(X)E(Y)$$, and $$E(XY) = E(X)E(Y)$$ only under independence.
4. Difference: $$\operatorname{Var}(X - Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) - 2\operatorname{Cov}(X, Y)$$; with independence the variances still add.
5. Sample of $$n$$ iid: the total has mean $$n\mu$$ and variance $$n\sigma^{2}$$; the average $$\bar{X}$$ has mean $$\mu$$, variance $$\frac{\sigma^{2}}{n}$$, SD $$\frac{\sigma}{\sqrt{n}}$$.

Trap: $$\operatorname{Var}(2X) = 4\operatorname{Var}(X)$$ but $$\operatorname{Var}(X_1 + X_2) = 2\operatorname{Var}(X)$$. SDs never add: add the variances, then root. A Binomial count is a sum of $$n$$ Bernoullis, so its variance is $$np(1 - p)$$ and is not divided by $$n$$.

### 9 · Largest or smallest of several (3m, 3n)
1. Get $$F_X$$ for one variable by recipe 7. Independence must be given.
2. Max: $$F_{\max}(y) = P(\text{all} \le y) = \prod F_i(y)$$, "by independence". Identical parts: $$[F(y)]^{n}$$.
3. Min: $$F_{\min}(y) = 1 - P(\text{all} > y) = 1 - \prod \left(1 - F_i(y)\right)$$.
4. pdf by differentiating with the chain rule, $$f_{\max}(y) = n[F(y)]^{n - 1} f(y)$$; state the support; then $$E$$ by integrating $$y\,f_{\max}(y)$$.
5. A parallel system's lifetime is the max; a series system's is the min. The min of $$n$$ independent $$\text{Exp}(\lambda)$$ is $$\text{Exp}(n\lambda)$$.

Trap: two different uniforms give a piecewise cdf; write a piece for every interval where the $$F_i$$ differ. "The later of the two finishes after 36" is $$P(\max > 36) = 1 - F_1(36)\,F_2(36)$$.

### 10 · Function of one variable, the cdf method (3l)
1. $$F_Y(y) = P(Y \le y) = P(g(X) \le y)$$.
2. Rewrite the event in $$X$$: $$Y = X^{3}$$ gives $$X \le y^{1/3}$$; $$Y = X^{2}$$ gives $$-\sqrt{y} \le X \le \sqrt{y}$$, both roots.
3. Substitute $$F_X$$, for example $$F_Y(y) = F_X(\sqrt{y}) - F_X(-\sqrt{y})$$.
4. Differentiate for $$f_Y$$ (chain rule) and state the new support, which is $$g$$ applied to the old one.

Trap: the pdf of $$Y$$ is not constant even when $$X$$ is uniform. Check that $$f_Y$$ integrates to 1.

## Column 3 · Ch 5 and Ch 6

### 11 · Normal (3o, 3p)
1. Write $$X \sim N(\mu, \sigma^{2})$$; the second number is the variance, so root it for $$\sigma$$.
2. Forward: $$z = \frac{x - \mu}{\sigma}$$ to two decimals. Table A gives the area to the left, $$\Phi(z)$$. Upper tail $$1 - \Phi(z)$$. Between: $$\Phi(z_2) - \Phi(z_1)$$. Symmetry: $$\Phi(-z) = 1 - \Phi(z)$$.
3. Backward: turn the question into an area to the left (the top 10% means 0.90 to the left). Find the closest body entry, no interpolating (0.90 is 0.8997, so $$z = 1.28$$). Then $$x = \mu + z\sigma$$.
4. Two probabilities given: two equations $$x_i = \mu + z_i\sigma$$, solve for $$\mu$$ and $$\sigma$$.
5. Independent Normals combine: $$\sum a_i X_i \sim N\left(\sum a_i\mu_i, \sum a_i^{2}\sigma_i^{2}\right)$$, recipe 8 for the numbers and Normal for the shape. $$X - Y$$ adds the variances. "X lasts longer than Y" is $$P(X - Y > 0)$$; "more than twice as long" is $$P(Y - 2X > 0)$$.
6. Sample of $$n$$: $$\bar{X} \sim N\left(\mu, \frac{\sigma^{2}}{n}\right)$$ and the total $$T \sim N(n\mu, n\sigma^{2})$$; the total and the mean give the same $$z$$.
7. $$z$$ values: 0.6745 (0.75), 1.28 (0.90), 1.645 (0.95), 1.96 (0.975), 2.326 (0.99), 2.576 (0.995). The 68-95-99.7 rule sits at 1, 2, 3 sd.

Trap: never integrate the Normal pdf. Only Normal parts give a Normal sum you can look up; recipe 8 alone gives two numbers and no probability.

### 12 · Binomial (3q to 3s)
1. Check: fixed $$n$$, independent trials, one $$p$$. Sampling without replacement is fine when $$n \le 0.10N$$. Write $$X \sim \text{Bin}(n, p)$$.
2. $$P(X = x) = \binom{n}{x} p^{x} (1 - p)^{n - x}$$ for $$x = 0, 1, \dots, n$$.
3. Tail language: fewer than $$k$$ is $$P(X \le k - 1)$$; at most $$k$$ is $$P(X \le k)$$; at least $$k$$ is $$1 - P(X \le k - 1)$$; more than $$k$$ is $$1 - P(X \le k)$$; at least one is $$1 - (1 - p)^{n}$$. Sum the shorter side.
4. $$E(X) = np$$, $$\operatorname{Var}(X) = np(1 - p)$$, $$\operatorname{SD}(X) = \sqrt{np(1 - p)}$$.
5. Bernoulli is $$n = 1$$: $$p(x) = p^{x}(1 - p)^{1 - x}$$, mean $$p$$, variance $$p(1 - p)$$.

Trap: a $$p$$ that changes between trials, or trials that affect each other, is not Binomial. Passing "at least half" of 4 questions is $$P(X \ge 2)$$.

### 13 · Geometric (3t to 3v)
1. $$X$$ counts the trials up to and including the first success, $$x = 1, 2, \dots$$ with no upper limit.
2. $$P(X = x) = (1 - p)^{x - 1} p$$: $$x - 1$$ failures, then a success.
3. $$P(X > x) = (1 - p)^{x}$$ (the first $$x$$ trials all fail), so $$F(x) = 1 - (1 - p)^{x}$$.
4. $$E(X) = \frac{1}{p}$$ is the return period; $$\operatorname{Var}(X) = \frac{1 - p}{p^{2}}$$.

Trap: "at least 3 trials" is $$P(X \ge 3) = P(X > 2) = (1 - p)^{2}$$.

### 14 · Poisson count and the wait (3w to 3aa)
1. Process check: counts on non-overlapping intervals are independent; the mean count is proportional to length; one constant rate; no two events at one instant.
2. Convert the interval to the rate's unit; then the mean count for length $$t$$ is $$\lambda t$$ and $$X_t \sim \text{Poisson}(\lambda t)$$.
3. $$P(X_t = x) = \frac{(\lambda t)^{x} e^{-\lambda t}}{x!}$$ for $$x = 0, 1, 2, \dots$$; $$E(X_t) = \operatorname{Var}(X_t) = \lambda t$$. "More than 6" is $$1 - P(X_t \le 6)$$, the sum from 0 to 6.
4. Wait to the next event $$T \sim \text{Exp}(\lambda)$$: $$P(T > t) = P(X_t = 0) = e^{-\lambda t}$$, $$P(T \le t) = 1 - e^{-\lambda t}$$, mean $$\frac{1}{\lambda}$$.
5. Wait for the $$k$$th event: $$P(T_k > t) = P(X_t \le k - 1) = \sum_{x = 0}^{k - 1} \frac{(\lambda t)^{x} e^{-\lambda t}}{x!}$$.

Trap: the Poisson mean is $$\lambda$$ per unit and the exponential mean is $$\frac{1}{\lambda}$$; a stated mean wait of 4 minutes means $$\lambda = 0.25$$ per minute. The count is discrete, the wait is continuous. A histogram bar's proportion is its density times its width.

### 15 · Poisson approximation to the Binomial (3bb)
1. Check both and write the check: $$n \ge 20$$ and $$np < 5$$.
2. $$\lambda = np$$, then recipe 14 step 3 with $$\lambda$$ in place of $$\lambda t$$.
3. Asked to compare: compute the exact Binomial too and report the difference.

Trap: a real Poisson process has a rate and no $$n$$, so never check $$n \ge 20$$ there and never write $$\lambda = np$$ there.

### 16 · Combine models (3cc)
1. The inner model gives one probability $$p$$: an exponential $$P(T < 2) = 1 - e^{-0.5}$$ when the mean is 4, or a Poisson $$P(X_t = 0) = e^{-\lambda t}$$.
2. The outer model counts: a fixed number of days or stretches with that $$p$$ is Binomial (recipe 12); stretches until the first hit is Geometric (recipe 13) with mean $$\frac{1}{p}$$.
3. Say why the trials are independent: non-overlapping intervals, or separate days.
