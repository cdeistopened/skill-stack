#!/usr/bin/env python3
"""
Generate and edit images using Gemini API.

Usage:
    # Generate from scratch
    python generate_image.py "Your prompt here"
    python generate_image.py "Your prompt here" --model pro --aspect 16:9 --size 2K

    # Edit an existing image (rework mode)
    python generate_image.py "Add snow to the roof" --input ./base-image.png
    python generate_image.py "Change the color to blue" --input ./image.png --model pro

Environment:
    GEMINI_API_KEY or GOOGLE_API_KEY must be set

Requirements:
    pip install google-genai pillow
"""

import argparse
import base64
import os
import sys
from datetime import datetime
from pathlib import Path

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("Error: google-genai package not installed.")
    print("Install with: pip install google-genai")
    sys.exit(1)

try:
    from PIL import Image
except ImportError:
    print("Error: pillow package not installed.")
    print("Install with: pip install pillow")
    sys.exit(1)


def get_api_key():
    """Get API key from environment."""
    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not key:
        print("Error: No API key found.")
        print("Set GEMINI_API_KEY or GOOGLE_API_KEY environment variable.")
        sys.exit(1)
    return key


def load_image_as_part(image_path: str) -> types.Part:
    """Load an image file and return it as a Gemini Part."""
    path = Path(image_path)
    if not path.exists():
        print(f"Error: Image file not found: {image_path}")
        sys.exit(1)

    # Determine MIME type
    suffix = path.suffix.lower()
    mime_types = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
    }
    mime_type = mime_types.get(suffix, 'image/png')

    # Read and encode image
    with open(path, 'rb') as f:
        image_data = f.read()

    return types.Part.from_bytes(data=image_data, mime_type=mime_type)


def generate_image(
    prompt: str,
    model: str = "pro",
    aspect_ratio: str = "16:9",
    output_dir: str = ".",
    name_prefix: str = None,
    input_image: str = None,
) -> Path:
    """
    Generate or edit an image.

    Args:
        prompt: The image generation/editing prompt
        model: "flash" or "pro" (pro recommended for editing)
        aspect_ratio: "1:1", "9:16", "16:9", "3:4", "4:3"
        output_dir: Directory to save the image
        name_prefix: Optional prefix for filename
        input_image: Path to reference image for editing (rework mode)

    Returns:
        Path to the saved image
    """
    # Map model names to actual model IDs
    model_id = {
        "flash": "gemini-3-flash-preview",
        "pro": "gemini-3-pro-image-preview"
    }.get(model, model)

    # Initialize client
    client = genai.Client(api_key=get_api_key())

    # Build contents based on whether we have an input image
    if input_image:
        print(f"Rework mode: editing {input_image}")
        image_part = load_image_as_part(input_image)
        contents = [image_part, prompt]
    else:
        contents = [prompt]

    # Configure generation - aspect ratio only supported by pro model
    if model == "pro":
        config = types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
            image_config=types.ImageConfig(
                aspectRatio=aspect_ratio,
            ),
        )
        print(f"Generating with {model_id}...")
        print(f"Aspect ratio: {aspect_ratio}")
    else:
        # Flash model doesn't support aspect ratio config
        config = types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
        )
        print(f"Generating with {model_id}...")
        print(f"Note: flash model uses default aspect ratio (include ratio in prompt text)")

    # Generate
    response = client.models.generate_content(
        model=model_id,
        contents=contents,
        config=config,
    )

    # Process response
    output_path = None
    for part in response.parts:
        if part.text is not None:
            print(f"Model response: {part.text}")
        elif part.inline_data is not None:
            # Create output directory
            output_dir = Path(output_dir)
            output_dir.mkdir(parents=True, exist_ok=True)

            # Generate filename
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            prefix = f"{name_prefix}_" if name_prefix else ""
            mode_suffix = "edit" if input_image else "gen"
            filename = f"{prefix}{timestamp}_{mode_suffix}_{model}.png"
            output_path = output_dir / filename

            # Save image
            image = part.as_image()
            image.save(output_path)
            print(f"Saved: {output_path}")

    if output_path is None:
        print("Warning: No image was generated in the response.")

    return output_path


def generate_variations(
    prompt: str,
    count: int = 3,
    model: str = "pro",
    aspect_ratio: str = "16:9",
    output_dir: str = ".",
    name_prefix: str = None,
    input_image: str = None,
) -> list:
    """
    Generate multiple variations of the same prompt/edit.

    Args:
        prompt: The image generation/editing prompt
        count: Number of variations to generate
        model: "flash" or "pro"
        aspect_ratio: Aspect ratio for all images
        output_dir: Directory to save images
        name_prefix: Optional prefix for filenames
        input_image: Path to reference image for editing

    Returns:
        List of paths to saved images
    """
    paths = []
    for i in range(count):
        print(f"\n--- Variation {i + 1} of {count} ---")
        prefix = f"{name_prefix}_v{i + 1}" if name_prefix else f"v{i + 1}"
        path = generate_image(
            prompt=prompt,
            model=model,
            aspect_ratio=aspect_ratio,
            output_dir=output_dir,
            name_prefix=prefix,
            input_image=input_image,
        )
        if path:
            paths.append(path)

    return paths


def main():
    parser = argparse.ArgumentParser(
        description="Generate or edit images using Gemini API",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    # Generate from scratch
    python generate_image.py "A paper airplane with dotted trajectory"
    python generate_image.py "A horse with glasses" --model pro --aspect 1:1

    # Edit an existing image (rework mode)
    python generate_image.py "Add snow to the roof" --input ./house.png
    python generate_image.py "Change the background to a beach" --input ./portrait.png
    python generate_image.py "Make the colors more vibrant" --input ./image.png --variations 3
        """,
    )

    parser.add_argument("prompt", help="The image generation or editing prompt")
    parser.add_argument(
        "--input", "-i",
        help="Path to reference image for editing (rework mode)"
    )
    parser.add_argument(
        "--model", "-m",
        choices=["flash", "pro"],
        default="pro",
        help="Model to use: flash (faster) or pro (higher quality, default)"
    )
    parser.add_argument(
        "--aspect", "-a",
        default="16:9",
        help="Aspect ratio: 1:1, 9:16, 16:9, 3:4, 4:3 (default: 16:9)"
    )
    parser.add_argument(
        "--variations", "-v",
        type=int,
        default=1,
        help="Number of variations to generate (default: 1)"
    )
    parser.add_argument(
        "--output", "-o",
        default=".",
        help="Output directory (default: current directory)"
    )
    parser.add_argument(
        "--name", "-n",
        help="Prefix for output filename"
    )

    args = parser.parse_args()

    if args.variations > 1:
        paths = generate_variations(
            prompt=args.prompt,
            count=args.variations,
            model=args.model,
            aspect_ratio=args.aspect,
            output_dir=args.output,
            name_prefix=args.name,
            input_image=args.input,
        )
        print(f"\nGenerated {len(paths)} images.")
    else:
        generate_image(
            prompt=args.prompt,
            model=args.model,
            aspect_ratio=args.aspect,
            output_dir=args.output,
            name_prefix=args.name,
            input_image=args.input,
        )


if __name__ == "__main__":
    main()
