# CPSC310 — Topic Ledger

Every topic gets a row here and one in `ledger.md`. Its grade and next review live only in the ledger, where the
quiz scripts own them. The Topic here starts with the words of the ledger topic, so the site's Topics tab can find them.

| # | Topic | Lec | Added | Notes |
|---|-------|-----|-------|-------|
| 1 | What SE is — "managing what a change costs" · changing requirements as the driver · code vs software · analytical code design | 1 | 2026-09-11 | reader: Intro + ACD intro |
| 2 | Three fluencies (decomposition · requirements · validation) | 1 | 2026-09-11 | reader intro; roadmap/objectives pruned 2026-09-14 |
| 3 | Lab 1 HTTP & PUT — status codes 200/201/204/400/404/422 · 400 vs 422 · PUT idempotence vs POST | Lab 1 | 2026-09-14 | PrairieLearn LAB01.1–3 |
| 4 | Lab 1 request path & async — route/handler/path param/middleware · req vs res · validator critique (repeated blocks, strings untied to the spec) · event loop, async propagation, missing await | Lab 1 | 2026-09-14 | PrairieLearn LAB01.3–6 |
| 5 | Coupling & connascence — coupling axes (degree · locality · strength) · five connascence types (name/type/value/position/algorithm), increasing cost of change · addressing coupling (cut interfaces, cut distance, weaken connascence) | 2 | 2026-09-16 | reader: Change Difficulty |
| 6 | Cohesion & bindings — the deck's three bindings (data · logic · order; the reader's prose says timing) · low cohesion's difficulty (reading unrelated code) and risk (edits hit unrelated features) · Util box vs one controller per feature · a statement with no binding is the extraction candidate · reader's tell: a field used by few methods | 3 | 2026-09-17 | reader: Change Difficulty (cohesion section) |
| 7 | Refactoring — predictable, meaning-preserving transformation · reader's four steps vs deck's six (tests before and after) · don't refactor when tests fail, when rewriting, near deadlines, while fixing a bug · opportunistic timeline · rule of three · technical debt triggers · Fowler's catalogue · Invoice getOwing and IParser examples · Parkboard FEAT-0002 v1 vs v2 | 3 | 2026-09-17 | reader: Refactoring |
| 8 | Code smells (feature envy and the Law of Demeter · magic values and connascence of value · almost-duplicate code and connascence of algorithm · pull up and template method) | 4 | 2026-09-26 | reader: Refactoring (the named smells are deck only) |
| 9 | Emergent design and technical debt (three signs a change is hard · three abstractions to introduce · debt as interest · not all debt is bad · refactoring timeline · tests before and after every step) | 4 | 2026-09-26 | reader: Refactoring |
| 10 | Controllability and observability (deck definitions · four causes lowering each · parameters in, values out · reader's four properties incl. isolateability and automatability) | 5 | 2026-09-26 | reader: Testability |
| 11 | Testable by design (black-box Given/When/Then first · exposing promised state with read-only queries · REQUIRES/EFFECTS contract · TDD red, green, refactor) | 5 | 2026-09-26 | reader: Testability; Design Principles (contracts) |
| 12 | Test doubles and LSP substitutability (stub controls what comes back, spy records what goes out · DIP makes doubles possible · double only an uncontrollable, unobservable, or unsafe-or-slow dependency, otherwise use the real thing · LSP methods rule: preconditions not strengthened, postconditions not weakened · a double keeps the contract, not just the shape · three costs of doubles) | 6–7 | 2026-10-01 | reader: Testability & Test Doubles, Design Principles; lec 6 deck still to log |
| 13 | Equivalence class partitioning (equivalence class · input domain narrowed by preconditions, valid vs invalid · output range by postconditions, normal vs error · one value per class, one value can cover both views · boundary pair on each side of every edge · when input and output views diverge) | 7 | 2026-10-01 | reader: Blackbox Testing |
| 14 | Strong test suites and coverage (four properties of a strong suite · six-step build order, spec tests only test the spec · line, statement, branch, path coverage · four limits of coverage · reader's 67/50/25 example) | 7 | 2026-10-01 | reader: Glassbox Testing |
| 15 | Design patterns I: Adapter and Composite (four-step analysis: change, pain, mechanism, cost · scattered is coupling, tangled is cohesion · mechanism from abstraction, obliviousness, trigger · when patterns help or hurt · Adapter: one interface per client, gain in degree · Composite: component, leaf, composite; cheap new node, costly new operation) | 8 | 2026-10-06 | reader: Design Patterns |
| 16 | Design patterns II: Decorator (adds behaviour to one object at run time, not to the class · a decorator is a component and has a component · the caller asks the outermost wrapper and each wrapper changes the answer of what it wraps · costs: one class per add-on, order changes the result, long chains, identity and instanceof · java.io streams · composition over inheritance · Adapter changes the interface, Decorator the behaviour, Composite holds many) | 9 | 2026-10-08 | reader: Design Patterns (Decorator, Composite); deck 05b recaps Composite from lec 8 |

## Look-alikes

Topics that are easy to mix up. When a quiz picks a question from one, a question from its look-alike comes right after it.

| Topic | Look-alike | Why they get confused |
|---|---|---|
| Coupling & connascence | Cohesion & bindings | Coupling is about the ties between units and should be low, while cohesion is about how well the code inside one unit belongs together and should be high, and the deck gives each its own difficulty and risk. |
| Controllability and observability | Test doubles and LSP substitutability | A stub raises controllability by fixing what a dependency returns, while a spy raises observability by recording what the code sends out, so which double fixes which axis gets swapped. |
| Code smells | Coupling & connascence | A magic value is connascence of value and almost-duplicate code is connascence of algorithm, so the same fragment can be asked about as a smell or as a connascence type and the names get swapped. |
| Refactoring | Emergent design and technical debt | Both refactoring lectures cover technical debt and when not to refactor, and only lecture 3's list has the close deadline, so the two lists blur into one with an item missing. |
| Equivalence class partitioning | Strong test suites and coverage | Partitioning chooses test values from the spec without reading the code, a black-box method, while coverage measures how much of the code the tests run, a glass-box one, and both are used to judge whether a suite is strong. |
| Design patterns II: Decorator | Design patterns I: Adapter and Composite | All three are structural wrappers behind an interface. Adapter changes the interface and keeps the behaviour, Decorator keeps the interface and changes the behaviour, and Composite keeps the interface and holds many components in a tree, so a fragment with one wrapped object can be read as any of the three. |
