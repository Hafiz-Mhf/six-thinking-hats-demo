import React from 'react';
import { useWorkshop } from '../../context/WorkshopContext';
import { HatHeader } from './HatHeader';
import { StickyWall } from './StickyWall';
import { SAMPLE_TEMPLATES } from '../../data/sampleTemplates';
import { DAILY_RECIPES } from '../../data/recipes';

export const WorkspaceHub: React.FC = () => {
  const { state, actions } = useWorkshop();

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-4 px-2">
      {/* Step 1: Define Topic Card (Expandable/Sticky) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 1 of 4: Setup</span>
            <h3 className="text-lg font-black text-slate-900">Session Topic & Deliverable</h3>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={state.selectedRecipeId}
              onChange={(e) => actions.setRecipe(e.target.value)}
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800"
            >
              {DAILY_RECIPES.map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.durationMinutes}m)</option>
              ))}
            </select>

            <select
              onChange={(e) => {
                if (e.target.value) actions.loadTemplate(e.target.value);
              }}
              defaultValue=""
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800"
            >
              <option value="" disabled>Load Case Study...</option>
              {SAMPLE_TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={state.topic}
            onChange={(e) => actions.setTopic(e.target.value)}
            placeholder="What problem or decision are we evaluating today?"
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={state.expectedOutcome}
            onChange={(e) => actions.setTopic(state.topic, e.target.value)}
            placeholder="Target deliverable (e.g., Action plan with owners, Go/No-Go decision)"
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Active Hat Guiding Header */}
      <HatHeader />

      {/* Interactive Sticky Card Wall */}
      <StickyWall />
    </div>
  );
};
