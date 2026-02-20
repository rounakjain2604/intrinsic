"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        {/* Eyebrow with hand-drawn underline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="font-[family-name:var(--font-sans)] text-xs font-medium text-[#A09890] tracking-[0.2em] uppercase">
            CFA Level 2 · Visual Notes
          </span>
          {/* Hand-drawn underline SVG */}
          <motion.svg
            viewBox="0 0 200 8"
            className="w-40 mx-auto mt-2"
          >
            <motion.path
              d="M 4 4 Q 50 2, 100 4 T 196 4"
              fill="none"
              stroke="#E8694A"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            />
          </motion.svg>
        </motion.div>

        {/* Headline — mask reveal */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="font-[family-name:var(--font-serif)] text-5xl md:text-7xl font-normal text-[#2D2A26] leading-[1.1]"
            initial={{ clipPath: "inset(100% 0 0 0)", y: 40 }}
            animate={{ clipPath: "inset(0% 0 0 0)", y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Finally understand
            <br />
            CFA Level 2.
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          className="font-[family-name:var(--font-sans)] text-lg md:text-xl text-[#6B6560] max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Hand-drawn diagrams. Intuitive formulas. Built for visual learners.
        </motion.p>

        {/* Two CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/chapters"
            className="inline-flex items-center justify-center font-[family-name:var(--font-sans)] font-medium text-white bg-[#E8694A] hover:bg-[#d45d40] px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-[0_4px_12px_rgba(232,105,74,0.25)] hover:shadow-[0_8px_24px_rgba(232,105,74,0.3)]"
          >
            Start Learning — Free
          </Link>
          <Link
            href="#chapters"
            className="inline-flex items-center justify-center font-[family-name:var(--font-sans)] font-medium text-[#2D2A26] border border-[#2D2A26]/20 hover:border-[#2D2A26]/40 hover:bg-[#2D2A26]/[0.03] px-8 py-4 rounded-xl text-base transition-all duration-200"
          >
            Browse Chapters
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-[#A09890]/30" />
            <span className="font-[family-name:var(--font-sans)] text-sm text-[#A09890]">
              Trusted by 500+ CFA candidates
            </span>
            <div className="w-10 h-px bg-[#A09890]/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
