import { useMemo } from "react";

// Visitor location data from Convex
interface VisitorLocation {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

interface VisitorMapProps {
  locations: VisitorLocation[];
  title?: string;
}

// Simplified world map as dot grid (major landmass coordinates)
// This creates a lightweight dotted world map pattern
const WORLD_DOTS = generateWorldDots();

function generateWorldDots(): Array<{ x: number; y: number }> {
  // Generate a simplified dot pattern for major landmasses
  // Using approximate continent boundaries for a clean look
  const dots: Array<{ x: number; y: number }> = [];

  // Simplified continent outlines as dot regions
  const regions = [
    // North America
    { latMin: 25, latMax: 70, lngMin: -170, lngMax: -50, density: 0.15 },
    // South America
    { latMin: -55, latMax: 12, lngMin: -80, lngMax: -35, density: 0.12 },
    // Europe
    { latMin: 35, latMax: 70, lngMin: -10, lngMax: 40, density: 0.18 },
    // Africa
    { latMin: -35, latMax: 37, lngMin: -18, lngMax: 52, density: 0.12 },
    // Asia
    { latMin: 5, latMax: 75, lngMin: 40, lngMax: 145, density: 0.1 },
    // Australia
    { latMin: -45, latMax: -10, lngMin: 112, lngMax: 155, density: 0.1 },
    // Greenland
    { latMin: 60, latMax: 83, lngMin: -73, lngMax: -12, density: 0.08 },
  ];

  // Generate dots for each region
  for (const region of regions) {
    const latStep = 4;
    const lngStep = 6;
    for (let lat = region.latMin; lat <= region.latMax; lat += latStep) {
      for (let lng = region.lngMin; lng <= region.lngMax; lng += lngStep) {
        // Add some randomness to make it look more natural
        if (Math.random() < region.density * 3) {
          const { x, y } = latLngToSvg(lat, lng);
          dots.push({ x, y });
        }
      }
    }
  }

  return dots;
}

// Convert latitude/longitude to SVG coordinates (simple mercator projection)
function latLngToSvg(lat: number, lng: number): { x: number; y: number } {
  // Map dimensions: 800x400
  const x = ((lng + 180) / 360) * 800;
  const y = ((90 - lat) / 180) * 400;
  return { x, y };
}

/**
 * Visitor Map Component
 * Displays a dotted world map with animated location indicators
 * Theme-aware colors using CSS variables
 */
export default function VisitorMap({ locations, title }: VisitorMapProps) {
  // Convert visitor locations to SVG coordinates
  const visitorDots = useMemo(() => {
    return locations.map((loc) => ({
      ...latLngToSvg(loc.latitude, loc.longitude),
      city: loc.city,
      country: loc.country,
    }));
  }, [locations]);

  return (
    <div className="visitor-map-container">
      {title && <h2 className="visitor-map-title">{title}</h2>}
      <p className="visitor-map-subtitle">Location-enabled sessions</p>
      <div className="visitor-map-wrapper">
        <svg
          viewBox="0 0 800 400"
          className="visitor-map-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background */}
          <rect
            x="0"
            y="0"
            width="800"
            height="400"
            fill="var(--visitor-map-bg)"
            rx="8"
          />

          {/* World map dots (landmasses) */}
          {WORLD_DOTS.map((dot, i) => (
            <circle
              key={`land-${i}`}
              cx={dot.x}
              cy={dot.y}
              r="2"
              fill="var(--visitor-map-land)"
              opacity="0.85"
            />
          ))}

          {/* Visitor location dots with pulse animation */}
          {visitorDots.map((dot, i) => (
            <g key={`visitor-${i}`}>
              {/* Outer pulse ring */}
              <circle
                cx={dot.x}
                cy={dot.y}
                r="12"
                fill="var(--visitor-map-dot)"
                opacity="0"
                className="visitor-pulse-ring"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              {/* Middle pulse ring */}
              <circle
                cx={dot.x}
                cy={dot.y}
                r="8"
                fill="var(--visitor-map-dot)"
                opacity="0.2"
                className="visitor-pulse-ring-mid"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              {/* Solid center dot */}
              <circle
                cx={dot.x}
                cy={dot.y}
                r="5"
                fill="var(--visitor-map-dot)"
                className="visitor-dot-center"
              />
              {/* Inner bright core */}
              <circle
                cx={dot.x}
                cy={dot.y}
                r="2"
                fill="var(--visitor-map-dot-core)"
              />
            </g>
          ))}
        </svg>

        {/* Location count badge */}
        {locations.length > 0 && (
          <div className="visitor-map-badge">
            <span className="visitor-map-badge-dot" />
            {locations.length} {locations.length === 1 ? "visitor" : "visitors"}{" "}
            online
          </div>
        )}
      </div>
    </div>
  );
}
