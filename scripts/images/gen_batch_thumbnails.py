#!/usr/bin/env python3
"""Batch generate thumbnails for 5 posts in risograph style."""

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

# Risograph style base (our winning style)
RISOGRAPH_STYLE = """
STYLE: Risograph / screen print aesthetic. Limited color palette with
visible halftone dots and slight misregistration between color layers.
The handmade quality of indie printmaking - warm, tactile, analog.
Contemporary but not digital-slick. References zine culture, album art,
indie publishing aesthetic.

COLOR PALETTE: Cream paper background.
Accent color: bold terracotta/burnt coral as the visual hero.
Supporting: blacks, grays, occasional blue or yellow.

TEXTURE: Paper grain visible. Halftone shading. Slight print imperfection.

COMPOSITION: Tight framing, fills 60-70% of frame. Centered or rule-of-thirds.
Single striking subject. NO text, NO labels.

AVOID: Digital smoothness, photorealism, too much whitespace, busy compositions,
multiple competing subjects, any text or labels.

FORMAT: 16:9 landscape
"""

THUMBNAILS = {
    "transform": {
        "name": "Transform Don't Generate",
        "slug": "transform",
        "prompt": f"""A single alchemical transformation visual.

CONCEPT: A rough, raw chunk of ore or stone on the left side, mid-transformation
into a polished golden/terracotta gem or ingot on the right. The transformation
is happening in the middle - particles, energy, metamorphosis.

VISUAL REFERENCE: The classic alchemy symbol of transmutation. Lead to gold.
Raw material becoming refined output.

The terracotta/coral color should be the refined output - glowing, prominent.
The raw material is dark, rough, gray.

{RISOGRAPH_STYLE}"""
    },

    "cyborg-writer": {
        "name": "Rise of the Cyborg Writer",
        "slug": "cyborg-writer",
        "prompt": f"""A human hand and a mechanical/robotic hand working together.

CONCEPT: Two hands - one clearly human (organic, detailed), one clearly mechanical
(geometric, circuit-like) - both holding a single pen or quill, writing together
on a page. Collaboration, not competition. The centaur chess concept visualized.

VISUAL REFERENCE: The famous "Creation of Adam" hands reaching toward each other,
but one is human, one is machine. They meet at a creative tool.

The pen/quill tip or the line being written should have the terracotta accent.
Hands rendered with bold outlines.

{RISOGRAPH_STYLE}"""
    },

    "chicken": {
        "name": "Claude Tried to Kill My Chicken",
        "slug": "chicken",
        "prompt": f"""A chicken in a dramatic, slightly absurd situation.

CONCEPT: A single chicken (hen) looking startled or alarmed, with a speech bubble
or thought cloud containing a skull, danger symbol, or ominous shape. Dark humor.
The chicken is the victim of bad AI advice. Tragicomic.

VISUAL REFERENCE: Vintage warning posters, farm manual illustrations, but with
a surreal twist. The chicken as an innocent caught in technological chaos.

The chicken should have some terracotta coloring (comb, wattles, or feathers).
Bold black outlines. Halftone shading.

{RISOGRAPH_STYLE}"""
    },

    "rag": {
        "name": "It's RAG Time",
        "slug": "rag",
        "prompt": f"""Retrieval-Augmented Generation visualized as fishing.

CONCEPT: A fishing hook descending into a sea/pool of documents, papers, books.
The hook is pulling up a single glowing document - the retrieved knowledge.
Information retrieval as treasure hunting.

VISUAL REFERENCE: Vintage fishing illustrations, library card catalogs,
the "needle in haystack" concept but successful.

The retrieved document glows terracotta - the valuable thing being pulled up.
The sea of documents in grays and blues.

{RISOGRAPH_STYLE}"""
    },

    "mule": {
        "name": "Forget Unicorns Embrace the Mule",
        "slug": "mule",
        "prompt": f"""A mule standing proudly, contrasted with a fading unicorn.

CONCEPT: A sturdy, confident mule in the foreground - solid, reliable, working.
Behind or beside it, a faint/ghostly unicorn shape fading away. Practical beats
mythical. The solopreneur ethos.

VISUAL REFERENCE: Vintage agricultural illustrations, pack animal dignity,
the "unsexy but effective" aesthetic.

The mule should have terracotta accents (harness, blanket, or coloring).
The unicorn is just an outline, fading. Mule is solid and present.

{RISOGRAPH_STYLE}"""
    }
}

def generate(key, data):
    print(f"\n{'='*50}")
    print(f"Generating: {data['name']}")
    print(f"Slug: {data['slug']}")
    print(f"{'='*50}")

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
            if part.text:
                print(f"Model: {part.text[:100]}...")
            elif part.inline_data:
                # Save with slug name for easy matching to posts
                path = output_dir / f'{data["slug"]}.png'
                part.as_image().save(path)
                print(f"Saved: {path}")
                return path
    except Exception as e:
        print(f"Error: {e}")
    return None

if __name__ == "__main__":
    print("Batch generating 5 thumbnails in risograph style...")
    print(f"Output: {output_dir}")

    results = {}
    for key, data in THUMBNAILS.items():
        path = generate(key, data)
        results[key] = path

    print(f"\n{'='*50}")
    print("SUMMARY")
    print(f"{'='*50}")
    for key, path in results.items():
        status = "OK" if path else "FAILED"
        print(f"  {THUMBNAILS[key]['slug']}: {status}")
