import { syncUser } from "@/lib/supabase/syncUser";
import {
    getAllChapters,
    getUserProgress,
} from "@/lib/chapters";
import { SUBJECTS } from "@/lib/subjects";
import ChapterCard from "@/components/dashboard/ChapterCard";
import SubjectNavigator from "@/components/dashboard/SubjectNavigator";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Your Chapters — Intrinsic",
    description:
        "Your CFA Level 2 chapter library. Track your progress across chapters.",
};

export default async function DashboardPage() {
    // 1. Try to sync user — don't crash if not authenticated
    let userId: string | null = null;
    try {
        userId = await syncUser();
    } catch {
        // Auth not configured or user not signed in — continue as guest
    }

    // 2. Fetch chapters (works from local MDX even without Supabase)
    const chapters = await getAllChapters();

    // 3. Fetch progress if authenticated
    let completedChapterIds = new Set<string>();
    if (userId) {
        try {
            const progress = await getUserProgress(userId);
            completedChapterIds = new Set(progress.map((p) => p.chapterId));
        } catch {
            // Progress fetch failed — show 0% progress
        }
    }

    const completedCount = completedChapterIds.size;

    // 4. Everything is free — derive simple chapter list
    const chaptersBySlug = new Map(
        chapters.map((ch) => [ch.slug, ch])
    );

    const chaptersWithAccess = chapters.map((chapter) => ({
        ...chapter,
        accessState: "free" as const,
        isCompleted: completedChapterIds.has(chapter.id),
    }));

    // 5. Build module status map for the subject navigator
    const moduleStatuses: Record<string, {
        slug: string;
        hasContent: boolean;
        isCompleted: boolean;
        accessState: "free" | "coming-soon";
    }> = {};

    for (const subject of SUBJECTS) {
        for (const mod of subject.modules) {
            const chapter = chaptersBySlug.get(mod.slug);
            const hasContent = !!chapter;
            moduleStatuses[mod.slug] = {
                slug: mod.slug,
                hasContent,
                isCompleted: chapter ? completedChapterIds.has(chapter.id) : false,
                accessState: hasContent ? "free" : "coming-soon",
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
                    {!userId && (
                        <p className="font-[family-name:var(--font-sans)] text-sm text-[#E8694A] mt-2">
                            All chapters are free during the beta. Sign in to track your progress.
                        </p>
                    )}
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
                            isCompleted={chapter.isCompleted}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
