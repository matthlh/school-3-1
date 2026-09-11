import type { Texts, Tree } from './files'
import { hrefFor } from './files'
import { afterDash, countQuestions, extractSection, firstHeading } from './markdown'
import { hrefCourse } from './routes'
import { toneStyle } from './theme'
import { EMPTY, type Tally } from './stats'
import { StatBar } from './StatViews'
import { Logo } from './Logo'
import { Md } from './Md'

export function Home({ tree, all, tallies }: { tree: Tree; all: Texts; tallies: Record<string, Tally> }) {
  const due = extractSection(all['ledger.md'] ?? '', /^due now/i)
  return (
    <>
      <h1 className="brand"><Logo size={26} /> School 3-1</h1>
      {due && (
        <section className="panel">
          <div className="panel-head"><span>Due now</span><a href={hrefFor('ledger.md')}>ledger →</a></div>
          <Md text={due} path="ledger.md" />
        </section>
      )}
      <div className="grid">
        {tree.courses.map((c) => {
          const syllabus = all[`courses/${c.code}/00-syllabus.md`]
          const name = syllabus ? afterDash(firstHeading(syllabus) ?? c.code) : ''
          const q = countQuestions(all[`courses/${c.code}/02-questions.md`])
          return (
            <a key={c.code} className="card course" href={hrefCourse(c.code)} style={toneStyle(c.code)}>
              <div className="code">{c.code}</div>
              <div className="name">{name}</div>
              <div className="sub">{c.lectures.length} lecture{c.lectures.length === 1 ? '' : 's'} · {q} question{q === 1 ? '' : 's'}</div>
              <StatBar t={tallies[c.code] ?? EMPTY} />
            </a>
          )
        })}
      </div>
      {tree.runs.length > 0 && (
        <div className="row small">
          <span className="muted">Briefs:</span>
          {tree.runs.slice(0, 4).map((r) => <a key={r.path} className="btn" href={hrefFor(r.path)}>{r.label.replace(/-morning.*$/, '')}</a>)}
        </div>
      )}
    </>
  )
}
