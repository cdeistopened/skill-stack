# Caption Workflow for Remotion Videos

Three approaches, ranked by cost and complexity.

---

## Option 1: Native Remotion + Whisper (Recommended)

**Cost:** Free (local processing)
**Quality:** High (OpenAI's Whisper model)
**Setup:** ~10 minutes

Remotion now has first-class caption support via `@remotion/captions`.

### Installation

```bash
# Install caption packages
npm install @remotion/captions @remotion/install-whisper-cpp

# Install Whisper model (one-time, ~500MB)
npx @remotion/install-whisper-cpp --model large-v3-turbo
```

### Generate Captions from Audio

```tsx
import { transcribe } from "@remotion/captions";

// Transcribe audio file
const result = await transcribe({
  inputPath: "/path/to/audio.mp3",
  model: "large-v3-turbo",
  language: "en",
});

// result.captions contains timestamped words
console.log(result.captions);
// [{ text: "Hello", startTime: 0, endTime: 0.5 }, ...]
```

### Display Captions in Video

```tsx
import { useCurrentFrame, useVideoConfig } from "remotion";
import type { Caption } from "@remotion/captions";

interface CaptionDisplayProps {
  captions: Caption[];
}

export const CaptionDisplay: React.FC<CaptionDisplayProps> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Find current caption
  const currentCaption = captions.find(
    (cap) => currentTime >= cap.startTime && currentTime <= cap.endTime
  );

  if (!currentCaption) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        left: 0,
        right: 0,
        textAlign: "center",
        padding: "0 40px",
      }}
    >
      <span
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#FFFFFF",
          padding: "12px 24px",
          borderRadius: 8,
          fontSize: 32,
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
        }}
      >
        {currentCaption.text}
      </span>
    </div>
  );
};
```

### Word-by-Word Animation (TikTok Style)

```tsx
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Caption } from "@remotion/captions";

interface AnimatedCaptionsProps {
  captions: Caption[];
  wordsPerLine?: number;
}

export const AnimatedCaptions: React.FC<AnimatedCaptionsProps> = ({
  captions,
  wordsPerLine = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Group captions into lines
  const lines: Caption[][] = [];
  for (let i = 0; i < captions.length; i += wordsPerLine) {
    lines.push(captions.slice(i, i + wordsPerLine));
  }

  // Find current line
  const currentLineIndex = lines.findIndex((line) => {
    const start = line[0].startTime;
    const end = line[line.length - 1].endTime;
    return currentTime >= start && currentTime <= end;
  });

  if (currentLineIndex === -1) return null;

  const currentLine = lines[currentLineIndex];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 200,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 12,
        flexWrap: "wrap",
        padding: "0 60px",
      }}
    >
      {currentLine.map((word, i) => {
        const isActive = currentTime >= word.startTime;
        const isPast = currentTime > word.endTime;

        return (
          <span
            key={`${word.text}-${word.startTime}`}
            style={{
              fontSize: 48,
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)",
              textShadow: isActive
                ? "0 4px 20px rgba(0, 0, 0, 0.8)"
                : "none",
              transform: isActive ? "scale(1.1)" : "scale(1)",
              transition: "all 0.1s ease-out",
            }}
          >
            {word.text}
          </span>
        );
      })}
    </div>
  );
};
```

---

## Option 2: ZapCap API

**Cost:** $0.10/minute
**Quality:** High
**Setup:** API key required

ZapCap is a specialized caption API built for short-form video.

### API Usage

```typescript
const ZAPCAP_API_KEY = process.env.ZAPCAP_API_KEY;

async function generateCaptions(videoUrl: string) {
  const response = await fetch("https://api.zapcap.ai/v1/transcribe", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ZAPCAP_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: videoUrl,
      language: "en",
      format: "json",
    }),
  });

  return response.json();
}
```

### When to Use ZapCap

- Processing many videos in batch
- Need faster turnaround than local Whisper
- Don't want to deal with local model installation

---

## Option 3: Submagic API

**Cost:** $0.69/minute (Business plan required)
**Quality:** High + style presets
**Setup:** Business subscription

Submagic offers pre-styled caption templates but at higher cost.

### When to Use Submagic

- Need pre-built "viral" caption styles
- Budget allows $0.69/min
- Want web-based workflow alongside API

---

## Caption Style Presets

### Minimal (Clean Documentary)

```tsx
const minimalStyle = {
  fontFamily: "Inter, sans-serif",
  fontSize: 28,
  fontWeight: 500,
  color: "#FFFFFF",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  padding: "8px 16px",
  borderRadius: 4,
};
```

### Bold (Social Media)

```tsx
const boldStyle = {
  fontFamily: "Inter, sans-serif",
  fontSize: 48,
  fontWeight: 800,
  color: "#FFFFFF",
  textShadow: "0 4px 20px rgba(0, 0, 0, 0.9)",
  textTransform: "uppercase" as const,
  letterSpacing: 2,
};
```

### Karaoke (Word Highlight)

```tsx
const karaokeStyle = (isActive: boolean) => ({
  fontFamily: "Inter, sans-serif",
  fontSize: 40,
  fontWeight: 700,
  color: isActive ? "#FFD700" : "#FFFFFF",
  textShadow: isActive
    ? "0 0 20px rgba(255, 215, 0, 0.8)"
    : "0 2px 10px rgba(0, 0, 0, 0.5)",
});
```

### Skill Stack Brand

```tsx
const skillStackStyle = {
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 32,
  fontWeight: 500,
  color: "#FAF8F5",
  backgroundColor: "#1E4D4D",
  padding: "12px 20px",
  borderRadius: 8,
};
```

---

## Best Practices

1. **Position captions in safe zone** - Bottom 20% of frame, with padding from edges
2. **Use readable fonts** - Sans-serif, minimum 28px for mobile viewing
3. **Add background or shadow** - Pure white text on video is often illegible
4. **Match video pacing** - 4-6 words per caption chunk for social content
5. **Test on mobile** - Most viewers watch on phones in portrait mode

---

## Troubleshooting

### Whisper installation fails
```bash
# Try with explicit path
npx @remotion/install-whisper-cpp --model large-v3-turbo --output ~/.remotion-whisper
```

### Captions out of sync
- Check audio sample rate matches video fps
- Verify timestamp format (seconds vs. frames)

### Memory issues with large files
- Use `large-v3-turbo` instead of `large-v3` (faster, smaller)
- Process in chunks for videos >10 minutes
