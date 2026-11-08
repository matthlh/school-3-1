# STAT 251 — Lec 15 (Fri Oct 16) — Ch 6: Bernoulli and Binomial distributions

The Chapter 6 deck is `Lecture_15_Chapter_6_CanvasPost.pdf` (10 slides). The Canvas lecture page lists the after-class Normal examples from [lecture 14](14-ch5-normal-linear-combinations-sample-mean.md), then `A5_ch5_normal_worksheet`, then the Chapter 6 slides. A separate handwritten file covers Bernoulli and Binomial mean and variance. The derivation below starts from the Chapter 4 definitions. The [question bank](../02-questions.md) lists this lesson under "Lec 15".

## Bernoulli trials and Binomial counts

### Chapter 6 learning outcomes (slide 2)

- Bernoulli experiments.
- Bernoulli and Binomial random variables.
- The Geometric distribution.
- The Poisson process and its random variables.
- The Poisson approximation to the Binomial.
- A heuristic derivation of the Poisson and Exponential distributions.

### Bernoulli random variable (slides 3 and 4)

- A **Bernoulli trial** has exactly two outcomes, called Success and Failure.
- The random variable takes the value 1 on a Success and 0 on a Failure.
- The probability of Success is $$p$$ and the probability of Failure is $$1 - p$$.
- Written $$X \sim \text{Bernoulli}(p)$$, the pmf is

$$
P(X = x) = p^{x}(1 - p)^{1 - x}, \quad x = 0, 1
$$

- Its mean and variance are

$$
\begin{aligned}
E(X) &= p \\
\operatorname{Var}(X) &= p(1 - p)
\end{aligned}
$$

### Binomial distribution (slides 5 and 6)

- A **Binomial** random variable counts the number of successes in $$n$$ independent Bernoulli trials, each with the same success probability $$p$$.
- Written $$X \sim \text{Bin}(n, p)$$, the pmf is

$$
P(X = x) = \binom{n}{x} p^{x}(1 - p)^{n - x}, \quad x = 0, 1, \ldots, n
$$

- Its mean and variance are

$$
\begin{aligned}
E(X) &= np \\
\operatorname{Var}(X) &= np(1 - p)
\end{aligned}
$$

1. Fix an order of $$x$$ successes and $$n - x$$ failures. By independence, its probability is $$p^{x}(1 - p)^{n - x}$$.
2. Count the $$\binom{n}{x}$$ distinct orders.
3. Add their probabilities. Every order has the same probability.

### Combinations (slide 7)

- Each different order in which $$x$$ successes can appear among $$n$$ trials is one combination.
- The count is

$$
\binom{n}{x} = \frac{n!}{x!\,(n - x)!}, \quad n! = n \times (n - 1) \times \cdots \times 2 \times 1, \quad 0! = 1
$$

- The slide's examples are $$\binom{4}{3} = 4$$ and $$\binom{5}{0} = 1$$.

## Checking the model

### When the Binomial model applies (slide 8)

- You must be able to decide whether a Binomial model is appropriate by checking its three assumptions.
  - There are $$n$$ trials, each ending in success or failure.
  - The trials are independent of one another.
  - Every trial has the same probability of success $$p$$.
- The Binomial random variable is the number of successes in those $$n$$ trials.

### The independence assumption and the 10% condition (slide 9)

- Independence is the critical requirement for Bernoulli trials.
- Sampling without replacement from a finite population makes the trials dependent.
- The **10% condition** lets you treat them as independent anyway: when the sample is no more than 10% of the population, use the Binomial model; when you select more than 10% of the population, the independence assumption fails and the Binomial model cannot be used.

### Deriving the mean and variance from the definitions

- For one Bernoulli trial, the mean and the variance come straight from the Chapter 4 definitions.

$$
\begin{aligned}
E(X) &= 0 \times (1 - p) + 1 \times p \\
&= p \\
E(X^2) &= 0^2 (1 - p) + 1^2 p \\
&= p \\
\operatorname{Var}(X) &= E(X^2) - [E(X)]^2 \\
&= p - p^2 \\
&= p(1 - p)
\end{aligned}
$$

- A Binomial count is the sum of $$n$$ independent Bernoulli variables, $$X = X_1 + X_2 + \cdots + X_n$$.
- Means always add, so $$E(X) = np$$.
- Variances add when the parts are independent, so $$\operatorname{Var}(X) = np(1 - p)$$.
- Both are the Chapter 4 rules for a sum with every coefficient equal to 1, so there is nothing new to memorise beyond the Bernoulli line.

### Next class (slide 10)

- Binomial examples and the Geometric distribution.

## Clarifications

- The Bernoulli distribution is the Binomial with $$n = 1$$, so every Binomial fact reduces to the Bernoulli one when you set $$n = 1$$.
- The 10% condition is a rule of thumb, not a theorem. With a small sample from a big population each pick barely changes the makeup of what is left, so the trials are close enough to independent and $$p$$ close enough to constant for the Binomial to be a good model.
- The deck says the Binomial "cannot be used" past 10%. On an exam, write the check as a fraction, the sample over the population, and say which side of 10% it falls on before you name the model.
