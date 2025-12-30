#!/usr/bin/env python3
"""
Generate images using Gemini API (Nano Banana / Nano Banana Pro).

Usage:
    python generate_image.py "Your prompt here"
    python generate_image.py "Your prompt here" --model pro --aspect 16:9 --size 2K
    python generate_image.py "Your prompt here" --variations 3

Environment:
    GEMINI_API_KEY or GOOGLE_API_KEY must be set

Requirements:
    pip install google-genai pillow
"""

import argparse
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


def generate_image(
    prompt: str,
    model: str = "flash",
    aspect_ratio: str = "16:9",
    output_dir: str = ".",
    name_prefix: str = None,
) -> Path:
    """
    Generate a single image from a prompt.

    Args:
        prompt: The image generation prompt
        model: "flash" (Nano Banana) or "pro" (Nano Banana Pro)
        aspect_ratio: "1:1", "9:16", "16:9", "3:4", "4:3"
        output_dir: Directory to save the image
        name_prefix: Optional prefix for filename

    Returns:
        Path to the saved image
    """
    # Map model names to actual model IDs
    model_id = {
        "flash": "gemini-2.0-flash-exp-image-generation",
        "pro": "gemini-3-pro-image-preview"
    }.get(model, model)

    # Initialize client
    client = genai.Client(api_key=get_api_key())

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
        contents=[prompt],
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
            filename = f"{prefix}{timestamp}_{model}.png"
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
    model: str = "flash",
    aspect_ratio: str = "16:9",
    output_dir: str = ".",
    name_prefix: str = None,
) -> list:
    """
    Generate multiple variations of the same prompt.

    Args:
        prompt: The image generation prompt
        count: Number of variations to generate
        model: "flash" or "pro"
        aspect_ratio: Aspect ratio for all images
        output_dir: Directory to save images
        name_prefix: Optional prefix for filenames

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
        )
        if path:
            paths.append(path)

    return paths


def main():
    parser = argparse.ArgumentParser(
        description="Generate images using Gemini API (Nano Banana)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    python generate_image.py "A paper airplane with dotted trajectory"
    python generate_image.py "A horse with glasses" --model pro --aspect 1:1
    python generate_image.py "An hourglass with letters" --variations 3 --output ./images
        """,
    )

    parser.add_argument("prompt", help="The image generation prompt")
    parser.add_argument(
        "--model", "-m",
        choices=["flash", "pro"],
        default="flash",
        help="Model to use: flash (faster/cheaper) or pro (higher quality)"
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
        )
        print(f"\nGenerated {len(paths)} images.")
    else:
        generate_image(
            prompt=args.prompt,
            model=args.model,
            aspect_ratio=args.aspect,
            output_dir=args.output,
            name_prefix=args.name,
        )


if __name__ == "__main__":
    main()
