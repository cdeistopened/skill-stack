# Teresa Torres: Running Life & Business with Claude Code

## The Core Setup

Teresa runs everything from two terminal windows + Obsidian (markdown-based notes). The key insight: **Claude Code isn't just for coding—it's pair programming for everything.**

---

## The Daily System

### The "Today" Command
Every morning, she types `today` and Claude:
1. Checks Trello for new cards from her team
2. Runs a Python script that scans her tasks folder
3. Generates a daily to-do list (overdue items, due today, in-progress projects)
4. Pulls relevant academic research from preprint servers/Google Scholar

### Task Creation
```
new task write blog post, due today
```
Claude creates a markdown file with proper frontmatter, tags, and due dates. Ideas without deadlines go to an "ideas" folder and show up as "in progress" reminders.

**The speed advantage**: No context-switching to Trello or web apps. Random thought → captured in seconds → back to work.

---

## The Writing Workflow

### Phase 1: Rough Planning
She dumps raw thoughts into a markdown file:
- Goals for the piece
- Example she wants to use
- Constraints ("less about features, more about getting Claude to do good work")

### Phase 2: Research & Outline
Claude searches for existing content on the topic, does SEO keyword research (by analyzing what's ranking), and suggests alternative structures for the piece.

**Key habit**: She asks "Has anyone else written this for my audience?" If yes, she links to it instead of duplicating.

### Phase 3: Writing (Human) + Review (Claude)
She writes every word herself—values her voice and uses writing to clarify her own thinking. But after each section:
1. Claude reviews for what's working
2. Suggests improvements
3. Does technical accuracy check
4. Lists typos (asks before fixing)

**The momentum trick**: Claude always prompts "Ready for phase two?" which keeps her from drifting to email between sections.

**Result**: 9,000-word article in 1.5 days instead of 3-4 days for a 2,000-word piece.

---

## The Three-Layer Context System

### Layer 1: Global Preferences (~/.claude/claude.md)
**Keep this short**—it loads in every conversation.
- "Always plan before doing anything"
- "Here's how I like feedback structured"
- Index pointing to reference files

### Layer 2: Project-Specific Instructions (folder-level claude.md)
The writing folder knows about her style guide. The tasks folder knows her task system. They don't cross-contaminate.

### Layer 3: Reference Files (LLM-context folder)
Small, modular files:
- Business profile
- Target audience
- Product descriptions
- Team members
- Marketing channels

**Critical principle**: Claude only pulls these when relevant. Asking about Christmas gifts? It doesn't need your business model.

---

## Context Window Management

### The Problem
When context fills up, Claude "gets dumber"—loses details, forgets decisions.

### Her Solution
1. **Process Notes file**: Running history of decisions made across sessions
2. **Manual summaries**: Before compacting, she has Claude write a summary she controls
3. **Never trust auto-compact**: It loses too much nuance

---

## Building Context Over Time

She never sat down and created all these files at once. The rules:

1. **Whenever you explain something to Claude, ask**: "Will I explain this again?" If yes → make it a context file
2. **End every session with**: "What did you learn about me that should go in a context file?"
3. **Let Claude interview you**: "Interview me about my business" → it asks questions → writes the file

**Where things go**:
- Working preferences → claude.md
- Information about you/business → context files
- Index updates → Claude handles automatically when you ask "What index needs updating?"

---

## Three Tips to Start

1. **Build context incrementally**: Every time you explain something, capture it. Don't try to document everything day one.

2. **Develop the delegation muscle**: For every task, ask "How can Claude help?" Some things you augment (writing), some you automate entirely (filing receipts).

3. **Separate work and personal**: At minimum, two folders with different claude.md files.

---

## The Meta-Lesson

Using Claude Code at the edge teaches you how LLMs actually work—context management, memory limitations, prompt design. If you're building AI into products, you need this depth of experience. The tooling will improve, but product people can't wait.