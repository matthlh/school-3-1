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
