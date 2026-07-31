import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
