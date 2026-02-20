"use client";

import { useState } from "react";

export default function EmailCapture() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("submitting");
        // Simulate network delay
        setTimeout(() => {
            console.log("Subscribed email:", email);
            setEmail("");
            setStatus("success");

            // Reset success state after a while
            setTimeout(() => setStatus("idle"), 3000);
        }, 800);
    };

    return (
        <div className="max-w-7xl mx-auto px-6">

            <div className="relative rounded-3xl overflow-hidden bg-[#2D2A26] border border-[#2D2A26] shadow-2xl">
                {/* Soft background glow */}
                <div className="absolute inset-0 bg-gradient-radial from-crayon-orange/15 to-transparent pointer-events-none" />

                <div className="relative z-10 p-10 md:p-16 grid lg:grid-cols-2 gap-12 items-center">

                    <div className="max-w-md">
                        <h2 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-[#FAF8F5] leading-tight mb-4">
                            Not ready to commit?
                        </h2>
                        <p className="font-[family-name:var(--font-sans)] text-[#A09890] text-lg leading-relaxed">
                            Drop your email. We'll send you one free hand-drawn visual note every week. No spam, just pure CFA insights.
                        </p>
                    </div>

                    <div className="w-full max-w-lg lg:ml-auto">
                        <form onSubmit={handleSubmit} className="relative group/form">
                            <div aria-hidden="true" className="absolute -inset-1 bg-gradient-to-r from-crayon-orange/30 to-crayon-blue/30 rounded-2xl blur-lg opacity-0 transition duration-1000 group-hover/form:opacity-100" />

                            <div className="relative flex flex-col sm:flex-row gap-3 bg-[#1A1816]/80 p-2 rounded-2xl border border-white/10 backdrop-blur-xl">
                                <input
                                    type="email"
                                    value={email}
                                    disabled={status !== "idle"}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full flex-grow bg-transparent px-4 py-3 text-[#FAF8F5] placeholder:text-[#6B6560] font-[family-name:var(--font-sans)] text-base outline-none focus:ring-0 disabled:opacity-50"
                                    required
                                />

                                <button
                                    disabled={status !== "idle"}
                                    type="submit"
                                    className="relative overflow-hidden font-[family-name:var(--font-sans)] font-medium text-[#FAF8F5] bg-white/10 hover:bg-white/20 border border-white/5 rounded-xl px-8 py-3 transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
                                >
                                    <span className={`transition-transform duration-300 inline-block ${status === 'submitting' ? '-translate-y-12 opacity-0' : status === 'success' ? 'translate-y-12 opacity-0' : 'translate-y-0 opacity-100'}`}>
                                        Subscribe
                                    </span>

                                    <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${status === 'submitting' ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                                        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    </span>

                                    <span className={`absolute inset-0 flex items-center justify-center text-crayon-green transition-transform duration-300 ${status === 'success' ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
