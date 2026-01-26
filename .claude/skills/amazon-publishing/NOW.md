# Amazon Publishing Optimization - Project State

*Last updated: 2026-01-24*

---

## What This Is

Skills and data tools for optimizing Amazon KDP book publishing. Built for ~10 books/year.

---

## What's Working

### Data Layer ✅
```bash
cd data-layer/
python3 keyword_volume.py "keyword1" "keyword2" "keyword3"
```
- Real Amazon search volumes via DataForSEO
- ~$0.01 per batch (up to 1000 keywords)
- Uses OpenEd credentials

### Skills ✅
| Skill | Status | Use For |
|-------|--------|---------|
| `amazon-category-research` | Complete | Selecting 3 categories (portfolio strategy) |
| `kdp-keyword-optimizer` | Complete | Filling 7 backend keyword slots |

### Book Working Documents ✅

| Book | File | Status |
|------|------|--------|
| Benedict Challenge | `Personal/Benedict Challenge/Book/AMAZON_OPTIMIZATION.md` | Complete |
| JFK50 | `Personal/JFK50/AMAZON_OPTIMIZATION.md` | Complete |
| The Pause | `clients/Pause/book/AMAZON_OPTIMIZATION.md` | Complete |
| Cross & Plough | `Personal/CLM Publishing/Cross & Plough/AMAZON_OPTIMIZATION.md` | Complete |
| Belinda | `Personal/CLM Publishing/Belinda/AMAZON_OPTIMIZATION.md` | Complete |

---

## Quick Reference

### Check Keyword Volumes
```bash
cd "/Users/charliedeist/Desktop/New Root Docs/Creative Intelligence Agency/skill-stack/amazon-publishing-optimization/data-layer"
python3 keyword_volume.py "fasting books" "meditation" "mental toughness"
```

### Key Volume Benchmarks
| Volume | Meaning |
|--------|---------|
| 1,000+ | High demand, competitive |
| 100-1,000 | Good niche opportunity |
| <100 | Very specific |

---

## Book Keyword Highlights

| Book | Top Keywords (volume) |
|------|----------------------|
| **Benedict Challenge** | ash wednesday (49K), 40 day fast (710), catholic fasting (448) |
| **The Pause** | mindfulness exercises (9K), stress management (8.6K) |
| **Cross & Plough** | wendell berry (6.9K), catholic social teaching (2.1K) |
| **JFK50** | grit book (1.2K), walking challenge (860) |
| **Belinda** | hilaire belloc (972) |

---

## Not Yet Built

| Item | Status | Notes |
|------|--------|-------|
| Apify BSR scraper | Not configured | Would give real-time bestseller rank data |
| ASIN keyword analysis | Limited | DataForSEO tier may not include this |
| `kdp-launch-checklist` | Planned | Pre-publish validation |
| `book-description-writer` | Planned | HTML-formatted descriptions |
| `book-metadata-audit` | Planned | Quarterly refresh workflow |

---

## File Structure

```
amazon-publishing-optimization/
├── NOW.md                      # This file
├── PROJECT.md                  # Full documentation
│
├── data-layer/                 # ✅ Working
│   ├── keyword_volume.py      # CLI for keyword volumes
│   ├── amazon_dataforseo.py   # API wrapper
│   ├── config.py              # Credentials loader
│   └── category_analyzer.py   # Full analysis (WIP)
│
├── amazon-category-research/   # ✅ Complete skill
├── kdp-keyword-optimizer/      # ✅ Complete skill
└── research/                   # Source transcripts
```

---

## Credentials

DataForSEO (Amazon keyword volume):
```
OpenEd Vault/Studio/SEO Content Production/seomachine/data_sources/config/.env
```

---

## Next Actions

When ready to publish a book:
1. Open its `AMAZON_OPTIMIZATION.md`
2. Verify categories aren't ghost categories (use BKLNK)
3. Run fresh keyword volume check
4. Fill KDP metadata using recommendations
5. Update doc with any changes

---

*For full documentation see PROJECT.md*
