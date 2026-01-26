# Spiral Design System

## Extracted from Production UI (December 2025)

---

## Brand Colors

### Primary
```css
--color-brand-primary: color(display-p3 0.996 0.498 0.008);
/* Equivalent: #FE7F02 / rgb(253, 127, 1) - Spiral Orange */
```

### Backgrounds
```css
--color-backgrounds-primary: color(display-p3 1 1 1);        /* #FFFFFF */
--color-backgrounds-secondary: color(display-p3 0.949 0.949 0.969); /* #F2F2F7 */
--color-backgrounds-tertiary: color(display-p3 1 1 1);      /* #FFFFFF */
--color-component-expandedsidebar: color(display-p3 0.98 0.98 0.98); /* #FAFAFA */
```

### Labels (Text)
```css
--color-labels-primary: color(display-p3 0 0 0);            /* #000000 */
--color-labels-secondary: color(display-p3 0.235 0.235 0.263 / 0.6); /* rgba(60, 60, 67, 0.6) */
--color-labels-tertiary: color(display-p3 0.235 0.235 0.263 / 0.3);  /* rgba(60, 60, 67, 0.3) */
--color-labels-quaternary: color(display-p3 0.235 0.235 0.263 / 0.18);
```

### Fills
```css
--color-fills-primary: color(display-p3 0.471 0.471 0.502 / 0.2);
--color-fills-secondary: color(display-p3 0.471 0.471 0.502 / 0.16);
--color-fills-tertiary: color(display-p3 0.471 0.471 0.502 / 0.12);
--color-fills-quaternary: color(display-p3 0.471 0.471 0.502 / 0.08);
```

### Separators
```css
--color-separators-opaque: color(display-p3 0.776 0.776 0.784); /* #C6C6C8 */
--color-separators-non-opaque: color(display-p3 0.329 0.329 0.337 / 0.34);
```

### Neutrals (UI Elements)
```css
--color-neutral-6: /* Light hover/selected state */
--color-neutral-8: /* Border color */
--color-neutral-12: /* Hover state */
--color-neutral-40: /* Tertiary icons */
--color-neutral-48: /* Secondary menu items */
```

### Status Colors
```css
--color-assistantstatus-text: color(display-p3 0.8 0.3 0);
--color-assistantstatus-icon: color(display-p3 0.8 0.3 0);
/* Warm orange for AI status indicators */
```

---

## Typography

### Font Families
```css
/* Primary Serif - Headlines */
font-family: "Louize", serif;

/* Primary Sans - UI & Body */
font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
```

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing | Font |
|---------|------|--------|-------------|----------------|------|
| Hero Heading | 42px | normal | 41px | -1px | Louize |
| Logo Text | 24px | 500 | 16px | -0.48px | Louize |
| Section Label | 12px | 500 | normal | -0.24px | SF Pro |
| Menu Item | 16px | 500 | 16px | -0.32px | SF Pro |
| Body Text | 18px | 400 | 20px | -0.36px | SF Pro |
| Button Text | 14px | 500 | 32px | -0.28px | SF Pro |
| Small Text | 14px | 400 | normal | -0.28px | SF Pro |
| Caption | 12px | 400 | normal | -0.24px | SF Pro |

### Text Styles

```css
/* Hero Heading */
.hero-heading {
  font-size: 42px;
  line-height: 41px;
  font-family: Louize, serif;
  letter-spacing: -1px;
  color: var(--color-text-heading);
}

/* Section Label */
.section-label {
  font-size: 12px;
  opacity: 0.4;
  letter-spacing: -0.24px;
  font-weight: 500;
  color: var(--color-labels-primary);
}

/* Menu Item */
.menu-item {
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.32px;
}
```

---

## Spacing System

### Base Unit: 4px

| Token | Value | Use |
|-------|-------|-----|
| xs | 4px | Tight spacing |
| sm | 8px | Icon gaps |
| md | 12px | Component padding |
| lg | 16px | Section spacing |
| xl | 20px | Large gaps |
| 2xl | 24px | Section margins |
| 3xl | 32px | Major sections |

### Component Spacing
```css
/* Sidebar */
--sidebar-width: 296px;
--sidebar-width-icon: 58px;
--sidebar-padding: 16px;
--sidebar-item-padding: 8px;

/* Main Content */
--content-max-width: 900px;
--input-max-width: 742px;
```

---

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| pill | 96px / 1e+06px | Buttons, badges |
| lg | 20px | Input containers |
| md | 14px | Cards, main outlet |
| sm | 10px | Menu items |
| xs | 8px | Small buttons |
| icon | 6px | Icon containers |

---

## Shadows

```css
/* Extra Small - Cards */
--shadow-xs: /* Light shadow for cards */

/* Input Focus */
.query-bar:focus-within {
  box-shadow: var(--shadow-xs);
}
```

---

## Components

### Logo Mark
```css
.logo-mark {
  background: var(--color-brand-primary);
  border-radius: var(--radius-pill);
  padding: 13px 12px;
  /* Contains white spiral SVG */
}
```

### Sidebar Menu Item
```css
.sidebar-item {
  height: 32px;
  padding: 8px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-item:hover {
  background: var(--color-neutral-6);
}

.sidebar-item.active {
  background: var(--color-neutral-6);
}

.sidebar-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Workspace Badge
```css
.workspace-badge {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  font-family: Louize, serif;
  color: white;
  /* Background: workspace color */
}

.workspace-badge-small {
  width: 16px;
  height: 16px;
  font-size: 8px;
}
```

### Query Bar (Main Input)
```css
.query-bar {
  padding: 14px;
  border-radius: 20px;
  background: linear-gradient(
    to bottom,
    var(--color-chat-input-bg-from),
    var(--color-chat-input-bg-to)
  );
  border: 1px solid var(--color-chat-input-border);
  box-shadow: var(--shadow-xs);
}

.query-bar:focus-within {
  background: var(--color-chat-input-focus-bg);
  border-color: var(--color-chat-input-focus-border);
}
```

### Content Editable Input
```css
.input-editable {
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.36px;
  color: var(--color-text-primary);
  min-height: 60px;
  caret-color: var(--color-brand-primary);
}

.input-editable::placeholder {
  color: var(--color-labels-tertiary);
}
```

### Circular Icon Button
```css
.icon-button {
  width: 32px;
  height: 32px;
  border-radius: 96px;
  background: var(--color-neutral-6);
  border: 1px solid var(--color-neutral-8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-button:hover {
  background: var(--color-neutral-12);
}

.icon-button svg {
  width: 16px;
  height: 16px;
  color: var(--color-neutral-40);
}
```

### Pill Button
```css
.pill-button {
  height: 32px;
  padding: 0 11px;
  border-radius: 96px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.pill-button-primary {
  background: var(--color-brand-primary);
  color: white;
}

.pill-button-secondary {
  background: var(--color-neutral-6);
  border: 1px solid var(--color-neutral-8);
  color: var(--color-neutral-40);
}

.pill-button:disabled {
  background: var(--color-disabled-bg);
  color: var(--color-disabled-text);
  cursor: not-allowed;
}
```

### Main Outlet (Content Area)
```css
.main-outlet {
  border: 1px solid var(--color-outlet-border);
  border-radius: 14px;
  box-shadow: var(--shadow-xs);
  overflow: hidden;
  background: white;
}
```

### Plan Badge
```css
.plan-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: var(--color-brand-primary);
  color: white;
}
```

---

## Iconography

### Icon Sizes
| Context | Size |
|---------|------|
| Sidebar menu | 20px |
| Input buttons | 14-16px |
| Small indicators | 16px |
| Large features | 24px |

### Icon Style
- Two-tone style with opacity layers
- Primary stroke: currentColor
- Secondary fills: currentColor with opacity: 0.4
- Stroke width: 1-2px depending on size

### Common Icons Used
- New writing session: Leaf/plant icon
- Styles: Book icon
- What's new: Megaphone icon
- Feedback: Chat bubble icon
- Shortcuts: Grid/command icon
- Dark mode: Moon icon
- Microphone: Voice input
- Plus: Add attachment
- User: Profile/workspace

---

## Animation & Transitions

```css
/* Standard transition */
transition: all 0.2s ease;

/* Color transitions */
transition: colors 0.15s ease;
transition: opacity 0.15s ease;

/* Sidebar collapse */
transition: width 0.2s ease-linear;

/* Fade in animation */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.2s ease;
}
```

---

## Layout Patterns

### Sidebar Structure
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Logo] Spiral    [Toggle]  â”‚  Header
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ â—‹ New writing session      â”‚  Primary Actions
â”‚ â—‹ Styles                   â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Workspaces                 â”‚  Section Label
â”‚ â— Personal                 â”‚  Workspace List
â”‚ â—‹ OpenEd                   â”‚
â”‚ + Create a Workspace       â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ History                    â”‚  Section Label
â”‚ â—‹ ADHD and Autism...       â”‚  History Items
â”‚ â—‹ Landing Page for...      â”‚  (scrollable)
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Plan         [Every Badge] â”‚  Footer Items
â”‚ â—‹ What's new               â”‚
â”‚ â—‹ Feedback                 â”‚
â”‚ â—‹ Shortcuts                â”‚
â”‚ â—‹ Dark mode                â”‚
â”‚ [Avatar] Account           â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Main Content Area
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                                            â”‚
â”‚                                            â”‚
â”‚     What are we [writing] today, Charlie?  â”‚
â”‚                                            â”‚
â”‚     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”     â”‚
â”‚     â”‚ I'm writing a piece about...   â”‚     â”‚
â”‚     â”‚                                â”‚     â”‚
â”‚     â”‚                                â”‚     â”‚
â”‚     â”‚ [+] [ðŸŽ¤] [Create style]  [â†’]   â”‚     â”‚
â”‚     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â”‚
â”‚                                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Noise Texture Overlay

```css
/* Applied to page background */
.noise-overlay {
  opacity: 0.65;
  mix-blend-mode: soft-light;
  pointer-events: none;
  position: absolute;
  inset: 0;
}

/* Generated via SVG filter */
<feTurbulence type="fractalNoise" baseFrequency="1 1" numOctaves="3" />
```

---

## Dark Mode Considerations

The system uses CSS custom properties that would swap for dark mode:
- Background colors invert
- Text colors become light
- Neutral fills adjust opacity
- Brand orange remains consistent
- Shadows become lighter/more subtle

---

## Key Design Principles

1. **Warmth** - Orange brand color, serif headlines, friendly copy
2. **Minimalism** - Clean layouts, generous whitespace
3. **Approachability** - Rounded corners, soft shadows
4. **Consistency** - Strict adherence to spacing/type system
5. **Personality** - Louize serif adds character to headings
6. **Focus** - Single primary action per view
