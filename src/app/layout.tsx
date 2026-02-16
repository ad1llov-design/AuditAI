import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "AuditAI — AI Marketing & Revenue Audit Platform",
  description:
    "AI-powered marketing audit and revenue optimization platform. Get comprehensive analysis, revenue forecasting, and actionable growth strategies.",
  openGraph: {
    title: "AuditAI — AI Marketing & Revenue Audit Platform",
    description:
      "AI-powered marketing audit and revenue optimization platform.",
    type: "website",
    siteName: "AuditAI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
