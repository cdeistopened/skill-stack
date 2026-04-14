---
name: x-account-warmup
description: When a user wants to grow an X (Twitter) account from zero before a product launch, or asks how to get first followers, warm up the algorithm, hit ~500-1,000 followers, or prepare an account to make a launch video land. Also use when the user mentions "new X account", "warm up my Twitter", "first 1000 followers", "building in public strategy", "X growth", or "engagement before launch".
metadata:
  version: 1.0.0
  source: x-launch-playbook
---

# X Account Warmup

An X account with fewer than ~500-1,000 followers cannot launch virally. The algorithm doesn't have enough signal to decide whether your post is worth amplifying, so even great launch videos die. This skill runs the warmup protocol before you try to launch.

**When invoking**: Ask for the user's product, ICP, current follower count, and how far they are from launch. Then produce a warmup plan.

## Threshold

| Followers | What's possible |
|---|---|
| < 500 | Account is cold. Launches will not ignite. Focus entirely on warmup. |
| 500 - 1,000 | Viable. Launch can land if content is strong. |
| 1,000+ | Healthy baseline. Proceed to launch playbook. |

Expect the warmup phase to take weeks to months of daily posting, not days. One source case took nine months before a single post broke out and added +2,000 followers.

## Four warmup levers

1. **Tag communities.** When posting on X, attach the tweet to the community that matches your ICP (e.g. "Build in Public", your vertical's dev community). Treat X communities like subreddits — the community feed shows your post to people who did not follow you yet. Find the community whose members match your ICP and post into it.

2. **Tag famous accounts.** Include an @mention of a well-known account relevant to the post (founder, investor, tool, public figure). If they retweet or reply, their followers flow into your impressions. Works best when you have a visual (screenshot, image, demo clip) to make the tag feel like a reference, not a plea.

3. **Post daily, with no shame.** Daily posting is what builds the algorithmic signal and the parasocial trust. Categories that work: research notes ("I'm reading X, here's what's interesting"), one-liner motivational posts aimed squarely at your ICP, behind-the-scenes screenshots, success moments (first check, first customer, first contract).

4. **Share proof-of-work artifacts.** GitHub repos, visualizations, benchmarks, diagrams. On X the audience is heavily developer-leaning — they'll click an open-source link out of curiosity when they won't click a marketing post.

## Content mix during warmup

| Type | Frequency | Purpose |
|---|---|---|
| Research/insight posts | Daily | Position as credible in your domain |
| Motivational one-liner aimed at ICP | 2-4x/week | Build parasocial trust with target customer |
| Success screenshots | Whenever real (first check, first customer, milestone) | Social proof + people root for you |
| Build-in-public update | 1-2x/week | Shows momentum, invites engagement |
| Competitor template remix | 1-2x/week | See `x-viral-template-miner` |

## ICP-to-channel check

Before running warmup, confirm X is even the right channel:

- **Tech / developer / AI / crypto ICP** → X is primary. Run full warmup.
- **Event marketers, HR, healthcare ops, non-tech B2B** → X is secondary. Spend at most 20% of effort here. Route the main play to LinkedIn and use `x-linkedin-content-relay` for amplification.

## Output format

When asked to generate a warmup plan, produce:

1. **Current state**: follower count, ICP, gap to launch threshold.
2. **Channel recommendation**: primary + secondary, based on ICP.
3. **Community list**: 3-5 X communities the user should post into.
4. **Tag list**: 5-10 well-known accounts worth referencing in posts (not spam — only when genuinely relevant).
5. **Daily post menu**: 7-day rotation covering the content mix above, with example first lines.
6. **Timeline estimate**: weeks-to-threshold based on starting point and posting cadence.

## Related skills

- `x-viral-template-miner` — what to post during warmup
- `x-launch-video-structure` — what to do once warmup is done
- `x-linkedin-content-relay` — parallel channel for non-tech ICPs
- `twitter-x-posts` (marketing-skills) — post copy formatting and character limits
