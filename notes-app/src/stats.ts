import type { QuizHistory } from './files'
import type { Grade, TopicRow } from './markdown'

/** Topics or questions by last grade. How many are due is the Due now block's to say (useDue in DueNow.tsx), not a tally's. */
export interface Tally { solid: number; shaky: number; missed: number; unquizzed: number; total: number }
export const EMPTY: Tally = { solid: 0, shaky: 0, missed: 0, unquizzed: 0, total: 0 }

function bump(t: Tally, g: Grade | null) {
  if (g === 'O') t.solid++
  else if (g === '~') t.shaky++
  else if (g === 'X') t.missed++
  else t.unquizzed++
  t.total++
}

/** Per-topic tally from ledger rows (the unit the spacing ladder works on). */
function tallyTopics(rows: TopicRow[]): Tally {
  const t: Tally = { ...EMPTY }
  for (const r of rows) bump(t, r.grade)
  return t
}

export function tallyByCourse(rows: TopicRow[]): Record<string, Tally> {
  const by: Record<string, TopicRow[]> = {}
  for (const r of rows) (by[r.course] ??= []).push(r)
  return Object.fromEntries(Object.entries(by).map(([c, rs]) => [c, tallyTopics(rs)]))
}

/** Share of graded topics that are solid; null until something has been graded. */
export function pctSolid(t: Tally): number | null {
  const graded = t.solid + t.shaky + t.missed
  return graded ? Math.round((100 * t.solid) / graded) : null
}

// ---- per-question history -----------------------------------------------------------------

export function lastGrade(h: QuizHistory | undefined): Grade | null {
  const g = h?.history[h.history.length - 1]?.[1]
  return g === 'X' || g === '~' || g === 'O' ? g : null
}

export const isWeak = (h: QuizHistory | undefined) => { const g = lastGrade(h); return g === 'X' || g === '~' }

export function tallyHistories(hs: QuizHistory[]): Tally {
  const t: Tally = { ...EMPTY }
  for (const h of hs) bump(t, lastGrade(h))
  return t
}

/** Answers given at one confidence (1 guess, 2 think so, 3 sure) and how many of them were graded O. */
export interface ConfLevel { conf: 1 | 2 | 3; answers: number; solid: number }
export interface CourseCalibration { course: string; levels: ConfLevel[] }

/** Per course, every history entry that carries a confidence, counted by level. A course with none is left out, so the
 *  list stays empty until grades come with a confidence. */
export function calibrationByCourse(hs: QuizHistory[]): CourseCalibration[] {
  const by = new Map<string, ConfLevel[]>()
  for (const h of hs) {
    for (const e of h.history) {
      const conf = e.length === 3 ? e[2].conf : undefined
      if (!conf) continue
      let levels = by.get(h.course)
      if (!levels) { levels = ([1, 2, 3] as const).map((c) => ({ conf: c, answers: 0, solid: 0 })); by.set(h.course, levels) }
      levels[conf - 1].answers++
      if (e[1] === 'O') levels[conf - 1].solid++
    }
  }
  return [...by].sort(([a], [b]) => a.localeCompare(b)).map(([course, levels]) => ({ course, levels }))
}

/** Mirror of quizlib.norm(): what the quiz scripts hash to identify a question. */
export function normQuestion(s: string): string {
  return s.toLowerCase()
    .replace(/\*+|\(.*?\)/g, ' ')
    .replace(/[–—\-/·:,;.!?"'’“”]/g, ' ')
    .replace(/[^a-z0-9+ ]/g, ' ')
    .replace(/\s+/g, ' ').trim()
}

/** sha1(`${course}|${norm(question)}`)[:8] — same id the quiz scripts store. */
export async function questionId(course: string, question: string): Promise<string> {
  try {
    const data = new TextEncoder().encode(`${course}|${normQuestion(question)}`)
    const buf = await crypto.subtle.digest('SHA-1', data)
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 8)
  } catch { return '' }
}
