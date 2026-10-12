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
