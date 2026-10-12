import React, { useState } from 'react';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { HatCard, HatDetailModal } from './HatCard';
import { ThinkingVisualizer } from './ThinkingVisualizer';
import { RecipeViewer } from './RecipeViewer';
import { DailyRecipe, HatType } from '../../types';
import { useWorkshop } from '../../context/WorkshopContext';
import { BookOpen, Sparkles } from 'lucide-react';

export const PlaybookHub: React.FC<{ onLaunchWorkspace: () => void }> = ({ onLaunchWorkspace }) => {
  const [selectedHatId, setSelectedHatId] = useState<HatType>('white');
  const { actions } = useWorkshop();

  const handleLaunchRecipe = (recipe: DailyRecipe) => {
    actions.setRecipe(recipe.id);
    actions.setViewMode('workspace');
    actions.setStep(1);
    onLaunchWorkspace();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-4 px-2">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          Interactive Facilitator Playbook
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Six Thinking Hats Playbook
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto">
          How to organize thought, eliminate circular debates, and make rapid, high-confidence team decisions in everyday software work.
        </p>
      </div>

      {/* 6-Hat Selector Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            The 6 Thinking Angles
          </h2>
          <span className="text-xs text-slate-500 font-medium">Select a hat to examine rules and DOs / DON'Ts</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {(Object.keys(HAT_DEFINITIONS) as HatType[]).map((hatKey) => (
            <HatCard
              key={hatKey}
              hat={HAT_DEFINITIONS[hatKey]}
              isSelected={selectedHatId === hatKey}
              onSelect={() => setSelectedHatId(hatKey)}
            />
          ))}
        </div>

        {/* Selected Hat Detail Panel */}
        <div className="mt-4">
          <HatDetailModal hat={HAT_DEFINITIONS[selectedHatId]} />
        </div>
      </div>

      {/* Parallel vs Adversarial Graphic */}
      <ThinkingVisualizer />

      {/* Daily Work Recipes */}
      <RecipeViewer onSelectRecipe={handleLaunchRecipe} />
    </div>
  );
};
