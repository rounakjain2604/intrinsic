"use client";

import { motion } from "framer-motion";

const STATS = [
    { value: "5", label: "free chapters, always" },
    { value: "$9.99", label: "per chapter, once" },
    { value: "300hrs", label: "of material, condensed" },
];

export default function ProofStrip() {
    return (
        <section className="py-16 md:py-20 px-6 bg-[#EDE8DF]">
            <motion.div
                className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                {STATS.map((stat, i) => (
                    <div key={stat.label} className="flex flex-col items-center text-center">
                        {/* Warm divider between stats — hidden on first */}
                        {i > 0 && (
                            <div className="hidden md:block absolute h-12 w-px bg-[#2D2A26]/10 -ml-10 md:-ml-12" style={{ left: "50%", transform: "translateX(-50%)" }} />
                        )}
                        <span className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-normal text-[#E8694A] leading-none mb-2">
                            {stat.value}
                        </span>
                        <span className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560]">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
