import type { Entry, Loaded, Texts, Tree } from './files'
import { hrefFor, mainTab } from './files'
import { afterDash, countQuestions, firstHeading, splitSections, type LinkRow, type TopicRow } from './markdown'
import type { CourseTab } from './routes'
import { EMPTY, type Tally } from './stats'
import { LastGrade, StatBar, TopicCell } from './ui'
import { BlockAge, DueError, ReadinessList, StandingCell, type Due } from './DueNow'
import { LinkList } from './Links'
import { Md } from './Md'
import { usePager } from './Pager'
import { WhatIf } from './WhatIf'
import { ReviewEntry } from './Review'
import { nextPage, pageKind, splitTitle } from './Home'

/** Syllabus sections that belong on the Materials tab (checklists), not in the syllabus view. */
export const VERIFY = /^(to verify|ask\b|check\b|do this week|open questions|to do)/i

/** One card per notes page: its title from the page's H1, its file label under it. */
function PageCards({ entries, all }: { entries: Entry[]; all: Texts }) {
  return (
    <div className="list">
      {entries.map((e) => {
        const title = afterDash(firstHeading(all[e.path] ?? '') ?? e.label)
        return (
          <a key={e.path} className="card lecture" href={hrefFor(e.path)}>
            <div className="name clamp2" title={title}>{title}</div>
            <div className="sub">{e.label}</div>
          </a>
        )
      })}
    </div>
  )
}

/** What each main file is for, under its name on a Study or Materials card. */
const BLURB: Record<string, string> = {
  'Question bank': 'Every question, filterable by topic and lecture.',
  'Exam review': 'Notes for exam preparation.',
  'Cheat sheet': 'What goes on the allowed sheet.',
  Syllabus: 'Grading, exam format and schedule.',
  Logistics: 'Office hours, contacts and course details.',
  'Ask Kraal': 'Questions to put to the instructor.',
  Topics: 'Every topic, its last grade and look-alikes.',
}

function FileCards({ entries, all }: { entries: Entry[]; all: Texts }) {
  if (!entries.length) return null
  return (
    <div className="grid files">
      {entries.map((e) => {
        const q = e.label === 'Question bank' ? countQuestions(all[e.path]) : 0
        return (
          <a key={e.path} className="card" href={hrefFor(e.path)}>
            <div className="name">{e.label}{q > 0 && <span className="count">{q}</span>}</div>
            <div className="sub">{BLURB[e.label] ?? ''}</div>
          </a>
        )
      })}
    </div>
  )
}

export function CoursePage({ code, tab, tree, all, loaded, topics, tallies, links, due }: {
  code: string; tab: CourseTab; tree: Tree; all: Texts; loaded: Loaded; topics: TopicRow[]; tallies: Record<string, Tally>; links: LinkRow[]; due: Due
}) {
  const course = tree.courses.find((c) => c.code === code)
  if (!course) return <article><h1>Unknown course</h1><p><code>{code}</code></p></article>
  const files = course.main.filter((e) => mainTab(e.path) === tab)
  if (tab === 'materials') return <Materials code={code} all={all} files={files} links={links} />
  if (tab === 'progress') return <Progress code={code} all={all} files={files} topics={topics} tallies={tallies} due={due} />

  const next = nextPage(course)
  const nextTitle = splitTitle(next ? firstHeading(all[next.path] ?? '') ?? '' : '')
  return (
    <>
      <ReviewEntry all={all} loaded={loaded} course={code} />
      {next && (
        <a className="card continue-card" href={hrefFor(next.path)}>
          <div className="sub">{['Continue', pageKind(next.path), nextTitle.date, next.prepared && 'not studied yet'].filter(Boolean).join(' · ')}</div>
          <div className="name">{nextTitle.title}</div>
        </a>
      )}
      <FileCards entries={files} all={all} />
      {course.prepared.length > 0 && (
        <>
          <h2 className="section-title">Not studied yet</h2>
          <p className="muted small">These pages were prepared from the posted material before you studied the lecture.</p>
          <PageCards entries={course.prepared} all={all} />
        </>
      )}
      <h2 className="section-title">Lectures</h2>
      {course.lectures.length === 0 ? <p className="muted">No lectures logged yet.</p> : <PageCards entries={course.lectures} all={all} />}
      {course.readings.length > 0 && (
        <>
          <h2 className="section-title">Readings</h2>
          <PageCards entries={course.readings} all={all} />
        </>
      )}
    </>
  )
}

/** Reference material: the syllabus and logistics pages, the course's links, and the syllabus's open checklists. */
function Materials({ code, all, files, links }: { code: string; all: Texts; files: Entry[]; links: LinkRow[] }) {
  const syllabusPath = `courses/${code}/00-syllabus.md`
  const syllabus = all[syllabusPath]
  const verify = syllabus ? splitSections(syllabus).filter((s) => s.heading && VERIFY.test(s.heading)) : []
  const hasLinks = links.some((l) => l.course === code)
  return (
    <>
      <FileCards entries={files} all={all} />
      {hasLinks && (
        <section className="panel">
          <div className="panel-head"><span>Links</span></div>
          <LinkList rows={links} course={code} />
        </section>
      )}
      {verify.map((s) => (
        <section key={s.id} className="panel">
          <div className="panel-head"><span>{s.heading}</span><a href={hrefFor(syllabusPath)}>syllabus →</a></div>
          <Md text={s.body} path={syllabusPath} />
        </section>
      ))}
    </>
  )
}

/** How the course is going: each topic's last grade and standing, exam readiness, and what the remaining marks need. */
function Progress({ code, all, files, topics, tallies, due }: {
  code: string; all: Texts; files: Entry[]; topics: TopicRow[]; tallies: Record<string, Tally>; due: Due
}) {
  const rows = topics.filter((r) => r.course === code)
  const { rows: shown, pager } = usePager(rows)
  const readiness = due.ok ? due.block.readiness.filter((r) => r.course === code) : []
  return (
    <>
      <section className="panel">
        <div className="panel-head"><span>Revision<BlockAge due={due} /></span><a href={hrefFor('ledger.md')}>ledger →</a></div>
        <StatBar t={tallies[code] ?? EMPTY} due={due.ok ? due.count(code) : null} />
        {!due.ok && <DueError error={due.error} />}
        {readiness.length > 0 && <ReadinessList rows={readiness} />}
        {rows.length > 0 && (
          <>
            <table className="topics">
              <tbody>
                {shown.map((r) => (
                  <tr key={r.topic}>
                    <td><LastGrade r={r} /></td>
                    <td><TopicCell r={r} /></td>
                    <StandingCell s={due.ok ? due.standing(r) : null} next={r.next} />
                  </tr>
                ))}
              </tbody>
            </table>
            {pager}
          </>
        )}
      </section>
      <WhatIf code={code} all={all} />
      <FileCards entries={files} all={all} />
    </>
  )
}
