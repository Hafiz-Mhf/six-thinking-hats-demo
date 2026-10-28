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
