// A question's evidence, merged from the two places it lives: the public history the quiz scripts publish
// (routines/quiz-state.json) and the review events synced between devices. An event the scripts have already imported
// carries the same event id in the public history, so it counts once. An undo hides its review in both places until
// the scripts import the undo too.

import { liveReviews, type Event } from './events'
import { cardState, type Attempt, type CardState } from './schedule'
import type { Grade } from './rubric'

/** One public history entry: [day, grade] or [day, grade, {conf, cause, event_id, session_id}]. */
export type PublicEntry = [string, string] | [string, string, { conf?: number; event_id?: string; [k: string]: unknown }]

export interface CardAttempt extends Attempt { id: string | null; source: 'public' | 'event' }

const isGrade = (g: string): g is Grade => g === 'O' || g === '~' || g === 'X'
const asConf = (c: unknown): 1 | 2 | 3 | undefined => (c === 1 || c === 2 || c === 3 ? c : undefined)

/** Every counted attempt at one question, oldest day first. */
export function attemptsFor(qid: string, publicHistory: PublicEntry[] | undefined, events: Event[]): CardAttempt[] {
  const undone = new Set(events.filter((e) => e.kind === 'undo').map((e) => (e as { target: string }).target))
  const out: CardAttempt[] = []
  const seen = new Set<string>()
  for (const e of publicHistory ?? []) {
    const meta = e.length > 2 ? (e as [string, string, Record<string, unknown>])[2] : undefined
    const id = typeof meta?.event_id === 'string' ? meta.event_id : null
    if (id) seen.add(id)
    if (id && undone.has(id)) continue
    if (isGrade(e[1])) out.push({ day: e[0], grade: e[1], conf: asConf(meta?.conf), id, source: 'public' })
  }
  for (const r of liveReviews(events)) {
    if (r.qid !== qid || r.grade === null || seen.has(r.id)) continue
    out.push({ day: r.day, grade: r.grade, conf: r.conf, id: r.id, source: 'event' })
  }
  return out.sort((a, b) => (a.day < b.day ? -1 : a.day > b.day ? 1 : 0))
}

/** The question's schedule from all its evidence; null when it was never answered. */
export function scheduleFor(qid: string, publicHistory: PublicEntry[] | undefined, events: Event[], exams: string[]): CardState | null {
  return cardState(attemptsFor(qid, publicHistory, events), exams)
}
