import { useEffect, useRef, useCallback } from "react";
import { useMutation } from "convex/react";
import { useLocation } from "react-router-dom";
import { api } from "../../convex/_generated/api";

// Heartbeat interval: 30 seconds (with jitter added to prevent synchronized calls)
const HEARTBEAT_INTERVAL_MS = 30 * 1000;

// Minimum time between heartbeats to prevent write conflicts: 20 seconds (matches backend dedup window)
const HEARTBEAT_DEBOUNCE_MS = 20 * 1000;

// Jitter range: ±5 seconds to prevent synchronized heartbeats across tabs
const HEARTBEAT_JITTER_MS = 5 * 1000;

// Session ID key in localStorage
const SESSION_ID_KEY = "markdown_blog_session_id";

// Geo data interface from Netlify edge function
interface GeoData {
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Generate a random session ID (UUID v4 format)
 */
function generateSessionId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get or create a persistent session ID
 */
function getSessionId(): string {
  if (typeof window === "undefined") {
    return generateSessionId();
  }

  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Determine page type from path
 */
function getPageType(path: string): string {
  if (path === "/" || path === "") {
    return "home";
  }
  if (path === "/stats") {
    return "stats";
  }
  // Could be a blog post or static page
  return "page";
}

/**
 * Hook to track page views and maintain active session presence
 * Fetches geo location from Netlify edge function for visitor map
 */
export function usePageTracking(): void {
  const location = useLocation();
  const recordPageView = useMutation(api.stats.recordPageView);
  const heartbeatMutation = useMutation(api.stats.heartbeat);

  // Track if we've recorded view for current path
  const lastRecordedPath = useRef<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  // Track heartbeat state to prevent duplicate calls and write conflicts
  const isHeartbeatPending = useRef(false);
  const lastHeartbeatTime = useRef(0);
  const lastHeartbeatPath = useRef<string | null>(null);

  // Geo data ref (fetched once on mount)
  const geoDataRef = useRef<GeoData | null>(null);
  const geoFetchedRef = useRef(false);

  // Initialize session ID and fetch geo data once on mount
  useEffect(() => {
    sessionIdRef.current = getSessionId();

    // Fetch geo data once (skip if already fetched)
    if (!geoFetchedRef.current) {
      geoFetchedRef.current = true;

      // Check if running on localhost (edge functions don't work locally)
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      if (isLocalhost) {
        // Use mock geo data for localhost testing
        // This allows the visitor map to work during local development
        geoDataRef.current = {
          city: "San Francisco",
          country: "US",
          latitude: 37.7749,
          longitude: -122.4194,
        };
      } else {
        // Fetch real geo data from Netlify edge function in production
        fetch("/api/geo")
          .then((res) => res.json())
          .then((data: GeoData) => {
            // Only store if we have valid coordinates
            if (data.latitude && data.longitude) {
              geoDataRef.current = data;
            }
          })
          .catch(() => {
            // Silently fail - geo data is optional
          });
      }
    }
  }, []);

  // Debounced heartbeat function to prevent write conflicts
  const sendHeartbeat = useCallback(
    async (path: string) => {
      const sessionId = sessionIdRef.current;
      if (!sessionId) return;

      const now = Date.now();

      // Skip if heartbeat is already pending
      if (isHeartbeatPending.current) {
        return;
      }

      // Skip if same path and sent recently (debounce)
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
        // Include geo data if available
        const geo = geoDataRef.current;
        await heartbeatMutation({
          sessionId,
          currentPath: path,
          ...(geo?.city && { city: geo.city }),
          ...(geo?.country && { country: geo.country }),
          ...(geo?.latitude && { latitude: geo.latitude }),
          ...(geo?.longitude && { longitude: geo.longitude }),
        });
      } catch {
        // Silently fail - analytics shouldn't break the app
      } finally {
        isHeartbeatPending.current = false;
      }
    },
    [heartbeatMutation]
  );

  // Record page view when path changes
  useEffect(() => {
    const path = location.pathname;
    const sessionId = sessionIdRef.current;

    if (!sessionId) return;

    // Only record if path changed
    if (lastRecordedPath.current !== path) {
      lastRecordedPath.current = path;

      recordPageView({
        path,
        pageType: getPageType(path),
        sessionId,
      }).catch(() => {
        // Silently fail - analytics shouldn't break the app
      });
    }
  }, [location.pathname, recordPageView]);

  // Send heartbeat on interval and on path change
  useEffect(() => {
    const path = location.pathname;

    // Add random jitter to initial delay to prevent synchronized heartbeats across tabs
    const initialJitter = Math.random() * HEARTBEAT_JITTER_MS;

    // Send initial heartbeat after jitter delay
    const initialTimeoutId = setTimeout(() => {
      sendHeartbeat(path);
    }, initialJitter);

    // Set up interval for ongoing heartbeats with jitter
    // Using recursive setTimeout instead of setInterval for variable timing
    let timeoutId: ReturnType<typeof setTimeout>;
    const scheduleNextHeartbeat = () => {
      const jitter = (Math.random() - 0.5) * 2 * HEARTBEAT_JITTER_MS; // ±5 seconds
      const nextDelay = HEARTBEAT_INTERVAL_MS + jitter;
      timeoutId = setTimeout(() => {
        sendHeartbeat(path);
        scheduleNextHeartbeat();
      }, nextDelay);
    };

    // Start the heartbeat loop after initial heartbeat
    const loopTimeoutId = setTimeout(() => {
      scheduleNextHeartbeat();
    }, initialJitter + HEARTBEAT_INTERVAL_MS);

    return () => {
      clearTimeout(initialTimeoutId);
      clearTimeout(loopTimeoutId);
      clearTimeout(timeoutId);
    };
  }, [location.pathname, sendHeartbeat]);
}
