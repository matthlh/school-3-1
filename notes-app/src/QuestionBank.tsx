import { useEffect, useMemo, useState } from 'react'
import type { QuizHistory, QuizState, Texts } from './files'
import { courseOf, hrefFor } from './files'
import { parseQuestions, slug, splitTopic, type Question, type QuestionGroup } from './markdown'
import { hrefBank, navigate, toRanges, topicKey, type BankView } from './routes'
import { sourcesFor } from './sources'
import { isWeak, lastGrade, questionId, tallyHistories } from './stats'
import { GradeChip } from './ui'
import { Md } from './Md'

type Mode = BankView['only']

/** Deterministic shuffle for a given seed (the seed is in the URL, so a reload deals the same order). */
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

/** "Lec 3 — Histograms (Mon Sep 14, logged 2026-09-14)" → "Lec 3 — Histograms". Emphasis markers are dropped too. */
function shortTitle(title: string): string {
  return splitTopic(title).main.replace(/\*/g, '').replace(/\s+/g, ' ').trim()
}

/** True when slug `s` is `key` or goes on from it by whole words. */
const startsWith = (s: string, key: string) => s === key || s.startsWith(key + '-')

/**
 * Each section's key in the URL: its label (the title up to " — ") as a slug, plus as many following words as it takes
 * to differ from every earlier section: "lec-7", "webwork-2", "long-problems", "lec-1-deck". A section added later
 * never changes an earlier key, so an old URL keeps naming the same section.
 */
function sectionKeys(groups: QuestionGroup[]): string[] {
  const earlier: string[] = []
  return groups.map((g) => {
    const title = shortTitle(g.title ?? '')
    const words = slug(title).split('-')
    let n = slug(title.split(' — ')[0]).split('-').length
    while (n < words.length && earlier.some((s) => startsWith(s, words.slice(0, n).join('-')))) n++
    earlier.push(words.join('-'))
    return words.slice(0, n).join('-')
  })
}

/** A question's Topic, Lec and Type tags as a bank URL writes them; '' where the tag is missing. */
function tagKeys(q: Question): Pick<BankView, 'topic' | 'lec' | 'type'> {
  return { topic: q.topic && topicKey(q.topic), lec: q.lec && slug(q.lec), type: q.type && slug(q.type) }
}

/**
 * Two topic slugs name the same topic when equal or when one goes on from the other (6+ characters): the prefix step
 * of quizlib's match_topic, so a ledger row's link finds the questions the quiz scripts file under that row.
 */
const sameTopic = (a: string, b: string) => a === b || (Math.min(a.length, b.length) >= 6 && (startsWith(a, b) || startsWith(b, a)))

/**
 * Quiz-script ids already worked out, by course and question text. A bank opened again (Back from a notes page) then
 * draws its Weak and Not asked lists in its first render, so the scroll position put back lands where it was.
 */
const knownIds = new Map<string, string>()

/** The ids knownIds already holds for `qs`, by parsed question id. */
function idsKnown(code: string, qs: Question[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const q of qs) {
    const id = knownIds.get(code + '|' + q.question)
    if (id !== undefined) out[q.id] = id
  }
  return out
}

/** An active filter in the toolbar; clicking it clears the filter. */
function ActiveFilter({ label, title, onClear }: { label: string; title: string; onClear: () => void }) {
  return (
    <button type="button" className="chip on" onClick={onClear} title={title}>
      {label} <span className="x" aria-hidden="true">×</span>
    </button>
  )
}

export function QuestionBank({ path, text, quiz, all, view, anchor }: {
  path: string; text: string; quiz: QuizState | null; all: Texts; view: BankView; anchor?: string
}) {
  const code = courseOf(path) ?? ''
  const groups = useMemo(() => parseQuestions(text), [text])
  const flat = useMemo(() => groups.flatMap((g) => g.questions), [groups])
  const keys = useMemo(() => sectionKeys(groups), [groups])
  // The lecture or reading notes each question comes from, linked under its answer (a title by the question would hint).
  const sources = useMemo(() => sourcesFor(code, groups, all), [code, groups, all])
  // Question id → index of its `## ` group, so the section filter also works on the flattened shuffle list.
  const groupOf = useMemo(() => {
    const m = new Map<string, number>()
    groups.forEach((g, i) => g.questions.forEach((q) => m.set(q.id, i)))
    return m
  }, [groups])

  // Map each parsed question to the id the quiz scripts use (sha1 of course + normalised text).
  const [ids, setIds] = useState<Record<string, string>>(() => idsKnown(code, flat))
  useEffect(() => {
    let alive = true
    Promise.all(flat.map(async (q) => {
      const id = await questionId(code, q.question)
      knownIds.set(code + '|' + q.question, id)
      return [q.id, id] as const
    })).then((pairs) => { if (alive) setIds(Object.fromEntries(pairs)) })
    return () => { alive = false }
  }, [flat, code])
  const histOf = (q: Question): QuizHistory | undefined => quiz?.questions[ids[q.id] ?? '']

  // Every filter, the mode and the shuffle are a new Back step; opening and closing answers changes the current one.
  const go = (change: Partial<BankView>, replace = false) => navigate(hrefBank(path, { ...view, ...change }, anchor), replace)
  // The questions showing their answer. The URL names them by position in the file, counting from 1.
  const showing = new Set(flat.filter((_, i) => view.open.some(([a, b]) => a <= i + 1 && i + 1 <= b)))
  /** Show the answers of exactly the questions `pick` keeps. */
  const openOnly = (pick: (q: Question) => boolean) => go({ open: toRanges(flat.flatMap((q, i) => (pick(q) ? [i + 1] : []))) }, true)

  const asked = flat.map(histOf).filter((h): h is QuizHistory => !!h)
  const tally = tallyHistories(asked)
  const total = flat.length
  if (total === 0) return <article><p className="muted">No questions yet.</p></article>

  const section = keys.indexOf(view.section)
  const weakCount = flat.filter((q) => isWeak(histOf(q))).length
  const keep = (q: Question) => {
    const t = tagKeys(q)
    return (!view.section || groupOf.get(q.id) === section) &&
      (!view.topic || sameTopic(t.topic, view.topic)) &&
      (!view.lec || t.lec === view.lec) &&
      (!view.type || t.type === view.type) &&
      (view.only === 'all' || (view.only === 'weak' ? isWeak(histOf(q)) : !histOf(q)))
  }
  const visible = flat.filter(keep)
  const everyOpen = visible.length > 0 && visible.every((q) => showing.has(q))
  // The toolbar names an active filter as the cards write it; one that no question matches shows its slug.
  const topicName = view.topic && splitTopic(flat.find((q) => sameTopic(tagKeys(q).topic, view.topic))?.topic ?? view.topic).main
  const lecName = view.lec && (flat.find((q) => tagKeys(q).lec === view.lec)?.lec ?? view.lec)
  const typeName = view.type && (flat.find((q) => tagKeys(q).type === view.type)?.type ?? view.type)
  const seg = (m: Mode, label: string, n: number) => (
    <button type="button" className={view.only === m ? 'on' : ''} aria-pressed={view.only === m} onClick={() => go({ only: m })}>{label}<span className="k">{n}</span></button>
  )

  return (
    <article>
      {asked.length > 0 && (
        <div className="legend">
          asked {asked.length} of {total} · <b>{tally.solid} solid</b> · {tally.shaky} shaky · {tally.missed} missed
        </div>
      )}
      <div className="toolbar">
        <div className="seg" role="group" aria-label="Which questions">
          {seg('all', 'All', total)}
          {(asked.length > 0 || view.only !== 'all') && seg('weak', 'Weak', weakCount)}
          {(asked.length > 0 || view.only !== 'all') && seg('new', 'Not asked', total - asked.length)}
        </div>
        {groups.length > 1 && (
          <select value={view.section} onChange={(e) => go({ section: e.target.value })} aria-label="Section">
            <option value="">All sections</option>
            {groups.map((g, i) => g.title && (
              <option key={i} value={keys[i]} title={g.title}>{shortTitle(g.title)}</option>
            ))}
          </select>
        )}
        {topicName && <ActiveFilter label={`Topic: ${topicName}`} title={`${topicName} — click to show every topic again`} onClear={() => go({ topic: '' })} />}
        {lecName && <ActiveFilter label={`Lec: ${lecName}`} title={`Lec ${lecName} — click to show every lecture again`} onClear={() => go({ lec: '' })} />}
        {typeName && <ActiveFilter label={`Type: ${typeName}`} title={`${typeName} — click to show every type again`} onClear={() => go({ type: '' })} />}
        <span className="spacer" />
        {visible.length !== total && <span className="muted small">{visible.length} shown</span>}
        <button type="button" className={'btn' + (view.shuffle ? ' on' : '')} onClick={() => go({ shuffle: view.shuffle ? 0 : 1 + Math.floor(Math.random() * 9999) })} title="Random order, all lectures mixed — how the exam asks">
          {view.shuffle ? 'File order' : 'Shuffle'}
        </button>
        <button type="button" className="btn" onClick={() => openOnly(() => !everyOpen)}>
          {everyOpen ? 'Hide answers' : 'Show answers'}
        </button>
      </div>
      {visible.length === 0 && <p className="muted">No questions match these filters.</p>}
      {(view.shuffle ? [{ title: null, questions: shuffled(flat, view.shuffle) }] : groups).map((g, gi) => {
        const qs = g.questions.filter(keep)
        if (qs.length === 0) return null
        // The id splitSections gives this `## ` heading, as in the viewer, so a `#section` link (a search hit) lands here.
        return (
          <section key={gi} id={g.title ? 'sec-' + slug(g.title) : undefined}>
            {g.title && <h2>{g.title}</h2>}
            {qs.map((q, i) => {
              const open = showing.has(q)
              const t = tagKeys(q)
              const h = histOf(q)
              const last = h?.history[h.history.length - 1]
              const src = sources.get(q.id)
              return (
                <div key={q.id} className="q">
                  <div className="text"><span className="n">{i + 1}.</span> <Md text={q.display} path={path} /></div>
                  <div className="meta">
                    {h && <GradeChip g={lastGrade(h)} title={last ? `last ${last[0]}` : undefined} />}
                    {h && h.history.length > 1 && <span className="hist">{h.history.slice(-6).map(([, g]) => g).join(' ')}</span>}
                    {q.topic && !view.topic && (
                      <button type="button" className="chip" onClick={() => go({ topic: t.topic })} title={`${q.topic} — click to show only this topic`}>
                        {splitTopic(q.topic).main}
                      </button>
                    )}
                    {q.lec && !view.lec && (
                      <button type="button" className="chip" onClick={() => go({ lec: t.lec })} title={`Lec ${q.lec} — click to show only this lecture`}>lec {q.lec}</button>
                    )}
                    {q.type && !view.type && (
                      <button type="button" className={'chip type-' + q.type} onClick={() => go({ type: t.type })} title={`${q.type} — click to show only this type`}>{q.type}</button>
                    )}
                    <button type="button" className="link" aria-expanded={open} onClick={() => openOnly((x) => showing.has(x) !== (x === q))}>{open ? 'hide' : 'answer'}</button>
                  </div>
                  {open && (
                    <div className="ans">
                      <Md text={q.answer} path={path} />
                      {src && <div className="src"><a href={hrefFor(src.path)}>{src.title}</a></div>}
                    </div>
                  )}
                </div>
              )
            })}
          </section>
        )
      })}
    </article>
  )
}
