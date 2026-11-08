// The Review page (#/review): a short session of due questions, one at a time. He writes or thinks his answer, taps
// how sure he is to reveal the key, ticks what his answer had, and saves. Each grade is saved on this device at once
// and synced to his other devices; a reload or a trip to the notes resumes the session; Undo takes a grade back.
// The topic stays hidden until the key is shown, so the label does not cue the answer.

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Loaded, Texts } from './files'
import { hrefFor } from './files'
import { courseLabel, parseQuestions, type Question } from './markdown'
import { sourcesFor } from './sources'
import { Md } from './Md'
import { CourseChip, GradeChip } from './ui'
import { navigate } from './routes'
import { parseRubric, gradeFromTicks, fingerprint, type Rubric } from './review/rubric'
import { localDay, newId, liveReviews, type ReviewEvent, type UndoEvent } from './review/events'
import { scheduleFor, type PublicEntry } from './review/progress'
import { dueToday } from './review/queue'
import { blankDraft, configureSync, loadSession, parsePlan, saveSession, store, syncNow, useEvents, useSyncStatus,
  type CardDraft, type ReviewPlan, type ReviewSession } from './review/state'
import { loadConfig } from './review/sync'
import { shortDate } from './dates'

export const HREF_REVIEW = '#/review'

interface Card { qid: string; course: string; q: Question; rubric: Rubric | null; src: { path: string; title: string } | null; row: string | null }

/** Every stamped bank question by its permanent id, with its rubric and notes page. */
function useCards(all: Texts): Map<string, Card> {
  return useMemo(() => {
    const out = new Map<string, Card>()
    for (const [path, text] of Object.entries(all)) {
      const course = /^courses\/([^/]+)\/02-questions\.md$/.exec(path)?.[1]
      if (!course) continue
      const groups = parseQuestions(text)
      const src = sourcesFor(course, groups, all)
      for (const q of groups.flatMap((g) => g.questions)) {
        if (!q.stamp) continue
        out.set(q.stamp, { qid: q.stamp, course, q, rubric: parseRubric(q.answer), src: src.get(q.id) ?? null, row: null })
      }
    }
    return out
  }, [all])
}

const CONF: [1 | 2 | 3, string][] = [[1, 'Guess'], [2, 'Think so'], [3, 'Sure']]

const deviceName = () => (/Mobi|Android|iPhone|iPad/.test(navigator.userAgent) ? 'phone' : 'laptop')

/**
 * The Today and course-page way in: how many questions are waiting, and a button that opens the Review page. `hero` is
 * Today's version, the page's one main action: a short session first, with the count and sync state under it.
 */
export function ReviewEntry({ all, loaded, course = null, hero = false }: { all: Texts; loaded: Loaded; course?: string | null; hero?: boolean }) {
  const cards = useCards(all)
  const events = useEvents()
  const plan = useMemo(() => parsePlan(loaded.reviewPlan ?? undefined), [loaded])
  const q = dueToday(plan, cards, events, course, loaded.quiz)
  const open = loadSession()
  const resume = open && open.at < open.qids.length
  const href = course ? `${HREF_REVIEW}?course=${course}` : HREF_REVIEW
  const sync = <SyncChip onSetup={() => { window.location.hash = '/review?setup=1' }} />
  if (hero) {
    const first = Math.min(8, q.length)
    return (
      <section className="panel review-hero">
        <div className="due-label">{resume ? 'Review in progress' : 'Next step'}</div>
        <h2>{resume ? `Finish your review: question ${open.at + 1} of ${open.qids.length}.`
          : !plan ? 'The review plan is not published yet.'
          : first ? `Review ${first} question${first === 1 ? '' : 's'}.`
          : 'Nothing is waiting for review.'}</h2>
        <p className="muted">{resume ? 'Every grade so far is saved.'
          : !plan ? 'It appears after the next quiz or morning check.'
          : first ? `${counted(q.length, q.due)}. Due questions come first, and each grade is saved as you go, so you can stop at any point.`
          : 'Open a course below and keep reading.'}</p>
        <div className="row">
          {(resume || first > 0) && <a className="btn primary big" href={href}>{resume ? 'Resume review' : 'Start review'}</a>}
          {sync}
        </div>
      </section>
    )
  }
  if (!plan) return null
  return (
    <section className="home-review">
      <a className="btn primary" href={href}>
        {resume ? 'Resume review' : course ? `Review ${courseLabel(course)}` : 'Review'}
      </a>
      <span className="muted">{resume ? `question ${open.at + 1} of ${open.qids.length}` : counted(q.length, q.due)}</span>
      {sync}
    </section>
  )
}

/** "Saved", "Saving 2…", "Offline, 3 waiting", "Not synced: set up". */
export function SyncChip({ onSetup }: { onSetup?: () => void }) {
  const s = useSyncStatus()
  const text = s.state === 'off' ? 'This device only' : s.state === 'saving' ? `Saving ${s.pending}…`
    : s.state === 'saved' ? 'Saved and synced' : s.state === 'offline' ? `Offline, ${s.pending} waiting` : `Sync problem${s.pending ? `, ${s.pending} waiting` : ''}`
  return (
    <button type="button" className={`sync-chip ${s.state}`} onClick={onSetup} title={s.state === 'error' ? s.message : 'Sync settings'}>
      <span className="dot" aria-hidden="true" />{text}
    </button>
  )
}

function SyncSetup({ onClose }: { onClose: () => void }) {
  const cfg = loadConfig()
  const [owner, setOwner] = useState(cfg?.owner ?? 'matthlh')
  const [repo, setRepo] = useState(cfg?.repo ?? 'school-3-1-progress')
  const [token, setToken] = useState(cfg?.token ?? '')
  return (
    <div className="panel sync-setup">
      <div className="panel-head"><span>Sync this device</span><button type="button" className="link" onClick={onClose}>Close</button></div>
      <p className="small">Grades sync through a private GitHub repository. The token stays in this browser only; it is
        never part of the site. Use a fine-grained token limited to that one repository, with Contents read and write.</p>
      <label>Owner <input value={owner} onChange={(e) => setOwner(e.target.value.trim())} autoCapitalize="off" /></label>
      <label>Repository <input value={repo} onChange={(e) => setRepo(e.target.value.trim())} autoCapitalize="off" /></label>
      <label>Token <input value={token} onChange={(e) => setToken(e.target.value.trim())} type="password" autoComplete="off" /></label>
      <div className="row">
        <button type="button" className="btn primary" disabled={!owner || !repo || !token}
          onClick={() => { configureSync({ owner, repo, token }); void syncNow(); onClose() }}>Save and sync</button>
        {cfg && <button type="button" className="btn" onClick={() => { configureSync(null); onClose() }}>Stop syncing on this device</button>}
      </div>
    </div>
  )
}

const counted = (n: number, due: number) =>
  [due && `${due} due`, n - due && `${n - due} new`].filter(Boolean).join(' · ') || 'nothing to review'

export function Review({ all, loaded, course, setup: askSetup = false }: { all: Texts; loaded: Loaded; course: string | null; setup?: boolean }) {
  const cards = useCards(all)
  const events = useEvents()
  const plan = useMemo(() => parsePlan(loaded.reviewPlan ?? undefined), [loaded])
  const [session, setSession] = useState<ReviewSession | null>(loadSession)
  const [setup, setSetup] = useState(askSetup)
  const due = useMemo(() => dueToday(plan, cards, events, course, loaded.quiz), [plan, cards, events, course, loaded])
  const update = (s: ReviewSession | null) => { setSession(s); saveSession(s) }

  const start = (n: number) => {
    const qids = due.slice(0, n)
    if (!qids.length) return
    update({ id: newId(), started: new Date().toISOString(), qids, at: 0,
      cards: Object.fromEntries(qids.map((id) => [id, blankDraft(cards.get(id)?.rubric?.points.length ?? 1)])) })
  }

  return (
    <article className="review">
      <div className="review-head">
        <h1>Review</h1>
        <SyncChip onSetup={() => setSetup((v) => !v)} />
      </div>
      {setup && <SyncSetup onClose={() => setSetup(false)} />}
      {session && session.at < session.qids.length
        ? <Session session={session} cards={cards} loaded={loaded} plan={plan} update={update} />
        : session
          ? <Summary session={session} cards={cards} onDone={() => update(null)} />
          : <Start due={due} plan={plan} course={course} start={start} />}
    </article>
  )
}

function Start({ due, plan, course, start }: { due: string[] & { due: number }; plan: ReviewPlan | null; course: string | null; start: (n: number) => void }) {
  if (!plan) return <p className="muted">The review plan is not published yet. It appears after the next quiz or morning check.</p>
  if (!due.length) return <p>Nothing to review{course ? ` in ${course}` : ''}. The plan was written {shortDate(plan.as_of)}.</p>
  return (
    <section className="panel review-start">
      <p>{counted(due.length, due.due)}{course ? ` in ${course}` : ''}, from the plan of {shortDate(plan.as_of)}. Due questions
        come first, then new ones.</p>
      <div className="row">
        <button type="button" className="btn primary big" onClick={() => start(8)}>Start {Math.min(8, due.length)} questions</button>
        {due.length > 8 && <button type="button" className="btn big" onClick={() => start(20)}>{Math.min(20, due.length)} questions</button>}
      </div>
      <p className="small muted">Each answer is saved the moment you grade it. Stop whenever you like.</p>
    </section>
  )
}

function Session({ session, cards, loaded, plan, update }: {
  session: ReviewSession; cards: Map<string, Card>; loaded: Loaded; plan: ReviewPlan | null; update: (s: ReviewSession) => void
}) {
  const events = useEvents()
  const qid = session.qids[session.at]
  const card = cards.get(qid)
  const d = session.cards[qid] ?? blankDraft(card?.rubric?.points.length ?? 1)
  const top = useRef<HTMLDivElement>(null)
  const set = (patch: Partial<CardDraft>) => update({ ...session, cards: { ...session.cards, [qid]: { ...d, ...patch } } })
  // Answered on his other device since this session started: skip it rather than record a second same-day attempt.
  const elsewhere = liveReviews(events).some((r) => r.qid === qid && r.session !== session.id && r.at >= session.started)
  const khash = card ? fingerprint(card.q.answer) : ''
  useEffect(() => {
    if (elsewhere && !d.saved) update({ ...session, at: session.at + 1 })
    else if (d.khash && d.khash !== khash && !d.saved) set({ ticks: [], conf: null, revealAt: null, khash: null })   // the key changed
    else if (d.shownAt === null) set({ shownAt: Date.now() })
  }, [qid, elsewhere, khash])   // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { top.current?.focus() }, [qid])

  if (!card) {   // the question left the bank since the session started
    return <p className="muted">This question is no longer in the bank. <button type="button" className="btn" onClick={() => update({ ...session, at: session.at + 1 })}>Next</button></p>
  }
  const revealed = d.conf !== null
  const ticks = Array.from({ length: card.rubric?.points.length ?? 0 }, (_, k) => d.ticks[k] ?? false)
  // Looking at the notes before the key is help, not recall: an answer that would be O counts as ~.
  const ticked = card.rubric ? gradeFromTicks(card.rubric.kind, ticks) : null
  const grade = d.flagged ? null : d.assisted && ticked === 'O' ? '~' : ticked
  const exams = plan && plan.cards[qid] ? plan.rows[plan.cards[qid]] ?? [] : []
  const hist = loaded.quiz?.questions[qid]?.history as PublicEntry[] | undefined
  const sched = d.saved ? scheduleFor(qid, hist, events, exams) : null

  const save = () => {
    if (!card.rubric || d.conf === null) return
    const e: ReviewEvent = {
      v: 1, kind: 'review', id: newId(), session: session.id, at: new Date().toISOString(), day: localDay(),
      device: deviceName(), qid, course: card.course,
      grade, conf: d.conf, ticks, rubric: card.rubric.kind, qhash: fingerprint(card.q.question), khash: fingerprint(card.q.answer),
      ...(d.attempt.trim() ? { attempt: d.attempt.trim() } : {}), ...(d.assisted ? { assisted: true } : {}),
      ...(d.shownAt && d.revealAt ? { secs: Math.round((d.revealAt - d.shownAt) / 1000) } : {}),
    }
    store.add(e)
    set({ saved: e.id })
    void syncNow()
  }
  const undo = () => {
    if (!d.saved) return
    const u: UndoEvent = { v: 1, kind: 'undo', id: newId(), at: new Date().toISOString(), day: localDay(), device: deviceName(), target: d.saved }
    store.add(u)
    set({ saved: null })
    void syncNow()
  }
  const go = (at: number) => update({ ...session, at })

  return (
    <div className="review-card" ref={top} tabIndex={-1}>
      <div className="review-meta">
        <span>Question {session.at + 1} of {session.qids.length}</span>
        <CourseChip code={card.course} />
        {revealed && <span className="muted small">{card.q.topic}</span>}
      </div>
      <div className="review-q"><Md text={card.q.display} path={`courses/${card.course}/02-questions.md`} /></div>
      {card.q.answer && !card.rubric && <p className="small muted">This answer has no key list, so it cannot be graded here.</p>}
      <div className={revealed ? 'review-grid' : undefined}>
        <label className="review-attempt">
          <span className="small muted">Your answer (optional; private to you)</span>
          <textarea value={d.attempt} onChange={(e) => set({ attempt: e.target.value })} rows={revealed ? 6 : 4} disabled={!!d.saved} />
        </label>
        {revealed && card.rubric && (
          <div className="review-key">
            <div className="small muted">{card.rubric.kind === 'Parts' ? 'Parts: each counts the same, half or more is ~' : 'Key: point 1 is the core'}</div>
            <ul className="ticks">
              {card.rubric.points.map((p, k) => (
                <li key={k}>
                  <label className={ticks[k] ? 'on' : undefined}>
                    <input type="checkbox" checked={ticks[k]} disabled={!!d.saved || d.flagged}
                      onChange={(e) => { const t = [...ticks]; t[k] = e.target.checked; set({ ticks: t }) }} />
                    <span>{k === 0 && card.rubric!.kind !== 'Parts' && <b className="core">Core </b>}<Md text={p} path={`courses/${card.course}/02-questions.md`} /></span>
                  </label>
                </li>
              ))}
            </ul>
            {card.rubric.rest && <details><summary>Explanation</summary><Md text={card.rubric.rest} path={`courses/${card.course}/02-questions.md`} /></details>}
          </div>
        )}
      </div>
      {!revealed ? (
        <div className="row review-actions">
          <span className="small muted">How sure are you? Tapping shows the key.</span>
          {CONF.map(([c, label]) => (
            <button key={c} type="button" className="btn big" onClick={() => set({ conf: c, revealAt: Date.now(), khash })}>{label}</button>
          ))}
        </div>
      ) : (
        <div className="row review-actions">
          {!d.saved ? (
            <>
              <span className="review-grade">{d.flagged ? 'Not graded' : grade ? <>Grade <GradeChip g={grade} />{d.assisted && ticked === 'O' && <span className="small muted"> (notes opened first)</span>}</> : '—'}</span>
              <label className="small"><input type="checkbox" checked={d.flagged} onChange={(e) => set({ flagged: e.target.checked })} /> Question is wrong or unclear</label>
              <button type="button" className="btn primary big" onClick={save} disabled={!card.rubric}>Save grade</button>
            </>
          ) : (
            <>
              <span className="review-grade">Saved {d.flagged ? '(not graded)' : <GradeChip g={grade} />}{sched && <span className="small muted"> · next {shortDate(sched.next)}</span>}</span>
              <button type="button" className="btn" onClick={undo}>Undo</button>
              <button type="button" className="btn primary big" onClick={() => go(session.at + 1)}>Next</button>
            </>
          )}
        </div>
      )}
      <div className="row small review-foot">
        {card.src && (
          <a href={hrefFor(card.src.path)} onClick={() => { if (!revealed) set({ assisted: true }) }}>
            {revealed ? 'Notes' : 'Look at the notes (counts as help)'}: {card.src.title}
          </a>
        )}
        {session.at > 0 && <button type="button" className="link" onClick={() => go(session.at - 1)}>Back</button>}
        <button type="button" className="link" onClick={() => go(session.qids.length)}>End session</button>
      </div>
    </div>
  )
}

function Summary({ session, cards, onDone }: { session: ReviewSession; cards: Map<string, Card>; onDone: () => void }) {
  const events = useEvents()
  const live = new Map(liveReviews(events).filter((r) => r.session === session.id).map((r) => [r.qid, r]))
  const misses = session.qids.filter((id) => { const r = live.get(id); return r && (r.grade === 'X' || r.grade === '~') })
  return (
    <section className="panel">
      <p><b>{live.size}</b> of {session.qids.length} saved.</p>
      {misses.length > 0 && (
        <>
          <p className="small muted">Pages behind the misses:</p>
          <ul>
            {misses.map((id) => { const c = cards.get(id); return c?.src ? <li key={id}><a href={hrefFor(c.src.path)}>{c.src.title}</a> <GradeChip g={live.get(id)!.grade} /></li> : null })}
          </ul>
        </>
      )}
      <button type="button" className="btn primary" onClick={() => { onDone(); navigate('#/review') }}>Done</button>
    </section>
  )
}
