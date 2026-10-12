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
