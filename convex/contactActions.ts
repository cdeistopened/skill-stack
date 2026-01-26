"use node";

import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { AgentMailClient } from "agentmail";

// Send contact form email via AgentMail SDK
// Internal action that sends email to configured recipient
// Uses official AgentMail SDK: https://docs.agentmail.to/quickstart
export const sendContactEmail = internalAction({
  args: {
    messageId: v.id("contactMessages"),
    name: v.string(),
    email: v.string(),
    message: v.string(),
    source: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const apiKey = process.env.AGENTMAIL_API_KEY;
    const inbox = process.env.AGENTMAIL_INBOX;
    // Contact form sends to AGENTMAIL_CONTACT_EMAIL or falls back to inbox
    const recipientEmail = process.env.AGENTMAIL_CONTACT_EMAIL || inbox;

    // Silently fail if environment variables not configured
    if (!apiKey || !inbox || !recipientEmail) {
      return null;
    }

    // Build email HTML
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="font-size: 20px; color: #1a1a1a; margin-bottom: 16px;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 100px;">From:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(args.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Email:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(args.email)}">${escapeHtml(args.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Source:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(args.source)}</td>
          </tr>
        </table>
        <h3 style="font-size: 16px; color: #1a1a1a; margin: 24px 0 8px 0;">Message:</h3>
        <div style="background: #f9f9f9; padding: 16px; border-radius: 6px; white-space: pre-wrap;">${escapeHtml(args.message)}</div>
      </div>
    `;

    // Plain text version
    const text = `New Contact Form Submission\n\nFrom: ${args.name}\nEmail: ${args.email}\nSource: ${args.source}\n\nMessage:\n${args.message}`;

    try {
      // Initialize AgentMail client with API key
      const client = new AgentMailClient({ apiKey });

      // Send email using official SDK
      // https://docs.agentmail.to/sending-receiving-email
      await client.inboxes.messages.send(inbox, {
        to: recipientEmail,
        subject: `Contact: ${args.name} via ${args.source}`,
        text,
        html,
      });

      // Mark email as sent in database
      await ctx.runMutation(internal.contact.markEmailSent, {
        messageId: args.messageId,
      });
    } catch {
      // Silently fail on error
    }

    return null;
  },
});

// Helper function to escape HTML entities
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
