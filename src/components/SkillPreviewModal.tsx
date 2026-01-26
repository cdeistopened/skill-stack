import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface SkillPreviewModalProps {
  skillId: string;
  skillName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function SkillPreviewModal({
  skillId,
  skillName,
  isOpen,
  onClose,
}: SkillPreviewModalProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const loadSkill = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/skills/${skillId}/SKILL.md`);
        if (!response.ok) {
          throw new Error("Skill file not found");
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError("Failed to load skill preview");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSkill();
  }, [isOpen, skillId]);

  if (!isOpen) return null;

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="modal-container">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h2 className="modal-title">{skillName}</h2>
            <div className="modal-header-actions">
              <button
                className="modal-copy-btn"
                onClick={handleCopy}
                disabled={loading || !!error || !content}
                aria-label="Copy skill to clipboard"
              >
                {copied ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
              <button
                className="modal-close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Body */}
          <div className="modal-body">
            {loading && (
              <div className="modal-loading">Loading skill preview...</div>
            )}
            
            {error && (
              <div className="modal-error">{error}</div>
            )}
            
            {!loading && !error && content && (
              <div className="skill-preview-content">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  className="prose"
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}