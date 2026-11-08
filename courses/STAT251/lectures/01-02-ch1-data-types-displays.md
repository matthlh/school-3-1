# STAT 251 — Lec 1–2 (Wed Sep 9 · Fri Sep 11) — Ch 1: data types, descriptive vs inferential, displays

`Lecture_01_Chapter_1.pdf` (7 slides) introduces the material. `Lecture_02_Chapter_1_CanvasPost.pdf` (16 slides) repeats those slides and continues with displays. The page is checked against both lectures' Panopto recordings. The first half of lecture 1 covers policies listed on the syllabus and logistics pages.

## Your notes (pasted 2026-09-11, no notebook yet)
- talked about variables (continuous vs discrete or whatever it's called)
- Descriptive vs inferential statistics (methods to summarize / methods of making predictions or decisions)
- Techniques: freq table, pie chart, bar chart, dot plot (similar to bar but dots — better for small discrete? why is that a thing?), stem and leaf (never seen this before — what's the benefit?)

## Learning goals (the Chapter 1 outcomes, slide 2)
- Tell the different types of data apart.
- Interpret methods for summarising data: graphs such as box plots and histograms, and summary statistics such as the mean, median, variance and IQR.
- Judge which summary method suits a given data set.
- Name the features that describe a distribution.
- Summarise and explore data with software, which is R in the labs.

## Statistics, samples and variables
### What statistics is (slide 3)
- Statistics: collect data, summarise it, analyse it, interpret the results to draw conclusions. The three textbook definitions all say this.
- One adds: the science of learning from data, and of measuring, controlling and communicating uncertainty.
- A mistake at any one step — biased data, wrong summary, wrong method, wrong interpretation — ruins the conclusion, however good the other steps.
- Interpreting means stating the result in plain words. "Reject $$H_0$$" (Ch 8) means nothing until you say what it implies.

### What a sample tells you about a population (slide 4)
- The population is every subject of interest in a particular study. Define it precisely: "UBC students" has to say whether it means undergraduates only, and whether online students count.
- A sample is a subset of the population. It should be chosen at random so that it represents the population.
- A biased sample gives a wrong conclusion however good the analysis is. Measuring heights at the basketball team's practice would overstate the average height of UBC students.
- A parameter is a number that describes the population. It is usually unknown, because measuring every subject costs too much or is impossible, as with the average length of every fish in a lake.
- A statistic is a number that describes a sample, so it can be computed from the data.

| Measure | Parameter (population) | Statistic (sample) |
|---|---|---|
| Mean | $$\mu$$ | $$\bar{x}$$ |
| Standard deviation | $$\sigma$$ | $$s$$ |
| Proportion | $$p$$ | $$\hat{p}$$ |

- A census collects data on the entire population, like Canada's national census. A sample survey collects data on a sample only.

### Types of variables (slides 5–6)

> **Definition.** A **categorical** variable (also qualitative) sorts each observation into a group. A **quantitative** variable (also numerical) measures a magnitude as a number.

```svg
<svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, system-ui, sans-serif" font-size="13">
  <g fill="none" stroke="var(--border3)" stroke-width="1.5">
    <path d="M300 48 V66 H150 V82 M300 66 H450 V82" />
    <path d="M150 122 V140 H80 V156 M150 140 H220 V156" />
    <path d="M450 122 V140 H380 V156 M450 140 H520 V156" />
  </g>
  <g text-anchor="middle">
    <rect x="245" y="16" width="110" height="32" rx="6" fill="var(--panel)" stroke="var(--border3)"/>
    <text x="300" y="36" fill="var(--fg)" font-weight="600">Variable</text>
    <rect x="95" y="90" width="110" height="32" rx="6" fill="var(--panel)" stroke="var(--link)"/>
    <text x="150" y="110" fill="var(--link)" font-weight="600">Categorical</text>
    <rect x="395" y="90" width="110" height="32" rx="6" fill="var(--panel)" stroke="var(--ok)"/>
    <text x="450" y="110" fill="var(--ok)" font-weight="600">Quantitative</text>
    <rect x="30" y="164" width="100" height="30" rx="6" fill="var(--panel)" stroke="var(--border2)"/>
    <text x="80" y="183" fill="var(--fg2)">Nominal</text>
    <rect x="170" y="164" width="100" height="30" rx="6" fill="var(--panel)" stroke="var(--border2)"/>
    <text x="220" y="183" fill="var(--fg2)">Ordinal</text>
    <rect x="330" y="164" width="100" height="30" rx="6" fill="var(--panel)" stroke="var(--border2)"/>
    <text x="380" y="183" fill="var(--fg2)">Discrete</text>
    <rect x="470" y="164" width="100" height="30" rx="6" fill="var(--panel)" stroke="var(--border2)"/>
    <text x="520" y="183" fill="var(--fg2)">Continuous</text>
  </g>
  <g text-anchor="middle" font-size="11" fill="var(--muted)">
    <text x="150" y="214">blood type, major</text>
    <text x="450" y="214">counts, measurements</text>
  </g>
</svg>
```

- The slide's four examples: siblings (quantitative), county of residence (categorical), commute distance in km (quantitative), blood type (categorical).
- **Discrete** means the possible values are separate numbers with nothing between neighbours, such as 0, 1, 2, 3.
- **Continuous** means the variable can take any value in an interval, such as height, distance or weight.

> **Watch out.** Shoe sizes 6, 6.5, 7, 7.5 are discrete, not continuous — no size exists between 6 and 6.5. And the measuring tool only sets how many decimals you record; it never makes a continuous variable discrete.

> **Key.** The variable's type decides which graph and which analysis are correct, so classify it first.

### Descriptive and inferential statistics (slide 7)
- Descriptive statistics are methods for summarising data with graphs, tables and numbers. They work the same way on sample data and on population data. "The class average was 85" describes a class.
- Inferential statistics are methods for making decisions or predictions about a population from a sample of it.
- Inference has two parts, estimation and hypothesis testing, which come in Chapters 7 and 8.

## Displaying the data

### Frequency tables (slide 8)
- A frequency table lists the possible values of a variable with the number of observations of each, called the frequency. It is mostly used for a categorical variable.
- A relative frequency table lists the proportion or the percentage of observations instead. The relative frequency is the count divided by the total.
- Deck example: a campus newspaper polled 300 undergraduates about a proposed change to on-campus housing rules.

| Response | Frequency | Relative frequency |
|---|---|---|
| Support | 150 | 50% |
| Neutral | 50 | 16.7% |
| Oppose | 100 | 33.3% |

- For example, the share in support is $$\frac{150}{300} = 0.5$$, which is 50%.

### Pie charts (slide 9)
- A pie chart summarises a categorical variable as a circle with one slice per category. Each slice's size is proportional to the percentage in that category, so the percentages must add to 100%.
- Label the slices with percentages rather than counts. A graph is meant to tell its story at a glance, and counts make the reader do arithmetic.
- Every graph needs a title, and a legend when colours stand for categories. He also mentioned choosing colours that colour-blind readers can tell apart.
- A numerical variable can go in a pie chart only after you group it into categories, for example grades grouped into letter-grade bands.

### Bar graphs (slide 10)
- A bar graph summarises a categorical variable with one vertical bar per category. The height is the count, called the frequency, or the percentage, called the relative frequency.
- The bars have gaps between them because the categories are separate.
- Comparing categories is usually easier on a bar graph than on a pie chart, and much easier when there are many categories.
- A Pareto chart is a bar graph with the bars sorted from tallest to shortest, which makes comparing them easier still.

### Dot plots (slide 11)
- Draw a horizontal line labelled with the variable, mark regular values along it, and put one dot above the value of each observation. Repeated values stack.
- Deck example: midterm scores out of 100 were 10, 90, 95, 100, 65, 50, 60, 50, 90, 55, 60, 70. The scores 50, 60 and 90 each get a stack of two dots.
- A dot plot suits a small data set of discrete values with repeats. You can read every original value back off it, and see the minimum, the maximum and where the values cluster.
- It is useless for a large data set, which would need thousands of dots, and for data with no repeated values, which give a flat row of single dots.

### Stem-and-leaf plots (slide 12)
- Split each observation into a stem, its leading digits, and a leaf, usually its last digit.
- Write the stems in a column from smallest to largest, including empty stems, and draw a vertical line to their right.
- Write each leaf on the row of its stem, then sort the leaves.
- Deck example, with the leaves sorted:

```
2 | 5
3 |
4 | 1
5 | 0 5 7
6 | 2 3 5 9
7 | 0 2 5 5
8 | 0 1 2 5
9 | 0 2 5
```

- The empty stem 3 stays in, so the gap in the 30s is visible.
- The leaf unit is 1 unless the plot says otherwise.
  - With a leaf unit of 10, the row 5 | 7 means 570, and a value such as 692 can only be shown rounded, as 690.
  - With a leaf unit of 0.1, the row 5 | 7 means 5.7.
- The point is the overall picture: the minimum, the maximum and where the data cluster. Exact values are not needed for that.

### Histograms (slides 13–14, finished in lecture 3)
- A histogram is for quantitative data, discrete or continuous. It is drawn on a continuous scale, so the bars touch.
- Deck example: the hours worked in one semester by 25 students, from 175 to 265.

$$
\begin{aligned}
\text{range} &= 265 - 175 = 90 \\
\text{width} &= \frac{90}{5} = 18
\end{aligned}
$$

- A width of 18 is awkward by hand, so he used 20 and started at 170.

| Interval (hours) | Frequency |
|---|---|
| 170 to 190 | 1 |
| 190 to 210 | 2 |
| 210 to 230 | 7 |
| 230 to 250 | 10 |
| 250 to 270 | 5 |

- The steps on slide 14:
  - Divide the range into intervals of equal width.
  - Count the observations in each interval to make a frequency table.
  - Label the interval endpoints on the horizontal axis.
  - Draw a bar over each interval with height equal to its frequency or percentage, read off the vertical axis.
  - Label both axes and give the graph a title.
- Lecture 2 ended on which interval gets a value that sits exactly on a boundary, such as 230. Lecture 3 answered it: count the value in the interval where it is the upper end, and use that rule at every boundary.

## In class
### Lecture 1 (Wed Sep 9)
- The Chapter 1 deck reached slide 4, the census.
- An ungraded week-1 iClicker asked for one word for how you got good at the thing you are best at. The top answer was "practice". His advice for the course is to do many problems, including textbook exercises beyond the assignments, rather than memorise.
- He said the class average is usually 75 to 80, with many A and A+ grades. He expects about 9 to 10 hours a week on the course, including lectures and the lab.
- Chapter 2, on bivariate data, is skipped for now and taught with Chapter 11 at the end of the term.

### Lecture 2 (Fri Sep 11)

> **Example.** iClicker — which variable is continuous? Answer (c), your dog's weight; 92% got it. People waiting in line and speeding tickets are counts, so they are discrete; weight is continuous because it is measured and can take any value in an interval.

> **Example.** iClicker — which graph suits a categorical variable with 25 categories? Answer (b), a bar chart; 73% got it. A pie chart with 25 slices is unreadable, and sorting the bars into a Pareto chart makes them even easier to compare.

- He said answering iClicker from outside the room counts as cheating. If you miss a class, use the hour for other work and watch the recording later, since several of the lowest sessions are dropped at the end of term.
- The lecture ended partway through the histogram example on slide 13.

## Clarifications
### Variable types (your "or whatever it's called")
- The deck splits variables into categorical and quantitative, then splits quantitative into discrete and continuous.
- Discrete values are separate numbers, usually counts. Continuous values fill an interval, usually measurements.
- Some questions in the bank also use nominal, meaning categories with no order such as blood type, and ordinal, meaning ordered categories such as letter grades. The deck does not use those two words, but they name the two kinds of categorical variable.

### Why dot plots exist (your question)
- A dot plot is for numerical data, not categories, so the bar chart is not the right comparison. The histogram is.
- It beats a histogram on a small data set with few distinct values and repeats, because every observation stays visible and nothing gets grouped into intervals.

### What stem-and-leaf plots are for (your question)
- A stem-and-leaf plot shows the shape like a histogram turned on its side, and you can still read the values back off it. The minimum, the maximum and the median come straight off the plot.
- It only works for small data sets.

Questions: 28 in [02-questions.md](../02-questions.md) under "Lec 1–2", and 1 under "Long problems". Ledger: 3 topics.
