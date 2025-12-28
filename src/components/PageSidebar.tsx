import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { Heading } from "../utils/extractHeadings";
import { ChevronRight } from "lucide-react";

interface PageSidebarProps {
  headings: Heading[];
  activeId?: string;
}

interface HeadingNode extends Heading {
  children: HeadingNode[];
}

// Build a tree structure from flat headings array
function buildHeadingTree(headings: Heading[]): HeadingNode[] {
  const tree: HeadingNode[] = [];
  const stack: HeadingNode[] = [];

  headings.forEach((heading) => {
    const node: HeadingNode = { ...heading, children: [] };

    // Pop stack until we find the parent (heading with lower level)
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      // Root level heading
      tree.push(node);
    } else {
      // Child of the last heading in stack
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  });

  return tree;
}

// Load expanded state from localStorage
function loadExpandedState(headings: Heading[]): Set<string> {
  const stored = localStorage.getItem("page-sidebar-expanded-state");
  if (stored) {
    try {
      const storedIds = new Set(JSON.parse(stored));
      // Only return stored IDs that still exist in headings
      return new Set(
        headings.filter((h) => storedIds.has(h.id)).map((h) => h.id),
      );
    } catch {
      // If parse fails, return empty (collapsed)
    }
  }
  // Default: all headings collapsed
  return new Set();
}

// Save expanded state to localStorage
function saveExpandedState(expanded: Set<string>): void {
  localStorage.setItem(
    "page-sidebar-expanded-state",
    JSON.stringify(Array.from(expanded)),
  );
}

// Get absolute top position of an element
function getElementTop(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  return rect.top + window.scrollY;
}

// Render a heading node recursively
function HeadingItem({
  node,
  activeId,
  expanded,
  onToggle,
  onNavigate,
  depth = 0,
}: {
  node: HeadingNode;
  activeId?: string;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  onNavigate: (id: string) => void;
  depth?: number;
}) {
  const hasChildren = node.children.length > 0;
  const isExpanded = expanded.has(node.id);
  const isActive = activeId === node.id;

  return (
    <li className="page-sidebar-item">
      <div className="page-sidebar-item-wrapper">
        {hasChildren && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggle(node.id);
            }}
            onMouseDown={(e) => {
              // Prevent link click when clicking button
              e.preventDefault();
            }}
            className={`page-sidebar-expand ${isExpanded ? "expanded" : ""}`}
            aria-label={isExpanded ? "Collapse" : "Expand"}
            aria-expanded={isExpanded}
          >
            <ChevronRight size={14} />
          </button>
        )}
        {!hasChildren && <span className="page-sidebar-spacer" />}
        <a
          href={`#${node.id}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(node.id);
          }}
          className={`page-sidebar-link page-sidebar-item-level-${node.level} ${
            isActive ? "active" : ""
          }`}
        >
          {node.text}
        </a>
      </div>
      {hasChildren && isExpanded && (
        <ul className="page-sidebar-sublist">
          {node.children.map((child) => (
            <HeadingItem
              key={child.id}
              node={child}
              activeId={activeId}
              expanded={expanded}
              onToggle={onToggle}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function PageSidebar({ headings, activeId }: PageSidebarProps) {
  const [activeHeading, setActiveHeading] = useState<string | undefined>(
    activeId,
  );
  const [expanded, setExpanded] = useState<Set<string>>(() =>
    loadExpandedState(headings),
  );

  // Track if we're currently navigating to prevent scroll handler interference
  const isNavigatingRef = useRef(false);

  // Build tree structure from headings
  const headingTree = useMemo(() => buildHeadingTree(headings), [headings]);

  // Get all heading IDs for scroll tracking
  const allHeadingIds = useMemo(() => headings.map((h) => h.id), [headings]);

  // Create a map for quick heading ID validation
  const headingIdSet = useMemo(() => new Set(allHeadingIds), [allHeadingIds]);

  // Find path to a heading ID in the tree (for expanding ancestors)
  const findPathToId = useCallback(
    (
      nodes: HeadingNode[],
      targetId: string,
      path: HeadingNode[] = [],
    ): HeadingNode[] | null => {
      for (const node of nodes) {
        const currentPath = [...path, node];
        if (node.id === targetId) {
          return currentPath;
        }
        const found = findPathToId(node.children, targetId, currentPath);
        if (found) return found;
      }
      return null;
    },
    [],
  );

  // Expand ancestors to make a heading visible in sidebar
  const expandAncestors = useCallback(
    (targetId: string) => {
      const path = findPathToId(headingTree, targetId);
      if (path && path.length > 1) {
        const newExpanded = new Set(expanded);
        let changed = false;
        // Expand all ancestors (not the target itself)
        path.slice(0, -1).forEach((node) => {
          if (!newExpanded.has(node.id)) {
            newExpanded.add(node.id);
            changed = true;
          }
        });
        if (changed) {
          setExpanded(newExpanded);
          saveExpandedState(newExpanded);
        }
      }
    },
    [expanded, headingTree, findPathToId],
  );

  // Toggle expand/collapse
  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      saveExpandedState(newExpanded);
      return newExpanded;
    });
  }, []);

  // Navigate to heading - scroll to element and update state
  const navigateToHeading = useCallback(
    (id: string) => {
      // Expand ancestors first so sidebar shows the target
      expandAncestors(id);

      // Use requestAnimationFrame to ensure DOM updates are complete
      requestAnimationFrame(() => {
        const element = document.getElementById(id);
        if (!element) {
          return;
        }

        // Set flag to prevent scroll handler from changing active heading
        isNavigatingRef.current = true;

        // Calculate scroll position with offset for fixed header (80px)
        const headerOffset = 80;
        const elementTop = getElementTop(element);
        const targetPosition = elementTop - headerOffset;

        // Scroll to the target position
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: "smooth",
        });

        // Update URL hash
        window.history.pushState(null, "", `#${id}`);

        // Update active heading
        setActiveHeading(id);

        // Reset navigation flag after scroll completes
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 1000);
      });
    },
    [expandAncestors],
  );

  // Handle initial URL hash on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && headingIdSet.has(hash)) {
      // Delay to ensure DOM is ready and headings are rendered
      const timeoutId = setTimeout(() => {
        navigateToHeading(hash);
      }, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [headingIdSet, navigateToHeading]);

  // Handle hash changes (back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && headingIdSet.has(hash)) {
        navigateToHeading(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [headingIdSet, navigateToHeading]);

  // Update active heading on scroll
  useEffect(() => {
    if (allHeadingIds.length === 0) return;

    const handleScroll = () => {
      // Don't update if we're in the middle of navigating
      if (isNavigatingRef.current) return;

      const scrollPosition = window.scrollY + 120; // Offset for header

      // Find the heading that's currently in view
      for (let i = allHeadingIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(allHeadingIds[i]);
        if (element) {
          const elementTop = getElementTop(element);
          if (elementTop <= scrollPosition) {
            const newActiveId = allHeadingIds[i];
            setActiveHeading((prev) => {
              // Only update if different - don't expand ancestors on scroll
              // User can manually collapse/expand sections
              return prev !== newActiveId ? newActiveId : prev;
            });
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [allHeadingIds]);

  // Auto-expand to show active heading from props
  useEffect(() => {
    if (activeId) {
      expandAncestors(activeId);
    }
  }, [activeId, expandAncestors]);

  if (headings.length === 0) return null;

  return (
    <nav className="page-sidebar">
      <ul className="page-sidebar-list">
        {headingTree.map((node) => (
          <HeadingItem
            key={node.id}
            node={node}
            activeId={activeHeading}
            expanded={expanded}
            onToggle={toggleExpand}
            onNavigate={navigateToHeading}
          />
        ))}
      </ul>
    </nav>
  );
}
