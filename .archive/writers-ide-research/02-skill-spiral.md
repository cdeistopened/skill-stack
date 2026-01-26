# The Skill Spiral: Modular Transformation Cartridges

> Skills are to writing what functions are to code - reusable, composable, shareable.

---

## What Is a Skill?

A skill is a markdown file that encodes a specific transformation workflow. It contains:

1. **When to use it** - The trigger conditions
2. **How it works** - The step-by-step process
3. **Voice/style rules** - Output constraints
4. **Examples** - Before/after demonstrations
5. **Checkpoints** - Where human review is needed

Skills are loaded on demand. They're not prompts you paste - they're context that shapes how the agent approaches a task.

---

## The Skill Hierarchy

```
.claude/skills/
│
├── CORE (referenced in CLAUDE.md, always available)
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
│   ├── hook-and-headline-writing/   ← Attention formulas
│   └── cold-open-creator/           ← 25-35 second hooks
│
└── TOOLS (utility transformations)
    ├── image-prompt-generator/      ← Gemini image generation
    ├── transcript-polisher/         ← Clean raw audio
    ├── youtube-title-creator/       ← High-CTR titles
    └── seo-research/                ← DataForSEO integration
```

---

## Skill Anatomy

A well-structured skill follows this pattern:

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

### Step 2: [Name]
What happens next.

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

## Anti-Patterns
- Don't do X
- Avoid Y
```

---

## The Wizard Pattern

Wizards are special skills that create other skills through conversation. Instead of forms, they use branching questions.

```
User: /voice-matching-wizard

Wizard: I'll help you create a custom voice skill.
        First, do you have writing samples to analyze?
        
        [Yes, I have samples] → Branch A
        [No, start from scratch] → Branch B

Branch A:
        Great. Share 2-3 pieces that represent your best writing.
        I'll analyze them for patterns.
        
        [User shares samples]
        
        Analyzing... I found these patterns:
        - Sentence rhythm: Mix of long flowing + short punches
        - Signature moves: Aphoristic openings, contrarian hooks
        - Vocabulary: Literary references, concrete verbs
        
        Does this capture your voice? What's missing?
        
        [Iterate until accurate]
        
        → Generate voice-style.md skill
```

### Wizard Tiers

| Tier | Time | Complexity | Example |
|------|------|------------|---------|
| 1: Plug & Play | 5 min | Minimal customization | Anti-AI writing |
| 2: Light Setup | 15-20 min | Some questions | Newsletter format |
| 3: Full Setup | 30+ min | Deep customization, may need APIs | Voice matching |

---

## Skill Composition

Skills can chain together. A complex workflow might invoke multiple skills:

```
User: "Turn this podcast into a full content kit"

Orchestrator loads sequence:
1. transcript-polisher      → Clean raw transcript
2. podcast-blog-post        → Create blog post
3. social-content-creation  → Generate social variants
4. image-prompt-generator   → Create thumbnail
5. newsletter-writer        → Draft newsletter section
```

Each skill operates on the output of the previous, with checkpoints between major phases.

---

## The Skill Stack Metaphor

Like a "stack" in software (LAMP, MERN), your skill stack is the combination of transformations that define your workflow:

```
YOUR SKILL STACK
────────────────
voice-pirate-wires     ← Your codified voice
anti-ai-writing        ← Humanization layer
podcast-blog-post      ← Primary content type
social-linkedin        ← Distribution format
hook-headlines         ← Attention engineering
```

Different creators have different stacks. A podcaster's stack differs from a newsletter writer's stack differs from a YouTube creator's stack.

---

## Skill Marketplace Concept

Skills are shareable. The marketplace would allow:

1. **Browse** - Filter by content type, complexity, rating
2. **Preview** - See the skill structure before installing
3. **Install** - Copy to your `.claude/skills/` folder
4. **Customize** - Fork and adapt to your voice
5. **Contribute** - Share your skills back

The "npm for AI skills" vision - but the value isn't in copying files. It's in the curation, the quality signal, and the community refinement.

---

## Creating New Skills

The `skill-creator` meta-skill guides skill creation:

```
/skill-creator

What kind of transformation do you want to create?

1. Content format (blog post, thread, newsletter)
2. Voice/style (specific author, brand voice)
3. Process workflow (research → outline → draft)
4. Tool integration (API, MCP connection)

[User selects]

Let's define the inputs and outputs...
What does this skill receive as input?
What should it produce?

[Iterate through skill specification]

→ Generate new SKILL.md with proper structure
```

---

## Skill Refinement Loop

Skills improve through use:

```
Use skill → Observe output quality
                    │
                    ▼
            Identify gap
            (missing rule, unclear step, edge case)
                    │
                    ▼
            Update SKILL.md
                    │
                    ▼
            Use again → Better output
                    │
                    └────► Repeat
```

This is where the moat lives. The refinement data - which rules work, which checkpoints matter, which examples clarify - accumulates in your skill files.

---

## Core Skills Every Writer Needs

1. **Voice skill** - Your specific writing patterns codified
2. **Anti-AI skill** - Patterns to avoid, humanization rules
3. **Primary format skill** - Your main content type (blog, newsletter, thread)
4. **Repurposing skill** - Transform long-form to short-form
5. **Hook/headline skill** - Attention engineering formulas

Start with these five. Add more as your workflow reveals gaps.

---

*Skills are the "spiral" in Spiral - the modular transformations that turn source material into finished assets. Without skills, you're just chatting with an AI. With skills, you're operating a content engine.*
