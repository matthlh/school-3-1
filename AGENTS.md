# Codex entry point

This workspace has one set of rules and one copy of every script, shared by Claude Code and Codex (2026-11-06).

- **Read `CLAUDE.md` in full before anything else, every session, and follow it.** It is the rulebook for this
  workspace. It is too long to load on its own (over 32 KB), so open it with a command, in parts if needed. Where it
  says Claude or "I", it means you.
- **Skills:** `.agents/skills/` holds links to `.claude/skills/`, so the quiz-me, morning-check and fetch skills you see
  are the same files Claude runs. Their scripts live under `.claude/skills/<skill>/scripts/`; run them from there.
  Never copy a skill or script into `.agents/`: a copy drifts the day either side changes.
- **Tools you may not have:** the skills mention Claude-in-Chrome, the Artifact tool, ArtifactData and Things3 MCP
  steps. When a step needs a tool you lack, skip that step and say so in one line. Never sign in to anything.
- **Memory:** Claude's notes about Matt live in
  `~/.claude/projects/-Users-matthe-Documents-CodingProjects-School-3-1/memory/` (`MEMORY.md` is the index). Read
  the index when a question depends on his preferences.
