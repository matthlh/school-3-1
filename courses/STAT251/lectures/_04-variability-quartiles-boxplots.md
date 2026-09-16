# STAT 251 — Lecture 4 (pre-lecture outline)

Wed Sep 16, 08:00–08:50, CIRS 1250. Chapter 1, Summary and Display of Univariate Data (contd.).
Written from the `BL` deck posted before class (`Lecture_04_Chapter_1_BL_CanvasPost.pdf`, 12 slides).
The `AL` version posted after the lecture adds worked solutions to the in-class examples.

## What the deck covers

- The range is the largest value minus the smallest value, and it is strongly affected by outliers.
- Measures of variability describe the spread of the data, so two data sets can share a centre and still differ in variation.
- The sample variance and the sample standard deviation are introduced together, with a worked example on the hours five students spent studying (4, 6, 8, 7, 5).
- The standard deviation `s` is zero only when every observation has the same value, and it grows as the spread grows.
- `s` carries the same units as the original observations, while the variance `s²` carries those units squared.
- `s` is not resistant, so strong skewness or a few outliers can inflate it badly.
- The interquartile range is the length of the interval holding the middle 50% of the data, defined as Q3 minus Q1.
- Q1 is the 25th percentile and Q3 is the 75th percentile, and each is the median of one half of the split data.
- The median is also the 50th percentile, or second quartile Q2.
- Different software packages and textbooks use slightly different quartile rules, so answers can vary by source.
- The pth percentile is a value with p percent of the observations at or below it.
- An observation counts as an outlier when it falls more than 1.5 × IQR below Q1 or more than 1.5 × IQR above Q3.
- The sample quantile of order p is computed by sorting the data, then forming the number np + 0.5: if that number is an integer m the quantile is the mth order statistic, and otherwise it is interpolated between the mth and (m+1)th order statistics.
- A box plot displays five summary measures: the smallest observation, Q1, the median, Q3 and the largest observation.
- The whiskers reach the smallest and largest observations that lie within 1.5 × IQR, and anything beyond them is plotted as an outlier.
- Side-by-side box plots are the tool for comparing two or more distributions, though they hide the shape of a distribution in a way histograms do not.
- A worked example builds a box plot from twenty values running 12 to 59.
- The last slide asks how a location or scale change, such as converting Celsius to Fahrenheit, affects the mean and the variance.
- The deck ends by naming the next class: Chapter 3, Sets and Probability.

## Three pre-lecture questions

1. The standard deviation and the IQR both measure spread. Which one survives a single extreme outlier intact, and what is it about the definition that makes it resistant?
2. You convert a Celsius data set to Fahrenheit with y = 1.8x + 32. What happens to the mean, and what happens to the variance? Say which of the two constants matters for each.
3. Twenty exam marks have Q1 = 22 and Q3 = 35. Which marks would the 1.5 × IQR rule flag as outliers, and where would the box plot's whiskers actually end?
