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
**A:** "…what a change costs as a system keeps growing." (slide 8). Every unit revisits cost of change at a larger radius: inside a codebase → at its boundaries → across a system and team.

### Q: Quote or closely paraphrase the Hoc & Nguyen-Xuan definition of software engineering used on the slides and in the reader intro.
**Topic:** What SE is  **Lec:** 1  **Type:** recall
**A:** "The process of transforming a mental plan of desired actions for a computer into a representation that can be understood by the computer." Attribution: Jean-Michel Hoc and Anh Nguyen-Xuan.

### Q: List the four ways the 310 view of software differs from the 210 view, and name the one the course treats as the driver of everything else.
**Topic:** What SE is  **Lec:** 1  **Type:** recall
**A:** 210: small code, single-version, solo, one prompt. 310: large codebase, multi-version, collaborative, changing requirements. Changing requirements is the driver — it is what makes cost of change the central concern; the course calls the 310 view "socio-technical".

### Q: The reader distinguishes "code" from "software". Give the three adjectives for each, and say why the distinction motivates Analytical Code Design.
**Topic:** What SE is  **Lec:** 1  **Type:** recall
**A:** Code: short, isolated, run once (scripts, assignments). Software: large, highly connected, longstanding. Software therefore has to be easy to evolve, maintain and test, so you need measurable ways to compare two designs of the same thing and articulate the trade-offs — that is what "analytical" code design means.

### Q: Per the reader, programming is only one of the tasks of software engineering. Name the task programming corresponds to and list the others.
**Topic:** What SE is  **Lec:** 1  **Type:** recall
**A:** Programming = the *build* task. The full list: specify, invent, design, build, validate, deploy, maintain, research, improve. SE covers work before building (specification, design) and after (deployment, maintenance, evolution).

### Q: Name the three "fluencies" (Holmes 2026) and give a one-line definition of each.
**Topic:** Three fluencies & roadmap  **Lec:** 1  **Type:** recall
**A:** Decomposition fluency: breaking problems apart and critically evaluating how others have. Requirements fluency: tracing design and implementation decisions back to their requirements. Validation fluency: confirming an implementation realises its design today and will keep affording change as needs evolve.

### Q: In the slides' diagram of traditional practice → source-code assistance → vibe coding, what changes along the arrow, and what is the conclusion about what engineers "need to know"?
**Topic:** Three fluencies & roadmap  **Lec:** 1  **Type:** recall
**A:** Increasing abstraction: the human input moves from `<requirements, code>` → `<natural-language requirements, code>` → `<natural-language requirements, existing system>` producing an executable feature, with "validation?" left open. Conclusion: engineers need to know requirements, design, and validation of code (not just how to write and read source code).

### Q: The semester roadmap frames the course as "cost of change at bigger radii". Give the three scales, their week ranges, and the question each asks.
**Topic:** Three fluencies & roadmap  **Lec:** 1  **Type:** recall
**A:** Inside a codebase you own (wks 2–5): why is this change expensive here and cheap there? At its boundaries (wks 6–7): where should the boundaries be, and what happens once you publish one? Across a system and team (wks 8–13): how does a team change one codebase without breaking each other?

### Q: State the four course learning objectives.
**Topic:** Three fluencies & roadmap  **Lec:** 1  **Type:** recall
**A:** (1) Reason about how a codebase's structure influences the cost of changing it. (2) Use abstraction to make changing a system cheaper at increasingly larger scales. (3) Elicit, deconstruct, and refine requirements, and write specifications precise enough to check. (4) Evaluate the socio-technical trade-offs in collaborative software engineering processes.

### Q: Your internship was "clients changing requirements all the time". Using the lecture's framing, say why the course thinks that experience is the *problem statement* rather than the *skill* — what does it claim you still need?
**Topic:** What SE is  **Lec:** 1  **Type:** critique
**A:** Living with changing requirements is the 310 condition (socio-technical, multi-version, collaborative), not the competence. The claimed skill is judging *why* a given change is expensive in one structure and cheap in another and saying so — the "judgment to know whether a decision or implementation was right, and the ability to say why" (slide 13). Units 1–2 give the vocabulary for that judgment: magnitude vs footprint, cohesion/connascence, LSP, testability, patterns, API change severity.

### Q: Name the fluency from its definition: (a) "tracing design and implementation decisions back to their requirements" (b) "confirming an implementation realises its design today and will keep affording change as needs evolve" (c) "breaking problems apart and critically evaluating how others have".
**Topic:** Three fluencies & roadmap  **Lec:** 1  **Type:** recall
**A:** (a) Requirements fluency (b) Validation fluency (c) Decomposition fluency. (Holmes 2026.)

### Q: Fill the key nouns in the four learning objectives: (1) how a codebase's ____ influences the ____ of changing it; (2) use ____ to make changing a system cheaper at ____ scales; (3) elicit, deconstruct and refine ____, and write ____ precise enough to check; (4) evaluate the ____ trade-offs in ____ software engineering processes.
**Topic:** Three fluencies & roadmap  **Lec:** 1  **Type:** recall
**A:** (1) structure, cost (2) abstraction, increasingly larger (3) requirements, specifications (4) socio-technical, collaborative. Hook: change cost · abstraction · requirements · socio-technical.

### Q: The vibe-coding diagram writes each stage as a pair of human inputs. Write the three pairs in order, say which element survives in all three, and what that implies for the fluencies.
**Topic:** Three fluencies & roadmap  **Lec:** 1  **Type:** recall
**A:** `<requirements, code>` → `<natural-language requirements, code>` → `<natural-language requirements, existing system>`. Requirements appear in every stage (only their form changes, to natural language); code drops out of the human's hands. So requirements fluency and validation fluency (the open "validation?" on the last stage) are what remain the engineer's job when source-code writing is automated.
