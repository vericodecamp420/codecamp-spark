import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "vericodecamp-auth";

export interface AuthUser {
  username: string;
  loggedInAt: string;
}

function read(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(read());
    setHydrated(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setUser(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback((username: string) => {
    const trimmed = username.trim();
    if (!trimmed) return false;
    const next: AuthUser = { username: trimmed, loggedInAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setUser(next);
    return true;
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return { user, hydrated, isAuthenticated: !!user, login, logout };
}
