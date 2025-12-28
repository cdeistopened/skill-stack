# Visitor tracking and stats improvements

> Real-time visitor map, write conflict prevention, GitHub Stars integration, and better AI prompts. Updates from v1.18.1 to v1.20.2.

---
Type: post
Date: 2025-12-21
Reading time: 5 min read
Tags: features, stats, convex, updates, analytics
---

## Real-time visitor map

The stats page now shows a live world map with visitor locations. Each active visitor appears as a pulsing dot on the map.

The map uses Netlify's built-in geo detection. No third-party API needed. No IP addresses stored. Just city, country, and coordinates.

![visitors map](/images/map.gif)
Configure it in siteConfig:

```typescript
visitorMap: {
  enabled: true,
  title: "Live Visitors",
},
```

The map works with all four themes. Dark, light, tan, cloud. Land dots use theme-aware colors. Visitor dots pulse to show activity.

Implementation details:

- New edge function at `netlify/edge-functions/geo.ts` reads Netlify geo headers
- React component `VisitorMap.tsx` renders an SVG world map
- No external map library required
- Responsive design scales on mobile

The map updates in real time as visitors navigate your site. Each heartbeat includes location data. The map aggregates active sessions and displays them on the globe.

## Write conflict prevention

Convex write conflicts happen when multiple mutations update the same document concurrently. The heartbeat mutation was hitting this with rapid page navigation.

Version 1.20.2 fixes this with three changes:

1. Increased dedup window from 10 seconds to 20 seconds
2. Added random jitter (±5 seconds) to heartbeat intervals
3. Simplified early return to skip any update within the dedup window

The jitter prevents synchronized calls across browser tabs. If you have multiple tabs open, they no longer fire heartbeats at the same time.

Backend and frontend now use matching 20-second windows. The backend checks if a session was updated recently. If yes, it returns early without patching. This makes the mutation idempotent and prevents conflicts.

## GitHub Stars integration

The stats page now displays your repository's star count. Fetches from GitHub's public API. No token required.

The card shows the live count and updates on page load. Uses the Phosphor GithubLogo icon for consistency.

Stats page layout changed to accommodate six cards:

- Desktop: single row of six cards
- Tablet: 3x2 grid
- Mobile: 2x3 grid
- Small mobile: stacked

The GitHub Stars card sits alongside total page views, unique visitors, active visitors, and views by page.

## Author display

Posts and pages now support author attribution. Add these fields to frontmatter:

```yaml
authorName: "Your Name"
authorImage: "/images/authors/photo.png"
```

The author info appears on individual post and page views. Round avatar image next to the date and read time. Not shown on blog list views.

Place author images in `public/images/authors/`. Square images work best since they display as circles.

## Improved AI prompts

The CopyPageDropdown now sends better instructions to ChatGPT, Claude, and Perplexity.

Previous prompts asked AI to summarize without verifying the content loaded. New prompts instruct AI to:

1. Attempt to load the raw markdown URL
2. If successful, provide a concise summary and ask how to help
3. If not accessible, state the page could not be loaded without guessing

This prevents AI from hallucinating content when URLs fail to load. More reliable results for users sharing pages.

## Raw markdown URLs

Version 1.18.1 changed AI services to use raw markdown file URLs instead of page URLs. Format: `/raw/{slug}.md`.

AI services can fetch and parse clean markdown directly. No HTML parsing required. Includes metadata headers for structured parsing.

The raw markdown files are generated during `npm run sync`. Each published post and page gets a corresponding static `.md` file in `public/raw/`.

## Technical notes

All updates maintain backward compatibility. Existing sites continue working without changes.

The visitor map requires Netlify edge functions. The geo endpoint reads automatic headers from Netlify's CDN. No configuration needed beyond enabling the feature.

Write conflict prevention uses Convex best practices:

- Idempotent mutations with early returns
- Indexed queries for efficient lookups
- Event records pattern for high-frequency updates
- Debouncing on the frontend

The stats page aggregates data from multiple sources:

- Active sessions from heartbeat mutations
- Page views from event records
- GitHub Stars from public API
- Visitor locations from geo edge function

All data updates in real time via Convex subscriptions.

## What's next

These updates focus on making stats more useful and reliable. The visitor map provides visual feedback. Write conflict prevention ensures accuracy. GitHub Stars adds social proof.

Future updates will continue improving the analytics experience. More granular stats. Better visualization. More configuration options.

Check the changelog for the full list of changes from v1.18.1 to v1.20.2.