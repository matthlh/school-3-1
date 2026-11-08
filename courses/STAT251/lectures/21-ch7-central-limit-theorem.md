# STAT 251 — Lec 21 (Mon Nov 2) — Ch 7: statistics, sampling distributions and the Central Limit Theorem

The deck is `Lecture_22_Chapter_7_CanvasPost.pdf` (13 slides). Canvas did not post a separate after-class deck. The in-class material comes from the Panopto captions. This study site counts this class as lecture 21. Canvas calls it Lecture 22 because the midterm occupied the Lecture 21 slot, while the deck footer says Lecture 20. The [question bank](../02-questions.md) lists this lesson under "Lec 21". What the class added to the deck is under In class.

## From samples to sampling distributions

### Chapter 7 learning outcomes (slide 2)

- Statistic and parameter.
- Sampling distribution.
- The Central Limit Theorem (CLT).
- The Normal approximation to the Binomial distribution.
- The Normal approximation to the Poisson distribution.
- This lecture covers the first three. The next class (Wed Nov 4) does CLT examples and the two Normal approximations.

### Population, sample, statistic and parameter (slides 3 and 4)

- A **population** is the entire collection of individuals we want to study.
- A **sample** is a subset of individuals selected from the population.
- Statistics uses the sample to draw conclusions about the population.
- A **statistic** is a numerical summary of a sample, such as the sample mean $$\bar{x}$$ or the sample standard deviation $$s$$.
- A **parameter** is a numerical summary of a population, such as the population mean $$\mu$$ or the population standard deviation $$\sigma$$.
- A parameter's value is unknown in practice.
- Because of sampling variability, a statistic takes different values from sample to sample.
- Statistics are used to estimate parameters.

### Sampling distributions (slide 5)

- The **sampling distribution** of a statistic is the probability distribution of the values the statistic can take.
- It describes how the statistic varies from study to study.
- It tells you how close a statistic is likely to fall to the parameter it estimates.

### The sample mean from a Normal population (slide 6)

- This result comes from Chapters 4 and 5 (linear combinations of Normal random variables).
- If $$X_1, \ldots, X_n$$ is a random sample from a Normal population with mean $$\mu$$ and variance $$\sigma^2$$, then the sample mean is exactly Normal:

$$
\begin{aligned}
\bar{X} &= \frac{X_1 + \cdots + X_n}{n} \\
\bar{X} &\sim N\left(\mu, \frac{\sigma^2}{n}\right)
\end{aligned}
$$

- Often the population is not Normal, which is what the CLT is for.

### Mean and standard error of the sample mean (slide 7)

- For a random sample of $$n$$ from any population with mean $$\mu$$ and variance $$\sigma^2$$:
  - The mean of the sampling distribution of $$\bar{X}$$ is $$\mu$$, the same as the population mean.
  - The standard deviation of the sampling distribution of $$\bar{X}$$ is $$\frac{\sigma}{\sqrt{n}}$$.
> **Definition.** The standard deviation of a sampling distribution is called the **standard error**, to tell it apart from the standard deviation of an ordinary distribution.
- These two facts hold for any population. Only the shape (Normal or not) needs the CLT.

## The Central Limit Theorem

### The approximation for a mean (slide 8)

- Let $$X_1, \ldots, X_n$$ be a random sample from any population with mean $$\mu$$ and variance $$\sigma^2$$.
- When $$n$$ is large (the book says $$n \ge 20$$), $$\bar{X}$$ is approximately Normal with mean $$\mu$$ and variance $$\frac{\sigma^2}{n}$$, whatever the shape of the population:

$$
\bar{X} \approx N\left(\mu, \frac{\sigma^2}{n}\right)
$$

- The difference from slide 6: there the population is Normal and the result is exact for any $$n$$; here the population can be anything and the result is approximate for large $$n$$.

### The CLT for a sum (slide 9)

- If a question asks about a total rather than an average, the CLT still applies.
- Let $$T = X_1 + \cdots + X_n$$. Then $$T = n\bar{X}$$, so:

$$
\begin{aligned}
E(T) &= E(n\bar{X}) \\
&= nE(\bar{X}) \\
&= n\mu
\end{aligned}
$$

$$
\begin{aligned}
\operatorname{Var}(T) &= \operatorname{Var}(n\bar{X}) \\
&= n^2 \operatorname{Var}(\bar{X}) \\
&= n^2 \times \frac{\sigma^2}{n} \\
&= n\sigma^2
\end{aligned}
$$

- So for large $$n$$, $$T \approx N(n\mu, n\sigma^2)$$, and its standard deviation is $$\sigma\sqrt{n}$$.
- The average's spread shrinks with $$n$$ (divide by $$\sqrt{n}$$); the total's spread grows with $$n$$ (multiply by $$\sqrt{n}$$).

### Applets and the video (slides 10 to 12)

- A UBC video on the sampling distribution of the mean, and two UBC StatSpace applets: sampling from a non-Normal population (the CLT) and sampling from a Normal population.
- The point the deck draws from the applets: as $$n$$ increases, the standard deviation of the sampling distribution of $$\bar{X}$$ decreases.
- The class ran both applets. What they showed is under In class, and one bank question is built on the first.

## In class

From the recording's captions, in the order the class went.

### Announcements

- Lab 5 runs the week of Nov 2, with its pre-lab quiz.
- WeBWorK 6 is due Thu Nov 12, because Mon Nov 9 to Wed Nov 11 is the break, with no classes.
- There are no labs the week of Nov 9. Lab 6 is the week of Nov 16.
- He asked everyone to complete the midterm TA evaluation.

### Why the sample is random

- We usually cannot study the whole population, because it is too big and costs too much time and money. So we study a sample and draw conclusions about the population. That step is called inference, and it starts in the next chapter.
- The sample is drawn at random so that it is unbiased, meaning it represents the population instead of favouring one part of it.
- A random sample gives its values two properties, written i.i.d. They are independent of each other, and they are identically distributed, meaning each one comes from the same population distribution.
- Now and then a random sample is extreme by chance, but we still take it to represent the population.
- A parameter ($$\mu$$, $$\sigma$$, or the population proportion $$p$$) is a constant, because the population does not change during the study. It is unknown because we do not have the population's data.
- A statistic ($$\bar{x}$$, $$s$$, or the sample proportion $$\hat{p}$$) is known because we have the sample. As an estimate it is not the parameter's exact value, and it depends on which sample we happened to get.

### The three distributions

He separated three distributions that are easy to mix up. Take the number of cups of coffee a UBC student drinks per week as the variable, and a random sample of 50 students.

```svg
<svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, system-ui, sans-serif" font-size="13">
  <g text-anchor="middle">
    <rect x="15" y="26" width="180" height="96" rx="8" fill="var(--panel)" stroke="var(--link)"/>
    <text x="105" y="58" fill="var(--link)" font-weight="600">Population</text>
    <text x="105" y="76" fill="var(--link)">distribution</text>
    <text x="105" y="102" fill="var(--muted)" font-size="11">the whole population's values</text>
    <rect x="210" y="26" width="180" height="96" rx="8" fill="var(--panel)" stroke="var(--border3)"/>
    <text x="300" y="58" fill="var(--fg)" font-weight="600">Sample</text>
    <text x="300" y="76" fill="var(--fg)">distribution</text>
    <text x="300" y="102" fill="var(--muted)" font-size="11">the values in one sample</text>
    <rect x="405" y="26" width="180" height="96" rx="8" fill="var(--panel)" stroke="var(--ok)"/>
    <text x="495" y="58" fill="var(--ok)" font-weight="600">Sampling</text>
    <text x="495" y="76" fill="var(--ok)">distribution</text>
    <text x="495" y="102" fill="var(--muted)" font-size="11">a statistic over all samples</text>
  </g>
</svg>
```

- The population distribution is how the variable is spread over the whole population: every UBC student's weekly cups.
- The sample distribution is how the data in one sample are spread: the histogram of the 50 values you collected.
- The sampling distribution is the distribution of a statistic, such as $$\bar{x}$$, over all the samples of 50 you could have drawn. Another sample of 50 gives a different $$\bar{x}$$, so the sample mean is a random variable, $$\bar{X}$$, and its distribution is the sampling distribution.

The sample distribution looks like the population distribution but is not the same. A large sample tends to match the shape of its population. A small sample may look quite different.

A bigger sample does not make the sample distribution Normal. A skewed population gives skewed samples, however large they are. The distribution of the sample mean across many samples can become approximately Normal.

- In this course the only sampling distribution studied is that of $$\bar{X}$$. The sample proportion $$\hat{p}$$ and the sample standard deviation $$s$$ have sampling distributions too, but they are not covered.
- The sampling distribution shows how much the statistic varies from study to study. Large variability is bad, because one study's estimate could land far from the parameter. Small variability is good.

### Standard error, and what is not the CLT

- The standard error is the standard deviation of a sampling distribution. An ordinary distribution such as the Binomial, Poisson, exponential or uniform has a standard deviation, not a standard error. When you hear "standard error", it is about a sampling distribution.
- An estimate of $$\frac{\sigma}{\sqrt{n}}$$ computed from the sample is also called the standard error. He said this would be shown next lecture.
- He said slide 6 "is not the central limit theorem". A Normal population gives an exactly Normal $$\bar{X}$$ for any $$n$$, because $$\bar{X}$$ is a linear combination of Normals (Chapter 5).
> **Key.** The CLT is the other case. A large enough random sample from any population, even one whose shape is unknown, gives an approximately Normal $$\bar{X}$$ with mean $$\mu$$ and standard error $$\frac{\sigma}{\sqrt{n}}$$.

### How large the sample must be

- There is no clear-cut rule. It is not "above 20, Normal; below 20, not Normal".
- The usual rule of thumb, and the one you will find online, is $$n > 30$$.
- The textbook uses 20, and using 20 in this course is fine.
- Sometimes even 15 is enough, and a bigger sample is always better.
- A highly skewed population can need more than 30.
- A Normal population needs no minimum, because that case is exact for any $$n$$.
- On the board he sketched a highly skewed population and a uniform one. For a big sample, both give an approximately Normal sampling distribution of $$\bar{x}$$.
- With $$n = 100$$ the sampling distribution is narrower than with $$n = 50$$, because the standard error divides $$\sigma$$ by $$\sqrt{n}$$. Here $$\frac{\sigma}{\sqrt{100}}$$ is about 0.71 times $$\frac{\sigma}{\sqrt{50}}$$.

### The total, and saying "by CLT"

- The CLT also covers the total $$T = X_1 + \cdots + X_n = n\bar{X}$$, with mean $$n\mu$$ and variance $$n\sigma^2$$ (slide 9). $$T$$ is approximately Normal because it is $$\bar{X}$$ multiplied by the constant $$n$$.
- He said some WeBWorK 6 questions and WeBWorK 7 need the total version.
- Whenever you use the theorem in a written answer, say so. Write "by the central limit theorem", or "by CLT" for short.

### Clicker question

> **Example.** The question: sampling distributions describe the distribution of (A) parameters, (B) statistics, (C) both parameters and statistics, or (D) neither. A frame shows 124 responses. The recording does not give how the answers split.
>
> The answer is (B), statistics. A sampling distribution is always the distribution of a statistic.
- The reason: a statistic such as $$\bar{x}$$ takes a different value in each sample, so it is a random variable and has a distribution. A parameter such as $$\mu$$ is one fixed number, so it has no distribution.
- The sampling distribution of $$\bar{X}$$ is centred at $$\mu$$ and shows how close $$\bar{x}$$ tends to land to it, but $$\mu$$ itself does not vary. That is why (C) is wrong.

### Midterm feedback and how answers are marked

He said this especially for students who watch the recordings instead of coming to class. The marking rules from the midterm review (define the random variable, name the distribution and its parameters, write the formula before the numbers) are under How written answers are marked on the [lecture 20 page](20-midterm-exam-review.md#in-class-from-the-recording). What he added:

- The midterm was built to take the whole 48 minutes, so the time pressure was deliberate. Answering four and a half of the five questions is still a good grade.
- WeBWorK and written-assignment questions are harder than exam questions, because you have a week or more for them.
- The multiple-choice questions should take under five minutes in total. Some students searched their cheat sheet for them, so know where everything is on your sheet before the exam.
- Midterm grades come by Fri Nov 6, with detailed answers to every question.
- A line such as $$E(T) = 0.5 + 0.6 + \cdots$$ means nothing to the grader if the question used no letters and you never said what $$T$$ is. Define every random variable first, then write the formula, such as $$E(T) = \sum_t t\,p(t)$$ for a discrete random variable, then put the numbers in.
- If you write only numbers with no method, one wrong number costs all the marks for that part, and even a right final answer does not get full marks. Numbers alone are fine for multiple choice, not for a question that asks for the method. The grader has to be able to follow what you did.
- The slide examples are not all easy. They feel easy because the solution sits next to them, so practise them without looking at the solution.
- The final has about ten questions. One or two can be harder, and most are easy. A zero on a question where the class averages 95% is hard to make up.

### The applet demonstrations

He ran the first StatSpace applet, sampling from a non-Normal population. The population was the number of cups of coffee a person drinks per week, a discrete, right-skewed distribution with mean 2.5 cups. The applet draws a sample, shows its histogram (the sample distribution), and adds that sample's $$\bar{x}$$ to a second histogram. After many samples the second histogram is the sampling distribution. Its horizontal axis is the value of $$\bar{x}$$, and each observation in it is one whole sample's mean.

| Sample size | Sampling distribution of $$\bar{x}$$ |
|---|---|
| $$n = 10$$ | still right-skewed, not Normal |
| $$n = 30$$ | wider than for 50, and still a bit skewed |
| $$n = 50$$ | approximately Normal, centred at 2.5 |
| $$n = 100$$ | approximately Normal, narrower than for 50 |

- With $$n = 50$$, one sample's histogram also looked more like the right-skewed population than with $$n = 10$$. A bigger sample does two different things: the sample distribution looks more like the population, and the sampling distribution looks more Normal and gets narrower.
- The $$n = 30$$ run shows why 30 is not a guarantee: with a skewed population, 30 was not quite enough.
- The second applet sampled from a Normal population, fish lengths. There $$\bar{x}$$ was Normal for every sample size, even 5 or 10, because a Normal population gives an exactly Normal $$\bar{X}$$ (Chapter 5, not the CLT). Only the spread changed with $$n$$.

## Clarifications

> **Watch out.** The standard error $$\frac{\sigma}{\sqrt{n}}$$ uses the population standard deviation $$\sigma$$. Dividing the variance by $$n$$ gives $$\frac{\sigma^2}{n}$$; dividing the standard deviation by $$n$$ instead of $$\sqrt{n}$$ is the usual slip.
- The deck's $$n \ge 20$$ is the textbook's rule of thumb, not a cutoff where $$\bar{X}$$ switches to Normal. The instructor said 20 is fine to use in this course, the usual rule elsewhere is $$n > 30$$, and a highly skewed population can need more than 30 (How large the sample must be, under In class). A Normal population needs no minimum at all.
