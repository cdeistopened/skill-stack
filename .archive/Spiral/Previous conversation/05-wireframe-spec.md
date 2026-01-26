# Spiral 2.0 Wireframe Specification

## Overview

This document specifies the UI/UX design for Spiral 2.0, incorporating:
- The remix paradigm at every level
- Doodle Reader capture integration
- Social layer for skills/styles discovery
- Proactive AI workflows

---

## Primary Views

### 1. Home / Dashboard

```
┌─────────────────────────────────────────────────────────────────────┐
│  ☰ Spiral                                    [Search] [@profile]    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Good morning, Charlie                                              │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🔔 PROACTIVE SUGGESTIONS                                    │   │
│  │                                                              │   │
│  │  📹 New: Episode 47 of your podcast was published 2h ago    │   │
│  │     [Generate Thread] [Create Newsletter Teaser] [Dismiss]  │   │
│  │                                                              │   │
│  │  💡 Pattern detected: You've converted 3 podcasts to        │   │
│  │     threads this week. Create a skill for this?             │   │
│  │     [Create Skill] [Not now]                                │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  📝 New          │  │  📚 Content      │  │  🎯 Skills       │  │
│  │  Transformation  │  │  Library         │  │  Library         │  │
│  │                  │  │                  │  │                  │  │
│  │  Turn <this>     │  │  47 sources      │  │  12 active       │  │
│  │  into <that>     │  │  3 new today     │  │  4 from follows  │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                     │
│  RECENT OUTPUTS                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Thread from Ep 46  •  2 days ago  •  [Copy] [Edit] [Share] │   │
│  │  Newsletter draft   •  3 days ago  •  [Copy] [Edit] [Share] │   │
│  │  LinkedIn post      •  5 days ago  •  [Copy] [Edit] [Share] │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- Proactive suggestions panel (top priority)
- Quick action cards for common flows
- Recent outputs for easy access
- Pattern detection → skill creation prompts

---

### 2. Workspace (Three-Pane Layout)

```
┌────────────────────┬──────────────────────────────┬─────────────────────┐
│  CONTEXT PANEL     │      CONVERSATION            │    PREVIEW          │
│  (Collapsible)     │                              │    (Collapsible)    │
├────────────────────┼──────────────────────────────┼─────────────────────┤
│                    │                              │                     │
│  📋 spiral.md      │                              │  OUTPUT PREVIEW     │
│  ├─ Voice Profile  │  ┌────────────────────────┐  │                     │
│  ├─ Identity       │  │ What would you like    │  │  ┌───────────────┐ │
│  ├─ Memory         │  │ to create today?       │  │  │               │ │
│  └─ Defaults       │  └────────────────────────┘  │  │   [Preview    │ │
│                    │                              │  │    renders    │ │
│  🎯 Active Skill   │  You: Turn this podcast      │  │    here as    │ │
│  ┌──────────────┐  │  transcript into a thread    │  │    you work]  │ │
│  │ Thread Maker │  │  for Twitter.               │  │               │ │
│  │ ⚙️ Configure │  │                              │  │               │ │
│  └──────────────┘  │  ────────────────────────    │  └───────────────┘ │
│                    │                              │                     │
│  📚 Sources        │  Spiral: I'll use your       │  FORMAT: Thread     │
│  ├─ Ep 47 (new)    │  Thread Maker skill and      │  LENGTH: ~280 chars │
│  ├─ Ep 46          │  your conversational tech    │  POSTS: 7           │
│  ├─ Ep 45          │  voice. Here's a draft:      │                     │
│  └─ + Add source   │                              │  ┌───────────────┐  │
│                    │  [DRAFT APPEARS]             │  │ 1/7           │  │
│  🎨 Styles         │                              │  │ The biggest   │  │
│  ├─ Conversational │  ────────────────────────    │  │ mistake in... │  │
│  ├─ Formal         │                              │  └───────────────┘  │
│  └─ + Add style    │  You: Make the hook          │  ┌───────────────┐  │
│                    │  punchier                    │  │ 2/7           │  │
│                    │                              │  │ Here's what   │  │
│                    │  ────────────────────────    │  │ most people...│  │
│                    │                              │  └───────────────┘  │
│                    │  [Message input...]     [→]  │                     │
│                    │                              │  [Copy All] [Export]│
└────────────────────┴──────────────────────────────┴─────────────────────┘
```

**Key Elements:**
- Left: spiral.md config (transparent, editable), active skill, sources, styles
- Center: Conversational interface with AI partner
- Right: Live preview of output in target format
- All panels collapsible for focus modes

---

### 3. Content Library

```
┌─────────────────────────────────────────────────────────────────────┐
│  ← Back    CONTENT LIBRARY                    [+ Add Source] [⚙️]   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  CONNECTED SOURCES (via Doodle Reader)                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🎙️ My Podcast (RSS)           47 episodes    ● Syncing     │   │
│  │  📺 YouTube Channel             23 videos      ● Up to date  │   │
│  │  ✍️ Substack (RSS)              89 posts       ● Up to date  │   │
│  │                                                              │   │
│  │  [+ Add Podcast] [+ Add YouTube] [+ Add Blog] [+ Paste URL] │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  LIBRARY                          [Search...] [Filter ▼] [Sort ▼]  │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ○  📹 Episode 47: The Future of...   🎙️ Podcast   2h ago   │   │
│  │  ○  📹 Episode 46: Why Writers...     🎙️ Podcast   1w ago   │   │
│  │  ○  📝 The Remix Paradigm             ✍️ Substack  2w ago   │   │
│  │  ○  📹 How I Use AI to Write...       📺 YouTube   3w ago   │   │
│  │  ...                                                         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  [Select All] [Transform Selected →]                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- Connected sources panel with sync status
- Easy add flows for different source types
- Bulk selection for batch transformations
- Search/filter/sort for large libraries

---

### 4. Skills Library

```
┌─────────────────────────────────────────────────────────────────────┐
│  ← Back    SKILLS                    [+ Create Skill] [Discover]    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  MY SKILLS                                                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🧵 Thread Maker        Used 23x    ⚙️ Edit   📤 Share      │   │
│  │  📧 Email Sequence      Used 12x    ⚙️ Edit   📤 Share      │   │
│  │  🎬 Viral Clip Finder   Used 8x     ⚙️ Edit   📤 Share      │   │
│  │  📝 Show Notes          Used 15x    ⚙️ Edit   📤 Share      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  FROM PEOPLE YOU FOLLOW                                             │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🔗 LinkedIn Thought    @sarahwriter    [Use] [Fork] [···]  │   │
│  │  📊 Data Story          @analyst_joe    [Use] [Fork] [···]  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  SUGGESTED FOR YOU                                                  │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  💡 "Writers who use Thread Maker also use..."              │   │
│  │  📰 Newsletter Hook     ⭐ 4.8    1.2k uses    [Preview]     │   │
│  │  🐦 Tweet Storm         ⭐ 4.6    890 uses     [Preview]     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- My skills with usage stats
- Skills from followed writers (social layer)
- Algorithmic suggestions based on usage patterns
- Fork flow for customization

---

### 5. Skill Detail / Editor

```
┌─────────────────────────────────────────────────────────────────────┐
│  ← Back    THREAD MAKER                          [Save] [Test] [📤] │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  DESCRIPTION                                                        │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Transforms long-form content into Twitter/X threads.       │   │
│  │  Optimized for engagement hooks and narrative flow.         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  INPUTS                              OUTPUTS                        │
│  ┌────────────────────────┐          ┌────────────────────────┐    │
│  │  • Transcript          │    →     │  • Thread (7-12 posts) │    │
│  │  • Article             │          │  • Alt: Single tweet   │    │
│  │  • Notes               │          │                        │    │
│  └────────────────────────┘          └────────────────────────┘    │
│                                                                     │
│  SKILL INSTRUCTIONS (SKILL.md)                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ## Thread Maker Skill                                      │   │
│  │                                                              │   │
│  │  ### Process                                                 │   │
│  │  1. Identify the single most compelling insight             │   │
│  │  2. Craft hook (pattern interrupt or bold claim)            │   │
│  │  3. Build narrative arc across 7-12 posts                   │   │
│  │  4. End with call-to-action or callback to hook             │   │
│  │                                                              │   │
│  │  ### Quality Checkpoints                                    │   │
│  │  - [ ] Hook creates curiosity gap                           │   │
│  │  - [ ] Each post stands alone but connects                  │   │
│  │  - [ ] No post exceeds 280 characters                       │   │
│  │  ...                                                         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  STYLE INTEGRATION                                                  │
│  Uses: [Conversational Tech ▼]     Tone: [Confident ▼]             │
│                                                                     │
│  USAGE STATS                                                        │
│  Used 23 times  •  Last used 2 days ago  •  Avg rating: 4.7        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- Visible, editable skill instructions (transparency)
- Clear input/output definitions
- Quality checkpoints
- Style integration
- Usage analytics

---

### 6. Discover / Social Tab

```
┌─────────────────────────────────────────────────────────────────────┐
│  ☰ Spiral    DISCOVER                [Search writers or skills...]  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [Skills] [Styles] [Writers]                                        │
│                                                                     │
│  TRENDING SKILLS                                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🔥 LinkedIn Carousel    ⭐ 4.9   2.3k uses this week        │   │
│  │     by @contentpro       "Perfect for B2B thought leaders"  │   │
│  │     [Preview] [Add to Library] [Follow Creator]             │   │
│  │                                                              │   │
│  │  🔥 Newsletter Hook Gen  ⭐ 4.8   1.8k uses this week        │   │
│  │     by @emailwizard      "50% higher open rates"            │   │
│  │     [Preview] [Add to Library] [Follow Creator]             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  WRITERS YOU MIGHT LIKE                                             │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  👤 @techwriter_sarah                                       │   │
│  │     12 skills shared  •  "SaaS content specialist"          │   │
│  │     Similar to writers you follow                           │   │
│  │     [View Profile] [Follow]                                 │   │
│  │                                                              │   │
│  │  👤 @newsletter_nina                                        │   │
│  │     8 skills shared  •  "Newsletter growth expert"          │   │
│  │     Uses Thread Maker (like you)                            │   │
│  │     [View Profile] [Follow]                                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  SKILL CATEGORIES                                                   │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐           │
│  │ Social │ │ Email  │ │ Long   │ │ Video  │ │ Sales  │           │
│  │ Media  │ │        │ │ Form   │ │ Script │ │ Copy   │           │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- Trending skills (community validation)
- Writer discovery (follow graph)
- Category browsing
- "Similar to" recommendations

---

### 7. Writer Profile (Social)

```
┌─────────────────────────────────────────────────────────────────────┐
│  ← Back    @techwriter_sarah                        [Following ✓]   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────┐  Sarah Chen                                              │
│  │ 👤   │  SaaS content specialist • 2.3k followers                │
│  │      │  "I help B2B companies sound human"                      │
│  └──────┘                                                          │
│                                                                     │
│  [Skills] [Styles] [About]                                         │
│                                                                     │
│  SHARED SKILLS (12)                                                │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🔗 LinkedIn Thought Leader                                 │   │
│  │     ⭐ 4.9  •  1.2k uses  •  "Makes you sound smart"        │   │
│  │     [Add to My Skills] [Fork & Customize]                   │   │
│  │                                                              │   │
│  │  📧 Cold Email That Doesn't Suck                            │   │
│  │     ⭐ 4.7  •  890 uses  •  "Finally, emails people read"   │   │
│  │     [Add to My Skills] [Fork & Customize]                   │   │
│  │                                                              │   │
│  │  📊 Case Study Framework                                    │   │
│  │     ⭐ 4.8  •  650 uses  •  "Client stories that convert"   │   │
│  │     [Add to My Skills] [Fork & Customize]                   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  SHARED STYLES (3)                                                 │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ✨ Warm B2B          "Professional but approachable"       │   │
│  │  ✨ Data Storyteller  "Let numbers tell the story"          │   │
│  │  ✨ Friendly Expert   "Authority without arrogance"         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- Writer profile with follower count
- Shared skills with ratings/usage
- Shared styles
- Fork option for customization

---

### 8. Onboarding (Self-Destructing Wizard)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                    Welcome to Spiral                                │
│                                                                     │
│            Let's set up your writing partner                        │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                              │   │
│  │     STEP 2 OF 4: Capture Your Voice                         │   │
│  │     ━━━━━━━━━━━━━━━○─────────────                           │   │
│  │                                                              │   │
│  │     Paste 2-3 examples of your writing                      │   │
│  │     (Newsletter issues, blog posts, tweets—anything         │   │
│  │     that sounds like YOU)                                   │   │
│  │                                                              │   │
│  │     ┌───────────────────────────────────────────────────┐   │   │
│  │     │                                                   │   │   │
│  │     │  Paste your writing here...                       │   │   │
│  │     │                                                   │   │   │
│  │     └───────────────────────────────────────────────────┘   │   │
│  │                                                              │   │
│  │     Or: [Import from Substack] [Import from Medium]         │   │
│  │                                                              │   │
│  │                                                              │   │
│  │     [← Back]                                   [Next →]     │   │
│  │                                                              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│       This wizard will disappear after setup.                       │
│       You can always update your voice in Settings.                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Onboarding Flow:**
1. **What do you write?** (Newsletter, social, blog, etc.)
2. **Capture your voice** (Paste samples or import)
3. **Pick starter skills** (Thread, email, blog post)
4. **Connect sources** (Optional Doodle Reader setup)

Then: Wizard self-destructs, user lands in workspace.

---

## Key Interaction Patterns

### 1. The Transform Flow

```
Select Source → Choose Skill → (Optional) Adjust Style → Generate → Refine → Export
```

### 2. The Proactive Flow

```
New Content Detected → Notification → One-Click Generate → Review → Export
```

### 3. The Skill Creation Flow

```
Manual Task Done 3x → Pattern Detected → "Create Skill?" → Configure → Save → (Share?)
```

### 4. The Discovery Flow

```
Browse/Search → Preview Skill → Try It → Add or Fork → Customize → Use
```

---

## Mobile Considerations

- Focus on consumption and quick actions
- Proactive notifications surface on mobile
- "Review and approve" flows for auto-generated content
- Full creation/editing on desktop

---

## Design Principles

1. **Transparency**: spiral.md and skill instructions always visible/editable
2. **Progressive disclosure**: Simple by default, depth when needed
3. **Social proof**: Ratings, usage counts, "from people you follow"
4. **Proactive first**: Suggestions before requests
5. **Remix-native**: Fork, customize, and share everywhere

---

## Next Steps

- [ ] High-fidelity mockups in Figma
- [ ] Interactive prototype for key flows
- [ ] User testing with writers
- [ ] Technical architecture spec
