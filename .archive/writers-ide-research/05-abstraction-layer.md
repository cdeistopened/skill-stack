# Abstraction Layer: User-Facing Design

> The system is Claude Code + markdown. The experience should feel like a writing studio.

---

## The Terminology Problem

The underlying system uses developer concepts:
- `CLAUDE.md` - Project configuration
- `.claude/skills/` - Prompt templates
- `npm run sync` - Database push
- MCP servers - Integration layer

These terms work for developers. They confuse writers.

The abstraction layer translates system concepts into user-friendly language while preserving full power for those who want it.

---

## Terminology Mapping

```
┌────────────────────────────┬────────────────────────────┐
│   SYSTEM (Under the Hood)  │   USER-FACING (UI/UX)      │
├────────────────────────────┼────────────────────────────┤
│ CLAUDE.md                  │ "Studio Settings"          │
│                            │ or "Project Config"        │
├────────────────────────────┼────────────────────────────┤
│ NOW.md                     │ "Current Focus"            │
│                            │ or "Session State"         │
├────────────────────────────┼────────────────────────────┤
│ .claude/skills/            │ "Workflows"                │
│                            │ or "Transformations"       │
├────────────────────────────┼────────────────────────────┤
│ /skill-name                │ Dropdown: "Run Workflow"   │
│                            │ with searchable list       │
├────────────────────────────┼────────────────────────────┤
│ corpus/                    │ "Content Memory"           │
│                            │ or "Knowledge Base"        │
├────────────────────────────┼────────────────────────────┤
│ content/raw/               │ "Import" folder            │
│                            │ (with drag-and-drop)       │
├────────────────────────────┼────────────────────────────┤
│ npm run sync               │ "Publish" button           │
├────────────────────────────┼────────────────────────────┤
│ MCP servers                │ "Connections" panel        │
│                            │ (Notion, X, YouTube...)    │
├────────────────────────────┼────────────────────────────┤
│ /handoff                   │ "End Session" or           │
│                            │ "Save & Close"             │
├────────────────────────────┼────────────────────────────┤
│ Checkpoint                 │ "Review Point"             │
├────────────────────────────┼────────────────────────────┤
│ Ralph loop                 │ "Quality Check"            │
│                            │ (runs automatically)       │
└────────────────────────────┴────────────────────────────┘
```

---

## The Three-Panel Interface

The Cursor/VS Code layout adapted for writers:

```
┌─────────────────────────────────────────────────────────────────┐
│  [File] [Edit] [View] [Workflows] [Connections] [Help]          │
├─────────────────┬────────────────────────────┬──────────────────┤
│                 │                            │                  │
│  EXPLORER       │       STUDIO               │     ASSISTANT    │
│                 │                            │                  │
│  📁 Content     │  [Edit] [Preview] [Split]  │  Context:        │
│    📁 Blog      │  ─────────────────────────│  ✓ Settings      │
│    📁 Drafts    │                            │  ✓ Focus         │
│    📁 Import    │  # Your Title              │  ✓ Voice skill   │
│                 │                            │                  │
│  📁 Workflows   │  Opening paragraph with    │  ─────────────── │
│    📄 Blog Post │  your authentic voice...   │                  │
│    📄 Social    │                            │  You: Transform  │
│    📄 Newsletter│  > A blockquote            │  this into a     │
│                 │                            │  blog post       │
│  📁 Memory      │  [[Related Post]]          │                  │
│    📄 Settings  │                            │  Assistant:      │
│    📄 Focus     │                            │  I'll use your   │
│                 │                            │  Blog Post       │
│  ─────────────  │                            │  workflow...     │
│  📊 Knowledge   │                            │                  │
│    38 items     │                            │  [Review Point]  │
│    Last: today  │                            │  Outline ready   │
│                 │                            │                  │
└─────────────────┴────────────────────────────┴──────────────────┘
```

### Key Differences from Code IDEs

1. **Preview by default** - Markdown renders beautifully; click to edit source
2. **Workflows visible** - Skills surfaced as named workflows
3. **Knowledge stats** - Shows corpus size and freshness
4. **Review points** - Checkpoints displayed as modal dialogs

---

## The Studio Panel (Center)

Writers don't want to stare at raw markup. The center panel should:

1. **Render markdown by default** - Like Obsidian or Notion
2. **Support block types** - Callouts, embeds, tables
3. **Enable internal linking** - `[[backlink]]` creates connections
4. **Click to edit source** - Toggle to raw markdown when needed
5. **Drag-and-drop images** - Drop images, auto-save to public/images/

### Block Types

```
Standard blocks:
- Paragraphs
- Headers (H1-H6)
- Lists (bullet, numbered, checkbox)
- Blockquotes
- Code blocks
- Images

Enhanced blocks:
- Callouts (note, warning, tip)
- Embeds (YouTube, Twitter)
- Tables (with visual editor)
- Internal links [[post-slug]]
- Frontmatter (collapsible header)
```

---

## The Workflows Panel

Instead of slash commands, a searchable workflow picker:

```
┌─────────────────────────────────────────────────────────────────┐
│  RUN WORKFLOW                                            [×]    │
├─────────────────────────────────────────────────────────────────┤
│  🔍 Search workflows...                                         │
├─────────────────────────────────────────────────────────────────┤
│  RECENTLY USED                                                  │
│  ├── 📝 Blog Post from Transcript                               │
│  ├── 📱 Social Content Kit                                      │
│  └── ✨ Polish Draft                                            │
├─────────────────────────────────────────────────────────────────┤
│  CONTENT CREATION                                               │
│  ├── 📝 Blog Post from Transcript                               │
│  ├── 📧 Newsletter Section                                      │
│  ├── 🎙️ Podcast Show Notes                                      │
│  └── 📹 YouTube Description                                     │
├─────────────────────────────────────────────────────────────────┤
│  DISTRIBUTION                                                   │
│  ├── 📱 Social Content Kit                                      │
│  ├── 🐦 X Thread                                                │
│  └── 💼 LinkedIn Post                                           │
├─────────────────────────────────────────────────────────────────┤
│  UTILITIES                                                      │
│  ├── ✨ Polish Draft                                            │
│  ├── 🔍 SEO Audit                                               │
│  └── 🖼️ Generate Thumbnail                                      │
└─────────────────────────────────────────────────────────────────┘
```

Selecting a workflow:
1. Opens workflow description
2. Shows required inputs
3. Shows estimated time and checkpoints
4. "Run" button starts execution

---

## The Connections Panel

MCP servers abstracted as simple connections:

```
┌─────────────────────────────────────────────────────────────────┐
│  CONNECTIONS                                             [×]    │
├─────────────────────────────────────────────────────────────────┤
│  CONNECTED                                                      │
│  ├── ✅ Notion          Personal workspace                      │
│  ├── ✅ X/Twitter       @chdeist                                │
│  └── ✅ YouTube         Skill Stack channel                     │
├─────────────────────────────────────────────────────────────────┤
│  AVAILABLE                                                      │
│  ├── ⚪ LinkedIn        [Connect]                               │
│  ├── ⚪ Descript        [Connect]                               │
│  ├── ⚪ Riverside       [Connect]                               │
│  └── ⚪ Google Drive    [Connect]                               │
├─────────────────────────────────────────────────────────────────┤
│  API KEYS                                                       │
│  ├── ✅ Gemini          Configured                              │
│  ├── ✅ DataForSEO      Configured                              │
│  └── ⚪ AgentMail       [Add Key]                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Progressive Disclosure

Power users get full access; new users see simplified interface:

### Level 1: Basic (Default)
- Write in Studio
- Run workflows from menu
- Publish button
- Assistant chat

### Level 2: Intermediate
- Edit workflow parameters
- View workflow source
- Custom checkpoints
- Connection management

### Level 3: Advanced
- Edit CLAUDE.md directly
- Create new workflows
- Configure Ralph loops
- Raw terminal access

Users can toggle: "Show Advanced Features" in settings.

---

## Onboarding Flow

First-time users go through wizard:

```
Welcome to [Studio Name]!

Let's set up your writing workspace.

Step 1 of 4: What do you create?
  [ ] Newsletter/Blog
  [ ] Podcast content
  [ ] YouTube videos
  [ ] Social media
  [ ] All of the above
  
Step 2 of 4: Your voice
  Do you have writing samples I can learn from?
  [Upload samples] or [Skip for now]
  
Step 3 of 4: Connect your tools
  Which platforms do you use?
  [Notion] [X] [YouTube] [Descript] ...
  
Step 4 of 4: Your first workflow
  Based on your answers, I recommend starting with:
  "Blog Post from Transcript"
  
  [Get Started]
```

---

## Error States for Non-Technical Users

```
INSTEAD OF:
"Error: MCP server rube returned ECONNREFUSED"

SHOW:
"Connection to X/Twitter is temporarily unavailable.
 
 Your draft is saved. You can:
 • Try again in a few minutes
 • Copy content and post manually
 • Skip this step for now"
```

---

## The On-Ramp Problem

The Oracle Session identified this:

> "Skills work but are trapped in a distribution format (Claude Code + markdown) that excludes 95% of potential users."

The abstraction layer IS the on-ramp. It must:

1. **Hide complexity initially** - No terminal, no config files visible
2. **Reveal progressively** - Power features available but not required
3. **Teach through use** - Tooltips, inline help, workflow descriptions
4. **Never block** - Errors don't stop work; alternatives provided

The goal: A writer can be productive in 10 minutes. After 10 hours, they're power users. After 100 hours, they're creating their own workflows.

---

*The abstraction layer is where adoption lives or dies. The system underneath is powerful - the question is whether non-technical creators can access that power.*
