import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/rendez-vous-saint-laurent-medoc/`;

export const metadata: Metadata = {
  title: "Rendez-vous à Saint-Laurent-Médoc",
  description:
    "Indépendant à Saint-Laurent-Médoc. Sites en visio ou téléphone. RDV en lieu public. Récupération PC sur rendez-vous. Médoc, Bassin, Bordeaux (~50 km).",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: "Rendez-vous à Saint-Laurent-Médoc",
    description:
      "Indépendant à Saint-Laurent-Médoc. Sites en visio ou téléphone. RDV en lieu public. Récupération PC sur rendez-vous. Médoc, Bassin, Bordeaux (~50 km).",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Rendez-vous à Saint-Laurent-Médoc, Forge Digitale Solutions",
      },
    ],
  },
};

const faq = [
  {
    q: "Sans RDV ?",
    a: "Non.",
  },
  {
    q: "Je peux venir chez vous avec mon PC ?",
    a: "Non comme boutique. On calcule un créneau de récupération.",
  },
  {
    q: "Site internet : faut-il se voir ?",
    a: "Non. Visio / téléphone suffisent.",
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

export default function RendezVousPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Rendez-vous", url: PAGE_URL },
        ]}
      />
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
          Comment on se voit (et comment on récupère un PC)
        </h1>
        <div className="space-y-6 text-lg text-soft leading-relaxed">
          <p>
            Je m&rsquo;appelle Anthony Marcelin. Créateur de sites indépendant
            (EI), basé à Saint-Laurent-Médoc. Un seul interlocuteur : moi.
          </p>
          <p>
            Je ne reçois pas le public chez moi. Ce n&rsquo;est pas une boutique,
            et je n&rsquo;ouvre pas d&rsquo;accueil. Pour un site internet, on
            travaille en visio, au téléphone, ou on se donne rendez-vous dans un
            lieu public (café, open space), sur créneau.
          </p>
          <p>
            Pour un montage PC ou un forfait Renaissance, je récupère la machine
            sur rendez-vous. Je travaille chez moi, comme une arrière-boutique,
            pas comme un magasin ouvert. On ne « dépose pas » sans créneau, et on
            ne vient pas à une adresse trouvée sur Maps : ma fiche Google est une
            zone de service, sans rue.
          </p>
          <p>
            Forge Digitale Solutions - Anthony Marcelin (EI) - 6 rue
            Saint-Julien, 33112 Saint-Laurent-Médoc -{" "}
            <a href="tel:+33645659696" className="text-accent hover:underline">
              06 45 65 96 96
            </a>{" "}
            -{" "}
            <a
              href="mailto:contact@forgedigitalesolutions.com"
              className="text-accent hover:underline"
            >
              contact@forgedigitalesolutions.com
            </a>
            . L&rsquo;adresse sert au courrier et au cadre légal, pas comme une
            vitrine où entrer.
          </p>
          <p>
            Zone : Médoc, Bassin d&rsquo;Arcachon, Bordeaux, environ 50 km.
            Déplacements exceptionnels, sur devis.
          </p>
        </div>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-text-strong">FAQ courte</h2>
          {faq.map((item) => (
            <div key={item.q} className="space-y-2">
              <h3 className="text-xl font-semibold text-text-strong">{item.q}</h3>
              <p className="text-lg text-soft leading-relaxed">{item.a}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 pt-8 border-t border-default">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <Link href="/#contact" className="btn-primary gap-2 px-6 py-3">
              Me contacter
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="tel:+33645659696"
              className="text-accent hover:underline self-center"
            >
              06 45 65 96 96
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
