#!/usr/bin/env python3
"""Generate 4S Framework thumbnails."""

import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from google import genai
from google.genai import types
from pathlib import Path

# Get API key from environment or .env.local
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

# Prompt for floating squares concept
prompt_scattered = """Generate a minimal editorial thumbnail for a blog post about the 4S Framework for AI-assisted writing.

CONCEPT: Four paper squares where three gray squares are scattered askew at different angles on the left side, and one terracotta square sits perfectly aligned on the right. Visual metaphor: chaos transforming into order through the framework.

STYLE: Clean, flat editorial illustration. Paper-like shapes with subtle shadows. Sophisticated, minimal. NOT photorealistic.

COMPOSITION: Three gray squares scattered/rotated on left third. One crisp terracotta square perfectly aligned on right third. Generous negative space between them.

COLOR PALETTE: Warm cream background. Scattered squares in graduating grays. Aligned square in terracotta coral.

AVOID: Text, busy compositions, photorealistic rendering, neon colors, gradients.

FORMAT: 16:9 landscape"""

print("Generating 4S scattered-to-stacked thumbnail...")
print(f"Using model: gemini-2.5-flash-image")

try:
    response = client.models.generate_content(
        model='gemini-2.5-flash-image',
        contents=[prompt_scattered],
        config=types.GenerateContentConfig(
            response_modalities=['TEXT', 'IMAGE'],
        )
    )

    for part in response.parts:
        if part.text:
            print(f"Model response: {part.text}")
        elif part.inline_data:
            image = part.as_image()
            output_path = output_dir / '4s-scattered.png'
            image.save(output_path)
            print(f"Saved: {output_path}")

except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
