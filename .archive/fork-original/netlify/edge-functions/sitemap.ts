import type { Context } from "@netlify/edge-functions";

// Edge function to proxy sitemap to Convex HTTP endpoint
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
  const targetUrl = `${convexSiteUrl}/sitemap.xml`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        Accept: "application/xml",
      },
    });

    if (!response.ok) {
      return new Response("Sitemap not available", {
        status: response.status,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const xml = await response.text();
    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=7200",
      },
    });
  } catch {
    return new Response("Failed to fetch sitemap", {
      status: 502,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

export const config = {
  path: "/sitemap.xml",
};
