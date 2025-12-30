---
name: image-prompt-generator
description: Generate AI images using Gemini image generation API. Use this skill when content needs images - thumbnails, social posts, blog headers, or creative visuals. Follows an iterative workflow - brainstorm concepts, select direction, generate in multiple styles, then produce via API.
---

# Image Prompt Generator

Generate professional, non-generic images using Google's Gemini API for image generation.

## Prerequisites & Setup

### Getting Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### Configuring the API Key

**Option 1: Environment file (recommended)**

Create a `.env` file in your project root:

```bash
GEMINI_API_KEY=your_api_key_here
```

**Option 2: Direct environment variable**

```bash
export GEMINI_API_KEY=your_api_key_here
```

### Install Dependencies

```bash
pip install google-generativeai python-dotenv pillow
```

### Available Models

| Model | API Name | Best For |
|-------|----------|----------|
| **Flash** | `gemini-2.5-flash-image` | Speed, drafts, iteration |
| **Pro** | `gemini-3-pro-image-preview` | **Final assets, 16:9 aspect ratio, quality** |

**CRITICAL**: Use `gemini-3-pro-image-preview` for:
- Thumbnails (need 16:9 aspect ratio)
- Final production images
- Any image where aspect_ratio config is needed

---

## Workflow Overview

1. **Brainstorm Concepts** - Generate 4-6 high-level visual ideas
2. **Select Direction** - User picks the concept they like
3. **Optimize Prompt** - Refine into a strong, detailed prompt
4. **Style Variations** - Adapt to 2-3 different visual styles
5. **Generate Images** - Run via Gemini API

## Step 1: Brainstorm Concepts

When the user provides a topic or use case, generate 4-6 high-level visual concepts. Each concept should be:

- **One sentence** describing the visual idea
- **Concrete and immediate** - you can picture it instantly
- **Conceptual but not abstract** - a clear object/scene with meaning
- **Non-generic** - avoid cliches (no lightbulbs for ideas, no handshakes for partnership)

**Format:**

```
1. **[Short label]** - One sentence description of the visual concept and why it works.

2. **[Short label]** - One sentence description...
```

**Example for "newsletter about personal productivity":**

```
1. **Compass with coffee stain** - A vintage compass where the needle points toward a coffee ring stain on a map, suggesting direction emerges from daily rituals.

2. **Clock face with seasons** - A clock where the 12 hours show seasonal changes, suggesting time management over long arcs, not just hours.

3. **Empty desk with shadow** - A minimalist desk in morning light, but the shadow shows a cluttered desk - the gap between intention and reality.

4. **Single key on many keychains** - One small key attached to dozens of decorative keychains, suggesting we overcomplicate simple solutions.
```

Wait for user to select before proceeding.

## Step 2: Optimize the Prompt

Once the user selects a concept, develop it into a full prompt. Structure:

```
Create a [style type] illustration of [subject].

CONCEPT: [Expand the one-sentence idea into a clear visual description]

STYLE: [Artistic approach - load from references/styles/ if brand-specific]

COMPOSITION: [Framing, focal point, negative space, balance]

COLORS: [Palette - describe by name, not hex codes which may render as text]

TEXTURE: [Surface qualities, analog/digital feel]

AVOID: [What should NOT appear - be specific]

FORMAT: [Aspect ratio]
```

**Key principles:**
- Natural language, full sentences - no tag soup
- Describe colors by name (burnt orange, sky blue, near-black) not hex codes
- Maximum 2-3 elements - if it feels busy, remove something
- Favor metaphor over literal depiction

## Step 3: Style Variations

**Default style: Risograph** - Use `references/styles/risograph.md` unless the content calls for something different.

Available styles in `references/styles/`:

- **risograph.md** - DEFAULT. Halftone dots, misregistration, indie printmaking aesthetic. Warm, tactile, analog.
- **minimalist-ink.md** - High-contrast black and white, crosshatching. For craft/mastery posts.
- **watercolor-line.md** - Ink linework with watercolor washes, warm. For organic topics.
- **editorial-conceptual.md** - Conceptual, sophisticated, editorial wit. For abstract/philosophical posts.

Present style options to user, recommending risograph as default.

## Step 4: Generate via API

### Running the Script

```bash
# Load key from .env and generate
export $(grep GEMINI_API_KEY .env) && \
python scripts/generate_image.py "prompt here" --model pro --aspect 16:9

# Save to specific folder
python scripts/generate_image.py "prompt" --output "./images" --name "my_image"
```

**Options:**
- `--model flash` (faster, cheaper) or `--model pro` (higher quality)
- `--aspect 16:9`, `1:1`, or `9:16` (**PRO MODEL ONLY** - for flash, you MUST include ratio in prompt text)
- `--variations N` - generate N versions
- `--output ./path` - save location
- `--name prefix` - filename prefix

**Output location:** Save images alongside the content they belong to - not a generic images dump.

## Step 5: Iterate

After user reviews generated images:
- **80% good?** Request specific edits conversationally rather than regenerating
- **Composition off?** Adjust framing or element placement in prompt
- **Wrong style?** Try a different style reference
- **Too busy?** Simplify to fewer elements
- **Colors wrong?** Be more explicit about palette

## Prompting Principles

### Write Like a Creative Director

Brief the model like a human artist. Use proper grammar, full sentences, and descriptive adjectives.

| Don't | Do |
|-------|-----|
| "Cool car, neon, city, night, 8k" | "A cinematic wide shot of a futuristic sports car speeding through a rainy Tokyo street at night. The neon signs reflect off the wet pavement and the car's metallic chassis." |

**Be specific about:**
- **Subject:** Instead of "a woman," say "a sophisticated elderly woman wearing a vintage chanel-style suit"
- **Materiality:** Describe textures - "matte finish," "brushed steel," "soft velvet," "crumpled paper"
- **Setting:** Define location, time of day, weather
- **Lighting:** Specify mood and light source
- **Mood:** Emotional tone of the image

### Provide Context

Context helps the model make logical artistic decisions. Include the "why" or "for whom."

**Example:** "Create an image of a sandwich for a Brazilian high-end gourmet cookbook."
*(Model infers: professional plating, shallow depth of field, perfect lighting)*

### Keep It Simple

- One clear focal point
- Maximum 2-3 elements total
- Generous negative space
- If it feels busy, remove something

### Avoid the Generic

- No lightbulbs for "ideas"
- No handshakes for "partnership"
- No happy stock photo poses
- No glossy AI aesthetic

## Resources

### references/styles/
Aesthetic style definitions:
- `risograph.md` - **DEFAULT** - Halftone, misregistration, indie printmaking
- `minimalist-ink.md` - Black and white ink illustration
- `watercolor-line.md` - Ink with watercolor washes
- `editorial-conceptual.md` - Conceptual editorial style

### scripts/
- `generate_image.py` - Gemini API image generation

## Prompt Modifiers Reference

| Category | Examples |
|----------|----------|
| **Lighting** | golden hour, dramatic shadows, soft diffused light, neon glow, overcast |
| **Style** | cinematic, editorial, technical diagram, hand-drawn, photorealistic |
| **Texture** | matte finish, brushed steel, soft velvet, crumpled paper, weathered wood |
| **Composition** | wide shot, close-up, bird's eye view, dutch angle, symmetrical |
| **Mood** | energetic, serene, dramatic, playful, sophisticated |
| **Quality** | 4K, high-fidelity, pixel-perfect, professional grade |

## Advanced Capabilities

### Text Rendering & Infographics

Put exact text in quotes. Specify style: "polished editorial," "technical diagram," or "hand-drawn whiteboard."

**Example prompts:**

```
Earnings Report Infographic:
"Generate a clean, modern infographic summarizing the key financial highlights from this earnings report. Include charts for 'Revenue Growth' and 'Net Income', and highlight the CEO's key quote in a stylized pull-quote box."
```

```
Whiteboard Summary:
"Summarize the concept of 'Transformer Neural Network Architecture' as a hand-drawn whiteboard diagram suitable for a university lecture. Use different colored markers for the Encoder and Decoder blocks, and include legible labels for 'Self-Attention' and 'Feed Forward'."
```

### Character Consistency & Thumbnails

Use reference images and state "Keep the person's facial features exactly the same as Image 1." Describe expression/action changes while maintaining identity.

**Example prompt:**

```
Viral Thumbnail:
"Design a viral video thumbnail using the person from Image 1.
Face Consistency: Keep the person's facial features exactly the same as Image 1, but change their expression to look excited and surprised.
Action: Pose the person on the left side, pointing their finger towards the right side of the frame.
Subject: On the right side, place a high-quality image of a delicious avocado toast.
Graphics: Add a bold yellow arrow connecting the person's finger to the toast.
Text: Overlay massive, pop-style text in the middle: 'Done in 3 mins!'. Use a thick white outline and drop shadow.
Background: A blurred, bright kitchen background. High saturation and contrast."
```

### Advanced Editing & Restoration

Use semantic instructions - no manual masking needed. Describe changes naturally.

**Example prompts:**

```
Object Removal:
"Remove the tourists from the background of this photo and fill the space with logical textures (cobblestones and storefronts) that match the surrounding environment."
```

```
Seasonal Control:
"Turn this scene into winter time. Keep the house architecture exactly the same, but add snow to the roof and yard, and change the lighting to a cold, overcast afternoon."
```

---

## Related Skills

- **youtube-title-creator** - Pair generated images with optimized titles
- **social-content-creation** - Use images in platform-optimized posts

---

*For custom brand styles, create new style files in references/styles/ following the existing format*
