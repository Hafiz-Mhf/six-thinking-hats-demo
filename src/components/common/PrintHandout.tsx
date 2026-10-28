import { BRAIN_ARCHETYPES } from '../../data/brainData';
import { WORKPLACE_SCENARIOS } from '../../data/workplaceScenarios';
import { BrainColor } from '../../types/brain';

export const PrintHandout = () => {
  const brainColors: BrainColor[] = ['purple', 'red', 'green', 'blue'];

  return (
    <div className="hidden print:block p-8 bg-white text-slate-900 max-w-7xl mx-auto space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-black">Colored Brain & Six Thinking Hats — Team Cheat Sheet</h1>
        <p className="text-sm text-slate-600 mt-1">
          Hardware (Who You Are) + Software (What You Wear Together) for Daily Engineering Flow
        </p>
      </div>

      <div>
        <h2 className="text-lg font-black mb-3">1. The 4 Brain Processors (Hardware)</h2>
        <div className="grid grid-cols-4 gap-3">
          {brainColors.map((c) => {
            const arch = BRAIN_ARCHETYPES[c];
            return (
              <div key={c} className="p-3 rounded-xl border border-slate-300 text-xs space-y-1">
                <span className="font-black text-sm block" style={{ color: arch.textColor }}>
                  {arch.avatarName} ({arch.name})
                </span>
                <p className="font-semibold text-slate-700">{arch.roleTitle}</p>
                <p className="text-[10px] text-slate-500">{arch.superpower}</p>
                <div className="mt-2 pt-1 border-t border-slate-200 text-[10px]">
                  <strong>Talk to me:</strong> {arch.communicationTip}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-black mb-3">2. When & Where to Apply</h2>
        <div className="grid grid-cols-2 gap-3">
          {WORKPLACE_SCENARIOS.map((sc) => (
            <div key={sc.id} className="p-3 rounded-xl border border-slate-300 text-xs">
              <span className="font-bold text-slate-900 block">{sc.title}</span>
              <p className="text-[10px] text-slate-600 mb-1">{sc.oneOnOneTip}</p>
              <div className="text-[10px] font-bold text-emerald-800">
                Sequence: {sc.hatSequence.join(' ➔ ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
