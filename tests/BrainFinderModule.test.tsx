import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrainFinderModule } from '../src/components/modules/BrainFinderModule';

describe('BrainFinderModule Component', () => {
  it('renders the 3 diagnostic scenarios and computes a result badge', () => {
    render(<BrainFinderModule onComplete={() => {}} />);

    expect(screen.getByText(/Find Your Brain Color in 60s/i)).toBeInTheDocument();
    expect(screen.getByText(/Scenario 1: Production Bug Alert/i)).toBeInTheDocument();

    // Select Red option for all 3 scenarios
    const redOption1 = screen.getByText(/Run the emergency checklist/i).closest('button')!;
    fireEvent.click(redOption1);

    const redOption2 = screen.getByText(/Scan straight for milestones & tasks/i).closest('button')!;
    fireEvent.click(redOption2);

    const redOption3 = screen.getByText(/Unstructured, circular rambling/i).closest('button')!;
    fireEvent.click(redOption3);

    expect(screen.getByText(/The Operator/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Red Brain/i).length).toBeGreaterThan(0);
  });
});
