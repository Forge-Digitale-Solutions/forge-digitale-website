"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import {
  NEWSLETTER_ERROR_MESSAGE,
  NEWSLETTER_INVALID_EMAIL_MESSAGE,
  NEWSLETTER_SUCCESS_MESSAGE,
  isValidEmail,
} from "@/lib/newsletter";

type NewsletterFormProps = {
  variant?: "footer" | "article";
};

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm({ variant = "footer" }: NewsletterFormProps) {
  const formId = useId();
  const emailId = `${formId}-email`;
  const honeypotId = `${formId}-website`;
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "submitting") return;

    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setStatus("error");
      setMessage(NEWSLETTER_INVALID_EMAIL_MESSAGE);
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: trimmed, website: honeypot }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (data.ok) {
        setStatus("success");
        setMessage(data.message || NEWSLETTER_SUCCESS_MESSAGE);
        setEmail("");
        return;
      }

      setStatus("error");
      setMessage(data.message || NEWSLETTER_ERROR_MESSAGE);
    } catch {
      setStatus("error");
      setMessage(NEWSLETTER_ERROR_MESSAGE);
    }
  }

  const isArticle = variant === "article";

  return (
    <div className={isArticle ? "space-y-3" : "space-y-2"}>
      {isArticle && (
        <p className="text-text-strong font-bold text-sm">
          Recevoir les prochains articles
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="relative space-y-2"
        noValidate
        aria-label="Inscription à la newsletter"
      >
        <div
          className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor={honeypotId}>Site web</label>
          <input
            id={honeypotId}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-stretch">
          <label htmlFor={emailId} className="sr-only">
            Adresse e-mail
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="Votre e-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") {
                setStatus("idle");
                setMessage("");
              }
            }}
            disabled={status === "submitting" || status === "success"}
            className={`min-w-0 flex-1 bg-surface-raised border rounded-md px-3 py-2 text-sm text-text-strong focus:outline-none focus:border-accent transition-colors placeholder:text-faint disabled:opacity-60 ${
              status === "error" && message === NEWSLETTER_INVALID_EMAIL_MESSAGE
                ? "border-danger"
                : "border-default"
            }`}
          />
          <button
            type="submit"
            disabled={status === "submitting" || status === "success"}
            aria-busy={status === "submitting"}
            className="btn-primary shrink-0 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <Loader2 className="animate-spin" size={16} aria-hidden="true" />
            ) : (
              "S'inscrire"
            )}
          </button>
        </div>

        <p className="text-xs text-faint leading-snug">
          Les nouveautés de Forge Digitale Solutions par email : articles, nouveaux
          services. Désinscription en un clic.{" "}
          <Link
            href="/confidentialite/"
            className="underline hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
          >
            Voir la politique de confidentialité
          </Link>
          .
        </p>

        {status === "success" && (
          <p
            className="text-xs text-success"
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-danger" role="alert" aria-live="assertive">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
