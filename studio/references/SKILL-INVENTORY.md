# Skill Stack Inventory

## Skills by Complexity Tier

### Tier 1: Plug & Play (5 min setup)
Download and use immediately. No customization required.

| Skill | Category | Description | Related Content |
|-------|----------|-------------|-----------------|
| **anti-ai-writing** | Foundational | Detect and eliminate AI tells, SUCKS framework | Needs blog post |
| **hook-and-headline-writing** | Headlines | 15 formulas, 4 U's test, volume generation | Needs blog post |
| **dude-with-sign-writer** | Social | Punchy one-liners, 12 core patterns | Needs blog post |
| **transcript-polisher** | Editing | Raw transcript → readable document | Book Ch. 5 |
| **social-content-creation** | Repurposing | 180+ templates, framework fitting | Needs blog post |

### Tier 2: Light Setup (15-20 min)
Needs brand identity OR writing samples. Wizard guides customization.

| Skill | Category | Requires | Related Content |
|-------|----------|----------|-----------------|
| **voice-analyzer** | Voice | 2-5 writing samples | "In the Style of Didion", Book Ch. 11 |
| **voice-pirate-wires** | Voice | (Example output of voice-analyzer) | - |
| **ghostwriter** | Writing | Writing samples + brand identity | Book Ch. 11-12 |
| **brand-identity-wizard** | Setup | User interview (persona, voice, values) | Needs blog post |
| **cold-open-creator** | Podcast | Brand identity | Needs blog post |
| **podcast-blog-post-creator** | Repurposing | Brand identity | Needs blog post |
| **youtube-title-creator** | Video | Brand identity | Needs blog post |
| **video-caption-creation** | Video | Brand identity | Needs blog post |
| **skill-creator** | Meta | Understanding of skill format | Anthropic docs |

### Tier 3: Full Setup (30+ min)
Requires API keys, tool installs, or MCP integrations.

| Skill | Category | Requires | Related Content |
|-------|----------|----------|-----------------|
| **image-prompt-generator** | Visual | Gemini API key | Needs blog post |
| **podcast-production** | Production | ffmpeg, brand identity | Needs blog post |
| **youtube-clip-extractor** | Video | yt-dlp, ffmpeg | Needs blog post |
| **youtube-downloader** | Video | yt-dlp | Needs blog post |

---

## Dependency Graph

```
┌─────────────────────────────────────────────────────────────┐
│                   BRAND-IDENTITY-WIZARD                      │
│         (Run first for Tier 2/3 skills)                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    VOICE-ANALYZER                            │
│         (Samples → Custom Voice Skill)                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   VOICE SKILLS                               │
│   voice-pirate-wires  (or your custom voice-[name])         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   ANTI-AI-WRITING                            │
│  (Core engine: humanization, patterns, quality)              │
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

## Marketplace Categories

### Writing & Voice
- voice-analyzer
- voice-pirate-wires
- ghostwriter
- anti-ai-writing

### Headlines & Hooks
- hook-and-headline-writing
- dude-with-sign-writer

### Content Repurposing
- social-content-creation
- video-caption-creation
- transcript-polisher

### Podcast & Video
- podcast-production
- cold-open-creator
- podcast-blog-post-creator
- youtube-title-creator
- youtube-clip-extractor
- youtube-downloader

### Setup & Meta
- brand-identity-wizard
- skill-creator
- image-prompt-generator

---

## Priority Skill Wizards to Build

### Wave 1: Core Value Props
1. **Voice Matching Wizard** - Ties to Didion article + book chapter
2. **Anti-AI Writing Wizard** - Universal need, highest impact

### Wave 2: Quick Wins
3. **Hook & Headline Wizard** - Plug & play, immediate value
4. **Transcript Polisher Wizard** - Plug & play, ties to book

### Wave 3: Production Skills
5. **Ghostwriter Wizard** - Combines voice + anti-ai
6. **Social Content Wizard** - Framework fitting method

### Wave 4: Advanced
7. **Podcast Production Wizard** - Full workflow
8. **Image Prompt Wizard** - Gemini integration

---

## Content to Create Per Skill

Each skill needs:
1. **Blog Post** - Backstory, philosophy, use case
2. **Skill Wizard** - Self-customizing download
3. **Example Output** - What success looks like
4. **Related Newsletter** - 5-minute skill breakdown
