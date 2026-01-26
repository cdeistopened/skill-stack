import siteConfig from "../config/siteConfig";
import type { SocialLink } from "../config/siteConfig";
import {
  GithubLogo,
  TwitterLogo,
  LinkedinLogo,
  InstagramLogo,
  YoutubeLogo,
  TiktokLogo,
  DiscordLogo,
  Globe,
} from "@phosphor-icons/react";

// Map platform names to Phosphor icons
const platformIcons: Record<SocialLink["platform"], React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" }>> = {
  github: GithubLogo,
  twitter: TwitterLogo,
  linkedin: LinkedinLogo,
  instagram: InstagramLogo,
  youtube: YoutubeLogo,
  tiktok: TiktokLogo,
  discord: DiscordLogo,
  website: Globe,
};

// Social footer component
// Displays social icons on left and copyright on right
// Visibility controlled by siteConfig.socialFooter settings and frontmatter showSocialFooter field
export default function SocialFooter() {
  const { socialFooter } = siteConfig;

  // Don't render if social footer is globally disabled
  if (!socialFooter?.enabled) {
    return null;
  }

  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <section className="social-footer">
      <div className="social-footer-content">
        {/* Social links on the left */}
        <div className="social-footer-links">
          {socialFooter.socialLinks.map((link) => {
            const IconComponent = platformIcons[link.platform];
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-footer-link"
                aria-label={`Follow on ${link.platform}`}
              >
                <IconComponent size={20} weight="regular" />
              </a>
            );
          })}
        </div>

        {/* Copyright on the right */}
        <div className="social-footer-copyright">
          <span className="social-footer-copyright-symbol">&copy;</span>
          <span className="social-footer-copyright-name">
            {socialFooter.copyright.siteName}
          </span>
          {socialFooter.copyright.showYear && (
            <span className="social-footer-copyright-year">{currentYear}</span>
          )}
        </div>
      </div>
    </section>
  );
}
