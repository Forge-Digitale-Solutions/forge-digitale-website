"use client";

import { motion } from "framer-motion";
import { MapPin, Heart, Award } from "lucide-react";
import Image from "next/image";

export function About() {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-dark-base"
      aria-labelledby="about-heading"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C5A059]/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-[#C5A059] font-bold tracking-widest uppercase text-sm">
                À Propos
              </span>
              <h2
                id="about-heading"
                className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6"
              >
                L&apos;expertise technique,
                <br />
                <span className="text-gold-gradient">
                  la proximité en plus.
                </span>
              </h2>

              <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                <p>
                  Basé au cœur du <strong>Médoc</strong>, je combine deux
                  passions qui sont pour moi indissociables : le{" "}
                  <strong>développement web</strong> et le{" "}
                  <strong>hardware</strong>.
                </p>
                <p>
                  Titulaire du titre de{" "}
                  <strong>Concepteur Développeur d&apos;Applications</strong> et
                  passionné de Tech depuis plus de <strong>20 ans</strong>, je
                  mets cette double compétence au service de vos projets.
                </p>
                <p>
                  Mon engagement est global : concevoir des{" "}
                  <strong>sites web et applications performants</strong>,
                  assembler des <strong>PC durables</strong>, mais aussi{" "}
                  <strong>redonner vie à votre vieux matériel</strong> via des
                  systèmes optimisés. Une approche économique et écologique,
                  adaptée à votre usage réel.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <Award className="text-[#C5A059] shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-white font-bold text-sm">Certifié</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Titre Professionnel &quot; Concepteur Développeur
                    d&apos;Applications &quot;
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <MapPin
                  className="text-[#C5A059] shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-white font-bold text-sm">
                    Ancrage Local
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Atelier basé à St Laurent Medoc
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full lg:max-w-md mx-auto"
          >
            <div className="relative aspect-square md:aspect-4/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-dark-base">
              <Image
                src="/images/about_picture.jpg"
                alt="Anthony Marcelin dans son atelier de développement web et montage PC à Saint-Laurent-Médoc"
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-overlay" />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-dark-base p-5 rounded-2xl border border-[#C5A059]/30 shadow-xl hidden md:block z-40">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#C5A059] rounded-full text-dark-base">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Passionné depuis
                  </p>
                  <p className="text-white text-xl font-bold">+ 20 ans</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
