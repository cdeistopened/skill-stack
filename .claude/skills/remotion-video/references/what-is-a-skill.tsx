import {
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  interpolate,
  spring,
} from "remotion";
import React from "react";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

// Load fonts
const { fontFamily: inter } = loadInter("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

const { fontFamily: playfair } = loadPlayfair("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const { fontFamily: mono } = loadJetBrains("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

// Palette
const C = {
  paper: "#FAF8F5",
  coral: "#D4694A",
  teal: "#1E4D4D",
  ink: "#1C1C1C",
  muted: "#666666",
  dimmed: "#AAAAAA",
  white: "#FFFFFF",
};

// Skills data
const SKILLS = [
  { name: "voice-matching", desc: "Match any writing style" },
  { name: "anti-ai-writing", desc: "Remove AI tells from prose" },
  { name: "remotion-video", desc: "Create videos with React" },
];

export const WhatIsASkill: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <GrainOverlay />

      {/* Scene 1: The Prompt (0-180) */}
      {frame < 200 && <ScenePrompt frame={frame} />}

      {/* Scene 2: The Scan (160-320) */}
      {frame >= 160 && frame < 340 && <SceneScan frame={frame - 160} />}

      {/* Scene 3: The Selection (300-440) */}
      {frame >= 300 && frame < 460 && <SceneSelect frame={frame - 300} />}

      {/* Scene 4: The Load (420-540) */}
      {frame >= 420 && frame < 560 && <SceneLoad frame={frame - 420} />}

      {/* Scene 5: Punchline (520-600) */}
      {frame >= 520 && <ScenePunchline frame={frame - 520} />}
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────
// Scene 1: The Prompt (0-180, ~6 seconds)
// ─────────────────────────────────────────────────────────────
const ScenePrompt: React.FC<{ frame: number }> = ({ frame }) => {
  const text = "Make me a 10-second video explaining what a skill is";
  const charsToShow = Math.floor(frame / 2); // slower typing - 15 chars/sec
  const visibleText = text.slice(0, charsToShow);
  const isTyping = charsToShow < text.length;

  const cursorBlink = Math.floor(frame / 18) % 2 === 0;

  const fadeOut = interpolate(frame, [160, 200], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          fontFamily: playfair,
          fontSize: 64,
          fontWeight: 500,
          color: C.ink,
          textAlign: "center",
          lineHeight: 1.25,
          maxWidth: 900,
        }}
      >
        "{visibleText}
        {(isTyping || cursorBlink) && (
          <span
            style={{
              backgroundColor: C.coral,
              marginLeft: 4,
              opacity: cursorBlink ? 1 : 0,
            }}
          >
            {"\u00A0"}
          </span>
        )}
        {!isTyping && '"'}
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────
// Scene 2: The Scan (160-320, ~5.3 seconds)
// ─────────────────────────────────────────────────────────────
const SceneScan: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        opacity: fadeIn * fadeOut,
      }}
    >
      <div style={{ width: "100%", maxWidth: 700 }}>
        {/* Header */}
        <div
          style={{
            fontFamily: inter,
            fontSize: 36,
            fontWeight: 500,
            color: C.muted,
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Scanning skills...
        </div>

        {/* Skill List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {SKILLS.map((skill, i) => {
            const delay = i * 25; // slower stagger
            const s = spring({
              frame: Math.max(0, frame - delay - 20),
              fps,
              config: { damping: 100 },
            });

            return (
              <div
                key={skill.name}
                style={{
                  backgroundColor: C.white,
                  borderRadius: 16,
                  padding: "28px 36px",
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 40,
                    fontWeight: 500,
                    color: C.ink,
                    marginBottom: 8,
                  }}
                >
                  {skill.name}
                </div>
                <div
                  style={{
                    fontFamily: inter,
                    fontSize: 28,
                    color: C.muted,
                  }}
                >
                  {skill.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Annotation */}
        <div
          style={{
            marginTop: 40,
            fontFamily: inter,
            fontSize: 28,
            fontStyle: "italic",
            color: C.muted,
            textAlign: "center",
            opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Names + descriptions only →{" "}
          <span style={{ fontFamily: mono, fontStyle: "normal", color: C.teal }}>87 tokens</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────
// Scene 3: The Selection (300-440, ~4.7 seconds)
// ─────────────────────────────────────────────────────────────
const SceneSelect: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [130, 160], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const selectPulse = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        opacity: fadeIn * fadeOut,
      }}
    >
      <div style={{ width: "100%", maxWidth: 700 }}>
        {/* Header */}
        <div
          style={{
            fontFamily: inter,
            fontSize: 36,
            fontWeight: 500,
            color: C.coral,
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Match found →
        </div>

        {/* Skill List with selection */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {SKILLS.map((skill, i) => {
            const isSelected = skill.name === "remotion-video";
            const dimmed = !isSelected && frame > 40;

            if (dimmed && frame > 60) return null; // Hide non-selected after delay

            return (
              <div
                key={skill.name}
                style={{
                  backgroundColor: isSelected ? C.teal : C.white,
                  borderRadius: 16,
                  padding: "28px 36px",
                  opacity: dimmed ? 0.3 : 1,
                  transform: isSelected
                    ? `scale(${interpolate(selectPulse, [0, 1], [1, 1.03])})`
                    : "scale(1)",
                  boxShadow: isSelected
                    ? "0 12px 48px rgba(30, 77, 77, 0.3)"
                    : "0 4px 16px rgba(0,0,0,0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "opacity 0.2s",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 40,
                      fontWeight: 500,
                      color: isSelected ? C.white : C.ink,
                      marginBottom: 8,
                    }}
                  >
                    {skill.name}
                  </div>
                  <div
                    style={{
                      fontFamily: inter,
                      fontSize: 28,
                      color: isSelected ? "rgba(255,255,255,0.85)" : C.muted,
                    }}
                  >
                    {skill.desc}
                  </div>
                </div>

                {/* Checkmark */}
                {isSelected && frame > 50 && (
                  <div
                    style={{
                      fontSize: 48,
                      color: C.white,
                      opacity: interpolate(frame, [50, 70], [0, 1], {
                        extrapolateRight: "clamp",
                      }),
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────
// Scene 4: The Load (420-540, ~4 seconds)
// ─────────────────────────────────────────────────────────────
const SceneLoad: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [110, 140], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const folderExpand = spring({
    frame: frame - 25,
    fps,
    config: { damping: 100 },
  });

  const contentReveal = spring({
    frame: frame - 50,
    fps,
    config: { damping: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        opacity: fadeIn * fadeOut,
      }}
    >
      <div style={{ width: "100%", maxWidth: 700 }}>
        {/* Header */}
        <div
          style={{
            fontFamily: inter,
            fontSize: 36,
            fontWeight: 500,
            color: C.muted,
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Loading full skill...
        </div>

        {/* Folder structure */}
        <div
          style={{
            fontFamily: mono,
            fontSize: 32,
            color: C.ink,
            backgroundColor: C.white,
            borderRadius: 20,
            padding: 40,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          {/* Folder name */}
          <div style={{ fontWeight: 500, color: C.teal, marginBottom: 20, fontSize: 36 }}>
            remotion-video/
          </div>

          {/* SKILL.md */}
          <div
            style={{
              marginLeft: 32,
              opacity: interpolate(folderExpand, [0, 1], [0, 1]),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: C.dimmed }}>├──</span>
              <span style={{ color: C.coral, fontWeight: 500, fontSize: 34 }}>SKILL.md</span>
            </div>

            {/* SKILL.md content preview */}
            <div
              style={{
                marginLeft: 48,
                marginTop: 16,
                marginBottom: 20,
                padding: 24,
                backgroundColor: C.paper,
                borderRadius: 12,
                borderLeft: `4px solid ${C.coral}`,
                fontSize: 24,
                color: C.muted,
                opacity: interpolate(contentReveal, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(contentReveal, [0, 1], [10, 0])}px)`,
              }}
            >
              <div style={{ color: C.ink, fontWeight: 500, fontSize: 28 }}># Remotion Video</div>
              <div style={{ marginTop: 12 }}>Create videos using</div>
              <div>React components...</div>
            </div>
          </div>

          {/* references/ */}
          <div
            style={{
              marginLeft: 32,
              opacity: interpolate(contentReveal, [0, 1], [0, 0.6]),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: C.dimmed }}>└──</span>
              <span style={{ color: C.dimmed }}>references/</span>
              <span style={{ fontSize: 22, color: C.dimmed, fontStyle: "italic", fontFamily: inter }}>
                (loaded as needed)
              </span>
            </div>
          </div>
        </div>

        {/* Token count */}
        <div
          style={{
            marginTop: 36,
            fontFamily: inter,
            fontSize: 28,
            fontStyle: "italic",
            color: C.muted,
            textAlign: "center",
            opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Full context loaded →{" "}
          <span style={{ fontFamily: mono, fontStyle: "normal", color: C.teal }}>
            2,847 tokens
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────
// Scene 5: Punchline (520-600, ~2.7 seconds)
// ─────────────────────────────────────────────────────────────
const ScenePunchline: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const line1 = spring({ frame: frame - 10, fps, config: { damping: 100 } });
  const line2 = spring({ frame: frame - 30, fps, config: { damping: 100 } });
  const cta = spring({ frame: frame - 50, fps, config: { damping: 80 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* Line 1 */}
        <div
          style={{
            fontFamily: playfair,
            fontSize: 84,
            fontWeight: 500,
            color: C.ink,
            letterSpacing: -2,
            marginBottom: 12,
            opacity: interpolate(line1, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line1, [0, 1], [30, 0])}px)`,
          }}
        >
          Your context.
        </div>

        {/* Line 2 */}
        <div
          style={{
            fontFamily: playfair,
            fontSize: 84,
            fontWeight: 600,
            color: C.coral,
            letterSpacing: -2,
            opacity: interpolate(line2, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line2, [0, 1], [30, 0])}px)`,
          }}
        >
          On demand.
        </div>

        {/* Divider */}
        <div
          style={{
            width: 100,
            height: 3,
            backgroundColor: C.teal,
            margin: "48px auto",
            opacity: interpolate(cta, [0, 1], [0, 1]),
          }}
        />

        {/* CTA */}
        <div
          style={{
            fontFamily: mono,
            fontSize: 36,
            fontWeight: 400,
            color: C.teal,
            letterSpacing: 2,
            opacity: interpolate(cta, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(cta, [0, 1], [15, 0])}px)`,
          }}
        >
          skillstack.md
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────
// Grain Overlay
// ─────────────────────────────────────────────────────────────
const GrainOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity: 0.04,
        mixBlendMode: "multiply",
      }}
    >
      <svg width="100%" height="100%">
        <defs>
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              seed={Math.floor(frame / 4)}
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};
