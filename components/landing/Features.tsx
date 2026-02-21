"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Card 1: DCF Tree — boxes fill in one-by-one ─── */
function DCFTreeSVG() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const boxVariant = (i: number) => ({
    initial: { opacity: 0, scale: 0.85 },
    animate: isInView ? { opacity: 1, scale: 1 } : {},
    transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" as const },
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 280 180"
      width="100%"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="DCF tree diagram"
    >
      <defs>
        <filter id="feat-sketch" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
        </filter>
      </defs>

      {/* Revenue box */}
      <motion.g {...boxVariant(0)}>
        <rect x="95" y="10" width="90" height="32" rx="6" fill="#FFFDF9" stroke="#2D2A26" strokeWidth="1.5" filter="url(#feat-sketch)" />
        <text x="140" y="31" textAnchor="middle" fill="#2D2A26" fontSize="11" fontFamily="var(--font-sans)" fontWeight="500">Revenue</text>
      </motion.g>

      {/* Arrows from Revenue */}
      <motion.line x1="115" y1="42" x2="65" y2="70" stroke="#2D2A26" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }} />
      <motion.line x1="165" y1="42" x2="215" y2="70" stroke="#2D2A26" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.5, delay: 0.55 }} />

      {/* COGS box */}
      <motion.g {...boxVariant(1)}>
        <rect x="20" y="72" width="90" height="32" rx="6" fill="#FFFDF9" stroke="#2D2A26" strokeWidth="1.5" filter="url(#feat-sketch)" />
        <text x="65" y="93" textAnchor="middle" fill="#6B6560" fontSize="10" fontFamily="var(--font-sans)">– COGS</text>
      </motion.g>

      {/* OPEX box */}
      <motion.g {...boxVariant(2)}>
        <rect x="170" y="72" width="90" height="32" rx="6" fill="#FFFDF9" stroke="#2D2A26" strokeWidth="1.5" filter="url(#feat-sketch)" />
        <text x="215" y="93" textAnchor="middle" fill="#6B6560" fontSize="10" fontFamily="var(--font-sans)">– OpEx</text>
      </motion.g>

      {/* Arrows converge to FCF */}
      <motion.line x1="65" y1="104" x2="115" y2="132" stroke="#2D2A26" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 4"
        initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.5, delay: 1.0 }} />
      <motion.line x1="215" y1="104" x2="165" y2="132" stroke="#2D2A26" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 4"
        initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.5, delay: 1.05 }} />

      {/* FCF box — coral highlighted */}
      <motion.g {...boxVariant(3)}>
        <rect x="95" y="130" width="90" height="38" rx="8" fill="#E8694A" fillOpacity="0.1" stroke="#E8694A" strokeWidth="2" filter="url(#feat-sketch)" />
        <text x="140" y="148" textAnchor="middle" fill="#6B6560" fontSize="9" fontFamily="var(--font-sans)">Free Cash</text>
        <text x="140" y="161" textAnchor="middle" fill="#E8694A" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600">Flow</text>
      </motion.g>
    </svg>
  );
}

/* ─── Card 2: Scanning Grid — crayon squares illuminate in a wave ─── */
function ScannerGridSVG() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => setTick((t) => t + 1), 250);
    return () => clearInterval(interval);
  }, [isInView]);

  const colors = ["#E8694A", "#4A7FC1", "#D4882A", "#5B9E6F", "#7B6BAE"];
  const rows = 4;
  const cols = 6;
  const cellSize = 32;
  const gap = 6;

  return (
    <div ref={ref} className="flex items-center justify-center">
      <svg
        viewBox={`0 0 ${cols * (cellSize + gap) - gap} ${rows * (cellSize + gap) - gap}`}
        width="100%"
        style={{ maxWidth: 240 }}
        role="img"
        aria-label="Topic scanning grid"
      >
        {Array.from({ length: rows * cols }, (_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const x = col * (cellSize + gap);
          const y = row * (cellSize + gap);
          const color = colors[i % colors.length];
          // Wave pattern: phase based on row + col
          const phase = (tick + row + col) % 8;
          const isLit = phase < 3;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              rx={6}
              fill={color}
              opacity={isInView ? (isLit ? 0.7 : 0.12) : 0.08}
              style={{ transition: "opacity 0.4s ease" }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Card 3: Yield Curve Draw — coral path draws on scroll ─── */
function YieldCurveDrawSVG() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <svg
      ref={ref}
      viewBox="0 0 260 140"
      width="100%"
      style={{ maxWidth: 260 }}
      role="img"
      aria-label="Yield curve drawing"
    >
      {/* Axes */}
      <motion.line
        x1="30" y1="110" x2="240" y2="110"
        stroke="#2D2A26" strokeOpacity="0.15" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.line
        x1="30" y1="110" x2="30" y2="20"
        stroke="#2D2A26" strokeOpacity="0.15" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* Axis labels */}
      <text x="135" y="132" textAnchor="middle" fill="#A09890" fontSize="9" fontFamily="var(--font-sans)">Maturity</text>
      <text x="14" y="65" textAnchor="middle" fill="#A09890" fontSize="9" fontFamily="var(--font-sans)" transform="rotate(-90,14,65)">Yield</text>

      {/* The yield curve — draws left to right */}
      <motion.path
        d="M 35 95 Q 60 85, 90 65 Q 120 45, 160 38 Q 200 32, 235 30"
        fill="none"
        stroke="#E8694A"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />

      {/* Data points that appear after the line */}
      {[
        { cx: 55, cy: 88 },
        { cx: 100, cy: 58 },
        { cx: 160, cy: 38 },
        { cx: 220, cy: 31 },
      ].map((pt, i) => (
        <motion.circle
          key={i}
          cx={pt.cx}
          cy={pt.cy}
          r="3.5"
          fill="#E8694A"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6 + i * 0.25, duration: 0.3 }}
        />
      ))}
    </svg>
  );
}

/* ─── Features Section ─── */
const FEATURES = [
  {
    title: "Every concept is drawn, not described.",
    description:
      "Diagrams created specifically for each idea — not stock illustrations. When you see a DCF tree build itself on screen, you remember it.",
    svg: <DCFTreeSVG />,
  },
  {
    title: "Built around what the exam actually tests.",
    description:
      "Every chapter maps directly to CFA Level II Learning Outcome Statements. No padding. No filler. Just the concepts that matter.",
    svg: <ScannerGridSVG />,
  },
  {
    title: "Buy a chapter once. Own it forever.",
    description:
      "No subscriptions. No monthly fees. Unlock the chapters you need, when you need them, for a one-time price that costs less than one bad exam result.",
    svg: <YieldCurveDrawSVG />,
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
    <section id="method" className="py-28 md:py-36 px-6 bg-[#FAF8F5]">
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
              className="flex flex-col h-full bg-[#FAF8F5] rounded-2xl border border-[#2D2A26]/10 overflow-hidden card-hover"
            >
              {/* SVG container */}
              <div className="bg-[#F5F1EA] rounded-xl mx-4 mt-4 p-6 flex items-center justify-center" style={{ minHeight: 180 }}>
                {feature.svg}
              </div>

              {/* Text */}
              <div className="p-6 pt-5 flex flex-col flex-1">
                <h3 className="font-[family-name:var(--font-sans)] text-lg font-semibold text-[#2D2A26] mb-3">
                  {feature.title}
                </h3>
                <p className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
