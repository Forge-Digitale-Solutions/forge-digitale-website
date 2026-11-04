import type { Metadata } from "next";

const SITE_URL = "https://forgedigitalesolutions.com";
const PATH = "/gameplaydev-planner/callback/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Connexion TikTok",
  description: "Vous pouvez fermer cette page.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}${PATH}`,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${SITE_URL}${PATH}`,
    title: "Connexion TikTok",
    description: "Vous pouvez fermer cette page.",
    siteName: "Forge Digitale Solutions",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Forge Digitale Solutions - Connexion TikTok",
      },
    ],
  },
};

export default function GamePlayDevCallback() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-3xl prose prose-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Connexion TikTok</h1>
        <p className="lead text-lg text-soft">Vous pouvez fermer cette page.</p>
      </div>
    </div>
  );
}
