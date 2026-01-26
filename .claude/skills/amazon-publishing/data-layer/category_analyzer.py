#!/usr/bin/env python3
"""
Amazon KDP Category Analyzer

Combines DataForSEO Amazon keyword data with category research
to provide data-driven category and keyword recommendations.

Usage:
    python category_analyzer.py "catholic fasting lent"
    python category_analyzer.py "50 mile march fitness" --comp-asins B07H4...

Output:
    - Keyword search volumes for your topic
    - Related keyword opportunities
    - Competitor keyword analysis (if ASINs provided)
"""

import argparse
import json
from typing import List, Optional
from amazon_dataforseo import AmazonDataForSEO


def analyze_topic(
    topic: str,
    comp_asins: Optional[List[str]] = None,
    output_format: str = "text",
) -> dict:
    """
    Analyze a book topic for KDP optimization.

    Args:
        topic: Main topic/keyword for the book
        comp_asins: Optional list of competitor ASINs to analyze
        output_format: "text" or "json"

    Returns:
        Analysis results dict
    """
    client = AmazonDataForSEO()

    results = {
        "topic": topic,
        "seed_volume": None,
        "related_keywords": [],
        "competitor_keywords": [],
        "recommendations": [],
    }

    # 1. Get seed keyword volume
    print(f"\n📊 Analyzing topic: '{topic}'")
    print("-" * 50)

    volume_data = client.get_keyword_volume([topic])
    if volume_data:
        results["seed_volume"] = volume_data[0].get("search_volume")
        vol_str = f"{results['seed_volume']:,}" if results['seed_volume'] else "No data"
        print(f"\nSeed keyword volume: {vol_str} monthly searches")

    # 2. Get related keywords
    print("\n🔍 Finding related keywords...")
    related = client.get_related_keywords(topic, depth=2, limit=50)
    results["related_keywords"] = related[:20]  # Top 20

    if related:
        print(f"\nTop related keywords ({len(related)} found):")
        for i, kw in enumerate(related[:10], 1):
            vol = f"{kw['search_volume']:,}" if kw['search_volume'] else "N/A"
            print(f"  {i}. {kw['keyword']} ({vol})")

    # 3. Analyze competitor ASINs if provided
    if comp_asins:
        print(f"\n📚 Analyzing {len(comp_asins)} competitor(s)...")
        all_comp_keywords = {}

        for asin in comp_asins:
            print(f"  - ASIN: {asin}")
            comp_kws = client.get_product_keywords(asin, limit=30)
            for kw in comp_kws:
                keyword = kw["keyword"]
                if keyword not in all_comp_keywords:
                    all_comp_keywords[keyword] = {
                        "keyword": keyword,
                        "search_volume": kw["search_volume"],
                        "competitor_count": 0,
                    }
                all_comp_keywords[keyword]["competitor_count"] += 1

        # Sort by volume and competitor overlap
        sorted_comp = sorted(
            all_comp_keywords.values(),
            key=lambda x: (x["competitor_count"], x["search_volume"] or 0),
            reverse=True
        )
        results["competitor_keywords"] = sorted_comp[:20]

        if sorted_comp:
            print(f"\nCompetitor keyword overlap:")
            for kw in sorted_comp[:10]:
                vol = f"{kw['search_volume']:,}" if kw['search_volume'] else "N/A"
                print(f"  - {kw['keyword']} (vol: {vol}, comps: {kw['competitor_count']})")

    # 4. Generate recommendations
    print("\n💡 Keyword Slot Recommendations:")
    print("-" * 50)

    recommendations = generate_keyword_recommendations(results)
    results["recommendations"] = recommendations

    for i, rec in enumerate(recommendations, 1):
        print(f"\nSlot {i}: {rec['strategy']}")
        print(f"  Suggested: {rec['keywords']}")
        print(f"  Rationale: {rec['rationale']}")

    # Output
    if output_format == "json":
        return results

    return results


def generate_keyword_recommendations(data: dict) -> List[dict]:
    """
    Generate 7-slot keyword recommendations based on analysis.

    Uses the semantic keyword strategy from kdp-keyword-optimizer skill.
    """
    topic = data["topic"]
    related = data.get("related_keywords", [])
    comp_keywords = data.get("competitor_keywords", [])

    # Extract high-volume related terms
    high_vol_related = [kw["keyword"] for kw in related[:5] if kw.get("search_volume")]

    # Extract competitor overlap terms
    overlap_terms = [kw["keyword"] for kw in comp_keywords[:5]]

    recommendations = [
        {
            "slot": 1,
            "strategy": "Primary topic + audience",
            "keywords": f"{topic} guide book",
            "rationale": "Core topic phrase with format modifier",
        },
        {
            "slot": 2,
            "strategy": "Secondary topic + crossover",
            "keywords": high_vol_related[0] if high_vol_related else "[use highest volume related term]",
            "rationale": "Highest volume related keyword from DataForSEO",
        },
        {
            "slot": 3,
            "strategy": "Reader outcomes + emotions",
            "keywords": "[describe transformation/feeling]",
            "rationale": "What will readers GAIN? Use review language.",
        },
        {
            "slot": 4,
            "strategy": "Specific use case or format",
            "keywords": "[devotional/workbook/journal/guide]",
            "rationale": "How/when will they use it?",
        },
        {
            "slot": 5,
            "strategy": "Comparable works/authors",
            "keywords": overlap_terms[0] if overlap_terms else "[fans of X author]",
            "rationale": "Competitor keyword overlap from ASIN analysis",
        },
        {
            "slot": 6,
            "strategy": "Problem/solution angle",
            "keywords": high_vol_related[1] if len(high_vol_related) > 1 else "[problem keyword]",
            "rationale": "Second-highest volume related term",
        },
        {
            "slot": 7,
            "strategy": "Category cementing",
            "keywords": "[category-specific terms]",
            "rationale": "Reinforce target category placement",
        },
    ]

    return recommendations


def main():
    parser = argparse.ArgumentParser(
        description="Amazon KDP Category & Keyword Analyzer"
    )
    parser.add_argument(
        "topic",
        help="Main topic/keyword for your book"
    )
    parser.add_argument(
        "--comp-asins",
        nargs="+",
        help="Competitor ASINs to analyze (space-separated)"
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Output as JSON"
    )
    parser.add_argument(
        "--output",
        "-o",
        help="Save results to file"
    )

    args = parser.parse_args()

    output_format = "json" if args.json else "text"
    results = analyze_topic(args.topic, args.comp_asins, output_format)

    if args.output:
        with open(args.output, "w") as f:
            json.dump(results, f, indent=2)
        print(f"\n✅ Results saved to {args.output}")


if __name__ == "__main__":
    main()
