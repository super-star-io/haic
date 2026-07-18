import type { Metadata } from "next";
import "./globals.css";
import "./requirements.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haic-hidalgo.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "HAIC · Inteligencia artificial con impacto local",
  description: "Proyectos abiertos, sesiones y conocimiento práctico de inteligencia artificial desde Hidalgo.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "HAIC · IA real. Impacto local.",
    description: "Proyectos, comunidad y conocimiento abierto desde Hidalgo.",
    images: [{ url: "/og.jpg", width: 1200, height: 686 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HAIC · IA real. Impacto local.",
    description: "Proyectos, comunidad y conocimiento abierto desde Hidalgo.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
