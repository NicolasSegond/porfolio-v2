import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nicolas Segond — Développeur Fullstack",
  description: "Portfolio de Nicolas Segond, développeur fullstack.",
  other: { "viewport": "width=device-width, initial-scale=1, viewport-fit=cover" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
