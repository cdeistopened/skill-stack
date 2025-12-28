---
title: "Netlify edge functions blocking AI crawlers from static files"
description: "Why excludedPath in netlify.toml isn't preventing edge functions from intercepting /raw/* requests, and how ChatGPT and Perplexity get blocked while Claude works."
date: "2025-12-21"
slug: "netlify-edge-excludedpath-ai-crawlers"
published: true
tags: ["netlify", "edge-functions", "ai", "troubleshooting", "help"]
readTime: "5 min read"
featured: false
---

## The problem

AI crawlers cannot access static markdown files at `/raw/*.md` on Netlify, even with `excludedPath` configured. ChatGPT and Perplexity return errors. Claude works.

## What we're building

A markdown blog framework that generates static `.md` files in `public/raw/` during build. Users can share posts with AI tools via a Copy Page dropdown that sends raw markdown URLs.

The goal: AI services fetch `/raw/{slug}.md` and parse clean markdown without HTML.

## The errors

**ChatGPT:**

```
I attempted to load and read the raw markdown at the URL you provided but was unable to fetch the content from that link. The page could not be loaded directly and I cannot access its raw markdown.
```

**Perplexity:**

```
The page could not be loaded with the tools currently available, so its raw markdown content is not accessible.
```

**Claude:**
Works. Loads and reads the markdown successfully.

## Attempted solutions log

### December 24, 2025

**Attempt 1: excludedPath in netlify.toml**

Added array of excluded paths to the edge function declaration:

```toml
[[edge_functions]]
  path = "/*"
  function = "botMeta"
  excludedPath = [
    "/raw/*",
    "/assets/*",
    "/api/*",
    "/.netlify/*",
    "/favicon.ico",
    "/favicon.svg",
    "/robots.txt",
    "/sitemap.xml",
    "/llms.txt",
    "/openapi.yaml"
  ]
```

Result: ChatGPT and Perplexity still blocked.

**Attempt 2: Hard bypass in botMeta.ts**

Added early return at top of handler to guarantee static markdown is never intercepted:

```typescript
const url = new URL(request.url);
if (
  url.pathname.startsWith("/raw/") ||
  url.pathname.startsWith("/assets/") ||
  url.pathname.startsWith("/api/") ||
  url.pathname.startsWith("/.netlify/") ||
  url.pathname.endsWith(".md")
) {
  return context.next();
}
```

Result: ChatGPT and Perplexity still blocked.

**Attempt 3: AI crawler whitelist**

Added explicit bypass for known AI user agents:

```typescript
const AI_CRAWLERS = [
  "gptbot",
  "chatgpt",
  "chatgpt-user",
  "oai-searchbot",
  "claude-web",
  "claudebot",
  "anthropic",
  "perplexitybot",
];

if (isAICrawler(userAgent)) {
  return context.next();
}
```

Result: ChatGPT and Perplexity still blocked.

**Attempt 4: Netlify Function at /api/raw/:slug**

Created a serverless function to serve markdown files directly:

```javascript
// netlify/functions/raw.js
exports.handler = async (event) => {
  const slug = event.queryStringParameters?.slug;
  // Read from dist/raw/${slug}.md or public/raw/${slug}.md
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
    body: markdownContent,
  };
};
```

With redirect rule:

```toml
[[redirects]]
  from = "/api/raw/*"
  to = "/.netlify/functions/raw?slug=:splat"
  status = 200
  force = true
```

Result: Netlify build failures due to function bundling issues and `package-lock.json` dependency conflicts.

**Attempt 5: Header adjustments**

Removed `Link` header from global scope to prevent header merging on `/raw/*`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    # Link header removed from global scope

[[headers]]
  for = "/index.html"
  [headers.values]
    Link = "</llms.txt>; rel=\"author\""
```

Removed `X-Robots-Tag = "noindex"` from `/raw/*` headers.

Result: ChatGPT and Perplexity still blocked.

### Why these attempts failed

The core issue appears to be how ChatGPT and Perplexity fetch URLs. Their tools receive 400 or 403 responses even when `curl` from the command line works. This suggests:

1. Netlify may handle AI crawler user agents differently at the CDN level
2. The edge function exclusions work for browsers but not for AI fetch tools
3. There may be rate limiting or bot protection enabled by default

## Current workaround

Users can still share content with AI tools by:

1. **Copy page** copies markdown to clipboard, then paste into any AI
2. **View as Markdown** opens the raw `.md` file in a browser tab for manual copying
3. **Download as SKILL.md** downloads in Anthropic Agent Skills format

The direct "Open in ChatGPT/Claude/Perplexity" buttons have been disabled since the URLs don't work reliably.

## Working features

Despite AI crawler issues, these features work correctly:

- `/raw/*.md` files load in browsers
- `llms.txt` discovery file is accessible
- `openapi.yaml` API spec loads properly
- Sitemap and RSS feeds generate correctly
- Social preview bots (Twitter, Facebook, LinkedIn) receive OG metadata
- Claude's web fetcher can access raw markdown

## Help needed

If you've solved this or have suggestions, open an issue. We've tried:

- netlify.toml excludedPath arrays
- Code-level path checks in edge functions
- AI crawler user agent whitelisting
- Netlify Functions as an alternative endpoint
- Header configuration adjustments

None have worked for ChatGPT or Perplexity. GitHub raw URLs remain the most reliable option for AI consumption, but require additional repository configuration when forking.
