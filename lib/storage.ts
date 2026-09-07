import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { AppState } from './types';

const KEY = 'zion-neuro-state-v1';
const PIN_KEY = 'zion-neuro-pin';
const PIN_FALLBACK = 'zion-neuro-pin-fallback';

export const defaultState: AppState = {
  profile: null,
  premium: false,
  lessons: {},
  quizzes: [],
  training: {},
  streak: 0,
  lastActive: '',
  aiDate: '',
  aiUsed: 0,
  challengeDate: '',
  settings: { analytics: false, personalizedTips: true },
};

export async function loadState(): Promise<AppState> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultState, ...parsed, settings: { ...defaultState.settings, ...(parsed.settings || {}) } };
    }
  } catch {}
  return defaultState;
}

export async function saveState(s: AppState): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
}

export async function setPin(pin: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(PIN_KEY, pin);
  } catch {
    try {
      await AsyncStorage.setItem(PIN_FALLBACK, pin);
    } catch {}
  }
}

export async function getPin(): Promise<string | null> {
  try {
    const v = await SecureStore.getItemAsync(PIN_KEY);
    if (v) return v;
  } catch {}
  try {
    return await AsyncStorage.getItem(PIN_FALLBACK);
  } catch {}
  return null;
}

export async function wipeAll(): Promise<void> {
  try {
    await AsyncStorage.removeMany([KEY, PIN_FALLBACK]);
  } catch {}
  try {
    await SecureStore.deleteItemAsync(PIN_KEY);
  } catch {}
}

export const todayStr = (): string => {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
};

export const yesterdayStr = (): string => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
};

export function dayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}
