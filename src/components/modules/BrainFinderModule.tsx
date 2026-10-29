import { useState, useEffect } from 'react';
import { BrainColor } from '../../types/brain';
import { BRAIN_ARCHETYPES, DIAGNOSTIC_SCENARIOS } from '../../data/brainData';
import { BrainAvatar } from '../visual/BrainAvatar';
import { Sparkles, AlertOctagon, MessageSquare, RotateCcw } from 'lucide-react';

export const BrainFinderModule = ({ onComplete }: { onComplete?: (color: BrainColor) => void }) => {
  const [answers, setAnswers] = useState<Record<string, BrainColor>>({});
  const [inspectedColor, setInspectedColor] = useState<BrainColor | null>(null);

  const handleSelectOption = (scenarioId: string, color: BrainColor) => {
    setAnswers((prev) => ({ ...prev, [scenarioId]: color }));
  };

  const isComplete = Object.keys(answers).length === DIAGNOSTIC_SCENARIOS.length;

  const computedDominant: BrainColor = (() => {
    if (!isComplete) return 'red';
    const counts: Record<BrainColor, number> = { purple: 0, red: 0, green: 0, blue: 0 };
    Object.values(answers).forEach((c) => counts[c]++);
    let dominant: BrainColor = 'red';
    let maxCount = -1;
    (Object.keys(counts) as BrainColor[]).forEach((c) => {
      if (counts[c] > maxCount) {
        maxCount = counts[c];
        dominant = c;
      }
    });
    return dominant;
  })();

  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete(computedDominant);
    }
  }, [isComplete, computedDominant, onComplete]);

  const activeColor = inspectedColor || computedDominant;
  const activeArchetype = BRAIN_ARCHETYPES[activeColor];

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2 px-2">
      {/* Intro Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-800 inline-block">
          Step 1: Self-Awareness
        </span>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Find Your Brain Color in 60s
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Your brain color is your natural communication style. Tap the option that matches your immediate instinct in each situation below:
        </p>
      </div>

      {/* 3 Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DIAGNOSTIC_SCENARIOS.map((scenario, sIdx) => {
          const selected = answers[scenario.id];
          return (
            <div
              key={scenario.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Scenario {sIdx + 1} of 3
                </span>
                <h3 className="font-extrabold text-slate-900 text-base mt-1">{scenario.title}</h3>
                <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed">{scenario.subtitle}</p>

                <div className="space-y-2">
                  {scenario.options.map((opt) => {
                    const isChosen = selected === opt.color;
                    const optArch = BRAIN_ARCHETYPES[opt.color];
                    return (
                      <button
                        key={opt.color}
                        type="button"
                        onClick={() => handleSelectOption(scenario.id, opt.color)}
                        className={`w-full text-left p-3 rounded-xl border transition-all text-xs cursor-pointer flex flex-col ${
                          isChosen
                            ? 'ring-2 font-bold shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                        style={{
                          backgroundColor: isChosen ? optArch.bgTint : undefined,
                          borderColor: isChosen ? optArch.primaryColor : undefined,
                          color: isChosen ? optArch.textColor : undefined,
                          outlineColor: optArch.primaryColor
                        }}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold">{opt.label}</span>
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: optArch.primaryColor }}
                          />
                        </div>
                        <span className="text-[11px] opacity-80 leading-normal">{opt.subtext}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result Badge & Archetype Inspector */}
      {isComplete && (
        <div
          className="p-6 sm:p-8 rounded-3xl border-2 shadow-lg transition-all"
          style={{
            backgroundColor: activeArchetype.bgTint,
            borderColor: activeArchetype.borderColor
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-5" style={{ borderColor: activeArchetype.borderColor }}>
            <div className="flex items-center gap-4">
              <BrainAvatar color={activeColor} size="lg" showLabel={false} />
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: activeArchetype.primaryColor }}
                >
                  {activeArchetype.name}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {activeArchetype.avatarName} — {activeArchetype.roleTitle}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setInspectedColor(null);
              }}
              className="text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-600 transition-colors cursor-pointer border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Quiz
            </button>
          </div>

          <p className="text-sm font-semibold text-slate-800 mt-4 leading-relaxed">
            {activeArchetype.summary}
          </p>

          {/* 3 Visual Chips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            <div className="p-4 rounded-2xl bg-white/90 border border-emerald-100 shadow-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs uppercase mb-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Superpower
              </div>
              <p className="text-xs font-bold text-slate-800">{activeArchetype.superpower}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-rose-100 shadow-xs">
              <div className="flex items-center gap-1.5 text-rose-700 font-bold text-xs uppercase mb-1">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                Kryptonite / Stress Trigger
              </div>
              <p className="text-xs font-bold text-slate-800">{activeArchetype.kryptonite}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-blue-100 shadow-xs">
              <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase mb-1">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                How to talk to me
              </div>
              <p className="text-xs font-bold text-slate-800">{activeArchetype.communicationTip}</p>
            </div>
          </div>

          {/* Peer Inspector Bar */}
          <div className="mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs" style={{ borderColor: activeArchetype.borderColor }}>
            <span className="font-bold text-slate-500">Inspect other teammates' brain types:</span>
            <div className="flex items-center gap-2">
              {(Object.keys(BRAIN_ARCHETYPES) as BrainColor[]).map((c) => {
                const isCurrent = activeColor === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setInspectedColor(c)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      isCurrent ? 'bg-white shadow-xs ring-2' : 'bg-white/60 hover:bg-white text-slate-600'
                    }`}
                    style={{ outlineColor: BRAIN_ARCHETYPES[c].primaryColor }}
                  >
                    {BRAIN_ARCHETYPES[c].avatarName} ({c.toUpperCase()})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
