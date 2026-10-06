# STAT251 — Question Bank

Claude's source of truth for quizzing. Grows every lecture.
Tag each question with its topic so the ledger and the bank stay linked.

Format:
```
### Q: <question>
**Topic:** <topic name>  **Lec:** <n>  **Type:** recall | apply | derive | critique
**A:** <answer>
```

A problem that needs paper goes under `## Long problems` at the end of this file instead of its lecture's section: a table or tree to build, an integral, a list of ten or more values, or a chain of three or more results that feed each other. It keeps its usual **Lec:** tag, and its answer opens with a numbered Steps list, which is what a normal quiz grades it on. The bus deck never shows it. New lecture and WeBWorK sections go above it.

---

## Lec 1–2 — Ch 1: data types, descriptive vs inferential, basic displays (logged 2026-09-11)

### Q: Classify each variable as categorical-nominal, categorical-ordinal, discrete, or continuous: (a) number of siblings (b) height in cm (c) blood type (d) letter grade (e) postal code (f) time to run 100 m.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** apply
**A:**
- (a) discrete
- (b) continuous
- (c) nominal
- (d) ordinal
- (e) nominal — the digits are labels, arithmetic on them is meaningless
- (f) continuous.

### Q: State the test that decides whether a numerical variable is discrete or continuous.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** derive
**A:**
- Discrete: the possible values are countable (you can list them 0, 1, 2, …), typically counts.
- Continuous: between any two possible values there is always another, so it can take any value in an interval. Typically measurements.

Rounding height to whole cm does not make it discrete; the underlying quantity decides.

### Q: A poll of 1,000 Canadians finds 52% support a policy; the headline says "a majority of Canadians support it". Which part is descriptive, which is inferential, and what does the inferential part need that the descriptive part doesn't?
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** apply
**A:** "52% of the 1,000" is descriptive — it summarises the data in hand. "Majority of Canadians" is inferential — it generalises from sample to population. Inference needs a statement of uncertainty (margin of error / confidence, Ch 8) and an assumption about how the sample was drawn; description needs neither.

### Q: Define descriptive and inferential statistics in one line each, and name the object each one makes claims about.
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** recall
**A:**
- Descriptive: methods to organise, display and summarise the data you actually have. Claims about the sample or data set.
- Inferential: methods to draw conclusions, predictions or decisions from a sample. Claims about the population (its parameters), estimated from sample statistics.

### Q: Bar chart vs histogram — name two structural differences and the data type each is for.
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** recall
**A:**
- Bar chart: categorical data. One bar per category, gaps between bars, category order arbitrary unless ordinal.
- Histogram: numerical data grouped into bins. Bars touch, order fixed by the number line, bin width is a choice you make.

### Q: You have 25 integer scores ranging from 1 to 12. Dot plot or histogram? Justify.
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** apply
**A:** Dot plot. Small n and only ~12 distinct values, so every observation can be shown individually — repeats, gaps and outliers stay visible and no binning decision is imposed. A histogram would either merge values (losing information) or degenerate into a dot plot drawn with bars.

### Q: What can you read off a stem-and-leaf plot that you cannot read off a histogram of the same data? What's the cost?
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** recall
**A:** The actual data values — hence the exact median, min, max and any individual observation — while still seeing shape (skew, modes, outliers). Cost: only practical for small data sets, and the stem unit fixes the bin width so you can't tune resolution freely.

### Q: Build a stem-and-leaf plot for 23, 27, 31, 34, 34, 38, 42, 45, 51 and read off the median.
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** derive
**A:** Stem = tens, leaf = units.

| Stem | Leaves |
|---|---|
| 2 | 3 7 |
| 3 | 1 4 4 8 |
| 4 | 2 5 |
| 5 | 1 |

Key: 2 | 3 = 23. With $$n = 9$$ the median is the 5th ordered value, which is 34.

### Q: When is a pie chart defensible, and when is a bar chart strictly better?
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** critique
**A:**
- Pie: one categorical variable, categories are parts of a single whole, few categories (about 5 or fewer), and the message is "share of total".
- Bar chart wins when you must compare category sizes precisely, there are many categories, or you compare across groups. People judge lengths far more accurately than angles or areas.

### Q: A frequency table has a relative-frequency column. How is it computed, what must it sum to, and why bother when you already have counts?
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** apply
**A:** Relative frequency is the count divided by n, and the column sums to 1 (100%). It puts data sets of different sizes on one scale so distributions can be compared. It is also the empirical version of a probability distribution, which Ch 3–4 use directly.

### Q: Write the two-step decision procedure for classifying any variable, then apply it to: marital status, finishing position in a race (1st/2nd/3rd), finishing time.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** derive
**A:**
1. Does arithmetic on the values (differences, averages) mean anything? If no, it is categorical: nominal if there is no natural order, ordinal if there is.
2. If yes, it is numerical: discrete if the possible values form a countable list (counts), continuous if it can take any value in an interval (measurements).

Marital status: nominal. Race position: ordinal (ordered, but the gap from 1st to 2nd is not a fixed quantity). Finishing time: continuous.

### Q: Why is a postal code categorical even though it is made of letters and digits, and which kind of categorical? Give two other "numbers that are really labels".
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** apply
**A:** Arithmetic on it is meaningless — an "average postal code" or V6T + V5K has no interpretation; the characters identify an area, they don't measure anything. Nominal (no natural order). Others: student number, phone number, jersey number, SIN, product ID.

### Q: A student classifies "number of stars in a product review (1–5)" as discrete "because it's a count". What is the better classification and why?
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** critique
**A:** Ordinal categorical. The stars are ranks, not counts of anything: 4 stars is not "twice" 2 stars, and the gap from 1 to 2 need not equal the gap from 4 to 5. Same for Likert scales (strongly disagree … strongly agree). Rule: numbers used as ordered labels are ordinal, not discrete.

### Q: Classify: (a) T-shirt size (S/M/L/XL) (b) phone number (c) temperature in °C (d) number of goals in a match (e) eye colour (f) pain rating 0–10.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** apply
**A:**
- (a) ordinal
- (b) nominal
- (c) continuous
- (d) discrete
- (e) nominal
- (f) ordinal — a rating scale, ranks not counts.

### Q: For each variable name the display you would reach for and why: letter grade (A/B/C/D/F), study time in hours, pass/fail.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** apply
**A:**
- Letter grade: ordinal, so a bar chart with bars in grade order (order matters, gaps between bars).
- Study time: continuous, so a histogram (bins on a number line, bars touch), or a dot plot if n is small.
- Pass/fail: nominal and binary, so a bar chart. A pie is defensible with only two parts of one whole.

### Q: For each statement, descriptive or inferential? Name the word that gives away each inferential one. (a) "The mean height of the 40 students in this class is 172 cm." (b) "Based on this class, UBC students average about 172 cm." (c) "Of 500 sampled bulbs, 3 were defective." (d) "The factory's defect rate is about 0.6% ± 0.7%."
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** apply
**A:**
- (a) descriptive — a fact about the data in hand.
- (b) inferential — "UBC students" names a population larger than the 40 measured.
- (c) descriptive.
- (d) inferential — "the factory's rate" is a population parameter, and the ± is the uncertainty inference must carry. Giveaway: the claim reaches beyond the units actually measured, or attaches a margin of error.

### Q: Define population, sample, parameter, statistic, and say which pair descriptive statistics works with and which pair inference connects.
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** recall
**A:**
- Population: the whole group of interest.
- Sample: the subset actually measured.
- Parameter: a number describing the population ($$\mu$$, $$p$$, $$\sigma$$), usually unknown.
- Statistic: a number computed from the sample ($$\bar{x}$$, $$\hat{p}$$, $$s$$).

Descriptive statistics works with the sample and its statistics. Inference uses a statistic to make a claim about the parameter, from sample to population.

### Q: A student says "descriptive statistics are the objective facts; inferential statistics are guesses." Correct each definition in one sentence, and name what inference adds so that it is not a guess.
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** critique
**A:**
- Descriptive: methods to organise, display and summarise the data you have (tables, graphs, mean, SD). Claims only about that data.
- Inferential: methods to draw conclusions about a population from a sample.

It is not a guess because it quantifies its own uncertainty (a margin of error and confidence level, or a p-value), computed under an explicit assumption about how the sample was drawn, such as random sampling.

### Q: Give an example where the descriptive summary is perfectly correct but any inference from it is worthless, and say what that shows inference depends on.
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** apply
**A:** A poll of 1,000 visitors to a political party's website finds 52% support the party. "52% of these 1,000" is exactly right as a description; "52% of Canadians" is worthless because the sample is self-selected, not representative. Inference depends on how the sample was collected — random sampling is what justifies generalising and what lets you compute the uncertainty.

### Q: If a census measures every member of the population, is there any inferential statistics left to do about that population? Explain.
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** critique
**A:** No. The "sample" is the population, so each statistic *is* the parameter and there is no sampling uncertainty — it is all descriptive. Inference reappears only if you want to generalise beyond the census (to next year, to a process, to a larger population).

### Q: You have 25 observations with minimum 175 and maximum 265 and want 5 intervals. Walk through building the histogram: range, interval width, what goes in the frequency table, and how the bars are drawn.
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** derive
**A:** $$\text{Range} = 265 - 175 = 90$$. $$\text{Width} = 90 \div 5 = 18$$ (the deck then rounds to convenient equal-width bins 170–190, 190–210, … 250–270). Cut the range into equal-width intervals, count the observations in each to make the frequency table, then draw one bar per interval with height equal to its frequency (or relative frequency); bars touch because the axis is a number line. Label both axes and give a heading. A value that sits exactly on a boundary is counted in the interval where it is the upper end, so 230 goes in 210–230; lecture 3 gave that rule.

### Q: The lecture-2 slides split variables into categorical and quantitative. Give both definitions, then classify: number of siblings, county of residence, commute distance in km, blood type.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** apply
**A:** Categorical: each observation belongs to one of a set of categories. Quantitative: observations take numerical values that represent different magnitudes of the variable. Siblings: quantitative, discrete. County: categorical, nominal. Commute km: quantitative, continuous. Blood type: categorical, nominal. The deck says "quantitative" where the notes say "numerical"; same thing.

### Q: State the deck's definitions of a discrete and a continuous quantitative variable, and give the three one-line characterisations of statistics from the "What is Statistics?" slide.
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** recall
**A:** Discrete: the possible values form a set of separate numbers, such as 0, 1, 2, 3, …. Continuous: the possible values form an interval. Statistics is (1) a science involving the design of studies, data collection, summarising and analysing data, interpreting results and drawing conclusions; (2) the science of learning from data and of measuring, controlling and communicating uncertainty; (3) a branch of applied mathematics dealing with data collection, organisation, analysis, interpretation and presentation.

### Q: Construct a dot plot for the midterm scores 10, 90, 95, 100, 65, 50, 60, 50, 90, 55, 60, 70 and read off the mode or modes.
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** derive
**A:** Horizontal number line labelled "Grade" from 0 to 100, one dot per score stacked above its value: 10 (1), 50 (2), 55 (1), 60 (2), 65 (1), 70 (1), 90 (2), 95 (1), 100 (1). $$n = 12$$. Three modes: 50, 60 and 90, each twice.

### Q: Give the symbols for the population mean, standard deviation and proportion, and for each one's sample version. Which are parameters, which are statistics, and which can you usually compute?
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** recall
**A:**
- The population mean $$\mu$$, the population standard deviation $$\sigma$$ and the population proportion $$p$$ are parameters. They describe the population.
- The sample mean $$\bar{x}$$, the sample standard deviation $$s$$ and the sample proportion $$\hat{p}$$ are statistics. They are computed from the sample.
- You can always compute the statistics from the data in hand. The parameters are usually unknown, because the population is too large, or infinite, to measure in full, and inference uses the statistics to estimate them.

### Q: Which of these is continuous? (a) the number of people waiting in a line (b) the number of speeding tickets a driver has (c) the weight of a dog (d) shoe size, sold in half sizes. Justify each.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** apply
**A:**
- (a) Discrete, because it is a count.
- (b) Discrete, because it is a count.
- (c) Continuous. A weight can take any value in an interval, and recording it to one decimal only reflects the scale's precision.
- (d) Discrete. The sizes 6, 6.5 and 7 are separate values with no size in between, even though some are not whole numbers.
- Only (c) is continuous. This was the lecture 2 iClicker, and (d) is his example of a discrete variable with fractions.

### Q: A stem-and-leaf plot says the leaf unit is 10. What value does the row 5 | 7 stand for, and can the value 692 be shown exactly? What does 5 | 7 mean if the leaf unit is 0.1?
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** apply
**A:**
- With a leaf unit of 10, the leaf counts tens and the stem counts hundreds, so 5 | 7 is 570.
- 692 cannot be shown exactly. It goes on stem 6 with leaf 9, which stands for 690, so the last digit is lost.
- With a leaf unit of 0.1, the row 5 | 7 is 5.7.
- When no leaf unit is stated, it is 1.

### Q: A survey question has 25 possible answers. Pie chart or bar chart, and how would you make the bars easiest to compare? Then say how exam percentages, which are numerical, could be shown in a pie chart at all.
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** apply
**A:**
- A bar chart. A pie with 25 slices cannot be read, while bar heights are easy to compare. This was the lecture 2 iClicker.
- Sort the bars from tallest to shortest. A sorted bar graph is called a Pareto chart.
- Exam percentages must first be grouped into categories, such as letter-grade bands. Each band then gets a slice sized by its percentage of students, and the percentages add to 100%.

## Lec 3 — Ch 1: histograms, shape, mean and median, range (logged 2026-09-14)

### Q: A histogram of household incomes peaks near $60k and has a tail stretching out to $500k. Name the shape, say which side the tail is on and where the peak sits, and state whether the mean is above or below the median. Justify the last part.
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** apply
**A:** Right-skewed (skewed to the right). The long tail is on the right, toward the high values, and the peak sits on the left. Mean > median: the few very large incomes add a lot to the sum, so the mean is dragged into the tail, while the median depends only on the middle of the ordered list and barely moves.

### Q: A student says "right-skewed means the hump is on the right side of the histogram." Correct the statement and give the rule for naming a skew.
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** critique
**A:** Wrong way round. Skew is named after the long tail, not the peak: a right-skewed histogram has its long tail pointing right and its hump on the left. Rule: find the side with the longer, thinner tail; that side names the skew. Symmetric means the two sides are mirror images.

### Q: Define unimodal, bimodal and multimodal. Heights of all UBC students, men and women pooled, come out bimodal. Why, and what does that suggest you should do before summarising with one mean?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** apply
**A:** The type of mound counts the clear peaks: unimodal one, bimodal two, multimodal more than two. Two peaks usually mean two subpopulations with different centres have been mixed, here men and women. A single mean would land between the two peaks and describe almost nobody, so split the groups and summarise each.

### Q: A frequency table for five equal-width intervals reads 1, 2, 0, 10, 5. Do you drop the empty interval when you draw the histogram? What must the bar heights add to, and why do the bars touch?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** apply
**A:** No. The interval stays on the axis with a bar of height zero, so the gap in the data is visible, the same reason an empty stem stays in a stem-and-leaf plot. The heights add to $$n = 18$$ (or to 1 if you plotted relative frequencies). Bars touch because the horizontal axis is a continuous number line and adjacent intervals share an endpoint.

### Q: Exam scores: 95, 92, 90, 88, 85, 84, 80, 60, 40. Without drawing anything, say which way this is skewed, then compute the mean and median and check that they agree with your answer.
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** derive
**A:** Most scores are high with two stragglers far below, so the long tail is on the left: left-skewed. The sum is 714 and $$n = 9$$, so $$\bar{x} = \frac{714}{9} \approx 79.3$$. The median is the 5th ordered value, 85. $$\text{Mean} < \text{median}$$, which is the signature of a left tail.

### Q: 40 observations run from 3.2 to 9.8 and you want 6 intervals. Compute the width, propose convenient equal-width intervals that cover the data, and state what the frequency column must sum to. What changes if you use 12 intervals instead?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** derive
**A:** $$\text{Range} = 9.8 - 3.2 = 6.6$$, so $$\text{width} = \frac{6.6}{6} = 1.1$$. Round to a convenient width that still covers the data, for example 1.2 starting at 3.0: 3.0–4.2, 4.2–5.4, 5.4–6.6, 6.6–7.8, 7.8–9.0, 9.0–10.2, and say which endpoint each interval includes so a boundary value is counted once. The counts sum to $$n = 40$$. With 12 intervals the width halves to about 0.55: more detail but bumpier bars and more near-empty intervals. The number of intervals is a choice, and it changes how the shape looks.

### Q: State the median rule for odd and even n. Apply it to 12, 14, 15, 17, 20, 24, 24, 27, 29, then to the same list with 30 appended.
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** derive
**A:** Order the data first. Odd $$n$$: the median is the $$\frac{n+1}{2}$$-th value. Even $$n$$: average the $$\frac{n}{2}$$-th and $$\left(\frac{n}{2}+1\right)$$-th values. For $$n = 9$$ the median is the 5th value, 20. With 30 appended $$n = 10$$, so average the 5th and 6th values: $$\frac{20 + 24}{2} = 22$$.

### Q: The deck's example 4, 6, 8, 7, 5 hours has mean 6. Replace the 8 with 80 and recompute the mean and the median. What property of the median does this show, and what are the sample mean's symbol and formula?
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** derive
**A:** Original: ordered 4, 5, 6, 7, 8, mean $$\frac{30}{5} = 6$$, median 6. After: 4, 5, 6, 7, 80, mean $$\frac{102}{5} = 20.4$$, median still 6. The median is resistant to extreme values; the mean is not. The sample mean is $$\bar{x} = \frac{x_1 + \dots + x_n}{n}$$, the sum of the observations divided by how many there are.

### Q: "The median is preferred for skewed data because it is the relative mean." Fix the reason, then give two situations where the mean is the better choice.
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** critique
**A:** There is no "relative mean". The median is preferred because it is resistant: extreme values in the long tail drag the mean toward them, so the median stays closer to a typical observation. The mean is better when the distribution is roughly symmetric with no outliers (then $$\text{mean} \approx \text{median}$$ and the mean uses every value), and when you need a total, since $$\text{mean} \times n$$ gives the sum (total revenue, total hours).

### Q: A real-estate board reports that detached houses sold last month had a mean price of $2.4M and a median of $1.7M. What does the gap tell you about the shape of the price distribution, what causes it, and which number describes a typical house?
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** apply
**A:** Mean well above median means a long right tail: right-skewed. A few very expensive houses add a lot to the sum and pull the mean up, while the median only tracks the middle sale. The median describes the typical house; the mean is inflated by the top end. Symmetric data would show $$\text{mean} \approx \text{median}$$, and $$\text{mean} < \text{median}$$ would mean a left tail.

### Q: Compute the mean, median and range of 48, 49, 50, 51, 52 and of 30, 40, 50, 60, 70. What does the comparison prove about describing a distribution?
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** derive
**A:** First set: mean 50, median 50, range 4. Second set: mean 50, median 50, range 40. Centre and spread are separate features: two data sets can share a centre and differ completely in spread, so a measure of centre alone does not describe a distribution.

### Q: Define an outlier as the deck does. Compute the range of 70, 46, 62, 64, 15, 78, 56, 64, 69, 49, then recompute it with the 15 removed. What does that show, and which of mean and median reacts the same way?
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** apply
**A:** An outlier is an observation far from the rest of the data, unusually large or unusually small. $$\text{Range} = 78 - 15 = 63$$. Without the 15 the minimum is 46 and the range is $$78 - 46 = 32$$. One observation halved it, because the range uses only the two extremes. The mean reacts the same way, pulled toward the outlier; the median barely moves.

### Q: Define centre and spread in one sentence each, name every measure of each you have so far, and say which measures and which display come next class.
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** recall
**A:** Centre is a single value standing for a typical observation, where the data cluster: the measures so far are the mean and the median. Spread is how far the observations sit from each other or from the centre, also called variability or dispersion: the only measure so far is the range. Next class adds variance, standard deviation and the interquartile range, plus the boxplot that displays the median, quartiles and outliers.


### Q: A lab reports "range: 12 to 41". Is that the range as the course defines it? Give the correct value and say what a range of 0 would mean.
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** apply
**A:** No. The range is a single number, maximum minus minimum, so here it is $$41 - 12 = 29$$. "12 to 41" is the span of the data, not the range. A range of 0 means every observation is identical, so there is no spread at all.

### Q: Data: 3, 5, 5, 6, 7, 8, 40. Compute the mean, the median and the range. Then drop the 40 and recompute all three. Which measures changed a lot, which barely moved, and what is the word the course uses for a measure that barely moves?
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** derive
**A:** With the 40: $$\bar{x} = \frac{74}{7} \approx 10.6$$, median 6, range 37. Without it: $$\bar{x} = \frac{34}{6} \approx 5.7$$, median 5.5, range 5. The mean and the range are pulled hard by the single extreme value, because the mean uses every value in its sum and the range uses only the two ends. The median barely moves because it only depends on the middle position. A measure that is not much affected by an outlier is called resistant, so the median is resistant and the mean and range are not.

### Q: Give the deck's definition of an outlier in one sentence, and say why the $$1.5 \times \text{IQR}$$ rule is not the definition.
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** recall
**A:** An outlier is an observation that lies far from the rest of the data, unusually large or unusually small. The $$1.5 \times \text{IQR}$$ fence is a later working rule for flagging candidates once quartiles are available, not the definition, and the deck introduces the idea before any fence: an outlier is identified by its distance from the bulk of the data, whatever tool is used to decide "far". On an exam, though, the $$1.5 \times \text{IQR}$$ rule from lecture 4 is how you decide which values count as outliers.

### Q: iClicker from lecture 3: the distribution of prices of detached houses sold in a city is (a) symmetric (b) left-skewed (c) right-skewed (d) bimodal. Pick one and justify it using the tail and the position of the mean relative to the median.
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** apply
**A:** (c) right-skewed. Prices cannot go below zero and most houses cluster in a middle band, but a small number of very expensive houses stretch the tail far to the right, toward the high values. Those few pull the mean above the median, the signature of a right tail. Left-skewed would need a long tail of very cheap houses, and bimodal would need two separate clusters of prices.

### Q: The 25 hours-worked values include 230 and 250, and the intervals are 170–190, 190–210, 210–230, 230–250 and 250–270. Which interval gets each of those two values under the course's rule, and why must the rule stay the same at every boundary?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** apply
**A:**
- A value on a boundary goes in the interval where it is the upper end. So 230 goes in 210 to 230, and 250 goes in 230 to 250, not in 250 to 270.
- The rule must be the same at every boundary. Otherwise some boundary values get pushed up and others down, and the counts stop describing the data. The deck's counts of 1, 2, 7, 10 and 5 only come out with this rule.

### Q: You have 25 observations. Why would a histogram with 2 intervals, or with 10, be a poor choice, and what is the course's rule of thumb for the number of intervals?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** critique
**A:**
- Two bars cannot show a shape, a centre or a spread, which is the whole point of the graph.
- Ten intervals spread 25 values so thinly that most bars hold only 0 to 3 values, and the shape gets lost.
- The rule of thumb is 5 to 15 intervals, with more only for large data sets. For 25 values, 5 or 6 is about right, and the two give a similar picture.

### Q: A relative frequency histogram of resting heart rates for 400 people has intervals 50–60, 60–70, 70–80, 80–90 and 90–100 with bar heights 0.05, 0.20, 0.40, 0.25 and 0.10. Using the course's boundary rule, how many people had a rate of at most 80, and how many had a rate above 80?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** apply
**A:**
- A rate of exactly 80 is in the 70–80 interval, the one it ends, so the people with a rate of at most 80 are the first three bars.

$$
\begin{aligned}
0.05 + 0.20 + 0.40 &= 0.65 \\
0.65 \times 400 &= 260
\end{aligned}
$$

- The people above 80 are the last two bars: $$0.25 + 0.10 = 0.35$$, and $$0.35 \times 400 = 140$$. As a check, $$260 + 140 = 400$$.
- This is the method from the lecture 3 iClicker: add the relative frequencies, then multiply by the number of people.

### Q: True or false, and justify: a bar chart of the number of students in each faculty, with the tallest bar on the right and the bars shrinking toward the left, shows a left-skewed distribution.
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** critique
**A:** False. Skewness describes a numerical variable on a number line, so it is read from a histogram. Faculties are categories with no fixed order, so the same bars could be rearranged into any shape, and the shape of a bar chart means nothing. This was the lecture 3 iClicker, and the answer was "none of these".

### Q: True or false, and justify: the median is always one of the data values.
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** critique
**A:** False. With an odd number of values the median is the middle value, so it is a data value. With an even number it is the average of the two middle values, which is a data value only when those two are equal. The list 12, 14, 15, 17, 20, 24, 24, 27, 29, 30 has median $$\frac{20 + 24}{2} = 22$$, and 22 is not in the list.

## Lec 4 — Ch 1: variability, percentiles and quartiles, box plots (logged 2026-09-16)

### Q: The deck's example: the hours five students spent studying per week are 4, 6, 8, 7, 5. From a blank page, compute the sample variance and the sample standard deviation, showing every deviation, and give the units of each.
**Topic:** 1b Variance and standard deviation (n − 1 formula · units · not resistant · effect of y = a + bx)  **Lec:** 4  **Type:** derive
**A:** $$\bar{x} = \frac{30}{5} = 6$$. Deviations $$-2, 0, 2, 1, -1$$; squares 4, 0, 4, 1, 1; sum 10.

$$
\begin{aligned}
s^2 &= \frac{10}{5 - 1} = 2.5 \text{ hours}^2 \\
s &= \sqrt{2.5} \approx 1.58 \text{ hours}
\end{aligned}
$$

The formula is $$s^2 = \frac{\sum (x_i - \bar{x})^2}{n - 1}$$. The shortcut $$\sum x_i^2 - n\bar{x}^2 = 190 - 180 = 10$$ gives the same sum.

### Q: Which statement about the sample standard deviation $$s$$ is false, and why? (a) $$s \ge 0$$, with $$s = 0$$ only when every observation is the same value. (b) $$s$$ has the same units as the data, and $$s^2$$ has those units squared. (c) $$s$$ is resistant: one extreme observation moves it about as little as it moves the median. (d) Strong skew or a few outliers can inflate $$s$$ a great deal.
**Topic:** 1b Variance and standard deviation (n − 1 formula · units · not resistant · effect of y = a + bx)  **Lec:** 4  **Type:** critique
**A:** (c) is false. $$s$$ squares every deviation from the mean, so one far-out value adds a huge term to the sum and also shifts $$\bar{x}$$ toward it; the median only counts positions, so it barely moves. (a), (b) and (d) are the deck's stated properties.

### Q: A sample of daily temperatures has mean 20 °C and variance 9. Every value is converted to Fahrenheit by $$y = \frac{9}{5}x + 32$$. Give the mean, variance and standard deviation in Fahrenheit, then state the general rule for $$y = a + bx$$ and say which constant affects which.
**Topic:** 1b Variance and standard deviation (n − 1 formula · units · not resistant · effect of y = a + bx)  **Lec:** 4  **Type:** derive
**A:** Mean $$1.8 \times 20 + 32 = 68$$ °F. Variance $$1.8^2 \times 9 = 29.16$$. $$s = 1.8 \times 3 = 5.4$$ °F. The general rule:

$$
\begin{aligned}
\bar{y} &= a + b\,\bar{x} \\
s_y^2 &= b^2 s_x^2 \\
s_y &= |b|\,s_x
\end{aligned}
$$

The added constant $$a$$ shifts the mean only; the multiplier $$b$$ scales the mean and scales the spread by $$|b|$$. Derivation: $$\bar{y} = \frac{1}{n}\sum (a + b x_i) = a + b\bar{x}$$, and each deviation $$y_i - \bar{y} = b(x_i - \bar{x})$$ gets squared.

### Q: Household incomes in a city are strongly right-skewed, with a handful of billionaires. Which pair should a report use for centre and spread? (a) mean and $$s$$ (b) median and IQR (c) mean and IQR (d) median and range. Justify, and say what happens to each of $$s$$, the median and the IQR if one billionaire's income doubles.
**Topic:** 1b Variance and standard deviation (n − 1 formula · units · not resistant · effect of y = a + bx)  **Lec:** 4  **Type:** apply
**A:** (b). The median and the IQR are set by positions in the sorted data, so the tail cannot drag them; the mean and $$s$$ use every value's distance from the mean and are inflated by the tail. The range is worse still, built from the two extremes. If one billionaire's income doubles, $$s$$ rises sharply because of the larger squared deviation, while the median and the IQR do not change at all.

### Q: Sorted data from the deck ($$n = 20$$): 12 14 17 22 22 24 25 26 27 29 30 31 33 34 35 35 39 40 42 59. Using the deck's $$np + 0.5$$ rule, compute $$Q_1$$, the median and $$Q_3$$, then the IQR. Show the value of $$np + 0.5$$ each time.
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 4  **Type:** derive
**A:** For $$p = 0.25$$, $$np + 0.5 = 20 \times 0.25 + 0.5 = 5.5$$, not an integer, so average the 5th and 6th values. For $$p = 0.5$$ it is 10.5, and for $$p = 0.75$$ it is 15.5.

$$
\begin{aligned}
Q_1 &= \frac{x_{(5)} + x_{(6)}}{2} = \frac{22 + 24}{2} = 23 \\[4pt]
\text{median} &= \frac{x_{(10)} + x_{(11)}}{2} = \frac{29 + 30}{2} = 29.5 \\[4pt]
Q_3 &= \frac{x_{(15)} + x_{(16)}}{2} = \frac{35 + 35}{2} = 35
\end{aligned}
$$

$$\text{IQR} = 35 - 23 = 12$$.

### Q: Sorted data, $$n = 15$$: 3 5 7 8 10 12 14 15 18 20 22 25 27 30 33. Find $$Q(0.3)$$, $$Q(0.35)$$ and $$Q(0.9)$$ by the deck's rule. Then say in words what the value of $$Q(0.3)$$ means and check it against the data.
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 4  **Type:** apply
**A:** $$Q(0.3)$$: $$15 \times 0.3 + 0.5 = 5$$, an integer, so $$Q(0.3) = x_{(5)} = 10$$. $$Q(0.35)$$: $$5.25 + 0.5 = 5.75$$, between 5 and 6, so $$Q(0.35) = \frac{x_{(5)} + x_{(6)}}{2} = \frac{10 + 12}{2} = 11$$, the plain average, not a weighted value like 11.5. $$Q(0.9)$$: $$13.5 + 0.5 = 14$$, so $$Q(0.9) = x_{(14)} = 30$$. $$Q(0.3) = 10$$ means about 30% of the observations are smaller than 10: four of fifteen are (3, 5, 7, 8), which is 27%, close to 30%.

### Q: Sorted data: 4, 7, 9, 12, 15, 18, 22, 30, 41. Using the course's $$np + 0.5$$ rule:
- Find the position and value of the 40th percentile.
- Find $$Q_1$$ and $$Q_3$$, then the IQR.
- Say what you do when $$np + 0.5$$ lands on a whole number versus a half.
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 4  **Type:** derive
**A:** $$n = 9$$. 40th percentile: $$9 \times 0.40 + 0.5 = 4.1$$, between the 4th and 5th values, so $$\frac{12 + 15}{2} = 13.5$$ by the course's averaging rule for any non-integer position. $$Q_1$$: $$9 \times 0.25 + 0.5 = 2.75$$, so $$\frac{7 + 9}{2} = 8$$. $$Q_3$$: $$9 \times 0.75 + 0.5 = 7.25$$, so $$\frac{22 + 30}{2} = 26$$. $$\text{IQR} = 26 - 8 = 18$$. A whole-number position means take that ordered value; anything else means average the two ordered values on either side.

### Q: For the same $$n = 15$$ data, compute $$Q_1$$ two ways: with the $$np + 0.5$$ rule, and as the median of the lower half of the data (the seven values below the median). Do they agree? What does the deck say about this, and which rule do you use on a computation question?
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 4  **Type:** apply
**A:** $$np + 0.5$$ rule: $$15 \times 0.25 + 0.5 = 4.25$$, so $$Q_1 = \frac{x_{(4)} + x_{(5)}}{2} = \frac{8 + 10}{2} = 9$$. The lower half 3, 5, 7, 8, 10, 12, 14 has median 8. They disagree. The deck says different textbooks and software use slightly different quartile rules, so sources can differ. The $$np + 0.5$$ rule is the procedure the deck states, so use it unless the question fixes another rule. For the deck's own 20-value example the two rules happen to agree.

### Q: The 75th percentile of a data set is (a) the value three quarters of the way from the minimum to the maximum (b) a value with 75% of the observations at or below it (c) the mean of the top quarter of the data (d) the same thing as $$Q_1$$. Pick one, show with the data 1, 2, 3, 4, 5, 6, 7, 100 why (a) is wrong, and name the three quartiles as percentiles.
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 4  **Type:** apply
**A:** (b). Percentiles count observations, not distance along the range. For 1, 2, 3, 4, 5, 6, 7, 100 the point three quarters of the way from 1 to 100 is about 75, but by the $$np + 0.5$$ rule the position is $$8 \times 0.75 + 0.5 = 6.5$$, so the 75th percentile is $$\frac{x_{(6)} + x_{(7)}}{2} = \frac{6 + 7}{2} = 6.5$$. $$Q_1$$ is the 25th percentile, $$Q_2$$ (the median) is the 50th and $$Q_3$$ is the 75th.

### Q: Twenty marks have $$Q_1 = 23$$ and $$Q_3 = 35$$. Compute the fences for the $$1.5 \times \text{IQR}$$ rule, state the rule in words, and say which of the marks 4, 5, 52, 53, 59 are outliers.
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 4  **Type:** apply
**A:** $$\text{IQR} = 12$$ and $$1.5 \times \text{IQR} = 18$$, so the fences are:

$$
\begin{aligned}
\text{lower fence} &= 23 - 18 = 5 \\
\text{upper fence} &= 35 + 18 = 53
\end{aligned}
$$

An observation is an outlier if it falls more than $$1.5 \times \text{IQR}$$ below $$Q_1$$ or more than $$1.5 \times \text{IQR}$$ above $$Q_3$$. 4 is an outlier (more than 18 below $$Q_1$$); 5 is not (exactly 18 below, not more); 52 and 53 are not; 59 is (more than 18 above $$Q_3$$).

### Q: Build the box plot for the deck's 20 values (12 14 17 22 22 24 25 26 27 29 30 31 33 34 35 35 39 40 42 59). Give the five-number summary, the fences, where each whisker ends, and any point plotted separately. Then say what the plot shows about shape.
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** 4  **Type:** derive
**A:** Five-number summary: min 12, $$Q_1$$ 23, median 29.5, $$Q_3$$ 35, max 59. IQR 12, fences 5 and 53. 59 is above 53, so it is drawn as a star beyond the whisker. The left whisker ends at 12, the smallest value inside the fences; the right whisker ends at 42, the largest value at or under 53. The box runs from 23 to 35 with a line at 29.5. The median sits almost centrally in the box and the left whisker (11 long) is a little longer than the right (7 long), so the middle of the data is roughly symmetric; the single high outlier is the only sign of a right tail.

### Q: "The whiskers of a box plot always run to the minimum and the maximum of the data, and the median line always sits in the middle of the box." Correct both halves. Then: a box plot's right whisker ends at 42 but the data's maximum is 59. What must be true?
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** 4  **Type:** critique
**A:** Whiskers end at the most extreme observations still inside the fences $$Q_1 - 1.5 \times \text{IQR}$$ and $$Q_3 + 1.5 \times \text{IQR}$$; they reach the minimum and maximum only when there are no outliers, and they never extend to the fences themselves. The median line sits wherever the median falls between $$Q_1$$ and $$Q_3$$, so it is central only when the middle half of the data is symmetric. If the whisker stops at 42 while the maximum is 59, then 59 lies above the upper fence and is an outlier plotted on its own, and 42 is the largest observation inside the fence.

### Q: A box plot has its median line close to $$Q_1$$, the left edge of the box, and a right whisker much longer than the left one. The distribution is most likely (a) symmetric (b) left-skewed (c) right-skewed (d) bimodal. Pick one, say what in the plot tells you, and explain why (d) can never be read off a box plot.
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** 4  **Type:** apply
**A:** (c). The lower half of the data is crammed into a short interval below the median while the upper half stretches far to the right, so the long tail is on the high side: right-skewed. Outliers do not move the median line; the crowding of the middle half does. A box plot cannot show bimodality because it collapses the data to five numbers and hides the shape between them; that is what a histogram is for.

### Q: The deck shows side-by-side box plots of chemistry and physics grades. Name three things you can compare directly from them, one thing you cannot see, and the situation where a histogram is the better choice.
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** 4  **Type:** apply
**A:** You can compare the centres (median lines), the spreads (box length, which is the IQR, and whisker span), and the skew and outliers of each group, all on one scale. You cannot see the shape between the five numbers: modality, gaps, or how many observations each group has. Use a histogram when the shape of one distribution is the point, especially to check for two humps.

### Q: Every score in a class gets 5 bonus points. Say what happens to the mean, the median, $$Q_1$$, $$Q_3$$, the IQR, the range and the standard deviation. Then answer again for multiplying every score by 1.1 instead.
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 4  **Type:** apply
**A:**
- Adding 5 moves every value up by 5, so every measure of position moves up by 5: the mean, the median, $$Q_1$$ and $$Q_3$$.
- The measures of spread stay the same, because the distances between values do not change: the IQR, the range and the standard deviation. This was the lecture 4 iClicker, with answer (e).
- Multiplying by 1.1 multiplies every measure of position by 1.1, and every measure of spread by 1.1 too, since every distance grows by 10%. The variance is multiplied by $$1.1^2 = 1.21$$.

### Q: Two smooth density curves on the same axes have the same centre, and one is much narrower than the other. Which one must have the higher peak, and why? Which has the larger standard deviation?
**Topic:** 1b Variance and standard deviation (n − 1 formula · units · not resistant · effect of y = a + bx)  **Lec:** 4  **Type:** apply
**A:**
- The narrower curve must have the higher peak. The area under each curve is the total probability, 1, so a curve squeezed into a narrower range has to rise higher to keep the same area.
- The wider curve has the larger standard deviation, because its values spread farther from the centre.
- Drawing the narrow curve with the lower peak on the same scale is wrong. He made this point in lecture 4, ahead of Chapter 4.

### Q: From a box plot alone, which of these can you read: the median, the mean, the IQR, the range, and whether there are outliers? Say why for any you cannot.
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** 4  **Type:** recall
**A:**
- The median is the line inside the box.
- The IQR is the length of the box, from $$Q_1$$ to $$Q_3$$.
- The range is the distance from the lowest point drawn to the highest, counting any outliers plotted beyond the whiskers.
- Outliers are the stars or circles beyond the whiskers.
- The mean cannot be read. A box plot is built from the five-number summary and the fences, and none of them uses the mean.

## WeBWorK 1 — Ch 1 (opened Sep 14, due Tue Sep 22; banked 2026-09-16, numbers changed)

### Q: WeBWorK-style. A histogram of exam scores has bins 40–50: 1, 50–60: 2, 60–70: 4, 70–80: 9, 80–90: 17, 90–100: 12. Is the data skewed right, symmetric or skewed left, and is the mean bigger than the median, smaller, or about equal? Answer in the WeBWorK form (SKEWED LEFT, MEDIAN, and so on) and justify from the tail.
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** WW1  **Type:** apply
**A:** SKEWED LEFT and MEDIAN. The peak sits at 80–90 and the counts fade slowly toward the low scores (4, 2, 1), so the long tail points left. A left tail drags the mean below the median, so the median is the bigger one. WeBWorK 1's version showed the mirror image: a right-skewed histogram with the mean bigger.

### Q: WeBWorK-style. 120 students report how much cash they are carrying. Bins in dollars: 0–10: 48, 10–20: 37, 20–30: 22, 30–40: 6, 40–50: 2, 50–60: 0, 60–70: 1, 70–80: 2, 80–90: 1, 90–100: 1. (a) How many students carry under $10? (b) Is the histogram symmetric, skewed right, skewed left, or none of these? (c) Is the share carrying over $30 above 30%, between 20% and 30%, about 10%, or less than 3%?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** WW1  **Type:** apply
**A:** (a) 48, the first bar. (b) Skewed right: the tallest bars are at the low end and a thin tail of bars runs out to $100. (c) About 10%: over $30 means every bar from 30–40 up, $$6 + 2 + 0 + 1 + 2 + 1 + 1 = 13$$ students, and $$\frac{13}{120} = 10.8\%$$. Read the bar heights, add the ones in the range, then divide by the class size; do not eyeball the width of the tail.

### Q: WeBWorK-style. Forty rivets have mean length 7.240 and standard deviation 0.312, both in hundredths of an inch. Head office wants millimetres, and one inch is 2.54 cm. Give the mean and the standard deviation in mm to three significant figures, and name the rule you used.
**Topic:** 1b Variance and standard deviation (n − 1 formula · units · not resistant · effect of y = a + bx)  **Lec:** WW1  **Type:** derive
**A:** One hundredth of an inch is $$\frac{25.4}{100} = 0.254$$ mm, so every value is multiplied by $$b = 0.254$$ with no shift ($$a = 0$$). Mean $$7.240 \times 0.254 = 1.84$$ mm. Standard deviation $$0.312 \times 0.254 = 0.0792$$ mm. Rule: for $$y = a + bx$$, $$\bar{y} = a + b\,\bar{x}$$ and $$s_y = |b|\,s_x$$, with the variance scaling by $$b^2$$. A shift alone would leave $$s$$ unchanged.

### Q: WeBWorK-style. A boxplot of the lifetimes in months of 30 light bulbs has its lower whisker ending at 2.1, a box from 10.2 to 43.7 with the heavy line at 25.0, and its upper whisker ending at 89.6, with no separate points. Which of 10.2, 25.0, 30.3, 43.7, 89.6 is the median? Give the IQR, say whether 89.6 is an outlier, and say what the 30.3 could be.
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** WW1  **Type:** apply
**A:** The median is the heavy line inside the box, 25.0. The box edges are $$Q_1 = 10.2$$ and $$Q_3 = 43.7$$, and the whisker ends are the minimum and the maximum. $$\text{IQR} = 43.7 - 10.2 = 33.5$$. The upper fence is $$43.7 + 1.5 \times 33.5 = 93.95$$, so 89.6 is inside it and is not an outlier, which is why the whisker reaches it. 30.3 appears nowhere on the plot, so it is a distractor. The mean is never shown on a boxplot; here it would sit above the median because the upper half is stretched out.

### Q: WeBWorK-style, three quick MC. (a) If a distribution is skewed to the left, is the mean less than, greater than, or equal to the median? (b) What percent of the observations lie at or below the third quartile? (c) Which is most affected when an extreme high outlier is added: the standard deviation, the median, or the IQR?
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** WW1  **Type:** apply
**A:** (a) Less than: the left tail pulls the mean down. (b) 75%, since Q3 is the 75th percentile; the box between Q1 and Q3 holds the middle 50%. (c) The standard deviation, because it squares the outlier's distance from the mean; the median and the IQR depend only on positions in the sorted data and barely move. WeBWorK 1 asked the mirror versions: right skew, the 50% between Q1 and Q3, and the least affected measure.

### Q: WeBWorK-style. A survey asks Vancouver renters from different neighbourhoods and building types what they pay in monthly rent. What is the variable of interest: (A) the renters, (B) the neighbourhood, (C) the building type, (D) the monthly rent paid by a renter? Say what the other three are, and classify the variable.
**Topic:** 1a Types of data (categorical nominal/ordinal · numerical discrete/continuous)  **Lec:** WW1  **Type:** apply
**A:** (D). The variable of interest is the quantity the survey measures on each individual. The renters are the individuals, the units the data are collected on; neighbourhood and building type are other variables describing them, both categorical. Monthly rent is numerical and continuous, a dollar amount that can take any value in a range.

### Q: WeBWorK-style. Four people's weekly incomes are $1450, $2100, $1700 and $212000. Compute the mean and the median, then say which better represents these people's income and why.
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** WW1  **Type:** derive
**A:** The mean:

$$
\begin{aligned}
\text{mean} &= \frac{1450 + 2100 + 1700 + 212000}{4} \\
&= \frac{217250}{4} = \$54{,}312.50
\end{aligned}
$$

Sorted: 1450, 1700, 2100, 212000; $$n = 4$$ is even, so the median is the average of the 2nd and 3rd values, $$\frac{1700 + 2100}{2} = \$1{,}900$$. The median: three of the four people earn near $1,900, while the one outlier drags the mean to a figure nobody earns.

### Q: WeBWorK-style. A stemplot of nine physics point totals out of 200 reads 12 | 3 7, 13 | 0 4 9, 14 | 2 5, 15 | (empty), 16 | 1, 17 | 8. (a) Write out the data set. (b) This stemplot is most like which display: a time plot, a histogram with classes 120–130, 130–140 and so on, a boxplot, or the five-number summary? (c) Give the lowest score as a percentage of the total possible.
**Topic:** 1b–c Displays: freq table, pie, bar, dot plot, stem-and-leaf  **Lec:** WW1  **Type:** apply
**A:** (a) 123, 127, 130, 134, 139, 142, 145, 161, 178: the stem is the hundreds and tens digits, the leaf the ones digit. (b) A histogram with classes 120–130, 130–140 and so on: each stem is a class and the row length is its bar, only with the actual values kept, and the empty stem 15 is an empty bin. (c) $$\frac{123}{200} = 61.5\%$$.

## Lec 5 — Ch 3: sets and probability, the addition rule (logged 2026-09-19 from the posted deck)

### Q: A fair coin is flipped three times. Write the sample space, list the outcomes of $$A$$ = "at least two tails" and $$B$$ = "exactly two heads", say whether $$A$$ and $$B$$ are disjoint, and find $$P(A \cup B)$$.
**Topic:** 2b Sample space and events (random experiment · S as a set · event as a subset · discrete, continuous and bivariate S · equally likely counting)  **Lec:** 5  **Type:** apply
**A:** $$S$$ = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}, eight equally likely outcomes. $$A$$ = {TTT, TTH, THT, HTT} and $$B$$ = {HHT, HTH, THH}. An outcome with exactly two heads has exactly one tail, so nothing is in both and $$A$$ and $$B$$ are disjoint. Then:

$$
P(A \cup B) = P(A) + P(B) = \frac{4}{8} + \frac{3}{8} = \frac{7}{8}
$$

The only outcome left out is HHH, which checks: $$1 - \frac{1}{8}$$.

### Q: Write the sample space for (i) the number of auto accidents in BC next year and (ii) the lifetimes in hours of two components, $$(X_1, X_2)$$. For each, say whether $$S$$ is discrete or continuous, finite or infinite, and univariate or bivariate. Then write the events "more than 100 accidents" and, for a system that runs only while both components run, "the system fails within 10 hours".
**Topic:** 2b Sample space and events (random experiment · S as a set · event as a subset · discrete, continuous and bivariate S · equally likely counting)  **Lec:** 5  **Type:** apply
**A:** (i) $$S = \{0, 1, 2, 3, \dots\}$$: discrete, infinite, univariate. More than 100 accidents is $$\{101, 102, 103, \dots\}$$. (ii) $$S = \{(x_1, x_2) : x_1 \ge 0,\ x_2 \ge 0\}$$: continuous, infinite, bivariate. The system fails within 10 hours as soon as either component does, so the event and its complement (the system still running at 10 hours) are:

$$
\begin{aligned}
\text{fails} &= \{(x_1, x_2) : 0 \le x_1 < 10 \text{ or } 0 \le x_2 < 10\} \\
\text{runs} &= \{x_1 \ge 10 \text{ and } x_2 \ge 10\}
\end{aligned}
$$

The "or" in the event becomes "and" in the complement.

### Q: Two fair dice are rolled. Describe the sample space and its size, then find $$P(\text{the sum is } 7)$$ and $$P(\text{the sum is at least } 10)$$.
**Topic:** 2b Sample space and events (random experiment · S as a set · event as a subset · discrete, continuous and bivariate S · equally likely counting)  **Lec:** 5  **Type:** apply
**A:** $$S$$ is the 36 ordered pairs (first die, second die), all equally likely. Sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1), six outcomes, so $$P = \frac{6}{36} = \frac{1}{6}$$. Sum at least 10: three outcomes give 10, two give 11, one gives 12, six in all, so $$P = \frac{6}{36} = \frac{1}{6}$$. Order matters: (3,4) and (4,3) are different outcomes, which is what makes the 36 outcomes equally likely.

### Q: A jar holds three red marbles and two blue ones. Two marbles are drawn without replacement. Set up a sample space of equally likely outcomes and use it to find $$P(\text{both red})$$ and $$P(\text{one of each colour})$$.
**Topic:** 2b Sample space and events (random experiment · S as a set · event as a subset · discrete, continuous and bivariate S · equally likely counting)  **Lec:** 5  **Type:** apply
**A:** Label the marbles R1, R2, R3, B1, B2 and record the draws in order: $$5 \times 4 = 20$$ ordered pairs, all equally likely.

$$
\begin{aligned}
P(\text{both red}) &= \frac{3 \times 2}{20} = \frac{6}{20} = 0.3 \\
P(\text{one of each}) &= \frac{3 \times 2 + 2 \times 3}{20} = \frac{12}{20} = 0.6 \\
P(\text{both blue}) &= \frac{2 \times 1}{20} = 0.1
\end{aligned}
$$

Check: $$0.3 + 0.6 + 0.1 = 1$$. Unordered pairs also work (10 equally likely pairs, 3 of them both red). Colours alone do not, because "red red" and "blue blue" are not equally likely.

### Q: Two circles $$A$$ and $$B$$ overlap inside a rectangle $$S$$. Name the region for each of $$A \cap B^c$$, $$A^c \cap B$$, $$(A \cup B)^c$$ and $$A^c \cup B^c$$, and write each probability in terms of $$P(A)$$, $$P(B)$$ and $$P(A \cap B)$$.
**Topic:** 2g Events as sets and Venn diagrams (complement · intersection · union · disjoint events have no overlap · subsets · De Morgan)  **Lec:** 5  **Type:** apply
**A:** $$A \cap B^c$$ is the part of $$A$$ outside the overlap. $$A^c \cap B$$ is the part of $$B$$ outside the overlap. $$(A \cup B)^c$$ is the rectangle outside both circles. $$A^c \cup B^c$$ is everything except the overlap, because an outcome fails to be in both exactly when it is outside at least one of them.

$$
\begin{aligned}
P(A \cap B^c) &= P(A) - P(A \cap B) \\
P(A^c \cap B) &= P(B) - P(A \cap B) \\
P\big((A \cup B)^c\big) &= 1 - P(A) - P(B) + P(A \cap B) \\
P(A^c \cup B^c) &= 1 - P(A \cap B)
\end{aligned}
$$

That last step is De Morgan's law, $$(A \cap B)^c = A^c \cup B^c$$.

### Q: $$P(A) = 0.3$$, $$P(B) = 0.5$$ and $$P(A \cap B) = 0.1$$. Which of these are true? (i) $$A$$ and $$B$$ are disjoint. (ii) $$P(A \cup B) = 0.7$$. (iii) $$P(A^c \cap B) = 0.4$$. (iv) $$P(A^c) = 0.7$$. (v) $$B \subset A$$.
**Topic:** 2g Events as sets and Venn diagrams (complement · intersection · union · disjoint events have no overlap · subsets · De Morgan)  **Lec:** 5  **Type:** critique
**A:** (i) False: disjoint events have $$P(A \cap B) = 0$$, and here it is 0.1. (ii) True: $$0.3 + 0.5 - 0.1 = 0.7$$. (iii) True: the part of $$B$$ outside $$A$$ is $$0.5 - 0.1 = 0.4$$. (iv) True: $$1 - 0.3$$. (v) False: if $$B \subset A$$ then $$P(A \cap B)$$ would equal $$P(B) = 0.5$$, and $$P(B) \le P(A)$$ would have to hold, but $$0.5 > 0.3$$.

### Q: Suppose $$A \subset B$$. Show that $$P(A \cap B) = P(A)$$ and that $$P(A) \le P(B)$$, and give a die-roll example.
**Topic:** 2g Events as sets and Venn diagrams (complement · intersection · union · disjoint events have no overlap · subsets · De Morgan)  **Lec:** 5  **Type:** derive
**A:** Every outcome of $$A$$ is in $$B$$, so $$A \cap B$$ is $$A$$ itself and $$P(A \cap B) = P(A)$$. Split $$B$$ into the disjoint pieces $$A$$ and $$B \cap A^c$$. By additivity:

$$
P(B) = P(A) + P(B \cap A^c) \ge P(A)
$$

since the second term is at least 0. Example: $$A$$ = roll a 6, $$B$$ = roll an even number. $$A \subset B$$, $$P(A \cap B) = P(A) = \frac{1}{6}$$, and $$\frac{1}{6} \le \frac{3}{6}$$.

### Q: A student argues: "odd and even on a die are disjoint and they are complements, so any two disjoint events are complements of each other." Fix the claim, and say where independence fits.
**Topic:** 2g Events as sets and Venn diagrams (complement · intersection · union · disjoint events have no overlap · subsets · De Morgan)  **Lec:** 5  **Type:** critique
**A:** Disjoint means the events share no outcome, so $$P(A \cap B) = 0$$. Complementary means disjoint and together filling $$S$$, so $$P(A) + P(B) = 1$$. Odd and even satisfy both. $$A = \{1\}$$ and $$B = \{2\}$$ are disjoint, but $$P(A) + P(B) = \frac{1}{3}$$, so they are not complements. Independence is a third idea, defined next lecture through $$P(A \cap B) = P(A)\,P(B)$$. Disjoint events with positive probability are never independent, because one occurring rules the other out.

### Q: From a blank page, state the general addition rule for $$P(A \cup B)$$, explain from a Venn diagram why the last term is subtracted, and state the disjoint special case.
**Topic:** 2f Probability rules and the addition rule (outcome probabilities sum to 1 · complement rule · general addition rule · countable additivity · three-event rule)  **Lec:** 5  **Type:** derive
**A:** The rule:

$$
P(A \cup B) = P(A) + P(B) - P(A \cap B)
$$

Adding $$P(A)$$ and $$P(B)$$ counts every outcome in the overlap twice, once in each circle, so the overlap's probability is subtracted once. If $$A$$ and $$B$$ are disjoint the overlap is empty, $$P(A \cap B) = 0$$, and $$P(A \cup B) = P(A) + P(B)$$.

### Q: In a survey, 78% of respondents follow soccer or basketball, 52% follow soccer and 40% follow basketball. Find the probability that a randomly chosen respondent (a) follows both, (b) follows neither, (c) follows soccer but not basketball.
**Topic:** 2f Probability rules and the addition rule (outcome probabilities sum to 1 · complement rule · general addition rule · countable additivity · three-event rule)  **Lec:** 5  **Type:** apply
**A:** (a) The addition rule gives $$P(\text{both})$$. (b) Neither is the complement of the union. (c) Soccer but not basketball is soccer minus both.

$$
\begin{aligned}
\text{(a)}\quad 0.78 &= 0.52 + 0.40 - P(\text{both}) \\
P(\text{both}) &= 0.14 \\
\text{(b)}\quad P(\text{neither}) &= 1 - 0.78 = 0.22 \\
\text{(c)}\quad P(\text{soccer only}) &= 0.52 - 0.14 = 0.38
\end{aligned}
$$

Check: basketball only is $$0.40 - 0.14 = 0.26$$, and $$0.38 + 0.14 + 0.26 + 0.22 = 1$$.

### Q: A loaded die has $$P(1) = P(2) = P(3) = 0.1$$ and $$P(4) = P(5) = 0.2$$. Find $$P(6)$$, then $$P(\text{even})$$, $$P(\text{at least } 5)$$ and $$P(\text{not a } 6)$$, naming the rule each step uses.
**Topic:** 2f Probability rules and the addition rule (outcome probabilities sum to 1 · complement rule · general addition rule · countable additivity · three-event rule)  **Lec:** 5  **Type:** apply
**A:** Outcome probabilities sum to 1, so $$P(6) = 1 - 0.7 = 0.3$$. An event's probability is the sum over its outcomes: $$P(\text{even}) = 0.1 + 0.2 + 0.3 = 0.6$$ and $$P(\text{at least } 5) = 0.2 + 0.3 = 0.5$$. Complement rule: $$P(\text{not a } 6) = 1 - 0.3 = 0.7$$. Every value sits between 0 and 1, as the properties require.

### Q: Derive the three-event addition rule $$P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$$ from the two-event rule.
**Topic:** 2f Probability rules and the addition rule (outcome probabilities sum to 1 · complement rule · general addition rule · countable additivity · three-event rule)  **Lec:** 5  **Type:** derive
**A:** Write $$A \cup B \cup C$$ as $$(A \cup B) \cup C$$ and apply the two-event rule:

$$
\begin{aligned}
P(A \cup B \cup C) &= P(A \cup B) + P(C) \\
&\quad - P\big((A \cup B) \cap C\big)
\end{aligned}
$$

Expand $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$. Distribute the intersection: $$(A \cup B) \cap C = (A \cap C) \cup (B \cap C)$$, and these two pieces overlap in $$A \cap B \cap C$$, so:

$$
\begin{aligned}
P\big((A \cup B) \cap C\big) &= P(A \cap C) + P(B \cap C) \\
&\quad - P(A \cap B \cap C)
\end{aligned}
$$

Substituting gives the rule. This is the slide 15 exercise, left for lecture 6.

## Lec 6 — Ch 3: conditional probability and independence (logged 2026-09-21 from the posted deck and the recording)

### Q: From a blank page, define $$P(A \mid B)$$, say why $$P(B)$$ must be positive, and say what the ratio measures on a Venn diagram. Then derive both forms of the multiplication rule.
**Topic:** 2h Conditional probability and the multiplication rule (definition as a ratio · proportion of A inside B · the given event is the denominator · two forms of the multiplication rule)  **Lec:** 6  **Type:** derive
**A:** The definition:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}
$$

The given event is the denominator, and dividing by zero is undefined; $$P(B) = 0$$ would also mean $$B$$ cannot happen, so there is nothing to condition on. On the diagram it is the fraction of $$B$$'s region that lies inside $$A$$. Multiplying through, and starting from $$P(B \mid A) = \frac{P(A \cap B)}{P(A)}$$ for the second form:

$$
\begin{aligned}
P(A \cap B) &= P(A \mid B)\,P(B) \\
P(A \cap B) &= P(B \mid A)\,P(A)
\end{aligned}
$$

### Q: $$P(A) = 0.5$$, $$P(B) = 0.3$$ and $$P(B \mid A) = 0.4$$. Find $$P(A \cap B)$$, $$P(A \mid B)$$ and $$P(A \cup B)$$.
**Topic:** 2h Conditional probability and the multiplication rule (definition as a ratio · proportion of A inside B · the given event is the denominator · two forms of the multiplication rule)  **Lec:** 6  **Type:** apply
**A:** Work in this order:

$$
\begin{aligned}
P(A \cap B) &= P(B \mid A)\,P(A) = 0.4 \times 0.5 = 0.20 \\
P(A \mid B) &= \frac{0.20}{0.3} = \frac{2}{3} \\
P(A \cup B) &= 0.5 + 0.3 - 0.2 = 0.6
\end{aligned}
$$

$$P(B \mid A) = 0.4$$ and $$P(A \mid B) = \frac{2}{3}$$ differ because they share the numerator 0.20 but divide by different given events.

### Q: A student writes $$P(A \mid B) = \frac{P(A \cap B)}{P(A)}$$. What is wrong? With $$P(A) = 0.6$$, $$P(B) = 0.4$$ and $$P(A \cap B) = 0.36$$, give the correct $$P(A \mid B)$$ and $$P(B \mid A)$$.
**Topic:** 2h Conditional probability and the multiplication rule (definition as a ratio · proportion of A inside B · the given event is the denominator · two forms of the multiplication rule)  **Lec:** 6  **Type:** critique
**A:** The denominator must be the given event, which is $$B$$. $$P(A \mid B) = \frac{0.36}{0.4} = 0.9$$ and $$P(B \mid A) = \frac{0.36}{0.6} = 0.6$$. The student's formula computes $$P(B \mid A)$$ and labels it $$P(A \mid B)$$.

### Q: Two cards are drawn without replacement from a standard 52-card deck. Use the multiplication rule to find $$P(\text{both are aces})$$ and $$P(\text{the first is an ace and the second is a king})$$.
**Topic:** 2h Conditional probability and the multiplication rule (definition as a ratio · proportion of A inside B · the given event is the denominator · two forms of the multiplication rule)  **Lec:** 6  **Type:** apply
**A:** Let $$A_1$$ = first card is an ace and $$A_2$$ = second card is an ace.

$$
\begin{aligned}
P(A_1 \cap A_2) &= P(A_1)\,P(A_2 \mid A_1) \\
&= \frac{4}{52} \cdot \frac{3}{51} = \frac{12}{2652} \\
&= \frac{1}{221} \approx 0.0045 \\[4pt]
P(\text{ace, then king}) &= \frac{4}{52} \cdot \frac{4}{51} = \frac{16}{2652} \\
&= \frac{4}{663} \approx 0.0060
\end{aligned}
$$

The second factor is conditional because the first draw changed the deck.

### Q: State the three equivalent conditions for $$A$$ and $$B$$ to be independent, and show that $$P(A \cap B) = P(A)\,P(B)$$ implies $$P(A \mid B) = P(A)$$.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** 6  **Type:** derive
**A:** The three conditions are $$P(A \mid B) = P(A)$$, $$P(B \mid A) = P(B)$$, and $$P(A \cap B) = P(A)\,P(B)$$. From the third, when $$P(B) > 0$$:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{P(A)\,P(B)}{P(B)} = P(A)
$$

Independence is checked with one of these equations and never read off a Venn diagram, which only shows whether events overlap.

### Q: "These two events are disjoint, so they are independent." Correct this with the one-line reason and a die example.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** 6  **Type:** critique
**A:** Disjoint means $$P(A \cap B) = 0$$. Independence would need $$P(A)\,P(B) = 0$$, so one of the events would have to be impossible. Disjoint events with positive probability are never independent: knowing $$A$$ happened tells you $$B$$ did not. Die: $$A$$ = odd and $$B$$ = even are disjoint, and $$P(A \mid B) = 0$$ while $$P(A) = \frac{1}{2}$$.

### Q: Flip a fair coin and roll a fair die. Let $$A$$ = head and $$B$$ = the die shows 1 or 2. List $$A \cap B$$ and use the product test to decide whether $$A$$ and $$B$$ are independent.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** 6  **Type:** apply
**A:** The 12 outcomes (coin, die) are equally likely. $$A$$ has 6 outcomes, $$B$$ = {(H,1), (H,2), (T,1), (T,2)} has 4, and $$A \cap B$$ = {(H,1), (H,2)} has 2.

$$
\begin{aligned}
P(A \cap B) &= \frac{2}{12} = \frac{1}{6} \\
P(A)\,P(B) &= \frac{1}{2} \cdot \frac{1}{3} = \frac{1}{6}
\end{aligned}
$$

They agree, so $$A$$ and $$B$$ are independent. The test needs an intersection to check; here it has one.

### Q: Twelve smoke detectors each work with probability 0.98, independently. Find $$P(\text{all work})$$ and $$P(\text{at least one fails})$$, and say why the complement is the only sensible route.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** 6  **Type:** apply
**A:** Define $$A_i$$ = detector $$i$$ works. By independence:

$$
\begin{aligned}
P(\text{all work}) &= P(A_1 \cap \dots \cap A_{12}) \\
&= 0.98^{12} \approx 0.785 \\
P(\text{at least one fails}) &= 1 - 0.785 \\
&= 0.215
\end{aligned}
$$

"At least one fails" splits into exactly 1, 2, …, 12 failures, each in many arrangements, while "all work" is a single intersection of independent events.

### Q: A question gives $$P(A) = 0.3$$ and $$P(B) = 0.6$$ and asks for $$P(A \cap B)$$. A student answers 0.18. What did they assume, when is that allowed, and what can be said otherwise?
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** 6  **Type:** critique
**A:** They assumed independence and multiplied. That is allowed only when the question states independence or the events are physically independent, like a coin and a die. Otherwise $$P(A \cap B)$$ is not determined by $$P(A)$$ and $$P(B)$$ alone; you need $$P(A \mid B)$$, $$P(B \mid A)$$ or $$P(A \cup B)$$. Without that, all you can say is $$0 \le P(A \cap B) \le 0.3$$.

### Q: If $$A$$ and $$B$$ are independent, prove that $$A^c$$ and $$B$$ are independent, then name the other two pairs the deck lists.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** 6  **Type:** derive
**A:** The product test for $$A^c$$ and $$B$$:

$$
\begin{aligned}
P(A^c \cap B) &= P(B) - P(A \cap B) \\
&= P(B) - P(A)\,P(B) \\
&= \big(1 - P(A)\big)P(B) \\
&= P(A^c)\,P(B)
\end{aligned}
$$

The same argument gives $$A$$ and $$B^c$$, and applying it twice gives $$A^c$$ and $$B^c$$.

### Q: $$P(D) = 0.4$$, $$P(E) = 0.5$$ and $$P(D \cup E) = 0.7$$. Find $$P(E \mid D)$$ and decide whether $$D$$ and $$E$$ are independent, two ways.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** 6  **Type:** apply
**A:** The addition rule gives the intersection first:

$$
\begin{aligned}
P(D \cap E) &= 0.4 + 0.5 - 0.7 = 0.2 \\
P(E \mid D) &= \frac{0.2}{0.4} = 0.5 = P(E)
\end{aligned}
$$

So they are independent. Product test: $$0.4 \times 0.5 = 0.2 = P(D \cap E)$$. Compare the deck's numbers 0.5, 0.6 and 0.65, where $$P(D \cap E) = 0.45$$ is not 0.3 and the events are not independent.

### Q: A fair coin gives 2 heads in 10 flips. Does that contradict $$P(\text{heads}) = 0.5$$? Describe the graph the lecture used of the proportion of heads against the number of flips.
**Topic:** 2c Probability as long-run relative frequency (short-run proportions wander · the proportion of heads settles near 0.5 as n grows)  **Lec:** 6  **Type:** recall
**A:** No. 0.5 is the long-run relative frequency, not a promise about ten flips. The graph plots $$\frac{\text{heads}}{n}$$ against $$n$$. At $$n = 1$$ it is 0 or 1, then it wanders, and it settles near 0.5 as $$n$$ grows, close by 10,000 flips but not necessarily by 100. Short-run outcomes are random.

### Q: In 400 rolls of a die a student sees 80 sixes and says the probability of a six is 0.2. What is right and what is wrong in that claim?
**Topic:** 2c Probability as long-run relative frequency (short-run proportions wander · the proportion of heads settles near 0.5 as n grows)  **Lec:** 6  **Type:** critique
**A:** $$\frac{80}{400} = 0.2$$ is an observed relative frequency, an estimate from a finite run. The probability is the long-run limit of that proportion, $$\frac{1}{6} \approx 0.167$$ for a fair die. At 400 rolls, 0.2 is within ordinary variation. If the proportion stayed near 0.2 as $$n$$ grew, that would be evidence the die is not fair, not a redefinition of the probability.

## WeBWorK 2 — Ch 1 and Ch 3 (opened Sep 22, due Tue Sep 29; banked 2026-09-22, numbers changed)

### Q: WeBWorK-style. Side-by-side boxplots of daily hits on a website give this five-number summary, in hits. (a) Which days had outliers? (b) Which day had the largest median? (c) Which day had the largest third quartile? (d) True or false: less than 25% of Thursdays had more hits than the busiest Saturday.

| Day | Min | $$Q_1$$ | Median | $$Q_3$$ | Max | Points outside the whiskers |
|---|---|---|---|---|---|---|
| Sun | 120 | 180 | 210 | 250 | 300 | — |
| Mon | 260 | 330 | 400 | 470 | 540 | — |
| Tue | 240 | 300 | 355 | 410 | 480 | 620 |
| Wed | 250 | 320 | 370 | 430 | 500 | — |
| Thu | 300 | 380 | 450 | 520 | 600 | — |
| Fri | 230 | 290 | 340 | 400 | 460 | — |
| Sat | 150 | 200 | 240 | 285 | 330 | 90 |
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** WW2  **Type:** apply
**A:** (a) Tuesday and Saturday, the only two rows with a point drawn outside the whiskers. A whisker end is never an outlier; whiskers stop at the most extreme value still inside the $$1.5 \times \text{IQR}$$ fences, so only the separately plotted dots count. (b) Thursday, 450. (c) Thursday, 520. It does not have to be the same day as the largest median, so check the column you were asked about. (d) False. The busiest Saturday is 330. Thursday's $$Q_1$$ is 380, and $$Q_1$$ is the 25th percentile, so about 75% of Thursdays are above 380 and therefore above 330 — far more than 25%, not fewer. The trap is reading "less than 25%" off the medians instead of off a quartile.

### Q: Events $$A$$ and $$B$$ are mutually exclusive with $$P(A) = 0.35$$ and $$P(B) = 0.45$$. Find $$P(A \cup B)$$. Then say what would have to be true for $$P(A) = 0.6$$ and $$P(B) = 0.5$$ to describe two mutually exclusive events.
**Topic:** 2f Probability rules and the addition rule (outcome probabilities sum to 1 · complement rule · general addition rule · countable additivity · three-event rule)  **Lec:** WW2  **Type:** apply
**A:** Mutually exclusive means $$A \cap B = \emptyset$$, so $$P(A \cap B) = 0$$ and the general addition rule collapses:

$$
\begin{aligned}
P(A \cup B) &= P(A) + P(B) - P(A \cap B) \\
&= 0.35 + 0.45 = 0.8
\end{aligned}
$$

The second pair is impossible: $$P(A \cup B)$$ would have to be 1.1, and no probability exceeds 1. So two disjoint events can never have probabilities summing past 1 — a quick sanity check worth running before you answer.

### Q: A two-stage tree has first-stage branches $$A$$ and $$B$$ with $$P(A) = 0.6$$ and $$P(B) = 0.4$$. From $$A$$ the second-stage branches are $$C$$ with probability 0.3 and $$D$$ with probability 0.7; from $$B$$ they are $$C$$ with probability 0.8 and $$D$$ with probability 0.2. Find (a) $$P(C \mid A)$$, (b) $$P(D \mid B)$$, (c) $$P(A \cap C)$$, (d) $$P(B \cap D)$$, (e) $$P(C)$$, (f) $$P(D)$$.
**Topic:** 2h Conditional probability and the multiplication rule (definition as a ratio · proportion of A inside B · the given event is the denominator · two forms of the multiplication rule)  **Lec:** WW2  **Type:** apply
**A:** (a) 0.3 and (b) 0.2 are read straight off the second-stage branches: a branch label in a tree already *is* a conditional probability, given everything upstream of it. For the rest, multiply along a path and add across paths:

$$
\begin{aligned}
\text{(c)}\ P(A \cap C) &= P(A)\,P(C \mid A) \\
&= 0.6 \times 0.3 = 0.18 \\
\text{(d)}\ P(B \cap D) &= 0.4 \times 0.2 = 0.08 \\
\text{(e)}\ P(C) &= 0.18 + 0.4 \times 0.8 \\
&= 0.18 + 0.32 = 0.50 \\
\text{(f)}\ P(D) &= 0.6 \times 0.7 + 0.08 \\
&= 0.42 + 0.08 = 0.50
\end{aligned}
$$

$$P(D)$$ also equals $$1 - P(C)$$ because $$C$$ and $$D$$ partition the second stage. Multiply along a branch, add across branches — and note that $$P(C) = 0.50$$ is not either branch probability, so you cannot read a second-stage marginal off the tree without doing the sum.

### Q: Events $$A$$ and $$B$$ are independent with $$P(A) = 0.5$$ and $$P(B) = 0.2$$. Find $$P(A \cup B)$$ to two decimals. Then explain why the answer would be bigger, not smaller, if $$A$$ and $$B$$ were mutually exclusive instead.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** WW2  **Type:** apply
**A:** Independence gives the overlap:

$$
\begin{aligned}
P(A \cap B) &= P(A)\,P(B) = 0.5 \times 0.2 = 0.10 \\
P(A \cup B) &= 0.5 + 0.2 - 0.10 = 0.60
\end{aligned}
$$

If they were mutually exclusive the overlap would be 0 instead of 0.10 and the union would be 0.70. Independence is the stronger claim here: it puts a real overlap in, and subtracting it shrinks the union. The two conditions are not variations on each other — with both probabilities positive, disjoint events are never independent, because $$P(A \cap B) = 0 \ne P(A)\,P(B)$$.

### Q: Two quick multiple-choice items. (a) $$P(A) = 0.25$$, $$P(B) = 0.40$$ and $$P(A \text{ and } B) = 0.10$$. Are $$A$$ and $$B$$ mutually exclusive, dependent, independent, or complementary? (b) Which is the useful graphical method for constructing the sample space of a multi-stage experiment: a histogram, an ogive, a pie chart, or a tree diagram? Justify each.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** WW2  **Type:** apply
**A:** (a) Independent. Run the product test: $$P(A)\,P(B) = 0.25 \times 0.40 = 0.10$$, which matches $$P(A \cap B)$$, so the events are independent. They are not mutually exclusive, since the intersection has probability $$0.10 > 0$$. They are not complementary, since $$P(A) + P(B) = 0.65 \ne 1$$ and $$B \ne A^c$$. "Dependent" is exactly what the product test just ruled out. (b) A tree diagram. It enumerates every path through the stages, so the complete set of paths is the sample space and the branch labels are the conditional probabilities. The other three are displays for data you already have, not tools for building a sample space. This problem gives no partial credit, so both halves have to be right.

### Q: Two components sit in parallel, and the system works as long as at least one of them works. Let $$F_1$$ be the event that component 1 fails during the day and $$F_2$$ that component 2 fails. (a) Which set is the event that the system fails? (b) Which set is the event that the system works throughout the day? The options for each are $$F_1 \cap F_2$$, $$F_1^c \cap F_2^c$$, $$F_1 \cup F_2$$, $$(F_1 \cup F_2)^c$$ and $$F_1^c \cup F_2^c$$. Say what each of the losing options would describe.
**Topic:** 2g Events as sets and Venn diagrams (complement · intersection · union · disjoint events have no overlap · subsets · De Morgan)  **Lec:** WW2  **Type:** apply
**A:** (a) $$F_1 \cap F_2$$. A parallel system survives on one working component, so it fails only when both fail. (b) $$F_1^c \cup F_2^c$$, that is, at least one component works. It is the complement of the answer to (a), and De Morgan turns $$(F_1 \cap F_2)^c$$ into $$F_1^c \cup F_2^c$$. The losing options: $$F_1 \cup F_2$$ is "at least one fails", which is the failure condition for a *series* system, not a parallel one. $$F_1^c \cap F_2^c$$ is "both work", which is stricter than a parallel system needs. $$(F_1 \cup F_2)^c$$ is the same set as $$F_1^c \cap F_2^c$$ by De Morgan, so it is the same wrong answer written the other way round — a good check that you are applying De Morgan rather than guessing.

### Q: Components $$A$$ and $$B$$ sit in parallel, and that whole block sits in series with component $$C$$. The components fail independently, with $$P(A \text{ fails}) = 0.2$$, $$P(B \text{ fails}) = 0.15$$ and $$P(C \text{ fails}) = 0.1$$. Find the reliability of the system to three decimal places.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** WW2  **Type:** derive
**A:** Do the parallel block first. It fails only if both fail, and independence lets you multiply. The block and $$C$$ are in series, so the system works only if both work:

$$
\begin{aligned}
P(\text{block fails}) &= 0.2 \times 0.15 = 0.03 \\
P(\text{block works}) &= 0.97 \\
P(\text{system works}) &= 0.97 \times 0.9 = 0.873
\end{aligned}
$$

Two rules, one each way: parallel means multiply the *failure* probabilities, series means multiply the *working* probabilities. Multiplying is legitimate here only because the problem states the components are independent — it is never an assumption to make on your own.

### Q: Two parts, same setup each time. (a) $$P(A) = 0.3$$, $$P(B) = 0.5$$ and $$P(A \cap B) = 0.2$$. Find $$P(A \mid B^c)$$ as a fraction. (b) Now $$P(A) = 0.3$$, $$P(B) = 0.3$$ and $$P(A \cap B) = 0.3$$. Find $$P(A \mid B^c)$$, and say what the three numbers force to be true about $$A$$ and $$B$$.
**Topic:** 2h Conditional probability and the multiplication rule (definition as a ratio · proportion of A inside B · the given event is the denominator · two forms of the multiplication rule)  **Lec:** WW2  **Type:** derive
**A:** (a) The given event is the denominator. Split $$A$$ along $$B$$:

$$
\begin{aligned}
P(A \cap B^c) &= P(A) - P(A \cap B) = 0.3 - 0.2 = 0.1 \\
P(B^c) &= 1 - 0.5 = 0.5 \\
P(A \mid B^c) &= \frac{P(A \cap B^c)}{P(B^c)} = \frac{0.1}{0.5} = \frac{1}{5}
\end{aligned}
$$

(b) $$P(A \cap B) = 0.3$$ equals both $$P(A)$$ and $$P(B)$$, and an intersection can never be larger than either event, so $$A \subseteq B$$ and $$B \subseteq A$$ — the two events are the same event. Then $$A \cap B^c = \emptyset$$ and $$P(A \mid B^c) = \frac{0}{0.7} = 0$$. Knowing $$B$$ did not happen rules $$A$$ out completely. The trap in (b) is reaching for the product rule and reporting $$0.3 \times 0.3$$ or similar; $$A$$ and $$B$$ here are as far from independent as events get.

### Q: Factory $$A$$ produces three times as many computers as factory $$B$$. An item from $$A$$ is defective with probability 0.025, and one from $$B$$ with probability 0.04. A computer is picked at random and found to be defective. What is the probability it came from $$A$$, to four decimal places?
**Topic:** 2i Bayes' theorem and the law of total probability (partition · weighted average of the branch rates · reversing the conditional · posterior vs prior)  **Lec:** WW2  **Type:** derive
**A:** "Three times as many" fixes the priors: $$P(A) = \frac{3}{4} = 0.75$$ and $$P(B) = 0.25$$, since $$A$$ and $$B$$ are the only two producers. Then:

$$
\begin{aligned}
P(A \cap D) &= 0.75 \times 0.025 = 0.01875 \\
P(B \cap D) &= 0.25 \times 0.04 = 0.01 \\
P(D) &= 0.02875 \\
P(A \mid D) &= \frac{0.01875}{0.02875} = 0.6522
\end{aligned}
$$

Two traps worth naming. The ratio "3 times as many" is not a probability — convert it to $$\frac{3}{4}$$ and $$\frac{1}{4}$$ first. And the posterior 0.6522 is *below* the prior 0.75, because $$A$$ is the better factory: a defect is evidence against $$A$$ even though most defects still come from $$A$$.

## Lec 7 — Ch 3: Bayes' theorem, tree diagrams, system reliability (logged 2026-09-28 from the posted deck and the recording)

### Q: Starting from the definition of conditional probability, derive Bayes' theorem for a partition $$A_1, \dots, A_n$$ and an event $$B$$, and say where the law of total probability enters.
**Topic:** 2i Bayes' theorem and the law of total probability (partition · weighted average of the branch rates · reversing the conditional · posterior vs prior)  **Lec:** 7  **Type:** derive
**A:** Start from $$P(A_i \mid B) = \frac{P(A_i \cap B)}{P(B)}$$. The numerator is $$P(B \mid A_i)\,P(A_i)$$ by the multiplication rule. For the denominator, $$B$$ is the union of the disjoint pieces $$A_1 \cap B, \dots, A_n \cap B$$, so $$P(B)$$ is the sum of $$P(B \mid A_k)\,P(A_k)$$ over $$k$$, which is the law of total probability. Putting them together:

$$
P(A_i \mid B) = \frac{P(B \mid A_i)\,P(A_i)}{\sum_{k=1}^{n} P(B \mid A_k)\,P(A_k)}
$$

### Q: In the three-plant example a student says: "The probability that a plant 2 car is defective is 0.018, so the probability that a defective car is from plant 2 is also about 0.018." Explain the error in one sentence and give the right number.
**Topic:** 2i Bayes' theorem and the law of total probability (partition · weighted average of the branch rates · reversing the conditional · posterior vs prior)  **Lec:** 7  **Type:** critique
**A:** Those are reverse conditionals: $$P(D \mid A_2) = 0.018$$ is given, while $$P(A_2 \mid D)$$ weighs plant 2's defective output against the defective output of all three plants.

$$
\begin{aligned}
P(D) &= 0.0035 + 0.0036 + 0.0090 = 0.0161 \\
P(A_2 \mid D) &= \frac{0.0036}{0.0161} \approx 0.224
\end{aligned}
$$

### Q: A test detects a disease with probability 0.95 when it is present and gives a false positive with probability 0.08 when it is absent. 4% of people have the disease. Draw the tree and find $$P(\text{disease} \mid \text{positive})$$.
**Topic:** 2i Bayes' theorem and the law of total probability (partition · weighted average of the branch rates · reversing the conditional · posterior vs prior)  **Lec:** 7  **Type:** apply
**A:** First split: disease 0.04, no disease 0.96. Second split: positive 0.95 or negative 0.05 on the disease branch, positive 0.08 or negative 0.92 on the other. Multiply along the two positive paths:

$$
\begin{aligned}
0.04 \times 0.95 &= 0.038 \\
0.96 \times 0.08 &= 0.0768 \\
P(\text{positive}) &= 0.1148 \\
P(\text{disease} \mid \text{positive}) &= \frac{0.038}{0.1148} \approx 0.331
\end{aligned}
$$

Most positives come from the large healthy group, which is why the posterior is far below 0.95.

### Q: Two bins are equally likely to be picked from. Bin I has 2% defective parts and bin II has 6%. Given a defective part, find $$P(\text{bin I})$$. Why is it below one half, and what would make it exactly one half?
**Topic:** 2i Bayes' theorem and the law of total probability (partition · weighted average of the branch rates · reversing the conditional · posterior vs prior)  **Lec:** 7  **Type:** apply
**A:** The two paths and the posterior:

$$
\begin{aligned}
P(D) &= 0.5(0.02) + 0.5(0.06) \\
&= 0.01 + 0.03 = 0.04 \\
P(I \mid D) &= \frac{0.01}{0.04} = 0.25
\end{aligned}
$$

It is below one half because bin I contributes fewer of the defective parts. Equal defect rates would give exactly 0.5, since the prior is already even.

### Q: A system has components $$A$$ and $$B$$ in parallel, followed in series by $$C$$ and then $$D$$. The reliabilities are $$A$$ 0.7, $$B$$ 0.6, $$C$$ 0.95 and $$D$$ 0.9, and the components work independently. Find the reliability of the system.
**Topic:** 2k Reliability of series and parallel systems (series multiplies reliabilities · parallel is one minus the product of failure probabilities · combine blocks · independence must be given)  **Lec:** 7  **Type:** apply
**A:** The parallel block fails only if both $$A$$ and $$B$$ fail. The system needs the block, $$C$$ and $$D$$ all working, so by independence:

$$
\begin{aligned}
P(\text{block works}) &= 1 - 0.3 \times 0.4 = 0.88 \\
\text{reliability} &= 0.88 \times 0.95 \times 0.9 = 0.7524
\end{aligned}
$$

With the deck's numbers (0.6, 0.5, 0.9, 0.9) the same steps give $$0.8 \times 0.81 = 0.648$$.

### Q: Three components each work with probability 0.9, independently. Compare the reliability of all three in series with all three in parallel, and name the rule each layout uses.
**Topic:** 2k Reliability of series and parallel systems (series multiplies reliabilities · parallel is one minus the product of failure probabilities · combine blocks · independence must be given)  **Lec:** 7  **Type:** apply
**A:** Series needs every component to work, so the reliability is the product $$0.9^3 = 0.729$$. Parallel fails only if every component fails, so the reliability is $$1 - 0.1^3 = 0.999$$. Series uses the multiplication rule for independent events; parallel uses the complement of that rule applied to the failures.

## Lec 8 — Ch 4: random variables, the pmf, the cdf, mean and variance (logged 2026-09-28 from the posted deck and the recording)

### Q: Two fair dice, one green and one red, are rolled and $$Y$$ = green score minus red score. List the possible values of $$Y$$, find $$P(Y = 0)$$ and $$P(Y = 4)$$, and say whether $$Y$$ is discrete.
**Topic:** 3a–b Random variables and the pmf (X as a function on S · possible values · discrete vs continuous · pmf properties · find the constant · probability statements)  **Lec:** 8  **Type:** apply
**A:** The 36 ordered pairs are equally likely. Differences run from $$1 - 6 = -5$$ to $$6 - 1 = 5$$, so the possible values are $$-5, -4, \dots, 4, 5$$, eleven values. $$P(Y = 0)$$ counts the six doubles, $$\frac{6}{36} = \frac{1}{6}$$. $$P(Y = 4)$$ needs (5, 1) or (6, 2), so $$\frac{2}{36} = \frac{1}{18}$$. $$Y$$ is discrete: a finite set of separate values with probability at each one.

### Q: Flip a fair coin four times and let $$X$$ be the number of heads. Give the pmf as a table and check both pmf properties.
**Topic:** 3a–b Random variables and the pmf (X as a function on S · possible values · discrete vs continuous · pmf properties · find the constant · probability statements)  **Lec:** 8  **Type:** apply
**A:** Sixteen equally likely outcomes. The counts with 0, 1, 2, 3, 4 heads are 1, 4, 6, 4, 1, so:

| $$x$$ | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| $$f(x)$$ | $$\frac{1}{16}$$ | $$\frac{4}{16}$$ | $$\frac{6}{16}$$ | $$\frac{4}{16}$$ | $$\frac{1}{16}$$ |

Every value is at least 0, and the sum is $$\frac{16}{16} = 1$$, so it is a pmf.

### Q: $$Y$$ takes the values $$-2, 0, 3, 6$$ with probabilities $$2c, 0.3, c, 4c$$. Find $$c$$, then $$P(Y = 6)$$, $$P(Y \ge 0)$$, $$P(Y < 0)$$ and $$P(Y > 1.5)$$, writing each as probability statements before the numbers.
**Topic:** 3a–b Random variables and the pmf (X as a function on S · possible values · discrete vs continuous · pmf properties · find the constant · probability statements)  **Lec:** 8  **Type:** apply
**A:** $$f$$ is a pmf, so the probabilities sum to 1. The possible values above 1.5 are 3 and 6.

$$
\begin{aligned}
2c + 0.3 + c + 4c &= 1 \\
7c = 0.7 \;\Rightarrow\; c &= 0.1 \\
P(Y = 6) &= 4c = 0.4 \\
P(Y \ge 0) &= P(Y = 0) + P(Y = 3) \\
&\quad + P(Y = 6) \\
&= 0.3 + 0.1 + 0.4 = 0.8 \\
P(Y < 0) &= P(Y = -2) = 0.2 \\
P(Y > 1.5) &= P(Y = 3) + P(Y = 6) = 0.5
\end{aligned}
$$

### Q: Which of these tables can be a pmf? (i) Values 1, 2, 3 with probabilities 0.5, 0.6, $$-0.1$$. (ii) Values 0, 1 with 0.45, 0.55. (iii) Values 1, 2, 3, 4 with 0.1, 0.2, 0.3, 0.5. Name the property each failure breaks, and say which one is Bernoulli.
**Topic:** 3a–b Random variables and the pmf (X as a function on S · possible values · discrete vs continuous · pmf properties · find the constant · probability statements)  **Lec:** 8  **Type:** critique
**A:** (i) No: a probability of $$-0.1$$ breaks $$f(x) \ge 0$$, and the sum being 1 does not rescue it. (ii) Yes, both properties hold, and it is Bernoulli because the only values are 0 and 1. (iii) No: the sum is 1.1, which breaks the total of 1.

### Q: For $$X$$ = the number of heads in four fair flips, write the cdf as a piecewise function, then evaluate $$F(1.5)$$, $$F(-1)$$, $$F(4)$$ and $$P(X > 2)$$.
**Topic:** 3f Discrete cdf (F as a running sum · defined for every real x · step function · one minus F)  **Lec:** 8  **Type:** apply
**A:** Running sums of $$\frac{1}{16}, \frac{4}{16}, \frac{6}{16}, \frac{4}{16}, \frac{1}{16}$$ give:

$$
F(x) = \begin{cases}
0 & x < 0 \\
\frac{1}{16} & 0 \le x < 1 \\
\frac{5}{16} & 1 \le x < 2 \\
\frac{11}{16} & 2 \le x < 3 \\
\frac{15}{16} & 3 \le x < 4 \\
1 & x \ge 4
\end{cases}
$$

$$F(1.5) = \frac{5}{16}$$, $$F(-1) = 0$$, $$F(4) = 1$$, and $$P(X > 2) = 1 - F(2) = 1 - \frac{11}{16} = \frac{5}{16}$$.

### Q: For the number of heads in three fair flips, a student computes $$P(X \ge 2)$$ as $$1 - F(2)$$. What is wrong, and what are the correct $$P(X \ge 2)$$ and $$P(X > 2)$$?
**Topic:** 3f Discrete cdf (F as a running sum · defined for every real x · step function · one minus F)  **Lec:** 8  **Type:** critique
**A:** $$1 - F(2)$$ is $$P(X > 2)$$, which leaves out $$X = 2$$. $$P(X \ge 2) = 1 - F(1) = 1 - \frac{4}{8} = \frac{4}{8}$$, while $$P(X > 2) = 1 - F(2) = \frac{1}{8}$$. For a discrete variable the equal sign moves the answer by $$f(2) = \frac{3}{8}$$.

### Q: $$X$$ is the score on a fair die. Find $$E(X)$$ and $$\operatorname{Var}(X)$$ by the shortcut, then explain what $$E(X) = 3.5$$ means when no face shows 3.5.
**Topic:** 3d Mean and variance of a discrete random variable (long-run average · E of a function of X · variance by definition and by the shortcut · not the sample mean)  **Lec:** 8  **Type:** derive
**A:** With $$f(x) = \frac{1}{6}$$ at 1 to 6:

$$
\begin{aligned}
E(X) &= \frac{21}{6} = 3.5 \\
E(X^2) &= \frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \frac{91}{6} \\
\operatorname{Var}(X) &= \frac{91}{6} - 3.5^2 = \frac{35}{12} \approx 2.92 \\
\sigma &\approx 1.71
\end{aligned}
$$

3.5 is the long-run average of the scores over hypothetically many rolls, not a value one roll can show.

### Q: $$Y$$ takes $$-2, 0, 3, 6$$ with probabilities 0.2, 0.3, 0.1, 0.4. Find $$E(Y)$$, $$E(Y^2)$$, $$\operatorname{Var}(Y)$$ and $$\operatorname{SD}(Y)$$.
**Topic:** 3d Mean and variance of a discrete random variable (long-run average · E of a function of X · variance by definition and by the shortcut · not the sample mean)  **Lec:** 8  **Type:** apply
**A:** Weight each value by its probability:

$$
\begin{aligned}
E(Y) &= -2(0.2) + 0(0.3) + 3(0.1) + 6(0.4) \\
&= -0.4 + 0 + 0.3 + 2.4 = 2.3 \\
E(Y^2) &= 4(0.2) + 0 + 9(0.1) + 36(0.4) \\
&= 0.8 + 0.9 + 14.4 = 16.1 \\
\operatorname{Var}(Y) &= 16.1 - 2.3^2 = 16.1 - 5.29 = 10.81 \\
\operatorname{SD}(Y) &= \sqrt{10.81} \approx 3.29
\end{aligned}
$$

### Q: "The mean of a random variable is the sum of its values divided by how many there are, like Chapter 1." Correct the claim, and say when the two formulas happen to agree.
**Topic:** 3d Mean and variance of a discrete random variable (long-run average · E of a function of X · variance by definition and by the shortcut · not the sample mean)  **Lec:** 8  **Type:** critique
**A:** Chapter 1's mean is a statistic of $$n$$ data values. A random variable's mean is $$\mu = \sum x\,f(x)$$, a weighted average of the possible values with the pmf as weights; the distribution, not a count of data, carries the information. The two agree only when every possible value is equally likely, as for a fair die, where $$\sum x\,f(x) = \frac{1 + \dots + 6}{6}$$.

## Lec 9 — Ch 4: continuous random variables, the pdf and cdf, uniform and exponential (logged 2026-09-28 from the posted deck and the recording)

### Q: $$f(x) = cx$$ on $$[0, 4]$$ and 0 elsewhere. Find $$c$$, confirm $$f$$ is a pdf, and find $$P(1 \le X \le 3)$$ and $$P(X = 2)$$.
**Topic:** 3c Continuous random variables and the pdf (probability as area · f ≥ 0 and total area 1 · find the constant · endpoints do not matter · P at a point is 0)  **Lec:** 9  **Type:** apply
**A:** The total area must be 1:

$$
\int_0^4 cx\,dx = 8c = 1 \;\Rightarrow\; c = \frac{1}{8}
$$

Then $$f(x) = \frac{x}{8} \ge 0$$ on the support, so it is a pdf.

$$
P(1 \le X \le 3) = \int_1^3 \frac{x}{8}\,dx = \frac{9 - 1}{16} = 0.5
$$

$$P(X = 2) = 0$$, because a single point has no area.

### Q: A student says $$f(x) = 2$$ on $$[0, 0.5]$$ cannot be a pdf because a probability cannot exceed 1. Respond.
**Topic:** 3c Continuous random variables and the pdf (probability as area · f ≥ 0 and total area 1 · find the constant · endpoints do not matter · P at a point is 0)  **Lec:** 9  **Type:** critique
**A:** $$f$$ is a density, not a probability. The tests are $$f \ge 0$$ and total area 1, and here the area is $$2 \times 0.5 = 1$$, so it is a valid pdf, the uniform distribution on $$[0, 0.5]$$. Only areas under $$f$$ are probabilities, and every one of them is at most 1.

### Q: Why are $$P(a \le X \le b)$$ and $$P(a < X < b)$$ equal for a continuous $$X$$ but not for a discrete one? Give a discrete example where they differ.
**Topic:** 3c Continuous random variables and the pdf (probability as area · f ≥ 0 and total area 1 · find the constant · endpoints do not matter · P at a point is 0)  **Lec:** 9  **Type:** recall
**A:** For a continuous $$X$$, $$P(X = a) = P(X = b) = 0$$, so including or excluding the endpoints changes nothing. For a discrete $$X$$ the endpoints can carry probability. With $$X$$ = the number of heads in three flips, $$P(1 \le X \le 2) = \frac{6}{8}$$ while $$P(1 < X < 2) = 0$$, since no possible value lies strictly between 1 and 2.

### Q: For $$f(x) = \frac{x}{8}$$ on $$[0, 4]$$, find the cdf as a piecewise function, recover $$f$$ by differentiation, and find $$P(X > 3)$$ and the median.
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** 9  **Type:** derive
**A:** Integrate from the left end of the support:

$$
F(x) = \int_0^x \frac{t}{8}\,dt = \frac{x^2}{16}, \qquad 0 \le x \le 4
$$

with $$F(x) = 0$$ for $$x < 0$$ and $$F(x) = 1$$ for $$x > 4$$. Differentiating $$\frac{x^2}{16}$$ gives $$\frac{x}{8}$$, the pdf back. $$P(X > 3) = 1 - F(3) = 1 - \frac{9}{16} = \frac{7}{16}$$. The median solves $$\frac{x^2}{16} = 0.5$$, so $$x = \sqrt{8} \approx 2.83$$.

### Q: $$X$$ is uniform on $$[0, 100]$$, the deck's Example 6. Find $$Q_1$$, $$Q_3$$ and the IQR, and $$P(X > 85)$$.
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** 9  **Type:** apply
**A:** $$F(x) = \frac{x}{100}$$ on $$[0, 100]$$. $$Q_1$$ solves $$\frac{x}{100} = 0.25$$, so $$Q_1 = 25$$; $$Q_3$$ solves $$\frac{x}{100} = 0.75$$, so $$Q_3 = 75$$; $$\text{IQR} = 50$$. $$P(X > 85) = 1 - F(85) = 0.15$$.

### Q: Given $$F(x) = \frac{x^3}{8}$$ on $$[0, 2]$$, a student writes $$P(X < 1) = F(2) - F(1) = \frac{7}{8}$$. Fix the error, then compute $$P(X < 1)$$, $$P(X \ge 1)$$ and $$P(0.5 < X < 1.5)$$.
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** 9  **Type:** critique
**A:** $$F(2) - F(1)$$ is $$P(1 < X < 2)$$. The three asked for:

$$
\begin{aligned}
P(X < 1) &= F(1) = \frac{1}{8} \\
P(X \ge 1) &= 1 - F(1) = \frac{7}{8} \\
P(0.5 < X < 1.5) &= F(1.5) - F(0.5) \\
&= \frac{3.375}{8} - \frac{0.125}{8} = \frac{3.25}{8} \approx 0.406
\end{aligned}
$$

### Q: A bus wait time $$X$$ is uniform on $$[0, 20]$$ minutes. Find the mean, the variance, $$P(X > 15)$$ and the 90th percentile.
**Topic:** 3g–i Mean, variance, uniform and exponential (E and Var by integration · the shortcut · uniform mean and variance · exponential mean and variance by parts · median from F)  **Lec:** 9  **Type:** apply
**A:** Use the uniform results and $$F(x) = \frac{x}{20}$$:

$$
\begin{aligned}
E(X) &= \frac{0 + 20}{2} = 10 \text{ minutes} \\
\operatorname{Var}(X) &= \frac{20^2}{12} = \frac{400}{12} \approx 33.3, \quad \text{SD} \approx 5.77 \\
P(X > 15) &= 1 - 0.75 = 0.25
\end{aligned}
$$

The 90th percentile solves $$\frac{x}{20} = 0.9$$, giving 18 minutes.

### Q: A component's time to failure $$X$$ is exponential with mean 200 hours. Find $$\lambda$$, $$P(X > 300)$$, $$P(100 < X < 300)$$ and the median lifetime.
**Topic:** 3g–i Mean, variance, uniform and exponential (E and Var by integration · the shortcut · uniform mean and variance · exponential mean and variance by parts · median from F)  **Lec:** 9  **Type:** apply
**A:** $$E(X) = \frac{1}{\lambda} = 200$$, so $$\lambda = 0.005$$ per hour. Then:

$$
\begin{aligned}
P(X > 300) &= e^{-1.5} \approx 0.223 \\
P(100 < X < 300) &= F(300) - F(100) \\
&= e^{-0.5} - e^{-1.5} \\
&\approx 0.607 - 0.223 = 0.383 \\[4pt]
1 - e^{-\lambda m} &= 0.5 \\
m &= \frac{\ln 2}{\lambda} = 200 \ln 2 \approx 139 \text{ hours}
\end{aligned}
$$

The median is below the mean because the distribution is right-skewed.

### Q: One problem gives a pdf $$f(x)$$. Another gives $$P(T > t) = \frac{16}{(4 + t)^2}$$ for $$t \ge 0$$. How do you get a probability from each, and how do you tell which one you were handed? Find $$P(T \le 4)$$.
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** 9  **Type:** apply
**A:** Read the left side of the equals sign. A pdf $$f(x)$$ is a height, not a probability, so you integrate it over the range you want. $$P(\dots)$$ or $$F(x)$$ is already a probability, so you plug the number in. Here $$P(T > 4) = \frac{16}{64} = 0.25$$, and $$P(T \le 4)$$ is its complement, $$1 - 0.25 = 0.75$$.

### Q: Why is $$P(X = c) = 0$$ for a continuous $$X$$, and where does the total probability of 1 sit if every single value has probability 0?
**Topic:** 3c Continuous random variables and the pdf (probability as area · f ≥ 0 and total area 1 · find the constant · endpoints do not matter · P at a point is 0)  **Lec:** 9  **Type:** recall
**A:** A continuous $$X$$ can take endlessly many values, such as 1, 1.1, 1.01 and 1.001. If each exact value had even a chance of 0.001, a thousand of them would already add to 1 and the rest would push the total past 1, so each one must be exactly 0. The 1 sits in ranges, the way length does on a ruler: the point from 1 to 1 has length $$1 - 1 = 0$$, but the stretch from 0 to 2 has length 2. A range's probability is its area under $$f$$, and the area over the whole support is 1.

### Q: Why is $$E(X) = \int x\,f(x)\,dx$$ the same idea as the discrete mean $$\sum x\,P(X = x)$$, and what changes for $$E(\sqrt{X})$$?
**Topic:** 3g–i Mean, variance, uniform and exponential (E and Var by integration · the shortcut · uniform mean and variance · exponential mean and variance by parts · median from F)  **Lec:** 9  **Type:** recall
**A:** Both are each value times its chance, added up. In the continuous case the chance of landing in a thin strip near $$x$$ is $$f(x)\,dx$$, and the integral does the adding. For $$E(\sqrt{X})$$, or any function of $$X$$, replace the $$x$$ in front of $$f(x)$$ with what is inside the brackets, giving $$\int \sqrt{x}\,f(x)\,dx$$. The $$f(x)$$ itself never changes.

## WeBWorK 3 — Ch 4 (opened Sep 29, due Tue Oct 6; banked 2026-09-29, numbers changed)

### Q: WeBWorK-style. An unevenly balanced four-sided die has $$P(1) = 0.15$$, $$P(1 \text{ or } 2) = 0.45$$ and $$P(2 \text{ or } 3) = 0.50$$. You win the amount showing on the die. From a blank page, build the full pmf and then find your expected winnings.
**Topic:** 3d Mean and variance of a discrete random variable (long-run average · E of a function of X · variance by definition and by the shortcut · not the sample mean)  **Lec:** WW3  **Type:** apply
**A:** The three facts pin down the pmf one face at a time:

$$
\begin{aligned}
P(2) &= P(1 \text{ or } 2) - P(1) = 0.45 - 0.15 = 0.30 \\
P(3) &= P(2 \text{ or } 3) - P(2) = 0.50 - 0.30 = 0.20 \\
P(4) &= 1 - 0.15 - 0.30 - 0.20 = 0.35 \\[4pt]
E(X) &= 1(0.15) + 2(0.30) + 3(0.20) + 4(0.35) \\
&= 0.15 + 0.60 + 0.60 + 1.40 = 2.75 \text{ dollars}
\end{aligned}
$$

The trap is forgetting the fourth face; the pmf must sum to 1 before you take the expectation, and "1 or 2" is a union of disjoint outcomes, not a conditional. A faster route when only the mean is asked: for a value from 1 to 4, $$E(X) = P(X \ge 1) + P(X \ge 2) + P(X \ge 3) + P(X \ge 4)$$, and each term comes straight from the given numbers: $$1 + (1 - 0.15) + (1 - 0.45) + (1 - 0.15 - 0.50) = 2.75$$. That is $$4 - 2P(1) - P(1 \text{ or } 2) - P(2 \text{ or } 3)$$ in one line. The variance still needs the full pmf.

### Q: WeBWorK-style. A random variable $$X$$ has mean $$-9$$ and standard deviation 3. Give the mean and standard deviation of (1) $$Y = X + 4$$, (2) $$V = 5X$$ and (3) $$W = 5X + 4$$, and state the rule you used for each.
**Topic:** 3d Mean and variance of a discrete random variable (long-run average · E of a function of X · variance by definition and by the shortcut · not the sample mean)  **Lec:** WW3  **Type:** apply
**A:** For a linear change $$aX + b$$, the mean follows the whole transformation and the spread follows only the multiplier:

$$
\begin{aligned}
E(aX + b) &= aE(X) + b \\
\operatorname{Var}(aX + b) &= a^2 \operatorname{Var}(X) \\
\operatorname{SD}(aX + b) &= |a| \cdot \operatorname{SD}(X)
\end{aligned}
$$

(1) $$Y = X + 4$$: mean $$-9 + 4 = -5$$, SD 3 (a shift moves every value the same distance, so spread is untouched). (2) $$V = 5X$$: mean $$5(-9) = -45$$, SD $$5 \times 3 = 15$$. (3) $$W = 5X + 4$$: mean $$-45 + 4 = -41$$, SD 15. The two errors WeBWorK is fishing for are adding the constant to the SD and forgetting that variance scales by $$a^2$$, not $$a$$ — which is why the question asks for SD, where the factor is $$|a|$$.

## Lec 10 — Ch 4: rules for the mean and variance, covariance, sums and averages, the maximum and minimum (logged 2026-10-02 from the posted decks)

### Q: From the definition $$\operatorname{Var}(X) = E[(X - \mu)^2]$$, prove the shortcut $$\operatorname{Var}(X) = E(X^2) - [E(X)]^2$$, and name the rule used at each step.
**Topic:** 3j Rules for the mean and variance (E of aX + b · E of a sum always adds · E of XY splits only under independence · Var of aX + b is a² Var X · proof of the shortcut)  **Lec:** 10  **Type:** derive
**A:** Expand the square, then use two rules: the expectation of a sum is the sum of the expectations, and constants come out of $$E$$, so $$E(2\mu X) = 2\mu E(X) = 2\mu^2$$ and $$E(\mu^2) = \mu^2$$.

$$
\begin{aligned}
E\big[(X - \mu)^2\big] &= E\big[X^2 - 2\mu X + \mu^2\big] \\
&= E(X^2) - E(2\mu X) + E(\mu^2) \\
&= E(X^2) - 2\mu^2 + \mu^2 \\
&= E(X^2) - \big[E(X)\big]^2
\end{aligned}
$$

### Q: $$X$$ has mean 4 and variance 9. Find $$E(3X - 5)$$, $$\operatorname{Var}(3X - 5)$$, $$\operatorname{SD}(3X - 5)$$, $$E(X^2)$$ and $$E[(X - 2)^2]$$.
**Topic:** 3j Rules for the mean and variance (E of aX + b · E of a sum always adds · E of XY splits only under independence · Var of aX + b is a² Var X · proof of the shortcut)  **Lec:** 10  **Type:** apply
**A:** The $$-5$$ shifts the values and does not spread them. $$E(X^2)$$ comes from rearranging the shortcut.

$$
\begin{aligned}
E(3X - 5) &= 3(4) - 5 = 7 \\
\operatorname{Var}(3X - 5) &= 3^2(9) = 81 \\
\operatorname{SD}(3X - 5) &= 9 \\
E(X^2) &= \operatorname{Var}(X) + [E(X)]^2 \\
&= 9 + 16 = 25 \\
E[(X - 2)^2] &= E(X^2) - 4E(X) + 4 \\
&= 25 - 16 + 4 = 13
\end{aligned}
$$

### Q: Three claims about random variables $$X$$ and $$Y$$, each with positive variance. Correct each one. (a) $$\operatorname{Var}(X - Y) = \operatorname{Var}(X) - \operatorname{Var}(Y)$$ when $$X$$ and $$Y$$ are independent. (b) $$\operatorname{Var}(2X) = 2\operatorname{Var}(X)$$. (c) $$E(XY) = E(X)E(Y)$$ for any $$X$$ and $$Y$$.
**Topic:** 3j Rules for the mean and variance (E of aX + b · E of a sum always adds · E of XY splits only under independence · Var of aX + b is a² Var X · proof of the shortcut)  **Lec:** 10  **Type:** critique
**A:** (a) For independent $$X$$ and $$Y$$, $$\operatorname{Var}(X - Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$$, because $$\operatorname{Var}(-Y) = (-1)^2\operatorname{Var}(Y)$$. With $$\operatorname{Var}(X) = \operatorname{Var}(Y) = 4$$ the claim gives 0, but the right answer is 8. (b) $$\operatorname{Var}(2X) = 2^2\operatorname{Var}(X) = 4\operatorname{Var}(X)$$. (c) $$E(XY) = E(X)E(Y)$$ needs independence. Take $$Y = X$$: then $$E(XY) = E(X^2)$$, which is larger than $$[E(X)]^2$$ by $$\operatorname{Var}(X)$$.

### Q: $$\operatorname{Var}(X) = 4$$, $$\operatorname{Var}(Y) = 9$$ and $$\operatorname{Cov}(X, Y) = -1.5$$. Find $$\operatorname{Var}(3X + 2Y)$$ and $$\operatorname{Var}(X - 2Y)$$, then find both again assuming $$X$$ and $$Y$$ are independent.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** apply
**A:** Use $$\operatorname{Var}(aX + bY) = a^2\operatorname{Var}(X) + b^2\operatorname{Var}(Y) + 2ab\operatorname{Cov}(X, Y)$$.

$$
\begin{aligned}
\operatorname{Var}(3X + 2Y) &= 9(4) + 4(9) + 2(3)(2)(-1.5) \\
&= 36 + 36 - 18 = 54 \\[4pt]
\operatorname{Var}(X - 2Y) &= 4 + 4(9) + 2(1)(-2)(-1.5) \\
&= 4 + 36 + 6 = 46
\end{aligned}
$$

Independent means $$\operatorname{Cov} = 0$$, so the answers become 72 and 40. The sign of $$b$$ changes only the covariance term.

### Q: $$E(X) = 2$$, $$E(Y) = 5$$ and $$E(XY) = 8$$. Find $$\operatorname{Cov}(X, Y)$$, say what its sign means, and say whether $$X$$ and $$Y$$ can be independent.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** apply
**A:** $$\operatorname{Cov}(X, Y) = E(XY) - E(X)E(Y) = 8 - 10 = -2$$. A negative covariance means large $$X$$ values tend to come with small $$Y$$ values, and small with large. They cannot be independent, because independent random variables have covariance 0.

### Q: $$X_1, \dots, X_n$$ are independent, each with mean $$\mu$$ and variance $$\sigma^2$$. Derive $$E(\bar{X}) = \mu$$ and $$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$$, and name the one step that needs independence.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** derive
**A:** $$\bar{X} = \frac{X_1 + \dots + X_n}{n}$$. The mean uses only linearity. For the variance, a constant comes out of a variance squared, and independence makes every covariance 0, so the variance of the sum is the sum of the variances. That step is the only one that needs independence.

$$
\begin{aligned}
E(\bar{X}) &= \frac{1}{n}\big[E(X_1) + \dots + E(X_n)\big] = \frac{1}{n}(n\mu) = \mu \\[4pt]
\operatorname{Var}(\bar{X}) &= \frac{1}{n^2}\operatorname{Var}(X_1 + \dots + X_n) \\
&= \frac{1}{n^2}(n\sigma^2) = \frac{\sigma^2}{n}
\end{aligned}
$$

### Q: A machine fills bottles independently, each with mean 500 ml and SD 4 ml. Find the mean and SD of the total in a pack of 6, and of the average of 16 bottles. Then compare $$\operatorname{Var}(X_1 + X_2)$$ with $$\operatorname{Var}(2X_1)$$.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** apply
**A:** Total of 6: mean $$6(500) = 3000$$ ml, variance $$6(16) = 96$$, SD $$\approx 9.80$$ ml. Average of 16: mean 500 ml, variance $$\frac{16}{16} = 1$$, SD 1 ml. The two variances to compare:

$$
\begin{aligned}
\operatorname{Var}(X_1 + X_2) &= 16 + 16 = 32 \\
\operatorname{Var}(2X_1) &= 4(16) = 64
\end{aligned}
$$

Two independent bottles partly cancel each other's errors; one bottle doubled doubles its error.

### Q: $$X_1$$, $$X_2$$ and $$X_3$$ are independent, with means 2, 3 and 5 and variances 1, 4 and 9. Find the mean and variance of $$Y = X_1 + X_2 + X_3$$ and of $$W = X_1 - 2X_2 + X_3$$.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** apply
**A:** Each coefficient is squared in the variance, so the $$-2$$ adds 16.

$$
\begin{aligned}
E(Y) &= 2 + 3 + 5 = 10 \\
\operatorname{Var}(Y) &= 1 + 4 + 9 = 14 \\
E(W) &= 2 - 2(3) + 5 = 1 \\
\operatorname{Var}(W) &= 1^2(1) + (-2)^2(4) + 1^2(9) \\
&= 1 + 16 + 9 = 26
\end{aligned}
$$

### Q: A system has $$n$$ independent components with the same lifetime cdf $$F$$ and pdf $$f$$. Derive the cdf and pdf of the system lifetime when the components are in parallel, then when they are in series.
**Topic:** 3m–n Maximum and minimum of independent random variables (cdf of the max is the product of the cdfs · pdf by the chain rule · parallel lifetime is the max · series lifetime is the min · flood levels)  **Lec:** 10  **Type:** derive
**A:** Parallel: the system runs until the last component fails, so its lifetime is $$V = \max$$. $$V \le v$$ exactly when every component has failed by $$v$$, so by independence and the chain rule:

$$
F_V(v) = \big[F(v)\big]^n \qquad f_V(v) = n\big[F(v)\big]^{n-1} f(v)
$$

Series: the system dies at the first failure, so its lifetime is $$U = \min$$. $$U > u$$ exactly when every component is still working at $$u$$:

$$
\begin{aligned}
P(U > u) &= \big[1 - F(u)\big]^n \\
F_U(u) &= 1 - \big[1 - F(u)\big]^n \\
f_U(u) &= n\big[1 - F(u)\big]^{n-1} f(u)
\end{aligned}
$$

### Q: Three independent components each have an exponential lifetime with rate 0.01 per hour. Find the probability that the system lasts more than 100 hours when the three are in parallel, and when they are in series.
**Topic:** 3m–n Maximum and minimum of independent random variables (cdf of the max is the product of the cdfs · pdf by the chain rule · parallel lifetime is the max · series lifetime is the min · flood levels)  **Lec:** 10  **Type:** apply
**A:** One component first. Then the parallel system, whose lifetime is the max, and the series system, whose lifetime is the min. Parallel needs all three to fail; series needs only one.

$$
\begin{aligned}
F(100) &= 1 - e^{-0.01 \times 100} \\
&= 1 - e^{-1} \approx 0.632 \\[4pt]
P(\max \le 100) &= 0.632^3 \approx 0.253 \\
P(\max > 100) &\approx 0.747 \\[4pt]
P(\min > 100) &= \big(e^{-1}\big)^3 = e^{-3} \approx 0.050
\end{aligned}
$$

### Q: Two independent components are in parallel. Their lifetimes are exponential with rates 0.1 and 0.2 per year. Find the probability that the system has failed within 5 years.
**Topic:** 3m–n Maximum and minimum of independent random variables (cdf of the max is the product of the cdfs · pdf by the chain rule · parallel lifetime is the max · series lifetime is the min · flood levels)  **Lec:** 10  **Type:** apply
**A:** The system lifetime is the max, and the components are not identically distributed, so multiply the two different cdfs:

$$
\begin{aligned}
F_V(5) &= F_1(5)\,F_2(5) = \big(1 - e^{-0.5}\big)\big(1 - e^{-1}\big) \\
&= 0.3935 \times 0.6321 \approx 0.249
\end{aligned}
$$

The $$[F(v)]^n$$ shortcut applies only when every component has the same cdf.

### Q: A question says $$X_1, \dots, X_n$$ are a random sample from a distribution with mean $$\mu$$ and variance $$\sigma^2$$. What two assumptions does "random sample" carry, and which of $$E(\bar{X}) = \mu$$ and $$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$$ needs which?
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** derive
**A:**
- A random sample means the $$X_i$$ are independent and identically distributed, often written iid. Independent means no value affects another. Identically distributed means they all come from one distribution, so they share the mean $$\mu$$ and the variance $$\sigma^2$$.
- $$E(\bar{X}) = \mu$$ needs only the common mean, because the mean of a sum always adds.
- $$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$$ needs the common variance and also independence, which makes every covariance term 0 so that the variances add.

### Q: True or false, and justify each: (a) $$\operatorname{Cov}(X, Y) = 50$$ shows that $$X$$ and $$Y$$ are strongly related. (b) If $$X$$ and $$Y$$ are independent, then $$\operatorname{Cov}(X, Y) = 0$$. (c) If $$\operatorname{Cov}(X, Y) = 0$$, then $$X$$ and $$Y$$ are independent.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** critique
**A:**
- (a) False. Covariance gives only the direction of a linear relationship, and a positive value means the two tend to rise together. Its size depends on the units, so it says nothing about strength. The correlation, in Chapter 11, measures strength.
- (b) True. Independence gives $$E(XY) = E(X)E(Y)$$, so $$\operatorname{Cov}(X, Y) = E(XY) - E(X)E(Y) = 0$$.
- (c) False. The deck states only the direction in (b). A covariance of 0 rules out a linear relationship, not every kind of dependence.

### Q: $$X$$ is continuous with pdf $$f$$, cdf $$F$$ and median $$m$$. Which of these are true? (a) $$F(m) = 0.5$$ (b) $$\int_{-\infty}^{m} f(x)\,dx = 0.5$$ (c) $$\int_{m}^{\infty} f(x)\,dx = 0.5$$ (d) $$P(X > m) = 0.5$$
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** 10  **Type:** apply
**A:**
- All four are true. The median splits the area under $$f$$ in half.
- (a) defines the median through the cdf.
- (b) is the same statement as an integral, since $$F(m) = \int_{-\infty}^{m} f(x)\,dx$$.
- (c) is the other half. The total area is 1, so the area to the right of $$m$$ is $$1 - 0.5 = 0.5$$.
- (d) is (c) written as a probability.
- In lecture 10 this was an iClicker whose answer was "all of these", and 79% got it. The trap was stopping at the first true option.

## Lec 11 — Ch 4: in-class Activity 3, expectation and variance of discrete random variables (logged 2026-10-05 from the activity sheets)

### Q: A four-sided die has faces $$-2$$, $$0$$, $$1$$ and $$3$$ with probabilities $$k$$, $$2k$$, $$3k$$ and $$4k$$. Find $$k$$, then $$E(X)$$, $$E(X^2)$$ and $$\operatorname{Var}(X)$$.
**Topic:** 3d Mean and variance of a discrete random variable (long-run average · E of a function of X · variance by definition and by the shortcut · not the sample mean)  **Lec:** 11  **Type:** apply
**A:** The probabilities sum to 1, so $$10k = 1$$ and $$k = 0.1$$. Each probability is then between 0 and 1, as a pmf needs.

$$
\begin{aligned}
E(X) &= -2(0.1) + 0(0.2) \\
&\quad + 1(0.3) + 3(0.4) \\
&= -0.2 + 0.3 + 1.2 = 1.3 \\
E(X^2) &= 4(0.1) + 0 \\
&\quad + 1(0.3) + 9(0.4) \\
&= 0.4 + 0.3 + 3.6 = 4.3 \\
\operatorname{Var}(X) &= 4.3 - 1.3^2 \\
&= 4.3 - 1.69 = 2.61
\end{aligned}
$$

### Q: For the same die (faces $$-2, 0, 1, 3$$ with probabilities 0.1, 0.2, 0.3, 0.4; $$E(X) = 1.3$$, $$\operatorname{Var}(X) = 2.61$$), let $$Y = 3X + 2$$. Write the pmf of $$Y$$, find $$E(Y)$$ and $$\operatorname{Var}(Y)$$ with the linear rules, and say what the $$+2$$ does to each.
**Topic:** 3j Rules for the mean and variance (E of aX + b · E of a sum always adds · E of XY splits only under independence · Var of aX + b is a² Var X · proof of the shortcut)  **Lec:** 11  **Type:** apply
**A:** $$Y$$ takes $$-4$$, $$2$$, $$5$$ and $$11$$ with the same probabilities 0.1, 0.2, 0.3 and 0.4.

$$
\begin{aligned}
E(Y) &= 3(1.3) + 2 = 5.9 \\
\operatorname{Var}(Y) &= 3^2(2.61) = 23.49
\end{aligned}
$$

The $$+2$$ shifts the mean by 2 and does nothing to the variance, because moving every value by the same amount leaves the spread unchanged. The 3 multiplies the mean by 3 and the variance by 9.

### Q: For the same die (faces $$-2, 0, 1, 3$$ with probabilities 0.1, 0.2, 0.3, 0.4; $$E(X) = 1.3$$), find $$E(X^3)$$ and compare it with $$[E(X)]^3$$. Why can no shortcut rule give $$E(X^3)$$?
**Topic:** 3d Mean and variance of a discrete random variable (long-run average · E of a function of X · variance by definition and by the shortcut · not the sample mean)  **Lec:** 11  **Type:** apply
**A:**

$$
\begin{aligned}
E(X^3) &= -8(0.1) + 0 \\
&\quad + 1(0.3) + 27(0.4) \\
&= -0.8 + 0.3 + 10.8 = 10.3
\end{aligned}
$$

$$[E(X)]^3 = 1.3^3 = 2.197$$, so they are not equal. The rules only move constants through $$E$$ for linear functions $$aX + b$$. For any other $$g$$, $$E[g(X)] = \sum g(x) f(x)$$ has to be computed from the pmf.

### Q: A die has faces $$-3, -1, 1, 2$$ with probabilities 0.2, 0.3, 0.1, 0.4, so $$E(X) = 0$$ and $$\operatorname{Var}(X) = 3.8$$. Game A pays the sum of two independent rolls; Game B pays twice one roll. Find $$P(W_A = -2)$$, then the mean and variance of each game's winning, and say which game is riskier.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 11  **Type:** apply
**A:** A sum of $$-2$$ comes from $$(-3, 1)$$, $$(1, -3)$$ or $$(-1, -1)$$, and independent rolls multiply.

$$
\begin{aligned}
P(W_A = -2) &= 2(0.2)(0.1) + 0.3^2 \\
&= 0.04 + 0.09 = 0.13
\end{aligned}
$$

Both means are 0: $$E(X_1 + X_2) = 0 + 0$$ and $$E(2X) = 2(0)$$.

$$
\begin{aligned}
\operatorname{Var}(W_A) &= 3.8 + 3.8 = 7.6 \\
\operatorname{Var}(W_B) &= 2^2(3.8) = 15.2
\end{aligned}
$$

Game B is riskier: same mean, twice the variance.

### Q: True or false, and justify: if $$X_1$$ and $$X_2$$ are independent copies of $$X$$, then $$X_1 + X_2$$ and $$2X$$ have the same distribution, so they have the same variance.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 11  **Type:** critique
**A:** False. They have the same mean, $$2\mu$$, but not the same distribution or variance. Independent variances add, so $$\operatorname{Var}(X_1 + X_2) = 2\sigma^2$$, while a constant multiple squares, so $$\operatorname{Var}(2X) = 4\sigma^2$$. In general the sum of $$n$$ independent copies has variance $$n\sigma^2$$ and $$nX$$ has $$n^2\sigma^2$$. Two rolls can land high and low and partly cancel; doubling one roll scales every deviation by 2.

### Q: In Game A (sum of two independent rolls of the die with faces $$-3, -1, 1, 2$$ and probabilities 0.2, 0.3, 0.1, 0.4), find $$P(W_A = -6)$$ and $$P(W_A = 4)$$, and give the two ways to get $$E(W_A)$$.
**Topic:** 3a–b Random variables and the pmf (X as a function on S · possible values · discrete vs continuous · pmf properties · find the constant · probability statements)  **Lec:** 11  **Type:** apply
**A:** $$-6$$ needs two $$-3$$s: $$0.2^2 = 0.04$$. $$4$$ needs two 2s: $$0.4^2 = 0.16$$. The two ways to get the mean are the definition $$E(W_A) = \sum w f(w)$$ over the nine possible sums, and the rule $$E(X_1 + X_2) = E(X_1) + E(X_2) = 0$$, which holds even without independence.

## WeBWorK 4 — Ch 4 (opened Oct 6, due Thu Oct 15; banked 2026-10-06, numbers changed)

### Q: WeBWorK-style. A repair time $$T$$ is exponential with mean 5 hours. Given that a repair has already taken more than 10 hours, what is the probability it takes at least 10.5 hours? Pick the right form: $$e^{-0.1}$$, $$1 - e^{-0.1}$$, $$e^{-2.1}$$ or $$1 - \frac{1}{5}e^{-0.1}$$.
**Topic:** 3g–i Mean, variance, uniform and exponential (E and Var by integration · the shortcut · uniform mean and variance · exponential mean and variance by parts · median from F)  **Lec:** WW4  **Type:** apply
**A:** The answer is $$e^{-0.1} \approx 0.905$$. The exponential is memoryless: having already lasted 10 hours does not change the chance of lasting another half hour. With mean 5 the rate is $$\lambda = \frac{1}{5}$$, and $$P(T > t) = e^{-t/5}$$.

$$
\begin{aligned}
P(T \ge 10.5 \mid T > 10) &= \frac{P(T \ge 10.5)}{P(T > 10)} \\
&= \frac{e^{-10.5/5}}{e^{-10/5}} \\
&= e^{-0.5/5} = e^{-0.1}
\end{aligned}
$$

The trap options are $$1 - e^{-0.1}$$, which is the chance of finishing within the extra half hour, and $$e^{-2.1}$$, which ignores the condition.

### Q: WeBWorK-style. A component's lifetime has pdf $$f(x) = \frac{1}{120}e^{-x/120}$$ for $$x > 0$$. Four such components work independently. (1) Wired in series, what is the system's lifetime $$Y$$ and its distribution? (2) Wired in parallel, what changes?
**Topic:** 3m–n Maximum and minimum of independent random variables (cdf of the max is the product of the cdfs · pdf by the chain rule · parallel lifetime is the max · series lifetime is the min · flood levels)  **Lec:** WW4  **Type:** apply
**A:** (1) A series system dies when the first component dies, so $$Y = \min(X_1, \dots, X_4)$$. The minimum of independent exponentials is exponential with the rates added:

$$
\begin{aligned}
P(Y > y) &= \left(e^{-y/120}\right)^4 \\
&= e^{-4y/120} = e^{-y/30}
\end{aligned}
$$

So $$Y$$ is exponential with mean 30 hours. (2) A parallel system runs until the last component dies, so $$Y = \max(X_1, \dots, X_4)$$, with cdf $$\left(1 - e^{-y/120}\right)^4$$. That is not of the form $$1 - e^{-\lambda y}$$, so the maximum is not exponential. The WeBWorK distractors pair "max" with an exponential mean, or multiply the mean instead of dividing it.

### Q: WeBWorK-style. $$X$$ is uniform on $$[0, 2]$$ and $$Y = e^X$$. Find the pdf of $$Y$$, including its support, by the cdf method.
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** WW4  **Type:** derive
**A:** Write the cdf of $$Y$$ as a statement about $$X$$, use the uniform cdf, then differentiate. Since $$e^x$$ is increasing, $$Y \le y$$ exactly when $$X \le \ln y$$, and $$Y$$ runs from $$e^0 = 1$$ to $$e^2$$.

$$
\begin{aligned}
F_Y(y) &= P(X \le \ln y) \\
&= \frac{\ln y - 0}{2} \\
f_Y(y) &= \frac{d}{dy}\,\frac{\ln y}{2} = \frac{1}{2y}
\end{aligned}
$$

So $$f_Y(y) = \frac{1}{2y}$$ for $$1 \le y \le e^2$$ and 0 otherwise. Check: the area is $$\frac{1}{2}(\ln e^2 - \ln 1) = 1$$. The tempting wrong answer keeps $$f_Y$$ constant at $$\frac{1}{2}$$, as if the transformation did not stretch the axis.

### Q: WeBWorK-style. $$X$$ is uniform on $$(0, 3)$$. Find the median of $$e^X$$ to two decimals, and say why the same shortcut does not give the mean.
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** WW4  **Type:** apply
**A:** The median of $$X$$ is 1.5. Because $$e^x$$ is increasing, half the values of $$X$$ lie below 1.5 exactly when half the values of $$e^X$$ lie below $$e^{1.5}$$, so the median of $$e^X$$ is $$e^{1.5} \approx 4.48$$. Solving $$F_Y(m) = 0.5$$ gives the same: $$\frac{\ln m}{3} = 0.5$$, so $$m = e^{1.5}$$. The mean does not carry over, because $$E(e^X) \ne e^{E(X)}$$. Here $$E(e^X) = \frac{e^3 - 1}{3} \approx 6.36$$, larger than 4.48 because $$e^x$$ bends upward.

## Long problems — need paper: steps only in a normal quiz, worked in full in the Friday set

### Q: Build the stem-and-leaf plot for the deck's example 80 85 75 90 62 50 55 65 75 82 70 25 92 57 63 72 81 95 41 69. Why does the procedure say to include empty stems, and what is the median?
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** derive
**A:** Steps:
1. Use the tens digit as the stem and list every stem from 2 to 9, empty ones included.
2. Put each value's units digit on its stem's row, then sort each row.
3. Count in from the smallest value. With 20 values the median is the average of the 10th and 11th.

Stems 2 to 9, with the leaves sorted:

| Stem | Leaves |
|---|---|
| 2 | 5 |
| 3 | |
| 4 | 1 |
| 5 | 0 5 7 |
| 6 | 2 3 5 9 |
| 7 | 0 2 5 5 |
| 8 | 0 1 2 5 |
| 9 | 0 2 5 |

- Empty stems stay in, so the plot keeps the shape of a histogram and the gap in the 30s is visible.
- With $$n = 20$$ the median is the average of the 10th and 11th ordered values, 70 and 72, so it is 71.

### Q: Fifteen students' commute times in minutes were 31, 18, 26, 44, 22, 29, 35, 27, 90, 24, 33, 20, 28, 38, 25. (a) Sort the data and find the mean and the median. (b) Find $$Q_1$$, $$Q_3$$ and the IQR by the course's $$np + 0.5$$ rule. (c) Find the $$1.5 \times \text{IQR}$$ fences, any outliers and where each whisker ends, and say what the box plot shows about the shape. (d) Drop the 90 and recompute the mean and the median. Which one moved, and why?
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** 4  **Type:** apply
**A:** Steps:
1. Sort the values and add them for the mean. The median is at position $$np + 0.5 = 8$$.
2. Find the quartile positions with $$np + 0.5$$ for $$p = 0.25$$ and $$p = 0.75$$. A position that is not a whole number means the plain average of the two values on either side of it.
3. The fences sit $$1.5 \times \text{IQR}$$ beyond each quartile. A value outside a fence is an outlier, and each whisker stops at the most extreme value inside its fence.
4. Recompute without the 90 and compare.

(a) Sorted: 18, 20, 22, 24, 25, 26, 27, 28, 29, 31, 33, 35, 38, 44, 90.

$$
\begin{aligned}
\sum x &= 490 \\
\bar{x} &= \frac{490}{15} \approx 32.67 \text{ min} \\
\text{median} &= x_{(8)} = 28 \text{ min}
\end{aligned}
$$

(b) For $$Q_1$$ the position is $$15 \times 0.25 + 0.5 = 4.25$$, between the 4th and 5th values. For $$Q_3$$ it is $$15 \times 0.75 + 0.5 = 11.75$$, between the 11th and 12th.

$$
\begin{aligned}
Q_1 &= \frac{24 + 25}{2} = 24.5 \\
Q_3 &= \frac{33 + 35}{2} = 34 \\
\text{IQR} &= 34 - 24.5 = 9.5 \text{ min}
\end{aligned}
$$

(c) The fences are $$1.5 \times 9.5 = 14.25$$ beyond the quartiles.

$$
\begin{aligned}
\text{lower} &= 24.5 - 14.25 = 10.25 \\
\text{upper} &= 34 + 14.25 = 48.25
\end{aligned}
$$

- 90 is above 48.25, so it is the only outlier, and it is drawn as its own point.
- The lower whisker ends at 18, the smallest value. The upper whisker ends at 44, the largest value inside the upper fence.
- The median line sits closer to $$Q_1$$ than to $$Q_3$$, and with the outlier on the high side that means a right skew. The mean, 32.67, is above the median, 28, which agrees.

(d) Without the 90 there are 14 values, so the median is the average of the 7th and 8th, 27 and 28.

$$
\begin{aligned}
\bar{x} &= \frac{400}{14} \approx 28.57 \text{ min} \\
\text{median} &= \frac{27 + 28}{2} = 27.5 \text{ min}
\end{aligned}
$$

The mean fell by about 4 minutes and the median by half a minute. The mean uses every value, so one extreme value pulls it. The median depends only on the middle of the sorted list, which is why it is called resistant. Same method as the lecture 4 deck's 20-value example.

### Q: WeBWorK-style. Surface flaws on 50 new cars: 0 flaws on 4 cars, 1 flaw on 8, 2 on 15, 3 on 11, 4 on 7, 5 on 4, 6 on 1. From a blank page, find the mean and the sample variance of flaws per car, to two decimals.
**Topic:** 1b Variance and standard deviation (n − 1 formula · units · not resistant · effect of y = a + bx)  **Lec:** WW1  **Type:** derive
**A:** Steps:
1. Treat each row as $$f$$ copies of the value $$x$$, so $$n = \sum f$$.
2. The mean is $$\frac{\sum fx}{n}$$.
3. Get $$\sum fx^2$$, then the sample variance with the shortcut, dividing by $$n - 1$$.

Each row is $$f$$ copies of $$x$$, so:

$$
\begin{aligned}
n &= \sum f = 50 \\
\sum fx &= 0 + 8 + 30 + 33 + 28 \\
&\quad + 20 + 6 = 125 \\
\bar{x} &= \frac{125}{50} = 2.50 \\
\sum fx^2 &= 0 + 8 + 60 + 99 + 112 \\
&\quad + 100 + 36 = 415 \\
s^2 &= \frac{\sum fx^2 - n\bar{x}^2}{n - 1} \\
&= \frac{415 - 50 \times 6.25}{49} = \frac{102.5}{49} = 2.09
\end{aligned}
$$

Divide by $$n - 1$$: dividing by 50 gives 2.05, the population variance, which is not the sample variance this course uses.

### Q: WeBWorK-style. The times in seconds between twelve consecutive eruptions of a geyser were 913, 887, 902, 869, 931, 878, 895, 908, 862, 890, 921, 874. From a blank page find (a) the sample mean, (b) the sample variance, (c) the sample median and (d) the sample IQR, each to two decimals. Then say why R may hand back a different IQR from the one this course's rule gives.
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** WW2  **Type:** derive
**A:** Steps:
1. Add the twelve values and divide by 12 for the mean.
2. Add the squared deviations and divide by $$n - 1 = 11$$ for the variance.
3. Sort the values. With $$n$$ even, the median is the average of the 6th and 7th.
4. The quartile positions by $$np + 0.5$$ are 3.5 and 9.5, so each quartile averages two neighbouring values. The IQR is $$Q_3 - Q_1$$.

(a) $$\sum x = 10730$$ and $$n = 12$$, so $$\bar{x} = \frac{10730}{12} = 894.17$$ s. (b) $$\sum (x - \bar{x})^2 = 5089.64$$, so $$s^2 = \frac{5089.64}{11} = 462.69 \text{ s}^2$$. Divide by $$n - 1$$, not $$n$$. (c) Sorted: 862, 869, 874, 878, 887, 890, 895, 902, 908, 913, 921, 931. $$n$$ is even, so the median is the mean of the 6th and 7th values, $$\frac{890 + 895}{2} = 892.50$$ s. (d) By the course's $$np + 0.5$$ rule:

$$
\begin{aligned}
Q_1 \text{ position} &= 0.25 \times 12 + 0.5 = 3.5 \\
Q_1 &= \frac{874 + 878}{2} = 876 \\[4pt]
Q_3 \text{ position} &= 0.75 \times 12 + 0.5 = 9.5 \\
Q_3 &= \frac{908 + 913}{2} = 910.5 \\[4pt]
\text{IQR} &= 910.5 - 876 = 34.50 \text{ s}
\end{aligned}
$$

Position 3.5 means the mean of the 3rd and 4th values; position 9.5 means the mean of the 9th and 10th. R's default `quantile` uses type 7, which interpolates at position $$(n - 1)p + 1$$ instead: $$Q_1 = 877$$, $$Q_3 = 909.25$$, $$\text{IQR} = 32.25$$. The WeBWorK problem says so itself — it wants R's answer, the exam wants the $$np + 0.5$$ rule, and the gap between them is only interpolation, never a different definition of a quartile.

### Q: In a first-year cohort, 60% take MATH, 45% take STAT and 30% take CHEM. 25% take MATH and STAT, 15% take MATH and CHEM, 10% take STAT and CHEM, and 5% take all three. A student is picked at random. Find (a) the probability they take at least one of the three, (b) the probability they take none, (c) the probability they take exactly one, and (d) $$P(\text{STAT} \mid \text{MATH})$$, and say whether taking MATH and taking STAT are independent.
**Topic:** 2f Probability rules and the addition rule (outcome probabilities sum to 1 · complement rule · general addition rule · countable additivity · three-event rule)  **Lec:** 5  **Type:** apply
**A:** Steps:
1. Name the events $$M$$, $$S$$ and $$C$$, and write every percentage as a probability statement.
2. (a) is the three-event addition rule, and (b) is its complement.
3. (c) needs the Venn diagram's regions. Fill the triple overlap first, then each pairwise overlap without it, then each "only" region.
4. For (d), divide $$P(M \cap S)$$ by $$P(M)$$ and compare the result with $$P(S)$$.

(a) The three-event rule:

$$
\begin{aligned}
P(M \cup S \cup C) &= 0.60 + 0.45 + 0.30 \\
&\quad - 0.25 - 0.15 - 0.10 \\
&\quad + 0.05 \\
&= 0.90
\end{aligned}
$$

(b) $$1 - 0.90 = 0.10$$.

(c) Each "only" region is the circle minus its two overlaps, plus the triple overlap, which those two subtractions removed twice.

$$
\begin{aligned}
\text{MATH only} &= 0.60 - 0.25 - 0.15 + 0.05 \\
&= 0.25 \\
\text{STAT only} &= 0.45 - 0.25 - 0.10 + 0.05 \\
&= 0.15 \\
\text{CHEM only} &= 0.30 - 0.15 - 0.10 + 0.05 \\
&= 0.10
\end{aligned}
$$

So $$P(\text{exactly one}) = 0.25 + 0.15 + 0.10 = 0.50$$. Check: exactly two is $$0.20 + 0.10 + 0.05 = 0.35$$, and $$0.50 + 0.35 + 0.05 = 0.90$$, which matches (a).

(d) The given event is the denominator.

$$
\begin{aligned}
P(S \mid M) &= \frac{P(M \cap S)}{P(M)} \\
&= \frac{0.25}{0.60} \approx 0.417
\end{aligned}
$$

That is not $$P(S) = 0.45$$, so taking MATH and taking STAT are not independent. The product test agrees: $$0.60 \times 0.45 = 0.27$$, not 0.25. Same method as the lecture 5 deck's baseball and hockey example, with a third event.

### Q: A survey of 400 students asks where they live and whether they drive to campus. 240 live on campus, and 90 of those drive. Of the 160 who live off campus, 100 drive. A surveyed student is picked at random. (a) Put the counts in a two-way table with row and column totals. (b) Find $$P(\text{drives})$$. (c) Find $$P(\text{drives} \mid \text{on campus})$$ and $$P(\text{on campus} \mid \text{drives})$$. (d) Are living on campus and driving independent? Show it two ways.
**Topic:** 2h Conditional probability and the multiplication rule (definition as a ratio · proportion of A inside B · the given event is the denominator · two forms of the multiplication rule)  **Lec:** 6  **Type:** apply
**A:** Steps:
1. Name the events, $$O$$ = lives on campus and $$D$$ = drives, and fill the table so that every count has a row and a column.
2. A probability is a count over 400. A conditional probability is a count over the total of the given row or column.
3. Test independence by comparing $$P(D \mid O)$$ with $$P(D)$$, and again with the product test.

(a)

| | Drives | Does not drive | Total |
|---|---|---|---|
| On campus | 90 | 150 | 240 |
| Off campus | 100 | 60 | 160 |
| Total | 190 | 210 | 400 |

(b) $$P(D) = \frac{190}{400} = 0.475$$.

(c) The given event fixes the denominator.

$$
\begin{aligned}
P(D \mid O) &= \frac{90}{240} = 0.375 \\
P(O \mid D) &= \frac{90}{190} \approx 0.474
\end{aligned}
$$

(d) They are not independent.

- $$P(D \mid O) = 0.375$$ is not $$P(D) = 0.475$$. Living on campus lowers the chance of driving.
- Product test: $$P(O)\,P(D) = 0.6 \times 0.475 = 0.285$$, but $$P(O \cap D) = \frac{90}{400} = 0.225$$.

The definitions are lecture 6's. The table layout is the one the lecture 7 Bayes activity uses.

### Q: A warehouse has three smoke alarms that work independently. In a fire, alarm 1 sounds with probability 0.9, alarm 2 with probability 0.8 and alarm 3 with probability 0.7. (a) Find the probability that at least one alarm sounds. (b) Find the probability that exactly one sounds. (c) Given that exactly one sounded, find the probability that it was alarm 1. (d) Find the probability that all three sound.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** 6  **Type:** apply
**A:** Steps:
1. Name the events $$A_i$$ = alarm $$i$$ sounds. Independence is given, so intersections multiply, and the complements are independent too.
2. Do (a) through the complement: at least one sounds unless all three stay silent.
3. For (b), add the three separate ways for exactly one alarm to sound.
4. (c) is a conditional probability: alarm 1's way divided by the answer to (b).

(a)

$$
\begin{aligned}
P(\text{none}) &= 0.1 \times 0.2 \times 0.3 = 0.006 \\
P(\text{at least one}) &= 1 - 0.006 = 0.994
\end{aligned}
$$

(b) Each way has one alarm sounding and the other two silent.

$$
\begin{aligned}
\text{only 1} &= 0.9 \times 0.2 \times 0.3 = 0.054 \\
\text{only 2} &= 0.1 \times 0.8 \times 0.3 = 0.024 \\
\text{only 3} &= 0.1 \times 0.2 \times 0.7 = 0.014 \\
P(\text{exactly one}) &= 0.092
\end{aligned}
$$

(c) "Only alarm 1" lies inside "exactly one", so their intersection is just "only alarm 1".

$$
P(A_1 \mid \text{exactly one}) = \frac{0.054}{0.092} \approx 0.587
$$

(d) $$0.9 \times 0.8 \times 0.7 = 0.504$$. Same method as the lecture 6 deck's switches example, with unequal probabilities and a conditional at the end.

### Q: A clinic uses a new test for a condition. 5% of the patients tested have the condition. The test is positive for 96% of patients who have it and for 2% of patients who do not. (a) Define events, and write each given number and the two complements you need as probability statements. (b) Build the two-way table of joint probabilities with row and column totals. (c) Find the probability that a patient tests positive. (d) Find the probability that a patient who tests positive has the condition, and the probability that a patient who tests negative does not. (e) Explain why the first answer in (d) is so far below 96%.
**Topic:** 2i Bayes' theorem and the law of total probability (partition · weighted average of the branch rates · reversing the conditional · posterior vs prior)  **Lec:** 7  **Type:** apply
**A:** Steps:
1. Name the events, $$C$$ = has the condition and $$T$$ = tests positive. The 5% is $$P(C)$$. The 96% and the 2% are conditionals, given $$C$$ and given $$C^c$$.
2. Each cell of the table is a prior times a conditional, such as $$P(C \cap T) = P(C)\,P(T \mid C)$$.
3. Add across and down for the totals. The four cells sum to 1.
4. A conditional given a test result is one cell divided by that result's column total.

(a) $$P(C) = 0.05$$ and $$P(C^c) = 0.95$$. $$P(T \mid C) = 0.96$$, so $$P(T^c \mid C) = 0.04$$. $$P(T \mid C^c) = 0.02$$, so $$P(T^c \mid C^c) = 0.98$$.

(b) Multiply each row's prior by the conditional for the column:

| | Positive | Negative | Total |
|---|---|---|---|
| Has it | 0.048 | 0.002 | 0.05 |
| Does not | 0.019 | 0.931 | 0.95 |
| Total | 0.067 | 0.933 | 1 |

(c) $$P(T) = 0.048 + 0.019 = 0.067$$. This is the law of total probability.

(d)

$$
\begin{aligned}
P(C \mid T) &= \frac{0.048}{0.067} \approx 0.716 \\
P(C^c \mid T^c) &= \frac{0.931}{0.933} \approx 0.998
\end{aligned}
$$

(e) Patients without the condition outnumber those with it 19 to 1. Their 2% false positives, 0.019 of all patients, are more than a quarter of all positives, 0.067. A positive result raises the chance of having the condition from 5% to about 72%, not to 96%. The 96% is $$P(T \mid C)$$, the reverse conditional. This is the method of the lecture 7 in-class Bayes activity, with new numbers.

### Q: Three suppliers provide 50%, 30% and 20% of a store's batteries, with defect rates 2%, 4% and 5%. A battery is found defective. Find the probability it came from each supplier, and check that the three posteriors add to 1.
**Topic:** 2i Bayes' theorem and the law of total probability (partition · weighted average of the branch rates · reversing the conditional · posterior vs prior)  **Lec:** 7  **Type:** apply
**A:** Steps:
1. Name the events, $$S_1$$, $$S_2$$ and $$S_3$$ for the supplier and $$D$$ for defective.
2. Multiply each supplier's share by its defect rate.
3. Add the three products for $$P(D)$$.
4. Divide each product by $$P(D)$$. The three posteriors must add to 1.

Define $$S_1, S_2, S_3$$ = supplier and $$D$$ = defective.

$$
\begin{aligned}
P(D) &= 0.5(0.02) + 0.3(0.04) \\
&\quad + 0.2(0.05) \\
&= 0.010 + 0.012 + 0.010 = 0.032 \\[4pt]
P(S_1 \mid D) &= \frac{0.010}{0.032} = 0.3125 \\
P(S_2 \mid D) &= \frac{0.012}{0.032} = 0.375 \\
P(S_3 \mid D) &= \frac{0.010}{0.032} = 0.3125
\end{aligned}
$$

They add to 1 because the suppliers partition the defective batteries. Supplier 2 is the most likely source even though supplier 3 has the worst rate, because supplier 2 ships more.

### Q: Your inventory comes from three plants: 40% from $$A_1$$, 35% from $$A_2$$ and 25% from $$A_3$$. Their defect rates are 6%, 4% and 9%. You pull an item at random and it is defective. Which plant did it most likely come from? Give the posterior probability for each plant, and say why neither "the biggest supplier" nor "the worst quality" is the right answer on its own.
**Topic:** 2i Bayes' theorem and the law of total probability (partition · weighted average of the branch rates · reversing the conditional · posterior vs prior)  **Lec:** WW2  **Type:** derive
**A:** Steps:
1. Name the events, $$A_1$$, $$A_2$$ and $$A_3$$ for the plant and $$D$$ for defective. The shares are the priors and the defect rates are $$P(D \mid A_i)$$.
2. Multiply each prior by its rate for the joint probabilities.
3. Add the joint probabilities for $$P(D)$$, which is the law of total probability.
4. Divide each joint probability by $$P(D)$$ for the posteriors, then compare them.

Write $$D$$ for "defective". The joint probabilities, then the law of total probability:

$$
\begin{aligned}
P(A_1 \cap D) &= 0.40 \times 0.06 = 0.0240 \\
P(A_2 \cap D) &= 0.35 \times 0.04 = 0.0140 \\
P(A_3 \cap D) &= 0.25 \times 0.09 = 0.0225 \\
P(D) &= 0.0240 + 0.0140 + 0.0225 = 0.0605
\end{aligned}
$$

Dividing each joint by $$P(D)$$ gives $$P(A_1 \mid D) = 0.397$$, $$P(A_2 \mid D) = 0.231$$ and $$P(A_3 \mid D) = 0.372$$. $$A_1$$ wins. The point is how close $$A_1$$ and $$A_3$$ are: $$A_1$$ has the largest share but a middling defect rate, $$A_3$$ the worst rate but the smallest share, and the posterior is what settles it — each prior weighted by its own conditional, then renormalised. Answering "$$A_3$$, it has the worst rate" ignores the prior; answering "$$A_1$$, it makes the most" ignores the rate.

### Q: A student leaves her iClicker behind with probability $$\frac{1}{3}$$ each time she attends a class, independently, and she sets out with it to attend four classes in four different rooms. (a) She gets home without it — what is the probability she left it in the 4th class? (b) What is the probability, before she sets out, that she will leave it in the 4th class? (c) She gets home without it and is certain she still had it after the first class — now what is the probability it is in the 4th? (d) She has time to check exactly one room. Which class should she try? Give (a) to (c) to three significant figures.
**Topic:** 2i Bayes' theorem and the law of total probability (partition · weighted average of the branch rates · reversing the conditional · posterior vs prior)  **Lec:** WW2  **Type:** derive
**A:** Steps:
1. Losing it in class $$k$$ means keeping it through the first $$k - 1$$ classes and then leaving it, so the probability is $$\left(\frac{2}{3}\right)^{k-1} \cdot \frac{1}{3}$$.
2. (b) is that formula at $$k = 4$$, with no conditioning.
3. (a) divides it by the probability of losing it at all, $$1 - \left(\frac{2}{3}\right)^4$$.
4. (c) drops class 1 from that denominator.
5. (d) compares the four classes' conditional probabilities.

She loses it in class $$k$$ only if she kept it through the first $$k - 1$$ classes and then left it:

$$
P(\text{lost in class } k) = \left(\frac{2}{3}\right)^{k-1} \cdot \frac{1}{3}
$$

That gives $$\frac{1}{3}, \frac{2}{9}, \frac{4}{27}, \frac{8}{81}$$ for classes 1 to 4. (b) is the unconditional one asked for directly: $$\frac{8}{81} = 0.0988$$. (a) She arrives home without it whenever any of those happened:

$$
\begin{aligned}
P(\text{lost}) &= \frac{1}{3} + \frac{2}{9} + \frac{4}{27} + \frac{8}{81} = \frac{65}{81} \\
&= 1 - \left(\frac{2}{3}\right)^4 = 1 - \frac{16}{81} \\[4pt]
P(4\text{th} \mid \text{lost}) &= \frac{8/81}{65/81} = \frac{8}{65} = 0.123
\end{aligned}
$$

The second line is the quicker route. (c) Conditioning on having it after class 1 throws away the first branch, so the denominator becomes $$\frac{2}{9} + \frac{4}{27} + \frac{8}{81} = \frac{38}{81}$$ and the answer is $$\frac{8}{38} = \frac{4}{19} = 0.211$$. (d) The first class, with posterior $$\frac{1/3}{65/81} = \frac{27}{65} = 0.415$$ — she is most likely to have lost it at the first opportunity, because every later loss requires surviving all the earlier ones. Note how parts (a) and (b) differ only by the conditioning event, and that the conditioning is what puts $$\frac{65}{81}$$ in the denominator.

### Q: A system has two blocks in series, followed in series by component $$E$$. Block 1 is components $$A$$ and $$B$$ in parallel, and block 2 is components $$C$$ and $$D$$ in parallel. The components work independently, with reliabilities $$A$$ 0.8, $$B$$ 0.7, $$C$$ 0.9, $$D$$ 0.6 and $$E$$ 0.95. (a) Find the reliability of each block and of the system. (b) Find the probability that the system fails. (c) Given that the system works, find the probability that $$A$$ works.
**Topic:** 2k Reliability of series and parallel systems (series multiplies reliabilities · parallel is one minus the product of failure probabilities · combine blocks · independence must be given)  **Lec:** 7  **Type:** apply
**A:** Steps:
1. A parallel block fails only if both of its components fail, so its reliability is one minus the product of their failure probabilities.
2. Everything in series must work, so multiply the two block reliabilities and $$E$$'s.
3. (b) is the complement of (a).
4. (c) is a conditional probability. If $$A$$ works, block 1 works, so the numerator needs only block 2 and $$E$$ as well.

(a)

$$
\begin{aligned}
P(\text{block 1}) &= 1 - 0.2 \times 0.3 = 0.94 \\
P(\text{block 2}) &= 1 - 0.1 \times 0.4 = 0.96 \\
P(\text{system}) &= 0.94 \times 0.96 \times 0.95 \\
&= 0.8573
\end{aligned}
$$

(b) $$1 - 0.8573 = 0.1427$$.

(c) "$$A$$ works and the system works" means $$A$$, block 2 and $$E$$ all work, because $$A$$ alone keeps block 1 working.

$$
\begin{aligned}
P(A \cap \text{works}) &= 0.8 \times 0.96 \times 0.95 \\
&= 0.7296 \\
P(A \mid \text{works}) &= \frac{0.7296}{0.8573} \approx 0.851
\end{aligned}
$$

Knowing the system works raises the chance that $$A$$ works from 0.8 to about 0.85. Same method as the lecture 7 reliability question, with lecture 6's conditional probability on top.

### Q: $$X$$ takes the values $$-1, 0, 2, 5$$ with probabilities $$k, 3k, 4k, 2k$$. (a) Find $$k$$. (b) Write the cdf $$F$$ as a piecewise function defined for every real $$x$$. (c) Use $$F$$ to find $$F(1.5)$$, $$P(X \ge 2)$$ and $$P(X > 2)$$. (d) Find $$E(X)$$, $$\operatorname{Var}(X)$$ and $$\operatorname{SD}(X)$$. (e) Find $$E[(X - 1)^2]$$ from the pmf.
**Topic:** 3d Mean and variance of a discrete random variable (long-run average · E of a function of X · variance by definition and by the shortcut · not the sample mean)  **Lec:** 8  **Type:** apply
**A:** Steps:
1. The probabilities sum to 1, which gives $$k$$.
2. The cdf is a running sum of the pmf. It is flat between the possible values and jumps at each one.
3. $$P(X \ge 2) = 1 - F(1)$$ and $$P(X > 2) = 1 - F(2)$$. The equal sign moves the answer by $$P(X = 2)$$.
4. Get the mean and $$E(X^2)$$ from the pmf, then the variance by the shortcut.
5. For $$E[g(X)]$$, keep the probabilities and apply $$g$$ to each value.

(a) $$k + 3k + 4k + 2k = 10k = 1$$, so $$k = 0.1$$, and the probabilities are 0.1, 0.3, 0.4 and 0.2.

(b)

$$
F(x) = \begin{cases}
0 & x < -1 \\
0.1 & -1 \le x < 0 \\
0.4 & 0 \le x < 2 \\
0.8 & 2 \le x < 5 \\
1 & x \ge 5
\end{cases}
$$

(c) $$F(1.5) = 0.4$$. $$P(X \ge 2) = 1 - F(1) = 1 - 0.4 = 0.6$$. $$P(X > 2) = 1 - F(2) = 1 - 0.8 = 0.2$$.

(d)

$$
\begin{aligned}
E(X) &= -0.1 + 0 + 0.8 + 1.0 = 1.7 \\
E(X^2) &= 0.1 + 0 + 1.6 + 5.0 = 6.7 \\
\operatorname{Var}(X) &= 6.7 - 1.7^2 = 3.81 \\
\operatorname{SD}(X) &= \sqrt{3.81} \approx 1.95
\end{aligned}
$$

(e) The values of $$(x - 1)^2$$ are 4, 1, 1 and 16.

$$
\begin{aligned}
E[(X - 1)^2] &= 4(0.1) + 1(0.3) \\
&\quad + 1(0.4) + 16(0.2) \\
&= 0.4 + 0.3 + 0.4 + 3.2 = 4.3
\end{aligned}
$$

Check: expanding the square gives $$E(X^2) - 2E(X) + 1 = 6.7 - 3.4 + 1 = 4.3$$. Same method as the lecture 8 deck's Examples 3 to 5.

### Q: WeBWorK-style. A robot fires three shots at a moving target. The first shot hits with probability $$\frac{1}{4}$$. After a hit, the next shot hits with probability $$\frac{1}{2}$$; after a miss, the next shot hits with probability $$\frac{1}{3}$$. Let $$N$$ be the number of hits. From a blank page find the pmf of $$N$$, then $$E(N)$$ rounded to a whole number and $$\operatorname{Var}(N)$$ to two decimals.
**Topic:** 3d Mean and variance of a discrete random variable (long-run average · E of a function of X · variance by definition and by the shortcut · not the sample mean)  **Lec:** WW3  **Type:** derive
**A:** Steps:
1. The shots are dependent, so draw the three-stage tree with the given conditional probabilities.
2. Multiply along each of the eight paths.
3. Group the paths by the number of hits for the pmf, and check that it sums to 1.
4. Get $$E(N)$$ and $$E(N^2)$$ from the pmf, then the variance by the shortcut.

The shots are not independent, so draw the tree and multiply along each of the eight paths:

$$
\begin{aligned}
\text{HHH} &= \frac{1}{4} \cdot \frac{1}{2} \cdot \frac{1}{2} = \frac{1}{16} \\
\text{HHM} &= \frac{1}{16} \\
\text{HMH} &= \frac{1}{4} \cdot \frac{1}{2} \cdot \frac{1}{3} = \frac{1}{24} \\
\text{HMM} &= \frac{1}{4} \cdot \frac{1}{2} \cdot \frac{2}{3} = \frac{1}{12} \\
\text{MHH} &= \frac{3}{4} \cdot \frac{1}{3} \cdot \frac{1}{2} = \frac{1}{8} \\
\text{MHM} &= \frac{1}{8} \\
\text{MMH} &= \frac{3}{4} \cdot \frac{2}{3} \cdot \frac{1}{3} = \frac{1}{6} \\
\text{MMM} &= \frac{3}{4} \cdot \frac{2}{3} \cdot \frac{2}{3} = \frac{1}{3}
\end{aligned}
$$

Group by hit count. The four sum to 1, which is the check.

$$
\begin{aligned}
P(N = 0) &= \frac{1}{3} \\
P(N = 1) &= \frac{1}{12} + \frac{1}{8} + \frac{1}{6} = \frac{9}{24} = 0.375 \\
P(N = 2) &= \frac{1}{16} + \frac{1}{24} + \frac{1}{8} = \frac{11}{48} \approx 0.2292 \\
P(N = 3) &= \frac{1}{16} = 0.0625
\end{aligned}
$$

Then the moments:

$$
\begin{aligned}
E(N) &= 0.375 + 2(0.2292) + 3(0.0625) = 1.0208 \\
E(N^2) &= 0.375 + 4(0.2292) + 9(0.0625) = 1.8542 \\
\operatorname{Var}(N) &= 1.8542 - 1.0208^2 = 0.81
\end{aligned}
$$

So $$E(N)$$ is 1 to the nearest whole number. A shortcut for the mean only: $$E(N)$$ is the sum of the three per-shot hit probabilities, $$\frac{1}{4} + \frac{3}{8} + \frac{19}{48} = \frac{49}{48}$$, which matches, but the variance needs the full pmf because the shots are dependent.

### Q: $$f(x) = cx$$ for $$1 \le x \le 3$$ and 0 otherwise. (a) Find $$c$$ and check that $$f$$ is a pdf. (b) Find the cdf for every real $$x$$. (c) Find $$P(X > 2)$$ and $$P(1.5 < X < 2.5)$$ from the cdf. (d) Find the median and the IQR. (e) Find $$E(X)$$, $$\operatorname{Var}(X)$$ and $$\operatorname{SD}(X)$$.
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** 9  **Type:** apply
**A:** Steps:
1. Total area 1 gives $$c$$. Integrate over the support only.
2. The cdf integrates the pdf from the left end of the support up to $$x$$. It is 0 below the support and 1 above it.
3. Probabilities are differences of $$F$$, and the endpoints do not matter.
4. Each quantile solves $$F(x) = p$$. Keep the root inside $$[1, 3]$$.
5. $$E(X)$$ and $$E(X^2)$$ are integrals against $$f$$, then the variance comes from the shortcut.

(a)

$$
\begin{aligned}
\int_1^3 cx\,dx &= c \cdot \frac{9 - 1}{2} = 4c = 1 \\
c &= \frac{1}{4}
\end{aligned}
$$

$$f(x) = \frac{x}{4} \ge 0$$ on $$[1, 3]$$ and its area is 1, so $$f$$ is a pdf.

(b)

$$
F(x) = \begin{cases}
0 & x < 1 \\
\dfrac{x^2 - 1}{8} & 1 \le x \le 3 \\
1 & x > 3
\end{cases}
$$

(c)

$$
\begin{aligned}
P(X > 2) &= 1 - F(2) = 1 - \frac{3}{8} = \frac{5}{8} \\
P(1.5 < X < 2.5) &= F(2.5) - F(1.5) \\
&= \frac{5.25 - 1.25}{8} = 0.5
\end{aligned}
$$

(d) Solving $$\frac{x^2 - 1}{8} = p$$ gives $$x = \sqrt{8p + 1}$$.

$$
\begin{aligned}
\text{median} &= \sqrt{5} \approx 2.236 \\
Q_1 &= \sqrt{3} \approx 1.732 \\
Q_3 &= \sqrt{7} \approx 2.646 \\
\text{IQR} &\approx 2.646 - 1.732 = 0.914
\end{aligned}
$$

(e)

$$
\begin{aligned}
E(X) &= \int_1^3 \frac{x^2}{4}\,dx = \frac{27 - 1}{12} = \frac{13}{6} \\
E(X^2) &= \int_1^3 \frac{x^3}{4}\,dx = \frac{81 - 1}{16} = 5 \\
\operatorname{Var}(X) &= 5 - \frac{169}{36} = \frac{11}{36} \\
\operatorname{SD}(X) &\approx 0.553
\end{aligned}
$$

$$E(X) \approx 2.167$$ is below the median, 2.236. The density rises to the right, so the longer tail is on the left, and a left tail pulls the mean below the median. Same method as the lecture 9 deck's Examples 6 and 7.

### Q: $$f(x) = \frac{3}{8}x^2$$ on $$[0, 2]$$, the deck's Example 7. Find $$E(X)$$, $$E(X^2)$$, $$\operatorname{Var}(X)$$ and $$\operatorname{SD}(X)$$, then $$E\left(\frac{1}{X}\right)$$.
**Topic:** 3g–i Mean, variance, uniform and exponential (E and Var by integration · the shortcut · uniform mean and variance · exponential mean and variance by parts · median from F)  **Lec:** 9  **Type:** apply
**A:** Steps:
1. Each expectation is an integral of $$g(x)$$ times $$\frac{3}{8}x^2$$ over $$[0, 2]$$.
2. $$E(X)$$ uses $$g(x) = x$$, $$E(X^2)$$ uses $$x^2$$, and $$E\left(\frac{1}{X}\right)$$ uses $$\frac{1}{x}$$.
3. Get the variance by the shortcut and the SD as its square root.

Each one is an integral against the same pdf:

$$
\begin{aligned}
E(X) &= \frac{3}{8}\int_0^2 x^3\,dx = \frac{3}{8}(4) = \frac{3}{2} \\
E(X^2) &= \frac{3}{8}\int_0^2 x^4\,dx = \frac{3}{8} \cdot \frac{32}{5} = \frac{12}{5} \\
\operatorname{Var}(X) &= \frac{12}{5} - \frac{9}{4} = \frac{3}{20} = 0.15 \\
\operatorname{SD}(X) &\approx 0.387 \\
E\left(\frac{1}{X}\right) &= \int_0^2 \frac{1}{x} \cdot \frac{3}{8}x^2\,dx \\
&= \frac{3}{8}\int_0^2 x\,dx = \frac{3}{8}(2) = \frac{3}{4}
\end{aligned}
$$

The pdf stays; only the function inside the integral changes.

### Q: For $$X \sim U(a, b)$$, derive $$E(X)$$ and $$\operatorname{Var}(X)$$ from the definitions.
**Topic:** 3g–i Mean, variance, uniform and exponential (E and Var by integration · the shortcut · uniform mean and variance · exponential mean and variance by parts · median from F)  **Lec:** 9  **Type:** derive
**A:** Steps:
1. Write $$f(x) = \frac{1}{b - a}$$ on $$[a, b]$$.
2. Integrate $$x\,f(x)$$ over $$[a, b]$$, and factor $$b^2 - a^2 = (b - a)(b + a)$$.
3. Integrate $$x^2 f(x)$$ the same way, factoring $$b^3 - a^3 = (b - a)(a^2 + ab + b^2)$$.
4. Use the shortcut and put everything over 12.

Integrate against $$f(x) = \frac{1}{b - a}$$, then use the shortcut:

$$
\begin{aligned}
E(X) &= \int_a^b \frac{x}{b - a}\,dx = \frac{b^2 - a^2}{2(b - a)} = \frac{a + b}{2} \\[4pt]
E(X^2) &= \int_a^b \frac{x^2}{b - a}\,dx = \frac{b^3 - a^3}{3(b - a)} \\
&= \frac{a^2 + ab + b^2}{3} \\[4pt]
\operatorname{Var}(X) &= \frac{a^2 + ab + b^2}{3} - \frac{(a + b)^2}{4} \\
&= \frac{4a^2 + 4ab + 4b^2 - 3a^2 - 6ab - 3b^2}{12} \\
&= \frac{(b - a)^2}{12}
\end{aligned}
$$

### Q: For $$X \sim \text{Exp}(\lambda)$$, find the cdf and $$P(X > t)$$, then derive $$E(X) = \frac{1}{\lambda}$$ by integration by parts.
**Topic:** 3g–i Mean, variance, uniform and exponential (E and Var by integration · the shortcut · uniform mean and variance · exponential mean and variance by parts · median from F)  **Lec:** 9  **Type:** derive
**A:** Steps:
1. Integrate the pdf from 0 to $$x$$ for the cdf, and take one minus it for $$P(X > t)$$.
2. For $$E(X)$$, integrate $$x\,\lambda e^{-\lambda x}$$ from 0 to $$\infty$$ by parts, with $$u = x$$ and $$dv = \lambda e^{-\lambda x}\,dx$$.
3. The boundary term is 0, and the integral left over is $$\frac{1}{\lambda}$$.

The cdf, for $$x \ge 0$$:

$$
\begin{aligned}
F(x) &= \int_0^x \lambda e^{-\lambda t}\,dt = 1 - e^{-\lambda x} \\
P(X > t) &= e^{-\lambda t}
\end{aligned}
$$

For the mean, take $$u = x$$ and $$dv = \lambda e^{-\lambda x}\,dx$$, so $$v = -e^{-\lambda x}$$:

$$
\begin{aligned}
E(X) &= \int_0^\infty x\,\lambda e^{-\lambda x}\,dx \\
&= \Big[-x e^{-\lambda x}\Big]_0^\infty + \int_0^\infty e^{-\lambda x}\,dx \\
&= 0 + \frac{1}{\lambda}
\end{aligned}
$$

Parts twice on $$E(X^2)$$ gives $$\frac{2}{\lambda^2}$$, so $$\operatorname{Var}(X) = \frac{2}{\lambda^2} - \frac{1}{\lambda^2} = \frac{1}{\lambda^2}$$.

### Q: WeBWorK-style. A random variable $$X$$ lives on $$[2, 7]$$ and is described by $$g(x) = 2x - 2$$ there. (a) Show whether $$g$$ is a pdf, and if not find the constant $$c$$ that makes $$c \cdot g(x)$$ one. (b) Find $$P(4 < X < 6)$$. (c) Find $$P(X < 5)$$.
**Topic:** 3c Continuous random variables and the pdf (probability as area · f ≥ 0 and total area 1 · find the constant · endpoints do not matter · P at a point is 0)  **Lec:** WW3  **Type:** derive
**A:** Steps:
1. Check that $$g \ge 0$$ on $$[2, 7]$$, then integrate it over $$[2, 7]$$. The area is not 1, so $$c$$ is one over the area.
2. Each probability is the integral of $$c \cdot g(x)$$ between its limits. For $$P(X < 5)$$ the lower limit is 2, where the density starts.

(a) $$g \ge 0$$ on $$[2, 7]$$, but its area is not 1, so $$g$$ is not a pdf:

$$
\begin{aligned}
\int_2^7 (2x - 2)\,dx &= \Big[x^2 - 2x\Big]_2^7 \\
&= (49 - 14) - (4 - 4) = 35
\end{aligned}
$$

The normalising constant is $$c = \frac{1}{35}$$, giving $$f(x) = \frac{2x - 2}{35}$$ on $$[2, 7]$$ and 0 elsewhere. Do this step first; every probability below is wrong by a factor of 35 without it.

$$
\begin{aligned}
\text{(b)}\ P(4 < X < 6) &= \frac{1}{35}\Big[x^2 - 2x\Big]_4^6 \\
&= \frac{1}{35}\big[(36 - 12) - (16 - 8)\big] \\
&= \frac{16}{35} \approx 0.457 \\[4pt]
\text{(c)}\ P(X < 5) &= \frac{1}{35}\Big[x^2 - 2x\Big]_2^5 \\
&= \frac{1}{35}(15 - 0) = \frac{15}{35} \approx 0.429
\end{aligned}
$$

The lower limit is 2, where the density starts, not 0; and strict or non-strict inequalities give the same area because $$P$$ at a single point is 0.

### Q: WeBWorK-style. The days $$T$$ a butterfly survives after emerging satisfy $$P(T > t) = \frac{25}{(5 + t)^2}$$ for $$t \ge 0$$. (a) Find the probability it dies within 7 days. (b) After how many days would you expect only 10% of a large brood to be alive? (c) Find the mean lifetime. Three-decimal accuracy.
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** WW3  **Type:** derive
**A:** Steps:
1. The given function is $$P(T > t) = 1 - F(t)$$, so read probabilities straight off it.
2. (a) is one minus the survival probability at 7 days.
3. (b) solves "survival probability = 0.10" for $$t$$.
4. (c) integrates the survival function from 0 to $$\infty$$. The longer route differentiates for the pdf and integrates $$t\,f(t)$$.

You are handed the survival function, which is $$1 - F(t)$$, so read everything off it. (a) $$P(T \le 7) = 1 - P(T > 7) = 1 - \frac{25}{144} = 0.826$$. (b) "10% still alive" means $$P(T > t) = 0.10$$, so $$(5 + t)^2 = 250$$, $$5 + t = 15.811$$, $$t = 10.811$$ days. Solve the tail, do not differentiate. (c) Either differentiate to get the pdf $$f(t) = \frac{50}{(5 + t)^3}$$ and integrate $$t \cdot f(t)$$, or use the shortcut for non-negative variables:

$$
\begin{aligned}
E(T) &= \int_0^\infty P(T > t)\,dt = \int_0^\infty \frac{25}{(5 + t)^2}\,dt \\
&= \Big[-\frac{25}{5 + t}\Big]_0^\infty = \frac{25}{5} = 5.000 \text{ days}
\end{aligned}
$$

Both routes give 5; the tail integral is faster. Note the mean (5) is below the 10% survival time (10.8), as it must be for a right-skewed lifetime.

### Q: WeBWorK-style. $$X$$ has pdf $$f(x) = \frac{2}{9}(3 - x)$$ for $$0 \le x \le 3$$ and 0 otherwise. (a) Find $$c$$ to one decimal given $$E(X + c) = 4 \cdot E(X - c)$$. (b) Find $$E(X)$$. (c) Find $$P(X > 1)$$. (d) Find $$\operatorname{Var}(X)$$. (e) Find $$q$$ with $$P(X < q) = \frac{1}{4}$$, to three decimals. (f) Two independent observations are taken; find the probability one is below 1 and the other above 1, order mattering.
**Topic:** 3g–i Mean, variance, uniform and exponential (E and Var by integration · the shortcut · uniform mean and variance · exponential mean and variance by parts · median from F)  **Lec:** WW3  **Type:** derive
**A:** Steps:
1. Find $$E(X)$$ first by integrating $$x\,f(x)$$, since (a) needs it. (a) then follows from linearity.
2. (c) integrates $$f$$ from 1 to 3.
3. (d) needs $$E(X^2)$$, then the shortcut.
4. (e) sets the cdf equal to $$\frac{1}{4}$$ and keeps the root inside $$[0, 3]$$.
5. (f) multiplies $$P(X < 1)$$ by $$P(X > 1)$$ and doubles it for the two orders.

Get $$E(X)$$ first, since (a) needs it.

$$
\begin{aligned}
\text{(b)}\ E(X) &= \int_0^3 x \cdot \frac{2}{9}(3 - x)\,dx \\
&= \frac{2}{9}\Big[\frac{3x^2}{2} - \frac{x^3}{3}\Big]_0^3 \\
&= \frac{2}{9}(13.5 - 9) = 1.00
\end{aligned}
$$

(a) $$E(X + c) = E(X) + c$$ and $$E(X - c) = E(X) - c$$ by linearity, so $$1 + c = 4(1 - c)$$, $$5c = 3$$, $$c = 0.6$$.

$$
\begin{aligned}
\text{(c)}\ P(X > 1) &= \int_1^3 \frac{2}{9}(3 - x)\,dx \\
&= \frac{2}{9}\Big[3x - \frac{x^2}{2}\Big]_1^3 \\
&= \frac{2}{9}(4.5 - 2.5) = \frac{4}{9} \approx 0.44 \\[4pt]
\text{(d)}\ E(X^2) &= \int_0^3 x^2 \cdot \frac{2}{9}(3 - x)\,dx \\
&= \frac{2}{9}\Big[x^3 - \frac{x^4}{4}\Big]_0^3 \\
&= \frac{2}{9}(27 - 20.25) = 1.5 \\
\operatorname{Var}(X) &= 1.5 - 1^2 = 0.50
\end{aligned}
$$

(e) Solve the cdf for $$\frac{1}{4}$$; the other root, 5.6, is outside $$[0, 3]$$.

$$
\begin{aligned}
F(q) = \int_0^q \frac{2}{9}(3 - x)\,dx &= \frac{6q - q^2}{9} = \frac{1}{4} \\
q^2 - 6q + 2.25 &= 0 \\
q &= \frac{6 - \sqrt{27}}{2} = 0.402
\end{aligned}
$$

(f) $$P(X < 1) = 1 - \frac{4}{9} = \frac{5}{9}$$. With order mattering there are two ways, low-then-high and high-then-low, each with probability $$\frac{5}{9} \cdot \frac{4}{9}$$ by independence, so $$2 \times \frac{20}{81} = \frac{40}{81} \approx 0.49$$. The trap in (f) is reporting only one ordering.

### Q: $$X$$ and $$Y$$ have $$E(X) = 10$$, $$\operatorname{Var}(X) = 16$$, $$E(Y) = 6$$, $$\operatorname{Var}(Y) = 9$$ and $$\operatorname{Cov}(X, Y) = -3$$. (a) Find the mean and variance of $$X + Y$$ and of $$X - Y$$. (b) Find the mean, variance and SD of $$W = 2X - 3Y + 5$$. (c) Which answers in (a) and (b) would change if $$X$$ and $$Y$$ were independent, and to what? (d) $$X_1, \dots, X_{25}$$ is a random sample from the distribution of $$X$$. Find the mean and SD of their total and of their average $$\bar{X}$$.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** apply
**A:** Steps:
1. Means follow $$E(aX + bY + c) = aE(X) + bE(Y) + c$$, with no conditions.
2. Variances follow $$a^2\operatorname{Var}(X) + b^2\operatorname{Var}(Y) + 2ab\operatorname{Cov}(X, Y)$$. The constant drops out, and the sign of $$ab$$ affects only the covariance term.
3. Independence makes the covariance 0. That changes variances and never means.
4. A random sample is iid, so the total has variance $$n\sigma^2$$ and the average has variance $$\frac{\sigma^2}{n}$$.

(a)

$$
\begin{aligned}
E(X + Y) &= 16 \\
\operatorname{Var}(X + Y) &= 16 + 9 + 2(-3) = 19 \\
E(X - Y) &= 4 \\
\operatorname{Var}(X - Y) &= 16 + 9 - 2(-3) = 31
\end{aligned}
$$

(b)

$$
\begin{aligned}
E(W) &= 2(10) - 3(6) + 5 = 7 \\
\operatorname{Var}(W) &= 4(16) + 9(9) \\
&\quad + 2(2)(-3)(-3) \\
&= 64 + 81 + 36 = 181 \\
\operatorname{SD}(W) &= \sqrt{181} \approx 13.45
\end{aligned}
$$

(c) Only the variances change, because the covariance term becomes 0. $$\operatorname{Var}(X + Y)$$ and $$\operatorname{Var}(X - Y)$$ both become 25, and $$\operatorname{Var}(W)$$ becomes 145. The means stay 16, 4 and 7.

(d) Write $$T = X_1 + \dots + X_{25}$$ for the total.

$$
\begin{aligned}
E(T) &= 25(10) = 250 \\
\operatorname{Var}(T) &= 25(16) = 400 \\
\operatorname{SD}(T) &= 20 \\
E(\bar{X}) &= 10 \\
\operatorname{Var}(\bar{X}) &= \frac{16}{25} = 0.64 \\
\operatorname{SD}(\bar{X}) &= 0.8
\end{aligned}
$$

Same method as the lecture 10 deck's Examples 8 and 9 and its slides on sums and averages.

### Q: Each year's highest flood level $$X$$ on a river is uniform on $$[0, 10]$$ metres, independently across years. Let $$V$$ be the highest level over the next 5 years. Find the cdf of $$V$$, $$P(V > 8)$$, the pdf of $$V$$ and $$E(V)$$.
**Topic:** 3m–n Maximum and minimum of independent random variables (cdf of the max is the product of the cdfs · pdf by the chain rule · parallel lifetime is the max · series lifetime is the min · flood levels)  **Lec:** 10  **Type:** apply
**A:** Steps:
1. One year's cdf is $$\frac{v}{10}$$ on $$[0, 10]$$.
2. The 5-year maximum is at most $$v$$ only if every year's level is, so independence gives $$F_V(v) = \left(\frac{v}{10}\right)^5$$.
3. $$P(V > 8) = 1 - F_V(8)$$.
4. Differentiate for the pdf, then integrate $$v\,f_V(v)$$ for $$E(V)$$.

$$F_X(v) = \frac{v}{10}$$ on $$[0, 10]$$, so on $$[0, 10]$$, with $$F_V = 0$$ below 0 and 1 above 10:

$$
\begin{aligned}
F_V(v) &= \left(\frac{v}{10}\right)^5 \\
P(V > 8) &= 1 - 0.8^5 = 1 - 0.328 = 0.672 \\
f_V(v) &= 5\left(\frac{v}{10}\right)^4 \frac{1}{10} = \frac{5v^4}{10^5} \\
E(V) &= \int_0^{10} v \cdot \frac{5v^4}{10^5}\,dv \\
&= \frac{5}{10^5} \cdot \frac{10^6}{6} \approx 8.33 \text{ metres}
\end{aligned}
$$

That is well above one year's mean of 5.

### Q: Each of three components has a lifetime $$X$$, in years, with pdf $$f(x) = \frac{x}{2}$$ for $$0 \le x \le 2$$, and the three lifetimes are independent. (a) Find the cdf $$F$$ of one lifetime. (b) The three are connected in parallel, with system lifetime $$V$$. Find the cdf of $$V$$ and $$P(V > 1.5)$$. (c) Find the pdf of $$V$$ and $$E(V)$$, and compare $$E(V)$$ with $$E(X)$$. (d) If the three were connected in series instead, with system lifetime $$U$$, find $$P(U > 1)$$.
**Topic:** 3m–n Maximum and minimum of independent random variables (cdf of the max is the product of the cdfs · pdf by the chain rule · parallel lifetime is the max · series lifetime is the min · flood levels)  **Lec:** 10  **Type:** apply
**A:** Steps:
1. Integrate the pdf for one component's cdf.
2. A parallel system runs until its last component fails, so $$V$$ is the maximum. $$V \le v$$ exactly when all three lifetimes are at most $$v$$, and independence gives $$F_V(v) = [F(v)]^3$$.
3. Differentiate with the chain rule for $$f_V$$, then integrate $$v\,f_V(v)$$.
4. A series system stops at the first failure, so $$U$$ is the minimum. $$U > u$$ exactly when all three last past $$u$$.

(a) $$F(x) = \int_0^x \frac{t}{2}\,dt = \frac{x^2}{4}$$ on $$[0, 2]$$, with 0 below and 1 above.

(b) On $$[0, 2]$$:

$$
\begin{aligned}
F_V(v) &= \left(\frac{v^2}{4}\right)^3 = \frac{v^6}{64} \\
P(V > 1.5) &= 1 - 0.5625^3 \\
&= 1 - 0.178 = 0.822
\end{aligned}
$$

(c)

$$
\begin{aligned}
f_V(v) &= 3\left(\frac{v^2}{4}\right)^2 \frac{v}{2} = \frac{3v^5}{32} \\
E(V) &= \int_0^2 \frac{3v^6}{32}\,dv = \frac{3}{32} \cdot \frac{128}{7} \\
&= \frac{12}{7} \approx 1.71 \text{ years} \\
E(X) &= \int_0^2 \frac{x^2}{2}\,dx = \frac{4}{3} \approx 1.33 \text{ years}
\end{aligned}
$$

The parallel system outlasts a single component on average, because it keeps running while any one of the three survives.

(d)

$$
\begin{aligned}
P(U > 1) &= \big[1 - F(1)\big]^3 \\
&= \left(\frac{3}{4}\right)^3 = \frac{27}{64} \approx 0.422
\end{aligned}
$$

Same method as the lecture 10 deck's maximum slides and the minimum on the lecture 10 page.

### Q: WeBWorK 4-style. A project is due in 36 hours. You and your partner each write part of it, working independently. Your time is uniform on 20 to 40 hours and your partner's is uniform on 25 to 45 hours. (a) Find the mean and SD of your partner's time. (b) Find the probability the project is late, meaning the later of the two finishes after 36 hours. (c) At hour 36 the project is not done and you get a 4-hour extension. Find the probability you now finish on time.
**Topic:** 3m–n Maximum and minimum of independent random variables (cdf of the max is the product of the cdfs · pdf by the chain rule · parallel lifetime is the max · series lifetime is the min · flood levels)  **Lec:** WW4  **Type:** apply
**A:** Steps:
1. Use the uniform mean $$\frac{a + b}{2}$$ and SD $$\frac{b - a}{\sqrt{12}}$$.
2. The team's time is the maximum of the two, so $$P(\max \le t)$$ is the product of the two uniform cdfs at $$t$$.
3. Late means $$1 - P(\max \le 36)$$.
4. The extension is a conditional probability: $$P(\max \le 40 \mid \max > 36)$$.

(a) For the partner, $$a = 25$$ and $$b = 45$$:

$$
\begin{aligned}
\mu &= \frac{25 + 45}{2} = 35 \text{ h} \\
\sigma &= \frac{20}{\sqrt{12}} \approx 5.77 \text{ h}
\end{aligned}
$$

(b) Each uniform cdf is the fraction of its interval below $$t$$:

$$
\begin{aligned}
P(\max \le 36) &= \frac{16}{20} \times \frac{11}{20} \\
&= 0.8 \times 0.55 = 0.44 \\
P(\text{late}) &= 1 - 0.44 = 0.56
\end{aligned}
$$

(c) By hour 40 you are certainly done, so only the partner matters:

$$
\begin{aligned}
P(\max \le 40) &= 1 \times \frac{15}{20} = 0.75 \\
P(\text{on time}) &= \frac{0.75 - 0.44}{1 - 0.44} \\
&= \frac{0.31}{0.56} \approx 0.554
\end{aligned}
$$

The common mistake in (c) is to answer 0.75, which forgets that you already know the project was not done by hour 36.

### Q: WeBWorK 4-style. Daily electricity use $$X$$ (kWh) has pdf $$f(x) = \frac{25}{x^2}$$ for $$20 \le x \le 100$$ and 0 otherwise. (a) Check that this is a valid pdf. (b) Find $$P(X > 80)$$ to two decimals. (c) Find the median.
**Topic:** 3c Continuous random variables and the pdf (probability as area · f ≥ 0 and total area 1 · find the constant · endpoints do not matter · P at a point is 0)  **Lec:** WW4  **Type:** apply
**A:** Steps:
1. Check that $$f \ge 0$$ and integrate it over the whole support to get 1.
2. Integrate from 80 to the top of the support for (b).
3. Write the cdf $$F(m)$$ and solve $$F(m) = 0.5$$ for (c).

The antiderivative of $$\frac{25}{x^2}$$ is $$-\frac{25}{x}$$.

$$
\begin{aligned}
\int_{20}^{100} \frac{25}{x^2}\,dx &= 25\left(\frac{1}{20} - \frac{1}{100}\right) \\
&= 25(0.04) = 1 \\
P(X > 80) &= 25\left(\frac{1}{80} - \frac{1}{100}\right) \\
&= 25(0.0025) \approx 0.06
\end{aligned}
$$

For the median, $$F(m) = 25\left(\frac{1}{20} - \frac{1}{m}\right)$$:

$$
\begin{aligned}
25\left(\frac{1}{20} - \frac{1}{m}\right) &= 0.5 \\
\frac{1}{m} &= 0.05 - 0.02 = 0.03 \\
m &\approx 33.3 \text{ kWh}
\end{aligned}
$$

The upper limit is 100, not infinity; integrating to infinity gives 0.31 instead of 0.06.
