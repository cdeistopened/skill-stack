#!/usr/bin/env python3
"""
Generate videos using Veo 3.1 (Google) or Sora (OpenAI).

Usage:
    python generate_video.py "A cinematic shot of ocean waves at golden hour"
    python generate_video.py "A woman says 'Welcome!' in a bright studio" --model fast
    python generate_video.py "A timelapse of clouds" --duration 8 --resolution 1080p
    python generate_video.py "A cat on a windowsill" --aspect 9:16 --count 2
    python generate_video.py "A cat on a windowsill" --provider sora --duration 4

Environment:
    VEO: GEMINI_API_KEY or GOOGLE_API_KEY must be set
    Sora: OPENAI_API_KEY must be set

Requirements:
    pip install google-genai requests
"""

import argparse
import os
import sys
import time
from datetime import datetime
from pathlib import Path

try:
    from google import genai
    from google.genai import types
except ImportError:
    genai = None
    types = None

try:
    import requests
except ImportError:
    requests = None


def get_gemini_key():
    """Get Gemini API key from environment."""
    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not key:
        print("Error: No Gemini API key found.")
        print("Set GEMINI_API_KEY or GOOGLE_API_KEY environment variable.")
        sys.exit(1)
    return key


def get_openai_key():
    """Get OpenAI API key from environment."""
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        print("Error: No OpenAI API key found.")
        print("Set OPENAI_API_KEY environment variable.")
        sys.exit(1)
    return key


def generate_video(
    prompt: str,
    model: str = "standard",
    aspect_ratio: str = "16:9",
    resolution: str = "720p",
    duration: int = 8,
    negative_prompt: str = None,
    output_dir: str = ".",
    name_prefix: str = None,
    poll_interval: int = 10,
) -> Path:
    """
    Generate a single video using VEO (Google Gemini).

    Args:
        prompt: The video generation prompt (max 1024 tokens)
        model: "standard" (Veo 3.1) or "fast" (Veo 3.1 Fast)
        aspect_ratio: "16:9" or "9:16"
        resolution: "720p", "1080p", or "4k"
        duration: Video length in seconds (4, 6, or 8)
        negative_prompt: Description of unwanted elements
        output_dir: Directory to save the video
        name_prefix: Optional prefix for filename
        poll_interval: Seconds between status checks

    Returns:
        Path to the saved video
    """
    if genai is None:
        print("Error: google-genai package not installed.")
        print("Install with: pip install google-genai")
        sys.exit(1)

    model_id = {
        "standard": "veo-3.1-generate-preview",
        "fast": "veo-3.1-fast-generate-preview",
    }.get(model, model)

    client = genai.Client(api_key=get_gemini_key())

    print(f"Provider: VEO")
    print(f"Model: {model_id}")
    print(f"Aspect ratio: {aspect_ratio}")
    print(f"Resolution: {resolution}")
    print(f"Duration: {duration}s")
    if negative_prompt:
        print(f"Negative prompt: {negative_prompt}")
    print(f"Prompt: {prompt[:120]}{'...' if len(prompt) > 120 else ''}")
    print()

    # Build config
    config = types.GenerateVideosConfig(
        aspect_ratio=aspect_ratio,
        resolution=resolution,
        duration_seconds=duration,
        number_of_videos=1,
    )
    if negative_prompt:
        config.negative_prompt = negative_prompt

    # Submit generation request
    print("Submitting video generation request...")
    operation = client.models.generate_videos(
        model=model_id,
        prompt=prompt,
        config=config,
    )

    # Poll until complete
    elapsed = 0
    while not operation.done:
        print(f"  Generating... ({elapsed}s elapsed)")
        time.sleep(poll_interval)
        elapsed += poll_interval
        operation = client.operations.get(operation)

    print(f"Generation complete ({elapsed}s)")

    # Save output
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    prefix = f"{name_prefix}_" if name_prefix else ""
    filename = f"{prefix}{timestamp}_{model}.mp4"
    output_path = output_dir / filename

    generated_video = operation.response.generated_videos[0]
    client.files.download(file=generated_video.video)
    generated_video.video.save(str(output_path))
    print(f"Saved: {output_path}")

    return output_path


SORA_ASPECT_TO_SIZE = {
    "16:9": "1280x720",
    "9:16": "720x1280",
}


def generate_video_sora(
    prompt: str,
    model: str = "sora-2",
    aspect_ratio: str = "16:9",
    duration: int = 8,
    negative_prompt: str = None,
    resolution: str = None,
    output_dir: str = ".",
    name_prefix: str = None,
    poll_interval: int = 10,
) -> Path:
    """
    Generate a single video using OpenAI Sora.

    Args:
        prompt: The video generation prompt
        model: "sora-2" or "sora-2-pro"
        aspect_ratio: "16:9" or "9:16" (mapped to pixel size)
        duration: Video length in seconds (4, 8, or 12)
        negative_prompt: Ignored (Sora doesn't support it)
        resolution: Ignored (Sora uses size param derived from aspect ratio)
        output_dir: Directory to save the video
        name_prefix: Optional prefix for filename
        poll_interval: Seconds between status checks

    Returns:
        Path to the saved video
    """
    if requests is None:
        print("Error: requests package not installed.")
        print("Install with: pip install requests")
        sys.exit(1)

    api_key = get_openai_key()
    size = SORA_ASPECT_TO_SIZE.get(aspect_ratio, "1280x720")

    print(f"Provider: Sora (OpenAI)")
    print(f"Model: {model}")
    print(f"Size: {size} (from aspect {aspect_ratio})")
    print(f"Duration: {duration}s")
    if negative_prompt:
        print(f"Warning: --negative is ignored by Sora")
    if resolution and resolution != "720p":
        print(f"Warning: --resolution is ignored by Sora (size derived from aspect ratio)")
    print(f"Prompt: {prompt[:120]}{'...' if len(prompt) > 120 else ''}")
    print()

    headers = {
        "Authorization": f"Bearer {api_key}",
    }

    # Submit generation request
    print("Submitting Sora video generation request...")
    create_resp = requests.post(
        "https://api.openai.com/v1/videos",
        headers=headers,
        json={
            "model": model,
            "prompt": prompt,
            "seconds": str(duration),
            "size": size,
        },
    )
    if create_resp.status_code != 200:
        print(f"Error creating video: {create_resp.status_code}")
        print(create_resp.text)
        sys.exit(1)

    video_data = create_resp.json()
    video_id = video_data["id"]
    print(f"Video ID: {video_id}")

    # Poll until complete
    elapsed = 0
    while True:
        status_resp = requests.get(
            f"https://api.openai.com/v1/videos/{video_id}",
            headers=headers,
        )
        if status_resp.status_code != 200:
            print(f"Error checking status: {status_resp.status_code}")
            print(status_resp.text)
            sys.exit(1)

        status_data = status_resp.json()
        status = status_data.get("status")

        if status == "completed":
            print(f"Generation complete ({elapsed}s)")
            break
        elif status == "failed":
            error = status_data.get("error", "Unknown error")
            print(f"Generation failed: {error}")
            sys.exit(1)
        else:
            print(f"  Generating... ({elapsed}s elapsed, status: {status})")
            time.sleep(poll_interval)
            elapsed += poll_interval

    # Download the video
    print("Downloading video...")
    content_resp = requests.get(
        f"https://api.openai.com/v1/videos/{video_id}/content",
        headers=headers,
    )
    if content_resp.status_code != 200:
        print(f"Error downloading video: {content_resp.status_code}")
        print(content_resp.text)
        sys.exit(1)

    # Save output
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    prefix = f"{name_prefix}_" if name_prefix else ""
    filename = f"{prefix}{timestamp}_{model}.mp4"
    output_path = output_dir / filename

    output_path.write_bytes(content_resp.content)
    print(f"Saved: {output_path}")

    return output_path


def generate_variations(
    prompt: str,
    count: int = 2,
    provider: str = "veo",
    model: str = "standard",
    aspect_ratio: str = "16:9",
    resolution: str = "720p",
    duration: int = 8,
    negative_prompt: str = None,
    output_dir: str = ".",
    name_prefix: str = None,
    poll_interval: int = 10,
) -> list:
    """
    Generate multiple video variations of the same prompt.

    Args:
        prompt: The video generation prompt
        count: Number of variations (1-4)
        provider: "veo" or "sora"
        model: Model name for the chosen provider
        aspect_ratio: "16:9" or "9:16"
        resolution: "720p", "1080p", or "4k"
        duration: Video length in seconds
        negative_prompt: Description of unwanted elements
        output_dir: Directory to save videos
        name_prefix: Optional prefix for filenames
        poll_interval: Seconds between status checks

    Returns:
        List of paths to saved videos
    """
    paths = []
    for i in range(count):
        print(f"\n{'='*40}")
        print(f"Variation {i + 1} of {count}")
        print(f"{'='*40}")
        vprefix = f"{name_prefix}_v{i + 1}" if name_prefix else f"v{i + 1}"

        if provider == "sora":
            path = generate_video_sora(
                prompt=prompt,
                model=model,
                aspect_ratio=aspect_ratio,
                duration=duration,
                negative_prompt=negative_prompt,
                resolution=resolution,
                output_dir=output_dir,
                name_prefix=vprefix,
                poll_interval=poll_interval,
            )
        else:
            path = generate_video(
                prompt=prompt,
                model=model,
                aspect_ratio=aspect_ratio,
                resolution=resolution,
                duration=duration,
                negative_prompt=negative_prompt,
                output_dir=output_dir,
                name_prefix=vprefix,
                poll_interval=poll_interval,
            )
        if path:
            paths.append(path)
    return paths


def main():
    parser = argparse.ArgumentParser(
        description="Generate videos using VEO (Google) or Sora (OpenAI)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    # VEO (default)
    python generate_video.py "A cinematic ocean wave at golden hour"
    python generate_video.py "A woman says 'Hello!' in a studio" --model fast
    python generate_video.py "Clouds over mountains" --duration 8 --resolution 1080p
    python generate_video.py "A cat" --aspect 9:16 --count 2 --output ./videos

    # Sora
    python generate_video.py "A cat on a windowsill, warm light" --provider sora --duration 4
    python generate_video.py "A dog in a park" --provider sora --model sora-2-pro --duration 12
        """,
    )

    parser.add_argument("prompt", help="The video generation prompt")
    parser.add_argument(
        "--provider", "-p",
        choices=["veo", "sora"],
        default="veo",
        help="Provider: veo (Google, default) or sora (OpenAI)"
    )
    parser.add_argument(
        "--model", "-m",
        default=None,
        help="Model: standard/fast (VEO) or sora-2/sora-2-pro (Sora). Defaults: standard (VEO), sora-2 (Sora)"
    )
    parser.add_argument(
        "--aspect", "-a",
        choices=["16:9", "9:16"],
        default="16:9",
        help="Aspect ratio (default: 16:9)"
    )
    parser.add_argument(
        "--resolution", "-r",
        choices=["720p", "1080p", "4k"],
        default="720p",
        help="Video resolution - VEO only (default: 720p)"
    )
    parser.add_argument(
        "--duration", "-d",
        type=int,
        choices=[4, 6, 8, 12],
        default=None,
        help="Video duration in seconds. VEO: 4/6/8 (default 8). Sora: 4/8/12 (default 8)"
    )
    parser.add_argument(
        "--negative",
        help="Negative prompt - VEO only. Describe what you DON'T want"
    )
    parser.add_argument(
        "--count", "-c",
        type=int,
        default=1,
        help="Number of variations to generate (default: 1, max: 4)"
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
    parser.add_argument(
        "--poll-interval",
        type=int,
        default=10,
        help="Seconds between status checks (default: 10)"
    )

    args = parser.parse_args()

    # Validate and set defaults based on provider
    provider = args.provider

    if provider == "veo":
        model = args.model or "standard"
        if model not in ("standard", "fast"):
            print(f"Error: VEO model must be 'standard' or 'fast', got '{model}'")
            sys.exit(1)
        duration = args.duration or 8
        if duration not in (4, 6, 8):
            print(f"Error: VEO duration must be 4, 6, or 8, got {duration}")
            sys.exit(1)
    elif provider == "sora":
        model = args.model or "sora-2"
        if model not in ("sora-2", "sora-2-pro"):
            print(f"Error: Sora model must be 'sora-2' or 'sora-2-pro', got '{model}'")
            sys.exit(1)
        duration = args.duration or 8
        if duration not in (4, 8, 12):
            print(f"Error: Sora duration must be 4, 8, or 12, got {duration}")
            sys.exit(1)

    if args.count < 1 or args.count > 4:
        print("Error: --count must be between 1 and 4")
        sys.exit(1)

    if args.count > 1:
        paths = generate_variations(
            prompt=args.prompt,
            count=args.count,
            provider=provider,
            model=model,
            aspect_ratio=args.aspect,
            resolution=args.resolution,
            duration=duration,
            negative_prompt=args.negative,
            output_dir=args.output,
            name_prefix=args.name,
            poll_interval=args.poll_interval,
        )
        print(f"\nGenerated {len(paths)} videos.")
    else:
        if provider == "sora":
            generate_video_sora(
                prompt=args.prompt,
                model=model,
                aspect_ratio=args.aspect,
                duration=duration,
                negative_prompt=args.negative,
                resolution=args.resolution,
                output_dir=args.output,
                name_prefix=args.name,
                poll_interval=args.poll_interval,
            )
        else:
            generate_video(
                prompt=args.prompt,
                model=model,
                aspect_ratio=args.aspect,
                resolution=args.resolution,
                duration=duration,
                negative_prompt=args.negative,
                output_dir=args.output,
                name_prefix=args.name,
                poll_interval=args.poll_interval,
            )


if __name__ == "__main__":
    main()
