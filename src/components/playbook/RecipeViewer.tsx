import React from 'react';
import { DAILY_RECIPES } from '../../data/recipes';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { Clock, Play, ArrowRight } from 'lucide-react';
import { DailyRecipe, HatType } from '../../types';

export const RecipeViewer: React.FC<{
  onSelectRecipe: (recipe: DailyRecipe) => void;
}> = ({ onSelectRecipe }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Daily Work Recipes</h3>
          <p className="text-xs text-slate-600">Proven sequences you can use in tomorrow’s team meetings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DAILY_RECIPES.map((recipe) => (
          <div
            key={recipe.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {recipe.durationMinutes} mins
                </span>
                <span className="text-xs text-slate-400 font-semibold">{recipe.hatSequence.length} Steps</span>
              </div>
              <h4 className="font-extrabold text-slate-900 text-base">{recipe.name}</h4>
              <p className="text-xs font-medium text-blue-700 mt-0.5">{recipe.tagline}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{recipe.description}</p>

              {/* Hat Flow Sequence Pills */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Sequence Flow</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {recipe.hatSequence.map((hatKey: HatType, idx: number) => {
                    const hat = HAT_DEFINITIONS[hatKey];
                    return (
                      <React.Fragment key={idx}>
                        <span
                          className="text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 text-white shadow-xs"
                          style={{ backgroundColor: hat.primaryColor }}
                        >
                          {hat.name.replace(' Hat', '')}
                        </span>
                        {idx < recipe.hatSequence.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-300" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectRecipe(recipe)}
              className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Run This Meeting in Workspace
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
