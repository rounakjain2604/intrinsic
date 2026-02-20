export default function Features() {
    return (
        <section id="features" className="py-32 px-6 bg-[#FAF8F5]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-start mb-20">
                    <span className="font-[family-name:var(--font-sans)] text-sm text-crayon-orange font-bold uppercase tracking-widest mb-4">
                        The Precision Stack
                    </span>
                    <h2 className="font-[family-name:var(--font-sans)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D2A26] leading-tight max-w-3xl tracking-tighter">
                        Visual learning for the top 10%.
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {/* Card 1: Hand-Drawn Diagrams */}
                    <div className="flex flex-col h-full bg-white rounded-3xl p-8 border border-[#2D2A26]/5 shadow-[0_8px_30px_rgba(45,42,38,0.03)] hover:shadow-[0_20px_40px_rgba(45,42,38,0.08)] transition-all duration-500">
                        <div className="w-full aspect-[4/3] bg-[#F5F1EA] rounded-2xl mb-10 flex flex-col p-6 overflow-hidden relative">
                            <div className="flex justify-between items-center mb-auto">
                                <span className="font-[family-name:var(--font-mono)] text-xs text-[#A09890] uppercase tracking-wider font-semibold">Diagram.01</span>
                                <div className="w-2 h-2 rounded-full bg-crayon-red animate-pulse" />
                            </div>
                            <div className="mt-auto">
                                <div className="text-[#A09890] text-sm mb-1 font-medium">Concept Retention</div>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-[family-name:var(--font-sans)] text-5xl font-bold text-[#2D2A26] tracking-tighter">10x</span>
                                    <span className="font-[family-name:var(--font-sans)] text-sm font-semibold text-[#5B9E6F]">Faster</span>
                                </div>
                                <div className="w-full h-10 mt-6 flex items-end gap-1.5">
                                    {[40, 50, 45, 60, 55, 70, 65, 80].map((h, i) => (
                                        <div key={i} className="flex-1 bg-[#2D2A26]/10 rounded-t-sm transition-all hover:bg-crayon-red/40" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <h3 className="font-[family-name:var(--font-sans)] text-2xl font-bold text-[#2D2A26] mb-3">Hand-Drawn Clarity</h3>
                        <p className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-relaxed mb-2 font-light">
                            We map out complex cash flows, derivative pricing, and accounting rules so you can see exactly how the mechanics work.
                        </p>
                    </div>

                    {/* Card 2: Intutitive Formulas */}
                    <div className="flex flex-col h-full bg-white rounded-3xl p-8 border border-[#2D2A26]/5 shadow-[0_8px_30px_rgba(45,42,38,0.03)] hover:shadow-[0_20px_40px_rgba(45,42,38,0.08)] transition-all duration-500">
                        <div className="w-full aspect-[4/3] bg-[#FAF8F5] border border-[#2D2A26]/5 rounded-2xl mb-10 flex flex-col p-6 overflow-hidden relative shadow-inner">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="flex flex-col">
                                    <span className="font-[family-name:var(--font-mono)] text-xs text-[#A09890] uppercase tracking-wider font-semibold">Formula Mapping</span>
                                    <span className="text-[#2D2A26] font-semibold mt-1">Valuation Models</span>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden px-6 pb-6">
                                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                    <path d="M 0 40 Q 20 20 40 30 T 80 10 L 100 15" fill="none" stroke="#2D2A26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M 0 35 Q 25 45 50 25 T 100 30" fill="none" stroke="currentColor" className="text-crayon-blue" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="font-[family-name:var(--font-sans)] text-2xl font-bold text-[#2D2A26] mb-3">Intuitive Formulas</h3>
                        <p className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-relaxed mb-2 font-light">
                            Instead of memorizing a sea of Greek letters, understand the intuition behind the math. When it clicks, you never forget it.
                        </p>
                    </div>

                    {/* Card 3: Exam Callouts */}
                    <div className="flex flex-col h-full bg-white rounded-3xl p-8 border border-[#2D2A26]/5 shadow-[0_8px_30px_rgba(45,42,38,0.03)] hover:shadow-[0_20px_40px_rgba(45,42,38,0.08)] transition-all duration-500">
                        <div className="w-full aspect-[4/3] bg-[#1A1816] rounded-2xl mb-10 flex flex-col p-6 overflow-hidden relative justify-center items-center">
                            <div className="absolute inset-0 bg-gradient-radial from-crayon-green/20 to-transparent pointer-events-none" />
                            <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center relative">
                                <div className="absolute inset-2 rounded-full border border-crayon-green/30 border-t-crayon-green animate-spin" style={{ animationDuration: '3s' }} />
                                <svg className="w-8 h-8 text-[#FAF8F5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="font-[family-name:var(--font-sans)] text-[11px] text-[#FAF8F5]/60 mt-6 tracking-widest uppercase font-semibold">Testing Tactics</div>
                        </div>
                        <h3 className="font-[family-name:var(--font-sans)] text-2xl font-bold text-[#2D2A26] mb-3">Exam Callouts</h3>
                        <p className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-relaxed mb-2 font-light">
                            We highlight common traps, calculator shortcuts, and the specific nuances the exam writers love to target on exam day.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
