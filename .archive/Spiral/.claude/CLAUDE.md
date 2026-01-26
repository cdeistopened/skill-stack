# Spiral - The AI Writing Partner

> "A good explanation is hard to vary." — David Deutsch
>
> "Every feature should be perfect. Limit the number of them." — Jack Dorsey

---

## The Hard-to-Vary Core

Spiral does ONE thing: **Extract what you're trying to say and say it in your voice.**

```
Raw Input → [Wizard asks questions] → Substance + Voice + Skill → Output
```

The critical insight: **Substance extraction** is itself a skill. Most people don't *know* what they want to say until someone helps them find it. That's the Skill Wizard.

### Four Irreducible Pillars

| Pillar | What It Is | Why It Can't Be Removed |
|--------|-----------|------------------------|
| **Wizard** | The questioning interface (AskUserQuestion) | Extracts substance, captures voice, surfaces insight. The cybernetic loop. |
| **Substance** | The core insight you're trying to express | Without it, you're just polishing noise |
| **Voice** | Your captured writing style | Without it, you're just ChatGPT. Voice makes output *yours* |
| **Skills** | Modular transformation cartridges | *How* transformations happen. Composable, shareable, improvable |

Remove any one, and the product breaks.

### The Cybernetic Feedback Loop

The Wizard isn't a one-time setup. It's the **primary interaction mode**:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [You record a vibe note / paste rough content]            │
│                     ↓                                       │
│   [Wizard asks: "What's the one thing you want them         │
│    to take away?"]                                          │
│                     ↓                                       │
│   [You clarify / refine / discover]                         │
│                     ↓                                       │
│   [Wizard captures your voice from this exchange]           │
│                     ↓                                       │
│   [Output generated in your voice]                          │
│                     ↓                                       │
│   [Pattern detected: "You keep doing X → Create skill?"]    │
│                     ↓                                       │
│   [Your skills evolve as you evolve]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Each interaction teaches the system. Skills compound. Voice sharpens. Substance gets clearer.

**This is continuous learning embodied.**

---

## Core Philosophy (from Skill Stack)

### Transform, Don't Generate
AI is mediocre at creating from nothing. It excels at **transforming human-generated ideas**.
- "Garbage in, garbage out" BUT "treasure in, treasure out"
- The "Improve Writing" operation is worth more than a thousand generation prompts

### Sourcery > Sorcery
Your unique perspective is the secret ingredient.
- Transcripts, voice memos, rough drafts = diamonds in the rough
- AI polishes; you mine the ore

### The 4S Framework
1. **Source** — Your raw material
2. **Substance** — Your core message
3. **Structure** — The framework that fits your content
4. **Style** — Your unique voice

### Chain of Thought > Single Prompt
Break complex tasks into sequences. Think conversation, not command.

---

## MVP Scope (Phase 1)

### Must Have (Load-Bearing)
- [ ] Voice capture wizard (paste samples → voice profile)
- [ ] Single skill: "Improve Writing" (the universal transformation)
- [ ] Input/output interface (paste source → get transformed output)
- [ ] Voice application to any output

### Should Have (Phase 1.5)
- [ ] 3-5 core skills (Thread, Email, Blog Post, Social, Show Notes)
- [ ] Skill configuration (adjust parameters)
- [ ] Output preview with copy/export

### Won't Have Yet (Phase 2+)
- Social layer / skill sharing
- Proactive suggestions
- Content library / Doodle Reader integration
- Pattern detection → auto skill creation
- Team features
- Notion/Apple Notes integration

---

## Technical Architecture

### Web App Stack
- **Frontend**: React/Next.js (familiar, fast)
- **Backend**: API routes + Claude API
- **Storage**: Supabase (auth + database)
- **State**: Context at voice/session level

### Core Data Structures

```typescript
// The irreducible unit: a Voice
interface Voice {
  id: string;
  name: string;
  samples: string[];         // Original writing samples
  analysis: VoiceAnalysis;   // Extracted patterns
  promptFragment: string;    // The actual prompt component
}

// A Skill is a transformation cartridge
interface Skill {
  id: string;
  name: string;
  description: string;
  inputs: InputType[];       // What it accepts
  outputs: OutputType[];     // What it produces
  instructions: string;      // The SKILL.md content
  checkpoints: string[];     // Quality gates
}

// A Transformation is the core action
interface Transformation {
  source: string;            // Raw input
  voice: Voice;              // Applied voice
  skill: Skill;              // Applied skill
  output: string;            // Result
}
```

### The Prompt Architecture

Every transformation follows this pattern:

```
[System: Skill Instructions]
[System: Voice Profile]
[User: Source Content]
→
[Assistant: Transformed Output]
```

Skills and Voices are **composable** — any voice can combine with any skill.

---

## Design Principles

### From the Design System
1. **Warmth** — Orange brand, serif headlines, friendly copy
2. **Minimalism** — Clean layouts, generous whitespace
3. **Transparency** — Show the user what's happening (no black box)
4. **Focus** — Single primary action per view

### From Deutsch/Dorsey
1. **Each feature must be load-bearing** — If you can remove it without breaking something, remove it
2. **Perfect before plentiful** — 3 perfect skills > 30 mediocre ones
3. **Hard to vary** — Every component should feel necessary

---

## UI Architecture (Minimal)

### Phase 1: Two Screens

**1. Voice Setup (One-Time)**
```
┌─────────────────────────────────────────┐
│                                         │
│   Let's capture your voice              │
│                                         │
│   Paste 2-3 examples of your writing    │
│   ┌───────────────────────────────────┐ │
│   │                                   │ │
│   │  [Your writing here...]           │ │
│   │                                   │ │
│   └───────────────────────────────────┘ │
│                                         │
│   [Analyze My Voice →]                  │
│                                         │
└─────────────────────────────────────────┘
```

**2. Transform (Main Interface)**
```
┌─────────────────────────────────────────┐
│  [Voice: Charlie ▼]  [Skill: Thread ▼]  │
├─────────────────────────────────────────┤
│                                         │
│   SOURCE                                │
│   ┌───────────────────────────────────┐ │
│   │ [Paste your content here...]      │ │
│   └───────────────────────────────────┘ │
│                                         │
│   [Transform →]                         │
│                                         │
│   OUTPUT                                │
│   ┌───────────────────────────────────┐ │
│   │ [Transformed content appears...]  │ │
│   └───────────────────────────────────┘ │
│                                         │
│   [Copy] [Regenerate] [Edit Skill]      │
│                                         │
└─────────────────────────────────────────┘
```

That's it for Phase 1. Two screens. One job.

---

## Skills Library (Launch Set)

### Tier 1: Plug & Play (No Setup)
| Skill | Input | Output | Core Purpose |
|-------|-------|--------|--------------|
| **Improve Writing** | Any text | Polished text | Universal refinement |
| **Thread Maker** | Long-form | Twitter thread | Repurpose for X |
| **Email Draft** | Notes/ideas | Email | Professional communication |

### Tier 2: Light Setup
| Skill | Input | Output | Core Purpose |
|-------|-------|--------|--------------|
| **Voice Analyzer** | Writing samples | Voice profile | Create custom voice |
| **Hook Generator** | Content | Headlines/hooks | Attention-grabbing openers |

---

## What "Perfect" Means

Before adding ANY new feature, these must be true:

1. **Voice accuracy**: User says "this sounds like me" 9/10 times
2. **Transform quality**: Output requires <20% editing
3. **Speed**: <10 seconds for most transformations
4. **Reliability**: Works consistently across content types

---

## Backlog (Prioritized)

### Now (MVP)
- [ ] Voice capture flow
- [ ] Core transform interface
- [ ] 3 launch skills (Improve, Thread, Email)
- [ ] Basic export (copy to clipboard)

### Next (Post-Launch)
- [ ] Skill editor (user can modify instructions)
- [ ] More skills (Blog Post, Social, Show Notes)
- [ ] User accounts + persistence
- [ ] Output history

### Later (If Working)
- [ ] Content library (save sources)
- [ ] Skill sharing (public skills)
- [ ] Proactive suggestions
- [ ] Team features

### Maybe Never (Validate First)
- [ ] Full Doodle Reader integration
- [ ] Native mobile app
- [ ] Notion/Apple Notes sync
- [ ] Auto skill creation

---

## Success Criteria

### Phase 1 Success
- 10 users use it weekly for 4+ weeks
- NPS > 50 among active users
- "Sounds like me" rating > 80%

### Phase 2 Unlock
- Only unlock Phase 2 features after Phase 1 metrics are hit
- Each feature must demonstrate usage before building the next

---

## References

- `Previous conversation/` — Full wireframes, design system, vision docs
- `skill-stack/` — Skills philosophy, wizard patterns, voice matching
- `.claude/skills/` — Root-level skills for guidance

---

*Last updated: 2025-12-30*
