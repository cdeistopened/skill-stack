#!/usr/bin/env python3
"""
Generate images using Gemini API or Atlas Cloud.

Usage:
    python generate_image.py "Your prompt here"
    python generate_image.py "Your prompt here" --model pro --aspect 16:9 --size 2K
    python generate_image.py "Your prompt here" --provider atlas --aspect 16:9
    python generate_image.py "Your prompt here" --variations 3

Environment:
    GEMINI_API_KEY or GOOGLE_API_KEY must be set
    ATLASCLOUD_API_KEY must be set when --provider atlas is used
"""

import argparse
import base64
import json
import os
import sys
import tempfile
import time
import urllib.request
import urllib.error
from datetime import datetime
from pathlib import Path
from urllib.parse import quote, urlparse


ATLAS_API_BASE = "https://api.atlascloud.ai"
ATLAS_MODEL = "google/nano-banana-2-lite/text-to-image-developer"
ATLAS_TERMINAL_FAILURES = {"failed", "timeout", "cancelled", "canceled"}


class AtlasAPIError(RuntimeError):
    """Raised when an Atlas Cloud prediction cannot be completed."""


def get_api_key(provider="gemini"):
    if provider == "atlas":
        key = os.environ.get("ATLASCLOUD_API_KEY")
        variable = "ATLASCLOUD_API_KEY"
    else:
        key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
        variable = "GEMINI_API_KEY or GOOGLE_API_KEY"
    if not key:
        print("Error: No API key found.")
        print(f"Set the {variable} environment variable.")
        sys.exit(1)
    return key


def _output_path(output_dir, name_prefix, provider, image_size, suffix=".png"):
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    prefix = f"{name_prefix}_" if name_prefix else ""
    return output_dir / f"{prefix}{timestamp}_{provider}_{image_size}{suffix}"


def _atlas_request_json(method, url, api_key, payload=None, opener=urllib.request.urlopen):
    headers = {
        "Accept": "application/json",
        "Authorization": f"Bearer {api_key}",
        "User-Agent": "skill-stack-thumbnails/atlas-provider",
    }
    body = None
    if payload is not None:
        headers["Content-Type"] = "application/json"
        body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with opener(request, timeout=30) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise AtlasAPIError(f"Atlas Cloud returned HTTP {error.code}: {detail}") from error
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
        raise AtlasAPIError(f"Atlas Cloud request failed: {error}") from error

    code = data.get("code")
    if code not in (None, 0, 200):
        raise AtlasAPIError(data.get("message") or data.get("msg") or f"Error code {code}")
    prediction = data.get("data")
    if not isinstance(prediction, dict):
        raise AtlasAPIError("Atlas Cloud response did not include prediction data")
    return prediction


def _image_suffix(media_url, media_bytes):
    if media_bytes.startswith(b"\x89PNG\r\n\x1a\n"):
        return ".png"
    if media_bytes.startswith(b"\xff\xd8\xff"):
        return ".jpg"
    if media_bytes.startswith(b"RIFF") and media_bytes[8:12] == b"WEBP":
        return ".webp"
    suffix = Path(urlparse(media_url).path).suffix.lower()
    return suffix if suffix in {".png", ".jpg", ".jpeg", ".webp"} else ".img"


def _save_atlas_image(media_url, output_dir, name_prefix, opener=urllib.request.urlopen):
    request = urllib.request.Request(
        media_url,
        headers={"User-Agent": "skill-stack-thumbnails/atlas-provider"},
        method="GET",
    )
    try:
        with opener(request, timeout=60) as response:
            media_bytes = response.read()
    except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError) as error:
        raise AtlasAPIError(f"Could not download the generated image: {error}") from error

    output_path = _output_path(
        output_dir,
        name_prefix,
        "atlas",
        "1K",
        _image_suffix(media_url, media_bytes),
    )
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(
            dir=output_path.parent,
            prefix=f".{output_path.name}.",
            suffix=".part",
            delete=False,
        ) as temp_file:
            temp_path = Path(temp_file.name)
            temp_file.write(media_bytes)
            temp_file.flush()
            os.fsync(temp_file.fileno())
        temp_path.replace(output_path)
    except OSError as error:
        if temp_path is not None:
            temp_path.unlink(missing_ok=True)
        raise AtlasAPIError(f"Could not save the generated image: {error}") from error
    print(f"Saved: {output_path} ({len(media_bytes):,} bytes)")
    return output_path


def generate_atlas_image(
    prompt,
    aspect_ratio="16:9",
    image_size="1K",
    output_dir=".",
    name_prefix=None,
    thinking_level="default",
    max_wait=180.0,
    api_base=None,
    opener=urllib.request.urlopen,
    sleeper=time.sleep,
    clock=time.monotonic,
):
    if image_size.upper() != "1K":
        raise AtlasAPIError("The Atlas provider currently supports --size 1K only")

    api_key = get_api_key("atlas")
    base = (api_base or os.environ.get("ATLASCLOUD_BASE_URL") or ATLAS_API_BASE).rstrip("/")
    payload = {
        "model": ATLAS_MODEL,
        "prompt": prompt,
        "aspect_ratio": aspect_ratio,
        "thinking_level": thinking_level,
        "resolution": "1k",
        "enable_sync_mode": False,
        "enable_base64_output": False,
    }
    print(f"Generating with {ATLAS_MODEL} via Atlas Cloud...")
    print(f"Aspect ratio: {aspect_ratio}, Size: 1K")

    # Generation is submitted once. Only the prediction GET is polled.
    prediction = _atlas_request_json(
        "POST", f"{base}/api/v1/model/generateImage", api_key, payload, opener
    )
    prediction_id = prediction.get("id")
    deadline = clock() + max_wait
    delay = 1.0
    while not prediction.get("outputs"):
        status = str(prediction.get("status", "")).lower()
        if status in ATLAS_TERMINAL_FAILURES:
            raise AtlasAPIError(
                prediction.get("error") or f"Prediction ended with status {status}"
            )
        if not prediction_id:
            raise AtlasAPIError("Atlas Cloud response did not include a prediction id")
        remaining = deadline - clock()
        if remaining <= 0:
            raise AtlasAPIError(
                f"Prediction {prediction_id} did not finish within {max_wait:g}s"
            )
        sleeper(min(delay, remaining))
        prediction = _atlas_request_json(
            "GET",
            f"{base}/api/v1/model/prediction/{quote(str(prediction_id), safe='')}",
            api_key,
            opener=opener,
        )
        delay = min(delay * 1.5, 10.0)

    return _save_atlas_image(
        prediction["outputs"][0], output_dir, name_prefix, opener=opener
    )


def generate_image(
    prompt: str,
    model: str = "flash",
    aspect_ratio: str = "16:9",
    image_size: str = "2K",
    output_dir: str = ".",
    name_prefix: str = None,
    provider: str = "gemini",
    thinking_level: str = "default",
) -> Path:
    if provider == "atlas":
        try:
            return generate_atlas_image(
                prompt=prompt,
                aspect_ratio=aspect_ratio,
                image_size=image_size,
                output_dir=output_dir,
                name_prefix=name_prefix,
                thinking_level=thinking_level,
            )
        except AtlasAPIError as error:
            print(f"Atlas API Error: {error}")
            return None
    if provider != "gemini":
        raise ValueError(f"Unsupported provider: {provider}")

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

                output_path = _output_path(
                    output_dir, name_prefix, model, image_size, ".png"
                )

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
    provider: str = "gemini",
    thinking_level: str = "default",
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
            provider=provider,
            thinking_level=thinking_level,
        )
        if path:
            paths.append(path)
    return paths


def main():
    parser = argparse.ArgumentParser(
        description="Generate images using Gemini API or Atlas Cloud",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    python generate_image.py "A paper airplane" --model pro --size 2K
    python generate_image.py "A paper airplane" --provider atlas --size 1K
    python generate_image.py "A horse with glasses" --model pro --aspect 1:1 --size 4K
    python generate_image.py "An hourglass" --variations 3 --output ./images
        """,
    )

    parser.add_argument("prompt", help="The image generation prompt")
    parser.add_argument(
        "--provider",
        choices=["gemini", "atlas"],
        default="gemini",
        help="Image API provider (default: gemini)",
    )
    parser.add_argument(
        "--model",
        "-m",
        choices=["flash", "pro"],
        default=None,
        help="Gemini model: flash or pro (default: pro)",
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
        default=None,
        help="Image size (default: 2K for Gemini, 1K for Atlas)",
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
    parser.add_argument(
        "--thinking-level",
        choices=["default", "high", "minimal"],
        default="default",
        help="Atlas reasoning level (default: default)",
    )

    args = parser.parse_args()
    if args.provider == "atlas" and args.model is not None:
        parser.error("--model applies to the Gemini provider only")
    if args.provider == "gemini" and args.thinking_level != "default":
        parser.error("--thinking-level applies to the Atlas provider only")
    model = args.model or "pro"
    image_size = args.size or ("1K" if args.provider == "atlas" else "2K")

    if args.variations > 1:
        paths = generate_variations(
            prompt=args.prompt,
            count=args.variations,
            model=model,
            aspect_ratio=args.aspect,
            image_size=image_size,
            output_dir=args.output,
            name_prefix=args.name,
            provider=args.provider,
            thinking_level=args.thinking_level,
        )
        print(f"\nGenerated {len(paths)} images.")
    else:
        path = generate_image(
            prompt=args.prompt,
            model=model,
            aspect_ratio=args.aspect,
            image_size=image_size,
            output_dir=args.output,
            name_prefix=args.name,
            provider=args.provider,
            thinking_level=args.thinking_level,
        )
        if not path:
            sys.exit(1)


if __name__ == "__main__":
    main()
