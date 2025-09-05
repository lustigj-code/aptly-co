"use client";
import { motion } from 'framer-motion';
import { 
  Container, 
  Section, 
  Heading, 
  Button, 
  Grid, 
  Card,
  Divider 
} from '@/design-system';

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
  { year: "2019", event: "Aptly founded with mission to democratize tech education" },
  { year: "2020", event: "Partnership with Meta for professional certificates" },
  { year: "2021", event: "Reached 10,000 learners milestone" },
  { year: "2022", event: "Launched enterprise platform for businesses" },
  { year: "2023", event: "Partnership with Google expanded" },
  { year: "2024", event: "50,000+ learners and 500+ enterprise clients" }
];

const team = [
  {
    name: "Sarah Mitchell",
    role: "CEO & Co-Founder",
    bio: "Former VP of Learning at Fortune 500 tech company"
  },
  {
    name: "David Chen",
    role: "CTO & Co-Founder",
    bio: "Former Engineering Director at leading EdTech platform"
  },
  {
    name: "Maria Rodriguez",
    role: "VP of Curriculum",
    bio: "20+ years in educational design and development"
  },
  {
    name: "James Thompson",
    role: "VP of Partnerships",
    bio: "Former Strategic Partnerships lead at major MOOC platform"
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-navy pt-20">
      {/* Hero Section */}
      <Section background="gradient" spacing="xl">
        <Container size="lg">
          <div className="text-center max-w-4xl mx-auto">
            <Heading as="h1" size="3xl" className="mb-6">
              About Aptly
            </Heading>
            <p className="text-xl text-light-teal leading-relaxed">
              We&apos;re on a mission to prepare professionals for the jobs of tomorrow 
              through industry-leading education and partnerships with the world&apos;s 
              most innovative companies.
            </p>
          </div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section background="navy" spacing="xl">
        <Container size="lg">
          <Grid cols={{ default: 1, lg: 2 }} gap="lg" className="items-center">
            <div>
              <Heading as="h2" size="2xl" className="mb-6">
                Our Mission
              </Heading>
              <p className="text-lg text-light-teal mb-6 leading-relaxed">
                To bridge the global skills gap by providing accessible, 
                industry-recognized certifications that transform careers and 
                empower individuals to thrive in the digital economy.
              </p>
              <p className="text-light-teal mb-8">
                We believe that with the right education and support, anyone can 
                build a successful career in technology, regardless of their background 
                or previous experience.
              </p>
              <Button href="/programs" variant="secondary">
                Explore Programs
              </Button>
            </div>
            <Card variant="default" padding="lg">
              <div className="space-y-6">
                <div className="border-l-4 border-teal pl-6">
                  <div className="text-4xl font-bold text-teal mb-2">50,000+</div>
                  <p className="text-white">Careers Transformed</p>
                </div>
                <div className="border-l-4 border-teal pl-6">
                  <div className="text-4xl font-bold text-teal mb-2">87%</div>
                  <p className="text-white">Job Placement Rate</p>
                </div>
                <div className="border-l-4 border-teal pl-6">
                  <div className="text-4xl font-bold text-teal mb-2">95%</div>
                  <p className="text-white">Completion Rate</p>
                </div>
              </div>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Values Section */}
      <Section background="light-navy" spacing="xl">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              Our Values
            </Heading>
            <p className="text-lg text-light-teal max-w-2xl mx-auto">
              These principles guide everything we do at Aptly
            </p>
          </div>
          <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card variant="bordered" padding="md" className="h-full text-center">
                  <Heading as="h3" size="md" weight="medium" className="mb-3">
                    {value.title}
                  </Heading>
                  <p className="text-light-teal text-sm">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section background="white" spacing="xl">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" color="navy" className="mb-4">
              Our Journey
            </Heading>
          </div>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-10 bg-teal rounded-full flex items-center justify-center text-white font-bold">
                    {item.year}
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-rich-black">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <Section background="navy" spacing="xl">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              Leadership Team
            </Heading>
            <p className="text-lg text-light-teal max-w-2xl mx-auto">
              Led by industry veterans passionate about transforming education
            </p>
          </div>
          <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
            {team.map((member) => (
              <Card key={member.name} variant="default" padding="md" className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-teal to-light-navy rounded-full mx-auto mb-4" />
                <Heading as="h3" size="md" weight="medium" className="mb-1">
                  {member.name}
                </Heading>
                <p className="text-teal text-sm mb-3">{member.role}</p>
                <p className="text-light-teal text-sm">{member.bio}</p>
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
              Join Our Mission
            </Heading>
            <p className="text-lg text-light-teal mb-8">
              Whether you&apos;re looking to transform your career or your organization&apos;s 
              capabilities, we&apos;re here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                Start Learning
              </Button>
              <Button size="lg" variant="outline">
                Join Our Team
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}