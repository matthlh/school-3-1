# STAT 251 — Lec 11 (Mon Oct 5) — Ch 4: in-class Activity 3, expectation and variance of discrete random variables

No page from you for this one, and you skipped the class. This file covers everything on the lecture 11 Canvas page: the 3-slide deck, the pre-activity worksheet, the Part A and Part B activity sheets, and the three solution files. Every number below matches the posted solutions. The recording was not up yet when this was logged. 6 questions in the bank.

## What the class is
- The whole lecture is in-class Activity 3, Parts A and B, on the expectation and variance of discrete random variables.
- The pre-activity worksheet had to be done before class, and the clicker questions in class were built on it.
- The next class covers more on continuous random variables, the max and min of independent random variables, and another activity.

## The setup
- An irregular four-sided die has faces $$-3$$, $$-1$$, $$1$$ and $$2$$.
- $$X$$ is the number rolled. Its pmf is $$2a$$, $$3a$$, $$a$$ and $$4a$$ in face order, so the faces are not equally likely.
- The probabilities must add to 1, which gives the constant.

$$
\begin{aligned}
2a + 3a + a + 4a &= 1 \\
10a &= 1 \\
a &= \frac{1}{10}
\end{aligned}
$$

- So $$P(X = -3) = 0.2$$, $$P(X = -1) = 0.3$$, $$P(X = 1) = 0.1$$ and $$P(X = 2) = 0.4$$. Each is between 0 and 1, which is the second condition a pmf must meet.

## Pre-activity worksheet
### Mean and variance of X

$$
\begin{aligned}
E(X) &= -3(0.2) - 1(0.3) \\
&\quad + 1(0.1) + 2(0.4) \\
&= -0.6 - 0.3 + 0.1 + 0.8 \\
&= 0
\end{aligned}
$$

$$
\begin{aligned}
E(X^2) &= 9(0.2) + 1(0.3) \\
&\quad + 1(0.1) + 4(0.4) \\
&= 3.8 \\
\operatorname{Var}(X) &= E(X^2) - [E(X)]^2 \\
&= 3.8 - 0^2 = 3.8
\end{aligned}
$$

- The game is fair on average: the expected winning is $$0$$ dollars.

### A linear function, $$Y = 2X - 1$$
- The pmf of $$Y$$ keeps the probabilities and moves the values: $$Y$$ takes $$-7$$, $$-3$$, $$1$$ and $$3$$ with probabilities 0.2, 0.3, 0.1 and 0.4.
- From the pmf directly, $$E(Y) = -1.4 - 0.9 + 0.1 + 1.2 = -1$$ and $$E(Y^2) = 9.8 + 2.7 + 0.1 + 3.6 = 16.2$$, so $$\operatorname{Var}(Y) = 16.2 - 1 = 15.2$$.
- The linear rules give the same answers in one line each:

$$
\begin{aligned}
E(2X - 1) &= 2E(X) - 1 = -1 \\
\operatorname{Var}(2X - 1) &= 2^2 \operatorname{Var}(X) \\
&= 4(3.8) = 15.2
\end{aligned}
$$

- This is the worksheet's point: the rules are the fast route, and the pmf route is the check.
- The $$-1$$ shifts the mean but drops out of the variance, because shifting every value by the same amount does not change the spread.

### A non-linear function, $$M = X^3$$
- No linear rule applies, so $$E(X^3)$$ comes from the pmf.

$$
\begin{aligned}
E(X^3) &= -27(0.2) - 1(0.3) \\
&\quad + 1(0.1) + 8(0.4) \\
&= -5.4 - 0.3 + 0.1 + 3.2 \\
&= -2.4
\end{aligned}
$$

- $$[E(X)]^3 = 0$$, so $$E(X^3) \ne [E(X)]^3$$. In general $$E[g(X)] \ne g(E(X))$$ unless $$g$$ is linear.

## Part A: Game A, the sum of two rolls
- Game A: roll the die twice, and the winning $$W_A = X_1 + X_2$$ is the sum. The two rolls are independent.
- The table of sums, first roll down the side and second roll across the top:

| First \ Second | -3 | -1 | 1 | 2 |
|---|---|---|---|---|
| -3 | -6 | -4 | -2 | -1 |
| -1 | -4 | -2 | 0 | 1 |
| 1 | -2 | 0 | 2 | 3 |
| 2 | -1 | 1 | 3 | 4 |

- Each cell's probability is the product of the two face probabilities, because the rolls are independent. Add the cells that give the same sum.
- The sum $$-6$$ needs two $$-3$$s, so $$f(-6) = 0.2^2 = 0.04$$.
- The sum $$-2$$ comes from $$(-3, 1)$$, $$(1, -3)$$ and $$(-1, -1)$$.

$$
\begin{aligned}
f(-2) &= 2(0.2)(0.1) + 0.3^2 \\
&= 0.04 + 0.09 = 0.13
\end{aligned}
$$

- The full pmf of $$W_A$$:

| $$w_A$$ | -6 | -4 | -2 | -1 | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|---|---|---|---|
| $$f(w_A)$$ | 0.04 | 0.12 | 0.13 | 0.16 | 0.06 | 0.24 | 0.01 | 0.08 | 0.16 |

- The probabilities add to 1, which is the check.
- From the pmf, $$E(W_A) = \sum w_A f(w_A) = 0$$.
- The faster way uses the rule that expectations always add: $$E(X_1 + X_2) = E(X_1) + E(X_2) = 0 + 0 = 0$$.
- The variance uses independence: variances add for independent variables.

$$
\begin{aligned}
\operatorname{Var}(W_A) &= \operatorname{Var}(X_1) + \operatorname{Var}(X_2) \\
&= 3.8 + 3.8 = 7.6
\end{aligned}
$$

- The pmf route gives the same 7.6: $$E(W_A^2) = 7.6$$ and the mean is 0.

## Part B: Game B, twice one roll
- Game B: roll once, and the winning $$W_B = 2X$$ is twice the face.
- $$W_B$$ takes $$-6$$, $$-2$$, $$2$$ and $$4$$ with probabilities 0.2, 0.3, 0.1 and 0.4.
- $$E(W_B) = -1.2 - 0.6 + 0.2 + 1.6 = 0$$, or in one line $$E(2X) = 2E(X) = 0$$.

$$
\begin{aligned}
\operatorname{Var}(W_B) &= 2^2 \operatorname{Var}(X) \\
&= 4(3.8) = 15.2
\end{aligned}
$$

## Comparing the two games
- The expected winnings are equal: both are 0.
- Game B's variance, 15.2, is twice Game A's, 7.6. Game B is the riskier game.
- The general rule, for $$X_1, \dots, X_n$$ independent with the same distribution as $$X$$ and variance $$\sigma^2$$:

$$
\begin{aligned}
\operatorname{Var}(X_1 + \cdots + X_n) &= n\sigma^2 \\
\operatorname{Var}(nX) &= n^2 \sigma^2
\end{aligned}
$$

- So $$nX$$ has the larger variance whenever $$n > 1$$. Adding independent rolls lets highs and lows partly cancel; multiplying one roll scales every deviation by $$n$$, so nothing cancels.
- This is the trap the activity is built around: $$X_1 + X_2$$ and $$2X$$ have the same mean but not the same variance.

## Clarifications
- The deck says Parts A and B are both covered in this one lecture, although the Part A sheet says to bring it back next class for Part B.
- The pre-activity solution's equations are images, so only its tables could be read. The tables match this file, including $$Y$$ taking $$-7$$, $$-3$$, $$1$$ and $$3$$.
- Lecture 12's deck (`Lecture_12_Chapter_4.pdf`) is already on the page but locked. Next class covers more on continuous random variables, the max and min of independent random variables, and another in-class activity.
