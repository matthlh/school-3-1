# PHIL321 — Question Bank

Claude's source of truth for quizzing. Grows every lecture.
Tag each question with its topic so the ledger and the bank stay linked.

Format:
```
### Q: <question>
**Topic:** <topic name>  **Lec:** <n>  **Type:** recall | apply | derive | critique
**A:** <answer>
```

---

### Q: State the three kinds of decision situation and what distinguishes them.
**Topic:** Decision situations (certainty / risk / ignorance)  **Lec:** 1  **Type:** recall
**A:** Certainty: each act has one known outcome. Risk: several possible states, with known probabilities. Ignorance (uncertainty): several possible states, probabilities unknown.

### Q: You're choosing between two umbrellas at a fixed price, knowing exactly what each does. Which decision situation is this, and what's the rule?
**Topic:** Decision situations (certainty / risk / ignorance)  **Lec:** 1  **Type:** apply
**A:** Decision under certainty. Rule: pick the act whose (known) outcome you prefer most.

### Q: Define weak dominance and strong dominance precisely.
**Topic:** Principle of dominance  **Lec:** 1  **Type:** recall
**A:** A weakly dominates B if A's outcome is at least as good as B's in every state and strictly better in at least one. A strongly dominates B if A's outcome is strictly better in every state.

### Q: Acts a1, a2; states s1, s2. a1 gives (10, 5), a2 gives (10, 3). Does either dominate? Weakly or strongly?
**Topic:** Principle of dominance  **Lec:** 1  **Type:** apply
**A:** a1 weakly dominates a2 (equal in s1, better in s2). Not strong dominance since they tie in s1.

### Q: When does the dominance principle give the wrong answer, and why?
**Topic:** Principle of dominance  **Lec:** 1  **Type:** derive
**A:** When the act affects which state obtains (states not independent of acts). E.g. "don't get vaccinated" looks dominant in each state (sick / not sick) because you save the cost, but the act changes the probability of being sick. Dominance is only valid for act-independent states.

### Q: Distinguish the right decision from the rational decision. Can a rational decision be wrong?
**Topic:** Right vs rational decisions  **Lec:** 1  **Type:** recall
**A:** Right = the act that actually leads to the best outcome (judged with hindsight/full information). Rational = the act that is best given what the agent knows at the time. Yes: a rational bet can lose; a reckless one can win (right but not rational).

### Q: State the principle of insufficient reason. Which decision situation is it for?
**Topic:** Principle of insufficient reason  **Lec:** 1  **Type:** recall
**A:** Under ignorance, if you have no reason to think one state more likely than another, assign them equal probability and maximise expected value. It's a rule for decisions under ignorance, turning them into decisions under risk.

### Q: What is diminishing marginal utility of money, and what does it imply about a fair 50/50 bet of $1000 for someone with $1000?
**Topic:** Utility and preferences  **Lec:** 1  **Type:** apply
**A:** Each extra dollar adds less utility than the last. So losing $1000 (going to $0) costs more utility than gaining $1000 (going to $2000) adds; the bet has zero expected monetary value but negative expected utility, so declining it is rational.

### Q: Why can't you just use money as the measure of an outcome's value?
**Topic:** Utility and preferences  **Lec:** 1  **Type:** recall
**A:** People value outcomes differently (preferences vary), and the value of money itself isn't linear (diminishing marginal utility). Utility is the measure of how much *this* agent values an outcome.

### Q: What does an ordinal utility scale tell you, and what doesn't it tell you?
**Topic:** Ordinal vs cardinal utility  **Lec:** 1  **Type:** recall
**A:** It tells you the ranking of outcomes (which is preferred to which). It does not tell you by how much; the gaps between numbers carry no information.

### Q: Two ordinal assignments agree on the ranking of outcomes A > B > C: (3, 2, 1) and (100, 2, 1). Act X yields A with prob 0.5 else C; act Y yields B for sure. Which act has higher expected value under each assignment, and what does this show?
**Topic:** Ordinal vs cardinal utility  **Lec:** 1  **Type:** derive
**A:** Under (3,2,1): EV(X)=2, EV(Y)=2, tie. Under (100,2,1): EV(X)=50.5, EV(Y)=2, X wins. Same ranking, different verdict, so expected-value reasoning needs an interval (cardinal) scale, not merely ordinal utilities.
