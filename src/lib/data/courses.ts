export type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: 'certificate' | 'specialization' | 'course';
  featured?: boolean;
};

export const courses: Course[] = [
  {
    id: 'meta-social-media',
    title: "Meta Social Media Marketing Professional Certificate",
    description: "Whether you've been tinkering with social media platforms or are completely new to the field of digital marketing, this program prepares you for an entry-level role in social media marketing.",
    image: "https://uploads.teachablecdn.com/attachments/BIARTG9uSHO08T8Qtttx_Frame+2.png",
    link: "https://www.coursera.org/professional-certificates/facebook-social-media-marketing",
    category: 'certificate',
    featured: true
  },
  {
    id: 'meta-marketing-analytics',
    title: "Meta Marketing Analytics Professional Certificate",
    description: "Kickstart a career as a marketing analyst or better analyze your business with the in-demand technical skills taught in this program.",
    image: "https://uploads.teachablecdn.com/attachments/pCBnsOUTECtHUIe9Amoe_Frame+1.png",
    link: "https://www.coursera.org/professional-certificates/facebook-marketing-analytics",
    category: 'certificate',
    featured: true
  },
  {
    id: 'meta-data-analyst',
    title: "Meta Data Analyst Professional Certificate",
    description: "Prepare for a career in the high-growth field of data analytics. Build in-demand technical skills like Python, Statistics, and SQL.",
    image: "https://uploads.teachablecdn.com/attachments/8XsQ7ZlVS5ilg4zOJq65_Data-Analyst-Certificate-Program_Photo_courses.png",
    link: "https://www.coursera.org/professional-certificates/meta-data-analyst",
    category: 'certificate',
    featured: true
  },
  {
    id: 'genai-data-analytics',
    title: "GenAI in Data Analytics",
    description: "Explore basic strategies for incorporating GenAI tools in data analytics tasks to streamline processes and improve data quality.",
    image: "https://uploads.teachablecdn.com/attachments/37efFpJeSnWAPqkEDgSO_GenAI.png",
    link: "https://www.coursera.org/learn/genai-in-data-analytics",
    category: 'course',
    featured: false
  },
  {
    id: 'genai-social-media',
    title: "GenAI in Social Media Marketing",
    description: "Discover how GenAI tools can enhance your social media strategy, target your audience, and streamline your content creation.",
    image: "https://uploads.teachablecdn.com/attachments/GGvGUXR5RzycwSh4XHAY_GenAI_2.png",
    link: "https://www.coursera.org/learn/genai-in-social-media-marketing",
    category: 'course',
    featured: false
  },
  {
    id: 'google-search-ads',
    title: "Search Advertising with Google",
    description: "Learn how to create, manage, and optimize search advertising campaigns and prepare for the Google Ads Search Certification.",
    image: "https://uploads.teachablecdn.com/attachments/Bg3g3sSAy8GjmiKmEgg9_GAds_Specialization_Teachable.png",
    link: "https://www.coursera.org/specializations/search-advertising-google",
    category: 'specialization',
    featured: false
  },
  {
    id: 'tiktok-marketing',
    title: "Marketing with TikTok",
    description: "Learn how to use TikTok to create and implement a marketing strategy to grow your brand.",
    image: "https://uploads.teachablecdn.com/attachments/ETSk3FDMTeiYmsHpXato_TT2.png",
    link: "https://www.coursera.org/specializations/marketing-with-tiktok",
    category: 'specialization',
    featured: false
  }
];

export const getFeaturedCourses = () => courses.filter(course => course.featured);
export const getCourseById = (id: string) => courses.find(course => course.id === id);
export const getCoursesByCategory = (category: Course['category']) => 
  courses.filter(course => course.category === category);