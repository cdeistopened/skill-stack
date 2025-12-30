#!/usr/bin/env python3
"""Generate 4S Framework thumbnail in multiple styles for comparison."""

import os
import sys
from pathlib import Path
from datetime import datetime

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

if not api_key:
    print("Error: GEMINI_API_KEY not found")
    sys.exit(1)

client = genai.Client(api_key=api_key)

# Output directory
output_dir = Path(__file__).parent.parent.parent / 'public' / 'images' / 'thumbnails'
output_dir.mkdir(parents=True, exist_ok=True)

# Base concept (same for all styles)
BASE_CONCEPT = """A visual metaphor for the 4S Framework (Source, Substance, Structure, Style) -
four stages of transforming raw material into polished writing.

SUBJECT: Four paper documents arranged to show progression/transformation.
The first three are in muted grays (rough, intermediate, refined),
the fourth is in terracotta/burnt coral (the polished final output).
They should feel like stages of a process - chaos becoming order,
rough becoming refined, scattered becoming stacked."""

# Style-specific prompts
STYLES = {
    "woodcut": {
        "name": "Woodcut Engraving",
        "prompt": f"""{BASE_CONCEPT}

STYLE: Traditional woodcut engraving illustration. Bold black lines on cream paper.
Shading achieved through careful hatching and cross-hatching. High contrast.
Hand-carved quality with visible tool marks. Dense, intricate linework in the focal subject.
Think Albrecht Dürer meets vintage book illustration.

The four documents should have the weight and presence of carved woodblocks.
Rich hatching textures. The terracotta element rendered as a spot color -
burnt coral/terracotta standing out against the black and cream.

TEXTURE: Slightly textured cream paper. Ink has weight and presence.
Lines vary from thick outlines to fine hatching detail.

COMPOSITION: Centered arrangement. Documents stacked or fanned to show all four.
Generous margins. The kind of image you'd find in a Renaissance printing manual.

AVOID: Smooth gradients, photorealistic shading, digital smoothness, busy backgrounds.

FORMAT: 16:9 landscape aspect ratio"""
    },

    "botanical": {
        "name": "Botanical Scientific",
        "prompt": f"""{BASE_CONCEPT}

STYLE: Scientific botanical illustration. Precise ink linework with delicate stippling
for shading. The observational detail of a naturalist's field drawing. Clean white background.
Specimen presented with clarity and reverence. Think vintage encyclopedia plate or
Ernst Haeckel's scientific illustrations.

The four documents rendered as specimens - perhaps with subtle annotations or
measurement marks. Each one examined with scientific precision. The progression
from rough to refined shown through the quality of the paper texture in each.

TEXTURE: Fine pen strokes, stippled shading. Optional soft watercolor wash for
the terracotta accent. Paper has subtle tooth. Lines are confident but delicate.

COMPOSITION: Specimen arrangement - documents laid out for examination.
Perhaps slight overlap. Clean white background. Academic, observational.

AVOID: Heavy outlines, cartoon simplification, busy backgrounds, digital smoothness.

FORMAT: 16:9 landscape aspect ratio"""
    },

    "victorian": {
        "name": "Victorian Ornamental",
        "prompt": f"""{BASE_CONCEPT}

STYLE: Victorian ornamental engraving. Fine detailed linework with decorative borders
and flourishes. The elegance of a vintage stock certificate or book frontispiece.
Symmetrical composition with clear hierarchy. Dense ornamentation that frames
rather than overwhelms the central subject. Think 19th century commercial printing
at its most refined.

The four documents as the central subject, framed by ornate Victorian borders.
Corner flourishes, decorative rules. The kind of image that would appear on
a certificate of mastery or a guild membership card. Terracotta as an accent
within the engraved frame.

TEXTURE: Engraved line quality - precise, controlled, varying line weight for depth.
Aged paper tone. Ink has presence and permanence.

COMPOSITION: Symmetrical, formal. Decorative frame surrounding central subject.
Banner elements possible. The frame itself communicates "framework."

AVOID: Modern minimalism, sparse compositions, digital flatness, casual linework.

FORMAT: 16:9 landscape aspect ratio"""
    },

    "tarot": {
        "name": "Tarot Symbolic",
        "prompt": f"""{BASE_CONCEPT}

STYLE: Tarot card illustration. Bold black outlines with limited color palette.
Symbolic, archetypal imagery presented with hieratic flatness. Medieval woodcut meets
mystical symbolism. Centered, iconic composition with decorative border.
The visual weight and presence of a major arcana card.

The four documents as archetypal symbols of transformation. Perhaps hands holding
or arranging them. Celestial elements optional (stars, rays of light).
The terracotta document could glow or emanate light. Symbolic of the
creative transformation process - turning raw material into refined output.

TEXTURE: Woodcut-inspired lines, slightly rough edges. Gold or metallic accents optional.
Aged paper or parchment background.

COMPOSITION: Centered, iconic. Decorative border framing the scene.
Symmetrical or near-symmetrical. Hieratic presentation - like a sacred process.

AVOID: Photorealism, 3D perspective, busy backgrounds, cute or casual rendering.

FORMAT: 16:9 landscape aspect ratio"""
    }
}

def generate_style(style_key: str, style_data: dict):
    """Generate a single style variation."""
    print(f"\n{'='*60}")
    print(f"Generating: {style_data['name']}")
    print(f"{'='*60}")

    try:
        response = client.models.generate_content(
            model='gemini-3-pro-image-preview',
            contents=[style_data['prompt']],
            config=types.GenerateContentConfig(
                response_modalities=['TEXT', 'IMAGE'],
                image_config=types.ImageConfig(
                    aspectRatio='16:9',
                ),
            )
        )

        for part in response.parts:
            if part.text:
                print(f"Model: {part.text[:200]}...")
            elif part.inline_data:
                output_path = output_dir / f'4s-{style_key}.png'
                image = part.as_image()
                image.save(output_path)
                print(f"Saved: {output_path}")
                return output_path

    except Exception as e:
        print(f"Error generating {style_key}: {e}")
        return None

def main():
    print("Generating 4S Framework thumbnails in 4 styles...")
    print(f"Using model: gemini-3-pro-image-preview")
    print(f"Output directory: {output_dir}")

    results = {}
    for style_key, style_data in STYLES.items():
        path = generate_style(style_key, style_data)
        results[style_key] = path

    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    for style_key, path in results.items():
        status = "OK" if path else "FAILED"
        print(f"  {STYLES[style_key]['name']}: {status}")
        if path:
            print(f"    -> {path}")

if __name__ == "__main__":
    main()
