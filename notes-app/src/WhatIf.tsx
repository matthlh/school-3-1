// The what-if panel on a course page: the course grade the rest of the term projects to, and the average the rest
// needs for a target. Weights come from the syllabus's Grading table (parseWeights), graded items from the ledger's
// Grades so far (parseLedgerGrades). A component marked "(replaced by Final if higher)" counts at the better of its
// own score and the Final's percentage, in the projection and in the average needed. The target is kept per viewer in
// localStorage under "target".
import { useMemo, useState } from 'react'
import { hrefFor, type Texts } from './files'
import { parseLedgerGrades, parseWeights, type GradeComponent, type GradeItem } from './markdown'
import { readText, writeText } from './storage'

interface Row extends GradeComponent {
  /** The Grades so far items that belong to this component. */
  items: GradeItem[]
  /** Points of the course grade already graded: weight × items ÷ count for a counted component, the whole weight once an
   *  item matches an uncounted one, none for a running one, whose score is not final. */
  graded: number
  /** Points earned on the graded part: graded × the items' average. */
  earned: number
  /** Points not graded yet: weight − graded. */
  open: number
}

/** A component whose score another one's percentage replaces when that is higher. */
interface Replacement {
  /** The component replaced ("Midterm"). */
  row: Row
  /** The component whose percentage can replace it ("Final"). */
  by: Row
}

interface Breakdown {
  /** Most points open first, bonuses last. */
  rows: Row[]
  /** The non-bonus weights' sum: 100 when the table is right. */
  total: number
  /** Non-bonus points graded, earned and still open. Earned is the raw item points: it leaves out what a graded
   *  replacing component adds (project(s, 0) - bonus includes that). */
  graded: number
  earned: number
  open: number
  /** Points earned on bonuses, on top of the 100. */
  bonus: number
  /** The replacement rules; none for most courses. */
  replaced: Replacement[]
}

/** 93.6735 → "93.7"; 45 → "45". */
const fmt = (n: number) => String(Math.round(n * 10) / 10)

/** ["a", "b", "c"] → "a, b and c". */
const andList = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`)

const itemText = (it: GradeItem) => `${it.name} ${it.got}/${it.of}`

/**
 * The components a graded item belongs to: those whose first word starts the item's name, in any case. When several
 * share that word ("Exam 1" to "Exam 4"), only those whose names share the longest beginning with the item's name stay,
 * so "Exam 2" belongs to Exam 2 alone. More than one left means the item cannot be placed.
 */
function owners(item: string, components: GradeComponent[]): GradeComponent[] {
  const name = item.toLowerCase()
  const shared = (c: GradeComponent) => {
    const n = c.name.toLowerCase()
    let i = 0
    while (i < n.length && n[i] === name[i]) i++
    return i
  }
  const fits = components.filter((c) => name.startsWith(c.name.toLowerCase().split(/\s+/)[0]))
  const best = Math.max(...fits.map(shared))
  return fits.filter((c) => shared(c) === best)
}

/**
 * Graded items placed in their components. A counted component is graded in the share items ÷ count, an uncounted one
 * whole once an item matches it, and a running one not at all: its one item is the score so far, so all of its weight
 * stays open. The known part is the items' average. An error, so that no numbers show, when an item belongs to no
 * single component, when one is scored out of 0, or when a component holds more items than its count (a running one,
 * more than one).
 */
function breakdown(components: GradeComponent[], items: GradeItem[]): Breakdown | { error: string } {
  const placed = components.map((): GradeItem[] => [])
  const unmatched: GradeItem[] = []
  const tied: string[] = []
  for (const item of items) {
    if (Number(item.of) === 0) return { error: `${item.name} is scored out of 0. Fix it in Grades so far in the ledger.` }
    const own = owners(item.name, components)
    if (own.length === 1) placed[components.indexOf(own[0])].push(item)
    else if (own.length === 0) unmatched.push(item)
    else tied.push(`${itemText(item)} matches ${andList(own.map((c) => c.name))} equally.`)
  }
  if (unmatched.length || tied.length) {
    const n = unmatched.length + tied.length
    return {
      error: [
        `${n} graded item${n === 1 ? ' belongs' : 's belong'} to no single component, so the panel shows no numbers.`,
        ...(unmatched.length ? [`${andList(unmatched.map(itemText))} ${unmatched.length === 1 ? 'matches' : 'match'} no component.`] : []),
        ...tied,
        "An item belongs to the component whose first word starts its name. Rename the item in Grades so far in the ledger, or the component in the syllabus's Grading table.",
      ].join(' '),
    }
  }
  const rows: Row[] = []
  for (const [i, c] of components.entries()) {
    const its = placed[i]
    if (c.running && its.length > 1) {
      return { error: `${c.name} is a running score, so it holds one item, but Grades so far has ${its.length} for it. Fix the item names in Grades so far or the component in the syllabus.` }
    }
    if (c.count !== null && its.length > c.count) {
      return { error: `${c.name} has ${its.length} graded items, more than the ${c.count} the syllabus counts. Fix the item names in Grades so far or the count in the syllabus.` }
    }
    const share = c.running ? 0 : c.count === null ? (its.length > 0 ? 1 : 0) : its.length / c.count
    const average = its.length > 0 ? its.reduce((sum, it) => sum + Number(it.got) / Number(it.of), 0) / its.length : 0
    const graded = c.weight * share
    rows.push({ ...c, items: its, graded, earned: graded * average, open: c.weight - graded })
  }
  const core = rows.filter((r) => !r.bonus)
  const sum = (rs: Row[], f: (r: Row) => number) => rs.reduce((s, r) => s + f(r), 0)
  const byName = new Map(rows.map((r) => [r.name, r]))
  return {
    rows: [...rows].sort((a, b) => Number(a.bonus) - Number(b.bonus) || b.open - a.open),
    total: sum(core, (r) => r.weight),
    graded: sum(core, (r) => r.graded),
    earned: sum(core, (r) => r.earned),
    open: sum(core, (r) => r.open),
    bonus: sum(rows.filter((r) => r.bonus), (r) => r.earned),
    // parseWeights has checked that each replacedBy names exactly one other non-bonus component.
    replaced: rows.flatMap((r) => (r.replacedBy === null ? [] : [{ row: r, by: byName.get(r.replacedBy)! }])),
  }
}

/** A replaced component's own points, and the points the other's percentage would give it, with `pct` on the rest. */
function sides({ row, by }: Replacement, pct: number): { own: number; theirs: number } {
  return { own: row.earned + (row.open * pct) / 100, theirs: (row.weight * (by.earned + (by.open * pct) / 100)) / by.weight }
}

/**
 * The course grade with `pct` percent on everything not yet graded: earned points, bonuses, the open points at `pct`,
 * and for each replacement the points the other component's percentage adds when it beats the replaced score.
 */
function project(s: Breakdown, pct: number): number {
  let grade = s.earned + s.bonus + (s.open * pct) / 100
  for (const r of s.replaced) {
    const { own, theirs } = sides(r, pct)
    grade += Math.max(0, theirs - own)
  }
  return grade
}

/**
 * The average, in percent, everything not yet graded needs for the target: 0 or less once it is secured, above 100 when
 * it is out of reach. Without a replacement the grade is one straight line in that average. A replacement bends the
 * line upward where the other percentage starts to beat the replaced score, so the grade is a straight line between
 * those bends and rises throughout, and the answer is solved on the piece the target falls in.
 */
function needed(s: Breakdown, target: number): number {
  const floor = project(s, 0)
  if (s.replaced.length === 0) return (100 * (target - floor)) / s.open
  if (floor >= target) return 0
  const bends = s.replaced.map((r) => {
    // own and theirs are both straight lines in pct, so they cross where their difference is 0.
    const at0 = sides(r, 0), at100 = sides(r, 100)
    const d0 = at0.theirs - at0.own, d100 = at100.theirs - at100.own
    return d0 === d100 ? NaN : (100 * d0) / (d0 - d100)
  })
  const cuts = [0, ...bends.filter((p) => p > 0 && p < 100), 100].sort((a, b) => a - b)
  for (let i = 1; i < cuts.length; i++) {
    const [a, b] = [cuts[i - 1], cuts[i]]
    const [ga, gb] = [project(s, a), project(s, b)]
    if (gb >= target) return a + ((target - ga) / (gb - ga)) * (b - a)   // ga < target here, so gb > ga
  }
  return Infinity
}

/** The average everything not yet graded needs for the target, or the sentence that says why there is none. */
function verdict(s: Breakdown, target: number): { need: number } | { say: string } {
  const have = project(s, 0)
  if (s.open === 0) return { say: `Everything is graded, and the course grade of ${fmt(have)}% ${have >= target ? 'reaches' : 'is short of'} the target.` }
  const need = needed(s, target)
  if (need <= 0) return { say: `The target is already secured. 0% on everything not yet graded still gives ${fmt(have)}%.` }
  if (need > 100) return { say: `The target is out of reach. Even 100% on everything not yet graded gives ${fmt(project(s, 100))}%.` }
  return { need }
}

/** A percentage typed into an input: a number from 0 to 100, else null. */
function percent(s: string): number | null {
  const n = Number(s)
  return s.trim() !== '' && Number.isFinite(n) && n >= 0 && n <= 100 ? n : null
}

const KEY = 'target'

/** The stored target, else 96. */
function loadTarget(): string {
  const v = readText(localStorage, KEY)
  return v !== null && percent(v) !== null ? v : '96'
}

const saveTarget = (v: number) => writeText(localStorage, KEY, String(v))

export function WhatIf({ code, all }: { code: string; all: Texts }) {
  const syllabusPath = `courses/${code}/00-syllabus.md`
  const result = useMemo(() => {
    const parsed = parseWeights(all[syllabusPath] ?? '')
    if ('error' in parsed) return { error: `${parsed.error} Fix the Grading table in the syllabus to see the numbers.` }
    return breakdown(parsed.components, parseLedgerGrades(all['ledger.md'] ?? '').find((r) => r.course === code)?.items ?? [])
  }, [all, code, syllabusPath])
  const [target, setTarget] = useState(loadTarget)
  const [assume, setAssume] = useState<string | null>(null)   // null: the assumption follows the target

  const head = <div className="panel-head"><span>Grade what-if</span><a href={hrefFor(syllabusPath)}>syllabus →</a></div>
  if ('error' in result) return <section className="panel whatif">{head}<p>{result.error}</p></section>

  const s = result
  const t = percent(target)
  const a = percent(assume ?? target)
  const v = t === null ? null : verdict(s, t)
  const running = s.rows.filter((r) => r.running)
  const drops = s.rows.filter((r) => r.drops && !r.running)   // a running score stays open, so its drop changes nothing here
  const openBonus = s.rows.filter((r) => r.bonus && r.open > 0)
  const mustPass = s.rows.filter((r) => r.mustPass)
  // A replaced component with nothing open still moves while the component that can replace it is open.
  const settled = (r: Row) => r.open === 0 && !s.replaced.some((x) => x.row === r && x.by.open > 0)
  return (
    <section className="panel whatif">
      {head}
      {Math.abs(s.total - 100) > 0.001 && <p className="small whatif-warn">The non-bonus weights in the syllabus add up to {fmt(s.total)}%, not 100%.</p>}
      <div className="whatif-inputs">
        <label>Target
          <input type="number" inputMode="decimal" min={0} max={100} step="any" value={target}
                 onChange={(e) => { setTarget(e.target.value); const n = percent(e.target.value); if (n !== null) saveTarget(n) }} />%
        </label>
        <label>Assume on the rest
          <input type="number" inputMode="decimal" min={0} max={100} step="any" value={assume ?? target} onChange={(e) => setAssume(e.target.value)} />%
        </label>
      </div>
      {t === null || a === null || v === null ? <p className="muted">Enter percentages from 0 to 100.</p> : (
        <div className="whatif-stats">
          <div>
            <div className="num">{fmt(project(s, a))}%</div>
            <div className="say">Projected course grade, with {fmt(a)}% on everything not yet graded.</div>
          </div>
          {'need' in v ? (
            <div>
              <div className="num">{fmt(v.need)}%</div>
              <div className="say">Needed on everything not yet graded to reach {fmt(t)}%.</div>
            </div>
          ) : <p className="verdict">{v.say}</p>}
        </div>
      )}
      <p className="small">
        {s.graded === 0 ? 'Nothing is graded yet.' : `${fmt(s.graded)} of the ${fmt(s.total)} points are graded so far, and ${fmt(project(s, 0) - s.bonus)} of them are earned.`}
        {s.bonus > 0 && ` Bonuses add ${fmt(s.bonus)} more.`}
      </p>
      <table className="whatif-table">
        <thead><tr><th>Component</th><th>Graded so far</th><th className="open">Points open</th></tr></thead>
        <tbody>
          {s.rows.map((r) => (
            <tr key={r.name} className={r.bonus || settled(r) ? 'quiet' : undefined}>
              <td>{r.name}{r.count !== null && ` ×${r.count}`} <span className="w">{r.bonus && '+'}{fmt(r.weight)}%</span></td>
              <td>
                <span className="items">
                  {r.items.map((it, i) => <span key={i} className="chip">{it.name} <b>{it.got}/{it.of}</b></span>)}
                  {r.running ? <span className="muted">running</span>
                    : r.count !== null ? <span className="muted">{r.items.length} of {r.count}</span>
                    : r.items.length === 0 && <span className="muted">—</span>}
                  {r.replacedBy !== null && <span className="muted">or {r.replacedBy} if higher</span>}
                </span>
              </td>
              <td className="open">{r.bonus && r.open > 0 ? 'not assumed' : fmt(r.open)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {running.map((r) => (
        <p key={r.name} className="small muted">
          {r.name} shows its running score, but its {fmt(r.weight)}% stays open until the final score is in, so the assumption applies to it.
        </p>
      ))}
      {s.replaced.map(({ row, by }) => (
        <p key={row.name} className="small muted">
          {row.name} takes {by.name}'s percentage whenever that beats its own{row.open === 0 && row.items.length > 0 ? ` ${fmt((100 * row.earned) / row.weight)}%` : ''}, and the projection and the average needed both count this.
        </p>
      ))}
      {mustPass.length > 0 && (
        <p className="small muted">
          {andList(mustPass.map((r) => r.name))} must be passed to pass the course, which the panel does not check.
        </p>
      )}
      {s.rows.some((r) => r.scaled) && (
        <p className="small muted">The syllabus says course grades can be scaled, and the panel shows the grade before any scaling.</p>
      )}
      {drops.length > 0 && (
        <p className="small muted">
          {andList(drops.map((r) => r.name))} {drops.length === 1 ? 'drops its' : 'drop their'} lowest scores at the end of term. The panel ignores the drop and counts every score.
        </p>
      )}
      {openBonus.length > 0 && (
        <p className="small muted">
          Bonus points count only once graded, so {andList(openBonus.map((r) => `${r.name} (+${fmt(r.weight)}%)`))} {openBonus.length === 1 ? 'is' : 'are'} not assumed.
        </p>
      )}
    </section>
  )
}
