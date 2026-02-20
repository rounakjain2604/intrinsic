export default function Process() {
    return (
        <section className="py-32 px-6 bg-[#FAF8F5]" id="protocol">
            <div className="max-w-6xl mx-auto">

                <div className="mb-24">
                    <h2 className="font-[family-name:var(--font-sans)] text-6xl md:text-8xl font-bold text-[#2D2A26] tracking-tighter">
                        The Method.
                    </h2>
                </div>

                <div className="flex flex-col gap-8 w-full relative">

                    {/* Card 1 */}
                    <div className="sticky top-24 w-full h-auto min-h-[60vh] md:h-[65vh] bg-white rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 border border-[#2D2A26]/10 shadow-[0_20px_60px_rgba(45,42,38,0.06)] overflow-hidden">
                        <div className="w-full md:w-5/12 flex flex-col justify-center relative z-10">
                            <span className="font-[family-name:var(--font-sans)] text-crayon-orange font-bold uppercase tracking-widest text-sm mb-6">Phase 01</span>
                            <h3 className="font-[family-name:var(--font-sans)] text-5xl font-bold text-[#2D2A26] mb-8 tracking-tighter">Concept Acquisition</h3>
                            <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-lg md:text-xl leading-relaxed font-light">
                                First, read the visual notes. Our hand-drawn charts and intuitive explanations build the foundational mental models quickly without the usual brain-drain.
                            </p>
                        </div>
                        <div className="w-full md:w-7/12 relative bg-[#F5F1EA] rounded-[2rem] overflow-hidden h-64 md:h-auto border border-[#2D2A26]/5 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/5 z-10 mix-blend-overlay" />
                            <svg className="w-4/5 h-4/5 text-crayon-blue/80 opacity-60 z-0 mix-blend-multiply" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Pension Accounting / Funded Status Visualization */}
                                <path d="M50 250 L350 250" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 10" />
                                <path d="M100 250 L100 100 Q150 50 200 100 T300 150 L300 250" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M120 250 L120 150 Q170 180 220 120 T280 200 L280 250" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="5 5" opacity="0.6" />
                                <text x="150" y="80" fill="currentColor" fontSize="16" fontFamily="var(--font-mono)" opacity="0.8">PBO Liability</text>
                                <text x="230" y="220" fill="currentColor" fontSize="16" fontFamily="var(--font-mono)" opacity="0.8">Plan Assets</text>
                                {/* Hand-drawn squiggles */}
                                <path d="M70 270 Q80 280 90 270 T110 270" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="sticky top-32 w-full h-auto min-h-[60vh] md:h-[65vh] bg-[#F5F1EA] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 border border-[#2D2A26]/10 shadow-[0_20px_60px_rgba(45,42,38,0.06)] overflow-hidden">
                        <div className="w-full md:w-5/12 flex flex-col justify-center relative z-10">
                            <span className="font-[family-name:var(--font-sans)] text-crayon-red font-bold uppercase tracking-widest text-sm mb-6">Phase 02</span>
                            <h3 className="font-[family-name:var(--font-sans)] text-5xl font-bold text-[#2D2A26] mb-8 tracking-tighter">Formula Integration</h3>
                            <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-lg md:text-xl leading-relaxed font-light">
                                Connect the dots. We explicitly link visual logic to the quantitative formulas required for calculation questions on the exam.
                            </p>
                        </div>
                        <div className="w-full md:w-7/12 relative bg-[#EDE8DF] rounded-[2rem] overflow-hidden h-64 md:h-auto border border-[#2D2A26]/5 flex items-center justify-center">
                            {/* Hand-drawn Grid Overlay */}
                            <svg className="absolute inset-0 w-full h-full text-crayon-red/10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>
                            <svg className="w-4/5 h-4/5 text-crayon-red/70 z-0 mix-blend-multiply relative" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Black-Scholes Merton Binomial Tree */}
                                <circle cx="200" cy="50" r="15" stroke="currentColor" strokeWidth="3" />
                                <circle cx="100" cy="150" r="15" stroke="currentColor" strokeWidth="3" />
                                <circle cx="300" cy="150" r="15" stroke="currentColor" strokeWidth="3" />
                                <circle cx="50" cy="250" r="15" stroke="currentColor" strokeWidth="3" />
                                <circle cx="150" cy="250" r="15" stroke="currentColor" strokeWidth="3" />
                                <circle cx="250" cy="250" r="15" stroke="currentColor" strokeWidth="3" />
                                <circle cx="350" cy="250" r="15" stroke="currentColor" strokeWidth="3" />

                                <path d="M185 65 L115 135 M215 65 L285 135" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M85 165 L65 235 M115 165 L135 235 M285 165 L265 235 M315 165 L335 235" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

                                <text x="230" y="45" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">S0</text>
                                <text x="60" y="145" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">Su</text>
                                <text x="330" y="145" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">Sd</text>
                            </svg>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="sticky top-40 w-full h-auto min-h-[60vh] md:h-[65vh] bg-crayon-green rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 shadow-[0_30px_80px_rgba(89,146,91,0.3)] overflow-hidden">
                        <div className="w-full md:w-5/12 flex flex-col justify-center relative z-10">
                            <span className="font-[family-name:var(--font-sans)] text-white/70 font-bold uppercase tracking-widest text-sm mb-6">Phase 03</span>
                            <h3 className="font-[family-name:var(--font-sans)] text-5xl font-bold text-white mb-8 tracking-tighter">Exam Mastery</h3>
                            <p className="font-[family-name:var(--font-sans)] text-white/90 text-lg md:text-xl leading-relaxed font-light">
                                Hit the question bank. Armed with a deeper intuition, edge cases make sense, eliminating second-guessing on tough vignettes.
                            </p>
                        </div>
                        <div className="w-full md:w-7/12 relative bg-white/10 rounded-[2rem] overflow-hidden h-64 md:h-auto border border-white/20 flex items-center justify-center backdrop-blur-sm">
                            <svg className="w-4/5 h-4/5 text-white/60 z-0 mix-blend-overlay" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Swap Valuation Timeline */}
                                <path d="M30 150 L370 150" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="15 10" />
                                <path d="M100 130 L100 170 M200 130 L200 170 M300 130 L300 170" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

                                <path d="M100 120 Q150 50 200 120" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="5 5" />
                                <path d="M200 120 Q250 50 300 120" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="5 5" />

                                <path d="M100 180 Q150 250 200 180" stroke="currentColor" strokeWidth="3" fill="none" />
                                <path d="M200 180 Q250 250 300 180" stroke="currentColor" strokeWidth="3" fill="none" />

                                <text x="80" y="270" fill="currentColor" fontSize="16" fontFamily="var(--font-mono)">Fixed</text>
                                <text x="280" y="270" fill="currentColor" fontSize="16" fontFamily="var(--font-mono)">Floating</text>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
