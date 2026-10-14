# STAT 251 — Lec 15 (Fri Oct 16) — Ch 6: Bernoulli and Binomial distributions

Built before class from the posted Chapter 6 deck `Lecture_15_Chapter_6_CanvasPost.pdf` (10 slides). The lecture page says the class first goes through the lecture 14 after-class slides (Normal examples, on the [lecture 14 page](_14-ch5-normal-linear-combinations-sample-mean.md)), then the Chapter 5 Normal worksheet `A5_ch5_normal_worksheet`, then these Chapter 6 slides. A mean-and-variance derivation file for Bernoulli and Binomial is promised after class. No questions are banked yet; they come with the full prep on lecture day.

## Slides, organized

### Chapter 6 learning outcomes (slide 2)

- Bernoulli experiments.
- Bernoulli and Binomial random variables.
- The Geometric distribution.
- The Poisson process and its random variables.
- The Poisson approximation to the Binomial.
- A heuristic derivation of the Poisson and Exponential distributions.

### Bernoulli random variable (slides 3 and 4)

- A Bernoulli trial has exactly two outcomes, called Success and Failure.
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

- A Binomial random variable counts the number of successes in $$n$$ independent Bernoulli trials, each with the same success probability $$p$$.
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

- Where the formula comes from: any one specific order of $$x$$ successes and $$n - x$$ failures has probability $$p^{x}(1 - p)^{n - x}$$ by independence, and there are $$\binom{n}{x}$$ such orders, so the probabilities add.

### Combinations (slide 7)

- Each different order in which $$x$$ successes can appear among $$n$$ trials is one combination.
- The count is

$$
\binom{n}{x} = \frac{n!}{x!\,(n - x)!}, \quad n! = n \times (n - 1) \times \cdots \times 2 \times 1, \quad 0! = 1
$$

- The slide's examples are $$\binom{4}{3} = 4$$ and $$\binom{5}{0} = 1$$.

### When the Binomial model applies (slide 8)

- You must be able to decide whether a Binomial model is appropriate by checking its three assumptions.
  - There are $$n$$ trials, each ending in success or failure.
  - The trials are independent of one another.
  - Every trial has the same probability of success $$p$$.
- The Binomial random variable is the number of successes in those $$n$$ trials.

### The independence assumption and the 10% condition (slide 9)

- Independence is the critical requirement for Bernoulli trials.
- Sampling without replacement from a finite population makes the trials dependent.
- The 10% condition lets you treat them as independent anyway: when the sample is no more than 10% of the population, use the Binomial model; when you select more than 10% of the population, the independence assumption fails and the Binomial model cannot be used.

### Next class (slide 10)

- Binomial examples and the Geometric distribution.
