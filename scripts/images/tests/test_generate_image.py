import json
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch


sys.path.insert(0, str(Path(__file__).parents[1]))

from generate_image import AtlasAPIError, generate_atlas_image  # noqa: E402


class FakeResponse:
    def __init__(self, body):
        self.body = body if isinstance(body, bytes) else json.dumps(body).encode()

    def __enter__(self):
        return self

    def __exit__(self, *_args):
        return False

    def read(self):
        return self.body


class AtlasProviderTests(unittest.TestCase):
    def test_submits_once_then_polls_and_saves_media(self):
        calls = []
        png = b"\x89PNG\r\n\x1a\nimage"

        def opener(request, timeout):
            calls.append((request.get_method(), request.full_url, timeout, request.data))
            if request.get_method() == "POST":
                self.assertEqual(request.get_header("Authorization"), "Bearer test-key")
                return FakeResponse(
                    {"code": 200, "data": {"id": "prediction-1", "status": "created"}}
                )
            if request.full_url.endswith("/prediction/prediction-1"):
                return FakeResponse(
                    {
                        "code": 200,
                        "data": {
                            "id": "prediction-1",
                            "status": "completed",
                            "outputs": ["https://media.example/thumbnail.png"],
                        },
                    }
                )
            return FakeResponse(png)

        with tempfile.TemporaryDirectory() as directory, patch.dict(
            os.environ, {"ATLASCLOUD_API_KEY": "test-key"}
        ):
            path = generate_atlas_image(
                "A minimal editorial thumbnail",
                output_dir=directory,
                name_prefix="article",
                api_base="https://api.example",
                opener=opener,
                sleeper=lambda _seconds: None,
            )
            self.assertEqual(path.read_bytes(), png)
            self.assertEqual(path.suffix, ".png")

        self.assertEqual(sum(call[0] == "POST" for call in calls), 1)
        post = next(call for call in calls if call[0] == "POST")
        self.assertEqual(post[1], "https://api.example/api/v1/model/generateImage")
        payload = json.loads(post[3])
        self.assertEqual(
            payload["model"], "google/nano-banana-2-lite/text-to-image-developer"
        )
        self.assertFalse(payload["enable_sync_mode"])

    def test_rejects_unsupported_resolution_before_post(self):
        with patch.dict(os.environ, {"ATLASCLOUD_API_KEY": "test-key"}):
            with self.assertRaisesRegex(AtlasAPIError, "supports --size 1K only"):
                generate_atlas_image("prompt", image_size="2K")


if __name__ == "__main__":
    unittest.main()
