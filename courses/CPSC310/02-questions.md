# CPSC310 — Question Bank

Claude's source of truth for quizzing. Grows every lecture.
Tag each question with its topic so the ledger and the bank stay linked.

Format:
```
### Q: <question>
**Topic:** <topic name>  **Lec:** <n>  **Type:** recall | apply | derive | critique
**A:** <answer>
```

---

## Lec 1 — Course introduction (logged 2026-09-11 from slides; no in-class notes)

### Q: Complete the course's one-sentence definition: "Software engineering is the discipline of managing ____."
**Topic:** What SE is  **Lec:** 1  **Type:** recall
**A:** "…what a change costs as a system keeps growing." (slide 8). Every unit revisits cost of change at a larger radius: inside a codebase, then at its boundaries, then across a system and team.

### Q: Quote or closely paraphrase the Hoc & Nguyen-Xuan definition of software engineering used on the slides and in the reader intro.
**Topic:** What SE is  **Lec:** 1  **Type:** recall
**A:** "The process of transforming a mental plan of desired actions for a computer into a representation that can be understood by the computer." Attribution: Jean-Michel Hoc and Anh Nguyen-Xuan.

### Q: List the four ways the 310 view of software differs from the 210 view, and name the one the course treats as the driver of everything else.
**Topic:** What SE is  **Lec:** 1  **Type:** recall
**A:**
- 210: small code, single version, solo, one prompt.
- 310: large codebase, multi-version, collaborative, changing requirements.

Changing requirements is the driver. It is what makes cost of change the central concern, and the course calls the 310 view "socio-technical".

### Q: The reader distinguishes "code" from "software". Give the three adjectives for each, and say why the distinction motivates Analytical Code Design.
**Topic:** What SE is  **Lec:** 1  **Type:** recall
**A:**
- Code: short, isolated, run once (scripts, assignments).
- Software: large, highly connected, longstanding.

Software therefore has to be easy to evolve, maintain and test. So you need measurable ways to compare two designs of the same thing and to articulate the trade-offs. That is what "analytical" code design means.

### Q: Name the three fluencies the reader says CPSC 310 builds (Holmes 2026). Names only.
**Topic:** Three fluencies & roadmap  **Lec:** 1  **Type:** recall
**A:** Decomposition fluency, requirements fluency, and validation fluency.

### Q: Define decomposition fluency in one line. Then say which of the three fluencies is about whether the code will keep affording change as needs evolve.
**Topic:** Three fluencies & roadmap  **Lec:** 1  **Type:** recall
**A:** Decomposition fluency is breaking problems apart and critically evaluating how others have broken them apart. Validation fluency is the one about affording change: it confirms an implementation realises its design today and will keep doing so as needs evolve.

### Q: In the slides' diagram of traditional practice → source-code assistance → vibe coding, what changes along the arrow, and what is the conclusion about what engineers "need to know"?
**Topic:** Three fluencies & roadmap  **Lec:** 1  **Type:** recall
**A:** Increasing abstraction. The human input moves through three stages:
1. `<requirements, code>`
2. `<natural-language requirements, code>`
3. `<natural-language requirements, existing system>`, producing an executable feature, with "validation?" left open.

Conclusion: engineers need to know requirements, design, and validation of code, not just how to write and read source code.

### Q: Your internship was "clients changing requirements all the time". Using the lecture's framing, say why the course thinks that experience is the *problem statement* rather than the *skill* — what does it claim you still need?
**Topic:** What SE is  **Lec:** 1  **Type:** critique
**A:** Living with changing requirements is the 310 condition (socio-technical, multi-version, collaborative), not the competence. The claimed skill is judging *why* a given change is expensive in one structure and cheap in another and saying so — the "judgment to know whether a decision or implementation was right, and the ability to say why" (slide 13). Units 1–2 give the vocabulary for that judgment: magnitude vs footprint, cohesion/connascence, LSP, testability, patterns, API change severity.

### Q: Name the fluency from its definition: (a) "tracing design and implementation decisions back to their requirements" (b) "confirming an implementation realises its design today and will keep affording change as needs evolve" (c) "breaking problems apart and critically evaluating how others have".
**Topic:** Three fluencies & roadmap  **Lec:** 1  **Type:** recall
**A:**
- (a) Requirements fluency
- (b) Validation fluency
- (c) Decomposition fluency. (Holmes 2026.)

## Lab 1 — Onboarding: HTTP, PUT idempotence, request path, async (logged 2026-09-14)

### Q: Give the HTTP status code and one-line meaning for each: OK, CREATED, NO_CONTENT, NOT_FOUND, UNPROCESSABLE_ENTITY. Then say what separates 400 from 422.
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** recall
**A:** 200 worked, result in body. 201 worked, made a new thing, shown in body. 204 worked, nothing to send back. 404 nothing at that address. 422 request parsed fine but the contents break a rule (missing or wrong-typed field). 400 is when the body could not be parsed at all; 422 is when it parsed but is unacceptable.

### Q: The same PUT /api/v2/buildings/ICCS is sent twice with valid bodies. What status does each call return, and why do they differ?
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** apply
**A:** First 201 Created (ICCS did not exist, so it was created). Second 204 No Content (ICCS existed, so it was replaced and there is nothing to echo back). The request is identical; the server's prior state differs.

### Q: Define idempotent. Is PUT idempotent even though the two calls above returned different status codes? Justify. Which method is not idempotent and why?
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** derive
**A:** A request is idempotent if sending it twice leaves the server in the same state as sending it once. PUT is: it says "make the resource at this address look like this", so a repeat changes nothing further. Status codes describe what the server did, not the resulting state, so 201 then 204 is still idempotent, and that is what makes retry-after-timeout safe. POST is not: it means "add one to this collection", so two POSTs create two things.

### Q: In the InsightUBC PUT building endpoint, where does the building id come from, and which four body fields are required? What happens if lat is omitted?
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** recall
**A:** The id is the path segment (/api/v2/buildings/:buildingId), never in the body; it appears only in the response. Required body fields: name, address, lat, lon. Omitting lat gives 422 with fields.lat = "required but missing"; the exact wording is part of the spec contract.

### Q: You have a 422 and the exact string "required but missing" and want the code that produced it. Which of the three code-finding techniques do you use, and why not the other two?
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** apply
**A:** Text search, because what you hold is a string, and only text search reaches inside string literals and non-code files. Go-to-definition / find-references need a name that exists in the code (a function, class, field) and are type-aware. Running it with a breakpoint or failing test is for when you have neither a name nor a string.

### Q: validateBuildingParams in App.ts: name three design facts the lab wanted you to notice, and say what that implies for adding a fifth field (campus) in D1.
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** critique
**A:** (1) It keeps checking after the first failure, so one response reports every bad field. (2) Each required field is its own near-identical eight-line block (missing → "required but missing", wrong type → "expected a …"). (3) Nothing links the strings to openapi.yml; a human typed them, and TypeScript would not notice if the spec's wording changed. So campus means a fifth copy of the block, a hand edit of the spec, and new tests, with nothing checking the three agree.

### Q: Define route, handler, path parameter, and middleware in one line each, using app.delete("/api/v2/buildings/:buildingId", async (req, res) => {…}) as the example. What are req and res?
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** recall
**A:** Route: method + path pattern registered once at startup. Handler: the function stored with it, run on every matching request. Path parameter: the :buildingId segment, available as req.params.buildingId ("ICCS"). Middleware: code run on every request before any handler, e.g. express.json() which parses the body into req.body. req is the incoming request (read from it); res is the reply (write to it with res.status(…).send(…)).

### Q: Trace DELETE /api/v2/buildings/ICCS for a building that exists: list the stages in order from Express matching the route to the response being sent.
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** derive
**A:** (1) Express matches method and path, sets req.params.buildingId = "ICCS", calls the handler. (2) Handler builds a new Model and calls deleteBuilding("ICCS"). (3) readBuildings() loads data/buildings.json and rebuilds Building objects. (4) findIndex locates ICCS in the array. (5) getJSONForDelete() captures the response body before removal. (6) splice removes it. (7) writeBuildings() writes the whole array back over the file. (8) Handler copies the returned status and body into the HTTP response.

### Q: True or false, with a reason: (i) the Model keeps buildings in memory between requests; (ii) deleting one building rewrites only its entry in the file; (iii) registering a route runs the handler at startup; (iv) a missing buildings.json crashes readBuildings.
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** apply
**A:** (i) False: a new Model is built per request and deleteBuilding starts with readBuildings(). (ii) False: writeBuildings stringifies the entire array. (iii) False: registering stores the function; it runs per matching request. (iv) False: the try/catch sets an empty array instead.

### Q: Node has one thread. Explain how it still serves 20 concurrent requests that each read a file, using the terms call stack, hand-off to the OS, callback queue, and "queue drains when the stack is empty". Then: if a 100 ms read blocked instead of suspending, how many could start per second?
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** derive
**A:** await fs.readFile hands the read to the OS and suspends the function, so it leaves the call stack and the thread is free; all 20 reads can be in flight at once. When the OS finishes, the continuation goes on the callback queue, which drains only when the stack is empty, so a callback never interrupts running code. Blocking at 100 ms each would cap the server at 10 reads per second.

### Q: deleteBuilding touches no disk or network itself, yet it is declared async. Why must it be, and what happens if a caller forgets await on an async function whose body throws?
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** derive
**A:** Completion must be tracked at every level between the slow operation and whoever needs the result; a function can only hand its caller that tracking (a Promise) if it is itself async, so async propagates up the call chain (readBuildings → deleteBuilding → handler). Without await, the throw becomes a rejected Promise nobody holds: the following line ("Report sent.") still runs, then Node dies with an unhandled rejection. The compiler does not catch the missing await.
