import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { NewsletterForm } from "@/components/NewsletterForm";

const SITE_URL = "https://forgedigitalesolutions.com";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Newsletter",
  description:
    "Inscrivez-vous à la newsletter de Forge Digitale Solutions et consultez les anciens numéros : nouveaux articles et nouveaux services.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/newsletter/`,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${SITE_URL}/newsletter/`,
    title: "Newsletter | Forge Digitale Solutions",
    description:
      "Les nouveautés de Forge Digitale Solutions par email. Inscription et archive des envois.",
    siteName: "Forge Digitale Solutions",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Forge Digitale Solutions - Newsletter",
      },
    ],
  },
};

type NewsletterIssueItem = {
  id: string | number;
  dateLabel: string;
  subject: string;
  webUrl: string;
};

const DEMO_ISSUES: NewsletterIssueItem[] = [
  {
    id: "demo-octobre-2026",
    dateLabel: "Octobre 2026",
    subject: "Exemple : devis par SMS et brief de projet",
    webUrl: "https://example.com",
  },
  {
    id: "demo-septembre-2026",
    dateLabel: "Septembre 2026",
    subject: "Exemple : nouveau service de prise de rendez-vous en ligne",
    webUrl: "https://example.com",
  },
];

function formatIssueMonthYear(dateValue: string): string {
  const label = new Date(dateValue).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function isDemoArchiveEnabled(): boolean {
  return (
    process.env.NEWSLETTER_ARCHIVE_DEMO === "1" &&
    process.env.NODE_ENV !== "production"
  );
}

async function getNewsletterIssues(): Promise<NewsletterIssueItem[]> {
  if (isDemoArchiveEnabled()) return DEMO_ISSUES;

  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) return [];

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "newsletter-issues",
      overrideAccess: false,
      depth: 0,
      limit: 100,
      sort: "-date",
    });

    return result.docs
      .filter(
        (doc): doc is typeof doc & { date: string; subject: string; webUrl: string } =>
          Boolean(doc.date && doc.subject && doc.webUrl),
      )
      .map((doc) => ({
        id: doc.id,
        dateLabel: formatIssueMonthYear(doc.date),
        subject: doc.subject,
        webUrl: doc.webUrl,
      }));
  } catch (error) {
    console.error("Payload newsletter-issues unavailable", error);
    return [];
  }
}

export default async function NewsletterPage() {
  const issues = await getNewsletterIssues();

  return (
    <div className="min-h-screen bg-bg pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text-strong mb-6 tracking-tight">
            Newsletter
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            Les nouveautés de Forge Digitale Solutions par email, une fois par
            mois : nouveaux articles et nouveaux services.
          </p>
        </div>

        <section className="mb-16 max-w-md">
          <NewsletterForm variant="page" />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-strong mb-6">
            Anciens numéros
          </h2>

          {issues.length === 0 ? (
            <p className="text-soft">Aucun numéro envoyé pour le moment.</p>
          ) : (
            <ul className="space-y-6">
              {issues.map((issue) => (
                <li
                  key={issue.id}
                  className="border-b border-default pb-6 last:border-0 last:pb-0"
                >
                  <p className="text-sm text-faint mb-1">{issue.dateLabel}</p>
                  <p className="text-text-strong font-medium mb-2 break-words">
                    {issue.subject}
                  </p>
                  <a
                    href={issue.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline focus-visible:outline-1 focus-visible:outline-accent rounded"
                  >
                    Lire en ligne
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
