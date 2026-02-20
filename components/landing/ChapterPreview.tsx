import Link from "next/link";
import Badge from "@/components/shared/Badge";

const FREE_CHAPTERS = [
    {
        id: "ethics",
        title: "Ethics and Professional Standards",
        description: "The foundation of CFA. The code, the standards, and how to apply them under exam pressure.",
        shortDescription: "The absolute foundation.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#E8694A]">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
        ),
        spanParams: "md:col-span-2 md:row-span-2",
    },
    {
        id: "equity-valuation",
        title: "Equity Valuation: Concepts and Basics",
        description: "DCF, multiples, and how to think about what a company is actually worth.",
        shortDescription: "DCF & Multiples.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#E8694A]">
                <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
            </svg>
        ),
        spanParams: "col-span-1 border-l-0 md:border-l border-t-0 border-[#2D2A26]/10",
    },
    {
        id: "economics",
        title: "Economics: Macro and Monetary Policy",
        description: "Interest rates, currency effects, and what central banks actually do to markets.",
        shortDescription: "Central Banks & FX.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#E8694A]">
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
            </svg>
        ),
        spanParams: "col-span-1 border-l-0 md:border-l border-t border-[#2D2A26]/10",
    },
];

export default function ChapterPreview() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">

            {/* Editorial Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div className="max-w-xl">
                    <p className="font-[family-name:var(--font-sans)] text-xs text-[#E8694A] uppercase tracking-widest font-semibold mb-4">
                        Curriculum
                    </p>
                    <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-semibold text-[#2D2A26] leading-[1.1]">
                        Start with these.<br />
                        Free forever.
                    </h2>
                </div>
                <div className="md:text-right max-w-sm">
                    <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-lg leading-relaxed">
                        No account needed. Just open and read our hand-crafted visual notes.
                    </p>
                </div>
            </div>

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 bg-[#F5F1EA] rounded-3xl border border-[#2D2A26]/10 shadow-[0_4px_20px_rgba(45,42,38,0.03)] overflow-hidden">

                {FREE_CHAPTERS.map((chapter, i) => {
                    const isFeatured = i === 0;
                    return (
                        <Link
                            key={chapter.id}
                            href={`/chapters/${chapter.id}`}
                            className={`group relative flex flex-col p-8 md:p-12 hover:bg-[#FAF8F5] transition-colors duration-300 ${chapter.spanParams}`}
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div className="p-3 bg-[#FAF8F5] border border-[#2D2A26]/5 rounded-xl shadow-[0_2px_8px_rgba(45,42,38,0.02)] transform group-hover:-translate-y-1 transition-transform duration-300">
                                    {chapter.icon}
                                </div>
                                <Badge variant="free" />
                            </div>

                            <div className="mt-auto">
                                <p className="font-[family-name:var(--font-mono)] text-[#A09890] text-xs uppercase tracking-widest mb-3">
                                    Chapter 0{i + 1}
                                </p>
                                <h3 className={`font-[family-name:var(--font-serif)] text-[#2D2A26] mb-4 
                  ${isFeatured ? 'text-3xl lg:text-4xl leading-tight' : 'text-2xl leading-tight'}`}>
                                    {chapter.title}
                                </h3>
                                <p className={`font-[family-name:var(--font-sans)] text-[#6B6560] leading-relaxed mb-8
                  ${isFeatured ? 'text-lg max-w-sm' : 'text-base'}`}>
                                    {isFeatured ? chapter.description : chapter.shortDescription}
                                </p>
                            </div>

                            <div className="inline-flex items-center gap-2 font-[family-name:var(--font-sans)] text-sm font-medium text-[#E8694A]">
                                <span className="relative overflow-hidden">
                                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">Read Note</span>
                                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0">Read Note</span>
                                </span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </Link>
                    );
                })}
            </div>

        </section>
    );
}
