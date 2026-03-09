---
name: gemini-writer
description: Delegate large-context writing tasks to Gemini's 1M token window. Send an entire manuscript + detailed instructions in a single pass. Use for book rewrites, structural refactoring, redundancy analysis, and any writing task where the AI needs to see everything at once.
---

# Gemini Writer

Leverage Gemini 2.5 Pro's 1M token context window for writing tasks that exceed what Claude can hold in a single context. The key advantage: Gemini can read the ENTIRE manuscript plus all annotations, voice guides, and editorial instructions in a single pass, then produce a rewritten chapter that accounts for everything at once.

## When to Use

- **Book manuscript rewrites** — when the author has annotations across multiple chapters and cross-chapter issues need to be resolved simultaneously
- **Structural refactoring** — moving sections between chapters, resolving redundancy, reordering content
- **Voice-consistent rewrites** — when you have a voice guide + source material + current draft and need a revision that respects all three
- **Batch processing** — rewriting multiple chapters one at a time, but with full manuscript context for each

## When NOT to Use

- Quick edits to a single paragraph (just use Claude directly)
- Tasks requiring web search or real-time information (use deep-research instead)
- Tasks where the total context is under 100K tokens (Claude handles this fine)

## Architecture

The script sends content to Gemini's `generateContent` API (not the Interactions/research API). Two modes:

### Single-Pass Mode
Send everything, get one big output. Best for analysis tasks (redundancy audit, structural plan).

### Batch Mode (Recommended for Rewrites)
Send full manuscript as context, but process ONE chapter at a time. This means:
- Gemini sees everything (all chapters, all annotations, all instructions)
- But it only outputs one chapter per call
- This keeps output quality high (no truncation) while maintaining full cross-chapter awareness

## Workflow

### 1. Prepare the Prompt File

Create a markdown file with detailed instructions. Two levels:

**System instruction** (optional, `--system`): Voice guide, style rules, constraints that apply to every chapter.

**Prompt** (`--prompt`): Specific task instructions — what to fix, what to preserve, what to move, what annotations mean.

### 2. Dry Run

Always start with a dry run to verify token counts:

```bash
python3 .claude/skills/gemini-writer/scripts/gemini-writer.py \
  --prompt prompt.md \
  --context manuscript/revised/ \
  --dry-run
```

### 3. Execute

**Batch mode (one chapter at a time):**
```bash
python3 .claude/skills/gemini-writer/scripts/gemini-writer.py \
  --prompt prompt.md \
  --system voice-guide.md \
  --context manuscript/revised/ \
  --output manuscript/v3/ \
  --batch
```

**Single chapter:**
```bash
python3 .claude/skills/gemini-writer/scripts/gemini-writer.py \
  --prompt prompt.md \
  --context manuscript/revised/ \
  --output manuscript/v3/ \
  --batch --chapter 01-introduction.md
```

### 4. Review

Compare outputs against originals. Gemini's rewrites should be treated as strong first drafts that need human editorial review.

## Prompt Engineering Tips

1. **Be explicit about annotations.** Tell Gemini exactly what `{}` means: "Text in curly braces `{}` are the author's editorial comments. Execute these instructions, don't reproduce them."

2. **Give voice samples.** Include 2-3 paragraphs of the author's best writing and say "match this voice."

3. **Specify what to preserve.** Gemini will rewrite aggressively unless you tell it what's working. Say "The following sections are strong and should be preserved with minimal changes: [list]."

4. **Use the system instruction for invariants.** Voice guide, source material rules, theological constraints — anything that applies to every chapter goes in `--system`.

5. **Order matters.** Put the most important instructions first in the prompt. Gemini, like all LLMs, attends more to the beginning.

## Cost & Performance

- **Model:** `gemini-3-pro-preview` (falls back to `gemini-2.5-pro-preview-06-05`)
- **Input cost:** ~$1.25/1M input tokens, ~$10/1M output tokens (as of Feb 2026)
- **Typical manuscript rewrite:** 6 chapters × ~15K tokens each = ~90K input + ~60K output ≈ $0.75
- **Time:** 30-120 seconds per chapter depending on length
- **Max output:** 65,536 tokens per call (~50K words — more than enough for a chapter)

## Script Location

`.claude/skills/gemini-writer/scripts/gemini-writer.py`

Requires: `GEMINI_API_KEY` env var (set in `~/.zshrc`), `httpx` (auto-installed on first run)
