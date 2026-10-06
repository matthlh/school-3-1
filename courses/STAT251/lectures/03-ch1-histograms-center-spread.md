# STAT 251 — Lec 3 (Mon Sep 14) — Ch 1: histograms, describing a distribution, mean and median, range

Your page from Sep 14 comes first. Below it is the deck, `Lecture_03_Chapter_1_CanvasPost.pdf` (11 slides), organised for study and checked against the Panopto recording on 2026-10-05, then what happened in class and the clarifications to your page.

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

## Slides, organized
### Finishing the histogram (slides 2–3)
- The example is lecture 2's: the hours worked by 25 students, range 90, five intervals of width 20 starting at 170, with frequencies 1, 2, 7, 10 and 5.
- There is no fixed rule for the number of intervals. The rule of thumb is 5 to 15, and a large data set can have more.
- Too few intervals hide the shape, since two bars cannot describe anything. Too many fail as well: 25 values spread over 10 intervals leave most bars at 0 or 1.
- Five or six intervals give much the same picture for this data. Software such as R may pick different intervals, and that is fine.
- A value that sits exactly on a boundary goes in the interval where it is the upper end, and the same rule holds at every boundary. In the example, 230 is counted in 210 to 230 and 250 in 230 to 250, not in 250 to 270. That is how the deck's counts come out.
- A table of intervals with their counts is still called a frequency table.
- Slide 3 repeats lecture 2's construction steps, ending with labelling both axes and giving the graph a title.

### Describing a distribution (slides 4–6)
- The type of mound counts the clear peaks: unimodal has one, bimodal two and multimodal more than two.
- Shape:
  - Symmetric means the left and right halves are mirror images. Real data are never exactly symmetric, so roughly symmetric counts.
  - Skewed to the right means the right tail is longer than the left tail.
  - Skewed to the left means the left tail is longer than the right tail.
- The centre is where the observations cluster, which is where the tallest bars are.
- The spread is how spread out the observations are.
- An outlier is an observation far from the rest of the data, unusually large or unusually small. On a histogram outliers show up as a few bars cut off from the rest by empty intervals. Lecture 4 gives the rule for deciding.

### The mean (slide 7)
- The sample mean is the sum of the observations divided by how many there are.

$$
\bar{x} = \frac{x_1 + x_2 + \dots + x_n}{n} = \frac{1}{n}\sum_{i=1}^{n} x_i
$$

- Deck example: five students study 4, 6, 8, 7 and 5 hours a week.

$$
\begin{aligned}
\bar{x} &= \frac{4 + 6 + 8 + 7 + 5}{5} \\
&= \frac{30}{5} = 6 \text{ hours}
\end{aligned}
$$

- Always keep the units. An answer of 6 alone does not say whether it is hours, minutes or days, and he counts it as incomplete.

### The median (slide 8)
- The median is the middle of the observations once they are sorted from smallest to largest, so it splits the data into two halves with the same number of values.
- For odd $$n$$ it is the $$\frac{n+1}{2}$$-th value. For even $$n$$ it is the average of the $$\frac{n}{2}$$-th and $$\left(\frac{n}{2} + 1\right)$$-th values.
- Example 1: the list 12, 14, 15, 17, 20, 24, 24, 27, 29 has $$n = 9$$, so the median is the 5th value, 20.
- Example 2: the same list with 30 added has $$n = 10$$, so the median is the average of the 5th and 6th values, $$\frac{20 + 24}{2} = 22$$.
- With odd $$n$$ the median is always one of the data values. With even $$n$$ it may not be, and 22 is not in the list.

### Comparing the mean and the median (slide 9)
- Nearly symmetric data give $$\text{mean} \approx \text{median}$$. The two are equal in theory and close in real data.
- In a skewed distribution the mean sits farther out in the long tail than the median.
  - A long right tail gives $$\text{mean} > \text{median}$$.
  - A long left tail gives $$\text{mean} < \text{median}$$.
- The reason is that the few values in the tail are extreme, and the mean adds up every value, so they pull it toward the tail. The median depends only on the middle position.
- For skewed data the median is preferred, because it better represents a typical observation.
- His example: in a large company, regular employees quote the median salary and management quotes the mean, which a few very high salaries pull up.

### The range (slide 10)
- Knowing the centre is not enough. Two classes can both average 80 while one has marks from 70 to 90 and the other from 60 to 100. Measures of variation, also called spread, variability or dispersion, describe that difference.
- The range is the largest value minus the smallest.

$$
\text{range} = x_{\text{largest}} - x_{\text{smallest}}
$$

- Deck example: the data 70, 46, 62, 64, 15, 78, 56, 64, 69, 49 have range $$78 - 15 = 63$$.
- The range is strongly affected by outliers, because it uses only the two most extreme values. The variance, the standard deviation and the IQR follow in lecture 4.

## In class
- iClicker points count from this lecture on: one point for answering and one for the right answer.
- iClicker: a relative frequency histogram of systolic blood pressure for 200 people. How many had a reading below 130? The answer was (e), 150, and 90% got it.
  - Add the relative frequencies of the bars below 130, which were about 0.15, 0.35 and 0.25.
  - Multiply that sum by the number of people.

$$
\begin{aligned}
0.15 + 0.35 + 0.25 &= 0.75 \\
0.75 \times 200 &= 150
\end{aligned}
$$

- iClicker: a bar chart of the percentage of students in each college, namely Biological Sciences, Math and Physical Sciences, Engineering and Business. Is it left-skewed? The answer was (d), none of the options.
  - Skewness is never described for a bar chart, because the categories can be put in any order.
  - A dot plot was also offered, but a dot plot needs the numerical values, not counts of categories.
- iClicker, the detached housing question on your page: the distribution of detached house prices in Vancouver is right-skewed, answer (c).
  - Most houses sell below about $5 million and the cheapest are around $1 million, but a few sell for tens of millions, up to about $85 million. The long tail is on the right.
  - Those few expensive houses pull the mean above the median, so the median is the better figure for a typical house.
  - He said he will not ask this kind of question on an exam, because it needs knowledge of the housing market.
- He asked everyone to talk to their neighbours during iClicker questions, because discussing an answer helps it stay in memory.

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
- The rules for computing both are under Slides, organized.

### Empty intervals
- A histogram interval with no observations stays on the axis with a bar of height zero. The gap is information, the same reason an empty stem stays in a stem-and-leaf plot. He confirmed in class that a histogram can have such gaps.

Questions: 22 in [02-questions.md](../02-questions.md) under "Lec 3". Ledger: 3 topics.
