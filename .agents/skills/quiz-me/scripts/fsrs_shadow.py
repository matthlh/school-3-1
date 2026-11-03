#!/usr/bin/env python3
"""Shadow trial: would FSRS have predicted his misses better than the ladder? Read-only, writes nothing.

Usage:
  fsrs_shadow.py [--since YYYY-MM-DD]

  default      replay routines/quiz-state.json and print each predictor's log loss and RMSE, a 5-bin
               calibration table, then one verdict line, always last (the Sunday weekly brief quotes it)
  --since      score only reviews dated on or after this day; earlier ones still build FSRS's memory
               state and the baseline's counts

The trial (from 2026-10-06, 3–4 weeks): FSRS runs silently on his history while the ladder keeps
scheduling. Matt adopts FSRS only if it predicts his misses better than the ladder does.

FSRS version: FSRS-6, the newest on the official wiki page "The Algorithm"
(github.com/open-spaced-repetition/awesome-fsrs/wiki/The-Algorithm), with its 21 default parameters (W below).
The clamps the wiki leaves out (difficulty in [1, 10], stability at least 0.001, post-lapse stability at most
S / e^(w17·w18), no same-day shrink on a pass) follow py-fsrs 6.3.2 (fsrs/scheduler.py), which matches the
released fsrs-rs 6.6.2 that Anki uses. Cross-checked against py-fsrs 6.3.2 on 2026-10-06: 2,000 random
histories with same-day repeats plus the real one, 12,014 predictions, largest difference in R 2.2e-16
(in S 4.6e-15 relative, in D 1.8e-15).
FSRS-7 exists only on fsrs-rs main and in srs-benchmark, with no published formulas; its change, fractional
intervals, needs review times, and this history has dates.

Replay, per question in date order: X → Again, ~ → Hard, O → Good (Easy never occurs). The first review sets
the memory state. Each later review is scored with R, FSRS's chance of recall after the whole days since the
previous review, before its grade updates the state. A repeat on the same day goes through FSRS's same-day
formula but is not scored: R is 1 by construction, and the FSRS benchmark leaves those out too.

Outcome: O and ~ count as recalled (1), X as forgotten (0). ~ maps to Hard, which FSRS treats as a pass
(R is the chance of anything but Again), and a miss in CLAUDE.md is X alone.

Ladder baseline, fit only on spaced reviews from earlier days (a day's reviews are all predicted before any counts):
the recall rate within the review's ladder state, last grade plus streak bucket (X0, ~0 to ~3+, O1, O2, O3+; the
ledger keeps streaks per topic, so this replays one per question with quizlib.next_after), plus 2 pseudo-reviews at
the overall rate: (recalled + 2 × overall) / (reviews + 2), where overall is (recalled + 1) / (reviews + 2) over every
earlier spaced review, Laplace's rule, so 0.5 before any data. It stands in for the ladder, which sets intervals but
gives no probabilities.

Scores: log loss (lower is better; always guessing 50% gives 0.693) and RMSE, the square root of the mean of
(p − outcome)², which is the root Brier score, not the benchmark's binned RMSE. Calibration: 5 equal-width
bins of predicted chance, each with its count, mean prediction and actual recall rate.

Verdict: FSRS against the ladder baseline on log loss, from the per-review differences. Decided once
MIN_REVIEWS are scored and the mean difference is at least twice its standard error. Until then it estimates
the reviews needed as (2 × sd / mean difference)², rounded, the count at which today's gap and spread would reach
two standard errors. Reviews of one question are correlated, so the standard error is optimistic.
"""
import argparse, datetime as dt, json, math, os, sys
from itertools import groupby

sys.dont_write_bytecode = True                 # read-only means no __pycache__ for quizlib either
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import quizlib as L

# FSRS-6 default parameters w0…w20: the wiki's list = py-fsrs 6.3.2 = fsrs-rs 6.6.2 DEFAULT_PARAMETERS.
W = (0.212, 1.2931, 2.3065, 8.2956, 6.4133, 0.8334, 3.0194, 0.001, 1.8722, 0.1666, 0.796,
     1.4835, 0.0614, 0.2629, 1.6483, 0.6014, 1.8729, 0.5425, 0.0912, 0.0658, 0.1542)
DECAY = -W[20]
FACTOR = 0.9 ** (1 / DECAY) - 1                # puts R at 0.9 when t = S
S_MIN, D_MIN, D_MAX = 0.001, 1.0, 10.0
RATING = {"X": 1, "~": 2, "O": 3}              # Again, Hard, Good
RECALLED = {"X": 0, "~": 1, "O": 1}            # ~ is a pass, as Hard is to FSRS
MIN_REVIEWS = 30                               # below this many scored reviews: no verdict and no estimate
BINS = 5
PREDICTORS = (("fsrs", "FSRS-6"), ("ladder", "Ladder state"))

# ---- FSRS-6 ----------------------------------------------------------------------------------

def retrievability(t, s):
    """The forgetting curve: chance of recall t days after the review that left stability s."""
    return (1 + FACTOR * t / s) ** DECAY

def init_difficulty(g):
    return W[4] - math.exp(W[5] * (g - 1)) + 1

def first_state(g):
    """(stability, difficulty) after a question's first review, graded g."""
    return max(W[g - 1], S_MIN), min(max(init_difficulty(g), D_MIN), D_MAX)

def next_state(s, d, t, g):
    """(stability, difficulty) after a review graded g, t whole days after the review that left (s, d)."""
    if t == 0:                                 # same day: short-term formula, never shrinks on a pass
        sinc = math.exp(W[17] * (g - 3 + W[18])) * s ** -W[19]
        s2 = s * (max(sinc, 1.0) if g > 1 else sinc)
    elif g == 1:                               # forgot: post-lapse stability, kept just under the old one
        r = retrievability(t, s)
        s2 = min(W[11] * d ** -W[12] * ((s + 1) ** W[13] - 1) * math.exp((1 - r) * W[14]),
                 s / math.exp(W[17] * W[18]))
    else:                                      # recalled; Hard grows it less (w15)
        r = retrievability(t, s)
        s2 = s * (1 + math.exp(W[8]) * (11 - d) * s ** -W[9] * (math.exp((1 - r) * W[10]) - 1)
                  * (W[15] if g == 2 else 1))
    d2 = d - W[6] * (g - 3) * (10 - d) / 9                   # linear damping
    d2 = W[7] * init_difficulty(4) + (1 - W[7]) * d2         # mean reversion toward D0(Easy)
    return max(s2, S_MIN), min(max(d2, D_MIN), D_MAX)

# ---- history ---------------------------------------------------------------------------------

def load_history():
    """{question id: [(date, grade), …] in date order} from routines/quiz-state.json. Exits when the file is
    missing or malformed. Entries are [date, grade, …]; anything past the grade is ignored."""
    rel = os.path.relpath(L.STATE, L.ROOT)
    if not os.path.exists(L.STATE):
        raise SystemExit(f"no quiz history: {rel} does not exist (quiz_grade.py writes it)")
    with open(L.STATE, encoding="utf-8") as f:
        try:
            state = json.load(f)
        except json.JSONDecodeError as e:
            raise SystemExit(f"{rel} is not valid JSON: {e}")
    questions = state.get("questions") if isinstance(state, dict) else None
    if not isinstance(questions, dict):
        raise SystemExit(f"{rel} has no 'questions' object")
    out = {}
    for qid, rec in questions.items():
        hist = rec.get("history") if isinstance(rec, dict) else None
        if not isinstance(hist, list):
            raise SystemExit(f"{rel}: question {qid} has no 'history' list")
        rows = []
        for i, e in enumerate(hist, 1):
            ok = isinstance(e, list) and len(e) >= 2 and isinstance(e[0], str) and L.parse_date(e[0]) and e[1] in L.GRADES
            if not ok:
                raise SystemExit(f"{rel}: question {qid}, history entry {i} is {json.dumps(e)}; want [\"YYYY-MM-DD\", \"O\" | \"~\" | \"X\", …]")
            rows.append((L.parse_date(e[0]), e[1]))
        out[qid] = sorted(rows, key=lambda r: r[0])   # stable: same-day entries keep their order
    return out

def replay(history):
    """One event per review. kind: 'first' (sets the state, nothing to predict), 'same-day' (replayed, not scored)
    or 'spaced' (scored). A spaced review carries fsrs = R before its grade and its ladder state before it."""
    events = []
    for hist in history.values():
        s = d = prev = last = None
        streak = 0
        for date, g in hist:
            e = dict(date=date, y=RECALLED[g], kind="first")
            if prev is None:
                s, d = first_state(RATING[g])
            else:
                t = (date - prev).days
                if t > 0:
                    e.update(kind="spaced", fsrs=retrievability(t, s), state=f"{last}{streak if streak < 3 else '3+'}")
                else:
                    e["kind"] = "same-day"
                s, d = next_state(s, d, t, RATING[g])
            streak, _ = L.next_after(g, streak)
            prev, last = date, g
            events.append(e)
    return events

def fit_baseline(events):
    """Sort events by date and give every spaced review its ladder-state prediction, counted from the spaced reviews
    of earlier days only, with 2 pseudo-reviews at the overall rate of those days."""
    events.sort(key=lambda e: e["date"])
    k = n = 0
    ks, ns = {}, {}
    for _, day in groupby(events, key=lambda e: e["date"]):
        day = [e for e in day if e["kind"] == "spaced"]
        p = (k + 1) / (n + 2)
        for e in day:
            e["ladder"] = (ks.get(e["state"], 0) + 2 * p) / (ns.get(e["state"], 0) + 2)
        for e in day:
            k, n = k + e["y"], n + 1
            ks[e["state"]] = ks.get(e["state"], 0) + e["y"]
            ns[e["state"]] = ns.get(e["state"], 0) + 1

# ---- scores ----------------------------------------------------------------------------------

def nll(p, y):
    return -math.log(p if y else 1 - p)

def log_loss(ps, ys):
    return sum(nll(p, y) for p, y in zip(ps, ys)) / len(ys) if ys else None

def rmse(ps, ys):
    return math.sqrt(sum((p - y) ** 2 for p, y in zip(ps, ys)) / len(ys)) if ys else None

def calibration(ps, ys):
    """BINS equal-width bins of predicted chance: lo, hi, n, mean prediction, actual recall rate (None when empty)."""
    bins = [[] for _ in range(BINS)]
    for p, y in zip(ps, ys):
        bins[min(int(p * BINS), BINS - 1)].append((p, y))
    return [dict(lo=i / BINS, hi=(i + 1) / BINS, n=len(b),
                 predicted=sum(p for p, _ in b) / len(b) if b else None,
                 actual=sum(y for _, y in b) / len(b) if b else None) for i, b in enumerate(bins)]

def paired_gap(scored):
    """Per-review log-loss advantage of FSRS over the ladder baseline (> 0 = FSRS better): mean, sd, its standard
    error, and the reviews at which this gap would reach two standard errors, rounded (None with no gap)."""
    n = len(scored)
    if n < 2:
        return None
    diffs = [nll(e["ladder"], e["y"]) - nll(e["fsrs"], e["y"]) for e in scored]
    mean = sum(diffs) / n
    sd = math.sqrt(sum((x - mean) ** 2 for x in diffs) / (n - 1))
    return dict(mean=mean, sd=sd, se=sd / math.sqrt(n), needed=round((2 * sd / mean) ** 2) if mean else None)

def count(k, noun):
    return f"{k} {noun}{'' if k == 1 else 's'}"

def verdict(n, preds, gap):
    """The one line for the weekly brief: FSRS against the ladder baseline on log loss."""
    if n < MIN_REVIEWS:
        so_far = (f" (log loss so far: FSRS {preds['fsrs']['log_loss']:.2f}, ladder {preds['ladder']['log_loss']:.2f})"
                  if n else "")
        return f"Not decided yet: {count(n, 'review')} scored, at least {MIN_REVIEWS} needed{so_far}"
    mean, se = gap["mean"], gap["se"]
    if mean and abs(mean) >= 2 * se:
        if mean > 0:
            return f"FSRS beats the ladder baseline by {mean:.3f} ± {se:.3f} log loss on {n} reviews"
        return f"The ladder baseline beats FSRS by {-mean:.3f} ± {se:.3f} log loss on {n} reviews: keep the ladder"
    if not mean:
        return f"Not decided yet: {n} reviews scored, FSRS and the ladder baseline are level"
    need = max(n + 1, gap["needed"])
    lead = "FSRS" if mean > 0 else "the ladder baseline"
    return f"Not decided yet: {n} reviews scored, about {need} needed ({lead} ahead by {abs(mean):.3f} ± {se:.3f} log loss)"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--since", type=dt.date.fromisoformat, help="score only reviews on or after this date (YYYY-MM-DD)")
    a = ap.parse_args()

    history = load_history()
    events = replay(history)
    fit_baseline(events)
    spaced = [e for e in events if e["kind"] == "spaced"]
    scored = [e for e in spaced if not a.since or e["date"] >= a.since]
    ys = [e["y"] for e in scored]
    preds = {}
    for key, _ in PREDICTORS:
        ps = [e[key] for e in scored]
        preds[key] = dict(log_loss=log_loss(ps, ys), rmse=rmse(ps, ys), calibration=calibration(ps, ys))
    gap = paired_gap(scored)
    line = verdict(len(scored), preds, gap)
    skipped = dict(first=sum(e["kind"] == "first" for e in events), same_day=sum(e["kind"] == "same-day" for e in events),
                   before_since=len(spaced) - len(scored))

    print(f"== FSRS SHADOW TRIAL for {L.today_local():%a %Y-%m-%d} · FSRS-6 default parameters vs the ladder · read-only")
    span = f", {events[0]['date']:%b %-d} → {events[-1]['date']:%b %-d}" if events else ""
    print(f"-- History: {count(len(events), 'review')} of {count(len(history), 'question')}{span}")
    window = f" from {a.since:%b %-d}" if a.since else ""
    print(f"-- Scored: {count(len(scored), 'review')}{window} · not scored: {count(skipped['first'], 'first review')}, "
          f"{count(skipped['same_day'], 'same-day repeat')}" + (f", {skipped['before_since']} before {a.since:%b %-d}" if a.since else ""))
    if scored:
        print("-- Predictor      log loss    RMSE   (O and ~ = recalled; always guessing 50% scores 0.693 and 0.500)")
        for key, name in PREDICTORS:
            print(f"   {name:<14} {preds[key]['log_loss']:8.3f} {preds[key]['rmse']:7.3f}")
        print("-- Calibration: n · mean predicted → actual recall, by bin of predicted chance")
        print("   chance     " + "".join(f"{name:<21}" for _, name in PREDICTORS).rstrip())
        for i in range(BINS):
            cells = []
            for key, _ in PREDICTORS:
                b = preds[key]["calibration"][i]
                cells.append(f"{b['n']} · {b['predicted']:.2f} → {b['actual']:.2f}" if b["n"] else "—")
            print(f"   {i / BINS:.1f}–{(i + 1) / BINS:.1f}    " + "".join(f"{c:<21}" for c in cells).rstrip())
    print(f"-- Verdict · {line}")

if __name__ == "__main__":
    main()
