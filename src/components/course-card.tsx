import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, Code2, Component, Layout, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Course } from "@/lib/courses-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout,
  Code2,
  Terminal,
  Component,
};

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export function CourseCard({ course, progress = 0 }: CourseCardProps) {
  const Icon = iconMap[course.icon] ?? Code2;

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: course.color }}
          >
            <Icon className="h-6 w-6" />
          </div>
          <Badge variant="secondary">{course.level}</Badge>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-tight text-foreground">{course.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <div className="flex flex-wrap gap-2">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.totalLessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.estimatedHours}h
          </span>
        </div>
        {progress > 0 && (
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full" variant={progress > 0 ? "secondary" : "default"}>
          <Link to="/courses/$courseId" params={{ courseId: course.id }}>
            {progress > 0 ? "Continue" : "Start Course"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
