import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";

type TypewriterProps = {
  text: string;
  startFrame?: number;
  charsPerSecond?: number;
  color?: string;
  showCursor?: boolean;
  cursorColor?: string;
};

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  startFrame = 0,
  charsPerSecond = 20,
  color = "#E0E0E0",
  showCursor = true,
  cursorColor = "#E07B53",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate how many characters to show
  const framesPerChar = fps / charsPerSecond;
  const elapsedFrames = Math.max(0, frame - startFrame);
  const charsToShow = Math.floor(elapsedFrames / framesPerChar);
  const visibleText = text.slice(0, charsToShow);
  const isComplete = charsToShow >= text.length;

  // Cursor blink (every 0.5 seconds)
  const cursorVisible = Math.floor((frame * 2) / fps) % 2 === 0 || !isComplete;

  return (
    <span style={{ color }}>
      {visibleText}
      {showCursor && (
        <span
          style={{
            backgroundColor: cursorColor,
            color: "transparent",
            opacity: cursorVisible ? 1 : 0,
            marginLeft: 2,
          }}
        >
          {"\u00A0"}
        </span>
      )}
    </span>
  );
};

// Prompt component for terminal
type PromptLineProps = {
  command: string;
  startFrame?: number;
  charsPerSecond?: number;
  promptText?: string;
  promptColor?: string;
};

export const PromptLine: React.FC<PromptLineProps> = ({
  command,
  startFrame = 0,
  charsPerSecond = 20,
  promptText = "$ ",
  promptColor = "#27CA40",
}) => {
  const frame = useCurrentFrame();

  // Show prompt immediately, then type command
  const showPrompt = frame >= startFrame;

  return (
    <div style={{ display: "flex" }}>
      {showPrompt && (
        <>
          <span style={{ color: promptColor }}>{promptText}</span>
          <Typewriter
            text={command}
            startFrame={startFrame + 5}
            charsPerSecond={charsPerSecond}
          />
        </>
      )}
    </div>
  );
};
