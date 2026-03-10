import { redirect } from "next/navigation";
import { syncUser } from "@/lib/supabase/syncUser";
import {
    getAllChapters,
    getUserPurchasedChapterIds,
    getUserProgress,
} from "@/lib/chapters";
import { SUBJECTS } from "@/lib/subjects";
import { getAllLocalChapterFrontmatters } from "@/lib/mdx";
import ChapterCard from "@/components/dashboard/ChapterCard";
import SubjectNavigator from "@/components/dashboard/SubjectNavigator";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Your Chapters — Intrinsic",
    description:
        "Your CFA Level 2 chapter library. Track your progress across chapters.",
};

export default async function DashboardPage() {
    // 1. Sync user (JIT) — redirects to sign-in if not authenticated
    const userId = await syncUser();
    if (!userId) {
        redirect("/sign-in");
    }

    // 2. Fetch real data from Supabase
    const [chapters, purchasedIds, progress, localFrontmatters] = await Promise.all([
        getAllChapters(),
        getUserPurchasedChapterIds(userId),
        getUserProgress(userId),
        getAllLocalChapterFrontmatters(),
    ]);

    const completedChapterIds = new Set(progress.map((p) => p.chapterId));
    const completedCount = completedChapterIds.size;

    // 3. Derive access state for each chapter
    const chaptersBySlug = new Map(
        chapters.map((ch) => [ch.slug, ch])
    );
    const localSlugs = new Set(localFrontmatters.map((f) => f.slug));

    const chaptersWithAccess = chapters.map((chapter) => {
        const accessState: "free" | "purchased" = chapter.is_free ? "free" : "purchased";
        return {
            ...chapter,
            accessState,
            isCompleted: completedChapterIds.has(chapter.id),
        };
    });

    // 4. Build module status map for the subject navigator
    const moduleStatuses: Record<string, {
        slug: string;
        hasContent: boolean;
        isCompleted: boolean;
        accessState: "free" | "purchased" | "locked";
    }> = {};

    for (const subject of SUBJECTS) {
        for (const mod of subject.modules) {
            const chapter = chaptersBySlug.get(mod.slug);
            const hasContent = localSlugs.has(mod.slug);
            moduleStatuses[mod.slug] = {
                slug: mod.slug,
                hasContent,
                isCompleted: chapter ? completedChapterIds.has(chapter.id) : false,
                accessState: chapter
                    ? chapter.is_free
                        ? "free"
                        : purchasedIds.includes(chapter.id)
                            ? "purchased"
                            : "locked"
                    : hasContent
                        ? "free"
                        : "locked",
            };
        }
    }

    const totalModules = SUBJECTS.reduce((sum, s) => sum + s.modules.length, 0);
    const progressPercent =
        totalModules > 0
            ? Math.round((completedCount / totalModules) * 100)
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
                        10 subjects. {totalModules} learning modules. Your CFA Level 2 library.
                    </p>
                </div>

                {/* Progress bar */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-[family-name:var(--font-sans)] text-sm text-[#6B6560]">
                            {completedCount} / {totalModules} Modules Mastered
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

                {/* Subject Navigator */}
                <div className="mb-12">
                    <h2 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[#2D2A26] mb-4">
                        Browse by Subject
                    </h2>
                    <SubjectNavigator moduleStatuses={moduleStatuses} />
                </div>

                {/* Chapter grid — all chapters with content */}
                <div className="mb-6">
                    <h2 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[#2D2A26] mb-4">
                        All Chapters
                    </h2>
                </div>
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
