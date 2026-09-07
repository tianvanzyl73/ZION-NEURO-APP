export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export type DiagramKind =
  | 'neuron'
  | 'actionPotential'
  | 'synapse'
  | 'lobes'
  | 'limbic'
  | 'cns'
  | 'memory'
  | 'yerkes'
  | 'flow'
  | 'eeg'
  | 'attention'
  | 'habit'
  | 'sleep'
  | 'reaction';

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  explain?: string;
}

export interface LessonSection {
  heading: string;
  text: string;
}

export interface Lesson {
  id: string;
  categoryId: string;
  title: string;
  level: Level;
  minutes: number;
  summary: string;
  diagram?: DiagramKind;
  sections: LessonSection[];
  keyFacts: string[];
  example: string;
  quiz: QuizQuestion[];
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  level: Level;
  blurb: string;
}

export type AssessmentKind = 'lr' | 'temperament' | 'bigfive' | 'index';

export type AssessmentItem =
  | { type: 'tagged'; prompt: string; options: { text: string; tag: string }[] }
  | { type: 'likert'; prompt: string; trait: string; reverse?: boolean };

export interface Assessment {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  kind: AssessmentKind;
  minutes: number;
  disclaimer: string;
  items: AssessmentItem[];
}

export interface Profile {
  name: string;
  age: string;
  goals: string[];
  occupation: string;
  interests: string[];
  createdAt: number;
}

export interface QuizRecord {
  id: string;
  date: number;
  kind: string;
  title: string;
  score: number;
  label?: string;
  summary?: string;
  detail?: Record<string, number>;
}

export interface LessonProgress {
  read?: boolean;
  quizScore?: number;
  completedAt?: number;
}

export type GameId = 'reaction' | 'stroop' | 'sequence' | 'grid';

export interface TrainingStat {
  best: number;
  plays: number;
  lastScore: number;
}

export interface AppSettings {
  analytics: boolean;
  personalizedTips: boolean;
}

export interface AppState {
  profile: Profile | null;
  premium: boolean;
  premiumSince?: number;
  lessons: Record<string, LessonProgress>;
  quizzes: QuizRecord[];
  training: Partial<Record<GameId, TrainingStat>>;
  streak: number;
  lastActive: string;
  aiDate: string;
  aiUsed: number;
  challengeDate: string;
  settings: AppSettings;
}

export type RootStackParamList = {
  Tabs: undefined;
  Onboarding: undefined;
  Lock: undefined;
  Category: { id: string };
  Lesson: { id: string };
  Quiz: { assessmentId: string };
  LessonQuiz: { lessonId: string };
  Result: { recordId: string };
  Game: { id: GameId };
  Assistant: undefined;
  Premium: undefined;
  Settings: undefined;
  BrainProfile: undefined;
  Sports: undefined;
  You: undefined;
};
