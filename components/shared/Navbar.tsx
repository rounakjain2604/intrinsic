"use client";

import Link from "next/link";
import Image from "next/image";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#2D2A26]/10 py-3 shadow-sm"
          : "bg-[#FAF8F5]/60 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="Intrinsic"
            width={32}
            height={32}
            className="object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-[family-name:var(--font-sans)] text-xl font-bold tracking-tighter text-[#2D2A26]">
            INTRINSIC
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-10">
          <a
            href="#chapters"
            className="font-[family-name:var(--font-sans)] text-sm font-medium text-[#6B6560] hover:text-[#2D2A26] transition-colors"
          >
            Chapters
          </a>
          <a
            href="#pricing"
            className="font-[family-name:var(--font-sans)] text-sm font-medium text-[#6B6560] hover:text-[#2D2A26] transition-colors"
          >
            Pricing
          </a>
        </div>

        {/* CTA */}
        <a
          href="#chapters"
          className="font-[family-name:var(--font-sans)] text-sm font-medium px-5 py-2 rounded-full bg-[#E8694A] text-white hover:bg-[#d45d40] transition-colors shadow-[0_2px_8px_rgba(232,105,74,0.2)]"
        >
          Start Learning
        </a>
      </div>
    </nav>
  );
}
