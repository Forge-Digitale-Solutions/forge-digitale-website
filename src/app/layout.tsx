import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://forgedigitalesolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Forge Digitale Solutions | Création Site Web & Dépannage Médoc",
    template: "%s | Forge Digitale Solutions",
  },
  description:
    "L'artisanat numérique au service du Médoc. Création de sites web, applications sur mesure et dépannage informatique à Saint-Laurent-Médoc.",
  keywords: [
    "Création site web Médoc",
    "Dépannage informatique Saint-Laurent",
    "Montage PC sur mesure",
    "Réparation ordinateur 33",
    "Développeur web Gironde",
    "Next.js",
  ],
  authors: [{ name: "Anthony Marcelin" }],
  openGraph: {
    title: "Forge Digitale Solutions",
    description: "L'artisanat numérique au service du Médoc.",
    url: SITE_URL,
    siteName: "Forge Digitale Solutions",
    locale: "fr_FR",
    type: "website",
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
