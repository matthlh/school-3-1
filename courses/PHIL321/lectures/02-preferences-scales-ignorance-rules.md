# PHIL 321 — Lec 2 (Mon Sep 14, 2026; sitting in, course undecided)

## Raw

* preference list is relatvie to time (makes sense, it's not set)
* Preference symbol looks like > (rationally)
* Benefit of making decisions under ignorance is you don't need more information than the preference list.
* u(x) -> utility of x u(x) > u(y) when x prefered over y
* ~ mean indifferent?  (means same value preference) |
* Set of confrence conditions necessary for an ordinal scale?
   * Asymetry conditions: If x is prefered over y, can't y prefered to x (duh)
* Ideally rational agents
* Compliteness / make up your mind condition
   * For any items x, y, z (preferences), it has to have a preference ranking, either indiffernt or preferred
   * There are incomparable and doesn't mean indifferent
* Transitivity Conditions (4 things that just make logical sense)
* Can group preferences into indifference classes
* Any scale ordinally equivalent, has an ordinal transformation? (Eventually will need to learn about interval scale and ratio scale (has absolute zero like time or weight) are types of ordinal scales)
   * Quick brief overview: the gap matters unlike ordinal
   * interval scale transformation basically the gap stays the same
* Next time will need to figure out how to compare hard to compare preferences as intervals
* Decisions under ignorance Maximin:
   * Find the best worst case scenario
* Leximin (second next): If two levels are tied, go to the second lowest
* Maximax...
* Comprimise: optimist / pessimist (how to balance worst best case)

## Clarifications

- The symbol is ≻ (strict preference), ~ is indifference, and ≽ is weak preference ("at least as good as"). Yes, ~ means the agent values the two the same.
- A utility function represents a preference ordering when u(x) > u(y) exactly when x ≻ y, and u(x) = u(y) exactly when x ~ y.
- The three ordinal-scale conditions are completeness, asymmetry and transitivity. They are the axioms for an ordinal utility scale, not "conference" conditions.
  - Completeness: for any two outcomes x and y, either x ≽ y or y ≽ x. Nothing is incomparable.
  - Asymmetry: if x ≻ y then not y ≻ x.
  - Transitivity comes as four conditions, one per combination of ≻ and ~: if x ≻ y and y ≻ z then x ≻ z; if x ~ y and y ~ z then x ~ z; if x ≻ y and y ~ z then x ≻ z; if x ~ y and y ≻ z then x ≻ z.
- Incomparable is not the same as indifferent. Indifference is a definite ranking (equal value). Incomparability is having no ranking at all, which completeness forbids. Completeness is an idealisation; real people leave pairs unranked.
- Indifference classes: group together every outcome the agent is indifferent between, then the classes themselves are strictly ordered by ≻.
- Scale types, ranked by how much information they carry. Each stronger scale is also ordinal, but adds more.
  - Ordinal: only the order matters. Any strictly increasing transformation gives an equivalent scale.
  - Interval: the gaps matter too. Only positive linear transformations (u′ = a·u + b with a > 0) preserve it, so ratios of differences stay fixed. Temperature in °C or °F is the standard example.
  - Ratio: has a true zero, so ratios of values matter. Only u′ = a·u with a > 0 preserves it. Weight, length and durations are examples; clock time is only interval, since "zero o'clock" is arbitrary.
- The four rules for decisions under ignorance, as introduced so far:
  - Maximin: for each act find its worst outcome, then choose the act whose worst outcome is best.
  - Leximin: apply maximin; if two acts tie on their worst outcome, compare their second-worst, and so on.
  - Maximax: choose the act whose best outcome is best.
  - Optimism-pessimism (Hurwicz) rule: pick an optimism index α between 0 and 1 and score each act as α·(best outcome) + (1 − α)·(worst outcome). This is the "compromise" line. It needs an interval scale, since it adds and weights utilities.
- Your "no more information than the preference list" line is exactly right for maximin, leximin and maximax: they use only the ordinal ranking. The optimism-pessimism rule and the principle of insufficient reason need interval-scale utilities.
