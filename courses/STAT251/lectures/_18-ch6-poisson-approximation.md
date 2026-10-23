# STAT 251 — Lec 18 (Fri Oct 23) — Ch 6: The Poisson distribution, the Poisson process and the Poisson approximation

Prepared 2026-10-23 from the after-class deck `Lecture_18_Chapter_6_CanvasPost_AL.pdf` (17 slides with solutions). The recording was not posted when this page was written. Questions: 9 in [the bank](../02-questions.md) under "Lec 18" (7 short, 2 long problems).

## Slides, organized

### The Poisson distribution (slides 3 and 4)

- The Poisson is a discrete distribution for the number of events in a fixed interval of time or space, when events happen independently at a known constant rate.
- Written $$X \sim \text{Poisson}(\lambda)$$ with rate $$\lambda > 0$$:

$$
P(X = x) = \frac{\lambda^x e^{-\lambda}}{x!}, \quad x = 0, 1, 2, \ldots
$$

- It is especially good at modelling rare events.
- It is a valid pmf: every term is positive because $$\lambda > 0$$, and the terms add to 1 by the series for $$e^{\lambda}$$:

$$
\begin{aligned}
\sum_{x = 0}^{\infty} \frac{\lambda^x e^{-\lambda}}{x!} &= e^{-\lambda}\sum_{x = 0}^{\infty}\frac{\lambda^x}{x!} \\
&= e^{-\lambda}e^{\lambda} = 1
\end{aligned}
$$

### Mean and variance (slide 5)

- $$E(X) = \lambda$$ and $$\operatorname{Var}(X) = \lambda$$: the mean and the variance are the same number.
- The deck leaves the derivation as an exercise.

### The Poisson process (slide 6)

- Four properties make a count a Poisson process.
  - Counts on intervals that do not overlap are independent.
  - The number of events in an interval is proportional to the length of the interval.
  - The probability of an event in an interval of a given length does not change from one interval to another.
  - Two events cannot happen at the same instant.
- The deck's examples are machine failures in a month, typing errors on a page and phone calls to a switchboard in 30 minutes.

### Waiting times are exponential (slide 7)

- If the count in each unit interval is $$\text{Poisson}(\lambda)$$, the time $$T$$ between two events, or until the first event, is continuous and exponential:

$$
\begin{aligned}
f(t) &= \lambda e^{-\lambda t}, \quad t \ge 0 \\
F(t) &= 1 - e^{-\lambda t} \\
E(T) &= \frac{1}{\lambda} \\
\operatorname{Var}(T) &= \frac{1}{\lambda^2}
\end{aligned}
$$

### Example 4: calls to a switchboard (slides 8 and 9)

- Calls arrive at 3 per minute; $$X_t$$ is the number in $$t$$ minutes, so $$X_t \sim \text{Poisson}(\lambda t)$$ and $$X_5 \sim \text{Poisson}(15)$$.
- More than 3 calls in 5 minutes:

$$
\begin{aligned}
P(X_5 > 3) &= 1 - P(X_5 \le 3) \\
&= 1 - e^{-15}\left(1 + 15 + \frac{15^2}{2} + \frac{15^3}{6}\right) \\
&= 0.9997
\end{aligned}
$$

### The Poisson approximation to the Binomial (slide 10)

- If $$X \sim \text{Bin}(n, p)$$ with $$n$$ large ($$n \ge 20$$) and $$p$$ small ($$np < 5$$), then $$X$$ is approximately $$\text{Poisson}(np)$$.

### Example 5: defective output (slides 11 to 13)

- 1% of a machine's output is defective; in a sample of 100, find the probability that more than 3 are defective.
- Exact, with $$X \sim \text{Bin}(100, 0.01)$$: one minus the four terms for 0 to 3 gives $$1 - 0.9816 = 0.0184$$.
- Approximate: check $$n = 100 \ge 20$$ and $$np = 1 < 5$$, then use $$\text{Poisson}(1)$$:

$$
\begin{aligned}
P(X > 3) &\approx 1 - e^{-1}\left(1 + 1 + \frac{1}{2} + \frac{1}{6}\right) \\
&= 0.0189
\end{aligned}
$$

### Example 6: an exponential feeding a Binomial (slides 14 to 16)

- Time to be served in a cafeteria is exponential with mean 3 minutes, so $$\lambda = \frac{1}{3}$$.
- One day, served in under 1 minute: $$P(X < 1) = 1 - e^{-1/3} = 0.283$$.
- Over the next 6 days, the number of days $$Y$$ served in under a minute is $$\text{Bin}(6, 0.283)$$.
- At least five of the six days:

$$
\begin{aligned}
P(Y \ge 5) &= \binom{6}{5}p^5(1 - p) + p^6 \\
&= 0.008
\end{aligned}
$$

### Next class (slide 17)

- More Poisson examples and an activity.
