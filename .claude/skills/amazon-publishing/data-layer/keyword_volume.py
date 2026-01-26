#!/usr/bin/env python3
"""
Amazon Keyword Volume Checker

Simple CLI for checking Amazon search volumes for KDP keyword planning.

Usage:
    python keyword_volume.py keyword1 keyword2 keyword3 ...
    python keyword_volume.py -f keywords.txt

Cost: ~$0.01 per batch of up to 1000 keywords
"""

import sys
from amazon_dataforseo import AmazonDataForSEO


def main():
    if len(sys.argv) < 2:
        print("Amazon Keyword Volume Checker")
        print("-" * 40)
        print("Usage:")
        print("  python keyword_volume.py keyword1 keyword2 keyword3 ...")
        print("  python keyword_volume.py -f keywords.txt")
        print()
        print("Example:")
        print('  python keyword_volume.py "fasting books" "lent devotional" "catholic meditation"')
        sys.exit(1)

    # Handle file input
    if sys.argv[1] == "-f":
        with open(sys.argv[2]) as f:
            keywords = [line.strip() for line in f if line.strip()]
    else:
        keywords = sys.argv[1:]

    if not keywords:
        print("No keywords provided")
        sys.exit(1)

    print(f"\n📊 Checking Amazon search volume for {len(keywords)} keyword(s)...")
    print("-" * 50)

    client = AmazonDataForSEO()
    results = client.get_keyword_volume(keywords)

    # Print results sorted by volume
    print(f"\n{'Keyword':<40} {'Monthly Searches':>15}")
    print("-" * 57)

    for r in results:
        kw = r["keyword"][:38] + ".." if len(r["keyword"]) > 40 else r["keyword"]
        vol = f"{r['search_volume']:,}" if r["search_volume"] else "No data"
        print(f"{kw:<40} {vol:>15}")

    # Summary
    total_vol = sum(r["search_volume"] or 0 for r in results)
    has_data = sum(1 for r in results if r["search_volume"])

    print("-" * 57)
    print(f"{'Total':<40} {total_vol:>15,}")
    print(f"\n{has_data}/{len(keywords)} keywords have data")

    # Recommendations based on volume
    print("\n💡 Volume Interpretation:")
    print("  • 1,000+ = High demand, competitive")
    print("  • 100-1,000 = Good niche opportunity")
    print("  • <100 = Very specific, low search volume")


if __name__ == "__main__":
    main()
