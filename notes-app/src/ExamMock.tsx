import { useEffect, useMemo, useRef, useState } from 'react'
import { parseQuestions, splitSections } from './markdown'
import { Md } from './Md'
import { parseRubric } from './review/rubric'

function parseMock(text: string) {
  return parseQuestions(text).flatMap(group => group.questions).map(question => {
    const [stem, ...lines] = question.display.split('\n')
    const choices = lines.flatMap(line => {
      const match = /^- \(([a-d])\) (.+)$/.exec(line)
      return match ? [{ letter: match[1], text: match[2] }] : []
    })
    const rubric = parseRubric(question.answer)
    const key = /^\(([a-d])\)\s+(.+)$/.exec(rubric?.points[0] ?? '')
    if (!key || rubric?.kind !== 'Key' || rubric.points.length !== 1 ||
        choices.map(choice => choice.letter).join('') !== 'abcd') return null
    return { id: question.id, stem, choices, correct: key[1], key: key[2], explanation: rubric.rest }
  })
}

export function ExamMock({ path, text }: { path: string; text: string }) {
  const parsed = useMemo(() => parseMock(text), [text])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [finished, setFinished] = useState(false)
  const page = useRef<HTMLElement>(null)
  const result = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (finished) result.current?.focus()
  }, [finished])

  if (!parsed.length || parsed.some(question => question === null)) {
    return <article><h1>Exam mock</h1><p>The questions could not be loaded.</p></article>
  }
  const questions = parsed.filter(question => question !== null)
  const answered = questions.filter(question => answers[question.id]).length
  const score = questions.filter(question => answers[question.id] === question.correct).length

  return (
    <article className="exam-mock" ref={page} tabIndex={-1}>
      <Md text={splitSections(text)[0].body} path={path} />
      {finished && (
        <div className="panel">
          <h2 ref={result} tabIndex={-1} className="mock-score">Score {score} of {questions.length}</h2>
          <button type="button" className="btn" onClick={() => {
            setAnswers({})
            setFinished(false)
            page.current?.focus()
          }}>Try again</button>
        </div>
      )}
      <form onSubmit={(event) => {
        event.preventDefault()
        if (answered === questions.length) setFinished(true)
      }}>
        {questions.map((question, i) => (
          <fieldset key={question.id} className="mock-question" disabled={finished}>
            <legend>{i + 1}. {question.stem}</legend>
            {question.choices.map(choice => (
              <label key={choice.letter} className="mock-choice">
                <input type="radio" name={question.id} value={choice.letter}
                  checked={answers[question.id] === choice.letter}
                  onChange={() => setAnswers(previous => ({ ...previous, [question.id]: choice.letter }))} />
                <span>{choice.letter.toUpperCase()}. {choice.text}</span>
              </label>
            ))}
            {finished && (
              <div className="mock-feedback">
                <p><strong>{answers[question.id] === question.correct ? 'Correct.' : 'Incorrect.'}</strong> {question.correct.toUpperCase()}. {question.key}</p>
                <Md text={question.explanation} path={path} />
              </div>
            )}
          </fieldset>
        ))}
        {!finished && (
          <div className="row">
            <span className="muted small" aria-live="polite">{answered} of {questions.length} answered</span>
            <button className="btn primary" type="submit" disabled={answered !== questions.length}>Finish mock</button>
          </div>
        )}
      </form>
    </article>
  )
}
