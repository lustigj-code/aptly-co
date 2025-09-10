'use client';

import { useEffect, useState } from 'react';
import { 
  Container, 
  Section, 
  Heading, 
  Button, 
  Grid, 
  Card,
  Badge
} from '@/design-system';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { 
  successStories, 
  successMetrics, 
  categoryLabels, 
  categoryDescriptions 
} from '@/lib/data/success-stories';
import '@/styles/animations.css';

export default function SuccessPage() {
  const [mounted, setMounted] = useState(false);
  const careerChangers = successStories.filter(s => s.category === 'career-changer');
  const skillUpgraders = successStories.filter(s => s.category === 'skill-upgrader');
  const recentGraduates = successStories.filter(s => s.category === 'recent-graduate');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-navy text-primary">
      {/* Hero Section */}
      <Section background="gradient" spacing="xl" className="mesh-gradient grain-overlay">
        <Container size="lg">
          <div className={`text-center max-w-4xl mx-auto ${mounted ? 'animate-[fadeInUp_0.8s_ease-out]' : 'opacity-0'}`}>
            <Heading as="h1" size="3xl" className="mb-6">
              Real People.{" "}
              <span className="text-secondary">
                Real Results.
              </span>
            </Heading>
            <p className="text-xl leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.2s_both] text-secondary">
              Discover how professionals from all backgrounds have transformed their careers 
              with Meta and Google certificates through Aptly
            </p>
          </div>
        </Container>
      </Section>

      {/* Success Metrics Section */}
      <Section spacing="lg" className="bg-light-navy">
        <Container size="lg">
          <ScrollAnimatedSection animation="fadeIn">
            <Card variant="default" className="card-standard">
              <Heading as="h2" size="xl" className="text-center mb-8">
                Success by the Numbers
              </Heading>
              <Grid cols={{ default: 2, md: 3, lg: 6 }} gap="md">
                <div className="text-center group hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold text-secondary">
                    {successMetrics.averageCompletionTime}
                  </div>
                  <div className="text-sm mt-2 text-secondary">
                    Average Completion
                  </div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold text-secondary">
                    {successMetrics.careerTransitionRate}
                  </div>
                  <div className="text-sm mt-2 text-secondary">
                    Career Transition Rate
                  </div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold text-secondary">
                    {successMetrics.skillApplicationRate}
                  </div>
                  <div className="text-sm mt-2 text-secondary">
                    Apply Skills at Work
                  </div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold text-secondary">
                    {successMetrics.learnerSatisfaction}
                  </div>
                  <div className="text-sm mt-2 text-secondary">
                    Learner Satisfaction
                  </div>
                </div>
                <div className="text-center col-span-2 group hover:scale-105 transition-transform">
                  <div className="text-lg font-bold text-primary mb-2">
                    Most Popular Certificate
                  </div>
                  <div className="text-secondary">
                    {successMetrics.mostPopularCertificate}
                  </div>
                </div>
              </Grid>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-primary font-bold mb-3">
                    Top Industries Hiring Our Graduates
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {successMetrics.topHiringIndustries.map(industry => (
                      <Badge
                        key={industry}
                        variant="info"
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </ScrollAnimatedSection>
        </Container>
      </Section>

      {/* Career Changers Section */}
      <Section background="navy" spacing="xl">
        <Container size="lg">
          <ScrollAnimatedSection animation="fadeIn" className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              {categoryLabels['career-changer']}
            </Heading>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              {categoryDescriptions['career-changer']}
            </p>
          </ScrollAnimatedSection>
          
          <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="lg" className="items-stretch">
            {careerChangers.map((story, index) => (
              <ScrollAnimatedSection
                key={story.id}
                animation="scale"
                delay={index * 100}
              >
                <Card variant="default" className="h-full card-standard">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary to-navy rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-primary font-bold">
                          {story.initials}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-secondary text-sm font-medium">
                          {story.completionTime}
                        </div>
                        <div className="text-primary font-bold">
                          {story.certificateCompleted}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-secondary text-sm">
                        <span className="text-secondary">From:</span> {story.previousRole}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-secondary text-sm">
                        <span className="text-secondary">To:</span> {story.currentRole}
                      </div>
                    </div>
                  </div>

                  <blockquote className="text-secondary italic mb-6 leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>

                  <div className="pt-6 border-t border-white/10">
                    <div className="text-secondary font-medium text-sm">
                      Key Outcome
                    </div>
                    <div className="text-primary mt-2">
                      {story.keyOutcome}
                    </div>
                  </div>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Skill Upgraders Section */}
      <Section background="light-navy" spacing="xl">
        <Container size="lg">
          <ScrollAnimatedSection animation="fadeIn" className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              {categoryLabels['skill-upgrader']}
            </Heading>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              {categoryDescriptions['skill-upgrader']}
            </p>
          </ScrollAnimatedSection>
          
          <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="lg" className="items-stretch">
            {skillUpgraders.map((story, index) => (
              <ScrollAnimatedSection
                key={story.id}
                animation="scale"
                delay={index * 100}
              >
                <Card variant="default" className="h-full glass card-hover shadow-elegant-hover">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal to-navy rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <span className="text-primary font-bold">
                          {story.initials}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-secondary text-sm font-medium">
                          {story.completionTime}
                        </div>
                        <div className="text-primary font-bold">
                          {story.certificateCompleted}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-secondary text-sm">
                        <span className="text-secondary">From:</span> {story.previousRole}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-secondary text-sm">
                        <span className="text-secondary">To:</span> {story.currentRole}
                      </div>
                    </div>
                  </div>

                  <blockquote className="text-secondary italic mb-6 leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>

                  <div className="pt-6 border-t border-white/10">
                    <div className="text-secondary font-medium text-sm">
                      Key Outcome
                    </div>
                    <div className="text-primary mt-2">
                      {story.keyOutcome}
                    </div>
                  </div>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Recent Graduates Section */}
      <Section background="navy" spacing="xl">
        <Container size="lg">
          <ScrollAnimatedSection animation="fadeIn" className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              {categoryLabels['recent-graduate']}
            </Heading>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              {categoryDescriptions['recent-graduate']}
            </p>
          </ScrollAnimatedSection>
          
          <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="lg" className="items-stretch">
            {recentGraduates.map((story, index) => (
              <ScrollAnimatedSection
                key={story.id}
                animation="scale"
                delay={index * 100}
              >
                <Card variant="default" className="h-full card-standard">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary to-navy rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-primary font-bold">
                          {story.initials}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-secondary text-sm font-medium">
                          {story.completionTime}
                        </div>
                        <div className="text-primary font-bold">
                          {story.certificateCompleted}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-secondary text-sm">
                        <span className="text-secondary">From:</span> {story.previousRole}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-secondary text-sm">
                        <span className="text-secondary">To:</span> {story.currentRole}
                      </div>
                    </div>
                  </div>

                  <blockquote className="text-secondary italic mb-6 leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>

                  <div className="pt-6 border-t border-white/10">
                    <div className="text-secondary font-medium text-sm">
                      Key Outcome
                    </div>
                    <div className="text-primary mt-2">
                      {story.keyOutcome}
                    </div>
                  </div>
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
            <Card variant="default" className="card-standard">
              <Heading as="h2" size="2xl" className="mb-6">
                Start Your Success Story Today
              </Heading>
              <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of learners who have transformed their careers with industry-recognized certificates from Meta and Google.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  href="/programs"
                  variant="primary"
                  size="lg"
                  className="btn-primary"
                >
                  View Course Catalog
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
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-secondary text-sm">
                  Have questions? Visit our <a href="/faq" className="text-secondary hover:underline">FAQ</a> or <a href="/contact" className="text-secondary hover:underline">contact us</a> for personalized guidance.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
