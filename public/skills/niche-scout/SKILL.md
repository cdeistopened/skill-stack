---
name: niche-scout
description: Evaluate Amazon KDP niche profitability using BSR analysis, keyword volume, and competition scoring. Use when researching book niches, validating publishing ideas, or comparing market opportunities.
argument-hint: "[keyword phrase]"
---

# Niche Scout

Evaluate whether a keyword/topic is a profitable KDP publishing niche. Based on the 3-step validation framework from Sean Dollwet, Dale Roberts, and Dave Chesson (175 episodes distilled in Kings of Kindle).

## Usage

```
/niche-scout beekeeping for beginners
/niche-scout "anxiety management"
/niche-scout claude code AI coding assistant
```

## Workflow

### Step 1: Amazon Keyword Volume (DataForSEO)

Run the keyword volume script to get Amazon search volume and related keywords:

```bash
python3 ~/.claude/skills/niche-scout/scripts/keyword-volume.py "$ARGUMENTS"
```

This returns:
- Amazon search volume for the seed keyword + 9 variations
- Related keywords with volume (up to 20)
- Use these to assess **demand** and identify series potential (10-keyword strategy)

**Demand threshold:** Seed keyword should have 200+ monthly Amazon searches. Related keywords reveal series opportunities.

### Step 2: BSR Analysis (Apify Amazon Scraper)

Run the BSR scraper to get Best Seller Rank for top books:

```bash
python3 ~/.claude/skills/niche-scout/scripts/bsr-scraper.py "$ARGUMENTS"
```

This runs two Apify calls:
1. **Search results** — gets titles, prices, ratings, ASINs for top 20 books
2. **Product details** — gets BSR, publisher, categories for top 10

Wait for both to complete (typically 30-90 seconds each).

### Step 3: Score the Niche

Apply Sean Dollwet's BSR benchmarks to the scraped data:

| Metric | Target | Scoring |
|--------|--------|---------|
| Books under 5,000 BSR | No more than 5 of top 20 | >5 = too competitive |
| Books under 30,000 BSR | Most or all of top 20 | Sweet spot for new publishers |
| Books under 100,000 BSR | At least 7 of 10 | Minimum viable demand |
| Self-published on page 1 | At least 2-3 | Proves indie can compete |
| Search results count | Under 3,000 | Lower = easier to rank |

**Self-published detection signals:**
- Publisher = "Independently published" or "Independently Published"
- Price $2.99-$4.99 range
- Keyword-heavy title (exact match of search term)
- Stock/template cover design

### Step 4: Check All Three Platforms

A keyword that's weak on Kindle might be strong on paperback or audiobook:

| Platform | Good BSR | Notes |
|----------|----------|-------|
| Kindle eBooks | Under 50,000 | Most competitive; most publishers start here |
| Paperback | Under 100,000 | Higher royalties; reference/cookbooks do better |
| Audiobook (Audible) | Under 100 search results | Least competitive; under-served in most niches |

### Step 5: Generate the Report

Output a structured niche report with:

1. **Keyword volume table** — seed + related keywords with Amazon search volume
2. **BSR table** — top 10 books sorted by BSR with publisher, self-pub flag
3. **Benchmark scorecard** — pass/fail on each Dollwet criterion
4. **Estimated daily sales** — using BSR-to-sales conversion (see reference/bsr-sales-table.md)
5. **Competition signals** — weak covers, bad titles, low reviews = beatable
6. **Series potential** — can you find 5-10 related keywords for a book series?
7. **Verdict** — VIABLE / BORDERLINE / TOO COMPETITIVE / DEAD

### Step 6: Hot vs Evergreen Assessment

Classify the niche:
- **Hot topic**: Trending, short window, fast cash if you move quickly
- **Evergreen**: Steady demand year-round, compounds over time
- **Seasonal**: Predictable spikes (gardening in spring, etc.)

The ideal portfolio mixes both. Check Google Trends for seasonality patterns.

---

## Niche Selection Checklist (from Ch 2)

Before committing to a niche, ALL boxes must check:

- [ ] **Demand confirmed:** Multiple books in top results have BSR under 100,000
- [ ] **BSR sweet spot:** Most of the top 20 books fall between 10,000 and 30,000
- [ ] **Competition beatable:** No more than 5 books under 5,000 BSR in top 20
- [ ] **Self-published proof:** At least 2-3 self-published books selling well on page 1
- [ ] **Weak spots visible:** You can identify covers, titles, or descriptions you can beat
- [ ] **Multi-platform potential:** Checked Kindle, paperback, and audiobook
- [ ] **Search results count:** Under 3,000 (lower = better)
- [ ] **Series potential:** Can identify 5-10 related keyword variations
- [ ] **No trademark issues:** Keywords don't include trademarked terms

---

## Reference Files

- For BSR-to-sales conversion: see [reference/bsr-sales-table.md](reference/bsr-sales-table.md)
- For tool comparison: see [reference/tools.md](reference/tools.md)
- For the full keyword workflow: use `/keyword-fill` after niche is validated

## Tool Dependencies

- **DataForSEO** — Amazon keyword volume + related keywords (credentials in ~/.zshrc or hardcoded)
- **Apify** — Amazon product scraping for BSR, publisher, categories (APIFY_TOKEN in env)
- **Python 3** with `requests` library

## Related Skills

- **keyword-fill** — Fill the 7 Amazon keyword boxes (run AFTER niche is validated)
- **book-architect** — Generate outline + title/subtitle (run AFTER niche + keywords)
- **listing-optimizer** — Write description + select categories
- **deep-research** — For deeper market analysis on borderline niches
- **seomachine** — For Google keyword data (complements Amazon data)
