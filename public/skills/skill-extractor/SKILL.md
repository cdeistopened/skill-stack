---
name: skill-extractor
description: Extract actionable Claude Code skills from raw source material — transcripts, conversations, workflows, expertise dumps. This skill identifies repeatable, promptable workflows embedded in content and scores them by leverage. Use when processing a corpus (podcast transcripts, blog posts, course material) to discover what skills could be built from it.
---

# Skill Extractor

Turn raw source material into a list of buildable Claude Code skills. Not a knowledge base — skills are *workflows Claude can execute*, not facts Claude should know.

## The Core Distinction

**Skill** = a repeatable workflow with inputs, steps, and outputs that Claude executes inside a coding environment. Writing a YouTube script. Running an SEO audit. Drafting a newsletter. Creating ad copy.

**Not a skill** = static knowledge, reference material, domain expertise. How to raise meat birds. The history of fasting. Nutritional science. These become wiki articles, books, or reference docs — not skills.

**The test:** Can Claude *do* this thing, repeatedly, with different inputs, and produce a useful output? If yes → skill. If it's something Claude *knows* and references → not a skill.

---

## Skill Taxonomy

Score each candidate against these six hallmarks. A strong skill exhibits 2+ of these.

### 1. Repeated SOP / Workflow
Something done regularly as part of a content or business process. The more often it's done, the higher the leverage.

**Examples:** Newsletter drafting, social post creation, podcast show notes, SEO content briefs, weekly reporting

### 2. Disposable One-Shot
Valuable but infrequent. Done once per project or client. Still worth codifying because it saves hours when needed — and becomes an agency offering if done for others.

**Examples:** Writing a LinkedIn bio, Amazon category research, brand identity creation, book launch checklist, landing page copy

### 3. Specific Knowledge Applied as Process
Domain expertise distilled into a repeatable method — not raw knowledge, but knowledge *operationalized* into steps Claude can follow.

**Examples:** Kallaway's "7 Lego Bricks" for short-form → YouTube scriptwriting skill. Dan Koe's "one-person business" model → content strategy skill. NOT "the history of short-form video" (that's reference).

### 4. Step-by-Step Process
A clear sequence where order matters. Often teachable, often already described as numbered steps in the source material.

**Examples:** Video editing workflow, podcast production pipeline, email sequence writing, ad creative testing process

### 5. Example-Driven
Skills where having 3-5 concrete examples dramatically improves output quality. The examples ARE the skill — they teach by pattern, not by instruction.

**Examples:** Voice/style skills (Trung Phan, Tyler Cowen), ad creative frameworks, hook writing, cold open creation

### 6. Tool-Augmented
Skills that benefit from MCP servers, API calls, CLI tools, or other integrations. These extend Claude's autonomy — the model can work longer without human input.

**Examples:** SEO keyword research (DataForSEO), social media scraping (Apify), RSS curation, image generation (Gemini), video processing (ffmpeg)

---

## Available Tool Ecosystem

When evaluating whether a skill candidate is tool-augmented, consider what's currently available:

**MCP Servers (live in this workspace):**
- Slack (channels, messages, search)
- Google Drive (docs, sheets, slides, folders)
- Google Calendar (events, scheduling, freebusy)
- Apify (web scraping actors — YouTube, Twitter, any site)
- Notion (pages, databases, search)
- Video-audio (trim, convert, subtitles, overlays, concatenate)
- Context7 (library documentation lookup)

**CLI Tools:**
- ffmpeg (video/audio processing)
- yt-dlp (YouTube downloading)
- Whisper (transcription)
- qmd (local markdown search / RAG)
- gh (GitHub CLI)
- Bun/Node (JS execution)
- Python (scripting, data processing)

**APIs (via scripts):**
- DataForSEO (keyword research, SERP, rankings)
- Gemini (deep research, image generation, large-context writing)
- ElevenLabs (voice cloning)
- HubSpot (email marketing)
- Webflow (CMS publishing)

When a source mentions a workflow that *could* be automated with these tools but the creator does it manually, that's a high-value skill candidate.

---

## Extraction Workflow

### Phase 1: Ingest and Scan

**Input:** Raw source material — transcripts, blog posts, course outlines, conversation logs, wiki chunks.

Read the material. Identify skill candidates based on pattern recognition from existing skills in this workspace. For each candidate:

```markdown
### [Candidate Name]
- **What it does:** One sentence
- **Source:** Where in the material this was found
- **Hallmarks:** Which taxonomy items (1-6) it exhibits
- **Input → Output:** What goes in, what comes out
- **Frequency:** daily / weekly / per-project / one-time
```

### Phase 2: Score and Rank

| Dimension | Question | Score |
|-----------|----------|-------|
| **Leverage** | How much time/effort does this save per use? | 1-5 |
| **Frequency** | How often would this be used? | 1-5 |
| **Promptability** | How well can Claude execute this with a skill file? | 1-5 |

**Leverage × Frequency × Promptability = Extraction Priority**

High-priority (50+): build immediately. Medium (25-49): build when needed. Low (<25): note or discard.

### Phase 3: Spec the Winners

For each high-priority candidate, draft a skill spec for the skill-creator:

```markdown
## Skill Spec: [name]

**Purpose:** What this skill accomplishes
**Trigger:** What would the user say to invoke this?
**Not for:** What this skill should NOT be used for

**Input → Output**
**Workflow:** [numbered steps]
**Bundled Resources:** scripts, references, assets needed
**Tool Dependencies:** MCPs, APIs, CLI tools required
**Examples Needed:** What examples would make this work well?
**Source Attribution:** Where this was extracted from
```

### Phase 4: Present to User

1. Top 5 high-priority skills with full specs
2. Medium-priority as one-liners
3. Non-skill material routed elsewhere

Ask: "Which should I build first?"

---

## Routing Non-Skills

| Type | Destination |
|------|-------------|
| Domain knowledge / facts | Wiki article or reference doc |
| Opinion / philosophy | Blog post or book chapter |
| Personal story / anecdote | Narrative snippet for content |
| Tool recommendation | Relevant project's CLAUDE.md |
| Business strategy | Strategy doc or CIA-OFFER.md |

---

## Test Corpora

Already chunked and indexed in wiki-projects:
- **Kallaway** — 66 chunks, framework-dense → should yield many skills
- **Jenny Hoyos** — 60 chunks, short-form methodology → should yield skills
- **Colin & Samir** — 119 chunks, strategy + interviews → mixed

---

## Related Skills

- **skill-creator** — Takes a spec and builds the full skill. Extractor feeds into creator.
- **voice-analyzer** / **voice-wizard** — Specialized extractors for voice/style skills.
- **anti-ai-writing** — Example of a well-built skill.
- **book-chapter-writer** — Example of a complex multi-phase workflow skill.

---

*Extract the workflow, not the knowledge. If Claude can DO it repeatedly with different inputs, it's a skill. If Claude can only KNOW it, it's a reference doc.*
