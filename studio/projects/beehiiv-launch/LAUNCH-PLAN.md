# Beehiiv Launch Plan

## Decision: Hybrid Approach (Not Full Migration)

**Keep:** skillstack.md as the blog/skills marketplace (your owned property)
**Add:** Beehiiv for newsletter distribution only

This gives you:
- Beehiiv's growth tools (referrals, recommendations, boosts)
- Eligibility for MFM competition
- No migration headache
- Content still lives in your markdown repo (file over app)

---

## Priority 1: Beehiiv Setup (Do First)

### 1.1 Create Beehiiv Account
- [ ] Sign up at beehiiv.com (free tier: 2,500 subscribers)
- [ ] Choose publication name: "Skill Stack" or "The Skill Stack"
- [ ] Set up custom domain (optional): newsletter.skillstack.md

### 1.2 Configure Publication Settings
- [ ] Upload logo/branding from `public/images/skill-stack-logo.png`
- [ ] Write publication description (use one-liner from BRANDSCRIPT)
- [ ] Set up welcome email sequence
- [ ] Configure footer/unsubscribe settings

### 1.3 Install Beehiiv MCP Server
```bash
# Install Dan Vega's Beehiiv MCP server
# https://github.com/danvega/beehiiv-mcp-server
```
- [ ] Get Beehiiv API key from Settings > Integrations
- [ ] Add to Claude Code MCP config
- [ ] Test: list publications, retrieve posts

---

## Priority 2: Replace Email Opt-in (Quick Win)

### Current State
- AgentMail handles newsletter signups on skillstack.md
- Subscribers go to Convex database

### New State
- Beehiiv embed form replaces AgentMail form
- Subscribers go to Beehiiv (with growth tools)
- Keep AgentMail for transactional emails if needed

### Implementation
- [ ] Get Beehiiv embed code from Publication > Grow > Subscribe Forms
- [ ] Update `src/components/NewsletterSignup.tsx` (or similar)
- [ ] Test signup flow
- [ ] Export existing AgentMail subscribers → import to Beehiiv

---

## Priority 3: Workflow for Publishing

### The Dual-Publish Flow

```
Write in Markdown (content/drafts/)
         |
         v
Edit/refine with Claude Code skills
         |
         +--> Publish to skillstack.md (npm run sync)
         |         (full article with formatting)
         |
         +--> Publish to Beehiiv (via MCP or copy)
                   (newsletter version, may be adapted)
```

### Why Dual-Publish?
- Blog post = SEO, evergreen, full formatting
- Newsletter = inbox delivery, growth tools, reader relationship
- Same content, different distribution channels
- Not redundant - complementary

### Beehiiv MCP Commands (Once Set Up)
```
# List recent posts
"Show me my last 5 Beehiiv posts"

# Create new post (draft)
"Create a Beehiiv draft with title 'The Skill Stack' from content/blog/the-skill-stack.md"

# Add subscriber
"Add subscriber john@example.com to Skill Stack"
```

---

## Priority 4: First Newsletter Issue

### Use Existing Content
Best candidate: `content/blog/the-skill-stack.md` (already published, proven)

Or use a polished draft:
- `content/drafts/dont-learn-to-code.md` (ready)
- `content/drafts/vibe-coding-orchestration.md` (ready)

### Newsletter Adaptation
- Add personal intro (why you're starting this)
- Include CTA for next issue
- Link back to full blog post on skillstack.md
- Test send to yourself first

---

## Priority 5: Submit MFM Application

**Deadline: January 31, 2026**

- [ ] Review `MFM-APPLICATION.md` in this folder
- [ ] Polish the pitch
- [ ] Submit at beehiiv.com/application/mfm
- [ ] Include link to first published Beehiiv issue

---

## What NOT to Do

### Don't Port Website to Beehiiv
- Your React/Vite/Convex site is already built
- Beehiiv's website builder is limited
- You'd lose: custom skills marketplace, blog formatting, Convex features
- Keep skillstack.md as the hub, Beehiiv as distribution

### Don't Abandon AgentMail Immediately
- Keep for transactional emails
- May want for other projects
- Gradual transition, not hard cutover

### Don't Over-Engineer
- Simple flow: write markdown → publish to both
- No complex automation needed initially
- MCP is nice-to-have, not essential for launch

---

## Timeline

| Day | Task |
|-----|------|
| Day 1 | Beehiiv account setup, branding |
| Day 2 | Replace email form on skillstack.md |
| Day 3 | Adapt first post for newsletter format |
| Day 4 | Send first issue (even if small list) |
| Day 5-10 | Write/refine MFM application |
| Before Jan 31 | Submit application |

---

## Success Metrics (First 30 Days)

- [ ] Beehiiv account live
- [ ] Email form replaced
- [ ] First newsletter sent
- [ ] MFM application submitted
- [ ] 100+ subscribers (from existing channels + new signups)

---

*Created: 2026-01-20*
