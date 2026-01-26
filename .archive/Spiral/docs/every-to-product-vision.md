# Every.to Product Vision: Spiral 2.0

> A comprehensive product vision for revitalizing Spiral, written as if applying to lead this product at Every.to.

**Author:** Charlie Deist
**Date:** 2025-12-30
**Status:** Application-ready source document

---

## Executive Summary

Spiral 1.0 had the right instincts but the wrong implementation. It tried to be a "better writing interface" when it should have been a **transformation engine that remembers how you write**.

The core insight: AI writing tools fail because they optimize for output generation when they should optimize for **substance extraction + voice preservation**. Most people don't know what they want to say until someone helps them find it. That's not a bug to engineer around—it's the product opportunity.

**The sparse theory:**
> Spiral is a wizard that asks you what you're trying to say, remembers how you say it, and helps you say it better—one skill at a time.

Everything else is implementation detail.

---

## Part 1: What Spiral 1.0 Got Right

### The Remix Paradigm

Every.to understood that writers don't create from nothing—they transform:
- Podcast transcript → Thread
- YouTube video → Blog post
- Brain dump → Email sequence
- Meeting notes → Memo

This is correct. The "AI writing assistant" framing is wrong because it implies generation. The "transformation engine" framing is right because it implies source material.

### Voice as Differentiator

Spiral 1.0 had "style profiles"—an attempt to capture how you write so AI doesn't produce generic output. This was the right instinct. Generic AI output is the failure mode of every competitor.

### The Social Vision

Sarah Tavel's insight (Benchmark partner, early Pinterest PM) that Every.to internalized:

> "Millions of users talk to ChatGPT every day—but none of them talk to each other. There's no way for me to discover great prompts or share the ones that worked for me."

The vision of a "follow graph for creative workflows" was genuinely novel. Writers following writers to inherit their skills and styles. Midjourney proved this works—people learned prompting by watching others in Discord.

---

## Part 2: What Spiral 1.0 Got Wrong

### Wrong Interface Model

Spiral 1.0 was a chat interface with style profiles bolted on. But chat is the wrong metaphor for writing assistance because:

1. **Chat is reactive.** You ask, it responds. Writing requires proactive extraction.
2. **Chat is session-based.** Good writing builds on accumulated context.
3. **Chat treats voice as a setting.** Voice should be the operating system.

### Social Layer Before Individual Value

The follow graph, skill sharing, and remix culture were proposed before the core product delivered enough individual value. This is backwards.

**The pattern that works:**
1. Individual power first (the tool is useful alone)
2. Multiplayer optional (collaboration adds value)
3. Social layer emergent (network effects grow from usage)

**The pattern that fails:**
1. Social features from day one
2. Value dependent on network
3. Cold start problem kills product

Notion doesn't have social. Obsidian barely does. Roam tried and abandoned it. The lesson: individual power first, social second (or never).

### Comprehensiveness Over Clarity

Spiral 1.0 tried to be everything: capture layer, transformation engine, style library, skill store, team collaboration, proactive assistant. Too many features means no feature is perfect.

Dorsey's principle: "Limit the number of features and make each one perfect."

The product needed fewer things done brilliantly, not many things done adequately.

---

## Part 3: The Four Irreducible Pillars

After applying David Deutsch's "hard to vary" test—a good explanation is one where every component is load-bearing and can't be removed without breaking the whole—Spiral 2.0 needs exactly four things:

| Pillar | What It Is | Why Load-Bearing |
|--------|-----------|------------------|
| **Wizard** | Questioning interface that extracts substance | Without it, user dumps raw input and gets generic output |
| **Substance** | The core insight being expressed | Without it, you're polishing noise |
| **Voice** | Captured writing style | Without it, you're just ChatGPT |
| **Skills** | Modular transformation cartridges | Without them, every transformation is ad hoc |

Remove any one, and the product breaks.

### Pillar 1: The Wizard

**The insight:** Most people don't know what they want to say until someone helps them find it.

Current AI writing tools assume you have a clear idea and need help expressing it. This is wrong. The actual workflow:
1. Vague sense of something worth saying
2. Struggle to articulate it
3. Realization of the actual point (often different from starting assumption)
4. Expression in appropriate form

AI tools optimize for step 4. They should optimize for step 3.

**The wizard pattern:**
- Ask ONE question at a time
- Wait for response
- Branch based on answer
- Converge toward substance

This is fundamentally different from "describe what you want to write about." It's Socratic extraction, not prompt engineering.

**Example wizard flow:**

```
Wizard: What's the one thing you want your reader to understand?

User: That AI writing tools are missing something important.

Wizard: What would change for someone who understood that?

User: They'd stop using AI to generate and start using it to transform.

Wizard: You just said your thesis. "Stop using AI to generate, start using it to transform."
        Should we explore why generation fails, or go straight to what transformation looks like?

User: Why generation fails.

Wizard: What's the worst AI-generated content you've seen recently?

[continues until substance is fully extracted]
```

The wizard doesn't write *for* you. It helps you discover what you're trying to say.

### Pillar 2: Substance

Substance is the core insight being expressed—the thing that makes the piece worth reading.

**Why this matters:** AI can infinitely generate text. The bottleneck isn't words. It's ideas worth expressing. Tools that focus on generation increase the noise; tools that focus on extraction increase the signal.

**Substance extraction outputs:**
- The thesis (one sentence)
- The evidence (what supports it)
- The stakes (why it matters)
- The transformation (what changes if reader accepts it)

With these four elements, any skill can produce coherent output. Without them, every output is word salad.

### Pillar 3: Voice

Voice is the patterns, rhythms, and sensibilities that make writing recognizable.

**What voice includes:**
- Sentence architecture (length variation, structure patterns)
- Word choice (vocabulary level, favorite phrases, avoidances)
- Tone registers (serious/playful, formal/casual)
- Signature moves (opening patterns, transitions, closings)
- Beliefs and values (what the voice stands for)

**Why voice is load-bearing:**
Generic AI output is the failure mode. Every competitor produces the same "helpful assistant" prose. Voice is what differentiates. A tool that captures voice creates work that sounds like you, not like AI.

**Voice capture methodology:**
1. Ingest 3-5 writing samples (minimum 500 words each)
2. Analyze patterns across dimensions
3. Generate voice profile with examples
4. Test by generating in voice, asking if it sounds right
5. Iterate until author confirms recognition

The goal: someone reading the output should think you wrote it.

### Pillar 4: Skills

Skills are modular transformation cartridges—specific workflows encoded in a portable format.

**What a skill contains:**
- Name and description
- Input requirements (what it needs)
- Output format (what it produces)
- Transformation logic (how it gets from input to output)
- Quality criteria (what good looks like)
- Examples (before/after pairs)

**Why skills, not prompts:**
A prompt is a one-time instruction. A skill is a reusable capability that improves over time. Skills compose—thread-maker + voice-matcher + hook-writer = complete social content workflow.

**The skill library should include:**
- Content transformation (transcript → blog, video → thread)
- Format fitting (ideas → email sequence, outline → presentation)
- Polish and editing (draft → publication-ready)
- Extraction (long-form → quotes, book → summary)
- Platform adaptation (blog → LinkedIn, newsletter → Twitter)

Skills are markdown files. Infinitely portable. No platform lock-in.

---

## Part 4: The Cybernetic Loop

The four pillars aren't static. They form a feedback loop:

```
┌─────────────────────────────────────────────────────────────┐
│                    CYBERNETIC LOOP                          │
│                                                             │
│   ┌─────────┐    ┌───────────┐    ┌─────────┐    ┌──────┐  │
│   │  Raw    │───▶│  Wizard   │───▶│Substance│───▶│Voice │  │
│   │ Input   │    │ Questions │    │Extracted│    │+Skill│  │
│   └─────────┘    └───────────┘    └─────────┘    └──────┘  │
│        ▲                                             │      │
│        │                                             ▼      │
│        │         ┌──────────────────────────────────────┐  │
│        │         │              OUTPUT                  │  │
│        │         │   (in your voice, from your ideas)   │  │
│        │         └──────────────────────────────────────┘  │
│        │                         │                          │
│        │    ┌────────────────────┘                          │
│        │    ▼                                               │
│   ┌─────────────────────────────────────────────────┐      │
│   │           PATTERN DETECTION                      │      │
│   │  • Which wizard questions work?                  │      │
│   │  • Which skills get reused?                      │      │
│   │  • Where does voice drift?                       │      │
│   │  • What patterns emerge across users?            │      │
│   └─────────────────────────────────────────────────┘      │
│        │                                                    │
│        ▼                                                    │
│   ┌─────────────────────────────────────────────────┐      │
│   │           SKILL EVOLUTION                        │      │
│   │  • Auto-create skills from repeated tasks       │      │
│   │  • Refine wizards based on success data         │      │
│   │  • Update voice profiles as style evolves       │      │
│   │  • Surface what works to community              │      │
│   └─────────────────────────────────────────────────┘      │
│                         │                                   │
│                         └────────────▶ (back to input)      │
└─────────────────────────────────────────────────────────────┘
```

**What makes this cybernetic:**
- The system learns from its own outputs
- User feedback improves future performance
- Skills evolve based on usage patterns
- Voice profiles update as writing style changes

This is continuous learning, not static configuration.

---

## Part 5: Network Effects (Where They Actually Live)

Skills are markdown files—infinitely copyable, no moat. Voice profiles are private per user—no network effects. So where does defensibility come from?

### Where Network Effects Can't Live

| Asset | Moat Potential | Why |
|-------|---------------|-----|
| Skills (markdown files) | None | Copy-paste in 2 seconds |
| Voice profiles | None | Private per user |
| Philosophy/content | None | Already public, easily replicated |
| UI/UX | Weak | Competitors iterate fast |

### Where Network Effects Could Live

| Asset | Moat Potential | Why |
|-------|---------------|-----|
| **Wizard refinement data** | Strong | Which questions work? Which paths succeed? This improves with usage. |
| **Collaborative filtering** | Strong | "Writers like you also use..." requires user base |
| **Remix chains + attribution** | Medium | Creates social graph, reputation, discovery |
| **Skill usage patterns** | Medium | Reveals what works across cohorts |

**The insight:** The moat isn't the skills. It's the refinement data.

But refinement data requires users. Users require distribution. This is where Every.to has an advantage: existing audience, brand, email list, content machine.

---

## Part 6: The Social Layer (Done Right)

The original Spiral vision wasn't wrong about social—it was wrong about sequencing.

### Phase 1: Individual Power (Months 1-6)

The tool must be useful alone before adding social features.

**Success criteria:**
- A user with zero social connections gets massive value
- Voice capture works reliably
- Wizard pattern extracts substance effectively
- Core skills (thread, blog, email) produce quality output
- Users return weekly because the tool helps them write

### Phase 2: Multiplayer Optional (Months 6-12)

Once individual value is proven, add collaborative features that enhance but don't require network.

**Features to consider:**
- Share a skill (public link, anyone can copy)
- Browse skill library (curated collection)
- Import a voice profile (with consent)

**What NOT to build:**
- Follow graphs
- Real-time collaboration
- Comments/feedback on others' work
- Leaderboards or gamification

### Phase 3: Social Layer Emergent (Year 2+)

If Phases 1-2 succeed and organic sharing happens, then consider:
- "Writers who use X also use Y" recommendations
- Skill creators with audiences
- Remix chains with attribution
- Community-surfaced best practices

**Key principle:** Social features should emerge from usage patterns, not be imposed by product design.

---

## Part 7: What to Build First

### The Wizard MVP

**Hypothesis to test:** Substance extraction via questioning produces better output than direct prompting.

**Minimum viable wizard:**
1. User provides raw input (transcript, notes, brain dump)
2. Wizard asks 3-5 clarifying questions, one at a time
3. System extracts: thesis, evidence, stakes, transformation
4. User confirms or adjusts
5. Skill runs with extracted substance + voice profile
6. Output produced

**Metrics:**
- Does user accept wizard output more often than direct generation?
- Do users report output "sounds like them" more with wizard?
- Time to usable output (wizard should be faster, counterintuitively)

### The Skill Stack MVP

**Start with 5 core skills:**

| Skill | Input | Output | Why First |
|-------|-------|--------|-----------|
| **Thread maker** | Any long-form | Twitter thread | High frequency, easy to evaluate |
| **Newsletter teaser** | Blog post / episode | Email preview | Every.to audience needs this |
| **Quote extractor** | Long-form | Pull quotes | Building block for other skills |
| **Hook writer** | Topic + substance | Opening lines | Universal need |
| **Transcript polisher** | Raw transcript | Readable document | Clear value, easy to test |

**Each skill must:**
- Work without wizard (for users who know what they want)
- Work better with wizard (for users who don't)
- Respect voice profile (output sounds like user)
- Be editable (user can see and modify the skill)

### Voice Capture MVP

**Version 1:**
- User pastes 3 writing samples
- System analyzes and generates voice profile
- User rates output: "Does this sound like me?"
- Profile adjusts based on feedback

**Version 2 (if V1 succeeds):**
- Auto-ingest from user's published content (Substack, Twitter, blog)
- Continuous voice profile updates as style evolves
- Multiple voice profiles for different contexts

---

## Part 8: What NOT to Build

### The Anti-Roadmap

| Feature | Why to Skip It |
|---------|---------------|
| **Real-time collaboration** | Adds complexity, not core value |
| **Social follow graph** | Requires network you don't have |
| **Mobile app** | Desktop is where writing happens |
| **Voice/audio input** | Nice-to-have, not core |
| **Team features** | Individual value first |
| **AI-generated images** | Feature creep, not core |
| **Calendar integration** | Distraction from writing |
| **Project management** | Writers have their own systems |
| **Notion/Obsidian clone features** | Don't compete with existing tools |

**The discipline:** Every feature not built is time available for making core features perfect.

---

## Part 9: Positioning Against Competitors

### The Competitive Landscape

| Competitor | Positioning | Weakness |
|------------|-------------|----------|
| **ChatGPT** | General-purpose AI | No voice, no memory, no skills |
| **Jasper** | Marketing copy generator | Templates, not transformation |
| **Copy.ai** | Sales/marketing focus | Generic output, no voice |
| **Lex** | "Google Docs with AI" | Writing interface, not transformation |
| **Notion AI** | Embedded in workspace | Feature, not product |
| **Sudowrite** | Fiction/creative focus | Narrow audience |
| **Claude** | General AI assistant | No productized writing workflow |

### Spiral's Positioning

**Not:**
- "AI writing assistant" (every tool claims this)
- "Write faster with AI" (speed is commoditized)
- "Content at scale" (race to bottom)

**Instead:**
> **Spiral transforms your raw ideas into polished content that sounds like you—not like AI.**

The emphasis:
1. **Transform** (not generate)
2. **Your raw ideas** (you have the substance)
3. **Sounds like you** (voice is the differentiator)
4. **Not like AI** (the anti-generic promise)

---

## Part 10: Business Model Considerations

### Pricing Philosophy

The value Spiral provides is time saved + quality improved + voice preserved. This is substantial value for:
- Professional writers (livelihood depends on output)
- Content creators (volume matters)
- Executives (time is expensive)
- Consultants (deliverables are product)

**Pricing tiers (suggested):**

| Tier | Price | Includes |
|------|-------|----------|
| **Free** | $0/mo | 3 skills, limited wizard, basic voice |
| **Pro** | $20/mo | All skills, full wizard, advanced voice |
| **Team** | $40/seat/mo | Shared skills, shared voice profiles, admin |
| **Enterprise** | Custom | API access, SSO, dedicated support |

### Revenue Model Alternatives

**Option A: Pure SaaS**
- Monthly subscription
- Clean, predictable revenue
- Every.to already has this model

**Option B: Skills Marketplace**
- Platform takes cut of skill sales
- Creators earn from their skills
- Requires scale that doesn't exist yet

**Option C: Usage-Based**
- Pay per transformation
- Aligns cost with value
- Harder to predict revenue

**Recommendation:** Start with pure SaaS (Option A). Consider marketplace (Option B) only after achieving scale.

---

## Part 11: Go-to-Market Strategy

### Leverage Every.to's Existing Assets

Every.to has:
- 50,000+ newsletter subscribers
- Established brand in creator economy
- Content machine (daily essays, podcasts)
- Existing Spiral users (even if churned)

**The GTM motion:**

1. **Content-led acquisition** — Every essay/podcast includes Spiral examples
2. **Existing user reactivation** — Email past Spiral users with new vision
3. **Creator partnerships** — Find 10 writers to use Spiral publicly
4. **Newsletter cross-promotion** — Every.to network promotes Spiral

### The Land-and-Expand Motion

1. Individual writer discovers Spiral (free tier)
2. Upgrades to Pro when they hit limits
3. Shows team the quality improvement
4. Team subscribes for shared workflows
5. Organization expands across content teams

This is the Figma/Notion/Slack playbook. Individual users are the wedge.

---

## Part 12: The Role I Would Play

### What I Bring

**Philosophy:**
- The "Cyborg Advantage" thesis that positions AI as amplifier, not replacement
- Deep understanding of transformation over generation
- Voice matching methodology tested across real content

**Skills:**
- 21 production-tested skills covering content creation workflow
- Skill architecture that's portable and composable
- Wizard pattern specification

**Evidence:**
- Real outputs from real clients (Naval, OpenEd)
- Content demonstrating the philosophy (37 blog posts)
- Working prototypes in Claude Code

**Network:**
- Podcast audience (Swill Radio, Naval's podcast)
- Newsletter subscribers
- Creator contacts in productivity/AI space

### What I Would Do

**First 30 days:**
- Deep dive on existing Spiral codebase and user data
- Interview 20 past users (especially churned ones)
- Align on vision with Every.to leadership
- Identify which skills port directly to product

**First 90 days:**
- Ship wizard MVP
- Rebuild voice capture
- Launch 5 core skills
- Reactivate existing users with new version

**First year:**
- Establish Spiral as go-to tool for voice-matched transformation
- Build skill library to 50+ options
- Achieve strong individual-user retention before adding social

---

## Part 13: Why This Will Work

### The Market Timing

AI writing tools are in the "trough of disillusionment." Initial excitement about ChatGPT has given way to:
- Recognition that generic output isn't good enough
- Frustration with tools that don't learn
- Search for differentiated solutions

**The window:** Tools that solve the "sounds like AI" problem will win the next wave.

### The Philosophical Clarity

Most AI writing tools are built by engineers who don't write. They optimize for features, not craft. Spiral has the opportunity to be built by someone who:
- Writes professionally
- Understands voice from the inside
- Has tested the methodology on real work
- Believes in transformation over generation

### The Distribution Advantage

Building this independently would require solving distribution from scratch. Every.to has:
- Audience
- Brand
- Content machine
- Existing (dormant) user base

The challenge isn't "can this vision work?" It's "can this vision be executed before the window closes?"

---

## Part 14: Risks and Mitigations

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| **Voice capture is technically hard** | Medium | Start simple, iterate based on feedback |
| **Wizard pattern adds too much friction** | Medium | A/B test against direct generation |
| **Users want features we're skipping** | High | Stay disciplined, validate with data |
| **Competitors copy quickly** | High | Execution speed + brand + refinement data as moat |
| **AI capabilities shift dramatically** | Medium | Architecture designed for model-agnostic operation |
| **Team doesn't share vision** | Low | Align early, document extensively |

### The Biggest Risk

The biggest risk is building for imagined users instead of real ones.

**Mitigation:** Every feature decision requires answering: "Which actual user asked for this?" If nobody did, it waits.

---

## Part 15: Success Metrics

### North Star Metric

**Outputs accepted without major edits**

If users accept what Spiral produces, we're winning. If they heavily edit or regenerate, we're not.

### Supporting Metrics

| Category | Metric | Target |
|----------|--------|--------|
| **Acquisition** | Weekly new sign-ups | 500+ |
| **Activation** | Complete first transformation | 60% of sign-ups |
| **Retention** | Weekly active users | 40% of total |
| **Voice accuracy** | "Sounds like me" rating | 4.5/5 average |
| **Skill usage** | Skills used per user per week | 5+ |
| **Revenue** | MRR growth | 15% month-over-month |

### Failure Indicators

Stop and reassess if:
- Voice accuracy ratings below 3.5/5
- Weekly retention below 25%
- Wizard abandoned more than direct generation used
- Time to first output exceeds 10 minutes

---

## Part 16: The Wizard Concept (Deep Dive)

### What is a Wizard?

A wizard is a **conversational guide that extracts what you need through questions rather than forms**. Unlike a prompt that requires you to know what you want, a wizard helps you discover it.

**Key characteristics:**
1. **One question at a time** — Reduces cognitive load
2. **Branching logic** — Path depends on your answers
3. **Progressive disclosure** — Only asks what's relevant
4. **Self-destructing** — Disappears after purpose served
5. **Produces artifact** — Creates something persistent (skill, profile, document)

### Wizard vs. Other Patterns

| Pattern | User Knows What They Want | Best For |
|---------|--------------------------|----------|
| **Form** | Yes, precisely | Structured data entry |
| **Chat** | Somewhat | Open exploration |
| **Wizard** | No, or partially | Guided extraction |
| **Template** | Yes, just needs structure | Repetitive tasks |

Wizards fill the gap: when users need something but can't articulate it yet.

### The Wizard Anatomy

Every wizard has:

```
┌─────────────────────────────────────────────────────┐
│                    WIZARD                            │
├─────────────────────────────────────────────────────┤
│  WELCOME                                             │
│  • What this wizard produces                        │
│  • How long it takes                                │
│  • What you'll need                                 │
├─────────────────────────────────────────────────────┤
│  ENTRY PATHS                                         │
│  • "I have existing materials" → Path A             │
│  • "Starting from scratch" → Path B                 │
│  • "Updating what exists" → Path C                  │
├─────────────────────────────────────────────────────┤
│  QUESTIONS (per path)                               │
│  • Section 1: [3-5 questions]                       │
│  • Section 2: [3-5 questions]                       │
│  • Section 3: [3-5 questions]                       │
├─────────────────────────────────────────────────────┤
│  SYNTHESIS                                           │
│  • Generate artifact from answers                   │
│  • Show draft for review                            │
│  • Allow adjustments                                │
├─────────────────────────────────────────────────────┤
│  OUTPUT                                              │
│  • Save artifact                                    │
│  • Explain how to use it                            │
│  • Suggest next steps                               │
└─────────────────────────────────────────────────────┘
```

### Wizard Examples in Skill Stack

**Brand Identity Wizard:**
- Produces: `brand-identity.md`
- Time: ~30 minutes
- Questions: Persona, audience, voice, values, messaging
- Entry paths: Existing materials / From scratch / Evolution

**Voice Matching Wizard:**
- Produces: `voice-[name].skill.md`
- Time: ~15 minutes
- Questions: Samples analysis, spectrum ratings, distinctive moves
- Entry paths: Own voice / Emulation / Discovery

**Skill Creator Wizard:**
- Produces: Custom `SKILL.md`
- Time: ~20 minutes
- Questions: What transformation, what inputs/outputs, what quality criteria
- Entry paths: From workflow / From template / From scratch

### The Wizard Flywheel

```
┌─────────────────────────────────────────────────────────────┐
│                   WIZARD FLYWHEEL                           │
│                                                             │
│     User completes wizard                                   │
│              │                                              │
│              ▼                                              │
│     Artifact created (skill, profile, document)            │
│              │                                              │
│              ▼                                              │
│     User uses artifact in real work                        │
│              │                                              │
│              ▼                                              │
│     System tracks what works/doesn't                       │
│              │                                              │
│              ▼                                              │
│     Wizard questions refined based on success data         │
│              │                                              │
│              ▼                                              │
│     Better wizards → better artifacts → more usage         │
│              │                                              │
│              └─────────────▶ (cycle continues)             │
└─────────────────────────────────────────────────────────────┘
```

### Wizard Complexity Tiers

| Tier | Setup Time | Requires | Examples |
|------|-----------|----------|----------|
| **Tier 1: Plug & Play** | 5 min | Nothing | anti-ai-writing, hook-writer, transcript-polisher |
| **Tier 2: Light Setup** | 15-20 min | Brand identity OR writing samples | voice-analyzer, ghostwriter, cold-open-creator |
| **Tier 3: Full Setup** | 30+ min | API keys, tool installs, MCP integrations | image-prompt-generator, podcast-production |

The wizard's job: make Tier 2 and Tier 3 skills accessible to people who would otherwise bounce.

---

## Part 17: Voice Matching (Deep Dive)

### Why Voice is the Moat

Generic AI output is the failure mode of every writing tool. The phrases that scream "AI wrote this":
- "In today's fast-paced world..."
- "It's important to note that..."
- "Let's dive in..."
- "This comprehensive guide will..."
- Emoji clusters for emphasis
- Excessive hedging and qualifiers

Voice matching eliminates these by constraining output to patterns extracted from real writing.

### The Voice Profile Structure

```yaml
name: "Voice Profile: [Author Name]"
version: 1.0
created: 2025-12-30

# Overall character
description: |
  [2-3 sentence summary of what makes this voice distinctive]

# Spectrum ratings (1-5)
spectrum:
  formal_casual: 4        # 1=formal, 5=casual
  expert_peer: 3          # 1=expert, 5=peer
  serious_playful: 3      # 1=serious, 5=playful
  reserved_opinionated: 4 # 1=reserved, 5=opinionated
  abstract_concrete: 4    # 1=abstract, 5=concrete

# Sentence patterns
sentences:
  average_length: "15-20 words"
  variation: "High - mixes punchy fragments with flowing complex sentences"
  signature_structures:
    - "Question. Then answer."
    - "Three-beat rhythm in lists"
    - "Parenthetical asides (like this one)"

# Word choice
vocabulary:
  level: "Accessible but precise"
  uses_contractions: true
  jargon_approach: "Uses sparingly, always explains"
  favorite_words:
    - "actually"
    - "here's the thing"
    - "the real question is"
  avoided_words:
    - "utilize"
    - "leverage"
    - "synergy"
  profanity: "Occasional, strategic"

# Tone
tone:
  emotional_register: "Warm but direct"
  reader_relationship: "Smart friend who's figured something out"
  humor_style: "Dry observations, occasional absurdism"

# Structural moves
moves:
  openings:
    - "Start with specific example or anecdote"
    - "Pose the central question immediately"
  transitions:
    - "But here's the thing..."
    - "Which brings us to..."
  closings:
    - "End with action item or question to reader"
    - "Circle back to opening image"

# Anti-patterns (what this voice NEVER does)
never:
  - "Listicle headers with numbers in titles"
  - "Generic calls to action"
  - "Excessive emoji"
  - "Corporate buzzwords"
  - "Passive voice when active is possible"

# Example passages (for reference)
examples:
  - context: "Opening a blog post"
    text: |
      [Actual passage from author's writing]
  - context: "Making a complex point"
    text: |
      [Actual passage from author's writing]
```

### Voice Capture Process

**Step 1: Sample Collection**
- Request 3-5 writing samples
- Minimum 500 words each
- Representative of desired voice (not outliers)

**Step 2: Pattern Analysis**
- Sentence length distribution
- Word frequency analysis
- Structural pattern detection
- Opening/closing signature moves

**Step 3: Profile Generation**
- Generate voice profile YAML
- Include spectrum ratings with justification
- Extract example passages

**Step 4: Validation**
- Generate sample output in voice
- User rates: "Does this sound like me?" (1-5)
- If below 4, iterate on profile

**Step 5: Refinement**
- Track outputs user accepts vs. rejects
- Identify patterns in rejections
- Update profile based on evidence

### Voice Profile Examples

**Pirate Wires Style:**
```yaml
description: |
  Sharp, contrarian tech commentary. Assumes reader intelligence.
  Confident assertions backed by specific evidence. Zero hedging.

spectrum:
  formal_casual: 3
  expert_peer: 2
  serious_playful: 2
  reserved_opinionated: 5
  abstract_concrete: 4

signature_moves:
  - "Bold claim followed by 'And here's why:'"
  - "Dismissive one-liner for opposing view"
  - "Specific data point as mic drop"

never:
  - "Both sides have valid points"
  - "It's complicated"
  - "Your mileage may vary"
```

---

## Part 18: The Skill Architecture (Deep Dive)

### What a Skill Contains

Every skill is a markdown file with:

```markdown
---
name: skill-name
type: skill
description: One-line description
tier: 1|2|3
requires:
  - brand-identity (optional)
  - voice-profile (optional)
  - api-key:gemini (optional)
---

# Skill Name

## Purpose
What this skill does and why you'd use it.

## Input
What the skill needs to run:
- Required: [list]
- Optional: [list]

## Output
What the skill produces:
- Format: [markdown, thread, email, etc.]
- Length: [approximate]
- Structure: [description]

## Process
Step-by-step transformation logic:
1. [Step]
2. [Step]
3. [Step]

## Quality Criteria
What good output looks like:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Examples
### Before
[Input example]

### After
[Output example]

## Anti-Patterns
What to avoid:
- Don't [thing]
- Never [thing]
- Avoid [thing]
```

### Skill Composition

Skills can call other skills:

```
┌─────────────────────────────────────────────────────────────┐
│                 NEWSLETTER WORKFLOW                          │
│                                                             │
│  ┌─────────────┐                                            │
│  │ Raw Input   │ (transcript, notes, brain dump)            │
│  └──────┬──────┘                                            │
│         │                                                    │
│         ▼                                                    │
│  ┌─────────────┐                                            │
│  │ Substance   │ (wizard extracts thesis, evidence, stakes) │
│  │ Extractor   │                                            │
│  └──────┬──────┘                                            │
│         │                                                    │
│         ▼                                                    │
│  ┌─────────────┐                                            │
│  │ Voice       │ (applies voice profile to output)          │
│  │ Matcher     │                                            │
│  └──────┬──────┘                                            │
│         │                                                    │
│    ┌────┴────┬────────────┐                                 │
│    │         │            │                                  │
│    ▼         ▼            ▼                                  │
│ ┌──────┐ ┌──────┐   ┌──────────┐                           │
│ │Thread│ │Email │   │Blog Post │                           │
│ │Maker │ │Teaser│   │ Writer   │                           │
│ └──────┘ └──────┘   └──────────┘                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### The Skill Dependency Graph

```
┌─────────────────────────────────────────────────────────────┐
│                   BRAND-IDENTITY-WIZARD                      │
│         (Run first for Tier 2/3 skills)                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    VOICE-ANALYZER                            │
│         (Samples → Custom Voice Skill)                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   VOICE SKILLS                               │
│   voice-pirate-wires  (or your custom voice-[name])         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   ANTI-AI-WRITING                            │
│  (Core engine: humanization, patterns, quality)              │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │  hook-and-  │    │ transcript- │    │   social-   │
   │  headline-  │    │  polisher   │    │   content-  │
   │   writing   │    │             │    │  creation   │
   └─────────────┘    └─────────────┘    └─────────────┘
```

---

## Part 19: Existing Assets to Port

### Skills Ready for Production

**Tier 1: Plug & Play (5 min setup)**
| Skill | Description |
|-------|-------------|
| anti-ai-writing | Detect and eliminate AI tells, SUCKS framework |
| hook-and-headline-writing | 15 formulas, 4 U's test, volume generation |
| dude-with-sign-writer | Punchy one-liners, 12 core patterns |
| transcript-polisher | Raw transcript → readable document |
| social-content-creation | 180+ templates, framework fitting |

**Tier 2: Light Setup (15-20 min)**
| Skill | Requires |
|-------|----------|
| voice-analyzer | 2-5 writing samples |
| ghostwriter | Writing samples + brand identity |
| brand-identity-wizard | User interview |
| cold-open-creator | Brand identity |
| podcast-blog-post-creator | Brand identity |
| youtube-title-creator | Brand identity |
| video-caption-creation | Brand identity |
| skill-creator | Understanding of skill format |

**Tier 3: Full Setup (30+ min)**
| Skill | Requires |
|-------|----------|
| image-prompt-generator | Gemini API key |
| podcast-production | ffmpeg, brand identity |
| youtube-clip-extractor | yt-dlp, ffmpeg |
| youtube-downloader | yt-dlp |

### Philosophy Documentation

- **NARRATIVE.md** — Cyborg Advantage thesis
- **SKILL-WIZARD-SPEC.md** — Wizard pattern specification
- **37 blog posts** — Content demonstrating philosophy
- **Command the Page insights** — August Bradley integration

### Evidence of Real Usage

- Naval podcast production (ongoing client)
- OpenEd content workflow (daily job)
- Personal newsletter production
- Skill-stack content pipeline

---

## Part 20: The Charlie Deist Factor

### Why This Vision Requires This Person

Most AI writing tools are built by one of two archetypes:
1. **Engineers who don't write** — They optimize for features, not craft
2. **Writers who can't build** — They have taste but can't execute

The rare third archetype: **writers who build**.

**What I bring:**
- Write professionally (podcast production, newsletters, consulting)
- Build tools (21 production skills, Claude Code workflows)
- Understand voice from inside (have developed my own recognizable style)
- Test methodology on real work (not theoretical)
- Believe in transformation over generation (lived experience)

### The Philosophy Match

Every.to's original vision aligned with what I've been building independently:
- Transformation over generation
- Voice as differentiator
- Skills as shareable units
- AI as amplifier, not replacement

This isn't a case of adapting to fit a job description. The philosophy was already there.

### The Execution Advantage

**What I would do differently:**
- Ship the wizard MVP in 90 days (not comprehensive feature set)
- Cut ruthlessly (no social layer until individual value proven)
- Use existing skills as starting point (not build from scratch)
- Interview churned users (understand what failed)
- Content-led iteration (every feature becomes a blog post)

---

## Appendices

### Appendix A: The SUCKS Framework (Anti-AI Writing)

Detecting AI-generated content:

| Letter | Pattern | Fix |
|--------|---------|-----|
| **S** | Sycophantic openers ("Great question!") | Delete entirely |
| **U** | Unnecessary qualifiers ("It's important to note...") | Cut to the point |
| **C** | Cliché phrases ("In today's fast-paced world") | Replace with specific |
| **K** | Kludgy transitions ("Furthermore," "Moreover") | Natural bridges |
| **S** | Sterile tone (no personality) | Inject voice |

### Appendix B: The 4S Framework (Transformation)

Every transformation follows:

| Stage | What It Is | Questions |
|-------|-----------|-----------|
| **Source** | Raw material | What are we working with? |
| **Substance** | Core insight | What's worth saying? |
| **Structure** | Format/shape | What container fits? |
| **Style** | Voice/tone | How should it sound? |

### Appendix C: Key References

**Internal:**
- `skill-stack/.claude/NARRATIVE.md` — Cyborg Advantage thesis
- `skill-stack/.claude/SKILL-WIZARD-SPEC.md` — Wizard pattern specification
- `Spiral/docs/2025-12-30-oracle-session-learnings.md` — Strategic analysis
- `Spiral/Previous conversation/` — Earlier product vision docs

**External:**
- Sarah Tavel on social prompts: Benchmark partner insights
- David Deutsch on explanations: "A good explanation is hard to vary"
- Jack Dorsey on features: "Limit features, make each perfect"
- August Bradley "Command the Page": Transformation > generation

### Appendix D: Open Questions

1. **What does Every.to's existing Spiral codebase look like?** — Need to understand what can be reused vs. rebuilt
2. **Who are the churned users and why did they leave?** — Critical for avoiding same mistakes
3. **What's the team composition and culture?** — Alignment matters for execution
4. **What's the runway and revenue pressure?** — Affects how aggressive we can be with cuts
5. **Is there appetite for the "individual power first" approach?** — Or is social layer expected?

---

## Closing

Spiral 1.0 had the right instincts. It understood that:
- Writers transform, they don't generate
- Voice is the differentiator
- Skills should be shareable
- AI should augment, not replace

The execution missed because it tried to be comprehensive before being perfect at anything.

Spiral 2.0 has one job: **Extract what you're trying to say and say it in your voice.**

That's the product. Everything else serves that core or gets cut.

---

*Document created: 2025-12-30*
*Status: Application-ready source document*
*Mine this for: application materials, interview prep, blog posts, talking points, slide decks*
*Total length: ~6,000 words*
