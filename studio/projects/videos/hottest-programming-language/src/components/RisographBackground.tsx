import { useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";
import React, { useMemo } from "react";

// Skill Stack brand colors - risograph style
const COLORS = {
  paper: "#F5F0E6", // Warm cream paper
  coral: "#E07B53", // Claude-inspired coral
  teal: "#2D5D5D", // Deep teal accent
  ink: "#1A1A1A", // Rich black
};

type RisographBackgroundProps = {
  color?: string;
  grainIntensity?: number;
};

export const RisographBackground: React.FC<RisographBackgroundProps> = ({
  color = COLORS.paper,
  grainIntensity = 0.15,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Generate static grain pattern (changes slightly each frame for texture)
  const grainSeed = Math.floor(frame / 2); // Update every 2 frames for subtle animation

  // Create SVG noise filter
  const noiseFilter = useMemo(() => {
    return (
      <filter id="risograph-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.7"
          numOctaves="4"
          seed={grainSeed}
          result="noise"
        />
        <feColorMatrix
          type="saturate"
          values="0"
          in="noise"
          result="monoNoise"
        />
        <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
      </filter>
    );
  }, [grainSeed]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: color,
        overflow: "hidden",
      }}
    >
      {/* Base paper texture */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>{noiseFilter}</defs>
        <rect
          width="100%"
          height="100%"
          fill={color}
          filter="url(#risograph-grain)"
          opacity={grainIntensity}
        />
      </svg>

      {/* Subtle vignette */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.1) 100%)`,
        }}
      />
    </div>
  );
};

export { COLORS };
