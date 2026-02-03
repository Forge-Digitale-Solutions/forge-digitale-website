"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-16 pb-8 text-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
                <Image
                  src="/logos/Logo1rond.png"
                  alt="Logo Footer"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                FORGE DIGITALE
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm mb-6">
              L&rsquo;Artisanat Numérique au service du Médoc.
              <br />
              Développement web sur-mesure, maintenance et montage PC pour
              particuliers et professionnels.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#C5A059] hover:text-[#020617] transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#C5A059] hover:text-[#020617] transition-all"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 tracking-wide uppercase text-xs text-[#C5A059]">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#web"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[#C5A059]"></span>
                  Création Sites Web
                </Link>
              </li>
              <li>
                <Link
                  href="#web"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[#C5A059]"></span>
                  Applications Métier
                </Link>
              </li>
              <li>
                <Link
                  href="#montage"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[#C5A059]"></span>
                  Montage PC Sur Mesure
                </Link>
              </li>
              <li>
                <Link
                  href="#maintenance"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[#C5A059]"></span>
                  Maintenance & Linux
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 tracking-wide uppercase text-xs text-[#C5A059]">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin size={18} className="text-[#C5A059] mt-0.5 shrink-0" />
                <span>
                  6 Rue Saint Julien
                  <br />
                  33112 Saint-Laurent-Médoc
                </span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone size={18} className="text-[#C5A059] shrink-0" />
                <a
                  href="tel:+33645569696"
                  className="hover:text-white transition-colors"
                >
                  06 45 65 96 96
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail size={18} className="text-[#C5A059] shrink-0" />
                <a
                  href="mailto:contact@forgedigitalesolutions.com"
                  className="hover:text-white transition-colors"
                >
                  contact@forgedigitalesolutions.com{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © {currentYear} La Forge Digitale Solutions. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link
              href="/mentions-legales"
              className="hover:text-[#C5A059] transition-colors"
            >
              Mentions Légales
            </Link>
            <Link
              href="/cgv"
              className="hover:text-[#C5A059] transition-colors"
            >
              CGV
            </Link>
            <Link
              href="/confidentialite"
              className="hover:text-[#C5A059] transition-colors"
            >
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
