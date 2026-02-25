import { redirect } from "next/navigation";
import { syncUser } from "@/lib/supabase/syncUser";
import {
    getAllChapters,
    getUserPurchasedChapterIds,
    getUserProgress,
} from "@/lib/chapters";
import ChapterCard from "@/components/dashboard/ChapterCard";

export const metadata = {
    title: "Your Chapters — Intrinsic",
    description:
        "Your CFA Level 2 chapter library. Track progress and unlock new chapters.",
};

export default async function DashboardPage() {
    // 1. Sync user (JIT) — redirects to sign-in if not authenticated
    const userId = await syncUser();
    if (!userId) {
        redirect("/sign-in");
    }

    // 2. Fetch real data from Supabase
    const [chapters, purchasedIds, progress] = await Promise.all([
        getAllChapters(),
        getUserPurchasedChapterIds(userId),
        getUserProgress(userId),
    ]);

    const completedChapterIds = new Set(progress.map((p) => p.chapterId));
    const completedCount = completedChapterIds.size;

    // 3. Derive access state for each chapter
    const chaptersWithAccess = chapters.map((chapter) => {
        let accessState: "free" | "purchased" | "locked";
        if (chapter.is_free) {
            accessState = "free";
        } else if (purchasedIds.includes(chapter.id)) {
            accessState = "purchased";
        } else {
            accessState = "locked";
        }
        return {
            ...chapter,
            accessState,
            isCompleted: completedChapterIds.has(chapter.id),
        };
    });

    const progressPercent =
        chapters.length > 0
            ? Math.round((completedCount / chapters.length) * 100)
            : 0;

    return (
        <section className="min-h-screen pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="font-[family-name:var(--font-serif)] text-4xl font-bold text-[#2D2A26] mb-2">
                        Your Chapters
                    </h1>
                    <p className="font-[family-name:var(--font-sans)] text-base text-[#6B6560]">
                        5 chapters free forever. Unlock more as you go.
                    </p>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560]">
                            {completedCount} / {chapters.length} Chapters Mastered
                        </span>
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[#A09890]">
                            {progressPercent}%
                        </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#EDE8DF] overflow-hidden">
                        <div
                            className="h-full rounded-full bg-[#5B9E6F] transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Chapter grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chaptersWithAccess.map((chapter) => (
                        <ChapterCard
                            key={chapter.id}
                            title={chapter.title}
                            description={chapter.description ?? ""}
                            slug={chapter.slug}
                            accessState={chapter.accessState}
                            priceTier={chapter.price_tier}
                            priceUsd={chapter.price_usd}
                            isCompleted={chapter.isCompleted}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
