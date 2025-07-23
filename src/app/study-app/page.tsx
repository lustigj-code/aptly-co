"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Cover } from "@/components/ui/cover";

export default function StudyAppPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background matching your website's design language */}
      <div className="absolute inset-0 bg-[#1e3a8a] bg-opacity-30">
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

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section with Container Scroll Animation */}
        <div className="flex flex-col overflow-hidden">
          {/* Static title above the animation */}
          <div className="text-center pt-24 pb-4">
            <h1 className="text-4xl font-semibold text-white">
              Master your Meta certification with
            </h1>
          </div>
          
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl md:text-[6rem] font-bold leading-none bg-gradient-to-r from-[#7AB8BD] to-[#F1D632] bg-clip-text text-transparent">
                  Aptly Study
                </h1>
              </>
            }
          >
            <Image
              src="/phone-app.png"
              alt="Aptly Study App Interface"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>

        {/* Main Content Section - Seamless Phone Integration */}
        <section className="relative py-12 px-4">
          <div className="max-w-7xl mx-auto">
            

            {/* Three Feature Cards - No Yellow */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              
              {/* AI-Powered Learning Card - Teal */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5
                }}
                className="relative p-8 rounded-3xl backdrop-blur-lg border border-white/10 group cursor-pointer transform-gpu"
                style={{
                  background: 'linear-gradient(135deg, rgba(122, 184, 189, 0.9) 0%, rgba(107, 179, 195, 0.8) 100%)',
                  boxShadow: '0 25px 50px -12px rgba(122, 184, 189, 0.3)'
                }}
              >
                {/* Animated Background Pattern */}
                <motion.div
                  animate={{ 
                    x: [0, 20, 0],
                    y: [0, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full blur-xl"
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#ffde00] transition-colors duration-300">
                    AI-Powered Learning
                  </h3>
                  
                  <p className="text-white/90 leading-relaxed mb-6">
                    Smart algorithms adapt to your learning style, identifying weak spots and optimizing study sessions for maximum retention.
                  </p>
                  
                  {/* Progress Indicator */}
                  <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="h-2 bg-[#ffde00] rounded-full"
                    />
                  </div>
                  <span className="text-sm text-white/80">85% Accuracy Rate</span>
                </div>
              </motion.div>

              {/* Real-time Analytics Card - Navy */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  rotateX: 5
                }}
                className="relative p-8 rounded-3xl backdrop-blur-lg border border-white/10 group cursor-pointer transform-gpu"
                style={{
                  background: 'linear-gradient(135deg, rgba(10, 12, 42, 0.9) 0%, rgba(59, 51, 102, 0.8) 100%)',
                  boxShadow: '0 25px 50px -12px rgba(10, 0, 74, 0.4)'
                }}
              >
                {/* Animated Chart Pattern */}
                <motion.div
                  animate={{ 
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-[#7AB8BD]/20 to-transparent rounded-3xl"
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#21a8b0]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#21a8b0] transition-colors duration-300">
                    Real-time Analytics
                  </h3>
                  
                  <p className="text-white/90 leading-relaxed mb-6">
                    Track your progress with detailed insights, performance metrics, and personalized recommendations to ace your certification.
                  </p>
                  
                  {/* Mini Chart */}
                  <div className="flex items-end space-x-2 mb-4">
                    {[40, 65, 52, 78, 85, 72, 90].map((height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.7 }}
                        className="bg-[#21a8b0] rounded-t-sm flex-1 min-h-[20px] max-h-[60px]"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-white/80">Weekly Progress Trend</span>
                </div>
              </motion.div>

              {/* Interactive Flashcards Card - Light Blue */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -5
                }}
                className="relative p-8 rounded-3xl backdrop-blur-lg border border-white/10 group cursor-pointer transform-gpu"
                style={{
                  background: 'linear-gradient(135deg, rgba(122, 184, 189, 0.9) 0%, rgba(107, 179, 195, 0.8) 100%)',
                  boxShadow: '0 25px 50px -12px rgba(56, 189, 248, 0.3)'
                }}
              >
                {/* Floating Cards Animation */}
                <motion.div
                  animate={{ 
                    rotate: [0, 10, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute top-6 right-6 w-12 h-8 bg-white/30 rounded-lg"
                />
                <motion.div
                  animate={{ 
                    rotate: [0, -8, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute top-8 right-8 w-12 h-8 bg-white/20 rounded-lg"
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#ffde00] transition-colors duration-300">
                    Interactive Flashcards
                  </h3>
                  
                  <p className="text-white/90 leading-relaxed mb-6">
                    Spaced repetition flashcards with multimedia content, instant feedback, and adaptive difficulty based on your performance.
                  </p>
                  
                  {/* Card Stack Indicator */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
                          className="w-8 h-12 bg-white/30 rounded-md"
                        />
                      ))}
                    </div>
                    <span className="text-white/90 text-sm font-semibold">2,500+ Cards</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* App Store Download Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Download <span style={{ color: '#21a8b0' }}>Aptly Study</span> Today
              </h2>
              
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
                Join thousands of students who have successfully passed their Meta certification using our proven study platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="https://apps.apple.com/us/app/aptly-study/id1589524769?platform=iphone" target="_blank" rel="noopener">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-4 px-8 py-4 rounded-2xl transition-all duration-300 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #0A0C2A 0%, #3B3366 100%)',
                      boxShadow: '0 20px 40px -12px rgba(10, 0, 74, 0.6)'
                    }}
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-white/80">Download on the</div>
                      <div className="text-xl font-bold text-white">App Store</div>
                    </div>
                  </motion.div>
                </Link>

                <Link href="https://play.google.com/store/apps/details?id=com.aptly.study" target="_blank" rel="noopener">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-4 px-8 py-4 rounded-2xl transition-all duration-300 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #7AB8BD 0%, #6BB3C3 100%)',
                      boxShadow: '0 20px 40px -12px rgba(33, 168, 176, 0.6)'
                    }}
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-white/80">Get it on</div>
                      <div className="text-xl font-bold text-white">Google Play</div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Success Metrics Section */}
        <section className="relative py-16 px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {[
                {
                  number: "95%",
                  label: "Pass Rate",
                  color: "#21a8b0"
                },
                {
                  number: "50K+",
                  label: "Students",
                  color: "#ffde00"
                },
                {
                  number: "2,500+",
                  label: "Study Cards",
                  color: "#21a8b0"
                },
                {
                  number: "4.8★",
                  label: "App Rating",
                  color: "#ffde00"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    className="text-5xl font-bold mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-white/80 text-lg font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Core Features Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "https://uploads.teachablecdn.com/attachments/Dt7XhvePQsuJkYN1rQq4_Icon--14.png",
                  title: "Adaptive Quizzes",
                  description: "Interactive quizzes with real-time feedback that adapt to your learning pace and identify areas for improvement.",
                  accent: "#21a8b0"
                },
                {
                  icon: "https://uploads.teachablecdn.com/attachments/iCxUyR9xTziWhwRCb1Qs_Icon--15.png",
                  title: "Smart Flashcards",
                  description: "Spaced repetition flashcards with multimedia content designed to maximize retention and recall.",
                  accent: "#0A004A"
                },
                {
                  icon: "https://uploads.teachablecdn.com/attachments/TezhKDXWTvW6eUAVj6DP_Icon--16.png",
                  title: "Progress Analytics",
                  description: "Detailed progress tracking with personalized insights to keep you motivated and on track for certification success.",
                  accent: "#21a8b0"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02
                  }}
                  className="relative group"
                >
                  <div 
                    className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 h-full border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:shadow-2xl"
                    style={{
                      boxShadow: `0 25px 50px -12px ${feature.accent}20`
                    }}
                  >
                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-20 h-20 rounded-2xl p-4 mx-auto"
                        style={{
                          background: `linear-gradient(135deg, ${feature.accent}20, ${feature.accent}10)`
                        }}
                      >
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </motion.div>
                      
                      {/* Accent dot */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-2 -right-2 w-4 h-4 rounded-full"
                        style={{ backgroundColor: feature.accent }}
                      />
                    </div>
                    
                    <h3 
                      className="text-2xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300"
                      style={{ color: feature.accent }}
                    >
                      {feature.title}
                    </h3>
                    
                    <p className="text-white/80 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Bottom accent bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                      className="h-1 rounded-full mt-6"
                      style={{ backgroundColor: feature.accent }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}