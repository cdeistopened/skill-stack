# AgentMail Newsletter Integration v1

## Overview

Email-only newsletter system integrated with AgentMail. All features are optional and controlled via `siteConfig.ts` and frontmatter.

## Implemented Features

### Phase 1: Newsletter Signup

| Feature | Status | Description |
|---------|--------|-------------|
| Site Config | Done | `NewsletterConfig` interface in `siteConfig.ts` |
| Schema | Done | `newsletterSubscribers` table with indexes |
| Subscribe Mutation | Done | Email validation, duplicate detection, re-subscribe support |
| Unsubscribe Mutation | Done | Token verification for security |
| Subscriber Queries | Done | `getSubscriberCount`, `getActiveSubscribers` |
| NewsletterSignup Component | Done | Email input form with status feedback |
| CSS Styling | Done | Responsive styles for all themes |
| Home Integration | Done | Configurable position (above-footer, below-intro) |
| Blog Page Integration | Done | Configurable position (above-footer, below-posts) |
| Post Integration | Done | Frontmatter override support |
| Unsubscribe Page | Done | `/unsubscribe` route with auto-processing |

### Phase 2: Newsletter Sending

| Feature | Status | Description |
|---------|--------|-------------|
| Sent Posts Schema | Done | `newsletterSentPosts` table to track sent newsletters |
| Send Action | Done | `sendPostNewsletter` internalAction using AgentMail API |
| CLI Script | Done | `npm run newsletter:send <slug>` |

## Files Created/Modified

### New Files

- `convex/newsletter.ts` - Subscribe, unsubscribe, and sending functions
- `src/components/NewsletterSignup.tsx` - React component
- `src/pages/Unsubscribe.tsx` - Unsubscribe page
- `scripts/send-newsletter.ts` - CLI tool for sending newsletters
- `prds/agentmail-newsletter-v1.md` - This file

### Modified Files

- `src/config/siteConfig.ts` - Added `NewsletterConfig` interface
- `convex/schema.ts` - Added `newsletterSubscribers` and `newsletterSentPosts` tables
- `convex/posts.ts` - Added `getPostBySlugInternal` query
- `src/styles/global.css` - Added newsletter component styles
- `src/pages/Home.tsx` - Integrated `NewsletterSignup`
- `src/pages/Blog.tsx` - Integrated `NewsletterSignup`
- `src/pages/Post.tsx` - Integrated `NewsletterSignup` with frontmatter support
- `src/App.tsx` - Added `/unsubscribe` route
- `package.json` - Added `newsletter:send` script
- `fork-config.json.example` - Added newsletter configuration
- `FORK_CONFIG.md` - Added newsletter documentation

## Configuration

### Environment Variables (Convex Dashboard)

| Variable | Description |
|----------|-------------|
| `AGENTMAIL_API_KEY` | Your AgentMail API key |
| `AGENTMAIL_INBOX` | Your inbox address (e.g., `newsletter@mail.agentmail.to`) |

### Site Config Example

```typescript
newsletter: {
  enabled: true,
  agentmail: {
    inbox: "newsletter@mail.agentmail.to",
  },
  signup: {
    home: {
      enabled: true,
      position: "above-footer",
      title: "Stay Updated",
      description: "Get new posts delivered to your inbox.",
    },
    blogPage: {
      enabled: true,
      position: "above-footer",
      title: "Subscribe",
      description: "Get notified when new posts are published.",
    },
    posts: {
      enabled: true,
      position: "below-content",
      title: "Enjoyed this post?",
      description: "Subscribe for more updates.",
    },
  },
},
```

### Frontmatter Override

```yaml
---
title: My Post
newsletter: false  # Hide newsletter on this post
---
```

## Usage

### Collect Subscribers

1. Enable newsletter in `siteConfig.ts`
2. Set environment variables in Convex dashboard
3. Subscribers can sign up from homepage, blog page, or individual posts

### Send Newsletter

```bash
# Check post exists and show send command
npm run newsletter:send <post-slug>

# Or use Convex CLI directly
npx convex run newsletter:sendPostNewsletter '{"postSlug":"slug","siteUrl":"https://site.com","siteName":"Name"}'
```

### View Subscriber Count

Subscriber count is available via the `newsletter.getSubscriberCount` query.

## Database Schema

### newsletterSubscribers

| Field | Type | Description |
|-------|------|-------------|
| email | string | Subscriber email (lowercase, trimmed) |
| subscribed | boolean | Current subscription status |
| subscribedAt | number | Timestamp when subscribed |
| unsubscribedAt | number? | Timestamp when unsubscribed |
| source | string | Signup location ("home", "blog-page", "post:slug") |
| unsubscribeToken | string | Secure token for unsubscribe links |

Indexes: `by_email`, `by_subscribed`

### newsletterSentPosts

| Field | Type | Description |
|-------|------|-------------|
| postSlug | string | Slug of the sent post |
| sentAt | number | Timestamp when sent |
| sentCount | number | Number of subscribers sent to |

Index: `by_postSlug`

## Future Enhancements (Not Implemented)

- Double opt-in confirmation emails
- Contact form integration
- Weekly digest automation
- Subscriber admin UI in dashboard
- Email templates customization
