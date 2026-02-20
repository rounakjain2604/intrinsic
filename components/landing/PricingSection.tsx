import Link from "next/link";

export default function PricingSection() {
    return (
        <section className="py-24 px-6 max-w-3xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-semibold text-[#2D2A26] mb-4">
                    Pay for what you need. Nothing else.
                </h2>
                <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-lg">
                    No subscriptions. No bundles. Buy a chapter, keep it forever.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Free Tier Card */}
                <div className="bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl p-6 shadow-[0_2px_12px_rgba(45,42,38,0.06)] flex flex-col h-full">
                    <h3 className="font-[family-name:var(--font-sans)] text-xl font-semibold text-[#2D2A26] mb-1">
                        Free Forever
                    </h3>
                    <div className="text-3xl font-[family-name:var(--font-serif)] font-bold text-[#2D2A26] mb-6">
                        $0
                    </div>
                    <ul className="space-y-4 mb-8 flex-grow">
                        {[
                            "5 full chapters",
                            "No account required to read",
                            "Visual diagrams included",
                            "Exam callout boxes",
                            "Progress tracking with account",
                        ].map((feature, i) => (
                            <li key={i} className="flex items-start text-[#6B6560] text-sm">
                                <svg
                                    className="w-5 h-5 text-[#5B9E6F] mr-3 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="/chapters"
                        className="block text-center w-full font-[family-name:var(--font-sans)] font-semibold bg-[#E8694A] text-[#FAF8F5] px-6 py-3 rounded-xl shadow-[0_2px_8px_rgba(232,105,74,0.25)] hover:bg-[#D45E40] hover:shadow-[0_4px_16px_rgba(232,105,74,0.35)] transition-all duration-200"
                    >
                        Start Reading Free
                    </Link>
                </div>

                {/* Per Chapter Card */}
                <div className="bg-[#F5F1EA] border border-[#E8694A]/30 rounded-2xl p-6 shadow-[0_2px_12px_rgba(232,105,74,0.08)] flex flex-col h-full">
                    <h3 className="font-[family-name:var(--font-sans)] text-xl font-semibold text-[#2D2A26] mb-1">
                        Per Chapter
                    </h3>
                    <div className="text-3xl font-[family-name:var(--font-serif)] font-bold text-[#2D2A26] mb-1">
                        From $9.99
                    </div>
                    <div className="text-[#6B6560] text-sm mb-6">
                        $14.99 for advanced chapters
                    </div>
                    <ul className="space-y-4 mb-8 flex-grow">
                        {[
                            "Everything in free",
                            "Full chapter content unlocked",
                            "Practice questions",
                            "Lifetime access",
                            "All future updates to that chapter",
                        ].map((feature, i) => (
                            <li key={i} className="flex items-start text-[#6B6560] text-sm">
                                <svg
                                    className="w-5 h-5 text-[#E8694A] mr-3 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="/dashboard"
                        className="block text-center w-full font-[family-name:var(--font-sans)] font-medium border-2 border-[#E8694A] text-[#E8694A] px-6 py-3 rounded-xl hover:bg-[#E8694A]/8 transition-all duration-200"
                    >
                        Browse All Chapters
                    </Link>
                </div>
            </div>

            <p className="font-[family-name:var(--font-sans)] text-xs text-[#A09890] text-center">
                Secure checkout via Lemon Squeezy. One-time payment. Instant access.
            </p>
        </section>
    );
}
