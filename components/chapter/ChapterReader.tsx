import TableOfContents from "./TableOfContents";
import LockedSection from "./LockedSection";
import MarkAsMastered from "./MarkAsMastered";
import type { Chapter, TOCHeading } from "@/lib/types";

interface ChapterReaderProps {
    chapter: Chapter;
    content: React.ReactNode;
    hasAccess: boolean;
    userId: string | null;
    isCompleted: boolean;
    headings?: TOCHeading[];
}

export default function ChapterReader({
    chapter,
    content,
    hasAccess,
    userId,
    isCompleted,
    headings,
}: ChapterReaderProps) {
    const tocHeadings = headings ?? [];

    return (
        <section className="min-h-screen pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Two-column layout */}
                <div className="flex gap-12">
                    {/* Sidebar — Table of Contents (desktop only) */}
                    <aside className="hidden lg:block w-56 flex-shrink-0">
                        <TableOfContents headings={tocHeadings} />
                    </aside>

                    {/* Main reading column */}
                    <article className="flex-1 max-w-2xl mx-auto">
                        {/* Chapter header */}
                        <header className="mb-10">
                            {/* Eyebrow */}
                            <span className="font-[family-name:var(--font-sans)] text-xs text-[#A09890] uppercase tracking-widest font-medium">
                                {chapter.is_free
                                    ? "Free Chapter"
                                    : chapter.price_tier === "premium"
                                        ? "Premium Chapter"
                                        : "Standard Chapter"}
                            </span>
                            <h1 className="font-[family-name:var(--font-serif)] text-4xl font-bold text-[#2D2A26] mt-2 mb-3 leading-tight">
                                {chapter.title}
                            </h1>
                            {chapter.description && (
                                <p className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-relaxed">
                                    {chapter.description}
                                </p>
                            )}
                            <hr className="border-t border-[#2D2A26]/[0.08] mt-8" />
                        </header>

                        {/* Chapter content */}
                        {content ? (
                            <div className="prose-intrinsic space-y-6 font-[family-name:var(--font-sans)] text-[#6B6560] leading-8">
                                {content}
                            </div>
                        ) : !hasAccess ? (
                            <div className="bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl p-6 text-sm text-[#6B6560] shadow-[0_2px_12px_rgba(45,42,38,0.06)]">
                                This chapter is ready for paywalled content, but no public preview has been authored yet.
                            </div>
                        ) : null}

                        {/* Locked section (if not accessible) */}
                        {!hasAccess && (
                            <LockedSection
                                chapterTitle={chapter.title}
                                chapterSlug={chapter.slug}
                                priceTier={
                                    chapter.price_tier as
                                    | "standard"
                                    | "premium"
                                }
                                priceUsd={chapter.price_usd}
                                userId={userId}
                            />
                        )}

                        {/* Mark as mastered (if accessible) */}
                        {hasAccess && userId && (
                            <div className="mt-16 pt-8 border-t border-[#2D2A26]/[0.08] flex justify-center">
                                <MarkAsMastered
                                    chapterId={chapter.id}
                                    initialCompleted={isCompleted}
                                />
                            </div>
                        )}
                    </article>
                </div>
            </div>
        </section>
    );
}
