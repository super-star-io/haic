import type { Metadata } from "next";
import "./globals.css";
import "./requirements.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haic-hidalgo.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "HAIC · Tecnología que mejora nuestra comunidad",
  description: "Aprende inteligencia artificial colaborando en proyectos reales y abiertos que buscan resolver problemas de Hidalgo.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "HAIC · Tecnología que mejora vidas",
    description: "Aprende, construye y genera impacto con una comunidad abierta desde Hidalgo.",
    images: [{ url: "/og.jpg", width: 1200, height: 686 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HAIC · Tecnología que mejora vidas",
    description: "Aprende, construye y genera impacto con una comunidad abierta desde Hidalgo.",
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
