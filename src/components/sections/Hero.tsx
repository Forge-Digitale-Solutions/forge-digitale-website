"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";

const trust = ["Site Web & App", "Montage PC", "Maintenance Locale"];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24"
      aria-label="Section d'accueil"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative">
          {/* Signature gesture: visible column grid + registration crosshairs */}
          <div
            aria-hidden
            className="fds-grid absolute inset-0 border border-default"
          >
            <span className="fds-reg left-0 top-0" />
            <span className="fds-reg left-1/4 top-0" />
            <span className="fds-reg left-2/4 top-0" />
            <span className="fds-reg left-3/4 top-0" />
            <span className="fds-reg left-full top-0" />
            <span className="fds-reg left-0 top-full" />
            <span className="fds-reg left-1/4 top-full" />
            <span className="fds-reg left-2/4 top-full" />
            <span className="fds-reg left-3/4 top-full" />
            <span className="fds-reg left-full top-full" />
          </div>

          {/* Content: left-aligned, dense, graduated */}
          <div className="relative max-w-4xl px-5 py-12 md:px-12 md:py-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="fds-eyebrow mb-6"
            >
              01 / Atelier numérique · Médoc
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
              className="font-display text-2xl font-bold uppercase leading-[1.04] tracking-tight text-text-strong text-balance sm:text-4xl md:text-5xl"
            >
              L&rsquo;Artisanat Numérique{" "}
              <span className="text-accent">au service du Médoc</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="mt-6 max-w-xl text-md leading-relaxed text-soft"
            >
              <strong className="font-semibold text-text-strong">
                Création de sites web et d&rsquo;applications sur-mesure
              </strong>
              , montage PC et installation Linux. Développeur indépendant en{" "}
              <strong className="font-semibold text-text-strong">Médoc</strong>, au
              service des pros et particuliers du Bassin d&rsquo;Arcachon à Bordeaux.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/#contact"
                className="group btn-primary h-12 px-7 tracking-wide focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                <span className="mr-2">Lancer mon projet</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/#services"
                className="group inline-flex h-12 items-center justify-center rounded-md border border-strong bg-transparent px-7 font-medium text-soft transition-colors hover:bg-surface hover:text-text-strong focus-visible:bg-surface focus-visible:text-text-strong focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                Voir les services
                <ChevronRight
                  className="ml-2 h-4 w-4 text-muted transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-default pt-6"
            >
              {trust.map((label) => (
                <li
                  key={label}
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-soft"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
