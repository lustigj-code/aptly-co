import "./globals.css";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"],
  display: 'swap',
  variable: '--font-dm-sans'
});

export const metadata = {
  title: "Aptly | Learning That Sticks",
  description: "Digital learning solutions that engage and deliver results. Master your Meta certification with AI-powered study tools, interactive flashcards, and real-time analytics.",
  keywords: "Aptly, Meta certification, Facebook certification, social media marketing, digital learning, online education, study app, AI learning",
  authors: [{ name: "Aptly" }],
  creator: "Aptly",
  publisher: "Aptly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://aptly.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aptly | Learning That Sticks",
    description: "Digital learning solutions that engage and deliver results. Master your Meta certification with AI-powered study tools.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://aptly.co",
    siteName: "Aptly",
    images: [
      {
        url: "/aptly-logo.png",
        width: 1200,
        height: 630,
        alt: "Aptly - Digital Learning Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aptly | Learning That Sticks",
    description: "Digital learning solutions that engage and deliver results. Master your Meta certification with AI-powered study tools.",
    images: ["/aptly-logo.png"],
    creator: "@aptly",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/aptly-logo.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} ${dmSans.variable} bg-navy text-white antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}