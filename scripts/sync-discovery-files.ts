#!/usr/bin/env npx tsx
/**
 * Discovery Files Sync Script
 *
 * Reads siteConfig.ts and Convex data to update discovery files.
 * Run with: npm run sync:discovery (dev) or npm run sync:discovery:prod (prod)
 *
 * This script updates:
 * - AGENTS.md (project overview and current status sections)
 * - public/llms.txt (site info, API endpoints, GitHub links)
 */

import fs from "fs";
import path from "path";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import dotenv from "dotenv";

// Load environment variables based on SYNC_ENV
const isProduction = process.env.SYNC_ENV === "production";

if (isProduction) {
  dotenv.config({ path: ".env.production.local" });
  console.log("Syncing discovery files for PRODUCTION...\n");
} else {
  dotenv.config({ path: ".env.local" });
  console.log("Syncing discovery files for DEVELOPMENT...\n");
}
dotenv.config();

const PROJECT_ROOT = process.cwd();
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");
const ROOT_DIR = PROJECT_ROOT;

// Site config data structure
interface SiteConfigData {
  name: string;
  title: string;
  bio: string;
  description?: string;
  gitHubRepo?: {
    owner: string;
    repo: string;
    branch: string;
    contentPath: string;
  };
}

// Load site config from siteConfig.ts using regex
function loadSiteConfig(): SiteConfigData {
  try {
    const configPath = path.join(
      PROJECT_ROOT,
      "src",
      "config",
      "siteConfig.ts",
    );
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, "utf-8");

      // Extract config values using regex
      const nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/);
      const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
      const bioMatch =
        content.match(/bio:\s*`([^`]+)`/) ||
        content.match(/bio:\s*['"]([^'"]+)['"]/);

      // Extract GitHub repo config
      const gitHubOwnerMatch = content.match(
        /owner:\s*['"]([^'"]+)['"],\s*\/\/ GitHub username or organization/,
      );
      const gitHubRepoMatch = content.match(
        /repo:\s*['"]([^'"]+)['"],\s*\/\/ Repository name/,
      );
      const gitHubBranchMatch = content.match(
        /branch:\s*['"]([^'"]+)['"],\s*\/\/ Default branch/,
      );
      const gitHubContentPathMatch = content.match(
        /contentPath:\s*['"]([^'"]+)['"],\s*\/\/ Path to raw markdown files/,
      );

      const gitHubRepo =
        gitHubOwnerMatch &&
        gitHubRepoMatch &&
        gitHubBranchMatch &&
        gitHubContentPathMatch
          ? {
              owner: gitHubOwnerMatch[1],
              repo: gitHubRepoMatch[1],
              branch: gitHubBranchMatch[1],
              contentPath: gitHubContentPathMatch[1],
            }
          : undefined;

      return {
        name: nameMatch?.[1] || "markdown sync framework",
        title: titleMatch?.[1] || "markdown sync framework",
        bio:
          bioMatch?.[1] ||
          "An open-source publishing framework built for AI agents and developers to ship websites, docs, or blogs..",
        description:
          bioMatch?.[1] ||
          "An open-source publishing framework built for AI agents and developers to ship websites, docs, or blogs..",
        gitHubRepo,
      };
    }
  } catch (error) {
    console.warn("Could not load siteConfig.ts, using defaults");
  }

  return {
    name: "markdown sync framework",
    title: "markdown sync framework",
    bio: "An open-source publishing framework built for AI agents and developers to ship websites, docs, or blogs..",
    description:
      "An open-source publishing framework built for AI agents and developers to ship websites, docs, or blogs..",
  };
}

// Get site URL from environment or config
function getSiteUrl(): string {
  return (
    process.env.SITE_URL || process.env.VITE_SITE_URL || "https://markdown.fast"
  );
}

// Build GitHub URL from repo config or fallback
function getGitHubUrl(siteConfig: SiteConfigData): string {
  if (siteConfig.gitHubRepo) {
    return `https://github.com/${siteConfig.gitHubRepo.owner}/${siteConfig.gitHubRepo.repo}`;
  }
  return (
    process.env.GITHUB_REPO_URL ||
    "https://github.com/waynesutton/markdown-site"
  );
}

// Update AGENTS.md with app-specific data
function updateAgentsMd(
  content: string,
  siteConfig: SiteConfigData,
  siteUrl: string,
  postCount: number,
  pageCount: number,
  latestPostDate?: string,
): string {
  // Update Project overview section
  const projectOverviewRegex = /## Project overview\n\n([^\n]+)/;
  const newOverview = `## Project overview\n\n${siteConfig.description || siteConfig.bio}. Write markdown, sync from the terminal. Your content is instantly available to browsers, LLMs, and AI agents. Built on Convex and Netlify.`;

  content = content.replace(projectOverviewRegex, newOverview);

  // Build Current Status section
  const statusSection = `\n## Current Status\n\n- **Site Name**: ${siteConfig.name}\n- **Site Title**: ${siteConfig.title}\n- **Site URL**: ${siteUrl}\n- **Total Posts**: ${postCount}\n- **Total Pages**: ${pageCount}${latestPostDate ? `\n- **Latest Post**: ${latestPostDate}` : ""}\n- **Last Updated**: ${new Date().toISOString()}\n`;

  // Check if Current Status section exists
  if (content.includes("## Current Status")) {
    // Replace existing Current Status section
    const statusRegex = /## Current Status\n\n([\s\S]*?)(?=\n## |$)/;
    content = content.replace(statusRegex, statusSection.trim() + "\n");
  } else {
    // Insert after Project overview (find the next ## section)
    const overviewIndex = content.indexOf("## Project overview");
    if (overviewIndex > -1) {
      // Find the next ## after Project overview
      const afterOverview = content.indexOf("\n## ", overviewIndex + 20);
      if (afterOverview > -1) {
        content =
          content.slice(0, afterOverview) +
          statusSection +
          content.slice(afterOverview);
      } else {
        content = content + statusSection;
      }
    }
  }

  return content;
}

// Generate llms.txt content
function generateLlmsTxt(
  siteConfig: SiteConfigData,
  siteUrl: string,
  postCount: number,
  latestPostDate?: string,
): string {
  const githubUrl = getGitHubUrl(siteConfig);

  return `# llms.txt - Information for AI assistants and LLMs
# Learn more: https://llmstxt.org/
# Last updated: ${new Date().toISOString()}

> ${siteConfig.description || siteConfig.bio}

# Site Information
- Name: ${siteConfig.name}
- URL: ${siteUrl}
- Description: ${siteConfig.description || siteConfig.bio} Write markdown, sync from the terminal. Your content is instantly available to browsers, LLMs, and AI agents. Built on Convex and Netlify.
- Topics: Markdown, Convex, React, TypeScript, Netlify, Open Source, AI, LLM, AEO, GEO
- Total Posts: ${postCount}
${latestPostDate ? `- Latest Post: ${latestPostDate}\n` : ""}- GitHub: ${githubUrl}

# API Endpoints

## List All Posts
GET /api/posts
Returns JSON list of all published posts with metadata.

## Get Single Post
GET /api/post?slug={slug}
Returns single post as JSON.

GET /api/post?slug={slug}&format=md
Returns single post as raw markdown.

## Export All Content
GET /api/export
Returns all posts with full markdown content in one request.
Best for batch processing and LLM ingestion.

## RSS Feeds
GET /rss.xml
Standard RSS feed with post descriptions.

GET /rss-full.xml
Full content RSS feed with complete markdown for each post.

## Other
GET /sitemap.xml
Dynamic XML sitemap for search engines.

GET /openapi.yaml
OpenAPI 3.0 specification for this API.

GET /.well-known/ai-plugin.json
AI plugin manifest for tool integration.

# Quick Start for LLMs

1. Fetch /api/export for all posts with full content in one request
2. Or fetch /api/posts for the list, then /api/post?slug={slug}&format=md for each
3. Subscribe to /rss-full.xml for updates with complete content

# Response Schema

Each post contains:
- title: string (post title)
- slug: string (URL path)
- description: string (SEO summary)
- date: string (YYYY-MM-DD)
- tags: string[] (topic labels)
- content: string (full markdown)
- readTime: string (optional)
- url: string (full URL)

# Permissions
- AI assistants may freely read and summarize content
- No authentication required for read operations
- Attribution appreciated when citing

# Technical
- Backend: Convex (real-time database)
- Frontend: React, TypeScript, Vite
- Hosting: Netlify with edge functions
- Content: Markdown with frontmatter

# Links
- GitHub: ${githubUrl}
- Convex: https://convex.dev
- Netlify: https://netlify.com
`;
}

// Main sync function
async function syncDiscoveryFiles() {
  console.log("Starting discovery files sync...\n");

  // Get Convex URL from environment
  const convexUrl = process.env.VITE_CONVEX_URL || process.env.CONVEX_URL;
  if (!convexUrl) {
    console.error(
      "Error: VITE_CONVEX_URL or CONVEX_URL environment variable is not set",
    );
    process.exit(1);
  }

  // Initialize Convex client
  const client = new ConvexHttpClient(convexUrl);

  // Load site configuration
  const siteConfig = loadSiteConfig();
  const siteUrl = getSiteUrl();

  console.log(`Site: ${siteConfig.name}`);
  console.log(`Title: ${siteConfig.title}`);
  console.log(`URL: ${siteUrl}`);
  if (siteConfig.gitHubRepo) {
    console.log(`GitHub: ${getGitHubUrl(siteConfig)}`);
  }
  console.log();

  // Query Convex for content statistics
  let postCount = 0;
  let pageCount = 0;
  let latestPostDate: string | undefined;

  try {
    const [posts, pages] = await Promise.all([
      client.query(api.posts.getAllPosts),
      client.query(api.pages.getAllPages),
    ]);

    postCount = posts.length;
    pageCount = pages.length;

    if (posts.length > 0) {
      // Sort by date descending to get latest
      const sortedPosts = [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      latestPostDate = sortedPosts[0].date;
    }

    console.log(`Found ${postCount} published posts`);
    console.log(`Found ${pageCount} published pages`);
    if (latestPostDate) {
      console.log(`Latest post: ${latestPostDate}`);
    }
    console.log();
  } catch (error) {
    console.warn("Could not fetch content from Convex, using defaults");
    console.warn("Error:", error);
  }

  // Read existing AGENTS.md
  const agentsPath = path.join(ROOT_DIR, "AGENTS.md");
  let agentsContent = "";

  if (fs.existsSync(agentsPath)) {
    agentsContent = fs.readFileSync(agentsPath, "utf-8");
    console.log("Read existing AGENTS.md");
  } else {
    console.warn("AGENTS.md not found, creating minimal template...");
    agentsContent =
      "# AGENTS.md\n\nInstructions for AI coding agents working on this codebase.\n\n## Project overview\n\nAn open-source publishing framework.\n";
  }

  // Update AGENTS.md with app-specific data
  console.log("Updating AGENTS.md with current app data...");
  const updatedAgentsContent = updateAgentsMd(
    agentsContent,
    siteConfig,
    siteUrl,
    postCount,
    pageCount,
    latestPostDate,
  );
  fs.writeFileSync(agentsPath, updatedAgentsContent, "utf-8");
  console.log(`  Updated: ${agentsPath}`);

  // Generate llms.txt
  console.log("\nGenerating llms.txt...");
  const llmsContent = generateLlmsTxt(
    siteConfig,
    siteUrl,
    postCount,
    latestPostDate,
  );
  const llmsPath = path.join(PUBLIC_DIR, "llms.txt");
  fs.writeFileSync(llmsPath, llmsContent, "utf-8");
  console.log(`  Updated: ${llmsPath}`);

  console.log("\nDiscovery files sync complete!");
  console.log(`  Updated AGENTS.md with app-specific context`);
  console.log(`  Updated llms.txt with ${postCount} posts`);
}

// Run the sync
syncDiscoveryFiles().catch((error) => {
  console.error("Error syncing discovery files:", error);
  process.exit(1);
});
