import React from 'react';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { useWorkshop } from '../../context/WorkshopContext';
import { AlertCircle } from 'lucide-react';

export const HatHeader: React.FC = () => {
  const { state } = useWorkshop();
  const currentHat = HAT_DEFINITIONS[state.activeHat];

  return (
    <div
      className="p-6 rounded-2xl border-2 transition-all shadow-sm"
      style={{
        backgroundColor: currentHat.bgTint,
        borderColor: currentHat.borderColor
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-xs text-lg"
            style={{ backgroundColor: currentHat.primaryColor }}
          >
            {state.activeHat.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Hat</span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: currentHat.primaryColor }}
              >
                {currentHat.name}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">{currentHat.title}</h2>
          </div>
        </div>

        {/* Golden Rule Pill */}
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs max-w-md">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="text-slate-800">{currentHat.goldenRule}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/60">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Guiding Prompt for Room</span>
        <p className="text-lg font-bold text-slate-800 mt-0.5">"{currentHat.question}"</p>
      </div>
    </div>
  );
};
