// Small pieces shared across pages: grade and course chips, the solid/shaky/missed bar, topic cells.
import { splitTopic, type Grade, type TopicRow } from './markdown'
import { formatDate, isISODate } from './dates'
import { hrefCourse, hrefTopic } from './routes'
import { toneStyle } from './tone'
import { pctSolid, type Tally } from './stats'

export function GradeChip({ g, title }: { g: Grade | null; title?: string }) {
  const cls = g === 'O' ? 'g g-O' : g === '~' ? 'g g-shaky' : g === 'X' ? 'g g-X' : 'g g-none'
  return <span className={cls} title={title}>{g ?? '–'}</span>
}

/** A topic row's last grade, titled with when it was quizzed. */
export function LastGrade({ r }: { r: TopicRow }) {
  return <GradeChip g={r.grade} title={isISODate(r.last) ? `last quizzed ${formatDate(r.last)}` : 'not quizzed yet'} />
}

/** "due Wed Sep 16" in red once Next has come, else "next Sat Sep 20"; empty without a date. */
export function NextCell({ next, today }: { next: string; today: string }) {
  const due = !!next && next <= today
  return <td className={due ? 'due' : 'muted'}>{next ? `${due ? 'due' : 'next'} ${formatDate(next)}` : ''}</td>
}

export function CourseChip({ code }: { code: string }) {
  return <a href={hrefCourse(code)} className="chip tone" style={toneStyle(code)}>{code}</a>
}

export const isCourseCode = (s: string) => /^[A-Z]{2,4}\d{3}[A-Z]?$/.test(s)

/** A calendar row's course cell as a chip: a course links to its page, UBC-wide dates get a plain chip, "—" gets none. */
export function calendarChip(course: string) {
  if (isCourseCode(course)) return <CourseChip code={course} />
  return course === 'UBC' ? <span className="chip">UBC</span> : null
}

/** A topic row's main text as a link to its questions in the course's bank, then its trailing parenthetical, muted. */
export function TopicCell({ r }: { r: TopicRow }) {
  const { main, detail } = splitTopic(r.topic)
  return <><a href={hrefTopic(r.course, r.topic)}>{main}</a>{detail && <span className="detail">{detail}</span>}</>
}

/** Thin segmented bar + one-line legend: solid / shaky / missed / not yet quizzed. */
export function StatBar({ t }: { t: Tally }) {
  if (t.total === 0) return <div className="legend">no topics yet</div>
  const seg = (n: number, cls: string) => (n > 0 ? <i className={cls} style={{ width: `${(100 * n) / t.total}%` }} /> : null)
  const pct = pctSolid(t)
  return (
    <div className="stat">
      <div className="bar">{seg(t.solid, 's')}{seg(t.shaky, 'h')}{seg(t.missed, 'm')}{seg(t.unquizzed, 'u')}</div>
      <div className="legend">
        {pct !== null && <><b>{pct}% solid</b> · </>}
        {t.solid} solid · {t.shaky} shaky · {t.missed} missed
        {t.unquizzed ? ` · ${t.unquizzed} new` : ''}{t.due ? ` · ${t.due} due` : ''}
      </div>
    </div>
  )
}
