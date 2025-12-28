# Skill Stack - Session Handoff

## What We Built

Replaced the Simple-Sandbox repo entirely with **markdown-site** - a React + TypeScript + Convex publishing framework from https://github.com/waynesutton/markdown-site

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Convex (real-time database + serverless functions)
- **Hosting**: Netlify with edge functions
- **Content**: Markdown files with frontmatter → synced to Convex

---

## Current State

### Branch
```
claude/new-newsletter-project-8I53V
```

### Commits Made
1. `238501b` - Replace Simple Sandbox with markdown-site newsletter framework
2. `36bccdf` - Set up Skill Stack branding and clean sample content
3. `fe1eccd` - Add drafts folder with skill-wrapper-thesis note
4. `f59eac3` - Add Sundar/Gemini 3 vibe coding transcript draft
5. `7fb020c` - Add vibe coding skills breakdown with Charlie's commentary

### Dependencies
Already ran `npm install` - all 401 packages installed.

---

## Configuration Done

### fork-config.json (CREATED)
```json
{
  "siteName": "Skill Stack",
  "siteTitle": "The Skill of Skills",
  "siteDescription": "Mastering the only skill that matters - the art of skills.",
  "siteUrl": "https://skillstack.netlify.app",
  "siteDomain": "skillstack.netlify.app",
  "githubUsername": "cdeistopened",
  "githubRepo": "Simple-Sandbox",
  "contactEmail": "skillstack@agentmail.to",
  "creator": {
    "name": "Charlie Deist",
    "twitter": "https://x.com/chdeist",
    "linkedin": "https://www.linkedin.com/in/charliedeist/",
    "github": "https://github.com/cdeistopened"
  },
  "theme": "dark",
  "newsletter": {
    "enabled": true,
    "agentmail": {
      "inbox": "skillstack@agentmail.to"
    }
  }
}
```

### Pages Updated
- `content/pages/about.md` - About Skill Stack and skills.md protocol
- `content/pages/newsletter.md` - Subscribe page with newsletter signup
- `content/pages/contact.md` - Contact form enabled

### Pages Removed
- docs.md
- changelog-page.md
- projects.md

### Blog Posts
- **All sample posts deleted** - `content/blog/` is empty
- Ready for real content

---

## Drafts Created

### 1. `content/drafts/skill-wrapper-thesis.md`

Core thesis document covering:
- **Agent Skills vs MCP** - Skills are directory-based playbooks (SKILL.md), MCP is the universal plug for external data
- **Computer Use** - High-latency, high-cost ($30+ for complex tasks)
- **Progressive Disclosure** - Fetching only what's needed for current step
- **The "Skill Wrapper" App concept**:
  - Logic Wrappers (Low Friction) - Web app injects skill as system prompt
  - Action Wrappers (High Value) - Remote MCP for actions
- **Critical Challenges**:
  - Cost Trap → Context Caching + usage-based pricing
  - State Management → Must manage "memory" on your servers
  - Sherlocking Risk → Moat = UX + Proprietary Data
- **Next Steps**: Thin Wrapper MVP (Define vertical → Build SKILL.md → Deploy as web app)

### 2. `content/drafts/sundar-gemini3-vibe-coding.md`

Two parts:

**Part A: Satirical/Speculative Transcript**
- Fake interview with Sundar Pichai about Gemini 3
- Key themes: full-stack approach, sim-shipping, "Nano Banana Pro", vibe coding
- Quote: "This is the worst these tools will ever be"

**Part B: Vibe Coding Skills Breakdown**

Charlie's take at the top:
> Most important abilities for vibe coding are:
> - Intuition and logical thinking
> - Imperfectionism and willingness to try things and iterate and reverse course
>
> Basically need to hit your keyboard against the head and feel comfortable with your own ignorance

Content covers:
1. **New Core Skills**:
   - Architecture & System Design (The "Blueprint") - Data modeling, state management, component modularity
   - Git & GitHub (The "Save Point") - Commit on green, branch for features, revert aggressively
   - Debugging & Review (The "BS Detector") - Hallucinated libraries, security holes, "Jenga Code"

2. **Tooling Ecosystem**:
   | Tool | Best For |
   |------|----------|
   | Cursor | Professional control, Composer (Cmd+I), Context (@Symbols) |
   | Replit | Idea-to-app, Agent workflow |
   | v0.dev | UI/Frontend generation |

3. **Learning Path**:
   - Weekend 1: Git Safety Net
   - Weekend 2: Cursor Basics
   - Weekend 3: The "Architect" Project

---

## Content Sources Identified (Not Yet Imported)

### Content Vikings Substack
URL: https://contentvikings.substack.com/

Found via web search (direct fetch blocked by 403):
- #006 - Transcription Revolution
- The Rise of Conversational Content
- #008 - It's RAG Time!
- #009 - Claude 3: The AI for Humans
- #012 - Escaping the Automation Trap (Naval's Razor)
- The Content Honey Trap
- #013 - Towards an Anthropology of Content (Girard's mimetic theory)
- Claude 3 Tried to Kill My Chicken

**To import**: Export from Substack (Settings → Account → Export data) or copy/paste individual posts

### Notion
URL: https://www.notion.so/mystrong/Skillstack-295be9d00a4280eaa2d3c9b35374b33d

Blocked by 403. Options:
1. Make pages public for WebFetch
2. Set up Notion MCP with API key (needs desktop)
3. Copy/paste content manually

---

## Still TODO

### Accounts to Set Up
1. **AgentMail** (https://agentmail.to)
   - Create inbox: `skillstack@agentmail.to`
   - Get API key
   - Add to Convex env vars:
     - `AGENTMAIL_API_KEY`
     - `AGENTMAIL_INBOX`

2. **Convex** (you said you have an account)
   - Run `npx convex dev` to connect
   - Set environment variables in Convex dashboard

3. **Netlify** (for deployment)
   - Connect repo
   - Set build command: `npm run build`
   - Set publish directory: `dist`

### Content Strategy
- **Evergreen focus** - No dated references
- **Backdate strategically** - Just publish dates, content stays timeless
- **Import existing content** from Substack/Notion and refactor

### Tagline
Brainstormed 16 options, none landed. Still needed. Current placeholder:
> "The skill of skills. Mastering the only skill that matters - the art of skills."

---

## Commands Reference

```bash
# Development
npm run dev              # Start local dev server
npx convex dev           # Start Convex backend

# Content Sync
npm run sync             # Sync markdown to dev database
npm run sync:prod        # Sync to production

# Newsletter
npm run newsletter:send <slug>    # Send post to subscribers
npm run newsletter:send:stats     # Send stats summary

# Configuration
npm run configure        # Apply fork-config.json to all files
```

---

## File Structure

```
/
├── content/
│   ├── blog/           # Empty - ready for posts
│   ├── pages/          # about.md, newsletter.md, contact.md
│   └── drafts/         # skill-wrapper-thesis.md, sundar-gemini3-vibe-coding.md
├── convex/             # Backend functions
├── src/                # React components
├── public/             # Static assets, images
├── fork-config.json    # Your site configuration
└── package.json        # Dependencies installed
```

---

## Key Insight from Session

The screenshot shared near the end perfectly captures the thesis:

**@nearcyan (2022)**: "most programming jobs will not be recognizable as 'programming' within a few years"

**@nearcyan (now)**: "i dont recognize my job anymore"

**@karpathy**: "It still doesnt work pls fix. dont make any mistakes. ultrathink very hard"

This is vibe coding in action. The role shifted from writing code to managing AI that writes code. The skills.md protocol is about codifying this new meta-skill.

---

## Next Session Priorities

1. **Finalize tagline** - Something that makes people smash subscribe
2. **Import Content Vikings posts** - Refactor to evergreen
3. **Connect Convex** - Get the backend running
4. **Set up AgentMail** - Enable newsletter signups
5. **First published post** - Maybe the Skill Wrapper Thesis or Vibe Coding breakdown
