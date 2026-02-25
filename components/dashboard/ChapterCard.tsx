import Link from "next/link";
import Badge from "@/components/shared/Badge";

interface ChapterCardProps {
    title: string;
    description: string;
    slug: string;
    accessState: "free" | "purchased" | "locked";
    priceTier: "free" | "standard" | "premium";
    priceUsd: number;
    isCompleted?: boolean;
}

export default function ChapterCard({
    title,
    description,
    slug,
    accessState,
    priceTier,
    priceUsd,
    isCompleted = false,
}: ChapterCardProps) {
    const badgeVariant =
        accessState === "free"
            ? "free"
            : accessState === "purchased"
                ? "standard"
                : priceTier === "premium"
                    ? "premium"
                    : "locked";

    return (
        <div
            className={`relative bg-[#F5F1EA] border rounded-2xl p-6 shadow-[0_2px_12px_rgba(45,42,38,0.06)] hover:shadow-[0_4px_20px_rgba(45,42,38,0.10)] transition-all duration-200 flex flex-col ${accessState === "free"
                    ? "border-[#E8694A]/30"
                    : "border-[#2D2A26]/10"
                }`}
        >
            {/* Top row: completed indicator + badge */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    {accessState === "locked" && (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0 mt-0.5"
                        >
                            <rect
                                x="3"
                                y="7"
                                width="10"
                                height="7"
                                rx="1.5"
                                stroke="#A09890"
                                strokeWidth="1.5"
                                fill="none"
                            />
                            <path
                                d="M5 7V5a3 3 0 116 0v2"
                                stroke="#A09890"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                fill="none"
                            />
                        </svg>
                    )}
                    {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#5B9E6F]">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <circle cx="7" cy="7" r="6" stroke="#5B9E6F" strokeWidth="1.5" fill="#5B9E6F" fillOpacity="0.1" />
                                <path d="M4 7l2 2 4-4" stroke="#5B9E6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Mastered
                        </span>
                    )}
                </div>
                <Badge variant={badgeVariant} />
            </div>

            {/* Title */}
            <h3 className="font-[family-name:var(--font-sans)] font-semibold text-lg text-[#2D2A26] mb-2 leading-snug">
                {title}
            </h3>

            {/* Description — 2 lines max */}
            <p className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560] leading-relaxed mb-6 line-clamp-2 flex-grow">
                {description}
            </p>

            {/* Bottom CTA */}
            <div className="mt-auto">
                {accessState === "free" && (
                    <Link
                        href={`/chapters/${slug}`}
                        className="inline-flex items-center gap-1 font-[family-name:var(--font-sans)] text-sm font-semibold px-5 py-2.5 rounded-xl bg-[#E8694A] text-[#FAF8F5] hover:bg-[#D45E40] transition-colors shadow-[0_2px_8px_rgba(232,105,74,0.25)]"
                    >
                        Read Chapter
                        <span aria-hidden>→</span>
                    </Link>
                )}
                {accessState === "purchased" && (
                    <Link
                        href={`/chapters/${slug}`}
                        className="inline-flex items-center gap-1 font-[family-name:var(--font-sans)] text-sm font-medium px-5 py-2.5 rounded-xl border-2 border-[#E8694A] text-[#E8694A] hover:bg-[#E8694A]/8 transition-colors"
                    >
                        Read Chapter
                        <span aria-hidden>→</span>
                    </Link>
                )}
                {accessState === "locked" && (
                    <div className="flex items-center justify-between">
                        <span className="font-[family-name:var(--font-mono)] text-sm font-semibold text-[#2D2A26]">
                            ${priceUsd.toFixed(2)}
                        </span>
                        <button className="font-[family-name:var(--font-sans)] text-sm font-medium px-5 py-2.5 rounded-xl border border-[#2D2A26]/15 text-[#6B6560] hover:border-[#2D2A26]/30 hover:text-[#2D2A26] transition-all">
                            Unlock Chapter
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
