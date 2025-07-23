"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] via-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#7AB8BD] to-[#F1D632] bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-xl sm:text-2xl font-light text-blue-100/90 max-w-3xl mx-auto mb-8">
            Find answers to common questions about our courses, platform, and learning experience
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] to-[#3B3366]">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <h3 className="text-xl font-medium text-white group-hover:text-blue-200 transition-colors pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-6 h-6 text-blue-300 transition-transform duration-300 ${
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
                  <div className="px-6 pb-6">
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-blue-100/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
                Still Have Questions?
              </h2>
              <p className="text-xl font-light text-blue-100/80 mb-8 max-w-2xl mx-auto">
                Can&apos;t find what you&apos;re looking for? Our team is here to help you get the most out of your learning experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-[#7AB8BD] to-[#0A0C2A] rounded-lg text-white font-medium hover:from-[#6BB3C3] hover:to-[#3B3366] transition-all duration-300">
                  Contact Support
                </button>
                <Link
                  href="/courses"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300"
                >
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] to-[#3B3366]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              Quick Links
            </h2>
            <p className="text-xl font-light text-blue-100/80 max-w-2xl mx-auto">
              Find what you need quickly
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link
              href="/courses"
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 p-8 text-center"
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-medium text-white mb-3 group-hover:text-blue-200 transition-colors">
                Browse Courses
              </h3>
              <p className="text-blue-100/70">
                Explore our professional certificate programs
              </p>
            </Link>
            <Link
              href="/study-app"
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 p-8 text-center"
            >
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-medium text-white mb-3 group-hover:text-blue-200 transition-colors">
                Study App
              </h3>
              <p className="text-blue-100/70">
                Learn about our mobile learning companion
              </p>
            </Link>
            <Link
              href="/services"
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 p-8 text-center"
            >
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-medium text-white mb-3 group-hover:text-blue-200 transition-colors">
                Enterprise Solutions
              </h3>
              <p className="text-blue-100/70">
                Learning solutions for organizations
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
                Ready to Start Learning?
              </h2>
              <p className="text-xl font-light text-blue-100/80 mb-8 max-w-2xl mx-auto">
                Join thousands of learners who have already transformed their careers with our programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/courses"
                  className="px-8 py-4 bg-gradient-to-r from-[#7AB8BD] to-[#0A0C2A] rounded-lg text-white font-medium hover:from-[#6BB3C3] hover:to-[#3B3366] transition-all duration-300"
                >
                  Get Started
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 