# markdown "sync" framework

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![Convex](https://img.shields.io/badge/Convex-enabled-ff6b6b.svg)
![Netlify](https://img.shields.io/badge/Netlify-hosted-00C7B7.svg)

An open-source publishing framework built for AI agents and developers to ship websites, docs, or blogs. Write markdown, sync from the terminal. Your content is instantly available to browsers, LLMs, and AI agents. Built on Convex and Netlify.

Write markdown locally, run `npm run sync` (dev) or `npm run sync:prod` (production), and content appears instantly across all connected browsers. Built with React, Convex, and Vite. Optimized for AEO, GEO, and LLM discovery.

**How publishing works:** Write posts in markdown, run `npm run sync` for development or `npm run sync:prod` for production, and they appear on your live site immediately. No rebuild or redeploy needed. Convex handles real-time data sync, so all connected browsers update automatically.

**Sync commands:**

**Development:**

- `npm run sync` - Sync markdown content
- `npm run sync:discovery` - Update discovery files (AGENTS.md, llms.txt)
- `npm run sync:all` - Sync content + discovery files together

**Production:**

- `npm run sync:prod` - Sync markdown content
- `npm run sync:discovery:prod` - Update discovery files
- `npm run sync:all:prod` - Sync content + discovery files together

**How versioning works:** Markdown files live in `content/blog/` and `content/pages/`. These are regular files in your git repo. Commit changes, review diffs, roll back like any codebase. The sync command pushes content to Convex.

```bash
# Edit, commit, sync
git add content/blog/my-post.md
git commit -m "Update post"
npm run sync        # dev
npm run sync:prod   # production
```

## Documentation

- **[Setup Guide](https://www.markdown.fast/setup-guide)** - Complete fork and deployment guide
- **[Configuration Guide](https://www.markdown.fast/fork-configuration-guide)** - Automated or manual fork setup
- **[Full Documentation](https://www.markdown.fast/docs)** - Docs for all features and configuration

## Fork Configuration

After forking this project, you have two options to configure your site:

### Option 1: Automated (Recommended)

Run a single command to configure all files automatically:

```bash
# Copy the example config
cp fork-config.json.example fork-config.json

# Edit with your site information
# Open fork-config.json and update the values

# Apply all changes
npm run configure
```

This updates all 11 configuration files in one step.

### Option 2: Manual

Follow the step-by-step guide in `FORK_CONFIG.md` to update each file manually. This guide includes code snippets and an AI agent prompt for assistance.

## Features

- Markdown-based blog posts with frontmatter
- Syntax highlighting for code blocks
- Four theme options: Dark, Light, Tan (default), Cloud
- Real-time data with Convex
- Fully responsive design
- Real-time analytics at `/stats`
- Full text search with Command+K shortcut
- Featured section with list/card view toggle
- Logo gallery with continuous marquee scroll
- GitHub contributions graph with year navigation
- Static raw markdown files at `/raw/{slug}.md`
- Dedicated blog page with configurable navigation order
- Markdown writing page at `/write` with frontmatter reference
- AI Agent chat (powered by Anthropic Claude) on Write page and optionally in right sidebar

### SEO and Discovery

- RSS feeds at `/rss.xml` and `/rss-full.xml` (with full content)
- Dynamic sitemap at `/sitemap.xml`
- JSON-LD structured data for Google rich results
- Open Graph and Twitter Card meta tags
- `robots.txt` with AI crawler rules
- `llms.txt` for AI agent discovery

### AI and LLM Access

- `/api/posts` - JSON list of all posts for agents
- `/api/post?slug=xxx` - Single post JSON or markdown
- `/api/export` - Batch export all posts with full content
- `/raw/{slug}.md` - Static raw markdown files for each post and page
- `/rss-full.xml` - Full content RSS for LLM ingestion
- `/.well-known/ai-plugin.json` - AI plugin manifest
- `/openapi.yaml` - OpenAPI 3.0 specification
- Copy Page dropdown for sharing to ChatGPT, Claude, Perplexity (uses raw markdown URLs for better AI parsing)

### Content Import

- Import external URLs as markdown posts using Firecrawl
- Run `npm run import <url>` to scrape and create draft posts locally
- Then sync to dev or prod with `npm run sync` or `npm run sync:prod`

### Newsletter and Email

The framework includes AgentMail integration for newsletter subscriptions and contact forms. Features include:

- Newsletter subscriptions and sending
- Contact forms on any post or page
- Automated weekly digests
- Developer notifications
- Admin UI for subscriber management
- CLI tools for sending newsletters and stats

See the [AgentMail setup guide](https://www.markdown.fast/blog/how-to-use-agentmail) for configuration instructions.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- A Convex account

### Setup

1. Install dependencies:

```bash
npm install
```

2. Initialize Convex:

```bash
npx convex dev
```

This will create your Convex project and generate the `.env.local` file.

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:5173

## Writing Blog Posts

Create markdown files in `content/blog/` with frontmatter:

## Static Pages (Optional)

Create optional pages like About, Projects, or Contact in `content/pages/`:

```markdown
---
title: "About"
slug: "about"
published: true
order: 1
---

Your page content here...
```

Pages appear as navigation links in the top right, next to the theme toggle. The `order` field controls display order (lower numbers first).

```markdown
---
title: "Your Post Title"
description: "A brief description"
date: "2025-01-15"
slug: "your-post-slug"
published: true
tags: ["tag1", "tag2"]
readTime: "5 min read"
image: "/images/my-header.png"
excerpt: "Short text for featured cards"
---

Your markdown content here...
```

## Logo Gallery

The homepage includes a scrolling logo gallery with sample logos. Configure in `siteConfig`:

### Disable the gallery

```typescript
logoGallery: {
  enabled: false,
  // ...
},
```

## GitHub Contributions Graph

Display your GitHub contribution activity on the homepage. Configure in `src/config/siteConfig.ts`:

```typescript
gitHubContributions: {
  enabled: true,           // Set to false to hide
  username: "yourusername", // Your GitHub username
  showYearNavigation: true, // Show arrows to navigate between years
  linkToProfile: true,      // Click graph to open GitHub profile
  title: "GitHub Activity", // Optional title above the graph
},
```

## Visitor Map

Display real-time visitor locations on a world map on the stats page. Uses Netlify's built-in geo detection (no third-party API needed). Privacy friendly: only stores city, country, and coordinates. No IP addresses stored.

Configure in `src/config/siteConfig.ts`:

```typescript
visitorMap: {
  enabled: true,        // Set to false to hide the visitor map
  title: "Live Visitors", // Optional title above the map
},
```

## Syncing Posts

Posts are synced to Convex. The sync script reads markdown files from `content/blog/` and `content/pages/`, then uploads them to your Convex database.

### Environment Files

| File                    | Purpose                                                  |
| ----------------------- | -------------------------------------------------------- |
| `.env.local`            | Development deployment URL (created by `npx convex dev`) |
| `.env.production.local` | Production deployment URL (create manually)              |

Both files are gitignored. Each developer creates their own.

### Sync Commands

**Development:**

- `npm run sync` - Sync markdown content to development Convex
- `npm run sync:discovery` - Update discovery files (AGENTS.md, llms.txt) with development data
- `npm run sync:all` - Sync content + discovery files together

**Production:**

- `npm run sync:prod` - Sync markdown content to production Convex
- `npm run sync:discovery:prod` - Update discovery files with production data
- `npm run sync:all:prod` - Sync content + discovery files together

**Development sync:**

```bash
npm run sync
```

**Production sync:**

First, create `.env.production.local` with your production Convex URL:

```
VITE_CONVEX_URL=https://your-prod-deployment.convex.cloud
```

Then sync:

```bash
npm run sync:prod
```

## Deployment

### Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/d8c4d83d-7486-42de-844b-6f09986dc9aa/deploy-status)](https://app.netlify.com/projects/markdowncms/deploys)

For detailed setup, see the [Convex Netlify Deployment Guide](https://docs.convex.dev/production/hosting/netlify).

1. Deploy Convex functions to production:

```bash
npx convex deploy
```

Note the production URL (e.g., `https://your-deployment.convex.cloud`).

2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: `npm ci --include=dev && npx convex deploy --cmd 'npm run build'`
   - Publish directory: `dist`
4. Add environment variables in Netlify dashboard:
   - `CONVEX_DEPLOY_KEY` - Generate from [Convex Dashboard](https://dashboard.convex.dev) > Project Settings > Deploy Key
   - `VITE_CONVEX_URL` - Your production Convex URL (e.g., `https://your-deployment.convex.cloud`)

The `CONVEX_DEPLOY_KEY` deploys functions at build time. The `VITE_CONVEX_URL` is required for edge functions (RSS, sitemap, API) to proxy requests at runtime.

**Build issues?** Netlify sets `NODE_ENV=production` which skips devDependencies. The `--include=dev` flag fixes this. See [netlify-deploy-fix.md](./netlify-deploy-fix.md) for detailed troubleshooting.

## Project Structure

```
markdown-site/
├── content/blog/      # Markdown blog posts
├── convex/            # Convex backend
│   ├── http.ts        # HTTP endpoints (sitemap, API, RSS)
│   ├── posts.ts       # Post queries and mutations
│   ├── rss.ts         # RSS feed generation
│   └── schema.ts      # Database schema
├── netlify/           # Netlify edge functions
│   └── edge-functions/
│       ├── rss.ts     # RSS feed proxy
│       ├── sitemap.ts # Sitemap proxy
│       ├── api.ts     # API endpoint proxy
│       └── botMeta.ts # OG crawler detection
├── public/            # Static assets
│   ├── images/        # Blog images and OG images
│   ├── robots.txt     # Crawler rules
│   └── llms.txt       # AI agent discovery
├── scripts/           # Build scripts
└── src/
    ├── components/    # React components
    ├── context/       # Theme context
    ├── pages/         # Page components
    └── styles/        # Global CSS
```

## Scripts Reference

| Script                        | Description                                    |
| ----------------------------- | ---------------------------------------------- |
| `npm run dev`                 | Start Vite dev server                          |
| `npm run dev:convex`          | Start Convex dev backend                       |
| `npm run sync`                | Sync posts to dev deployment                   |
| `npm run sync:prod`           | Sync posts to production deployment            |
| `npm run sync:discovery`      | Update discovery files (development)           |
| `npm run sync:discovery:prod` | Update discovery files (production)            |
| `npm run sync:all`            | Sync content + discovery (development)         |
| `npm run sync:all:prod`       | Sync content + discovery (production)          |
| `npm run import`              | Import URL as local markdown draft (then sync) |
| `npm run build`               | Build for production                           |
| `npm run deploy`              | Sync + build (for manual deploys)              |
| `npm run deploy:prod`         | Deploy Convex functions + sync to production   |

## Tech Stack

- React 18
- TypeScript
- Vite
- Convex
- react-markdown
- react-syntax-highlighter
- date-fns
- lucide-react
- @phosphor-icons/react
- Netlify

## Search

Press `Command+K` (Mac) or `Ctrl+K` (Windows/Linux) to open the search modal. The search uses Convex full text search to find posts and pages by title and content.

Features:

- Real-time results as you type
- Keyboard navigation (arrow keys, Enter, Escape)
- Result snippets with context around matches
- Distinguishes between posts and pages
- Works with all four themes

The search icon appears in the top navigation bar next to the theme toggle.

## Real-time Stats

The `/stats` page shows real-time analytics powered by Convex:

- **Active visitors**: Current visitors on the site with per-page breakdown
- **Total page views**: All-time view count
- **Unique visitors**: Based on anonymous session IDs
- **Views by page**: List of all pages sorted by view count

Stats update automatically via Convex subscriptions. No page refresh needed.

How it works:

- Page views are recorded as event records (not counters) to avoid write conflicts
- Active sessions use heartbeat presence (30s interval, 2min timeout)
- A cron job cleans up stale sessions every 5 minutes
- No PII stored (only anonymous session UUIDs)

## API Endpoints

| Endpoint                       | Description                         |
| ------------------------------ | ----------------------------------- |
| `/stats`                       | Real-time site analytics            |
| `/rss.xml`                     | RSS feed with post descriptions     |
| `/rss-full.xml`                | RSS feed with full post content     |
| `/sitemap.xml`                 | Dynamic XML sitemap                 |
| `/api/posts`                   | JSON list of all posts              |
| `/api/post?slug=xxx`           | Single post as JSON                 |
| `/api/post?slug=xxx&format=md` | Single post as markdown             |
| `/api/export`                  | Batch export all posts with content |
| `/meta/post?slug=xxx`          | Open Graph HTML for crawlers        |
| `/.well-known/ai-plugin.json`  | AI plugin manifest                  |
| `/openapi.yaml`                | OpenAPI 3.0 specification           |
| `/llms.txt`                    | AI agent discovery                  |

## Import External Content

Use Firecrawl to import articles from external URLs as markdown posts:

```bash
npm run import https://example.com/article
```

This will:

1. Scrape the URL using Firecrawl API
2. Convert to clean markdown
3. Create a draft post in `content/blog/` locally
4. Add frontmatter with title, description, and today's date

**Setup:**

1. Get an API key from [firecrawl.dev](https://firecrawl.dev)
2. Add to `.env.local`:

```
FIRECRAWL_API_KEY=fc-your-api-key
```

**Why no `npm run import:prod`?** The import command only creates local markdown files. It does not interact with Convex. After importing, sync to your target environment:

- `npm run sync` for development
- `npm run sync:prod` for production
- Use `npm run sync:all` or `npm run sync:all:prod` to sync content and update discovery files together

Imported posts are created as drafts (`published: false`). Review, edit, set `published: true`, then sync.

## Theme Configuration

The default theme is Tan. Users can cycle through themes using the toggle:

- Dark (Moon icon)
- Light (Sun icon)
- Tan (Half icon) - default
- Cloud (Cloud icon)

To change the default theme, edit `src/context/ThemeContext.tsx`:

```typescript
const DEFAULT_THEME: Theme = "tan"; // Change to "dark", "light", or "cloud"
```

## Font Configuration

The blog uses a serif font (New York) by default. To switch fonts, edit `src/styles/global.css`:

### Font Sizes

All font sizes use CSS variables defined in `:root`. Customize sizes by editing the variables:

## Write Page

A public markdown writing page at `/write` (not linked in navigation).

Access directly at `yourdomain.com/write`. Content is stored in localStorage only (not synced to database). Use it to draft posts, then copy the content to a markdown file in `content/blog/` or `content/pages/` and run `npm run sync`.

**AI Agent mode:** When `siteConfig.aiChat.enabledOnWritePage` is enabled, a toggle button appears in the Actions section. Clicking it replaces the textarea with the AI Agent chat interface. The page title changes to "Agent" when in chat mode. Requires `ANTHROPIC_API_KEY` environment variable in Convex.

## AI Agent Chat

The site includes an AI writing assistant (Agent) powered by Anthropic Claude API. Agent can be enabled in two places:

**1. Write page (`/write`):** Enable via `siteConfig.aiChat.enabledOnWritePage`. Toggle replaces textarea with Agent chat interface.

**2. Right sidebar on posts/pages:** Enable via `aiChat: true` frontmatter field (requires `rightSidebar: true` and `siteConfig.aiChat.enabledOnContent: true`).

**Environment variables required:**

- `ANTHROPIC_API_KEY` (required): Your Anthropic API key
- `CLAUDE_PROMPT_STYLE`, `CLAUDE_PROMPT_COMMUNITY`, `CLAUDE_PROMPT_RULES` (optional): Split system prompts
- `CLAUDE_SYSTEM_PROMPT` (optional): Single system prompt fallback

Set these in [Convex Dashboard](https://dashboard.convex.dev) > Settings > Environment Variables.

**Features:**

- Per-page chat history stored in Convex
- Page content can be provided as context for AI responses
- Markdown rendering for AI responses
- User-friendly error messages when API key is not configured
- Anonymous session authentication using localStorage

## Source

Fork this project: [github.com/waynesutton/markdown-site](https://github.com/waynesutton/markdown-site)

## License

This project is licensed under the [MIT License](https://github.com/waynesutton/markdown-site/blob/main/LICENSE).
