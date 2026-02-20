import Link from "next/link";

export default function PricingSection() {
    return (
        <section className="py-32 px-6 bg-white relative" id="membership">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-24">
                    <h2 className="font-[family-name:var(--font-sans)] text-5xl md:text-6xl font-bold text-[#2D2A26] tracking-tighter mb-6">
                        Pay for what you need.<br />Nothing else.
                    </h2>
                    <p className="font-[family-name:var(--font-sans)] text-xl text-[#6B6560] max-w-2xl mx-auto font-light">
                        The subscription era is over. We believe in owning your notes. Buy a chapter once, keep it forever.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">

                    {/* Foundation Tier */}
                    <div className="bg-[#FAF8F5] rounded-3xl p-10 border border-[#2D2A26]/5 flex flex-col h-full shadow-[0_8px_30px_rgba(45,42,38,0.02)]">
                        <h3 className="font-[family-name:var(--font-sans)] text-3xl font-bold text-[#2D2A26] mb-2 tracking-tight">Free Forever</h3>
                        <p className="font-[family-name:var(--font-sans)] text-[#6B6560] font-light mb-8 leading-relaxed">Start learning immediately. No credit card required.</p>
                        <div className="mb-8 border-b border-[#2D2A26]/10 pb-8">
                            <span className="font-[family-name:var(--font-sans)] text-5xl font-bold text-[#2D2A26] tracking-tighter">$0</span>
                        </div>
                        <ul className="flex flex-col gap-5 mb-12 flex-1">
                            <li className="flex items-start gap-4 text-[#2D2A26] font-light">
                                <svg className="w-5 h-5 text-crayon-green shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                5 foundational chapters
                            </li>
                            <li className="flex items-start gap-4 text-[#2D2A26] font-light">
                                <svg className="w-5 h-5 text-crayon-green shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Instant reading access
                            </li>
                            <li className="flex items-start gap-4 text-[#2D2A26] font-light">
                                <svg className="w-5 h-5 text-crayon-green shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                High-res visual diagrams
                            </li>
                        </ul>
                        <Link href="/chapters" className="w-full py-4 rounded-xl border border-[#2D2A26]/20 font-medium text-[#2D2A26] hover:bg-[#2D2A26] hover:text-[#FAF8F5] transition-colors text-center">
                            Start Reading Free
                        </Link>
                    </div>

                    {/* Performance Tier (Emphasized) */}
                    <div className="bg-[#1A1816] rounded-3xl p-10 lg:py-14 border border-[#2D2A26]/20 flex flex-col h-full relative shadow-[0_20px_60px_rgba(45,42,38,0.15)] lg:-mx-4 z-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-crayon-orange text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md">
                            Per Chapter
                        </div>
                        <h3 className="font-[family-name:var(--font-sans)] text-3xl font-bold text-[#FAF8F5] mb-2 tracking-tight">Premium</h3>
                        <p className="font-[family-name:var(--font-sans)] text-[#FAF8F5]/60 font-light mb-8 leading-relaxed">Permanent lifetime access to specific chapters and interactive tools.</p>
                        <div className="mb-8 border-b border-white/10 pb-8 flex items-baseline">
                            <span className="font-[family-name:var(--font-sans)] text-lg text-[#FAF8F5]/60 font-medium mr-2">From</span>
                            <span className="font-[family-name:var(--font-sans)] text-6xl font-bold text-[#FAF8F5] tracking-tighter">$9<span className="text-4xl">.99</span></span>
                        </div>
                        <ul className="flex flex-col gap-5 mb-12 flex-1">
                            <li className="flex items-start gap-4 text-[#FAF8F5] font-light">
                                <svg className="w-5 h-5 text-crayon-orange shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Everything in free
                            </li>
                            <li className="flex items-start gap-4 text-[#FAF8F5] font-light">
                                <svg className="w-5 h-5 text-crayon-orange shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Full chapter content unlocked
                            </li>
                            <li className="flex items-start gap-4 text-[#FAF8F5] font-light">
                                <svg className="w-5 h-5 text-crayon-orange shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Interactive practice tools
                            </li>
                            <li className="flex items-start gap-4 text-[#FAF8F5] font-light">
                                <svg className="w-5 h-5 text-crayon-orange shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Lifetime permanent access
                            </li>
                        </ul>
                        <Link href="/dashboard" className="w-full py-4 rounded-xl bg-crayon-orange font-medium text-white hover:bg-crayon-orange/90 transition-colors text-center shadow-[0_8px_20px_rgba(236,139,49,0.3)]">
                            Browse All Chapters
                        </Link>
                    </div>

                    {/* Consilium Tier */}
                    <div className="bg-[#FAF8F5] rounded-3xl p-10 border border-[#2D2A26]/5 flex flex-col h-full shadow-[0_8px_30px_rgba(45,42,38,0.02)]">
                        <h3 className="font-[family-name:var(--font-sans)] text-3xl font-bold text-[#2D2A26] mb-2 tracking-tight">Full Bundle</h3>
                        <p className="font-[family-name:var(--font-sans)] text-[#6B6560] font-light mb-8 leading-relaxed">Save time and money by unlocking every chapter for the entire CFA Level 2 curriculum.</p>
                        <div className="mb-8 flex flex-col justify-center border-b border-[#2D2A26]/10 pb-8 h-[106px]">
                            <span className="font-[family-name:var(--font-sans)] text-5xl font-bold text-[#2D2A26] tracking-tighter">$249<span className="text-2xl">.99</span></span>
                        </div>
                        <ul className="flex flex-col gap-5 mb-12 flex-1">
                            <li className="flex items-start gap-4 text-[#2D2A26] font-light">
                                <svg className="w-5 h-5 text-crayon-blue shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                All 40+ chapters unlocked instantly
                            </li>
                            <li className="flex items-start gap-4 text-[#2D2A26] font-light">
                                <svg className="w-5 h-5 text-crayon-blue shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Huge discount vs per-chapter
                            </li>
                            <li className="flex items-start gap-4 text-[#2D2A26] font-light">
                                <svg className="w-5 h-5 text-crayon-blue shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                30-day money back guarantee
                            </li>
                        </ul>
                        <Link href="#apply" className="w-full py-4 rounded-xl border border-[#2D2A26]/20 font-medium text-[#2D2A26] hover:bg-[#2D2A26] hover:text-[#FAF8F5] transition-colors text-center">
                            Get the Bundle
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
