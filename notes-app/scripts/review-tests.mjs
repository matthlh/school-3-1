// The Review flow's rules and its sync, tested against an in-memory GitHub. Covers the acceptance list in
// routines/design-review/handoff-study-system.md: client A reviews and client B sees the event and the new schedule; a
// retried write is not duplicated; an offline queue keeps order and empties on reconnect; two clients writing at once
// lose nothing; an undo propagates; the saving/saved/offline states; another user's token cannot read the repository.
// Also checks the site's schedule against quizlib.card_state on every real history.
// Run: node scripts/review-tests.mjs (npm run test:review)
import assert from 'node:assert/strict'
import test from 'node:test'
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { importSite } from './import-site.mjs'

const root = decodeURIComponent(new URL('../..', import.meta.url).pathname)
const site = await importSite([
  "export { parseRubric, gradeFromTicks, fingerprint } from './review/rubric'",
  "export { cardState, examCap } from './review/schedule'",
  "export { liveReviews } from './review/events'",
  "export { attemptsFor, scheduleFor } from './review/progress'",
  "export { EventStore, Sync, GitHubTransport, OfflineError, AuthError } from './review/sync'",
  "export { dueToday } from './review/queue'",
].join('\n'))

// ---- an in-memory GitHub: one private repo, per-token access, switchable network, an injected 409 race -------------
function fakeGitHub({ owner = 'matthlh', repo = 'progress', tokens = ['good'], isPrivate = true } = {}) {
  const files = new Map()         // path → text
  let online = true
  let failBlobAfter = Infinity
  let raceOnce = 0
  let blobSeq = 0
  const blobs = new Map()         // sha → text
  const shaOf = new Map()         // path → sha
  const writes = []
  const fetcher = async (url, init = {}) => {
    if (!online) throw new TypeError('Failed to fetch')
    const auth = init.headers?.Authorization ?? ''
    const u = new URL(url)
    const prefix = `/repos/${owner}/${repo}`
    if (!u.pathname.startsWith(prefix)) return new Response('{}', { status: 404 })
    if (!tokens.some((t) => auth === `Bearer ${t}`)) return new Response('{"message":"Not Found"}', { status: 404 })
    const p = u.pathname.slice(prefix.length)
    if (p === '') return Response.json({ private: isPrivate })
    if (p === '/git/trees/HEAD') {
      if (!files.size) return new Response('{"message":"Git Repository is empty."}', { status: 409 })
      return Response.json({ tree: [...files.keys()].map((path) => ({ path, sha: shaOf.get(path), type: 'blob' })) })
    }
    if (p.startsWith('/git/blobs/')) {
      if (failBlobAfter-- <= 0) throw new TypeError('Failed to fetch')
      const sha = p.slice('/git/blobs/'.length)
      return blobs.has(sha) ? Response.json({ content: Buffer.from(blobs.get(sha)).toString('base64') }) : new Response('{}', { status: 404 })
    }
    if (p.startsWith('/contents/')) {
      const path = decodeURIComponent(p.slice('/contents/'.length))
      if ((init.method ?? 'GET') === 'GET') {
        return files.has(path) ? Response.json({ content: Buffer.from(files.get(path)).toString('base64') }) : new Response('{}', { status: 404 })
      }
      if (raceOnce > 0) { raceOnce--; return new Response('{"message":"is at x but expected y"}', { status: 409 }) }
      if (files.has(path)) return new Response('{"message":"sha wasn\'t supplied"}', { status: 422 })
      const text = Buffer.from(JSON.parse(init.body).content, 'base64').toString()
      const sha = `b${++blobSeq}`
      files.set(path, text); blobs.set(sha, text); shaOf.set(path, sha); writes.push(path)
      return new Response('{}', { status: 201 })
    }
    return new Response('{}', { status: 404 })
  }
  return { files, writes, fetcher, setOnline: (v) => { online = v }, race: (n) => { raceOnce = n },
    failBlobsAfter: (n) => { failBlobAfter = n } }
}

const memPersist = (m = new Map()) => ({ get: (k) => m.get(k) ?? null, set: (k, v) => m.set(k, v), m })
const client = (gh, token = 'good', persist = memPersist()) => {
  const store = new site.EventStore(persist)
  const sync = new site.Sync(store, new site.GitHubTransport({ owner: 'matthlh', repo: 'progress', token }, gh.fetcher))
  return { store, sync }
}
let seq = 0
const review = (qid, grade, extra = {}) => ({ v: 1, kind: 'review', id: `e${++seq}`, session: 's1', at: `2026-11-06T10:00:${String(seq).padStart(2, '0')}Z`,
  day: '2026-11-06', device: 'phone', qid, course: 'STAT251', grade, conf: 3, ticks: [grade !== 'X'], rubric: 'Key', qhash: 'q', khash: 'k', ...extra })
const undo = (target) => ({ v: 1, kind: 'undo', id: `u${++seq}`, at: `2026-11-06T11:00:${String(seq).padStart(2, '0')}Z`, day: '2026-11-06', device: 'laptop', target })

// ---- the grading rule ---------------------------------------------------------------------------
test('rubric grading follows the core rule for Key and Steps and the count rule for Parts', () => {
  const r = site.parseRubric('Key:\n1. core\n2. reason\n\nwhy')
  assert.deepEqual([r.kind, r.points, r.rest], ['Key', ['core', 'reason'], 'why'])
  assert.equal(site.gradeFromTicks('Key', [false, true]), 'X')
  assert.equal(site.gradeFromTicks('Key', [true, false]), '~')
  assert.equal(site.gradeFromTicks('Steps', [true, true]), 'O')
  assert.equal(site.gradeFromTicks('Parts', [false, true, true, false]), '~')
  assert.equal(site.gradeFromTicks('Parts', [false, false, true]), 'X')
  assert.equal(site.gradeFromTicks('Parts', [true, true, true]), 'O')
  assert.equal(site.parseRubric('Just prose, no key.'), null)
})

// ---- the schedule matches the quiz scripts exactly ------------------------------------------------
test('the site schedule equals quizlib.card_state on every real history', () => {
  const PY = `
import json, sys
sys.path.insert(0, sys.argv[1])
import quizlib as L
st = L.load_state(); rows = L.load_ledger()[1]; cal = L.load_calendar(); qs = L.load_questions()
by, _ = L.bank_by_topic(rows, qs)
row_of = {q["id"]: r for r in rows for q in by.get(r["idx"], [])}
out = {}
for qid, rec in st["questions"].items():
    r = row_of.get(qid)
    cs = L.card_state(rec.get("history", []), r, cal)
    exams = sorted({e["date"].isoformat() for e in cal.get(r["course"], {}).get("exams", []) if L.covers(e, L.held(r, cal))}) if r else []
    out[qid] = dict(hist=rec.get("history", []), exams=exams, py=[cs[0], cs[1], cs[2].isoformat()] if cs else None)
print(json.dumps(out))`
  const py = spawnSync('python3', ['-B', '-c', PY, join(root, '.claude', 'skills', 'quiz-me', 'scripts')], { encoding: 'utf8', maxBuffer: Infinity })
  assert.equal(py.status, 0, py.stderr)
  const cases = JSON.parse(py.stdout)
  let n = 0
  for (const [qid, c] of Object.entries(cases)) {
    const attempts = c.hist.map((e) => ({ day: e[0], grade: e[1], conf: e[2]?.conf }))
    const ts = site.cardState(attempts, c.exams)
    assert.deepEqual(ts ? [ts.streak, ts.gap, ts.next] : null, c.py, `question ${qid}`)
    n++
  }
  assert.ok(n > 100, `only ${n} histories compared`)
})

test('same-day attempts count once at the worst grade, and an exam caps the next date', () => {
  const s = site.cardState([{ day: '2026-11-01', grade: 'X' }, { day: '2026-11-01', grade: 'O', conf: 3 }], [])
  assert.deepEqual(s, { streak: 0, gap: 1, next: '2026-11-02' })
  const capped = site.cardState([{ day: '2026-11-10', grade: 'O', conf: 3 }], ['2026-11-20'])
  assert.equal(capped.next, '2026-11-16')
})

// ---- sync ------------------------------------------------------------------------------------------
test('client A reviews, client B sees the event and the new schedule', async () => {
  const gh = fakeGitHub()
  const A = client(gh), B = client(gh)
  const e = review('q1', 'O')
  A.store.add(e)
  assert.equal(A.sync.status.state, 'saved')
  await A.sync.run()
  assert.equal(A.sync.status.state, 'saved')
  assert.deepEqual(A.store.pendingIds(), [])
  assert.equal(B.store.has(e.id), false)
  await B.sync.run()
  assert.ok(B.store.has(e.id))
  assert.equal(site.scheduleFor('q1', [], B.store.all(), []).next, '2026-11-13')
})

test('a retried write is not recorded twice', async () => {
  const gh = fakeGitHub()
  const A = client(gh)
  const e = review('q1', 'X')
  A.store.add(e)
  await A.sync.run()
  // the device never heard back: it still thinks the event is pending and sends it again
  const again = new site.EventStore(memPersist()); again.add(e)
  await new site.Sync(again, new site.GitHubTransport({ owner: 'matthlh', repo: 'progress', token: 'good' }, gh.fetcher)).run()
  assert.equal(gh.writes.length, 1)
  assert.deepEqual(again.pendingIds(), [])
  const B = client(gh); await B.sync.run()
  assert.equal(B.store.all().filter((x) => x.id === e.id).length, 1)
})

test('offline: events wait in order, the status says offline, and reconnecting sends them', async () => {
  const gh = fakeGitHub()
  const A = client(gh)
  gh.setOnline(false)
  const e1 = review('q1', 'O'), e2 = review('q2', '~'), e3 = review('q3', 'X')
  for (const e of [e1, e2, e3]) A.store.add(e)
  await A.sync.run()
  assert.equal(A.sync.status.state, 'offline')
  assert.equal(A.sync.status.pending, 3)
  gh.setOnline(true)
  await A.sync.run()
  assert.equal(A.sync.status.state, 'saved')
  assert.deepEqual(gh.writes, [e1, e2, e3].map((e) => `events/2026-11-06/${e.id}.json`))
})

test('two clients writing at once lose nothing, through a write race', async () => {
  const gh = fakeGitHub()
  const A = client(gh), B = client(gh)
  const a = [review('q1', 'O'), review('q2', 'O')], b = [review('q1', 'X'), review('q3', '~')]
  a.forEach((e) => A.store.add(e)); b.forEach((e) => B.store.add(e))
  gh.race(2)
  await Promise.all([A.sync.run(), B.sync.run()])
  await Promise.all([A.sync.run(), B.sync.run()])
  const ids = [...a, ...b].map((e) => e.id).sort()
  assert.deepEqual(A.store.all().map((e) => e.id).sort(), ids)
  assert.deepEqual(B.store.all().map((e) => e.id).sort(), ids)
  assert.equal(gh.files.size, 4)
})

test('an undo propagates, and the undone grade stops counting on both devices', async () => {
  const gh = fakeGitHub()
  const A = client(gh), B = client(gh)
  const e = review('q1', 'X')
  A.store.add(e); await A.sync.run(); await B.sync.run()
  assert.equal(site.scheduleFor('q1', [], B.store.all(), []).next, '2026-11-07')
  B.store.add(undo(e.id)); await B.sync.run(); await A.sync.run()
  assert.equal(site.scheduleFor('q1', [], A.store.all(), []), null)
  assert.equal(site.liveReviews(A.store.all()).length, 0)
  // the review event itself is kept: evidence is never deleted
  assert.ok(A.store.has(e.id))
})

test('an event already imported into the public history counts once', () => {
  const e = review('q1', 'O')
  const pub = [['2026-11-06', 'O', { event_id: e.id, conf: 3 }]]
  assert.equal(site.attemptsFor('q1', pub, [e]).length, 1)
  assert.equal(site.attemptsFor('q1', pub, [e, undo(e.id)]).length, 0)
})

test('another token cannot read or write the repository', async () => {
  const gh = fakeGitHub()
  const A = client(gh); A.store.add(review('q1', 'O')); await A.sync.run()
  const X = client(gh, 'someone-else')
  X.store.add(review('q9', 'O'))
  await X.sync.run()
  assert.equal(X.sync.status.state, 'error')
  assert.equal(X.store.all().length, 1)       // saw nothing of A's
  assert.equal(gh.files.size, 1)              // wrote nothing
})

// ---- privacy: what the public site ships ----------------------------------------------------------
test('no review event, attempt or token is part of the published files', () => {
  const ignore = readFileSync(join(root, '.gitignore'), 'utf8')
  assert.match(ignore, /^routines\/\*$/m)
  const allowed = ignore.split('\n').filter((l) => l.startsWith('!routines/'))
  assert.deepEqual(allowed.sort(), ['!routines/quiz-state.json', '!routines/review-plan.json'])
  // The plan carries ids, ledger row keys and dates, nothing else: no answer, attempt or note can hide in it.
  const plan = JSON.parse(readFileSync(join(root, 'routines', 'review-plan.json'), 'utf8'))
  assert.deepEqual(Object.keys(plan).sort(), ['as_of', 'cards', 'due', 'queue', 'rows'])
  assert.ok(Number.isInteger(plan.due) && plan.due >= 0 && plan.due <= plan.queue.length)
  const ledger = readFileSync(join(root, 'ledger.md'), 'utf8')
  const id = /^[0-9a-f]{8,16}$/, day = /^\d{4}-\d{2}-\d{2}$/
  assert.match(plan.as_of, day)
  for (const [key, exams] of Object.entries(plan.rows)) {
    assert.ok(ledger.includes(key.slice(key.indexOf('|') + 1)), `row key ${key} is not a ledger topic`)
    assert.ok(exams.every((d) => day.test(d)))
  }
  for (const [q, key] of Object.entries(plan.cards)) assert.ok(id.test(q) && key in plan.rows, q)
  assert.ok(plan.queue.every((q) => q in plan.cards))
})

// ---- review fixes (2026-11-06) --------------------------------------------------------------------
test('a public repository is refused before anything is written', async () => {
  const gh = fakeGitHub({ isPrivate: false })
  const A = client(gh); A.store.add(review('q1', 'X', { attempt: 'private text' }))
  await A.sync.run()
  assert.equal(A.sync.status.state, 'error')
  assert.equal(gh.files.size, 0)
  assert.deepEqual(A.store.pendingIds().length, 1)
})

test('two tabs sharing one storage never drop each other\'s unsent grades', async () => {
  const shared = new Map()
  const tabA = new site.EventStore(memPersist(shared)), tabB = new site.EventStore(memPersist(shared))
  const a1 = review('q1', 'O'), a2 = review('q2', 'X'), b1 = review('q3', '~')
  tabA.add(a1); tabA.add(a2); tabB.add(b1)
  const after = new site.EventStore(memPersist(shared))
  assert.deepEqual(after.all().map((e) => e.id).sort(), [a1.id, a2.id, b1.id].sort())
  assert.deepEqual(after.pendingIds().sort(), [a1.id, a2.id, b1.id].sort())
})

test('a pull cut off part-way keeps the events it already read', async () => {
  const gh = fakeGitHub()
  const A = client(gh)
  for (const q of ['q1', 'q2', 'q3']) A.store.add(review(q, 'O'))
  await A.sync.run()
  const B = client(gh)
  gh.failBlobsAfter(2)
  await B.sync.run()
  assert.equal(B.sync.status.state, 'offline')
  gh.failBlobsAfter(Infinity)
  await B.sync.run()
  assert.equal(B.store.all().length, 3)
})

test('a grade saved during a pass is sent by a follow-up pass, and the status waits for it', async () => {
  const gh = fakeGitHub()
  const A = client(gh)
  const e = review('q1', 'O')
  A.store.add(e)
  const first = A.sync.run()
  const u = undo(e.id)
  A.store.add(u)
  void A.sync.run()
  await first
  for (let i = 0; i < 20 && A.store.pendingIds().length; i++) await new Promise((r) => setTimeout(r, 5))
  assert.deepEqual(A.store.pendingIds(), [])
  assert.ok([...gh.files.keys()].some((p) => p.endsWith(`${u.id}.json`)))
  assert.equal(A.sync.status.state, 'saved')
})

test('the queue drops a card graded on the site and not imported yet, and brings back a miss the next day', () => {
  const plan = { as_of: '2026-11-07', rows: { 'STAT251|T': [] }, cards: { qA: 'STAT251|T', qB: 'STAT251|T', qN: 'STAT251|T' }, queue: ['qA', 'qB', 'qN'], due: 2 }
  const cards = new Map([['qA', { course: 'STAT251' }], ['qB', { course: 'STAT251' }], ['qN', { course: 'STAT251' }]])
  const quiz = { questions: { qA: { history: [['2026-11-01', 'X']] }, qB: { history: [['2026-11-01', 'X']] } } }
  const ev = [review('qA', 'O', { day: '2026-11-06' }), review('qB', 'X', { day: '2026-11-06' })]
  const q = site.dueToday(plan, cards, ev, null, quiz, '2026-11-07')
  assert.deepEqual([...q], ['qB', 'qN'])          // qA's O on Nov 6 puts it out to Nov 13; qB's X brings it back Nov 7
  assert.equal(q.due, 1)
})

test('a stale plan gains the asked cards that came due after it was written', () => {
  const plan = { as_of: '2026-11-06', rows: { 'STAT251|T': [] }, cards: { qA: 'STAT251|T', qB: 'STAT251|T' }, queue: [], due: 0 }
  const cards = new Map([['qA', { course: 'STAT251' }], ['qB', { course: 'STAT251' }]])
  const quiz = { questions: { qA: { history: [['2026-11-06', 'X']] } } }
  assert.deepEqual([...site.dueToday(plan, cards, [], null, quiz, '2026-11-06')], [])
  const later = site.dueToday(plan, cards, [], null, quiz, '2026-11-08')
  assert.deepEqual([...later], ['qA'])            // due Nov 7; qB was never asked, so no date makes it due
  assert.equal(later.due, 1)
})
