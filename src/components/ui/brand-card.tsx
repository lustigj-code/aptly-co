"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./brand-icons";

type CardVariant = 'default' | 'feature' | 'course' | 'service';
type CardSize = 'sm' | 'md' | 'lg';

type BaseCardProps = {
  variant?: CardVariant;
  size?: CardSize;
  className?: string;
  children: React.ReactNode;
};

export function Card({ 
  variant = 'default', 
  size = 'md', 
  className = '',
  children 
}: BaseCardProps) {
  const baseStyles = "rounded-2xl backdrop-blur-sm border transition-all duration-300";
  
  const variantStyles = {
    default: "bg-white/5 border-white/10 hover:bg-white/10 hover:border-teal/30",
    feature: "bg-light-navy/10 border-light-navy/20 hover:bg-light-navy/20 hover:border-teal/40",
    course: "bg-white/5 border-white/10 hover:bg-white/10 hover:border-teal/30",
    service: "bg-navy/5 border-navy/10 hover:bg-navy/10 hover:border-muted-teal/30"
  };
  
  const sizeStyles = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };
  
  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </div>
  );
}

type CourseCardProps = {
  title: string;
  description: string;
  image: string;
  link: string;
  imageAlt?: string;
};

export function CourseCard({ 
  title, 
  description, 
  image, 
  link,
  imageAlt = ""
}: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card variant="course" className="h-full">
        <Link href={link} target="_blank" rel="noopener noreferrer" className="block h-full flex flex-col">
          <div className="relative overflow-hidden rounded-xl mb-6">
            <Image
              src={image}
              alt={imageAlt || title}
              width={400}
              height={192}
              className="w-full h-48 object-cover"
            />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 font-sans">
            {title}
          </h3>
          
          <p className="text-light-teal leading-relaxed line-clamp-3 flex-grow font-sans">
            {description}
          </p>
          
          <div className="mt-6 flex items-center text-teal font-medium hover:text-muted-teal transition-colors font-sans">
            Learn More
            <ArrowRightIcon className="ml-2 transform group-hover:translate-x-1 transition-transform" size="sm" />
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}

type ServiceCardProps = {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
};

export function ServiceCard({ 
  title, 
  description, 
  features,
  icon 
}: ServiceCardProps) {
  return (
    <Card variant="service" size="lg" className="h-full">
      <div className="w-16 h-16 bg-gradient-to-br from-teal to-navy rounded-full flex items-center justify-center mb-8">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-6 font-sans">
        {title}
      </h3>
      <p className="text-light-teal mb-8 leading-relaxed font-sans">
        {description}
      </p>
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-light-teal font-sans">
            <div className="w-5 h-5 bg-teal rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  stats?: {
    value: string;
    label: string;
  };
  icon: React.ReactNode;
  link?: string;
};

export function FeatureCard({ 
  title, 
  description, 
  stats,
  icon,
  link
}: FeatureCardProps) {
  const content = (
    <>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2 font-sans">{title}</h3>
      <p className="text-light-teal text-sm leading-relaxed font-sans">{description}</p>
      {stats && (
        <div className="mt-4">
          <p className="text-3xl font-bold text-white font-sans">{stats.value}</p>
          <p className="text-light-teal text-sm font-sans">{stats.label}</p>
        </div>
      )}
    </>
  );

  if (link) {
    return (
      <Link href={link} className="block h-full">
        <Card variant="feature" className="h-full hover:scale-105 transition-transform">
          {content}
        </Card>
      </Link>
    );
  }

  return (
    <Card variant="feature" className="h-full">
      {content}
    </Card>
  );
}