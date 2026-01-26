# SKILL STACK PODCAST - EPISODE SHOW NOTES

## Episode: "I Tested Google Gems vs Claude Skills (Here's What Won)"
**Guest:** Lewis Kallow
**Date:** [TBD]
**Duration:** Target 45-60 min

---

## Cold Open Script (The Contrarian Hook)

> **CHARLIE (VO):**
> "Everything you've been taught about AI prompting is backwards.
>
> The longer your prompt, the worse your output.
>
> Lewis Kallow figured this out the hard way. He spent weeks crafting detailed instructions, perfecting templates, obsessing over phrasing. His prompts doubled in length. His productivity stayed flat.
>
> Then he tried something different. He stopped describing what he wanted—and started showing it.
>
> One tweet using this method got 200,000 impressions.
>
> Today, Lewis is going to show you exactly how he did it. 
>
> If you've been intimidated by AI tools, this is for you."

---

## Guest Bio

**Lewis Kallow** is a writer, iOS developer, and ghostwriter for startup founders.

**Publications:**
- [The Action Digest](https://www.actiondigest.com/) - Weekly insights and hacks for making ideas happen
- [Super Self](https://superself.substack.com/) - Science-backed personal development (1K+ subscribers)

**Every.to Contributor:**
- ["AI Can Build Anything. Social Dandelions Decide What Spreads"](https://every.to/p/ai-can-build-anything-social-dandelions-decide-what-spreads) (Jan 2026)
- ["How I Prompted My Way to Publish-ready Content"](https://every.to/p/how-i-prompted-my-way-to-publish-ready-content) (Mar 2025)

**Background:**
- Helped build Every's Spiral (AI content workflows)
- Created the "contrarian" tweet generator - Spiral's most popular tool
- Currently building a consumer AI product

**Connect:** [@KallowLewis](https://x.com/KallowLewis) on X

---

## Episode Structure

### ACT 1: The Problem (0:00 - 12:00)

**Topics:**
- Lewis's journey from detailed prompts to few-shot examples
- The "overdetermined prompt" problem (from DMs: "the longer and more detailed the document gets, the worse the outputs become")
- The George Lucas analogy: showing 4 films instead of describing Star Wars
- The subtractive study Lewis referenced: [People systematically overlook subtractive changes](https://www.nature.com/articles/s41586-021-03380-y) (Nature, 2021)

**Key question:**
> "You wrote that the longer your prompts got, the worse your outputs became. Walk me through that realization."

### ACT 2: The Method - Few-Shot Prompting (12:00 - 25:00)

**Topics:**
- Few-shot prompting explained: examples > descriptions
- Building an example library (what Lewis calls his "curated frameworks")
- The 200K impression tweet for Dan Shipper - how it actually worked
- How this connects to ghostwriting: you're encoding someone's voice through samples, not descriptions

**Key questions:**
> "You mentioned you have a library of curated frameworks. What's actually in there?"
>
> "When you ghostwrite for startup founders, how do you capture their voice? Is it the same principle?"

**DM context to weave in:**
- Charlie's content frameworks spreadsheet
- The "lazy scattershot approach" - throwing things at the wall and iterating quickly

### ACT 3: Gems vs Skills - The Comparison (25:00 - 35:00)

**Topics:**
- **Google Gems:** Backend prompt, recurring context, editable, brings in your history
- **Claude Skills:** Modular markdown files, version-controlled, portable, composable
- The key difference: Skills are files you own. Gems are trapped in Google's UI.
- Skills can call other skills. They can include reference folders. They're programmable.

**Visual demo idea:**
- Split screen: Show a Gem in action vs a Skill in action
- Same task, different approaches

**Key questions:**
> "You've used Gems. What do they do well?"
>
> "When did you hit the ceiling with Gems?"

### ACT 4: Live Walkthrough - Anyone Can Claude Code (35:00 - 50:00)

**The demo:**
1. Lewis clones [anyone-can-claude-code](https://github.com/cdeistopened/anyone-can-claude-code)
2. Opens in Cursor
3. Claude interviews him (7 questions)
4. Together they build a skill based on his example library concept

**What we're building:**
Turn Lewis's "narrative snippets" / example library approach into a portable skill.

**The skill structure:**
```
.claude/skills/few-shot-library/
├── SKILL.md           # Instructions for using the library
├── examples/
│   ├── tweets/        # Tweet examples by tone/style
│   ├── essays/        # Essay samples
│   └── emails/        # Email templates
└── style-notes.md     # What patterns to extract from examples
```

**Key moment to capture:**
The "aha" when Lewis realizes skills are just markdown files he controls.

### ACT 5: The Bigger Picture (50:00 - 60:00)

**Topics:**
- Social dandelions concept: Who spreads ideas through networks?
- Lewis encouraged Charlie to start a YouTube channel - why?
- The people discovering Claude + Markdown files for content creation
- What's next for both of them

**Key questions:**
> "You wrote about 'social dandelions' - people with maximal network presence who seed ideas. How do you think about that for your own work?"
>
> "A few weeks ago you encouraged me to start a YouTube channel teaching this stuff. What did you see?"

---

## Discussion Questions (Full List)

### On Prompting
1. Walk me through the moment you realized longer prompts weren't better.
2. What's actually in your example library?
3. How do you decide which examples to include vs. exclude?
4. The George Lucas method - showing instead of telling. How do you apply that practically?

### On Ghostwriting
5. When you ghostwrite, how do you capture someone's voice?
6. What's the difference between good AI-assisted ghostwriting and bad?
7. How do you ensure the output sounds human?

### On Gems vs Skills
8. What do Google Gems do well?
9. When did you hit the ceiling?
10. What changes when your prompts become files you own?

### On The Future
11. You wrote about social dandelions - who spreads ideas. How do you think about your own distribution?
12. What's the skill you wish existed?
13. What are you building next?

---

## Resources & Links

### Lewis's Work
- [The Action Digest](https://www.actiondigest.com/) - Weekly newsletter
- [Super Self](https://superself.substack.com/) - Science-backed personal development
- [Every.to - Dandelions article](https://every.to/p/ai-can-build-anything-social-dandelions-decide-what-spreads)
- [Every.to - Prompting article](https://every.to/p/how-i-prompted-my-way-to-publish-ready-content)
- [@KallowLewis on X](https://x.com/KallowLewis)

### Referenced in Episode
- [Nature study: People overlook subtractive changes](https://www.nature.com/articles/s41586-021-03380-y)
- [Anyone Can Claude Code](https://github.com/cdeistopened/anyone-can-claude-code) - The onboarding repo
- [Cursor](https://cursor.com) - Free VS Code fork with AI
- [Claude Code extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)

### Skill Stack
- [skillstack.md](https://skillstack.md) - The blog

---

## Narrative Snippets to Skill Conversion

Based on Lewis's Every.to article, his method is:

**His current approach:**
1. Collect exemplary content for specific formats
2. Store in organized system (likely Spiral or similar)
3. Feed examples to AI when creating new content
4. Auto-generate style guides from examples

**What we're converting to a Claude Skill:**

```markdown
# Few-Shot Library Skill

## Purpose
Generate content that matches specific styles by referencing curated examples rather than describing desired characteristics.

## How to Use

1. **Add examples** to the `examples/` folder organized by content type
2. **Reference examples** when asking Claude to create new content
3. **Extract patterns** - Claude analyzes examples and notes what makes them work

## Folder Structure

examples/
├── tweets/
│   ├── contrarian/      # Counterintuitive takes
│   ├── thread-openers/  # Hook tweets
│   └── insights/        # Single-point observations
├── essays/
│   ├── every-style/     # Publication-specific
│   └── personal/        # Your voice
└── emails/
    ├── cold-outreach/
    └── follow-ups/

## The Method

Instead of: "Write a tweet that's contrarian but not edgy, insightful but accessible..."

Do this: "Write a tweet in the style of these examples: [reference examples/tweets/contrarian/]"

## Pattern Notes

[Claude fills this in after analyzing your examples]

- Sentence length patterns:
- Opening moves:
- What you never do:
- Signature phrases:
```

---

## Production Notes

### What Would Make This Episode Pop

| Element | How to Execute |
|---------|----------------|
| **Live demo stakes** | Real friction = real content. Let mistakes happen. |
| **Split screen comparison** | Gems workflow vs Skills workflow side-by-side |
| **The "aha" capture** | Lewis realizing skills are just markdown he owns |
| **Actionable takeaway** | Link to Anyone Can Claude Code repo in description |
| **Social dandelions callback** | "You're a dandelion, Lewis. You seed ideas." |

### B-Roll / Visuals Needed
- Screen recording: Spiral/Gems interface
- Screen recording: Cursor + Claude Code setup
- The 7-question interview flow
- Building the skill folder structure live

### Thumbnail Options
Based on Title #1: "I Tested Google Gems vs Claude Skills"

1. **Split face** - Lewis + Charlie, divided down middle, "NOT EVEN CLOSE" text
2. **Tool logos** - Google Gems logo vs Claude logo, boxing gloves
3. **Reaction shot** - Lewis looking surprised, "This changes everything"

---

## DM History Context

From March 2025:

> **Charlie:** "I often find that the longer and more detailed the documents gets, the worse the outputs become - because it starts to get overdetermined. The model is trying to do too many things simultaneously so you get a weird amalgam."

> **Lewis:** "That section is where the editors had to reign me in because I went off on a tangent about examples like the iPhone (deleted the physical keyboard) and referenced this study..."

> **Charlie:** [Shares content frameworks spreadsheet]

> **Lewis:** "Oh this is awesome! Is it just frameworks or do you have prompts you use saved in there too? Sounds like Every might benefit from hitting *you* up to do a piece on prompting!"

**Use this:** The episode is a continuation of a conversation that started 10 months ago. You've both been working on this independently and now you're comparing notes.

---

## Title & Thumbnail Options

### Top 3 Titles

**#1: "I Tested Google Gems vs Claude Skills (Here's What Won)"**
- Framework: I tested X vs Y (Hook Score: 26,000)
- Principles: Curiosity, Specificity, Experiment/Authority
- Predicted CTR: 7-9%

**#2: "How to Use AI Without Sounding Like AI"**
- Framework: How To X Without Y (Hook Score: 11,492)
- Principles: Desire, Refute Objection, Fear
- Predicted CTR: 6-8%

**#3: "George Lucas Taught Me How to Prompt AI"**
- Framework: Custom - Authority + Curiosity
- Principles: Curiosity, Authority, Contrast
- Predicted CTR: 5-7%

### Thumbnail Strategy

**For Title #1:**
- Visual: Split screen - Google Gems logo vs Claude logo
- Text: "WINNER?" or "Not even close"
- Complementarity: Title promises comparison, thumbnail teases verdict

---

## Why This Episode Works

**For your channel:**
- First guest episode establishes interview format
- Lewis has audience (Every.to readers, newsletter subscribers)
- Topic is searchable: "Claude Skills" "Google Gems" "AI prompting"
- Live demo creates genuine content (not scripted)

**For Lewis:**
- Exposure to your audience
- Gets set up with Claude Code (genuinely useful)
- Content he can repurpose for his newsletters

**For viewers:**
- Practical walkthrough they can follow
- Real comparison of two tools
- Source material (the repo) they can use immediately

---

*Last updated: 2026-01-22*
