import { createServerClient, hasServerSupabaseEnv } from "@/lib/supabase/server";
import { getAllLocalChapterFrontmatters, getLocalChapterFrontmatter } from "@/lib/mdx";
import type { Chapter, ChapterProgress } from "@/lib/types";

function toLocalChapter(frontmatter: {
    slug: string;
    title: string;
    description?: string;
    order?: number;
    is_free: boolean;
    price_tier: Chapter["price_tier"];
    price_usd?: number;
}): Chapter {
    return {
        id: `local:${frontmatter.slug}`,
        slug: frontmatter.slug,
        title: frontmatter.title,
        description: frontmatter.description ?? null,
        order_index: frontmatter.order ?? 999,
        is_free: frontmatter.is_free,
        price_tier: frontmatter.price_tier,
        price_usd: frontmatter.price_usd ?? 0,
        lemon_product_id: null,
        published: true,
        created_at: "",
        updated_at: "",
    };
}

// ── Chapter Queries ────────────────────────────────────────

/**
 * Fetch all published chapters, ordered by order_index.
 */
export async function getAllChapters(): Promise<Chapter[]> {
    if (!hasServerSupabaseEnv()) {
        const localFrontmatters = await getAllLocalChapterFrontmatters();
        return localFrontmatters.map(toLocalChapter);
    }

    const supabase = createServerClient();

    const [{ data, error }, localFrontmatters] = await Promise.all([
        supabase
        .from("chapters")
        .select("*")
        .eq("published", true)
        .order("order_index", { ascending: true }),
        getAllLocalChapterFrontmatters(),
    ]);

    if (error) {
        console.error("[chapters] Failed to fetch chapters:", error);
        return localFrontmatters.map(toLocalChapter);
    }

    const databaseChapters = (data as Chapter[]) ?? [];
    const chaptersBySlug = new Map(
        databaseChapters.map((chapter) => [chapter.slug, chapter])
    );

    for (const frontmatter of localFrontmatters) {
        if (!chaptersBySlug.has(frontmatter.slug)) {
            chaptersBySlug.set(frontmatter.slug, toLocalChapter(frontmatter));
        }
    }

    return [...chaptersBySlug.values()].sort(
        (left, right) => left.order_index - right.order_index
    );
}

/**
 * Fetch a single chapter by slug.
 */
export async function getChapterBySlug(
    slug: string
): Promise<Chapter | null> {
    if (!hasServerSupabaseEnv()) {
        const localFrontmatter = await getLocalChapterFrontmatter(slug);
        return localFrontmatter ? toLocalChapter(localFrontmatter) : null;
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

    if (error) {
        console.error("[chapters] Failed to fetch chapter by slug:", error);
        const localFrontmatter = await getLocalChapterFrontmatter(slug);
        return localFrontmatter ? toLocalChapter(localFrontmatter) : null;
    }

    if (data) {
        return data as Chapter;
    }

    const localFrontmatter = await getLocalChapterFrontmatter(slug);
    return localFrontmatter ? toLocalChapter(localFrontmatter) : null;
}

// ── Access Control ─────────────────────────────────────────

/**
 * Check if a user has access to a chapter.
 * - Free chapters: always accessible (even without userId)
 * - Paid chapters: requires a purchase row in the database
 */
export async function hasChapterAccess(
    _userId: string | null,
    _chapterId: string
): Promise<boolean> {
    // Everything is free during beta — all chapters accessible
    return true;
}

/**
 * Get all chapter IDs the user has purchased.
 */
export async function getUserPurchasedChapterIds(
    userId: string
): Promise<string[]> {
    if (!hasServerSupabaseEnv()) {
        return [];
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("purchases")
        .select("chapter_id")
        .eq("user_id", userId);

    if (error) {
        console.error("[chapters] Failed to fetch purchases:", error);
        return [];
    }

    return (data ?? []).map((row) => row.chapter_id);
}

// ── Progress Tracking ──────────────────────────────────────

/**
 * Toggle a chapter's completion status.
 * - If already completed: removes the row, returns false
 * - If not completed: inserts a row, returns true
 */
export async function toggleChapterComplete(
    userId: string,
    chapterId: string
): Promise<boolean> {
    if (!hasServerSupabaseEnv() || chapterId.startsWith("local:")) {
        return false;
    }

    const supabase = createServerClient();

    // Check if already completed
    const { data: existing } = await supabase
        .from("user_progress")
        .select("id")
        .eq("user_id", userId)
        .eq("chapter_id", chapterId)
        .single();

    if (existing) {
        // Already completed — remove it
        await supabase
            .from("user_progress")
            .delete()
            .eq("user_id", userId)
            .eq("chapter_id", chapterId);
        return false;
    }

    // Not completed — mark it
    const { error } = await supabase
        .from("user_progress")
        .insert({ user_id: userId, chapter_id: chapterId });

    if (error) {
        console.error("[chapters] Failed to toggle progress:", error);
        return false;
    }

    return true;
}

/**
 * Get all completed chapters for a user.
 */
export async function getUserProgress(
    userId: string
): Promise<ChapterProgress[]> {
    if (!hasServerSupabaseEnv()) {
        return [];
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("user_progress")
        .select("chapter_id, completed_at")
        .eq("user_id", userId);

    if (error) {
        console.error("[chapters] Failed to fetch progress:", error);
        return [];
    }

    return (data ?? []).map((row) => ({
        chapterId: row.chapter_id,
        completedAt: row.completed_at,
    }));
}
