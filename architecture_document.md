# Six Thinking Hats Interactive Facilitator - System Architecture

## 1. High-Level Architecture Overview

The system is designed as a high-performance, single-instance client application optimized for responsive desktop projection and secondary-screen facilitation. It maintains deterministic state transitions across Dr. Edward de Bono's 6 thinking modes.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Presentation & UI Layer                         │
│  ┌──────────────────────┬─────────────────────────┬──────────────────┐ │
│  │ Presentation Header  │  Active Hat Workspace   │ Facilitator HUD  │ │
│  │ (Topic, Rules, Hat)  │  (Sticky Wall, Inputs)  │ (Timer, Stepper) │ │
│  └──────────────────────┴─────────────────────────┴──────────────────┘ │
└────────────────────────────────────▲───────────────────────────────────┘
                                     │ Reactive State Subscriptions
┌────────────────────────────────────┴───────────────────────────────────┐
│                      Application State Management                      │
│  ┌─────────────────────────┬────────────────────────────────────────┐  │
│  │      Session Slice      │              Cards Slice               │  │
│  │ • Current Step (1-4)    │ • Card Store: Map<HatType, Card[]>     │  │
│  │ • Active Hat (1-6)      │ • Optimistic Mutations (Add, Delete)   │  │
│  │ • Timer (Tick, Running) │ • Upvoting & Filtering                 │  │
│  └─────────────────────────┴────────────────────────────────────────┘  │
└────────────────────────────────────▲───────────────────────────────────┘
                                     │ Sync & Persistence
┌────────────────────────────────────┴───────────────────────────────────┐
│                    Persistence & Exporters Storage                     │
│  ┌─────────────────────────┬────────────────────────────────────────┐  │
│  │    Local Storage API    │       Data Serializer & Export         │  │
│  │ • Auto-save on change   │ • Markdown Document Generator          │  │
│  │ • Session Restoration   │ • Print / PDF Ready Matrix View        │  │
│  └─────────────────────────┴────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core State Machine: The 4-Step Facilitation Flow

The state transitions strictly enforce parallel thinking rules:

```
[ STEP 1: DEFINE ]
   State: { step: 1, activeHat: 'blue', isTopicLocked: false }
   Allowed Actions: Edit Topic, Set Expected Outcome, Load Template
        │
        ▼ Proceed to Step 2
[ STEP 2: THINK IN TURNS ]
   State: { step: 2, activeHat: HatEnum[i], isTimerActive: boolean }
   Valid Sequences:
     • Standard: White ➔ Red ➔ Yellow ➔ Black ➔ Green ➔ Blue
     • Creative: White ➔ Green ➔ Yellow ➔ Black ➔ Red ➔ Blue
   Hat Constraints:
     • Red Hat: Strict short timer (60s-90s), no reasoning field.
     • Green Hat: Upvoting enabled, critical assessment disabled.
     • Black Hat: Required risk severity tag.
        │
        ▼ Proceed to Step 3
[ STEP 3: SHARE & EXPLORE ]
   State: { step: 3, view: 'matrix_overview' }
   Allowed Actions: Card reordering, grouping, thematic clustering, clarifying questions.
        │
        ▼ Proceed to Step 4
[ STEP 4: SUMMARISE & DECIDE ]
   State: { step: 4, activeHat: 'blue' }
   Allowed Actions: Assign action item owners, assign deadlines, export deliverables.
```

---

## 3. Data Schema & TypeScript Contracts

```typescript
export type HatType = 'white' | 'red' | 'yellow' | 'black' | 'green' | 'blue';

export type WorkshopStep = 1 | 2 | 3 | 4;

export interface CardItem {
  id: string;
  hat: HatType;
  content: string;
  author?: string;
  votes: number;
  createdAt: number;
  metadata?: {
    riskSeverity?: 'low' | 'medium' | 'high'; // Black Hat specific
    emotionalTone?: 'enthusiastic' | 'cautious' | 'skeptical'; // Red Hat specific
  };
}

export interface ActionItem {
  id: string;
  task: string;
  owner: string;
  dueDate: string;
  status: 'todo' | 'in_progress' | 'done';
}

export interface WorkshopSession {
  id: string;
  title: string;
  topic: string;
  currentStep: WorkshopStep;
  activeHat: HatType;
  timerSecondsRemaining: number;
  isTimerRunning: boolean;
  cards: Record<HatType, CardItem[]>;
  actionItems: ActionItem[];
  createdAt: string;
  updatedAt: string;
}
```

---

## 4. Key Subsystem Specifications

### 4.1 Theme Engine
* The UI dynamically recalculates CSS custom variables based on `activeHat`.
* Color tokens alter the background tints, card border accents, button highlights, and status pills.
* High-contrast accessibility standards ($WCAG\ AA$) are maintained for readability during projector use.

### 4.2 Timer Module
* Accurate drift-free interval ticker using browser `performance.now()`.
* Visual feedback: Progress bar changes from primary color to amber ($< 30s$) and pulse red ($< 10s$).
* Configurable sound chime using Web Audio API synthetic beeps (no external audio assets required).

### 4.3 Export Engine
* Markdown generator converts the full 6-column matrix, metadata, and action item registry into standard GitHub-flavored Markdown.
* Responsive print stylesheet allows direct browser printing (`Ctrl+P` / `Cmd+P`) to generate clean executive summaries on A4 landscape.