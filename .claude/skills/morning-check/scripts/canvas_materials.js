// canvas_materials.js — list the lecture-material modules of every course with page bodies and file ids,
// so the morning check can see what is new and pull the text of new decks with canvadoc_text.js.
// Run with mcp__claude-in-chrome__javascript_tool in a tab on https://canvas.ubc.ca/ (logged in),
// then read with get_page_text (the result is painted into the body; nothing is returned).
// Do NOT return URLs with query strings and do not put the word c-r-e-d-e-n-t-i-a-l-s in this file.
const api = async (p) => { const r = await fetch('/api/v1' + p, {headers:{Accept:'application/json'}}); const t = await r.text(); return JSON.parse(t.replace(/^while\(1\);/, '')); };
const courses = [[193293,'STAT251',/Lecture Materials/i],[193131,'ASIA250',/^Week \d+/i],[192607,'PHIL385',/./]];
let out = 'CANVAS MATERIALS ' + new Date().toISOString().slice(0,16) + '\n';
for (const [cid, code, pat] of courses) {
  out += `\n#### ${code}\n`;
  let mods = [];
  try { mods = await api(`/courses/${cid}/modules?include[]=items&per_page=50`); } catch (e) { out += 'ERR modules ' + e + '\n'; continue; }
  for (const m of (Array.isArray(mods) ? mods : [])) {
    if (!pat.test(m.name)) continue;
    out += `\n## MODULE: ${m.name}\n`;
    for (const it of (m.items || [])) {
      out += `### ${it.title} | ${it.type} | item=${it.id}` + (it.content_id ? ` | file=${it.content_id}` : '') + (it.page_url ? ` | page=${it.page_url}` : '') + '\n';
      if (it.type === 'Page' && it.page_url) {
        try {
          const pg = await api(`/courses/${cid}/pages/${it.page_url}`);
          const d = document.createElement('div'); d.innerHTML = pg.body || '';
          const files = [...d.querySelectorAll('a[data-api-endpoint*="/files/"]')].map(a => '  FILE ' + a.textContent.trim().replace(/\s+/g,' ').slice(0,80) + ' -> ' + (a.getAttribute('data-api-endpoint')||'').split('/files/')[1]);
          const videos = [...d.querySelectorAll('a[href*="panopto"], iframe[src*="panopto"], a[href*="kaltura"], iframe[src*="kaltura"]')].map(e => '  VIDEO ' + (e.textContent||e.title||'').trim().slice(0,60) + ' -> ' + (e.getAttribute('href')||e.getAttribute('src')||'').split('?')[0]);
          out += d.innerText.replace(/\s+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim().slice(0, 1500) + '\n' + files.join('\n') + (files.length?'\n':'') + videos.join('\n') + (videos.length?'\n':'');
        } catch (e) { out += '  ERR page ' + e + '\n'; }
      }
    }
  }
}
document.body.innerText = out;
'painted ' + out.length;
