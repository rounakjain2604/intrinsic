"use client";

import { motion } from "framer-motion";

export default function ManifestoBand() {
    return (
        <section className="relative py-24 md:py-32 px-6 bg-[#2D2A26] dark-section-noise overflow-hidden">
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10">
                {/* Pull quote — Lora italic, cream */}
                <motion.blockquote
                    className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl lg:text-4xl italic text-[#FAF8F5] leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    &ldquo;Most CFA material treats your brain like a database.
                    <br className="hidden md:block" />
                    We treat it like a mind.&rdquo;
                </motion.blockquote>

                {/* Supporting line — muted cream */}
                <motion.p
                    className="font-[family-name:var(--font-sans)] text-sm md:text-base mt-8"
                    style={{ color: "rgba(250, 248, 245, 0.55)" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Visual chapters. Hand-drawn diagrams. Concepts that actually stick.
                </motion.p>
            </div>
        </section>
    );
}
