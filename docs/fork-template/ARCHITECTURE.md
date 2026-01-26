# Building Lightweight Heavy-Hitting Content Engines

> Document what we're building here. This becomes a template for spinning up new media projects.

---

## The Architecture (Plain English)

### What is this?

A **static site** that loads fast because it's just HTML/CSS/JS files - no server processing each request. But it has **dynamic features** (newsletter signups, comments, search) thanks to Convex running in the background.

### The Parts

```
┌─────────────────────────────────────────────────────────────┐
│  YOUR COMPUTER                                               │
│  ┌─────────────────┐    ┌─────────────────┐                 │
│  │  content/       │    │  .claude/       │                 │
│  │  - blog posts   │    │  - skills       │                 │
│  │  - pages        │    │  - context      │                 │
│  │  (markdown)     │    │  (AI workflows) │                 │
│  └────────┬────────┘    └─────────────────┘                 │
│           │                                                  │
│           ▼                                                  │
│  ┌─────────────────┐                                        │
│  │  npm run sync   │  ← Reads markdown, pushes to database  │
│  └────────┬────────┘                                        │
└───────────┼─────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────┐
│  THE CLOUD                                                   │
│                                                              │
│  ┌─────────────────┐         ┌─────────────────┐            │
│  │  Convex         │         │  Railway/Vercel │            │
│  │  (database)     │◄───────►│  (hosting)      │            │
│  │  - posts        │         │  - static files │            │
│  │  - subscribers  │         │  - images       │            │
│  │  - comments     │         │  - skills       │            │
│  └─────────────────┘         └─────────────────┘            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### The Languages

| Layer | Technology | Why |
|-------|------------|-----|
| **Content** | Markdown | Write in any editor, version control with git |
| **Frontend** | React + TypeScript | Fast, component-based UI |
| **Build** | Vite | Blazing fast bundler (hence "markdown fast") |
| **Database** | Convex | Real-time, serverless, no backend code needed |
| **Hosting** | Railway or Vercel | Deploy with one command, free tier available |
| **AI Layer** | Claude + Skills | Workflows live in .claude/, reusable across projects |

### The Flow

1. **Write** - Create markdown files in `content/blog/`
2. **Sync** - Run `npm run sync` to push to Convex database
3. **Build** - Vite compiles React to static HTML/JS
4. **Deploy** - Railway serves the static files
5. **Dynamic** - Convex handles signups, comments, search in real-time

---

## What Makes It "Fast"

1. **Static files** - No server rendering each page request
2. **Markdown** - No CMS overhead, just text files
3. **Vite** - Sub-second hot reload during development
4. **CDN** - Railway/Vercel serve from edge locations globally
5. **Minimal JS** - React hydrates only what's needed

---

## What Makes It "Lightweight"

- **No CMS login** - Edit files locally, sync when ready
- **No database migrations** - Convex handles schema changes automatically
- **No server to maintain** - Serverless everything
- **No email infrastructure** - AgentMail handles newsletters
- **Content is files** - Git history, easy backup, portable

---

## What Makes It "Heavy-Hitting"

- **Skills compound** - Every workflow you build is reusable
- **Voice codified** - Brand identity defined once, used everywhere
- **SEO automated** - Scripts can audit and optimize
- **Images on demand** - Gemini generates thumbnails via skill
- **Newsletter built-in** - Subscriber capture without Mailchimp

---

## The Stack Choices Explained

### Why Convex over Firebase/Supabase?

- Real-time by default (subscribers update instantly)
- TypeScript end-to-end (catches errors before deploy)
- No SQL - just functions
- Free tier is generous

### Why Vite over Next.js?

- Simpler - no server-side rendering complexity
- Faster builds
- We don't need SSR for a blog (static is fine)

### Why Markdown over a CMS?

- Version control (git tracks every change)
- AI can read/write it easily
- Portable (move to any platform later)
- No lock-in

### Why Railway over Vercel?

- Better logs and debugging
- Slightly cheaper for hobby projects
- Either works fine

---

## Replicating This (Step by Step)

### 1. Clone the Template

```bash
# Assuming we publish markdown-site as a template
git clone https://github.com/your-repo/markdown-fast.git my-project
cd my-project
npm install
```

### 2. Set Up Convex

```bash
npx convex dev  # Creates account if needed, provisions database
```

### 3. Configure Your Site

```bash
npm run configure  # Interactive setup: site name, description, etc.
```

### 4. Add Your Content

```bash
# Create content/blog/my-first-post.md
# Add frontmatter: title, slug, description, date
# Write in markdown
```

### 5. Sync and Deploy

```bash
npm run sync        # Push content to Convex
npm run build       # Generate static files
railway up          # Deploy (or vercel --prod)
```

### 6. Customize Skills

Copy skills from Skill Stack marketplace into `.claude/skills/`:
- `brand-identity-wizard` - Define your voice
- `anti-ai-writing` - Keep content human
- `image-prompt-generator` - Generate thumbnails

---

## The Vision: Media Project Generator

A meta-skill that:

1. **Asks what you're building** - Newsletter? Podcast? YouTube? Course?
2. **Scaffolds the project** - Convex schema, folders, base skills
3. **Customizes skills** - Brand identity → voice skills → content skills
4. **Wires up distribution** - AgentMail for newsletter, social for promotion
5. **Generates starter content** - First post, about page, lead magnet

### The Dream User Journey

```
> Create a new media project

What are you building?
[x] Newsletter + Blog

What's your niche? "Regenerative health research"

What's your name/brand? "Ray Peat Insights"

→ Generates in 2 minutes:
  - Convex project with posts/subscribers schema
  - .claude/ folder with customized skills
  - Brand identity document
  - Voice skill (if you provide samples)
  - First 3 post drafts
  - AgentMail connected
  - Deploy to Railway
```

---

## Related Projects

- **Skill Stack** - The marketplace/teaching site (this project)
- **Authorized.ai** - Source capture tools (transcription, PDF-to-MD)
- **Ray Peat Insights** - Next project using this engine

---

## Skills to Build for the Generator

### Project Scaffolding
- `project-generator` - Creates folder structure, base config
- `convex-schema-generator` - Generates schema based on content types

### Content Engine
- `content-calendar-planner` - Maps out 4-8 weeks
- `batch-content-generator` - Multiple posts from outline
- `seo-optimizer` - Audits and improves posts

### Distribution
- `newsletter-launcher` - AgentMail setup, welcome sequence
- `social-proliferator` - Posts → social content

---

*This document serves as both explanation and roadmap. Update as the generator takes shape.*
