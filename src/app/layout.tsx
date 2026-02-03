import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "La Forge Digitale Solutions | Création Site Web & Dépannage Médoc",
  description:
    "L'artisanat numérique au service du Médoc. Création de sites web, applications sur mesure et dépannage informatique à Saint-Laurent-Médoc.",
  keywords: [
    "Création site web Médoc",
    "Dépannage informatique Saint-Laurent",
    "Montage PC sur mesure",
    "Réparation ordinateur 33",
    "Développeur web Gironde",
  ],
  authors: [{ name: "Anthony Marcelin" }],
  openGraph: {
    title: "La Forge Digitale Solutions",
    description: "L'artisanat numérique au service du Médoc.",
    url: "https://laforgedigitale.fr",
    siteName: "La Forge Digitale Solutions",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
