import type { Texts, Tree } from './files'
import { courseName, hrefFor, mainTab } from './files'
import { COURSE_TABS, hrefCourse, type CourseTab } from './routes'
import { toneStyle } from './tone'

/**
 * A course's name and its three tabs (2026-11-07): Study, Materials, Progress. On one of the course's main files the
 * tab it belongs to is marked, and a row under the tabs switches between that tab's files (Syllabus, Logistics, …).
 */
export function CourseHeader({ code, tree, all, tab, file }: { code: string; tree: Tree; all: Texts; tab: CourseTab; file?: string }) {
  const course = tree.courses.find((c) => c.code === code)
  if (!course) return null
  const siblings = file ? course.main.filter((e) => mainTab(e.path) === tab) : []
  return (
    <header className="course-head" style={toneStyle(code)}>
      <h1><span className="ink">{code}</span> <span className="muted light">{courseName(code, all)}</span></h1>
      <div className="tabs" role="navigation" aria-label="Course sections">
        {COURSE_TABS.map(([id, label]) => {
          const cur = id === tab
          return (
            <a key={id} className={'tab' + (cur ? ' cur' : '')} href={hrefCourse(code, id)} aria-current={cur && !file ? 'page' : undefined}>
              {label}
            </a>
          )
        })}
      </div>
      {siblings.length > 0 && (
        <div className="subtabs" role="navigation" aria-label={`${COURSE_TABS.find(([id]) => id === tab)?.[1]} pages`}>
          {siblings.map((e) => (
            <a key={e.path} href={hrefFor(e.path)} className={e.path === file ? 'cur' : undefined} aria-current={e.path === file ? 'page' : undefined}>{e.label}</a>
          ))}
        </div>
      )}
    </header>
  )
}
