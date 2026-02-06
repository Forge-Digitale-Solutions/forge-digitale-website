"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Réalisations", href: "/#realisations" },
    { name: "Blog", href: "/blog" },
    { name: "À Propos", href: "/#about" },
  ];

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
          <Link href="/" className="flex items-center gap-3 group">
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
                <span className="text-slate-500 text-xs font-medium -translate-y-px">
                  La
                </span>
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-[#C5A059] transition-colors">
                  FORGE DIGITALE
                </span>
              </div>

              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-medium ml-4.5 mt-0.5">
                SOLUTIONS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
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
              href="#contact"
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
            className="absolute top-full left-0 w-full bg-dark-base border-b border-white/10 md:hidden flex flex-col p-6 gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-[#C5A059] focus-visible:text-[#C5A059] focus-visible:outline-2 focus-visible:outline-[#C5A059] py-2 text-lg font-medium border-b border-white/5 rounded"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
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
