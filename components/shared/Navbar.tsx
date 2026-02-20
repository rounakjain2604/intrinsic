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
        ? "bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#2D2A26]/10 py-4 shadow-sm"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center group">
            <span className={`font-[family-name:var(--font-sans)] text-2xl font-bold tracking-tighter transition-colors ${scrolled ? "text-[#2D2A26]" : "text-[#FAF8F5]"}`}>
              INTRINSIC
            </span>
          </Link>
        </div>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center space-x-12">
          <Link
            href="#philosophy"
            className={`font-[family-name:var(--font-sans)] text-sm font-medium transition-colors ${scrolled ? "text-[#6B6560] hover:text-[#2D2A26]" : "text-[#FAF8F5]/70 hover:text-[#FAF8F5]"}`}
          >
            Philosophy
          </Link>
          <Link
            href="#protocol"
            className={`font-[family-name:var(--font-sans)] text-sm font-medium transition-colors ${scrolled ? "text-[#6B6560] hover:text-[#2D2A26]" : "text-[#FAF8F5]/70 hover:text-[#FAF8F5]"}`}
          >
            Protocol
          </Link>
          <Link
            href="#membership"
            className={`font-[family-name:var(--font-sans)] text-sm font-medium transition-colors ${scrolled ? "text-[#6B6560] hover:text-[#2D2A26]" : "text-[#FAF8F5]/70 hover:text-[#FAF8F5]"}`}
          >
            Membership
          </Link>
        </div>

        {/* Right CTA Buttons */}
        <div className="flex items-center">
          <Link
            href="/assessment"
            className={`font-[family-name:var(--font-sans)] text-sm font-medium px-6 py-2.5 rounded-full transition-all ${scrolled
                ? "bg-[#2D2A26] text-[#FAF8F5] hover:bg-[#1A1816] shadow-sm"
                : "bg-[#FAF8F5] text-[#2D2A26] hover:bg-white"
              }`}
          >
            Begin Assessment
          </Link>
        </div>
      </div>
    </nav>
  );
}
