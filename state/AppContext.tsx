import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, GameId, LessonProgress, Profile, QuizRecord } from '../lib/types';
import { defaultState, loadState, saveState, todayStr, yesterdayStr, wipeAll } from '../lib/storage';

interface AppContextValue {
  state: AppState;
  hydrated: boolean;
  setProfile: (p: Profile) => void;
  setPremium: (v: boolean) => void;
  recordQuiz: (r: QuizRecord) => void;
  markLessonRead: (lessonId: string) => void;
  recordLessonQuiz: (lessonId: string, score: number) => void;
  recordTraining: (gameId: GameId, score: number) => void;
  completeChallenge: () => void;
  consumeAiMessage: () => boolean;
  updateSettings: (s: Partial<AppState['settings']>) => void;
  resetAll: () => Promise<void>;
  exportData: () => string;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    loadState().then((s) => {
      setState(s);
      loaded.current = true;
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (loaded.current) saveState(state);
  }, [state]);

  const touchStreak = useCallback((s: AppState): AppState => {
    const today = todayStr();
    if (s.lastActive === today) return s;
    const streak = s.lastActive === yesterdayStr() ? s.streak + 1 : 1;
    return { ...s, streak, lastActive: today };
  }, []);

  const setProfile = useCallback((p: Profile) => {
    setState((s) => touchStreak({ ...s, profile: p }));
  }, [touchStreak]);

  const setPremium = useCallback((v: boolean) => {
    setState((s) => ({ ...s, premium: v, premiumSince: v ? Date.now() : undefined }));
  }, []);

  const recordQuiz = useCallback((r: QuizRecord) => {
    setState((s) => touchStreak({ ...s, quizzes: [...s.quizzes, r] }));
  }, [touchStreak]);

  const markLessonRead = useCallback((lessonId: string) => {
    setState((s) => {
      const prev: LessonProgress = s.lessons[lessonId] || {};
      if (prev.read) return s;
      return touchStreak({ ...s, lessons: { ...s.lessons, [lessonId]: { ...prev, read: true } } });
    });
  }, [touchStreak]);

  const recordLessonQuiz = useCallback((lessonId: string, score: number) => {
    setState((s) => {
      const prev: LessonProgress = s.lessons[lessonId] || {};
      const best = Math.max(prev.quizScore ?? 0, score);
      const completed = best >= 60 ? Date.now() : prev.completedAt;
      return touchStreak({
        ...s,
        lessons: { ...s.lessons, [lessonId]: { ...prev, quizScore: best, completedAt: completed } },
      });
    });
  }, [touchStreak]);

  const recordTraining = useCallback((gameId: GameId, score: number) => {
    setState((s) => {
      const prev = s.training[gameId] || { best: 0, plays: 0, lastScore: 0 };
      return touchStreak({
        ...s,
        training: {
          ...s.training,
          [gameId]: { best: Math.max(prev.best, score), plays: prev.plays + 1, lastScore: score },
        },
      });
    });
  }, [touchStreak]);

  const completeChallenge = useCallback(() => {
    setState((s) => touchStreak({ ...s, challengeDate: todayStr() }));
  }, [touchStreak]);

  const consumeAiMessage = useCallback((): boolean => {
    const today = todayStr();
    const usedToday = state.aiDate === today ? state.aiUsed : 0;
    const allowed = state.premium || usedToday < FREE_AI_DAILY_LIMIT;
    if (allowed) {
      setState((s) => {
        const used = s.aiDate === today ? s.aiUsed : 0;
        return { ...s, aiDate: today, aiUsed: used + 1 };
      });
    }
    return allowed;
  }, [state.premium, state.aiDate, state.aiUsed]);

  const updateSettings = useCallback((partial: Partial<AppState['settings']>) => {
    setState((s) => ({ ...s, settings: { ...s.settings, ...partial } }));
  }, []);

  const resetAll = useCallback(async () => {
    loaded.current = false;
    setState(defaultState);
    try {
      await wipeAll();
    } catch {}
    loaded.current = true;
  }, []);

  const exportData = useCallback(() => JSON.stringify(state, null, 2), [state]);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      hydrated,
      setProfile,
      setPremium,
      recordQuiz,
      markLessonRead,
      recordLessonQuiz,
      recordTraining,
      completeChallenge,
      consumeAiMessage,
      updateSettings,
      resetAll,
      exportData,
    }),
    [state, hydrated, setProfile, setPremium, recordQuiz, markLessonRead, recordLessonQuiz, recordTraining, completeChallenge, consumeAiMessage, updateSettings, resetAll, exportData]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export const FREE_AI_DAILY_LIMIT = 5;
