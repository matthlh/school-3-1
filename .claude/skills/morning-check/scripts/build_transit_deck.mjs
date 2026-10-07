#!/usr/bin/env node
// build_transit_deck.mjs — build routines/transit-deck.html from routines/transit-session.json (morning-check §7 step 2).
//   node build_transit_deck.mjs --date 2026-10-07 --brief routines/runs/2026-10-07-brief.html [--session PATH] [--out PATH]
// The page shows each answer as a checklist of key points (keyPoints below, copied from the skill) and the ticks set the
// grade; it saves grades/<date> through the artifact db exactly as the O/~/X page did. --brief is an HTML fragment
// (the brief sections) placed inside the Brief ↗ overlay. Publish the result with the Artifact tool at the fixed URL.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..', '..');
const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => a.startsWith('--') ? [a.slice(2), all[i + 1]] : []).filter(Boolean));
const date = args.date || new Date().toISOString().slice(0, 10);
const sessionPath = args.session || path.join(ROOT, 'routines', 'transit-session.json');
const outPath = args.out || path.join(ROOT, 'routines', 'transit-deck.html');
const { marked } = await import(path.join(ROOT, 'notes-app', 'node_modules', 'marked', 'lib', 'marked.esm.js'));
marked.setOptions({ gfm: true, breaks: true });

// --- key points (morning-check SKILL.md §7, copied exactly) ---
function keyPoints(md) {
  const units = [];
  let para = null;
  const flush = () => {
    if (para) sentences(para.text).forEach((s, k) =>
      units.push({ text: k ? s : para.num + s, block: false, item: para.item && !k }));
    para = null;
  };
  const lines = md.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    const close = t.startsWith('```') ? '```' : t === '$$' ? '$$' : null;
    if (close || t.startsWith('|')) {
      flush();
      let j = i;
      if (close) do j++; while (j < lines.length && lines[j].trim() !== close);
      else while (j + 1 < lines.length && lines[j + 1].trim().startsWith('|')) j++;
      units.push({ text: lines.slice(i, j + 1).join('\n'), block: true, item: false });
      i = j;
    } else if (!t) flush();
    else {
      const m = t.match(/^(?:[-*+]|(\d+)[.)])\s+(.*)/);
      if (m) { flush(); para = { text: m[2], num: m[1] ? m[1] + '. ' : '', item: true }; }
      else if (para) para.text += ' ' + t;
      else para = { text: t, num: '', item: false };
    }
  }
  flush();
  const out = [];
  for (const u of units) {
    const prev = out[out.length - 1];
    if (prev && (/:$/.test(prev.text) || (!u.block && !u.item && /^\p{Ll}/u.test(u.text)))) {
      prev.text += (prev.block || u.block ? '\n\n' : ' ') + u.text;
      prev.block = prev.block || u.block;
    } else out.push({ ...u });
  }
  return out.map((u) => u.text);
}
function sentences(text) {
  const held = [];
  const s = text.replace(/\$\$[\s\S]+?\$\$|`[^`]+`/g, (m) => `\u0000${held.push(m) - 1}\u0000`);
  const out = [];
  let from = 0;
  for (const m of s.matchAll(/[.!?]["”’')\]*_]*(?=\s+(?:[\p{Lu}\d"“‘*_\u0000]|\((?:[a-hA-H]|[ivx]+|\d)\)))/gu)) {
    const before = s.slice(0, m.index);
    if (/(?:^|[\s"“‘(])\p{Lu}$/u.test(before) || /(?:^|[\s(])(?:e\.g|i\.e|vs|cf|pp?)$/i.test(before)) continue;
    out.push(s.slice(from, m.index + m[0].length));
    from = m.index + m[0].length;
  }
  out.push(s.slice(from));
  return out.map((x) => x.trim().replace(/\u0000(\d+)\u0000/g, (_, n) => held[n])).filter(Boolean);
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
  const points = keyPoints(it.a || '').map(render);
  if (!points.length) { console.error(`item ${i + 1} (${course}) has no key points: fix the bank answer first`); process.exit(1); }
  const q = { course, tag: tagOf(course), verb: it.type || it.verb || '', q: render(it.q_display || it.q || ''), points };
  if (it.src_url) { q.src = it.src_url; q.srcTitle = it.src_title || 'Lecture notes'; }
  return q;
});
const courses = [...new Set(QUESTIONS.map((q) => q.course.replace(' ', '')))].join(' · ');
const briefHtml = args.brief ? fs.readFileSync(path.resolve(ROOT, args.brief), 'utf8') : '<p class="hint">No brief attached.</p>';
const niceDate = new Date(date + 'T12:00:00').toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' }).replace(/\.,?/g, '').replace(',', '');
const head = fs.readFileSync(path.join(HERE, 'transit-deck.head.html'), 'utf8');

const body = `
<button class="brief-btn mono" id="brief-open">Brief ↗</button>

<header>
  <div class="eyebrow">
    <span class="mono" id="course-count">${courses}</span>
    <span class="mono" id="progress-label">1 / ${QUESTIONS.length}</span>
  </div>
  <div class="dots" id="dots"></div>
</header>

<main id="deck-main">
  <div class="card" id="card" tabindex="0" role="button" aria-label="Tap to reveal answer">
    <div class="card-inner" id="card-inner"></div>
  </div>
</main>

<nav id="deck-nav">
  <button class="nav-btn mono" id="prev-btn">← Prev</button>
  <button class="nav-btn mono primary" id="next-btn">Reveal</button>
</nav>

<div class="finish" id="finish" hidden>
  <h1>Deck done</h1>
  <p class="hint" id="sync-status">Saving your grades…</p>
  <div id="grade-rows"></div>
  <div class="copy-box">
    <input class="copy-field mono" id="copy-field" readonly value="" />
    <button class="copy-btn mono" id="copy-btn">Copy</button>
  </div>
  <p class="hint">Fallback only — if the save above worked, just tell Claude "grade my deck" next time and skip typing this.</p>
  <button class="nav-btn mono" id="back-btn" style="align-self:flex-start;">← Back to deck</button>
</div>

<div class="brief-overlay" id="brief-overlay" hidden>
  <div class="brief-panel">
    <div class="brief-head">
      <div>
        <div class="brief-eyebrow mono">Morning check</div>
        <h2 class="brief-date">${niceDate}</h2>
      </div>
      <button class="close-btn mono" id="brief-close" aria-label="Close brief">&#10005;</button>
    </div>
${briefHtml}
  </div>
</div>

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
  // One item per session question: q and each key point are rendered markdown with the $$ spans kept for mathify.
  const QUESTIONS = ${JSON.stringify(QUESTIONS, null, 1)};
  const DATE_ID = '${date}';
  // O when every point is ticked, ~ when some are, X when none are.
  const gradeOf = (ticks) => (ticks.every(Boolean) ? 'O' : ticks.some(Boolean) ? '~' : 'X');

  let idx = 0;
  let revealed = false;
  const ticks = QUESTIONS.map((q) => Array(q.points.length).fill(false));
  const shown = Array(QUESTIONS.length).fill(false);   // a card's grade exists once its answer was revealed
  const gradeAt = (i) => (shown[i] ? gradeOf(ticks[i]) : null);

  const dotsEl = document.getElementById('dots');
  const progressLabel = document.getElementById('progress-label');
  const cardEl = document.getElementById('card');
  const cardInner = document.getElementById('card-inner');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const deckMain = document.getElementById('deck-main');
  const deckNav = document.getElementById('deck-nav');
  const headerEl = document.querySelector('header');
  const finishEl = document.getElementById('finish');

  QUESTIONS.forEach(() => { const d = document.createElement('div'); d.className = 'dot'; dotsEl.appendChild(d); });

  let db = null;
  let dbReady = (async () => {
    try { db = (window.claude && window.claude.use) ? await window.claude.use('db') : null; } catch (e) { db = null; }
    return db;
  })();

  function buildReplyString() {
    return QUESTIONS.map((_, i) => { const g = gradeAt(i); return g ? \`\${i + 1} \${g}\` : null; }).filter(Boolean).join(' ');
  }

  async function persistGrades() {
    await dbReady;
    if (!db) return false;
    try {
      await db.doc(\`grades/\${DATE_ID}\`).set({
        date: DATE_ID,
        items: QUESTIONS.map((item, i) => ({ idx: i + 1, course: item.course, grade: gradeAt(i) })),
        replyString: buildReplyString(),
        updatedAt: new Date().toISOString(),
      });
      return true;
    } catch (e) { return false; }
  }

  function renderDots() {
    [...dotsEl.children].forEach((d, i) => {
      d.classList.toggle('active', i === idx);
      d.classList.toggle('done', i < idx || (i === idx && shown[i]));
    });
  }

  function renderCard() {
    const item = QUESTIONS[idx];
    progressLabel.textContent = \`\${idx + 1} / \${QUESTIONS.length}\`;
    renderDots();
    let html = \`
      <span class="tag \${item.tag}">\${item.course}</span>
      <div class="q-num mono">Question \${idx + 1} <span class="verb">· \${item.verb}</span></div>
      <div class="q-text">\${mathify(item.q)}</div>
    \`;
    if (revealed) {
      const t = ticks[idx];
      html += \`
        <hr class="divider" />
        <div class="points-label mono">Key points: tick each one your answer had</div>
        <ul class="points" id="points">\${item.points.map((p, k) => \`
          <li class="point\${t[k] ? ' ticked' : ''}" data-k="\${k}"><span class="box">\${t[k] ? '✓' : ''}</span><div class="p-text">\${mathify(p)}</div></li>\`).join('')}
        </ul>
        <div class="tick-count mono" id="tick-count"></div>
        \${item.src ? \`<a class="src-link" href="\${esc(item.src)}" target="_blank" rel="noopener">\${esc(item.srcTitle || 'Lecture notes')}</a>\` : ''}
      \`;
    } else {
      html += \`<div class="tap-hint">tap card to reveal answer</div>\`;
    }
    cardInner.innerHTML = html;
    cardInner.scrollTop = 0;
    if (revealed) {
      renderCount();
      cardInner.querySelectorAll('.point').forEach((li) => li.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        e.stopPropagation();
        const k = +li.dataset.k;
        ticks[idx][k] = !ticks[idx][k];
        li.classList.toggle('ticked', ticks[idx][k]);
        li.querySelector('.box').textContent = ticks[idx][k] ? '✓' : '';
        renderCount();
        persistGrades();
      }));
    }
    prevBtn.disabled = idx === 0;
    nextBtn.textContent = revealed ? (idx === QUESTIONS.length - 1 ? 'Finish →' : 'Next →') : 'Reveal';
  }
  function renderCount() {
    const el = document.getElementById('tick-count');
    if (!el) return;
    const t = ticks[idx];
    const n = t.filter(Boolean).length;
    el.innerHTML = \`<b>\${n}</b> of \${t.length} ticked · <b>\${gradeOf(t)}</b>\`;
  }

  function reveal() { revealed = true; shown[idx] = true; renderCard(); persistGrades(); }
  function goNext() {
    if (!revealed) { reveal(); return; }
    if (idx < QUESTIONS.length - 1) { idx += 1; revealed = shown[idx]; renderCard(); }
    else showFinish();
  }
  function goPrev() { if (idx === 0) return; idx -= 1; revealed = shown[idx]; renderCard(); }

  cardEl.addEventListener('click', () => { if (!revealed) goNext(); });
  cardEl.addEventListener('keydown', (e) => {
    if (e.target.closest('a')) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!revealed) goNext(); }
  });
  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  async function showFinish() {
    deckMain.hidden = true; deckNav.hidden = true; headerEl.hidden = true; finishEl.hidden = false;
    const rowsEl = document.getElementById('grade-rows');
    rowsEl.innerHTML = '';
    QUESTIONS.forEach((item, i) => {
      const row = document.createElement('div');
      row.className = 'grade-row';
      const g = gradeAt(i);
      const chip = g ? \`<span class="g-btn sel" data-grade="\${g}" style="cursor:default;">\${g}</span>\` : \`<span class="hint">not revealed</span>\`;
      row.innerHTML = \`<div class="gq"><span class="num mono">\${i + 1}.</span>\${item.course}</div><div class="grade-btns">\${chip}</div>\`;
      rowsEl.appendChild(row);
    });
    document.getElementById('copy-field').value = buildReplyString();
    const statusEl = document.getElementById('sync-status');
    const saved = await persistGrades();
    statusEl.textContent = saved ? 'Saved — next time just tell Claude "grade my deck".'
                                 : "Couldn't save automatically — copy the line below and paste it in chat.";
  }

  document.getElementById('back-btn').addEventListener('click', () => {
    finishEl.hidden = true; headerEl.hidden = false; deckMain.hidden = false; deckNav.hidden = false;
    idx = QUESTIONS.length - 1; revealed = shown[idx]; renderCard();
  });
  document.getElementById('copy-btn').addEventListener('click', async () => {
    const val = buildReplyString();
    const btn = document.getElementById('copy-btn');
    try { await navigator.clipboard.writeText(val); }
    catch (e) { const f = document.getElementById('copy-field'); f.removeAttribute('readonly'); f.select(); document.execCommand('copy'); f.setAttribute('readonly', ''); }
    btn.textContent = 'Copied'; btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1400);
  });
  document.getElementById('brief-open').addEventListener('click', () => { document.getElementById('brief-overlay').hidden = false; });
  document.getElementById('brief-close').addEventListener('click', () => { document.getElementById('brief-overlay').hidden = true; });

  renderCard();
</script>

</body>
</html>
`;
fs.writeFileSync(outPath, head + body);
console.log(`wrote ${path.relative(ROOT, outPath)}: ${QUESTIONS.length} questions, ${QUESTIONS.reduce((n, q) => n + q.points.length, 0)} key points, date ${date}`);
