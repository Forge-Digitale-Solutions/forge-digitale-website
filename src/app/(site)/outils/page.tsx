import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { products, withProductUtm } from "@/lib/products";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/outils/`;

const PAGE_TITLE = "Nos outils";
const PAGE_DESCRIPTION =
  "Les outils conçus par Forge Digitale Solutions, à commencer par Grilla pour auditer l'accessibilité d'un site selon le RGAA.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/outils/og-outils.jpg`,
        width: 1200,
        height: 630,
        alt: "Outils conçus par Forge Digitale Solutions",
      },
    ],
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Outils édités par Forge Digitale Solutions",
  url: PAGE_URL,
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "SoftwareApplication",
      name: product.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: product.url,
      description: product.description,
      publisher: {
        "@type": "Organization",
        name: "Forge Digitale Solutions",
        url: `${SITE_URL}/`,
      },
    },
  })),
};

export default function OutilsPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Nos outils", url: PAGE_URL },
        ]}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <nav className="text-sm text-faint mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-accent transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-soft">Nos outils</span>
        </nav>

        <header className="mb-12 max-w-3xl">
          <span className="fds-eyebrow mb-4 block">Logiciels édités</span>
          <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
            Nos outils
          </h1>
          <p className="text-lg text-soft leading-relaxed">
            Forge Digitale Solutions conçoit ses propres outils. Vous trouvez
            ici les logiciels que nous éditons, avec un lien vers chaque site.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {products.map((product) => (
            <li
              key={product.id}
              className={product.image ? "md:col-span-2" : undefined}
            >
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-default bg-surface-card transition-colors hover:border-strong">
                {product.image ? (
                  <figure>
                    <Image
                      src={product.image.src}
                      alt={product.image.alt}
                      width={product.image.width}
                      height={product.image.height}
                      sizes="(max-width: 768px) 100vw, 960px"
                      className="h-auto w-full"
                      priority
                    />
                    <figcaption className="border-t border-default px-8 py-2 text-sm text-muted">
                      Site fictif de démonstration
                    </figcaption>
                  </figure>
                ) : null}
                <div className="flex flex-1 flex-col p-8">
                  {product.placeholder ? (
                    <p className="fds-eyebrow mb-3">Texte provisoire</p>
                  ) : null}
                  <h2 className="text-2xl font-bold text-text-strong">
                    {product.name}
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-soft">
                    {product.description}
                  </p>
                  <a
                    href={withProductUtm(product.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Découvrir ${product.name} (nouvelle fenêtre)`}
                    className="btn-primary mt-6 w-fit gap-2 px-6 py-3 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                  >
                    Découvrir
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
