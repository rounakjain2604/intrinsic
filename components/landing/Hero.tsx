"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── Animated DCF Preview Card ─── */
function HeroDCFCard() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const boxDelay = (i: number) => 0.3 + i * 0.2;
  const arrowDelay = (i: number) => 0.3 + (i + 3) * 0.18;

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#F5F1EA] rounded-2xl border border-[#2D2A26]/10 shadow-[0_8px_40px_rgba(45,42,38,0.08)] overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left — mock chapter metadata */}
        <div className="md:w-5/12 p-6 md:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#2D2A26]/8">
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-[#A09890] uppercase tracking-[0.2em] mb-3">
            Chapter Preview
          </span>
          <h3 className="font-[family-name:var(--font-serif)] text-lg md:text-xl text-[#2D2A26] mb-2 leading-snug">
            Equity Valuation:
            <br />
            DCF Fundamentals
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-[10px] font-[family-name:var(--font-sans)] font-medium text-[#4A7FC1] bg-[#4A7FC1]/10 border border-[#4A7FC1]/20 rounded-full px-2.5 py-0.5">
              Valuation
            </span>
            <span className="text-[10px] font-[family-name:var(--font-sans)] font-medium text-[#7B6BAE] bg-[#7B6BAE]/10 border border-[#7B6BAE]/20 rounded-full px-2.5 py-0.5">
              Cash Flow
            </span>
          </div>
          <span className="font-[family-name:var(--font-sans)] text-xs font-semibold text-[#5B9E6F] bg-[#5B9E6F]/10 border border-[#5B9E6F]/25 rounded-full px-3 py-1 self-start">
            FREE
          </span>
        </div>

        {/* Right — animated DCF diagram */}
        <div className="md:w-7/12 bg-[#FAF8F5] p-4 md:p-6 flex items-center justify-center min-h-[200px] md:min-h-[260px]">
          <svg
            ref={ref}
            viewBox="0 0 420 260"
            width="100%"
            style={{ maxWidth: 420 }}
            role="img"
            aria-label="DCF Valuation diagram preview"
          >
            <defs>
              <filter id="hero-sketch" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
              </filter>
            </defs>

            {/* CF1 box */}
            <motion.g
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: boxDelay(0), ease: "easeOut" }}
            >
              <rect x="30" y="30" width="90" height="44" rx="8" fill="#FFFDF9" stroke="#2D2A26" strokeWidth="1.5" filter="url(#hero-sketch)" />
              <text x="75" y="48" textAnchor="middle" fill="#6B6560" fontSize="10" fontFamily="var(--font-sans)">Year 1</text>
              <text x="75" y="64" textAnchor="middle" fill="#E8694A" fontSize="12" fontFamily="var(--font-mono)" fontWeight="500">CF₁</text>
            </motion.g>

            {/* CF2 box */}
            <motion.g
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: boxDelay(1), ease: "easeOut" }}
            >
              <rect x="165" y="30" width="90" height="44" rx="8" fill="#FFFDF9" stroke="#2D2A26" strokeWidth="1.5" filter="url(#hero-sketch)" />
              <text x="210" y="48" textAnchor="middle" fill="#6B6560" fontSize="10" fontFamily="var(--font-sans)">Year 2</text>
              <text x="210" y="64" textAnchor="middle" fill="#E8694A" fontSize="12" fontFamily="var(--font-mono)" fontWeight="500">CF₂</text>
            </motion.g>

            {/* CF3 box */}
            <motion.g
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: boxDelay(2), ease: "easeOut" }}
            >
              <rect x="300" y="30" width="90" height="44" rx="8" fill="#FFFDF9" stroke="#2D2A26" strokeWidth="1.5" filter="url(#hero-sketch)" />
              <text x="345" y="48" textAnchor="middle" fill="#6B6560" fontSize="10" fontFamily="var(--font-sans)">Year 3</text>
              <text x="345" y="64" textAnchor="middle" fill="#E8694A" fontSize="12" fontFamily="var(--font-mono)" fontWeight="500">CF₃</text>
            </motion.g>

            {/* Arrows down from CF boxes */}
            {[75, 210, 345].map((x, i) => (
              <motion.line
                key={`arrow-${i}`}
                x1={x} y1="74" x2={x} y2="120"
                stroke="#2D2A26"
                strokeOpacity="0.3"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.6, delay: arrowDelay(i), ease: "easeOut" }}
              />
            ))}

            {/* Discount markers */}
            {[75, 210, 345].map((x, i) => (
              <motion.g
                key={`disc-${i}`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: arrowDelay(i) + 0.3, duration: 0.4 }}
              >
                <text x={x} y="105" textAnchor="middle" fill="#4A7FC1" fontSize="9" fontFamily="var(--font-mono)">
                  ÷ (1+r)
                  {i === 0 ? "¹" : i === 1 ? "²" : "³"}
                </text>
              </motion.g>
            ))}

            {/* PV boxes row */}
            {[75, 210, 345].map((x, i) => (
              <motion.g
                key={`pv-${i}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: arrowDelay(i) + 0.5, ease: "easeOut" }}
              >
                <rect x={x - 45} y="120" width="90" height="36" rx="8" fill="#4A7FC1" fillOpacity="0.08" stroke="#4A7FC1" strokeWidth="1.5" filter="url(#hero-sketch)" />
                <text x={x} y="143" textAnchor="middle" fill="#4A7FC1" fontSize="11" fontFamily="var(--font-mono)" fontWeight="500">
                  PV{i + 1}
                </text>
              </motion.g>
            ))}

            {/* Convergence arrows to Enterprise Value */}
            {[75, 210, 345].map((x, i) => (
              <motion.line
                key={`conv-${i}`}
                x1={x} y1="156" x2="210" y2="200"
                stroke="#2D2A26"
                strokeOpacity="0.2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: arrowDelay(2) + 0.8 + i * 0.1, ease: "easeOut" }}
              />
            ))}

            {/* Enterprise Value box — coral highlight */}
            <motion.g
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: arrowDelay(2) + 1.3, ease: "easeOut" }}
            >
              <rect x="130" y="195" width="160" height="44" rx="10" fill="#E8694A" fillOpacity="0.1" stroke="#E8694A" strokeWidth="2" filter="url(#hero-sketch)" />
              <text x="210" y="213" textAnchor="middle" fill="#6B6560" fontSize="10" fontFamily="var(--font-sans)">Enterprise</text>
              <text x="210" y="229" textAnchor="middle" fill="#E8694A" fontSize="13" fontFamily="var(--font-mono)" fontWeight="600">Value</text>
            </motion.g>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero Section ─── */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 bg-[#FAF8F5] overflow-hidden">
      {/* Background Visual: Glowing orbs and discrete grid */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Coral/Orange Glow */}
        <div className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] bg-[#E8694A] rounded-full blur-[120px] opacity-[0.08] mix-blend-multiply" />
        {/* Blue Glow */}
        <div className="absolute top-[20%] -right-[15%] w-[700px] h-[700px] bg-[#4A7FC1] rounded-full blur-[120px] opacity-[0.06] mix-blend-multiply" />
        {/* Purple Glow */}
        <div className="absolute -bottom-[20%] left-[20%] w-[500px] h-[500px] bg-[#7B6BAE] rounded-full blur-[120px] opacity-[0.06] mix-blend-multiply" />

        {/* Subtle dot/grid texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'32\\' height=\\'32\\' viewBox=\\'0 0 32 32\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Ccircle cx=\\'1.5\\' cy=\\'1.5\\' r=\\'1.5\\' fill=\\'rgba(45,42,38,0.06)\\'/%3E%3C/svg%3E')] opacity-70 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent_80%)]" />
      </div>

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        {/* Eyebrow */}
        <motion.span
          className="font-[family-name:var(--font-sans)] text-xs font-medium text-[#A09890] tracking-[0.2em] uppercase mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          CFA Level II · Visual Study Notes
        </motion.span>

        {/* H1 — two lines, italic coral keyword */}
        <motion.h1
          className="font-[family-name:var(--font-serif)] text-5xl md:text-6xl lg:text-7xl font-normal text-[#2D2A26] leading-[1.08] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          CFA material the way it
          <br />
          was meant to be{" "}
          <em className="text-[#E8694A]">seen.</em>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          className="font-[family-name:var(--font-sans)] text-lg md:text-xl text-[#6B6560] max-w-lg mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          Visual chapters that make complex financial theory click.
        </motion.p>

        {/* Two CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="#chapters"
            className="inline-flex items-center justify-center font-[family-name:var(--font-sans)] font-medium text-white bg-[#E8694A] hover:bg-[#d45d40] px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-[0_4px_12px_rgba(232,105,74,0.25)] hover:shadow-[0_8px_24px_rgba(232,105,74,0.3)]"
          >
            Browse Free Chapters
          </Link>
          <a
            href="#method"
            className="inline-flex items-center justify-center font-[family-name:var(--font-sans)] font-medium text-[#2D2A26] border border-[#2D2A26]/20 hover:border-[#2D2A26]/40 hover:bg-[#2D2A26]/[0.03] px-8 py-4 rounded-xl text-base transition-all duration-200"
          >
            How it Works
          </a>
        </motion.div>

        {/* Hero SVG card — settles like paper onto desk */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroDCFCard />
        </motion.div>
      </div>
    </section>
  );
}
