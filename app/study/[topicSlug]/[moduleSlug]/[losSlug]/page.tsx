import { notFound } from "next/navigation";
import MarkdownFallback from "@/components/chapter/MarkdownFallback";
import { getLosContent } from "@/lib/study-content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ topicSlug: string; moduleSlug: string; losSlug: string }>;
}) {
    const { topicSlug, moduleSlug, losSlug } = await params;
    const content = await getLosContent(topicSlug, moduleSlug, losSlug);

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
    const content = await getLosContent(topicSlug, moduleSlug, losSlug);

    if (!content) {
        notFound();
    }

    return (
        <section className="min-h-screen px-6 pb-20 pt-28">
            <div className="mx-auto max-w-4xl">
                <header className="mb-10 rounded-2xl border border-[#2D2A26]/10 bg-[#F5F1EA] p-8 shadow-[0_2px_12px_rgba(45,42,38,0.06)]">
                    <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[#A09890]">
                        {content.topicTitle} / {content.moduleTitle}
                    </p>
                    <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-semibold text-[#2D2A26]">
                        {content.losTitle}
                    </h1>
                    <p className="mt-4 text-sm text-[#6B6560]">
                        Source file: {content.sourceFileName}
                    </p>
                </header>

                <div className="space-y-8">
                    {content.sections.map((section) => (
                        <section
                            key={section.key}
                            className="rounded-2xl border border-[#2D2A26]/10 bg-white p-8 shadow-[0_2px_12px_rgba(45,42,38,0.04)]"
                        >
                            <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[#2D2A26]">
                                {section.label}
                            </h2>
                            <div className="mt-5 space-y-6">
                                {section.content ? (
                                    <MarkdownFallback source={section.content} />
                                ) : (
                                    <p className="text-sm text-[#A09890]">
                                        This section is empty in the uploaded markdown file.
                                    </p>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
