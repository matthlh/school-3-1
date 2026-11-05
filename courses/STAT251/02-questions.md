# STAT251 — Question Bank

Claude's source of truth for quizzing. Grows every lecture.
Tag each question with its topic so the ledger and the bank stay linked.

Format:
```
### Q: <question>
**Topic:** <topic name>  **Lec:** <n>  **Type:** recall | apply | derive | critique
**A:** Key:
1. <the core: what the question asks for; missing it makes the answer wrong>
2. <each other point a full-marks answer needs, one checkable fact or step per line>

<the explanation: working, reasons, sources>
```

A problem that needs paper goes under `## Long problems` at the end of this file instead of its lecture's section: a table or tree to build, an integral, a list of ten or more values, or a chain of three or more results that feed each other. It keeps its usual **Lec:** tag, and its answer opens with a numbered Steps list, which is what a normal quiz grades it on. The bus deck never shows it. New lecture and WeBWorK sections go above it.

---

## Lec 1–2 — Ch 1: data types, descriptive vs inferential, basic displays (logged 2026-09-11)

### Q: Classify each variable as categorical-nominal, categorical-ordinal, discrete, or continuous: (a) number of siblings (b) height in cm (c) blood type (d) letter grade (e) postal code (f) time to run 100 m.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** apply
**A:** Key:
1. (a) Number of siblings is discrete.
2. (b) Height in cm and (f) time to run 100 m are continuous.
3. (c) Blood type and (e) postal code are nominal.
4. (d) Letter grade is ordinal.
5. Postal code is nominal because its digits are labels, so arithmetic on them is meaningless.

- (a) discrete
- (b) continuous
- (c) nominal
- (d) ordinal
- (e) nominal — the digits are labels, arithmetic on them is meaningless
- (f) continuous.

### Q: State the test that decides whether a numerical variable is discrete or continuous.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** derive
**A:** Key:
1. Discrete means the possible values are countable, so they can be listed as 0, 1, 2, and so on, typically counts.
2. Continuous means there is always another possible value between any two, so it can take any value in an interval, typically measurements.
3. Rounding does not make a variable discrete; the underlying quantity decides.

- Discrete: the possible values are countable (you can list them 0, 1, 2, …), typically counts.
- Continuous: between any two possible values there is always another, so it can take any value in an interval. Typically measurements.

Rounding height to whole cm does not make it discrete; the underlying quantity decides.

### Q: A poll of 1,000 Canadians finds 52% support a policy; the headline says "a majority of Canadians support it". Which part is descriptive, which is inferential, and what does the inferential part need that the descriptive part doesn't?
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** apply
**A:** Key:
1. The "52% of the 1,000" part is descriptive, because it summarises the data in hand.
2. The "majority of Canadians" part is inferential, because it generalises from the sample to the population.
3. Inference needs a statement of uncertainty, such as a margin of error or a confidence level.
4. Inference needs an assumption about how the sample was drawn.

"52% of the 1,000" is descriptive — it summarises the data in hand. "Majority of Canadians" is inferential — it generalises from sample to population. Inference needs a statement of uncertainty (margin of error / confidence, Ch 8) and an assumption about how the sample was drawn; description needs neither.

### Q: Define descriptive and inferential statistics in one line each, and name the object each one makes claims about.
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** recall
**A:** Key:
1. Descriptive statistics are methods to organise, display and summarise the data you actually have.
2. Descriptive claims are about the sample or data set.
3. Inferential statistics are methods to draw conclusions, predictions or decisions from a sample.
4. Inferential claims are about the population and its parameters, estimated from sample statistics.

- Descriptive: methods to organise, display and summarise the data you actually have. Claims about the sample or data set.
- Inferential: methods to draw conclusions, predictions or decisions from a sample. Claims about the population (its parameters), estimated from sample statistics.

### Q: Bar chart vs histogram — name two structural differences and the data type each is for.
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** recall
**A:** Key:
1. A bar chart is for categorical data, with one bar per category.
2. A histogram is for numerical data grouped into bins.
3. Bar chart bars have gaps between them, while histogram bars touch.
4. Bar chart order is arbitrary unless ordinal, while histogram order is fixed by the number line.

- Bar chart: categorical data. One bar per category, gaps between bars, category order arbitrary unless ordinal.
- Histogram: numerical data grouped into bins. Bars touch, order fixed by the number line, bin width is a choice you make.

### Q: You have 25 integer scores ranging from 1 to 12. Dot plot or histogram? Justify.
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** apply
**A:** Key:
1. A dot plot.
2. Small $$n$$ and only about 12 distinct values let every observation be shown, so repeats, gaps and outliers stay visible.
3. A dot plot imposes no binning decision, while a histogram would merge values or become a dot plot drawn with bars.

Dot plot. Small n and only ~12 distinct values, so every observation can be shown individually — repeats, gaps and outliers stay visible and no binning decision is imposed. A histogram would either merge values (losing information) or degenerate into a dot plot drawn with bars.

### Q: What can you read off a stem-and-leaf plot that you cannot read off a histogram of the same data? What's the cost?
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** recall
**A:** Key:
1. A stem-and-leaf plot shows the actual data values, so the exact median, minimum, maximum and any observation can be read.
2. It still shows the shape: skew, modes and outliers.
3. Its cost is that it is only practical for small data sets.
4. Its cost is that the stem unit fixes the bin width, so the resolution cannot be tuned freely.

The actual data values — hence the exact median, min, max and any individual observation — while still seeing shape (skew, modes, outliers). Cost: only practical for small data sets, and the stem unit fixes the bin width so you can't tune resolution freely.

### Q: Build a stem-and-leaf plot for 23, 27, 31, 34, 34, 38, 42, 45, 51 and read off the median.
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** derive
**A:** Key:
1. Stems are tens and leaves are units, giving rows 2 | 3 7, 3 | 1 4 4 8, 4 | 2 5 and 5 | 1.
2. The plot carries a key saying 2 | 3 means 23.
3. With $$n = 9$$ the median is the 5th ordered value.
4. The median is 34.

Stem = tens, leaf = units.

| Stem | Leaves |
|---|---|
| 2 | 3 7 |
| 3 | 1 4 4 8 |
| 4 | 2 5 |
| 5 | 1 |

Key: 2 | 3 = 23. With $$n = 9$$ the median is the 5th ordered value, which is 34.

### Q: When is a pie chart defensible, and when is a bar chart strictly better?
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** critique
**A:** Key:
1. A pie is defensible for one categorical variable whose categories are parts of a single whole, when the message is share of total.
2. A pie needs few categories, about 5 or fewer.
3. A bar chart wins when sizes must be compared precisely, there are many categories, or groups are compared.
4. People judge lengths far more accurately than angles or areas.

- Pie: one categorical variable, categories are parts of a single whole, few categories (about 5 or fewer), and the message is "share of total".
- Bar chart wins when you must compare category sizes precisely, there are many categories, or you compare across groups. People judge lengths far more accurately than angles or areas.

### Q: A frequency table has a relative-frequency column. How is it computed, what must it sum to, and why bother when you already have counts?
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** apply
**A:** Key:
1. Relative frequency is the count divided by $$n$$.
2. The column sums to 1, or 100%.
3. It puts data sets of different sizes on one scale so their distributions can be compared.
4. It is the empirical version of a probability distribution.

Relative frequency is the count divided by n, and the column sums to 1 (100%). It puts data sets of different sizes on one scale so distributions can be compared. It is also the empirical version of a probability distribution, which Ch 3–4 use directly.

### Q: Write the two-step decision procedure for classifying any variable, then apply it to: marital status, finishing position in a race (1st/2nd/3rd), finishing time.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** derive
**A:** Key:
1. Step 1: if arithmetic on the values means nothing, it is categorical, nominal with no natural order and ordinal with one.
2. Step 2: if arithmetic means something, it is numerical, discrete for a countable list and continuous for any value in an interval.
3. Marital status is nominal.
4. Race position is ordinal, since it is ordered but the gap from 1st to 2nd is not a fixed quantity.
5. Finishing time is continuous.

1. Does arithmetic on the values (differences, averages) mean anything? If no, it is categorical: nominal if there is no natural order, ordinal if there is.
2. If yes, it is numerical: discrete if the possible values form a countable list (counts), continuous if it can take any value in an interval (measurements).

Marital status: nominal. Race position: ordinal (ordered, but the gap from 1st to 2nd is not a fixed quantity). Finishing time: continuous.

### Q: Why is a postal code categorical even though it is made of letters and digits, and which kind of categorical? Give two other "numbers that are really labels".
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** apply
**A:** Key:
1. Arithmetic on a postal code is meaningless, because its characters identify an area rather than measure anything.
2. It is nominal, since there is no natural order.
3. Two other examples from: student number, phone number, jersey number, SIN, product ID.

Arithmetic on it is meaningless — an "average postal code" or V6T + V5K has no interpretation; the characters identify an area, they don't measure anything. Nominal (no natural order). Others: student number, phone number, jersey number, SIN, product ID.

### Q: A student classifies "number of stars in a product review (1–5)" as discrete "because it's a count". What is the better classification and why?
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** critique
**A:** Key:
1. Star ratings are ordinal categorical, not discrete.
2. The stars are ranks, not counts of anything, so 4 stars is not twice 2 stars.
3. The gap from 1 to 2 stars need not equal the gap from 4 to 5.

Ordinal categorical. The stars are ranks, not counts of anything: 4 stars is not "twice" 2 stars, and the gap from 1 to 2 need not equal the gap from 4 to 5. Same for Likert scales (strongly disagree … strongly agree). Rule: numbers used as ordered labels are ordinal, not discrete.

### Q: Classify: (a) T-shirt size (S/M/L/XL) (b) phone number (c) temperature in °C (d) number of goals in a match (e) eye colour (f) pain rating 0–10.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** apply
**A:** Key:
1. (a) T-shirt size is ordinal.
2. (b) Phone number and (e) eye colour are nominal.
3. (c) Temperature in °C is continuous.
4. (d) Number of goals in a match is discrete.
5. (f) Pain rating 0–10 is ordinal, because a rating scale gives ranks, not counts.

- (a) ordinal
- (b) nominal
- (c) continuous
- (d) discrete
- (e) nominal
- (f) ordinal — a rating scale, ranks not counts.

### Q: For each variable name the display you would reach for and why: letter grade (A/B/C/D/F), study time in hours, pass/fail.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** apply
**A:** Key:
1. Letter grade is ordinal, so a bar chart with the bars in grade order.
2. Study time is continuous, so a histogram, or a dot plot if $$n$$ is small.
3. Pass/fail is nominal and binary, so a bar chart, or a pie since there are only two parts of one whole.

- Letter grade: ordinal, so a bar chart with bars in grade order (order matters, gaps between bars).
- Study time: continuous, so a histogram (bins on a number line, bars touch), or a dot plot if n is small.
- Pass/fail: nominal and binary, so a bar chart. A pie is defensible with only two parts of one whole.

### Q: For each statement, descriptive or inferential? Name the word that gives away each inferential one. (a) "The mean height of the 40 students in this class is 172 cm." (b) "Based on this class, UBC students average about 172 cm." (c) "Of 500 sampled bulbs, 3 were defective." (d) "The factory's defect rate is about 0.6% ± 0.7%."
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** apply
**A:** Key:
1. (a) is descriptive, a fact about the data in hand.
2. (b) is inferential: "UBC students" names a population larger than the 40 measured.
3. (c) is descriptive.
4. (d) is inferential: "the factory's rate" is a population parameter, and the $$\pm$$ is the uncertainty inference carries.

- (a) descriptive — a fact about the data in hand.
- (b) inferential — "UBC students" names a population larger than the 40 measured.
- (c) descriptive.
- (d) inferential — "the factory's rate" is a population parameter, and the ± is the uncertainty inference must carry. Giveaway: the claim reaches beyond the units actually measured, or attaches a margin of error.

### Q: Define population, sample, parameter, statistic, and say which pair descriptive statistics works with and which pair inference connects.
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** recall
**A:** Key:
1. A population is the whole group of interest, and a sample is the subset actually measured.
2. A parameter is a number describing the population, such as $$\mu$$, $$p$$ or $$\sigma$$, usually unknown.
3. A statistic is a number computed from the sample, such as $$\bar{x}$$, $$\hat{p}$$ or $$s$$.
4. Descriptive statistics works with the sample and its statistics.
5. Inference uses a statistic to make a claim about the parameter, from sample to population.

- Population: the whole group of interest.
- Sample: the subset actually measured.
- Parameter: a number describing the population ($$\mu$$, $$p$$, $$\sigma$$), usually unknown.
- Statistic: a number computed from the sample ($$\bar{x}$$, $$\hat{p}$$, $$s$$).

Descriptive statistics works with the sample and its statistics. Inference uses a statistic to make a claim about the parameter, from sample to population.

### Q: A student says "descriptive statistics are the objective facts; inferential statistics are guesses." Correct each definition in one sentence, and name what inference adds so that it is not a guess.
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** critique
**A:** Key:
1. Descriptive statistics organise, display and summarise the data you have, and claim things only about that data.
2. Inferential statistics draw conclusions about a population from a sample.
3. Inference is not a guess because it quantifies its own uncertainty, with a margin of error and confidence level or a p-value.
4. That uncertainty is computed under an explicit assumption about how the sample was drawn, such as random sampling.

- Descriptive: methods to organise, display and summarise the data you have (tables, graphs, mean, SD). Claims only about that data.
- Inferential: methods to draw conclusions about a population from a sample.

It is not a guess because it quantifies its own uncertainty (a margin of error and confidence level, or a p-value), computed under an explicit assumption about how the sample was drawn, such as random sampling.

### Q: Give an example where the descriptive summary is perfectly correct but any inference from it is worthless, and say what that shows inference depends on.
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** apply
**A:** Key:
1. An example with a self-selected sample, such as 52% of 1,000 visitors to a party's website supporting the party.
2. The description of those 1,000 is exactly right, but generalising to Canadians is worthless because the sample is not representative.
3. Inference depends on how the sample was collected; random sampling justifies generalising and lets you compute the uncertainty.

A poll of 1,000 visitors to a political party's website finds 52% support the party. "52% of these 1,000" is exactly right as a description; "52% of Canadians" is worthless because the sample is self-selected, not representative. Inference depends on how the sample was collected — random sampling is what justifies generalising and what lets you compute the uncertainty.

### Q: If a census measures every member of the population, is there any inferential statistics left to do about that population? Explain.
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** critique
**A:** Key:
1. No, there is no inference left to do about that population.
2. The sample is the population, so each statistic is the parameter and there is no sampling uncertainty.
3. Inference reappears only to generalise beyond the census, such as to next year, a process or a larger population.

No. The "sample" is the population, so each statistic *is* the parameter and there is no sampling uncertainty — it is all descriptive. Inference reappears only if you want to generalise beyond the census (to next year, to a process, to a larger population).

### Q: You have 25 observations with minimum 175 and maximum 265 and want 5 intervals. Walk through building the histogram: range, interval width, what goes in the frequency table, and how the bars are drawn.
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** derive
**A:** Key:
1. The range is maximum minus minimum, $$265 - 175 = 90$$, and the width is the range over 5 intervals, $$\frac{90}{5} = 18$$.
2. The frequency table counts the observations in each equal-width interval.
3. Each interval gets one bar with height equal to its frequency or relative frequency, and the bars touch because the axis is a number line.
4. Both axes are labelled and the graph has a heading.
5. A boundary value is counted in the interval where it is the upper end, so 230 goes in 210–230.

$$\text{Range} = 265 - 175 = 90$$. $$\text{Width} = 90 \div 5 = 18$$ (the deck then rounds to convenient equal-width bins 170–190, 190–210, … 250–270). Cut the range into equal-width intervals, count the observations in each to make the frequency table, then draw one bar per interval with height equal to its frequency (or relative frequency); bars touch because the axis is a number line. Label both axes and give a heading. A value that sits exactly on a boundary is counted in the interval where it is the upper end, so 230 goes in 210–230; lecture 3 gave that rule.

### Q: The lecture-2 slides split variables into categorical and quantitative. Give both definitions, then classify: number of siblings, county of residence, commute distance in km, blood type.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** apply
**A:** Key:
1. Categorical: each observation belongs to one of a set of categories.
2. Quantitative: observations take numerical values that represent different magnitudes of the variable.
3. Number of siblings is quantitative discrete, and commute distance in km is quantitative continuous.
4. County of residence and blood type are categorical nominal.

Categorical: each observation belongs to one of a set of categories. Quantitative: observations take numerical values that represent different magnitudes of the variable. Siblings: quantitative, discrete. County: categorical, nominal. Commute km: quantitative, continuous. Blood type: categorical, nominal. The deck says "quantitative" where the notes say "numerical"; same thing.

### Q: State the deck's definitions of a discrete and a continuous quantitative variable, and give the three one-line characterisations of statistics from the "What is Statistics?" slide.
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** recall
**A:** Key:
1. Discrete: the possible values form a set of separate numbers, such as 0, 1, 2, 3.
2. Continuous: the possible values form an interval.
3. Statistics is a science involving study design, data collection, summarising and analysing data, interpreting results and drawing conclusions.
4. Statistics is the science of learning from data and of measuring, controlling and communicating uncertainty.
5. Statistics is a branch of applied mathematics dealing with data collection, organisation, analysis, interpretation and presentation.

Discrete: the possible values form a set of separate numbers, such as 0, 1, 2, 3, …. Continuous: the possible values form an interval. Statistics is (1) a science involving the design of studies, data collection, summarising and analysing data, interpreting results and drawing conclusions; (2) the science of learning from data and of measuring, controlling and communicating uncertainty; (3) a branch of applied mathematics dealing with data collection, organisation, analysis, interpretation and presentation.

### Q: Construct a dot plot for the midterm scores 10, 90, 95, 100, 65, 50, 60, 50, 90, 55, 60, 70 and read off the mode or modes.
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** derive
**A:** Key:
1. A number line labelled Grade from 0 to 100, with one dot per score stacked above its value.
2. The stacks are 10 (1), 50 (2), 55 (1), 60 (2), 65 (1), 70 (1), 90 (2), 95 (1) and 100 (1), with $$n = 12$$.
3. There are three modes, 50, 60 and 90, each appearing twice.

Horizontal number line labelled "Grade" from 0 to 100, one dot per score stacked above its value: 10 (1), 50 (2), 55 (1), 60 (2), 65 (1), 70 (1), 90 (2), 95 (1), 100 (1). $$n = 12$$. Three modes: 50, 60 and 90, each twice.

### Q: Give the symbols for the population mean, standard deviation and proportion, and for each one's sample version. Which are parameters, which are statistics, and which can you usually compute?
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** recall
**A:** Key:
1. The population mean, standard deviation and proportion are $$\mu$$, $$\sigma$$ and $$p$$.
2. The sample versions are $$\bar{x}$$, $$s$$ and $$\hat{p}$$.
3. The population values are parameters and the sample values are statistics.
4. You can always compute the statistics from the data in hand.
5. The parameters are usually unknown, because the population is too large to measure in full, so inference estimates them.

- The population mean $$\mu$$, the population standard deviation $$\sigma$$ and the population proportion $$p$$ are parameters. They describe the population.
- The sample mean $$\bar{x}$$, the sample standard deviation $$s$$ and the sample proportion $$\hat{p}$$ are statistics. They are computed from the sample.
- You can always compute the statistics from the data in hand. The parameters are usually unknown, because the population is too large, or infinite, to measure in full, and inference uses the statistics to estimate them.

### Q: Which of these is continuous? (a) the number of people waiting in a line (b) the number of speeding tickets a driver has (c) the weight of a dog (d) shoe size, sold in half sizes. Justify each.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** apply
**A:** Key:
1. Only (c), the weight of a dog, is continuous.
2. (a) and (b) are discrete because they are counts.
3. A weight can take any value in an interval; recording it to one decimal only reflects the scale's precision.
4. (d) Shoe size is discrete because 6, 6.5 and 7 are separate values with no size in between.

- (a) Discrete, because it is a count.
- (b) Discrete, because it is a count.
- (c) Continuous. A weight can take any value in an interval, and recording it to one decimal only reflects the scale's precision.
- (d) Discrete. The sizes 6, 6.5 and 7 are separate values with no size in between, even though some are not whole numbers.
- Only (c) is continuous. This was the lecture 2 iClicker, and (d) is his example of a discrete variable with fractions.

### Q: A stem-and-leaf plot says the leaf unit is 10. What value does the row 5 | 7 stand for, and can the value 692 be shown exactly? What does 5 | 7 mean if the leaf unit is 0.1?
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** apply
**A:** Key:
1. With a leaf unit of 10, the row 5 | 7 is 570.
2. 692 cannot be shown exactly: it goes on stem 6 with leaf 9, which stands for 690.
3. With a leaf unit of 0.1, the row 5 | 7 is 5.7.

- With a leaf unit of 10, the leaf counts tens and the stem counts hundreds, so 5 | 7 is 570.
- 692 cannot be shown exactly. It goes on stem 6 with leaf 9, which stands for 690, so the last digit is lost.
- With a leaf unit of 0.1, the row 5 | 7 is 5.7.
- When no leaf unit is stated, it is 1.

### Q: A survey question has 25 possible answers. Pie chart or bar chart, and how would you make the bars easiest to compare? Then say how exam percentages, which are numerical, could be shown in a pie chart at all.
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** apply
**A:** Key:
1. A bar chart, because a pie with 25 slices cannot be read while bar heights are easy to compare.
2. Sort the bars from tallest to shortest, which makes a Pareto chart.
3. Exam percentages must first be grouped into categories, such as letter-grade bands.
4. Each band then gets a slice sized by its percentage of students, and the percentages add to 100%.

- A bar chart. A pie with 25 slices cannot be read, while bar heights are easy to compare. This was the lecture 2 iClicker.
- Sort the bars from tallest to shortest. A sorted bar graph is called a Pareto chart.
- Exam percentages must first be grouped into categories, such as letter-grade bands. Each band then gets a slice sized by its percentage of students, and the percentages add to 100%.

## Lec 3 — Ch 1: histograms, shape, mean and median, range (logged 2026-09-14)

### Q: A histogram of household incomes peaks near $60k and has a tail stretching out to $500k. Name the shape, say which side the tail is on and where the peak sits, and state whether the mean is above or below the median. Justify the last part.
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** apply
**A:** Key:
1. The shape is right-skewed.
2. The long tail is on the right, toward the high values, and the peak sits on the left.
3. The mean is above the median.
4. The few very large incomes drag the mean into the tail, while the median depends only on the middle of the ordered list.

Right-skewed (skewed to the right). The long tail is on the right, toward the high values, and the peak sits on the left. Mean > median: the few very large incomes add a lot to the sum, so the mean is dragged into the tail, while the median depends only on the middle of the ordered list and barely moves.

### Q: A student says "right-skewed means the hump is on the right side of the histogram." Correct the statement and give the rule for naming a skew.
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** critique
**A:** Key:
1. Wrong way round: a right-skewed histogram has its long tail pointing right and its hump on the left.
2. Rule: the skew is named after the side with the longer, thinner tail, not after the peak.

Wrong way round. Skew is named after the long tail, not the peak: a right-skewed histogram has its long tail pointing right and its hump on the left. Rule: find the side with the longer, thinner tail; that side names the skew. Symmetric means the two sides are mirror images.

### Q: Define unimodal, bimodal and multimodal. Heights of all UBC students, men and women pooled, come out bimodal. Why, and what does that suggest you should do before summarising with one mean?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** apply
**A:** Key:
1. Unimodal has one clear peak, bimodal two and multimodal more than two.
2. Two peaks mean two subpopulations with different centres were mixed, here men and women.
3. A single mean would land between the two peaks and describe almost nobody.
4. Split the groups and summarise each one separately.

The type of mound counts the clear peaks: unimodal one, bimodal two, multimodal more than two. Two peaks usually mean two subpopulations with different centres have been mixed, here men and women. A single mean would land between the two peaks and describe almost nobody, so split the groups and summarise each.

### Q: A frequency table for five equal-width intervals reads 1, 2, 0, 10, 5. Do you drop the empty interval when you draw the histogram? What must the bar heights add to, and why do the bars touch?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** apply
**A:** Key:
1. No, the empty interval stays on the axis with a bar of height zero.
2. Keeping it makes the gap in the data visible.
3. The heights add to $$n = 18$$, or to 1 with relative frequencies.
4. The bars touch because the horizontal axis is a continuous number line and adjacent intervals share an endpoint.

No. The interval stays on the axis with a bar of height zero, so the gap in the data is visible, the same reason an empty stem stays in a stem-and-leaf plot. The heights add to $$n = 18$$ (or to 1 if you plotted relative frequencies). Bars touch because the horizontal axis is a continuous number line and adjacent intervals share an endpoint.

### Q: Exam scores: 95, 92, 90, 88, 85, 84, 80, 60, 40. Without drawing anything, say which way this is skewed, then compute the mean and median and check that they agree with your answer.
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** derive
**A:** Key:
1. Left-skewed, because most scores are high and two stragglers far below make a long left tail.
2. The mean is the sum over $$n$$: $$\bar{x} = \frac{714}{9}$$.
3. $$\bar{x} \approx 79.3$$.
4. The median is the 5th ordered value, 85.
5. The mean below the median confirms a left tail.

Most scores are high with two stragglers far below, so the long tail is on the left: left-skewed. The sum is 714 and $$n = 9$$, so $$\bar{x} = \frac{714}{9} \approx 79.3$$. The median is the 5th ordered value, 85. $$\text{Mean} < \text{median}$$, which is the signature of a left tail.

### Q: 40 observations run from 3.2 to 9.8 and you want 6 intervals. Compute the width, propose convenient equal-width intervals that cover the data, and state what the frequency column must sum to. What changes if you use 12 intervals instead?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** derive
**A:** Key:
1. $$\text{Range} = 9.8 - 3.2 = 6.6$$, so the width is $$\frac{6.6}{6} = 1.1$$.
2. Round to a convenient width that covers the data, such as 1.2 from 3.0: 3.0–4.2, 4.2–5.4, up to 9.0–10.2.
3. State which endpoint each interval includes, so a boundary value is counted once.
4. The frequency column sums to $$n = 40$$.
5. With 12 intervals the width halves to about 0.55, giving more detail but bumpier bars and more near-empty intervals.

$$\text{Range} = 9.8 - 3.2 = 6.6$$, so $$\text{width} = \frac{6.6}{6} = 1.1$$. Round to a convenient width that still covers the data, for example 1.2 starting at 3.0: 3.0–4.2, 4.2–5.4, 5.4–6.6, 6.6–7.8, 7.8–9.0, 9.0–10.2, and say which endpoint each interval includes so a boundary value is counted once. The counts sum to $$n = 40$$. With 12 intervals the width halves to about 0.55: more detail but bumpier bars and more near-empty intervals. The number of intervals is a choice, and it changes how the shape looks.

### Q: State the median rule for odd and even n. Apply it to 12, 14, 15, 17, 20, 24, 24, 27, 29, then to the same list with 30 appended.
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** derive
**A:** Key:
1. Order the data; for odd $$n$$ the median is the $$\frac{n+1}{2}$$-th value.
2. For even $$n$$, average the $$\frac{n}{2}$$-th and $$\left(\frac{n}{2}+1\right)$$-th values.
3. For $$n = 9$$ the median is the 5th value, 20.
4. With 30 appended, $$n = 10$$ and the median is $$\frac{20 + 24}{2} = 22$$.

Order the data first. Odd $$n$$: the median is the $$\frac{n+1}{2}$$-th value. Even $$n$$: average the $$\frac{n}{2}$$-th and $$\left(\frac{n}{2}+1\right)$$-th values. For $$n = 9$$ the median is the 5th value, 20. With 30 appended $$n = 10$$, so average the 5th and 6th values: $$\frac{20 + 24}{2} = 22$$.

### Q: The deck's example 4, 6, 8, 7, 5 hours has mean 6. Replace the 8 with 80 and recompute the mean and the median. What property of the median does this show, and what are the sample mean's symbol and formula?
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** derive
**A:** Key:
1. The new mean is the new sum over $$n$$: $$\bar{x} = \frac{4 + 5 + 6 + 7 + 80}{5} = \frac{102}{5}$$.
2. The new mean is 20.4, up from 6.
3. The median stays 6, the middle of 4, 5, 6, 7, 80.
4. The median is resistant to extreme values and the mean is not.
5. The sample mean is $$\bar{x} = \frac{x_1 + \dots + x_n}{n}$$, the sum of the observations over how many there are.

Original: ordered 4, 5, 6, 7, 8, mean $$\frac{30}{5} = 6$$, median 6. After: 4, 5, 6, 7, 80, mean $$\frac{102}{5} = 20.4$$, median still 6. The median is resistant to extreme values; the mean is not. The sample mean is $$\bar{x} = \frac{x_1 + \dots + x_n}{n}$$, the sum of the observations divided by how many there are.

### Q: "The median is preferred for skewed data because it is the relative mean." Fix the reason, then give two situations where the mean is the better choice.
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** critique
**A:** Key:
1. The median is preferred because it is resistant; there is no "relative mean".
2. Extreme values in the long tail drag the mean toward them, while the median stays near a typical observation.
3. The mean is better for roughly symmetric data with no outliers, where it is close to the median and uses every value.
4. The mean is better when you need a total, since $$\text{mean} \times n$$ gives the sum.

There is no "relative mean". The median is preferred because it is resistant: extreme values in the long tail drag the mean toward them, so the median stays closer to a typical observation. The mean is better when the distribution is roughly symmetric with no outliers (then $$\text{mean} \approx \text{median}$$ and the mean uses every value), and when you need a total, since $$\text{mean} \times n$$ gives the sum (total revenue, total hours).

### Q: A real-estate board reports that detached houses sold last month had a mean price of $2.4M and a median of $1.7M. What does the gap tell you about the shape of the price distribution, what causes it, and which number describes a typical house?
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** apply
**A:** Key:
1. A mean well above the median means a long right tail, so the prices are right-skewed.
2. A few very expensive houses add a lot to the sum and pull the mean up, while the median only tracks the middle sale.
3. The median describes the typical house.

Mean well above median means a long right tail: right-skewed. A few very expensive houses add a lot to the sum and pull the mean up, while the median only tracks the middle sale. The median describes the typical house; the mean is inflated by the top end. Symmetric data would show $$\text{mean} \approx \text{median}$$, and $$\text{mean} < \text{median}$$ would mean a left tail.

### Q: Compute the mean, median and range of 48, 49, 50, 51, 52 and of 30, 40, 50, 60, 70. What does the comparison prove about describing a distribution?
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** derive
**A:** Key:
1. First set: mean 50, median 50, range 4.
2. Second set: mean 50, median 50, range 40.
3. Centre and spread are separate features, so a measure of centre alone does not describe a distribution.

First set: mean 50, median 50, range 4. Second set: mean 50, median 50, range 40. Centre and spread are separate features: two data sets can share a centre and differ completely in spread, so a measure of centre alone does not describe a distribution.

### Q: Define an outlier as the deck does. Compute the range of 70, 46, 62, 64, 15, 78, 56, 64, 69, 49, then recompute it with the 15 removed. What does that show, and which of mean and median reacts the same way?
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** apply
**A:** Key:
1. An outlier is an observation far from the rest of the data, unusually large or unusually small.
2. The range is maximum minus minimum, $$78 - 15 = 63$$.
3. Without the 15 the range is $$78 - 46 = 32$$.
4. One observation halved the range, because the range uses only the two extremes.
5. The mean reacts the same way, pulled toward the outlier, while the median barely moves.

An outlier is an observation far from the rest of the data, unusually large or unusually small. $$\text{Range} = 78 - 15 = 63$$. Without the 15 the minimum is 46 and the range is $$78 - 46 = 32$$. One observation halved it, because the range uses only the two extremes. The mean reacts the same way, pulled toward the outlier; the median barely moves.

### Q: Define centre and spread in one sentence each, name every measure of each you have so far, and say which measures and which display come next class.
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** recall
**A:** Key:
1. Centre is a single value standing for a typical observation, where the data cluster.
2. The measures of centre so far are the mean and the median.
3. Spread is how far the observations sit from each other or from the centre, also called variability or dispersion.
4. The only measure of spread so far is the range.
5. Next class adds variance, standard deviation, the interquartile range and the boxplot.

Centre is a single value standing for a typical observation, where the data cluster: the measures so far are the mean and the median. Spread is how far the observations sit from each other or from the centre, also called variability or dispersion: the only measure so far is the range. Next class adds variance, standard deviation and the interquartile range, plus the boxplot that displays the median, quartiles and outliers.


### Q: A lab reports "range: 12 to 41". Is that the range as the course defines it? Give the correct value and say what a range of 0 would mean.
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** apply
**A:** Key:
1. No: the range is a single number, maximum minus minimum.
2. The range here is $$41 - 12 = 29$$.
3. A range of 0 means every observation is identical, so there is no spread.

No. The range is a single number, maximum minus minimum, so here it is $$41 - 12 = 29$$. "12 to 41" is the span of the data, not the range. A range of 0 means every observation is identical, so there is no spread at all.

### Q: Data: 3, 5, 5, 6, 7, 8, 40. Compute the mean, the median and the range. Then drop the 40 and recompute all three. Which measures changed a lot, which barely moved, and what is the word the course uses for a measure that barely moves?
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** derive
**A:** Key:
1. With the 40: $$\bar{x} = \frac{74}{7} \approx 10.6$$, median 6, range 37.
2. Without the 40: $$\bar{x} = \frac{34}{6} \approx 5.7$$, median 5.5, range 5.
3. The mean and the range change a lot, while the median barely moves.
4. The mean uses every value in its sum and the range uses the two ends, while the median depends only on the middle position.
5. A measure that barely moves is called resistant.

With the 40: $$\bar{x} = \frac{74}{7} \approx 10.6$$, median 6, range 37. Without it: $$\bar{x} = \frac{34}{6} \approx 5.7$$, median 5.5, range 5. The mean and the range are pulled hard by the single extreme value, because the mean uses every value in its sum and the range uses only the two ends. The median barely moves because it only depends on the middle position. A measure that is not much affected by an outlier is called resistant, so the median is resistant and the mean and range are not.

### Q: Give the deck's definition of an outlier in one sentence, and say why the $$1.5 \times \text{IQR}$$ rule is not the definition.
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** recall
**A:** Key:
1. An outlier is an observation that lies far from the rest of the data, unusually large or unusually small.
2. The $$1.5 \times \text{IQR}$$ fence is a later working rule for flagging candidates once quartiles exist, not the definition.

An outlier is an observation that lies far from the rest of the data, unusually large or unusually small. The $$1.5 \times \text{IQR}$$ fence is a later working rule for flagging candidates once quartiles are available, not the definition, and the deck introduces the idea before any fence: an outlier is identified by its distance from the bulk of the data, whatever tool is used to decide "far". On an exam, though, the $$1.5 \times \text{IQR}$$ rule from lecture 4 is how you decide which values count as outliers.

### Q: iClicker from lecture 3: the distribution of prices of detached houses sold in a city is (a) symmetric (b) left-skewed (c) right-skewed (d) bimodal. Pick one and justify it using the tail and the position of the mean relative to the median.
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** apply
**A:** Key:
1. (c) right-skewed.
2. A small number of very expensive houses stretch the tail far to the right, toward the high values.
3. Those few pull the mean above the median, the signature of a right tail.

(c) right-skewed. Prices cannot go below zero and most houses cluster in a middle band, but a small number of very expensive houses stretch the tail far to the right, toward the high values. Those few pull the mean above the median, the signature of a right tail. Left-skewed would need a long tail of very cheap houses, and bimodal would need two separate clusters of prices.

### Q: The 25 hours-worked values include 230 and 250, and the intervals are 170–190, 190–210, 210–230, 230–250 and 250–270. Which interval gets each of those two values under the course's rule, and why must the rule stay the same at every boundary?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** apply
**A:** Key:
1. A boundary value goes in the interval where it is the upper end, so 230 goes in 210–230.
2. 250 goes in 230–250, not 250–270.
3. The rule must be the same at every boundary, or some values get pushed up and others down and the counts stop describing the data.

- A value on a boundary goes in the interval where it is the upper end. So 230 goes in 210 to 230, and 250 goes in 230 to 250, not in 250 to 270.
- The rule must be the same at every boundary. Otherwise some boundary values get pushed up and others down, and the counts stop describing the data. The deck's counts of 1, 2, 7, 10 and 5 only come out with this rule.

### Q: You have 25 observations. Why would a histogram with 2 intervals, or with 10, be a poor choice, and what is the course's rule of thumb for the number of intervals?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** critique
**A:** Key:
1. Two bars cannot show a shape, a centre or a spread.
2. Ten intervals spread 25 values so thinly that most bars hold only 0 to 3 values and the shape gets lost.
3. The rule of thumb is 5 to 15 intervals, with more only for large data sets.
4. For 25 values, 5 or 6 intervals is about right.

- Two bars cannot show a shape, a centre or a spread, which is the whole point of the graph.
- Ten intervals spread 25 values so thinly that most bars hold only 0 to 3 values, and the shape gets lost.
- The rule of thumb is 5 to 15 intervals, with more only for large data sets. For 25 values, 5 or 6 is about right, and the two give a similar picture.

### Q: A relative frequency histogram of resting heart rates for 400 people has intervals 50–60, 60–70, 70–80, 80–90 and 90–100 with bar heights 0.05, 0.20, 0.40, 0.25 and 0.10. Using the course's boundary rule, how many people had a rate of at most 80, and how many had a rate above 80?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** apply
**A:** Key:
1. At most 80 is the first three bars, because 80 ends the 70–80 interval: $$(0.05 + 0.20 + 0.40) \times 400$$.
2. That is $$0.65 \times 400 = 260$$ people.
3. Above 80 is the last two bars: $$(0.25 + 0.10) \times 400 = 140$$ people.

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
**A:** Key:
1. False.
2. Skewness describes a numerical variable on a number line, so it is read from a histogram.
3. Faculties are categories with no fixed order, so the bars could be rearranged into any shape and the bar chart's shape means nothing.

False. Skewness describes a numerical variable on a number line, so it is read from a histogram. Faculties are categories with no fixed order, so the same bars could be rearranged into any shape, and the shape of a bar chart means nothing. This was the lecture 3 iClicker, and the answer was "none of these".

### Q: True or false, and justify: the median is always one of the data values.
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** critique
**A:** Key:
1. False.
2. With an odd number of values the median is the middle value, so it is a data value.
3. With an even number it is the average of the two middle values, a data value only when those two are equal.

False. With an odd number of values the median is the middle value, so it is a data value. With an even number it is the average of the two middle values, which is a data value only when those two are equal. The list 12, 14, 15, 17, 20, 24, 24, 27, 29, 30 has median $$\frac{20 + 24}{2} = 22$$, and 22 is not in the list.

## Lec 4 — Ch 1: variability, percentiles and quartiles, box plots (logged 2026-09-16)

### Q: The deck's example: the hours five students spent studying per week are 4, 6, 8, 7, 5. From a blank page, compute the sample variance and the sample standard deviation, showing every deviation, and give the units of each.
**Topic:** 1b Variance and standard deviation (n − 1 formula · units · not resistant · effect of y = a + bx)  **Lec:** 4  **Type:** derive
**A:** Key:
1. Sample variance with $$\bar{x} = 6$$: $$s^2 = \frac{(-2)^2 + 0^2 + 2^2 + 1^2 + (-1)^2}{5 - 1}$$.
2. $$s^2 = \frac{10}{4} = 2.5$$.
3. $$s = \sqrt{2.5} \approx 1.58$$.
4. The variance is in $$\text{hours}^2$$ and the standard deviation is in hours.

$$\bar{x} = \frac{30}{5} = 6$$. Deviations $$-2, 0, 2, 1, -1$$; squares 4, 0, 4, 1, 1; sum 10.

$$
\begin{aligned}
s^2 &= \frac{10}{5 - 1} = 2.5 \text{ hours}^2 \\
s &= \sqrt{2.5} \approx 1.58 \text{ hours}
\end{aligned}
$$

The formula is $$s^2 = \frac{\sum (x_i - \bar{x})^2}{n - 1}$$. The shortcut $$\sum x_i^2 - n\bar{x}^2 = 190 - 180 = 10$$ gives the same sum.

### Q: Which statement about the sample standard deviation $$s$$ is false, and why? (a) $$s \ge 0$$, with $$s = 0$$ only when every observation is the same value. (b) $$s$$ has the same units as the data, and $$s^2$$ has those units squared. (c) $$s$$ is resistant: one extreme observation moves it about as little as it moves the median. (d) Strong skew or a few outliers can inflate $$s$$ a great deal.
**Topic:** 1b Variance and standard deviation (n − 1 formula · units · not resistant · effect of y = a + bx)  **Lec:** 4  **Type:** critique
**A:** Key:
1. (c) is false: $$s$$ is not resistant.
2. $$s$$ squares every deviation, so one far-out value adds a huge term to the sum and also shifts $$\bar{x}$$ toward it.
3. The median only counts positions, so it barely moves.

(c) is false. $$s$$ squares every deviation from the mean, so one far-out value adds a huge term to the sum and also shifts $$\bar{x}$$ toward it; the median only counts positions, so it barely moves. (a), (b) and (d) are the deck's stated properties.

### Q: A sample of daily temperatures has mean 20 °C and variance 9. Every value is converted to Fahrenheit by $$y = \frac{9}{5}x + 32$$. Give the mean, variance and standard deviation in Fahrenheit, then state the general rule for $$y = a + bx$$ and say which constant affects which.
**Topic:** 1b Variance and standard deviation (n − 1 formula · units · not resistant · effect of y = a + bx)  **Lec:** 4  **Type:** derive
**A:** Key:
1. Use $$y = a + bx$$ with $$a = 32$$, $$b = 1.8$$: $$\bar{y} = 1.8(20) + 32$$, $$s_y^2 = 1.8^2(9)$$, $$s_y = 1.8(3)$$.
2. The mean is 68 °F.
3. The variance is 29.16 and the standard deviation is 5.4 °F.
4. The general rule is $$\bar{y} = a + b\,\bar{x}$$, $$s_y^2 = b^2 s_x^2$$ and $$s_y = |b|\,s_x$$.
5. The constant $$a$$ shifts the mean only, while $$b$$ scales the mean and scales the spread by $$|b|$$.

Mean $$1.8 \times 20 + 32 = 68$$ °F. Variance $$1.8^2 \times 9 = 29.16$$. $$s = 1.8 \times 3 = 5.4$$ °F. The general rule:

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
**A:** Key:
1. (b) median and IQR.
2. The median and the IQR are set by positions in the sorted data, so the tail cannot drag them.
3. The mean and $$s$$ use every value's distance from the mean and are inflated by the tail.
4. If one billionaire's income doubles, $$s$$ rises sharply.
5. The median and the IQR do not change at all.

(b). The median and the IQR are set by positions in the sorted data, so the tail cannot drag them; the mean and $$s$$ use every value's distance from the mean and are inflated by the tail. The range is worse still, built from the two extremes. If one billionaire's income doubles, $$s$$ rises sharply because of the larger squared deviation, while the median and the IQR do not change at all.

### Q: Sorted data from the deck ($$n = 20$$): 12 14 17 22 22 24 25 26 27 29 30 31 33 34 35 35 39 40 42 59. Using the deck's $$np + 0.5$$ rule, compute $$Q_1$$, the median and $$Q_3$$, then the IQR. Show the value of $$np + 0.5$$ each time.
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 4  **Type:** derive
**A:** Key:
1. For $$Q_1$$, $$np + 0.5 = 20 \times 0.25 + 0.5 = 5.5$$, so $$Q_1 = \frac{x_{(5)} + x_{(6)}}{2}$$.
2. $$Q_1 = \frac{22 + 24}{2} = 23$$.
3. The median's position is 10.5, so it is $$\frac{29 + 30}{2} = 29.5$$.
4. The position for $$Q_3$$ is 15.5, so $$Q_3 = \frac{35 + 35}{2} = 35$$.
5. $$\text{IQR} = 35 - 23 = 12$$.

For $$p = 0.25$$, $$np + 0.5 = 20 \times 0.25 + 0.5 = 5.5$$, not an integer, so average the 5th and 6th values. For $$p = 0.5$$ it is 10.5, and for $$p = 0.75$$ it is 15.5.

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
**A:** Key:
1. $$Q(0.3)$$: $$15 \times 0.3 + 0.5 = 5$$, an integer, so $$Q(0.3) = x_{(5)} = 10$$.
2. $$Q(0.35)$$: the position is 5.75, so $$Q(0.35) = \frac{x_{(5)} + x_{(6)}}{2} = \frac{10 + 12}{2} = 11$$.
3. $$Q(0.9)$$: the position is 14, so $$Q(0.9) = x_{(14)} = 30$$.
4. $$Q(0.3) = 10$$ means about 30% of the observations are smaller than 10.
5. Check: four of fifteen values (3, 5, 7, 8) are below 10, which is 27%.

$$Q(0.3)$$: $$15 \times 0.3 + 0.5 = 5$$, an integer, so $$Q(0.3) = x_{(5)} = 10$$. $$Q(0.35)$$: $$5.25 + 0.5 = 5.75$$, between 5 and 6, so $$Q(0.35) = \frac{x_{(5)} + x_{(6)}}{2} = \frac{10 + 12}{2} = 11$$, the plain average, not a weighted value like 11.5. $$Q(0.9)$$: $$13.5 + 0.5 = 14$$, so $$Q(0.9) = x_{(14)} = 30$$. $$Q(0.3) = 10$$ means about 30% of the observations are smaller than 10: four of fifteen are (3, 5, 7, 8), which is 27%, close to 30%.

### Q: Sorted data: 4, 7, 9, 12, 15, 18, 22, 30, 41. Using the course's $$np + 0.5$$ rule:
- Find the position and value of the 40th percentile.
- Find $$Q_1$$ and $$Q_3$$, then the IQR.
- Say what you do when $$np + 0.5$$ lands on a whole number versus a half.
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 4  **Type:** derive
**A:** Key:
1. The 40th percentile's position is $$9 \times 0.40 + 0.5 = 4.1$$, between the 4th and 5th values.
2. The 40th percentile is $$\frac{12 + 15}{2} = 13.5$$.
3. $$Q_1$$ has position 2.75, so $$Q_1 = \frac{7 + 9}{2} = 8$$.
4. $$Q_3$$ has position 7.25, so $$Q_3 = \frac{22 + 30}{2} = 26$$ and $$\text{IQR} = 18$$.
5. A whole-number position takes that ordered value; any other position averages the two ordered values on either side.

$$n = 9$$. 40th percentile: $$9 \times 0.40 + 0.5 = 4.1$$, between the 4th and 5th values, so $$\frac{12 + 15}{2} = 13.5$$ by the course's averaging rule for any non-integer position. $$Q_1$$: $$9 \times 0.25 + 0.5 = 2.75$$, so $$\frac{7 + 9}{2} = 8$$. $$Q_3$$: $$9 \times 0.75 + 0.5 = 7.25$$, so $$\frac{22 + 30}{2} = 26$$. $$\text{IQR} = 26 - 8 = 18$$. A whole-number position means take that ordered value; anything else means average the two ordered values on either side.

### Q: For the same $$n = 15$$ data, compute $$Q_1$$ two ways: with the $$np + 0.5$$ rule, and as the median of the lower half of the data (the seven values below the median). Do they agree? What does the deck say about this, and which rule do you use on a computation question?
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 4  **Type:** apply
**A:** Key:
1. By the rule the position is $$15 \times 0.25 + 0.5 = 4.25$$, so $$Q_1 = \frac{x_{(4)} + x_{(5)}}{2}$$.
2. By the rule, $$Q_1 = \frac{8 + 10}{2} = 9$$.
3. The lower half 3, 5, 7, 8, 10, 12, 14 has median 8, so the two methods disagree.
4. Different textbooks and software use slightly different quartile rules, so sources can differ.
5. Use the $$np + 0.5$$ rule unless the question fixes another rule.

$$np + 0.5$$ rule: $$15 \times 0.25 + 0.5 = 4.25$$, so $$Q_1 = \frac{x_{(4)} + x_{(5)}}{2} = \frac{8 + 10}{2} = 9$$. The lower half 3, 5, 7, 8, 10, 12, 14 has median 8. They disagree. The deck says different textbooks and software use slightly different quartile rules, so sources can differ. The $$np + 0.5$$ rule is the procedure the deck states, so use it unless the question fixes another rule. For the deck's own 20-value example the two rules happen to agree.

### Q: The 75th percentile of a data set is (a) the value three quarters of the way from the minimum to the maximum (b) a value with 75% of the observations at or below it (c) the mean of the top quarter of the data (d) the same thing as $$Q_1$$. Pick one, show with the data 1, 2, 3, 4, 5, 6, 7, 100 why (a) is wrong, and name the three quartiles as percentiles.
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 4  **Type:** apply
**A:** Key:
1. (b), a value with 75% of the observations at or below it.
2. Percentiles count observations, not distance along the range, and three quarters of the way from 1 to 100 is about 75.
3. By the rule the position is $$8 \times 0.75 + 0.5 = 6.5$$, so the 75th percentile is $$\frac{6 + 7}{2} = 6.5$$.
4. $$Q_1$$ is the 25th percentile, $$Q_2$$ (the median) the 50th and $$Q_3$$ the 75th.

(b). Percentiles count observations, not distance along the range. For 1, 2, 3, 4, 5, 6, 7, 100 the point three quarters of the way from 1 to 100 is about 75, but by the $$np + 0.5$$ rule the position is $$8 \times 0.75 + 0.5 = 6.5$$, so the 75th percentile is $$\frac{x_{(6)} + x_{(7)}}{2} = \frac{6 + 7}{2} = 6.5$$. $$Q_1$$ is the 25th percentile, $$Q_2$$ (the median) is the 50th and $$Q_3$$ is the 75th.

### Q: Twenty marks have $$Q_1 = 23$$ and $$Q_3 = 35$$. Compute the fences for the $$1.5 \times \text{IQR}$$ rule, state the rule in words, and say which of the marks 4, 5, 52, 53, 59 are outliers.
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 4  **Type:** apply
**A:** Key:
1. $$\text{IQR} = 35 - 23 = 12$$ and $$1.5 \times \text{IQR} = 18$$, so the fences are $$23 - 18$$ and $$35 + 18$$.
2. The lower fence is 5 and the upper fence is 53.
3. An outlier lies more than $$1.5 \times \text{IQR}$$ below $$Q_1$$ or more than $$1.5 \times \text{IQR}$$ above $$Q_3$$.
4. 4 and 59 are outliers.
5. 5, 52 and 53 are not outliers, since 5 and 53 sit exactly on the fences rather than beyond them.

$$\text{IQR} = 12$$ and $$1.5 \times \text{IQR} = 18$$, so the fences are:

$$
\begin{aligned}
\text{lower fence} &= 23 - 18 = 5 \\
\text{upper fence} &= 35 + 18 = 53
\end{aligned}
$$

An observation is an outlier if it falls more than $$1.5 \times \text{IQR}$$ below $$Q_1$$ or more than $$1.5 \times \text{IQR}$$ above $$Q_3$$. 4 is an outlier (more than 18 below $$Q_1$$); 5 is not (exactly 18 below, not more); 52 and 53 are not; 59 is (more than 18 above $$Q_3$$).

### Q: Build the box plot for the deck's 20 values (12 14 17 22 22 24 25 26 27 29 30 31 33 34 35 35 39 40 42 59). Give the five-number summary, the fences, where each whisker ends, and any point plotted separately. Then say what the plot shows about shape.
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** 4  **Type:** derive
**A:** Key:
1. The five-number summary is min 12, $$Q_1 = 23$$, median 29.5, $$Q_3 = 35$$ and max 59.
2. $$\text{IQR} = 12$$, so the fences are $$23 - 18 = 5$$ and $$35 + 18 = 53$$.
3. 59 is above 53, so it is plotted separately beyond the whisker as an outlier.
4. The left whisker ends at 12 and the right whisker at 42, the most extreme values inside the fences.
5. The median sits almost centrally in the box, so the middle is roughly symmetric, with the single high outlier the only sign of a right tail.

Five-number summary: min 12, $$Q_1$$ 23, median 29.5, $$Q_3$$ 35, max 59. IQR 12, fences 5 and 53. 59 is above 53, so it is drawn as a star beyond the whisker. The left whisker ends at 12, the smallest value inside the fences; the right whisker ends at 42, the largest value at or under 53. The box runs from 23 to 35 with a line at 29.5. The median sits almost centrally in the box and the left whisker (11 long) is a little longer than the right (7 long), so the middle of the data is roughly symmetric; the single high outlier is the only sign of a right tail.

### Q: "The whiskers of a box plot always run to the minimum and the maximum of the data, and the median line always sits in the middle of the box." Correct both halves. Then: a box plot's right whisker ends at 42 but the data's maximum is 59. What must be true?
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** 4  **Type:** critique
**A:** Key:
1. Whiskers end at the most extreme observations still inside the fences $$Q_1 - 1.5 \times \text{IQR}$$ and $$Q_3 + 1.5 \times \text{IQR}$$.
2. Whiskers reach the minimum and maximum only when there are no outliers.
3. The median line sits wherever the median falls, so it is central only when the middle half of the data is symmetric.
4. 59 lies above the upper fence and is an outlier plotted on its own.
5. 42 is the largest observation inside the upper fence.

Whiskers end at the most extreme observations still inside the fences $$Q_1 - 1.5 \times \text{IQR}$$ and $$Q_3 + 1.5 \times \text{IQR}$$; they reach the minimum and maximum only when there are no outliers, and they never extend to the fences themselves. The median line sits wherever the median falls between $$Q_1$$ and $$Q_3$$, so it is central only when the middle half of the data is symmetric. If the whisker stops at 42 while the maximum is 59, then 59 lies above the upper fence and is an outlier plotted on its own, and 42 is the largest observation inside the fence.

### Q: A box plot has its median line close to $$Q_1$$, the left edge of the box, and a right whisker much longer than the left one. The distribution is most likely (a) symmetric (b) left-skewed (c) right-skewed (d) bimodal. Pick one, say what in the plot tells you, and explain why (d) can never be read off a box plot.
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** 4  **Type:** apply
**A:** Key:
1. (c) right-skewed.
2. The median near $$Q_1$$ means the lower half of the data is crammed into a short interval below the median.
3. The upper half stretches far to the right, so the long tail is on the high side.
4. A box plot cannot show bimodality because it collapses the data to five numbers and hides the shape between them.

(c). The lower half of the data is crammed into a short interval below the median while the upper half stretches far to the right, so the long tail is on the high side: right-skewed. Outliers do not move the median line; the crowding of the middle half does. A box plot cannot show bimodality because it collapses the data to five numbers and hides the shape between them; that is what a histogram is for.

### Q: The deck shows side-by-side box plots of chemistry and physics grades. Name three things you can compare directly from them, one thing you cannot see, and the situation where a histogram is the better choice.
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** 4  **Type:** apply
**A:** Key:
1. You can compare the centres, from the median lines.
2. You can compare the spreads, from the box length (the IQR) and the whisker span.
3. You can compare the skew and the outliers of each group, all on one scale.
4. You cannot see the shape between the five numbers: modality, gaps, or how many observations each group has.
5. Use a histogram when the shape of one distribution is the point, especially to check for two humps.

You can compare the centres (median lines), the spreads (box length, which is the IQR, and whisker span), and the skew and outliers of each group, all on one scale. You cannot see the shape between the five numbers: modality, gaps, or how many observations each group has. Use a histogram when the shape of one distribution is the point, especially to check for two humps.

### Q: Every score in a class gets 5 bonus points. Say what happens to the mean, the median, $$Q_1$$, $$Q_3$$, the IQR, the range and the standard deviation. Then answer again for multiplying every score by 1.1 instead.
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 4  **Type:** apply
**A:** Key:
1. Adding 5 moves the mean, the median, $$Q_1$$ and $$Q_3$$ up by 5.
2. Adding 5 leaves the IQR, the range and the standard deviation unchanged, because the distances between values do not change.
3. Multiplying by 1.1 multiplies every measure of position by 1.1.
4. Multiplying by 1.1 also multiplies the IQR, the range and the standard deviation by 1.1, since every distance grows by 10%.

- Adding 5 moves every value up by 5, so every measure of position moves up by 5: the mean, the median, $$Q_1$$ and $$Q_3$$.
- The measures of spread stay the same, because the distances between values do not change: the IQR, the range and the standard deviation. This was the lecture 4 iClicker, with answer (e).
- Multiplying by 1.1 multiplies every measure of position by 1.1, and every measure of spread by 1.1 too, since every distance grows by 10%. The variance is multiplied by $$1.1^2 = 1.21$$.

### Q: Two smooth density curves on the same axes have the same centre, and one is much narrower than the other. Which one must have the higher peak, and why? Which has the larger standard deviation?
**Topic:** 1b Variance and standard deviation (n − 1 formula · units · not resistant · effect of y = a + bx)  **Lec:** 4  **Type:** apply
**A:** Key:
1. The narrower curve must have the higher peak.
2. The area under each curve is the total probability, 1, so a curve squeezed into a narrower range must rise higher.
3. The wider curve has the larger standard deviation, because its values spread farther from the centre.

- The narrower curve must have the higher peak. The area under each curve is the total probability, 1, so a curve squeezed into a narrower range has to rise higher to keep the same area.
- The wider curve has the larger standard deviation, because its values spread farther from the centre.
- Drawing the narrow curve with the lower peak on the same scale is wrong. He made this point in lecture 4, ahead of Chapter 4.

### Q: From a box plot alone, which of these can you read: the median, the mean, the IQR, the range, and whether there are outliers? Say why for any you cannot.
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** 4  **Type:** recall
**A:** Key:
1. Everything but the mean can be read: the median, the IQR, the range and the outliers.
2. The mean cannot be read, because a box plot is built from the five-number summary and the fences, none of which uses it.
3. The median is the line inside the box, and the IQR is the length of the box, from $$Q_1$$ to $$Q_3$$.
4. The range runs from the lowest point drawn to the highest, counting outliers plotted beyond the whiskers.

- The median is the line inside the box.
- The IQR is the length of the box, from $$Q_1$$ to $$Q_3$$.
- The range is the distance from the lowest point drawn to the highest, counting any outliers plotted beyond the whiskers.
- Outliers are the stars or circles beyond the whiskers.
- The mean cannot be read. A box plot is built from the five-number summary and the fences, and none of them uses the mean.

## WeBWorK 1 — Ch 1 (opened Sep 14, due Tue Sep 22; banked 2026-09-16, numbers changed)

### Q: WeBWorK-style. A histogram of exam scores has bins 40–50: 1, 50–60: 2, 60–70: 4, 70–80: 9, 80–90: 17, 90–100: 12. Is the data skewed right, symmetric or skewed left, and is the mean bigger than the median, smaller, or about equal? Answer in the WeBWorK form (SKEWED LEFT, MEDIAN, and so on) and justify from the tail.
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** WW1  **Type:** apply
**A:** Key:
1. SKEWED LEFT.
2. The peak is at 80–90 and the counts fade slowly toward the low scores (4, 2, 1), so the long tail points left.
3. MEDIAN is the bigger one, because a left tail drags the mean below the median.

SKEWED LEFT and MEDIAN. The peak sits at 80–90 and the counts fade slowly toward the low scores (4, 2, 1), so the long tail points left. A left tail drags the mean below the median, so the median is the bigger one. WeBWorK 1's version showed the mirror image: a right-skewed histogram with the mean bigger.

### Q: WeBWorK-style. 120 students report how much cash they are carrying. Bins in dollars: 0–10: 48, 10–20: 37, 20–30: 22, 30–40: 6, 40–50: 2, 50–60: 0, 60–70: 1, 70–80: 2, 80–90: 1, 90–100: 1. (a) How many students carry under $10? (b) Is the histogram symmetric, skewed right, skewed left, or none of these? (c) Is the share carrying over $30 above 30%, between 20% and 30%, about 10%, or less than 3%?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** WW1  **Type:** apply
**A:** Key:
1. (a) 48 students, the first bar.
2. (b) Skewed right: the tallest bars are at the low end and a thin tail of bars runs out to 100 dollars.
3. (c) Over 30 dollars is every bar from 30–40 up: $$\frac{6 + 2 + 0 + 1 + 2 + 1 + 1}{120} = \frac{13}{120}$$.
4. That is $$10.8\%$$, so about 10%.

(a) 48, the first bar. (b) Skewed right: the tallest bars are at the low end and a thin tail of bars runs out to $100. (c) About 10%: over $30 means every bar from 30–40 up, $$6 + 2 + 0 + 1 + 2 + 1 + 1 = 13$$ students, and $$\frac{13}{120} = 10.8\%$$. Read the bar heights, add the ones in the range, then divide by the class size; do not eyeball the width of the tail.

### Q: WeBWorK-style. Forty rivets have mean length 7.240 and standard deviation 0.312, both in hundredths of an inch. Head office wants millimetres, and one inch is 2.54 cm. Give the mean and the standard deviation in mm to three significant figures, and name the rule you used.
**Topic:** 1b Variance and standard deviation (n − 1 formula · units · not resistant · effect of y = a + bx)  **Lec:** WW1  **Type:** derive
**A:** Key:
1. Multiply by $$b = 0.254$$ mm per hundredth of an inch with $$a = 0$$: mean $$7.240 \times 0.254$$, SD $$0.312 \times 0.254$$.
2. The mean is 1.84 mm.
3. The standard deviation is 0.0792 mm.
4. The rule: for $$y = a + bx$$, $$\bar{y} = a + b\,\bar{x}$$ and $$s_y = |b|\,s_x$$.

One hundredth of an inch is $$\frac{25.4}{100} = 0.254$$ mm, so every value is multiplied by $$b = 0.254$$ with no shift ($$a = 0$$). Mean $$7.240 \times 0.254 = 1.84$$ mm. Standard deviation $$0.312 \times 0.254 = 0.0792$$ mm. Rule: for $$y = a + bx$$, $$\bar{y} = a + b\,\bar{x}$$ and $$s_y = |b|\,s_x$$, with the variance scaling by $$b^2$$. A shift alone would leave $$s$$ unchanged.

### Q: WeBWorK-style. A boxplot of the lifetimes in months of 30 light bulbs has its lower whisker ending at 2.1, a box from 10.2 to 43.7 with the heavy line at 25.0, and its upper whisker ending at 89.6, with no separate points. Which of 10.2, 25.0, 30.3, 43.7, 89.6 is the median? Give the IQR, say whether 89.6 is an outlier, and say what the 30.3 could be.
**Topic:** 1b–c Box plots (five-number summary · whiskers end inside the fences · median line shows skew · side-by-side comparisons)  **Lec:** WW1  **Type:** apply
**A:** Key:
1. The median is the heavy line inside the box, 25.0.
2. $$\text{IQR} = 43.7 - 10.2 = 33.5$$.
3. The upper fence is $$43.7 + 1.5 \times 33.5 = 93.95$$, so 89.6 is inside it and is not an outlier.
4. 30.3 could be the mean, which a boxplot never shows; it sits above the 25.0 median because the upper half is stretched out.

The median is the heavy line inside the box, 25.0. The box edges are $$Q_1 = 10.2$$ and $$Q_3 = 43.7$$, and the whisker ends are the minimum and the maximum. $$\text{IQR} = 43.7 - 10.2 = 33.5$$. The upper fence is $$43.7 + 1.5 \times 33.5 = 93.95$$, so 89.6 is inside it and is not an outlier, which is why the whisker reaches it. 30.3 appears nowhere on the plot. It could be the mean, which a boxplot never shows: here the mean sits above the median because the upper half is stretched out, and 30.3 is above 25.0.

### Q: WeBWorK-style, three quick MC. (a) If a distribution is skewed to the left, is the mean less than, greater than, or equal to the median? (b) What percent of the observations lie at or below the third quartile? (c) Which is most affected when an extreme high outlier is added: the standard deviation, the median, or the IQR?
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** WW1  **Type:** apply
**A:** Key:
1. (a) The mean is less than the median, because the left tail pulls the mean down.
2. (b) 75%, since $$Q_3$$ is the 75th percentile.
3. (c) The standard deviation, because it squares the outlier's distance from the mean.
4. The median and the IQR depend only on positions in the sorted data and barely move.

(a) Less than: the left tail pulls the mean down. (b) 75%, since Q3 is the 75th percentile; the box between Q1 and Q3 holds the middle 50%. (c) The standard deviation, because it squares the outlier's distance from the mean; the median and the IQR depend only on positions in the sorted data and barely move. WeBWorK 1 asked the mirror versions: right skew, the 50% between Q1 and Q3, and the least affected measure.

### Q: WeBWorK-style. A survey asks Vancouver renters from different neighbourhoods and building types what they pay in monthly rent. What is the variable of interest: (A) the renters, (B) the neighbourhood, (C) the building type, (D) the monthly rent paid by a renter? Say what the other three are, and classify the variable.
**Topic:** 1a Types of data (categorical nominal/ordinal · numerical discrete/continuous)  **Lec:** WW1  **Type:** apply
**A:** Key:
1. (D), the monthly rent paid by a renter.
2. The renters are the individuals, the units the data are collected on.
3. Neighbourhood and building type are other variables describing them, both categorical.
4. Monthly rent is numerical and continuous.

(D). The variable of interest is the quantity the survey measures on each individual. The renters are the individuals, the units the data are collected on; neighbourhood and building type are other variables describing them, both categorical. Monthly rent is numerical and continuous, a dollar amount that can take any value in a range.

### Q: WeBWorK-style. Four people's weekly incomes are $1450, $2100, $1700 and $212000. Compute the mean and the median, then say which better represents these people's income and why.
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** WW1  **Type:** derive
**A:** Key:
1. The mean is the sum over 4: $$\frac{1450 + 2100 + 1700 + 212000}{4}$$.
2. The mean is $$\frac{217250}{4} = \$54{,}312.50$$.
3. With even $$n = 4$$ the median averages the 2nd and 3rd sorted values: $$\frac{1700 + 2100}{2} = \$1{,}900$$.
4. The median better represents these people's income.
5. Three of the four earn near $$\$1{,}900$$, while the one outlier drags the mean to a figure nobody earns.

The mean:

$$
\begin{aligned}
\text{mean} &= \frac{1450 + 2100 + 1700 + 212000}{4} \\
&= \frac{217250}{4} = \$54{,}312.50
\end{aligned}
$$

Sorted: 1450, 1700, 2100, 212000; $$n = 4$$ is even, so the median is the average of the 2nd and 3rd values, $$\frac{1700 + 2100}{2} = \$1{,}900$$. The median: three of the four people earn near $1,900, while the one outlier drags the mean to a figure nobody earns.

### Q: WeBWorK-style. A stemplot of nine physics point totals out of 200 reads 12 | 3 7, 13 | 0 4 9, 14 | 2 5, 15 | (empty), 16 | 1, 17 | 8. (a) Write out the data set. (b) This stemplot is most like which display: a time plot, a histogram with classes 120–130, 130–140 and so on, a boxplot, or the five-number summary? (c) Give the lowest score as a percentage of the total possible.
**Topic:** 1b–c Displays: freq table, pie, bar, dot plot, stem-and-leaf  **Lec:** WW1  **Type:** apply
**A:** Key:
1. (a) The data are 123, 127, 130, 134, 139, 142, 145, 161, 178.
2. (b) A histogram with classes 120–130, 130–140 and so on.
3. Each stem is a class and its row length is the bar, and the empty stem 15 is an empty bin.
4. (c) $$\frac{123}{200} = 61.5\%$$.

(a) 123, 127, 130, 134, 139, 142, 145, 161, 178: the stem is the hundreds and tens digits, the leaf the ones digit. (b) A histogram with classes 120–130, 130–140 and so on: each stem is a class and the row length is its bar, only with the actual values kept, and the empty stem 15 is an empty bin. (c) $$\frac{123}{200} = 61.5\%$$.

## Lec 5 — Ch 3: sets and probability, the addition rule (logged 2026-09-19 from the posted deck)

### Q: A fair coin is flipped three times. Write the sample space, list the outcomes of $$A$$ = "at least two tails" and $$B$$ = "exactly two heads", say whether $$A$$ and $$B$$ are disjoint, and find $$P(A \cup B)$$.
**Topic:** 2b Sample space and events (random experiment · S as a set · event as a subset · discrete, continuous and bivariate S · equally likely counting)  **Lec:** 5  **Type:** apply
**A:** Key:
1. $$S$$ is eight equally likely outcomes: HHH, HHT, HTH, HTT, THH, THT, TTH, TTT.
2. $$A$$ is {TTT, TTH, THT, HTT} and $$B$$ is {HHT, HTH, THH}.
3. $$A$$ and $$B$$ are disjoint, because exactly two heads means exactly one tail.
4. Because they are disjoint, $$P(A \cup B) = \frac{4}{8} + \frac{3}{8} = \frac{7}{8}$$.

$$S$$ = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}, eight equally likely outcomes. $$A$$ = {TTT, TTH, THT, HTT} and $$B$$ = {HHT, HTH, THH}. An outcome with exactly two heads has exactly one tail, so nothing is in both and $$A$$ and $$B$$ are disjoint. Then:

$$
P(A \cup B) = P(A) + P(B) = \frac{4}{8} + \frac{3}{8} = \frac{7}{8}
$$

The only outcome left out is HHH, which checks: $$1 - \frac{1}{8}$$.

### Q: Write the sample space for (i) the number of auto accidents in BC next year and (ii) the lifetimes in hours of two components, $$(X_1, X_2)$$. For each, say whether $$S$$ is discrete or continuous, finite or infinite, and univariate or bivariate. Then write the events "more than 100 accidents" and, for a system that runs only while both components run, "the system fails within 10 hours".
**Topic:** 2b Sample space and events (random experiment · S as a set · event as a subset · discrete, continuous and bivariate S · equally likely counting)  **Lec:** 5  **Type:** apply
**A:** Key:
1. (i) $$S = \{0, 1, 2, 3, \dots\}$$, which is discrete, infinite and univariate.
2. More than 100 accidents is $$\{101, 102, 103, \dots\}$$.
3. (ii) $$S = \{(x_1, x_2) : x_1 \ge 0,\ x_2 \ge 0\}$$, which is continuous, infinite and bivariate.
4. The system fails within 10 hours as soon as either component does: $$\{(x_1, x_2) : 0 \le x_1 < 10 \text{ or } 0 \le x_2 < 10\}$$.

(i) $$S = \{0, 1, 2, 3, \dots\}$$: discrete, infinite, univariate. More than 100 accidents is $$\{101, 102, 103, \dots\}$$. (ii) $$S = \{(x_1, x_2) : x_1 \ge 0,\ x_2 \ge 0\}$$: continuous, infinite, bivariate. The system fails within 10 hours as soon as either component does, so the event and its complement (the system still running at 10 hours) are:

$$
\begin{aligned}
\text{fails} &= \{(x_1, x_2) : 0 \le x_1 < 10 \text{ or } 0 \le x_2 < 10\} \\
\text{runs} &= \{x_1 \ge 10 \text{ and } x_2 \ge 10\}
\end{aligned}
$$

The "or" in the event becomes "and" in the complement.

### Q: Two fair dice are rolled. Describe the sample space and its size, then find $$P(\text{the sum is } 7)$$ and $$P(\text{the sum is at least } 10)$$.
**Topic:** 2b Sample space and events (random experiment · S as a set · event as a subset · discrete, continuous and bivariate S · equally likely counting)  **Lec:** 5  **Type:** apply
**A:** Key:
1. $$S$$ is the 36 equally likely ordered pairs (first die, second die).
2. Sum 7 has six outcomes, (1,6) through (6,1), so $$P = \frac{6}{36} = \frac{1}{6}$$.
3. Sum at least 10 has $$3 + 2 + 1 = 6$$ outcomes, so $$P = \frac{6}{36} = \frac{1}{6}$$.

$$S$$ is the 36 ordered pairs (first die, second die), all equally likely. Sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1), six outcomes, so $$P = \frac{6}{36} = \frac{1}{6}$$. Sum at least 10: three outcomes give 10, two give 11, one gives 12, six in all, so $$P = \frac{6}{36} = \frac{1}{6}$$. Order matters: (3,4) and (4,3) are different outcomes, which is what makes the 36 outcomes equally likely.

### Q: A jar holds three red marbles and two blue ones. Two marbles are drawn without replacement. Set up a sample space of equally likely outcomes and use it to find $$P(\text{both red})$$ and $$P(\text{one of each colour})$$.
**Topic:** 2b Sample space and events (random experiment · S as a set · event as a subset · discrete, continuous and bivariate S · equally likely counting)  **Lec:** 5  **Type:** apply
**A:** Key:
1. Label the marbles R1, R2, R3, B1, B2 and record the draws in order: $$5 \times 4 = 20$$ equally likely ordered pairs.
2. $$P(\text{both red}) = \frac{3 \times 2}{20} = 0.3$$.
3. $$P(\text{one of each}) = \frac{3 \times 2 + 2 \times 3}{20} = 0.6$$.

Label the marbles R1, R2, R3, B1, B2 and record the draws in order: $$5 \times 4 = 20$$ ordered pairs, all equally likely.

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
**A:** Key:
1. $$A \cap B^c$$ is the part of $$A$$ outside the overlap, with probability $$P(A) - P(A \cap B)$$.
2. $$A^c \cap B$$ is the part of $$B$$ outside the overlap, with probability $$P(B) - P(A \cap B)$$.
3. $$(A \cup B)^c$$ is the rectangle outside both circles, with probability $$1 - P(A) - P(B) + P(A \cap B)$$.
4. $$A^c \cup B^c$$ is everything except the overlap, with probability $$1 - P(A \cap B)$$.

$$A \cap B^c$$ is the part of $$A$$ outside the overlap. $$A^c \cap B$$ is the part of $$B$$ outside the overlap. $$(A \cup B)^c$$ is the rectangle outside both circles. $$A^c \cup B^c$$ is everything except the overlap, because an outcome fails to be in both exactly when it is outside at least one of them.

$$
\begin{aligned}
P(A \cap B^c) &= P(A) - P(A \cap B) \\
P(A^c \cap B) &= P(B) - P(A \cap B) \\
P\big((A \cup B)^c\big) &= 1 - P(A) - P(B) + P(A \cap B) \\
P(A^c \cup B^c) &= 1 - P(A \cap B)
\end{aligned}
$$

That last step is De Morgan's law, $$(A \cap B)^c = A^c \cup B^c$$.

### Q: Translate each phrase into set notation for events $$A$$ and $$B$$, then say which two of the five are the same event by De Morgan.
- "A happens but B does not"
- "neither happens"
- "at least one happens"
- "not both happen"
- "both fail to happen"
**Topic:** 2g Events as sets and Venn diagrams (complement · intersection · union · disjoint events have no overlap · subsets · De Morgan)  **Lec:** 5  **Type:** apply
**A:** Key:
1. "A but not B" is $$A \cap B^c$$.
2. "Neither" and "both fail" are $$A^c \cap B^c$$, which by De Morgan equals $$(A \cup B)^c$$.
3. "At least one" is $$A \cup B$$.
4. "Not both" is $$(A \cap B)^c$$, which equals $$A^c \cup B^c$$.
5. The two that are the same event are "neither" and "both fail to happen".

"A but not B" is $$A \cap B^c$$, also written $$A \setminus B$$. "Neither" is $$A^c \cap B^c$$. "At least one" is $$A \cup B$$. "Not both" is $$(A \cap B)^c$$, which equals $$A^c \cup B^c$$. "Both fail" is $$A^c \cap B^c$$, the same event as "neither", and by De Morgan it equals $$(A \cup B)^c$$. The two that match are "neither" and "both fail to happen".

### Q: $$P(A) = 0.3$$, $$P(B) = 0.5$$ and $$P(A \cap B) = 0.1$$. Which of these are true? (i) $$A$$ and $$B$$ are disjoint. (ii) $$P(A \cup B) = 0.7$$. (iii) $$P(A^c \cap B) = 0.4$$. (iv) $$P(A^c) = 0.7$$. (v) $$B \subset A$$.
**Topic:** 2g Events as sets and Venn diagrams (complement · intersection · union · disjoint events have no overlap · subsets · De Morgan)  **Lec:** 5  **Type:** critique
**A:** Key:
1. (ii), (iii) and (iv) are true; (i) and (v) are false.
2. (i) fails because disjoint events have $$P(A \cap B) = 0$$, and here it is 0.1.
3. (ii) is the addition rule, $$0.3 + 0.5 - 0.1 = 0.7$$.
4. (iii) is $$0.5 - 0.1 = 0.4$$ and (iv) is $$1 - 0.3 = 0.7$$.
5. (v) fails because $$B \subset A$$ would force $$P(B) \le P(A)$$, but $$0.5 > 0.3$$.

(i) False: disjoint events have $$P(A \cap B) = 0$$, and here it is 0.1. (ii) True: $$0.3 + 0.5 - 0.1 = 0.7$$. (iii) True: the part of $$B$$ outside $$A$$ is $$0.5 - 0.1 = 0.4$$. (iv) True: $$1 - 0.3$$. (v) False: if $$B \subset A$$ then $$P(A \cap B)$$ would equal $$P(B) = 0.5$$, and $$P(B) \le P(A)$$ would have to hold, but $$0.5 > 0.3$$.

### Q: Suppose $$A \subset B$$. Show that $$P(A \cap B) = P(A)$$ and that $$P(A) \le P(B)$$, and give a die-roll example.
**Topic:** 2g Events as sets and Venn diagrams (complement · intersection · union · disjoint events have no overlap · subsets · De Morgan)  **Lec:** 5  **Type:** derive
**A:** Key:
1. Every outcome of $$A$$ is in $$B$$, so $$A \cap B = A$$ and $$P(A \cap B) = P(A)$$.
2. Split $$B$$ into the disjoint pieces $$A$$ and $$B \cap A^c$$, so $$P(B) = P(A) + P(B \cap A^c)$$ by additivity.
3. The second term is at least 0, so $$P(B) \ge P(A)$$.
4. Example: $$A$$ is rolling a 6 and $$B$$ is rolling an even number, so $$\frac{1}{6} \le \frac{3}{6}$$.

Every outcome of $$A$$ is in $$B$$, so $$A \cap B$$ is $$A$$ itself and $$P(A \cap B) = P(A)$$. Split $$B$$ into the disjoint pieces $$A$$ and $$B \cap A^c$$. By additivity:

$$
P(B) = P(A) + P(B \cap A^c) \ge P(A)
$$

since the second term is at least 0. Example: $$A$$ = roll a 6, $$B$$ = roll an even number. $$A \subset B$$, $$P(A \cap B) = P(A) = \frac{1}{6}$$, and $$\frac{1}{6} \le \frac{3}{6}$$.

### Q: A student argues: "odd and even on a die are disjoint and they are complements, so any two disjoint events are complements of each other." Fix the claim, and say where independence fits.
**Topic:** 2g Events as sets and Venn diagrams (complement · intersection · union · disjoint events have no overlap · subsets · De Morgan)  **Lec:** 5  **Type:** critique
**A:** Key:
1. Complementary means disjoint and together filling $$S$$, so disjoint events need not be complements.
2. Counterexample: $$A = \{1\}$$ and $$B = \{2\}$$ are disjoint, but $$P(A) + P(B) = \frac{1}{3}$$.
3. Independence is a separate idea, defined by $$P(A \cap B) = P(A)\,P(B)$$.
4. Disjoint events with positive probability are never independent, because one occurring rules the other out.

Disjoint means the events share no outcome, so $$P(A \cap B) = 0$$. Complementary means disjoint and together filling $$S$$, so $$P(A) + P(B) = 1$$. Odd and even satisfy both. $$A = \{1\}$$ and $$B = \{2\}$$ are disjoint, but $$P(A) + P(B) = \frac{1}{3}$$, so they are not complements. Independence is a third idea, defined next lecture through $$P(A \cap B) = P(A)\,P(B)$$. Disjoint events with positive probability are never independent, because one occurring rules the other out.

### Q: From a blank page, state the general addition rule for $$P(A \cup B)$$, explain from a Venn diagram why the last term is subtracted, and state the disjoint special case.
**Topic:** 2f Probability rules and the addition rule (outcome probabilities sum to 1 · complement rule · general addition rule · countable additivity · three-event rule)  **Lec:** 5  **Type:** derive
**A:** Key:
1. $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$.
2. Adding $$P(A)$$ and $$P(B)$$ counts the overlap twice, once in each circle, so its probability is subtracted once.
3. For disjoint events $$P(A \cap B) = 0$$, so $$P(A \cup B) = P(A) + P(B)$$.

The rule:

$$
P(A \cup B) = P(A) + P(B) - P(A \cap B)
$$

Adding $$P(A)$$ and $$P(B)$$ counts every outcome in the overlap twice, once in each circle, so the overlap's probability is subtracted once. If $$A$$ and $$B$$ are disjoint the overlap is empty, $$P(A \cap B) = 0$$, and $$P(A \cup B) = P(A) + P(B)$$.

### Q: In a survey, 78% of respondents follow soccer or basketball, 52% follow soccer and 40% follow basketball. Find the probability that a randomly chosen respondent (a) follows both, (b) follows neither, (c) follows soccer but not basketball.
**Topic:** 2f Probability rules and the addition rule (outcome probabilities sum to 1 · complement rule · general addition rule · countable additivity · three-event rule)  **Lec:** 5  **Type:** apply
**A:** Key:
1. (a) The addition rule: $$0.78 = 0.52 + 0.40 - P(\text{both})$$.
2. $$P(\text{both}) = 0.14$$.
3. (b) Neither is the complement of the union: $$1 - 0.78 = 0.22$$.
4. (c) Soccer but not basketball is soccer minus both: $$0.52 - 0.14 = 0.38$$.

(a) The addition rule gives $$P(\text{both})$$. (b) Neither is the complement of the union. (c) Soccer but not basketball is soccer minus both.

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
**A:** Key:
1. Outcome probabilities sum to 1: $$P(6) = 1 - (0.1 + 0.1 + 0.1 + 0.2 + 0.2)$$.
2. $$P(6) = 0.3$$.
3. An event's probability is the sum over its outcomes: $$P(\text{even}) = 0.1 + 0.2 + 0.3 = 0.6$$.
4. $$P(\text{at least } 5) = 0.2 + 0.3 = 0.5$$.
5. The complement rule gives $$P(\text{not a } 6) = 1 - 0.3 = 0.7$$.

Outcome probabilities sum to 1, so $$P(6) = 1 - 0.7 = 0.3$$. An event's probability is the sum over its outcomes: $$P(\text{even}) = 0.1 + 0.2 + 0.3 = 0.6$$ and $$P(\text{at least } 5) = 0.2 + 0.3 = 0.5$$. Complement rule: $$P(\text{not a } 6) = 1 - 0.3 = 0.7$$. Every value sits between 0 and 1, as the properties require.

### Q: Derive the three-event addition rule $$P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$$ from the two-event rule.
**Topic:** 2f Probability rules and the addition rule (outcome probabilities sum to 1 · complement rule · general addition rule · countable additivity · three-event rule)  **Lec:** 5  **Type:** derive
**A:** Key:
1. Write $$A \cup B \cup C$$ as $$(A \cup B) \cup C$$ and apply the two-event rule: $$P(A \cup B) + P(C) - P\big((A \cup B) \cap C\big)$$.
2. Expand $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$.
3. Distribute the intersection: $$(A \cup B) \cap C = (A \cap C) \cup (B \cap C)$$.
4. Those pieces overlap in $$A \cap B \cap C$$, so $$P\big((A \cup B) \cap C\big) = P(A \cap C) + P(B \cap C) - P(A \cap B \cap C)$$.

Write $$A \cup B \cup C$$ as $$(A \cup B) \cup C$$ and apply the two-event rule:

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
**A:** Key:
1. $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$.
2. $$P(B)$$ must be positive because dividing by zero is undefined, and $$P(B) = 0$$ leaves nothing to condition on.
3. On a Venn diagram it is the fraction of $$B$$'s region that lies inside $$A$$.
4. Multiplying through gives $$P(A \cap B) = P(A \mid B)\,P(B)$$.
5. Starting from $$P(B \mid A) = \frac{P(A \cap B)}{P(A)}$$ gives $$P(A \cap B) = P(B \mid A)\,P(A)$$.

The definition:

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
**A:** Key:
1. The multiplication rule: $$P(A \cap B) = P(B \mid A)\,P(A) = 0.4 \times 0.5$$.
2. $$P(A \cap B) = 0.20$$.
3. $$P(A \mid B) = \frac{0.20}{0.3} = \frac{2}{3}$$.
4. $$P(A \cup B) = 0.5 + 0.3 - 0.2 = 0.6$$.

Work in this order:

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
**A:** Key:
1. The denominator must be the given event, $$B$$; the student's formula computes $$P(B \mid A)$$.
2. $$P(A \mid B) = \frac{0.36}{0.4} = 0.9$$.
3. $$P(B \mid A) = \frac{0.36}{0.6} = 0.6$$.

The denominator must be the given event, which is $$B$$. $$P(A \mid B) = \frac{0.36}{0.4} = 0.9$$ and $$P(B \mid A) = \frac{0.36}{0.6} = 0.6$$. The student's formula computes $$P(B \mid A)$$ and labels it $$P(A \mid B)$$.

### Q: Two cards are drawn without replacement from a standard 52-card deck. Use the multiplication rule to find $$P(\text{both are aces})$$ and $$P(\text{the first is an ace and the second is a king})$$.
**Topic:** 2h Conditional probability and the multiplication rule (definition as a ratio · proportion of A inside B · the given event is the denominator · two forms of the multiplication rule)  **Lec:** 6  **Type:** apply
**A:** Key:
1. The multiplication rule: $$P(A_1 \cap A_2) = P(A_1)\,P(A_2 \mid A_1) = \frac{4}{52} \cdot \frac{3}{51}$$.
2. $$P(\text{both aces}) = \frac{1}{221} \approx 0.0045$$.
3. $$P(\text{ace, then king}) = \frac{4}{52} \cdot \frac{4}{51} = \frac{4}{663} \approx 0.0060$$.

Let $$A_1$$ = first card is an ace and $$A_2$$ = second card is an ace.

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
**A:** Key:
1. $$A$$ and $$B$$ are independent when $$P(A \mid B) = P(A)$$, $$P(B \mid A) = P(B)$$, or $$P(A \cap B) = P(A)\,P(B)$$.
2. With $$P(B) > 0$$, $$P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{P(A)\,P(B)}{P(B)} = P(A)$$.

The three conditions are $$P(A \mid B) = P(A)$$, $$P(B \mid A) = P(B)$$, and $$P(A \cap B) = P(A)\,P(B)$$. From the third, when $$P(B) > 0$$:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{P(A)\,P(B)}{P(B)} = P(A)
$$

Independence is checked with one of these equations and never read off a Venn diagram, which only shows whether events overlap.

### Q: "These two events are disjoint, so they are independent." Correct this with the one-line reason and a die example.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** 6  **Type:** critique
**A:** Key:
1. Disjoint events with positive probability are never independent.
2. Disjoint means $$P(A \cap B) = 0$$, so independence would need $$P(A)\,P(B) = 0$$, making one event impossible.
3. Die example: odd and even are disjoint, and $$P(\text{odd} \mid \text{even}) = 0$$ while $$P(\text{odd}) = \frac{1}{2}$$.

Disjoint means $$P(A \cap B) = 0$$. Independence would need $$P(A)\,P(B) = 0$$, so one of the events would have to be impossible. Disjoint events with positive probability are never independent: knowing $$A$$ happened tells you $$B$$ did not. Die: $$A$$ = odd and $$B$$ = even are disjoint, and $$P(A \mid B) = 0$$ while $$P(A) = \frac{1}{2}$$.

### Q: Flip a fair coin and roll a fair die. Let $$A$$ = head and $$B$$ = the die shows 1 or 2. List $$A \cap B$$ and use the product test to decide whether $$A$$ and $$B$$ are independent.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** 6  **Type:** apply
**A:** Key:
1. The product test: compare $$P(A \cap B) = \frac{2}{12}$$ with $$P(A)\,P(B) = \frac{1}{2} \cdot \frac{1}{3}$$.
2. $$A \cap B$$ is {(H,1), (H,2)}, 2 of the 12 equally likely outcomes.
3. Both equal $$\frac{1}{6}$$, so $$A$$ and $$B$$ are independent.

The 12 outcomes (coin, die) are equally likely. $$A$$ has 6 outcomes, $$B$$ = {(H,1), (H,2), (T,1), (T,2)} has 4, and $$A \cap B$$ = {(H,1), (H,2)} has 2.

$$
\begin{aligned}
P(A \cap B) &= \frac{2}{12} = \frac{1}{6} \\
P(A)\,P(B) &= \frac{1}{2} \cdot \frac{1}{3} = \frac{1}{6}
\end{aligned}
$$

They agree, so $$A$$ and $$B$$ are independent. The test needs an intersection to check; here it has one.

### Q: Twelve smoke detectors each work with probability 0.98, independently. Find $$P(\text{all work})$$ and $$P(\text{at least one fails})$$, and say why the complement is the only sensible route.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** 6  **Type:** apply
**A:** Key:
1. By independence, $$P(\text{all work}) = 0.98^{12}$$.
2. $$P(\text{all work}) \approx 0.785$$.
3. By the complement, $$P(\text{at least one fails}) = 1 - 0.785 = 0.215$$.
4. "At least one fails" splits into 1 to 12 failures in many arrangements, while "all work" is one intersection of independent events.

Define $$A_i$$ = detector $$i$$ works. By independence:

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
**A:** Key:
1. They assumed independence and multiplied, $$0.3 \times 0.6$$.
2. That is allowed only when the question states independence or the events are physically independent, like a coin and a die.
3. Otherwise you need more, such as $$P(A \mid B)$$, $$P(B \mid A)$$ or $$P(A \cup B)$$.
4. Without that, all you can say is $$0 \le P(A \cap B) \le 0.3$$.

They assumed independence and multiplied. That is allowed only when the question states independence or the events are physically independent, like a coin and a die. Otherwise $$P(A \cap B)$$ is not determined by $$P(A)$$ and $$P(B)$$ alone; you need $$P(A \mid B)$$, $$P(B \mid A)$$ or $$P(A \cup B)$$. Without that, all you can say is $$0 \le P(A \cap B) \le 0.3$$.

### Q: If $$A$$ and $$B$$ are independent, prove that $$A^c$$ and $$B$$ are independent, then name the other two pairs the deck lists.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** 6  **Type:** derive
**A:** Key:
1. The product test: $$P(A^c \cap B) = P(B) - P(A \cap B) = P(B) - P(A)\,P(B)$$.
2. That factors as $$\big(1 - P(A)\big)P(B) = P(A^c)\,P(B)$$, so $$A^c$$ and $$B$$ are independent.
3. The other two pairs are $$A$$ and $$B^c$$, and $$A^c$$ and $$B^c$$.

The product test for $$A^c$$ and $$B$$:

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
**A:** Key:
1. The addition rule gives the intersection: $$P(D \cap E) = 0.4 + 0.5 - 0.7 = 0.2$$.
2. $$P(E \mid D) = \frac{0.2}{0.4} = 0.5$$.
3. $$P(E \mid D) = P(E)$$, so $$D$$ and $$E$$ are independent.
4. The product test agrees: $$0.4 \times 0.5 = 0.2 = P(D \cap E)$$.

The addition rule gives the intersection first:

$$
\begin{aligned}
P(D \cap E) &= 0.4 + 0.5 - 0.7 = 0.2 \\
P(E \mid D) &= \frac{0.2}{0.4} = 0.5 = P(E)
\end{aligned}
$$

So they are independent. Product test: $$0.4 \times 0.5 = 0.2 = P(D \cap E)$$. Compare the deck's numbers 0.5, 0.6 and 0.65, where $$P(D \cap E) = 0.45$$ is not 0.3 and the events are not independent.

### Q: A fair coin gives 2 heads in 10 flips. Does that contradict $$P(\text{heads}) = 0.5$$? Describe the graph the lecture used of the proportion of heads against the number of flips.
**Topic:** 2c Probability as long-run relative frequency (short-run proportions wander · the proportion of heads settles near 0.5 as n grows)  **Lec:** 6  **Type:** recall
**A:** Key:
1. No: 0.5 is the long-run relative frequency, not a promise about ten flips.
2. The graph plots $$\frac{\text{heads}}{n}$$ against $$n$$.
3. It starts at 0 or 1, wanders, and settles near 0.5 as $$n$$ grows.

No. 0.5 is the long-run relative frequency, not a promise about ten flips. The graph plots $$\frac{\text{heads}}{n}$$ against $$n$$. At $$n = 1$$ it is 0 or 1, then it wanders, and it settles near 0.5 as $$n$$ grows, close by 10,000 flips but not necessarily by 100. Short-run outcomes are random.

### Q: In 400 rolls of a die a student sees 80 sixes and says the probability of a six is 0.2. What is right and what is wrong in that claim?
**Topic:** 2c Probability as long-run relative frequency (short-run proportions wander · the proportion of heads settles near 0.5 as n grows)  **Lec:** 6  **Type:** critique
**A:** Key:
1. Wrong: the probability is the long-run limit of the proportion, $$\frac{1}{6} \approx 0.167$$ for a fair die, not the observed 0.2.
2. Right: $$\frac{80}{400} = 0.2$$ is an observed relative frequency, an estimate from a finite run.
3. At 400 rolls, 0.2 is within ordinary variation.
4. A proportion that stayed near 0.2 as $$n$$ grew would be evidence the die is not fair.

$$\frac{80}{400} = 0.2$$ is an observed relative frequency, an estimate from a finite run. The probability is the long-run limit of that proportion, $$\frac{1}{6} \approx 0.167$$ for a fair die. At 400 rolls, 0.2 is within ordinary variation. If the proportion stayed near 0.2 as $$n$$ grew, that would be evidence the die is not fair, not a redefinition of the probability.

### Q: Multiple choice. A simulation flips a fair coin and records the proportion of heads: 0.30 after 10 flips, 0.46 after 100, 0.507 after 1,000 and 0.4992 after 10,000. Which statement is correct? (a) The coin is biased toward tails, since 10 flips gave 0.30. (b) The proportion wanders in the short run and settles near 0.5 as $$n$$ grows. (c) After the low start, the coin produced extra heads to catch up. (d) By 10,000 flips the number of heads must be exactly 5,000.
**Topic:** 2c Probability as long-run relative frequency (short-run proportions wander · the proportion of heads settles near 0.5 as n grows)  **Lec:** 6  **Type:** apply
**A:** Key:
1. (b): probability is the long-run relative frequency, and the short run is random.
2. (a) is wrong, because 3 heads in 10 flips is ordinary short-run variation for a fair coin.
3. (c) is wrong, because flips are independent: the low start is diluted by many later flips, not cancelled.
4. (d) is wrong, because only the proportion settles near 0.5, and 4,992 heads gives 0.4992.

(b). This is the lecture's proportion-of-heads graph: $$\frac{\text{heads}}{n}$$ starts far from 0.5, wanders, and settles near 0.5 as $$n$$ grows. Ten flips say almost nothing about the coin. The coin has no memory, so it never "catches up"; the early shortfall of heads just becomes a smaller and smaller share of the total. The count of heads does not have to hit 5,000: 4,992 heads in 10,000 flips is a proportion of 0.4992, which is what "settles near 0.5" means.

### Q: A roulette wheel has 18 red, 18 black and 2 green pockets. After 8 blacks in a row, a player says red is now "due", because in the long run red comes up $$\frac{18}{38}$$ of the time. What is wrong with the reasoning, and what does the long-run frequency actually promise?
**Topic:** 2c Probability as long-run relative frequency (short-run proportions wander · the proportion of heads settles near 0.5 as n grows)  **Lec:** 6  **Type:** critique
**A:** Key:
1. The reasoning is wrong: spins are independent, so $$P(\text{red}) = \frac{18}{38} \approx 0.474$$ on the next spin, whatever came before.
2. The long-run frequency promises only that the proportion of reds settles near $$\frac{18}{38}$$ as the number of spins grows.
3. The proportion settles because a short streak is swamped by many later spins, not because later spins make up for it.

The wheel has no memory. Each spin is independent of the last, so the conditional probability of red given 8 blacks equals the plain probability of red:

$$
\begin{aligned}
P(R \mid 8\text{ B}) &= P(R) \\
&= \frac{18}{38} \approx 0.474
\end{aligned}
$$

"In the long run" describes the proportion over a very large number of spins. Eight blacks are a short run, which is random. Over the next 10,000 spins they barely move the proportion, so it can settle near $$\frac{18}{38}$$ without any spin favouring red.

### Q: A simulation of a network runs 5,000 independent trials and the link fails in 1,240 of them. A second run of 40 trials gives 14 failures. (a) Estimate $$P(\text{failure})$$ from each run. (b) Which estimate do you trust more, and why? (c) What do you expect the proportion to do if the first run is extended to 50,000 trials?
**Topic:** 2c Probability as long-run relative frequency (short-run proportions wander · the proportion of heads settles near 0.5 as n grows)  **Lec:** 6  **Type:** apply
**A:** Key:
1. (a) $$\frac{1240}{5000} = 0.248$$ from the long run and $$\frac{14}{40} = 0.35$$ from the short run.
2. (b) Trust 0.248, because a relative frequency settles near the probability only as $$n$$ grows, and 40 trials can wander far.
3. (c) It should stay close to 0.248 and wander less, settling nearer the true probability, without being guaranteed to hit any exact value.

Each estimate is an observed relative frequency:

$$
\begin{aligned}
\hat{p}_1 &= \frac{1240}{5000} = 0.248 \\
\hat{p}_2 &= \frac{14}{40} = 0.35
\end{aligned}
$$

Probability is the long-run proportion, so the estimate from 5,000 trials is far closer to the long run than the one from 40. A short run of 40 is exactly the part of the proportion-of-heads graph that still wanders. Extending to 50,000 trials moves further right on that graph, where the proportion changes little from one trial to the next.

### Q: Give the long-run relative-frequency meaning of each statement. (a) A forecast says there is a 70% chance of rain tomorrow. (b) A part has probability 0.002 of being defective. (c) Why does neither statement tell you what will happen tomorrow or to the next part?
**Topic:** 2c Probability as long-run relative frequency (short-run proportions wander · the proportion of heads settles near 0.5 as n grows)  **Lec:** 6  **Type:** apply
**A:** Key:
1. (a) Over many days with conditions like tomorrow's, it rains on about 70% of them.
2. (b) Over a long run of parts, about 2 in every 1,000 are defective.
3. (c) A probability describes the long run, and a single day or a single part is one short-run outcome, which is random.

(a) The 70% is the proportion of rainy days among a very large number of days like tomorrow, not a claim that it will rain 70% of tomorrow. (b) $$0.002 = \frac{2}{1000}$$, so in a long production run about 2 parts per 1,000 fail. (c) Tomorrow is one day and the next part is one part. The long-run proportion says nothing certain about a single trial, just as $$P(\text{heads}) = 0.5$$ does not stop ten flips from giving two heads.

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
**A:** Key:
1. (a) Tuesday and Saturday, the only days with points plotted outside the whiskers.
2. (b) Thursday, with median 450.
3. (c) Thursday, with $$Q_3 = 520$$.
4. (d) False.
5. Thursday's $$Q_1$$ of 380 is above the busiest Saturday's 330, so about 75% of Thursdays had more hits.

(a) Tuesday and Saturday, the only two rows with a point drawn outside the whiskers. A whisker end is never an outlier; whiskers stop at the most extreme value still inside the $$1.5 \times \text{IQR}$$ fences, so only the separately plotted dots count. (b) Thursday, 450. (c) Thursday, 520. It does not have to be the same day as the largest median, so check the column you were asked about. (d) False. The busiest Saturday is 330. Thursday's $$Q_1$$ is 380, and $$Q_1$$ is the 25th percentile, so about 75% of Thursdays are above 380 and therefore above 330 — far more than 25%, not fewer. The trap is reading "less than 25%" off the medians instead of off a quartile.

### Q: Events $$A$$ and $$B$$ are mutually exclusive with $$P(A) = 0.35$$ and $$P(B) = 0.45$$. Find $$P(A \cup B)$$. Then say what would have to be true for $$P(A) = 0.6$$ and $$P(B) = 0.5$$ to describe two mutually exclusive events.
**Topic:** 2f Probability rules and the addition rule (outcome probabilities sum to 1 · complement rule · general addition rule · countable additivity · three-event rule)  **Lec:** WW2  **Type:** apply
**A:** Key:
1. Mutually exclusive means $$P(A \cap B) = 0$$, so $$P(A \cup B) = P(A) + P(B) = 0.35 + 0.45$$.
2. $$P(A \cup B) = 0.8$$.
3. The second pair is impossible, because $$P(A \cup B)$$ would be 1.1 and no probability exceeds 1.

Mutually exclusive means $$A \cap B = \emptyset$$, so $$P(A \cap B) = 0$$ and the general addition rule collapses:

$$
\begin{aligned}
P(A \cup B) &= P(A) + P(B) - P(A \cap B) \\
&= 0.35 + 0.45 = 0.8
\end{aligned}
$$

The second pair is impossible: $$P(A \cup B)$$ would have to be 1.1, and no probability exceeds 1. So two disjoint events can never have probabilities summing past 1 — a quick sanity check worth running before you answer.

### Q: A two-stage tree has first-stage branches $$A$$ and $$B$$ with $$P(A) = 0.6$$ and $$P(B) = 0.4$$. From $$A$$ the second-stage branches are $$C$$ with probability 0.3 and $$D$$ with probability 0.7; from $$B$$ they are $$C$$ with probability 0.8 and $$D$$ with probability 0.2. Find (a) $$P(C \mid A)$$, (b) $$P(D \mid B)$$, (c) $$P(A \cap C)$$, (d) $$P(B \cap D)$$, (e) $$P(C)$$, (f) $$P(D)$$.
**Topic:** 2h Conditional probability and the multiplication rule (definition as a ratio · proportion of A inside B · the given event is the denominator · two forms of the multiplication rule)  **Lec:** WW2  **Type:** apply
**A:** Key:
1. (a) 0.3 and (b) 0.2 are read straight off the second-stage branches, which are conditional probabilities.
2. (c) Multiply along the path: $$P(A \cap C) = 0.6 \times 0.3 = 0.18$$.
3. (d) $$P(B \cap D) = 0.4 \times 0.2 = 0.08$$.
4. (e) Add across paths: $$P(C) = 0.18 + 0.4 \times 0.8 = 0.50$$.
5. (f) $$P(D) = 0.6 \times 0.7 + 0.08 = 0.50$$, which also equals $$1 - P(C)$$.

(a) 0.3 and (b) 0.2 are read straight off the second-stage branches: a branch label in a tree already *is* a conditional probability, given everything upstream of it. For the rest, multiply along a path and add across paths:

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
**A:** Key:
1. Independence gives the overlap: $$P(A \cap B) = 0.5 \times 0.2 = 0.10$$.
2. $$P(A \cup B) = 0.5 + 0.2 - 0.10 = 0.60$$.
3. If they were mutually exclusive the overlap would be 0, so the union would be 0.70.
4. Independence puts a real overlap in, and subtracting it shrinks the union.

Independence gives the overlap:

$$
\begin{aligned}
P(A \cap B) &= P(A)\,P(B) = 0.5 \times 0.2 = 0.10 \\
P(A \cup B) &= 0.5 + 0.2 - 0.10 = 0.60
\end{aligned}
$$

If they were mutually exclusive the overlap would be 0 instead of 0.10 and the union would be 0.70. Independence is the stronger claim here: it puts a real overlap in, and subtracting it shrinks the union. The two conditions are not variations on each other — with both probabilities positive, disjoint events are never independent, because $$P(A \cap B) = 0 \ne P(A)\,P(B)$$.

### Q: Two quick multiple-choice items. (a) $$P(A) = 0.25$$, $$P(B) = 0.40$$ and $$P(A \text{ and } B) = 0.10$$. Are $$A$$ and $$B$$ mutually exclusive, dependent, independent, or complementary? (b) Which is the useful graphical method for constructing the sample space of a multi-stage experiment: a histogram, an ogive, a pie chart, or a tree diagram? Justify each.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** WW2  **Type:** apply
**A:** Key:
1. (a) Independent, by the product test: $$P(A)\,P(B) = 0.25 \times 0.40 = 0.10 = P(A \cap B)$$.
2. They are not mutually exclusive, since the intersection has probability $$0.10 > 0$$.
3. They are not complementary, since $$P(A) + P(B) = 0.65 \ne 1$$.
4. (b) A tree diagram, since its complete set of paths through the stages is the sample space.

(a) Independent. Run the product test: $$P(A)\,P(B) = 0.25 \times 0.40 = 0.10$$, which matches $$P(A \cap B)$$, so the events are independent. They are not mutually exclusive, since the intersection has probability $$0.10 > 0$$. They are not complementary, since $$P(A) + P(B) = 0.65 \ne 1$$ and $$B \ne A^c$$. "Dependent" is exactly what the product test just ruled out. (b) A tree diagram. It enumerates every path through the stages, so the complete set of paths is the sample space and the branch labels are the conditional probabilities. The other three are displays for data you already have, not tools for building a sample space. This problem gives no partial credit, so both halves have to be right.

### Q: Two components sit in parallel, and the system works as long as at least one of them works. Let $$F_1$$ be the event that component 1 fails during the day and $$F_2$$ that component 2 fails. (a) Which set is the event that the system fails? (b) Which set is the event that the system works throughout the day? The options for each are $$F_1 \cap F_2$$, $$F_1^c \cap F_2^c$$, $$F_1 \cup F_2$$, $$(F_1 \cup F_2)^c$$ and $$F_1^c \cup F_2^c$$. Say what each of the losing options would describe.
**Topic:** 2g Events as sets and Venn diagrams (complement · intersection · union · disjoint events have no overlap · subsets · De Morgan)  **Lec:** WW2  **Type:** apply
**A:** Key:
1. (a) $$F_1 \cap F_2$$, because a parallel system fails only when both components fail.
2. (b) $$F_1^c \cup F_2^c$$, at least one component works, the complement of (a) by De Morgan.
3. $$F_1 \cup F_2$$ is "at least one fails", the failure condition for a series system.
4. $$F_1^c \cap F_2^c$$ is "both work", which is stricter than a parallel system needs.
5. $$(F_1 \cup F_2)^c$$ equals $$F_1^c \cap F_2^c$$ by De Morgan, the same wrong answer.

(a) $$F_1 \cap F_2$$. A parallel system survives on one working component, so it fails only when both fail. (b) $$F_1^c \cup F_2^c$$, that is, at least one component works. It is the complement of the answer to (a), and De Morgan turns $$(F_1 \cap F_2)^c$$ into $$F_1^c \cup F_2^c$$. The losing options: $$F_1 \cup F_2$$ is "at least one fails", which is the failure condition for a *series* system, not a parallel one. $$F_1^c \cap F_2^c$$ is "both work", which is stricter than a parallel system needs. $$(F_1 \cup F_2)^c$$ is the same set as $$F_1^c \cap F_2^c$$ by De Morgan, so it is the same wrong answer written the other way round — a good check that you are applying De Morgan rather than guessing.

### Q: Components $$A$$ and $$B$$ sit in parallel, and that whole block sits in series with component $$C$$. The components fail independently, with $$P(A \text{ fails}) = 0.2$$, $$P(B \text{ fails}) = 0.15$$ and $$P(C \text{ fails}) = 0.1$$. Find the reliability of the system to three decimal places.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** WW2  **Type:** derive
**A:** Key:
1. Parallel block first, then series with $$C$$: $$P(\text{works}) = (1 - 0.2 \times 0.15)(1 - 0.1)$$.
2. The block fails with probability 0.03, so it works with probability 0.97.
3. The reliability is $$0.97 \times 0.9 = 0.873$$.

Do the parallel block first. It fails only if both fail, and independence lets you multiply. The block and $$C$$ are in series, so the system works only if both work:

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
**A:** Key:
1. (a) $$P(A \mid B^c) = \frac{P(A \cap B^c)}{P(B^c)} = \frac{0.3 - 0.2}{1 - 0.5}$$.
2. (a) $$P(A \mid B^c) = \frac{0.1}{0.5} = \frac{1}{5}$$.
3. (b) $$P(A \cap B) = 0.3$$ equals both $$P(A)$$ and $$P(B)$$, so $$A$$ and $$B$$ are the same event.
4. (b) Then $$A \cap B^c = \emptyset$$, so $$P(A \mid B^c) = \frac{0}{0.7} = 0$$.

(a) The given event is the denominator. Split $$A$$ along $$B$$:

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
**A:** Key:
1. Bayes with priors $$\frac{3}{4}$$ and $$\frac{1}{4}$$: $$P(A \mid D) = \frac{0.75(0.025)}{0.75(0.025) + 0.25(0.04)}$$.
2. $$P(D) = 0.01875 + 0.01 = 0.02875$$.
3. $$P(A \mid D) = \frac{0.01875}{0.02875} = 0.6522$$.

"Three times as many" fixes the priors: $$P(A) = \frac{3}{4} = 0.75$$ and $$P(B) = 0.25$$, since $$A$$ and $$B$$ are the only two producers. Then:

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
**A:** Key:
1. Start from $$P(A_i \mid B) = \frac{P(A_i \cap B)}{P(B)}$$.
2. The numerator is $$P(B \mid A_i)\,P(A_i)$$ by the multiplication rule.
3. $$B$$ is the union of the disjoint pieces $$A_k \cap B$$, so $$P(B) = \sum_{k=1}^{n} P(B \mid A_k)\,P(A_k)$$.
4. That denominator is where the law of total probability enters.
5. The result is $$P(A_i \mid B) = \frac{P(B \mid A_i)\,P(A_i)}{\sum_{k=1}^{n} P(B \mid A_k)\,P(A_k)}$$.

Start from $$P(A_i \mid B) = \frac{P(A_i \cap B)}{P(B)}$$. The numerator is $$P(B \mid A_i)\,P(A_i)$$ by the multiplication rule. For the denominator, $$B$$ is the union of the disjoint pieces $$A_1 \cap B, \dots, A_n \cap B$$, so $$P(B)$$ is the sum of $$P(B \mid A_k)\,P(A_k)$$ over $$k$$, which is the law of total probability. Putting them together:

$$
P(A_i \mid B) = \frac{P(B \mid A_i)\,P(A_i)}{\sum_{k=1}^{n} P(B \mid A_k)\,P(A_k)}
$$

### Q: In the three-plant example a student says: "The probability that a plant 2 car is defective is 0.018, so the probability that a defective car is from plant 2 is also about 0.018." Explain the error in one sentence and give the right number.
**Topic:** 2i Bayes' theorem and the law of total probability (partition · weighted average of the branch rates · reversing the conditional · posterior vs prior)  **Lec:** 7  **Type:** critique
**A:** Key:
1. They are reverse conditionals: $$P(D \mid A_2) = 0.018$$ is given, while $$P(A_2 \mid D)$$ weighs plant 2's defects against all three plants'.
2. Total probability: $$P(D) = 0.0035 + 0.0036 + 0.0090 = 0.0161$$.
3. $$P(A_2 \mid D) = \frac{0.0036}{0.0161} \approx 0.224$$.

Those are reverse conditionals: $$P(D \mid A_2) = 0.018$$ is given, while $$P(A_2 \mid D)$$ weighs plant 2's defective output against the defective output of all three plants.

$$
\begin{aligned}
P(D) &= 0.0035 + 0.0036 + 0.0090 = 0.0161 \\
P(A_2 \mid D) &= \frac{0.0036}{0.0161} \approx 0.224
\end{aligned}
$$

### Q: A test detects a disease with probability 0.95 when it is present and gives a false positive with probability 0.08 when it is absent. 4% of people have the disease. Draw the tree and find $$P(\text{disease} \mid \text{positive})$$.
**Topic:** 2i Bayes' theorem and the law of total probability (partition · weighted average of the branch rates · reversing the conditional · posterior vs prior)  **Lec:** 7  **Type:** apply
**A:** Key:
1. Bayes: $$P(\text{disease} \mid \text{positive}) = \frac{0.04(0.95)}{0.04(0.95) + 0.96(0.08)}$$.
2. The tree splits first into disease 0.04 and no disease 0.96, then positive 0.95 on the disease branch and 0.08 on the other.
3. $$P(\text{positive}) = 0.038 + 0.0768 = 0.1148$$.
4. $$P(\text{disease} \mid \text{positive}) = \frac{0.038}{0.1148} \approx 0.331$$.

First split: disease 0.04, no disease 0.96. Second split: positive 0.95 or negative 0.05 on the disease branch, positive 0.08 or negative 0.92 on the other. Multiply along the two positive paths:

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
**A:** Key:
1. Bayes with the total probability of a defective as the denominator: $$P(I \mid D) = \frac{0.5(0.02)}{0.5(0.02) + 0.5(0.06)}$$.
2. $$P(D) = 0.04$$, so $$P(I \mid D) = 0.25$$.
3. It is below one half because bin I contributes fewer of the defective parts.
4. Equal defect rates would make it exactly one half, since the prior is already even.

The two paths and the posterior:

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
**A:** Key:
1. Parallel block, then series with $$C$$ and $$D$$: $$R = (1 - 0.3 \times 0.4)(0.95)(0.9)$$.
2. The block works with probability $$1 - 0.3 \times 0.4 = 0.88$$.
3. The reliability is $$0.88 \times 0.95 \times 0.9 = 0.7524$$.

The parallel block fails only if both $$A$$ and $$B$$ fail. The system needs the block, $$C$$ and $$D$$ all working, so by independence:

$$
\begin{aligned}
P(\text{block works}) &= 1 - 0.3 \times 0.4 = 0.88 \\
\text{reliability} &= 0.88 \times 0.95 \times 0.9 = 0.7524
\end{aligned}
$$

With the deck's numbers (0.6, 0.5, 0.9, 0.9) the same steps give $$0.8 \times 0.81 = 0.648$$.

### Q: Three components each work with probability 0.9, independently. Compare the reliability of all three in series with all three in parallel, and name the rule each layout uses.
**Topic:** 2k Reliability of series and parallel systems (series multiplies reliabilities · parallel is one minus the product of failure probabilities · combine blocks · independence must be given)  **Lec:** 7  **Type:** apply
**A:** Key:
1. Series needs every component working: $$0.9^3 = 0.729$$.
2. Parallel fails only if every component fails: $$1 - 0.1^3 = 0.999$$.
3. Series uses the multiplication rule for independent events.
4. Parallel uses the complement of that rule applied to the failures.

Series needs every component to work, so the reliability is the product $$0.9^3 = 0.729$$. Parallel fails only if every component fails, so the reliability is $$1 - 0.1^3 = 0.999$$. Series uses the multiplication rule for independent events; parallel uses the complement of that rule applied to the failures.

## Lec 8 — Ch 4: random variables, the pmf, the cdf, mean and variance (logged 2026-09-28 from the posted deck and the recording)

### Q: Two fair dice, one green and one red, are rolled and $$Y$$ = green score minus red score. List the possible values of $$Y$$, find $$P(Y = 0)$$ and $$P(Y = 4)$$, and say whether $$Y$$ is discrete.
**Topic:** 3a–b Random variables and the pmf (X as a function on S · possible values · discrete vs continuous · pmf properties · find the constant · probability statements)  **Lec:** 8  **Type:** apply
**A:** Key:
1. Over the 36 equally likely ordered pairs, the possible values are $$-5, -4, \dots, 4, 5$$, eleven values.
2. $$P(Y = 0)$$ counts the six doubles: $$\frac{6}{36} = \frac{1}{6}$$.
3. $$P(Y = 4)$$ needs (5, 1) or (6, 2): $$\frac{2}{36} = \frac{1}{18}$$.
4. $$Y$$ is discrete, a finite set of separate values.

The 36 ordered pairs are equally likely. Differences run from $$1 - 6 = -5$$ to $$6 - 1 = 5$$, so the possible values are $$-5, -4, \dots, 4, 5$$, eleven values. $$P(Y = 0)$$ counts the six doubles, $$\frac{6}{36} = \frac{1}{6}$$. $$P(Y = 4)$$ needs (5, 1) or (6, 2), so $$\frac{2}{36} = \frac{1}{18}$$. $$Y$$ is discrete: a finite set of separate values with probability at each one.

### Q: Flip a fair coin four times and let $$X$$ be the number of heads. Give the pmf as a table and check both pmf properties.
**Topic:** 3a–b Random variables and the pmf (X as a function on S · possible values · discrete vs continuous · pmf properties · find the constant · probability statements)  **Lec:** 8  **Type:** apply
**A:** Key:
1. Sixteen equally likely outcomes, with 1, 4, 6, 4, 1 ways to get 0, 1, 2, 3, 4 heads.
2. $$f(0)$$ to $$f(4)$$ are $$\frac{1}{16}, \frac{4}{16}, \frac{6}{16}, \frac{4}{16}, \frac{1}{16}$$.
3. Every value is at least 0.
4. The values sum to $$\frac{16}{16} = 1$$.

Sixteen equally likely outcomes. The counts with 0, 1, 2, 3, 4 heads are 1, 4, 6, 4, 1, so:

| $$x$$ | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| $$f(x)$$ | $$\frac{1}{16}$$ | $$\frac{4}{16}$$ | $$\frac{6}{16}$$ | $$\frac{4}{16}$$ | $$\frac{1}{16}$$ |

Every value is at least 0, and the sum is $$\frac{16}{16} = 1$$, so it is a pmf.

### Q: $$Y$$ takes the values $$-2, 0, 3, 6$$ with probabilities $$2c, 0.3, c, 4c$$. Find $$c$$, then $$P(Y = 6)$$, $$P(Y \ge 0)$$, $$P(Y < 0)$$ and $$P(Y > 1.5)$$, writing each as probability statements before the numbers.
**Topic:** 3a–b Random variables and the pmf (X as a function on S · possible values · discrete vs continuous · pmf properties · find the constant · probability statements)  **Lec:** 8  **Type:** apply
**A:** Key:
1. The pmf sums to 1: $$2c + 0.3 + c + 4c = 1$$.
2. $$7c = 0.7$$, so $$c = 0.1$$.
3. $$P(Y = 6) = 4c = 0.4$$.
4. $$P(Y \ge 0) = P(Y = 0) + P(Y = 3) + P(Y = 6) = 0.8$$, and $$P(Y < 0) = P(Y = -2) = 0.2$$.
5. $$P(Y > 1.5) = P(Y = 3) + P(Y = 6) = 0.5$$.

$$f$$ is a pmf, so the probabilities sum to 1. The possible values above 1.5 are 3 and 6.

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
**A:** Key:
1. Only table (ii) can be a pmf, because both pmf properties hold for it.
2. (i) fails because $$-0.1$$ breaks $$f(x) \ge 0$$, even though its sum is 1.
3. (iii) fails because its probabilities sum to 1.1, breaking the total of 1.
4. (ii) is Bernoulli because its only values are 0 and 1.

(i) No: a probability of $$-0.1$$ breaks $$f(x) \ge 0$$, and the sum being 1 does not rescue it. (ii) Yes, both properties hold, and it is Bernoulli because the only values are 0 and 1. (iii) No: the sum is 1.1, which breaks the total of 1.

### Q: For $$X$$ = the number of heads in four fair flips, write the cdf as a piecewise function, then evaluate $$F(1.5)$$, $$F(-1)$$, $$F(4)$$ and $$P(X > 2)$$.
**Topic:** 3f Discrete cdf (F as a running sum · defined for every real x · step function · one minus F)  **Lec:** 8  **Type:** apply
**A:** Key:
1. The cdf is the running sum of the pmf $$\frac{1}{16}, \frac{4}{16}, \frac{6}{16}, \frac{4}{16}, \frac{1}{16}$$, a step function jumping at 0 to 4.
2. $$F(x)$$ is 0 below 0, then $$\frac{1}{16}, \frac{5}{16}, \frac{11}{16}, \frac{15}{16}$$ on $$[0, 1), [1, 2), [2, 3), [3, 4)$$, and 1 from 4 on.
3. $$F(1.5) = \frac{5}{16}$$, $$F(-1) = 0$$ and $$F(4) = 1$$.
4. $$P(X > 2) = 1 - F(2) = 1 - \frac{11}{16} = \frac{5}{16}$$.

Running sums of $$\frac{1}{16}, \frac{4}{16}, \frac{6}{16}, \frac{4}{16}, \frac{1}{16}$$ give:

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
**A:** Key:
1. $$1 - F(2)$$ is $$P(X > 2)$$, so it leaves out $$X = 2$$.
2. $$P(X \ge 2) = 1 - F(1) = 1 - \frac{4}{8} = \frac{4}{8}$$.
3. $$P(X > 2) = 1 - F(2) = \frac{1}{8}$$.

$$1 - F(2)$$ is $$P(X > 2)$$, which leaves out $$X = 2$$. $$P(X \ge 2) = 1 - F(1) = 1 - \frac{4}{8} = \frac{4}{8}$$, while $$P(X > 2) = 1 - F(2) = \frac{1}{8}$$. For a discrete variable the equal sign moves the answer by $$f(2) = \frac{3}{8}$$.

### Q: $$X$$ is the score on a fair die. Find $$E(X)$$ and $$\operatorname{Var}(X)$$ by the shortcut, then explain what $$E(X) = 3.5$$ means when no face shows 3.5.
**Topic:** 3d Mean and variance of a discrete random variable (long-run average · E of a function of X · variance by definition and by the shortcut · not the sample mean)  **Lec:** 8  **Type:** derive
**A:** Key:
1. Use $$f(x) = \frac{1}{6}$$ at 1 to 6 and the shortcut $$\operatorname{Var}(X) = E(X^2) - [E(X)]^2$$.
2. $$E(X) = \frac{21}{6} = 3.5$$.
3. $$E(X^2) = \frac{91}{6}$$, so $$\operatorname{Var}(X) = \frac{91}{6} - 3.5^2 = \frac{35}{12} \approx 2.92$$.
4. 3.5 is the long-run average score over hypothetically many rolls, not a value one roll can show.

With $$f(x) = \frac{1}{6}$$ at 1 to 6:

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
**A:** Key:
1. Weight each value by its probability: $$E(Y) = -2(0.2) + 0(0.3) + 3(0.1) + 6(0.4)$$.
2. $$E(Y) = 2.3$$.
3. $$E(Y^2) = 4(0.2) + 9(0.1) + 36(0.4) = 16.1$$.
4. $$\operatorname{Var}(Y) = 16.1 - 2.3^2 = 10.81$$.
5. $$\operatorname{SD}(Y) = \sqrt{10.81} \approx 3.29$$.

Weight each value by its probability:

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
**A:** Key:
1. A random variable's mean is $$\mu = \sum x\,f(x)$$, a weighted average of the possible values with the pmf as weights.
2. Chapter 1's mean is a statistic of $$n$$ data values; for a random variable the distribution carries the information.
3. The two agree when every possible value is equally likely, as for a fair die.

Chapter 1's mean is a statistic of $$n$$ data values. A random variable's mean is $$\mu = \sum x\,f(x)$$, a weighted average of the possible values with the pmf as weights; the distribution, not a count of data, carries the information. The two agree whenever the weights do not move the average, for example when every possible value is equally likely, as for a fair die, where $$\sum x\,f(x) = \frac{1 + \dots + 6}{6}$$.

## Lec 9 — Ch 4: continuous random variables, the pdf and cdf, uniform and exponential (logged 2026-09-28 from the posted deck and the recording)

### Q: $$f(x) = cx$$ on $$[0, 4]$$ and 0 elsewhere. Find $$c$$, confirm $$f$$ is a pdf, and find $$P(1 \le X \le 3)$$ and $$P(X = 2)$$.
**Topic:** 3c Continuous random variables and the pdf (probability as area · f ≥ 0 and total area 1 · find the constant · endpoints do not matter · P at a point is 0)  **Lec:** 9  **Type:** apply
**A:** Key:
1. Set the total area to 1: $$\int_0^4 cx\,dx = 8c = 1$$.
2. $$c = \frac{1}{8}$$.
3. $$f(x) = \frac{x}{8} \ge 0$$ on the support with total area 1, so it is a pdf.
4. $$P(1 \le X \le 3) = \int_1^3 \frac{x}{8}\,dx = \frac{9 - 1}{16} = 0.5$$.
5. $$P(X = 2) = 0$$, because a single point has no area.

The total area must be 1:

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
**A:** Key:
1. The student is wrong: $$f(x) = 2$$ on $$[0, 0.5]$$ is a valid pdf, the uniform distribution on $$[0, 0.5]$$.
2. $$f$$ is a density, not a probability; only areas under $$f$$ are probabilities, and each is at most 1.
3. The tests are $$f \ge 0$$ and total area 1, and here the area is $$2 \times 0.5 = 1$$.

$$f$$ is a density, not a probability. The tests are $$f \ge 0$$ and total area 1, and here the area is $$2 \times 0.5 = 1$$, so it is a valid pdf, the uniform distribution on $$[0, 0.5]$$. Only areas under $$f$$ are probabilities, and every one of them is at most 1.

### Q: Why are $$P(a \le X \le b)$$ and $$P(a < X < b)$$ equal for a continuous $$X$$ but not for a discrete one? Give a discrete example where they differ.
**Topic:** 3c Continuous random variables and the pdf (probability as area · f ≥ 0 and total area 1 · find the constant · endpoints do not matter · P at a point is 0)  **Lec:** 9  **Type:** recall
**A:** Key:
1. For a continuous $$X$$, $$P(X = a) = P(X = b) = 0$$, so including or excluding the endpoints changes nothing.
2. For a discrete $$X$$ the endpoints can carry probability.
3. For heads in three flips, $$P(1 \le X \le 2) = \frac{6}{8}$$ while $$P(1 < X < 2) = 0$$.

For a continuous $$X$$, $$P(X = a) = P(X = b) = 0$$, so including or excluding the endpoints changes nothing. For a discrete $$X$$ the endpoints can carry probability. With $$X$$ = the number of heads in three flips, $$P(1 \le X \le 2) = \frac{6}{8}$$ while $$P(1 < X < 2) = 0$$, since no possible value lies strictly between 1 and 2.

### Q: For $$f(x) = \frac{x}{8}$$ on $$[0, 4]$$, find the cdf as a piecewise function, recover $$f$$ by differentiation, and find $$P(X > 3)$$ and the median.
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** 9  **Type:** derive
**A:** Key:
1. Integrate from the left end of the support: $$F(x) = \int_0^x \frac{t}{8}\,dt = \frac{x^2}{16}$$ for $$0 \le x \le 4$$.
2. $$F(x) = 0$$ for $$x < 0$$ and $$F(x) = 1$$ for $$x > 4$$.
3. Differentiating $$\frac{x^2}{16}$$ gives $$\frac{x}{8}$$, the pdf back.
4. $$P(X > 3) = 1 - F(3) = 1 - \frac{9}{16} = \frac{7}{16}$$.
5. The median solves $$\frac{x^2}{16} = 0.5$$, so it is $$\sqrt{8} \approx 2.83$$.

Integrate from the left end of the support:

$$
F(x) = \int_0^x \frac{t}{8}\,dt = \frac{x^2}{16}, \qquad 0 \le x \le 4
$$

with $$F(x) = 0$$ for $$x < 0$$ and $$F(x) = 1$$ for $$x > 4$$. Differentiating $$\frac{x^2}{16}$$ gives $$\frac{x}{8}$$, the pdf back. $$P(X > 3) = 1 - F(3) = 1 - \frac{9}{16} = \frac{7}{16}$$. The median solves $$\frac{x^2}{16} = 0.5$$, so $$x = \sqrt{8} \approx 2.83$$.

### Q: $$X$$ is uniform on $$[0, 100]$$, the deck's Example 6. Find $$Q_1$$, $$Q_3$$ and the IQR, and $$P(X > 85)$$.
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** 9  **Type:** apply
**A:** Key:
1. Use $$F(x) = \frac{x}{100}$$ and solve $$F(x) = 0.25$$ and $$F(x) = 0.75$$ for the quartiles.
2. $$Q_1 = 25$$ and $$Q_3 = 75$$.
3. $$\text{IQR} = 50$$.
4. $$P(X > 85) = 1 - F(85) = 0.15$$.

$$F(x) = \frac{x}{100}$$ on $$[0, 100]$$. $$Q_1$$ solves $$\frac{x}{100} = 0.25$$, so $$Q_1 = 25$$; $$Q_3$$ solves $$\frac{x}{100} = 0.75$$, so $$Q_3 = 75$$; $$\text{IQR} = 50$$. $$P(X > 85) = 1 - F(85) = 0.15$$.

### Q: Given $$F(x) = \frac{x^3}{8}$$ on $$[0, 2]$$, a student writes $$P(X < 1) = F(2) - F(1) = \frac{7}{8}$$. Fix the error, then compute $$P(X < 1)$$, $$P(X \ge 1)$$ and $$P(0.5 < X < 1.5)$$.
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** 9  **Type:** critique
**A:** Key:
1. The error: $$F(2) - F(1)$$ is $$P(1 < X < 2)$$, while $$P(X < 1)$$ is $$F(1)$$ alone.
2. $$P(X < 1) = F(1) = \frac{1}{8}$$.
3. $$P(X \ge 1) = 1 - F(1) = \frac{7}{8}$$.
4. $$P(0.5 < X < 1.5) = F(1.5) - F(0.5) = \frac{3.375 - 0.125}{8} \approx 0.406$$.

$$F(2) - F(1)$$ is $$P(1 < X < 2)$$. The three asked for:

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
**A:** Key:
1. Use the uniform results with $$F(x) = \frac{x}{20}$$: $$E(X) = \frac{0 + 20}{2}$$ and $$\operatorname{Var}(X) = \frac{20^2}{12}$$.
2. The mean is 10 minutes.
3. The variance is $$\frac{400}{12} \approx 33.3$$.
4. $$P(X > 15) = 1 - 0.75 = 0.25$$.
5. The 90th percentile solves $$\frac{x}{20} = 0.9$$, giving 18 minutes.

Use the uniform results and $$F(x) = \frac{x}{20}$$:

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
**A:** Key:
1. $$E(X) = \frac{1}{\lambda} = 200$$, so $$\lambda = 0.005$$ per hour.
2. $$P(X > 300) = e^{-1.5} \approx 0.223$$.
3. $$P(100 < X < 300) = F(300) - F(100) = e^{-0.5} - e^{-1.5} \approx 0.383$$.
4. The median solves $$1 - e^{-\lambda m} = 0.5$$, so $$m = 200 \ln 2 \approx 139$$ hours.

$$E(X) = \frac{1}{\lambda} = 200$$, so $$\lambda = 0.005$$ per hour. Then:

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
**A:** Key:
1. A pdf $$f(x)$$ is a height, not a probability, so you integrate it over the range you want.
2. A $$P(\dots)$$ or $$F(x)$$ is already a probability, so you plug the number in.
3. You tell them apart by reading the left side of the equals sign.
4. $$P(T > 4) = \frac{16}{64} = 0.25$$, so $$P(T \le 4) = 1 - 0.25 = 0.75$$.

Read the left side of the equals sign. A pdf $$f(x)$$ is a height, not a probability, so you integrate it over the range you want. $$P(\dots)$$ or $$F(x)$$ is already a probability, so you plug the number in. Here $$P(T > 4) = \frac{16}{64} = 0.25$$, and $$P(T \le 4)$$ is its complement, $$1 - 0.25 = 0.75$$.

### Q: Why is $$P(X = c) = 0$$ for a continuous $$X$$, and where does the total probability of 1 sit if every single value has probability 0?
**Topic:** 3c Continuous random variables and the pdf (probability as area · f ≥ 0 and total area 1 · find the constant · endpoints do not matter · P at a point is 0)  **Lec:** 9  **Type:** recall
**A:** Key:
1. Each exact value must have probability 0: $$X$$ takes endlessly many values, so any positive chance each would push the total past 1.
2. The total probability sits in ranges: a range's probability is its area under $$f$$.
3. The area under $$f$$ over the whole support is 1.

A continuous $$X$$ can take endlessly many values, such as 1, 1.1, 1.01 and 1.001. If each exact value had even a chance of 0.001, a thousand of them would already add to 1 and the rest would push the total past 1, so each one must be exactly 0. The 1 sits in ranges, the way length does on a ruler: the point from 1 to 1 has length $$1 - 1 = 0$$, but the stretch from 0 to 2 has length 2. A range's probability is its area under $$f$$, and the area over the whole support is 1.

### Q: Why is $$E(X) = \int x\,f(x)\,dx$$ the same idea as the discrete mean $$\sum x\,P(X = x)$$, and what changes for $$E(\sqrt{X})$$?
**Topic:** 3g–i Mean, variance, uniform and exponential (E and Var by integration · the shortcut · uniform mean and variance · exponential mean and variance by parts · median from F)  **Lec:** 9  **Type:** recall
**A:** Key:
1. Both are each value times its chance, added up.
2. In the continuous case the chance of a thin strip near $$x$$ is $$f(x)\,dx$$, and the integral does the adding.
3. For $$E(\sqrt{X})$$, replace the $$x$$ in front of $$f(x)$$ to get $$\int \sqrt{x}\,f(x)\,dx$$, with $$f(x)$$ unchanged.

Both are each value times its chance, added up. In the continuous case the chance of landing in a thin strip near $$x$$ is $$f(x)\,dx$$, and the integral does the adding. For $$E(\sqrt{X})$$, or any function of $$X$$, replace the $$x$$ in front of $$f(x)$$ with what is inside the brackets, giving $$\int \sqrt{x}\,f(x)\,dx$$. The $$f(x)$$ itself never changes.

## WeBWorK 3 — Ch 4 (opened Sep 29, due Tue Oct 6; banked 2026-09-29, numbers changed)

### Q: WeBWorK-style. An unevenly balanced four-sided die has $$P(1) = 0.15$$, $$P(1 \text{ or } 2) = 0.45$$ and $$P(2 \text{ or } 3) = 0.50$$. You win the amount showing on the die. From a blank page, build the full pmf and then find your expected winnings.
**Topic:** 3d Mean and variance of a discrete random variable (long-run average · E of a function of X · variance by definition and by the shortcut · not the sample mean)  **Lec:** WW3  **Type:** apply
**A:** Key:
1. Build the pmf face by face: $$P(2) = 0.45 - 0.15$$, $$P(3) = 0.50 - P(2)$$ and $$P(4) = 1 - P(1) - P(2) - P(3)$$.
2. The pmf is $$P(1) = 0.15$$, $$P(2) = 0.30$$, $$P(3) = 0.20$$ and $$P(4) = 0.35$$.
3. $$E(X) = 1(0.15) + 2(0.30) + 3(0.20) + 4(0.35) = 2.75$$ dollars.

The three facts pin down the pmf one face at a time:

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
**A:** Key:
1. Use $$E(aX + b) = aE(X) + b$$ and $$\operatorname{SD}(aX + b) = |a| \cdot \operatorname{SD}(X)$$.
2. $$Y = X + 4$$ has mean $$-5$$ and SD 3, because a shift leaves the spread untouched.
3. $$V = 5X$$ has mean $$-45$$ and SD 15.
4. $$W = 5X + 4$$ has mean $$-41$$ and SD 15.

For a linear change $$aX + b$$, the mean follows the whole transformation and the spread follows only the multiplier:

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
**A:** Key:
1. Expand the square: $$E[(X - \mu)^2] = E[X^2 - 2\mu X + \mu^2]$$.
2. The expectation of a sum is the sum of the expectations: $$E(X^2) - E(2\mu X) + E(\mu^2)$$.
3. Constants come out of $$E$$, so $$E(2\mu X) = 2\mu^2$$ and $$E(\mu^2) = \mu^2$$.
4. This leaves $$E(X^2) - 2\mu^2 + \mu^2 = E(X^2) - [E(X)]^2$$.

Expand the square, then use two rules: the expectation of a sum is the sum of the expectations, and constants come out of $$E$$, so $$E(2\mu X) = 2\mu E(X) = 2\mu^2$$ and $$E(\mu^2) = \mu^2$$.

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
**A:** Key:
1. Apply the linear rules: $$E(3X - 5) = 3E(X) - 5$$ and $$\operatorname{Var}(3X - 5) = 3^2 \operatorname{Var}(X)$$.
2. $$E(3X - 5) = 3(4) - 5 = 7$$.
3. $$\operatorname{Var}(3X - 5) = 3^2(9) = 81$$, so $$\operatorname{SD}(3X - 5) = 9$$.
4. $$E(X^2) = \operatorname{Var}(X) + [E(X)]^2 = 9 + 16 = 25$$.
5. $$E[(X - 2)^2] = E(X^2) - 4E(X) + 4 = 25 - 16 + 4 = 13$$.

The $$-5$$ shifts the values and does not spread them. $$E(X^2)$$ comes from rearranging the shortcut.

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
**A:** Key:
1. (a) is wrong: for independent $$X$$ and $$Y$$, $$\operatorname{Var}(X - Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$$.
2. The variances add because $$\operatorname{Var}(-Y) = (-1)^2\operatorname{Var}(Y)$$.
3. (b) $$\operatorname{Var}(2X) = 2^2\operatorname{Var}(X) = 4\operatorname{Var}(X)$$.
4. (c) $$E(XY) = E(X)E(Y)$$ needs independence.
5. With $$Y = X$$, $$E(XY) = E(X^2)$$, which is larger than $$[E(X)]^2$$ by $$\operatorname{Var}(X)$$.

(a) For independent $$X$$ and $$Y$$, $$\operatorname{Var}(X - Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$$, because $$\operatorname{Var}(-Y) = (-1)^2\operatorname{Var}(Y)$$. With $$\operatorname{Var}(X) = \operatorname{Var}(Y) = 4$$ the claim gives 0, but the right answer is 8. (b) $$\operatorname{Var}(2X) = 2^2\operatorname{Var}(X) = 4\operatorname{Var}(X)$$. (c) $$E(XY) = E(X)E(Y)$$ needs independence. Take $$Y = X$$: then $$E(XY) = E(X^2)$$, which is larger than $$[E(X)]^2$$ by $$\operatorname{Var}(X)$$.

### Q: $$\operatorname{Var}(X) = 4$$, $$\operatorname{Var}(Y) = 9$$ and $$\operatorname{Cov}(X, Y) = -1.5$$. Find $$\operatorname{Var}(3X + 2Y)$$ and $$\operatorname{Var}(X - 2Y)$$, then find both again assuming $$X$$ and $$Y$$ are independent.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** apply
**A:** Key:
1. Use $$a^2\operatorname{Var}(X) + b^2\operatorname{Var}(Y) + 2ab\operatorname{Cov}(X, Y)$$: $$\operatorname{Var}(3X + 2Y) = 9(4) + 4(9) + 2(3)(2)(-1.5)$$.
2. $$\operatorname{Var}(3X + 2Y) = 36 + 36 - 18 = 54$$.
3. $$\operatorname{Var}(X - 2Y) = 4 + 4(9) + 2(1)(-2)(-1.5) = 46$$.
4. Independent means $$\operatorname{Cov} = 0$$, so the answers become 72 and 40.

Use $$\operatorname{Var}(aX + bY) = a^2\operatorname{Var}(X) + b^2\operatorname{Var}(Y) + 2ab\operatorname{Cov}(X, Y)$$.

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
**A:** Key:
1. $$\operatorname{Cov}(X, Y) = E(XY) - E(X)E(Y) = 8 - 10$$.
2. $$\operatorname{Cov}(X, Y) = -2$$.
3. A negative covariance means large $$X$$ values tend to come with small $$Y$$ values, and small with large.
4. They cannot be independent, because independent random variables have covariance 0.

$$\operatorname{Cov}(X, Y) = E(XY) - E(X)E(Y) = 8 - 10 = -2$$. A negative covariance means large $$X$$ values tend to come with small $$Y$$ values, and small with large. They cannot be independent, because independent random variables have covariance 0.

### Q: $$X_1, \dots, X_n$$ are independent, each with mean $$\mu$$ and variance $$\sigma^2$$. Derive $$E(\bar{X}) = \mu$$ and $$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$$, and name the one step that needs independence.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** derive
**A:** Key:
1. Write $$\bar{X} = \frac{X_1 + \dots + X_n}{n}$$ and use linearity: $$E(\bar{X}) = \frac{1}{n}(n\mu) = \mu$$.
2. A constant comes out of a variance squared: $$\operatorname{Var}(\bar{X}) = \frac{1}{n^2}\operatorname{Var}(X_1 + \dots + X_n)$$.
3. Every covariance is 0, so the variance of the sum is $$n\sigma^2$$, giving $$\frac{\sigma^2}{n}$$.
4. The variance-of-the-sum step is the only one that needs independence.

$$\bar{X} = \frac{X_1 + \dots + X_n}{n}$$. The mean uses only linearity. For the variance, a constant comes out of a variance squared, and independence makes every covariance 0, so the variance of the sum is the sum of the variances. That step is the only one that needs independence.

$$
\begin{aligned}
E(\bar{X}) &= \frac{1}{n}\big[E(X_1) + \dots + E(X_n)\big] = \frac{1}{n}(n\mu) = \mu \\[4pt]
\operatorname{Var}(\bar{X}) &= \frac{1}{n^2}\operatorname{Var}(X_1 + \dots + X_n) \\
&= \frac{1}{n^2}(n\sigma^2) = \frac{\sigma^2}{n}
\end{aligned}
$$

### Q: A machine fills bottles independently, each with mean 500 ml and SD 4 ml. Find the mean and SD of the total in a pack of 6, and of the average of 16 bottles. Then compare $$\operatorname{Var}(X_1 + X_2)$$ with $$\operatorname{Var}(2X_1)$$.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** apply
**A:** Key:
1. Independent bottles add means and variances: the total of 6 has mean $$6(500)$$ and variance $$6(4^2)$$.
2. The total of 6 has mean 3000 ml, variance 96 and SD $$\approx 9.80$$ ml.
3. The average of 16 has mean 500 ml, variance $$\frac{16}{16} = 1$$ and SD 1 ml.
4. $$\operatorname{Var}(X_1 + X_2) = 16 + 16 = 32$$, while $$\operatorname{Var}(2X_1) = 4(16) = 64$$.

Total of 6: mean $$6(500) = 3000$$ ml, variance $$6(16) = 96$$, SD $$\approx 9.80$$ ml. Average of 16: mean 500 ml, variance $$\frac{16}{16} = 1$$, SD 1 ml. The two variances to compare:

$$
\begin{aligned}
\operatorname{Var}(X_1 + X_2) &= 16 + 16 = 32 \\
\operatorname{Var}(2X_1) &= 4(16) = 64
\end{aligned}
$$

Two independent bottles partly cancel each other's errors; one bottle doubled doubles its error.

### Q: $$X_1$$, $$X_2$$ and $$X_3$$ are independent, with means 2, 3 and 5 and variances 1, 4 and 9. Find the mean and variance of $$Y = X_1 + X_2 + X_3$$ and of $$W = X_1 - 2X_2 + X_3$$.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** apply
**A:** Key:
1. Each coefficient is squared in the variance, so the $$-2$$ contributes $$(-2)^2(4) = 16$$.
2. $$E(Y) = 10$$ and $$\operatorname{Var}(Y) = 1 + 4 + 9 = 14$$.
3. $$E(W) = 2 - 2(3) + 5 = 1$$.
4. $$\operatorname{Var}(W) = 1 + 16 + 9 = 26$$.

Each coefficient is squared in the variance, so the $$-2$$ adds 16.

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
**A:** Key:
1. Parallel lifetime is $$V = \max$$; $$V \le v$$ means every component has failed by $$v$$, so by independence $$F_V(v) = [F(v)]^n$$.
2. By the chain rule, $$f_V(v) = n[F(v)]^{n-1} f(v)$$.
3. Series lifetime is $$U = \min$$; $$U > u$$ means every component still works, so $$F_U(u) = 1 - [1 - F(u)]^n$$.
4. $$f_U(u) = n[1 - F(u)]^{n-1} f(u)$$.

Parallel: the system runs until the last component fails, so its lifetime is $$V = \max$$. $$V \le v$$ exactly when every component has failed by $$v$$, so by independence and the chain rule:

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
**A:** Key:
1. Parallel lifetime is the max, so $$P(\max \le 100) = F(100)^3$$ with $$F(100) = 1 - e^{-0.01 \times 100} = 1 - e^{-1}$$.
2. Parallel: $$P(\max > 100) = 1 - 0.632^3 \approx 0.747$$.
3. Series lifetime is the min: $$P(\min > 100) = (e^{-1})^3 = e^{-3} \approx 0.050$$.

One component first. Then the parallel system, whose lifetime is the max, and the series system, whose lifetime is the min. Parallel needs all three to fail; series needs only one.

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
**A:** Key:
1. The system lifetime is the max, so multiply the two different cdfs: $$F_V(5) = (1 - e^{-0.5})(1 - e^{-1})$$.
2. $$F_V(5) = 0.3935 \times 0.6321 \approx 0.249$$.

The system lifetime is the max, and the components are not identically distributed, so multiply the two different cdfs:

$$
\begin{aligned}
F_V(5) &= F_1(5)\,F_2(5) = \big(1 - e^{-0.5}\big)\big(1 - e^{-1}\big) \\
&= 0.3935 \times 0.6321 \approx 0.249
\end{aligned}
$$

The $$[F(v)]^n$$ shortcut applies only when every component has the same cdf.

### Q: A question says $$X_1, \dots, X_n$$ are a random sample from a distribution with mean $$\mu$$ and variance $$\sigma^2$$. What two assumptions does "random sample" carry, and which of $$E(\bar{X}) = \mu$$ and $$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$$ needs which?
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** derive
**A:** Key:
1. A random sample means the $$X_i$$ are independent and identically distributed (iid).
2. $$E(\bar{X}) = \mu$$ needs only the common mean, because the mean of a sum always adds.
3. $$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$$ needs the common variance and also independence, which makes every covariance term 0.

- A random sample means the $$X_i$$ are independent and identically distributed, often written iid. Independent means no value affects another. Identically distributed means they all come from one distribution, so they share the mean $$\mu$$ and the variance $$\sigma^2$$.
- $$E(\bar{X}) = \mu$$ needs only the common mean, because the mean of a sum always adds.
- $$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$$ needs the common variance and also independence, which makes every covariance term 0 so that the variances add.

### Q: True or false, and justify each: (a) $$\operatorname{Cov}(X, Y) = 50$$ shows that $$X$$ and $$Y$$ are strongly related. (b) If $$X$$ and $$Y$$ are independent, then $$\operatorname{Cov}(X, Y) = 0$$. (c) If $$\operatorname{Cov}(X, Y) = 0$$, then $$X$$ and $$Y$$ are independent.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 10  **Type:** critique
**A:** Key:
1. (a) False: covariance gives only the direction of a linear relationship, and its size depends on the units.
2. (b) True: independence gives $$E(XY) = E(X)E(Y)$$, so $$\operatorname{Cov}(X, Y) = 0$$.
3. (c) False: a covariance of 0 rules out a linear relationship, not every kind of dependence.

- (a) False. Covariance gives only the direction of a linear relationship, and a positive value means the two tend to rise together. Its size depends on the units, so it says nothing about strength. The correlation, in Chapter 11, measures strength.
- (b) True. Independence gives $$E(XY) = E(X)E(Y)$$, so $$\operatorname{Cov}(X, Y) = E(XY) - E(X)E(Y) = 0$$.
- (c) False. The deck states only the direction in (b). A covariance of 0 rules out a linear relationship, not every kind of dependence.

### Q: $$X$$ is continuous with pdf $$f$$, cdf $$F$$ and median $$m$$. Which of these are true? (a) $$F(m) = 0.5$$ (b) $$\int_{-\infty}^{m} f(x)\,dx = 0.5$$ (c) $$\int_{m}^{\infty} f(x)\,dx = 0.5$$ (d) $$P(X > m) = 0.5$$
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** 10  **Type:** apply
**A:** Key:
1. All four are true.
2. (a) defines the median through the cdf, and (b) is the same statement as an integral, since $$F(m) = \int_{-\infty}^{m} f(x)\,dx$$.
3. (c) holds because the total area is 1, leaving $$1 - 0.5 = 0.5$$ to the right of $$m$$, and (d) is (c) as a probability.

- All four are true. The median splits the area under $$f$$ in half.
- (a) defines the median through the cdf.
- (b) is the same statement as an integral, since $$F(m) = \int_{-\infty}^{m} f(x)\,dx$$.
- (c) is the other half. The total area is 1, so the area to the right of $$m$$ is $$1 - 0.5 = 0.5$$.
- (d) is (c) written as a probability.
- In lecture 10 this was an iClicker whose answer was "all of these", and 79% got it. The trap was stopping at the first true option.

## Lec 11 — Ch 4: in-class Activity 3, expectation and variance of discrete random variables (logged 2026-10-05 from the activity sheets)

### Q: A four-sided die has faces $$-2$$, $$0$$, $$1$$ and $$3$$ with probabilities $$k$$, $$2k$$, $$3k$$ and $$4k$$. Find $$k$$, then $$E(X)$$, $$E(X^2)$$ and $$\operatorname{Var}(X)$$.
**Topic:** 3d Mean and variance of a discrete random variable (long-run average · E of a function of X · variance by definition and by the shortcut · not the sample mean)  **Lec:** 11  **Type:** apply
**A:** Key:
1. The probabilities sum to 1: $$k + 2k + 3k + 4k = 10k = 1$$.
2. $$k = 0.1$$.
3. $$E(X) = -2(0.1) + 0(0.2) + 1(0.3) + 3(0.4) = 1.3$$.
4. $$E(X^2) = 4(0.1) + 1(0.3) + 9(0.4) = 4.3$$.
5. $$\operatorname{Var}(X) = 4.3 - 1.3^2 = 2.61$$.

The probabilities sum to 1, so $$10k = 1$$ and $$k = 0.1$$. Each probability is then between 0 and 1, as a pmf needs.

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
**A:** Key:
1. Use the linear rules: $$E(Y) = 3E(X) + 2$$ and $$\operatorname{Var}(Y) = 3^2\operatorname{Var}(X)$$.
2. $$Y$$ takes $$-4$$, 2, 5 and 11 with the same probabilities 0.1, 0.2, 0.3 and 0.4.
3. $$E(Y) = 3(1.3) + 2 = 5.9$$.
4. $$\operatorname{Var}(Y) = 3^2(2.61) = 23.49$$.
5. The $$+2$$ shifts the mean by 2 and does nothing to the variance, because moving every value equally leaves the spread unchanged.

$$Y$$ takes $$-4$$, $$2$$, $$5$$ and $$11$$ with the same probabilities 0.1, 0.2, 0.3 and 0.4.

$$
\begin{aligned}
E(Y) &= 3(1.3) + 2 = 5.9 \\
\operatorname{Var}(Y) &= 3^2(2.61) = 23.49
\end{aligned}
$$

The $$+2$$ shifts the mean by 2 and does nothing to the variance, because moving every value by the same amount leaves the spread unchanged. The 3 multiplies the mean by 3 and the variance by 9.

### Q: For the same die (faces $$-2, 0, 1, 3$$ with probabilities 0.1, 0.2, 0.3, 0.4; $$E(X) = 1.3$$), find $$E(X^3)$$ and compare it with $$[E(X)]^3$$. Why can no shortcut rule give $$E(X^3)$$?
**Topic:** 3d Mean and variance of a discrete random variable (long-run average · E of a function of X · variance by definition and by the shortcut · not the sample mean)  **Lec:** 11  **Type:** apply
**A:** Key:
1. Compute from the pmf: $$E(X^3) = -8(0.1) + 0 + 1(0.3) + 27(0.4)$$.
2. $$E(X^3) = 10.3$$.
3. $$[E(X)]^3 = 1.3^3 = 2.197$$, so the two are not equal.
4. The rules move constants through $$E$$ only for linear $$aX + b$$; any other $$g$$ needs $$E[g(X)] = \sum g(x) f(x)$$ from the pmf.


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
**A:** Key:
1. A sum of $$-2$$ comes from $$(-3, 1)$$, $$(1, -3)$$ or $$(-1, -1)$$, and independent rolls multiply: $$2(0.2)(0.1) + 0.3^2$$.
2. $$P(W_A = -2) = 0.13$$.
3. Both means are 0.
4. $$\operatorname{Var}(W_A) = 3.8 + 3.8 = 7.6$$ and $$\operatorname{Var}(W_B) = 2^2(3.8) = 15.2$$.
5. Game B is riskier: same mean, twice the variance.

A sum of $$-2$$ comes from $$(-3, 1)$$, $$(1, -3)$$ or $$(-1, -1)$$, and independent rolls multiply.

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
**A:** Key:
1. False: $$X_1 + X_2$$ and $$2X$$ have the same mean, $$2\mu$$, but not the same distribution or variance.
2. Independent variances add, so $$\operatorname{Var}(X_1 + X_2) = 2\sigma^2$$.
3. A constant multiple squares, so $$\operatorname{Var}(2X) = 4\sigma^2$$.

False. They have the same mean, $$2\mu$$, but not the same distribution or variance. Independent variances add, so $$\operatorname{Var}(X_1 + X_2) = 2\sigma^2$$, while a constant multiple squares, so $$\operatorname{Var}(2X) = 4\sigma^2$$. In general the sum of $$n$$ independent copies has variance $$n\sigma^2$$ and $$nX$$ has $$n^2\sigma^2$$. Two rolls can land high and low and partly cancel; doubling one roll scales every deviation by 2.

### Q: In Game A (sum of two independent rolls of the die with faces $$-3, -1, 1, 2$$ and probabilities 0.2, 0.3, 0.1, 0.4), find $$P(W_A = -6)$$ and $$P(W_A = 4)$$, and give the two ways to get $$E(W_A)$$.
**Topic:** 3a–b Random variables and the pmf (X as a function on S · possible values · discrete vs continuous · pmf properties · find the constant · probability statements)  **Lec:** 11  **Type:** apply
**A:** Key:
1. Independent rolls multiply: $$-6$$ needs two $$-3$$s and 4 needs two 2s.
2. $$P(W_A = -6) = 0.2^2 = 0.04$$.
3. $$P(W_A = 4) = 0.4^2 = 0.16$$.
4. One way to the mean is the definition $$E(W_A) = \sum w f(w)$$ over the nine possible sums.
5. The other is $$E(X_1 + X_2) = E(X_1) + E(X_2) = 0$$, which holds even without independence.

$$-6$$ needs two $$-3$$s: $$0.2^2 = 0.04$$. $$4$$ needs two 2s: $$0.4^2 = 0.16$$. The two ways to get the mean are the definition $$E(W_A) = \sum w f(w)$$ over the nine possible sums, and the rule $$E(X_1 + X_2) = E(X_1) + E(X_2) = 0$$, which holds even without independence.

## WeBWorK 4 — Ch 4 (opened Oct 6, due Thu Oct 15; banked 2026-10-06, numbers changed)

### Q: WeBWorK-style. A repair time $$T$$ is exponential with mean 5 hours. Given that a repair has already taken more than 10 hours, what is the probability it takes at least 10.5 hours? Pick the right form: $$e^{-0.1}$$, $$1 - e^{-0.1}$$, $$e^{-2.1}$$ or $$1 - \frac{1}{5}e^{-0.1}$$.
**Topic:** 3g–i Mean, variance, uniform and exponential (E and Var by integration · the shortcut · uniform mean and variance · exponential mean and variance by parts · median from F)  **Lec:** WW4  **Type:** apply
**A:** Key:
1. Condition with $$\lambda = \frac{1}{5}$$ and $$P(T > t) = e^{-t/5}$$: $$P(T \ge 10.5 \mid T > 10) = \frac{e^{-10.5/5}}{e^{-10/5}}$$.
2. The answer is $$e^{-0.1} \approx 0.905$$.
3. The exponential is memoryless: having lasted 10 hours does not change the chance of lasting another half hour.

The answer is $$e^{-0.1} \approx 0.905$$. The exponential is memoryless: having already lasted 10 hours does not change the chance of lasting another half hour. With mean 5 the rate is $$\lambda = \frac{1}{5}$$, and $$P(T > t) = e^{-t/5}$$.

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
**A:** Key:
1. Series: $$Y = \min(X_1, \dots, X_4)$$, so $$P(Y > y) = (e^{-y/120})^4$$.
2. $$P(Y > y) = e^{-y/30}$$, so $$Y$$ is exponential with mean 30 hours.
3. Parallel: $$Y = \max(X_1, \dots, X_4)$$, with cdf $$(1 - e^{-y/120})^4$$.
4. The maximum is not exponential, because that cdf is not of the form $$1 - e^{-\lambda y}$$.

(1) A series system dies when the first component dies, so $$Y = \min(X_1, \dots, X_4)$$. The minimum of independent exponentials is exponential with the rates added:

$$
\begin{aligned}
P(Y > y) &= \left(e^{-y/120}\right)^4 \\
&= e^{-4y/120} = e^{-y/30}
\end{aligned}
$$

So $$Y$$ is exponential with mean 30 hours. (2) A parallel system runs until the last component dies, so $$Y = \max(X_1, \dots, X_4)$$, with cdf $$\left(1 - e^{-y/120}\right)^4$$. That is not of the form $$1 - e^{-\lambda y}$$, so the maximum is not exponential. The WeBWorK distractors pair "max" with an exponential mean, or multiply the mean instead of dividing it.

### Q: WeBWorK-style. $$X$$ is uniform on $$[0, 2]$$ and $$Y = e^X$$. Find the pdf of $$Y$$, including its support, by the cdf method.
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** WW4  **Type:** derive
**A:** Key:
1. Cdf method: since $$e^x$$ is increasing, $$F_Y(y) = P(X \le \ln y)$$.
2. With the uniform cdf, $$F_Y(y) = \frac{\ln y - 0}{2}$$.
3. Differentiating gives $$f_Y(y) = \frac{1}{2y}$$.
4. The support is $$1 \le y \le e^2$$, with $$f_Y(y) = 0$$ otherwise.

Write the cdf of $$Y$$ as a statement about $$X$$, use the uniform cdf, then differentiate. Since $$e^x$$ is increasing, $$Y \le y$$ exactly when $$X \le \ln y$$, and $$Y$$ runs from $$e^0 = 1$$ to $$e^2$$.

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
**A:** Key:
1. Because $$e^x$$ is increasing, the median of $$e^X$$ is $$e$$ raised to the median of $$X$$, which is 1.5.
2. The median of $$e^X$$ is $$e^{1.5} \approx 4.48$$.
3. The mean does not carry over, because $$E(e^X) \ne e^{E(X)}$$.

The median of $$X$$ is 1.5. Because $$e^x$$ is increasing, half the values of $$X$$ lie below 1.5 exactly when half the values of $$e^X$$ lie below $$e^{1.5}$$, so the median of $$e^X$$ is $$e^{1.5} \approx 4.48$$. Solving $$F_Y(m) = 0.5$$ gives the same: $$\frac{\ln m}{3} = 0.5$$, so $$m = e^{1.5}$$. The mean does not carry over, because $$E(e^X) \ne e^{E(X)}$$. Here $$E(e^X) = \frac{e^3 - 1}{3} \approx 6.36$$, larger than 4.48 because $$e^x$$ bends upward.

## Lec 12 — Ch 4: maximum and minimum of independent random variables, functions of one random variable (logged 2026-10-08 from the after-class deck and the recording; Matt absent)

### Q: $$X_1, \dots, X_n$$ are independent with the same cdf $$F$$. Derive the cdf of $$U = \min\{X_1, \dots, X_n\}$$, and say why the derivation starts from $$P(U > u)$$ instead of $$P(U \le u)$$.
**Topic:** 3m–n Maximum and minimum of independent random variables (cdf of the max is the product of the cdfs · pdf by the chain rule · parallel lifetime is the max · series lifetime is the min · flood levels)  **Lec:** 12  **Type:** derive
**A:** Key:
1. Start from the complement: $$F_U(u) = 1 - P(U > u)$$, where $$U > u$$ means every $$X_i$$ is above $$u$$.
2. By independence, $$P(U > u) = P(X_1 > u) \cdots P(X_n > u) = [1 - F(u)]^n$$.
3. So $$F_U(u) = 1 - [1 - F(u)]^n$$.
4. $$U \le u$$ is a union of events, which does not factor; $$U > u$$ is an intersection, which independence turns into a product.

$$U \le u$$ only says that at least one $$X_i$$ is at most $$u$$. That is a union of events, and a union does not factor under independence. $$U > u$$ says every $$X_i$$ is above $$u$$, an intersection, and independence turns an intersection into a product. So take the complement first, factor, then complement back.

$$
\begin{aligned}
F_U(u) &= 1 - P(U > u) \\
&= 1 - P(X_1 > u) \cdots P(X_n > u) \\
&= 1 - \big[1 - F(u)\big]^n
\end{aligned}
$$

The maximum needs no complement because $$V \le v$$ is already the intersection of every $$X_i \le v$$.

### Q: $$X_1$$, $$X_2$$ and $$X_3$$ are independent with cdfs $$F_1$$, $$F_2$$, $$F_3$$ and pdfs $$f_1$$, $$f_2$$, $$f_3$$ that are not all the same. Write the cdf and pdf of $$V = \max\{X_1, X_2, X_3\}$$. Which step of the lecture's derivation is no longer available, and what replaces the chain rule?
**Topic:** 3m–n Maximum and minimum of independent random variables (cdf of the max is the product of the cdfs · pdf by the chain rule · parallel lifetime is the max · series lifetime is the min · flood levels)  **Lec:** 12  **Type:** derive
**A:** Key:
1. Independence still gives the product: $$F_V(v) = F_1(v)\,F_2(v)\,F_3(v)$$.
2. The step no longer available is turning the product into the power $$[F(v)]^3$$, which needs identical distributions.
3. The product rule replaces the chain rule, with one term per factor differentiated.
4. $$f_V(v) = f_1(v)F_2(v)F_3(v) + F_1(v)f_2(v)F_3(v) + F_1(v)F_2(v)f_3(v)$$.

Independence still gives the product of the cdfs. The step that is gone is the last one, where identical distributions turn the product into the power $$[F(v)]^3$$. With three different factors the pdf comes from the product rule, one term per factor differentiated.

$$
\begin{aligned}
F_V(v) &= F_1(v)\,F_2(v)\,F_3(v) \\
f_V(v) &= f_1(v)\,F_2(v)\,F_3(v) \\
&\quad + F_1(v)\,f_2(v)\,F_3(v) \\
&\quad + F_1(v)\,F_2(v)\,f_3(v)
\end{aligned}
$$

Check: when the three are the same, every term is $$F^2 f$$ and the sum is $$3F^2 f$$, the chain-rule answer.

### Q: Five independent components each have an exponential lifetime with rate 0.2 per year. Write the pdf of the lifetime of the parallel system and of the series system. Which one has a standard name, and what is the mean lifetime of the series system?
**Topic:** 3m–n Maximum and minimum of independent random variables (cdf of the max is the product of the cdfs · pdf by the chain rule · parallel lifetime is the max · series lifetime is the min · flood levels)  **Lec:** 12  **Type:** apply
**A:** Key:
1. Parallel is the max and series the min, with $$F(x) = 1 - e^{-0.2x}$$ and $$f(x) = 0.2e^{-0.2x}$$ for one component.
2. $$f_V(v) = 5(1 - e^{-0.2v})^4(0.2)e^{-0.2v}$$ for $$v > 0$$.
3. $$F_U(u) = 1 - (e^{-0.2u})^5 = 1 - e^{-u}$$, so $$f_U(u) = e^{-u}$$ for $$u > 0$$.
4. The minimum has the standard name: it is exponential with rate $$5 \times 0.2 = 1$$ per year.
5. The series system's mean lifetime is 1 year.

For one component $$F(x) = 1 - e^{-0.2x}$$ and $$f(x) = 0.2e^{-0.2x}$$ for $$x > 0$$. The parallel lifetime is the maximum, the series lifetime is the minimum.

$$
\begin{aligned}
f_V(v) &= 5\big(1 - e^{-0.2v}\big)^4\,(0.2)e^{-0.2v} \\[4pt]
F_U(u) &= 1 - \big(e^{-0.2u}\big)^5 = 1 - e^{-u} \\
f_U(u) &= e^{-u}
\end{aligned}
$$

Both are for positive arguments and 0 otherwise. The minimum is exponential with rate $$5 \times 0.2 = 1$$ per year, so the series system has mean lifetime 1 year, a fifth of one component's 5 years. The maximum has no standard name; its cdf $$(1 - e^{-0.2v})^5$$ is not of the form $$1 - e^{-\lambda v}$$.

### Q: $$X_1 \sim U(0, 10)$$ and $$X_2 \sim U(6, 12)$$ are independent, and $$Y = \max\{X_1, X_2\}$$. Give the support of $$Y$$, and say why $$F_Y$$ has one formula on $$[6, 10]$$ and a different one on $$(10, 12]$$. Do not compute the pdf.
**Topic:** 3m–n Maximum and minimum of independent random variables (cdf of the max is the product of the cdfs · pdf by the chain rule · parallel lifetime is the max · series lifetime is the min · flood levels)  **Lec:** 12  **Type:** apply
**A:** Key:
1. $$F_Y(y) = F_{X_1}(y)\,F_{X_2}(y)$$, and its formula changes wherever either factor changes formula.
2. The support is $$[6, 12]$$, because $$Y$$ is at least $$X_2$$, never below 6, and neither variable exceeds 12.
3. On $$[6, 10]$$ both factors are linear: $$F_Y(y) = \frac{y}{10} \cdot \frac{y - 6}{6}$$.
4. Past 10, $$F_{X_1}(y) = 1$$, so $$F_Y(y) = \frac{y - 6}{6}$$ on $$(10, 12]$$.

The support is $$[6, 12]$$. $$Y$$ is at least $$X_2$$, which is never below 6, and neither variable is ever above 12. $$F_Y(y) = F_{X_1}(y)\,F_{X_2}(y)$$, and the formula changes wherever either factor changes formula.

$$
\begin{aligned}
F_Y(y) &= \frac{y}{10} \cdot \frac{y - 6}{6} \quad (6 \le y \le 10) \\[4pt]
F_Y(y) &= 1 \cdot \frac{y - 6}{6} \quad (10 < y \le 12)
\end{aligned}
$$

On $$[6, 10]$$ both cdfs are strictly between 0 and 1, so both factors are linear. Past 10, $$X_1$$ is certainly at most $$y$$, so $$F_{X_1}(y) = 1$$ and only $$F_{X_2}$$ is left. Below 6, $$F_{X_2}(y) = 0$$ so $$F_Y(y) = 0$$ even though $$F_{X_1}$$ is positive there.

### Q: $$X$$ has pdf $$f_X$$ on $$[-2, 2]$$, and $$Y = X^2$$. Write $$F_Y(y)$$ as a probability statement about $$X$$, say why it is not $$P(X \le \sqrt{y})$$, and give the support of $$Y$$. How does the answer change if $$X$$ lives on $$[0, 2]$$ instead?
**Topic:** 3l Functions of one random variable (cdf method: F_Y from F_X · differentiate for the pdf · the new support · Y = X² needs both roots)  **Lec:** 12  **Type:** derive
**A:** Key:
1. $$X^2 \le y$$ means $$|X| \le \sqrt{y}$$, so $$F_Y(y) = P(-\sqrt{y} \le X \le \sqrt{y}) = F_X(\sqrt{y}) - F_X(-\sqrt{y})$$.
2. $$P(X \le \sqrt{y})$$ is wrong because it also counts $$X < -\sqrt{y}$$, where $$X^2 > y$$.
3. The support of $$Y$$ is $$[0, 4]$$.
4. If $$X$$ lives on $$[0, 2]$$, then $$P(X < -\sqrt{y}) = 0$$ and $$F_Y(y) = F_X(\sqrt{y})$$ alone.

$$X^2 \le y$$ means $$|X| \le \sqrt{y}$$, so both roots bound the event. The support of $$Y$$ is $$[0, 4]$$.

$$
\begin{aligned}
F_Y(y) &= P(-\sqrt{y} \le X \le \sqrt{y}) \\
&= F_X(\sqrt{y}) - F_X(-\sqrt{y})
\end{aligned}
$$

$$P(X \le \sqrt{y})$$ is wrong because it also counts $$X < -\sqrt{y}$$, where $$X^2 > y$$, and $$f_X$$ puts probability on negative values. If $$X$$ lives on $$[0, 2]$$, then $$P(X < -\sqrt{y}) = 0$$ and $$F_Y(y) = F_X(\sqrt{y})$$ alone. The pdf follows by the chain rule either way: $$f_Y(y) = \frac{f_X(\sqrt{y}) + f_X(-\sqrt{y})}{2\sqrt{y}}$$, with the second term dropped when $$X$$ is never negative.

### Q: $$X_1 \sim U(20, 40)$$ and $$X_2 \sim U(35, 50)$$ are independent and $$Y = \max\{X_1, X_2\}$$. On an exam a student writes $$F_Y(y) = \frac{y - 20}{20} \cdot \frac{y - 35}{15}$$ and differentiates it. Name the two things the instructor said must be written here, and supply what is missing.
**Topic:** 3m–n Maximum and minimum of independent random variables (cdf of the max is the product of the cdfs · pdf by the chain rule · parallel lifetime is the max · series lifetime is the min · flood levels)  **Lec:** 12  **Type:** critique
**A:** Key:
1. The product step needs "by independence" written beside it, because multiplying the cdfs is allowed only since $$X_1$$ and $$X_2$$ are independent.
2. The cdf must be given for all real numbers, not on one range only.
3. $$F_Y(y) = 0$$ for $$y < 35$$ and $$F_Y(y) = 1$$ for $$y > 50$$.
4. $$F_Y(y) = \frac{(y - 20)(y - 35)}{300}$$ on $$[35, 40]$$ and $$\frac{y - 35}{15}$$ on $$(40, 50]$$, since $$F_{X_1} = 1$$ past 40.
5. The pdf is $$\frac{2y - 55}{300}$$ on $$[35, 40]$$, $$\frac{1}{15}$$ on $$(40, 50]$$, and 0 elsewhere.

First, the product step has no reason beside it. Multiplying $$P(X_1 \le y)$$ by $$P(X_2 \le y)$$ is only allowed because $$X_1$$ and $$X_2$$ are independent, and he said not to write the product down without "by independence" beside it. Second, the cdf is stated on one range only, and he said a cdf must be given for all real numbers.

$$
F_Y(y) =
\begin{cases}
0 & y < 35 \\[2pt]
\dfrac{(y - 20)(y - 35)}{300} & 35 \le y \le 40 \\[6pt]
\dfrac{y - 35}{15} & 40 < y \le 50 \\[6pt]
1 & y > 50
\end{cases}
$$

The middle piece stops at 40 because $$F_{X_1}$$ is already 1 past 40, and the product is 0 below 35 because $$F_{X_2}$$ is. The pdf comes from differentiating every piece: $$\frac{2y - 55}{300}$$ on $$[35, 40]$$, $$\frac{1}{15}$$ on $$(40, 50]$$, and 0 elsewhere.

## Lec 13 — Ch 5: the Normal and standard Normal distributions (logged 2026-10-09 from the decks, the activity sheet and the recording)

### Q: Grade 7 vocabulary scores are close to $$N(7.2, 1.4^2)$$. Without a table, give the percent of scores between 4.4 and 10.0, the percent above 5.8, and the percent below 3.0. Say which rule you are using and why the second answer is not 68%.
**Topic:** 3o Normal distribution and the empirical rule (symmetric bell shape · μ sets the centre and equals the median · σ sets the spread · N(μ, σ²) carries the variance · 68-95-99.7 rule · pdf formula)  **Lec:** 13  **Type:** apply
**A:** Key:
1. Use the 68-95-99.7 rule, because every bound is a whole number of standard deviations from the mean.
2. 4.4 and 10.0 are $$7.2 \pm 2(1.4)$$, so about 95% of scores lie between them.
3. 5.8 is $$\mu - \sigma$$, so $$34\% + 50\% = 84\%$$ lie above it.
4. 3.0 is $$\mu - 3\sigma$$, so about 0.15% lie below it.
5. It is not 68% because 68% is the share within one SD on both sides, while above $$\mu - \sigma$$ also includes everything beyond.

The 68-95-99.7 rule, because every bound is a whole number of standard deviations from the mean. 4.4 and 10.0 are $$7.2 \pm 2(1.4)$$, so about 95% lie between them. 5.8 is $$\mu - \sigma$$, so above it lies half of the middle 68% plus the whole upper half: $$34\% + 50\% = 84\%$$. 3.0 is $$\mu - 3\sigma$$, so below it lies half of the 0.3% outside three standard deviations, about 0.15%. The second answer is not 68% because 68% is the share within one standard deviation on both sides; "above $$\mu - \sigma$$" keeps the right half of that band and everything beyond it.

### Q: Heights of women aged 20 to 29 are about $$N(65.1, 2.6^2)$$ inches. Find the z-scores of a woman 71 inches tall and one 59 inches tall, and say in words what each number means. Which of the two is more unusual?
**Topic:** 3p Z-scores and standard Normal calculations (z = (x − μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** 13  **Type:** apply
**A:** Key:
1. Standardise: $$z_{71} = \frac{71 - 65.1}{2.6}$$ and $$z_{59} = \frac{59 - 65.1}{2.6}$$.
2. $$z_{71} = 2.27$$: the first woman is 2.27 standard deviations above the mean.
3. $$z_{59} = -2.35$$: the second woman is 2.35 standard deviations below the mean.
4. The 59-inch woman is slightly more unusual, because $$|{-2.35}| > 2.27$$.


$$
\begin{aligned}
z_{71} &= \frac{71 - 65.1}{2.6} = 2.27 \\[4pt]
z_{59} &= \frac{59 - 65.1}{2.6} = -2.35
\end{aligned}
$$

The first woman is 2.27 standard deviations above the mean, the second 2.35 standard deviations below it. The sign gives the side of the mean and the size gives the distance. The 59-inch woman is slightly more unusual, because $$|{-2.35}| > 2.27$$.

### Q: A student scored 620 on the SAT, where scores are $$N(500, 100^2)$$, and 29 on the ACT, where scores are $$N(21, 4.7^2)$$. Which score is relatively higher, and what makes the comparison legitimate?
**Topic:** 3p Z-scores and standard Normal calculations (z = (x − μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** 13  **Type:** apply
**A:** Key:
1. Standardise both scores: $$\frac{620 - 500}{100}$$ for the SAT and $$\frac{29 - 21}{4.7}$$ for the ACT.
2. The z-scores are 1.20 for the SAT and 1.70 for the ACT.
3. The ACT score is relatively higher.
4. The comparison is legitimate because both are Normal, and standardising puts each on the same $$N(0, 1)$$ scale.

Standardise both. The SAT z-score is $$\frac{620 - 500}{100} = 1.20$$ and the ACT z-score is $$\frac{29 - 21}{4.7} = 1.70$$. The ACT score is relatively higher: it sits 1.70 standard deviations above its mean against 1.20 for the SAT. The comparison works because both distributions are Normal, and standardising turns each into the same $$N(0, 1)$$ scale, so the two z-scores are positions on one curve. In table terms the SAT score beats about 88.5% of takers and the ACT score about 95.5%.

### Q: Using Table A, find $$P(-1.40 < Z < 0.95)$$. Show the two table values you look up and the arithmetic. Then write the one-line R command that gives the same number.
**Topic:** 3p Z-scores and standard Normal calculations (z = (x − μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** 13  **Type:** apply
**A:** Key:
1. Subtract two left areas: $$P(-1.40 < Z < 0.95) = P(Z < 0.95) - P(Z < -1.40)$$.
2. The table values are 0.8289 and 0.0808.
3. $$P(-1.40 < Z < 0.95) = 0.8289 - 0.0808 = 0.7481$$.
4. In R: `pnorm(0.95) - pnorm(-1.40)`.

Table A gives areas to the left, so the area between two values is the difference of two left areas.

$$
\begin{aligned}
P(-1.40 < Z < 0.95) &= P(Z < 0.95) - P(Z < -1.40) \\
&= 0.8289 - 0.0808 \\
&= 0.7481
\end{aligned}
$$

In R: `pnorm(0.95) - pnorm(-1.40)`.

### Q: SAT reading scores are $$N(500, 100^2)$$ and you scored 680. What proportion of takers did better than you? Work it through the deck's three steps, and give both R commands, with and without standardising.
**Topic:** 3p Z-scores and standard Normal calculations (z = (x − μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** 13  **Type:** apply
**A:** Key:
1. Standardise the right tail: $$P(X > 680) = P\left(Z > \frac{680 - 500}{100}\right) = P(Z > 1.80)$$.
2. Table A gives 0.9641, so $$P(X > 680) = 1 - 0.9641 = 0.0359$$, about 3.6% of takers.
3. Standardised in R: `pnorm(1.8, lower.tail = FALSE)`.
4. Unstandardised in R: `pnorm(680, mean = 500, sd = 100, lower.tail = FALSE)`, with `sd` the standard deviation.

Step 1, the proportion wanted is $$P(X > 680)$$, the right tail past 680. Step 2, standardise: $$z = \frac{680 - 500}{100} = 1.80$$, so the question is $$P(Z > 1.80)$$. Step 3, Table A gives the left area 0.9641, and the total area is 1.

$$
\begin{aligned}
P(X > 680) &= P(Z > 1.80) \\
&= 1 - 0.9641 \\
&= 0.0359
\end{aligned}
$$

About 3.6% did better. In R: `pnorm(1.8, lower.tail = FALSE)` or `pnorm(680, mean = 500, sd = 100, lower.tail = FALSE)`. The `sd` argument is 100, the standard deviation, even though the course writes the distribution with $$100^2$$.

### Q: SAT reading scores are $$N(500, 100^2)$$. How high must a student score to be in the top 5%? State the backward three-step method as you go, and say what you do when the table has no entry that is exactly the proportion you want.
**Topic:** 3p Z-scores and standard Normal calculations (z = (x − μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** 13  **Type:** apply
**A:** Key:
1. Backward method: top 5% means 0.95 to the left of $$x$$; find $$z$$ with left area 0.95, then unstandardise with $$x = \mu + z\sigma$$.
2. The $$z$$ with left area 0.95 lies between 1.64 and 1.65 in Table A, so $$z = 1.645$$.
3. $$x = 500 + 1.645 \times 100 = 664.5$$, so a score of about 665 is needed.
4. With no exact table entry, use the closest table probability and its $$z$$.

Step 1, top 5% means a cumulative proportion of 0.95 below the unknown score $$x$$; draw the curve with 0.95 to the left of $$x$$. Step 2, find the $$z$$ whose left area is 0.95. Table A has 0.9495 at $$z = 1.64$$ and 0.9505 at $$z = 1.65$$, so take the closer entry, or $$z = 1.645$$ when the question allows the midpoint. Step 3, unstandardise.

$$
\begin{aligned}
x &= \mu + z\sigma \\
&= 500 + 1.645 \times 100 \\
&= 664.5
\end{aligned}
$$

A score of about 665 is needed. When no entry matches exactly, the deck's rule is to use the closest table probability and its $$z$$; $$z = 1.64$$ or $$1.65$$ gives 664 or 665, and either is accepted.

### Q: Table A only lists areas to the left of $$z$$, and only for a limited range. Explain why one such table is enough for every Normal probability, and write $$P(Z > 1.30)$$ in three equivalent ways, with its value.
**Topic:** 3p Z-scores and standard Normal calculations (z = (x − μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** 13  **Type:** derive
**A:** Key:
1. Every Normal standardises to $$N(0, 1)$$ by $$Z = \frac{X - \mu}{\sigma}$$, so one curve serves every $$\mu$$ and $$\sigma$$.
2. The standard Normal is symmetric about zero, so a right tail equals the matching left tail.
3. Any area is one minus its complement.
4. $$P(Z > 1.30) = 1 - P(Z \le 1.30) = P(Z < -1.30)$$.
5. $$P(Z > 1.30) = 1 - 0.9032 = 0.0968$$.

Two facts. Every Normal variable standardises to $$N(0, 1)$$ by $$Z = \frac{X - \mu}{\sigma}$$, so one curve serves every $$\mu$$ and $$\sigma$$. And the standard Normal is symmetric about zero, so a right tail equals the matching left tail, and any area is one minus its complement.

$$
\begin{aligned}
P(Z > 1.30) &= 1 - P(Z \le 1.30) \\
&= P(Z < -1.30) \\
&= 1 - 0.9032 = 0.0968
\end{aligned}
$$

### Q: $$X \sim N(\mu, \sigma^2)$$ and $$Z = \frac{X - \mu}{\sigma}$$. Using the lecture 10 rules for the mean and variance of $$aX + b$$, show that $$Z$$ has mean 0 and variance 1. What extra fact, not provable from those rules, does the deck add about the distribution of $$Z$$?
**Topic:** 3o Normal distribution and the empirical rule (symmetric bell shape · μ sets the centre and equals the median · σ sets the spread · N(μ, σ²) carries the variance · 68-95-99.7 rule · pdf formula)  **Lec:** 13  **Type:** derive
**A:** Key:
1. Write $$Z = aX + b$$ with $$a = \frac{1}{\sigma}$$ and $$b = -\frac{\mu}{\sigma}$$.
2. $$E(Z) = \frac{1}{\sigma}E(X) - \frac{\mu}{\sigma} = 0$$.
3. $$\operatorname{Var}(Z) = \frac{1}{\sigma^2}\operatorname{Var}(X) = 1$$.
4. The extra fact is that a linear transformation of a Normal variable is still Normal, so $$Z \sim N(0, 1)$$ exactly.

Write $$Z = aX + b$$ with $$a = \frac{1}{\sigma}$$ and $$b = -\frac{\mu}{\sigma}$$.

$$
\begin{aligned}
E(Z) &= \frac{1}{\sigma} E(X) - \frac{\mu}{\sigma} \\
&= \frac{\mu - \mu}{\sigma} = 0 \\[4pt]
\operatorname{Var}(Z) &= \frac{1}{\sigma^2} \operatorname{Var}(X) \\
&= \frac{\sigma^2}{\sigma^2} = 1
\end{aligned}
$$

The rules give the mean and variance of $$Z$$ for any $$X$$, Normal or not. The extra fact is that a linear transformation of a Normal variable is still Normal, so $$Z \sim N(0, 1)$$ exactly. That is why Table A applies, and it is outcome 3o's "preservation under linear transformation".

### Q: $$Y \sim N(300, 36)$$ in this course's notation. Give the mean, the variance and the standard deviation of $$Y$$. What would the same symbols mean in a textbook that writes the standard deviation second?
**Topic:** 3o Normal distribution and the empirical rule (symmetric bell shape · μ sets the centre and equals the median · σ sets the spread · N(μ, σ²) carries the variance · 68-95-99.7 rule · pdf formula)  **Lec:** 13  **Type:** apply
**A:** Key:
1. In this course the second number is the variance.
2. The mean is 300, the variance is 36 and the standard deviation is 6.
3. A textbook writing $$N(\text{mean}, \text{SD})$$ would mean a standard deviation of 36, a variance of 1296.

The second number is the variance, so the mean is 300, the variance is 36 and the standard deviation is 6. A textbook that writes $$N(\text{mean}, \text{SD})$$ would mean a standard deviation of 36, a variance of 1296. This course always writes the variance, so read $$N(500, 100^2)$$ as a standard deviation of 100.

### Q: You have a data set and want to know whether the 68-95-99.7 rule can be applied to it. Which graph do you draw, and what do you look for? Why is a box plot not enough?
**Topic:** 3o Normal distribution and the empirical rule (symmetric bell shape · μ sets the centre and equals the median · σ sets the spread · N(μ, σ²) carries the variance · 68-95-99.7 rule · pdf formula)  **Lec:** 13  **Type:** recall
**A:** Key:
1. Draw a histogram.
2. Look for a roughly symmetric, single-peaked bell shape.
3. A box plot shows only the five-number summary, so it cannot show whether there is one peak or two.

Draw a histogram and look for a roughly symmetric, single-peaked bell shape. Real data are never exactly Normal, and roughly Normal is enough. A box plot shows only the five-number summary, so it cannot show whether there is one peak or two: a two-peaked data set can have a perfectly symmetric box plot.

### Q: Exam scores are $$N(6.5, 1.5^2)$$. Can the 68-95-99.7 rule give $$P(X > 5)$$ exactly? Can it give $$P(X > 6)$$ exactly? For any part it cannot answer, say what it does tell you and find the exact value.
**Topic:** 3p Z-scores and standard Normal calculations (z = (x − μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** 13  **Type:** apply
**A:** Key:
1. Yes for $$P(X > 5)$$: 5 is exactly $$\mu - \sigma$$, so $$P(X > 5) = 0.5 + 0.34 = 0.84$$.
2. No for $$P(X > 6)$$: 6 is not a whole number of standard deviations from the mean.
3. The rule only says $$P(X > 6)$$ is between 0.5 and 0.84.
4. Standardise: $$P(X > 6) = P\left(Z > \frac{6 - 6.5}{1.5}\right) = P(Z > -0.33)$$.
5. $$P(X > 6) = 1 - 0.3707 = 0.6293$$.

5 is exactly one standard deviation below the mean, so the rule gives $$P(X > 5) = 0.5 + 0.34 = 0.84$$. 6 is not a whole number of standard deviations from the mean. It sits between $$\mu - \sigma = 5$$ and $$\mu = 6.5$$, so the rule only says $$P(X > 6)$$ is between 0.5 and 0.84. The exact value needs a z-score and Table A.

$$
\begin{aligned}
z &= \frac{6 - 6.5}{1.5} = -0.33 \\
P(X > 6) &= P(Z > -0.33) \\
&= 1 - 0.3707 \\
&= 0.6293
\end{aligned}
$$

### Q: $$m$$ is the median of a continuous random variable $$X$$ with pdf $$f$$ and cdf $$F$$. Which are true: (a) $$P(X \ge m) = 0.5$$, (b) $$f(m) = 0.5$$, (c) $$F(m) = 0.5$$, (d) $$P(X = m) = 0.5$$?
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** 13  **Type:** recall
**A:** Key:
1. (a) and (c) are true.
2. The median splits the area under $$f$$ in half, so $$P(X \ge m) = F(m) = 0.5$$.
3. (b) is false because $$f(m)$$ is the height of the curve, not an area.
4. (d) is false because a continuous $$X$$ has probability 0 at any single value.

(a) and (c). The median splits the area under $$f$$ into two halves, so the area above it and the area below it, $$F(m)$$, are both 0.5. (b) is false because $$f(m)$$ is the height of the curve, not an area. (d) is false because a continuous $$X$$ has probability 0 at any single value. To find $$m$$, solve $$F(m) = 0.5$$. On a written question the exact form, such as $$4 + \ln 2$$, gets full marks; give decimals only when the question asks for them.

### Q: $$X$$ has cdf $$F(x) = 1 - e^{-(x - 4)}$$ for $$x \ge 4$$ and $$F(x) = 0$$ for $$x < 4$$. Find $$P(2 < X < 5)$$ in one line. A student instead integrates $$e^{-(x - 4)}$$ from 2 to 5 and gets about 7.02. What went wrong?
**Topic:** 3f Continuous cdf in both directions (F as an integral with a dummy variable · differentiate F to get f · one minus F for the upper tail · median and quartiles by solving F)  **Lec:** 13  **Type:** apply
**A:** Key:
1. Use the cdf: $$P(2 < X < 5) = F(5) - F(2) = (1 - e^{-1}) - 0$$.
2. $$P(2 < X < 5) \approx 0.632$$.
3. The student used the pdf's formula where it does not hold: the pdf is 0 below 4, so the integral runs from 4 to 5.

Use the cdf you have: $$P(2 < X < 5) = F(5) - F(2) = (1 - e^{-1}) - 0 \approx 0.632$$. The student used the pdf's formula where it does not hold. The pdf is 0 below 4, so the integral runs from 4 to 5, not 2 to 5. A probability of 7.02 is impossible, which is the check that should have caught it.

## Lec 14 — Ch 5: Normal facts, linear combinations and the sample mean (logged 2026-10-14 from the decks and the recording; numbers changed)

### Q: $$X \sim N(20, 4^2)$$ and $$Y = 3X - 5$$. State the distribution of $$Y$$ with both parameters, say which part of the claim is new beyond the Chapter 4 rules, and find $$P(Y > 70)$$.
**Topic:** 3o Linear combinations of Normals and the sample mean (aX + b stays Normal · independent sums: means add with the coefficients, variances with squared coefficients · identically distributed collapse · X̄ ~ N(μ, σ²/n) · total and mean routes give the same z · φ and Φ)  **Lec:** 14  **Type:** apply
**A:** Key:
1. By Fact 1, $$Y$$ is Normal with mean $$3 \times 20 - 5$$ and variance $$3^2 \times 4^2$$.
2. $$Y \sim N(55, 144)$$, so $$\operatorname{SD}(Y) = 12$$.
3. The new part beyond the Chapter 4 rules is the shape: $$Y$$ is still Normal.
4. $$P(Y > 70) = P\left(Z > \frac{70 - 55}{12}\right) = P(Z > 1.25)$$.
5. $$P(Y > 70) = 1 - 0.8944 = 0.1056$$.

By Fact 1, a linear function of a Normal variable is Normal: $$Y \sim N(3 \times 20 - 5,\; 3^2 \times 4^2) = N(55, 144)$$, so $$\operatorname{SD}(Y) = 12$$. The mean and variance come from the Chapter 4 rules for $$aX + b$$; the new part is the shape, that $$Y$$ is still Normal.

$$
\begin{aligned}
P(Y > 70) &= P\!\left(Z > \frac{70 - 55}{12}\right) \\
&= P(Z > 1.25) \\
&= 1 - 0.8944 = 0.1056
\end{aligned}
$$

### Q: Show that standardising, $$Z = \frac{X - \mu}{\sigma}$$ for $$X \sim N(\mu, \sigma^2)$$, is a special case of Fact 1 ($$Y = aX + b$$ is Normal with mean $$a\mu + b$$ and variance $$a^2\sigma^2$$). Name $$a$$ and $$b$$ and derive the two parameters of $$Z$$.
**Topic:** 3o Linear combinations of Normals and the sample mean (aX + b stays Normal · independent sums: means add with the coefficients, variances with squared coefficients · identically distributed collapse · X̄ ~ N(μ, σ²/n) · total and mean routes give the same z · φ and Φ)  **Lec:** 14  **Type:** derive
**A:** Key:
1. Write $$Z = \frac{1}{\sigma} X - \frac{\mu}{\sigma}$$, so $$a = \frac{1}{\sigma}$$ and $$b = -\frac{\mu}{\sigma}$$.
2. $$E(Z) = a\mu + b = \frac{\mu}{\sigma} - \frac{\mu}{\sigma} = 0$$.
3. $$\operatorname{Var}(Z) = a^2\sigma^2 = \frac{\sigma^2}{\sigma^2} = 1$$.
4. Fact 1 adds that $$Z$$ is Normal, so $$Z \sim N(0, 1)$$.

Write $$Z = \frac{1}{\sigma} X - \frac{\mu}{\sigma}$$, so $$a = \frac{1}{\sigma}$$ and $$b = -\frac{\mu}{\sigma}$$.

$$
\begin{aligned}
E(Z) &= a\mu + b = \frac{\mu}{\sigma} - \frac{\mu}{\sigma} = 0 \\
\operatorname{Var}(Z) &= a^2\sigma^2 = \frac{\sigma^2}{\sigma^2} = 1
\end{aligned}
$$

Fact 1 adds that $$Z$$ is Normal, so $$Z \sim N(0, 1)$$. That is why one table of $$\Phi$$ serves every Normal distribution.

### Q: $$X_1 \sim N(10, 2^2)$$ and $$X_2 \sim N(14, 3^2)$$ are independent. Let $$D = X_1 - X_2$$. Give the distribution of $$D$$ and find $$P(X_1 > X_2)$$. A classmate wrote $$\operatorname{Var}(D) = 4 - 9 = -5$$; say what went wrong.
**Topic:** 3o Linear combinations of Normals and the sample mean (aX + b stays Normal · independent sums: means add with the coefficients, variances with squared coefficients · identically distributed collapse · X̄ ~ N(μ, σ²/n) · total and mean routes give the same z · φ and Φ)  **Lec:** 14  **Type:** apply
**A:** Key:
1. By Fact 2 with $$a_1 = 1$$ and $$a_2 = -1$$, $$D$$ is Normal with mean $$10 - 14$$ and variance $$1^2 \times 4 + (-1)^2 \times 9$$.
2. $$D \sim N(-4, 13)$$, with $$\operatorname{SD}(D) = \sqrt{13} = 3.606$$.
3. $$P(X_1 > X_2) = P(D > 0) = P\left(Z > \frac{0 - (-4)}{3.606}\right) = P(Z > 1.11)$$.
4. $$P(X_1 > X_2) = 1 - 0.8665 = 0.1335$$.
5. The classmate subtracted variances; coefficients enter squared, so a minus sign still adds variance.

$$D$$ is a linear combination with $$a_1 = 1$$ and $$a_2 = -1$$, so by Fact 2 it is Normal with mean $$10 - 14 = -4$$ and variance $$1^2 \times 4 + (-1)^2 \times 9 = 13$$. So $$D \sim N(-4, 13)$$ and $$\operatorname{SD}(D) = \sqrt{13} = 3.606$$.

$$
\begin{aligned}
P(X_1 > X_2) &= P(D > 0) \\
&= P\!\left(Z > \frac{0 - (-4)}{3.606}\right) \\
&= P(Z > 1.11) \\
&= 1 - 0.8665 = 0.1335
\end{aligned}
$$

The classmate subtracted variances. Coefficients enter the variance squared, so a minus sign in the combination still adds variance; a variance can never be negative.

### Q: Four bolts are laid end to end. Each length is independently $$N(50, 0.2^2)$$ mm. Give the distribution of the total length $$T$$ and find $$P(T > 200.6)$$. Why is $$\operatorname{Var}(T)$$ not $$16 \times 0.04$$?
**Topic:** 3o Linear combinations of Normals and the sample mean (aX + b stays Normal · independent sums: means add with the coefficients, variances with squared coefficients · identically distributed collapse · X̄ ~ N(μ, σ²/n) · total and mean routes give the same z · φ and Φ)  **Lec:** 14  **Type:** apply
**A:** Key:
1. By Fact 2 with every $$a_i = 1$$, $$T \sim N(4 \times 50,\; 4 \times 0.04)$$.
2. $$T \sim N(200, 0.16)$$, so $$\operatorname{SD}(T) = 0.4$$.
3. $$P(T > 200.6) = P\left(Z > \frac{200.6 - 200}{0.4}\right) = P(Z > 1.5) = 1 - 0.9332 = 0.0668$$.
4. $$16 \times 0.04$$ is the variance of $$4X_1$$, one bolt scaled by 4; four independent bolts add their variances once each.

The bolts are identically distributed and independent, so Fact 2 with every $$a_i = 1$$ gives $$T \sim N(4 \times 50,\; 4 \times 0.04) = N(200, 0.16)$$ and $$\operatorname{SD}(T) = 0.4$$.

$$
\begin{aligned}
P(T > 200.6) &= P\!\left(Z > \frac{200.6 - 200}{0.4}\right) \\
&= P(Z > 1.5) \\
&= 1 - 0.9332 = 0.0668
\end{aligned}
$$

$$16 \times 0.04$$ would be the variance of $$4X_1$$, one bolt's length scaled by 4. Four different bolts vary independently, so their variances add once each: $$4 \times 0.04$$, not $$4^2 \times 0.04$$.

### Q: $$X_1, \ldots, X_n$$ is a Normal sample with mean $$\mu$$ and variance $$\sigma^2$$. Derive $$E(\bar{X})$$ and $$\operatorname{Var}(\bar{X})$$ from the Chapter 4 rules, say which of the two steps needs independence, and say where the claim that $$\bar{X}$$ is Normal comes from.
**Topic:** 3o Linear combinations of Normals and the sample mean (aX + b stays Normal · independent sums: means add with the coefficients, variances with squared coefficients · identically distributed collapse · X̄ ~ N(μ, σ²/n) · total and mean routes give the same z · φ and Φ)  **Lec:** 14  **Type:** derive
**A:** Key:
1. Write $$\bar{X} = \frac{1}{n}(X_1 + \cdots + X_n)$$ and pull the constant out: $$E(\bar{X}) = \frac{1}{n}\{n\mu\} = \mu$$.
2. $$\operatorname{Var}(\bar{X}) = \frac{1}{n^2}\{n\sigma^2\} = \frac{\sigma^2}{n}$$.
3. The variance step needs independence, because otherwise covariance terms appear; the mean step holds for any variables.
4. Normality comes from Fact 2: $$\bar{X}$$ is a linear combination of independent Normals with every $$a_i = \frac{1}{n}$$.

Write $$\bar{X} = \frac{1}{n}(X_1 + \cdots + X_n)$$ and pull the constant out.

$$
\begin{aligned}
E(\bar{X}) &= \frac{1}{n}\{E(X_1) + \cdots + E(X_n)\} \\
&= \frac{1}{n}\{n\mu\} = \mu \\[6pt]
\operatorname{Var}(\bar{X}) &= \frac{1}{n^2}\{\operatorname{Var}(X_1) + \cdots + \operatorname{Var}(X_n)\} \\
&= \frac{1}{n^2}\{n\sigma^2\} = \frac{\sigma^2}{n}
\end{aligned}
$$

The mean step holds for any variables, because expectation of a sum always adds. The variance step needs independence, because otherwise covariance terms appear in the sum. The shape comes from Fact 2: $$\bar{X}$$ is a linear combination of independent Normals with every $$a_i = \frac{1}{n}$$, so it is Normal, $$\bar{X} \sim N(\mu, \frac{\sigma^2}{n})$$.

### Q: Test scores are $$N(100, 12^2)$$. For a random sample of 16 students, find $$P(\bar{X} > 106)$$, then find $$P(X > 106)$$ for one student. Explain in one sentence why the two differ so much.
**Topic:** 3o Linear combinations of Normals and the sample mean (aX + b stays Normal · independent sums: means add with the coefficients, variances with squared coefficients · identically distributed collapse · X̄ ~ N(μ, σ²/n) · total and mean routes give the same z · φ and Φ)  **Lec:** 14  **Type:** apply
**A:** Key:
1. By Fact 3, $$\bar{X} \sim N(100, \frac{144}{16}) = N(100, 9)$$, so $$\operatorname{SD}(\bar{X}) = 3$$.
2. $$P(\bar{X} > 106) = P\left(Z > \frac{106 - 100}{3}\right) = P(Z > 2) = 0.0228$$.
3. $$P(X > 106) = P\left(Z > \frac{106 - 100}{12}\right) = P(Z > 0.5) = 0.3085$$.
4. The mean of 16 has SD $$\frac{12}{\sqrt{16}} = 3$$, so 6 points is two SDs for the mean but half an SD for one score.

By Fact 3, $$\bar{X} \sim N(100, \frac{144}{16}) = N(100, 9)$$, so $$\operatorname{SD}(\bar{X}) = 3$$.

$$
\begin{aligned}
P(\bar{X} > 106) &= P\!\left(Z > \frac{106 - 100}{3}\right) = P(Z > 2) \\
&= 1 - 0.9772 = 0.0228 \\[6pt]
P(X > 106) &= P\!\left(Z > \frac{106 - 100}{12}\right) = P(Z > 0.5) \\
&= 1 - 0.6915 = 0.3085
\end{aligned}
$$

An average of 16 scores varies with standard deviation $$\frac{12}{\sqrt{16}} = 3$$, a quarter of one score's 12, so a mean 6 points above 100 is two standard deviations out while a single score 6 points above is only half of one.

### Q: What do $$\phi$$ and $$\Phi$$ denote in the deck's notation? Write $$P(-0.4 < Z < 1.2)$$ using $$\Phi$$ and evaluate it from Table A. What is $$\Phi(0)$$, and why?
**Topic:** 3o Linear combinations of Normals and the sample mean (aX + b stays Normal · independent sums: means add with the coefficients, variances with squared coefficients · identically distributed collapse · X̄ ~ N(μ, σ²/n) · total and mean routes give the same z · φ and Φ)  **Lec:** 14  **Type:** apply
**A:** Key:
1. $$\phi(z) = \frac{1}{\sqrt{2\pi}} e^{-z^2/2}$$ is the standard Normal pdf.
2. $$\Phi(z) = P(Z \le z)$$ is the standard Normal cdf, the area to the left of $$z$$ that Table A lists.
3. $$P(-0.4 < Z < 1.2) = \Phi(1.2) - \Phi(-0.4)$$.
4. $$P(-0.4 < Z < 1.2) = 0.8849 - 0.3446 = 0.5403$$.
5. $$\Phi(0) = 0.5$$, because the standard Normal is symmetric about 0.

$$\phi(z) = \frac{1}{\sqrt{2\pi}} e^{-z^2/2}$$ is the standard Normal pdf, and $$\Phi(z) = P(Z \le z) = \int_{-\infty}^{z} \phi(t)\, dt$$ is the standard Normal cdf, the area to the left of $$z$$ that Table A lists.

$$
\begin{aligned}
P(-0.4 < Z < 1.2) &= \Phi(1.2) - \Phi(-0.4) \\
&= 0.8849 - 0.3446 \\
&= 0.5403
\end{aligned}
$$

$$\Phi(0) = 0.5$$, because the standard Normal is symmetric about 0, so half the area lies to the left of it.

### Q: Mark each claim true or false and fix the false ones. (a) For a sample of 25 from $$N(\mu, \sigma^2)$$, $$\operatorname{SD}(\bar{X}) = \frac{\sigma}{25}$$. (b) If $$X$$ is Normal then $$-2X + 7$$ is Normal with variance $$-2\sigma^2$$. (c) $$E(\bar{X}) = \mu$$ holds even if the sample values are not independent.
**Topic:** 3o Linear combinations of Normals and the sample mean (aX + b stays Normal · independent sums: means add with the coefficients, variances with squared coefficients · identically distributed collapse · X̄ ~ N(μ, σ²/n) · total and mean routes give the same z · φ and Φ)  **Lec:** 14  **Type:** apply
**A:** Key:
1. (a) False: $$\operatorname{SD}(\bar{X}) = \frac{\sigma}{\sqrt{25}} = \frac{\sigma}{5}$$, because the spread shrinks by $$\sqrt{n}$$, not $$n$$.
2. (b) False in the variance: $$-2X + 7$$ is Normal with variance $$(-2)^2\sigma^2 = 4\sigma^2$$.
3. (c) True: expectation of a sum always adds, so $$E(\bar{X}) = \mu$$ regardless of independence.

(a) False. $$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{25}$$, so $$\operatorname{SD}(\bar{X}) = \frac{\sigma}{\sqrt{25}} = \frac{\sigma}{5}$$; the square root shrinks the spread by $$\sqrt{n}$$, not $$n$$. (b) False in the variance. $$-2X + 7$$ is Normal by Fact 1, with mean $$-2\mu + 7$$ and variance $$(-2)^2\sigma^2 = 4\sigma^2$$; a variance is never negative. (c) True. Expectation of a sum always adds, so the mean of $$\bar{X}$$ is $$\mu$$ regardless of independence; only the variance formula needs it.

### Q: $$Z$$ is standard Normal. True or false, without a table: (a) $$P(Z < 4.2)$$ is about 0. (b) $$P(-2.4 < Z < -1.3) = P(1.3 < Z < 2.4)$$. Then give the value in (b) from Table A.
**Topic:** 3p Z-scores and standard Normal calculations (z = (x − μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** 14  **Type:** recall
**A:** Key:
1. (a) False: almost the whole area lies below 4.2, so $$P(Z < 4.2)$$ is almost 1.
2. (b) True, because the standard Normal is symmetric about 0, so the two strips are mirror images.
3. The value is $$\Phi(2.40) - \Phi(1.30) = 0.9918 - 0.9032 = 0.0886$$.

(a) False. 4.2 is far above the mean, so everything below it is almost the whole area, and $$P(Z < 4.2)$$ is almost 1. The table stops at 3.49, where the cumulative probability is already 0.9998. (b) True, because the standard Normal curve is symmetric about 0, so the two strips are mirror images. Draw it rather than calculate. The value is $$\Phi(2.40) - \Phi(1.30) = 0.9918 - 0.9032 = 0.0886$$.

### Q: Find the cutoff $$a$$ with $$P(Z < a) = 0.025$$, using only the positive-z table. Then find the score that cuts off the lowest 2.5% when scores are $$N(70, 8^2)$$.
**Topic:** 3p Z-scores and standard Normal calculations (z = (x − μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** 14  **Type:** apply
**A:** Key:
1. The lowest 2.5% is the left tail, so $$a$$ is negative and by symmetry $$-a$$ has 0.975 of the area to its left.
2. Table A has 0.9750 at 1.96, so $$a = -1.96$$.
3. Unstandardise: $$x = 70 + (-1.96)(8) = 54.32$$.

The lowest 2.5% is in the left tail, so $$a$$ is negative. By symmetry, $$-a$$ has 0.975 of the area to its left. Table A has 0.9750 exactly at 1.96, so $$a = -1.96$$. Unstandardise:

$$
\begin{aligned}
x &= \mu + z\sigma \\
&= 70 + (-1.96)(8) \\
&= 54.32
\end{aligned}
$$

### Q: A written question says: exam scores are $$N(60, 8^2)$$; what proportion of students score above 70? List what a full-marks answer writes down, in order, and give the answer.
**Topic:** 3p Z-scores and standard Normal calculations (z = (x − μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** 14  **Type:** apply
**A:** Key:
1. Write the probability statement and standardise: $$P(X > 70) = P\left(Z > \frac{70 - 60}{8}\right) = P(Z > 1.25)$$.
2. The answer opens by defining the random variable in words: $$X$$ is a student's exam score.
3. It then states the distribution, $$X \sim N(60, 8^2)$$, before the probability statement.
4. It draws the curve with the right tail shaded.
5. It gives $$1 - 0.8944 = 0.1056$$ and says it in words: about 10.6% of students score above 70.

Each step earns part marks, and the picture lets the grader see a correct method even if the arithmetic slips.
1. Define the random variable in words: $$X$$ is a student's exam score. The question does not do this for you.
2. State its distribution: $$X \sim N(60, 8^2)$$.
3. Write the probability statement: $$P(X > 70)$$.
4. Standardise, draw the curve with the right tail shaded, and use the table.

$$
\begin{aligned}
P(X > 70) &= P\left(Z > \frac{70 - 60}{8}\right) \\
&= P(Z > 1.25) \\
&= 1 - 0.8944 \\
&= 0.1056
\end{aligned}
$$

5. Say it in words: about 10.6% of students score above 70.

### Q: Standardising gives $$z = 1.2873$$. What do you look up in Table A, and what is $$P(Z < z)$$? What does "briefly describe" ask for on this course's exams?
**Topic:** 3p Z-scores and standard Normal calculations (z = (x − μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** 14  **Type:** recall
**A:** Key:
1. Round to two decimals, 1.29, and look up row 1.2, column .09.
2. $$P(Z < 1.29) = 0.9015$$.
3. "Briefly describe" means two or three sentences, to the point.

The table only has two decimals, so round to 1.29 and look up row 1.2, column .09: $$P(Z < 1.29) = 0.9015$$. "Briefly describe" means two or three sentences, to the point, not a page.

## WeBWorK 5 — Ch 5 (opened Oct 13, due Thu Oct 22; banked 2026-10-15, numbers changed)

### Q: WeBWorK-style. The length of a coil of copper wire has mean 120 m and standard deviation 8 m. Four coils are chosen at random. What is the variance of the total length? Pick one: 2 $$\mathrm{m}^2$$, 32 $$\mathrm{m}^2$$, 256 $$\mathrm{m}^2$$, 480 $$\mathrm{m}^2$$ or 1024 $$\mathrm{m}^2$$.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** WW5  **Type:** apply
**A:** Key:
1. The total is a sum of four independent lengths, so the variances add: $$4 \times 8^2$$.
2. The variance is 256 $$\mathrm{m}^2$$.

256 $$\mathrm{m}^2$$. The total is a sum of four independent lengths, so the variances add and the standard deviations do not.

$$
\begin{aligned}
\operatorname{Var}(X_1 + \dots + X_4) &= 4 \times 8^2 \\
&= 256
\end{aligned}
$$

The trap options are 32, which adds the standard deviations, and 1024, which is $$\operatorname{Var}(4X) = 16 \times 64$$, the variance of one coil measured four times over, not of four different coils.

### Q: WeBWorK-style. Which Normal distribution has the widest spread: mean 5 with standard deviation 1.5, mean $$-2$$ with standard deviation 4, mean 10 with standard deviation 2.5, mean 0 with standard deviation 3, or none of them?
**Topic:** 3o Normal distribution and the empirical rule (symmetric bell shape · μ sets the centre and equals the median · σ sets the spread · N(μ, σ²) carries the variance · 68-95-99.7 rule · pdf formula)  **Lec:** WW5  **Type:** apply
**A:** Key:
1. Mean $$-2$$ with standard deviation 4 has the widest spread.
2. The spread is set by $$\sigma$$ alone; $$\mu$$ only slides the curve along the axis.

The one with mean $$-2$$ and standard deviation 4. The spread of a Normal distribution is set by $$\sigma$$ alone; $$\mu$$ only slides the curve along the axis, so a large or negative mean says nothing about width.

### Q: WeBWorK-style. $$X \sim N(30, 2^2)$$. What is $$E(X^2)$$: 896, 900, 902, 904, or not enough information?
**Topic:** 3j Rules for the mean and variance (E of aX + b · E of a sum always adds · E of XY splits only under independence · Var of aX + b is a² Var X · proof of the shortcut)  **Lec:** WW5  **Type:** apply
**A:** Key:
1. Rearrange the variance shortcut: $$E(X^2) = \operatorname{Var}(X) + \mu^2 = 4 + 900$$.
2. $$E(X^2) = 904$$.

904. Rearrange the variance shortcut $$\operatorname{Var}(X) = E(X^2) - \mu^2$$.

$$
\begin{aligned}
E(X^2) &= \operatorname{Var}(X) + \mu^2 \\
&= 4 + 900 = 904
\end{aligned}
$$

The mean and variance are enough; the Normal shape is not even needed. The trap is 900, which forgets the variance term.

### Q: WeBWorK-style. Chain lengths are Normal with mean 3.5 cm and standard deviation 0.3 cm. Find $$\ell$$ with $$P(L > \ell) = 0.02$$. Pick one: 0.30, 2.88, 3.50, 4.12 or 5.55 cm.
**Topic:** 3p Z-scores and standard Normal calculations (z = (x - μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** WW5  **Type:** apply
**A:** Key:
1. Backward: an upper tail of 0.02 means finding $$z$$ with $$\Phi(z) = 0.98$$, then $$\ell = \mu + z\sigma$$.
2. $$z = 2.054$$, so $$\ell = 3.5 + 2.054 \times 0.3$$.
3. $$\ell = 4.12$$ cm.

4.12 cm. This is a backward problem: an upper tail of 0.02 means an area of 0.98 to the left, so find the $$z$$ with $$\Phi(z) = 0.98$$, then unstandardise.

$$
\begin{aligned}
z &= 2.054 \\
\ell &= \mu + z\sigma \\
&= 3.5 + 2.054 \times 0.3 \\
&= 4.12
\end{aligned}
$$

The trap is 2.88, which uses $$-2.054$$ and gives the value with 2% below it.

### Q: WeBWorK-style. $$X \sim N(50, 6^2)$$. Which is the interquartile range: 54.05 - 45.95 = 8.09, 56 - 44 = 12, 61.76 - 38.24 = 23.52, 51.51 - 48.49 = 3.02, or 50.67 - 49.33 = 1.34?
**Topic:** 3p Z-scores and standard Normal calculations (z = (x - μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** WW5  **Type:** apply
**A:** Key:
1. The quartiles sit at $$\Phi(z) = 0.25$$ and $$0.75$$, which is $$z = \pm 0.6745$$.
2. $$Q_3 = 50 + 0.6745 \times 6 = 54.05$$ and $$Q_1 = 50 - 0.6745 \times 6 = 45.95$$.
3. The IQR is $$54.05 - 45.95 = 8.09$$.

54.05 - 45.95 = 8.09. The quartiles sit at $$\Phi(z) = 0.25$$ and $$0.75$$, which is $$z = \pm 0.6745$$, so each quartile is $$0.6745\sigma$$ from the mean.

$$
\begin{aligned}
Q_3 &= 50 + 0.6745 \times 6 = 54.05 \\
Q_1 &= 50 - 0.6745 \times 6 = 45.95 \\
\text{IQR} &= 1.349\sigma = 8.09
\end{aligned}
$$

The traps are $$\mu \pm \sigma$$ (12, the middle 68%) and $$\mu \pm 1.96\sigma$$ (23.52, the middle 95%).

### Q: WeBWorK-style. Windscreen wipers last on average 4 years, Normal with standard deviation 1.5 years. Find the probability that a wiper's lifetime is not within 1.2 years of the mean.
**Topic:** 3p Z-scores and standard Normal calculations (z = (x - μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** WW5  **Type:** apply
**A:** Key:
1. Not within 1.2 years is both tails, $$|X - 4| > 1.2$$, so $$P(|Z| > 0.8) = 2(1 - \Phi(0.8))$$.
2. $$2(1 - 0.7881) = 0.4238$$.

0.4238. "Not within 1.2 years of the mean" is both tails, $$|X - 4| > 1.2$$, so both tails of $$Z$$ beyond $$1.2 / 1.5 = 0.8$$.

$$
\begin{aligned}
P(|Z| > 0.8) &= 2\,(1 - \Phi(0.8)) \\
&= 2\,(1 - 0.7881) \\
&= 0.4238
\end{aligned}
$$

The usual miss is reporting one tail, 0.2119, or the inside, 0.5762.

## Lec 15 — Ch 6: Bernoulli and Binomial distributions (prepared 2026-10-16 from the before-class deck; numbers changed; the recording and the after-class derivation file are checked in when they are posted)

### Q: Parts from a machine pass inspection with probability 0.9, independently of one another. Let $$X$$ be the number that pass among 6 parts. Name the distribution of $$X$$ with its parameters, check the three assumptions, and find $$P(X = 5)$$.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 15  **Type:** apply
**A:** Key:
1. $$X \sim \text{Bin}(6, 0.9)$$, so $$P(X = 5) = \binom{6}{5} 0.9^{5} \times 0.1^{1}$$.
2. The three assumptions hold: $$n = 6$$ pass-or-fail trials, independent trials, and the same $$p = 0.9$$ on every trial.
3. $$P(X = 5) = 0.3543$$.

$$X \sim \text{Bin}(6, 0.9)$$. The assumptions hold: there are $$n = 6$$ trials, each ends in pass or fail; the trials are independent; every trial has the same $$p = 0.9$$.

$$
\begin{aligned}
P(X = 5) &= \binom{6}{5} 0.9^{5} \times 0.1^{1} \\
&= 6 \times 0.59049 \times 0.1 \\
&= 0.3543
\end{aligned}
$$

### Q: Derive $$E(X)$$ and $$\operatorname{Var}(X)$$ for $$X \sim \text{Bernoulli}(p)$$ from the definitions of a discrete mean and variance. Then say what the mean and variance become for the number of successes in $$n$$ independent trials, and which Chapter 4 rule you used.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 15  **Type:** derive
**A:** Key:
1. $$E(X) = 0 \times (1 - p) + 1 \times p = p$$.
2. $$E(X^2) = p$$, so $$\operatorname{Var}(X) = p - p^2 = p(1 - p)$$.
3. The count in $$n$$ independent trials is a sum of $$n$$ Bernoullis, so $$E = np$$ and $$\operatorname{Var} = np(1 - p)$$.
4. The rule used is the variance of a sum of independent variables, with every coefficient equal to 1.

$$X$$ takes the value 1 with probability $$p$$ and 0 with probability $$1 - p$$.

$$
\begin{aligned}
E(X) &= 0 \times (1 - p) + 1 \times p = p \\
E(X^2) &= 0^2 (1 - p) + 1^2 p = p \\
\operatorname{Var}(X) &= E(X^2) - [E(X)]^2 \\
&= p - p^2 = p(1 - p)
\end{aligned}
$$

The Binomial count is the sum of $$n$$ such variables. Means add always, so $$E = np$$; the variables are independent, so the variances add too, $$\operatorname{Var} = np(1 - p)$$. That is the Chapter 4 rule for the variance of a sum of independent variables, with every coefficient equal to 1.

### Q: Explain in two sentences why the Binomial pmf has the factor $$\binom{n}{x}$$ in front of $$p^{x}(1 - p)^{n - x}$$. Then evaluate $$\binom{7}{2}$$, $$\binom{5}{5}$$ and $$\binom{n}{0}$$.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 15  **Type:** derive
**A:** Key:
1. One particular order of $$x$$ successes and $$n - x$$ failures has probability $$p^{x}(1 - p)^{n - x}$$ by independence.
2. There are $$\binom{n}{x}$$ disjoint orders with that same probability, so the probabilities add.
3. $$\binom{7}{2} = \frac{7 \times 6}{2} = 21$$.
4. $$\binom{5}{5} = 1$$ and $$\binom{n}{0} = 1$$, both using $$0! = 1$$.

One particular order of $$x$$ successes and $$n - x$$ failures has probability $$p^{x}(1 - p)^{n - x}$$ by independence. There are $$\binom{n}{x}$$ different orders, each with that same probability, and the orders are disjoint events, so the probabilities add.

$$
\begin{aligned}
\binom{7}{2} &= \frac{7!}{2!\,5!} = \frac{7 \times 6}{2} = 21 \\
\binom{5}{5} &= \frac{5!}{5!\,0!} = 1 \\
\binom{n}{0} &= \frac{n!}{0!\,n!} = 1
\end{aligned}
$$

Both of the last two use $$0! = 1$$.

### Q: An inspector draws 15 phones without replacement from a shipment of 120, of which 8% are defective. Can the number of defectives be modelled as Binomial? Name the assumption at risk and the rule that decides. Would the answer change for a shipment of 200?
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 15  **Type:** apply
**A:** Key:
1. Sampling without replacement puts the independence assumption at risk, and the 10% condition decides.
2. $$\frac{15}{120} = 12.5\%$$ is more than 10%, so the Binomial model cannot be used.
3. For 200, $$\frac{15}{200} = 7.5\%$$ is within the condition, so the count is $$\text{Bin}(15, 0.08)$$.

Sampling without replacement makes the trials dependent, so the independence assumption is at risk. The 10% condition decides: the Binomial model may be used when the sample is at most 10% of the population. Here $$\frac{15}{120} = 12.5\%$$, more than 10%, so the Binomial model cannot be used.

For a shipment of 200 the sample is $$\frac{15}{200} = 7.5\%$$, within the condition, so the count is modelled as $$\text{Bin}(15, 0.08)$$.

### Q: Which of these counts are Binomial, and with what parameters? For each one that is not, name the assumption that fails. (a) The number of sixes in 10 rolls of a fair die. (b) The number of rolls of a fair die until the first six. (c) The number of defective bulbs in a box of 20 when each bulb is defective with probability 0.02 independently. (d) The number of red cards among 5 drawn without replacement from a 52-card deck.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 15  **Type:** apply
**A:** Key:
1. (a) is Binomial, $$\text{Bin}(10, \frac{1}{6})$$.
2. (b) is not Binomial: the number of trials is not fixed, since it counts trials until the first success (Geometric).
3. (c) is Binomial, $$\text{Bin}(20, 0.02)$$.
4. (d) is without replacement, but $$\frac{5}{52} = 9.6\%$$ is within the 10% condition, so it is modelled as $$\text{Bin}(5, 0.5)$$.

(a) Binomial, $$\text{Bin}(10, \frac{1}{6})$$: fixed trials, two outcomes, independent, same $$p$$.

(b) Not Binomial. The number of trials is not fixed; the variable counts trials until the first success, which is the Geometric distribution of the next lecture.

(c) Binomial, $$\text{Bin}(20, 0.02)$$.

(d) The draws are without replacement, so the trials are dependent, but $$\frac{5}{52} = 9.6\%$$ is within the 10% condition, so the count is modelled as $$\text{Bin}(5, 0.5)$$.

### Q: $$X \sim \text{Bin}(12, 0.25)$$. Find $$E(X)$$, $$\operatorname{Var}(X)$$ and $$\operatorname{SD}(X)$$, then $$P(X \le 1)$$.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 15  **Type:** apply
**A:** Key:
1. Use $$E = np$$ and $$\operatorname{Var} = np(1 - p)$$: $$12 \times 0.25$$ and $$12 \times 0.25 \times 0.75$$.
2. $$E(X) = 3$$, $$\operatorname{Var}(X) = 2.25$$ and $$\operatorname{SD}(X) = 1.5$$.
3. $$P(X \le 1) = 0.75^{12} + 12 \times 0.25 \times 0.75^{11}$$.
4. $$P(X \le 1) = 0.0317 + 0.1267 = 0.1584$$.


$$
\begin{aligned}
E(X) &= 12 \times 0.25 = 3 \\
\operatorname{Var}(X) &= 12 \times 0.25 \times 0.75 = 2.25 \\
\operatorname{SD}(X) &= \sqrt{2.25} = 1.5
\end{aligned}
$$

$$P(X \le 1)$$ adds the two smallest values.

$$
\begin{aligned}
P(X = 0) &= 0.75^{12} = 0.0317 \\
P(X = 1) &= 12 \times 0.25 \times 0.75^{11} = 0.1267 \\
P(X \le 1) &= 0.0317 + 0.1267 = 0.1584
\end{aligned}
$$

### Q: A classmate writes: "For $$X \sim \text{Bernoulli}(0.3)$$ the pmf is $$P(X = x) = 0.3^{x} \times 0.7^{1 - x}$$, so $$P(X = 2) = 0.3^{2} \times 0.7^{-1} = 0.129$$." What is wrong, and what are $$P(X = 2)$$ and $$\operatorname{Var}(X)$$?
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 15  **Type:** critique
**A:** Key:
1. The pmf formula applies only on the support $$x = 0, 1$$; a Bernoulli variable takes no other value.
2. $$P(X = 2) = 0$$.
3. $$\operatorname{Var}(X) = p(1 - p) = 0.3 \times 0.7 = 0.21$$.

The pmf formula only applies on the support $$x = 0, 1$$; a Bernoulli variable is 1 on a success and 0 on a failure and takes no other value. So $$P(X = 2) = 0$$. The variance is $$p(1 - p) = 0.3 \times 0.7 = 0.21$$.

## Lec 16 — Ch 6: Binomial examples (prepared 2026-10-23 from the after-class deck; numbers changed)

### Q: A biased coin lands heads with probability 0.6 and is tossed 6 times. Let $$X$$ be the number of heads. Find $$P(X = 5)$$, then the mean and the standard deviation of $$X$$.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 16  **Type:** apply
**A:** Key:
1. $$X \sim \text{Bin}(6, 0.6)$$, so $$P(X = 5) = \binom{6}{5}(0.6)^5(0.4)^1$$.
2. $$P(X = 5) = 0.1866$$.
3. $$E(X) = 6 \times 0.6 = 3.6$$.
4. $$\operatorname{SD}(X) = \sqrt{6 \times 0.6 \times 0.4} = 1.2$$.

$$X \sim \text{Bin}(6, 0.6)$$. The 6 in front counts the orders in which the one tail can fall.

$$
\begin{aligned}
P(X = 5) &= \binom{6}{5}(0.6)^5(0.4)^1 \\
&= 6 \times 0.07776 \times 0.4 \\
&= 0.1866 \\[4pt]
E(X) &= 6 \times 0.6 = 3.6 \\
\operatorname{Var}(X) &= 6 \times 0.6 \times 0.4 = 1.44 \\
\operatorname{SD}(X) &= \sqrt{1.44} = 1.2
\end{aligned}
$$

### Q: $$X \sim \text{Bin}(12, 0.25)$$. Write each event as a sum of pmf terms or as a complement, without computing: (a) fewer than 2, (b) at most 3, (c) at least 2, (d) more than 10.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 16  **Type:** apply
**A:** Key:
1. (a) $$P(X < 2) = P(X = 0) + P(X = 1)$$.
2. (b) $$P(X \le 3) = P(X = 0) + P(X = 1) + P(X = 2) + P(X = 3)$$, including 3.
3. (c) $$P(X \ge 2) = 1 - P(X = 0) - P(X = 1)$$, the complement of (a).
4. (d) $$P(X > 10) = P(X = 11) + P(X = 12)$$.

- (a) $$P(X < 2) = P(X = 0) + P(X = 1)$$, because "fewer than 2" stops at 1.
- (b) $$P(X \le 3) = P(X = 0) + P(X = 1) + P(X = 2) + P(X = 3)$$, because "at most" includes 3.
- (c) $$P(X \ge 2) = 1 - P(X = 0) - P(X = 1)$$, the complement of (a), which saves eleven terms.
- (d) $$P(X > 10) = P(X = 11) + P(X = 12)$$, because "more than 10" starts at 11.

### Q: 25% of drivers come to a complete stop at a flashing red light. Twelve drivers are chosen at random. Find the probability that exactly 3 stop, the expected number who stop, and the standard deviation of that number.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 16  **Type:** apply
**A:** Key:
1. $$X \sim \text{Bin}(12, 0.25)$$, assuming independent drivers, so $$P(X = 3) = \binom{12}{3}(0.25)^3(0.75)^9$$.
2. $$P(X = 3) = 0.2581$$.
3. $$E(X) = 12 \times 0.25 = 3$$.
4. $$\operatorname{SD}(X) = \sqrt{12 \times 0.25 \times 0.75} = 1.5$$.

$$X \sim \text{Bin}(12, 0.25)$$, assuming drivers act independently.

$$
\begin{aligned}
P(X = 3) &= \binom{12}{3}(0.25)^3(0.75)^9 \\
&= 220 \times 0.015625 \times 0.07508 \\
&= 0.2581 \\[4pt]
E(X) &= 12 \times 0.25 = 3 \\
\operatorname{SD}(X) &= \sqrt{12 \times 0.25 \times 0.75} \\
&= \sqrt{2.25} = 1.5
\end{aligned}
$$

### Q: $$X \sim \text{Bin}(8, 0.3)$$. A classmate writes $$P(X \ge 2) = 1 - P(X = 1)$$ and $$P(X > 3) = 1 - P(X \le 3)$$. Which line is right, which is wrong and why, and what is $$P(X \ge 2)$$?
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 16  **Type:** critique
**A:** Key:
1. The first line is wrong: the complement of "at least 2" is "0 or 1", and it drops $$P(X = 0)$$.
2. The second line is right: "more than 3" starts at 4, so its complement is "at most 3".
3. $$P(X \ge 2) = 1 - 0.7^8 - 8(0.3)(0.7)^7$$.
4. $$P(X \ge 2) = 1 - 0.0576 - 0.1977 = 0.7447$$.

The second line is right: "more than 3" starts at 4, so its complement is "at most 3". The first line is wrong, because the complement of "at least 2" is "0 or 1", and the classmate dropped $$P(X = 0)$$.

$$
\begin{aligned}
P(X = 0) &= 0.7^8 = 0.0576 \\
P(X = 1) &= 8(0.3)(0.7)^7 = 0.1977 \\
P(X \ge 2) &= 1 - 0.0576 - 0.1977 \\
&= 0.7447
\end{aligned}
$$

### Q: Each of 7 emergency generators starts with probability 0.95, independently of the others. Find the probability that all 7 start, the probability that at least 6 start, and the expected number that fail to start.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 16  **Type:** apply
**A:** Key:
1. $$X \sim \text{Bin}(7, 0.95)$$ counts the starts, so $$P(X = 7) = 0.95^7$$.
2. $$P(X = 7) = 0.6983$$.
3. $$P(X \ge 6) = 0.6983 + 7(0.95)^6(0.05) = 0.6983 + 0.2573 = 0.9556$$.
4. The failures are $$\text{Bin}(7, 0.05)$$, so the expected number that fail is $$7 \times 0.05 = 0.35$$.

$$X \sim \text{Bin}(7, 0.95)$$ counts the generators that start.

$$
\begin{aligned}
P(X = 7) &= 0.95^7 = 0.6983 \\
P(X = 6) &= 7(0.95)^6(0.05) = 0.2573 \\
P(X \ge 6) &= 0.6983 + 0.2573 = 0.9556
\end{aligned}
$$

The failures are $$7 - X \sim \text{Bin}(7, 0.05)$$, so the expected number that fail is $$7 \times 0.05 = 0.35$$.

### Q: $$X \sim \text{Bin}(n, p)$$ counts successes and $$Y = n - X$$ counts failures. Show that $$Y \sim \text{Bin}(n, 1 - p)$$, then use it to find $$P(X \ge 10)$$ for $$X \sim \text{Bin}(12, 0.9)$$ with three terms instead of ten.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 16  **Type:** derive
**A:** Key:
1. $$Y = y$$ is the event $$X = n - y$$, so $$P(Y = y) = \binom{n}{n - y} p^{n - y}(1 - p)^{y}$$.
2. Since $$\binom{n}{n - y} = \binom{n}{y}$$, this is the $$\text{Bin}(n, 1 - p)$$ pmf.
3. At least 10 successes is at most 2 failures: $$P(X \ge 10) = P(Y \le 2)$$ with $$Y \sim \text{Bin}(12, 0.1)$$.
4. $$P(Y \le 2) = 0.9^{12} + 12(0.1)(0.9)^{11} + 66(0.1)^2(0.9)^{10}$$.
5. $$P(X \ge 10) = 0.2824 + 0.3766 + 0.2301 = 0.8891$$.

$$Y = y$$ is the same event as $$X = n - y$$, and $$\binom{n}{n - y} = \binom{n}{y}$$:

$$
\begin{aligned}
P(Y = y) &= P(X = n - y) \\
&= \binom{n}{n - y} p^{n - y}(1 - p)^{y} \\
&= \binom{n}{y} (1 - p)^{y} p^{n - y}
\end{aligned}
$$

which is the $$\text{Bin}(n, 1 - p)$$ pmf. "At least 10 successes" is "at most 2 failures", with $$Y \sim \text{Bin}(12, 0.1)$$:

$$
\begin{aligned}
P(X \ge 10) &= P(Y \le 2) \\
&= 0.9^{12} + 12(0.1)(0.9)^{11} + 66(0.1)^2(0.9)^{10} \\
&= 0.2824 + 0.3766 + 0.2301 \\
&= 0.8891
\end{aligned}
$$

## Lec 17 — Ch 6: Binomial suitability, Activity 7 and the Geometric distribution (prepared 2026-10-23 from the after-class deck and the Activity 7 solutions; numbers changed)

### Q: Can the Binomial model the count, and why? (a) A pool has 8 civil and 4 computer science students, and a team of 4 is picked at random; $$X$$ is the number of computer science students on the team. (b) A pool has 300 civil and 200 computer science students, and a committee of 12 is picked at random; $$X$$ is the same count.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 17  **Type:** apply
**A:** Key:
1. (a) No: the team is 4 of 12 people, so picking without replacement makes the trials dependent and $$p$$ not constant.
2. (b) Yes: the committee is 12 of 500, 2.4% of the pool, so the 10% condition holds.
3. In (b), $$X$$ is approximately $$\text{Bin}(12, 0.4)$$.

- (a) No. The team is 4 of 12 people, a third of the pool, so picking without replacement changes the chance of a computer science student after every pick; the trials are not independent and $$p$$ is not constant.
- (b) Yes. The committee is 12 of 500, 2.4% of the pool, so the 10% condition holds and $$X$$ is approximately $$\text{Bin}(12, 0.4)$$.

### Q: A quiz question has 5 options and a student guesses. Passing needs at least half the questions right. Find the probability a guesser passes a 4-question quiz, and say whether a 10-question quiz is easier or harder to pass by guessing, and why.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 17  **Type:** apply
**A:** Key:
1. $$X \sim \text{Bin}(4, 0.2)$$ and passing needs $$P(X \ge 2) = 1 - 0.8^4 - 4(0.2)(0.8)^3$$.
2. $$P(X \ge 2) = 1 - 0.4096 - 0.4096 = 0.1808$$.
3. The 10-question quiz is harder to pass by guessing.
4. With more questions a guesser's score settles closer to its expected 20%, so reaching 50% gets less likely.

On 4 questions, $$X \sim \text{Bin}(4, 0.2)$$ and passing needs $$X \ge 2$$:

$$
\begin{aligned}
P(X \ge 2) &= 1 - P(X = 0) - P(X = 1) \\
&= 1 - 0.8^4 - 4(0.2)(0.8)^3 \\
&= 1 - 0.4096 - 0.4096 \\
&= 0.1808
\end{aligned}
$$

The 10-question quiz is harder to pass, because with more questions a guesser's score settles closer to its expected 20%, so reaching 50% gets less likely ($$P(X \ge 5) = 0.033$$ for $$\text{Bin}(10, 0.2)$$).

### Q: 3% of accounts in a large population are in error, and accounts are audited one at a time. Let $$X$$ be the number audited until the first error. (a) Name the distribution of $$X$$. (b) Find the probability that the 8th account is the first error. (c) Find the probability that the first 40 accounts are all error-free. (d) Find the expected number of audits to the first error and the variance.
**Topic:** 3t–v Geometric distribution (trials until the first success · pmf p(1 − p)^(x − 1) for x = 1, 2, … · mean 1/p is the return period · variance (1 − p)/p² · cdf 1 − (1 − p)^x by the geometric series · P(X > x) = (1 − p)^x, the first x trials fail)  **Lec:** 17  **Type:** apply
**A:** Key:
1. (a) $$X \sim \text{Geo}(0.03)$$.
2. (b) $$P(X = 8) = (0.97)^7(0.03) = 0.0242$$.
3. (c) The first 40 all clean is $$X > 40$$, so $$P(X > 40) = (0.97)^{40} = 0.2957$$.
4. (d) $$E(X) = \frac{1}{0.03} = 33.3$$.
5. $$\operatorname{Var}(X) = \frac{0.97}{0.03^2} = 1077.8$$.

(a) $$X \sim \text{Geo}(0.03)$$.

$$
\begin{aligned}
P(X = 8) &= (0.97)^7(0.03) = 0.0242 \\[4pt]
P(X > 40) &= (0.97)^{40} = 0.2957 \\[4pt]
E(X) &= \frac{1}{0.03} = 33.3 \\
\operatorname{Var}(X) &= \frac{0.97}{0.03^2} = 1077.8
\end{aligned}
$$

In (c) the event "the first 40 are clean" is $$X > 40$$, so it is one minus the cdf, not the pmf at 40.

### Q: Derive the Geometric cdf $$F(x) = 1 - (1 - p)^x$$ from the pmf, and name the series result you need.
**Topic:** 3t–v Geometric distribution (trials until the first success · pmf p(1 − p)^(x − 1) for x = 1, 2, … · mean 1/p is the return period · variance (1 − p)/p² · cdf 1 − (1 − p)^x by the geometric series · P(X > x) = (1 − p)^x, the first x trials fail)  **Lec:** 17  **Type:** derive
**A:** Key:
1. Go through the complement: $$F(x) = 1 - \sum_{k = x + 1}^{\infty} p(1 - p)^{k - 1}$$.
2. Factor out the first term: $$F(x) = 1 - p(1 - p)^x \sum_{j = 0}^{\infty}(1 - p)^j$$.
3. The geometric series $$1 + r + r^2 + \cdots = \frac{1}{1 - r}$$ with $$r = 1 - p$$ gives $$\frac{1}{p}$$.
4. So $$F(x) = 1 - p(1 - p)^x \times \frac{1}{p} = 1 - (1 - p)^x$$.

Work through the complement and factor out the first term, then use the geometric series $$1 + r + r^2 + \cdots = \frac{1}{1 - r}$$ for $$0 < r < 1$$, with $$r = 1 - p$$.

$$
\begin{aligned}
F(x) &= 1 - P(X > x) \\
&= 1 - \sum_{k = x + 1}^{\infty} p(1 - p)^{k - 1} \\
&= 1 - p(1 - p)^x \sum_{j = 0}^{\infty}(1 - p)^j \\
&= 1 - p(1 - p)^x \times \frac{1}{p} \\
&= 1 - (1 - p)^x
\end{aligned}
$$

A shortcut that checks it: $$X > x$$ means the first $$x$$ independent trials all fail, which has probability $$(1 - p)^x$$.

### Q: A river floods in a given year with probability 0.04, independently from year to year. What is the return period of a flood, and what is the probability of no flood in the next 10 years?
**Topic:** 3t–v Geometric distribution (trials until the first success · pmf p(1 − p)^(x − 1) for x = 1, 2, … · mean 1/p is the return period · variance (1 − p)/p² · cdf 1 − (1 − p)^x by the geometric series · P(X > x) = (1 − p)^x, the first x trials fail)  **Lec:** 17  **Type:** apply
**A:** Key:
1. The years until the first flood are $$\text{Geo}(0.04)$$, and the return period is the expected wait $$\frac{1}{0.04}$$.
2. The return period is 25 years.
3. No flood in 10 years is $$P(X > 10) = (0.96)^{10} = 0.665$$.

The years until the first flood are $$\text{Geo}(0.04)$$. The return period is the expected wait, $$\frac{1}{0.04} = 25$$ years. No flood in 10 years means the first flood comes after year 10:

$$
P(X > 10) = (0.96)^{10} = 0.665
$$

## Lec 18 — Ch 6: the Poisson distribution, the Poisson process and the Poisson approximation (prepared 2026-10-23 from the after-class deck; numbers changed)

### Q: Show that $$f(x) = \frac{\lambda^x e^{-\lambda}}{x!}$$ for $$x = 0, 1, 2, \ldots$$ is a valid pmf, and state the mean and variance of $$X \sim \text{Poisson}(\lambda)$$.
**Topic:** 3w–aa Poisson process and Poisson distribution (counts in a fixed interval at a constant rate · pmf λ^x e^(−λ)/x! · mean and variance both λ · the rate scales with the interval, λt · four process properties · the time between events is exponential with mean 1/λ)  **Lec:** 18  **Type:** derive
**A:** Key:
1. The terms sum to 1 by the exponential series: $$e^{-\lambda}\sum_{x = 0}^{\infty}\frac{\lambda^x}{x!} = e^{-\lambda}e^{\lambda} = 1$$.
2. Every term is positive because $$\lambda > 0$$.
3. The mean and the variance are both $$\lambda$$.

Every term is positive because $$\lambda > 0$$. The terms add to 1 by the series $$e^{k} = \sum_{x = 0}^{\infty} \frac{k^x}{x!}$$:

$$
\begin{aligned}
\sum_{x = 0}^{\infty} \frac{\lambda^x e^{-\lambda}}{x!} &= e^{-\lambda}\sum_{x = 0}^{\infty}\frac{\lambda^x}{x!} \\
&= e^{-\lambda}e^{\lambda} = 1
\end{aligned}
$$

The mean and the variance are both $$\lambda$$.

### Q: Calls reach a help desk at 2 per minute during a busy period, and the Poisson process assumptions hold. Find the probability of more than 2 calls in a 3-minute interval.
**Topic:** 3w–aa Poisson process and Poisson distribution (counts in a fixed interval at a constant rate · pmf λ^x e^(−λ)/x! · mean and variance both λ · the rate scales with the interval, λt · four process properties · the time between events is exponential with mean 1/λ)  **Lec:** 18  **Type:** apply
**A:** Key:
1. The rate scales with the interval: $$X_3 \sim \text{Poisson}(2 \times 3 = 6)$$.
2. $$P(X_3 > 2) = 1 - e^{-6}\left(1 + 6 + \frac{6^2}{2}\right) = 1 - 25e^{-6}$$.
3. $$P(X_3 > 2) = 0.938$$.

The rate scales with the interval, so $$X_3 \sim \text{Poisson}(2 \times 3 = 6)$$.

$$
\begin{aligned}
P(X_3 > 2) &= 1 - P(X_3 \le 2) \\
&= 1 - e^{-6}\left(1 + 6 + \frac{6^2}{2}\right) \\
&= 1 - 25e^{-6} \\
&= 0.938
\end{aligned}
$$

The usual miss is keeping $$\lambda = 2$$ for a 3-minute interval.

### Q: Name the four properties of a Poisson process. Then say which property fails in each case: (a) buses that arrive in bunches of three at once; (b) shoppers per hour at a mall, counted across the whole day.
**Topic:** 3w–aa Poisson process and Poisson distribution (counts in a fixed interval at a constant rate · pmf λ^x e^(−λ)/x! · mean and variance both λ · the rate scales with the interval, λt · four process properties · the time between events is exponential with mean 1/λ)  **Lec:** 18  **Type:** critique
**A:** Key:
1. The first two: counts on non-overlapping intervals are independent, and the expected count in an interval is proportional to its length.
2. The last two: every interval of a given length has the same chance of an event, and two events cannot happen at once.
3. (a) breaks the last property, because three arrivals happen together.
4. (b) breaks the constant-rate property, because the mall is busier at lunch than at 9 am.

The four properties:
- Counts on intervals that do not overlap are independent.
- The expected count in an interval is proportional to its length, $$\lambda$$ per unit.
- The chance of an event in an interval of a given length is the same for every interval.
- Two events cannot happen at the same instant.

(a) breaks the last one, because three arrivals happen together. (b) breaks the constant-rate property, because the mall is busier at lunch than at 9 am.

### Q: Calls reach a help desk at 2 per minute. Let $$T$$ be the time from one call to the next. Name the distribution of $$T$$, find its mean, and find the probability that more than a minute passes with no call. Check the last answer through the Poisson count.
**Topic:** 3w–aa Poisson process and Poisson distribution (counts in a fixed interval at a constant rate · pmf λ^x e^(−λ)/x! · mean and variance both λ · the rate scales with the interval, λt · four process properties · the time between events is exponential with mean 1/λ)  **Lec:** 18  **Type:** apply
**A:** Key:
1. $$T \sim \text{Exp}(2)$$.
2. The mean of $$T$$ is $$\frac{1}{2}$$ minute.
3. $$P(T > 1) = 1 - F(1) = e^{-2 \times 1} = 0.135$$.
4. Check: $$P(X_1 = 0) = e^{-2} = 0.135$$ for $$X_1 \sim \text{Poisson}(2)$$, the same number.

$$T \sim \text{Exp}(2)$$, with mean $$\frac{1}{2}$$ minute.

$$
\begin{aligned}
P(T > 1) &= 1 - F(1) \\
&= e^{-2 \times 1} = 0.135
\end{aligned}
$$

Check: no call in one minute is $$P(X_1 = 0)$$ with $$X_1 \sim \text{Poisson}(2)$$, which is $$e^{-2} = 0.135$$, the same number.

### Q: For each Binomial, say whether the Poisson approximation may be used and, if so, with what $$\lambda$$: (a) $$\text{Bin}(30, 0.3)$$; (b) $$\text{Bin}(200, 0.01)$$; (c) $$\text{Bin}(15, 0.02)$$.
**Topic:** 3bb Poisson approximation to the Binomial (n ≥ 20 and np < 5 · λ = np · check both conditions first · exact Binomial against the approximation)  **Lec:** 18  **Type:** apply
**A:** Key:
1. The rule needs $$n \ge 20$$ and $$np < 5$$.
2. (a) No: $$np = 9$$ is not below 5.
3. (b) Yes: $$n = 200$$ and $$np = 2$$, so $$\text{Poisson}(2)$$.
4. (c) No: $$n = 15$$ is below 20.

The rule needs $$n \ge 20$$ and $$np < 5$$.
- (a) No: $$n = 30$$ is large enough but $$np = 9$$ is not below 5.
- (b) Yes: $$n = 200$$ and $$np = 2$$, so $$\text{Poisson}(2)$$.
- (c) No: $$np = 0.3$$ is small but $$n = 15$$ is below 20.

### Q: 1.5% of chips from a line are faulty. In a sample of 100, use the Poisson approximation to find the probability of exactly 2 faulty chips and of at least one, after checking the conditions.
**Topic:** 3bb Poisson approximation to the Binomial (n ≥ 20 and np < 5 · λ = np · check both conditions first · exact Binomial against the approximation)  **Lec:** 18  **Type:** apply
**A:** Key:
1. $$n = 100 \ge 20$$ and $$np = 1.5 < 5$$, so $$X$$ is approximately $$\text{Poisson}(1.5)$$.
2. $$P(X = 2) \approx \frac{1.5^2 e^{-1.5}}{2!} = 0.251$$.
3. $$P(X \ge 1) \approx 1 - e^{-1.5} = 0.777$$.

$$n = 100 \ge 20$$ and $$np = 1.5 < 5$$, so $$X$$ is approximately $$\text{Poisson}(1.5)$$.

$$
\begin{aligned}
P(X = 2) &\approx \frac{1.5^2 e^{-1.5}}{2!} = 0.251 \\
P(X \ge 1) &\approx 1 - e^{-1.5} = 0.777
\end{aligned}
$$

### Q: A count is described as "the number of defectives in a sample of 80 parts" in one problem and "the number of defects per metre of cable" in another. Which distribution fits each, and what single fact about the setup tells you?
**Topic:** 3w–aa Poisson process and Poisson distribution (counts in a fixed interval at a constant rate · pmf λ^x e^(−λ)/x! · mean and variance both λ · the rate scales with the interval, λt · four process properties · the time between events is exponential with mean 1/λ)  **Lec:** 18  **Type:** apply
**A:** Key:
1. The sample of 80 is Binomial: a fixed $$n = 80$$ trials, each a success or not, so the count cannot pass 80.
2. The cable is Poisson: defects fall at a rate along a continuous length, so the count has no upper limit.
3. The deciding fact is whether there is a fixed $$n$$.

The sample of 80 is Binomial, because there is a fixed number of trials $$n = 80$$ and each part is a success or not, so the count cannot pass 80. The cable is Poisson, because defects fall at a rate along a continuous length with no fixed number of trials, so the count has no upper limit. The fact that decides it is whether there is a fixed $$n$$.


## Lec 19 — Ch 6: Activity 6, the Poisson count and the exponential wait (prepared 2026-10-28 from the deck and the Activity 6 solutions; numbers changed)

### Q: The times between earthquakes in a region are modelled as exponential with an estimated rate of 0.18 per year. Find the probability that the next recurrence interval is shorter than 8 months.
**Topic:** 3y Waiting times in a Poisson process (P(T > t) is P(no events in t), both e^(−λt) · the kth event after time t means at most k − 1 events in t · convert t into the rate's time unit first · exponential cdf 1 − e^(−λt), mean 1/λ · histogram proportion is density times bar width)  **Lec:** 19  **Type:** apply
**A:** Key:
1. Convert to the rate's unit, $$t = \frac{8}{12} = 0.667$$ years, so $$P(T < 0.667) = 1 - e^{-0.18 \times 0.667}$$.
2. $$P(T < 0.667) = 1 - e^{-0.12} = 0.1131$$.

The rate is per year, so 8 months is $$t = \frac{8}{12} = 0.667$$ years. With $$T \sim \text{Exp}(0.18)$$:

$$
\begin{aligned}
P(T < 0.667) &= 1 - e^{-0.18 \times 0.667} \\
&= 1 - e^{-0.12} \\
&= 0.1131
\end{aligned}
$$

Using $$t = 8$$ gives $$1 - e^{-1.44} = 0.763$$, which is the probability of an interval shorter than 8 years.

### Q: A histogram of observed recurrence intervals, in years, has these bars past 4 years. Bar 4 to 6: density 0.09. Bar 6 to 8: density 0.06. Bar 8 to 12: density 0.025. Bar 12 to 20: density 0.0075. What proportion of the observed intervals exceed 4 years? Compare it with the exponential model's value at rate 0.18 per year, and say why the two need not match.
**Topic:** 3y Waiting times in a Poisson process (P(T > t) is P(no events in t), both e^(−λt) · the kth event after time t means at most k − 1 events in t · convert t into the rate's time unit first · exponential cdf 1 − e^(−λt), mean 1/λ · histogram proportion is density times bar width)  **Lec:** 19  **Type:** apply
**A:** Key:
1. A bar's proportion is its density times its width.
2. The bars give $$0.18 + 0.12 + 0.10 + 0.06 = 0.46$$.
3. The model gives $$P(T > 4) = e^{-0.18 \times 4} = e^{-0.72} = 0.487$$.
4. They need not match because the histogram is a sample and the rate is estimated from that same sample.

A bar's proportion is its density times its width.

$$
\begin{aligned}
0.09 \times 2 &= 0.18 \\
0.06 \times 2 &= 0.12 \\
0.025 \times 4 &= 0.10 \\
0.0075 \times 8 &= 0.06 \\
\text{total} &= 0.46
\end{aligned}
$$

The model gives $$P(T > 4) = e^{-0.18 \times 4} = e^{-0.72} = 0.487$$. The histogram is a sample and the rate is estimated from that same sample, so the observed 0.46 sits near the model's 0.487 but not on it.

### Q: Events follow a Poisson process at rate $$\lambda$$ per hour, and $$T$$ is the wait until the first event. Derive the cdf and the pdf of $$T$$ from the Poisson count, and state $$P(T > t)$$ in both languages.
**Topic:** 3y Waiting times in a Poisson process (P(T > t) is P(no events in t), both e^(−λt) · the kth event after time t means at most k − 1 events in t · convert t into the rate's time unit first · exponential cdf 1 − e^(−λt), mean 1/λ · histogram proportion is density times bar width)  **Lec:** 19  **Type:** derive
**A:** Key:
1. $$T > t$$ exactly when the count $$X_t$$ in $$(0, t]$$ is zero, with $$X_t \sim \text{Poisson}(\lambda t)$$.
2. $$P(T > t) = P(X_t = 0) = e^{-\lambda t}$$, so no events in $$t$$ hours and the first event after $$t$$ hours are one event.
3. $$F(t) = 1 - e^{-\lambda t}$$.
4. $$f(t) = \lambda e^{-\lambda t}$$ for $$t \ge 0$$, so $$T \sim \text{Exp}(\lambda)$$.

The wait exceeds $$t$$ exactly when the count $$X_t$$ in $$(0, t]$$ is zero, and $$X_t \sim \text{Poisson}(\lambda t)$$.

$$
\begin{aligned}
P(T > t) &= P(X_t = 0) \\
&= \frac{e^{-\lambda t}(\lambda t)^0}{0!} = e^{-\lambda t} \\
F(t) &= 1 - P(T > t) = 1 - e^{-\lambda t} \\
f(t) &= \frac{d}{dt} F(t) = \lambda e^{-\lambda t}, \quad t \ge 0
\end{aligned}
$$

So $$T \sim \text{Exp}(\lambda)$$, and "no events in $$t$$ hours" and "the first event is after $$t$$ hours" are one event with probability $$e^{-\lambda t}$$.

### Q: Earthquakes strong enough to be felt hit a region at 0.3 per year as a Poisson process. Find the probability of no felt earthquake in the next 6 years, once through the Poisson count and once through the waiting time, and check the two agree.
**Topic:** 3y Waiting times in a Poisson process (P(T > t) is P(no events in t), both e^(−λt) · the kth event after time t means at most k − 1 events in t · convert t into the rate's time unit first · exponential cdf 1 − e^(−λt), mean 1/λ · histogram proportion is density times bar width)  **Lec:** 19  **Type:** apply
**A:** Key:
1. Count: $$X \sim \text{Poisson}(0.3 \times 6 = 1.8)$$, so $$P(X = 0) = e^{-1.8}$$.
2. Wait: $$T \sim \text{Exp}(0.3)$$, so $$P(T > 6) = e^{-0.3 \times 6} = e^{-1.8}$$.
3. Both equal 0.1653.
4. They agree because no earthquake in 6 years and the first earthquake after year 6 are the same event.

Count: $$X \sim \text{Poisson}(0.3 \times 6 = 1.8)$$, so $$P(X = 0) = e^{-1.8} = 0.1653$$.

Wait: $$T \sim \text{Exp}(0.3)$$, so $$P(T > 6) = e^{-0.3 \times 6} = e^{-1.8} = 0.1653$$.

They agree because "no earthquakes in 6 years" and "the first earthquake comes after year 6" are the same event.

### Q: Felt earthquakes hit at 0.3 per year as a Poisson process, and one has just happened. Write the event "the 6th earthquake from now comes more than 20 years from now" as a statement about a Poisson count, name that count's distribution, and write the probability as a sum. Then write the complement event the same way. Give the value for checking only.
**Topic:** 3y Waiting times in a Poisson process (P(T > t) is P(no events in t), both e^(−λt) · the kth event after time t means at most k − 1 events in t · convert t into the rate's time unit first · exponential cdf 1 − e^(−λt), mean 1/λ · histogram proportion is density times bar width)  **Lec:** 19  **Type:** apply
**A:** Key:
1. The 6th earthquake is more than 20 years away exactly when at most 5 fall in the next 20 years: $$P(W_6 > 20) = P(Y \le 5)$$.
2. $$Y \sim \text{Poisson}(0.3 \times 20 = 6)$$.
3. $$P(Y \le 5) = \sum_{y = 0}^{5} \frac{e^{-6} \times 6^y}{y!} = 0.4457$$.
4. The complement is $$P(Y \ge 6) = 1 - 0.4457 = 0.5543$$.

The 6th earthquake is more than 20 years away exactly when at most 5 earthquakes fall in the next 20 years. Let $$Y$$ be the count in 20 years, $$Y \sim \text{Poisson}(0.3 \times 20 = 6)$$.

$$
\begin{aligned}
P(W_6 > 20) &= P(Y \le 5) \\
&= \sum_{y = 0}^{5} \frac{e^{-6} \times 6^y}{y!} \\
&= 0.4457
\end{aligned}
$$

The complement, "the 6th earthquake comes within 20 years", is $$P(Y \ge 6) = 1 - 0.4457 = 0.5543$$. The one just past is not counted, because the clock starts after it.

### Q: Recurrence intervals are exponential with an annual rate of 0.2403. A classmate writes two lines: "$$P(T < 10 \text{ months}) = 1 - e^{-0.2403 \times 10} = 0.9096$$" and "$$P(T > 5) = 1 - e^{-0.2403 \times 5} = 0.699$$". Find the error in each and give the correct values.
**Topic:** 3y Waiting times in a Poisson process (P(T > t) is P(no events in t), both e^(−λt) · the kth event after time t means at most k − 1 events in t · convert t into the rate's time unit first · exponential cdf 1 − e^(−λt), mean 1/λ · histogram proportion is density times bar width)  **Lec:** 19  **Type:** critique
**A:** Key:
1. The first line puts 10 into a per-year rate, giving an interval under 10 years; 10 months is $$\frac{10}{12}$$ years.
2. $$P\left(T < \frac{10}{12}\right) = 1 - e^{-0.2403 \times 0.833} = 0.1815$$.
3. The second line uses the cdf for an upper tail; longer than 5 is one minus the cdf.
4. $$P(T > 5) = e^{-0.2403 \times 5} = 0.301$$.

The first line uses 10 with a rate that is per year, so it is the probability of an interval under 10 years. Ten months is $$\frac{10}{12}$$ years:

$$
P\left(T < \frac{10}{12}\right) = 1 - e^{-0.2403 \times 0.833} = 0.1815
$$

The second line uses the cdf for an upper tail. "Longer than 5" is one minus the cdf:

$$
P(T > 5) = e^{-0.2403 \times 5} = 0.301
$$

### Q: Felt earthquakes hit at 0.3 per year as a Poisson process. Three years have passed with none. Find the probability that the next 2 years also have none, using the definition of conditional probability, and compare it with the unconditional probability of a quiet 2-year stretch.
**Topic:** 3y Waiting times in a Poisson process (P(T > t) is P(no events in t), both e^(−λt) · the kth event after time t means at most k − 1 events in t · convert t into the rate's time unit first · exponential cdf 1 − e^(−λt), mean 1/λ · histogram proportion is density times bar width)  **Lec:** 19  **Type:** apply
**A:** Key:
1. None in the next 2 given none in the first 3 is $$P(T > 5 \mid T > 3) = \frac{P(T > 5)}{P(T > 3)}$$.
2. $$\frac{e^{-1.5}}{e^{-0.9}} = e^{-0.6} = 0.5488$$.
3. The unconditional $$P(T > 2) = e^{-0.6}$$ is the same number: the three quiet years do not change the chance.

Let $$T$$ be the wait from the start. "None in the next 2 years, given none in the first 3" is $$T > 5$$ given $$T > 3$$.

$$
\begin{aligned}
P(T > 5 \mid T > 3) &= \frac{P(T > 5)}{P(T > 3)} \\
&= \frac{e^{-1.5}}{e^{-0.9}} = e^{-0.6} \\
&= 0.5488
\end{aligned}
$$

The unconditional $$P(T > 2) = e^{-0.6}$$ is the same number: the three quiet years do not change the chance of the next two. Equivalently, counts on the two non-overlapping intervals are independent, so the first three years tell you nothing about the next two.

### Q: Customers reach a counter as a Poisson process, and the time between arrivals averages 2.5 minutes. (a) Give the rate per minute and the distribution of the time between arrivals. (b) Find the probability that the next customer arrives within 1 minute. (c) Find the expected number of arrivals in 10 minutes and the probability of exactly 4 in 10 minutes.
**Topic:** 3y Waiting times in a Poisson process (P(T > t) is P(no events in t), both e^(−λt) · the kth event after time t means at most k − 1 events in t · convert t into the rate's time unit first · exponential cdf 1 − e^(−λt), mean 1/λ · histogram proportion is density times bar width)  **Lec:** 19  **Type:** apply
**A:** Key:
1. (a) The mean wait is $$\frac{1}{\lambda} = 2.5$$, so $$\lambda = 0.4$$ per minute and $$T \sim \text{Exp}(0.4)$$.
2. (b) $$P(T \le 1) = 1 - e^{-0.4} = 0.3297$$.
3. (c) The count in 10 minutes is $$X \sim \text{Poisson}(0.4 \times 10 = 4)$$, so $$E(X) = 4$$.
4. $$P(X = 4) = \frac{e^{-4} \times 4^4}{4!} = 0.1954$$.

(a) The mean wait is $$\frac{1}{\lambda} = 2.5$$, so $$\lambda = 0.4$$ per minute and $$T \sim \text{Exp}(0.4)$$.

(b)

$$
P(T \le 1) = 1 - e^{-0.4} = 0.3297
$$

(c) The count in 10 minutes is $$X \sim \text{Poisson}(0.4 \times 10 = 4)$$, so $$E(X) = 4$$ and

$$
P(X = 4) = \frac{e^{-4} \times 4^4}{4!} = 0.1954
$$

The miss to avoid is using 2.5 as the rate, which gives $$1 - e^{-2.5}$$ in (b).

### Q: Which distribution fits each count, with what parameters, and what single fact about the setup decides it? Tiles in a box of 40 are cracked with probability 0.03, independently. (a) The number of cracked tiles in one box. (b) The number of boxes opened until the first box that has at least one cracked tile. (c) Potholes occur along a highway at 1.5 per km; the number of potholes in a 2 km stretch. (d) The distance driven from a pothole to the next one. (e) The morning wait for a bus is exponential with mean 8 minutes; the number of the next 5 mornings on which the wait exceeds 10 minutes.
**Topic:** 3cc Which distribution fits (a fixed n and a count of successes is Binomial · trials until the first success is Geometric · events at a rate in an interval or region is Poisson · the wait for the next event is exponential · a per-trial probability from one model feeds a Binomial count · the 10% condition and the n ≥ 20, np < 5 check decide the shortcuts)  **Lec:** 19  **Type:** apply
**A:** Key:
1. (a) $$\text{Bin}(40, 0.03)$$: a fixed number of trials and a count of successes.
2. (b) $$\text{Geo}(p)$$ with $$p = 1 - 0.97^{40} = 0.704$$: boxes until the first box with a cracked tile.
3. (c) $$\text{Poisson}(1.5 \times 2 = 3)$$: events at a rate over a region with no fixed number of trials.
4. (d) $$\text{Exp}(1.5)$$ per km: the gap until the next event of a Poisson process.
5. (e) $$\text{Bin}(5, p)$$ with $$p = P(T > 10) = e^{-10/8} = 0.2865$$: five fixed trials.

- (a) $$\text{Bin}(40, 0.03)$$: a fixed number of trials and a count of successes.
- (b) $$\text{Geo}(p)$$ with $$p = 1 - 0.97^{40} = 0.704$$: trials until the first success, where one trial is one box and its success probability comes from (a).
- (c) $$\text{Poisson}(1.5 \times 2 = 3)$$: events at a rate over a region with no fixed number of trials.
- (d) $$\text{Exp}(1.5)$$ per km: the gap until the next event of a Poisson process, with distance in the role of time.
- (e) $$\text{Bin}(5, p)$$ with $$p = P(T > 10) = e^{-10/8} = 0.2865$$: five fixed trials, each a success when its exponential wait passes the cutoff.

### Q: Three counts: (a) the number of sixes in 10 rolls of a fair die, (b) the number of rolls until the first six, (c) the number of typos on a page when typos fall at 0.8 per page. Name each distribution and give its mean and variance. Which count has no upper limit, and which has a mean equal to its variance?
**Topic:** 3cc Which distribution fits (a fixed n and a count of successes is Binomial · trials until the first success is Geometric · events at a rate in an interval or region is Poisson · the wait for the next event is exponential · a per-trial probability from one model feeds a Binomial count · the 10% condition and the n ≥ 20, np < 5 check decide the shortcuts)  **Lec:** 19  **Type:** apply
**A:** Key:
1. (a) $$\text{Bin}(10, \frac{1}{6})$$: mean $$\frac{10}{6} = 1.667$$, variance $$10 \times \frac{1}{6} \times \frac{5}{6} = 1.389$$.
2. (b) $$\text{Geo}(\frac{1}{6})$$: mean 6, variance $$\frac{5/6}{(1/6)^2} = 30$$.
3. (c) $$\text{Poisson}(0.8)$$: mean 0.8, variance 0.8.
4. The Geometric and the Poisson have no upper limit; the Binomial stops at 10.
5. Only the Poisson has its mean equal to its variance.

- (a) $$\text{Bin}(10, \frac{1}{6})$$: mean $$\frac{10}{6} = 1.667$$, variance $$10 \times \frac{1}{6} \times \frac{5}{6} = 1.389$$.
- (b) $$\text{Geo}(\frac{1}{6})$$: mean $$6$$, variance $$\frac{5/6}{(1/6)^2} = 30$$.
- (c) $$\text{Poisson}(0.8)$$: mean 0.8, variance 0.8.

The Geometric and the Poisson have no upper limit; the Binomial stops at 10. Only the Poisson has mean equal to variance.

### Q: A classmate models the number of customers arriving at a shop in an hour as $$\text{Bin}(60, p)$$, with $$p$$ the chance that a customer arrives in any given minute. What does this model get wrong about arrivals, which model fits better, and when do the two models agree?
**Topic:** 3cc Which distribution fits (a fixed n and a count of successes is Binomial · trials until the first success is Geometric · events at a rate in an interval or region is Poisson · the wait for the next event is exponential · a per-trial probability from one model feeds a Binomial count · the 10% condition and the n ≥ 20, np < 5 check decide the shortcuts)  **Lec:** 19  **Type:** critique
**A:** Key:
1. The Binomial caps the count at 60 and allows at most one arrival per minute, but two customers can arrive in the same minute.
2. A Poisson process fits better: the hourly count is $$\text{Poisson}(\lambda)$$ with $$\lambda$$ the hourly rate.
3. They agree when $$n$$ is large and $$p$$ small: $$\text{Bin}(60, p)$$ is close to $$\text{Poisson}(60p)$$ when $$60p < 5$$.

The Binomial caps the count at 60 and allows at most one arrival per minute, but two customers can arrive in the same minute and there is no fixed number of trials. Arrivals at a constant rate with independent non-overlapping intervals are a Poisson process, so the hourly count is $$\text{Poisson}(\lambda)$$ with $$\lambda$$ the hourly rate. The two agree when $$n$$ is large and $$p$$ small, which is the Poisson approximation to the Binomial run in reverse: $$\text{Bin}(60, p)$$ is close to $$\text{Poisson}(60p)$$ when $$60p < 5$$.

### Q: A machine's parts fail as a Poisson process at 0.02 per hour. For each question name the model and write the probability: (a) at least one failure in an 8-hour shift; (b) the first failure is more than 100 hours away; (c) the number of the next 5 shifts with no failure, and the probability that all 5 are failure-free.
**Topic:** 3cc Which distribution fits (a fixed n and a count of successes is Binomial · trials until the first success is Geometric · events at a rate in an interval or region is Poisson · the wait for the next event is exponential · a per-trial probability from one model feeds a Binomial count · the 10% condition and the n ≥ 20, np < 5 check decide the shortcuts)  **Lec:** 19  **Type:** apply
**A:** Key:
1. (a) $$X \sim \text{Poisson}(0.02 \times 8 = 0.16)$$, so $$P(X \ge 1) = 1 - e^{-0.16}$$.
2. $$P(X \ge 1) = 0.1479$$.
3. (b) $$T \sim \text{Exp}(0.02)$$, so $$P(T > 100) = e^{-0.02 \times 100} = e^{-2} = 0.1353$$.
4. (c) A shift is failure-free with probability $$e^{-0.16} = 0.8521$$, so the count is $$Y \sim \text{Bin}(5, 0.8521)$$.
5. $$P(Y = 5) = 0.8521^5 = 0.4493$$.

(a) The count in 8 hours is $$X \sim \text{Poisson}(0.02 \times 8 = 0.16)$$:

$$
P(X \ge 1) = 1 - e^{-0.16} = 0.1479
$$

(b) The wait is $$T \sim \text{Exp}(0.02)$$:

$$
P(T > 100) = e^{-0.02 \times 100} = e^{-2} = 0.1353
$$

(c) A shift is failure-free with probability $$e^{-0.16} = 0.8521$$, so the number of failure-free shifts is $$Y \sim \text{Bin}(5, 0.8521)$$ and

$$
P(Y = 5) = 0.8521^5 = 0.4493
$$

which is also $$e^{-0.16 \times 5} = e^{-0.8}$$, no failure in 40 hours.

## Lec 20 — Midterm exam review: the four iClicker questions and how answers are marked (prepared 2026-11-01 from the deck and the recording; numbers changed)

### Q: Nine delivery times, in minutes, are 12, 14, 15, 15, 16, 17, 18, 19, 20. The 20 is mistyped as 200. Which of the mean, median, range, standard deviation, $$Q_1$$, $$Q_3$$ and IQR change, and why?
**Topic:** 1b Percentiles, quartiles and the IQR (np + 0.5 quantile rule · Q1, Q2, Q3 · 1.5 × IQR outlier fences)  **Lec:** 20  **Type:** apply
**A:** Key:
1. The mean, the range and the standard deviation change; the median, $$Q_1$$, $$Q_3$$ and the IQR do not.
2. The mean and the standard deviation use every value, and the range uses the two extremes, so one bad value moves them.
3. With $$n = 9$$, the median is the 5th sorted value, $$Q_1$$ averages the 2nd and 3rd and $$Q_3$$ averages the 7th and 8th, so none of them touches the largest value.
4. The mean goes from 16.22 to 36.22 and the range from 8 to 188.

This was the lecture 20 iClicker, where the answer was the IQR. By the $$np + 0.5$$ rule, $$9 \times 0.25 + 0.5 = 2.75$$, so $$Q_1 = \frac{14 + 15}{2} = 14.5$$, and $$9 \times 0.75 + 0.5 = 7.25$$, so $$Q_3 = \frac{18 + 19}{2} = 18.5$$. Both stay put, so the IQR stays 4, and the median stays 16. The standard deviation jumps from 2.54 to 61.45. A summary built from every value or from the extremes is sensitive to outliers; one built from the middle half is not.

### Q: $$P(A) = 0.3$$ and $$P(B) = 0.6$$. Which statement is true? (a) If $$A$$ and $$B$$ are disjoint, $$P(A \cup B) = 0.72$$. (b) If $$A$$ and $$B$$ are independent, $$P(A \cup B) = 0.90$$. (c) If $$A$$ and $$B$$ are independent, $$P(A \cup B) = 0.72$$. (d) If $$A$$ and $$B$$ are disjoint, $$P(A \cup B) = 0.18$$.
**Topic:** 2f Probability rules and the addition rule (outcome probabilities sum to 1 · complement rule · general addition rule · countable additivity · three-event rule)  **Lec:** 20  **Type:** apply
**A:** Key:
1. (c): independent events multiply for the intersection, so $$P(A \cap B) = 0.18$$ and $$P(A \cup B) = 0.3 + 0.6 - 0.18 = 0.72$$.
2. Disjoint events have $$P(A \cap B) = 0$$, so their union is 0.90, which rules out (a) and (d).
3. (b) uses the disjoint value for independent events.

The general addition rule holds for any two events; the condition only decides the intersection.

$$
\begin{aligned}
P(A \cap B) &= 0.3 \times 0.6 = 0.18 \\
P(A \cup B) &= 0.3 + 0.6 - 0.18 \\
&= 0.72
\end{aligned}
$$

In the lecture 20 iClicker only 68% got the matching question right: most wrong answers took the disjoint sum and missed that the option paired it with independence. Read which condition each option names before you compute.

### Q: $$\operatorname{Var}(W) = 2$$, $$\operatorname{Var}(X) = 5$$, $$\operatorname{Var}(Y) = 1$$ and $$\operatorname{Cov}(X, Y) = 1.5$$. $$W$$ is independent of $$X$$ and of $$Y$$. Find $$\operatorname{Var}(T)$$ for $$T = 3W + 2X - 4Y$$: (a) 51 (b) 54 (c) 78 (d) 30.
**Topic:** 3j–k Covariance, sums and the sample mean (Cov as E of XY minus E X times E Y · sign of Cov · the 2ab Cov term · minus signs still add variances · mean μ and variance σ²/n of X̄)  **Lec:** 20  **Type:** apply
**A:** Key:
1. $$W$$ is independent of $$X$$ and $$Y$$, so $$\operatorname{Cov}(W, X) = \operatorname{Cov}(W, Y) = 0$$ and only the $$X, Y$$ covariance term stays.
2. The variances enter with squared coefficients: $$9(2) + 4(5) + 16(1) = 54$$.
3. The covariance term is $$2(2)(-4)(1.5) = -24$$, so $$\operatorname{Var}(T) = 30$$, answer (d).

$$
\begin{aligned}
\operatorname{Var}(T) &= 3^2(2) + 2^2(5) + (-4)^2(1) \\
&\quad + 2(2)(-4)(1.5) \\
&= 18 + 20 + 16 - 24 \\
&= 30
\end{aligned}
$$

Each wrong option is one slip: (b) 54 ignores the covariance, (c) 78 drops the minus sign on $$Y$$'s coefficient in the covariance term, and (a) 51 leaves the coefficients out of it, $$54 - 2(1.5)$$. In the lecture 20 iClicker this kind of question was answered correctly by only 50%.

### Q: The standard Normal table runs from about $$z = -3.49$$ to $$z = 3.49$$. Give (a) $$P(Z > 4.6)$$, (b) $$P(Z < 6.2)$$ and (c) $$P(-5.1 < Z < 0)$$, and say why no table entry is needed.
**Topic:** 3p Z-scores and standard Normal calculations (z = (x − μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** 20  **Type:** apply
**A:** Key:
1. At the table's ends the left areas are already 0.0002 and 0.9998, so beyond them the probabilities are taken as 0 or 1.
2. (a) $$P(Z > 4.6) \approx 0$$.
3. (b) $$P(Z < 6.2) \approx 1$$.
4. (c) $$P(-5.1 < Z < 0) \approx 0.5 - 0 = 0.5$$.

Almost all the area lies within 3 standard deviations of the mean, 99.7% by the empirical rule, which is why the table stops near 3.49. For (c), $$P(Z < 0) = 0.5$$ by symmetry and $$P(Z < -5.1) \approx 0$$. This was the lecture 20 iClicker ($$P(Z > 5)$$, about 0), and the instructor called it an easy mark.

### Q: Bottle fills are Normal with mean 500 mL and standard deviation 8 mL, independently from bottle to bottle. A question asks for the distribution of the mean fill of 16 bottles, and a student writes "$$\bar{X}$$ is Normal with mean 500". What does that earn, and what is the full-marks answer?
**Topic:** 3o Linear combinations of Normals and the sample mean (aX + b stays Normal · independent sums: means add with the coefficients, variances with squared coefficients · identically distributed collapse · X̄ ~ N(μ, σ²/n) · total and mean routes give the same z · φ and Φ)  **Lec:** 20  **Type:** critique
**A:** Key:
1. Part marks only: the random variable is not defined in words and the variance is missing.
2. Define it: $$\bar{X}$$ is the mean fill, in mL, of the 16 bottles.
3. $$\bar{X} \sim N(500, 4)$$, because the variance is $$\frac{\sigma^2}{n} = \frac{64}{16} = 4$$, a standard deviation of 2 mL.
4. $$\bar{X}$$ is Normal because it is a linear combination of independent Normals.

In lecture 20 the instructor said that naming a Normal distribution without its mean and variance earns only part marks, and that the random variable must be defined from the question's wording, because the question will not define it for you.

$$
\begin{aligned}
\bar{X} &\sim N\left(\mu, \frac{\sigma^2}{n}\right) \\
&= N\left(500, \frac{8^2}{16}\right) \\
&= N(500, 4)
\end{aligned}
$$

### Q: The wait for a shuttle is uniform between 5 and 15 minutes. Write the working that earns full marks for the mean and the standard deviation of the wait.
**Topic:** 3g–i Mean, variance, uniform and exponential (E and Var by integration · the shortcut · uniform mean and variance · exponential mean and variance by parts · median from F)  **Lec:** 20  **Type:** apply
**A:** Key:
1. Define the variable and its distribution first: $$X$$ is the wait in minutes, $$X \sim U(5, 15)$$.
2. $$E(X) = \frac{a + b}{2} = \frac{5 + 15}{2} = 10$$ minutes.
3. $$\operatorname{Var}(X) = \frac{(b - a)^2}{12} = \frac{100}{12} = 8.33$$, so $$\operatorname{SD}(X) = 2.89$$ minutes.

In lecture 20 the instructor named the common mistake: copying numbers from the cheat sheet into a formula without saying what the random variable is or which distribution it has. State $$X$$, the distribution and its parameters, write the general formula, then substitute.

$$
\begin{aligned}
E(X) &= \frac{5 + 15}{2} = 10 \\
\operatorname{Var}(X) &= \frac{(15 - 5)^2}{12} \\
&= 8.33 \\
\operatorname{SD}(X) &= \sqrt{8.33} = 2.89
\end{aligned}
$$

### Q: For which of these may you answer with a tree diagram, and what must the tree still show for full marks? Then answer (c).
- (a) A part comes from one of three machines with known shares and defect rates; find $$P(\text{machine 2} \mid \text{defective})$$.
- (b) A die is rolled twice; find $$P(\text{first roll is 6} \mid \text{sum at least 10})$$.
- (c) A fair coin is flipped three times; find $$P(\text{first flip heads} \mid \text{exactly two heads})$$.
**Topic:** 2i Bayes' theorem and the law of total probability (partition · weighted average of the branch rates · reversing the conditional · posterior vs prior)  **Lec:** 20  **Type:** apply
**A:** Key:
1. (a) and (c) suit a tree, because they have few branches: three then two, and 8 outcomes. (b) has 36 outcomes, so list them in a table instead.
2. A tree still needs each event defined in words with a letter, a probability on every branch, and the conditional probability formula written before the numbers.
3. (c) $$P(H_1 \mid \text{two heads}) = \frac{2}{8} \div \frac{3}{8} = \frac{2}{3}$$.

In lecture 20 the instructor said a tree diagram can replace Bayes' theorem, as long as the events are defined and the formula is written, and that it suits only a small number of outcomes: three coin flips yes, two dice rolls no. For (c), two heads in three flips is HHT, HTH or THH, each with probability $$\frac{1}{8}$$, and the first flip is heads in two of them.

$$
\begin{aligned}
P(H_1 \mid \text{two heads}) &= \frac{P(\text{HHT}, \text{HTH})}{P(\text{HHT}, \text{HTH}, \text{THH})} \\
&= \frac{2}{8} \div \frac{3}{8} = \frac{2}{3}
\end{aligned}
$$

For (b), the table gives 6 outcomes with a sum of at least 10, three of them with a first roll of 6, so the answer is $$\frac{3}{6} = \frac{1}{2}$$.

### Q: True or false, and justify each. (a) A Venn diagram shows that $$A$$ and $$B$$ are independent. (b) Disjoint events show on a Venn diagram as regions that do not overlap. (c) If $$P(A \mid B) = P(A)$$, then $$P(A \cap B) = P(A)\,P(B)$$ and $$P(B \mid A) = P(B)$$. (d) $$P(A) = 0.5$$, $$P(B) = 0.4$$ and $$P(A \cap B) = 0.2$$, so $$A$$ and $$B$$ are independent.
**Topic:** 2d–e Independence (three equivalent tests · disjoint events are never independent · never assume independence unless stated · complements of independent events · at least one via the complement)  **Lec:** 20  **Type:** critique
**A:** Key:
1. (a) False: a Venn diagram shows which outcomes the events share, not whether $$P(A \cap B) = P(A)\,P(B)$$, so independence is checked with an equation.
2. (b) True: disjoint events share no outcome, so their regions do not overlap.
3. (c) True: the three tests are equivalent, so if one holds the other two hold.
4. (d) True: $$0.5 \times 0.4 = 0.2 = P(A \cap B)$$.

The instructor made point (a) in lecture 20: disjointness can be drawn, independence cannot. The three equivalent tests are $$P(A \cap B) = P(A)\,P(B)$$, $$P(A \mid B) = P(A)$$ and $$P(B \mid A) = P(B)$$.

## WeBWorK 6 — Ch 6 and Ch 7 (opened by Oct 30, due Thu Nov 12; banked 2026-10-30, numbers changed)

### Q: WeBWorK-style. Bulb lifetimes are exponential with mean 0.8 years. A tester records each bulb as a success when it lasts more than 1.2 years. Find (a) the probability that the first success is the 4th bulb, (b) the probability that the second success is the 7th bulb given that the first was the 2nd, and (c) the probability that the first success falls on an odd-numbered bulb.
**Topic:** 3t–v Geometric distribution (trials until the first success · pmf p(1 − p)^(x − 1) for x = 1, 2, … · mean 1/p is the return period · variance (1 − p)/p² · cdf 1 − (1 − p)^x by the geometric series · P(X > x) = (1 − p)^x, the first x trials fail)  **Lec:** WW6  **Type:** apply
**A:** Key:
1. The bulb count to a success is Geometric with $$p = P(Y > 1.2) = e^{-1.2/0.8}$$.
2. $$p = e^{-1.5} = 0.2231$$.
3. (a) $$P(N = 4) = p(1 - p)^3 = 0.2231 \times 0.7769^3 = 0.105$$.
4. (b) By independence the wait restarts after bulb 2, so the answer is $$p(1 - p)^4 = 0.081$$.
5. (c) Summing the odd terms gives $$\frac{p}{1 - (1 - p)^2} = \frac{1}{2 - p} = 0.56$$.

The per-bulb success probability comes from the exponential upper tail, and the count of bulbs to a success is Geometric with that $$p$$.

$$
\begin{aligned}
p &= P(Y > 1.2) \\
&= e^{-1.2 / 0.8} \\
&= e^{-1.5} = 0.2231
\end{aligned}
$$

(a) Three failures, then a success.

$$
\begin{aligned}
P(N = 4) &= p(1 - p)^3 \\
&= 0.2231 \times 0.7769^3 \\
&= 0.105
\end{aligned}
$$

(b) The trials are independent, so after the first success at bulb 2 the wait starts over: the second success at bulb 7 is a first success 5 bulbs later, $$p(1 - p)^4 = 0.081$$.

(c) Add the odd terms, a geometric series with ratio $$(1 - p)^2$$.

$$
\begin{aligned}
P(\text{odd}) &= \sum_{k = 0}^{\infty} p(1 - p)^{2k} \\
&= \frac{p}{1 - (1 - p)^2} \\
&= \frac{1}{2 - p} = 0.56
\end{aligned}
$$

### Q: WeBWorK-style. A help centre is built for at most 30 visitors a day. Daily visitors are Normal with mean 18 and variance 25. Find (a) the return period of an overloaded day, to the nearest day, and (b) the probability that the design number is not exceeded before the 8th day.
**Topic:** 3t–v Geometric distribution (trials until the first success · pmf p(1 − p)^(x − 1) for x = 1, 2, … · mean 1/p is the return period · variance (1 − p)/p² · cdf 1 − (1 − p)^x by the geometric series · P(X > x) = (1 − p)^x, the first x trials fail)  **Lec:** WW6  **Type:** apply
**A:** Key:
1. An overloaded day has $$p = P(X > 30) = P\left(Z > \frac{30 - 18}{5}\right)$$, and the days to the first one are Geometric.
2. $$p = P(Z > 2.4) = 0.0082$$.
3. (a) The return period is $$\frac{1}{p} = 122$$ days.
4. (b) Days 1 to 7 must all be fine: $$P(N > 7) = (1 - p)^7 = 0.9918^7 = 0.944$$.

An overloaded day is a success with probability $$p = P(X > 30)$$; the days until the first one are Geometric, and the return period is its mean $$\frac{1}{p}$$. The variance is 25, so $$\sigma = 5$$.

$$
\begin{aligned}
p &= P\left(Z > \frac{30 - 18}{5}\right) \\
&= P(Z > 2.4) = 0.0082 \\
\frac{1}{p} &= 122 \text{ days}
\end{aligned}
$$

(b) "Not exceeded before the 8th day" means days 1 to 7 are all fine, $$P(N > 7) = (1 - p)^7 = 0.9918^7 = 0.944$$. The trap is using $$\sigma = 25$$, the variance, in the z-score.

## Lec 21 — Ch 7: statistics, sampling distributions and the Central Limit Theorem (prepared 2026-11-02 from the deck, updated 2026-11-04 from the recording; Canvas calls it Lecture 22; numbers changed)

### Q: A study of 200 UBC commuters finds a mean commute of 34 minutes. For each, say whether it is a statistic or a parameter: (a) the 34 minutes, (b) the mean commute of all UBC commuters, (c) the standard deviation of the 200 commutes, (d) the proportion of all UBC commuters who bike. Which of them is known in practice?
**Topic:** 4e CLT for averages and sums (statistic vs parameter · sampling distribution of X̄ · mean μ and standard error σ/√n · exactly Normal from a Normal population · any population with n ≥ 20 gives X̄ ≈ N(μ, σ²/n) · the total T ≈ N(nμ, nσ²))  **Lec:** 21  **Type:** recall
**A:** Key:
1. (a) and (c) are statistics; (b) and (d) are parameters.
2. A statistic summarises the sample, a parameter summarises the population.
3. Only the statistics are known; a parameter's value is unknown in practice and is estimated by a statistic.

The 34 minutes is $$\bar{x}$$ and the sample standard deviation is $$s$$, both computed from the 200 people. The mean $$\mu$$ and the proportion of all commuters describe the whole population, which nobody measured. A statistic changes from sample to sample (sampling variability); a parameter is one fixed, unknown number.

### Q: Exam scores in a large course are Normal with mean 70 and standard deviation 12. A random sample of 16 scores is taken. What is the distribution of $$\bar{X}$$, and what is $$P(\bar{X} > 73)$$?
**Topic:** 4e CLT for averages and sums (statistic vs parameter · sampling distribution of X̄ · mean μ and standard error σ/√n · exactly Normal from a Normal population · any population with n ≥ 20 gives X̄ ≈ N(μ, σ²/n) · the total T ≈ N(nμ, nσ²))  **Lec:** 21  **Type:** apply
**A:** Key:
1. $$\bar{X}$$ is exactly Normal because the population is Normal: $$\bar{X} \sim N(70, \frac{144}{16})$$, standard error $$\frac{12}{\sqrt{16}} = 3$$.
2. $$z = \frac{73 - 70}{3} = 1$$.
3. $$P(\bar{X} > 73) = 1 - \Phi(1) = 0.1587$$.

No CLT is needed here: a sample mean from a Normal population is Normal for any $$n$$, even 16, which is under the book's 20.

$$
\begin{aligned}
SE &= \frac{\sigma}{\sqrt{n}} = \frac{12}{4} = 3 \\
z &= \frac{73 - 70}{3} = 1 \\
P(\bar{X} > 73) &= 1 - 0.8413 \\
&= 0.1587
\end{aligned}
$$

### Q: Call lengths at a help desk are exponential with mean 5 minutes (so the standard deviation is also 5). For a random sample of 36 calls, find the approximate probability that the average call is under 4.5 minutes, and say why a Normal calculation is allowed.
**Topic:** 4e CLT for averages and sums (statistic vs parameter · sampling distribution of X̄ · mean μ and standard error σ/√n · exactly Normal from a Normal population · any population with n ≥ 20 gives X̄ ≈ N(μ, σ²/n) · the total T ≈ N(nμ, nσ²))  **Lec:** 21  **Type:** apply
**A:** Key:
1. By the CLT, $$n = 36 \ge 20$$ makes $$\bar{X} \approx N(5, \frac{25}{36})$$ even though the population is skewed; standard error $$\frac{5}{6} = 0.833$$.
2. $$z = \frac{4.5 - 5}{0.833} = -0.6$$.
3. $$P(\bar{X} < 4.5) \approx \Phi(-0.6) = 0.2743$$.

The exponential is strongly right-skewed, so a single call cannot be treated as Normal, but the average of 36 can.

$$
\begin{aligned}
SE &= \frac{5}{\sqrt{36}} = 0.833 \\
z &= \frac{4.5 - 5}{0.833} = -0.6 \\
P(\bar{X} < 4.5) &\approx 0.2743
\end{aligned}
$$

### Q: A shipment holds 40 bags of rice. Each bag's weight has mean 2.0 kg and standard deviation 0.3 kg, and the weights are independent. Find the approximate probability that the shipment's total weight exceeds 81 kg.
**Topic:** 4e CLT for averages and sums (statistic vs parameter · sampling distribution of X̄ · mean μ and standard error σ/√n · exactly Normal from a Normal population · any population with n ≥ 20 gives X̄ ≈ N(μ, σ²/n) · the total T ≈ N(nμ, nσ²))  **Lec:** 21  **Type:** apply
**A:** Key:
1. CLT for a sum: $$T \approx N(n\mu, n\sigma^2) = N(80, 3.6)$$, standard deviation $$0.3\sqrt{40} = 1.897$$.
2. $$z = \frac{81 - 80}{1.897} = 0.53$$.
3. $$P(T > 81) \approx 1 - \Phi(0.53) = 0.298$$.

The question is about a total, so use $$T = n\bar{X}$$ rather than the average. The same answer comes from the average: $$T > 81$$ means $$\bar{X} > 2.025$$, and $$\frac{2.025 - 2}{0.3 / \sqrt{40}} = 0.53$$.

$$
\begin{aligned}
E(T) &= 40 \times 2.0 = 80 \\
\operatorname{Var}(T) &= 40 \times 0.09 = 3.6 \\
\operatorname{SD}(T) &= \sqrt{3.6} = 1.897 \\
z &= \frac{81 - 80}{1.897} = 0.53 \\
P(T > 81) &= 1 - 0.7019 \\
&= 0.298
\end{aligned}
$$

### Q: True or false, and justify: the Central Limit Theorem says that as the sample size grows, the population distribution becomes Normal.
**Topic:** 4e CLT for averages and sums (statistic vs parameter · sampling distribution of X̄ · mean μ and standard error σ/√n · exactly Normal from a Normal population · any population with n ≥ 20 gives X̄ ≈ N(μ, σ²/n) · the total T ≈ N(nμ, nσ²))  **Lec:** 21  **Type:** apply
**A:** Key:
1. False: the CLT is about the sampling distribution of $$\bar{X}$$, not the population.
2. The population keeps its shape; a larger sample only shows that shape more clearly.
3. For large $$n$$ ($$n \ge 20$$), $$\bar{X}$$ is approximately $$N(\mu, \frac{\sigma^2}{n})$$ whatever the population's shape.

A histogram of one big sample from a skewed population is still skewed. What turns Normal is the histogram of many sample means, each from its own sample of size $$n$$, which is what the StatSpace applet in the lecture shows.

### Q: Starting from $$T = n\bar{X}$$, derive the mean and variance of the total $$T = X_1 + \cdots + X_n$$ of a random sample with mean $$\mu$$ and variance $$\sigma^2$$. How does the standard deviation of the total compare with the standard error of the mean as $$n$$ grows?
**Topic:** 4e CLT for averages and sums (statistic vs parameter · sampling distribution of X̄ · mean μ and standard error σ/√n · exactly Normal from a Normal population · any population with n ≥ 20 gives X̄ ≈ N(μ, σ²/n) · the total T ≈ N(nμ, nσ²))  **Lec:** 21  **Type:** derive
**A:** Key:
1. $$E(T) = nE(\bar{X}) = n\mu$$.
2. $$\operatorname{Var}(T) = n^2 \operatorname{Var}(\bar{X}) = n^2 \times \frac{\sigma^2}{n} = n\sigma^2$$.
3. The constant $$n$$ comes out of the variance squared.
4. $$\operatorname{SD}(T) = \sigma\sqrt{n}$$ grows with $$n$$, while the standard error $$\frac{\sigma}{\sqrt{n}}$$ shrinks.

$$
\begin{aligned}
E(T) &= E(n\bar{X}) \\
&= nE(\bar{X}) = n\mu \\
\operatorname{Var}(T) &= \operatorname{Var}(n\bar{X}) \\
&= n^2 \operatorname{Var}(\bar{X}) \\
&= n^2 \times \frac{\sigma^2}{n} \\
&= n\sigma^2
\end{aligned}
$$

Adding up more values makes the total less predictable in absolute terms, but averaging divides by $$n$$, so the average gets more precise. With the CLT, $$T \approx N(n\mu, n\sigma^2)$$ for large $$n$$.

### Q: A population has standard deviation $$\sigma = 6$$. (a) What sample size makes the standard error of $$\bar{X}$$ equal to 1.5? (b) If the sample size is then multiplied by 4, what happens to the standard error?
**Topic:** 4e CLT for averages and sums (statistic vs parameter · sampling distribution of X̄ · mean μ and standard error σ/√n · exactly Normal from a Normal population · any population with n ≥ 20 gives X̄ ≈ N(μ, σ²/n) · the total T ≈ N(nμ, nσ²))  **Lec:** 21  **Type:** apply
**A:** Key:
1. (a) $$\frac{6}{\sqrt{n}} = 1.5$$ gives $$\sqrt{n} = 4$$, so $$n = 16$$.
2. (b) The standard error halves, to 0.75, because it falls with $$\sqrt{n}$$ and $$\sqrt{4} = 2$$.

$$
\begin{aligned}
\frac{6}{\sqrt{n}} &= 1.5 \\
\sqrt{n} &= 4 \\
n &= 16 \\
\frac{6}{\sqrt{64}} &= 0.75
\end{aligned}
$$

To halve the standard error you need four times the data, not twice. A common slip is dividing $$\sigma$$ by $$n$$ instead of $$\sqrt{n}$$.

### Q: A survey firm studies the monthly rents of Vancouver renters by drawing a random sample of 40 renters. Which of these has a sampling distribution?
- (a) The mean rent of all Vancouver renters, $$\mu$$.
- (b) The mean rent $$\bar{x}$$ of the 40 renters in the sample.
- (c) Both (a) and (b).
- (d) Neither (a) nor (b).
**Topic:** 4e CLT for averages and sums (statistic vs parameter · sampling distribution of X̄ · mean μ and standard error σ/√n · exactly Normal from a Normal population · any population with n ≥ 20 gives X̄ ≈ N(μ, σ²/n) · the total T ≈ N(nμ, nσ²))  **Lec:** 21  **Type:** apply
**A:** Key:
1. (b): a sampling distribution is the distribution of a statistic.
2. $$\bar{x}$$ changes from one sample of 40 to the next, so the sample mean is a random variable and has a distribution.
3. $$\mu$$ is one fixed number, unknown but constant, so it has no distribution, which rules out (a) and (c).

This is the lecture 21 clicker question ("Sampling distributions describe the distribution of ...", answer (B), statistics) on a concrete stem. The trap is (c). The sampling distribution of $$\bar{X}$$ is centred at $$\mu$$ and shows how close $$\bar{x}$$ tends to land to it, so $$\mu$$ appears in it, but $$\mu$$ itself does not change from sample to sample.

### Q: True or false, and justify: a random sample of at least 30 guarantees that the sampling distribution of $$\bar{X}$$ is Normal, whatever the population.
**Topic:** 4e CLT for averages and sums (statistic vs parameter · sampling distribution of X̄ · mean μ and standard error σ/√n · exactly Normal from a Normal population · any population with n ≥ 20 gives X̄ ≈ N(μ, σ²/n) · the total T ≈ N(nμ, nσ²))  **Lec:** 21  **Type:** critique
**A:** Key:
1. False: the CLT only makes $$\bar{X}$$ approximately Normal, and 30 is a rule of thumb, not a guarantee.
2. How large $$n$$ must be depends on the population's shape; a highly skewed population can need more than 30.
3. $$\bar{X}$$ is exactly Normal only when the population is Normal, and then for any $$n$$.
4. In this course the textbook's $$n \ge 20$$ is accepted as large.

In lecture 21 the instructor said there is no clear-cut rule. The usual rule of thumb is $$n > 30$$, the textbook uses 20, sometimes 15 is enough, and even 30 is not enough for a highly skewed population. The StatSpace applet showed it: from a right-skewed population of weekly coffee cups, samples of 30 gave a sampling distribution of $$\bar{x}$$ that was still a bit skewed, while samples of 50 gave an approximately Normal one. When you do use the CLT in a written answer, write "by CLT".

### Q: The number of library books a UBC student borrows in a term is right-skewed: most borrow 0 to 2 and a few borrow 20 or more. The mean is 3 books and the standard deviation is 4 books. A simulation draws 1000 random samples of size $$n$$ and plots a histogram of the 1000 sample means.
- (a) For $$n = 8$$, give that histogram's centre, its standard error and its shape.
- (b) For $$n = 64$$, give the same three.
- (c) Describe the histogram of the 64 values in one of those samples.
**Topic:** 4e CLT for averages and sums (statistic vs parameter · sampling distribution of X̄ · mean μ and standard error σ/√n · exactly Normal from a Normal population · any population with n ≥ 20 gives X̄ ≈ N(μ, σ²/n) · the total T ≈ N(nμ, nσ²))  **Lec:** 21  **Type:** apply
**A:** Key:
1. Both histograms of means are centred at $$\mu = 3$$, because $$E(\bar{X}) = \mu$$ for any $$n$$.
2. (a) The standard error is $$\frac{4}{\sqrt{8}} = 1.41$$, and the shape is still right-skewed, because 8 values from a skewed population are too few for the CLT.
3. (b) The standard error is $$\frac{4}{\sqrt{64}} = 0.5$$, and by the CLT the shape is approximately Normal, $$\bar{X} \approx N(3, 0.25)$$.
4. (c) That is the sample distribution, which looks like the population: right-skewed, with a mean near 3 and a standard deviation near 4.

$$
\begin{aligned}
SE_{8} &= \frac{4}{\sqrt{8}} \\
&= 1.41 \\
SE_{64} &= \frac{4}{\sqrt{64}} \\
&= 0.5
\end{aligned}
$$

This is the lecture 21 StatSpace applet with new numbers. There the population was cups of coffee per week, right-skewed with mean 2.5. Samples of 10 gave a sampling distribution that was still skewed, samples of 50 gave an approximately Normal one centred at 2.5, and samples of 100 gave a narrower one. In the histogram of means, the horizontal axis is the value of $$\bar{x}$$ and each observation is one whole sample's mean. The centre and the standard error hold for any $$n$$; only the Normal shape needs the CLT. A bigger sample does two different things: one sample's histogram looks more like the skewed population, while the histogram of means looks more Normal and gets narrower. The trap is answering Normal for (c), as if a large sample made the data themselves Normal.

## Lec 22 — Ch 7: CLT examples, the CLT activity and the Normal approximation to the Binomial (prepared 2026-11-04 from the after-class deck, the activity solutions and the recording's slide index; Canvas calls it Lecture 23; numbers changed)

### Q: Repair bills at a garage are right-skewed with mean 300 dollars and standard deviation 240 dollars. Find the approximate probability that the mean of a random sample of 45 bills is under 250 dollars, and say what allows a Normal calculation.
**Topic:** 4e CLT for averages and sums  **Lec:** 22  **Type:** apply
**A:** Key:
1. The CLT: the bills are skewed, but $$n = 45 \ge 20$$, so $$\bar{X} \approx N\left(300, \frac{240^2}{45}\right)$$ with standard error $$\frac{240}{\sqrt{45}} = 35.78$$.
2. $$z = \frac{250 - 300}{35.78} = -1.40$$.
3. $$P(\bar{X} < 250) \approx 1 - \Phi(1.40) = 0.0808$$.

One bill is not Normal, so the exact lecture 14 result does not apply; the sample size is what lets the average be treated as Normal. This is the deck's Example 1 with new numbers.

$$
\begin{aligned}
SE &= \frac{240}{\sqrt{45}} = 35.78 \\
z &= \frac{250 - 300}{35.78} \\
&= -1.40 \\
P(\bar{X} < 250) &\approx P(Z > 1.40) \\
&= 1 - 0.9192 \\
&= 0.0808
\end{aligned}
$$

The trap is dividing by 240, one bill's standard deviation, which gives $$z = -0.21$$ and treats the average as if it varied as much as one bill.

### Q: Checkout times at a café are Normal with mean 4 minutes and standard deviation 1.5 minutes. For 6 randomly chosen customers, find the probability that their average checkout time is at most 4.5 minutes, and say whether the CLT is needed.
**Topic:** 4e CLT for averages and sums  **Lec:** 22  **Type:** apply
**A:** Key:
1. No CLT is needed: the times are Normal, so $$\bar{X}$$ is exactly $$N\left(4, \frac{1.5^2}{6}\right)$$ for any $$n$$, with standard error $$\frac{1.5}{\sqrt{6}} = 0.612$$.
2. $$z = \frac{4.5 - 4}{0.612} = 0.82$$.
3. $$P(\bar{X} \le 4.5) = \Phi(0.82) = 0.7939$$.

The average of independent Normal values is a linear combination of Normals, so it is Normal whatever $$n$$ is (lecture 14). That $$n = 6$$ is under 20 does not matter here. This is the deck's Example 2 with new numbers.

$$
\begin{aligned}
SE &= \frac{1.5}{\sqrt{6}} = 0.612 \\
z &= \frac{4.5 - 4}{0.612} \\
&= 0.82 \\
P(\bar{X} \le 4.5) &= 0.7939
\end{aligned}
$$

The trap is using 1.5 instead of the standard error, which gives $$z = 0.33$$ and 0.6293.

### Q: Commute distances of a city's workers are right-skewed with mean 14 km and standard deviation 9 km. For each probability, say whether the CLT can be used to find it, and why.
- (a) The average distance of 50 randomly chosen workers is over 15 km.
- (b) One randomly chosen worker commutes over 15 km.
- (c) The average distance of 10 randomly chosen workers is over 15 km.
**Topic:** 4e CLT for averages and sums  **Lec:** 22  **Type:** apply
**A:** Key:
1. (a) Yes: $$n = 50 \ge 20$$, so the average is approximately $$N\left(14, \frac{81}{50}\right)$$ whatever the shape of one distance.
2. (b) No: one worker's distance keeps the population's skewed shape; the CLT is about an average or a sum of many values.
3. (c) No: $$n = 10 < 20$$ and the population is not Normal, so neither the CLT nor the exact Normal result applies.

This is the lecture's first clicker question ("Can the CLT be used?") on a new scenario, with two contrasts added. The CLT never changes the population: one value from a skewed population is still skewed. It only says that the average of many values is close to Normal, and this course counts 20 or more as many.

### Q: Juice bottle fill volumes are Normal with mean 500 mL and standard deviation 4 mL, and an inspector averages 4 bottles. True or false, and justify: because 4 is fewer than 20, the Normal table cannot be used for the average.
**Topic:** 4e CLT for averages and sums  **Lec:** 22  **Type:** apply
**A:** Key:
1. False: the volumes are Normal, so the average is exactly Normal for any $$n$$, here $$N\left(500, \frac{4^2}{4}\right)$$ with standard error 2 mL.
2. The reason is that $$\bar{X}$$ is a linear combination of independent Normals, not the CLT.
3. The $$n \ge 20$$ rule belongs to the CLT, which is needed only when the population is not Normal.

This is the lecture's second clicker question ("Do we need the CLT?", answer No) on a new scenario. The linear-combination result is from lecture 14. For example, $$P(\bar{X} < 497) = P(Z < -1.50) = 1 - 0.9332 = 0.0668$$ is an exact answer, not an approximation.

### Q: Repair times at a bike shop are exponential with rate $$\lambda = 0.05$$ per minute. For a random sample of 64 repairs, find the approximate probability that the average repair time is between 18 and 23 minutes.
**Topic:** 4e CLT for averages and sums  **Lec:** 22  **Type:** apply
**A:** Key:
1. By the CLT, since $$n = 64 \ge 20$$, $$\bar{X} \approx N\left(\mu, \frac{\sigma^2}{n}\right)$$ with $$\mu = \sigma = \frac{1}{\lambda} = 20$$ minutes.
2. The standard error is $$\frac{20}{\sqrt{64}} = 2.5$$ minutes.
3. $$z = \frac{18 - 20}{2.5} = -0.80$$ and $$z = \frac{23 - 20}{2.5} = 1.20$$.
4. $$P \approx \Phi(1.20) - \Phi(-0.80) = 0.8849 - 0.2119 = 0.6730$$.

This is the in-class CLT activity with new numbers. For an exponential the standard deviation equals the mean, $$\frac{1}{\lambda}$$, because the variance is $$\frac{1}{\lambda^2}$$. One repair time is strongly skewed, so only the CLT makes the average Normal.

$$
\begin{aligned}
SE &= \frac{20}{\sqrt{64}} = 2.5 \\
&P(18 < \bar{X} < 23) \\
&= P(-0.80 < Z < 1.20) \\
&= 0.8849 - (1 - 0.7881) \\
&= 0.6730
\end{aligned}
$$

### Q: 30% of a city's adults cycle to work. In a random sample of 50 adults, $$X$$ is the number who cycle. Check that the Normal approximation is allowed, then use it with the continuity correction to find the probability that fewer than 12 cycle.
**Topic:** 4b Normal approximation to the Binomial  **Lec:** 22  **Type:** apply
**A:** Key:
1. $$np = 15 \ge 5$$ and $$n(1 - p) = 35 \ge 5$$, so $$X \approx N(15, 10.5)$$ with $$\sigma = \sqrt{10.5} = 3.240$$.
2. Fewer than 12 is at most 11, so $$P(X < 12) = P(X \le 11) \approx P(Y \le 11.5)$$.
3. $$z = \frac{11.5 - 15}{3.240} = -1.08$$.
4. $$P \approx 1 - \Phi(1.08) = 1 - 0.8599 = 0.1401$$.

$$X \sim \text{Bin}(50, 0.3)$$, with mean $$np = 50 \times 0.3 = 15$$ and variance $$np(1 - p) = 15 \times 0.7 = 10.5$$. The bar for 11 runs from 10.5 to 11.5, so "at most 11" ends at 11.5.

$$
\begin{aligned}
z &= \frac{11.5 - 15}{\sqrt{10.5}} \\
&= -1.08 \\
P(Y \le 11.5) &= 1 - 0.8599 \\
&= 0.1401
\end{aligned}
$$

The exact Binomial answer is 0.1390. Cutting at 12 instead gives 0.1762, because it adds half of the bar for 12, which is not in the event. Cutting at 11 gives 0.1093, because it drops half of the bar for 11.

### Q: $$X$$ is a Binomial count and $$Y$$ is the Normal variable that approximates it. With the continuity correction, which probability for $$Y$$ replaces each of these?
- (a) $$P(X \le 12)$$
- (b) $$P(X < 12)$$
- (c) $$P(X \ge 12)$$
- (d) $$P(X > 12)$$
**Topic:** 4d Continuity correction  **Lec:** 22  **Type:** apply
**A:** Key:
1. (a) $$P(Y \le 12.5)$$.
2. (b) $$X < 12$$ is $$X \le 11$$, so $$P(Y \le 11.5)$$.
3. (c) $$P(Y \ge 11.5)$$.
4. (d) $$X > 12$$ is $$X \ge 13$$, so $$P(Y \ge 12.5)$$.

Each whole number $$k$$ stands for the bar from $$k - 0.5$$ to $$k + 0.5$$. Turn $$<$$ and $$>$$ into $$\le$$ and $$\ge$$ first, then include the whole bar. This is the deck's slide 12 table with 12 in place of 4. "At most 12" contains the bar for 12, which ends at 12.5. "At least 12" also contains it, and it starts at 11.5. The strict versions leave the bar for 12 out, so (b) ends where the bar for 11 ends and (d) starts where the bar for 13 starts. The usual slip is (b) or (d): writing $$P(Y \le 12.5)$$ for $$P(X < 12)$$ counts the value 12, which "fewer than 12" excludes.

### Q: A student guesses every answer on a 40-question true-or-false quiz, so the number correct is $$X \sim \text{Bin}(40, 0.5)$$. Why does the Normal approximation to $$P(X = 20)$$ need the continuity correction? Check the conditions and find the approximation.
**Topic:** 4d Continuity correction  **Lec:** 22  **Type:** apply
**A:** Key:
1. A continuous $$Y$$ has $$P(Y = 20) = 0$$, so the value 20 must become its bar: $$P(X = 20) \approx P(19.5 \le Y \le 20.5)$$.
2. $$np = 20 \ge 5$$ and $$n(1 - p) = 20 \ge 5$$, so $$Y \sim N(20, 10)$$ with $$\sigma = \sqrt{10} = 3.162$$.
3. $$z = \pm \frac{0.5}{3.162} = \pm 0.16$$.
4. $$P \approx \Phi(0.16) - \Phi(-0.16) = 0.5636 - 0.4364 = 0.1272$$.

The variance is $$np(1 - p) = 40 \times 0.5 \times 0.5 = 10$$. Without the correction the approximation would say 0, which is clearly wrong, since 20 is the most likely score.

$$
\begin{aligned}
z &= \frac{20.5 - 20}{\sqrt{10}} \\
&= 0.16 \\
P &= 0.5636 - (1 - 0.5636) \\
&= 0.1272
\end{aligned}
$$

The exact Binomial answer is $$\binom{40}{20}0.5^{40} = 0.1254$$.

### Q: For each Binomial count, say whether you may use the Poisson approximation, the Normal approximation, or neither, and why.
- (a) $$\text{Bin}(300, 0.01)$$
- (b) $$\text{Bin}(40, 0.3)$$
- (c) $$\text{Bin}(30, 0.9)$$
**Topic:** 4b Normal approximation to the Binomial  **Lec:** 22  **Type:** apply
**A:** Key:
1. (a) Poisson, (b) Normal, (c) neither.
2. (a) $$n = 300 \ge 20$$ and $$np = 3 < 5$$, so $$\text{Poisson}(3)$$; the small $$np$$ also rules out the Normal.
3. (b) $$np = 12$$ and $$n(1 - p) = 28$$ are both at least 5, so $$N(12, 8.4)$$; $$np \ge 5$$ rules out the Poisson.
4. (c) $$n(1 - p) = 3 < 5$$ rules out the Normal and $$np = 27$$ rules out the Poisson, so use the exact Binomial.

The Poisson approximation needs $$n \ge 20$$ and $$np < 5$$. The Normal approximation needs $$np \ge 5$$ and $$n(1 - p) \ge 5$$. The two approximations cover different shapes. The Poisson is for rare successes (few expected, $$np < 5$$), where the Binomial piles up near 0. The Normal is for counts with at least 5 expected successes and at least 5 expected failures, where the Binomial is bell-shaped. In (c) the failures are rare, so the counts pile up near 30 and the Normal's bell does not fit. The Poisson rule is from lecture 18 and the Normal rule from lecture 22.

### Q: Use the Central Limit Theorem to explain why $$X \sim \text{Bin}(n, p)$$ is approximately Normal when $$n$$ is large, and derive its mean and variance that way. Why is the condition written with $$np$$ and $$n(1 - p)$$ instead of $$n$$ alone?
**Topic:** 4b Normal approximation to the Binomial  **Lec:** 22  **Type:** derive
**A:** Key:
1. $$X = B_1 + \cdots + B_n$$ is a sum of $$n$$ independent $$\text{Bernoulli}(p)$$ trials, so the CLT for a sum makes it approximately Normal.
2. Each trial has mean $$p$$ and variance $$p(1 - p)$$, so the sum has mean $$np$$ and variance $$np(1 - p)$$.
3. So $$X \approx N(np, np(1 - p))$$.
4. $$np$$ and $$n(1 - p)$$ are the expected successes and failures; with $$p$$ near 0 or 1 the counts pile up at one end, so both must be at least 5.

Each $$B_i$$ is 1 for a success and 0 for a failure, so adding them counts the successes. The CLT for a sum (lecture 21) says $$T \approx N(n\mu, n\sigma^2)$$, and here $$\mu = p$$ and $$\sigma^2 = p(1 - p)$$.

$$
\begin{aligned}
E(X) &= E(B_1) + \cdots + E(B_n) \\
&= np \\
\operatorname{Var}(X) &= \operatorname{Var}(B_1) + \cdots \\
&\quad + \operatorname{Var}(B_n) \\
&= np(1 - p)
\end{aligned}
$$

The variances add because the trials are independent. The deck states the result without this reason; the reason is what connects it to the CLT. For an example of why $$n$$ alone is not enough, $$\text{Bin}(20, 0.05)$$ has $$np = 1$$, and its probabilities for 0, 1, 2 and 3 are 0.358, 0.377, 0.189 and 0.060, a lopsided shape with no bell.

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
**Topic:** 1b Variance and standard deviation (n - 1 formula · units · not resistant · effect of y = a + bx)  **Lec:** WW1  **Type:** derive
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
1. (a) Set the total area to 1: $$\int_1^3 cx\,dx = 1$$, which gives $$c = \frac{1}{4}$$.
2. (b) Integrate from the left end of the support: $$F(x) = \int_1^x \frac{t}{4}\,dt = \frac{x^2 - 1}{8}$$ on $$[1, 3]$$, with 0 below 1 and 1 above 3.
3. (c) Use differences of $$F$$: $$P(X > 2) = 1 - F(2)$$ and $$P(1.5 < X < 2.5) = F(2.5) - F(1.5)$$.
4. (d) Solve $$F(x) = p$$ for $$x$$, which gives $$x = \sqrt{8p + 1}$$, then put in $$p = 0.5$$, $$0.25$$ and $$0.75$$. The IQR is $$Q_3 - Q_1$$.
5. (e) $$E(X) = \int_1^3 x \cdot \frac{x}{4}\,dx$$ and $$E(X^2) = \int_1^3 x^2 \cdot \frac{x}{4}\,dx$$, then $$\operatorname{Var}(X) = E(X^2) - E(X)^2$$.

(a)

$$
\begin{aligned}
\int_1^3 cx\,dx &= c \cdot \frac{9 - 1}{2} = 4c = 1 \\
c &= \frac{1}{4}
\end{aligned}
$$

$$f(x) = \frac{x}{4} \ge 0$$ on $$[1, 3]$$ and its area is 1, so $$f$$ is a pdf.

(b) Integrate the pdf from 1 up to $$x$$:

$$
\begin{aligned}
F(x) &= \int_1^x \frac{t}{4}\,dt \\
&= \frac{t^2}{8}\Big|_1^x \\
&= \frac{x^2 - 1}{8}
\end{aligned}
$$

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

(d) A quantile is the $$x$$ where the cdf reaches $$p$$, so set $$F(x) = p$$ and solve:

$$
\begin{aligned}
\frac{x^2 - 1}{8} &= p \\
x^2 &= 8p + 1 \\
x &= \sqrt{8p + 1}
\end{aligned}
$$

The median, $$Q_1$$ and $$Q_3$$ are $$p = 0.5$$, $$0.25$$ and $$0.75$$. That is where the 5, 3 and 7 come from: $$8p + 1$$ is $$8(0.5) + 1 = 5$$, $$8(0.25) + 1 = 3$$ and $$8(0.75) + 1 = 7$$.

$$
\begin{aligned}
m &= \sqrt{5} \approx 2.236 \\
Q_1 &= \sqrt{3} \approx 1.732 \\
Q_3 &= \sqrt{7} \approx 2.646 \\
\text{IQR} &= 2.646 - 1.732 \\
&= 0.914
\end{aligned}
$$

Each root is inside $$[1, 3]$$, as a quantile must be. The negative roots are outside the support, so they are dropped.

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

### Q: $$X$$ has pdf $$f(x) = \frac{3x^2}{16}$$ for $$-2 \le x \le 2$$ and 0 otherwise, and $$Y = X^2$$. (a) Find the cdf and pdf of $$Y$$ with their support. (b) Find $$P(Y > 1)$$. (c) Check (b) directly from the distribution of $$X$$.
**Topic:** 3l Functions of one random variable (cdf method: F_Y from F_X · differentiate for the pdf · the new support · Y = X² needs both roots)  **Lec:** 12  **Type:** derive
**A:** Steps:
1. The support of $$Y$$ is the image of $$[-2, 2]$$ under squaring, $$[0, 4]$$.
2. Write $$F_Y(y) = P(-\sqrt{y} \le X \le \sqrt{y})$$ and integrate $$f$$ between the two roots.
3. Differentiate $$F_Y$$ for the pdf and check its area is 1.
4. $$P(Y > 1) = 1 - F_Y(1)$$, then check it as $$P(|X| > 1)$$ from $$f$$.

(a) The cdf, for $$0 \le y \le 4$$:

$$
\begin{aligned}
F_Y(y) &= \int_{-\sqrt{y}}^{\sqrt{y}} \frac{3t^2}{16}\,dt \\
&= \left[\frac{t^3}{16}\right]_{-\sqrt{y}}^{\sqrt{y}} \\
&= \frac{2y^{3/2}}{16} = \frac{y^{3/2}}{8}
\end{aligned}
$$

The pdf is the derivative, $$f_Y(y) = \frac{3}{16}\sqrt{y}$$ for $$0 \le y \le 4$$ and 0 otherwise. Check: $$\int_0^4 \frac{3}{16}\sqrt{y}\,dy = \frac{3}{16} \cdot \frac{2}{3} \cdot 8 = 1$$.

(b) and (c):

$$
\begin{aligned}
P(Y > 1) &= 1 - F_Y(1) = 1 - \frac{1}{8} = \frac{7}{8} \\[4pt]
P(|X| > 1) &= 2\int_1^2 \frac{3x^2}{16}\,dx \\
&= 2 \cdot \frac{8 - 1}{16} = \frac{7}{8}
\end{aligned}
$$

The two agree. The common error is $$F_Y(y) = F_X(\sqrt{y})$$, which gives $$\frac{y^{3/2} + 8}{16}$$, a cdf that is already $$\frac{1}{2}$$ at $$y = 0$$.

### Q: $$X_1 \sim U(10, 30)$$ and $$X_2 \sim U(25, 40)$$ are independent, and $$Y = \max\{X_1, X_2\}$$. (a) Write the cdf of $$Y$$ on every piece. (b) Differentiate for the pdf and check that its area is 1. (c) Find $$P(Y \le 28)$$.
**Topic:** 3m–n Maximum and minimum of independent random variables (cdf of the max is the product of the cdfs · pdf by the chain rule · parallel lifetime is the max · series lifetime is the min · flood levels)  **Lec:** 12  **Type:** apply
**A:** Steps:
1. Write each uniform's cdf with the regions where it is 0 and where it is 1.
2. The support of $$Y$$ is $$[25, 40]$$, because $$Y \ge X_2 \ge 25$$ and both variables are at most 40.
3. Multiply the cdfs. On $$[25, 30]$$ both are linear; on $$(30, 40]$$ $$F_{X_1} = 1$$.
4. Differentiate each piece, the middle one by the product rule, and add the two areas.
5. $$P(Y \le 28) = F_Y(28)$$ from the middle piece.

(a) $$F_{X_1}(y) = \frac{y - 10}{20}$$ on $$[10, 30]$$ and $$F_{X_2}(y) = \frac{y - 25}{15}$$ on $$[25, 40]$$, each 0 below its interval and 1 above it.

$$
F_Y(y) =
\begin{cases}
0 & y < 25 \\[2pt]
\dfrac{(y - 10)(y - 25)}{300} & 25 \le y \le 30 \\[6pt]
\dfrac{y - 25}{15} & 30 < y \le 40 \\[6pt]
1 & y > 40
\end{cases}
$$

(b) The product rule on the middle piece, then the constant piece:

$$
\begin{aligned}
f_Y(y) &= \frac{(y - 25) + (y - 10)}{300} \\
&= \frac{2y - 35}{300} \quad (25 \le y \le 30) \\[4pt]
f_Y(y) &= \frac{1}{15} \quad (30 < y \le 40)
\end{aligned}
$$

Area check:

$$
\begin{aligned}
\int_{25}^{30} \frac{2y - 35}{300}\,dy &= \left[\frac{y^2 - 35y}{300}\right]_{25}^{30} \\
&= \frac{-150 + 250}{300} = \frac{1}{3} \\[4pt]
\int_{30}^{40} \frac{1}{15}\,dy &= \frac{10}{15} = \frac{2}{3}
\end{aligned}
$$

(c) 28 is in the middle piece:

$$
\begin{aligned}
P(Y \le 28) &= \frac{(28 - 10)(28 - 25)}{300} \\
&= \frac{18 \times 3}{300} = 0.18
\end{aligned}
$$

### Q: $$X \sim U(1, 3)$$ and $$Y = X^3$$. (a) Find the cdf and pdf of $$Y$$ with their support by the cdf method. (b) Find $$P(Y > 8)$$ and the median of $$Y$$. (c) Explain why the pdf of $$Y$$ is not constant even though the pdf of $$X$$ is.
**Topic:** 3l Functions of one random variable (cdf method: F_Y from F_X · differentiate for the pdf · the new support · Y = X² needs both roots)  **Lec:** 12  **Type:** derive
**A:** Steps:
1. The support of $$Y$$ is the image of $$[1, 3]$$ under cubing, $$[1, 27]$$.
2. Cubing is increasing, so $$X^3 \le y$$ exactly when $$X \le y^{1/3}$$, and $$F_Y(y) = F_X(y^{1/3})$$.
3. Differentiate for the pdf and check its area.
4. $$P(Y > 8) = 1 - F_Y(8)$$; the median solves $$F_Y(m) = 0.5$$.

(a) $$F_X(x) = \frac{x - 1}{2}$$ on $$[1, 3]$$.

$$
\begin{aligned}
F_Y(y) &= P(X \le y^{1/3}) \\
&= \frac{y^{1/3} - 1}{2} \quad (1 \le y \le 27) \\[4pt]
f_Y(y) &= \frac{1}{2} \cdot \frac{1}{3}y^{-2/3} \\
&= \frac{1}{6}y^{-2/3}
\end{aligned}
$$

So $$f_Y(y) = \frac{1}{6}y^{-2/3}$$ for $$1 \le y \le 27$$ and 0 otherwise. Check: $$\int_1^{27} \frac{1}{6}y^{-2/3}\,dy = \frac{1}{6} \cdot 3\big[y^{1/3}\big]_1^{27} = \frac{1}{2}(3 - 1) = 1$$.

(b)

$$
\begin{aligned}
P(Y > 8) &= 1 - \frac{8^{1/3} - 1}{2} \\
&= 1 - \frac{2 - 1}{2} = \frac{1}{2} \\[4pt]
\frac{m^{1/3} - 1}{2} &= 0.5 \\
m^{1/3} &= 2, \quad m = 8
\end{aligned}
$$

The median of $$Y$$ is the cube of the median of $$X$$, which is 2, because an increasing function carries the median across.

(c) Cubing stretches the axis unevenly. An interval of $$y$$ values near 27 comes from a much shorter interval of $$x$$ values than an interval of the same length near 1, so the probability per unit of $$y$$ falls as $$y$$ grows: $$f_Y(1) = \frac{1}{6}$$ and $$f_Y(27) = \frac{1}{54}$$. The factor $$\frac{1}{3}y^{-2/3}$$ from the chain rule is that stretch.

### Q: Battery lifetimes are $$N(1200, 150^2)$$ hours. Find the proportion that fail before 1000 hours, the proportion that last between 1050 and 1400 hours, and the lifetime that only the longest-lasting 10% exceed. Use Table A.
**Topic:** 3p Z-scores and standard Normal calculations (z = (x - μ)/σ counts standard deviations from the mean · Table A gives the area to the left · between two values subtract · upper tail is one minus · backward: find z from the proportion then unstandardise · pnorm)  **Lec:** 13  **Type:** apply
**A:** Steps:
1. Standardise each boundary with $$z = \frac{x - 1200}{150}$$ and draw the area wanted.
2. Read each left area off Table A; subtract for a between, use one minus for an upper tail.
3. For the 90th percentile find the $$z$$ with left area 0.90, then unstandardise with $$x = 1200 + 150z$$.

$$
\begin{aligned}
P(X < 1000) &= P(Z < -1.33) = 0.0918 \\[4pt]
P(1050 < X < 1400) &= P(-1.00 < Z < 1.33) \\
&= 0.9082 - 0.1587 = 0.7495 \\[4pt]
P(Z < z) = 0.90 &\Rightarrow z = 1.28 \\
x &= 1200 + 1.28 \times 150 = 1392
\end{aligned}
$$

About 9.2% fail before 1000 hours, about 75% last between 1050 and 1400 hours, and only the top 10% last beyond about 1392 hours.

### Q: A continuous random variable $$X$$ has pdf $$f(x) = e^{-(x - 3)}$$ for $$x \ge 3$$ and 0 elsewhere. (a) Verify that $$f$$ is a pdf. (b) Find the cdf $$F(x)$$ for every real $$x$$. (c) Find $$P(2 < X < 5)$$ from the cdf, then check it by integrating the pdf. (d) Find the median of $$X$$.
**Topic:** 3g–i Mean, variance, uniform and exponential (E and Var by integration · the shortcut · uniform mean and variance · exponential mean and variance by parts · median from F)  **Lec:** 13  **Type:** derive
**A:** Steps:
1. Check $$f(x) \ge 0$$ everywhere and integrate the pdf over its support to get 1.
2. Integrate the pdf from the start of the support to $$x$$ for the cdf, and write the 0 case for $$x$$ below the support.
3. Read the probability as $$F(5) - F(2)$$, remembering that $$F(2) = 0$$, then integrate the pdf from 3 to 5 as the check.
4. Set $$F(m) = 0.5$$ and solve for $$m$$.

(a) $$e^{-(x-3)} > 0$$ for every $$x \ge 3$$, and the total area is 1.

$$
\begin{aligned}
\int_{3}^{\infty} e^{-(x-3)}\,dx &= \left[-e^{-(x-3)}\right]_{3}^{\infty} \\
&= 0 - (-1) = 1
\end{aligned}
$$

(b) The cdf has two cases, and the "0 below the support" case is part of the answer.

$$
F(x) =
\begin{cases}
0 & x < 3 \\
1 - e^{-(x-3)} & x \ge 3
\end{cases}
$$

(c) Since 2 is below the support, $$F(2) = 0$$.

$$
\begin{aligned}
P(2 < X < 5) &= F(5) - F(2) \\
&= 1 - e^{-2} \\
&\approx 0.865
\end{aligned}
$$

The check integrates the pdf from 3 to 5, because the pdf is 0 between 2 and 3, and gives the same $$1 - e^{-2}$$.

(d) Solve $$F(m) = 0.5$$.

$$
\begin{aligned}
1 - e^{-(m-3)} &= 0.5 \\
e^{-(m-3)} &= 0.5 \\
m &= 3 + \ln 2 \approx 3.693
\end{aligned}
$$

- Common slip: treating the lower limit as 0 instead of 3. The support starts at 3, so every integral starts there and $$F$$ is 0 before it.

### Q: Adult passenger weight on a regional airline is about $$N(78, 12^2)$$ kg. (a) Find the probability that one passenger weighs between 60 kg and 95 kg. (b) A 40-seat plane has a passenger weight limit of 3300 kg. Find the probability that a full flight exceeds it, once through the total and once through the sample mean, and show the two z-values agree. (c) Find the weight that only the heaviest 5% of passengers exceed.
**Topic:** 3o Linear combinations of Normals and the sample mean (aX + b stays Normal · independent sums: means add with the coefficients, variances with squared coefficients · identically distributed collapse · X̄ ~ N(μ, σ²/n) · total and mean routes give the same z · φ and Φ)  **Lec:** 14  **Type:** apply
**A:** Steps:
1. Standardise both ends of the interval in (a) and subtract the two Table A areas.
2. For (b), write the total as a sum of 40 independent Normals (Fact 2, all $$a_i = 1$$): mean $$40\mu$$, variance $$40\sigma^2$$.
3. Standardise the limit against the total and read the upper tail.
4. Repeat through $$\bar{X} \sim N(\mu, \frac{\sigma^2}{40})$$ with the limit divided by 40.
5. For (c), find the $$z$$ with 0.95 to its left and unstandardise.

(a)

$$
\begin{aligned}
z_{60} &= \frac{60 - 78}{12} = -1.50 \\
z_{95} &= \frac{95 - 78}{12} = 1.42 \\
P(60 < X < 95) &= \Phi(1.42) - \Phi(-1.50) \\
&= 0.9222 - 0.0668 = 0.8554
\end{aligned}
$$

(b) Total route. $$T = X_1 + \cdots + X_{40} \sim N(40 \times 78,\; 40 \times 144) = N(3120, 5760)$$, so $$\operatorname{SD}(T) = \sqrt{5760} = 75.89$$.

$$
\begin{aligned}
P(T > 3300) &= P\!\left(Z > \frac{3300 - 3120}{75.89}\right) \\
&= P(Z > 2.37) \\
&= 1 - 0.9911 = 0.0089
\end{aligned}
$$

Mean route. The total exceeds 3300 exactly when the mean exceeds $$\frac{3300}{40} = 82.5$$. $$\bar{X} \sim N(78, \frac{144}{40}) = N(78, 3.6)$$, $$\operatorname{SD}(\bar{X}) = 1.897$$.

$$
z = \frac{82.5 - 78}{1.897} = 2.37
$$

The same $$z$$, so the same 0.0089. Dividing numerator and denominator of the total's z by 40 gives the mean's z, which is why the routes always agree.

(c) The area 0.95 to the left sits between 1.64 and 1.65 in Table A, so $$z = 1.645$$.

$$
x = 78 + 1.645 \times 12 = 97.7 \text{ kg}
$$

Common slips: using $$40 \times 12$$ or $$40^2 \times 144$$ for the total's spread (the right variance is $$40 \times 144$$ because independent variances add once each), and standardising the mean with $$\sigma$$ instead of $$\frac{\sigma}{\sqrt{n}}$$.

### Q: WeBWorK-style. Two battery types for a chainsaw have independent Normal lifetimes before recharge: Duxcell with mean 12 and standard deviation 2.5 minutes, Infinitycell with mean 20 and standard deviation 4 minutes. (a) Find the probability a Duxcell lasts longer than an Infinitycell. (b) Find the probability an Infinitycell lasts more than twice as long as a Duxcell. (c) Two Duxcells are used one after the other. How long a job finishes on them with probability 0.75?
**Topic:** 3o Linear combinations of Normals and the sample mean (aX + b stays Normal · independent sums: means add with the coefficients, variances with squared coefficients · identically distributed collapse · X̄ ~ N(μ, σ²/n) · total and mean routes give the same z · φ and Φ)  **Lec:** WW5  **Type:** apply
**A:** Steps:
1. Turn each comparison into one linear combination of the two variables, which is Normal because the parts are independent Normals.
2. Its mean follows the coefficients; its variance follows the squared coefficients, and the variances add even when the combination subtracts.
3. Standardise and read $$\Phi$$, or go backward from the probability to $$z$$ for part (c).

Let $$D \sim N(12, 2.5^2)$$ and $$I \sim N(20, 4^2)$$.

(a) $$P(D > I) = P(D - I > 0)$$, and $$D - I \sim N(-8,\; 6.25 + 16) = N(-8, 22.25)$$ with standard deviation 4.717.

$$
\begin{aligned}
P(D - I > 0) &= P\!\left(Z > \frac{0 + 8}{4.717}\right) \\
&= P(Z > 1.70) \\
&= 1 - 0.9554 = 0.0446
\end{aligned}
$$

(b) $$P(I > 2D) = P(I - 2D > 0)$$, and $$I - 2D \sim N(20 - 24,\; 16 + 4 \times 6.25) = N(-4, 41)$$ with standard deviation 6.403.

$$
\begin{aligned}
P(I - 2D > 0) &= P\!\left(Z > \frac{4}{6.403}\right) \\
&= P(Z > 0.62) \\
&= 1 - 0.7324 = 0.2676
\end{aligned}
$$

(c) The job time is $$T = D_1 + D_2 \sim N(24,\; 2 \times 6.25) = N(24, 12.5)$$ with standard deviation 3.536. Finishing with probability 0.75 means $$P(T \ge t) = 0.75$$, so $$t$$ is the 25th percentile, $$z = -0.6745$$.

$$
\begin{aligned}
t &= 24 - 0.6745 \times 3.536 \\
&= 21.6 \text{ minutes}
\end{aligned}
$$

The variance in (c) is $$2\sigma^2$$, not $$(2\sigma)^2$$: two different batteries, not one battery doubled. In (b) the coefficient 2 is squared in the variance, so $$2D$$ contributes $$4 \times 6.25$$.

### Q: WeBWorK-style. Alice's walk to the bus stop is $$N(10, 3)$$ in minutes with variance 3, the wait is Normal with mean 5 and standard deviation 2, the bus ride is Normal with mean 22 and standard deviation 4, and the walk from the loop to the lecture is $$N(15, 5)$$ with variance 5. The four legs are independent. (a) Find the mean of her total travel time. (b) Find its standard deviation. (c) Class starts at 8:00 sharp and she leaves at 7:00. Find the probability she is not late.
**Topic:** 3o Linear combinations of Normals and the sample mean (aX + b stays Normal · independent sums: means add with the coefficients, variances with squared coefficients · identically distributed collapse · X̄ ~ N(μ, σ²/n) · total and mean routes give the same z · φ and Φ)  **Lec:** WW5  **Type:** apply
**A:** Steps:
1. The total is a sum of independent Normals, so it is Normal; add the means.
2. Add the variances, converting each standard deviation to a variance first, then take the square root once at the end.
3. "Not late" is $$T \le 60$$: standardise and read $$\Phi$$.

(a) $$E(T) = 10 + 5 + 22 + 15 = 52$$ minutes.

(b) The variances are 3, $$2^2 = 4$$, $$4^2 = 16$$ and 5.

$$
\begin{aligned}
\operatorname{Var}(T) &= 3 + 4 + 16 + 5 = 28 \\
\operatorname{SD}(T) &= \sqrt{28} = 5.29
\end{aligned}
$$

(c)

$$
\begin{aligned}
P(T \le 60) &= P\!\left(Z \le \frac{60 - 52}{5.29}\right) \\
&= P(Z \le 1.51) \\
&= 0.93
\end{aligned}
$$

The miss to watch for is mixing the two kinds of given numbers: two legs give a variance and two give a standard deviation, and adding standard deviations (3 + 2 + 4 + 5) is wrong either way.

### Q: A quiz has 8 multiple-choice questions with 4 options each, and a student guesses every answer at random. Let $$X$$ be the number of correct answers. (a) Name the distribution of $$X$$ and check the assumptions. (b) Find $$P(X = 2)$$. (c) Find $$P(X \ge 1)$$. (d) Find $$E(X)$$ and $$\operatorname{SD}(X)$$. (e) The pass mark is 50%. Is a guesser expected to pass?
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 15  **Type:** apply
**A:** Steps:
1. Check the three Binomial assumptions and write down $$n$$ and $$p$$.
2. Use the pmf for one value; use the complement of $$X = 0$$ for "at least one".
3. Mean $$np$$, variance $$np(1 - p)$$, then the square root once.
4. Compare the expected score with the pass mark.

(a) Each question is one trial with two outcomes, right or wrong; the guesses are independent; each has the same chance $$p = \frac{1}{4}$$. So $$X \sim \text{Bin}(8, 0.25)$$.

(b)

$$
\begin{aligned}
P(X = 2) &= \binom{8}{2} 0.25^{2} \times 0.75^{6} \\
&= 28 \times 0.0625 \times 0.1780 \\
&= 0.3115
\end{aligned}
$$

(c)

$$
\begin{aligned}
P(X \ge 1) &= 1 - P(X = 0) \\
&= 1 - 0.75^{8} \\
&= 1 - 0.1001 = 0.8999
\end{aligned}
$$

(d)

$$
\begin{aligned}
E(X) &= 8 \times 0.25 = 2 \\
\operatorname{Var}(X) &= 8 \times 0.25 \times 0.75 = 1.5 \\
\operatorname{SD}(X) &= \sqrt{1.5} = 1.22
\end{aligned}
$$

(e) No. The expected score is 2 of 8, which is 25%, half the pass mark. The miss to watch for in (c) is adding $$P(X = 1)$$ through $$P(X = 8)$$ one by one instead of using the complement.

### Q: 25% of drivers come to a complete stop at a flashing red light, and 12 drivers are chosen at random. Find the probability that (a) exactly 2 stop, (b) fewer than 2 stop, (c) at most 3 stop, (d) at least 2 stop. Then give (e) the expected number who stop and (f) its standard deviation.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 16  **Type:** apply
**A:** Steps:
1. Name the model, $$X \sim \text{Bin}(12, 0.25)$$, and check the assumptions.
2. Compute $$P(X = 0)$$ to $$P(X = 3)$$ once; every part reuses them.
3. "Fewer than 2" is two terms, "at most 3" is four, "at least 2" is the complement of "fewer than 2".
4. Mean $$np$$, then $$\sqrt{np(1 - p)}$$.

The four pmf values:

$$
\begin{aligned}
P(X = 0) &= 0.75^{12} = 0.0317 \\
P(X = 1) &= 12(0.25)(0.75)^{11} = 0.1267 \\
P(X = 2) &= 66(0.25)^2(0.75)^{10} = 0.2323 \\
P(X = 3) &= 220(0.25)^3(0.75)^9 = 0.2581
\end{aligned}
$$

- (a) $$P(X = 2) = 0.2323$$.
- (b) $$P(X < 2) = 0.0317 + 0.1267 = 0.1584$$.
- (c) $$P(X \le 3) = 0.1584 + 0.2323 + 0.2581 = 0.6488$$.
- (d) $$P(X \ge 2) = 1 - 0.1584 = 0.8416$$.
- (e) $$E(X) = 12 \times 0.25 = 3$$.
- (f) $$\operatorname{SD}(X) = \sqrt{12 \times 0.25 \times 0.75} = 1.5$$.

### Q: Activity 7 with new numbers. Each quiz question has 5 options and a student guesses every answer independently; passing needs at least half right. (a) Write the full pmf of the score on a 4-question quiz and the expected score. (b) Find the probability of passing the 4-question quiz. (c) Find the probability of passing a 10-question quiz, and compare.
**Topic:** 3q–s Bernoulli and Binomial distributions (Bernoulli: 1 on success, pmf p^x(1 − p)^(1 − x), mean p, variance p(1 − p) · Binomial counts successes in n independent trials with one p · pmf C(n, x) p^x (1 − p)^(n − x), one order times the number of orders · mean np, variance np(1 − p) · three assumptions · the 10% condition for sampling without replacement)  **Lec:** 17  **Type:** apply
**A:** Steps:
1. One question is Bernoulli with $$p = 0.2$$; the score is $$\text{Bin}(n, 0.2)$$.
2. Compute each pmf value for $$n = 4$$ and check they add to 1.
3. Passing 4 questions is $$X \ge 2$$; passing 10 is $$X \ge 5$$, one minus the terms for 0 to 4.
4. Compare the two answers and say why.

(a) For $$X \sim \text{Bin}(4, 0.2)$$:

| Score | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Probability | 0.4096 | 0.4096 | 0.1536 | 0.0256 | 0.0016 |

The expected score is $$4 \times 0.2 = 0.8$$.

(b) $$P(X \ge 2) = 0.1536 + 0.0256 + 0.0016 = 0.1808$$.

(c) For $$\text{Bin}(10, 0.2)$$, $$P(X \ge 5) = 1 - P(X \le 4) = 0.0328$$. Guessing passes the short quiz about five times as often, because a longer quiz pulls the score toward its expected 20%.

### Q: 2% of items from a line are defective, and a sample of 150 is taken. (a) Find the exact probability that more than 2 are defective. (b) Check the conditions and find the Poisson approximation to the same probability. (c) How close is the approximation?
**Topic:** 3bb Poisson approximation to the Binomial (n ≥ 20 and np < 5 · λ = np · check both conditions first · exact Binomial against the approximation)  **Lec:** 18  **Type:** apply
**A:** Steps:
1. Exact: $$X \sim \text{Bin}(150, 0.02)$$; one minus the terms for 0, 1 and 2.
2. Check $$n \ge 20$$ and $$np < 5$$, then set $$\lambda = np$$.
3. Approximate: one minus the Poisson terms for 0, 1 and 2.
4. Compare.

(a)

$$
\begin{aligned}
P(X \le 2) &= 0.98^{150} + 150(0.02)(0.98)^{149} \\
&\quad + \binom{150}{2}(0.02)^2(0.98)^{148} \\
&= 0.4209 \\
P(X > 2) &= 0.5791
\end{aligned}
$$

(b) $$n = 150 \ge 20$$ and $$np = 3 < 5$$, so use $$\text{Poisson}(3)$$:

$$
\begin{aligned}
P(X > 2) &\approx 1 - e^{-3}\left(1 + 3 + \frac{9}{2}\right) \\
&= 0.5768
\end{aligned}
$$

(c) The two differ by about 0.002.

### Q: The time to be served at a coffee counter is exponential with mean 4 minutes. Find the probability that a customer is served in under 2 minutes on at least four of the next five days.
**Topic:** 3w–aa Poisson process and Poisson distribution (counts in a fixed interval at a constant rate · pmf λ^x e^(−λ)/x! · mean and variance both λ · the rate scales with the interval, λt · four process properties · the time between events is exponential with mean 1/λ)  **Lec:** 18  **Type:** apply
**A:** Steps:
1. Turn the mean into a rate: $$\lambda = \frac{1}{4}$$.
2. One day: $$p = P(X < 2) = F(2)$$ from the exponential cdf.
3. The number of quick days $$Y$$ out of 5 is $$\text{Bin}(5, p)$$.
4. At least four is $$P(Y = 4) + P(Y = 5)$$.

$$
\begin{aligned}
p &= 1 - e^{-2/4} = 0.3935 \\[4pt]
P(Y \ge 4) &= \binom{5}{4}p^4(1 - p) + p^5 \\
&= 0.0727 + 0.0094 \\
&= 0.0821
\end{aligned}
$$

The usual miss is using the mean 4 as the rate, which gives $$1 - e^{-8}$$.

### Q: Activity 6 with new numbers. A region's 80 recorded recurrence intervals between earthquakes give an estimated rate of 0.32 per year, and the intervals are modelled as exponential. (a) Find the probability that the next interval is shorter than 9 months. (b) The histogram's bars past 4 years are: 4 to 6 years, density 0.07; 6 to 8, density 0.035; 8 to 12, density 0.0125; 12 to 16, density 0.005. Find the observed proportion of intervals longer than 4 years and the model's value. (c) Using a Poisson count, find the probability of no earthquakes in 4 years. (d) Explain why (b) and (c) give the same model value. (e) An earthquake has just occurred. Find the probability of waiting more than 25 years for the 8th earthquake after it.
**Topic:** 3y Waiting times in a Poisson process (P(T > t) is P(no events in t), both e^(−λt) · the kth event after time t means at most k − 1 events in t · convert t into the rate's time unit first · exponential cdf 1 − e^(−λt), mean 1/λ · histogram proportion is density times bar width)  **Lec:** 19  **Type:** apply
**A:** Steps:
1. Convert months to years, then use the exponential cdf.
2. Observed proportion is the sum of density times width; model value is $$e^{-\lambda t}$$.
3. The count in $$t$$ years is $$\text{Poisson}(\lambda t)$$; take its zero term.
4. Say the two events are the same event.
5. Translate "the 8th event after 25 years" into "at most 7 events in 25 years" and sum eight Poisson terms.

(a) $$t = \frac{9}{12} = 0.75$$ years.

$$
\begin{aligned}
P(T < 0.75) &= 1 - e^{-0.32 \times 0.75} \\
&= 1 - e^{-0.24} = 0.2134
\end{aligned}
$$

(b) Observed:

$$
\begin{aligned}
0.07 \times 2 &= 0.14 \\
0.035 \times 2 &= 0.07 \\
0.0125 \times 4 &= 0.05 \\
0.005 \times 4 &= 0.02 \\
\text{total} &= 0.28
\end{aligned}
$$

Model: $$P(T > 4) = e^{-0.32 \times 4} = e^{-1.28} = 0.2780$$. The sample proportion is close to the model.

(c) $$X \sim \text{Poisson}(0.32 \times 4 = 1.28)$$, so $$P(X = 0) = e^{-1.28} = 0.2780$$.

(d) Waiting more than 4 years for the next earthquake is the event of no earthquakes in 4 years, so $$P(T > 4) = P(X = 0)$$ and both are $$e^{-1.28}$$.

(e) The 8th earthquake is more than 25 years away exactly when at most 7 fall in the next 25 years. $$Y \sim \text{Poisson}(0.32 \times 25 = 8)$$:

$$
\begin{aligned}
P(Y \le 7) &= \sum_{y = 0}^{7} \frac{e^{-8} \times 8^y}{y!} \\
&= e^{-8}(1 + 8 + 32 + 85.33 + 170.67 \\
&\quad + 273.07 + 364.09 + 416.10) \\
&= 0.4530
\end{aligned}
$$

### Q: Calls reach a call centre as a Poisson process at 4 per minute. (a) Find the probability of more than 6 calls in a given minute. (b) Find the probability of no calls in a 30-second stretch, once through the Poisson count and once through the waiting time. (c) Call a 30-second stretch quiet when it has no calls. In 10 non-overlapping 30-second stretches, name the distribution of the number of quiet ones and find the probability of at least 2. (d) Name the distribution of the number of 30-second stretches until the first quiet one and give its mean.
**Topic:** 3cc Which distribution fits (a fixed n and a count of successes is Binomial · trials until the first success is Geometric · events at a rate in an interval or region is Poisson · the wait for the next event is exponential · a per-trial probability from one model feeds a Binomial count · the 10% condition and the n ≥ 20, np < 5 check decide the shortcuts)  **Lec:** 19  **Type:** apply
**A:** Steps:
1. One minute's count is $$\text{Poisson}(4)$$; "more than 6" is one minus the terms for 0 to 6.
2. Scale the rate to 30 seconds, $$\lambda t = 2$$, and take the zero term; match it with $$P(T > 0.5)$$ for $$T \sim \text{Exp}(4)$$.
3. Quiet stretches out of 10 are $$\text{Bin}(10, e^{-2})$$, because the stretches do not overlap; "at least 2" is the complement of 0 and 1.
4. Stretches until the first quiet one are $$\text{Geo}(e^{-2})$$ with mean $$e^{2}$$.

(a) $$X \sim \text{Poisson}(4)$$:

$$
\begin{aligned}
P(X \le 6) &= e^{-4}\left(1 + 4 + 8 + \frac{32}{3} + \frac{32}{3} + \frac{128}{15} + \frac{256}{45}\right) \\
&= 0.8893 \\
P(X > 6) &= 0.1107
\end{aligned}
$$

(b) Count: $$X_{0.5} \sim \text{Poisson}(4 \times 0.5 = 2)$$, so $$P(X_{0.5} = 0) = e^{-2} = 0.1353$$. Wait: $$T \sim \text{Exp}(4)$$ per minute, so $$P(T > 0.5) = e^{-4 \times 0.5} = e^{-2} = 0.1353$$.

(c) Each stretch is quiet with probability $$p = 0.1353$$ and the stretches are independent, so $$Y \sim \text{Bin}(10, 0.1353)$$.

$$
\begin{aligned}
P(Y = 0) &= 0.8647^{10} = 0.2336 \\
P(Y = 1) &= 10(0.1353)(0.8647)^9 = 0.3656 \\
P(Y \ge 2) &= 1 - 0.2336 - 0.3656 \\
&= 0.4008
\end{aligned}
$$

(d) $$N \sim \text{Geo}(0.1353)$$ with mean $$\frac{1}{0.1353} = 7.39$$ stretches, about 3.7 minutes.

### Q: WeBWorK-style. Potholes on a highway follow a Poisson process with mean 1.6 per km; $$X$$ is the distance between two successive potholes. Find (a) the probability of at least one pothole in the next 1.5 km, (b) the distribution of $$X$$, (c) the mean and standard deviation of $$X$$, (d) the median of $$X$$, (e) the probability of travelling more than 2.5 km before meeting the next three potholes, and (f) by the Central Limit Theorem on a sum of exponentials, the probability of travelling more than 20 km before meeting the next 30 potholes.
**Topic:** 3y Waiting times in a Poisson process (P(T > t) is P(no events in t), both e^(−λt) · the kth event after time t means at most k − 1 events in t · convert t into the rate's time unit first · exponential cdf 1 − e^(−λt), mean 1/λ · histogram proportion is density times bar width)  **Lec:** WW6  **Type:** apply
**A:** Steps:
1. Scale the rate to the stretch and take one minus the Poisson zero term.
2. The gap between events of a rate-$$\lambda$$ process is $$\text{Exp}$$ with mean $$\frac{1}{\lambda}$$, and its standard deviation equals its mean.
3. Solve $$F(m) = 0.5$$ for the median.
4. "More than 2.5 km before the 3rd pothole" is "at most 2 potholes in 2.5 km", a Poisson cdf.
5. The distance to the 30th pothole is a sum of 30 independent exponentials; give the sum its mean and variance, then a Normal tail.

(a) $$\lambda t = 1.6 \times 1.5 = 2.4$$, so $$P = 1 - e^{-2.4} = 0.909$$.

(b) $$X \sim \text{Exp}$$ with mean $$\frac{1}{1.6}$$. The traps put the mean at 1.6 or call $$X$$ Poisson.

(c) Mean and standard deviation are both $$\frac{1}{1.6} = 0.625$$ km.

(d) The median.

$$
\begin{aligned}
1 - e^{-1.6 m} &= 0.5 \\
m &= \frac{\ln 2}{1.6} = 0.43 \text{ km}
\end{aligned}
$$

(e) $$N_{2.5} \sim \text{Poisson}(4)$$.

$$
\begin{aligned}
P(N_{2.5} \le 2) &= e^{-4}(1 + 4 + 8) \\
&= 13e^{-4} = 0.238
\end{aligned}
$$

(f) $$S = X_1 + \dots + X_{30}$$.

$$
\begin{aligned}
E(S) &= 30 \times 0.625 = 18.75 \\
\operatorname{SD}(S) &= \sqrt{30} \times 0.625 \\
&= 3.4233 \\
z &= \frac{20 - 18.75}{3.4233} = 0.3651 \\
P(S > 20) &= 0.358
\end{aligned}
$$

### Q: A basketball player makes each free throw with probability 0.5, independently, and takes 12 shots; $$X$$ is the number made. Find $$P(X \ge 9)$$ (a) exactly, (b) by the Normal approximation without the continuity correction, and (c) by the Normal approximation with it. Which approximation is closer, and why?
**Topic:** 4d Continuity correction  **Lec:** 22  **Type:** apply
**A:** Steps:
1. Exact: $$X \sim \text{Bin}(12, 0.5)$$, so add the pmf terms for 9, 10, 11 and 12, each with the factor $$0.5^{12}$$.
2. Check $$np = 6 \ge 5$$ and $$n(1 - p) = 6 \ge 5$$, then $$Y \sim N(6, 3)$$.
3. Without the correction: $$P(Y \ge 9)$$, standardised with $$\sigma = \sqrt{3}$$.
4. With it: "at least 9" starts at the bottom of the bar for 9, so $$P(Y \ge 8.5)$$.
5. The corrected one is closer, because without the correction the cut at 9 drops the lower half of the bar for 9.

This is the deck's Example 3 with new numbers and the upper tail, so the correction subtracts 0.5 instead of adding it.

(a) With $$p = 0.5$$ every term has the factor $$0.5^{12} = \frac{1}{4096}$$.

$$
\begin{aligned}
P(X \ge 9) &= \frac{220 + 66 + 12 + 1}{4096} \\
&= \frac{299}{4096} \\
&= 0.0730
\end{aligned}
$$

(b) The mean is $$np = 12 \times 0.5 = 6$$ and the variance is $$np(1 - p) = 12 \times 0.5 \times 0.5 = 3$$.

$$
\begin{aligned}
P(X \ge 9) &\approx P(Y \ge 9) \\
&= P\left(Z \ge \frac{9 - 6}{\sqrt{3}}\right) \\
&= P(Z \ge 1.73) \\
&= 1 - 0.9582 \\
&= 0.0418
\end{aligned}
$$

(c) The bar for 9 runs from 8.5 to 9.5, and "at least 9" includes all of it.

$$
\begin{aligned}
P(X \ge 9) &\approx P(Y \ge 8.5) \\
&= P\left(Z \ge \frac{8.5 - 6}{\sqrt{3}}\right) \\
&= P(Z \ge 1.44) \\
&= 1 - 0.9251 \\
&= 0.0749
\end{aligned}
$$

The corrected 0.0749 is much closer to the exact 0.0730. Without the correction the answer is little more than half the exact one. With $$n = 12$$ the standard deviation is only 1.732, so half a unit is 0.29 standard deviations, which is why the correction matters so much for a small $$n$$.
