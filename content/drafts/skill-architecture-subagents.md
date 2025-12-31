# Architecting Skills with Sub-Agents: Context Management for Complex Workflows

*How to break down AI workflows into focused stages that don't overwhelm the context window*

---

## The Problem: Context Window Bloat

When you build a skill for a multi-step workflow, the naive approach is to dump everything into one massive prompt. All the style guides, all the examples, all the reference materials.

But here's what happens: by the time you're drafting paragraph three, the model is swimming in subject line formulas it doesn't need anymore. The swipe file of 50 headline examples is eating context that should be holding your actual draft.

The context window isn't unlimited. And even when it's large, relevance degrades. The model starts pattern-matching against irrelevant examples. Your newsletter draft sounds like a subject line.

## The Solution: Stage-Specific Sub-Agents

Instead of one monolithic skill, break your workflow into stages. Each stage gets:

1. **Only the inputs it needs** - refined outputs from previous stages, not the full conversation
2. **Focused reference materials** - the subject line guide for the subject line stage, not the drafting stage
3. **Clear output format** - structured artifacts that feed the next stage

This uses Claude Code's Task tool to spawn sub-agents that operate with clean context.

## Real Example: Newsletter Workflow

Here's how this plays out for a daily newsletter:

### Stage 1: Source Build
**Input:** Notion database of staged content
**Output:** `Source_Material.md` with URLs, key quotes, angle notes
**Context needed:** How to pull from Notion, what makes good source material

### Stage 2: Angles & Substance
**Input:** `Source_Material.md`
**Output:** `Checkpoint_1.md` with angle options, unifying theme
**Context needed:** Brand beliefs, audience persona, orthogonality rules

### Stage 3: Draft
**Input:** `Checkpoint_1.md` with approved angles
**Output:** `Newsletter_DRAFT.md`
**Context needed:** Voice guide, sentence rhythm rules, structural patterns

### Stage 4: Subject Lines
**Input:** Draft (for context), unifying theme
**Output:** 10 subject line options categorized by type
**Context needed:** Subject line formulas, swipe file, curiosity patterns

### Stage 5: Final Assembly
**Input:** Draft + chosen subject line
**Output:** `Newsletter_FINAL.md` with preview text
**Context needed:** Preview text formula only

Notice what's NOT happening: Stage 3 doesn't have the subject line swipe file. Stage 4 doesn't have the voice guide. Each stage gets surgical context.

## The Key Insight: Decompose Your Own Knowledge

To build this architecture, you need to ask:

1. **What are the discrete steps?** Not "write a newsletter" but "select sources → develop angles → draft → write subject lines → assemble"

2. **What context does each step actually need?** The subject line stage needs headline formulas. It doesn't need your 2000-word voice guide.

3. **What's the handoff artifact?** Each stage produces a structured output that the next stage consumes. This is the interface between stages.

4. **Where do you need human approval?** Some stages should checkpoint with the user. Angles before drafting. Subject line selection before final assembly.

## Benefits

**Reduced context bleeding.** When you're drafting, you're not fighting against 50 subject line examples pulling your prose toward punchiness.

**Easier debugging.** If the subject lines are weak, you know which stage to fix. You don't have to untangle where in a 3000-token prompt the model went wrong.

**Rerunnable stages.** Don't like the angles? Rerun Stage 2 without regenerating source material. Each stage is independent.

**Incremental refinement.** You can improve the subject line sub-agent without touching the drafting sub-agent. The skill evolves in pieces.

## How to Implement

In Claude Code, use the Task tool to spawn sub-agents:

```
Task tool with subagent_type="general-purpose"
Prompt: "You are the Subject Line Generator sub-agent. Your inputs are: [draft summary], [unifying theme]. Your job is to generate 10 subject line options..."
```

Each sub-agent gets a focused prompt with only the context it needs. It returns structured output. The parent workflow coordinates handoffs.

## The Continuous Evolution Pattern

Skills aren't static. As you use them, you'll notice:

- "The draft stage keeps producing choppy prose" → Add sentence rhythm guidance to Stage 3
- "Subject lines are too vague" → Add counterintuitive framing examples to Stage 4
- "Preview text doesn't give enough context" → Update the formula in Stage 5

The key: update the specific stage that's failing, with real examples from actual failures. Not hypothetical "good/bad" examples - concrete examples from your workflow.

This is how skills compound. Each failure teaches you something. You capture it in the right place. The skill gets better without ballooning into an unmanageable blob.

---

## Summary

1. **Break workflows into stages** with clear inputs, outputs, and context requirements
2. **Each stage gets only what it needs** - no subject line swipe files during drafting
3. **Handoff artifacts are the interface** - structured outputs that feed the next stage
4. **Human checkpoints where judgment matters** - approval gates between stages
5. **Evolve incrementally** - update the specific stage that's failing, with real examples

The context window is precious. Don't waste it on irrelevant reference material. Architect your skills to deliver surgical context at each step.
