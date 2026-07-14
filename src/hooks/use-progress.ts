import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "codecamp-progress-demo";

export interface ProgressRecord {
  completedLessons: string[];
  courseId: string;
  lastVisitedAt: string;
}

function readProgress(): Record<string, ProgressRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, ProgressRecord>) : {};
  } catch {
    return {};
  }
}

function writeProgress(progress: Record<string, ProgressRecord>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useProgress() {
  const [progress, setProgress] = useState<Record<string, ProgressRecord>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setHydrated(true);
  }, []);

  const completeLesson = useCallback((courseId: string, lessonId: string) => {
    setProgress((prev) => {
      const record = prev[courseId] || { completedLessons: [], courseId, lastVisitedAt: new Date().toISOString() };
      const next = {
        ...prev,
        [courseId]: {
          ...record,
          completedLessons: Array.from(new Set([...record.completedLessons, lessonId])),
          lastVisitedAt: new Date().toISOString(),
        },
      };
      writeProgress(next);
      return next;
    });
  }, []);

  const isLessonCompleted = useCallback(
    (courseId: string, lessonId: string) => {
      return progress[courseId]?.completedLessons.includes(lessonId) ?? false;
    },
    [progress],
  );

  const getCourseProgress = useCallback(
    (courseId: string, totalLessons: number) => {
      const completed = progress[courseId]?.completedLessons.length ?? 0;
      return totalLessons === 0 ? 0 : Math.round((completed / totalLessons) * 100);
    },
    [progress],
  );

  const getCompletedCount = useCallback(
    (courseId: string) => progress[courseId]?.completedLessons.length ?? 0,
    [progress],
  );

  return {
    progress,
    hydrated,
    completeLesson,
    isLessonCompleted,
    getCourseProgress,
    getCompletedCount,
  };
}
