import { Code2, Github, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="text-lg tracking-tight">CodeCamp Academy</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Free, interactive coding education for beginners and aspiring developers. Learn by building real projects.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Learn</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/courses" className="hover:text-foreground">
                  All Courses
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-foreground">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/courses" className="hover:text-foreground">
                  Projects
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Community</h3>
            <div className="mt-3 flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CodeCamp Academy. Free for everyone.
        </div>
      </div>
    </footer>
  );
}
