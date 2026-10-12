import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('App Integration', () => {
  it('allows navigating between Playbook Hub and Live Workspace', () => {
    render(<App />);

    expect(screen.getByText('Six Thinking Hats Playbook')).toBeInTheDocument();

    // Click Workspace Tab in Top Nav
    const workspaceTab = screen.getByRole('button', { name: /live workspace/i });
    fireEvent.click(workspaceTab);

    expect(screen.getByText(/step 1 of 4: setup/i)).toBeInTheDocument();
  });
});
