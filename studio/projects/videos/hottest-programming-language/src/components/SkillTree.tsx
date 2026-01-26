import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import React from "react";
import { COLORS } from "./RisographBackground";

const SKILLS = [
  { name: "voice-matching/", icon: "🎤" },
  { name: "anti-ai-writing/", icon: "✍️" },
  { name: "transcript-polisher/", icon: "📝" },
  { name: "newsletter-writer/", icon: "📬" },
];

type SkillTreeProps = {
  startFrame?: number;
};

export const SkillTree: React.FC<SkillTreeProps> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = frame - startFrame;

  if (adjustedFrame < 0) return null;

  return (
    <div
      style={{
        fontFamily: "'SF Mono', 'Monaco', 'Menlo', monospace",
        fontSize: 18,
        color: COLORS.ink,
        textAlign: "left",
      }}
    >
      {/* Header */}
      <SkillLine
        text=".claude/skills/"
        frame={adjustedFrame}
        delay={0}
        isHeader
      />

      {/* Tree structure */}
      {SKILLS.map((skill, index) => {
        const isLast = index === SKILLS.length - 1;
        const prefix = isLast ? "└── " : "├── ";
        return (
          <SkillLine
            key={skill.name}
            text={`${prefix}${skill.name}`}
            frame={adjustedFrame}
            delay={(index + 1) * 15}
            icon={skill.icon}
          />
        );
      })}
    </div>
  );
};

type SkillLineProps = {
  text: string;
  frame: number;
  delay: number;
  isHeader?: boolean;
  icon?: string;
};

const SkillLine: React.FC<SkillLineProps> = ({
  text,
  frame,
  delay,
  isHeader = false,
  icon,
}) => {
  const { fps } = useVideoConfig();

  const adjustedFrame = frame - delay;

  const entrance = spring({
    frame: Math.max(0, adjustedFrame),
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateX = interpolate(entrance, [0, 1], [-20, 0]);
  const scale = interpolate(entrance, [0, 1], [0.95, 1]);

  if (adjustedFrame < 0) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px) scale(${scale})`,
        marginBottom: 8,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {/* Risograph offset */}
      <span
        style={{
          position: "absolute",
          transform: "translate(2px, 2px)",
          color: COLORS.coral,
          opacity: 0.4,
        }}
      >
        {text}
      </span>

      {/* Main text */}
      <span
        style={{
          position: "relative",
          color: isHeader ? COLORS.teal : COLORS.ink,
          fontWeight: isHeader ? 600 : 400,
        }}
      >
        {text}
      </span>

      {icon && (
        <span style={{ fontSize: 16 }}>{icon}</span>
      )}
    </div>
  );
};
