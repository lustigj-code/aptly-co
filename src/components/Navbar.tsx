"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            {/* Aptly Logo with dynamic contrast adjustment */}
            <Image
              src="/aptly-logo.svg"
              alt="Aptly Logo"
              width={140}
              height={40}
              className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>
          <div className="hidden md:flex space-x-6">
            {navItems.map(({ label, href }) => {
              const isActive =
                (href === "/" && pathname === "/") ||
                (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`transition text-base font-medium px-2 py-1 rounded-md ${
                    isActive
                      ? "text-[#7AB8BD] bg-white/10"
                      : "text-white/80 hover:text-[#7AB8BD] hover:bg-white/10"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white/80 hover:text-[#7AB8BD] p-2"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 mb-4">
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
                    className={`transition text-base font-medium px-3 py-2 rounded-md ${
                      isActive
                        ? "text-[#7AB8BD] bg-white/10"
                        : "text-white/80 hover:text-[#7AB8BD] hover:bg-white/10" 
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