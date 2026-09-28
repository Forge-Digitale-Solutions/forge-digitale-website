import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import "../globals.css";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LocalBusinessSchema />
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="atelier"
        enableSystem={false}
        themes={["atelier", "graphite"]}
        disableTransitionOnChange
      >
        <div className="flex min-h-screen flex-col bg-bg text-text font-sans antialiased">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <FloatingWhatsAppButton />
      </ThemeProvider>
    </>
  );
}
