export default function Features() {
    return (
        <section id="features" className="py-32 px-6 bg-[#FAF8F5]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-start mb-20">
                    <span className="font-[family-name:var(--font-sans)] text-sm text-[#E8694A] font-bold uppercase tracking-widest mb-4">
                        The Precision Stack
                    </span>
                    <h2 className="font-[family-name:var(--font-sans)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D2A26] leading-tight max-w-3xl tracking-tighter">
                        Biological analysis for the 0.1%.
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {/* Card 1: Epigenetic Age */}
                    <div className="flex flex-col h-full bg-white rounded-3xl p-8 border border-[#2D2A26]/5 shadow-[0_8px_30px_rgba(45,42,38,0.03)] hover:shadow-[0_20px_40px_rgba(45,42,38,0.08)] transition-all duration-500">
                        <div className="w-full aspect-[4/3] bg-[#F5F1EA] rounded-2xl mb-10 flex flex-col p-6 overflow-hidden relative">
                            <div className="flex justify-between items-center mb-auto">
                                <span className="font-[family-name:var(--font-mono)] text-xs text-[#A09890] uppercase tracking-wider font-semibold">Metric.01</span>
                                <div className="w-2 h-2 rounded-full bg-[#E8694A] animate-pulse" />
                            </div>
                            <div className="mt-auto">
                                <div className="text-[#A09890] text-sm mb-1 font-medium">Current True Age</div>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-[family-name:var(--font-sans)] text-5xl font-bold text-[#2D2A26] tracking-tighter">31.4</span>
                                    <span className="font-[family-name:var(--font-sans)] text-sm font-semibold text-[#5B9E6F]">-4.2 yrs</span>
                                </div>
                                <div className="w-full h-10 mt-6 flex items-end gap-1.5">
                                    {[40, 50, 45, 60, 55, 70, 65, 80].map((h, i) => (
                                        <div key={i} className="flex-1 bg-[#2D2A26]/10 rounded-t-sm transition-all hover:bg-[#E8694A]/40" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <h3 className="font-[family-name:var(--font-sans)] text-2xl font-bold text-[#2D2A26] mb-3">Epigenetic Sequencing</h3>
                        <p className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-relaxed mb-2 font-light">
                            We track methylation patterns across 3.2 billion base pairs to uncover the true rate of your biological aging.
                        </p>
                    </div>

                    {/* Card 2: Live Feed */}
                    <div className="flex flex-col h-full bg-white rounded-3xl p-8 border border-[#2D2A26]/5 shadow-[0_8px_30px_rgba(45,42,38,0.03)] hover:shadow-[0_20px_40px_rgba(45,42,38,0.08)] transition-all duration-500">
                        <div className="w-full aspect-[4/3] bg-[#FAF8F5] border border-[#2D2A26]/5 rounded-2xl mb-10 flex flex-col p-6 overflow-hidden relative shadow-inner">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="flex flex-col">
                                    <span className="font-[family-name:var(--font-mono)] text-xs text-[#A09890] uppercase tracking-wider font-semibold">Live Telemetry</span>
                                    <span className="text-[#2D2A26] font-semibold mt-1">Glucose & Cortisol</span>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden px-6 pb-6">
                                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                    <path d="M 0 40 Q 20 20 40 30 T 80 10 L 100 15" fill="none" stroke="#2D2A26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M 0 35 Q 25 45 50 25 T 100 30" fill="none" stroke="#E8694A" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="font-[family-name:var(--font-sans)] text-2xl font-bold text-[#2D2A26] mb-3">Continuous Telemetry</h3>
                        <p className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-relaxed mb-2 font-light">
                            Millisecond-level tracking of 14 core biomarkers. Your dashboard updates in real-time as your body responds.
                        </p>
                    </div>

                    {/* Card 3: Protocol Sync */}
                    <div className="flex flex-col h-full bg-white rounded-3xl p-8 border border-[#2D2A26]/5 shadow-[0_8px_30px_rgba(45,42,38,0.03)] hover:shadow-[0_20px_40px_rgba(45,42,38,0.08)] transition-all duration-500">
                        <div className="w-full aspect-[4/3] bg-[#1A1816] rounded-2xl mb-10 flex flex-col p-6 overflow-hidden relative justify-center items-center">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,105,74,0.15),transparent_70%)] pointer-events-none" />
                            <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center relative">
                                <div className="absolute inset-2 rounded-full border border-[#E8694A]/30 border-t-[#E8694A] animate-spin" style={{ animationDuration: '3s' }} />
                                <svg className="w-8 h-8 text-[#FAF8F5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="font-[family-name:var(--font-sans)] text-[11px] text-[#FAF8F5]/60 mt-6 tracking-widest uppercase font-semibold">Protocol Generating</div>
                        </div>
                        <h3 className="font-[family-name:var(--font-sans)] text-2xl font-bold text-[#2D2A26] mb-3">Dynamic Prescription</h3>
                        <p className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-relaxed mb-2 font-light">
                            Our models constantly recalculate your optimal intervention path based on incoming live data and milestone tracking.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
