"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

// Manual light/dark toggle. Default theme is "atelier" (light); the choice
// is persisted by next-themes. System preference is intentionally ignored.
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: theme is only known on the client. This is the
  // standard next-themes mount guard; the one-shot setState is intentional.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const base =
    "inline-flex h-9 w-9 items-center justify-center rounded-md border border-default text-soft transition-colors hover:text-accent hover:border-strong focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

  if (!mounted) {
    // Same-size placeholder to keep layout stable before mount.
    return <span aria-hidden className={`${base} ${className}`} />;
  }

  const isDark = theme === "graphite";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "atelier" : "graphite")}
      aria-label={isDark ? "Passer en thème clair" : "Passer en thème sombre"}
      className={`${base} ${className}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
