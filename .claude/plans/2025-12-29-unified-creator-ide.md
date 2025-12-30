---
type: vision
status: routed
priority: low
project: skill-stack
created: 2025-12-29
routed_to: "[[skill-stack/.claude/CLAUDE]]"
---

# Vision: Unified Creator IDE

## The Problem
Current workflow requires switching between:
- **Obsidian** - Markdown knowledge management (but hides dot-folders)
- **VS Code/Cursor** - Code editing, git, file management (but not optimized for notes)
- **Claude Code** - AI conversations with context (but terminal-based)

## The Vision
A single application combining:

### From Obsidian
- Wikilinks and backlinks
- Graph view
- Progressive disclosure
- Mobile sync
- Plugin ecosystem

### From VS Code
- Full file tree (including dot-folders)
- Git integration
- Multi-file editing
- Extensions/plugins

### From Claude Code
- AI conversation pane
- Context-aware responses
- Skills/commands system
- Agentic workflows

Probably simplest to build as an Obsidian plugin.

## Why This Matters
The "AI skill stacking" thesis requires seamless tool integration. Currently:
- `.claude/` folders invisible in Obsidian = broken workflow
- Context switching = friction = lost momentum
- No tool designed for the "creator who codes" persona

## Potential Approaches

### Short-term (Now)
- Hybrid workarounds (dual-location files)
- Obsidian community plugins?
- Cursor with Anthropic extension (current setup)

### Medium-term
- Electron app wrapping existing tools?
- Obsidian plugin that exposes dot-folders?
- Fork of an existing editor?

### Long-term
- Purpose-built application
- Could be a skill-stack flagship product
- Open source or commercial?

## Related Projects
- [[skill-stack]] - This tool embodies the thesis
- [[Doodle Docs]] - Some tooling overlap (PDF, transcription)
- Life OS - Primary use case and testing ground

## Next Action
Research existing solutions (Logseq? Notion? Anytype?) before building

