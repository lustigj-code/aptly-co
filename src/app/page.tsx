"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import SubtleLogo from "@/components/SubtleLogo";
import FeaturesSectionDemo from "@/components/ui/features-section-demo-3";
import ColourfulText from "@/components/ui/colourful-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Cover } from "@/components/ui/cover";

const partners = [
  {
    src: "https://uploads.teachablecdn.com/attachments/5z8z0OfkRZCllESTK927_Partners+%281%29.png",
    alt: "Aptly's partners: Coursera, Google, and Meta",
  },
];

const courses = [
  {
    title: "Meta Social Media Marketing Professional Certificate Program",
    link: "https://www.coursera.org/professional-certificates/facebook-social-media-marketing",
  },
  {
    title: "Meta Marketing Analytics Professional Certificate Program",
    link: "https://www.coursera.org/professional-certificates/facebook-marketing-analytics",
  },
  {
    title: "Meta Data Analyst Professional Certificate Program",
    link: "https://www.coursera.org/professional-certificates/meta-data-analyst",
  },
];

const placeholderVideo = "https://www.w3schools.com/howto/rain.mp4";

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
      className="fixed bottom-6 right-6 z-50 bg-white/70 text-neutral-900 rounded-full shadow-lg p-3 opacity-0 transition-opacity duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={{ pointerEvents: "auto" }}
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
    </button>
  );
}

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.AOS) {
    
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={placeholderVideo} type="video/mp4" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0C2A]"></div>
        
        {/* Subtle Logo in Background */}
        <div className="absolute top-20 right-8">
          <SubtleLogo size="lg" variant="gradient" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-8 max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight font-sans text-white">
            Prepare for the jobs of{" "}
            <Cover>tomorrow, today!</Cover>
          </h1>
          <p className="text-2xl sm:text-3xl font-light mb-10 text-white/90 max-w-3xl mx-auto">
            Digital learning solutions that engage and deliver results
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link
              href="/courses"
              className="inline-block px-12 py-5 rounded-full bg-white/80 text-neutral-900 font-bold text-xl shadow-xl border border-white/30 backdrop-blur hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Browse Courses
            </Link>
          </div>
          
          {/* Partners Section - moved here */}
          <div className="text-center">
            <h2 className="text-xl uppercase tracking-widest text-white/80 mb-8 font-medium">
              Trusted by leading organizations
            </h2>
            <div className="flex justify-center">
              <Image
                src={partners[0].src}
                alt={partners[0].alt}
                width={400}
                height={100}
                className="object-contain h-24 w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Demo with Aptly Navy Blue Background and Shooting Stars */}
      <section className="relative py-20 bg-[#1e3a8a] bg-opacity-30">
        <div className="absolute inset-0 -z-10">
          <ShootingStars 
            starColor="#ffffff" 
            trailColor="#4a90e2"
            minDelay={800}
            maxDelay={3000}
          />
          <StarsBackground 
            starDensity={0.0001}
            allStarsTwinkle={true}
            twinkleProbability={0.6}
          />
        </div>
        <div className="relative z-10">
          <FeaturesSectionDemo />
        </div>
      </section>

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}
