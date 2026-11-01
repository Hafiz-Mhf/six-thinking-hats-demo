import { User, Users } from 'lucide-react';

export const HardwareSoftwareGraphic = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="max-w-3xl mx-auto text-center space-y-2 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">The Core HR Model</span>
        <h3 className="text-2xl sm:text-3xl font-black">Natural Style vs. Meeting Hat</h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Who You Are vs. How We Think Together as a Team:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Natural Style */}
        <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-bold mb-2 text-sm">
              <User className="w-5 h-5" />
              Colored Brain: Your Natural Style (Who You Are)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              How your brain naturally takes in information. Everyone has a different style, and that is okay. Explains why two people can naturally clash in a 1-on-1 talk if their styles are different.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/40 text-[11px] font-bold text-purple-200">
            👉 1-on-1 Rule: Speak in their natural style so they feel comfortable.
          </div>
        </div>

        {/* Meeting Hat */}
        <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2 text-sm">
              <Users className="w-5 h-5" />
              Six Thinking Hats: Your Meeting Hat (What We Put On)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              A simple tool for team discussions. It is temporary and easy to change. Instead of arguing back and forth, the whole team wears the same hat together at the same time.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-[11px] font-bold text-emerald-200">
            👉 Team Rule: Put on the same hat together to stop personal arguments.
          </div>
        </div>
      </div>
    </div>
  );
};
