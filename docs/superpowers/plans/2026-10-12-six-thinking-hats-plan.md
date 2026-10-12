# Six Thinking Hats Interactive Facilitator & Playbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, highly visual single-page web application featuring an interactive "Six Thinking Hats" Daily Work Playbook (for team training) and a 4-step Facilitator Workspace (for running live parallel-thinking meetings with timers, keyboard controls, sticky cards, matrix synthesis, and Markdown/print exports).

**Architecture:** Modular Vite + React 19 + TypeScript SPA with a centralized `WorkshopContext` state machine auto-persisting to `localStorage`. Dynamic chromatic styling using Tailwind CSS and CSS custom properties; timer alerts powered by synthetic Web Audio oscillator chimes; global keyboard shortcuts for smooth presentation-mode facilitation without mouse hunting.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Web Audio API, Vitest, React Testing Library.

## Global Constraints
- Target platform: Modern evergreen desktop browsers (Chrome, Edge, Firefox, Safari) optimized for projector displays (1080p+).
- Single-screen facilitator mode: zero login/backend requirements; operates 100% offline.
- Accessibility: WCAG AA contrast ratios preserved across all 6 dynamic hat theme palettes.
- Persistence key: `six_hats_session_v1` in browser `localStorage`.
- No external audio asset downloads: sound chimes must use native browser Web Audio API synthesis.
- No placeholders: every file, interface, and test must be fully implemented with zero `TODO` or `TBD` markers.

---

### Task 1: Project Scaffolding & Setup

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Test: `tests/sanity.test.ts`

**Interfaces:**
- Consumes: None (Root setup)
- Produces: Running Vite dev server, Vitest test runner with React Testing Library, and Tailwind CSS tokens with CSS variables for the 6 hats.

- [ ] **Step 1: Create package.json with dependencies**

```json
{
  "name": "six-thinking-hats-facilitor",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^1.16.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.0.2"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@types/node": "^22.13.0",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react": "^4.3.4",
    "jsdom": "^26.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.3",
    "vite": "^6.1.0",
    "vitest": "^3.0.5"
  }
}
```

- [ ] **Step 2: Create TypeScript & Vite configs**

`vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

`vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
});
```

`tests/setup.ts`:
```typescript
import '@testing-library/jest-dom';
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "tests"]
}
```

- [ ] **Step 3: Create index.html, index.css, and root App shell**

`index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Six Thinking Hats Interactive Facilitator & Playbook</title>
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased selection:bg-blue-200">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`src/index.css`:
```css
@import "tailwindcss";

:root {
  --hat-white-primary: #475569;
  --hat-white-bg: #f8fafc;
  --hat-white-border: #cbd5e1;
  --hat-white-text: #0f172a;

  --hat-red-primary: #dc2626;
  --hat-red-bg: #fef2f2;
  --hat-red-border: #fca5a5;
  --hat-red-text: #991b1b;

  --hat-yellow-primary: #d97706;
  --hat-yellow-bg: #fffbeb;
  --hat-yellow-border: #fde68a;
  --hat-yellow-text: #92400e;

  --hat-black-primary: #1e293b;
  --hat-black-bg: #f1f5f9;
  --hat-black-border: #94a3b8;
  --hat-black-text: #0f172a;

  --hat-green-primary: #16a34a;
  --hat-green-bg: #f0fdf4;
  --hat-green-border: #86efac;
  --hat-green-text: #166534;

  --hat-blue-primary: #2563eb;
  --hat-blue-bg: #eff6ff;
  --hat-blue-border: #93c5fd;
  --hat-blue-text: #1e40af;
}

@media print {
  body {
    background: white !important;
    color: black !important;
  }
  .no-print {
    display: none !important;
  }
  .print-only {
    display: block !important;
  }
}
```

`src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`src/App.tsx`:
```tsx
export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-extrabold text-slate-800">Six Thinking Hats Facilitator</h1>
      <p className="text-slate-600 mt-2">Interactive Parallel Thinking & Team Playbook</p>
    </div>
  );
}
```

- [ ] **Step 4: Write sanity test and install dependencies**

`tests/sanity.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';

describe('Sanity test', () => {
  it('environment runs test successfully', () => {
    expect(1 + 1).toBe(2);
  });
});
```

Install: `npm install`
Run: `npm test`
Expected: PASS 1 test

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: scaffold project with React 19, Vite, Tailwind CSS, and Vitest"
```

---

### Task 2: Core Data Types, Daily Work Recipes & Sample Case Studies

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/recipes.ts`
- Create: `src/data/hatDefinitions.ts`
- Create: `src/data/sampleTemplates.ts`
- Test: `tests/data.test.ts`

**Interfaces:**
- Consumes: None
- Produces: `HatType`, `WorkshopStep`, `CardItem`, `ActionItem`, `DailyRecipe`, `DAILY_RECIPES`, `HAT_DEFINITIONS`, `SAMPLE_TEMPLATES`

- [ ] **Step 1: Write failing unit test for data fixtures**

`tests/data.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { DAILY_RECIPES } from '../src/data/recipes';
import { HAT_DEFINITIONS } from '../src/data/hatDefinitions';
import { SAMPLE_TEMPLATES } from '../src/data/sampleTemplates';

describe('Data Definitions', () => {
  it('contains exactly 6 hat definitions with required guidance', () => {
    expect(Object.keys(HAT_DEFINITIONS)).toHaveLength(6);
    expect(HAT_DEFINITIONS.red.goldenRule).toBeDefined();
    expect(HAT_DEFINITIONS.green.dos.length).toBeGreaterThan(0);
    expect(HAT_DEFINITIONS.green.donts.length).toBeGreaterThan(0);
  });

  it('contains at least 4 daily work recipes with valid hat sequences', () => {
    expect(DAILY_RECIPES.length).toBeGreaterThanOrEqual(4);
    DAILY_RECIPES.forEach(recipe => {
      expect(recipe.hatSequence.length).toBeGreaterThanOrEqual(3);
      expect(recipe.hatTimers).toBeDefined();
    });
  });

  it('provides at least 2 workplace scenario templates', () => {
    expect(SAMPLE_TEMPLATES.length).toBeGreaterThanOrEqual(2);
    expect(SAMPLE_TEMPLATES[0].topic).toBeDefined();
    expect(SAMPLE_TEMPLATES[0].sampleCards.white.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/data.test.ts`
Expected: FAIL (Cannot find module)

- [ ] **Step 3: Implement data structures and types**

`src/types/index.ts`:
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
    riskSeverity?: 'low' | 'medium' | 'high';
    sentimentTone?: 'positive' | 'skeptical' | 'neutral';
  };
}

export interface ActionItem {
  id: string;
  task: string;
  owner: string;
  dueDate: string;
  status: 'todo' | 'in_progress' | 'done';
}

export interface HatInfo {
  id: HatType;
  name: string;
  title: string;
  badge: string;
  primaryColor: string;
  bgTint: string;
  borderColor: string;
  textColor: string;
  question: string;
  summary: string;
  goldenRule: string;
  dos: string[];
  donts: string[];
}

export interface DailyRecipe {
  id: string;
  name: string;
  durationMinutes: number;
  tagline: string;
  description: string;
  hatSequence: HatType[];
  hatTimers: Record<HatType, number>;
}

export interface SampleTemplate {
  id: string;
  title: string;
  topic: string;
  expectedOutcome: string;
  recommendedRecipeId: string;
  sampleCards: Record<HatType, Array<{ content: string; metadata?: CardItem['metadata'] }>>;
  sampleActions?: ActionItem[];
}
```

`src/data/hatDefinitions.ts`:
```typescript
import { HatInfo, HatType } from '../types';

export const HAT_DEFINITIONS: Record<HatType, HatInfo> = {
  white: {
    id: 'white',
    name: 'White Hat',
    title: 'Facts & Information',
    badge: 'Data & Evidence',
    primaryColor: '#475569',
    bgTint: '#f8fafc',
    borderColor: '#cbd5e1',
    textColor: '#0f172a',
    question: 'What information do we have? What data is missing? What are the verifiable facts?',
    summary: 'Neutral, objective, and evidence-driven. Separates proven facts from conjecture.',
    goldenRule: 'Report only verifiable facts. State information gaps clearly without arguing.',
    dos: [
      'List verified metrics and historical data',
      'Identify what data you need to gather',
      'Distinguish between hard facts and rumors'
    ],
    donts: [
      'Do not express opinions or gut feelings',
      'Do not propose solutions or evaluate ideas'
    ]
  },
  red: {
    id: 'red',
    name: 'Red Hat',
    title: 'Emotions & Intuition',
    badge: 'Gut Instinct',
    primaryColor: '#dc2626',
    bgTint: '#fef2f2',
    borderColor: '#fca5a5',
    textColor: '#991b1b',
    question: 'What is your immediate gut reaction? How does this make you feel right now?',
    summary: 'Pure emotional pulse and instinct. Time-boxed (60-90 seconds) with no justification required.',
    goldenRule: 'Never explain or defend your feelings. Give your raw intuition as it stands.',
    dos: [
      'Share quick feelings (enthusiastic, uneasy, nervous, excited)',
      'Voice intuition and hunches without shame',
      'Keep submissions short and visceral'
    ],
    donts: [
      'Do not give reasons, logic, or justifications ("I feel this because...")',
      'Do not debate someone else’s emotional reaction'
    ]
  },
  yellow: {
    id: 'yellow',
    name: 'Yellow Hat',
    title: 'Optimism & Value',
    badge: 'Benefits & Feasibility',
    primaryColor: '#d97706',
    bgTint: '#fffbeb',
    borderColor: '#fde68a',
    textColor: '#92400e',
    question: 'What are the benefits? What is the best-case scenario? How can we make this work?',
    summary: 'Constructive optimism. Actively looks for value, feasibility, and opportunities.',
    goldenRule: 'Seek genuine, logical reasons for optimism. Not mere wishful thinking.',
    dos: [
      'Identify clear benefits and upside potential',
      'Explore how ideas could realistically succeed',
      'Highlight secondary opportunities'
    ],
    donts: [
      'Do not bring up risks or caveats yet (save for Black Hat)',
      'Do not be cynical or dismissive'
    ]
  },
  black: {
    id: 'black',
    name: 'Black Hat',
    title: 'Caution & Risk',
    badge: 'Critical Judgment',
    primaryColor: '#1e293b',
    bgTint: '#f1f5f9',
    borderColor: '#94a3b8',
    textColor: '#0f172a',
    question: 'What could go wrong? What are the fatal flaws, risks, bottlenecks, or costs?',
    summary: 'Protective assessment. Essential for survival and avoiding avoidable mistakes.',
    goldenRule: 'Logical caution only. Point out flaws constructively without attacking individuals.',
    dos: [
      'Identify compliance, security, technical, and operational risks',
      'Point out hidden dependencies and worst-case scenarios',
      'Assess severity levels (Low, Medium, High)'
    ],
    donts: [
      'Do not make personal attacks or vague criticisms',
      'Do not use Black Hat to kill ideas prematurely—use it to safeguard them'
    ]
  },
  green: {
    id: 'green',
    name: 'Green Hat',
    title: 'Creativity & Alternatives',
    badge: 'New Ideas',
    primaryColor: '#16a34a',
    bgTint: '#f0fdf4',
    borderColor: '#86efac',
    textColor: '#166534',
    question: 'What new ideas, lateral moves, or unorthodox alternatives can we invent?',
    summary: 'Expansive, creative generation. Provocation, alternatives, and out-of-the-box thinking.',
    goldenRule: 'Zero criticism or judgment allowed. All ideas are welcome during Green Hat.',
    dos: [
      'Propose fresh angles and crazy provocations',
      'Build on other people’s ideas ("Yes, and...")',
      'Explore unconventional solutions'
    ],
    donts: [
      'Never say "Yes, but that will never work" (Save evaluation for Yellow/Black)',
      'Do not censor yourself'
    ]
  },
  blue: {
    id: 'blue',
    name: 'Blue Hat',
    title: 'Process & Control',
    badge: 'Synthesis & Action',
    primaryColor: '#2563eb',
    bgTint: '#eff6ff',
    borderColor: '#93c5fd',
    textColor: '#1e40af',
    question: 'What is our objective? Which hat comes next? What are our concrete action items?',
    summary: 'The conductor and meta-manager of the meeting. Sets the agenda, guides the flow, and synthesizes decisions.',
    goldenRule: 'Focus on the thinking process itself, not the content. Summarize into action.',
    dos: [
      'Define the topic and expected outcome at the start',
      'Keep the room focused on the current hat',
      'Synthesize takeaways and assign owners and deadlines'
    ],
    donts: [
      'Do not let participants jump hats without changing the mode',
      'Do not end the session without clear next steps'
    ]
  }
};
```

`src/data/recipes.ts`:
```typescript
import { DailyRecipe } from '../types';

export const DAILY_RECIPES: DailyRecipe[] = [
  {
    id: 'quick-standup',
    name: 'Quick Standup Dilemma',
    durationMinutes: 15,
    tagline: 'Rapid alignment on a sudden blocker or team choice',
    description: 'Perfect for morning standups or unblocking a PR review when opinions differ.',
    hatSequence: ['blue', 'red', 'yellow', 'black', 'red', 'blue'],
    hatTimers: {
      blue: 120,
      red: 60,
      yellow: 180,
      black: 180,
      green: 120,
      white: 120
    }
  },
  {
    id: 'sprint-retro',
    name: 'Sprint Retrospective / Post-Mortem',
    durationMinutes: 45,
    tagline: 'Reviewing past cycles or incidents with emotional honesty and safety',
    description: 'Unpack facts, clear emotional friction, celebrate wins, and fix root vulnerabilities.',
    hatSequence: ['blue', 'white', 'red', 'yellow', 'black', 'green', 'blue'],
    hatTimers: {
      blue: 180,
      white: 300,
      red: 120,
      yellow: 300,
      black: 360,
      green: 360
    }
  },
  {
    id: 'creative-brainstorm',
    name: 'New Feature / Creative Brainstorm',
    durationMinutes: 30,
    tagline: 'Generating breakthrough ideas without immediate critical dismissal',
    description: 'Separates idea generation from risk evaluation so creative momentum is not killed.',
    hatSequence: ['blue', 'white', 'green', 'yellow', 'black', 'blue'],
    hatTimers: {
      blue: 120,
      white: 240,
      green: 420,
      yellow: 300,
      black: 300,
      red: 60
    }
  },
  {
    id: 'risk-architecture',
    name: 'Risk & Architecture Review',
    durationMinutes: 30,
    tagline: 'Stress-testing technical designs, migrations, and major changes',
    description: 'Systematically examines advantages, operational risks, and contingency measures.',
    hatSequence: ['blue', 'white', 'yellow', 'black', 'blue'],
    hatTimers: {
      blue: 120,
      white: 300,
      yellow: 360,
      black: 480,
      green: 180,
      red: 60
    }
  }
];
```

`src/data/sampleTemplates.ts`:
```typescript
import { SampleTemplate } from '../types';

export const SAMPLE_TEMPLATES: SampleTemplate[] = [
  {
    id: 'ai-tooling-migration',
    title: 'Adopting AI Developer Tools in our Workflow',
    topic: 'Should our team mandate AI code generation and review assistants for all sprints?',
    expectedOutcome: 'Clear decision with security guidelines, pilot timeline, and designated lead.',
    recommendedRecipeId: 'risk-architecture',
    sampleCards: {
      blue: [
        { content: 'Focus on developer productivity vs code quality & security compliance' }
      ],
      white: [
        { content: 'Currently 4 out of 10 engineers use personal AI subscriptions' },
        { content: 'Enterprise license costs $19/engineer/month' },
        { content: 'Security policy forbids sending proprietary client source to third-party public models' }
      ],
      red: [
        { content: 'Excited about automating boilerplate and writing unit tests faster', metadata: { sentimentTone: 'positive' } },
        { content: 'Worried junior engineers will stop learning fundamental debugging skills', metadata: { sentimentTone: 'skeptical' } }
      ],
      yellow: [
        { content: 'Estimated 25% reduction in repetitive code authoring' },
        { content: 'Faster onboarding for new team members exploring legacy codebase' }
      ],
      black: [
        { content: 'Potential IP and data leakage if private repos are indexed', metadata: { riskSeverity: 'high' } },
        { content: 'Risk of subtle hallucinated bugs passing code review unnoticed', metadata: { riskSeverity: 'medium' } }
      ],
      green: [
        { content: 'Run a 3-week pilot on an internal open-source project first' },
        { content: 'Set up an internal LLM proxy that redacts client credentials automatically' }
      ]
    },
    sampleActions: [
      {
        id: 'act-1',
        task: 'Draft security compliance whitelist for AI model prompts',
        owner: 'Alex (Tech Lead)',
        dueDate: '2026-10-25',
        status: 'todo'
      },
      {
        id: 'act-2',
        task: 'Launch 3-week pilot team with 3 volunteer developers',
        owner: 'Sarah (Eng Manager)',
        dueDate: '2026-11-01',
        status: 'todo'
      }
    ]
  },
  {
    id: 'sprint-blocker-handoff',
    title: 'Resolving Frontend-Backend API Handoff Bottlenecks',
    topic: 'How can we stop frontend waiting for completed backend APIs at the end of sprints?',
    expectedOutcome: 'Agreed mock API contract workflow and definition of done.',
    recommendedRecipeId: 'sprint-retro',
    sampleCards: {
      blue: [
        { content: 'Objective: shorten cycle times and eliminate last-day crunch' }
      ],
      white: [
        { content: 'Last 3 sprints had 4 tickets blocked until the final 48 hours' },
        { content: 'API contracts are currently discussed verbally or in PR comments' }
      ],
      red: [
        { content: 'Frustrated by weekend rush deployments before demo day', metadata: { sentimentTone: 'skeptical' } },
        { content: 'Keen to establish predictability and smoother sprint rhythm', metadata: { sentimentTone: 'positive' } }
      ],
      yellow: [
        { content: 'Contract-first design lets frontend code immediately using MSW/mock servers' },
        { content: 'Clear Swagger/OpenAPI spec avoids miscommunicated payload schemas' }
      ],
      black: [
        { content: 'Extra initial effort required to write specs upfront on day 1', metadata: { riskSeverity: 'low' } },
        { content: 'Risk of mocks drifting from actual production endpoints', metadata: { riskSeverity: 'medium' } }
      ],
      green: [
        { content: 'Mandate OpenAPI spec PR approval as Sprint Day 2 milestone' },
        { content: 'Auto-generate TypeScript client SDK from schema on every commit' }
      ]
    },
    sampleActions: [
      {
        id: 'act-3',
        task: 'Integrate schema generator into monorepo pre-commit hooks',
        owner: 'David',
        dueDate: '2026-10-28',
        status: 'todo'
      }
    ]
  }
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/data.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/types/ src/data/ tests/data.test.ts
git commit -m "feat: define data models, hat definitions, daily recipes, and sample templates"
```

---

### Task 3: Web Audio Synth Sound Engine & Timer Utility

**Files:**
- Create: `src/utils/audio.ts`
- Create: `src/utils/timer.ts`
- Test: `tests/timer.test.ts`

**Interfaces:**
- Consumes: None
- Produces: `playChime(type: 'warning' | 'finish' | 'tick')`, `formatSeconds(sec: number)`, `getTimerStatus(remaining: number, total: number)`

- [ ] **Step 1: Write failing unit test for timer formatting & calculations**

`tests/timer.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { formatSeconds, getTimerStatus } from '../src/utils/timer';

describe('Timer Utilities', () => {
  it('formats seconds into MM:SS correctly', () => {
    expect(formatSeconds(0)).toBe('00:00');
    expect(formatSeconds(9)).toBe('00:09');
    expect(formatSeconds(60)).toBe('01:00');
    expect(formatSeconds(125)).toBe('02:05');
  });

  it('calculates correct timer urgency status', () => {
    expect(getTimerStatus(100, 120)).toBe('normal');
    expect(getTimerStatus(25, 120)).toBe('warning'); // < 30s
    expect(getTimerStatus(8, 120)).toBe('critical'); // < 10s
    expect(getTimerStatus(0, 120)).toBe('expired');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/timer.test.ts`
Expected: FAIL (Cannot find module)

- [ ] **Step 3: Implement Web Audio synth and timer utilities**

`src/utils/audio.ts`:
```typescript
class SoundEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playChime(type: 'finish' | 'warning' | 'tick') {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      const now = this.ctx.currentTime;

      if (type === 'finish') {
        // Double pleasant completion chime (523Hz C5 -> 659Hz E5)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'warning') {
        // Soft attention beep (440Hz A4)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'tick') {
        // Subtle micro tick
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }
}

export const soundEngine = new SoundEngine();
```

`src/utils/timer.ts`:
```typescript
export function formatSeconds(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export type TimerStatus = 'normal' | 'warning' | 'critical' | 'expired';

export function getTimerStatus(remaining: number, total: number): TimerStatus {
  if (remaining <= 0) return 'expired';
  if (remaining <= 10) return 'critical';
  if (remaining <= 30 && total > 30) return 'warning';
  return 'normal';
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/timer.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/utils/audio.ts src/utils/timer.ts tests/timer.test.ts
git commit -m "feat: implement Web Audio synth engine and timer calculations"
```

---

### Task 4: State Management & LocalStorage Persistence (WorkshopContext)

**Files:**
- Create: `src/context/WorkshopContext.tsx`
- Test: `tests/context.test.tsx`

**Interfaces:**
- Consumes: `src/types/index.ts`, `src/data/recipes.ts`, `src/data/sampleTemplates.ts`
- Produces: `WorkshopProvider`, `useWorkshop()`, State Actions (`setStep`, `setActiveHat`, `addCard`, `deleteCard`, `voteCard`, `addActionItem`, `updateActionItem`, `deleteActionItem`, `loadRecipe`, `loadTemplate`, `resetSession`)

- [ ] **Step 1: Write failing unit test for WorkshopContext actions and persistence**

`tests/context.test.tsx`:
```typescript
import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { WorkshopProvider, useWorkshop } from '../src/context/WorkshopContext';

describe('WorkshopContext State Machine', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <WorkshopProvider>{children}</WorkshopProvider>
  );

  it('initializes with default step 1, Blue Hat, and empty cards', () => {
    const { result } = renderHook(() => useWorkshop(), { wrapper });
    expect(result.current.state.step).toBe(1);
    expect(result.current.state.activeHat).toBe('blue');
    expect(result.current.state.viewMode).toBe('playbook');
  });

  it('allows adding and voting on a card under active hat', () => {
    const { result } = renderHook(() => useWorkshop(), { wrapper });
    act(() => {
      result.current.actions.setActiveHat('green');
      result.current.actions.addCard({
        hat: 'green',
        content: 'New inventive direction'
      });
    });

    const greenCards = result.current.state.cards.green;
    expect(greenCards).toHaveLength(1);
    expect(greenCards[0].content).toBe('New inventive direction');
    expect(greenCards[0].votes).toBe(0);

    act(() => {
      result.current.actions.voteCard('green', greenCards[0].id);
    });

    expect(result.current.state.cards.green[0].votes).toBe(1);
  });

  it('loads sample template correctly and synchronizes state', () => {
    const { result } = renderHook(() => useWorkshop(), { wrapper });
    act(() => {
      result.current.actions.loadTemplate('ai-tooling-migration');
    });

    expect(result.current.state.topic).toContain('AI code generation');
    expect(result.current.state.cards.white.length).toBeGreaterThan(0);
    expect(result.current.state.actionItems.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/context.test.tsx`
Expected: FAIL (Cannot find module)

- [ ] **Step 3: Implement WorkshopContext with localStorage persistence**

`src/context/WorkshopContext.tsx`:
```tsx
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { ActionItem, CardItem, HatType, WorkshopStep } from '../types';
import { DAILY_RECIPES } from '../data/recipes';
import { SAMPLE_TEMPLATES } from '../data/sampleTemplates';

const STORAGE_KEY = 'six_hats_session_v1';

export interface WorkshopState {
  viewMode: 'playbook' | 'workspace';
  step: WorkshopStep;
  activeHat: HatType;
  topic: string;
  expectedOutcome: string;
  selectedRecipeId: string;
  isMatrixOpen: boolean;
  timer: {
    secondsRemaining: number;
    isRunning: boolean;
    presetSeconds: number;
  };
  cards: Record<HatType, CardItem[]>;
  actionItems: ActionItem[];
}

const defaultInitialCards: Record<HatType, CardItem[]> = {
  white: [],
  red: [],
  yellow: [],
  black: [],
  green: [],
  blue: []
};

const defaultState: WorkshopState = {
  viewMode: 'playbook',
  step: 1,
  activeHat: 'blue',
  topic: '',
  expectedOutcome: '',
  selectedRecipeId: 'quick-standup',
  isMatrixOpen: false,
  timer: {
    secondsRemaining: 180,
    isRunning: false,
    presetSeconds: 180
  },
  cards: defaultInitialCards,
  actionItems: []
};

type Action =
  | { type: 'SET_VIEW_MODE'; payload: 'playbook' | 'workspace' }
  | { type: 'SET_STEP'; payload: WorkshopStep }
  | { type: 'SET_ACTIVE_HAT'; payload: HatType }
  | { type: 'SET_TOPIC'; payload: { topic: string; expectedOutcome?: string } }
  | { type: 'SET_RECIPE'; payload: string }
  | { type: 'TOGGLE_MATRIX'; payload?: boolean }
  | { type: 'ADD_CARD'; payload: { hat: HatType; content: string; metadata?: CardItem['metadata'] } }
  | { type: 'DELETE_CARD'; payload: { hat: HatType; id: string } }
  | { type: 'VOTE_CARD'; payload: { hat: HatType; id: string } }
  | { type: 'ADD_ACTION_ITEM'; payload: Omit<ActionItem, 'id'> }
  | { type: 'UPDATE_ACTION_ITEM'; payload: ActionItem }
  | { type: 'DELETE_ACTION_ITEM'; payload: string }
  | { type: 'TIMER_SET'; payload: { seconds: number; isRunning?: boolean } }
  | { type: 'TIMER_TICK' }
  | { type: 'TIMER_TOGGLE' }
  | { type: 'TIMER_ADD_SECONDS'; payload: number }
  | { type: 'LOAD_TEMPLATE'; payload: string }
  | { type: 'RESET_SESSION' };

function workshopReducer(state: WorkshopState, action: Action): WorkshopState {
  switch (action.type) {
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };

    case 'SET_STEP':
      return { ...state, step: action.payload };

    case 'SET_ACTIVE_HAT': {
      const activeHat = action.payload;
      const recipe = DAILY_RECIPES.find(r => r.id === state.selectedRecipeId);
      const presetSeconds = recipe?.hatTimers[activeHat] || 180;
      return {
        ...state,
        activeHat,
        timer: {
          presetSeconds,
          secondsRemaining: presetSeconds,
          isRunning: false
        }
      };
    }

    case 'SET_TOPIC':
      return {
        ...state,
        topic: action.payload.topic,
        expectedOutcome: action.payload.expectedOutcome !== undefined ? action.payload.expectedOutcome : state.expectedOutcome
      };

    case 'SET_RECIPE': {
      const recipe = DAILY_RECIPES.find(r => r.id === action.payload);
      if (!recipe) return state;
      const initialHat = recipe.hatSequence[0] || 'blue';
      const preset = recipe.hatTimers[initialHat] || 180;
      return {
        ...state,
        selectedRecipeId: recipe.id,
        activeHat: initialHat,
        timer: {
          presetSeconds: preset,
          secondsRemaining: preset,
          isRunning: false
        }
      };
    }

    case 'TOGGLE_MATRIX':
      return {
        ...state,
        isMatrixOpen: action.payload !== undefined ? action.payload : !state.isMatrixOpen
      };

    case 'ADD_CARD': {
      const { hat, content, metadata } = action.payload;
      if (!content.trim()) return state;
      const newCard: CardItem = {
        id: `card-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        hat,
        content: content.trim(),
        votes: 0,
        createdAt: Date.now(),
        metadata
      };
      return {
        ...state,
        cards: {
          ...state.cards,
          [hat]: [newCard, ...state.cards[hat]]
        }
      };
    }

    case 'DELETE_CARD': {
      const { hat, id } = action.payload;
      return {
        ...state,
        cards: {
          ...state.cards,
          [hat]: state.cards[hat].filter(c => c.id !== id)
        }
      };
    }

    case 'VOTE_CARD': {
      const { hat, id } = action.payload;
      return {
        ...state,
        cards: {
          ...state.cards,
          [hat]: state.cards[hat].map(c => c.id === id ? { ...c, votes: c.votes + 1 } : c)
        }
      };
    }

    case 'ADD_ACTION_ITEM': {
      const newItem: ActionItem = {
        id: `action-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        ...action.payload
      };
      return {
        ...state,
        actionItems: [...state.actionItems, newItem]
      };
    }

    case 'UPDATE_ACTION_ITEM': {
      return {
        ...state,
        actionItems: state.actionItems.map(item => item.id === action.payload.id ? action.payload : item)
      };
    }

    case 'DELETE_ACTION_ITEM': {
      return {
        ...state,
        actionItems: state.actionItems.filter(item => item.id !== action.payload)
      };
    }

    case 'TIMER_SET':
      return {
        ...state,
        timer: {
          ...state.timer,
          secondsRemaining: action.payload.seconds,
          presetSeconds: action.payload.seconds,
          isRunning: action.payload.isRunning ?? state.timer.isRunning
        }
      };

    case 'TIMER_TICK':
      if (!state.timer.isRunning || state.timer.secondsRemaining <= 0) {
        return state;
      }
      return {
        ...state,
        timer: {
          ...state.timer,
          secondsRemaining: state.timer.secondsRemaining - 1,
          isRunning: state.timer.secondsRemaining - 1 > 0
        }
      };

    case 'TIMER_TOGGLE':
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: !state.timer.isRunning
        }
      };

    case 'TIMER_ADD_SECONDS':
      return {
        ...state,
        timer: {
          ...state.timer,
          secondsRemaining: state.timer.secondsRemaining + action.payload
        }
      };

    case 'LOAD_TEMPLATE': {
      const tmpl = SAMPLE_TEMPLATES.find(t => t.id === action.payload);
      if (!tmpl) return state;

      const loadedCards: Record<HatType, CardItem[]> = {
        white: [],
        red: [],
        yellow: [],
        black: [],
        green: [],
        blue: []
      };

      (Object.keys(tmpl.sampleCards) as HatType[]).forEach(hat => {
        loadedCards[hat] = tmpl.sampleCards[hat].map((c, idx) => ({
          id: `tmpl-${hat}-${idx}-${Date.now()}`,
          hat,
          content: c.content,
          votes: 0,
          createdAt: Date.now(),
          metadata: c.metadata
        }));
      });

      return {
        ...state,
        topic: tmpl.topic,
        expectedOutcome: tmpl.expectedOutcome,
        selectedRecipeId: tmpl.recommendedRecipeId,
        cards: loadedCards,
        actionItems: tmpl.sampleActions || [],
        viewMode: 'workspace',
        step: 2
      };
    }

    case 'RESET_SESSION':
      return { ...defaultState, viewMode: state.viewMode };

    default:
      return state;
  }
}

interface WorkshopContextType {
  state: WorkshopState;
  actions: {
    setViewMode: (mode: 'playbook' | 'workspace') => void;
    setStep: (step: WorkshopStep) => void;
    setActiveHat: (hat: HatType) => void;
    setTopic: (topic: string, expectedOutcome?: string) => void;
    setRecipe: (recipeId: string) => void;
    toggleMatrix: (open?: boolean) => void;
    addCard: (card: { hat: HatType; content: string; metadata?: CardItem['metadata'] }) => void;
    deleteCard: (hat: HatType, id: string) => void;
    voteCard: (hat: HatType, id: string) => void;
    addActionItem: (item: Omit<ActionItem, 'id'>) => void;
    updateActionItem: (item: ActionItem) => void;
    deleteActionItem: (id: string) => void;
    toggleTimer: () => void;
    addTimerSeconds: (sec: number) => void;
    setTimerSeconds: (sec: number) => void;
    loadTemplate: (templateId: string) => void;
    resetSession: () => void;
  };
}

const WorkshopContext = createContext<WorkshopContextType | null>(null);

export const WorkshopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(workshopReducer, defaultState, (initial) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...initial, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return initial;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota errors
    }
  }, [state]);

  // Interval timer tick
  useEffect(() => {
    if (!state.timer.isRunning) return;
    const interval = setInterval(() => {
      dispatch({ type: 'TIMER_TICK' });
    }, 1000);
    return () => clearInterval(interval);
  }, [state.timer.isRunning]);

  const actions = {
    setViewMode: (mode: 'playbook' | 'workspace') => dispatch({ type: 'SET_VIEW_MODE', payload: mode }),
    setStep: (step: WorkshopStep) => dispatch({ type: 'SET_STEP', payload: step }),
    setActiveHat: (hat: HatType) => dispatch({ type: 'SET_ACTIVE_HAT', payload: hat }),
    setTopic: (topic: string, expectedOutcome?: string) => dispatch({ type: 'SET_TOPIC', payload: { topic, expectedOutcome } }),
    setRecipe: (recipeId: string) => dispatch({ type: 'SET_RECIPE', payload: recipeId }),
    toggleMatrix: (open?: boolean) => dispatch({ type: 'TOGGLE_MATRIX', payload: open }),
    addCard: (card: { hat: HatType; content: string; metadata?: CardItem['metadata'] }) => dispatch({ type: 'ADD_CARD', payload: card }),
    deleteCard: (hat: HatType, id: string) => dispatch({ type: 'DELETE_CARD', payload: { hat, id } }),
    voteCard: (hat: HatType, id: string) => dispatch({ type: 'VOTE_CARD', payload: { hat, id } }),
    addActionItem: (item: Omit<ActionItem, 'id'>) => dispatch({ type: 'ADD_ACTION_ITEM', payload: item }),
    updateActionItem: (item: ActionItem) => dispatch({ type: 'UPDATE_ACTION_ITEM', payload: item }),
    deleteActionItem: (id: string) => dispatch({ type: 'DELETE_ACTION_ITEM', payload: id }),
    toggleTimer: () => dispatch({ type: 'TIMER_TOGGLE' }),
    addTimerSeconds: (sec: number) => dispatch({ type: 'TIMER_ADD_SECONDS', payload: sec }),
    setTimerSeconds: (sec: number) => dispatch({ type: 'TIMER_SET', payload: { seconds: sec } }),
    loadTemplate: (templateId: string) => dispatch({ type: 'LOAD_TEMPLATE', payload: templateId }),
    resetSession: () => dispatch({ type: 'RESET_SESSION' })
  };

  return (
    <WorkshopContext.Provider value={{ state, actions }}>
      {children}
    </WorkshopContext.Provider>
  );
};

export function useWorkshop() {
  const context = useContext(WorkshopContext);
  if (!context) {
    throw new Error('useWorkshop must be used within a WorkshopProvider');
  }
  return context;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/context.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/context/WorkshopContext.tsx tests/context.test.tsx
git commit -m "feat: implement centralized WorkshopContext with localStorage persistence and timers"
```

---

### Task 5: "Learn & Guide" Hub: The Daily Work Playbook

**Files:**
- Create: `src/components/playbook/PlaybookHub.tsx`
- Create: `src/components/playbook/HatCard.tsx`
- Create: `src/components/playbook/ThinkingVisualizer.tsx`
- Create: `src/components/playbook/RecipeViewer.tsx`
- Test: `tests/PlaybookHub.test.tsx`

**Interfaces:**
- Consumes: `HAT_DEFINITIONS`, `DAILY_RECIPES`, `useWorkshop()`
- Produces: `PlaybookHub` component allowing team exploration of hats, DOs/DON'Ts, thinking styles, and one-click launching of daily work recipes.

- [ ] **Step 1: Write failing unit test for PlaybookHub**

`tests/PlaybookHub.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkshopProvider } from '../src/context/WorkshopContext';
import { PlaybookHub } from '../src/components/playbook/PlaybookHub';

describe('PlaybookHub Component', () => {
  it('renders all 6 thinking hats and switches selected hat details', () => {
    render(
      <WorkshopProvider>
        <PlaybookHub onLaunchWorkspace={() => {}} />
      </WorkshopProvider>
    );

    expect(screen.getByText('Six Thinking Hats Playbook')).toBeInTheDocument();
    expect(screen.getByText('Facts & Information')).toBeInTheDocument();
    expect(screen.getByText('Emotions & Intuition')).toBeInTheDocument();

    // Click Red Hat
    const redHatButton = screen.getByTestId('hat-select-red');
    fireEvent.click(redHatButton);

    expect(screen.getByText('What is your immediate gut reaction? How does this make you feel right now?')).toBeInTheDocument();
    expect(screen.getByText('Never explain or defend your feelings. Give your raw intuition as it stands.')).toBeInTheDocument();
  });

  it('renders daily work recipes and launches workspace', () => {
    let launched = false;
    render(
      <WorkshopProvider>
        <PlaybookHub onLaunchWorkspace={() => { launched = true; }} />
      </WorkshopProvider>
    );

    const recipeCard = screen.getByText('Quick Standup Dilemma');
    expect(recipeCard).toBeInTheDocument();

    const launchButton = screen.getAllByRole('button', { name: /run this meeting/i })[0];
    fireEvent.click(launchButton);
    expect(launched).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/PlaybookHub.test.tsx`
Expected: FAIL (Cannot find module)

- [ ] **Step 3: Implement Playbook components**

`src/components/playbook/HatCard.tsx`:
```tsx
import React from 'react';
import { HatInfo } from '../../types';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export const HatCard: React.FC<{
  hat: HatInfo;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ hat, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      data-testid={`hat-select-${hat.id}`}
      onClick={onSelect}
      className={`text-left p-4 rounded-2xl transition-all border-2 flex flex-col justify-between ${
        isSelected
          ? 'shadow-lg scale-102 ring-2 ring-offset-2'
          : 'bg-white hover:border-slate-300 shadow-xs'
      }`}
      style={{
        borderColor: isSelected ? hat.primaryColor : '#e2e8f0',
        backgroundColor: isSelected ? hat.bgTint : '#ffffff',
        outlineColor: hat.primaryColor
      }}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${hat.primaryColor}20`, color: hat.primaryColor }}
          >
            {hat.badge}
          </span>
          <span className="text-sm font-semibold text-slate-500">{hat.name}</span>
        </div>
        <h3 className="font-bold text-slate-900 text-lg">{hat.title}</h3>
        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{hat.summary}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-medium" style={{ color: hat.primaryColor }}>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hat.primaryColor }} />
        {isSelected ? 'Currently Viewing' : 'Click to View Rules'}
      </div>
    </button>
  );
};

export const HatDetailModal: React.FC<{ hat: HatInfo }> = ({ hat }) => {
  return (
    <div
      className="p-6 rounded-2xl border-2 transition-all shadow-sm"
      style={{
        backgroundColor: hat.bgTint,
        borderColor: hat.borderColor
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4 mb-4" style={{ borderColor: hat.borderColor }}>
        <div>
          <span
            className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ backgroundColor: hat.primaryColor, color: '#ffffff' }}
          >
            {hat.name}
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2">{hat.title}</h2>
        </div>
        <div className="text-sm font-semibold px-3 py-1 rounded-lg bg-white/80 border border-slate-200 text-slate-700">
          Core Lens: {hat.badge}
        </div>
      </div>

      <div className="bg-white/90 p-4 rounded-xl border border-slate-200/80 mb-5 shadow-xs">
        <span className="text-xs font-bold uppercase text-slate-400 block mb-1">Key Guiding Question</span>
        <p className="text-lg font-bold text-slate-900 italic">"{hat.question}"</p>
      </div>

      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 flex items-start gap-2.5 mb-6">
        <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
        <div>
          <strong className="font-bold block text-sm">The Golden Rule:</strong>
          <span className="text-sm font-medium">{hat.goldenRule}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/80 p-4 rounded-xl border border-emerald-100 shadow-xs">
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            DOs (What to focus on)
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {hat.dos.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/80 p-4 rounded-xl border border-rose-100 shadow-xs">
          <div className="flex items-center gap-1.5 text-rose-700 font-bold text-sm mb-3">
            <XCircle className="w-4 h-4 text-rose-600" />
            DON'Ts (Anti-Patterns)
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {hat.donts.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
```

`src/components/playbook/ThinkingVisualizer.tsx`:
```tsx
import React from 'react';
import { Users, Shuffle } from 'lucide-react';

export const ThinkingVisualizer: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <h3 className="text-xl font-extrabold text-slate-900">Why Six Hats? Parallel vs. Adversarial Thinking</h3>
        <p className="text-sm text-slate-600 mt-1">
          Traditional meetings create debates where egos defend positions. Six Thinking Hats forces the entire room to look in the exact same direction simultaneously.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Adversarial Thinking */}
        <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/40">
          <div className="flex items-center gap-2 text-rose-800 font-bold mb-2">
            <Shuffle className="w-5 h-5 text-rose-600" />
            Traditional Adversarial Debate
          </div>
          <p className="text-xs text-rose-700 mb-4">
            Person A suggests an idea. Person B attacks it with Black Hat caution. Person A gets defensive. 70% of energy is spent protecting egos.
          </p>
          <div className="space-y-2 text-xs font-medium">
            <div className="p-2 rounded-lg bg-white border border-rose-200 text-slate-800 flex justify-between">
              <span>"Here is my proposal"</span>
              <span className="text-emerald-600 font-bold">Green/Yellow</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-rose-200 text-slate-800 flex justify-between">
              <span>"That will fail because of budget"</span>
              <span className="text-slate-800 font-bold">Black</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-rose-200 text-slate-800 flex justify-between">
              <span>"You always shoot down my ideas!"</span>
              <span className="text-rose-600 font-bold">Red (Defensive)</span>
            </div>
          </div>
        </div>

        {/* Parallel Thinking */}
        <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40">
          <div className="flex items-center gap-2 text-emerald-800 font-bold mb-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Parallel Thinking (Six Hats)
          </div>
          <p className="text-xs text-emerald-700 mb-4">
            Everyone puts on the SAME hat at the SAME time. When wearing Black Hat, everyone spots risks together. When wearing Yellow Hat, even skeptics find benefits.
          </p>
          <div className="space-y-2 text-xs font-medium">
            <div className="p-2 rounded-lg bg-white border border-emerald-200 text-slate-800 flex justify-between">
              <span>Step 1: All look at facts and metrics</span>
              <span className="text-slate-600 font-bold">White Hat (Room)</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-emerald-200 text-slate-800 flex justify-between">
              <span>Step 2: All invent alternative solutions</span>
              <span className="text-emerald-600 font-bold">Green Hat (Room)</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-emerald-200 text-slate-800 flex justify-between">
              <span>Step 3: All stress-test vulnerabilities</span>
              <span className="text-slate-800 font-bold">Black Hat (Room)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

`src/components/playbook/RecipeViewer.tsx`:
```tsx
import React from 'react';
import { DAILY_RECIPES } from '../../data/recipes';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { Clock, Play, ArrowRight } from 'lucide-react';
import { DailyRecipe, HatType } from '../../types';

export const RecipeViewer: React.FC<{
  onSelectRecipe: (recipe: DailyRecipe) => void;
}> = ({ onSelectRecipe }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Daily Work Recipes</h3>
          <p className="text-xs text-slate-600">Proven sequences you can use in tomorrow’s team meetings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DAILY_RECIPES.map((recipe) => (
          <div
            key={recipe.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {recipe.durationMinutes} mins
                </span>
                <span className="text-xs text-slate-400 font-semibold">{recipe.hatSequence.length} Steps</span>
              </div>
              <h4 className="font-extrabold text-slate-900 text-base">{recipe.name}</h4>
              <p className="text-xs font-medium text-blue-700 mt-0.5">{recipe.tagline}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{recipe.description}</p>

              {/* Hat Flow Sequence Pills */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Sequence Flow</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {recipe.hatSequence.map((hatKey: HatType, idx: number) => {
                    const hat = HAT_DEFINITIONS[hatKey];
                    return (
                      <React.Fragment key={idx}>
                        <span
                          className="text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 text-white shadow-xs"
                          style={{ backgroundColor: hat.primaryColor }}
                        >
                          {hat.name.replace(' Hat', '')}
                        </span>
                        {idx < recipe.hatSequence.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-300" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectRecipe(recipe)}
              className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Run This Meeting in Workspace
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
```

`src/components/playbook/PlaybookHub.tsx`:
```tsx
import React, { useState } from 'react';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { HatCard, HatDetailModal } from './HatCard';
import { ThinkingVisualizer } from './ThinkingVisualizer';
import { RecipeViewer } from './RecipeViewer';
import { DailyRecipe, HatType } from '../../types';
import { useWorkshop } from '../../context/WorkshopContext';
import { BookOpen, Sparkles } from 'lucide-react';

export const PlaybookHub: React.FC<{ onLaunchWorkspace: () => void }> = ({ onLaunchWorkspace }) => {
  const [selectedHatId, setSelectedHatId] = useState<HatType>('white');
  const { actions } = useWorkshop();

  const handleLaunchRecipe = (recipe: DailyRecipe) => {
    actions.setRecipe(recipe.id);
    actions.setViewMode('workspace');
    actions.setStep(1);
    onLaunchWorkspace();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-4 px-2">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          Interactive Facilitator Playbook
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Six Thinking Hats Playbook
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto">
          How to organize thought, eliminate circular debates, and make rapid, high-confidence team decisions in everyday software work.
        </p>
      </div>

      {/* 6-Hat Selector Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            The 6 Thinking Angles
          </h2>
          <span className="text-xs text-slate-500 font-medium">Select a hat to examine rules and DOs / DON'Ts</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {(Object.keys(HAT_DEFINITIONS) as HatType[]).map((hatKey) => (
            <HatCard
              key={hatKey}
              hat={HAT_DEFINITIONS[hatKey]}
              isSelected={selectedHatId === hatKey}
              onSelect={() => setSelectedHatId(hatKey)}
            />
          ))}
        </div>

        {/* Selected Hat Detail Panel */}
        <div className="mt-4">
          <HatDetailModal hat={HAT_DEFINITIONS[selectedHatId]} />
        </div>
      </div>

      {/* Parallel vs Adversarial Graphic */}
      <ThinkingVisualizer />

      {/* Daily Work Recipes */}
      <RecipeViewer onSelectRecipe={handleLaunchRecipe} />
    </div>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/PlaybookHub.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/components/playbook/ tests/PlaybookHub.test.tsx
git commit -m "feat: implement PlaybookHub with 6-hat guide, DOs/DON'Ts, thinking visualizer, and recipes"
```

---

### Task 6: "Live Workspace" Hub: Active Hat Header & Sticky Wall

**Files:**
- Create: `src/components/workspace/HatHeader.tsx`
- Create: `src/components/workspace/StickyCard.tsx`
- Create: `src/components/workspace/StickyWall.tsx`
- Create: `src/components/workspace/WorkspaceHub.tsx`
- Test: `tests/StickyWall.test.tsx`

**Interfaces:**
- Consumes: `useWorkshop()`, `HAT_DEFINITIONS`, `soundEngine`
- Produces: `WorkspaceHub` with dynamic chromatic theming, card creation, metadata tags (Risk/Emotion), upvoting, and sticky board.

- [ ] **Step 1: Write failing unit test for card creation & wall rendering**

`tests/StickyWall.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkshopProvider } from '../src/context/WorkshopContext';
import { StickyWall } from '../src/components/workspace/StickyWall';

describe('StickyWall Component', () => {
  it('adds a card under active hat with content and metadata', () => {
    render(
      <WorkshopProvider>
        <StickyWall />
      </WorkshopProvider>
    );

    const input = screen.getByPlaceholderText(/type a thought/i);
    fireEvent.change(input, { target: { value: 'Critical vulnerability in cache' } });

    const submitBtn = screen.getByRole('button', { name: /add note/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Critical vulnerability in cache')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/StickyWall.test.tsx`
Expected: FAIL (Cannot find module)

- [ ] **Step 3: Implement HatHeader, StickyCard, StickyWall, and WorkspaceHub**

`src/components/workspace/HatHeader.tsx`:
```tsx
import React from 'react';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { useWorkshop } from '../../context/WorkshopContext';
import { AlertCircle } from 'lucide-react';

export const HatHeader: React.FC = () => {
  const { state } = useWorkshop();
  const currentHat = HAT_DEFINITIONS[state.activeHat];

  return (
    <div
      className="p-6 rounded-2xl border-2 transition-all shadow-sm"
      style={{
        backgroundColor: currentHat.bgTint,
        borderColor: currentHat.borderColor
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-xs text-lg"
            style={{ backgroundColor: currentHat.primaryColor }}
          >
            {state.activeHat.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Hat</span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: currentHat.primaryColor }}
              >
                {currentHat.name}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">{currentHat.title}</h2>
          </div>
        </div>

        {/* Golden Rule Pill */}
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs max-w-md">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="text-slate-800">{currentHat.goldenRule}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/60">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Guiding Prompt for Room</span>
        <p className="text-lg font-bold text-slate-800 mt-0.5">"{currentHat.question}"</p>
      </div>
    </div>
  );
};
```

`src/components/workspace/StickyCard.tsx`:
```tsx
import React from 'react';
import { CardItem } from '../../types';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { ThumbsUp, Trash2, AlertTriangle, Heart } from 'lucide-react';

export const StickyCard: React.FC<{
  card: CardItem;
  onVote: () => void;
  onDelete: () => void;
}> = ({ card, onVote, onDelete }) => {
  const hat = HAT_DEFINITIONS[card.hat];

  return (
    <div
      className="p-4 rounded-xl border bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between group min-h-[120px]"
      style={{ borderTopWidth: '4px', borderTopColor: hat.primaryColor }}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          {/* Metadata Badges */}
          {card.metadata?.riskSeverity && (
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${
                card.metadata.riskSeverity === 'high'
                  ? 'bg-rose-100 text-rose-800'
                  : card.metadata.riskSeverity === 'medium'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              {card.metadata.riskSeverity} risk
            </span>
          )}

          {card.metadata?.sentimentTone && (
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${
                card.metadata.sentimentTone === 'positive'
                  ? 'bg-emerald-100 text-emerald-800'
                  : card.metadata.sentimentTone === 'skeptical'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Heart className="w-3 h-3" />
              {card.metadata.sentimentTone}
            </span>
          )}

          {!card.metadata?.riskSeverity && !card.metadata?.sentimentTone && (
            <span className="text-[10px] font-bold text-slate-400 uppercase">{hat.name}</span>
          )}

          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete note"
            className="text-slate-300 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100 p-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-sm font-medium text-slate-900 leading-relaxed break-words">{card.content}</p>
      </div>

      <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="text-[10px] text-slate-400">{new Date(card.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

        <button
          type="button"
          onClick={onVote}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors cursor-pointer"
        >
          <ThumbsUp className="w-3 h-3" />
          <span>{card.votes}</span>
        </button>
      </div>
    </div>
  );
};
```

`src/components/workspace/StickyWall.tsx`:
```tsx
import React, { useState } from 'react';
import { useWorkshop } from '../../context/WorkshopContext';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { StickyCard } from './StickyCard';
import { Plus, Sparkles } from 'lucide-react';

export const StickyWall: React.FC = () => {
  const { state, actions } = useWorkshop();
  const [content, setContent] = useState('');
  const [riskSeverity, setRiskSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [sentimentTone, setSentimentTone] = useState<'positive' | 'skeptical' | 'neutral'>('positive');

  const activeHat = state.activeHat;
  const currentCards = state.cards[activeHat] || [];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    actions.addCard({
      hat: activeHat,
      content,
      metadata: {
        riskSeverity: activeHat === 'black' ? riskSeverity : undefined,
        sentimentTone: activeHat === 'red' ? sentimentTone : undefined
      }
    });

    setContent('');
  };

  return (
    <div className="space-y-6">
      {/* Rapid Note Input Bar */}
      <form onSubmit={handleAdd} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="card-input-field"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Type a thought under ${HAT_DEFINITIONS[activeHat].name}... (Press Enter)`}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
          />

          {/* Hat Specific Metadata Selectors */}
          {activeHat === 'black' && (
            <select
              value={riskSeverity}
              onChange={(e) => setRiskSeverity(e.target.value as 'low' | 'medium' | 'high')}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 text-slate-700"
            >
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          )}

          {activeHat === 'red' && (
            <select
              value={sentimentTone}
              onChange={(e) => setSentimentTone(e.target.value as 'positive' | 'skeptical' | 'neutral')}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 text-slate-700"
            >
              <option value="positive">Positive Gut</option>
              <option value="skeptical">Uneasy / Skeptical</option>
              <option value="neutral">Neutral Pulse</option>
            </select>
          )}

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Note
          </button>
        </div>
      </form>

      {/* Cards Grid */}
      {currentCards.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-white">
          <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h4 className="font-bold text-slate-700 text-sm">No notes under {HAT_DEFINITIONS[activeHat].name} yet</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Facilitator can type thoughts voiced by the room above, or load a case study template.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentCards.map((card) => (
            <StickyCard
              key={card.id}
              card={card}
              onVote={() => actions.voteCard(activeHat, card.id)}
              onDelete={() => actions.deleteCard(activeHat, card.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
```

`src/components/workspace/WorkspaceHub.tsx`:
```tsx
import React from 'react';
import { useWorkshop } from '../../context/WorkshopContext';
import { HatHeader } from './HatHeader';
import { StickyWall } from './StickyWall';
import { SAMPLE_TEMPLATES } from '../../data/sampleTemplates';
import { DAILY_RECIPES } from '../../data/recipes';

export const WorkspaceHub: React.FC = () => {
  const { state, actions } = useWorkshop();

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-4 px-2">
      {/* Step 1: Define Topic Card (Expandable/Sticky) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 1 of 4: Setup</span>
            <h3 className="text-lg font-black text-slate-900">Session Topic & Deliverable</h3>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={state.selectedRecipeId}
              onChange={(e) => actions.setRecipe(e.target.value)}
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800"
            >
              {DAILY_RECIPES.map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.durationMinutes}m)</option>
              ))}
            </select>

            <select
              onChange={(e) => {
                if (e.target.value) actions.loadTemplate(e.target.value);
              }}
              defaultValue=""
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800"
            >
              <option value="" disabled>Load Case Study...</option>
              {SAMPLE_TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={state.topic}
            onChange={(e) => actions.setTopic(e.target.value)}
            placeholder="What problem or decision are we evaluating today?"
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={state.expectedOutcome}
            onChange={(e) => actions.setTopic(state.topic, e.target.value)}
            placeholder="Target deliverable (e.g., Action plan with owners, Go/No-Go decision)"
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Active Hat Guiding Header */}
      <HatHeader />

      {/* Interactive Sticky Card Wall */}
      <StickyWall />
    </div>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/StickyWall.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add src/components/workspace/ tests/StickyWall.test.tsx
git commit -m "feat: implement active hat header, card input wall, and workspace hub"
```

---

### Task 7: Facilitator HUD, Timer Bar & Keyboard Navigation

**Files:**
- Create: `src/components/workspace/TimerDisplay.tsx`
- Create: `src/hooks/useFacilitatorHotkeys.ts`
- Create: `src/components/workspace/FacilitatorHUD.tsx`
- Test: `tests/hotkeys.test.ts`

**Interfaces:**
- Consumes: `useWorkshop()`, `soundEngine`, `formatSeconds`, `getTimerStatus`
- Produces: `FacilitatorHUD` floating/docked toolbar, hotkey hook supporting `1-6`, `Space`, `T`, `N`, `M`, `Ctrl+P`.

- [ ] **Step 1: Write failing unit test for hotkeys handler**

`tests/hotkeys.test.ts`:
```typescript
import { describe, it, expect, vi } from 'vitest';
import { handleHotkeyDown } from '../src/hooks/useFacilitatorHotkeys';

describe('Facilitator Hotkey Engine', () => {
  it('switches hats 1-6 when pressed outside input fields', () => {
    const onSwitchHat = vi.fn();
    const event = {
      key: '2',
      target: { tagName: 'DIV' },
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent;

    handleHotkeyDown(event, { onSwitchHat, onToggleTimer: vi.fn(), onAddTimer: vi.fn(), onFocusInput: vi.fn(), onToggleMatrix: vi.fn() });
    expect(onSwitchHat).toHaveBeenCalledWith('red');
  });

  it('ignores hotkeys if the user is typing in an INPUT element', () => {
    const onSwitchHat = vi.fn();
    const event = {
      key: '2',
      target: { tagName: 'INPUT' },
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent;

    handleHotkeyDown(event, { onSwitchHat, onToggleTimer: vi.fn(), onAddTimer: vi.fn(), onFocusInput: vi.fn(), onToggleMatrix: vi.fn() });
    expect(onSwitchHat).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/hotkeys.test.ts`
Expected: FAIL (Cannot find module)

- [ ] **Step 3: Implement TimerDisplay, hotkey handler, and FacilitatorHUD**

`src/hooks/useFacilitatorHotkeys.ts`:
```typescript
import { useEffect } from 'react';
import { HatType } from '../types';

interface HotkeyCallbacks {
  onSwitchHat: (hat: HatType) => void;
  onToggleTimer: () => void;
  onAddTimer: (sec: number) => void;
  onFocusInput: () => void;
  onToggleMatrix: () => void;
}

const HAT_KEY_MAP: Record<string, HatType> = {
  '1': 'white',
  '2': 'red',
  '3': 'yellow',
  '4': 'black',
  '5': 'green',
  '6': 'blue'
};

export function handleHotkeyDown(e: KeyboardEvent, callbacks: HotkeyCallbacks) {
  const target = e.target as HTMLElement | null;
  const tagName = target?.tagName;

  // Ignore if user is currently inside text inputs or textareas
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
    return;
  }

  if (HAT_KEY_MAP[e.key]) {
    e.preventDefault();
    callbacks.onSwitchHat(HAT_KEY_MAP[e.key]);
    return;
  }

  if (e.code === 'Space') {
    e.preventDefault();
    callbacks.onToggleTimer();
    return;
  }

  if (e.key === 't' || e.key === 'T') {
    e.preventDefault();
    callbacks.onAddTimer(60);
    return;
  }

  if (e.key === 'n' || e.key === 'N') {
    e.preventDefault();
    callbacks.onFocusInput();
    return;
  }

  if (e.key === 'm' || e.key === 'M') {
    e.preventDefault();
    callbacks.onToggleMatrix();
    return;
  }
}

export function useFacilitatorHotkeys(callbacks: HotkeyCallbacks) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => handleHotkeyDown(e, callbacks);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [callbacks]);
}
```

`src/components/workspace/TimerDisplay.tsx`:
```tsx
import React, { useEffect, useRef } from 'react';
import { useWorkshop } from '../../context/WorkshopContext';
import { formatSeconds, getTimerStatus } from '../../utils/timer';
import { soundEngine } from '../../utils/audio';
import { Play, Pause, Plus, RotateCcw } from 'lucide-react';

export const TimerDisplay: React.FC = () => {
  const { state, actions } = useWorkshop();
  const { secondsRemaining, isRunning, presetSeconds } = state.timer;
  const status = getTimerStatus(secondsRemaining, presetSeconds);
  const prevRemaining = useRef(secondsRemaining);

  useEffect(() => {
    if (isRunning && secondsRemaining === 0 && prevRemaining.current > 0) {
      soundEngine.playChime('finish');
    } else if (isRunning && secondsRemaining === 30 && prevRemaining.current > 30) {
      soundEngine.playChime('warning');
    }
    prevRemaining.current = secondsRemaining;
  }, [secondsRemaining, isRunning]);

  const percentage = Math.min(100, Math.max(0, (secondsRemaining / (presetSeconds || 180)) * 100));

  return (
    <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
      <div className="flex flex-col items-center">
        <div
          className={`font-mono font-black text-xl px-3 py-1 rounded-lg transition-colors ${
            status === 'critical'
              ? 'bg-rose-100 text-rose-700 animate-pulse'
              : status === 'warning'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-slate-100 text-slate-800'
          }`}
        >
          {formatSeconds(secondsRemaining)}
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1 rounded-full mt-1 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              status === 'critical' ? 'bg-rose-500' : status === 'warning' ? 'bg-amber-500' : 'bg-blue-600'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => actions.toggleTimer()}
          aria-label={isRunning ? 'Pause Timer' : 'Start Timer'}
          className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white transition-colors cursor-pointer"
        >
          {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
        </button>

        <button
          type="button"
          onClick={() => actions.addTimerSeconds(60)}
          title="Add 60 seconds (Hot key: T)"
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-xs font-bold"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => actions.setTimerSeconds(presetSeconds)}
          title="Reset timer to preset"
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
```

`src/components/workspace/FacilitatorHUD.tsx`:
```tsx
import React from 'react';
import { useWorkshop } from '../../context/WorkshopContext';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { HatType } from '../../types';
import { TimerDisplay } from './TimerDisplay';
import { useFacilitatorHotkeys } from '../../hooks/useFacilitatorHotkeys';
import { LayoutGrid, RotateCcw } from 'lucide-react';

export const FacilitatorHUD: React.FC = () => {
  const { state, actions } = useWorkshop();

  useFacilitatorHotkeys({
    onSwitchHat: (hat) => actions.setActiveHat(hat),
    onToggleTimer: () => actions.toggleTimer(),
    onAddTimer: (sec) => actions.addTimerSeconds(sec),
    onFocusInput: () => {
      document.getElementById('card-input-field')?.focus();
    },
    onToggleMatrix: () => actions.toggleMatrix()
  });

  const hats: HatType[] = ['white', 'red', 'yellow', 'black', 'green', 'blue'];

  return (
    <div className="sticky bottom-4 z-40 max-w-5xl mx-auto px-4">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-3">
        {/* Hat Quick Switchers (Hotkeys 1-6) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {hats.map((hatKey, idx) => {
            const hat = HAT_DEFINITIONS[hatKey];
            const isActive = state.activeHat === hatKey;
            return (
              <button
                key={hatKey}
                type="button"
                onClick={() => actions.setActiveHat(hatKey)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive ? 'ring-2 ring-white scale-105 shadow-md' : 'opacity-80 hover:opacity-100 bg-slate-800'
                }`}
                style={{ backgroundColor: isActive ? hat.primaryColor : undefined }}
              >
                <span className="text-[10px] opacity-70">[{idx + 1}]</span>
                <span>{hat.name.replace(' Hat', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Timer Control */}
        <div className="flex items-center gap-2">
          <TimerDisplay />

          <button
            type="button"
            onClick={() => actions.toggleMatrix()}
            className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              state.isMatrixOpen ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Toggle Matrix (Hot key: M)"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Matrix [M]</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset current workshop session? All cards will be cleared.')) {
                actions.resetSession();
              }
            }}
            title="Reset Session"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-rose-900 text-slate-400 hover:text-rose-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/hotkeys.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/hooks/ src/components/workspace/TimerDisplay.tsx src/components/workspace/FacilitatorHUD.tsx tests/hotkeys.test.ts
git commit -m "feat: implement timer display with Web Audio chimes, hotkey engine, and facilitator HUD"
```

---

### Task 8: Synthesis Matrix, Action Items Register & Export Engine

**Files:**
- Create: `src/utils/exportMarkdown.ts`
- Create: `src/components/workspace/ActionItemTable.tsx`
- Create: `src/components/workspace/MatrixOverview.tsx`
- Test: `tests/exportMarkdown.test.ts`

**Interfaces:**
- Consumes: `useWorkshop()`, `HAT_DEFINITIONS`
- Produces: `MatrixOverview` modal/full-view, `ActionItemTable` management, `generateSessionMarkdown(state)`, Markdown download & Print view.

- [ ] **Step 1: Write failing unit test for markdown export generation**

`tests/exportMarkdown.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { generateSessionMarkdown } from '../src/utils/exportMarkdown';
import { WorkshopState } from '../src/context/WorkshopContext';

describe('Markdown Export Engine', () => {
  it('generates a clean structured report containing topic, 6 hats, and action items', () => {
    const mockState: WorkshopState = {
      viewMode: 'workspace',
      step: 4,
      activeHat: 'blue',
      topic: 'Team Workflow Optimization',
      expectedOutcome: 'Clear next steps',
      selectedRecipeId: 'quick-standup',
      isMatrixOpen: false,
      timer: { secondsRemaining: 0, isRunning: false, presetSeconds: 120 },
      cards: {
        white: [{ id: '1', hat: 'white', content: 'Velocity is 32 pts', votes: 2, createdAt: 1000 }],
        red: [{ id: '2', hat: 'red', content: 'Excited about changes', votes: 1, createdAt: 1000, metadata: { sentimentTone: 'positive' } }],
        yellow: [],
        black: [{ id: '3', hat: 'black', content: 'Risk of downtime', votes: 3, createdAt: 1000, metadata: { riskSeverity: 'high' } }],
        green: [],
        blue: []
      },
      actionItems: [
        { id: 'act-1', task: 'Deploy monitoring', owner: 'Alex', dueDate: '2026-10-30', status: 'todo' }
      ]
    };

    const md = generateSessionMarkdown(mockState);
    expect(md).toContain('# Six Thinking Hats Workshop Summary');
    expect(md).toContain('Team Workflow Optimization');
    expect(md).toContain('Velocity is 32 pts');
    expect(md).toContain('Deploy monitoring');
    expect(md).toContain('HIGH risk');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/exportMarkdown.test.ts`
Expected: FAIL (Cannot find module)

- [ ] **Step 3: Implement export engine, ActionItemTable, and MatrixOverview**

`src/utils/exportMarkdown.ts`:
```typescript
import { WorkshopState } from '../context/WorkshopContext';
import { HAT_DEFINITIONS } from '../data/hatDefinitions';
import { HatType } from '../types';

export function generateSessionMarkdown(state: WorkshopState): string {
  const dateStr = new Date().toISOString().split('T')[0];
  const hats: HatType[] = ['white', 'red', 'yellow', 'black', 'green', 'blue'];

  let md = `# Six Thinking Hats Workshop Summary\n\n`;
  md += `**Date:** ${dateStr}\n`;
  md += `**Topic:** ${state.topic || 'Untitled Topic'}\n`;
  if (state.expectedOutcome) {
    md += `**Expected Outcome:** ${state.expectedOutcome}\n`;
  }
  md += `\n---\n\n`;

  // 6 Hat Sections
  md += `## 1. Multi-Angle Perspectives\n\n`;
  hats.forEach((hatKey) => {
    const hat = HAT_DEFINITIONS[hatKey];
    const cards = state.cards[hatKey] || [];
    md += `### ${hat.name} (${hat.title})\n`;
    md += `*${hat.summary}*\n\n`;

    if (cards.length === 0) {
      md += `*No items recorded under this hat.*\n\n`;
    } else {
      cards.forEach((card) => {
        let meta = '';
        if (card.metadata?.riskSeverity) {
          meta += ` [${card.metadata.riskSeverity.toUpperCase()} risk]`;
        }
        if (card.metadata?.sentimentTone) {
          meta += ` [Sentiment: ${card.metadata.sentimentTone}]`;
        }
        const voteStr = card.votes > 0 ? ` (+${card.votes} votes)` : '';
        md += `- ${card.content}${meta}${voteStr}\n`;
      });
      md += `\n`;
    }
  });

  // Action Items Section
  md += `---\n\n## 2. Agreed Action Items (Blue Hat Synthesis)\n\n`;
  if (state.actionItems.length === 0) {
    md += `*No action items assigned.*\n\n`;
  } else {
    md += `| Task | Owner | Due Date | Status |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    state.actionItems.forEach((item) => {
      md += `| ${item.task} | ${item.owner || 'Unassigned'} | ${item.dueDate || 'TBD'} | ${item.status.toUpperCase()} |\n`;
    });
    md += `\n`;
  }

  return md;
}

export function downloadMarkdownFile(content: string, filename = 'six-thinking-hats-summary.md') {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

`src/components/workspace/ActionItemTable.tsx`:
```tsx
import React, { useState } from 'react';
import { useWorkshop } from '../../context/WorkshopContext';
import { ActionItem } from '../../types';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const ActionItemTable: React.FC = () => {
  const { state, actions } = useWorkshop();
  const [task, setTask] = useState('');
  const [owner, setOwner] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    actions.addActionItem({
      task: task.trim(),
      owner: owner.trim() || 'Unassigned',
      dueDate: dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      status: 'todo'
    });

    setTask('');
    setOwner('');
    setDueDate('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 4 of 4: Blue Hat Synthesis</span>
          <h3 className="text-xl font-black text-slate-900">Agreed Action Items & Owners</h3>
        </div>
      </div>

      <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New concrete action item..."
          className="sm:col-span-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Owner (e.g. Alex)"
          className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-2 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </form>

      {state.actionItems.length === 0 ? (
        <div className="text-center py-6 text-slate-400 text-xs italic">
          No action items recorded yet. Turn ideas from Yellow/Green/Black into assigned tasks.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                <th className="py-2 px-3">Task</th>
                <th className="py-2 px-3">Owner</th>
                <th className="py-2 px-3">Target Date</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {state.actionItems.map((item: ActionItem) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{item.task}</td>
                  <td className="py-2.5 px-3 text-slate-600">{item.owner}</td>
                  <td className="py-2.5 px-3 text-slate-500">{item.dueDate}</td>
                  <td className="py-2.5 px-3">
                    <button
                      type="button"
                      onClick={() => {
                        const nextStatus = item.status === 'todo' ? 'in_progress' : item.status === 'in_progress' ? 'done' : 'todo';
                        actions.updateActionItem({ ...item, status: nextStatus });
                      }}
                      className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] cursor-pointer ${
                        item.status === 'done'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.status.replace('_', ' ')}
                    </button>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => actions.deleteActionItem(item.id)}
                      className="text-slate-300 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
```

`src/components/workspace/MatrixOverview.tsx`:
```tsx
import React from 'react';
import { useWorkshop } from '../../context/WorkshopContext';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { HatType } from '../../types';
import { generateSessionMarkdown, downloadMarkdownFile } from '../../utils/exportMarkdown';
import { X, Download, Printer } from 'lucide-react';
import { ActionItemTable } from './ActionItemTable';

export const MatrixOverview: React.FC = () => {
  const { state, actions } = useWorkshop();

  if (!state.isMatrixOpen) return null;

  const hats: HatType[] = ['white', 'red', 'yellow', 'black', 'green', 'blue'];

  const handleExport = () => {
    const md = generateSessionMarkdown(state);
    downloadMarkdownFile(md, `six-hats-${(state.topic || 'session').toLowerCase().replace(/\s+/g, '-')}.md`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-7xl max-h-[92vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 3 of 4: Share & Explore</span>
            <h2 className="text-2xl font-black text-slate-900">Six Thinking Hats Matrix Overview</h2>
            <p className="text-xs text-slate-500 mt-0.5">{state.topic || 'Session Topic Overview'}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export Markdown
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / PDF
            </button>

            <button
              type="button"
              onClick={() => actions.toggleMatrix(false)}
              className="p-2 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 6-Column Matrix Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            {hats.map((hatKey) => {
              const hat = HAT_DEFINITIONS[hatKey];
              const cards = state.cards[hatKey] || [];
              return (
                <div
                  key={hatKey}
                  className="rounded-2xl border p-3 flex flex-col justify-between"
                  style={{
                    backgroundColor: hat.bgTint,
                    borderColor: hat.borderColor
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b" style={{ borderColor: hat.borderColor }}>
                      <span className="text-xs font-black" style={{ color: hat.textColor }}>
                        {hat.name}
                      </span>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: hat.primaryColor }}
                      >
                        {cards.length}
                      </span>
                    </div>

                    {cards.length === 0 ? (
                      <div className="text-[11px] text-slate-400 italic py-4 text-center">Empty</div>
                    ) : (
                      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                        {cards.map((c) => (
                          <div key={c.id} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-medium text-slate-800">
                            {c.content}
                            {c.metadata?.riskSeverity && (
                              <span className="block mt-1 text-[9px] font-bold text-rose-600 uppercase">
                                [{c.metadata.riskSeverity} risk]
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Items Component embedded inside Matrix / Synthesis View */}
          <ActionItemTable />
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/exportMarkdown.test.ts`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add src/utils/exportMarkdown.ts src/components/workspace/ActionItemTable.tsx src/components/workspace/MatrixOverview.tsx tests/exportMarkdown.test.ts
git commit -m "feat: implement 6-column matrix overview, action items table, and markdown export engine"
```

---

### Task 9: App Integration, Polish, Sample Scenarios & End-to-End Verification

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Test: `tests/App.test.tsx`

**Interfaces:**
- Consumes: All components from previous tasks (`PlaybookHub`, `WorkspaceHub`, `FacilitatorHUD`, `MatrixOverview`, `WorkshopProvider`)
- Produces: Integrated top-level web app with smooth tab navigation, print styles, and verification tests.

- [ ] **Step 1: Write failing full-app integration test**

`tests/App.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('App Integration', () => {
  it('allows navigating between Playbook Hub and Live Workspace', () => {
    render(<App />);

    expect(screen.getByText('Six Thinking Hats Playbook')).toBeInTheDocument();

    // Click Workspace Tab in Top Nav
    const workspaceTab = screen.getByRole('button', { name: /live workspace/i });
    fireEvent.click(workspaceTab);

    expect(screen.getByText(/step 1 of 4: setup/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/App.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement top-level App shell with tab switcher and full features**

`src/App.tsx`:
```tsx
import React from 'react';
import { WorkshopProvider, useWorkshop } from './context/WorkshopContext';
import { PlaybookHub } from './components/playbook/PlaybookHub';
import { WorkspaceHub } from './components/workspace/WorkspaceHub';
import { FacilitatorHUD } from './components/workspace/FacilitatorHUD';
import { MatrixOverview } from './components/workspace/MatrixOverview';
import { BookOpen, Sparkles, LayoutGrid } from 'lucide-react';

function AppContent() {
  const { state, actions } = useWorkshop();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-3 no-print">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
              6H
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-sm sm:text-base leading-none">
                Six Thinking Hats Facilitator
              </h1>
              <span className="text-[11px] text-slate-500 font-medium">Parallel Thinking & Daily Work Playbook</span>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => actions.setViewMode('playbook')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                state.viewMode === 'playbook'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              Playbook & Guide
            </button>

            <button
              type="button"
              onClick={() => actions.setViewMode('workspace')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                state.viewMode === 'workspace'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Live Workspace
            </button>
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 pb-24">
        {state.viewMode === 'playbook' ? (
          <PlaybookHub onLaunchWorkspace={() => actions.setViewMode('workspace')} />
        ) : (
          <WorkspaceHub />
        )}
      </main>

      {/* Facilitator HUD when in Workspace */}
      {state.viewMode === 'workspace' && <FacilitatorHUD />}

      {/* Matrix Synthesis Modal */}
      <MatrixOverview />
    </div>
  );
}

export default function App() {
  return (
    <WorkshopProvider>
      <AppContent />
    </WorkshopProvider>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/App.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 5: Run full test suite and verify build**

Run: `npx vitest run`
Expected: All tests pass (10+ tests)
Run: `npm run build`
Expected: Clean build with zero TypeScript errors

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx tests/App.test.tsx
git commit -m "feat: complete application shell integration, verified build and full test suite"
```
