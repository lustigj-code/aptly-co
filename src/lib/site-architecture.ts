// Aptly Site Architecture - Clear Information Hierarchy

export const siteArchitecture = {
  brand: {
    name: "Aptly",
    tagline: "Prepare for the jobs of tomorrow, today",
    mission: "Empowering professionals with industry-recognized certifications and cutting-edge digital skills",
    values: ["Excellence", "Innovation", "Accessibility", "Results"]
  },
  
  navigation: {
    primary: [
      { label: "Programs", href: "/programs", priority: 1 },
      { label: "For Business", href: "/business", priority: 2 },
      { label: "Success Stories", href: "/success", priority: 3 },
      { label: "About", href: "/about", priority: 4 }
    ],
    cta: {
      label: "Get Started",
      href: "/enroll",
      variant: "primary"
    }
  },
  
  homeSections: [
    {
      id: "hero",
      type: "hero",
      content: {
        headline: "Transform Your Career with Industry-Leading Certifications",
        subheadline: "Partner with Meta, Google, and leading tech companies to gain the skills employers demand",
        cta: ["Browse Programs", "Talk to Advisor"]
      }
    },
    {
      id: "credentials",
      type: "trust-indicators",
      content: {
        partners: ["Meta", "Google", "Coursera"],
        stats: {
          learners: "50,000+",
          completion: "95%",
          jobPlacement: "87%"
        }
      }
    },
    {
      id: "programs",
      type: "featured-programs",
      content: {
        title: "Professional Certificates",
        description: "Industry-recognized programs designed with hiring managers"
      }
    },
    {
      id: "methodology",
      type: "value-proposition",
      content: {
        title: "The Aptly Advantage",
        features: [
          "Learn from industry experts",
          "Real-world projects",
          "Career coaching included",
          "Flexible online learning"
        ]
      }
    },
    {
      id: "outcomes",
      type: "results",
      content: {
        title: "Proven Career Outcomes",
        testimonials: true,
        metrics: true
      }
    }
  ],
  
  programsPage: {
    categories: [
      {
        id: "professional-certificates",
        title: "Professional Certificates",
        description: "6-month programs with guaranteed interviews",
        priority: 1
      },
      {
        id: "specializations",
        title: "Specializations",
        description: "Deep-dive into specific skills",
        priority: 2
      },
      {
        id: "courses",
        title: "Individual Courses",
        description: "Quick skill upgrades",
        priority: 3
      }
    ]
  },
  
  footer: {
    sections: [
      {
        title: "Programs",
        links: ["All Certificates", "Meta Programs", "Google Programs", "AI Courses"]
      },
      {
        title: "Resources",
        links: ["Career Guide", "Blog", "FAQ", "Support"]
      },
      {
        title: "Company",
        links: ["About", "Careers", "Partners", "Contact"]
      },
      {
        title: "Legal",
        links: ["Privacy", "Terms", "Accessibility"]
      }
    ]
  }
};