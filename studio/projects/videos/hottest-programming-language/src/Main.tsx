import {
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  interpolate,
  spring,
} from "remotion";
import React from "react";
import { RisographBackground, COLORS } from "./components/RisographBackground";
import { Terminal } from "./components/Terminal";
import { PromptLine, Typewriter } from "./components/Typewriter";
import { Quote } from "./components/Quote";
import { SkillTree } from "./components/SkillTree";

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Risograph paper background */}
      <RisographBackground color={COLORS.paper} grainIntensity={0.12} />

      {/* Scene 1: The Old Way (frames 0-120) - Complex code */}
      <Sequence from={0} durationInFrames={150}>
        <Scene1OldWay />
      </Sequence>

      {/* Scene 2: The Plot Twist (frames 120-240) - Plain English */}
      <Sequence from={120} durationInFrames={150}>
        <Scene2NewWay />
      </Sequence>

      {/* Scene 3: The Quote (frames 240-360) */}
      <Sequence from={240} durationInFrames={130}>
        <Scene3Quote />
      </Sequence>

      {/* Scene 4: The Skill Stack (frames 340-450) */}
      <Sequence from={320} durationInFrames={130}>
        <Scene4SkillStack />
      </Sequence>

      {/* Risograph grain overlay */}
      <GrainOverlay />
    </div>
  );
};

// Scene 1: Complex code approach
const Scene1OldWay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade out at end
  const fadeOut = interpolate(frame, [120, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const complexCode = `python -c "
  import openai
  client = openai.OpenAI()
  response = client.chat.completions.create(
    model='gpt-4',
    messages=[{'role': 'user', 'content': '...'}]
  )
  print(response.choices[0].message.content)"`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Label */}
      <div
        style={{
          marginBottom: 24,
          color: COLORS.teal,
          fontSize: 20,
          fontFamily: "'SF Pro Display', sans-serif",
          fontWeight: 500,
          letterSpacing: 2,
          textTransform: "uppercase",
          opacity: frame > 10 ? 1 : 0,
        }}
      >
        The Old Way
      </div>

      <Terminal title="terminal — python" style="dark">
        <PromptLine
          command={complexCode}
          startFrame={15}
          charsPerSecond={35}
          promptColor={COLORS.coral}
        />
      </Terminal>
    </div>
  );
};

// Scene 2: Plain English approach
const Scene2NewWay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const fadeOut = interpolate(frame, [120, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const simpleCommand = `claude "Turn this transcript into a newsletter in my voice"`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Label */}
      <div
        style={{
          marginBottom: 24,
          color: COLORS.coral,
          fontSize: 20,
          fontFamily: "'SF Pro Display', sans-serif",
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        The New Way
      </div>

      <Terminal title="skill-stack — zsh" style="dark">
        <PromptLine
          command={simpleCommand}
          startFrame={25}
          charsPerSecond={18}
          promptColor="#27CA40"
        />

        {/* Output appears after typing */}
        {frame > 90 && (
          <div
            style={{
              marginTop: 20,
              color: "#888",
              fontSize: 16,
              opacity: interpolate(frame, [90, 100], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div style={{ color: COLORS.coral }}>
              ✓ Loading voice-matching skill...
            </div>
            <div style={{ color: "#27CA40", marginTop: 4 }}>
              ✓ Newsletter draft ready
            </div>
          </div>
        )}
      </Terminal>
    </div>
  );
};

// Scene 3: The Karpathy Quote
const Scene3Quote: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in/out
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [100, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn * fadeOut,
      }}
    >
      <Quote
        text="The hottest new programming language is English."
        author="Andrej Karpathy"
        startFrame={10}
      />
    </div>
  );
};

// Scene 4: The Skill Stack reveal
const Scene4SkillStack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
      }}
    >
      {/* Title */}
      <div
        style={{
          marginBottom: 32,
          color: COLORS.teal,
          fontSize: 28,
          fontFamily: "'SF Pro Display', sans-serif",
          fontWeight: 600,
          letterSpacing: 1,
        }}
      >
        Your Skills. Your Context. Your Moat.
      </div>

      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.8)",
          padding: "32px 48px",
          borderRadius: 12,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <SkillTree startFrame={20} />
      </div>

      {/* CTA */}
      {frame > 80 && (
        <div
          style={{
            marginTop: 40,
            color: COLORS.coral,
            fontSize: 22,
            fontFamily: "'SF Pro Display', sans-serif",
            fontWeight: 500,
            opacity: interpolate(frame, [80, 100], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          skillstack.md
        </div>
      )}
    </div>
  );
};

// Global grain overlay
const GrainOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        mixBlendMode: "overlay",
        opacity: 0.08,
      }}
    >
      <svg width="100%" height="100%">
        <defs>
          <filter id="grain-overlay">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              seed={frame % 10}
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#grain-overlay)" />
      </svg>
    </div>
  );
};
