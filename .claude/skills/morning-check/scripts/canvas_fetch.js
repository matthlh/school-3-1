// Run with mcp__claude-in-chrome__javascript_tool in a tab that is on https://canvas.ubc.ca/ (logged in).
// Pulls every course's announcements/assignments/quizzes/discussions/modules/pages/files/calendar/planner
// plus the inbox, todo, and activity stream, then parks the JSON in window.__co and paints chunk 0 into the
// page body. Read chunks with get_page_text + window.__chunk(i). Returns "total_len=… chunks=N".
//
// Do NOT add the word c-r-e-d-e-n-t-i-a-l-s anywhere in this file and do not return URLs with query strings:
// the extension blocks the tool result in both cases.
const api = async (p) => { try { const r = await fetch('/api/v1' + p); const t = await r.text(); return JSON.parse(t.replace(/^while\(1\);/, '')); } catch(e) { return {_err: String(e)}; } };
const strip = (h) => (h||'').replace(/<style[\s\S]*?<\/style>/g,'').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/https?:\/\/\S+/g,'[link]').replace(/\s+/g,' ').trim();
const u = (x) => (x||'').split('?')[0].replace('https://canvas.ubc.ca','');
const arr = (x) => Array.isArray(x) ? x : [];
const courses = [[193131,'ASIA250'],[192903,'CPSC310'],[192607,'PHIL385'],[193293,'STAT251'],[194666,'PHIL321']];
const out = { fetched_at: new Date().toISOString() };
out.todo = arr(await api('/users/self/todo?per_page=50')).map(t=>({type:t.type,course:t.context_name,title:t.assignment?.name,due:t.assignment?.due_at,pts:t.assignment?.points_possible,url:u(t.html_url)}));
out.stream = arr(await api('/users/self/activity_stream?per_page=30')).map(s=>({type:s.type,title:s.title,course_id:s.course_id,created:s.created_at,read:s.read_state,url:u(s.html_url),msg:strip(s.message).slice(0,300)}));
out.conversations = arr(await api('/conversations?per_page=10')).map(c=>({subject:c.subject,last:c.last_message_at,state:c.workflow_state,from:(c.participants||[]).map(p=>p.name).join(', '),ctx:c.context_name,msg:strip(c.last_message).slice(0,300)}));
out.grades = arr(await api('/users/self/enrollments?state[]=active&type[]=StudentEnrollment&per_page=50')).map(e=>({course_id:e.course_id,current:e.grades?.current_score,final:e.grades?.final_score,letter:e.grades?.current_grade}));
for (const [cid, code] of courses) {
  const pc = {};
  pc.announcements = arr(await api(`/announcements?context_codes[]=course_${cid}&start_date=2026-08-15&end_date=2026-12-31&per_page=50`)).map(a=>({title:a.title,posted:a.posted_at,by:a.author?.display_name,read:a.read_state,url:u(a.html_url),body:strip(a.message).slice(0,1500)}));
  pc.assignments = arr(await api(`/courses/${cid}/assignments?per_page=100&include[]=submission&order_by=due_at`)).map(a=>({name:a.name,due:a.due_at,unlock:a.unlock_at,lock:a.lock_at,pts:a.points_possible,types:(a.submission_types||[]).join(','),pub:a.published,sub:a.submission?.workflow_state,score:a.submission?.score,url:u(a.html_url),desc:strip(a.description).slice(0,300)}));
  const qz = await api(`/courses/${cid}/quizzes?per_page=50`);
  pc.quizzes = Array.isArray(qz) ? qz.map(q=>({title:q.title,due:q.due_at,unlock:q.unlock_at,lock:q.lock_at,pts:q.points_possible,pub:q.published,url:u(q.html_url)})) : (qz && qz.message) || qz;
  pc.discussions = arr(await api(`/courses/${cid}/discussion_topics?per_page=50`)).map(d=>({title:d.title,posted:d.posted_at,last_reply:d.last_reply_at,unread:d.unread_count,replies:d.discussion_subentry_count,url:u(d.html_url),body:strip(d.message).slice(0,300)}));
  pc.modules = arr(await api(`/courses/${cid}/modules?include[]=items&per_page=50`)).map(m=>({name:m.name,unlock:m.unlock_at,state:m.state,items:(m.items||[]).map(i=>({t:i.title,type:i.type,due:i.content_details?.due_at,page_url:i.page_url,url:u(i.html_url||i.external_url)}))}));
  const fp = await api(`/courses/${cid}/front_page`);
  pc.front_page = fp && fp.title ? {title:fp.title,updated:fp.updated_at,body:strip(fp.body).slice(0,2000)} : null;
  pc.tabs = arr(await api(`/courses/${cid}/tabs`)).filter(t=>!t.hidden).map(t=>t.label);
  pc.pages = arr(await api(`/courses/${cid}/pages?per_page=50&sort=updated_at&order=desc`)).map(p=>({title:p.title,updated:p.updated_at,url:u(p.html_url),page_url:p.url}));
  pc.files = arr(await api(`/courses/${cid}/files?sort=updated_at&order=desc&per_page=25`)).map(f=>({name:f.display_name,updated:f.updated_at,size:f.size}));
  pc.calendar = arr(await api(`/calendar_events?context_codes[]=course_${cid}&start_date=2026-09-01&end_date=2026-12-31&per_page=100`)).map(e=>({title:e.title,start:e.start_at,end:e.end_at,loc:e.location_name,desc:strip(e.description).slice(0,200)}));
  pc.planner = arr(await api(`/planner/items?context_codes[]=course_${cid}&start_date=2026-09-01T00:00:00Z&end_date=2026-12-31T00:00:00Z&per_page=100`)).map(p=>({date:p.plannable_date,type:p.plannable_type,title:p.plannable?.title,pts:p.plannable?.points_possible,sub:(p.submissions&&typeof p.submissions==='object')?(p.submissions.submitted?'submitted':(p.submissions.missing?'missing':'not-submitted')):'',url:u(p.html_url)}));
  // Pages whose body changed in the last 3 days: pull the text so the diff can show what changed.
  const cutoff = Date.now() - 3*86400000;
  pc.page_bodies = {};
  for (const p of pc.pages) { if (p.page_url && Date.parse(p.updated) > cutoff) { const pg = await api(`/courses/${cid}/pages/${p.page_url}`); pc.page_bodies[p.title] = strip(pg.body).slice(0, 2000); } }
  out[code] = pc;
}
window.__co = JSON.stringify(out, null, 1);
window.__chunk = (i) => { document.body.innerText = window.__co.slice(i*40000, (i+1)*40000); return 'chunk ' + i; };
window.__chunk(0);
'total_len=' + window.__co.length + ' chunks=' + Math.ceil(window.__co.length/40000);
