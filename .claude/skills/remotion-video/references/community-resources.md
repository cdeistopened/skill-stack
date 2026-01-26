# Remotion Community Resources

Curated links, templates, and learning resources for Remotion video creation.

---

## Official Resources

### Documentation
- [Remotion Docs](https://remotion.dev/docs) - Comprehensive API reference
- [Remotion Blog](https://remotion.dev/blog) - Release notes, tutorials
- [GitHub](https://github.com/remotion-dev/remotion) - Source, issues, discussions

### Discord Community
- [Remotion Discord](https://remotion.dev/discord) - 6,000+ members
- Active channels: #help, #showcase, #jobs
- Jonny Burger (creator) responds directly

---

## Templates & Starters

### Official Templates

**TikTok Template**
- Vertical 9:16 format
- Animated text, transitions
- [GitHub: remotion-dev/template-tiktok](https://github.com/remotion-dev/template-tiktok)

**Audiogram**
- Audio visualization
- Waveform graphics
- [GitHub: remotion-dev/template-audiogram](https://github.com/remotion-dev/template-audiogram)

**GitHub Unwrapped**
- Data-driven video generation
- API integration example
- [GitHub: remotion-dev/github-unwrapped](https://github.com/remotion-dev/github-unwrapped)

### Community Templates

**claude-remotion-kickstart**
- Starter for AI-assisted video creation
- Pre-configured with common patterns
- [GitHub: claude-remotion-kickstart](https://github.com/search?q=claude-remotion-kickstart)

**Remotion Skia**
- 2D graphics with Skia rendering
- High-performance shapes and paths
- [Docs: remotion.dev/docs/skia](https://remotion.dev/docs/skia)

---

## Example Projects (Study These)

### 1. GitHub Unwrapped (Data Visualization)

What it does: Generates personalized year-in-review videos from GitHub data.

Key techniques:
- Dynamic data fetching
- Progress animations
- Number counting effects
- Multi-scene orchestration

Study for: Data-driven video generation

### 2. Remotion Trailer (Marketing)

What it does: Remotion's own promotional video.

Key techniques:
- Code visualization
- IDE animation
- Split-screen layouts
- Professional motion design

Study for: Product explainers, marketing videos

### 3. Podcast Clip Generator (Audio)

What it does: Turns podcast audio into visual clips.

Key techniques:
- Waveform visualization
- Subtitle timing
- Speaker identification
- Audio-reactive elements

Study for: Podcast clips, audiograms

---

## Visual Style References

### Risograph/Textured
- Grain overlays
- Limited color palettes
- Print-inspired aesthetics
- See: Skill Stack brand style

### Corporate/Clean
- Sans-serif typography
- Subtle animations
- Data visualization
- See: GitHub Unwrapped

### Social/Viral
- Bold text
- Quick cuts
- High contrast
- See: TikTok template

### Documentary
- Minimal UI
- Talking head compositions
- Lower thirds
- See: Audiogram template

---

## Learning Path

### Beginner
1. Complete [Remotion 101 tutorial](https://remotion.dev/docs/the-fundamentals)
2. Fork TikTok template, modify text
3. Build a simple 5-scene video

### Intermediate
1. Study spring animations and timing
2. Build reusable component library
3. Create multi-aspect-ratio compositions

### Advanced
1. Integrate with external APIs
2. Build caption pipeline
3. Create Lambda rendering workflow

---

## Useful Packages

### Core
- `@remotion/player` - Embed videos in web apps
- `@remotion/lambda` - Serverless rendering on AWS
- `@remotion/gif` - GIF rendering support

### Typography
- `@remotion/google-fonts` - Easy Google Fonts loading
- `@remotion/layout-utils` - Text measurement utilities

### Media
- `@remotion/captions` - Caption generation and display
- `@remotion/install-whisper-cpp` - Local Whisper installation
- `@remotion/media-parser` - Video/audio metadata

### Graphics
- `@remotion/skia` - 2D vector graphics
- `@remotion/three` - 3D with Three.js
- `@remotion/lottie` - Lottie animations

---

## Cost Comparison: Rendering Options

| Method | Cost | Speed | Best For |
|--------|------|-------|----------|
| Local | Free | Slow | Development, small batches |
| Lambda | ~$0.01/video | Fast | Production, high volume |
| Remotion Cloud | Pay-as-you-go | Fastest | No AWS setup |

---

## Common Patterns (Copy These)

### Staggered List Entry
```tsx
{items.map((item, i) => (
  <animated.div
    key={item}
    delay={i * 10}
    duration={20}
    translateY={[20, 0]}
    opacity={[0, 1]}
  >
    {item}
  </animated.div>
))}
```

### Scene Manager
```tsx
const scenes = [
  { start: 0, end: 90, component: Scene1 },
  { start: 60, end: 180, component: Scene2 },
  { start: 150, end: 270, component: Scene3 },
];

{scenes.map(({ start, end, component: Scene }) => (
  frame >= start && frame < end && <Scene frame={frame - start} />
))}
```

### Progress Bar
```tsx
const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
  extrapolateRight: "clamp",
});

<div style={{
  width: `${progress}%`,
  height: 4,
  backgroundColor: C.coral,
}} />
```

---

## Stay Updated

- [Remotion Twitter](https://twitter.com/remotaborat) - @remotaborat
- [Jonny Burger Twitter](https://twitter.com/JNYBGR) - Creator's personal account
- [Changelog](https://remotion.dev/changelog) - All releases

---

*Last updated: January 2026*
