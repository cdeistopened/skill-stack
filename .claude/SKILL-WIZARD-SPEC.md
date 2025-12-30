# Skill Wizard Specification

## Philosophy

A **Skill Wizard** is not just a SKILL.md file—it's a **self-unpacking knowledge package** that guides users through customization.

Think: Neo's "I know kung fu" moment, but with a guided onboarding.

**Target Avatar**: Creators, solopreneurs, business owners who are focused on their craft and don't have time to study the latest tactics or templates.

**Core Promise**: Unzip one file. Start it up in Claude/Cursor. Let it unfold into something beautiful.

---

## Anatomy of a Skill Wizard

```
skill-name-wizard/
├── SKILL.md              # The working skill (generic or customized)
├── WIZARD.md             # Conversational setup guide
├── README.md             # Quick start (optional, fades after setup)
├── references/           # Supporting documentation
│   ├── examples/         # Sample inputs/outputs
│   └── frameworks/       # Underlying methodology
└── templates/            # Fill-in-the-blank customization assets
    ├── brand-identity.template.md
    ├── voice-samples.template.md
    └── ...
```

---

## The WIZARD.md Pattern

Inspired by Moodboard's Persona Discovery Wizard. Key principles:

### Conversational, Not Checklist
- Ask ONE question at a time
- Wait for response before continuing
- Adapt based on what user shares
- Dig deeper when answers are vague

### Branching Paths
Different users have different starting points. The wizard should detect and adapt:

**Voice Matching Example:**
```
User A: "I have 3 blog posts I wrote that I love"
  → Analyze their samples → Create voice-[name].skill.md

User B: "I want to write like Joan Didion"
  → Use built-in knowledge → Create voice-didion.skill.md

User C: "I'm not sure what my voice is yet"
  → Discovery mode → Ask about tone preferences, favorite writers
  → Recommend a hybrid approach
```

**Brand Identity Example:**
```
User A: "I already have brand guidelines"
  → Extract and formalize → Create brand-identity.md

User B: "I'm starting from scratch"
  → Full interview → Build persona, voice, values from ground up

User C: "I have a competitor I want to sound like"
  → Analyze competitor → Differentiate while borrowing patterns
```

### Progressive Customization
The wizard gathers information to fill in the skill's generic placeholders:

```markdown
---
name: voice-wizard
description: Create a personalized voice style skill through guided interview
---

# Voice Matching Wizard

I'll help you create a custom voice skill in about 15 minutes.

## How This Works

1. You'll share 2-3 writing samples (your best work)
2. I'll analyze patterns in your writing
3. We'll refine the voice profile together
4. You'll get a working `voice-[your-name].skill.md`

Ready to begin?

---

## Step 1: Gather Your Samples

First, I need to see your writing. Please share 2-3 pieces that represent your authentic voice.

**What makes a good sample:**
- At least 500 words each
- Writing you're proud of
- Representative of how you want to sound

*Paste your first sample below, or tell me where to find it:*

[WAIT FOR USER INPUT]

---

## Step 2: Analyze Patterns

Based on your samples, I'll identify:
- Word choice and vocabulary tendencies
- Sentence length and rhythm
- Tone and attitude
- How you address your reader
- Paragraph structure and pacing
- Your humor style (if any)

[ANALYSIS OUTPUT]

Does this capture your voice? What would you adjust?

[WAIT FOR USER INPUT]

---

## Step 3: Compile Your Voice Skill

Based on our conversation, I'm generating your personalized skill:

[OUTPUT: voice-[name].skill.md]

**To use this skill:**
1. Save this file to `.claude/skills/`
2. Invoke it alongside other skills (e.g., anti-ai-writing)
3. Update as your voice evolves

---

## What's Next?

Your voice skill works best when combined with:
- **anti-ai-writing** - Removes AI tells
- **ghostwriter** - For longer-form content
- **social-content-creation** - For platform-specific posts

Would you like me to help you with any of these?
```

---

## Complexity Tiers

Each Skill Wizard has a complexity rating:

### Tier 1: Plug & Play (5 min)
- Download and use immediately
- No API keys, no samples, no setup
- Examples: `hook-and-headline-writing`, `dude-with-sign-writer`, `transcript-polisher`

### Tier 2: Light Setup (15-20 min)
- Needs brand identity OR writing samples
- Wizard guides the customization
- Examples: `voice-analyzer`, `cold-open-creator`, `podcast-blog-post-creator`

### Tier 3: Full Setup (30+ min)
- Requires API keys or tool installs
- May need MCP integrations
- Examples: `image-prompt-generator` (Gemini API), `youtube-clip-extractor` (ffmpeg)

---

## Content Flywheel

Each skill creates a content opportunity:

```
┌──────────────────────────────────────────────────────────┐
│                    BLOG POST                              │
│  "In the Style of Didion" / "Voice Matching 101"         │
│  Backstory, philosophy, why this matters                 │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                    SKILL WIZARD                           │
│  Downloadable, self-customizing package                   │
│  User creates their own working version                   │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                    USER SUCCESS                           │
│  "I created voice-[my-name].skill.md!"                   │
│  Testimonial, case study, remix                          │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                    NEW CONTENT                            │
│  Updated blog post, newsletter feature                    │
│  Continuous improvement loop                              │
└──────────────────────────────────────────────────────────┘
```

---

## Skill → Blog Post Mapping

| Skill | Related Content | Status |
|-------|-----------------|--------|
| voice-analyzer | "In the Style of Didion", Ch. 11 Voice Matching | Exists |
| anti-ai-writing | ? | Needs post |
| hook-and-headline-writing | ? | Needs post |
| ghostwriter | Ch. 11-12 Express | Partial |
| transcript-polisher | Ch. 5 Polishing | Exists in book |
| social-content-creation | ? | Needs post |
| podcast-production | ? | Needs post |
| image-prompt-generator | ? | Needs post |

---

## Implementation Priority

1. **Voice Matching Wizard** - Ties directly to existing content (Didion article, book chapter)
2. **Anti-AI Writing Wizard** - Core foundational skill, high value
3. **Hook & Headline Wizard** - Quick win, plug-and-play
4. **Ghostwriter Wizard** - Combines voice + anti-ai-writing

---

## Key Insight: Skills as "Applications Layer"

From Anthropic's "Don't Build Agents, Build Skills" talk:

| Computing | AI Equivalent | Role |
|-----------|---------------|------|
| Processor | Model | Raw power, expensive alone |
| Operating System | Agent Runtime | Orchestrates resources |
| **Applications** | **Skills** | **Where the real value lies** |

You're building the **App Store for content creation skills**.

Stop building the OS. Build the applications.
