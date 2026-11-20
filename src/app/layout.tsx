import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joidy — Personal Knowledge Management System",
  description:
    "Joidy transforms your Obsidian vault into a gamified learning ecosystem. XP, skill trees, knowledge graphs, and AI-powered insights.",
  openGraph: {
    title: "Joidy — PKM + Gamification",
    description: "Where your notes grow with you",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${firaCode.variable} ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('joidy-lang')==='en'){document.documentElement.lang='en'}}catch(e){}`,
          }}
        />
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
