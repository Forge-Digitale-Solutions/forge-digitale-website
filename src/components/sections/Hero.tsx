"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#020617]">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#C5A059] opacity-20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-4 py-1.5 text-sm font-medium text-[#C5A059] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
          </span>
          Disponible pour nouveaux projets
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl mb-6"
        >
          L&rsquo;Artisanat Numérique <br />
          <span className="text-gold-gradient">au service du Médoc.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed"
        >
          Forge Digitale crée des sites web performants pour les pros et redonne
          vie à votre matériel informatique. Une expertise locale, sans jargon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-[#C5A059] px-8 font-medium text-black transition-all duration-300 hover:bg-[#d4be85] hover:scale-105 hover:shadow-[0_0_20px_rgba(197,160,89,0.3)]"
          >
            <span className="mr-2">Lancer mon projet</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="#services"
            className="group inline-flex h-12 items-center justify-center rounded-full border border-slate-700 bg-transparent px-8 font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
          >
            Voir les services
            <ChevronRight className="ml-2 h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-slate-500"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#C5A059]" /> Site Web & App
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#C5A059]" /> Montage PC
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#C5A059]" /> Maintenance
            Locale
          </div>
        </motion.div>
      </div>
    </section>
  );
}
