export type ServiceFeature = {
  title: string;
  description: string;
};

export type Service = {
  title: string;
  description: string;
  features: string[];
  icon: string;
  highlight?: string;
};

export const certificatePrograms: Service = {
  title: "Professional Certificate Programs",
  description: "Industry-recognized certifications from Meta and Google to advance your digital marketing and data career",
  features: [
    "Meta Social Media Marketing Certificate (6 months)",
    "Meta Marketing Analytics Certificate (6 months)",
    "Meta Data Analyst Certificate (6 months)",
    "Google Search Advertising Specialization"
  ],
  icon: "C",
  highlight: "Get job-ready with hands-on projects"
};

export const learningSupport: Service = {
  title: "Learning Support Services",
  description: "Comprehensive study tools designed to maximize your learning outcomes and exam success",
  features: [
    "Aptly Study mobile app for exam preparation",
    "AI-powered flashcards and practice quizzes",
    "Offline learning capabilities",
    "Progress tracking and analytics"
  ],
  icon: "L",
  highlight: "Study smarter with AI assistance"
};

export const enterpriseSolutions: Service = {
  title: "Enterprise Solutions",
  description: "Scalable learning solutions for organizations looking to upskill their teams",
  features: [
    "Bulk enrollment for organizations",
    "Custom cohort management",
    "Team progress dashboards",
    "Dedicated support for corporate learners"
  ],
  icon: "E",
  highlight: "Teams of 10+ get special pricing"
};

export const careerDevelopment: Service = {
  title: "Career Development",
  description: "Complete career support to help you transition into high-demand digital roles",
  features: [
    "Industry-recognized certifications",
    "Portfolio project guidance",
    "Resume and LinkedIn optimization tips",
    "Job search resources"
  ],
  icon: "D",
  highlight: "Build your professional portfolio"
};

export const services: Service[] = [
  certificatePrograms,
  learningSupport,
  enterpriseSolutions,
  careerDevelopment
];

export const pricingInfo = {
  freeAccess: "Courses available free on Coursera (audit mode)",
  paidCertificates: "Paid certificates include graded assignments and credential",
  enterprise: "Enterprise pricing available for teams of 10+"
};

export const processSteps = [
  {
    number: "1",
    title: "Choose Your Path",
    description: "Select from Meta or Google certificate programs based on your career goals"
  },
  {
    number: "2",
    title: "Learn at Your Pace",
    description: "Access courses online with flexible scheduling and mobile study support"
  },
  {
    number: "3",
    title: "Complete Projects",
    description: "Build your portfolio with real-world projects and hands-on assignments"
  },
  {
    number: "4",
    title: "Earn Your Certificate",
    description: "Get industry-recognized credentials to showcase your new skills"
  }
];