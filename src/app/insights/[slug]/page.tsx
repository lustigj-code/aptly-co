import { notFound } from 'next/navigation';
import { 
  Container, 
  Section, 
  Heading, 
  Button,
  Badge,
  Card,
  Grid
} from '@/design-system';
import { 
  getBlogPost, 
  getRelatedPosts,
  blogCategories,
  getBlogPosts
} from '@/lib/data/blog-posts';
import Link from 'next/link';
import { Metadata } from 'next';
import { getBlogContent } from '@/lib/blog-content';

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found | Aptly',
    };
  }

  return {
    title: `${post.title} | Aptly Insights`,
    description: post.metaDescription,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
    },
  };
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug);
  const content = getBlogContent(params.slug);

  return (
    <main className="min-h-screen bg-navy">
      {/* Hero Section */}
      <Section background="gradient" spacing="lg">
        <Container size="md">
          <div className="text-center">
            <Badge variant="info" size="md">
              {blogCategories[post.category].label}
            </Badge>
            <Heading as="h1" size="3xl" className="mb-6">
              {post.title}
            </Heading>
            <div className="flex items-center justify-center gap-6 text-light-teal">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.publishDate}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Article Content */}
      <Section background="white" spacing="xl">
        <Container size="md">
          <article className="prose prose-lg max-w-none">
            <div 
              className="text-rich-black leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </article>

          {/* Share Buttons */}
          <div className="mt-12 pt-8 border-t border-light-grey">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rich-black font-medium mb-2">Share this article</p>
                <div className="flex gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://aptly.co/insights/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-navy text-white rounded-full hover:bg-light-navy transition-colors text-sm"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://aptly.co/insights/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-navy text-white rounded-full hover:bg-light-navy transition-colors text-sm"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://aptly.co/insights/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-navy text-white rounded-full hover:bg-light-navy transition-colors text-sm"
                  >
                    Facebook
                  </a>
                </div>
              </div>
              <div>
                <Button href="/insights" variant="outline" size="sm">
                  Back to Insights
                </Button>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8">
            <p className="text-rich-black font-medium mb-3">Topics</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-light-teal text-navy text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section background="light-navy" spacing="lg">
          <Container size="lg">
            <Heading as="h2" size="2xl" className="mb-8 text-center">
              Related Articles
            </Heading>
            <Grid cols={{ default: 1, md: 3 }} gap="md">
              {relatedPosts.map((relatedPost) => (
                <Card 
                  key={relatedPost.slug}
                  variant="bordered"
                  className="h-full hover:border-teal/40 transition-colors"
                >
                  <Badge variant="info" size="sm">
                    {blogCategories[relatedPost.category].label}
                  </Badge>
                  <Heading as="h3" size="md" weight="medium" className="mb-3">
                    <Link 
                      href={`/insights/${relatedPost.slug}`}
                      className="hover:text-teal transition-colors"
                    >
                      {relatedPost.title}
                    </Link>
                  </Heading>
                  <p className="text-light-teal text-sm mb-4 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="text-xs text-muted-teal">
                    {relatedPost.readTime}
                  </div>
                </Card>
              ))}
            </Grid>
          </Container>
        </Section>
      )}

      {/* Newsletter CTA */}
      <Section background="gradient" spacing="lg">
        <Container size="md">
          <Card variant="bordered" padding="lg" className="text-center border-white/20">
            <Heading as="h2" size="xl" className="mb-4">
              Get More Insights
            </Heading>
            <p className="text-light-teal mb-6">
              Subscribe to our newsletter for weekly career tips and course updates
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-light-teal/50 focus:outline-none focus:border-teal transition-colors"
                required
              />
              <Button type="submit" variant="primary" size="md">
                Subscribe
              </Button>
            </form>
          </Card>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="navy" spacing="lg">
        <Container size="md">
          <div className="text-center">
            <Heading as="h2" size="2xl" className="mb-6">
              Ready to Start Your Journey?
            </Heading>
            <p className="text-lg text-light-teal mb-8">
              Explore our certificate programs and transform your career
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/programs" size="lg" variant="primary">
                View Programs
              </Button>
              <Button href="/contact" size="lg" variant="outline">
                Get Advice
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
