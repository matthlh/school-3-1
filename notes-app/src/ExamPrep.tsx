import { useMemo } from 'react'
import type { Loaded } from './files'
import { hrefFor, PHIL385_EXAM_4_MOCK } from './files'
import { courseLabel, NOT_STUDIED, parseQuestions, splitTopic, type Deadline, type TopicRow } from './markdown'
import { hrefAnchor, hrefExamBank, hrefTopic } from './routes'
import { formatDate } from './dates'
import { ReadinessList, type Due } from './DueNow'
import { useEvents, type ReviewPlan } from './review/state'
import { usePager } from './Pager'
import { Md } from './Md'
import { examName, examTopics, weakExamTopics } from './examScope'

const MATERIALS: Record<string, { summary: string; mock?: string; scope?: string }> = {
  'PHIL385|Exam 1': { summary: 'courses/PHIL385/05-exam-review.md' },
  'PHIL385|Exam 4': {
    summary: 'courses/PHIL385/07-exam-4-summary.md', mock: PHIL385_EXAM_4_MOCK,
    scope: 'Lectures 18–23 and both of Judge William’s letters in Either/Or, The Aesthetic Validity of Marriage and Equilibrium.',
  },
  'CPSC310|Midterm': { summary: 'courses/CPSC310/05-exam-review.md' },
  'STAT251|Midterm': { summary: 'courses/STAT251/lectures/20-midterm-exam-review.md' },
}

export function ExamPrep({ exam, loaded, topics, due, plan }: {
  exam: Deadline; loaded: Loaded; topics: TopicRow[]; due: Due; plan: ReviewPlan | null
}) {
  const { course, date, time, approx, weight, rawWhat } = exam
  const name = examName(exam)
  const syllabus = `courses/${course}/00-syllabus.md`
  const bank = loaded.texts[`courses/${course}/02-questions.md`]
  const material = MATERIALS[`${course}|${name}`]
  const scope = useMemo(() => examTopics(plan, course, date), [plan, course, date])
  const inScope = useMemo(() => topics.filter(r => r.course === course && scope.has(r.topic)), [topics, course, scope])
  const events = useEvents()
  const weakest = useMemo(() => weakExamTopics(course, topics, scope,
    parseQuestions(bank ?? '').flatMap(group => group.questions), loaded.quiz, events).slice(0, 5),
  [course, topics, scope, bank, loaded.quiz, events])
  const { rows, pager } = usePager(inScope)
  const readiness = due.ok ? due.block.readiness.filter(r => r.course === course &&
    (r.exam === name || r.exam.startsWith(name + ' '))) : []
  const details = rawWhat.replace(/^\*\*[^*]+\*\*\s*[,—]?\s*/, '')

  return (
    <article className="exam-prep">
      <h1>{courseLabel(course)} {name} prep</h1>
      <p className="muted">{[approx ? 'Around ' + formatDate(date) : formatDate(date), time, weight && weight + ' of course grade'].filter(Boolean).join(' · ')}</p>
      {material?.scope && <p>{material.scope}</p>}
      {details && <Md text={details} />}
      <div className="row resource-links">
        {bank && scope.size > 0 && <a className="btn primary" href={hrefExamBank(course, date)}>Practice in-scope questions</a>}
        {material?.summary && loaded.texts[material.summary] && <a className="btn" href={hrefFor(material.summary)}>Exam summary</a>}
        {material?.mock && loaded.texts[material.mock] && <a className="btn" href={hrefFor(material.mock)}>Take the mock</a>}
        {loaded.texts[syllabus] && <a className="btn" href={hrefAnchor(syllabus, 'exam-format')}>Exam format</a>}
      </div>
      {readiness.length > 0 && <ReadinessList rows={readiness} />}
      <h2>Missed and shaky topics</h2>
      {weakest.length ? (
        <ul className="exam-topic-list">
          {weakest.map(({ topic, missed, shaky }) => (
            <li key={topic}>
              <a href={hrefTopic(course, topic)}>{splitTopic(topic).main}</a>{' '}
              <span className="muted small">{[missed && `${missed} missed`, shaky && `${shaky} shaky`].filter(Boolean).join(' · ')}</span>
            </li>
          ))}
        </ul>
      ) : <p className="muted">Missed and shaky topics appear here as you practice.</p>}
      <h2>Exam scope{inScope.length > 0 && <span className="muted light"> · {inScope.length} topics</span>}</h2>
      {rows.length ? (
        <>
          <ul className="exam-topic-list">
            {rows.map(r => (
              <li key={r.topic}>
                <a href={hrefTopic(course, r.topic)}>{splitTopic(r.topic).main}</a>
                {r.next === NOT_STUDIED && <span className="muted small"> · Not studied yet</span>}
              </li>
            ))}
          </ul>
          {pager}
        </>
      ) : <p className="muted">The topic list appears after the study plan is published.</p>}
    </article>
  )
}
