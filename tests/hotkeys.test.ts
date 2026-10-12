import { describe, it, expect, vi } from 'vitest';
import { handleHotkeyDown } from '../src/hooks/useFacilitatorHotkeys';

describe('Facilitator Hotkey Engine', () => {
  it('switches hats 1-6 when pressed outside input fields', () => {
    const onSwitchHat = vi.fn();
    const event = {
      key: '2',
      target: { tagName: 'DIV' },
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent;

    handleHotkeyDown(event, { onSwitchHat, onToggleTimer: vi.fn(), onAddTimer: vi.fn(), onFocusInput: vi.fn(), onToggleMatrix: vi.fn() });
    expect(onSwitchHat).toHaveBeenCalledWith('red');
  });

  it('ignores hotkeys if the user is typing in an INPUT element', () => {
    const onSwitchHat = vi.fn();
    const event = {
      key: '2',
      target: { tagName: 'INPUT' },
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent;

    handleHotkeyDown(event, { onSwitchHat, onToggleTimer: vi.fn(), onAddTimer: vi.fn(), onFocusInput: vi.fn(), onToggleMatrix: vi.fn() });
    expect(onSwitchHat).not.toHaveBeenCalled();
  });
});
