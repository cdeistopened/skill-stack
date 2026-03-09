---
name: rss-digest
description: Fetch RSS feeds and generate AI-summarized daily digests
version: 0.1.0
tools: [Bash]
---

# RSS Digest

Fetches RSS/Atom feeds, filters by keywords, and generates AI-summarized digests.

## When to Use

- User wants a daily/weekly digest of their RSS feeds
- Monitoring topics across multiple sources
- Building a curated reading list with summaries

## Commands

```bash
# Digest from a single feed
bun run rss-digest/scripts/digest.ts --url <feed-url>

# Digest from feeds.json config (incremental — auto-calculates since lastRun)
bun run rss-digest/scripts/digest.ts --feeds feeds.json

# Digest from OPML export
bun run rss-digest/scripts/digest.ts --opml feeds.opml --hours 48

# Raw article list (no AI summary)
bun run rss-digest/scripts/digest.ts --feeds feeds.json --raw
```

## feeds.json Format

```json
{
  "feeds": [
    "https://example.com/feed",
    "https://another.com/rss"
  ],
  "lastRun": "2026-02-18T00:00:00Z",
  "keywords": ["education", "AI"],
  "noKeywords": ["sponsored", "advertisement"]
}
```

## Requirements

- `GEMINI_API_KEY` environment variable
- Output goes to `output/digests/` by default

## Key Feature: Incremental Fetching

When using `--feeds`, the script reads `lastRun` from the config and only fetches articles published since then. After running, it updates `lastRun` automatically. Never manually specify `--hours` unless overriding.

## Output

Markdown digest with executive summary, themed article groups, and "Worth Reading" highlights.
