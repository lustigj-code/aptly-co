'use client';

import Link from 'next/link';
import { AptlyLogo } from './AptlyLogo';
import { Container, Divider } from '@/design-system';
import { ButtonRipple } from './ui/button-ripple';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook,
  Instagram,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

const footerSections = [
  {
    title: 'Programs',
    links: [
      { label: 'All Certificates', href: '/programs' },
      { label: 'Meta Programs', href: '/programs#meta' },
      { label: 'Google Programs', href: '/programs#google' },
      { label: 'AI Courses', href: '/programs#ai' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Career Guide', href: '/resources/career-guide' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Support', href: '/support' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Accessibility', href: '/accessibility' }
    ]
  }
];

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy">
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)]/5 via-transparent to-[var(--color-muted-teal)]/5" />
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-secondary)', opacity: 0.1 }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-muted-teal)', opacity: 0.1 }} />
      
      <div className="relative">
        {/* Newsletter Section */}
        <div className="border-b backdrop-blur-sm" style={{ borderColor: 'var(--color-border)' }}>
          <Container size="lg">
            <div className="py-12">
              <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                      Stay Updated
                    </h3>
                    <p className="text-secondary">
                      Get the latest updates on new programs, career tips, and exclusive offers.
                    </p>
                  </div>
                  <form className="flex flex-col sm:flex-row gap-2 items-stretch">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 min-h-[48px] px-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-primary placeholder-secondary focus:outline-none focus:border-secondary transition-all duration-200 hover:bg-white/15"
                      required
                    />
                    <button
                      type="submit"
                      className="min-h-[48px] px-8 rounded-full bg-teal text-white font-medium whitespace-nowrap hover:bg-teal/90 transition-all duration-200 flex items-center justify-center"
                    >
                      Subscribe
                      <ChevronRight className="inline-block ml-1 w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container size="lg">
          <div className="py-12">
            {/* Main Footer Content */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
              {/* Logo and Contact Info */}
              <div className="col-span-2 md:col-span-4 lg:col-span-1">
                <AptlyLogo variant="vertical" colorScheme="white" size="sm" />
                <p className="mt-4 text-secondary text-sm leading-relaxed mb-6">
                  Prepare for the jobs of tomorrow, today.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <a href="mailto:info@aptly.co" className="flex items-center gap-2 text-secondary hover:text-secondary transition-colors text-sm group">
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    info@aptly.co
                  </a>
                  <a href="tel:+1234567890" className="flex items-center gap-2 text-secondary hover:text-secondary transition-colors text-sm group">
                    <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    (123) 456-7890
                  </a>
                  <div className="flex items-start gap-2 text-secondary text-sm">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>123 Learning Ave<br />San Francisco, CA 94105</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 mt-6">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-secondary hover:text-primary hover:bg-secondary/30 hover:border-secondary/50 transition-all duration-200 hover:scale-110"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Footer Links */}
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-primary font-bold mb-4 flex items-center gap-2">
                    {section.title}
                    <div className="h-px flex-1 bg-gradient-to-r from-secondary/30 to-transparent" />
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link 
                          href={link.href}
                          className="group text-secondary hover:text-primary transition-all duration-200 text-sm flex items-center gap-1"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {link.label}
                          </span>
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Glass Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-secondary text-sm">
                © {currentYear} Aptly. All rights reserved.
              </p>
              
              {/* Partner Logos with glass cards */}
              <div className="flex items-center gap-4">
                <span className="text-secondary text-sm">Trusted by:</span>
                <div className="flex items-center gap-3">
                  {['Meta', 'Google', 'Coursera'].map((partner) => (
                    <div
                      key={partner}
                      className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer hover:scale-105"
                    >
                      <span className="text-secondary text-sm font-medium">{partner}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Access Bar */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-4 justify-center text-sm">
                <Link href="/sitemap" className="text-secondary hover:text-secondary transition-colors">
                  Sitemap
                </Link>
                <span className="text-white/20">•</span>
                <Link href="/cookie-policy" className="text-secondary hover:text-secondary transition-colors">
                  Cookie Policy
                </Link>
                <span className="text-white/20">•</span>
                <Link href="/accessibility" className="text-secondary hover:text-secondary transition-colors">
                  Accessibility Statement
                </Link>
                <span className="text-white/20">•</span>
                <Link href="/compliance" className="text-secondary hover:text-secondary transition-colors">
                  GDPR Compliance
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}