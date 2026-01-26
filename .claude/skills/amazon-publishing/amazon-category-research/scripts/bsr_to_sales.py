#!/usr/bin/env python3
"""
BSR to Daily Sales Estimator

Converts Amazon Best Sellers Rank (BSR) to estimated daily sales.
Based on Kindlepreneur's research and calculator.

Usage:
    python bsr_to_sales.py 5000
    python bsr_to_sales.py 5000 25000 --compare
"""

import argparse
import sys


def bsr_to_daily_sales(bsr: int) -> float:
    """
    Convert BSR to estimated daily sales.

    This uses a logarithmic approximation based on Kindlepreneur's research.
    Actual sales vary by category, time of year, and market conditions.

    Args:
        bsr: Amazon Best Sellers Rank (integer, 1 or higher)

    Returns:
        Estimated daily sales (float)
    """
    if bsr <= 0:
        raise ValueError("BSR must be a positive integer")

    # Approximation formula based on Kindlepreneur data
    # These are rough estimates - actual relationship is more complex
    if bsr <= 100:
        return 100 + (100 - bsr)  # Top 100 = 100-200 sales/day
    elif bsr <= 1000:
        return 100 - (bsr - 100) * 0.083  # 100-1000 = ~25-100 sales/day
    elif bsr <= 5000:
        return 25 - (bsr - 1000) * 0.005  # 1000-5000 = ~5-25 sales/day
    elif bsr <= 10000:
        return 5 - (bsr - 5000) * 0.0006  # 5000-10000 = ~2-5 sales/day
    elif bsr <= 50000:
        return 2 - (bsr - 10000) * 0.000025  # 10000-50000 = ~1-2 sales/day
    elif bsr <= 100000:
        return 1 - (bsr - 50000) * 0.000014  # 50000-100000 = few per week
    else:
        # Above 100000: very low sales, approaching 0
        return max(0.01, 0.3 - (bsr - 100000) * 0.0000005)


def sales_to_monthly(daily: float) -> float:
    """Convert daily sales to monthly estimate."""
    return daily * 30


def interpret_bsr(bsr: int) -> str:
    """Provide human-readable interpretation of BSR."""
    if bsr <= 100:
        return "EXCELLENT - Bestseller territory"
    elif bsr <= 1000:
        return "VERY GOOD - Strong performer"
    elif bsr <= 5000:
        return "GOOD - Solid mid-list"
    elif bsr <= 10000:
        return "FAIR - Consistent sales"
    elif bsr <= 50000:
        return "MODEST - Steady but low volume"
    elif bsr <= 100000:
        return "LOW - Few sales per week"
    else:
        return "VERY LOW - Rarely sells"


def analyze_category_competition(bsr_1: int, bsr_20: int) -> dict:
    """
    Analyze category competitiveness based on #1 and #20 BSR.

    Args:
        bsr_1: BSR of #1 book in category
        bsr_20: BSR of #20 book in category

    Returns:
        Dictionary with analysis results
    """
    gap = bsr_20 - bsr_1
    gap_ratio = bsr_20 / bsr_1 if bsr_1 > 0 else float('inf')

    # Determine competition level
    if bsr_1 < 500:
        competition = "VERY HIGH - Major category, hard to crack"
    elif bsr_1 < 5000:
        competition = "HIGH - Competitive, needs strong launch"
    elif bsr_1 < 10000:
        competition = "MEDIUM - Achievable with good marketing"
    elif bsr_1 < 50000:
        competition = "LOW - Good opportunity"
    else:
        competition = "VERY LOW - Easy to rank, but low traffic"

    # Analyze the gap
    if gap_ratio < 2:
        gap_analysis = "Tight competition - many strong books"
    elif gap_ratio < 5:
        gap_analysis = "Moderate spread - room in middle rankings"
    else:
        gap_analysis = "Top-heavy - leaders dominate, but opportunity to rank"

    return {
        "bsr_1": bsr_1,
        "bsr_20": bsr_20,
        "sales_1": bsr_to_daily_sales(bsr_1),
        "sales_20": bsr_to_daily_sales(bsr_20),
        "gap": gap,
        "gap_ratio": gap_ratio,
        "competition": competition,
        "gap_analysis": gap_analysis
    }


def main():
    parser = argparse.ArgumentParser(
        description="Convert Amazon BSR to estimated daily sales"
    )
    parser.add_argument(
        "bsr",
        type=int,
        help="Best Sellers Rank to convert"
    )
    parser.add_argument(
        "bsr_20",
        type=int,
        nargs="?",
        help="Optional: BSR of #20 in category for competition analysis"
    )
    parser.add_argument(
        "--compare",
        action="store_true",
        help="Run category competition analysis (requires bsr_20)"
    )

    args = parser.parse_args()

    if args.compare and args.bsr_20:
        # Category competition analysis
        result = analyze_category_competition(args.bsr, args.bsr_20)

        print("\n=== Category Competition Analysis ===\n")
        print(f"#1 Book BSR:  {result['bsr_1']:,}")
        print(f"#1 Est Sales: {result['sales_1']:.1f} books/day ({sales_to_monthly(result['sales_1']):.0f}/month)")
        print(f"\n#20 Book BSR: {result['bsr_20']:,}")
        print(f"#20 Est Sales: {result['sales_20']:.1f} books/day ({sales_to_monthly(result['sales_20']):.0f}/month)")
        print(f"\nBSR Gap: {result['gap']:,} (ratio: {result['gap_ratio']:.1f}x)")
        print(f"\nCompetition: {result['competition']}")
        print(f"Gap Analysis: {result['gap_analysis']}")
        print()

    else:
        # Simple BSR to sales conversion
        daily = bsr_to_daily_sales(args.bsr)
        monthly = sales_to_monthly(daily)
        interpretation = interpret_bsr(args.bsr)

        print(f"\n=== BSR Analysis ===\n")
        print(f"BSR: {args.bsr:,}")
        print(f"Est. Daily Sales: {daily:.1f} books")
        print(f"Est. Monthly Sales: {monthly:.0f} books")
        print(f"Interpretation: {interpretation}")
        print()


if __name__ == "__main__":
    main()
