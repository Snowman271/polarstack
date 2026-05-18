import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://polar-stack.com"),
  title: "Polar Stack - Premium Web Development",
  description:
    "We build from scratch. No templates, no shortcuts. Custom web development built for performance, precision, and scale.",
  keywords: ["web development", "custom websites", "Next.js", "freelance", "agency"],
  authors: [{ name: "Polar Stack" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: "Polar Stack - Premium Web Development",
    description: "Cold. Carved for you. We build from scratch.",
    type: "website",
    url: "https://polar-stack.com",
    siteName: "Polar Stack",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polar Stack - Premium Web Development",
    description: "Cold. Carved for you. We build from scratch.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${inter.variable} font-body antialiased bg-[#080C10] text-slate-200`}
      >
        {children}
      </body>
    </html>
  );
}
