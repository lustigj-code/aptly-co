import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: "Aptly - Professional Certificates from Meta & Google",
  description: "Transform your career with industry-recognized certifications from Meta, Google, and leading tech companies. Join 50,000+ successful graduates.",
  keywords: "professional certificates, Meta certificates, Google certificates, digital marketing, data analytics, career change, online learning",
  openGraph: {
    title: "Aptly - Professional Certificates from Meta & Google",
    description: "Transform your career with industry-recognized certifications",
    url: "https://aptly.co",
    siteName: "Aptly",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aptly - Professional Certificates",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aptly - Professional Certificates",
    description: "Transform your career with industry-recognized certifications",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans antialiased">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}