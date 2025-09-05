"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

const trustBadges: TrustBadge[] = [
  {
    icon: "🔒",
    title: "SOC 2 Certified",
    description: "Enterprise-grade security"
  },
  {
    icon: "🛡️",
    title: "GDPR Compliant",
    description: "Your data is protected"
  },
  {
    icon: "✓",
    title: "ISO 27001",
    description: "International standards"
  },
  {
    icon: "🎓",
    title: "95% Success Rate",
    description: "Verified completions"
  }
];

const testimonials: Testimonial[] = [
  {
    quote: "Aptly transformed my career. The courses are practical and the support is unmatched.",
    author: "Sarah Chen",
    role: "Data Analyst",
    company: "Tech Corp",
    rating: 5
  },
  {
    quote: "Best investment in my professional development. Landed my dream job within 3 months.",
    author: "Michael Rodriguez",
    role: "Marketing Manager",
    company: "Growth Co",
    rating: 5
  },
  {
    quote: "The Meta certificates opened doors I didn't know existed. Highly recommend!",
    author: "Emily Johnson",
    role: "Social Media Strategist",
    company: "Creative Agency",
    rating: 5
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function TrustSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">50,000+</span> Learners
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join a community of professionals advancing their careers with industry-recognized certifications
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: [0, -1, 1, -1, 0] }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{badge.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-1">{badge.title}</h3>
              <p className="text-sm text-white/60">{badge.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-white/90 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              <div>
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-white/60 text-sm">{testimonial.role} at {testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}