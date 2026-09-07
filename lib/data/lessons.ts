import { Category, Lesson } from '../types';
import { CATEGORIES, CORE_LESSONS } from './lessons-core';
import { ADVANCED_LESSONS } from './lessons-advanced';

export const LESSONS: Lesson[] = [...CORE_LESSONS, ...ADVANCED_LESSONS];

export { CATEGORIES };

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function lessonsInCategory(categoryId: string): Lesson[] {
  return LESSONS.filter((l) => l.categoryId === categoryId);
}

export function lessonNumber(id: string): number {
  return LESSONS.findIndex((l) => l.id === id) + 1;
}

export const TOTAL_LESSONS = LESSONS.length;
