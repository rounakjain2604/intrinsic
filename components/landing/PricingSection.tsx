"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg className={`w-4 h-4 shrink-0 mt-0.5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

const TIERS = [
  {
    name: "Standard",
    price: "$9.99",
    priceSuffix: "per chapter",
    description: "Unlock individual chapters with lifetime access.",
    dark: false,
    accentBorder: false,
    badge: null,
    features: [
      "Everything in Free",
      "Full chapter content unlocked",
      "Interactive visual diagrams",
      "Lifetime permanent access",
    ],
    cta: { label: "Browse Chapters", href: "/chapters" },
    checkColor: "text-[#5B9E6F]",
  },
  {
    name: "Full Access",
    price: "$49",
    priceSuffix: "all chapters",
    description: "Every chapter, every diagram, every update. One price.",
    dark: true,
    accentBorder: false,
    badge: "BEST VALUE",
    features: [
      "All current chapters included",
      "All future chapters included",
      "Priority access to new content",
      "Interactive practice tools",
      "Lifetime permanent access",
    ],
    cta: { label: "Get Full Access", href: "#" },
    checkColor: "text-[#E8694A]",
  },
  {
    name: "Premium",
    price: "$14.99",
    priceSuffix: "per chapter",
    description: "Complex chapters with extended diagrams and deep dives.",
    dark: false,
    accentBorder: true,
    badge: null,
    features: [
      "Everything in Standard",
      "Extended visual breakdowns",
      "Advanced formula walkthroughs",
      "Derivatives, Portfolio Mgmt, Alt Investments",
    ],
    cta: { label: "View Premium Chapters", href: "/chapters" },
    checkColor: "text-[#D4882A]",
  },
];

export default function PricingSection() {
  return (
    <section className="py-28 md:py-36 px-6 bg-[#F5F1EA] relative" id="pricing">
      <div className="max-w-6xl mx-auto">
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
            No subscriptions. Buy once, keep forever.
          </p>
        </motion.div>

        {/* Three pricing cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {TIERS.map((tier) => (
            <motion.div
              key={tier.name}
              variants={cardVariant}
              className={`rounded-2xl p-8 md:p-10 flex flex-col h-full relative ${tier.dark
                  ? "bg-[#2D2A26] text-[#FAF8F5] shadow-[0_8px_32px_rgba(45,42,38,0.18)]"
                  : tier.accentBorder
                    ? "bg-[#FAF8F5] border border-[#D4882A]/30"
                    : "bg-[#FAF8F5] border border-[#2D2A26]/10"
                }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E8694A] text-white text-[10px] font-[family-name:var(--font-sans)] font-semibold uppercase tracking-[0.15em] py-1 px-4 rounded-full">
                  {tier.badge}
                </div>
              )}

              <h3
                className={`font-[family-name:var(--font-sans)] text-lg font-semibold mb-2 ${tier.dark ? "text-[#FAF8F5]" : "text-[#2D2A26]"
                  }`}
              >
                {tier.name}
              </h3>
              <p
                className={`font-[family-name:var(--font-sans)] text-sm mb-6 leading-relaxed ${tier.dark ? "text-[#FAF8F5]/60" : "text-[#6B6560]"
                  }`}
              >
                {tier.description}
              </p>

              {/* Price */}
              <div
                className={`mb-8 pb-6 flex items-baseline gap-2 ${tier.dark
                    ? "border-b border-[#FAF8F5]/10"
                    : "border-b border-[#2D2A26]/10"
                  }`}
              >
                <span
                  className={`font-[family-name:var(--font-sans)] text-4xl font-bold tracking-tight ${tier.dark ? "text-[#FAF8F5]" : "text-[#2D2A26]"
                    }`}
                >
                  {tier.price}
                </span>
                <span
                  className={`font-[family-name:var(--font-sans)] text-sm ${tier.dark ? "text-[#FAF8F5]/40" : "text-[#A09890]"
                    }`}
                >
                  {tier.priceSuffix}
                </span>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {tier.features.map((feat) => (
                  <li
                    key={feat}
                    className={`flex items-start gap-3 font-[family-name:var(--font-sans)] text-sm ${tier.dark ? "text-[#FAF8F5]/80" : "text-[#2D2A26]"
                      }`}
                  >
                    <CheckIcon className={tier.checkColor} />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={tier.cta.href}
                className={`w-full py-3.5 rounded-xl font-[family-name:var(--font-sans)] font-medium text-sm text-center block transition-colors duration-200 ${tier.dark
                    ? "bg-[#E8694A] text-white hover:bg-[#d45d40] shadow-[0_4px_12px_rgba(232,105,74,0.25)]"
                    : tier.accentBorder
                      ? "border border-[#D4882A]/40 text-[#D4882A] hover:bg-[#D4882A]/5"
                      : "border border-[#2D2A26]/20 text-[#2D2A26] hover:bg-[#2D2A26] hover:text-[#FAF8F5]"
                  }`}
              >
                {tier.cta.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center mt-10 font-[family-name:var(--font-sans)] text-sm text-[#A09890]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          One-time payment. No subscription. Instant access. Not affiliated with CFA Institute.
        </motion.p>
      </div>
    </section>
  );
}
