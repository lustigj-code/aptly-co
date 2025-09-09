'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
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
import { getFeaturedTestimonial } from '@/lib/data/testimonials';
import { AptlyLogo } from '@/components/AptlyLogo';
import { ButtonRipple } from '@/components/ui/button-ripple';
import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';
import { 
  ChevronRight, 
  ArrowRight, 
  Star, 
  Users, 
  Award, 
  Clock,
  Check,
  TrendingUp,
  BookOpen,
  Briefcase
} from 'lucide-react';
// Animations are globally available via globals.css; avoid duplicate imports here

export default function HomePage() {
  const featuredCourses = getFeaturedCourses();
  const featuredTestimonial = getFeaturedTestimonial();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-navy text-primary">
      {/* Hero Section - Clean and Powerful */}
      <Section background="transparent" spacing="xl" className="relative overflow-hidden">
        <Container size="lg">
          <div className={`text-center max-w-4xl mx-auto ${mounted ? 'animate-[fadeInUp_0.8s_ease-out]' : 'opacity-0'}`}>
            <Badge variant="info" size="md" className="animate-[fadeInScale_0.6s_ease-out_0.2s_both]">Partner with Meta & Google</Badge>
            
            <Heading as="h1" size="3xl" className="mt-6 mb-6 animate-[fadeInUp_0.8s_ease-out_0.3s_both] text-primary">
              Transform Your Career with
              <span className="block text-secondary">Industry-Leading Certifications</span>
            </Heading>
            
            <p className="text-xl mb-10 leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.4s_both] text-secondary">
              Join thousands of professionals advancing their careers through Meta and Google 
              certificate programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
              <ButtonRipple size="lg" variant="primary" className="btn-primary">
                Browse Programs
                <ChevronRight className="inline-block ml-2 w-5 h-5" />
              </ButtonRipple>
              <ButtonRipple size="lg" variant="outline" className="btn-secondary">
                Talk to Advisor
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </ButtonRipple>
            </div>
          </div>
        </Container>
      </Section>

      {/* Success by Numbers - Enhanced Visual Design */}
      <Section background="transparent" spacing="lg" className="section-soft-fade">
        
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              Success by Numbers
            </Heading>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their careers with Aptly
            </p>
          </div>
          
          <Grid cols={{ default: 2, md: 4 }} gap="md" className="opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_both] relative z-10">
            <Card variant="default" className="text-center group hover:opacity-90 transition-opacity duration-300 card-standard">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary to-navy rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <Stat value="10,000+" label="Students Enrolled" />
            </Card>
            
            <Card variant="default" className="text-center group hover:opacity-90 transition-opacity duration-300 card-standard">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-white fill-white" />
              </div>
              <Stat value="4.7" label="Average Rating" />
            </Card>
            
            <Card variant="default" className="text-center group hover:opacity-90 transition-opacity duration-300 card-standard">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal to-light-navy rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <Stat value="Industry" label="Recognized" />
            </Card>
            
            <Card variant="default" className="text-center group hover:opacity-90 transition-opacity duration-300 card-standard">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary to-muted-teal rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <Stat value="6-Month" label="Programs" />
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Featured Programs - Clean Cards */}
      <Section background="transparent" spacing="xl" className="section-soft-fade">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              Professional Certificate Programs
            </Heading>
            <p className="text-lg max-w-2xl mx-auto text-secondary">
              6-month programs designed with industry leaders. 
              Graduate job-ready with portfolio projects and career coaching.
            </p>
          </div>

          <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="lg">
            {featuredCourses.map((course) => (
              <div key={course.id}>
                <Card variant="default" className="h-full card-standard hover:border-secondary/40 transition-all">
                  <div className="aspect-video relative mb-6 overflow-hidden rounded-xl group">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <Badge variant="success">Professional Certificate</Badge>
                  <Heading as="h3" size="lg" weight="medium" className="mt-4 mb-3 text-primary">
                    {course.title}
                  </Heading>
                  <p className="text-secondary mb-6 line-clamp-2">
                    {course.description}
                  </p>
                  <ButtonRipple 
                    variant="secondary" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(course.link, '_blank')}
                  >
                    Learn More
                    <ArrowRight className="inline-block ml-2 w-4 h-4" />
                  </ButtonRipple>
                </Card>
              </div>
            ))}
          </Grid>

          <div className="text-center mt-10">
            <ButtonRipple 
              variant="outline" 
              size="lg"
              className="btn-secondary"
              onClick={() => window.location.href = '/programs'}
            >
              View All Programs
              <ChevronRight className="inline-block ml-2 w-5 h-5" />
            </ButtonRipple>
          </div>
        </Container>
      </Section>

      {/* Value Proposition - The Aptly Advantage */}
      <Section background="transparent" spacing="xl" className="section-soft-fade">
        <Container size="lg">
          <Grid cols={{ default: 1, lg: 2 }} gap="lg" className="items-center">
            <div>
              <Heading as="h2" size="2xl" className="mb-6">
                The Aptly Advantage
              </Heading>
              <p className="text-lg text-secondary mb-8">
                We don&apos;t just teach skills - we transform careers. 
                Our comprehensive approach ensures you&apos;re job-ready from day one.
              </p>
              
              <div className="space-y-4">
                {[
                  "Curriculum designed by Meta and Google",
                  "1-on-1 career coaching and interview preparation",
                  "Real projects from actual companies",
                  "Career certificates recognized by top employers",
                  "Lifetime access to course materials"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start group transition-all hover:translate-x-2">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 group-hover:bg-secondary/30 group-hover:scale-110 transition-all">
                      <Check className="w-4 h-4 text-secondary" />
                    </div>
                    <p className="text-primary group-hover:text-secondary transition-colors">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Card variant="default" padding="lg" className="card-standard animate-[float_6s_ease-in-out_infinite]">
                <div className="text-center">
                  <Heading as="h3" size="xl" className="mb-4">
                    Success Story
                  </Heading>
                  <blockquote className="text-secondary italic mb-6">
                    &ldquo;{featuredTestimonial.quote}&rdquo;
                  </blockquote>
                  <div className="text-primary font-medium">{featuredTestimonial.author}</div>
                  <div className="text-secondary text-sm">{featuredTestimonial.role}</div>
                </div>
              </Card>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Trust Badges - Partner Logos */}
      <Section background="transparent" spacing="lg">
        <Container size="lg">
          <div className="text-center mb-8">
            <Heading as="h2" size="lg" className="mb-2 text-primary">
              Trusted Partners
            </Heading>
            <p className="text-secondary">
              Learn from industry leaders with recognized certifications
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="h-12 flex items-center">
              <Image 
                src="/images/partners/meta-official.svg" 
                alt="Meta" 
                width={100} 
                height={40}
                className="opacity-80 hover:opacity-100 transition-opacity object-contain"
              />
            </div>
            <div className="h-12 flex items-center">
              <Image 
                src="/images/partners/google-official.svg" 
                alt="Google" 
                width={100} 
                height={40}
                className="opacity-80 hover:opacity-100 transition-opacity object-contain"
              />
            </div>
            <div className="h-12 flex items-center">
              <Image 
                src="/images/partners/coursera-official.svg" 
                alt="Coursera" 
                width={120} 
                height={40}
                className="opacity-80 hover:opacity-100 transition-opacity object-contain"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Learning Methodology */}
      <Section background="transparent" spacing="xl" className="section-soft-fade">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4 text-primary">
              How It Works
            </Heading>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Your journey from enrollment to employment in four simple steps
            </p>
          </div>

          <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
            {[
              { step: "1", title: "Choose Program", desc: "Select from our curated certificates" },
              { step: "2", title: "Learn & Build", desc: "Complete projects with expert guidance" },
              { step: "3", title: "Get Certified", desc: "Earn industry-recognized credentials" },
              { step: "4", title: "Land Your Job", desc: "Leverage our placement support" }
            ].map((item, idx) => (
              <div key={item.step} className={`text-center group transition-all hover:scale-105 ${mounted ? `animate-[fadeInUp_0.6s_ease-out_${idx * 0.1}s_both]` : 'opacity-0'}`}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-light-navy text-primary text-2xl font-bold flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-all group-hover:scale-110">
                  {item.step}
                </div>
                <Heading as="h3" size="md" weight="medium" className="mb-2 text-primary">
                  {item.title}
                </Heading>
                <p className="text-secondary text-sm">{item.desc}</p>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="transparent" spacing="lg">
        <Container size="md">
          <Card variant="default" className="card-standard p-12 text-center animate-[fadeInScale_0.8s_ease-out]">
            <Heading as="h2" size="2xl" className="mb-6">
              Ready to Transform Your Career?
            </Heading>
            <p className="text-lg text-secondary mb-8">
              Join thousands of successful graduates. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary" className="btn-primary">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary">
                Download Career Guide
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
