import { Link } from "@tanstack/react-router";
import { Check, FileCode, FileQuestion, FileText, FolderGit2, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course, Lesson } from "@/lib/courses-data";

const typeIcons: Record<Lesson["type"], React.ComponentType<{ className?: string }>> = {
  reading: FileText,
  code: FileCode,
  quiz: FileQuestion,
  project: FolderGit2,
};

interface LessonListProps {
  course: Course;
  completedLessonIds: string[];
  currentLessonId?: string;
}

export function LessonList({ course, completedLessonIds, currentLessonId }: LessonListProps) {
  return (
    <div className="space-y-2">
      {course.lessons.map((lesson, index) => {
        const completed = completedLessonIds.includes(lesson.id);
        const active = currentLessonId === lesson.id;
        const Icon = typeIcons[lesson.type];

        return (
          <Link
            key={lesson.id}
            to="/courses/$courseId/lessons/$lessonId"
            params={{ courseId: course.id, lessonId: lesson.id }}
            className={`group flex items-center gap-3 rounded-lg border p-3 transition-colors ${
              active
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/30 hover:bg-accent"
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                completed
                  ? "bg-success text-success-foreground"
                  : active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {completed ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className={`truncate text-sm font-medium ${active ? "text-primary" : "text-foreground"}`}>
                  {lesson.title}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{lesson.duration}</span>
            </div>
            {active && <Play className="h-4 w-4 shrink-0 text-primary" />}
            {completed && !active && <Check className="h-4 w-4 shrink-0 text-success" />}
          </Link>
        );
      })}
    </div>
  );
}
