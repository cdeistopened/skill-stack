# Continual Learning in Claude Code with Skills

## The Core Problem

Traditional AI agent development is a grind:
1. Write system prompt
2. Add rules/constraints
3. Test → find edge cases
4. Manually encode fixes
5. Repeat forever

**The agent never learns on its own.** Every insight requires manual encoding.

---

## The Solution: Skills That Learn

Skills aren't just instructions—they're **persistent memory that compounds**.

The key unlock most people miss: **Claude can read AND write to skills.** The model improves them every session.

---

## How Skills Work

### Structure
```
/skills/
  └── my-skill/
      └── SKILL.md      ← Required
      └── scripts/      ← Optional, loaded on demand
      └── references/   ← Optional, loaded on demand
```

### Progressive Disclosure
1. Claude loads only skill **names + descriptions** into context
2. Matches descriptions to current task
3. Asks confirmation before loading full skill
4. Only then loads the complete SKILL.md + assets

**Result**: Minimal token usage until a skill is actually needed.

### Where to Put Them
- **Root level** (~/.claude/skills/): Available everywhere
- **Project level**: Shared via repo, inherited by teammates
- **Plugin**: Shareable package with skills + MCP servers + hooks

---

## The Learning Loop

### Setup
1. Create a `/retrospective` slash command (or encode it in claude.md to run automatically)
2. At session end, Claude:
   - Reads entire conversation
   - Extracts what worked + what failed
   - Updates the relevant SKILL.md files
   - Optionally opens a PR if skills are in a registry

### Why Document Failures
New sessions start fresh—Claude doesn't remember what went wrong before.

Failures are counterintuitive to document in software, but LLMs are non-deterministic. Showing where things go off the rails **prevents repeating mistakes**.

---

## Why This Matters (Robert Nishihara, CEO of Anyscale)

> "The thing that excites me about Anthropic's skills is it provides a step towards continual learning. Rather than continuously updating model weights, agents can continuously add new skills."

### Benefits of Knowledge Outside Model Weights
- **Interpretable**: Just read the skills
- **Correctable**: Edit plain text when something's wrong
- **Data efficient**: In-context learning without retraining
- **Shareable**: Pass to teammates, publish to registries

> "Right now, the work that goes into reasoning is largely discarded after a task is performed."

Skills let you **capture that reasoning** so it compounds.

---

## Getting Started

1. Check [Anthropic's skills repo](https://github.com/anthropics/skills) for examples (frontend design, web app testing, etc.)
2. Start with one personal skill for something you do repeatedly
3. Write it in natural language, equip with tools
4. Add a retrospective trigger to update it over time

**The flywheel**: Every session's reasoning → captured in skills → better future sessions → more learnings → better skills.

---

## Key Insight

Skills are **persistent team memory**. When you share a repo with project-level skills, teammates inherit everything Claude has learned about that codebase. The knowledge transfers without any onboarding.