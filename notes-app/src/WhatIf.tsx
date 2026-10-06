// The what-if panel on a course page: the course grade the rest of the term projects to, and the average the rest
// needs for a target. Weights come from the syllabus's Grading table (parseWeights), graded items from the ledger's
// Grades so far (parseGrades). The target is kept per viewer in localStorage under "target".
import { useMemo, useState } from 'react'
import { hrefFor, type Texts } from './files'
import { parseGrades, parseWeights, splitSections, type GradeComponent, type GradeItem } from './markdown'

export interface Row extends GradeComponent {
  /** The Grades so far items that belong to this component. */
  items: GradeItem[]
  /** Points of the course grade already graded: the whole weight once an item matches, or weight × graded ÷ count. */
  graded: number
  /** Points earned on the graded part: graded × the items' average. */
  earned: number
  /** Points not graded yet: weight − graded. */
  open: number
}

export interface Standing {
  /** Most points open first, bonuses last. */
  rows: Row[]
  /** Items that belong to no component, with the components they tie between (none when nothing matched). */
  unplaced: { item: GradeItem; ties: string[] }[]
  /** The non-bonus weights' sum: 100 when the table is right. */
  total: number
  /** Non-bonus points graded, earned and still open. */
  graded: number
  earned: number
  open: number
  /** Points earned on bonuses, on top of the 100. */
  bonus: number
}

/**
 * The components a graded item belongs to: those whose first word starts the item's name, in any case. When several
 * share that word ("Exam 1" to "Exam 4"), only those whose names share the longest beginning with the item's name stay,
 * so "Exam 2" belongs to Exam 2 alone. More than one left means the item cannot be placed.
 */
export function owners(item: string, components: GradeComponent[]): GradeComponent[] {
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
 * whole once an item matches it; either way the known part is the items' average. An error when an item is scored out
 * of 0 or a component holds more items than its count, since the numbers would then be wrong.
 */
export function standing(components: GradeComponent[], items: GradeItem[]): Standing | { error: string } {
  const placed = components.map((): GradeItem[] => [])
  const unplaced: Standing['unplaced'] = []
  for (const item of items) {
    if (Number(item.of) === 0) return { error: `${item.name} is scored out of 0. Fix it in Grades so far in the ledger.` }
    const own = owners(item.name, components)
    if (own.length === 1) placed[components.indexOf(own[0])].push(item)
    else unplaced.push({ item, ties: own.map((c) => c.name) })
  }
  const rows: Row[] = []
  for (const [i, c] of components.entries()) {
    const its = placed[i]
    if (c.count !== null && its.length > c.count) {
      return { error: `${c.name} has ${its.length} graded items, more than the ${c.count} the syllabus counts. Fix the item names in Grades so far or the count in the syllabus.` }
    }
    const share = c.count === null ? (its.length > 0 ? 1 : 0) : its.length / c.count
    const average = its.length > 0 ? its.reduce((sum, it) => sum + Number(it.got) / Number(it.of), 0) / its.length : 0
    const graded = c.weight * share
    rows.push({ ...c, items: its, graded, earned: graded * average, open: c.weight - graded })
  }
  const core = rows.filter((r) => !r.bonus)
  const sum = (rs: Row[], f: (r: Row) => number) => rs.reduce((s, r) => s + f(r), 0)
  return {
    rows: [...rows].sort((a, b) => Number(a.bonus) - Number(b.bonus) || b.open - a.open),
    unplaced,
    total: sum(core, (r) => r.weight),
    graded: sum(core, (r) => r.graded),
    earned: sum(core, (r) => r.earned),
    open: sum(core, (r) => r.open),
    bonus: sum(rows.filter((r) => r.bonus), (r) => r.earned),
  }
}

/** The average everything not yet graded needs for the target, or the sentence that says why there is none. */
export function verdict(s: Standing, target: number): { need: number } | { say: string } {
  const have = s.earned + s.bonus
  if (s.open === 0) return { say: `Everything is graded, and the course grade of ${fmt(have)}% ${have >= target ? 'reaches' : 'is short of'} the target.` }
  const need = (100 * (target - have)) / s.open
  if (need <= 0) return { say: `The target is already secured. 0% on everything not yet graded still gives ${fmt(have)}%.` }
  if (need > 100) return { say: `The target is out of reach. Even 100% on everything not yet graded gives ${fmt(have + s.open)}%.` }
  return { need }
}

/** 93.6735 → "93.7"; 45 → "45". */
export const fmt = (n: number) => String(Math.round(n * 10) / 10)

/** ["a", "b", "c"] → "a, b and c". */
const andList = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`)

const itemText = (it: GradeItem) => `${it.name} ${it.got}/${it.of}`

/** A percentage typed into an input: a number from 0 to 100, else null. */
function percent(s: string): number | null {
  const n = Number(s)
  return s.trim() !== '' && Number.isFinite(n) && n >= 0 && n <= 100 ? n : null
}

const KEY = 'target'

/** The stored target, else 96. Storage can be blocked (private mode), so every access is wrapped. */
function loadTarget(): string {
  try {
    const v = localStorage.getItem(KEY)
    if (v !== null && percent(v) !== null) return v
  } catch { /* storage blocked: the default applies */ }
  return '96'
}

function saveTarget(v: number) {
  try { localStorage.setItem(KEY, String(v)) } catch { /* storage blocked: the target lasts for this page load */ }
}

/** The course's items in the ledger's Grades so far table; none when it has no row there. */
function gradedItems(ledger: string, code: string): GradeItem[] {
  const sec = splitSections(ledger).find((s) => s.heading !== null && /^grades/i.test(s.heading))
  return (sec ? parseGrades(sec.body) : []).find((r) => r.course === code)?.items ?? []
}

export function WhatIf({ code, all }: { code: string; all: Texts }) {
  const syllabusPath = `courses/${code}/00-syllabus.md`
  const result = useMemo(() => {
    const parsed = parseWeights(all[syllabusPath] ?? '')
    if ('error' in parsed) return { error: `${parsed.error} Fix the Grading table in the syllabus to see the numbers.` }
    return standing(parsed.components, gradedItems(all['ledger.md'] ?? '', code))
  }, [all, code, syllabusPath])
  const [target, setTarget] = useState(loadTarget)
  const [assume, setAssume] = useState<string | null>(null)   // null: the assumption follows the target

  const head = <div className="panel-head"><span>Grade what-if</span><a href={hrefFor(syllabusPath)}>syllabus →</a></div>
  if ('error' in result) return <section className="panel whatif">{head}<p>{result.error}</p></section>

  const s = result
  const t = percent(target)
  const a = percent(assume ?? target)
  const v = t === null ? null : verdict(s, t)
  const unmatched = s.unplaced.filter((u) => u.ties.length === 0)
  const tied = s.unplaced.filter((u) => u.ties.length > 0)
  const openBonus = s.rows.filter((r) => r.bonus && r.open > 0)
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
            <div className="num">{fmt(s.earned + s.bonus + (s.open * a) / 100)}%</div>
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
        {s.graded === 0 ? 'Nothing is graded yet.' : `${fmt(s.graded)} of the ${fmt(s.total)} points are graded so far, and ${fmt(s.earned)} of them are earned.`}
        {s.bonus > 0 && ` Bonuses add ${fmt(s.bonus)} more.`}
      </p>
      <table className="whatif-table">
        <thead><tr><th>Component</th><th>Graded so far</th><th className="open">Points open</th></tr></thead>
        <tbody>
          {s.rows.map((r) => (
            <tr key={r.name} className={r.bonus || r.open === 0 ? 'quiet' : undefined}>
              <td>{r.name}{r.count !== null && ` ×${r.count}`} <span className="w">{r.bonus && '+'}{fmt(r.weight)}%</span></td>
              <td>
                <span className="items">
                  {r.items.map((it, i) => <span key={i} className="chip">{it.name} <b>{it.got}/{it.of}</b></span>)}
                  {r.count !== null ? <span className="muted">{r.items.length} of {r.count}</span> : r.items.length === 0 && <span className="muted">—</span>}
                </span>
              </td>
              <td className="open">{r.bonus && r.open > 0 ? 'not assumed' : fmt(r.open)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {unmatched.length > 0 && (
        <p className="small muted">
          Not matched to any component, so not counted: {andList(unmatched.map((u) => itemText(u.item)))}. An item matches a component when its name starts with the component's first word.
        </p>
      )}
      {tied.map((u, i) => <p key={i} className="small muted">{itemText(u.item)} matches {andList(u.ties)} equally, so it is not counted.</p>)}
      {openBonus.length > 0 && (
        <p className="small muted">
          Bonus points count only once graded, so {andList(openBonus.map((r) => `${r.name} (+${fmt(r.weight)}%)`))} {openBonus.length === 1 ? 'is' : 'are'} not assumed.
        </p>
      )}
    </section>
  )
}
