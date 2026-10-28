import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WhenWhereModule } from '../src/components/modules/WhenWhereModule';

describe('WhenWhereModule Component', () => {
  it('renders workplace scenarios and updates visual translation tips', () => {
    render(<WhenWhereModule />);

    expect(screen.getByText(/When & Where to Apply/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Code Review & PR Disagreements/i).length).toBeGreaterThan(0);

    // Click Incident Post-Mortem Scenario
    const postMortemBtn = screen.getByRole('button', { name: /Production Incident Post-Mortem/i });
    fireEvent.click(postMortemBtn);

    expect(screen.getByText(/Gives White Hat full data time, Red Hat emotional release/i)).toBeInTheDocument();
  });
});
