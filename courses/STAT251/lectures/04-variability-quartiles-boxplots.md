# STAT 251 — Lec 4 (Wed Sep 16) — Ch 1: variability, percentiles and quartiles, box plots

Your page from Sep 16 comes first. The clarifications below it work through the after-class deck, `Lecture_04_Chapter_1_AL_CanvasPost.pdf` (13 slides), slide by slide. Everything was checked against the deck and the Panopto recording on 2026-10-05, and what the class added is under In class.

## Your notes (pasted 2026-09-16)

* Standard deviation
* IQR interquartile Range IQR = Q3 - Q1 : if outliers use this?
* Median is a better estimate than mean for skews / outliers?
* Q1 = first quartiles
* Q3  = 75th percentise
* Quantifying outlier: falls more than 1.5 x IQR below first qurtile or more then 1.5 X QIR above 3rd quartile
* tf is a quantile?
   * sample quantile p, Q_(p) is a number with the property that appox. p100% of the dat apoints smaller than it
   * To find Q, sort first
   * What's the formula, I didn't catch it (np + 0.5)
* Box plot (5 num smmary):
   * need min, max, Q1, Q3, median
* Also you know about the pre lecture slides and post right? Anyway to incorporate that into my process?
   * Lecture materials posted here (idk if this will help https://canvas.ubc.ca/courses/193293)
   * Drawing the box
      * Q1 left, q3 right, median line in the box (Sometimes it changes no), ig it depends on the outliers right?
      * min is left whisker (1.5 IQR min btw)
      * max is right whisker (1.5 IQR max btw)
      * star / circle for outlier
   * Box plots are better for making graphical comparisons of two ore more distributions?

## In class
- The variance carries squared units. In the deck example it is 2.5 hours squared, and the standard deviation is about 1.581 hours. He insisted on units in every answer.
- Each squared deviation is 0 or positive, so the variance can never be negative. A negative variance or standard deviation means an arithmetic mistake, and the standard deviation is always the positive square root.
- He drew two smooth curves with the same centre on one scale and asked which may be taller. The narrower one has to be taller, because the area under each curve is the total probability, 1. A narrow curve drawn with a lower peak is wrong. This is a Chapter 4 idea, previewed here.
- Percentile rank: if a score of 1200 on a test out of 1600 is at the 90th percentile, then 90% of test takers scored below it, so it is in the top 10%.
- Use the course's $$np + 0.5$$ rule for quartiles and percentiles, not a formula from high school or from software, especially in WeBWorK. On small data sets other rules give slightly different answers. He called the 0.5 a correction factor.
- Notation: $$x_i$$ is the $$i$$th observation in the order recorded, while $$x_{(i)}$$, with brackets, is the $$i$$th smallest after sorting, called an order statistic.
- You cannot read the mean off a box plot, because the plot is built from the five-number summary and never uses the mean.
- On the chemistry and physics box plots, the physics median was about 65 and the chemistry median about 73, and the whole physics box sat lower, so the physics exam looked harder.
- iClicker: a box plot of the exam scores for a statistics course. If every score goes up by 5 points, which is true? The answer was (e), all of these.
  - The third quartile goes up by 5 points.
  - The median goes up by 5 points.
  - The interquartile range does not change, because $$Q_3$$ and $$Q_1$$ both move up by 5.
- The lecture ended on that iClicker. Slides 11 and 12, on location and scale changes and a box plot of right-skewed simulated data, opened lecture 5.

## Clarifications

### Standard deviation
- The sample variance is the sum of the squared deviations from the mean, divided by one less than the sample size. The deck also gives a shortcut form.

$$
\begin{aligned}
s^2 &= \frac{\sum (x_i - \bar{x})^2}{n - 1} \\[4pt]
&= \frac{\sum x_i^2 - n\bar{x}^2}{n - 1}
\end{aligned}
$$

- The sample standard deviation is $$s = \sqrt{s^2}$$. Quote $$s$$, not $$s^2$$, because $$s$$ is in the same units as the data while the variance is in squared units.
- Deck example: 4, 6, 8, 7, 5 hours. The mean is 6, the deviations are $$-2, 0, 2, 1, -1$$, and their squares are 4, 0, 4, 1, 1 with sum 10.

$$
\begin{aligned}
s^2 &= \frac{10}{4} = 2.5 \text{ hours}^2 \\
s &= \sqrt{2.5} \approx 1.58 \text{ hours}
\end{aligned}
$$

- $$s$$ is never negative, and $$s = 0$$ only when every observation is the same value. It grows as the spread grows.
- $$s$$ is not resistant. Strong skew or a few outliers inflate it, for the same reason they drag the mean.

### Which spread measure goes with which centre
- Yes. When the data are skewed or have outliers, report the median with the IQR. Both are set by positions in the sorted data, so a far-out value cannot move them much.
- When the data are roughly symmetric with no outliers, report the mean with $$s$$. They use every value, and the two pairs agree closely anyway.
- The range is the weakest measure of spread because it is built from the two most extreme values only.
- The median is preferred for skewed data because it is resistant, not because it is a kind of mean.

### Percentile, quartile, quantile: one idea, three names
- The $$p$$th percentile is a value with $$p$$ percent of the observations at or below it. $$Q_1$$ is the 25th percentile, the median is the 50th (also called $$Q_2$$) and $$Q_3$$ is the 75th.
- A quantile is the same thing with $$p$$ written as a fraction: $$Q(0.25)$$ is the 25th percentile, which is $$Q_1$$.
- The deck's rule for computing $$Q(p)$$: sort the data so that $$x_{(1)} \le x_{(2)} \le \dots \le x_{(n)}$$, where $$x_{(i)}$$ is the $$i$$th order statistic, the $$i$$th smallest value. Then compute $$np + 0.5$$.
- If $$np + 0.5$$ is an integer $$m$$, then $$Q(p) = x_{(m)}$$, the $$m$$th smallest value.
- If $$np + 0.5$$ is not an integer and lies between $$m$$ and $$m + 1$$, then $$Q(p)$$ is the plain average of the two neighbouring values. It is not a weighted interpolation: whether $$np + 0.5$$ is 5.1 or 5.9, the answer is the same average.

$$
Q(p) = \frac{x_{(m)} + x_{(m+1)}}{2}
$$

- Example with the deck's 20 values (12 up to 59):
  - For $$p = 0.25$$, $$np + 0.5 = 5.5$$, so $$Q_1 = \frac{x_{(5)} + x_{(6)}}{2} = \frac{22 + 24}{2} = 23$$.
  - For $$p = 0.5$$ it is 10.5, so the median is $$\frac{29 + 30}{2} = 29.5$$.
  - For $$p = 0.75$$ it is 15.5, so $$Q_3 = \frac{35 + 35}{2} = 35$$.
  - The IQR is $$35 - 23 = 12$$.
- The deck's other description, $$Q_1$$ as the median of the lower half and $$Q_3$$ as the median of the upper half, gives the same numbers here but not for every data set. The deck warns that different textbooks and software use slightly different quartile rules. The $$np + 0.5$$ rule is the procedure the deck states, so use it on a computation question unless the question fixes another rule.

### Outlier rule
- The note is right: an observation is an outlier if it falls more than $$1.5 \times \text{IQR}$$ below $$Q_1$$ or more than $$1.5 \times \text{IQR}$$ above $$Q_3$$. The two cut-offs are called the fences.

$$
\begin{aligned}
\text{lower fence} &= Q_1 - 1.5 \times \text{IQR} \\
\text{upper fence} &= Q_3 + 1.5 \times \text{IQR}
\end{aligned}
$$

- With $$Q_1 = 23$$ and $$Q_3 = 35$$, the IQR is 12 and $$1.5 \times \text{IQR} = 18$$, so the fences are 5 and 53. In the deck's data the 59 is an outlier and nothing else is.

### Drawing the box plot
- The five-number summary is the minimum, $$Q_1$$, the median, $$Q_3$$ and the maximum.
- The box runs from $$Q_1$$ to $$Q_3$$, so its length is the IQR, and the median is a line inside it.
- The median line sits wherever the median falls. It is in the centre of the box only when the middle half of the data is symmetric, and it does not move because of outliers, since the median is resistant. A median line near $$Q_1$$ with a long right whisker means right-skewed; near $$Q_3$$ with a long left whisker means left-skewed. That is the "sometimes it changes".
- The whiskers do not run to the fences, and they do not automatically run to the minimum and maximum. Each whisker ends at the most extreme observation that is still inside its fence. With no outliers that is the minimum and the maximum. With outliers the whisker stops at the last non-outlier, and the outliers are drawn as separate stars or circles beyond it.
- Deck example: box from 23 to 35 with the line at 29.5, left whisker to 12, right whisker to 42 (the largest value at or under 53), and a star at 59.

### Box plots versus histograms
- Yes. Side-by-side box plots on one scale compare the centre, spread, skew and outliers of two or more groups at a glance, which histograms do badly.
- The price is shape. A box plot cannot show whether a distribution is unimodal or bimodal, so for the shape of one distribution use a histogram.

### Location and scale changes (deck only, not on the page)
- The class reached these slides at the start of lecture 5.
- If every observation is transformed by $$y = a + bx$$, the mean and variance change like this:

$$
\begin{aligned}
\bar{y} &= a + b\,\bar{x} \\
s_y^2 &= b^2 s_x^2 \\
s_y &= |b|\, s_x
\end{aligned}
$$

- Adding a constant shifts the centre and leaves the spread alone. Multiplying by a constant scales the centre by $$b$$ and the spread by $$|b|$$.
- Celsius to Fahrenheit is $$y = 32 + \frac{9}{5}x$$: the mean converts like a temperature, the variance is multiplied by $$\left(\frac{9}{5}\right)^2 = 3.24$$, and $$s$$ by 1.8.

### Next class
- Chapter 3, Sets and Probability. Chapter 2 (bivariate data) is skipped for now; the schedule puts it with Chapter 11 at the end of the term.

Questions: 17 in [02-questions.md](../02-questions.md) under "Lec 4", and 1 under "Long problems". Ledger: 3 topics.
