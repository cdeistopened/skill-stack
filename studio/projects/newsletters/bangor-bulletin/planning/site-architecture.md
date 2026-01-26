# Bangor Bulletin Site Architecture

> Deferred until we have more content and clearer needs.

## Why We're Waiting

The Bangor Bulletin has different structural needs than a standard blog:

1. **Newsletter archive** (time-bound issues)
2. **Directory** (evergreen, categorized listings)
3. **Two content types** that interact differently

This requires custom development beyond the markdown-site template. Better to build content first, then build the site to fit.

---

## What Makes This Site Different

### Two Distinct Content Types

**1. The Newsletter (Time-bound)**
- Weekly issues with a date
- The Lead (feature story)
- Quick Hits (events this week)
- Featured section (Borrow a Boar, etc.)
- Snapshot of the directory at that moment

**2. The Directory (Evergreen)**
- Categorized listings that persist
- Updated when you scan the bulletin boards
- Some listings expire (events), some don't (contractors)
- Needs: search, filter by category, "last updated" timestamps

### The Model

- **Craigslist** (classifieds structure)
- **Substack** (newsletter archive)
- **Local Axios** (curated weekly briefing)

---

## Directory Categories (from taxonomy.md)

| Category | Contents |
|----------|----------|
| Events & Gatherings | Time-bound community happenings |
| Goods & Provisions | Things you buy and take home |
| Property & Land | Outdoor/land-scale work |
| Home & Trade | Structure/building work, skilled trades |
| Animal & Livestock | Vet, grooming, livestock services |
| Family & Wellness | Childcare, health, education, fitness |
| Vehicles & Equipment | Buying/selling/hauling |
| Lost & Found | Missing/found animals (special prominence) |
| Local Landmarks | Ongoing attractions, institutions |

---

## Site Features Needed

### Must Have
- [ ] Newsletter archive (issues list)
- [ ] Directory with categories
- [ ] Newsletter signup (AgentMail)
- [ ] Mobile-friendly

### Nice to Have
- [ ] Search within directory
- [ ] Filter by category
- [ ] "Last updated" on listings
- [ ] Submit a listing form

### Future
- [ ] Listing expiration/renewal
- [ ] Sponsored listings
- [ ] Local events calendar

---

## AgentMail Integration

The newsletter delivery requires:
- Convex backend (new project)
- AgentMail API key + inbox
- Subscriber management
- Separate sender identity for Bangor Bulletin

Already built into skill-stack site - can reference that implementation.

---

## Template Fork Notes

When ready to build:

1. Fork waynesutton/markdown-site
2. Replace Netlify with Railway deployment
3. Add directory component (custom)
4. Set up wizard script for customization
5. Configure AgentMail for new inbox

See `site-wizard-template.md` in skill-stack drafts for detailed checklist.

---

## Trigger to Start Building

Build the site when:
- [ ] 3-4 newsletter issues written
- [ ] Directory structure proven (categories stable)
- [ ] Email list started (even if small)
- [ ] Clear picture of directory UX needs

---

*Parked for now. Focus on content.*
