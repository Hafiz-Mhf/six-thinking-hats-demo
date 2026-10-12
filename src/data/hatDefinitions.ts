import { HatInfo, HatType } from '../types';

export const HAT_DEFINITIONS: Record<HatType, HatInfo> = {
  white: {
    id: 'white',
    name: 'White Hat',
    title: 'Facts & Information',
    badge: 'Data & Evidence',
    primaryColor: '#475569',
    bgTint: '#f8fafc',
    borderColor: '#cbd5e1',
    textColor: '#0f172a',
    question: 'What information do we have? What data is missing? What are the verifiable facts?',
    summary: 'Neutral, objective, and evidence-driven. Separates proven facts from conjecture.',
    goldenRule: 'Report only verifiable facts. State information gaps clearly without arguing.',
    dos: [
      'List verified metrics and historical data',
      'Identify what data you need to gather',
      'Distinguish between hard facts and rumors'
    ],
    donts: [
      'Do not express opinions or gut feelings',
      'Do not propose solutions or evaluate ideas'
    ]
  },
  red: {
    id: 'red',
    name: 'Red Hat',
    title: 'Emotions & Intuition',
    badge: 'Gut Instinct',
    primaryColor: '#dc2626',
    bgTint: '#fef2f2',
    borderColor: '#fca5a5',
    textColor: '#991b1b',
    question: 'What is your immediate gut reaction? How does this make you feel right now?',
    summary: 'Pure emotional pulse and instinct. Time-boxed (60-90 seconds) with no justification required.',
    goldenRule: 'Never explain or defend your feelings. Give your raw intuition as it stands.',
    dos: [
      'Share quick feelings (enthusiastic, uneasy, nervous, excited)',
      'Voice intuition and hunches without shame',
      'Keep submissions short and visceral'
    ],
    donts: [
      'Do not give reasons, logic, or justifications ("I feel this because...")',
      'Do not debate someone else’s emotional reaction'
    ]
  },
  yellow: {
    id: 'yellow',
    name: 'Yellow Hat',
    title: 'Optimism & Value',
    badge: 'Benefits & Feasibility',
    primaryColor: '#d97706',
    bgTint: '#fffbeb',
    borderColor: '#fde68a',
    textColor: '#92400e',
    question: 'What are the benefits? What is the best-case scenario? How can we make this work?',
    summary: 'Constructive optimism. Actively looks for value, feasibility, and opportunities.',
    goldenRule: 'Seek genuine, logical reasons for optimism. Not mere wishful thinking.',
    dos: [
      'Identify clear benefits and upside potential',
      'Explore how ideas could realistically succeed',
      'Highlight secondary opportunities'
    ],
    donts: [
      'Do not bring up risks or caveats yet (save for Black Hat)',
      'Do not be cynical or dismissive'
    ]
  },
  black: {
    id: 'black',
    name: 'Black Hat',
    title: 'Caution & Risk',
    badge: 'Critical Judgment',
    primaryColor: '#1e293b',
    bgTint: '#f1f5f9',
    borderColor: '#94a3b8',
    textColor: '#0f172a',
    question: 'What could go wrong? What are the fatal flaws, risks, bottlenecks, or costs?',
    summary: 'Protective assessment. Essential for survival and avoiding avoidable mistakes.',
    goldenRule: 'Logical caution only. Point out flaws constructively without attacking individuals.',
    dos: [
      'Identify compliance, security, technical, and operational risks',
      'Point out hidden dependencies and worst-case scenarios',
      'Assess severity levels (Low, Medium, High)'
    ],
    donts: [
      'Do not make personal attacks or vague criticisms',
      'Do not use Black Hat to kill ideas prematurely—use it to safeguard them'
    ]
  },
  green: {
    id: 'green',
    name: 'Green Hat',
    title: 'Creativity & Alternatives',
    badge: 'New Ideas',
    primaryColor: '#16a34a',
    bgTint: '#f0fdf4',
    borderColor: '#86efac',
    textColor: '#166534',
    question: 'What new ideas, lateral moves, or unorthodox alternatives can we invent?',
    summary: 'Expansive, creative generation. Provocation, alternatives, and out-of-the-box thinking.',
    goldenRule: 'Zero criticism or judgment allowed. All ideas are welcome during Green Hat.',
    dos: [
      'Propose fresh angles and crazy provocations',
      'Build on other people’s ideas ("Yes, and...")',
      'Explore unconventional solutions'
    ],
    donts: [
      'Never say "Yes, but that will never work" (Save evaluation for Yellow/Black)',
      'Do not censor yourself'
    ]
  },
  blue: {
    id: 'blue',
    name: 'Blue Hat',
    title: 'Process & Control',
    badge: 'Synthesis & Action',
    primaryColor: '#2563eb',
    bgTint: '#eff6ff',
    borderColor: '#93c5fd',
    textColor: '#1e40af',
    question: 'What is our objective? Which hat comes next? What are our concrete action items?',
    summary: 'The conductor and meta-manager of the meeting. Sets the agenda, guides the flow, and synthesizes decisions.',
    goldenRule: 'Focus on the thinking process itself, not the content. Summarize into action.',
    dos: [
      'Define the topic and expected outcome at the start',
      'Keep the room focused on the current hat',
      'Synthesize takeaways and assign owners and deadlines'
    ],
    donts: [
      'Do not let participants jump hats without changing the mode',
      'Do not end the session without clear next steps'
    ]
  }
};
