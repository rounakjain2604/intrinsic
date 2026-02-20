"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Hand-Drawn Clarity",
    description:
      "Complex cash flows, derivative pricing, and accounting rules mapped out visually — so you see exactly how the mechanics work.",
    illustration: (
      <div className="w-full aspect-[4/3] bg-[#F5F1EA] rounded-2xl flex flex-col p-6 overflow-hidden relative">
        <div className="flex justify-between items-center mb-auto">
          <span className="font-[family-name:var(--font-mono)] text-xs text-[#A09890] uppercase tracking-wider font-medium">
            Diagram.01
          </span>
        </div>
        <div className="mt-auto">
          <div className="w-full h-10 mt-4 flex items-end gap-1.5">
            {[40, 55, 45, 65, 50, 75, 60, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-[#E8694A]/20 rounded-t-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Intuitive Formulas",
    description:
      "Instead of memorizing Greek letters, understand the intuition behind the math. When it clicks, you never forget it.",
    illustration: (
      <div className="w-full aspect-[4/3] bg-[#F5F1EA] rounded-2xl flex flex-col p-6 overflow-hidden relative">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-mono)] text-xs text-[#A09890] uppercase tracking-wider font-medium">
              Formula Mapping
            </span>
            <span className="text-[#2D2A26] font-[family-name:var(--font-sans)] font-medium mt-1 text-sm">
              Valuation Models
            </span>
          </div>
        </div>
        <div className="mt-auto">
          <svg viewBox="0 0 100 40" className="w-full h-16 overflow-visible" preserveAspectRatio="none">
            <path d="M 0 35 Q 20 15 40 25 T 80 8 L 100 12" fill="none" stroke="#4A7FC1" strokeWidth="2" strokeLinecap="round" />
            <path d="M 0 30 Q 25 38 50 20 T 100 25" fill="none" stroke="#E8694A" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    title: "Exam Callouts",
    description:
      "Common traps, calculator shortcuts, and the specific nuances exam writers love to target — all highlighted.",
    illustration: (
      <div className="w-full aspect-[4/3] bg-[#F5F1EA] rounded-2xl flex flex-col items-center justify-center p-6 overflow-hidden relative">
        <svg className="w-10 h-10 text-[#5B9E6F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#A09890] mt-4 tracking-widest uppercase font-medium">
          Testing Tactics
        </span>
      </div>
    ),
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-32 px-6 bg-[#F5F1EA]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col items-start mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-[family-name:var(--font-sans)] text-xs text-[#E8694A] font-medium uppercase tracking-[0.2em] mb-4">
            The Method
          </span>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-normal text-[#2D2A26] leading-tight max-w-3xl">
            Three principles that make
            <br />
            concepts stick.
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.12 }}
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariant}
              className="flex flex-col h-full bg-[#FAF8F5] rounded-2xl p-8 border border-[#2D2A26]/8 card-hover"
            >
              <div className="mb-8">{feature.illustration}</div>
              <h3 className="font-[family-name:var(--font-sans)] text-lg font-semibold text-[#2D2A26] mb-3">
                {feature.title}
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stat */}
        <motion.p
          className="font-[family-name:var(--font-serif)] text-lg italic text-[#6B6560] text-center mt-16 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          &ldquo;Students report 40% faster concept retention with visual notes.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
