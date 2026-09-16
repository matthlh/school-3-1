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

### Q: The reader gives three adjectives for "code" and three for "software". Name all six, paired to the right word.
**Topic:** What SE is  **Lec:** 1  **Type:** recall
**A:** Code is short, isolated, run once. Software is large, highly connected, longstanding.

### Q: Given that software is large, connected and longstanding, what property does it therefore need, and what does that requirement make "analytical" about Analytical Code Design?
**Topic:** What SE is  **Lec:** 1  **Type:** derive
**A:** It needs to be easy to evolve, maintain and test, because it will be changed many times by many people over years. You cannot rely on taste to decide which of two designs supports that better, so you need measurable ways to compare two designs of the same thing and to state the trade-off between them. Reasoning about designs by measurement rather than by preference is what "analytical" means here.

### Q: Name the three fluencies the reader says CPSC 310 builds (Holmes 2026). Names only.
**Topic:** Three fluencies  **Lec:** 1  **Type:** recall
**A:** Decomposition fluency, requirements fluency, and validation fluency.

### Q: A classmate writes a 300-line Python script that scrapes one dataset for their thesis, runs it, gets the numbers, and never opens it again. By the reader's terms, is that code or software? Which of the three adjectives decides it, and does Analytical Code Design apply?
**Topic:** What SE is  **Lec:** 1  **Type:** apply
**A:** Code. All three adjectives fit — it is short, isolated and run once — but "run once" is the one that decides it, because nothing will ever have to change in it. Analytical Code Design is about the cost of the *next* change, so it buys nothing here: effort spent making that script evolvable is effort that is never recovered.

### Q: State the course's one-sentence definition of software engineering, then say which word in it is doing the real work and why correctness is not the centre of the definition.
**Topic:** What SE is  **Lec:** 1  **Type:** derive
**A:** "Software engineering is the discipline of managing what a change costs as a system keeps growing." The load-bearing word is *cost*: a single version being correct is a one-time property, but the system will be changed repeatedly under moving requirements, so what determines whether the project survives is how expensive each of those changes is. Correctness of any one version is necessary but says nothing about the price of the next version.

### Q: The reader lists SE as "specify, invent, design, build, validate, deploy, maintain, research, improve". Where does programming sit in that list, and what does its position imply about the course's emphasis?
**Topic:** What SE is  **Lec:** 1  **Type:** recall
**A:** Programming is only the *build* step — one of nine. The implication is that the other eight are where a 310-sized project is won or lost, so the course spends its time on specification, design and validation rather than on writing code faster.

### Q: Name four ways 310-scale software differs from 210-scale code as the lecture set them out, and say which one the course calls the root of the difficulty.
**Topic:** What SE is  **Lec:** 1  **Type:** recall
**A:** 210: small code, single version, solo, one prompt. 310: large codebase, multi-version, collaborative, and changing requirements — the course calls this "socio-technical". Changing requirements is the root: without it the system could be built once and left alone, and cost of change would not be a discipline.

### Q: Name the three fluencies the reader says CPSC 310 builds (Holmes 2026), and give the one-line question each one answers.
**Topic:** Three fluencies  **Lec:** 1  **Type:** recall
**A:** Decomposition fluency — how should this be split into parts? Requirements fluency — what is actually being asked for? Validation fluency — how do I know it does that?

### Q: Slide 11 argues that AI agents doing "source code assistance" and "vibe coding" make the three fluencies more valuable, not less. Reconstruct that argument in two steps.
**Topic:** Three fluencies  **Lec:** 1  **Type:** derive
**A:** Step one: the fluencies are about deciding what to build, how to carve it up, and how to check it — none of which is the act of typing code. Step two: agents drive down the cost of the typing, so the typing stops being the bottleneck and the deciding and the checking become the whole of the remaining work. What got cheap is the part that was never the fluencies.

### Q: A teammate hands you a working feature that passes its tests, but it reads one config value directly out of `process.env` in four different files. Which of the three fluencies does this failure belong to, and why is it not the other two?
**Topic:** Three fluencies  **Lec:** 1  **Type:** apply
**A:** Decomposition. The feature does what was asked (requirements are fine) and it is demonstrably checked (validation is fine); the defect is that one concept — where the config comes from — has been spread across four places instead of living in one, so changing it later means finding all four. That is a question about how the work is split into parts.

### Q: A deliverable spec says "return the buildings sorted", the code sorts by name, and the autograder marks it wrong because it expected sorting by code. All the tests the student wrote pass. Which fluency failed, and which one did *not*?
**Topic:** Three fluencies  **Lec:** 1  **Type:** apply
**A:** Requirements fluency failed — the ambiguity in "sorted" was never resolved against the spec. Validation did not fail in the sense of being absent: tests exist and run. But they validate the student's own misreading, which is the standard trap — a test suite can only check the requirement you believed in, so validation is never a substitute for reading the spec.

### Q: Map the course roadmap onto the fluencies: weeks 2–5 sit inside a codebase you own, weeks 6–7 at its boundaries, weeks 8–13 across a system and a team. Which fluency dominates each stretch, and what question does each stretch ask?
**Topic:** Three fluencies  **Lec:** 1  **Type:** derive
**A:** Weeks 2–5 are decomposition: why is this change expensive here and cheap there? Weeks 6–7 are requirements, now as a contract with someone outside — where should the boundaries be, and what happens once you publish one? Weeks 8–13 are validation at team scale: how does a team change one codebase without breaking each other? The same three questions recur at a larger radius each time, which is the same shape as the cost-of-change definition.

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
