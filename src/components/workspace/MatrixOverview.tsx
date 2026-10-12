import React from 'react';
import { useWorkshop } from '../../context/WorkshopContext';
import { HAT_DEFINITIONS } from '../../data/hatDefinitions';
import { HatType } from '../../types';
import { generateSessionMarkdown, downloadMarkdownFile } from '../../utils/exportMarkdown';
import { X, Download, Printer } from 'lucide-react';
import { ActionItemTable } from './ActionItemTable';

export const MatrixOverview: React.FC = () => {
  const { state, actions } = useWorkshop();

  if (!state.isMatrixOpen) return null;

  const hats: HatType[] = ['white', 'red', 'yellow', 'black', 'green', 'blue'];

  const handleExport = () => {
    const md = generateSessionMarkdown(state);
    downloadMarkdownFile(md, `six-hats-${(state.topic || 'session').toLowerCase().replace(/\s+/g, '-')}.md`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-7xl max-h-[92vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 3 of 4: Share & Explore</span>
            <h2 className="text-2xl font-black text-slate-900">Six Thinking Hats Matrix Overview</h2>
            <p className="text-xs text-slate-500 mt-0.5">{state.topic || 'Session Topic Overview'}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export Markdown
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / PDF
            </button>

            <button
              type="button"
              onClick={() => actions.toggleMatrix(false)}
              className="p-2 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 6-Column Matrix Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            {hats.map((hatKey) => {
              const hat = HAT_DEFINITIONS[hatKey];
              const cards = state.cards[hatKey] || [];
              return (
                <div
                  key={hatKey}
                  className="rounded-2xl border p-3 flex flex-col justify-between"
                  style={{
                    backgroundColor: hat.bgTint,
                    borderColor: hat.borderColor
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b" style={{ borderColor: hat.borderColor }}>
                      <span className="text-xs font-black" style={{ color: hat.textColor }}>
                        {hat.name}
                      </span>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: hat.primaryColor }}
                      >
                        {cards.length}
                      </span>
                    </div>

                    {cards.length === 0 ? (
                      <div className="text-[11px] text-slate-400 italic py-4 text-center">Empty</div>
                    ) : (
                      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                        {cards.map((c) => (
                          <div key={c.id} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-medium text-slate-800">
                            {c.content}
                            {c.metadata?.riskSeverity && (
                              <span className="block mt-1 text-[9px] font-bold text-rose-600 uppercase">
                                [{c.metadata.riskSeverity} risk]
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Items Component embedded inside Matrix / Synthesis View */}
          <ActionItemTable />
        </div>
      </div>
    </div>
  );
};
