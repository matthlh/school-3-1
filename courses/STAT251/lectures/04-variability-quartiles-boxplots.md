# STAT 251 — Lec 4 (Wed Sep 16) — Ch 1: variability, percentiles and quartiles, box plots

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

## Clarifications

### Standard deviation
- The sample variance is s² = Σ(xᵢ − x̄)² / (n − 1): the sum of the squared deviations from the mean, divided by one less than the sample size. The deck also gives the shortcut form s² = (Σxᵢ² − n x̄²) / (n − 1).
- The sample standard deviation is s = √s². Quote s, not s², because s is in the same units as the data while the variance is in squared units.
- Deck example: 4, 6, 8, 7, 5 hours. The mean is 6, the deviations are −2, 0, 2, 1, −1, their squares are 4, 0, 4, 1, 1 with sum 10, so s² = 10/4 = 2.5 and s ≈ 1.58 hours.
- s is never negative, and s = 0 only when every observation is the same value. It grows as the spread grows.
- s is not resistant. Strong skew or a few outliers inflate it, for the same reason they drag the mean.

### Which spread measure goes with which centre
- Yes. When the data are skewed or have outliers, report the median with the IQR. Both are set by positions in the sorted data, so a far-out value cannot move them much.
- When the data are roughly symmetric with no outliers, report the mean with s. They use every value, and the two pairs agree closely anyway.
- The range is the weakest measure of spread because it is built from the two most extreme values only.
- The median is preferred for skewed data because it is resistant, not because it is a kind of mean.

### Percentile, quartile, quantile: one idea, three names
- The pth percentile is a value with p percent of the observations at or below it. Q1 is the 25th percentile, the median is the 50th (also called Q2) and Q3 is the 75th.
- A quantile is the same thing with p written as a fraction: Q(0.25) is the 25th percentile, which is Q1.
- The deck's rule for computing Q(p): sort the data so that x₍₁₎ ≤ x₍₂₎ ≤ … ≤ x₍ₙ₎ (x₍ᵢ₎ is the ith order statistic, the ith smallest value), then compute np + 0.5.
- If np + 0.5 is an integer m, then Q(p) = x₍ₘ₎, the mth smallest value.
- If np + 0.5 is not an integer and lies between m and m + 1, then Q(p) = (x₍ₘ₎ + x₍ₘ₊₁₎) / 2, the plain average of the two neighbouring values. It is not a weighted interpolation: whether np + 0.5 is 5.1 or 5.9, the answer is the same average.
- Example with the deck's 20 values (12 up to 59). For p = 0.25, np + 0.5 = 5.5, so Q1 = (x₍₅₎ + x₍₆₎)/2 = (22 + 24)/2 = 23. For p = 0.5 it is 10.5, so the median is (29 + 30)/2 = 29.5. For p = 0.75 it is 15.5, so Q3 = (35 + 35)/2 = 35. The IQR is 35 − 23 = 12.
- The deck's other description, Q1 as the median of the lower half and Q3 as the median of the upper half, gives the same numbers here but not for every data set. The deck warns that different textbooks and software use slightly different quartile rules. The np + 0.5 rule is the procedure the deck states, so use it on a computation question unless the question fixes another rule.

### Outlier rule
- The note is right: an observation is an outlier if it falls more than 1.5 × IQR below Q1 or more than 1.5 × IQR above Q3. The two cut-offs, Q1 − 1.5 × IQR and Q3 + 1.5 × IQR, are called the fences.
- With Q1 = 23 and Q3 = 35, the IQR is 12 and 1.5 × IQR is 18, so the fences are 5 and 53. In the deck's data the 59 is an outlier and nothing else is.

### Drawing the box plot
- The five-number summary is the minimum, Q1, the median, Q3 and the maximum.
- The box runs from Q1 to Q3, so its length is the IQR, and the median is a line inside it.
- The median line sits wherever the median falls. It is in the centre of the box only when the middle half of the data is symmetric, and it does not move because of outliers, since the median is resistant. A median line near Q1 with a long right whisker means right-skewed; near Q3 with a long left whisker means left-skewed. That is the "sometimes it changes".
- The whiskers do not run to the fences, and they do not automatically run to the minimum and maximum. Each whisker ends at the most extreme observation that is still inside its fence. With no outliers that is the minimum and the maximum. With outliers the whisker stops at the last non-outlier, and the outliers are drawn as separate stars or circles beyond it.
- Deck example: box from 23 to 35 with the line at 29.5, left whisker to 12, right whisker to 42 (the largest value at or under 53), and a star at 59.

### Box plots versus histograms
- Yes. Side-by-side box plots on one scale compare the centre, spread, skew and outliers of two or more groups at a glance, which histograms do badly.
- The price is shape. A box plot cannot show whether a distribution is unimodal or bimodal, so for the shape of one distribution use a histogram.

### Location and scale changes (deck only, not on the page)
- If every observation is transformed by y = a + bx, the mean becomes ȳ = a + b x̄ and the variance becomes s_y² = b² s_x², so s_y = |b| s_x.
- Adding a constant shifts the centre and leaves the spread alone. Multiplying by a constant scales the centre by b and the spread by |b|.
- Celsius to Fahrenheit is y = 32 + (9/5)x: the mean converts like a temperature, the variance is multiplied by (9/5)² = 3.24, and s by 1.8.

### Next class
- Chapter 3, Sets and Probability. Chapter 2 (bivariate data) is skipped for now; the schedule puts it with Chapter 11 at the end of the term.

Questions: 13 in [02-questions.md](../02-questions.md) under "Lec 4". Ledger: 3 topics, due Sep 17.
