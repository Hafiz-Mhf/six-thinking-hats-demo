import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Presentation experience', () => {
  it('keeps the seven-part flow visible and supports interactive concept exploration', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /1 Why/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /2 Brains/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /3 Hats/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /7 Takeaway/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /2 Brains/i }));
    expect(screen.getByText(/Four ways people may prefer to process information/i)).toBeInTheDocument();
    expect(screen.getByText(/reflection tool, not a diagnosis/i)).toBeInTheDocument();

    const greenBrain = screen.getByRole('button', { name: /green brain the ideator/i });
    fireEvent.click(greenBrain);
    expect(screen.getByText(/What else could we try\?/i)).toBeInTheDocument();
    expect(screen.getByText(/use it safely/i)).toBeInTheDocument();
    expect(screen.getByText(/compare all four preferences/i)).toBeInTheDocument();
    fireEvent.keyDown(greenBrain, { key: 'ArrowRight' });
    const blueBrain = screen.getByRole('button', { name: /blue brain the socializer/i });
    expect(blueBrain).toHaveAttribute('aria-pressed', 'true');
    fireEvent.keyDown(blueBrain, { key: 'ArrowLeft' });
    expect(greenBrain).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(screen.getByRole('button', { name: /3 Hats/i }));
    expect(screen.getByText(/Six modes for thinking on purpose/i)).toBeInTheDocument();
    expect(screen.getByText(/One team, one hat/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /4 Connection/i }));
    expect(screen.getByText(/Choose a brain preference/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Choose the thinking you need/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Red Hat, Feelings/i }));
    expect(screen.getByText(/How The Ideator uses the Red Hat/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Red Hat, Feelings/i })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: /Compare how all four brains use this hat/i }));
    expect(screen.getByText(/How each brain preference uses it/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /5 Daily work/i }));
    expect(screen.getByRole('heading', { name: /Use the right tool in daily work/i })).toBeInTheDocument();
    const bossTab = screen.getByRole('tab', { name: /With your boss/i });
    fireEvent.click(bossTab);
    expect(bossTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText(/Colored Brain \+ Six Thinking Hats/i)).toBeInTheDocument();
    expect(screen.getByText(/When a proposal is not landing/i)).toBeInTheDocument();
    expect(screen.getByText(/My recommendation is a six-week pilot/i)).toBeInTheDocument();
    fireEvent.keyDown(bossTab, { key: 'ArrowLeft' });
    expect(screen.getByRole('tab', { name: /With teammates/i })).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(screen.getByRole('button', { name: /6 Example/i }));
    expect(screen.getByText(/The manager-development workshop is not leading to lasting change/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /8 Conclude/i }));
    expect(screen.getByText(/Run a six-week pilot with one manager cohort/i)).toBeInTheDocument();
  });
});
