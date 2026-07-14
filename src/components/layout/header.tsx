import { Link, useRouterState } from "@tanstack/react-router";
import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Courses", to: "/courses" },
  { label: "Dashboard", to: "/dashboard" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Code2 className="h-5 w-5" />
          </div>
          <span className="text-lg tracking-tight">CodeCamp</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Button
                key={item.to}
                variant="ghost"
                asChild
                className={active ? "bg-accent text-accent-foreground" : undefined}
              >
                <Link to={item.to}>{item.label}</Link>
              </Button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link to="/dashboard">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/courses">Start Learning</Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen((v) => !v)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Button key={item.to} variant="ghost" asChild className="justify-start" onClick={() => setMobileOpen(false)}>
                <Link to={item.to}>{item.label}</Link>
              </Button>
            ))}
            <Button asChild className="mt-2" onClick={() => setMobileOpen(false)}>
              <Link to="/courses">Start Learning</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
