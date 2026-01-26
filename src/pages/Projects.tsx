interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  link?: string;
  quote?: string;
  quoteAuthor?: string;
  stats?: string[];
}

const PROJECT_ITEMS: ProjectItem[] = [
  // Active professional work (highest importance)
  {
    id: "opened",
    title: "OpenEd Daily",
    description:
      "AI-first Head of Content role for education media company. 200+ newsletter editions since May 2024. Built AI-assisted production workflows for research, writing, and distribution. Managing 20k+ subscriber base.",
    category: "Newsletter + Podcast + Blog",
    image: "/images/projects/opened.png",
    link: "https://opened.co",
    stats: ["200+ editions", "20k+ subscribers", "AI-first workflow"],
  },
  {
    id: "naval",
    title: "Naval Ravikant Podcast",
    description:
      "Transcript polishing system for Naval Ravikant—investor, philosopher, and host of the Naval podcast. Custom AI skills for matching exact audio with publication-ready text. Handles complex multi-speaker conversations with high accuracy.",
    category: "Production System",
    image: "/images/projects/naval.png",
    link: "https://nav.al",
    stats: ["Custom AI skills", "Audio-text matching", "Multi-speaker support"],
  },
  // Personal platforms and tools
  {
    id: "skillstack",
    title: "Skill Stack",
    description:
      "Newsletter and skills marketplace for AI writing tools. Each skill is a portable SKILL.md file that works with any AI assistant. Built with React, Convex real-time backend, and AgentMail for newsletter delivery.",
    category: "Platform",
    image: "/images/thumbnails/skill-stack.png",
    link: "https://skillstack.md",
    stats: ["22+ skills", "Real-time backend", "Open source"],
  },
  {
    id: "raypeat",
    title: "Ray Peat Wiki",
    description:
      "RAG-powered semantic search and answer bot over 1M+ words of content. Transcribed 252+ interviews using AssemblyAI with Gemini 3 polishing. Built with Next.js, Python FastAPI, and Qdrant vector DB.",
    category: "Full-Stack App",
    image: "/images/projects/raypeat.png",
    link: "https://raypeat.wiki",
    stats: ["252+ transcripts", "RAG answer bot", "1M+ words indexed"],
  },
  {
    id: "doodle",
    title: "Doodle Reader",
    description:
      "Bulk transcription tool for podcast RSS feeds, PDFs, and YouTube videos. Subscribe to a feed and get every episode transcribed automatically. Gemini AI for intelligent summarization.",
    category: "SaaS Tool",
    image: "/images/projects/doodle.png",
    link: "https://doodlereader.com",
    stats: ["RSS bulk transcription", "AI summaries", "Multi-format"],
  },
  // Published works
  {
    id: "command",
    title: "Command the Page",
    description:
      "Self-published guide to AI-assisted writing from 2023—when AI was still in its infancy. Reached #1 in SEO category on Amazon. The frameworks here evolved into the 4S Method and eventually the skills architecture.",
    category: "Book",
    image: "/images/projects/command.png",
    link: "https://www.amazon.com/Command-Page-AI-Assisted-Future-Proof-Creative/dp/B0CQMKTPRB",
    quote:
      "Best guide on how to practically apply AI to your daily writing practice",
    quoteAuthor: "August Bradley",
    stats: ["#1 in SEO on Amazon", "Written in 2023", "AI writing guide"],
  },
  {
    id: "charliedeist",
    title: "CharlieDeist.com",
    description:
      "Personal Substack featuring original translations (including a 1920s French physical culture manual) and essays on fasting, physical culture, history, and politics.",
    category: "Substack",
    image: "/images/projects/charliedeist.png",
    link: "https://charliedeist.substack.com",
    stats: ["Original translations", "Physical culture", "Essays"],
  },
  {
    id: "psychedelic",
    title: "Psychedelic Medicine",
    description:
      "Ghostwriting for clinical psychologist Dr. Richard Louis Miller (2015). Transcribed and distilled dozens of interviews using primitive transcription technology. Published by Park Street Press.",
    category: "Book",
    image: "/images/projects/psychedelic.png",
    link: "https://www.amazon.com/Psychedelic-Medicine-Evidence-Therapeutic-Potential/dp/1620556979",
    stats: ["25k+ copies sold", "Interview-based", "Park Street Press"],
  },
];

export default function Projects() {
  return (
    <div className="projects-page">
      <header className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-description">
          Products, publications, and production systems built with AI-assisted
          workflows.
        </p>
      </header>

      <div className="projects-grid">
        {PROJECT_ITEMS.map((item) => (
          <div key={item.id} className="projects-card">
            {item.image && (
              <div className="projects-card-image">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={225}
                  style={{ aspectRatio: "16/9", objectFit: "cover" }}
                />
              </div>
            )}
            <div className="projects-card-content">
              <span className="projects-card-category">{item.category}</span>
              <h3 className="projects-card-title">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects-card-link"
                  >
                    {item.title}
                    <span className="projects-external-icon">↗</span>
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              <p className="projects-card-description">{item.description}</p>
              {item.quote && (
                <blockquote className="projects-card-quote">
                  "{item.quote}"
                  {item.quoteAuthor && (
                    <cite className="projects-card-quote-author">
                      — {item.quoteAuthor}
                    </cite>
                  )}
                </blockquote>
              )}
              {item.stats && (
                <div className="projects-card-stats">
                  {item.stats.map((stat, i) => (
                    <span key={i} className="projects-card-stat">
                      {stat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="projects-cta">
        <p>
          Interested in working together?{" "}
          <a href="mailto:charlie@skillstack.md">Get in touch</a>
        </p>
      </div>
    </div>
  );
}
