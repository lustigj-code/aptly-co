"use client";
import React from "react";
import { CourseCard, FeatureCard } from "./brand-card";
import { getFeaturedCourses } from "@/lib/data/courses";
import { CheckIcon, UsersIcon, StarIcon } from "./brand-icons";
import { BrandButton } from "./brand-button";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Digital Marketing Graduate",
    content: "Aptly's courses helped me land my dream job in digital marketing. The content was practical and up-to-date.",
  },
  {
    name: "Michael Chen",
    role: "Data Analyst",
    content: "The Meta Data Analyst program was exactly what I needed to transition into tech.",
  },
  {
    name: "Emily Rodriguez",
    role: "Social Media Manager",
    content: "Professional, comprehensive, and results-driven. Aptly delivers on their promise.",
  },
];

export default function FeaturesSection() {
  const featuredCourses = getFeaturedCourses();

  return (
    <div className="relative z-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-sans">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg sm:text-xl text-light-teal max-w-3xl mx-auto font-sans">
            From professional certificates to interactive learning modules, Aptly provides
            comprehensive digital learning solutions for the modern workforce.
          </p>
        </div>

        {/* Featured Courses */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 font-sans">Featured Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                image={course.image}
                link={course.link}
              />
            ))}
          </div>
        </div>

        {/* Secondary Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Student Reviews */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 font-sans">Student Success</h3>
            <div className="space-y-4">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="border-l-2 border-teal pl-4">
                  <p className="text-sm text-light-teal italic mb-2 font-sans">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <p className="text-xs text-muted-teal font-sans">
                    <span className="font-medium">{testimonial.name}</span> - {testimonial.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Get Started CTA */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-xl font-bold text-white mb-4 font-sans">Ready to Start?</h3>
            <p className="text-sm text-light-teal mb-6 font-sans">
              Join thousands of learners preparing for tomorrow&apos;s careers.
            </p>
            <BrandButton href="/courses" variant="primary" size="md">
              View All Courses
            </BrandButton>
          </div>

          {/* Global Community */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 font-sans">Global Community</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <UsersIcon className="text-teal mr-3" size="md" />
                <div>
                  <p className="text-2xl font-bold text-white font-sans">50K+</p>
                  <p className="text-sm text-light-teal font-sans">Active Learners</p>
                </div>
              </div>
              <div className="flex items-center">
                <StarIcon className="text-teal mr-3" size="md" />
                <div>
                  <p className="text-2xl font-bold text-white font-sans">4.8/5</p>
                  <p className="text-sm text-light-teal font-sans">Average Rating</p>
                </div>
              </div>
              <div className="flex items-center">
                <CheckIcon className="text-teal mr-3" size="md" />
                <div>
                  <p className="text-2xl font-bold text-white font-sans">95%</p>
                  <p className="text-sm text-light-teal font-sans">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}