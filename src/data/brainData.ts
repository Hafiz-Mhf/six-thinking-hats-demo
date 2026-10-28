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
