---
name: deep-research
description: Run Gemini Deep Research from Claude Code. Optimizes prompts for depth and structure, then executes multi-step research via the Interactions API. Use when you need in-depth analysis, competitive landscaping, literature reviews, market research, or any question requiring real-time web research across many sources.
---

# Gemini Deep Research

Delegate deep, multi-source research to Gemini's Deep Research agent. This skill optimizes the user's research question into a structured prompt, fires it off via the Interactions API, and returns the full report.

## When to Use

- Market research, competitive analysis, due diligence
- Literature reviews, state-of-the-art surveys
- Historical deep dives on people, movements, or ideas
- "What does the current landscape look like for X?"
- Any question that benefits from searching 50-100+ web sources
- When the user explicitly asks for "deep research" or wants comprehensive analysis

## When NOT to Use

- Quick factual lookups (use WebSearch instead)
- Code questions or debugging
- Tasks requiring real-time interaction or low latency
- Questions about the user's local codebase

## Workflow

### Phase 1: Optimize the Research Prompt

Before sending to Gemini, transform the user's raw request into a well-structured research prompt. This is critical — Deep Research quality scales with prompt quality.

**Prompt optimization checklist:**

1. **Scope the question clearly** — What specifically should be researched? Add boundaries (time period, geography, industry, etc.)
2. **Define the output structure** — Tell Gemini exactly what sections/format you want
3. **Specify depth expectations** — "Include specific examples," "cite primary sources," "compare at least 5 competitors"
4. **Add anti-hallucination guardrails** — "Only include claims with verifiable sources," "distinguish between confirmed facts and speculation"
5. **Request citations** — "Include source URLs for all major claims"

**Template for optimized prompts:**

```
Research [TOPIC] with the following scope and structure:

## Scope
[Boundaries: time period, geography, domain, exclusions]

## Required Sections
1. [Section with specific instructions]
2. [Section with specific instructions]
3. [Section with specific instructions]

## Output Requirements
- Include source URLs for all major claims
- Distinguish between confirmed facts and projections/speculation
- Include a summary table comparing [key dimensions]
- Target depth: [comprehensive / focused overview / executive summary]
```

**Show the user the optimized prompt** before executing. Ask for approval or modifications.

### Phase 2: Execute the Research

Use the bundled script to run the research. The script handles the async polling loop.

**For research that should run while the user continues working:**

```bash
# Start async — returns interaction ID immediately
bash "/Users/charliedeist/Desktop/New Root Docs/.claude/skills/deep-research/scripts/deep-research.sh" --start "OPTIMIZED_PROMPT"
```

Then later:

```bash
# Poll for results
bash "/Users/charliedeist/Desktop/New Root Docs/.claude/skills/deep-research/scripts/deep-research.sh" --poll INTERACTION_ID
```

**For research where we wait for results (typical):**

Run the script in the background using Bash tool's `run_in_background` parameter, since research takes 2-15 minutes:

```bash
bash "/Users/charliedeist/Desktop/New Root Docs/.claude/skills/deep-research/scripts/deep-research.sh" "OPTIMIZED_PROMPT"
```

**Important execution notes:**
- Deep Research takes 2-15 minutes. ALWAYS use `run_in_background: true` or `--start` mode
- Tell the user the estimated wait time and that they can keep working
- The script polls every 10 seconds and prints status to stderr
- Results (the report text) go to stdout

### Phase 3: Present Results

When results arrive:
1. **Save the raw report** to a markdown file in the relevant project directory (e.g., `references/deep-research-TOPIC-YYYY-MM-DD.md`)
2. **Summarize key findings** for the user in chat — don't just dump the whole report
3. **Flag any gaps** where Gemini couldn't find information or noted uncertainty
4. **Suggest next steps** if the research opens up new questions

## API Details

- **Agent:** `deep-research-pro-preview-12-2025`
- **API:** Gemini Interactions API (REST)
- **Auth:** `GEMINI_API_KEY` env var (set in `~/.zshrc`)
- **Cost:** ~$2-5 per research task depending on depth
- **Max time:** 60 minutes (most complete in 5-15 minutes)
- **Script location:** `.claude/skills/deep-research/scripts/deep-research.sh`

## Example Prompt Optimizations

**User says:** "Research competency-based education trends"

**Optimized to:**
```
Research the current state and emerging trends in Competency-Based Education (CBE) in K-12 and higher education in the United States, focusing on 2024-2026.

## Required Sections
1. Executive Summary (3-5 key takeaways)
2. Current Adoption — Which states, districts, and institutions have adopted CBE? Include specific programs and scale.
3. Policy Landscape — Federal and state policy developments affecting CBE (ESSA flexibility, accreditation changes, transcript reform)
4. Technology & Assessment — Tools, platforms, and assessment approaches enabling CBE at scale
5. Criticism & Challenges — Major objections, implementation barriers, equity concerns
6. Key Players — Organizations, thought leaders, and companies driving CBE forward (include a comparison table)
7. Outlook — Where is CBE heading in the next 2-3 years?

## Output Requirements
- Include source URLs for all major claims
- Distinguish confirmed adoption from pilot programs
- Include at least one data table comparing state-level CBE policies
- Target depth: comprehensive
```

**User says:** "What's the deal with micro-schools?"

**Optimized to:**
```
Research the micro-school movement in the United States as of early 2026.

## Required Sections
1. Definition & Landscape — What counts as a micro-school? How many exist? What's the growth trajectory?
2. Major Networks & Operators — Prenda, Acton Academy, KaiPod, and others. Compare their models, scale, and funding.
3. Funding & Business Models — How are micro-schools funded? (Tuition, ESAs, hybrid models, venture capital)
4. Regulatory Environment — How do states classify and regulate micro-schools?
5. Parent & Student Demographics — Who is choosing micro-schools and why?
6. Outcomes & Evidence — What do we know about academic and social outcomes?
7. Criticism & Risks — Accountability concerns, equity gaps, sustainability questions

## Output Requirements
- Include source URLs for all major claims
- Include a comparison table of major micro-school networks (model, # of locations, grade levels, cost, funding)
- Separate established facts from projections
- Target depth: comprehensive
```
