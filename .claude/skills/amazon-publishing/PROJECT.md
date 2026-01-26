# Amazon Publishing Optimization

Strategy and tools for optimizing book publishing on Amazon KDP.

**Quick Start:** See `NOW.md` for current state and commands.

---

## Skills Built

| Skill | Status | Description |
|-------|--------|-------------|
| **amazon-category-research** | ✅ Complete | 4-step workflow for selecting 3 categories, BSR analysis, ghost category avoidance |
| **kdp-keyword-optimizer** | ✅ Complete | Optimize 7 backend keyword slots for A10 algorithm + Rufus AI |
| **kdp-launch-checklist** | 🔲 Planned | Pre-publish validation checklist |
| **book-description-writer** | 🔲 Planned | HTML-formatted, keyword-optimized descriptions |
| **book-metadata-audit** | 🔲 Planned | Quarterly refresh workflow |

---

## Folder Structure

```
amazon-publishing-optimization/
├── PROJECT.md                  # Full documentation
├── NOW.md                      # Current state & quick reference
│
├── data-layer/                 # ✅ Real Amazon data
│   ├── config.py              # Credentials loader (uses OpenEd DataForSEO)
│   ├── amazon_dataforseo.py   # Amazon keyword volume API
│   ├── keyword_volume.py      # CLI for checking search volumes
│   └── category_analyzer.py   # Full topic analysis (WIP)
│
├── amazon-category-research/   # ✅ COMPLETE
│   ├── SKILL.md               # 4-step method, portfolio strategy
│   ├── references/
│   │   ├── bsr-thresholds.md  # BSR → sales conversion
│   │   ├── ghost-categories.md # 27% ghost category problem
│   │   └── category-examples.md # 8+ real case studies
│   ├── scripts/
│   │   └── bsr_to_sales.py    # CLI BSR calculator
│   └── assets/
│       └── research-spreadsheet.csv
│
├── kdp-keyword-optimizer/      # ✅ COMPLETE + DATA LAYER
│   ├── SKILL.md               # 5-step semantic keyword method
│   ├── references/
│   │   ├── amazon-keyword-rules.md # Official rules + restrictions
│   │   ├── keyword-examples.md     # Before/after by genre
│   │   └── semantic-keywords.md    # A10 algorithm deep dive
│   └── assets/
│       └── keyword-worksheet.csv
│
└── research/                   # Source material
    ├── kdp-category-selection-transcripts.md # Paul Marles videos
    └── youtube-sources.md      # Channel/video index
```

---

## Top 10 Amazon Book Categories (Revenue Estimates)

| Category | Revenue | Source |
|----------|---------|--------|
| Adult general fiction | $6.01B | PublishersWeekly |
| Adult general nonfiction | $4.51B | PublishersWeekly |
| Romance | $3.61B | Toner Buzz |
| Children's & Young Adult | $2.70B | PublishersWeekly |
| Mystery / Thriller / Crime | $2.40B | Toner Buzz |
| Science Fiction & Fantasy | $1.80B | The Guardian |
| Self-help / Personal development | $1.20B | livingwriter.com |
| Religion & Spirituality | $0.90B | PublishersWeekly |
| Business & Money | $0.90B | livingwriter.com |
| Health / Fitness / Dieting | $0.60B | Toner Buzz |

---

## Key Insights (2024+)

### Algorithm Changes
1. **A10 prioritizes semantic relevance** - Not just keywords, but meaning
2. **Rufus AI scans everything** - Reviews, description, metadata for context
3. **27% of KDP categories are ghosts** - They look selectable but don't work
4. **54% are duplicates** - Same category appears twice

### Category Rules
1. **You only get 3 categories** - Can't add more after publishing
2. **Go deep into subcategories** - Less competition than broad categories
3. **Portfolio strategy** - 1 niche + 1 mid-range + 1 growth
4. **Verify before selecting** - Check for ghost categories manually

### Keyword Rules
1. **7 backend slots, 50 chars each** - Use all 350 characters
2. **Don't repeat title words** - Already indexed, wastes slots
3. **Long-tail phrases win** - "catholic lent fasting guide" > "fasting"
4. **Semantic > exact match** - Describe the experience, not just topics

---

## Tools

### Paid
| Tool | Cost | Features |
|------|------|----------|
| [Publisher Rocket](http://www.publisherrocket.com) | $199-299 (one-time) | Category analysis, ghost detection, keyword research |
| [BookBeam](http://bookbeam.io) | $29-82/month | 45,000+ categories, sales/royalty data |
| [KDSPY](https://kdspy.com) | $79 (one-time) | Browser extension, BSR overlay |

### Free
| Tool | Use |
|------|-----|
| [BKLNK](https://bklnk.com) | See any book's categories by ASIN |
| [Kindlepreneur BSR Calculator](https://kindlepreneur.com/amazon-kdp-sales-rank-calculator/) | Convert BSR to daily sales estimate |
| [Amazon Best Sellers](https://www.amazon.com/gp/bestsellers/books) | Manual category research |

### API/Automation (Pay-Per-Use)

| Tool | Cost | Status |
|------|------|--------|
| **DataForSEO Amazon Keyword Volume** | ~$0.01/batch | ✅ Configured |
| **Apify Amazon Bestsellers** | ~$0.10/1K results | 🔲 Available (not configured) |

**Current cost**: ~$0.01-0.05 per book for keyword research.

---

## Data Layer Usage

Real Amazon search volume data via DataForSEO.

### Quick Start

```bash
cd data-layer/

# Check keyword volumes
python3 keyword_volume.py "fasting books" "meditation" "mental toughness"

# Output example:
# meditation books: 2,580
# fasting books: 2,169
# mental toughness: 1,084
```

### What's Available

| Feature | Status | Notes |
|---------|--------|-------|
| **Keyword volume** | ✅ Works | Batch up to 1000 keywords, ~$0.01/batch |
| **Related keywords** | ⚠️ Limited | Works for popular terms (1000+ volume) |
| **ASIN analysis** | ❌ Not available | May require higher subscription tier |

### Credentials

Uses OpenEd DataForSEO account. Config at:
```
OpenEd Vault/Studio/SEO Content Production/seomachine/data_sources/config/.env
```

---

## Apify MCP Integration

To enable automated Amazon scraping, add these actors to `.mcp.json`:

```json
{
  "mcpServers": {
    "apify-amazon": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/claude-code-mcp-server"],
      "env": {
        "MCP_CONFIG_URL": "https://mcp.apify.com?tools=simpleapi/amazon-bestsellers-scraper,junglee/amazon-crawler,runtime/amazon-product-search"
      }
    }
  }
}
```

### Available Amazon Actors

| Actor | Use Case | MCP URL |
|-------|----------|---------|
| `simpleapi/amazon-bestsellers-scraper` | Category bestseller lists | mcp.apify.com?tools=simpleapi/amazon-bestsellers-scraper |
| `junglee/amazon-crawler` | Full product data by URL | mcp.apify.com?tools=junglee/amazon-crawler |
| `runtime/amazon-product-search` | Search results scraping | mcp.apify.com?tools=runtime/amazon-product-search |
| `getdataforme/amazon-books-reviews-actor` | Book reviews | mcp.apify.com?tools=getdataforme/amazon-books-reviews-actor |

---

## Sources & Research

### Key Experts
- **Dave Chesson** (Kindlepreneur) - Original ghost category research, Publisher Rocket creator
- **Paul Marles** (298K subs) - Best YouTube coverage of 2023 category changes
- **Dale Roberts** (107K subs) - Self-Publishing with Dale podcast/YouTube

### Transcribed Content
See `research/kdp-category-selection-transcripts.md` for full transcripts of:
- Paul Marles: "KDP Ghost Categories - What You Need to Know!"
- Paul Marles: "Essential KDP Category Changes You Need to Know"

---

## Test Cases

### 1. Benedict Challenge (Fasting Book)
**Status**: ✅ Complete
**Location**: `Personal/Benedict Challenge/Book/CATEGORY_RESEARCH.md`

| Strategy | Category |
|----------|----------|
| Niche | Religion > Christian Living > Holidays > Lent |
| Mid-range | Religion > Catholicism |
| Growth | Health > Diets > Fasting |

---

### 2. JFK50 (50 Mile March)
**Status**: ✅ Complete
**Location**: `Personal/JFK50/CATEGORY_RESEARCH.md`

| Strategy | Category |
|----------|----------|
| Niche | Sports > Training > Endurance Sports |
| Mid-range | Biography > Sports & Recreation |
| Growth | Self-Help > Personal Transformation > Mental Toughness |

**Comps**: David Goggins "Can't Hurt Me", Jesse Itzler "Living with a SEAL"

---

### 3. The Pause (Psychology/Meditation)
**Status**: ✅ Complete
**Location**: `Creative Intelligence Agency/clients/Pause/book/CATEGORY_RESEARCH.md`

| Strategy | Category |
|----------|----------|
| Niche | Self-Help > Stress Management |
| Mid-range | Health & Wellness > Mental Health |
| Growth | Self-Help > Mindfulness & Meditation |

**Comps**: Rick Hanson, Jon Kabat-Zinn, Tara Brach, Daniel Siegel

---

### 4. Cross & Plough Anthology (Catholic Agrarian)
**Status**: ✅ Complete
**Location**: `Personal/CLM Publishing/Cross & Plough/CATEGORY_RESEARCH.md`

| Strategy | Category |
|----------|----------|
| Niche | Religion > Christianity > Catholic > Essays & Doctrine |
| Mid-range | Religion > Christian Living > Social Issues |
| Growth | Politics & Social Sciences > Philosophy > Ethics & Morality |

**Comps**: G.K. Chesterton, Hilaire Belloc, Wendell Berry, E.F. Schumacher

---

## Next Steps

1. **Add Apify Amazon actors to MCP** - Enable automated bestseller scraping
2. **Build kdp-launch-checklist skill** - Pre-publish validation
3. **Test DataForSEO Amazon endpoints** - Keyword volume data
4. **Run keyword optimization** on all 4 test books

---

*Updated: 2026-01-24*
*Skills: 2 complete + data layer, 3 planned*
*Test cases: 4 complete*
*Data: Amazon keyword volume via DataForSEO ✅*
