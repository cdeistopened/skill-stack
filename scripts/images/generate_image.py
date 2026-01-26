#!/usr/bin/env python3
"""
Generate images using Gemini API.

Usage:
    python generate_image.py "Your prompt here"
    python generate_image.py "Your prompt here" --model pro --aspect 16:9 --size 2K
    python generate_image.py "Your prompt here" --variations 3

Environment:
    GEMINI_API_KEY or GOOGLE_API_KEY must be set
"""

import argparse
import base64
import json
import os
import sys
import urllib.request
import urllib.error
from datetime import datetime
from pathlib import Path


def get_api_key():
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
    image_size: str = "2K",
    output_dir: str = ".",
    name_prefix: str = None,
) -> Path:
    model_ids = {
        "flash": "gemini-2.5-flash-image",
        "pro": "gemini-3-pro-image-preview",
    }
    model_id = model_ids.get(model, model)

    api_key = get_api_key()
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_id}:generateContent?key={api_key}"

    request_body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {
                "aspectRatio": aspect_ratio,
                "imageSize": image_size,
            },
        },
    }

    print(f"Generating with {model_id}...")
    print(f"Aspect ratio: {aspect_ratio}, Size: {image_size}")

    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(request_body).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )

        with urllib.request.urlopen(req, timeout=120) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        print(f"API Error {e.code}: {error_body}")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

    output_path = None
    if "candidates" in data:
        for part in data["candidates"][0]["content"]["parts"]:
            if "inlineData" in part:
                img_data = base64.b64decode(part["inlineData"]["data"])

                output_dir = Path(output_dir)
                output_dir.mkdir(parents=True, exist_ok=True)

                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                prefix = f"{name_prefix}_" if name_prefix else ""
                filename = f"{prefix}{timestamp}_{model}_{image_size}.png"
                output_path = output_dir / filename

                with open(output_path, "wb") as f:
                    f.write(img_data)
                print(f"Saved: {output_path} ({len(img_data):,} bytes)")
            elif "text" in part:
                print(f"Model: {part['text']}")
    else:
        print(f"Unexpected response: {data}")

    return output_path


def generate_variations(
    prompt: str,
    count: int = 3,
    model: str = "flash",
    aspect_ratio: str = "16:9",
    image_size: str = "2K",
    output_dir: str = ".",
    name_prefix: str = None,
) -> list:
    paths = []
    for i in range(count):
        print(f"\n--- Variation {i + 1} of {count} ---")
        prefix = f"{name_prefix}_v{i + 1}" if name_prefix else f"v{i + 1}"
        path = generate_image(
            prompt=prompt,
            model=model,
            aspect_ratio=aspect_ratio,
            image_size=image_size,
            output_dir=output_dir,
            name_prefix=prefix,
        )
        if path:
            paths.append(path)
    return paths


def main():
    parser = argparse.ArgumentParser(
        description="Generate images using Gemini API",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    python generate_image.py "A paper airplane" --model pro --size 2K
    python generate_image.py "A horse with glasses" --model pro --aspect 1:1 --size 4K
    python generate_image.py "An hourglass" --variations 3 --output ./images
        """,
    )

    parser.add_argument("prompt", help="The image generation prompt")
    parser.add_argument(
        "--model",
        "-m",
        choices=["flash", "pro"],
        default="pro",
        help="Model: flash (faster) or pro (higher quality, default)",
    )
    parser.add_argument(
        "--aspect",
        "-a",
        default="16:9",
        help="Aspect ratio: 1:1, 9:16, 16:9, 3:4, 4:3 (default: 16:9)",
    )
    parser.add_argument(
        "--size",
        "-s",
        choices=["1K", "2K", "4K"],
        default="2K",
        help="Image size: 1K, 2K (default), or 4K",
    )
    parser.add_argument(
        "--variations",
        "-v",
        type=int,
        default=1,
        help="Number of variations to generate (default: 1)",
    )
    parser.add_argument(
        "--output",
        "-o",
        default=".",
        help="Output directory (default: current directory)",
    )
    parser.add_argument("--name", "-n", help="Prefix for output filename")

    args = parser.parse_args()

    if args.variations > 1:
        paths = generate_variations(
            prompt=args.prompt,
            count=args.variations,
            model=args.model,
            aspect_ratio=args.aspect,
            image_size=args.size,
            output_dir=args.output,
            name_prefix=args.name,
        )
        print(f"\nGenerated {len(paths)} images.")
    else:
        generate_image(
            prompt=args.prompt,
            model=args.model,
            aspect_ratio=args.aspect,
            image_size=args.size,
            output_dir=args.output,
            name_prefix=args.name,
        )


if __name__ == "__main__":
    main()
