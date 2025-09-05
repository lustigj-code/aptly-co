import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders footer with company name', () => {
    render(<Footer />);
    
    const companyName = screen.getByText('Aptly');
    expect(companyName).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Footer />);
    
    const links = [
      'Home',
      'Courses',
      'Study App',
      'About',
      'FAQ',
      'Privacy Policy',
      'Terms of Service'
    ];
    
    links.forEach(linkText => {
      const link = screen.getByText(linkText);
      expect(link).toBeInTheDocument();
    });
  });

  it('displays current year in copyright', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    const copyright = screen.getByText(`© ${currentYear} Aptly. All rights reserved.`);
    expect(copyright).toBeInTheDocument();
  });

  it('has correct href attributes for legal links', () => {
    render(<Footer />);
    
    const privacyLink = screen.getByText('Privacy Policy').closest('a');
    expect(privacyLink).toHaveAttribute('href', '/privacy');
    
    const termsLink = screen.getByText('Terms of Service').closest('a');
    expect(termsLink).toHaveAttribute('href', '/terms');
  });
});