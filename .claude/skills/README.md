# Generic Content Marketing Skills

Portable, standalone skills for content marketers. Generalized for universal use across any industry or niche.

---

## Quick Start

1. Copy any skill folder to `.claude/skills/`
2. Invoke by asking Claude to use the skill
3. Skills work standalone or together

---

## Skill Inventory

### Foundational Skills

| Skill | Description | Portability |
|-------|-------------|-------------|
| **anti-ai-writing** | Core humanization engine. Forbidden patterns, SUCKS framework, sticky sentences, hedging detection. | Fully portable |
| **brand-identity-wizard** | Create brand identity profiles for skills that need customization. Generates audience, voice, vision/anti-vision. | Fully portable |
| **skill-creator** | Meta-skill for creating new skills. Architecture patterns and best practices. | Fully portable |

### Voice System

| Skill | Description | Portability |
|-------|-------------|-------------|
| **voice-analyzer** | Analyze 3-5 writing samples to generate custom voice skills. | Fully portable |
| **voice-pirate-wires** | Example voice style: contrarian, conversational, authentic. | Fully portable |

### Content Creation Skills

| Skill | Description | Portability |
|-------|-------------|-------------|
| **hook-and-headline-writing** | Headlines, subject lines, scroll-stoppers. 15 proven formulas, 20+ templates, 10 Commandments. | Fully portable |
| **transcript-polisher** | Transform raw transcripts into readable documents. Filler removal, structure, voice preservation. | Fully portable |
| **social-content-creation** | Transform source material into platform-optimized posts. 180+ frameworks, SCAMPER proliferation. | Fully portable |
| **ghostwriter** | Convert source material into authentic human voice. 8 Human Desires, voice adaptation, anti-AI patterns. | Fully portable |
| **dude-with-sign-writer** | Punchy one-liners for social. 12 proven patterns (Normalize, Stop, Observations, etc.). | Fully portable |
| **podcast-blog-post-creator** | Transform podcast transcripts into SEO-optimized blog posts. ~1,000 words, narrative-driven. | Requires brand-identity-wizard |

### Video & Podcast Skills

| Skill | Description | Portability |
|-------|-------------|-------------|
| **podcast-production** | Complete 4-checkpoint workflow: transcript to publishable assets. Cold opens, clips, YouTube, blog. | Requires brand-identity-wizard |
| **youtube-downloader** | Download YouTube transcripts with yt-dlp. VTT to clean text conversion. | Fully portable |
| **youtube-clip-extractor** | Download videos, identify clips, cut with ffmpeg, generate captions. Full URL-to-clip workflow. | Fully portable |
| **cold-open-creator** | Create 25-35 second cold opens that hook listeners. | Requires brand-identity-wizard |
| **youtube-title-creator** | High-CTR titles using 119 proven frameworks. | Requires brand-identity-wizard |
| **video-caption-creation** | On-screen text and captions for short-form video. | Requires brand-identity-wizard |
| **image-prompt-generator** | AI images using Gemini. 5 editorial styles. | Requires brand-identity-wizard |

---

## Skill Dependencies

```
┌─────────────────────────────────────────────────────────────┐
│                   BRAND-IDENTITY-WIZARD                     │
│         (Run first if using Tier 2/3 skills)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    VOICE ANALYZER                           │
│         (Wizard: samples → new voice skill)                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   VOICE STYLES                              │
│   voice-pirate-wires  (or your custom voice)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   ANTI-AI-WRITING                           │
│  (Core engine: humanization, patterns, quality)             │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │  hook-and-  │    │ transcript- │    │   social-   │
   │  headline-  │    │  polisher   │    │   content-  │
   │   writing   │    │             │    │  creation   │
   └─────────────┘    └─────────────┘    └─────────────┘
```

---

## Portability Tiers

### Tier 1: Fully Portable (No Setup Required)
- anti-ai-writing
- hook-and-headline-writing
- social-content-creation
- transcript-polisher
- voice-analyzer
- voice-pirate-wires
- skill-creator
- brand-identity-wizard
- ghostwriter
- dude-with-sign-writer
- youtube-downloader
- youtube-clip-extractor

### Tier 2: Requires Brand Identity
These skills work best when you first run `brand-identity-wizard` to define your audience, voice, and values:

- cold-open-creator
- youtube-title-creator
- video-caption-creation
- image-prompt-generator
- podcast-production
- podcast-blog-post-creator

---

## Skill Combinations

| Goal | Skills to Combine |
|------|-------------------|
| Write humanized content | anti-ai-writing |
| Write in specific voice | anti-ai-writing + voice-[style] OR ghostwriter |
| Create headlines | hook-and-headline-writing |
| Clean transcripts | transcript-polisher |
| Repurpose to social | social-content-creation + dude-with-sign-writer |
| Create YouTube content | youtube-title-creator + image-prompt-generator |
| Full podcast workflow | podcast-production (includes cold-open, clips, blog) |
| Extract YouTube clips | youtube-downloader → youtube-clip-extractor |
| Podcast to blog | transcript-polisher → podcast-blog-post-creator |
| Full content workflow | Chain them in sequence |

---

## Installation

### Single Skill
```bash
cp -r hook-and-headline-writing/ ~/.claude/skills/
```

### All Skills
```bash
cp -r "Revised Skills/"* ~/.claude/skills/
```

---

## Creating Your Own Voice

The **voice-analyzer** skill helps you codify your writing style:

1. Gather 3-5 samples of your best writing (1000+ words each)
2. Run voice-analyzer
3. Answer the analysis prompts
4. Save the generated `voice-[your-name]/` skill
5. Reference it alongside anti-ai-writing

---

## Customizing for Your Brand

For skills that need brand context (Tier 2), run **brand-identity-wizard** first:

1. Run the wizard with your business information
2. Answer prompts about audience, values, voice
3. Wizard generates a brand profile
4. Reference the profile when using Tier 2 skills

The wizard creates profiles that include:
- Target audience personas
- Voice characteristics
- Vision/anti-vision framing
- Key messaging themes

---

## Skill Architecture

Each skill follows this structure:

```
skill-name/
├── SKILL.md              # Main instructions (load this)
└── references/           # Detailed reference materials
    ├── README.md         # How to use references
    └── *.md              # Framework libraries, templates, etc.
```

**SKILL.md** contains the core workflow and principles (kept lean, <5k words).

**references/** contains detailed templates, examples, and frameworks loaded on demand.

---

## Contributing

To add a new skill or voice style:

1. Use **skill-creator** for new skills
2. Use **voice-analyzer** for new voice styles
3. Follow the folder structure in existing skills
4. Include proper YAML frontmatter in SKILL.md
5. Keep SKILL.md under 5k words, move details to references/

---

## Updates

**2025-12-25:** Genericized all skills for universal use. Removed industry-specific examples. Added brand-identity-wizard for customization.
