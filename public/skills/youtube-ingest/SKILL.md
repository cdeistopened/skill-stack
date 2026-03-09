---
name: youtube-ingest
description: Transcribe YouTube videos and playlists using Gemini Flash
version: 0.1.0
tools: [Bash]
---

# YouTube Ingest

Downloads YouTube audio via yt-dlp and produces polished markdown transcripts via Gemini Flash.

## When to Use

- User wants to transcribe a YouTube video or playlist
- Building a knowledge base from YouTube content
- Extracting insights from video lectures, interviews, talks

## Commands

```bash
# Transcribe a single video
bun run youtube-ingest/scripts/ingest.ts --url "https://youtube.com/watch?v=..."

# List videos in a playlist
bun run youtube-ingest/scripts/ingest.ts --playlist "https://youtube.com/playlist?list=..." --list

# Transcribe first 5 videos from playlist
bun run youtube-ingest/scripts/ingest.ts --playlist "https://youtube.com/playlist?list=..." --limit 5
```

## Requirements

- `GEMINI_API_KEY` environment variable
- `yt-dlp` installed (`brew install yt-dlp`)
- Output goes to `output/youtube/` by default

## Output Format

Each video produces a markdown file with YAML frontmatter containing title, channel, videoId, source URL, and full transcript with sections.

## Cost

~$0.005 per hour of audio (Gemini Flash).
