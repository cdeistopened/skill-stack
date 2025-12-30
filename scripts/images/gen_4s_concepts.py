#!/usr/bin/env python3
"""Rapid iteration on 4S thumbnail concepts - Dürer/woodcut style."""

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

# Dürer style base
DURER_STYLE = """
STYLE: Albrecht Dürer woodcut engraving. Bold black lines on cream paper.
Hatching and cross-hatching for all shading. No smooth gradients.
The precision and craft of a Renaissance master engraver.
Single striking image, not an infographic.

TEXTURE: Carved wood grain quality. Ink has weight. Visible tool marks.

COMPOSITION: Centered single subject. Generous negative space.
No labels, no text, no annotations. Pure image.

COLOR: Black ink on warm cream. ONE subtle accent of terracotta/burnt coral
on the most important element only.

AVOID: Text, labels, multiple panels, infographic layouts, explanations,
smooth digital rendering, photorealism.

FORMAT: 16:9 landscape
"""

CONCEPTS = {
    "alchemist": {
        "name": "Alchemist's Vessel",
        "prompt": f"""A single ornate alchemical vessel - a tall glass beaker or alembic.
Inside are four distinct layers of liquid/substance. The bottom layer is murky and dark,
each layer above becomes clearer and more refined. The top layer glows with
terracotta warmth - the perfected essence. The vessel itself is intricately detailed
with alchemical engravings.

{DURER_STYLE}"""
    },

    "prism": {
        "name": "The Prism",
        "prompt": f"""A single triangular glass prism. A beam of raw, chaotic light
enters one side. Four distinct rays emerge from the other side, separating and
clarifying. The fourth ray is terracotta/coral colored - the refined output.
The prism is rendered with faceted precision, light rays shown as fine parallel lines.

{DURER_STYLE}"""
    },

    "sculptor": {
        "name": "Sculptor's Block",
        "prompt": f"""A single block of marble or stone being carved. One corner is
rough, raw, unworked stone with chisel marks. The opposite corner reveals a smooth,
polished surface with a terracotta vein or inlay exposed - something precious
revealed through the work of refinement. A single chisel rests against the block.
The transformation captured in one object.

{DURER_STYLE}"""
    },

    "hands": {
        "name": "Four Hands",
        "prompt": f"""Four hands arranged around a single sheet of paper/parchment,
seen from above. Each hand performs a different action: one holds raw crumpled material,
one sketches/writes, one cuts or arranges, one adds a final terracotta seal or flourish.
The hands are detailed, anatomical, Dürer-quality. The paper in the center is the
focal point being transformed by the four actions.

{DURER_STYLE}"""
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
                path = output_dir / f'4s-{key}.png'
                part.as_image().save(path)
                print(f"Saved: {path}")
                return path
    except Exception as e:
        print(f"Error: {e}")
    return None

if __name__ == "__main__":
    for key, data in CONCEPTS.items():
        generate(key, data)
    print("\nDone!")
