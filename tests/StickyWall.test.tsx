import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkshopProvider } from '../src/context/WorkshopContext';
import { StickyWall } from '../src/components/workspace/StickyWall';

describe('StickyWall Component', () => {
  it('adds a card under active hat with content and metadata', () => {
    render(
      <WorkshopProvider>
        <StickyWall />
      </WorkshopProvider>
    );

    const input = screen.getByPlaceholderText(/type a thought/i);
    fireEvent.change(input, { target: { value: 'Critical vulnerability in cache' } });

    const submitBtn = screen.getByRole('button', { name: /add note/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Critical vulnerability in cache')).toBeInTheDocument();
  });
});
