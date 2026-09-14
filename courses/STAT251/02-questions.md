# STAT251 — Question Bank

Claude's source of truth for quizzing. Grows every lecture.
Tag each question with its topic so the ledger and the bank stay linked.

Format:
```
### Q: <question>
**Topic:** <topic name>  **Lec:** <n>  **Type:** recall | apply | derive | critique
**A:** <answer>
```

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
```
2 | 3 7
3 | 1 4 4 8
4 | 2 5
5 | 1
```
Key: 2|3 = 23. With n = 9 the median is the 5th ordered value, which is 34.

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
- Parameter: a number describing the population (μ, p, σ), usually unknown.
- Statistic: a number computed from the sample (x̄, p̂, s).

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
**A:** Range = 265 − 175 = 90. Width = 90 ÷ 5 = 18 (the deck then rounds to convenient equal-width bins 170–190, 190–210, … 250–270). Cut the range into equal-width intervals, count the observations in each to make the frequency table, then draw one bar per interval with height equal to its frequency (or relative frequency); bars touch because the axis is a number line. Label both axes and give a heading.

### Q: The lecture-2 slides split variables into categorical and quantitative. Give both definitions, then classify: number of siblings, county of residence, commute distance in km, blood type.
**Topic:** 1a Types of data  **Lec:** 1–2  **Type:** apply
**A:** Categorical: each observation belongs to one of a set of categories. Quantitative: observations take numerical values that represent different magnitudes of the variable. Siblings: quantitative, discrete. County: categorical, nominal. Commute km: quantitative, continuous. Blood type: categorical, nominal. The deck says "quantitative" where the notes say "numerical"; same thing.

### Q: State the deck's definitions of a discrete and a continuous quantitative variable, and give the three one-line characterisations of statistics from the "What is Statistics?" slide.
**Topic:** Descriptive vs inferential  **Lec:** 1–2  **Type:** recall
**A:** Discrete: the possible values form a set of separate numbers, such as 0, 1, 2, 3, …. Continuous: the possible values form an interval. Statistics is (1) a science involving the design of studies, data collection, summarising and analysing data, interpreting results and drawing conclusions; (2) the science of learning from data and of measuring, controlling and communicating uncertainty; (3) a branch of applied mathematics dealing with data collection, organisation, analysis, interpretation and presentation.

### Q: Construct a dot plot for the midterm scores 10, 90, 95, 100, 65, 50, 60, 50, 90, 55, 60, 70 and read off the mode or modes.
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** derive
**A:** Horizontal number line labelled "Grade" from 0 to 100, one dot per score stacked above its value: 10 (1), 50 (2), 55 (1), 60 (2), 65 (1), 70 (1), 90 (2), 95 (1), 100 (1). n = 12. Three modes: 50, 60 and 90, each twice.

### Q: Build the stem-and-leaf plot for the deck's example 80 85 75 90 62 50 55 65 75 82 70 25 92 57 63 72 81 95 41 69. Why does the procedure say to include empty stems, and what is the median?
**Topic:** 1b–c Displays  **Lec:** 1–2  **Type:** derive
**A:** Stems 2 to 9: 2 | 5 · 3 | (empty) · 4 | 1 · 5 | 0 5 7 · 6 | 2 3 5 9 · 7 | 0 2 5 5 · 8 | 0 1 2 5 · 9 | 0 2 5. Empty stems stay in so the plot keeps the shape of a histogram and the gap in the 30s is visible. n = 20, so the median is the average of the 10th and 11th ordered values, 70 and 72, which is 71.


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
**A:** No. The interval stays on the axis with a bar of height zero, so the gap in the data is visible, the same reason an empty stem stays in a stem-and-leaf plot. The heights add to n = 18 (or to 1 if you plotted relative frequencies). Bars touch because the horizontal axis is a continuous number line and adjacent intervals share an endpoint.

### Q: Exam scores: 95, 92, 90, 88, 85, 84, 80, 60, 40. Without drawing anything, say which way this is skewed, then compute the mean and median and check that they agree with your answer.
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** derive
**A:** Most scores are high with two stragglers far below, so the long tail is on the left: left-skewed. Sum = 714, n = 9, mean = 714/9 ≈ 79.3. Median = the 5th ordered value = 85. Mean < median, which is the signature of a left tail.

### Q: 40 observations run from 3.2 to 9.8 and you want 6 intervals. Compute the width, propose convenient equal-width intervals that cover the data, and state what the frequency column must sum to. What changes if you use 12 intervals instead?
**Topic:** 1d Shape of a histogram (construction · empty bins · mounds · symmetric vs skewed · outliers)  **Lec:** 3  **Type:** derive
**A:** Range = 9.8 − 3.2 = 6.6, so width = 6.6/6 = 1.1. Round to a convenient width that still covers the data, for example 1.2 starting at 3.0: 3.0–4.2, 4.2–5.4, 5.4–6.6, 6.6–7.8, 7.8–9.0, 9.0–10.2, and say which endpoint each interval includes so a boundary value is counted once. The counts sum to n = 40. With 12 intervals the width halves to about 0.55: more detail but bumpier bars and more near-empty intervals. The number of intervals is a choice, and it changes how the shape looks.

### Q: State the median rule for odd and even n. Apply it to 12, 14, 15, 17, 20, 24, 24, 27, 29, then to the same list with 30 appended.
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** derive
**A:** Order the data first. Odd n: the median is the (n + 1)/2-th value. Even n: average the n/2-th and (n/2 + 1)-th values. For n = 9 the median is the 5th value, 20. With 30 appended n = 10, so average the 5th and 6th values: (20 + 24)/2 = 22.

### Q: The deck's example 4, 6, 8, 7, 5 hours has mean 6. Replace the 8 with 80 and recompute the mean and the median. What property of the median does this show, and what are the sample mean's symbol and formula?
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** derive
**A:** Original: ordered 4, 5, 6, 7, 8, mean 30/5 = 6, median 6. After: 4, 5, 6, 7, 80, mean 102/5 = 20.4, median still 6. The median is resistant to extreme values; the mean is not. The sample mean is x̄ = (x₁ + … + xₙ)/n, the sum of the observations divided by how many there are.

### Q: "The median is preferred for skewed data because it is the relative mean." Fix the reason, then give two situations where the mean is the better choice.
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** critique
**A:** There is no "relative mean". The median is preferred because it is resistant: extreme values in the long tail drag the mean toward them, so the median stays closer to a typical observation. The mean is better when the distribution is roughly symmetric with no outliers (then mean ≈ median and the mean uses every value), and when you need a total, since mean × n gives the sum (total revenue, total hours).

### Q: A real-estate board reports that detached houses sold last month had a mean price of $2.4M and a median of $1.7M. What does the gap tell you about the shape of the price distribution, what causes it, and which number describes a typical house?
**Topic:** 1b Mean and median (median rule for odd and even n · skew pulls the mean · which to report)  **Lec:** 3  **Type:** apply
**A:** Mean well above median means a long right tail: right-skewed. A few very expensive houses add a lot to the sum and pull the mean up, while the median only tracks the middle sale. The median describes the typical house; the mean is inflated by the top end. Symmetric data would show mean ≈ median, and mean < median would mean a left tail.

### Q: Compute the mean, median and range of 48, 49, 50, 51, 52 and of 30, 40, 50, 60, 70. What does the comparison prove about describing a distribution?
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** derive
**A:** First set: mean 50, median 50, range 4. Second set: mean 50, median 50, range 40. Centre and spread are separate features: two data sets can share a centre and differ completely in spread, so a measure of centre alone does not describe a distribution.

### Q: Define an outlier as the deck does. Compute the range of 70, 46, 62, 64, 15, 78, 56, 64, 69, 49, then recompute it with the 15 removed. What does that show, and which of mean and median reacts the same way?
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** apply
**A:** An outlier is an observation far from the rest of the data, unusually large or unusually small. Range = 78 − 15 = 63. Without the 15 the minimum is 46 and the range is 78 − 46 = 32. One observation halved it, because the range uses only the two extremes. The mean reacts the same way, pulled toward the outlier; the median barely moves.

### Q: Define centre and spread in one sentence each, name every measure of each you have so far, and say which measures and which display come next class.
**Topic:** 1d Centre vs spread (what each measures · range · same centre, different spread)  **Lec:** 3  **Type:** recall
**A:** Centre is a single value standing for a typical observation, where the data cluster: the measures so far are the mean and the median. Spread is how far the observations sit from each other or from the centre, also called variability or dispersion: the only measure so far is the range. Next class adds variance, standard deviation and the interquartile range, plus the boxplot that displays the median, quartiles and outliers.
