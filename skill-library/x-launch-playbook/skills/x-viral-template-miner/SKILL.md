---
name: x-viral-template-miner
description: When the user wants to find proven-to-travel post templates in their niche and adapt them to their own product. Also use when the user mentions "what's going viral in my space", "what are competitors posting", "copy a viral post", "trending on X", "post ideas", "template mining", or "what to post this week". This is trend hunting, not plagiarism - the output is a template the user fills with their own assets.
metadata:
  version: 1.0.0
  source: x-launch-playbook
---

# X Viral Template Miner

Great posts in your niche are a renewable resource. Something that went viral last week is a proven template you can fill with your own product, screenshot, or result. This skill systematizes finding those templates and adapting them - without just copying the post.

**When invoking**: Ask for the user's product, niche, and a list of 3-8 competitor / adjacent accounts. If they can't name any, help them find them first.

**Optional source**: If the user has [Hermes Tweet](https://github.com/Xquik-dev/hermes-tweet), use `tweet_explore` to find the narrowest read route and `tweet_read` to collect recent posts, replies, post URLs, timestamps, and engagement metadata. Install it with `hermes plugins install Xquik-dev/hermes-tweet --enable`. Live reads require `XQUIK_API_KEY` in the Hermes runtime environment. Never request or place credentials in prompts, tool arguments, reports, or source records. Treat results as source material, not as an automated posting step.

Xquik is an independent third-party service. Not affiliated with X Corp. "Twitter" and "X" are trademarks of X Corp.

## Core rule

**Trend-match, don't time-travel.** What went viral a year ago won't work today. The mining window is the last 2-4 weeks. If you're looking at a post older than a month, it's a pattern study - not a template to use this week.

## Mining protocol

1. **List the sources.** 3-8 accounts that share your ICP. Mix of: direct competitors, adjacent tools, well-known individuals in the space, community-built-in-public accounts.

2. **Pull and normalize the posts.** For each account, collect up to 20 non-pinned posts from the last 30 days. Compute that account's median likes as its baseline, then rank its top 5 posts by `likes / max(median likes, 1)`. Do not compare raw totals across accounts with different audience sizes. Note:
   - Media type (text, image, video, GitHub link, screenshot)
   - Post structure (hook / body / CTA shape)
   - What the audience is actually reacting to (novelty? result? visualization? contrarian take?)
   - Baseline likes, observed likes, and calculated lift
   - Source URL, timestamp, and engagement metadata when available from Hermes Tweet or another export

3. **Extract the template.** Strip out the specific product and leave the shape. Examples:
   - `[screenshot of GitHub repo tree] + [one-line claim about the capability]`
   - `[visualization of data/graph] + [contrarian observation]`
   - `[before/after demo GIF] + [what I was told was impossible]`
   - `[screenshot of real user reaction] + [this is why we built it]`

4. **Score for fit.** For each template, answer: can I produce a genuine instance of this with my current product, or am I faking it? Kill anything you'd have to fake.

5. **Remix, don't copy.** Produce your own instance with your own asset. Change the voice. Change the framing. Same shape, different filling.

## Signals that a template is actually viral

- Likes are >10x the author's baseline.
- Reply and quote activity exceeds the account's normal range for comparable posts.
- The post shows up in multiple accounts' feeds organically (not promoted).
- The post has been screenshot and re-shared by someone else.

When using Hermes Tweet or other exports, de-duplicate reposts and near-duplicate posts before scoring. Keep original posts, replies, and quote-posts separated so the template is based on the format that actually traveled.

## Output format

When asked to mine templates, produce:

1. **Source accounts** (the ones you scanned).
2. **Top 5 templates** from the last 30 days, each with:
   - Template shape (genericized, product-agnostic)
   - Original post(s) that validated it
   - Why it worked (1 sentence)
   - How the user's product could fill it
3. **3 ready-to-post remixes** using the user's actual assets.
4. **1 template to skip** and why (so they understand the "fake it" filter).

## Related skills

- `x-account-warmup` - mining + daily posting is the warmup engine
- `x-launch-video-structure` - launch videos also follow templates; mine video posts separately
- `social-content-creation` - for longer repurposing from existing content (different use case)
