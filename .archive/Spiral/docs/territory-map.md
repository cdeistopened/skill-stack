# Spiral: Territory Map for Oracle Review

> A comprehensive survey of the problem space, existing assets, philosophical foundations, and open questions. Prepared for deep strategic analysis.

---

## 1. The Vision in One Paragraph

Spiral is an AI writing partner that helps people **discover what they're trying to say and say it in their own voice**. Unlike ChatGPT (generic generation) or Grammarly (surface-level polish), Spiral operates through a **cybernetic feedback loop**: a Skill Wizard asks probing questions to extract substance from raw input (voice memos, rough drafts, scattered notes), captures the user's voice from their responses, and generates output that sounds authentically like them. Skills are modular "cartridges" that encode transformation patterns. As users work with Spiral, their skills evolve — continuous learning embodied in software.

---

## 2. The Four Irreducible Pillars

After applying David Deutsch's "hard to vary" test and Jack Dorsey's "every feature must be perfect" discipline:

| Pillar | Definition | Why Load-Bearing |
|--------|------------|------------------|
| **Wizard** | A questioning interface (AskUserQuestion paradigm) | Extracts substance, captures voice, surfaces insight the user didn't know they had |
| **Substance** | The core insight being expressed | Without it, output is polished noise — the problem most AI writing tools have |
| **Voice** | The user's captured writing style | The differentiator. Without it, you're just ChatGPT with extra steps |
| **Skills** | Modular transformation cartridges | Encode *how* transformations happen. Composable, shareable, improvable |

---

## 3. Philosophical Foundations

### 3.1 From Skill Stack (Charlie's work)

**Core Thesis**: "The cyborg advantage isn't about AI replacing you. It's about becoming a more powerful version of yourself by learning to think *with* AI."

**The 4S Framework**:
- **Source** — Your raw material (transcripts, notes, ideas)
- **Substance** — The core message worth sharing
- **Structure** — The framework that fits your content
- **Style** — Your unique voice

**Key Principles**:
1. **Transform, Don't Generate** — AI refines human ideas, doesn't replace them
2. **Sourcery > Sorcery** — Your raw material is the secret ingredient
3. **Mechanical Sympathy** — Develop intuitive feel through practice
4. **Chain of Thought** — Break complex tasks into sequences
5. **Voice Matching** — "In the style of [writer]" encodes entire philosophies

### 3.2 From Command the Page (Charlie's 2023 book)

> "The transformative power of AI lies less in its ability to spit out generic, rambling essays on any topic, and more in its capacity for **transforming lower-value inputs into higher-value outputs**."

The book independently arrived at the same architectural conclusions:
- Skills as modular transformation operations
- Voice preservation as infrastructure, not feature
- The "this → that" paradigm
- Writers sharing workflows (social layer seed)

### 3.3 External Influences

**David Deutsch (Beginning of Infinity)**:
- Good explanations are "hard to vary" — every component is load-bearing
- Applied to product: features should be irreducible

**Jack Dorsey (Square/Twitter)**:
- Limit features, make each one perfect
- Obsessive focus on core interaction

**Sarah Tavel (Benchmark)**:
- The gap in AI tools: "Millions talk to ChatGPT but none talk to each other"
- Opportunity: follow graph for creative workflows

**August Bradley (PPV)**:
- Called Charlie's book "the best" on AI-assisted writing
- His endorsement validates the direction

---

## 4. Existing Assets

### 4.1 Skill Stack Codebase
- 18+ production-tested skills from OpenEd/Naval work
- Skill Wizard patterns documented
- Voice analyzer skill
- Anti-AI writing skill (removes AI tells)
- Progressive disclosure tiers (Plug & Play → Light Setup → Full Setup)

### 4.2 Previous Spiral Planning
Located in `Spiral/Previous conversation/`:
- `01-strategic-fit.md` — Application for GM role at Every.to's Spiral
- `02-product-vision.md` — Full product vision document
- `03-portfolio-evidence.md` — Charlie's credentials
- `05-wireframe-spec.md` — Detailed UI specifications
- `06-design-system.md` — Complete design tokens extracted from production Spiral
- `command-the-page-insights.md` — Key quotes from Charlie's book

### 4.3 Design System
Extracted from production Spiral UI:
- Brand orange: `#FE7F02`
- Typography: Louize (serif headlines) + SF Pro (UI/body)
- Component library: sidebar, query bar, pill buttons, workspace badges
- Three-pane layout pattern

### 4.4 Related Projects
- **Doodle Docs** — PDF reader, potential content capture integration
- **Naval** — Podcast production workflows (real-world skill testing)
- **OpenEd** — Content team where skills are battle-tested daily

---

## 5. The Competitive Landscape

### 5.1 What Exists

| Tool | Approach | Gap |
|------|----------|-----|
| **ChatGPT** | Generic generation | No voice preservation, no memory, reactive only |
| **Claude** | Smarter generation | Same gaps, slightly better taste |
| **Grammarly** | Surface polish | Doesn't help you figure out what to say |
| **Copy.ai / Jasper** | Template-based | Templates = constraints, no voice |
| **Cursor** | Code + AI | Great UX paradigm, but for devs not writers |
| **Spiral (Every.to)** | AI writing partner | Charlie is applying for PM role there |

### 5.2 The Opportunity

Nobody has built the **cybernetic feedback loop** that:
1. Asks questions to extract substance (not just polish surface)
2. Learns voice from ongoing interaction (not just sample analysis)
3. Creates skills automatically from repeated patterns
4. Allows skills to be shared/remixed socially

---

## 6. The User

### 6.1 Primary Persona: "Marcus the Media Builder"
- Age 28-40
- Solo content creator (newsletter + podcast + YouTube)
- $60K-$200K income from content
- Former marketer, journalist, or SME
- Tech-forward but time-poor
- Quality-obsessed — can't afford to sound like AI slop
- Systems thinker, indie mindset

### 6.2 Pain Points
1. "I can write, but not fast enough"
2. "ChatGPT gives me drafts that need so much editing"
3. "I don't have time to become a prompt expert"
4. "I want to repurpose content without it feeling hollow"
5. "Everyone's shipping more content — I need a force multiplier"

### 6.3 Success Metric
Goes from "posting when I can" to "consistent weekly content" within 60 days.

---

## 7. The Product (Proposed)

### 7.1 Core Interaction

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [User: Records vibe note / pastes rough content]          │
│                     ↓                                       │
│   [Wizard: "What's the one thing you want them to take      │
│    away from this?"]                                        │
│                     ↓                                       │
│   [User: Clarifies / discovers / refines]                   │
│                     ↓                                       │
│   [System: Captures voice from this exchange]               │
│                     ↓                                       │
│   [System: Generates output in user's voice using skill]    │
│                     ↓                                       │
│   [System: "You've done X 3 times. Create a skill?"]        │
│                     ↓                                       │
│   [Skills evolve as user evolves]                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Phase 1 Scope (MVP)

**Must Have**:
- Wizard-based substance extraction (AskUserQuestion paradigm)
- Voice capture from interaction (not just pasted samples)
- 3 core skills: Improve Writing, Thread, Email
- Input/output interface

**Won't Have Yet**:
- Social layer / skill sharing
- Proactive suggestions (AI acts before asked)
- Content library / Doodle Reader
- Pattern → auto skill creation
- Team features

### 7.3 Technical Direction

- **Web app** (user's choice in earlier questions)
- **Claude API** as the intelligence layer
- **Skills as SKILL.md files** (portable, remixable)
- **AskUserQuestion** as the primary extraction mechanism

---

## 8. Open Questions for the Oracle

### 8.1 Strategic

1. **Build vs. Join**: Charlie is applying to be GM of Every.to's Spiral. Should this project be:
   - A portfolio piece to demonstrate capability?
   - An independent product if the application doesn't work out?
   - A different thing entirely (a Claude Code extension? A skills marketplace without the writing partner wrapper)?

2. **Differentiation**: If Every.to is already building Spiral, what would make Charlie's vision distinct enough to matter? The cybernetic loop? The skills marketplace? The Skill Stack community?

3. **Distribution**: How does this reach users?
   - Through Every.to's existing audience?
   - Through Skill Stack newsletter?
   - Through Claude Code / MCP ecosystem?
   - Something else?

### 8.2 Philosophical

4. **Opinionated vs. Flexible**: The user expressed tension about "making decisions for the user with confidence" vs. "allowing exploration." How do you design for both? Progressive disclosure? Defaults with escape hatches?

5. **The Wizard Paradox**: The AskUserQuestion paradigm is powerful but could feel tedious. When should the wizard ask, and when should it just do? What's the right balance?

6. **Continuous Learning**: How do you actually implement "skills that evolve"? What data do you store? How do you measure improvement?

### 8.3 Technical

7. **Web App vs. Claude Code Extension**: The user mentioned wanting "an abstraction layer of Claude Code on top with prebuilt system instructions." Is the right form factor a web app, or a Claude Code extension/plugin?

8. **Skills as Format**: SKILL.md files are great for Claude Code. How do they translate to a web app? Do you need a database representation, or can the web app literally read/write markdown?

9. **Voice Storage**: Where does the voice profile live? How do you update it incrementally from each interaction without it drifting?

### 8.4 Tactical

10. **MVP Scope**: Is the proposed Phase 1 scope correct? Too big? Too small?

11. **Validation Path**: How do you validate the cybernetic loop hypothesis before building a full product? Can you prototype it in Claude Code first?

12. **Naming**: "Spiral" is already used by Every.to. If this becomes independent, what's it called?

---

## 9. Reading List Request

The user asked for a reading plan. Suggested domains:

### On Cybernetics & Feedback Loops
- [ ] **Norbert Wiener** — *Cybernetics* (the original)
- [ ] **Stafford Beer** — *Brain of the Firm* (organizational cybernetics)
- [ ] **Donella Meadows** — *Thinking in Systems* (systems dynamics)

### On Product & Design
- [ ] **Alan Kay** — Various essays (invented the future of computing)
- [ ] **Bret Victor** — *Learnable Programming* + other essays (interactive design)
- [ ] **Dieter Rams** — Ten Principles (good design philosophy)
- [ ] **Don Norman** — *Design of Everyday Things* (usability)

### On AI & Writing
- [ ] **Ted Chiang** — *ChatGPT Is a Blurry JPEG of the Web* (AI limitations)
- [ ] **Simon Willison** — Blog posts on LLM tooling (practical patterns)
- [ ] **Andrej Karpathy** — Essays on working with LLMs

### On Marketplaces & Platforms
- [ ] **Bill Gurley** — *All Markets Are Not Created Equal* (marketplace dynamics)
- [ ] **Sarah Tavel** — Engagement hierarchy essays (consumer product building)
- [ ] **Chris Dixon** — Essays on network effects

### On Writing Itself
- [ ] **Joan Didion** — *Why I Write* (voice and style)
- [ ] **William Zinsser** — *On Writing Well* (clarity)
- [ ] **Bird by Bird** — Anne Lamott (process)

---

## 10. What the Oracle Should Advise On

Given all of the above:

1. **What's the right next move?** Build an MVP? Keep planning? Prototype in Claude Code? Wait for the Every.to application outcome?

2. **What's the hard-to-vary core we haven't identified?** Is there something more fundamental hiding beneath the four pillars?

3. **What's the trap we're walking into?** Common failure modes for this type of project?

4. **What should we read first?** From the reading list, what's most urgent given where we are?

5. **What question should we be asking that we haven't asked?**

---

## 11. Skill-Stack Repository Map

### Structure Overview
```
skill-stack/
├── .claude/                    # AI context & knowledge base
│   ├── CLAUDE.md              # Project context (START HERE)
│   ├── NARRATIVE.md           # Core thesis & philosophy
│   ├── SKILL-WIZARD-SPEC.md   # Wizard pattern specification
│   ├── SKILL-INVENTORY.md     # Complete skills list
│   └── skills/                # 21 production skills
├── content/
│   ├── blog/                  # 37 published posts
│   └── drafts/                # 6 in-progress pieces
└── src/                       # React app (markdown site)
```

### The 21 Production Skills

**Tier 1: Plug & Play** (no setup)
| Skill | Purpose |
|-------|---------|
| `anti-ai-writing` | Core humanization — SUCKS framework, forbidden patterns |
| `hook-and-headline-writing` | 15 formulas for scroll-stopping headlines |
| `dude-with-sign-writer` | Punchy one-liners (12 patterns) |
| `transcript-polisher` | Raw transcript → readable prose |
| `social-content-creation` | 180+ templates, platform-optimized |

**Tier 2: Light Setup** (requires samples or brand)
| Skill | Purpose |
|-------|---------|
| `voice-matching-wizard` | Codify your voice via WIZARD.md |
| `ghostwriter` | Source → authentic prose (8 Human Desires) |
| `brand-identity-wizard` | Create brand profiles |
| `podcast-blog-post-creator` | Transcript → SEO blog |
| `youtube-title-creator` | 119 proven title frameworks |

**Tier 3: Full Setup** (requires APIs/tools)
| Skill | Purpose |
|-------|---------|
| `image-prompt-generator` | AI images via Gemini |
| `podcast-production` | End-to-end workflow |
| `youtube-clip-extractor` | Video → clips with captions |

### Key Frameworks to Port

**4S Framework** (Source, Substance, Structure, Style)
- Foundation for all AI writing workflows

**CODER Framework** (Capture, Organize, Distill, Express, Refine)
- Complete workflow from raw → published

**SUCKS Framework** (Specific, Unique, Clear, Kept Simple, Sticky)
- Pre-writing quality gate

**Forbidden Patterns** (from anti-ai-writing)
- Correlative constructions ("X isn't just Y—it's Z")
- "The best part?", "Now more than ever"
- Pattern library for detecting AI tells

### Wizard Pattern (SKILL-WIZARD-SPEC.md)

The key insight for Spiral's design:

```
skill-name-wizard/
├── SKILL.md              # The working skill
├── WIZARD.md             # Conversational setup guide
├── references/           # Supporting docs
└── templates/            # Fill-in-the-blank assets
```

**WIZARD.md principles:**
- Ask ONE question at a time
- Wait for response before continuing
- Detect starting point (has samples? wants to emulate? discovering?)
- Branch based on answers
- Output: personalized skill file

### Files to Study First

| Path | Why |
|------|-----|
| `.claude/NARRATIVE.md` | The thesis — cyborg advantage |
| `.claude/SKILL-WIZARD-SPEC.md` | How wizards work |
| `skills/anti-ai-writing/SKILL.md` | Core humanization |
| `skills/voice-matching-wizard/` | Voice capture pattern |
| `content/blog/4s-prompting-framework.md` | Foundational workflow |

---

## 12. Summary for Oracle

**What exists:**
- Complete philosophy (Skill Stack thesis)
- 21 production skills ready to port
- Wizard pattern for substance extraction
- Design system from production Spiral
- Detailed wireframes and specs

**What's unclear:**
- Build vs. join Every.to decision
- Web app vs. Claude Code extension form factor
- How to implement continuous learning technically
- Right balance of opinionated vs. flexible

**What we need:**
- Strategic direction (next move)
- Technical architecture validation
- Prioritized reading list
- Questions we haven't thought to ask

---

*Prepared: 2025-12-30*
*For: Oracle deep analysis session*
