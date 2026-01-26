import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import siteConfig from "../config/siteConfig";

// Sanitize schema for footer markdown (allows links, paragraphs, line breaks, images)
// style attribute is sanitized by rehypeSanitize to remove dangerous CSS
const footerSanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), "br", "img"],
  attributes: {
    ...defaultSchema.attributes,
    img: ["src", "alt", "loading", "width", "height", "style", "class"],
  },
};

// Footer component
// Renders markdown content from frontmatter footer field
// Falls back to siteConfig.footer.defaultContent if no frontmatter footer provided
// Visibility controlled by siteConfig.footer settings and frontmatter showFooter field
interface FooterProps {
  content?: string; // Markdown content from frontmatter
}

export default function Footer({ content }: FooterProps) {
  const { footer } = siteConfig;

  // Don't render if footer is globally disabled
  if (!footer.enabled) {
    return null;
  }

  // Use frontmatter content if provided, otherwise fall back to siteConfig default
  const footerContent = content || footer.defaultContent;

  // Don't render if no content available
  if (!footerContent) {
    return null;
  }

  return (
    <section className="site-footer">
      <div className="site-footer-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeRaw, [rehypeSanitize, footerSanitizeSchema]]}
          components={{
            p({ children }) {
              return <p className="site-footer-text">{children}</p>;
            },
            img({ src, alt, width, height, style, className }) {
              return (
                <span className="site-footer-image-wrapper">
                  <img
                    src={src}
                    alt={alt || ""}
                    className={className || "site-footer-image"}
                    loading="lazy"
                    width={width}
                    height={height}
                    style={style}
                  />
                  {alt && (
                    <span className="site-footer-image-caption">{alt}</span>
                  )}
                </span>
              );
            },
            a({ href, children }) {
              const isExternal = href?.startsWith("http");
              return (
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="site-footer-link"
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {footerContent}
        </ReactMarkdown>
      </div>
    </section>
  );
}
