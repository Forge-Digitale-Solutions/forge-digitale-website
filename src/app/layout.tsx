import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Spline_Sans_Mono } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-text",
  display: "swap",
});
const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://forgedigitalesolutions.com";

const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL?.trim();
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();

function umamiScriptSrc(url: string): string {
  const trimmed = url.replace(/\/+$/, "");
  return trimmed.endsWith("/script.js") ? trimmed : `${trimmed}/script.js`;
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Forge Digitale Solutions | Création Web & Dépannage (Médoc - Gironde)",
    template: "%s | Forge Digitale Solutions",
  },
  description:
    "Expert numérique en Gironde : sites internet sur-mesure, dépannage, Linux et PC gamer. Basé à Saint-Laurent-Médoc, du Bassin d'Arcachon à Bordeaux.",
  keywords: [
    "Informaticien Saint-Laurent-Médoc",
    "Création site web Médoc",
    "Développeur freelance Bordeaux",
    "Agence web Bassin d'Arcachon",
    "Maintenance informatique Gironde",
    "Site internet artisan",
    "Application web sur-mesure",
    "Montage PC Gamer Bordeaux",
    "Installation Linux Mint",
    "Réparation ordinateur Médoc",
  ],
  authors: [{ name: "Anthony Marcelin" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${SITE_URL}/`,
    title: "Forge Digitale Solutions | Création Web & Dépannage (Médoc - Gironde)",
    description:
      "Web & Hardware. Solutions sur-mesure pour les professionnels et particuliers du Médoc au Bassin d'Arcachon.",
    siteName: "Forge Digitale Solutions",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Forge Digitale Solutions - Web & PC",
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${archivo.variable} ${splineMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {process.env.NODE_ENV === "production" && umamiUrl && umamiWebsiteId ? (
          <Script
            defer
            src={umamiScriptSrc(umamiUrl)}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
