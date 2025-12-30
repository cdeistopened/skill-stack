# Skill Stack: Project Specification

> "Don't build agents, build skills instead." — Anthropic

## Vision

**Skill Stack** is the content creation skills marketplace—"npm for AI writing workflows."

While others build custom agents for every use case, we're building composable **skills** that any creator can download, customize, and stack together to amplify their work.

**Target Avatar**: Creators, solopreneurs, business owners focused on their craft who don't have time to study the latest AI tactics or prompt templates.

**Core Promise**: Unzip one file. Start it up in Claude. Let it unfold into something beautiful.

---

## Strategic Context

### The Skills > Agents Thesis

From Anthropic's framework (Barry Zhang & Mahesh Murag):

| Computing Layer | AI Equivalent | Where Value Lives |
|-----------------|---------------|-------------------|
| Processor | Model | Raw power, expensive alone |
| Operating System | Agent Runtime | Orchestrates resources |
| **Applications** | **Skills** | **Real value—domain expertise** |

**Key insight**: The industry keeps rebuilding the "OS" (custom agents). The opportunity is in building "applications" (skills) that solve real problems.

### Why Content Creation?

1. **Charlie's domain expertise** - Daily newsletter production, podcast workflows, ghostwriting
2. **Proven skills library** - 18 production-tested skills from OpenEd/Naval work
3. **Clear pain point** - Creators know AI can help but don't know how to harness it
4. **Narrow moat window** - First-mover advantage in curated, wizard-enabled skill distribution

### Business Model (Future)

- **Free tier**: Core skills (anti-ai-writing, transcript-polisher, hooks)
- **Newsletter**: Weekly skill breakdowns, builds audience
- **Premium**: Advanced wizards, custom voice skills, done-for-you setup
- **Enterprise**: Team brand voice, workflow consulting

---

## Core Concepts

### What is a Skill?

A **skill** is a folder containing:
- `SKILL.md` - Instructions Claude loads when triggered
- `references/` - Supporting documentation
- `scripts/` - Executable tools (optional)
- `assets/` - Templates, examples (optional)

Skills are **composable**—stack them together for compound workflows.

### What is a Skill Wizard?

A **wizard** wraps a skill with guided setup:
- Detects user's starting point (samples? inspiration? blank slate?)
- Asks conversational questions (not checklist)
- Produces a customized, working skill

**Wizard = Skill + Onboarding**

### Complexity Tiers

| Tier | Setup Time | Requirements | Examples |
|------|------------|--------------|----------|
| **Plug & Play** | 5 min | Just download | hook-and-headline-writing, transcript-polisher |
| **Light Setup** | 15-20 min | Brand identity or samples | voice-analyzer, ghostwriter |
| **Full Setup** | 30+ min | API keys, tool installs | image-prompt-generator, youtube-clip-extractor |

---

## The Content Flywheel

Each skill creates content opportunities:

```
Blog Post (backstory, philosophy)
        ↓
    Skill Wizard (downloadable)
        ↓
    User Success (customized skill)
        ↓
    Testimonial/Case Study
        ↓
    Newsletter Feature
        ↓
    Updated Blog Post...
```

**Example**: "In the Style of Didion" article → Voice Matching Wizard → User creates `voice-[name].skill.md` → User shares success → Featured in newsletter

---

## Current State

### Platform
- **Tech**: React + Convex + Vite
- **Deployment**: Vercel (dusty-sardine-185)
- **Domain**: skillstack.dev (pending)

### Pages
- `/` - Homepage with newsletter signup, featured posts, archive
- `/skills` - Marketplace page (needs real skill data)
- `/:slug` - Blog posts

### Skills Inventory

**18 skills** in `.claude/skills/`:

**Tier 1 (Plug & Play)**: anti-ai-writing, hook-and-headline-writing, dude-with-sign-writer, transcript-polisher, social-content-creation

**Tier 2 (Light Setup)**: voice-analyzer, voice-pirate-wires, ghostwriter, brand-identity-wizard, cold-open-creator, podcast-blog-post-creator, youtube-title-creator, video-caption-creation, skill-creator

**Tier 3 (Full Setup)**: image-prompt-generator, podcast-production, youtube-clip-extractor, youtube-downloader

---

## Launch Catalog (7 Skills)

The curated launch lineup:

| Skill | Tier | Wizard? | Notes |
|-------|------|---------|-------|
| **anti-ai-writing** | Plug & Play | No | Foundational - removes AI tells |
| **voice-analyzer** | Light Setup | Yes | Flagship wizard - creates custom voice skills |
| **hook-and-headline-writing** | Plug & Play | No | 15 formulas for scroll-stopping hooks |
| **transcript-polisher** | Plug & Play | No | Raw transcript → readable document |
| **brand-identity-wizard** | Light Setup | Yes | Creates brand profile other skills reference |
| **image-prompt-generator** | Full Setup | No | Gemini API for thumbnails/visuals |
| **dude-with-sign-writer** | Plug & Play | No | Fun - punchy one-liners for social |

---

## User Journey

Multiple entry points, all lead to subscription:

```
SEO/Social → Blog Post → Related Skill → Download → Subscribe
Newsletter → Skill Spotlight → Download → Share Success
Marketplace → Browse → Download → Subscribe for More
```

**Key insight**: All paths valid. Don't optimize for one at expense of others.

---

## Distribution Format

**Primary**: `.zip` files uploaded to Claude Desktop/Claude.ai
- Simple skills: Just SKILL.md (can also copy to clipboard)
- Complex skills: Folder with references/, scripts/, etc.

**Backlog**: Write "Getting Started with Skills" tutorial post

---

## Newsletter Format

**Moodboard-style** weekly issues:
1. Skill breakdown (what it does, why it matters)
2. Downloadable skill file
3. How to use it (quick start)
4. Related skills / what's next

**Cadence**: Weekly skill spotlight + occasional essay content on AI writing world

---

## Core Production Skill: `skill-stack-newsletter-writer`

A master skill for producing Skill Stack content. This is the internal workflow that powers the newsletter.

**Inputs:**
- Featured skill (SKILL.md)
- Related posts/backlinks from content/blog/
- Any essay content to weave in

**Outputs:**
1. **Newsletter issue** (Moodboard format)
2. **Thumbnail/header image** (via image-prompt-generator / Gemini)
3. **Social media package:**
   - Short-form video script
   - Twitter/X thread
   - LinkedIn post
4. **In-post infographics** (optional visual explainers)

**Architecture options:**
- Single master skill that chains others
- OR skill pipeline: `skill → newsletter-writer → image-generator → social-content-creator`

**Status:** To be developed alongside first newsletter issues (iterate as we publish)

**Related skills it may invoke:**
- `image-prompt-generator` - Thumbnails
- `social-content-creation` - Platform posts
- `hook-and-headline-writing` - Subject lines
- `anti-ai-writing` - Final polish

---

## Differentiation

What makes Skill Stack different from Anthropic's repo or random GitHub collections:

1. **Curation + Wizards** - Hand-picked skills with guided setup
2. **Content Creator Focus** - All skills serve writers/creators specifically
3. **Newsletter + Community** - Ongoing education, not just file dump
4. **Charlie's Production-Tested** - Proven at OpenEd/Naval, not theoretical

---

## Skill Display (Marketplace Page)

When browsing skills, show:
- **Setup complexity** - Time estimate, requirements (API keys, samples)
- **Use case examples** - "Use this when..." scenarios
- **Related skills** - "Works well with..." combinations

---

## Roadmap

### Phase 1: Launch (Current)
- [x] Design Skill Wizard framework
- [x] Map skills to complexity tiers
- [ ] Create Voice Matching Wizard (flagship)
- [ ] Create Brand Identity Wizard
- [ ] Update Skills.tsx with launch catalog (7 skills)
- [ ] Write launch newsletter issue
- [ ] "Getting Started with Skills" tutorial post

### Phase 2: Polish
- [ ] Download functionality (zip generation)
- [ ] Skill detail pages with full descriptions
- [ ] Related skills recommendations
- [ ] First 4 weekly newsletters

### Phase 3: Expand
- [ ] Migrate Frameworks/Style guides to SKILL.md format
- [ ] Add remaining 11 skills to catalog
- [ ] Ghostwriter Wizard (combines voice + anti-ai)
- [ ] User testimonials / case studies

### Phase 4: Platform
- [ ] User accounts (track downloads)
- [ ] Skill ratings/reviews
- [ ] Community submissions
- [ ] Premium tier

---

## Related Documents

| Document | Purpose |
|----------|---------|
| [SKILL-WIZARD-SPEC.md](SKILL-WIZARD-SPEC.md) | Wizard framework design, WIZARD.md template |
| [SKILL-INVENTORY.md](SKILL-INVENTORY.md) | Full skill inventory with categories and dependencies |
| [CLAUDE.md](CLAUDE.md) | Project-specific AI context |

---

## Key References

### Anthropic Skills
- Cloned to `.claude/anthropic-skills/`
- Reference for skill-creator patterns
- Document skills (docx, pdf, pptx, xlsx)

### Existing Content
- "In the Style of Didion" - Blog post on voice matching
- Book Chapter 11 - Voice Matching methodology
- Frameworks/Style/ - Voice guides to migrate

---

## Success Metrics

**Launch**:
- 3 Skill Wizards live (Voice, Anti-AI, Hooks)
- 100 newsletter subscribers
- 50 skill downloads

**Month 1**:
- 6 Skill Wizards
- 500 subscribers
- 10 user testimonials

**Month 3**:
- Full 18-skill catalog with wizards
- 2,000 subscribers
- Premium tier launched

---

*Last updated: December 29, 2025*
