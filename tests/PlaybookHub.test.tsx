import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkshopProvider } from '../src/context/WorkshopContext';
import { PlaybookHub } from '../src/components/playbook/PlaybookHub';

describe('PlaybookHub Component', () => {
  it('renders all 6 thinking hats and switches selected hat details', () => {
    render(
      <WorkshopProvider>
        <PlaybookHub onLaunchWorkspace={() => {}} />
      </WorkshopProvider>
    );

    expect(screen.getByText('Six Thinking Hats Playbook')).toBeInTheDocument();
    expect(screen.getAllByText('Facts & Information').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Emotions & Intuition').length).toBeGreaterThan(0);

    // Click Red Hat
    const redHatButton = screen.getByTestId('hat-select-red');
    fireEvent.click(redHatButton);

    expect(screen.getByText(/What is your immediate gut reaction/i)).toBeInTheDocument();
    expect(screen.getByText(/Never explain or defend your feelings/i)).toBeInTheDocument();
  });

  it('renders daily work recipes and launches workspace', () => {
    let launched = false;
    render(
      <WorkshopProvider>
        <PlaybookHub onLaunchWorkspace={() => { launched = true; }} />
      </WorkshopProvider>
    );

    const recipeCard = screen.getByText('Quick Standup Dilemma');
    expect(recipeCard).toBeInTheDocument();

    const launchButton = screen.getAllByRole('button', { name: /run this meeting/i })[0];
    fireEvent.click(launchButton);
    expect(launched).toBe(true);
  });
});
