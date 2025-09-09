"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandGradientBackground } from "@/components/ui/brand-gradient-background";
import { BrandButton } from "@/components/ui/brand-button";

const appFeatures = [
  {
    title: "AI-Powered Study Tools",
    description: "Smart flashcards that adapt to your learning, personalized quiz generation, and progress predictions based on study patterns",
    icon: "brain",
    color: "teal"
  },
  {
    title: "Comprehensive Exam Prep",
    description: "Practice tests for all certificate programs, timed mock exams, and detailed answer explanations",
    icon: "exam",
    color: "navy"
  },
  {
    title: "Track Your Progress",
    description: "Daily study streaks, weakness identification, and performance analytics to optimize your learning",
    icon: "chart",
    color: "light-teal"
  },
  {
    title: "Study Anywhere",
    description: "Download content for offline use, sync across devices, and dark mode for night studying",
    icon: "mobile",
    color: "teal"
  }
];

const testimonials = [
  {
    quote: "The AI flashcards helped me pass my Meta exam on the first try!",
    author: "Sarah K.",
    certification: "Meta Social Media Marketing Professional"
  },
  {
    quote: "Love being able to study offline during my commute",
    author: "Michael P.",
    certification: "Google Data Analytics Certificate"
  }
];

export default function StudyAppPage() {
  return (
    <BrandGradientBackground variant="primary" className="min-h-screen">

      {/* Hero Section */}
      <section className="px-6 sm:px-8 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary mb-4 font-dm-sans">
              Master your certification with
            </h1>
            <h2 className="h2 text-yellow mb-8 font-dm-sans">
              Aptly Study App
            </h2>
            
            {/* App Store Ratings */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-yellow">4.8</span>
                <span className="text-secondary">App Store Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-teal">10,000+</span>
                <span className="text-secondary">Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary">Available for iOS & Android</span>
              </div>
            </div>
          </div>
          
          {/* App Screenshot */}
          <div className="flex justify-center mb-16">
            <div className="relative max-w-4xl w-full">
              <Image
                src="/phone-app.png"
                alt="Aptly Study App Interface"
                width={1400}
                height={720}
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority
              />
              {/* Offline Mode Badge */}
              <div className="absolute top-4 right-4 bg-secondary text-primary px-4 py-2 rounded-full text-sm font-medium">
                Offline Mode Supported
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="h2 text-center text-primary mb-16 font-dm-sans">
            Powerful Features to Accelerate Your Learning
          </h2>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
            {appFeatures.map((feature, index) => (
              <div key={index} className="card-standard p-8 group">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-teal/20 flex items-center justify-center flex-shrink-0">
                    {feature.icon === "brain" && (
                      <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    )}
                    {feature.icon === "exam" && (
                      <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {feature.icon === "chart" && (
                      <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                    {feature.icon === "mobile" && (
                      <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3 font-dm-sans">
                      {feature.title}
                    </h3>
                    <p className="text-secondary leading-relaxed font-dm-sans">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 bg-navy/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="h2 text-center text-primary mb-4 font-dm-sans">
            Experience the App
          </h2>
          <p className="text-center text-secondary mb-12 text-lg">
            Intuitive design meets powerful functionality
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="aspect-[9/16] bg-gradient-to-b from-teal/20 to-navy/20 rounded-lg mb-2"></div>
              <p className="text-sm text-secondary">Dashboard</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="aspect-[9/16] bg-gradient-to-b from-navy/20 to-teal/20 rounded-lg mb-2"></div>
              <p className="text-sm text-secondary">Flashcards</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="aspect-[9/16] bg-gradient-to-b from-teal/20 to-light-teal/20 rounded-lg mb-2"></div>
              <p className="text-sm text-secondary">Quiz Mode</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="aspect-[9/16] bg-gradient-to-b from-light-teal/20 to-navy/20 rounded-lg mb-2"></div>
              <p className="text-sm text-secondary">Progress</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="aspect-[9/16] bg-gradient-to-b from-navy/20 to-light-teal/20 rounded-lg mb-2"></div>
              <p className="text-sm text-secondary">AI Insights</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="h2 text-center text-primary mb-12 font-dm-sans">
            What Our Users Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-standard p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow text-xl">•</span>
                  ))}
                </div>
                <p className="text-primary text-lg mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="text-primary font-semibold">{testimonial.author}</p>
                  <p className="text-secondary text-sm">{testimonial.certification}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Store Download Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="h2 text-primary mb-6 sm:mb-8 font-dm-sans">
              Start Learning <span className="text-secondary">Today</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed font-dm-sans">
              Join thousands of professionals who have successfully earned their certifications using our proven study platform.
            </p>
            
            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto mb-12">
              <Link href="https://apps.apple.com" className="w-full sm:w-auto">
                <div className="flex items-center space-x-4 px-8 py-4 card-standard cursor-pointer">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-secondary font-dm-sans">Download on the</div>
                    <div className="text-xl font-bold text-primary font-dm-sans">App Store</div>
                  </div>
                </div>
              </Link>

              <Link href="https://play.google.com" className="w-full sm:w-auto">
                <div className="flex items-center space-x-4 px-8 py-4 card-standard bg-secondary cursor-pointer">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-secondary font-dm-sans">Get it on</div>
                    <div className="text-xl font-bold text-primary font-dm-sans">Google Play</div>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* QR Code Section */}
            <div className="flex flex-col items-center">
              <p className="text-secondary mb-4">Or scan to download</p>
              <div className="w-32 h-32 bg-white rounded-xl p-4">
                <div className="w-full h-full bg-navy/10 rounded grid grid-cols-3 gap-1 p-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-navy rounded-sm"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16 sm:mb-20">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-secondary font-dm-sans">4.8</div>
              <div className="text-secondary text-lg font-medium font-dm-sans">App Store Rating</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-yellow font-dm-sans">10K+</div>
              <div className="text-secondary text-lg font-medium font-dm-sans">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-secondary font-dm-sans">2,500+</div>
              <div className="text-secondary text-lg font-medium font-dm-sans">Study Cards</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-yellow font-dm-sans">95%</div>
              <div className="text-secondary text-lg font-medium font-dm-sans">Pass Rate</div>
            </div>
          </div>
        </div>
      </section>
    </BrandGradientBackground>
  );
}