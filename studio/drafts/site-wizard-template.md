# Site Wizard Template

> A fork of markdown-site that unpacks itself and guides you through customization.

## The Concept

When you clone this template, you get a wizard-like experience:
1. Run a setup command
2. Answer questions about your site
3. The wizard updates all the right files
4. Removes itself when done (no artifacts)

Like unpacking a self-extracting archive, but for a website.

---

## Fork Strategy

**Source:** https://github.com/waynesutton/markdown-site.git

**Changes for our fork:**

### 1. Deployment: Railway instead of Netlify

| Original | Our Fork |
|----------|----------|
| `netlify.toml` | `railway.json` or Procfile |
| Netlify edge functions | Railway deployment |
| Netlify-specific configs | Railway environment setup |

**Files to modify/replace:**
- [ ] Remove `netlify.toml`
- [ ] Remove `netlify/` folder (edge functions)
- [ ] Add `railway.json` with deployment config
- [ ] Update README with Railway deploy instructions

### 2. Site Identity (The Wizard Checklist)

Everything that needs customization per-site:

#### index.html (Meta & SEO)
- [ ] `<title>` tag
- [ ] `<meta name="description">`
- [ ] `<meta name="author">`
- [ ] `<meta name="keywords">`
- [ ] `<meta property="og:title">`
- [ ] `<meta property="og:description">`
- [ ] `<meta property="og:url">`
- [ ] `<meta property="og:site_name">`
- [ ] `<meta property="og:image">` (and twitter:image)
- [ ] `<meta property="twitter:domain">`
- [ ] `<meta property="twitter:url">`
- [ ] JSON-LD structured data (name, url, description, author)

#### Favicon & Icons
- [ ] `/favicon.svg` - Replace with site icon
- [ ] `/public/logo.svg` - Site logo
- [ ] `/public/images/og-default.png` - Default social share image (1200x630)
- [ ] Apple touch icon (if needed)

#### siteConfig.ts
- [ ] `name` - Site name
- [ ] `title` - Tagline
- [ ] `logo` - Path to logo image
- [ ] `bio` - Short description
- [ ] `fontFamily` - serif/sans/monospace
- [ ] `gitHubRepo.owner` - GitHub username
- [ ] `gitHubRepo.repo` - Repo name
- [ ] `footer.defaultContent` - Footer text with links
- [ ] `socialFooter.socialLinks` - Social media links
- [ ] `socialFooter.copyright.siteName` - Copyright name
- [ ] `newsletter.signup.home.title` - Newsletter headline
- [ ] `newsletter.signup.home.description` - Newsletter description
- [ ] `hardcodedNavItems` - Navigation structure

#### Convex
- [ ] `convex.json` - Project name
- [ ] Environment variables in Convex dashboard:
  - `AGENTMAIL_API_KEY`
  - `AGENTMAIL_INBOX`
  - (others as needed)

#### Content
- [ ] Remove all `/content/blog/*.md` files (or replace with starter post)
- [ ] Remove all `/content/pages/*.md` files (or replace with starter pages)
- [ ] Update or remove `/public/raw/*.md` files
- [ ] Clear `/public/images/thumbnails/` (except template examples)

#### Other Files
- [ ] `package.json` - Update name, description, repository
- [ ] `README.md` - Replace with new site's readme
- [ ] `.env.local` / `.env.production.local` - Convex URLs

---

## The Wizard Script

Create a setup script that:

```bash
npm run setup
# or
npx tsx scripts/setup-wizard.ts
```

### Wizard Flow

```
┌─────────────────────────────────────────────────────────┐
│                   SITE WIZARD                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Welcome! Let's set up your new site.                   │
│                                                         │
│  Site name: [Bangor Bulletin]                           │
│  Tagline: [Axios for the Foothills]                     │
│  Domain: [bangorbulletin.com]                           │
│  Author name: [Charlie Deist]                           │
│  Author Twitter: [@chdeist]                             │
│  Font style: [sans / serif / mono]                      │
│                                                         │
│  GitHub username: [cdeistopened]                        │
│  GitHub repo name: [bangor-bulletin]                    │
│                                                         │
│  Newsletter enabled? [Y/n]                              │
│  Newsletter headline: [Don't drive to check the board]  │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  Creating files...                                      │
│  ✓ Updated index.html                                   │
│  ✓ Updated siteConfig.ts                                │
│  ✓ Created favicon placeholder                          │
│  ✓ Cleared sample content                               │
│  ✓ Updated package.json                                 │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  MANUAL STEPS REMAINING:                                │
│  [ ] Create og-default.png (1200x630) in /public/images │
│  [ ] Create favicon.svg in root                         │
│  [ ] Create logo.png in /public/images                  │
│  [ ] Set up Convex project: npx convex dev              │
│  [ ] Add env vars to Convex dashboard                   │
│  [ ] Deploy to Railway                                  │
│                                                         │
│  Run `npm run check-setup` to verify all steps done.    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Check Script

```bash
npm run check-setup
# or
npx tsx scripts/check-setup.ts
```

Verifies:
- [ ] All placeholder text replaced
- [ ] No "Skill Stack" or "markdown-site" references remaining
- [ ] Required images exist
- [ ] Convex configured
- [ ] No sample blog posts remaining

---

## File Structure for Fork

```
markdown-site-template/
├── .claude/
│   └── CLAUDE.md              ← Template instructions for AI
├── scripts/
│   ├── setup-wizard.ts        ← Interactive setup
│   ├── check-setup.ts         ← Verification script
│   └── sync-posts.ts          ← Existing sync script
├── content/
│   └── blog/
│       └── .gitkeep           ← Empty, ready for content
├── public/
│   ├── images/
│   │   ├── thumbnails/.gitkeep
│   │   └── REPLACE-og-default.png  ← Placeholder reminder
│   ├── REPLACE-favicon.svg    ← Placeholder reminder
│   └── REPLACE-logo.svg       ← Placeholder reminder
├── src/
│   └── config/
│       └── siteConfig.ts      ← With PLACEHOLDER values
├── railway.json               ← Railway deployment config
├── SETUP.md                   ← Human-readable setup guide
└── README.md                  ← Template readme
```

---

## Placeholder Convention

Use obvious placeholders that grep can find:

```typescript
// siteConfig.ts
name: "SITE_NAME_PLACEHOLDER",
title: "SITE_TAGLINE_PLACEHOLDER",
bio: "SITE_BIO_PLACEHOLDER",
```

```html
<!-- index.html -->
<title>SITE_NAME_PLACEHOLDER - SITE_TAGLINE_PLACEHOLDER</title>
<meta property="og:url" content="https://SITE_DOMAIN_PLACEHOLDER/" />
```

The wizard replaces these. The check script verifies none remain.

---

## Railway Deployment

### railway.json

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run preview",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100
  }
}
```

### Alternative: Use Vite preview

```json
{
  "scripts": {
    "build": "tsc && vite build",
    "preview": "vite preview --host --port ${PORT:-4173}"
  }
}
```

---

## Sites to Create with This Template

| Site | Domain | Status |
|------|--------|--------|
| Skill Stack | skillstack.md | ✅ Live (original) |
| Bangor Bulletin | bangorbulletin.com | 🔲 Planned |
| (future sites) | ... | ... |

---

## Next Steps

1. [ ] Fork waynesutton/markdown-site to cdeistopened/site-template
2. [ ] Remove Netlify configs, add Railway
3. [ ] Create setup-wizard.ts script
4. [ ] Create check-setup.ts script
5. [ ] Replace content with placeholders
6. [ ] Test by creating Bangor Bulletin site
7. [ ] Document in SETUP.md

---

## The Meta Point

This template IS a skill - a reusable, modular transformation that takes inputs (your site details) and produces outputs (a configured website). It's the wizard pattern applied to infrastructure.

Same philosophy:
- Don't repeat yourself
- Capture the pattern once
- Let the system guide you through customization
- No artifacts left behind

---

*This could become a Skill Stack blog post: "The Site Wizard: How I Deploy New Projects in 10 Minutes"*
