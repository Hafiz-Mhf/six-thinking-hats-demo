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
