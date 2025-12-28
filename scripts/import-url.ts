import fs from "fs";
import path from "path";
import FirecrawlApp from "@mendable/firecrawl-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

if (!FIRECRAWL_API_KEY) {
  console.error("Error: FIRECRAWL_API_KEY not found in .env.local");
  console.log("\nTo set up Firecrawl:");
  console.log("1. Get an API key from https://firecrawl.dev");
  console.log("2. Add FIRECRAWL_API_KEY=fc-xxx to your .env.local file");
  process.exit(1);
}

const firecrawl = new FirecrawlApp({ apiKey: FIRECRAWL_API_KEY });

// Generate a URL-safe slug from a title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Remove consecutive hyphens
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
    .substring(0, 60); // Limit length
}

// Clean up markdown content
function cleanMarkdown(content: string): string {
  return content
    .replace(/^\s+|\s+$/g, "") // Trim whitespace
    .replace(/\n{3,}/g, "\n\n"); // Remove excessive newlines
}

async function importFromUrl(url: string) {
  console.log(`\nScraping: ${url}`);
  console.log("This may take a moment...\n");

  try {
    const result = await firecrawl.scrapeUrl(url, {
      formats: ["markdown"],
    });

    if (!result.success) {
      console.error("Failed to scrape URL");
      console.error("Error:", result.error || "Unknown error");
      process.exit(1);
    }

    const title = result.metadata?.title || "Imported Post";
    const description = result.metadata?.description || "";
    const content = cleanMarkdown(result.markdown || "");

    if (!content) {
      console.error("No content found at URL");
      process.exit(1);
    }

    // Generate slug from title
    const baseSlug = generateSlug(title);
    const slug = baseSlug || `imported-${Date.now()}`;

    // Get today's date
    const today = new Date().toISOString().split("T")[0];

    // Create markdown file with frontmatter
    const markdown = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: "${today}"
slug: "${slug}"
published: false
tags: ["imported"]
---

${content}

---

*Originally published at [${new URL(url).hostname}](${url})*
`;

    // Ensure content/blog directory exists
    const blogDir = path.join(process.cwd(), "content", "blog");
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    // Write the file
    const filePath = path.join(blogDir, `${slug}.md`);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.warn(`Warning: File already exists at ${filePath}`);
      console.warn("Adding timestamp to filename to avoid overwrite.");
      const newSlug = `${slug}-${Date.now()}`;
      const newFilePath = path.join(blogDir, `${newSlug}.md`);
      fs.writeFileSync(
        newFilePath,
        markdown.replace(`slug: "${slug}"`, `slug: "${newSlug}"`),
      );
      console.log(`\nCreated: ${newFilePath}`);
      console.log(`Slug: ${newSlug}`);
    } else {
      fs.writeFileSync(filePath, markdown);
      console.log(`\nCreated: ${filePath}`);
      console.log(`Slug: ${slug}`);
    }

    console.log(`Title: ${title}`);
    console.log(`Status: Draft (published: false)`);
    console.log("\nNext steps:");
    console.log("1. Review and edit the imported content");
    console.log("2. Set published: true when ready");
    console.log("3. Run: npm run sync");
  } catch (error) {
    console.error("Error importing URL:", error);
    process.exit(1);
  }
}

// Parse command line arguments
const url = process.argv[2];

if (!url) {
  console.log("Firecrawl Content Importer");
  console.log("==========================\n");
  console.log("Usage: npm run import <url>\n");
  console.log("Example:");
  console.log("  npm run import https://example.com/article\n");
  console.log("This will:");
  console.log("  1. Scrape the URL and convert to markdown");
  console.log("  2. Create a draft post in content/blog/");
  console.log("  3. You can then review, edit, and sync\n");
  process.exit(0);
}

// Validate URL
try {
  new URL(url);
} catch {
  console.error("Error: Invalid URL provided");
  console.log("Please provide a valid URL starting with http:// or https://");
  process.exit(1);
}

importFromUrl(url);

