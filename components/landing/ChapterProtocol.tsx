"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Badge from "@/components/shared/Badge";

/* ─── Card 1: Ethics — rotating concentric rings ─── */
function EthicsRadarSVG() {
    const ref = useRef<SVGSVGElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <svg
            ref={ref}
            viewBox="0 0 240 240"
            width="100%"
            style={{ maxWidth: 240 }}
            role="img"
            aria-label="Ethics standards radar diagram"
        >
            {/* Outer ring — rotates slowly */}
            <motion.circle
                cx="120" cy="120" r="100"
                fill="none" stroke="#4A7FC1" strokeWidth="1.5" strokeDasharray="8 4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.6, rotate: 360 } : {}}
                transition={{
                    opacity: { duration: 0.5 },
                    rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                }}
                style={{ transformOrigin: "120px 120px" }}
            />
            {/* Middle ring — counter-rotates */}
            <motion.circle
                cx="120" cy="120" r="68"
                fill="none" stroke="#4A7FC1" strokeWidth="1.5" strokeOpacity="0.4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1, rotate: -360 } : {}}
                transition={{
                    opacity: { duration: 0.5, delay: 0.2 },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                }}
                style={{ transformOrigin: "120px 120px" }}
            />
            {/* Inner ring */}
            <motion.circle
                cx="120" cy="120" r="36"
                fill="#4A7FC1" fillOpacity="0.06" stroke="#4A7FC1" strokeWidth="1.5" strokeOpacity="0.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
            />
            {/* Center dot */}
            <motion.circle
                cx="120" cy="120" r="4"
                fill="#4A7FC1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.8 } : {}}
                transition={{ delay: 0.6, duration: 0.3 }}
            />
            {/* Labels on rings */}
            {[
                { text: "Professionalism", x: 120, y: 28, delay: 0.5 },
                { text: "Integrity", x: 120, y: 60, delay: 0.7 },
                { text: "Duties", x: 120, y: 92, delay: 0.9 },
            ].map((label) => (
                <motion.text
                    key={label.text}
                    x={label.x} y={label.y}
                    textAnchor="middle"
                    fill="#4A7FC1" fontSize="10" fontFamily="var(--font-sans)" fontWeight="500"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.7 } : {}}
                    transition={{ delay: label.delay, duration: 0.4 }}
                >
                    {label.text}
                </motion.text>
            ))}
        </svg>
    );
}

/* ─── Card 2: Equity DCF — boxes appearing sequentially ─── */
function EquityDCFSVG() {
    const ref = useRef<SVGSVGElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const appear = (i: number) => ({
        initial: { opacity: 0, scale: 0.85 },
        animate: isInView ? { opacity: 1, scale: 1 } : {},
        transition: { duration: 0.5, delay: i * 0.25, ease: "easeOut" as const },
    });

    return (
        <svg
            ref={ref}
            viewBox="0 0 300 220"
            width="100%"
            style={{ maxWidth: 300 }}
            role="img"
            aria-label="DCF valuation tree"
        >
            <defs>
                <filter id="proto-sketch" x="-5%" y="-5%" width="110%" height="110%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
                </filter>
            </defs>

            {/* Inputs row */}
            <motion.g {...appear(0)}>
                <rect x="10" y="10" width="80" height="36" rx="6" fill="#FFFDF9" stroke="#2D2A26" strokeWidth="1.5" filter="url(#proto-sketch)" />
                <text x="50" y="33" textAnchor="middle" fill="#2D2A26" fontSize="10" fontFamily="var(--font-sans)">Revenue</text>
            </motion.g>
            <motion.g {...appear(1)}>
                <rect x="110" y="10" width="80" height="36" rx="6" fill="#FFFDF9" stroke="#2D2A26" strokeWidth="1.5" filter="url(#proto-sketch)" />
                <text x="150" y="33" textAnchor="middle" fill="#2D2A26" fontSize="10" fontFamily="var(--font-sans)">Margins</text>
            </motion.g>
            <motion.g {...appear(2)}>
                <rect x="210" y="10" width="80" height="36" rx="6" fill="#FFFDF9" stroke="#2D2A26" strokeWidth="1.5" filter="url(#proto-sketch)" />
                <text x="250" y="33" textAnchor="middle" fill="#2D2A26" fontSize="10" fontFamily="var(--font-sans)">Growth</text>
            </motion.g>

            {/* Arrows down */}
            {[50, 150, 250].map((x, i) => (
                <motion.line key={i} x1={x} y1="46" x2={x} y2="80" stroke="#2D2A26" strokeOpacity="0.25" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }} />
            ))}

            {/* FCFF box */}
            <motion.g {...appear(3)}>
                <rect x="60" y="82" width="180" height="40" rx="8" fill="#4A7FC1" fillOpacity="0.08" stroke="#4A7FC1" strokeWidth="1.5" filter="url(#proto-sketch)" />
                <text x="150" y="100" textAnchor="middle" fill="#6B6560" fontSize="10" fontFamily="var(--font-sans)">Free Cash Flow</text>
                <text x="150" y="114" textAnchor="middle" fill="#4A7FC1" fontSize="11" fontFamily="var(--font-mono)" fontWeight="500">FCFF₁ ... FCFF₅</text>
            </motion.g>

            {/* Arrow to terminal */}
            <motion.line x1="150" y1="122" x2="150" y2="150" stroke="#2D2A26" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 4"
                initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.4, delay: 1.3 }} />

            {/* Enterprise Value */}
            <motion.g {...appear(4)}>
                <rect x="75" y="152" width="150" height="44" rx="10" fill="#E8694A" fillOpacity="0.1" stroke="#E8694A" strokeWidth="2" filter="url(#proto-sketch)" />
                <text x="150" y="172" textAnchor="middle" fill="#6B6560" fontSize="9" fontFamily="var(--font-sans)">Enterprise</text>
                <text x="150" y="188" textAnchor="middle" fill="#E8694A" fontSize="13" fontFamily="var(--font-mono)" fontWeight="600">Value</text>
            </motion.g>
        </svg>
    );
}

/* ─── Card 3: Options Payoff — call and put curves draw on scroll (dark card) ─── */
function OptionsPayoffSVG() {
    const ref = useRef<SVGSVGElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <svg
            ref={ref}
            viewBox="0 0 280 200"
            width="100%"
            style={{ maxWidth: 280 }}
            role="img"
            aria-label="Option payoff diagram"
        >
            {/* Axes */}
            <motion.line x1="40" y1="160" x2="260" y2="160" stroke="#FAF8F5" strokeOpacity="0.2" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.5 }} />
            <motion.line x1="40" y1="160" x2="40" y2="20" stroke="#FAF8F5" strokeOpacity="0.2" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.5 }} />

            {/* Zero line */}
            <line x1="40" y1="100" x2="260" y2="100" stroke="#FAF8F5" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 4" />

            {/* Axis labels */}
            <text x="150" y="185" textAnchor="middle" fill="#FAF8F5" fillOpacity="0.4" fontSize="9" fontFamily="var(--font-sans)">Stock Price at Expiry</text>
            <text x="18" y="90" textAnchor="middle" fill="#FAF8F5" fillOpacity="0.4" fontSize="9" fontFamily="var(--font-sans)" transform="rotate(-90,18,90)">Payoff</text>

            {/* Strike price marker */}
            <motion.line x1="150" y1="155" x2="150" y2="105" stroke="#FAF8F5" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3"
                initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.3, delay: 0.5 }} />
            <motion.text x="150" y="175" textAnchor="middle" fill="#FAF8F5" fillOpacity="0.5" fontSize="9" fontFamily="var(--font-mono)"
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
                K
            </motion.text>

            {/* Long Call payoff — flat then rising */}
            <motion.path
                d="M 50 100 L 150 100 L 240 35"
                fill="none"
                stroke="#E8694A"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            />

            {/* Long Put payoff — falling then flat */}
            <motion.path
                d="M 50 35 L 150 100 L 240 100"
                fill="none"
                stroke="#4A7FC1"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            />

            {/* Labels */}
            <motion.text x="235" y="28" fill="#E8694A" fontSize="10" fontFamily="var(--font-mono)" fontWeight="500"
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.3, duration: 0.4 }}>
                Call
            </motion.text>
            <motion.text x="55" y="30" fill="#4A7FC1" fontSize="10" fontFamily="var(--font-mono)" fontWeight="500"
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.6, duration: 0.4 }}>
                Put
            </motion.text>
        </svg>
    );
}

/* ─── Protocol Cards Data ─── */
const PROTOCOLS = [
    {
        eyebrow: "Chapter 01",
        title: "Ethics and Professional Standards",
        description:
            "The foundation of CFA. The code, the standards, and how to apply them under exam pressure. Every other chapter builds on this.",
        badge: "free" as const,
        cta: { label: "Read Chapter →", href: "/chapters/ethics", coral: false },
        svg: <EthicsRadarSVG />,
        dark: false,
    },
    {
        eyebrow: "Chapter 04",
        title: "Equity Valuation: Concepts and Basics",
        description:
            "DCF, multiples, and how to think about what a company is actually worth. See the formula breakdown drawn out step-by-step.",
        badge: "free" as const,
        cta: { label: "Read Chapter →", href: "/chapters/equity-valuation", coral: false },
        svg: <EquityDCFSVG />,
        dark: false,
    },
    {
        eyebrow: "Premium Chapter",
        title: "Derivatives: Options, Futures, Swaps",
        description:
            "Payoff diagrams, pricing trees, and Greeks — all hand-drawn and animated. The hardest CFA material, made visual.",
        badge: "premium" as const,
        cta: { label: "Unlock — $14.99", href: "#pricing", coral: true },
        svg: <OptionsPayoffSVG />,
        dark: true,
    },
];

/* ─── ChapterProtocol Section ─── */
export default function ChapterProtocol() {
    return (
        <section id="chapters" className="py-28 md:py-36 px-6 bg-[#FAF8F5]">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="font-[family-name:var(--font-sans)] text-xs text-[#E8694A] font-medium uppercase tracking-[0.2em] mb-4 block">
                        The Chapters
                    </span>
                    <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-5xl font-normal text-[#2D2A26] leading-tight">
                        Built for how your brain
                        <br />
                        actually learns.
                    </h2>
                    <p className="font-[family-name:var(--font-sans)] text-lg text-[#6B6560] mt-4 max-w-lg">
                        Each chapter is a complete visual experience. Here are three to start with.
                    </p>
                </motion.div>

                {/* Protocol cards */}
                <div className="flex flex-col gap-8">
                    {PROTOCOLS.map((proto, i) => (
                        <motion.div
                            key={proto.title}
                            className={`rounded-3xl overflow-hidden border ${proto.dark
                                    ? "bg-[#2D2A26] border-[#FAF8F5]/10 dark-section-noise"
                                    : "bg-[#F5F1EA] border-[#2D2A26]/10"
                                }`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 0.7,
                                delay: i * 0.1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Left — text */}
                                <div className="md:w-5/12 p-8 md:p-12 flex flex-col justify-center relative z-10">
                                    <span
                                        className={`font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] mb-4 block ${proto.dark ? "text-[#E8694A]" : "text-[#A09890]"
                                            }`}
                                    >
                                        {proto.eyebrow}
                                    </span>
                                    <h3
                                        className={`font-[family-name:var(--font-serif)] text-2xl md:text-3xl font-normal mb-4 leading-snug ${proto.dark ? "text-[#FAF8F5]" : "text-[#2D2A26]"
                                            }`}
                                    >
                                        {proto.title}
                                    </h3>
                                    <p
                                        className={`font-[family-name:var(--font-sans)] text-base leading-relaxed mb-6 ${proto.dark
                                                ? "text-[#FAF8F5]/60"
                                                : "text-[#6B6560]"
                                            }`}
                                    >
                                        {proto.description}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <Badge variant={proto.badge} />
                                        <a
                                            href={proto.cta.href}
                                            className={`font-[family-name:var(--font-sans)] text-sm font-medium transition-colors duration-200 ${proto.cta.coral
                                                    ? "inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#E8694A] text-white hover:bg-[#d45d40] shadow-[0_4px_12px_rgba(232,105,74,0.25)]"
                                                    : proto.dark
                                                        ? "text-[#FAF8F5]/80 hover:text-[#FAF8F5]"
                                                        : "text-[#E8694A] hover:text-[#d45d40]"
                                                }`}
                                        >
                                            {proto.cta.label}
                                        </a>
                                    </div>
                                </div>

                                {/* Right — SVG */}
                                <div
                                    className={`md:w-7/12 flex items-center justify-center p-8 md:p-12 min-h-[260px] ${proto.dark ? "" : "bg-[#FAF8F5]"
                                        }`}
                                >
                                    {proto.svg}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
