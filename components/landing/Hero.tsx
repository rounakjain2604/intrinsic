import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-[100vh] flex items-center pt-24 pb-16 px-6 overflow-hidden bg-[#1A1816]">
            <div
                className="absolute inset-0 z-0 opacity-50 mix-blend-luminosity"
                style={{
                    backgroundImage: 'url("/forest-bg.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-transparent to-[#1A1816]" />

            <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center">

                <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#FAF8F5]/20 mb-8 rounded-full backdrop-blur-md bg-black/10">
                    <span className="font-[family-name:var(--font-sans)] text-[10px] md:text-xs text-[#FAF8F5]/80 font-medium uppercase tracking-[0.2em] leading-none pt-px">
                        VISUAL NOTES FOR CFA LEVEL 2
                    </span>
                </div>

                <h1 className="font-[family-name:var(--font-sans)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#FAF8F5] leading-[1.05] mb-8 tracking-tighter max-w-5xl">
                    Finally understand the <br />
                    <span className="font-[family-name:var(--font-serif)] font-normal italic tracking-normal text-crayon-orange">hardest concepts.</span>
                </h1>

                <p className="font-[family-name:var(--font-sans)] text-lg md:text-xl text-[#FAF8F5]/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                    Skip the endless walls of text. Learn from visually stunning, hand-drawn notes built to make 300 hours of studying feel effortless.
                </p>

                <Link
                    href="/dashboard"
                    className="group inline-flex items-center justify-center font-[family-name:var(--font-sans)] font-medium text-[#FAF8F5] px-8 py-4 rounded-full border border-[#FAF8F5]/30 hover:border-[#FAF8F5] hover:bg-[#FAF8F5]/5 transition-all duration-300 backdrop-blur-sm"
                >
                    Browse All Chapters
                </Link>

            </div>
        </section>
    );
}
