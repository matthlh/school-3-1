import { useEffect, useMemo, useState } from 'react'
import type { QuizHistory, QuizState } from './files'
import { courseOf } from './files'
import { parseQuestions, type Question } from './markdown'
import { isWeak, lastGrade, questionId, tallyHistories } from './stats'
import { GradeChip } from './StatViews'
import { Md } from './Md'

type Mode = 'all' | 'weak' | 'new'

/** Deterministic shuffle for a given seed (so toggling answers doesn't reorder). */
function shuffled<T>(xs: T[], seed: number): T[] {
  const out = [...xs]
  let s = seed >>> 0 || 1
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0
    const j = s % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function QuestionBank({ path, text, quiz }: { path: string; text: string; quiz: QuizState | null }) {
  const code = courseOf(path) ?? ''
  const groups = useMemo(() => parseQuestions(text), [text])
  const flat = useMemo(() => groups.flatMap((g) => g.questions), [groups])
  const topics = useMemo(() => [...new Set(flat.map((q) => q.topic).filter(Boolean))], [flat])

  // Map each parsed question to the id the quiz scripts use (sha1 of course + normalised text).
  const [ids, setIds] = useState<Record<string, string>>({})
  useEffect(() => {
    let alive = true
    Promise.all(flat.map(async (q) => [q.id, await questionId(code, q.question)] as const))
      .then((pairs) => { if (alive) setIds(Object.fromEntries(pairs)) })
    return () => { alive = false }
  }, [flat, code])
  const histOf = (q: Question): QuizHistory | undefined => quiz?.questions[ids[q.id] ?? '']

  const [mode, setMode] = useState<Mode>('all')
  const [topic, setTopic] = useState('')
  const [open, setOpen] = useState<Set<string>>(new Set())
  const [allOpen, setAllOpen] = useState(false)
  const [seed, setSeed] = useState(0) // 0 = file order; otherwise a shuffled single list
  const toggle = (id: string) =>
    setOpen((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  const asked = flat.map(histOf).filter((h): h is QuizHistory => !!h)
  const tally = tallyHistories(asked)
  const total = flat.length
  if (total === 0) return <article><p className="muted">No questions yet.</p></article>

  const weakCount = flat.filter((q) => isWeak(histOf(q))).length
  const keep = (q: Question) =>
    (!topic || q.topic === topic) && (mode === 'all' || (mode === 'weak' ? isWeak(histOf(q)) : !histOf(q)))
  const shownCount = flat.filter(keep).length
  const seg = (m: Mode, label: string, n: number) => (
    <button className={mode === m ? 'on' : ''} onClick={() => setMode(m)}>{label}<span className="k">{n}</span></button>
  )

  return (
    <article>
      {asked.length > 0 && (
        <div className="legend">
          asked {asked.length} of {total} · <b>{tally.solid} solid</b> · {tally.shaky} shaky · {tally.missed} missed
        </div>
      )}
      <div className="toolbar">
        <div className="seg" role="tablist">
          {seg('all', 'All', total)}
          {asked.length > 0 && seg('weak', 'Weak', weakCount)}
          {asked.length > 0 && seg('new', 'Not asked', total - asked.length)}
        </div>
        {topics.length > 1 && (
          <select value={topic} onChange={(e) => setTopic(e.target.value)} aria-label="Topic">
            <option value="">All topics</option>
            {topics.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        )}
        <span className="spacer" />
        {shownCount !== total && <span className="muted small">{shownCount} shown</span>}
        <button className={'btn' + (seed ? ' on' : '')} onClick={() => setSeed(seed ? 0 : Date.now())} title="Random order, all lectures mixed — how the exam asks">
          {seed ? 'File order' : 'Shuffle'}
        </button>
        <button className="btn" onClick={() => { setAllOpen((v) => !v); setOpen(new Set()) }}>
          {allOpen ? 'Hide answers' : 'Show answers'}
        </button>
      </div>
      {(seed ? [{ title: null, questions: shuffled(flat, seed) }] : groups).map((g, gi) => {
        const qs = g.questions.filter(keep)
        if (qs.length === 0) return null
        return (
          <section key={gi}>
            {g.title && <h2>{g.title}</h2>}
            {qs.map((q, i) => {
              const shown = allOpen || open.has(q.id)
              const h = histOf(q)
              const last = h?.history[h.history.length - 1]
              return (
                <div key={q.id} className="q">
                  <div className="text"><span className="n">{i + 1}.</span> <Md text={q.question} path={path} inline /></div>
                  <div className="meta">
                    {h && <GradeChip g={lastGrade(h)} title={last ? `last ${last[0]}` : undefined} />}
                    {h && h.history.length > 1 && <span className="hist">{h.history.slice(-6).map(([, g]) => g).join(' ')}</span>}
                    {q.topic && !topic && <span className="chip">{q.topic}</span>}
                    {q.lec && <span className="chip">lec {q.lec}</span>}
                    {q.type && <span className={'chip type-' + q.type}>{q.type}</span>}
                    <button className="link" onClick={() => toggle(q.id)}>{shown ? 'hide' : 'answer'}</button>
                  </div>
                  {shown && <div className="ans"><Md text={q.answer} path={path} /></div>}
                </div>
              )
            })}
          </section>
        )
      })}
    </article>
  )
}
