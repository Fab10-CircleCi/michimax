import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  // Base para la imagen al compartir. Define SITE_URL si el sitio se publica en otro dominio.
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Michimax · Streaming felino",
    template: "%s · Michimax",
  },
  description: "Series, películas y documentales felinos en formato vertical. Treinta títulos, siete vidas.",
};

export const viewport: Viewport = {
  themeColor: "#1a0b16",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
