'use client';

import Link from "next/link";
import { useEffect, useState } from 'react';
import { Container, Section, Heading, Button, Grid, Card } from '@/design-system';
import { services, pricingInfo, processSteps } from "@/lib/data/services";
import '@/styles/animations.css';

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-navy">
      {/* Hero Section */}
      <Section background="gradient" spacing="xl" className="mesh-gradient grain-overlay">
        <Container size="lg">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 leading-tight ${
              mounted ? 'animate-[fadeInUp_0.8s_ease-out]' : 'opacity-0'
            }`}>
              Professional{" "}
              <span className="text-secondary">
                Certifications
              </span>
            </h1>
            <p className={`text-lg md:text-xl text-secondary max-w-4xl mx-auto mb-8 leading-relaxed ${
              mounted ? 'animate-[fadeInUp_0.8s_ease-out_0.2s_both]' : 'opacity-0'
            }`}>
              Advance your career with industry-recognized certificates from Meta and Google, 
              supported by comprehensive study tools
            </p>
            <div className={`flex flex-col sm:flex-row gap-6 justify-center ${
              mounted ? 'animate-[fadeInUp_0.8s_ease-out_0.4s_both]' : 'opacity-0'
            }`}>
              <Button
                href="/programs"
                variant="primary"
                size="lg"
                className="btn-primary"
              >
                View Certificate Programs
              </Button>
              <Button
                href="/demo"
                variant="outline"
                size="lg"
                className="btn-secondary"
              >
                Start Free Course Preview
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section background="light-navy" spacing="xl">
        <Container size="lg">
          <div className={`text-center mb-16 ${
            mounted ? 'animate-[fadeInUp_0.8s_ease-out_0.5s_both]' : 'opacity-0'
          }`}>
            <Heading as="h2" size="2xl" className="mb-6">
              What We Offer
            </Heading>
            <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto">
              Complete learning ecosystem for digital skills certification and career advancement
            </p>
          </div>
          
          <Grid cols={{ default: 1, md: 2 }} gap="lg">
            {services.map((service, i) => (
              <Card
                key={service.title}
                variant="bordered"
                className={`group card-standard hover:border-secondary/40 transition-all duration-500 ${
                  mounted ? `animate-[fadeInScale_0.8s_ease-out_${0.6 + i * 0.1}s_both]` : 'opacity-0'
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-navy rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <div className="text-2xl text-primary font-bold">{service.icon}</div>
                </div>
                <Heading as="h3" size="lg" weight="medium" className="mb-6 group-hover:text-secondary transition-colors text-primary">
                  {service.title}
                </Heading>
                <p className="text-secondary mb-8 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-secondary group/item hover:translate-x-2 transition-transform">
                      <div className="w-5 h-5 bg-secondary/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0 group-hover/item:bg-secondary/30 transition-colors">
                        <span className="text-secondary text-xs font-bold">✓</span>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.highlight && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-secondary font-medium">
                      {service.highlight}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Pricing Information */}
      <Section background="navy" spacing="lg">
        <Container size="md">
          <Card variant="default" className={`card-standard text-center ${
            mounted ? 'animate-[fadeInUp_0.8s_ease-out_0.7s_both]' : 'opacity-0'
          }`}>
            <Heading as="h3" size="xl" className="mb-8">
              Flexible Pricing Options
            </Heading>
            <Grid cols={{ default: 1, md: 3 }} gap="md">
              <div className="p-4 group hover:scale-105 transition-transform">
                <div className="text-secondary font-bold mb-2">Free Access</div>
                <p className="text-secondary text-sm">
                  {pricingInfo.freeAccess}
                </p>
              </div>
              <div className="p-4 group hover:scale-105 transition-transform">
                <div className="text-secondary font-bold mb-2">Professional Certificates</div>
                <p className="text-secondary text-sm">
                  {pricingInfo.paidCertificates}
                </p>
              </div>
              <div className="p-4 group hover:scale-105 transition-transform">
                <div className="text-secondary font-bold mb-2">Enterprise</div>
                <p className="text-secondary text-sm">
                  {pricingInfo.enterprise}
                </p>
              </div>
            </Grid>
          </Card>
        </Container>
      </Section>

      {/* Process Section */}
      <Section background="light-navy" spacing="xl">
        <Container size="lg">
          <div className={`text-center mb-16 ${
            mounted ? 'animate-[fadeInUp_0.8s_ease-out_0.8s_both]' : 'opacity-0'
          }`}>
            <Heading as="h2" size="2xl" className="mb-6 text-primary">
              Your Learning Journey
            </Heading>
            <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto">
              A clear path from enrollment to certification
            </p>
          </div>
          
          <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className={`text-center card-standard p-8 transition-all duration-500 hover:scale-105 group ${
                  mounted ? `animate-[fadeInUp_0.8s_ease-out_${0.9 + i * 0.1}s_both]` : 'opacity-0'
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-navy rounded-full flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-6 group-hover:scale-110 group-hover:shadow-xl transition-all">
                  {step.number}
                </div>
                <Heading as="h3" size="md" weight="medium" className="mb-4 text-primary">
                  {step.title}
                </Heading>
                <p className="text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="gradient" spacing="lg" className="mesh-gradient">
        <Container size="md">
          <div className={`text-center ${
            mounted ? 'animate-[fadeInScale_0.8s_ease-out_1.2s_both]' : 'opacity-0'
          }`}>
            <Heading as="h2" size="2xl" className="mb-6">
              Start Your Certification Journey
            </Heading>
            <p className="text-lg md:text-xl text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of learners advancing their careers with Meta and Google certifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="btn-primary"
              >
                Explore Enterprise Options
              </Button>
              <Button
                href="/programs"
                variant="outline"
                size="lg"
                className="btn-secondary"
              >
                Browse All Courses
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}