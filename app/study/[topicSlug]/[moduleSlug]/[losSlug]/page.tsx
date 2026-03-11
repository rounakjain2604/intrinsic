import { notFound } from "next/navigation";
import { getRenderableLosContent } from "@/lib/study-content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ topicSlug: string; moduleSlug: string; losSlug: string }>;
}) {
    const { topicSlug, moduleSlug, losSlug } = await params;
    const content = await getRenderableLosContent(topicSlug, moduleSlug, losSlug);

    if (!content) {
        return {
            title: "LOS Not Found - Intrinsic",
        };
    }

    return {
        title: `${content.losTitle} - Intrinsic`,
        description: `${content.topicTitle} / ${content.moduleTitle}`,
    };
}

export default async function LosPage({
    params,
}: {
    params: Promise<{ topicSlug: string; moduleSlug: string; losSlug: string }>;
}) {
    const { topicSlug, moduleSlug, losSlug } = await params;
    const content = await getRenderableLosContent(topicSlug, moduleSlug, losSlug);

    if (!content) {
        notFound();
    }

    return (
        <section className="min-h-screen px-6 pb-20 pt-28">
            <div className="mx-auto max-w-4xl">
                <header className="mb-10 overflow-hidden rounded-[2rem] border border-[#2D2A26]/10 bg-[linear-gradient(135deg,#F5F1EA_0%,#FFFDF9_100%)] p-8 shadow-[0_8px_30px_rgba(45,42,38,0.07)]">
                    <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[#A09890]">
                        {content.topicTitle} / {content.moduleTitle}
                    </p>
                    <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-semibold text-[#2D2A26]">
                        {content.losTitle}
                    </h1>
                    <div className="mt-5 flex flex-wrap gap-3 text-sm text-[#6B6560]">
                        <span className="rounded-full border border-[#2D2A26]/10 bg-white px-3 py-1">
                            {content.quizCount} quiz{content.quizCount === 1 ? "" : "zes"}
                        </span>
                        <span className="rounded-full border border-[#2D2A26]/10 bg-white px-3 py-1">
                            {content.visualCount} visual{content.visualCount === 1 ? "" : "s"}
                        </span>
                        {content.estimatedTimeMinutes && (
                            <span className="rounded-full border border-[#2D2A26]/10 bg-white px-3 py-1">
                                {content.estimatedTimeMinutes} min study time
                            </span>
                        )}
                    </div>
                </header>

                <div className="space-y-8">
                    {content.renderedSections.map((section) => (
                        <section
                            key={section.key}
                            className="rounded-[2rem] border border-[#2D2A26]/10 bg-white p-8 shadow-[0_6px_24px_rgba(45,42,38,0.05)]"
                        >
                            <div className="mb-5 flex items-center justify-between gap-4 border-b border-[#2D2A26]/8 pb-4">
                                <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[#2D2A26]">
                                    {section.label}
                                </h2>
                                <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#A09890]">
                                    {section.key.replaceAll("_", " ")}
                                </span>
                            </div>
                            <div className="prose-intrinsic mt-5 space-y-6">
                                {section.renderedContent}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
