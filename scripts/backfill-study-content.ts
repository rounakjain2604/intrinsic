import fs from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import {
    parseStudyMarkdown,
    STUDY_CONTENT_BUCKET,
} from "../lib/study-content-parser";

const DEFAULT_SOURCE_DIR = path.join(
    process.cwd(),
    "content",
    "study",
    "equity-valuation",
    "learning-module-4"
);

function loadEnvFile(filePath: string) {
    return fs
        .readFile(filePath, "utf-8")
        .then((raw) => {
            for (const line of raw.split(/\r?\n/)) {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith("#")) {
                    continue;
                }

                const separatorIndex = trimmed.indexOf("=");
                if (separatorIndex === -1) {
                    continue;
                }

                const key = trimmed.slice(0, separatorIndex).trim();
                const value = trimmed.slice(separatorIndex + 1).trim();
                if (!process.env[key]) {
                    process.env[key] = value;
                }
            }
        })
        .catch(() => undefined);
}

async function ensureStudyBucket() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );

    const { data: bucket } = await supabase.storage.getBucket(STUDY_CONTENT_BUCKET);
    const config = {
        public: false,
        fileSizeLimit: 10 * 1024 * 1024,
        allowedMimeTypes: [
            "text/markdown",
            "text/plain",
            "text/x-markdown",
            "application/json",
            "application/octet-stream",
        ],
    };

    if (!bucket) {
        const { error } = await supabase.storage.createBucket(
            STUDY_CONTENT_BUCKET,
            config
        );

        if (error && !error.message.toLowerCase().includes("already exists")) {
            throw error;
        }
    } else {
        const { error } = await supabase.storage.updateBucket(
            STUDY_CONTENT_BUCKET,
            config
        );

        if (error) {
            throw error;
        }
    }

    return supabase;
}

async function main() {
    await loadEnvFile(path.join(process.cwd(), ".env.local"));
    await loadEnvFile(path.join(process.cwd(), ".env"));

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error(
            "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY."
        );
    }

    const sourceDir = process.argv[2]
        ? path.resolve(process.cwd(), process.argv[2])
        : DEFAULT_SOURCE_DIR;
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });
    const markdownFiles = entries
        .filter(
            (entry) =>
                entry.isFile() &&
                [".md", ".mdx", ".markdown"].includes(
                    path.extname(entry.name).toLowerCase()
                )
        )
        .sort((left, right) =>
            left.name.localeCompare(right.name, undefined, {
                numeric: true,
                sensitivity: "base",
            })
        );

    if (markdownFiles.length === 0) {
        throw new Error(`No markdown files found in ${sourceDir}.`);
    }

    const supabase = await ensureStudyBucket();

    for (const entry of markdownFiles) {
        const filePath = path.join(sourceDir, entry.name);
        const source = await fs.readFile(filePath, "utf-8");
        const parsed = parseStudyMarkdown(source, entry.name);
        const extension = path.extname(entry.name) || ".md";
        const rawPath = `raw/${parsed.topicSlug}/${parsed.moduleSlug}/${parsed.losSlug}${extension}`;
        const parsedPath = `parsed/${parsed.topicSlug}/${parsed.moduleSlug}/${parsed.losSlug}.json`;

        const { error: rawError } = await supabase.storage
            .from(STUDY_CONTENT_BUCKET)
            .upload(
                rawPath,
                new File([source], entry.name, {
                    type: "text/markdown",
                }),
                {
                    upsert: true,
                    contentType: "text/markdown; charset=utf-8",
                }
            );

        if (rawError) {
            throw rawError;
        }

        const { error: parsedError } = await supabase.storage
            .from(STUDY_CONTENT_BUCKET)
            .upload(
                parsedPath,
                new File(
                    [JSON.stringify(parsed, null, 2)],
                    `${parsed.losSlug}.json`,
                    {
                        type: "application/json",
                    }
                ),
                {
                    upsert: true,
                    contentType: "application/json; charset=utf-8",
                }
            );

        if (parsedError) {
            throw parsedError;
        }

        console.log(`Uploaded ${entry.name} -> ${parsed.losSlug}`);
    }

    const verificationPrefix = "parsed/equity-valuation/learning-module-4";
    const { data: uploadedEntries, error: verificationError } = await supabase.storage
        .from(STUDY_CONTENT_BUCKET)
        .list(verificationPrefix, {
            limit: 100,
            sortBy: { column: "name", order: "asc" },
        });

    if (verificationError) {
        throw verificationError;
    }

    console.log(
        `Verified ${uploadedEntries?.length ?? 0} parsed entries under ${verificationPrefix}.`
    );
}

main().catch((error) => {
    console.error("[backfill-study-content]", error);
    process.exit(1);
});
