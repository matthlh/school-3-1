// The per-question schedule, a line-for-line port of card_state in .claude/skills/quiz-me/scripts/quizlib.py, so the
// site and the quiz scripts never disagree about a review date. `npm run test:website` replays every real history
// through both and fails on any difference. Keep the two in step: change one, change the other.
//
// The ladder (CLAUDE.md): X → streak 0, +1 day · ~ → streak unchanged, +3 days · O → streak + 1, +7 / +16 / +35 days.
// An O at confidence 1 or 2 is a Good: it holds its rung (at least 1) instead of climbing. A day's attempts count once,
// at that day's worst grade (Good if any O that day was at 1 or 2). Each Next is capped by the exam cap from that day.

import type { Grade } from './rubric'

export interface Attempt {
  /** The local day of the answer, YYYY-MM-DD. */
  day: string
  grade: Grade
  conf?: 1 | 2 | 3
}

export interface CardState { streak: number; gap: number; next: string }

const RANK: Record<Grade, number> = { X: 0, '~': 1, O: 2 }

export function gap(grade: Grade, streak: number): number {
  if (grade === 'O') return streak <= 1 ? 7 : streak === 2 ? 16 : 35
  return grade === '~' ? 3 : 1
}

export function nextAfter(grade: Grade, streak: number, good: boolean): [number, number] {
  if (good && grade === 'O') {
    const s = Math.max(streak, 1)
    return [s, gap('O', s)]
  }
  const s = grade === 'X' ? 0 : grade === 'O' ? streak + 1 : streak
  return [s, gap(grade, s)]
}

/** Calendar arithmetic on ISO days, in UTC so no time zone or DST shift can move a date. */
export function addDays(day: string, n: number): string {
  const t = Date.UTC(+day.slice(0, 4), +day.slice(5, 7) - 1, +day.slice(8, 10)) + n * 86400000
  return new Date(t).toISOString().slice(0, 10)
}

/**
 * quizlib.exam_cap from a row's covering exam dates (sorted ISO days, from review-plan.json): the first exam at least
 * two days after `day` sets the cap, CAP_DAYS (4) before it, or the day before it when that day is `day` or earlier.
 * null when no such exam covers the row.
 */
export function examCap(exams: string[], day: string): string | null {
  const from = addDays(day, 2)
  const e = exams.find((x) => x >= from)
  if (!e) return null
  const d = addDays(e, -4)
  return d > day ? d : addDays(e, -1)
}

/** card_state: the question's place on the ladder after these attempts (any order), or null when it has none. */
export function cardState(attempts: Attempt[], exams: string[]): CardState | null {
  const byDay = new Map<string, Attempt[]>()
  for (const a of attempts) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(a.day) || !(a.grade in RANK)) continue
    byDay.set(a.day, [...(byDay.get(a.day) ?? []), a])
  }
  let streak = 0
  let days = 1
  let next: string | null = null
  for (const day of [...byDay.keys()].sort()) {
    const day_ = byDay.get(day)!
    const g = day_.map((a) => a.grade).reduce((w, x) => (RANK[x] < RANK[w] ? x : w))
    const good = g === 'O' && day_.some((a) => a.conf === 1 || a.conf === 2)
    ;[streak, days] = nextAfter(g, streak, good)
    next = addDays(day, days)
    const cap = examCap(exams, day)
    if (cap && next > cap) next = cap
  }
  return next ? { streak, gap: days, next } : null
}
