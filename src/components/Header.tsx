"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const serviceLinks = [
  { name: "Création de site web", href: "/creation-site-web" },
  { name: "Développeur en Médoc", href: "/developpeur-medoc" },
  { name: "Montage PC", href: "/montage-pc" },
  { name: "Installation Linux", href: "/installation-linux" },
];

const navLinks = [
  { name: "Réalisations", href: "/#realisations" },
  { name: "Blog", href: "/blog" },
  { name: "À Propos", href: "/#about" },
  { name: "FAQ", href: "/#faq" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the desktop dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMobile = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-base/80 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-lg shadow-[#C5A059]/20 border border-white/5 transition-transform group-hover:scale-105">
              <Image
                src="/logos/Logo1rond.png"
                alt="Forge Digitale Logo"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span
                  className="text-slate-500 text-xs font-medium -translate-y-px"
                  aria-hidden="true"
                >
                  La
                </span>
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-[#C5A059] transition-colors">
                  FORGE DIGITALE
                </span>
              </div>

              <span
                className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-medium ml-4.5 mt-0.5"
                aria-hidden="true"
              >
                SOLUTIONS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Services dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-[#C5A059] focus-visible:outline-offset-4 rounded transition-colors group"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-3 w-64 rounded-2xl bg-dark-base/95 backdrop-blur-md border border-white/10 shadow-2xl p-2"
                  >
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setServicesOpen(false)}
                        className="block px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 focus-visible:text-white focus-visible:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#C5A059] transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-[#C5A059] focus-visible:outline-offset-4 rounded transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all group-hover:w-full"></span>
              </Link>
            ))}

            <Link
              href="/#contact"
              className="bg-[#C5A059] hover:bg-[#D4B475] focus-visible:bg-[#D4B475] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-dark-base font-bold py-2.5 px-6 rounded-full text-sm transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(197,160,89,0.3)]"
            >
              Demander un devis
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 focus-visible:outline-2 focus-visible:outline-[#C5A059] focus-visible:outline-offset-2 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark-base border-b border-white/10 md:hidden flex flex-col p-6 gap-2 shadow-2xl"
          >
            {/* Services accordion */}
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex items-center justify-between py-2 text-lg font-medium text-slate-300 hover:text-[#C5A059] focus-visible:text-[#C5A059] focus-visible:outline-2 focus-visible:outline-[#C5A059] border-b border-white/5 rounded"
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services"
            >
              Services
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {mobileServicesOpen && (
                <motion.div
                  id="mobile-services"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden flex flex-col"
                >
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className="py-2 pl-4 text-base text-slate-400 hover:text-[#C5A059] focus-visible:text-[#C5A059] focus-visible:outline-2 focus-visible:outline-[#C5A059] border-b border-white/5 rounded"
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-2 text-lg font-medium text-slate-300 hover:text-[#C5A059] focus-visible:text-[#C5A059] focus-visible:outline-2 focus-visible:outline-[#C5A059] border-b border-white/5 rounded"
                onClick={closeMobile}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={closeMobile}
              className="bg-[#C5A059] text-dark-base font-bold py-3 text-center rounded-lg mt-4 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Me contacter
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
