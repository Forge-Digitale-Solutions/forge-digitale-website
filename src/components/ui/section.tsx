import type { ReactNode } from "react";

// Mono, numbered section eyebrow + display heading (FUNKTION identity).
// Technical numbering like "01 / SERVICES" sits above the title; the title
// uses the display font and system color tokens. Centered by default to match
// the existing section layouts; pass align="left" for a left-aligned head.
export function SectionHeading({
  index,
  eyebrow,
  title,
  titleId,
  description,
  align = "center",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  titleId?: string;
  description?: ReactNode;
  align?: "center" | "left";
}) {
  const centered = align === "center";

  return (
    <header className={centered ? "text-center" : "text-left"}>
      <div
        className={`mb-4 flex items-center gap-3 ${
          centered ? "justify-center" : "justify-start"
        }`}
      >
        {centered && (
          <span className="hidden h-px w-8 bg-accent-line sm:block" aria-hidden />
        )}
        <span className="fds-eyebrow">
          {index ? `${index} / ` : ""}
          {eyebrow}
        </span>
        <span className="hidden h-px w-8 bg-accent-line sm:block" aria-hidden />
      </div>

      <h2
        id={titleId}
        className="font-display text-2xl font-bold uppercase tracking-tight text-text-strong text-balance sm:text-3xl md:text-4xl"
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-soft leading-relaxed ${
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </header>
  );
}

// Full-width calibration separator: a hairline carrying registration
// crosshairs at the column intersections. The grid becomes the ornament.
export function GridDivider() {
  return (
    <div aria-hidden className="container mx-auto px-4 md:px-6">
      <div className="relative h-px bg-default">
        <span className="fds-reg left-0 top-0" />
        <span className="fds-reg left-1/4 top-0" />
        <span className="fds-reg left-2/4 top-0" />
        <span className="fds-reg left-3/4 top-0" />
        <span className="fds-reg left-full top-0" />
      </div>
    </div>
  );
}
