import Link from "next/link";

export default function PricingSection() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto relative">

            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[radial-gradient(ellipse_at_center,rgba(232,105,74,0.03),transparent_70%)] pointer-events-none -z-10" />

            <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-start">

                {/* Left Column: Context / Philosophy */}
                <div className="lg:col-span-4 lg:sticky lg:top-32">
                    <p className="font-[family-name:var(--font-sans)] text-xs text-[#A09890] uppercase tracking-widest font-semibold mb-6">
                        Pricing Model
                    </p>
                    <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-semibold text-[#2D2A26] leading-[1.1] mb-6">
                        Pay for what you need.<br />Nothing else.
                    </h2>
                    <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-lg leading-relaxed mb-8">
                        The subscription era is over. We believe in owning your notes. Buy a chapter once, keep it forever.
                    </p>

                    <div className="flex items-center gap-3 text-[#2D2A26] font-[family-name:var(--font-sans)] text-sm font-medium">
                        <svg className="w-5 h-5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Secure checkout via Lemon Squeezy.
                    </div>
                </div>

                {/* Right Column: Pricing Options */}
                <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">

                    {/* Free Tier */}
                    <div className="relative p-8 md:p-10 border border-[#2D2A26]/10 rounded-3xl bg-[#FAF8F5] transition-transform duration-300 hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-16">
                            <h3 className="font-[family-name:var(--font-sans)] text-xl font-medium text-[#6B6560]">
                                Free Forever
                            </h3>
                            <div className="px-3 py-1 bg-[#2D2A26]/5 rounded-full text-xs font-semibold text-[#A09890] tracking-wider uppercase">
                                Included
                            </div>
                        </div>

                        <div className="mb-12">
                            <div className="flex items-baseline gap-1">
                                <span className="font-[family-name:var(--font-serif)] text-6xl md:text-7xl font-semibold text-[#2D2A26] tracking-tight">
                                    $0
                                </span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-12">
                            {[
                                "5 foundational chapters",
                                "Instant reading access",
                                "High-res visual diagrams",
                                "CFA Exam callout boxes",
                            ].map((feature, i) => (
                                <li key={i} className="flex items-start text-[#2D2A26] text-sm font-medium font-[family-name:var(--font-sans)]">
                                    <svg className="w-5 h-5 text-[#2D2A26]/30 mr-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/chapters"
                            className="group flex items-center justify-between w-full font-[family-name:var(--font-sans)] font-medium bg-transparent border border-[#2D2A26]/20 text-[#2D2A26] px-6 py-4 rounded-xl hover:bg-[#2D2A26]/5 transition-all duration-300"
                        >
                            Start Reading Free
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 pl-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                    </div>

                    {/* Premium Tier */}
                    <div className="relative p-8 md:p-10 border border-[#E8694A]/20 rounded-3xl bg-[#F5F1EA] shadow-[0_20px_40px_-15px_rgba(232,105,74,0.1)] transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
                        {/* Soft highlight gradient */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#E8694A]/10 to-transparent blur-3xl pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2" />

                        <div className="flex justify-between items-start mb-16 relative z-10">
                            <h3 className="font-[family-name:var(--font-sans)] text-xl font-medium text-[#E8694A]">
                                Per Chapter
                            </h3>
                        </div>

                        <div className="mb-12 relative z-10">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="font-[family-name:var(--font-sans)] text-lg text-[#6B6560] font-medium">From</span>
                                <span className="font-[family-name:var(--font-serif)] text-6xl md:text-7xl font-semibold text-[#2D2A26] tracking-tight">
                                    $9<span className="text-4xl">.99</span>
                                </span>
                            </div>
                            <p className="font-[family-name:var(--font-sans)] text-[13px] text-[#A09890] uppercase tracking-wider font-semibold">
                                $14.99 for advanced chapters
                            </p>
                        </div>

                        <ul className="space-y-4 mb-12 relative z-10">
                            {[
                                "Everything in free",
                                "Full chapter content unlocked",
                                "Interactive practice tools",
                                "Lifetime permanent access",
                            ].map((feature, i) => (
                                <li key={i} className="flex items-start text-[#2D2A26] text-sm font-medium font-[family-name:var(--font-sans)]">
                                    <svg className="w-5 h-5 text-[#E8694A] mr-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/dashboard"
                            className="group relative z-10 flex items-center justify-between w-full font-[family-name:var(--font-sans)] font-semibold bg-[#E8694A] text-[#FAF8F5] px-6 py-4 rounded-xl shadow-[0_8px_20px_rgba(232,105,74,0.25)] hover:bg-[#D45E40] transition-all duration-300"
                        >
                            Browse All Chapters
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 pl-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
