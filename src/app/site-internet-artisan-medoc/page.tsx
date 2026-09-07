import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/site-internet-artisan-medoc/`;

export const metadata: Metadata = {
  title: "Site internet pour artisan et commerçant dans le Médoc",
  description:
    "Site vitrine pour artisans et commerces du Médoc. Exemple Charcuterie Campagnarde. À partir de 500 €, devis sans packs. Site et fiche Google, chacun son rôle.",
  alternates: { canonical: PAGE_URL },
};

export default function ArtisanPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Site internet artisan", url: PAGE_URL },
        ]}
      />
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
          Site internet pour artisan ou commerçant dans le Médoc
        </h1>
        <div className="space-y-6 text-lg text-soft leading-relaxed">
          <p>
            Artisans et commerçants du Médoc, sans équipe com. Des sites, pas des
            packs.
          </p>
          <h2 className="text-2xl font-bold text-text-strong">Site vs fiche Google</h2>
          <p>
            La fiche, c&rsquo;est le lieu, les horaires, les avis. L&rsquo;article :{" "}
            <Link href="/blog/fiche-google-artisans/" className="text-accent hover:underline">
              fiche Google pour artisans
            </Link>
            . Le site, c&rsquo;est l&rsquo;offre expliquée, les photos, le texte.
            Les deux se complètent. Aucune garantie de place. Aussi{" "}
            <Link href="/blog/site-web-ou-reseaux-sociaux/" className="text-accent hover:underline">
              site ou réseaux
            </Link>{" "}
            et{" "}
            <Link href="/blog/croissance-web/" className="text-accent hover:underline">
              croissance web
            </Link>
            . Ma fiche à moi est une zone de service (pas de rue). Celle d&rsquo;un
            commerce peut être un établissement. On ne mélange pas.
          </p>
          <h2 className="text-2xl font-bold text-text-strong">Charcuterie Campagnarde</h2>
          <p>
            Vitrine commerçant artisanal : produits, infos pratiques, mobile. Pas
            40 pages. Autres tons : Horizon Vertical Studio, FDS, Rugby Handi Sud
            Bassin.
          </p>
          <h2 className="text-2xl font-bold text-text-strong">Budget</h2>
          <p>
            À partir de 500 € pour une vitrine, avec un espace pour mettre à
            jour le contenu. Devis après échange. Maintenance
            seulement si vous la voulez :{" "}
            <Link href="/maintenance-site-web/" className="text-accent hover:underline">
              maintenance
            </Link>
            . Zone : Saint-Laurent-Médoc, Lesparre, Pauillac, Castelnau ; Bassin
            et Bordeaux si le projet s&rsquo;y prête.{" "}
            <Link href="/rendez-vous-saint-laurent-medoc/" className="text-accent hover:underline">
              Rendez-vous
            </Link>
            .
          </p>
          <h2 className="text-2xl font-bold text-text-strong">Comment on avance</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>On parle de l&rsquo;activité.</li>
            <li>Structure de pages utile.</li>
            <li>Je développe, vous validez.</li>
            <li>Mise en ligne ; autonomie ou maintenance.</li>
          </ol>
          <p>6 avis 5★ sur la fiche Google.</p>
          <h2 className="text-2xl font-bold text-text-strong">Questions</h2>
          <p>
            Site et fiche Google ? Souvent oui, rôles différents. Combien de
            pages ? Assez pour qui / quoi / comment joindre. Pas « plus pour le
            SEO ». Mise à jour tout seul ? Si un back-office est prévu ; sinon
            mail et maintenance, sans forfait mensuel inventé.
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
