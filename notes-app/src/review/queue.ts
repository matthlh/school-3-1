// Which cards the Review page asks now: the plan's queue checked against every grade saved since, on any device.

import { liveReviews, localDay, type Event } from './events'
import { scheduleFor, type PublicEntry } from './progress'
import type { ReviewPlan } from './state'

/** What dueToday needs to know of each card and of the public history. */
export interface CardInfo { course: string }
export interface PublicHistory { questions: Record<string, { history: unknown[] } | undefined> }

/**
 * The cards to ask now, due ones first, and how many are due (the rest are new). The plan's queue is the base. A card
 * with a grade saved on any device is kept only while its own schedule, public history and synced grades merged, says
 * it is due today, so a grade the laptop has not imported yet is never asked again and a miss still comes back the
 * next day. A plan older than today also gains the asked cards of its live topics whose date has come since.
 */
export function dueToday(plan: ReviewPlan | null, cards: Map<string, CardInfo>, events: Event[], course: string | null,
  quiz: PublicHistory | null, today = localDay()) {
  if (!plan) return Object.assign([] as string[], { due: 0 })
  const graded = new Set(liveReviews(events).filter((r) => r.grade !== null).map((r) => r.qid))
  const hist = (id: string) => quiz?.questions[id]?.history as PublicEntry[] | undefined
  const next = (id: string) => scheduleFor(id, hist(id), events, plan.rows[plan.cards[id]] ?? [])?.next ?? null
  const ok = (id: string) => cards.has(id) && (!course || cards.get(id)!.course === course)
  const still = (id: string) => { if (!graded.has(id)) return true; const n = next(id); return n === null || n <= today }
  const queued = new Set(plan.queue)
  const due = plan.queue.slice(0, plan.due).filter((id) => ok(id) && still(id))
  const late: string[] = []
  if (plan.as_of < today) {
    for (const id of Object.keys(plan.cards)) {
      if (queued.has(id) || !ok(id) || (!hist(id)?.length && !graded.has(id))) continue
      const n = next(id)
      if (n !== null && n <= today) late.push(id)
    }
  }
  const fresh = plan.queue.slice(plan.due).filter((id) => ok(id) && still(id))
  return Object.assign([...due, ...late, ...fresh], { due: due.length + late.length })
}

