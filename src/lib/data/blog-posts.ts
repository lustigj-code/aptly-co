export type BlogCategory = 
  | 'career-transitions'
  | 'industry-trends'
  | 'course-guides'
  | 'success-stories'
  | 'tech-skills';

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  publishDate: string;
  readTime: string;
  featured: boolean;
  image: string;
  tags: string[];
  content?: string;
};

export const blogCategories: Record<BlogCategory, { label: string; description: string }> = {
  'career-transitions': {
    label: 'Career Transitions',
    description: 'Guides and stories about changing careers'
  },
  'industry-trends': {
    label: 'Industry Trends',
    description: 'Latest developments in tech and marketing'
  },
  'course-guides': {
    label: 'Course Guides',
    description: 'Detailed guides about certificates and courses'
  },
  'success-stories': {
    label: 'Success Stories',
    description: 'Real stories from our graduates'
  },
  'tech-skills': {
    label: 'Tech Skills',
    description: 'Technical skills and learning resources'
  }
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'meta-certificate-vs-traditional-marketing-degree',
    title: 'Meta Certificate vs Traditional Marketing Degree: Complete Cost-Benefit Analysis',
    metaDescription: 'Compare Meta Social Media Marketing Certificate with traditional marketing degrees. Cost, time, career outcomes, and ROI analysis for 2024.',
    excerpt: 'Discover why professionals are choosing Meta certificates over traditional degrees. Compare costs ($49/month vs $40,000+), time investment, and career outcomes.',
    category: 'course-guides',
    author: 'Aptly Editorial Team',
    publishDate: '2024-01-15',
    readTime: '8 min read',
    featured: true,
    image: '/images/blog/meta-certificate-comparison.jpg',
    tags: ['meta certificate', 'marketing degree', 'career change', 'education ROI']
  },
  {
    slug: 'top-digital-marketing-skills-2024',
    title: 'Top 10 Digital Marketing Skills You Need in 2024',
    metaDescription: 'Essential digital marketing skills for 2024 including AI automation, social media analytics, and content personalization. Stay ahead in your marketing career.',
    excerpt: 'Learn the most in-demand digital marketing skills for 2024, from AI-powered automation to advanced analytics. Prepare your career for the future of marketing.',
    category: 'industry-trends',
    author: 'Aptly Editorial Team',
    publishDate: '2024-01-12',
    readTime: '10 min read',
    featured: true,
    image: '/images/blog/digital-marketing-skills.jpg',
    tags: ['digital marketing', 'marketing skills', '2024 trends', 'AI marketing']
  },
  {
    slug: 'google-ads-certification-complete-guide',
    title: 'Google Ads Certification: Complete Study Guide for 2024',
    metaDescription: 'Master Google Ads certification with our complete guide. Exam structure, study tips, practice resources, and career opportunities after certification.',
    excerpt: 'Everything you need to pass Google Ads certification on your first try. Includes exam structure, study resources, and career opportunities post-certification.',
    category: 'course-guides',
    author: 'Aptly Editorial Team',
    publishDate: '2024-01-10',
    readTime: '12 min read',
    featured: false,
    image: '/images/blog/google-ads-guide.jpg',
    tags: ['google ads', 'certification', 'PPC marketing', 'study guide']
  },
  {
    slug: 'teacher-to-data-analyst-success-story',
    title: 'From Teacher to Data Analyst: A Real Career Transition Story',
    metaDescription: 'Read how a high school teacher transitioned to data analyst using Google Data Analytics Certificate. Timeline, challenges, and salary progression included.',
    excerpt: 'Follow the journey of a high school teacher who successfully transitioned to a data analyst role in just 6 months using the Google Data Analytics Certificate.',
    category: 'success-stories',
    author: 'Aptly Editorial Team',
    publishDate: '2024-01-08',
    readTime: '7 min read',
    featured: false,
    image: '/images/blog/career-transition-story.jpg',
    tags: ['career change', 'data analyst', 'success story', 'google certificate']
  },
  {
    slug: 'aptly-study-app-effective-learning',
    title: 'How to Use Aptly Study App for Maximum Learning Effectiveness',
    metaDescription: 'Master the Aptly Study App with AI flashcards, smart scheduling, and practice exams. Tips and strategies for effective online learning.',
    excerpt: 'Maximize your learning with Aptly Study App. Learn how to use AI-powered flashcards, smart scheduling, and practice exams to accelerate your progress.',
    category: 'tech-skills',
    author: 'Aptly Editorial Team',
    publishDate: '2024-01-05',
    readTime: '6 min read',
    featured: false,
    image: '/images/blog/aptly-app-guide.jpg',
    tags: ['aptly app', 'study tips', 'online learning', 'AI learning']
  }
];

export function getBlogPosts(category?: BlogCategory): BlogPost[] {
  if (category) {
    return blogPosts.filter(post => post.category === category);
  }
  return blogPosts;
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPost(slug);
  if (!currentPost) return [];
  
  // Get posts from same category, excluding current
  const sameCategoryPosts = blogPosts
    .filter(post => post.category === currentPost.category && post.slug !== slug)
    .slice(0, limit);
  
  // If not enough, add posts with similar tags
  if (sameCategoryPosts.length < limit) {
    const additionalPosts = blogPosts
      .filter(post => 
        post.slug !== slug && 
        !sameCategoryPosts.includes(post) &&
        post.tags.some(tag => currentPost.tags.includes(tag))
      )
      .slice(0, limit - sameCategoryPosts.length);
    
    return [...sameCategoryPosts, ...additionalPosts];
  }
  
  return sameCategoryPosts;
}