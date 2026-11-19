import type { QuizState } from './files'
import type { Deadline, Question, TopicRow } from './markdown'
import type { Event } from './review/events'
import { attemptsFor, type PublicEntry } from './review/progress'
import type { ReviewPlan } from './review/state'
import { loCodes, matchTopic } from './stats'

export const examName = (exam: Deadline) => /^\*\*(.+?)\*\*/.exec(exam.rawWhat)?.[1].split(/\s+[—(]/)[0] ?? exam.what

export function examTopics(plan: ReviewPlan | null, code: string, date: string): ReadonlySet<string> {
  const prefix = code + '|'
  return new Set(Object.entries(plan?.rows ?? {})
    .filter(([key, dates]) => key.startsWith(prefix) && dates.includes(date))
    .map(([key]) => key.slice(prefix.length)))
}

/** Rank only topics with actual wrong or partial answers, including grades just saved on this device. */
export function weakExamTopics(code: string, rows: TopicRow[], scope: ReadonlySet<string>, questions: Question[], quiz: QuizState | null, events: Event[]) {
  const totals = new Map<string, { topic: string; missed: number; shaky: number }>()
  for (const q of questions) {
    if (!q.stamp) continue
    const history = quiz?.questions[q.stamp]?.history as PublicEntry[] | undefined
    const tries = attemptsFor(q.stamp, history, events)
    const grade = tries[tries.length - 1]?.grade
    if (grade !== 'X' && grade !== '~') continue
    const matches = matchTopic(code, q.topic, loCodes(q.topic), rows)
    if (matches.length !== 1 || !scope.has(matches[0].topic)) continue
    const { topic } = matches[0]
    const count = totals.get(topic) ?? { topic, missed: 0, shaky: 0 }
    if (grade === 'X') count.missed++
    else count.shaky++
    totals.set(topic, count)
  }
  return [...totals.values()].sort((a, b) => b.missed - a.missed || b.shaky - a.shaky || a.topic.localeCompare(b.topic))
}
