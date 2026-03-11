import Link from "next/link";
import { listStudyLibrary } from "@/lib/study-content";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Study Library - Intrinsic",
    description: "Browse Topic, Learning Module, and LOS study content.",
};

export default async function StudyLibraryPage() {
    const library = await listStudyLibrary();

    return (
        <section className="min-h-screen px-6 pb-20 pt-28">
            <div className="mx-auto max-w-5xl">
                <div className="mb-10">
                    <h1 className="font-[family-name:var(--font-serif)] text-4xl font-semibold text-[#2D2A26]">
                        Study Library
                    </h1>
                    <p className="mt-3 max-w-3xl text-base leading-8 text-[#6B6560]">
                        This area renders the uploaded Topic, Learning Module, and LOS
                        content directly from Supabase so students can open each learning
                        outcome statement cleanly.
                    </p>
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
                                className="rounded-2xl border border-[#2D2A26]/10 bg-[#F5F1EA] p-8 shadow-[0_2px_12px_rgba(45,42,38,0.06)]"
                            >
                                <h2 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-[#2D2A26]">
                                    {topic.title}
                                </h2>
                                <div className="mt-6 space-y-6">
                                    {topic.modules.map((module) => (
                                        <div key={module.slug}>
                                            <p className="font-[family-name:var(--font-sans)] text-lg font-semibold text-[#2D2A26]">
                                                {module.title}
                                            </p>
                                            <ul className="mt-3 space-y-2">
                                                {module.losses.map((los) => (
                                                    <li key={los.slug}>
                                                        <Link
                                                            href={`/study/${topic.slug}/${module.slug}/${los.slug}`}
                                                            className="text-sm text-[#6B6560] underline decoration-[#E8694A]/30 underline-offset-4 transition hover:text-[#E8694A]"
                                                        >
                                                            {los.title}
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
