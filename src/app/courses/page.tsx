'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function CoursesPage() {

  const courses = [
    {
      title: "Meta Social Media Marketing Professional Certificate Program",
      description: "Whether you've been tinkering with social media platforms or are completely new to the field of digital marketing, this program prepares you for an entry-level role in social media marketing. This program has earned Coursera's Learners First Award and been named \"Best for Social Media Marketing\" by U.S. News and World Report.",
      image: "https://uploads.teachablecdn.com/attachments/BIARTG9uSHO08T8Qtttx_Frame+2.png",
      link: "https://www.coursera.org/professional-certificates/facebook-social-media-marketing",
      alt: "Woman on a couch learning on a tablet"
    },
    {
      title: "Meta Marketing Analytics Professional Certificate Program",
      description: "Kickstart a career as a marketing analyst or better analyze your business with the in-demand technical skills taught in this program. No experience necessary.",
      image: "https://uploads.teachablecdn.com/attachments/pCBnsOUTECtHUIe9Amoe_Frame+1.png",
      link: "https://www.coursera.org/professional-certificates/facebook-marketing-analytics?",
      alt: "Man at a desk learning on a computer"
    },
    {
      title: "Meta Data Analyst Professional Certificate Program",
      description: "Prepare for a career in the high-growth field of data analytics. In this program, you'll build in-demand technical skills like Python, Statistics, and SQL in spreadsheets. No prior experience required.",
      image: "https://uploads.teachablecdn.com/attachments/8XsQ7ZlVS5ilg4zOJq65_Data-Analyst-Certificate-Program_Photo_courses.png",
      link: "https://www.coursera.org/professional-certificates/meta-data-analyst",
      alt: "Man and woman looking at screen"
    },
    {
      title: "GenAI in Data Analytics",
      description: "Explore basic strategies for incorporating GenAI tools in data analytics tasks to streamline processes and improve data quality.",
      image: "https://uploads.teachablecdn.com/attachments/37efFpJeSnWAPqkEDgSO_GenAI.png",
      link: "https://www.coursera.org/learn/genai-in-data-analytics",
      alt: "Woman looking at data on a computer screen"
    },
    {
      title: "GenAI in Social Media Marketing",
      description: "Discover how GenAI tools can enhance your social media strategy, target your audience, and streamline your content creation. Includes an introduction to Meta's powerful AI tools.",
      image: "https://uploads.teachablecdn.com/attachments/GGvGUXR5RzycwSh4XHAY_GenAI_2.png",
      link: "https://www.coursera.org/learn/genai-in-social-media-marketing",
      alt: "Man and woman looking at computer and other materials together"
    },
    {
      title: "Search Advertising with Google Specialization",
      description: "Prepare for a role in search marketing. Learn how to create, manage, and optimize search advertising campaigns and prepare for the Google Ads Search Certification Exam.",
      image: "https://uploads.teachablecdn.com/attachments/Bg3g3sSAy8GjmiKmEgg9_GAds_Specialization_Teachable.png",
      link: "https://www.coursera.org/specializations/search-advertising-google",
      alt: "Man on computer"
    },
    {
      title: "Marketing with TikTok Specialization",
      description: "Learn how to use TikTok to create and implement a marketing strategy to grow your brand.",
      image: "https://uploads.teachablecdn.com/attachments/ETSk3FDMTeiYmsHpXato_TT2.png",
      link: "https://www.coursera.org/specializations/marketing-with-tiktok",
      alt: "Man setting up camera and light for video recording"
    },
    {
      title: "Explore more Aptly programs on Coursera",
      description: "coursera.org/aptly",
      image: "https://uploads.teachablecdn.com/attachments/VFFfSAhQfGUV87wS6Juw_Explore+%281%29.png",
      link: "https://www.coursera.org/partners/aptly",
      alt: "Plus sign"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with Aptly Navy Blue and Shooting Stars - Same as Homepage */}
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
        {/* Header Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Our Courses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Discover our comprehensive range of professional certificate programs and specializations designed to accelerate your career in digital marketing and data analytics.
            </motion.p>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 h-full border border-white/20 hover:border-white/40 transition-all duration-300">
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative overflow-hidden rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src={course.image}
                          alt={course.alt}
                          width={400}
                          height={192}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                        {course.description}
                      </p>
                      
                      <div className="mt-4 flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                        Learn More
                        <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Button Section */}
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a
                href="https://aptly.co/p/faq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#7AB8BD] to-[#0A0C2A] hover:from-[#6BB3C3] hover:to-[#3B3366] text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                >
                  Questions? View our FAQ
                </motion.button>
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
} 