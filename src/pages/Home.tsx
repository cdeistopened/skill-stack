import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import PostList from "../components/PostList";
import FeaturedCards from "../components/FeaturedCards";
import LogoMarquee from "../components/LogoMarquee";
import GitHubContributions from "../components/GitHubContributions";
import Footer from "../components/Footer";
import SocialFooter from "../components/SocialFooter";
import NewsletterSignup from "../components/NewsletterSignup";
import siteConfig from "../config/siteConfig";

// Local storage key for view mode preference
const VIEW_MODE_KEY = "featured-view-mode";

export default function Home() {
  // Fetch published posts from Convex (only if showing on home)
  const posts = useQuery(
    api.posts.getAllPosts,
    siteConfig.postsDisplay.showOnHome ? {} : "skip",
  );

  // Fetch featured posts and pages from Convex (for list view)
  const featuredPosts = useQuery(api.posts.getFeaturedPosts);
  const featuredPages = useQuery(api.pages.getFeaturedPages);

  // State for view mode toggle (list or cards)
  const [viewMode, setViewMode] = useState<"list" | "cards">(
    siteConfig.featuredViewMode,
  );

  // Load saved view mode preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(VIEW_MODE_KEY);
    if (saved === "list" || saved === "cards") {
      setViewMode(saved);
    }
  }, []);

  // Toggle view mode and save preference
  const toggleViewMode = () => {
    const newMode = viewMode === "list" ? "cards" : "list";
    setViewMode(newMode);
    localStorage.setItem(VIEW_MODE_KEY, newMode);
  };

  // Render logo gallery based on position config
  const renderLogoGallery = (position: "above-footer" | "below-featured") => {
    if (siteConfig.logoGallery.position === position) {
      return <LogoMarquee config={siteConfig.logoGallery} />;
    }
    return null;
  };

  // Build featured list for list view from Convex data
  const getFeaturedList = () => {
    if (featuredPosts === undefined || featuredPages === undefined) {
      return [];
    }

    // Combine posts and pages, sort by featuredOrder
    const combined = [
      ...featuredPosts.map((p) => ({
        title: p.title,
        slug: p.slug,
        featuredOrder: p.featuredOrder ?? 999,
      })),
      ...featuredPages.map((p) => ({
        title: p.title,
        slug: p.slug,
        featuredOrder: p.featuredOrder ?? 999,
      })),
    ];

    return combined.sort((a, b) => a.featuredOrder - b.featuredOrder);
  };

  const featuredList = getFeaturedList();
  const hasFeaturedContent = featuredList.length > 0;

  // Check if posts should be shown on homepage
  const showPostsOnHome = siteConfig.postsDisplay.showOnHome;

  return (
    <div className="home">
      {/* Header section with intro */}
      <header className="home-header">
        {/* Optional site logo */}
        {siteConfig.logo && (
          <img
            src={siteConfig.logo}
            alt={siteConfig.name}
            className="home-logo"
          />
        )}
        <h1 className="home-name">{siteConfig.name}</h1>

        {/* Intro with JSX support for links */}
        <p className="home-intro">
          An open-source publishing framework built for AI agents and developers
          <br></br>
          to ship websites, docs, or blogs. <br></br>
          <br /> Write markdown, sync from the terminal.{" "}
          <a
            href="https://github.com/waynesutton/markdown-site"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fork it
          </a>
          , customize it, ship it.
        </p>

        <p className="home-bio">{siteConfig.bio}</p>

        {/* Newsletter signup (below-intro position) */}
        {siteConfig.newsletter?.enabled &&
          siteConfig.newsletter.signup.home.enabled &&
          siteConfig.newsletter.signup.home.position === "below-intro" && (
            <NewsletterSignup source="home" />
          )}

        {/* Featured section with optional view toggle */}
        {hasFeaturedContent && (
          <div className="home-featured">
            <div className="home-featured-header">
              <p className="home-featured-intro">Get started:</p>
              {siteConfig.showViewToggle && (
                <button
                  className="view-toggle-button"
                  onClick={toggleViewMode}
                  aria-label={`Switch to ${viewMode === "list" ? "card" : "list"} view`}
                >
                  {viewMode === "list" ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  )}
                </button>
              )}
            </div>

            {/* Render list or card view based on mode */}
            {viewMode === "list" ? (
              <ul className="home-featured-list">
                {featuredList.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/${item.slug}`} className="home-featured-link">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <FeaturedCards useFrontmatter={true} />
            )}
          </div>
        )}
      </header>

      {/* Logo gallery (below-featured position) */}
      {renderLogoGallery("below-featured")}

      {/* Blog posts section - conditionally shown based on config */}
      {showPostsOnHome && (
        <section id="posts" className="home-posts">
          {posts === undefined ? null : posts.length === 0 ? (
            <p className="no-posts">No posts yet. Check back soon!</p>
          ) : (
            <>
              <PostList
                posts={
                  siteConfig.postsDisplay.homePostsLimit
                    ? posts.slice(0, siteConfig.postsDisplay.homePostsLimit)
                    : posts
                }
              />
              {/* Show "read more" link if enabled and there are more posts than the limit */}
              {siteConfig.postsDisplay.homePostsReadMore?.enabled &&
                siteConfig.postsDisplay.homePostsLimit &&
                posts.length > siteConfig.postsDisplay.homePostsLimit && (
                  <div className="home-posts-read-more">
                    <Link
                      to={siteConfig.postsDisplay.homePostsReadMore.link}
                      className="home-posts-read-more-link"
                    >
                      {siteConfig.postsDisplay.homePostsReadMore.text}
                    </Link>
                  </div>
                )}
            </>
          )}
        </section>
      )}

      {/* GitHub contributions graph - above logo gallery */}
      {siteConfig.gitHubContributions?.enabled && (
        <GitHubContributions config={siteConfig.gitHubContributions} />
      )}

      {/* Logo gallery (above-footer position) */}
      {renderLogoGallery("above-footer")}

      {/* Newsletter signup (above-footer position) */}
      {siteConfig.newsletter?.enabled &&
        siteConfig.newsletter.signup.home.enabled &&
        siteConfig.newsletter.signup.home.position === "above-footer" && (
          <NewsletterSignup source="home" />
        )}

      {/* Footer section */}
      {siteConfig.footer.enabled && siteConfig.footer.showOnHomepage && (
        <Footer content={siteConfig.footer.defaultContent} />
      )}

      {/* Social footer section */}
      {siteConfig.socialFooter?.enabled && siteConfig.socialFooter.showOnHomepage && (
        <SocialFooter />
      )}
    </div>
  );
}
