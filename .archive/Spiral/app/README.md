# Spiral MVP Web App (Architecture + Wireframes)

Opinionated plan to ship the Anthropic-first Spiral MVP this week. Skills (`SKILL.md`) stay canonical on disk; Convex holds lightweight state/metrics; Anthropic powers wizard + runs. No auth; single-tenant demo seeded with example skills and sources. Social layer deferred (wireframe only).

## Goals for this sprint
- Live workflow: wizard Q/A → voice capture → run a skill → preview → quick regen/edits.
- Proactive suggestions: detect new sources + repeated patterns → propose transforms/skill creation.
- Skills as protocol: read/write `SKILL.md`, inline editor, usage stats, “create from pattern” templating.
- Continuous learning: capture edits/deltas + short “what changed” note → update voice + skill notes.
- Deploy to Railway; Convex for state/logs; Anthropic API for intelligence.

## Stack (opinionated defaults)
- Frontend: Next.js + TypeScript + Tailwind (or shadcn primitives) themed with Spiral tokens (Louize/SF Pro, #FE7F02).
- Backend: Next.js API routes (or Express) for file I/O + LLM calls; Convex for state/logs/recs; file system for skills/voice/profile.
- LLM: Anthropic Claude primary; Gemini assist optional later (embeddings/alt rephrase); keep abstraction thin.
- State: Convex tables for `runs`, `usage`, `sources`, `suggestions`, `profiles` (metadata). Filesystem for `skills/` and `profiles/voice.md`.
- Hosting: Railway (web + Convex). Single demo workspace; no auth.

## Data & file layout (proposed)
```
Spiral/app/
  skills/
    thread-maker/SKILL.md
    newsletter-hook/SKILL.md
  profiles/
    voice.md                # rolling voice traits + edit notes
  sessions/
    <id>.json               # per-run inputs/outputs/edits (optional if stored in Convex)
  public/                   # assets
  src/
    app/                    # Next routes
    components/             # UI
    lib/                    # skill loader, LLM client, proactive rules
```

## API surface (server)
- `GET /api/skills` → list skills (from filesystem) + usage counts (Convex).
- `GET /api/skills/:slug` → read `SKILL.md`.
- `POST /api/skills/:slug` → save `SKILL.md` (update timestamp; increment version).
- `POST /api/run` → `{skillSlug, source, context, voiceProfile, edits?}` → calls Anthropic with system prompt assembled from skill + voice + notes; returns draft + trace id.
- `POST /api/wizard` → streaming Anthropic chat for AskUserQuestion pattern; updates voice profile incrementally.
- `GET /api/suggestions` → proactive items (new sources + pattern detection).
- `POST /api/sources` → ingest pasted text or URL (mock RSS/Doodle Reader stub).
- `POST /api/edits` → log user edit deltas + “what changed” note; append to `profiles/voice.md`.

## Skills protocol (MVP handling)
- Canonical: `skills/<slug>/SKILL.md` as plaintext. Keep format aligned with Skill Stack (inputs, outputs, steps, examples).
- Loader: read/parse frontmatter (if present) for metadata (title, description, inputs, outputs, tags).
- Editor: inline markdown editor in-app; save writes file and updates Convex `usage`/`updatedAt`.
- Creation from pattern: rule-based template (e.g., detect 3x “Podcast → Thread” runs → scaffold new `SKILL.md` with example prompt).

## Proactive suggestions (rule-based v1)
- New source detected (pasted or mocked RSS): map source type → recommended skills (e.g., podcast → thread/show-notes).
- Frequency rule: if `runs` for a skill ≥3 in 72h → suggest “save/fork/create skill.”
- Recency rule: suggest “continue from last draft” if last run <48h.
- Edits rule: if repeated edit pattern detected (“make hook punchier”), propose adding guidance to the skill; prompt user to accept → append to `SKILL.md` notes block.

## Continuous learning loop
- After each run, ask: “What did you change and why?” → store short bullet in `profiles/voice.md`.
- Capture diff of user edits vs model draft (client-side diff) → send summary to server; optionally roll into next system prompt.
- Voice profile update: append traits (tone, cadence, forbidden phrases) learned from wizard turns + edit notes.

## LLM prompting (sketch)
- System prompt = `Skill instruction + Voice profile + Forbidden patterns + SUCKS/4S guardrails + format expectations`.
- Messages = wizard transcript (substance extraction) + source content + prior edit notes.
- Temperature low; keep deterministic for demo. Stream responses to preview.

## Wireframes (ASCII)

### Main Workspace (three-pane with proactive bar)
```
┌──────────────────────────────────────────────────────────────┐
│ 🔔 Proactive: Ep47 synced 2h ago → [Thread] [Newsletter]      │
│ 💡 Pattern: Ran Thread Maker 3× this week → [Create Skill]    │
├───────────────┬───────────────────────────┬──────────────────┤
│ Context       │ Wizard / Chat             │ Preview           │
│───────────────│───────────────────────────│──────────────────│
│ spiral.md     │ You: Turn this transcript │ FORMAT: Thread    │
│ Voice profile │ into a 7-post thread.     │ LENGTH: ~280 ea   │
│ Sources       │                           │ ┌──────────────┐  │
│  • Ep47 (new) │ Spiral: AskUserQuestion…  │ │1/7 Hook...   │  │
│  • Ep46       │ [DRAFT STREAMS HERE]      │ │2/7 Point...  │  │
│ Skills        │ You: Make hook punchier.  │ │...           │  │
│  • Thread Mk  │ Spiral: Revised draft…    │ └──────────────┘  │
│  • Email      │ [Input box...] [→ Run]    │ [Copy] [Export]   │
└───────────────┴───────────────────────────┴──────────────────┘
```

### Skills Library (inline editor)
```
┌──────────────────────────────────────────────┐
│ Skills    [+ New from Pattern]               │
├──────────────────────────────────────────────┤
│ 🧵 Thread Maker   Used 12x   [Edit] [Run]    │
│ 📧 Newsletter     Used 6x    [Edit] [Run]    │
│ ...                                         │
├──────────────────────────────────────────────┤
│ [Editor: SKILL.md markdown]                  │
│ ---                                          │
│ title: Thread Maker                          │
│ description: Long → X thread…                │
│ inputs: transcript                           │
│ outputs: thread (7-12 posts)                 │
│ steps: …                                     │
│ ---                                          │
│ [Save] [Test] [Fork]                         │
└──────────────────────────────────────────────┘
```

### Social/Discover (deferred; static card)
```
┌──────────────────────────────────────────────┐
│ Discover (coming soon)                       │
│ - Skills from people you follow              │
│ - Suggested for you                          │
│ - Fork/remix flows                           │
└──────────────────────────────────────────────┘
```

## Deployment notes
- Env vars: `ANTHROPIC_API_KEY`, `CONVEX_DEPLOY_KEY`, `APP_BASE_URL`, `SKILLS_DIR=./skills`, `VOICE_PROFILE=./profiles/voice.md`.
- Railway: build Next.js; bind Convex; mount persistent volume for `skills/` if possible (or bake sample skills into repo).
- Seed data: include two sample skills (Thread Maker, Newsletter Hook), one sample source (podcast transcript), and an Every-esque voice profile snippet.

## References pulled locally
- Every style guide: `profiles/every-style-editor.md`
- Compound engineering principles: `profiles/compound-engineering.md`

## Next steps (execution)
1) Init Next.js + Tailwind; set up theme tokens.  
2) Implement skill loader/saver + API routes; seed sample skills.  
3) Implement wizard + run endpoints with Anthropic; stream to client.  
4) Wire Convex tables for runs/usage/suggestions; add proactive bar UI.  
5) Add edit-diff capture + voice profile appends.  
6) Deploy to Railway; validate end-to-end with seeded data.  
