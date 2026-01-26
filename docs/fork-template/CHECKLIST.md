# New Project Checklist

Quick reference for spinning up a new site. See FORK-GUIDE.md for details.

---

## Setup (Do Once)

- [ ] Fork/clone skill-stack repo
- [ ] Delete Skill Stack content:
  - [ ] `rm -rf content/blog/*`
  - [ ] `rm -rf content/newsletters/*`
  - [ ] `rm -rf content/drafts/*`
  - [ ] `rm -rf public/images/thumbnails/*`
  - [ ] `rm -rf public/images/workbench/*`
  - [ ] `rm -rf public/skills/*`
  - [ ] `rm -rf public/raw/*`
- [ ] Create new Convex project: `npx convex dev`
- [ ] Update site config in `src/config.ts`
- [ ] Run `/brand-identity-wizard` in Claude Code
- [ ] Update `.claude/CLAUDE.md` for your project
- [ ] Delete `.claude/PROJECT.md` (or repurpose for your sprint)

---

## First Content

- [ ] Create first blog post in `content/blog/`
- [ ] Add frontmatter: title, slug, description, date, tags
- [ ] Mark as `featured: true`
- [ ] Generate thumbnail using image-prompt-generator skill
  - **CRITICAL**: Use `gemini-3-pro-image-preview` for 16:9
- [ ] Add `image: "/images/thumbnails/your-image.png"` to frontmatter
- [ ] Update `content/pages/about.md`
- [ ] Update `content/pages/contact.md`

---

## Deploy

- [ ] Run `npm run sync` - push content to Convex
- [ ] Run `npm run build` - generate static files
- [ ] Deploy:
  - Railway: `railway login && railway init && railway up`
  - OR Vercel: `vercel --prod`
- [ ] Note your URL
- [ ] Set custom domain (optional)

---

## Post-Launch

- [ ] Test newsletter signup
- [ ] Test skills download (if keeping marketplace)
- [ ] Set up AgentMail (if using newsletter)
- [ ] Create 2-3 more posts
- [ ] Generate thumbnails for each

---

## Skills to Run First

1. `/brand-identity-wizard` - Define voice and audience
2. `/voice-matching-wizard` - If you have writing samples
3. Use `anti-ai-writing` skill on all content

---

## Files to Customize

| File | What to Change |
|------|----------------|
| `.claude/CLAUDE.md` | Project context, philosophy |
| `.claude/NARRATIVE.md` | Your thesis (optional) |
| `.claude/AUTHOR.md` | Your bio |
| `src/config.ts` | Site name, URL, description |
| `content/pages/about.md` | About page content |
| `content/pages/contact.md` | Contact info |

---

## Image Generation Reminder

```python
# ALWAYS use Pro model for thumbnails
model='gemini-3-pro-image-preview'

# ALWAYS include aspect ratio
image_config=types.ImageConfig(aspect_ratio='16:9')
```

---

*Print this out or keep it open while setting up your new project.*
