"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from 'framer-motion';
import { BrandGradientBackground } from "@/components/ui/brand-gradient-background";
import { BrandButton } from "@/components/ui/brand-button";

const faqs = [
  {
    question: "What courses do you offer?",
    answer: "We offer professional certificate programs in partnership with leading organizations like Meta. Our current programs include Meta Social Media Marketing, Meta Marketing Analytics, and Meta Data Analyst Professional Certificate Programs. All courses are designed to prepare you for high-demand careers in digital marketing and data analysis."
  },
  {
    question: "Are the courses free?",
    answer: "Yes! Our professional certificate programs are completely free to enroll in. We believe in making quality education accessible to everyone. You can start learning immediately without any financial barriers."
  },
  {
    question: "How long do the courses take to complete?",
    answer: "Our professional certificate programs typically take 6 months to complete when studying part-time (about 10-15 hours per week). The courses are self-paced, so you can adjust your learning schedule to fit your lifestyle."
  },
  {
    question: "Do I get a certificate upon completion?",
    answer: "Yes! Upon successful completion of any of our professional certificate programs, you'll receive an industry-recognized certificate that you can add to your resume and LinkedIn profile. These certificates are valued by employers worldwide."
  },
  {
    question: "What if I need help during the course?",
    answer: "We provide comprehensive support throughout your learning journey. You'll have access to discussion forums, peer support, and our learning community. Additionally, our platform includes interactive elements and progress tracking to help you stay on track."
  },
  {
    question: "Can I access the courses on mobile devices?",
    answer: "Absolutely! Our learning platform is fully responsive and works seamlessly on desktop, tablet, and mobile devices. You can learn on the go and pick up where you left off across all your devices."
  },
  {
    question: "What are the technical requirements?",
    answer: "You'll need a computer or mobile device with internet access. Our platform works on all modern browsers including Chrome, Safari, Firefox, and Edge. No special software installation is required."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Simply browse our courses, choose the program that interests you, and click 'Enroll Now'. You'll be redirected to the course platform where you can create your account and begin learning immediately."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen relative">
      <BrandGradientBackground />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Frequently Asked{" "}
              <span className="text-[#21A8B0]">
                Questions
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-[#DEF2F2] max-w-4xl mx-auto leading-relaxed"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Find answers to common questions about our courses, platform, and learning experience
            </motion.p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-24 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#21A8B0]/30 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-8 text-left flex items-center justify-between"
                  >
                    <h3 className="text-xl font-bold text-white group-hover:text-[#21A8B0] transition-colors pr-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-6 h-6 text-[#21A8B0] transition-transform duration-300 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-8"
                    >
                      <div className="border-t border-white/10 pt-6">
                        <p className="text-[#DEF2F2] leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Still Have Questions?
              </h2>
              <p className="text-lg md:text-xl text-[#DEF2F2] mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Cannot find what you are looking for? Our team is here to help you get the most out of your learning experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <BrandButton
                  href="/contact"
                  variant="primary"
                  size="lg"
                >
                  Contact Support
                </BrandButton>
                <BrandButton
                  href="/courses"
                  variant="outline"
                  size="lg"
                >
                  Browse Courses
                </BrandButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Quick Links
              </h2>
              <p className="text-lg md:text-xl text-[#DEF2F2] max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Find what you need quickly
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <Link
                  href="/courses"
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#21A8B0]/30 transition-all duration-300 p-8 text-center block"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#21A8B0] to-[#0A004A] rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-2xl text-white">C</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#21A8B0] transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Browse Courses
                  </h3>
                  <p className="text-[#DEF2F2] leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Explore our professional certificate programs
                  </p>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  href="/study-app"
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#21A8B0]/30 transition-all duration-300 p-8 text-center block"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#21A8B0] to-[#0A004A] rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-2xl text-white">S</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#21A8B0] transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Study App
                  </h3>
                  <p className="text-[#DEF2F2] leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Learn about our mobile learning companion
                  </p>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <Link
                  href="/services"
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#21A8B0]/30 transition-all duration-300 p-8 text-center block"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#21A8B0] to-[#0A004A] rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-2xl text-white">E</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#21A8B0] transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Enterprise Solutions
                  </h3>
                  <p className="text-[#DEF2F2] leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Learning solutions for organizations
                  </p>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Ready to Start Learning?
              </h2>
              <p className="text-lg md:text-xl text-[#DEF2F2] mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Join thousands of learners who have already transformed their careers with our programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <BrandButton
                  href="/courses"
                  variant="primary"
                  size="lg"
                >
                  Get Started
                </BrandButton>
                <BrandButton
                  href="/"
                  variant="outline"
                  size="lg"
                >
                  Back to Home
                </BrandButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
} 