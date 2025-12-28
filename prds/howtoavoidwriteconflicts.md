# How to Avoid Write Conflicts in Markdown Blog

This document explains the write conflict issue that occurred in the `activeSessions` table and how it was resolved.

## Problem

The Convex dashboard showed write conflicts in the `stats:heartbeat` mutation affecting the `activeSessions` table. Conflicts were happening every minute with retry counts of 0 and 1, indicating parallel mutations were competing to update the same documents.

## Root Cause

The original implementation had two issues:

1. **Backend**: The heartbeat mutation queried for an existing session, then patched or inserted without checking if an update was actually needed
2. **Frontend**: The `usePageTracking` hook could send duplicate heartbeats when:
   - Path changed (immediate heartbeat + interval overlap)
   - React StrictMode caused double effect invocations
   - Multiple tabs were open

## Solution

### Backend Changes (convex/stats.ts)

Added a 10-second dedup window to make the heartbeat mutation idempotent:

```typescript
const HEARTBEAT_DEDUP_MS = 10 * 1000;

export const heartbeat = mutation({
  args: {
    sessionId: v.string(),
    currentPath: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const now = Date.now();

    const existingSession = await ctx.db
      .query("activeSessions")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .first();

    if (existingSession) {
      // Early return if same path and recently updated
      if (
        existingSession.currentPath === args.currentPath &&
        now - existingSession.lastSeen < HEARTBEAT_DEDUP_MS
      ) {
        return null;
      }

      await ctx.db.patch(existingSession._id, {
        currentPath: args.currentPath,
        lastSeen: now,
      });
      return null;
    }

    await ctx.db.insert("activeSessions", {
      sessionId: args.sessionId,
      currentPath: args.currentPath,
      lastSeen: now,
    });

    return null;
  },
});
```

### Frontend Changes (src/hooks/usePageTracking.ts)

Added debouncing with refs to prevent duplicate mutation calls:

```typescript
const HEARTBEAT_DEBOUNCE_MS = 5 * 1000;

// Track heartbeat state to prevent duplicate calls
const isHeartbeatPending = useRef(false);
const lastHeartbeatTime = useRef(0);
const lastHeartbeatPath = useRef<string | null>(null);

const sendHeartbeat = useCallback(
  async (path: string) => {
    const sessionId = sessionIdRef.current;
    if (!sessionId) return;

    const now = Date.now();

    // Skip if heartbeat is already pending
    if (isHeartbeatPending.current) {
      return;
    }

    // Skip if same path and sent recently
    if (
      lastHeartbeatPath.current === path &&
      now - lastHeartbeatTime.current < HEARTBEAT_DEBOUNCE_MS
    ) {
      return;
    }

    isHeartbeatPending.current = true;
    lastHeartbeatTime.current = now;
    lastHeartbeatPath.current = path;

    try {
      await heartbeatMutation({ sessionId, currentPath: path });
    } catch {
      // Silently fail
    } finally {
      isHeartbeatPending.current = false;
    }
  },
  [heartbeatMutation]
);
```

## Key Patterns Applied

| Pattern | Implementation | Purpose |
|---------|---------------|---------|
| Backend idempotency | 10-second dedup window | Skip updates if recently updated with same data |
| Frontend debouncing | 5-second debounce with refs | Prevent rapid duplicate calls |
| Pending state tracking | `isHeartbeatPending` ref | Block overlapping async calls |
| Indexed queries | `by_sessionId` index | Efficient document lookup |

## Files Changed

- `convex/stats.ts`: Added `HEARTBEAT_DEDUP_MS` constant and early return logic
- `src/hooks/usePageTracking.ts`: Added debouncing refs and `useCallback` wrapper

## Monitoring

Check the Convex dashboard at Health > Insights > Insight Breakdown to verify:

- Write conflict retries should drop to near zero
- Function latency should stabilize
- No permanent failures in error logs

## References

- Convex Write Conflicts: https://docs.convex.dev/error#1
- Optimistic Concurrency Control: https://docs.convex.dev/database/advanced/occ
- Convex Best Practices: https://docs.convex.dev/understanding/best-practices/

