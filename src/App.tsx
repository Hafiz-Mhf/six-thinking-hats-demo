import { useState } from 'react';
import { VisualHeader, StageId } from './components/common/VisualHeader';
import { BrainFinderModule } from './components/modules/BrainFinderModule';
import { WhenWhereModule } from './components/modules/WhenWhereModule';
import { HatSimulatorModule } from './components/modules/HatSimulatorModule';
import { PrintHandout } from './components/common/PrintHandout';

export default function App() {
  const [activeStage, setActiveStage] = useState<StageId>('finder');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <VisualHeader activeStage={activeStage} onSelectStage={setActiveStage} />

      <main className="flex-1 pb-16 no-print">
        {activeStage === 'finder' && (
          <BrainFinderModule onComplete={() => {}} />
        )}

        {activeStage === 'when-where' && (
          <WhenWhereModule />
        )}

        {activeStage === 'simulator' && (
          <HatSimulatorModule />
        )}
      </main>

      {/* Formatted A4 Print Handout */}
      <PrintHandout />
    </div>
  );
}
