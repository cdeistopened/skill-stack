# How I Finally Got My Voice Memos Out of Apple's Walled Garden

I've been recording voice memos for years. Quick ideas while driving, reflections on walks, meeting notes. Hundreds of recordings trapped in Apple's Voice Memos app with no good way to actually *use* them.

I wanted them as text files. Searchable. Taggable. In my PKM system where I could actually find things.

## The Problem

If you've ever tried to "export" voice memos from Apple, you know the pain:
- Drag and drop works for one file at a time (barely)
- Bulk export crashes or hangs
- The files have garbage names like `20240115 142302-A7F3B2C1.m4a`
- Your custom titles? Locked in a database somewhere

I tried the obvious stuff. AirDrop. iTunes sync. Third-party apps. All terrible.

## The Rabbit Hole

Then I found Drew Bredvick's [forensic deep-dive](https://drew.tech/posts/ios-memos-obsidian-claude) that completely mapped out how Apple stores Voice Memos. It's... complicated:

- Files live in a hidden folder (`~/Library/Group Containers/group.com.apple.VoiceMemos.shared/Recordings/`)
- Metadata (your titles, dates) is in a SQLite database
- Recent recordings use a new `.qta` format
- And here's the kicker: **Apple now embeds full transcripts directly in the audio files**

That last part is huge. Since late 2024, Voice Memos automatically transcribes everything. The text is just sitting there, hidden inside the file as JSON.

## What Actually Worked

I built a script that:

1. **Reads the database** to get the real recording dates and any custom titles
2. **Extracts Apple's hidden transcripts** from `.qta` files (free, instant)
3. **Falls back to Gemini** for older `.m4a` files that don't have embedded transcripts
4. **Polishes with AI** to clean up filler words, filter out background chatter (kids, family conversations), and add structure
5. **Outputs clean markdown** with frontmatter for Obsidian

The output looks like:

```yaml
---
source: voice-memo
date: 2025-01-15_10-30
title: Product Roadmap Q1 Planning
tags: [product, roadmap, q1-planning]
project: work
action: task
status: unprocessed
---

### Key Decisions

We agreed to prioritize the mobile app over...
```

## The One Gotcha: Full Disk Access

Your terminal needs explicit permission to read Apple's protected folders. Without it, you get "Operation not permitted" on everything.

System Settings → Privacy & Security → Full Disk Access → Add your terminal app → **Restart the terminal**

That last step trips people up. The permission doesn't take effect until you restart.

## 60 Recordings Later

I ran this on my last 100 voice memos. 60 had enough content to be worth keeping. The rest were short clips, background noise, or pure family chatter (which the AI correctly filtered out).

Now I have a year of ideas, reflections, and random thoughts as searchable markdown files. Finally.

## Try It Yourself

I cleaned up the scripts and put them on GitHub:

**[voice-memos-to-markdown](https://github.com/cdeistopened/voice-memos-to-markdown)**

You'll need:
- macOS Sonoma or later
- A Gemini API key (free tier works fine)
- 5 minutes to set up

The cost? Basically nothing. Apple's embedded transcripts are free. Gemini only kicks in for older recordings, and even then it's pennies.

---

*This is part of my Skill Stack series on building useful AI workflows. Subscribe for more.*
