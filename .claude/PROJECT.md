# Skill Stack — Active Project File

> Temporary working file for current sprint. Delete sections as completed.

---

## Current Focus: MVP Launch

### Immediate Tasks
- [x] Run `npm run sync` to push blog posts to Convex
- [x] Add image fields to featured posts (pyramids, didion, voice, capture-book)
- [ ] Deploy to Railway (see instructions below)
- [ ] Test skills download on live site

### Railway Deploy Steps
1. Run `railway login` from terminal (opens browser)
2. `cd skill-stack && railway init` - create new project
3. `railway up` - deploy
4. Note the URL and update this file

### SEO & Thumbnails Sprint
- [x] Generate risograph thumbnails for featured posts
- [x] Update featured posts with new images
- [ ] Audit remaining posts for SEO optimization
- [ ] Add meta descriptions to posts missing them

### Lead Magnet
- [ ] Finalize 7 concepts (see drafts/7-ai-concepts-lead-magnet.md)
- [ ] Write teaser post (public)
- [ ] Write full guide (email-gated)
- [ ] Set up email gate in Convex

---

## Working Notes

### Image Generation

**CRITICAL: Use correct model for thumbnails**

| Model | API Name | Use For |
|-------|----------|---------|
| Flash | `gemini-2.5-flash-image` | Speed, drafts |
| **Pro** | `gemini-3-pro-image-preview` | **Thumbnails, 16:9, final assets** |

Only Pro supports `aspect_ratio` config. Always use Pro for thumbnails.

```python
response = client.models.generate_content(
    model='gemini-3-pro-image-preview',  # MUST use Pro
    contents=[prompt],
    config=types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        image_config=types.ImageConfig(
            aspect_ratio='16:9'
        )
    )
)
```

### Thumbnails Status

**Complete:**
- 4s-framework.png (prism-risograph-v2)
- didion.png
- pyramids.png
- voice-matching.png
- transform.png
- cyborg-writer.png
- rag.png
- mule.png
- chicken.png

**Workbench concepts (backup):**
- 4s-floating.png, 4s-prism.png, 4s-botanical.png, etc.

---

## Commands Reference

```bash
# Sync content to Convex
npm run sync

# Sync skills to public/skills/
npm run sync:skills

# Full sync (posts + discovery + skills)
npm run sync:all

# Generate image (use image-prompt-generator skill)
# See .claude/skills/image-prompt-generator/SKILL.md

# Local dev
npm run dev

# Railway deploy
railway login
railway init
railway up
```

---

## Links

- **Live site**: TBD (Railway URL pending)
- **Convex dashboard**: dashboard.convex.dev
- **GitHub**: github.com/cdeistopened/skill-stack

---

*Last updated: 2025-12-30*
