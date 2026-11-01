import type { BrainColor } from '../types/brain';

export type HatColor = 'white' | 'red' | 'yellow' | 'black' | 'green' | 'blue';

export interface BrainProfile {
  id: BrainColor;
  name: string;
  title: string;
  color: string;
  textColor: string;
  soft: string;
  line: string;
  thinks: string;
  contributes: string;
  frustratedBy: string;
  communication: string;
  quote: string;
  comfortableHats: HatColor[];
}

export interface HatProfile {
  id: HatColor;
  name: string;
  shortName: string;
  color: string;
  soft: string;
  line: string;
  purpose: string;
  question: string;
  example: string;
  avoid: string;
}

export const BRAINS: BrainProfile[] = [
  {
    id: 'purple',
    name: 'Purple Brain',
    title: 'The Systemizer',
    color: '#7451a6',
    textColor: '#5f3c8d',
    soft: '#f2edf8',
    line: '#c9b7df',
    thinks: 'Connect the details before deciding.',
    contributes: 'Context, planning, order, and reliable systems.',
    frustratedBy: 'Missing information or being rushed into a decision.',
    communication: 'Share the background and allow time to review it.',
    quote: 'Can I see the full information first?',
    comfortableHats: ['white', 'blue']
  },
  {
    id: 'red',
    name: 'Red Brain',
    title: 'The Analyzer',
    color: '#c8493f',
    textColor: '#96352e',
    soft: '#faece9',
    line: '#e3a49e',
    thinks: 'Find the objective and follow a clear path.',
    contributes: 'Analysis, focus, accuracy, and decisive action.',
    frustratedBy: 'Vague goals, rambling discussion, or unclear ownership.',
    communication: 'Lead with the point, evidence, steps, and deadline.',
    quote: 'What is the goal and what happens next?',
    comfortableHats: ['black', 'yellow']
  },
  {
    id: 'green',
    name: 'Green Brain',
    title: 'The Ideator',
    color: '#3c8b68',
    textColor: '#276c4d',
    soft: '#e9f4ee',
    line: '#9bc7af',
    thinks: 'Explore possibilities and learn by trying.',
    contributes: 'Fresh ideas, adaptability, energy, and alternatives.',
    frustratedBy: 'Rigid rules, micromanagement, or early criticism.',
    communication: 'Give ideas room to develop before judging them.',
    quote: 'What else could we try?',
    comfortableHats: ['green']
  },
  {
    id: 'blue',
    name: 'Blue Brain',
    title: 'The Socializer',
    color: '#3978a8',
    textColor: '#28628e',
    soft: '#eaf2f8',
    line: '#9ebfd7',
    thinks: 'Understand the people and relationships involved.',
    contributes: 'Empathy, trust, morale, and team awareness.',
    frustratedBy: 'Cold conflict, harsh delivery, or ignored feelings.',
    communication: 'Acknowledge people and impact before moving to tasks.',
    quote: 'How will this affect the team?',
    comfortableHats: ['red', 'yellow']
  }
];

export const HATS: HatProfile[] = [
  {
    id: 'white',
    name: 'White Hat',
    shortName: 'Facts',
    color: '#5d6876',
    soft: '#f4f5f6',
    line: '#c9ced4',
    purpose: 'Look at facts and information gaps.',
    question: 'What do we know?',
    example: 'We have three months of customer feedback.',
    avoid: 'Opinions presented as facts.'
  },
  {
    id: 'red',
    name: 'Red Hat',
    shortName: 'Feelings',
    color: '#c53d39',
    soft: '#faeceb',
    line: '#e3a09d',
    purpose: 'Share feelings, instinct, and immediate reactions.',
    question: 'How do we feel?',
    example: 'I feel excited, but the timing makes me uneasy.',
    avoid: 'Demanding proof for someone’s feeling.'
  },
  {
    id: 'green',
    name: 'Green Hat',
    shortName: 'Ideas',
    color: '#33845e',
    soft: '#e9f4ee',
    line: '#99c5ad',
    purpose: 'Create alternatives and new possibilities.',
    question: 'What else could we try?',
    example: 'Could we test a smaller version for two weeks?',
    avoid: 'Judging ideas while they are being created.'
  },
  {
    id: 'yellow',
    name: 'Yellow Hat',
    shortName: 'Benefits',
    color: '#b77a13',
    soft: '#fff5dc',
    line: '#e3c477',
    purpose: 'Find value, benefits, and reasons an idea could work.',
    question: 'What could go well?',
    example: 'This could shorten handovers and improve focus.',
    avoid: 'Empty optimism without a reason.'
  },
  {
    id: 'black',
    name: 'Black Hat',
    shortName: 'Risks',
    color: '#30343b',
    soft: '#eceef0',
    line: '#9da2aa',
    purpose: 'Spot risks, limits, and possible problems.',
    question: 'What could go wrong?',
    example: 'New staff may struggle without clear documentation.',
    avoid: 'Attacking the person instead of testing the idea.'
  },
  {
    id: 'blue',
    name: 'Blue Hat',
    shortName: 'Next step',
    color: '#326f9f',
    soft: '#e9f2f8',
    line: '#9abbd3',
    purpose: 'Guide the process and turn discussion into action.',
    question: 'What happens next?',
    example: 'We will run a two-week trial. Aina owns the review.',
    avoid: 'Ending without a decision, owner, or follow-up.'
  }
];

export const BRAIN_HAT_BEHAVIORS: Record<HatColor, Record<BrainColor, string>> = {
  white: {
    purple: 'Brings background, records, and missing context.',
    red: 'Pulls out the numbers that affect the goal.',
    green: 'Notices gaps where more discovery is needed.',
    blue: 'Adds feedback and people-related evidence.'
  },
  red: {
    purple: 'Shares an instinct without waiting for every detail.',
    red: 'States confidence or concern about the target.',
    green: 'Shares excitement or discomfort freely.',
    blue: 'Reads the emotional temperature of the room.'
  },
  green: {
    purple: 'Adapts ideas that worked in another context.',
    red: 'Invents a faster or clearer method.',
    green: 'Generates many unexpected possibilities.',
    blue: 'Creates ideas that support people and trust.'
  },
  yellow: {
    purple: 'Finds long-term process improvements.',
    red: 'Identifies measurable value and efficiency.',
    green: 'Sees new opportunities an idea could unlock.',
    blue: 'Finds benefits for morale and collaboration.'
  },
  black: {
    purple: 'Finds missing details and process gaps.',
    red: 'Tests deadlines, costs, and practical limits.',
    green: 'Imagines unusual failure cases.',
    blue: 'Spots workload, trust, and morale risks.'
  },
  blue: {
    purple: 'Records the decision and organizes follow-through.',
    red: 'Turns the decision into owners and deadlines.',
    green: 'Chooses the first experiment to run.',
    blue: 'Checks that people are heard and aligned.'
  }
};

export type DailyContextId = 'alone' | 'team' | 'boss' | 'conflict';

interface DailyStep {
  text: string;
  hat?: HatColor;
  tool?: 'brain';
}

interface DailyContext {
  id: DailyContextId;
  label: string;
  tool: string;
  title: string;
  when: string;
  intro: string;
  groups: Array<{ label: string; steps: DailyStep[] }>;
  example: string;
  outcome: string;
}

export const DAILY_CONTEXTS: DailyContext[] = [
  {
    id: 'alone',
    label: 'Working alone',
    tool: 'Six Thinking Hats',
    title: 'Use the hats as a personal checklist',
    when: 'Before an important decision or when you feel stuck in one way of thinking.',
    intro: 'Move through each question before making an important decision.',
    groups: [
      { label: 'Understand', steps: [{ hat: 'white', text: 'What do I know?' }, { hat: 'red', text: 'What is my instinct?' }] },
      { label: 'Explore', steps: [{ hat: 'green', text: 'What options do I have?' }, { hat: 'yellow', text: 'What value could each option create?' }, { hat: 'black', text: 'What could go wrong?' }] },
      { label: 'Decide', steps: [{ hat: 'blue', text: 'What will I do next?' }] }
    ],
    example: 'I will check the facts, compare value and risk, then choose one next step.',
    outcome: 'One decision and one next action.'
  },
  {
    id: 'team',
    label: 'With teammates',
    tool: 'Six Thinking Hats',
    title: 'Think in parallel, not against each other',
    when: 'When discussion becomes scattered or ideas and criticism keep colliding.',
    intro: 'Everyone uses the same hat at the same time. Ideas and criticism stop colliding.',
    groups: [
      { label: 'Frame', steps: [{ hat: 'blue', text: 'Name the topic and desired outcome.' }, { hat: 'white', text: 'Agree on the facts already known.' }] },
      { label: 'Explore', steps: [{ hat: 'green', text: 'Create options before judging them.' }, { hat: 'yellow', text: 'Identify value and possible benefits.' }, { hat: 'black', text: 'Test the risks after ideas are visible.' }] },
      { label: 'Decide', steps: [{ hat: 'blue', text: 'Agree on a decision, owner, and date.' }] }
    ],
    example: 'Let us all use the Green Hat first. We will assess risks after the ideas are visible.',
    outcome: 'One shared decision, one owner, and one date.'
  },
  {
    id: 'boss',
    label: 'With your boss',
    tool: 'Colored Brain + Six Thinking Hats',
    title: 'Adapt the message without labelling the person',
    when: 'When a proposal is not landing or your boss keeps asking for different information.',
    intro: 'Notice what information they ask for, then make your proposal easier to understand.',
    groups: [
      { label: 'Understand', steps: [{ tool: 'brain', text: 'Notice whether they ask for details, action, options, or people impact.' }] },
      { label: 'Shape', steps: [{ hat: 'white', text: 'Bring the facts and relevant context.' }, { hat: 'yellow', text: 'Explain the value of your proposal.' }, { hat: 'black', text: 'Address the main risk directly.' }] },
      { label: 'Recommend', steps: [{ hat: 'blue', text: 'Lead with your recommendation, deadline, and next step.' }] }
    ],
    example: 'My recommendation is a six-week pilot. Here is the evidence, value, main risk, and decision needed.',
    outcome: 'A proposal your boss can understand and respond to.'
  },
  {
    id: 'conflict',
    label: 'During disagreement',
    tool: 'Six Thinking Hats',
    title: 'Separate reactions, facts, options, and judgment',
    when: 'When reactions, assumptions, and criticism are being mixed together.',
    intro: 'The sequence gives every concern a safe place without letting one mode dominate.',
    groups: [
      { label: 'Understand', steps: [{ hat: 'red', text: 'Name reactions without debating them.' }, { hat: 'white', text: 'Separate facts from assumptions.' }] },
      { label: 'Explore', steps: [{ hat: 'green', text: 'Create alternatives.' }, { hat: 'yellow', text: 'Identify useful value.' }, { hat: 'black', text: 'Test the risks.' }] },
      { label: 'Decide', steps: [{ hat: 'blue', text: 'Agree on the next action.' }] }
    ],
    example: 'Let us separate what we feel from what we know. We will start with Red, then move to White.',
    outcome: 'A shared next action without dismissing concerns.'
  }
];

export type DemoStageId = 'scenario' | HatColor | 'conclusion';

export const DEMO_SEQUENCE: Array<{
  id: DemoStageId;
  kind: 'scenario' | 'hat' | 'conclusion';
  label: string;
  color: string;
}> = [
  { id: 'scenario', kind: 'scenario', label: 'Scenario', color: '#9a5b3e' },
  { id: 'white', kind: 'hat', label: 'Facts', color: '#5d6876' },
  { id: 'red', kind: 'hat', label: 'Feelings', color: '#c53d39' },
  { id: 'green', kind: 'hat', label: 'Ideas', color: '#33845e' },
  { id: 'yellow', kind: 'hat', label: 'Benefits', color: '#b77a13' },
  { id: 'black', kind: 'hat', label: 'Risks', color: '#30343b' },
  { id: 'blue', kind: 'hat', label: 'Action', color: '#326f9f' },
  { id: 'conclusion', kind: 'conclusion', label: 'Conclude', color: '#5f765c' }
];

export const HR_DEMO_SCENARIO = {
  team: 'HR: Talent Development Team',
  title: 'The manager-development workshop is not leading to lasting change',
  situation: 'Managers rate the workshop well, but attendance varies and many struggle to apply the learning at work.',
  request: 'Business leaders want clearer evidence of improvement. The budget cannot increase.',
  decision: 'How should the team redesign the next manager-development programme?'
};

export const HR_DEMO_CONCLUSION = {
  decision: 'Run a six-week pilot with one manager cohort.',
  actions: [
    'Begin with a focused live workshop.',
    'Add weekly practice, peer discussion, and manager check-ins.',
    'Measure completion and use of the learning after 30 and 60 days.'
  ],
  owner: 'Talent Development programme lead',
  review: 'Review the pilot results before expanding the programme.'
};

export const DEMO_CONTENT: Record<HatColor, { prompt: string; sample: string }> = {
  white: { prompt: 'What do we know, and what do we still need to learn?', sample: 'Review attendance and completion. Gather feedback from participants and their managers. Look for examples of the learning being used at work.' },
  red: { prompt: 'How do learners and leaders feel about the current programme?', sample: 'Learners value the workshop but feel overloaded. The Talent Development team is concerned that the learning does not last.' },
  green: { prompt: 'What other learning formats could work better?', sample: 'Use a shorter live session. Add weekly practice, peer learning, manager check-ins, or coaching clinics.' },
  yellow: { prompt: 'What benefits could the new format provide?', sample: 'Managers would have time to practise. Leaders could see progress. Learning would continue after the workshop.' },
  black: { prompt: 'What could stop the new format from working?', sample: 'Managers may not protect learning time. Line managers may skip check-ins. Too many activities may reduce completion.' },
  blue: { prompt: 'What will we test, who will own it, and how will we measure success?', sample: 'Run one six-week pilot. Assign a programme lead. Review completion and use of the learning after 30 and 60 days.' }
};
