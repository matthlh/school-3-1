# STAT 251 — Lec 22 (Wed Nov 4) — Ch 7: CLT examples, the CLT activity and the Normal approximation to the Binomial

You missed this class and sent no page, so this file is the after-class deck `Lecture_23_Chapter_7_CanvasPost_AL.pdf` (13 slides), the activity solutions `A8_ch7 Activity solution.pdf` and the recording's slide index, organised for study. Canvas calls this class Lecture 23 and the deck calls itself Lecture 21; this site counts it as lecture 22. The recording's captions were not out yet on Nov 4, so In class comes from Panopto's slide index and a few frames, not from what was said. Questions: 10 in [the bank](../02-questions.md) under "Lec 22", and 1 under "Long problems".

## Slides, organized

### Chapter 7 learning outcomes (slide 2)

- The same five outcomes as the [lecture 21 page](21-ch7-central-limit-theorem.md), which defines the statistic, the sampling distribution, the standard error and the CLT itself.
- This class covers examples of the CLT and the Normal approximation to the Binomial.
- The Normal approximation to the Poisson is the next class's topic.

### When the CLT is needed and when it is not (slides 3 to 6)

Both examples ask the same kind of question: a random sample of $$n$$ values is taken, $$\bar{X}$$ is their average, and we want a probability about $$\bar{X}$$. A Normal table can only be used if $$\bar{X}$$ is Normal, so the first step is always to say why it is. There are two different reasons, and the two examples show one each.

- The population is Normal. Then $$\bar{X}$$ is a linear combination of independent Normal variables, so it is exactly Normal for any $$n$$, even $$n = 2$$. This is Fact 3 on the [lecture 14 page](14-ch5-normal-linear-combinations-sample-mean.md), and it needs no CLT.
- The population is not Normal, or its shape is not given. Then the CLT says $$\bar{X}$$ is approximately Normal once $$n$$ is large, which this course takes as $$n \ge 20$$.
- If the population is not Normal and $$n$$ is small, neither reason works, and no Normal calculation for $$\bar{X}$$ is justified.

Whichever reason applies, $$\bar{X}$$ has mean $$\mu$$ and standard error $$\frac{\sigma}{\sqrt{n}}$$. Those two numbers hold for any population; only the Normal shape needs one of the two reasons.

| Population | Sample size | $$\bar{X}$$ is | Reason |
|---|---|---|---|
| Normal | any $$n$$ | exactly Normal | a linear combination of Normals (lecture 14) |
| not Normal, or not given | $$n \ge 20$$ | approximately Normal | the CLT |
| not Normal | $$n < 20$$ | no Normal model | neither applies |

### Example 1: stock prices, where the CLT is needed (slides 3 and 4)

Closing prices of stocks are right-skewed: most stocks are cheap and a few are very expensive. One stock's closing price has mean $$\mu = 25$$ dollars and standard deviation $$\sigma = 20$$ dollars. A random sample of 40 stocks is taken, and $$\bar{X}$$ is their average closing price. The question is the probability that this average is under 20 dollars.

- One price is not Normal, so the lecture 14 fact does not apply.
- The sample has $$n = 40 \ge 20$$, so the CLT says $$\bar{X}$$ is approximately $$N\left(\mu, \frac{\sigma^2}{n}\right)$$ whatever the shape of one price.
- The standard error is much smaller than one stock's 20 dollars, because in an average of 40 prices the high and low ones offset each other.

$$
\begin{aligned}
SE &= \frac{\sigma}{\sqrt{n}} = \frac{20}{\sqrt{40}} \\
&= 3.162 \\
z &= \frac{20 - 25}{3.162} \\
&= -1.58 \\
P(\bar{X} < 20) &= P(Z < -1.58) \\
&= P(Z > 1.58) \\
&= 1 - 0.9429 \\
&= 0.0571
\end{aligned}
$$

- The deck turns $$P(Z < -1.58)$$ into $$1 - P(Z < 1.58)$$ by symmetry, because the course uses only the positive-z table.
- In words: 20 dollars is 5 dollars below the mean. For one stock that is a quarter of a standard deviation, an ordinary gap. For the average of 40 stocks it is 1.58 standard errors, so an average that low happens only about 5.7% of the time.

### Example 2: form-filling times, where the CLT is not needed (slides 5 and 6)

The time a mortgage applicant takes to fill out a form is Normal with mean 10 minutes and standard deviation 2 minutes. Five people fill it out on one day, and $$\bar{X} = \frac{X_1 + \cdots + X_5}{5}$$ is their average time. The question is $$P(\bar{X} \le 11)$$.

- The sample is only $$n = 5$$, far below 20, so the CLT cannot be relied on.
- It is not needed. Each time is Normal, so $$\bar{X}$$ is a linear combination of independent Normals and is exactly $$N\left(10, \frac{2^2}{5}\right)$$.

$$
\begin{aligned}
SE &= \frac{2}{\sqrt{5}} = 0.894 \\
z &= \frac{11 - 10}{0.894} \\
&= 1.12 \\
P(\bar{X} \le 11) &= \Phi(1.12) \\
&= 0.8686
\end{aligned}
$$

- The calculation looks exactly like Example 1's. What differs is the sentence that justifies it, and on a written answer that sentence earns marks.

### The CLT activity: the average length of 100 phone calls (worksheet A8)

The length in minutes of one long-distance business call is exponential with rate $$\lambda = 0.04$$ per minute. The exponential is strongly right-skewed: most calls are short and a few are very long. A random sample of 100 calls is taken, and the question is the probability that their average length is between 20 and 30 minutes. The worksheet walks there in four steps.

Step 1, one call. For an exponential, the mean is $$\frac{1}{\lambda}$$ and the variance is $$\frac{1}{\lambda^2}$$ (lecture 9), so the standard deviation equals the mean.

$$
\begin{aligned}
\mu &= \frac{1}{\lambda} = \frac{1}{0.04} \\
&= 25 \text{ min} \\
\sigma &= \sqrt{\frac{1}{0.04^2}} \\
&= 25 \text{ min}
\end{aligned}
$$

Step 2, the average and its mean. The average of 100 calls is $$\bar{X} = \frac{X_1 + \cdots + X_{100}}{100}$$. The constant $$\frac{1}{100}$$ comes out of the expectation, and each call has mean 25.

$$
\begin{aligned}
E(\bar{X}) &= \frac{1}{100}\{E(X_1) + \cdots + E(X_{100})\} \\
&= \frac{1}{100}\{100 \times 25\} \\
&= 25 \text{ min}
\end{aligned}
$$

Step 3, the standard error. The variance of the average is $$\frac{\sigma^2}{n}$$, and the standard error is its square root. The class found $$\operatorname{Var}(X) = 625$$ first and then divided by 100.

$$
\begin{aligned}
\operatorname{SD}(\bar{X}) &= \sqrt{\frac{\sigma^2}{n}} \\
&= \sqrt{\frac{625}{100}} \\
&= 2.5 \text{ min}
\end{aligned}
$$

Step 4, the probability. One call is far from Normal, but $$n = 100 \ge 20$$, so by the CLT $$\bar{X}$$ is approximately $$N(25, 2.5^2)$$. The interval from 20 to 30 is the mean plus or minus 5 minutes, which is 2 standard errors each way.

$$
\begin{aligned}
&P(20 < \bar{X} < 30) \\
&= P\left(\frac{20 - 25}{2.5} < Z < \frac{30 - 25}{2.5}\right) \\
&= P(-2 < Z < 2) \\
&= P(Z \le 2) - P(Z \le -2) \\
&= 0.9772 - (1 - 0.9772) \\
&= 0.9544
\end{aligned}
$$

- $$P(Z \le -2)$$ comes from symmetry: the area below $$-2$$ equals the area above 2, which is $$1 - 0.9772 = 0.0228$$.
- In words: about 95% of samples of 100 calls average between 20 and 30 minutes.
- Compare one call. A single call lands between 20 and 30 minutes with probability $$e^{-0.04 \times 20} - e^{-0.04 \times 30} = 0.148$$, from the exponential cdf. Averaging 100 calls packs the values tightly around 25.

### The Normal approximation to the Binomial (slide 7)

A Binomial count $$X \sim \text{Bin}(n, p)$$ has an exact pmf, but adding up its terms is slow: "at most 30 successes out of 100" is 31 terms. When $$n$$ is large, the Binomial's histogram has a bell shape, so a Normal curve with the same mean and variance gives a quick approximate answer from the Z-table.

The reason it is bell-shaped is the CLT for a sum, from lecture 21. The deck does not say this, but it is why the method works: $$X$$ is the sum of $$n$$ independent Bernoulli trials, each 1 for a success and 0 for a failure, and a sum of many independent values is approximately Normal. Its mean $$np$$ and variance $$np(1 - p)$$ are the Binomial's own, from lecture 15.

- The condition: use the approximation only when both $$np \ge 5$$ and $$n(1 - p) \ge 5$$.
- $$np$$ is the expected number of successes and $$n(1 - p)$$ is the expected number of failures, so the condition asks for at least 5 of each.
- Why it depends on $$p$$, not only on $$n$$: when $$p$$ is near 0, the counts pile up against 0 and the histogram is lopsided. $$\text{Bin}(20, 0.05)$$ has $$np = 1$$, and its probabilities for 0, 1, 2 and 3 are 0.358, 0.377, 0.189 and 0.060, which is no bell even with $$n = 20$$.
- When the condition holds:

$$
\begin{aligned}
X &\approx N\big(np,\; np(1 - p)\big) \\
\mu &= np \\
\sigma^2 &= np(1 - p)
\end{aligned}
$$

- The slide adds that the continuity correction should be used, because a discrete variable is being approximated by a continuous one.

Here is why the correction exists. Draw the Binomial as a histogram whose horizontal axis is the count. The bar for the value $$k$$ is centred on $$k$$, runs from $$k - 0.5$$ to $$k + 0.5$$, and has area $$P(X = k)$$. The Normal curve is laid over these bars. $$P(X \le 2)$$ is the total area of the bars for 0, 1 and 2, and the bar for 2 ends at 2.5. Cutting the Normal curve at 2 leaves out the right half of the bar for 2, so the cut moves to 2.5.

### Example 3: at most 2 successes in Bin(10, 0.5), three ways (slides 8 to 11)

$$X \sim \text{Bin}(10, 0.5)$$, which you can think of as the number of heads in 10 tosses of a fair coin. The question is the probability of at most 2 successes, found (a) exactly, (b) by the Normal approximation and (c) by the Normal approximation with the continuity correction.

(a) Exactly, by adding the pmf for 0, 1 and 2. With $$p = 0.5$$ every term has the factor $$0.5^{10} = \frac{1}{1024}$$.

$$
\begin{aligned}
P(X \le 2) &= \binom{10}{0}0.5^{10} + \binom{10}{1}0.5^{10} \\
&\quad + \binom{10}{2}0.5^{10} \\
&= \frac{1 + 10 + 45}{1024} \\
&= 0.0547
\end{aligned}
$$

(b) The Normal approximation without the correction. First the parameters and the condition: $$np = 5 \ge 5$$ and $$n(1 - p) = 5 \ge 5$$, so both hold, just barely. Call the Normal variable $$Y$$.

$$
\begin{aligned}
\mu &= np = 10 \times 0.5 = 5 \\
\sigma^2 &= np(1 - p) \\
&= 10 \times 0.5 \times 0.5 = 2.5 \\
P(X \le 2) &\approx P(Y \le 2) \\
&= P\left(Z \le \frac{2 - 5}{\sqrt{2.5}}\right) \\
&= P(Z \le -1.90) \\
&= 0.0287
\end{aligned}
$$

- This is about half the exact 0.0547.
- The cut at 2 dropped the right half of the bar for 2. That bar's area is $$P(X = 2) = \frac{45}{1024} = 0.044$$, so about 0.022 is lost, which is most of the 0.026 gap between 0.0287 and the exact 0.0547.

(c) With the continuity correction, the cut moves to the end of the bar for 2.

$$
\begin{aligned}
P(X \le 2) &\approx P(Y \le 2.5) \\
&= P\left(Z \le \frac{2.5 - 5}{\sqrt{2.5}}\right) \\
&= P(Z \le -1.58) \\
&= 1 - 0.9429 \\
&= 0.0571
\end{aligned}
$$

- This is close to the exact 0.0547.
- The correction mattered this much because $$n$$ is small. Half a unit is $$\frac{0.5}{1.581} = 0.32$$ standard deviations here. For $$\text{Bin}(400, 0.5)$$, $$\sigma = 10$$, and the same half unit is only 0.05 standard deviations.

### The continuity correction table (slide 12)

$$X$$ is the Binomial count and $$Y$$ is the Normal variable that approximates it. The method has three steps.

1. Rewrite a strict inequality on whole numbers: $$X > 4$$ is $$X \ge 5$$, and $$X < 4$$ is $$X \le 3$$.
2. "At most $$k$$" includes the whole bar for $$k$$, so it becomes $$Y \le k + 0.5$$.
3. "At least $$k$$" includes the whole bar for $$k$$, so it becomes $$Y \ge k - 0.5$$.

| Binomial | Same event | Normal with the correction |
|---|---|---|
| $$P(X > 4)$$ | $$P(X \ge 5)$$ | $$P(Y \ge 4.5)$$ |
| $$P(X \ge 4)$$ | $$P(X \ge 4)$$ | $$P(Y \ge 3.5)$$ |
| $$P(X < 4)$$ | $$P(X \le 3)$$ | $$P(Y \le 3.5)$$ |
| $$P(X \le 4)$$ | $$P(X \le 4)$$ | $$P(Y \le 4.5)$$ |
| $$P(X = 4)$$ | $$P(X = 4)$$ | $$P(3.5 \le Y \le 4.5)$$ |

- $$X > 4$$ and $$X \ge 4$$ differ only by the value 4, and their corrected versions differ by exactly the bar for 4, from 3.5 to 4.5.
- $$P(X = 4)$$ cannot be approximated without the correction: a continuous $$Y$$ has $$P(Y = 4) = 0$$, so the single value has to become its bar.

### Next class (slide 13)

- Review this lecture (Canvas Lecture 23) and the matching textbook sections.
- The next class is "Activity-CLT and Normal approximation to Poisson distributions".

## In class

There are no captions yet, so this comes from Panopto's slide index and a few frames.

- The class covered the learning outcomes, then Example 1 with a clicker question (from about 8 minutes in) and its solution (from about 12 minutes).
- Example 2's clicker question came at about 22 minutes.
- The activity worksheet ran from about 28 to 45 minutes. The in-class sheet split question 1 into (a) the mean and (b) the standard deviation of one call, and the class found $$\operatorname{Var}(X)$$ before the standard error in question 3.
- The Normal approximation to the Binomial started at about 46 minutes. The class ended on Example 3(b), at $$P(Z \le -1.90) = 0.0287$$.
- Not reached: Example 3(c) and the continuity correction table. Expect them on Friday, Nov 6.

### Clicker questions

- The first gave Example 1's stem (right-skewed prices, mean 25 dollars, standard deviation 20 dollars, a sample of 40) and asked whether the CLT can be used. The answer is (A) Yes. The population is skewed, so lecture 14's exact result does not apply, but $$n = 40 \ge 20$$ lets the CLT make $$\bar{X}$$ approximately Normal. The results screen was not checked.
- The second gave Example 2's stem (Normal form times, mean 10 minutes, standard deviation 2 minutes, 5 people) and asked whether the CLT is needed. The answer is (B) No. The times are Normal, so $$\bar{X}$$ is exactly Normal for any $$n$$, even 5. A frame shows 102 responses; the split was not checked.
- The pair is a contrast. In Example 1 the CLT is the only reason $$\bar{X}$$ is Normal. In Example 2 a stronger reason already holds, so the small $$n$$ does not matter.

## Clarifications

- The activity sheet writes $$P(Z \le -2)$$ as $$1 - P(Z \ge -2)$$, which looks odd but is correct. The two events are complements (the single point $$-2$$ has probability 0), and $$P(Z \ge -2) = P(Z \le 2) = 0.9772$$ by symmetry. It is a long way of writing $$1 - 0.9772$$.
- The deck's part (c) writes $$P(X \le 2) = P(X \le 2 + 0.5)$$. For the Binomial $$X$$ those are the same event, so the line says nothing new. The 2.5 belongs to the Normal variable, $$Y$$ in the slide 12 table. On an exam write $$P(X \le 2) \approx P(Y \le 2.5)$$ so the grader sees the switch to the Normal.
- The continuity correction is only for a count, like a Binomial, approximated by a Normal. Examples 1 and 2 and the activity average continuous prices and times, so they take no correction.
- This course's condition is $$np \ge 5$$ and $$n(1 - p) \ge 5$$. Some textbooks and websites use 10 instead. Use 5.
