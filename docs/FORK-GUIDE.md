# Forking This Engine for a New Project

> How to spin up a new content site using Skill Stack as the template.

---

## Which Repo to Fork?

**Fork this repo (skill-stack)** - it has:
- Working skills infrastructure
- Sync scripts that work
- Thumbnail generation setup
- Newsletter/subscriber system
- All the patterns documented

The "original" markdown-fast repo is a barebones starter. This one has the batteries included.

---

## Quick Start (30 minutes)

### 1. Fork & Clone

```bash
# Option A: GitHub fork
# Go to github.com/cdeistopened/skill-stack → Fork → Clone your fork

# Option B: Direct copy (no git history)
git clone https://github.com/cdeistopened/skill-stack.git ray-peat-site
cd ray-peat-site
rm -rf .git
git init
```

### 2. Clean Out Skill Stack Content

```bash
# Remove existing blog posts (keep the structure)
rm -rf content/blog/*
rm -rf content/newsletters/*
rm -rf content/drafts/*

# Keep these (they're templates):
# - content/pages/about.md
# - content/pages/contact.md
# - content/pages/newsletter.md

# Remove Skill Stack branding
rm -rf public/images/thumbnails/*
rm -rf public/images/workbench/*

# Keep the skills (you'll customize them)
# .claude/skills/ stays
```

### 3. Set Up New Convex Project

```bash
# This creates a NEW database (not Skill Stack's)
npx convex dev

# When prompted:
# - Create new project: Yes
# - Project name: ray-peat-site (or your project)
```

### 4. Configure Your Site

Edit `src/config.ts` (or wherever site config lives):

```typescript
export const siteConfig = {
  name: "Ray Peat Insights",
  description: "Regenerative health research made accessible",
  url: "https://raypeat.site",
  // etc.
}
```

### 5. Run Brand Identity Wizard

```bash
# In Claude Code
/brand-identity-wizard
```

This creates `.claude/brand-identity.md` with your:
- Voice and tone
- Target audience
- Key themes
- Writing style notes

### 6. Add Your Content

```bash
# Create your first post
cat > content/blog/welcome.md << 'EOF'
---
title: "Welcome to Ray Peat Insights"
slug: "welcome"
description: "What this site is about and why it exists."
date: "2025-01-01"
tags: ["intro"]
featured: true
---

Your content here...
EOF
```

### 7. Generate Thumbnail

```bash
# Use the image-prompt-generator skill
# IMPORTANT: Use gemini-3-pro-image-preview for 16:9 aspect ratio
```

### 8. Sync & Deploy

```bash
npm run sync          # Push to Convex
npm run build         # Generate static files
railway login         # If not logged in
railway init          # Create Railway project
railway up            # Deploy
```

---

## What to Keep vs. Delete

### KEEP (Core Engine)
```
├── convex/              # Database schema & functions
├── src/                 # React frontend
├── scripts/             # Sync scripts
├── .claude/
│   ├── CLAUDE.md        # Update for your project
│   └── skills/          # Keep & customize
│       ├── anti-ai-writing/
│       ├── image-prompt-generator/
│       ├── brand-identity-wizard/
│       └── voice-matching-wizard/
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### DELETE (Skill Stack Specific)
```
├── content/blog/*           # All posts
├── content/newsletters/*    # All newsletters
├── content/drafts/*         # All drafts
├── public/images/thumbnails/* # All images
├── public/images/workbench/*  # All image concepts
├── public/skills/*          # Skill marketplace files
├── public/raw/*             # Generated raw files
└── .claude/PROJECT.md       # Sprint tracking
```

### CUSTOMIZE
```
├── .claude/CLAUDE.md        # Rewrite for your project
├── .claude/NARRATIVE.md     # Your thesis/philosophy
├── .claude/AUTHOR.md        # Your bio
├── content/pages/about.md   # Your about page
├── content/pages/contact.md # Your contact info
└── src/config.ts            # Site name, URL, etc.
```

---

## Skills You Get Out of the Box

| Skill | What It Does | First Thing to Do |
|-------|--------------|-------------------|
| `brand-identity-wizard` | Defines voice, audience, themes | Run this first |
| `voice-matching-wizard` | Creates voice skill from samples | After brand identity |
| `anti-ai-writing` | Humanizes AI drafts | Use on all content |
| `image-prompt-generator` | Creates thumbnails | For featured posts |
| `hook-and-headline-writing` | Newsletter subject lines | When writing newsletters |
| `transcript-polisher` | Cleans up transcripts | If you have podcasts |

---

## Skills to Consider Adding

From the Skill Stack marketplace (or create your own):

- **`seo-optimizer`** - Audit posts for SEO
- **`social-proliferator`** - Turn posts into social content
- **`content-calendar-planner`** - Plan 4-8 weeks ahead
- **`podcast-to-article`** - If you're doing podcasts

---

## The Convex Schema

You get these tables out of the box:

```typescript
// posts - Blog posts synced from markdown
// pages - Static pages (about, contact, etc.)
// subscribers - Newsletter signups
// aiChats - Chat history (if using AI chat feature)
// contacts - Contact form submissions
```

If you need different content types, modify `convex/schema.ts`.

---

## Environment Variables

Create `.env.local`:

```bash
# Convex (auto-generated by npx convex dev)
CONVEX_DEPLOYMENT=your-deployment-id
VITE_CONVEX_URL=https://your-project.convex.cloud

# Optional: For AI features
ANTHROPIC_API_KEY=sk-...

# Optional: For image generation
GEMINI_API_KEY=...

# Optional: For newsletter
AGENTMAIL_API_KEY=...
```

---

## Deployment Options

### Railway (Recommended)
```bash
railway login
railway init
railway up
# Set custom domain in Railway dashboard
```

### Vercel
```bash
vercel --prod
# Set custom domain in Vercel dashboard
```

### Manual
```bash
npm run build
# Upload dist/ folder to any static host
```

---

## Checklist: New Project Setup

- [ ] Fork/clone repo
- [ ] Delete Skill Stack content
- [ ] Create new Convex project (`npx convex dev`)
- [ ] Update site config
- [ ] Run brand-identity-wizard
- [ ] Update .claude/CLAUDE.md for your project
- [ ] Create first post
- [ ] Generate thumbnail for first post
- [ ] Run `npm run sync`
- [ ] Deploy to Railway/Vercel
- [ ] Set custom domain
- [ ] Set up AgentMail for newsletter (optional)

---

## Common Issues

### "Convex sync fails"
- Make sure you ran `npx convex dev` to create YOUR project
- Check that `.env.local` has correct Convex URL

### "Images wrong aspect ratio"
- Use `gemini-3-pro-image-preview` model (not flash)
- Include `aspect_ratio: '16:9'` in config

### "Skills not downloading"
- Run `npm run sync:skills` to populate public/skills/
- Check that manifest.json exists at /skills/manifest.json

---

## For Ray Peat Specifically

Given what I know about the Ray Peat project:

1. **Content source**: You have a knowledge base of Ray Peat articles/transcripts
2. **Voice**: Academic but accessible, questioning mainstream
3. **Audience**: Health-conscious researchers, biohackers
4. **Skills to prioritize**:
   - Voice matching from Ray Peat's writing samples
   - RAG integration for the knowledge base
   - Citation/reference handling

Consider adding a `ray-peat-voice` skill after running voice-matching-wizard on his articles.

---

*This guide assumes familiarity with npm, git, and basic terminal commands. For absolute beginners, start with the lightweight-content-engine.md doc first.*
