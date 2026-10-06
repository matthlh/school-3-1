# STAT 251 — Topic Ledger

Built from the **official Learning Outcomes doc** (Dept of Statistics, rev. Dec 20 2025). The
instructor says: *"Refer to this document throughout the course to clarify the outcomes you are
expected to attain."* That makes this the exam blueprint — the chapter list is not.

Grades and next reviews live only in `ledger.md`, where the quiz scripts own them. A ledger topic starts with the
codes of the outcomes it covers (`1b–c Box plots`), so the site's Topics tab can show each outcome's grade and next
review. An outcome without a code, such as 1+, is found by its words instead.

---

## 1. Exploratory data analysis · Ch 1
| # | Outcome |
|---|---|
| 1a | Distinguish types of data |
| 1b | Interpret boxplots, histograms; mean/median/mode/variance/IQR *(so far: freq table, pie, bar, dot, stem-leaf, histogram, box plot, mean, median, range, variance, SD, percentiles, quartiles, IQR)* |
| 1c | Choose the right summary method for a data set *(lec 4: median and IQR versus mean and s, box plot versus histogram)* |
| 1d | Identify features describing a distribution *(lec 3: mound type, shape, centre, spread, outliers; lec 4: the $$1.5 \times \text{IQR}$$ outlier rule)* |
| 1e | Use software for data summary / EDA |
| 1+ | Descriptive vs. inferential statistics *(lecture-added; not in the LO doc)* |

## 2. Probability basics · Ch 3
| # | Outcome |
|---|---|
| 2a | Rudimentary mathematical properties of probability *(lec 5: outcome probabilities lie in [0, 1] and sum to 1, countable additivity, a subset has the smaller probability)* |
| 2b | Describe the sample space *(lec 5: coin flips, accident counts, two component lifetimes; discrete, continuous, bivariate)* |
| 2c | Probability as long-run relative frequency *(lec 6: the proportion-of-heads graph, long run versus short run)* |
| 2d | Independent vs. mutually exclusive vs. complementary *(lec 5: disjoint and complementary; lec 6: independence, three equivalent tests)* |
| 2e | Judge whether an independence assumption is justifiable *(lec 6: never assume it unless stated or physically certain; disjoint events are never independent)* |
| 2f | Probabilities of single, complementary, union, intersection *(lec 5: complement rule, general addition rule, the three-event rule as an exercise)* |
| 2g | Venn diagrams *(lec 5: complement, intersection, union, disjoint pictures)* |
| 2h | Independence + conditional probability to solve problems *(lec 6: definition, multiplication rule, the switches example)* |
| 2i | Posterior probabilities — tree diagrams / Bayes *(WeBWorK 2: which plant the defective item came from, which factory, the iClicker left in the 5th class; lec 7 Sep 23 covers it)* |
| 2j | Law of total probability *(WeBWorK 2: the marginal P(C) read off a two-stage tree; lec 7 Sep 23)* |
| 2k | **Reliability of series/parallel circuits** *(WeBWorK 2: parallel block in series with a third component, and the set-notation version of the same circuit; lec 7: the four-component system, parallel block times series block)* |

## 3. Random variables — discrete & continuous · Ch 4–6
| # | Outcome |
|---|---|
| 3a | Identify discrete vs. continuous *(lec 8: finite set or sequence of values versus an interval; P at a point is 0 for continuous)* |
| 3b | Probabilities over finite discrete sets *(lec 8: pmf properties, find k, probability statements)* |
| 3c | Continuous probabilities using calculus *(lec 9: probability as area under the pdf, endpoints do not matter)* |
| 3d | Mean/variance of discrete RVs (Bernoulli, Binomial, Geometric, Poisson) *(lec 8: general discrete mean and variance, the shortcut; named distributions later)* |
| 3e | Find constants making a pdf legitimate *(lec 9: total area 1 gives the constant)* |
| 3f | pdf ↔ cdf both directions *(lec 8: discrete cdf as a step function; lec 9: integrate f to get F, differentiate F to get f)* |
| 3g | Mean/var/median/IQR of continuous RVs (integration by parts) *(lec 9 video: E and Var by integration, median and quartiles from F, Example 7)* |
| 3h | Uniform distribution characteristics *(lec 9 video: mean $$\frac{a + b}{2}$$, variance $$\frac{(b - a)^2}{12}$$, derived as an exercise)* |
| 3i | Exponential distribution characteristics *(lec 9 video: mean $$\frac{1}{\lambda}$$, variance $$\frac{1}{\lambda^2}$$, by parts)* |
| 3j | Expectation & variance operators on linear combinations *(lec 10: E(aX + b), the mean of a sum, Var(aX + bY + c) with the covariance term, proof of the shortcut)* |
| 3k | Var of sum/average vs. var of a multiple *(lec 10: variance of a sum of independent variables, $$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$$, $$\operatorname{Var}(X_1 + X_2)$$ versus $$\operatorname{Var}(2X_1)$$)* |
| 3l | pdf/cdf of functions of one RV (simple polynomials) |
| 3m | pdf/cdf of **min/max** of independent RVs, incl. non-identical *(lec 10: cdf of the max as a product of cdfs, pdf by the chain rule)* |
| 3n | **Min/max lifetimes of series/parallel circuits** *(lec 10: a parallel system's lifetime is the max, a series system's is the min)* |
| 3o | Normal properties, incl. preservation under linear transformation |
| 3p | Normal: probability, percentile, $$\mu$$ given $$\sigma^2$$ (and vice versa), $$\mu$$ and $$\sigma^2$$ from two probabilities |
| 3q–s | Binomial — recognise, characteristics, compute |
| 3t–v | Geometric — recognise, characteristics (incl. **return period**), compute |
| 3w–y | Poisson **process** — recognise, counts in an interval, **wait time between events** |
| 3z–aa | Poisson distribution — characteristics, compute |
| 3bb | Poisson approximation to Binomial |
| 3cc | **Pick the right model for a situation; combine models** |

## 4. Normal approximation · Ch 7
| # | Outcome |
|---|---|
| 4a | Binomial → Poisson approximation |
| 4b | Binomial → Normal approximation |
| 4c | Poisson → Normal approximation |
| 4d | **Continuity correction** — why it matters |
| 4e | CLT applied to sums and averages |

## 5. Foundations of inference · Ch 8
| # | Outcome |
|---|---|
| 5a | Sample statistic vs. population parameter |
| 5b–d | Unbiasedness; sample mean and sample variance as unbiased estimators |
| 5e | Interpret a CI and a confidence level |
| 5f | What determines CI width |
| 5g | Components of a hypothesis test |
| 5h | Use normality / CLT for estimation and testing |
| 5i | p-value approach **and** critical value approach |
| 5j | Relationship between CIs and hypothesis tests |
| 5k | t-distribution family and its link to the Normal |
| 5l–m | Type I and Type II errors, in context |
| 5n | Interpret **and calculate** power |
| 5o | Effect of n, effect size, α on power and β |

## 6. Inference on Normal means · Ch 8
| # | Outcome |
|---|---|
| 6a | Definition of the t statistic |
| 6b | Inference for one mean, $$\sigma^2$$ known and unknown; CIs + 1/2-sided tests |
| 6c | Difference of two means, equal variances assumed |

## 7. One-way ANOVA · Ch 10
| # | Outcome |
|---|---|
| 7a | When ANOVA is / isn't appropriate |
| 7b | Modeling assumptions |
| 7c | Null and alternative hypotheses |
| 7d | Partition of total SS into within / between |
| 7e | Degrees of freedom for each SS |
| 7f | Interpret an ANOVA table |
| 7g | Perform the F test |
| 7h | Estimate within-group variance |
| 7i | Read software ANOVA output |

## 8. Bivariate data & simple linear regression · Ch 2, 11
| # | Outcome |
|---|---|
| 8a | Spot a relationship from a scatterplot |
| 8b–c | Properties of sample correlation; interpret it |
| 8d | Identify the response variable |
| 8e | Least squares estimation |
| 8f | Fit a linear model via software |
| 8g | Interpret parameter estimates |
| 8h | Evaluate fit via residuals |
| 8i | Inference for the slope — CIs and tests |
| 8j | Read software regression output |

---

## Notes on where marks get lost
- **Circuits appear twice** (2k reliability, 3n min/max lifetimes) and are the least
  "textbook-feeling" items on the list. Easy to skip in review, easy to examine.
- **3cc is the hard one** — choosing *which* distribution fits a situation. That's exactly what
  interleaved practice trains and blocked practice doesn't. Mixed-model drills, always.
- **5n calculate power** and **5o** — students usually learn to *describe* power and never
  practise computing it.
- Several outcomes say "using software" (1e, 7i, 8f, 8j) — those are the labs. Don't treat lab
  work as separate from exam prep.

## Look-alikes

Topics that are easy to mix up. When a quiz picks a question from one, a question from its look-alike comes right after it.

| Topic | Look-alike | Why they get confused |
|---|---|---|
| 3a–b Random variables and the pmf | 3f Discrete cdf | The pmf gives the probability of one exact value, while the cdf adds up the probabilities of every value up to x, and the two share a letter, lower-case f and capital F. |
| 3c Continuous random variables and the pdf | 3f Continuous cdf in both directions | A pdf value is a density that can exceed 1 and only areas under it are probabilities, while a cdf value is itself a probability, and each is found from the other by integrating or differentiating. |
| 3a–b Random variables and the pmf | 3c Continuous random variables and the pdf | Both are written f, but a pmf value is the probability of that value, while a pdf value is not a probability and any single point has probability 0. |
| 2d–e Independence | 2g Events as sets and Venn diagrams | Disjoint events cannot happen together, while independent events overlap by exactly the product of their probabilities, so two disjoint events with positive probability are never independent. |
| 2h Conditional probability and the multiplication rule | 2i Bayes' theorem and the law of total probability | Both divide the same intersection, but the given event sets the denominator, so the chance of A given B is not the chance of B given A, and Bayes' theorem turns one into the other. |
| 2k Reliability of series and parallel systems | 3m–n Maximum and minimum of independent random variables | The same circuits come back as lifetimes: a series system needs every part, so its reliability is a product and its lifetime is the minimum, while a parallel system fails only when every part fails and its lifetime is the maximum. |
| 3j Rules for the mean and variance | 3j–k Covariance, sums and the sample mean | Doubling one value multiplies its variance by 4, while adding two independent values with that same variance only doubles it, so the two answers get swapped. |
| 1b Percentiles, quartiles and the IQR | 1b–c Box plots | The fences come from the quartiles and the IQR, but a whisker stops at the last observation inside its fence, not at the fence and not always at the minimum or maximum. |
| 3d Mean and variance of a discrete random variable | 1b Mean and median | A random variable's mean weights each possible value by its probability, while the Chapter 1 sample mean adds up the data and divides by n, and both are called the mean. |
