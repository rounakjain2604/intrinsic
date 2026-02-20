import Link from "next/link";
import Badge from "@/components/shared/Badge";

const FREE_CHAPTERS = [
    {
        id: "ethics",
        title: "Ethics and Professional Standards",
        description:
            "The foundation of CFA. The code, the standards, and how to apply them under exam pressure.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-[#E8694A]"
            >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
        ),
    },
    {
        id: "equity-valuation",
        title: "Equity Valuation: Concepts and Basics",
        description:
            "DCF, multiples, and how to think about what a company is actually worth.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-[#E8694A]"
            >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
            </svg>
        ),
    },
    {
        id: "economics",
        title: "Economics: Macro and Monetary Policy",
        description:
            "Interest rates, currency effects, and what central banks actually do to markets.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-[#E8694A]"
            >
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="M7 21h10" />
                <path d="M12 3v18" />
                <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
            </svg>
        ),
    },
];

export default function ChapterPreview() {
    return (
        <section className="py-24 px-6 max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-semibold text-[#2D2A26] mb-4">
                    Start with these. Free forever.
                </h2>
                <p className="font-[family-name:var(--font-sans)] text-[#6B6560] text-lg">
                    No account needed. Just open and read.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FREE_CHAPTERS.map((chapter) => (
                    <Link
                        key={chapter.id}
                        href={`/chapters/${chapter.id}`}
                        className="group block bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl p-6 shadow-[0_2px_12px_rgba(45,42,38,0.06)] hover:shadow-[0_4px_20px_rgba(45,42,38,0.10)] hover:border-[#2D2A26]/20 transition-all duration-200 flex flex-col h-full"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#2D2A26]/5 shadow-sm">
                                {chapter.icon}
                            </div>
                            <Badge variant="free" />
                        </div>

                        <h3 className="font-[family-name:var(--font-sans)] text-xl font-semibold text-[#2D2A26] mb-3">
                            {chapter.title}
                        </h3>

                        <p className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560] leading-relaxed mb-8 flex-grow">
                            {chapter.description}
                        </p>

                        <div className="font-[family-name:var(--font-sans)] text-sm text-[#E8694A] font-medium flex items-center group-hover:gap-1 transition-all">
                            Read Chapter <span className="ml-1 opacity-80">→</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
