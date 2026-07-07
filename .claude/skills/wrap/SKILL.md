---
name: wrap
description: Session-end memory discipline. Detects which projects were touched, writes updates to WORKBENCH.md (volatile state) + skills + persistent memory, and proposes CLAUDE.md edits. Two-tier — obvious low-blast-radius writes are applied automatically and reported; evergreen/destructive changes ask first. Use when the user says "/wrap", "wrap up", "end of session", "let's close out", or when the session is clearly winding down.
---

# /wrap — Session Wrap

Close out a working session by writing what was decided, shipped, and learned into the right file, so the next session doesn't start cold.

An agent's output is cheap; its amnesia is expensive. Every session that ends without a wrap is a session your setup partly forgets — the workaround gets rediscovered next week, the decision gets relitigated next month. Memory discipline compounds; generation does not.

## The Four Layers

Memory is layered. `/wrap` updates all four:

1. **WORKBENCH.md** (volatile) — current state, blockers, recent decisions, next steps. One per project, at the project root. Create it if a project deserves one and doesn't have it.
2. **CLAUDE.md** (evergreen) — who/what/why, where things live. Updated only when a decision changes a durable fact (tech stack, file location, people, rules).
3. **Skills** (`.claude/skills/<skill>/`) — capabilities the agent reuses across sessions. Bug fixes, new patterns, scope clarifications, and reusable scripts surfaced this session belong here.
4. **Persistent memory** (your agent's cross-session memory directory) — learnings that apply beyond one project AND don't fit cleanly inside any single skill. Keep an index file with one line per memory.

Don't write duplicates across layers. The routing decision tree:

- Did a **fact change about a project** (status, who, what's next)? → WORKBENCH.
- Did an **evergreen project fact change** (file moved, role changed, rule emerged)? → CLAUDE.md.
- Did a **specific skill misfire, get extended, or develop a new known-good pattern**? → That skill's SKILL.md.
- Is the learning **cross-skill / cross-project / about an external service or SDK**? → Persistent memory.

## Write policy — two tiers

Don't ask y/n for every file touch. Sort each write by blast radius:

**AUTO-WRITE (apply immediately, report in the recap):**
- WORKBENCH.md updates — volatile by design, dated, easily reverted.
- New persistent-memory entries + their one-line index entries.
- **Additive** skill patches that record a session-validated rule in the section it most affects.

**ASK FIRST (present a diff, wait for y/skip/edit):**
- Any CLAUDE.md edit — evergreen, loads into every future session.
- Deleting or rewriting existing content anywhere.
- Skill frontmatter/`description` changes — they alter triggering for every future session.
- Creating a brand-new skill.
- Anything that contradicts existing content — that's drift; surface it, don't overwrite it.

The recap must list every auto-write with its file path, so a bad call is one click to inspect and revert. Auto-write is a default, not a mandate — when genuinely unsure which tier applies, ask.

## Flow

### 1. Detect scope

Run `git status --short` and `git log --since="8 hours ago" --pretty=format:"%h %s"` to see what changed. Read the conversation to identify which projects were touched and what was decided.

Report: **"You worked on {projects}. Major themes: {themes}."**

Also sweep for **open decisions from prior sessions**: scan the touched projects' WORKBENCH open threads for loops this session should have moved. Resolved? Update the entry to the decided fact, dated. Still open? Say so explicitly in the recap ("Still pending after this session: X"). Proposals rot into assumed fact if nothing forces them to resolve — a note that says "the method is X" when X was never decided is the highest-cost failure of this whole system.

### 2. WORKBENCH updates (each touched project)

- Move items from "Now" → "Recent Decisions" (dated) when shipped. Record the **why** with the decision — diffs show *what*; only the session remembers *why*, and it's the first thing lost.
- Capture **dead ends**: approaches tried and failed, and why. This is the least recoverable information a session produces; without it the next session re-walks the same trap.
- Add new blockers. Update "Next Session" with today's open loops.

### 3. CLAUDE.md updates (only if evergreen facts changed)

A file moved, a role changed, a stack decision was made, a rule emerged. Don't put status ("working on X now") in CLAUDE.md — that belongs in WORKBENCH. Always ASK FIRST with a diff.

### 4. Skill improvements (the highest-leverage step)

Skill edits compound across every future session, so run this scan every wrap and state the result — either ≥1 concrete edit, or one line: "Skill scan: nothing misfired or grew this session." Ask: which skills did I invoke, which *would have* triggered with a better description, which workarounds did I write that belong inside a skill?

Three signals a skill needs an update:
1. **Its documented pattern failed under current conditions** (API changed shape, schema drifted). Document the gotcha.
2. **You wrote 50+ lines inline that solved a skill-shaped problem.** Move it into the skill.
3. **A skill claimed it could do X but cannot.** Add a "What this cannot do" section.

If a reusable playbook emerged and no skill owns it, propose a **new skill**, not just a memory.

### 5. Persistent memory (final sweep)

Whatever's left over — cross-skill insights, vendor/SDK gotchas, validated preferences — goes to persistent memory. Update existing entries rather than duplicating; never save what the repo already records (CLAUDE.md, WORKBENCH, git history).

**Write each memory's description as the future search query.** Recall is keyword-driven: use the literal words future-you would type when the memory is needed ("two Descript exports," "cut list" — never "video editing helper"). Front-load tool names, file paths, error strings. Test: if I searched the phrase a future session would use, would this match?

### 6. Recap

- **Wrote:** N WORKBENCH updates, M CLAUDE.md edits, K memory entries (each with path).
- **Next session picks up:** the top 1–3 items.
- **Commit suggestion:** offer to stage + commit the doc changes, or skip.

## Edge cases

- **Multi-project sessions:** loop per project; don't bundle into one giant entry.
- **No-code sessions (pure writing/thinking):** still wrap — conversation produces decisions worth capturing.
- **Pure execution sessions (no decisions):** one dated line in WORKBENCH may be all. If nothing novel, offer to skip.
