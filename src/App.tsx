import { WorkshopProvider, useWorkshop } from './context/WorkshopContext';
import { PlaybookHub } from './components/playbook/PlaybookHub';
import { WorkspaceHub } from './components/workspace/WorkspaceHub';
import { FacilitatorHUD } from './components/workspace/FacilitatorHUD';
import { MatrixOverview } from './components/workspace/MatrixOverview';
import { BookOpen, Sparkles } from 'lucide-react';

function AppContent() {
  const { state, actions } = useWorkshop();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-3 no-print">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
              6H
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-sm sm:text-base leading-none">
                Six Thinking Hats Facilitator
              </h1>
              <span className="text-[11px] text-slate-500 font-medium">Parallel Thinking & Daily Work Playbook</span>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => actions.setViewMode('playbook')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                state.viewMode === 'playbook'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              Playbook & Guide
            </button>

            <button
              type="button"
              onClick={() => actions.setViewMode('workspace')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                state.viewMode === 'workspace'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Live Workspace
            </button>
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 pb-24">
        {state.viewMode === 'playbook' ? (
          <PlaybookHub onLaunchWorkspace={() => actions.setViewMode('workspace')} />
        ) : (
          <WorkspaceHub />
        )}
      </main>

      {/* Facilitator HUD when in Workspace */}
      {state.viewMode === 'workspace' && <FacilitatorHUD />}

      {/* Matrix Synthesis Modal */}
      <MatrixOverview />
    </div>
  );
}

export default function App() {
  return (
    <WorkshopProvider>
      <AppContent />
    </WorkshopProvider>
  );
}
