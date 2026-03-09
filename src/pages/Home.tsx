import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import LogoMarquee from "../components/LogoMarquee";
import GitHubContributions from "../components/GitHubContributions";
import Footer from "../components/Footer";
import SocialFooter from "../components/SocialFooter";
import NewsletterSignup from "../components/NewsletterSignup";
import siteConfig from "../config/siteConfig";

// Featured post slugs - curated selection with best thumbnails and titles
const FEATURED_SLUGS = [
  "4s-framework", // Foundational framework post
  "transform", // Core philosophy
  "alchemy", // Strong visual, great title
  "prompt-101", // Mechanical sympathy concept
  "man-machine", // Miyazaki contrarian hook
  "chicken", // Attention-grabbing story
  "didion", // Literary voice matching
  "mule", // Anti-unicorn positioning
  "automation-trap", // Naval's Razor
  "knowledge-base", // Practical second brain
];

export default function Home() {
  // Fetch published posts from Convex
  const posts = useQuery(api.posts.getAllPosts, {});

  // State for expanded year sections
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({
    "2024": true,
    "2023": false,
  });

  // Toggle year expansion
  const toggleYear = (year: string) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  // Render logo gallery based on position config
  const renderLogoGallery = (position: "above-footer" | "below-featured") => {
    if (siteConfig.logoGallery.position === position) {
      return <LogoMarquee config={siteConfig.logoGallery} />;
    }
    return null;
  };

  // Get featured posts (specific posts with thumbnails)
  const featuredPosts = posts
    ? FEATURED_SLUGS.map((slug) => posts.find((p) => p.slug === slug)).filter(
        Boolean,
      )
    : [];

  // Get remaining posts grouped by year (excluding featured)
  const getPostsByYear = () => {
    if (!posts) return {};

    const remaining = posts.filter((p) => !FEATURED_SLUGS.includes(p.slug));

    const grouped: Record<string, typeof remaining> = {};
    remaining.forEach((post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(post);
    });

    return grouped;
  };

  const postsByYear = getPostsByYear();
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="home">
      {/* Header section */}
      <header className="home-header">
        {siteConfig.logo && (
          <img
            src={siteConfig.logo}
            alt={siteConfig.name}
            className="home-logo"
            loading="eager"
            decoding="async"
          />
        )}
        <h1 className="home-name">{siteConfig.name}</h1>
        <p className="home-bio">{siteConfig.bio}</p>
      </header>

      {/* Skills-first: quick install section */}
      <section className="home-install">
        <h2 className="home-install-title">Get started</h2>
        <div className="home-install-steps">
          <div className="home-install-step">
            <span className="home-install-step-number">1</span>
            <div>
              <strong>Browse skills</strong>
              <p>Pick a SKILL.md from the <Link to="/skills">catalog</Link></p>
            </div>
          </div>
          <div className="home-install-step">
            <span className="home-install-step-number">2</span>
            <div>
              <strong>Install</strong>
              <code className="home-install-code">mkdir -p .claude/skills && cp SKILL.md .claude/skills/my-skill/</code>
            </div>
          </div>
          <div className="home-install-step">
            <span className="home-install-step-number">3</span>
            <div>
              <strong>Use it</strong>
              <p>Claude Code reads it automatically. Just start working.</p>
            </div>
          </div>
        </div>
        <Link to="/skills" className="home-install-cta">
          Browse all skills →
        </Link>
      </section>

      {/* Newsletter signup — below install */}
      {siteConfig.newsletter?.enabled && (
        <section className="home-newsletter">
          <NewsletterSignup
            source="home"
            title="Get new skills in your inbox."
            description="One SKILL.md + tutorial every Monday. Free."
          />
        </section>
      )}

      {/* Featured posts section */}
      {featuredPosts.length > 0 && (
        <section className="home-featured-posts">
          <h2 className="home-featured-title">Essays</h2>
          <div className="home-featured-grid">
            {featuredPosts.map((post) => (
              <Link
                key={post!.slug}
                to={`/${post!.slug}`}
                className="home-featured-card"
              >
                {post!.image && (
                  <div className="home-featured-card-image">
                    <img
                      src={post!.image}
                      alt={post!.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="home-featured-card-content">
                  <h3 className="home-featured-card-title">{post!.title}</h3>
                  <span className="home-featured-card-date">
                    {new Date(post!.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Archive posts by year */}
      {years.length > 0 && (
        <section className="home-archive">
          <h2 className="home-archive-title">Archive</h2>
          {years.map((year) => (
            <div key={year} className="home-archive-year">
              <button
                className="home-archive-year-toggle"
                onClick={() => toggleYear(year)}
                aria-expanded={expandedYears[year]}
              >
                <span className="home-archive-year-label">{year}</span>
                <span className="home-archive-year-count">
                  {postsByYear[year].length} posts
                </span>
                <svg
                  className={`home-archive-year-icon ${expandedYears[year] ? "expanded" : ""}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {expandedYears[year] && (
                <ul className="home-archive-list">
                  {postsByYear[year].map((post) => (
                    <li key={post.slug} className="home-archive-item">
                      <Link to={`/${post.slug}`} className="home-archive-link">
                        <span className="home-archive-item-title">
                          {post.title}
                        </span>
                        <span className="home-archive-item-date">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {renderLogoGallery("below-featured")}

      {siteConfig.gitHubContributions?.enabled && (
        <GitHubContributions config={siteConfig.gitHubContributions} />
      )}

      {renderLogoGallery("above-footer")}

      {siteConfig.footer.enabled && siteConfig.footer.showOnHomepage && (
        <Footer content={siteConfig.footer.defaultContent} />
      )}

      {siteConfig.socialFooter?.enabled &&
        siteConfig.socialFooter.showOnHomepage && <SocialFooter />}
    </div>
  );
}
