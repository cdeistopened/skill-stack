#!/usr/bin/env npx ts-node

/**
 * Send weekly stats summary email to developer
 *
 * Usage:
 *   npm run newsletter:send:stats
 *
 * Environment variables (from .env.local):
 *   - VITE_CONVEX_URL: Convex deployment URL
 *   - SITE_NAME: Your site name (default: "Newsletter")
 *
 * Note: AGENTMAIL_API_KEY, AGENTMAIL_INBOX, and AGENTMAIL_CONTACT_EMAIL must be set in Convex dashboard
 */

import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env.production.local" });

async function main() {
  const convexUrl = process.env.VITE_CONVEX_URL;
  if (!convexUrl) {
    console.error(
      "Error: VITE_CONVEX_URL not found. Run 'npx convex dev' to create .env.local"
    );
    process.exit(1);
  }

  const siteName = process.env.SITE_NAME || "Newsletter";

  console.log("Sending weekly stats summary...");
  console.log(`Site name: ${siteName}`);
  console.log("");

  const client = new ConvexHttpClient(convexUrl);

  try {
    // Call the mutation to schedule the stats summary send
    const result = await client.mutation(api.newsletter.scheduleSendStatsSummary, {
      siteName,
    });

    if (result.success) {
      console.log("✓ Stats summary scheduled successfully!");
      console.log(result.message);
      console.log("");
      console.log("The email will be sent to AGENTMAIL_INBOX (or AGENTMAIL_CONTACT_EMAIL if set).");
    } else {
      console.error("✗ Failed to send stats summary:");
      console.error(result.message);
      process.exit(1);
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
