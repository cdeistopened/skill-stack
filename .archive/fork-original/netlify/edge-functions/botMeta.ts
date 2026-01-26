import type { Context } from "@netlify/edge-functions";

// Social preview bots that need OG metadata HTML
// These bots cannot render JavaScript and need pre-rendered OG tags
const SOCIAL_PREVIEW_BOTS = [
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "slackbot",
  "discordbot",
  "telegrambot",
  "whatsapp",
  "pinterest",
  "opengraph",
  "opengraphbot",
  "embedly",
  "vkshare",
  "quora link preview",
  "redditbot",
  "rogerbot",
  "showyoubot",
];

// AI crawlers that should get raw content, not OG previews
const AI_CRAWLERS = [
  "gptbot",
  "chatgpt",
  "chatgpt-user",
  "oai-searchbot",
  "claude-web",
  "claudebot",
  "anthropic",
  "anthropic-ai",
  "ccbot",
  "perplexitybot",
  "perplexity",
  "cohere-ai",
  "bytespider",
  "googleother",
  "google-extended",
];

// Check if user agent is a social preview bot
function isSocialPreviewBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return SOCIAL_PREVIEW_BOTS.some((bot) => ua.includes(bot));
}

// Check if user agent is an AI crawler
function isAICrawler(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return AI_CRAWLERS.some((bot) => ua.includes(bot));
}

export default async function handler(
  request: Request,
  context: Context,
): Promise<Response> {
  const url = new URL(request.url);

  // HARD BYPASS: Never intercept these paths regardless of user agent
  // This is the first check to guarantee static files are served directly
  if (
    url.pathname.startsWith("/raw/") ||
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/.netlify/") ||
    url.pathname.endsWith(".md") ||
    url.pathname.endsWith(".xml") ||
    url.pathname.endsWith(".txt") ||
    url.pathname.endsWith(".yaml") ||
    url.pathname.endsWith(".json") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".ico") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".gif") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js")
  ) {
    return context.next();
  }

  const userAgent = request.headers.get("user-agent");

  // Let AI crawlers through to normal content - they need raw data, not OG previews
  if (isAICrawler(userAgent)) {
    return context.next();
  }

  // Only intercept post pages for bots
  const pathParts = url.pathname.split("/").filter(Boolean);

  // Skip home page and any path with a file extension
  if (pathParts.length === 0 || pathParts[0].includes(".")) {
    return context.next();
  }

  // Only serve OG metadata to social preview bots, not search engines or AI
  if (!isSocialPreviewBot(userAgent)) {
    return context.next();
  }

  // For social preview bots, fetch the Open Graph metadata from Convex
  const slug = pathParts[0];
  const convexUrl =
    Deno.env.get("VITE_CONVEX_URL") || Deno.env.get("CONVEX_URL");

  if (!convexUrl) {
    return context.next();
  }

  try {
    // Construct the Convex site URL for the HTTP endpoint
    const convexSiteUrl = convexUrl.replace(".cloud", ".site");
    const metaUrl = `${convexSiteUrl}/meta/post?slug=${encodeURIComponent(slug)}`;

    const response = await fetch(metaUrl, {
      headers: {
        Accept: "text/html",
      },
    });

    if (response.ok) {
      const html = await response.text();
      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=60, s-maxage=300",
        },
      });
    }

    // If meta endpoint fails, fall back to SPA
    return context.next();
  } catch {
    return context.next();
  }
}
