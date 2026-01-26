import type { Context } from "@netlify/edge-functions";

// Edge function to proxy RSS feed to Convex HTTP endpoint
export default async function handler(
  request: Request,
  _context: Context,
): Promise<Response> {
  const convexUrl =
    Deno.env.get("VITE_CONVEX_URL") || Deno.env.get("CONVEX_URL");

  if (!convexUrl) {
    return new Response(
      "Configuration error: VITE_CONVEX_URL not set. Add it to Netlify environment variables.",
      { status: 500, headers: { "Content-Type": "text/plain" } },
    );
  }

  // Construct the Convex site URL for the HTTP endpoint
  const convexSiteUrl = convexUrl.replace(".cloud", ".site");
  const url = new URL(request.url);
  const targetUrl = `${convexSiteUrl}${url.pathname}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        Accept: "application/rss+xml",
      },
    });

    if (!response.ok) {
      return new Response("RSS feed not available", {
        status: response.status,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const xml = await response.text();
    return new Response(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=7200",
      },
    });
  } catch {
    return new Response("Failed to fetch RSS feed", {
      status: 502,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

export const config = {
  path: ["/rss.xml", "/rss-full.xml"],
};
