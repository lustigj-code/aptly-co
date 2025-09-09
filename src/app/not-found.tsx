import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/design-system';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative text-center px-4 max-w-2xl mx-auto">
        {/* 404 with brand colors */}
        <h1 className="text-9xl font-bold mb-8">
          <span className="text-secondary">4</span>
          <span className="text-primary">0</span>
          <span className="text-yellow">4</span>
        </h1>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-xl text-secondary mb-8">
          Looks like this page took a different learning path. Let&apos;s get you back on track!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="primary" size="lg" className="btn-primary">
            Go Home
          </Button>
          
          <Button href="/courses" variant="outline" size="lg" className="btn-secondary">
            Browse Courses
          </Button>
        </div>
        
        {/* Helpful links */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <Link href="/study-app" className="text-muted hover:text-secondary transition-colors">
            Study App
          </Link>
          <Link href="/services" className="text-muted hover:text-secondary transition-colors">
            Services
          </Link>
          <Link href="/about" className="text-muted hover:text-secondary transition-colors">
            About
          </Link>
          <Link href="/faq" className="text-muted hover:text-secondary transition-colors">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}