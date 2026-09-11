import { useMemo, useState } from 'react'
import { parseQuestions } from './markdown'
import { Md } from './Md'

export function QuestionBank({ path, text, title }: { path: string; text: string; title: string }) {
  const groups = useMemo(() => parseQuestions(text), [text])
  const topics = useMemo(
    () => [...new Set(groups.flatMap((g) => g.questions.map((q) => q.topic)).filter(Boolean))],
    [groups],
  )
  const [topic, setTopic] = useState<string | null>(null)
  const [open, setOpen] = useState<Set<string>>(new Set())
  const [allOpen, setAllOpen] = useState(false)
  const total = groups.reduce((n, g) => n + g.questions.length, 0)
  const toggle = (id: string) =>
    setOpen((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  if (total === 0) return <article><h1>{title}</h1><p className="muted">No questions yet.</p></article>

  return (
    <article>
      <h1>{title} <span className="muted light">{total}</span></h1>
      <div className="row small">
        <button className="btn" onClick={() => { setAllOpen((v) => !v); setOpen(new Set()) }}>
          {allOpen ? 'Hide answers' : 'Show all answers'}
        </button>
        {topics.length > 1 && topics.map((t) => (
          <button key={t} className={'chip' + (topic === t ? ' on' : '')} onClick={() => setTopic(topic === t ? null : t)}>{t}</button>
        ))}
      </div>
      {groups.map((g, gi) => {
        const qs = g.questions.filter((q) => !topic || q.topic === topic)
        if (qs.length === 0) return null
        return (
          <section key={gi}>
            {g.title && <h2>{g.title}</h2>}
            {qs.map((q, i) => {
              const shown = allOpen || open.has(q.id)
              return (
                <div key={q.id} className="q">
                  <div className="text"><span className="n">{i + 1}.</span> <Md text={q.question} path={path} inline /></div>
                  <div className="meta">
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
