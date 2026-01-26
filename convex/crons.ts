import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Clean up stale sessions every 5 minutes
crons.interval(
  "cleanup stale sessions",
  { minutes: 5 },
  internal.stats.cleanupStaleSessions,
  {}
);

// Weekly digest: Send every Sunday at 9:00 AM UTC
// Posts from the last 7 days are included
// To disable, set weeklyDigest.enabled: false in siteConfig.ts
crons.cron(
  "weekly newsletter digest",
  "0 9 * * 0", // 9:00 AM UTC on Sundays
  internal.newsletterActions.sendWeeklyDigest,
  {
    siteUrl: process.env.SITE_URL || "https://example.com",
    siteName: process.env.SITE_NAME || "Newsletter",
  }
);

// Weekly stats summary: Send every Monday at 9:00 AM UTC
// Includes subscriber count, new subscribers, newsletters sent
crons.cron(
  "weekly stats summary",
  "0 9 * * 1", // 9:00 AM UTC on Mondays
  internal.newsletterActions.sendWeeklyStatsSummary,
  {
    siteName: process.env.SITE_NAME || "Newsletter",
  }
);

export default crons;

