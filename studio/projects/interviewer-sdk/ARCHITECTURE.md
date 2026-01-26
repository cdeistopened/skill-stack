# Interviewer Tool SDK — Architecture

A flexible, reusable framework for building adaptive interview chatbots powered by Claude Agent SDK.

---

## Core Concept

An **Interviewer Agent** that:
1. Has a **goal** (what information to extract)
2. Has **context** (about the domain, product, or content)
3. **Adapts** to the person being interviewed
4. Stays **goal-oriented** while being conversational

---

## The Three Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    INTERVIEWER SDK                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  LAYER 1: INTERVIEW CONFIG                          │   │
│  │  ─────────────────────────                          │   │
│  │  • Goal definition (what are we learning?)          │   │
│  │  • Question bank (starter questions)                │   │
│  │  • Completion criteria (when are we done?)          │   │
│  │  • Output schema (structured data to extract)       │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  LAYER 2: DOMAIN CONTEXT                            │   │
│  │  ─────────────────────────                          │   │
│  │  • Domain knowledge (book content, curriculum DB)   │   │
│  │  • Reference materials (what the interviewer knows) │   │
│  │  • Constraints (what NOT to discuss)                │   │
│  │  • Persona (tone, style, character)                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  LAYER 3: ADAPTIVE ENGINE                           │   │
│  │  ─────────────────────────                          │   │
│  │  • Tracks what's been learned so far                │   │
│  │  • Decides next best question                       │   │
│  │  • Detects when to probe deeper vs. move on         │   │
│  │  • Generates final structured output                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Interview Config Schema

```typescript
interface InterviewConfig {
  // Identity
  id: string;
  name: string;
  version: string;
  
  // Goal
  goal: string;  // "Determine the user's homeschool philosophy and recommend curricula"
  
  // Questions
  starterQuestions: string[];  // Initial questions to ask
  probeQuestions?: Record<string, string[]>;  // Follow-ups by topic
  
  // Completion
  requiredFields: string[];  // Must extract these before done
  maxTurns?: number;  // Optional limit
  completionPrompt?: string;  // How to wrap up
  
  // Output
  outputSchema: JSONSchema;  // Structured data to produce
  
  // Behavior
  adaptiveness: "rigid" | "moderate" | "free";  // How much to deviate from script
  persona?: string;  // "Friendly curriculum advisor" / "Neutral researcher"
}
```

---

## Domain Context Schema

```typescript
interface DomainContext {
  // Knowledge base
  documents?: string[];  // Markdown files, book chapters, etc.
  database?: {
    type: "supabase" | "convex" | "json";
    connection: string;
    queryCapabilities: string[];
  };
  
  // Reference materials
  references?: Record<string, string>;  // key-value knowledge
  
  // Constraints
  doNotDiscuss?: string[];  // Topics to avoid
  stayWithin?: string;  // Boundary description
  
  // Persona
  persona?: {
    name?: string;
    tone: string;  // "warm and encouraging" / "neutral and professional"
    firstMessage: string;
  };
}
```

---

## Use Case 1: Beta Reader Feedback Interviewer

### Config
```yaml
name: "Benedict Challenge Beta Reader Interview"
goal: "Gather feedback on book concept, identify if reader is ideal target, extract specific content preferences"

starterQuestions:
  - "What drew you to a book about fasting and discipline?"
  - "Have you tried any kind of fasting practice before?"
  - "What would make this book a must-read for you vs. a pass?"

requiredFields:
  - fasting_experience_level
  - primary_motivation
  - content_preferences
  - pain_points
  - would_recommend

outputSchema:
  type: object
  properties:
    fasting_experience_level:
      enum: [never, dabbled, practiced, advanced]
    primary_motivation:
      enum: [health, spiritual, discipline, weight_loss, other]
    content_preferences:
      type: array
      items:
        enum: [practical_how_to, theology, science, personal_stories, meal_plans]
    pain_points:
      type: array
    would_recommend:
      type: boolean
    ideal_reader_score:
      type: number
      minimum: 1
      maximum: 10
    raw_quotes:
      type: array
      description: "Verbatim quotes worth capturing"
```

### Domain Context
```yaml
documents:
  - "/Benedict Challenge/Book/Introduction.md"
  - "/Benedict Challenge/Book/Chapter 1.md"
  - "/Benedict Challenge/Book/Source Material/architecture-of-monastic-discipline.md"

persona:
  tone: "curious researcher, genuinely interested in their experience"
  firstMessage: "Thanks for being a beta reader! I'd love to learn about what brought you to this book and what you're hoping to get from it. No right or wrong answers — just your honest perspective."
```

---

## Use Case 2: Curriculove Philosophy Quiz

### Config
```yaml
name: "Curriculove Homeschool Philosophy Finder"
goal: "Determine user's homeschool philosophy/style and recommend matching curricula from database"

starterQuestions:
  - "What matters most to you in your child's education?"
  - "How do you feel about structure vs. flexibility in learning?"
  - "What's your biggest challenge or frustration with homeschooling right now?"

adaptiveness: "moderate"  # Follow threads but stay on goal

requiredFields:
  - philosophy_type
  - structure_preference
  - learning_style
  - subject_priorities
  - budget_range

outputSchema:
  type: object
  properties:
    philosophy_type:
      enum: [classical, charlotte_mason, montessori, unschooling, eclectic, traditional, waldorf]
    structure_preference:
      enum: [highly_structured, moderate, flexible, child_led]
    learning_style:
      enum: [visual, auditory, kinesthetic, reading_writing, mixed]
    subject_priorities:
      type: array
    budget_range:
      enum: [minimal, moderate, flexible]
    recommended_curricula:
      type: array
      items:
        type: object
        properties:
          name: string
          match_score: number
          reason: string
```

### Domain Context
```yaml
database:
  type: "convex"
  connection: "curriculove-db"
  queryCapabilities:
    - "search curricula by philosophy"
    - "filter by subject"
    - "filter by price range"
    - "get reviews"

documents:
  - "philosophy-descriptions.md"
  - "curriculum-matching-rules.md"

persona:
  name: "Sage"
  tone: "warm, encouraging, non-judgmental"
  firstMessage: "Hi! I'm here to help you find curricula that actually fit how your family learns. Let's start with what matters most to you..."
```

---

## Adaptive Engine Logic

### Core Loop

```
1. ASSESS: What do we know? What's missing?
2. DECIDE: What's the best next question?
   - If required field missing → ask about it
   - If answer was vague → probe deeper
   - If interesting thread → follow it (if adaptiveness allows)
   - If all required fields → wrap up
3. ASK: Generate natural question
4. LISTEN: Parse response, extract structured data
5. UPDATE: Add to knowledge, loop back to ASSESS
```

### Adaptive Behaviors

| Signal | Behavior |
|--------|----------|
| Short answer | Probe with "Tell me more about..." |
| Emotional response | Acknowledge, then gently redirect |
| Off-topic tangent | "That's interesting — let me note that. Back to..." |
| Confusion | Rephrase question, give examples |
| Strong opinion | Capture quote verbatim, probe reasoning |
| All fields complete | Summarize, ask if anything to add, close |

---

## Deployment Modes

### 1. One-Time Script (Quick Deploy)
```bash
npx interviewer-sdk run --config ./beta-reader.yaml
```
Opens chat interface, runs interview, exports JSON.

### 2. Embedded Component (React)
```jsx
import { Interviewer } from '@clm/interviewer-sdk';

<Interviewer 
  config={curriculoveConfig}
  context={domainContext}
  onComplete={(results) => saveToDatabase(results)}
/>
```

### 3. API Endpoint
```
POST /api/interview/start
POST /api/interview/:sessionId/message
GET /api/interview/:sessionId/results
```

### 4. Claude Agent SDK Integration
```python
from anthropic import Agent
from interviewer_sdk import InterviewerTool

agent = Agent(
  tools=[InterviewerTool(config=my_config)]
)
```

---

## File Structure

```
interviewer-sdk/
├── ARCHITECTURE.md          # This file
├── src/
│   ├── core/
│   │   ├── engine.ts        # Adaptive interview logic
│   │   ├── config.ts        # Config parsing/validation
│   │   └── output.ts        # Structured output generation
│   ├── integrations/
│   │   ├── convex.ts        # Database connector
│   │   ├── supabase.ts
│   │   └── claude.ts        # Claude API wrapper
│   └── components/
│       └── Interviewer.tsx  # React component
├── configs/
│   ├── beta-reader.yaml
│   ├── curriculove-quiz.yaml
│   └── story-interviewer.yaml
├── cli/
│   └── run.ts               # CLI runner
└── examples/
    ├── one-time/
    └── embedded/
```

---

## Next Steps

1. [ ] Define core engine interface
2. [ ] Build config parser + validator
3. [ ] Create first working prototype (CLI mode)
4. [ ] Test with Beta Reader config
5. [ ] Integrate with Curriculove (replace current quiz)
6. [ ] Package as reusable SDK

---

## Potential Use Cases Beyond These Two

- **Onboarding interviews** (Anyone Can Claude Code)
- **Customer research** (product discovery)
- **User testing** (gather feedback on prototypes)
- **Intake forms** (convert static forms to adaptive conversations)
- **Coaching sessions** (guided self-reflection)
- **Sales qualification** (lead scoring through conversation)

---

*Created: 2026-01-25*
*Status: Architecture draft*
