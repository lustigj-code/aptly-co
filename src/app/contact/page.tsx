"use client";
import { useState } from 'react';
import { 
  Container, 
  Section, 
  Heading, 
  Button, 
  Grid, 
  Card 
} from '@/design-system';

const contactOptions = [
  {
    title: "Sales Inquiries",
    description: "Learn about enterprise solutions",
    email: "sales@aptly.co",
    response: "Within 24 hours"
  },
  {
    title: "Student Support",
    description: "Get help with your courses",
    email: "support@aptly.co",
    response: "Within 4 hours"
  },
  {
    title: "Partnerships",
    description: "Explore collaboration opportunities",
    email: "partners@aptly.co",
    response: "Within 48 hours"
  },
  {
    title: "Media & Press",
    description: "Media inquiries and press kit",
    email: "press@aptly.co",
    response: "Within 24 hours"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <main className="min-h-screen bg-navy pt-20">
      {/* Hero Section */}
      <Section background="gradient" spacing="lg">
        <Container size="lg">
          <div className="text-center max-w-3xl mx-auto">
            <Heading as="h1" size="3xl" className="mb-6">
              Get in Touch
            </Heading>
            <p className="text-xl text-light-teal leading-relaxed">
              Have questions about our programs? Want to explore enterprise solutions? 
              We&apos;re here to help you succeed.
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Options */}
      <Section background="light-navy" spacing="lg">
        <Container size="lg">
          <Grid cols={{ default: 1, md: 2, lg: 4 }} gap="md">
            {contactOptions.map((option) => (
              <Card key={option.title} variant="bordered" padding="md">
                <Heading as="h3" size="md" weight="medium" className="mb-3">
                  {option.title}
                </Heading>
                <p className="text-light-teal text-sm mb-4">
                  {option.description}
                </p>
                <a 
                  href={`mailto:${option.email}`}
                  className="text-teal hover:text-muted-teal transition-colors block mb-2"
                >
                  {option.email}
                </a>
                <p className="text-muted-teal text-xs">
                  Response time: {option.response}
                </p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Contact Form */}
      <Section background="white" spacing="xl">
        <Container size="md">
          <Card variant="elevated" padding="lg">
            <Heading as="h2" size="xl" color="navy" className="mb-6 text-center">
              Send Us a Message
            </Heading>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Grid cols={{ default: 1, md: 2 }} gap="md">
                <div>
                  <label htmlFor="name" className="block text-rich-black font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-teal transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-rich-black font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-teal transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </Grid>

              <Grid cols={{ default: 1, md: 2 }} gap="md">
                <div>
                  <label htmlFor="company" className="block text-rich-black font-medium mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-teal transition-colors"
                    placeholder="Your Company"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-rich-black font-medium mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-teal transition-colors bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="programs">Course Programs</option>
                    <option value="enterprise">Enterprise Solutions</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </Grid>

              <div>
                <label htmlFor="message" className="block text-rich-black font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-teal transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <div className="text-center">
                <Button type="submit" variant="primary" size="lg">
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        </Container>
      </Section>

      {/* Office Locations */}
      <Section background="navy" spacing="lg">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              Our Offices
            </Heading>
          </div>
          
          <Grid cols={{ default: 1, md: 3 }} gap="md">
            <Card variant="default" padding="md" className="text-center">
              <Heading as="h3" size="md" weight="medium" className="mb-3">
                San Francisco
              </Heading>
              <p className="text-light-teal text-sm">
                123 Market Street<br />
                San Francisco, CA 94105<br />
                United States
              </p>
            </Card>
            
            <Card variant="default" padding="md" className="text-center">
              <Heading as="h3" size="md" weight="medium" className="mb-3">
                London
              </Heading>
              <p className="text-light-teal text-sm">
                456 Oxford Street<br />
                London W1C 1AP<br />
                United Kingdom
              </p>
            </Card>
            
            <Card variant="default" padding="md" className="text-center">
              <Heading as="h3" size="md" weight="medium" className="mb-3">
                Singapore
              </Heading>
              <p className="text-light-teal text-sm">
                789 Orchard Road<br />
                Singapore 238839<br />
                Singapore
              </p>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* FAQ CTA */}
      <Section background="gradient" spacing="lg">
        <Container size="md">
          <div className="text-center">
            <Heading as="h2" size="2xl" className="mb-6">
              Have More Questions?
            </Heading>
            <p className="text-lg text-light-teal mb-8">
              Check our FAQ section for quick answers to common questions.
            </p>
            <Button href="/faq" variant="outline" size="lg">
              Visit FAQ
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}