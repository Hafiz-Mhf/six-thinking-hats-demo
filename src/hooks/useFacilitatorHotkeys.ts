import { useEffect } from 'react';
import { HatType } from '../types';

interface HotkeyCallbacks {
  onSwitchHat: (hat: HatType) => void;
  onToggleTimer: () => void;
  onAddTimer: (sec: number) => void;
  onFocusInput: () => void;
  onToggleMatrix: () => void;
}

const HAT_KEY_MAP: Record<string, HatType> = {
  '1': 'white',
  '2': 'red',
  '3': 'yellow',
  '4': 'black',
  '5': 'green',
  '6': 'blue'
};

export function handleHotkeyDown(e: KeyboardEvent, callbacks: HotkeyCallbacks) {
  const target = e.target as HTMLElement | null;
  const tagName = target?.tagName;

  // Ignore if user is currently inside text inputs or textareas
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
    return;
  }

  if (HAT_KEY_MAP[e.key]) {
    e.preventDefault();
    callbacks.onSwitchHat(HAT_KEY_MAP[e.key]);
    return;
  }

  if (e.code === 'Space') {
    e.preventDefault();
    callbacks.onToggleTimer();
    return;
  }

  if (e.key === 't' || e.key === 'T') {
    e.preventDefault();
    callbacks.onAddTimer(60);
    return;
  }

  if (e.key === 'n' || e.key === 'N') {
    e.preventDefault();
    callbacks.onFocusInput();
    return;
  }

  if (e.key === 'm' || e.key === 'M') {
    e.preventDefault();
    callbacks.onToggleMatrix();
    return;
  }
}

export function useFacilitatorHotkeys(callbacks: HotkeyCallbacks) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => handleHotkeyDown(e, callbacks);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [callbacks]);
}
