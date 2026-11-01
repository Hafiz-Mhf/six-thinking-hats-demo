import { WorkplaceScenario } from '../types/brain';

export const WORKPLACE_SCENARIOS: WorkplaceScenario[] = [
  {
    id: 'conflict-resolution',
    title: 'Resolving Team Disagreements',
    tagline: 'When two team members strongly disagree on how to solve an issue',
    iconName: 'GitPullRequest',
    clashDescription: 'Green wants to try an unusual idea; Red wants to follow standard steps; Purple wants more proof and research; Blue feels the conversation is too aggressive.',
    oneOnOneTip: 'When talking to Red, give 1-2-3 action points. When talking to Green, praise their creativity first. For Purple, give data. For Blue, check in warmly.',
    hatSequence: ['White (Facts & Info)', 'Yellow (What is Good About It)', 'Black (Risks & Concerns)', 'Blue (Agreed Decision)'],
    whyHatsWork: 'Everyone looks at the positives first (Yellow), then risks (Black), so no one feels personally attacked.'
  },
  {
    id: 'crisis-retro',
    title: 'Handling a Team Crisis Without Blame',
    tagline: 'Reviewing an urgent mistake or crisis without pointing fingers',
    iconName: 'AlertOctagon',
    clashDescription: 'Purple wants to investigate forever; Red wants quick rules and to move on; Blue worries people feel hurt or blamed; Green gets distracted proposing total overhauls.',
    oneOnOneTip: 'Make the room emotionally safe first so people speak honestly without fear of being blamed.',
    hatSequence: ['Blue (Meeting Goal)', 'White (What Happened / Facts)', 'Red (60s Honest Feelings)', 'Black (Real Gaps & Flaws)', 'Green (Solutions & Fixes)', 'Blue (Action Checklist)'],
    whyHatsWork: 'Gives time for facts (White), lets people express feelings safely (Red), and ends with clear action steps (Blue).'
  },
  {
    id: 'new-initiatives',
    title: 'Brainstorming New Initiatives',
    tagline: 'Kicking off new team projects, employee programs, or workplace improvements',
    iconName: 'Sparkles',
    clashDescription: 'Green throws out wild ideas; Red shoots them down as unrealistic; Purple questions whether we have proof; Blue worries the team will burn out.',
    oneOnOneTip: 'Let Green explore possibilities first, then help turn the best idea into realistic steps for Red.',
    hatSequence: ['Blue (Purpose & Goal)', 'White (Current Situation & Data)', 'Green (Creative Ideas)', 'Yellow (Best Opportunities)', 'Black (Budget & Time Risks)', 'Blue (Next Steps)'],
    whyHatsWork: 'Stops people from shooting down good ideas before they are even fully shared.'
  },
  {
    id: 'one-on-one',
    title: '1-on-1 Feedback & Goal Setting',
    tagline: 'A manager and team member discussing performance, expectations, and growth',
    iconName: 'UserCheck',
    clashDescription: 'A fast-moving Red manager dumping quick tasks on a Purple employee causes stress; a Purple manager handing piles of reading to a Green employee causes boredom.',
    oneOnOneTip: 'Always speak in the other person’s natural style so they feel comfortable and understood.',
    hatSequence: ['Blue (Conversation Purpose)', 'Red (How Both Feel Right Now)', 'Yellow (Wins & Strengths)', 'White (Clear Goals & Facts)', 'Blue (Agreed Action Items)'],
    whyHatsWork: 'Builds trust and open feelings first before discussing goals and accountability.'
  }
];
