import { redirect } from "next/navigation";
import { syncUser } from "@/lib/supabase/syncUser";
import { isContentAdmin } from "@/lib/admin";
import { listStudyLibrary } from "@/lib/study-content";
import {
    getAllChapters,
    getUserPurchasedChapterIds,
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
    const studyLibrary = await listStudyLibrary().catch(() => []);

    const completedChapterIds = new Set(progress.map((p) => p.chapterId));
    const completedCount = completedChapterIds.size;

    // 3. Derive access state for each chapter
    // getAllChapters() already merges DB + local MDX, so we can derive slugs from it
    const chaptersBySlug = new Map(
        chapters.map((ch) => [ch.slug, ch])
    );

    const chaptersWithAccess = chapters.map((chapter) => {
        const accessState: "free" | "purchased" | "locked" = chapter.is_free
            ? "free"
            : purchasedIds.includes(chapter.id)
              ? "purchased"
              : "locked";
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
            const hasContent = !!chapter;
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
                    : "locked",
            };
        }
    }

    const totalModules = SUBJECTS.reduce((sum, s) => sum + s.modules.length, 0);
    const progressPercent =
        totalModules > 0
            ? Math.round((completedCount / totalModules) * 100)
            : 0;
    const contentAdmin = await isContentAdmin();
    const uploadedLosCount = studyLibrary.reduce(
        (sum, topic) =>
            sum + topic.modules.reduce((inner, module) => inner + module.losses.length, 0),
        0
    );
    const uploadedQuizCount = studyLibrary.reduce(
        (sum, topic) =>
            sum +
            topic.modules.reduce(
                (inner, module) =>
                    inner + module.losses.reduce((quizSum, los) => quizSum + los.quizCount, 0),
                0
            ),
        0
    );

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
                    <div className="mt-4 flex flex-wrap gap-3">
                        <a
                            href="/study"
                            className="inline-flex rounded-xl border border-[#2D2A26]/10 bg-[#F5F1EA] px-4 py-2 text-sm font-medium text-[#2D2A26] transition hover:bg-white"
                        >
                            Open Study Library
                        </a>
                        {contentAdmin && (
                            <a
                                href="/dashboard/import"
                                className="inline-flex rounded-xl bg-[#E8694A] px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(232,105,74,0.25)] transition hover:bg-[#D45E40]"
                            >
                                Upload Study Notes
                            </a>
                        )}
                    </div>
                </div>

                <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                    <div className="rounded-[2rem] border border-[#2D2A26]/10 bg-[linear-gradient(135deg,#FFF7ED_0%,#F5F1EA_100%)] p-7 shadow-[0_8px_24px_rgba(45,42,38,0.05)]">
                        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[#A09890]">
                            Study Hub
                        </p>
                        <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl font-semibold text-[#2D2A26]">
                            Use your uploaded notes like a real study dashboard.
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B6560]">
                            The study library now supports LOS-level lessons, inline quiz
                            cards, formulas, and SVG visuals from your uploaded notes.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3 text-sm text-[#2D2A26]">
                            <span className="rounded-full border border-[#2D2A26]/10 bg-white px-4 py-2">
                                {studyLibrary.length} topics
                            </span>
                            <span className="rounded-full border border-[#2D2A26]/10 bg-white px-4 py-2">
                                {uploadedLosCount} LOS notes
                            </span>
                            <span className="rounded-full border border-[#2D2A26]/10 bg-white px-4 py-2">
                                {uploadedQuizCount} quiz prompts
                            </span>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-[#2D2A26]/10 bg-white p-7 shadow-[0_8px_24px_rgba(45,42,38,0.05)]">
                        <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[#2D2A26]">
                            Next Step
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-[#6B6560]">
                            Open the study dashboard to read by Topic, Learning Module, and
                            LOS instead of browsing a raw file list.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <a
                                href="/study"
                                className="inline-flex rounded-xl bg-[#E8694A] px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(232,105,74,0.25)] transition hover:bg-[#D45E40]"
                            >
                                Open Study Dashboard
                            </a>
                            {contentAdmin && (
                                <a
                                    href="/dashboard/import"
                                    className="inline-flex rounded-xl border border-[#2D2A26]/10 px-4 py-2 text-sm font-medium text-[#2D2A26] transition hover:bg-[#F5F1EA]"
                                >
                                    Upload More Notes
                                </a>
                            )}
                        </div>
                    </div>
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
