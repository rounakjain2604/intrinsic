import matter from "gray-matter";
import { createServerClient } from "@/lib/supabase/server";

export const STUDY_CONTENT_BUCKET = "study-los-content";

export const SECTION_ORDER = [
    "intuition_building",
    "ground_up_framework",
    "core_concept_teaching",
    "examples_applications",
    "testing_practice_questions",
    "summary_key_takeaways",
] as const;

export type SectionKey = (typeof SECTION_ORDER)[number];

export interface StudySection {
    key: SectionKey;
    label: string;
    content: string;
}

export interface ParsedStudyContent {
    topicTitle: string;
    topicSlug: string;
    moduleTitle: string;
    moduleSlug: string;
    losTitle: string;
    losSlug: string;
    sections: StudySection[];
    sourceFileName: string;
    uploadedAt: string;
}

export interface UploadOverrides {
    topicTitle?: string;
    moduleTitle?: string;
}

interface LibraryLosEntry {
    title: string;
    slug: string;
}

interface LibraryModuleEntry {
    title: string;
    slug: string;
    losses: LibraryLosEntry[];
}

export interface LibraryTopicEntry {
    title: string;
    slug: string;
    modules: LibraryModuleEntry[];
}

const SECTION_LABELS: Record<SectionKey, string> = {
    intuition_building: "Intuition Building",
    ground_up_framework: "Ground-Up Framework",
    core_concept_teaching: "Core Concept Teaching",
    examples_applications: "Examples / Applications",
    testing_practice_questions: "Testing / Practice Questions",
    summary_key_takeaways: "Summary / Key Takeaways",
};

const SECTION_ALIASES: Record<SectionKey, string[]> = {
    intuition_building: [
        "intuition building",
        "intuition",
        "the why",
        "why this matters",
    ],
    ground_up_framework: [
        "ground up framework",
        "ground-up framework",
        "core framework",
        "framework",
        "ground up",
    ],
    core_concept_teaching: [
        "core concept teaching",
        "core concept",
        "concept teaching",
        "the concept",
        "concept",
    ],
    examples_applications: [
        "examples applications",
        "examples application",
        "examples",
        "applications",
        "worked example",
        "worked examples",
        "worked logic",
        "connections",
    ],
    testing_practice_questions: [
        "testing practice questions",
        "practice questions",
        "testing",
        "scenario practice",
        "exam lens",
        "practice",
        "green signal check",
    ],
    summary_key_takeaways: [
        "summary key takeaways",
        "key takeaways",
        "summary",
        "takeaways",
        "recap",
    ],
};

function slugify(value: string) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function normalizeHeading(value: string) {
    return value
        .toLowerCase()
        .replace(/[_/]+/g, " ")
        .replace(/[^a-z0-9\s-]+/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function toTitleCaseFromSlug(slug: string) {
    return slug
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function inferTitleFromFilename(filename: string) {
    return filename
        .replace(/\.[^.]+$/, "")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function findSectionKey(heading: string): SectionKey | null {
    const normalized = normalizeHeading(heading);

    for (const key of SECTION_ORDER) {
        if (
            SECTION_ALIASES[key].some(
                (alias) =>
                    normalized === alias ||
                    normalized.includes(alias) ||
                    alias.includes(normalized)
            )
        ) {
            return key;
        }
    }

    return null;
}

function extractMarkdownSections(source: string) {
    const content = matter(source).content;
    const lines = content.split(/\r?\n/);
    const sections = new Map<SectionKey, string[]>();

    let activeSection: SectionKey | null = null;

    for (const line of lines) {
        const headingMatch = line.match(/^(#{2,3})\s+(.+)$/);
        if (headingMatch) {
            const matchedSection = findSectionKey(headingMatch[2]);
            if (matchedSection) {
                activeSection = matchedSection;
                if (!sections.has(matchedSection)) {
                    sections.set(matchedSection, []);
                }
                continue;
            }
        }

        if (activeSection) {
            sections.get(activeSection)!.push(line);
        }
    }

    return SECTION_ORDER.map((key) => ({
        key,
        label: SECTION_LABELS[key],
        content: (sections.get(key) ?? []).join("\n").trim(),
    }));
}

function inferMetadata(
    source: string,
    filename: string,
    overrides: UploadOverrides
) {
    const { data, content } = matter(source);
    const lines = content.split(/\r?\n/);
    const headings = lines
        .map((line) => line.match(/^#\s+(.+)$/)?.[1]?.trim())
        .filter((line): line is string => Boolean(line));

    const firstHeading = headings[0] ?? "";
    const secondHeading = headings[1] ?? "";

    const learningModuleMatch = firstHeading.match(
        /^CFA\s+Level\s+\d+\s*--\s*(.+?)\s*:\s*(Learning Module\s*.+)$/i
    );
    const losMatch = secondHeading.match(/^LOS\s*[:\-–]?\s*(.+)$/i);

    const topicTitle =
        overrides.topicTitle?.trim() ||
        String(data.topic ?? data.topic_title ?? "") ||
        learningModuleMatch?.[1]?.trim() ||
        "General";

    const moduleTitle =
        overrides.moduleTitle?.trim() ||
        String(
            data.learning_module ??
                data.learning_module_title ??
                data.module ??
                data.module_title ??
                data.lm ??
                ""
        ) ||
        learningModuleMatch?.[2]?.trim() ||
        "Learning Module";

    const losTitle =
        String(data.los ?? data.los_title ?? data.title ?? "") ||
        losMatch?.[1]?.trim() ||
        secondHeading ||
        inferTitleFromFilename(filename);

    return {
        topicTitle,
        topicSlug: slugify(topicTitle),
        moduleTitle,
        moduleSlug: slugify(moduleTitle),
        losTitle,
        losSlug: slugify(losTitle),
    };
}

export function parseStudyMarkdown(
    source: string,
    filename: string,
    overrides: UploadOverrides = {}
): ParsedStudyContent {
    const metadata = inferMetadata(source, filename, overrides);
    const sections = extractMarkdownSections(source);
    const filledSections = sections.filter((section) => section.content.length > 0);

    if (!metadata.topicSlug || !metadata.moduleSlug || !metadata.losSlug) {
        throw new Error(
            `Could not determine the Topic, Learning Module, and LOS names for ${filename}.`
        );
    }

    if (filledSections.length < 4) {
        throw new Error(
            `${filename} does not contain enough recognizable study sections. Add clear section headings like "Intuition Building" and "Summary / Key Takeaways".`
        );
    }

    return {
        ...metadata,
        sections,
        sourceFileName: filename,
        uploadedAt: new Date().toISOString(),
    };
}

export async function ensureStudyBucket() {
    const supabase = createServerClient();
    const { data: bucket } = await supabase.storage.getBucket(STUDY_CONTENT_BUCKET);
    const config = {
        public: false,
        fileSizeLimit: 10 * 1024 * 1024,
        allowedMimeTypes: [
            "text/markdown",
            "text/plain",
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
}

export async function uploadStudyMarkdownFile(
    file: File,
    overrides: UploadOverrides = {}
) {
    const source = await file.text();
    const parsed = parseStudyMarkdown(source, file.name, overrides);
    const supabase = createServerClient();

    await ensureStudyBucket();

    const rawPath = `raw/${parsed.topicSlug}/${parsed.moduleSlug}/${parsed.losSlug}.md`;
    const parsedPath = `parsed/${parsed.topicSlug}/${parsed.moduleSlug}/${parsed.losSlug}.json`;

    const { error: rawError } = await supabase.storage
        .from(STUDY_CONTENT_BUCKET)
        .upload(
            rawPath,
            new File([source], file.name, { type: file.type || "text/markdown" }),
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
                { type: "application/json" }
            ),
            {
                upsert: true,
                contentType: "application/json; charset=utf-8",
            }
        );

    if (parsedError) {
        throw parsedError;
    }

    return parsed;
}

async function downloadJson<T>(path: string) {
    const supabase = createServerClient();
    const { data, error } = await supabase.storage
        .from(STUDY_CONTENT_BUCKET)
        .download(path);

    if (error || !data) {
        return null;
    }

    return (JSON.parse(await data.text()) as T) ?? null;
}

export async function getLosContent(
    topicSlug: string,
    moduleSlug: string,
    losSlug: string
) {
    return downloadJson<ParsedStudyContent>(
        `parsed/${topicSlug}/${moduleSlug}/${losSlug}.json`
    );
}

export async function listStudyLibrary(): Promise<LibraryTopicEntry[]> {
    const supabase = createServerClient();
    await ensureStudyBucket();

    const { data: topicFolders, error: topicError } = await supabase.storage
        .from(STUDY_CONTENT_BUCKET)
        .list("parsed", { limit: 200, sortBy: { column: "name", order: "asc" } });

    if (topicError) {
        throw topicError;
    }

    const topics: LibraryTopicEntry[] = [];

    for (const topicFolder of topicFolders ?? []) {
        if (topicFolder.name.includes(".")) {
            continue;
        }

        const topicSlug = topicFolder.name;
        const { data: moduleFolders, error: moduleError } = await supabase.storage
            .from(STUDY_CONTENT_BUCKET)
            .list(`parsed/${topicSlug}`, {
                limit: 200,
                sortBy: { column: "name", order: "asc" },
            });

        if (moduleError) {
            throw moduleError;
        }

        const modules: LibraryModuleEntry[] = [];

        for (const moduleFolder of moduleFolders ?? []) {
            if (moduleFolder.name.includes(".")) {
                continue;
            }

            const moduleSlug = moduleFolder.name;
            const { data: losFiles, error: losError } = await supabase.storage
                .from(STUDY_CONTENT_BUCKET)
                .list(`parsed/${topicSlug}/${moduleSlug}`, {
                    limit: 500,
                    sortBy: { column: "name", order: "asc" },
                });

            if (losError) {
                throw losError;
            }

            const losses: LibraryLosEntry[] = [];
            let moduleTitle = toTitleCaseFromSlug(moduleSlug);
            let topicTitle = toTitleCaseFromSlug(topicSlug);

            for (const losFile of losFiles ?? []) {
                if (!losFile.name.endsWith(".json")) {
                    continue;
                }

                const losSlug = losFile.name.replace(/\.json$/, "");
                const payload = await getLosContent(topicSlug, moduleSlug, losSlug);

                if (payload) {
                    topicTitle = payload.topicTitle;
                    moduleTitle = payload.moduleTitle;
                    losses.push({
                        title: payload.losTitle,
                        slug: payload.losSlug,
                    });
                } else {
                    losses.push({
                        title: toTitleCaseFromSlug(losSlug),
                        slug: losSlug,
                    });
                }
            }

            modules.push({
                title: moduleTitle,
                slug: moduleSlug,
                losses,
            });

            if (!topics.find((topic) => topic.slug === topicSlug)) {
                topics.push({
                    title: topicTitle,
                    slug: topicSlug,
                    modules: [],
                });
            }
        }

        const topic = topics.find((entry) => entry.slug === topicSlug);
        if (topic) {
            topic.modules = modules;
        }
    }

    return topics.sort((left, right) => left.title.localeCompare(right.title));
}
