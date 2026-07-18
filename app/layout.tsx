import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "haic-community-hidalgo.vocal-bream-5170.chatgpt.site";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: "HAIC · Inteligencia artificial con impacto local",
    description: "Proyectos abiertos, sesiones y conocimiento práctico de inteligencia artificial desde Hidalgo.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title: "HAIC · IA real. Impacto local.", description: "Proyectos, comunidad y conocimiento abierto desde Hidalgo.", images: [{ url: `${origin}/og.png`, width: 1664, height: 960 }] },
    twitter: { card: "summary_large_image", title: "HAIC · IA real. Impacto local.", description: "Proyectos, comunidad y conocimiento abierto desde Hidalgo.", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
