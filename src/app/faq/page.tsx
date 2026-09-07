import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/faq/`;

export const metadata: Metadata = {
  title: "FAQ : sites web, montage PC et Linux à Saint-Laurent-Médoc",
  description:
    "Réponses claires sur la création de sites, la maintenance, le montage PC (149 €) et le forfait Renaissance (69 €). Saint-Laurent-Médoc, sur rendez-vous.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: "FAQ : sites web, montage PC et Linux à Saint-Laurent-Médoc",
    description:
      "Réponses claires sur la création de sites, la maintenance, le montage PC (149 €) et le forfait Renaissance (69 €). Saint-Laurent-Médoc, sur rendez-vous.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "FAQ Forge Digitale Solutions",
      },
    ],
  },
};

const qa = [
  {
    q: "Combien coûte la création d’un site internet ?",
    a: "Il n’y a pas de packs. Une vitrine claire, utile, pensée pour le téléphone, avec un espace pour mettre à jour le contenu, à partir de 500 €. Au-delà, le prix dépend de ce que le site doit vraiment faire : boutique, formulaires avancés, application métier. Le devis est gratuit.",
  },
  {
    q: "Combien de pages ? Est-ce que je mets à jour tout seul ?",
    a: "Le nombre de pages suit l’activité. Exemple : Rugby Handi Sud Bassin (La Teste-de-Buch) a un back-office Statamic pour que les bénévoles gèrent le contenu.",
  },
  {
    q: "Faut-il un site si j’ai déjà Instagram ?",
    a: "Les réseaux ne remplacent pas un site que vous possédez.",
  },
  {
    q: "Et après la mise en ligne ?",
    a: "Oui, si vous le voulez. Hébergement, domaine, mises à jour, sauvegardes, sécurité : au cas par cas. Pas de forfait mensuel unique.",
  },
  {
    q: "Vous maintenez un site que vous n’avez pas créé ?",
    a: "Souvent oui, si j’ai les accès admin, hébergeur et DNS. Diagnostic d’abord. Si le socle est trop fragile, je le dis avant.",
  },
  {
    q: "Comment se passe le montage ? Dois-je acheter les pièces ?",
    a: "Oui : les pièces sont à votre nom (factures et garanties). Forfait 149 €, après récupération de la machine sur rendez-vous.",
  },
  {
    q: "Le forfait 149 € inclut-il Windows ?",
    a: "Non. Licence à part, ou Linux.",
  },
  {
    q: "Pourquoi pas un PC tout fait ?",
    a: "Le budget va sur les bonnes pièces, le montage chez moi, sur créneau.",
  },
  {
    q: "Une pièce tombe en panne plus tard ?",
    a: "Les garanties sont celles des fabricants. J’aide à identifier le SAV. Ce n’est pas une assurance tout-remplacé.",
  },
  {
    q: "Que devient mon disque / mes fichiers ?",
    a: "Forfait Renaissance : sauvegarde avant. Montage neuf : pas d’anciens fichiers sauf migration. Je ne jette pas un disque sans accord.",
  },
  {
    q: "Je n’y connais rien ?",
    a: "On part de l’usage.",
  },
  {
    q: "Pourquoi Linux (Forfait Renaissance) ?",
    a: "Un PC qui rame n’est pas forcément mort. Linux Mint, 69 €, environ 2 h, plus 1 h de prise en main.",
  },
  {
    q: "Windows 10 n’est plus suivi ?",
    a: "Ça dépend de l’usage. Si un logiciel métier bloque, je le dis avant.",
  },
  {
    q: "Intervenez-vous à domicile ?",
    a: "Je ne reçois pas le public chez moi. Pour le web : visio, téléphone, ou RDV en lieu public. Pour un PC : récupération sur rendez-vous. Déplacements exceptionnels, devis, environ 50 km (Médoc, Bassin, Bordeaux).",
  },
  {
    q: "Sans rendez-vous ?",
    a: "Non. 06 45 65 96 96, contact@forgedigitalesolutions.com, ou le formulaire de contact.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: qa.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

function Qa({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-text-strong">{q}</h3>
      <div className="text-lg text-soft leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "FAQ", url: PAGE_URL },
        ]}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="text-sm text-faint mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-accent transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-soft">FAQ</span>
        </nav>

        <header className="mb-10">
          <span className="text-accent font-mono font-bold tracking-widest uppercase text-xs mb-4 block">
            Questions fréquentes
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
            FAQ : sites, PC et Linux, les questions que l&rsquo;on me pose vraiment
          </h1>
        </header>

        <div className="space-y-6 text-lg text-soft leading-relaxed mb-12">
          <p>
            Je m&rsquo;appelle Anthony Marcelin. Je suis développeur indépendant
            (EI, SIREN 100 857 838), titulaire du titre professionnel de
            Concepteur Développeur d&rsquo;Applications, et je bricole le web et
            le matériel depuis plus de 20 ans. Un seul interlocuteur : moi. Cette
            page rassemble les questions que l&rsquo;on me pose le plus souvent,
            à Saint-Laurent-Médoc, au téléphone ou avant un devis. Elle complète
            les pages services, elle ne les remplace pas.
          </p>
          <p>
            Si vous cherchez le détail d&rsquo;une prestation :{" "}
            <Link href="/creation-site-web/" className="text-accent hover:underline">
              création de site
            </Link>
            ,{" "}
            <Link href="/maintenance-site-web/" className="text-accent hover:underline">
              maintenance
            </Link>
            ,{" "}
            <Link href="/montage-pc/" className="text-accent hover:underline">
              montage PC
            </Link>
            ,{" "}
            <Link href="/installation-linux/" className="text-accent hover:underline">
              forfait Renaissance
            </Link>
            . Pour un échange :{" "}
            <Link href="/#contact" className="text-accent hover:underline">
              me contacter
            </Link>
            .
          </p>
        </div>

        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-strong">Création web</h2>
            <Qa q="Combien coûte la création d’un site internet ?">
              <p>
                Il n&rsquo;y a pas de packs. Une vitrine claire, utile, pensée
                pour le téléphone, avec un espace pour mettre à jour le contenu,
                à partir de 500 €. Au-delà, le prix dépend de ce que le site
                doit vraiment faire : boutique, formulaires avancés, application
                métier. Devis gratuit. Voir{" "}
                <Link href="/creation-site-web/" className="text-accent hover:underline">
                  création de site web
                </Link>{" "}
                et{" "}
                <Link href="/developpeur-medoc/" className="text-accent hover:underline">
                  développeur dans le Médoc
                </Link>
                .
              </p>
            </Qa>
            <Qa q="Combien de pages ? Est-ce que je mets à jour tout seul ?">
              <p>
                Le nombre suit l&rsquo;activité. Exemple : Rugby Handi Sud Bassin
                (La Teste-de-Buch) : back-office Statamic pour que les bénévoles
                gèrent le contenu.
              </p>
            </Qa>
            <Qa q="Faut-il un site si j’ai déjà Instagram ?">
              <p>
                Les réseaux ne remplacent pas un site que vous possédez. Voir{" "}
                <Link
                  href="/blog/site-web-ou-reseaux-sociaux/"
                  className="text-accent hover:underline"
                >
                  site web ou réseaux sociaux
                </Link>{" "}
                et{" "}
                <Link href="/blog/croissance-web/" className="text-accent hover:underline">
                  croissance web
                </Link>
                .
              </p>
            </Qa>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-strong">Maintenance</h2>
            <Qa q="Et après la mise en ligne ?">
              <p>
                Oui si vous le voulez. Hébergement, domaine, mises à jour,
                sauvegardes, sécurité : au cas par cas. Pas de forfait mensuel
                unique.{" "}
                <Link href="/maintenance-site-web/" className="text-accent hover:underline">
                  Maintenance de site
                </Link>{" "}
                et{" "}
                <Link href="/blog/sauvegarde-donnees/" className="text-accent hover:underline">
                  sauvegarde des données
                </Link>
                .
              </p>
            </Qa>
            <Qa q="Vous maintenez un site que vous n’avez pas créé ?">
              <p>
                Souvent oui, si accès admin, hébergeur et DNS. Diagnostic
                d&rsquo;abord. Si le socle est trop fragile, je le dis avant.
              </p>
            </Qa>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-strong">Montage PC</h2>
            <Qa q="Comment se passe le montage ? Dois-je acheter les pièces ?">
              <p>
                Oui : pièces à votre nom (factures et garanties). Forfait 149 €,
                après récupération de la machine sur rendez-vous.{" "}
                <Link href="/montage-pc/" className="text-accent hover:underline">
                  Montage PC
                </Link>
                .
              </p>
            </Qa>
            <Qa q="Le forfait 149 € inclut-il Windows ?">
              <p>Non. Licence à part, ou Linux.</p>
            </Qa>
            <Qa q="Pourquoi pas un PC tout fait ?">
              <p>Budget sur les bonnes pièces, montage chez moi, sur créneau.</p>
            </Qa>
            <Qa q="Pièce en panne plus tard ?">
              <p>
                Garanties fabricants. J&rsquo;aide à identifier le SAV. Pas une
                assurance tout-remplacé.
              </p>
            </Qa>
            <Qa q="Que devient mon disque / mes fichiers ?">
              <p>
                Renaissance : sauvegarde avant. Montage neuf : pas d&rsquo;anciens
                fichiers sauf migration. Je ne jette pas un disque sans accord.
              </p>
            </Qa>
            <Qa q="Je n’y connais rien ?">
              <p>On part de l&rsquo;usage.</p>
            </Qa>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-strong">Forfait Renaissance</h2>
            <Qa q="Pourquoi Linux ?">
              <p>
                Un PC qui rame n&rsquo;est pas forcément mort. Mint, 69 €, environ
                2 h, 1 h de prise en main.{" "}
                <Link href="/installation-linux/" className="text-accent hover:underline">
                  Installation Linux
                </Link>{" "}
                et{" "}
                <Link href="/blog/forfait-renaissance/" className="text-accent hover:underline">
                  forfait Renaissance
                </Link>
                .
              </p>
            </Qa>
            <Qa q="Windows 10 plus suivi ?">
              <p>Cas d&rsquo;usage. Si un logiciel métier bloque, je le dis avant.</p>
            </Qa>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-strong">Rendez-vous et déplacements</h2>
            <Qa q="À domicile ?">
              <p>
                Je ne reçois pas le public chez moi. Pour le web : visio,
                téléphone, ou RDV en lieu public. Pour un PC : récupération sur
                rendez-vous. Déplacements exceptionnels, devis, environ 50 km
                (Médoc, Bassin, Bordeaux).
              </p>
            </Qa>
            <Qa q="Sans rendez-vous ?">
              <p>
                Non.{" "}
                <a href="tel:+33645659696" className="text-accent hover:underline">
                  06 45 65 96 96
                </a>
                ,{" "}
                <a
                  href="mailto:contact@forgedigitalesolutions.com"
                  className="text-accent hover:underline"
                >
                  contact@forgedigitalesolutions.com
                </a>{" "}
                ou{" "}
                <Link href="/#contact" className="text-accent hover:underline">
                  le formulaire
                </Link>
                .
              </p>
            </Qa>
            <p>
              Communes : Saint-Laurent-Médoc, Lesparre-Médoc, Pauillac,
              Castelnau-de-Médoc, Arcachon / Bassin, Bordeaux. Ne pas venir
              « à l&rsquo;adresse Google ».
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-strong">Devis et paiement</h2>
            <p>
              Devis gratuit. Montants fermes : à partir de 500 € pour une
              vitrine, 149 € montage, 69 € Renaissance. Le reste au cas par cas.
              Cadre :{" "}
              <Link href="/cgv/" className="text-accent hover:underline">
                CGV
              </Link>
              .
            </p>
          </section>
        </div>

        <section className="mt-12 pt-8 border-t border-default">
          <p className="text-soft mb-6">
            Une question qui n&rsquo;est pas là ? Écrivez-moi ou appelez.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#contact" className="btn-primary gap-2 px-6 py-3">
              Me contacter
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href="tel:+33645659696" className="text-accent hover:underline self-center">
              06 45 65 96 96
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
