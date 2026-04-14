---
name: launch-video-hook-generator
description: When the user needs a 3-5 word opening hook for a product launch video — the first second of on-screen text or voice that stops the scroll. Also use when the user mentions "hook for my video", "first second", "opening line", "tagline", "one-liner for launch", or "catchphrase". Produces 10+ hook candidates, not one answer.
metadata:
  version: 1.0.0
  source: x-launch-playbook
---

# Launch Video Hook Generator

The first second of a launch video is a single job: stop the scroll. It's almost always a 3-5 word phrase that captures the product's essence in claim form. This skill generates those phrases in volume.

**When invoking**: Ask for the product name, the one-line description the user currently uses, and the ICP. Then produce 10+ hook candidates plus commentary.

## What a good hook looks like

- **Length**: 3-5 words, max 7.
- **Form**: Claim, not description. "Momo is a CRM for AI agents" works. "Introducing Momo, a CRM for AI agents" doesn't.
- **Noun or capability**: Names the thing or the new power, not the market.
- **Second person or imperative** when possible: "Give your AI a brain." "Ship a launch in one hour."

## Proven source examples

| Product | Hook | Why it works |
|---|---|---|
| OpenClaude (brain tool) | "You can now give OpenClaude a brain." | Capability + 2nd person + implied impossibility |
| Claude Bot for teams | "Introducing Claude Bot for teams — but better." | Reference + contrast |
| Momo CRM | "Momo, the CRM for AI agents." | Product + category + ICP in 6 words |

## Templates that generate hooks

Use these as prompts for volume. Generate 3-5 candidates per template.

1. **Capability claim** — "You can now [verb] [object]."
2. **Identity** — "[Product] is a [new category] for [ICP]."
3. **Contrast** — "[Thing everyone knows] — but [twist]."
4. **Reversal** — "Stop [common action]. Start [new action]."
5. **Named power** — "Give your [system] a [new faculty]."
6. **Question → answer** — "What if [system] could [new action]?"
7. **Declaration** — "[Product] just [action verb] [object]."

## Failure modes to reject

- Anything starting with "Introducing" when the name isn't known. Use it only for line 2.
- Feature lists with commas. "Momo does X, Y, and Z."
- Value-prop speak. "The leading platform for..."
- Hype words without object: "Revolutionary." "Game-changing." "Disruptive."
- Anything over 7 words.

## Output format

When asked to generate hooks, produce:

1. **10 candidates**, each tagged with the template that produced it and a word count.
2. **Top 3** with a one-sentence rationale each.
3. **1 contrarian pick** — the weirdest candidate that might actually work.
4. **Delivery notes** — how each top pick should be said / shown (voiceover? on-screen text? freeze-frame?).

Users are expected to produce volume and throw most away. Do not return a single "best" hook — return a menu.

## Related skills

- `x-launch-video-structure` — the hook lives in beat 1 of the 5-beat sheet
- `hook-and-headline-writing` — general hook frameworks for headlines, subject lines, post openers
- `dude-with-sign-writer` — for punchier, one-sentence contrarian takes (adjacent use case)
