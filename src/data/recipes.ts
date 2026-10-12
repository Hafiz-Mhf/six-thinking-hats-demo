import { DailyRecipe } from '../types';

export const DAILY_RECIPES: DailyRecipe[] = [
  {
    id: 'quick-standup',
    name: 'Quick Standup Dilemma',
    durationMinutes: 15,
    tagline: 'Rapid alignment on a sudden blocker or team choice',
    description: 'Perfect for morning standups or unblocking a PR review when opinions differ.',
    hatSequence: ['blue', 'red', 'yellow', 'black', 'red', 'blue'],
    hatTimers: {
      blue: 120,
      red: 60,
      yellow: 180,
      black: 180,
      green: 120,
      white: 120
    }
  },
  {
    id: 'sprint-retro',
    name: 'Sprint Retrospective / Post-Mortem',
    durationMinutes: 45,
    tagline: 'Reviewing past cycles or incidents with emotional honesty and safety',
    description: 'Unpack facts, clear emotional friction, celebrate wins, and fix root vulnerabilities.',
    hatSequence: ['blue', 'white', 'red', 'yellow', 'black', 'green', 'blue'],
    hatTimers: {
      blue: 180,
      white: 300,
      red: 120,
      yellow: 300,
      black: 360,
      green: 360
    }
  },
  {
    id: 'creative-brainstorm',
    name: 'New Feature / Creative Brainstorm',
    durationMinutes: 30,
    tagline: 'Generating breakthrough ideas without immediate critical dismissal',
    description: 'Separates idea generation from risk evaluation so creative momentum is not killed.',
    hatSequence: ['blue', 'white', 'green', 'yellow', 'black', 'blue'],
    hatTimers: {
      blue: 120,
      white: 240,
      green: 420,
      yellow: 300,
      black: 300,
      red: 60
    }
  },
  {
    id: 'risk-architecture',
    name: 'Risk & Architecture Review',
    durationMinutes: 30,
    tagline: 'Stress-testing technical designs, migrations, and major changes',
    description: 'Systematically examines advantages, operational risks, and contingency measures.',
    hatSequence: ['blue', 'white', 'yellow', 'black', 'blue'],
    hatTimers: {
      blue: 120,
      white: 300,
      yellow: 360,
      black: 480,
      green: 180,
      red: 60
    }
  }
];
