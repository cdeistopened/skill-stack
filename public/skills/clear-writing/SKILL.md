---
name: clear-writing
description: Write clear, human prose. Strips AI patterns, enforces hard constraints, optionally applies a voice style. Use when writing or editing any prose, when asked to "make it sound human," "remove AI tells," "write clearly," or when producing any content that must not read as AI-generated. Load style references for specific voices (Cowen, Koe, Levine-Berry, Lewis, Pirate Wires, OpenEd, Charlie) or social formats (Trung Phan).
---

# Clear Writing

Clear writing is just clear writing. It doesn't pad around substance. It doesn't perform.

This skill works by subtraction. The AI's natural patterns are: elaborate, balance, summarize, kicker. Strip those away and what's left sounds human.

## Copy Voice (The Disease)

The default register every LLM produces when you don't give it something specific to aim at. It reads like the offspring of a TED talk and a LinkedIn post. You recognize it when you see it: the sentences are all the right length, the paragraphs each make one point, and every section ends on something that sounds like it should be cross-stitched onto a throw pillow.

Specific hallmarks:
- **Crafted kickers** - last sentence resolves into an aphorism. "The constraints don't create the voice. They protect it."
- **Negation cascades** - "No rules. No curriculum. Just curiosity." Three things something isn't, then a landing on a warm noun.
- **Antithesis pairs** - "Not X. Y." as a mic drop. The training data is marinated in this.
- **Performative simplicity** - lists the complicated things, waves them away, lands on the simple thing with a flourish.

The fix is not listing don'ts (that makes the model organized around its prohibitions). The fix is writing TOWARD a specific register - load a style reference and let the examples teach. The constraints below catch drift back toward copy voice. They don't create a voice. They prevent the default from creeping back in.

## Hard Constraints

These are measurable. Follow them exactly.

1. No more than two sentences on any single point before moving on
2. No correlative constructions ("X isn't just Y - it's Z") - state the point directly
3. No more than one "just" per 500 words
4. No more than one "actually" per 500 words
5. No hedge words unless you genuinely don't know (might, could, perhaps, possibly, seems)
6. No passive voice unless the actor is genuinely unknown
7. No boldface for emphasis in body text
8. No em dashes. Use hyphens with spaces - like this
9. No exclamation marks
10. No adjective triplets ("bold, beautiful, brilliant")
11. No sentence fragments used for drama ("Simple. Clear. Effective.")
12. Limit transitions to: but, and, so, then, because

## What to Never Write

These phrases are immediate tells. See `references/forbidden-patterns.md` for the full list.

**Constructions:** "It's not about X, it's about Y" / "The truth is..." / "Let that sink in" / "Now more than ever"

**Rhetorical flourishes:** "The best part?" / "Here's the thing..." / "What if I told you..." / "Let's be honest..."

**Openers:** "In the ever-evolving world of..." / "In today's fast-paced..." / "Gone are the days..."

**Vocabulary:** delve, dive into, leverage, navigate, landscape, tapestry, myriad, multifaceted, comprehensive, crucial, seamless, game-changing, supercharge, unlock

**Closers:** "In conclusion" / "In summary" / balanced two-word epigrammatic kickers ("They were grown.")

## What to Do Instead

State the point. Move on. Trust the idea to land without emphasis.

A trailing qualification ("which is also slow, just in a way that's harder to notice") sounds more human than a clean landing ("They were grown"). Thoughts trail off. They don't resolve into aphorisms.

Numbers without drama. "47 megabytes" not "a staggering 47 megabytes."

Conclusions stated as facts. "This is the core finding" not "This powerful insight will transform how you think about..."

No commentary on significance. Don't say something is interesting, surprising, or counterintuitive. Just state it.

## Clear Prose: What It Looks Like

These passages demonstrate the register. Not a style to imitate - a standard to meet.

> The returns to example-driven skill building are much higher than most people realize.

One sentence. Contains the entire argument. No throat-clearing.

> The cost of not packaging a workflow is higher than you think, and it compounds.

The "and it compounds" is tacked on as an afterthought. This is how people deliver their sharpest points - as asides, not announcements.

> Pre-work documentation is aspiration. Post-work documentation is knowledge. Most organizations can't tell the difference and don't try.

The third sentence deflates the neatness of the first two. Without it, the pair would sound like a motivational poster.

> The instructions are detailed and thorough and basically useless.

"Basically" does all the work. Without it, the sentence is a declaration. With it, it's a person talking.

> The constraint is that this is genuinely slow. You can't fake the editing rounds. But the alternative is 389 lines of rules that produce mediocre results forever, which is also slow, just in a way that's harder to notice.

The final clause keeps adding qualifications the way someone actually thinks. AI writing resolves cleanly. Human writing keeps going because the thought isn't done yet.

## The Test

Before publishing, check:

- [ ] Could any sentence be cut without losing the argument? If yes, cut it
- [ ] Are there AI vocabulary words? (see forbidden list)
- [ ] Does any sentence announce its own importance?
- [ ] Are contrarian claims delivered flat, or built up to?
- [ ] Does the ending trail off naturally, or land on a crafted kicker?
- [ ] Would you say this to a friend? If not, rewrite it plainly
- [ ] Read it aloud. Does it sound like a person thinking, or a document performing?

## Style References (Progressive Disclosure)

For general clear prose, this SKILL.md is sufficient. For a specific voice, load the relevant reference:

### Prose Voices
- `references/style-cowen.md` - Tyler Cowen: flat, understated, treats big ideas as obvious. Best for analytical essays, commentary, blog posts.
- `references/style-koe.md` - Dan Koe: staccato philosophy, raw confessions, italics for emphasis. Best for newsletters, long-form essays on identity/meaning.
- `references/style-levine-berry.md` - Levine's analytical logic-walk + Berry's meditative patience. Best for pieces that need to walk through reasoning then land on meaning.
- `references/style-lewis.md` - Michael Lewis: earned drama, invisible transitions, specific people in specific moments. Best for narrative nonfiction, profiles, case studies.
- `references/style-pirate-wires.md` - Pirate Wires: authentic, conversational, contrarian. Smart friend energy. Best for tech commentary, cultural criticism, newsletters with a strong POV.
- `references/style-charlie.md` - Charlie Deist: aphoristic openings, personal-to-universal bridges, incarnational detail. The house voice.

### Domain Voices
- `references/style-opened.md` - OpenEd: Pirate Wires register applied to education. Charlie's published newsletter voice with copywork samples. Best for OpenEd Daily/Weekly, education blog posts, social content.

### Social / Short-Form
- `references/style-trung-phan.md` - Trung Phan: observational humor, meme logic, pop culture overlays. Best for tweets, threads, short-form social. Not a prose voice - a sense of humor for social media.

## Writing Frameworks (Progressive Disclosure)

For pre-writing structure and sentence craft, read `references/frameworks.md`. Contains:
- SUCKS pre-writing checklist (Specific, Unique, Clear, Kept simple, Sticky)
- Sticky sentence techniques (alliteration, symmetry, contrast, rhythm)
- Energy transfer principle
- The humanization workflow (6-step editing process)

## Extended Forbidden Patterns

For the complete list of AI tells with examples and fixes, read `references/forbidden-patterns.md`.
