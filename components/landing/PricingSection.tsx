"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg className={`w-5 h-5 shrink-0 mt-0.5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function PricingSection() {
  return (
    <section className="py-32 px-6 bg-[#F5F1EA] relative" id="pricing">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-[family-name:var(--font-sans)] text-xs text-[#E8694A] font-medium uppercase tracking-[0.2em] mb-4 block">
            Pricing
          </span>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-normal text-[#2D2A26] mb-6">
            Pay for what you need.
            <br />
            Nothing else.
          </h2>
          <p className="font-[family-name:var(--font-sans)] text-lg text-[#6B6560] max-w-xl mx-auto">
            No subscriptions. Buy a chapter once, keep it forever.
          </p>
        </motion.div>

        {/* Two cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Free tier */}
          <motion.div
            variants={cardVariant}
            className="bg-[#FAF8F5] rounded-2xl p-10 border border-[#2D2A26]/10 flex flex-col h-full card-hover"
          >
            <h3 className="font-[family-name:var(--font-sans)] text-lg font-semibold text-[#2D2A26] mb-2">
              Free
            </h3>
            <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-sm mb-8 leading-relaxed">
              Start learning immediately. No credit card required.
            </p>
            <div className="mb-8 border-b border-[#2D2A26]/10 pb-8">
              <span className="font-[family-name:var(--font-sans)] text-5xl font-bold text-[#2D2A26] tracking-tight">
                $0
              </span>
            </div>
            <ul className="flex flex-col gap-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-[#2D2A26] font-[family-name:var(--font-sans)] text-sm">
                <CheckIcon className="text-[#5B9E6F]" />
                5 foundational chapters
              </li>
              <li className="flex items-start gap-3 text-[#2D2A26] font-[family-name:var(--font-sans)] text-sm">
                <CheckIcon className="text-[#5B9E6F]" />
                Instant reading access
              </li>
              <li className="flex items-start gap-3 text-[#2D2A26] font-[family-name:var(--font-sans)] text-sm">
                <CheckIcon className="text-[#5B9E6F]" />
                High-res visual diagrams
              </li>
            </ul>
            <Link
              href="/chapters"
              className="w-full py-3.5 rounded-xl border border-[#2D2A26]/20 font-[family-name:var(--font-sans)] font-medium text-[#2D2A26] text-sm hover:bg-[#2D2A26] hover:text-[#FAF8F5] transition-colors duration-200 text-center block"
            >
              Start Learning
            </Link>
          </motion.div>

          {/* Per-Chapter tier — emphasized */}
          <motion.div
            variants={cardVariant}
            className="bg-[#FAF8F5] rounded-2xl p-10 border-2 border-[#E8694A] flex flex-col h-full card-hover relative"
          >
            {/* Popular pill */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E8694A] text-white text-[10px] font-[family-name:var(--font-sans)] font-semibold uppercase tracking-[0.15em] py-1 px-4 rounded-full">
              Popular
            </div>

            <h3 className="font-[family-name:var(--font-sans)] text-lg font-semibold text-[#2D2A26] mb-2">
              Per Chapter
            </h3>
            <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-sm mb-8 leading-relaxed">
              Unlock specific chapters with lifetime access.
            </p>
            <div className="mb-8 border-b border-[#2D2A26]/10 pb-8 flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560] font-medium">From</span>
              <span className="font-[family-name:var(--font-sans)] text-5xl font-bold text-[#2D2A26] tracking-tight">
                $9<span className="text-3xl">.99</span>
              </span>
            </div>
            <ul className="flex flex-col gap-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-[#2D2A26] font-[family-name:var(--font-sans)] text-sm">
                <CheckIcon className="text-[#E8694A]" />
                Everything in free
              </li>
              <li className="flex items-start gap-3 text-[#2D2A26] font-[family-name:var(--font-sans)] text-sm">
                <CheckIcon className="text-[#E8694A]" />
                Full chapter content unlocked
              </li>
              <li className="flex items-start gap-3 text-[#2D2A26] font-[family-name:var(--font-sans)] text-sm">
                <CheckIcon className="text-[#E8694A]" />
                Interactive practice tools
              </li>
              <li className="flex items-start gap-3 text-[#2D2A26] font-[family-name:var(--font-sans)] text-sm">
                <CheckIcon className="text-[#E8694A]" />
                Lifetime permanent access
              </li>
            </ul>
            <Link
              href="/chapters"
              className="w-full py-3.5 rounded-xl bg-[#E8694A] font-[family-name:var(--font-sans)] font-medium text-white text-sm hover:bg-[#d45d40] transition-colors duration-200 text-center block shadow-[0_4px_12px_rgba(232,105,74,0.25)]"
            >
              Browse Chapters
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center mt-10 font-[family-name:var(--font-sans)] text-sm text-[#A09890]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Secure checkout via Lemon Squeezy · One-time purchase, yours forever
        </motion.p>
      </div>
    </section>
  );
}
