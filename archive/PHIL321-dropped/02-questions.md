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
**A:**
- Certainty: each act has one known outcome.
- Risk: several possible states, with known probabilities.
- Ignorance (uncertainty): several possible states, probabilities unknown.

### Q: You're choosing between two umbrellas at a fixed price, knowing exactly what each does. Which decision situation is this, and what's the rule?
**Topic:** Decision situations (certainty / risk / ignorance)  **Lec:** 1  **Type:** apply
**A:** Decision under certainty. Rule: pick the act whose (known) outcome you prefer most.

### Q: Define weak dominance and strong dominance precisely.
**Topic:** Principle of dominance  **Lec:** 1  **Type:** recall
**A:**
- A weakly dominates B if A's outcome is at least as good as B's in every state and strictly better in at least one.
- A strongly dominates B if A's outcome is strictly better in every state.

### Q: Acts a1, a2; states s1, s2. a1 gives (10, 5), a2 gives (10, 3). Does either dominate? Weakly or strongly?
**Topic:** Principle of dominance  **Lec:** 1  **Type:** apply
**A:** a1 weakly dominates a2 (equal in s1, better in s2). Not strong dominance since they tie in s1.

### Q: When does the dominance principle give the wrong answer, and why?
**Topic:** Principle of dominance  **Lec:** 1  **Type:** derive
**A:** When the act affects which state obtains (states not independent of acts). E.g. "don't get vaccinated" looks dominant in each state (sick / not sick) because you save the cost, but the act changes the probability of being sick. Dominance is only valid for act-independent states.

### Q: Distinguish the right decision from the rational decision. Can a rational decision be wrong?
**Topic:** Right vs rational decisions  **Lec:** 1  **Type:** recall
**A:** Right: the act that actually leads to the best outcome, judged with hindsight or full information. Rational: the act that is best given what the agent knows at the time. Yes: a rational bet can lose, and a reckless one can win (right but not rational).

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
**A:**
- Under (3, 2, 1): EV(X) = 2 and EV(Y) = 2, a tie.
- Under (100, 2, 1): EV(X) = 50.5 and EV(Y) = 2, so X wins.

Same ranking, different verdict. Expected-value reasoning needs an interval (cardinal) scale, not merely ordinal utilities.

### Q: You're picking a health plan where the possible future medical costs and their exact probabilities are published by the insurer. Which decision situation is this?
**Topic:** Decision situations (certainty / risk / ignorance)  **Lec:** 1  **Type:** apply
**A:** Decision under risk — several possible states (cost outcomes), with known probabilities, not one guaranteed outcome per act.

### Q: A friend says "under ignorance we just don't know anything, so it's basically the same as risk, just messier." What's wrong with equating the two?
**Topic:** Decision situations (certainty / risk / ignorance)  **Lec:** 1  **Type:** critique
**A:** Risk means the probabilities of each state ARE known; ignorance means they are not known at all. "Messier risk" still has numbers to compute an expected value with — ignorance has none, which is why it needs its own rule (insufficient reason) to even become tractable.

### Q: Under decision under certainty, what exactly do you need to know about each act, and what do you NOT need to know that risk and ignorance both require?
**Topic:** Decision situations (certainty / risk / ignorance)  **Lec:** 1  **Type:** derive
**A:** You need to know the single, guaranteed outcome of each act. You don't need any probabilities at all — there's only one possible state per act, so there's nothing to weight.

### Q: Why can't a decision under risk be re-labelled "certainty" just because you can compute a single expected-value number for each act?
**Topic:** Decision situations (certainty / risk / ignorance)  **Lec:** 1  **Type:** derive
**A:** The expected value is a summary of several possible outcomes weighted by probability — the actual outcome is still not known in advance. Certainty requires one known outcome per act, not one computed average over several possible ones.

### Q: Acts c1, c2; states s1, s2, s3. c1 gives (4, 4, 4); c2 gives (4, 4, 5). Does either dominate, and weakly or strongly?
**Topic:** Principle of dominance  **Lec:** 1  **Type:** apply
**A:** c2 weakly dominates c1 — equal in s1 and s2, strictly better in s3. Not strong dominance, since they tie in two of the three states.

### Q: Why must a dominance comparison hold the set of states fixed across both acts, rather than each act being checked against whatever states are "relevant" to it?
**Topic:** Principle of dominance  **Lec:** 1  **Type:** derive
**A:** Dominance is a claim about the same act-independent partition of possibilities: if the two acts were compared against different state-sets, "does at least as well in every state" would be comparing different things and the comparison would be meaningless.

### Q: A gambler says "action A beat action B in every scenario I personally imagined, so A dominates B." What check is missing before this is a valid dominance argument?
**Topic:** Principle of dominance  **Lec:** 1  **Type:** critique
**A:** Two checks: the imagined scenarios must be the complete, exhaustive set of relevant states (not just the ones that came to mind), and the states must be independent of which act is chosen — otherwise, as with the vaccination example, the "dominant" act may be changing the probabilities rather than genuinely winning in every real state.

### Q: You bet on the favoured horse at good odds, given everything you knew, and it loses. Was the decision rational? Was it the right decision?
**Topic:** Right vs rational decisions  **Lec:** 1  **Type:** apply
**A:** Rational: yes — it was the best choice given the information available at the time. Right: no — with hindsight, the outcome that actually occurred means a different bet would have done better. A decision can be rational without being right.

### Q: A driver runs a red light while distracted and, by luck, reaches the hospital in time to save a life without causing an accident. Was this the right decision? The rational one?
**Topic:** Right vs rational decisions  **Lec:** 1  **Type:** apply
**A:** It may turn out to have been the right decision, in hindsight, because it led to the best outcome (a life saved, no accident). It was not rational — running a red light while distracted was reckless given what the driver knew and could predict at the time, regardless of how it turned out.

### Q: Why can the "right" decision be identified with certainty only after the fact, for decisions under risk or ignorance — but not for decisions under certainty?
**Topic:** Right vs rational decisions  **Lec:** 1  **Type:** derive
**A:** Under risk or ignorance, several outcomes were genuinely possible when the decision was made, so which one "was right" depends on which state actually occurred — only knowable afterward. Under certainty each act has exactly one known outcome from the start, so the right act is already knowable in advance and rationality and rightness coincide.

### Q: State the test for whether an act counts as rational, in terms of what the agent knew and believed at the time.
**Topic:** Right vs rational decisions  **Lec:** 1  **Type:** recall
**A:** An act is rational if it is the best act given the agent's information and beliefs (about outcomes and probabilities) at the time of the decision — judged prospectively, not by how things turned out.

### Q: A doctor prescribes the treatment best supported by the evidence, but this particular patient turns out to be the rare case where it fails. Right? Rational? What is the point of drawing this distinction here?
**Topic:** Right vs rational decisions  **Lec:** 1  **Type:** critique
**A:** Rational: yes — it was the best-supported choice given the evidence available. Right: no, in this instance — the outcome was bad. The point: we should still judge the doctor's decision-making by rationality, not by this outcome, since a rational process can produce a bad outcome without the decision itself having been a mistake.

### Q: You're offered a bet on a coin of totally unknown bias — no information at all about which side is more likely. Apply the principle of insufficient reason: what probabilities do you assign, and what does it recommend?
**Topic:** Principle of insufficient reason  **Lec:** 1  **Type:** apply
**A:** With no reason to favour either side, assign each a probability of 0.5, then choose the act with the higher expected value under that assignment (here, by symmetry, either side of an even bet is equally recommended).

### Q: Why does invoking the principle of insufficient reason convert a decision under ignorance into a decision under risk, rather than just leaving it as ignorance?
**Topic:** Principle of insufficient reason  **Lec:** 1  **Type:** derive
**A:** Ignorance means no probabilities are known; the principle supplies them (equal probability to each state), so the decision now has known probabilities attached to its states — exactly what defines risk.

### Q: You face three possible states under ignorance instead of two. How does applying the principle of insufficient reason change, and does the recommended act necessarily stay the same as with a two-state split?
**Topic:** Principle of insufficient reason  **Lec:** 1  **Type:** apply
**A:** Each of the three states gets probability 1/3 instead of 1/2 each. The recommended act can change, since the expected value of each act is now a weighted average over a different, finer partition of possibilities — how you carve up "the states" affects the answer.

### Q: State the principle of insufficient reason in one line, then say which decision situation it takes as input and which it produces as output.
**Topic:** Principle of insufficient reason  **Lec:** 1  **Type:** recall
**A:** Assign equal probability to every state you have no reason to think more likely than another, and maximise expected value. Input: a decision under ignorance. Output: treated as a decision under risk.

### Q: Two agents facing the exact same decision under ignorance carve up the possible states differently — one uses 2 states, the other uses 4 finer states covering the same possibilities. Why might the principle of insufficient reason give them different recommended acts?
**Topic:** Principle of insufficient reason  **Lec:** 1  **Type:** critique
**A:** The principle assigns equal probability to whatever states are on the list, so a coarser split (2 states at 1/2 each) and a finer split of the same possibilities (4 states at 1/4 each, but not evenly corresponding to the coarse pair) can produce different probability weightings on the underlying possibilities, and so a different expected value and a different recommended act — the principle is sensitive to how the states are individuated.

### Q: Why isn't total money in hand a sufficient measure of how good an outcome is for a decision-theoretic agent?
**Topic:** Utility and preferences  **Lec:** 1  **Type:** recall
**A:** Because utility, not money, is what agents are assumed to maximise, and money doesn't convert into utility at a constant rate (diminishing marginal utility) or the same way for every agent (preferences vary) — two people with the same amount of money can value it very differently.

### Q: A billionaire and someone with $500 total are both offered the same fair 50/50 bet of winning or losing $400. Why might diminishing marginal utility of money make this bet rational for one and not the other?
**Topic:** Utility and preferences  **Lec:** 1  **Type:** apply
**A:** For the billionaire, $400 either way barely moves their utility, so the bet is close to utility-neutral (rational to take or leave). For the person with $500, losing $400 (down to $100) costs far more utility than gaining $400 (up to $900) adds, since utility rises less steeply as money increases — so declining is rational even though the bet is fair in dollar terms.

### Q: What does it mean to say utility is agent-relative, and why does that block using one universal outcome-value scale for every decision-maker?
**Topic:** Utility and preferences  **Lec:** 1  **Type:** derive
**A:** Utility measures how much a particular agent values an outcome, given their own preferences — the same outcome (e.g., $1000, or a particular meal) can carry different utility for different agents. A universal scale would have to assume everyone values the same things equally, which preferences in general don't support.

### Q: Someone objects: "diminishing marginal utility just means rich people should always gamble more than poor people." Is that what the principle implies? Why or why not?
**Topic:** Utility and preferences  **Lec:** 1  **Type:** critique
**A:** No — it implies that for a FIXED bet size, the utility cost of a possible loss matters less to someone with more money (relative to their existing utility curve), which can make a given bet closer to rational for them. It says nothing about gambling more overall; the recommended bet size still depends on the specific stakes and each agent's own utility curve, not a general rule that wealth implies more gambling.

### Q: What does an ordinal utility scale fail to tell you that a cardinal (interval) scale does?
**Topic:** Ordinal vs cardinal utility  **Lec:** 1  **Type:** recall
**A:** An ordinal scale only tells you the ranking (which outcome is preferred to which); a cardinal scale tells you the size of the gaps between outcomes, which is what expected-value arithmetic actually needs.

### Q: You're told outcome A ranks above B which ranks above C, with no further numbers given. Can you compute the expected value of a gamble between A and C versus a sure B? Why or why not?
**Topic:** Ordinal vs cardinal utility  **Lec:** 1  **Type:** apply
**A:** No — expected value requires numbers whose differences are meaningful (a cardinal scale). A bare ranking (A > B > C) is consistent with many different numeric assignments that agree on the order but disagree on the resulting expected value, so no single answer can be computed from ranking alone.

### Q: Why does the ordinal-vs-cardinal distinction matter specifically for decisions under risk, but matter far less for decisions under certainty?
**Topic:** Ordinal vs cardinal utility  **Lec:** 1  **Type:** derive
**A:** Under certainty you only need to rank the one guaranteed outcome of each act against the others — an ordinal scale suffices, since you just pick the top-ranked one. Under risk, you must compute expected values by weighting outcomes by probability, which requires knowing the size of the differences between outcomes — that's cardinal information an ordinal scale doesn't carry.

### Q: Someone assigns utilities (10, 9, 1) to outcomes A > B > C and concludes "A is only slightly better than B, but B is far better than C." Is that a legitimate use of an ordinal scale? What would make it legitimate?
**Topic:** Ordinal vs cardinal utility  **Lec:** 1  **Type:** critique
**A:** Not on a merely ordinal scale — reading off "slightly better" versus "far better" from the numbers treats the gaps (10−9 vs 9−1) as meaningful magnitudes, which is a cardinal claim. It would only be legitimate if the scale had already been established as cardinal (an interval scale), not just an arbitrary ranking-preserving set of numbers.

### Q: Write down what ≻, ~ and ≽ mean, and state the two conditions a utility function u must satisfy to represent a preference ordering.
**Topic:** Preference relations and ordinal-scale axioms  **Lec:** 2  **Type:** recall
**A:** ≻ is strict preference, ~ is indifference, ≽ is weak preference (at least as good as). u represents the ordering when u(x) > u(y) if and only if x ≻ y, and u(x) = u(y) if and only if x ~ y.

### Q: Name the three conditions a preference ordering must satisfy to be represented on an ordinal scale, and state each one formally.
**Topic:** Preference relations and ordinal-scale axioms  **Lec:** 2  **Type:** recall
**A:** Completeness: for all x, y, either x ≽ y or y ≽ x. Asymmetry: if x ≻ y then not y ≻ x. Transitivity: if x ≻ y and y ≻ z then x ≻ z (plus the three mixed versions with ~).

### Q: List the four transitivity conditions.
**Topic:** Preference relations and ordinal-scale axioms  **Lec:** 2  **Type:** recall
**A:** (1) x ≻ y and y ≻ z gives x ≻ z. (2) x ~ y and y ~ z gives x ~ z. (3) x ≻ y and y ~ z gives x ≻ z. (4) x ~ y and y ≻ z gives x ≻ z.

### Q: An agent says "I can't rank a weekend in Tofino against a new laptop; they're just different." Which axiom does this violate, and why is this not the same as being indifferent?
**Topic:** Preference relations and ordinal-scale axioms  **Lec:** 2  **Type:** apply
**A:** Completeness. Indifference is a definite ranking (the two are equally good, so a coin flip is fine and you would trade one for the other plus a tiny bonus). Incomparability is having no ranking at all, so no utility number can be assigned to either. Completeness is an idealisation of a rational agent.

### Q: An agent prefers tea to coffee, coffee to juice, and juice to tea. Which axiom fails, and what practical problem does the agent face?
**Topic:** Preference relations and ordinal-scale axioms  **Lec:** 2  **Type:** apply
**A:** Transitivity. The agent is a "money pump": they will pay to swap juice for coffee, coffee for tea, tea for juice, and be back where they started minus the payments. No utility function can represent cyclic preferences.

### Q: What is an indifference class, and how do indifference classes relate to an ordinal utility scale?
**Topic:** Preference relations and ordinal-scale axioms  **Lec:** 2  **Type:** recall
**A:** An indifference class is a set of outcomes the agent is indifferent between. The classes are strictly ordered by ≻, and an ordinal utility function assigns one number to each class, higher for more-preferred classes.

### Q: Which transformations preserve an ordinal scale, an interval scale, and a ratio scale? Give one real-world example of each scale.
**Topic:** Ordinal vs cardinal utility  **Lec:** 2  **Type:** recall
**A:** Ordinal: any strictly increasing function (example: a ranking of restaurants). Interval: positive linear transformations u′ = a·u + b with a > 0 (example: temperature in °C vs °F). Ratio: u′ = a·u with a > 0, since the zero is fixed (example: weight in kg vs lb).

### Q: Utilities (10, 20, 40) for outcomes A, B, C are on an interval scale. Which of these are equivalent scales: (1, 2, 4), (30, 50, 90), (10, 20, 30), (100, 400, 1600)? Explain.
**Topic:** Ordinal vs cardinal utility  **Lec:** 2  **Type:** apply
**A:** (1, 2, 4) and (30, 50, 90) are equivalent: each is a·u + b with a > 0 (a = 0.1, b = 0; a = 2, b = 10). The test is that the ratio of gaps (C − B)/(B − A) stays 2. (10, 20, 30) fails (ratio 1) and (100, 400, 1600) fails (it is u², a nonlinear map, ratio 4). Both keep the order, so they are ordinally equivalent but not interval-equivalent.

### Q: Why is clock time an interval scale but duration a ratio scale?
**Topic:** Ordinal vs cardinal utility  **Lec:** 2  **Type:** derive
**A:** Clock time has an arbitrary zero (midnight, or year 1), so "3 o'clock is three times 1 o'clock" is meaningless, but differences between times are meaningful. Duration has a true zero (no time elapsed), so "6 hours is twice 3 hours" is meaningful.

### Q: Acts a1, a2, a3 over states s1, s2, s3 give a1 = (2, 5, 9), a2 = (4, 4, 6), a3 = (4, 7, 5). Which act does maximin pick? Maximax? Leximin?
**Topic:** Ignorance rules: maximin, leximin, maximax, optimism-pessimism  **Lec:** 2  **Type:** apply
**A:** Worst outcomes: a1 = 2, a2 = 4, a3 = 4. Maximin ties a2 and a3. Maximax picks a1 (best outcome 9). Leximin breaks the maximin tie on the second-worst: a2 = 4, a3 = 5, so leximin picks a3.

### Q: Define the optimism-pessimism (Hurwicz) rule. Using the acts a1 = (2, 5, 9) and a2 = (4, 4, 6), which act does it pick with α = 0.5, and with α = 0.2?
**Topic:** Ignorance rules: maximin, leximin, maximax, optimism-pessimism  **Lec:** 2  **Type:** apply
**A:** Score each act as α·(best) + (1 − α)·(worst) and choose the highest. α = 0.5: a1 = 0.5·9 + 0.5·2 = 5.5, a2 = 0.5·6 + 0.5·4 = 5, so a1. α = 0.2: a1 = 1.8 + 1.6 = 3.4, a2 = 1.2 + 3.2 = 4.4, so a2. α = 1 reduces to maximax and α = 0 to maximin.

### Q: Which decision rules for ignorance need only an ordinal ranking of outcomes, and which need an interval scale? Justify.
**Topic:** Ignorance rules: maximin, leximin, maximax, optimism-pessimism  **Lec:** 2  **Type:** derive
**A:** Maximin, leximin and maximax need only ordinal information, because they only compare outcomes (worst vs worst, best vs best). The optimism-pessimism rule and the principle of insufficient reason need an interval scale, because they weight and add utilities, and an ordinal transformation can change which act wins that sum.

### Q: What does it mean that a preference ordering is "relative to a time", and why does that matter for decision theory?
**Topic:** Preference relations and ordinal-scale axioms  **Lec:** 2  **Type:** recall
**A:** The axioms constrain an agent's preferences at a given time, not across their life. Preferences can change over time without irrationality; a decision is rational relative to the preferences the agent holds when deciding.

### Q: A hiker picks a route with no idea what the weather will be. Route A gives 10 if sunny and 2 if it rains; route B gives 6 if sunny and 5 if it rains. Which route does maximin pick, which does maximax pick, and what attitude to risk would make each rule the right one?
**Topic:** Ignorance rules: maximin, leximin, maximax, optimism-pessimism  **Lec:** 2  **Type:** apply
**A:** Maximin picks B, because its worst outcome (5) beats A's worst (2). Maximax picks A, because its best outcome (10) beats B's best (6). Maximin fits an agent who must guarantee a floor and treats the worst case as what matters; maximax fits an agent who only cares about the best case.

### Q: Two acts share the same worst outcome: a1 = (3, 3, 8) and a2 = (3, 6, 6). Maximin cannot separate them. Show how leximin decides, and say what leximin does if the second-worst outcomes tie too.
**Topic:** Ignorance rules: maximin, leximin, maximax, optimism-pessimism  **Lec:** 2  **Type:** derive
**A:** Leximin sorts each act's outcomes from worst to best and compares position by position. Worst outcomes tie at 3, so it moves to the second-worst: a1 has 3 and a2 has 6, so a2 wins. If those tied too it would compare the third-worst, and so on; if every position ties the agent is indifferent between the acts.

### Q: Using a1 = (2, 5, 9) and a2 = (4, 4, 6), find the optimism index α at which the optimism-pessimism rule is indifferent between the two acts, and say which act it picks above and below that α.
**Topic:** Ignorance rules: maximin, leximin, maximax, optimism-pessimism  **Lec:** 2  **Type:** derive
**A:** Score each act as α·(best) + (1 − α)·(worst). a1 scores 9α + 2(1 − α) = 2 + 7α. a2 scores 6α + 4(1 − α) = 4 + 2α. They are equal when 2 + 7α = 4 + 2α, so α = 0.4. Above 0.4 (more optimistic) the rule picks a1; below 0.4 it picks a2.

### Q: Someone says the optimism-pessimism rule is just maximin and maximax averaged, so it works on an ordinal scale like they do. What is wrong with that?
**Topic:** Ignorance rules: maximin, leximin, maximax, optimism-pessimism  **Lec:** 2  **Type:** critique
**A:** The rule weights and adds the best and worst utilities, so its verdict depends on the size of the gaps between outcomes, not just their order. Any strictly increasing transformation keeps the order but can change which act scores higher, so the rule needs an interval scale. Maximin and maximax only compare outcomes one against another, so they survive any order-preserving transformation and need only ordinal information.
