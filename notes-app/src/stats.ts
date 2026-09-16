import type { QuizHistory } from './files'
import type { Grade, TopicRow } from './markdown'

export interface Tally { solid: number; shaky: number; missed: number; unquizzed: number; due: number; total: number }
export const EMPTY: Tally = { solid: 0, shaky: 0, missed: 0, unquizzed: 0, due: 0, total: 0 }

const pad = (n: number) => String(n).padStart(2, '0')
export function todayISO(): string {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function bump(t: Tally, g: Grade | null) {
  if (g === 'O') t.solid++
  else if (g === '~') t.shaky++
  else if (g === 'X') t.missed++
  else t.unquizzed++
  t.total++
}

/** Per-topic tally from ledger rows (the unit the spacing ladder works on). */
export function tallyTopics(rows: TopicRow[], today = todayISO()): Tally {
  const t: Tally = { ...EMPTY }
  for (const r of rows) { bump(t, r.grade); if (r.next && r.next <= today) t.due++ }
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

// ---- dates ----------------------------------------------------------------------------------

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2026-09-16" → "Wed Sep 16". Anything that is not an ISO date comes back unchanged. */
export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim())
  if (!m) return iso
  const d = new Date(+m[1], +m[2] - 1, +m[3])
  return `${DOW[d.getDay()]} ${MON[d.getMonth()]} ${d.getDate()}`
}

/** Whole days from ISO date `a` to ISO date `b` (positive when `b` is later). */
export function daysBetween(a: string, b: string): number {
  return Math.round((new Date(b + 'T12:00:00').getTime() - new Date(a + 'T12:00:00').getTime()) / 86400000)
}
