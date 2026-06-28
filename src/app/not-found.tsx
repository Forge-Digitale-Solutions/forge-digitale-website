"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden bg-bg">
      <div className="text-center max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-8xl md:text-9xl font-bold text-text-strong mb-4"
        >
          4<span className="text-accent">0</span>4
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl md:text-3xl font-semibold text-text-strong mb-6"
        >
          Oups ! Cette page s&apos;est perdue dans la matrice.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-soft text-lg mb-10"
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
            className="group flex w-full sm:w-auto items-center justify-center gap-2 h-12 rounded-md border border-default bg-transparent px-8 font-medium text-soft transition-all hover:border-strong hover:text-text-strong"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour en arrière
          </button>

          <Link
            href="/"
            className="group btn-primary w-full sm:w-auto gap-2 h-12 px-8"
          >
            <Home className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
