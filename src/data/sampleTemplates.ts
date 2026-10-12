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
