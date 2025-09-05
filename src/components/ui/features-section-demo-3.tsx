import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import SubtleLogo from "@/components/SubtleLogo";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";


export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Featured Programs",
      description:
        "Discover our most popular learning experiences designed to prepare you for the jobs of tomorrow.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Student Reviews",
      description:
        "Hear from our graduates who have successfully transitioned into their dream careers.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Ready to Get Started?",
      description:
        "Join thousands of learners preparing for the future of work with our expert-led programs.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
    },
    {
      title: "Global Learning Community",
      description:
        "Join thousands of learners worldwide preparing for the future of work with our expert-led programs.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];
  return (
    <div className="relative z-20">
      <div className="text-center flow" style={{marginBottom: 'var(--space-10)'}}>
        <h4 className="text-3xl sm:text-4xl lg:text-5xl font-bold high-contrast-text">
          Everything you need to succeed
        </h4>

        <p className="text-lg sm:text-xl medium-contrast-text max-w-3xl mx-auto">
          From professional certificates to interactive learning modules, Aptly provides
          comprehensive digital learning solutions for the modern workforce.
        </p>
      </div>

      {/* Visual Harmony Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{gap: 'var(--space-3)'}}>
        {/* Featured Programs */}
        <div className="lg:col-span-3 feature-card group">
          <div className="text-center flow">
            <h5 className="text-2xl font-bold high-contrast-text">Featured Programs</h5>
            <p className="medium-contrast-text">Discover our most popular learning experiences designed to prepare you for the jobs of tomorrow.</p>
            <SkeletonOne />
          </div>
        </div>

        {/* Student Reviews */}
        <div className="sm:col-span-1 lg:col-span-1 feature-card group">
          <div className="flow-tight">
            <h5 className="text-xl font-bold high-contrast-text">Student Reviews</h5>
            <p className="medium-contrast-text text-sm">Hear from our graduates who have successfully transitioned into their dream careers.</p>
            <SkeletonTwo />
          </div>
        </div>

        {/* Ready to Get Started */}
        <div className="sm:col-span-1 lg:col-span-1 feature-card group">
          <div className="flow-tight">
            <h5 className="text-xl font-bold high-contrast-text">Take the next step</h5>
            <p className="medium-contrast-text text-sm">Join thousands of learners preparing for the future of work.</p>
            <SkeletonThree />
          </div>
        </div>

        {/* Global Learning Community */}
        <div className="sm:col-span-2 lg:col-span-1 feature-card group">
          <div className="flow-tight">
            <h5 className="text-xl font-bold high-contrast-text">Global Learning Community</h5>
            <p className="medium-contrast-text text-sm">Join thousands of learners worldwide preparing for the future of work with our expert-led programs.</p>
            <SkeletonFour />
          </div>
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-3 sm:p-6 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  const courses = [
    {
      title: "Meta Social Media Marketing Professional Certificate Program",
      link: "https://www.coursera.org/professional-certificates/facebook-social-media-marketing",
      image: "https://uploads.teachablecdn.com/attachments/BIARTG9uSHO08T8Qtttx_Frame+2.png",
    },
    {
      title: "Meta Marketing Analytics Professional Certificate Program",
      link: "https://www.coursera.org/professional-certificates/facebook-marketing-analytics",
      image: "https://uploads.teachablecdn.com/attachments/pCBnsOUTECtHUIe9Amoe_Frame+1.png",
    },
    {
      title: "Meta Data Analyst Professional Certificate Program",
      link: "https://www.coursera.org/professional-certificates/meta-data-analyst",
      image: "https://uploads.teachablecdn.com/attachments/8XsQ7ZlVS5ilg4zOJq65_Data-Analyst-Certificate-Program_Photo_courses.png",
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center p-0 gap-6 h-full w-full">
      <ul className="flex flex-col gap-6 w-full max-w-2xl items-center justify-center">
        {courses.map((course, i) => (
          <CourseGridItem
            key={"course-" + i}
            title={course.title}
            image={course.image}
            link={course.link}
          />
        ))}
      </ul>
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <div className="relative flex gap-10 h-full group/image">
      <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-4 relative p-6">
          <div className="text-center h-full flex items-start justify-center pt-8">
            <PulsatingButton>View all courses</PulsatingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonTwo = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Digital Marketing Graduate",
      content: "Aptly's courses helped me land my dream job in digital marketing. The content was practical, up-to-date, and engaging!",
      icon: (
        <svg className="w-5 h-5 text-[#7AB8BD]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      ),
    },
    {
      name: "Michael Chen",
      role: "Data Analyst",
      content: "The Meta Data Analyst program was exactly what I needed to transition into tech. Highly recommend!",
      icon: (
        <svg className="w-5 h-5 text-[#F1D632]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      name: "Emily Rodriguez",
      role: "Social Media Manager",
      content: "Professional, comprehensive, and results-driven. Aptly delivers on their promise of job-ready skills.",
      icon: (
        <svg className="w-5 h-5 text-[#0A0C2A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-start p-0 gap-3 h-full overflow-y-auto">
      <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
        {reviews.map((review, idx) => (
          <GridItem
            key={"review-" + idx}
            area=""
            icon={review.icon}
            title={review.name}
            description={
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 italic leading-relaxed">
                  &quot;{review.content}&quot;
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {review.role}
                </p>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full h-full gap-8 px-2 py-4">
      {/* Left content: animated word, description, and global stats/features */}
      <div className="flex-1 flex flex-col justify-center items-start gap-4 min-w-[200px]">
        <AnimatedWordCycler words={["Connect", "Collaborate", "Grow"]} className="mb-1" />
        <p className="text-base text-white/90 mb-2 max-w-md">
          Our community spans every continent and brings together diverse perspectives for a richer learning experience.
        </p>
        <ul className="text-white/80 text-sm space-y-2 pl-4 list-disc">
          
        </ul>
      </div>
      {/* Right: Animated globe */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <Globe className="w-40 h-40 md:w-56 md:h-56" />
      </div>
    </div>
  );
};

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[3rem] list-none ${area}`}>
      <div className="relative h-full rounded-xl p-2 bg-white/5 dark:bg-white/10 shadow-none border-none flex flex-col items-center">
        <div className="flex h-full flex-col justify-center items-center text-center overflow-hidden rounded-xl">
          <div className="space-y-1">
            <h3 className="font-sans text-sm font-semibold text-balance text-black md:text-base dark:text-white">
              {title}
            </h3>
            <h2 className="font-sans text-xs text-black md:text-xs dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
              {description}
            </h2>
          </div>
        </div>
      </div>
    </li>
  );
};

interface CourseGridItemProps {
  title: string;
  image: string;
  link: string;
}

const CourseGridItem = ({ title, image, link }: CourseGridItemProps) => {
  return (
    <li className="list-none w-full flex justify-center">
      <div className="relative rounded-2xl p-6 h-full bg-white/10 flex flex-row items-center gap-8 shadow-lg max-w-xl w-full">
        <div className="relative overflow-hidden rounded-xl h-28 w-28 bg-gradient-to-br from-blue-500/10 to-purple-600/10 flex-shrink-0">
              <Image 
                src={image} 
                alt={title}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
        <div className="flex flex-col flex-grow p-0 justify-center">
          <h3 className="font-sans text-xl font-semibold text-balance text-black dark:text-white mb-1">
                {title}
              </h3>
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
            className="text-[#7AB8BD] dark:text-[#7AB8BD] text-lg font-medium hover:underline mt-1"
              >
                Learn More →
              </a>
        </div>
      </div>
    </li>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
}; 

function AptlyGlowButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={
        `relative flex items-center justify-center gap-3 px-7 py-3 text-lg font-extrabold rounded-full shadow-xl transition-all duration-300 focus:outline-none overflow-hidden`
        + (hovered ? ' aptly-glow-border' : '')
      }
      style={{ minWidth: 180, background: 'linear-gradient(90deg, rgba(124,58,237,0.7) 0%, rgba(236,72,153,0.7) 50%, rgba(253,224,71,0.7) 100%)' }}
    >
      <span className="flex items-center justify-center gap-2 z-10 w-full align-middle">
        <span className="text-white font-extrabold drop-shadow-md align-middle">View All Courses</span>
      </span>
      {/* Animated border/glow on hover */}
      <span className={`pointer-events-none absolute inset-0 rounded-full border-4 border-transparent transition-all duration-500 ${hovered ? 'border-yellow-300/60 shadow-[0_0_32px_8px_rgba(168,51,255,0.18)]' : ''}`}></span>
      {/* Subtle animated gradient shine on hover */}
      <span className={`pointer-events-none absolute left-[-60%] top-0 h-full w-2/3 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full ${hovered ? 'animate-aptly-shine' : ''}`}></span>
    </button>
  );
}

function AnimatedWordCycler({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearTimeout(timeout);
  }, [index, words.length]);
  return (
    <div className={className + " min-h-[2.5em] flex items-center"}>
      <span
        key={words[index]}
        className="block w-full text-white font-extrabold text-4xl md:text-6xl lg:text-7xl text-left transition-opacity duration-700 ease-in-out opacity-100 animate-fadeinout"
        style={{ minHeight: '1em' }}
      >
        {words[index]}
      </span>
      <style jsx>{`
        @keyframes fadeinout {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fadeinout {
          animation: fadeinout 2.5s linear;
        }
      `}</style>
    </div>
  );
}

// Add this to your global CSS if not present:
// @keyframes aptly-shine {
//   0% { left: -60%; }
//   100% { left: 120%; }
// }
// .animate-aptly-shine { animation: aptly-shine 1.1s cubic-bezier(0.4,0,0.2,1) 1; }
// .aptly-glow-border { box-shadow: 0 0 0 4px #21a8b055, 0 0 32px 8px #21a8b044; } 