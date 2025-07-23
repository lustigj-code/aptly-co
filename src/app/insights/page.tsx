import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    title: "The Future of Digital Learning in 2024",
    excerpt: "Explore the latest trends and technologies shaping the future of education and professional development.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Trends"
  },
  {
    title: "How AI is Transforming Corporate Training",
    excerpt: "Discover how artificial intelligence is revolutionizing the way organizations approach employee development.",
    author: "Michael Chen",
    date: "March 10, 2024",
    readTime: "7 min read",
    category: "Technology"
  },
  {
    title: "Building Effective Learning Cultures",
    excerpt: "Learn the key strategies for creating a workplace culture that prioritizes continuous learning and growth.",
    author: "Emily Rodriguez",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Culture"
  },
  {
    title: "Measuring Learning ROI: A Complete Guide",
    excerpt: "Understand how to measure and demonstrate the return on investment of your learning initiatives.",
    author: "David Kim",
    date: "February 28, 2024",
    readTime: "8 min read",
    category: "Analytics"
  },
  {
    title: "The Rise of Microlearning",
    excerpt: "Why bite-sized learning is becoming the preferred method for skill development in the modern workplace.",
    author: "Lisa Wang",
    date: "February 20, 2024",
    readTime: "4 min read",
    category: "Methodology"
  },
  {
    title: "Remote Learning Best Practices",
    excerpt: "Essential strategies for creating engaging and effective remote learning experiences.",
    author: "Alex Thompson",
    date: "February 15, 2024",
    readTime: "6 min read",
    category: "Remote Work"
  }
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] via-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
            Learning{" "}
            <span className="bg-gradient-to-r from-[#7AB8BD] to-[#F1D632] bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-xl sm:text-2xl font-light text-blue-100/90 max-w-3xl mx-auto mb-8">
            Expert perspectives on the future of education, technology, and professional development
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] to-[#3B3366]">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">
                  Featured
                </span>
                <span className="text-blue-100/60 text-sm">March 15, 2024</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
                The Future of Digital Learning in 2024
              </h2>
              <p className="text-xl text-blue-100/80 mb-6 leading-relaxed">
                Explore the latest trends and technologies shaping the future of education and professional development. From AI-powered personalization to immersive learning experiences, discover what&apos;s next in digital learning.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                  <div>
                    <div className="text-white font-medium">Sarah Johnson</div>
                    <div className="text-blue-100/60 text-sm">5 min read</div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              Latest Articles
            </h2>
            <p className="text-xl font-light text-blue-100/80 max-w-2xl mx-auto">
              Stay updated with the latest insights and trends in learning and development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article, i) => (
              <div
                key={article.title}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                    {article.category}
                  </span>
                  <span className="text-blue-100/60 text-xs">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-blue-200 transition-colors">
                  {article.title}
                </h3>
                <p className="text-blue-100/70 mb-4 text-sm leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                    <span className="text-blue-100/60 text-sm">{article.author}</span>
                  </div>
                  <span className="text-blue-100/60 text-xs">{article.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] to-[#3B3366]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
                Stay Updated
              </h2>
              <p className="text-xl font-light text-blue-100/80 mb-8 max-w-2xl mx-auto">
                Get the latest insights delivered to your inbox. No spam, just valuable content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-100/50 focus:outline-none focus:border-blue-400"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
                Ready to Learn More?
              </h2>
              <p className="text-xl font-light text-blue-100/80 mb-8 max-w-2xl mx-auto">
                Explore our courses and start your learning journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/courses"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Browse Courses
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 