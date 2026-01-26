import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

interface BlogHeroCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime?: string;
  image?: string;
  excerpt?: string;
  authorName?: string;
  authorImage?: string;
}

// Hero card component for featured blog post on /blog page
// Displays as a large card with image on left, content on right (like Giga.ai/news)
export default function BlogHeroCard({
  slug,
  title,
  description,
  date,
  tags,
  readTime,
  image,
  excerpt,
  authorName,
  authorImage,
}: BlogHeroCardProps) {
  return (
    <Link to={`/${slug}`} className="blog-hero-card">
      {/* Hero image on the left */}
      {image && (
        <div className="blog-hero-image-wrapper">
          <img
            src={image}
            alt={title}
            className="blog-hero-image"
            loading="eager"
          />
        </div>
      )}

      {/* Content on the right */}
      <div className="blog-hero-content">
        {/* Tags displayed as labels */}
        {tags.length > 0 && (
          <div className="blog-hero-tags">
            {tags.slice(0, 2).map((tag) => (
              <span key={tag} className="blog-hero-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Date */}
        <time className="blog-hero-date">
          {format(parseISO(date), "MMM d, yyyy").toUpperCase()}
        </time>

        {/* Title */}
        <h2 className="blog-hero-title">{title}</h2>

        {/* Description or excerpt */}
        <p className="blog-hero-excerpt">{excerpt || description}</p>

        {/* Author info and read more */}
        <div className="blog-hero-footer">
          {authorName && (
            <div className="blog-hero-author">
              {authorImage && (
                <img
                  src={authorImage}
                  alt={authorName}
                  className="blog-hero-author-image"
                />
              )}
              <span className="blog-hero-author-name">{authorName}</span>
            </div>
          )}
          {readTime && <span className="blog-hero-read-time">{readTime}</span>}
          <span className="blog-hero-read-more">Read more</span>
        </div>
      </div>
    </Link>
  );
}
