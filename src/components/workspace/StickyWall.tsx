import React, { useState } from 'react';
import { useWorkshop } from '../../context/WorkshopContext';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { StickyCard } from './StickyCard';
import { Plus, Sparkles } from 'lucide-react';

export const StickyWall: React.FC = () => {
  const { state, actions } = useWorkshop();
  const [content, setContent] = useState('');
  const [riskSeverity, setRiskSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [sentimentTone, setSentimentTone] = useState<'positive' | 'skeptical' | 'neutral'>('positive');

  const activeHat = state.activeHat;
  const currentCards = state.cards[activeHat] || [];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    actions.addCard({
      hat: activeHat,
      content,
      metadata: {
        riskSeverity: activeHat === 'black' ? riskSeverity : undefined,
        sentimentTone: activeHat === 'red' ? sentimentTone : undefined
      }
    });

    setContent('');
  };

  return (
    <div className="space-y-6">
      {/* Rapid Note Input Bar */}
      <form onSubmit={handleAdd} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="card-input-field"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Type a thought under ${HAT_DEFINITIONS[activeHat].name}... (Press Enter)`}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
          />

          {/* Hat Specific Metadata Selectors */}
          {activeHat === 'black' && (
            <select
              value={riskSeverity}
              onChange={(e) => setRiskSeverity(e.target.value as 'low' | 'medium' | 'high')}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 text-slate-700"
            >
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          )}

          {activeHat === 'red' && (
            <select
              value={sentimentTone}
              onChange={(e) => setSentimentTone(e.target.value as 'positive' | 'skeptical' | 'neutral')}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 text-slate-700"
            >
              <option value="positive">Positive Gut</option>
              <option value="skeptical">Uneasy / Skeptical</option>
              <option value="neutral">Neutral Pulse</option>
            </select>
          )}

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Note
          </button>
        </div>
      </form>

      {/* Cards Grid */}
      {currentCards.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-white">
          <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h4 className="font-bold text-slate-700 text-sm">No notes under {HAT_DEFINITIONS[activeHat].name} yet</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Facilitator can type thoughts voiced by the room above, or load a case study template.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentCards.map((card) => (
            <StickyCard
              key={card.id}
              card={card}
              onVote={() => actions.voteCard(activeHat, card.id)}
              onDelete={() => actions.deleteCard(activeHat, card.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
