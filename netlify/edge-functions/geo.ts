import type { Context } from "@netlify/edge-functions";

// Returns the user's geo location from Netlify's automatic geo headers
// Privacy friendly: only returns city/country/coordinates, no IP address stored
export default async function handler(
  _request: Request,
  context: Context,
): Promise<Response> {
  // Netlify provides geo data automatically via context.geo
  const geo = context.geo;

  const data = {
    city: geo?.city || null,
    country: geo?.country?.code || null,
    countryName: geo?.country?.name || null,
    latitude: geo?.latitude || null,
    longitude: geo?.longitude || null,
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export const config = {
  path: "/api/geo",
};

