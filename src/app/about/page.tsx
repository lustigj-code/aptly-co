import Image from "next/image";
import Link from "next/link";

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    description: "Former learning director with 15+ years in digital education",
    image: "https://uploads.teachablecdn.com/attachments/5z8z0OfkRZCllESTK927_Partners+%281%29.png"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    description: "Tech leader passionate about making learning accessible to everyone",
    image: "https://uploads.teachablecdn.com/attachments/5z8z0OfkRZCllESTK927_Partners+%281%29.png"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Learning Design",
    description: "Expert in creating engaging educational experiences",
    image: "https://uploads.teachablecdn.com/attachments/5z8z0OfkRZCllESTK927_Partners+%281%29.png"
  }
];

const stats = [
  { number: "10K+", label: "Learners" },
  { number: "50+", label: "Organizations" },
  { number: "95%", label: "Completion Rate" },
  { number: "4.8/5", label: "Satisfaction Score" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] via-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-[#7AB8BD] to-[#F1D632] bg-clip-text text-transparent">
              Aptly
            </span>
          </h1>
          <p className="text-xl sm:text-2xl font-light text-blue-100/90 max-w-3xl mx-auto mb-8">
            We&apos;re on a mission to make learning accessible, engaging, and effective for everyone
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] to-[#3B3366]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
                Our Story
              </h2>
              <p className="text-lg text-blue-100/80 mb-6 leading-relaxed">
                Founded in 2020, Aptly emerged from a simple belief: learning should be accessible, engaging, and truly effective. Our founders experienced firsthand the limitations of traditional learning platforms and set out to create something better.
              </p>
              <p className="text-lg text-blue-100/80 mb-6 leading-relaxed">
                Today, we partner with leading organizations to deliver cutting-edge learning experiences that not only educate but inspire. Our platform combines the latest in educational technology with proven learning methodologies to create experiences that stick.
              </p>
              <p className="text-lg text-blue-100/80 leading-relaxed">
                We&apos;re proud to have helped thousands of learners achieve their goals and organizations transform their learning culture.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <Image
                  src="https://uploads.teachablecdn.com/attachments/5z8z0OfkRZCllESTK927_Partners+%281%29.png"
                  alt="Aptly Team"
                  width={300}
                  height={300}
                  className="object-contain h-48 w-auto opacity-60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              Our Impact
            </h2>
            <p className="text-xl font-light text-blue-100/80 max-w-2xl mx-auto">
              Numbers that tell our story of growth and success
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-light text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100/70 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] to-[#3B3366]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl font-light text-blue-100/80 max-w-2xl mx-auto">
              The passionate people behind Aptly&apos;s mission
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 p-6 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={60}
                    height={60}
                    className="object-contain h-12 w-auto opacity-60"
                  />
                </div>
                <h3 className="text-xl font-medium text-white mb-2 group-hover:text-blue-200 transition-colors">
                  {member.name}
                </h3>
                <p className="text-blue-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-blue-100/70 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              Our Values
            </h2>
            <p className="text-xl font-light text-blue-100/80 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-medium text-white mb-3">Accessibility</h3>
              <p className="text-blue-100/70">
                We believe learning should be available to everyone, regardless of background or circumstances.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-medium text-white mb-3">Innovation</h3>
              <p className="text-blue-100/70">
                We constantly push the boundaries of what&apos;s possible in digital learning and education.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-medium text-white mb-3">Partnership</h3>
              <p className="text-blue-100/70">
                We work closely with our clients and learners to create solutions that truly meet their needs.
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
                Join Our Mission
              </h2>
              <p className="text-xl font-light text-blue-100/80 mb-8 max-w-2xl mx-auto">
                Ready to be part of the future of learning? Let&apos;s work together to create something amazing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-[#7AB8BD] to-[#0A0C2A] rounded-lg text-white font-medium hover:from-[#6BB3C3] hover:to-[#3B3366] transition-all duration-300">
                  Get in Touch
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