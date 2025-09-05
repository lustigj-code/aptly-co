import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aptly Study App | Master Your Meta Certification",
  description: "AI-powered study app with interactive flashcards, adaptive quizzes, and real-time analytics. Join 50K+ students with 95% pass rate.",
  keywords: "Aptly Study, Meta certification app, Facebook certification study, AI learning app, study flashcards, certification prep",
  openGraph: {
    title: "Aptly Study App | Master Your Meta Certification",
    description: "AI-powered study app with interactive flashcards, adaptive quizzes, and real-time analytics. Join 50K+ students with 95% pass rate.",
    images: [
      {
        url: "/phone-app.png",
        width: 1200,
        height: 630,
        alt: "Aptly Study App Interface",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aptly Study App | Master Your Meta Certification",
    description: "AI-powered study app with interactive flashcards and real-time analytics. 95% pass rate.",
    images: ["/phone-app.png"],
  },
};