import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0C2A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#7AB8BD] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#F1D632] rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative text-center px-4 max-w-2xl mx-auto">
        {/* 404 with brand colors */}
        <h1 className="text-9xl font-bold mb-8">
          <span className="text-[#7AB8BD]">4</span>
          <span className="text-white">0</span>
          <span className="text-[#F1D632]">4</span>
        </h1>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-xl text-white/70 mb-8">
          Looks like this page took a different learning path. Let&apos;s get you back on track!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-[#7AB8BD] hover:bg-[#6BB3C3] text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105"
          >
            Go Home
          </Link>
          
          <Link
            href="/courses"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105"
          >
            Browse Courses
          </Link>
        </div>
        
        {/* Helpful links */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <Link href="/study-app" className="text-white/60 hover:text-[#7AB8BD] transition-colors">
            Study App
          </Link>
          <Link href="/services" className="text-white/60 hover:text-[#7AB8BD] transition-colors">
            Services
          </Link>
          <Link href="/about" className="text-white/60 hover:text-[#7AB8BD] transition-colors">
            About
          </Link>
          <Link href="/faq" className="text-white/60 hover:text-[#7AB8BD] transition-colors">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}