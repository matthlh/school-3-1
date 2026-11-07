// Review events: what the website records, one immutable record per action, so two devices can never overwrite each
// other's evidence. A grade is a `review` event; taking one back is an `undo` event naming it (nothing is deleted).
// The quiz scripts import them (sync_pull.py) into routines/quiz-state.json under the same event id, so an event that
// has reached the public history is never counted twice.

import type { Grade, RubricKind } from './rubric'

export interface ReviewEvent {
  v: 1
  kind: 'review'
  /** Unique per event: retries and re-syncs never record it twice. */
  id: string
  /** The review session it belongs to. */
  session: string
  /** When it was recorded (ISO time) and the local day it counts for (YYYY-MM-DD). */
  at: string
  day: string
  device: string
  /** The question's permanent id, and its course. */
  qid: string
  course: string
  /** null: not graded (he flagged the question as wrong or unclear). */
  grade: Grade | null
  conf: 1 | 2 | 3
  /** Which key points his answer had, in the key's order. */
  ticks: boolean[]
  rubric: RubricKind
  /** Fingerprints of the stem and the answer key he was graded against (rubric.fingerprint). */
  qhash: string
  khash: string
  /** What he wrote, if anything. Private: it goes to the private repo and quiz-private.json only. */
  attempt?: string
  /** He opened the notes page or asked for help before grading. */
  assisted?: boolean
  /** Seconds from showing the question to revealing the key. */
  secs?: number
}

export interface UndoEvent {
  v: 1
  kind: 'undo'
  id: string
  at: string
  day: string
  device: string
  /** The review event it takes back. */
  target: string
}

export type Event = ReviewEvent | UndoEvent

export function isEvent(x: unknown): x is Event {
  if (!x || typeof x !== 'object') return false
  const e = x as Record<string, unknown>
  if (e.v !== 1 || typeof e.id !== 'string' || typeof e.at !== 'string' || typeof e.day !== 'string') return false
  if (e.kind === 'undo') return typeof e.target === 'string'
  return e.kind === 'review' && typeof e.qid === 'string' && typeof e.course === 'string' && Array.isArray(e.ticks)
    && (e.grade === null || e.grade === 'O' || e.grade === '~' || e.grade === 'X') && [1, 2, 3].includes(e.conf as number)
}

/** The review events that still count: every review not taken back by an undo, oldest first. */
export function liveReviews(events: Iterable<Event>): ReviewEvent[] {
  const all = [...events]
  const undone = new Set(all.filter((e): e is UndoEvent => e.kind === 'undo').map((e) => e.target))
  return all.filter((e): e is ReviewEvent => e.kind === 'review' && !undone.has(e.id))
    .sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : a.id < b.id ? -1 : 1))
}

/** A random id: 16 hex characters from the platform's random source. */
export function newId(): string {
  const b = new Uint8Array(8)
  crypto.getRandomValues(b)
  return [...b].map((x) => x.toString(16).padStart(2, '0')).join('')
}

/** Today's local date, YYYY-MM-DD. */
export function localDay(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
