"""
Configuration loader for Amazon publishing data layer.
Uses OpenEd's DataForSEO credentials.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Path to DataForSEO credentials (OpenEd seomachine)
DATAFORSEO_ENV_PATH = Path(
    "/Users/charliedeist/Desktop/New Root Docs/OpenEd Vault/Studio/SEO Content Production/seomachine/data_sources/config/.env"
)

def load_config():
    """Load DataForSEO credentials from OpenEd config."""
    if DATAFORSEO_ENV_PATH.exists():
        load_dotenv(DATAFORSEO_ENV_PATH)

    return {
        "dataforseo": {
            "login": os.getenv("DATAFORSEO_LOGIN"),
            "password": os.getenv("DATAFORSEO_PASSWORD"),
            "base_url": os.getenv("DATAFORSEO_BASE_URL", "https://api.dataforseo.com"),
        }
    }

def get_dataforseo_credentials():
    """Return DataForSEO credentials tuple."""
    config = load_config()
    return (
        config["dataforseo"]["login"],
        config["dataforseo"]["password"],
        config["dataforseo"]["base_url"],
    )
