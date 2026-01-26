"""
DataForSEO Amazon API Integration

Provides Amazon-specific keyword research:
- Bulk search volume for Amazon keywords
- Related keywords from Amazon's "Related Searches"
- Product keyword rankings

API Docs: https://docs.dataforseo.com/v3/dataforseo_labs-amazon-overview/
Pricing: $0.01/request + $0.0001/keyword (bulk volume)
"""

import base64
import requests
from typing import Dict, List, Optional, Any

from config import get_dataforseo_credentials


class AmazonDataForSEO:
    """DataForSEO client for Amazon-specific endpoints."""

    def __init__(self):
        login, password, base_url = get_dataforseo_credentials()

        if not login or not password:
            raise ValueError("DataForSEO credentials not found. Check config.py")

        self.base_url = base_url

        # Create auth header
        cred = f"{login}:{password}"
        encoded_cred = base64.b64encode(cred.encode("ascii")).decode("ascii")
        self.headers = {
            "Authorization": f"Basic {encoded_cred}",
            "Content-Type": "application/json",
        }

        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def _post(self, endpoint: str, data: List[Dict]) -> Dict:
        """Make POST request to DataForSEO API."""
        url = f"{self.base_url}{endpoint}"
        response = self.session.post(url, json=data)
        response.raise_for_status()
        return response.json()

    def get_keyword_volume(
        self,
        keywords: List[str],
        location_code: int = 2840,  # USA
        language_code: str = "en",
    ) -> List[Dict[str, Any]]:
        """
        Get Amazon search volume for keywords.

        Args:
            keywords: List of keywords (up to 1000)
            location_code: 2840 = USA
            language_code: "en" for English

        Returns:
            List of keyword data with search_volume

        Cost: $0.01 + $0.0001 * len(keywords)
        """
        data = [{
            "keywords": keywords,
            "location_code": location_code,
            "language_code": language_code,
        }]

        response = self._post("/v3/dataforseo_labs/amazon/bulk_search_volume/live", data)

        if response["status_code"] != 20000:
            return []

        task = response["tasks"][0]
        if task["status_code"] != 20000:
            return []

        results = []
        for item in task["result"][0].get("items", []):
            results.append({
                "keyword": item.get("keyword"),
                "search_volume": item.get("search_volume"),
            })

        # Sort by volume
        results.sort(key=lambda x: x["search_volume"] or 0, reverse=True)
        return results

    def get_related_keywords(
        self,
        seed_keyword: str,
        location_code: int = 2840,
        language_code: str = "en",
        depth: int = 2,  # 1-4, higher = more results
        limit: int = 100,
    ) -> List[Dict[str, Any]]:
        """
        Get related keywords from Amazon's "Related Searches".

        Args:
            seed_keyword: Starting keyword
            depth: Search depth (1-4). Higher = more results but slower.
            limit: Max results to return

        Returns:
            List of related keywords with search volume

        Note: Can return up to 1,554 keywords at max depth.
        """
        data = [{
            "keyword": seed_keyword,
            "location_code": location_code,
            "language_code": language_code,
            "depth": depth,
            "limit": limit,
        }]

        response = self._post("/v3/dataforseo_labs/amazon/related_keywords/live", data)

        if response["status_code"] != 20000:
            return []

        task = response["tasks"][0]
        if task["status_code"] != 20000:
            return []

        if not task.get("result"):
            return []

        result_data = task["result"][0] if task["result"] else None
        if not result_data:
            return []

        results = []
        for item in result_data.get("items", []) or []:
            kw_data = item.get("keyword_data", {})
            results.append({
                "keyword": kw_data.get("keyword"),
                "search_volume": kw_data.get("keyword_info", {}).get("search_volume"),
            })

        # Sort by volume
        results.sort(key=lambda x: x["search_volume"] or 0, reverse=True)
        return results

    def get_product_keywords(
        self,
        asin: str,
        location_code: int = 2840,
        language_code: str = "en",
        limit: int = 100,
    ) -> List[Dict[str, Any]]:
        """
        Get keywords a specific Amazon product ranks for.

        Args:
            asin: Amazon Standard Identification Number
            location_code: 2840 = USA
            limit: Max keywords to return

        Returns:
            List of keywords the product ranks for, with positions
        """
        data = [{
            "asin": asin,
            "location_code": location_code,
            "language_code": language_code,
            "limit": limit,
        }]

        response = self._post("/v3/dataforseo_labs/amazon/ranked_keywords/live", data)

        if response["status_code"] != 20000:
            return []

        task = response["tasks"][0]
        if task["status_code"] != 20000:
            return []

        if not task.get("result"):
            return []

        result_data = task["result"][0] if task["result"] else None
        if not result_data:
            return []

        results = []
        for item in result_data.get("items", []) or []:
            kw_data = item.get("keyword_data", {})
            ranked_serp = item.get("ranked_serp_element", {})
            results.append({
                "keyword": kw_data.get("keyword"),
                "search_volume": kw_data.get("keyword_info", {}).get("search_volume"),
                "position": ranked_serp.get("serp_item", {}).get("rank_absolute"),
            })

        # Sort by volume
        results.sort(key=lambda x: x["search_volume"] or 0, reverse=True)
        return results


# CLI usage
if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage: python amazon_dataforseo.py <keyword>")
        print("       python amazon_dataforseo.py --asin <ASIN>")
        sys.exit(1)

    client = AmazonDataForSEO()

    if sys.argv[1] == "--asin":
        asin = sys.argv[2]
        print(f"\nKeywords for ASIN {asin}:\n")
        keywords = client.get_product_keywords(asin, limit=20)
        for kw in keywords:
            vol = f"{kw['search_volume']:,}" if kw['search_volume'] else "N/A"
            pos = kw.get('position', 'N/A')
            print(f"  {kw['keyword']}: vol={vol}, pos={pos}")
    else:
        keyword = " ".join(sys.argv[1:])

        print(f"\nSearch volume for '{keyword}':")
        volume = client.get_keyword_volume([keyword])
        if volume:
            vol = volume[0]['search_volume']
            print(f"  {vol:,} monthly searches" if vol else "  No data")

        print(f"\nRelated keywords for '{keyword}':\n")
        related = client.get_related_keywords(keyword, limit=20)
        for kw in related:
            vol = f"{kw['search_volume']:,}" if kw['search_volume'] else "N/A"
            print(f"  {kw['keyword']}: {vol}")
