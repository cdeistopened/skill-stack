# Skill Stack Podcast - Skill Architecture

## Overview

Modular skill chain for producing Skill Stack podcast episodes. Each skill is discrete but can reference others. The master workflow orchestrates checkpoints.

---

## Skill Chain Diagram

```
[Transcript]
    │
    ▼
┌─────────────────────────────────────┐
│  1. ANALYSIS (Checkpoint 1)         │
│     - Episode themes                │
│     - Quote bank                    │
│     - Story beat identification     │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  2. COLD OPEN (Checkpoint 2)        │
│     Uses: cold-open-creator         │
│     Method: Narrative Snippets      │
│     Output: 20-35 sec clip sequence │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  3. ARTICLE (Checkpoint 3)          │
│     Uses: writing-style             │
│     Output: ~1000 word blog post    │
│     + Lewis credibility / StoryBrand│
└─────────────────────────────────────┘
    │
    ├──────────────────────┐
    ▼                      ▼
┌─────────────────┐  ┌─────────────────┐
│ 4a. YOUTUBE     │  │ 4b. BLOG        │
│     ASSETS      │  │     THUMBNAIL   │
│                 │  │                 │
│ Uses:           │  │ Uses:           │
│ youtube-title-  │  │ image-prompt-   │
│ creator         │  │ generator       │
│                 │  │                 │
│ Output:         │  │ Style:          │
│ - Title         │  │ RISOGRAPH       │
│ - Thumbnail*    │  │ (see reference) │
│ - Description   │  │                 │
│ - Chapters      │  │ Output:         │
└─────────────────┘  │ Blog header img │
    │                └─────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  5. NEWSLETTER (Checkpoint 4)       │
│     Uses: skill-stack-newsletter    │
│     Output:                         │
│     - Subject line (A/B variants)   │
│     - Preview text                  │
│     - Newsletter body               │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  6. PUBLISH (Final)                 │
│     - YouTube upload                │
│     - Blog publish                  │
│     - Beehiiv send                  │
│     - Social clips                  │
└─────────────────────────────────────┘
```

---

## Thumbnail Differentiation

### YouTube Thumbnail
**Purpose:** High CTR on browse/search
**Style:** Faces, bold text, high contrast
**Text:** 2-4 words max ("Night and Day", "Show > Tell")
**Method:** Framework from youtube-title-creator (complementarity with title)

### Blog Thumbnail
**Purpose:** Visual identity, brand consistency
**Style:** Risograph/screen print aesthetic
**Text:** Minimal or none
**Method:** image-prompt-generator with risograph style reference

---

## Skills Reference Table

| Skill | Location | Used For |
|-------|----------|----------|
| **podcast-production** | `.claude/skills/podcast-production/` | Master workflow |
| **cold-open-creator** | `.claude/skills/cold-open-creator/` | Cold open with narrative snippets |
| **youtube-title-creator** | User settings | Title + YouTube thumbnail |
| **image-prompt-generator** | `.claude/skills/image-prompt-generator/` | Blog thumbnail (risograph) |
| **writing-style** | `.claude/skills/writing-style/` | Article voice/AI tells |
| **skill-stack-newsletter-writer** | `.claude/skills/skill-stack-newsletter-writer/` | Beehiiv assets |
| **video-caption-creation** | `.claude/skills/video-caption-creation/` | Social clip captions |

---

## Episode Folder Structure

```
studio/podcast/episodes/[NNN]-[guest-name]/
├── Transcript.md           # Source material
├── SHOW-NOTES.md           # Episode context
├── PRODUCTION_CHECKLIST.md # Progress tracker
│
├── Cold_Open.md            # Checkpoint 2 output
├── ARTICLE.md              # Checkpoint 3 output
│
├── YouTube_Assets.md       # Checkpoint 4a output
├── Thumbnail_Prompts.md    # For blog thumbnail
├── Beehiiv_Assets.md       # Checkpoint 4b output
│
└── assets/                 # Generated images
    ├── blog-thumbnail.png
    └── youtube-thumbnail.png
```

---

## Checkpoint Flow

### Checkpoint 1: Analysis
**Input:** Raw transcript
**Output:** Themes, quotes, story beats
**Decision:** Which story arc for cold open?

### Checkpoint 2: Cold Open + Article Draft
**Input:** Selected story arc
**Skills:** cold-open-creator, writing-style
**Output:** Cold_Open.md, ARTICLE.md draft
**Decision:** Approve cold open clips? Approve article direction?

### Checkpoint 3: Visual Assets
**Input:** Approved article
**Skills:** youtube-title-creator, image-prompt-generator
**Output:** YouTube_Assets.md, Thumbnail_Prompts.md
**Decision:** Approve title? Approve thumbnail concepts?

### Checkpoint 4: Newsletter
**Input:** All approved assets
**Skills:** skill-stack-newsletter-writer
**Output:** Beehiiv_Assets.md
**Decision:** Approve subject line and body?

### Checkpoint 5: Publish
**Input:** All approved assets
**Action:** Upload/publish to platforms
**Verification:** Links work, timestamps correct

---

## Narrative Snippets Integration

The cold-open-creator skill now uses the **Narrative Snippets Method**:

1. **Identify story beats** in transcript:
   - Setup (protagonist in their world)
   - Disaster (disruption)
   - Failed Approach (obvious solution backfires)
   - Insight (realization)
   - Resolution (applied insight works)
   - Reflection (universal takeaway)

2. **Cold open structure:**
   - Include beats 1-3 (Setup → Disaster → Failed Approach)
   - TEASE beat 4 (Insight)
   - CUT BEFORE beats 5-6 (Resolution → Reflection)

3. **Output format:**
   - Host spoken intro (optional, ~5-10 seconds)
   - Guest clips arranged to create narrative arc
   - Total duration: 20-35 seconds

---

## Style References

### Risograph Style (Blog Thumbnails)
Location: `.claude/skills/image-prompt-generator/references/styles/risograph.md`

Key characteristics:
- Halftone dots visible
- Slight misregistration between color layers
- Limited palette (2-4 colors)
- Paper texture
- Edge-to-edge composition

### Writing Style
Location: `.claude/skills/writing-style/SKILL.md`

Key principles:
- No correlative constructions ("X isn't just Y - it's Z")
- 10th grade reading level
- Vary sentence length
- No AI tells

---

## Next Steps

1. [ ] Add Beehiiv checkpoint to podcast-production skill
2. [ ] Create skill-stack-newsletter-writer skill (if not exists)
3. [ ] Add risograph style integration to image-prompt-generator
4. [ ] Test full workflow on Episode 002 (Lewis Kallow)

---

*Created: 2026-01-22*
