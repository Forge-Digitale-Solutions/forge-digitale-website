import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/layout/Footer";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";

const inter = Inter({ subsets: ["latin"] });

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
    "Dépannage informatique Gironde",
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
    title: "Forge Digitale | L'Artisanat Numérique en Gironde",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="dark"
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} bg-dark-base text-slate-200 antialiased selection:bg-[#C5A059] selection:text-black`}
      >
        <LocalBusinessSchema />
        <FAQSchema />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
