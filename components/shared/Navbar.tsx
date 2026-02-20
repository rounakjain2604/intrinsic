"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[#FAF8F5]/80 backdrop-blur-xl border-b border-[#2D2A26]/10 py-4 shadow-[0_4px_30px_rgba(45,42,38,0.03)]"
          : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-[family-name:var(--font-serif)] text-2xl font-bold text-[#2D2A26] tracking-tight group-hover:opacity-80 transition-opacity">
              Intrinsic
            </span>
          </Link>
        </div>

        {/* Center Navigation Links (Hidden on mobile for now) */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/chapters"
            className="font-[family-name:var(--font-sans)] text-sm font-medium text-[#6B6560] hover:text-[#2D2A26] transition-colors"
          >
            Chapters
          </Link>
          <Link
            href="/pricing"
            className="font-[family-name:var(--font-sans)] text-sm font-medium text-[#6B6560] hover:text-[#2D2A26] transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="font-[family-name:var(--font-sans)] text-sm font-medium text-[#6B6560] hover:text-[#2D2A26] transition-colors"
          >
            About
          </Link>
        </div>

        {/* Right CTA Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            href="/sign-in"
            className="hidden sm:block font-[family-name:var(--font-sans)] text-sm font-medium text-[#6B6560] hover:text-[#2D2A26] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="font-[family-name:var(--font-sans)] text-sm font-medium bg-[#E8694A] text-[#FAF8F5] px-5 py-2.5 rounded-lg hover:bg-[#D45E40] transition-colors shadow-sm hover:shadow"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
