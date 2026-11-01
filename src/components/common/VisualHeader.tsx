import { Printer } from 'lucide-react';

export type StageId = 'finder' | 'when-where' | 'simulator';

export const VisualHeader = ({
  activeStage,
  onSelectStage
}: {
  activeStage: StageId;
  onSelectStage: (stage: StageId) => void;
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 no-print">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
            CB×6H
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-sm sm:text-base leading-none">
              Colored Brain & Six Thinking Hats
            </h1>
            <span className="text-[11px] text-slate-500 font-medium">Interactive Visual Team Guide</span>
          </div>
        </div>

        {/* 3 Stage Navigation Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => onSelectStage('finder')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeStage === 'finder'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🧠 1. Find Your Brain
          </button>

          <button
            type="button"
            onClick={() => onSelectStage('when-where')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeStage === 'when-where'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🗺️ 2. Where & When to Apply
          </button>

          <button
            type="button"
            onClick={() => onSelectStage('simulator')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeStage === 'simulator'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎩 3. Six Hats Simulator
          </button>
        </div>

        {/* Quick Print Handout Button */}
        <button
          type="button"
          onClick={() => window.print()}
          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Print Cheat Sheet</span>
        </button>
      </div>
    </header>
  );
};
