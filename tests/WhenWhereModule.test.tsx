import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WhenWhereModule } from '../src/components/modules/WhenWhereModule';

describe('WhenWhereModule Component', () => {
  it('renders workplace scenarios and updates visual translation tips', () => {
    render(<WhenWhereModule />);

    expect(screen.getByText(/When & Where to Apply/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Resolving Team Disagreements/i).length).toBeGreaterThan(0);

    // Click Crisis Retro Scenario
    const crisisBtn = screen.getByRole('button', { name: /Handling a Team Crisis Without Blame/i });
    fireEvent.click(crisisBtn);

    expect(screen.getByText(/Gives time for facts \(White\), lets people express feelings safely/i)).toBeInTheDocument();
  });
});
