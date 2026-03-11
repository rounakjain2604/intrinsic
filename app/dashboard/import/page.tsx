import Link from "next/link";
import { redirect } from "next/navigation";
import ContentUploader from "@/components/dashboard/ContentUploader";
import { hasConfiguredContentAdmins, isContentAdmin } from "@/lib/admin";
import { listStudyLibrary } from "@/lib/study-content";
import { syncUser } from "@/lib/supabase/syncUser";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Content Import - Intrinsic",
    description: "Upload LOS markdown files into the study library.",
};

export default async function ContentImportPage() {
    const userId = await syncUser();
    if (!userId) {
        redirect("/sign-in");
    }

    if (!(await isContentAdmin())) {
        return (
            <section className="min-h-screen px-6 pb-20 pt-28">
                <div className="mx-auto max-w-3xl rounded-2xl border border-[#2D2A26]/10 bg-[#F5F1EA] p-8 shadow-[0_2px_12px_rgba(45,42,38,0.06)]">
                    <h1 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-[#2D2A26]">
                        Content Upload Is Locked
                    </h1>
                    <p className="mt-4 text-base leading-8 text-[#6B6560]">
                        This page only opens for email addresses listed in
                        <code className="mx-1 rounded bg-[#EDE8DF] px-2 py-1 text-sm text-[#E8694A]">
                            CONTENT_ADMIN_EMAILS
                        </code>
                        .
                    </p>
                    {!hasConfiguredContentAdmins() && (
                        <p className="mt-4 text-sm text-[#C94F3A]">
                            No admin emails are configured yet, so uploads are disabled on
                            purpose.
                        </p>
                    )}
                    <Link
                        href="/dashboard"
                        className="mt-6 inline-flex rounded-xl border border-[#2D2A26]/10 px-5 py-3 text-sm font-medium text-[#2D2A26] transition hover:bg-white"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </section>
        );
    }

    const library = await listStudyLibrary();

    return (
        <section className="min-h-screen px-6 pb-20 pt-28">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="font-[family-name:var(--font-serif)] text-4xl font-semibold text-[#2D2A26]">
                            Study Content Pipeline
                        </h1>
                        <p className="mt-2 max-w-2xl text-base leading-8 text-[#6B6560]">
                            Upload LOS markdown files here. The app will parse the six
                            teaching sections, overwrite older versions safely, and make the
                            result available inside the study library.
                        </p>
                    </div>
                    <Link
                        href="/study"
                        className="inline-flex rounded-xl border border-[#2D2A26]/10 px-5 py-3 text-sm font-medium text-[#2D2A26] transition hover:bg-white"
                    >
                        Open Study Library
                    </Link>
                </div>

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <ContentUploader />

                    <div className="rounded-2xl border border-[#2D2A26]/10 bg-[#F5F1EA] p-6 shadow-[0_2px_12px_rgba(45,42,38,0.06)]">
                        <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[#2D2A26]">
                            Current Library
                        </h2>
                        <div className="mt-5 space-y-5 text-sm text-[#6B6560]">
                            {library.length === 0 ? (
                                <p>No LOS files have been uploaded yet.</p>
                            ) : (
                                library.map((topic) => (
                                    <div key={topic.slug}>
                                        <p className="font-semibold text-[#2D2A26]">
                                            {topic.title}
                                        </p>
                                        <div className="mt-2 space-y-2 pl-4">
                                            {topic.modules.map((module) => (
                                                <div key={module.slug}>
                                                    <p className="font-medium text-[#2D2A26]">
                                                        {module.title}
                                                    </p>
                                                    <ul className="mt-1 space-y-1 pl-4">
                                                        {module.losses.map((los) => (
                                                            <li key={los.slug}>
                                                                <Link
                                                                    href={`/study/${topic.slug}/${module.slug}/${los.slug}`}
                                                                    className="hover:text-[#E8694A]"
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
                </div>
            </div>
        </section>
    );
}
