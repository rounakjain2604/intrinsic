import { notFound } from "next/navigation";
import { syncUser } from "@/lib/supabase/syncUser";
import {
    getChapterBySlug,
    hasChapterAccess,
    getUserProgress,
} from "@/lib/chapters";
import { getChapterContent, getChapterRawContent } from "@/lib/mdx";
import ChapterReader from "@/components/chapter/ChapterReader";

// ── Dynamic Metadata ──────────────────────────────────────
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const chapter = await getChapterBySlug(slug);

    if (!chapter) {
        return { title: "Chapter Not Found — Intrinsic" };
    }

    return {
        title: `${chapter.title} — CFA Level 2 | Intrinsic`,
        description: chapter.description,
        openGraph: {
            title: chapter.title,
            description: chapter.description ?? undefined,
            url: `https://trinsic.space/chapters/${slug}`,
            siteName: "Intrinsic",
            type: "article",
        },
    };
}

// ── Page Component ────────────────────────────────────────
export default async function ChapterPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // 1. Sync user (JIT) — may be null if not signed in
    const userId = await syncUser();

    // 2. Fetch chapter from Supabase
    const chapter = await getChapterBySlug(slug);
    if (!chapter) {
        notFound();
    }

    const isLocalChapter = chapter.id.startsWith("local:");

    // 3. Check access
    const access = isLocalChapter
        ? true
        : await hasChapterAccess(userId, chapter.id);

    // 4. Check completion status
    let isCompleted = false;
    if (userId && !isLocalChapter) {
        const progress = await getUserProgress(userId);
        isCompleted = progress.some((p) => p.chapterId === chapter.id);
    }

    // 5. Load MDX content
    let mdxResult = null;
    try {
        mdxResult = await getChapterContent(slug);
    } catch (error) {
        console.error("[chapters] Failed to compile MDX chapter:", error);
    }

    const rawResult = mdxResult ? null : getChapterRawContent(slug);

    // If MDX file doesn't exist yet, show a coming soon state
    if (!mdxResult && !rawResult) {
        return (
            <section className="min-h-screen pt-28 pb-20 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <span className="font-[family-name:var(--font-sans)] text-xs text-[#A09890] uppercase tracking-widest font-medium">
                        Coming Soon
                    </span>
                    <h1 className="font-[family-name:var(--font-serif)] text-4xl font-bold text-[#2D2A26] mt-2 mb-4">
                        {chapter.title}
                    </h1>
                    <p className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-relaxed">
                        {chapter.description}
                    </p>
                    <div className="mt-8 bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl p-8 shadow-[0_2px_12px_rgba(45,42,38,0.06)]">
                        <p className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560]">
                            This chapter is being written. Check back soon for
                            the full visual study experience.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (!mdxResult && rawResult) {
        return (
            <ChapterReader
                chapter={chapter}
                content={
                    <div className="rounded-2xl border border-[#2D2A26]/10 bg-[#F5F1EA] p-6 shadow-[0_2px_12px_rgba(45,42,38,0.06)]">
                        <p className="mb-4 text-sm text-[#A09890]">
                            Visual rendering is temporarily unavailable for this chapter, so the source text is shown instead.
                        </p>
                        <pre className="whitespace-pre-wrap break-words font-[family-name:var(--font-sans)] text-sm leading-7 text-[#2D2A26]">
                            {access || !rawResult.previewSource
                                ? rawResult.fullSource
                                : rawResult.previewSource}
                        </pre>
                    </div>
                }
                hasAccess={access}
                userId={isLocalChapter ? null : userId}
                isCompleted={isCompleted}
                headings={
                    access || !rawResult.previewSource
                        ? rawResult.headings ?? []
                        : rawResult.previewHeadings ?? []
                }
            />
        );
    }

    return (
        <ChapterReader
            chapter={chapter}
            content={access ? mdxResult!.content : mdxResult!.previewContent}
            hasAccess={access}
            userId={isLocalChapter ? null : userId}
            isCompleted={isCompleted}
            headings={
                access
                    ? mdxResult!.headings ?? []
                    : mdxResult!.previewHeadings ?? []
            }
        />
    );
}
