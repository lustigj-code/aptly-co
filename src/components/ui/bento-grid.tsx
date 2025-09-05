"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CertificateIcon, 
  AIIcon, 
  BookIcon, 
  ChartIcon, 
  GlobeIcon, 
  AnalyticsIcon 
} from './brand-icons';

interface BentoItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  size: "small" | "medium" | "large";
  color: string;
  link?: string;
  stats?: {
    value: string;
    label: string;
  };
}

const bentoItems: BentoItem[] = [
  {
    id: "meta-certifications",
    title: "Meta Professional Certificates",
    description: "Industry-recognized certifications from Meta in Social Media Marketing, Marketing Analytics, and Data Analysis.",
    icon: <CertificateIcon className="text-white" size="xl" />,
    size: "large",
    color: "from-teal/20 to-muted-teal/20",
    stats: {
      value: "3",
      label: "Meta Programs"
    },
    link: "/courses"
  },
  {
    id: "ai-study-app",
    title: "AI-Powered Study App",
    description: "Smart algorithms adapt to your learning style. Personalized paths and real-time feedback.",
    icon: <AIIcon className="text-white" size="xl" />,
    size: "medium",
    color: "from-navy/30 to-light-navy/30",
    stats: {
      value: "85%",
      label: "Accuracy Rate"
    },
    link: "/study-app"
  },
  {
    id: "interactive-flashcards",
    title: "Smart Flashcards",
    description: "2,500+ multimedia flashcards with spaced repetition. Master concepts faster.",
    icon: <BookIcon className="text-white" size="xl" />,
    size: "medium",
    color: "from-light-navy/20 to-teal/20",
    stats: {
      value: "2,500+",
      label: "Study Cards"
    }
  },
  {
    id: "success-metrics",
    title: "Proven Results",
    description: "Join thousands succeeding with Aptly",
    icon: <ChartIcon className="text-white" size="xl" />,
    size: "small",
    color: "from-teal/20 to-light-teal/20",
    stats: {
      value: "95%",
      label: "Pass Rate"
    }
  },
  {
    id: "global-community",
    title: "Global Network",
    description: "Connect with learners worldwide",
    icon: <GlobeIcon className="text-white" size="xl" />,
    size: "small",
    color: "from-navy/30 to-light-navy/30",
    stats: {
      value: "50K+",
      label: "Active Learners"
    }
  },
  {
    id: "real-time-analytics",
    title: "Progress Analytics",
    description: "Track performance with detailed insights and personalized recommendations.",
    icon: <AnalyticsIcon className="text-white" size="xl" />,
    size: "medium",
    color: "from-muted-teal/30 to-light-teal/20",
    stats: {
      value: "4.8",
      label: "App Rating"
    }
  }
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Animated content components for specific tiles
const TileContent = ({ itemId }: { itemId: string }) => {
  switch (itemId) {
    case "meta-certifications":
      return <MetaCertificationsContent />;
    case "ai-study-app":
      return <AIStudyAppContent />;
    case "real-time-analytics":
      return <AnalyticsContent />;
    default:
      return null;
  }
};

const MetaCertificationsContent = () => {
  const certifications = ["Social Media Marketing", "Marketing Analytics", "Data Analyst"];
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certifications.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-4 left-4 right-4">
      <div className="flex space-x-2">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert}
            initial={{ opacity: 0.3, scale: 0.9 }}
            animate={{ 
              opacity: activeIndex === index ? 1 : 0.3,
              scale: activeIndex === index ? 1 : 0.9
            }}
            className="flex-1 text-center py-2 px-3 rounded-lg bg-white/10 text-xs text-white/80"
          >
            {cert}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AIStudyAppContent = () => {
  return (
    <motion.div 
      className="absolute top-4 right-4"
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7AB8BD] to-[#F1D632] opacity-30 blur-xl" />
    </motion.div>
  );
};

const AnalyticsContent = () => {
  return (
    <div className="absolute bottom-4 left-4 right-4">
      <div className="flex items-end space-x-1 h-12">
        {[30, 45, 35, 60, 55, 70, 65].map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-[#7AB8BD] to-[#F1D632] rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

export default function BentoGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getSizeClasses = (size: BentoItem["size"]) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2";
      case "medium":
        return "col-span-1 row-span-2 md:col-span-2 md:row-span-1";
      case "small":
        return "col-span-1 row-span-1";
    }
  };

  return (
    <section className="relative py-20">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Digital Learning Solutions That <span className="text-teal">Deliver Results</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            From Meta certifications to AI-powered study tools, everything you need to prepare for tomorrow&apos;s careers
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]"
        >
          {bentoItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`${getSizeClasses(item.size)} relative group`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`
                absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} 
                opacity-50 group-hover:opacity-100 transition-opacity duration-300
              `} />
              
              
              <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 
                            flex flex-col justify-between overflow-hidden
                            hover:bg-white/10 hover:border-white/20 transition-all duration-300
                            hover:shadow-2xl hover:shadow-white/10">
                

                <div>
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm md:text-base">{item.description}</p>
                </div>

                {item.stats && (
                  <motion.div 
                    className="mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={hoveredId === item.id ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-3xl font-bold text-white">{item.stats.value}</p>
                    <p className="text-white/60 text-sm">{item.stats.label}</p>
                  </motion.div>
                )}

                {item.link && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={hoveredId === item.id ? { opacity: 1 } : { opacity: 0 }}
                    className="absolute bottom-6 right-6"
                  >
                    <Link href={item.link} className="text-white/80 hover:text-white">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </Link>
                  </motion.div>
                )}

                {/* Special animated content for specific tiles */}
                <TileContent itemId={item.id} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}