"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg border-t border-default pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-text-strong">
              Forge <span className="text-accent">Digitale.</span>
            </h3>
            <p className="text-soft text-sm leading-relaxed">
              L&apos;artisanat numérique au service du Médoc.
              <br />
              Solutions web sur-mesure et expertise hardware haute performance.
            </p>

            <div className="pt-4 mt-4 border-t border-default text-xs text-faint">
              <p>EI Anthony Marcelin</p>
              <p>SIREN : 100 857 838</p>
            </div>
          </div>

          <div>
            <h4 className="text-text-strong font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-soft">
              <li>
                <Link
                  href="/creation-site-web"
                  aria-label="Création de site web et d'applications"
                  className="hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
                >
                  Création Site Web
                </Link>
              </li>
              <li>
                <Link
                  href="/maintenance-site-web"
                  aria-label="Maintenance et hébergement de site web"
                  className="hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
                >
                  Maintenance Site Web
                </Link>
              </li>
              <li>
                <Link
                  href="/montage-pc"
                  aria-label="Montage PC sur-mesure et gamer"
                  className="hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
                >
                  Montage PC Gamer
                </Link>
              </li>
              <li>
                <Link
                  href="/installation-linux"
                  aria-label="Installation Linux et forfait Renaissance"
                  className="hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
                >
                  Installation Linux
                </Link>
              </li>
              <li>
                <Link
                  href="/developpeur-medoc"
                  aria-label="Développeur web indépendant dans le Médoc"
                  className="hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
                >
                  Développeur dans le Médoc
                </Link>
              </li>
              <li>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  href="/#realisations"
                  aria-label="Voir les réalisations et projets complétés"
                  className="hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
                >
                  Réalisations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-strong font-bold mb-6">Liens Utiles</h4>
            <ul className="space-y-3 text-sm text-soft">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
                >
                  Le Blog Tech
                </Link>
              </li>
              <li>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  href="/#about"
                  className="hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
                >
                  À Propos
                </a>
              </li>
              <li>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  href="/#contact"
                  className="hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
                >
                  Demander un Devis
                </a>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
                >
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-strong font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-soft">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-accent shrink-0 mt-0.5"
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
                  className="text-accent shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="tel:+33645659696"
                  className="hover:text-text-strong transition-colors"
                >
                  06 45 65 96 96
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-accent shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="mailto:contact@forgedigitalesolutions.com"
                  className="hover:text-text-strong transition-colors break-all"
                >
                  contact@forgedigitalesolutions.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-strong font-bold mb-6">Réseaux Sociaux</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61577431918424"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Page Facebook de Forge Digitale Solutions"
                className="text-soft hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
              >
                <Facebook size={24} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/anthony-marcelin/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil LinkedIn d'Anthony Marcelin"
                className="text-soft hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
              >
                <Linkedin size={24} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/forge-digitale-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Page LinkedIn de Forge Digitale Solutions"
                className="text-soft hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
                title="LinkedIn Entreprise"
              >
                <Linkedin size={24} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-default pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-faint">
          <p>© {currentYear} Forge Digitale Solutions. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link
              href="/cgv"
              className="hover:text-soft focus-visible:text-soft focus-visible:outline-1 focus-visible:outline-strong rounded transition-colors"
            >
              CGV
            </Link>
            <Link
              href="/mentions-legales"
              className="hover:text-soft focus-visible:text-soft focus-visible:outline-1 focus-visible:outline-strong rounded transition-colors"
            >
              Mentions Légales
            </Link>
            <Link
              href="/confidentialite"
              className="hover:text-soft focus-visible:text-soft focus-visible:outline-1 focus-visible:outline-strong rounded transition-colors"
            >
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
