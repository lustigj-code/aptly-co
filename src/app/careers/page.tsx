import Image from "next/image";
import Link from "next/link";

const jobs = [
  {
    title: "Senior Learning Experience Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Create engaging and effective learning experiences that drive results for our clients."
  },
  {
    title: "Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Build beautiful, responsive interfaces for our learning platform using modern web technologies."
  },
  {
    title: "Learning Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description: "Help our clients achieve their learning goals and maximize the value of our platform."
  },
  {
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    description: "Develop and execute marketing strategies to grow our product adoption and brand awareness."
  }
];

const benefits = [
  "Competitive salary and equity",
  "Flexible remote work options",
  "Health, dental, and vision insurance",
  "Unlimited PTO",
  "Professional development budget",
  "401(k) matching",
  "Home office stipend",
  "Team retreats and events"
];

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] via-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
            Join Our{" "}
            <span className="bg-gradient-to-r from-[#7AB8BD] to-[#F1D632] bg-clip-text text-transparent">
              Team
            </span>
          </h1>
          <p className="text-xl sm:text-2xl font-light text-blue-100/90 max-w-3xl mx-auto mb-8">
            Help us transform the future of learning. We&apos;re looking for passionate individuals who want to make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-[#7AB8BD] to-[#0A0C2A] rounded-lg text-white font-medium hover:from-[#6BB3C3] hover:to-[#3B3366] transition-all duration-300">
              View Open Positions
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300">
              Learn About Culture
            </button>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] to-[#3B3366]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              Open Positions
            </h2>
            <p className="text-xl font-light text-blue-100/80 max-w-2xl mx-auto">
              Find your next opportunity to make an impact in the learning space
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {jobs.map((job, i) => (
              <div
                key={job.title}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2 group-hover:text-blue-200 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-blue-400 font-medium text-sm">
                      {job.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                      {job.type}
                    </span>
                  </div>
                </div>
                <p className="text-blue-100/70 mb-4 text-sm leading-relaxed">
                  {job.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100/60 text-sm">{job.location}</span>
                  <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              Why Work With Us
            </h2>
            <p className="text-xl font-light text-blue-100/80 max-w-2xl mx-auto">
              We believe in taking care of our team so they can do their best work
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={benefit}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="text-2xl mb-3">✨</div>
                <p className="text-blue-100/80 text-sm">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0A0C2A] to-[#3B3366]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
                Our Culture
              </h2>
              <p className="text-lg text-blue-100/80 mb-6 leading-relaxed">
                At Aptly, we believe in fostering a culture of continuous learning, innovation, and collaboration. Our team is passionate about making education accessible to everyone.
              </p>
              <p className="text-lg text-blue-100/80 mb-6 leading-relaxed">
                We value diversity, creativity, and the drive to make a positive impact. Whether you&apos;re a designer, developer, or learning expert, you&apos;ll find a place to grow and contribute meaningfully.
              </p>
              <p className="text-lg text-blue-100/80 leading-relaxed">
                Join us in building the future of learning technology.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7AB8BD]/20 to-[#F1D632]/20 rounded-3xl blur-3xl"></div>
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#3B3366] to-[#0A0C2A]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#7AB8BD]/30 to-[#F1D632]/30 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
                Ready to Join Us?
              </h2>
              <p className="text-xl font-light text-blue-100/80 mb-8 max-w-2xl mx-auto">
                Don&apos;t see the perfect role? Send us your resume and we&apos;ll keep you in mind for future opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-[#7AB8BD] to-[#0A0C2A] rounded-lg text-white font-medium hover:from-[#6BB3C3] hover:to-[#3B3366] transition-all duration-300">
                  Submit Application
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