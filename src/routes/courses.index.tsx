import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/courses-data";
import { useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "All Courses — CodeCamp Academy" },
      { name: "description", content: "Browse free interactive coding courses on HTML, CSS, JavaScript, Python, React, and more." },
      { property: "og:title", content: "All Courses — CodeCamp Academy" },
      { property: "og:description", content: "Browse free interactive coding courses on HTML, CSS, JavaScript, Python, React, and more." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const { getCourseProgress } = useProgress();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <Badge variant="secondary" className="mb-3">
          <BookOpen className="mr-1 h-3.5 w-3.5" />
          {courses.length} courses available
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Explore our curriculum</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Choose a topic and start learning with interactive lessons, quizzes, and real-world projects.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} progress={getCourseProgress(course.id, course.totalLessons)} />
        ))}
      </div>
    </div>
  );
}
