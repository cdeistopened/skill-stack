# Schematic Style

Black and white technical schematic representation. Transforms photos into clean, diagrammatic illustrations suitable for technical documentation or as simplified visual aids.

## When to Use

- Converting photos into simplified reference drawings
- Creating technical documentation visuals
- Generating clean, printable diagrams from complex images
- Educational materials where realism is unnecessary
- Patent-style illustrations

## Visual Approach

Think technical drawing, architectural blueprint, or patent illustration. The goal is to distill the essential forms and relationships from a photo while removing photorealistic detail.

**Key characteristics:**
- Pure black lines on white background
- No gradients or shading (except hatching for depth)
- Clean, confident linework
- Simplified forms - only essential details
- Labels and callouts when helpful
- 8.5x11 portrait orientation (letter size, printable)

## Technical Direction

```
STYLE: Technical schematic illustration. Pure black linework on white background. Clean vector-like quality with uniform line weights. Think patent illustration or technical manual diagram.

RENDERING: Solid black lines only - no gray tones, no gradients. Use hatching ONLY where necessary to show depth or material. Lines should be crisp and confident, not sketchy.

COMPOSITION: Centered subject with generous margins. 8.5x11 portrait orientation. Leave space for labels if relevant. Subject should fill roughly 60-70% of frame.

SIMPLIFICATION: Remove all photorealistic detail. Reduce to essential shapes and forms. If it doesn't help identify the object, remove it. Focus on structure, not texture.
```

## Composition Notes

- 8.5x11 portrait (letter size, standard printable format)
- Subject centered with ~1 inch margins
- Clean negative space - no decorative elements
- If original has multiple elements, show clear relationships
- Use consistent line weight throughout

## Example Prompt Structure (for recreating a photo)

```
Convert this image into a clean technical schematic illustration.

GOAL: Recreate the essential forms and structure as a simplified black and white diagram.

STYLE: Technical schematic. Pure black lines on white background. No gradients, no shading except minimal hatching for depth. Uniform line weight. Patent illustration quality.

COMPOSITION: 8.5x11 portrait orientation. Center the subject with generous white margins. The illustration should be clean enough to print clearly.

SIMPLIFICATION: Distill to essential geometric forms. Remove photorealistic detail, texture, and color. Keep only what's necessary to identify the subject and show its structure.

OUTPUT: Clean black and white schematic suitable for technical documentation or reference.

AVOID: Gradients, gray tones, artistic flourishes, decorative elements, busy backgrounds, photorealism, textures.
```

## For Photo Input (Rework Mode)

When converting an existing photo to schematic:

```bash
python scripts/generate_image.py "Convert to clean technical schematic: pure black lines on white, simplified geometric forms, 8.5x11 printable format, no shading or gradients, patent illustration style" \
  --input ./photo.png \
  --model pro \
  --aspect 3:4
```

Note: Use 3:4 aspect ratio which approximates 8.5x11 letter proportion.

## Good Subjects for This Style

- Tools and equipment
- Mechanical parts
- Furniture and objects
- Plants (simplified botanical style)
- Buildings and architecture
- Vehicles
- Any physical object that benefits from simplified representation

## Integration with Telegram

When a photo arrives via Telegram with the caption "schematic" or similar trigger:
1. Download the photo
2. Send to Gemini with schematic style prompt
3. Generate the schematic using rework mode
4. Return the result
