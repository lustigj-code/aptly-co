"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AptlyLogo } from "@/components/AptlyLogo";
import FeaturesSection from "@/components/ui/features-section";
import TrustSection from "@/components/ui/trust-section";
import BentoGrid from "@/components/ui/bento-grid";
import { BrandGradientBackground } from "@/components/ui/brand-gradient-background";
import { BrandButton } from "@/components/ui/brand-button";

const partners = [
  {
    src: "https://uploads.teachablecdn.com/attachments/5z8z0OfkRZCllESTK927_Partners+%281%29.png",
    alt: "Aptly's partners: Coursera, Google, and Meta",
  },
];

function BackToTopButton() {
  useEffect(() => {
    const handleScroll = () => {
      const btn = document.getElementById("back-to-top");
      if (btn) btn.style.opacity = window.scrollY > 300 ? "1" : "0";
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <button
      id="back-to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 bg-white/90 text-navy rounded-full shadow-lg p-4 opacity-0 transition-opacity duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
      style={{ pointerEvents: "auto" }}
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <BrandGradientBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8 py-24">
        {/* Logo in top right */}
        <div className="absolute top-8 right-8 z-20">
          <AptlyLogo variant="horizontal" colorScheme="white" size="sm" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-12 leading-tight text-white font-sans">
            Prepare for the jobs of tomorrow, today
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-16 text-white/90 max-w-4xl mx-auto leading-relaxed">
            Digital learning solutions that engage and deliver results
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-24">
            <BrandButton href="/courses" variant="primary" size="lg">
              Browse Courses
            </BrandButton>
            <BrandButton href="/study-app" variant="secondary" size="lg">
              Try Study App
            </BrandButton>
          </div>
          
          {/* Partners Section */}
          <div className="text-center">
            <h2 className="text-lg uppercase tracking-widest text-white/80 mb-12 font-medium">
              Trusted by leading organizations
            </h2>
            <div className="flex justify-center">
              <Image
                src={partners[0].src}
                alt={partners[0].alt}
                width={400}
                height={100}
                className="object-contain h-20 w-auto opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative py-24">
        <TrustSection />
      </section>

      {/* Bento Grid Section */}
      <section className="relative py-24">
        <BentoGrid />
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-navy">
        <div className="relative z-10">
          <FeaturesSection />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
            Ready to start your learning journey
          </h2>
          <p className="text-xl sm:text-2xl font-light mb-16 text-white/90 leading-relaxed">
            Join thousands of learners advancing their careers with professional certificates
          </p>
          <BrandButton href="/courses" variant="primary" size="lg">
            Get Started Today
          </BrandButton>
        </div>
      </section>

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}
