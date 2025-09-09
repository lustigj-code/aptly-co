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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/10">
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
                  className={`relative transition-all duration-200 text-sm font-medium px-4 py-2 rounded-lg min-h-[44px] flex items-center ${
                    isActive
                      ? "text-yellow bg-white/10"
                      : "text-white hover:text-teal hover:bg-white/5"
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
              className="text-white hover:text-teal p-3 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-teal rounded-lg transition-all duration-200"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="lg:hidden bg-navy/95 backdrop-blur-md rounded-lg p-6 mb-6 border border-white/10">
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
                    className={`transition-all duration-200 text-base font-medium px-4 py-3 rounded-lg min-h-[44px] flex items-center ${
                      isActive
                        ? "text-yellow bg-white/10"
                        : "text-white hover:text-teal hover:bg-white/5" 
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