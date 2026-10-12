import React from 'react';
import { CardItem } from '../../types';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { ThumbsUp, Trash2, AlertTriangle, Heart } from 'lucide-react';

export const StickyCard: React.FC<{
  card: CardItem;
  onVote: () => void;
  onDelete: () => void;
}> = ({ card, onVote, onDelete }) => {
  const hat = HAT_DEFINITIONS[card.hat];

  return (
    <div
      className="p-4 rounded-xl border bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between group min-h-[120px]"
      style={{ borderTopWidth: '4px', borderTopColor: hat.primaryColor }}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          {/* Metadata Badges */}
          {card.metadata?.riskSeverity && (
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${
                card.metadata.riskSeverity === 'high'
                  ? 'bg-rose-100 text-rose-800'
                  : card.metadata.riskSeverity === 'medium'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              {card.metadata.riskSeverity} risk
            </span>
          )}

          {card.metadata?.sentimentTone && (
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${
                card.metadata.sentimentTone === 'positive'
                  ? 'bg-emerald-100 text-emerald-800'
                  : card.metadata.sentimentTone === 'skeptical'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Heart className="w-3 h-3" />
              {card.metadata.sentimentTone}
            </span>
          )}

          {!card.metadata?.riskSeverity && !card.metadata?.sentimentTone && (
            <span className="text-[10px] font-bold text-slate-400 uppercase">{hat.name}</span>
          )}

          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete note"
            className="text-slate-300 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100 p-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-sm font-medium text-slate-900 leading-relaxed break-words">{card.content}</p>
      </div>

      <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="text-[10px] text-slate-400">{new Date(card.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

        <button
          type="button"
          onClick={onVote}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors cursor-pointer"
        >
          <ThumbsUp className="w-3 h-3" />
          <span>{card.votes}</span>
        </button>
      </div>
    </div>
  );
};
