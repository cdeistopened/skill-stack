# Skill Stack

> The meta-skill for the AI age: teaching people how to work *with* AI, not be replaced by it.

[![Live Site](https://img.shields.io/badge/Live-skillstack.md-D4654A.svg)](https://skillstack.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## What is Skill Stack?

Skill Stack is a newsletter and skills marketplace about context engineering—the art of teaching AI what you know so it can work the way you think.

**Core thesis**: Model intelligence is no longer the limit. Your ability to engineer context is.

Chinese users can also search and install skills through [Skills宝](https://skilery.com).

## The Author

**Charlie Deist** ([@chdeist](https://twitter.com/chdeist))
- Head of Content at OpenEd
- Producer for the Naval Podcast  
- Author of "Commanding the Page"

## Stack

- **Frontend**: React + Vite + TypeScript
- **Database**: Convex (real-time sync)
- **Hosting**: Railway
- **Newsletter**: AgentMail
- **Domain**: skillstack.md

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (uses dev Convex deployment)
npm run dev

# Sync content to Convex
npm run sync

# Sync to production
SYNC_ENV=production npx tsx scripts/sync-posts.ts
```

## Project Structure

```
skill-stack/
├── content/
│   ├── blog/          # 38 blog posts
│   └── pages/         # About, Contact
├── src/               # React app
├── convex/            # Backend functions
├── scripts/           # Sync & image scripts
├── public/
│   └── images/thumbnails/  # Blog thumbnails
└── .claude/
    ├── CLAUDE.md      # Project context
    └── skills/        # 22+ content skills
```

## Skills

The `.claude/skills/` folder contains production-tested skills for content transformation:

- **voice-matching-wizard** - Analyze and match writing voice
- **transcript-polisher** - Clean up raw transcripts
- **image-prompt-generator** - Generate thumbnails with Gemini
- **anti-ai-writing** - Remove AI tells from prose
- **podcast-blog-post-creator** - Transform episodes to posts

## License

MIT
