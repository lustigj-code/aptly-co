'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { BrandGradientBackground } from "@/components/ui/brand-gradient-background";
import { BrandButton } from "@/components/ui/brand-button";

const articles = [
  {
    title: "The Future of Digital Learning in 2024",
    excerpt: "Explore the latest trends and technologies shaping the future of education and professional development.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Trends"
  },
  {
    title: "How AI is Transforming Corporate Training",
    excerpt: "Discover how artificial intelligence is revolutionizing the way organizations approach employee development.",
    author: "Michael Chen",
    date: "March 10, 2024",
    readTime: "7 min read",
    category: "Technology"
  },
  {
    title: "Building Effective Learning Cultures",
    excerpt: "Learn the key strategies for creating a workplace culture that prioritizes continuous learning and growth.",
    author: "Emily Rodriguez",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Culture"
  },
  {
    title: "Measuring Learning ROI: A Complete Guide",
    excerpt: "Understand how to measure and demonstrate the return on investment of your learning initiatives.",
    author: "David Kim",
    date: "February 28, 2024",
    readTime: "8 min read",
    category: "Analytics"
  },
  {
    title: "The Rise of Microlearning",
    excerpt: "Why bite-sized learning is becoming the preferred method for skill development in the modern workplace.",
    author: "Lisa Wang",
    date: "February 20, 2024",
    readTime: "4 min read",
    category: "Methodology"
  },
  {
    title: "Remote Learning Best Practices",
    excerpt: "Essential strategies for creating engaging and effective remote learning experiences.",
    author: "Alex Thompson",
    date: "February 15, 2024",
    readTime: "6 min read",
    category: "Remote Work"
  }
];

export default function InsightsPage() {
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
                Insights
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-[#DEF2F2] max-w-4xl mx-auto leading-relaxed"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Expert perspectives on the future of education, technology, and professional development
            </motion.p>
          </div>
        </section>

        {/* Featured Article */}
        <section className="pb-24 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-[#21A8B0]/20 text-[#21A8B0] text-sm rounded-full font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Featured
                </span>
                <span className="text-[#DEF2F2] text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>March 15, 2024</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                The Future of Digital Learning in 2024
              </h2>
              <p className="text-lg text-[#DEF2F2] mb-8 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Explore the latest trends and technologies shaping the future of education and professional development. From AI-powered personalization to immersive learning experiences, discover what is next in digital learning.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#21A8B0] to-[#0A004A] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <div>
                    <div className="text-white font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>Sarah Johnson</div>
                    <div className="text-[#DEF2F2] text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>5 min read</div>
                  </div>
                </div>
                <BrandButton
                  href="/insights/future-digital-learning-2024"
                  variant="outline"
                >
                  Read More
                </BrandButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Latest Articles
              </h2>
              <p className="text-lg md:text-xl text-[#DEF2F2] max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Stay updated with the latest insights and trends in learning and development
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(1).map((article, i) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#21A8B0]/30 transition-all duration-300 p-8 h-full flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-[#21A8B0]/20 text-[#21A8B0] text-xs rounded-full font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {article.category}
                    </span>
                    <span className="text-[#DEF2F2] text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#21A8B0] transition-colors flex-grow" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {article.title}
                  </h3>
                  <p className="text-[#DEF2F2] mb-6 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#21A8B0] to-[#0A004A] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{article.author.charAt(0)}</span>
                      </div>
                      <span className="text-[#DEF2F2] text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>{article.author}</span>
                    </div>
                    <span className="text-[#DEF2F2] text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>{article.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Stay Updated
              </h2>
              <p className="text-lg md:text-xl text-[#DEF2F2] mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Get the latest insights delivered to your inbox. No spam, just valuable content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-[#DEF2F2]/50 focus:outline-none focus:border-[#21A8B0] transition-colors"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                />
                <BrandButton
                  href="/subscribe"
                  variant="primary"
                >
                  Subscribe
                </BrandButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Ready to Learn More?
              </h2>
              <p className="text-lg md:text-xl text-[#DEF2F2] mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Explore our courses and start your learning journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <BrandButton
                  href="/courses"
                  variant="primary"
                  size="lg"
                >
                  Browse Courses
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