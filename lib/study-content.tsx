import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import BondPricePlayable from "@/components/chapter/BondPricePlayable";
import Callout from "@/components/chapter/Callout";
import ComparisonTable, {
    ComparisonColumn,
} from "@/components/chapter/ComparisonTable";
import FormulaBlock from "@/components/chapter/FormulaBlock";
import QuizCard from "@/components/chapter/QuizCard";
import WorkedExample from "@/components/chapter/WorkedExample";
import DCFDiagram from "@/components/chapter/diagrams/DCFDiagram";
import YieldCurveChart from "@/components/charts/YieldCurveChart";
import {
    createServerClient,
    hasServerSupabaseEnv,
} from "@/lib/supabase/server";

export const STUDY_CONTENT_BUCKET = "study-los-content";
const LOCAL_STUDY_CONTENT_DIR = path.join(process.cwd(), "content", "study");

export const SECTION_ORDER = [
    "intuition_building",
    "ground_up_framework",
    "core_concept_teaching",
    "visual_anchor",
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
    quizCount: number;
    visualCount: number;
    estimatedTimeMinutes: number | null;
    formatVersion: string;
}

export interface RenderedStudySection extends StudySection {
    renderedContent: React.ReactElement;
}

export interface RenderableStudyContent extends ParsedStudyContent {
    renderedSections: RenderedStudySection[];
}

export interface UploadOverrides {
    topicTitle?: string;
    moduleTitle?: string;
}

export interface LibraryLosEntry {
    title: string;
    slug: string;
    quizCount: number;
    estimatedTimeMinutes: number | null;
}

export interface LibraryModuleEntry {
    title: string;
    slug: string;
    losses: LibraryLosEntry[];
}

export interface LibraryTopicEntry {
    title: string;
    slug: string;
    modules: LibraryModuleEntry[];
}

export interface LosNavigationEntry {
    title: string;
    slug: string;
    href: string;
}

export interface LosNavigation {
    previous: LosNavigationEntry | null;
    next: LosNavigationEntry | null;
}

interface LibraryAccumulatorLosEntry {
    title: string;
    slug: string;
    quizCount: number;
    estimatedTimeMinutes: number | null;
}

interface LibraryAccumulatorModuleEntry {
    title: string;
    slug: string;
    losses: Map<string, LibraryAccumulatorLosEntry>;
}

interface LibraryAccumulatorTopicEntry {
    title: string;
    slug: string;
    modules: Map<string, LibraryAccumulatorModuleEntry>;
}

const SECTION_LABELS: Record<SectionKey, string> = {
    intuition_building: "Intuition Building",
    ground_up_framework: "Ground-Up Framework",
    core_concept_teaching: "Core Concept Teaching",
    visual_anchor: "Visual Anchor",
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
        "orientation",
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
    visual_anchor: [
        "visual anchor",
        "visual build",
        "visual intuition",
        "diagram anchor",
        "svg visual",
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
        "quiz checkpoint",
    ],
    summary_key_takeaways: [
        "summary key takeaways",
        "key takeaways",
        "summary",
        "takeaways",
        "recap",
    ],
};

const mdxComponents = {
    Callout,
    FormulaBlock,
    ComparisonTable,
    ComparisonColumn,
    WorkedExample,
    QuizCard,
    DCFDiagram,
    BondPricePlayable,
    YieldCurveChart,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            id={slugify(String(props.children))}
            className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[#2D2A26] mt-12 mb-4"
            {...props}
        />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            id={slugify(String(props.children))}
            className="font-[family-name:var(--font-sans)] text-lg font-semibold text-[#2D2A26] mt-8 mb-3"
            {...props}
        />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p
            className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-8"
            {...props}
        />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            className="font-[family-name:var(--font-sans)] text-[#E8694A] underline decoration-[#E8694A]/35 underline-offset-4 transition-colors hover:text-[#D45E40]"
            target={props.href?.startsWith("http") ? "_blank" : undefined}
            rel={props.href?.startsWith("http") ? "noreferrer" : undefined}
            {...props}
        />
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
        <strong className="font-semibold text-[#2D2A26]" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc list-inside space-y-2 text-[#6B6560]" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-inside space-y-2 text-[#6B6560]" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
        <li className="font-[family-name:var(--font-sans)] text-base leading-8" {...props} />
    ),
    hr: () => <hr className="my-12 border-t border-[#2D2A26]/[0.08]" />,
    code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code
            className="rounded bg-[#EDE8DF] px-2 py-1 font-[family-name:var(--font-mono)] text-sm text-[#E8694A]"
            {...props}
        />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className="my-6 border-l-4 border-[#2D2A26]/10 pl-5 italic text-[#6B6560]"
            {...props}
        />
    ),
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="table-wrapper my-8 overflow-x-auto rounded-2xl border border-[#2D2A26]/10 bg-[#FFFDF9] shadow-[0_2px_12px_rgba(45,42,38,0.04)]">
            <table className="w-full border-collapse font-[family-name:var(--font-sans)] text-sm" {...props} />
        </div>
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className="even:bg-[#F5F1EA]/80" {...props} />
    ),
    th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            className="bg-[#2D2A26] px-4 py-3 text-left font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-[#FAF8F5]"
            {...props}
        />
    ),
    td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
            className="border-b border-[#2D2A26]/8 px-4 py-3 align-top text-[#2D2A26]"
            {...props}
        />
    ),
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

function countMatches(source: string, pattern: RegExp) {
    return [...source.matchAll(pattern)].length;
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
        String(data.topic ?? data.topic_title ?? data.subject_title ?? "") ||
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

    const estimatedTime =
        typeof data.estimated_time_minutes === "number"
            ? data.estimated_time_minutes
            : typeof data.estimated_time_minutes === "string"
              ? Number(data.estimated_time_minutes)
              : null;

    return {
        topicTitle,
        topicSlug: slugify(
            String(data.topic_slug ?? data.subject_slug ?? "") || topicTitle
        ),
        moduleTitle,
        moduleSlug: slugify(
            String(data.learning_module_slug ?? data.module_slug ?? "") ||
                moduleTitle
        ),
        losTitle,
        losSlug: slugify(String(data.los_slug ?? "") || losTitle),
        estimatedTimeMinutes:
            estimatedTime && !Number.isNaN(estimatedTime) ? estimatedTime : null,
        formatVersion: String(data.format_version ?? "intrinsic-los-v2"),
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
            `${filename} does not contain enough recognizable study sections. Use clear headings such as "Intuition Building", "Ground-Up Framework", and "Testing / Practice Questions".`
        );
    }

    return {
        ...metadata,
        sections,
        sourceFileName: filename,
        uploadedAt: new Date().toISOString(),
        quizCount:
            countMatches(source, /<QuizCard\b/g) +
            countMatches(source, /```quiz\b/g),
        visualCount:
            countMatches(source, /<svg\b/g) + countMatches(source, /<DCFDiagram\b/g),
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
}

export async function uploadStudyMarkdownFile(
    file: File,
    overrides: UploadOverrides = {}
) {
    const source = await file.text();
    const parsed = parseStudyMarkdown(source, file.name, overrides);
    const supabase = createServerClient();

    await ensureStudyBucket();

    const extension = file.name.includes(".")
        ? file.name.slice(file.name.lastIndexOf("."))
        : ".md";
    const rawPath = `raw/${parsed.topicSlug}/${parsed.moduleSlug}/${parsed.losSlug}${extension}`;
    const parsedPath = `parsed/${parsed.topicSlug}/${parsed.moduleSlug}/${parsed.losSlug}.json`;

    const { error: rawError } = await supabase.storage
        .from(STUDY_CONTENT_BUCKET)
        .upload(
            rawPath,
            new File([source], file.name, {
                type: file.type || "text/markdown",
            }),
            {
                upsert: true,
                contentType: file.type || "text/markdown; charset=utf-8",
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

async function renderStudySectionMdx(source: string) {
    const { content } = await compileMDX({
        source,
        components: mdxComponents,
        options: {
            mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [rehypeKatex],
            },
        },
    });

    return content;
}

async function pathExists(targetPath: string) {
    try {
        await fs.access(targetPath);
        return true;
    } catch {
        return false;
    }
}

async function listDirectory(targetPath: string) {
    try {
        return await fs.readdir(targetPath, { withFileTypes: true });
    } catch {
        return [];
    }
}

async function getLocalLosFilePath(
    topicSlug: string,
    moduleSlug: string,
    losSlug: string
) {
    const directoryPath = path.join(
        LOCAL_STUDY_CONTENT_DIR,
        topicSlug,
        moduleSlug
    );
    const entries = await listDirectory(directoryPath);
    const matchedEntry = entries.find(
        (entry) =>
            entry.isFile() &&
            entry.name.replace(/\.[^.]+$/, "") === losSlug &&
            [".md", ".mdx", ".markdown"].includes(path.extname(entry.name).toLowerCase())
    );

    return matchedEntry ? path.join(directoryPath, matchedEntry.name) : null;
}

async function getLocalLosContent(
    topicSlug: string,
    moduleSlug: string,
    losSlug: string
) {
    const filePath = await getLocalLosFilePath(topicSlug, moduleSlug, losSlug);

    if (!filePath) {
        return null;
    }

    const source = await fs.readFile(filePath, "utf-8");
    return parseStudyMarkdown(source, path.basename(filePath));
}

function addLosToAccumulator(
    topics: Map<string, LibraryAccumulatorTopicEntry>,
    content: ParsedStudyContent
) {
    const topic =
        topics.get(content.topicSlug) ??
        {
            title: content.topicTitle,
            slug: content.topicSlug,
            modules: new Map<string, LibraryAccumulatorModuleEntry>(),
        };
    topic.title = content.topicTitle;

    const moduleEntry =
        topic.modules.get(content.moduleSlug) ??
        {
            title: content.moduleTitle,
            slug: content.moduleSlug,
            losses: new Map<string, LibraryAccumulatorLosEntry>(),
        };
    moduleEntry.title = content.moduleTitle;
    moduleEntry.losses.set(content.losSlug, {
        title: content.losTitle,
        slug: content.losSlug,
        quizCount: content.quizCount,
        estimatedTimeMinutes: content.estimatedTimeMinutes,
    });

    topic.modules.set(content.moduleSlug, moduleEntry);
    topics.set(content.topicSlug, topic);
}

function libraryFromAccumulator(topics: Map<string, LibraryAccumulatorTopicEntry>) {
    return [...topics.values()]
        .map((topic) => ({
            title: topic.title,
            slug: topic.slug,
            modules: [...topic.modules.values()]
                .map((module) => ({
                    title: module.title,
                    slug: module.slug,
                    losses: [...module.losses.values()].sort((left, right) =>
                        left.title.localeCompare(right.title, undefined, {
                            numeric: true,
                            sensitivity: "base",
                        })
                    ),
                }))
                .sort((left, right) =>
                    left.title.localeCompare(right.title, undefined, {
                        numeric: true,
                        sensitivity: "base",
                    })
                ),
        }))
        .sort((left, right) =>
            left.title.localeCompare(right.title, undefined, {
                numeric: true,
                sensitivity: "base",
            })
        );
}

async function listLocalStudyLibrary(): Promise<LibraryTopicEntry[]> {
    if (!(await pathExists(LOCAL_STUDY_CONTENT_DIR))) {
        return [];
    }

    const topicFolders = await listDirectory(LOCAL_STUDY_CONTENT_DIR);
    const topics = new Map<string, LibraryAccumulatorTopicEntry>();

    for (const topicFolder of topicFolders) {
        if (!topicFolder.isDirectory()) {
            continue;
        }

        const topicPath = path.join(LOCAL_STUDY_CONTENT_DIR, topicFolder.name);
        const moduleFolders = await listDirectory(topicPath);

        for (const moduleFolder of moduleFolders) {
            if (!moduleFolder.isDirectory()) {
                continue;
            }

            const modulePath = path.join(topicPath, moduleFolder.name);
            const losFiles = await listDirectory(modulePath);

            for (const losFile of losFiles) {
                if (
                    !losFile.isFile() ||
                    ![".md", ".mdx", ".markdown"].includes(
                        path.extname(losFile.name).toLowerCase()
                    )
                ) {
                    continue;
                }

                const filePath = path.join(modulePath, losFile.name);
                const source = await fs.readFile(filePath, "utf-8");
                const parsed = parseStudyMarkdown(source, losFile.name);
                addLosToAccumulator(topics, parsed);
            }
        }
    }

    return libraryFromAccumulator(topics);
}

function mergeLibraries(
    primaryLibrary: LibraryTopicEntry[],
    secondaryLibrary: LibraryTopicEntry[]
) {
    const topics = new Map<string, LibraryAccumulatorTopicEntry>();

    for (const topic of secondaryLibrary) {
        for (const moduleEntry of topic.modules) {
            for (const los of moduleEntry.losses) {
                addLosToAccumulator(topics, {
                    topicTitle: topic.title,
                    topicSlug: topic.slug,
                    moduleTitle: moduleEntry.title,
                    moduleSlug: moduleEntry.slug,
                    losTitle: los.title,
                    losSlug: los.slug,
                    sections: [],
                    sourceFileName: "",
                    uploadedAt: "",
                    quizCount: los.quizCount,
                    visualCount: 0,
                    estimatedTimeMinutes: los.estimatedTimeMinutes,
                    formatVersion: "intrinsic-los-v2",
                });
            }
        }
    }

    for (const topic of primaryLibrary) {
        for (const moduleEntry of topic.modules) {
            for (const los of moduleEntry.losses) {
                addLosToAccumulator(topics, {
                    topicTitle: topic.title,
                    topicSlug: topic.slug,
                    moduleTitle: moduleEntry.title,
                    moduleSlug: moduleEntry.slug,
                    losTitle: los.title,
                    losSlug: los.slug,
                    sections: [],
                    sourceFileName: "",
                    uploadedAt: "",
                    quizCount: los.quizCount,
                    visualCount: 0,
                    estimatedTimeMinutes: los.estimatedTimeMinutes,
                    formatVersion: "intrinsic-los-v2",
                });
            }
        }
    }

    return libraryFromAccumulator(topics);
}

export async function getLosContent(
    topicSlug: string,
    moduleSlug: string,
    losSlug: string
) {
    const localContent = await getLocalLosContent(topicSlug, moduleSlug, losSlug);
    if (localContent) {
        return localContent;
    }

    if (!hasServerSupabaseEnv()) {
        return null;
    }

    return downloadJson<ParsedStudyContent>(
        `parsed/${topicSlug}/${moduleSlug}/${losSlug}.json`
    );
}

export async function getRenderableLosContent(
    topicSlug: string,
    moduleSlug: string,
    losSlug: string
): Promise<RenderableStudyContent | null> {
    const content = await getLosContent(topicSlug, moduleSlug, losSlug);

    if (!content) {
        return null;
    }

    const renderedSections = await Promise.all(
        content.sections.map(async (section) => ({
            ...section,
            renderedContent: await renderStudySectionMdx(section.content || "_No content yet._"),
        }))
    );

    return {
        ...content,
        renderedSections,
    };
}

export async function listStudyLibrary(): Promise<LibraryTopicEntry[]> {
    const localLibrary = await listLocalStudyLibrary();

    if (!hasServerSupabaseEnv()) {
        return localLibrary;
    }

    const supabase = createServerClient();
    await ensureStudyBucket();

    const { data: topicFolders, error: topicError } = await supabase.storage
        .from(STUDY_CONTENT_BUCKET)
        .list("parsed", {
            limit: 200,
            sortBy: { column: "name", order: "asc" },
        });

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
        let topicTitle = toTitleCaseFromSlug(topicSlug);

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
                        quizCount: payload.quizCount,
                        estimatedTimeMinutes: payload.estimatedTimeMinutes,
                    });
                } else {
                    losses.push({
                        title: toTitleCaseFromSlug(losSlug),
                        slug: losSlug,
                        quizCount: 0,
                        estimatedTimeMinutes: null,
                    });
                }
            }

            modules.push({
                title: moduleTitle,
                slug: moduleSlug,
                losses,
            });
        }

        topics.push({
            title: topicTitle,
            slug: topicSlug,
            modules,
        });
    }

    return mergeLibraries(localLibrary, topics);
}

export async function getLosNavigation(
    topicSlug: string,
    moduleSlug: string,
    losSlug: string
): Promise<LosNavigation> {
    const library = await listStudyLibrary();
    const topic = library.find((entry) => entry.slug === topicSlug);
    const moduleEntry = topic?.modules.find((entry) => entry.slug === moduleSlug);

    if (!topic || !moduleEntry) {
        return {
            previous: null,
            next: null,
        };
    }

    const currentIndex = moduleEntry.losses.findIndex((entry) => entry.slug === losSlug);
    if (currentIndex === -1) {
        return {
            previous: null,
            next: null,
        };
    }

    const previousLos = currentIndex > 0 ? moduleEntry.losses[currentIndex - 1] : null;
    const nextLos =
        currentIndex < moduleEntry.losses.length - 1
            ? moduleEntry.losses[currentIndex + 1]
            : null;

    return {
        previous: previousLos
            ? {
                title: previousLos.title,
                slug: previousLos.slug,
                href: `/study/${topic.slug}/${moduleEntry.slug}/${previousLos.slug}`,
            }
            : null,
        next: nextLos
            ? {
                title: nextLos.title,
                slug: nextLos.slug,
                href: `/study/${topic.slug}/${moduleEntry.slug}/${nextLos.slug}`,
            }
            : null,
    };
}
