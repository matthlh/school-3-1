# STAT 251 — Lec 5 (Fri Sep 18) — Ch 3: sets and probability, the addition rule

No page from you for this one (sick). This file is the posted after-class deck organised for study: `Lecture_05_Chapter_3_CanvasPost_AL.pdf` (17 slides, Canvas file 47723631), plus the last two slides of the lecture 4 after-class deck, which the class started with. Two formulas are images that the Canvas text layer drops (equally likely counting on slide 8, countable additivity on slide 13); they are written here from the surrounding slide text and the standard statement.

## Learning goals (slides 2–3, the Chapter 3 outcomes)
- Recall the basic mathematical properties of probability.
- Describe the sample space of a situation involving randomness.
- Explain probability as a long-run relative frequency. That slide was not reached; lecture 6 opens with it.
- Say what independent, mutually exclusive (disjoint) and complementary events are. Independence itself is lecture 6.
- Find probabilities of single events, complements, unions and intersections, using Venn diagrams where they help.
- The rest of the Chapter 3 list (conditional probability, Bayes' theorem, the law of total probability, series and parallel circuits) belongs to lectures 6 and 7.

## Slides, organized
### Carried over from lecture 4 (its slides 11 and 12)
- Location and scale changes: if every observation is transformed by $$y_i = a + b\,x_i$$, the mean becomes $$\bar{y} = a + b\,\bar{x}$$ and the variance becomes $$s_y^2 = b^2 s_x^2$$. Celsius to Fahrenheit is the deck's case, with $$a = 32$$ and $$b = \frac{9}{5}$$.
- The last lecture 4 slide shows a box plot and a histogram of the same data, generated from a right-skewed $$F(10, 5)$$ distribution. The histogram shows the skew as a long right tail. The box plot shows the same skew as a median sitting low in the box, a long upper whisker and starred outliers above it.

### Random experiments, sample spaces and events (slides 4–6)
- A random experiment is one whose outcome cannot be determined beforehand, even when it is repeated in exactly the same way. Probability, not the setup, decides the outcome.
- The sample space $$S$$ is the set of all possible outcomes. An event is a subset of $$S$$, written with a capital letter.
- Example 1: flip a coin three times.

$$
\begin{aligned}
S &= \{HHH, HHT, HTH, HTT, \\
&\qquad THH, THT, TTH, TTT\} \\
A &= \text{two or more tails} = \{TTT, TTH, THT, HTT\} \\
B &= \text{exactly two heads} = \{HHT, HTH, THH\}
\end{aligned}
$$

- Example 2: the number of auto accidents in BC in a year. $$S = \{0, 1, 2, 3, \dots\}$$, which is discrete and infinite. "More than 100 accidents" is $$A = \{101, 102, 103, \dots\}$$.
- Example 3: the lifespans in hours of two components, which gives a bivariate and continuous sample space. If the system works only while both components work, the event "the system fails in under 10 hours" is $$A$$ below. The "or" is there because the system fails as soon as either component does.

$$
\begin{aligned}
S &= \{(X_1, X_2) : X_1 \ge 0,\ X_2 \ge 0\} \\
A &= \{(X_1, X_2) : 0 \le X_1 < 10 \text{ or } 0 \le X_2 < 10\}
\end{aligned}
$$

### Probabilities of outcomes and events (slides 7–8)
- Every outcome in $$S$$ has a probability between 0 and 1, and the probabilities of all the outcomes add to 1.
- $$P(A)$$ is the sum of the probabilities of the outcomes in $$A$$, so $$0 \le P(A) \le 1$$. $$P(A) = 0$$ means $$A$$ is impossible and $$P(A) = 1$$ means $$A$$ always occurs.
- When all outcomes are equally likely, count outcomes. For the three coin flips, $$P(\text{two or more tails}) = \frac{4}{8}$$.

$$
P(A) = \frac{\text{number of outcomes in } A}{\text{number of outcomes in } S}
$$

### Events as sets (slides 9–12)
- The complement $$A^c$$ holds every outcome of $$S$$ that is not in $$A$$. $$P(A)$$ and $$P(A^c)$$ add to 1, so $$P(A^c) = 1 - P(A)$$.
- The intersection $$A \cap B$$ holds the outcomes common to $$A$$ and $$B$$. Its probability is written $$P(A \text{ and } B)$$ or $$P(A \cap B)$$.
- Two events are disjoint, or mutually exclusive, when they have no outcome in common. They cannot occur together, so $$P(A \cap B) = 0$$. Rolling a die, "odd" and "even" are disjoint.
- The union $$A \cup B$$ holds the outcomes in $$A$$, in $$B$$, or in both. Its probability is written $$P(A \text{ or } B)$$ or $$P(A \cup B)$$.
- Each of these slides carries a Venn diagram: a rectangle for $$S$$ with a circle per event. The complement is everything outside the circle, the intersection is the overlap, disjoint events are two circles that do not touch, and the union is both circles together.

### Properties of probability (slide 13)
- General addition rule:

$$
P(A \cup B) = P(A) + P(B) - P(A \cap B)
$$

- If $$A$$ and $$B$$ are disjoint the last term is zero, so $$P(A \cup B) = P(A) + P(B)$$.
- Complement rule: $$P(A^c) = 1 - P(A)$$.
- If $$A \subset B$$ (every outcome of $$A$$ is in $$B$$), then $$P(A \cap B) = P(A)$$ and $$P(A) \le P(B)$$.
- Countable additivity, given as a definition: for a sequence of pairwise disjoint events $$A_1, A_2, A_3, \dots$$, the probability of their union is the sum of their probabilities. This is the rule behind computing $$P(A)$$ by adding outcome probabilities.

$$
\begin{aligned}
P(A_1 \cup A_2 \cup A_3 \cup \dots) &= P(A_1) + P(A_2) \\
&\quad + P(A_3) + \dots
\end{aligned}
$$

### Worked example (slide 14)
- 85% of Canadians like baseball or hockey, 45% like baseball and 65% like hockey. Let $$A$$ = likes hockey and $$B$$ = likes baseball. The addition rule gives:

$$
\begin{aligned}
0.85 &= 0.65 + 0.45 - P(A \cap B) \\
P(A \cap B) &= 0.25
\end{aligned}
$$

### Not reached in class (slides 15–16; lecture 6 opens with them)
- Exercise: verify the three-event rule below for any three events. The derivation is in the question bank.

$$
\begin{aligned}
P(A \cup B \cup C) &= P(A) + P(B) + P(C) \\
&\quad - P(A \cap B) - P(A \cap C) - P(B \cap C) \\
&\quad + P(A \cap B \cap C)
\end{aligned}
$$

- Probability as a long-run relative frequency. The slide only states the outcome, so the explanation comes Monday.

### Next class
- Monday Sep 21: conditional probability, independence and applications ([lecture 6](06-conditional-probability-independence.md)). Lecture 7 is Bayes' theorem.

## Clarifications
- Disjoint is not the same as complementary. Disjoint means the intersection is empty. Complementary means disjoint and together filling $$S$$, so $$P(A) + P(B) = 1$$. Odd and even on a die are both; $$\{1\}$$ and $$\{2\}$$ are disjoint only.
- Disjoint is also not the same as independent, which arrives Monday. Two disjoint events with positive probability are never independent, because one occurring rules the other out. Lecture 6's deck carries the same warning.
- The three-event rule comes from applying the two-event rule twice. Write $$A \cup B \cup C$$ as $$(A \cup B) \cup C$$, expand $$P(A \cup B)$$, and use $$(A \cup B) \cap C = (A \cap C) \cup (B \cap C)$$, whose two pieces overlap in $$A \cap B \cap C$$.

Questions: 12 in [02-questions.md](../02-questions.md) under "Lec 5", and 1 under "Long problems". Ledger: 3 topics, due Sep 20.
