export type BrainColor = 'purple' | 'red' | 'green' | 'blue';

export interface BrainArchetype {
  id: BrainColor;
  name: string;
  avatarName: string;
  roleTitle: string;
  primaryColor: string;
  bgTint: string;
  borderColor: string;
  textColor: string;
  summary: string;
  superpower: string;
  kryptonite: string;
  communicationTip: string;
}

export interface DiagnosticOption {
  color: BrainColor;
  label: string;
  subtext: string;
}

export interface DiagnosticScenario {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  options: DiagnosticOption[];
}

export interface WorkplaceScenario {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  clashDescription: string;
  oneOnOneTip: string;
  hatSequence: string[];
  whyHatsWork: string;
}
