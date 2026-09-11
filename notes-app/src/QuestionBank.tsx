import { useEffect, useMemo, useState } from 'react'
import type { QuizHistory, QuizState } from './files'
import { courseOf } from './files'
import { parseQuestions, type Question } from './markdown'
import { isWeak, lastGrade, questionId, tallyHistories } from './stats'
import { GradeChip } from './StatViews'
import { Md } from './Md'

export function QuestionBank({ path, text, title, quiz }: { path: string; text: string; title: string; quiz: QuizState | null }) {
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

  const [topic, setTopic] = useState<string | null>(null)
  const [weak, setWeak] = useState(false)
  const [open, setOpen] = useState<Set<string>>(new Set())
  const [allOpen, setAllOpen] = useState(false)
  const toggle = (id: string) =>
    setOpen((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  const asked = flat.map(histOf).filter((h): h is QuizHistory => !!h)
  const tally = tallyHistories(asked)
  const total = flat.length
  if (total === 0) return <article><h1>{title}</h1><p className="muted">No questions yet.</p></article>

  return (
    <article>
      <h1>{title} <span className="muted light">{total}</span></h1>
      {asked.length > 0 && (
        <div className="legend">
          asked {asked.length} of {total} · <b>{tally.solid} solid</b> · {tally.shaky} shaky · {tally.missed} missed
        </div>
      )}
      <div className="row small">
        <button className="btn" onClick={() => { setAllOpen((v) => !v); setOpen(new Set()) }}>
          {allOpen ? 'Hide answers' : 'Show all answers'}
        </button>
        {asked.length > 0 && (
          <button className={'chip' + (weak ? ' on' : '')} onClick={() => setWeak((v) => !v)} title="only questions last graded X or ~">weak only</button>
        )}
        {topics.length > 1 && topics.map((t) => (
          <button key={t} className={'chip' + (topic === t ? ' on' : '')} onClick={() => setTopic(topic === t ? null : t)}>{t}</button>
        ))}
      </div>
      {groups.map((g, gi) => {
        const qs = g.questions.filter((q) => (!topic || q.topic === topic) && (!weak || isWeak(histOf(q))))
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
                    {q.topic && <span className="chip">{q.topic}</span>}
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
