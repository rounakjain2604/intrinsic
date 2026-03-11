import matter from "gray-matter";

export const STUDY_CONTENT_BUCKET = "study-los-content";

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

export interface UploadOverrides {
    topicTitle?: string;
    moduleTitle?: string;
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

export function slugify(value: string) {
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
    const losMatch = secondHeading.match(/^LOS\s*[:\-â€“]?\s*(.+)$/i);

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
