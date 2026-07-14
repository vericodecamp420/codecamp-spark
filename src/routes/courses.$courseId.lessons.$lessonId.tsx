import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle, FileCode, FileQuestion, FileText, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LessonList } from "@/components/lesson-list";
import { CodePlayground } from "@/components/code-playground";
import { Quiz } from "@/components/quiz";
import { courses, getCourseById, getLessonById, getNextLesson, getPrevLesson } from "@/lib/courses-data";
import { useProgress } from "@/hooks/use-progress";
import type { Lesson } from "@/lib/courses-data";

export const Route = createFileRoute("/courses/$courseId/lessons/$lessonId")({
  head: ({ params }) => {
    const course = getCourseById(params.courseId);
    const lesson = course ? getLessonById(course, params.lessonId) : undefined;
    return {
      meta: [
        { title: lesson ? `${lesson.title} — ${course?.title}` : "Lesson — CodeCamp Academy" },
        { name: "description", content: lesson?.description ?? "Interactive coding lesson" },
      ],
    };
  },
  loader: ({ params }) => {
    const course = getCourseById(params.courseId);
    if (!course) throw notFound();
    const lesson = getLessonById(course, params.lessonId);
    if (!lesson) throw notFound();
    return { course, lesson };
  },
  notFoundComponent: () => <div className="p-8 text-center">Lesson not found.</div>,
  component: LessonPage,
});

const typeLabels: Record<string, string> = {
  reading: "Reading",
  code: "Coding Exercise",
  quiz: "Quiz",
  project: "Project",
};

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  reading: FileText,
  code: FileCode,
  quiz: FileQuestion,
  project: FolderGit2,
};

function LessonPage() {
  const { course, lesson } = Route.useLoaderData();
  const { isLessonCompleted, completeLesson } = useProgress();
  const completed = isLessonCompleted(course.id, lesson.id);
  const nextLesson = getNextLesson(course, lesson.id);
  const prevLesson = getPrevLesson(course, lesson.id);
  const TypeIcon = typeIcons[lesson.type];

  function markComplete() {
    completeLesson(course.id, lesson.id);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/courses/$courseId" params={{ courseId: course.id }}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            {course.title}
          </Link>
        </Button>
        <Separator orientation="vertical" className="hidden h-4 sm:block" />
        <Badge variant="outline" className="gap-1">
          <TypeIcon className="h-3.5 w-3.5" />
          {typeLabels[lesson.type]}
        </Badge>
        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border bg-card p-6 sm:p-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{lesson.title}</h1>
            <p className="mt-2 text-muted-foreground">{lesson.description}</p>

            <article className="prose prose-slate mt-6 max-w-none">
              <ContentBlocks content={lesson.content} />
            </article>

            {lesson.type === "reading" && (
              <Button onClick={markComplete} className="mt-8 w-full" size="lg" disabled={completed}>
                {completed ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Completed
                  </>
                ) : (
                  "Mark as Complete"
                )}
              </Button>
            )}

            {lesson.type === "code" && (
              <div className="mt-8">
                <CodePlayground lesson={lesson} onComplete={markComplete} />
              </div>
            )}

            {lesson.type === "quiz" && (
              <div className="mt-8">
                <Quiz lesson={lesson} onComplete={markComplete} />
              </div>
            )}

            {lesson.type === "project" && (
              <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
                <FolderGit2 className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-3 font-semibold text-foreground">Project Brief</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Work on this project in your local editor. When you're ready, mark it complete to track your progress.
                </p>
                <Button onClick={markComplete} className="mt-4" disabled={completed}>
                  {completed ? "Project Submitted" : "Submit Project"}
                </Button>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between">
            {prevLesson ? (
              <Button variant="outline" asChild>
                <Link
                  to="/courses/$courseId/lessons/$lessonId"
                  params={{ courseId: course.id, lessonId: prevLesson.id }}
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Previous
                </Link>
              </Button>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <Button asChild>
                <Link
                  to="/courses/$courseId/lessons/$lessonId"
                  params={{ courseId: course.id, lessonId: nextLesson.id }}
                >
                  Next
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/courses/$courseId" params={{ courseId: course.id }}>
                  Back to Course
                </Link>
              </Button>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 font-semibold text-foreground">Course Lessons</h2>
            <LessonList
              course={course}
              completedLessonIds={course.lessons
                .filter((l: { id: string }) => isLessonCompleted(course.id, l.id))
                .map((l: { id: string }) => l.id)}
              currentLessonId={lesson.id}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

function ContentBlocks({ content }: { content: string }) {
  const blocks = content.split("\n\n");
  return (
    <>
      {blocks.map((block, index) => {
        const isCode = block.trim().startsWith("<") || block.trim().startsWith("`");
        if (isCode) {
          return (
            <pre key={index} className="my-4 overflow-x-auto rounded-lg bg-code p-4 font-mono text-sm text-code-foreground">
              <code>{block.replace(/`/g, "")}</code>
            </pre>
          );
        }
        return (
          <p key={index} className="leading-7 text-foreground">
            {block}
          </p>
        );
      })}
    </>
  );
}
