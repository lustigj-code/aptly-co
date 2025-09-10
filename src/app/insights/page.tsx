import { 
  Container, 
  Section, 
  Heading, 
  Button, 
  Grid, 
  Card,
  Badge
} from '@/design-system';
import { 
  getBlogPosts, 
  getFeaturedPosts, 
  blogCategories,
  type BlogCategory 
} from '@/lib/data/blog-posts';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights & Blog | Aptly - Career Development Resources',
  description: 'Expert insights on Meta and Google certifications, career transitions, digital marketing skills, and online learning strategies. Free guides and success stories.',
  keywords: 'career insights, meta certificate, google certificate, digital marketing blog, career transition guide',
};

export default function InsightsPage() {
  const featuredPosts = getFeaturedPosts();
  const allPosts = getBlogPosts();
  const categories = Object.entries(blogCategories);

  return (
    <main className="min-h-screen bg-navy">
      {/* Hero Section */}
      <Section background="gradient" spacing="lg">
        <Container size="lg">
          <div className="text-center max-w-3xl mx-auto">
            <Heading as="h1" size="3xl" className="mb-4">
              Insights & Resources
            </Heading>
            <p className="text-xl text-secondary">
              Expert guidance on certifications, career transitions, and skill development
            </p>
          </div>
        </Container>
      </Section>

      {/* Category Navigation */}
      <Section background="navy" spacing="md">
        <Container size="lg">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(([key, category]) => (
              <Link
                key={key}
                href={`#${key}`}
                className="px-6 py-3 bg-light-navy hover:bg-light-navy/70 border border-secondary/20 hover:border-secondary/40 rounded-full text-primary transition-all"
              >
                {category.label}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <Section background="light-navy" spacing="lg">
          <Container size="lg">
            <Heading as="h2" size="2xl" className="mb-8 text-center">
              Featured Articles
            </Heading>
            <Grid cols={{ default: 1, lg: 2 }} gap="lg">
              {featuredPosts.map((post) => (
                <Card key={post.slug} variant="bordered" className="h-full card-standard hover:border-secondary/40 transition-colors">
                  <Badge variant="success" size="sm">Featured</Badge>
                  <Heading as="h3" size="lg" weight="medium" className="mt-4 mb-3">
                    <Link href={`/insights/${post.slug}`} className="hover:text-secondary transition-colors text-primary">
                      {post.title}
                    </Link>
                  </Heading>
                  <p className="text-secondary mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-secondary">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="mt-6">
                    <Button 
                      href={`/insights/${post.slug}`}
                      variant="secondary" 
                      size="sm"
                      className="w-full btn-secondary"
                    >
                      Read Article
                    </Button>
                  </div>
                </Card>
              ))}
            </Grid>
          </Container>
        </Section>
      )}

      {/* All Posts by Category */}
      <Section background="navy" spacing="xl">
        <Container size="lg">
          {categories.map(([categoryKey, category]) => {
            const categoryPosts = getBlogPosts(categoryKey as BlogCategory);
            if (categoryPosts.length === 0) return null;

            return (
              <div key={categoryKey} id={categoryKey} className="mb-16 last:mb-0">
                <div className="mb-8">
                  <Heading as="h2" size="xl" className="mb-2">
                    {category.label}
                  </Heading>
                  <p className="text-secondary">
                    {category.description}
                  </p>
                </div>
                <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="md">
                  {categoryPosts.map((post) => (
                    <Card 
                      key={post.slug} 
                      variant="default" 
                      padding="md"
                      className="h-full card-standard hover:bg-light-navy/50 transition-colors"
                    >
                      <Badge
                        variant="info" 
                        size="sm"
                      >
                        {blogCategories[post.category].label}
                      </Badge>
                      <Heading as="h3" size="md" weight="medium" className="mb-3">
                        <Link 
                          href={`/insights/${post.slug}`}
                          className="hover:text-secondary transition-colors text-primary"
                        >
                          {post.title}
                        </Link>
                      </Heading>
                      <p className="text-secondary text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-secondary">
                        <span>{post.publishDate}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </Card>
                  ))}
                </Grid>
              </div>
            );
          })}
        </Container>
      </Section>

      {/* Newsletter Signup */}
      <Section background="gradient" spacing="lg">
        <Container size="md">
          <Card variant="bordered" padding="lg" className="text-center card-standard border-white/20">
            <Heading as="h2" size="2xl" className="mb-4">
              Stay Updated
            </Heading>
            <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
              Get weekly career insights and course updates delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-primary placeholder-secondary/50 focus:outline-none focus:border-secondary transition-colors"
                required
              />
              <Button type="submit" variant="primary" size="md" className="btn-primary">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-secondary/70 mt-4">
              No spam, unsubscribe anytime
            </p>
          </Card>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="navy" spacing="lg">
        <Container size="md">
          <div className="text-center">
            <Heading as="h2" size="2xl" className="mb-6">
              Ready to Start Learning?
            </Heading>
            <p className="text-lg text-secondary mb-8">
              Join thousands of professionals advancing their careers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/programs" size="lg" variant="primary" className="btn-primary">
                Browse Programs
              </Button>
              <Button href="/contact" size="lg" variant="outline" className="btn-secondary">
                Talk to Advisor
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
