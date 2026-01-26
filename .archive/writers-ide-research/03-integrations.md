# Integration Layer: Seamless Import and Export

> The friction between capture and publish is where content dies.

---

## The Integration Problem

Most creators work across fragmented tools:
- Record in Riverside or Descript
- Edit in Google Docs
- Publish via WordPress or Substack
- Post to Twitter/X manually
- Store notes in Notion
- Track analytics in separate dashboards

Each boundary requires manual work. Each manual step is a place where momentum dies.

The Writer's IDE solves this by making the workspace the hub - content flows in automatically, transforms via skills, and flows out to distribution channels.

---

## The Three Integration Types

```
┌───────────────────────────────────────────────────────────────────┐
│                     INTEGRATION ARCHITECTURE                       │
└───────────────────────────────────────────────────────────────────┘

         IMPORT                  TRANSFORM                 EXPORT
    (Sources → Corpus)      (Skills → Assets)      (Assets → Channels)
           │                        │                        │
           ▼                        ▼                        ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│ Descript        │      │                 │      │ Convex          │
│ Riverside       │      │    THE          │      │ (markdown sync) │
│ YouTube         │ ───► │    WORKSPACE    │ ───► │                 │
│ X/Twitter       │      │                 │      │ AgentMail       │
│ Notion          │      │  content/       │      │ (newsletter)    │
│ RSS feeds       │      │  .claude/       │      │                 │
│ Voice memos     │      │  corpus/        │      │ Social APIs     │
│ PDFs            │      │                 │      │ (X, LinkedIn)   │
└─────────────────┘      └─────────────────┘      └─────────────────┘
         │                        │                        │
         │              ┌─────────┴─────────┐              │
         │              │  MEDIA GENERATION │              │
         │              │                   │              │
         │              │  Gemini (images)  │              │
         │              │  Nano Banana      │              │
         │              │  Canva            │              │
         │              │  Cat Clip (video) │              │
         │              └───────────────────┘              │
         │                                                 │
         └────────── Auto-vectorize on import ─────────────┘
```

---

## Import Integrations (MCP + API)

### Podcast/Audio Sources

| Source | Integration | What It Provides |
|--------|-------------|------------------|
| Descript | MCP or API | Transcripts with speaker labels, clips |
| Riverside | API | Raw recordings, auto-transcripts |
| YouTube | Apify scraper | Video transcripts, metadata |
| Voice memos | Local folder watch | Quick capture → transcript |

### Social Streams

| Source | Integration | What It Provides |
|--------|-------------|------------------|
| X/Twitter | MCP (Rube) | Your tweets, bookmarks, lists |
| LinkedIn | API | Posts, engagement data |
| RSS feeds | Script | Competitor/inspiration content |

### Knowledge Sources

| Source | Integration | What It Provides |
|--------|-------------|------------------|
| Notion | MCP | Notes, databases, wikis |
| Obsidian | Local folder | Personal knowledge base |
| PDFs | Amanuensis skill | Extracted text, summaries |
| Readwise | API | Highlights, annotations |

---

## The Auto-Vectorization Pipeline

When content arrives in `content/raw/`, it automatically:

1. **Detects file type** (transcript, PDF, markdown, URL)
2. **Extracts text** (using appropriate parser)
3. **Chunks intelligently** (by paragraph, section, or semantic boundary)
4. **Generates embeddings** (stored in `corpus/embeddings/`)
5. **Updates index** (`corpus/index.json`)

```
content/raw/new-podcast-transcript.md
            │
            ▼
┌───────────────────────────────────────┐
│         AUTO-VECTORIZE PIPELINE        │
│                                        │
│  1. Parse markdown                     │
│  2. Chunk by section headers           │
│  3. Generate embeddings (local/API)    │
│  4. Store in corpus/embeddings/        │
│  5. Update corpus/index.json           │
│                                        │
│  Result: Queryable via corpus search   │
└───────────────────────────────────────┘
            │
            ▼
Agent can now: "Find my past content about X"
               "What have I said about Y before?"
               "Link this to related posts"
```

---

## Export Integrations

### Primary Publishing (Convex + Markdown)

The core publishing flow uses the markdown-sync pattern:

```bash
# Write in content/blog/
# Run sync command
npm run sync        # → Development database
npm run sync:prod   # → Production database

# Content appears on live site immediately
# No rebuild needed - Convex handles real-time sync
```

### Newsletter (AgentMail)

```
┌─────────────────────────────────────┐
│         NEWSLETTER FLOW              │
│                                      │
│  1. Draft in content/drafts/         │
│  2. Apply newsletter skill           │
│  3. Generate subject line variants   │
│  4. Preview in AgentMail             │
│  5. Schedule or send                 │
│                                      │
│  API: AgentMail MCP or direct API    │
└─────────────────────────────────────┘
```

### Social Distribution

```
┌─────────────────────────────────────┐
│         SOCIAL FLOW                  │
│                                      │
│  Blog post                           │
│       │                              │
│       ▼                              │
│  social-content-creation skill       │
│       │                              │
│       ├──► X thread                  │
│       ├──► LinkedIn post             │
│       ├──► Instagram caption         │
│       └──► Newsletter snippet        │
│                                      │
│  Export via:                         │
│  - Rube MCP (X, LinkedIn)            │
│  - Direct API                        │
│  - Clipboard (manual paste)          │
└─────────────────────────────────────┘
```

---

## Media Generation Integrations

### Image Generation (Gemini)

The `image-prompt-generator` skill connects to Gemini's image API:

```python
# Defined style in skill
STYLE = """
Editorial illustration, clean lines, 
warm cream background, terracotta accents,
minimal, sophisticated, NOT photorealistic
"""

# Generate thumbnail for blog post
prompt = f"{STYLE}\n\nConcept: {post_concept}\nFormat: 16:9"
→ Gemini generates image
→ Saves to public/images/thumbnails/
```

### Other Media Tools

| Tool | Purpose | Integration |
|------|---------|-------------|
| Nano Banana | Infographics | API |
| Canva | Templates | MCP or API |
| Cat Clip | Short-form video | API |
| BannerBear | Dynamic images | API |

---

## The Content Flow in Practice

A complete workflow from capture to publish:

```
1. CAPTURE
   ├── Record podcast in Riverside
   ├── Riverside exports transcript
   └── Transcript lands in content/raw/

2. AUTO-PROCESS
   ├── Vectorization pipeline runs
   ├── Content indexed in corpus
   └── Related past content identified

3. TRANSFORM (via skills)
   ├── transcript-polisher → clean transcript
   ├── podcast-blog-post → blog draft
   ├── Checkpoint: review outline
   ├── Continue to full draft
   └── image-prompt-generator → thumbnail

4. REVIEW
   ├── Human review of draft
   ├── Agent applies anti-AI skill
   └── Final polish

5. PUBLISH
   ├── npm run sync:prod → live on site
   ├── AgentMail → newsletter draft
   └── social-content-creation → social kit

6. DISTRIBUTE
   ├── Newsletter scheduled
   ├── X thread posted
   └── LinkedIn version shared
```

---

## Setting Up Integrations

### MCP Connections (claude_desktop_config.json)

```json
{
  "mcpServers": {
    "rube": {
      "command": "...",
      "env": { "API_KEY": "..." }
    },
    "notion": {
      "command": "...",
      "env": { "NOTION_TOKEN": "..." }
    },
    "apify": {
      "command": "...",
      "env": { "APIFY_TOKEN": "..." }
    }
  }
}
```

### API Keys (stored in .env or Convex env vars)

```
GEMINI_API_KEY=...
AGENTMAIL_API_KEY=...
DATAFORSEO_LOGIN=...
DATAFORSEO_PASSWORD=...
```

### Folder Watchers (for auto-import)

```bash
# Watch content/raw/ for new files
# Trigger vectorization on change
# Can use fswatch, chokidar, or cron
```

---

## The Goal: Zero Friction

The integration layer succeeds when:

1. **Capture is automatic** - Content flows in without manual export
2. **Indexing is invisible** - Vectorization happens in background
3. **Publishing is one command** - `npm run sync` and done
4. **Distribution is batched** - Social posts generated alongside blog post

The less time spent on logistics, the more time for actual creation.

---

*Integrations are the plumbing. Invisible when working, infuriating when broken. Get them right once, then forget they exist.*
