import { useState, Fragment } from 'react';
import { WORKPLACE_SCENARIOS } from '../../data/workplaceScenarios';
import { HardwareSoftwareGraphic } from '../visual/HardwareSoftwareGraphic';
import { GitPullRequest, AlertOctagon, Sparkles, UserCheck, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';

export const WhenWhereModule = () => {
  const [selectedId, setSelectedId] = useState(WORKPLACE_SCENARIOS[0].id);

  const activeScenario = WORKPLACE_SCENARIOS.find((s) => s.id === selectedId) || WORKPLACE_SCENARIOS[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'GitPullRequest':
        return <GitPullRequest className="w-4 h-4" />;
      case 'AlertOctagon':
        return <AlertOctagon className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'UserCheck':
        return <UserCheck className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2 px-2">
      {/* Intro Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 inline-block">
          Step 2: Practical Application
        </span>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          When & Where to Apply at Work
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          How to communicate 1-on-1 using Colored Brain, and guide team discussions using Six Thinking Hats:
        </p>
      </div>

      {/* Hardware vs Software Bridge Graphic */}
      <HardwareSoftwareGraphic />

      {/* Scenario Tabs Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {WORKPLACE_SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedId;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => setSelectedId(sc.id)}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md scale-102'
                    : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                }`}
              >
                {getIcon(sc.iconName)}
                <span>{sc.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Scenario Deep-Dive Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div>
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Active Workplace Case</span>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{activeScenario.title}</h3>
            <p className="text-xs text-slate-500 font-medium">{activeScenario.tagline}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1-on-1 Colored Brain View */}
            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200/60 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block mb-1">
                  1-on-1: Colored Brain in Action
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm mb-2">The Natural Friction Point:</h4>
                <p className="text-xs text-slate-700 leading-relaxed mb-4">{activeScenario.clashDescription}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-purple-200 text-xs">
                <strong className="text-purple-800 block mb-0.5 font-bold">💡 How to communicate 1-on-1:</strong>
                <span className="text-slate-700">{activeScenario.oneOnOneTip}</span>
              </div>
            </div>

            {/* Group Six Hats View */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  Group Alignment: Six Hats Sequence
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm mb-2">The Parallel Meeting Flow:</h4>

                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  {activeScenario.hatSequence.map((hat, idx) => (
                    <Fragment key={idx}>
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-[11px] font-bold text-emerald-900 shadow-2xs">
                        {hat}
                      </span>
                      {idx < activeScenario.hatSequence.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-slate-300" />
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs">
                <strong className="text-emerald-800 block mb-0.5 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Why this eliminates ego clashes:
                </strong>
                <span className="text-slate-700">{activeScenario.whyHatsWork}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
