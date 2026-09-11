# What to do, when

Three phases: the next two days, the weekly rhythm, and the run-up to an exam.

---

## Phase 0 — the next two days (~2.5 h total)

Ordered by return on time.

**1. ~~Paste the syllabi~~ — done (2026-09-10).** All four live in `courses/<CODE>/00-syllabus.md`;
logistics (office hours, links, dates) in `03-logistics.md`.

**2. ~~Decide PHIL 321~~ — done.** Dropped 2026-09-08. Four courses. Remember to actually drop
it in the SSC before the deadline, and delete the `PHIL_V 321-001` recurring event from your
calendar (I left it alone — it's yours to remove).

**3. Get the CPSC 310 environment running end-to-end (~45 min).**
**D1 is due Fri Sep 25 at 18:00 and late work is not graded — zero, no partial credit.**
The autograder has limited runs per day, so you cannot leave this to the last evening.
Clone, install, run the test suite, push one trivial commit. Confirm the whole loop works
*this week*, while it costs you nothing.

**4. Set up the physical page (~15 min).**
Rule a vertical line down each page, two-thirds / one-third. Left = question, right = answer.
Ten pages ruled in advance so you never have to think about it in a lecture.

**5. ~~Confirm your STAT 251 section and instructor~~ — done.** Lab L1K (Fri 11–12, ESB 1046),
lectures Premarathna. His 2025W sections averaged 72–74 with ~12% of students at 90+ —
see `research/course-intel.md` for what that implies.

**6. ~~Approve the calendar blocks~~ — done.** Written to your calendar 2026-09-08, recurring
through Dec 4, plus all CPSC 310 deadlines and the midterm.

**Explicitly not worth doing in these two days:** pre-reading textbooks, making notes in
advance, watching ahead. Passive preview shows no measurable benefit. Bank the time.

---

## Phase 1 — the weekly rhythm

### Your actual week

| | Morning | Afternoon | Evening |
|---|---|---|---|
| **Mon** | 8:00 STAT lecture *(iClicker)*<br>9:30 ASIA novel, 30–35 pp | 12:00 free<br>2:00 PHIL 385<br>**3:00–5:00 STAT problems + close-outs** | Gym · 8pm ASIA quiz backstop |
| **Tue** | 7:00 career<br>9:00–11:00 CPSC 310 lab | 12:30 CPSC lecture<br>**2:15–4:45 CPSC deliverable + close-out** | Gym · career 8–9 |
| **Wed** | 8:00 STAT lecture<br>**9:30–11:00 ASIA lecture + readings + quiz** | 2:00 PHIL 385<br>**3:00–5:00 CPSC deliverable + close-outs** | Badminton 7–9:45 |
| **Thu** | 7:00 career | 12:30 CPSC lecture<br>**2:15–4:15 PHIL 385 reading + close-outs** | Gym · career 8–9 |
| **Fri** | 8:00 STAT lecture<br>**11:00 STAT lab L1K — graded quiz in the lab** | 2:00 PHIL 385<br>**3:00–5:00 RETRIEVAL BLOCK** | Free |
| **Sat** | Badminton 10–12 | 12:15–2:45 flex *(delete if nothing's due)* | Free |
| **Sun** | | 1–3 meal prep<br>3:00–3:20 ledger + week plan | Gym |

Nothing school-related after 5pm on a normal week. That's the entire point of front-loading
afternoons — evenings stay yours for career, gym, badminton, 10:30 bed.

**Bold = the blocks that actually produce grades.** Everything else is attendance.

### The daily 60 seconds

The morning brief lands at **06:35** while the desktop app is open (say "what's new" if it
didn't). Twenty-five lines max:

1. **Plan today — x of 6 h** — your Things3 Today list, rebuilt by the planner: every to-do has
   an estimate tag (15m … 3h) and a priority tag (P1/P2/P3); it fills 6 h by priority, and the
   lecture close-outs, exam-ladder steps (T-10 gap check, T-3 mock, T-1 rationale…) and the weekly
   novel pages are created as to-dos automatically. Work the list top to bottom; check things off.
2. **Rolled to tomorrow** — what was in Today and didn't fit. It competes again tomorrow with a bump.
3. **Today's classes** + **Review** — pre-questions for today's lectures and up to 3 due retrieval questions.
4. **New since yesterday** — new Canvas / PrairieLearn / Piazza items, grades posted, emails that matter.
5. **Heads-up** — due in 2–7 days, date conflicts, **unlogged lectures**, overdue retrieval topics.

Anything you add to Things3 yourself: give it the two tags (or leave it untagged and the brief will
ask). Undated stuff lives in Anytime; the planner pulls from it when the day has room.

"What's due?" reads the ledger for overdue retrieval. Sundays the brief adds a **Week ahead** block.

### After every lecture — 10 minutes, non-negotiable

Cover the answer column on your page. Test yourself once. Mark each line `X` / `~` / `O`.
Then send it to me: **`log STAT251 lec 4`** (a photo of the page is fine).

That's the whole habit. If you skip it, the Friday block has nothing to quiz you on and the
system is just note-taking.

### Day-specific things to watch

- **Mon** — the new ASIA lecture drops by 5pm and *last week's* quiz locks at 23:59 (do it in
  the Wednesday block, never Monday night). WeBWorK is due 23:59 most Mondays (Oct 6 is a Tue;
  Oct 29 and Nov 12 are Thu; Dec 11 a Fri). iClicker running before STAT starts.
- **Wed** — do the ASIA lecture + quiz in the morning block. Five days of buffer beats zero.
- **Fri** — **your lab quiz is written in the lab and can't be made up.** Then the retrieval block.
- **Sun** — 20 minutes: the brief's **Week ahead** block shows the planner's placement of next week
  (hours per day, what moved, any day over budget). Your only calls: an over-budget day → Saturday flex
  block or cut something; anything you want on a fixed day → tag it `pin`.

**The one rule:** the Friday retrieval block is not optional and not moveable. Every other block
feeds it.

---

## How to start a CPSC 310 deliverable

Same shape for D1–D4. Each is only 5% of your grade, so the goal is **meets spec, on time, then
stop** — the bucket grading gives you nothing for extra hours.

| When | What |
|---|---|
| **10 days out** | Environment check: clone, install, run the test suite, push one throwaway commit. Confirm the whole loop works. Do this *before* you read the spec — a broken toolchain on the last night is how people get zeros. |
| **8 days out** | Read the spec once. Write down what "done" is as a checklist. Ask me anything unclear. |
| **Tue + Wed blocks** | Build. Commit as you go with real messages — **the commits are graded**, they're your process evidence. |
| **2 days out** | First autograder run. Its cooldown is long and runs are limited per day, so this is your buffer, not your deadline. |
| **1 day out** | Write the **design rationale** — why you structured it this way, what you traded off. This is a separate graded artifact and the most commonly skipped one. |
| **Due day** | Submit early. Late is not graded — zero, no partial credit. |

Three things ship, every time: **the code, the design rationale, the process evidence** (PRs,
commits, reviews). Passing the autograder alone forfeits the judgment marks.

**Stop rule:** when the checklist is done and the rationale is written, close the laptop. Hours
past spec return literally nothing, and this project is 20% of a course whose exams are 65%.

## Phase 2 — exam run-up (start T-10 days)

Same shape for a midterm or a final. No cramming week; the ledger has been doing the spacing all
term, so this is consolidation, not first contact.

| Day | What |
|---|---|
| **T-10** | I generate a complete topic inventory from the course ledger and diff it against the syllabus. Anything on the syllabus that never made it into your notes is a **gap** — that's the day's work. |
| **T-9 → T-5** | 45 min/day, interleaved retrieval across all topics. Not by unit — mixed, so you have to identify what kind of problem you're looking at before you solve it. Expect to feel worse at this than blocked review. That's the mechanism, not a warning sign. |
| **T-4** | Gaps and `X` topics only. Anything still failing gets rebuilt from scratch. |
| **T-3** | **Full timed mock exam.** I write it from your question bank in the real format and length. For STAT 251 in particular this is the most important single day — the reported failure mode is running out of time, not not knowing the material. |
| **T-2** | Mark the mock together. Only the misses get studied. Nothing else. |
| **T-1** | Light. Reconstruct each topic's outline out loud, from memory, in one pass. No new material, no rereading. Normal bedtime — you already have 10:30 on the calendar, keep it. |
| **Exam day** | Nothing. |

**At no point in this ten days do you reread your notes.** If you find yourself rereading,
you've run out of questions — tell me and I'll write more.

Course-specific in the run-up:
- **CPSC 310** — drill terminology to instant recall, and practice *justifying* every answer;
  the exams ask for the reasoning, not the answer. If T/F with negative marking returns, we'll
  do a calibration drill so you know when not to guess.
- **STAT 251** — every practice problem timed, from a blank page. Never from worked solutions.
- **PHIL 385** — verbal reconstruction while walking, which is what actually works
  for these. By T-5 we should have named the 2–3 themes the prof kept circling back to; those
  are what gets examined.

---

## PHIL 321 — dropped (2026-09-08)

Recorded here so the reasoning survives: PHIL 321 has never had a section average above 86.3 and
sits at 76.5 over five years. It's a formal-methods course competing with STAT 251 and CPSC 310
for the same kind of attention, and dropping it freed ~6 h/week plus your MWF noon hour.

If you reverse this before the drop deadline, tell me and I'll rebuild the schedule for five.
