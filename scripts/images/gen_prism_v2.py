#!/usr/bin/env python3
"""Prism v2 - enhanced with visual meme reference and tighter composition."""

import os
import sys
from pathlib import Path

from google import genai
from google.genai import types

# Get API key
api_key = os.environ.get('GEMINI_API_KEY')
if not api_key:
    env_path = Path(__file__).parent.parent.parent / '.env.local'
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            if line.startswith('GEMINI_API_KEY='):
                api_key = line.split('=', 1)[1]
                break

client = genai.Client(api_key=api_key)
output_dir = Path(__file__).parent.parent.parent / 'public' / 'images' / 'thumbnails'
output_dir.mkdir(parents=True, exist_ok=True)

# Enhanced concept with visual meme reference
BASE_CONCEPT = """A triangular prism refracting light - the iconic composition from
Pink Floyd's Dark Side of the Moon album cover, but reinterpreted.

VISUAL REFERENCE: The famous Newton prism diagram / Pink Floyd album art.
Viewers should feel instant recognition: "oh, it's THAT image" but rendered fresh.

COMPOSITION: Prism centered, filling roughly 40% of frame height.
Tight framing - NOT too much empty space. The image should feel substantial.
Light beam enters from left, four separated rays exit right.

INPUT BEAM: A single beam of tangled, chaotic, messy lines entering the prism
from the left. This represents raw unprocessed material - scribbles, noise, chaos.

OUTPUT RAYS: Four clean, separated beams exiting right, fanning out:
- Top ray: dark gray
- Second ray: medium gray
- Third ray: white/cream (lightest)
- Bottom ray: TERRACOTTA/BURNT CORAL - the warmest, most prominent

The terracotta ray should be the visual anchor - brightest, boldest,
the "final refined output" of the transformation.

NO TEXT. NO LABELS. Pure iconic image."""

STYLES = {
    "durer-v2": {
        "name": "Dürer Woodcut v2",
        "prompt": f"""{BASE_CONCEPT}

STYLE: Albrecht Dürer woodcut engraving. Bold black lines on warm cream paper.
All shading through hatching and cross-hatching - no smooth tones.
The chaos input rendered as dense, scratchy, tangled ink marks.
The prism rendered with precise geometric hatching showing its facets.
Output rays as bundles of tight parallel lines, each band distinct.

Reference the craftsmanship of Renaissance scientific illustrations -
when optics was being discovered and documented with reverence.

TEXTURE: Hand-carved quality. Visible tool marks. Cream paper, black ink,
with terracotta as the only color - applied to the bottom output ray.

AVOID: Smooth gradients, digital smoothness, sparse composition, too much whitespace.

FORMAT: 16:9 landscape"""
    },

    "botanical-v2": {
        "name": "Scientific Botanical v2",
        "prompt": f"""{BASE_CONCEPT}

STYLE: Scientific illustration from a Victorian optics textbook.
Precise pen linework. Stippling for tonal gradation on the prism facets.
The chaos input as loose, gestural ink scribbles.
Output rays rendered with fine parallel lines and subtle watercolor washes.

Fill the frame more - this should feel like a detailed plate from
an expensive scientific volume, not a sketch with too much margin.

The terracotta ray gets a rich watercolor wash that bleeds slightly
at the edges - the most saturated, alive part of the image.

TEXTURE: Fine pen on off-white paper. Watercolor washes for color.
Slight paper texture visible. Academic precision with artistic warmth.

AVOID: Too much whitespace, sparse composition, cartoon simplification.

FORMAT: 16:9 landscape"""
    },

    "risograph-v2": {
        "name": "Risograph v2",
        "prompt": f"""{BASE_CONCEPT}

STYLE: Risograph / screen print aesthetic. Limited color palette with
visible halftone dots and slight misregistration between color layers.
The handmade quality of indie printmaking - warm, tactile, analog.

The chaos input could have multiple overlapping colors (blue, yellow, black)
all tangled together - the "mess" of unprocessed source material.

The prism rendered with halftone shading, semi-transparent.
Output rays as bold, flat color bands with visible print texture.

This should feel like a limited-edition art print from an indie press.
Contemporary but not digital-slick. References zine culture,
album art, indie publishing aesthetic.

COLOR: Cream paper. Input chaos in mixed blues/yellows/black.
Output rays in grays, cream, and bold terracotta.
Terracotta ray is the hero - saturated, prominent.

AVOID: Digital smoothness, too much whitespace, photorealism.

FORMAT: 16:9 landscape"""
    }
}

def generate(key, data):
    print(f"\n--- {data['name']} ---")
    try:
        response = client.models.generate_content(
            model='gemini-3-pro-image-preview',
            contents=[data['prompt']],
            config=types.GenerateContentConfig(
                response_modalities=['TEXT', 'IMAGE'],
                image_config=types.ImageConfig(aspectRatio='16:9'),
            )
        )
        for part in response.parts:
            if part.inline_data:
                path = output_dir / f'prism-{key}.png'
                part.as_image().save(path)
                print(f"Saved: {path}")
                return path
    except Exception as e:
        print(f"Error: {e}")
    return None

if __name__ == "__main__":
    print("Generating prism v2 - enhanced prompts...")
    for key, data in STYLES.items():
        generate(key, data)
    print("\nDone!")
