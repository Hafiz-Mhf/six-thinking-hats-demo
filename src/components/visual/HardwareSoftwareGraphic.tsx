import { Cpu, Layers } from 'lucide-react';

export const HardwareSoftwareGraphic = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="max-w-3xl mx-auto text-center space-y-2 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">The Core Mental Model</span>
        <h3 className="text-2xl sm:text-3xl font-black">Hardware vs. Software</h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Why understanding the distinction between your brain and the hats changes everything:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hardware */}
        <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-bold mb-2 text-sm">
              <Cpu className="w-5 h-5" />
              Colored Brain = Your Hardware (Who You Are)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Your genetic, default way of taking in information. Unconscious and stable. Explains why team members naturally clash when communicating 1-on-1.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/40 text-[11px] font-bold text-purple-200">
            👉 Rule: Adapt your language to match their hardware processor.
          </div>
        </div>

        {/* Software */}
        <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2 text-sm">
              <Layers className="w-5 h-5" />
              Six Thinking Hats = Your Software (What You Wear)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Deliberate, temporary mental operating modes. Fluid and conscious. Aligns all 4 brain processors to look in the exact same direction at the same time.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-[11px] font-bold text-emerald-200">
            👉 Rule: Switch hats together to eliminate adversarial arguments.
          </div>
        </div>
      </div>
    </div>
  );
};
