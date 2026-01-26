# AgentMail Contact Form Fix

## Problem

Contact form submissions were failing with 404 errors when trying to send emails via AgentMail. The error message was:

```
Failed to send contact email (404): {"message":"Not Found"}
```

## Root Cause

The code was attempting to use a REST API endpoint that doesn't exist:

```
POST https://api.agentmail.to/v1/inboxes/{inbox_id}/messages
```

AgentMail doesn't expose a public REST API for sending emails. They require using their official SDK (`agentmail` npm package) instead.

Additionally, Convex functions that use Node.js packages (like the AgentMail SDK) must run in the Node.js runtime, which requires the `"use node"` directive. However, mutations and queries must run in V8. This created a conflict when trying to use the SDK in the same file as mutations.

## Solution

### 1. Install Official SDK

```bash
npm install agentmail
```

### 2. Split Actions into Separate Files

Created separate files for Node.js actions:

- `convex/contactActions.ts` - Contains `sendContactEmail` action with `"use node"`
- `convex/newsletterActions.ts` - Contains `sendPostNewsletter` action with `"use node"`

Main files remain in V8 runtime:

- `convex/contact.ts` - Contains mutations (`submitContact`, `markEmailSent`)
- `convex/newsletter.ts` - Contains mutations and queries

### 3. Use SDK Instead of REST API

Replaced fetch calls with the official SDK:

```typescript
// Before (didn't work)
const response = await fetch(apiUrl, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(emailPayload),
});

// After (works)
const client = new AgentMailClient({ apiKey });
await client.inboxes.messages.send(inbox, {
  to: recipientEmail,
  subject: "...",
  text: "...",
  html: "...",
});
```

## Files Modified

- `convex/contact.ts` - Removed `"use node"`, kept mutations only
- `convex/contactActions.ts` - New file with `sendContactEmail` action using SDK
- `convex/newsletter.ts` - Removed `"use node"`, kept mutations/queries only
- `convex/newsletterActions.ts` - New file with `sendPostNewsletter` action using SDK
- `package.json` - Added `agentmail` dependency

## Testing

After the fix:

1. Contact form submissions store messages in Convex
2. Emails send successfully via AgentMail SDK
3. No more 404 errors
4. Proper error handling and logging

## Key Learnings

- AgentMail requires their SDK, not direct REST API calls
- Convex actions using Node.js packages need `"use node"` directive
- Mutations/queries must run in V8, actions can run in Node.js
- Split files by runtime requirement to avoid conflicts

## References

- [AgentMail Quickstart](https://docs.agentmail.to/quickstart)
- [AgentMail Sending & Receiving Email](https://docs.agentmail.to/sending-receiving-email)
- [Convex Actions Documentation](https://docs.convex.dev/functions/actions)
