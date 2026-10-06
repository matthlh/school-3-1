# STAT 251 — Lec 8 (Fri Sep 25) — Ch 4: random variables, the pmf, the cdf, mean and variance

No page from you for this one (missed class). This file is the posted after-class deck organised for study, `Lecture_08_Chapter_4_canvaspost_AL.pdf` (20 slides, Canvas file 47723817), plus the Panopto recording. The first ten minutes finished lecture 7's reliability question. Example 5 (slides 17 to 19) was not reached and opened lecture 9. Summation signs come through the text layer as a bare "P", so the formulas are written in their standard form.

## Learning goals (slide 4, the Chapter 4 list)
- Notation for random variables; discrete versus continuous.
- The pmf now and the pdf next lecture.
- The mean, variance and standard deviation of a random variable.
- The cdf.
- The max and min of independent random variables, later in the chapter.

## Slides, organized
### Finishing lecture 7 (recording, first ten minutes)
- The reliability system splits into $$S_1$$ = $$A$$ and $$B$$ in parallel and $$S_2$$ = $$C$$ and $$D$$ in series. The system works only if both blocks work, so $$P(\text{system works}) = P(S_1)\,P(S_2)$$ by independence.
- "Or" here means $$A$$ works, or $$B$$ works, or both. The intersection factorises only because independence is given, and the answer has to say so.

$$
\begin{aligned}
P(S_1) &= P(A \cup B) \\
&= P(A) + P(B) - P(A)\,P(B) \\
&= 0.6 + 0.5 - 0.3 = 0.8 \\[4pt]
P(S_2) &= P(C)\,P(D) = 0.81 \\
P(\text{system works}) &= 0.8 \times 0.81 = 0.648
\end{aligned}
$$

- Textbook exercises use more complicated layouts; the method is the same: name the series and parallel blocks, then write probability statements.

### Random variables (slides 5–7)
- A random variable $$X$$ is a function on the sample space $$S$$ that assigns a number $$x = X(w)$$ to each outcome $$w$$. Uppercase names the variable, lowercase names one of its possible values, and "rv" in the notes means random variable.
- Example 1: flip a fair coin three times, eight equally likely outcomes. With $$X$$ = the number of heads, $$X(HHH) = 3$$ and $$X(HTT) = 1$$, and the possible values are $$x = 0, 1, 2, 3$$. Several outcomes map to the same value.
- Discrete: the possible values are a finite set or an infinite sequence, and there is probability at each point. Continuous: the values fill an interval or a union of intervals, probability lives on intervals, and $$P(X = c) = 0$$ for any single $$c$$, because one point is one out of infinitely many.
- A random variable whose only values are 0 and 1 is a Bernoulli random variable.

### The pmf (slides 8–11)
- The probability mass function of a discrete $$X$$ is $$f(x) = P(X = x)$$ for each possible value $$x$$. To decide whether a table is a pmf, check both properties:

$$
f(x) \ge 0 \text{ for every } x, \qquad \sum_x f(x) = 1
$$

- Lowercase $$f$$ is the pmf. With several random variables in play, write $$f_X$$ and $$f_Y$$ to say which one.
- Example 2: for the number of heads in three flips, the pmf below can be given as a table or as a piecewise function. The $$\frac{3}{8}$$ counts the three equally likely outcomes with exactly one head, or exactly two.

| $$x$$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $$f(x)$$ | $$\frac{1}{8}$$ | $$\frac{3}{8}$$ | $$\frac{3}{8}$$ | $$\frac{1}{8}$$ |

- Example 3: $$Y$$ takes $$-3, 0, 1, 5$$ with probabilities $$k, 0.4, 3k, 2k$$. The possible values above 0.5 are 1 and 5, even though 0.5 itself is not a value.

$$
\begin{aligned}
k + 0.4 + 3k + 2k &= 1 \;\Rightarrow\; k = 0.1 \\
P(Y = 5) &= 2k = 0.2 \\
P(Y \ge 0) &= 0.4 + 3k + 2k = 0.9 \\
P(Y < 0) &= P(Y = -3) = 0.1 \\
P(Y > 0.5) &= P(Y = 1) + P(Y = 5) = 0.5
\end{aligned}
$$

- Showing work: write "$$f$$ is a pmf, so the probabilities sum to 1", then the probability statements such as $$P(Y = 0) + P(Y = 1) + P(Y = 5)$$, then the numbers.

### The cdf of a discrete random variable (slides 12–14)
- The cumulative distribution function is defined for every real $$x$$, not only the possible values. Uppercase $$F$$ is the cdf.

$$
F(x) = P(X \le x) = \sum_{k \le x} f(k)
$$

- $$1 - F(x) = P(X > x)$$. The equal sign matters for a discrete variable: $$F(1)$$ includes $$P(X = 1)$$ and $$P(X > 1)$$ does not.
- Example 4: for the three flips,

$$
F(x) = \begin{cases}
0 & x < 0 \\
\frac{1}{8} & 0 \le x < 1 \\
\frac{4}{8} & 1 \le x < 2 \\
\frac{7}{8} & 2 \le x < 3 \\
1 & x \ge 3
\end{cases}
$$

- So $$F(0.8) = F(0.925) = \frac{1}{8}$$, $$F(1.2) = F(1.6) = \frac{1}{2}$$, and $$F(10) = 1$$. The graph is a staircase, flat between possible values and jumping by $$f(x)$$ at each one.

### Mean and variance (slides 15–16)
- The mean or expected value is a weighted average of the possible values with the pmf as the weights. Interpretation: the long-run average of $$X$$ over hypothetical repetitions of the experiment, not something one run shows. It is a random variable's mean, not the Chapter 1 sample mean, which belongs to data.

$$
\mu = E(X) = \sum_x x\,f(x) \qquad E[g(X)] = \sum_x g(x)\,f(x)
$$

- For a function $$g$$, the pmf stays; only the values change.
- Variance, with uppercase $$X$$ inside the expectation and lowercase $$x$$ in the sum. $$\sigma$$ is the square root. The shortcut is the one used by hand; the proof comes once the properties of expectation are done.

$$
\begin{aligned}
\sigma^2 = \operatorname{Var}(X) &= E\big[(X - \mu)^2\big] = \sum_x (x - \mu)^2 f(x) \\
\operatorname{Var}(X) &= E(X^2) - \big[E(X)\big]^2
\end{aligned}
$$

### Not reached (slides 17–19; lecture 9 opened with them)
- Example 5, the three flips. $$E(X) = 1.5$$ is a long-run average over many sets of three flips, not a count you can see. The shortcut wins once there are more than a few values.

$$
\begin{aligned}
E(X) &= 0 \cdot \frac{1}{8} + 1 \cdot \frac{3}{8} + 2 \cdot \frac{3}{8} + 3 \cdot \frac{1}{8} \\
&= \frac{12}{8} = 1.5 \\[4pt]
\text{definition: } \operatorname{Var}(X) &= \frac{2.25 + 0.75 + 0.75 + 2.25}{8} = 0.75 \\[4pt]
\text{shortcut: } E(X^2) &= \frac{0 + 3 + 12 + 9}{8} = 3 \\
\operatorname{Var}(X) &= 3 - 1.5^2 = 0.75
\end{aligned}
$$

### Next class
- Continuous random variables (lecture 9). Integration and differentiation start there; he said to review the basics from a calculus book if needed.

## In class
- iClicker 1: $$Y$$ = green die minus red die for two fair dice. The 36 ordered outcomes give differences from $$-5$$ to 5, so the possible values are $$-5, \dots, 5$$. Answer C, not $$-6$$ to 6.
- iClicker 2: find $$k$$ in Example 3. Answer B, $$k = 0.1$$, from the probabilities summing to 1. Nine people picked C.
- iClicker 3: $$P(Y > 0.5)$$ for the same pmf. Answer C, 0.5.
- Clicker marks are 1 for answering and 1 for the right answer. Students who miss class should not answer remotely.

## Clarifications
- $$P(Y > 0.5)$$ and $$P(Y \ge 1)$$ are the same event for this $$Y$$, because no possible value sits between 0.5 and 1. Read every inequality against the list of possible values before adding.
- A random variable's mean comes from its distribution, not from data. $$\sum x\,f(x)$$ replaces the Chapter 1 mean of a sample; they are different objects with different formulas, and they agree only when the values are equally likely.

Questions: 9 in [02-questions.md](../02-questions.md) under "Lec 8", and 1 under "Long problems". Ledger: 3 topics, due Sep 29.
