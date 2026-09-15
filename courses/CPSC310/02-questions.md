# CPSC310 — Question Bank

Claude's source of truth for quizzing. Grows every lecture.
Tag each question with its topic so the ledger and the bank stay linked.

What gets banked (from the 26W1 syllabus, 2026-09-14): the exams hand you code or a design you have
not seen and ask what is wrong, what you would change, and why. So questions are `apply` and
`critique` on a fragment, plus `recall` of the reader's exact terms. Course housekeeping (learning
objectives, roadmap, slides about AI tooling) is not banked.

Format:
```
### Q: <question>
**Topic:** <topic name>  **Lec:** <n>  **Type:** recall | apply | derive | critique
**A:** <answer>
```

---

## Lec 1 — Course introduction (logged 2026-09-11 from slides; no in-class notes; pruned 2026-09-14 to the exam-relevant claims)

### Q: Complete the course's one-sentence definition: "Software engineering is the discipline of managing ____."
**Topic:** What SE is  **Lec:** 1  **Type:** recall
**A:** "…what a change costs as a system keeps growing." (slide 8). The driver is changing requirements: 310 software is large, multi-version, collaborative and its requirements move, which is why cost of change, not correctness of a single version, is the central concern.

### Q: The reader distinguishes "code" from "software". Give the three adjectives for each, and say why the distinction motivates Analytical Code Design.
**Topic:** What SE is  **Lec:** 1  **Type:** recall
**A:**
- Code: short, isolated, run once (scripts, assignments).
- Software: large, highly connected, longstanding.

Software therefore has to be easy to evolve, maintain and test. So you need measurable ways to compare two designs of the same thing and to articulate the trade-offs. That is what "analytical" code design means.

### Q: Name the three fluencies the reader says CPSC 310 builds (Holmes 2026). Names only.
**Topic:** Three fluencies  **Lec:** 1  **Type:** recall
**A:** Decomposition fluency, requirements fluency, and validation fluency.

## Lab 1 — Onboarding: HTTP, PUT idempotence, request path, async (logged 2026-09-14; pruned the same day to what transfers beyond this repo)

### Q: Give the HTTP status code and one-line meaning for each: OK, CREATED, NO_CONTENT, NOT_FOUND, UNPROCESSABLE_ENTITY. Then say what separates 400 from 422.
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** recall
**A:** 200 worked, result in body. 201 worked, made a new thing, shown in body. 204 worked, nothing to send back. 404 nothing at that address. 422 request parsed fine but the contents break a rule (missing or wrong-typed field). 400 is when the body could not be parsed at all; 422 is when it parsed but is unacceptable.

### Q: The same PUT /api/v2/buildings/ICCS is sent twice with valid bodies. What status does each call return, and why do they differ?
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** apply
**A:** First 201 Created (ICCS did not exist, so it was created). Second 204 No Content (ICCS existed, so it was replaced and there is nothing to echo back). The request is identical; the server's prior state differs.

### Q: Define idempotent. Is PUT idempotent even though the two calls above returned different status codes? Justify. Which method is not idempotent and why?
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** derive
**A:** A request is idempotent if sending it twice leaves the server in the same state as sending it once. PUT is: it says "make the resource at this address look like this", so a repeat changes nothing further. Status codes describe what the server did, not the resulting state, so 201 then 204 is still idempotent, and that is what makes retry-after-timeout safe. POST is not: it means "add one to this collection", so two POSTs create two things.

### Q: validateBuildingParams in App.ts: name three design facts the lab wanted you to notice, and say what that implies for adding a fifth field (campus) in D1.
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** critique
**A:** (1) It keeps checking after the first failure, so one response reports every bad field. (2) Each required field is its own near-identical eight-line block (missing → "required but missing", wrong type → "expected a …"). (3) Nothing links the strings to openapi.yml; a human typed them, and TypeScript would not notice if the spec's wording changed. So campus means a fifth copy of the block, a hand edit of the spec, and new tests, with nothing checking the three agree.

### Q: Define route, handler, path parameter, and middleware in one line each, using app.delete("/api/v2/buildings/:buildingId", async (req, res) => {…}) as the example. What are req and res?
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** recall
**A:** Route: method + path pattern registered once at startup. Handler: the function stored with it, run on every matching request. Path parameter: the :buildingId segment, available as req.params.buildingId ("ICCS"). Middleware: code run on every request before any handler, e.g. express.json() which parses the body into req.body. req is the incoming request (read from it); res is the reply (write to it with res.status(…).send(…)).

### Q: Node has one thread. Explain how it still serves 20 concurrent requests that each read a file, using the terms call stack, hand-off to the OS, callback queue, and "queue drains when the stack is empty". Then: if a 100 ms read blocked instead of suspending, how many could start per second?
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** derive
**A:** await fs.readFile hands the read to the OS and suspends the function, so it leaves the call stack and the thread is free; all 20 reads can be in flight at once. When the OS finishes, the continuation goes on the callback queue, which drains only when the stack is empty, so a callback never interrupts running code. Blocking at 100 ms each would cap the server at 10 reads per second.

### Q: deleteBuilding touches no disk or network itself, yet it is declared async. Why must it be, and what happens if a caller forgets await on an async function whose body throws?
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** derive
**A:** Completion must be tracked at every level between the slow operation and whoever needs the result; a function can only hand its caller that tracking (a Promise) if it is itself async, so async propagates up the call chain (readBuildings → deleteBuilding → handler). Without await, the throw becomes a rejected Promise nobody holds: the following line ("Report sent.") still runs, then Node dies with an unhandled rejection. The compiler does not catch the missing await.
