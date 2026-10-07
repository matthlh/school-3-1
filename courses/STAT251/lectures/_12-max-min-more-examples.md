# STAT 251 — Lec 12 (Wed Oct 7) — Ch 4: the maximum and minimum of independent random variables, functions of one random variable

No page from you yet, and no recording yet. This file is the posted after-class deck organised for study, `Lecture_12_Chapter_4_Canvas_Post_AL.pdf` (18 slides, Canvas file 47723753). It finishes the maximum from lecture 10, adds the minimum, and works four examples. The answer files for Examples 9, 10 and 11 are scanned handwriting with no text layer, so those three are worked here from scratch; Example 12 is worked in the deck itself.

## Learning goals (slide 2)
- Slide 2 repeats the Chapter 4 outcome list. The one this lecture covers is the last: the maximum and minimum of independent random variables.
- Derive the cdf and pdf of the maximum, and of the minimum, of $$n$$ independent random variables, with and without the identically distributed assumption.
- Match the maximum to a parallel system and the minimum to a series system.
- Find the distribution of a function of one random variable by the cdf method: write $$F_Y$$ as a probability statement about $$X$$, then differentiate.

## Slides, organized
### Where the maximum and the minimum come up (slides 3 and 6)
- The maximum $$V = \max\{X_1, \dots, X_n\}$$ of $$n$$ independent random variables models two things on the slides.
  - The lifetime of a system of $$n$$ components connected in parallel, where $$X_i$$ is the lifetime of component $$i$$. The system runs until the last component fails.
  - The highest flood level of a river over the next $$n$$ years, where $$X_i$$ is the highest level in year $$i$$.
- The minimum $$U = \min\{X_1, \dots, X_n\}$$ models the mirror images.
  - The lifetime of a system of $$n$$ components connected in series. The system dies at the first failure.
  - The lowest flood level of a river over the next $$n$$ years.

### The cdf and pdf of the maximum (slides 4–5)
- Setup: $$X_1, \dots, X_n$$ are independent and identically distributed, each with pdf $$f_X$$ and cdf $$F_X$$.
- The cdf comes first. $$V \le v$$ happens exactly when every $$X_i \le v$$, because if the largest is at most $$v$$ then all of them are. Independence turns the joint probability into a product, and identical distributions turn the product into a power.

$$
\begin{aligned}
F_V(v) &= P(V \le v) \\
&= P(X_1 \le v, \dots, X_n \le v) \\
&= P(X_1 \le v) \cdots P(X_n \le v) \\
&= F_{X_1}(v) \cdots F_{X_n}(v) \\
&= \big[F_X(v)\big]^n
\end{aligned}
$$

- The pdf is the derivative of the cdf. The chain rule brings down the power and multiplies by the derivative of $$F_X$$, which is $$f_X$$.

$$
\begin{aligned}
f_V(v) &= \frac{d}{dv}\big[F_X(v)\big]^n \\
&= n\big[F_X(v)\big]^{n-1} f_X(v)
\end{aligned}
$$

- When the $$X_i$$ are independent but not identically distributed, stop at the product line. The cdf is $$F_{X_1}(v) \cdots F_{X_n}(v)$$ and the pdf comes from the product rule, not the chain rule. Example 12 does this for $$n = 2$$.

### The cdf and pdf of the minimum (slides 7–8)
- The event $$U \le u$$ is awkward, because the smallest being at most $$u$$ says nothing about the others. Its complement is easy: $$U > u$$ happens exactly when every $$X_i > u$$. So the cdf of the minimum goes through the complement.

$$
\begin{aligned}
F_U(u) &= P(U \le u) \\
&= 1 - P(U > u) \\
&= 1 - P(X_1 > u, \dots, X_n > u) \\
&= 1 - P(X_1 > u) \cdots P(X_n > u) \\
&= 1 - \big[1 - F_{X_1}(u)\big] \cdots \big[1 - F_{X_n}(u)\big] \\
&= 1 - \big[1 - F_X(u)\big]^n
\end{aligned}
$$

- The pdf again comes from the chain rule. The derivative of $$1 - F_X(u)$$ is $$-f_X(u)$$, and that minus sign cancels the minus sign in front, so the pdf is positive.

$$
\begin{aligned}
f_U(u) &= \frac{d}{du}\Big\{1 - \big[1 - F_X(u)\big]^n\Big\} \\
&= 0 - n\big[1 - F_X(u)\big]^{n-1}\big(-f_X(u)\big) \\
&= n\big[1 - F_X(u)\big]^{n-1} f_X(u)
\end{aligned}
$$

- Side by side, the two results differ only in whether $$F_X$$ or $$1 - F_X$$ is raised to the power. The maximum raises the chance of being below, and the minimum raises the chance of being above.

### Example 9: $$Y = e^X$$ for a uniform $$X$$ (slide 9)
- $$X$$ is uniform on $$[-1, 1]$$, so $$f_X(x) = \frac{1}{2}$$ there and $$F_X(x) = \frac{x + 1}{2}$$ for $$-1 \le x \le 1$$.
- The cdf method: write $$Y \le y$$ as a statement about $$X$$. Because $$e^x$$ is increasing, $$e^X \le y$$ exactly when $$X \le \ln y$$.
- The support of $$Y$$ is the image of the support of $$X$$: $$X$$ runs from $$-1$$ to $$1$$, so $$Y$$ runs from $$e^{-1}$$ to $$e$$.

$$
\begin{aligned}
F_Y(y) &= P(e^X \le y) \\
&= P(X \le \ln y) \\
&= \frac{\ln y + 1}{2} \\[4pt]
f_Y(y) &= \frac{d}{dy}\,\frac{\ln y + 1}{2} \\
&= \frac{1}{2y}
\end{aligned}
$$

- So $$f_Y(y) = \frac{1}{2y}$$ for $$e^{-1} \le y \le e$$ and 0 otherwise. Outside that interval $$F_Y$$ is 0 below $$e^{-1}$$ and 1 above $$e$$.
- Check: the area is $$\frac{1}{2}\big(\ln e - \ln e^{-1}\big) = \frac{1}{2}(1 + 1) = 1$$.

### Example 10: $$Y = X^2$$ needs both roots (slide 10)
- $$f_X(x) = \frac{x^2}{18}$$ for $$-3 \le x \le 3$$ and 0 otherwise. $$Y = X^2$$ runs from 0 to 9.
- $$X^2 \le y$$ is not $$X \le \sqrt{y}$$. It is $$-\sqrt{y} \le X \le \sqrt{y}$$, because negative values of $$X$$ square to the same $$y$$. So the cdf of $$Y$$ is an integral of $$f_X$$ between the two roots.

$$
\begin{aligned}
F_Y(y) &= P(X^2 \le y) \\
&= P(-\sqrt{y} \le X \le \sqrt{y}) \\
&= \int_{-\sqrt{y}}^{\sqrt{y}} \frac{t^2}{18}\,dt \\
&= \left[\frac{t^3}{54}\right]_{-\sqrt{y}}^{\sqrt{y}} \\
&= \frac{y^{3/2} + y^{3/2}}{54} \\
&= \frac{y^{3/2}}{27}
\end{aligned}
$$

- (i) Differentiate for the pdf.

$$
\begin{aligned}
f_Y(y) &= \frac{d}{dy}\,\frac{y^{3/2}}{27} \\
&= \frac{3}{2}\cdot\frac{y^{1/2}}{27} \\
&= \frac{\sqrt{y}}{18}
\end{aligned}
$$

- So $$f_Y(y) = \frac{\sqrt{y}}{18}$$ for $$0 \le y \le 9$$ and 0 otherwise. Check: $$\int_0^9 \frac{\sqrt{y}}{18}\,dy = \frac{2}{3}\cdot\frac{27}{18} = 1$$.
- (ii) The upper tail comes from the cdf.

$$
\begin{aligned}
P(Y > 4) &= 1 - F_Y(4) \\
&= 1 - \frac{4^{3/2}}{27} \\
&= 1 - \frac{8}{27} = \frac{19}{27} \approx 0.704
\end{aligned}
$$

- The same number comes straight from $$X$$: $$Y > 4$$ means $$|X| > 2$$, and $$2\int_2^3 \frac{x^2}{18}\,dx = 2 \cdot \frac{27 - 8}{54} = \frac{19}{27}$$. Use this as a check on an exam.

### Example 11: the maximum and minimum of exponentials (slide 11)
- $$X_1, \dots, X_n$$ are independent, each exponential with rate $$\lambda$$, so $$f_X(x) = \lambda e^{-\lambda x}$$ and $$F_X(x) = 1 - e^{-\lambda x}$$ for $$x > 0$$.
- (i) The maximum $$Y$$ uses the general formula directly. The result is not an exponential pdf.

$$
\begin{aligned}
F_Y(y) &= \big(1 - e^{-\lambda y}\big)^n \\
f_Y(y) &= n\big(1 - e^{-\lambda y}\big)^{n-1}\lambda e^{-\lambda y}
\end{aligned}
$$

- (ii) The minimum $$W$$ simplifies, because $$1 - F_X(w) = e^{-\lambda w}$$ and a power of an exponential is an exponential.

$$
\begin{aligned}
F_W(w) &= 1 - \big(e^{-\lambda w}\big)^n \\
&= 1 - e^{-n\lambda w} \\
f_W(w) &= n\lambda e^{-n\lambda w}
\end{aligned}
$$

- So the minimum of $$n$$ independent $$\text{Exp}(\lambda)$$ lifetimes is $$\text{Exp}(n\lambda)$$, with mean $$\frac{1}{n\lambda}$$. A series system of $$n$$ identical exponential components fails $$n$$ times as fast as one component.
- Both pdfs are for $$y > 0$$ and $$w > 0$$, and 0 otherwise.

### Example 12: the maximum of two different uniforms (slides 12–17)
- $$X_1 \sim U(20, 40)$$ and $$X_2 \sim U(35, 50)$$ are independent, and $$Y = \max\{X_1, X_2\}$$. The two are not identically distributed, so the cdf of $$Y$$ is the product of two different cdfs, not a power.
- Slides 13 and 14 build each cdf by integrating the constant pdf.

$$
\begin{aligned}
f_{X_1}(x_1) &= \frac{1}{40 - 20} = \frac{1}{20} \\
F_{X_1}(x_1) &= \int_{20}^{x_1} \frac{1}{20}\,dt = \frac{x_1 - 20}{20} \\[4pt]
f_{X_2}(x_2) &= \frac{1}{50 - 35} = \frac{1}{15} \\
F_{X_2}(x_2) &= \frac{x_2 - 35}{15}
\end{aligned}
$$

- Each cdf is 0 below its interval and 1 above it: $$F_{X_1}$$ is 0 for $$x_1 < 20$$ and 1 for $$x_1 > 40$$, and $$F_{X_2}$$ is 0 for $$x_2 < 35$$ and 1 for $$x_2 > 50$$.
- The support of $$Y$$ is $$[35, 50]$$. $$Y$$ is never below 35 because $$X_2$$ is never below 35, and never above 50 because neither variable is.
- Slide 15 multiplies the cdfs on the stretch where both are between 0 and 1, which is $$35 \le y \le 40$$.

$$
\begin{aligned}
F_Y(y) &= P(X_1 \le y)\,P(X_2 \le y) \\
&= F_{X_1}(y)\,F_{X_2}(y) \\
&= \frac{y - 20}{20}\cdot\frac{y - 35}{15}
\end{aligned}
$$

- The cdf is piecewise because the two cdfs change formula at different points. Slide 16 gives all four pieces. For $$40 < y \le 50$$, $$F_{X_1}(y) = 1$$ so only $$F_{X_2}$$ remains.

$$
F_Y(y) =
\begin{cases}
0 & y < 35 \\[2pt]
\dfrac{(y - 20)(y - 35)}{300} & 35 \le y \le 40 \\[6pt]
\dfrac{y - 35}{15} & 40 < y \le 50 \\[6pt]
1 & y > 50
\end{cases}
$$

- Slide 17 differentiates each piece. The middle piece is a product of two linear factors, so the product rule gives two terms, which then combine.

$$
\begin{aligned}
f_Y(y) &= \frac{y - 20}{20}\cdot\frac{1}{15} + \frac{y - 35}{15}\cdot\frac{1}{20} \\
&= \frac{(y - 20) + (y - 35)}{300} \\
&= \frac{2y - 55}{300} \qquad (35 \le y \le 40)
\end{aligned}
$$

- The full pdf is $$f_Y(y) = \frac{2y - 55}{300}$$ for $$35 \le y \le 40$$, $$\frac{1}{15}$$ for $$40 < y \le 50$$, and 0 otherwise.
- Check: the area of the first piece is $$\left[\frac{y^2 - 55y}{300}\right]_{35}^{40} = \frac{-600 + 700}{300} = \frac{1}{3}$$, and the second piece is $$\frac{10}{15} = \frac{2}{3}$$. They sum to 1.

### Next class (slide 18)
- Review lecture 12 and the related textbook sections before the next class.
- The next class starts Chapter 5, the normal distribution.

## Clarifications
- Slide 14 writes $$x_1$$ where it means $$x_2$$ in the support of $$X_2$$. The interval is $$35 \le x_2 \le 50$$, as the formulas on slides 15 to 17 assume.
- Slide 15 gives the cdf of $$Y$$ only for $$35 \le y \le 40$$. It is not the whole cdf; the four-piece version on slide 16 is, and the pdf on slide 17 comes from differentiating every piece.
- In Example 10 the deck does not say why the cdf uses both roots. $$X^2 \le y$$ means $$|X| \le \sqrt{y}$$, and the pdf of $$X$$ puts probability on negative values, so $$P(X \le \sqrt{y})$$ alone is wrong.
- The deck leaves the supports of the pdfs in Examples 9 to 11 implicit. They are $$e^{-1} \le y \le e$$, $$0 \le y \le 9$$, and $$y > 0$$ or $$w > 0$$.

Questions: 5 in [02-questions.md](../02-questions.md) under "Lec 12", and 3 under "Long problems". Ledger: 1 new topic, 3l, plus the existing 3m–n row.
