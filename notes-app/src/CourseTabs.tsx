import type { Texts, Tree } from './files'
import { courseName, hrefFor } from './files'
import { countQuestions } from './markdown'
import { hrefCourse } from './routes'
import { toneStyle } from './tone'

export function CourseHeader({ code, tree, all, current }: { code: string; tree: Tree; all: Texts; current: string }) {
  const course = tree.courses.find((c) => c.code === code)
  if (!course) return null
  const name = courseName(code, all)
  const q = countQuestions(all[`courses/${code}/02-questions.md`])
  const style = toneStyle(code)
  return (
    <header className="course-head" style={style}>
      <h1><span className="ink">{code}</span> <span className="muted light">{name}</span></h1>
      <div className="tabs" role="navigation" aria-label="Course pages">
        <a className={'tab' + (current === `course/${code}` ? ' cur' : '')} href={hrefCourse(code)}>Overview</a>
        {course.main.map((e) => (
          <a key={e.path} className={'tab' + (current === e.path ? ' cur' : '')} href={hrefFor(e.path)}>
            {e.label}{e.label === 'Question bank' && q > 0 ? <span className="count">{q}</span> : null}
          </a>
        ))}
      </div>
    </header>
  )
}
