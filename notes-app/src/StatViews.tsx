import type { Grade } from './markdown'
import type { Tally } from './stats'
import { pctSolid } from './stats'

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

export function GradeChip({ g, title }: { g: Grade | null; title?: string }) {
  const cls = g === 'O' ? 'g g-O' : g === '~' ? 'g g-shaky' : g === 'X' ? 'g g-X' : 'g g-none'
  return <span className={cls} title={title}>{g ?? '–'}</span>
}
