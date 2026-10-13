import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://forgedigitalesolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Inscription confirmée | Forge Digitale Solutions",
  description:
    "Merci pour votre inscription à la newsletter de Forge Digitale Solutions.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${SITE_URL}/newsletter/merci/`,
  },
};

export default function NewsletterMerciPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-xl text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-text-strong">
          Inscription confirmée
        </h1>
        <p className="text-soft leading-relaxed">
          Merci. Vous recevrez un email à chaque nouvel article, pas plus. Vous
          pourrez vous désinscrire en un clic depuis n&apos;importe quel envoi.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/blog/" className="btn-primary px-6 py-3">
            Lire le blog
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-strong px-6 py-3 text-soft hover:bg-surface hover:text-text-strong transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
