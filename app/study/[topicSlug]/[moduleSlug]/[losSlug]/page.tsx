import Link from "next/link";
import { notFound } from "next/navigation";
import {
    getLosNavigation,
    getRenderableLosContent,
} from "@/lib/study-content";

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
    const [content, navigation] = await Promise.all([
        getRenderableLosContent(topicSlug, moduleSlug, losSlug),
        getLosNavigation(topicSlug, moduleSlug, losSlug),
    ]);

    if (!content) {
        notFound();
    }

    return (
        <section className="min-h-screen px-4 pb-20 pt-28 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-[1480px]">
                <header className="mb-10 overflow-hidden rounded-[2rem] border border-[#2D2A26]/10 bg-[linear-gradient(135deg,#F5F1EA_0%,#FFFDF9_100%)] p-6 shadow-[0_8px_30px_rgba(45,42,38,0.07)] sm:p-8 lg:p-10">
                    <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[#A09890]">
                        {content.topicTitle} / {content.moduleTitle}
                    </p>
                    <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-semibold text-[#2D2A26] lg:text-5xl">
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
                            className="rounded-[2rem] border border-[#2D2A26]/10 bg-white p-6 shadow-[0_6px_24px_rgba(45,42,38,0.05)] sm:p-8 lg:p-10"
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

                {(navigation.previous || navigation.next) && (
                    <nav className="mt-10 grid gap-4 sm:grid-cols-2">
                        {navigation.previous ? (
                            <Link
                                href={navigation.previous.href}
                                className="rounded-[1.5rem] border border-[#2D2A26]/10 bg-white p-5 text-left shadow-[0_6px_24px_rgba(45,42,38,0.05)] transition hover:border-[#E8694A]/20 hover:bg-[#FFFDF9]"
                            >
                                <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#A09890]">
                                    Previous LOS
                                </span>
                                <p className="mt-2 font-[family-name:var(--font-sans)] text-sm text-[#6B6560]">
                                    {navigation.previous.title}
                                </p>
                            </Link>
                        ) : (
                            <div />
                        )}

                        {navigation.next ? (
                            <Link
                                href={navigation.next.href}
                                className="rounded-[1.5rem] border border-[#2D2A26]/10 bg-[#F5F1EA] p-5 text-left shadow-[0_6px_24px_rgba(45,42,38,0.05)] transition hover:border-[#E8694A]/20 hover:bg-[#FFF7ED]"
                            >
                                <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#A09890]">
                                    Next LOS
                                </span>
                                <p className="mt-2 font-[family-name:var(--font-sans)] text-sm font-medium text-[#2D2A26]">
                                    {navigation.next.title}
                                </p>
                            </Link>
                        ) : (
                            <div />
                        )}
                    </nav>
                )}
            </div>
        </section>
    );
}
