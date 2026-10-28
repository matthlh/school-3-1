# STAT 251 — Lec 19 (Mon Oct 26) — Ch 6: Activity 6, the Poisson count and the exponential wait

You sent no page for this lecture, so this file is the posted deck `Lecture_19_Chapter_6.pdf` (6 slides) and the posted solutions `A6_Ch6_poisson_process_solutions.pdf`, both pulled from Canvas on 2026-10-28, organised for study. The Panopto recording was not read. The deck's last slide names the Central Limit Theorem as the topic of the next class, so this lecture is all Chapter 6 and has no Chapter 7 content. Questions: 14 in [the bank](../02-questions.md) under "Lec 19" (12 short, 2 long problems).

## Slides, organized

### Chapter 6 learning outcomes (slide 2)

- The same six outcomes as the [lecture 15 page](15-ch6-bernoulli-binomial.md); this lecture covers the last two, the Poisson process and its random variables and the heuristic derivation of the exponential from the Poisson.

### The Poisson distribution (slide 3)

- $$X$$ is the number of occurrences in a given interval of time or region of space, and $$\lambda > 0$$ is the rate of occurrences in that interval.
- Written $$X \sim \text{Poisson}(\lambda)$$:

$$
P(X = x) = \frac{\lambda^x e^{-\lambda}}{x!}, \quad x = 0, 1, 2, \ldots
$$

- The mean and the variance are both $$\lambda$$.

### The exponential waiting time (slide 4)

- Let the count in a unit interval be $$X \sim \text{Poisson}(\lambda)$$, and let $$T$$ be the time between two consecutive events, which is also the waiting time until the first event.
- $$T$$ is continuous with the exponential density, written $$T \sim \text{Exp}(\lambda)$$:

$$
\begin{aligned}
f(t) &= \lambda e^{-\lambda t}, \quad t \ge 0 \\
F(t) &= 1 - e^{-\lambda t}, \quad t \ge 0 \\
E(T) &= \frac{1}{\lambda} \\
\operatorname{Var}(T) &= \frac{1}{\lambda^2}
\end{aligned}
$$

- The upper tail is the line used most: $$P(T > t) = e^{-\lambda t}$$.

### Activity 6: earthquake recurrence intervals (slide 5 and the worksheet)

- The worksheet shows a histogram of 67 recurrence intervals, the times in years between one earthquake and the next, with the exponential pdf drawn over it using the estimated annual rate $$\lambda = 0.2403$$.
- Question 1 asks for the probability that an interval is shorter than 10 months. The rate is per year, so 10 months is $$\frac{10}{12} = 0.833$$ years.

$$
\begin{aligned}
P\left(T < \frac{10}{12}\right) &= F\left(\frac{10}{12}\right) \\
&= 1 - e^{-0.2403 \times 0.833} \\
&= 0.1815
\end{aligned}
$$

- Question 2 reads the proportion of observed intervals longer than 5 years off the histogram. A bar's area is its density times its width, and the bars past 5 years add to $$0.06 + 0.06 + 0.02 + 0.03 + 0.02 + 0.05 + 0.02 + 0.02 = 0.28$$. The exponential model gives

$$
\begin{aligned}
P(T > 5) &= 1 - F(5) \\
&= e^{-0.2403 \times 5} \\
&= 0.301
\end{aligned}
$$

- The observed 0.28 is close to the model's 0.301.
- Question 3 counts earthquakes instead. In 5 years the count is $$X \sim \text{Poisson}(\lambda t)$$ with $$\lambda t = 0.2403 \times 5 = 1.2015$$:

$$
\begin{aligned}
P(X = 0) &= \frac{e^{-1.2015} \times 1.2015^0}{0!} \\
&= e^{-1.2015} = 0.301
\end{aligned}
$$

- Question 4 asks why questions 2 and 3 agree. Waiting more than 5 years for the next earthquake is the same event as having no earthquakes in 5 years, so $$P(T > 5) = P(X = 0) = e^{-1.2015}$$.
- Question 5: an earthquake has just happened, and the seismologist wants the probability of waiting more than 30 years for the 10th earthquake after it. Waiting more than 30 years for the 10th means at most 9 earthquakes fall in the next 30 years. With $$Y \sim \text{Poisson}(0.2403 \times 30 = 7.209)$$:

$$
\begin{aligned}
P(Y \le 9) &= \sum_{y = 0}^{9} \frac{e^{-7.209} \times 7.209^y}{y!} \\
&= 0.8087
\end{aligned}
$$

### The two translations the activity teaches

- "The wait for the next event is longer than $$t$$" is the event "no events in an interval of length $$t$$": $$P(T > t) = P(X_t = 0) = e^{-\lambda t}$$.
- "The wait for the $$k$$th event is longer than $$t$$" is the event "at most $$k - 1$$ events in an interval of length $$t$$": $$P(W_k > t) = P(X_t \le k - 1)$$, a Poisson sum with mean $$\lambda t$$.
- The rate's time unit is the clock. Convert $$t$$ into that unit before writing $$\lambda t$$; 10 months with an annual rate is $$t = \frac{10}{12}$$, not 10.

### Where the exponential comes from (the heuristic derivation)

- The last learning outcome is this derivation, and the activity is it in disguise.

$$
\begin{aligned}
F(t) &= P(T \le t) \\
&= 1 - P(T > t) \\
&= 1 - P(\text{no events in } (0, t]) \\
&= 1 - \frac{e^{-\lambda t}(\lambda t)^0}{0!} \\
&= 1 - e^{-\lambda t} \\
f(t) &= \frac{d}{dt}F(t) = \lambda e^{-\lambda t}
\end{aligned}
$$

- So the exponential pdf is not a new assumption: it follows from the Poisson count being zero on the interval.

### Next class (slide 6)

- Review Activity 6, then the Central Limit Theorem (Chapter 7), which is not on the midterm.

## Clarifications

- The solutions write question 5's event as "at least 30 years" in one line and "more than 30 years" in the next. For a continuous waiting time the two have the same probability, because a single instant has probability 0.
- The rate 0.2403 is an estimate from the 67 observed intervals, which is why the histogram's 0.28 and the model's 0.301 differ a little; the model is the smooth curve, the histogram is the sample.
- In question 5 the earthquake that has just occurred is not counted, so the clock starts at 0 events; the count in the next 30 years is a fresh $$\text{Poisson}(7.209)$$ because counts on non-overlapping intervals are independent.
