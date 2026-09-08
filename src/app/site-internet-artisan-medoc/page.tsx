import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/site-internet-artisan-medoc/`;

const TITLE = "Site internet pour artisan et commerçant dans le Médoc";
const DESCRIPTION =
  "Site vitrine pour artisans et commerces du Médoc. Exemple Charcuterie Campagnarde. À partir de 500 €, devis sans catalogue. Site et fiche Google, chacun son rôle.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const faq = [
  {
    q: "Il me faut un site et une fiche Google ?",
    a: "Souvent oui, pour des raisons différentes. La fiche oriente. Le site explique.",
  },
  {
    q: "Combien de pages ?",
    a: "Assez pour dire qui vous êtes, ce que vous vendez, comment vous joindre. Pas plus « pour le référencement ».",
  },
  {
    q: "Je mets à jour tout seul ?",
    a: "Si on prévoit un back-office, oui. Sinon un mail suffit, et on traite ça en maintenance si vous le souhaitez.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function ArtisanPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Site internet artisan", url: PAGE_URL },
        ]}
      />
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="text-sm text-faint mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-accent transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-soft">Site internet artisan</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
          Site internet pour artisan ou commerçant dans le Médoc
        </h1>

        <div className="space-y-6 text-lg text-soft leading-relaxed">
          <p>
            Je m&rsquo;adresse aux artisans et commerçants du Médoc qui
            n&rsquo;ont pas une équipe communication. Je m&rsquo;appelle Anthony
            Marcelin, créateur de sites indépendant à Saint-Laurent-Médoc.
            Passionné de technique depuis vingt ans. Un seul interlocuteur.
          </p>
          <p>
            Vous avez souvent Instagram, Facebook, parfois une fiche Google. Ça
            sert. Ça ne remplace pas un site à vous : l&rsquo;offre expliquée,
            les photos que vous choisissez, un texte qui ne tient pas en deux
            cents caractères.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Ce que fait le site (et ce que fait la fiche Google)
          </h2>
          <p>
            La fiche Google oriente : le lieu, les horaires, les avis. J&rsquo;ai
            posé les bases ici :{" "}
            <Link
              href="/blog/fiche-google-artisans/"
              className="text-accent hover:underline"
            >
              fiche Google pour artisans
            </Link>
            .
          </p>
          <p>
            Le site explique : qui vous êtes, ce que vous vendez, comment on
            vous joint, pourquoi venir. Les deux se complètent. Ma propre fiche
            est une zone de service, sans rue. Celle d&rsquo;un commerce avec
            vitrine peut être un établissement. On ne mélange pas les deux
            logiques.
          </p>
          <p>
            Voir aussi{" "}
            <Link
              href="/blog/site-web-ou-reseaux-sociaux/"
              className="text-accent hover:underline"
            >
              site web ou réseaux sociaux
            </Link>{" "}
            et{" "}
            <Link
              href="/blog/croissance-web/"
              className="text-accent hover:underline"
            >
              croissance web
            </Link>
            .
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Charcuterie Campagnarde
          </h2>
          <p>
            Site vitrine pour un commerçant artisanal : produits, infos
            pratiques, lecture sur mobile. Pas quarante pages. Une vitrine qui
            ressemble au métier.
          </p>
          <p>
            Horizon Vertical Studio, côté studio, montre un autre ton : galerie
            et activité expliquée. Rugby Handi Sud Bassin, côté asso, montre
            l&rsquo;autonomie de mise à jour. Trois usages, même exigence :
            clair, utile, tenable.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Comment on avance
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>On parle de l&rsquo;activité, pas d&rsquo;un brief marketing.</li>
            <li>Je propose une structure de pages utile.</li>
            <li>Je développe. Vous validez.</li>
            <li>
              Mise en ligne. Ensuite vous publiez seuls si on l&rsquo;a prévu, ou
              je reste disponible.
            </li>
          </ol>
          <p>
            Je réalise votre site et je reste votre interlocuteur après sa mise
            en ligne. Selon vos besoins, je peux aussi assurer
            l&rsquo;hébergement, les sauvegardes et les mises à jour.
          </p>
          <p>
            Pour un site, on travaille en visio ou au téléphone. Un rendez-vous
            en personne, si besoin, se place dans un lieu public. Pas
            d&rsquo;accueil boutique. Voir{" "}
            <Link
              href="/rendez-vous-saint-laurent-medoc/"
              className="text-accent hover:underline"
            >
              rendez-vous
            </Link>
            .
          </p>
          <p>
            Zone : Saint-Laurent-Médoc, Médoc, Bassin d&rsquo;Arcachon, Bordeaux,
            environ 50 km.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">Budget</h2>
          <p>
            Une vitrine claire, avec un espace pour mettre à jour le contenu, à
            partir de 500 €. Devis après un échange. Pas de catalogue de
            formules.
          </p>
          <p>
            Maintenance et hébergement : seulement si vous le voulez, au cas par
            cas. Voir{" "}
            <Link
              href="/maintenance-site-web/"
              className="text-accent hover:underline"
            >
              maintenance
            </Link>
            .
          </p>
          <p>
            Six avis 5 étoiles sur{" "}
            <a
              href="https://www.google.com/search?kgmid=/g/11zbjsx1hc"
              className="text-accent hover:underline"
              rel="noopener noreferrer"
            >
              la fiche Google
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Questions fréquentes
          </h2>
          {faq.map((item) => (
            <p key={item.q}>
              <strong>{item.q}</strong>
              <br />
              {item.a}
            </p>
          ))}

          <h2 className="text-2xl font-bold text-text-strong">Me joindre</h2>
          <p>
            <a href="tel:+33645659696" className="text-accent hover:underline">
              06 45 65 96 96
            </a>{" "}
            ·{" "}
            <a
              href="mailto:contact@forgedigitalesolutions.com"
              className="text-accent hover:underline"
            >
              contact@forgedigitalesolutions.com
            </a>{" "}
            ·{" "}
            <Link href="/#contact" className="text-accent hover:underline">
              formulaire
            </Link>
            . Détail prestation :{" "}
            <Link
              href="/creation-site-web/"
              className="text-accent hover:underline"
            >
              création de site web
            </Link>
            .
          </p>
        </div>

        <section className="mt-12 pt-8 border-t border-default">
          <Link href="/#contact" className="btn-primary gap-2 px-6 py-3">
            Demander un devis
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
