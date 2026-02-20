export default function Manifesto() {
    return (
        <section className="py-40 px-6 bg-[#1A1816] flex flex-col items-center justify-center relative">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

                <h2 className="font-[family-name:var(--font-sans)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#FAF8F5] leading-[1.1] tracking-tighter mb-16 max-w-4xl">
                    Modern medicine asks <br className="hidden md:block" />
                    <span className="text-[#A09890] font-normal">"What is wrong?"</span>
                    <br /><br />
                    We ask <span className="font-[family-name:var(--font-serif)] italic text-[#E8694A] font-normal tracking-normal pr-4">"What is optimal?"</span>
                </h2>

                {/* Thin vertical red line connects text */}
                <div className="h-32 w-px bg-gradient-to-b from-[#E8694A] to-transparent mb-12" />

                <p className="font-[family-name:var(--font-sans)] text-xl text-[#FAF8F5]/60 max-w-2xl font-light leading-relaxed">
                    The prevailing healthcare system is designed to return you to baseline. We do not stop at baseline. We employ clinical precision to continuously elevate your physical, cognitive, and cellular performance to their absolute biological limits.
                </p>
            </div>
        </section>
    );
}
