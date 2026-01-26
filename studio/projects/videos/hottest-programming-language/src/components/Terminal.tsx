import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import React from "react";
import { COLORS } from "./RisographBackground";

type TerminalProps = {
  children: React.ReactNode;
  title?: string;
  style?: "dark" | "light";
};

export const Terminal: React.FC<TerminalProps> = ({
  children,
  title = "skill-stack — zsh",
  style = "dark",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation
  const entrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const scale = interpolate(entrance, [0, 1], [0.9, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // 3D rotation effect (like Jonny's video)
  const rotateY = interpolate(frame, [0, 450], [8, -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isDark = style === "dark";
  const bgColor = isDark ? "#1E1E1E" : "#FAFAFA";
  const textColor = isDark ? "#E0E0E0" : "#333333";
  const headerBg = isDark ? "#323232" : "#E8E8E8";

  return (
    <div
      style={{
        transform: `scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
        opacity,
        width: "80%",
        maxWidth: 900,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: `
          0 20px 60px rgba(0, 0, 0, 0.3),
          0 0 0 1px rgba(255, 255, 255, 0.1) inset
        `,
        fontFamily: "'SF Mono', 'Monaco', 'Menlo', monospace",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          backgroundColor: headerBg,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#FF5F56",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#FFBD2E",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#27CA40",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            color: isDark ? "#888" : "#666",
            fontSize: 14,
          }}
        >
          {title}
        </div>
        <div style={{ width: 54 }} /> {/* Spacer for symmetry */}
      </div>

      {/* Terminal content */}
      <div
        style={{
          backgroundColor: bgColor,
          padding: "24px 20px",
          minHeight: 300,
          color: textColor,
          fontSize: 18,
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </div>
  );
};
