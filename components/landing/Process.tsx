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
                            <svg className="w-[90%] h-[90%] text-crayon-blue/80 opacity-70 z-0 mix-blend-multiply" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Forward vs Spot Rates */}
                                {/* Timeline nodes */}
                                <circle cx="50" cy="200" r="6" fill="currentColor" />
                                <circle cx="180" cy="200" r="6" fill="currentColor" />
                                <circle cx="310" cy="200" r="6" fill="currentColor" />
                                <circle cx="440" cy="200" r="6" fill="currentColor" />

                                <text x="50" y="230" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">Yr 0</text>
                                <text x="180" y="230" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">Yr 1</text>
                                <text x="310" y="230" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">Yr 2</text>
                                <text x="440" y="230" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">Yr 3</text>

                                {/* Base Timeline */}
                                <path d="M50 200 L440 200" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 5" />

                                {/* Spot Rates (Long Arrows above) */}
                                <path d="M50 160 L170 160" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <polygon points="175,160 165,155 165,165" fill="currentColor" />
                                <text x="110" y="145" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">S1</text>

                                <path d="M50 120 L300 120" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <polygon points="305,120 295,115 295,125" fill="currentColor" />
                                <text x="175" y="105" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">S2</text>

                                <path d="M50 80 L430 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <polygon points="435,80 425,75 425,85" fill="currentColor" />
                                <text x="240" y="65" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">S3</text>

                                {/* Forward Rates (Short Arrows below) */}
                                <path d="M185 245 L300 245" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <polygon points="305,245 295,240 295,250" fill="currentColor" />
                                <text x="245" y="270" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">f(1,1)</text>

                                <path d="M315 245 L430 245" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <polygon points="435,245 425,240 425,250" fill="currentColor" />
                                <text x="375" y="270" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">f(2,1)</text>

                                {/* Formula Box */}
                                <rect x="50" y="290" width="400" height="40" rx="8" fill="transparent" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                                <text x="250" y="315" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">(1 + S2)² = (1 + S1) × (1 + f(1,1))</text>
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
                            <svg className="w-[90%] h-[90%] text-crayon-red/80 z-0 mix-blend-multiply relative" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Arbitrage-Free Binomial Tree */}
                                {/* t=0 */}
                                <circle cx="80" cy="175" r="20" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
                                <text x="80" y="180" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">r0</text>

                                {/* t=1 */}
                                <circle cx="250" cy="100" r="20" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
                                <text x="250" y="105" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">r_u</text>

                                <circle cx="250" cy="250" r="20" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
                                <text x="250" y="255" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">r_d</text>

                                {/* t=2 */}
                                <circle cx="420" cy="50" r="20" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
                                <text x="420" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">r_uu</text>

                                <circle cx="420" cy="175" r="20" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
                                <text x="420" y="180" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">r_ud</text>

                                <circle cx="420" cy="300" r="20" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
                                <text x="420" y="305" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="var(--font-mono)">r_dd</text>

                                {/* Forward Paths (Rates) */}
                                <path d="M100 165 L230 110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M100 185 L230 240" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

                                <path d="M270 90 L400 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M270 110 L400 165" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

                                <path d="M270 240 L400 185" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M270 260 L400 290" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

                                {/* Volatility Label */}
                                <rect x="200" y="155" width="100" height="24" fill="#EDE8DF" />
                                <text x="250" y="172" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">r_u = r_d × e^(2σ)</text>

                                {/* Backward Induction Paths (Bond Prices) - Contrasting Color */}
                                <path d="M400 50 L270 80" stroke="#6B6560" strokeWidth="2" strokeDasharray="4 4" />
                                <polygon points="265,82 275,85 272,75" fill="#6B6560" />

                                <path d="M400 175 L270 115" stroke="#6B6560" strokeWidth="2" strokeDasharray="4 4" />
                                <polygon points="265,112 272,122 276,112" fill="#6B6560" />

                                <text x="335" y="45" textAnchor="middle" fill="#6B6560" fontSize="12" fontFamily="var(--font-mono)">Discount</text>
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
                            <svg className="w-[90%] h-[90%] text-white/80 z-0 mix-blend-overlay" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Currency Swap Cash Flows */}
                                {/* Party Boxes */}
                                <rect x="50" y="40" width="120" height="270" rx="12" fill="transparent" stroke="currentColor" strokeWidth="2" />
                                <text x="110" y="70" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="bold" fontFamily="var(--font-sans)">Party A</text>
                                <text x="110" y="90" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">(Pays USD)</text>

                                <rect x="330" y="40" width="120" height="270" rx="12" fill="transparent" stroke="currentColor" strokeWidth="2" />
                                <text x="390" y="70" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="bold" fontFamily="var(--font-sans)">Party B</text>
                                <text x="390" y="90" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)">(Pays EUR)</text>

                                {/* Initiation Phase */}
                                <text x="250" y="130" textAnchor="middle" fill="currentColor" fontSize="12" opacity="0.6" fontFamily="var(--font-mono)">Initiation</text>
                                <path d="M180 140 L320 140" stroke="currentColor" strokeWidth="3" />
                                <polygon points="325,140 315,135 315,145" fill="currentColor" />
                                <text x="250" y="135" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">€ Principal</text>

                                <path d="M320 155 L180 155" stroke="currentColor" strokeWidth="3" />
                                <polygon points="175,155 185,150 185,160" fill="currentColor" />
                                <text x="250" y="165" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">$ Principal</text>

                                {/* Periodic Settlement Phase */}
                                <text x="250" y="200" textAnchor="middle" fill="currentColor" fontSize="12" opacity="0.6" fontFamily="var(--font-mono)">Periodic Settlement</text>
                                <path d="M180 210 L320 210" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                                <polygon points="325,210 315,207 315,213" fill="currentColor" />
                                <text x="250" y="205" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">$ Fixed</text>

                                <path d="M320 220 L180 220" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                                <polygon points="175,220 185,217 185,223" fill="currentColor" />
                                <text x="250" y="230" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">€ Fixed</text>

                                {/* Maturity Phase */}
                                <text x="250" y="260" textAnchor="middle" fill="currentColor" fontSize="12" opacity="0.6" fontFamily="var(--font-mono)">Maturity Re-exchange</text>
                                <path d="M180 270 L320 270" stroke="currentColor" strokeWidth="3" />
                                <polygon points="325,270 315,265 315,275" fill="currentColor" />
                                <text x="250" y="265" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">$ Principal</text>

                                <path d="M320 285 L180 285" stroke="currentColor" strokeWidth="3" />
                                <polygon points="175,285 185,280 185,290" fill="currentColor" />
                                <text x="250" y="295" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">€ Principal</text>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
