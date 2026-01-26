import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "@phosphor-icons/react";

// Scroll-to-top configuration
export interface ScrollToTopConfig {
  enabled: boolean; // Show/hide the button
  threshold: number; // Pixels scrolled before button appears
  smooth: boolean; // Use smooth scrolling animation
}

// Default configuration - enabled by default
export const defaultScrollToTopConfig: ScrollToTopConfig = {
  enabled: true,
  threshold: 300, // Show after scrolling 300px
  smooth: true,
};

interface ScrollToTopProps {
  config?: Partial<ScrollToTopConfig>;
}

/**
 * Scroll-to-top button component
 * Appears after user scrolls past threshold
 * Uses Phosphor ArrowUp icon and theme-aware styling
 */
export default function ScrollToTop({ config }: ScrollToTopProps) {
  // Merge provided config with defaults
  const mergedConfig: ScrollToTopConfig = {
    ...defaultScrollToTopConfig,
    ...config,
  };

  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position and update visibility
  const checkScrollPosition = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollY > mergedConfig.threshold);
  }, [mergedConfig.threshold]);

  // Set up scroll listener
  useEffect(() => {
    if (!mergedConfig.enabled) return;

    // Check initial position
    checkScrollPosition();

    // Add scroll listener with passive flag for performance
    window.addEventListener("scroll", checkScrollPosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, [mergedConfig.enabled, checkScrollPosition]);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: mergedConfig.smooth ? "smooth" : "auto",
    });
  };

  // Don't render if disabled or not visible
  if (!mergedConfig.enabled || !isVisible) {
    return null;
  }

  return (
    <button
      className="scroll-to-top"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUp size={20} weight="bold" />
    </button>
  );
}

