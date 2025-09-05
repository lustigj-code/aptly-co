"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AptlyLogo } from "@/components/AptlyLogo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Study App", href: "/study-app" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-brand">
      <div className="container-width">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <AptlyLogo variant="horizontal" size="md" colorScheme="default" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map(({ label, href }) => {
              const isActive =
                (href === "/" && pathname === "/") ||
                (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative transition-all duration-200 text-sm font-medium px-4 py-2 rounded-brand ${
                    isActive
                      ? "text-white bg-navy"
                      : "text-navy hover:text-teal hover:bg-light-teal"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-navy hover:text-teal p-3 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 rounded-brand transition-all duration-200"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="lg:hidden bg-light-teal rounded-brand p-6 mb-6 shadow-brand">
            <div className="flex flex-col space-y-2">
              {navItems.map(({ label, href }) => {
                const isActive =
                  (href === "/" && pathname === "/") ||
                  (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`transition-all duration-200 text-base font-medium px-4 py-3 rounded-brand ${
                      isActive
                        ? "text-white bg-navy"
                        : "text-navy hover:text-white hover:bg-teal" 
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}