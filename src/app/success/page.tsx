"use client";
import { motion } from 'framer-motion';
import { 
  Container, 
  Section, 
  Heading, 
  Button, 
  Grid, 
  Card,
  Badge,
  Stat
} from '@/design-system';

const successStories = [
  {
    id: 1,
    name: "Maria Gonzalez",
    role: "Data Analyst → Senior Data Scientist",
    company: "Microsoft",
    program: "Meta Data Analyst Certificate",
    salary: "65% salary increase",
    quote: "Aptly gave me the confidence and skills to transition from a traditional analyst role to a data science position at a top tech company.",
    timeline: "6 months",
    featured: true
  },
  {
    id: 2,
    name: "James Park",
    role: "Retail Manager → Digital Marketing Manager",
    company: "Adobe",
    program: "Meta Social Media Marketing Certificate",
    salary: "2x salary",
    quote: "The structured learning path and industry connections through Aptly completely changed my career trajectory.",
    timeline: "4 months",
    featured: true
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Teacher → UX Designer",
    company: "Spotify",
    program: "Google UX Design Certificate",
    salary: "80% salary increase",
    quote: "From classroom to tech company - Aptly made an impossible dream possible.",
    timeline: "5 months",
    featured: true
  },
  {
    id: 4,
    name: "Robert Chen",
    role: "Freelancer → Marketing Analytics Lead",
    company: "Salesforce",
    program: "Meta Marketing Analytics Certificate",
    salary: "3x income",
    quote: "The combination of technical skills and career coaching was exactly what I needed.",
    timeline: "3 months"
  },
  {
    id: 5,
    name: "Sarah Williams",
    role: "Administrative Assistant → Product Manager",
    company: "Amazon",
    program: "Multiple Certificates",
    salary: "150% salary increase",
    quote: "I completed three certificates and landed my dream job at Amazon.",
    timeline: "8 months"
  },
  {
    id: 6,
    name: "David Lee",
    role: "Bartender → Frontend Developer",
    company: "Netflix",
    program: "Web Development Specialization",
    salary: "New career path",
    quote: "Zero coding experience to working at Netflix - still feels surreal.",
    timeline: "7 months"
  }
];

const statistics = [
  { value: "87%", label: "Job Placement Rate" },
  { value: "65%", label: "Average Salary Increase" },
  { value: "3-6", label: "Months to New Job" },
  { value: "95%", label: "Would Recommend" }
];

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-navy pt-20">
      {/* Hero Section */}
      <Section background="gradient" spacing="xl">
        <Container size="lg">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="success" size="md">50,000+ Success Stories</Badge>
            <Heading as="h1" size="3xl" className="mt-6 mb-6">
              Real People. Real Results.
            </Heading>
            <p className="text-xl text-light-teal leading-relaxed">
              Discover how professionals from all backgrounds have transformed 
              their careers through Aptly&apos;s certificate programs.
            </p>
          </div>
        </Container>
      </Section>

      {/* Statistics Bar */}
      <Section background="light-navy" spacing="md">
        <Container size="lg">
          <Grid cols={{ default: 2, md: 4 }} gap="md">
            {statistics.map((stat) => (
              <Stat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Featured Success Stories */}
      <Section background="navy" spacing="xl">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              Featured Success Stories
            </Heading>
            <p className="text-lg text-light-teal max-w-2xl mx-auto">
              These graduates went from career uncertainty to landing roles at 
              the world&apos;s leading tech companies.
            </p>
          </div>

          {/* Featured Cards */}
          <Grid cols={{ default: 1, lg: 3 }} gap="lg">
            {successStories
              .filter(story => story.featured)
              .map((story, idx) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card variant="bordered" padding="lg" className="h-full">
                    <Badge variant="success" size="sm">{story.timeline} to success</Badge>
                    
                    <div className="mt-6 mb-4">
                      <Heading as="h3" size="md" weight="medium">{story.name}</Heading>
                      <p className="text-teal text-sm mt-1">{story.company}</p>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-light-teal text-sm mb-2">{story.role}</p>
                      <p className="text-2xl font-bold text-white">{story.salary}</p>
                    </div>
                    
                    <blockquote className="text-light-teal italic mb-6">
                      &ldquo;{story.quote}&rdquo;
                    </blockquote>
                    
                    <div className="text-sm text-muted-teal">
                      Program: {story.program}
                    </div>
                  </Card>
                </motion.div>
              ))}
          </Grid>
        </Container>
      </Section>

      {/* All Success Stories Grid */}
      <Section background="white" spacing="xl">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" color="navy" className="mb-4">
              More Success Stories
            </Heading>
          </div>

          <Grid cols={{ default: 1, md: 2 }} gap="md">
            {successStories
              .filter(story => !story.featured)
              .map((story) => (
                <Card key={story.id} variant="elevated" padding="md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Heading as="h3" size="sm" color="navy" weight="medium">
                        {story.name}
                      </Heading>
                      <p className="text-teal text-sm">{story.company}</p>
                    </div>
                    <Badge variant="info" size="sm">{story.timeline}</Badge>
                  </div>
                  <p className="text-rich-black text-sm mb-3">{story.role}</p>
                  <p className="text-navy font-bold mb-3">{story.salary}</p>
                  <p className="text-rich-black text-sm italic">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </Card>
              ))}
          </Grid>
        </Container>
      </Section>

      {/* Career Transitions Section */}
      <Section background="light-navy" spacing="xl">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              Every Background Welcome
            </Heading>
            <p className="text-lg text-light-teal max-w-2xl mx-auto">
              Our graduates come from diverse backgrounds and successfully 
              transition into tech careers.
            </p>
          </div>

          <Grid cols={{ default: 2, md: 3, lg: 6 }} gap="sm">
            {[
              "Teacher → Developer",
              "Nurse → Data Analyst",
              "Retail → UX Designer",
              "Military → Cyber Security",
              "Artist → Product Manager",
              "Chef → Digital Marketer"
            ].map((transition) => (
              <Card key={transition} variant="default" padding="sm">
                <p className="text-white text-center text-sm font-medium">
                  {transition}
                </p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="gradient" spacing="lg">
        <Container size="md">
          <div className="text-center">
            <Heading as="h2" size="2xl" className="mb-6">
              Write Your Success Story
            </Heading>
            <p className="text-lg text-light-teal mb-8">
              Join thousands who have already transformed their careers. 
              Your success story starts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline">
                Talk to Graduate
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}