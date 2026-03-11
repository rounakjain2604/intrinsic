import { NextResponse } from "next/server";
import { isContentAdmin } from "@/lib/admin";
import { uploadStudyMarkdownFile } from "@/lib/study-content";
import { syncUser } from "@/lib/supabase/syncUser";

export async function POST(req: Request) {
    const userId = await syncUser();

    if (!userId) {
        return NextResponse.json({ message: "Please sign in first." }, { status: 401 });
    }

    if (!(await isContentAdmin())) {
        return NextResponse.json(
            { message: "This upload area is only available to approved content admins." },
            { status: 403 }
        );
    }

    try {
        const formData = await req.formData();
        const files = formData
            .getAll("files")
            .filter((value): value is File => value instanceof File);

        if (files.length === 0) {
            return NextResponse.json(
                { message: "Please attach at least one markdown file." },
                { status: 400 }
            );
        }

        const topicTitle = String(formData.get("topicTitle") ?? "").trim();
        const moduleTitle = String(formData.get("moduleTitle") ?? "").trim();

        const results = [];
        for (const file of files) {
            const parsed = await uploadStudyMarkdownFile(file, {
                topicTitle: topicTitle || undefined,
                moduleTitle: moduleTitle || undefined,
            });

            results.push({
                fileName: file.name,
                topicTitle: parsed.topicTitle,
                moduleTitle: parsed.moduleTitle,
                losTitle: parsed.losTitle,
            });
        }

        return NextResponse.json({
            message:
                files.length === 1
                    ? "The file was uploaded and indexed successfully."
                    : `${files.length} files were uploaded and indexed successfully.`,
            results,
        });
    } catch (error) {
        console.error("[API /study-content/upload] Error:", error);

        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : "The upload could not be completed.",
            },
            { status: 500 }
        );
    }
}
