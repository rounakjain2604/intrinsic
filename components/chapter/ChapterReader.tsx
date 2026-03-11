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
        <section className="min-h-screen px-4 pb-20 pt-28 lg:px-8">
            <div className="mx-auto w-full max-w-[1680px]">
                {/* Two-column layout */}
                <div className="flex gap-8 xl:gap-12 items-start">
                    {/* Sidebar — Table of Contents (desktop only) */}
                    <aside className="hidden w-64 flex-shrink-0 xl:w-72 2xl:w-80 lg:block">
                        <TableOfContents headings={tocHeadings} />
                    </aside>

                    {/* Main reading column */}
                    <article className="min-w-0 flex-1 max-w-none">
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
                            <h1 className="mt-2 mb-3 font-[family-name:var(--font-serif)] text-4xl font-bold leading-tight text-[#2D2A26] md:text-5xl">
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
                            <div className="prose-intrinsic w-full space-y-6 font-[family-name:var(--font-sans)] text-[#6B6560] leading-8">
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
