---
name: x-launch-video-structure
description: When the user is planning, scripting, or editing a product launch video for X (Twitter) and needs the structure. Also use when the user mentions "launch video", "demo video", "product launch on X", "60 second demo", "how to structure a launch", or "my launch video isn't working". Produces a beat-by-beat timing sheet, not copy.
metadata:
  version: 1.0.0
  source: x-launch-playbook
---

# X Launch Video Structure

A launch video for X is not a walkthrough. It's a 60-second unit of attention with five hard beats, and if you miss any of them the post dies before it propagates. This skill gives you the beat sheet.

**When invoking**: Ask for the product name, the one pipeline (not one feature — one pipeline) the video will show, and the ICP. Then produce the beat sheet.

## The iron rules

1. **Under 60 seconds, always.** Over 60s and you lose viewers raised on 15-second Reels. No exceptions for "our product is complicated."
2. **One pipeline, not one feature.** Pick one end-to-end user pipeline (e.g. "agent researches a lead, writes an email, posts a Slack recap"). Not "you can upload a PDF." The pipeline is a story; the feature is a spec sheet.
3. **Show, don't explain.** Every second of voiceover competes with a second of product on screen. The product must be visible within the first 5 seconds.

## The 5-beat structure

| Beat | Time | What | Failure mode |
|---|---|---|---|
| **1. Hook** | 0:00 - 0:01 | A 3-5 word phrase that captures the product's essence. Visually distinct — a face, a logo, a single on-screen word. See `launch-video-hook-generator`. | Hook is a logo card with no human / no text / no motion. Dead on arrival. |
| **2. One-liner** | 0:01 - 0:05 | One sentence stating what the product is. Framed as a claim, not a description. ("You can now give OpenClaude a brain." "Momo is a CRM for AI agents.") | Sentence is a feature list with commas. |
| **3. Problem / ICP story beat** | 0:05 - 0:15 | 10 seconds max. Show (don't tell) the ICP's problem. If you narrate, narrate as the ICP in first person. See `icp-roleplay-demo-script`. | Explaining the problem in third person. "Many founders struggle to..." — skip. |
| **4. Pipeline demo** | 0:15 - 0:50 | 35 seconds of actual product use. Show the pipeline from trigger to outcome. Cut aggressively — every shot should advance the pipeline. No UI tour. | Feature tour, menu clicks, tab switches. |
| **5. Outcome + CTA** | 0:50 - 0:60 | Show the result. End card with domain name or @handle so people can find you when they pause. | Fading to black with a "thanks for watching." |

## Script compression

Write a full script first. Then cut it in half. Then cut it again.

- Default prose has ~60% filler. Your audience hears all of it.
- Kill every word that isn't load-bearing. "Actually," "basically," "so," "I think," "you know" — all out.
- Rule of thumb: the speakable script for a 60-second video is ~130-150 words max.
- **Do not use a general LLM to write the final script.** LLMs re-introduce filler ("Let's dive into," "In today's video," "As you can see"). Use one to brainstorm structure, then rewrite the final script by hand.

## Production notes

- Voice should be yours, not a studio read. X rewards founder voice.
- First second needs motion. A static frame with a logo will be scrolled past.
- Captions on (default). Most X video plays with sound off.
- Export at 1080×1920 (vertical) for phone-first viewing, or 1080×1080 square. Not 16:9 landscape.

## Output format

When asked to structure a launch video, produce:

1. **Beat sheet** — the 5 beats with exact timings and what happens in each.
2. **Speakable script** — final, compressed, ≤150 words.
3. **On-screen text list** — every word the viewer will see overlaid.
4. **Shot list** — each cut in the pipeline demo beat, ~6-10 shots.
5. **End-card copy** — domain, handle, one-line CTA.
6. **What to cut** — 2-3 things the user probably wants to include that are hurting the video.

## Related skills

- `launch-video-hook-generator` — produces beat 1
- `icp-roleplay-demo-script` — produces beats 3-4 as a story
- `x-viral-template-miner` — find current-month video templates before scripting
- `hook-and-headline-writing` — for non-video hook work
