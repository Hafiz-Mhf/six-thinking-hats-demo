import { useState, useEffect, type FormEvent } from 'react';
import { BrainColor } from '../../types/brain';
import { BRAIN_ARCHETYPES } from '../../data/brainData';
import { soundEngine } from '../../utils/audio';
import { formatSeconds } from '../../utils/timer';
import { Play, Pause, Plus } from 'lucide-react';

export type SimHat = 'white' | 'red' | 'yellow' | 'black' | 'green' | 'blue';

export interface HatSpec {
  id: SimHat;
  name: string;
  badge: string;
  color: string;
  bgTint: string;
  borderColor: string;
  question: string;
  rule: string;
  avatarBehaviors: Record<BrainColor, string>;
}

export const SIM_HATS: Record<SimHat, HatSpec> = {
  white: {
    id: 'white',
    name: 'White Hat',
    badge: 'Facts & Data',
    color: '#475569',
    bgTint: '#f8fafc',
    borderColor: '#cbd5e1',
    question: 'What are the hard numbers, error logs, and verifiable metrics?',
    rule: 'Only verified facts. No opinions or interpretations allowed.',
    avatarBehaviors: {
      purple: 'Alex feels right at home, sharing log benchmarks and historical telemetry.',
      red: 'Ryan focuses strictly on concrete dates, sprint velocity, and ticket stats.',
      green: 'Chloe grounds her imagination in hard data gaps that need solving.',
      blue: 'Maya shares measurable user engagement and customer survey metrics.'
    }
  },
  red: {
    id: 'red',
    name: 'Red Hat',
    badge: 'Gut & Emotion',
    color: '#dc2626',
    bgTint: '#fef2f2',
    borderColor: '#fca5a5',
    question: 'What is your raw instinct or gut feeling right now? (60 seconds)',
    rule: 'No logic, reasoning, or justification needed. Voice your intuition.',
    avatarBehaviors: {
      purple: 'Alex expresses his hunch without needing to dig through 50 docs first.',
      red: 'Ryan shares his gut feeling on whether this milestone will slip.',
      green: 'Chloe vents her excitement or anxiety without judgment.',
      blue: 'Maya feels totally safe sharing team morale intuition without pushback.'
    }
  },
  yellow: {
    id: 'yellow',
    name: 'Yellow Hat',
    badge: 'Optimism & Value',
    color: '#d97706',
    bgTint: '#fffbeb',
    borderColor: '#fde68a',
    question: 'What are the upside benefits? What is the best-case scenario?',
    rule: 'Constructive optimism. Why could this succeed and create value?',
    avatarBehaviors: {
      purple: 'Alex calculates long-term technical maintainability gains.',
      red: 'Ryan identifies how this streamlines the deployment cycle time.',
      green: 'Chloe highlights exciting new market opportunities unlocked.',
      blue: 'Maya highlights how happy and less stressed the team will be.'
    }
  },
  black: {
    id: 'black',
    name: 'Black Hat',
    badge: 'Caution & Risk',
    color: '#1e293b',
    bgTint: '#f1f5f9',
    borderColor: '#94a3b8',
    question: 'What fatal flaws, security gaps, or costs could break this?',
    rule: 'Objective risk assessment. Challenge the idea, not the person.',
    avatarBehaviors: {
      purple: 'Alex points out database scaling bottlenecks under peak load.',
      red: 'Ryan highlights dependency bottlenecks in the release pipeline.',
      green: 'Chloe stress-tests unorthodox failure modes in edge cases.',
      blue: 'Maya spots human risks: developer on-call burnout and friction.'
    }
  },
  green: {
    id: 'green',
    name: 'Green Hat',
    badge: 'Creativity & Ideas',
    color: '#16a34a',
    bgTint: '#f0fdf4',
    borderColor: '#86efac',
    question: 'What wild alternatives, provocations, or fresh moves can we invent?',
    rule: 'Zero criticism allowed. All wild ideas welcome. "Yes, and..."',
    avatarBehaviors: {
      purple: 'Alex proposes using an emerging vector database pattern.',
      red: 'Ryan invents an automated script to bypass manual releases.',
      green: 'Chloe thrives, sparking 5 radical ideas in 60 seconds.',
      blue: 'Maya proposes a collaborative peer-pairing format for PR reviews.'
    }
  },
  blue: {
    id: 'blue',
    name: 'Blue Hat',
    badge: 'Process & Action',
    color: '#2563eb',
    bgTint: '#eff6ff',
    borderColor: '#93c5fd',
    question: 'What is our decision, and what is the concrete 1-2-3 action plan?',
    rule: 'Synthesize decisions into assigned tasks, owners, and deadlines.',
    avatarBehaviors: {
      purple: 'Alex documents the architecture decision record (ADR).',
      red: 'Ryan rejoices as decisions become a step-by-step checklist with owners.',
      green: 'Chloe agrees on the scope boundaries to prototype next.',
      blue: 'Maya confirms everyone feels aligned, heard, and energized.'
    }
  }
};

export const HatSimulatorModule = () => {
  const [activeHat, setActiveHat] = useState<SimHat>('blue');
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [cards, setCards] = useState<Array<{ id: string; hat: SimHat; text: string }>>([
    { id: '1', hat: 'white', text: 'Error rate spiked to 14% at 09:30 UTC' },
    { id: '2', hat: 'green', text: 'Auto-fallback to cached read replicas' }
  ]);
  const [newNote, setNewNote] = useState('');

  const currentHat = SIM_HATS[activeHat];
  const hatsList: SimHat[] = ['white', 'red', 'yellow', 'black', 'green', 'blue'];

  // Hotkey listener for 1-6 and Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      const keyNum = parseInt(e.key, 10);
      if (keyNum >= 1 && keyNum <= 6) {
        e.preventDefault();
        const selected = hatsList[keyNum - 1];
        setActiveHat(selected);
        setTimerSeconds(selected === 'red' ? 60 : 180);
      } else if (e.code === 'Space') {
        e.preventDefault();
        setIsTimerRunning((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Timer interval
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          soundEngine.playChime('finish');
          setIsTimerRunning(false);
          return 0;
        }
        if (prev === 30) {
          soundEngine.playChime('warning');
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleAddNote = (e: FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setCards([{ id: `note-${Date.now()}`, hat: activeHat, text: newNote.trim() }, ...cards]);
    setNewNote('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2 px-2">
      {/* Intro Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-blue-800 inline-block">
          Step 3: Team Simulation
        </span>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          4-Brain Parallel Meeting Simulator
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Watch how wearing the SAME hat aligns all 4 Colored Brain processors into harmonious parallel thinking:
        </p>
      </div>

      {/* Hat Selector Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {hatsList.map((hatKey, idx) => {
            const h = SIM_HATS[hatKey];
            const isActive = activeHat === hatKey;
            return (
              <button
                key={hatKey}
                type="button"
                data-testid={`sim-hat-${hatKey}`}
                onClick={() => {
                  setActiveHat(hatKey);
                  setTimerSeconds(hatKey === 'red' ? 60 : 180);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive ? 'ring-2 ring-offset-1 text-white shadow-md scale-102' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
                style={{
                  backgroundColor: isActive ? h.color : undefined,
                  outlineColor: h.color
                }}
              >
                <span className="opacity-70">[{idx + 1}]</span>
                <span>{h.name}</span>
              </button>
            );
          })}
        </div>

        {/* Timer Box */}
        <div className="flex items-center gap-2">
          <div className="font-mono font-black text-base px-3 py-1 rounded-lg bg-slate-100 text-slate-800">
            {formatSeconds(timerSeconds)}
          </div>
          <button
            type="button"
            aria-label={isTimerRunning ? 'Pause Timer' : 'Start Timer'}
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-2 rounded-xl bg-slate-900 text-white hover:bg-blue-600 transition-colors cursor-pointer"
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
        </div>
      </div>

      {/* Active Hat Banner */}
      <div
        className="p-6 rounded-3xl border-2 transition-all shadow-xs"
        style={{
          backgroundColor: currentHat.bgTint,
          borderColor: currentHat.borderColor
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-xs"
              style={{ backgroundColor: currentHat.color }}
            >
              🎩
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Hat Mode
              </span>
              <h3 className="text-2xl font-black text-slate-900">{currentHat.name} Mode</h3>
            </div>
          </div>

          <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 text-slate-800 shadow-2xs">
            Rule: {currentHat.rule}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/60">
          <p className="text-base font-bold text-slate-800 italic">"{currentHat.question}"</p>
        </div>
      </div>

      {/* The 4 Avatars Co-operating Under the Same Hat */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-700">How the 4 Brain Colors Behave Together Under {currentHat.name}:</h4>
          <span className="text-xs text-slate-400">All 4 processors synchronized</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(BRAIN_ARCHETYPES) as BrainColor[]).map((cKey) => {
            const arch = BRAIN_ARCHETYPES[cKey];
            const behavior = currentHat.avatarBehaviors[cKey];
            return (
              <div
                key={cKey}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                style={{ borderTopWidth: '4px', borderTopColor: currentHat.color }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold" style={{ color: arch.textColor }}>
                      {arch.avatarName} ({arch.name.replace(' Brain', '')})
                    </span>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white"
                      style={{ backgroundColor: currentHat.color }}
                    >
                      Wearing {currentHat.name.replace(' Hat', '')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{behavior}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Card Capture Bar for Facilitator */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h4 className="font-extrabold text-slate-900 text-sm">Capture Your Team's Thoughts Under {currentHat.name}:</h4>
        <form onSubmit={handleAddNote} className="flex gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder={`Type a note voiced by the room under ${currentHat.name}...`}
            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </form>

        {/* Captured Notes Pill Wall */}
        <div className="flex flex-wrap gap-2 pt-2">
          {cards
            .filter((c) => c.hat === activeHat)
            .map((c) => (
              <span
                key={c.id}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold shadow-2xs border"
                style={{
                  backgroundColor: currentHat.bgTint,
                  borderColor: currentHat.borderColor,
                  color: currentHat.color
                }}
              >
                {c.text}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};
