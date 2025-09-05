"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandGradientBackground } from "@/components/ui/brand-gradient-background";
import { BrandButton } from "@/components/ui/brand-button";

export default function StudyAppPage() {
  return (
    <BrandGradientBackground variant="primary" className="min-h-screen">

      {/* Hero Section */}
      <section className="px-6 sm:px-8 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 font-dm-sans">
              Master your Meta certification with
            </h1>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-yellow mb-8 font-dm-sans">
              Aptly Study
            </h2>
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
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Three Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-20 sm:mb-24">
              
              {/* AI-Powered Learning Card */}
              <div className="relative p-8 rounded-3xl bg-teal/90 border border-white/10 group">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 font-dm-sans">
                  AI-Powered Learning
                </h3>
                
                <p className="text-white/90 leading-relaxed mb-6 font-dm-sans">
                  Smart algorithms adapt to your learning style, identifying weak spots and optimizing study sessions for maximum retention.
                </p>
                
                {/* Progress Indicator */}
                <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                  <div className="h-2 bg-yellow rounded-full" style={{width: '85%'}}></div>
                </div>
                <span className="text-sm text-white/80 font-dm-sans">85% Accuracy Rate</span>
              </div>

              {/* Real-time Analytics Card */}
              <div className="relative p-8 rounded-3xl bg-navy/90 border border-white/10 group">
                <div className="w-16 h-16 rounded-2xl bg-teal/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 font-dm-sans">
                  Real-time Analytics
                </h3>
                
                <p className="text-white/90 leading-relaxed mb-6 font-dm-sans">
                  Track your progress with detailed insights, performance metrics, and personalized recommendations to ace your certification.
                </p>
                
                {/* Mini Chart */}
                <div className="flex items-end space-x-2 mb-4">
                  <div className="bg-teal rounded-t-sm flex-1 h-8"></div>
                  <div className="bg-teal rounded-t-sm flex-1 h-13"></div>
                  <div className="bg-teal rounded-t-sm flex-1 h-10"></div>
                  <div className="bg-teal rounded-t-sm flex-1 h-16"></div>
                  <div className="bg-teal rounded-t-sm flex-1 h-17"></div>
                  <div className="bg-teal rounded-t-sm flex-1 h-14"></div>
                  <div className="bg-teal rounded-t-sm flex-1 h-18"></div>
                </div>
                <span className="text-sm text-white/80 font-dm-sans">Weekly Progress Trend</span>
              </div>

              {/* Interactive Flashcards Card */}
              <div className="relative p-8 rounded-3xl bg-light-teal/90 border border-white/10 group">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-navy mb-4 font-dm-sans">
                  Interactive Flashcards
                </h3>
                
                <p className="text-navy/80 leading-relaxed mb-6 font-dm-sans">
                  Spaced repetition flashcards with multimedia content, instant feedback, and adaptive difficulty based on your performance.
                </p>
                
                {/* Card Stack Indicator */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex space-x-1">
                    <div className="w-8 h-12 bg-navy/30 rounded-md"></div>
                    <div className="w-8 h-12 bg-navy/30 rounded-md"></div>
                    <div className="w-8 h-12 bg-navy/30 rounded-md"></div>
                    <div className="w-8 h-12 bg-navy/30 rounded-md"></div>
                    <div className="w-8 h-12 bg-navy/30 rounded-md"></div>
                  </div>
                  <span className="text-navy/90 text-sm font-semibold font-dm-sans">2,500+ Cards</span>
                </div>
              </div>
            </div>

            {/* App Store Download Section */}
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 font-dm-sans">
                Download <span className="text-teal">Aptly Study</span> Today
              </h2>
              
              <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed font-dm-sans">
                Join thousands of students who have successfully passed their Meta certification using our proven study platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
                <div className="flex items-center space-x-4 px-8 py-4 rounded-2xl bg-navy border border-white/10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-white/80 font-dm-sans">Download on the</div>
                    <div className="text-xl font-bold text-white font-dm-sans">App Store</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 px-8 py-4 rounded-2xl bg-teal border border-white/10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-white/80 font-dm-sans">Get it on</div>
                    <div className="text-xl font-bold text-white font-dm-sans">Google Play</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16 sm:mb-20">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 text-teal font-dm-sans">95%</div>
                <div className="text-white/80 text-lg font-medium font-dm-sans">Pass Rate</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 text-yellow font-dm-sans">50K+</div>
                <div className="text-white/80 text-lg font-medium font-dm-sans">Students</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 text-teal font-dm-sans">2,500+</div>
                <div className="text-white/80 text-lg font-medium font-dm-sans">Study Cards</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 text-yellow font-dm-sans">4.8★</div>
                <div className="text-white/80 text-lg font-medium font-dm-sans">App Rating</div>
              </div>
            </div>

            {/* Core Features Grid */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Adaptive Quizzes */}
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 h-full border border-white/10">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl p-4 mx-auto bg-teal/20">
                    <Image
                      src="https://uploads.teachablecdn.com/attachments/Dt7XhvePQsuJkYN1rQq4_Icon--14.png"
                      alt="Adaptive Quizzes"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-teal font-dm-sans">
                  Adaptive Quizzes
                </h3>
                
                <p className="text-white/80 leading-relaxed font-dm-sans">
                  Interactive quizzes with real-time feedback that adapt to your learning pace and identify areas for improvement.
                </p>

                <div className="h-1 rounded-full mt-6 bg-teal"></div>
              </div>

              {/* Smart Flashcards */}
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 h-full border border-white/10">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl p-4 mx-auto bg-navy/20">
                    <Image
                      src="https://uploads.teachablecdn.com/attachments/iCxUyR9xTziWhwRCb1Qs_Icon--15.png"
                      alt="Smart Flashcards"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-navy font-dm-sans">
                  Smart Flashcards
                </h3>
                
                <p className="text-white/80 leading-relaxed font-dm-sans">
                  Spaced repetition flashcards with multimedia content designed to maximize retention and recall.
                </p>

                <div className="h-1 rounded-full mt-6 bg-navy"></div>
              </div>

              {/* Progress Analytics */}
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 h-full border border-white/10">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl p-4 mx-auto bg-teal/20">
                    <Image
                      src="https://uploads.teachablecdn.com/attachments/TezhKDXWTvW6eUAVj6DP_Icon--16.png"
                      alt="Progress Analytics"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-teal font-dm-sans">
                  Progress Analytics
                </h3>
                
                <p className="text-white/80 leading-relaxed font-dm-sans">
                  Detailed progress tracking with personalized insights to keep you motivated and on track for certification success.
                </p>

                <div className="h-1 rounded-full mt-6 bg-teal"></div>
              </div>
            </div>
          </div>
        </section>
    </BrandGradientBackground>
  );
}