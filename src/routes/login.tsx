import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — VeriCodeCamp" },
      { name: "description", content: "Sign in to VeriCodeCamp to track your coding progress." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, user, logout } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }
    login(username);
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
            {user ? `Welcome back, ${user.username}` : "Sign in to VeriCodeCamp"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {user
              ? "You're already signed in on this device."
              : "Local demo login — pick any username to start tracking your progress."}
          </p>
        </div>

        {user ? (
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" onClick={logout}>
              Sign out
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                autoFocus
                autoComplete="username"
                placeholder="e.g. codewizard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <Button type="submit" className="w-full" size="lg">
              <LogIn className="mr-2 h-4 w-4" />
              Sign in
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              No password needed. Data is stored only in your browser.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
