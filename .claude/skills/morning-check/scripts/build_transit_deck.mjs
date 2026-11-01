#!/usr/bin/env node
// build_transit_deck.mjs — build a quiz page from a quiz_pick.py session: the morning transit deck (morning-check §7
// step 2) and any quiz he asks for as an artifact.
//   node build_transit_deck.mjs --date 2026-10-07 [--brief routines/runs/2026-10-07-brief.html] [--title "Transit Deck"]
//                               [--session PATH] [--out PATH]
// Each card: he answers in his head, taps how sure he is (1-3), which reveals the answer's rubric, its Key: list (a
// short question) or its Steps: list (a long problem). The first point is the core. He ticks what his answer had:
// core not ticked is X, every point ticked is O, anything between is ~ (Matt, 2026-11-01). A miss can take a cause, and
// a Bad question flag takes a card out of grading. Every tap saves grades/<date> through the artifact db; reopening the
// page restores the taps. --brief adds the Brief ↗ overlay (an HTML fragment). Publish the result with the Artifact tool.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..', '..');
const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => a.startsWith('--') ? [a.slice(2), all[i + 1]] : []).filter(Boolean));
const date = args.date || new Date().toISOString().slice(0, 10);
const title = args.title || 'Transit Deck';
const sessionPath = args.session || path.join(ROOT, 'routines', 'transit-session.json');
const outPath = args.out || path.join(ROOT, 'routines', 'transit-deck.html');
const { marked } = await import(path.join(ROOT, 'notes-app', 'node_modules', 'marked', 'lib', 'marked.esm.js'));
marked.setOptions({ gfm: true, breaks: true });

// The rubric opens every bank answer: "Key:" (a short question) or "Steps:" (a long problem), then numbered one-line
// points, then a blank line and the explanation. A question without one stops the build: fix the bank.
function rubric(md) {
  const m = md.match(/^(Key|Steps):\n((?:\d+\.\s.*(?:\n|$))+)\s*([\s\S]*)$/);
  return m ? { points: m[2].trim().split('\n').map((l) => l.replace(/^\d+\.\s+/, '')), rest: m[3].trim() } : null;
}

// --- the three-step math order: $$ spans out, markdown, spans back (display spans with <br>) ---
function render(md) {
  const spans = [];
  const stripped = md.replace(/\$\$[\s\S]+?\$\$/g, (m) => { spans.push(m); return `MATHSPAN${spans.length - 1}END`; });
  let html = marked.parse(stripped).trim();
  html = html.replace(/MATHSPAN(\d+)END/g, (_, n) => {
    const m = spans[+n];
    const inner = m.slice(2, -2);
    return /\n/.test(inner.trim()) ? '$$' + inner.trim().replace(/\n/g, '<br>') + '$$' : '$$' + inner + '$$';
  });
  // a lone paragraph needs no <p>
  if (/^<p>[\s\S]*<\/p>$/.test(html) && !html.slice(3, -4).includes('<p>')) html = html.slice(3, -4);
  return html;
}

const session = JSON.parse(fs.readFileSync(sessionPath, 'utf8'));
const items = session.items || session;
const tagOf = (c) => /STAT/.test(c) ? 'stat' : /CPSC/.test(c) ? 'cpsc' : /PHIL ?321/.test(c) ? 'phil321' : /PHIL/.test(c) ? 'phil385' : 'asia';
const QUESTIONS = items.map((it, i) => {
  const course = (it.label || it.course || '').replace(/\s+/g, ' ').trim();
  const r = rubric(it.a || '');
  if (!r) { console.error(`item ${i + 1} (${course}, ${it.file}:${it.line}) has no Key: or Steps: list: fix the bank answer first`); process.exit(1); }
  const q = { course, tag: tagOf(course), verb: it.type || '', q: render(it.q_display || it.q || ''), points: r.points.map(render),
              long: !!it.long, work: r.rest ? render(r.rest) : '' };
  if (it.src_url) { q.src = it.src_url; q.srcTitle = it.src_title || 'Lecture notes'; }
  return q;
});
const courses = [...new Set(QUESTIONS.map((q) => q.course.replace(' ', '')))].join(' · ');
const brief = args.brief ? fs.readFileSync(path.resolve(ROOT, args.brief), 'utf8') : null;
const niceDate = new Date(date + 'T12:00:00').toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' }).replace(/\.,?/g, '').replace(',', '');
const head = fs.readFileSync(path.join(HERE, 'transit-deck.head.html'), 'utf8').replace('<title>Transit Deck</title>', `<title>${title}</title>`);

const body = `
${brief ? '<button class="brief-btn mono" id="brief-open">Brief ↗</button>' : ''}

<header>
  <div class="eyebrow">
    <span class="mono" id="course-count">${courses}</span>
    <span class="mono" id="progress-label">1 / ${QUESTIONS.length}</span>
  </div>
  <div class="dots" id="dots"></div>
  <div class="tally mono" id="tally"></div>
</header>

<main id="deck-main">
  <div class="card" id="card">
    <div class="card-inner" id="card-inner"></div>
  </div>
</main>

<nav id="deck-nav">
  <button class="nav-btn mono" id="prev-btn">← Prev</button>
  <button class="nav-btn mono primary" id="next-btn">Pick 1, 2 or 3</button>
</nav>

<div class="finish" id="finish" hidden>
  <h1>Done</h1>
  <p class="hint" id="sync-status">Saving your grades…</p>
  <div class="tally mono" id="finish-tally"></div>
  <div id="grade-rows"></div>
  <div id="flagged"></div>
  <div id="reread"></div>
  <div class="copy-box">
    <input class="copy-field mono" id="copy-field" readonly value="" />
    <button class="copy-btn mono" id="copy-btn">Copy</button>
  </div>
  <p class="hint">Only if the save failed: paste this line to Claude.</p>
  <button class="nav-btn mono" id="back-btn" style="align-self:flex-start;">← Back</button>
</div>
${brief ? `
<div class="brief-overlay" id="brief-overlay" hidden>
  <div class="brief-panel">
    <div class="brief-head">
      <div>
        <div class="brief-eyebrow mono">Morning check</div>
        <h2 class="brief-date">${niceDate}</h2>
      </div>
      <button class="close-btn mono" id="brief-close" aria-label="Close brief">&#10005;</button>
    </div>
${brief}
  </div>
</div>` : ''}

<script>
  // $$…$$ inside a line is inline math; a $$ … $$ span containing a line break (or <br>) is a display equation.
  function mathify(html) {
    if (!window.katex || !html) return html;
    return html.replace(/\\$\\$([\\s\\S]+?)\\$\\$([,.;:!?)]*)/g, (m, tex, punct) => {
      const raw = tex.replace(/<br\\s*\\/?>/gi, '\\n');
      const clean = raw.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').trim();
      const display = /\\n/.test(raw);
      let out;
      try { out = katex.renderToString(clean, { output: 'mathml', displayMode: display, throwOnError: false, strict: 'ignore' }); }
      catch (e) { return m; }
      return display ? out + punct : \`<span class="mx">\${out}\${punct}</span>\`;
    });
  }
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  // One item per session question: q, each point and the explanation are rendered markdown with $$ spans kept for mathify.
  const QUESTIONS = ${JSON.stringify(QUESTIONS, null, 1)};
  const DATE_ID = '${date}';
  const N = QUESTIONS.length;
  // The first point is the core (Matt, 2026-11-01): core not ticked is X, every point ticked is O, anything between is ~.
  const gradeOf = (t) => (!t[0] ? 'X' : t.every(Boolean) ? 'O' : '~');
  const CONFS = [[1, 'Guess'], [2, 'Think so'], [3, 'Sure']];
  const CAUSES = [['c', 'concept'], ['f', 'forgot'], ['m', 'misread'], ['k', 'careless'], ['s', 'slow']];

  let idx = 0;
  let revealed = false;
  let ticks = QUESTIONS.map((q) => Array(q.points.length).fill(false));
  const shown = Array(N).fill(false);     // a card has a grade once its answer was revealed
  const conf = Array(N).fill(null);       // 1 guess, 2 think so, 3 sure, tapped before the answer shows
  const cause = Array(N).fill(null);      // c f m k s, on a ~ or X
  const flagged = Array(N).fill(false);   // Bad question: not graded, fixed by Claude at grading
  const gradeAt = (i) => (flagged[i] ? '-' : shown[i] ? gradeOf(ticks[i]) : null);
  const labelOf = (i) => { const g = gradeAt(i); return g === 'X' ? 'core missed' : g === '~' ? 'partial'
    : g === 'O' ? (conf[i] === 3 ? 'right · climbs' : 'right · holds, you were not sure') : g === '-' ? 'not graded' : ''; };
  // quiz_grade.py tokens: grade, confidence, then /cause on a ~ or X ("1:O3 2:X2/c 3:-").
  const tokenAt = (i) => { const g = gradeAt(i); if (!g) return null; if (g === '-') return \`\${i + 1}:-\`;
    return \`\${i + 1}:\${g}\${conf[i] || ''}\${g !== 'O' && cause[i] ? '/' + cause[i] : ''}\`; };
  const buildReplyString = () => QUESTIONS.map((_, i) => tokenAt(i)).filter(Boolean).join(' ');

  const dotsEl = document.getElementById('dots');
  const progressLabel = document.getElementById('progress-label');
  const cardInner = document.getElementById('card-inner');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const deckMain = document.getElementById('deck-main');
  const deckNav = document.getElementById('deck-nav');
  const headerEl = document.querySelector('header');
  const finishEl = document.getElementById('finish');
  QUESTIONS.forEach(() => { const d = document.createElement('div'); d.className = 'dot'; dotsEl.appendChild(d); });

  let db = null;
  const dbReady = (async () => {
    try { db = (window.claude && window.claude.use) ? await window.claude.use('db') : null; } catch (e) { db = null; }
    return db;
  })();
  let restored = false;                   // nothing is saved until the saved doc, if any, has been read back
  async function persistGrades() {
    await dbReady;
    if (!db || !restored) return false;
    try {
      await db.doc(\`grades/\${DATE_ID}\`).set({
        date: DATE_ID,
        items: QUESTIONS.map((item, i) => ({ idx: i + 1, course: item.course, grade: gradeAt(i), conf: conf[i],
          cause: ['~', 'X'].includes(gradeAt(i)) ? cause[i] : null, flagged: flagged[i], ticks: ticks[i] })),
        replyString: buildReplyString(),
        updatedAt: new Date().toISOString(),
      });
      return true;
    } catch (e) { return false; }
  }
  // Pick up where he left off: the saved doc holds every revealed card's ticks, confidence, cause and flag.
  dbReady.then(async (d) => {
    if (d) {
      try {
        const snap = await d.doc(\`grades/\${DATE_ID}\`).get();
        if (snap.exists && !shown.some(Boolean) && !flagged.some(Boolean)) {
          (snap.data().items || []).forEach((it, i) => {
            if (i >= N || !it.grade) return;
            flagged[i] = !!it.flagged; shown[i] = true; conf[i] = it.conf || null; cause[i] = it.cause || null;
            if (Array.isArray(it.ticks) && it.ticks.length === ticks[i].length) ticks[i] = it.ticks.map(Boolean);
          });
          const next = shown.indexOf(false);
          idx = next === -1 ? N - 1 : next; revealed = shown[idx];
          renderCard();
        }
      } catch (e) { /* unreadable: start fresh, saving over it */ }
    }
    restored = true;
  });

  function renderTally(el) {
    const gs = QUESTIONS.map((_, i) => gradeAt(i));
    const n = (g) => gs.filter((x) => x === g).length;
    el.innerHTML = \`<span><b>\${gs.filter(Boolean).length}</b>/\${N} done</span><span>O <b>\${n('O')}</b></span>\`
      + \`<span>~ <b>\${n('~')}</b></span><span>X <b>\${n('X')}</b></span>\${n('-') ? \`<span>flagged <b>\${n('-')}</b></span>\` : ''}\`;
  }
  function renderDots() {
    [...dotsEl.children].forEach((d, i) => {
      d.classList.toggle('active', i === idx);
      d.classList.toggle('done', !!gradeAt(i));
      const g = gradeAt(i);
      if (g) d.dataset.g = g; else delete d.dataset.g;
    });
    renderTally(document.getElementById('tally'));
  }

  function renderCard() {
    const item = QUESTIONS[idx];
    progressLabel.textContent = \`\${idx + 1} / \${N}\`;
    renderDots();
    const confName = conf[idx] ? CONFS[conf[idx] - 1][1] : '';
    let html = \`
      <span class="tag \${item.tag}">\${item.course}</span>\${item.long ? '<span class="long-badge mono">Steps only</span>' : ''}
      <div class="q-num mono">Question \${idx + 1} <span class="verb">· \${item.verb}</span>\${revealed && confName ? \`<span class="conf-chip">· \${confName}</span>\` : ''}</div>
      <div class="q-text">\${mathify(item.q)}</div>
      \${item.long ? '<div class="long-note">Give the method and the setup line for each part. Skip the arithmetic.</div>' : ''}
    \`;
    if (revealed) {
      const t = ticks[idx];
      html += \`
        <hr class="divider" />
        <div class="points-label mono">\${item.long ? 'Steps: tick each one you named with the right setup' : 'Key: tick each point your answer had'}</div>
        <div class="score-bar"><div class="score-fill" id="score-fill"></div></div>
        <ul class="points">\${item.points.map((p, k) => \`
          <li class="point\${k === 0 ? ' core' : ''}\${t[k] ? ' ticked' : ''}" data-k="\${k}" role="checkbox" aria-checked="\${t[k]}"><span class="box">\${t[k] ? '✓' : ''}</span><div class="p-text">\${k === 0 && item.points.length > 1 ? '<span class="core-tag mono">Core: miss it and the card is X</span>' : ''}\${mathify(p)}</div></li>\`).join('')}
        </ul>
        <div class="tick-row"><div class="tick-count mono" id="tick-count"></div>
          <button class="mini-btn mono" id="tick-all">All</button><button class="mini-btn mono" id="tick-none">None</button></div>
        <div id="cause-box"></div>
        \${item.work ? \`<details class="work"><summary class="mono">\${item.long ? 'Full working' : 'Explanation'}</summary><div class="a-text">\${mathify(item.work)}</div></details>\` : ''}
        \${item.src ? \`<a class="src-link" href="\${esc(item.src)}" target="_blank" rel="noopener">\${esc(item.srcTitle || 'Lecture notes')}</a>\` : ''}
        <button class="flag-btn mono\${flagged[idx] ? ' on' : ''}" id="flag-btn">\${flagged[idx] ? 'Flagged: not graded' : 'Bad question'}</button>
        \${flagged[idx] ? '<div class="flag-note">This card is left out of your grades. Claude rewrites it when you say grade.</div>' : ''}
      \`;
    } else {
      html += \`<div class="conf-label mono">Answer it in your head or on paper, then: how sure are you?</div>
        <div class="conf-row">\${CONFS.map(([n, label]) => \`<button class="conf-btn mono" data-conf="\${n}"><b>\${n}</b>\${label}</button>\`).join('')}</div>\`;
    }
    cardInner.innerHTML = html;
    cardInner.scrollTop = 0;
    if (revealed) {
      renderCount();
      cardInner.querySelectorAll('.point').forEach((li) => li.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const k = +li.dataset.k;
        ticks[idx][k] = !ticks[idx][k];
        if (navigator.vibrate) navigator.vibrate(8);
        li.classList.toggle('ticked', ticks[idx][k]);
        li.querySelector('.box').textContent = ticks[idx][k] ? '✓' : '';
        li.setAttribute('aria-checked', ticks[idx][k]);
        renderCount(); persistGrades();
      }));
      const setAll = (v) => () => { ticks[idx].fill(v); renderCard(); persistGrades(); };
      document.getElementById('tick-all').addEventListener('click', setAll(true));
      document.getElementById('tick-none').addEventListener('click', setAll(false));
      document.getElementById('flag-btn').addEventListener('click', () => { flagged[idx] = !flagged[idx]; renderCard(); persistGrades(); });
    } else {
      cardInner.querySelectorAll('.conf-btn').forEach((b) => b.addEventListener('click', () => reveal(+b.dataset.conf)));
    }
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = !revealed;
    nextBtn.textContent = revealed ? (idx === N - 1 ? 'Finish →' : 'Next →') : 'Pick 1, 2 or 3';
  }
  // A miss (~ or X) asks for its cause; the row goes away once the ticks reach O.
  function renderCause() {
    const box = document.getElementById('cause-box');
    if (!box) return;
    if (!['~', 'X'].includes(gradeAt(idx))) { box.innerHTML = ''; return; }
    box.innerHTML = \`<div class="cause-label mono">Why the miss? (optional)</div>
      <div class="cause-row">\${CAUSES.map(([c, w]) => \`<button class="cause-btn mono\${cause[idx] === c ? ' sel' : ''}" data-c="\${c}">\${c} · \${w}</button>\`).join('')}</div>\`;
    box.querySelectorAll('.cause-btn').forEach((b) => b.addEventListener('click', () => {
      cause[idx] = cause[idx] === b.dataset.c ? null : b.dataset.c;
      renderCause(); persistGrades();
    }));
  }
  function renderCount() {
    const el = document.getElementById('tick-count');
    if (!el) return;
    const t = ticks[idx];
    const n = t.filter(Boolean).length;
    el.innerHTML = flagged[idx] ? 'not graded' : \`<b>\${n}</b> of \${t.length} · <b>\${gradeOf(t)}</b> · \${labelOf(idx)}\`;
    const f = document.getElementById('score-fill');
    if (f) { f.style.width = (100 * n / t.length) + '%'; f.dataset.g = gradeOf(t); }
    renderCause();
    renderDots();
  }

  function reveal(c) { conf[idx] = c; revealed = true; shown[idx] = true; renderCard(); persistGrades(); }
  function goNext() {
    if (!revealed) return;
    if (idx < N - 1) { idx += 1; revealed = shown[idx]; renderCard(); }
    else showFinish();
  }
  function goPrev() { if (idx === 0) return; idx -= 1; revealed = shown[idx]; renderCard(); }
  document.addEventListener('keydown', (e) => {
    if (!finishEl.hidden || e.target.closest('input, a, button, summary')) return;
    if (!revealed && ['1', '2', '3'].includes(e.key)) reveal(+e.key);
    else if (e.key === 'ArrowRight') goNext();
    else if (e.key === 'ArrowLeft') goPrev();
  });
  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  function backTo(i) {
    finishEl.hidden = true; headerEl.hidden = false; deckMain.hidden = false; deckNav.hidden = false;
    idx = i; revealed = shown[idx]; renderCard();
  }
  async function showFinish() {
    deckMain.hidden = true; deckNav.hidden = true; headerEl.hidden = true; finishEl.hidden = false;
    const rowsEl = document.getElementById('grade-rows');
    rowsEl.innerHTML = '';
    QUESTIONS.forEach((item, i) => {
      const row = document.createElement('div');
      row.className = 'grade-row';
      const g = gradeAt(i);
      const chip = g && g !== '-' ? \`<span class="hint mono" style="margin-right:6px">\${ticks[i].filter(Boolean).length}/\${ticks[i].length}</span><span class="g-btn sel" data-grade="\${g}" style="cursor:default;">\${g}</span>\`
        : \`<span class="hint">\${g === '-' ? 'flagged' : 'not revealed'}</span>\`;
      row.innerHTML = \`<div class="gq"><span class="num mono">\${i + 1}.</span>\${item.course}\${conf[i] ? \` <span class="hint mono">· conf \${conf[i]}\${['~', 'X'].includes(g) && cause[i] ? ' · ' + cause[i] : ''}</span>\` : ''}</div><div class="grade-btns">\${chip}</div>\`;
      row.addEventListener('click', () => backTo(i));
      rowsEl.appendChild(row);
    });
    renderTally(document.getElementById('finish-tally'));
    document.getElementById('copy-field').value = buildReplyString();
    const fl = QUESTIONS.map((q, i) => ({ q, i })).filter(({ i }) => flagged[i]);
    document.getElementById('flagged').innerHTML = fl.length ? '<h2 class="rr-h mono">Flagged for Claude to fix</h2>'
      + fl.map(({ q, i }) => \`<div class="rr-card"><span class="tag \${q.tag}">\${q.course}</span> <span class="mono hint">question \${i + 1}</span></div>\`).join('') : '';
    // Reread: every graded card short of O, with its notes page and the points he did not tick.
    const reread = QUESTIONS.map((q, i) => ({ q, i })).filter(({ i }) => ['~', 'X'].includes(gradeAt(i)));
    document.getElementById('reread').innerHTML = reread.length ? '<h2 class="rr-h mono">Reread</h2>' + reread.map(({ q, i }) => \`
      <div class="rr-card"><div class="rr-top"><span class="tag \${q.tag}">\${q.course}</span><span class="mono hint">\${ticks[i].filter(Boolean).length}/\${ticks[i].length} · \${labelOf(i)}</span></div>
        \${q.src ? \`<a class="src-link" style="margin:6px 0" href="\${esc(q.src)}" target="_blank" rel="noopener">\${esc(q.srcTitle || 'Lecture notes')}</a>\` : ''}
        <ul class="rr-list">\${q.points.map((p, k) => ticks[i][k] ? '' : \`<li class="p-text">\${mathify(p)}</li>\`).join('')}</ul></div>\`).join('') : '';
    const open = QUESTIONS.filter((_, i) => !gradeAt(i)).length;
    const saved = await persistGrades();
    document.getElementById('sync-status').textContent = (saved ? 'Saved. Tell Claude "grade it".' : "Couldn't save. Copy the line below and paste it to Claude.")
      + (open ? \` \${open} cards are not revealed yet; tap a row to go back to one.\` : '');
  }

  document.getElementById('back-btn').addEventListener('click', () => backTo(N - 1));
  document.getElementById('copy-btn').addEventListener('click', async () => {
    const val = buildReplyString();
    const btn = document.getElementById('copy-btn');
    try { await navigator.clipboard.writeText(val); }
    catch (e) { const f = document.getElementById('copy-field'); f.removeAttribute('readonly'); f.select(); document.execCommand('copy'); f.setAttribute('readonly', ''); }
    btn.textContent = 'Copied'; btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1400);
  });
  ${brief ? `document.getElementById('brief-open').addEventListener('click', () => { document.getElementById('brief-overlay').hidden = false; });
  document.getElementById('brief-close').addEventListener('click', () => { document.getElementById('brief-overlay').hidden = true; });` : ''}

  renderCard();
</script>

</body>
</html>
`;
fs.writeFileSync(outPath, head + body);
console.log(`wrote ${path.relative(ROOT, outPath)}: ${QUESTIONS.length} questions, ${QUESTIONS.reduce((n, q) => n + q.points.length, 0)} key points, date ${date}`);
