#!/usr/bin/env npx ts-node

/**
 * Send newsletter for a specific post to all subscribers
 *
 * Usage:
 *   npm run newsletter:send <post-slug>
 *
 * Example:
 *   npm run newsletter:send setup-guide
 *
 * Environment variables (from .env.local):
 *   - VITE_CONVEX_URL: Convex deployment URL
 *   - SITE_URL: Your site URL (default: https://markdown.fast)
 *   - SITE_NAME: Your site name (default: "Newsletter")
 *
 * Note: AGENTMAIL_API_KEY and AGENTMAIL_INBOX must be set in Convex dashboard
 */

import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env.production.local" });

async function main() {
  const postSlug = process.argv[2];

  if (!postSlug) {
    console.error("Usage: npm run newsletter:send <post-slug>");
    console.error("Example: npm run newsletter:send setup-guide");
    process.exit(1);
  }

  const convexUrl = process.env.VITE_CONVEX_URL;
  if (!convexUrl) {
    console.error(
      "Error: VITE_CONVEX_URL not found. Run 'npx convex dev' to create .env.local"
    );
    process.exit(1);
  }

  const siteUrl = process.env.SITE_URL || "https://markdown.fast";
  const siteName = process.env.SITE_NAME || "Newsletter";

  console.log(`Sending newsletter for post: ${postSlug}`);
  console.log(`Site URL: ${siteUrl}`);
  console.log(`Site name: ${siteName}`);
  console.log("");

  const client = new ConvexHttpClient(convexUrl);

  try {
    // First check if post exists
    const post = await client.query(api.posts.getPostBySlug, { slug: postSlug });
    if (!post) {
      console.error(`Error: Post "${postSlug}" not found or not published.`);
      process.exit(1);
    }

    console.log(`Found post: "${post.title}"`);

    // Get subscriber count first
    const subscriberCount = await client.query(api.newsletter.getSubscriberCount);
    console.log(`Active subscribers: ${subscriberCount}`);

    if (subscriberCount === 0) {
      console.log("No subscribers to send to.");
      process.exit(0);
    }

    console.log("");
    console.log("Sending newsletter...");

    // Call the mutation directly to schedule the newsletter send
    const result = await client.mutation(api.newsletter.scheduleSendPostNewsletter, {
      postSlug,
      siteUrl,
      siteName,
    });

    if (result.success) {
      console.log("✓ Newsletter scheduled successfully!");
      console.log(result.message);
      console.log("");
      console.log("The newsletter is being sent in the background.");
      console.log("Check the Newsletter Admin page or recent sends to see results.");
    } else {
      console.error("✗ Failed to send newsletter:");
      console.error(result.message);
      process.exit(1);
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
