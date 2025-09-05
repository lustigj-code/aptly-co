"use client";
import { useState } from 'react';
import Image from 'next/image';
import { 
  Container, 
  Section, 
  Heading, 
  Button, 
  Grid, 
  Card,
  Badge,
  Divider 
} from '@/design-system';
import { courses } from '@/lib/data/courses';

const categories = [
  { id: 'all', label: 'All Programs' },
  { id: 'certificate', label: 'Professional Certificates' },
  { id: 'specialization', label: 'Specializations' },
  { id: 'course', label: 'Individual Courses' }
];

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  return (
    <main className="min-h-screen bg-navy pt-20">
      {/* Hero Section */}
      <Section background="gradient" spacing="lg">
        <Container size="lg">
          <div className="text-center max-w-3xl mx-auto">
            <Heading as="h1" size="3xl" className="mb-6">
              Professional Certificate Programs
            </Heading>
            <p className="text-xl text-light-teal leading-relaxed">
              Industry-recognized certifications designed with hiring managers from 
              Meta, Google, and leading tech companies. Graduate job-ready in 3-6 months.
            </p>
          </div>
        </Container>
      </Section>

      {/* Stats Bar */}
      <Section background="light-navy" spacing="sm">
        <Container size="lg">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <span className="text-3xl font-bold text-teal">7</span>
              <span className="text-white ml-2">Programs Available</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-teal">3-6</span>
              <span className="text-white ml-2">Months to Complete</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-teal">No</span>
              <span className="text-white ml-2">Experience Required</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Filter Tabs */}
      <Section background="navy" spacing="md">
        <Container size="lg">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-teal text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Programs Grid */}
          <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="lg">
            {filteredCourses.map((course, idx) => (
              <div key={course.id}>
                <Card variant="bordered" className="h-full hover:border-teal/40 transition-all group">
                  <div className="aspect-video relative mb-6 overflow-hidden rounded-xl">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant={course.featured ? 'success' : 'default'}>
                      {course.category === 'certificate' && 'Professional Certificate'}
                      {course.category === 'specialization' && 'Specialization'}
                      {course.category === 'course' && 'Course'}
                    </Badge>
                    {course.featured && <Badge variant="info">Featured</Badge>}
                  </div>
                  
                  <Heading as="h3" size="md" weight="medium" className="mb-3">
                    {course.title}
                  </Heading>
                  
                  <p className="text-light-teal mb-6 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Button 
                      href={course.link} 
                      variant="secondary" 
                      size="sm" 
                      external
                      className="w-full"
                    >
                      View on Coursera
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="light-navy" spacing="lg">
        <Container size="md">
          <Card variant="default" padding="lg">
            <div className="text-center">
              <Heading as="h2" size="xl" className="mb-4">
                Not Sure Which Program to Choose?
              </Heading>
              <p className="text-light-teal mb-8 text-lg">
                Take our 2-minute career quiz to get personalized program recommendations 
                based on your goals and experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="md">
                  Take Career Quiz
                </Button>
                <Button variant="outline" size="md">
                  Talk to Advisor
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}