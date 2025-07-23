import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Corporate Training",
    description: "Custom learning solutions designed for your organization's specific needs and goals",
    features: ["Custom curriculum design", "Employee skill assessment", "Progress tracking", "Certification programs"],
    icon: "🏢"
  },
  {
    title: "Learning Consulting",
    description: "Expert guidance to optimize your learning strategy and maximize ROI",
    features: ["Learning needs analysis", "Technology recommendations", "Implementation support", "ROI measurement"],
    icon: "📋"
  },
  {
    title: "Content Development",
    description: "High-quality educational content tailored to your audience and objectives",
    features: ["Interactive modules", "Video production", "Assessment creation", "Multimedia content"],
    icon: "✍️"
  },
  {
    title: "Platform Integration",
    description: "Seamless integration with your existing learning management systems",
    features: ["LMS integration", "API development", "Custom dashboards", "Data synchronization"],
    icon: "🔗"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] via-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
            Learning{" "}
            <span className="bg-gradient-to-r from-[#7AB8BD] to-[#F1D632] bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>
          <p className="text-xl sm:text-2xl font-light text-white/90 max-w-3xl mx-auto mb-8">
            Comprehensive digital learning services to transform how your organization educates and develops talent
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-[#7AB8BD] to-[#0A0C2A] rounded-lg text-white font-medium hover:from-[#6BB3C3] hover:to-[#3B3366] transition-all duration-300">
              Get a Quote
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] to-[#3B3366]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              Our Services
            </h2>
            <p className="text-xl font-light text-white/80 max-w-2xl mx-auto">
              End-to-end learning solutions designed for modern organizations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 p-8"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-[#7AB8BD] transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-white/80">
                      <span className="text-blue-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              Our Process
            </h2>
            <p className="text-xl font-light text-white/80 max-w-2xl mx-auto">
              A proven methodology to deliver exceptional learning experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Discovery</h3>
              <p className="text-white/70">
                We analyze your needs and objectives to understand your learning goals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Design</h3>
              <p className="text-white/70">
                Our experts create a customized learning strategy and content plan
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Develop</h3>
              <p className="text-white/70">
                We build and test your learning solution with quality assurance
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Deploy</h3>
              <p className="text-white/70">
                Launch your solution with ongoing support and optimization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] to-[#3B3366]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-xl font-light text-white/80 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how we can help you create impactful learning experiences for your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-[#7AB8BD] to-[#0A0C2A] rounded-lg text-white font-medium hover:from-[#6BB3C3] hover:to-[#3B3366] transition-all duration-300">
                  Contact Us
                </button>
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