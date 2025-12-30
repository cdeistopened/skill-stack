# Skill Stack Session Handoff

*Last updated: December 29, 2024*

## Project Status: Pre-Launch

Skill Stack is a markdown blog that will evolve into a skills marketplace ("npm for AI skills"). Currently in template customization and content preparation phase.

---

## CRITICAL PENDING TASKS

### 1. Add Slugs to All 36 Blog Posts ⚠️ BLOCKING
**Status**: Not started
**Why it matters**: Posts won't sync to Convex without `slug` field in frontmatter

**Proposed slug mapping** (approved by user):
```
# Book chapters (commanding-the-page/)
01-transform.md → slug: "transform"
02-capture.md → slug: "capture"
03-organize.md → slug: "organize"
04-distill.md → slug: "distill"
05-express.md → slug: "express"
06-refine.md → slug: "refine"
07-4s-source.md → slug: "source"
08-4s-substance.md → slug: "substance"
09-4s-structure.md → slug: "structure"
10-4s-style.md → slug: "style"
11-voice-matching.md → slug: "voice"
12-anti-ai-writing.md → slug: "anti-ai"
13-coder-framework.md → slug: "coder"
14-prompt-engineering-dead.md → slug: "prompts"
15-skill-wrapper-thesis.md → slug: "wrapper"
16-ai-skills-marketplace.md → slug: "marketplace"

# Substack posts - need individual review for slug assignment
```

**Action needed**: Run through all 36 posts, add `slug: "value"` to frontmatter

---

### 2. Template Customization

**Completed**:
- [x] Convex deployment configured (dusty-sardine-185)
- [x] Basic siteConfig updated
- [x] Content converted (16 book chapters + 20 Substack posts)
- [x] .claude knowledge system created (CLAUDE.md, AUTHOR.md, CONTENT_INDEX.md, NARRATIVE.md)

**Pending**:
- [ ] Update index.html meta tags (OG, Twitter, description)
- [ ] Add logo to public/images and configure in siteConfig
- [ ] Create cropped favicon from logo
- [ ] Update RSS/HTTP URLs from markdown.fast to skill-stack domain
- [ ] Update GitHub stats to fetch skill-stack repo (not template)

**Logo location**: `content/Gemini_Generated_Image_sy9b9bsy9b9bsy9b.png` (needs to move to public/)

---

### 3. Create Master 4S Framework Post
**Status**: Not started
**Context**: Multiple posts cover 4S (source, substance, structure, style). User wants a unified master post.

**Related files**:
- content/blog/commanding-the-page/07-4s-source.md
- content/blog/commanding-the-page/08-4s-substance.md
- content/blog/commanding-the-page/09-4s-structure.md
- content/blog/commanding-the-page/10-4s-style.md

---

### 4. Sync & Deploy
- [ ] Sync content to Convex and test locally (`npm run dev`)
- [ ] Deploy to Railway

---

## THUMBNAIL SYSTEM (Significant Progress Made)

### Decisions Made
- **Default style**: RISOGRAPH (prism-risograph-v2.png is the benchmark)
- **Thumbnail location**: `public/images/thumbnails/[post-slug].png`
- **Workbench location**: `public/images/workbench/` (17 test images)
- **Frontmatter reference**: `image: "/images/thumbnails/[slug].png"`

### Style Library Created
Located in `scripts/images/styles/`:
- `woodcut-engraving.md` - Dürer-inspired, hatching, high contrast ✓ GOOD
- `botanical-scientific.md` - Scientific illustration, stippling, watercolor ✓ GOOD (for infographics)
- `victorian-ornamental.md` - Decorative borders, formal ✗ NOT for thumbnails
- `tarot-symbolic.md` - Mystical, archetypal ✗ REJECTED (too kitschy)

### Key Learnings for Thumbnail Prompts
1. **Visual memes**: Reference iconic images (Pink Floyd prism, etc.) - "aesthetic aha"
2. **Single subject**: One striking object, not infographics
3. **No text/labels**: Thumbnails intrigue, they don't explain
4. **Tight composition**: Fill the frame, avoid excess whitespace
5. **Terracotta accent**: Brand color as the visual anchor/hero element

### Thumbnail vs Infographic
- **Thumbnails**: Risograph style, single evocative image, no text
- **In-post infographics**: Botanical/scientific style, can have labels, teaching mode

### Best Test Images (in workbench/)
- `prism-risograph-v2.png` - **WINNER for 4S post** - Pink Floyd reference, bold colors
- `prism-durer-v2.png` - Good for craft/mastery posts
- `prism-botanical-v2.png` - Elegant but whitespace issues
- `4s-sculptor.png` - Strong transformation metaphor
- `4s-hands.png` - Craft/process feel

### Generation Scripts
- `scripts/images/gen_prism_v2.py` - Current best prompt structure
- `scripts/images/generate_image.py` - Base Gemini API script
- `scripts/images/SKILL.md` - Thumbnail generation skill doc

### Environment
- Python venv at `.venv/`
- Gemini API key in `.env.local`
- Model: `gemini-3-pro-image-preview` (Nano Banana Pro)
- Cost: ~$0.02-0.04 per image

---

## BRANDING DECISIONS

### Colors (from logo)
| Role | Color | Hex |
|------|-------|-----|
| Primary Accent | Terracotta/Coral | `#D4654A` |
| Background | Warm Cream | `#F5F3EE` |
| Paper Light | Light Gray | `#E8E6E1` |
| Paper Medium | Medium Gray | `#DEDBD5` |
| Paper Dark | Darker Gray | `#D4D1CB` |
| Text/Line | Near-Black | `#2D2D2D` |

### Typography Direction
- Elegant, Anthropic-adjacent
- Suggested: Satoshi or Plus Jakarta Sans

### Tagline Direction
- "A curated repository of SKILL.md files for content creators"
- "Learn new AI skills in 5 minutes"

### Domain Preference
- skillstack.md or skillstack.dev

---

## CONTENT STRUCTURE

### 36 Total Posts
- **16 book chapters** in `content/blog/commanding-the-page/`
- **20 Substack posts** in `content/blog/substack/`

### Series/Collections to Create
User wants to keep Series feature. Suggested groupings:
- "Commanding the Page" (book chapters)
- "The 4S Framework" (4 related posts)
- "CODER Framework" (capture/organize/distill/express/refine)

### Features to Skip
- Archive page
- Timeline view
- Tag cloud
(User wants minimalist approach)

---

## NEXT SESSION PRIORITIES

1. **Add slugs to all 36 posts** (blocking for Convex sync)
2. **Move logo to public/, create favicon**
3. **Generate thumbnails for key posts** using risograph style
4. **Test local dev** (`npm run dev`)
5. **Create master 4S post** if time permits

---

## FILES TO REFERENCE

### Context Documents
- `/.claude/CONTENT_INDEX.md` - Full post inventory with topics
- `/.claude/AUTHOR.md` - Charlie's voice and background
- `/.claude/NARRATIVE.md` - Skill Stack story and vision
- `/.claude/CLAUDE.md` - Project context

### Thumbnail System
- `/scripts/images/styles/` - Style reference files
- `/scripts/images/gen_prism_v2.py` - Best prompt template
- `/public/images/workbench/` - 17 test thumbnail images

### Skills Library (already in .claude/skills/)
- hook-and-headline-writing
- image-prompt-generator
- anti-ai-writing
- social-content-creation
- ghostwriter
- youtube-title-creator
- Many more...

---

## QUICK REFERENCE

### Commands
```bash
# Development
npm run dev              # Start local dev server
npx convex dev           # Start Convex backend

# Image generation
cd scripts/images
source ../../.venv/bin/activate
python3 gen_prism_v2.py  # Generate test images
```

### Convex
- Deployment: `dev:dusty-sardine-185`
- URL: `https://dusty-sardine-185.convex.cloud`
