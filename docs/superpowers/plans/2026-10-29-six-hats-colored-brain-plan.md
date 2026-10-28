# Six Thinking Hats & Colored Brain Interactive Visual Experience — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a visual-first, low-text interactive web application combining Arthur Carmazzi's Colored Brain and Dr. Edward de Bono's Six Thinking Hats to train engineering teams on where, why, and how to apply both tools in everyday work.

**Architecture:** Single-page React 19 + TypeScript + Vite application featuring 3 focused visual stages:
1. **1-Minute Visual "Find Your Brain Color":** A tap-based 3-scenario diagnostic yielding an instant archetype badge with superpowers and communication tips.
2. **Visual "When & Where to Apply" Matrix:** An interactive heat map mapping 4 engineering scenarios to 1-on-1 Colored Brain communication and group 6-Hat sequences.
3. **4-Brain Parallel Meeting Simulator:** An interactive simulation with 4 avatars (Purple Alex, Red Ryan, Green Chloe, Blue Maya) demonstrating the transition from communication clash to unified parallel thinking, backed by timer chimes and printable A4 cheat sheets.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Web Audio API, Vitest, React Testing Library.

## Global Constraints
- Target platform: Evergreen modern desktop browsers, optimized for 1080p+ meeting room projectors.
- Visual-first / low-text: Replace long text blocks with badges, visual chips, color glows, and avatars.
- Zero external audio assets: Timer sounds must use native browser Web Audio API oscillator synthesis.
- No placeholders: Every interface, data structure, and test must be fully implemented.
- Persistence: Store user selections in `localStorage` under `six_hats_colored_brain_v1`.

---

### Task 1: Domain Data Models & Scenario Fixtures

**Files:**
- Create: `src/types/brain.ts`
- Create: `src/data/brainData.ts`
- Create: `src/data/workplaceScenarios.ts`
- Test: `tests/brainData.test.ts`

**Interfaces:**
- Consumes: None
- Produces: `BrainColor`, `BrainArchetype`, `DiagnosticScenario`, `WorkplaceScenario`, `BRAIN_ARCHETYPES`, `DIAGNOSTIC_SCENARIOS`, `WORKPLACE_SCENARIOS`

- [ ] **Step 1: Write failing unit test for brain data and scenarios**

`tests/brainData.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { BRAIN_ARCHETYPES, DIAGNOSTIC_SCENARIOS } from '../src/data/brainData';
import { WORKPLACE_SCENARIOS } from '../src/data/workplaceScenarios';

describe('Colored Brain & Workplace Scenario Data', () => {
  it('defines all 4 colored brain archetypes with visual tags', () => {
    expect(Object.keys(BRAIN_ARCHETYPES)).toHaveLength(4);
    expect(BRAIN_ARCHETYPES.purple.superpower).toBeDefined();
    expect(BRAIN_ARCHETYPES.red.kryptonite).toBeDefined();
    expect(BRAIN_ARCHETYPES.green.communicationTip).toBeDefined();
    expect(BRAIN_ARCHETYPES.blue.avatarName).toBeDefined();
  });

  it('contains 3 diagnostic scenarios with choices for all 4 colors', () => {
    expect(DIAGNOSTIC_SCENARIOS).toHaveLength(3);
    DIAGNOSTIC_SCENARIOS.forEach(scenario => {
      expect(scenario.options).toHaveLength(4);
    });
  });

  it('contains 4 daily workplace scenarios mapping Colored Brain to Six Hats', () => {
    expect(WORKPLACE_SCENARIOS).toHaveLength(4);
    WORKPLACE_SCENARIOS.forEach(item => {
      expect(item.hatSequence.length).toBeGreaterThanOrEqual(3);
      expect(item.oneOnOneTip).toBeDefined();
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/brainData.test.ts`
Expected: FAIL (Cannot find module)

- [ ] **Step 3: Implement data structures and types**

`src/types/brain.ts`:
```typescript
export type BrainColor = 'purple' | 'red' | 'green' | 'blue';

export interface BrainArchetype {
  id: BrainColor;
  name: string;
  avatarName: string;
  roleTitle: string;
  primaryColor: string;
  bgTint: string;
  borderColor: string;
  textColor: string;
  summary: string;
  superpower: string;
  kryptonite: string;
  communicationTip: string;
}

export interface DiagnosticOption {
  color: BrainColor;
  label: string;
  subtext: string;
}

export interface DiagnosticScenario {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  options: DiagnosticOption[];
}

export interface WorkplaceScenario {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  clashDescription: string;
  oneOnOneTip: string;
  hatSequence: string[];
  whyHatsWork: string;
}
```

`src/data/brainData.ts`:
```typescript
import { BrainArchetype, BrainColor, DiagnosticScenario } from '../types/brain';

export const BRAIN_ARCHETYPES: Record<BrainColor, BrainArchetype> = {
  purple: {
    id: 'purple',
    name: 'Purple Brain',
    avatarName: 'Alex',
    roleTitle: 'The Researcher',
    primaryColor: '#7c3aed',
    bgTint: '#f5f3ff',
    borderColor: '#c4b5fd',
    textColor: '#5b21b6',
    summary: 'Relational & Data-Gathering. Absorbs deep context, reads background, and avoids premature guesses.',
    superpower: 'Root Cause Hunter (Uncovers hidden dependencies & verified facts)',
    kryptonite: 'Being pressured to commit before seeing the data or history',
    communicationTip: 'Give them the documentation, background data, and time to digest first.'
  },
  red: {
    id: 'red',
    name: 'Red Brain',
    avatarName: 'Ryan',
    roleTitle: 'The Operator',
    primaryColor: '#dc2626',
    bgTint: '#fef2f2',
    borderColor: '#fca5a5',
    textColor: '#991b1b',
    summary: 'Linear & Sequential. Needs logical steps (1-2-3), direct structure, and clear action items.',
    superpower: 'Tactical Execution (Organizes chaos into crisp, executable roadmaps)',
    kryptonite: 'Aimless meetings, rambling discussions with no next steps or owner',
    communicationTip: 'Get straight to the point. Use numbered lists, deadlines, and clear steps.'
  },
  green: {
    id: 'green',
    name: 'Green Brain',
    avatarName: 'Chloe',
    roleTitle: 'The Innovator',
    primaryColor: '#16a34a',
    bgTint: '#f0fdf4',
    borderColor: '#86efac',
    textColor: '#166534',
    summary: 'Chaotic & Big Picture. Thinks in spontaneous creative bursts and makes lateral connections.',
    superpower: 'Breakthrough Visionary (Disrupts bottlenecks with out-of-the-box ideas)',
    kryptonite: 'Rigid micromanagement and being forced to follow rigid repetitive steps',
    communicationTip: 'Give them space to brainstorm without immediate critical judgment.'
  },
  blue: {
    id: 'blue',
    name: 'Blue Brain',
    avatarName: 'Maya',
    roleTitle: 'The Empath',
    primaryColor: '#2563eb',
    bgTint: '#eff6ff',
    borderColor: '#93c5fd',
    textColor: '#1e40af',
    summary: 'Intuitive & Emotional. Experiences information through empathy, interpersonal vibes, and gut feel.',
    superpower: 'Team Radar & Purpose Anchor (Reads morale and aligns on the human impact)',
    kryptonite: 'Cold, adversarial arguments with zero psychological safety',
    communicationTip: 'Acknowledge feelings and team impact before diving purely into technicalities.'
  }
};

export const DIAGNOSTIC_SCENARIOS: DiagnosticScenario[] = [
  {
    id: 'prod-incident',
    title: 'Scenario 1: Production Bug Alert!',
    subtitle: 'A critical service throws 500 errors in production. What is your immediate instinct?',
    iconName: 'AlertTriangle',
    options: [
      {
        color: 'purple',
        label: 'Trace the logs & history',
        subtext: 'Inspect telemetry, git blame, and find verified root cause before touching code.'
      },
      {
        color: 'red',
        label: 'Run the emergency checklist',
        subtext: 'Step 1: Rollback. Step 2: Notify stakeholders. Step 3: Hotfix branch.'
      },
      {
        color: 'green',
        label: 'Spontaneously experiment',
        subtext: 'Try 3 creative bypass ideas right now to see if we can circumvent the bottleneck.'
      },
      {
        color: 'blue',
        label: 'Check the team pulse',
        subtext: 'Ensure engineers are calm, roles are supported, and panic is kept at bay.'
      }
    ]
  },
  {
    id: 'spec-review',
    title: 'Scenario 2: Receiving a 20-Page Technical Spec',
    subtitle: 'Product hands over a major architectural proposal for Q1. How do you approach it?',
    iconName: 'FileText',
    options: [
      {
        color: 'purple',
        label: 'Read every footnote & diagram',
        subtext: 'Thoroughly review data contracts, references, and benchmark evidence.'
      },
      {
        color: 'red',
        label: 'Scan straight for milestones & tasks',
        subtext: 'What are the deliverables, who owns what, and what is the exact timeline?'
      },
      {
        color: 'green',
        label: 'Skim the core, invent new alternatives',
        subtext: 'Get the gist, then brainstorm 2 novel architectures that could do it better.'
      },
      {
        color: 'blue',
        label: 'Ask about the customer experience',
        subtext: 'Does this actually delight users? How will this impact team morale to build?'
      }
    ]
  },
  {
    id: 'battery-drain',
    title: 'Scenario 3: What Drains Your Mental Battery Most?',
    subtitle: 'Which workplace situation causes you the most frustration and fatigue?',
    iconName: 'BatteryWarning',
    options: [
      {
        color: 'purple',
        label: 'Being forced to decide without data',
        subtext: 'Pressure to commit while blind to background context and historical facts.'
      },
      {
        color: 'red',
        label: 'Unstructured, circular rambling',
        subtext: 'Hour-long meetings where people talk in circles without establishing next steps.'
      },
      {
        color: 'green',
        label: 'Rigid micromanagement & bureaucracy',
        subtext: 'Being constrained by strict step-by-step red tape with zero creative leeway.'
      },
      {
        color: 'blue',
        label: 'Cold, adversarial arguments',
        subtext: 'Ego-driven debates where people are defensive and nobody listens with empathy.'
      }
    ]
  }
];
```

`src/data/workplaceScenarios.ts`:
```typescript
import { WorkplaceScenario } from '../types/brain';

export const WORKPLACE_SCENARIOS: WorkplaceScenario[] = [
  {
    id: 'code-review',
    title: 'Code Review & PR Disagreements',
    tagline: 'When two senior developers debate an architectural approach on GitHub',
    iconName: 'GitPullRequest',
    clashDescription: 'Green suggests an unorthodox pattern; Red demands standard step-by-step conventions; Purple demands historical benchmarks; Blue feels targeted by curt review comments.',
    oneOnOneTip: 'If giving feedback to Red, use 1-2-3 action points. If giving feedback to Green, praise the innovation before evaluating. If reviewing Purple, provide benchmark references.',
    hatSequence: ['White (Facts/Metrics)', 'Yellow (Upside of Pattern)', 'Black (Failure Modes/Risks)', 'Blue (Final Merge Agreement)'],
    whyHatsWork: 'Separates finding the advantages (Yellow) from testing risks (Black), so neither author feels personally attacked.'
  },
  {
    id: 'incident-retro',
    title: 'Production Incident Post-Mortem',
    tagline: 'Reviewing a multi-hour outage without pointing fingers',
    iconName: 'AlertOctagon',
    clashDescription: 'Purple wants to stay in log-diving forever; Red wants immediate rules; Blue worries about blaming engineers; Green gets distracted proposing futuristic rewrites.',
    oneOnOneTip: 'Validate Blue’s emotional safety first so engineers speak honestly without fear of reprimand.',
    hatSequence: ['Blue (Agenda)', 'White (Timeline & Facts)', 'Red (Raw 60s Gut Reactions)', 'Black (Root Flaws & Gaps)', 'Green (Countermeasures)', 'Blue (Action Items)'],
    whyHatsWork: 'Gives White Hat full data time, Red Hat emotional release, and finishes in Red Brain’s dream: a concrete 1-2-3 prevention plan.'
  },
  {
    id: 'sprint-planning',
    title: 'New Feature Brainstorm & Planning',
    tagline: 'Kicking off a quarterly roadmap initiative with product and design',
    iconName: 'Sparkles',
    clashDescription: 'Green wants to build revolutionary features; Red demands scope cuts to hit dates; Purple questions market validation; Blue worries about developer burnout.',
    oneOnOneTip: 'Frame conversations with Green around possibilities, but translate their outputs into sequential phases for Red.',
    hatSequence: ['Blue (Goal)', 'White (Customer Data)', 'Green (Wild Ideas)', 'Yellow (Feasibility)', 'Black (Technical Debt)', 'Blue (Sprint Scope)'],
    whyHatsWork: 'Stops Red and Black from shooting down Green’s ideas before they are even developed.'
  },
  {
    id: 'one-on-one',
    title: '1-on-1 Delegation & Career Feedback',
    tagline: 'Aligning a manager and team member on performance and goals',
    iconName: 'UserCheck',
    clashDescription: 'A Red manager dumping quick tasks on a Purple engineer causes anxiety; a Purple manager inundating a Green engineer with docs causes stagnation.',
    oneOnOneTip: 'Always speak the receiver’s brain language. Package your intent in their processor format.',
    hatSequence: ['Blue (Meeting Purpose)', 'Red (Mutual Gut Check)', 'Yellow (Strengths & Wins)', 'White (Objective Milestones)', 'Blue (Next Steps)'],
    whyHatsWork: 'Builds psychological trust before establishing accountability metrics.'
  }
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/brainData.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/types/brain.ts src/data/brainData.ts src/data/workplaceScenarios.ts tests/brainData.test.ts
git commit -m "feat: define colored brain archetypes, diagnostic scenarios, and workplace fixtures"
```

---

### Task 2: Module 1 — Interactive "Find Your Brain Color" Diagnostic

**Files:**
- Create: `src/components/visual/BrainAvatar.tsx`
- Create: `src/components/modules/BrainFinderModule.tsx`
- Test: `tests/BrainFinderModule.test.tsx`

**Interfaces:**
- Consumes: `BRAIN_ARCHETYPES`, `DIAGNOSTIC_SCENARIOS`, `BrainColor`
- Produces: `BrainFinderModule` component with 3 scenario choices, instant badge reveal, and interactive archetype inspector.

- [ ] **Step 1: Write failing unit test for BrainFinderModule**

`tests/BrainFinderModule.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrainFinderModule } from '../src/components/modules/BrainFinderModule';

describe('BrainFinderModule Component', () => {
  it('renders the 3 diagnostic scenarios and computes a result badge', () => {
    render(<BrainFinderModule onComplete={() => {}} />);

    expect(screen.getByText(/Find Your Brain Color in 60s/i)).toBeInTheDocument();
    expect(screen.getByText(/Scenario 1: Production Bug Alert/i)).toBeInTheDocument();

    // Select Red option for all 3 scenarios
    const redOption1 = screen.getByText(/Run the emergency checklist/i);
    fireEvent.click(redOption1);

    const redOption2 = screen.getByText(/Scan straight for milestones & tasks/i);
    fireEvent.click(redOption2);

    const redOption3 = screen.getByText(/Unstructured, circular rambling/i);
    fireEvent.click(redOption3);

    // Should display Red Brain result badge
    expect(screen.getByText(/The Tactical Driver/i)).toBeInTheDocument();
    expect(screen.getByText(/Red Brain/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/BrainFinderModule.test.tsx`
Expected: FAIL (Cannot find module)

- [ ] **Step 3: Implement BrainAvatar and BrainFinderModule**

`src/components/visual/BrainAvatar.tsx`:
```tsx
import React from 'react';
import { BrainColor } from '../../types/brain';
import { BRAIN_ARCHETYPES } from '../../data/brainData';
import { Search, ListOrdered, Zap, Heart } from 'lucide-react';

export const BrainAvatar: React.FC<{
  color: BrainColor;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}> = ({ color, size = 'md', showLabel = true }) => {
  const archetype = BRAIN_ARCHETYPES[color];

  const getIcon = () => {
    switch (color) {
      case 'purple':
        return <Search className="w-1/2 h-1/2" />;
      case 'red':
        return <ListOrdered className="w-1/2 h-1/2" />;
      case 'green':
        return <Zap className="w-1/2 h-1/2" />;
      case 'blue':
        return <Heart className="w-1/2 h-1/2" />;
    }
  };

  const dimClass = size === 'lg' ? 'w-16 h-16 text-2xl' : size === 'sm' ? 'w-8 h-8 text-xs' : 'w-12 h-12 text-base';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`${dimClass} rounded-2xl flex items-center justify-center text-white shadow-md transition-transform hover:scale-105`}
        style={{
          backgroundColor: archetype.primaryColor,
          boxShadow: `0 8px 20px -4px ${archetype.primaryColor}50`
        }}
      >
        {getIcon()}
      </div>
      {showLabel && (
        <span className="text-xs font-black tracking-tight" style={{ color: archetype.textColor }}>
          {archetype.avatarName} ({archetype.name.replace(' Brain', '')})
        </span>
      )}
    </div>
  );
};
```

`src/components/modules/BrainFinderModule.tsx`:
```tsx
import React, { useState } from 'react';
import { BrainColor } from '../../types/brain';
import { BRAIN_ARCHETYPES, DIAGNOSTIC_SCENARIOS } from '../../data/brainData';
import { BrainAvatar } from '../visual/BrainAvatar';
import { Sparkles, CheckCircle2, AlertOctagon, MessageSquare, ArrowRight, RotateCcw } from 'lucide-react';

export const BrainFinderModule: React.FC<{ onComplete?: (color: BrainColor) => void }> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, BrainColor>>({});
  const [inspectedColor, setInspectedColor] = useState<BrainColor | null>(null);

  const handleSelectOption = (scenarioId: string, color: BrainColor) => {
    const updated = { ...answers, [scenarioId]: color };
    setAnswers(updated);

    if (Object.keys(updated).length === DIAGNOSTIC_SCENARIOS.length) {
      // Calculate dominant color
      const counts: Record<BrainColor, number> = { purple: 0, red: 0, green: 0, blue: 0 };
      Object.values(updated).forEach((c) => counts[c]++);
      let dominant: BrainColor = 'red';
      let maxCount = -1;
      (Object.keys(counts) as BrainColor[]).forEach((c) => {
        if (counts[c] > maxCount) {
          maxCount = counts[c];
          dominant = c;
        }
      });
      setInspectedColor(dominant);
      onComplete?.(dominant);
    }
  };

  const isComplete = Object.keys(answers).length === DIAGNOSTIC_SCENARIOS.length;
  const activeColor = inspectedColor || 'red';
  const activeArchetype = BRAIN_ARCHETYPES[activeColor];

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2 px-2">
      {/* Intro Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-800 inline-block">
          Step 1: Self-Awareness
        </span>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Find Your Brain Color in 60s
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Your brain color is your natural hardware wiring. Tap the option that matches your immediate instinct in each situation below:
        </p>
      </div>

      {/* 3 Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DIAGNOSTIC_SCENARIOS.map((scenario, sIdx) => {
          const selected = answers[scenario.id];
          return (
            <div
              key={scenario.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Scenario {sIdx + 1} of 3
                </span>
                <h3 className="font-extrabold text-slate-900 text-base mt-1">{scenario.title}</h3>
                <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed">{scenario.subtitle}</p>

                <div className="space-y-2">
                  {scenario.options.map((opt) => {
                    const isChosen = selected === opt.color;
                    const optArch = BRAIN_ARCHETYPES[opt.color];
                    return (
                      <button
                        key={opt.color}
                        type="button"
                        onClick={() => handleSelectOption(scenario.id, opt.color)}
                        className={`w-full text-left p-3 rounded-xl border transition-all text-xs cursor-pointer flex flex-col ${
                          isChosen
                            ? 'ring-2 font-bold shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                        style={{
                          backgroundColor: isChosen ? optArch.bgTint : undefined,
                          borderColor: isChosen ? optArch.primaryColor : undefined,
                          color: isChosen ? optArch.textColor : undefined,
                          outlineColor: optArch.primaryColor
                        }}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold">{opt.label}</span>
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: optArch.primaryColor }}
                          />
                        </div>
                        <span className="text-[11px] opacity-80 leading-normal">{opt.subtext}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result Badge & Archetype Inspector */}
      {isComplete && (
        <div
          className="p-6 sm:p-8 rounded-3xl border-2 shadow-lg transition-all animate-fadeIn"
          style={{
            backgroundColor: activeArchetype.bgTint,
            borderColor: activeArchetype.borderColor
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-5" style={{ borderColor: activeArchetype.borderColor }}>
            <div className="flex items-center gap-4">
              <BrainAvatar color={activeColor} size="lg" showLabel={false} />
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: activeArchetype.primaryColor }}
                >
                  {activeArchetype.name}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {activeArchetype.avatarName} — {activeArchetype.roleTitle}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setInspectedColor(null);
              }}
              className="text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-600 transition-colors cursor-pointer border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Quiz
            </button>
          </div>

          <p className="text-sm font-semibold text-slate-800 mt-4 leading-relaxed">
            {activeArchetype.summary}
          </p>

          {/* 3 Visual Chips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            <div className="p-4 rounded-2xl bg-white/90 border border-emerald-100 shadow-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs uppercase mb-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Superpower
              </div>
              <p className="text-xs font-bold text-slate-800">{activeArchetype.superpower}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-rose-100 shadow-xs">
              <div className="flex items-center gap-1.5 text-rose-700 font-bold text-xs uppercase mb-1">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                Kryptonite / Stress Trigger
              </div>
              <p className="text-xs font-bold text-slate-800">{activeArchetype.kryptonite}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-blue-100 shadow-xs">
              <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase mb-1">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                How to talk to me
              </div>
              <p className="text-xs font-bold text-slate-800">{activeArchetype.communicationTip}</p>
            </div>
          </div>

          {/* Peer Inspector Bar */}
          <div className="mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs" style={{ borderColor: activeArchetype.borderColor }}>
            <span className="font-bold text-slate-500">Inspect other teammates' brain types:</span>
            <div className="flex items-center gap-2">
              {(Object.keys(BRAIN_ARCHETYPES) as BrainColor[]).map((c) => {
                const isCurrent = activeColor === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setInspectedColor(c)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      isCurrent ? 'bg-white shadow-xs ring-2' : 'bg-white/60 hover:bg-white text-slate-600'
                    }`}
                    style={{ outlineColor: BRAIN_ARCHETYPES[c].primaryColor }}
                  >
                    {BRAIN_ARCHETYPES[c].avatarName} ({c.toUpperCase()})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/BrainFinderModule.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add src/components/visual/BrainAvatar.tsx src/components/modules/BrainFinderModule.tsx tests/BrainFinderModule.test.tsx
git commit -m "feat: implement Module 1 BrainFinder visual diagnostic and avatar badges"
```

---

### Task 3: Module 2 — Visual "When & Where to Apply" Matrix

**Files:**
- Create: `src/components/visual/HardwareSoftwareGraphic.tsx`
- Create: `src/components/modules/WhenWhereModule.tsx`
- Test: `tests/WhenWhereModule.test.tsx`

**Interfaces:**
- Consumes: `WORKPLACE_SCENARIOS`, `BRAIN_ARCHETYPES`
- Produces: `WhenWhereModule` allowing interactive scenario inspection with visual Colored Brain vs. Six Hats breakdown.

- [ ] **Step 1: Write failing unit test for WhenWhereModule**

`tests/WhenWhereModule.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WhenWhereModule } from '../src/components/modules/WhenWhereModule';

describe('WhenWhereModule Component', () => {
  it('renders workplace scenarios and updates visual translation tips', () => {
    render(<WhenWhereModule />);

    expect(screen.getByText(/When & Where to Apply/i)).toBeInTheDocument();
    expect(screen.getByText(/Code Review & PR Disagreements/i)).toBeInTheDocument();

    // Click Incident Post-Mortem Scenario
    const postMortemBtn = screen.getByText(/Production Incident Post-Mortem/i);
    fireEvent.click(postMortemBtn);

    expect(screen.getByText(/Gives White Hat full data time, Red Hat emotional release/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/WhenWhereModule.test.tsx`
Expected: FAIL (Cannot find module)

- [ ] **Step 3: Implement HardwareSoftwareGraphic and WhenWhereModule**

`src/components/visual/HardwareSoftwareGraphic.tsx`:
```tsx
import React from 'react';
import { Cpu, Layers, ArrowRight } from 'lucide-react';

export const HardwareSoftwareGraphic: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="max-w-3xl mx-auto text-center space-y-2 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">The Core Mental Model</span>
        <h3 className="text-2xl sm:text-3xl font-black">Hardware vs. Software</h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Why understanding the distinction between your brain and the hats changes everything:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hardware */}
        <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-bold mb-2 text-sm">
              <Cpu className="w-5 h-5" />
              Colored Brain = Your Hardware (Who You Are)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Your genetic, default way of taking in information. Unconscious and stable. Explains why team members naturally clash when communicating 1-on-1.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/40 text-[11px] font-bold text-purple-200">
            👉 Rule: Adapt your language to match their hardware processor.
          </div>
        </div>

        {/* Software */}
        <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2 text-sm">
              <Layers className="w-5 h-5" />
              Six Thinking Hats = Your Software (What You Wear)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Deliberate, temporary mental operating modes. Fluid and conscious. Aligns all 4 brain processors to look in the exact same direction at the same time.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-[11px] font-bold text-emerald-200">
            👉 Rule: Switch hats together to eliminate adversarial arguments.
          </div>
        </div>
      </div>
    </div>
  );
};
```

`src/components/modules/WhenWhereModule.tsx`:
```tsx
import React, { useState } from 'react';
import { WORKPLACE_SCENARIOS } from '../../data/workplaceScenarios';
import { HardwareSoftwareGraphic } from '../visual/HardwareSoftwareGraphic';
import { GitPullRequest, AlertOctagon, Sparkles, UserCheck, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';

export const WhenWhereModule: React.FC = () => {
  const [selectedId, setSelectedId] = useState(WORKPLACE_SCENARIOS[0].id);

  const activeScenario = WORKPLACE_SCENARIOS.find((s) => s.id === selectedId) || WORKPLACE_SCENARIOS[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'GitPullRequest':
        return <GitPullRequest className="w-4 h-4" />;
      case 'AlertOctagon':
        return <AlertOctagon className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'UserCheck':
        return <UserCheck className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2 px-2">
      {/* Intro Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 inline-block">
          Step 2: Practical Application
        </span>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          When & Where to Apply at Work
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          How to translate 1-on-1 conversations using Colored Brain, and orchestrate group meetings using Six Thinking Hats:
        </p>
      </div>

      {/* Hardware vs Software Bridge Graphic */}
      <HardwareSoftwareGraphic />

      {/* Scenario Tabs Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {WORKPLACE_SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedId;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => setSelectedId(sc.id)}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md scale-102'
                    : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                }`}
              >
                {getIcon(sc.iconName)}
                <span>{sc.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Scenario Deep-Dive Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Active Workplace Case</span>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{activeScenario.title}</h3>
            <p className="text-xs text-slate-500 font-medium">{activeScenario.tagline}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1-on-1 Colored Brain View */}
            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200/60 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block mb-1">
                  1-on-1: Colored Brain in Action
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm mb-2">The Natural Friction Point:</h4>
                <p className="text-xs text-slate-700 leading-relaxed mb-4">{activeScenario.clashDescription}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-purple-200 text-xs">
                <strong className="text-purple-800 block mb-0.5 font-bold">💡 How to communicate 1-on-1:</strong>
                <span className="text-slate-700">{activeScenario.oneOnOneTip}</span>
              </div>
            </div>

            {/* Group Six Hats View */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  Group Alignment: Six Hats Sequence
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm mb-2">The Parallel Meeting Flow:</h4>

                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  {activeScenario.hatSequence.map((hat, idx) => (
                    <React.Fragment key={idx}>
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-[11px] font-bold text-emerald-900 shadow-2xs">
                        {hat}
                      </span>
                      {idx < activeScenario.hatSequence.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-slate-300" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs">
                <strong className="text-emerald-800 block mb-0.5 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Why this eliminates ego clashes:
                </strong>
                <span className="text-slate-700">{activeScenario.whyHatsWork}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/WhenWhereModule.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add src/components/visual/HardwareSoftwareGraphic.tsx src/components/modules/WhenWhereModule.tsx tests/WhenWhereModule.test.tsx
git commit -m "feat: implement Module 2 WhenWhereModule and HardwareSoftware graphic"
```

---

### Task 4: Module 3 — 4-Brain Parallel Meeting Simulator & Facilitator Toolbar

**Files:**
- Create: `src/components/modules/HatSimulatorModule.tsx`
- Test: `tests/HatSimulatorModule.test.tsx`

**Interfaces:**
- Consumes: `BRAIN_ARCHETYPES`, `soundEngine`, `formatSeconds`
- Produces: `HatSimulatorModule` featuring 4 avatars wearing the same hat, countdown timer, hotkeys (`1-6`, `Space`), and live note capture.

- [ ] **Step 1: Write failing unit test for HatSimulatorModule**

`tests/HatSimulatorModule.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HatSimulatorModule } from '../src/components/modules/HatSimulatorModule';

describe('HatSimulatorModule Component', () => {
  it('allows switching hats and displays avatars wearing the active hat', () => {
    render(<HatSimulatorModule />);

    expect(screen.getByText(/4-Brain Parallel Meeting Simulator/i)).toBeInTheDocument();
    expect(screen.getByText(/Alex \(Purple\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Ryan \(Red\)/i)).toBeInTheDocument();

    // Click Green Hat Button
    const greenHatBtn = screen.getByTestId('sim-hat-green');
    fireEvent.click(greenHatBtn);

    expect(screen.getByText(/Green Hat Mode/i)).toBeInTheDocument();
    expect(screen.getByText(/Zero criticism allowed/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/HatSimulatorModule.test.tsx`
Expected: FAIL (Cannot find module)

- [ ] **Step 3: Implement HatSimulatorModule**

`src/components/modules/HatSimulatorModule.tsx`:
```tsx
import React, { useState, useEffect } from 'react';
import { BrainColor } from '../../types/brain';
import { BRAIN_ARCHETYPES } from '../../data/brainData';
import { soundEngine } from '../../utils/audio';
import { formatSeconds } from '../../utils/timer';
import { Play, Pause, Plus, Sparkles, CheckCircle2, Shield, Heart, Zap, Search, ListOrdered } from 'lucide-react';

type SimHat = 'white' | 'red' | 'yellow' | 'black' | 'green' | 'blue';

interface HatSpec {
  id: SimHat;
  name: string;
  badge: string;
  color: string;
  bgTint: string;
  borderColor: string;
  question: string;
  rule: string;
  avatarBehaviors: Record<BrainColor, string>;
}

const SIM_HATS: Record<SimHat, HatSpec> = {
  white: {
    id: 'white',
    name: 'White Hat',
    badge: 'Facts & Data',
    color: '#475569',
    bgTint: '#f8fafc',
    borderColor: '#cbd5e1',
    question: 'What are the hard numbers, error logs, and verifiable metrics?',
    rule: 'Only verified facts. No opinions or interpretations allowed.',
    avatarBehaviors: {
      purple: 'Alex feels right at home, sharing log benchmarks and historical telemetry.',
      red: 'Ryan focuses strictly on concrete dates, sprint velocity, and ticket stats.',
      green: 'Chloe grounds her imagination in hard data gaps that need solving.',
      blue: 'Maya shares measurable user engagement and customer survey metrics.'
    }
  },
  red: {
    id: 'red',
    name: 'Red Hat',
    badge: 'Gut & Emotion',
    color: '#dc2626',
    bgTint: '#fef2f2',
    borderColor: '#fca5a5',
    question: 'What is your raw instinct or gut feeling right now? (60 seconds)',
    rule: 'No logic, reasoning, or justification needed. Voice your intuition.',
    avatarBehaviors: {
      purple: 'Alex expresses his hunch without needing to dig through 50 docs first.',
      red: 'Ryan shares his gut feeling on whether this milestone will slip.',
      green: 'Chloe vents her excitement or anxiety without judgment.',
      blue: 'Maya feels totally safe sharing team morale intuition without pushback.'
    }
  },
  yellow: {
    id: 'yellow',
    name: 'Yellow Hat',
    badge: 'Optimism & Value',
    color: '#d97706',
    bgTint: '#fffbeb',
    borderColor: '#fde68a',
    question: 'What are the upside benefits? What is the best-case scenario?',
    rule: 'Constructive optimism. Why could this succeed and create value?',
    avatarBehaviors: {
      purple: 'Alex calculates long-term technical maintainability gains.',
      red: 'Ryan identifies how this streamlines the deployment cycle time.',
      green: 'Chloe highlights exciting new market opportunities unlocked.',
      blue: 'Maya highlights how happy and less stressed the team will be.'
    }
  },
  black: {
    id: 'black',
    name: 'Black Hat',
    badge: 'Caution & Risk',
    color: '#1e293b',
    bgTint: '#f1f5f9',
    borderColor: '#94a3b8',
    question: 'What fatal flaws, security gaps, or costs could break this?',
    rule: 'Objective risk assessment. Challenge the idea, not the person.',
    avatarBehaviors: {
      purple: 'Alex points out database scaling bottlenecks under peak load.',
      red: 'Ryan highlights dependency bottlenecks in the release pipeline.',
      green: 'Chloe stress-tests unorthodox failure modes in edge cases.',
      blue: 'Maya spots human risks: developer on-call burnout and friction.'
    }
  },
  green: {
    id: 'green',
    name: 'Green Hat',
    badge: 'Creativity & Ideas',
    color: '#16a34a',
    bgTint: '#f0fdf4',
    borderColor: '#86efac',
    question: 'What wild alternatives, provocations, or fresh moves can we invent?',
    rule: 'Zero criticism allowed. All wild ideas welcome. "Yes, and..."',
    avatarBehaviors: {
      purple: 'Alex proposes using an emerging vector database pattern.',
      red: 'Ryan invents an automated script to bypass manual releases.',
      green: 'Chloe thrives, sparking 5 radical ideas in 60 seconds.',
      blue: 'Maya proposes a collaborative peer-pairing format for PR reviews.'
    }
  },
  blue: {
    id: 'blue',
    name: 'Blue Hat',
    badge: 'Process & Action',
    color: '#2563eb',
    bgTint: '#eff6ff',
    borderColor: '#93c5fd',
    question: 'What is our decision, and what is the concrete 1-2-3 action plan?',
    rule: 'Synthesize decisions into assigned tasks, owners, and deadlines.',
    avatarBehaviors: {
      purple: 'Alex documents the architecture decision record (ADR).',
      red: 'Ryan rejoices as decisions become a step-by-step checklist with owners.',
      green: 'Chloe agrees on the scope boundaries to prototype next.',
      blue: 'Maya confirms everyone feels aligned, heard, and energized.'
    }
  }
};

export const HatSimulatorModule: React.FC = () => {
  const [activeHat, setActiveHat] = useState<SimHat>('blue');
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [cards, setCards] = useState<Array<{ id: string; hat: SimHat; text: string }>>([
    { id: '1', hat: 'white', text: 'Error rate spiked to 14% at 09:30 UTC' },
    { id: '2', hat: 'green', text: 'Auto-fallback to cached read replicas' }
  ]);
  const [newNote, setNewNote] = useState('');

  const currentHat = SIM_HATS[activeHat];

  // Timer interval
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          soundEngine.playChime('finish');
          setIsTimerRunning(false);
          return 0;
        }
        if (prev === 30) {
          soundEngine.playChime('warning');
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setCards([{ id: `note-${Date.now()}`, hat: activeHat, text: newNote.trim() }, ...cards]);
    setNewNote('');
  };

  const hatsList: SimHat[] = ['white', 'red', 'yellow', 'black', 'green', 'blue'];

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2 px-2">
      {/* Intro Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-blue-800 inline-block">
          Step 3: Team Simulation
        </span>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          4-Brain Parallel Meeting Simulator
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Watch how wearing the SAME hat aligns all 4 Colored Brain processors into harmonious parallel thinking:
        </p>
      </div>

      {/* Hat Selector Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {hatsList.map((hatKey, idx) => {
            const h = SIM_HATS[hatKey];
            const isActive = activeHat === hatKey;
            return (
              <button
                key={hatKey}
                type="button"
                data-testid={`sim-hat-${hatKey}`}
                onClick={() => {
                  setActiveHat(hatKey);
                  setTimerSeconds(hatKey === 'red' ? 60 : 180);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive ? 'ring-2 ring-offset-1 text-white shadow-md scale-102' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
                style={{
                  backgroundColor: isActive ? h.color : undefined,
                  outlineColor: h.color
                }}
              >
                <span className="opacity-70">[{idx + 1}]</span>
                <span>{h.name}</span>
              </button>
            );
          })}
        </div>

        {/* Timer Box */}
        <div className="flex items-center gap-2">
          <div className="font-mono font-black text-base px-3 py-1 rounded-lg bg-slate-100 text-slate-800">
            {formatSeconds(timerSeconds)}
          </div>
          <button
            type="button"
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-2 rounded-xl bg-slate-900 text-white hover:bg-blue-600 transition-colors cursor-pointer"
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
        </div>
      </div>

      {/* Active Hat Banner */}
      <div
        className="p-6 rounded-3xl border-2 transition-all shadow-sm"
        style={{
          backgroundColor: currentHat.bgTint,
          borderColor: currentHat.borderColor
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-xs"
              style={{ backgroundColor: currentHat.color }}
            >
              🎩
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Hat Mode
              </span>
              <h3 className="text-2xl font-black text-slate-900">{currentHat.name} Mode</h3>
            </div>
          </div>

          <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 text-slate-800 shadow-2xs">
            Rule: {currentHat.rule}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/60">
          <p className="text-base font-bold text-slate-800 italic">"{currentHat.question}"</p>
        </div>
      </div>

      {/* The 4 Avatars Co-operating Under the Same Hat */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-700">How the 4 Brain Colors Behave Together Under {currentHat.name}:</h4>
          <span className="text-xs text-slate-400">All 4 processors synchronized</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(BRAIN_ARCHETYPES) as BrainColor[]).map((cKey) => {
            const arch = BRAIN_ARCHETYPES[cKey];
            const behavior = currentHat.avatarBehaviors[cKey];
            return (
              <div
                key={cKey}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                style={{ borderTopWidth: '4px', borderTopColor: currentHat.color }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold" style={{ color: arch.textColor }}>
                      {arch.avatarName} ({arch.name.replace(' Brain', '')})
                    </span>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white"
                      style={{ backgroundColor: currentHat.color }}
                    >
                      Wearing {currentHat.name.replace(' Hat', '')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{behavior}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Card Capture Bar for Facilitator */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h4 className="font-extrabold text-slate-900 text-sm">Capture Your Team's Thoughts Under {currentHat.name}:</h4>
        <form onSubmit={handleAddNote} className="flex gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder={`Type a note voiced by the room under ${currentHat.name}...`}
            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </form>

        {/* Captured Notes Pill Wall */}
        <div className="flex flex-wrap gap-2 pt-2">
          {cards
            .filter((c) => c.hat === activeHat)
            .map((c) => (
              <span
                key={c.id}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold shadow-2xs border"
                style={{
                  backgroundColor: currentHat.bgTint,
                  borderColor: currentHat.borderColor,
                  color: currentHat.color
                }}
              >
                {c.text}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/HatSimulatorModule.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add src/components/modules/HatSimulatorModule.tsx tests/HatSimulatorModule.test.tsx
git commit -m "feat: implement Module 3 HatSimulatorModule with 4 avatar co-operation"
```

---

### Task 5: App Integration, Stage Navigation, Print Handout & Verification

**Files:**
- Create: `src/components/common/VisualHeader.tsx`
- Create: `src/components/common/PrintHandout.tsx`
- Modify: `src/App.tsx`
- Modify: `tests/App.test.tsx`

**Interfaces:**
- Consumes: `BrainFinderModule`, `WhenWhereModule`, `HatSimulatorModule`
- Produces: Integrated top-level visual app with stage switching and printable A4 landscape team summary.

- [ ] **Step 1: Write failing integration test for stage navigation**

`tests/App.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Dual-Framework Visual App', () => {
  it('renders top visual stage buttons and allows navigating between the 3 stages', () => {
    render(<App />);

    expect(screen.getByText(/Find Your Brain/i)).toBeInTheDocument();
    expect(screen.getByText(/Where & When to Apply/i)).toBeInTheDocument();
    expect(screen.getByText(/Six Hats Simulator/i)).toBeInTheDocument();

    // Click Where & When stage
    const whereBtn = screen.getByRole('button', { name: /where & when to apply/i });
    fireEvent.click(whereBtn);

    expect(screen.getByText(/Hardware vs. Software/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/App.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement VisualHeader, PrintHandout, and App shell**

`src/components/common/VisualHeader.tsx`:
```tsx
import React from 'react';
import { Printer } from 'lucide-react';

export type StageId = 'finder' | 'when-where' | 'simulator';

export const VisualHeader: React.FC<{
  activeStage: StageId;
  onSelectStage: (stage: StageId) => void;
}> = ({ activeStage, onSelectStage }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 no-print">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
            CB×6H
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-sm sm:text-base leading-none">
              Colored Brain & Six Thinking Hats
            </h1>
            <span className="text-[11px] text-slate-500 font-medium">Interactive Visual Team Guide</span>
          </div>
        </div>

        {/* 3 Stage Navigation Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => onSelectStage('finder')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeStage === 'finder'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🧠 1. Find Your Brain
          </button>

          <button
            type="button"
            onClick={() => onSelectStage('when-where')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeStage === 'when-where'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🗺️ 2. Where & When to Apply
          </button>

          <button
            type="button"
            onClick={() => onSelectStage('simulator')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeStage === 'simulator'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎩 3. Six Hats Simulator
          </button>
        </div>

        {/* Quick Print Handout Button */}
        <button
          type="button"
          onClick={() => window.print()}
          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Print Cheat Sheet</span>
        </button>
      </div>
    </header>
  );
};
```

`src/components/common/PrintHandout.tsx`:
```tsx
import React from 'react';
import { BRAIN_ARCHETYPES } from '../../data/brainData';
import { WORKPLACE_SCENARIOS } from '../../data/workplaceScenarios';
import { BrainColor } from '../../types/brain';

export const PrintHandout: React.FC = () => {
  const brainColors: BrainColor[] = ['purple', 'red', 'green', 'blue'];

  return (
    <div className="hidden print:block p-8 bg-white text-slate-900 max-w-7xl mx-auto space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-black">Colored Brain & Six Thinking Hats — Team Cheat Sheet</h1>
        <p className="text-sm text-slate-600 mt-1">
          Hardware (Who You Are) + Software (What You Wear Together) for Daily Engineering Flow
        </p>
      </div>

      <div>
        <h2 className="text-lg font-black mb-3">1. The 4 Brain Processors (Hardware)</h2>
        <div className="grid grid-cols-4 gap-3">
          {brainColors.map((c) => {
            const arch = BRAIN_ARCHETYPES[c];
            return (
              <div key={c} className="p-3 rounded-xl border border-slate-300 text-xs space-y-1">
                <span className="font-black text-sm block" style={{ color: arch.textColor }}>
                  {arch.avatarName} ({arch.name})
                </span>
                <p className="font-semibold text-slate-700">{arch.roleTitle}</p>
                <p className="text-[10px] text-slate-500">{arch.superpower}</p>
                <div className="mt-2 pt-1 border-t border-slate-200 text-[10px]">
                  <strong>Talk to me:</strong> {arch.communicationTip}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-black mb-3">2. When & Where to Apply</h2>
        <div className="grid grid-cols-2 gap-3">
          {WORKPLACE_SCENARIOS.map((sc) => (
            <div key={sc.id} className="p-3 rounded-xl border border-slate-300 text-xs">
              <span className="font-bold text-slate-900 block">{sc.title}</span>
              <p className="text-[10px] text-slate-600 mb-1">{sc.oneOnOneTip}</p>
              <div className="text-[10px] font-bold text-emerald-800">
                Sequence: {sc.hatSequence.join(' ➔ ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

`src/App.tsx`:
```tsx
import { useState } from 'react';
import { VisualHeader, StageId } from './components/common/VisualHeader';
import { BrainFinderModule } from './components/modules/BrainFinderModule';
import { WhenWhereModule } from './components/modules/WhenWhereModule';
import { HatSimulatorModule } from './components/modules/HatSimulatorModule';
import { PrintHandout } from './components/common/PrintHandout';

export default function App() {
  const [activeStage, setActiveStage] = useState<StageId>('finder');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <VisualHeader activeStage={activeStage} onSelectStage={setActiveStage} />

      <main className="flex-1 pb-16 no-print">
        {activeStage === 'finder' && (
          <BrainFinderModule onComplete={() => {}} />
        )}

        {activeStage === 'when-where' && (
          <WhenWhereModule />
        )}

        {activeStage === 'simulator' && (
          <HatSimulatorModule />
        )}
      </main>

      {/* Formatted A4 Print Handout */}
      <PrintHandout />
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/App.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 5: Run full test suite and verify build**

Run: `npm test`
Expected: All tests pass
Run: `npm run build`
Expected: Clean build with zero TypeScript errors

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/components/common/ tests/App.test.tsx
git commit -m "feat: complete visual app integration with 3 stages and printable handout"
```
