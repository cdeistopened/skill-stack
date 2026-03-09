import { useState } from "react";
import SkillPreviewModal from "../components/SkillPreviewModal";

// Skill data structure
interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  tier: "plug-and-play" | "light-setup" | "full-setup";
  setupTime: string;
  requires?: string;
  hasWizard: boolean;
  relatedPost?: string;
  image?: string;
  featured?: boolean;
}

// Tier labels and colors
const TIER_CONFIG: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  "plug-and-play": {
    label: "Plug & Play",
    color: "#059669",
    bgColor: "#d1fae5",
  },
  "light-setup": {
    label: "Light Setup",
    color: "#d97706",
    bgColor: "#fef3c7",
  },
  "full-setup": {
    label: "Full Setup",
    color: "#7c3aed",
    bgColor: "#ede9fe",
  },
};

// Launch catalog - 7 curated skills
const SKILLS: Skill[] = [
  {
    id: "anti-ai-writing",
    name: "Anti-AI Writing",
    description:
      "Detect and eliminate AI tells. The SUCKS framework, forbidden patterns, and sticky sentences for authentic prose.",
    category: "Writing & Voice",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
    image: "/images/thumbnails/cyborg-writer.png",
  },
  {
    id: "voice-matching-wizard",
    name: "Voice Matching Wizard",
    description:
      "Analyze writing samples to create a codified voice style. Capture patterns, rhythms, and sensibilities for consistent content.",
    category: "Writing & Voice",
    tier: "light-setup",
    setupTime: "15-20 min",
    requires: "2-5 writing samples (500+ words each)",
    hasWizard: true,
    relatedPost: "/didion",
    image: "/images/thumbnails/voice-matching.png",
  },
  {
    id: "hook-and-headline-writing",
    name: "Hook & Headline Writing",
    description:
      "15 proven formulas for scroll-stopping hooks. The 4 U's test for headlines that grab attention.",
    category: "Headlines & Hooks",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
    image: "/images/thumbnails/chicken.png",
  },
  {
    id: "transcript-polisher",
    name: "Transcript Polisher",
    description:
      "Transform raw transcripts into readable documents while preserving the speaker's authentic voice.",
    category: "Editing",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
    image: "/images/thumbnails/polish.png",
  },
  {
    id: "brand-identity-wizard",
    name: "Brand Identity Wizard",
    description:
      "Create a comprehensive brand identity document. Persona, voice, audience, values, and messaging - other skills reference this.",
    category: "Setup & Meta",
    tier: "light-setup",
    setupTime: "30-60 min",
    requires: "Brand knowledge or existing materials",
    hasWizard: true,
    image: "/images/thumbnails/transform.png",
  },
  {
    id: "image-prompt-generator",
    name: "Image Prompt Generator",
    description:
      "Generate editorial thumbnails and visuals using Gemini API. Minimal, sophisticated design for blog posts and newsletters.",
    category: "Visual",
    tier: "full-setup",
    setupTime: "30+ min",
    requires: "Gemini API key",
    hasWizard: false,
    image: "/images/thumbnails/prism-risograph-v2.png",
  },
  {
    id: "dude-with-sign-writer",
    name: "Dude with a Sign Writer",
    description:
      "Punchy one-liners for social media. 12 core patterns for statements that stop the scroll.",
    category: "Headlines & Hooks",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
    image: "/images/thumbnails/honey-trap.png",
  },
  {
    id: "retardmax",
    name: "Retardmax",
    description:
      "Radical simplification for knowledge work. Stop overthinking, start shipping. The Beethoven Test, the Whoopsie Method, and five pillars of intuition-first action.",
    category: "Productivity",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
    relatedPost: "/retardmax",
  },
  {
    id: "video-generator",
    name: "Video Generator",
    description:
      "Generate AI videos with Google VEO 3.1 or OpenAI Sora. VEO for native audio and dialogue, Sora for visual quality and 12-second clips. Includes Python script and cinematic prompting guide.",
    category: "Visual",
    tier: "full-setup",
    setupTime: "15-20 min",
    requires: "Gemini API key and/or OpenAI API key",
    hasWizard: false,
  },
  // --- Featured skills ---
  {
    id: "pdf-vision",
    name: "PDF Vision",
    description:
      "Gemini vision-powered PDF to markdown. Handles scanned docs, multi-column layouts, tables, footnotes, and degraded documents that text extraction destroys. Two-tier model routing with confidence scoring and anti-hallucination detection.",
    category: "Document Processing",
    tier: "full-setup",
    setupTime: "15 min",
    requires: "Gemini API key",
    hasWizard: false,
    featured: true,
  },
  {
    id: "deep-research",
    name: "Deep Research",
    description:
      "Run Gemini Deep Research from Claude Code. Optimizes prompts for depth, then executes multi-step research via the Interactions API. Competitive landscaping, literature reviews, market research.",
    category: "Research",
    tier: "full-setup",
    setupTime: "10 min",
    requires: "Gemini API key",
    hasWizard: false,
    featured: true,
  },
  {
    id: "skill-creator",
    name: "Skill Creator",
    description:
      "Find, install, create, improve, and publish AI agent skills through the Sundial ecosystem. The meta-skill \u2014 build skills with a skill.",
    category: "Setup & Meta",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
    featured: true,
  },
  {
    id: "clear-writing",
    name: "Clear Writing Engine",
    description:
      "Write clear, human prose. Strips AI patterns, enforces hard constraints, optionally applies a voice style. Load style references for specific voices (Cowen, Koe, Lewis, Berry) or social formats.",
    category: "Writing & Voice",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
    featured: true,
  },
  // --- Voice skills ---
  {
    id: "voice-dan-koe",
    name: "Voice: Dan Koe",
    description:
      "Philosophical depth made accessible. Staccato rhythm with expansive passages, confident authority, zero hedging. Reverse-engineered from his actual articles.",
    category: "Writing & Voice",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
  },
  {
    id: "voice-tyler-cowen",
    name: "Voice: Tyler Cowen",
    description:
      "Matter-of-fact, understated, treats enormous ideas as obvious observations. The flatness is the point.",
    category: "Writing & Voice",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
  },
  {
    id: "michael-lewis-style",
    name: "Voice: Michael Lewis",
    description:
      "Earned narrative, invisible transitions, evidence that draws its own conclusions. Strips formula, scaffolding, and manufactured drama.",
    category: "Writing & Voice",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
  },
  {
    id: "voice-levine-berry",
    name: "Voice: Levine x Berry",
    description:
      "Matt Levine's dry logic-walking and parenthetical humor for analysis. Wendell Berry's meditative patience for the human sections.",
    category: "Writing & Voice",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
  },
  {
    id: "voice-trung-phan",
    name: "Voice: Trung Phan",
    description:
      "Tweets and threads with humor mechanics, format taxonomy, and structural patterns. Trend-reactive tweets, meme commentary, business/culture threads.",
    category: "Writing & Voice",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
  },
  // --- Research & Meta ---
  {
    id: "niche-scout",
    name: "Niche Scout",
    description:
      "Evaluate Amazon KDP niche profitability using BSR analysis, keyword volume, and competition scoring. Validate publishing ideas before you write.",
    category: "Research",
    tier: "full-setup",
    setupTime: "15 min",
    requires: "Apify + DataForSEO API keys",
    hasWizard: false,
  },
  {
    id: "skill-extractor",
    name: "Skill Extractor",
    description:
      "Find skills hidden in raw content \u2014 transcripts, conversations, workflows. Identifies repeatable, promptable workflows and scores them by leverage.",
    category: "Setup & Meta",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
  },
  {
    id: "gemini-writer",
    name: "Gemini Writer",
    description:
      "Delegate large-context writing to Gemini's 1M token window. Send an entire manuscript plus detailed instructions in a single pass. For book rewrites, structural refactoring, redundancy analysis.",
    category: "Writing & Voice",
    tier: "full-setup",
    setupTime: "10 min",
    requires: "Gemini API key",
    hasWizard: false,
  },
  // --- Content Ingestion ---
  {
    id: "podcast-ingest",
    name: "Podcast Ingest",
    description:
      "Transcribe podcast episodes from RSS feeds using Gemini Flash. Feed URL in, clean markdown transcripts out.",
    category: "Content Ingestion",
    tier: "full-setup",
    setupTime: "10 min",
    requires: "Gemini API key",
    hasWizard: false,
  },
  {
    id: "youtube-ingest",
    name: "YouTube Ingest",
    description:
      "Transcribe YouTube videos and playlists using Gemini Flash. URL in, structured markdown out.",
    category: "Content Ingestion",
    tier: "full-setup",
    setupTime: "10 min",
    requires: "Gemini API key",
    hasWizard: false,
  },
  {
    id: "web-scrape",
    name: "Web Scrape",
    description:
      "Scrape web pages to clean markdown with optional AI summaries. Handles JavaScript-rendered pages.",
    category: "Content Ingestion",
    tier: "light-setup",
    setupTime: "10 min",
    hasWizard: false,
  },
  {
    id: "rss-digest",
    name: "RSS Digest",
    description:
      "Fetch RSS feeds and generate AI-summarized daily digests. Your morning briefing, automated.",
    category: "Content Ingestion",
    tier: "light-setup",
    setupTime: "10 min",
    hasWizard: false,
  },
  // --- Document Processing ---
  {
    id: "pdf-form-filler",
    name: "PDF Form Filler",
    description:
      "Fill PDF forms programmatically. Tax forms, government applications, contracts \u2014 with or without AcroForm fields. Vision-based field detection for flat PDFs.",
    category: "Document Processing",
    tier: "plug-and-play",
    setupTime: "5 min",
    hasWizard: false,
  },
  {
    id: "notion-export",
    name: "Notion Export",
    description:
      "Export markdown files to Notion with proper rich text formatting. Bold, italic, links, headers, bullets, numbered lists, code blocks \u2014 all preserved.",
    category: "Productivity",
    tier: "light-setup",
    setupTime: "10 min",
    requires: "Notion API key",
    hasWizard: false,
  },
];

// Category colors
const CATEGORY_COLORS: Record<string, string> = {
  "Writing & Voice": "#3b82f6",
  "Headlines & Hooks": "#f59e0b",
  Editing: "#10b981",
  "Setup & Meta": "#6b7280",
  Visual: "#8b5cf6",
  Productivity: "#ef4444",
  Research: "#0ea5e9",
  "Content Ingestion": "#14b8a6",
  "Document Processing": "#f43f5e",
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewSkill, setPreviewSkill] = useState<Skill | null>(null);

  // Get unique categories
  const categories = [...new Set(SKILLS.map((s) => s.category))];

  // Featured skills
  const featuredSkills = SKILLS.filter((s) => s.featured);

  // Filter skills by category
  const filteredSkills = selectedCategory
    ? SKILLS.filter((s) => s.category === selectedCategory)
    : SKILLS;

  // Handle download - fetches real SKILL.md from public/skills/
  const handleDownload = async (skill: Skill) => {
    try {
      const response = await fetch(`/skills/${skill.id}/SKILL.md`);
      if (!response.ok) {
        throw new Error("Skill file not found");
      }
      const content = await response.text();

      // Create blob and trigger download
      const blob = new Blob([content], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${skill.id}.skill.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback: open the skill page directly
      window.open(`/skills/${skill.id}/SKILL.md`, "_blank");
    }
  };

  // Handle copy to clipboard - fetches real SKILL.md content
  const handleCopy = async (skill: Skill) => {
    try {
      const response = await fetch(`/skills/${skill.id}/SKILL.md`);
      let content: string;

      if (response.ok) {
        content = await response.text();
      } else {
        // Fallback to summary if file not synced yet
        const tierInfo = TIER_CONFIG[skill.tier];
        content = `# ${skill.name}\n\n${skill.description}\n\nTier: ${tierInfo.label} | Setup: ${skill.setupTime}\n\nGet the full skill at skillstack.md/skills`;
      }

      await navigator.clipboard.writeText(content);
      setCopiedId(skill.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="skills-page">
      <header className="skills-header">
        <h1 className="skills-title">Skills</h1>
        <p className="skills-description">
          Downloadable SKILL.md files you can customize and use with any AI
          tool.
        </p>
      </header>

      {/* Featured skills */}
      {!selectedCategory && featuredSkills.length > 0 && (
        <div className="skills-featured-section">
          <h2 className="skills-featured-title">Featured</h2>
          <div className="skills-featured-grid">
            {featuredSkills.map((skill) => {
              const tierInfo = TIER_CONFIG[skill.tier];
              return (
                <div key={skill.id} className="skill-card skill-card-featured">
                  {skill.image && (
                    <div className="skill-card-image">
                      <img
                        src={skill.image}
                        alt={skill.name}
                        loading="lazy"
                        decoding="async"
                        width={300}
                        height={169}
                      />
                    </div>
                  )}
                  <div className="skill-card-header">
                    <span
                      className="skill-card-category"
                      style={{ backgroundColor: CATEGORY_COLORS[skill.category] }}
                    >
                      {skill.category}
                    </span>
                    <span
                      className="skill-card-tier"
                      style={{
                        backgroundColor: tierInfo.bgColor,
                        color: tierInfo.color,
                      }}
                    >
                      {tierInfo.label}
                    </span>
                  </div>

                  <h3 className="skill-card-title">{skill.name}</h3>
                  <p className="skill-card-description">{skill.description}</p>

                  <div className="skill-card-meta">
                    <span className="skill-card-time">{skill.setupTime} setup</span>
                    {skill.requires && (
                      <span className="skill-card-requires" title={skill.requires}>
                        • Requires setup
                      </span>
                    )}
                  </div>

                  <div className="skill-card-actions">
                    <button
                      className="skill-card-btn skill-card-btn-preview"
                      onClick={() => setPreviewSkill(skill)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      View
                    </button>
                    <button
                      className="skill-card-btn skill-card-btn-primary"
                      onClick={() => handleDownload(skill)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download
                    </button>
                    <button
                      className="skill-card-btn skill-card-btn-secondary"
                      onClick={() => handleCopy(skill)}
                    >
                      {copiedId === skill.id ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Category filters */}
      <div className="skills-filters">
        <button
          className={`skills-filter-btn ${selectedCategory === null ? "active" : ""}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`skills-filter-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
            style={
              selectedCategory === cat
                ? { borderColor: CATEGORY_COLORS[cat] }
                : undefined
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="skills-grid">
        {filteredSkills.map((skill) => {
          const tierInfo = TIER_CONFIG[skill.tier];
          return (
            <div key={skill.id} className="skill-card">
              {skill.image && (
                <div className="skill-card-image">
                  <img
                    src={skill.image}
                    alt={skill.name}
                    loading="lazy"
                    decoding="async"
                    width={300}
                    height={169}
                  />
                </div>
              )}
              <div className="skill-card-header">
                <span
                  className="skill-card-category"
                  style={{ backgroundColor: CATEGORY_COLORS[skill.category] }}
                >
                  {skill.category}
                </span>
                <span
                  className="skill-card-tier"
                  style={{
                    backgroundColor: tierInfo.bgColor,
                    color: tierInfo.color,
                  }}
                >
                  {tierInfo.label}
                </span>
              </div>

              <h3 className="skill-card-title">
                {skill.name}
                {skill.hasWizard && (
                  <span
                    className="skill-card-wizard-badge"
                    title="Includes guided wizard"
                  >
                    ✨
                  </span>
                )}
              </h3>
              <p className="skill-card-description">{skill.description}</p>

              <div className="skill-card-meta">
                <span className="skill-card-time">{skill.setupTime} setup</span>
                {skill.requires && (
                  <span className="skill-card-requires" title={skill.requires}>
                    • Requires setup
                  </span>
                )}
              </div>

              <div className="skill-card-actions">
                <button
                  className="skill-card-btn skill-card-btn-preview"
                  onClick={() => setPreviewSkill(skill)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View
                </button>
                <button
                  className="skill-card-btn skill-card-btn-primary"
                  onClick={() => handleDownload(skill)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </button>
                <button
                  className="skill-card-btn skill-card-btn-secondary"
                  onClick={() => handleCopy(skill)}
                >
                  {copiedId === skill.id ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coming soon note */}
      <div className="skills-coming-soon">
        <p>
          More skills coming soon. Want to contribute?{" "}
          <a
            href="https://github.com/cdeistopened/skill-stack"
            target="_blank"
            rel="noopener noreferrer"
          >
            Submit a skill on GitHub
          </a>
        </p>
      </div>

      {/* Preview Modal */}
      {previewSkill && (
        <SkillPreviewModal
          skillId={previewSkill.id}
          skillName={previewSkill.name}
          isOpen={!!previewSkill}
          onClose={() => setPreviewSkill(null)}
        />
      )}
    </div>
  );
}
