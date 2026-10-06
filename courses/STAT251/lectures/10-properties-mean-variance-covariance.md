# STAT 251 — Lec 10 (Fri Oct 2) — Ch 4: rules for the mean and variance, covariance, sums and averages, the maximum of independent random variables

No page from you for this one. This file is the posted after-class deck organised for study, `Lecture_10_Chapter_4_CanvasPost_AL.pdf` (16 slides, Canvas file 47723830). It is the before-class deck plus worked answers to Examples 8 and 9. It was checked against the Panopto recording on 2026-10-05, and what the class added is under In class.

## Learning goals (slide 2)
- Use the rules for the mean and variance of $$aX + b$$ and of sums of random variables.
- Compute covariance, read its sign, and use it in the variance of a sum.
- Find the mean and variance of a sum or an average of independent random variables.
- Find the cdf and pdf of the maximum, and the minimum, of independent random variables.

## Slides, organized
### Rules for the mean and variance (slide 3)

For any random variables $$X$$ and $$Y$$ and any constants $$a$$ and $$b$$:

$$
\begin{aligned}
E(aX + b) &= a\,E(X) + b \\
E(X + Y) &= E(X) + E(Y) \\
\operatorname{Var}(aX + b) &= a^2 \operatorname{Var}(X)
\end{aligned}
$$

If $$X$$ and $$Y$$ are independent, also:

$$
\begin{aligned}
E(XY) &= E(X)\,E(Y) \\
\operatorname{Var}(X \pm Y) &= \operatorname{Var}(X) + \operatorname{Var}(Y)
\end{aligned}
$$

- The rule for $$E(X + Y)$$ holds for any two random variables, independent or not. The rule for $$E(XY)$$ needs independence.
- Adding $$b$$ moves every value by the same amount, so the spread does not change. Multiplying by $$a$$ scales the variance by $$a^2$$ and the SD by $$|a|$$.
- Subtracting a variable still adds its variance, because $$\operatorname{Var}(-Y) = (-1)^2 \operatorname{Var}(Y) = \operatorname{Var}(Y)$$.

### Proof of the shortcut formula (slide 4)

$$
\begin{aligned}
\operatorname{Var}(X) &= E\big[(X - \mu)^2\big] \\
&= E\big[X^2 - 2\mu X + \mu^2\big] \\
&= E(X^2) - 2\mu\,E(X) + \mu^2 \\
&= E(X^2) - 2\mu^2 + \mu^2 \\
&= E(X^2) - \big[E(X)\big]^2
\end{aligned}
$$

- The steps use two rules: the expectation of a sum is the sum of the expectations, and constants come out of $$E$$.

### Covariance (slides 5–6)
- Covariance measures whether two random variables tend to move together.

$$
\begin{aligned}
\operatorname{Cov}(X, Y) &= E\big\{[X - E(X)][Y - E(Y)]\big\} \\
&= E(XY) - E(X)\,E(Y)
\end{aligned}
$$

- Positive covariance means large $$X$$ values tend to come with large $$Y$$ values, and small with small. Negative covariance means large $$X$$ values tend to come with small $$Y$$ values.
- If $$X$$ and $$Y$$ are independent, $$\operatorname{Cov}(X, Y) = 0$$, because then $$E(XY) = E(X)E(Y)$$.
- The variance of a sum carries a covariance term. The constant $$c$$ drops out, and if $$X$$ and $$Y$$ are independent the covariance term is 0.

$$
\begin{aligned}
\operatorname{Var}(X + Y) &= \operatorname{Var}(X) + \operatorname{Var}(Y) \\
&\quad + 2\operatorname{Cov}(X, Y) \\[4pt]
\operatorname{Var}(aX + bY + c) &= a^2\operatorname{Var}(X) + b^2\operatorname{Var}(Y) \\
&\quad + 2ab\operatorname{Cov}(X, Y)
\end{aligned}
$$

### Examples 8 and 9 (slides 7–8)
- Both use $$\operatorname{Var}(X) = 5$$, $$\operatorname{Var}(Y) = 10$$ and $$\operatorname{Cov}(X, Y) = 2$$.
- Example 8, $$W = 2X + 3Y$$:

$$
\begin{aligned}
\operatorname{Var}(W) &= 2^2(5) + 3^2(10) + 2(2)(3)(2) \\
&= 20 + 90 + 24 = 134
\end{aligned}
$$

- Example 9, $$U = 2X - Y$$, so $$b = -1$$:

$$
\begin{aligned}
\operatorname{Var}(U) &= 2^2(5) + (-1)^2(10) + 2(2)(-1)(2) \\
&= 20 + 10 - 8 = 22
\end{aligned}
$$

- The minus sign changes only the covariance term. The variance terms are always added.

### Sums of independent random variables (slides 9–10)
- Repeating an experiment independently gives independent random variables $$X_1, \dots, X_n$$. A linear combination is $$Y = a_1X_1 + \dots + a_nX_n$$, where the $$a_i$$ are constants.

$$
\begin{aligned}
E(Y) &= \sum_{i=1}^{n} a_i\,E(X_i) \\
\operatorname{Var}(Y) &= \sum_{i=1}^{n} a_i^2 \operatorname{Var}(X_i)
\end{aligned}
$$

- The variance formula needs independence, which makes every covariance term 0.
- If every $$X_i$$ has the same mean $$\mu$$ and the same variance $$\sigma^2$$, the deck calls the sequence a random sample, and

$$
\begin{aligned}
E(Y) &= \Big(\sum a_i\Big)\mu \\
\operatorname{Var}(Y) &= \Big(\sum a_i^2\Big)\sigma^2
\end{aligned}
$$

### The average $$\bar{X}$$ (slides 11–12)
- $$\bar{X} = \frac{X_1 + \dots + X_n}{n}$$ is a linear combination with every $$a_i = \frac{1}{n}$$.

$$
\begin{aligned}
E(\bar{X}) &= \frac{1}{n}\big(\mu + \dots + \mu\big) \\
&= \frac{1}{n}(n\mu) = \mu \\[6pt]
\operatorname{Var}(\bar{X}) &= \frac{1}{n^2}\big(\sigma^2 + \dots + \sigma^2\big) \\
&= \frac{1}{n^2}(n\sigma^2) = \frac{\sigma^2}{n}
\end{aligned}
$$

- The $$\frac{1}{n}$$ comes out of the variance as $$\frac{1}{n^2}$$, and independence lets the variances add.
- So an average of $$n$$ independent values has the same mean as one value and a variance $$n$$ times smaller.

### The maximum of independent random variables (slides 13–15)
- $$V = \max\{X_1, \dots, X_n\}$$ models the lifetime of a system of $$n$$ components in parallel, where $$X_i$$ is the lifetime of component $$i$$ and the system runs until the last one fails. It also models the highest flood level of a river over the next $$n$$ years, where $$X_i$$ is the highest level in year $$i$$.
- cdf: $$V \le v$$ exactly when every $$X_i \le v$$, so independence lets the probabilities multiply.

$$
\begin{aligned}
F_V(v) &= P(X_1 \le v)\,P(X_2 \le v)\cdots P(X_n \le v) \\
&= F_{X_1}(v)\,F_{X_2}(v)\cdots F_{X_n}(v)
\end{aligned}
$$

- If the $$X_i$$ are identically distributed, meaning they all have the same cdf $$F_X$$, the product becomes a power. Differentiating with the chain rule gives the pdf.

$$
\begin{aligned}
F_V(v) &= \big[F_X(v)\big]^n \\
f_V(v) &= n\big[F_X(v)\big]^{n-1} f_X(v)
\end{aligned}
$$

### The minimum (not on any slide)
- The deck's title promises the minimum, but no slide covers it. He said in class that the minimum is taught on Wednesday Oct 7, in lecture 12, because Monday is the activity.
- A series system dies at the first failure, so its lifetime is $$U = \min\{X_1, \dots, X_n\}$$. $$U > u$$ exactly when every component still works at $$u$$.

$$
\begin{aligned}
P(U > u) &= \big[1 - F_X(u)\big]^n \\
F_U(u) &= 1 - \big[1 - F_X(u)\big]^n \\
f_U(u) &= n\big[1 - F_X(u)\big]^{n-1} f_X(u)
\end{aligned}
$$

### Next class
- Lecture 11 is activities and examples on Chapter 4.
- Complete the Chapter 4 pre-activity worksheet (Activity 3) before that class. It is posted under the lecture 11 materials, and the class will ask questions about it. Your Things3 already has it as a to-do.
- Lecture 12, on Wednesday Oct 7, finishes the maximum and covers the minimum, with more examples.

## In class
- The class reached slide 13: the parallel system and the definition of the cdf of the maximum. The rest of the maximum and all of the minimum move to Wednesday Oct 7.
- iClicker on lecture 9's material: $$X$$ is continuous with pdf $$f$$, cdf $$F$$ and median $$m$$. The options were $$F(m) = 0.5$$, $$\int_{-\infty}^{m} f(x)\,dx = 0.5$$ and $$\int_{m}^{\infty} f(x)\,dx = 0.5$$. The answer was (e), all of them, and 79% got it.
  - The three say the same thing in different notation. The median splits the area under $$f$$ in half.
  - He warned against stopping at the first true option. Read every option before answering.
- He worked Example 8 on the board, $$\operatorname{Var}(2X + 3Y) = 134$$. Example 9 was an iClicker, $$\operatorname{Var}(2X - Y) = 22$$, answer (c), and 81% got it.
- What he said about exams:
  - He will not ask you to compute a covariance from scratch on an exam, so its definition does not need to go on your cheat sheet. Know $$\operatorname{Cov}(X, Y) = E(XY) - E(X)E(Y)$$ and what its sign means.
  - For the cheat sheet, write only the general formula for $$\operatorname{Var}(aX + bY + c)$$ plus the fact that independence makes the covariance 0. That covers every special case on the slides.
  - He allows a cheat sheet because building a good one forces you to understand the material.
- Covariance gives only the direction of a linear relationship, not its strength. The sample covariance and the correlation come with Chapter 11, together with Chapter 2.
- When a question says "random sample", the random variables are independent and identically distributed, often written iid. Independent means no value affects another. Identically distributed means they all come from the same distribution, so they share one mean and one variance. His example was the grades of randomly chosen students from a distribution with mean 78 and SD 8.
- Before you observe a random variable its value is random. After you observe it, it is just a number, called an observed value.
- Parallel system example: four components each last between 0 and 100 hours.
  - With lifetimes 78, 10, 88 and 2 hours, the system runs for 88 hours.
  - With lifetimes 15, 95, 91 and 18 hours, it runs for 95 hours.
  - So the system lifetime is the maximum, which is itself a random variable between 0 and 100.
- He does not teach integration or differentiation. The calculus prerequisite covers them.
- A short video finishing lecture 9, and solution files for the mean and variance of the uniform and the exponential, are on the lecture 9 Canvas page. He said the exponential one is harder than it looks.
- Nobody asked about WeBWorK 2 in his office hours. He urged using office hours or Piazza, because a mistake you never ask about comes back on the exam.

## Clarifications
- $$E(\bar{X}) = \mu$$ uses only the rule for the mean of a sum, so it holds without independence. $$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$$ needs independence.
- For two independent values with the same variance $$\sigma^2$$, $$\operatorname{Var}(X_1 + X_2) = 2\sigma^2$$, but $$\operatorname{Var}(2X_1) = 4\sigma^2$$. A sum of independent values varies less than one value doubled, because their deviations partly cancel.
- The deck states one direction only: independent random variables have covariance 0.

Questions: 14 in [02-questions.md](../02-questions.md) under "Lec 10", and 3 under "Long problems". Ledger: 3 topics.
