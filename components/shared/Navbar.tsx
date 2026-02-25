"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { href: "#chapters", label: "Chapters" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#2D2A26]/8 py-3"
          : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo — Lora serif wordmark */}
          <Link href="/" className="flex items-center group">
            <span className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[#2D2A26] tracking-tight">
              Intrinsic
            </span>
          </Link>

          {/* Center Links — desktop */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link-hover font-[family-name:var(--font-sans)] text-sm font-medium text-[#6B6560] hover:text-[#2D2A26] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side — desktop */}
          <div className="hidden md:flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="font-[family-name:var(--font-sans)] text-sm font-medium text-[#6B6560] hover:text-[#2D2A26] transition-colors"
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  className="font-[family-name:var(--font-sans)] text-sm font-medium px-5 py-2 rounded-xl bg-[#E8694A] text-white hover:bg-[#d45d40] transition-colors shadow-[0_2px_8px_rgba(232,105,74,0.2)]"
                >
                  Start Free
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-[#2D2A26] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.75px]" : ""
                }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-[#2D2A26] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.75px]" : ""
                }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#FAF8F5] flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="font-[family-name:var(--font-serif)] text-2xl text-[#2D2A26] hover:text-[#E8694A] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="flex flex-col items-center gap-4 mt-4"
              >
                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      className="font-[family-name:var(--font-sans)] text-base text-[#6B6560]"
                    >
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="font-[family-name:var(--font-sans)] font-medium px-8 py-3 rounded-xl bg-[#E8694A] text-white hover:bg-[#d45d40] transition-colors shadow-[0_2px_8px_rgba(232,105,74,0.2)]"
                    >
                      Start Free
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
