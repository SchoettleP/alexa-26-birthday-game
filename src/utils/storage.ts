import type { HuntProgress } from '../types/hunt';

const STORAGE_KEY = 'alexa_26_birthday_hunt_v1';

export const initialProgress: HuntProgress = {
  currentStationIndex: 0,
  isStarted: false,
  isCompleted: false,
  quizSolvedForStation: {},
  usedHintsForStation: {},
  photos: {},
  history: []
};

export function loadProgress(): HuntProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialProgress;
    const parsed = JSON.parse(raw);
    return { ...initialProgress, ...parsed, photos: parsed.photos || {} };
  } catch {
    return initialProgress;
  }
}

export function saveProgress(progress: HuntProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save hunt progress to localStorage', err);
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear progress', err);
  }
}
