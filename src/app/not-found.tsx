"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-dark-base">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[50px_50px]" />
        <div className="absolute left-1/2 top-1/2 -z-10 h-77.5 w-77.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C5A059] opacity-20 blur-[100px]" />
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-8xl md:text-9xl font-bold text-white mb-4"
        >
          4<span className="text-[#C5A059]">0</span>4
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl md:text-3xl font-semibold text-white mb-6"
        >
          Oups ! Cette page s&apos;est perdue dans la matrice.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-300 text-lg mb-10"
        >
          Le lien que vous avez cliqué est peut-être cassé, ou la page a été
          supprimée. Pas d&apos;inquiétude, on peut retrouver notre chemin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => window.history.back()}
            className="group flex w-full sm:w-auto items-center justify-center gap-2 h-12 rounded-full border border-slate-700 bg-transparent px-8 font-medium text-slate-200 transition-all hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour en arrière
          </button>

          <Link
            href="/"
            className="group flex w-full sm:w-auto items-center justify-center gap-2 h-12 rounded-full bg-[#C5A059] px-8 font-medium text-black transition-all hover:bg-[#d4be85] hover:scale-105"
          >
            <Home className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
