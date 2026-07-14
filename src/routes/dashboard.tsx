import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BookOpen, Clock, Flame, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/progress-ring";
import { courses } from "@/lib/courses-data";
import { useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CodeCamp Academy" },
      { name: "description", content: "Track your learning progress, streaks, and earned certificates." },
      { property: "og:title", content: "Dashboard — CodeCamp Academy" },
      { property: "og:description", content: "Track your learning progress, streaks, and earned certificates." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { getCourseProgress, getCompletedCount, hydrated } = useProgress();

  const totalLessons = courses.reduce((sum, c) => sum + c.totalLessons, 0);
  const completedLessons = courses.reduce((sum, c) => sum + getCompletedCount(c.id), 0);
  const overallProgress = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  const inProgressCourses = courses.filter((c) => getCourseProgress(c.id, c.totalLessons) > 0);
  const completedCourses = courses.filter((c) => getCourseProgress(c.id, c.totalLessons) === 100);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="h-96 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Your Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Track your progress, keep your streak alive, and earn certificates.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpen} label="Lessons Completed" value={completedLessons} />
        <StatCard icon={Clock} label="Total Courses" value={courses.length} />
        <StatCard icon={Flame} label="Day Streak" value={3} />
        <StatCard icon={Trophy} label="Certificates" value={completedCourses.length} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <ProgressRing value={overallProgress} size={140} strokeWidth={12} />
              <div className="flex-1 space-y-4">
                <p className="text-muted-foreground">
                  You've completed <span className="font-semibold text-foreground">{completedLessons}</span> of{" "}
                  <span className="font-semibold text-foreground">{totalLessons}</span> lessons across all courses.
                </p>
                <Progress value={overallProgress} className="h-3" />
                <Button asChild>
                  <Link to="/courses">Continue Learning</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Achievement title="First Steps" description="Complete your first lesson" unlocked={completedLessons > 0} />
            <Achievement title="Halfway There" description="Complete 50% of a course" unlocked={courses.some((c) => getCourseProgress(c.id, c.totalLessons) >= 50)} />
            <Achievement title="Course Graduate" description="Complete any full course" unlocked={completedCourses.length > 0} />
            <Achievement title="Dedicated Learner" description="Maintain a 3-day streak" unlocked />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Continue Learning</h2>
        {inProgressCourses.length === 0 ? (
          <Card className="p-8 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="mt-3 font-semibold text-foreground">No courses in progress</h3>
            <p className="mt-1 text-sm text-muted-foreground">Pick a course and start learning today.</p>
            <Button className="mt-4" asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inProgressCourses.map((course) => {
              const progress = getCourseProgress(course.id, course.totalLessons);
              const nextLesson = course.lessons.find((l) => !getCourseProgress(course.id, course.totalLessons)) ?? course.lessons[0];
              return (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <Button asChild className="w-full">
                      <Link to="/courses/$courseId/lessons/$lessonId" params={{ courseId: course.id, lessonId: nextLesson?.id ?? course.lessons[0].id }}>
                        Continue
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {completedCourses.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Certificates</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completedCourses.map((course) => (
              <Card key={course.id} className="border-success/30 bg-success/5">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-success-foreground">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">Certificate earned</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Achievement({
  title,
  description,
  unlocked,
}: {
  title: string;
  description: string;
  unlocked: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 rounded-lg border p-3 ${unlocked ? "border-success/30 bg-success/5" : "border-border bg-card"}`}>
      <Trophy className={`h-5 w-5 ${unlocked ? "text-success" : "text-muted-foreground"}`} />
      <div>
        <p className={`text-sm font-medium ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
