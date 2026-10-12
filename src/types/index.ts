export type HatType = 'white' | 'red' | 'yellow' | 'black' | 'green' | 'blue';

export type WorkshopStep = 1 | 2 | 3 | 4;

export interface CardItem {
  id: string;
  hat: HatType;
  content: string;
  author?: string;
  votes: number;
  createdAt: number;
  metadata?: {
    riskSeverity?: 'low' | 'medium' | 'high';
    sentimentTone?: 'positive' | 'skeptical' | 'neutral';
  };
}

export interface ActionItem {
  id: string;
  task: string;
  owner: string;
  dueDate: string;
  status: 'todo' | 'in_progress' | 'done';
}

export interface HatInfo {
  id: HatType;
  name: string;
  title: string;
  badge: string;
  primaryColor: string;
  bgTint: string;
  borderColor: string;
  textColor: string;
  question: string;
  summary: string;
  goldenRule: string;
  dos: string[];
  donts: string[];
}

export interface DailyRecipe {
  id: string;
  name: string;
  durationMinutes: number;
  tagline: string;
  description: string;
  hatSequence: HatType[];
  hatTimers: Record<HatType, number>;
}

export interface SampleTemplate {
  id: string;
  title: string;
  topic: string;
  expectedOutcome: string;
  recommendedRecipeId: string;
  sampleCards: Record<HatType, Array<{ content: string; metadata?: CardItem['metadata'] }>>;
  sampleActions?: ActionItem[];
}
