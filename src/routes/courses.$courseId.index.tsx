import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Clock, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LessonList } from "@/components/lesson-list";
import { courses, getCourseById } from "@/lib/courses-data";
import { useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/courses/$courseId/")({
  head: ({ params }) => {
    const course = getCourseById(params.courseId);
    return {
      meta: [
        { title: course ? `${course.title} — CodeCamp Academy` : "Course — CodeCamp Academy" },
        { name: "description", content: course?.description ?? "Course details" },
        { property: "og:title", content: course?.title ?? "Course" },
        { property: "og:description", content: course?.description ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const course = getCourseById(params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  notFoundComponent: () => <div className="p-8 text-center">Course not found.</div>,
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { course } = Route.useLoaderData();
  const { isLessonCompleted, getCourseProgress, getCompletedCount } = useProgress();
  const progress = getCourseProgress(course.id, course.totalLessons);
  const completedCount = getCompletedCount(course.id);
  const firstLessonId = course.lessons[0]?.id;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Button variant="ghost" asChild className="mb-6 -ml-4">
        <Link to="/courses">
          <ArrowLeft className="mr-1 h-4 w-4" />
          All courses
        </Link>
      </Button>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">{course.level}</Badge>
            <Badge variant="outline">{course.category}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{course.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{course.longDescription}</p>

          <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              {course.totalLessons} lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {course.estimatedHours} hours
            </span>
            <span className="flex items-center gap-1.5">
              <PlayCircle className="h-4 w-4" />
              {completedCount} / {course.totalLessons} completed
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {firstLessonId && (
              <Button asChild size="lg">
                <Link to="/courses/$courseId/lessons/$lessonId" params={{ courseId: course.id, lessonId: firstLessonId }}>
                  {progress > 0 ? "Continue Learning" : "Start Course"}
                </Link>
              </Button>
            )}
            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">View Progress</Link>
            </Button>
          </div>

          <div className="mt-10 rounded-2xl border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground">What you'll learn</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {course.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="px-3 py-1 text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Course Progress</h2>
              <span className="text-sm font-medium text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2.5" />
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 font-semibold text-foreground">Lessons</h2>
            <LessonList
              course={course}
              completedLessonIds={course.lessons
                .filter((l: { id: string }) => isLessonCompleted(course.id, l.id))
                .map((l: { id: string }) => l.id)}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
