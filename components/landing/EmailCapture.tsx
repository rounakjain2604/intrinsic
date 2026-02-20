"use client";

import { useState } from "react";

export default function EmailCapture() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Subscribed email:", email);
        setEmail("");
    };

    return (
        <div className="max-w-xl mx-auto text-center px-6">
            <div className="bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl p-8 shadow-[0_2px_12px_rgba(45,42,38,0.06)]">
                <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[#2D2A26] mb-2">
                    Not ready to start? Get free study tips.
                </h2>
                <p className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560] mb-6">
                    One email per week. CFA insights. No spam, ever.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="flex-grow rounded-xl border border-[#2D2A26]/10 bg-white/60 px-4 py-3 text-sm placeholder:text-[#A09890] text-[#2D2A26] outline-none focus:ring-2 focus:ring-[#E8694A]/50 transition-all font-[family-name:var(--font-sans)]"
                    />
                    <button
                        type="submit"
                        className="font-[family-name:var(--font-sans)] font-semibold bg-[#E8694A] text-[#FAF8F5] px-6 py-3 rounded-xl hover:bg-[#D45E40] transition-all duration-200 shadow-[0_2px_8px_rgba(232,105,74,0.15)] whitespace-nowrap"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
}
