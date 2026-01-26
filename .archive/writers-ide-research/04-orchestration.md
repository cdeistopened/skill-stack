# Orchestration Patterns: Checkpoints and Ralph Loops

> The agent isn't just executing commands - it's managing a creative process with automated quality gates and human checkpoints.

---

## The Orchestration Problem

Complex content workflows require:

1. **Multi-step execution** - Several skills chained together
2. **Quality gates** - Automated rejection of bad drafts
3. **Iteration loops** - Refinement until standards are met
4. **Human checkpoints** - Strategic points where judgment matters
5. **Error recovery** - Graceful handling when things go wrong

A naive approach - one long conversation or manual handoffs - fails because context degrades, standards slip, and momentum dies.

---

## The Ralph Loop: Core Concept

Ralph Loops are an autonomous iteration methodology created by Geoff Huntley. The name comes from Ralph Wiggum - the earnest Simpsons character who keeps trying despite not fully understanding. The loop itself is "dumb," but through persistence and environmental constraints, it produces intelligent results.

The fundamental insight: instead of doing everything in one long conversation (which degrades as context fills up), you run many short, focused iterations. Each iteration:

1. Starts fresh with clean context
2. Reads current state from disk
3. Does one thing well
4. Saves work to disk
5. Exits

The next iteration picks up where the last left off by reading saved state.

### The Minimal Implementation

At its simplest:

```bash
while :; do cat PROMPT.md | claude --dangerously-skip-permissions; done
```

The loop feeds a prompt to Claude, Claude does work, exits, and the loop immediately restarts. Each iteration gets 100% "smart zone" utilization because it starts clean.

### Why Fresh Context Matters

LLMs have advertised context of 200K+ tokens, but the zone where the model reasons well is roughly 40-60% of capacity. As context fills with conversation history, reasoning quality degrades.

Ralph sidesteps this. Iteration 500 is just as sharp as iteration 1.

---

## Shared State: The Plan File

If each iteration starts fresh, how does Ralph know what to do next? 

The answer: `IMPLEMENTATION_PLAN.md` - a file that persists on disk between iterations.

```markdown
# Implementation Plan: January Week 2 Newsletter

## Status: DRAFTING

## Spec: specs/newsletter-issue.md

## Sources Compiled: Yes
- sources/compiled/jan-week-2/competitor-scan.md
- sources/compiled/jan-week-2/funding-updates.md

## Outline
1. [x] Hook — Arizona funding deadline creates urgency
2. [ ] Context — What the deadline means
3. [ ] Action steps — Exactly what to do
4. [ ] CTA — Share with one other family

## Current Draft: drafts/jan-week-2/v2.md

## Judge Verdicts (v2)
- Accuracy Checker: PASS
- Human Detector: FAIL — "comprehensive overview" in paragraph 3

## Next Action
Revise section 3 opening, remove AI tell.

## Discoveries
- Arizona deadline is Feb 15, not Feb 1 (corrected in v2)
```

Each iteration:
1. Reads the plan
2. Picks the most important incomplete task
3. Does the work
4. Updates the plan
5. Exits

The plan is disposable. If Ralph goes off track, delete and regenerate.

---

## Backpressure: The Critical Constraint

Backpressure is anything that *rejects* work and forces the loop to try again.

In coding: tests fail, lints error, builds break.

In writing: **the Judge Panel**.

Without backpressure, Ralph would happily produce garbage and move on. Backpressure is what makes the loop converge on quality.

---

## The Judge Panel: Writing's Backpressure

Writing quality is hard to verify programmatically. "Does this read like a human wrote it?" isn't a unit test.

The solution: LLM-as-judge with specialized personas. Each persona is a critic with specific concerns and high but passable standards.

### The Personas

**Human Detector (Supreme Judge)**

The most important gate. If this fails, nothing else matters.

Looks for:
- AI tell phrases ("It's important to note...", "comprehensive guide...")
- Structural tells (every paragraph same length, suspiciously smooth transitions)
- Hedging stacks ("may potentially possibly")
- List addiction where prose belongs
- Absence of opinion, stance, or rough edges

Passing looks like: reads like someone wrote it in one sitting with coffee, has a discernible point of view, some sentences short, others long because the thought demanded it.

**Accuracy Checker**

Verifies claims against sources:
- Unsubstantiated claims
- Misquotes
- Missing citations
- Statistics without sources

**Reader Advocate**

Represents the audience:
- Would I keep reading after paragraph one?
- Do I care what happens next?
- Is there a clear point or just information?
- Would I share this?

**Voice Guardian**

Enforces brand voice and tone:
- Warm, practical, slightly rebellious (for OpenEd)
- The experienced friend, not the expert lecturing
- Never defensive, preachy, or trying to convince skeptics

**SEO Advisor (Advisory, Non-Blocking)**

Checks keywords, structure, links. Provides recommendations but doesn't block. SEO that sounds like SEO fails Human Detector anyway.

### Judge Hierarchy

Judges can have competing mandates:

```
SEO Advisor: "Need the keyword in first 100 words"
Reader Advocate: "That opener is clunky"
Human Detector: "This reads optimized for Google"
```

Resolution: **Tiered hierarchy**

```
TIER 1 - Foundations (blocking, must pass before Tier 2):
  1. Accuracy Checker — are the facts right?
  2. Human Detector — does it read human?

TIER 2 - Polish (parallel, all feedback at once):
  - Reader Advocate
  - Voice Guardian
  - SEO Advisor (advisory only)
```

If Tier 1 fails, Tier 2 doesn't run. No point polishing prose that's factually wrong or sounds like ChatGPT.

---

## The Loop Mechanics

### Two Modes: Planning and Building

**Planning Mode:**
- Analyzes specs against current state
- Identifies gaps
- Produces prioritized task list
- Does NOT implement

**Building Mode:**
- Reads the plan
- Picks most important task
- Implements it
- Runs validation (judges)
- Updates plan
- Exits

### Drafting + Judging Cycle

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────┐                                                │
│  │ Draft Mode  │ ← picks task from plan                         │
│  │             │ ← does targeted revision                       │
│  │             │ ← saves new version                            │
│  │             │ ← updates plan                                 │
│  └──────┬──────┘                                                │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ Judge Mode  │ ← runs Tier 1 (Accuracy, Human)                │
│  │             │                                                │
│  │   FAIL? ────┼──► back to Draft Mode ─────────────────────────┤
│  │             │                                                │
│  │   PASS ─────┼──► runs Tier 2 (Reader, Voice)                 │
│  │             │                                                │
│  │   ALL PASS? ┼──► ship to output/ ───► EXIT                   │
│  │             │                                                │
│  │   FAIL? ────┼──► back to Draft Mode ─────────────────────────┤
│  └─────────────┘                                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Ralph and Nelson: The Dynamic

Ralph represents the earnest, persistent loop. Nelson represents backpressure - pointing and laughing at bad drafts.

```
Ralph: "I made a newsletter!"
Nelson: "HA-HA! You used 'comprehensive' in the first paragraph."

Ralph: [revises, tries again]
Ralph: "I made a newsletter!"
Nelson: "HA-HA! Every paragraph is exactly four sentences."

Ralph: [revises, tries again]
Ralph: "I made a newsletter!"
Nelson: "...acceptable."
```

---

## Checkpoints: Human in the Loop

Checkpoints are where the loop pauses for human input. Unlike judges (automated, pass/fail), checkpoints require judgment calls.

### When to Checkpoint

| Checkpoint | Purpose | Example |
|------------|---------|---------|
| **Outline** | Confirm direction before drafting | "These themes? This structure?" |
| **Draft** | Review before polish | "Tone right? Missing anything?" |
| **Branch** | Choose between valid paths | "Long-form or thread?" |
| **Final** | Last approval before publish | "Ready to ship?" |

### Checkpoint UI

```
╔═══════════════════════════════════════════════════════════════╗
║  CHECKPOINT: Outline Review                                   ║
╠═══════════════════════════════════════════════════════════════╣
║  Main themes identified:                                      ║
║                                                               ║
║  1. The 4S Framework introduction                             ║
║  2. Why "sourcery" beats "sorcery"                            ║
║  3. Practical application example                             ║
║                                                               ║
║  [Approve] [Modify] [Add theme] [Change angle]                ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## The Writing Engine Structure

Full folder structure for Ralph-based writing:

```
writing-engine/
├── loop.sh                         # Ralph loop script
├── PROMPT_draft.md                 # Drafting mode
├── PROMPT_judge.md                 # Judge panel
├── AGENTS.md                       # Voice rules, patterns
├── IMPLEMENTATION_PLAN.md          # Current state
│
├── specs/                          # Requirements per piece type
│   ├── newsletter-issue.md         
│   ├── podcast-show-notes.md       
│   └── blog-post.md                
│
├── sources/                        
│   ├── raw/                        # Unprocessed inputs
│   └── compiled/                   # Per-piece sources
│
├── personas/                       # Judge definitions
│   ├── human-detector.md           
│   ├── accuracy-checker.md         
│   ├── reader-advocate.md          
│   ├── voice-guardian.md           
│   └── seo-advisor.md              
│
├── drafts/                         
│   └── [piece-slug]/
│       ├── v1.md
│       ├── v2.md
│       └── current.md              # Always latest
│
└── output/                         # Shipped pieces
```

---

## Specs: Writing Requirements

A spec defines what a piece must accomplish:

```markdown
# Newsletter Issue Spec

## Audience
Homeschool parents considering alternatives.

## Jobs to Be Done
- Feel informed about options
- Get actionable next steps
- Feel part of a movement

## Required Elements
- Hook creating stakes in first 2 sentences
- 1-2 concrete stories (not abstract)
- Clear CTA

## Constraints
- 800-1200 words
- Grade 8 reading level
- Zero AI tells

## Source Requirements
- Minimum 2 verified sources
- Claims about law must cite official source
```

---

## AGENTS.md for Writing

Operational guide loaded every iteration:

```markdown
## Voice & Style
Warm, practical, slightly rebellious.
The experienced friend, not the expert lecturing.

## Draft Versioning
- Save each revision as v1.md, v2.md, etc.
- current.md always copies latest
- Never overwrite previous versions

## Revision Approach
- Targeted revisions, not full rewrites
- Address one judge's feedback per revision
- Always re-run full panel after revisions

## Judge Panel Sequence
Tier 1 (blocking, sequential):
  1. Accuracy Checker
  2. Human Detector

Tier 2 (parallel, blocking):
  - Reader Advocate
  - Voice Guardian

Advisory (logged, non-blocking):
  - SEO Advisor
```

---

## Key Principles

**Let Ralph Ralph**

Trust the loop to self-correct. Don't over-specify implementation. Your job is environment and constraints, not micromanagement.

**Stay Outside the Loop**

Your role is to observe and tune. Watch for patterns. When Ralph fails in specific ways, add guardrails. The prompts you start with won't be the prompts you end with.

**The Plan is Disposable**

Wrong trajectory? Throw out the plan and regenerate. Cheap compared to going in circles.

**Simplicity Wins**

Verbose prompts degrade determinism. Prefer markdown over JSON. Keep it simple.

---

## Why This Works for Writing

**Consistent Quality at Volume**

The judge panel doesn't get tired. Iteration 50 gets the same scrutiny as iteration 1.

**Explicit Quality Criteria**

"Reads human" becomes checkable patterns. "Engaging" becomes specific hooks. Quality becomes reproducible.

**No Context Degradation**

Late-stage revisions are as sharp as early ones.

**Separation of Concerns**

Research, drafting, judging are separate modes. Each optimized independently.

**Recoverable**

Every version saved. If the loop goes sideways, roll back.

---

*Ralph works because it embraces simplicity and persistence over sophistication and control. The loop is dumb. The backpressure is harsh. But together, over iterations, they converge on quality.*
