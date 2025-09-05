'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { BrandGradientBackground } from "@/components/ui/brand-gradient-background";
import { BrandButton } from "@/components/ui/brand-button";
import { AptlyLogo } from "@/components/AptlyLogo";

const jobs = [
  {
    title: "Senior Learning Experience Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Create engaging and effective learning experiences that drive results for our clients."
  },
  {
    title: "Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Build beautiful, responsive interfaces for our learning platform using modern web technologies."
  },
  {
    title: "Learning Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description: "Help our clients achieve their learning goals and maximize the value of our platform."
  },
  {
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    description: "Develop and execute marketing strategies to grow our product adoption and brand awareness."
  }
];

const benefits = [
  "Competitive salary and equity",
  "Flexible remote work options",
  "Health, dental, and vision insurance",
  "Unlimited PTO",
  "Professional development budget",
  "401(k) matching",
  "Home office stipend",
  "Team retreats and events"
];

export default function CareersPage() {
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
              Join Our{" "}
              <span className="text-[#21A8B0]">
                Team
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-[#DEF2F2] max-w-4xl mx-auto mb-8 leading-relaxed"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Help us transform the future of learning. We are looking for passionate individuals who want to make a difference.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <BrandButton
                href="#positions"
                variant="primary"
                size="lg"
              >
                View Open Positions
              </BrandButton>
              <BrandButton
                href="#culture"
                variant="outline"
                size="lg"
              >
                Learn About Culture
              </BrandButton>
            </motion.div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="positions" className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Open Positions
              </h2>
              <p className="text-lg md:text-xl text-[#DEF2F2] max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Find your next opportunity to make an impact in the learning space
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {jobs.map((job, i) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#21A8B0]/30 transition-all duration-300 p-8"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#21A8B0] transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {job.title}
                      </h3>
                      <p className="text-[#21A8B0] font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {job.department}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-2 bg-[#21A8B0]/20 text-[#21A8B0] text-sm rounded-full font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#DEF2F2] mb-6 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {job.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#DEF2F2] font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>{job.location}</span>
                    <BrandButton
                      href={`/careers/apply/${job.title.toLowerCase().replace(/\s+/g, '-')}`}
                      variant="outline"
                      size="sm"
                    >
                      Apply Now
                    </BrandButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Why Work With Us
              </h2>
              <p className="text-lg md:text-xl text-[#DEF2F2] max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                We believe in taking care of our team so they can do their best work
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 + i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#21A8B0]/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#21A8B0] to-[#0A004A] rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-xl text-white">B</div>
                  </div>
                  <p className="text-[#DEF2F2] font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section id="culture" className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Our Culture
                </h2>
                <p className="text-lg text-[#DEF2F2] mb-6 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  At Aptly, we believe in fostering a culture of continuous learning, innovation, and collaboration. Our team is passionate about making education accessible to everyone.
                </p>
                <p className="text-lg text-[#DEF2F2] mb-6 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  We value diversity, creativity, and the drive to make a positive impact. Whether you are a designer, developer, or learning expert, you will find a place to grow and contribute meaningfully.
                </p>
                <p className="text-lg text-[#DEF2F2] leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Join us in building the future of learning technology.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 flex items-center justify-center">
                  <AptlyLogo size="lg" className="opacity-80" />
                </div>
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
              transition={{ duration: 0.8, delay: 1.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Ready to Join Us?
              </h2>
              <p className="text-lg md:text-xl text-[#DEF2F2] mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Do not see the perfect role? Send us your resume and we will keep you in mind for future opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <BrandButton
                  href="/careers/apply/general"
                  variant="primary"
                  size="lg"
                >
                  Submit Application
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