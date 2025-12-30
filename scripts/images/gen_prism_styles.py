#!/usr/bin/env python3
"""Prism concept across multiple styles."""

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

# Enhanced prism concept
BASE_CONCEPT = """A triangular glass prism refracting light.

INPUT: A single beam of raw, tangled, chaotic light enters from the left -
rendered as messy, intertwined lines suggesting unprocessed material.

OUTPUT: Four distinct rays emerge from the right side, cleanly separated:
- First ray: pale gray (raw source material)
- Second ray: medium gray (extracted substance)
- Third ray: white/cream (clear structure)
- Fourth ray: terracotta/burnt coral (polished style) - this one brightest/most prominent

The prism itself is solid, geometric, precisely rendered. The transformation
from chaos to clarity happens through the prism. Single object, centered,
generous negative space around it.

NO TEXT. NO LABELS. Pure visual."""

STYLES = {
    "durer": {
        "name": "Dürer Woodcut",
        "prompt": f"""{BASE_CONCEPT}

STYLE: Albrecht Dürer woodcut engraving. Bold black lines on cream paper.
All shading through hatching and cross-hatching. The precision of a Renaissance
master engraver. Light rays rendered as bundles of parallel lines.
The chaotic input as tangled, scratchy marks. High contrast.

TEXTURE: Carved wood quality. Visible tool marks. Ink has weight.

AVOID: Smooth gradients, digital smoothness, photorealism, any text.

FORMAT: 16:9 landscape"""
    },

    "botanical": {
        "name": "Scientific/Botanical",
        "prompt": f"""{BASE_CONCEPT}

STYLE: Scientific illustration from a Victorian optics textbook.
Precise pen linework with delicate stippling for tonal gradation.
The observational clarity of Ernst Haeckel or a physics diagram.
Clean, academic, precise. Light rays shown with fine parallel lines
and subtle color washes.

TEXTURE: Fine pen strokes on white paper. Watercolor wash for the colored rays.
Technical precision with artistic elegance.

AVOID: Heavy outlines, cartoon style, busy backgrounds, any text.

FORMAT: 16:9 landscape"""
    },

    "tarot": {
        "name": "Tarot/Mystical",
        "prompt": f"""{BASE_CONCEPT}

STYLE: Tarot card mysticism meets medieval woodcut. Bold black outlines.
The prism as a sacred geometric object, almost altar-like. Light rays
as emanations of divine/creative energy. Symbolic weight. Could have
subtle celestial elements (small stars, radiating lines) but keep simple.
Hieratic, iconic presentation.

TEXTURE: Woodcut lines, slightly rough edges. Aged parchment background.
Gold or warm tones optional.

AVOID: Photorealism, 3D perspective tricks, cute rendering, any text.

FORMAT: 16:9 landscape"""
    },

    "minimal": {
        "name": "Clean Minimal",
        "prompt": f"""{BASE_CONCEPT}

STYLE: Ultra-clean minimal illustration. Simple geometric shapes.
Thin precise lines. The prism as pure geometry - crisp triangle.
Light rays as clean straight lines with subtle color. Lots of white space.
Modern, sophisticated, almost architectural in its precision.
Think scientific diagram meets Bauhaus.

TEXTURE: Smooth, clean. No visible texture. Precision over craft.

AVOID: Ornament, hatching, busy details, any text, vintage aesthetics.

FORMAT: 16:9 landscape"""
    },

    "risograph": {
        "name": "Risograph/Printmaking",
        "prompt": f"""{BASE_CONCEPT}

STYLE: Risograph print aesthetic. Limited color palette with slight
misregistration between layers. Halftone dots visible. The handmade
quality of screen printing or letterpress. Warm, tactile, analog feel.
Overlapping transparent color layers create depth.

TEXTURE: Paper grain visible. Ink sits on surface. Slight imperfection
in registration adds charm. Printmaker's aesthetic.

AVOID: Digital perfection, smooth gradients, photorealism, any text.

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
    print("Generating prism concept across 5 styles...")
    for key, data in STYLES.items():
        generate(key, data)
    print("\nDone!")
