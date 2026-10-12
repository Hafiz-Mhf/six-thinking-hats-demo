import React from 'react';
import { useWorkshop } from '../../context/WorkshopContext';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { HatType } from '../../types';
import { TimerDisplay } from './TimerDisplay';
import { useFacilitatorHotkeys } from '../../hooks/useFacilitatorHotkeys';
import { LayoutGrid, RotateCcw } from 'lucide-react';

export const FacilitatorHUD: React.FC = () => {
  const { state, actions } = useWorkshop();

  useFacilitatorHotkeys({
    onSwitchHat: (hat) => actions.setActiveHat(hat),
    onToggleTimer: () => actions.toggleTimer(),
    onAddTimer: (sec) => actions.addTimerSeconds(sec),
    onFocusInput: () => {
      document.getElementById('card-input-field')?.focus();
    },
    onToggleMatrix: () => actions.toggleMatrix()
  });

  const hats: HatType[] = ['white', 'red', 'yellow', 'black', 'green', 'blue'];

  return (
    <div className="sticky bottom-4 z-40 max-w-5xl mx-auto px-4">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-3">
        {/* Hat Quick Switchers (Hotkeys 1-6) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {hats.map((hatKey, idx) => {
            const hat = HAT_DEFINITIONS[hatKey];
            const isActive = state.activeHat === hatKey;
            return (
              <button
                key={hatKey}
                type="button"
                onClick={() => actions.setActiveHat(hatKey)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive ? 'ring-2 ring-white scale-105 shadow-md' : 'opacity-80 hover:opacity-100 bg-slate-800'
                }`}
                style={{ backgroundColor: isActive ? hat.primaryColor : undefined }}
              >
                <span className="text-[10px] opacity-70">[{idx + 1}]</span>
                <span>{hat.name.replace(' Hat', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Timer Control */}
        <div className="flex items-center gap-2">
          <TimerDisplay />

          <button
            type="button"
            onClick={() => actions.toggleMatrix()}
            className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              state.isMatrixOpen ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Toggle Matrix (Hot key: M)"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Matrix [M]</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset current workshop session? All cards will be cleared.')) {
                actions.resetSession();
              }
            }}
            title="Reset Session"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-rose-900 text-slate-400 hover:text-rose-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
