import { v } from "convex/values";
import {
  query,
  mutation,
  internalQuery,
  internalMutation,
} from "./_generated/server";

// Message validator for reuse
const messageValidator = v.object({
  role: v.union(v.literal("user"), v.literal("assistant")),
  content: v.string(),
  timestamp: v.number(),
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
});

/**
 * Get storage URL for an image attachment
 */
export const getStorageUrl = query({
  args: {
    storageId: v.id("_storage"),
  },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

/**
 * Get AI chat by session and context
 * Returns null if no chat exists
 */
export const getAIChatByContext = query({
  args: {
    sessionId: v.string(),
    contextId: v.string(),
  },
  returns: v.union(
    v.object({
      _id: v.id("aiChats"),
      _creationTime: v.number(),
      sessionId: v.string(),
      contextId: v.string(),
      messages: v.array(messageValidator),
      pageContext: v.optional(v.string()),
      lastMessageAt: v.optional(v.number()),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const chat = await ctx.db
      .query("aiChats")
      .withIndex("by_session_and_context", (q) =>
        q.eq("sessionId", args.sessionId).eq("contextId", args.contextId),
      )
      .first();

    return chat;
  },
});

/**
 * Internal query for use in actions
 */
export const getAIChatInternal = internalQuery({
  args: {
    chatId: v.id("aiChats"),
  },
  returns: v.union(
    v.object({
      _id: v.id("aiChats"),
      _creationTime: v.number(),
      sessionId: v.string(),
      contextId: v.string(),
      messages: v.array(messageValidator),
      pageContext: v.optional(v.string()),
      lastMessageAt: v.optional(v.number()),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.chatId);
  },
});

/**
 * Get storage URL for an image attachment (internal)
 */
export const getStorageUrlInternal = internalQuery({
  args: {
    storageId: v.id("_storage"),
  },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

/**
 * Get or create AI chat for session and context
 * Returns the chat ID (creates new chat if needed)
 */
export const getOrCreateAIChat = mutation({
  args: {
    sessionId: v.string(),
    contextId: v.string(),
  },
  returns: v.id("aiChats"),
  handler: async (ctx, args) => {
    // Check for existing chat
    const existing = await ctx.db
      .query("aiChats")
      .withIndex("by_session_and_context", (q) =>
        q.eq("sessionId", args.sessionId).eq("contextId", args.contextId),
      )
      .first();

    if (existing) {
      return existing._id;
    }

    // Create new chat
    const chatId = await ctx.db.insert("aiChats", {
      sessionId: args.sessionId,
      contextId: args.contextId,
      messages: [],
      lastMessageAt: Date.now(),
    });

    return chatId;
  },
});

/**
 * Add user message to chat
 * Returns the updated chat
 */
export const addUserMessage = mutation({
  args: {
    chatId: v.id("aiChats"),
    content: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    const now = Date.now();
    const newMessage = {
      role: "user" as const,
      content: args.content,
      timestamp: now,
    };

    await ctx.db.patch(args.chatId, {
      messages: [...chat.messages, newMessage],
      lastMessageAt: now,
    });

    return null;
  },
});

/**
 * Add user message with attachments
 * Used when sending images or links
 */
export const addUserMessageWithAttachments = mutation({
  args: {
    chatId: v.id("aiChats"),
    content: v.string(),
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
  returns: v.null(),
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    const now = Date.now();
    const newMessage = {
      role: "user" as const,
      content: args.content,
      timestamp: now,
      attachments: args.attachments,
    };

    await ctx.db.patch(args.chatId, {
      messages: [...chat.messages, newMessage],
      lastMessageAt: now,
    });

    return null;
  },
});

/**
 * Generate upload URL for image attachments
 */
export const generateUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * Add assistant message to chat (internal - called from action)
 */
export const addAssistantMessage = internalMutation({
  args: {
    chatId: v.id("aiChats"),
    content: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    const now = Date.now();
    const newMessage = {
      role: "assistant" as const,
      content: args.content,
      timestamp: now,
    };

    await ctx.db.patch(args.chatId, {
      messages: [...chat.messages, newMessage],
      lastMessageAt: now,
    });

    return null;
  },
});

/**
 * Clear all messages from a chat
 */
export const clearChat = mutation({
  args: {
    chatId: v.id("aiChats"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      return null; // Idempotent - no error if chat doesn't exist
    }

    await ctx.db.patch(args.chatId, {
      messages: [],
      pageContext: undefined,
      lastMessageAt: Date.now(),
    });

    return null;
  },
});

/**
 * Set page context for a chat (loads page markdown for AI context)
 */
export const setPageContext = mutation({
  args: {
    chatId: v.id("aiChats"),
    pageContext: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    await ctx.db.patch(args.chatId, {
      pageContext: args.pageContext,
    });

    return null;
  },
});

/**
 * Delete entire chat session
 */
export const deleteChat = mutation({
  args: {
    chatId: v.id("aiChats"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      return null; // Idempotent
    }

    await ctx.db.delete(args.chatId);
    return null;
  },
});

/**
 * Get all chats for a session (for potential future chat history feature)
 */
export const getChatsBySession = query({
  args: {
    sessionId: v.string(),
  },
  returns: v.array(
    v.object({
      _id: v.id("aiChats"),
      _creationTime: v.number(),
      sessionId: v.string(),
      contextId: v.string(),
      messages: v.array(messageValidator),
      pageContext: v.optional(v.string()),
      lastMessageAt: v.optional(v.number()),
    }),
  ),
  handler: async (ctx, args) => {
    const chats = await ctx.db
      .query("aiChats")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    return chats;
  },
});

