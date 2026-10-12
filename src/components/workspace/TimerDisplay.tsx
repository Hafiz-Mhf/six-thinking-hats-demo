import React, { useEffect, useRef } from 'react';
import { useWorkshop } from '../../context/WorkshopContext';
import { formatSeconds, getTimerStatus } from '../../utils/timer';
import { soundEngine } from '../../utils/audio';
import { Play, Pause, Plus, RotateCcw } from 'lucide-react';

export const TimerDisplay: React.FC = () => {
  const { state, actions } = useWorkshop();
  const { secondsRemaining, isRunning, presetSeconds } = state.timer;
  const status = getTimerStatus(secondsRemaining, presetSeconds);
  const prevRemaining = useRef(secondsRemaining);

  useEffect(() => {
    if (isRunning && secondsRemaining === 0 && prevRemaining.current > 0) {
      soundEngine.playChime('finish');
    } else if (isRunning && secondsRemaining === 30 && prevRemaining.current > 30) {
      soundEngine.playChime('warning');
    }
    prevRemaining.current = secondsRemaining;
  }, [secondsRemaining, isRunning]);

  const percentage = Math.min(100, Math.max(0, (secondsRemaining / (presetSeconds || 180)) * 100));

  return (
    <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
      <div className="flex flex-col items-center">
        <div
          className={`font-mono font-black text-xl px-3 py-1 rounded-lg transition-colors ${
            status === 'critical'
              ? 'bg-rose-100 text-rose-700 animate-pulse'
              : status === 'warning'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-slate-100 text-slate-800'
          }`}
        >
          {formatSeconds(secondsRemaining)}
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1 rounded-full mt-1 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              status === 'critical' ? 'bg-rose-500' : status === 'warning' ? 'bg-amber-500' : 'bg-blue-600'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => actions.toggleTimer()}
          aria-label={isRunning ? 'Pause Timer' : 'Start Timer'}
          className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white transition-colors cursor-pointer"
        >
          {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
        </button>

        <button
          type="button"
          onClick={() => actions.addTimerSeconds(60)}
          title="Add 60 seconds (Hot key: T)"
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-xs font-bold"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => actions.setTimerSeconds(presetSeconds)}
          title="Reset timer to preset"
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
