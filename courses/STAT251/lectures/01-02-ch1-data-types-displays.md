# STAT 251 — Lec 1–2 (Wed Sep 9 · Fri Sep 11) — Ch 1: data types, descriptive vs inferential, displays

Your page from Sep 11 comes first. Below it are the two decks organised for study, `Lecture_01_Chapter_1.pdf` (7 slides) and `Lecture_02_Chapter_1_CanvasPost.pdf` (16 slides, which repeats lecture 1's slides and continues), checked against both Panopto recordings on 2026-10-05. The first half of lecture 1 was a tour of the course policies, which the syllabus and logistics pages already cover.

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

## Slides, organized
### What statistics is (slide 3)
- The slide gives three textbook definitions in different words. All three say that statistics is collecting data, summarising it, analysing it, and interpreting the results to draw conclusions.
- One of the three adds that statistics is the science of learning from data and of measuring, controlling and communicating uncertainty.
- In the recording he stressed that a mistake at any one step gives a wrong conclusion, however well the other steps are done. The mistake can be biased data, a wrong summary, the wrong analysis method or a wrong interpretation.
- Interpreting means saying what a result means in plain words. A result such as "reject $$H_0$$" (Chapter 8) means nothing to a reader until you say what it implies.

### Population, sample, parameter, statistic (slide 4)
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
- A variable is categorical when each observation belongs to one of a set of categories, such as your major. He also calls it qualitative.
- A variable is quantitative when its observations are numbers that measure a magnitude. He also calls it numerical.
- The slide's four examples:
  - The number of siblings in a family is quantitative.
  - County of residence is categorical.
  - The distance in km of the commute to school is quantitative.
  - Blood type is categorical.
- A quantitative variable is discrete when its possible values are separate numbers, such as 0, 1, 2, 3, with no possible value between two neighbours.
- Shoe sizes 6, 6.5, 7 and 7.5 are discrete even though they include halves, because no size exists between 6 and 6.5.
- A quantitative variable is continuous when its possible values fill an interval, so any value between two possible values is also possible. Height, distance and weight are continuous. How many decimals you record only reflects the measuring tool.
- The type matters because it decides which graph and which analysis are correct.

### Descriptive and inferential statistics (slide 7)
- Descriptive statistics are methods for summarising data with graphs, tables and numbers. They work the same way on sample data and on population data. "The class average was 85" describes a class.
- Inferential statistics are methods for making decisions or predictions about a population from a sample of it.
- Inference has two parts, estimation and hypothesis testing, which come in Chapters 7 and 8.

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
- iClicker: which variable is continuous? The answer was (c), your dog's weight, and 92% got it.
  - The number of people waiting in line and the number of speeding tickets are counts, so they are discrete.
  - The weight is a variable because it is measured across many dogs, and it can take any value in an interval.
- iClicker: which graph suits a categorical variable with 25 categories? The answer was (b), a bar chart, and 73% got it. A pie with 25 slices is unreadable, and sorting the bars into a Pareto chart makes them easier still to compare.
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
