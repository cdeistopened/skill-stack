import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { MagnifyingGlass, X, FileText, Article, ArrowRight } from "@phosphor-icons/react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Fetch search results from Convex
  const results = useQuery(
    api.search.search,
    searchQuery.trim() ? { query: searchQuery } : "skip"
  );

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setSearchQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!results || results.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            const result = results[selectedIndex];
            const url = result.anchor ? `/${result.slug}#${result.anchor}` : `/${result.slug}`;
            navigate(url);
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [results, selectedIndex, navigate, onClose]
  );

  // Handle clicking on a result
  const handleResultClick = (slug: string, anchor?: string) => {
    const url = anchor ? `/${slug}#${anchor}` : `/${slug}`;
    navigate(url);
    onClose();
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-backdrop" onClick={handleBackdropClick}>
      <div className="search-modal">
        {/* Search input */}
        <div className="search-modal-input-wrapper">
          <MagnifyingGlass size={20} className="search-modal-icon" weight="bold" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search posts and pages..."
            className="search-modal-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <button onClick={onClose} className="search-modal-close" aria-label="Close search">
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Search results */}
        <div className="search-modal-results">
          {searchQuery.trim() === "" ? (
            <div className="search-modal-hint">
              <p>Type to search posts and pages</p>
              <div className="search-modal-shortcuts">
                <span className="search-shortcut">
                  <kbd>↑</kbd><kbd>↓</kbd> Navigate
                </span>
                <span className="search-shortcut">
                  <kbd>↵</kbd> Select
                </span>
                <span className="search-shortcut">
                  <kbd>Esc</kbd> Close
                </span>
              </div>
            </div>
          ) : results === undefined ? (
            <div className="search-modal-loading">Searching...</div>
          ) : results.length === 0 ? (
            <div className="search-modal-empty">
              No results found for "{searchQuery}"
            </div>
          ) : (
            <ul className="search-results-list">
              {results.map((result, index) => (
                <li key={result._id}>
                  <button
                    className={`search-result-item ${index === selectedIndex ? "selected" : ""}`}
                    onClick={() => handleResultClick(result.slug, result.anchor)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="search-result-icon">
                      {result.type === "post" ? (
                        <Article size={20} weight="regular" />
                      ) : (
                        <FileText size={20} weight="regular" />
                      )}
                    </div>
                    <div className="search-result-content">
                      <div className="search-result-title">{result.title}</div>
                      <div className="search-result-snippet">{result.snippet}</div>
                    </div>
                    <div className="search-result-type">
                      {result.type === "post" ? "Post" : "Page"}
                    </div>
                    <ArrowRight size={16} className="search-result-arrow" weight="bold" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with keyboard hints */}
        {results && results.length > 0 && (
          <div className="search-modal-footer">
            <span className="search-footer-hint">
              <kbd>↵</kbd> to select
            </span>
            <span className="search-footer-hint">
              <kbd>↑</kbd><kbd>↓</kbd> to navigate
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

