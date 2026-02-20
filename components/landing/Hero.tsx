import Link from "next/link";

export default function Hero() {
    return (
        <section className="min-h-[calc(100vh-80px)] md:min-h-screen flex items-center justify-center py-20 px-6">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                {/* Eyebrow label */}
                <span className="font-[family-name:var(--font-sans)] text-xs text-[#A09890] uppercase tracking-widest font-medium mb-6 animate-fade-up">
                    CFA Level 2 · Visual Notes
                </span>

                {/* Main headline */}
                <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-6xl font-bold text-[#2D2A26] leading-tight mb-6 animate-fade-up delay-75">
                    Finally understand CFA Level 2.
                </h1>

                {/* Subheadline */}
                <p className="font-[family-name:var(--font-sans)] text-xl text-[#6B6560] leading-relaxed max-w-2xl mb-12 animate-fade-up delay-150">
                    Visual notes built from real study sessions. Hand-drawn diagrams.
                    Crayon-color concepts. 5 chapters free, forever.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 animate-fade-up delay-300">
                    <Link
                        href="/chapters"
                        className="w-full sm:w-auto font-[family-name:var(--font-sans)] font-semibold bg-[#E8694A] text-[#FAF8F5] px-8 py-4 rounded-xl shadow-[0_2px_8px_rgba(232,105,74,0.25)] hover:bg-[#D45E40] hover:shadow-[0_4px_16px_rgba(232,105,74,0.35)] transition-all duration-200"
                    >
                        Start Learning Free
                    </Link>
                    <Link
                        href="/dashboard"
                        className="w-full sm:w-auto font-[family-name:var(--font-sans)] font-medium border border-[#2D2A26]/20 text-[#2D2A26] px-8 py-4 rounded-xl hover:border-[#2D2A26]/40 transition-all duration-200"
                    >
                        See all chapters
                    </Link>
                </div>

                {/* Social proof */}
                <p className="font-[family-name:var(--font-sans)] text-sm text-[#A09890] animate-fade-up delay-[400ms]">
                    Join students studying smarter for CFA Level 2
                </p>
            </div>
        </section>
    );
}
