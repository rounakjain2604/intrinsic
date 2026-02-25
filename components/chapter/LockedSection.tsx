interface LockedSectionProps {
    chapterTitle: string;
    priceTier: "standard" | "premium";
    priceUsd: number;
}

export default function LockedSection({
    chapterTitle,
    priceTier,
    priceUsd,
}: LockedSectionProps) {
    return (
        <div className="relative mt-12">
            {/* Gradient fade from content into blur */}
            <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#FAF8F5] z-10 pointer-events-none" />

            {/* Locked overlay */}
            <div className="relative bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl p-10 text-center shadow-[0_2px_12px_rgba(45,42,38,0.06)]">
                {/* Lock icon */}
                <div className="mx-auto w-14 h-14 rounded-full bg-[#EDE8DF] flex items-center justify-center mb-5">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="5"
                            y="11"
                            width="14"
                            height="10"
                            rx="2"
                            stroke="#A09890"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        <path
                            d="M8 11V8a4 4 0 118 0v3"
                            stroke="#A09890"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            fill="none"
                        />
                    </svg>
                </div>

                <h3 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[#2D2A26] mb-2">
                    Unlock the rest of this chapter
                </h3>
                <p className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560] mb-6 max-w-md mx-auto">
                    Continue reading{" "}
                    <span className="font-medium text-[#2D2A26]">
                        {chapterTitle}
                    </span>{" "}
                    with full access to all content, diagrams, and practice
                    questions.
                </p>

                {/* Price badge */}
                <div className="inline-flex items-center gap-2 mb-6">
                    <span className="font-[family-name:var(--font-mono)] text-2xl font-bold text-[#2D2A26]">
                        ${priceUsd.toFixed(2)}
                    </span>
                    <span className="font-[family-name:var(--font-sans)] text-xs text-[#A09890]">
                        one-time
                    </span>
                    {priceTier === "premium" && (
                        <span className="font-[family-name:var(--font-sans)] text-xs font-semibold text-[#D4882A] bg-[#D4882A]/10 border border-[#D4882A]/25 rounded-full px-2.5 py-0.5">
                            PREMIUM
                        </span>
                    )}
                </div>

                {/* CTA */}
                <div>
                    <button className="font-[family-name:var(--font-sans)] font-semibold bg-[#E8694A] text-[#FAF8F5] px-8 py-3 rounded-xl shadow-[0_2px_8px_rgba(232,105,74,0.25)] hover:bg-[#D45E40] hover:shadow-[0_4px_16px_rgba(232,105,74,0.35)] transition-all duration-200">
                        Unlock Chapter
                    </button>
                </div>

                <p className="font-[family-name:var(--font-sans)] text-xs text-[#A09890] mt-4">
                    Instant access · No subscription · Yours forever
                </p>
            </div>
        </div>
    );
}
