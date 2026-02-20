import Link from "next/link";

export default function PricingSection() {
    return (
        <section className="py-32 px-6 bg-white relative" id="membership">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-24">
                    <h2 className="font-[family-name:var(--font-sans)] text-5xl md:text-6xl font-bold text-[#2D2A26] tracking-tighter mb-6">
                        Access the Network.
                    </h2>
                    <p className="font-[family-name:var(--font-sans)] text-xl text-[#6B6560] max-w-2xl mx-auto font-light">
                        Select the tier that aligns with your biological objectives.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">

                    {/* Foundation Tier */}
                    <div className="bg-[#FAF8F5] rounded-3xl p-10 border border-[#2D2A26]/5 flex flex-col h-full shadow-[0_8px_30px_rgba(45,42,38,0.02)]">
                        <h3 className="font-[family-name:var(--font-sans)] text-3xl font-bold text-[#2D2A26] mb-2 tracking-tight">Foundation</h3>
                        <p className="font-[family-name:var(--font-sans)] text-[#6B6560] font-light mb-8 leading-relaxed">Quarterly diagnostic review and standard protocol generation.</p>
                        <div className="mb-8 border-b border-[#2D2A26]/10 pb-8">
                            <span className="font-[family-name:var(--font-sans)] text-5xl font-bold text-[#2D2A26] tracking-tighter">$2,500</span>
                            <span className="text-[#6B6560] ml-1">/yr</span>
                        </div>
                        <ul className="flex flex-col gap-5 mb-12 flex-1">
                            <li className="flex items-start gap-4 text-[#2D2A26] font-light">
                                <svg className="w-5 h-5 text-[#E8694A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Quarterly Blood Panel (40+ markers)
                            </li>
                            <li className="flex items-start gap-4 text-[#2D2A26] font-light">
                                <svg className="w-5 h-5 text-[#E8694A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Standard Supplement Protocol
                            </li>
                            <li className="flex items-start gap-4 text-[#2D2A26] font-light">
                                <svg className="w-5 h-5 text-[#E8694A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Digital Dashboard Access
                            </li>
                        </ul>
                        <Link href="#apply" className="w-full py-4 rounded-xl border border-[#2D2A26]/20 font-medium text-[#2D2A26] hover:bg-[#2D2A26] hover:text-[#FAF8F5] transition-colors text-center">
                            Apply for Foundation
                        </Link>
                    </div>

                    {/* Performance Tier (Emphasized) */}
                    <div className="bg-[#1A1816] rounded-3xl p-10 lg:py-14 border border-[#2D2A26]/20 flex flex-col h-full relative shadow-[0_20px_60px_rgba(45,42,38,0.15)] lg:-mx-4 z-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E8694A] text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md">
                            Most Selected
                        </div>
                        <h3 className="font-[family-name:var(--font-sans)] text-3xl font-bold text-[#FAF8F5] mb-2 tracking-tight">Performance</h3>
                        <p className="font-[family-name:var(--font-sans)] text-[#FAF8F5]/60 font-light mb-8 leading-relaxed">Continuous telemetry and dynamic, algorithmically adjusted prescriptions.</p>
                        <div className="mb-8 border-b border-white/10 pb-8">
                            <span className="font-[family-name:var(--font-sans)] text-6xl font-bold text-[#FAF8F5] tracking-tighter">$12,000</span>
                            <span className="text-[#FAF8F5]/60 ml-1">/yr</span>
                        </div>
                        <ul className="flex flex-col gap-5 mb-12 flex-1">
                            <li className="flex items-start gap-4 text-[#FAF8F5] font-light">
                                <svg className="w-5 h-5 text-[#E8694A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Monthly Advanced Diagnostics
                            </li>
                            <li className="flex items-start gap-4 text-[#FAF8F5] font-light">
                                <svg className="w-5 h-5 text-[#E8694A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Continuous Glucose & Cortisol
                            </li>
                            <li className="flex items-start gap-4 text-[#FAF8F5] font-light">
                                <svg className="w-5 h-5 text-[#E8694A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Epigenetic Sequencing (2x/yr)
                            </li>
                            <li className="flex items-start gap-4 text-[#FAF8F5] font-light">
                                <svg className="w-5 h-5 text-[#E8694A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Personal Clinical Coordinator
                            </li>
                        </ul>
                        <Link href="#apply" className="w-full py-4 rounded-xl bg-[#E8694A] font-medium text-white hover:bg-[#D45E40] transition-colors text-center shadow-[0_8px_20px_rgba(232,105,74,0.3)]">
                            Apply for Performance
                        </Link>
                    </div>

                    {/* Consilium Tier */}
                    <div className="bg-[#FAF8F5] rounded-3xl p-10 border border-[#2D2A26]/5 flex flex-col h-full shadow-[0_8px_30px_rgba(45,42,38,0.02)]">
                        <h3 className="font-[family-name:var(--font-sans)] text-3xl font-bold text-[#2D2A26] mb-2 tracking-tight">Consilium</h3>
                        <p className="font-[family-name:var(--font-sans)] text-[#6B6560] font-light mb-8 leading-relaxed">Bespoke longevity research and dedicated medical board for the ultra-high-net-worth.</p>
                        <div className="mb-8 flex flex-col justify-center border-b border-[#2D2A26]/10 pb-8 h-[106px]">
                            <span className="font-[family-name:var(--font-sans)] text-4xl font-bold text-[#2D2A26] tracking-tighter">Invite Only</span>
                        </div>
                        <ul className="flex flex-col gap-5 mb-12 flex-1">
                            <li className="flex items-start gap-4 text-[#2D2A26] font-light">
                                <svg className="w-5 h-5 text-[#E8694A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Everything in Performance
                            </li>
                            <li className="flex items-start gap-4 text-[#2D2A26] font-light">
                                <svg className="w-5 h-5 text-[#E8694A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                In-home Clinical Visits
                            </li>
                            <li className="flex items-start gap-4 text-[#2D2A26] font-light">
                                <svg className="w-5 h-5 text-[#E8694A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Experimental Therapeutic Access
                            </li>
                            <li className="flex items-start gap-4 text-[#2D2A26] font-light">
                                <svg className="w-5 h-5 text-[#E8694A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Dedicated Medical Director
                            </li>
                        </ul>
                        <Link href="#apply" className="w-full py-4 rounded-xl border border-[#2D2A26]/20 font-medium text-[#2D2A26] hover:bg-[#2D2A26] hover:text-[#FAF8F5] transition-colors text-center">
                            Request Review
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
