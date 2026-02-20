export default function Process() {
    return (
        <section className="py-32 px-6 bg-[#FAF8F5]" id="protocol">
            <div className="max-w-6xl mx-auto">

                <div className="mb-24">
                    <h2 className="font-[family-name:var(--font-sans)] text-6xl md:text-8xl font-bold text-[#2D2A26] tracking-tighter">
                        The Protocol.
                    </h2>
                </div>

                <div className="flex flex-col gap-8 w-full relative">

                    {/* Card 1 */}
                    <div className="sticky top-24 w-full h-auto min-h-[60vh] md:h-[65vh] bg-white rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 border border-[#2D2A26]/10 shadow-[0_20px_60px_rgba(45,42,38,0.06)] overflow-hidden">
                        <div className="w-full md:w-5/12 flex flex-col justify-center relative z-10">
                            <span className="font-[family-name:var(--font-sans)] text-[#E8694A] font-bold uppercase tracking-widest text-sm mb-6">Phase 01</span>
                            <h3 className="font-[family-name:var(--font-sans)] text-5xl font-bold text-[#2D2A26] mb-8 tracking-tighter">Biological Audit</h3>
                            <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-lg md:text-xl leading-relaxed font-light">
                                A rigorous bottom-up assessment. From whole-genome sequencing to comprehensive hormone profiling, we establish the immutable ground truth of your current state.
                            </p>
                        </div>
                        <div className="w-full md:w-7/12 relative bg-[#F5F1EA] rounded-[2rem] overflow-hidden h-64 md:h-auto border border-[#2D2A26]/5">
                            <div className="absolute inset-0 bg-black/5 z-10 mix-blend-overlay" />
                            <div className="absolute inset-0 z-0 opacity-80 mix-blend-multiply flex items-center justify-center grayscale"
                                style={{
                                    backgroundImage: 'url("https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }} />
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="sticky top-32 w-full h-auto min-h-[60vh] md:h-[65vh] bg-[#F5F1EA] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 border border-[#2D2A26]/10 shadow-[0_20px_60px_rgba(45,42,38,0.06)] overflow-hidden">
                        <div className="w-full md:w-5/12 flex flex-col justify-center relative z-10">
                            <span className="font-[family-name:var(--font-sans)] text-[#E8694A] font-bold uppercase tracking-widest text-sm mb-6">Phase 02</span>
                            <h3 className="font-[family-name:var(--font-sans)] text-5xl font-bold text-[#2D2A26] mb-8 tracking-tighter">Strategic Intervention</h3>
                            <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-lg md:text-xl leading-relaxed font-light">
                                We deploy targeted therapeutics to correct deficiencies and optimize performance pathways. A bespoke algorithm translates your diagnostics into daily, high-impact actions.
                            </p>
                        </div>
                        <div className="w-full md:w-7/12 relative bg-[#EDE8DF] rounded-[2rem] overflow-hidden h-64 md:h-auto border border-[#2D2A26]/5">
                            {/* Red Grid Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(232,105,74,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(232,105,74,0.1)_1px,transparent_1px)] bg-[size:40px_40px] z-20 pointer-events-none" />
                            <div className="absolute inset-0 z-0 opacity-80 mix-blend-luminosity grayscale"
                                style={{
                                    backgroundImage: 'url("https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }} />
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="sticky top-40 w-full h-auto min-h-[60vh] md:h-[65vh] bg-[#E8694A] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 shadow-[0_30px_80px_rgba(232,105,74,0.3)] overflow-hidden">
                        <div className="w-full md:w-5/12 flex flex-col justify-center relative z-10">
                            <span className="font-[family-name:var(--font-sans)] text-white/50 font-bold uppercase tracking-widest text-sm mb-6">Phase 03</span>
                            <h3 className="font-[family-name:var(--font-sans)] text-5xl font-bold text-white mb-8 tracking-tighter">Longevity Shield</h3>
                            <p className="font-[family-name:var(--font-sans)] text-white/90 text-lg md:text-xl leading-relaxed font-light">
                                Transitioning from acute correction to sustained optimization. We employ next-generation anti-aging protocols to minimize cellular senescence and safeguard peak function via long-term monitoring.
                            </p>
                        </div>
                        <div className="w-full md:w-7/12 relative bg-[#1A1816]/30 rounded-[2rem] overflow-hidden h-64 md:h-auto border border-white/10">
                            <div className="absolute inset-0 z-0 opacity-50 mix-blend-overlay grayscale"
                                style={{
                                    backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
