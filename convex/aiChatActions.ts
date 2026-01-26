"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import Anthropic from "@anthropic-ai/sdk";
import type {
  ContentBlockParam,
  TextBlockParam,
  ImageBlockParam,
} from "@anthropic-ai/sdk/resources/messages/messages";
import FirecrawlApp from "@mendable/firecrawl-js";
import type { Id } from "./_generated/dataModel";

// Default system prompt for writing assistant
const DEFAULT_SYSTEM_PROMPT = `You are a helpful writing assistant. Help users write clearly and concisely.

Always apply the rule of one:
Focus on one person.
Address one specific problem they are facing.
Identify the single root cause of that problem.
Explain the one thing the solution does differently.
End by asking for one clear action.

Follow these guidelines:
Write in a clear and direct style.
Avoid jargon and unnecessary complexity.
Use short sentences and short paragraphs.
Be concise but thorough.
Do not use em dashes.
Format responses in markdown when appropriate.`;

/**
 * Build system prompt from environment variables
 * Supports split prompts (CLAUDE_PROMPT_STYLE, CLAUDE_PROMPT_COMMUNITY, CLAUDE_PROMPT_RULES)
 * or single prompt (CLAUDE_SYSTEM_PROMPT)
 */
function buildSystemPrompt(): string {
  // Try split prompts first
  const part1 = process.env.CLAUDE_PROMPT_STYLE || "";
  const part2 = process.env.CLAUDE_PROMPT_COMMUNITY || "";
  const part3 = process.env.CLAUDE_PROMPT_RULES || "";

  const parts = [part1, part2, part3].filter((p) => p.trim());

  if (parts.length > 0) {
    return parts.join("\n\n---\n\n");
  }

  // Fall back to single prompt
  return process.env.CLAUDE_SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT;
}

/**
 * Scrape URL content using Firecrawl (optional)
 */
async function scrapeUrl(url: string): Promise<{
  content: string;
  title?: string;
} | null> {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) {
    return null; // Firecrawl not configured
  }

  try {
    const firecrawl = new FirecrawlApp({ apiKey });
    const result = await firecrawl.scrapeUrl(url, {
      formats: ["markdown"],
    });

    if (!result.success || !result.markdown) {
      return null;
    }

    return {
      content: result.markdown,
      title: result.metadata?.title,
    };
  } catch {
    return null; // Silently fail if scraping fails
  }
}

/**
 * Generate AI response for a chat
 * Calls Claude API and saves the response
 */
export const generateResponse = action({
  args: {
    chatId: v.id("aiChats"),
    userMessage: v.string(),
    pageContext: v.optional(v.string()),
    attachments: v.optional(
      v.array(
        v.object({
          type: v.union(v.literal("image"), v.literal("link")),
          storageId: v.optional(v.id("_storage")),
          url: v.optional(v.string()),
          scrapedContent: v.optional(v.string()),
          title: v.optional(v.string()),
        }),
      ),
    ),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    // Get API key - return friendly message if not configured
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      const notConfiguredMessage =
        "**AI chat is not configured on production.**\n\n" +
        "To enable AI responses, add your `ANTHROPIC_API_KEY` to the Convex environment variables.\n\n" +
        "**Setup steps:**\n" +
        "1. Get an API key from [Anthropic Console](https://console.anthropic.com/)\n" +
        "2. Add it to Convex: `npx convex env set ANTHROPIC_API_KEY your-key-here`\n" +
        "3. For production, set it in the [Convex Dashboard](https://dashboard.convex.dev/)\n\n" +
        "See the [Convex environment variables docs](https://docs.convex.dev/production/environment-variables) for more details.";

      // Save the message to chat history so it appears in the conversation
      await ctx.runMutation(internal.aiChats.addAssistantMessage, {
        chatId: args.chatId,
        content: notConfiguredMessage,
      });

      return notConfiguredMessage;
    }

    // Get chat history
    const chat = await ctx.runQuery(internal.aiChats.getAIChatInternal, {
      chatId: args.chatId,
    });

    if (!chat) {
      throw new Error("Chat not found");
    }

    // Build system prompt with optional page context
    let systemPrompt = buildSystemPrompt();

    // Add page context if provided
    const pageContent = args.pageContext || chat.pageContext;
    if (pageContent) {
      systemPrompt += `\n\n---\n\nThe user is viewing a page with the following content. Use this as context for your responses:\n\n${pageContent}`;
    }

    // Process attachments if provided
    let processedAttachments = args.attachments;
    if (processedAttachments && processedAttachments.length > 0) {
      // Scrape link attachments
      const processed = await Promise.all(
        processedAttachments.map(async (attachment) => {
          if (
            attachment.type === "link" &&
            attachment.url &&
            !attachment.scrapedContent
          ) {
            const scraped = await scrapeUrl(attachment.url);
            if (scraped) {
              return {
                ...attachment,
                scrapedContent: scraped.content,
                title: scraped.title || attachment.title,
              };
            }
          }
          return attachment;
        }),
      );
      processedAttachments = processed;
    }

    // Build messages array from chat history (last 20 messages)
    const recentMessages = chat.messages.slice(-20);
    const claudeMessages: Array<{
      role: "user" | "assistant";
      content: string | Array<ContentBlockParam>;
    }> = [];

    // Convert chat messages to Claude format
    for (const msg of recentMessages) {
      if (msg.role === "assistant") {
        claudeMessages.push({
          role: "assistant",
          content: msg.content,
        });
      } else {
        // User message with potential attachments
        const contentParts: Array<TextBlockParam | ImageBlockParam> = [];

        // Add text content
        if (msg.content) {
          contentParts.push({
            type: "text",
            text: msg.content,
          });
        }

        // Add attachments
        if (msg.attachments) {
          for (const attachment of msg.attachments) {
            if (attachment.type === "image" && attachment.storageId) {
              // Get image URL from storage
              const imageUrl = await ctx.runQuery(
                internal.aiChats.getStorageUrlInternal,
                { storageId: attachment.storageId },
              );
              if (imageUrl) {
                contentParts.push({
                  type: "image",
                  source: {
                    type: "url",
                    url: imageUrl,
                  },
                });
              }
            } else if (attachment.type === "link") {
              // Add link context as text block
              let linkText = attachment.url || "";
              if (attachment.scrapedContent) {
                linkText += `\n\nContent from ${attachment.url}:\n${attachment.scrapedContent}`;
              }
              if (linkText) {
                contentParts.push({
                  type: "text",
                  text: linkText,
                });
              }
            }
          }
        }

        claudeMessages.push({
          role: "user",
          content:
            contentParts.length === 1 && contentParts[0].type === "text"
              ? contentParts[0].text
              : contentParts,
        });
      }
    }

    // Add the new user message with attachments
    const newMessageContent: Array<TextBlockParam | ImageBlockParam> = [];

    if (args.userMessage) {
      newMessageContent.push({
        type: "text",
        text: args.userMessage,
      });
    }

    // Process new message attachments
    if (processedAttachments && processedAttachments.length > 0) {
      for (const attachment of processedAttachments) {
        if (attachment.type === "image" && attachment.storageId) {
          const imageUrl = await ctx.runQuery(
            internal.aiChats.getStorageUrlInternal,
            { storageId: attachment.storageId },
          );
          if (imageUrl) {
            newMessageContent.push({
              type: "image",
              source: {
                type: "url",
                url: imageUrl,
              },
            });
          }
        } else if (attachment.type === "link") {
          let linkText = attachment.url || "";
          if (attachment.scrapedContent) {
            linkText += `\n\nContent from ${attachment.url}:\n${attachment.scrapedContent}`;
          }
          if (linkText) {
            newMessageContent.push({
              type: "text",
              text: linkText,
            });
          }
        }
      }
    }

    claudeMessages.push({
      role: "user",
      content:
        newMessageContent.length === 1 && newMessageContent[0].type === "text"
          ? newMessageContent[0].text
          : newMessageContent,
    });

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey,
    });

    // Call Claude API
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: systemPrompt,
      messages: claudeMessages,
    });

    // Extract text content from response
    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in Claude response");
    }

    const assistantMessage = textContent.text;

    // Save the assistant message to the chat
    await ctx.runMutation(internal.aiChats.addAssistantMessage, {
      chatId: args.chatId,
      content: assistantMessage,
    });

    return assistantMessage;
  },
});
