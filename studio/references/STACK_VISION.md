# Stack Vision: The Architecture

> An IDE for writers and content creators, with Claude Code as the orchestrating agent.

This document preserves the core architectural thinking from the Spiral/Writer's IDE research. For current strategy and roadmap, see [MASTER_STRATEGY.md](../plans/MASTER_STRATEGY.md).

---

## The Core Thesis

Model intelligence is no longer the bottleneck. Context engineering is.

The difference between a frustrating AI interaction and a transformative one isn't the model - it's the *context* surrounding it. Stack solves three problems:

1. **Memory that persists across sessions**
2. **Skills that encode your specific workflows**
3. **Integrations that eliminate friction between capture and publish**

This isn't "just use Claude with better prompts." It's a persistent workspace where your past work informs your future work, where your voice is codified and applied automatically, and where the path from raw transcript to published asset has zero manual steps.

---

## The Sparse Theory

> Stack is a wizard that asks you what you're trying to say, remembers how you say it, and helps you say it better - one skill at a time.

### Four Irreducible Pillars

| Pillar | What It Is |
|--------|------------|
| **Wizard** | Substance extraction via questioning |
| **Substance** | The core insight being expressed |
| **Voice** | Captured writing style (the differentiator) |
| **Skills** | Modular transformation cartridges |

---

## The 4S Framework as System Architecture

```
┌──────────────┐         ┌──────────────┐
│   1. SOURCE  │         │ 2. SUBSTANCE │
│              │         │              │
│  content/raw │ ──────► │   corpus/    │
│  Imports:    │         │   Content    │
│  - Podcasts  │  Auto   │   memory     │
│  - Notes     │  RAG    │   (what you  │
│  - Streams   │  index  │   know)      │
└──────────────┘         └──────────────┘
       │                        │
       ▼                        ▼
┌──────────────┐         ┌──────────────┐
│ 3. STRUCTURE │         │   4. STYLE   │
│              │         │              │
│  CLAUDE.md   │         │  .claude/    │
│  NOW.md      │         │  skills/     │
│  (how things │         │  (your voice │
│   work here) │         │   codified)  │
└──────────────┘         └──────────────┘
       │                        │
       └────────────┬───────────┘
                    ▼
          ┌──────────────────┐
          │   OUTPUT ASSETS  │
          │   Blog, social,  │
          │   newsletter     │
          └──────────────────┘
```

**Source** = Your raw material (transcripts, voice memos, notes, imports)

**Substance** = What you actually know, indexed and queryable (the corpus/RAG layer)

**Structure** = How your workspace operates (CLAUDE.md permanent memory, NOW.md working state)

**Style** = Your voice and transformation patterns (skills folder)

---

## The Skill System

### Skill Hierarchy

```
.claude/skills/
│
├── CORE (always available)
│   ├── writing-style/SKILL.md       ← Anti-AI patterns, prose rules
│   ├── human-writing/SKILL.md       ← Combined humanization system
│   └── brand-identity.md            ← Who you are, what you stand for
│
├── WIZARDS (interactive setup, create other skills)
│   ├── voice-matching-wizard/       ← Create voice skill from samples
│   ├── brand-identity-wizard/       ← Define brand through interview
│   └── skill-creator/               ← Meta-skill for making skills
│
├── FORMAT-SPECIFIC (content type transformations)
│   ├── podcast-blog-post-creator/   ← Transcript → blog post
│   ├── podcast-production/          ← Full episode workflow
│   ├── social-content-creation/     ← 180+ templates
│   ├── newsletter-writer/           ← Your newsletter format
│   └── hook-and-headline-writing/   ← Attention formulas
│
└── TOOLS (utility transformations)
    ├── image-prompt-generator/      ← Gemini image generation
    ├── transcript-polisher/         ← Clean raw audio
    └── seo-research/                ← DataForSEO integration
```

### Skill Anatomy

```markdown
# Skill Name

> One-line description of what this transforms.

## When to Use
- Trigger condition 1
- Trigger condition 2
- NOT for: anti-patterns

## The Process

### Step 1: [Name]
What happens in this step.

### Checkpoint: [Decision Point]
Pause here for human review if...

## Voice & Style Rules
- Rule 1
- Rule 2

## Examples

### Before
[Raw input example]

### After
[Transformed output example]
```

### Wizard Tiers

| Tier | Time | Complexity | Example |
|------|------|------------|---------|
| 1: Plug & Play | 5 min | Minimal customization | Anti-AI writing |
| 2: Light Setup | 15-20 min | Some questions | Newsletter format |
| 3: Full Setup | 30+ min | Deep customization, APIs | Voice matching |

### Skill Composition

Skills chain together:

```
User: "Turn this podcast into a full content kit"

Orchestrator loads sequence:
1. transcript-polisher      → Clean raw transcript
2. podcast-blog-post        → Create blog post
3. social-content-creation  → Generate social variants
4. image-prompt-generator   → Create thumbnail
5. newsletter-writer        → Draft newsletter section
```

---

## Ralph Loops: Orchestration Pattern

Ralph Loops are an autonomous iteration methodology. The name comes from Ralph Wiggum - earnest, persistent, keeps trying. The loop is "dumb," but through persistence and backpressure, it produces intelligent results.

### The Fundamental Insight

Instead of one long conversation (which degrades as context fills), run many short, focused iterations. Each iteration:

1. Starts fresh with clean context
2. Reads current state from disk
3. Does one thing well
4. Saves work to disk
5. Exits

### Why Fresh Context Matters

LLMs have 200K+ token context, but the "smart zone" is roughly 40-60% of capacity. As context fills, reasoning quality degrades.

Ralph sidesteps this. Iteration 500 is just as sharp as iteration 1.

### The Judge Panel: Writing's Backpressure

Without backpressure, Ralph produces garbage. The Judge Panel provides automated quality gates.

**Tier 1 - Foundations (blocking, must pass):**
1. **Accuracy Checker** - Are the facts right?
2. **Human Detector** - Does it read human?

**Tier 2 - Polish (parallel, blocking):**
- **Reader Advocate** - Would I keep reading?
- **Voice Guardian** - Does it sound like you?

**Advisory (non-blocking):**
- **SEO Advisor** - Keywords, structure

### Human Detector Patterns

The most important gate. Looks for:
- AI tell phrases ("It's important to note...", "comprehensive guide...")
- Structural tells (every paragraph same length)
- Hedging stacks ("may potentially possibly")
- List addiction where prose belongs
- Absence of opinion or rough edges

Passing looks like: reads like someone wrote it in one sitting with coffee, has a point of view, varied sentence length.

### The Loop Mechanics

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────┐                                                │
│  │ Draft Mode  │ ← picks task from plan                         │
│  │             │ ← does targeted revision                       │
│  │             │ ← saves new version                            │
│  └──────┬──────┘                                                │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ Judge Mode  │ ← runs Tier 1 (Accuracy, Human)                │
│  │             │                                                │
│  │   FAIL? ────┼──► back to Draft Mode ─────────────────────────┤
│  │             │                                                │
│  │   PASS ─────┼──► runs Tier 2 (Reader, Voice)                 │
│  │             │                                                │
│  │   ALL PASS? ┼──► ship to output/ ───► EXIT                   │
│  │             │                                                │
│  │   FAIL? ────┼──► back to Draft Mode ─────────────────────────┤
│  └─────────────┘                                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Principles

**Let Ralph Ralph** - Trust the loop to self-correct. Your job is environment and constraints, not micromanagement.

**Stay Outside the Loop** - Observe and tune. When Ralph fails in specific ways, add guardrails.

**The Plan is Disposable** - Wrong trajectory? Throw out the plan and regenerate.

**Simplicity Wins** - Verbose prompts degrade determinism. Keep it simple.

---

## The Moat Question

Skills are markdown files - infinitely copyable. Where's the defensibility?

The moat isn't the skills themselves. It's:

1. **Refinement data** - Which wizard questions work, which skill combinations succeed
2. **Personal corpus** - Your indexed content is unique to you
3. **Voice codification** - Your specific voice skill, trained on your samples
4. **Workflow muscle memory** - The habits you build using this system compound

The product isn't the software. It's the *capability* the software helps you build.

### Network Effects (Where They Could Live)

- Wizard refinement data (which questions work)
- Collaborative filtering ("writers like you")
- Remix chains and attribution
- Skill usage patterns

### What Has No Moat

- Skills (copyable markdown)
- Voice profiles (per-user, private)
- Philosophy (already public)

---

## The Real-World Positioning

The AI content space is hypercompetitive. Everyone has access to the same models. The marginal cost of "content" approaches zero.

### Two Losing Strategies

1. **Compete on pure AI optimization** - Racing to the bottom
2. **Compete in the Content™ red ocean** - Fighting infinite supply

### The Winning Strategy

**Go where AI intersects the real world.**

The most defensible content businesses are:
- **Niche** - Specific enough that general AI can't compete on depth
- **Local** - Tied to physical places, relationships, communities
- **Real-world integrated** - Connected to services, products, action

```
CONTENT ALONE                    CONTENT + REAL WORLD
(Commoditized)                   (Defensible)
────────────────                 ────────────────────
"AI tips newsletter"             Local rural newsletter that
                                 reviews real businesses

"Podcast about health"           Practitioner with clinic
                                 sharing case studies

"YouTube fitness channel"        Coach with in-person
                                 retreats and local clients
```

The content engine amplifies what you do in the world. It doesn't replace having something to say.

---

## Traps to Avoid

1. Building for imagined users vs. real demand
2. Comprehensiveness over sparse clarity
3. Social layer fantasy before individual power works

---

## Source Documents

This consolidates learnings from:
- `studio/drafts/writers-ide/` (full architecture docs)
- `studio/drafts/writers-ide/pkm-research/` (PKM course notes)
- Spiral oracle sessions (archived)

For current strategy: [MASTER_STRATEGY.md](../plans/MASTER_STRATEGY.md)
For identity/voice: [IDENTITY.md](IDENTITY.md)

---

*Last updated: 2026-01-24*
