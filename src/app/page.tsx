"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Container, 
  Section, 
  Heading, 
  Button, 
  Grid, 
  Card, 
  Stat,
  Badge,
  Divider 
} from '@/design-system';
import { getFeaturedCourses } from '@/lib/data/courses';
import { AptlyLogo } from '@/components/AptlyLogo';

// Clean animations - subtle and professional
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function HomePage() {
  const featuredCourses = getFeaturedCourses();

  return (
    <main className="min-h-screen bg-navy">
      {/* Hero Section - Clean and Powerful */}
      <Section background="gradient" spacing="xl" className="relative overflow-hidden">
        <Container size="lg">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="info" size="md">Partner with Meta & Google</Badge>
            
            <Heading as="h1" size="3xl" className="mt-6 mb-6">
              Transform Your Career with
              <span className="block text-teal">Industry-Leading Certifications</span>
            </Heading>
            
            <p className="text-xl text-light-teal mb-10 leading-relaxed">
              Join 50,000+ professionals who have advanced their careers through 
              our partnership programs with the world&apos;s leading tech companies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                Browse Programs
              </Button>
              <Button size="lg" variant="outline">
                Talk to Advisor
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Trust Indicators - Clean Stats */}
      <Section background="navy" spacing="md">
        <Container size="lg">
          <Grid cols={{ default: 2, md: 4 }} gap="md">
            <Stat value="50K+" label="Active Learners" />
            <Stat value="95%" label="Completion Rate" />
            <Stat value="87%" label="Job Placement" />
            <Stat value="4.8" label="Rating" />
          </Grid>
        </Container>
      </Section>

      {/* Featured Programs - Clean Cards */}
      <Section background="light-navy" spacing="xl">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              Professional Certificate Programs
            </Heading>
            <p className="text-lg text-light-teal max-w-2xl mx-auto">
              6-month programs designed with industry leaders. 
              Graduate job-ready with portfolio projects and career coaching.
            </p>
          </div>

          <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="lg">
            {featuredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card variant="bordered" className="h-full hover:border-teal/40 transition-colors">
                  <div className="aspect-video relative mb-6 overflow-hidden rounded-xl">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Badge variant="success">Professional Certificate</Badge>
                  <Heading as="h3" size="lg" weight="medium" className="mt-4 mb-3">
                    {course.title}
                  </Heading>
                  <p className="text-light-teal mb-6 line-clamp-2">
                    {course.description}
                  </p>
                  <Button 
                    href={course.link} 
                    variant="secondary" 
                    size="sm" 
                    external
                    className="w-full"
                  >
                    Learn More
                  </Button>
                </Card>
              </motion.div>
            ))}
          </Grid>

          <div className="text-center mt-10">
            <Button href="/programs" variant="outline">
              View All Programs
            </Button>
          </div>
        </Container>
      </Section>

      {/* Value Proposition - The Aptly Advantage */}
      <Section background="navy" spacing="xl">
        <Container size="lg">
          <Grid cols={{ default: 1, lg: 2 }} gap="lg" className="items-center">
            <div>
              <Heading as="h2" size="2xl" className="mb-6">
                The Aptly Advantage
              </Heading>
              <p className="text-lg text-light-teal mb-8">
                We don&apos;t just teach skills - we transform careers. 
                Our comprehensive approach ensures you&apos;re job-ready from day one.
              </p>
              
              <div className="space-y-4">
                {[
                  "Industry-designed curriculum updated quarterly",
                  "1-on-1 career coaching and interview preparation",
                  "Real projects from actual companies",
                  "Direct referrals to partner companies",
                  "Lifetime access to course materials"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center mt-0.5 mr-4 flex-shrink-0">
                      <span className="text-teal text-sm">✓</span>
                    </div>
                    <p className="text-white">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Card variant="default" padding="lg">
                <div className="text-center">
                  <Heading as="h3" size="xl" className="mb-4">
                    Success Story
                  </Heading>
                  <blockquote className="text-light-teal italic mb-6">
                    &ldquo;Aptly&apos;s Meta certificate program helped me transition 
                    from retail to a data analyst role at a Fortune 500 company. 
                    The career support was invaluable.&rdquo;
                  </blockquote>
                  <div className="text-white font-medium">Sarah Chen</div>
                  <div className="text-muted-teal text-sm">Data Analyst, Microsoft</div>
                </div>
              </Card>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Learning Methodology */}
      <Section background="white" spacing="xl">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" color="navy" className="mb-4">
              How It Works
            </Heading>
            <p className="text-lg text-rich-black max-w-2xl mx-auto">
              Your journey from enrollment to employment in four simple steps
            </p>
          </div>

          <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
            {[
              { step: "1", title: "Choose Program", desc: "Select from our curated certificates" },
              { step: "2", title: "Learn & Build", desc: "Complete projects with expert guidance" },
              { step: "3", title: "Get Certified", desc: "Earn industry-recognized credentials" },
              { step: "4", title: "Land Your Job", desc: "Leverage our placement support" }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-navy to-teal text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <Heading as="h3" size="md" color="navy" weight="medium" className="mb-2">
                  {item.title}
                </Heading>
                <p className="text-rich-black text-sm">{item.desc}</p>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="gradient" spacing="lg">
        <Container size="md">
          <div className="text-center">
            <Heading as="h2" size="2xl" className="mb-6">
              Ready to Transform Your Career?
            </Heading>
            <p className="text-lg text-light-teal mb-8">
              Join thousands of successful graduates. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Download Career Guide
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}