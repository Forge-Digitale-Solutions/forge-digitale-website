"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark-base border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Forge <span className="text-[#C5A059]">Digitale.</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              L&apos;artisanat numérique au service du Médoc.
              <br />
              Solutions web sur-mesure et expertise hardware haute performance.
            </p>

            <div className="pt-4 mt-4 border-t border-white/5 text-xs text-slate-500">
              <p>EI Anthony Marcelin</p>
              <p>SIREN : 100 857 838</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  href="/#services"
                  aria-label="Voir les services de création de site web"
                  className="hover:text-[#C5A059] focus-visible:text-[#C5A059] focus-visible:outline-1 focus-visible:outline-[#C5A059] rounded transition-colors"
                >
                  Création Site Web
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  aria-label="Voir les services de montage PC gamer"
                  className="hover:text-[#C5A059] focus-visible:text-[#C5A059] focus-visible:outline-1 focus-visible:outline-[#C5A059] rounded transition-colors"
                >
                  Montage PC Gamer
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  aria-label="Voir les services de dépannage et Linux"
                  className="hover:text-[#C5A059] focus-visible:text-[#C5A059] focus-visible:outline-1 focus-visible:outline-[#C5A059] rounded transition-colors"
                >
                  Dépannage & Linux
                </Link>
              </li>
              <li>
                <Link
                  href="/#realisations"
                  className="hover:text-[#C5A059] focus-visible:text-[#C5A059] focus-visible:outline-1 focus-visible:outline-[#C5A059] rounded transition-colors"
                >
                  Réalisations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Liens Utiles</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#C5A059] focus-visible:text-[#C5A059] focus-visible:outline-1 focus-visible:outline-[#C5A059] rounded transition-colors"
                >
                  Le Blog Tech
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="hover:text-[#C5A059] focus-visible:text-[#C5A059] focus-visible:outline-1 focus-visible:outline-[#C5A059] rounded transition-colors"
                >
                  À Propos
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:text-[#C5A059] focus-visible:text-[#C5A059] focus-visible:outline-1 focus-visible:outline-[#C5A059] rounded transition-colors"
                >
                  Demander un Devis
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="hover:text-[#C5A059] focus-visible:text-[#C5A059] focus-visible:outline-1 focus-visible:outline-[#C5A059] rounded transition-colors"
                >
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-[#C5A059] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>
                  Saint-Laurent-Médoc
                  <br />
                  (33112)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="text-[#C5A059] shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="tel:+33645659696"
                  className="hover:text-white transition-colors"
                >
                  06 45 65 96 96
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-[#C5A059] shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="mailto:contact@forgedigitalesolutions.com"
                  className="hover:text-white transition-colors break-all"
                >
                  contact@forgedigitalesolutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Forge Digitale Solutions. Tous droits
            réservés.
          </p>
          <div className="flex gap-6">
            <Link
              href="/cgv"
              className="hover:text-slate-300 focus-visible:text-slate-300 focus-visible:outline-1 focus-visible:outline-slate-300 rounded transition-colors"
            >
              CGV
            </Link>
            <Link
              href="/mentions-legales"
              className="hover:text-slate-300 focus-visible:text-slate-300 focus-visible:outline-1 focus-visible:outline-slate-300 rounded transition-colors"
            >
              Mentions Légales
            </Link>
            <Link
              href="/confidentialite"
              className="hover:text-slate-300 focus-visible:text-slate-300 focus-visible:outline-1 focus-visible:outline-slate-300 rounded transition-colors"
            >
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
