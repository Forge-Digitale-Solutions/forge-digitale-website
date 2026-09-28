import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/services/agent-ready/`;
const BLOG_AGENT_READY = "/blog/site-agent-ready/";

function hasBlogAgentReady() {
  return fs.existsSync(
    path.join(process.cwd(), "src/posts/site-agent-ready.md"),
  );
}

export const metadata: Metadata = {
  title: "Pack Agent Ready : site lisible par les assistants",
  description:
    "Prestation sur un site déjà en ligne : robots.txt, sitemap, llms.txt et règles d'usage pour les assistants. Essentiel 190 € TTC, Complet 350 € TTC. Option sur un site neuf.",
  keywords: [
    "Pack Agent Ready",
    "llms.txt",
    "robots.txt assistants",
    "site existant TPE",
    "Forge Digitale Solutions",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: "Pack Agent Ready : site lisible par les assistants",
    description:
      "Rendre un site déjà en ligne trouvable et lisible par les assistants, avec des règles d'usage claires. Essentiel 190 € TTC, Complet 350 € TTC.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Pack Agent Ready, Forge Digitale Solutions",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pack Agent Ready",
  serviceType: "Mise en conformité technique pour assistants",
  description:
    "Prestation sur un site déjà en ligne : audit léger, robots.txt, Content Signals, sitemap, llms.txt et compte-rendu. Formule Complet : en-têtes Link et catalogue d'API minimal. Essentiel 190 € TTC, Complet 350 € TTC. TVA non applicable, article 293 B du CGI.",
  url: PAGE_URL,
  areaServed: [
    { "@type": "AdministrativeArea", name: "Médoc" },
    { "@type": "Place", name: "Bassin d'Arcachon" },
    { "@type": "AdministrativeArea", name: "Gironde" },
  ],
  provider: {
    "@id": `${SITE_URL}/#business`,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Agent Ready Essentiel",
      priceCurrency: "EUR",
      price: "190",
      description:
        "Prestation seule sur site existant, 190 € TTC. TVA non applicable, article 293 B du CGI.",
    },
    {
      "@type": "Offer",
      name: "Agent Ready Complet",
      priceCurrency: "EUR",
      price: "350",
      description:
        "Prestation seule sur site existant, 350 € TTC. TVA non applicable, article 293 B du CGI.",
    },
  ],
};

const essentielInclus = [
  "Audit léger (30 à 45 min) : robots.txt, sitemap, pages clés, hébergeur ou CMS, bots déjà présents.",
  "robots.txt à jour : règles de crawl, règles pour les bots nommés quand c'est utile, lien vers le sitemap.",
  "Content Signals (search, ai-input, ai-train) selon votre politique. Proposition par défaut : search=yes, ai-input=yes, ai-train=no.",
  "Sitemap XML présent, valide et référencé.",
  "Fichier llms.txt (index court) à la racine, ou au chemin annoncé.",
  "Compte-rendu d'une page : avant, après, checklist, captures ou lien isitagentready.com si c'est pertinent.",
  "Une retouche sous 15 jours si un point de ce socle casse après la mise en production.",
];

const completEnPlus = [
  "En-têtes HTTP Link vers llms.txt et le sitemap, si l'hébergeur le permet.",
  "Catalogue minimal /.well-known/api-catalog (linkset JSON), si le déploiement est possible.",
  "Contrôle isitagentready sur le profil contenu.",
  "Recommandation écrite des marches suivantes (Markdown, DNS-AID), sans les réaliser dans le pack.",
];

const horsPack = [
  "Refonte du design, rédaction pour le référencement, fiche Google, publicité.",
  "Passage du site en Markdown si le CMS ou le CDN l'interdit sans reprise du projet.",
  "DNS-AID et DNSSEC.",
  "WebMCP et outils navigateur expérimentaux.",
  "Authentification d'agents, carte de serveur MCP, commerce entre agents.",
  "Nouveaux articles ou nouvelles pages, au-delà du fichier llms.txt.",
];

export default function PackAgentReadyPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Pack Agent Ready", url: PAGE_URL },
        ]}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="text-sm text-faint mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-accent transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-soft">Pack Agent Ready</span>
        </nav>

        <header className="mb-10">
          <span className="text-accent font-mono font-bold tracking-widest uppercase text-xs mb-4 block">
            Sites existants
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
            Pack Agent Ready
          </h1>
          <p className="text-lg text-soft leading-relaxed">
            Je rends votre site déjà en ligne trouvable et lisible par les
            assistants (ChatGPT, Perplexity et les autres), avec des règles
            claires sur ce qu&apos;ils ont le droit d&apos;en faire.
          </p>
          <p className="text-lg text-soft leading-relaxed mt-4">
            Le pack livre des fichiers et des règles techniques. Il ne promet
            pas un score d&apos;audit, un référencement, ni une place dans les
            réponses d&apos;un assistant.
          </p>
        </header>

        <div className="space-y-10 text-soft leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-strong">Pour qui</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                TPE, artisan ou commerce local qui a déjà un site : prestation
                seule.
              </li>
              <li>
                Site neuf Forge Digitale Solutions : option ajoutée au devis de
                création. Le ticket d&apos;entrée d&apos;un site reste à partir
                de 500&nbsp;€ HT.
              </li>
              <li>
                Boutique en ligne lourde, application, ou authentification entre
                agents : hors pack. Devis à part.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-strong">
              Deux formules
            </h2>
            <p>
              Prix sur site existant, hors site neuf. TVA non applicable,
              article 293&nbsp;B du CGI.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="p-6 rounded-lg bg-surface-card border border-default flex flex-col">
                <p className="text-xs font-mono uppercase tracking-widest text-accent">
                  Formule A
                </p>
                <h3 className="text-xl font-bold text-text-strong mt-2">
                  Essentiel
                </h3>
                <p className="text-2xl font-bold text-accent mt-2">190&nbsp;€ TTC</p>
                <p className="text-sm mt-4">
                  WordPress, HTML simple, ou un accès FTP / panel suffisant.
                  Délai indicatif : 3 à 5 jours ouvrés après réception des
                  accès.
                </p>
              </article>
              <article className="p-6 rounded-lg bg-surface-card border border-default flex flex-col">
                <p className="text-xs font-mono uppercase tracking-widest text-accent">
                  Formule B
                </p>
                <h3 className="text-xl font-bold text-text-strong mt-2">
                  Complet
                </h3>
                <p className="text-2xl font-bold text-accent mt-2">350&nbsp;€ TTC</p>
                <p className="text-sm mt-4">
                  Stack où le serveur, le CDN ou les en-têtes sont accessibles.
                  Délai indicatif : 5 à 8 jours ouvrés.
                </p>
              </article>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-strong">
              Inclus dans l&apos;Essentiel
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              {essentielInclus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-strong">
              En plus dans le Complet
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              {completEnPlus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-strong">Hors pack</h2>
            <ul className="list-disc pl-5 space-y-2">
              {horsPack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-strong">
              Option sur un site neuf
            </h2>
            <p>
              Ajout au devis de création (à partir de 500&nbsp;€ HT). Le prix
              est plus bas parce que le chantier est déjà ouvert.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Essentiel : +90&nbsp;€ TTC</li>
              <li>Complet : +190&nbsp;€ TTC</li>
            </ul>
            <p>
              Détail de la création :{" "}
              <Link
                href="/creation-site-web/"
                className="text-accent hover:underline"
              >
                création de site web
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-strong">
              Majorations, dites avant le devis
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                CMS fermé (Wix, Jimdo, Squarespace) sans accès aux fichiers :
                +100 à +200&nbsp;€ TTC, refus du pack, ou conseil seul à
                150&nbsp;€ TTC.
              </li>
              <li>
                Site multilingue, ou plus de 50 URL à traiter à la main :
                +100&nbsp;€ TTC.
              </li>
              <li>
                Accès admin, DNS ou hébergeur manquants : le délai est
                suspendu. Relance, puis devis gelé 30 jours.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-strong">Déroulement</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Vous écrivez ou vous appelez : URL du site, CMS, et qui détient
                les accès.
              </li>
              <li>
                Scan gratuit d&apos;environ 10 minutes (robots.txt, sitemap,
                isitagentready si l&apos;outil répond). Je vous dis si le pack
                convient, en Essentiel ou en Complet.
              </li>
              <li>
                Devis d&apos;une page : périmètre, prix, accès requis, délai.
              </li>
              <li>Mise en place.</li>
              <li>Compte-rendu, avec l&apos;état avant et après.</li>
            </ol>
          </section>
        </div>

        <nav
          className="mt-12 p-6 rounded-lg bg-surface-card border border-default"
          aria-label="Pages liées"
        >
          <p className="text-muted text-sm mb-3">À voir aussi</p>
          <ul className="space-y-2">
            <li>
              <Link href="/#services" className="text-accent hover:underline">
                Carte Pack Agent Ready, section services de l&apos;accueil
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="text-accent hover:underline">
                Contact et devis
              </Link>
            </li>
            <li>
              <Link
                href="/creation-site-web/"
                className="text-accent hover:underline"
              >
                Création de site web
              </Link>
            </li>
            <li>
              <Link
                href="/maintenance-site-web/"
                className="text-accent hover:underline"
              >
                Maintenance de site web
              </Link>
            </li>
            {hasBlogAgentReady() ? (
              <li>
                <Link
                  href={BLOG_AGENT_READY}
                  className="text-accent hover:underline"
                >
                  Article : rendre un site lisible par les assistants
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>

        <section className="mt-12 pt-8 border-t border-default">
          <p className="text-soft mb-6">
            Un site à rendre lisible par les assistants ? Écrivez-moi.
          </p>
          <Link href="/#contact" className="btn-primary gap-2 px-6 py-3">
            Demander un devis
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
