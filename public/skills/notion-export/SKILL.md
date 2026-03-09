---
name: notion-export
description: Export markdown files to Notion with proper rich text formatting. Use when staging articles, drafts, or documentation in Notion. Handles bold, italic, links, headers, bullets, numbered lists, and code blocks.
---

# Notion Export

Converts local markdown files to Notion pages with full rich text formatting preserved.

## Quick Start

```bash
# Create new page under a parent
python3 ~/.claude/scripts/notion_markdown.py draft.md --parent-id <page_id> --title "My Article"

# Update existing page (replaces content)
python3 ~/.claude/scripts/notion_markdown.py draft.md --update <page_id>

# Search for a parent page
python3 ~/.claude/scripts/notion_markdown.py draft.md --search "Guest Contributors"
```

## When to Use

- Staging article drafts for team review
- Exporting documentation to Notion workspace
- Syncing local markdown files to Notion
- When Notion MCP server is disconnected

## Supported Formatting

| Markdown | Notion |
|----------|--------|
| `**bold**` | Bold text |
| `*italic*` | Italic text |
| `[text](url)` | Link |
| `` `code` `` | Inline code |
| `# H1` | Heading 1 |
| `## H2` | Heading 2 |
| `### H3` | Heading 3 |
| `- bullet` | Bulleted list |
| `1. numbered` | Numbered list |
| `> quote` | Quote block |
| ``` code block ``` | Code block |
| `---` | Divider |

## Requirements

- Python 3 with `requests` library
- Notion API key in `.mcp.json` or `NOTION_API_KEY` environment variable

## Finding Page IDs

Page IDs can be found:
1. In the Notion URL: `notion.so/Page-Name-abc123def456` → `abc123def456`
2. Using `--search "query"` to find pages by name
3. From previous exports/creates

## Examples

### Stage an article draft

```bash
python3 ~/.claude/scripts/notion_markdown.py \
  "Studio/SEO Content/drafts/my-article.md" \
  --parent-id "3d9f18f9-03a9-4374-ae5c-a57e85427060" \
  --title "[DRAFT] My Article Title"
```

### Update after edits

```bash
python3 ~/.claude/scripts/notion_markdown.py \
  "Studio/SEO Content/drafts/my-article.md" \
  --update "2fdafe52-ef59-81dc-b1ac-e79b40c2d40d"
```

## Common Parent Pages

| Purpose | Page ID |
|---------|---------|
| OpenEd Content Engine | `3d9f18f9-03a9-4374-ae5c-a57e85427060` |

## Troubleshooting

**"No Notion API key found"**
- Check `.mcp.json` has `notion.env.NOTION_API_KEY` configured
- Or set `NOTION_API_KEY` environment variable

**Formatting not appearing**
- Check markdown syntax is correct (no spaces in `** bold **`)
- Links must be `[text](url)` format, not bare URLs

**Page not updating**
- Verify page ID is correct (use --search to find)
- Check API key has edit permissions for the page
