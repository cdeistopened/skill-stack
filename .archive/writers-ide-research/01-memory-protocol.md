# Memory Protocol: CLAUDE.md vs NOW.md

> How the system remembers across sessions without drowning in tokens.

---

## The Two-File Memory Model

Claude Code automatically loads `CLAUDE.md` at session start. This is the foundation. But one file isn't enough for a creative workspace that changes daily.

The solution: split memory into **permanent** and **working** layers.

```
┌────────────────────────────┐     ┌────────────────────────────┐
│       CLAUDE.md            │     │         NOW.md             │
│   (Permanent Memory)       │     │    (Working Memory)        │
├────────────────────────────┤     ├────────────────────────────┤
│ • Project identity         │     │ • Current focus            │
│ • Folder structure         │     │ • Active blockers          │
│ • Conventions that don't   │     │ • In-progress work         │
│   change                   │     │ • Recent decisions         │
│ • Tool configurations      │     │ • Session state            │
│ • Core philosophy          │     │ • Next actions             │
│ • API references           │     │ • Things in flux           │
│                            │     │                            │
│ "What this project IS"     │     │ "Where things are NOW"     │
├────────────────────────────┤     ├────────────────────────────┤
│ Updated: Rarely            │     │ Updated: Every session     │
│ (when patterns shift)      │     │ (via /handoff command)     │
└────────────────────────────┘     └────────────────────────────┘
```

---

## What Goes Where

### CLAUDE.md (Permanent Memory)

Things that define the project's identity and don't change session-to-session:

```markdown
# Project Name

## What This Is
Brief description of the project's purpose.

## Folder Structure
| Folder | Purpose |
|--------|---------|
| content/blog/ | Published posts |
| content/drafts/ | Work in progress |
| .claude/skills/ | Transformation workflows |

## Conventions
- All posts use frontmatter with: title, slug, description, date
- Images go in public/images/thumbnails/
- Skills follow SKILL.md format

## Key Commands
- `npm run sync` - Push content to database
- `npm run dev` - Local development

## References to Load
See NOW.md for current state.
See .claude/references/AUTHOR.md for voice context.
```

### NOW.md (Working Memory)

Things that change constantly - the "working memory" of the project:

```markdown
# NOW - Current State

*Last updated: 2026-01-11*

## Active Focus
Writing the Writer's IDE architecture documentation.

## In Progress
- [ ] Finish orchestration patterns doc
- [ ] Draft future directions

## Recent Decisions
- Decided to split memory into CLAUDE.md + NOW.md pattern
- Chose to put architecture docs in content/drafts/writers-ide/

## Blockers
None currently.

## Next Session
Continue with integration layer documentation.
```

---

## Context Loading Order

When a session starts, context loads in this order:

```
1. CLAUDE.md          ← Auto-loaded by Claude Code
      │
      ▼
2. NOW.md             ← Referenced in CLAUDE.md, loaded next
      │
      ▼
3. Active skill       ← Loaded when invoked (e.g., /podcast-blog-post)
      │
      ▼
4. Corpus query       ← On-demand RAG lookup for related content
      │
      ▼
5. Source material    ← Specific files being worked on
```

This creates a **token-efficient hierarchy**:
- Base context (CLAUDE.md + NOW.md): ~500-1000 tokens
- Skill context: ~1000-3000 tokens per skill
- Corpus queries: Variable, retrieved as needed
- Source material: Only what's actively being transformed

---

## The Handoff Protocol

At session end, the `/handoff` command:

1. Summarizes what was accomplished
2. Updates NOW.md with current state
3. Logs the session to `.claude/sessions/YYYY-MM-DD-topic.md`
4. Identifies any CLAUDE.md updates needed (rare)

This ensures the next session starts with full context of where things left off.

---

## Token Budgeting

The memory protocol is designed to stay light:

| Layer | Typical Size | When Loaded |
|-------|--------------|-------------|
| CLAUDE.md | 500-1000 tokens | Always |
| NOW.md | 200-500 tokens | Always |
| Skill | 1000-3000 tokens | On invocation |
| References | 500-2000 tokens | When needed |
| Corpus results | Variable | Query-based |

Total base context: **~1500 tokens** - leaving plenty of room for actual work.

---

## The Content Index as Mental Map

Beyond CLAUDE.md and NOW.md, the corpus provides a **token-light mental map** of all content:

```
.claude/references/CONTENT_INDEX.md
├── Posts by Topic
│   ├── Core Thesis (5 posts)
│   ├── Prompt Engineering (8 posts)
│   ├── Transcription (4 posts)
│   └── ...
├── Posts by Date (chronological)
└── Key Concepts (glossary)
```

This index can be queried without loading full post content - the agent knows what exists and can dig deeper when needed.

---

## Updating Memory: When and How

### CLAUDE.md Updates (Rare)
Trigger: Folder structure changes, new conventions established, significant patterns shift.

Process: Explicit update, usually noted in session handoff.

### NOW.md Updates (Every Session)
Trigger: End of session via `/handoff`.

Process: Automatic summary of session + next actions.

### Content Index Updates (On Sync)
Trigger: `npm run sync` after new content added.

Process: Script regenerates index from content folder.

### Corpus Updates (On Import)
Trigger: New content in `content/raw/`.

Process: Auto-vectorization pipeline (runs in background).

---

## The Pattern in Practice

A typical session flow:

```
Session Start
├── Claude loads CLAUDE.md (auto)
├── Agent reads NOW.md (per CLAUDE.md instruction)
├── Agent understands: "Working on Writers IDE docs"
│
User Request
├── "Help me write the integrations doc"
├── Agent loads relevant skill if needed
├── Agent queries corpus for related past content
│
Work Happens
├── Documents created/edited
├── Decisions made, captured in chat
│
Session End
├── User: "/handoff"
├── Agent: Updates NOW.md with new state
├── Agent: Logs session to .claude/sessions/
└── Next session will pick up seamlessly
```

---

*This memory protocol is the foundation that makes everything else work. Without persistent context, skills are just prompts and the corpus is just files.*
