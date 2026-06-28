import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";

// Archivo variable font with the width (wdth) axis. Body uses the default
// width; display headings widen to ~125 (the "Expanded" instance) via
// `font-stretch` in globals.css. Self-hosted by next/font (no Google request).
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Forge Digitale Solutions | Création Web & Dépannage (Médoc - Gironde)",
    template: "%s | Forge Digitale Solutions",
  },
  description:
    "Expert numérique en Gironde. Création de sites internet sur-mesure et solutions informatiques (Dépannage, Linux, PC Gamer). Basé à Saint-Laurent-Médoc, partenaire des pros du Bassin d'Arcachon à Bordeaux.",
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
    url: SITE_URL,
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
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/feed`,
    },
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
        <Script
          defer
          src="https://stats.forgedigitalesolutions.com/script.js"
          data-website-id="e45a87dd-4a11-425c-9ff7-779a722575ba"
          strategy="afterInteractive"
        ></Script>
      </head>
      <body className="bg-bg text-text font-sans antialiased">
        <LocalBusinessSchema />
        <FAQSchema />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="atelier"
          enableSystem={false}
          themes={["atelier", "graphite"]}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <FloatingWhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
