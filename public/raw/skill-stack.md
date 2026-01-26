# The Skill Stack

> Model intelligence is no longer the limit. Your ability to engineer context is. Here's how skills change everything.

---
Type: post
Date: 2026-01-07
Reading time: 5 min read
Tags: skills, context-engineering, claude-code, ai-writing
---

The models keep getting smarter. But are you?

For years, we chased better prompts. We collected frameworks. We fine-tuned our instructions. And it worked - sort of. The output improved. But something fundamental remained broken: every conversation started from zero.

Your AI assistant had amnesia. You'd explain your voice, your goals, your preferences - again. And again. And again.

The second brain promised to fix this. Tiago Forte, August Bradley, a whole generation of PKM enthusiasts built elaborate systems for capturing and organizing knowledge. The vision was beautiful. The execution was maintenance hell - endless copying and pasting in and out of whatever your chosen app: Evernote, Obsidian, Notion, you name it.

Then came the breakthrough.

## Skills Changed Everything

A skill is a markdown file that makes your AI smarter. That's it. No API. No code. Just text that teaches.

When I first saw Anthropic's skills specification, I recognized something I'd been circling for years. Back in 2023, I wrote [Command the Page](https://www.amazon.com/Command-Page-AI-Assisted-Future-Proof-Creative/dp/B0CQMKTPRB) - a guide to AI-assisted writing that laid out my early frameworks. That evolved into [the 4S Framework](/4s-framework) - Source, Substance, Structure, Style - a way to feed AI the context it needed to produce work that actually sounded like me.

Skills formalize what I'd been hacking together. Let me explain how they work at the root.

A skill is just a file inside a folder. It's a markdown file. Essentially a prompt, but following conventions that include front matter - metadata that enables something called progressive disclosure. The AI loads what it needs, when it needs it.

```
.claude/
├── CLAUDE.md          # Who you are, how you work
├── skills/            # Modular capabilities
│   └── voice-matching/
│       └── SKILL.md   # Instructions + examples
└── sessions/          # Memory across conversations
```

The AI loads your identity first, then fetches specific skills only when needed. No more bloated prompts. No more explaining yourself every session.

Now, you'll find a lot of skill repos proliferating under fancy names like "Awesome Claude Skills." But if you look underneath the hood, most of these skills aren't that awesome. They contain what's already in the training data. That doesn't need elaboration.

A good skill is customized to your use case. It contains either tools or specifications for your own workflows. It's knowledge the model doesn't have - and can't have - without you teaching it.

## The Real Game

Here's what people miss: the models are good enough. They've been good enough for a while. And they're only getting better. The bottleneck moved.

The bottleneck is now your ability to engineer context.

Context engineering means loading the right knowledge at the right time. It means building skills that compound - each one making your AI more useful. It means creating a system that learns because *you* taught it what to learn.

This is why I get annoyed when people ask for prompt templates. Templates are training wheels you never take off. Skills are the bicycle.

## My Stack

I run this as Head of Content for an education company. My job: build a lightweight content engine that produces consistent work across multiple formats. Newsletters, social posts, podcast production, course materials. The whole operation runs through Claude Code.

Here's what I actually use:

**Voice Matching** - I fed it samples of my writing. Now it catches when drafts drift toward generic AI prose.

**Anti-AI Writing** - A checklist of patterns to eliminate. The correlative construction ("X isn't just Y - it's Z") dies on sight.

**Transcript Polisher** - Raw podcast audio becomes readable text without losing the speaker's quirks.

**Image Prompt Generator** - Connected to Gemini 3, this skill brainstorms visual concepts and generates thumbnails in a consistent brand style.

**Podcast Blog Post Creator** - Transforms episode transcripts into SEO-optimized blog posts while preserving the conversational tone.

**Hook & Headline Writing** - Generates scroll-stopping openers for social content and email subject lines.

None of these are magic. They're documented knowledge. The power comes from stacking them.

[Check out the full skills library](/skills) - I've tried to make them portable by including instructions on how to customize them to your own use cases.

## Why This Matters

Skills belong to you. You build them. You modify them. You understand what's happening.

The alternative is black-box automation. Someone else's workflow imposed on your problems. Fine for getting started. Terrible for doing your best work.

## The Opportunity

AI tools are racing toward proactive assistance - systems that act before you ask. Spiral, the writing app I'm applying to help build, bets its entire product on this. Their thesis: the future is AI that configures itself based on how you write.

They're right. And skills are how you get there.

The person who masters context engineering makes their old job obsolete. Not in the dystopian sense. In the liberation sense. The tedious parts evaporate. What remains is judgment, taste, the work that actually matters.

I write this newsletter to help you become that person. Each week, one skill. Portable. Documented. Yours to modify.

The model is smart enough. Time to catch up.