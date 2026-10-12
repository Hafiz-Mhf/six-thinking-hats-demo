# Six Thinking Hats Interactive Facilitator & Team Playbook — Design Specification

- **Date:** 2026-10-12
- **Topic:** Six Thinking Hats Interactive Facilitator Web Application & Daily Work Playbook
- **Target Audience:** Internal Engineering & Cross-Functional Team Members, Facilitator (Meeting Lead)
- **Status:** Approved for Implementation Planning

---

## 1. Executive Summary & Goals

### 1.1 Background & Core Purpose
Following attendance at the **Six Thinking Hats Mastery: One Problem, Six Angles** workshop, this web application serves as a dual-purpose digital platform:
1. **Interactive Team Training & Knowledge Transfer (KT):** Explain the Six Thinking Hats framework clearly, visually, and engagingly without passive presentation slides.
2. **Everyday Workplace Facilitation Tool:** Provide a repeatable, software-guided facilitation system for daily meetings (standups, sprint retrospectives, architectural reviews, creative brainstorms).

### 1.2 Core Objectives
* **Parallel Thinking Enforcement:** Shift teams away from adversarial, ego-driven debates (*"I disagree because..."*) into parallel thinking (*"Everyone putting on the same hat simultaneously"*).
* **Practical Daily Work Application:** Equip the team with clear, time-boxed meeting recipes rather than theoretical concepts.
* **Psychological Safety:** Normalize expressing gut feelings (Red Hat) and critical cautions (Black Hat) without defensiveness.
* **Action-Oriented Outcomes:** Direct every session toward a prioritized, owned action plan.
* **Frictionless Experience:** Single-screen facilitator mode operated via desktop/projector, zero login barriers, fully offline capable.

---

## 2. System Architecture & Tech Stack

### 2.1 Technology Choices
* **Core Framework:** React 19 / TypeScript with Vite for instant build times and modular component architecture.
* **Styling & Theming:** Tailwind CSS combined with dynamic CSS custom properties (`--hat-primary`, `--hat-bg`, `--hat-border`, `--hat-text`) driven by the active hat state.
* **Iconography:** `lucide-react` for clean, professional visual cues.
* **Audio Synthesis:** Native **Web Audio API** oscillator for timer chimes (no external audio files required, zero latency, offline-ready).
* **State & Persistence:** React Context + custom reducer pattern with automatic debounced synchronization to browser `localStorage`.

### 2.2 Data Models & TypeScript Contracts

```typescript
export type HatType = 'white' | 'red' | 'yellow' | 'black' | 'green' | 'blue';

export type WorkshopStep = 1 | 2 | 3 | 4;
// Step 1: Define Topic
// Step 2: Think in Turns (Parallel Ideation)
// Step 3: Share & Explore (Matrix Overview)
// Step 4: Summarise & Decide (Action Items)

export interface CardItem {
  id: string;
  hat: HatType;
  content: string;
  author?: string;
  votes: number;
  createdAt: number;
  metadata?: {
    riskSeverity?: 'low' | 'medium' | 'high';       // Black Hat specific
    sentimentTone?: 'positive' | 'skeptical' | 'neutral'; // Red Hat specific
  };
}

export interface ActionItem {
  id: string;
  task: string;
  owner: string;
  dueDate: string;
  status: 'todo' | 'in_progress' | 'done';
}

export interface DailyRecipe {
  id: string;
  name: string;
  durationMinutes: number;
  description: string;
  hatSequence: HatType[];
  hatTimers: Record<HatType, number>; // in seconds
}

export interface WorkshopSessionState {
  viewMode: 'playbook' | 'workspace';
  step: WorkshopStep;
  activeHat: HatType;
  topic: string;
  expectedOutcome: string;
  selectedRecipeId: string;
  timer: {
    secondsRemaining: number;
    isRunning: boolean;
    presetSeconds: number;
  };
  cards: Record<HatType, CardItem[]>;
  actionItems: ActionItem[];
}
```

---

## 3. Detailed Subsystem Specifications

### 3.1 Hub 1: "Learn & Guide" (The Daily Work Playbook)

Designed for the facilitator to walk the team through the framework before or during meetings.

1. **Visual 6-Hat Anatomy:**
   * High-contrast cards explaining each hat:
     - **White (Facts & Data):** What information do we have? What is missing? No interpretations.
     - **Red (Feelings & Intuition):** 60s gut reaction. No explanations, no justifications permitted.
     - **Yellow (Benefits & Optimism):** Best-case scenarios, feasibility, value creation.
     - **Black (Risks & Caution):** Devil's advocate, failure modes, regulatory/technical risks.
     - **Green (Creativity & Growth):** Wild ideas, out-of-the-box alternatives, zero criticism allowed.
     - **Blue (Process & Synthesis):** Meta-thinking, sequencing, agenda control, action items.
   * **DOs & DON'Ts:** Explicit behavioral rules for each hat to correct common anti-patterns.
2. **Adversarial vs. Parallel Thinking Visualizer:**
   * Interactive comparison graphic contrasting traditional ping-pong argument against collective parallel alignment.
3. **Daily Work Meeting Recipes:**
   Pre-configured sequences with purpose and timing:
   * **Recipe A: Quick Standup Dilemma (15 min):** Blue → Red → Yellow → Black → Red → Blue
   * **Recipe B: Sprint Retrospective / Post-Mortem (45 min):** Blue → White → Red → Yellow → Black → Green → Blue
   * **Recipe C: New Feature / Creative Brainstorm (30 min):** Blue → White → Green → Yellow → Black → Blue
   * **Recipe D: Risk & Architecture Review (30 min):** Blue → White → Yellow → Black → Blue

---

### 3.2 Hub 2: "Live Workspace" (The Interactive Facilitator)

A focused canvas guiding the meeting through 4 clear steps:

1. **Step 1: Define Topic (Blue Hat Setup)**
   * Input fields for session topic & expected deliverable.
   * Recipe selector (automatically configures the hat sequence).
   * Sample case study loader (e.g., *"Adopting New AI Dev Tools"*, *"Resolving Cross-Team Handoff Bottlenecks"*) for instant live simulation.
2. **Step 2: Think in Turns (Parallel Ideation)**
   * **Dynamic Chromatic Header:** Colors, background tints, and prompt questions transform as hats change.
   * **Facilitator Sticky Board:** Fast card creation with inline tagging:
     - Black Hat: Severity pill (`Low`, `Medium`, `High`).
     - Red Hat: Sentiment pill (`Positive`, `Skeptical`, `Neutral`).
     - Green Hat: Quick +1 voting.
   * **Integrated Timer:** Circular/progress bar display. Turns amber at `< 30s`, pulses red at `< 10s`. Emits synthetic Web Audio chime at 0s.
3. **Step 3: Share & Explore (6-Hat Matrix Overview)**
   * Consolidated 6-column grid displaying all generated cards.
   * Quick balance check (reveals if a team is over-optimistic or under-cautious).
4. **Step 4: Summarise & Decide (Action Items)**
   * Action items table with interactive row additions: Task, Owner, Due Date, Status.

---

### 3.3 Facilitator HUD & Projector Controls

* **Global Hotkeys:**
  - `1` through `6`: Jump to specific Hat mode.
  - `Space`: Toggle countdown timer play/pause.
  - `T`: Add 60 seconds to timer.
  - `N`: Focus rapid note input.
  - `M`: Toggle Matrix Overview.
  - `Ctrl + P` / `Cmd + P`: Open print-ready summary.
* **Presentation-Ready Readability:**
  - High information hierarchy with high contrast ratios ($WCAG\ AA$).
  - Generous card padding and clean typography optimized for 1080p+ projector screens.

---

### 3.4 Export & Deliverables Engine

1. **Markdown Export (`.md`):** One-click button generates a formatted report containing:
   - Meeting Topic & Date
   - Active Recipe & Sequence
   - Categorized 6-Hat Contributions (with votes and severity tags)
   - Final Action Item Table with owners and deadlines
2. **Printable Executive Summary (PDF / Print):** Custom CSS `@media print` layout formatting the matrix and action plan onto A4 landscape sheets.
3. **Session JSON State:** Facilitator can export and import full session snapshots.

---

## 4. Error Handling, Edge Cases & Resilience

* **Accidental Reloads:** All state persisted in `localStorage`. Page refreshes maintain active step, cards, and timer state.
* **Audio Permissions:** Web Audio Context initialized gracefully on the first user interaction (click/keypress) to comply with browser autoplay policies.
* **Reset Confirmation:** Destructive resets require a facilitator confirmation modal to prevent accidental data loss during live sessions.
* **Empty States:** Clear visual guidance and sample card placeholders when a hat has no notes yet.

---

## 5. Verification & Testing Plan

1. **Functional State Transitions:** Verify that switching recipes correctly loads default sequences and steps.
2. **Timer Accuracy:** Verify that the timer ticks without drift and triggers Web Audio chimes on expiration.
3. **Keyboard Controls:** Test all hotkeys (`1-6`, `Space`, `N`, `M`, `T`) without conflicting with active text inputs.
4. **Export Formatting:** Validate Markdown output renders cleanly in standard Markdown readers, and Print view renders clean A4 landscape PDF without cutoff cards.
5. **Responsive Display:** Verify layout adapts cleanly from standard laptops to high-resolution meeting room projectors.
