# Security Fixes Implementation Plan

Based on the security audit comparing this codebase against Mintlify vulnerabilities (CVE-2025-67842/43/44/45/46), this plan addresses the identified security concerns.

## Summary of findings

| Priority | Issue | Risk | Files Affected |
|----------|-------|------|----------------|
| Critical | Unauthenticated `syncPostsPublic` mutation | Anyone can modify/delete posts | `convex/posts.ts` |
| Medium | Weak session ID generation | Predictable session IDs | `src/hooks/usePageTracking.ts` |
| Medium | No Content Security Policy | XSS/injection vectors | `netlify.toml` |
| Low | No application rate limiting | Abuse potential | N/A (Convex handles) |

## Implementation

### 1. Add secret key authentication to sync mutation

Protect `syncPostsPublic` in `convex/posts.ts` with an environment variable check:

```typescript
export const syncPostsPublic = mutation({
  args: {
    posts: v.array(...),
    secretKey: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Verify secret key matches environment variable
    const expectedKey = process.env.SYNC_SECRET_KEY;
    if (expectedKey && args.secretKey !== expectedKey) {
      throw new Error("Unauthorized: Invalid sync key");
    }
    // ... existing sync logic
  },
});
```

Update `scripts/sync-posts.ts` to pass the secret key:

```typescript
const secretKey = process.env.SYNC_SECRET_KEY;
await client.mutation(api.posts.syncPostsPublic, { posts, secretKey });
```

**Convex Dashboard action required:** Add `SYNC_SECRET_KEY` environment variable.

### 2. Fix weak session ID generation

Replace `Math.random()` with `crypto.randomUUID()` in `src/hooks/usePageTracking.ts`:

```typescript
function generateSessionId(): string {
  // Use cryptographically secure random UUID
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers (still better than Math.random)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] % 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
```

### 3. Add Content Security Policy headers

Add CSP headers to `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self'; connect-src 'self' https://*.convex.cloud https://*.convex.site; frame-ancestors 'none'"
```

## Convex Dashboard setup

1. Navigate to [Convex Dashboard](https://dashboard.convex.dev)
2. Select your project
3. Go to Settings > Environment Variables
4. Add new variable:
   - Name: `SYNC_SECRET_KEY`
   - Value: Generate a secure random string (32+ characters)
5. Add the same variable for both development and production deployments
6. Update `.env.local` and `.env.production.local` with the same key

## Testing checklist

- [ ] Sync fails without secret key when `SYNC_SECRET_KEY` is set
- [ ] Sync succeeds with correct secret key
- [ ] Session IDs are properly generated using crypto API
- [ ] CSP headers appear in network responses
- [ ] Site functionality unchanged after security updates

## Tasks

- [ ] Add secret key authentication to syncPostsPublic mutation
- [ ] Update sync-posts.ts to pass secret key
- [ ] Replace Math.random with crypto.randomUUID for session IDs
- [ ] Add Content Security Policy headers to netlify.toml
- [ ] Add SYNC_SECRET_KEY to Convex dashboard and local env files
- [ ] Update sec-check.mdc with implementation status

