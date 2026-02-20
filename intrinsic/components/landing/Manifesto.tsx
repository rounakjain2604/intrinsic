"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
  return (
    <section className="py-40 px-6 bg-[#FAF8F5] flex flex-col items-center justify-center relative">
      {/* Heavier paper noise for parchment feel */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Decorative quote marks */}
        <svg
          className="absolute -top-8 -left-8 md:-left-16 w-16 h-16 text-[#E8694A] opacity-[0.12]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        {/* Quote — slow mask reveal */}
        <motion.blockquote
          className="font-[family-name:var(--font-serif)] text-2xl md:text-4xl italic text-[#2D2A26] leading-relaxed"
          initial={{ clipPath: "inset(100% 0 0 0)", y: 30, opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0 0 0)", y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Legacy prep asks &ldquo;What to memorize?&rdquo;
          <br />
          We ask &ldquo;What makes sense?&rdquo;
        </motion.blockquote>

        {/* Decorative end quote */}
        <svg
          className="absolute -bottom-8 -right-8 md:-right-16 w-16 h-16 text-[#E8694A] opacity-[0.12] rotate-180"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        {/* Attribution */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="w-16 h-px bg-[#A09890]/30" />
          <span className="font-[family-name:var(--font-sans)] text-sm text-[#A09890] tracking-wide">
            — The Intrinsic philosophy
          </span>
        </motion.div>

        {/* Supporting text */}
        <motion.p
          className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] max-w-xl mt-10 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Most providers drown you in thousands of pages of bullet points. We use visual models and
          brutal curation to focus exactly on the concepts that matter for passing the exam.
        </motion.p>
      </div>
    </section>
  );
}
