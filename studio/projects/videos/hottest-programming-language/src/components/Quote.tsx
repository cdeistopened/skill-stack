import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import React from "react";
import { COLORS } from "./RisographBackground";

type QuoteProps = {
  text: string;
  author: string;
  startFrame?: number;
};

export const Quote: React.FC<QuoteProps> = ({
  text,
  author,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = frame - startFrame;

  // Entrance animation
  const entrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 200 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [30, 0]);

  // Risograph color offset effect
  const offsetX = interpolate(adjustedFrame, [0, 30], [3, 0], {
    extrapolateRight: "clamp",
  });

  if (adjustedFrame < 0) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        textAlign: "center",
        maxWidth: 800,
        padding: "0 40px",
      }}
    >
      {/* Risograph offset layer (coral) */}
      <div
        style={{
          position: "absolute",
          transform: `translate(${offsetX}px, ${offsetX}px)`,
          color: COLORS.coral,
          opacity: 0.6,
          fontSize: 36,
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
          lineHeight: 1.4,
        }}
      >
        "{text}"
      </div>

      {/* Main text layer */}
      <div
        style={{
          position: "relative",
          color: COLORS.ink,
          fontSize: 36,
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
          lineHeight: 1.4,
        }}
      >
        "{text}"
      </div>

      {/* Author */}
      <div
        style={{
          marginTop: 24,
          color: COLORS.teal,
          fontSize: 22,
          fontFamily: "'SF Pro Display', 'Helvetica Neue', sans-serif",
          fontWeight: 500,
          letterSpacing: 1,
        }}
      >
        — {author}
      </div>
    </div>
  );
};
