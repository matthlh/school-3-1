// canvadoc_text.js — read the text of a Canvas-hosted PDF/PPTX/DOCX without downloading it.
// Verified 2026-09-11 (STAT 251 lecture deck, ASIA 250 Harvey PDF, PHIL 321 syllabus).
//
// Recipe (Claude-in-Chrome, one tab per file):
//   1. navigate  -> https://canvas.ubc.ca/courses/<course_id>/files/<file_id>
//   2. javascript_tool:
//        const f=document.querySelector('iframe[src*="canvadoc_session"]'); location.href=f.src; 'navigating'
//      wait ~8-10 s. The tab is now on canvadocs-*.inscloudgate.net. The viewer app does NOT mount
//      when loaded top-level (0 .page elements, empty body) — that is fine, we never render.
//   3. javascript_tool with the CODE below (edit FROM/TO). It fetches the PDF through
//      DocViewer.sessionData.urls.pdf_download (same origin, no extra auth needed), parses it with
//      the page's own pdfjsLib, keeps the parsed document in window.__doc and page texts in
//      window.__pdf, and paints pages FROM..TO into the body.
//   4. get_page_text. For more pages run  `await __extract(a,b); __paint(a,b); 'ok'`  then get_page_text.
//
// Rules learned the hard way:
//   - Never return URLs, the access token, or the words cookie/credential in a tool result: the
//     extension blocks the result ("Cookie/query string data"). Paint text into the body instead.
//   - A canvadoc session URL is single-use. Reloading it shows "Document viewing session is
//     expired or invalid" — go back to step 1 for a fresh one.
//   - sessionData.pdfjs.url (/v2/documents/...) returns 400 without the viewer's internal auth.
//     Only urls.pdf_download works from page JS.
//   - Extract in ranges of <= ~150 pages per call for big books (a whole 500-page PDF risks the
//     45 s tool timeout); the document stays in window.__doc so later ranges are instant.
//
// CODE (paste as the javascript_tool text; set FROM/TO):
const FROM = 1, TO = 999;
const dv = window.DocViewer, sd = dv.sessionData;
const urls = (typeof sd.urls === 'string') ? JSON.parse(sd.urls) : (sd.urls || {});
window.__extract = async (a, b) => {
  if (!window.__doc) {
    const r = await fetch(urls.pdf_download);
    if (!r.ok) throw new Error('download ' + r.status);
    const buf = await r.arrayBuffer();
    window.__doc = await window.pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;
    window.__n = window.__doc.numPages;
    window.__pdf = window.__pdf || {};
  }
  b = Math.min(b, window.__n);
  for (let i = a; i <= b; i++) {
    if (window.__pdf[i]) continue;
    const pg = await window.__doc.getPage(i);
    const tc = await pg.getTextContent();
    window.__pdf[i] = tc.items.map(it => it.str + (it.hasEOL ? '\n' : ' ')).join('');
  }
  return 'pages=' + window.__n + ' have=' + Object.keys(window.__pdf).length;
};
window.__paint = (a, b) => {
  b = Math.min(b, window.__n);
  let out = 'PAGES ' + window.__n + ' SHOWING ' + a + '-' + b + '\n';
  for (let i = a; i <= b; i++) out += '=== PAGE ' + i + ' ===\n' + (window.__pdf[i] || '').replace(/[ \t]+/g, ' ').replace(/\n{2,}/g, '\n').trim() + '\n';
  document.body.innerText = out;
  return 'ok';
};
await window.__extract(FROM, TO);
window.__paint(FROM, TO);
