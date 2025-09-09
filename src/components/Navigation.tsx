"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AptlyLogo } from './AptlyLogo';
import { Button } from '@/design-system';
import { ThemeToggle } from './theme-toggle';
import { Menu, X, ChevronDown } from 'lucide-react';
import '@/styles/animations.css';

const navItems = [
  { label: 'Programs', href: '/programs' },
  { label: 'For Business', href: '/business' },
  { label: 'Success Stories', href: '/success' },
  { label: 'About', href: '/about' }
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass shadow-elegant' : 'bg-navy/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <AptlyLogo variant="horizontal" colorScheme="white" size="sm" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative text-white hover:text-teal transition-all font-medium group min-h-[44px] flex items-center ${
                    pathname === item.href ? 'text-teal' : ''
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-teal transform origin-left transition-transform duration-300 ${
                    pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Desktop CTA and Theme Toggle */}
            <div className="hidden lg:flex items-center space-x-4">
              <ThemeToggle />
              <Button href="/enroll" variant="secondary" size="md" className="btn-secondary">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-teal transition-all duration-200 hover:scale-110"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`fixed top-20 left-0 right-0 z-40 lg:hidden glass border-t border-secondary/20 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
        >
            <div className="px-6 py-8 space-y-6">
              {navItems.map((item, idx) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 min-h-[44px] flex items-center text-primary hover:text-secondary hover:translate-x-2 transition-all font-medium text-lg animate-[slideInLeft_0.3s_ease-out_${idx * 0.1}s_both] ${
                    pathname === item.href ? 'text-secondary' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-secondary/20 animate-[fadeInUp_0.5s_ease-out_0.4s_both]">
                <Button href="/enroll" variant="secondary" size="md" className="w-full btn-secondary">
                  Get Started
                </Button>
              </div>
            </div>
        </div>
      )}
    </>
  );
}