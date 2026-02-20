import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 px-6 overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(232,105,74,0.08),transparent_50%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-16 lg:gap-8 items-center relative z-10">

                {/* Left Column - Copy */}
                <div className="lg:col-span-7 flex flex-col items-start text-left">

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8694A]/10 border border-[#E8694A]/20 mb-8 animate-fade-up">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8694A] animate-pulse" />
                        <span className="font-[family-name:var(--font-sans)] text-xs text-[#E8694A] font-semibold uppercase tracking-widest leading-none pt-px">
                            Visual Notes for CFA Level 2
                        </span>
                    </div>

                    <h1 className="font-[family-name:var(--font-serif)] text-5xl sm:text-6xl md:text-7xl font-bold text-[#2D2A26] leading-[1.1] mb-8 tracking-tight animate-fade-up delay-75">
                        Finally understand <br className="hidden sm:block" />
                        <span className="font-normal italic tracking-normal text-[#E8694A]">the hardest concepts.</span>
                    </h1>

                    <p className="font-[family-name:var(--font-sans)] text-xl sm:text-2xl text-[#6B6560] leading-relaxed max-w-2xl mb-12 animate-fade-up delay-150 font-light">
                        Skip the endless walls of text. Learn from visually stunning, hand-drawn notes built to make 300 hours of studying feel effortless.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6 animate-fade-up delay-300 w-full sm:w-auto">
                        <Link
                            href="/chapters"
                            className="group relative inline-flex items-center justify-center w-full sm:w-auto font-[family-name:var(--font-sans)] font-medium bg-[#2D2A26] text-[#FAF8F5] px-8 py-4 rounded-xl overflow-hidden transition-all hover:shadow-[0_8px_30px_rgba(45,42,38,0.2)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out" />
                            <span className="relative flex items-center gap-2">
                                Start Learning Free
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Link>

                        <Link
                            href="/dashboard"
                            className="group inline-flex items-center gap-2 font-[family-name:var(--font-sans)] text-base font-medium text-[#6B6560] hover:text-[#2D2A26] transition-colors"
                        >
                            <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#2D2A26] after:scale-x-0 after:origin-right group-hover:after:scale-x-100 group-hover:after:origin-left after:transition-transform after:duration-300">
                                View library
                            </span>
                        </Link>
                    </div>

                    {/* Minimal Social Proof */}
                    <div className="mt-16 flex items-center gap-4 animate-fade-up delay-[400ms]">
                        <div className="flex -space-x-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#FAF8F5] bg-[#EDE8DF] flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-[#E8694A]/20 to-transparent opacity-50" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-[family-name:var(--font-sans)] text-sm font-semibold text-[#2D2A26]">5 free chapters initially</span>
                            <span className="font-[family-name:var(--font-sans)] text-xs text-[#A09890]">No credit card required.</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Visual/Diagram Mockup */}
                <div className="lg:col-span-5 relative animate-fade-in delay-[500ms] hidden md:block">
                    <div className="relative w-full aspect-[4/5] bg-[#F5F1EA] rounded-3xl border border-[#2D2A26]/10 shadow-[0_20px_60px_-15px_rgba(45,42,38,0.1)] p-8 overflow-hidden group hover:shadow-[0_30px_80px_-20px_rgba(45,42,38,0.15)] transition-all duration-700">
                        {/* The "Paper" Texture inner */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

                        {/* Minimal UI elements indicating a visual note */}
                        <div className="flex justify-between items-center mb-12">
                            <div className="h-4 w-24 bg-[#E8694A]/20 rounded-full" />
                            <div className="h-8 w-8 rounded-full border border-[#2D2A26]/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-[#A09890]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </div>
                        </div>

                        {/* Simulated Hand-Drawn Chart Box */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%]">
                            <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible"
                                style={{ filter: "url(#sketch-hero)" }}>
                                <defs>
                                    <filter id="sketch-hero" x="-10%" y="-10%" width="120%" height="120%">
                                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                                    </filter>
                                </defs>
                                {/* Axes */}
                                <path d="M 40 250 L 360 250" stroke="#2D2A26" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
                                <path d="M 40 250 L 40 50" stroke="#2D2A26" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />

                                {/* Curve */}
                                <path d="M 40 220 Q 150 200 200 120 T 360 80" stroke="#E8694A" strokeWidth="3" fill="none"
                                    className="origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 delay-100 ease-out" />

                                {/* Data Points */}
                                <circle cx="200" cy="120" r="4" fill="#F5F1EA" stroke="#E8694A" strokeWidth="2" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[800ms]" />
                                <circle cx="360" cy="80" r="4" fill="#F5F1EA" stroke="#E8694A" strokeWidth="2" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[1000ms]" />

                                {/* Annotation Box */}
                                <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[1200ms] transform translate-y-4 group-hover:translate-y-0">
                                    <path d="M 220 70 L 320 70 L 320 110 L 220 110 Z" fill="#FFFDF9" stroke="#2D2A26" strokeWidth="1" />
                                    <text x="270" y="94" fontFamily="DM Sans" fontSize="12" fill="#2D2A26" textAnchor="middle">Terminal Value</text>
                                </g>
                            </svg>
                        </div>

                    </div>

                    {/* Floating graphic element */}
                    <div className="absolute -bottom-8 -left-8 bg-[#FAF8F5] p-6 rounded-2xl border border-[#2D2A26]/10 shadow-[0_10px_40px_-10px_rgba(45,42,38,0.1)] w-64 animate-fade-up delay-[800ms]">
                        <p className="font-[family-name:var(--font-mono)] text-xs text-[#E8694A] mb-2 uppercase tracking-wider">Formula.01</p>
                        <p className="font-[family-name:var(--font-serif)] text-lg text-[#2D2A26] leading-tight mb-2">Capital Asset Pricing</p>
                        <div className="w-full h-12 bg-[#EDE8DF] rounded bg-opacity-50 flex items-center px-3">
                            <span className="font-[family-name:var(--font-mono)] text-sm text-[#6B6560]">E(R) = R_f + β(E(R_m) - R_f)</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
