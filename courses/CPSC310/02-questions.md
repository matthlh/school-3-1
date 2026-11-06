# CPSC310 — Question Bank

Claude's source of truth for quizzing. Grows every lecture.
Tag each question with its topic so the ledger and the bank stay linked.

What gets banked (from the 26W1 syllabus, 2026-09-14): the exams hand you code or a design you have
not seen and ask what is wrong, what you would change, and why. So questions are `apply` and
`critique` on a fragment, plus `recall` of the reader's exact terms. Course housekeeping (learning
objectives, roadmap, slides about AI tooling) is not banked.

Format intel (unverified): a classmate said on 2026-10-02 that the exams are all true/false, and on 2026-10-05
Matt heard they are all multiple choice. The syllabus still says every answer must be justified, so from
lecture 6 on, questions are written as "True or false, and justify" or as a multiple-choice stem over a
fragment or a claim, and the answer gives the verdict first and the reason second. Older questions stay as they are.
The PrairieLearn labs (read 2026-10-06) use single choice, select-all, a whole number, and true/false per
statement with negative marking; the Labs 2–4 section below keeps those shapes.

Format:
```
### Q: <question>
**Topic:** <topic name>  **Lec:** <n>  **Type:** recall | apply | derive | critique
**A:** Key:
1. <the core: what the question asks for; missing it makes the answer wrong>
2. <each other point a full-marks answer needs, one checkable fact or step per line>

<the explanation: working, reasons, sources>
```

A question that asks for several independent answers of equal weight uses `**A:** Parts:` instead of `Key:`, with one numbered point per part in the order the stem asks them, and it is graded O when every part is right, ~ when at least half are, and X when fewer than half are.

---

## Lec 1 — Course introduction (logged 2026-09-11 from slides; no in-class notes; pruned 2026-09-14 to the exam-relevant claims)

### Q: Complete the course's one-sentence definition: "Software engineering is the discipline of managing ____."
**Topic:** What SE is  **Lec:** 1  **Type:** recall  **Id:** 60c3206c
**A:** Key:
1. Software engineering is the discipline of managing what a change costs as a system keeps growing.

"…what a change costs as a system keeps growing." (slide 8). The driver is changing requirements: 310 software is large, multi-version, collaborative and its requirements move, which is why cost of change, not correctness of a single version, is the central concern.

### Q: The reader gives three adjectives for "code" and three for "software". Name the three for code.
**Topic:** What SE is  **Lec:** 1  **Type:** recall  **Id:** e5975db2
**A:** Parts:
1. Code is short.
2. Code is isolated.
3. Code is run once.

Code is short, isolated, run once. Software is large, highly connected, longstanding.

### Q: The reader gives three adjectives for "code" and three for "software". Name the three for software.
**Topic:** What SE is  **Lec:** 1  **Type:** recall  **Id:** e9e84959
**A:** Parts:
1. Software is large.
2. Software is highly connected.
3. Software is longstanding.

Software is large, highly connected, longstanding, where code is short, isolated and run once.

### Q: Given that software is large, connected and longstanding, what property does it therefore need, and what does that requirement make "analytical" about Analytical Code Design?
**Topic:** What SE is  **Lec:** 1  **Type:** derive  **Id:** a7b92630
**A:** Key:
1. Software needs to be easy to evolve, maintain and test, because many people will change it many times over years.
2. Taste cannot decide which of two designs supports that better, so you need measurable ways to compare two designs of the same thing and state their trade-off.
3. "Analytical" means reasoning about designs by measurement rather than by preference.

It needs to be easy to evolve, maintain and test, because it will be changed many times by many people over years. You cannot rely on taste to decide which of two designs supports that better, so you need measurable ways to compare two designs of the same thing and to state the trade-off between them. Reasoning about designs by measurement rather than by preference is what "analytical" means here.

### Q: The reader names three fluencies. Two of them are requirements fluency and validation fluency. What is the third, and what question does it answer?
**Topic:** Three fluencies  **Lec:** 1  **Type:** recall  **Id:** 1cadc400
**A:** Key:
1. The third is decomposition fluency.
2. It answers how this should be split into parts.

Decomposition fluency. It answers "how should this be split into parts?"

### Q: Match each fluency to its question. Fluencies: decomposition, requirements, validation. Questions: "how do I know it does that?", "what is actually being asked for?", "how should this be split into parts?"
**Topic:** Three fluencies  **Lec:** 1  **Type:** recall  **Id:** 5ae30032
**A:** Parts:
1. Decomposition fluency answers how this should be split into parts.
2. Requirements fluency answers what is actually being asked for.
3. Validation fluency answers how you know it does that.

Decomposition: how should this be split into parts? Requirements: what is actually being asked for? Validation: how do I know it does that?

### Q: A classmate writes a 300-line Python script that scrapes one dataset for their thesis, runs it, gets the numbers, and never opens it again. By the reader's terms, is that code or software? Which of the three adjectives decides it, and does Analytical Code Design apply? Justify each answer.
**Topic:** What SE is  **Lec:** 1  **Type:** apply  **Id:** 4c44f57e
**A:** Key:
1. It is code, not software.
2. "Run once" is the adjective that decides it, because nothing will ever have to change in it.
3. Analytical Code Design does not apply: it is about the cost of the next change, and there is none.

Code. All three adjectives fit — it is short, isolated and run once — but "run once" is the one that decides it, because nothing will ever have to change in it. Analytical Code Design is about the cost of the *next* change, so it buys nothing here: effort spent making that script evolvable is effort that is never recovered.

### Q: State the course's one-sentence definition of software engineering, then say which word in it is doing the real work and why, and explain why correctness is not the centre of the definition.
**Topic:** What SE is  **Lec:** 1  **Type:** derive  **Id:** ffd150fb
**A:** Key:
1. Software engineering is the discipline of managing what a change costs as a system keeps growing.
2. The load-bearing word is *cost*.
3. The system will be changed repeatedly under moving requirements, so the price of each change decides whether the project survives.
4. Correctness of one version is a one-time property and says nothing about the price of the next version.

"Software engineering is the discipline of managing what a change costs as a system keeps growing." The load-bearing word is *cost*: a single version being correct is a one-time property, but the system will be changed repeatedly under moving requirements, so what determines whether the project survives is how expensive each of those changes is. Correctness of any one version is necessary but says nothing about the price of the next version.

### Q: The reader lists SE as "specify, invent, design, build, validate, deploy, maintain, research, improve". Where does programming sit in that list, and what does its position imply about the course's emphasis?
**Topic:** What SE is  **Lec:** 1  **Type:** recall  **Id:** 4204f93c
**A:** Key:
1. Programming is only the *build* step, one of nine.
2. The other eight are where a 310-sized project is won or lost, so the course spends its time on specification, design and validation.

Programming is only the *build* step — one of nine. The implication is that the other eight are where a 310-sized project is won or lost, so the course spends its time on specification, design and validation rather than on writing code faster.

### Q: Name four ways 310-scale software differs from 210-scale code as the lecture set them out, and say which one the course calls the root of the difficulty.
**Topic:** What SE is  **Lec:** 1  **Type:** recall  **Id:** e1ca808e
**A:** Parts:
1. 210 is small code, where 310 is a large codebase.
2. 210 is a single version, where 310 is multi-version.
3. 210 is solo, where 310 is collaborative.
4. 210 has one prompt, where 310 has changing requirements.
5. Changing requirements is the root of the difficulty.

210: small code, single version, solo, one prompt. 310: large codebase, multi-version, collaborative, and changing requirements — the course calls this "socio-technical". Changing requirements is the root: without it the system could be built once and left alone, and cost of change would not be a discipline.

### Q: Name the three fluencies the reader says CPSC 310 builds (Holmes 2026), and give the one-line question each one answers.
**Topic:** Three fluencies  **Lec:** 1  **Type:** recall  **Id:** ab21764f
**A:** Parts:
1. Decomposition fluency answers how this should be split into parts.
2. Requirements fluency answers what is actually being asked for.
3. Validation fluency answers how you know it does that.

Decomposition fluency — how should this be split into parts? Requirements fluency — what is actually being asked for? Validation fluency — how do I know it does that?

### Q: Slide 11 argues that AI agents doing "source code assistance" and "vibe coding" make the three fluencies more valuable, not less. Reconstruct that argument in two steps.
**Topic:** Three fluencies  **Lec:** 1  **Type:** derive  **Id:** 74dd4cc4
**A:** Key:
1. The fluencies are about deciding what to build, how to carve it up and how to check it, none of which is typing code.
2. Agents drive down the cost of the typing, so the typing stops being the bottleneck.
3. The deciding and the checking become the whole of the remaining work, so the fluencies matter more.

Step one: the fluencies are about deciding what to build, how to carve it up, and how to check it — none of which is the act of typing code. Step two: agents drive down the cost of the typing, so the typing stops being the bottleneck and the deciding and the checking become the whole of the remaining work. What got cheap is the part that was never the fluencies.

### Q: A teammate hands you a working feature that passes its tests, but it reads one config value directly out of `process.env` in four different files. Which of the three fluencies does this failure belong to? Justify, and say why it is not the other two.
**Topic:** Three fluencies  **Lec:** 1  **Type:** apply  **Id:** ba2a18b0
**A:** Key:
1. It is a decomposition failure.
2. One concept, where the config comes from, is spread across four places, so changing it later means finding all four.
3. It is not requirements, because the feature does what was asked.
4. It is not validation, because the feature is demonstrably checked by its passing tests.

Decomposition. The feature does what was asked (requirements are fine) and it is demonstrably checked (validation is fine); the defect is that one concept — where the config comes from — has been spread across four places instead of living in one, so changing it later means finding all four. That is a question about how the work is split into parts.

### Q: A deliverable spec says "return the buildings sorted", the code sorts by name, and the autograder marks it wrong because it expected sorting by code. All the tests the student wrote pass. Which fluency failed, and which one did *not*? Justify both.
**Topic:** Three fluencies  **Lec:** 1  **Type:** apply  **Id:** ccddd863
**A:** Key:
1. Requirements fluency failed.
2. The ambiguity in "sorted" was never resolved against the spec.
3. Validation did not fail in the sense of being absent, because tests exist and run.
4. The tests only validate the student's own misreading, since a suite can only check the requirement you believed in.

Requirements fluency failed — the ambiguity in "sorted" was never resolved against the spec. Validation did not fail in the sense of being absent: tests exist and run. But they validate the student's own misreading, which is the standard trap — a test suite can only check the requirement you believed in, so validation is never a substitute for reading the spec.

### Q: Map the course roadmap onto the fluencies: weeks 2–5 sit inside a codebase you own, weeks 6–7 at its boundaries, weeks 8–13 across a system and a team. Which fluency dominates each stretch, and what question does each stretch ask?
**Topic:** Three fluencies  **Lec:** 1  **Type:** derive  **Id:** d567a777
**A:** Parts:
1. Weeks 2–5 are decomposition, asking why this change is expensive here and cheap there.
2. Weeks 6–7 are requirements as a contract with someone outside, asking where the boundaries should be and what happens once you publish one.
3. Weeks 8–13 are validation at team scale, asking how a team changes one codebase without breaking each other.

Weeks 2–5 are decomposition: why is this change expensive here and cheap there? Weeks 6–7 are requirements, now as a contract with someone outside — where should the boundaries be, and what happens once you publish one? Weeks 8–13 are validation at team scale: how does a team change one codebase without breaking each other? The same three questions recur at a larger radius each time, which is the same shape as the cost-of-change definition.

## Lab 1 — Onboarding: HTTP, PUT idempotence, request path, async (logged 2026-09-14; pruned the same day to what transfers beyond this repo)

### Q: Give the HTTP status code and one-line meaning for each: OK, CREATED, NO_CONTENT, NOT_FOUND, UNPROCESSABLE_ENTITY.
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** recall  **Id:** ff72bd45
**A:** Parts:
1. OK is 200, which means it worked with the result in the body.
2. CREATED is 201, which means it worked and made a new thing, shown in the body.
3. NO_CONTENT is 204, which means it worked with nothing to send back.
4. NOT_FOUND is 404, which means there is nothing at that address.
5. UNPROCESSABLE_ENTITY is 422, which means the request parsed fine but its contents break a rule, such as a missing or wrong-typed field.

200 worked, result in body. 201 worked, made a new thing, shown in body. 204 worked, nothing to send back. 404 nothing at that address. 422 request parsed fine but the contents break a rule (missing or wrong-typed field).

### Q: What separates HTTP status 400 from 422?
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** recall  **Id:** c4397aac
**A:** Key:
1. 400 means the body could not be parsed at all, while 422 means it parsed but is unacceptable.

400 is when the body could not be parsed at all; 422 is when it parsed but its contents break a rule, such as a missing or wrong-typed field.

### Q: The same PUT /api/v2/buildings/ICCS is sent twice with valid bodies. What status does each call return, and why do they differ?
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** apply  **Id:** a396e8af
**A:** Parts:
1. The first call returns 201 Created.
2. The second call returns 204 No Content.
3. They differ because the server's prior state differs: before the first call ICCS did not exist and was created, and before the second it existed and was replaced, with nothing to echo back.

First 201 Created (ICCS did not exist, so it was created). Second 204 No Content (ICCS existed, so it was replaced and there is nothing to echo back). The request is identical; the server's prior state differs.

### Q: Define idempotent. Is PUT idempotent even though the two calls above returned different status codes? Justify. Which method is not idempotent and why?
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** derive  **Id:** 3d750734
**A:** Key:
1. A request is idempotent if sending it twice leaves the server in the same state as sending it once.
2. PUT is idempotent, because it makes the resource at that address look like the body, so a repeat changes nothing further.
3. Status codes describe what the server did, not the resulting state, so 201 then 204 is still idempotent.
4. POST is not idempotent, because it adds one to a collection, so two POSTs create two things.

A request is idempotent if sending it twice leaves the server in the same state as sending it once. PUT is: it says "make the resource at this address look like this", so a repeat changes nothing further. Status codes describe what the server did, not the resulting state, so 201 then 204 is still idempotent, and that is what makes retry-after-timeout safe. POST is not: it means "add one to this collection", so two POSTs create two things.

### Q: validateBuildingParams in App.ts: name three design facts the lab wanted you to notice, and say what that implies for adding a fifth field (campus) in D1.
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** critique  **Id:** 33bf8d3f
**A:** Parts:
1. `validateBuildingParams` keeps checking after the first failure, so one response reports every bad field.
2. Each required field is its own near-identical eight-line block.
3. Nothing links the error strings to `openapi.yml`, so TypeScript would not notice if the spec's wording changed.
4. Adding campus means a fifth copy of the block, a hand edit of the spec and new tests, with nothing checking the three agree.

(1) It keeps checking after the first failure, so one response reports every bad field. (2) Each required field is its own near-identical eight-line block (missing → "required but missing", wrong type → "expected a …"). (3) Nothing links the strings to openapi.yml; a human typed them, and TypeScript would not notice if the spec's wording changed. So campus means a fifth copy of the block, a hand edit of the spec, and new tests, with nothing checking the three agree.

### Q: Define route, handler, path parameter, and middleware in one line each, using app.delete("/api/v2/buildings/:buildingId", async (req, res) => {…}) as the example.
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** recall  **Id:** c811bc3b
**A:** Parts:
1. A route is a method plus path pattern registered once at startup.
2. A handler is the function stored with the route, run on every matching request.
3. A path parameter is the `:buildingId` segment, available as `req.params.buildingId`.
4. Middleware is code run on every request before any handler, such as `express.json()` parsing the body into `req.body`.

Route: method + path pattern registered once at startup. Handler: the function stored with it, run on every matching request. Path parameter: the :buildingId segment, available as req.params.buildingId ("ICCS"). Middleware: code run on every request before any handler, e.g. express.json() which parses the body into req.body.

### Q: In app.delete("/api/v2/buildings/:buildingId", async (req, res) => {…}), what are req and res?
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** recall  **Id:** 96beb1a0
**A:** Parts:
1. `req` is the incoming request, which you read from.
2. `res` is the reply, which you write to with `res.status(...).send(...)`.

req is the incoming request (read from it, for example req.params.buildingId); res is the reply (write to it with res.status(…).send(…)).

### Q: Node has one thread. Explain how it still serves 20 concurrent requests that each read a file, using the terms call stack, hand-off to the OS, callback queue, and "queue drains when the stack is empty". Then: if a 100 ms read blocked instead of suspending, how many could start per second?
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** derive  **Id:** 468abef9
**A:** Key:
1. `await fs.readFile` hands the read to the OS and suspends the function, so it leaves the call stack and frees the thread.
2. All 20 reads can be in flight at once.
3. When the OS finishes, the continuation goes on the callback queue.
4. The queue drains only when the stack is empty, so a callback never interrupts running code.
5. Blocking at 100 ms per read would cap the server at 10 reads per second.

await fs.readFile hands the read to the OS and suspends the function, so it leaves the call stack and the thread is free; all 20 reads can be in flight at once. When the OS finishes, the continuation goes on the callback queue, which drains only when the stack is empty, so a callback never interrupts running code. Blocking at 100 ms each would cap the server at 10 reads per second.

### Q: deleteBuilding touches no disk or network itself, yet it is declared async. Why must it be?
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** derive  **Id:** 2f517abb
**A:** Key:
1. Completion must be tracked at every level between the slow operation and whoever needs the result.
2. Only an async function can hand its caller that tracking as a Promise, so async propagates up the call chain.

Completion must be tracked at every level between the slow operation and whoever needs the result; a function can only hand its caller that tracking (a Promise) if it is itself async, so async propagates up the call chain (readBuildings → deleteBuilding → handler).

### Q: What happens if a caller forgets await on an async function whose body throws?
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** derive  **Id:** b8cf784b
**A:** Key:
1. Without await, the throw becomes a rejected Promise nobody holds, and the following line still runs.
2. Node then dies with an unhandled rejection.
3. The compiler does not catch the missing await.

Without await, the throw becomes a rejected Promise nobody holds: the following line ("Report sent.") still runs, then Node dies with an unhandled rejection. The compiler does not catch the missing await.

### Q: A client sends POST /api/v2/buildings with the body `{"name": "ICCS", "floors": "six"}` where floors must be a number. A second client sends a body that is not valid JSON at all. Give the status code for each and the one-word reason the codes differ.
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** apply  **Id:** acb3836e
**A:** Parts:
1. The first client gets 422 Unprocessable Entity.
2. The second client gets 400 Bad Request.
3. The one-word reason the codes differ is parsing.

The first gets 422 Unprocessable Entity: the JSON parsed, but a field has the wrong type. The second gets 400 Bad Request: the body could not be parsed. The difference is parsing. 400 means the server could not read it; 422 means it read it and rejected the contents.

### Q: Sort these into "the request worked" and "the client got something wrong": 200, 201, 204, 400, 404, 422. Then say what the first digit of a status code tells you and why 201 and 202 are not interchangeable.
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** recall  **Id:** 7029a285
**A:** Parts:
1. 200, 201 and 204 mean the request worked.
2. 400, 404 and 422 mean the client got something wrong.
3. The first digit is the class: 2xx is success, 4xx is client error and 5xx is server error.
4. 201 Created means a new resource now exists, while 202 Accepted means the server queued the work and has not done it yet, so a client cannot assume the thing exists.

Worked: 200, 201, 204. Client error: 400, 404, 422. The first digit is the class: 2xx success, 4xx client error, 5xx server error. 201 Created means a new resource now exists. 202 Accepted means the server has queued the work and has not done it yet, so a client cannot assume the thing exists.

### Q: A handler creates a building and returns 200 with the new building in the body. A reviewer says it should return 201. Is the reviewer right, and does anything break if the code stays at 200? Justify both.
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** critique  **Id:** 44f49999
**A:** Key:
1. The reviewer is right.
2. 201 is the code that says a new resource was created, and it is what `openapi.yml` and the lab tests specify.
3. Nothing breaks at the HTTP level, since 200 and 201 are both success codes.
4. The contract is now wrong, because clients and tests written to the spec check for 201.
5. A generic 200 hides the create-versus-replace distinction that PUT relies on.

The reviewer is right: 201 is the code that says a new resource was created, and it is what openapi.yml and the lab tests specify. Nothing breaks at the HTTP level, since both are success codes, but the contract is now wrong: clients and tests written to the spec check for 201, and a generic 200 hides the create-versus-replace distinction that PUT relies on (201 first call, 204 repeat).

### Q: A teammate writes: "req is the data we pass in, and res is what the API returns to us." Correct each half from the server's point of view, and name the one method chain you use to send a reply.
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** critique  **Id:** 0fb3640b
**A:** Parts:
1. `req` is the incoming request from the client, which you read from, such as `req.params` and `req.body`.
2. `res` is the reply you are building for the client, which you write to and never receive anything from.
3. The reply goes out through `res.status(code).send(body)`.

Inside the handler you are the server, not the caller. req is the incoming request from the client: you read from it (req.params, req.body). res is the reply you are building for that client: you write to it, and you never receive anything from it. The reply goes out through res.status(code).send(body); the handler's return value is ignored.

### Q: Where does express.json() run relative to app.delete("/api/v2/buildings/:buildingId", …), what would req.body contain without it, and why is it middleware rather than part of each handler?
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** apply  **Id:** 16548c0a
**A:** Parts:
1. `express.json()` runs on every request before any handler.
2. Without it `req.body` is undefined.
3. It is middleware because every handler that reads a body needs the same parsing, so it is done once in a shared step.

It runs on every request before any handler, because app.use(express.json()) registers it as middleware at startup. Without it req.body is undefined, since Express does not parse bodies by default. It is middleware because every handler that reads a body needs the same parsing, so it is done once in a shared step instead of being copied into each handler.

## Lec 2 — Coupling (logged 2026-09-15, deck 02a-coupling.pdf + reader Change Difficulty)

### Q: Two of coupling's three axes are degree and locality. Name the third and say what it measures.
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** recall  **Id:** 86e374b8
**A:** Key:
1. The third axis is Strength, also called connascence.
2. It measures how much effort it takes to change the dependency.

Strength, also called connascence. It measures how much effort it takes to change the dependency.

### Q: Define degree and locality as axes of coupling, one line each, and say which one a dependency between two files in different packages scores worse on than the same dependency inside one file.
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** recall  **Id:** 5725b2d4
**A:** Parts:
1. Degree is how many components a dependency touches.
2. Locality is how far apart the dependent components are.
3. The cross-package dependency scores worse on locality.

Degree is how many components a dependency touches. Locality is how far apart the dependent components are. The cross-package dependency scores worse on locality; its degree is unchanged.

### Q: Name the two cheapest connascence types and the most expensive one, and say what each is about.
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** recall  **Id:** 7770ae5b
**A:** Parts:
1. One of the two cheapest is name, about what something is called.
2. The other cheapest is type, about the shape of the data.
3. The most expensive is algorithm, a computation both sides must do the same way.

Cheapest: name (what something is called) and type (the shape of the data). Most expensive: algorithm (a computation both sides must do the same way).

### Q: Put value, position and algorithm connascence in increasing order of cost to change, and give the one-line meaning of value and position. These are the three you left out last time.
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** recall  **Id:** bba586e6
**A:** Parts:
1. In increasing cost the order is value, then position, then algorithm.
2. Value means both sides share a literal, such as a magic number.
3. Position means both sides agree on argument order.

Value, then position, then algorithm. Value: both sides share a literal, such as a magic number. Position: both sides agree on argument order. The full order is name, type, value, position, algorithm.

### Q: `createInvoice(customerId, startDate, endDate, total, tax)` is called from several modules. One caller swaps `total` and `tax`. Which connascence type is this, and why is the bug worse than a compile error?
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** apply  **Id:** 4d606689
**A:** Key:
1. This is connascence of position.
2. The code still compiles and may still pass tests, because both arguments are the same type.
3. It silently computes the wrong number for every invoice that caller creates.

Connascence of position. The code still compiles and may still pass tests, since both arguments are the same type; it just computes the wrong number, silently, for every invoice that caller creates.

### Q: The string `"pending"` is hardcoded in validation, reporting, and UI code. Renaming it to `"in-review"` in only two of the three spots does not error. Which connascence type is this, and why is it worse than connascence of name?
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** apply  **Id:** 868caadd
**A:** Key:
1. This is connascence of value.
2. Renaming a method is caught by the compiler or an IDE's rename tool at every call site.
3. A shared literal string is invisible to both, so a missed spot runs without error and misbehaves.

Connascence of value. Renaming a method (connascence of name) is caught by the compiler or an IDE's rename tool at every call site; a shared literal string is invisible to both, so a missed spot runs without error and just misbehaves.

### Q: `findUserById` gets renamed everywhere via one IDE refactor with no bugs introduced, even though it has many call sites. Explain why connascence of name is cheap despite a high degree, using Degree, Locality, and Strength.
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** critique  **Id:** b954a48f
**A:** Key:
1. Degree, the call-site count, is high, but Strength is low.
2. A name is explicit and type-checked, so tooling finds and fixes every site mechanically.
3. Cost tracks Strength more than Degree.

Degree (call-site count) is high, but Strength is low: a name is explicit and type-checked, so tooling finds and fixes every site mechanically. Cost tracks Strength more than Degree — a large, cheap-to-fix footprint beats a small, silent one.

### Q: Class A encodes data with an algorithm; Class B must decode it with the matching algorithm. There is no shared name, type, or literal between them. Name the connascence type, and explain what makes it dangerous to catch.
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** apply  **Id:** dd2327f3
**A:** Key:
1. This is connascence of algorithm.
2. Nothing in the code ties the two implementations together: no import, no shared constant and no type signature.
3. A change to one side's logic breaks the other with no compiler error and no obvious code link to follow.

Connascence of algorithm. Nothing in the code ties the two implementations together — no import, no shared constant, no type signature — so a change to one side's logic breaks the other with no compiler error and no obvious code link to follow.

### Q: The reader says coupling cannot be eliminated, only loosened. Name the three ways to reduce it, mapped to the three axes.
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** derive  **Id:** 870470cd
**A:** Parts:
1. Minimize the number of interfaces between elements, which reduces Degree.
2. Minimize the distance between interfaces, which reduces Locality.
3. Weaken the kind of connascence a dependency relies on, which reduces Strength.

Minimize the number of interfaces between elements (reduces Degree). Minimize the distance between interfaces (reduces Locality). Weaken the kind of connascence a dependency relies on, e.g. a named options object instead of five positional arguments (reduces Strength).

### Q: Why is implicit coupling more dangerous than explicit coupling of the same degree? Tie this to lecture 1's idea of "footprint."
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** derive  **Id:** 28225075
**A:** Key:
1. Implicit coupling is only visible at runtime, so nothing stops you from missing part of it.
2. Explicit coupling, such as imports and types, is visible to the compiler, so tooling can find every affected site.
3. Explicit coupling is a clear footprint that can be fully read, while implicit coupling carries the risk of a large or unclear footprint.

Explicit coupling (imports, types) is visible to the compiler, so tooling can find every affected site, the way a clear footprint can be fully read. Implicit coupling is only visible at runtime, so nothing stops you from missing part of it, the same risk a large or unclear footprint carries.

## Lec 3 — Cohesion & refactoring (logged 2026-09-17, deck 02b-cohesion-refactoring.pdf + reader Change Difficulty and Refactoring; no in-class notes)

### Q: The deck pairs each of coupling and cohesion with one difficulty and one risk. Give all four, then say which of the four the Parkboard `v1-direct` diff (the loyalty-tier block pasted at four sites across two files) shows most directly, and why.
**Topic:** Cohesion & bindings  **Lec:** 3  **Type:** recall  **Id:** 05550eaa
**A:** Parts:
1. High coupling's difficulty is making the edit in more places.
2. High coupling's risk is missing a place that needed the edit.
3. Low cohesion's difficulty is understanding what the unit actually does before you can change it.
4. Low cohesion's risk is an edit disturbing code unrelated to the reason for the change.
5. Parkboard v1 shows the coupling difficulty most directly, because one concept needs four edit sites.

High coupling: the difficulty is making the edit in more places, and the risk is missing a place that needed the edit. Low cohesion: the difficulty is understanding what the unit actually does before you can change it, and the risk is an edit disturbing code unrelated to the reason for the change. Parkboard v1 shows the coupling difficulty most directly, because one concept needs four edit sites. It also plants loyalty logic inside registration code, which sets up the cohesion risk for the next change.

### Q: Name the three kinds of cohesion binding, define each in one sentence, and give the reader's alternative name for the third. Then say what "the more they share, the more they belong together" tells you to do with a statement that shares nothing with its neighbours.
**Topic:** Cohesion & bindings  **Lec:** 3  **Type:** recall  **Id:** 5e7a609c
**A:** Parts:
1. Data binding means two statements read or write the same data.
2. Logic binding means two statements sit in the same branch of a conditional or switch and run because that condition held.
3. Order binding means the statements must run in a fixed sequence.
4. The reader's prose calls the third one timing.
5. A statement with no binding to anything around it does not belong in that unit, so it is the first candidate to move or extract.

Data binding: two statements read or write the same data. Logic binding: two statements sit in the same branch of a conditional or switch and run because that condition held. Order binding: the statements must run in a fixed sequence. The reader's prose calls the third one timing, though its own table says Order. A statement with no binding to anything around it does not belong in that unit, so it is the first candidate to move or extract, while a pair sharing several bindings should stay together.

### Q: Shared setup for all three parts.
```ts
function closeMonth(orders: Order[]): number {
  const total = orders.reduce((s, o) => s + o.amount, 0);  // (1)
  const avg = total / orders.length;                        // (2)
  if (avg > 500) {                                          // (3)
    notifyManager(avg);                                     // (4)
    logHighAverage(avg);                                    // (5)
  }
  purgeTempFiles();                                         // (6)
  return avg;                                               // (7)
}
```
For each pair, name every binding that holds and justify it: (a) lines 1 and 2; (b) lines 4 and 5; (c) line 6 against any other line. Then say what (c) tells you to do.
**Topic:** Cohesion & bindings  **Lec:** 3  **Type:** apply  **Id:** 44801b10
**A:** Parts:
1. (a) Lines 1 and 2 share a data binding, because line 2 reads `total`, which line 1 wrote, and an order binding, because line 1 must run first for line 2 to be right.
2. (b) Lines 4 and 5 share a logic binding, since both run only when `avg > 500`, and a data binding, since both read `avg`.
3. (c) Line 6 has no binding to any other line: it reads no shared variable, sits in no branch and needs no order.
4. Line 6 is a separate concern, so move it to the caller or its own unit with Move Method.

(a) Data, because line 2 reads `total`, which line 1 wrote, and order, because line 1 must run first for line 2 to be right. There is no logic binding beyond both running unconditionally. (b) Logic, because both run only when the `avg > 500` branch holds, and data, because both read `avg`. There is no order binding: swapping them changes nothing. (c) None. Line 6 reads no variable the others use, sits in no branch, and nothing depends on it having run before or after. That is the low-cohesion tell: temp-file purging is a separate concern sitting inside a pricing function, so move it to the caller or its own unit (Fowler's Move Method). Leaving it means a change to temp-file handling forces someone to read and risk breaking `closeMonth`.

### Q: A codebase has `class Helpers` with static methods `formatDate`, `hashPassword`, `parseCsvRow` and `postSlackAlert`, each called from one different feature. A teammate says it is fine because every method is short and has tests. Assess the class in the deck's terms, name what it costs, and say what you would do.
**Topic:** Cohesion & bindings  **Lec:** 3  **Type:** critique  **Id:** 54016c41
**A:** Key:
1. Cohesion is low.
2. No pair of methods shares data, sits under a common condition or must run in order.
3. Short, tested methods do not help, because cohesion is about whether the pieces belong together, not whether each piece works.
4. The cost is that changing one method means understanding unrelated features, and an edit for one can disturb the others.
5. Move each method next to the feature that calls it, by Move Method or Extract Class per feature.

Cohesion is low. No pair of methods shares data, sits under a common condition, or must run in order, so this is the deck's `Util` box holding pieces of four features. Short, tested methods do not change that, because cohesion is about whether the pieces belong together, not whether each piece works. The cost is the deck's low-cohesion difficulty and risk: someone changing the hash has to open and understand a file full of dates, CSV and Slack, and a shared import or constant edited for one of them can disturb the others. The fix is to move each method next to the feature that calls it (Move Method, or Extract Class per feature), which is the slide 7 picture of one unit per feature. A method genuinely shared by several features can stay, but the class then needs a name that says what it is, not `Helpers`.

### Q: Shared setup for both parts.
```ts
function handle(event: "created" | "deleted" | "archived"): void {
  if (event === "created") {
    sendWelcome();                 // (1)
  } else if (event === "deleted") {
    removeFromIndex();             // (2)
    sendGoodbye();                 // (3)
  } else {
    markReadOnly();                // (4)
  }
}
```
(a) Which pairs among (1) to (4) are logic-bound, and does any pair also carry a data or order binding? Justify. (b) A reviewer wants to pull (2) and (3) into their own function. Does cohesion support that, why, and which refactoring is it?
**Topic:** Cohesion & bindings  **Lec:** 3  **Type:** apply  **Id:** 3ad81a7a
**A:** Parts:
1. Only (2) and (3) are logic-bound, because they share the branch that runs when `event === "deleted"`.
2. No pair carries a data or order binding, since (2) and (3) neither read each other's writes nor need a fixed order.
3. Cohesion supports pulling (2) and (3) out, because they share a logic binding with each other and nothing with the rest of the function.
4. The refactoring is Extract Method into `onDeleted()`, leaving `handle()` as pure dispatch.

(a) Only (2) and (3) are logic-bound: they are the two statements in one branch and run because `event === "deleted"` held. Every other pair sits in different branches, so no pair across branches shares logic, data or order. By the deck's definitions (2) and (3) carry no data or order binding: neither reads what the other wrote, and neither needs the other to have run first, so swapping them changes nothing the code does. (b) Yes. The pair shares a logic binding with each other and nothing with the rest of the function, so an `onDeleted()` method (Extract Method) groups what belongs together and leaves `handle()` as pure dispatch, where each branch is one call.

### Q: The reader says a cohesive class has a small set of private fields that most of its public methods use. Explain why a field used by only two of ten methods is a cohesion warning, what those two methods and the field probably are, and which refactoring from Fowler's list the advice implies.
**Topic:** Cohesion & bindings  **Lec:** 3  **Type:** derive  **Id:** f71cbbfc
**A:** Key:
1. A field touched by only two methods makes those two data-bound to each other and almost nothing else, a cluster with a different reason to change.
2. Cohesion is measured by what pairs share, and a field most methods use is the data binding that makes a class one unit.
3. The two methods and the field are probably a separate concept parked in the class because it already existed.
4. The implied refactoring is Extract Class: move the field and the two methods into a new class the original delegates to.

Cohesion is measured by what pairs share. A field most methods read or write is a data binding running through the whole class, and that is what makes the class one unit. A field only two methods touch means those two are data-bound to each other and to almost nothing else in the class, so they form their own cluster with a different reason to change. They are probably a separate concept that was parked here because the class already existed. The implied move is Extract Class: take the field and the two methods into a new class and have the original delegate to it (Move Field and Move Method are the individual steps). The result is two smaller units, each with fields that most of its methods use.

### Q: Give the deck's one-line definition of refactoring and the reader's, and say what a refactoring never does. Then name at least six refactorings from the Fowler catalogue the reader lists.
**Topic:** Refactoring  **Lec:** 3  **Type:** recall  **Id:** 947ca0ec
**A:** Parts:
1. The deck defines refactoring as a predictable, meaning-preserving code transformation, where meaning is behaviour.
2. The reader defines it as improving the implementation of an existing design by restructuring source code to alleviate shortcomings and ease future development.
3. A refactoring never changes what the program does: it adds no feature and fixes no bug.
4. Six from Fowler's list include rename, move, extract class or method, push down or pull up, replace magic number with constant, and replace inheritance with delegation.

Deck: a predictable, meaning-preserving code transformation, where meaning is behaviour. Reader: "the process of improving on the implementation of an existing design by restructuring the source code to alleviate existing shortcomings and ease future development." A refactoring never changes what the program does: it adds no feature and fixes no bug. It changes structure so the next change is cheaper, usually by consolidating duplicates, reducing coupling or raising cohesion. Fowler's list in the reader: rename (class, field or method); move (class, field or method); extract class, interface or method; push down or pull up a field or method; replace a magic number or string with a constant; replace inheritance with delegation.

### Q: List the reader's four refactoring steps and the deck's six. Why does the test suite run twice, and when does the deck say not to refactor at all?
**Topic:** Refactoring  **Lec:** 3  **Type:** recall  **Id:** bb6cd534
**A:** Parts:
1. The reader's four steps are identify the property and transformations, run the suite, perform the refactoring, and run the full suite again.
2. The deck's six are tests pass, examine coupling and cohesion, determine the refactoring, apply it, run the tests, and repeat until localised.
3. The first run proves green is real before anything is touched, so a red afterwards can only be the refactoring.
4. The deck says not to refactor when tests are already failing, when the code should be rewritten instead, when a deadline is imminent, or while fixing a bug.

Reader: identify the property to improve and the transformations that will do it; run the suite to confirm the system works; perform the refactoring; run the full suite again and confirm identical behaviour. Deck: make sure all tests pass; examine coupling and cohesion; determine the refactoring; apply it; run the tests to confirm nothing broke; repeat until the change is localised. The first run establishes that green is real before anything is touched, so a red after the refactoring can only be the refactoring. Without it you cannot separate a pre-existing failure from one you introduced. Slide 16 says not to refactor when tests are already failing, when the code should be rewritten instead, or when a deadline is imminent, and slide 17 adds not to refactor while fixing a bug, because a fix changes behaviour on purpose and mixing the two hides which change did what.

### Q: A teammate writes a second near-copy of an eight-line validation block and opens a PR extracting both copies into `validateFields()` "so we never write it a third time". Another teammate says the right moment is the next copy, not this one. Who is following the reader and why, what is the rule called, and what does it protect against?
**Topic:** Refactoring  **Lec:** 3  **Type:** apply  **Id:** 55e1e47e
**A:** Key:
1. The second teammate is following the reader.
2. The rule of three says write it simply the first time, duplicate and note it the second time, and refactor the third time.
3. It protects against premature abstraction.

The second teammate follows the reader's rule of three: the first time, write it simply; the second time, duplicate it and note the duplication; the third time, refactor. It guards against premature abstraction, which the reader says can make a system harder to understand even when it is easier to extend, because with only two examples you are likely to generalise the wrong thing. Two copies is a note-it moment, not yet a technical-debt trigger. Parkboard v2 extracted at four copies.

### Q: Name the three technical-debt triggers the reader gives, the signs that refactoring is now due.
**Topic:** Refactoring  **Lec:** 3  **Type:** recall  **Id:** de7436d0
**A:** Parts:
1. A new feature is much harder to add than expected.
2. Fixing a bug that should be cohesive needs changes scattered across the system.
3. A code review of a simple change shows complex, hard-to-understand edits.

These are the reader's three signs that technical debt is due. Two copies of a block is not one of them: by the rule of three that is a note-it moment.

### Q: A PR titled "Refactor: extract PricingService" moves the fee calculation out of `Invoice` into a new class and, in the same commit, changes tax rounding from truncation to round-half-up, editing two expected values in the tests so the suite stays green. Is this a refactoring? Say what is wrong in the deck's and the reader's terms and what the author should have done instead.
**Topic:** Refactoring  **Lec:** 3  **Type:** critique  **Id:** 0aa5e8e9
**A:** Key:
1. It is not a refactoring.
2. A refactoring preserves behaviour, and the tax rounding changed.
3. Editing the expected values destroys the oracle, so the green suite proves nothing about the extraction.
4. It refactors while fixing a bug, so a reviewer cannot tell which change caused any difference in output.
5. Extract `PricingService` with existing tests untouched and passing, then change the rounding and its tests in a separate commit.

No. A refactoring preserves behaviour and the rounding changed, so the program's semantics are different. Editing the expected values destroys the oracle: the process runs the same tests before and after, and here the "after" tests are different tests, so green proves nothing about the extraction. It also breaks the deck's rule of not refactoring while fixing a bug, because a reviewer cannot tell which of the two changes caused any difference in output. The right sequence is one commit that extracts `PricingService` with the existing tests untouched and passing before and after, then a separate commit that changes the rounding and updates its tests as a deliberate behaviour change.

### Q: `Invoice.printOwing()` prints a banner, loops over tasks summing `owing`, then logs the amount. The reader extracts the loop into a private `getOwing()`. Which bindings tied the banner to the loop, which tied the loop to the log line, and why does the extraction raise cohesion rather than merely shorten the method? Name the refactoring.
**Topic:** Refactoring  **Lec:** 3  **Type:** apply  **Id:** 6c129729
**A:** Parts:
1. The banner and the loop were bound by logic and order but shared no data.
2. The loop and the log line were bound by data, through `owing`, and by order.
3. Cohesion rises because afterwards `printOwing()` holds only output and `getOwing()` only calculation, so each unit contains only statements bound to each other by data or order; the shorter method is only a side effect.
4. The refactoring is Extract Method.

Banner and loop were bound by logic (both run whenever `printOwing` runs) and order (banner first) but shared no data. Loop and log line were bound by data (`owing`) and order (sum before log). So the calculation belongs with printing the amount, not with the banner. After Extract Method, `printOwing()` holds one concern (output) and `getOwing()` another (calculation), and every pair inside each unit shares data or order. Cohesion rises because each unit now contains only statements bound to each other. The shorter method is a side effect, and `getOwing()` can be tested or reused without printing anything.

### Q: Clients call `RoomsParser.parseRooms(id, zip)` and `CourseProcessor.processCourses(id, zip)`, which have the same shape. The reader refactors them so that both classes implement `IParser { parse(id, zip): boolean }`. Explain in lecture 2's connascence terms what the clients were bound to before and after, and why that makes the coupling cheaper.
**Topic:** Refactoring  **Lec:** 3  **Type:** derive  **Id:** 830ff463
**A:** Parts:
1. Before, each client called a specific class and method and repeated its handling for each parser: connascence of Algorithm, the costliest kind.
2. After, clients depend only on the `IParser` type, which is connascence of Type and compiler-checked.
3. A new parser is then one new class and zero client edits, so the coupling's strength dropped while its degree stayed about the same.

Before, each client called a specific class and method and repeated its handling for each parser, so adding a third parser meant editing every client: the reader's example of connascence of Algorithm, where coupled code reimplements the same computation. After, clients depend only on the `IParser` type, which is connascence of Type and compiler-checked, so a new parser is one new class and zero client edits. The degree of coupling is about the same, but its strength dropped from Algorithm, the bottom of the table, to Type. Name sits above Type in the table, so a move from Name to Type would have been a rise, not a drop.

### Q: Clients call `RoomsParser.parseRooms(id, zip)` and `CourseProcessor.processCourses(id, zip)`, which have the same shape. The reader applies three refactorings so that both classes implement `IParser { parse(id, zip): boolean }`. Name the three.
**Topic:** Refactoring  **Lec:** 3  **Type:** recall  **Id:** 251e79f8
**A:** Parts:
1. Extract Interface creates `IParser`.
2. Rename turns `CourseProcessor` into `CourseParser` and both methods into `parse`.
3. The third refactoring adds an explicit return type to the signature.

Extract Interface (`IParser`), Rename (`CourseProcessor` to `CourseParser`, and both methods to `parse`), plus adding an explicit return type to the signature.

## Lec 4 — Refactoring (logged 2026-09-26, deck 03a-refactoring.pdf + reader Refactoring; no in-class notes)

### Q: The deck gives three signs that a change is going to be difficult and three kinds of abstraction to introduce before making it. Name all six and pair each sign with the abstraction that removes it. What does the reader call the process of folding such abstractions in as the system grows?
**Topic:** Emergent design and technical debt  **Lec:** 4  **Type:** recall  **Id:** 46b2afa1
**A:** Parts:
1. A change made in more than one place is removed by eliminating the duplication, clones or scattering behind it.
2. Likely merge conflicts or edits to a teammate's file are removed by splitting apart tangled pieces of functionality.
3. Code too obscure to understand clearly is removed by making the code readable.
4. The reader calls this process emergent design.

Signs: the change has to be made in more than one place; you can tell it will cause merge conflicts or edits to the same file as a teammate; the code is too obscure to understand clearly. Fixes, in the same order: remove the duplication, clones or scattering that create the several edit sites; split apart tangled pieces of functionality so teammates stop landing in the same file; make the code readable. Each sign raises the chance of a bug, which is why you refactor before the change, not after. The reader calls it emergent design: you learn which abstractions fit as the system grows, and refactoring is how you add them.

### Q: Shared setup for all parts.
```ts
class ShippingLabel {
  render(order: Order): string {
    const a = order.customer.profile.address;
    const name = order.customer.profile.firstName + " " + order.customer.profile.lastName;
    return `${name}\n${a.street}\n${a.city} ${a.postalCode}`;
  }
}
```
(a) Name the smell and the rule of thumb the deck attaches to it. (b) Say where the behaviour should live and what `render` would call instead. (c) Explain in connascence terms what the change buys.
**Topic:** Code smells  **Lec:** 4  **Type:** critique  **Id:** 86b3fc92
**A:** Key:
1. The smell is feature envy: the method wants many fields of another object, so it probably belongs in that object.
2. The deck's rule of thumb is the Law of Demeter: a long chain of dereferences means the method is in the wrong spot.
3. Formatting the name and address belongs on the profile or address, such as `Profile.fullName()` and `Address.format()`, which `render` calls.
4. Before, `ShippingLabel` is coupled by name to the internal structure of three other classes, so restructuring any of them breaks it.
5. After, it depends on one method name on one class, so the degree of coupling drops.

(a) Feature envy: the method wants many fields of another object, so it probably belongs in that object. The deck's companion rule is the Law of Demeter: a long chain of dereferences (`order.customer.profile.address.city`) means the method is in the wrong spot. (b) Formatting a name and an address is the customer profile's (or the address's) own behaviour, so move it there: `Profile.fullName()` and `Address.format()`, or one `Customer.mailingBlock()`, and `render` makes one or two calls. This is the deck's `Cat` telling `Dog` to run, wag and smile, fixed by `fido.beChased()`. (c) Before, `ShippingLabel` is coupled by name to the internal structure of three other classes (`customer`, `profile`, `firstName`, `street`…), so renaming or restructuring any of them breaks the label. After, it depends on one method name on one class, so the degree of coupling drops and a change inside the profile stays inside the profile.

### Q: Shared setup for all parts. In one codebase: `billing.ts` has `if (plan === 2) fee *= 0.8;`, `ui.ts` has `if (user.plan == "2") showBadge("Student");`, and `report.ts` has `const discount = 20; // percent`. All three refer to the student plan and its discount. (a) Name the smell and the connascence type. (b) Give the deck's three challenges and point to where each one shows up here. (c) A teammate adds `const STUDENT_PLAN = 2;` at the top of each of the three files. Has the problem been fixed? Justify.
**Topic:** Code smells  **Lec:** 4  **Type:** critique  **Id:** 73854a8c
**A:** Key:
1. The smell is magic values, which is connascence of value.
2. The coupling challenge is finding every site that must agree, and here the plan id and the discount live in three files.
3. The readability challenge is that `2` and `0.8` say nothing about what they mean.
4. The same value is encoded different ways, `2` versus `"2"` and `0.8` versus `20`, so a text search for one spelling misses others.
5. It is not fixed, because `STUDENT_PLAN` is defined three times and the copies must still agree, which is still connascence of value.

(a) Magic values: semantically important values written straight into the code. It is connascence of value, because the three sites must agree on what "student plan" is and what the discount is. (b) Coupling: you have to find every site that must agree and work out what changing the value does; here the plan id and the discount live in three files. Readability: `2` and `0.8` say nothing about what they mean. The same value encoded different ways: the plan is the number `2` in one file and the string `"2"` in another, and the discount is `0.8` (a multiplier) in one place and `20` (a percent) in another, so a text search for one spelling misses the others. (c) No. The value is now named, which helps readability, but it is still defined three times, so the three constants still have to agree: it is still connascence of value across three places. The fix is one shared definition (a `Plan.Student` enum and one `STUDENT_DISCOUNT` constant) imported everywhere, so the agreement lives in a single place.

### Q: Shared setup for both parts.
```ts
abstract class Exporter {
  protected open(): void { /* open file */ }
  protected close(): void { /* flush and close */ }
  public abstract export(rows: Row[]): void;
}
class CsvExporter extends Exporter {
  public export(rows: Row[]) { this.open(); /* write CSV */ this.close(); }
}
class JsonExporter extends Exporter {
  public export(rows: Row[]) { this.open(); /* write JSON */ this.close(); }
}
```
(a) A reviewer says the duplication is already gone because `open` and `close` were pulled up. What does the deck say is still wrong? (b) Restructure it and name the pattern.
**Topic:** Code smells  **Lec:** 4  **Type:** critique  **Id:** bcb176f1
**A:** Key:
1. The open, write, close sequence is still copied into every subclass, and nothing forces a new subclass to follow it.
2. A new subclass can forget `close()` or reorder the steps without the compiler objecting, so the parent should own the order.
3. The pattern is template method.
4. Make `export` concrete in the parent, calling `open()`, an abstract `write(rows)` hook, then `close()`.
5. Each subclass implements only `write`, so it can fill the gap but cannot skip or reorder the fixed steps.

(a) This is the deck's slide 19 version. The duplicate lines were pulled up, but the sequence (open, write, close) is still copied into every subclass, and nothing forces a new subclass to follow it. An `XmlExporter` can forget `close()` and leak the file, or call things out of order, and the compiler will not object. The parent should own the order. (b) Make `export` concrete in the parent and have it call one abstract hook, which is a template method:
```ts
abstract class Exporter {
  public export(rows: Row[]): void { this.open(); this.write(rows); this.close(); }
  protected abstract write(rows: Row[]): void;
}
```
Each subclass now implements only `write`. The fixed steps exist once, and a subclass can fill the gap but cannot skip or reorder the steps around it.

### Q: Two functions compute a late fee. `libraryFee(days)` returns `Math.round(days * 0.25 * 100) / 100` capped at 10. `equipmentFee(days)` returns `Math.floor(days * 0.25 * 100) / 100` capped at 10. Nobody remembers whether the rounding difference was intended. Name the smell and the connascence type and justify the type, say why "almost" duplicates are worse than exact ones by the deck's list of challenges, describe the refactoring, and say what you must settle before doing it and why.
**Topic:** Code smells  **Lec:** 4  **Type:** critique  **Id:** 5f5e6e07
**A:** Key:
1. The smell is almost-duplicate code, which is connascence of algorithm.
2. The two sites encode the same fee rule, so changing the rate or cap means finding and editing both.
3. Almost duplicates are worse because non-identical copies are very hard to find and it is hard to tell where a behaviour comes from.
4. The refactoring is Extract Method into one `lateFee(days, rounding)`, or one plain function if the difference turns out to be a bug.
5. First settle whether the rounding difference is intended, because a refactoring must preserve behaviour and a bug fix is a separate commit.

Almost-duplicate code, which is connascence of algorithm: the two sites encode the same fee rule and must stay in agreement, so changing the rate or cap means finding and editing both. The deck's challenges: multiple sites must stay in agreement; when the copies are not identical they are very hard to find (searching for one copy's text misses the other); and it is hard to tell where a behaviour actually comes from. Here the rounding already differs, and nobody can say whether that is a bug or a requirement. The refactoring is Extract Method into one `lateFee(days, rounding)` (or one function if the difference turns out to be a bug). Before refactoring you have to decide whether the rounding difference is intended, because a refactoring must preserve behaviour: if both are kept, the parameter preserves them; if one is a bug, fixing it is a separate, behaviour-changing commit, never part of the refactoring.

### Q: For each smell, give the deck's name and the usual refactoring: (a) a method that reaches through another object's fields to make it do things; (b) the literal `86400` in four files; (c) the same header and footer printed in every subclass's `printReport()`, with only the middle lines differing.
**Topic:** Code smells  **Lec:** 4  **Type:** recall  **Id:** ae2cdc42
**A:** Parts:
1. (a) is feature envy, fixed by moving the behaviour into the envied class with Move Method.
2. (b) is a magic value, replaced with a named constant defined once, such as `SECONDS_PER_DAY`.
3. (c) is almost-duplicate code, fixed by pulling up the shared behaviour into a template method `printReport()` that calls an abstract hook like `printContents()`.

(a) Feature envy, a Law of Demeter violation. Move the behaviour into the envied class (Move Method) so the caller makes one call. (b) A magic value, which is connascence of value. Replace the magic number with a symbol (a named constant defined once, such as `SECONDS_PER_DAY`). (c) Almost-duplicate code, which is connascence of algorithm. Pull up the shared behaviour into the parent and make `printReport()` a template method that calls an abstract hook such as `printContents()` for the unique lines.

### Q: Give the deck's definition of technical debt and its four claims about it.
**Topic:** Emergent design and technical debt  **Lec:** 4  **Type:** recall  **Id:** 90f84ef4
**A:** Key:
1. Technical debt is the extra cost of changing the system later because of shortcuts taken earlier.
2. It accumulates invisibly, like interest.
3. Not all of it is bad.
4. The bad kind slows the team down or raises risk.
5. Code smells hint at where it sits.

Technical debt is the extra cost of changing the system later because of shortcuts taken earlier. It accumulates invisibly, like interest. Not all of it is bad. The bad kind is the kind that slows the team down or raises risk. Code smells hint at where it sits.

### Q: Give the deck's rule of thumb for noticing technical debt, and say what the cost-per-feature chart on slide 21 shows.
**Topic:** Emergent design and technical debt  **Lec:** 4  **Type:** recall  **Id:** 24b106e7
**A:** Parts:
1. The rule of thumb is that if you feel pain making a change, you are probably paying interest on technical debt.
2. The chart shows cost per feature climbing over the years without refactoring and staying roughly flat with refactoring.

Rule of thumb: if you feel pain making a change, you are probably paying interest on technical debt. The chart plots cost per feature over the years after launch: without refactoring the cost keeps climbing, and with refactoring it stays roughly flat in a narrow band.

### Q: Shared setup for all parts. A team's `main` has four failing tests nobody has looked at. Priya wants to "clean up the scheduler first so the failures are easier to find". Omar is fixing a timezone bug in the same scheduler and plans to extract two methods while he is in there. The lead proposes a two-week refactoring sprint every March and September instead. Judge each of the three plans by the deck's refactoring timeline, and say what the deck recommends instead.
**Topic:** Emergent design and technical debt  **Lec:** 4  **Type:** critique  **Id:** d779164f
**A:** Parts:
1. Priya's plan is wrong, because the deck says not to refactor while tests are failing, so she cannot tell whether she broke something.
2. Omar's plan is wrong, because the deck says not to refactor while fixing a bug, since mixing them hides which change caused what.
3. The lead's plan is wrong, because the deck rejects refactoring two weeks of every six months.
4. The deck recommends refactoring opportunistically: on a warning sign, just before or after adding a feature, and during code review.

Priya: no. The deck says not to refactor while tests are failing. The process starts with a green suite so that any failure afterwards can only be the refactoring; with four red tests she cannot tell whether she broke something. Fix or understand the failures first. Omar: no. The deck says not to refactor while fixing a bug, because the bug fix changes behaviour on purpose and the refactoring must not, and doing both at once hides which change caused what. He should fix the bug, commit, then refactor (or refactor first on a green suite, then fix). The lead: no. The deck rejects "two weeks of every six months". Instead refactor opportunistically: when you notice a warning sign, just before or after adding a feature, and during code review.

### Q: Explain why the recap says to run the tests "before you touch the code, and after every single change" rather than once at the end of a refactoring session, and connect it to the deck's definition of refactoring.
**Topic:** Emergent design and technical debt  **Lec:** 4  **Type:** derive  **Id:** 12b47ac0
**A:** Key:
1. A refactoring is meaning-preserving, and the suite giving the same result is the only practical evidence of that.
2. Running the tests first proves the baseline is green, so a later failure belongs to your change.
3. Running them after each small step means a failure points at the one transformation just made.
4. Testing once after many moves leaves a red suite that could come from any of them.

A refactoring is by definition meaning-preserving: behaviour after must equal behaviour before. The only practical evidence of that is the suite giving the same result. Running it first proves the baseline is green, so a later failure belongs to your change rather than to something already broken. Running it after each small step means a failure points at the one transformation just made, which is easy to undo or fix. If you make ten moves and test once, a red suite could come from any of them, and finding which one costs more than the refactoring saved. The deck's cycle ("repeat until the change is localized") is built from these small tested steps.

### Q: Shared setup for all parts. The team must add a fourth shipping region, `"north"`, next sprint.
```ts
function shippingCost(region: string, kg: number): number {
  switch (region) {
    case "local": return 5 + kg * 0.5;
    case "national": return 10 + kg * 1.2;
    case "international": return 25 + kg * 3;
    default: throw new Error("unknown region");
  }
}
function deliveryDays(region: string): number {
  switch (region) {
    case "local": return 1;
    case "national": return 4;
    case "international": return 12;
    default: throw new Error("unknown region");
  }
}
function regionLabel(region: string): string {
  if (region === "local") return "Local";
  if (region === "national") return "Canada-wide";
  return "International";
}
```
(a) Which of the deck's three warning signs does the new region trigger, and why does that sign raise the chance of a bug here? (b) What kind of abstraction should be introduced, and should it happen before or after adding `"north"`? (c) Write by hand the TypeScript for a structure in which a new region is one edit.
**Topic:** Emergent design and technical debt  **Lec:** 4  **Type:** apply  **Id:** eacea9fd
**A:** Parts:
1. (a) The change has to be made in more than one place, because all three functions encode the region list.
2. A missed edit site is a bug, and here `regionLabel` would silently label `"north"` as International instead of failing.
3. (b) Remove the scattering by putting each region's facts in one place.
4. Do it before adding `"north"`.
5. (c) One table, such as a `Record<Region, RegionInfo>` holding the base cost, cost per kilogram, days and label, which every function reads, so `"north"` is one new entry.

(a) The first warning sign: the same change must be made in three places. Each extra edit site is a chance to miss one, and the missed one here fails quietly, since `regionLabel` has no error case and would print "International" for a northern parcel. (b) Consolidate the duplicated, scattered region knowledge into one place. The deck says to refactor before the change: get the suite green, restructure in small steps with the tests run after each, commit, and only then add `"north"` as the feature. (c) One possible answer:

```ts
type Region = "local" | "national" | "international";
interface RegionInfo { base: number; perKg: number; days: number; label: string; }
const REGIONS: Record<Region, RegionInfo> = {
  local:         { base: 5,  perKg: 0.5, days: 1,  label: "Local" },
  national:      { base: 10, perKg: 1.2, days: 4,  label: "Canada-wide" },
  international: { base: 25, perKg: 3,   days: 12, label: "International" },
};
const shippingCost = (r: Region, kg: number) => REGIONS[r].base + kg * REGIONS[r].perKg;
const deliveryDays = (r: Region) => REGIONS[r].days;
const regionLabel = (r: Region) => REGIONS[r].label;
```

Adding `"north"` to `Region` without an entry is now a compile error, because a `Record` needs every key. In lecture 2's terms the three switches were connascence of value spread over three functions; the table keeps the agreement in one place. An interface with one class per region would also work.

### Q: True or false, and justify each. (a) "A team with good engineers carries no technical debt." (b) "If adding a feature hurts, you are probably paying interest on technical debt." (c) "Technical debt shows up in the bug count, so you can watch it build." (d) "When a change will land in the same file a teammate is editing, split the tangled functionality before making it."
**Topic:** Emergent design and technical debt  **Lec:** 4  **Type:** critique  **Id:** a1ef3acd
**A:** Parts:
1. (a) False: not all technical debt is bad, and a quick solution is often the right call when its future cost is judged worth it.
2. (b) True: it is the deck's rule of thumb, and the pain is the extra cost that earlier shortcuts added.
3. (c) False: debt builds up invisibly, like interest, and shows up as a rising cost per feature, with code smells hinting where it sits.
4. (d) True: a likely merge conflict or shared file is one of the three warning signs, and splitting tangled functionality is the abstraction that removes it.

(a) False. The deck says not all technical debt is bad; the bad kind is the kind that slows the team down or raises risk. The reader adds that taking a shortcut is often right, as long as the future cost is judged worth it. (b) True. Technical debt is the extra cost of changing the system later because of earlier shortcuts, and pain while making a change is that cost being paid. (c) False. The deck says debt accumulates invisibly. Its visible effect is slide 21's chart: cost per feature climbs year after year without refactoring. (d) True. Colliding with a teammate's work is the second warning sign, and its remedy is to split apart the tangled pieces before the change, so the two of you stop landing in the same file.

## Lec 5 — Testability (logged 2026-09-26, deck 03b-testability.pdf + reader Testability, contract material from Design Principles; no in-class notes)

### Q: Define controllability and observability in the deck's words, and give the four things the deck says lower each one.
**Topic:** Controllability and observability  **Lec:** 5  **Type:** recall  **Id:** d0c3598a
**A:** Parts:
1. Controllability is the degree to which a test can determine the inputs and state that the code under test depends on.
2. Controllability is lowered by hidden inputs, global or shared state, hard-wired dependencies and preconditions that are hard to set up.
3. Observability is the degree to which a test can inspect the results and effects that the code under test produces.
4. Observability is lowered by printed or formatted results, intermediate values never returned, private state never exposed and effects on external systems.

Controllability is the degree to which a test can determine the inputs and state that the code under test depends on. It is lowered by hidden inputs (the clock, randomness), global or shared state, hard-wired dependencies, and preconditions that are hard to set up. Observability is the degree to which a test can inspect the results and effects that the code under test produces. It is lowered by results that are only printed or formatted, intermediate values that are never returned, private state that is never exposed, and effects on external systems.

### Q: Shared setup for all parts.
```ts
function lateFee(loan: Loan): number {
  const now = new Date();
  const daysLate = Math.max(0, daysBetween(loan.due, now));
  const surcharge = Math.random() < 0.1 ? 2 : 0; // spot-check fee
  return daysLate * RATES[Config.get().region] + surcharge;
}
```
(a) Name every testability problem, which axis each one hurts, and the deck's category for it. (b) Rewrite the signature so a test can pin down the result.
**Topic:** Controllability and observability  **Lec:** 5  **Type:** critique  **Id:** 8e372433
**A:** Parts:
1. `new Date()` is a hidden input, the clock, which hurts controllability.
2. `Math.random()` is a hidden input, randomness, which hurts controllability.
3. `Config.get()` is global or shared state, which hurts controllability.
4. Take everything the behaviour depends on as parameters: `lateFee(loan: Loan, now: Date, region: Region, spotCheck: boolean): number`.

(a) All three hurt controllability. `new Date()` is a hidden input (the clock): the answer changes depending on when the test runs. `Math.random()` is a hidden input (randomness): the same loan gives two different fees. `Config.get()` is global or shared state: the test has to reach into a singleton to set the region, and other tests can leave it changed. Observability is fine, because the fee is returned as a value. (b) Take everything the behaviour depends on as parameters, which is the deck's "raised by" line and the reader's most common fix: `lateFee(loan: Loan, now: Date, region: Region, spotCheck: boolean): number`, or pass a clock and a random source as objects. The caller in production supplies the real clock and randomness, and the test supplies fixed values and can assert an exact number.

### Q: Shared setup for all parts.
```ts
function printSummary(orders: Order[]): void {
  let total = 0;
  for (const o of orders) total += o.amount;
  const avg = total / orders.length;
  console.log(`Total: $${total.toFixed(2)}  Avg: $${avg.toFixed(2)}`);
}
```
(a) Which axis is the problem, and which two of the deck's four causes appear here? (b) Restructure it so the arithmetic is testable without reading the console.
**Topic:** Controllability and observability  **Lec:** 5  **Type:** critique  **Id:** 5c93cae2
**A:** Key:
1. The problem is observability.
2. The results are only printed and formatted.
3. The intermediate values, `total` and `avg`, are never returned.
4. Extract `summarize(orders)` returning `{ total, avg }` and leave a thin `printSummary` that calls it and formats the output.

(a) Observability. Controllability is fine, since the orders come in as a parameter. The results are only printed and formatted, and the intermediate values (`total`, `avg`) are never returned. A test could only capture stdout and parse a string. (b) Return results as values, which is the deck's fix for observability: extract `summarize(orders): { total: number; avg: number }` and leave a thin `printSummary` that calls it and formats the output. The test asserts on the returned numbers directly. This also exposes a case the old code hid: an empty list gives `NaN` for the average, which a test on `summarize([])` would now catch.

### Q: Shared setup for all parts.
```ts
class ReminderService {
  private db = new PostgresClient(process.env.DB_URL);
  private mailer = new SmtpMailer();
  sendOverdueReminders(): void {
    for (const u of this.db.query("SELECT * FROM loans WHERE due < now()")) {
      this.mailer.send(u.email, "Your book is overdue");
    }
  }
}
```
(a) Identify the controllability and the observability problems, using the deck's categories. (b) What change fixes both, and what would a test pass in?
**Topic:** Controllability and observability  **Lec:** 5  **Type:** critique  **Id:** fc8cbc57
**A:** Parts:
1. Controllability is hurt by hard-wired dependencies, since the class constructs them itself, by global state in `process.env`, by the database clock `now()` as a hidden input, and by a seeded Postgres as a hard precondition.
2. Observability suffers because the only result is an effect on an external system, an SMTP email, and the method returns nothing.
3. Take the dependencies as constructor parameters typed as small interfaces, `LoanStore` and `Mailer`, and pass the current date in.
4. A test passes a fake store returning known overdue loans and a fake mailer that records each call, then asserts exactly those emails were sent.

(a) Controllability: both dependencies are hard-wired, because the class constructs them itself; the database connection string comes from global state (`process.env`); the query uses the database's own clock (`now()`), which is a hidden input; and to get a user into the overdue state a test needs a real Postgres with seeded rows, which is a hard-to-set-up precondition. Observability: the only result is an effect on an external system (email sent over SMTP), and the method returns nothing, so a test cannot see who was reminded. (b) Take the dependencies as constructor parameters typed as small interfaces (`LoanStore`, `Mailer`), and pass the current date in. A test passes in a fake store that returns two known overdue loans and a fake mailer that records each call, then asserts that exactly those two emails were "sent". Returning the list of users reminded would add a second way to observe the result. The reader calls this passing in key dependencies, which lecture 7 formalises as dependency inversion.

### Q: Shared setup for all parts.
```ts
class Account {
  private balance = 0;
  private frozen = false;
  // REQUIRES: amount > 0 and the account is not frozen
  // EFFECTS: balance increases by amount
  deposit(amount: number): void { this.balance += amount; }
  freeze(): void { this.frozen = true; }
}
```
(a) Following slide 6, write the Given, When, Then of a black-box test for `deposit`. (b) What must be added to the class before the test can be written, and why is that the right kind of change? (c) What does the REQUIRES clause mean for a test that deposits into a frozen account?
**Topic:** Testable by design  **Lec:** 5  **Type:** apply  **Id:** 2f60ea2b
**A:** Parts:
1. Given a new account, not frozen with balance 0, when it deposits 50, then its balance is 50.
2. Add read-only query methods such as `getBalance()` and `isFrozen()` to the public interface.
3. Read-only queries expose state the specification already talks about without letting a test or client change it.
4. A frozen account violates the precondition, so the specification promises nothing about that call.

(a) Given a new account, which is not frozen and has balance 0. When it deposits 50. Then its balance is 50, or at least greater than it was before. (b) Neither `balance` nor `frozen` is visible and `deposit` returns nothing, so there is nothing to assert on: private state that is never exposed, which is an observability problem. Add query methods such as `getBalance()` and `isFrozen()` to the public interface, as the deck added `isHungry()` and `amountEaten()` to `Animal`. They are read-only, so they expose the state the specification already talks about without letting a test or a client change it. Making the fields public would expose them to writes as well and couple clients to the representation. Returning the new balance from `deposit` would also work. (c) A frozen account violates the precondition, so the specification promises nothing about that call. A test of `deposit` should first confirm the precondition holds (as slide 6 checks the animal is hungry), and a "frozen" test is only meaningful if the contract is changed to say what happens, for example that it throws.

### Q: Name the three parts of a CPSC 210-style method specification and the three contract terms the reader's Design Principles chapter maps them to. In the `Animal` example, which clause did slide 6 fold into the EFFECTS line and why does the test begin by asserting `isHungry()`?
**Topic:** Testable by design  **Lec:** 5  **Type:** recall  **Id:** 7406f446
**A:** Parts:
1. The three parts are REQUIRES, MODIFIES and EFFECTS.
2. The reader maps them to preconditions, postconditions and invariants.
3. The REQUIRES clause that the animal must be hungry is folded into EFFECTS as "for a hungry animal only".
4. The test asserts `isHungry()` first to show the precondition holds, because the postcondition is only promised when it does.

REQUIRES, MODIFIES and EFFECTS. The reader calls the comment block a data abstraction that defines the method's contract: preconditions (what the method expects), postconditions (what it provides) and invariants (what must always be true). In `Animal.eat()` the REQUIRES clause says the animal must be hungry. Slide 6 rewrites EFFECTS to start "for a hungry animal only", folding the precondition into the effect. The test asserts `isHungry()` first to show the precondition holds in the Given state, because the postcondition is only promised when it does; it also checks that `amountEaten()` starts at 0 so "has eaten more" has a baseline.

### Q: Name the reader's four testability properties, say which two it calls most important, and explain why it says isolateability without controllability is not useful and why controllability alone is not enough. Which property is least discussed and why?
**Topic:** Controllability and observability  **Lec:** 5  **Type:** recall  **Id:** d761c912
**A:** Parts:
1. The four properties are controllability, observability, isolateability and automatability.
2. Observability and isolateability are the most important.
3. Isolateability without controllability is not useful, because without passing in the dependencies or values that trigger the fault you never see the behaviour.
4. Controllability alone is not enough, because a large function may trigger many behaviours but still be too big to locate the failure.
5. Automatability is least discussed, because it is close to shorthand for code that can be controlled programmatically.

Controllability, observability, isolateability and automatability. Observability and isolateability matter most: can I detect that a fault exists, and can I tell where in the code it is. Isolateability without controllability is not useful because, if you cannot pass in the key dependencies or values that trigger the fault, you never get to see the behaviour, however well isolated the unit is. Controllability alone is not enough because a large, flexible function may let you trigger many behaviours but still be too big, or call too many external dependencies, for you to locate the failure. Automatability is least discussed because it is close to shorthand for code that can be controlled programmatically.

### Q: Sort each item under controllability or observability, name the deck's category for it, and give the fix: (a) a method reads the current user from a global `Session.current`; (b) a function writes its result to `out.csv` and returns nothing; (c) a validator computes an error list, then only returns `true` or `false`; (d) testing the refund path needs an order that is 31 days old; (e) a class keeps a private retry counter that the specification says must reset after a success.
**Topic:** Controllability and observability  **Lec:** 5  **Type:** apply  **Id:** 41b359c8
**A:** Parts:
1. (a) is controllability, global or shared state, fixed by passing the user in as a parameter.
2. (b) is observability, an effect on an external system, fixed by returning the rows and keeping file writing in a thin outer layer.
3. (c) is observability, an intermediate value never returned, fixed by returning the error list.
4. (d) is controllability, a hard-to-set-up precondition with the clock as hidden input, fixed by taking the date or order age as a parameter.
5. (e) is observability, private state never exposed, fixed by adding a read-only query such as `retryCount()`.

(a) Controllability, global or shared state: pass the user in as a parameter. (b) Observability, an effect on an external system: return the rows (or take a writer the test can supply) and keep file writing in a thin outer layer. (c) Observability, an intermediate value never returned: return the error list, since `true`/`false` hides which rule failed. (d) Controllability, a hard-to-set-up precondition, with the clock as the hidden input underneath: take the current date (or the order's age) as a parameter so the test can say "31 days" directly. (e) Observability, private state never exposed: add a read-only query such as `retryCount()`, or make the behaviour it controls observable, so the test can check the reset.

### Q: Give the three steps of the TDD cycle on slide 7 and the deck's three "testability by design" ideas beside it. Why, according to the reader, does writing the test first produce more testable code than writing it after?
**Topic:** Testable by design  **Lec:** 5  **Type:** recall  **Id:** 70255757
**A:** Parts:
1. The TDD cycle is write a failing test, make the test pass, then refactor your code.
2. The three ideas are know what you are building, let the details come from building it, and make the next change cheap.
3. Writing the test first forces the code to be drivable and checkable from the start, so inputs arrive as parameters and results come back as values.

The cycle: write a failing test, make the test pass, refactor your code. The three ideas: know what you are building, let the details come from building it, and make the next change cheap. The reader says code usually needs restructuring for testability when a unit takes on more than one responsibility or a feature scatters across the codebase. Writing the test first means the code must be drivable and checkable from the start, so its inputs arrive as parameters and its results come back as values instead of being retrofitted later. The refactor step is where the lecture 4 discipline fits, done on a green suite.

### Q: A reviewer rejects a PR that adds `getInternalQueue()` to a class "just so the tests can see it", and says tests should only use the public interface. The author replies that the deck itself added `isHungry()` to `Animal` for a test. Who is right? Justify, give the test you would apply to decide whether a new accessor is a good change, and say what to do when an accessor fails that test.
**Topic:** Testable by design  **Lec:** 5  **Type:** critique  **Id:** 7742f271
**A:** Key:
1. It depends on what the accessor exposes: `isHungry()` exposes spec-promised state, while `getInternalQueue()` exposes the representation.
2. Exposing promised state raises observability without leaking the design, since any client can check the promised behaviour.
3. Exposing the representation couples tests to how the class works rather than what it promises, so any internal change breaks them.
4. The test is whether the accessor answers a question the specification talks about, preferably read-only.
5. If it only exposes an implementation detail, test through the behaviour the queue affects instead.

It depends on what the accessor exposes. The deck's accessors expose state the specification already promises: EFFECTS says the animal is not hungry and has eaten more, so `isHungry()` and `amountEaten()` let any client, not only the test, check the promised behaviour. That raises observability without leaking the design. `getInternalQueue()` exposes the representation: tests become coupled to how the class works rather than what it promises, so any internal change breaks them, and clients can start depending on it too. The test to apply: does the accessor answer a question the specification talks about, preferably read-only? If yes, add it. If it only exposes an implementation detail, test through the behaviour the queue affects (what gets returned or processed, and in what order) instead, or return that result as a value.

### Q: Shared setup for all parts.
```ts
class Queue<T> {
  private items: T[] = [];
  enqueue(x: T): void { this.items.push(x); }
  // REQUIRES: the queue is not empty
  // MODIFIES: this
  // EFFECTS: removes the oldest element and returns it
  dequeue(): T { return this.items.shift() as T; }
}
```
(a) Write the Given, When, Then of a black-box test that checks both halves of the EFFECTS clause. (b) Write that test by hand in TypeScript with `expect`. (c) A teammate adds a test that dequeues from an empty queue and expects `undefined`. Is it a good test? Justify, and say what to do instead.
**Topic:** Testable by design  **Lec:** 5  **Type:** apply  **Id:** e5c3cd8a
**A:** Parts:
1. (a) Given a queue holding 1 then 2, when it dequeues, then it returns 1 and 1 is no longer in the queue.
2. (b) The test enqueues 1 and 2, expects `dequeue()` to return 1, then checks the removal through public behaviour: the next `dequeue()` returns 2, or a read-only `size()` is 1.
3. (c) No: an empty queue violates REQUIRES, so the specification promises nothing and the test pins down behaviour no client may rely on.
4. Either delete it, or change the contract to say what happens on an empty queue (for example, that it throws) and test that.

(a) Given a new queue with 1 and then 2 enqueued. When it dequeues. Then it returns 1, and 1 has left the queue. Two elements are needed, because with one element "removes the oldest" cannot be told apart from "removes any". (b) One possible answer:

```ts
it("dequeue returns and removes the oldest element", () => {
  const q = new Queue<number>();   // Given
  q.enqueue(1);
  q.enqueue(2);
  const first = q.dequeue();       // When
  expect(first).to.equal(1);       // Then
  expect(q.dequeue()).to.equal(2);
});
```

The private array cannot be asserted on, so the second `dequeue()` checks the removal through the public interface. Adding a read-only `size()` would also be a good change, because the specification talks about removal, just as the deck added `isHungry()` to `Animal`. (c) No. It tests a call that breaks the precondition, so whatever the code does today is unspecified and may change. If empty-queue behaviour matters, put it in the contract first.

### Q: True or false, and justify each. (a) "In TDD the refactor step may change what the code does, as long as the tests still pass." (b) "Writing the tests after the code gives the same design, just later." (c) "To make private state observable for a test, the deck makes the fields public." (d) "Writing the Given, When, Then from the specification before coding shows which state the class must make observable."
**Topic:** Testable by design  **Lec:** 5  **Type:** critique  **Id:** 281c2bc0
**A:** Parts:
1. (a) False: refactoring is meaning-preserving, so new behaviour starts with a new failing test, and the passing suite is the evidence that nothing changed.
2. (b) False: test-first forces inputs to arrive as parameters and results to come back as values, while test-after often means restructuring the code.
3. (c) False: the deck adds read-only queries such as `isHungry()`, since public fields allow writes and couple clients to the representation.
4. (d) True: the Then step needs every promised effect to be checkable, which is how `Animal` came to need `isHungry()` and `amountEaten()`.

(a) False. Slide 7's cycle is write a failing test, make it pass, refactor. Refactoring changes how the code is written, not what it does; a change in behaviour belongs in the next red test. (b) False. The reader says writing tests first forces the code into a testable structure from the start, while untestable code written first has to be restructured later. (c) False. The deck adds `isHungry()` and `amountEaten()`, read-only queries for state the specification already promises. Public fields would let tests and clients write the state and tie them to the representation. (d) True. Slide 6 writes the test as a black box from the specification, finds that nothing reports `hungry`, and adds the queries the Then step needs.

## Lec 7 — Test robustness (logged 2026-10-01, deck 04b-test-robustness.pdf + reader Blackbox Testing and Glassbox Testing; no in-class notes)

### Q: The deck says a strong test suite "fails when the implementation is wrong" and lists four properties it needs. Name them, and for each say which technique from the lecture delivers it.
**Topic:** Strong test suites and coverage  **Lec:** 7  **Type:** recall  **Id:** bdc2a975
**A:** Parts:
1. The right inputs, a test for every behaviour in the spec, come from equivalence classes plus boundary values.
2. Precise checks, where each test would notice a wrong answer, come from assertions that verify what the spec guarantees.
3. Reliable results, the same outcome every run, come from deterministic code or test doubles for the clock, network or randomness.
4. Coverage of most of the code's behaviour comes from measuring coverage after the spec tests pass and adding structural tests.

(1) The right inputs: every behaviour in the spec has a test. Delivered by equivalence classes plus boundary values. (2) Precise checks: each test would notice a wrong answer. Delivered by assertions that verify what the spec guarantees, not just that the call returned. (3) Reliable results: the same outcome every run. Delivered by deterministic code, or test doubles standing in for the clock, the network or randomness. (4) Coverage of most of the behaviour in the code. Delivered by measuring coverage after the spec tests pass and adding structural tests for what was missed.

### Q: Shared setup for all parts.
```ts
/**
 * Shipping cost for a parcel.
 * | Weight (kg)   | Cost  |
 * | 0 < w <= 2    | 5     |
 * | 2 < w <= 10   | 12    |
 * | 10 < w <= 30  | 25    |
 * @param weightKg Valid 0 < weightKg <= 30.
 * @returns the cost in dollars.
 * @throws RangeError if weightKg <= 0 or weightKg > 30.
 */
shippingCost(weightKg: number): number;
```
(a) List the input classes (valid and invalid) and the output classes (normal and error), the way slides 18 to 22 do. (b) Pick one value per class so every class from both views has at least one, and say which value covers two classes at once. (c) Write the boundary table: both sides of every edge.
**Topic:** Equivalence class partitioning  **Lec:** 7  **Type:** apply  **Id:** 76ffe007
**A:** Parts:
1. The input classes are valid $$0 < w \le 30$$ and invalid $$w \le 0$$ and $$w > 30$$.
2. The output classes are the normal costs 5, 12 and 25, plus the RangeError error output.
3. One value per class, such as -1, 1, 5, 20 and 40, where 1 covers the valid input class and the output class 5.
4. The lower boundaries are 0 throws and 0.01 gives 5, then 2 gives 5 and 2.01 gives 12.
5. The upper boundaries are 10 gives 12 and 10.01 gives 25, then 30 gives 25 and 30.01 throws.

(a) Input domain starts from `number`, narrowed by the precondition 0 < w ≤ 30. Valid input class: 0 < w ≤ 30. Invalid input classes: w ≤ 0 and w > 30. Output range starts from `number` plus the documented error. Normal output classes: 5, 12, 25. Error output class: RangeError. Seven classes: three input classes (one valid, two invalid) and four output classes (three normal, one error). Values such as "3", `undefined` and `NaN` are outside the parameter type and are not tested. (b) For example −1, 1, 5, 20, 40. The value 1 covers the valid input class and the output class 5; 5 and 20 cover the other two normal outputs; −1 and 40 cover the two invalid inputs and the error output between them. (c) Edges: invalid/5: 0 throws, 0.01 (or the smallest step the spec allows) gives 5. 5/12: 2 gives 5, 2.01 gives 12. 12/25: 10 gives 12, 10.01 gives 25. 25/invalid: 30 gives 25, 30.01 throws. Because the spec uses strict and non-strict inequalities on real numbers, the boundary value is the endpoint itself plus the first value past it; say what step you used.

### Q: A teammate's test file for `getLetterGrade` (A 80–100, B 68–79, C 55–67, D 50–54, F 0–49, RangeError outside 0–100) calls it with 25, 30, 40, 72, 75 and 90, and asserts the letter each time. Use ECP to say which tests are repeats, which classes have no test, and what the boundary pass would add.
**Topic:** Equivalence class partitioning  **Lec:** 7  **Type:** critique  **Id:** 9ebba409
**A:** Parts:
1. 25, 30 and 40 all sit in F, so two are repeats, and 72 and 75 both sit in B, so one is a repeat.
2. C (55–67), D (50–54) and both invalid input classes have no test, so the RangeError output is never exercised.
3. The boundary pass adds twelve values, the last on one side and the first on the other of every edge: -1 and 0, 49 and 50, 54 and 55, 67 and 68, 79 and 80, and 100 and 101.

25, 30 and 40 all sit in the F class, so two of them are repeats. 72 and 75 both sit in B, so one is a repeat. 90 covers A. Missing classes: C (55–67), D (50–54), and both invalid input classes, so the RangeError output class is never exercised either. The suite tests four of the nine classes with six tests: the valid input class and the A, B and F outputs. ECP shows the repeats and the gaps at the same time, which is the deck's claim for it. The boundary pass adds twelve values, the last on one side and the first on the other of every edge: −1 and 0, 49 and 50, 54 and 55, 67 and 68, 79 and 80, 100 and 101. Those catch `>=` written as `>` and an A that starts at 81.

### Q: Slide 26 says input partitioning and output partitioning agree for `getLetterGrade` but diverge for `computeGPA`. Explain what each view finds in the GPA case, and then give the general condition under which the two views stop agreeing.
**Topic:** Equivalence class partitioning  **Lec:** 7  **Type:** apply  **Id:** 079204dd
**A:** Parts:
1. Input partitioning tries a 1-credit and a 4-credit course that both come out as 3.0, so the weighting code is exercised.
2. Output partitioning asks whether the grade can go over 100, which leads to points greater than maxPoints, the case that throws.
3. The views stop agreeing when an output depends on a combination of inputs, rather than each output coming from one range of one input.

Input partitioning finds values the code might mishandle: invalid, empty, extreme. For `computeGPA` it makes you try a 1-credit course and a 4-credit course, which both come out as 3.0, so the weighting code gets exercised even though the output looks the same. Output partitioning finds behaviours that no single input points to. Asking "can the grade go over 100?" leads to points greater than maxPoints, which is the case that throws, and nothing in the input list would have suggested it. The views agree when each output comes from one range of one input, as each letter does. They diverge when an output depends on a combination of inputs, because then one output class is reached from many input classes and some output classes are only reached by combinations you would not list from the inputs alone.

### Q: Shared setup for all parts.
```ts
function eval(x: number, a: boolean, b: boolean): number {
  let r = x;
  if (a) { r = r + 1; }
  if (b) { r = r * 2; }
  return r;
}
```
A suite has one test, `eval(0, false, false)`. (a) Give the line, branch and path coverage. (b) The deck lists line, statement and branch coverage, and the reader adds path coverage. What does path coverage demand that branch coverage does not?
**Topic:** Strong test suites and coverage  **Lec:** 7  **Type:** apply  **Id:** d7e8f55f
**A:** Parts:
1. Line coverage is about 67%.
2. Branch coverage is 50%.
3. Path coverage is 25%.
4. (b) Path coverage requires every combination of conditional outcomes, not just each outcome of each decision.

(a) The test skips both `if` bodies. Line (and statement) coverage is about 67%: the two body lines are never run. Branch coverage is 50%: each `if` has two outcomes and only the false outcome of each is taken. Path coverage is 25%: one of the four combinations. These are the reader's numbers. (b) It requires every combination of conditional outcomes to be exercised, not just each outcome of each decision on its own, so it grows with the product of the branches rather than their sum.

### Q: What is the smallest number of tests needed to reach 100% line coverage, 100% branch coverage and 100% path coverage of this function?
```ts
function eval(x: number, a: boolean, b: boolean): number {
  let r = x;
  if (a) { r = r + 1; }
  if (b) { r = r * 2; }
  return r;
}
```
**Topic:** Strong test suites and coverage  **Lec:** 7  **Type:** apply  **Id:** 8702b138
**A:** Parts:
1. Line coverage takes one test.
2. Branch coverage takes two tests.
3. Path coverage takes four tests.

One test for line coverage (`eval(0, true, true)` runs every line), two for branch coverage (true-true and false-false take both outcomes of both decisions), four for path coverage (every combination of the two decisions). These are the reader's numbers.

### Q: A pull request reports 100% line coverage. Reviewing the tests, you find most call the function and assert nothing, and the one assertion checks that the result "is not undefined". Using the deck's four limits of coverage, say why the number is misleading, and say what the deck tells you to do with a coverage report instead.
**Topic:** Strong test suites and coverage  **Lec:** 7  **Type:** critique  **Id:** 86282d79
**A:** Parts:
1. Coverage can be fooled by tests without assertions.
2. Coverage does not check correctness.
3. Coverage says nothing about the input space.
4. A threshold like 100% is an artificial target that gets gamed.
5. The deck says to use coverage to find what the tests missed, then decide whether more tests are needed.

Coverage measures where the tests went, not what they validated. Here two of the four limits apply directly: it can be fooled by tests without assertions, and it does not check correctness, so a wrong result on every line still reads as 100%. The other two are also in play: the number says nothing about the input space (one happy-path value per function covers the lines but none of the boundaries), and a threshold like 100% is exactly the artificial target that gets gamed. The deck's rule: use coverage to find what the tests missed, then decide whether more tests are needed. The number is a to-do list, not a grade. Fix by writing the assertions that verify what the spec guarantees, then partition the inputs; coverage is checked after the spec tests exist (step 5 of the six), not written to.

### Q: Shared setup for all parts.
```ts
interface Fetcher {
  // REQUIRES: url is a valid http(s) URL
  // EFFECTS: returns the body as a string; throws NetworkError if the host cannot be reached
  fetch(url: string): Promise<string>;
}
class CachedFetcher implements Fetcher {
  // REQUIRES: url was previously registered with register(url)
  // EFFECTS: returns the cached body; throws if the url is unknown
  async fetch(url: string) { ... }
}
class StubFetcher implements Fetcher {
  async fetch(url: string) { return "<html>ok</html>"; }
}
```
(a) Apply the LSP methods rule to `CachedFetcher`: is it a valid substitute for `Fetcher`, and which rule does it break? (b) `StubFetcher` never throws. Is it a valid test double for code that handles `NetworkError`, and what does "keep the contract, not just the shape" mean here?
**Topic:** Test doubles and LSP substitutability  **Lec:** 7  **Type:** critique  **Id:** e6538661
**A:** Parts:
1. `CachedFetcher` is not a valid substitute for `Fetcher`.
2. It breaks the precondition rule: requiring a registered URL is a stronger precondition than any valid URL for the same inputs.
3. `StubFetcher` has the shape but is not a valid double for testing code that handles `NetworkError`.
4. Keeping the contract means honouring the promised postconditions, including the `NetworkError` the stub can never produce.

(a) Not valid. The interface's precondition is "any valid URL"; `CachedFetcher` requires the URL to have been registered first, which is a stronger precondition for the same inputs. Code written against `Fetcher`, like `GoodPerson.freeBird` against `Bird`, will call it with an unregistered URL and break, exactly as the Penguin breaks at 100 cm. Widening the precondition would be fine; narrowing it is the violation. (b) It compiles, so it has the shape. It does not keep the contract: the interface promises a `NetworkError` when the host is unreachable, and the stub can never produce one, so any test of the error-handling path is impossible, and a test that passes with this stub says nothing about that path. A valid double for that test is a stub that throws `NetworkError` on demand, or a stub with a switch for it, the way the approving and declining readers are two stubs for two promised outcomes. Doubles must honour the postconditions the interface promises, including the error ones.

### Q: Name the two kinds of test double the deck defines, say what each one controls or records, and give the one-line reason the dependency inversion principle is what makes them usable. Then list the three costs the recap slide attaches to doubles.
**Topic:** Test doubles and LSP substitutability  **Lec:** 7  **Type:** recall  **Id:** f5211ede
**A:** Parts:
1. A stub controls what the dependency gives back.
2. A spy records what the code under test sent to it.
3. DIP means the code under test depends on an interface and receives the implementation from outside, so the test can hand it a double.
4. The three costs are another layer in the design, doubles drifting from the real thing, and the real implementation still needing its own tests.

A stub controls what the dependency gives back, like the approving and declining readers. A spy records what the code under test sent to it, like the recording reader. DIP, "depend upon abstractions, not implementations", means the code under test depends on an interface and receives the implementation from outside, so the test can hand it a double that implements the same interface. Costs: another layer in the design; doubles can drift from the real thing and must be updated whenever the interface changes; the real implementation still needs tests of its own, because the double only proves the caller's half.

### Q: Give the deck's six steps for building a strong test suite in order, and say why structural tests come last rather than first. What does the note "spec tests only test what is in the spec" rule out?
**Topic:** Strong test suites and coverage  **Lec:** 7  **Type:** recall  **Id:** 03d1a37e
**A:** Parts:
1. The six steps are get the requirements, turn them into stubs with specifications, write behavioural tests, implement until they pass, check the suite for this implementation with coverage and optionally mutants, and write structural tests to exercise the full codebase.
2. Structural tests follow the shape of the code, so they cannot exist before the implementation does.
3. The note rules out asserting on behaviour the spec never promised, such as an implementation detail or an undocumented error.

(1) Get the requirements. (2) Turn them into stubs with specifications. (3) Write behavioural tests that check the specifications. (4) Implement until all behavioural tests pass. (5) Check how good the suite is for this specific implementation: coverage, optionally mutants. (6) Write structural tests to exercise the full codebase. Structural tests follow the shape of the code, so they cannot exist before the implementation does, and writing them first would make the tests mirror the author's assumptions instead of the spec, the confirmation bias the reader warns about. The note rules out asserting on behaviour the spec never promised: a spec test may not pin down an implementation detail, an undocumented error, or a value for an input the precondition excludes.

### Q: Shared setup for all parts.
```ts
/**
 * @param age Valid 0–120.
 * @returns "child" for 0–12, "teen" for 13–17, "adult" for 18–64, "senior" for 65–120.
 * @throws RangeError outside 0–120.
 */
ageBand(age: number): string;
```
(a) How many equivalence classes are there across both views, and what are they? (b) Write the boundary table. (c) A reviewer says the boundary table is redundant because every class already has a value in it. What is the deck's reply?
**Topic:** Equivalence class partitioning  **Lec:** 7  **Type:** apply  **Id:** 0b74afed
**A:** Parts:
1. There are eight classes: valid input 0 to 120, invalid inputs below 0 and above 120, outputs child, teen, adult and senior, and RangeError.
2. The lower boundaries are -1 throws and 0 is child, 12 is child and 13 is teen, and 17 is teen and 18 is adult.
3. The upper boundaries are 64 is adult and 65 is senior, and 120 is senior and 121 throws.
4. (c) Both passes are needed: one value per class checks each class is handled at all, while boundaries check the edges are in the right place, where bugs cluster.

(a) Eight: valid input 0 ≤ age ≤ 120; invalid inputs age < 0 and age > 120; normal outputs child, teen, adult, senior; error output RangeError. (b) Edges, last on one side and first on the other: −1 throws and 0 is child; 12 is child and 13 is teen; 17 is teen and 18 is adult; 64 is adult and 65 is senior; 120 is senior and 121 throws. Ten values. (c) One value per class checks that each class is handled at all. Boundaries check that the edges are in the right place, and bugs cluster there: `>=` written as `>`, or teen starting at 14. A value like 15 cannot tell you whether 13 is a teen or a child. Both passes are needed, and the boundary values double as class representatives, so the suite is not much bigger.

## Lec 6 — Test doubles, DIP and LSP (logged 2026-10-02, deck 04a-test-doubles.pdf + reader Testability & Test Doubles and Design Principles; Matt absent, deck only; written as true/false with justification, the exam format a classmate reported)

### Q: True or false, and justify: "Once `FakeWorkingReader` compiles as an `IReader`, it is a valid test double for `buyCoffee`."
```ts
class FakeWorkingReader implements IReader {
  charge = (n: number) => {
    if (n < 0) throw new Error("Invalid charge!");
    return true;
  };
}
```
**Topic:** Test doubles and LSP substitutability  **Lec:** 6  **Type:** critique  **Id:** 7205b288
**A:** Key:
1. False.
2. Compiling only proves the double has the interface's shape, but validity is about the contract written in the interface's specification.
3. This double always approves, so the declined path of `buyCoffee` can never be exercised.
4. LSP is the test: the double is a subtype of `IReader` and must keep every property a caller can rely on.

False. Compiling only proves the double has the interface's shape: a `charge` method that returns a boolean. Validity is about the contract, what `IReader` guarantees `buyCoffee`, which is written in the interface's specification, not its types. This double always approves, so the declined path of `buyCoffee` can never be exercised, and if a declined test fails against it the double is wrong, not `buyCoffee`. LSP is the test: the double is a subtype of `IReader` and must keep every property a caller can rely on. The approving and declining readers are two stubs precisely because the contract has two promised outcomes.

### Q: True or false, and justify: "A stub improves observability and a spy improves controllability."
**Topic:** Test doubles and LSP substitutability  **Lec:** 6  **Type:** recall  **Id:** 2719b0d7
**A:** Key:
1. False: it is the other way round.
2. A stub controls what the dependency gives back, which is controllability.
3. A spy records what the code under test sent to it, which is observability.

False, it is the other way round. A stub controls what the dependency gives back, so the test decides what the code under test receives: that is controllability. A spy records what the code under test sent to it, so the test can inspect an effect that would otherwise be invisible: that is observability. The reader's wording matches: a stub lets the test "supply values," a spy "records the arguments provided to the method calls." One object can do both, like the reader's `FakeLocator`, which returns fixed values and appends every call to `myCalls`.

### Q: True or false, and justify: "The dependency inversion principle says the test should construct the real dependency and pass it in."
**Topic:** Test doubles and LSP substitutability  **Lec:** 6  **Type:** recall  **Id:** 3edce7d1
**A:** Key:
1. False.
2. DIP says depend upon abstractions, not implementations, so the code under test depends on an interface such as `IReader`.
3. What gets passed in is anything that implements the interface, such as a `testReader` double in the test.
4. Passing in the real dependency would keep it uncontrollable, unobservable or slow.

False. DIP says "depend upon abstractions, do not depend upon implementations." The code under test depends on an interface, `IReader`, and receives an implementation from outside. Passing the dependency in is the mechanism, but what gets passed is anything that implements the interface: the real `reader` in production, a `testReader` double in the test. The point of the principle for testing is that the code under test cannot tell which one it got. Passing in the real dependency would keep it uncontrollable, unobservable, or slow, the three cases that made the test hard in the first place.

### Q: Shared setup for all parts. `printStatus(offeringId)` looks up the offering, logs "no offering" and returns if it is missing, and otherwise computes `daysLeft` from `Date.parse(SEASON[offering.season]) - Date.now()`. For each statement say true or false and justify. (a) "Its testability problem is only observability." (b) "Replacing `Date.now()` with an injected clock is the DIP applied." (c) "After injecting a clock and returning the status instead of logging it, the function no longer needs a test double for `findOffering`."
**Topic:** Test doubles and LSP substitutability  **Lec:** 6  **Type:** apply  **Id:** 32f48e5c
**A:** Parts:
1. (a) is false: besides the observability problem of `console.log`, reading `Date.now()` itself is a controllability problem.
2. (b) is true: the function depends on a clock abstraction instead of the concrete `Date`, which a test stubs with a fixed time.
3. (c) depends on `findOffering`: if it hits a database or the network, it still needs a stub returning a known offering or `undefined`, and if it is a fast, deterministic in-memory lookup with no side effects, use the real thing.

(a) False. Observability is one problem, because the only output goes to `console.log` and nothing can assert on it. Controllability is the other, because the function reads `Date.now()` itself, so the test cannot set the date and `daysLeft` changes every run. (b) True. The function stops depending on the concrete `Date` and depends on an abstraction, a clock interface, that the test implements with a stub returning a fixed time. (c) It depends on what `findOffering` is. If it hits a database or the network, it is still uncontrollable and slow and should be doubled with a stub that returns a known offering or `undefined`. If it is a fast, deterministic in-memory lookup with no side effects, the deck says use the real thing. The decision is per dependency, not per function.

### Q: True or false, and justify: "If a dependency is fast, deterministic and has no side effects, you should still double it so the unit test stays isolated."
**Topic:** Test doubles and LSP substitutability  **Lec:** 6  **Type:** critique  **Id:** 6116fbb3
**A:** Key:
1. False.
2. Use a double only when the real dependency is uncontrollable, unobservable, or unsafe or slow; otherwise use the real thing.
3. Doubling anyway pays the costs of another layer, a double that can drift from the real implementation, and real code that still needs tests.

False. Slide 12 says to use a double only when the real dependency is uncontrollable, unobservable, or unsafe or slow; otherwise use the real thing. Doubling anyway buys nothing on those three axes and pays all three costs from the recap: another layer in the design, a double that can drift from the real implementation and must be updated when the interface changes, and a real implementation that still needs its own tests. Isolation for its own sake is not one of the deck's reasons.

### Q: True or false, and justify: "Under the LSP methods rule, a subclass may accept more inputs than its superclass but may not promise less about its outputs."
**Topic:** Test doubles and LSP substitutability  **Lec:** 6  **Type:** recall  **Id:** 5cc0379f
**A:** Key:
1. True.
2. Preconditions should not be strengthened for the same inputs, so widening them to accept more inputs is allowed.
3. Postconditions should not be weakened for the same inputs, so promising less is not allowed.
4. Code written for the superclass relies on its accepted inputs and its promises, so a subclass breaking either breaks correct caller code.

True. The precondition rule says preconditions should not be strengthened for the same inputs, and widening them is fine, so accepting more inputs is allowed. The postcondition rule says postconditions should not be weakened for the same inputs, and narrowing them is fine, so promising less is not allowed. Both follow from substitutability: code written for the superclass calls with inputs the superclass accepted and relies on what the superclass promised, so a subclass that rejects some of those inputs (Penguin under 50 cm only) or delivers less than promised (Resize changing the height too) breaks correct caller code.

### Q: Shared setup for all parts.
```ts
interface Mailer {
  // REQUIRES: to is a well-formed address
  // EFFECTS: sends the message; returns the message id; never throws
  send(to: string, body: string): string;
}
class LoggingMailer implements Mailer {
  // REQUIRES: to is a well-formed address AND the domain is on the allow-list
  send(to: string, body: string): string { ... }
}
class SpyMailer implements Mailer {
  sent: Array<[string, string]> = [];
  send(to: string, body: string): string { this.sent.push([to, body]); return "id-1"; }
}
```
For each statement say true or false and justify. (a) "`LoggingMailer` satisfies LSP because it has the same signature." (b) "`SpyMailer` is a valid double for a test that checks a reminder was sent to the right address." (c) "A `ThrowingMailer` whose `send` throws on every call is a valid stub for testing the error path."
**Topic:** Test doubles and LSP substitutability  **Lec:** 6  **Type:** apply  **Id:** d9850381
**A:** Parts:
1. (a) is false: the same signature is only the shape, and the allow-list is a stronger precondition for the same inputs, so code correct against `Mailer` breaks when handed a `LoggingMailer`.
2. (b) is true, because `SpyMailer` keeps the contract and records what the code under test sent.
3. (c) is false, because the interface promises `send` never throws, so there is no error path and a throwing double is not a valid subtype.

(a) False. Same signature is the shape. The allow-list requirement is a stronger precondition for the same inputs: addresses the interface accepts are now rejected, so code correct against `Mailer` breaks when handed a `LoggingMailer`. Penguin again. (b) True. It keeps the contract, it accepts every well-formed address, returns an id and never throws, and it records what the code under test sent, which is what the test needs to observe. (c) False. The interface promises `send` never throws, so there is no error path to test, and a double that throws is not a valid subtype. If the real mailer can fail, the fix is to change the contract to say so, and only then write a stub for that outcome. A double cannot invent behaviour the interface does not promise.

### Q: True or false, and justify: "LSP only applies to classes that use `extends`; an object that merely `implements` an interface is not subject to it."
**Topic:** Test doubles and LSP substitutability  **Lec:** 6  **Type:** recall  **Id:** 5aac9364
**A:** Key:
1. False.
2. LSP is about subtypes: if a property is provable about objects of type T, it should hold for objects of any subtype S.
3. An implementation of an interface, including a test double, is a subtype of that interface.

False. Liskov and Wing's statement is about subtypes: if a property is provable about objects of type T, it should hold for objects of any subtype S. An implementation of an interface is a subtype of that interface, and so is a test double, which is why the deck uses LSP as the test for a valid double: it must keep the interface's contract, not just its shape. The reader's one-liner says the same without mentioning inheritance: any object can be interchanged with any other that has the same parent type.

### Q: True or false, and justify: "Once `buyCoffee` passes its tests against the approving, declining and recording readers, the real card reader does not need tests of its own."
**Topic:** Test doubles and LSP substitutability  **Lec:** 6  **Type:** critique  **Id:** 0dae55fb
**A:** Key:
1. False.
2. The doubles prove only that `buyCoffee` does the right thing for each outcome the interface promises.
3. They prove nothing about whether the real reader produces those outcomes correctly, talks to the bank properly, or still matches the interface.

False. The doubles prove `buyCoffee` does the right thing for each outcome the interface promises. They prove nothing about whether the real reader produces those outcomes correctly, talks to the bank properly, or still matches the interface after a change. The recap lists this as one of the three costs: the real implementation still needs tests of its own. The other two are the extra layer and the drift of doubles away from the real thing when the interface changes.

### Q: True or false, and justify: "Slide 16's Resize example breaks LSP by strengthening a precondition."
**Topic:** Test doubles and LSP substitutability  **Lec:** 6  **Type:** apply  **Id:** d5a84c26
**A:** Key:
1. False.
2. The subclass where changing the width also changes the height still accepts the same inputs, so the precondition is untouched.
3. It weakens the postcondition: callers were promised the other dimension is unchanged and get an extra effect.

False. Resize lets the caller set one dimension and promises the other is unchanged. The subclass where changing the width also changes the height still accepts the same inputs, so the precondition is untouched. What it breaks is the postcondition: callers were promised one effect and get an extra one, so the promise is weakened. The precondition case on the same slide is Penguin, whose "under 50 cm only" narrows the inputs the superclass accepted. The two rules catch different violations, and an exam question will ask which one.

## Labs 2–4 and practice set 4 — PrairieLearn (banked 2026-10-06; fragments reworded and renumbered, nothing copied; Lab 2 is closed and marked, so its model answers are the course's; Labs 3–4 and PRAQ04 were still open, so those answers are mine and say so)

The lab format is the best exam sample there is: single-choice, "select every statement that is true", a whole number, and true/false per statement marked +1 right, -0.5 wrong, 0 blank. Questions below keep that shape. Lab 2 came back at 74% with the misses on connascence of value vs type vs name, on the "how you find out" test, and on logic and order bindings, so those get the most questions.

### Q: Three classes each hold their own private list of accepted coupon codes: one validates a code, one prints the codes in a banner, one gates the submit button. (a) Degree of the agreement? (b) Strongest connascence? (c) Add a code to one list only: build fails, runtime exception, or silently wrong? Justify each.
**Topic:** Coupling & connascence  **Lec:** Lab 2  **Type:** apply  **Id:** d5fac166
**A:** Parts:
1. (a) The degree is 3, because three places hold the same list.
2. (b) The strongest connascence is value, because three places must hold the same literal strings.
3. (c) Adding a code to one list is silently wrong: the build is clean and tests pass, but one place advertises a code another rejects.

(a) 3: three places hold the same list and nothing marks them as the same fact. (b) Value: three places must hold the same literal strings. Not name (each list has a different name) and not algorithm (the membership check is not the agreement, the contents are). (c) Silently wrong: the build is clean and the tests pass, and one place advertises a code another rejects until a customer complains. Fix: one shared constant, degree 1.

### Q: True or false, and justify: "A settings store is read with `store.get("retries") as number` and `.toFixed(0)` is called on the result. The strongest connascence between whoever writes that key and this reader is connascence of type."
**Topic:** Coupling & connascence  **Lec:** Lab 2  **Type:** critique  **Id:** 297342ab
**A:** Key:
1. False: the strongest connascence is value, because both sides must agree on the literal key `"retries"`.
2. Type connascence is present too, but it is weaker, and the `as number` cast is an assumption, not a check.

False. It is connascence of value: both sides must agree on the literal key `"retries"`, and nothing checks that agreement. Type connascence is present too, but it is the weaker of the two, and the `as number` cast is an assumption, not a check. Degree is 2 (the writer of the key and the reader). How you find out: `store.set("retries", "3")` compiles, then `.toFixed` throws a TypeError at run time. Misspelling the key on either side also crashes, because `get` returns `undefined` and `undefined.toFixed` throws. So this one is a runtime crash, not silently wrong and not caught by the compiler. (Lab 2's marked answer: 2, value, runtime crash.)

### Q: True or false, and justify: "Two classes compute a line total independently, one as `price * qty * (1 + tax)` and the other as `price * qty + price * qty * tax`. Since no literal is shared between them, there is no coupling."
**Topic:** Coupling & connascence  **Lec:** Lab 2  **Type:** critique  **Id:** 18b74ff2
**A:** Key:
1. False: it is connascence of algorithm.
2. Both classes must derive the same rule and nothing names or shares it, so changing one leaves the other silently wrong with a clean build.
3. It is not value, because no literal is shared and the tax rate is a parameter on both sides.

False. Connascence of algorithm, degree 2: both must derive the same rule and nothing names or shares it. Change the rule in one place and the other is silently wrong, with a clean build. Value needs a shared literal; here the tax rate is a parameter on both sides, so what must agree is the computation. Fix: one function both call.

### Q: A status service returns a number with the comment "0 = draft, 1 = sent, 2 = failed". A notifier checks `=== 1` and a dashboard maps 0, 1 and anything else to labels. (a) Degree? (b) Connascence? (c) Change the service to return 2 for sent. What happens? (d) The fix that moves up the table? Justify each.
**Topic:** Coupling & connascence  **Lec:** Lab 2  **Type:** apply  **Id:** 543ea8e5
**A:** Parts:
1. (a) The degree is 3 modules, or 5 literal sites if you count comparisons, as long as you say which you counted.
2. (b) The connascence is value, because three places must agree that 1 means sent and only a comment records the encoding.
3. (c) Returning 2 for sent is silently wrong: it compiles, the notifier goes quiet and the dashboard reports sent orders as failed.
4. (d) The fix is a union type `"draft" | "sent" | "failed"`, which turns value into name so the compiler visits every site.

(a) 3 modules, 5 literal sites if you count comparisons; either is fine if you say which you counted. (b) Value: three places must agree that 1 means sent, and only a comment records the encoding. Not type: everything is a number and stays a number; what is in dispute is which number means what. (c) Silently wrong: it compiles, the notifier goes quiet and the dashboard tells a customer their sent order failed. (d) A union type `"draft" | "sent" | "failed"`: value becomes name, and the compiler visits every site when a case is added. (Lab 2's marked answer: 3, value, silently wrong. Your first attempt said 6, type, build fails.)

### Q: `static distance(x1, y1, x2, y2)` is called as `distance(a[0], a[1], b[0], b[1])` where a and b are bare `number[]`. (a) Degree? (b) Connascence? (c) Swap x2 and y2 in the signature only. What happens? (d) Fix? Justify each.
**Topic:** Coupling & connascence  **Lec:** Lab 2  **Type:** apply  **Id:** 1405dc93
**A:** Parts:
1. (a) Degree 2, plus a positional agreement every caller of the `number[]` version carries: index 0 is x.
2. (b) Connascence of position, not type: both sides must agree on the order of four values, all of them numbers.
3. (c) Silently wrong: the call still compiles and returns a number, the wrong one.
4. (d) A named shape `{ x: number; y: number }`, so a transposed call does not compile and position becomes name.

(a) 2, plus a second positional agreement the caller carries on its own: every caller of the `number[]` version has to know index 0 is x. (b) Position: both sides must agree on the order of four values. Not type: all four really are numbers on both sides, which is exactly why the type system cannot help. (c) Silently wrong: the call still compiles and still returns a number, the wrong one. (d) A named shape `{ x: number; y: number }`: the call cannot be transposed in a way that compiles, so position becomes name. (Lab 2's marked answer: 2, position, silently wrong. Your first attempt said 5, name, runtime crash.)

### Q: True or false, and justify: "A login checker re-implements the password hashing loop instead of calling the hasher. Because both copies contain the literal multiplier 31, this is connascence of value."
**Topic:** Coupling & connascence  **Lec:** Lab 2  **Type:** critique  **Id:** 4c0cf9c6
**A:** Key:
1. False: it is connascence of algorithm, not value.
2. The loop, the multiplier, the concatenation order and the output encoding all have to match, and the agreement is written out twice.
3. A shared literal inside a duplicated computation does not make the agreement about the literal.

False. It is connascence of algorithm: the loop, the multiplier, the concatenation order and the output encoding all have to match, and the agreement is written out twice. A shared literal inside a duplicated computation does not make the agreement about the literal. Break it by swapping `password + salt` to `salt + password` on one side: clean build, every valid password rejected, and the symptom "users cannot log in" points at authentication, not at a duplicated loop. Fix: centralise, degree 1.

### Q: True or false, and justify: "A cart stores `any[]` and a checkout compares items with `===`. Because the item type is `any`, there is no coupling between the cart and its callers."
**Topic:** Coupling & connascence  **Lec:** Lab 2  **Type:** critique  **Id:** 3bd7b21d
**A:** Key:
1. False: there is connascence of type, made implicit instead of explicit.
2. Every caller of `add` and of the checkout must agree on what an item looks like, and `any` makes those parties impossible to enumerate.

False. There is connascence of type, made implicit instead of explicit: every caller of `add` and every caller of the checkout must agree on what an item looks like, and `any` means the agreement has an unbounded number of parties you cannot enumerate. It is already silently wrong in the fragment: two structurally identical object literals compared with `===` are not equal, so the loop finds nothing and reports nothing. The fix in TypeScript is not to loosen past type but to declare the type once and use it in both places.

### Q: A CSV importer builds `new Employee(row[0], row[1])` with a comment saying the export is `[lastName, firstName]`. The file is produced nightly by another team's payroll system in another repo. (a) Degree? (b) Connascence? (c) What happens if the exporter swaps its columns? (d) Fix? Justify each.
**Topic:** Coupling & connascence  **Lec:** Lab 2  **Type:** apply  **Id:** c220034a
**A:** Parts:
1. (a) Degree 3: an agreement's parties are whoever must hold it, including the other team's exporter outside your repository.
2. (b) Connascence of position: column order and parameter order must match, and only a comment records the order.
3. (c) Silently wrong: every name comes in backwards with a clean build and green tests, since both columns are strings.
4. (d) Read the header row and look columns up by name, so position becomes value.

(a) 3, and the third party is not in your repository. An agreement's parties are whoever has to hold it, not whoever is checked into your source control, and the party outside is the one you cannot watch change. Answering 2 is tidy and wrong in the direction that matters. (b) Position: column order and parameter order must match, and only a comment records which order. (c) Silently wrong: every name comes in backwards with a clean build and green tests, since both columns are strings. (d) Read the header row and look columns up by name; position becomes value. (Lab 2's marked answer: 3, position, silently wrong. Your first attempt said 2, type, runtime crash.)

### Q: True or false, and justify: "Of the five kinds of connascence, name is the one the build catches for you: rename the method and every call site fails to compile."
**Topic:** Coupling & connascence  **Lec:** Lab 2  **Type:** recall  **Id:** 2f78e1ec
**A:** Key:
1. True.
2. Name is the weakest kind and the only one the compiler reports at every call site; the others crash at run time or are silently wrong.

True. Name is the weakest kind in the table and the only one in the Lab 2 set where the compiler reports the break, at every call site, with a message naming the problem. A method defined once and called once by name is degree 2, name, build fails. Every other kind in the worksheet was either a runtime crash or silently wrong. (Lab 2's marked answer: 2, name, build fails. Your first attempt said algorithm, silently wrong.)

### Q: State the Lab 2 procedure for working out how a coupling will be found, and name the three outcomes in order from best to worst.
**Topic:** Coupling & connascence  **Lec:** Lab 2  **Type:** recall  **Id:** 9c21dfa9
**A:** Parts:
1. Make the smallest change to one side that makes the other wrong, then ask what happens.
2. Best: the compiler tells you and the build fails.
3. Middle: it crashes at run time, at the point the assumption is used.
4. Worst: it is silently wrong, compiling and running with the wrong answer.

Make the smallest change to one side that makes the other wrong, then ask what happens. Best: the compiler tells you and the build fails. Middle: it crashes at run time, at the point the assumption is used. Worst: it is silently wrong, compiling and running with the wrong answer. Nothing in a value, position or algorithm agreement is expressed in a way the type system can check, so those land in the bottom two.

### Q: In one function body: `subtotal = sum of lines` (1), `tax = subtotal * RATE` (2), `audit.append(...)` (4), `metrics.increment(...)` (5). For each pair, say true or false for data, logic and order binding, and justify each: (a) 1 and 2, (b) 4 and 5, (c) 2 and 4.
**Topic:** Cohesion & bindings  **Lec:** Lab 2  **Type:** apply  **Id:** ee02b8ca
**A:** Parts:
1. (a) 1 and 2: data, logic and order all true, since 2 reads what 1 produced, both run on every call, and swapping does not compile.
2. (b) 4 and 5: data false, logic true, order false, since neither reads the other, both run on the same call, and swapping changes nothing.
3. (c) 2 and 4: data false, logic true, order false, since they share nothing but the same condition, and swapping leaves the program identical.

(a) All three true: 2 reads what 1 produced (data), both run whenever the function is called (logic), and swapping them does not compile (order). (b) Data false, logic true, order false: one appends to the audit log, the other increments a counter, neither reads the other, both run on the same call, and swapping them changes nothing. (c) Data false, logic true, order false: tax and the audit log have nothing in common, but they happen under the same condition, and swapping them leaves the program identical. (Lab 2's marked answers: T T T, F T F, F T F. Your first attempt said F F F, T T F, T T T.)

### Q: True or false, and justify: "Two statements in the same function body always share a logic binding."
**Topic:** Cohesion & bindings  **Lec:** Lab 2  **Type:** critique  **Id:** fb0997f4
**A:** Key:
1. False.
2. Logic binding means the two happen for the same reason: same trigger, same condition, same moment.
3. A statement inside an `if` and one after it in the same function do not share it, because one is conditional and the other runs on every call.

False. Logic binding means the two happen for the same reason: same trigger, same condition, same moment. A statement inside an `if` and a statement after it in the same function do not share it, because one is conditional and the other runs on every call. Two statements both at the top level of a function do share it, even when they are otherwise unrelated.

### Q: True or false, and justify: "Two loops over the same `orders` array that both read `order.status` share an order binding."
**Topic:** Cohesion & bindings  **Lec:** Lab 2  **Type:** critique  **Id:** f3d85495
**A:** Key:
1. False: they share a data binding (same array, same field), not an order binding.
2. Order binding needs one block to change something the other depends on, and reading the same field does not create an ordering.

False. They share a data binding (same array, same field), but order binding needs one block to change something the other depends on. If the first loop only sums paid and refunded orders and the second only turns old pending orders into cancelled ones, swapping them leaves the totals identical. Reading the same field is not enough to create an ordering.

### Q: `seatsLeft -= 1` (1); `if (seatsLeft === 0) {` (2) `mailer.send(ADMIN, "full")` (3); `customer.status = "Winner"` (4) `}`; `customer.status = tierFor(customer)` (5). (a) Bindings for 3 and 4? (b) Bindings for 4 and 5? (c) What does the ordering of 4 and 5 reveal? Justify each.
**Topic:** Cohesion & bindings  **Lec:** Lab 2  **Type:** apply  **Id:** 76be22e6
**A:** Parts:
1. (a) 3 and 4: data false (different objects), logic true (both run only when line 2 is true), order false (reversing changes nothing).
2. (b) 4 and 5: data true (both write `customer.status`), logic false (4 is conditional, 5 runs every call), order true (swapping changes the result).
3. (c) A bug: line 5 unconditionally overwrites the "Winner" status that line 4 just set, so the winner never keeps it.

(a) Data false (different objects), logic true (both run only when line 2 is true), order false (reverse them and nothing changes). (b) Data true (both write `customer.status`), logic false (4 is conditional, 5 runs on every call), order true (swap them and the result differs). (c) A bug: line 5 unconditionally overwrites the "Winner" status that line 4 just set, so the winner never keeps it. Order binding is often where a bug hides.

### Q: A sweep function has blocks: (A) declares `notices` and `promoted`; (B) a loop that fills both; (C) a loop over the same offerings that runs only when a config flag is on and reads `seatsLeft`, which (B) changes; (D) reports `promoted` to metrics; (E) loops over `notices` and sends mail. Bindings for (A, B), (B, C) and (D, E)? Justify each.
**Topic:** Cohesion & bindings  **Lec:** Lab 2  **Type:** apply  **Id:** 2093c9d4
**A:** Parts:
1. (A, B): data, logic and order all true, since B fills what A declared, both run every sweep, and A below B does not compile.
2. (B, C): data true, logic false (C runs only under the flag), order true (C reads `seatsLeft`, which B modifies).
3. (D, E): data false, logic true (both run once at the end of every call), order false (metrics do not care whether the mail has gone out).

(A, B): all three true. B fills what A declared, both run every sweep, and A below B does not compile. (B, C): data true (same array, same list), logic false (C runs only under the flag), order true (C decides "at risk" from `seatsLeft`, which B modified). (D, E): data false (promoted count vs notices list), logic true (both once at the end of every call), order false (metrics do not care whether the mail has gone out). (Lab 2's marked answers: T T T, T F T, F T F. Your first attempt said F F T, F T T, T T T.)

### Q: A shipping calculator and a checkout summary both compare `orderTotal >= 75`, and the summary also computes `75 - orderTotal`. (a) How many places must be edited to change the threshold? (b) Connascence before and after extracting `FREE_SHIPPING_THRESHOLD`? (c) True or false, and justify: "After the constant is extracted the two classes are no longer coupled." What change would remove that coupling?
**Topic:** Coupling & connascence  **Lec:** Lab 3  **Type:** apply  **Id:** 9ca8dd47
**A:** Parts:
1. (a) 3 places: three literal sites, not two methods.
2. (b) Connascence of value before, name after: the sites agree only on the constant's name, and the build catches a rename.
3. (c) False: both classes still encode the rule "free at or above the threshold" (the `>=` comparison), connascence of algorithm.
4. To remove it, move the decision into one `qualifiesForFreeShipping(total)` that the summary calls.

(a) 3: three literal sites, not two methods. Nothing marks them as the same fact; they just happen to agree. (b) Value before, name after: every site now has to agree only on the constant's name, and a rename is caught by the build. (c) False. Both classes still encode the rule "free when total is at or above the threshold" (the `>=` comparison), which is connascence of algorithm. Move the decision into one `qualifiesForFreeShipping(total)` and the summary calls it. (Lab 3 marked answer: 3, value, name.)

### Q: Three functions each branch on `account.tier` with `if bronze… if silver… return gold-value`. Product adds a platinum tier. (a) True or false, and justify: "Adding `"platinum"` to the `Tier` union makes the compiler flag every function that does not handle it." (b) Connascence before and after replacing the chains with one lookup table typed `Record<Tier, Benefits>`? (c) What happens if platinum is added to the union but not the table?
**Topic:** Coupling & connascence  **Lec:** Lab 3  **Type:** critique  **Id:** e31b2119
**A:** Parts:
1. (a) False: each chain ends in an unconditional return, so a platinum account falls through and silently gets gold's values.
2. (b) Connascence of value before: each function independently encodes the full tier mapping as literals.
3. (b) Connascence of type after, not name: consumers agree only on the shape `Record<Tier, Benefits>`, the one place that says what a tier means.
4. (c) Loud instead of silent: the lookup returns `undefined` and the first property read throws, or a typed object literal missing the key fails to compile.

(a) False. Each chain ends in an unconditional return, so a platinum account falls through and silently gets gold's values. All three functions need a new branch. (b) Value before (each function independently encodes the full tier mapping as literals), type after: consumers agree only on the shape `Record<Tier, Benefits>`, and there is exactly one place that says what a tier means. Not name. (c) The lab's model answer: the lookup returns `undefined` and the first property read throws, loud instead of silent. Note that an object literal typed `Record<Tier, …>` with a key missing is actually a compile error in TypeScript, which is better still; say which you mean. (Lab 3 marked answer: 3 functions, silently gold, value, type.)

### Q: An invoice printer with no fields of its own sums an order's lines, applies the order's discount, then formats the customer's name, city and province. (a) Whose data does it compute from, and what smell is that? (b) Order changes its address from `{ city, province }` to one `addressLine` string: how many classes change? (c) Bindings between the compute block and the format block? (d) The refactoring, and what stays in the printer? Justify (b) and (c).
**Topic:** Code smells  **Lec:** Lab 3  **Type:** apply  **Id:** 2d451c54
**A:** Parts:
1. (a) Entirely Order's data: feature envy, so the method wants to live on Order.
2. (b) 2 classes change, Order and the printer, because the printer reaches into the address shape.
3. (c) Data, logic and order all true: the format line uses the computed total, both run on the same call, and an uncomputed total cannot be printed.
4. (d) Move subtotal, discount and total onto Order as methods; the printer keeps only formatting.

(a) Entirely Order's. That is feature envy: the method wants to live on Order. (b) 2: Order and the printer, because the printer reaches into the address shape. (c) Data true (the format line uses the total the compute block produced), logic true (same call), order true (you cannot print a total you have not computed). (d) Move subtotal, discount and total onto Order as methods; the printer keeps only formatting, and the address reach-through goes too if Order exposes a formatted address. My answer; the lab was open.

### Q: A label printer has an if-chain over a three-value `packageType` union, each branch assigning a bare handling fee, and a fourth type arrives next sprint. True or false, and justify: "Moving all of the printer's computation onto Shipment is the change that most reduces the risk that the new type is handled silently wrong."
**Topic:** Refactoring  **Lec:** Lab 3  **Type:** critique  **Id:** 5961ceed
**A:** Key:
1. False.
2. The risk is connascence of value between the if-chain's literals and the union, so a missing type gets handling 0 with a clean build.
3. The change that attacks it is a lookup table keyed by `packageType`, typed over the union, so the build complains if a type is missing.
4. Moving computation onto Shipment is a cohesion fix and does not touch the fall-through.

False. The risk is coupling: the if-chain's literals and the union type must agree on the set of package types, connascence of value, and a type that is missing from the chain gets handling 0 with a clean build. The change that attacks that is a lookup table keyed by `packageType`, typed over the union, so a new type has one place to go and the build complains if it is missing. Moving computation onto Shipment is a cohesion fix that is worth doing later if Shipment's shape keeps changing or other printers appear, but it does not touch the fall-through. A comment does nothing. My answer; the lab was open.

### Q: A teammate replaces an `OrderStatus` enum with a class of five static readonly instances and `isPaid()`-style methods, and claims it reduces connascence. (a) True or false, and justify: "This change weakens the connascence." (b) What connascence do callers of `isPaid()` have with the class?
**Topic:** Coupling & connascence  **Lec:** Lab 3  **Type:** critique  **Id:** 58dd0bd3
**A:** Key:
1. (a) False: the change does not weaken the connascence.
2. `order.status === OrderStatus.Paid` and `order.status.isPaid()` are both agreements on a shared identifier.
3. (b) Connascence of name: callers reference method names that must stay consistent, as they referenced enum member names before.

(a) False. `order.status === OrderStatus.Paid` and `order.status.isPaid()` are both agreements on a shared identifier. (b) Name: callers reference method names that must stay consistent, exactly as they referenced enum member names before. The class adds five methods to maintain for no change in kind; the enum stays simpler unless the class is going to carry real behaviour per status. My answer; the lab was open.

### Q: For each pair, say whether the second version has lower, same or higher observability and controllability than the first, and why. (a) `Die.roll(sides)` returns a random value vs `LoadedDie.roll(sides)` returns `sides`. (b) `Receipt.render` logs and returns the string vs `PrintedReceipt.render` only logs. (c) `Greeter.greet(name, hour)` vs `ClockGreeter.greet(name)` reading `new Date()`. (d) one 25-line `total(items, code, province)` vs the same split into `subtotal`, `discount`, `tax`, `shipping` methods that `total` calls.
**Topic:** Controllability and observability  **Lec:** Lab 3  **Type:** apply  **Id:** 511344c4
**A:** Parts:
1. (a) LoadedDie: observability same (both return the number), controllability higher (the result is fixed by an input the test chooses).
2. (b) PrintedReceipt: observability lower (nothing comes back, the result goes to the console), controllability same.
3. (c) ClockGreeter: observability same, controllability lower, because the hour comes from the clock and a test cannot pick "evening".
4. (d) Split version: both higher, since each step takes inputs the test chooses and returns its intermediate value.

(a) Observability same (both return the number); controllability higher, because the result is fixed by an input the test chooses instead of by `Math.random`, which a test cannot set. (b) Observability lower (nothing comes back; the result goes to the console); controllability same (same parameters). (c) Observability same; controllability lower, because the hour now comes from the clock and a test cannot pick "evening". (d) Both higher: each step can be called with inputs the test chooses (controllability), and each intermediate value is returned instead of buried in a local (observability). My answers; the lab was open.

### Q: `place(order)` has four marked lines: (A) `subtotal += line.price * line.qty`; (B) `surcharge = weekend(new Date()) ? 4.99 : 0`; (C) `this.backorders.push(sku)` inside `if (!warehouse.reserve(...))` where warehouse is the real system and `backorders` is private; (D) `mailer.send(order.email, ...)` with a real mailer. It returns `{ subtotal, surcharge, total }`. For each line: does controllability limit the test, does observability? Justify each.
**Topic:** Controllability and observability  **Lec:** Lab 3  **Type:** apply  **Id:** 8fa7b810
**A:** Parts:
1. (A) Neither limits the test: the lines go in and subtotal comes back in the return.
2. (B) Controllability: the test cannot choose the day, but surcharge is returned, so it is observable.
3. (C) Both: the test cannot make the real warehouse say no, and the pushed value sits in a private field nothing returns.
4. (D) Observability: `place` can be called with any order, but the test cannot see what the real mailer sent.

(A) Neither: the test passes the lines in and reads subtotal from the return. Write the test for this one. (B) Controllability: the test cannot choose the day. Observable, since surcharge is returned. (C) Both: the test cannot make the real warehouse say no, and the pushed value sits in a private field nothing returns. (D) Observability: the test can call `place` with any order (controllable) but cannot see what the real mailer sent, and it really sends. My answers; the lab was open.

### Q: `login(user, pw)` counts attempts in a private map; after 3 it writes `audit.write("locked")` (A) to the server log and returns `"locked"` (B); it then calls `findUser` against the production database and returns `"wrong password"` (C) on a hash mismatch; on success it stores `{ user, expires: Date.now() + 1h }` (D) in a module-level map that is not exported. For each marked line: controllability limited, observability limited? Justify each.
**Topic:** Controllability and observability  **Lec:** Lab 3  **Type:** apply  **Id:** 9437d254
**A:** Parts:
1. (A) Observability only: four calls reach it, but the test cannot read the server's audit file.
2. (B) Neither: call login four times and read the return value.
3. (C) Controllability: the branch needs a user the production database happens to contain, and the test cannot plant one.
4. (D) Both: `Date.now()` cannot be set, and the module-private sessions map cannot be read.

(A) Observability only: the test can call login four times to get there, but cannot read the server's audit file. (B) Neither: four calls, read the return value. Write this test. (C) Controllability: the branch needs a user the production database happens to contain, and the test cannot plant one. The return is observable. (D) Both: `Date.now()` cannot be set, and the sessions map is module-private so the expiry cannot be read. My answers; the lab was open.

### Q: True or false, and justify: "`class Builder { constructor(private fmt: IFormatter) {} }` with `CsvFormatter implements IFormatter` and a `FakeFormatter implements IFormatter` used in tests correctly implements the dependency inversion principle."
**Topic:** Test doubles and LSP substitutability  **Lec:** Lab 4  **Type:** critique  **Id:** 67c79cdc
**A:** Key:
1. True.
2. The builder depends on an interface it owns and receives the concrete formatter through its constructor, so the fake is just another implementation.

True. The high-level module depends on an interface it owns, the concrete formatter is passed in from outside through the constructor, and the fake is just another implementation of the same interface. Nothing in the builder names `CsvFormatter`. My answer; the lab was open.

### Q: True or false, and justify: "`class Notifier { private sender = new EmailSender(); }` together with `class FakeEmailSender extends EmailSender { override send(...) { this.sent.push(...) } }` correctly implements DIP, because the fake can stand in for the real sender."
**Topic:** Test doubles and LSP substitutability  **Lec:** Lab 4  **Type:** critique  **Id:** 50bfb35b
**A:** Key:
1. False.
2. The notifier constructs the concrete `EmailSender` itself, so there is no seam: nothing can inject the fake subclass.

False. The notifier constructs the concrete `EmailSender` itself, so there is no seam: a test cannot hand it the fake, and subclassing the real class does not help because nothing ever injects the subclass. Fix: an `IEmailSender` interface with `send`, owned next to the notifier, the notifier taking an `IEmailSender` through its constructor, and the real and fake senders both implementing it. My answer; the practice set was open.

### Q: An order processor creates `new FileAuditLog()` as a field and calls `write` on it; `write` appends to `audit.log` on disk. (a) DIP satisfied? (b) Which property limits a test that wants to check the logged message? (c) True or false: "A `FakeAuditLog` that records messages in an array weakens the postcondition of `IAuditLog.write`, because it does not persist to disk." Justify each.
**Topic:** Test doubles and LSP substitutability  **Lec:** Lab 4  **Type:** critique  **Id:** edc7429f
**A:** Parts:
1. (a) No: the high-level class instantiates the concrete filesystem logger, so it cannot run without disk I/O or be handed a double.
2. (b) Observability: the message goes to a file the test cannot easily read.
3. (c) False: the interface promises only that the message is recorded, not how or where, so the fake is substitutable.

(a) No: the high-level class instantiates the concrete filesystem logger, so it cannot run without disk I/O and cannot be handed a double. (b) Observability: the message goes to a file the test cannot easily read. (c) False. The interface promises only that the message is recorded, not how or where. A fake that keeps the contract is substitutable; "to disk" was never part of the promise. My answers; the lab was open.

### Q: For each subclass override, say whether the precondition is strengthened, weakened or unchanged, whether the postcondition is strengthened, weakened or unchanged, and whether LSP is violated. (a) `PriceList.priceOf(sku)` returns the stored non-negative price or throws on an unknown sku; `SalePriceList.priceOf` returns `super.priceOf(sku) - discount`. (b) `Bike.ride(d)` adds any distance and throws once the total passes 1000; `CoolBike.ride` first throws if `d < 0`. (c) `Shipping.quote(kg)` throws for `kg <= 0` or `kg > 30`; `FreightShipping.quote` throws only for `kg <= 0`, delegates up to 30 and prices heavier parcels itself. Justify each.
**Topic:** Test doubles and LSP substitutability  **Lec:** Lab 4  **Type:** apply  **Id:** 2a7beaf8
**A:** Parts:
1. (a) Precondition unchanged, postcondition weakened (returns less than the stored price, possibly negative): an LSP violation.
2. (b) Precondition strengthened (rejects the negative distance the base accepted), postcondition unchanged: an LSP violation.
3. (c) Precondition weakened (accepts more inputs), postcondition unchanged for every input the base accepted: allowed.

(a) Precondition unchanged (same throw on unknown sku); postcondition weakened: the base promises the price that was stored, the subclass returns less and can go negative (store 5, discount 10, get -5). Violation. (b) Precondition strengthened: the base accepted a negative distance, the subclass rejects it; postcondition unchanged. Violation, shown by a test that rides -5 on a `Bike` variable holding a `CoolBike`. (c) Precondition weakened (accepts more inputs), postcondition unchanged for every input the base accepted (same formula up to 30). Allowed. My answers; the practice set was open.

### Q: Same drill for: (a) `Account.withdraw(a)` throws on `a <= 0` or `a > balance` and returns the new balance; `ScammyAccount.withdraw` also throws on `a > 100` and deducts an extra 1. (b) `Die.roll(sides)` returns a random 1..sides; `LoadedDie.roll` returns `sides`. (c) `Thermostat.setTarget(c)` clamps to 10..30 and returns it; `SmartThermostat.setTarget` rounds and does not clamp. (d) `Directory.lookup(name)` throws `NotFoundError` when absent; `RemoteDirectory.lookup` throws `HttpError(404)` instead, and a caller catches only `NotFoundError`. Justify each.
**Topic:** Test doubles and LSP substitutability  **Lec:** Lab 4  **Type:** apply  **Id:** 10e0aadb
**A:** Parts:
1. (a) Precondition strengthened (rejects 101) and postcondition weakened (returns `balance - a - 1`): a violation.
2. (b) Precondition unchanged, postcondition strengthened (`sides` is always inside 1..sides): not a violation.
3. (c) Precondition unchanged, postcondition weakened (returns 40 for 40 instead of a value in 10..30): a violation.
4. (d) Precondition unchanged, postcondition weakened because the exception type is part of the postcondition: a violation.

(a) Precondition strengthened (rejects 101 where the base allowed it) and postcondition weakened (returns balance - a - 1, not balance - a). Violation twice over. (b) Precondition unchanged; postcondition strengthened: `sides` is always inside 1..sides, so every promise the base made still holds. Not a violation, however useless the die. (c) Precondition unchanged (any number in); postcondition weakened: the base promised a value in 10..30 and the subclass returns 40 for 40. Violation. (d) Precondition unchanged; postcondition weakened, because the exception type is part of the postcondition. The caller's `catch` lets `HttpError` through, so a caller can tell the subtype apart. Violation. My answers; the practice set was open.

### Q: `recommend(city)` fetches the live weather, then returns one of three strings by temperature band. (a) Which property blocks each of the fetch line and the two return lines? (b) The DIP refactoring, and where the interface lives? (c) `open()` uses `crypto.randomUUID()` and `Date.now() + 30 min`, `isValid` compares `Date.now()` to the expiry, `close` logs to the console. Which property limits each? Justify (a) and (c).
**Topic:** Test doubles and LSP substitutability  **Lec:** Lab 4  **Type:** apply  **Id:** 9c87204b
**A:** Parts:
1. (a) Controllability for all three: the live fetch means the test cannot choose the temperature to reach each branch.
2. (b) An `IWeatherApi` with `getTemperatureCelsius(city)`, owned alongside the advisory (the high-level module) and passed in through the constructor.
3. (c) The random token and the expiry check: controllability, since the test cannot predict the id or advance the clock.
4. (c) The console log: observability, since nothing comes back.

(a) Controllability for all three: the live fetch means the test cannot choose the temperature, so it cannot reach the cold branch or the warm branch on purpose. The returns themselves are observable. (b) An `IWeatherApi` with `getTemperatureCelsius(city)`, owned alongside the advisory (the high-level module), passed in through the constructor; a `FakeWeatherApi` returns whatever the test sets, one test per band. (c) The token: controllability (random id the test cannot predict). The expiry check: controllability (the clock cannot be advanced). The console log: observability (nothing comes back). Fix: `IClock.nowMs()` and `IIdGenerator.generate()` through the constructor, with a `FakeClock` the test advances past 30 minutes. My answers; the lab was open.

## Lec 8 — Patterns I: Adapter and Composite (logged 2026-10-06, deck 05a-patterns-i.pdf + reader Design Patterns; Matt absent, deck only)

### Q: Name the four steps for understanding a design pattern, in order, and say which Module 1 problem "scattered" and "tangled" each point to.
**Topic:** Design patterns I: Adapter and Composite  **Lec:** 8  **Type:** recall  **Id:** d2f8969e
**A:** Parts:
1. Change, pain, mechanism, cost, in that order.
2. Scattered means the decision is spread over many places, a coupling problem.
3. Tangled means the decision is mixed with unrelated logic in one place, a cohesion problem.

Change (which decision is likely to vary), pain (where that decision scatters or tangles in the current code), mechanism (how the pattern gives the decision one home), cost (what indirection was added and whether it was worth it). Scattered means the decision is spread over many places, a coupling problem. Tangled means it is mixed with unrelated logic in one place, a cohesion problem.

### Q: True or false, and justify: "A design pattern is a class diagram; if your code matches the diagram, it uses the pattern, and if it does not, it does not."
**Topic:** Design patterns I: Adapter and Composite  **Lec:** 8  **Type:** critique  **Id:** 57df6a10
**A:** Key:
1. False.
2. A pattern is not a class diagram you copy, a library or a rule you must follow, but a reusable way of thinking about a recurring problem.
3. The purpose is not to classify code as "is" or "is not" a pattern but to give you more ways to structure it.

False. The deck says a pattern is not a class diagram you copy, not a library, and not a rule you must follow. It is a reusable way of thinking about a recurring problem, what emerges when a likely change is kept local, and a vocabulary for trade-offs. The reader adds that the purpose is not to classify code as "is" or "is not" a pattern but to give you more ways to structure it.

### Q: True or false, and justify: "Knowing whether a pattern is structural, creational or behavioural tells you when to use it."
**Topic:** Design patterns I: Adapter and Composite  **Lec:** 8  **Type:** critique  **Id:** 8227f712
**A:** Key:
1. False.
2. The categories organise the catalogue: structural realise relationships between entities, creational handle object creation, behavioural capture how objects communicate.
3. Whether to use one comes from the four-step analysis, above all whether change is likely and where the pain is.

False. The categories organise the catalogue: structural patterns realise relationships between entities, creational ones handle object creation, behavioural ones capture how objects communicate. Whether to use one comes from the four-step analysis, above all whether change is likely and where the pain is.

### Q: True or false, and justify: "Since every system will be changed, you should apply a pattern wherever one fits, before the change arrives."
**Topic:** Design patterns I: Adapter and Composite  **Lec:** 8  **Type:** critique  **Id:** 0696ba82
**A:** Key:
1. False.
2. Patterns help when change is likely, variability already exists, or coupling is already painful.
3. They hurt when requirements are stable, there is only one concrete case, or the abstraction costs more than the future benefit.

False. Patterns help when change is likely, variability already exists, or coupling is already painful. They hurt when requirements are stable, when there is only one concrete case, and when the abstraction costs more than the future benefit. Forcing a pattern adds indirection with nothing to pay for it; the cost step of the analysis exists to stop that.

### Q: The deck says the OO mechanism of a pattern is found by asking three questions. What are they?
**Topic:** Design patterns I: Adapter and Composite  **Lec:** 8  **Type:** recall  **Id:** a97f8fdd
**A:** Parts:
1. Abstraction asks what new interface or class gives the decision a single home.
2. Polymorphism and obliviousness asks what methods it declares, who calls them without knowing the concrete type, and whether a new implementation can override them safely.
3. Trigger asks when those methods are called, and by whom.

Abstraction: what new interface or class gives the decision a single home? Polymorphism and obliviousness: what methods does that abstraction declare, who calls them without knowing the concrete type, and can someone add a new implementation and override them safely? Trigger: when are those methods called, and by whom?

### Q: A listening-history app pulls plays from three services. Each of its four reports has one loop per service that calls that service's own client and translates its own field names. A fourth service is coming. Give the four-step analysis and name the pattern.
**Topic:** Design patterns I: Adapter and Composite  **Lec:** 8  **Type:** apply  **Id:** 4d9d70cd
**A:** Key:
1. Adapter.
2. Change: new services, each with its own interface.
3. Pain: one loop per service in every report (scattered), and report logic tangled with each service's calls and field translation.
4. Mechanism: a `PlaySource` interface returning normalised `Play` records, one adapter per service doing the translation, and reports holding a `PlaySource[]`.
5. Cost: one class per service, and the normalised record can only carry fields every service can supply.

Adapter. Change: new services, each with its own interface. Pain: one loop per service in every report (scattered) and report logic tangled with each service's calls and field translation. Mechanism: a `PlaySource` interface with one method returning normalised `Play` records; one adapter class per service wraps that service's client and does the translation; each report only holds a `PlaySource[]` and calls the method on each. Cost: one class per service, and the normalised record can only carry fields every service can supply.

### Q: True or false, and justify: "After adapters are introduced, each report's coupling to the services is connascence of name, since the reports only use the method's name."
**Topic:** Design patterns I: Adapter and Composite  **Lec:** 8  **Type:** critique  **Id:** 8675f4ec
**A:** Key:
1. False: it is connascence of type, not name.
2. Each report depends on one interface type that every adapter must satisfy.

False. The reader puts it at connascence of type: each report depends on one interface type that every adapter must satisfy. The bigger improvement is in degree, not strength: one dependency instead of one per service. Before the adapters, each report had an implicit connascence of type or algorithm with every service it touched.

### Q: A teammate adds `skipCount` to the normalised record because one platform exports it; the other adapters return `undefined` for it. Why does the deck's cost line say this is the wrong move?
**Topic:** Design patterns I: Adapter and Composite  **Lec:** 8  **Type:** critique  **Id:** 276a91aa
**A:** Key:
1. The normalised record can only hold fields every platform can supply.
2. A field only one source fills makes callers check which adapter a record came from, the type-dependent code the pattern removed.

The normalised record can only hold fields every platform can supply. A field only one source fills means callers have to check which adapter a record came from before using it, which is exactly the type-dependent code the pattern removed. Either every adapter can supply the field (possibly computed), or it does not belong on the shared record.

### Q: A `Manager` class holds `engineers: Engineer[]`, `designers: Designer[]` and `managers: Manager[]`, and `totalSalary()` loops over each array, recursing into `managers`. A technical-lead role is added that may or may not head a team. Give the four-step analysis and name the pattern.
**Topic:** Design patterns I: Adapter and Composite  **Lec:** 8  **Type:** apply  **Id:** e28f3e28
**A:** Key:
1. Composite.
2. Change: new roles, each of which might be one person or head a team.
3. Pain: one array and one loop per role in every Manager operation (scattered), each tangled with checking person versus team.
4. Mechanism: an `Employee` interface with `totalSalary()` and `headcount()`; a leaf answers for itself, and a Manager adds up its `Employee[]` reports.
5. Cost: one class per role, and a new operation is a new method in the interface and in every class.

Composite. Change: new roles, each of which might be one person or head a team. Pain: one array and one loop per role in every Manager operation (scattered), and each operation tangled with checking whether a report is a person or a team. Mechanism: an `Employee` interface with `totalSalary()` and `headcount()`; a leaf answers for itself, a Manager holds an `Employee[]` and adds up its reports; the client calls the method on any node and each Manager calls it on each of its reports. Cost: one class per role, and a new operation is a new method in the interface and in every class.

### Q: True or false, and justify: "In Composite, adding a new operation such as `averageTenure()` is cheap, because clients are oblivious to node types."
**Topic:** Design patterns I: Adapter and Composite  **Lec:** 8  **Type:** critique  **Id:** c9cdc94f
**A:** Key:
1. False.
2. Composite makes a new kind of node cheap: one new class, no client changes.
3. A new operation is the expensive direction: a new method on the component interface and an implementation in every leaf and composite class.

False. What Composite makes cheap is a new kind of node: one new class, no client changes. A new operation is the expensive direction: a new method on the component interface and an implementation in every leaf and composite class. The deck lists this as the pattern's cost.

### Q: In the reader's terms, what connascence does the client have before and after Composite, and what is the reader's example?
**Topic:** Design patterns I: Adapter and Composite  **Lec:** 8  **Type:** recall  **Id:** 89a8acbe
**A:** Parts:
1. Before: traversal logic duplicated in every role that has reports, a scattered change with connascence of algorithm.
2. After: connascence of type with the component interface.
3. Example: `getBudget()`, where an Employee returns its salary and a Manager returns its salary plus `getBudget()` of each direct report.

Before: traversal logic duplicated in every role that has reports, scattered change with connascence of algorithm. After: connascence of type with the component interface. The example is `getBudget()`: an Employee returns its salary, a Manager returns its salary plus `getBudget()` of each direct report, and the client calls `getBudget()` on employee 1233 (no reports) and 1234 (39 people under them) the same way.

### Q: True or false, and justify: "All adapters in an Adapter design must implement one shared interface."
**Topic:** Design patterns I: Adapter and Composite  **Lec:** 8  **Type:** critique  **Id:** 8a453fdd
**A:** Key:
1. False as a rule, though true in the deck's case.
2. An adapter only has to present the interface its client expects, so one shared interface is not strictly required by the pattern.
3. The deck's `MusicSource` is shared because the report loops over a `MusicSource[]` without knowing which platform each wraps.

False as a rule, true in the deck's case. The reader says both of its adapters implement `FormatAdapter`, but that is not strictly required by the pattern; an adapter only has to present the interface its client expects. The deck's `MusicSource` is shared because the report wants to loop over a `MusicSource[]` without knowing which platform each one wraps.

## Lec 9 — Patterns II: Composite and Decorator (logged 2026-10-08, deck 05b-patterns-ii.pdf + reader Design Patterns; Matt absent, deck only)

### Q: A coffee-cart app has `total()` and `describe()` on `CoffeeCart`, and each loops over the order with a `switch` on the add-on name: `case "whip": cents += 75`, `case "large": cents = Math.round(cents * 1.2)`, and so on, with the same cases again in `describe()`. Oat milk is the next add-on. Give the four-step analysis and name the pattern.
**Topic:** Design patterns II: Decorator  **Lec:** 9  **Type:** apply  **Id:** 0f507628
**A:** Key:
1. Decorator.
2. Change: the menu of add-ons keeps growing, and each one alters a drink's price and name differently.
3. Pain: oat milk touches both switches (scattering), and `CoffeeCart` carries every add-on's pricing and naming on top of tracking the order (tangling).
4. Mechanism: a `Drink` interface with `getDescription()` and `getPriceCents()`; each add-on implements `Drink`, wraps one `Drink` and adjusts its answers.
5. Cost: a class per add-on, a result that depends on which wrapper is outermost, and deep chains slow to read and debug.

Decorator. Change: the menu of add-ons keeps growing, and each one alters a drink's price and its name in a different way. Pain: every switch has a case per add-on, so oat milk touches both methods, which is scattering, and `CoffeeCart` carries every add-on's pricing and naming on top of tracking the order, which is tangling. Mechanism: a `Drink` interface with `getDescription()` and `getPriceCents()`. Each add-on implements `Drink` and wraps one `Drink`, adjusting what the wrapped drink returns. The cart holds only a `Drink[]` and asks the outermost wrapper, which asks inward to the menu drink. Cost: a class for every add-on, a result that depends on which wrapper is outermost, and deep wrapper chains that are slow to read and to debug.

### Q: True or false, and justify: "Decorator and subclassing solve the same problem, and Decorator is just the version with more classes."
**Topic:** Design patterns II: Decorator  **Lec:** 9  **Type:** critique  **Id:** bce770e2
**A:** Key:
1. False as stated: both extend what an object can do, but Decorator is not just the version with more classes.
2. Subclassing is static and per class: features are fixed at construction, and every combination needs its own subclass.
3. Decorator adds responsibilities to individual objects at run time, building combinations by wrapping, one class per feature rather than per combination.

False as stated. Both extend what an object can do, which is why the deck calls Decorator a flexible alternative to subclassing. The error is "just more classes". Subclassing is static and applies to a whole class: an object's features are fixed by its class at construction, and every combination of features needs its own subclass, seven for the reader's three car options. Decorator adds responsibilities to individual objects at run time. Two objects of one class can behave differently, a combination is built by wrapping rather than by a new subclass, and a feature can be added after the object exists. The many small classes are a real cost, but they are one class per feature, not one per combination.

### Q: In `new ObjectInputStream(new GZIPInputStream(new BufferedInputStream(new FileInputStream(f))))`, which object is the base component and which are decorators? True or false, and justify: "Since all three outer objects are input streams, their order does not matter."
**Topic:** Design patterns II: Decorator  **Lec:** 9  **Type:** critique  **Id:** f26972d7
**A:** Parts:
1. `FileInputStream` is the base component; the other three are decorators.
2. The claim is false, because wrapping order changes the result: the object reader must sit outside the decompressor to read decompressed bytes, and buffering raw bytes differs from buffering decompressed ones.

`FileInputStream` is the base component. The other three are decorators: each is an input stream that holds an input stream and changes what reading does. The claim is false. The deck lists "wrapping order changes the result" as a cost of the pattern. The object reader has to sit outside the decompressor so that it reads decompressed bytes, and buffering the raw file bytes is a different stream from buffering decompressed ones. The pattern gives no way to enforce the order, which the reader calls a downside.

### Q: True or false, and justify: "Wrapping one `Latte` in `Whip` changes what every `Latte` does, because a decorator extends the class."
**Topic:** Design patterns II: Decorator  **Lec:** 9  **Type:** critique  **Id:** 0dc0ab14
**A:** Key:
1. False.
2. Decorator adds responsibilities to the object it wraps, not to the class, so only the wrapped latte gains whip and every other latte is untouched.

False. The reader separates object from class: a class is the template, and an object is one instance of it. Decorator adds responsibilities to the object it wraps, not to the class, so the one wrapped latte gains whip and every other latte is untouched. Two lattes can behave differently at run time while their fields, methods and parent types still all come from the class.

### Q: A teammate implements whip as `class Whip extends Latte { getPriceCents() { return super.getPriceCents() + 75; } }`. What is wrong with it as a decorator, and can the cart build a large whipped espresso with it? Justify.
**Topic:** Design patterns II: Decorator  **Lec:** 9  **Type:** critique  **Id:** 83118612
**A:** Key:
1. It is a subclass, not a wrapper: it is a `Drink` but has no wrapped `Drink`, so it is only ever a latte with whip.
2. It cannot wrap an espresso, nothing can sit inside it, and a second whip would need another subclass.
3. No: `new Large(new Whip())` compiles but is a large whipped latte, and a large whipped espresso cannot be built at all.

It is a subclass, not a wrapper. A decorator must be a `Drink`, so it can stand where the cart expects one, and have a `Drink`, the object it wraps. This class has no wrapped object, so it is only ever a latte with whip. It cannot wrap an espresso, nothing can sit inside it, and a second whip would need another subclass. `new Large(new Whip())` still compiles, because a `Whip` is a `Latte` and so a `Drink`, but it is a large whipped latte. A large whipped espresso cannot be built at all: whip exists only as a kind of latte, so the team would need a `WhippedEspresso` class and then a version of every add-on for every drink, which is the reader's seven-subclass explosion. The fix is `class Whip implements Drink` with a `private inner: Drink` constructor parameter and both methods delegating to `inner` before adding their change.

### Q: A `Large` add-on is written as `getPriceCents() { return 500; }` without touching the drink it wraps. Which part of the deck's mechanism does it break and why, and what does `getPriceCents()` return on `new Large(new Whip(new Latte()))`?
**Topic:** Design patterns II: Decorator  **Lec:** 9  **Type:** apply  **Id:** 9c496ad9
**A:** Key:
1. It breaks the oblivious-caller rule or the trigger (either name is acceptable).
2. This `Large` neither asks the wrapped drink nor changes its answer, so the chain stops at it.
3. It returns 500, and the prices of the latte and the whip are lost.

Two parts at once, and either name is acceptable. The oblivious-caller rule says each add-on answers by changing the answer of the drink it wraps, and the trigger has every wrapper ask inward until the menu drink answers. This `Large` neither asks nor changes, so the chain stops at it. The call returns 500 for every large drink whatever is inside, and the prices of the latte and the whip are lost. A decorator may replace or transform the inner answer, but it has to ask for it.

### Q: True or false, and justify: "Decorator improves cohesion only; the client's coupling to the add-ons is as strong after the pattern as before."
**Topic:** Design patterns II: Decorator  **Lec:** 9  **Type:** critique  **Id:** 6fef2ede
**A:** Key:
1. False.
2. Before, the per-add-on switch repeated in every operation is a scattered change with connascence of algorithm.
3. After, the cart depends on one `Drink` interface, connascence of type, so the classes are more loosely coupled.

False. Before the pattern the cart has the per-add-on switch repeated in every operation, which is, by the same analysis the reader gives for Strategy and Composite, a scattered change with connascence of algorithm. After it the cart depends on one `Drink` interface, connascence of type, and the reader says new decorators are added without changing the base classes, so the classes are more loosely coupled. Cohesion improves as well, since base classes keep to their core responsibilities, which the reader calls reduced risk of tangling.

### Q: Which one of these is not a cost that the deck or the reader lists for Decorator? (a) one class per add-on; (b) the wrapping order changes the result; (c) the client has to check each object's concrete type before calling it; (d) `instanceof` behaves differently on wrapped and unwrapped objects. Justify your choice.
**Topic:** Design patterns II: Decorator  **Lec:** 9  **Type:** critique  **Id:** ebcf1827
**A:** Key:
1. (c), the client checking each object's concrete type before calling it.
2. That is the pain the pattern removes, not a cost: the cart holds a `Drink[]` and never learns the concrete type.

(c). That is the pain the pattern removes, not a cost it adds: the cart holds a `Drink[]` and never learns the concrete type. The deck's costs are one class per add-on, order dependence with no way to enforce an order, and long chains that are hard to read and debug. The reader adds three more. Wrappers cannot see each other, so a nonsense double wrap is allowed. The design ends up with many small classes. Object identity breaks, which is the `instanceof` point.

### Q: Name the pattern each fragment belongs to and give the one feature that tells it from the other two: (i) `class Manager implements Employee { reports: Employee[] }`; (ii) `class SpotifySource implements PlaySource { constructor(private client: SpotifyClient) {} }`; (iii) `class Whip implements Drink { constructor(private inner: Drink) {} }`.
**Topic:** Design patterns II: Decorator  **Lec:** 9  **Type:** apply  **Id:** 6c29e8b0
**A:** Parts:
1. (i) Composite: a component that holds many components, a tree, and answers by asking each child.
2. (ii) Adapter: it wraps an object of a different type and gives it the client's interface, changing the interface and keeping the behaviour.
3. (iii) Decorator: it wraps one object of its own interface and changes the answer, keeping the interface and changing the behaviour.

(i) Composite: it is a component that holds many components, a tree, and answers by asking each child. (ii) Adapter: it wraps an object of a different type and gives it the interface the client wants, changing the interface and keeping the behaviour. (iii) Decorator: it wraps one object of its own interface and changes the answer, keeping the interface and changing the behaviour. All three are structural wrappers behind an interface, which is why they get mixed up.

### Q: True or false, and justify: "Two `ExtraShot` wrappers around one latte is a bug that the Decorator pattern should prevent."
**Topic:** Design patterns II: Decorator  **Lec:** 9  **Type:** critique  **Id:** 0236b4eb
**A:** Key:
1. False on both halves.
2. In the coffee cart a double shot is a wanted order, since the same add-on can be applied more than once.
3. The pattern could not prevent it anyway: wrappers cannot interact, so the same decorator can wrap an object twice.

False on both halves. In the coffee cart a double shot is a wanted order, and the deck's scenario says the same add-on can be applied more than once. And the pattern could not prevent it anyway: the reader lists as a downside that wrappers cannot interact, so a base car can be wrapped in `Nav` twice even though that makes no sense. Whether a repeat is a bug is the domain's call, and the pattern offers no hook to enforce it.

### Q: An order starts as `let d: Drink = new Latte()`, the customer sees the price and then asks for whip. Write the one line that adds it, and say what this does that a subclass-per-drink design cannot.
**Topic:** Design patterns II: Decorator  **Lec:** 9  **Type:** apply  **Id:** 93ac0204
**A:** Key:
1. `d = new Whip(d);`.
2. The existing object is wrapped and the result is still a `Drink`, so the cart's reference keeps working.
3. A subclass design fixes features at construction, so adding whip would mean constructing a new `WhippedLatte` and copying the order across.

`d = new Whip(d);`. The existing object is wrapped and the result is still a `Drink`, so the cart's reference keeps working. A subclass design fixes an object's features when it is constructed, because an object's class cannot change after `new`; adding whip would mean constructing a new `WhippedLatte` and copying the order across. The reader's version is `car = new Nav(car)` to turn navigation on later.

### Q: True or false, and justify: "In the canonical Decorator diagram the base decorator extends the concrete component it wraps."
**Topic:** Design patterns II: Decorator  **Lec:** 9  **Type:** critique  **Id:** 120e9d4f
**A:** Key:
1. False.
2. The base decorator implements the component interface and holds a reference typed as that interface: it is a component and has a component.
3. The concrete component is a sibling of the base decorator under the interface, not its parent, so one decorator can wrap any component.

False. In the refactoring.guru diagram the deck uses, the base decorator implements the component interface and holds a reference typed as that interface: it is a component and has a component. Concrete decorators extend the base decorator and change the answer before or after passing the call on. The concrete component is a sibling of the base decorator under the interface, not its parent, which is what lets one decorator wrap any component, another decorator included.

## Lec 10 — Patterns III: State and the Open/Closed Principle (prepared 2026-10-14 from deck 06a-patterns-iii.pdf; Matt takes no notes in this course, deck only; written as true/false with justification or multiple choice, the two exam formats classmates reported)

### Q: A `VendingMachine` class has `insertCoin()`, `pressButton()` and `refund()`, and each starts with `switch (this.mode)` over `"idle"`, `"hasCoin"` and `"dispensing"`, with the same three cases in every method. A `"soldOut"` mode is next. Give the four-step analysis and name the pattern.
**Topic:** Design patterns III: State and the Open/Closed Principle  **Lec:** 10  **Type:** apply  **Id:** 20365f7e
**A:** Key:
1. State.
2. Change: new modes the machine can be in, each with its own rules for every event.
3. Pain: adding `"soldOut"` touches all three methods (scattering), and each method mixes every mode's rules and transitions (tangling).
4. Mechanism: a `MachineState` interface with the three events; the machine delegates to its current state, which calls `machine.setState()` to move on.
5. Cost: one class per mode, transitions spread across the state classes, a new event touches every state class, and `setState()` must be public.

State. Change: new modes the machine can be in, each with its own rules for every event. Pain: every method's switch has a case per mode, so adding `"soldOut"` touches all three methods, which is scattering; and each method mixes every mode's rules and transitions in one body, which is tangling. Mechanism: a `MachineState` interface with `insertCoin()`, `pressButton()` and `refund()`; the machine holds only its current `MachineState` and hands each event to it, so the caller is oblivious; each state handles every event and calls `machine.setState()` to move on, which is the trigger. Cost: one class per mode, transitions spread across the state classes, a new event touches every state class, and `setState()` has to be public.

### Q: True or false, and justify: "In the State pattern the context decides which state comes next, so each state class only has to implement the event methods."
**Topic:** Design patterns III: State and the Open/Closed Principle  **Lec:** 10  **Type:** critique  **Id:** 46634eb8
**A:** Key:
1. False.
2. `Phone` knows only its current `PhoneState`; each state handles every event, decides what comes next and calls `phone.setState()` itself.
3. Moving the decision into the context would put a switch on the state back into `Phone`, the scattering the pattern removes.

False. The deck's oblivious-caller rule says `Phone` knows only its current `PhoneState`, and each state handles every event and decides what comes next. The trigger is that the current state calls `phone.setState()` itself. Moving the decision into the context would put a switch on the state back into `Phone`, which is the scattering the pattern removes, and it is why the deck lists a public `setState()` as a cost rather than a design choice.

### Q: True or false, and justify: "Refactoring the phone to the State pattern makes `Phone` open to any future change."
**Topic:** Design patterns III: State and the Open/Closed Principle  **Lec:** 10  **Type:** critique  **Id:** 35458b4b
**A:** Key:
1. False: no design is open to every change.
2. After State, a new state such as Lockout costs one class and leaves `Phone` untouched.
3. A new button such as Volume means editing `PhoneState` and every state class, so the pattern moves the expensive axis rather than removing it.

False. The deck's axis-of-change slide says no design is open to every change. After State, a new state such as Lockout costs one class and `Phone` is untouched, but a new button such as Volume means editing `PhoneState` and every state class. Before the pattern it was the reverse: a new state meant editing every method, while a new button meant adding two methods to `Phone`. The pattern moves the expensive axis, it does not remove it.

### Q: For which of the four patterns is a new operation on the interface the expensive change and a new implementation the cheap one? (a) Adapter only; (b) Composite and State only; (c) all four; (d) none, because the patterns are open along every axis. Justify your choice.
**Topic:** Design patterns III: State and the Open/Closed Principle  **Lec:** 10  **Type:** recall  **Id:** 9b439897
**A:** Key:
1. (c), all four.
2. Every pattern has a closed axis: open to new implementations, closed to new operations.

(c). The deck's rule is that every pattern has a closed axis: open to new implementations, closed to new operations. Adapter: a new music service is cheap, a new query on `MusicSource` touches every adapter. Composite: a new role is cheap, a new operation such as average salary touches every class. Decorator: a new add-on is cheap, a new property such as calories touches every class. State: a new state is cheap, a new button touches every state class.

### Q: State the Open/Closed Principle in the deck's two halves, and say how the four patterns achieve it.
**Topic:** Design patterns III: State and the Open/Closed Principle  **Lec:** 10  **Type:** recall  **Id:** c9b7f31a
**A:** Parts:
1. Open for extension: new behaviour can be added to a function, class or module.
2. Closed for modification: adding that behaviour does not change code that already works.
3. The patterns achieve it by supplying an abstraction to depend on and extending by writing a new implementation of it: `MusicSource` (Adapter), `Employee` (Composite), `Drink` and `AddOn` (Decorator), `PhoneState` (State).

A unit of code, whether a function, a class or a module, should be open for extension, meaning new behaviour can be added, and closed for modification, meaning adding that behaviour does not change code that already works. The way to get there is to depend on an abstraction and then extend by writing a new implementation of it. The four patterns are four ways of putting that abstraction in place: `MusicSource` for Adapter, `Employee` for Composite, `Drink` and `AddOn` for Decorator, and `PhoneState` for State.

### Q: A teammate's State refactor keeps every transition in `Phone`: `pressPower()` calls `this.state.pressPower()` and then runs `if (this.state instanceof StateOff) this.state = new StateLocked();` and so on for each state. Which part of the mechanism is broken and why, and what happens when a Lockout state is added?
**Topic:** Design patterns III: State and the Open/Closed Principle  **Lec:** 10  **Type:** critique  **Id:** bc9fc575
**A:** Key:
1. The oblivious caller and the trigger are both broken.
2. `Phone` inspects the concrete state after every event with `instanceof` chains, instead of the current state calling `setState()` to move on.
3. Adding Lockout means writing its class and editing every event method in `Phone` to add its transitions.
4. The new-state axis is expensive again, so the refactor pays the pattern's cost without its benefit.

The oblivious caller and the trigger are both broken. `Phone` is supposed to know only its current `PhoneState`, and the current state is supposed to call `setState()` to move on. Here `Phone` inspects the concrete state after every event, so it has the state-by-state knowledge the pattern was meant to remove, written as `instanceof` chains instead of a switch. Adding Lockout means writing its class and then editing every event method in `Phone` to add its transitions, so the new-state axis is expensive again and the refactor bought the cost of the pattern, one class per state and a public `setState()`, without its benefit.

### Q: True or false, and justify: "After the State refactor, the phone no longer holds any state of its own, because the state lives in the state classes."
**Topic:** Design patterns III: State and the Open/Closed Principle  **Lec:** 10  **Type:** critique  **Id:** afc42174
**A:** Key:
1. False.
2. `Phone` still holds one field, its current `PhoneState`, and that field is what changes at run time.
3. What moves into the state classes is the behaviour for each state, not the fact of being in one.

False. `Phone` still holds one field, its current `PhoneState`, and that field is what changes at run time. What moves into the state classes is the behaviour for each state, not the fact of being in one. That is what the intent line means by the object appearing to change its class: callers keep talking to the same `Phone`, and its answers change because the object behind the field has been swapped.

### Q: In the deck's refactoring, which class creates each state object, and why does the phone itself create only one of them?
**Topic:** Design patterns III: State and the Open/Closed Principle  **Lec:** 10  **Type:** recall  **Id:** 7d8be58d
**A:** Parts:
1. `Phone` creates only `StateOff`, the starting state.
2. `StateOff` creates `StateLocked` on power-on.
3. `StateLocked` creates `StateReady` on unlock.
4. `StateLocked` and `StateReady` both create `StateOff` on power-down.
5. Every later transition is a state's own decision, so the state that leaves builds the state that follows.

`Phone` creates `StateOff`, the starting state, and nothing else. `StateOff` creates `StateLocked` when the phone is powered on. `StateLocked` creates `StateReady` when it is unlocked. `StateLocked` and `StateReady` both create `StateOff` when the phone is powered down. The phone creates only the first state because every later transition is a state's own decision, taken inside the state class that handles the event, so the state that leaves is the one that builds the state that follows.

### Q: A small internal tool reads config from exactly one JSON file. A reviewer asks for a `ConfigSource` interface with a `JsonConfigSource` implementation "so it follows OCP". Using the deck's three questions, is the extension point worth its cost?
**Topic:** Design patterns III: State and the Open/Closed Principle  **Lec:** 10  **Type:** apply  **Id:** 0024546f
**A:** Key:
1. Probably not: the extension point is not worth its cost.
2. Every extension point costs indirection (an interface, a dispatch, more classes) and should be spent only where variation will actually arrive.
3. What will vary is a second config format, with no sign of one, and the parsed config object stays stable either way.
4. The variation is not likely for a tool that reads one file, so keep the plain reader and add the abstraction when a second source appears.

Probably not. The deck says every extension point costs indirection, an interface, a dispatch and more classes, and should be spent only where variation will actually arrive. The three questions: what will vary (a second config format, and there is no sign of one), what must stay stable for the code that depends on it (the parsed config object, which is stable either way), and whether the variation is really likely (not for a tool that reads one file). With one implementation the interface is a closed axis nobody needs, so the honest answer is to keep the plain reader and add the abstraction when a second source appears. If the reviewer can name the second source that is coming, the answer flips.

### Q: Which one of these is not a cost the deck lists for the State pattern? (a) one class per state; (b) transitions are spread across the state classes; (c) a new event touches every state class; (d) the context must check the concrete type of its state before each call. Justify your choice.
**Topic:** Design patterns III: State and the Open/Closed Principle  **Lec:** 10  **Type:** recall  **Id:** 6b4e0b55
**A:** Key:
1. (d), the context checking the concrete type of its state before each call.
2. That is the opposite of the pattern: the context is oblivious and calls the interface method on whichever state is there.

(d). The deck's cost line is one class per state, transitions spread across the state classes, a new event touching every state, and a public `setState()`. Checking the concrete type is the opposite of the pattern: the context is oblivious and calls the interface method, and the state object that happens to be there answers.

## Lec 11 — Boundaries: core, edges, ports and adapters (prepared 2026-10-16 from deck 06b-boundaries.pdf, posted after the Oct 15 class; Matt takes no notes in this course, deck only; the instructor's midterm format is true/false, multiple choice, short and long answer over code, so the bank mixes those)

### Q: A `Library` module's `checkout(bookId, memberId)` reads `./loans.json` with `fs.readFileSync`, parses it, applies the rule that a member may hold at most three loans, writes the file back, and returns the string `"Checked out!"` or `"Too many loans"`. A teammate says the design is fine because the rule lives in one function. Using the deck's three costs of mixed responsibilities, say what is wrong.
**Topic:** Boundaries: core, edges, ports and adapters (business logic in the core, which imports nothing and does no I/O · everything else at the edge: I/O, parsing, validation, config, services · a port is an interface the core owns, in its terms · an adapter implements the port with real resources · every dependency points inward · SRP: one reason to change · test at the narrowest level that can see the bug: unit with a double, integration with a temp file, one or two e2e)  **Lec:** 11  **Type:** apply  **Id:** c6f07e8d
**A:** Parts:
1. Every change risks the others: the rule shares one function with file access, parsing and wording, so a `loans.json` field rename edits the rule.
2. The rule cannot be tested alone: a test needs JSON going in and a worded sentence coming out.
3. The rule cannot be reused alone: a web app needs the three-loan rule without the command-line sentence.

The rule is in one function, but so is everything else, and that is the problem. Every change risks the others: renaming a field in `loans.json` is a storage change, yet it edits the loans rule. The rule cannot be tested alone: a test needs JSON going in and a worded sentence coming out. The rule cannot be reused alone: a web app needs the three-loan rule without the command-line sentence.

### Q: A `Library` module's `checkout(bookId, memberId)` reads `./loans.json` with `fs.readFileSync`, parses it, applies the rule that a member may hold at most three loans, writes the file back, and returns the string `"Checked out!"` or `"Too many loans"`. Write the port the core should own, as a TypeScript interface with the two methods the rule needs, and say where the file access and the wording belong.
**Topic:** Boundaries: core, edges, ports and adapters (business logic in the core, which imports nothing and does no I/O · everything else at the edge: I/O, parsing, validation, config, services · a port is an interface the core owns, in its terms · an adapter implements the port with real resources · every dependency points inward · SRP: one reason to change · test at the narrowest level that can see the bug: unit with a double, integration with a temp file, one or two e2e)  **Lec:** 11  **Type:** apply  **Id:** 13dbacd3
**A:** Parts:
1. The port, in the core's terms: `interface LoanStore { loansFor(memberId: string): Loan[]; add(loan: Loan): void; }`.
2. File access goes in an adapter, `JsonLoanStore implements LoanStore`.
3. The wording goes to the edge, `main.ts`, with the core returning a plain value.

The port is written in the core's own terms (loans and members, not files or rows):

```ts
interface LoanStore {
  loansFor(memberId: string): Loan[];
  add(loan: Loan): void;
}
```

The file access goes into an adapter, `JsonLoanStore implements LoanStore`, which is the only class that knows the file's field names. The wording of `"Checked out!"` goes to the edge, `main.ts`; the core returns a plain value such as a refusal reason or `null`.

### Q: True or false, and justify: "A port is an interface defined by the adapter, so that the core has something to call."
**Topic:** Boundaries: core, edges, ports and adapters (business logic in the core, which imports nothing and does no I/O · everything else at the edge: I/O, parsing, validation, config, services · a port is an interface the core owns, in its terms · an adapter implements the port with real resources · every dependency points inward · SRP: one reason to change · test at the narrowest level that can see the bug: unit with a double, integration with a temp file, one or two e2e)  **Lec:** 11  **Type:** critique  **Id:** a103ba3e
**A:** Key:
1. False.
2. A port is owned by the core and written in the core's domain terms; the adapter implements it.
3. An adapter-defined interface would be shaped like the dependency, so a storage change such as a field rename would leak into the core and its tests.

False. A port is owned by the core and written in the core's domain terms; the adapter implements it. If the adapter defined the interface, it would be shaped like the dependency (the file's fields, the database's rows), and a storage change such as a field rename would leak through the interface into the core and its tests, which is exactly what the split is meant to stop.

### Q: True or false, and justify: "In the deck's 02-booking design, a tool renaming a field in `booking.json` changes `book()` and its tests."
**Topic:** Boundaries: core, edges, ports and adapters (business logic in the core, which imports nothing and does no I/O · everything else at the edge: I/O, parsing, validation, config, services · a port is an interface the core owns, in its terms · an adapter implements the port with real resources · every dependency points inward · SRP: one reason to change · test at the narrowest level that can see the bug: unit with a double, integration with a temp file, one or two e2e)  **Lec:** 11  **Type:** critique  **Id:** e34651f6
**A:** Key:
1. False.
2. Only `JsonBookingStore`, the adapter, knows the file's field names, so the rename lands there, while `book()` and its tests work with plain objects.

False. After the split only `JsonBookingStore`, the adapter, knows the file's field names, so the rename lands there and nowhere else. `book()` and its tests work with plain objects. In 01-booking the claim was true, because `book()` read the file itself and its tests were full of JSON.

### Q: Which one of these belongs in the core of the deck's booking tool? (a) Parsing argv. (b) `refusalFor(booking)`, which returns why a booking is refused. (c) The path to `booking.json`. (d) The sentence "Sorry, that room is taken." Justify your choice.
**Topic:** Boundaries: core, edges, ports and adapters (business logic in the core, which imports nothing and does no I/O · everything else at the edge: I/O, parsing, validation, config, services · a port is an interface the core owns, in its terms · an adapter implements the port with real resources · every dependency points inward · SRP: one reason to change · test at the narrowest level that can see the bug: unit with a double, integration with a temp file, one or two e2e)  **Lec:** 11  **Type:** recall  **Id:** cc727862
**A:** Key:
1. (b), `refusalFor(booking)`.
2. The refusal rules are business logic, which lives in the core.

(b). The refusal rules are business logic, so they live in the core. Parsing argv and wording the answer are edge work in `main.ts`, and the file path is configuration, which the edge picks and hands to the adapter. The core imports nothing from outside and does no I/O.

### Q: Three bugs turn up in the booking tool. (i) The overlap rule lets two bookings at the same time through. (ii) `JsonBookingStore` writes `start` as a Date but reads it back as a string. (iii) `main.ts` passes the argv values to `book()` in the wrong order. For each, name the test level that should catch it and say why that level and not a wider one.
**Topic:** Boundaries: core, edges, ports and adapters (business logic in the core, which imports nothing and does no I/O · everything else at the edge: I/O, parsing, validation, config, services · a port is an interface the core owns, in its terms · an adapter implements the port with real resources · every dependency points inward · SRP: one reason to change · test at the narrowest level that can see the bug: unit with a double, integration with a temp file, one or two e2e)  **Lec:** 11  **Type:** apply  **Id:** a3f3da7a
**A:** Parts:
1. (i) A unit test on the core with a test double for the store: the rule is plain logic, seen directly by fast tests with plain values.
2. (ii) An integration test on the adapter with a temp file: only a real file shows the round trip.
3. (iii) An end-to-end test through `main.ts`: the bug is in the wiring, which only the whole program exercises.

(i) A unit test on the core with a test double for the store: the rule is plain logic, so many fast tests with plain values see it directly. (ii) An integration test on the adapter with a temp file: only a real file shows the round trip, and the core never sees the file. (iii) An end-to-end test through `main.ts`: the bug is in the wiring, which only the whole program exercises; one or two of these are enough.

The deck's rule is to test each thing at the narrowest level that can see it, so a test fails for the reason it was written and not for an unrelated one. Catching the overlap bug only in an e2e test would make a rule failure look like a wiring or file failure.

### Q: True or false, and justify: "The deck's unit tests of the core need a temporary JSON file, because `book()` has to store the booking somewhere."
**Topic:** Boundaries: core, edges, ports and adapters (business logic in the core, which imports nothing and does no I/O · everything else at the edge: I/O, parsing, validation, config, services · a port is an interface the core owns, in its terms · an adapter implements the port with real resources · every dependency points inward · SRP: one reason to change · test at the narrowest level that can see the bug: unit with a double, integration with a temp file, one or two e2e)  **Lec:** 11  **Type:** critique  **Id:** 98e5678d
**A:** Key:
1. False.
2. The core depends on the `BookingStore` port, so a unit test hands `book()` a test double, an in-memory store, and checks plain values.
3. Temp files belong to the adapter's integration tests, which check that `JsonBookingStore` translates to and from the file correctly.

False. The core depends on the `BookingStore` port, not on a file, so a unit test hands `book()` a test double, an in-memory store, and checks the result with plain values. Temp files belong to the adapter's integration tests, which are the few tests that check `JsonBookingStore` translates to and from the file correctly.

### Q: In the 02-booking design, say which of `main.ts`, `rooms.ts` (the core), `BookingStore` and `JsonBookingStore` depends on which, as a list of arrows, and state the rule the arrows obey in one sentence.
**Topic:** Boundaries: core, edges, ports and adapters (business logic in the core, which imports nothing and does no I/O · everything else at the edge: I/O, parsing, validation, config, services · a port is an interface the core owns, in its terms · an adapter implements the port with real resources · every dependency points inward · SRP: one reason to change · test at the narrowest level that can see the bug: unit with a double, integration with a temp file, one or two e2e)  **Lec:** 11  **Type:** recall  **Id:** e094689a
**A:** Parts:
1. `main.ts` depends on `rooms.ts` (it calls `book()`) and on `JsonBookingStore` (it picks the store).
2. `JsonBookingStore` depends on `BookingStore`, which it implements.
3. `rooms.ts` depends on `BookingStore`, which it also owns.
4. Every dependency points inward.

`main.ts` depends on `rooms.ts` (it calls `book()`) and on `JsonBookingStore` (it picks the store). `JsonBookingStore` depends on `BookingStore` (it implements the port). `rooms.ts` depends on `BookingStore`, which it also owns. Nothing depends on `main.ts`, and only the adapter touches `fs`. The rule: every dependency points inward, because the core calls the edge only through interfaces it owns.

### Q: A web page is to book rooms as well as the command line. Say what a developer had to do in 01-booking and what they do in 02-booking, name the principle the 02-booking design satisfies, and give its one-line definition.
**Topic:** Boundaries: core, edges, ports and adapters (business logic in the core, which imports nothing and does no I/O · everything else at the edge: I/O, parsing, validation, config, services · a port is an interface the core owns, in its terms · an adapter implements the port with real resources · every dependency points inward · SRP: one reason to change · test at the narrowest level that can see the bug: unit with a double, integration with a temp file, one or two e2e)  **Lec:** 11  **Type:** apply  **Id:** dba34c5c
**A:** Parts:
1. In 01-booking the developer had to copy the rules out of `book()`, where they were tangled with file access and wording, and the copies drift.
2. In 02-booking the developer writes a new edge, the web handler, that calls the existing `book()`, and the core does not change.
3. The principle is the single responsibility principle.
4. Definition: each part of the system has one reason to change.

In 01-booking the rules were tangled with file access and command-line wording inside `book()`, so the developer had to copy the rules out of it, and the two copies then drift. In 02-booking the developer writes a new edge, the web handler, that calls the existing `book()`; the core does not change. This is the single responsibility principle: each part of the system has one reason to change.

### Q: Which one of these changes should edit `rooms.ts`, the core, in the 02-booking design? (a) A tool renames a field in `booking.json`. (b) A new rule limits each person to two bookings per day. (c) A web frontend is added. (d) Storage moves from a JSON file to SQLite. Justify your choice.
**Topic:** Boundaries: core, edges, ports and adapters (business logic in the core, which imports nothing and does no I/O · everything else at the edge: I/O, parsing, validation, config, services · a port is an interface the core owns, in its terms · an adapter implements the port with real resources · every dependency points inward · SRP: one reason to change · test at the narrowest level that can see the bug: unit with a double, integration with a temp file, one or two e2e)  **Lec:** 11  **Type:** recall  **Id:** 33d8eabf
**A:** Key:
1. (b), the new rule limiting each person to two bookings per day.
2. A new rule is business logic, so it changes the core and its plain-object unit tests.

(b). A new rule is business logic, so it changes the core and its plain-object unit tests. (a) changes the adapter only. (c) adds a new edge that calls `book()`. (d) is a new adapter, `SqliteBookingStore implements BookingStore`, and the edge picks it; the core still sees only the port.


## Lec 12 — API Design & Evolution (logged 2026-10-20, deck 07a-api-design-evolution.pdf + reader APIs and Safe Versioning; Matt takes no notes in this course, deck and reader only; written in the instructor's midterm formats: true/false with justification, multiple choice, short answer with handwritten TypeScript)

### Q: A `UserStore` exposes `public users: Map<string, User>`, `public dirty: boolean`, `load(): void`, `save(): void` and `find(id: string): User | undefined`. To rename a user a client writes `store.load(); const u = store.users.get(id)!; u.name = "Ann"; store.dirty = true; store.save();`. Name each of the deck's four API design principles that this API breaks, with the line of client code that shows it, then write a replacement API of one or two methods, as TypeScript signatures with a one-line JSDoc each, that passes all four.
**Topic:** API design and change severity (information hiding · obliviousness · easy to use, hard to misuse · contract completeness · start with the task · APIs are forever · MAJOR, MINOR, PATCH, NONE by what the client must do · semver and REST versioning from the reader)  **Lec:** 12  **Type:** apply  **Id:** 715fe6cc
**A:** Parts:
1. Information hiding: `store.users.get(id)` and `store.dirty = true` touch internal state and structure the caller should not see.
2. Obliviousness: the caller must know that `load()` runs first and that `save()` writes only when `dirty` is set.
3. Easy to use, hard to misuse: the types allow `save()` before `load()` or forgetting `dirty`, so the change is silently lost.
4. Contract completeness: `find` returns `undefined` with no JSDoc saying when, and nothing says what `save()` does when the file is missing.
5. Replacement: `rename(id: string, name: string): void` (throws `UserNotFound` if none) and `find(id: string): User | undefined`, each with a one-line JSDoc.

All four. Information hiding: `store.users.get(id)` and `store.dirty = true` touch internal state and structure the caller should not see. Obliviousness: the caller must know that `load()` has to run first and that `save()` only writes when `dirty` is set, both implementation facts. Easy to use, hard to misuse: the type system allows the wrong call order (`save()` before `load()`) and allows forgetting `dirty`, so a correct-looking program silently loses the change. Contract completeness: `find` returns `undefined` with no JSDoc saying when, and nothing says what `save()` does when the file is missing. The task is "rename a user", so the API should present that:

```ts
/** Renames the user with this id. Throws UserNotFound if there is none. */
rename(id: string, name: string): void;
/** The user with this id, or undefined when there is none. */
find(id: string): User | undefined;
```

Loading, saving and the dirty flag disappear inside the store, so the caller can no longer call things in the wrong order or forget a step.

### Q: True or false, and justify: "Adding an optional `durationType: string = "days"` parameter to `Library.checkout(book, duration)` is a PATCH change, because no existing client has to change its code."
**Topic:** API design and change severity (information hiding · obliviousness · easy to use, hard to misuse · contract completeness · start with the task · APIs are forever · MAJOR, MINOR, PATCH, NONE by what the client must do · semver and REST versioning from the reader)  **Lec:** 12  **Type:** critique  **Id:** 7d24d620
**A:** Key:
1. False: it is MINOR.
2. A new optional parameter is a structural change that adds backwards-compatible functionality, which is MINOR.
3. PATCH is a behavioural improvement clients need not adopt, such as a bug fix, so "no client has to change" rules out only MAJOR.

False. It is MINOR. Both minor and patch need no client code change; what separates them is the kind of change. A new optional parameter is a structural change that adds backwards-compatible functionality, which is the deck's definition of MINOR. PATCH is a behavioural improvement that clients need not adopt, such as a bug fix or a performance improvement. "No client has to change" rules out MAJOR, not PATCH.

### Q: A published function `parseDate(s: string): Date` has an off-by-one that returns the day before the one written. The maintainers fix it so it returns the right day. Which severity is this, and when could the same fix be MAJOR? Give the reader's reasoning.
**Topic:** API design and change severity (information hiding · obliviousness · easy to use, hard to misuse · contract completeness · start with the task · APIs are forever · MAJOR, MINOR, PATCH, NONE by what the client must do · semver and REST versioning from the reader)  **Lec:** 12  **Type:** apply  **Id:** 6df2280b
**A:** Key:
1. PATCH: a backwards-compatible defect fix that needs no client code change.
2. It becomes MAJOR when clients rely on the defect, for example by adding a day themselves, so after the fix their dates are a day late.
3. Severity is judged by what happens to clients, not by how small the diff is.

By the definitions it is a PATCH: a backwards-compatible defect fix that needs no client code change. It becomes MAJOR when clients have come to rely on the defect, for example by adding a day themselves to correct it; after the fix their dates are a day late, so their code must change. The reader's rule is that severity is judged by what happens to clients, not by how small the diff is, and a behavioural fix clients depend on breaks them just as a signature change would.

### Q: Which one of these changes to a published `BookingStore` interface is MAJOR? (a) A new method `countFor(room: string): number` is added. (b) `save(b: Booking): void` now also validates the booking and throws `InvalidBooking` for an empty room name, which used to be stored silently. (c) The private file-name constant inside `JsonBookingStore` is renamed. (d) `save` is rewritten to buffer writes, so it runs faster with the same results. Justify your choice.
**Topic:** API design and change severity (information hiding · obliviousness · easy to use, hard to misuse · contract completeness · start with the task · APIs are forever · MAJOR, MINOR, PATCH, NONE by what the client must do · semver and REST versioning from the reader)  **Lec:** 12  **Type:** recall  **Id:** 863aeba0
**A:** Key:
1. (b), `save` now validating and throwing `InvalidBooking` for an empty room name.
2. A call that used to succeed now throws, so clients that stored empty room names must change their code.

(b). A call that used to succeed now throws, so clients that stored empty room names must change their code to handle or avoid it: an incompatible change. (a) is MINOR, a backwards-compatible addition. (c) is NONE, a refactoring clients cannot observe. (d) is PATCH, a behavioural improvement with nothing for clients to adopt.

### Q: Write, as TypeScript, two ways to let `Library.checkout(book: Book, duration: number)` accept a `Duration` object as well as a number of days without a MAJOR change, and name the third way the reader gives. Then say why "keep the signature and treat the number as weeks" is the worst option even though nothing stops compiling.
**Topic:** API design and change severity (information hiding · obliviousness · easy to use, hard to misuse · contract completeness · start with the task · APIs are forever · MAJOR, MINOR, PATCH, NONE by what the client must do · semver and REST versioning from the reader)  **Lec:** 12  **Type:** apply  **Id:** 34537f94
**A:** Parts:
1. A union type: `checkout(book: Book, duration: number | Duration): void`.
2. A new method, `checkoutSpecific(book: Book, duration: Duration): void`, leaving `checkout` untouched.
3. The third way is a new parameter with a default, `checkout(book, duration, durationType = "days")`.
4. Treating the number as weeks keeps the signature but breaks every caller at run time, with loans seven times too long, and a silent behavioural break is more severe than a compile-time break because clients find out later and unpredictably.


```ts
checkout(book: Book, duration: number | Duration): void;          // union type
checkoutSpecific(book: Book, duration: Duration): void;           // new method, checkout untouched
```

The third way is a new parameter with a default, `checkout(book, duration, durationType = "days")`. All three are MINOR: old calls keep working and clients opt in. Reinterpreting the number as weeks keeps the signature but breaks every caller at run time, and clients only find out when loans come back seven times too long. A compile-time break at least tells them at once; a silent behavioural break is the more severe change precisely because the "when" is later and unpredictable.

### Q: The deck says "internals should change freely; the API surface should change rarely." Explain, using information hiding, why the first half is only true when the second half holds, and give one concrete thing a `JsonBookingStore` can change freely and one it cannot, saying why for each.
**Topic:** API design and change severity (information hiding · obliviousness · easy to use, hard to misuse · contract completeness · start with the task · APIs are forever · MAJOR, MINOR, PATCH, NONE by what the client must do · semver and REST versioning from the reader)  **Lec:** 12  **Type:** apply  **Id:** c2a31b72
**A:** Key:
1. Internals can change freely only if no client can see them, and the API surface is exactly what clients can see.
2. Information hiding keeps the surface small and oblivious to the implementation, so the effects of an internal change stay local.
3. If the surface leaks internals, every internal change is also a surface change and risks clients.
4. `JsonBookingStore` can freely change the file's field names, its caching or its path handling, because only the adapter knows them.
5. It cannot change the `BookingStore` port's method signatures or what `save` promises, because the core and its callers depend on them.

Internals can change freely only if no client can see them, and the API surface is exactly what clients can see. Information hiding keeps the surface small and oblivious to the implementation, so the effects of an internal change stay local to the component. If the surface leaks internals, every internal change is also a surface change and risks clients. `JsonBookingStore` can freely change the file's field names, its caching or its path handling, because only the adapter knows them. It cannot change the `BookingStore` port's method signatures or what `save` promises, because the core and its callers depend on that agreement.

### Q: True or false, and justify: "The deck's integration tests replace the real adapter with a test double so that the core can be checked without touching the file system."
**Topic:** Test levels and the testing pyramid (across, within and between boundaries · e2e: poor fault localization, many reasons to fail, cumbersome, expensive · unit: fast, isolated, doubles, breakpoints, checks behaviour in isolation · integration: core with the real adapter on a real resource · most unit, several integration per boundary, a few e2e)  **Lec:** 12  **Type:** critique  **Id:** c3d12e67
**A:** Key:
1. False: that describes a unit test.
2. An integration test runs the core with the real adapter against an actual resource, such as a file, to check the adapter translates correctly.
3. Doubles belong to unit tests, which test within a boundary and check behaviour in isolation.

False, that describes a unit test. An integration test tests between boundaries: it runs the core with the real adapter, and the adapter uses an actual resource such as a file on disk, because the point is to check that the adapter translates correctly between the domain and the system. Doubles belong to unit tests, which test within a boundary and check behaviour in isolation.

### Q: A teammate proposes a suite for the booking tool made entirely of end-to-end tests through `main.ts`, arguing that they test what users actually do. Give the deck's four costs of E2E tests.
**Topic:** Test levels and the testing pyramid (across, within and between boundaries · e2e: poor fault localization, many reasons to fail, cumbersome, expensive · unit: fast, isolated, doubles, breakpoints, checks behaviour in isolation · integration: core with the real adapter on a real resource · most unit, several integration per boundary, a few e2e)  **Lec:** 12  **Type:** recall  **Id:** a752520c
**A:** Parts:
1. Poor fault localization: a failure does not say where the bug is.
2. Multiple reasons for one failure: the rule, the adapter or the wiring.
3. They are cumbersome to write.
4. They are expensive to run.

The four costs: poor fault localization (a failure does not say where the bug is), multiple reasons for one failure (rule, adapter or wiring), they are cumbersome to write, and they are expensive to run. The E2E-only suite would catch the bugs but at the slowest, least localized level every time.

### Q: A teammate proposes a suite for the booking tool made entirely of end-to-end tests through `main.ts`, arguing that they test what users actually do. Say what the suite should look like instead and why each level earns its place.
**Topic:** Test levels and the testing pyramid (across, within and between boundaries · e2e: poor fault localization, many reasons to fail, cumbersome, expensive · unit: fast, isolated, doubles, breakpoints, checks behaviour in isolation · integration: core with the real adapter on a real resource · most unit, several integration per boundary, a few e2e)  **Lec:** 12  **Type:** critique  **Id:** 041ef46d
**A:** Parts:
1. Mostly unit tests of the core with doubles, because they are fast, isolate one behaviour and put the failure next to the bug.
2. Several integration tests at each boundary, because only a real file shows whether `JsonBookingStore` round-trips correctly.
3. A few end-to-end tests, because something must show the whole application works and only they exercise the wiring in `main.ts`.

The suite should be mostly unit tests of the core with doubles, because they are fast, isolate one behaviour and put the failure next to the bug; several integration tests at each boundary, because only a real file shows whether `JsonBookingStore` round-trips correctly; and a few end-to-end tests, because something has to show the whole application works and the wiring in `main.ts` is only exercised there. The E2E-only suite would catch the bugs but at the slowest, least localized level every time.

### Q: Which one of these statements about unit tests matches the deck? (a) They are the slowest tests, so there should be few of them. (b) They check behaviour in isolation, which is both their strength and their limit. (c) They exercise the real adapter against a real resource. (d) They are written from the user's point of view. Justify your choice.
**Topic:** Test levels and the testing pyramid (across, within and between boundaries · e2e: poor fault localization, many reasons to fail, cumbersome, expensive · unit: fast, isolated, doubles, breakpoints, checks behaviour in isolation · integration: core with the real adapter on a real resource · most unit, several integration per boundary, a few e2e)  **Lec:** 12  **Type:** recall  **Id:** 0bd2919a
**A:** Key:
1. (b): unit tests check behaviour in isolation, which is both their strength and their limit.
2. Isolation makes them fast and direct at localizing a fault, but they cannot show that the pieces work together.

(b). Unit tests are very fast, easy to write, the most direct way to localize a fault, and they check one unit in isolation, which is why they cannot show that the pieces work together. (a) is backwards: they are the fastest and the majority. (c) describes integration tests. (d) describes end-to-end tests.

### Q: A library ships at 2.4.3. The next release renames a public method, adds one new optional parameter elsewhere, and fixes two bugs. What is the new version number under semantic versioning, and what would it be if the rename were dropped from the release? Explain the rule in one sentence.
**Topic:** API design and change severity (information hiding · obliviousness · easy to use, hard to misuse · contract completeness · start with the task · APIs are forever · MAJOR, MINOR, PATCH, NONE by what the client must do · semver and REST versioning from the reader)  **Lec:** 12  **Type:** apply  **Id:** 30fd9555
**A:** Parts:
1. 3.0.0 with the rename.
2. 2.5.0 without the rename.
3. A release bumps the number for its most severe change and resets every number below it to zero.

3.0.0, and 2.5.0 without the rename. A release bumps the number for its most severe change and resets every number below it to zero: the rename is MAJOR, so 2.4.3 becomes 3.0.0; without it the optional parameter is the most severe change, MINOR, so 2.4.3 becomes 2.5.0. Bug fixes alone would have given 2.4.4.

### Q: A REST API has one route, `POST /checkout`, and needs a breaking change to its request body. Give the reader's four-step sequence for shipping it without breaking clients, and say what the team should have done at the start to make step two cleaner.
**Topic:** API design and change severity (information hiding · obliviousness · easy to use, hard to misuse · contract completeness · start with the task · APIs are forever · MAJOR, MINOR, PATCH, NONE by what the client must do · semver and REST versioning from the reader)  **Lec:** 12  **Type:** recall  **Id:** e59e4491
**A:** Parts:
1. Run `/checkout` alone.
2. Add `/v2/checkout` beside it so both run.
3. Mark `/checkout` deprecated and ask clients to move.
4. Remove `/checkout` once every client has moved.
5. At the start, a `/v1` prefix would have given the breaking version an obvious place to go.

Run `/checkout` alone; add `/v2/checkout` beside it so both run; mark `/checkout` deprecated and ask clients to move; remove `/checkout` once every client has moved. Starting with a `/v1` prefix would have given the breaking version an obvious place to go from the first day. Breaking changes in REST are shipped side by side like this because running several live versions is costly, so the usual rule is to change REST APIs only in backwards-compatible ways, such as an opt-in `/checkoutSpecific` route or optional parameters.

## Lec 13 — REST API Design (logged 2026-10-25 from the deck and the reader)

### Q: A rider's app sends the request below and gets the response below. Name each part of the request (method, path, query, headers, body) and each part of the response (status, headers, body), say which status class the response is in and what that class means, then name the one thing in the request the reader says a request of this method should not carry.

```
GET /bikes?station=s2&limit=20
Accept: application/json

{"rider": "alex"}
```

```
200 OK
Content-Type: application/json

{"bikes": [{"id": "b1", "href": "/bikes/b1"}]}
```
**Topic:** REST API design (request: method, path, query, headers, body · response: status, headers, body · 2XX worked, 4XX client problem, 5XX server failed · model things, not actions: URIs as resources, methods as verbs, a trip becomes a resource · Uniform Interface, Idempotency, Statelessness, Connectedness and the check question for each · PUT for anything a client may resend · poor fit: live updates, hardware commands, quotes, steps that must succeed together · reader: URI vs URL, headers carry metadata, codes per verb, client-tracked pagination)  **Lec:** 13  **Type:** apply  **Id:** 3a472c59
**A:** Parts:
1. Request: method `GET`, path `/bikes`, query `station=s2&limit=20`, header `Accept: application/json`, body `{"rider": "alex"}`.
2. Response: status `200 OK`, header `Content-Type: application/json`, and the JSON list of bikes as the body.
3. 200 is in the 2XX class, which means the request worked.
4. The body should not be there: a GET has no body.

Request: the method is `GET`; the path is `/bikes`; the query is `station=s2&limit=20`; the one header is `Accept: application/json`, which asks for JSON back; the body is `{"rider": "alex"}`. Response: the status is `200 OK`; the one header is `Content-Type: application/json`, which says what the body is; the body is the JSON list of bikes. 200 is in the 2XX class, which means the request worked (4XX would mean the client's request was the problem, 5XX that the server failed). The body is the thing that should not be there: a GET has no body, because the URI alone names what is wanted, and the deck's table marks GET and DELETE as body-less. Anything the client wants to say goes in the query.

### Q: True or false, and justify: "To start a trip the app should send `POST /bikes/b1/trips` with the rider in the body, because POST is the method that creates a resource."
**Topic:** REST API design (request: method, path, query, headers, body · response: status, headers, body · 2XX worked, 4XX client problem, 5XX server failed · model things, not actions: URIs as resources, methods as verbs, a trip becomes a resource · Uniform Interface, Idempotency, Statelessness, Connectedness and the check question for each · PUT for anything a client may resend · poor fit: live updates, hardware commands, quotes, steps that must succeed together · reader: URI vs URL, headers carry metadata, codes per verb, client-tracked pagination)  **Lec:** 13  **Type:** critique  **Id:** b7d8ff22
**A:** Key:
1. False.
2. POST is not idempotent: if the connection drops after the trip started but before the app saw the 201, the retry starts a second trip.
3. Use `PUT /bikes/b1/trips/t-4f2a {"rider": "alex"}`: the client chooses the trip id, so a resend answers 200 and changes nothing.

False as a design choice, even though POST does create. POST is the one method that is not idempotent: if the dock's connection drops after the server started the trip but before the app saw the 201, the app retries and a second trip starts for the same bike. The deck's check is "what happens if the client retries?", and the retry at the dock is exactly the problem Idempotency solved. The deck's design is `PUT /bikes/b1/trips/t-4f2a {"rider": "alex"}`: the client chooses the trip id, the first call answers 201 with the new trip, and a resend answers 200 and changes nothing. PUT creates when the client picks the URI, so "use PUT for anything a client may resend" wins over "POST creates".

### Q: New requirement for the bike share: a rider can report a bike as damaged with a note, staff can see every open report for a bike, and staff can clear one report. Model it as resources. Write the URIs and, for each, what GET, PUT, POST and DELETE do or why they are refused, with the status code each success returns.
**Topic:** REST API design (request: method, path, query, headers, body · response: status, headers, body · 2XX worked, 4XX client problem, 5XX server failed · model things, not actions: URIs as resources, methods as verbs, a trip becomes a resource · Uniform Interface, Idempotency, Statelessness, Connectedness and the check question for each · PUT for anything a client may resend · poor fit: live updates, hardware commands, quotes, steps that must succeed together · reader: URI vs URL, headers carry metadata, codes per verb, client-tracked pagination)  **Lec:** 13  **Type:** apply  **Id:** d3226f56
**A:** Key:
1. The report becomes a resource under its bike: `/bikes/{id}/reports` (collection) and `/bikes/{id}/reports/{rid}` (one report).
2. Collection: GET returns 200 with the bike's reports as links, and POST returns 201, creating a report from the note and returning its URI.
3. Collection: PUT and DELETE are refused, since they would replace the whole list or wipe every report.
4. One report: GET returns 200, PUT returns 200 replacing it (how staff clear it), DELETE returns 200 removing it, and POST is refused.

The action "report damage" becomes a thing, a report, under the bike it belongs to.

| Resource | GET | PUT | POST | DELETE |
|---|---|---|---|---|
| `/bikes/{id}/reports` (collection) | 200, the bike's reports, each as a link | refused: would replace the whole list | 201, creates a report from the body (note) and returns its URI | refused: would wipe every report |
| `/bikes/{id}/reports/{rid}` (one report) | 200, the report | 200, replaces the report, which is how staff clear it (`"cleared": true`) | refused, nothing to do | 200, removes the report |

Two acceptable variations: a client-chosen report id with `PUT /bikes/{id}/reports/{rid}` creating it (201 first time, 200 on a resend), which makes a flaky-connection retry safe; and `GET /bikes/{id}/reports?open=true` for the open ones. What is not acceptable is a verb in the URL such as `POST /bikes/b1/reportDamage` or `/clearReport`, because that models the action instead of the thing and a generic HTTP tool cannot tell what it does.

### Q: Which one of these requests breaks the deck's Statelessness constraint? (a) `GET /stations?hasBikes=true&page=3&size=20` (b) `GET /stations/more` (c) `GET /stations?hasBikes=true`, answered with a page of stations plus a `next` link (d) `PUT /bikes/b1/trips/t-4f2a {"rider": "alex"}`. Name the check the deck gives for the constraint and apply it to your choice.
**Topic:** REST API design (request: method, path, query, headers, body · response: status, headers, body · 2XX worked, 4XX client problem, 5XX server failed · model things, not actions: URIs as resources, methods as verbs, a trip becomes a resource · Uniform Interface, Idempotency, Statelessness, Connectedness and the check question for each · PUT for anything a client may resend · poor fit: live updates, hardware commands, quotes, steps that must succeed together · reader: URI vs URL, headers carry metadata, codes per verb, client-tracked pagination)  **Lec:** 13  **Type:** apply  **Id:** f31baa9c
**A:** Key:
1. (b) `GET /stations/more`.
2. The check is whether a different server could answer this request.
3. `/stations/more` only means something to the server that remembers which page this client saw last, so another server cannot answer it.

(b). The check is "could a different server answer this request?" `/stations/more` only means something to the server that remembers which page this client saw last, so a second server, or the same one after a restart, cannot answer it. The request has to carry the client's position itself, as (a) does with `page=3&size=20` and as (c) does by handing the client a `next` link that already contains it. (d) carries the whole trip in the request, so any server can store it. The reader makes the same point with `GET /:query/:rowNum` instead of `GET /:query/next`.

### Q: A bike share API has one endpoint, `POST /api` with a body like `{"action": "deleteBike", "id": "b3"}`. When the bike does not exist it answers `200 OK` with `{"ok": false, "error": "no such bike"}`. Name the two ways this breaks Uniform Interface, give the deck's check for that constraint, and rewrite the exchange as a RESTful request and the response for the missing bike.
**Topic:** REST API design (request: method, path, query, headers, body · response: status, headers, body · 2XX worked, 4XX client problem, 5XX server failed · model things, not actions: URIs as resources, methods as verbs, a trip becomes a resource · Uniform Interface, Idempotency, Statelessness, Connectedness and the check question for each · PUT for anything a client may resend · poor fit: live updates, hardware commands, quotes, steps that must succeed together · reader: URI vs URL, headers carry metadata, codes per verb, client-tracked pagination)  **Lec:** 13  **Type:** critique  **Id:** b1de2093
**A:** Parts:
1. The method does not mean what it means everywhere else: the real verb, delete, is hidden in a POST body.
2. The status code does not report the outcome: a failure travels as 200 with an error inside the body.
3. The check is whether a generic tool could handle this request correctly without knowing your API.
4. Rewrite: `DELETE /bikes/b3`, answered with `404 Not Found`.

First, the method does not mean what it means everywhere else: a POST is "here is data, do something with it", and the real verb, delete, is hidden in the body where only this API's clients know to look. Second, the status code does not report the outcome: a failure travels as 200 with an error inside the body, so a standard HTTP library sees success. The check is "could a generic tool handle this request correctly without knowing your API?", and here it could not. Rewritten:

```
DELETE /bikes/b3
```

```
404 Not Found
```

Now the method says what happens, the URI says to what, and a 4XX tells any client, library or proxy that the request named something that is not there, with no API-specific parsing.

### Q: The stations endpoint answers `GET /stations/s2` with `{"id": "s2", "bikeIds": ["b1", "b4"]}`, and the app fetches each bike with `fetch("/bikes/" + id + "?fields=basic&limit=20")`. The server team then moves bikes to `/v2/bikes/{id}` and changes the page size. Which of the deck's constraints does the design break, what is its check, what breaks on the day of the change, and how should the response look instead? Write the JSON.
**Topic:** REST API design (request: method, path, query, headers, body · response: status, headers, body · 2XX worked, 4XX client problem, 5XX server failed · model things, not actions: URIs as resources, methods as verbs, a trip becomes a resource · Uniform Interface, Idempotency, Statelessness, Connectedness and the check question for each · PUT for anything a client may resend · poor fit: live updates, hardware commands, quotes, steps that must succeed together · reader: URI vs URL, headers carry metadata, codes per verb, client-tracked pagination)  **Lec:** 13  **Type:** critique  **Id:** 1e4917b4
**A:** Key:
1. Connectedness: responses should link to related resources so clients follow links instead of building URLs.
2. The check is "does the client ever build a URL itself?", and the app's `"/bikes/" + id` concatenation does.
3. On the day of the change every app still asks `/bikes/b1`, gets 404, and uses a page size that is now wrong.
4. The response carries links: each bike as `{"id": "b1", "href": "/v2/bikes/b1"}`, plus `self` and a `next` link.

Connectedness: responses should link to related resources so that clients follow links instead of building URLs. The check is "does the client ever build a URL itself?", and `"/bikes/" + id + "?fields=basic&limit=20"` is the client building one. On the day of the change every app still asks `/bikes/b1`, gets 404, and the page size it hard-coded is wrong; the server cannot move or re-page anything without breaking clients. The response should carry the links:

```json
{"id": "s2",
 "self": "/stations/s2",
 "bikes": [{"id": "b1", "href": "/v2/bikes/b1"},
           {"id": "b4", "href": "/v2/bikes/b4"}],
 "next": "/stations/s2/bikes?page=2"}
```

The client follows `href` and `next`; the server owns every URL and can change paths, versions or page size without touching the app. This is the problem Connectedness solved in the deck's table, changing the page size.

### Q: Give the status code the bike share should return for each exchange, with one reason each: (1) `GET /bikes/b99` and there is no bike b99. (2) `POST /bikes` with a body that has no id field. (3) The database behind `GET /stations` is down. (4) `POST /bikes {"id": "b1", ...}` when bike b1 already exists, using the reader's code.
**Topic:** REST API design (request: method, path, query, headers, body · response: status, headers, body · 2XX worked, 4XX client problem, 5XX server failed · model things, not actions: URIs as resources, methods as verbs, a trip becomes a resource · Uniform Interface, Idempotency, Statelessness, Connectedness and the check question for each · PUT for anything a client may resend · poor fit: live updates, hardware commands, quotes, steps that must succeed together · reader: URI vs URL, headers carry metadata, codes per verb, client-tracked pagination)  **Lec:** 13  **Type:** apply  **Id:** f61da711
**A:** Parts:
1. (1) 404 Not Found: the URI names nothing, a client-side problem.
2. (2) 400 Bad Request: the request is malformed, and it is the client's job to fix it.
3. (3) 500 Internal Server Error: the request was fine and the server failed.
4. (4) 409 Conflict: the resource already exists.

(1) 404 Not Found: the URI names nothing, a client-side problem. (2) 400 Bad Request: the request is malformed, so 4XX, and it is the client's job to fix it. (3) 500 Internal Server Error: the request was fine and the server failed, so 5XX. (4) 409 Conflict, the reader's POST code for a resource that already exists. Two things to keep apart: the class (2XX worked, 4XX client, 5XX server) tells the client who has to act, and the code within the class says what happened.

### Q: Give the status code the bike share should return for each exchange, with one reason each: (1) `PUT /bikes/b1/trips/t-4f2a {"rider": "alex"}` the first time. (2) The same PUT resent after a timeout.
**Topic:** REST API design (request: method, path, query, headers, body · response: status, headers, body · 2XX worked, 4XX client problem, 5XX server failed · model things, not actions: URIs as resources, methods as verbs, a trip becomes a resource · Uniform Interface, Idempotency, Statelessness, Connectedness and the check question for each · PUT for anything a client may resend · poor fit: live updates, hardware commands, quotes, steps that must succeed together · reader: URI vs URL, headers carry metadata, codes per verb, client-tracked pagination)  **Lec:** 13  **Type:** apply  **Id:** 923ab75b
**A:** Parts:
1. (1) 201 Created: a new resource now exists at the URI the client chose.
2. (2) 200 OK on the resend, since the trip already exists and nothing changed.

(1) 201 Created: a new resource now exists at the URI the client chose. (2) 200 OK: the trip is already there and the resend changed nothing; the deck's slide 11 gives exactly this pair, and the different code does not break idempotency because the state is the same.

### Q: Here is the handler behind `PUT /bikes/:id/trips/:tripId`. Say whether it satisfies the deck's Idempotency constraint and show the failing retry, then rewrite it so a resend leaves the same state, returning 201 the first time and 200 after.

```ts
const trips: Trip[] = [];
app.put("/bikes/:id/trips/:tripId", (req, res) => {
  trips.push({ id: req.params.tripId, bike: req.params.id, rider: req.body.rider });
  res.status(201).json(trips[trips.length - 1]);
});
```
**Topic:** REST API design (request: method, path, query, headers, body · response: status, headers, body · 2XX worked, 4XX client problem, 5XX server failed · model things, not actions: URIs as resources, methods as verbs, a trip becomes a resource · Uniform Interface, Idempotency, Statelessness, Connectedness and the check question for each · PUT for anything a client may resend · poor fit: live updates, hardware commands, quotes, steps that must succeed together · reader: URI vs URL, headers carry metadata, codes per verb, client-tracked pagination)  **Lec:** 13  **Type:** apply  **Id:** f89830d5
**A:** Key:
1. It does not satisfy Idempotency: PUT promises to store at the URL, replacing what is there, but the handler appends.
2. Two identical requests leave two trips with id `t-4f2a`, so sending twice does not leave the same state as sending once.
3. Rewrite with keyed storage, `const trips = new Map<string, Trip>()` and `trips.set(trip.id, trip)`, which replaces on the same key.
4. Check `trips.has(req.params.tripId)` before the set and return `res.status(existed ? 200 : 201)`.

It does not. The method is PUT, which promises "store this at the URL, replacing whatever is there", but the handler appends: two identical requests leave two trips with id `t-4f2a` in the array, so sending twice does not leave the same state as sending once. The dock retry the deck worries about would double-start the trip. Keyed storage fixes it:

```ts
const trips = new Map<string, Trip>();
app.put("/bikes/:id/trips/:tripId", (req, res) => {
  const existed = trips.has(req.params.tripId);
  const trip = { id: req.params.tripId, bike: req.params.id, rider: req.body.rider };
  trips.set(trip.id, trip);
  res.status(existed ? 200 : 201).json(trip);
});
```

`set` on the same key replaces, so the state after two calls equals the state after one. The code changes from 201 to 200 but the resource does not, and idempotency is about the state, not the status.

### Q: The deck lists four bike share requirements that REST models poorly: live dock counts on the map as bikes come and go; unlocking the physical dock when the rider taps "unlock"; a price quote for a ride between two stations; reserving a bike and paying in one step. For each, say which of the summary's three awkward kinds it is (or that it is a fourth kind), why REST's model of things you store and change does not fit, and the closest RESTful shape you could force it into.
**Topic:** REST API design (request: method, path, query, headers, body · response: status, headers, body · 2XX worked, 4XX client problem, 5XX server failed · model things, not actions: URIs as resources, methods as verbs, a trip becomes a resource · Uniform Interface, Idempotency, Statelessness, Connectedness and the check question for each · PUT for anything a client may resend · poor fit: live updates, hardware commands, quotes, steps that must succeed together · reader: URI vs URL, headers carry metadata, codes per verb, client-tracked pagination)  **Lec:** 13  **Type:** apply  **Id:** f245c33d
**A:** Parts:
1. Live dock counts are pushing updates: REST is request and response, so the server cannot send an unrequested change; forced shape is polling `GET /stations/s2`.
2. Unlocking the dock is a command to hardware: nothing is stored, an action happens in the world; forced shape is `PUT /docks/d7/lock {"locked": false}`.
3. The price quote is a fourth kind outside the summary's three, a computation with no stored resource behind it; forced shape is `GET /quotes?from=s1&to=s2` or a stored `POST /quotes`.
4. Reserve and pay is steps that must succeed together, and REST has no transaction across requests; forced shape is one `POST /orders` doing both.

Live dock counts are pushing updates: REST is request and response, the client asks and the server answers, so the server has no way to send a change the client did not ask for; the forced shape is the client polling `GET /stations/s2` every few seconds, which is late and wasteful. Unlocking the dock is a command to hardware: nothing is stored or changed on the server, an action happens in the world, and a retry of a "command" is not harmless; the forced shape is a resource for the lock's wanted state, `PUT /docks/d7/lock {"locked": false}`, which is idempotent but hides that the real outcome is physical. The price quote is a fourth kind, outside the summary's three (pushing updates, commands to hardware, steps that must succeed together): it is a computation, not a thing you store: there is no resource before the question is asked; the forced shape is `GET /quotes?from=s1&to=s2` (a read with no stored thing behind it) or `POST /quotes` that creates and stores a quote with an id, paying with storage for a thing nobody needs kept. Reserve and pay is steps that must succeed together: two resources, a reservation and a payment, each with its own PUT or POST, so one can succeed and the other fail and REST has no transaction across requests; the forced shape is one new resource, `POST /orders`, whose creation does both inside the server, which works but means the "thing" exists only to make two steps atomic.

### Q: Both PUT and POST can create a resource. Which one of these statements about the difference matches the deck and the reader? (a) PUT creates only collections and POST only members. (b) PUT creates when the client chooses the URI and a repeat changes nothing; POST creates at a URI the server chooses and a repeat creates again. (c) POST is idempotent and PUT is not, so POST is safer to retry. (d) Only POST may carry a body, so only POST can create. Justify your choice.
**Topic:** REST API design (request: method, path, query, headers, body · response: status, headers, body · 2XX worked, 4XX client problem, 5XX server failed · model things, not actions: URIs as resources, methods as verbs, a trip becomes a resource · Uniform Interface, Idempotency, Statelessness, Connectedness and the check question for each · PUT for anything a client may resend · poor fit: live updates, hardware commands, quotes, steps that must succeed together · reader: URI vs URL, headers carry metadata, codes per verb, client-tracked pagination)  **Lec:** 13  **Type:** recall  **Id:** 2240a1fa
**A:** Key:
1. (b): PUT creates when the client chooses the URI and a repeat changes nothing; POST creates at a server-chosen URI and a repeat creates again.
2. PUT and DELETE are idempotent, and POST is not.

(b). The reader's table says PUT updates the resource at a known URI and can create one when the client picks a new URI, and POST creates a resource and returns the URI the server gave it; PUT and DELETE are idempotent, POST is not. The deck's slide 9 adds a bike with `POST bikes/`, which returns the new bike's URI, and slide 11 starts a trip with `PUT /bikes/b1/trips/t-4f2a`, an id the app chose, so a resend gets 200 and changes nothing. (a) invents a rule; (c) is backwards; (d) is wrong because PUT carries a body too, and the deck's table says so.

### Q: True or false, and justify: "The weather request should be `GET /v1/forecast` with the headers `X-City: Vancouver` and `X-Days: 3`, because headers are where a request's parameters go."
**Topic:** REST API design (request: method, path, query, headers, body · response: status, headers, body · 2XX worked, 4XX client problem, 5XX server failed · model things, not actions: URIs as resources, methods as verbs, a trip becomes a resource · Uniform Interface, Idempotency, Statelessness, Connectedness and the check question for each · PUT for anything a client may resend · poor fit: live updates, hardware commands, quotes, steps that must succeed together · reader: URI vs URL, headers carry metadata, codes per verb, client-tracked pagination)  **Lec:** 13  **Type:** critique  **Id:** 5dc877ee
**A:** Key:
1. False.
2. Headers carry metadata about the exchange, such as the wanted format, the encoding or credentials, never the resource or the request's data.
3. City and days name the resource, so they belong in the URI: `GET /v1/forecast?city=Vancouver&days=3`.

False. The reader's rule is that headers carry metadata about the exchange, such as the wanted format (`Accept: application/json`), the encoding or credentials, and never the resource or the request's data. Which city and how many days name the resource being asked for, so they belong in the URI: the deck's own request is `GET /v1/forecast?city=Vancouver&days=3`. Two costs of the header version: a generic tool or a cache keys on the URL, so every city's forecast would look like the same resource, and a client cannot bookmark, log or link the request. Request data that is not part of the name, such as the text to translate, goes in the body of a POST.

### Q: Name the deck's four RESTful design properties. For each, give its one-line definition, the bike share problem the deck says it solved, and the check question to ask of a design.
**Topic:** REST API design (request: method, path, query, headers, body · response: status, headers, body · 2XX worked, 4XX client problem, 5XX server failed · model things, not actions: URIs as resources, methods as verbs, a trip becomes a resource · Uniform Interface, Idempotency, Statelessness, Connectedness and the check question for each · PUT for anything a client may resend · poor fit: live updates, hardware commands, quotes, steps that must succeed together · reader: URI vs URL, headers carry metadata, codes per verb, client-tracked pagination)  **Lec:** 13  **Type:** recall  **Id:** ffaeed8d
**A:** Parts:
1. Uniform Interface: only standard methods with the same meaning everywhere, and status codes report the outcome; solved standard HTTP libraries; its check is whether a generic tool could handle it.
2. Idempotency: sending twice leaves the same state as sending once (every method but POST); solved retries at the dock; its check is what happens if the client retries.
3. Statelessness: each request carries everything needed, and the server keeps resources, not client history; solved `/stations/more`; its check is whether a different server could answer.
4. Connectedness: responses link to related resources so clients follow links; solved changing the page size; its check is whether the client ever builds a URL itself.

Uniform Interface: clients act on resources with only the standard methods, which mean the same thing in every API, and status codes report the outcome. It solved working with standard HTTP libraries. Check: could a generic tool handle this request correctly without knowing your API? Idempotency: sending a request twice leaves the same state as sending it once; every method but POST. It solved retries at the dock. Check: what happens if the client retries? Statelessness: each request carries everything needed to understand it, and the server keeps the resources, not what the client has done. It solved the `/stations/more` endpoint. Check: could a different server answer this request? Connectedness: responses link to related resources, so clients follow links instead of building URLs. It solved changing the page size. Check: does the client ever build a URL itself?

---

## Lec 16 — Modelling & Specification (logged 2026-11-05 from deck 09b-model-specs.pdf; no reader chapter covers it; Matt was at the dentist and takes no notes in this course; written in the exam formats: true/false with justification, multiple choice, short answer with handwritten TypeScript)

### Q: A team gets a two-page email from the registrar describing a section waitlist and starts writing TypeScript from it the same afternoon. Name the deck's four representations in order, say which two the team skipped, and for each skipped one say who or what checks it and what it would have caught.
**Topic:** Modelling & specification  **Lec:** 16  **Type:** apply  **Id:** 115e985f
**A:** Parts:
1. The four in order are requirements, models, specifications, code.
2. The team skipped models and specifications.
3. A model is checked by walkthroughs; it decides what there is to specify and finds what the requirements omit.
4. A specification (documentation and tests) is what developers code from, and it checks the code because the tests run against the implementation.

Slides 3 and 4. Requirements are checked by the non-technical stakeholders, which the email already got. The point of the chain is that each step has its own checker: stakeholders read the requirements, a walkthrough exercises the model, and tests exercise the code. Going straight from an email to code means the first time anyone finds out the email never said what happens when two seats free up at once is when a user hits it.

### Q: A request reads: "Each study room can be booked for at most two hours. A student may hold at most one booking at a time. A booking can be cancelled until ten minutes before it starts. Staff can block a room for maintenance, which cancels any booking in that window." Using the deck's grammar hints, extract the candidate classes, fields, operations and rules, and say which hint produced each.
**Topic:** Modelling & specification  **Lec:** 16  **Type:** apply  **Id:** 17ab8911
**A:** Parts:
1. Nouns become classes or fields: Room and Booking are classes; a booking's start, length and student id are fields; "staff" and "student" are ids, not classes we hold.
2. Verbs someone does become operations: book, cancel, block.
3. Limits, conditions and consequences become rules: at most two hours; one booking per student; cancel only until ten minutes before the start; a block cancels the bookings in its window.

The hints give candidates only; shape, evaluate and revise come next. Slide 7's table: a noun (or an adjective that classifies a noun) usually becomes a class or field, a verb someone does becomes an operation, and a limit, condition or consequence becomes a rule. Whether a noun is a class or a field is slide 9's question, asked next: a booking has its own data and rules about how it changes, so it is a class; a start time is just a value, so it is a field.

### Q: Which one of these should be modelled as a class rather than a field or an operation, by the deck's test? (a) The number of seats in a lecture hall. (b) A student's position in a waitlist. (c) A seat at a concert, which has a number, a price and an occupant. (d) The name of a section. Give the test and apply it to all four.
**Topic:** Modelling & specification  **Lec:** 16  **Type:** apply  **Id:** e89c9280
**A:** Key:
1. (c).
2. Test: just a value of something else is a field; its own data or rules about how it changes make a class; something always computable from other state is an operation.
3. (a) is a count, a field; (d) is a name, a field; (b) is computed from the order of the line, an operation.
4. Lecture hall seats are interchangeable, so a count; concert seats each carry data, so a class.

Slide 9 uses exactly this contrast: the same word, "seat", is a field in one request and a class in another. The deciding question is never the word but whether the thing carries data or rules of its own.

### Q: In the waitlist model, Section holds a Waitlist and an enrolment list. The request says a student cannot join the waitlist of a section they are already enrolled in, and that student names and emails live in the Student Information System. Answer the deck's two shaping questions for Section and Waitlist, say on which class `join` must be defined and why, and say what Student becomes in this model.
**Topic:** Modelling & specification  **Lec:** 16  **Type:** apply  **Id:** c1d87fcb
**A:** Parts:
1. Ownership: Section creates its own Waitlist and controls its lifetime, so composition.
2. Encapsulation: the "not already enrolled" rule is a rule about the section that depends on the waitlist.
3. `join`, the operation that could break that rule, must be defined on Section (or go through it) so Section can enforce it.
4. Student is not a class here: the data lives elsewhere, so the model keeps a student id field and associates by id.

Slide 10. Operations that touch only the line's order, such as reading a position, can stay on Waitlist. Ownership asks who controls B's lifetime: yes means A creates B directly (composition), no means A accepts an instance made elsewhere (association). Encapsulation asks whether a rule about A depends on B: yes means operations that could break the rule go on A. The enrolment check needs both the enrolment list and the waitlist, and only Section sees both. Student is the trap: a prominent noun in the request that still ends up as an id field, because nothing about a student is stored or changed in this system.

### Q: Classify each sentence as an invariant, a precondition, a postcondition or an exceptional case, and give the deck's one-line definition of each kind: (1) "The waitlist never holds more than 50 students." (2) "Call `join` only once the section is full." (3) "After `leave`, every student behind the leaver moves up one place and nobody else changes." (4) "`join` returns `{ ok: false, reason: "already-waiting" }` and changes nothing when the student is already in line."
**Topic:** Modelling & specification  **Lec:** 16  **Type:** apply  **Id:** 78a08d84
**A:** Parts:
1. (1) invariant: always true about the object between operations.
2. (2) precondition: must be true before the call, and it is the caller's job.
3. (3) postcondition: what the operation guarantees afterwards, including what does not change.
4. (4) exceptional case: what the operation checks itself, and the result it gives when it cannot proceed.

Slide 11. One sentence of a request often gives both an invariant and a rule on the operation that keeps it: "at most 50" is (1) and also a "full" exceptional case on `join`. The split that matters for tests and for code is who checks: a precondition is assumed by the operation and promised by the caller, an exceptional case is checked by the operation and reported in its result. The "nobody else changes" half of (3) is part of the postcondition, not decoration; the deck says a postcondition includes what does not change.

### Q: Run this scenario through the waitlist sketch, writing the state after every call: Ada, Ben and Cy join a full section; a seat frees up; while Ada's offer is still open, a second seat frees up. Where does the walkthrough get stuck, what are the two possible reasons the deck gives for getting stuck, and what do you do in each case?
**Topic:** Modelling & specification  **Lec:** 16  **Type:** derive  **Id:** 25941399
**A:** Parts:
1. State: after the three joins the line is Ada, Ben, Cy; after the first drop the line is Ada, Ben, Cy and the offer is Ada with 24 hours.
2. It sticks at the second drop: the request does not say whether Ben is offered the second seat while Ada's offer is open, or whether it waits.
3. Reason one, a gap in the model: a field or operation is missing, so change the model.
4. Reason two, the requirement does not say: decide the behaviour and record it, or ask the stakeholder.

Slides 12 and 13. The model is complete when no scenario fails and every open question needs the stakeholder's input. The walkthrough rule is to use only the fields and operations in the sketch and write the state after each call. The second-seat case is a requirements gap, not a model gap: the sketch can represent two open offers or a queue of free seats, but nothing in the request picks one. That goes in the issue as a decision ("offer the next student in line at once; a student holds at most one offer") or a question for the registrar.

### Q: A teammate documents `leave` on the waitlist like this. Label each line with the rule kind it claims to be, say which lines are wrong or missing by the deck's definitions, and rewrite the comment in the deck's style.
```ts
/**
 * Removes a student from the line.
 * Precondition: the student is in the line; if not, returns { ok: false, reason: "not-waiting" }.
 * Postcondition: the student is no longer in the line.
 */
leave(id: StudentId): LeaveResult;
```
**Topic:** Modelling & specification  **Lec:** 16  **Type:** critique  **Id:** de39df0f
**A:** Key:
1. The "precondition" line is really an exceptional case: a precondition is the caller's job and is not checked, but this one is checked and answered with a reason.
2. The postcondition is incomplete: it must say what else changes (everyone behind moves up one) and what does not (nobody ahead moves, the maximum is unchanged).
3. Rewrite: `@param id` is a valid student id, not checked (precondition); on success `{ ok: true }`, the student is gone and each student behind moves up one place, nobody ahead moves (postcondition); otherwise `{ ok: false, reason: "not-waiting" }`, unchanged (exceptional case).

The class invariant (no duplicates, never over the maximum) stays on the interface comment, not on `leave`. Slide 14 marks each sentence of the `join` comment as invariant, precondition, postcondition or exceptional, and the two give-aways are "not checked" for a precondition and a reason code in the result for an exceptional case. Calling a checked condition a precondition is the common slip: it tells the caller they must guarantee something the operation already guards.

### Q: Write two Mocha tests for `join` in the deck's given, when, then shape, one for the postcondition "the student is last in line and nobody else moves" and one for the exceptional case "already-waiting". Then say what a third test for the precondition "call only once the section is full" should look like.
**Topic:** Modelling & specification  **Lec:** 16  **Type:** apply  **Id:** d21606bf
**A:** Parts:
1. Postcondition test: given a full section whose line is Ada and Ben, when Cy joins, then the result is `{ ok: true, position: 3 }` and the line reads Ada, Ben, Cy.
2. Exceptional test: given a line holding Ada, when Ada joins again, then the result is `{ ok: false, reason: "already-waiting" }` and the line is unchanged.
3. There is no third test: preconditions are not tested, because behaviour when one is violated is unspecified.

Slide 15. Each clause of the specification gets at least one test, and each walkthrough step becomes one. In TypeScript, roughly:
```ts
it("join puts the student last and moves nobody", () => {
  const w = fullSectionWith(["ada", "ben"]);          // given
  const r = w.join("cy");                             // when
  expect(r).to.deep.equal({ ok: true, position: 3 }); // then
  expect(w.order()).to.deep.equal(["ada", "ben", "cy"]);
});
it("join refuses a student already in line", () => {
  const w = fullSectionWith(["ada"]);
  const r = w.join("ada");
  expect(r).to.deep.equal({ ok: false, reason: "already-waiting" });
  expect(w.order()).to.deep.equal(["ada"]);
});
```
The "unchanged" assertion in the second test is the postcondition half of an exceptional case and is easy to forget. A test that calls `join` on a section that is not full is testing nothing the specification promises, so whatever it asserts is a guess.

### Q: True or false, and justify: "A walkthrough and a unit test check the same thing, so once the unit tests pass the walkthrough was wasted effort."
**Topic:** Modelling & specification  **Lec:** 16  **Type:** critique  **Id:** 6efdd99f
**A:** Key:
1. False.
2. A walkthrough evaluates the model, by hand, before any code exists; a unit test makes the specification executable and checks the implementation.
3. Models determine what is specified and specifications determine what is tested, so a gap the walkthrough would have found never becomes a test at all.
4. The walkthrough is also what turns requirement silences into recorded decisions or stakeholder questions, which tests cannot do.

Slide 16's summary pairs them deliberately: walkthroughs for the model, unit tests for the specification. They sit at different links of the requirements, models, specifications, code chain, and each walkthrough step is the source of a later test's given, when, then.

### Q: Which one of these matches the deck's summary of what each kind of rule constrains and what each checking activity evaluates? (a) Invariants constrain operations; preconditions, postconditions and exceptional cases constrain classes; walkthroughs check the code. (b) Invariants constrain classes; preconditions, postconditions and exceptional cases constrain operations; walkthroughs evaluate the model and unit tests make the specification executable. (c) All four rule kinds constrain operations; tests evaluate the model. (d) Invariants and preconditions constrain classes; postconditions constrain operations; walkthroughs replace tests. Justify your choice.
**Topic:** Modelling & specification  **Lec:** 16  **Type:** recall  **Id:** 0063bcf5
**A:** Key:
1. (b).
2. Invariants belong to classes, the other three to operations.
3. Walkthroughs evaluate the model; unit tests make the specification executable.

Slide 16. (a) swaps the two groups, (c) puts invariants on operations and tests on the model, (d) makes walkthroughs a substitute for tests when the deck has them doing different jobs.
