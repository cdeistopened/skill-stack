# Risograph / Screen Print Style

**Default style for Skill Stack thumbnails.**

## Aesthetic

Risograph printing aesthetic - the handmade quality of indie printmaking. Warm, tactile, analog. Think limited-edition art prints from an indie press, zine culture, album art, indie publishing.

## Key Characteristics

- **Halftone dots**: Visible dot patterns, not smooth gradients
- **Misregistration**: Slight offset between color layers (the "imperfect" look)
- **Limited palette**: 2-4 spot colors, not full CMYK
- **Paper texture**: Cream/off-white paper stock shows through
- **Overprint**: Colors overlap and mix where layers meet
- **Flat color**: Bold, unmodulated color areas

## Color Palette (Skill Stack)

**Base tones:**
| Color | Usage |
|-------|-------|
| Warm cream/beige | Background tone (like Claude's beige) |
| Charcoal grays | Primary subject matter, shadows |
| Near-black | Deep shadows, contrast |

**Accent colors (use sparingly for highlights/interest):**
| Color | Usage |
|-------|-------|
| Terracotta/burnt coral | Primary accent - hero elements |
| Muted teal/green | Terminal glow, tech elements |
| Dusty blue | Secondary highlights |
| Warm yellow/gold | Occasional pop of energy |

**Principles:**
- One dominant accent color per image
- Secondary accents used very sparingly
- Let the subject matter drive the palette
- Accents highlight the most interesting/important part

## Prompt Template

```
[Describe the subject/scene in vivid detail first - what is actually in the image]

The image fills the entire frame edge-to-edge. No white borders, no empty margins. Immersive, tight composition.

STYLE: Risograph / screen print aesthetic. Visible halftone dots and slight misregistration between color layers. The handmade quality of indie printmaking - warm, tactile, analog.

COMPOSITION: Tight, immersive framing. Subject fills the frame. No empty paper margins or white space borders.

TEXTURE: Visible halftone dots throughout. Slight color misregistration. NOT smooth digital gradients.

AVOID: Empty white space, paper borders/margins, photorealism, glossy AI aesthetic, busy compositions, generic metaphors (lightbulbs, handshakes, puzzle pieces).
```

## CRITICAL: Model Selection

**ALWAYS use `gemini-3-pro-image-preview`** for thumbnails. This is the ONLY model that supports the `aspect_ratio` config for 16:9.

```python
response = client.models.generate_content(
    model='gemini-3-pro-image-preview',  # MUST be Pro for thumbnails
    contents=[prompt],
    config=types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        image_config=types.ImageConfig(
            aspect_ratio='16:9'  # Only works with Pro model
        )
    )
)
```

Do NOT use `gemini-2.0-flash-exp-image-generation` for thumbnails - it ignores aspect ratio.

## Concept Principles

**Mix unexpected images together** - The best thumbnails combine two things that don't usually go together:
- Racing cockpit + terminal interface (Mechanical Sympathy)
- Straight razor as precision tool (Naval's Razor)
- Prism dispersing light into writing concepts (4S Framework)

**Avoid generic metaphors:**
- NO lightbulbs for "ideas"
- NO handshakes for "partnership"
- NO puzzle pieces for "fitting together"
- NO gears for "process"

**Think symbolically** - What iconic imagery relates to the concept? What visual mashup creates instant recognition?

## Example Concepts

**Mechanical Sympathy**: Racing driver cockpit POV, but the windshield IS a terminal with code scrolling. Gloved hands on vintage steering wheel. The driver navigates code, not asphalt. Teal terminal glow against charcoal interior.

**Naval's Razor**: Single straight razor, prominently displayed, fills the frame. Precision tool as metaphor for "cut away everything except what matters." Coral accent on handle.

**4S Framework**: Prism dispersing light into four distinct beams - the transformation of raw input into structured output.

## When to Use Other Styles

- **minimalist-ink.md**: For craft/mastery posts, Durer-inspired precision
- **watercolor-line.md**: For warmer, more organic topics
- **editorial-conceptual.md**: For abstract/philosophical posts

Default to risograph unless the content calls for something different.
