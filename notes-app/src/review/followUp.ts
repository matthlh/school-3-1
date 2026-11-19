import type { QuizState } from '../files'
import type { Question } from '../markdown'
import { questionTerms, type Source } from '../sources'
import { normQuestion } from '../stats'
import type { Event } from './events'
import type { ReviewPlan, ReviewSession } from './state'
import type { Rubric } from './rubric'

interface PracticeCard {
  qid: string
  course: string
  section: string
  q: Question
  rubric: Rubric | null
  src: Source | null
}

export function followUp<T extends PracticeCard>(current: T, cards: Iterable<T>, session: ReviewSession,
  plan: ReviewPlan | null, quiz: QuizState | null, events: Event[]): T | null {
  const seen = new Set(session.qids.slice(0, session.at + 1))
  for (const event of events) if (event.kind === 'review') seen.add(event.qid)
  const topic = (card: T) => plan?.cards[card.qid] ?? normQuestion(card.q.topic)
  const target = topic(current)
  if (!target) return null
  const evidence = questionTerms(current.q)
  const stem = normQuestion(current.q.display.split('\n', 1)[0])
  let best: T | null = null
  let bestScore = -1
  for (const card of cards) {
    if (card.course !== current.course || !card.rubric || card.section === 'long-problems' || topic(card) !== target) continue
    if (seen.has(card.qid) || quiz?.questions[card.qid]?.history.length || session.cards[card.qid]?.shownAt != null) continue
    if (normQuestion(card.q.display.split('\n', 1)[0]) === stem) continue
    let score = current.src?.anchor && current.src.path === card.src?.path && current.src.anchor === card.src.anchor ? 4 : 0
    for (const word of questionTerms(card.q)) if (evidence.has(word)) score++
    if (score > bestScore) { best = card; bestScore = score }
  }
  return best
}

/** Promote an upcoming card or insert a new one while keeping the rest of the session in order. */
export const moveNext = (qids: string[], at: number, qid: string) =>
  [...qids.slice(0, at), qid, ...qids.slice(at).filter(id => id !== qid)]
