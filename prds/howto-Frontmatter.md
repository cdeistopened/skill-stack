# How to Add New Frontmatter Fields

This guide documents the process for adding new frontmatter fields to the markdown blog framework.

## Files Updated for authorName and authorImage (13 total)

When adding the `authorName` and `authorImage` frontmatter fields, these files were updated:

| File | What Was Updated |
|------|------------------|
| `convex/schema.ts` | Added fields to posts and pages table definitions |
| `scripts/sync-posts.ts` | Added to interfaces (PostFrontmatter, ParsedPost, PageFrontmatter, ParsedPage) and parsing logic |
| `convex/posts.ts` | Added to return validators and syncPosts/syncPostsPublic mutations |
| `convex/pages.ts` | Added to return validators and syncPagesPublic mutation |
| `src/pages/Post.tsx` | Added UI rendering for author display |
| `src/pages/Write.tsx` | Added to POST_FIELDS and PAGE_FIELDS arrays |
| `src/styles/global.css` | Added CSS styles for author display |
| `content/blog/setup-guide.md` | Updated frontmatter tables and examples |
| `content/pages/docs.md` | Updated frontmatter tables |
| `files.md` | Updated frontmatter field tables |
| `README.md` | Updated frontmatter field tables |
| `AGENTS.md` | Updated frontmatter field tables |
| `content/blog/about-this-blog.md` | Added example usage |

## Frontmatter Flow Summary

Frontmatter is the YAML metadata at the top of each markdown file. Here is how it flows through the system:

1. **Content directories** (`content/blog/*.md`, `content/pages/*.md`) contain markdown files with YAML frontmatter
2. **`scripts/sync-posts.ts`** uses `gray-matter` to parse frontmatter and validate required fields
3. **Convex mutations** (`api.posts.syncPostsPublic`, `api.pages.syncPagesPublic`) receive parsed data
4. **`convex/schema.ts`** defines the database structure for storing frontmatter fields

## Reusable Prompt for Future Frontmatter Updates

Copy and customize this prompt when adding new frontmatter fields:

```
Add a new optional frontmatter field called [FIELD_NAME] for [posts/pages/both].

Description: [What the field does]
Type: [string/boolean/number/array]
Display: [Where it should appear in the UI, if applicable]

Update these files:
1. convex/schema.ts - Add field to [posts/pages/both] table
2. scripts/sync-posts.ts - Add to [PostFrontmatter/PageFrontmatter] interface and parsing logic
3. convex/posts.ts - Add to return validators and sync mutations (if for posts)
4. convex/pages.ts - Add to return validators and sync mutations (if for pages)
5. src/pages/Post.tsx - Add UI rendering (if display needed)
6. src/pages/Write.tsx - Add to POST_FIELDS/PAGE_FIELDS array
7. src/styles/global.css - Add CSS styles (if display needed)
8. content/blog/setup-guide.md - Update frontmatter tables
9. content/pages/docs.md - Update frontmatter tables
10. files.md - Update frontmatter field tables
11. README.md - Update frontmatter field tables
12. AGENTS.md - Update frontmatter field tables
13. Add example usage to a content file

After implementation:
- Update changelog.md with the new feature
- Update content/pages/changelog-page.md
- Update TASK.md with completed task
- Create/update PRD in prds/ folder if needed
```

## Step-by-Step Implementation Guide

### Step 1: Update Schema

Add the field to `convex/schema.ts`:

```typescript
// For posts
posts: defineTable({
  // ... existing fields
  newField: v.optional(v.string()), // or v.number(), v.boolean(), etc.
  lastSyncedAt: v.number(),
})

// For pages
pages: defineTable({
  // ... existing fields
  newField: v.optional(v.string()),
  lastSyncedAt: v.number(),
})
```

### Step 2: Update Sync Script

Add to `scripts/sync-posts.ts`:

```typescript
// Add to interface
interface PostFrontmatter {
  // ... existing fields
  newField?: string;
}

interface ParsedPost {
  // ... existing fields
  newField?: string;
}

// Add to parsing logic in parseMarkdownFile()
return {
  // ... existing fields
  newField: frontmatter.newField,
};
```

### Step 3: Update Convex Mutations

Add to `convex/posts.ts` and/or `convex/pages.ts`:

```typescript
// Add to return validator
returns: v.array(v.object({
  // ... existing fields
  newField: v.optional(v.string()),
}))

// Add to args validator in sync mutation
posts: v.array(v.object({
  // ... existing fields
  newField: v.optional(v.string()),
}))

// Add to patch/insert calls
await ctx.db.patch(existingPost._id, {
  // ... existing fields
  newField: post.newField,
});
```

### Step 4: Update UI (if needed)

Add to `src/pages/Post.tsx`:

```tsx
{post.newField && (
  <div className="post-new-field">
    {post.newField}
  </div>
)}
```

### Step 5: Update Write Page

Add to `src/pages/Write.tsx`:

```typescript
const POST_FIELDS = [
  // ... existing fields
  { name: "newField", required: false, example: '"example value"' },
];
```

### Step 6: Add CSS (if needed)

Add to `src/styles/global.css`:

```css
.post-new-field {
  /* styles */
}
```

### Step 7: Update Documentation

Update frontmatter tables in:
- `content/blog/setup-guide.md`
- `content/pages/docs.md`
- `files.md`
- `README.md`
- `AGENTS.md`

### Step 8: Add Example

Add the new field to a content file as an example (e.g., `content/blog/about-this-blog.md`).

### Step 9: Update Changelog

Add entry to:
- `changelog.md` (root)
- `content/pages/changelog-page.md`

### Step 10: Run Sync

```bash
npm run sync      # Development
npm run sync:prod # Production
```

## Current Frontmatter Fields

### Blog Posts (`content/blog/*.md`)

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `description` | Yes | SEO description |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `slug` | Yes | URL path |
| `published` | Yes | Show publicly |
| `tags` | Yes | Array of tags |
| `readTime` | No | Reading time |
| `image` | No | Header/OG image URL |
| `excerpt` | No | Short excerpt for cards |
| `featured` | No | Show in featured section |
| `featuredOrder` | No | Order in featured (lower first) |
| `authorName` | No | Author display name |
| `authorImage` | No | Round author avatar URL |

### Static Pages (`content/pages/*.md`)

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Page title |
| `slug` | Yes | URL path |
| `published` | Yes | Show publicly |
| `order` | No | Nav order (lower first) |
| `excerpt` | No | Short excerpt for cards |
| `image` | No | Thumbnail/OG image URL |
| `featured` | No | Show in featured section |
| `featuredOrder` | No | Order in featured (lower first) |
| `authorName` | No | Author display name |
| `authorImage` | No | Round author avatar URL |

## Related Files

- PRD: `prds/howto-Frontmatter.md` (this file)
- Write conflicts guide: `prds/howtoavoidwriteconflicts.md`
- Stats implementation: `prds/howstatsworks.md`

