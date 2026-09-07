import type { Metadata } from "next";
import localFont from "next/font/local";
import { Preferences } from "@/components/preferences";
import "./globals.css";

const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
});
const space = localFont({
  src: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-display",
  display: "swap",
});
const title = "Zakian Maulana Syaifulloh | CV & Portofolio Developer";
const description =
  "Kenali Zakian, web developer dari Bekasi dengan pengalaman membangun aplikasi bisnis menggunakan Laravel, React, dan Next.js. Lihat profil, perjalanan karier, dan proyek pilihannya.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),
  ),
  title,
  description,
  authors: [{ name: "Zakian Maulana Syaifulloh" }],
  keywords: [
    "Zakian Maulana Syaifulloh",
    "Web Developer",
    "Laravel",
    "Next.js",
    "React",
    "Portfolio",
    "Bekasi",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "id_ID",
    siteName: "Zakian · CV & Portofolio",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const preferencesScript = `try{var r=document.documentElement;r.dataset.theme='light';r.dataset.motion=matchMedia('(prefers-reduced-motion: reduce)').matches||localStorage.getItem('portfolio-motion')==='off'?'off':'on'}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-theme="light"
      suppressHydrationWarning
      className={`${manrope.variable} ${space.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferencesScript }} />
      </head>
      <body>
        <Preferences>{children}</Preferences>
      </body>
    </html>
  );
}
