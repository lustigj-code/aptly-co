export type SuccessStory = {
  id: string;
  category: 'career-changer' | 'skill-upgrader' | 'recent-graduate';
  previousRole: string;
  currentRole: string;
  certificateCompleted: string;
  completionTime: string;
  keyOutcome: string;
  quote: string;
  initials: string;
};

export const successStories: SuccessStory[] = [
  // Career Changers
  {
    id: 'story-1',
    category: 'career-changer',
    previousRole: 'High School Teacher',
    currentRole: 'Digital Marketing Specialist',
    certificateCompleted: 'Meta Social Media Marketing Certificate',
    completionTime: '5 months',
    keyOutcome: 'Transitioned to marketing role in education technology',
    quote: 'Teaching skills translated perfectly to creating educational content. The Meta certificate gave me the technical skills I needed to make the career switch.',
    initials: 'S.K.'
  },
  {
    id: 'story-2',
    category: 'career-changer',
    previousRole: 'Retail Store Manager',
    currentRole: 'Data Analyst',
    certificateCompleted: 'Meta Data Analyst Certificate',
    completionTime: '6 months',
    keyOutcome: 'Moved into analytics role at e-commerce company',
    quote: 'Years of analyzing sales data in retail gave me a foundation, but the certificate taught me SQL and Python to level up my career.',
    initials: 'M.R.'
  },
  {
    id: 'story-3',
    category: 'career-changer',
    previousRole: 'Military Logistics Specialist',
    currentRole: 'Tech Operations Analyst',
    certificateCompleted: 'Meta Marketing Analytics Certificate',
    completionTime: '4 months',
    keyOutcome: 'Successfully transitioned to civilian tech sector',
    quote: 'Military experience in logistics paired with analytics skills opened doors I never imagined. The structured learning approach was perfect for me.',
    initials: 'J.T.'
  },
  // Skill Upgraders
  {
    id: 'story-4',
    category: 'skill-upgrader',
    previousRole: 'Marketing Manager',
    currentRole: 'Marketing Manager with Analytics Expertise',
    certificateCompleted: 'Meta Marketing Analytics Certificate',
    completionTime: '3 months',
    keyOutcome: 'Promoted to Senior Marketing Manager',
    quote: 'Adding data analytics to my marketing skillset was a game-changer. I can now back up creative decisions with solid data insights.',
    initials: 'A.L.'
  },
  {
    id: 'story-5',
    category: 'skill-upgrader',
    previousRole: 'Small Business Owner',
    currentRole: 'Business Owner with Digital Marketing Skills',
    certificateCompleted: 'Google Search Advertising Specialization',
    completionTime: '2 months',
    keyOutcome: 'Reduced marketing costs by managing campaigns in-house',
    quote: 'Learning to run my own Google Ads campaigns saved thousands in agency fees and gave me better control over my marketing.',
    initials: 'R.P.'
  },
  {
    id: 'story-6',
    category: 'skill-upgrader',
    previousRole: 'Frontend Developer',
    currentRole: 'Full-Stack Developer with Data Skills',
    certificateCompleted: 'Meta Data Analyst Certificate',
    completionTime: '6 months',
    keyOutcome: 'Expanded role to include data engineering tasks',
    quote: 'As a developer, understanding data analysis made me much more valuable. I can now build and analyze the applications I create.',
    initials: 'K.C.'
  },
  // Recent Graduates
  {
    id: 'story-7',
    category: 'recent-graduate',
    previousRole: 'College Senior (Business Major)',
    currentRole: 'Entry-Level Marketing Analyst',
    certificateCompleted: 'Meta Social Media Marketing Certificate',
    completionTime: '4 months',
    keyOutcome: 'Secured first job before graduation',
    quote: 'The certificate gave me practical skills my degree didn\'t cover. Having a Meta certification on my resume really stood out to employers.',
    initials: 'D.W.'
  },
  {
    id: 'story-8',
    category: 'recent-graduate',
    previousRole: 'Coding Bootcamp Graduate',
    currentRole: 'Digital Marketing Specialist',
    certificateCompleted: 'Meta Social Media Marketing Certificate',
    completionTime: '3 months',
    keyOutcome: 'Pivoted from pure coding to technical marketing role',
    quote: 'The bootcamp taught me to code, but the Meta certificate helped me find my passion in marketing technology and automation.',
    initials: 'L.S.'
  },
  {
    id: 'story-9',
    category: 'recent-graduate',
    previousRole: 'Community College Student',
    currentRole: 'Junior Data Analyst',
    certificateCompleted: 'Meta Data Analyst Certificate',
    completionTime: '7 months',
    keyOutcome: 'First in family to work in tech',
    quote: 'Coming from community college, I needed something to prove my skills. The hands-on projects in the certificate program built my portfolio.',
    initials: 'T.M.'
  }
];

export const successMetrics = {
  averageCompletionTime: '6 months',
  mostPopularCertificate: 'Meta Social Media Marketing',
  topHiringIndustries: ['Technology', 'Retail', 'Healthcare', 'Education', 'Finance'],
  learnerSatisfaction: '4.7/5',
  careerTransitionRate: '73%',
  skillApplicationRate: '89%'
};

export const categoryLabels = {
  'career-changer': 'Career Changers',
  'skill-upgrader': 'Skill Upgraders',
  'recent-graduate': 'Recent Graduates'
};

export const categoryDescriptions = {
  'career-changer': 'Professionals who successfully transitioned to new careers',
  'skill-upgrader': 'Individuals who enhanced their existing roles with new skills',
  'recent-graduate': 'Students and graduates launching their careers'
};