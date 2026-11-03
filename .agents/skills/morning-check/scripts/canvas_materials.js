// canvas_materials.js — list the lecture-material modules of every course with page bodies and file ids,
// so the morning check can see what is new and pull the text of new decks with canvadoc_text.js.
// Run with mcp__claude-in-chrome__javascript_tool in a tab on https://canvas.ubc.ca/ (logged in). Like canvas_fetch.js, it
// paints chunk 0 into the body and returns "total_len=… chunks=N"; read the chunks with get_page_text and window.__chunk(i)
// (this run replaces canvas_fetch.js's, so read those first) until the last line, "END <n> items", arrives.
// get_page_text cuts off at about 50k characters, and canvas_materials_digest.py refuses text without that line.
// Do NOT return URLs with query strings and do not put the word c-r-e-d-e-n-t-i-a-l-s in this file.
// Requests follow canvas_fetch.js's api rule: 404 (a tab the course turned off, a missing page) and 401 "unauthorized"
// (a tab hidden from students) parse as answers; a network error, a body that is not JSON or any other status throws.
// A request that throws paints an ERR line where its result would go (`ERR modules …` under the course, `  ERR page …`
// under the item), and canvas_materials_digest.py names it and exits non-zero.
const api = async (p) => {
  const r = await fetch('/api/v1' + p, {headers:{Accept:'application/json'}}); const t = await r.text();
  let j; try { j = JSON.parse(t.replace(/^while\(1\);/, '')); } catch(e) { throw new Error(`HTTP ${r.status}, not JSON`); }
  if (r.ok || r.status === 404 || (r.status === 401 && j.status === 'unauthorized')) return j;
  throw new Error(`HTTP ${r.status}`);
};
const courses = [[193293,'STAT251',/Lecture Materials/i],[193131,'ASIA250',/^Week \d+/i],[192607,'PHIL385',/./]];
let out = 'CANVAS MATERIALS ' + new Date().toISOString().slice(0,16) + '\n';
let n = 0;   // items painted, for the END line
for (const [cid, code, pat] of courses) {
  out += `\n#### ${code}\n`;
  let mods = [];
  try { mods = await api(`/courses/${cid}/modules?include[]=items&per_page=50`); } catch (e) { out += 'ERR modules ' + e.message + '\n'; continue; }
  for (const m of (Array.isArray(mods) ? mods : [])) {
    if (!pat.test(m.name)) continue;
    out += `\n## MODULE: ${m.name}\n`;
    for (const it of (m.items || [])) {
      // file= only on File items: a quiz's or assignment's content_id is not a file canvadoc_text.js can pull.
      n++;
      out += `### ${it.title} | ${it.type} | item=${it.id}` + (it.type === 'File' && it.content_id ? ` | file=${it.content_id}` : '') + (it.page_url ? ` | page=${it.page_url}` : '') + '\n';
      if (it.type === 'Page' && it.page_url) {
        try {
          const pg = await api(`/courses/${cid}/pages/${it.page_url}`);
          const d = document.createElement('div'); d.innerHTML = pg.body || '';
          const files = [...d.querySelectorAll('a[data-api-endpoint*="/files/"]')].map(a => '  FILE ' + a.textContent.trim().replace(/\s+/g,' ').slice(0,80) + ' -> ' + (a.getAttribute('data-api-endpoint')||'').split('/files/')[1]);
          const videos = [...d.querySelectorAll('a[href*="panopto"], iframe[src*="panopto"], a[href*="kaltura"], iframe[src*="kaltura"]')].map(e => '  VIDEO ' + (e.textContent||e.title||'').trim().slice(0,60) + ' -> ' + (e.getAttribute('href')||e.getAttribute('src')||'').split('?')[0]);
          out += d.innerText.replace(/\s+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim().slice(0, 1500) + '\n' + files.join('\n') + (files.length?'\n':'') + videos.join('\n') + (videos.length?'\n':'');
        } catch (e) { out += '  ERR page ' + e.message + '\n'; }
      }
    }
  }
}
out += `\nEND ${n} items`;
// Chunks of whole lines, at most 40k characters, so a read-back that trims a chunk's edges never splits a line.
const chunks = [''];
for (const line of out.split('\n')) { if (chunks.at(-1) && chunks.at(-1).length + line.length >= 40000) chunks.push(''); chunks[chunks.length-1] += line + '\n'; }
window.__chunk = (i) => { document.body.innerText = chunks[i]; return 'chunk ' + i; };
window.__chunk(0);
'total_len=' + out.length + ' chunks=' + chunks.length;
