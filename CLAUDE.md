# Skill Stack

> The meta-skill for the AI age: teaching people how to work *with* AI, not be replaced by it.

---

## What This Is

**Skill Stack** is one brand, multiple surfaces:

| Surface | What It Is |
|---------|------------|
| **skillstack.md** | Blog + discovery + newsletter signup |
| **Stack** | Cloud workbench - experiment with skills, import knowledge, create/share |
| **Marketplace** | GitHub-backed skill registry with discovery layer |
| **Newsletter** | Weekly skill deep-dives (Beehiiv) |
| **Anyone Can Claude Code** | Onboarding flow for beginners |

**Core Thesis:** Model intelligence is no longer the bottleneck. Context engineering is.

Everyone has access to the same AI models. The differentiator is your raw material, your voice, your workflows encoded as skills, and your ability to orchestrate AI across multi-step creative processes.

---

## Folder Map

```
skill-stack/
│
├── CLAUDE.md                 # Project context
├── NOW.md                    # Session state
│
├── studio/                   # Creative workspace
│   ├── drafts/              # Blog post drafts
│   ├── references/          # IDENTITY.md, STACK_VISION.md, etc.
│   ├── plans/               # MASTER_STRATEGY.md + supporting plans
│   ├── podcast/             # Podcast production (Lewis Kallow, etc.)
│   └── projects/            # Subprojects
│       ├── anyone-can-claude-code/
│       ├── beehiiv-launch/
│       ├── newsletters/     # Bangor Bulletin
│       └── videos/          # Remotion projects
│
├── app/                      # Website infrastructure
│   ├── content/             # Published content (synced to Convex)
│   │   ├── blog/           # Published posts (38+)
│   │   └── pages/          # Static pages
│   ├── src/                 # React components
│   ├── convex/              # Database functions
│   ├── scripts/             # Sync scripts
│   ├── public/              # Static assets, images
│   ├── docs/                # Setup documentation
│   └── package.json, vite.config.ts, etc.
│
├── .claude/                  # Claude Code config
│   └── skills/              # Skills (80+ folders)
│
└── .archive/                 # Archived projects (Spiral, writers-ide-research)
```

### Quick Reference Table

| What | Location |
|------|----------|
| **Blog content** | `app/content/blog/` |
| **Drafts** | `studio/drafts/` |
| **Strategic plans** | `studio/plans/` (MASTER_STRATEGY.md is primary) |
| **References** | `studio/references/` (IDENTITY.md, STACK_VISION.md) |
| **Subprojects** | `studio/projects/` |
| **Skills** | `.claude/skills/` |
| **App source** | `app/src/`, `app/convex/`, `app/scripts/` |
| **Images** | `app/public/images/` |

---

## Quick Reference

| Key | Value |
|-----|-------|
| **Domain** | skillstack.md |
| **Hosting** | Railway (auto-deploys from GitHub push) |
| **Database** | Convex (brainy-kiwi-505 = prod, dusty-sardine-185 = dev) |
| **Newsletter** | Beehiiv (migrated from AgentMail) |
| **GitHub** | github.com/cdeistopened/skill-stack |

---

## The Philosophy (Four Pillars)

### 1. Transform, Don't Generate
AI refines human ideas, not replaces them. Your raw material is the secret ingredient.

### 2. Flow, Not Code
Dictation + beginner's mind. 900,000 words in Wispr Flow. English is the hottest programming language.

### 3. Wide, Not Deep
Conduct multiple threads. Zoom in to fix, zoom out to see the whole. The conductor, not the monk.

### 4. Liberation, Not Replacement
AI as tool of distribution, not concentration. The distributist moment. Own your tools.

---

## The Ethos

**Deep content. Not AI influencer bullshit.**

Skill Stack isn't about becoming an "AI influencer" - that's hollow performance. The goal is to stay a writer, maintain humanity, and keep up with the tools without losing the craft.

- Write things worth reading
- Use AI to amplify, not replace, your voice
- Skepticism of hype, focus on substance
- The writer's soul comes first; the tools serve it

See [IDENTITY.md](studio/references/IDENTITY.md) for full principles.

---

## The 4S Framework

| Element | What It Means | System Component |
|---------|---------------|------------------|
| **Source** | Raw material: transcripts, notes, imports | `content/raw/` |
| **Substance** | The core insight, indexed knowledge | Corpus, RAG layer |
| **Structure** | How things work, workflows | CLAUDE.md + NOW.md protocol |
| **Style** | Voice, transformation patterns | `.claude/skills/` |

---

## Writing Guidelines

**ALWAYS load `skills/writing-style/SKILL.md` for any writing task.**

### Hard Rules
- **No correlative constructions** ("X isn't just Y - it's Z") - the #1 AI tell
- **Prose style**: Sweeney's meets Didion meets Pirate Wires
- **10th grade reading level**. Vary sentence length. Fragments for punch.
- **Headers sparingly**. Let prose breathe.
- **No emojis** unless user specifically requests them.

### Words to Avoid
delve, comprehensive, crucial, vital, leverage, landscape, navigate, foster, facilitate, realm, paradigm, embark, journey, tapestry, myriad, multifaceted, seamless, cutting-edge

---

## Stack: The Cloud Workbench

See `studio/plans/MASTER_STRATEGY.md` for full vision.

**Stack** is the cloud-hosted environment where users can:
1. **Experiment with skills** - Try before installing locally
2. **Import knowledge** - YouTube transcripts, PDFs, RSS feeds
3. **Create skills** - Guided wizard for building custom skills
4. **Share skills** - Push to GitHub, get discovered in marketplace

This replaces the earlier "Writer's IDE" / "Corpus" desktop app vision. Web-first for distribution.

### Go-to-Market: DFY Service
Target: People who would otherwise hire ghostwriters.
- Scrape existing content, build corpus, create voice skill
- Set up skills for their recurring content types
- Train them on the workflow
- **$2,000-5,000 setup fee** (Expert-to-Skill service)

---

## The App Stack

This project is a **React + Vite + Convex** web app forked from a markdown site template.

### Architecture
```
YOUR COMPUTER                              THE CLOUD
--------------                             ---------
content/          npm run sync             Convex (database)
  - blog posts    ------------->           - posts
  - pages                                  - subscribers
  (markdown)                               - comments
                                               |
.claude/                                       v
  - skills                                 Railway (hosting)
  - context                                - static files
  (AI workflows)                           - images
                                           - skills
```

### Key Commands
```bash
npm run dev              # Local development
npm run sync             # Sync content to Convex (dev)
npm run sync:prod        # Sync to production
npm run sync:skills      # Sync skills to public/skills/
npm run sync:all         # Full sync (posts + discovery + skills)
npx convex deploy --yes  # Deploy Convex functions to production
```

See `docs/fork-template/ARCHITECTURE.md` for full setup documentation.

---

## Strategic Insights

### The Sparse Theory
> **Spiral is a wizard that asks you what you're trying to say, remembers how you say it, and helps you say it better - one skill at a time.**

### Four Irreducible Pillars
1. **Wizard** - Questioning interface that extracts substance
2. **Substance** - The core insight being expressed
3. **Voice** - Captured writing style (the differentiator)
4. **Skills** - Modular transformation cartridges

### The Moat
Skills are markdown - infinitely copyable. The moat isn't skills themselves. It's:
- **Refinement data** - Which questions work, which combinations succeed
- **Personal corpus** - Your indexed content is unique
- **Voice codification** - Your specific voice skill
- **Workflow muscle memory** - Habits that compound

### Three Traps to Avoid
1. Building for imagined users vs. real demand
2. Comprehensiveness over sparse clarity
3. Social layer fantasy before individual power works

---

## The Author

**Charlie Deist** (@chdeist)
- Head of Content at OpenEd
- Producer for the Naval Podcast
- Background in ghostwriting, podcast production, content transformation
- Lives in rural California with his family

See [IDENTITY.md](studio/references/IDENTITY.md) for full context.

---

## Key References

- [IDENTITY.md](studio/references/IDENTITY.md) - Author, voice, philosophy, brand
- [STACK_VISION.md](studio/references/STACK_VISION.md) - Architecture, 4S framework, Ralph loops
- [MASTER_STRATEGY.md](studio/plans/MASTER_STRATEGY.md) - Consolidated strategic plan
- [CONTENT_INDEX.md](studio/references/CONTENT_INDEX.md) - All content by topic

---

## Sub-Projects

### Studio Projects (in studio/projects/)
- **Videos** - Remotion projects. Use `remotion-video` skill.
- **Bangor Bulletin** - Local rural newsletter case study
- **Anyone Can Claude Code** - Tutorial/guide for beginners
- **Beehiiv Launch** - Newsletter platform migration

### YouTube Channel
Video content teaching the skills philosophy. Strategy in `studio/plans/youtube-video-strategy.md`. Goal: 100K subscribers by Dec 2026. Format: "One Skill" Shorts series + weekly long-form.

### Related (Outside skill-stack/)
- **Corpus** (`../corpus/`) - Archived. Desktop app vision absorbed into Stack (cloud-first).
- **Doodle Reader** (`../doodle-reader/`) - Import utilities for PDFs, transcripts, RSS. Feeds into Stack.

---

## Environment Files

- `.env.local` - Dev Convex URL
- `.env.production.local` - Prod Convex URL (brainy-kiwi-505.convex.cloud)

---

*See NOW.md for current session state.*
*Last updated: 2026-01-24*
