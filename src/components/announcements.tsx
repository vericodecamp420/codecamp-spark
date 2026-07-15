import { Megaphone, Sparkles, Bug, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Announcement {
  id: string;
  date: string;
  tag: "New" | "Update" | "Fix";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const announcements: Announcement[] = [
  {
    id: "c-course",
    date: "Jul 15, 2026",
    tag: "New",
    icon: BookOpen,
    title: "New course: C Programming",
    description: "Learn the fundamentals of C — variables, pointers, loops, and functions.",
  },
  {
    id: "smart-feedback",
    date: "Jul 15, 2026",
    tag: "Update",
    icon: Sparkles,
    title: "Smarter code feedback",
    description:
      "Coding exercises now tell you exactly what's missing in your output and how to fix it.",
  },
  {
    id: "accounts",
    date: "Jul 15, 2026",
    tag: "New",
    icon: Megaphone,
    title: "Local sign-in is here",
    description: "Create a local username to personalize your dashboard and track progress.",
  },
  {
    id: "rebrand",
    date: "Jul 15, 2026",
    tag: "Fix",
    icon: Bug,
    title: "Rebranded to VeriCodeCamp",
    description: "New name, same free hands-on learning platform.",
  },
];

const tagStyles: Record<Announcement["tag"], string> = {
  New: "bg-success/15 text-success border-success/30",
  Update: "bg-primary/15 text-primary border-primary/30",
  Fix: "bg-warning/15 text-warning-foreground border-warning/30",
};

export function Announcements() {
  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Megaphone className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Recent Announcements
            </h2>
            <p className="text-sm text-muted-foreground">What's new at VeriCodeCamp</p>
          </div>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2">
          {announcements.map((a) => {
            const Icon = a.icon;
            return (
              <li
                key={a.id}
                className="rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground">
                      <Icon className="h-4 w-4" />
                    </div>
                    <Badge variant="outline" className={tagStyles[a.tag]}>
                      {a.tag}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{a.date}</span>
                </div>
                <h3 className="mt-3 font-semibold text-foreground">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
