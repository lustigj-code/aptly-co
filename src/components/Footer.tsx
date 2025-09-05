import Link from 'next/link';
import { AptlyLogo } from './AptlyLogo';
import { Container, Divider } from '@/design-system';

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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-white/10">
      <Container size="lg">
        <div className="py-12">
          {/* Top Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            {/* Logo and Tagline */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <AptlyLogo variant="vertical" colorScheme="white" size="sm" />
              <p className="mt-4 text-light-teal text-sm leading-relaxed">
                Prepare for the jobs of tomorrow, today.
              </p>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-bold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="text-light-teal hover:text-teal transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Divider color="medium" spacing="md" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-light-teal text-sm">
              © {currentYear} Aptly. All rights reserved.
            </p>
            
            {/* Partner Logos */}
            <div className="flex items-center space-x-6">
              <span className="text-light-teal text-sm">Partners:</span>
              <div className="flex items-center space-x-4">
                <span className="text-white/60 text-sm font-medium">Meta</span>
                <span className="text-white/60 text-sm font-medium">Google</span>
                <span className="text-white/60 text-sm font-medium">Coursera</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}