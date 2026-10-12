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
