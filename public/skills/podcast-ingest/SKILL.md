---
name: podcast-ingest
description: Transcribe podcast episodes from RSS feeds using Gemini Flash
version: 0.1.0
tools: [Bash]
---

# Podcast Ingest

Fetches podcast RSS feeds, downloads audio, and produces polished markdown transcripts via Gemini Flash.

## When to Use

- User wants to transcribe a podcast episode or batch of episodes
- User provides an RSS feed URL, podcast name, or direct audio URL
- Building a markdown knowledge base from podcast content

## Commands

```bash
# List episodes from a feed
bun run podcast-ingest/scripts/ingest.ts --feed <rss-url> --list

# Transcribe the latest episode
bun run podcast-ingest/scripts/ingest.ts --feed <rss-url> --limit 1

# Transcribe latest 5 episodes
bun run podcast-ingest/scripts/ingest.ts --feed <rss-url> --limit 5

# Transcribe from direct audio URL
bun run podcast-ingest/scripts/ingest.ts --audio <audio-url> --title "Episode Title"
```

## Requirements

- `GEMINI_API_KEY` environment variable
- Output goes to `output/podcasts/` by default

## Output Format

Each episode produces a markdown file with YAML frontmatter:
```yaml
---
title: "Episode Title"
podcast: "Podcast Name"
author: "Host Name"
date: "2026-02-18"
source: "https://..."
type: "podcast-transcript"
---
```

Followed by: Summary, Topics, Speakers list, and full sectioned transcript.

## Cost

~$0.005 per hour of audio (Gemini Flash). A typical 1-hour episode costs less than a penny.
