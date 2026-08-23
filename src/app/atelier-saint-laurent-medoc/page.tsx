import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/atelier-saint-laurent-medoc/`;

export const metadata: Metadata = {
  title: "Atelier numérique à Saint-Laurent-Médoc | Forge Digitale Solutions",
  description:
    "Atelier privé à Saint-Laurent-Médoc, sur rendez-vous. Sites, montage PC et Linux. Zone : Médoc, Bassin d'Arcachon, Bordeaux (~50 km).",
  alternates: { canonical: PAGE_URL },
};

export default function AtelierPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Atelier", url: PAGE_URL },
        ]}
      />
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
          L&rsquo;atelier, à Saint-Laurent-Médoc — sur rendez-vous
        </h1>
        <div className="space-y-6 text-lg text-soft leading-relaxed">
          <p>
            Atelier privé, pas une boutique. Un seul interlocuteur : Anthony
            Marcelin, concepteur développeur d&rsquo;applications, plus de 20 ans
            de pratique.
          </p>
          <p>
            Forge Digitale Solutions — Anthony Marcelin (EI) — 6 rue
            Saint-Julien, 33112 Saint-Laurent-Médoc — 06 45 65 96 96 —
            contact@forgedigitalesolutions.com. La fiche Google est une zone de
            service, sans adresse rue. Rendez-vous obligatoire. Horaires sur
            rendez-vous, en semaine.
          </p>
          <p>
            Sur place : montage PC, forfait Renaissance, diagnostic. À distance :
            le web (
            <Link href="/creation-site-web/" className="text-accent hover:underline">
              création
            </Link>
            ,{" "}
            <Link href="/maintenance-site-web/" className="text-accent hover:underline">
              maintenance
            </Link>
            ). Zone : Saint-Laurent-Médoc, Lesparre-Médoc, Pauillac,
            Castelnau-de-Médoc, Arcachon / Bassin, Bordeaux, environ 50 km.
            Déplacements exceptionnels, sur devis.
          </p>
          <p>
            Preuves : FDS, GoSportNow, Atelier Hardware, Charcuterie Campagnarde,
            Horizon Vertical Studio, Rugby Handi Sud Bassin. 6 avis 5★.
            Sans RDV : non. Dépôt PC : oui si prévu.
          </p>
        </div>
        <section className="mt-12 pt-8 border-t border-default">
          <Link href="/#contact" className="btn-primary gap-2 px-6 py-3">
            Prendre rendez-vous
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
