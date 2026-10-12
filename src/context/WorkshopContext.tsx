import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { ActionItem, CardItem, HatType, WorkshopStep } from '../types';
import { DAILY_RECIPES } from '../data/recipes';
import { SAMPLE_TEMPLATES } from '../data/sampleTemplates';

const STORAGE_KEY = 'six_hats_session_v1';

export interface WorkshopState {
  viewMode: 'playbook' | 'workspace';
  step: WorkshopStep;
  activeHat: HatType;
  topic: string;
  expectedOutcome: string;
  selectedRecipeId: string;
  isMatrixOpen: boolean;
  timer: {
    secondsRemaining: number;
    isRunning: boolean;
    presetSeconds: number;
  };
  cards: Record<HatType, CardItem[]>;
  actionItems: ActionItem[];
}

const defaultInitialCards: Record<HatType, CardItem[]> = {
  white: [],
  red: [],
  yellow: [],
  black: [],
  green: [],
  blue: []
};

const defaultState: WorkshopState = {
  viewMode: 'playbook',
  step: 1,
  activeHat: 'blue',
  topic: '',
  expectedOutcome: '',
  selectedRecipeId: 'quick-standup',
  isMatrixOpen: false,
  timer: {
    secondsRemaining: 180,
    isRunning: false,
    presetSeconds: 180
  },
  cards: defaultInitialCards,
  actionItems: []
};

type Action =
  | { type: 'SET_VIEW_MODE'; payload: 'playbook' | 'workspace' }
  | { type: 'SET_STEP'; payload: WorkshopStep }
  | { type: 'SET_ACTIVE_HAT'; payload: HatType }
  | { type: 'SET_TOPIC'; payload: { topic: string; expectedOutcome?: string } }
  | { type: 'SET_RECIPE'; payload: string }
  | { type: 'TOGGLE_MATRIX'; payload?: boolean }
  | { type: 'ADD_CARD'; payload: { hat: HatType; content: string; metadata?: CardItem['metadata'] } }
  | { type: 'DELETE_CARD'; payload: { hat: HatType; id: string } }
  | { type: 'VOTE_CARD'; payload: { hat: HatType; id: string } }
  | { type: 'ADD_ACTION_ITEM'; payload: Omit<ActionItem, 'id'> }
  | { type: 'UPDATE_ACTION_ITEM'; payload: ActionItem }
  | { type: 'DELETE_ACTION_ITEM'; payload: string }
  | { type: 'TIMER_SET'; payload: { seconds: number; isRunning?: boolean } }
  | { type: 'TIMER_TICK' }
  | { type: 'TIMER_TOGGLE' }
  | { type: 'TIMER_ADD_SECONDS'; payload: number }
  | { type: 'LOAD_TEMPLATE'; payload: string }
  | { type: 'RESET_SESSION' };

function workshopReducer(state: WorkshopState, action: Action): WorkshopState {
  switch (action.type) {
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };

    case 'SET_STEP':
      return { ...state, step: action.payload };

    case 'SET_ACTIVE_HAT': {
      const activeHat = action.payload;
      const recipe = DAILY_RECIPES.find(r => r.id === state.selectedRecipeId);
      const presetSeconds = recipe?.hatTimers[activeHat] || 180;
      return {
        ...state,
        activeHat,
        timer: {
          presetSeconds,
          secondsRemaining: presetSeconds,
          isRunning: false
        }
      };
    }

    case 'SET_TOPIC':
      return {
        ...state,
        topic: action.payload.topic,
        expectedOutcome: action.payload.expectedOutcome !== undefined ? action.payload.expectedOutcome : state.expectedOutcome
      };

    case 'SET_RECIPE': {
      const recipe = DAILY_RECIPES.find(r => r.id === action.payload);
      if (!recipe) return state;
      const initialHat = recipe.hatSequence[0] || 'blue';
      const preset = recipe.hatTimers[initialHat] || 180;
      return {
        ...state,
        selectedRecipeId: recipe.id,
        activeHat: initialHat,
        timer: {
          presetSeconds: preset,
          secondsRemaining: preset,
          isRunning: false
        }
      };
    }

    case 'TOGGLE_MATRIX':
      return {
        ...state,
        isMatrixOpen: action.payload !== undefined ? action.payload : !state.isMatrixOpen
      };

    case 'ADD_CARD': {
      const { hat, content, metadata } = action.payload;
      if (!content.trim()) return state;
      const newCard: CardItem = {
        id: `card-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        hat,
        content: content.trim(),
        votes: 0,
        createdAt: Date.now(),
        metadata
      };
      return {
        ...state,
        cards: {
          ...state.cards,
          [hat]: [newCard, ...state.cards[hat]]
        }
      };
    }

    case 'DELETE_CARD': {
      const { hat, id } = action.payload;
      return {
        ...state,
        cards: {
          ...state.cards,
          [hat]: state.cards[hat].filter(c => c.id !== id)
        }
      };
    }

    case 'VOTE_CARD': {
      const { hat, id } = action.payload;
      return {
        ...state,
        cards: {
          ...state.cards,
          [hat]: state.cards[hat].map(c => c.id === id ? { ...c, votes: c.votes + 1 } : c)
        }
      };
    }

    case 'ADD_ACTION_ITEM': {
      const newItem: ActionItem = {
        id: `action-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        ...action.payload
      };
      return {
        ...state,
        actionItems: [...state.actionItems, newItem]
      };
    }

    case 'UPDATE_ACTION_ITEM': {
      return {
        ...state,
        actionItems: state.actionItems.map(item => item.id === action.payload.id ? action.payload : item)
      };
    }

    case 'DELETE_ACTION_ITEM': {
      return {
        ...state,
        actionItems: state.actionItems.filter(item => item.id !== action.payload)
      };
    }

    case 'TIMER_SET':
      return {
        ...state,
        timer: {
          ...state.timer,
          secondsRemaining: action.payload.seconds,
          presetSeconds: action.payload.seconds,
          isRunning: action.payload.isRunning ?? state.timer.isRunning
        }
      };

    case 'TIMER_TICK':
      if (!state.timer.isRunning || state.timer.secondsRemaining <= 0) {
        return state;
      }
      return {
        ...state,
        timer: {
          ...state.timer,
          secondsRemaining: state.timer.secondsRemaining - 1,
          isRunning: state.timer.secondsRemaining - 1 > 0
        }
      };

    case 'TIMER_TOGGLE':
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: !state.timer.isRunning
        }
      };

    case 'TIMER_ADD_SECONDS':
      return {
        ...state,
        timer: {
          ...state.timer,
          secondsRemaining: state.timer.secondsRemaining + action.payload
        }
      };

    case 'LOAD_TEMPLATE': {
      const tmpl = SAMPLE_TEMPLATES.find(t => t.id === action.payload);
      if (!tmpl) return state;

      const loadedCards: Record<HatType, CardItem[]> = {
        white: [],
        red: [],
        yellow: [],
        black: [],
        green: [],
        blue: []
      };

      (Object.keys(tmpl.sampleCards) as HatType[]).forEach(hat => {
        loadedCards[hat] = tmpl.sampleCards[hat].map((c, idx) => ({
          id: `tmpl-${hat}-${idx}-${Date.now()}`,
          hat,
          content: c.content,
          votes: 0,
          createdAt: Date.now(),
          metadata: c.metadata
        }));
      });

      return {
        ...state,
        topic: tmpl.topic,
        expectedOutcome: tmpl.expectedOutcome,
        selectedRecipeId: tmpl.recommendedRecipeId,
        cards: loadedCards,
        actionItems: tmpl.sampleActions || [],
        viewMode: 'workspace',
        step: 2
      };
    }

    case 'RESET_SESSION':
      return { ...defaultState, viewMode: state.viewMode };

    default:
      return state;
  }
}

interface WorkshopContextType {
  state: WorkshopState;
  actions: {
    setViewMode: (mode: 'playbook' | 'workspace') => void;
    setStep: (step: WorkshopStep) => void;
    setActiveHat: (hat: HatType) => void;
    setTopic: (topic: string, expectedOutcome?: string) => void;
    setRecipe: (recipeId: string) => void;
    toggleMatrix: (open?: boolean) => void;
    addCard: (card: { hat: HatType; content: string; metadata?: CardItem['metadata'] }) => void;
    deleteCard: (hat: HatType, id: string) => void;
    voteCard: (hat: HatType, id: string) => void;
    addActionItem: (item: Omit<ActionItem, 'id'>) => void;
    updateActionItem: (item: ActionItem) => void;
    deleteActionItem: (id: string) => void;
    toggleTimer: () => void;
    addTimerSeconds: (sec: number) => void;
    setTimerSeconds: (sec: number) => void;
    loadTemplate: (templateId: string) => void;
    resetSession: () => void;
  };
}

const WorkshopContext = createContext<WorkshopContextType | null>(null);

export const WorkshopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(workshopReducer, defaultState, (initial) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...initial, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return initial;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota errors
    }
  }, [state]);

  // Interval timer tick
  useEffect(() => {
    if (!state.timer.isRunning) return;
    const interval = setInterval(() => {
      dispatch({ type: 'TIMER_TICK' });
    }, 1000);
    return () => clearInterval(interval);
  }, [state.timer.isRunning]);

  const actions = {
    setViewMode: (mode: 'playbook' | 'workspace') => dispatch({ type: 'SET_VIEW_MODE', payload: mode }),
    setStep: (step: WorkshopStep) => dispatch({ type: 'SET_STEP', payload: step }),
    setActiveHat: (hat: HatType) => dispatch({ type: 'SET_ACTIVE_HAT', payload: hat }),
    setTopic: (topic: string, expectedOutcome?: string) => dispatch({ type: 'SET_TOPIC', payload: { topic, expectedOutcome } }),
    setRecipe: (recipeId: string) => dispatch({ type: 'SET_RECIPE', payload: recipeId }),
    toggleMatrix: (open?: boolean) => dispatch({ type: 'TOGGLE_MATRIX', payload: open }),
    addCard: (card: { hat: HatType; content: string; metadata?: CardItem['metadata'] }) => dispatch({ type: 'ADD_CARD', payload: card }),
    deleteCard: (hat: HatType, id: string) => dispatch({ type: 'DELETE_CARD', payload: { hat, id } }),
    voteCard: (hat: HatType, id: string) => dispatch({ type: 'VOTE_CARD', payload: { hat, id } }),
    addActionItem: (item: Omit<ActionItem, 'id'>) => dispatch({ type: 'ADD_ACTION_ITEM', payload: item }),
    updateActionItem: (item: ActionItem) => dispatch({ type: 'UPDATE_ACTION_ITEM', payload: item }),
    deleteActionItem: (id: string) => dispatch({ type: 'DELETE_ACTION_ITEM', payload: id }),
    toggleTimer: () => dispatch({ type: 'TIMER_TOGGLE' }),
    addTimerSeconds: (sec: number) => dispatch({ type: 'TIMER_ADD_SECONDS', payload: sec }),
    setTimerSeconds: (sec: number) => dispatch({ type: 'TIMER_SET', payload: { seconds: sec } }),
    loadTemplate: (templateId: string) => dispatch({ type: 'LOAD_TEMPLATE', payload: templateId }),
    resetSession: () => dispatch({ type: 'RESET_SESSION' })
  };

  return (
    <WorkshopContext.Provider value={{ state, actions }}>
      {children}
    </WorkshopContext.Provider>
  );
};

export function useWorkshop() {
  const context = useContext(WorkshopContext);
  if (!context) {
    throw new Error('useWorkshop must be used within a WorkshopProvider');
  }
  return context;
}
