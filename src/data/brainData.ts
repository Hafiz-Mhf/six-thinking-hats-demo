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
    summary: 'Likes details and facts. Reads background info before making decisions.',
    superpower: 'Detail & Context Finder (Uncovers background facts and root causes)',
    kryptonite: 'Being rushed to decide without info or background',
    communicationTip: 'Share the background info and give them time to read first.'
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
    summary: 'Likes clear steps and action. Wants 1-2-3 plans, clear owners, and quick progress.',
    superpower: 'Action Driver (Turns confusion into clear next steps)',
    kryptonite: 'Long rambling meetings with no clear action items',
    communicationTip: 'Get straight to the point. Use bullet points and clear deadlines.'
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
    summary: 'Likes big picture ideas. Thinks creatively and makes unexpected connections.',
    superpower: 'Creative Problem Solver (Brings fresh, out-of-the-box ideas)',
    kryptonite: 'Strict micromanagement and rigid red tape',
    communicationTip: 'Give them space to share ideas before judging them.'
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
    summary: 'Likes empathy and team harmony. Focuses on people, morale, and how others feel.',
    superpower: 'People & Morale Anchor (Brings empathy and keeps the team united)',
    kryptonite: 'Cold arguments with no psychological safety',
    communicationTip: 'Acknowledge feelings and team morale before diving into tasks.'
  }
};

export const DIAGNOSTIC_SCENARIOS: DiagnosticScenario[] = [
  {
    id: 'prod-incident',
    title: 'Scenario 1: Urgent Team Crisis!',
    subtitle: 'An unexpected problem hits your project right before a deadline. What is your first instinct?',
    iconName: 'AlertTriangle',
    options: [
      {
        color: 'purple',
        label: 'Gather facts and history',
        subtext: 'Check what happened and find the root cause before acting.'
      },
      {
        color: 'red',
        label: 'Take immediate action',
        subtext: 'Follow step 1, 2, 3 to fix the issue and assign tasks right away.'
      },
      {
        color: 'green',
        label: 'Try a fresh workaround',
        subtext: 'Come up with 2 or 3 quick ideas to bypass the roadblock.'
      },
      {
        color: 'blue',
        label: 'Check on the team',
        subtext: 'Make sure people are calm, supported, and not burning out.'
      }
    ]
  },
  {
    id: 'spec-review',
    title: 'Scenario 2: Getting a 20-Page Proposal',
    subtitle: 'Management shares a long strategic plan. How do you approach it?',
    iconName: 'FileText',
    options: [
      {
        color: 'purple',
        label: 'Read every detail carefully',
        subtext: 'Review the background, data, and supporting evidence.'
      },
      {
        color: 'red',
        label: 'Scan straight for action items',
        subtext: 'What needs to be done, who owns it, and what is the deadline?'
      },
      {
        color: 'green',
        label: 'Skim and think of new ideas',
        subtext: 'Get the main gist, then think of better creative options.'
      },
      {
        color: 'blue',
        label: 'Think about team impact',
        subtext: 'How will this affect our people, morale, and day-to-day culture?'
      }
    ]
  },
  {
    id: 'battery-drain',
    title: 'Scenario 3: What Drains Your Energy Most?',
    subtitle: 'Which workplace situation tires you out and frustrates you the most?',
    iconName: 'BatteryWarning',
    options: [
      {
        color: 'purple',
        label: 'Deciding without facts',
        subtext: 'Being pushed to choose without knowing the background or context.'
      },
      {
        color: 'red',
        label: 'Meetings with no action plan',
        subtext: 'Talking in circles for an hour without deciding next steps.'
      },
      {
        color: 'green',
        label: 'Micromanagement & red tape',
        subtext: 'Having every move restricted with zero creative freedom.'
      },
      {
        color: 'blue',
        label: 'Cold, harsh arguments',
        subtext: 'Ego debates where people get defensive and ignore feelings.'
      }
    ]
  }
];
