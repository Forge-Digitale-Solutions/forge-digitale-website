"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function supportsViewTransition() {
  return typeof document.startViewTransition === "function";
}

/** Circular reveal from the toggle (Grafikart-style), using our theme tokens. */
async function switchThemeWithCircle(
  button: HTMLElement,
  apply: () => void,
) {
  const { top, left, width, height } = button.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const maxRadius = Math.hypot(
    Math.max(left, window.innerWidth - left),
    Math.max(top, window.innerHeight - top),
  );

  const transition = document.startViewTransition(() => {
    flushSync(apply);
  });

  await transition.ready;

  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`,
      ],
    },
    {
      duration: 500,
      easing: "ease-in-out",
      pseudoElement: "::view-transition-new(root)",
    },
  );
}

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
  const nextTheme = isDark ? "atelier" : "graphite";

  const onToggle = (event: MouseEvent<HTMLButtonElement>) => {
    // Set data-theme sync so View Transition captures the paint change;
    // next-themes alone applies via effect (too late for VT).
    const apply = () => {
      document.documentElement.setAttribute("data-theme", nextTheme);
      setTheme(nextTheme);
    };

    if (!supportsViewTransition() || prefersReducedMotion()) {
      apply();
      return;
    }

    void switchThemeWithCircle(event.currentTarget, apply);
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Passer en thème clair" : "Passer en thème sombre"}
      className={`${base} ${className}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
