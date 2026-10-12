import React from 'react';
import { HatInfo } from '../../types';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export const HatCard: React.FC<{
  hat: HatInfo;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ hat, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      data-testid={`hat-select-${hat.id}`}
      onClick={onSelect}
      className={`text-left p-4 rounded-2xl transition-all border-2 flex flex-col justify-between ${
        isSelected
          ? 'shadow-lg scale-102 ring-2 ring-offset-2'
          : 'bg-white hover:border-slate-300 shadow-xs'
      }`}
      style={{
        borderColor: isSelected ? hat.primaryColor : '#e2e8f0',
        backgroundColor: isSelected ? hat.bgTint : '#ffffff',
        outlineColor: hat.primaryColor
      }}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${hat.primaryColor}20`, color: hat.primaryColor }}
          >
            {hat.badge}
          </span>
          <span className="text-sm font-semibold text-slate-500">{hat.name}</span>
        </div>
        <h3 className="font-bold text-slate-900 text-lg">{hat.title}</h3>
        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{hat.summary}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-medium" style={{ color: hat.primaryColor }}>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hat.primaryColor }} />
        {isSelected ? 'Currently Viewing' : 'Click to View Rules'}
      </div>
    </button>
  );
};

export const HatDetailModal: React.FC<{ hat: HatInfo }> = ({ hat }) => {
  return (
    <div
      className="p-6 rounded-2xl border-2 transition-all shadow-sm"
      style={{
        backgroundColor: hat.bgTint,
        borderColor: hat.borderColor
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4 mb-4" style={{ borderColor: hat.borderColor }}>
        <div>
          <span
            className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ backgroundColor: hat.primaryColor, color: '#ffffff' }}
          >
            {hat.name}
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2">{hat.title}</h2>
        </div>
        <div className="text-sm font-semibold px-3 py-1 rounded-lg bg-white/80 border border-slate-200 text-slate-700">
          Core Lens: {hat.badge}
        </div>
      </div>

      <div className="bg-white/90 p-4 rounded-xl border border-slate-200/80 mb-5 shadow-xs">
        <span className="text-xs font-bold uppercase text-slate-400 block mb-1">Key Guiding Question</span>
        <p className="text-lg font-bold text-slate-900 italic">"{hat.question}"</p>
      </div>

      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 flex items-start gap-2.5 mb-6">
        <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
        <div>
          <strong className="font-bold block text-sm">The Golden Rule:</strong>
          <span className="text-sm font-medium">{hat.goldenRule}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/80 p-4 rounded-xl border border-emerald-100 shadow-xs">
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            DOs (What to focus on)
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {hat.dos.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/80 p-4 rounded-xl border border-rose-100 shadow-xs">
          <div className="flex items-center gap-1.5 text-rose-700 font-bold text-sm mb-3">
            <XCircle className="w-4 h-4 text-rose-600" />
            DON'Ts (Anti-Patterns)
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {hat.donts.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
