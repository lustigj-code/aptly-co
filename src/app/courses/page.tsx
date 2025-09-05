'use client';

import { motion } from 'framer-motion';
import { BrandGradientBackground } from "@/components/ui/brand-gradient-background";
import { BrandButton } from "@/components/ui/brand-button";
import { CourseCard } from "@/components/ui/brand-card";
import { courses } from "@/lib/data/courses";

export default function CoursesPage() {
  
  const displayCourses = [
    ...courses,
    {
      id: 'explore-more',
      title: "Explore More Programs",
      description: "View all Aptly programs on Coursera",
      image: "https://uploads.teachablecdn.com/attachments/VFFfSAhQfGUV87wS6Juw_Explore+%281%29.png",
      link: "https://www.coursera.org/partners/aptly",
      category: 'course' as const,
      featured: false
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BrandGradientBackground />

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <section className="pt-32 pb-16 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Our Courses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-[#DEF2F2] max-w-4xl mx-auto leading-relaxed"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Discover our comprehensive range of professional certificate programs and specializations designed to accelerate your career in digital marketing and data analytics.
            </motion.p>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="pb-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <CourseCard
                    title={course.title}
                    description={course.description}
                    image={course.image}
                    link={course.link}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Button Section */}
        <section className="px-8 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <BrandButton
                href="https://aptly.co/p/faq"
                variant="primary"
                size="lg"
              >
                Questions? View our FAQ
              </BrandButton>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
} 