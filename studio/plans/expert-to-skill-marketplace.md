# Expert-to-Skill Marketplace

> GitHub for AI skills, but we also run the refinery.

---

## The Problem

Everyone's building skills marketplaces. Nobody's solving the **supply problem**.

Where do skills come from? Right now: people who already know Claude Code write them for themselves. That's a tiny population - maybe a few thousand people globally who understand the SKILL.md format, know how to structure workflows, and have tested them in production.

Meanwhile, millions of experts have valuable methodologies locked in their content - podcasts, YouTube videos, tweets, books, courses. They'll never learn Claude Code. Their knowledge stays trapped in long-form content that's hard to apply.

---

## The Insight

**Any expert's methodology can become a skill.** They don't need to know Claude Code. They just need content.

The unlock isn't building another marketplace. It's building a **refinery** that turns expert content into installable skills.

---

## The Vision

### What We're Building

A GitHub-native skills marketplace with four layers:

1. **The Refinery** - Pipeline that extracts expert methodologies from content and packages them as skills
2. **The Registry** - GitHub-backed skill repository with social discovery layer
3. **The Installer** - Wizard that handles dependencies and makes any skill portable
4. **The Sandbox** - Cloud-hosted environment to test skills without local installation

### What Makes This Different

| Other Marketplaces | Skill Stack |
|-------------------|-------------|
| Wait for developers to submit | Actively create skills from expert content |
| Generic skills for generic tasks | Expert-specific skills ("Naval's decision framework") |
| Install and hope it works | Portability scoring + install wizard |
| Build reputation from scratch | Leverage GitHub stars as social proof |

---

## The Pipeline

```
EXPERT CONTENT              THE REFINERY                 INSTALLABLE SKILL
---------------             ------------                 -----------------

YouTube videos        →                              →   voice-matching-wizard
Podcast episodes      →     1. Transcribe            →   cold-open-creator
Twitter threads       →     2. Extract methodology   →   anti-ai-writing
Books/articles        →     3. Codify workflow       →   hook-and-headline-writing
Courses               →     4. Package + test        →   naval-decision-making
                            5. Document deps

                                    ↓

                          GitHub repo with stars
                          Install wizard handles deps
                          Portability score displayed
```

### Pipeline Steps (Detailed)

**1. Source Capture**
- Transcribe video/audio content (bulk-transcribe skill)
- Scrape written content (threads, articles)
- OCR books/PDFs if needed
- Output: Raw markdown corpus

**2. Methodology Extraction**
- Identify the expert's core frameworks
- Find the repeatable patterns
- Extract decision trees, checklists, principles
- Output: Structured methodology document

**3. Workflow Codification**
- Translate methodology into SKILL.md format
- Identify when the skill should trigger
- Define inputs, outputs, quality gates
- Output: Draft skill

**4. Packaging + Testing**
- Test skill against real use cases
- Refine based on outputs
- Add examples (the most important part)
- Output: Production-ready skill

**5. Dependency Documentation**
- Identify external requirements (APIs, MCPs, tools)
- Write install wizard prompts
- Assign portability score
- Output: Complete skill package

---

## Portability as First-Class Concept

Every skill gets a portability rating displayed prominently:

| Rating | Icon | Meaning | Install Experience | Example |
|--------|------|---------|-------------------|---------|
| **Instant** | ⚡ | Pure markdown, works anywhere | Download and use | `anti-ai-writing` |
| **Light Setup** | 🔧 | Needs 1-2 env vars or CLI tools | 2-minute wizard | `youtube-downloader` |
| **MCP Required** | 🔌 | Needs MCP server configured | 5-minute wizard | `notion-knowledge-capture` |
| **Infrastructure** | 🏗️ | Needs external services/APIs | Guided setup | `bulk-transcribe` |

### The Install Wizard

When you download a skill that isn't "Instant":

```
┌─────────────────────────────────────────────────────┐
│  Installing: bulk-transcribe                        │
│  Portability: 🏗️ Infrastructure                     │
│                                                     │
│  This skill requires:                               │
│  ┌─────────────────────────────────────────────┐   │
│  │ ☐ Gemini API key (for transcription)        │   │
│  │ ☐ yt-dlp installed (for YouTube download)   │   │
│  │ ☐ ffmpeg installed (for audio processing)   │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  [Set up now]  [Skip - I'll configure later]       │
└─────────────────────────────────────────────────────┘
```

The wizard:
- Detects what's already configured
- Walks through each missing dependency
- Stores API keys securely (in .env or system keychain)
- Validates the setup works before completing

---

## The Social Layer

### GitHub as Backbone

Skills live in GitHub repos. This gives us:
- Version control for free
- Stars as reputation signal
- Forks for customization
- Issues for feedback
- PRs for community contributions

We don't rebuild this infrastructure. We add a discovery layer on top.

### Discovery Layer (skillstack.md/explore)

**Browse:**
- Categories: Writing, Production, Research, Development, Business
- Portability filter: "Show only ⚡ Instant skills"
- Sort by: Stars, Recent, Trending

**Skill Card:**
```
┌────────────────────────────────────────────────┐
│  anti-ai-writing                          ⭐ 847 │
│  by @chdeist                                    │
│                                                 │
│  Transform AI drafts into authentic prose.     │
│  Detects and eliminates AI tells.              │
│                                                 │
│  ⚡ Instant    |    Writing    |    v2.3       │
│                                                 │
│  [View on GitHub]  [Install]  [Preview]        │
└────────────────────────────────────────────────┘
```

**Profiles:**
- Link to GitHub handle
- Skills created (with star counts)
- Skills used (opt-in)
- Total stars across portfolio

### The Status Game

"I have 500 stars on my skills" becomes a signal of expertise.

Leaderboards:
- Top skill creators (by total stars)
- Rising skills (fastest growing)
- Most installed this week

This creates a flywheel:
1. Creator builds useful skill
2. Users star it
3. Stars drive more discovery
4. Creator builds more skills
5. Creator's profile becomes valuable

---

## Business Model

### Free Tier
- Browse and install any public skill
- Create and publish skills
- GitHub stars drive discovery
- No limits on usage

### Skills Guild ($29/month)
- Early access to new skills (1 week before public)
- Request skills from specific experts ("I want a Naval skill")
- Private Discord community
- Priority support for install issues
- Badge on profile
- **Revenue share eligibility** (see Creator Economics below)

### Expert-to-Skill Service ($2,000-5,000)
For creators who want their methodology packaged:
- We scrape/transcribe their content
- Extract and codify their methodology
- Package as production-ready skill
- They get: the skill + attribution + optional royalty share
- Ongoing maintenance included

**Target customers:**
- YouTubers with valuable frameworks but no technical skills
- Course creators who want to extend their reach
- Authors promoting methodology books
- Consultants who want to productize their process

### Enterprise (Custom pricing)
- Private skill repos for companies
- "Turn your top performer's workflow into a skill for the whole team"
- SSO, audit logs, admin controls
- Dedicated support

---

## Creator Economics

### The Flywheel

The marketplace only works if creators are incentivized to build and maintain skills. We need a model where:
1. Good skills get discovered
2. Popular skills earn rewards
3. Rewards motivate more/better skills
4. More skills attract more users
5. More users = more stars = more discovery

### Revenue Share Model

**Pool:** 30% of Guild subscription revenue goes to creator pool

**Distribution:** Proportional to "skill points" earned that month

**Skill Points Calculation:**
```
Monthly Points = (GitHub Stars × 1) + (Installs × 2) + (Active Users × 5)

Where:
- GitHub Stars = total stars on skill repo
- Installs = new installs that month
- Active Users = users who ran the skill 3+ times that month
```

**Example:**
- Guild has 1,000 members × $29 = $29,000/month
- Creator pool = $8,700/month (30%)
- Creator A has 500 stars, 200 installs, 50 active users = 500 + 400 + 250 = 1,150 points
- If total points across all creators = 11,500, Creator A gets 10% = $870/month

### Thresholds

| Tier | Requirement | Benefits |
|------|-------------|----------|
| **Contributor** | 1+ public skill | Listed in registry, can earn points |
| **Creator** | 100+ total stars | Revenue share eligible, creator badge |
| **Expert** | 500+ total stars | Featured placement, early access to tools |
| **Legend** | 2,000+ total stars | Advisory input, custom support, speaking opps |

### Remixes and Forks

Skills are open source. Forks are encouraged. But how do we handle attribution and revenue?

**Fork Rules:**
1. **Attribution required** - Forked skills must credit original
2. **Points split** - Original creator gets 20% of fork's points
3. **Divergence threshold** - After 50%+ changes, fork becomes "inspired by" (10% to original)
4. **Hostile forks** - Community can flag; disputes resolved by committee

**Example:**
- Alice creates `anti-ai-writing` (500 stars)
- Bob forks it as `anti-ai-writing-for-academics` (100 stars)
- Bob earns 80% of his skill's points
- Alice earns 20% of Bob's points (for originating the idea)

### Iteration Incentives

We want skills to improve over time, not rot.

**Maintenance bonus:** +10% points for skills updated in last 30 days

**Version milestones:**
- v1.0 = baseline
- v2.0 (major update) = featured in "Updated Skills" for 1 week
- Community PRs merged = shared points with contributor

### Expert Revenue Share

For skills created through the Expert-to-Skill service:

| Model | Expert Gets | Skill Stack Gets |
|-------|-------------|------------------|
| **One-time** | Skill + attribution | All revenue share |
| **Revenue split** | 50% of skill's points | 50% of skill's points |
| **Advance + split** | $1,000 upfront + 30% | 70% of skill's points |

Expert chooses model at creation time. Can renegotiate after 12 months.

---

## Remix Culture

### Why Remixes Matter

Skills aren't static. The best skills evolve through community iteration:
- Someone adapts a writing skill for academic tone
- Someone adds MCP integration to a standalone skill
- Someone translates a skill to work with different file formats

We want to encourage this while respecting original creators.

### Remix Types

| Type | Definition | Attribution | Revenue Split |
|------|------------|-------------|---------------|
| **Fork** | Direct copy with modifications | Required, prominent | 80/20 (fork/original) |
| **Adaptation** | Same methodology, different domain | Required | 90/10 |
| **Inspiration** | Conceptually similar, rebuilt | Encouraged | 100/0 |
| **Chain** | Uses another skill as dependency | Automatic (via install) | Separate (each skill earns independently) |

### Skill Chains

Some skills work best in sequence:
```
transcript-polisher → cold-open-creator → video-caption-creation
```

**Chain mechanics:**
- Skills can declare dependencies in SKILL.md frontmatter
- Install wizard handles the full chain
- Each skill in chain earns points independently
- "Chain creator" (person who documents the chain) gets bonus points

**Example chain definition:**
```yaml
---
name: podcast-to-clips
dependencies:
  - transcript-polisher
  - cold-open-creator
  - video-caption-creation
chain_creator: @chdeist
---
```

### Versioning and Compatibility

**Semantic versioning required:**
- MAJOR.MINOR.PATCH
- Major = breaking changes
- Minor = new features, backward compatible
- Patch = bug fixes

**Compatibility declarations:**
```yaml
---
name: anti-ai-writing
version: 2.3.1
requires:
  claude: ">=3.5"
  mcp: false
compatible_with:
  - writing-style@^1.0
  - ghostwriter@^2.0
---
```

**Update notifications:**
- Users notified when installed skill has update
- Breaking changes require explicit upgrade
- Auto-update available for patch versions

---

## Cloud Sandbox ("Try Before Install")

### The Problem

Current skill testing requires:
1. Install Claude Code locally
2. Configure environment (API keys, MCPs)
3. Download the skill
4. Test against your files
5. Decide if it's useful

Most people bounce at step 1. They'll never discover if a skill is valuable because the setup cost is too high.

### The Solution

A cloud-hosted Claude Code environment where users can:
- Upload their files (or connect Google Drive/Dropbox)
- Select a skill from the marketplace
- Run the skill against their content
- See the output immediately
- No local installation required

**The flow:**
```
┌─────────────────────────────────────────────────────────────┐
│  skillstack.md/explore                                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  anti-ai-writing                              ⭐ 847   │   │
│  │  Transform AI drafts into authentic prose             │   │
│  │                                                        │   │
│  │  [View Details]  [Install]  [▶ Try Now]               │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                   │
│                    Click "Try Now"                           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Cloud Sandbox                                               │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Upload your file(s)                                 │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │  📄 blog-draft.md                           │    │    │
│  │  │  📄 newsletter-copy.md                      │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │                                                      │    │
│  │  [Run anti-ai-writing]                              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  Output:                                                     │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ✓ Removed 3 correlative constructions              │    │
│  │  ✓ Replaced 7 hedge words                           │    │
│  │  ✓ Simplified 2 passive voice sentences             │    │
│  │                                                      │    │
│  │  [View diff]  [Download result]  [Install skill]    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Technical Architecture

**Option A: VPS-hosted Claude Code Gateway**

Based on existing patterns (Railway, Fly.io, Hetzner):
- Gateway runs on VPS, owns workspace
- User connects via browser Control UI
- Ephemeral workspaces per session
- Files uploaded, processed, results returned, workspace deleted

**Pros:** Full Claude Code capabilities, all skills work
**Cons:** Compute cost per session, cold start latency

**Option B: Lightweight skill runner (custom)**

Build a minimal skill execution environment:
- Parse SKILL.md for workflow
- Execute against uploaded files
- Return results via API
- No full Claude Code installation needed

**Pros:** Faster, cheaper, more controlled
**Cons:** Limited to "pure" skills (no MCP, no complex tools)

**Option C: Hybrid**

- Lightweight runner for ⚡ Instant portability skills
- Full VPS sandbox for 🔧🔌🏗️ skills
- Smart routing based on skill requirements

### Usage Limits

**Free tier:**
- 3 sandbox runs per day
- Max 10MB file upload
- Results expire in 24 hours

**Guild members:**
- Unlimited sandbox runs
- Max 100MB file upload
- Persistent workspace option
- Priority queue (no cold starts)

### Prior Art / References

- **Zoo Computer** - Remote computer service for AI agents
- **Railway** - One-click VPS with browser setup
- **Fly.io** - Edge-deployed containers
- **exe.dev** - VM + HTTPS proxy pattern
- **Replit** - Browser-based development environment (similar UX model)

### Open Questions

1. **Compute economics:** What's the cost per sandbox session? Can we make free tier sustainable?
2. **Security:** How do we prevent abuse? Sandboxing uploaded files?
3. **State persistence:** Do Guild members get persistent workspaces? What's the storage model?
4. **Skill compatibility:** What percentage of skills can run in lightweight mode vs. need full VPS?
5. **Cold start:** How do we minimize latency for first-time users?

### MVP Scope

**V1 (Proof of concept):**
- Single Railway instance
- 3 hand-picked skills that work without MCPs
- Simple file upload → run → download flow
- Guild members only (controls usage)

**V2 (Public beta):**
- Auto-scaling containers
- All ⚡ Instant skills supported
- Google Drive / Dropbox integration
- Free tier with limits

**V3 (Full product):**
- Full VPS sandbox for complex skills
- Persistent workspaces for Guild
- API access for programmatic testing

---

## Competitive Landscape

### skills.sh (Vercel)
- General-purpose skills marketplace
- Developer-focused
- No supply-side solution
- **Gap we fill:** Expert-to-skill pipeline, portability layer

### Anthropic's skill format
- The underlying standard we build on
- They're focused on the runtime, not distribution
- **Gap we fill:** Discovery, social, install wizard

### Course platforms (Maven, Teachable, etc.)
- Experts sell courses
- One-time learning, not ongoing tool
- **Gap we fill:** Turn course content into reusable skill

### Prompt marketplaces (PromptBase, etc.)
- Selling prompts, not workflows
- No portability concept
- No methodology extraction
- **Gap we fill:** Skills > prompts, full workflows > one-shots

---

## Unfair Advantages

### 1. Existing Corpus
80+ production-tested skills already built. Not starting from zero.

### 2. The Wiki Projects
Ray Peat wiki, etc. = prototype of expert-to-skill extraction. Already done the hard R&D.

### 3. Production Credentials
Naval Podcast producer, OpenEd content lead. Real experience at scale, not theory.

### 4. The Meta-Skill
`skill-creator` skill that teaches how to build skills. We can train others on the pipeline.

### 5. Potential Flagship Skills
Naval's frameworks are sitting in hundreds of hours of podcast content. With the right relationship, "Naval's Decision-Making Skill" could be the flagship that proves the concept.

---

## Roadmap

### Phase 1: Foundation (Now - 2 months)

**Public GitHub repo**
- [ ] Clean up existing 80+ skills for public release
- [ ] Consistent README format across all skills
- [ ] Portability ratings assigned to each
- [ ] LICENSE file (MIT or similar)

**Install wizard prototype**
- [ ] Bash script that detects missing deps
- [ ] Prompts for API keys, stores in .env
- [ ] Validates setup before completing
- [ ] Works for top 10 most complex skills

**Discovery page MVP**
- [ ] skillstack.md/explore
- [ ] Pull skill metadata from GitHub
- [ ] Display stars, categories, portability
- [ ] Link to install instructions

### Phase 2: Pipeline (2-4 months)

**Expert-to-skill pipeline documentation**
- [ ] Step-by-step guide for the extraction process
- [ ] Templates for each pipeline stage
- [ ] Quality checklist for production-ready skills

**3-5 celebrity skills**
- [ ] Identify experts with extractable methodologies
- [ ] Get permission / partnership agreement
- [ ] Run full pipeline
- [ ] Launch with attribution

**Refined installer**
- [ ] NPM package or CLI tool
- [ ] `npx install-skill anti-ai-writing`
- [ ] Interactive wizard with better UX
- [ ] Handles MCP configuration

### Phase 3: Social + Monetization (4-6 months)

**Profiles**
- [ ] Link GitHub account
- [ ] Display skill portfolio
- [ ] Star aggregation
- [ ] "Skills I use" opt-in

**Skills Guild launch**
- [ ] Stripe integration
- [ ] Member-only early access
- [ ] Discord community
- [ ] Request queue for expert skills

**Expert-to-skill service**
- [ ] Landing page + intake form
- [ ] Pricing tiers based on content volume
- [ ] Partnership agreement template
- [ ] First 3 paying customers

### Phase 4: Scale (6-12 months)

**Community contributions**
- [ ] Guidelines for submitting skills
- [ ] Review process for quality
- [ ] Contributor recognition

**Enterprise pilot**
- [ ] Private repo feature
- [ ] Admin dashboard
- [ ] First enterprise customer

**API for skill discovery**
- [ ] Programmatic access to skill registry
- [ ] Enable third-party integrations

---

## Success Metrics

### North Star
**Monthly Active Skill Installs** - How many skills are being downloaded and used

### Leading Indicators
- GitHub stars across all skills
- New skills published per week
- Repeat installs (same user, different skills)
- Guild membership growth

### Quality Indicators
- Install completion rate (started wizard → finished)
- Skill "works first time" rate
- Issues opened per skill
- Time from expert content → published skill

---

## Open Questions

1. **Licensing**: MIT for skills? Or custom license that requires attribution?

2. **Expert compensation**: Royalty per install? One-time fee? Revenue share on Guild?

3. **Quality control**: Who decides if a skill is "good enough" for the registry? Community voting? Editorial review?

4. **Skill chaining**: How do we handle skills that depend on other skills? Bundle them? Declare dependencies?

5. **Versioning**: How do users get updates to skills they've installed? Auto-update? Manual?

6. **Private skills**: Should Guild members be able to create private skills? What about skills with proprietary methodologies?

---

## The Pitch (One-Liners)

**For users:**
> "Install expert workflows with one click. Tim Ferriss's interview prep. Naval's decision-making. Your favorite creator's content system."

**For experts:**
> "Turn your methodology into an installable skill. We handle the technical part. You get attribution and royalties."

**For investors:**
> "GitHub for AI skills. We're solving the supply problem by turning expert content into installable workflows."

**For Anthropic:**
> "We're building the distribution layer for Claude skills - discovery, social, and frictionless installation."

---

## Related Documents

- [lightweight-content-engine.md](../drafts/lightweight-content-engine.md) - Technical architecture for the content engine
- [skill-creator SKILL.md](../../.claude/skills/skill-creator/SKILL.md) - The meta-skill for building skills
- [NARRATIVE.md](../references/NARRATIVE.md) - Brand philosophy and positioning
- [writers-ide/](../drafts/writers-ide/) - Full architecture docs for the Writer's IDE vision

---

*Last updated: 2026-01-24*
