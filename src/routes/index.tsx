import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle, Code2, Layers, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/courses-data";
import { useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeCamp Academy — Free Interactive Coding Courses" },
      { name: "description", content: "Learn programming for free with hands-on coding lessons, quizzes, and real-world projects." },
      { property: "og:title", content: "CodeCamp Academy — Free Interactive Coding Courses" },
      { property: "og:description", content: "Learn programming for free with hands-on coding lessons, quizzes, and real-world projects." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { getCourseProgress } = useProgress();
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="gradient-hero border-b">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                100% free, learn at your pace
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Learn to code by <span className="text-primary">building</span> real things.
              </h1>
              <p className="max-w-lg text-lg text-muted-foreground">
                Interactive lessons, hands-on challenges, quizzes, and projects. No enrollment fees, no physical
                classroom—just you and your code.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/courses">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/dashboard">View Dashboard</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Beginner friendly
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Interactive exercises
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Earn certificates
                </span>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="rounded-2xl border bg-card p-6 shadow-lg">
                <div className="flex items-center gap-2 border-b pb-3">
                  <div className="h-3 w-3 rounded-full bg-destructive" />
                  <div className="h-3 w-3 rounded-full bg-warning" />
                  <div className="h-3 w-3 rounded-full bg-success" />
                  <span className="ml-2 text-xs text-muted-foreground">index.html</span>
                </div>
                <pre className="mt-4 overflow-hidden rounded-lg bg-code p-4 font-mono text-sm text-code-foreground">
                  <code>{`<!DOCTYPE html>
<html lang="en">
  <body>
    <h1>Hello, CodeCamp!</h1>
    <p>Start your journey today.</p>
  </body>
</html>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Courses</h2>
            <p className="mt-2 text-muted-foreground">Pick a path and start building.</p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/courses">
              Browse all courses
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} progress={getCourseProgress(course.id, course.totalLessons)} />
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Feature icon={Code2} title="Hands-on Coding" description="Write real code in the browser and get instant feedback." />
            <Feature icon={Layers} title="Step-by-Step Lessons" description="Bite-sized concepts that build on each other logically." />
            <Feature icon={Trophy} title="Certificates" description="Earn certificates as you complete courses and projects." />
            <Feature icon={Users} title="Community" description="Join a community of learners and share your projects." />
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
