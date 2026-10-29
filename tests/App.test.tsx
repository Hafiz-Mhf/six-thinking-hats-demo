import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Dual-Framework Visual App', () => {
  it('renders top visual stage buttons and allows navigating between the 3 stages', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /1\. Find Your Brain/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /2\. Where & When to Apply/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /3\. Six Hats Simulator/i })).toBeInTheDocument();

    // Click Where & When stage
    const whereBtn = screen.getByRole('button', { name: /2\. Where & When to Apply/i });
    fireEvent.click(whereBtn);

    expect(screen.getByText(/Natural Style vs\. Meeting Hat/i)).toBeInTheDocument();

    // Click Simulator stage
    const simBtn = screen.getByRole('button', { name: /six hats simulator/i });
    fireEvent.click(simBtn);

    expect(screen.getByText(/4-Brain Parallel Meeting Simulator/i)).toBeInTheDocument();
  });
});
