---
name: web-scrape
description: Scrape web pages to clean markdown with optional AI summaries
version: 0.1.0
tools: [Bash]
---

# Web Scrape

Fetches web pages, converts HTML to clean markdown, with optional AI summarization.

## When to Use

- User wants to save a web article as markdown
- Batch scraping a list of URLs
- Building a research corpus from web sources

## Commands

```bash
# Scrape a single URL
bun run web-scrape/scripts/scrape.ts --url "https://example.com/article"

# Scrape with AI summary
bun run web-scrape/scripts/scrape.ts --url "https://example.com/article" --summarize

# Batch scrape from file (one URL per line)
bun run web-scrape/scripts/scrape.ts --file urls.txt

# Batch scrape with summaries
bun run web-scrape/scripts/scrape.ts --file urls.txt --summarize
```

## Requirements

- `GEMINI_API_KEY` environment variable (only for --summarize)
- Output goes to `output/scraped/` by default

## Output

Markdown file with YAML frontmatter (title, author, source, word count) and clean article content. The `--summarize` flag prepends bullet-point summary + topic tags.

## Features

- Extracts `<article>` or `<main>` content when available
- Strips nav, footer, scripts, ads
- Preserves headings, links, code blocks, lists
- Extracts metadata from Open Graph and meta tags
