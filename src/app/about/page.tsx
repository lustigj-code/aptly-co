"use client";
import { useEffect, useState } from 'react';
import { 
  Container, 
  Section, 
  Heading, 
  Button, 
  Grid, 
  Card,
  Divider 
} from '@/design-system';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import '@/styles/animations.css';

const values = [
  {
    title: "Excellence",
    description: "We maintain the highest standards in education and never compromise on quality."
  },
  {
    title: "Innovation",
    description: "We continuously evolve our programs to meet the changing needs of the digital economy."
  },
  {
    title: "Accessibility",
    description: "We believe quality education should be available to everyone, everywhere."
  },
  {
    title: "Results",
    description: "We measure our success by the careers we help transform."
  }
];

const timeline = [
  { year: "2020", event: "Partnership with Meta for Social Media Marketing Certificate" },
  { year: "2021", event: "Launch of Marketing Analytics Certificate program" },
  { year: "2022", event: "Introduction of Google Data Analytics Professional Certificate" },
  { year: "2023", event: "Launch of GenAI courses and AI-powered learning features" },
  { year: "2024", event: "Mobile Study App launch with personalized AI tutoring" },
  { year: "2024", event: "Expansion to include Meta Certified Digital Marketing Associate" }
];

const instructors = [
  {
    name: "Meta Instructors",
    role: "Social Media Marketing",
    bio: "Industry experts from Meta's marketing team delivering cutting-edge social media strategies"
  },
  {
    name: "Google Instructors",
    role: "Data Analytics",
    bio: "Google professionals teaching real-world analytics skills using industry-standard tools"
  },
  {
    name: "Coursera Partners",
    role: "Professional Development",
    bio: "Top-rated instructors from Coursera's global network of educators"
  },
  {
    name: "Industry Practitioners",
    role: "Applied Learning",
    bio: "Active professionals bringing current industry practices to the classroom"
  }
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-navy pt-20">
      {/* Hero Section */}
      <Section background="gradient" spacing="xl" className="mesh-gradient grain-overlay">
        <Container size="lg">
          <div className={`text-center max-w-4xl mx-auto ${mounted ? 'animate-[fadeInUp_0.8s_ease-out]' : 'opacity-0'}`}>
            <Heading as="h1" size="3xl" className="mb-6 text-primary">
              About Aptly
            </Heading>
            <p className="text-xl text-secondary leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
              Aptly partners with leading technology companies to deliver professional 
              certificate programs that prepare learners for careers in digital marketing 
              and data analytics.
            </p>
          </div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section background="navy" spacing="xl">
        <Container size="lg">
          <Grid cols={{ default: 1, lg: 2 }} gap="lg" className="items-center">
            <ScrollAnimatedSection animation="slideLeft" className="space-y-6">
              <Heading as="h2" size="2xl" className="mb-6">
                Our Mission
              </Heading>
              <p className="text-lg text-secondary mb-6 leading-relaxed">
                To provide accessible, industry-recognized certifications from Meta, 
                Google, and other leading tech companies that enable professionals to 
                build successful careers in digital marketing and data analytics.
              </p>
              <p className="text-secondary mb-8">
                We believe that with the right education and support, anyone can 
                build a successful career in technology, regardless of their background 
                or previous experience.
              </p>
              <Button href="/programs" variant="secondary" className="btn-secondary">
                Explore Programs
              </Button>
            </ScrollAnimatedSection>
            
            <ScrollAnimatedSection animation="slideRight">
              <Card variant="default" padding="lg" className="card-standard">
                <div className="space-y-6">
                  <div className="border-l-4 border-secondary pl-6 group hover:translate-x-2 transition-transform">
                    <div className="text-4xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform">1000s</div>
                    <p className="text-primary">Professionals Enrolled</p>
                  </div>
                  <div className="border-l-4 border-secondary pl-6 group hover:translate-x-2 transition-transform">
                    <div className="text-4xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform">3</div>
                    <p className="text-primary">Major Tech Partnerships</p>
                  </div>
                  <div className="border-l-4 border-secondary pl-6 group hover:translate-x-2 transition-transform">
                    <div className="text-4xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform">6</div>
                    <p className="text-primary">Professional Certificates</p>
                  </div>
                </div>
              </Card>
            </ScrollAnimatedSection>
          </Grid>
        </Container>
      </Section>

      {/* Values Section */}
      <Section background="light-navy" spacing="xl">
        <Container size="lg">
          <ScrollAnimatedSection animation="fadeIn" className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              Our Values
            </Heading>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              These principles guide everything we do at Aptly
            </p>
          </ScrollAnimatedSection>
          
          <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
            {values.map((value, idx) => (
              <ScrollAnimatedSection
                key={value.title}
                animation="scale"
                delay={idx * 100}
              >
                <Card 
                  variant="bordered" 
                  padding="md" 
                  className="h-full text-center card-standard group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-navy rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all">
                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                  </div>
                  <Heading as="h3" size="md" weight="medium" className="mb-3 group-hover:text-secondary transition-colors text-primary">
                    {value.title}
                  </Heading>
                  <p className="text-secondary text-sm">
                    {value.description}
                  </p>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section background="navy" spacing="xl">
        <Container size="lg">
          <ScrollAnimatedSection animation="fadeIn" className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4 text-primary">
              Our Journey
            </Heading>
          </ScrollAnimatedSection>
          
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, idx) => (
              <ScrollAnimatedSection
                key={`${item.year}-${idx}`}
                animation="slideLeft"
                delay={idx * 100}
                className="flex gap-6 mb-8 last:mb-0 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-10 bg-gradient-to-r from-secondary to-navy rounded-full flex items-center justify-center text-primary font-bold group-hover:scale-110 transition-transform shadow-elegant">
                    {item.year}
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-secondary group-hover:translate-x-2 transition-transform">{item.event}</p>
                </div>
              </ScrollAnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* Instructors Section */}
      <Section background="navy" spacing="xl">
        <Container size="lg">
          <ScrollAnimatedSection animation="fadeIn" className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              Our Instructors
            </Heading>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Learn from industry experts at Meta, Google, and leading institutions
            </p>
          </ScrollAnimatedSection>
          
          <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
            {instructors.map((instructor, idx) => (
              <ScrollAnimatedSection
                key={instructor.name}
                animation="scale"
                delay={idx * 100}
              >
                <Card 
                  variant="default" 
                  padding="md" 
                  className="text-center card-standard group"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-secondary to-light-navy rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform shadow-xl" />
                  <Heading as="h3" size="md" weight="medium" className="mb-1 group-hover:text-secondary transition-colors text-primary">
                    {instructor.name}
                  </Heading>
                  <p className="text-secondary text-sm mb-3 font-medium">{instructor.role}</p>
                  <p className="text-secondary text-sm">{instructor.bio}</p>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="gradient" spacing="lg" className="mesh-gradient">
        <Container size="md">
          <div className={`text-center ${mounted ? 'animate-[fadeInScale_1s_ease-out]' : 'opacity-0'}`}>
            <Heading as="h2" size="2xl" className="mb-6">
              Join Our Mission
            </Heading>
            <p className="text-lg text-secondary mb-8">
              Whether you&apos;re looking to transform your career or your organization&apos;s 
              capabilities, we&apos;re here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary" className="btn-primary">
                Start Learning
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary">
                Join Our Team
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
