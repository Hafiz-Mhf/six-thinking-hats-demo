import React from 'react';
import { Users, Shuffle } from 'lucide-react';

export const ThinkingVisualizer: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <h3 className="text-xl font-extrabold text-slate-900">Why Six Hats? Parallel vs. Adversarial Thinking</h3>
        <p className="text-sm text-slate-600 mt-1">
          Traditional meetings create debates where egos defend positions. Six Thinking Hats forces the entire room to look in the exact same direction simultaneously.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Adversarial Thinking */}
        <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/40">
          <div className="flex items-center gap-2 text-rose-800 font-bold mb-2">
            <Shuffle className="w-5 h-5 text-rose-600" />
            Traditional Adversarial Debate
          </div>
          <p className="text-xs text-rose-700 mb-4">
            Person A suggests an idea. Person B attacks it with Black Hat caution. Person A gets defensive. 70% of energy is spent protecting egos.
          </p>
          <div className="space-y-2 text-xs font-medium">
            <div className="p-2 rounded-lg bg-white border border-rose-200 text-slate-800 flex justify-between">
              <span>"Here is my proposal"</span>
              <span className="text-emerald-600 font-bold">Green/Yellow</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-rose-200 text-slate-800 flex justify-between">
              <span>"That will fail because of budget"</span>
              <span className="text-slate-800 font-bold">Black</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-rose-200 text-slate-800 flex justify-between">
              <span>"You always shoot down my ideas!"</span>
              <span className="text-rose-600 font-bold">Red (Defensive)</span>
            </div>
          </div>
        </div>

        {/* Parallel Thinking */}
        <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40">
          <div className="flex items-center gap-2 text-emerald-800 font-bold mb-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Parallel Thinking (Six Hats)
          </div>
          <p className="text-xs text-emerald-700 mb-4">
            Everyone puts on the SAME hat at the SAME time. When wearing Black Hat, everyone spots risks together. When wearing Yellow Hat, even skeptics find benefits.
          </p>
          <div className="space-y-2 text-xs font-medium">
            <div className="p-2 rounded-lg bg-white border border-emerald-200 text-slate-800 flex justify-between">
              <span>Step 1: All look at facts and metrics</span>
              <span className="text-slate-600 font-bold">White Hat (Room)</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-emerald-200 text-slate-800 flex justify-between">
              <span>Step 2: All invent alternative solutions</span>
              <span className="text-emerald-600 font-bold">Green Hat (Room)</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-emerald-200 text-slate-800 flex justify-between">
              <span>Step 3: All stress-test vulnerabilities</span>
              <span className="text-slate-800 font-bold">Black Hat (Room)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
