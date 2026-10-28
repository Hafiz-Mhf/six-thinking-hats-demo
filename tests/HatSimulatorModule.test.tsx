import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HatSimulatorModule } from '../src/components/modules/HatSimulatorModule';

describe('HatSimulatorModule Component', () => {
  it('allows switching hats and displays avatars wearing the active hat', () => {
    render(<HatSimulatorModule />);

    expect(screen.getByText(/4-Brain Parallel Meeting Simulator/i)).toBeInTheDocument();
    expect(screen.getByText(/Alex \(Purple\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Ryan \(Red\)/i)).toBeInTheDocument();

    // Click Green Hat Button
    const greenHatBtn = screen.getByTestId('sim-hat-green');
    fireEvent.click(greenHatBtn);

    expect(screen.getByText(/Green Hat Mode/i)).toBeInTheDocument();
    expect(screen.getByText(/Zero criticism allowed/i)).toBeInTheDocument();
  });
});
