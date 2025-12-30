---
type: handoff
status: routed
priority: medium
project: skill-stack
created: 2025-12-29
routed_to: "[[skill-stack/.claude/CLAUDE]]"
---

# Scope (Un)Authorized Project

## What
Define the scope for unauthorized creator guides - sits at nexus of Doodle Docs (tools) and skill-stack (content).

## Decision Made
Nest the folder inside skill-stack for now (it's primarily a content/skills project, tools come from Doodle).

## Needs
- Deep context dive into skill-stack and Doodle Docs
- Define MVP: which creator? which topic?
- Pipeline: scrape → compile → quote → link back

## Example Output
"Everything Dan Koe has written on building a personal brand"

## Next Action
Create `skill-stack/unauthorized/` folder with initial scope doc
