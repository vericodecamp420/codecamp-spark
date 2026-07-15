import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Code2, LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Courses", to: "/courses" },
  { label: "Dashboard", to: "/dashboard" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, isAuthenticated, hydrated, logout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    logout();
    navigate({ to: "/" });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Code2 className="h-5 w-5" />
          </div>
          <span className="text-lg tracking-tight">VeriCodeCamp</span>
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
          {hydrated && isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                  {user.username}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Signed in</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" asChild>
              <Link to="/login">
                <LogIn className="mr-1 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}
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
            {hydrated && isAuthenticated ? (
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => {
                  setMobileOpen(false);
                  handleSignOut();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out ({user?.username})
              </Button>
            ) : (
              <Button variant="outline" asChild className="justify-start" onClick={() => setMobileOpen(false)}>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
            <Button asChild className="mt-2" onClick={() => setMobileOpen(false)}>
              <Link to="/courses">Start Learning</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
