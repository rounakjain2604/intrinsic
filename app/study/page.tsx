import Link from "next/link";
import { listStudyLibrary } from "@/lib/study-content";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Study Library - Intrinsic",
    description: "Browse Topic, Learning Module, and LOS study content.",
};

export default async function StudyLibraryPage() {
    const library = await listStudyLibrary();
    const topicCount = library.length;
    const moduleCount = library.reduce(
        (sum, topic) => sum + topic.modules.length,
        0
    );
    const losCount = library.reduce(
        (sum, topic) =>
            sum + topic.modules.reduce((inner, module) => inner + module.losses.length, 0),
        0
    );

    return (
        <section className="min-h-screen bg-[radial-gradient(circle_at_top,#FFF7ED_0%,#FAF8F5_48%,#F5F1EA_100%)] px-6 pb-20 pt-28">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 overflow-hidden rounded-[2rem] border border-[#2D2A26]/10 bg-white/80 p-8 shadow-[0_8px_30px_rgba(45,42,38,0.07)] backdrop-blur">
                    <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[#A09890]">
                        Study Dashboard
                    </p>
                    <h1 className="mt-3 font-[family-name:var(--font-serif)] text-5xl font-semibold text-[#2D2A26]">
                        Learn from your own CFA notes.
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-8 text-[#6B6560]">
                        Open a topic, move through the learning modules, and study each LOS
                        as a polished lesson with visuals, formulas, and in-app quiz checks.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#2D2A26]">
                        <span className="rounded-full border border-[#2D2A26]/10 bg-[#F5F1EA] px-4 py-2">
                            {topicCount} topics
                        </span>
                        <span className="rounded-full border border-[#2D2A26]/10 bg-[#F5F1EA] px-4 py-2">
                            {moduleCount} modules
                        </span>
                        <span className="rounded-full border border-[#2D2A26]/10 bg-[#F5F1EA] px-4 py-2">
                            {losCount} LOS notes
                        </span>
                    </div>
                </div>

                <div className="space-y-8">
                    {library.length === 0 ? (
                        <div className="rounded-2xl border border-[#2D2A26]/10 bg-[#F5F1EA] p-8 text-sm text-[#6B6560] shadow-[0_2px_12px_rgba(45,42,38,0.06)]">
                            No LOS content has been uploaded yet.
                        </div>
                    ) : (
                        library.map((topic) => (
                            <div
                                key={topic.slug}
                                className="rounded-[2rem] border border-[#2D2A26]/10 bg-white p-8 shadow-[0_8px_24px_rgba(45,42,38,0.05)]"
                            >
                                <h2 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-[#2D2A26]">
                                    {topic.title}
                                </h2>
                                <div className="mt-6 grid gap-5 md:grid-cols-2">
                                    {topic.modules.map((module) => (
                                        <div
                                            key={module.slug}
                                            className="rounded-2xl border border-[#2D2A26]/10 bg-[#FAF8F5] p-5"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <p className="font-[family-name:var(--font-sans)] text-lg font-semibold text-[#2D2A26]">
                                                    {module.title}
                                                </p>
                                                <span className="rounded-full bg-white px-3 py-1 text-xs text-[#A09890]">
                                                    {module.losses.length} LOS
                                                </span>
                                            </div>
                                            <ul className="mt-4 space-y-2">
                                                {module.losses.map((los) => (
                                                    <li key={los.slug}>
                                                        <Link
                                                            href={`/study/${topic.slug}/${module.slug}/${los.slug}`}
                                                            className="block rounded-xl border border-transparent bg-white px-4 py-3 text-sm text-[#6B6560] transition hover:border-[#E8694A]/20 hover:text-[#2D2A26]"
                                                        >
                                                            <div className="flex items-center justify-between gap-3">
                                                                <span className="font-medium">{los.title}</span>
                                                                <span className="text-xs text-[#A09890]">
                                                                    {los.quizCount} quiz
                                                                </span>
                                                            </div>
                                                            {los.estimatedTimeMinutes && (
                                                                <span className="mt-1 block text-xs text-[#A09890]">
                                                                    {los.estimatedTimeMinutes} min
                                                                </span>
                                                            )}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
