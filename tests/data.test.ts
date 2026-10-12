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
