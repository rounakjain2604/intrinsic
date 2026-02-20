export default function Manifesto() {
    return (
        <section className="py-40 px-6 bg-[#1A1816] flex flex-col items-center justify-center relative">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

                <h2 className="font-[family-name:var(--font-sans)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#FAF8F5] leading-[1.1] tracking-tighter mb-16 max-w-4xl">
                    Legacy prep asks <br className="hidden md:block" />
                    <span className="text-[#A09890] font-normal">"What to memorize?"</span>
                    <br /><br />
                    We ask <span className="font-[family-name:var(--font-serif)] italic text-crayon-orange font-normal tracking-normal pr-4">"What makes sense?"</span>
                </h2>

                {/* Thin vertical red line connects text */}
                <div className="h-32 w-px bg-gradient-to-b from-crayon-orange to-transparent mb-12" />

                <p className="font-[family-name:var(--font-sans)] text-xl text-[#FAF8F5]/60 max-w-2xl font-light leading-relaxed">
                    Most providers drown you in thousands of pages of bullet points, trying to cover every possible detail. We don't. We employ visual models and brutal curation to focus exactly on the concepts that truly matter for passing the exam.
                </p>
            </div>
        </section>
    );
}
