import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/creation-site-web-bassin-arcachon/`;

export const metadata: Metadata = {
  title: "Création de site web sur le Bassin d’Arcachon",
  description:
    "Sites pour assos, commerces et studios du Bassin. Exemple : Rugby Handi Sud Bassin à La Teste. Vitrine à partir de 500 €. Travail depuis le Médoc.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: "Création de site web sur le Bassin d’Arcachon",
    description:
      "Sites pour assos, commerces et studios du Bassin. Exemple : Rugby Handi Sud Bassin à La Teste. Vitrine à partir de 500 €. Travail depuis le Médoc.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Création de site web sur le Bassin d’Arcachon, Forge Digitale Solutions",
      },
    ],
  },
};

export default function BassinPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Site web Bassin d’Arcachon", url: PAGE_URL },
        ]}
      />
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
          Un site pour une asso ou un commerce du Bassin, fait depuis Saint-Laurent-Médoc
        </h1>
        <div className="space-y-6 text-lg text-soft leading-relaxed">
          <p>
            Je suis Anthony Marcelin,
            développeur indépendant à Saint-Laurent-Médoc. J&rsquo;ai déjà livré
            un site associatif sur le Bassin.
          </p>
          <h2 className="text-2xl font-bold text-text-strong">Preuve : Rugby Handi Sud Bassin, La Teste-de-Buch</h2>
          <p>
            Club de rugby fauteuil. Site pensé pour l&rsquo;asso : présentation
            claire et back-office Statamic pour que les bénévoles gèrent le
            contenu en autonomie.
          </p>
          <h2 className="text-2xl font-bold text-text-strong">Pour qui</h2>
          <p>
            Associations : infos pratiques, autonomie de mise à jour. Commerces :
            horaires, offre, contact — une base à vous, pas seulement Instagram (
            <Link href="/blog/site-web-ou-reseaux-sociaux/" className="text-accent hover:underline">
              site ou réseaux
            </Link>
            ). Studios et indépendants : galerie, vitrine métier (ex. Horizon
            Vertical Studio). Pages lisibles sur téléphone, calées sur l’activité.
            Pas de promesse de première page Google.
          </p>
          <h2 className="text-2xl font-bold text-text-strong">Depuis le Médoc</h2>
          <p>
            Visio, téléphone ou{" "}
            <Link href="/#contact" className="text-accent hover:underline">
              le formulaire
            </Link>
            . Pas besoin de venir à Saint-Laurent-Médoc pour un site. RDV
            physique = exception, devis, environ 50 km.{" "}
            <Link href="/rendez-vous-saint-laurent-medoc/" className="text-accent hover:underline">
              Rendez-vous
            </Link>
            . Un interlocuteur, titre CDA, plus de 20 ans. Preuves : FDS,
            GoSportNow, Charcuterie Campagnarde, Atelier Hardware, HVS, RHSB.
          </p>
          <h2 className="text-2xl font-bold text-text-strong">Budget</h2>
          <p>
            Vitrine à partir de 500 €, avec un espace pour mettre à jour le
            contenu. Pas de packs. Hébergement, domaine,
            maintenance :{" "}
            <Link href="/maintenance-site-web/" className="text-accent hover:underline">
              page maintenance
            </Link>
            , pas de prix mensuel inventé.{" "}
            <Link href="/blog/croissance-web/" className="text-accent hover:underline">
              Croissance web
            </Link>
            .
          </p>
          <h2 className="text-2xl font-bold text-text-strong">Questions</h2>
          <p>
            Faut-il se déplacer jusqu&rsquo;au Médoc ? Non pour le web. Site asso
            vs commerce ? Même clarté. Asso : souvent un back-office bénévoles.
            Commerce : infos pratiques. Le devis suit le besoin.
          </p>
        </div>
        <section className="mt-12 pt-8 border-t border-default flex flex-col sm:flex-row gap-4">
          <Link href="/#contact" className="btn-primary gap-2 px-6 py-3">
            Demander un devis
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/creation-site-web/" className="text-accent hover:underline self-center">
            Création de site web
          </Link>
        </section>
      </div>
    </div>
  );
}
