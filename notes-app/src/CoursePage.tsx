import type { Texts, Tree } from './files'
import { hrefFor } from './files'
import { afterDash, countQuestions, firstHeading } from './markdown'

export function CoursePage({ code, tree, all }: { code: string; tree: Tree; all: Texts }) {
  const course = tree.courses.find((c) => c.code === code)
  if (!course) return <article><h1>Unknown course</h1><p><code>{code}</code></p></article>

  const syllabus = all[`courses/${code}/00-syllabus.md`]
  const name = syllabus ? afterDash(firstHeading(syllabus) ?? '') : ''
  const qCount = countQuestions(all[`courses/${code}/02-questions.md`])

  return (
    <>
      <h1>{code} <span className="muted light">{name}</span></h1>
      <div className="row">
        {course.main.map((e) => (
          <a key={e.path} className="btn" href={hrefFor(e.path)}>
            {e.label}{e.label === 'Question bank' && qCount > 0 ? ` · ${qCount}` : ''}
          </a>
        ))}
      </div>
      <h2 className="section-title">Lectures</h2>
      {course.lectures.length === 0 ? (
        <p className="muted">No lectures logged yet.</p>
      ) : (
        <div className="list">
          {course.lectures.map((e) => {
            const text = all[e.path] ?? ''
            const title = afterDash(firstHeading(text) ?? e.label)
            return (
              <a key={e.path} className="card wide" href={hrefFor(e.path)}>
                <div className="name">{title}</div>
                <div className="sub">{e.label}</div>
              </a>
            )
          })}
        </div>
      )}
    </>
  )
}
