"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section";
import { MapPin, Heart, Award } from "lucide-react";
import Image from "next/image";

export function About() {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-bg"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <SectionHeading
                index="03"
                eyebrow="À propos"
                align="left"
                titleId="about-heading"
                title={
                  <>
                    L&apos;expertise technique,{" "}
                    <span className="text-accent">la proximité en plus.</span>
                  </>
                }
              />

              <div className="mt-6 space-y-4 text-soft text-lg leading-relaxed">
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
              <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-card border border-default">
                <Award className="text-accent shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-text-strong font-bold text-sm">Certifié</h3>
                  <p className="text-muted text-xs mt-1">
                    Titre Professionnel &quot; Concepteur Développeur
                    d&apos;Applications &quot;
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-card border border-default">
                <MapPin
                  className="text-accent shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-text-strong font-bold text-sm">
                    Ancrage Local
                  </h3>
                  <p className="text-muted text-xs mt-1">
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
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full lg:max-w-md mx-auto"
          >
            <div className="relative aspect-square md:aspect-4/5 rounded-xl overflow-hidden border border-default shadow-lg bg-surface-card">
              <Image
                src="/images/about_picture.jpg"
                alt="Anthony Marcelin dans son atelier de développement web et montage PC à Saint-Laurent-Médoc"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-surface-card p-5 rounded-lg border border-strong shadow-lg hidden md:block z-40">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent rounded-full text-on-accent">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-muted text-xs font-bold uppercase tracking-wider">
                    Passionné depuis
                  </p>
                  <p className="text-text-strong text-xl font-bold">+ 20 ans</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
