"use client";
import { motion } from 'framer-motion';
import { 
  Container, 
  Section, 
  Heading, 
  Button, 
  Grid, 
  Card,
  Stat,
  Divider 
} from '@/design-system';

const solutions = [
  {
    title: "Team Upskilling",
    description: "Transform your workforce with cutting-edge digital skills",
    features: [
      "Customized learning paths",
      "Progress tracking dashboard",
      "Dedicated success manager",
      "Quarterly skill assessments"
    ]
  },
  {
    title: "Enterprise Platform",
    description: "Comprehensive learning management for organizations",
    features: [
      "Single sign-on (SSO)",
      "Advanced analytics",
      "API integrations",
      "Unlimited seats"
    ]
  },
  {
    title: "Custom Programs",
    description: "Tailored certification programs for your industry",
    features: [
      "Industry-specific content",
      "Branded certificates",
      "Expert consultation",
      "White-label options"
    ]
  }
];

const clients = [
  "Fortune 500 companies",
  "Government agencies",
  "Educational institutions",
  "Non-profit organizations"
];

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-navy pt-20">
      {/* Hero Section */}
      <Section background="gradient" spacing="xl">
        <Container size="lg">
          <div className="text-center max-w-4xl mx-auto">
            <Heading as="h1" size="3xl" className="mb-6">
              Enterprise Learning Solutions
            </Heading>
            <p className="text-xl text-light-teal mb-10 leading-relaxed">
              Empower your workforce with industry-leading certifications. 
              Scale digital skills across your organization with our enterprise platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                Request Demo
              </Button>
              <Button size="lg" variant="outline">
                Download Brochure
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust Indicators */}
      <Section background="light-navy" spacing="md">
        <Container size="lg">
          <p className="text-center text-light-teal mb-8">
            Trusted by leading organizations worldwide
          </p>
          <Grid cols={{ default: 2, md: 4 }} gap="md">
            <Stat value="500+" label="Enterprise Clients" />
            <Stat value="250K+" label="Employees Trained" />
            <Stat value="92%" label="Completion Rate" />
            <Stat value="4.9/5" label="Client Satisfaction" />
          </Grid>
        </Container>
      </Section>

      {/* Solutions */}
      <Section background="navy" spacing="xl">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              Solutions for Every Organization
            </Heading>
            <p className="text-lg text-light-teal max-w-2xl mx-auto">
              From small teams to global enterprises, we have the right solution 
              to meet your learning and development needs.
            </p>
          </div>

          <Grid cols={{ default: 1, md: 3 }} gap="lg">
            {solutions.map((solution, idx) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card variant="bordered" padding="lg" className="h-full">
                  <Heading as="h3" size="lg" weight="medium" className="mb-4">
                    {solution.title}
                  </Heading>
                  <p className="text-light-teal mb-6">
                    {solution.description}
                  </p>
                  <ul className="space-y-3">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-teal mr-3">✓</span>
                        <span className="text-white text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section background="white" spacing="xl">
        <Container size="lg">
          <Grid cols={{ default: 1, lg: 2 }} gap="lg" className="items-center">
            <div>
              <Heading as="h2" size="2xl" color="navy" className="mb-6">
                Why Choose Aptly for Business?
              </Heading>
              <div className="space-y-6">
                <div>
                  <Heading as="h3" size="md" color="navy" weight="medium" className="mb-2">
                    Industry Partnerships
                  </Heading>
                  <p className="text-rich-black">
                    Direct partnerships with Meta, Google, and leading tech companies ensure 
                    your team learns the most relevant skills.
                  </p>
                </div>
                <div>
                  <Heading as="h3" size="md" color="navy" weight="medium" className="mb-2">
                    Measurable ROI
                  </Heading>
                  <p className="text-rich-black">
                    Track progress with detailed analytics. Our clients report 40% improvement 
                    in productivity within 6 months.
                  </p>
                </div>
                <div>
                  <Heading as="h3" size="md" color="navy" weight="medium" className="mb-2">
                    Dedicated Support
                  </Heading>
                  <p className="text-rich-black">
                    Your success manager ensures smooth implementation and maximum engagement 
                    across your organization.
                  </p>
                </div>
              </div>
            </div>

            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <Heading as="h3" size="lg" color="navy" className="mb-4">
                  Case Study: Global Bank
                </Heading>
                <div className="space-y-4 text-rich-black">
                  <p>
                    A Fortune 500 bank trained 5,000 employees in data analytics 
                    using Aptly&apos;s enterprise platform.
                  </p>
                  <div className="py-4">
                    <div className="text-3xl font-bold text-teal">87%</div>
                    <div className="text-sm">Completion Rate</div>
                  </div>
                  <p className="italic">
                    &ldquo;Aptly transformed our workforce capabilities in just 6 months.&rdquo;
                  </p>
                  <p className="text-sm font-medium">- Chief Learning Officer</p>
                </div>
              </div>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Client Types */}
      <Section background="light-navy" spacing="lg">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              Serving Organizations Worldwide
            </Heading>
          </div>
          <Grid cols={{ default: 2, md: 4 }} gap="md">
            {clients.map((client) => (
              <Card key={client} variant="default" padding="md">
                <p className="text-white text-center font-medium">{client}</p>
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
              Ready to Transform Your Workforce?
            </Heading>
            <p className="text-lg text-light-teal mb-8">
              Join 500+ organizations already using Aptly to upskill their teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline">
                Request Pricing
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}