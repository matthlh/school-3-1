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
### Q: A client sends POST /api/v2/buildings with the body `{"name": "ICCS", "floors": "six"}` where floors must be a number. A second client sends a body that is not valid JSON at all. Give the status code for each and the one-word reason the codes differ.
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** apply
**A:** The first gets 422 Unprocessable Entity: the JSON parsed, but a field has the wrong type. The second gets 400 Bad Request: the body could not be parsed. The difference is parsing. 400 means the server could not read it; 422 means it read it and rejected the contents.

### Q: Sort these into "the request worked" and "the client got something wrong": 200, 201, 204, 400, 404, 422. Then say what the first digit of a status code tells you and why 201 and 202 are not interchangeable.
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** recall
**A:** Worked: 200, 201, 204. Client error: 400, 404, 422. The first digit is the class: 2xx success, 4xx client error, 5xx server error. 201 Created means a new resource now exists. 202 Accepted means the server has queued the work and has not done it yet, so a client cannot assume the thing exists.

### Q: A handler creates a building and returns 200 with the new building in the body. A reviewer says it should return 201. Is the reviewer right, and does anything break if the code stays at 200?
**Topic:** Lab 1 HTTP & PUT  **Lec:** Lab 1  **Type:** critique
**A:** The reviewer is right: 201 is the code that says a new resource was created, and it is what openapi.yml and the lab tests specify. Nothing breaks at the HTTP level, since both are success codes, but the contract is now wrong: clients and tests written to the spec check for 201, and a generic 200 hides the create-versus-replace distinction that PUT relies on (201 first call, 204 repeat).

### Q: A teammate writes: "req is the data we pass in, and res is what the API returns to us." Correct each half from the server's point of view, and name the one method chain you use to send a reply.
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** critique
**A:** Inside the handler you are the server, not the caller. req is the incoming request from the client: you read from it (req.params, req.body). res is the reply you are building for that client: you write to it, and you never receive anything from it. The reply goes out through res.status(code).send(body); the handler's return value is ignored.

### Q: Where does express.json() run relative to app.delete("/api/v2/buildings/:buildingId", …), what would req.body contain without it, and why is it middleware rather than part of each handler?
**Topic:** Lab 1 request path & async  **Lec:** Lab 1  **Type:** apply
**A:** It runs on every request before any handler, because app.use(express.json()) registers it as middleware at startup. Without it req.body is undefined, since Express does not parse bodies by default. It is middleware because every handler that reads a body needs the same parsing, so it is done once in a shared step instead of being copied into each handler.

## Lec 2 — Coupling (logged 2026-09-15, deck 02a-coupling.pdf + reader Change Difficulty)

### Q: Coupling is measured on three axes. Name them and give a one-line definition of each.
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** recall
**A:** Degree: how many components a dependency touches. Locality: how far apart the dependent components are. Strength (connascence): how much effort it takes to change the dependency.

### Q: List the five connascence types in increasing order of cost to change, one line each.
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** recall
**A:** Name (what something is called) · Type (the shape of the data) · Value (a shared literal) · Position (argument order) · Algorithm (a computation both sides must do the same way).

### Q: `createInvoice(customerId, startDate, endDate, total, tax)` is called from several modules. One caller swaps `total` and `tax`. Which connascence type is this, and why is the bug worse than a compile error?
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** apply
**A:** Connascence of position. The code still compiles and may still pass tests, since both arguments are the same type; it just computes the wrong number, silently, for every invoice that caller creates.

### Q: The string `"pending"` is hardcoded in validation, reporting, and UI code. Renaming it to `"in-review"` in only two of the three spots does not error. Which connascence type is this, and why is it worse than connascence of name?
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** apply
**A:** Connascence of value. Renaming a method (connascence of name) is caught by the compiler or an IDE's rename tool at every call site; a shared literal string is invisible to both, so a missed spot runs without error and just misbehaves.

### Q: `findUserById` gets renamed everywhere via one IDE refactor with no bugs introduced, even though it has many call sites. Explain why connascence of name is cheap despite a high degree, using Degree, Locality, and Strength.
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** critique
**A:** Degree (call-site count) is high, but Strength is low: a name is explicit and type-checked, so tooling finds and fixes every site mechanically. Cost tracks Strength more than Degree — a large, cheap-to-fix footprint beats a small, silent one.

### Q: Class A encodes data with an algorithm; Class B must decode it with the matching algorithm. There is no shared name, type, or literal between them. Name the connascence type, and explain what makes it dangerous to catch.
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** apply
**A:** Connascence of algorithm. Nothing in the code ties the two implementations together — no import, no shared constant, no type signature — so a change to one side's logic breaks the other with no compiler error and no obvious code link to follow.

### Q: The reader says coupling cannot be eliminated, only loosened. Name the three ways to reduce it, mapped to the three axes.
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** derive
**A:** Minimize the number of interfaces between elements (reduces Degree). Minimize the distance between interfaces (reduces Locality). Weaken the kind of connascence a dependency relies on, e.g. a named options object instead of five positional arguments (reduces Strength).

### Q: Why is implicit coupling more dangerous than explicit coupling of the same degree? Tie this to lecture 1's idea of "footprint."
**Topic:** Coupling & connascence  **Lec:** 2  **Type:** derive
**A:** Explicit coupling (imports, types) is visible to the compiler, so tooling can find every affected site, the way a clear footprint can be fully read. Implicit coupling is only visible at runtime, so nothing stops you from missing part of it, the same risk a large or unclear footprint carries.

## Lec 3 — Cohesion & refactoring (logged 2026-09-17, deck 02b-cohesion-refactoring.pdf + reader Change Difficulty and Refactoring; no in-class notes)

### Q: The deck pairs each of coupling and cohesion with one difficulty and one risk. Give all four, then say which of the four the Parkboard `v1-direct` diff (the loyalty-tier block pasted at four sites across two files) shows most directly.
**Topic:** Cohesion & bindings  **Lec:** 3  **Type:** recall
**A:** High coupling: the difficulty is making the edit in more places, and the risk is missing a place that needed the edit. Low cohesion: the difficulty is understanding what the unit actually does before you can change it, and the risk is an edit disturbing code unrelated to the reason for the change. Parkboard v1 shows the coupling difficulty most directly, because one concept needs four edit sites. It also plants loyalty logic inside registration code, which sets up the cohesion risk for the next change.

### Q: Name the three kinds of cohesion binding, define each in one sentence, and give the reader's alternative name for the third. Then say what "the more they share, the more they belong together" tells you to do with a statement that shares nothing with its neighbours.
**Topic:** Cohesion & bindings  **Lec:** 3  **Type:** recall
**A:** Data binding: two statements read or write the same data. Logic binding: two statements sit in the same branch of a conditional or switch and run because that condition held. Order binding: the statements must run in a fixed sequence. The reader's prose calls the third one timing, though its own table says Order. A statement with no binding to anything around it does not belong in that unit, so it is the first candidate to move or extract, while a pair sharing several bindings should stay together.

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
**Topic:** Cohesion & bindings  **Lec:** 3  **Type:** apply
**A:** (a) Data, because line 2 reads `total`, which line 1 wrote, and order, because line 1 must run first for line 2 to be right. There is no logic binding beyond both running unconditionally. (b) Logic, because both run only when the `avg > 500` branch holds, and data, because both read `avg`. There is no order binding: swapping them changes nothing. (c) None. Line 6 reads no variable the others use, sits in no branch, and nothing depends on it having run before or after. That is the low-cohesion tell: temp-file purging is a separate concern sitting inside a pricing function, so move it to the caller or its own unit (Fowler's Move Method). Leaving it means a change to temp-file handling forces someone to read and risk breaking `closeMonth`.

### Q: A codebase has `class Helpers` with static methods `formatDate`, `hashPassword`, `parseCsvRow` and `postSlackAlert`, each called from one different feature. A teammate says it is fine because every method is short and has tests. Assess the class in the deck's terms, name what it costs, and say what you would do.
**Topic:** Cohesion & bindings  **Lec:** 3  **Type:** critique
**A:** Cohesion is low. No pair of methods shares data, sits under a common condition, or must run in order, so this is the deck's `Util` box holding pieces of four features. Short, tested methods do not change that, because cohesion is about whether the pieces belong together, not whether each piece works. The cost is the deck's low-cohesion difficulty and risk: someone changing the hash has to open and understand a file full of dates, CSV and Slack, and a shared import or constant edited for one of them can disturb the others. The fix is to move each method next to the feature that calls it (Move Method, or Extract Class per feature), which is the slide 7 picture of one unit per feature. A method genuinely shared by several features can stay, but the class then needs a name that says what it is, not `Helpers`.

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
(a) Which pairs among (1) to (4) are logic-bound, and does any pair also carry a data or order binding? (b) A reviewer wants to pull (2) and (3) into their own function. Does cohesion support that, and why?
**Topic:** Cohesion & bindings  **Lec:** 3  **Type:** apply
**A:** (a) Only (2) and (3) are logic-bound: they are the two statements in one branch and run because `event === "deleted"` held. Every other pair sits in different branches, so no pair across branches shares logic, data or order. By the deck's definitions (2) and (3) carry no data or order binding: neither reads what the other wrote, and neither needs the other to have run first, so swapping them changes nothing the code does. (b) Yes. The pair shares a logic binding with each other and nothing with the rest of the function, so an `onDeleted()` method (Extract Method) groups what belongs together and leaves `handle()` as pure dispatch, where each branch is one call.

### Q: The reader says a cohesive class has a small set of private fields that most of its public methods use. Explain why a field used by only two of ten methods is a cohesion warning, what those two methods and the field probably are, and which refactoring from Fowler's list the advice implies.
**Topic:** Cohesion & bindings  **Lec:** 3  **Type:** derive
**A:** Cohesion is measured by what pairs share. A field most methods read or write is a data binding running through the whole class, and that is what makes the class one unit. A field only two methods touch means those two are data-bound to each other and to almost nothing else in the class, so they form their own cluster with a different reason to change. They are probably a separate concept that was parked here because the class already existed. The implied move is Extract Class: take the field and the two methods into a new class and have the original delegate to it (Move Field and Move Method are the individual steps). The result is two smaller units, each with fields that most of its methods use.

### Q: Give the deck's one-line definition of refactoring and the reader's, and say what a refactoring never does. Then name at least six refactorings from the Fowler catalogue the reader lists.
**Topic:** Refactoring  **Lec:** 3  **Type:** recall
**A:** Deck: a predictable, meaning-preserving code transformation, where meaning is behaviour. Reader: "the process of improving on the implementation of an existing design by restructuring the source code to alleviate existing shortcomings and ease future development." A refactoring never changes what the program does: it adds no feature and fixes no bug. It changes structure so the next change is cheaper, usually by consolidating duplicates, reducing coupling or raising cohesion. Fowler's list in the reader: rename (class, field or method); move (class, field or method); extract class, interface or method; push down or pull up a field or method; replace a magic number or string with a constant; replace inheritance with delegation.

### Q: List the reader's four refactoring steps and the deck's six. Why does the test suite run twice, and when does the deck say not to refactor at all?
**Topic:** Refactoring  **Lec:** 3  **Type:** recall
**A:** Reader: identify the property to improve and the transformations that will do it; run the suite to confirm the system works; perform the refactoring; run the full suite again and confirm identical behaviour. Deck: make sure all tests pass; examine coupling and cohesion; determine the refactoring; apply it; run the tests to confirm nothing broke; repeat until the change is localised. The first run establishes that green is real before anything is touched, so a red after the refactoring can only be the refactoring. Without it you cannot separate a pre-existing failure from one you introduced. Slide 16 says not to refactor when tests are already failing, when the code should be rewritten instead, or when a deadline is imminent, and slide 17 adds not to refactor while fixing a bug, because a fix changes behaviour on purpose and mixing the two hides which change did what.

### Q: A teammate writes a second near-copy of an eight-line validation block and opens a PR extracting both copies into `validateFields()` "so we never write it a third time". Another teammate says the right moment is the next copy, not this one. Who is following the reader, what is the rule called, and what does it protect against? Then name the three technical-debt triggers the reader gives.
**Topic:** Refactoring  **Lec:** 3  **Type:** apply
**A:** The second teammate follows the reader's rule of three: the first time, write it simply; the second time, duplicate it and note the duplication; the third time, refactor. It guards against premature abstraction, which the reader says can make a system harder to understand even when it is easier to extend, because with only two examples you are likely to generalise the wrong thing. The three triggers that debt is due: a new feature is much harder than expected; fixing a bug that should be cohesive needs changes scattered across the system; a code review of a simple change shows complex, hard-to-understand edits. Two copies is a note-it moment, not yet a trigger. Parkboard v2 extracted at four copies.

### Q: A PR titled "Refactor: extract PricingService" moves the fee calculation out of `Invoice` into a new class and, in the same commit, changes tax rounding from truncation to round-half-up, editing two expected values in the tests so the suite stays green. Is this a refactoring? Say what is wrong in the deck's and the reader's terms and what the author should have done instead.
**Topic:** Refactoring  **Lec:** 3  **Type:** critique
**A:** No. A refactoring preserves behaviour and the rounding changed, so the program's semantics are different. Editing the expected values destroys the oracle: the process runs the same tests before and after, and here the "after" tests are different tests, so green proves nothing about the extraction. It also breaks the deck's rule of not refactoring while fixing a bug, because a reviewer cannot tell which of the two changes caused any difference in output. The right sequence is one commit that extracts `PricingService` with the existing tests untouched and passing before and after, then a separate commit that changes the rounding and updates its tests as a deliberate behaviour change.

### Q: `Invoice.printOwing()` prints a banner, loops over tasks summing `owing`, then logs the amount. The reader extracts the loop into a private `getOwing()`. Which bindings tied the banner to the loop, which tied the loop to the log line, and why does the extraction raise cohesion rather than merely shorten the method? Name the refactoring.
**Topic:** Refactoring  **Lec:** 3  **Type:** apply
**A:** Banner and loop were bound by logic (both run whenever `printOwing` runs) and order (banner first) but shared no data. Loop and log line were bound by data (`owing`) and order (sum before log). So the calculation belongs with printing the amount, not with the banner. After Extract Method, `printOwing()` holds one concern (output) and `getOwing()` another (calculation), and every pair inside each unit shares data or order. Cohesion rises because each unit now contains only statements bound to each other. The shorter method is a side effect, and `getOwing()` can be tested or reused without printing anything.

### Q: Clients call `RoomsParser.parseRooms(id, zip)` and `CourseProcessor.processCourses(id, zip)`, which have the same shape. The reader applies three refactorings so that both classes implement `IParser { parse(id, zip): boolean }`. Name the three, then explain in lecture 2's connascence terms what the clients were bound to before and after, and why that makes the coupling cheaper.
**Topic:** Refactoring  **Lec:** 3  **Type:** derive
**A:** Extract Interface (`IParser`), Rename (`CourseProcessor` to `CourseParser`, and both methods to `parse`), plus adding an explicit return type to the signature. Before, each client was bound to a specific class and a specific method name, so adding a third parser or renaming a method meant editing every client: connascence of Name to two different targets, with client logic duplicated per parser. After, clients depend only on the `IParser` type, which is connascence of Type and compiler-checked, so a new parser is one new class and zero client edits. The degree of coupling is about the same, but its strength dropped to the cheapest kind the tooling can catch for you.

## Lec 4 — Refactoring (logged 2026-09-26, deck 03a-refactoring.pdf + reader Refactoring; no in-class notes)

### Q: The deck gives three signs that a change is going to be difficult and three kinds of abstraction to introduce before making it. Name all six and pair each sign with the abstraction that removes it. What does the reader call the process of folding such abstractions in as the system grows?
**Topic:** Emergent design and technical debt  **Lec:** 4  **Type:** recall
**A:** Signs: the change has to be made in more than one place; you can tell it will cause merge conflicts or edits to the same file as a teammate; the code is too obscure to understand clearly. Fixes, in the same order: remove the duplication, clones or scattering that create the several edit sites; split apart tangled pieces of functionality so teammates stop landing in the same file; make the code readable. Each sign raises the chance of a bug, which is why you refactor before the change, not after. The reader calls it emergent design: you learn which abstractions fit as the system grows, and refactoring is how you add them.

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
**Topic:** Code smells  **Lec:** 4  **Type:** critique
**A:** (a) Feature envy: the method wants many fields of another object, so it probably belongs in that object. The deck's companion rule is the Law of Demeter: a long chain of dereferences (`order.customer.profile.address.city`) means the method is in the wrong spot. (b) Formatting a name and an address is the customer profile's (or the address's) own behaviour, so move it there: `Profile.fullName()` and `Address.format()`, or one `Customer.mailingBlock()`, and `render` makes one or two calls. This is the deck's `Cat` telling `Dog` to run, wag and smile, fixed by `fido.beChased()`. (c) Before, `ShippingLabel` is coupled by name to the internal structure of three other classes (`customer`, `profile`, `firstName`, `street`…), so renaming or restructuring any of them breaks the label. After, it depends on one method name on one class, so the degree of coupling drops and a change inside the profile stays inside the profile.

### Q: Shared setup for all parts. In one codebase: `billing.ts` has `if (plan === 2) fee *= 0.8;`, `ui.ts` has `if (user.plan == "2") showBadge("Student");`, and `report.ts` has `const discount = 20; // percent`. All three refer to the student plan and its discount. (a) Name the smell and the connascence type. (b) Give the deck's three challenges and point to where each one shows up here. (c) A teammate adds `const STUDENT_PLAN = 2;` at the top of each of the three files. Has the problem been fixed?
**Topic:** Code smells  **Lec:** 4  **Type:** critique
**A:** (a) Magic values: semantically important values written straight into the code. It is connascence of value, because the three sites must agree on what "student plan" is and what the discount is. (b) Coupling: you have to find every site that must agree and work out what changing the value does; here the plan id and the discount live in three files. Readability: `2` and `0.8` say nothing about what they mean. The same value encoded different ways: the plan is the number `2` in one file and the string `"2"` in another, and the discount is `0.8` (a multiplier) in one place and `20` (a percent) in another, so a text search for one spelling misses the others. (c) No. The value is now named, which helps readability, but it is still defined three times, so the three constants still have to agree: it is still connascence of value across three places. The fix is one shared definition (a `Plan.Student` enum and one `STUDENT_DISCOUNT` constant) imported everywhere, so the agreement lives in a single place.

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
**Topic:** Code smells  **Lec:** 4  **Type:** critique
**A:** (a) This is the deck's slide 19 version. The duplicate lines were pulled up, but the sequence (open, write, close) is still copied into every subclass, and nothing forces a new subclass to follow it. An `XmlExporter` can forget `close()` and leak the file, or call things out of order, and the compiler will not object. The parent should own the order. (b) Make `export` concrete in the parent and have it call one abstract hook, which is a template method:
```ts
abstract class Exporter {
  public export(rows: Row[]): void { this.open(); this.write(rows); this.close(); }
  protected abstract write(rows: Row[]): void;
}
```
Each subclass now implements only `write`. The fixed steps exist once, and a subclass can fill the gap but cannot skip or reorder the steps around it.

### Q: Two functions compute a late fee. `libraryFee(days)` returns `Math.round(days * 0.25 * 100) / 100` capped at 10. `equipmentFee(days)` returns `Math.floor(days * 0.25 * 100) / 100` capped at 10. Nobody remembers whether the rounding difference was intended. Name the smell and the connascence type, say why "almost" duplicates are worse than exact ones by the deck's list of challenges, and describe the refactoring and what you must settle before doing it.
**Topic:** Code smells  **Lec:** 4  **Type:** critique
**A:** Almost-duplicate code, which is connascence of algorithm: the two sites encode the same fee rule and must stay in agreement, so changing the rate or cap means finding and editing both. The deck's challenges: multiple sites must stay in agreement; when the copies are not identical they are very hard to find (searching for one copy's text misses the other); and it is hard to tell where a behaviour actually comes from. Here the rounding already differs, and nobody can say whether that is a bug or a requirement. The refactoring is Extract Method into one `lateFee(days, rounding)` (or one function if the difference turns out to be a bug). Before refactoring you have to decide whether the rounding difference is intended, because a refactoring must preserve behaviour: if both are kept, the parameter preserves them; if one is a bug, fixing it is a separate, behaviour-changing commit, never part of the refactoring.

### Q: For each smell, give the deck's name and the usual refactoring: (a) a method that reaches through another object's fields to make it do things; (b) the literal `86400` in four files; (c) the same header and footer printed in every subclass's `printReport()`, with only the middle lines differing.
**Topic:** Code smells  **Lec:** 4  **Type:** recall
**A:** (a) Feature envy, a Law of Demeter violation. Move the behaviour into the envied class (Move Method) so the caller makes one call. (b) A magic value, which is connascence of value. Replace the magic number with a symbol (a named constant defined once, such as `SECONDS_PER_DAY`). (c) Almost-duplicate code, which is connascence of algorithm. Pull up the shared behaviour into the parent and make `printReport()` a template method that calls an abstract hook such as `printContents()` for the unique lines.

### Q: Give the deck's definition of technical debt and its four claims about it, the rule of thumb for noticing it, and what the cost-per-feature chart on slide 21 shows.
**Topic:** Emergent design and technical debt  **Lec:** 4  **Type:** recall
**A:** Technical debt is the extra cost of changing the system later because of shortcuts taken earlier. It accumulates invisibly, like interest. Not all of it is bad. The bad kind is the kind that slows the team down or raises risk. Code smells hint at where it sits. Rule of thumb: if you feel pain making a change, you are probably paying interest on technical debt. The chart plots cost per feature over the years after launch: without refactoring the cost keeps climbing, and with refactoring it stays roughly flat in a narrow band.

### Q: Shared setup for all parts. A team's `main` has four failing tests nobody has looked at. Priya wants to "clean up the scheduler first so the failures are easier to find". Omar is fixing a timezone bug in the same scheduler and plans to extract two methods while he is in there. The lead proposes a two-week refactoring sprint every March and September instead. Judge each of the three plans by the deck's refactoring timeline, and say what the deck recommends instead.
**Topic:** Emergent design and technical debt  **Lec:** 4  **Type:** critique
**A:** Priya: no. The deck says not to refactor while tests are failing. The process starts with a green suite so that any failure afterwards can only be the refactoring; with four red tests she cannot tell whether she broke something. Fix or understand the failures first. Omar: no. The deck says not to refactor while fixing a bug, because the bug fix changes behaviour on purpose and the refactoring must not, and doing both at once hides which change caused what. He should fix the bug, commit, then refactor (or refactor first on a green suite, then fix). The lead: no. The deck rejects "two weeks of every six months". Instead refactor opportunistically: when you notice a warning sign, just before or after adding a feature, and during code review.

### Q: Explain why the recap says to run the tests "before you touch the code, and after every single change" rather than once at the end of a refactoring session, and connect it to the deck's definition of refactoring.
**Topic:** Emergent design and technical debt  **Lec:** 4  **Type:** derive
**A:** A refactoring is by definition meaning-preserving: behaviour after must equal behaviour before. The only practical evidence of that is the suite giving the same result. Running it first proves the baseline is green, so a later failure belongs to your change rather than to something already broken. Running it after each small step means a failure points at the one transformation just made, which is easy to undo or fix. If you make ten moves and test once, a red suite could come from any of them, and finding which one costs more than the refactoring saved. The deck's cycle ("repeat until the change is localized") is built from these small tested steps.

## Lec 5 — Testability (logged 2026-09-26, deck 03b-testability.pdf + reader Testability, contract material from Design Principles; no in-class notes)

### Q: Define controllability and observability in the deck's words, and give the four things the deck says lower each one.
**Topic:** Controllability and observability  **Lec:** 5  **Type:** recall
**A:** Controllability is the degree to which a test can determine the inputs and state that the code under test depends on. It is lowered by hidden inputs (the clock, randomness), global or shared state, hard-wired dependencies, and preconditions that are hard to set up. Observability is the degree to which a test can inspect the results and effects that the code under test produces. It is lowered by results that are only printed or formatted, intermediate values that are never returned, private state that is never exposed, and effects on external systems.

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
**Topic:** Controllability and observability  **Lec:** 5  **Type:** critique
**A:** (a) All three hurt controllability. `new Date()` is a hidden input (the clock): the answer changes depending on when the test runs. `Math.random()` is a hidden input (randomness): the same loan gives two different fees. `Config.get()` is global or shared state: the test has to reach into a singleton to set the region, and other tests can leave it changed. Observability is fine, because the fee is returned as a value. (b) Take everything the behaviour depends on as parameters, which is the deck's "raised by" line and the reader's most common fix: `lateFee(loan: Loan, now: Date, region: Region, spotCheck: boolean): number`, or pass a clock and a random source as objects. The caller in production supplies the real clock and randomness, and the test supplies fixed values and can assert an exact number.

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
**Topic:** Controllability and observability  **Lec:** 5  **Type:** critique
**A:** (a) Observability. Controllability is fine, since the orders come in as a parameter. The results are only printed and formatted, and the intermediate values (`total`, `avg`) are never returned. A test could only capture stdout and parse a string. (b) Return results as values, which is the deck's fix for observability: extract `summarize(orders): { total: number; avg: number }` and leave a thin `printSummary` that calls it and formats the output. The test asserts on the returned numbers directly. This also exposes a case the old code hid: an empty list gives `NaN` for the average, which a test on `summarize([])` would now catch.

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
**Topic:** Controllability and observability  **Lec:** 5  **Type:** critique
**A:** (a) Controllability: both dependencies are hard-wired, because the class constructs them itself; the database connection string comes from global state (`process.env`); the query uses the database's own clock (`now()`), which is a hidden input; and to get a user into the overdue state a test needs a real Postgres with seeded rows, which is a hard-to-set-up precondition. Observability: the only result is an effect on an external system (email sent over SMTP), and the method returns nothing, so a test cannot see who was reminded. (b) Take the dependencies as constructor parameters typed as small interfaces (`LoanStore`, `Mailer`), and pass the current date in. A test passes in a fake store that returns two known overdue loans and a fake mailer that records each call, then asserts that exactly those two emails were "sent". Returning the list of users reminded would add a second way to observe the result. The reader calls this passing in key dependencies, which lecture 7 formalises as dependency inversion.

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
**Topic:** Testable by design  **Lec:** 5  **Type:** apply
**A:** (a) Given a new account, which is not frozen and has balance 0. When it deposits 50. Then its balance is 50, or at least greater than it was before. (b) Neither `balance` nor `frozen` is visible and `deposit` returns nothing, so there is nothing to assert on: private state that is never exposed, which is an observability problem. Add query methods such as `getBalance()` and `isFrozen()` to the public interface, as the deck added `isHungry()` and `amountEaten()` to `Animal`. They are read-only, so they expose the state the specification already talks about without letting a test or a client change it. Making the fields public would expose them to writes as well and couple clients to the representation. Returning the new balance from `deposit` would also work. (c) A frozen account violates the precondition, so the specification promises nothing about that call. A test of `deposit` should first confirm the precondition holds (as slide 6 checks the animal is hungry), and a "frozen" test is only meaningful if the contract is changed to say what happens, for example that it throws.

### Q: Name the three parts of a CPSC 210-style method specification and the three contract terms the reader's Design Principles chapter maps them to. In the `Animal` example, which clause did slide 6 fold into the EFFECTS line and why does the test begin by asserting `isHungry()`?
**Topic:** Testable by design  **Lec:** 5  **Type:** recall
**A:** REQUIRES, MODIFIES and EFFECTS. The reader calls the comment block a data abstraction that defines the method's contract: preconditions (what the method expects), postconditions (what it provides) and invariants (what must always be true). In `Animal.eat()` the REQUIRES clause says the animal must be hungry. Slide 6 rewrites EFFECTS to start "for a hungry animal only", folding the precondition into the effect. The test asserts `isHungry()` first to show the precondition holds in the Given state, because the postcondition is only promised when it does; it also checks that `amountEaten()` starts at 0 so "has eaten more" has a baseline.

### Q: Name the reader's four testability properties, say which two it calls most important, and explain why it says isolateability without controllability is not useful and why controllability alone is not enough. Which property is least discussed and why?
**Topic:** Controllability and observability  **Lec:** 5  **Type:** recall
**A:** Controllability, observability, isolateability and automatability. Observability and isolateability matter most: can I detect that a fault exists, and can I tell where in the code it is. Isolateability without controllability is not useful because, if you cannot pass in the key dependencies or values that trigger the fault, you never get to see the behaviour, however well isolated the unit is. Controllability alone is not enough because a large, flexible function may let you trigger many behaviours but still be too big, or call too many external dependencies, for you to locate the failure. Automatability is least discussed because it is close to shorthand for code that can be controlled programmatically.

### Q: Sort each item under controllability or observability, and give the fix: (a) a method reads the current user from a global `Session.current`; (b) a function writes its result to `out.csv` and returns nothing; (c) a validator computes an error list, then only returns `true` or `false`; (d) testing the refund path needs an order that is 31 days old; (e) a class keeps a private retry counter that the specification says must reset after a success.
**Topic:** Controllability and observability  **Lec:** 5  **Type:** apply
**A:** (a) Controllability, global or shared state: pass the user in as a parameter. (b) Observability, an effect on an external system: return the rows (or take a writer the test can supply) and keep file writing in a thin outer layer. (c) Observability, an intermediate value never returned: return the error list, since `true`/`false` hides which rule failed. (d) Controllability, a hard-to-set-up precondition, with the clock as the hidden input underneath: take the current date (or the order's age) as a parameter so the test can say "31 days" directly. (e) Observability, private state never exposed: add a read-only query such as `retryCount()`, or make the behaviour it controls observable, so the test can check the reset.

### Q: Give the three steps of the TDD cycle on slide 7 and the deck's three "testability by design" ideas beside it. Why, according to the reader, does writing the test first produce more testable code than writing it after?
**Topic:** Testable by design  **Lec:** 5  **Type:** recall
**A:** The cycle: write a failing test, make the test pass, refactor your code. The three ideas: know what you are building, let the details come from building it, and make the next change cheap. The reader says code usually needs restructuring for testability when a unit takes on more than one responsibility or a feature scatters across the codebase. Writing the test first means the code must be drivable and checkable from the start, so its inputs arrive as parameters and its results come back as values instead of being retrofitted later. The refactor step is where the lecture 4 discipline fits, done on a green suite.

### Q: A reviewer rejects a PR that adds `getInternalQueue()` to a class "just so the tests can see it", and says tests should only use the public interface. The author replies that the deck itself added `isHungry()` to `Animal` for a test. Who is right? Give the test you would apply to decide whether a new accessor is a good change.
**Topic:** Testable by design  **Lec:** 5  **Type:** critique
**A:** It depends on what the accessor exposes. The deck's accessors expose state the specification already promises: EFFECTS says the animal is not hungry and has eaten more, so `isHungry()` and `amountEaten()` let any client, not only the test, check the promised behaviour. That raises observability without leaking the design. `getInternalQueue()` exposes the representation: tests become coupled to how the class works rather than what it promises, so any internal change breaks them, and clients can start depending on it too. The test to apply: does the accessor answer a question the specification talks about, preferably read-only? If yes, add it. If it only exposes an implementation detail, test through the behaviour the queue affects (what gets returned or processed, and in what order) instead, or return that result as a value.
