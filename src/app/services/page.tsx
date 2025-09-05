'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { BrandGradientBackground } from "@/components/ui/brand-gradient-background";
import { BrandButton } from "@/components/ui/brand-button";

const services = [
  {
    title: "Corporate Training",
    description: "Custom learning solutions designed for your organization's specific needs and goals",
    features: ["Custom curriculum design", "Employee skill assessment", "Progress tracking", "Certification programs"],
    icon: "C"
  },
  {
    title: "Learning Consulting",
    description: "Expert guidance to optimize your learning strategy and maximize ROI",
    features: ["Learning needs analysis", "Technology recommendations", "Implementation support", "ROI measurement"],
    icon: "L"
  },
  {
    title: "Content Development",
    description: "High-quality educational content tailored to your audience and objectives",
    features: ["Interactive modules", "Video production", "Assessment creation", "Multimedia content"],
    icon: "D"
  },
  {
    title: "Platform Integration",
    description: "Seamless integration with your existing learning management systems",
    features: ["LMS integration", "API development", "Custom dashboards", "Data synchronization"],
    icon: "P"
  }
];

export default function ServicesPage() {
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Learning{" "}
              <span className="text-[#21A8B0]">
                Solutions
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-[#DEF2F2] max-w-4xl mx-auto mb-8 leading-relaxed"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Comprehensive digital learning services to transform how your organization educates and develops talent
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <BrandButton
                href="/contact"
                variant="primary"
                size="lg"
              >
                Get a Quote
              </BrandButton>
              <BrandButton
                href="/demo"
                variant="outline"
                size="lg"
              >
                Schedule Demo
              </BrandButton>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Our Services
              </h2>
              <p className="text-lg md:text-xl text-[#DEF2F2] max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                End-to-end learning solutions designed for modern organizations
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#21A8B0]/30 transition-all duration-300 p-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#21A8B0] to-[#0A004A] rounded-full flex items-center justify-center mb-8">
                    <div className="text-2xl text-white font-bold">{service.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-[#21A8B0] transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {service.title}
                  </h3>
                  <p className="text-[#DEF2F2] mb-8 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-[#DEF2F2]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        <div className="w-5 h-5 bg-[#21A8B0] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Our Process
              </h2>
              <p className="text-lg md:text-xl text-[#DEF2F2] max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                A proven methodology to deliver exceptional learning experiences
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "1", title: "Discovery", description: "We analyze your needs and objectives to understand your learning goals" },
                { number: "2", title: "Design", description: "Our experts create a customized learning strategy and content plan" },
                { number: "3", title: "Develop", description: "We build and test your learning solution with quality assurance" },
                { number: "4", title: "Deploy", description: "Launch your solution with ongoing support and optimization" }
              ].map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 + i * 0.1 }}
                  className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#21A8B0]/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#21A8B0] to-[#0A004A] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>{step.title}</h3>
                  <p className="text-[#DEF2F2] leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Ready to Transform Your Learning?
              </h2>
              <p className="text-lg md:text-xl text-[#DEF2F2] mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Let us discuss how we can help you create impactful learning experiences for your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <BrandButton
                  href="/contact"
                  variant="primary"
                  size="lg"
                >
                  Contact Us
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