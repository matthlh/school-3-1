# STAT 251 — Lec 3 (Mon Sep 14) — Ch 1: histograms, describing a distribution, mean and median, range

## Your notes (pasted 2026-09-14)
Stats Notes:

* Histograms (covered range, num of intervals, width of interval, freq table)
   * Can have empty blocks of data*
   * Types of mounds (Unimodal, bimodal, multimodal) -> describes the peaks
   * Shape: symmetrical (bell curve), right/left skewed (btw skewed is the lower point going into higher point)
      * Center: where it's clusterede, spread assess the spread of a distribution
      * Still don't know what spread and center really means and how it's defined
* Mean, Medium
   * Makes sense but depending on the skew, mean <=> median. When skewed, median is prefered as it's the relative mean.
* Detached housing question

## Clarifications

### Centre and spread (the flagged confusion)
- Centre is one number standing in for a typical value. The deck's wording is "where the observations cluster". The two measures so far are the mean and the median.
- Spread is how far the observations sit from each other, or from the centre. The deck calls it variation, variability or dispersion. The only measure so far is the range. Variance, standard deviation and the interquartile range come next class, with the boxplot that displays them.
- Centre and spread are separate features, so one number cannot describe a distribution. The sets 48, 49, 50, 51, 52 and 30, 40, 50, 60, 70 both have mean and median 50, but their ranges are 4 and 40.

### Skew is named after the tail, not the peak
- "Lower point going into higher point" is not the definition. The direction of the skew is the direction the long tail points.
- Right-skewed: the long tail stretches to the right, toward the high values, and the peak sits on the left. Incomes and house prices look like this.
- Left-skewed: the long tail stretches to the left, toward the low values, and the peak sits on the right. Scores on an easy exam look like this.
- Symmetric: the two halves are mirror images. The bell curve is one symmetric shape, not the only one.
- Mound type is a separate description and only counts the clear peaks: unimodal has one, bimodal two, multimodal more than two.

### Mean versus median
- It is median, not medium.
- "The median is the relative mean" is not a thing. The median is preferred for skewed data because it is resistant: a few extreme values drag the mean into the long tail but barely move the median, so the median is the better picture of a typical observation.
- Direction of the pull: a long right tail gives mean > median, a long left tail gives mean < median, and a nearly symmetric distribution gives mean ≈ median.
- Median rule from the deck: order the data. For odd n take the (n + 1)/2-th value. For even n average the n/2-th and (n/2 + 1)-th values.
- The sample mean is written x̄ and is the sum of the observations divided by n.

### Empty intervals
- A histogram interval with no observations stays on the axis with a bar of height zero. The gap is information, the same reason an empty stem stays in a stem-and-leaf plot.

### Outliers and the range (in the deck, not on your page)
- An outlier is an observation far from the rest of the data, unusually large or unusually small.
- The range is the largest value minus the smallest. It uses only two observations, so one outlier changes it completely.

### Detached housing question
- This was an iClicker question, not in the posted deck: the shape of the distribution of detached house prices. The answer was (c), right-skewed.
- Why: most houses sell in a middle band and a few very expensive ones stretch the tail to the right, toward the high values. Those few pull the mean above the median, so the median is the figure for a typical house and is what real-estate boards report.

Questions: 14 in [02-questions.md](../02-questions.md) under "Lec 3". Ledger: 3 topics, due Sep 15.
