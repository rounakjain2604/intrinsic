"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    setTimeout(() => {
      console.log("Subscribed email:", email);
      setEmail("");
      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
    }, 800);
  };

  return (
    <section className="py-32 px-6 bg-[#FAF8F5]" id="subscribe">
      <motion.div
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-[#F5F1EA] rounded-2xl border border-[#2D2A26]/10 p-10 md:p-14 text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl font-normal text-[#2D2A26] mb-3">
            Not ready to start?
          </h2>
          <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-base mb-10">
            One email per week. CFA insights, not spam.
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-center gap-3 py-4"
              >
                <svg className="w-5 h-5 text-[#5B9E6F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-[family-name:var(--font-sans)] text-[#2D2A26] font-medium text-sm">
                  You&apos;re in. Check your inbox.
                </span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    disabled={status !== "idle"}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full bg-[#FAF8F5] px-4 py-3.5 font-[family-name:var(--font-sans)] text-sm text-[#2D2A26] placeholder:text-[#A09890] border-b-2 border-[#2D2A26]/15 focus:border-[#E8694A] outline-none transition-colors duration-200 rounded-t-lg disabled:opacity-50"
                    required
                  />
                </div>
                <button
                  disabled={status !== "idle"}
                  type="submit"
                  className="font-[family-name:var(--font-sans)] font-medium text-white text-sm bg-[#E8694A] hover:bg-[#d45d40] rounded-xl px-6 py-3.5 transition-colors duration-200 disabled:opacity-50 whitespace-nowrap shadow-[0_4px_12px_rgba(232,105,74,0.25)]"
                >
                  {status === "submitting" ? (
                    <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
