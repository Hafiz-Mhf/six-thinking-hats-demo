# Six Thinking Hats Web Application - Design System & UI Specification

## 1. Visual Identity & Design Philosophy

The interface design balances **professional presentation clarity** with **intuitive emotional feedback**. When the room shifts hats, the software visually alters the mood, helping participants mentally disengage from debate and transition into the active parallel thinking mode.

### Visual Principles
* **Clear Chromatic Signaling:** The UI palette directly mirrors the active hat color without overwhelming cognitive load.
* **Typographic Hierarchy:** Bold, readable headings tailored for high-legibility projection across a conference room.
* **High Information Density with Generous Whitespace:** Ample card padding to keep brainstorming notes readable and digestible.

---

## 2. Color Palette & Thematic Matrix

Each hat has a dedicated color system containing a primary tone, a subtle background tint (5–10% opacity), a high-contrast text color, and a border accent.

| Hat | Primary Hex | Background Tint | Border Accent | Thematic Meaning & Mood |
| :--- | :--- | :--- | :--- | :--- |
| **White** (Facts & Data) | `#475569` (Slate) | `#F8FAFC` | `#CBD5E1` | Objective, neutral, clean, analytical |
| **Red** (Emotions & Instinct) | `#DC2626` (Red) | `#FEF2F2` | `#FCA5A5` | Passionate, visceral, gut feeling, reactive |
| **Yellow** (Value & Optimism) | `#D97706` (Amber) | `#FFFBEB` | `#FDE68A` | Sunny, constructive, opportunity, hope |
| **Black** (Caution & Risk) | `#1E293B` (Dark Slate) | `#F1F5F9` | `#94A3B8` | Critical, cautious, realistic, protective |
| **Green** (Creativity & Growth) | `#16A34A` (Emerald) | `#F0FDF4` | `#86EFAC` | Generative, fresh, exploratory, expansive |
| **Blue** (Process & Synthesis) | `#2563EB` (Royal Blue) | `#EFF6FF` | `#93C5FD` | Structured, authoritative, calm, holistic |

---

## 3. Screen Layout & Component Anatomy

The application features a responsive three-tier layout:

```
┌────────────────────────────────────────────────────────────────────────┐
│ TOP BAR: Topic Title | Active Hat Badge | Step Indicator (1/4) | Timer │
├────────────────────────────────────────────────────────────────────────┤
│ HAT GUIDING BANNER                                                     │
│ "What are the advantages? What's possible here?" [Yellow Hat]          │
│ Rule: Focus solely on benefits, feasibility, and growth.               │
├────────────────────────────────────────┬───────────────────────────────┤
│ MAIN WORKSPACE (Active Hat Card Wall)  │ FACILITATOR SIDEBAR (Collaps.)│
│                                        │                               │
│ ┌──────────────┐ ┌──────────────┐      │ • Hat Quick Select (1 - 6)    │
│ │ Sticky Note  │ │ Sticky Note  │      │ • Timer Presets (1m, 3m, 5m)  │
│ │ Card         │ │ Card         │      │ • Sequence Preset Dropdown    │
│ └──────────────┘ └──────────────┘      │ • Export to Markdown / Print  │
│                                        │ • Reset Session               │
│ [+ Add New Thought Under This Hat]     │                               │
├────────────────────────────────────────┴───────────────────────────────┤
│ FOOTER: Quick Keyboard Shortcuts (`1-6` Hats, `Space` Pause, `N` New)  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Component Specifications

### 4.1 Active Hat Guiding Banner
* **Prominence:** Fixed under the navigation bar.
* **Elements:**
  1. Hat Icon (3D hat vector or minimalist icon).
  2. Guiding Question in large heading ($24px\text{–}28px$, font weight 700).
  3. Golden Rule pill (e.g., for Red Hat: *"No justification or explanation needed"*).

### 4.2 Sticky Note Card Component
* **Form Factor:** Card component with subtle shadow, slightly curved borders (`rounded-xl`), and color-coded top accent border (`border-t-4`).
* **Micro-Interactions:**
  * Subtle hover lift (`translate-y-[-2px]`).
  * Quick-reaction vote counter (helpful for Green Hat idea prioritisation).
  * One-click delete/archive action for the facilitator.

### 4.3 Matrix Overview / Blue Hat Synthesis View
* **Grid Layout:** Responsive 6-column grid (or $3 \times 2$ grid on mid-sized displays).
* **Header of each column:** Colored hat icon, hat name, and total count of cards generated.
* **Bottom Action Drawer:** Structured table for assigning action items (Owner, Task, Target Date) directly derived from the Yellow/Green/Black hat synthesis.

---

## 5. Keyboard Navigation & Accessibility

To ensure seamless live facilitation without awkward mouse hunting:
* `1` to `6`: Instantly switch active hat mode (1=White, 2=Red, 3=Yellow, 4=Black, 5=Green, 6=Blue).
* `Space`: Start / Pause countdown timer.
* `T`: Add 60 seconds to timer.
* `N`: Focus input field for instant card creation.
* `M`: Toggle Matrix Summary view.
* `Cmd/Ctrl + P`: Formatted printable handout view.