"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type LightboxState = {
  src: string;
  alt: string;
  trigger: HTMLElement;
};

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

export function ArticleLightbox({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<LightboxState | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const enhanceImages = () => {
      root.querySelectorAll("img").forEach((img) => {
        if (img.getAttribute("tabindex") === null) {
          img.setAttribute("tabindex", "0");
        }
      });
    };

    enhanceImages();
    const observer = new MutationObserver(enhanceImages);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setActive(null);
  }, []);

  const openFromImage = useCallback((img: HTMLImageElement) => {
    setActive({
      src: img.currentSrc || img.src,
      alt: img.alt || "Image",
      trigger: img,
    });
  }, []);

  useEffect(() => {
    if (!active) return;

    const { body } = document;
    const scrollbarWidth = getScrollbarWidth();
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    body.style.overflow = "hidden";
    body.setAttribute("data-lightbox-open", "");
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      body.removeAttribute("data-lightbox-open");
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const trigger = active.trigger;
    closeBtnRef.current?.focus();

    return () => {
      trigger.focus();
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (focusable.length === 1) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, close]);

  const onContainerClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as Element | null;
    const img = target?.closest("img");
    if (!img || !containerRef.current?.contains(img)) return;
    openFromImage(img as HTMLImageElement);
  };

  const onContainerKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const target = event.target as HTMLElement;
    if (target.tagName !== "IMG") return;
    event.preventDefault();
    openFromImage(target as HTMLImageElement);
  };

  const onOverlayClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  return (
    <div
      ref={containerRef}
      className="[&_img]:cursor-zoom-in"
      onClick={onContainerClick}
      onKeyDown={onContainerKeyDown}
    >
      {children}
      {active &&
        createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            className="article-lightbox-overlay fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-4"
            onClick={onOverlayClick}
          >
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Fermer"
              onClick={close}
              className="absolute top-4 right-4 z-[1001] flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X size={22} aria-hidden="true" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[90vh] max-w-[95vw] object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body,
        )}
      <style>{`
        @keyframes article-lightbox-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .article-lightbox-overlay {
          animation: article-lightbox-fade 160ms ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .article-lightbox-overlay {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
